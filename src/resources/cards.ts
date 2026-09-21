import type { HttpClient } from "../http.js";
import type { CustomerInfo } from "../types/customer.js";

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
 *   POST   /me/cards/{id}/terminate  → terminate (one-way)
 *
 * The lifecycle actions are ownership-gated server-side: a caller can only
 * freeze / unfreeze / terminate a card that belongs to them (else 404).
 *
 * ## What is intentionally NOT here
 *
 * Card-data reveal (PAN / CVV) is a separate, security-sensitive flow with its
 * own re-auth + rate-limit + audit contract and is intentionally
 * NOT part of this resource (tracked separately).
 *
 * Today only PREPAID is wired end-to-end; CREDIT and GIFT return 400 from
 * the Takeal API until their issuer flows land.
 */

/** Card product. Only `prepaid` is fully implemented today. */
export type CardType = "credit" | "prepaid" | "gift";

/**
 * Card lifecycle state.
 *
 * `pending_payment` is a transient state: the row exists but the
 * per-card issuance-fee debit has not yet succeeded; such cards have no
 * provider reference and no user-visible side effects.
 */
export type CardStatus =
  | "pending_payment"
  | "active"
  | "frozen"
  | "terminated"
  | "redeemed"
  | "failed";

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
  amount: string;
  currency: string;
  label: string;
  base_amount: string;
  discount_bps: number;
}

/**
 * A card the user can order, as listed by `GET /me/card-products`. The id is
 * opaque — it names a product, never a provider. `designs` is the set the
 * user may pick from (may be empty when only the default applies); `design`
 * is what the card gets when no choice is made. `price` is `null` for a
 * free card. `features` is an operator-defined object (scheme, wallet
 * support, load limits, …) with no fixed keys.
 */
export interface CardProduct {
  id: string;
  name: string;
  description: string | null;
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
  /** The name the user gave the card, or `null`. */
  name: string | null;
  /** The artwork the card is shown with. Always present. */
  design: CardDesignRef;
  /** The product the card was issued from; `null` for cards issued without one. */
  product: { id: string; name: string } | null;
  created_at: string;
  updated_at: string;
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
   * Required by the Takeal API on this write endpoint. Same key + body replays the
   * original card; same key + different body returns 409.
   */
  idempotencyKey: string;
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

/** One top-up attempt as the API records it. */
export interface CardTopUp {
  id: string;
  card_id: string;
  status: "pending" | "confirmed" | "failed";
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

/** A completed top-up with the state to redraw: card, its balance, the wallet. */
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
 * Full card data from a successful reveal. **Security**: never persist this —
 * keep it in volatile memory only, clear it within `expires_in_seconds`, and
 * never write it to localStorage / logs (the API marks the response no-store).
 */
export interface RevealedCard {
  pan: string;
  cvv: string;
  expiry_month: number;
  expiry_year: number;
  holder_name: string;
  /** Display window before the client should auto-clear the data. */
  expires_in_seconds: number;
}

export class CardsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Issue a card backed by the user's wallet balance. Resolves to the new
   * `Card`. On a ledger failure after provider creation, the Takeal API rolls the row
   * to `failed` (never an orphaned active card); inspect `status` /
   * `failure_reason` on the result.
   */
  async create(input: CreateCardInput): Promise<Card> {
    const { idempotencyKey, productId, name, designId, initial_amount: _ignored, ...rest } = input;
    const body: Record<string, unknown> = { ...rest };
    if (productId !== undefined) body["product_id"] = productId;
    if (name !== undefined) body["name"] = name;
    if (designId !== undefined) body["design_id"] = designId;
    return this.http.post<Card>("/me/cards", {
      body,
      idempotencyKey,
    });
  }

  /**
   * The cards the caller can order, in the order the deployment offers them
   * (the default product first). Each item carries its name, description,
   * artwork, the issuance price after the caller's subscription discount,
   * and the currency. Pass an item's `id` as `productId` to {@link create}.
   */
  async listProducts(): Promise<CardProduct[]> {
    return this.http.get<CardProduct[]>("/me/card-products");
  }

  /** One product from the catalog. 404 when unknown, disabled or hidden. */
  async getProduct(id: string): Promise<CardProduct> {
    return this.http.get<CardProduct>(
      `/me/card-products/${encodeURIComponent(id)}`,
    );
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
    return this.http.get<CardBalance>(
      `/me/cards/${encodeURIComponent(id)}/balance?${q}`,
    );
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
   * Freeze the caller's own card. Reversible via {@link unfreeze}. The optional
   * `reason` is recorded on the audit trail. Resolves to the updated card.
   * 404 if the card isn't the caller's; 501 if the issuer can't freeze.
   */
  async freeze(id: string, reason?: string): Promise<Card> {
    return this.http.post<Card>(
      `/me/cards/${encodeURIComponent(id)}/freeze`,
      { body: { reason } },
    );
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
   * 401 bad re-auth · 403 not your card · 429 rate-limited · 501 connector
   * has no sensitive-data endpoint · 503 provider error.
   */
  async reveal(id: string, _input?: RevealCardInput): Promise<RevealedCard> {
    return this.http.post<RevealedCard>(`/me/cards/${encodeURIComponent(id)}/reveal`);
  }

  /** Unfreeze a previously-frozen card. Idempotent on an already-active card. */
  async unfreeze(id: string): Promise<Card> {
    return this.http.post<Card>(
      `/me/cards/${encodeURIComponent(id)}/unfreeze`,
      { body: {} },
    );
  }

  /**
   * Terminate the caller's own card. **One-way** — a terminated card cannot be
   * reactivated. The optional `reason` is audited. Idempotent on an
   * already-terminated card.
   */
  async terminate(id: string, reason?: string): Promise<Card> {
    return this.http.post<Card>(
      `/me/cards/${encodeURIComponent(id)}/terminate`,
      { body: { reason } },
    );
  }
}
