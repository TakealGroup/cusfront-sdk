import type { ConsentChannel, ConsentKind } from "./consents.js";
import type { HttpClient } from "../http.js";
import type { CustomerInfo } from "../types/customer.js";
import type { Deposit, DepositMethod } from "./deposits.js";

/**
 * Cards resource — `client.cards.*`.
 *
 * The end-user "money OUT" surface: a user issues themselves a card backed by
 * their wallet balance via an issuer connector. Mirrors the Takeal API's
 * `/me/cards` routes:
 *
 *   GET    /card-products            → catalog (public, before sign-in)
 *   GET    /me/card-products         → listProducts (the catalog, personal price)
 *   GET    /me/card-products/{id}    → getProduct
 *   GET    /me/cards/{id}/topup      → topUpTerms
 *   POST   /me/cards/{id}/topup      → topUp
 *   POST   /me/cards                 → create
 *   GET    /me/cards                 → list (most recent first)
 *   GET    /me/cards/{id}            → get
 *   PATCH  /me/cards/{id}            → update (name, design)
 *   GET    /me/cards/{id}/balance    → balance (prepaid remaining)
 *   POST   /me/cards/{id}/freeze     → freeze
 *   POST   /me/cards/{id}/unfreeze   → unfreeze
 *   POST   /me/cards/{id}/transfer   → transfer (to another of their cards)
 *   POST   /me/cards/{id}/terminate  → terminate (one-way)
 *   POST   /me/cards/{id}/reveal     → reveal (the numbers, or a provider page)
 *   POST   /me/cards/{id}/pin        → setPin (physical cards)
 *
 * The lifecycle actions are ownership-gated server-side: a caller can only
 * freeze / unfreeze / terminate a card that belongs to them (else 404).
 *
 * Today only PREPAID is wired end-to-end; CREDIT and GIFT return 400 from
 * the Takeal API until their issuer flows land.
 */

/** Card product. Only `prepaid` is fully implemented today. */
export type CardType = "credit" | "prepaid" | "gift";

/**
 * Card lifecycle state.
 *
 * - `pending_payment`: the row exists but the issuance fee has not been
 *   paid yet; the provider has not been called and nothing is visible.
 * - `pending`: the issuer accepted the order and has not issued the card
 *   yet. The price is charged. Show the card as "being issued" with no
 *   numbers; it becomes `active` on its own, or `failed` with the price
 *   back on the wallet. Some issuers take minutes, some a day.
 * - `active`, `frozen`: the usual states. Read `status_source` before
 *   offering to unfreeze.
 * - `terminating`: the holder (or the issuer) closed the card and the
 *   issuer has not finished: the balance comes back to the wallet when it
 *   does. Show it as closing; no actions apply.
 * - `terminated`, `redeemed`, `failed`: final.
 */
export type CardStatus =
  | "pending_payment"
  | "pending"
  | "active"
  | "frozen"
  | "terminating"
  | "terminated"
  | "redeemed"
  | "failed";

/**
 * Who made the card's last status change. `provider` on a `frozen` card
 * means the issuer froze it (a risk check, a lost-card report): the holder
 * cannot unfreeze it, so do not offer the button; say the freeze is lifted
 * through the issuer's support. `holder` and `operator` freezes are undone
 * with `unfreeze()` as usual.
 */
export type CardStatusSource = "holder" | "operator" | "provider";

/** `virtual` cards show their numbers in the app; `physical` cards are plastic and have a PIN. */
export type CardForm = "virtual" | "physical";

/**
 * Why `terminate()` is refused right now: `first_purchase_required` (the
 * card closes after its first purchase) or `card_locked` (only support can
 * change it).
 */
export type CloseBlockedReason = "first_purchase_required" | "card_locked";

/**
 * A card design: the artwork a card is shown with. `image_url` is the front,
 * `image_url_back` the back; both are either absolute URLs or paths relative
 * to the API origin (the deployment's default design is
 * `/card-designs/default.svg`, its back `/card-designs/default.svg?side=back`)
 * — pass them through `client.assetUrl()` before rendering. `image_url_back`
 * is `null` or absent for a one-sided design: show the front on both sides.
 * The picture is in the proportions of a plastic card (1586×1000) and draws
 * no chip or card data; the client renders the number, name and expiry on
 * top. `id` is `null` for the deployment default, which is rendered from the
 * branding settings.
 */
