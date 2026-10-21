import type { HttpClient } from "../http.js";
import { anonymousKey } from "./attribution.js";

/**
 * Consents resource — `client.consents.*`: what the user agreed to.
 *
 * ```ts
 * const { consents } = await client.consents.get();
 * await client.consents.set("marketing", false); // advertising off everywhere
 * ```
 *
 * Consents are first given with the sign-up (`auth.register({ consents })`,
 * `auth.exchangeTelegram({ consents })`) and with a card order
 * (`cards.create({ consents })`). Each one is recorded with the version of
 * its documents in force at that moment; the client sends kinds only.
 *
 * Two of them guard what reaches a card issuer:
 *
 * - `holder_data_transfer`: the user's real personal details go to the card
 *   issuer. A product with `holder_data_required` is issued only while it
 *   stands; show the consent screen before the order and send the kind in
 *   the order's `consents` (or give it with {@link ConsentsResource.allowHolderData}).
 *   Without it the order fails with 409 `holder_data_consent_required`.
 * - `dispute_documents_transfer`: the user's documents go to the card issuer
 *   when a payment is disputed. Nothing is sent without it; give it with
 *   {@link ConsentsResource.allowDisputeDocuments}, naming the disputed card.
 */

/** The user's real personal details go to the card issuer. */
export const HOLDER_DATA_CONSENT = "holder_data_transfer";
/** The user's documents go to the card issuer in a dispute. */
export const DISPUTE_DOCUMENTS_CONSENT = "dispute_documents_transfer";

/** `terms` covers the offer, the tariffs and the privacy policy together. */
export type ConsentKind =
  | "terms"
  | "personal_data"
  | "marketing"
  | "cookies_analytics"
  | typeof HOLDER_DATA_CONSENT
  | typeof DISPUTE_DOCUMENTS_CONSENT
  // Kinds added later still type-check.
  | (string & {});

/** Where a consent was given. Read from the client header when omitted. */
export type ConsentChannel = "site" | "cabinet" | "miniapp" | "bot";

/** A document a consent refers to, at the version the user accepted. */
export interface ConsentDocument {
  slug: string;
  version: number;
}

export interface ConsentState {
  kind: ConsentKind;
  /** Given and not withdrawn since. */
  given: boolean;
  /** When it was last given; `null` if never. */
  given_at: string | null;
  /** When it was withdrawn after that; `null` while it stands. */
  withdrawn_at: string | null;
  /** The documents it referred to when last given. */
  documents: ConsentDocument[];
  /** Can be withdrawn with {@link ConsentsResource.set}. The required ones
   *  (`terms`, `personal_data`) can't: closing the account withdraws them. */
  optional: boolean;
}

export interface Consents {
  consents: ConsentState[];
}

/** Where and for what a consent is given with {@link ConsentsResource.set}. */
export interface ConsentOptions {
  /** Where it was given. Read from the client header when omitted. */
  channel?: ConsentChannel;
  /**
   * One of the user's cards, for `holder_data_transfer` and
   * `dispute_documents_transfer` only: the card the consent is given for,
   * such as the card a dispute is about. Sent as `card_id` and kept with the
   * consent; a consent given for a card is recorded every time, even when
   * one already stands.
   */
  cardId?: string;
}

export interface CookieChoiceInput {
  /** `true`: analytics cookies allowed; `false`: declined. */
  analytics: boolean;
  /** The visitor's anonymous key. Defaults to the one `anonymousKey()`
   *  keeps (the key visits are sent with); ignored for a signed-in user. */
  anonymousKey?: string;
  /** Where the choice was made. Read from the client header when omitted. */
  channel?: ConsentChannel;
}

export class ConsentsResource {
  constructor(private readonly http: HttpClient) {}

  /** Where each consent stands. */
  async get(): Promise<Consents> {
    return this.http.get<Consents>("/me/consents");
  }

  /** Whether `kind` stands now: given and not withdrawn since. */
  async stands(kind: ConsentKind): Promise<boolean> {
    const { consents } = await this.get();
    return consents.some((c) => c.kind === kind && c.given);
  }

  /**
   * Give (`true`) or withdraw (`false`) an optional consent: `marketing`,
   * `cookies_analytics`, `holder_data_transfer` or
   * `dispute_documents_transfer`. Withdrawing `marketing` turns advertising
   * off in every channel at once; giving it turns on advertising by e-mail.
   * Withdrawing `holder_data_transfer` leaves the user's cards alone and
   * stops new cards whose product has `holder_data_required`. A call that
   * changes nothing records nothing, unless it names a card.
   *
   * The third argument is the channel, or {@link ConsentOptions} with the
   * channel and the card.
   *
   * Errors: 400 `consent_required` for `terms` or `personal_data`,
   * 400 `unknown_consent`, 400 `card_not_allowed` (a card named with a kind
   * that takes none), 404 `not_found` (not one of the user's cards).
   */
  async set(
    kind: ConsentKind,
    given: boolean,
    options?: ConsentChannel | ConsentOptions,
  ): Promise<Consents> {
    const opts: ConsentOptions =
      typeof options === "string" ? { channel: options } : (options ?? {});
    const body: { kind: ConsentKind; given: boolean; channel?: ConsentChannel; card_id?: string } =
      { kind, given };
    if (opts.channel !== undefined) body.channel = opts.channel;
    if (opts.cardId !== undefined) body.card_id = opts.cardId;
    return this.http.post<Consents>("/me/consents", { body });
  }

  /**
   * The user agreed on the consent screen that their real personal details
   * go to the card issuer (`holder_data_transfer`). Needed before ordering a
   * product with `holder_data_required`, unless the order itself carries the
   * kind in its `consents`.
   */
  async allowHolderData(options?: ConsentOptions): Promise<Consents> {
    return this.set(HOLDER_DATA_CONSENT, true, options);
  }

  /**
   * The user agreed that their documents go to the card issuer for a
   * dispute (`dispute_documents_transfer`). Name the disputed card with
   * `cardId`; each call is then recorded on its own.
   */
  async allowDisputeDocuments(options?: ConsentOptions): Promise<Consents> {
    return this.set(DISPUTE_DOCUMENTS_CONSENT, true, options);
  }

  /**
   * Record what the cookie banner or the cookie settings say about
   * analytics. Works signed in or not: before sign-in the choice is kept
   * under the anonymous key and moves to the account at sign-up (send the
   * same key in `register({ attribution })`). Declining deletes the
   * visitor's recorded visits and analytics ids and stops their conversions
   * going to Metrica. Call it on every change, not on every page load; the
   * same answer twice records nothing (`recorded: false`).
   *
   * Errors: 400 `invalid_anonymous_key` when not signed in and no key could
   * be found.
   */
  async setCookies(input: CookieChoiceInput): Promise<{ recorded: boolean }> {
    const body: { analytics: boolean; anonymous_key?: string; channel?: ConsentChannel } = {
      analytics: input.analytics,
    };
    const key = input.anonymousKey ?? anonymousKey();
    if (key !== undefined) body.anonymous_key = key;
    if (input.channel !== undefined) body.channel = input.channel;
    return this.http.post<{ recorded: boolean }>("/consents/cookies", { body });
  }
}
