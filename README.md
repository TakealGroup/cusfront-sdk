# @takeal/cusfront-sdk

Typed TypeScript client for the **Takeal end-user API** — auth, deposits, cards, balance, and webhook signature verification.

The SDK powers any "Cusfront" (consumer front-end) on top of a Takeal deployment: a PWA, a Capacitor-wrapped mobile app, a Telegram Mini App, or anything else that talks to the `/auth/*` + `/me/*` surface. One client, runtime brand swap, zero runtime deps in the core.

> **Status:** 0.x — pre-release scaffold. Auth resource lands first; deposits + cards + balance + webhook verifier ship in subsequent releases.

## Install

```sh
pnpm add @takeal/cusfront-sdk
# optional peer dep for runtime validation
pnpm add zod
```

Native `fetch` is required. Node ≥ 18, modern browsers, Bun, Deno, and React Native ≥ 0.74 (Hermes) all ship it out of the box. For older runtimes inject a polyfill via `createClient({ fetch })`.

## Quick start

```ts
import { createClient } from "@takeal/cusfront-sdk";

const client = createClient({
  baseUrl: "https://api.your-deployment.example.com",
  brand: {
    name: "Your Brand",
    logoUrl: "/logo.svg",
    primaryColor: "#0047AB",
  },
});

const result = await client.auth.login({
  email: "user@example.com",
  password: "secret",
});

if (result.stage === "jwt") {
  // Authenticated — JWT auto-stored.
  const me = await client.auth.me();
  console.log("hello", me.email);
} else if (result.stage === "totp_required") {
  // Step-up required. Prompt the user for their TOTP code,
  // then call client.auth.verifyTotp({ challenge_token, code }).
}
```

## Telegram Mini App

Run inside a Telegram Mini App? Exchange the Telegram-signed `initData` for a
session in one call — no password:

```ts
import { fromTelegramWebApp } from "@takeal/cusfront-sdk/telegram";

// Reads window.Telegram.WebApp.initData, exchanges it, returns a ready client.
const client = await fromTelegramWebApp({
  baseUrl: "https://api.your-deployment.example.com",
});

const me = await client.auth.me();
if (me.email_pending) {
  // First-time Telegram users are auto-provisioned without an email.
  // Collect a real address and attach it:
  await client.auth.linkEmail({ email: "user@example.com" });
}
```

Already hold the raw string (e.g. from a custom launch)? Use `fromInitData`:

```ts
import { fromInitData, parseInitData } from "@takeal/cusfront-sdk/telegram";

const client = await fromInitData(initData, {
  baseUrl: "https://api.your-deployment.example.com",
});
```

How it works end-to-end:

1. **Telegram** signs `initData` with the bot token when it launches your Mini App.
2. The SDK does a fast **structural** check (`hash` + `auth_date` present, not
   stale) and POSTs the raw string to the API's exchange endpoint. The SDK
   **cannot** verify the cryptographic signature — only the server holds the bot
   token, so the API performs the authoritative HMAC check. A forged or stale
   payload is rejected there with a `401 ApiError`.
3. On success the JWT is stored in the configured token store; the returned
   client is authenticated for all `client.*` calls.
4. First-time Telegram users are **auto-provisioned**. They have no email yet, so
   `me.email_pending === true` — prompt for an address and call
   `client.auth.linkEmail` to clear it.

For the lower-level call returning the raw session envelope (including
`email_pending`), use `client.auth.exchangeTelegram({ initData })` on a client
you built yourself.

## Brand config

Whitelabel-friendly by design — the SDK ships no embedded brand. Pass `brand` at runtime and the consumer Cusfront reads it back via `client.brand`:

```ts
type BrandConfig = {
  name: string;
  logoUrl?: string;
  primaryColor?: string;
  supportUrl?: string;
  walletLabel?: string; // how the user's balance is called, e.g. "Acme Wallet"
};
```

Switching brands does **not** require forking or re-publishing the SDK.

The deployment also publishes its live brand config at `GET /branding` (public,
no login needed) — `client.branding.get()` returns `platform_name`,
`merchant_portal_name`, `logo_url`, `favicon_url` and `wallet_label`, so a
Cusfront can re-theme itself at runtime and call the balance whatever the
operator configured. Server values win over the build-time `brand` when both
are present.

## Sub-exports

Tree-shaking-friendly: import only the resource you need.

```ts
import { AuthResource } from "@takeal/cusfront-sdk/auth";
```

Available now:

- `@takeal/cusfront-sdk` — `createClient` + types.
- `@takeal/cusfront-sdk/auth` — auth-only entry.
- `@takeal/cusfront-sdk/deposits` — `DepositsResource` (money IN via a funder connector).
- `@takeal/cusfront-sdk/cards` — `CardsResource` (cards backed by the wallet balance).
- `@takeal/cusfront-sdk/balance` — `BalanceResource` (per-currency wallet balance).
- `@takeal/cusfront-sdk/blog` — `BlogResource` (public posts as structured blocks).
- `@takeal/cusfront-sdk/subscriptions` — `SubscriptionsResource` (announcement channels).
- `@takeal/cusfront-sdk/webhooks` — HMAC-SHA256 signature verifier (no network, isomorphic).
- `@takeal/cusfront-sdk/react` — optional React hooks layer (`ClientProvider` + `useMe` / `useDeposits` / `useCards` / `useBalance`). React is a `peerDependency`, never bundled.
- `@takeal/cusfront-sdk/telegram` — Telegram Mini App `initData` → authenticated client bridge.