export interface CardDesignRef {
  id: string | null;
  name?: string;
  image_url: string;
  image_url_back?: string | null;
}

/**
 * What issuing a card costs the caller. `amount` is the price after the
 * user's subscription discount; `base_amount` is the list price and
 * `discount_bps` the discount in basis points (1000 = 10 %). `label` is the
 * operator's wording for the fee line ("Card issuance").
 */
export interface CardProductPrice {
  /** What the user pays, decimal string, after their subscription discount. */
  amount: string;
  /**
   * ISO 4217 code: the currency the buyer pays in. A signed-in user sees
   * their wallet currency, converted the way issuance will charge it; the
   * public catalog shows the currency the operator priced the card in. It
   * is not necessarily the currency the card is held in (`CardProduct.currency`).
   */
  currency: string;
  /** Wording for the fee line, e.g. "Card issuance". */
  label: string;
  /** The list price before the discount, decimal string, in the same currency. */
  base_amount: string;
  /** Discount applied, in basis points (1000 = 10%). */
  discount_bps: number;
}

/**
 * A card the user can order, as listed by `GET /me/card-products`. The id is
 * opaque — it names a product, never a provider. The list comes in the
 * order the operator arranged the storefront; `is_default` marks the
 * product issued when none is chosen, wherever it sits. `designs` is the
 * set the user may pick from (may be empty when only the default applies);
 * `design` is what the card gets when no choice is made. `price` is `null`
 * for a free card. `features` is an operator-defined object (scheme, wallet
 * support, load limits, …) with no fixed keys.
 */
export interface CardProduct {
  id: string;
  name: string;
  /** One line under the name on the tile, or `null`. */
  tagline: string | null;
  description: string | null;
  /** Selling points to list on the product card, in order. May be empty. */
  benefits: string[];
  /**
   * Picture for the product tile, absolute URL, or `null`: show the card
   * design (`design.image_url`) then.
   */
  tile_image_url: string | null;
  card_type: CardType;
  currency: string | null;
  features: Record<string, unknown>;
  design: CardDesignRef;
  designs: CardDesignRef[];
  price: CardProductPrice | null;
  /**
   * The balance a new card comes with, already included in `price`; `null`
   * when the card starts empty and is funded with `topUp()` afterwards.
   */
  starting_balance: CardBalance | null;
  /** True for the product the deployment issues when none is chosen. */
  is_default: boolean;
  /**
   * Issuing this card sends the user's real personal details to the card
   * issuer. Show the consent screen before the order and send
   * `holder_data_transfer` in its `consents` (or give it once with
   * `client.consents.allowHolderData()`); without it the order fails with
   * 409 `holder_data_consent_required`. `false`: the issuer gets no real
   * details and no extra consent is asked.
   */
  holder_data_required: boolean;
  /**
   * What a card on this product costs to use, on top of the payments
   * themselves. A fee the card can't cover is owed and paid from the next
   * top-up (see `client.debt`). Every line is `"0"` when the product
   * charges nothing for it.
   */
  tariff: CardTariff;
}

/**
 * A card product's fees for using the card. Decimal strings: the fixed
 * amounts are in `currency` (the card's), the shares in percent of the
 * operation's amount.
 */
export interface CardTariff {
  /** `null` for a product held in several currencies: the card's own then. */
  currency: string | null;
  /** Per settled card payment, fixed. */
  operation_fixed: string;
  /** Per settled card payment, percent of its amount. */
  operation_percent: string;
  /**
   * Per payment declined through the user's own doing: not enough money,
   * wrong card details, a frozen card, a subscription not cancelled with the
   * merchant. A decline caused by the issuer or the platform costs nothing.
   */
  decline: string;
  /** Per cash withdrawal, fixed; charged instead of the payment fee. */
  cash_withdrawal_fixed: string;
  /** Per cash withdrawal, percent of its amount. */
  cash_withdrawal_percent: string;
}

/**
 * A card record as the Takeal API returns it. Mirrors the `cards` table. Note the
 * SDK never receives the full PAN or CVV here — only `last4` + expiry. The
 * gift-card `redemption_code` is returned exactly once (on create) and
 * scrubbed from subsequent list/get responses.
 */
