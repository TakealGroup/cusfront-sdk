# @takeal/cusfront-sdk

Typed TypeScript client for the **Takeal end-user API**: sign-up and login, wallet, deposits, cards, sessions, push notifications and webhook signature verification.

The SDK powers any end-user client app on top of a Takeal deployment: a PWA, a Capacitor-wrapped mobile app, a Telegram Mini App, or anything else that talks to the `/auth/*` + `/me/*` surface. One client, runtime brand swap, zero runtime deps in the core.

> **Versioning:** the SDK version matches the Takeal platform release it was checked against (SDK 0.2.8 goes with API release v0.2.8). Until 1.0, a minor version can break things; read the [changelog](./CHANGELOG.md) before upgrading.

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
} else if (result.stage === "totp_setup_required") {
  // The account has to enrol an authenticator first. Show result.otpauth_url
  // as a QR code, then call client.auth.completeTotpSetup({ challenge_token, code })
  // and show the backup_codes it returns. They are never sent again.
}
```

New users sign up with `register`, which also signs them in:

```ts
await client.auth.register({
  email: "user@example.com",
  password: "a-long-Passw0rd",
  wallet_currency: "EUR", // optional; must be offered by the deployment
});
```

## Choosing a card

The API publishes a catalog of the cards a user can order, and the client
walks it from the list to the issued card:

```ts
// 1. The catalog: what the user can order, default product first.
const products = await client.cards.listProducts();

for (const p of products) {
  // Artwork: `image_url` is absolute for uploaded designs and a path
  // relative to the API for the deployment default. `assetUrl` handles both.
  const img = client.assetUrl(p.design.image_url);

  // Price after the user's subscription discount; `null` means free.
  const price = p.price
    ? p.price.discount_bps > 0
      ? `${p.price.amount} ${p.price.currency} (was ${p.price.base_amount}, ${p.price.discount_bps / 100}% off)`
      : `${p.price.amount} ${p.price.currency}`
    : "free";

  console.log(p.name, p.card_type, p.currency, price, img, p.description);
}

// 2. Issue from a product. `type` and `issuer_slug` are no longer needed:
//    the product settles both. The user picks a name and, when the product
//    offers a choice, one of `p.designs`.
const product = products.find((p) => p.is_default) ?? products[0];
const card = await client.cards.create({
  productId: product.id,
  name: "Groceries",
  designId: product.designs[0]?.id ?? null, // null = the product's default design
  initial_amount: "50.00",
  currency: product.currency ?? "USD",
  idempotencyKey: crypto.randomUUID(),
  customer: { email: "user@example.com", first_name: "Alice", last_name: "Tester" },
});

// The card carries what was chosen.
card.name;                              // "Groceries"
client.assetUrl(card.design.image_url); // ready for <img src>
card.product;                           // { id, name } or null for older cards

// 3. Rename or change the design later.
await client.cards.update(card.id, { name: "Coffee" });
await client.cards.update(card.id, { designId: null });
```

`cards.getProduct(id)` fetches one entry. `product.features` is a free-form
object the operator fills in (payment scheme, wallet support, load limits and
so on), so read the keys you need and ignore the rest. Names are 1 to 40
characters; a design outside the product's `designs` and an unknown or hidden
product are rejected with a 400 whose `code` says which check failed
(`invalid_name`, `design_not_allowed`, `unknown_product`, `product_mismatch`).

Calls without `productId` keep working as before: `type` is then required and
the deployment picks the product.

`resolveAssetUrl(baseUrl, url)` is the same helper as a standalone function,
exported from the package root, for code that has no client at hand.

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

### "I already have an account"

By default an unknown Telegram id gets a fresh account. That's wrong for a user
who signed up on the website with an email and a password and then opens the
Mini App: they'd end up with a second, empty account. Pass `provision: false`
to find out first, then let the user choose:

```ts
import {
  fromTelegramWebApp,
  TelegramUnknownError,
} from "@takeal/cusfront-sdk/telegram";
import { createClient } from "@takeal/cusfront-sdk";

const config = { baseUrl: "https://api.your-deployment.example.com" };

