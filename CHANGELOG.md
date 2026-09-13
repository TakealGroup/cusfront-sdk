# Changelog

All notable changes to `@takeal/cusfront-sdk` are documented here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.8] — 2026-09-13

The version number now matches the Takeal platform release the SDK was
checked against, so this release jumps from 0.1.0 to 0.2.8 (platform tag
`v0.2.8`).

### Changed

- **API paths are versioned.** Every request now goes to `/v1/...`
  (`/v1/auth/login`, `/v1/me/deposits`, …); the SDK adds the prefix itself,
  so `baseUrl` stays the bare API origin and resource calls are unchanged.
  Only `/ready` and `/branding` remain unversioned. The API answers the old
  unversioned paths with `410 Gone`, so 0.1.0 no longer works against it.
- The npm page links to the repository with a plain `https://` URL.

### Added

- `client.auth.register()` creates an account and signs it in. Takes an
  optional `wallet_currency`.
- `client.auth.completeTotpSetup()` finishes a `totp_setup_required` login
  and returns the ten one-time backup codes.
- `client.auth.changePassword()`. The account's other sessions are signed out.
- `client.sessions`: `list()`, `revoke(jti)` and `revokeOthers()`.
- `client.push`: `status()`, `save()`, `remove()`, plus `enable(registration)`
  and `disable(registration)`, which subscribe or unsubscribe the browser and
  update the server in one call.
- Sub-exports `@takeal/cusfront-sdk/wallet`, `/sessions` and `/push`. Auth
  types (`User`, `LoginResponse`, `Session` and the rest) are exported from
  the package root.

- `client.blog.list()` / `client.blog.get(slug)` — public posts returned as
  structured blocks (`body_blocks`) plus raw Markdown, so a site renders them
  in its own components instead of fighting server-side HTML.
- `client.subscriptions.get()` / `.set(channels)` — the user's announcement
  channels, with `available` reflecting what the deployment can deliver.
- `client.deposits.quote()` + `quote_id` on `initiate()` — cross-currency
  top-ups now execute against a rate-locked quote (the wallet holds a single
  local currency; the API converts on funding). `Deposit` gains
  `quote_id` / `fx_rate` / `fx_spread_bps` / `credited_currency` /
  `credited_amount`.
- `client.branding.get()` — fetches the deployment's public runtime brand
  config (`GET /branding`): platform / portal names, logo, favicon and the new
  `wallet_label` (how the end-user's balance is called, e.g. "Acme Wallet").
- `BrandConfig.walletLabel` — build-time fallback for the same label.

### Changed

- Docs: "master balance" wording replaced by "wallet balance" everywhere. No
  API field names changed.
- Generated types refreshed from the current API spec (card-transaction
  billing fields, issuing metrics, branding). `refresh-types` now scrubs
  internal references from doc comments before generating.

## [0.1.0] — 2026-08-25 — first public release

Initial release of the typed client for the Takeal end-user API.

### Added

- `createClient({ baseUrl, brand?, tokenStore?, fetch?, validate? })` — the
  entry point; resources hang off the returned client.
- **Auth** (`client.auth`) — staged login (`login` → optional `verifyTotp` /
  `verifyOtp` / `switchMethod`), `me`, `signOut`. JWT auto-stored on success.
- **Deposits** (`client.deposits`) — `initiate` / `get` / `list` / `refund`
  (money in via a funder connector), with `Idempotency-Key` support.
- **Cards** (`client.cards`) — `create` / `get` / `list` / `balance` plus the
  ownership-gated `freeze` / `unfreeze` / `terminate`, and the security-gated
  `reveal` (re-auth with password + optional TOTP).
- **Balance** (`client.balance`) — per-currency wallet balance lookup.
- **Telegram Mini App** (`@takeal/cusfront-sdk/telegram`) — `fromTelegramWebApp`
  / `fromInitData` exchange a Telegram-signed `initData` for an authenticated
  client; `parseInitData` / `assertWellFormed` helpers; `client.auth.exchangeTelegram`
  + `client.auth.linkEmail` for the auto-provision-then-attach-email flow.
- **Webhooks** (`@takeal/cusfront-sdk/webhooks`) — isomorphic, no-network
  HMAC-SHA256 signature verifier (`verifyWebhook`).
- **React** (`@takeal/cusfront-sdk/react`) — optional `ClientProvider` +
  `useMe` / `useDeposits` / `useCards` / `useBalance` hooks (React is a peer dep,
  never bundled).
- Pluggable token storage (`defaultBrowserStore` / `inMemoryStore` / custom
  `TokenStore`), typed `ApiError` / `NetworkError`, and runtime `BrandConfig`
  for whitelabel theming.
- Dual ESM + CJS builds with `.d.ts` types; per-resource sub-entrypoints for
  tree-shaking.

[Unreleased]: https://git.wiseless.xyz/takeal/cusfront-sdk/compare/v0.1.0...HEAD
[0.1.0]: https://git.wiseless.xyz/takeal/cusfront-sdk/releases/tag/v0.1.0
