import type { HttpClient } from "../http.js";

/**
 * Bonus resource — `client.bonus.*`.
 *
 * Bonuses are a discount on the platform's services, not money. They pay
 * for part of a new card's price or of the subscription fee, and bonuses
 * that came with a payment can also be added on top of a top-up. Spending
 * happens on the operation itself: `useBonus` / `bonusAmount` on
 * `cards.create`, `use_bonus` / `bonus_amount` on `deposits.initiate`, and
 * the subscription fee takes them on its own.
 *
 * Show the balance as a number of bonuses and nothing else: no money
 * figure next to it. Money belongs next to a price only ("was / now",
 * "N bonuses will be used"), which is what {@link BonusResource.preview}
 * works out on the server.
 *
 * Mirrors `GET /me/bonus` and `POST /me/bonus/preview`.
 */

/** What bonuses can pay for. */
export type BonusPurpose = "card_issuance" | "subscription" | "deposit";

/** One credit of bonuses and what is left of it. */
export interface BonusLot {
  id: string;
  /** Where the bonuses came from, e.g. `manual`. */
  source: string;
  /** True when they came without a payment: a card or the subscription only, never a top-up. */
  restricted: boolean;
  /** Bonuses credited, decimal string. */
  amount: string;
  /** Bonuses left, decimal string. */
  remaining: string;
  /** When what is left expires; `null` = never. */
  expires_at: string | null;
  created_at: string;
}

/** One change to the bonus balance. */
export interface BonusMovement {
  id: string;
  /** `credit`, `debit` (taken back by support), `spend` or `expire`. */
  kind: "credit" | "debit" | "spend" | "expire" | (string & {});
  /** For a `spend`: what the bonuses went towards. */
  purpose: BonusPurpose | null;
  /** `posted`, or `reserved` while the payment they are held for goes through. */
  status: "posted" | "reserved" | (string & {});
  /** Bonuses, decimal string, always positive. */
  units: string;
  /** For a spend: the price the bonuses went against (a top-up: the amount paid). */
  price: string | null;
  /** For a spend: what the bonuses covered (a top-up: what they added). */
  value: string | null;
  /** Currency of `price` and `value`. */
  currency: string | null;
  /** The card, deposit or subscription paid for. */
  operation_id: string | null;
  created_at: string;
}

/** Where bonuses may go right now. */
export interface BonusTarget {
  purpose: BonusPurpose;
  /** Bonuses that may go towards it, decimal string. */
  available: string;
  /** Largest share of a price bonuses may cover, basis points (10000 = all). */
  share_bps: number;
}

/** `GET /me/bonus`. */
export interface BonusWallet {
  /** Bonuses the user can use now. Show it on its own, without a money figure. */
  balance: string;
  /** Bonuses held for a payment still going through. */
  pending: string;
  /** One bonus is a discount of one unit of this currency. For prices only. */
  unit_currency: string;
  spend_on: BonusTarget[];
  /** Credits with bonuses left, the soonest to expire first. */
  lots: BonusLot[];
  /** Latest changes, newest first. */
  history: BonusMovement[];
}

export interface BonusPreviewInput {
  purpose: BonusPurpose;
  /** The price as shown, or for `deposit` the amount paid; decimal string. */
  amount: string;
  /** ISO 4217 code of `amount`. */
  currency: string;
  /** For `card_issuance`: the product, which may cap the bonus share. */
  productId?: string;
  /** The most bonuses to use; omit to use as many as allowed. */
  bonusAmount?: string;
}

/** How bonuses change one price. All amounts are decimal strings in `currency`. */
export interface BonusPreview {
  purpose: BonusPurpose;
  /** The price before bonuses ("was"); for `deposit`, the amount paid. */
  amount: string;
  /** Bonuses that would be used. */
  bonus_units: string;
  /** What they cover (or, for `deposit`, add). */
  bonus_value: string;
  /** What is left to pay ("now"); for `deposit`, the amount paid. */
  due: string;
  /** For `deposit`: what reaches the wallet. `null` otherwise. */
  credited: string | null;
  currency: string;
}

export class BonusResource {
  constructor(private readonly http: HttpClient) {}

  /** The user's bonuses: balance, where they can go, credits and history. */
  async get(opts: { signal?: AbortSignal } = {}): Promise<BonusWallet> {
    return this.http.get<BonusWallet>("/me/bonus", { signal: opts.signal });
  }

  /**
   * Work out how bonuses would change a price, at the rate the payment
   * would use. Nothing is held; the numbers may move by the time the user
   * pays if prices, rates or bonuses change.
   */
  async preview(input: BonusPreviewInput): Promise<BonusPreview> {
    const { productId, bonusAmount, ...rest } = input;
    const body: Record<string, unknown> = { ...rest };
    if (productId !== undefined) body["product_id"] = productId;
    if (bonusAmount !== undefined) body["bonus_amount"] = bonusAmount;
    return this.http.post<BonusPreview>("/me/bonus/preview", { body });
  }
}
