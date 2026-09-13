import type { HttpClient } from "../http.js";

/**
 * Balance resource — `client.balance.*`.
 *
 * The user's wallet balance, tracked in the ledger. Mirrors the Takeal API's
 * `GET /me/balance[?currency=<code>]` route. Balances are per-currency; with
 * no `currency` the wallet's own currency is returned (see `client.wallet`).
 */

/** Wallet balance for one currency. `amount` is a decimal string. */
export interface Balance {
  amount: string;
  currency: string;
}

export class BalanceResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Fetch the user's wallet balance. Omit `currency` for the wallet's own
   * currency; pass an ISO 4217 code (e.g. `"USD"`) to read another one —
   * the ledger holds a separate balance per currency.
   */
  async get(currency?: string): Promise<Balance> {
    if (!currency) return this.http.get<Balance>("/me/balance");
    const q = new URLSearchParams({ currency }).toString();
    return this.http.get<Balance>(`/me/balance?${q}`);
  }
}
