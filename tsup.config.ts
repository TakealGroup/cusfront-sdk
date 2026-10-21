import { defineConfig } from "tsup";

/**
 * esbuild via tsup. Two formats so the SDK runs in both
 * modern bundler-driven projects (Vite / Next) and tooling that
 * still hands `require()` (older Node-based services, some test
 * harnesses). Tree-shaking is the consumer's responsibility — every
 * sub-entrypoint is its own file so a Cusfront that only imports
 * `@takeal/cusfront-sdk/auth` doesn't pull the whole bundle.
 */
export default defineConfig({
  entry: {
    index: "src/index.ts",
    "resources/auth": "src/resources/auth.ts",
    "resources/deposits": "src/resources/deposits.ts",
    "resources/funding-options": "src/resources/funding-options.ts",
    "resources/cards": "src/resources/cards.ts",
    "resources/balance": "src/resources/balance.ts",
    "resources/bonus": "src/resources/bonus.ts",
    "resources/debt": "src/resources/debt.ts",
    "resources/close-requests": "src/resources/close-requests.ts",
    "resources/codes": "src/resources/codes.ts",
    "resources/referral": "src/resources/referral.ts",
    "resources/subscription": "src/resources/subscription.ts",
    "resources/branding": "src/resources/branding.ts",
    "resources/blog": "src/resources/blog.ts",
    "resources/documents": "src/resources/documents.ts",
    "resources/subscriptions": "src/resources/subscriptions.ts",
    "resources/wallet": "src/resources/wallet.ts",
    "resources/sessions": "src/resources/sessions.ts",
    "resources/push": "src/resources/push.ts",
    "resources/notifications": "src/resources/notifications.ts",
    "resources/devices": "src/resources/devices.ts",
    "resources/me": "src/resources/me.ts",
    "resources/attribution": "src/resources/attribution.ts",
    "resources/history": "src/resources/history.ts",
    "resources/consents": "src/resources/consents.ts",
    "resources/receipts": "src/resources/receipts.ts",
    webhooks: "src/webhooks.ts",
    // Telegram Mini App adapter — its own entry so non-TG consumers never
    // pull it (and the `window.Telegram` access stays out of the core path).
    telegram: "src/telegram.ts",
    // Analytics layer: loads PostHog and Metrica itself, only when asked,
    // so nothing lands in the bundle of an app that doesn't import it.
    analytics: "src/analytics.ts",
    // Optional React hooks — its own entry so non-React consumers never
    // pull it in, and React stays out of the bundle (peer dep).
    "react/index": "src/react/index.ts",
  },
  format: ["esm", "cjs"],
  outDir: "dist",
  target: "es2020",
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  // Marked external so the consumer's installed copy wins. Zod is a
  // peer dep + only loaded when `validate: true` is passed to
  // createClient — no static cost when the consumer omits it. React /
  // react-dom are peer deps too: the `react` entry imports them but
  // they must never be bundled (one React per app).
  external: ["zod", "react", "react-dom", "react/jsx-runtime"],
});
