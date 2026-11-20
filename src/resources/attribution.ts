import type { HttpClient } from "../http.js";

/**
 * Attribution resource — `client.attribution.*`: where users come from.
 *
 * Send a touch on page load ({@link AttributionResource.touch}); the
 * platform keeps the visits that bring something new (campaign tags, a
 * click id, a referrer from another site, a Telegram code, the first visit
 * from this browser) under the visitor's anonymous key. Pass the same key
 * to `auth.register({ attribution })` and the new account is credited with
 * those visits. After sign-up, ask "how did you hear about us" once
 * ({@link AttributionResource.status}, {@link AttributionResource.answerSurvey}).
 *
 * ```ts
 * const key = anonymousKey();
 * await client.attribution.touch({ anonymous_key: key, ...currentTouch() });
 * // …later, in the sign-up form:
 * await client.auth.register({ email, password, attribution: { anonymous_key: key } });
 * ```
 */

/** A visit as the browser saw it. {@link currentTouch} fills it from the page. */
export interface TouchFields {
  /** Full address of the landing page, query included. Tags and click ids
   *  are read from it; anything that looks like an e-mail address, a phone
   *  number or a secret is dropped on the server. */
  url?: string;
  /** `document.referrer`; leave out or empty for none. */
  referrer?: string;
  /** The code of a Telegram link to the bot or the Mini App. */
  campaign_code?: string;
  /** `web`, `miniapp` or `app`. Taken from the client's platform when left out. */
  platform?: "web" | "miniapp" | "app";
  /** When the visit happened, ISO 8601, for a touch sent later. Defaults to now. */
  occurred_at?: string;
  /** Yandex Metrica client id (`_ym_uid` cookie). */
  metrika_client_id?: string;
  /** Google Analytics client id (from the `_ga` cookie). */
  ga_client_id?: string;
}

export interface TouchInput extends TouchFields {
  /** The visitor's anonymous id, see {@link anonymousKey}. */
  anonymous_key: string;
}

export interface TouchResult {
  /** `false` when the visit brought nothing new or the visitor already has fifty touches. */
  recorded: boolean;
}

/** Sent with `auth.register` and `auth.exchangeTelegram`. */
export interface SignupAttribution {
  /** The key the touches were sent with. Ignored in the Mini App, where the
   *  Telegram id is the key. */
  anonymous_key?: string;
  /** The first touch this browser kept. Used only when none of its touches
   *  reached the server (a blocker, a flaky network). */
  first_touch?: TouchFields;
  /** The last touch before sign-up, on the same terms. */
  last_touch?: TouchFields;
  metrika_client_id?: string;
  ga_client_id?: string;
  /** PostHog distinct id, so a report can open the session recording. */
  posthog_distinct_id?: string;
}

export type SurveyAnswer =
  "friend" | "telegram_channel" | "search" | "ads" | "review" | "other" | "skipped";

/**
 * The visitor's ids at the analytics platforms (TKL-329). The SDK keeps
 * them from the moment the visitor agreed to analytics cookies and sends
 * them with an order, a top-up and a sign-in, so the server can report the
 * payment and the issued card to the platforms after the person has left
 * for the bank or Telegram. See {@link analyticsIds}.
 */
export interface AnalyticsIds {
  /** Yandex Metrica's ClientID, from `getClientID`. A string: it does not fit a number. */
  metrika_client_id?: string;
  /** Google Analytics' client id, from the `_ga` cookie: `1234567890.1700000000`. */
  ga_client_id?: string;
}

export interface HandoffToken {
  /** Goes into the Mini App link's `startapp` after two underscores. */
  token: string;
  expires_at: string;
}

export interface AttributionStatus {
  /** `true` while the app should ask "how did you hear about us". */
  survey_pending: boolean;
  /** The answer given, `skipped`, or `null`. */
  survey_answer: SurveyAnswer | null;
}

export class AttributionResource {
  constructor(private readonly http: HttpClient) {}

  /** Record a visit. No session needed; safe to call on every page load. */
  async touch(input: TouchInput): Promise<TouchResult> {
    return this.http.post<TouchResult>("/attribution/touches", { body: input, skipAuth: true });
  }

