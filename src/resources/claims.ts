import type { HttpClient } from "../http.js";

/**
 * Claims — `client.claims.*`: dispute a card operation or complain, and
 * follow the claim by its number and status. A card lost or stolen is
 * reported with `client.cards.reportLost()`, which opens a claim too.
 *
 *   POST /me/cards/{id}/report-lost   → cards.reportLost
 *   POST /me/claims                   → create
 *   GET  /me/claims                   → list
 *   GET  /me/claims/{id}              → get
 *
 * Every claim has a `number` (e.g. `C-000123`) the user can quote to
 * support, and a `status`:
 *
 * - `open`: received, nobody has taken it yet;
 * - `in_review`: support is working on it;
 * - `resolved`: done, support's answer is in `resolution`;
 * - `rejected`: declined, the reason is in `resolution`.
 *
 * `reported_at` is when the platform took the claim. For a lost or stolen
 * card that time decides who pays for operations someone else made with it,
 * so show it. Such a card is frozen at its issuer at once (`card_freeze:
 * "frozen"`) and only support can unfreeze it; `cards.unfreeze()` answers
 * 409 `card_locked`. If the issuer could not be reached, `card_freeze` is
 * `"pending"`: the report counts all the same and support freezes the card
 * by hand.
 *
 * The user is notified when a claim comes in (`card_reported_lost`,
 * `card_claim_opened`) and when its status changes (`card_claim_updated`).
 */

/** What a claim is about. */
export type ClaimKind = "lost" | "stolen" | "dispute" | "complaint" | (string & {});

/** Where a claim stands. */
export type ClaimStatus = "open" | "in_review" | "resolved" | "rejected" | (string & {});

/** The card operation a claim is about. */
export interface ClaimTransaction {
  /** The operation's id in `client.history` (`txn_<id>`). */
  id: string;
  /** Decimal string, without a sign. */
  amount: string;
  currency: string;
  merchant_name: string | null;
  /** `pending`, `cleared`, `reversed` or `declined`. */
  status: string;
  occurred_at: string;
}

/** A claim. */
export interface Claim {
  id: string;
  /** What support calls it, e.g. `C-000123`. */
  number: string;
  kind: ClaimKind;
  status: ClaimStatus;
  card_id: string | null;
  card_last4: string | null;
  /** The operation disputed or complained about, if one was named. */
  transaction: ClaimTransaction | null;
  /** The user's own words. */
  description: string;
  /** When the platform took the claim (the server's time, never the device's). */
  reported_at: string;
  /** Lost or stolen only: `frozen`, or `pending` while the issuer hasn't frozen the card. `null` for other kinds. */
  card_freeze: "frozen" | "pending" | null;
  /** Lost or stolen only: when the card was frozen. */
  card_frozen_at: string | null;
  /** Support's answer, once there is one. */
  resolution: string | null;
  created_at: string;
  updated_at: string;
  /** When the claim was resolved or rejected. */
  resolved_at: string | null;
}

/** A page of the user's claims, newest first. */
export interface ClaimPage {
  items: Claim[];
  total: number;
}

/** A dispute or a complaint. */
export interface CreateClaimInput {
  /** `dispute`: a card operation the user doesn't agree with; `complaint`: anything else. */
  kind: "dispute" | "complaint";
  /** What happened, 10 to 4000 characters. */
  description: string;
  /** The card it is about. Optional; found from the operation when one is named. */
  cardId?: string;
  /** The operation it is about, as `client.history` names it (`txn_<id>`). Optional. */
  transactionId?: string;
}

/** Why a claim can't be made right now (409 `code`). */
export type ClaimError = "card_not_open" | "too_many_claims" | (string & {});

export class ClaimsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Dispute a card operation, or complain. 400 `validation`: a description
   * that is too short or too long, an operation that isn't on the user's
   * cards, or a lost or stolen card (use `cards.reportLost()`) · 404 no
   * such card · 409 `too_many_claims`: 20 claims are waiting for an answer.
   */
  async create(input: CreateClaimInput): Promise<Claim> {
    return this.http.post<Claim>("/me/claims", {
      body: {
        kind: input.kind,
        description: input.description,
        card_id: input.cardId,
        transaction_id: input.transactionId,
      },
    });
  }

  /** The user's claims, lost and stolen cards included, newest first. */
  async list(
    opts: { limit?: number; offset?: number; signal?: AbortSignal } = {},
  ): Promise<ClaimPage> {
    const qs = new URLSearchParams();
    if (opts.limit != null) qs.set("limit", String(opts.limit));
    if (opts.offset != null) qs.set("offset", String(opts.offset));
    const q = qs.toString();
    return this.http.get<ClaimPage>(`/me/claims${q ? `?${q}` : ""}`, { signal: opts.signal });
  }

  /** One claim. 404 when it isn't the user's. */
  async get(id: string, opts: { signal?: AbortSignal } = {}): Promise<Claim> {
    return this.http.get<Claim>(`/me/claims/${encodeURIComponent(id)}`, { signal: opts.signal });
  }
}