try {
  // Known Telegram → signed-in client, as before.
  const client = await fromTelegramWebApp(config, { provision: false });
} catch (e) {
  if (!(e instanceof TelegramUnknownError)) throw e;

  // Nobody has signed in with this Telegram yet. Nothing was created.
  const client = createClient(config);
  const choice = await askUser(); // "create" | "link"

  if (choice === "create") {
    // Same as the default flow: a new account, email_pending === true.
    await client.auth.exchangeTelegram({ initData: e.initData, provision: true });
  } else {
    // Attach this Telegram to the existing email + password account.
    const { email, password } = await askCredentials();
    await client.auth.linkTelegram({ initData: e.initData, email, password });
  }
  // client is signed in either way.
}
```

If you'd rather branch on a value than catch an error, `exchangeInitData`
returns both the client and the outcome:

```ts
import { exchangeInitData, readWebAppInitData } from "@takeal/cusfront-sdk/telegram";

const initData = readWebAppInitData()!;
const { client, session } = await exchangeInitData(initData, config, { provision: false });
if (session.stage === "unknown") {
  // client has no session yet; call client.auth.linkTelegram or
  // client.auth.exchangeTelegram({ initData, provision: true }).
}
```

`linkTelegram` checks the password the same way `login` does and returns the
same `stage: "jwt"` envelope. On the next launch the plain exchange finds the
link and signs the user straight in. Errors to expect:

- `401 unauthenticated` — wrong email or password.
- `403 second_factor_required` — the account signs in with a second factor;
  such accounts can't be linked from a Mini App.
- `409 telegram_already_linked_other` — the account already has a different
  Telegram. Unlink it first.
- `409 telegram_in_use` — this Telegram already belongs to another account
  that has been used. A Telegram can be attached to one account only, and the
  API does not merge accounts.

Two more calls for a signed-in user:

```ts
// Attach Telegram to the current session (e.g. the Mini App was opened
// through a deep link that already carried a session):
await client.me.linkTelegram(window.Telegram.WebApp.initData);

// Detach it. Refused with 409 `last_credential` when the account has no
// password, because Telegram would be its only way to sign in.
await client.me.unlinkTelegram();
```

The user object (`client.auth.me()` and the `user` in every `stage: "jwt"`
envelope) carries the state, so a settings screen needs no extra request:

```ts
type User = {
  // ...
  telegram: { username: string | null; linked_at: string } | null;
};
```

## Brand config

Whitelabel-friendly by design — the SDK ships no embedded brand. Pass `brand` at runtime and the client app reads it back via `client.brand`:

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
`merchant_portal_name`, `logo_url`, `favicon_url`, `wallet_label` and the
`primary_color` / `secondary_color` / `accent_color` hex values, so a
client app can re-theme itself at runtime and call the balance whatever the
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
- `@takeal/cusfront-sdk/wallet` — `WalletResource` (the wallet's currency).
- `@takeal/cusfront-sdk/sessions` — `SessionsResource` (where the user is signed in).
- `@takeal/cusfront-sdk/push` — `PushResource` (Web Push subscription).
- `@takeal/cusfront-sdk/me` — `MeResource` (link or unlink Telegram for the signed-in user).
- `@takeal/cusfront-sdk/webhooks` — HMAC-SHA256 signature verifier (no network, isomorphic).
- `@takeal/cusfront-sdk/react` — optional React hooks layer (`ClientProvider` + `useMe` / `useDeposits` / `useCards` / `useCardProducts` / `useBalance`). React is a `peerDependency`, never bundled.
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

> **Card details:** `client.cards.reveal()` returns the full card number and
> CVV. It asks for the user's password again (and a TOTP code if they have one
> enrolled), and the API rate-limits and logs every call. The rest of
> `client.cards` is listProducts, getProduct, create, get, list, update,
> balance, freeze, unfreeze and terminate.

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
- `useCardProducts()` — the cards the user can order (`client.cards.listProducts()`).
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
curl https://api.your-deployment.example.com/docs/openapi.json > openapi-snapshot.json
pnpm refresh-types
```

## License

MIT — see [LICENSE](./LICENSE).