  /** A one-day token that carries the visitor's analytics ids into the
   *  Telegram Mini App, whose sign-in reads it back. Most callers want
   *  {@link AttributionResource.telegramStartParam}. Errors: 400 when none of
   *  the ids is valid. */
  async handoff(ids: AnalyticsIds): Promise<HandoffToken> {
    return this.http.post<HandoffToken>("/attribution/handoff", { body: ids, skipAuth: true });
  }

  /**
   * The `startapp` value for a link from the site to the Mini App: the code
   * as it is, followed by `__<token>` when the visitor has analytics ids, so
   * a payment made in Telegram is still credited to the visit it came from.
   * Without ids, or when the token can't be had, just the code.
   *
   * ```ts
   * const start = await client.attribution.telegramStartParam("SPRING");
   * location.href = `https://t.me/our_bot/app?startapp=${start}`;
   * ```
   */
  async telegramStartParam(code = ""): Promise<string> {
    const ids = analyticsIds();
    if (!ids) return code;
    try {
      const { token } = await this.handoff(ids);
      return `${code}__${token}`;
    } catch {
      return code;
    }
  }

  /** Send the visitor's analytics ids for the signed-in account, e.g. right
   *  after they agreed to analytics cookies in the cabinet. Without an
   *  argument the ids this browser holds are sent; nothing is sent when it
   *  holds none. */
  async sendAnalyticsIds(ids: AnalyticsIds | undefined = analyticsIds()): Promise<void> {
    if (!ids) return;
    await this.http.post<void>("/me/analytics/ids", { body: ids });
  }

  /** Whether to ask the signed-in user how they heard about us. */
  async status(): Promise<AttributionStatus> {
    return this.http.get<AttributionStatus>("/me/attribution");
  }

  /** Answer the question once. Send `"skipped"` when the user closes it.
   *  `otherText` is kept only with `"other"`, up to 500 characters.
   *  Errors: 400 `validation`, 409 `survey_answered`. */
  async answerSurvey(answer: SurveyAnswer, otherText?: string): Promise<AttributionStatus> {
    const body: { answer: SurveyAnswer; other_text?: string } = { answer };
    if (otherText !== undefined) body.other_text = otherText;
    return this.http.put<AttributionStatus>("/me/attribution/survey", { body });
  }
}

// ---------------------------------------------------------------------------
// Browser helpers
// ---------------------------------------------------------------------------

interface TelegramGlobal {
  Telegram?: { WebApp?: { initDataUnsafe?: { user?: { id?: number }; start_param?: string } } };
}

function tgWebApp() {
  return (globalThis as unknown as TelegramGlobal).Telegram?.WebApp?.initDataUnsafe;
}