export interface Card {
  id: string;
  user_id: string;
  card_type: CardType;
  status: CardStatus;
  /** Last four digits of the PAN — safe to display. */
  last4: string | null;
  expiry_month: number | null;
  expiry_year: number | null;
  /** Gift cards only, present once on create then scrubbed. */
  redemption_code?: string;
  /** The balance the card was issued with, decimal string; `null` or `"0"` for a card issued empty. */
  initial_amount: string | null;
  currency: string;
  failure_reason: string | null;
  /** Who changed the status last; `null` when it never changed. See {@link CardStatusSource}. */
  status_source: CardStatusSource | null;
  /** Virtual or plastic. A `physical` card takes a PIN with {@link CardsResource.setPin}. */
  card_form: CardForm;
  /** Why the card cannot be closed right now, or `null` when it can. */
  close_blocked: CloseBlockedReason | null;
  /**
   * Top-ups the issuer has accepted and not loaded yet, summed, decimal
   * string in `currency`; `null` when there are none. Show it next to the
   * balance as money on its way to the card.
   */
  topups_pending: string | null;
  /**
   * Top-ups the issuer has held for too long, summed, decimal string in
   * `currency`; `null` when there are none. The money is safe and waits for
   * support to settle it; say so instead of offering a retry.
   */
  topups_held: string | null;
  /** The name the user gave the card, or `null`. */
  name: string | null;
  /** The artwork the card is shown with. Always present. */
  design: CardDesignRef;
  /** The product the card was issued from; `null` for cards issued without one. */
  product: { id: string; name: string } | null;
  created_at: string;
  updated_at: string;
  /** Only on the result of `create`, when bonuses paid part of the price. */
  bonus?: IssuanceBonus;
}

/** How bonuses changed a new card's price ("was / now"). Decimal strings in `currency`. */
export interface IssuanceBonus {
  /** Bonuses used. */
  units: string;
  /** The price before bonuses ("was"). */
  price: string;
  /** What the bonuses covered. */
  covered: string;
  /** What the wallet paid ("now"). */
  paid: string;
  currency: string;
}

export interface CreateCardInput {
  /**
   * A product id from {@link CardsResource.listProducts}. Sent as
   * `product_id`. When given, `type` and `issuer_slug` may be omitted; when
   * both are given they must agree with the product (400 `product_mismatch`).
   * Unknown, disabled or hidden product → 400 `unknown_product`.
   */
  productId?: string;
  /** A name for the card, 1–40 characters. Sent as `name`. */
  name?: string;
  /**
   * One of the product's `designs`. Sent as `design_id`. `null` or omitted
   * picks the product's default design; a design outside the product's set →
   * 400 `design_not_allowed`.
   */
  designId?: string | null;
  /**
   * `prepaid` (the only fully-wired type today), `credit`, or `gift`.
   * Optional when `productId` is given, required otherwise.
   */
  type?: CardType;
  /**
   * @deprecated Ignored since 0.3.21. A card is issued for its product price;
   * the balance it starts with, if the product includes one, is part of that
   * price (see `CardProduct.starting_balance`). Money is added afterwards
   * with {@link CardsResource.topUp}. The field is no longer sent.
   */
  initial_amount?: string;
  /** ISO 4217 code, e.g. `"USD"`. */
  currency: string;
  /**
   * Optional. Slug of a specific issuer to mint with. Omit to let
   * the Takeal API pick the first active issuer. Unknown slug → 400; empty issuer
   * list → 503.
   */
  issuer_slug?: string;
  metadata?: Record<string, string>;
  /** Structured billing details — real issuers require these for 3DS / KYC. */
  customer?: CustomerInfo;
  /**
   * Pay part of the price with bonuses. Sent as `use_bonus`. On by default
   * whenever the user has bonuses; `false` pays it all from the wallet.
   */
  useBonus?: boolean;
  /** The most bonuses to use, decimal string. Sent as `bonus_amount`. */
  bonusAmount?: string;
  /**
   * A promo code for the card's price. Sent as `promo_code`. Its discount
   * comes off before bonuses; `client.codes.validate` shows it first. A code
   * that can't be used fails the request with 400 `promo_code_*` and the
   * reason. Without one, the code the user signed up with applies when it
   * covers cards. Ignored inside `deposits.initiate({ issue_card })`: send
   * `promo_code` on the top-up there.
   */
  promoCode?: string;
  /**
   * Consents the user gave with the order (`terms`, `personal_data`,
   * `marketing`, `holder_data_transfer`). Recorded with the card, or with the
   * top-up inside `deposits.initiate({ issue_card })`, at the version of
   * their documents in force now. A product with `holder_data_required`
   * needs `holder_data_transfer` here unless it was given before.
   */
  consents?: ConsentKind[];
  /** Where they were given. Sent as `consent_channel`. */
  consentChannel?: ConsentChannel;
  /**
   * Required by the Takeal API on this write endpoint. Same key + body replays the
   * original card; same key + different body returns 409.
   */
  idempotencyKey: string;
}

