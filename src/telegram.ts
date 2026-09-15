/**
 * `@takeal/cusfront-sdk/telegram` — Telegram Mini App adapter.
 *
 * A Mini App receives a signed `initData` string from the Telegram client
 * (`window.Telegram.WebApp.initData`). This module turns that string into an
 * authenticated SDK client:
 *
 *   import { fromTelegramWebApp } from "@takeal/cusfront-sdk/telegram";
 *   const client = await fromTelegramWebApp({ baseUrl: "https://api.example.com" });
 *   const me = await client.auth.me(); // me.email_pending? prompt for email
 *
 * Signature validation: the HMAC over `initData` can only be verified with the
 * bot token, which lives on the server. So the **authoritative** check happens
 * server-side at `POST /auth/telegram/exchange`. Here we only do a structural,
 * fail-fast well-formedness check (`hash` + `auth_date` present, not stale)
 * before spending a network round-trip on an obviously-bad payload.
 */

import {
  createClient,
  type CreateClientOptions,
  type CusfrontClient,
} from "./index.js";
import type { JwtIssued, TelegramUnknown } from "./resources/auth.js";

/** The Telegram `user` object embedded (URL-encoded JSON) in initData. */
export interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
  is_premium?: boolean;
}

/** Structurally-parsed initData. `raw` is the original string passed to the
 *  server verbatim — the server re-derives the HMAC from it, so we never
 *  re-serialise. */
export interface ParsedInitData {
  raw: string;
  params: Record<string, string>;
  hash?: string;
  auth_date?: number;
  query_id?: string;
  user?: TelegramUser;
}

/** Thrown by {@link assertWellFormed} when initData is structurally invalid or
 *  stale. A signature mismatch is NOT detectable here (no bot token) — that
 *  surfaces as a 401 `ApiError` from the exchange call instead. */
export class InitDataError extends Error {
  constructor(
    message: string,
    readonly reason:
      | "empty"
      | "missing_hash"
      | "missing_auth_date"
      | "bad_user"
      | "stale",
  ) {
    super(message);
    this.name = "InitDataError";
  }
}

/** Parse a raw `initData` query string into its fields (best-effort — does
 *  not validate). `user` is JSON-decoded when present and parseable. */
export function parseInitData(initData: string): ParsedInitData {
  const params: Record<string, string> = {};
  const sp = new URLSearchParams(initData);
  for (const [k, v] of sp.entries()) params[k] = v;

  let user: TelegramUser | undefined;
  if (params.user) {
    try {
      user = JSON.parse(params.user) as TelegramUser;
    } catch {
      user = undefined;
    }
  }

  const authDateRaw = params.auth_date;
  const auth_date =
    authDateRaw && /^\d+$/.test(authDateRaw) ? Number(authDateRaw) : undefined;

  return {
    raw: initData,
    params,
    ...(params.hash ? { hash: params.hash } : {}),
    ...(auth_date !== undefined ? { auth_date } : {}),
    ...(params.query_id ? { query_id: params.query_id } : {}),
    ...(user ? { user } : {}),
  };
}

export interface WellFormedOptions {
  /** Reject initData whose `auth_date` is older than this many seconds.
   *  Defaults to 86400 (24h) — match or stay under the server's
   *  `auth.telegram.initdata_max_age_secs`. Pass 0 to skip the freshness
   *  check client-side (the server still enforces its own window). */
  maxAgeSeconds?: number;
  /** Injectable clock (unix seconds) for testing. Defaults to `Date.now()`. */
  nowUnix?: number;
}

/** Fail-fast structural check: `hash` present, `auth_date` present + a valid
 *  `user`, and (optionally) not stale. Throws {@link InitDataError}. Does NOT
 *  verify the HMAC — only the server can. */
export function assertWellFormed(
  initData: string,
  opts: WellFormedOptions = {},
): ParsedInitData {
  if (!initData) throw new InitDataError("initData is empty", "empty");
  const parsed = parseInitData(initData);
  if (!parsed.hash)
    throw new InitDataError("initData is missing `hash`", "missing_hash");
  if (parsed.auth_date === undefined)
    throw new InitDataError(
      "initData is missing a valid `auth_date`",
      "missing_auth_date",
    );
  if (!parsed.user || typeof parsed.user.id !== "number")
    throw new InitDataError(
      "initData is missing a valid `user`",
      "bad_user",
    );

  const maxAge = opts.maxAgeSeconds ?? 86_400;
  if (maxAge > 0) {
    const now = opts.nowUnix ?? Math.floor(Date.now() / 1000);
    if (now - parsed.auth_date > maxAge)
      throw new InitDataError(
        "initData is stale (auth_date older than the freshness window)",
        "stale",
      );
  }
  return parsed;
}

