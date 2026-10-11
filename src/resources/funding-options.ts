import type { HttpClient } from "../http.js";
import type { DepositMethod, FeeKind } from "./deposits.js";

/**
 * Funding options resource — `client.fundingOptions.*`.
 *
 * The ways the user can top up on this deployment: each funding connector,
 * where its top-ups may land and which payment methods it takes. Build the
 * top-up screen from this list instead of fixed connector names: a
 * deployment may top up the wallet only, cards only (no wallet at all), or
 * let the user choose.
 *
 * Mirrors `GET /me/funding-options`.
 */

/**
 * Where a funding connector's top-ups may land: `wallet` (the wallet
 * only), `spool` (straight onto cards only) or `mixed` (either).
 */
export type FunderMode = "wallet" | "spool" | "mixed";

/** Where one top-up goes: the wallet, or one of the user's cards. */
export type DepositTarget = "wallet" | "card";

/**
 * What one way of paying through a funding connector costs and allows.
 * Draw the top-up form from it: the currency to ask for, the fee to show
 * (or not, for a markup), the floor, the cap and the day's limit.
 */
export interface MethodTerms {
  method: DepositMethod;
  /** ISO 4217 code the user pays in this way; `null` when any the quote accepts. */
  source_currency: string | null;
  fee_kind: FeeKind;
  /** The fee in basis points (2000 = 20 %). */
  fee_bps: number;
  /** How long a quote through this method stays executable, and the deposit waits for its payment. */
  quote_ttl_seconds: number;
  /** Smallest single top-up in the source currency; `null` for no floor. */
  min_amount: string | null;
  /** Largest single top-up in the source currency; `null` for no cap. */
  max_amount: string | null;
  /** What one user may top up this way over 24 hours; `null` for no limit. */
  daily_limit_per_user: string | null;
}

/** One way to top up. */
export interface FundingOption {
  /** Pass it as `funder_slug` to `deposits.initiate`. */
  slug: string;
  mode: FunderMode;
  /** Where a top-up through it may land. */
  targets: DepositTarget[];
  /** Payment methods it takes. */
  methods: DepositMethod[];
  /**
   * Whether a new card can be issued with a top-up through it
   * (`issue_card` on `deposits.initiate`).
   */
  issue_card: boolean;
  /** The terms of each method in `methods`. */
  method_terms: MethodTerms[];
}

export class FundingOptionsResource {
  constructor(private readonly http: HttpClient) {}

  /** The ways to top up, preferred first. Empty when none is configured. */
  async list(): Promise<FundingOption[]> {
    return this.http.get<FundingOption[]>("/me/funding-options");
  }
}
