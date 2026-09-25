# Changelog

All notable changes to `@takeal/cusfront-sdk` are documented here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `client.history.list({ cardId?, cursor?, limit?, lang? })` and
  `client.history.all()`: everything that happened to the user's money in
  one list, newest first. Card payments (declines too, with the reason in
  plain words), refunds, card issuance with its fee, card top-ups,
  transfers between the user's cards as one entry, wallet top-ups with the
  conversion and the rate, fees and corrections. `kind`, `status` and
  `direction` stay open strings, so a kind added later doesn't break a
  build.

- `client.attribution`: `touch()` records a visit (no session needed; a
  visit with nothing new is not stored), `status()` says whether to ask
  "how did you hear about us", `answerSurvey()` answers it once.
- `anonymousKey()` keeps the visitor's anonymous id in a cookie and in
  `localStorage` for a year and restores one from the other; in the
  Telegram Mini App it is `tg:<telegram id>`. `currentTouch()` reads the
  page address, the referrer, the Mini App's start code and the Metrica
  and Google Analytics cookies.
- `auth.register({ attribution })` and `auth.exchangeTelegram({ attribution })`
  credit the new account with the visitor's touches and analytics ids.

- The product card on `CardProduct`: `tagline` (one line under the name),
  `benefits` (selling points, in order) and `tile_image_url` (a picture for
  the tile; fall back to `design.image_url` when `null`). Both
  `listProducts()` and `catalog()` carry them.

### Changed

- `listProducts()` and `catalog()` come in the order the operator arranged
  the storefront. `is_default` still marks the product issued when none is
  chosen, but it is no longer necessarily the first item.
- `price.currency` is the currency the buyer pays in: for a signed-in user
  their wallet currency, converted the way issuance charges it; in the
  public catalog the currency the operator priced the card in. It may
  differ from `CardProduct.currency`, the currency the card is held in.
- `price.label` is always the platform's own wording of the fee line.

## [0.3.21] — 2026-09-21

Checked against platform `v0.3.21`.

### Changed

- A card is issued for its product price alone. `CreateCardInput.initial_amount`
  is deprecated and no longer sent (the API ignores it); the balance a card
  starts with, when its product includes one, is part of the price and shown
  as `CardProduct.starting_balance`. Load money afterwards with `cards.topUp()`.

## [0.3.20] — 2026-09-21

Checked against platform `v0.3.20`.

### Added

- `client.cards.topUpTerms(id)` and `client.cards.topUp(id, { amount, idempotencyKey })`:
  a user moves money from the wallet onto their own card
  (`GET` / `POST /me/cards/{id}/topup`). The result carries the card, its new
  balance and the wallet balance. Types `TopUpTerms`, `TopUpInput`,
  `CardTopUp`, `TopUpResult`.

## [0.3.18] — 2026-09-20

Checked against platform `v0.3.18` (API `0.3.18`).

### Added

- `client.cards.catalog()`: the card catalog without a session
  (`GET /card-products`), for a landing page or the cabinet before sign-in.
  Same shape as `listProducts()`, list prices, cacheable for a minute.

### Changed

- `InitiateDepositInput.metadata` documents the two cross-connector keys:
  `return_url` for the post-3DS return, and `mock_scenario` on test
  deployments (`happy`, `pending`, `redirect`, `fail`). The `redirect`
  scenario now lands on a hosted page that approves or declines and comes
  back to `return_url`, so the whole redirect path can be built against the
  mock.

## [0.3.12] — 2026-09-16

Checked against platform `v0.3.12`.

### Changed

- `client.cards.reveal(id)` takes no re-auth: the signed-in session is enough
  (the API stopped asking for the password and the TOTP code). The old
  `RevealCardInput` argument is still accepted and ignored; it is deprecated
  and goes away in the next major.
- `Card` no longer carries `connector_slug` and `provider_reference`: the API
  keeps those for operators. `product` and `design` say what a holder needs.

## [0.3.7] — 2026-09-16

Checked against platform `v0.3.7` (API `0.3.6`, nothing in the end-user
surface changed between the two).

### Added

- `CardDesignRef.image_url_back`: the back of the card, when the design has
  one (`null` or absent for a one-sided design — show the front on both
  sides). The default design's back is `/card-designs/default.svg?side=back`.
  Pass it through `client.assetUrl()` like `image_url`.
- `CardOtpData` and `isCardOtp(item)` for the `card_otp` inbox item: the
  confirmation code the issuer sent for a 3-D Secure payment (`purpose:
  "payment"`) or for adding the card to Apple Pay / Google Pay (`purpose:
  "wallet"`), with the merchant, amount, card last four and
  `expires_in_minutes`.

### Changed

