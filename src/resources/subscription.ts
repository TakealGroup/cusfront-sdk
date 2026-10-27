import type { HttpClient } from "../http.js";

/**
 * Subscription resource — `client.subscription.*`.
 *
 * The user's own paid tier or gift: the discounts it gives and, for a
 * gift, when it ends. Not to be confused with `client.subscriptions`, which
 * is about announcement channels.
 *
 * Mirrors `GET /me/subscription`, `PUT /me/subscription/promo-code` and
 * `POST /me/subscription/cancel`.
 */

export interface UserSubscription {
  id: string;
  tier_id: string;
  tier_name: string;
  /** `active`, `tryout`, `grace`, `cancelled` or `expired`. */
  status: string;
  /** `billing` (charged monthly) or `gift` (never charged). */
  kind: "billing" | "gift" | (string & {});
  /** For a gift: when it ends; `null` = no end date. */
  gift_until: string | null;
  monthly_fee: string;
  currency: string;
  /** Discount on card prices, basis points. */
  issuance_discount_bps: number;
  /** Discount on the top-up commission, basis points. */
  funding_discount_bps: number;
  started_at: string;
  current_period_end: string | null;
  /** The promo code the monthly fee is charged with, if any. */
  promo_code_id: string | null;
}

/** What cancelling did. */
export interface CancelledSubscription {
  /** The subscription, now `cancelled`. */
  subscription: UserSubscription | null;
  /** What went back to the balance for the unused days of the paid period,
   *  decimal string; `"0"` for a gift, a trial or an unpaid renewal. */
  refund: string;
  currency: string;
}

export class SubscriptionResource {
  constructor(private readonly http: HttpClient) {}

  /** The user's subscription, or `null` when there is none. */
  async get(opts: { signal?: AbortSignal } = {}): Promise<UserSubscription | null> {
    return this.http.get<UserSubscription | null>("/me/subscription", { signal: opts.signal });
  }

  /**
   * Charge the monthly fee with a promo code, as long as the code allows.
   * `null` removes it. A code that can't be used on the fee fails with 400
   * `promo_code_*`; no paid subscription running → 404.
   */
  async setPromoCode(code: string | null): Promise<UserSubscription> {
    return this.http.put<UserSubscription>("/me/subscription/promo-code", { body: { code } });
  }

  /**
   * Cancel the subscription now, in one step. What was paid for the current
   * period comes back to the balance for the days not used. No subscription
   * running → 404; 503 `refund_unavailable` when the refund can't be made
   * right now (the subscription keeps running; try again).
   */
  async cancel(): Promise<CancelledSubscription> {
    return this.http.post<CancelledSubscription>("/me/subscription/cancel", {});
  }
}