function readCookie(name: string): string | undefined {
  const doc = (globalThis as { document?: Document }).document;
  if (!doc?.cookie) return undefined;
  for (const part of doc.cookie.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return undefined;
}

export interface AnonymousKeyOptions {
  /** Cookie and storage name. Default `takeal_anon`. */
  name?: string;
  /** Cookie domain, e.g. `.example.com` to share the key between the site and the app. */
  cookieDomain?: string;
}

const KEY_SHAPE = /^[A-Za-z0-9_-]{8,64}$/;

/**
 * The visitor's anonymous key. In the Telegram Mini App it is
 * `tg:<telegram id>`. In a browser it is a random id kept both in a cookie
 * and in `localStorage` for a year: if one of the two is lost it comes back
 * from the other, and the cookie's year is renewed on every call while its
 * value never changes. Returns `undefined` outside a browser.
 */
export function anonymousKey(opts: AnonymousKeyOptions = {}): string | undefined {
  const tgId = tgWebApp()?.user?.id;
  if (tgId) return `tg:${tgId}`;
  const g = globalThis as { document?: Document; localStorage?: Storage; crypto?: Crypto };
  if (!g.document) return undefined;
  const name = opts.name ?? "takeal_anon";
  let stored: string | undefined;
  try {
    stored = g.localStorage?.getItem(name) ?? undefined;
  } catch {
    stored = undefined;
  }
  const fromCookie = readCookie(name);
  let key = [fromCookie, stored].find((k): k is string => !!k && KEY_SHAPE.test(k));
  if (!key) {
    key =
      g.crypto?.randomUUID?.() ??
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
  }
  try {
    g.localStorage?.setItem(name, key);
  } catch {
    // Storage full or blocked: the cookie still holds it.
  }
  const domain = opts.cookieDomain ? `; domain=${opts.cookieDomain}` : "";
  g.document.cookie = `${name}=${encodeURIComponent(key)}; max-age=31536000; path=/; SameSite=Lax${domain}`;
  return key;
}

/** The current page as a touch: address, referrer, the Mini App's start
 *  code and the analytics cookies. Empty outside a browser. */
export function currentTouch(): TouchFields {
  const g = globalThis as { location?: Location; document?: Document };
  const tg = tgWebApp();
  const out: TouchFields = {};
  if (g.location?.href) out.url = g.location.href;
  if (g.document?.referrer) out.referrer = g.document.referrer;
  if (tg?.start_param) out.campaign_code = tg.start_param;
  if (tg?.user?.id) out.platform = "miniapp";
  const ym = readCookie("_ym_uid");
  if (ym) out.metrika_client_id = ym;
  // `_ga` is `GA1.1.<id>.<timestamp>`; the client id is the last two parts.
  const ga = readCookie("_ga")?.split(".").slice(-2).join(".");
  if (ga) out.ga_client_id = ga;
  return out;
}

// ---------------------------------------------------------------------------
// Analytics ids (TKL-329)
// ---------------------------------------------------------------------------

const IDS_KEY = "takeal_analytics_ids";

function storage(): Storage | undefined {
  try {
    return (globalThis as { localStorage?: Storage }).localStorage;
  } catch {
    return undefined;
  }
}

function stored(): AnalyticsIds {
  try {
    const raw = storage()?.getItem(IDS_KEY);
    const v = raw ? (JSON.parse(raw) as AnalyticsIds) : {};
    return typeof v === "object" && v !== null ? v : {};
  } catch {
    return {};
  }
}

function clean(ids: AnalyticsIds): AnalyticsIds | undefined {
  const out: AnalyticsIds = {};
  const ym = ids.metrika_client_id?.trim();
  if (ym && /^\d{1,32}$/.test(ym)) out.metrika_client_id = ym;
  const ga = ids.ga_client_id?.trim();
  if (ga && /^\d+\.\d+$/.test(ga) && ga.length <= 64) out.ga_client_id = ga;
  return out.metrika_client_id || out.ga_client_id ? out : undefined;
}

/**
 * Keep analytics ids for this browser, on top of the ones kept before. The
 * Metrica sink of `initAnalytics` calls it with `getClientID`'s answer once
 * the visitor agreed to analytics; call it yourself for another platform.
 */
export function rememberAnalyticsIds(ids: AnalyticsIds): void {
  const merged = clean({ ...stored(), ...ids });
  if (!merged) return;
  try {
    storage()?.setItem(IDS_KEY, JSON.stringify(merged));
  } catch {
    // Storage full or blocked: the cookies still hold them.
  }
}

/** Forget the kept analytics ids: the visitor declined analytics. */
export function forgetAnalyticsIds(): void {
  try {
    storage()?.removeItem(IDS_KEY);
  } catch {
    // Nothing kept, or nothing to reach.
  }
}

/**
 * The visitor's analytics ids: the ones kept by {@link rememberAnalyticsIds},
 * and failing those the platforms' own cookies (`_ym_uid`, `_ga`), which
 * exist only once the visitor agreed to analytics. `undefined` when there
 * are none. The site and the cabinet share them when they share the origin.
 */
export function analyticsIds(): AnalyticsIds | undefined {
  const kept = stored();
  return clean({
    metrika_client_id: kept.metrika_client_id ?? readCookie("_ym_uid"),
    ga_client_id: kept.ga_client_id ?? readCookie("_ga")?.split(".").slice(-2).join("."),
  });
}

/** `attribution` with the visitor's analytics ids filled in where it has none. */
export function withAnalyticsIds(
  attribution: SignupAttribution | undefined,
): SignupAttribution | undefined {
  const ids = analyticsIds();
  if (!ids) return attribution;
  return {
    ...attribution,
    metrika_client_id: attribution?.metrika_client_id ?? ids.metrika_client_id,
    ga_client_id: attribution?.ga_client_id ?? ids.ga_client_id,
  };
}
