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
 */

/** `terms` covers the offer, the tariffs and the privacy policy together. */
export type ConsentKind =
  | "terms"
  | "personal_data"
  | "marketing"
  | "cookies_analytics"
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

  /**
   * Give (`true`) or withdraw (`false`) an optional consent: `marketing` or
   * `cookies_analytics`. Withdrawing `marketing` turns advertising off in
   * every channel at once; giving it turns on advertising by e-mail. A call
   * that changes nothing records nothing.
   *
   * Errors: 400 `consent_required` for `terms` or `personal_data`,
   * 400 `unknown_consent`.
   */
  async set(kind: ConsentKind, given: boolean, channel?: ConsentChannel): Promise<Consents> {
    const body: { kind: ConsentKind; given: boolean; channel?: ConsentChannel } = { kind, given };
    if (channel !== undefined) body.channel = channel;
    return this.http.post<Consents>("/me/consents", { body });
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
