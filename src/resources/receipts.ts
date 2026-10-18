import type { HttpClient } from "../http.js";

/**
 * Receipts resource — `client.receipts.*`: one numbered receipt for every
 * payment: a wallet top-up, a card top-up and a card's issue price.
 *
 * ```ts
 * const all = await client.receipts.list();
 * const [forDeposit] = await client.receipts.list({ refId: deposit.id });
 * const one = await client.receipts.get(id);
 * ```
 *
 * A receipt appears within a minute of the payment going through and is
 * mailed to the user at the same time. The rate on it is the one the money
 * was credited at; the platform's margin is not shown.
 */

export type ReceiptKind = "wallet_deposit" | "card_topup" | "card_issue" | (string & {});

export interface Receipt {
  id: string;
  /** Shown as `R-000123`. */
  number: string;
  kind: ReceiptKind;
  /** The deposit, card top-up or card the payment was for. */
  ref_id: string;
  paid_at: string;
  /** Decimal string. */
  paid_amount: string;
  paid_currency: string;
  /** `card`, `sbp`, `crypto`, `bank_transfer` or `wallet`. */
  method: string;
  credited_amount: string | null;
  credited_currency: string | null;
  /** What one unit of `credited_currency` cost in `paid_currency`; only when they differ. */
  rate: string | null;
  card_id: string | null;
  card_last4: string | null;
}

export interface ListReceiptsParams {
  /** Only the receipt of this deposit, card top-up or card. */
  refId?: string;
  /** Newest first; default 50, at most 200. */
  limit?: number;
}

export class ReceiptsResource {
  constructor(private readonly http: HttpClient) {}

  async list(params: ListReceiptsParams = {}): Promise<Receipt[]> {
    const q = new URLSearchParams();
    if (params.refId !== undefined) q.set("ref_id", params.refId);
    if (params.limit !== undefined) q.set("limit", String(params.limit));
    const qs = q.toString();
    return this.http.get<Receipt[]>(`/me/receipts${qs ? `?${qs}` : ""}`);
  }

  async get(id: string): Promise<Receipt> {
    return this.http.get<Receipt>(`/me/receipts/${encodeURIComponent(id)}`);
  }
}
