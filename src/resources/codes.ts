import type { HttpClient } from "../http.js";

/**
 * Codes resource — `client.codes.*`.
 *
 * Promo and referral codes. A code is used on the operation itself:
 * `code` on `auth.register` / `auth.exchangeTelegram`, `promo_code` on
 * `deposits.initiate`, `promoCode` on `cards.create`, and
 * `client.subscription.setPromoCode` for the monthly fee. On a card bought
 * with a payment, a code that works on issuing a card lowers the card's
 * price; one that works on top-ups lowers the payment's commission.
 * {@link CodesResource.validate} checks one first and says what it would do,
 * without using it up.
 *
 * What a code gives besides a discount (bonuses, a gift subscription) comes
 * once the operation goes through. Bonuses are a discount on our services,
 * never money: show them as a number of bonuses.
 *
 * Mirrors `POST /me/codes/validate`.
 */

/** The operations a code can be used on. */
export type CodeOperation = "signup" | "deposit" | "card_issuance" | "subscription";

/** Why a code can't be used. Show `message` from the response as is. */
export type CodeRejection =
  | "unknown"
  | "disabled"
  | "not_started"
  | "expired"
  | "not_applicable"
  | "exhausted"
  | "already_used"
  | "not_first_operation"
  | "below_minimum"
  | "currency_mismatch"
  | "own_code"
  | "already_registered"
  | (string & {});

/** What one effect of a code did, as a sign-up reports it. */
export interface CodeEffectOutcome {
  /** `bonus_credit`, `gift_subscription`, `grant_referral_code` or `referral_link`. */
  kind: string;
  /** `applied`, `skipped` (a gift when a subscription was already running) or `failed`. */
  status: "applied" | "skipped" | "failed" | (string & {});
  reason?: string;
  /** Details by kind: `units` for bonuses, `tier` and `until` for a gift, `code` for a referral code of one's own. */
  [detail: string]: unknown;
}

/** What the code sent with a sign-up did. The account is created either way. */
export interface CodeResult {
  code: string;
  status: "applied" | "rejected";
  reason: CodeRejection | null;
  /** A sentence to show when the code was not applied. */
  message: string | null;
  effects: CodeEffectOutcome[];
}

/** One effect a code carries, as `validate` lists it. */
export type CodeEffect =
  | { kind: "gift_subscription"; tier_id: string; days: number | null }
  | { kind: "bonus_credit"; amount: string }
  | { kind: "grant_referral_code"; program_id: string }
  | { kind: string; [k: string]: unknown };

export interface CodeDiscount {
  kind: "percent" | "fixed";
  /** For `percent`: basis points off (1000 = 10%). */
  bps: number | null;
  /** For `fixed`: the amount off, decimal string. */
  amount: string | null;
  currency: string | null;
  /** What comes off: `card_issuance`, `funding_commission` (the top-up commission) or `subscription`. */
  applies_to: "card_issuance" | "funding_commission" | "subscription" | null;
}

export interface ValidateCodeInput {
  code: string;
  operation: CodeOperation;
  /** The operation's amount, decimal string: needed for a code with a minimum or a fixed discount. */
  amount?: string;
  /** ISO 4217 code of `amount`; for a top-up, the currency it is credited in. */
  currency?: string;
  /**
   * For a top-up paid in another currency than it is credited in: what is
   * paid, decimal string. A code's minimum may be set in either currency;
   * with both amounts sent it is checked the way the top-up itself checks it.
   */
  paid_amount?: string;
  /** ISO 4217 code of `paid_amount`. */
  paid_currency?: string;
  /**
   * For a card bought with a payment (`cardOrders.create`, or
   * `deposits.initiate` with `issue_card`): the product. The code is then
   * checked the way that purchase takes it: as a card issuance, against the
   * product's price, when the code works on issuing a card, and as a top-up
   * otherwise. `discount.applies_to` in the answer says which, and
   * `discount_value` is what comes off the card's price. `operation` may be
   * `deposit` or `card_issuance`.
   */
  product_id?: string;
}

/** `POST /me/codes/validate`. */
export interface CodeCheck {
  valid: boolean;
  code: string | null;
  /** `promo` or `referral`. */
  kind: string | null;
  reason: CodeRejection | null;
  message: string | null;
  discount: CodeDiscount | null;
  /** For a card or the monthly fee with `amount` sent: what comes off it. */
  discount_value: string | null;
  /** Everything else the code gives, once the operation goes through. */
  effects: CodeEffect[];
}

export class CodesResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Whether a code can be used on an operation now and what it would do.
   * Nothing is used up. For sign-up there is nothing to check here: send
   * the code with `auth.register` and read `code_result`.
   */
  async validate(input: ValidateCodeInput): Promise<CodeCheck> {
    return this.http.post<CodeCheck>("/me/codes/validate", { body: input });
  }
}
