import type { HttpClient } from "../http.js";

/**
 * Close requests — `client.closeRequests.*`: close a card that still holds
 * money and get what is left back the way it was paid.
 *
 *   POST /me/cards/{id}/close-request                 → request
 *   GET  /me/close-requests                           → list
 *   GET  /me/close-requests/{id}                      → get
 *   POST /me/close-requests/{id}/payout-details       → submitPayoutDetails
 *
 * `cards.terminate()` refuses a card with money on it (409
 * `move_balance_first` or `contact_support_to_close`). Offer
 * `closeRequests.request(cardId)` instead: the card is closed at its issuer
 * right away, and once the issuer returns what was left on it the money goes
 * back to the payments the card was topped up with, in the currency they
 * were paid in, newest first. Unspent bonuses are not refunded, and a debt
 * the user was told about (`client.debt`) is withheld first.
 *
 * The request moves through `status`:
 *
 * - `accepted`: the card is being closed;
 * - `awaiting_issuer`: closed; the issuer has not returned the balance yet;
 * - `refunding`: the money is on its way back (`refunds`, `on_the_way`);
 * - `payout_details_required`: it can't go back the way it came. Ask the
 *   user for a bank account or a card in their own name and send it with
 *   {@link CloseRequestsResource.submitPayoutDetails};
 * - `identity_check`: the details are being checked (they can still be
 *   corrected);
 * - `manual_payout`: checked; the transfer is being made;
 * - `refunded`: everything due went back.
 *
 * Amounts only, never rates: the user sees what the card held
 * (`balance`), what is kept back (`bonus_excluded`, `debt_withheld`), what
 * goes back in all once it is known (`refund_total`) and what went back so
 * far (`refunded`). `deadline_at` is when the refund is due by. The user is
 * notified when the close is accepted (`card_close_requested`), each time
 * money is sent back (`card_close_refund_sent`), when details are needed
 * (`card_close_payout_details_needed`) and when a transfer by hand was made
 * (`card_close_paid_manually`).
 */

/** An amount with its currency, decimal string. */
export interface CloseAmount {
  amount: string;
  currency: string;
}

/** Where a close request stands. */
export type CloseRequestStatus =
  | "accepted"
  | "awaiting_issuer"
  | "refunding"
  | "payout_details_required"
  | "identity_check"
  | "manual_payout"
  | "refunded"
  | (string & {});

/** One part of the refund. */
export interface CloseRefund {
  id: string;
  /** Decimal string, in `currency`. */
  amount: string;
  currency: string;
  /** `pending` (sent, the bank has not confirmed it yet) or `succeeded`. */
  status: "pending" | "succeeded" | (string & {});
  /** `original_payment`: back to a payment's details; `manual`: transferred to the details the user gave. */
  method: "original_payment" | "manual" | (string & {});
  created_at: string;
  /** When it went through; `null` while pending. */
  completed_at: string | null;
}

/** The details given for a transfer by hand, as shown back: never the whole number. */
export interface PayoutDetailsShown {
  kind: "account" | "card" | (string & {});
  /** The last four digits, e.g. `•••• 4312`. */
  masked: string;
  given_at: string | null;
}

/** A request to close a card with money on it. */
export interface CloseRequest {
  id: string;
  card_id: string;
  card_last4: string | null;
  status: CloseRequestStatus;
  /** What the card held: what the issuer returned once it did, before that what the card showed. */
  balance: CloseAmount;
  /** Unspent bonuses, not refunded, in the card's currency; `null` until the issuer returned the balance. */
  bonus_excluded: string | null;
  /** The debt withheld, in the card's currency; `null` until the issuer returned the balance. */
  debt_withheld: string | null;
  /** Everything that goes back, in the currency the card was paid in; `null` until known. */
  refund_total: CloseAmount | null;
  /** What went back already. */
  refunded: CloseAmount;
  /** Sent and not confirmed yet. */
  on_the_way: CloseAmount;
  /** The parts of the refund, oldest first. */
  refunds: CloseRefund[];
  /** The details given for a transfer by hand, if any. */
  payout_details: PayoutDetailsShown | null;
  /** The refund is due by then. */
  deadline_at: string;
  created_at: string;
  /** When the issuer took the close. */
  closed_at: string | null;
  /** When the issuer returned the balance. */
  returned_at: string | null;
  refunded_at: string | null;
}

/**
 * Where to send the money when it can't go back the way it came. Either kind
 * must be in the user's own name. Spaces and dashes in numbers are fine.
 */
export type PayoutDetailsInput =
  | {
      kind: "account";
      /** The account holder's full name as the bank has it. */
      holder_name: string;
      account_number: string;
      /** The bank's code (BIC). */
      bank_code: string;
      bank_name?: string;
    }
  | {
      kind: "card";
      /** The cardholder's full name as on the card. */
      holder_name: string;
      card_number: string;
    };

/** Why a close request can't be made right now (409 `code`). */
export type CloseRequestError =
  | "card_locked"
  | "first_purchase_required"
  | "card_not_closable"
  | "topup_in_progress"
  | "card_closing"
  | "no_balance"
  | "provider_refused"
  | (string & {});

export class CloseRequestsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Close a card that holds money, the rest going back the way it was paid.
   * Asking again for the same card returns the same request. 404 no such
   * card · 409 {@link CloseRequestError}: `no_balance` means the card holds
   * nothing, close it with `cards.terminate()` · 503 the issuer can't be
   * reached; the card stays as it was.
   */
  async request(cardId: string, input: { reason?: string } = {}): Promise<CloseRequest> {
    return this.http.post<CloseRequest>(`/me/cards/${encodeURIComponent(cardId)}/close-request`, {
      body: { reason: input.reason },
    });
  }

  /** Every card close request of the user, newest first. */
  async list(opts: { signal?: AbortSignal } = {}): Promise<CloseRequest[]> {
    const res = await this.http.get<{ items: CloseRequest[] }>("/me/close-requests", {
      signal: opts.signal,
    });
    return res.items;
  }

  /** One close request. 404 when it isn't the user's. */
  async get(id: string, opts: { signal?: AbortSignal } = {}): Promise<CloseRequest> {
    return this.http.get<CloseRequest>(`/me/close-requests/${encodeURIComponent(id)}`, {
      signal: opts.signal,
    });
  }

  /** The request for this card, if the user made one. */
  async forCard(cardId: string, opts: { signal?: AbortSignal } = {}): Promise<CloseRequest | null> {
    const all = await this.list(opts);
    return all.find((r) => r.card_id === cardId) ?? null;
  }

  /**
   * Give a bank account or a card in the user's own name, when the request
   * is `payout_details_required` (or `identity_check`, to correct them). 400
   * `validation`: a name, number or bank code that doesn't look right · 409
   * `details_not_needed`.
   */
  async submitPayoutDetails(id: string, details: PayoutDetailsInput): Promise<CloseRequest> {
    return this.http.post<CloseRequest>(
      `/me/close-requests/${encodeURIComponent(id)}/payout-details`,
      { body: details },
    );
  }
}