/**
 * The wire body of a card request: the camelCase fields renamed to what
 * the API reads. Shared by {@link CardsResource.create} and the
 * `issue_card` block of `deposits.initiate`.
 */
export function cardRequestBody(
  input: Omit<CreateCardInput, "idempotencyKey" | "currency"> & { currency?: string },
): Record<string, unknown> {
  const {
    productId,
    name,
    designId,
    useBonus,
    bonusAmount,
    promoCode,
    consentChannel,
    initial_amount: _ignored,
    ...rest
  } = input;
  const body: Record<string, unknown> = { ...rest };
  if (productId !== undefined) body["product_id"] = productId;
  if (name !== undefined) body["name"] = name;
  if (designId !== undefined) body["design_id"] = designId;
  if (useBonus !== undefined) body["use_bonus"] = useBonus;
  if (bonusAmount !== undefined) body["bonus_amount"] = bonusAmount;
  if (promoCode !== undefined) body["promo_code"] = promoCode;
  if (consentChannel !== undefined) body["consent_channel"] = consentChannel;
  return body;
}

/**
 * A card bought in one step with {@link CardsResource.order}: the product and
 * how the user pays. The platform works out the amount to pay in the
 * payment's currency, locks the rate and opens the top-up that issues the
 * card.
 */
export interface CardOrderInput {
  /** A product id from {@link CardsResource.listProducts}. Sent as `product_id`. */
  productId: string;
  /** One of the product's designs; omit for its default. Sent as `design_id`. */
  designId?: string;
  /** A name for the card, 1 to 40 characters; defaults to the product name. */
  name?: string;
  /** How the user pays, e.g. `"sbp"`. */
  method: DepositMethod;
  /** The funding connector to pay through; omit to let the API pick one that takes `method`. Sent as `funder_slug`. */
  funderSlug?: string;
  /** ISO 4217 code of the payment; defaults to the currency the method is priced in. */
  currency?: string;
  /** Money to put on the card on top of its price, decimal string in the card's currency. Sent as `extra_load`. */
  extraLoad?: string;
  /** A promo code for the payment. Sent as `promo_code`. */
  promoCode?: string;
  /** Pay part of the price with bonuses; on by default. Sent as `use_bonus`. */
  useBonus?: boolean;
  /**
   * Consents given with the order. A product with `holder_data_required`
   * needs `holder_data_transfer` here unless it was given before.
   */
  consents?: ConsentKind[];
  /** Where they were given. Sent as `consent_channel`. */
  consentChannel?: ConsentChannel;
  /** Passed to the payment provider; `return_url` is where the payment page sends the user back. */
  metadata?: Record<string, string>;
}

/** What {@link CardsResource.order} returns: the top-up to pay and its price. */
export interface CardOrder {
  /** Send the user to `deposit.redirect_url` when `deposit.status` is `redirect_required`. The card is issued once the payment is confirmed. */
  deposit: Deposit;
  /** What the user pays, decimal string, in `currency`. */
  amount: string;
  currency: string;
  /** What the payment brings: the card's price, its starting balance and `debt_withheld`, in `card_currency`. */
  card_amount: string;
  card_currency: string;
  /**
   * What the user owes in card fees, in `card_currency`: included in
   * `card_amount` and paid from it first. `"0"` when nothing is owed. Show
   * it before the payment. Older platforms leave it out.
   */
  debt_withheld?: string;
}

/** Why a card ordered with the sign-up was not placed. The account exists all the same. */
export interface CardOrderError {
  code: string;
  message: string;
}