### Verifying webhooks

`verifyWebhook` is pure (no network) and isomorphic (Web Crypto — Node 18+,
browsers, Bun, Deno, Workers). Verify against the **raw** request body bytes —
not re-serialised JSON — using the secret your endpoint was provisioned with:

```ts
import { verifyWebhook, SIGNATURE_HEADER } from "@takeal/cusfront-sdk/webhooks";

const ok = await verifyWebhook({
  payload: rawBody,                              // string or Uint8Array, verbatim
  signatureHeader: req.headers[SIGNATURE_HEADER.toLowerCase()],
  secret: process.env.TAKEAL_WEBHOOK_SECRET!,
});
if (!ok) return res.status(401).end();
```

Algorithm: HMAC-SHA256, header `X-Takeal-Signature: sha256=<hex>`, signed over
the raw body bytes (no timestamp). Comparison is constant-time.

> **Card lifecycle note:** card-data reveal (PAN / CVV) is a separate,
> security-gated flow with its own re-auth + rate-limit + audit contract, so it
> is intentionally not part of `client.cards`. The cards resource covers
> create / get / list / balance plus the ownership-gated freeze / unfreeze /
> terminate lifecycle actions.

## React hooks (`@takeal/cusfront-sdk/react`)

An optional React layer ships from a separate entry point. React is a
`peerDependency` (`>=18`) and is never bundled, so non-React consumers pay
nothing for it. Install React in your app, then:

```sh
pnpm add react   # if not already present
```

Wrap your tree once in a `ClientProvider`, then read data with the hooks:

```tsx
import { createClient } from "@takeal/cusfront-sdk";
import { ClientProvider, useBalance } from "@takeal/cusfront-sdk/react";

// Build the client once — module scope or a useMemo, not per-render.
const client = createClient({
  baseUrl: "https://api.your-deployment.example.com",
});

function Root() {
  return (
    <ClientProvider client={client}>
      <Wallet />
    </ClientProvider>
  );
}

function Wallet() {
  const { data, error, loading, refetch } = useBalance("USD");

  if (loading) return <Spinner />;
  if (error) return <ErrorBanner onRetry={refetch} />;
  return (
    <div>
      {data!.amount} {data!.currency}
      <button onClick={() => void refetch()}>Refresh</button>
    </div>
  );
}
```

Every hook returns the same shape — `{ data, error, loading, refetch }`:

- `useMe()` — current authenticated user (`client.auth.me()`).
- `useDeposits()` — the user's deposits (`client.deposits.list()`).
- `useCards()` — the user's cards (`client.cards.list()`).
- `useBalance(currency)` — wallet balance for one currency
  (`client.balance.get(currency)`); re-fetches when `currency` changes.

`useClient()` exposes the raw client from context for one-off writes
(e.g. `client.deposits.initiate(...)`) — it throws a clear error if called
outside a `ClientProvider`.

The hooks are SSR-safe (fetches run only inside `useEffect`, never during
server render) and have no third-party data-fetching dependency. In-flight
requests are guarded against unmounted-component writes.

## Token storage

`createClient` accepts a pluggable `TokenStore`. The default is:

- Browser: `localStorage` (key `takeal_jwt`).
- Node / SSR / Worker: in-memory.
- Capacitor / React Native: pass your own (Keychain / EncryptedSharedPreferences wrapper).

```ts
import { createClient, inMemoryStore } from "@takeal/cusfront-sdk";

const client = createClient({
  baseUrl: "...",
  tokenStore: inMemoryStore(), // never persist
});
```

## Errors

Two narrow error types — branch on the type guard, not `instanceof`:

```ts
import { isApiError, isNetworkError } from "@takeal/cusfront-sdk";

try {
  await client.auth.login({ email, password });
} catch (e) {
  if (isApiError(e)) {
    // e.status, e.code, e.message, e.body
    if (e.code === "invalid_credentials") showInlineError();
  } else if (isNetworkError(e)) {
    showOfflineBanner();
  } else {
    throw e;
  }
}
```

## Development

```sh
pnpm install
pnpm refresh-types   # regenerate src/types.gen.ts from openapi-snapshot.json
pnpm build           # tsup → dist/
pnpm test            # vitest
pnpm typecheck       # tsc --noEmit
```

The OpenAPI snapshot lives at `openapi-snapshot.json` and is committed; refresh it from a running Takeal deployment with:

```sh
curl https://api.your-deployment.example.com/api/docs/openapi.json > openapi-snapshot.json
pnpm refresh-types
```

## License

MIT — see [LICENSE](./LICENSE).
