# Changelog

All notable changes to `@takeal/cusfront-sdk` are documented here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] — first public release

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
- **Balance** (`client.balance`) — per-currency master balance lookup.
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
