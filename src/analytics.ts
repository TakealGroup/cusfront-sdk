/**
 * `@takeal/cusfront-sdk/analytics` — one event layer for product analytics.
 *
 * The app calls {@link track} once per event; the layer hands it to every
 * configured system: PostHog everywhere, Yandex Metrica only on public pages
 * and only for the sign-up goals (what happens behind the login reaches
 * Metrica from the server, not from the browser). Every event passes
 * {@link sanitizeProperties} on the way out, PostHog's own autocapture
 * included.
 *
 * Nothing is bundled: PostHog comes from the app's own `posthog-js` (pass
 * `posthog.load`) or from its script on the configured host, Metrica from
 * its tag script. Both load only when `initAnalytics` asks for them.
 *
 * ```ts
 * initAnalytics({ zone: "public", posthog: { key, host: "https://example.com/ingest" }, metrika: { counterId: 12345678 } });
 * track("signup_started");
 * ```
 */

/** Where the page lives. Decides what is captured and what is masked. */
export type AnalyticsZone = "public" | "cabinet" | "miniapp";

/** Every event name the layer accepts. The first two come from the browser
 *  on public pages; the rest match the event types of the platform's
 *  `analytics_events` view, so a report reads the same names on both sides. */
export const ANALYTICS_EVENTS = [
  "signup_started",
  "signup_completed",
  "signup",
  "login",
  "deposit_started",
  "deposit_confirmed",
  "deposit_failed",
  "card_issued",
  "card_issue_failed",
  "card_activated",
  "card_topped_up",
  "card_transferred",
  "card_frozen",
  "card_unfrozen",
  "card_terminated",
  "txn_cleared",
  "txn_declined",
  "subscription_started",
  "subscription_renewed",
  "subscription_cancelled",
  "fee_charged",
  "refund_issued",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

/** Events that also go to Metrica as goals, from public pages only. Deposits,
 *  cards and subscriptions reach Metrica from the server with their value. */
export const METRIKA_GOALS: readonly AnalyticsEvent[] = ["signup_started", "signup_completed"];

type Primitive = string | number | boolean | null | undefined;
export type AnalyticsProperties = Record<string, Primitive | Primitive[]>;

/**
 * Mark a block that must never be recorded or autocaptured: card details,
 * balances, the operations history. PostHog honours this class in
 * autocapture and in session recordings.
 */
export const NO_CAPTURE_CLASS = "ph-no-capture";

/** The subset of the `posthog-js` instance the layer uses. */
export interface PostHogLike {
  init(key: string, config: Record<string, unknown>): unknown;
  capture(event: string, properties?: Record<string, unknown>): unknown;
  identify(distinctId: string): unknown;
  reset(): unknown;
  get_distinct_id(): string;
  register(properties: Record<string, unknown>): unknown;
  set_config(config: Record<string, unknown>): unknown;
  startSessionRecording?(): unknown;
  stopSessionRecording?(): unknown;
}

export interface PostHogOptions {
  /** Project key (`phc_…`). Write-only, safe in the browser. */
  key: string;
  /** Where events go. Point it at the proxy path on your own domain, e.g.
   *  `https://example.com/ingest`. Default `https://eu.i.posthog.com`. */
  host?: string;
  /** PostHog's own app, for links from the toolbar. Default `https://eu.posthog.com`. */
  uiHost?: string;
  /** Where the script comes from when `load` is not given. Default: the
   *  `-assets` twin of a PostHog host, or `host` itself for a proxy. */
  assetsHost?: string;
  /** Return the app's own `posthog-js` instance, usually
   *  `() => import("posthog-js").then((m) => m.default)` (1.187 or later).
   *  Without it the script is loaded from `assetsHost`. */
  load?: () => Promise<PostHogLike>;
  /** Record sessions in the cabinet and the Mini App, masked. Off by
   *  default; turn it on only after checking a recording shows no values.
   *  Never recorded on public pages. */
  sessionRecording?: boolean;
}

export interface MetrikaOptions {
  counterId: number | string;
  /** Tag script address. Default `https://mc.yandex.ru/metrika/tag.js`. */
  scriptUrl?: string;
}

export interface AnalyticsOptions {
  zone: AnalyticsZone;
  posthog?: PostHogOptions;
  /** Used on public pages only; ignored in the cabinet and the Mini App. */
  metrika?: MetrikaOptions;
  /** Send the first page view right away. Default `true`; after that call
   *  {@link page} on every route change. */
  initialPageview?: boolean;
}

// ---------------------------------------------------------------------------
// The filter on the way out
// ---------------------------------------------------------------------------

const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
const EMAIL = /[^\s@"'<>(),;:]+@[^\s@"'<>(),;:]+\.[a-z]{2,}/gi;
/** A run of digits with phone or card separators: 9 to 19 digits is a phone
 *  or a card number, never something to send. */
const DIGIT_RUN = /\+?\d[\d\s().-]{7,}\d/g;
const UUID_ONLY = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** A path segment or a query value that is an id: a number, a UUID, a hex
 *  string, or a long token of letters and digits. Slugs have dashes and
 *  stay, even with a year in them. */
function isId(v: string): boolean {
  return (
    /^\d+$/.test(v) ||
    UUID_ONLY.test(v) ||
    /^[0-9a-f]{16,}$/i.test(v) ||
    (/^[A-Za-z0-9_]{20,}$/.test(v) && /\d.*\d/.test(v) && /[A-Za-z].*[A-Za-z]/.test(v))
  );
}
const PLACEHOLDER = ":id";

/** Keys whose value is personal whatever it looks like: any key with one of
 *  these words... */
const PERSONAL_WORDS = new Set([
  "email",
  "mail",
  "phone",
  "tel",
  "telephone",
  "mobile",
  "msisdn",
  "surname",
  "patronymic",
  "firstname",
  "lastname",
  "fullname",
  "username",
  "nickname",
]);
/** ...and `name` alone or after one of these (`first_name`, `holder_name`).
 *  `merchant_name` names a company and stays. */
const PERSON_NAME_QUALIFIERS = new Set([
  "first",
  "last",
  "full",
  "user",
  "display",
  "given",
  "family",
  "middle",
  "nick",
  "real",
  "holder",
  "cardholder",
  "customer",
  "contact",
  "person",
  "owner",
  "account",
  "legal",
]);
/** Query keys that carry secrets or personal data. */
const SECRET_QUERY_WORDS = new Set([
  "token",
  "code",
  "key",
  "secret",
  "password",
  "pass",
  "pwd",
  "otp",
  "sig",
  "signature",
  "session",
  "sid",
  "auth",
  "jwt",
  "pan",
  "cvv",
  "cvc",
  "iban",
]);
/** Money is not personal: kept as it is. */
const MONEY_KEYS = new Set([
  "amount",
  "amount_minor",
  "currency",
  "value",
  "price",
  "revenue",
  "sum",
]);

function words(key: string): string[] {
  return key
    .replace(/^\$+/, "")
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function personalKey(key: string): boolean {
  const w = words(key);
  const joined = w.join("");
  if (joined.includes("email") || joined.includes("phone")) return true;
  if (w.some((x) => PERSONAL_WORDS.has(x)) || PERSONAL_WORDS.has(joined)) return true;
  // PostHog's own `$…` keys are never names of people.
  if (key.startsWith("$")) return false;
  return w.some(
    (x, i) => x === "name" && (w.length === 1 || PERSON_NAME_QUALIFIERS.has(w[i - 1] ?? "")),
  );
}

function urlKey(key: string): boolean {
  const k = key.replace(/^\$+/, "").toLowerCase();
  return (
    /(^|_)(url|href|pathname|path|referrer|referer)$/.test(k) ||
    k === "page" ||
    k.startsWith("attr__href")
  );
}

function digitCount(s: string): number {
  return s.replace(/\D/g, "").length;
}

/** Text with e-mail addresses, phone and card numbers cut out. */
function redactText(v: string): string {
  return v
    .replace(EMAIL, "[email]")
    .replace(DIGIT_RUN, (m) => (digitCount(m) >= 9 && digitCount(m) <= 19 ? "[number]" : m));
}

function idSegment(seg: string): string {
  let s = seg;
  try {
    s = decodeURIComponent(seg);
  } catch {
    // Leave a broken escape as it is.
  }
  if (isId(s)) return PLACEHOLDER;
  const replaced = s.replace(UUID, PLACEHOLDER);
  if (replaced !== s) return replaced;
  return redactText(s) === s ? seg : PLACEHOLDER;
}

/**
 * A page address fit to send: UUIDs, numeric ids and long tokens in the
 * path become `:id`; query parameters that carry secrets or personal data
 * are dropped, ids among their values become `:id`; the fragment is dropped.
 * Campaign tags stay.
 */
export function sanitizeUrl(raw: string): string {
  const absolute = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw);
  let u: URL;
  try {
    u = new URL(raw, "http://relative.invalid");
  } catch {
    return redactText(raw.split(/[?#]/)[0] ?? "").replace(UUID, PLACEHOLDER);
  }
  const path = u.pathname
    .split("/")
    .map((seg) => (seg ? idSegment(seg) : seg))
    .join("/");
  const query: string[] = [];
  u.searchParams.forEach((value, key) => {
    const k = words(key);
    if (k.some((w) => SECRET_QUERY_WORDS.has(w)) || personalKey(key)) return;
    if (redactText(value) !== value) return;
    query.push(
      `${encodeURIComponent(key)}=${isId(value) ? PLACEHOLDER : encodeURIComponent(value)}`,
    );
  });
  const search = query.length ? `?${query.join("&")}` : "";
  return (absolute ? `${u.protocol}//${u.host}` : "") + path + search;
}

function cleanValue(key: string, v: unknown, depth: number): unknown {
  if (v === null || v === undefined || typeof v === "number" || typeof v === "boolean") return v;
  if (typeof v === "string") {
    // Money, and whole ids such as PostHog's session and device ids.
    if (MONEY_KEYS.has(key.toLowerCase()) || UUID_ONLY.test(v)) return v;
    if (urlKey(key) || /^https?:\/\//i.test(v)) return sanitizeUrl(v);
    if (key === "$elements_chain") {
      return redactText(v).replace(
        /attr__href="([^"]*)"/g,
        (_, h: string) => `attr__href="${sanitizeUrl(h)}"`,
      );
    }
    const r = redactText(v);
    // A value that was nothing but an address or a number goes entirely.
    return r.replace(/\[(email|number)\]/g, "").trim() === "" && r !== v ? undefined : r;
  }
  if (depth > 5) return undefined;
  if (Array.isArray(v))
    return v.map((x) => cleanValue(key, x, depth + 1)).filter((x) => x !== undefined);
  if (typeof v === "object") return sanitizeProperties(v as Record<string, unknown>, depth + 1);
  return undefined;
}

/**
 * The filter every event passes before it leaves the browser. Drops keys
 * that name personal data (`email`, `phone`, `name`, `first_name`, …) and
 * values that look like an e-mail address, a phone or a card number; page
 * addresses go through {@link sanitizeUrl}. Amounts and currencies pass.
 */
export function sanitizeProperties<T extends Record<string, unknown>>(
  props: T,
  depth = 0,
): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(props)) {
    if (personalKey(k)) continue;
    const c = cleanValue(k, v, depth);
    if (c !== undefined) out[k] = c;
  }
  return out as Partial<T>;
}

/** PostHog's `before_send`: the same filter for what PostHog captures by itself. */
function beforeSend<
  E extends {
    properties?: Record<string, unknown>;
    $set?: Record<string, unknown>;
    $set_once?: Record<string, unknown>;
  },
>(event: E | null): E | null {
  if (!event) return event;
  const out = { ...event };
  if (event.properties) out.properties = sanitizeProperties(event.properties);
  if (event.$set) out.$set = sanitizeProperties(event.$set);
  if (event.$set_once) out.$set_once = sanitizeProperties(event.$set_once);
  return out;
}

// ---------------------------------------------------------------------------
// Systems. A new one is a Sink plus a line in `sinksFor`.
// ---------------------------------------------------------------------------

interface Sink {
  capture(event: AnalyticsEvent, props: AnalyticsProperties): void;
  page(url: string, referrer: string | undefined): void;
  identify(userId: string): void;
  reset(): void;
  setZone(zone: AnalyticsZone): void;
}

interface Win {
  document?: Document;
  location?: Location;
  posthog?: unknown;
  ym?: ((...args: unknown[]) => void) & { a?: unknown[]; l?: number };
}

const win = () => globalThis as unknown as Win;

function injectScript(src: string, onLoad?: () => void, onError?: () => void): void {
  const doc = win().document;
  if (!doc) return;
  const s = doc.createElement("script");
  s.async = true;
  s.src = src;
  s.crossOrigin = "anonymous";
  if (onLoad) s.addEventListener("load", onLoad);
  if (onError) s.addEventListener("error", onError);
  (doc.head ?? doc.documentElement).appendChild(s);
}

function posthogConfig(zone: AnalyticsZone, o: PostHogOptions): Record<string, unknown> {
  const host = (o.host ?? "https://eu.i.posthog.com").replace(/\/+$/, "");
  const base: Record<string, unknown> = {
    api_host: host,
    ui_host: o.uiHost ?? "https://eu.posthog.com",
    // Profiles for signed-in users only.
    person_profiles: "identified_only",
    // Page views go through `page()`, with a cleaned address.
    capture_pageview: false,
    capture_pageleave: true,
    before_send: beforeSend,
  };
  return { ...base, ...zoneConfig(zone, o) };
}

/** What changes with the zone. Applied at init and on `setAnalyticsZone`. */
function zoneConfig(zone: AnalyticsZone, o: PostHogOptions): Record<string, unknown> {
  if (zone === "public") {
    return {
      autocapture: true,
      mask_all_text: false,
      mask_all_element_attributes: false,
      enable_heatmaps: true,
      disable_session_recording: true,
    };
  }
  return {
    // A click is "the third button in the cards block", never its label.
    autocapture: { capture_copied_text: false },
    mask_all_text: true,
    mask_all_element_attributes: true,
    enable_heatmaps: false,
    disable_session_recording: !o.sessionRecording,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "*",
      blockClass: NO_CAPTURE_CLASS,
    },
  };
}

function assetsHost(o: PostHogOptions): string {
  if (o.assetsHost) return o.assetsHost.replace(/\/+$/, "");
  const host = (o.host ?? "https://eu.i.posthog.com").replace(/\/+$/, "");
  return host.replace(".i.posthog.com", "-assets.i.posthog.com");
}

/** Load posthog-js the way its own snippet does: a placeholder that the
 *  script replaces with the instance once it runs. */
function loadPostHogScript(
  o: PostHogOptions,
  config: Record<string, unknown>,
): Promise<PostHogLike | undefined> {
  return new Promise((resolve) => {
    const w = win();
    if (!w.document) return resolve(undefined);
    const placeholder = Object.assign([] as unknown[], {
      __SV: 1,
      _i: [[o.key, config, "posthog"]],
    });
    w.posthog = placeholder;
    injectScript(
      `${assetsHost(o)}/static/array.js`,
      () => {
        const ph = w.posthog;
        const live =
          ph !== placeholder && typeof (ph as PostHogLike | undefined)?.capture === "function";
        resolve(live ? (ph as PostHogLike) : undefined);
      },
      () => resolve(undefined),
    );
  });
}

class PostHogSink implements Sink {
  readonly ready: Promise<PostHogLike | undefined>;

  constructor(
    private readonly o: PostHogOptions,
    zone: AnalyticsZone,
  ) {
    const config = posthogConfig(zone, o);
    this.ready = (
      o.load
        ? o.load().then((ph) => {
            ph.init(o.key, config);
            return ph;
          })
        : loadPostHogScript(o, config)
    )
      .then((ph) => {
        ph?.register({ zone });
        return ph;
      })
      .catch(() => undefined);
  }

  private with(fn: (ph: PostHogLike) => void): void {
    void this.ready.then((ph) => ph && fn(ph));
  }

  capture(event: AnalyticsEvent, props: AnalyticsProperties): void {
    this.with((ph) => ph.capture(event, props));
  }
  page(url: string, referrer: string | undefined): void {
    const props: Record<string, unknown> = { $current_url: url };
    if (referrer) props.$referrer = referrer;
    this.with((ph) => ph.capture("$pageview", props));
  }
  identify(userId: string): void {
    this.with((ph) => ph.identify(userId));
  }
  reset(): void {
    this.with((ph) => ph.reset());
  }
  setZone(zone: AnalyticsZone): void {
    this.with((ph) => {
      ph.set_config(zoneConfig(zone, this.o));
      ph.register({ zone });
      if (zone === "public" || !this.o.sessionRecording) ph.stopSessionRecording?.();
      else ph.startSessionRecording?.();
    });
  }
}

/** Metrica, public pages only. It never records on its own: no Webvisor, no
 *  click map, no automatic page views. It sees exactly what this layer
 *  sends, and falls silent when the zone leaves `public`. */
class MetrikaSink implements Sink {
  private live = true;
  private readonly id: number;

  constructor(o: MetrikaOptions) {
    this.id = Number(o.counterId);
    const w = win();
    if (!w.ym) {
      const ym = ((...args: unknown[]) => {
        (ym.a = ym.a ?? []).push(args);
      }) as NonNullable<Win["ym"]>;
      ym.l = Date.now();
      w.ym = ym;
      injectScript(o.scriptUrl ?? "https://mc.yandex.ru/metrika/tag.js");
    }
    this.ym("init", {
      defer: true,
      webvisor: false,
      clickmap: false,
      trackLinks: false,
      accurateTrackBounce: true,
    });
  }

  private ym(...args: unknown[]): void {
    if (this.live) win().ym?.(this.id, ...args);
  }

  capture(event: AnalyticsEvent, props: AnalyticsProperties): void {
    if (METRIKA_GOALS.includes(event)) this.ym("reachGoal", event, props);
  }
  page(url: string, referrer: string | undefined): void {
    this.ym("hit", url, referrer ? { referer: referrer } : {});
  }
  identify(userId: string): void {
    // The same id the server sends with its conversions.
    this.ym("setUserID", userId);
  }
  reset(): void {}
  setZone(zone: AnalyticsZone): void {
    this.live = zone === "public";
  }
}

// ---------------------------------------------------------------------------
// State, kept on globalThis: every sub-export bundles its own copy of this
// file, and they must all talk to one set of systems.
// ---------------------------------------------------------------------------

interface State {
  options: AnalyticsOptions;
  zone: AnalyticsZone;
  posthog?: PostHogSink;
  metrika?: MetrikaSink;
  lastPage?: string;
  userId?: string;
}

const KEY = Symbol.for("takeal.cusfront-sdk.analytics");
const holder = globalThis as unknown as Record<symbol, State | undefined>;
const state = (): State | undefined => holder[KEY];

function sinks(s: State): Sink[] {
  // Metrica loads the first time the page is public, and never before.
  if (s.zone === "public" && s.options.metrika && !s.metrika) {
    s.metrika = new MetrikaSink(s.options.metrika);
    if (s.userId) s.metrika.identify(s.userId);
  }
  return [s.posthog, s.metrika].filter((x): x is PostHogSink | MetrikaSink => !!x);
}

/**
 * Start analytics for this page. Call once, as early as possible. A second
 * call does nothing; to move between the site and the cabinet in one app,
 * use {@link setAnalyticsZone}.
 */
export function initAnalytics(options: AnalyticsOptions): void {
  if (state() || !win().document) return;
  if (options.zone !== "public" && win().ym) {
    console.warn(
      "[analytics] Yandex Metrica is on a page outside the public zone; it must not be.",
    );
  }
  const s: State = { options, zone: options.zone };
  holder[KEY] = s;
  if (options.posthog?.key) s.posthog = new PostHogSink(options.posthog, options.zone);
  sinks(s);
  if (options.initialPageview !== false) page();
}

/**
 * The page moved to another zone without a reload (the site and the cabinet
 * in one app). PostHog switches its masking; Metrica falls silent outside
 * public pages. A full page load into the cabinet is safer still: Metrica is
 * then never on the page at all.
 */
export function setAnalyticsZone(zone: AnalyticsZone): void {
  const s = state();
  if (!s || s.zone === zone) return;
  s.zone = zone;
  for (const sink of sinks(s)) sink.setZone(zone);
}

/** Record an event. The name must be one of {@link ANALYTICS_EVENTS}. */
export function track(event: AnalyticsEvent, props: AnalyticsProperties = {}): void {
  const s = state();
  if (!s || !(ANALYTICS_EVENTS as readonly string[]).includes(event)) return;
  const clean = sanitizeProperties(props) as AnalyticsProperties;
  for (const sink of sinks(s)) sink.capture(event, clean);
}

/** A page view. Call it on every route change; the same address twice in a
 *  row counts once. Takes the current address when none is given. */
export function page(url?: string): void {
  const s = state();
  const w = win();
  const raw = url ?? w.location?.href;
  if (!s || !raw) return;
  const clean = sanitizeUrl(raw);
  if (clean === s.lastPage) return;
  const referrer =
    s.lastPage ?? (w.document?.referrer ? sanitizeUrl(w.document.referrer) : undefined);
  s.lastPage = clean;
  for (const sink of sinks(s)) sink.page(clean, referrer);
}

/** After sign-in: tie this browser to the user by the platform's user id
 *  (`session.user.id`), never by e-mail. Only signed-in users get profiles. */
export function identify(userId: string): void {
  const s = state();
  if (!s || !userId) return;
  s.userId = userId;
  for (const sink of sinks(s)) sink.identify(userId);
}

/** On sign-out: forget the user, so the next person on this device starts
 *  as a new visitor. */
export function resetAnalytics(): void {
  const s = state();
  if (!s) return;
  s.userId = undefined;
  for (const sink of sinks(s)) sink.reset();
}

/** PostHog's id for this browser, for `auth.register({ attribution: {
 *  posthog_distinct_id } })`. Waits for PostHog to load, `timeoutMs` at
 *  most; `undefined` without PostHog. */
export async function posthogDistinctId(timeoutMs = 3000): Promise<string | undefined> {
  const ready = state()?.posthog?.ready;
  if (!ready) return undefined;
  let timer: Parameters<typeof clearTimeout>[0];
  const timeout = new Promise<undefined>((r) => {
    timer = setTimeout(r, timeoutMs);
  });
  const ph = await Promise.race([ready, timeout]);
  clearTimeout(timer);
  try {
    return ph?.get_distinct_id() || undefined;
  } catch {
    return undefined;
  }
}

/** For tests: forget everything `initAnalytics` set up. */
export function _resetAnalyticsForTests(): void {
  holder[KEY] = undefined;
}
