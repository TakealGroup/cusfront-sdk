import type { HttpClient } from "../http.js";
import type { CustomerInfo } from "../types/customer.js";
import { cardRequestBody, type CreateCardInput } from "./cards.js";
import type { DepositTarget, FunderMode } from "./funding-options.js";

/**
 * Deposits resource — `client.deposits.*`.
 *
 * The "money IN" surface: an end user tops up their wallet balance via a
 * funder connector, or one of their cards straight away, past the wallet
 * (`card_id`, or `issue_card` for a new card). Which of the two a
 * deployment allows is in `client.fundingOptions.list()`. Mirrors the
 * Takeal API's `/me/deposits` routes:
 *
 *   POST   /me/deposits              → initiate
 *   GET    /me/deposits              → list (most recent first)
 *   GET    /me/deposits/{id}         → get
 *   POST   /me/deposits/{id}/refunds → refund
 *
 * A deposit is rarely terminal on the initiate call: real PSPs return
 * `redirect_required` (3DS / APM redirect) and flip to `confirmed` later via
 * a connector → Takeal API inbound event. Poll `get(id)` or watch the user's
 * webhook stream for the `deposit.confirmed` / `deposit.failed` outcome.
 */

/**
 * Lifecycle of a deposit. `redirect_required` carries `redirect_url`.
 * `expired`: nobody paid before `expires_at`; the user starts over with a
 * new quote. A payment that still arrives is credited at the stored rate
 * and the deposit turns `confirmed` after all.
 */
export type DepositStatus = "pending" | "redirect_required" | "confirmed" | "failed" | "expired";

/**
 * Top-up rail. The chosen funder decides which it supports; `sbp` is
 * Russia's instant payments through a payment page, paid in roubles.
 */
export type DepositMethod = "card" | "crypto" | "bank_transfer" | "sbp";

/**
 * A deposit record as the Takeal API returns it. Mirrors the `deposits` table; the
 * server-side `id` is the stable handle the SDK polls against. `idempotency_key`
 * and `request_fingerprint` are server-internal and never serialised.
 */
/** Input for `quote()` — price a cross-currency deposit before paying. */
export interface CreateQuoteInput {
  /** Decimal string, e.g. `"5000.00"`. */
  amount: string;
  /** ISO 4217 source currency — must differ from the currency credited. */
  currency: string;
  /**
   * Quote a top-up of this card: credited in the card's currency. Pass the
   * same `card_id` to `initiate()`.
   */
  card_id?: string;
  /**
   * Quote into this currency instead of the wallet's: the currency of a
   * card issued with the top-up (`issue_card`). Ignored with `card_id`.
   */
  target_currency?: string;
  /**
   * The funding connector the deposit will go through (`funder_slug` of
   * `initiate()`). With `method`, the quote is priced on that method's own
   * terms from `fundingOptions.list()`: its fee and kind, its rate source,
   * its lifetime, its limits. Sent as `connector_slug`.
   */
  connectorSlug?: string;
  /** The way the user pays. Pass the same method to `initiate()`. */
  method?: DepositMethod;
}

/**
 * How a method's fee reads. `spread`: taken off the credited amount at the
 * deployment's rate. `markup`: in the rate the user sees, so show the rate
 * and nothing else. `commission`: the rate is the provider's and the fee is
 * a line of its own on the credited amount.
 */
export type FeeKind = "spread" | "markup" | "commission";

/** How far a top-up meant for a card has got. */
export type CardLoadStatus = "pending" | "succeeded" | "failed";

/**
 * A card to issue with the top-up: the fields of `cards.create` without
 * its idempotency key (the deposit's covers both). The card's price is
 * paid from the top-up and the rest becomes its starting balance.
 */
export type IssueCardInput = Omit<CreateCardInput, "idempotencyKey" | "currency"> & {
  /** Optional with `productId`: the product names the currency. */
  currency?: string;
};

/**
 * A rate-locked funding quote: pay `source_amount source_currency`, the
 * wallet is credited `credited_amount credited_currency` (net of the
 * platform's conversion spread). Execute by passing `id` as `quote_id` to
 * `initiate()` before `expires_at`; after that the API returns 409 and a new
 * quote is needed.
 */
export interface FundingQuote {
  id: string;
  source_amount: string;
  source_currency: string;
  credited_amount: string;
  credited_currency: string;
  /**
   * Provider rate before the fee, credited units per 1 source unit. The
   * rate to show the user is `credited_amount / source_amount`, which has
   * the fee in it; see the README for the rouble-per-dollar form.
   */
  rate: string;
  /** The fee in basis points; the same figure as `fee_bps`, under its old name. */
  spread_bps: number;
  /** The fee in basis points (2000 = 20 %). */
  fee_bps: number;
  fee_kind: FeeKind;
  provider: string;
  /** The pair the quote was priced for, when the request named one. */
  connector_slug?: string;
  method?: DepositMethod;
  /** The rate is locked until then; the deposit made with it waits for its payment as long. */
  expires_at: string;
  /**
   * What the user owes in card fees, in `credited_currency`, that this
   * top-up pays first: it comes off `credited_amount` and the rest is
   * credited. `"0"` when nothing is owed. Show it before the payment. Older
   * platforms leave it out.
   */
  debt_withheld?: string;
}

