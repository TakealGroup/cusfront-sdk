import { SDK_VERSION } from "./version.js";

/**
 * Which kind of app is talking to the API. Sent on every request as
 * `X-Takeal-Client: <platform>; <version>`. The server keeps it on the
 * session: it decides whether a sign-in counts as a new device, and which
 * channel a notification goes out on (a Mini App gets Telegram messages, a
 * PWA gets Web Push, and so on).
 */
export type ClientPlatform = "pwa" | "web" | "telegram-miniapp" | "ios" | "android";

/** The `client` option of `createClient`. */
export interface ClientDescriptor {
  /** What the app is. Detected at runtime when omitted; see
   *  {@link detectClientPlatform}. */
  platform: ClientPlatform;
  /** The app's own version. Defaults to the SDK version. */
  version?: string;
}

/** A descriptor with every field filled in. `client.client` on a
 *  {@link CusfrontClient} has this shape. */
export interface ResolvedClientDescriptor {
  platform: ClientPlatform;
  version: string;
}

/** Header name carrying the client descriptor. */
export const CLIENT_HEADER = "X-Takeal-Client";

/**
 * Best-effort platform detection for browser runtimes:
 *
 *  - `telegram-miniapp` when `window.Telegram.WebApp.initData` is non-empty
 *    (the app was launched from Telegram);
 *  - `pwa` when the page runs installed: iOS Safari's `navigator.standalone`
 *    or a `display-mode: standalone` media query;
 *  - `web` otherwise, and always outside a browser (Node, workers without a
 *    `navigator`).
 *
 * Native wrappers (Capacitor, React Native) should pass `ios` / `android`
 * explicitly; there is no reliable way to tell them apart from a browser.
 */
export function detectClientPlatform(): ClientPlatform {
  const g = globalThis as unknown as {
    Telegram?: { WebApp?: { initData?: unknown } };
    navigator?: { standalone?: unknown };
    matchMedia?: (query: string) => { matches: boolean };
  };
  const initData = g.Telegram?.WebApp?.initData;
  if (typeof initData === "string" && initData.length > 0) return "telegram-miniapp";

  if (g.navigator?.standalone === true) return "pwa";
  if (typeof g.matchMedia === "function") {
    try {
      if (g.matchMedia("(display-mode: standalone)").matches) return "pwa";
    } catch {
      // Some non-browser runtimes stub matchMedia and throw; treat as web.
    }
  }
  return "web";
}

/** Fill in the blanks of a `client` option. */
export function resolveClientDescriptor(
  given: ClientDescriptor | undefined,
): ResolvedClientDescriptor {
  return {
    platform: given?.platform ?? detectClientPlatform(),
    version: given?.version || SDK_VERSION,
  };
}

/** `{ platform: "pwa", version: "0.3.0" }` → `"pwa; 0.3.0"`. */
export function clientHeaderValue(desc: ResolvedClientDescriptor): string {
  return `${desc.platform}; ${desc.version}`;
}