/** Build the API body of a card order. */
export function cardOrderBody(input: CardOrderInput): Record<string, unknown> {
  const body: Record<string, unknown> = {
    product_id: input.productId,
    method: input.method,
  };
  if (input.designId !== undefined) body["design_id"] = input.designId;
  if (input.name !== undefined) body["name"] = input.name;
  if (input.funderSlug !== undefined) body["funder_slug"] = input.funderSlug;
  if (input.currency !== undefined) body["currency"] = input.currency;
  if (input.extraLoad !== undefined) body["extra_load"] = input.extraLoad;
  if (input.promoCode !== undefined) body["promo_code"] = input.promoCode;
  if (input.useBonus !== undefined) body["use_bonus"] = input.useBonus;
  if (input.consents !== undefined) body["consents"] = input.consents;
  if (input.consentChannel !== undefined) body["consent_channel"] = input.consentChannel;
  if (input.metadata !== undefined) body["metadata"] = input.metadata;
  return body;
}

/** Remaining balance of a prepaid card. */
export interface CardBalance {
  amount: string;
  currency: string;
}

/** What a top-up of a card can be right now, from `GET /me/cards/{id}/topup`. */
export interface TopUpTerms {
  /** Whether the card can be topped up at this moment. */
  available: boolean;
  /** Why not, in plain words, when `available` is false. */
  reason: string | null;
  /** Currency top-ups are made in: the card's. */
  currency: string;
  /** What the wallet holds right now, in the wallet's currency. */
  wallet_available: CardBalance;
  /** Smallest single top-up the product allows, or `null` for no floor. */
  min: CardBalance | null;
  /** Largest single top-up the product allows, or `null` for no cap. */
  max: CardBalance | null;
  /**
   * What the user owes in card fees, in the card's currency, or `null` when
   * nothing is. A top-up from a wallet in the same currency pays it first
   * and the card gets the rest: show it before the top-up. Older platforms
   * leave it out.
   */
  debt?: CardBalance | null;
}

export interface TopUpInput {
  /** Amount to add, decimal string, in the card's currency. */
  amount: string;
  /**
   * Required. Same key + same amount replays the first outcome; same key +
   * different amount is 409. Use a stable UUID per attempt so a retried
   * network call cannot move the money twice.
   */
  idempotencyKey: string;
}

/**
 * Where a top-up stands.
 *
 * - `pending`: the issuer accepted it and has not loaded the card yet. The
 *   wallet is debited, the card balance is unchanged, the amount shows in
 *   `Card.topups_pending`. Most issuers finish within minutes.
 * - `confirmed`: the money is on the card.
 * - `failed`: the issuer refused; the wallet is credited back.
 * - `stalled`: pending for longer than the deployment allows. The money is
 *   safe and waits for support; it shows in `Card.topups_held`.
 * - `returned`: support sent the money back to the wallet.
 * - `written_off`: support closed it without the money coming back (the
 *   issuer kept it); `failure_reason` says so.
 */
export type CardTopUpStatus =
  "pending" | "confirmed" | "failed" | "stalled" | "returned" | "written_off";