export interface Deposit {
  id: string;
  user_id: string;
  /** Slug of the funder that handled this deposit, as configured by the deployment. */
  connector_slug: string;
  /** The connector's own reference, populated once it responds. */
  provider_reference: string | null;
  status: DepositStatus;
  /** Decimal serialised as a string to avoid float drift. */
  amount: string;
  currency: string;
  method: DepositMethod;
  /** Present when `status === "redirect_required"` — send the user here. */
  redirect_url: string | null;
  failure_reason: string | null;
  /** Final settled amount once confirmed (may differ from `amount` on FX). */
  confirmed_amount: string | null;
  confirmed_at: string | null;
  /** Set on cross-currency deposits: the quote this deposit executed against. */
  quote_id?: string | null;
  /** Locked provider rate (credited units per 1 source unit). */
  fx_rate?: string | null;
  fx_spread_bps?: number | null;
  /** How `fx_spread_bps` was taken; see `FeeKind`. */
  fx_fee_kind?: FeeKind | null;
  /** When the deposit stops waiting for its payment; `null` for one without a term. */
  expires_at?: string | null;
  /** The wallet's local currency the deposit converted into. */
  credited_currency?: string | null;
  /** What the wallet was actually credited, net of spread. */
  credited_amount?: string | null;
  /** Bonuses added on top of the top-up, when any were. */
  bonus_units?: string | null;
  /** What those bonuses added to the wallet, in the credited currency. */
  bonus_value?: string | null;
  /** The promo code the top-up was made with; its discount came off the commission. */
  promo_code?: string | null;
  /** Where the money goes. Older deployments leave it out: the wallet. */
  target?: DepositTarget;
  /** For a top-up onto a card: the card. */
  card_id?: string | null;
  /** The funding connector's mode when the top-up was made. */
  funder_mode?: FunderMode | null;
  /** True when the card was issued with this top-up. */
  issues_card?: boolean;
  /**
   * For a top-up onto a card: `pending` until the card provider has loaded
   * the card, then `succeeded` or `failed`. Show the top-up as done only
   * once it is `succeeded`, or once `returned_to_wallet_at` is set.
   */
  card_load_status?: CardLoadStatus | null;
  /** Why the card could not take it, when `card_load_status` is `failed`. */
  card_load_error?: string | null;
  /** What went towards the card, in its currency, bonuses included. */
  card_amount?: string | null;
  /** The commission taken from a top-up onto a card, in the card's currency. */
  card_commission?: string | null;
  /** The money part of the price of a card issued with the top-up. */
  issue_fee?: string | null;
  /** The bonus part of that price. */
  issue_bonus_units?: string | null;
  issue_bonus_value?: string | null;
  card_loaded_at?: string | null;
  /**
   * Set when the card could not take the top-up and the money went to the
   * wallet instead (funding connectors in `mixed` mode). The user is told.
   */
  returned_to_wallet_at?: string | null;
  /**
   * The user's debt in card fees shown before the payment, in the credited
   * currency: the most this top-up pays towards it before the rest is
   * credited. Absent when nothing was owed.
   */
  debt_quoted?: string | null;
  /**
   * What the top-up did pay towards the debt. For a top-up onto a card,
   * `card_amount` is already net of it.
   */
  debt_withheld?: string | null;
  created_at: string;
  updated_at: string;
}

