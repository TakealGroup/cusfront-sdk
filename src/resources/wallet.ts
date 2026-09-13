import type { HttpClient } from "../http.js";

/**
 * Wallet resource — `client.wallet.*`.
 *
 * Which currency the user's wallet is held in. Deposits in any other
 * currency are converted on funding (quote first, see `client.deposits`);
 * cards issued in another currency are paid from the wallet with an FX leg
 * at issuance. A user may switch currency only while every balance is zero
 * and only to a currency the deployment offers (`allowed`).
 */

/** The user's wallet currency and what they may switch to. */
export interface Wallet {
  /** ISO 4217 code the wallet is held in. */
  currency: string;
  /** `true` when chosen by the user (or set by an operator), `false` when it
   *  is the deployment default. */
  explicit: boolean;
  /** Currencies accepted by `set()`. */
  allowed: string[];
}

export class WalletResource {
  constructor(private readonly http: HttpClient) {}

  /** Current wallet currency + the currencies the user may switch to. */
  async get(opts: { signal?: AbortSignal } = {}): Promise<Wallet> {
    return this.http.get<Wallet>("/me/wallet", { signal: opts.signal });
  }

  /**
   * Switch the wallet currency. Fails with `409 wallet_not_empty` while any
   * balance is non-zero, and `400 currency_not_allowed` for a currency the
   * deployment does not offer.
   */
  async set(currency: string, opts: { signal?: AbortSignal } = {}): Promise<Wallet> {
    return this.http.put<Wallet>("/me/wallet", { body: { currency }, signal: opts.signal });
  }
}