/** One top-up attempt as the API records it. */
export interface CardTopUp {
  id: string;
  card_id: string;
  status: CardTopUpStatus;
  /** What landed on the card, decimal string, in `currency`. */
  amount: string;
  currency: string;
  /** What the wallet paid, decimal string, in `wallet_currency`. */
  wallet_amount: string;
  wallet_currency: string;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * The outcome of a top-up with the state to redraw: card, its balance, the
 * wallet. When `topup.status` is `pending`, the wallet has paid and
 * `card_balance` has not moved yet: show the amount as on its way
 * (`card.topups_pending`) and refresh the card later or on the
 * `card_topup` notification.
 */
export interface TopUpResult {
  topup: CardTopUp;
  card: Card;
  card_balance: CardBalance;
  wallet: CardBalance;
}

/** Fields a user can change on their own card. Omitted fields are left as they are. */
export interface UpdateCardInput {
  /** New name, 1–40 characters. Sent as `name`. */
  name?: string;
  /**
   * New design (one of the product's `designs`), or `null` for the product's
   * default. Sent as `design_id`.
   */
  designId?: string | null;
}

/**
 * Kept for callers written against 0.3.x: the API no longer asks for a
 * password or a code on reveal, the session is enough. Both fields are
 * ignored and will be dropped in the next major.
 * @deprecated
 */
export interface RevealCardInput {
  password?: string;
  totpCode?: string;
}

/**
 * Full card data from a successful reveal. **Security**: never persist this,
 * keep it in volatile memory only, clear it within `expires_in_seconds`, and
 * never write it to localStorage / logs (the API marks the response no-store).
 *
 * Some issuers hand out a page that shows the numbers instead of the
 * numbers themselves. Then `reveal_url` is set, `pan` and `cvv` are empty,
 * and the client opens the page in a frame; see the README for the frame.
 */
export interface RevealedCard {
  /** The card number; empty when `reveal_url` is set. */
  pan: string;
  /** The security code; empty when `reveal_url` is set. */
  cvv: string;
  expiry_month: number;
  expiry_year: number;
  holder_name: string;
  /**
   * A page at the card issuer that shows the details to the holder. Present
   * only for issuers that give a page instead of the numbers. Short-lived,
   * often single use: open it at once in an `<iframe>` and never store it.
   */
  reveal_url?: string;
  /**
   * The person the card is registered to at its issuer: what a checkout
   * asks for. Absent for cards issued before holders were kept.
   */
  cardholder?: Cardholder;
  /**
   * The address the card is registered at — what a merchant's checkout asks
   * for, and the postal code some of them decline a payment over. Absent
   * when the deployment has not set one.
   */
  billing_address?: BillingAddress;
  /** Display window before the client should auto-clear the data. */
  expires_in_seconds: number;
}

/** Postal address a card is registered at. Which parts exist depends on the country. */
export interface BillingAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

/**
 * The cardholder the issuer knows: the details to type into a checkout
 * that asks for the name, phone or address on the card. `source` says
 * whether the platform made them up (`generated`), the user supplied them
 * (`provided`) or both (`mixed`).
 */
export interface Cardholder {
  id: string;
  first_name: string;
  last_name: string;
  /** `YYYY-MM-DD`. */
  birth_date: string;
  /** E.164. */
  phone: string;
  /** A mailbox the platform owns; mail the issuer sends there reaches the user. */
  email: string;
  address: BillingAddress;
  source: "generated" | "provided" | "mixed";
}

/** The new PIN for a physical card. */
export interface SetPinInput {
  /**
   * Four to six digits, as the user typed them. Sent once to the issuer and
   * kept nowhere: not by the SDK, not by the API. Never log it.
   */
  pin: string;
}

/** What to move, and the key that makes a retry safe. */
export interface TransferInput {
  /** The card the money lands on. Must be the caller's, and of the same kind and currency. */
  toCardId: string;
  /** Amount to move, decimal string, in the cards' currency. */
  amount: string;
  /**
   * Required. The same key with the same body replays the first outcome; a
   * different body on the same key is 409.
   */
  idempotencyKey: string;
}

/** One transfer attempt as the API records it. */
export interface CardTransfer {
  id: string;
  from_card_id: string;
  to_card_id: string;
  /**
   * `confirmed` — the money is on the other card. `on_wallet` — it came off
   * the first card but the second did not take it, so it is on the wallet
   * and `failure_reason` says so in words. `pending` / `failed` otherwise.
   */
  status: "pending" | "confirmed" | "on_wallet" | "failed";
  amount: string;
  currency: string;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
}

/** A finished transfer with the balances to redraw both cards and the wallet. */
export interface TransferResult {
  transfer: CardTransfer;
  from_balance: CardBalance;
  to_balance: CardBalance;
  /** Holds the money when `transfer.status` is `on_wallet`. */
  wallet: CardBalance;
}

export class CardsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Issue a card backed by the user's wallet balance. Resolves to the new
   * `Card`. On a ledger failure after provider creation, the Takeal API rolls the row
   * to `failed` (never an orphaned active card); inspect `status` /
   * `failure_reason` on the result.
   * Errors: 409 `holder_data_consent_required` when the product has
   * `holder_data_required` and the user has not agreed to it.
   */
  async create(input: CreateCardInput): Promise<Card> {
    const { idempotencyKey, ...card } = input;
    return this.http.post<Card>("/me/cards", {
      body: cardRequestBody(card),
      idempotencyKey,
    });
  }