export interface FromInitDataOptions extends WellFormedOptions {
  /** Skip the client-side well-formedness check and let the server be the
   *  sole judge. Default false — the fail-fast check saves a round-trip on
   *  obviously-bad input. */
  skipWellFormedCheck?: boolean;
  /** Create an account for a Telegram id the deployment has not seen before.
   *  Default `true`. With `false`, an unknown id makes {@link fromInitData} /
   *  {@link fromTelegramWebApp} throw {@link TelegramUnknownError} (and
   *  {@link exchangeInitData} resolve with `session.stage === "unknown"`)
   *  instead of creating anything. */
  provision?: boolean;
}

/** Thrown by {@link fromInitData} / {@link fromTelegramWebApp} when
 *  `provision: false` was passed and the Telegram id has no account yet.
 *  Nothing was created and no JWT was stored. `initData` is the payload that
 *  was exchanged, so the app can go on with
 *  `client.auth.linkTelegram({ initData, email, password })` or retry with
 *  `provision: true`. */
export class TelegramUnknownError extends Error {
  constructor(readonly initData: string) {
    super("this Telegram account is not linked to any user (provision: false)");
    this.name = "TelegramUnknownError";
  }
}

/** What {@link exchangeInitData} resolves to. When `session.stage` is
 *  `"jwt"` the client is signed in; when it is `"unknown"` the client is
 *  built but has no session. */
export interface InitDataExchange {
  client: CusfrontClient;
  session: JwtIssued | TelegramUnknown;
}

/**
 * Build a client from a raw `initData` string and exchange the payload,
 * returning both the client and the exchange result.
 *
 * 1. (unless skipped) structurally validate the payload — throws
 *    {@link InitDataError} on malformed/stale input.
 * 2. exchange it at `POST /auth/telegram/exchange` — the server validates the
 *    HMAC; a bad signature throws a 401 `ApiError`.
 * 3. on `stage: "jwt"` the JWT is stored and the client is ready. With
 *    `provision: false` and a Telegram id nobody has signed in with,
 *    `session` is `{ stage: "unknown" }` and the client is unauthenticated;
 *    continue with `client.auth.linkTelegram(...)` or
 *    `client.auth.exchangeTelegram({ initData, provision: true })`.
 *
 * Use this when the app wants to branch on the outcome itself;
 * {@link fromInitData} is the throwing shorthand.
 */
export async function exchangeInitData(
  initData: string,
  config: CreateClientOptions,
  opts: FromInitDataOptions = {},
): Promise<InitDataExchange> {
  if (!opts.skipWellFormedCheck) assertWellFormed(initData, opts);
  const client = createClient(config);
  const session = await client.auth.exchangeTelegram({
    initData,
    ...(opts.provision !== undefined ? { provision: opts.provision } : {}),
  });
  return { client, session };
}

/**
 * Build an authenticated client from a raw `initData` string. Thin wrapper
 * over {@link exchangeInitData} that never hands back a client without a
 * session: with `provision: false` and an unknown Telegram id it throws
 * {@link TelegramUnknownError} (carrying `initData`) instead.
 *
 * Read `client.auth.me()` (or call `client.auth.exchangeTelegram` directly for
 * the raw session) to check `email_pending` and prompt for an email.
 */
export async function fromInitData(
  initData: string,
  config: CreateClientOptions,
  opts: FromInitDataOptions = {},
): Promise<CusfrontClient> {
  const { client, session } = await exchangeInitData(initData, config, opts);
  if (session.stage === "unknown") throw new TelegramUnknownError(initData);
  return client;
}

/** Read `window.Telegram.WebApp.initData` if running inside a Telegram Mini
 *  App. Returns null when absent or empty (e.g. opened outside Telegram). */
export function readWebAppInitData(): string | null {
  const tg = (
    globalThis as unknown as {
      Telegram?: { WebApp?: { initData?: string } };
    }
  ).Telegram;
  const data = tg?.WebApp?.initData;
  return data && data.length > 0 ? data : null;
}

/**
 * Convenience entry for a Mini App: read `initData` from the Telegram WebApp
 * SDK and exchange it. Throws {@link InitDataError} if not running inside a
 * Telegram Mini App, and {@link TelegramUnknownError} when `provision: false`
 * was passed and the Telegram id has no account yet.
 */
export async function fromTelegramWebApp(
  config: CreateClientOptions,
  opts: FromInitDataOptions = {},
): Promise<CusfrontClient> {
  const initData = readWebAppInitData();
  if (!initData)
    throw new InitDataError(
      "not running inside a Telegram Mini App (window.Telegram.WebApp.initData is empty)",
      "empty",
    );
  return fromInitData(initData, config, opts);
}

/** Convenience accessor for the typed exchange session (incl. `email_pending`)
 *  when you need the envelope rather than just the client. */
export type TelegramExchangeSession = JwtIssued;
