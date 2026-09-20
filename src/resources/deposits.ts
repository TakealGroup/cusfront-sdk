import type { HttpClient } from "../http.js";
import type { CustomerInfo } from "../types/customer.js";

/**
 * Deposits resource — `client.deposits.*`.
 *
 * The "money IN" surface: an end user tops up their wallet balance via a
 * funder connector. Mirrors the Takeal API's `/me/deposits` routes:
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

/** Lifecycle of a deposit. `redirect_required` carries `redirect_url`. */
export type DepositStatus =
  | "pending"
  | "redirect_required"
  | "confirmed"
  | "failed";

/** Top-up rail. The chosen funder decides which it supports. */
export type DepositMethod = "card" | "crypto" | "bank_transfer";

/**
 * A deposit record as the Takeal API returns it. Mirrors the `deposits` table; the
 * server-side `id` is the stable handle the SDK polls against. `idempotency_key`
 * and `request_fingerprint` are server-internal and never serialised.
 */
/** Input for `quote()` — price a cross-currency deposit before paying. */
export interface CreateQuoteInput {
  /** Decimal string, e.g. `"5000.00"`. */
  amount: string;
  /** ISO 4217 source currency — must differ from the wallet's local currency. */
  currency: string;
}

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
  /** Provider rate before spread (credited units per 1 source unit). */
  rate: string;
  spread_bps: number;
  provider: string;
  expires_at: string;
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
  /** The wallet's local currency the deposit converted into. */
  credited_currency?: string | null;
  /** What the wallet was actually credited, net of spread. */
  credited_amount?: string | null;
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
   * declines) or `fail`.
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
   * server-side until `expires_at`; deposits in the local currency need no
   * quote (the API answers 400 `no_quote_needed`).
   */
  async quote(input: CreateQuoteInput): Promise<FundingQuote> {
    return this.http.post<FundingQuote>("/me/deposits/quotes", { body: input });
  }

  async initiate(input: InitiateDepositInput): Promise<Deposit> {
    const { idempotencyKey, ...body } = input;
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
  async refund(
    depositId: string,
    input: CreateDepositRefundInput,
  ): Promise<Refund> {
    const { idempotencyKey, ...body } = input;
    return this.http.post<Refund>(
      `/me/deposits/${encodeURIComponent(depositId)}/refunds`,
      { body, idempotencyKey },
    );
  }
}
