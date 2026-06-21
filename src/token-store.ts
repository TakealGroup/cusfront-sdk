/**
 * Pluggable storage for the JWT.
 *
 * Default behaviour by environment:
 *  - browser  → `localStorage` (synchronous, persists across reloads)
 *  - Node / SSR / worker → in-memory (no global state to leak)
 *  - mobile (Capacitor / RN) → consumer must inject Keychain /
 *    EncryptedSharedPreferences via `createClient({ tokenStore })`
 *
 * The store is intentionally tiny — three methods, no eviction
 * policy, no encryption. Encryption is the consumer's call (mobile
 * adapters wrap platform-native secure storage). Persistence shape
 * is opaque to the SDK; tokens are passed through verbatim.
 */
export interface TokenStore {
  get(): string | null | Promise<string | null>;
  set(token: string): void | Promise<void>;
  clear(): void | Promise<void>;
}

/** Sync `localStorage`-backed store. Falls through to in-memory when
 *  `window.localStorage` is unavailable (private mode quota, SSR). */
export function defaultBrowserStore(key = "takeal_jwt"): TokenStore {
  const fallback = inMemoryStore();
  // Probe once at construction — avoid the try/catch on every call.
  let usable = false;
  try {
    if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
      const ls = (globalThis as { localStorage: Storage }).localStorage;
      const probe = "__takeal_probe__";
      ls.setItem(probe, "1");
      ls.removeItem(probe);
      usable = true;
    }
  } catch {
    usable = false;
  }
  if (!usable) return fallback;
  const ls = (globalThis as { localStorage: Storage }).localStorage;
  return {
    get: () => ls.getItem(key),
    set: (token) => ls.setItem(key, token),
    clear: () => ls.removeItem(key),
  };
}

/** In-memory store. Use for SSR / tests / when persistence isn't
 *  desired (e.g. ephemeral kiosk sessions). */
export function inMemoryStore(): TokenStore {
  let value: string | null = null;
  return {
    get: () => value,
    set: (token) => {
      value = token;
    },
    clear: () => {
      value = null;
    },
  };
}