  /**
   * Buy a card in one step: the API prices the product in the payment's
   * currency, locks the rate and opens the top-up that issues the card.
   * Send the user to `order.deposit.redirect_url`; the card shows as
   * `pending_payment` until the payment is confirmed. The same
   * `idempotencyKey` returns the same order.
   * Errors: 400 `unknown_product` / `method_not_available` / a limit of the
   * way of paying, 409 `holder_data_consent_required` (the product has
   * `holder_data_required` and the user has not agreed to it), 503 no
   * funding connector or no exchange rate.
   */
  async order(input: CardOrderInput & { idempotencyKey: string }): Promise<CardOrder> {
    const { idempotencyKey, ...order } = input;
    return this.http.post<CardOrder>("/me/card-orders", {
      body: cardOrderBody(order),
      idempotencyKey,
    });
  }

  /**
   * The cards the caller can order, in the order the storefront shows them
   * (`is_default` marks the one issued when none is chosen). Each item
   * carries its product card (name, tagline, benefits, tile picture),
   * artwork, and the issuance price after the caller's subscription
   * discount, in the caller's wallet currency. Pass an item's `id` as
   * `productId` to {@link create}.
   */
  async listProducts(): Promise<CardProduct[]> {
    return this.http.get<CardProduct[]>("/me/card-products");
  }

  /** One product from the catalog. 404 when unknown, disabled or hidden. */
  async getProduct(id: string): Promise<CardProduct> {
    return this.http.get<CardProduct>(`/me/card-products/${encodeURIComponent(id)}`);
  }

  /**
   * The public catalog: the same products, order and default as
   * {@link listProducts}, but readable before sign-in, for a landing page or
   * the cabinet's first screen. Prices are list prices (`discount_bps` is
   * always 0); once the user is signed in, {@link listProducts} shows what
   * they pay. The API lets caches keep this response for a minute.
   */
  async catalog(): Promise<CardProduct[]> {
    return this.http.get<CardProduct[]>("/card-products");
  }

  /**
   * Rename the caller's own card or change its design. Resolves to the
   * updated card. 404 if the card isn't the caller's; 400 `invalid_name` /
   * `design_not_allowed` on a bad value.
   */
  async update(id: string, input: UpdateCardInput): Promise<Card> {
    const body: Record<string, unknown> = {};
    if (input.name !== undefined) body["name"] = input.name;
    if (input.designId !== undefined) body["design_id"] = input.designId;
    return this.http.patch<Card>(`/me/cards/${encodeURIComponent(id)}`, {
      body,
    });
  }

  /** Fetch one card by id. */
  async get(id: string): Promise<Card> {
    return this.http.get<Card>(`/me/cards/${encodeURIComponent(id)}`);
  }

  /** List the caller's cards, most recent first. */
  async list(): Promise<Card[]> {
    return this.http.get<Card[]>("/me/cards");
  }

  /**
   * Remaining balance of a prepaid card. `currency` is required by the Takeal API and
   * forwarded as a query param.
   */
  async balance(id: string, currency: string): Promise<CardBalance> {
    const q = new URLSearchParams({ currency }).toString();
    return this.http.get<CardBalance>(`/me/cards/${encodeURIComponent(id)}/balance?${q}`);
  }

  /**
   * What a top-up of this card can be right now: whether it is possible, the
   * currency, the wallet balance, and the product's floor and cap for one
   * top-up. Read it before drawing the form. 404 if the card isn't the caller's.
   */
  async topUpTerms(id: string): Promise<TopUpTerms> {
    return this.http.get<TopUpTerms>(`/me/cards/${encodeURIComponent(id)}/topup`);
  }

  /**
   * Move money from the wallet onto the caller's own card. The wallet is
   * debited first, then the card's provider loads the card; if the provider
   * refuses, the money is back on the wallet and the error says so. Resolves
   * to the card, its new balance and the wallet balance, so no second call
   * is needed. Errors carry a sentence the user can read: 400 outside the
   * floor or cap · 402 not enough in the wallet · 404 not the caller's card ·
   * 409 card frozen, closed or still being issued · 501 provider can't top
   * up · 502/503 provider declined or unreachable (wallet untouched).
   */
  async topUp(id: string, input: TopUpInput): Promise<TopUpResult> {
    const { idempotencyKey, amount } = input;
    return this.http.post<TopUpResult>(`/me/cards/${encodeURIComponent(id)}/topup`, {
      body: { amount },
      idempotencyKey,
    });
  }

