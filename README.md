# @takeal/cusfront-sdk

Typed TypeScript client for the **Takeal end-user API**: sign-up and login, wallet, deposits, cards, sessions, the notification inbox, devices and webhook signature verification.

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

New users sign up with `register`, which also signs them in (or with no
password at all, by a code from the e-mail; see below):

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
// 1. The catalog: what the user can order, in the order the operator
//    arranged the storefront. `is_default` marks the product issued when
//    the user does not choose; it can sit anywhere in the list.
const products = await client.cards.listProducts();
// Before sign-in (a landing page), the same list at list prices:
// const products = await client.cards.catalog();

for (const p of products) {
  // The tile: the operator's picture when there is one, the card design
  // otherwise. `image_url` is absolute for uploaded designs and a path
  // relative to the API for the deployment default; `assetUrl` handles both.
  const img = client.assetUrl(p.tile_image_url ?? p.design.image_url);

  // Price after the user's subscription discount; `null` means free.
  // `price.currency` is what the user pays in (their wallet currency once
  // signed in), which need not be the currency the card is held in.
  const price = p.price
    ? p.price.discount_bps > 0
      ? `${p.price.amount} ${p.price.currency} (was ${p.price.base_amount}, ${p.price.discount_bps / 100}% off)`
      : `${p.price.amount} ${p.price.currency}`
    : "free";

  // The product card: name, one-line tagline, selling points, description.
  console.log(p.name, p.tagline, p.benefits, p.description, p.card_type, p.currency, price, img);
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

### Card states

A card is not always ready the moment it comes back from `create()`:

```ts
switch (card.status) {
  case "pending":
    // The issuer took the order and has not issued the card yet. The price is
    // paid. Show "being issued", no numbers, no actions; the card turns
    // `active` by itself, or `failed` with the price back on the wallet.
    break;
  case "frozen":
    // Who froze it decides what the user can do. The issuer's own freeze
    // (a risk check, a lost-card report) is not the holder's to undo.
    if (card.status_source === "provider") {
      hideUnfreezeButton();
      say("The card was frozen by the issuer. The freeze is lifted through the issuer's support.");
    } else {
      showUnfreezeButton(); // cards.unfreeze(card.id)
    }
    break;
  case "terminating":
    // Closing. The balance comes back when the issuer is done: to the wallet,
    // or to the new card when the card was reissued (`reissued_to_card_id`).
    break;
}

if (card.close_blocked === "first_purchase_required") {
  // Hide "close": this card closes after its first purchase.
}
if (card.topups_pending) {
  // Money on its way to the card, in the card's currency. Show it next to the
  // balance; the balance itself has not moved yet.
}
if (card.topups_held) {
  // A top-up waited too long. The money is safe and support settles it; say
  // so instead of offering a retry.
}
if (card.card_form === "physical") {
  // Plastic: the numbers are on the card, and it takes a PIN (see below).
}
if (card.in_transit) {
  // A reissued card: what was left on the old one is on its way here.
  // stage "issuer": the old card's issuer hasn't returned it yet;
  // stage "loading": it has, and the money is being put on this card.
  // Show it next to the balance, not in it.
}
if (card.reissued_to_card_id) {
  // This card was replaced; link to the new one.
}
```

A card that stopped working before its term (the issuer closed its BIN, froze
or closed the card, the card broke) is reissued for free by support. The user
gets a new card on the same product with `reissued_from_card_id` pointing at the
old one, and the old card gets `reissued_to_card_id`. The old card's balance
follows once its issuer returns it: until then the new card carries it in
`in_transit`, and the history has a `closed_card_balance` entry, `pending` until
the money is on the new card. The user is told at each step (`card_reissued`,
`card_reissue_delivered`; `card_reissue_on_wallet` when the new card could not
take the money and it went to the wallet instead).

`status_source` is `holder`, `operator` or `provider`, or `null` for a card
whose status never changed. Trying to unfreeze a card the issuer froze answers
409 `card_locked`.

`resolveAssetUrl(baseUrl, url)` is the same helper as a standalone function,
exported from the package root, for code that has no client at hand.


## What a card costs

A card is issued for its product's `price`, nothing else is taken from the
wallet. Some providers insist on a starting balance; when the product has one
it is shown as `starting_balance` and is already part of the price. Everything
beyond that goes onto the card with `topUp()`.

## Topping up a card

Money moves from the wallet onto the user's own card in one call. Read the
terms first: they say whether the card can be topped up now, what the wallet
holds and the product's floor and cap for one top-up.

```ts
const terms = await client.cards.topUpTerms(card.id);
if (!terms.available) showError(terms.reason);

const { card: updated, card_balance, wallet } = await client.cards.topUp(card.id, {
  amount: "15.00",                 // in terms.currency
  idempotencyKey: crypto.randomUUID(),
});
```

Every error is a sentence the user can read (`error.message`): not enough in
the wallet (402), amount outside the floor or cap (400), card frozen or still
being issued (409), provider declined or unreachable (502/503, the wallet is
untouched).

Some issuers load a card a little later than they take the order. Then
`topup.status` comes back as `pending`: the wallet has paid, `card_balance`
has not moved, and the amount shows in `card.topups_pending`. It turns
`confirmed` on its own (the user gets a `card_topup` notification), or
`failed` with the money back on the wallet. A top-up that waits longer than
the deployment allows is `stalled` and shows in `card.topups_held`: support
finishes it, either back to the wallet (`returned`) or, when the issuer kept
the money, closed with a reason (`written_off`).

## Topping up a card directly

Some deployments let a top-up go straight onto a card, past the wallet, and
some have no wallet at all. Ask the API instead of hard-coding it:

```ts
const options = await client.fundingOptions.list();
// [{ slug, mode: "wallet" | "spool" | "mixed", targets: ["wallet", "card"],
//    methods: ["card", "crypto"], issue_card: true, method_terms: [...] }]
const direct = options.find((o) => o.targets.includes("card"));
```

Top up an existing card with `card_id`, or issue a new card with its first
top-up with `issue_card` (the fields of `cards.create`). The card's price
comes out of the top-up and the rest is its starting balance.

```ts
const deposit = await client.deposits.initiate({
  amount: "25.00",
  currency: "USD",
  method: "card",
  funder_slug: direct.slug,
  card_id: card.id,                 // or: issue_card: { productId, name }
  idempotencyKey: crypto.randomUUID(),
});
```

Paying in another currency than the card's needs a quote in the card's
currency first: `deposits.quote({ amount, currency, card_id })`, or
`target_currency` for a card that doesn't exist yet.

## Signing in with a code from the e-mail

A user can sign in, or sign up, with nothing but their address: a six-digit
code goes there, and the code signs them in. An address with no account gets
one at that moment, with no password. The first call answers the same for
both, so the form doesn't tell anyone whose addresses the platform has.

```ts
const { challenge_id, resend_at } = await client.auth.requestEmailCode({ email });
// show the code field; keep "send again" off until resend_at

const session = await client.auth.verifyEmailCode({
  challengeId: challenge_id,
  code,          // the six digits the user typed
  remember: true,
  consents: ["terms", "personal_data"],
});
session.account_created; // true when the address was new
```

The code works for 10 minutes and takes five tries; a new code replaces the
old one. One address gets a code at most once a minute and five an hour, so
handle 429 `resend_too_soon` and `too_many_requests` (the message says when
to try again). A wrong code is 401 `invalid_code`. An account that already
has a password signs in either way. Operator accounts can't use codes: they
get 403 `second_factor_required` and sign in with the password and the
authenticator.

## Buying a card in one step

When the user picks a card before they have an account (a "Get the card"
button on the site), let the sign-in order it too. They see the payment page
right after the code, with nothing to pick twice and no password to make up:

```ts
const { challenge_id } = await client.auth.requestEmailCode({ email });
// … the user types the code from the e-mail …
const session = await client.auth.verifyEmailCode({
  challengeId: challenge_id,
  code,
  promoCode,                         // the form's promo code, if any
  consents: ["terms", "personal_data"],
  cardOrder: {
    productId,                       // the card they clicked
    method: "sbp",
    metadata: { return_url: `${location.origin}/cabinet` },
  },
});
if (session.card_order) {
  location.href = session.card_order.deposit.redirect_url!;
} else {
  // session.card_order_error says why no payment was opened (the product
  // is off sale, SBP is down, there's no rate). The user is signed in, so
  // show the reason and open the ordinary card screen.
}
```

The same works for an address that already has an account: the card goes to
that account. `auth.register({ email, password, cardOrder })` does it with a
password instead.

The API prices the card in the payment's currency (`card_order.amount`, in
roubles for SBP) with the rate locked, and opens the top-up that issues it.
The consents ticked on the form go with the order. A user who is already
signed in gets the same with `client.cards.order({ productId, method,
idempotencyKey })`. The card shows as `pending_payment` until the payment is
confirmed and is issued after that.

