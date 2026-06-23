import type { HttpClient } from "../http.js";
import type { TokenStore } from "../token-store.js";

/**
 * Auth resource — `client.auth.*`.
 *
 * Covers the end-user-facing staged auth flow: password login
 * with optional TOTP/OTP step-up. The shape mirrors the responses
 * the Takeal API returns from `/auth/login`, `/auth/login/totp`,
 * `/auth/login/otp/verify`, `/auth/login/2fa/switch`, and `/auth/me`.
 *
 * The login methods stash the JWT in the configured `TokenStore` on
 * success so subsequent `client.*` calls authenticate automatically.
 * Step-up responses (TotpRequired / OtpSent) carry their own short-
 * lived challenge token which the caller passes to the next method
 * — those tokens DO NOT go through the TokenStore (they're not the
 * end-state JWT).
 */

export interface User {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  /** True for users auto-provisioned via the Telegram Mini App who still hold
   *  a synthetic placeholder email. The client should prompt for a real email
   *  and attach it via `auth.linkEmail` — this flips the flag to false. */
  email_pending?: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

/** Discriminated union — `stage` is the discriminator. */
export type LoginResponse = JwtIssued | TotpRequired | TotpSetupRequired;

export interface JwtIssued {
  stage: "jwt";
  access_token: string;
  expires_at: string;
  user: User;
  /** True iff the user's role grants `system.view_hub`.
   *  Cusfront ignores this; the operator console uses it to gate `/dashboard`. */
  hub_access?: boolean;
}

export interface TotpRequired {
  stage: "totp_required";
  challenge_token: string;
  expires_at: string;
  /** Alternate second factors. Pick one with `/2fa/switch`. */
  available_methods: AvailableMethod[];
}

export interface TotpSetupRequired {
  stage: "totp_setup_required";
  challenge_token: string;
  expires_at: string;
  /** OTPAuth URI rendered as a QR by the consumer. */
  otpauth_url: string;
  /** Same secret base32-encoded — for manual entry alongside QR. */
  secret_base32: string;
}

export interface AvailableMethod {
  kind: "totp" | "telegram_otp" | "email_otp";
  /** Short user-facing hint, e.g. `"Telegram (@user)"` or `"e****@example.com"`. */
  hint?: string;
}

export interface TotpVerifyInput {
  challenge_token: string;
  /** 6-digit TOTP code OR `XXXX-XXXX` backup code. */
  code: string;
}

export interface OtpVerifyInput {
  challenge_token: string;
  /** 6-digit one-time code delivered via the selected channel. */
  code: string;
}

export interface SwitchMethodInput {
  challenge_token: string;
  method: AvailableMethod["kind"];
}

export interface OtpSentResponse {
  stage: "otp_sent";
  challenge_token: string;
  expires_at: string;
  method: AvailableMethod["kind"];
  hint?: string;
  available_methods: AvailableMethod[];
}

export class AuthResource {
  constructor(
    private readonly http: HttpClient,
    private readonly tokens: TokenStore,
  ) {}

  /** Password-auth entry. May resolve to a JWT, or to a step-up
   *  challenge that needs `verifyTotp` / `verifyOtp` next. */
  async login(input: LoginInput): Promise<LoginResponse> {
    const resp = await this.http.post<LoginResponse>("/auth/login", {
      body: input,
      skipAuth: true,
    });
    if (resp.stage === "jwt") {
      await Promise.resolve(this.tokens.set(resp.access_token));
    }
    return resp;
  }

  /** Verify a TOTP code (or XXXX-XXXX backup code) against a
   *  `totp_required` challenge. On success the JWT is stored. */
  async verifyTotp(input: TotpVerifyInput): Promise<JwtIssued> {
    const resp = await this.http.post<JwtIssued>("/auth/login/totp", {
      body: input,
      skipAuth: true,
    });
    await Promise.resolve(this.tokens.set(resp.access_token));
    return resp;
  }

  /** Verify a 6-digit OTP code (Telegram / email) against an
   *  `otp_sent` challenge. */
  async verifyOtp(input: OtpVerifyInput): Promise<JwtIssued> {
    const resp = await this.http.post<JwtIssued>("/auth/login/otp/verify", {
      body: input,
      skipAuth: true,
    });
    await Promise.resolve(this.tokens.set(resp.access_token));
    return resp;
  }

  /** Swap the 2FA method mid-flow. Resolves to `otp_sent` for
   *  telegram/email; for TOTP it short-circuits back to the challenge. */
  async switchMethod(input: SwitchMethodInput): Promise<OtpSentResponse> {
    return this.http.post<OtpSentResponse>("/auth/login/2fa/switch", {
      body: input,
      skipAuth: true,
    });
  }

  /** Exchange a signed Telegram Mini App `initData` payload for a session
   *  JWT. The server validates the initData HMAC against the deployment's bot
   *  token, then find-or-creates the end-user. First-time Telegram users are
   *  auto-provisioned with `user.email_pending === true` — prompt them for a
   *  real email and call {@link linkEmail}. Stores the JWT on success.
   *
   *  Most consumers use the higher-level `fromInitData` / `fromTelegramWebApp`
   *  helpers in `@takeal/cusfront-sdk/telegram`; reach for this directly when
   *  you already hold a configured client. */
  async exchangeTelegram(input: { initData: string }): Promise<JwtIssued> {
    const resp = await this.http.post<JwtIssued>("/auth/telegram/exchange", {
      body: { init_data: input.initData },
      skipAuth: true,
    });
    await Promise.resolve(this.tokens.set(resp.access_token));
    return resp;
  }

  /** Attach a real email to the current user (and clear `email_pending`).
   *  Used after a Telegram exchange to satisfy the email requirement; also
   *  works for a password user changing their address. 409 if taken. */
  async linkEmail(input: { email: string }): Promise<User> {
    return this.http.post<User>("/me/email", { body: { email: input.email } });
  }

  /** Current user — fails 401 when the stored JWT is expired or
   *  missing. Useful as a "do I have a session" probe on app boot. */
  async me(): Promise<User> {
    return this.http.get<User>("/auth/me");
  }

  /** Local sign-out. The SDK doesn't currently call a server-side
   *  endpoint (the Takeal API issues stateless JWTs); clearing the
   *  store is enough. Server-side session invalidation may land
   *  with a future session table. */
  async signOut(): Promise<void> {
    await Promise.resolve(this.tokens.clear());
  }
}
