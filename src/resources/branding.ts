import type { HttpClient } from "../http.js";

/**
 * Branding resource — `client.branding.*`.
 *
 * Runtime white-label config published by the deployment at `GET /branding`
 * (public, no auth). Lets a Cusfront re-theme itself on the fly — platform
 * name, logo, favicon, brand colours and the label used for the end-user's balance — without
 * a rebuild. Pairs with the build-time `BrandConfig`: the server-side values
 * win whenever both are present.
 */

/** Public brand config of the deployment. All strings; empty = use the client default. */
export interface Branding {
  /** Platform display name (e.g. the white-label brand). */
  platform_name: string;
  /** Name of the merchant-facing portal. */
  merchant_portal_name: string;
  /** Logo image — absolute URL or `data:` URI. Empty → client default. */
  logo_url: string;
  /** Favicon — absolute URL or `data:` URI. Empty → client default. */
  favicon_url: string;
  /** User-facing name of the balance, e.g. `"Wallet"` or `"Acme Wallet"`.
   *  Display-only: the `balance` API shape never changes with it. */
  wallet_label: string;
  /** Primary brand colour as `#rrggbb`. Empty → client default palette. */
  primary_color: string;
  /** Secondary brand colour as `#rrggbb`. Empty → client default palette. */
  secondary_color: string;
  /** Accent colour as `#rrggbb`. Empty → client default palette. */
  accent_color: string;
}

export class BrandingResource {
  constructor(private readonly http: HttpClient) {}

  /** Fetch the deployment's public brand config. Safe to call before login. */
  async get(opts: { signal?: AbortSignal } = {}): Promise<Branding> {
    return this.http.get<Branding>("/branding", { skipAuth: true, signal: opts.signal });
  }
}