## Topping up by SBP

A rouble top-up through Russia's instant payments goes like this: the user
picks SBP, sees the rate, pays on the bank's page, comes back, and the wallet
is bigger. The API prices each way of paying on its own terms, so read them
before drawing the form.

```ts
// 1. The connector that takes SBP, and what it costs. `method_terms` has
//    one entry per method: the currency to ask for, the fee and its kind,
//    how long a quote lives, the floor, the cap and the day's limit.
const options = await client.fundingOptions.list();
const funder = options.find((o) => o.methods.includes("sbp"))!;
const sbp = funder.method_terms.find((m) => m.method === "sbp")!;
// sbp.source_currency → "RUB"; sbp.fee_kind → "markup"; sbp.fee_bps → 2000;
// sbp.quote_ttl_seconds → 300; sbp.min_amount, sbp.max_amount, sbp.daily_limit_per_user

// 2. The user types roubles. The quote locks the rate for quote_ttl_seconds.
const quote = await client.deposits.quote({
  amount: "1000",
  currency: "RUB",
  connectorSlug: funder.slug,
  method: "sbp",
});
// quote.credited_amount → "10.41" USD at a bank rate of 80 ₽ and a 20 % markup.

// 3. What to show. With `fee_kind === "markup"` the fee sits in the rate: show
//    the rate and the amount credited, no fee line. The rate in the form
//    people know, roubles per unit of the wallet currency:
const perUnit = Number(quote.source_amount) / Number(quote.credited_amount); // 96.06 ₽ per $
show(`${quote.credited_amount} ${quote.credited_currency} at ${perUnit.toFixed(2)} ₽/$, until ${quote.expires_at}`);
// If the user types the wallet amount instead, work the roubles out on the
// client from the same rate and quote that: roubles = wanted × perUnit,
// rounded up to the kopeck, then `quote()` again with that amount.
// With `fee_kind === "commission"` show the fee as its own line:
// commission = credited × fee_bps / 10000.

// 4. Pay. The deposit is a redirect: send the user to the bank's page.
const deposit = await client.deposits.initiate({
  amount: quote.source_amount,
  currency: "RUB",
  method: "sbp",
  funder_slug: funder.slug,
  quote_id: quote.id,
  metadata: { return_url: `${location.origin}/wallet?deposit=` },
  idempotencyKey: crypto.randomUUID(),
});
location.href = deposit.redirect_url!;

// 5. Back from the bank: poll until the deposit settles, then redraw the
//    balance. `expires_at` is when the deposit stops waiting for the payment.
const final = await client.deposits.get(deposit.id);
// final.status: "confirmed" → balance updated; "expired" → nobody paid in
// time, offer a new quote; "failed" → the bank refused, final.failure_reason says why.
```

A deposit that expired and is paid after all is still credited, at the rate
of its quote, and turns `confirmed`. The amount outside the method's floor or
cap, or over the day's limit, is refused by `quote()` and `initiate()` with
400 `deposit_limit` and a sentence for the user.

