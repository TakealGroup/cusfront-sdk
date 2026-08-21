/**
 * Brand config — runtime-passed, not build-time-baked.
 *
 * Whitelabel customers swap brand without forking the SDK. The SDK
 * exposes `client.brand` for the UI layer to read; nothing else inside
 * the SDK depends on the brand.
 *
 * Optional. When omitted, `client.brand` is `undefined` and the
 * consumer is expected to render its own brand surface independently.
 */
export interface BrandConfig {
  /** Display name shown in headers / titles / footer. */
  name: string;
  /** Absolute or root-relative URL to a logo asset. */
  logoUrl?: string;
  /** CSS colour token consumed by the Cusfront's theme provider.
   *  Hex, rgb(), or any CSS-valid colour string. */
  primaryColor?: string;
  /** Deep link to a support channel (Telegram, email, etc.). When set
   *  the Cusfront's footer renders a "Need help?" link. */
  supportUrl?: string;
  /** Label for the end-user's balance ("Wallet", "Acme Wallet").
   *  Build-time fallback; `client.branding.get()` returns the live value. */
  walletLabel?: string;
}
