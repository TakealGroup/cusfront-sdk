import type { HttpClient } from "../http.js";

/**
 * Balance resource — `client.balance.*`.
 *
 * The user's wallet balance, tracked in the ledger. Mirrors
 * the Takeal API's `GET /me/balance?currency=<code>` route. Balance is per-currency:
 * the endpoint requires a `currency` query param and returns the amount held
 * in that currency.
 */

/** Wallet balance for one currency. `amount` is a decimal string. */
export interface Balance {
  amount: string;
  currency: string;
}

export class BalanceResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Fetch the user's wallet balance for `currency` (ISO 4217, e.g. `"USD"`).
   * Required — the ledger holds a separate balance per currency, so there is
   * no "total" without one.
   */
  async get(currency: string): Promise<Balance> {
    const q = new URLSearchParams({ currency }).toString();
    return this.http.get<Balance>(`/me/balance?${q}`);
  }
}
