import type { HttpClient } from "../http.js";

/**
 * Codes resource — `client.codes.*`.
 *
 * Promo and referral codes. A code is used on the operation itself:
 * `code` on `auth.register` / `auth.exchangeTelegram`, `promo_code` on
 * `deposits.initiate`, `promoCode` on `cards.create`, and
 * `client.subscription.setPromoCode` for the monthly fee.
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
