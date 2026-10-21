import type { HttpClient } from "../http.js";

/**
 * Debt resource — `client.debt.*`: card fees the user's cards could not
 * cover.
 *
 *   GET /me/debt → get
 *
 * A card product's tariff (`CardProduct.tariff`) charges fees for using the
 * card: per payment, per decline that was the user's doing, per cash
 * withdrawal. A fee comes off the card; what the card can't cover is owed by
 * the user, not by the card. The next top-up of any of their cards (or of
 * their wallet) pays it first and credits the rest. Show that amount before
 * the payment:
 *
 * - a deposit quote: `FundingQuote.debt_withheld`, off `credited_amount`;
 * - a card order: `CardOrder.debt_withheld`, already in `card_amount`;
 * - a card top-up: `TopUpTerms.debt`;
 * - the deposit itself: `Deposit.debt_quoted`, then `debt_withheld` once paid.
 *
 * The user is notified when a debt arises (`debt_created`) and when it is
 * paid (`debt_settled`).
 */

/** An amount with its currency, decimal string. */
export interface DebtAmount {
  amount: string;
  currency: string;
}

/** What a fee was charged for. */
export type CardFeeKind = "operation" | "decline" | "cash_withdrawal" | (string & {});

/** One amount owed. */
export interface DebtLine {
  id: string;
  /** What it is owed for: `card_fee`. */
  basis: string;
  /** The fee behind it: `operation`, `decline` or `cash_withdrawal`. */
  fee_kind: CardFeeKind | null;
  /** The amount owed when it arose, decimal string. */
  amount: string;
  /** What is still owed of it, decimal string. */
  outstanding: string;
  currency: string;
  /** The card the fee was for. */
  card_id: string | null;
  card_last4: string | null;
  /** The card operation the fee was for. */
  transaction_id: string | null;
  merchant_name: string | null;
  /** The operation's amount, decimal string, never negative. */
  operation_amount: string | null;
  operation_currency: string | null;
  created_at: string;
  /** When it was paid in full; `null` while something is owed. */
  settled_at: string | null;
}

/** What the user owes, from `GET /me/debt`. */
export interface Debt {
  /** Per currency; empty when nothing is owed. */
  total: DebtAmount[];
  /** The amounts still owed, newest first. */
  items: DebtLine[];
}

export class DebtResource {
  constructor(private readonly http: HttpClient) {}

  /** What the user owes in card fees, per currency, and what for. */
  async get(opts: { signal?: AbortSignal } = {}): Promise<Debt> {
    return this.http.get<Debt>("/me/debt", { signal: opts.signal });
  }

  /** What the user owes in `currency`, decimal string; `"0"` when nothing. */
  async owedIn(currency: string, opts: { signal?: AbortSignal } = {}): Promise<string> {
    const debt = await this.get(opts);
    const want = currency.trim().toUpperCase();
    return debt.total.find((d) => d.currency.toUpperCase() === want)?.amount ?? "0";
  }
}