- Types regenerated from the `v0.3.6` API: card designs are two-sided and
  WebP only; `PATCH /me/cards/{id}` also accepts the designs a deployment
  offers on every product. `client.cards.update(id, { designId })` is the
  helper for that; there is no reissue.

## [0.3.0] — 2026-09-15

### Added

- `client.notifications` (sub-export `@takeal/cusfront-sdk/notifications`):
  the inbox and notification preferences. `list({ cursor?, limit?,
  unreadOnly?, category? })`, `unreadCount()`, `markRead(id)`,
  `markAllRead(before?)`, `remove(id)`, `getPreferences()` and
  `setPreferences({ primary_channel?, categories?, locale? })`. Types
  `InboxItem`, `NotificationPage`, `NotificationPreferences`,
  `NotificationCategory`, `NotificationChannel`.
- `client.devices` (sub-export `@takeal/cusfront-sdk/devices`): `list()`,
  `register(input)`, `remove(id)`, plus `registerWebPush(registration,
  { label?, vapidPublicKey? })` and `unregisterWebPush(registration,
  { deviceId? })`, which subscribe or unsubscribe the browser and keep the
  device list in step. Types `Device`, `DeviceKind`, `DevicePlatform`,
  `RegisterDeviceInput`, `RegisteredDevice`.
- `createClient({ client: { platform, version? } })`. Every request now
  carries `X-Takeal-Client: <platform>; <version>`. `platform` is detected
  when omitted (`telegram-miniapp` inside Telegram, `pwa` when installed,
  `web` otherwise); `version` defaults to the SDK version. The resolved
  descriptor is readable as `client.client`; `SDK_VERSION`,
  `detectClientPlatform` and `CLIENT_HEADER` are exported from the root.
- `@takeal/cusfront-sdk/telegram`: the Mini App helpers announce
  `telegram-miniapp` and, after a successful exchange, register the app as a
  `telegram_miniapp` device (best-effort; `registerDevice: false` skips it).
- `useNotifications(opts?)` and `useUnreadCount({ pollMs? })` in
  `@takeal/cusfront-sdk/react`. The badge count refreshes on an interval and
  on a `{ type: "takeal:push" }` message from the service worker;
  `PUSH_MESSAGE_TYPE` carries the string.

- Card catalog: `client.cards.listProducts()` and `client.cards.getProduct(id)`
  return the cards a user can order (`CardProduct`: name, description, type,
  currency, artwork, the designs to choose from, the issuance price after the
  user's subscription discount, free-form `features`).
- `client.cards.create()` takes `productId`, `name` and `designId`; with a
  `productId`, `type` is optional. `client.cards.update(id, { name?, designId? })`
  renames a card or changes its design.
- `Card` gains `name`, `design` and `product`.
- `client.assetUrl(url)` and the standalone `resolveAssetUrl(baseUrl, url)`
  turn the image URLs the API returns (absolute, or relative to the API origin
  like the default card design) into ones a browser can load.
- `useCardProducts()` in `@takeal/cusfront-sdk/react`.
- `client.auth.exchangeTelegram()` takes `provision` (default `true`). With
  `provision: false` an unknown Telegram id resolves to `{ stage: "unknown" }`
  instead of creating an account, so a Mini App can ask the user whether to
  create one or attach the Telegram to an account they already have.
- `client.auth.linkTelegram({ initData, email, password })` attaches the
  Telegram account behind `initData` to an existing email + password account
  and signs in. Same envelope as `login`; the JWT is stored.
- `client.me` (sub-export `@takeal/cusfront-sdk/me`): `linkTelegram(initData)`
  and `unlinkTelegram()` for a signed-in user.
- `User.telegram` — `{ username, linked_at }` or `null`.
- `@takeal/cusfront-sdk/telegram`: `provision` in the options of
  `fromInitData` / `fromTelegramWebApp`; a new `exchangeInitData()` that
  returns `{ client, session }` for apps that want to branch on the outcome;
  `TelegramUnknownError` (carries `initData`), thrown by `fromInitData` /
  `fromTelegramWebApp` when `provision: false` is set and the Telegram id
  has no account.

### Deprecated

- `client.push` (`enable`, `disable`, `save`, `remove`, `status`): the
  endpoint keeps working as an alias over Web Push devices, but new code
  should call `client.devices.registerWebPush` / `unregisterWebPush`.
- `client.subscriptions`: announcement channels are now the `marketing`
  category of the notification preferences. The endpoint keeps working; use
  `client.notifications.setPreferences({ categories: { marketing: { ... } } })`.

### Changed

- `exchangeTelegram()` is typed to return `JwtIssued | TelegramUnknown` when
  `provision` is passed as a `boolean`. Calls without `provision` (or with
  `provision: true`) keep returning `JwtIssued`, so existing code compiles
  unchanged.

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
