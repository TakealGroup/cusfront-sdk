import type { HttpClient } from "../http.js";
import type { DepositMethod } from "./deposits.js";

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
}

export class FundingOptionsResource {
  constructor(private readonly http: HttpClient) {}

  /** The ways to top up, preferred first. Empty when none is configured. */
  async list(): Promise<FundingOption[]> {
    return this.http.get<FundingOption[]>("/me/funding-options");
  }
}