The deposit comes back with `target: "card"` and a `card_load_status`. It is
`pending` until the card provider has loaded the card, then `succeeded`. If
the card can't take it, the deployment either puts the money on the wallet
(`returned_to_wallet_at` is set and the user gets a notification) or keeps
it for support to finish (`card_load_status: "failed"`). Errors:
`target_not_allowed` (this connector doesn't top up that target),
`card_not_eligible` (the card isn't active or isn't prepaid),
`amount_too_small` (a new card's price plus a starting balance don't fit in
the amount).

## Card details and PIN

`cards.reveal(id)` returns the full card number and CVV to the signed-in user,
with the billing address the card is registered at and, when the platform
keeps one, the `cardholder` (name, phone, address) a checkout asks for. No
password or code is asked again; the API rate-limits and logs every call.
Keep the result in memory only and clear it after `expires_in_seconds`.

Some issuers do not hand out the numbers and show them on a page of their
own instead. Then `reveal_url` is set and `pan` and `cvv` are empty:

```tsx
const r = await client.cards.reveal(card.id);
if (r.reveal_url) {
  // The issuer's page. Open it at once: the address is short-lived and
  // often good for one opening. Never store or log it.
  return <iframe src={r.reveal_url} sandbox="allow-scripts allow-same-origin" title="Card details" />;
}
showNumbers(r.pan, r.cvv, r.expiry_month, r.expiry_year);
```

A physical card takes a PIN from the user. Send it once; neither the SDK nor
the API keeps it, and the user gets a notification that it was set:

```ts
await client.cards.setPin(card.id, { pin: "4321" }); // four to six digits
```

400 when the PIN is not four to six digits or the card is not active, 409
`provider_refused` when the issuer did not take it, 501 for a virtual card.

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
5. Once signed in, the Mini App registers itself as a `telegram_miniapp`
   device, so the user's notifications arrive as messages from the bot. A
   failure here is logged as a warning and never blocks the sign-in; pass
   `{ registerDevice: false }` to skip it. The client also announces itself as
   `telegram-miniapp` in `X-Takeal-Client` (see [Client platform](#client-platform-x-takeal-client)).

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

## Money history

One list of everything that happened to the user's money, newest first:
card payments and declines, refunds, card issuance, card top-ups, transfers
between the user's own cards, wallet top-ups, fees.

```ts
const page = await client.history.list({ limit: 30 });           // lang: "ru" for Russian titles
const older = await client.history.list({ cursor: page.next_cursor! });
const oneCard = await client.history.list({ cardId: card.id });
```

Each entry reads the same way: `title`, `amount` (always positive) with
`direction` (`out`, `in` or `internal`), `status` and `occurred_at`.

- `amount` is in the currency the operation happened in. When there was a
  conversion, `counter_amount` holds the other side and `fx_rate` the rate:
  a purchase in euros billed in dollars, or a top-up paid in roubles that
  arrived in dollars.
- A declined payment has `status: "declined"` and a `decline_reason` with a
  stable `code` and a `text` to show as is.
- A transfer between cards is one entry with `card` and `to_card`.
- `pending` means the operation isn't finished yet.

New kinds will be added. Show an entry of an unknown `kind` with its
`title`, `amount` and `status` rather than hiding it.

A `bonus` entry counts bonuses, not money: its `amount.currency` is `BNS`.
When bonuses paid for something, `counter_amount` is the part of the price
they covered.

## Bonuses

Bonuses are a discount on the platform's services. They pay for part of a
new card's price or of the subscription fee. Bonuses that came with a
payment can also be added on top of a top-up; gifts can't.

```ts
const bonus = await client.bonus.get();      // balance, where they can go, credits, history

// "Was / now" before the user confirms, worked out on the server:
const p = await client.bonus.preview({ purpose: "card_issuance", amount: "10", currency: "USD", productId });
// p.amount "10", p.bonus_units "5", p.due "5"

const card = await client.cards.create({ productId, currency: "USD", idempotencyKey });
// card.bonus: { units, price, covered, paid, currency } when bonuses were used

const top = await client.deposits.initiate({ amount: "25", currency: "USD", method: "card", idempotencyKey });
// top.bonus_units / top.bonus_value: what was added on top of the 25
```

- Bonuses are used by default whenever the user has some. Pass
  `useBonus: false` (cards) or `use_bonus: false` (deposits) to pay in money
  only, or `bonusAmount` / `bonus_amount` to cap how many go in. The
  subscription fee takes bonuses on its own.
- Show the balance as a number of bonuses and nothing else. No money figure
  next to it: money belongs next to a price ("was / now", "N bonuses will be
  used").
- In your copy, call bonuses a discount. Keep words like funds, withdraw or
  exchange away from them.

## Card fees and debt

A card product has a tariff (`product.tariff`): a fee per payment (fixed
and percent), per decline that was the user's doing (not enough money, wrong
details, a frozen card, a subscription not cancelled with the merchant), and
per cash withdrawal. Show it on the product card. A fee comes off the card
and is a line of its own in the history (`kind: "card_fee"`).

What the card can't cover is owed by the user, and the next top-up of any of
their cards or of the wallet pays it first. Always show that amount before
the user pays:

```ts
const debt = await client.debt.get();           // { total: [{ amount, currency }], items }
const owed = await client.debt.owedIn("USD");  // "0.8", or "0"

const q = await client.deposits.quote({ amount: "1000", currency: "RUB", card_id });
// q.debt_withheld "0.8" comes off q.credited_amount; the card gets the rest

const order = await client.cards.order({ productId, method: "sbp", idempotencyKey });
// order.debt_withheld is already in order.card_amount and order.amount

const terms = await client.cards.topUpTerms(cardId);
// terms.debt: { amount, currency } or null; a top-up from the wallet pays it first
```

A deposit carries `debt_quoted` (what it will withhold at most) and, once
paid, `debt_withheld`. The user is notified when a debt arises and when it is
paid; a payment against the debt shows in the history as `debt_payment`.

## Closing a card with money on it

`cards.terminate()` refuses a card that still holds money (409
`move_balance_first` or `contact_support_to_close`). Offer a close with a
refund instead: the card is closed at its issuer right away, and once the
issuer returns what was left on it, the money goes back to the payments the
card was topped up with, in the currency they were paid in, newest payment
first. Unspent bonuses are not refunded, and a debt the user was told about
is withheld first.

```ts
const req = await client.closeRequests.request(cardId); // asking again returns the same request
// req.status: "accepted" → "awaiting_issuer" → "refunding" → "refunded"
// req.balance { amount, currency }: what the card held
// req.bonus_excluded, req.debt_withheld: kept back, in the card's currency
// req.refund_total { amount, currency }: what goes back in all, once known
// req.refunded, req.on_the_way, req.refunds[]: what went back so far
// req.deadline_at: when the refund is due by

const mine = await client.closeRequests.list();       // newest first
const one = await client.closeRequests.forCard(cardId); // or null
```

Show amounts only; the API never gives the exchange rate, and the UI should
not work one out either.

When the money can't go back the way it came, the request turns
`payout_details_required` and the user is notified. Ask for a bank account
or a card in their own name:

```ts
await client.closeRequests.submitPayoutDetails(req.id, {
  kind: "account",
  holder_name: "Ivan Petrov",
  account_number: "40817810099910004312",
  bank_code: "044525225",
});
// or { kind: "card", holder_name, card_number }
// → "identity_check" (details can still be corrected) → "manual_payout" → "refunded"
```

Only the last four digits come back (`payout_details.masked`). 409 codes of
`request()`: `card_locked`, `first_purchase_required`, `card_not_closable`,
`topup_in_progress`, `card_closing`, `no_balance` (the card holds nothing:
`cards.terminate()` it), `provider_refused`.

## Promo and referral codes

A code goes with the operation it is for. At sign-up an unknown or expired
code never blocks the account: it is created, and `code_result` says why the
code wasn't applied.

```ts
// Sign-up on the site, with the code from the form or the link.
const s = await client.auth.register({ email, password, code: "SPRING" });
// s.code_result: { status: "applied" | "rejected", reason, message, effects }

// Mini App: a `startapp=<code>` link is read by the server; `code` overrides it.
const tg = await client.auth.exchangeTelegram({ initData });
// tg.code_result is set for a new account opened with a code

// Check a code before the user pays; nothing is used up.
const c = await client.codes.validate({ code: "SPRING", operation: "card_issuance", amount: "10", currency: "USD" });
// c.valid, c.discount, c.discount_value "5", c.effects

await client.cards.create({ productId, currency: "USD", promoCode: "SPRING", idempotencyKey });
await client.deposits.initiate({ amount: "100", currency: "USD", method: "card", promo_code: "SPRING", idempotencyKey });
await client.subscription.setPromoCode("SPRING"); // the monthly fee, while the code allows

// For referrers: the code, the link to share, friends (no names) and rewards.
const ref = await client.referral.get();
```

- A code that can't be used on a card or a top-up fails the request with
  400 `promo_code_<reason>` and a sentence to show.
- A code the user signed up with keeps working on the operations its
  program covers, within its limits, so "half off the first card" can come
  with a sign-up link without the user typing it again.
- `client.subscription.get()` shows a gift subscription as `kind: "gift"`;
  `gift_until: null` means it doesn't end.
- Rewards and code bonuses are bonuses: a discount on our services, not
  money. Show friends without names; the API sends none.

## Documents

Everything the operators write lives in one tree: blog posts, the knowledge
base, legal pages. `client.documents` reads it. The calls work before the
user signs in and show more once they have: a signed-in user also gets the
articles marked for users. The SDK attaches the session token when it has
one, so the same call serves the public site and the cabinet.

```ts
// The public blog, newest first.
const { documents, total } = await client.documents.list({ category: "blog", perPage: 10 });

// The knowledge base for a sidebar: folders plus the articles in them.
const tree = await client.documents.tree({ category: "knowledge-base" });
const roots = tree.folders.filter((f) => f.parent_id === null);

// One document by its permanent address.
const doc = await client.documents.get("how-to-top-up");

// Tags work across categories.
const tagged = await client.documents.list({ tag: "fees" });
const tags = await client.documents.tags();
```

A document comes as `body_blocks` (typed nodes to map onto your components)
and `body_markdown` (for your own renderer). Image URLs are relative to the
API origin; `client.assetUrl(url)` makes them absolute.

Links between documents arrive as site paths: `/blog/<slug>` for a post,
`/docs/<slug>` for anything else. Each document's `site_path` says which one
it lives at. Route those two prefixes to your document pages and the links
keep working when a document is renamed or moved.

### Legal pages and their history

Every saved text is a version with the date it took effect. The footer
links to the current text; a contract page can show what applied on a given
day.

```ts
const offer = await client.documents.get("offer");               // in force now
const history = await client.documents.versions("offer");        // newest first
const old = await client.documents.get("offer", { at: "2026-01-01T00:00:00Z" });
const v2 = await client.documents.version("offer", 2);
```

A version dated ahead stays out of `get()` until its day comes, so a new
redaction can be prepared in advance.

### Changing the email

A new address proves it is the user's with a code sent there; nothing
changes before the code comes back, and the old address gets a notice.

```ts
const { challenge_id, destination_hint } = await client.auth.requestEmailChange({ email });
// "We sent a code to ne***@example.com"
const user = await client.auth.confirmEmailChange({ challengeId: challenge_id, code });
```

`linkEmail` is only for the first address of an account made in the Mini App.

### Receipts

Every payment gets a numbered receipt within a minute: a wallet top-up, a
card top-up and a card's issue price. It is mailed to the user and can be
shown next to the payment.

```ts
const [receipt] = await client.receipts.list({ refId: deposit.id });
// receipt.number "R-000123", paid_amount + paid_currency, method,
// and for a top-up credited_amount + credited_currency and rate
```

### Consents

Send the boxes the user ticked with the sign-up and with a card order. The
server records each one with the version of its documents in force at that
moment, so the client never sends document versions.

```ts
await client.auth.register({ email, password, consents: ["terms", "personal_data", "marketing"] });
await client.cards.create({ productId, currency: "USD", consents: ["terms"], idempotencyKey });

const { consents } = await client.consents.get();   // where each one stands
await client.consents.set("marketing", false);       // advertising off in every channel
```

The cookie banner reports its choice the same way, signed in or not; before
sign-in it is kept under the anonymous key and moves to the account at
sign-up. Declining analytics deletes the visitor's recorded visits and
analytics ids.

```ts
await client.consents.setCookies({ analytics: false });
```

`terms` covers the offer, the tariffs and the privacy policy. A deployment
can refuse a sign-up without `terms` and `personal_data`
(400 `consents_required`). Only `marketing`, `cookies_analytics`,
`holder_data_transfer` and `dispute_documents_transfer` can be withdrawn
later; the required ones go with the account.

#### What reaches the card issuer

By default the card issuer gets no real details of the user. A product with
`holder_data_required: true` is different: its cards go out with the user's
real details, so the cabinet shows a consent screen before the order and
sends `holder_data_transfer` with it. Without the consent the order fails
with 409 `holder_data_consent_required`. Once given, the consent stands for
later cards until the user withdraws it.

```ts
import { HOLDER_DATA_CONSENT, type ConsentKind } from "@takeal/cusfront-sdk";

const consents: ConsentKind[] = ["terms"];
if (product.holder_data_required) {
  if (!(await askHolderDataConsent())) return; // your consent screen
  consents.push(HOLDER_DATA_CONSENT);
}
await client.cards.order({ productId: product.id, method: "sbp", consents, idempotencyKey });
```

The user's documents go to the issuer in a dispute only after a consent of
its own, given for the disputed card:

```ts
await client.consents.allowDisputeDocuments({ cardId: card.id });
```

### From `client.blog`

`client.blog` still works for one release and is marked deprecated. Same
posts, same slugs: `client.blog.list()` is `client.documents.list({ category: "blog" })`
with `documents` instead of `posts` in the result, and `client.blog.get(slug)`
is `client.documents.get(slug)`.

## Where users come from

Every account gets a record of where its owner came from: the first visit,
the last one before sign-up and how many there were in between. The app's
part is to report visits and to pass the visitor's key at sign-up.

```ts
import { anonymousKey, currentTouch } from "@takeal/cusfront-sdk";

// On every page load. A visit with nothing new is not stored, so there is
// no need to decide on the client side.
const key = anonymousKey();
if (key) await client.attribution.touch({ anonymous_key: key, ...currentTouch() });

// In the sign-up form.
await client.auth.register({ email, password, attribution: { anonymous_key: key } });
```

`anonymousKey()` keeps a random id in a cookie and in `localStorage` for a
year. If one of the two is cleared, the id comes back from the other. Pass
`{ cookieDomain: ".example.com" }` when the site and the app live on
different subdomains. In the Telegram Mini App the key is the Telegram id,
and the server reads the `startapp` code from `initData` itself.

A visit counts as your campaign only when its code is in the operator's
campaign directory. Put the code in `utm_campaign`, or in a Telegram link as
`startapp=<code>`.

After sign-up, ask how the user heard about you, once:

```ts
const { survey_pending } = await client.attribution.status();
if (survey_pending) {
  // "friend" | "telegram_channel" | "search" | "ads" | "review" | "other" | "skipped"
  await client.attribution.answerSurvey("other", "A podcast");
}
```

## Analytics

Call `track()` once per event and the SDK hands it on: to PostHog on every page, to Yandex Metrica on public pages only. Nothing is bundled. PostHog comes from your own `posthog-js` when you pass `load`, otherwise from its script; Metrica comes from its tag script. Neither loads until `initAnalytics` asks for it.

Every page belongs to a zone, and the zone decides what is collected:

| | `public` | `cabinet`, `miniapp` |
|---|---|---|
| PostHog autocapture | on, with element texts | on, without texts or attributes |
| Heatmaps | on | off |
| Masking | inputs | every input and all text |
| Session recording | off | off; `sessionRecording: true` turns it on, masked |
| Yandex Metrica | yes, without Webvisor | never |

### Public pages

```ts
import { initAnalytics, track, identify, posthogDistinctId } from "@takeal/cusfront-sdk/analytics";

initAnalytics({
  zone: "public",
  posthog: { key: "phc_…", host: "https://example.com/ingest" },
  metrika: { counterId: 12345678 },
});

track("signup_started");

// The sign-up form.
const session = await client.auth.register({
  email,
  password,
  attribution: { anonymous_key: key, posthog_distinct_id: await posthogDistinctId() },
});
track("signup_completed");
identify(session.user.id);
```

### Cabinet

```ts
import { initAnalytics, identify, resetAnalytics, NO_CAPTURE_CLASS } from "@takeal/cusfront-sdk/analytics";

initAnalytics({
  zone: "cabinet",
  posthog: {
    key: "phc_…",
    host: "https://example.com/ingest",
    load: () => import("posthog-js").then((m) => m.default), // posthog-js 1.187 or later
  },
});

identify(session.user.id); // after sign-in
resetAnalytics();          // on sign-out
```

Put card details, balances and the operations history inside `NO_CAPTURE_CLASS` (`ph-no-capture`). PostHog leaves these blocks out of autocapture and blanks them in recordings.

```tsx
<div className={NO_CAPTURE_CLASS}>{balance}</div>
```

Turn on `sessionRecording: true` last, after you have watched one of your own cabinet sessions in PostHog and seen no values in it at all: no card number, balance, amount or e-mail.

### Telegram Mini App

The same as the cabinet, with `zone: "miniapp"`.

### Metrica only on public pages

Metrica never loads in the cabinet or in the Mini App, even when `metrika` is passed. From the browser it gets page views and two goals, `signup_started` and `signup_completed`. Deposits, cards and subscriptions reach Metrica from the server with their amount in roubles, so the browser doesn't send them. Webvisor, the click map and link tracking are off: Metrica sees only what the SDK sends it.

When the site and the cabinet are one app, call `setAnalyticsZone("cabinet")` as the user enters the cabinet. PostHog switches to masking, and Metrica stops receiving anything. A full page load into the cabinet is safer, because then Metrica isn't on the page at all. If `initAnalytics` finds Metrica on a cabinet page, it warns in the console.

### Events and page views

`track(name, props)` accepts only names from `ANALYTICS_EVENTS`, and any other name is a type error. Besides the two sign-up events, the list holds the platform's own event types (`deposit_confirmed`, `card_issued` and the rest), so an event has the same name in PostHog and in reports built from the database.

Call `page()` on every route change. `initAnalytics` sends the first page view itself, and the same address twice in a row counts once.

Identify users by the platform's user id (`session.user.id`), never by e-mail. PostHog creates profiles for identified users only.

### What never leaves the browser

Every event goes through one filter, PostHog's autocapture included:

- in page addresses, UUIDs, numeric ids and long tokens become `:id`, query parameters with secrets or personal data are dropped, and so is the fragment. Campaign tags stay;
- properties named `email`, `phone`, `name`, `first_name` and the like are dropped, and so is any value that looks like an e-mail address, a phone number or a card number;
- amounts and currencies pass.

The same filter is exported as `sanitizeUrl` and `sanitizeProperties`.

### A proxy on your own domain

Ad blockers cut direct requests to PostHog, so serve it from a path on your domain and pass that path as `host`. The path should:

- forward `/static/*` to `https://eu-assets.i.posthog.com/static/*` and everything else to `https://eu.i.posthog.com`;
- be left out of the service worker's offline cache, and never cached anywhere else either;
- stay out of the sitemap and be closed to indexing (`Disallow` in `robots.txt`, `X-Robots-Tag: noindex`).

With Next.js:

```js
// next.config.js
export default {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: "https://eu-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/:path*", destination: "https://eu.i.posthog.com/:path*" },
    ];
  },
};
```

With Workbox, add `/^\/ingest\//` to `navigateFallbackDenylist` and give the path no runtime caching route.

## Support chat

`client.support` is the chat with support: one conversation per person, the
same one the Telegram bot feeds. Support agents answer from their own inbox,
and the answers come back here.

```ts
// A message with a picture from a file input.
const file = input.files![0];
const sent = await client.support.send({
  text: "The card was declined at the shop",
  files: [{ fileName: file.name, contentType: file.type, data: file }],
});
// sent.status === "queued" at first; "delivered" once support has it.

const chat = await client.support.list();
// chat.status: "none" | "open" | "resolved"; chat.items oldest first.
for (const m of chat.items) {
  if (m.author === "support") {
    // Cleaned HTML, ready to show: paragraphs, line breaks, bold, italic,
    // strikethrough, code, links, lists and quotes. Nothing else gets through.
    bubble.innerHTML = m.html;
    caption.textContent = m.operator_name ?? "Support";
  } else {
    bubble.textContent = m.text;
  }
  for (const a of m.attachments) {
    const blob = await client.support.attachment(a.id); // the person's own or support's
  }
}

// Older messages:
if (chat.has_more) await client.support.list({ before: chat.items[0].created_at });
```

Show what the person sent right away, with its `status`: `queued` turns into
`delivered` within seconds, and `failed` means the message could not be passed
on (support sees those too and can send them again). Files are pictures and
PDF up to 20 MB by default; the platform sets both, and a file it doesn't take
comes back as a 400 with the reason. Up to 10 files per message.

When support closes the conversation after answering, `chat.rating_request`
asks how it went (a `support_rating_requested` notification points there too).
Show 1 to 5 and an optional comment, then
`client.support.rate(chat.rating_request.id, { rating: 5, comment })`. The
question goes away once answered; a person who wrote from Telegram is asked
there instead, with buttons.

A new answer also arrives as a `support_reply` notification (see
[Notifications](#notifications-inbox)) with `href: "/support"`. Writing to a
conversation support has closed opens it again.

## Notifications (inbox)

Everything the API tells a user (a confirmed deposit, a card transaction, a
sign-in from a new device) is kept as an inbox item, whatever else was sent
as a nudge (a push, a Telegram message, an email). The inbox is what your app
shows; `client.notifications` reads it.

```ts
const page = await client.notifications.list({ limit: 20 });
// page.items (newest first), page.next_cursor, page.unread_count

const more = await client.notifications.list({ cursor: page.next_cursor! });
const onlyMoney = await client.notifications.list({ unreadOnly: true, category: "money" });

await client.notifications.markRead(page.items[0].id);
await client.notifications.markAllRead();          // or markAllRead(isoTimestamp)
await client.notifications.remove(page.items[1].id);
const badge = await client.notifications.unreadCount();
```

An item has `title`, `body`, a `category` (`money`, `card`, `security`,
`account`, `marketing`), `read_at` (`null` while unread), free-form `data`
about the event, and `href`: a path inside your app to open on tap
(`/cards/<id>`, `/deposits/<id>`, `/subscription`, `/settings/sessions`) or
`null`. Route `href` through your own router; the SDK doesn't navigate.

A `card_otp` item carries a code the card issuer sent and could not deliver
itself; the user needs it right now. `data.purpose` says what for: `payment`
(a 3-D Secure purchase; `merchant_name`, `amount` and `currency` are there)
or `wallet` (adding the card to Apple Pay or Google Pay). Show the code large,
with a copy button and a countdown from `expires_in_minutes`; `isCardOtp(item)`
narrows the type.

A small inbox screen:

```tsx
function Inbox() {
  const [page, setPage] = useState<NotificationPage | null>(null);
  useEffect(() => { client.notifications.list({ limit: 20 }).then(setPage); }, []);
  if (!page) return <Spinner />;
  return (
    <ul>
      {page.items.map((n) => (
        <li key={n.id} className={n.read_at ? "" : "unread"}
            onClick={async () => { await client.notifications.markRead(n.id); if (n.href) router.push(n.href); }}>
          <strong>{n.title}</strong>
          <p>{n.body}</p>
        </li>
      ))}
    </ul>
  );
}
```

(The React entry has `useNotifications()` and `useUnreadCount()`, which do the
state handling for you; see [React hooks](#react-hooks-takealcusfront-sdkreact).)

### Preferences

Where the nudge goes is up to the user:

```ts
const prefs = await client.notifications.getPreferences();
// prefs.primary_channel: "push" | "telegram" | "email" | "sms" | null (automatic)
// prefs.categories: { money: { push: true, email: false }, ... }
// prefs.locale: "en" | "ru" | null
// prefs.available_channels: what this deployment can deliver on; render toggles only for these

await client.notifications.setPreferences({
  primary_channel: "telegram",
  categories: { marketing: { email: true, telegram: false } },
  locale: "ru",
});
```

Every field of `setPreferences` is optional; only what you pass changes.
`primary_channel: null` goes back to automatic (the server picks by the user's
devices). `security` and `money` can't be switched off completely: the inbox
always gets them and at least one outward channel stays on. `marketing` is off
until the user opts in. A `locale` of `null` means "use the language of the
Telegram profile, else the deployment's default".

`client.subscriptions` (announcement channels) is deprecated: it now reads and
writes `categories.marketing` and keeps working, but new code should use
`setPreferences({ categories: { marketing: { ... } } })`.

## Devices

A user has many devices: each browser with a Web Push subscription, each phone
with an FCM or APNs token, and a marker that says "uses the Telegram Mini App".
The server picks where a notification goes from them: a mobile app first,
otherwise the device seen most recently. What each platform can receive:

| Platform | Outward channel | Inbox |
|---|---|---|
| PWA / browser | Web Push | yes |
| Telegram Mini App | messages from the bot (no Web Push) | yes |
| iOS / Android app | FCM / APNs (tokens are accepted now; delivery comes later) | yes |

Web Push in a browser, once notification permission is granted:

```ts
const reg = await navigator.serviceWorker.ready;
if ((await Notification.requestPermission()) === "granted") {
  const device = await client.devices.registerWebPush(reg, { label: "Chrome on Mac" });
  // device.id, device.vapid_public_key
}

// Settings screen, later:
await client.devices.unregisterWebPush(reg);              // this session's Web Push devices
await client.devices.unregisterWebPush(reg, { deviceId }); // or exactly one
```

`registerWebPush` fetches the deployment's VAPID key, subscribes the browser
and registers the subscription as a `webpush` device on the client's platform
(`pwa` or `web`). It throws when push isn't set up on the deployment. Pass
`vapidPublicKey` in the options to skip the key lookup when you already hold it.

Anything else goes through `register` / `list` / `remove`:

```ts
// A native app with a push token:
await client.devices.register({ kind: "fcm", platform: "android", credential: { token }, app_version: "1.4.0" });
// A Telegram Mini App (done for you by @takeal/cusfront-sdk/telegram):
await client.devices.register({ kind: "telegram_miniapp", platform: "telegram", credential: {} });

const devices = await client.devices.list();   // is_current marks the ones from this session
await client.devices.remove(devices[0].id);
```

Registering the same credential twice refreshes the device (and re-enables a
disabled one) instead of creating another. `app_version` defaults to the
version in `X-Takeal-Client`.

`client.push` (`enable`, `disable`, `save`, `remove`, `status`) is deprecated.
The endpoint behind it keeps working as an alias over Web Push devices, but
new code should use `devices.registerWebPush` / `devices.unregisterWebPush`.

Your service worker shows the notification; the payload is JSON with `title`,
`body` and `url`. To keep an open tab's badge fresh, also post a message to
the open clients:

```js
self.addEventListener("push", (event) => {
  const payload = event.data.json();
  event.waitUntil(Promise.all([
    self.registration.showNotification(payload.title, { body: payload.body, data: { url: payload.url } }),
    self.clients.matchAll({ type: "window" }).then((clients) =>
      clients.forEach((c) => c.postMessage({ type: "takeal:push" }))),
  ]));
});
```

## Client platform (`X-Takeal-Client`)

Every request carries `X-Takeal-Client: <platform>; <version>`, for example
`pwa; 0.3.0` or `telegram-miniapp; 0.2.8`. The server stores it on the session
and uses it to notice a sign-in from a new device and to choose the
notification channel. Set it with the `client` option:

```ts
const client = createClient({
  baseUrl: "https://api.your-deployment.example.com",
  client: { platform: "ios", version: "1.4.0" },
});
client.client; // { platform: "ios", version: "1.4.0" }
```

`platform` is one of `pwa`, `web`, `telegram-miniapp`, `ios`, `android`.
When you leave the option out, the SDK detects it: `telegram-miniapp` when
`window.Telegram.WebApp.initData` is present, `pwa` when the page runs
installed (`navigator.standalone` or a `display-mode: standalone` media
query), `web` otherwise and on any non-browser runtime. Native wrappers
(Capacitor, React Native) can't be told apart from a browser, so pass `ios`
or `android` yourself. `version` defaults to the SDK version (`SDK_VERSION`).

## Platform version (`client.ready()`)

Each SDK release works with a range of platform versions, published as
`SUPPORTED_MEISTER` (for example `">=0.5.0, <0.7.0"`). `client.ready()` calls
`GET /ready` (public, no login) and checks the version the deployment reports
against that range:

```ts
import { createClient, SUPPORTED_MEISTER } from "@takeal/cusfront-sdk";

const client = createClient({ baseUrl: "https://api.your-deployment.example.com" });
const r = await client.ready();
// {
//   compatible: true,
//   platformVersion: "0.5.0",
//   supportedMeister: ">=0.5.0, <0.7.0",
//   healthy: true,
//   status: "ready",
//   raw: { ... }   // the full /ready body
// }
if (!r.compatible) console.warn(r.warning);
```

`compatible` is `false`, with a one-line `warning`, in two cases: the version
is outside the range, or the platform didn't report one (deployments older
than 0.5.0). A degraded platform answers 503 with the same body; `ready()`
returns it with `healthy: false` rather than throwing. Network failures and
other errors throw as usual. `satisfies(version, range)` is exported too if
you want to run the same check yourself.

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
- `@takeal/cusfront-sdk/funding-options` — `FundingOptionsResource` (the ways to top up; see [Topping up a card directly](#topping-up-a-card-directly)).
- `@takeal/cusfront-sdk/cards` — `CardsResource` (cards backed by the wallet balance).
- `@takeal/cusfront-sdk/balance` — `BalanceResource` (per-currency wallet balance).
- `@takeal/cusfront-sdk/bonus` — `BonusResource` (bonuses and a price preview; see [Bonuses](#bonuses)).
- `@takeal/cusfront-sdk/close-requests` — `CloseRequestsResource` (close a card with money on it; see [Closing a card with money on it](#closing-a-card-with-money-on-it)).
- `@takeal/cusfront-sdk/documents` — `DocumentsResource` (blog posts, the knowledge base, legal pages; see [Documents](#documents)).
- `@takeal/cusfront-sdk/blog` — `BlogResource` (deprecated: the blog is a category of Documents now).
- `@takeal/cusfront-sdk/subscriptions` — `SubscriptionsResource` (announcement channels; deprecated, see [Preferences](#preferences)).
- `@takeal/cusfront-sdk/wallet` — `WalletResource` (the wallet's currency).
- `@takeal/cusfront-sdk/sessions` — `SessionsResource` (where the user is signed in).
- `@takeal/cusfront-sdk/push` — `PushResource` (Web Push subscription; deprecated, see [Devices](#devices)).
- `@takeal/cusfront-sdk/notifications` — `NotificationsResource` (the inbox and notification preferences).
- `@takeal/cusfront-sdk/devices` — `DevicesResource` (Web Push, mobile push tokens, the Telegram Mini App marker).
- `@takeal/cusfront-sdk/me` — `MeResource` (link or unlink Telegram for the signed-in user).
- `@takeal/cusfront-sdk/history` — `HistoryResource` (the user's money history).
- `@takeal/cusfront-sdk/consents` — `ConsentsResource` (what the user agreed to).
- `@takeal/cusfront-sdk/receipts` — `ReceiptsResource` (a numbered receipt for every payment).
- `@takeal/cusfront-sdk/support` — `SupportResource` (the chat with support; see [Support chat](#support-chat)).
- `@takeal/cusfront-sdk/attribution` — `AttributionResource`, `anonymousKey`, `currentTouch` (where users come from).
- `@takeal/cusfront-sdk/webhooks` — HMAC-SHA256 signature verifier (no network, isomorphic).
- `@takeal/cusfront-sdk/react` — optional React hooks layer (`ClientProvider` + `useMe` / `useDeposits` / `useCards` / `useCardProducts` / `useBalance` / `useNotifications` / `useUnreadCount`). React is a `peerDependency`, never bundled.
- `@takeal/cusfront-sdk/telegram` — Telegram Mini App `initData` → authenticated client bridge.
- `@takeal/cusfront-sdk/analytics` — `initAnalytics`, `track`, `page`, `identify`, `resetAnalytics`, `posthogDistinctId` (PostHog and Yandex Metrica behind one call; see [Analytics](#analytics)).

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
> CVV to the signed-in user, along with the billing address the card is
> registered at, which merchants ask for at checkout; no password or code is
> asked again, and the API rate-limits and logs every call. The rest of
> `client.cards` is catalog, listProducts, getProduct, create, get, list,
> update, balance, topUpTerms, topUp, freeze, unfreeze and terminate.

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
- `useUnreadCount({ pollMs? })` — unread inbox items for a badge
  (`client.notifications.unreadCount()`). Refreshes in the background every
  `pollMs` (default 30000; `0` turns polling off) and whenever the page's
  service worker posts `{ type: "takeal:push" }` (see [Devices](#devices)),
  without flipping `loading`.

`useNotifications({ unreadOnly?, category?, limit? })` returns the same shape
plus `markRead(id)`, `markAllRead()`, `loadMore()` and `loadingMore`.
`loadMore` fetches the next page by `next_cursor` and appends its items to
`data.items`; the two mark helpers update `data` right away so the list
doesn't flicker.

```tsx
function Inbox() {
  const inbox = useNotifications({ limit: 20 });
  const unread = useUnreadCount();

  if (inbox.loading) return <Spinner />;
  if (inbox.error) return <ErrorBanner onRetry={inbox.refetch} />;
  return (
    <>
      <h2>Inbox {unread.data ? `(${unread.data})` : ""}</h2>
      <button onClick={() => void inbox.markAllRead()}>Mark all read</button>
      {inbox.data!.items.map((n) => (
        <Row key={n.id} unread={!n.read_at} onClick={() => void inbox.markRead(n.id)}>
          {n.title}
        </Row>
      ))}
      {inbox.data!.next_cursor && (
        <button disabled={inbox.loadingMore} onClick={() => void inbox.loadMore()}>More</button>
      )}
    </>
  );
}
```

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

Codes worth a wording of their own on the card screens:

| `e.code` | What happened | What to tell the user |
|---|---|---|
| `provider_unavailable` (503) | The card issuer did not answer. Nothing was moved. | Try again in a few minutes. The card itself keeps paying: only the action failed. |
| `provider_declined` (502) | The issuer refused the move. Nothing was moved. | The issuer would not do it; the wallet is untouched. |
| `provider_refused` (409) | The issuer did not take the PIN. | Try another PIN or later. |
| `card_locked` (409) | Support holds the card, or the issuer froze it. | Only support can change this card. |
| `holder_data_consent_required` (409) | The card goes out with the user's real details and they have not agreed to that. | Show the consent screen, then order again with `holder_data_transfer`. |
| `not_supported` (501) | This issuer cannot do that (take money back off a card, reveal, PIN). | Hide the control. |
| `insufficient_funds` (402) | The wallet holds less than that. | Top up the wallet first. |

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
