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
  | "friend"
  | "telegram_channel"
  | "search"
  | "ads"
  | "review"
  | "other"
  | "skipped";

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
    key = g.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
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
