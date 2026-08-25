import type { HttpClient } from "../http.js";
import type { CustomerInfo } from "../types/customer.js";

/**
 * Cards resource — `client.cards.*`.
 *
 * The end-user "money OUT" surface: a user issues themselves a card backed by
 * their wallet balance via an issuer connector. Mirrors the Takeal API's
 * `/me/cards` routes:
 *
 *   POST   /me/cards                 → create
 *   GET    /me/cards                 → list (most recent first)
 *   GET    /me/cards/{id}            → get
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
 * A card record as the Takeal API returns it. Mirrors the `cards` table. Note the
 * SDK never receives the full PAN or CVV here — only `last4` + expiry. The
 * gift-card `redemption_code` is returned exactly once (on create) and
 * scrubbed from subsequent list/get responses.
 */
export interface Card {
  id: string;
  user_id: string;
  card_type: CardType;
  /** Slug of the issuer that minted this card, as configured by the deployment. */
  connector_slug: string;
  /** The connector's own reference, populated once it responds. */
  provider_reference: string | null;
  status: CardStatus;
  /** Last four digits of the PAN — safe to display. */
  last4: string | null;
  expiry_month: number | null;
  expiry_year: number | null;
  /** Gift cards only, present once on create then scrubbed. */
  redemption_code?: string;
  /** Decimal as a string. */
  initial_amount: string | null;
  currency: string;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateCardInput {
  /** `prepaid` (the only fully-wired type today), `credit`, or `gift`. */
  type: CardType;
  /** Decimal as a string. The prepaid load amount drained from wallet balance. */
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

/** Re-auth gate for {@link CardsResource.reveal}. */
export interface RevealCardInput {
  /** The user's account password — mandatory re-auth. */
  password: string;
  /** TOTP code; required only when the user has TOTP enrolled. */
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
    const { idempotencyKey, ...body } = input;
    return this.http.post<Card>("/me/cards", {
      body,
      idempotencyKey,
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
   * Reveal the FULL PAN + CVV for the caller's own card. Re-auth gated
   * (password, + TOTP when the user has it enrolled) and rate-limited
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
  async reveal(id: string, input: RevealCardInput): Promise<RevealedCard> {
    return this.http.post<RevealedCard>(
      `/me/cards/${encodeURIComponent(id)}/reveal`,
      { body: { password: input.password, totp_code: input.totpCode } },
    );
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
