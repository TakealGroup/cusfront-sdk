/**
 * Structured customer billing details — shared by the deposits and cards
 * resources. Mirrors the Takeal API's `CustomerInfo` / `Address`.
 *
 * Every field is optional at this layer; each provider connector enforces its
 * own required subset and fails the operation if a mandatory field is missing.
 * Real PSPs / card issuers demand a billing address + name + email for
 * compliance, 3DS, or APM redirect flows; crypto / gift rails usually ignore it.
 */

/** Postal address. ISO 3166 codes recommended where the provider supports them. */
export interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  /** ISO 3166-2 subdivision code, e.g. `"US-CA"`. Free-form fallback accepted. */
  state?: string;
  postal_code?: string;
  /** ISO 3166-1 alpha-2, e.g. `"US"`. */
  country?: string;
}

export interface CustomerInfo {
  email?: string;
  first_name?: string;
  last_name?: string;
  /** E.164 format, e.g. `"+48..."`. Free-form fallback accepted. */
  phone?: string;
  /** ISO 8601 `YYYY-MM-DD`. KYC-tier issuers may require it. */
  birth_date?: string;
  billing_address?: Address;
}