export interface InitiateDepositInput {
  /** Decimal as a string (`"100.00"`) — avoids float-precision loss on the wire. */
  amount: string;
  /** ISO 4217 code, e.g. `"USD"`. */
  currency: string;
  method: DepositMethod;
  /**
   * Optional. Slug of a specific funder to route through. Omit to
   * let the Takeal API pick the first active funder. Unknown slug → 400; empty
   * funder list → 503.
   */
  funder_slug?: string;
  /**
   * Passed to the funding connector and stored with the deposit. Two keys
   * work across connectors: `return_url`, where the provider sends the user
   * back after a 3-D Secure step (pair it with `redirect_required`), and on
   * test deployments with the mock funder `mock_scenario`, which picks the
   * outcome: `happy` (confirmed at once, the default), `pending` (confirmed
   * about 15 s later), `redirect` (a hosted page where the user approves or
   * declines), `late` (paid after the term) or `fail`.
   */
  metadata?: Record<string, string>;
  /** Structured billing details — real PSPs require these for 3DS / compliance. */
  customer?: CustomerInfo;
  /**
   * Required by the Takeal API on this write endpoint. Same key + body replays the
   * original deposit; same key + different body returns 409. Supply a stable
   * UUID per logical attempt so a retried network call is safe.
   */
  idempotencyKey: string;
  /**
   * Required when `currency` differs from the wallet's local currency: a
   * fresh quote id from `quote()`. Cross-currency deposits without one are
   * rejected with 400; expired quotes with 409.
   */
  quote_id?: string;
  /**
   * Add bonuses on top of the top-up: the user pays `amount`, the wallet
   * gets `amount` plus what the bonuses add. On by default whenever the
   * user has bonuses that can go to a top-up (only ones that came with a
   * payment can); `false` tops up without them.
   */
  use_bonus?: boolean;
  /** The most bonuses to add, decimal string. Omit to add as many as allowed. */
  bonus_amount?: string;
  /**
   * Top up this card instead of the wallet. It must be the user's, active
   * and prepaid. A funding connector that tops up the wallet only answers
   * 400 `target_not_allowed`; one that tops up cards only needs `card_id`
   * or `issue_card`. Paying in another currency than the card's needs a
   * quote made with the same `card_id`.
   */
  card_id?: string;
  /**
   * Issue a new card and put this top-up on it. The card shows up as
   * `pending_payment` and is issued once the top-up is confirmed; if the
   * top-up fails, so does the card. Too small to cover the price → 400
   * `amount_too_small`. Not together with `card_id`.
   */
  issue_card?: IssueCardInput;
  /**
   * A promo code for this top-up, to the wallet or to a card. Its discount
   * comes off the commission; bonuses or a gift that come with the code
   * arrive once the top-up is confirmed. A code that can't be used fails the
   * request with 400 `promo_code_*` and the reason. `client.codes.validate`
   * checks it first.
   */
  promo_code?: string;
}

export interface CreateDepositRefundInput {
  /** Omit for a full refund of the original confirmed amount; same currency. */
  amount?: string;
  /** Human-readable reason, e.g. `"customer_request"`. */
  reason?: string;
  metadata?: Record<string, string>;
  /** Required. Replays are keyed on this. */
  idempotencyKey: string;
}

/** A refund row as the Takeal API returns it (`refunds` table, deposit-targeted). */
export interface Refund {
  id: string;
  target_type: string;
  deposit_id?: string;
  payment_id?: string;
  connector_slug: string;
  amount: string;
  currency: string;
  reason: string;
  status: string;
  provider_refund_reference?: string;
  failure_reason?: string;
  requestor_type: string;
  requestor_id: string;
  created_at: string;
  updated_at: string;
}

export class DepositsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Initiate a top-up. Resolves to the freshly-created `Deposit`, whose
   * `status` may already be `confirmed` (synchronous rails / mock) or
   * `redirect_required` (3DS / APM — forward the user to `redirect_url`).
   */
  /**
   * Price a cross-currency deposit BEFORE paying. The rate is locked
   * server-side until `expires_at`; deposits already in the currency they
   * credit (the wallet's, or the card's with `card_id`) need no quote (the
   * API answers 400 `no_quote_needed`).
   */
  async quote(input: CreateQuoteInput): Promise<FundingQuote> {
    const { connectorSlug, ...rest } = input;
    const body: Record<string, unknown> = { ...rest };
    if (connectorSlug !== undefined) body["connector_slug"] = connectorSlug;
    return this.http.post<FundingQuote>("/me/deposits/quotes", { body });
  }

  async initiate(input: InitiateDepositInput): Promise<Deposit> {
    const { idempotencyKey, issue_card, ...rest } = input;
    const body: Record<string, unknown> = { ...rest };
    if (issue_card !== undefined) body["issue_card"] = cardRequestBody(issue_card);
    return this.http.post<Deposit>("/me/deposits", {
      body,
      idempotencyKey,
    });
  }

  /** Fetch one deposit by id — the poll target while a redirect resolves. */
  async get(id: string): Promise<Deposit> {
    return this.http.get<Deposit>(`/me/deposits/${encodeURIComponent(id)}`);
  }

  /** List the caller's deposits, most recent first. */
  async list(): Promise<Deposit[]> {
    return this.http.get<Deposit[]>("/me/deposits");
  }

  /**
   * Refund a previously-confirmed deposit. Synchronous when the
   * connector settles inline; otherwise the row stays `pending` and flips
   * later via the inbound `deposit.refunded` event.
   */
  async refund(depositId: string, input: CreateDepositRefundInput): Promise<Refund> {
    const { idempotencyKey, ...body } = input;
    return this.http.post<Refund>(`/me/deposits/${encodeURIComponent(depositId)}/refunds`, {
      body,
      idempotencyKey,
    });
  }
}
