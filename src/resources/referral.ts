import type { HttpClient } from "../http.js";

/**
 * Referral resource — `client.referral.*`.
 *
 * For the people allowed to invite: their referral code, the link to
 * share, the people who signed up with it (no names or contacts, only
 * when they joined and how far they got) and what each reward was for.
 * Referral codes are given by invitation, so `code` is `null` for most
 * users. Rewards are bonuses, a discount on our services, not money.
 *
 * Mirrors `GET /me/referral`.
 */

/** Someone the user invited, without anything that identifies them. */
export interface InvitedFriend {
  joined_at: string;
  /** Bonuses they brought so far, decimal string. */
  rewarded: string;
  has_card: boolean;
  has_topped_up: boolean;
}

/** One reward. */
export interface ReferralReward {
  id: string;
  /** `signup`, `card_issuance`, `first_deposit` or `deposit`. */
  event: "signup" | "card_issuance" | "first_deposit" | "deposit" | (string & {});
  /** The friend's operation a percent was taken of. */
  basis_amount: string | null;
  basis_currency: string | null;
  /** Bonuses, decimal string. */
  units: string;
  /** Always `bonus`. */
  payout_kind: string;
  /** `pending` until the bonuses are on the account. */
  status: "pending" | "credited" | (string & {});
  created_at: string;
}

export interface Referral {
  code: string | null;
  /** The invitation link, or `null` when the deployment has none: share the code then. */
  link: string | null;
  invited_count: number;
  /** The latest invited, newest first. */
  invited: InvitedFriend[];
  /** Bonuses earned in total, decimal string. */
  total_rewarded: string;
  rewards: ReferralReward[];
}

export class ReferralResource {
  constructor(private readonly http: HttpClient) {}

  /** The user's referral code, link, invited friends and rewards. */
  async get(opts: { signal?: AbortSignal } = {}): Promise<Referral> {
    return this.http.get<Referral>("/me/referral", { signal: opts.signal });
  }
}