  /**
   * Move money from one of the caller's cards to another. Both must be
   * theirs, active, in the same currency and of the same kind. The money
   * travels through the wallet one leg at a time: when the second leg does
   * not go through, the call still resolves, `transfer.status` is
   * `on_wallet` and the money is on the wallet — never between two cards.
   * Errors carry a sentence the user can read: 400 the same card twice,
   * different currencies or different kinds · 402 the card holds less than
   * that · 404 one of the cards isn't theirs · 409 a card is frozen, closed
   * or still being issued, or the key was reused with a different body ·
   * 501/502/503 the provider cannot or will not move it.
   */
  async transfer(fromCardId: string, input: TransferInput): Promise<TransferResult> {
    const { toCardId, amount, idempotencyKey } = input;
    return this.http.post<TransferResult>(`/me/cards/${encodeURIComponent(fromCardId)}/transfer`, {
      body: { to_card_id: toCardId, amount },
      idempotencyKey,
    });
  }

  /**
   * Freeze the caller's own card. Reversible via {@link unfreeze} while
   * `status_source` is `holder` or `operator`. The optional `reason` is
   * recorded on the audit trail. Resolves to the updated card. 404 if the
   * card isn't the caller's; 409 `card_locked` when support holds it; 501 if
   * the issuer can't freeze.
   */
  async freeze(id: string, reason?: string): Promise<Card> {
    return this.http.post<Card>(`/me/cards/${encodeURIComponent(id)}/freeze`, { body: { reason } });
  }

  /**
   * Reveal the FULL PAN + CVV for the caller's own card. The signed-in
   * session is all the API asks for; the call is rate-limited and audited
   * server-side. The Takeal API never persists this data and marks the
   * response no-store; the SDK returns it verbatim and holds nothing.
   *
   * **Consumer security duties** (the SDK can't enforce these for you):
   * keep the result in volatile memory only, never write it to
   * localStorage / logs, and clear it within `expires_in_seconds`.
   *
   * The result is the numbers, or `reveal_url` with empty `pan` and `cvv`
   * when the issuer shows them on a page of its own: open that page in a
   * frame right away, it is short-lived.
   *
   * 403 not your card · 409 `card_locked` · 429 rate-limited · 501 connector
   * has no sensitive-data endpoint · 503 `provider_unavailable`.
   */
  async reveal(id: string, _input?: RevealCardInput): Promise<RevealedCard> {
    return this.http.post<RevealedCard>(`/me/cards/${encodeURIComponent(id)}/reveal`);
  }

  /**
   * Unfreeze a previously-frozen card. Idempotent on an already-active card.
   * A card the issuer froze (`status_source: "provider"`) is not the
   * holder's to unfreeze: the API answers 409 `card_locked`, so hide the
   * button and say the freeze is lifted through the issuer's support.
   */
  async unfreeze(id: string): Promise<Card> {
    return this.http.post<Card>(`/me/cards/${encodeURIComponent(id)}/unfreeze`, { body: {} });
  }

  /**
   * Set the PIN of the caller's own physical card. The session is enough; the
   * call is rate-limited like {@link reveal} and the PIN is kept nowhere.
   * Resolves to the card; the user also gets a notification that the PIN
   * was set. 400 not four to six digits or the card is not active · 403 not
   * your card · 409 `card_locked`, or `provider_refused` when the issuer did
   * not take it · 429 too many attempts · 501 a virtual card has no PIN.
   */
  async setPin(id: string, input: SetPinInput): Promise<Card> {
    return this.http.post<Card>(`/me/cards/${encodeURIComponent(id)}/pin`, {
      body: { pin: input.pin },
    });
  }

  /**
   * Terminate the caller's own card. **One-way** — a terminated card cannot be
   * reactivated. The optional `reason` is audited. Idempotent on an
   * already-terminated card.
   */
  async terminate(id: string, reason?: string): Promise<Card> {
    return this.http.post<Card>(`/me/cards/${encodeURIComponent(id)}/terminate`, {
      body: { reason },
    });
  }
}
