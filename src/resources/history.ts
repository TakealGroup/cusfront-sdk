import type { HttpClient } from "../http.js";

/**
 * History resource — `client.history.*`: everything that happened to the
 * user's money in one list, newest first.
 *
 * ```ts
 * const page = await client.history.list({ limit: 30 });
 * const more = await client.history.list({ cursor: page.next_cursor! });
 * const oneCard = await client.history.list({ cardId: card.id });
 * for await (const item of client.history.all()) { … }
 * ```
 *
 * New kinds are added over time. Render an unknown `kind` from its `title`,
 * `amount`, `direction` and `status`; don't drop it.
 */

export type HistoryKind =
  | "card_purchase"
  | "card_refund"
  | "card_issued"
  | "card_topup"
  | "card_transfer"
  | "wallet_deposit"
  | "deposit_refund"
  | "fee"
  | "balance_adjustment"
  | "bonus"
  /**
   * What was left on a closed card moving to the card that replaced it:
   * `card` is the old card, `to_card` the new one. `pending` until the
   * issuer returns the money and it is on the new card. If the new card
   * could not take it, the money went to the wallet and `title` says so.
   */
  | "closed_card_balance"
  // Any kind added later still type-checks.
  | (string & {});

export type HistoryStatus =
  "completed" | "pending" | "declined" | "reversed" | "failed" | (string & {});

export interface HistoryAmount {
  /** Decimal string, never negative; see `direction`. */
  amount: string;
  /** ISO 4217 code. */
  currency: string;
}

export interface HistoryCard {
  id: string;
  name: string | null;
  last4: string | null;
}

export interface HistoryItem {
  /** Unique across kinds. */
  id: string;
  kind: HistoryKind;
  occurred_at: string;
  /** `pending` is not finished yet; `reversed` is an authorisation that was released. */
  status: HistoryStatus;
  /** `out` money left the user, `in` it came in, `internal` it moved between the wallet and the user's cards. */
  direction: "out" | "in" | "internal" | (string & {});
  /** The merchant, or what the operation was, in the language asked for. */
  title: string;
  /**
   * In the currency the operation happened in. For `bonus` the currency is
   * `BNS` and the amount is a number of bonuses, not money.
   */
  amount: HistoryAmount;
  /**
   * The other side of a conversion (what the card was billed, what the
   * wallet or card received). For a `bonus` spend: the part of the price
   * the bonuses covered, or what they added to a top-up.
   */
  counter_amount: HistoryAmount | null;
  /** Rate between `amount` and `counter_amount`, decimal string. */
  fx_rate: string | null;
  /** A fee charged with the operation, in the wallet's currency. */
  fee: HistoryAmount | null;
  /** The card; the source card of a transfer. */
  card: HistoryCard | null;
  /** The destination card of a transfer. */
  to_card: HistoryCard | null;
  merchant: { name: string | null; city: string | null; country: string | null } | null;
  /** On a declined payment: a stable code and the reason in plain words. */
  decline_reason: {
    code:
      | "insufficient_funds"
      | "limit_exceeded"
      | "card_blocked"
      | "card_expired"
      | "wrong_details"
      | "merchant_not_allowed"
      | "other"
      | (string & {});
    text: string;
  } | null;
}

export interface HistoryPage {
  items: HistoryItem[];
  /** Pass as `cursor` for the next, older page; `null` on the last one. */
  next_cursor: string | null;
}

export interface ListHistoryParams {
  /** Only this card's operations, transfers to and from it included. */
  cardId?: string;
  cursor?: string;
  /** 1 to 100, default 30. */
  limit?: number;
  /** `en` or `ru` for titles and decline reasons. Defaults to the browser's language header. */
  lang?: "en" | "ru";
  signal?: AbortSignal;
}

export class HistoryResource {
  constructor(private readonly http: HttpClient) {}

  /** One page of the history. Errors: 400 bad cursor or limit, 404 `cardId` is not the user's card. */
  async list(params: ListHistoryParams = {}): Promise<HistoryPage> {
    const q = new URLSearchParams();
    if (params.cardId) q.set("card_id", params.cardId);
    if (params.cursor) q.set("cursor", params.cursor);
    if (params.limit !== undefined) q.set("limit", String(params.limit));
    if (params.lang) q.set("lang", params.lang);
    const qs = q.toString();
    return this.http.get<HistoryPage>(`/me/history${qs ? `?${qs}` : ""}`, {
      signal: params.signal,
    });
  }

  /** Every entry, page after page, newest first. */
  async *all(params: Omit<ListHistoryParams, "cursor"> = {}): AsyncGenerator<HistoryItem> {
    let cursor: string | undefined;
    do {
      const page = await this.list({ ...params, cursor });
      yield* page.items;
      cursor = page.next_cursor ?? undefined;
    } while (cursor);
  }
}
