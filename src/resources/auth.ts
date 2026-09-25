import type { HttpClient } from "../http.js";
import type { TokenStore } from "../token-store.js";
import { isApiError } from "../error.js";
import type { SignupAttribution } from "./attribution.js";

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
  /** ISO 4217 code the user's wallet is held in (their own choice, else the
   *  deployment default). Present on `GET /auth/me`. */
  wallet_currency?: string;
  /** The Telegram account linked to this user, or `null` when none is.
   *  Present on `GET /auth/me` and inside every `stage: "jwt"` envelope. */
  telegram?: TelegramLink | null;
}

/** A Telegram account attached to a user. One Telegram per account and one
 *  account per Telegram. */
export interface TelegramLink {
  /** Telegram username without the `@`, or `null` when the user has none. */
  username: string | null;
  /** When the link was made, ISO-8601. */
  linked_at: string;
}

export interface ExchangeTelegramInput {
  /** Raw `window.Telegram.WebApp.initData`, passed to the server verbatim. */
  initData: string;
  /** Analytics ids for a new account. The Telegram id is the anonymous key
   *  here, and a `startapp` code in `initData` is read by the server. */
  attribution?: SignupAttribution;
  /** Create an account for a Telegram id the deployment has not seen before.
   *  Default `true`. With `false` the exchange resolves to
   *  `{ stage: "unknown" }` instead, so the app can offer "create an account"
   *  or "I already have one". */
  provision?: boolean;
}

/** `exchangeTelegram({ provision: false })` for a Telegram id nobody has
 *  signed in with yet. No account was created and no JWT was stored. */
export interface TelegramUnknown {
  stage: "unknown";
}

export interface LinkTelegramInput {
  /** Raw `window.Telegram.WebApp.initData`, passed to the server verbatim. */
  initData: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
  /** Keep this browser signed in: the SDK stores the remember token it gets
   *  and renews the session by itself when it ends. For accounts with a
   *  second factor, pass it again to `verifyTotp` / `verifyOtp` /
   *  `completeTotpSetup`. */
  remember?: boolean;
}

/** Discriminated union — `stage` is the discriminator. */
export type LoginResponse = JwtIssued | TotpRequired | TotpSetupRequired;

export interface JwtIssued {
  stage: "jwt";
  access_token: string;
  expires_at: string;
  user: User;
  /** Present when the sign-in was remembered. The SDK keeps it in the
   *  remember store; you don't need to. */
  remember_token?: string;
  remember_expires_at?: string;
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
  /** Keep this browser signed in, as in `login`. */
  remember?: boolean;
}

export interface OtpVerifyInput {
  challenge_token: string;
  /** 6-digit one-time code delivered via the selected channel. */
  code: string;
  /** Keep this browser signed in, as in `login`. */
  remember?: boolean;
}

export interface SwitchMethodInput {
  challenge_token: string;
  method: AvailableMethod["kind"];
}

export interface RegisterInput {
  email: string;
  password: string;
  /** ISO 4217 code for the new wallet; must be offered by the deployment. */
  wallet_currency?: string;
  /** Keep this browser signed in, as in `login`. */
  remember?: boolean;
  /** Where the new user came from: the anonymous key their visits were
   *  sent with (`client.attribution.touch`) and the analytics ids. Without
   *  it the account is recorded with an unknown source. */
  attribution?: SignupAttribution;
}

/** A signed-in session without the login `stage` marker — what
 *  `register` returns. */
export type Session = Omit<JwtIssued, "stage">;

export interface TotpSetupComplete extends Session {
  /** Ten one-time `XXXX-XXXX` codes, returned only this once. */
  backup_codes: string[];
}

export interface ChangePasswordInput {
  current_password: string;
  /** At least 12 characters with a lower-case letter, an upper-case letter
   *  and a digit; must differ from the current password. */
  new_password: string;
}

export interface OtpSentResponse {
  stage: "otp_sent";
  challenge_token: string;
  expires_at: string;
  method: AvailableMethod["kind"];
  hint?: string;
  available_methods: AvailableMethod[];
}

/** Send `remember` as the API's `remember_me`. */
function withRemember<T extends { remember?: boolean }>(input: T): Omit<T, "remember"> & { remember_me?: boolean } {
  const { remember, ...rest } = input;
  return remember ? { ...rest, remember_me: true } : rest;
}

export class AuthResource {
  constructor(
    private readonly http: HttpClient,
    private readonly tokens: TokenStore,
    private readonly remembered?: TokenStore,
  ) {
    if (remembered) http.setRefresher(() => this.renew().then((r) => r.kind !== "gone"));
  }

  /** Store what a finished sign-in returned. */
  private async keep(resp: { access_token: string; remember_token?: string }): Promise<void> {
    await Promise.resolve(this.tokens.set(resp.access_token));
    if (resp.remember_token && this.remembered) {
      await Promise.resolve(this.remembered.set(resp.remember_token));
    }
  }

  /** Renew a remembered sign-in: a new session and a new remember token,
   *  both stored. Resolves `null` (and forgets the remember token) when there
   *  is none or it no longer works; the app then shows the sign-in form.
   *  The SDK does this by itself on a 401; call it on app start to resume a
   *  session without a request failing first. */
  async refresh(): Promise<JwtIssued | null> {
    const r = await this.renew();
    if (r.kind === "renewed") return r.resp;
    if (r.kind === "taken_over") {
      // Another tab renewed first: its session is already stored.
      const access = await Promise.resolve(this.tokens.get());
      const user = await this.me();
      return { stage: "jwt", access_token: access ?? "", expires_at: "", user };
    }
    return null;
  }

  /** The renewal itself, for the 401 path: it must not call the API again
   *  through the client, or a second 401 would wait on this very renewal. */
  private async renew(): Promise<
    { kind: "renewed"; resp: JwtIssued } | { kind: "taken_over" } | { kind: "gone" }
  > {
    const token = this.remembered ? await Promise.resolve(this.remembered.get()) : null;
    if (!token) return { kind: "gone" };
    try {
      const resp = await this.http.post<JwtIssued>("/auth/refresh", {
        body: { remember_token: token },
        skipAuth: true,
      });
      await this.keep(resp);
      return { kind: "renewed", resp };
    } catch (e) {
      if (isApiError(e) && e.status === 401) {
        // Another tab of the same browser may have renewed first; its
        // tokens are then already in the (shared) stores.
        const now = await Promise.resolve(this.remembered!.get());
        if (now && now !== token && (await Promise.resolve(this.tokens.get()))) {
          return { kind: "taken_over" };
        }
        await Promise.resolve(this.remembered!.clear());
        await Promise.resolve(this.tokens.clear());
        return { kind: "gone" };
      }
      throw e;
    }
  }

  /** Password-auth entry. May resolve to a JWT, or to a step-up
   *  challenge that needs `verifyTotp` / `verifyOtp` next. */
  async login(input: LoginInput): Promise<LoginResponse> {
    const resp = await this.http.post<LoginResponse>("/auth/login", {
      body: withRemember(input),
      skipAuth: true,
    });
    if (resp.stage === "jwt") {
      await this.keep(resp);
    }
    return resp;
  }

  /** Verify a TOTP code (or XXXX-XXXX backup code) against a
   *  `totp_required` challenge. On success the JWT is stored. */
  async verifyTotp(input: TotpVerifyInput): Promise<JwtIssued> {
    const resp = await this.http.post<JwtIssued>("/auth/login/totp", {
      body: withRemember(input),
      skipAuth: true,
    });
    await this.keep(resp);
    return resp;
  }

  /** Verify a 6-digit OTP code (Telegram / email) against an
   *  `otp_sent` challenge. */
  async verifyOtp(input: OtpVerifyInput): Promise<JwtIssued> {
    const resp = await this.http.post<JwtIssued>("/auth/login/otp/verify", {
      body: withRemember(input),
      skipAuth: true,
    });
    await this.keep(resp);
    return resp;
  }

  /** Create an end-user account and sign it in. The JWT is stored.
   *  `wallet_currency` must be one the deployment offers; omit it to take
   *  the deployment default (it can be switched later via `client.wallet`
   *  while the wallet is empty).
   *  Errors: 400 `validation` / `currency_not_allowed`, 409 email taken. */
  async register(input: RegisterInput): Promise<Session> {
    const resp = await this.http.post<Session>("/auth/register", {
      body: withRemember(input),
      skipAuth: true,
    });
    await this.keep(resp);
    return resp;
  }

  /** Finish a `totp_setup_required` login: send the first code from the
   *  authenticator app. The JWT is stored. The response carries ten
   *  one-time `backup_codes` that are never returned again, so show them to
   *  the user right away and don't keep them on the device. */
  async completeTotpSetup(input: TotpVerifyInput): Promise<TotpSetupComplete> {
    const resp = await this.http.post<TotpSetupComplete>("/auth/login/totp-setup", {
      body: withRemember(input),
      skipAuth: true,
    });
    await this.keep(resp);
    return resp;
  }

  /** Change the signed-in user's password. Every other session of the
   *  account is signed out; this one stays valid.
   *  Errors: 400 when the new password fails the policy, 401 when the
   *  current one is wrong. */
  async changePassword(input: ChangePasswordInput): Promise<{ revoked_sessions: number }> {
    return this.http.post<{ revoked_sessions: number }>("/auth/password", {
      body: input,
    });
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
   *  token, then looks the Telegram id up. A known id signs in. An unknown id
   *  gets a fresh account (`user.email_pending === true` — prompt for a real
   *  email and call {@link linkEmail}) unless `provision: false` is passed, in
   *  which case the call resolves to `{ stage: "unknown" }`, nothing is
   *  created and nothing is stored; the app then offers to create the account
   *  (call again with `provision: true`) or to attach the Telegram to an
   *  existing one ({@link linkTelegram}). Stores the JWT on `stage: "jwt"`.
   *
   *  Every other error still throws an `ApiError` (401 `invalid_init_data`,
   *  503 `telegram_not_configured`, …).
   *
   *  Most consumers use the higher-level `fromInitData` / `fromTelegramWebApp`
   *  helpers in `@takeal/cusfront-sdk/telegram`; reach for this directly when
   *  you already hold a configured client. */
  exchangeTelegram(input: { initData: string; provision?: true }): Promise<JwtIssued>;
  exchangeTelegram(input: ExchangeTelegramInput): Promise<JwtIssued | TelegramUnknown>;
  async exchangeTelegram(input: ExchangeTelegramInput): Promise<JwtIssued | TelegramUnknown> {
    const body: { init_data: string; provision?: boolean; attribution?: SignupAttribution } = {
      init_data: input.initData,
    };
    if (input.provision !== undefined) body.provision = input.provision;
    if (input.attribution !== undefined) body.attribution = input.attribution;
    let resp: JwtIssued;
    try {
      resp = await this.http.post<JwtIssued>("/auth/telegram/exchange", {
        body,
        skipAuth: true,
      });
    } catch (e) {
      if (isApiError(e) && e.status === 404 && e.code === "telegram_unknown") {
        return { stage: "unknown" };
      }
      throw e;
    }
    await Promise.resolve(this.tokens.set(resp.access_token));
    return resp;
  }

  /** Attach the Telegram account behind `initData` to an existing email +
   *  password account and sign in as that account. No bearer needed; the
   *  password is checked the same way `login` checks it. The JWT is stored.
   *
   *  Errors: 401 `unauthenticated` (wrong email or password, as with
   *  `login`) / `invalid_init_data`; 403
   *  `user_disabled` / `second_factor_required` (accounts that sign in with
   *  a second factor can't be linked from a Mini App); 409
   *  `telegram_already_linked_other` (this account already has a different
   *  Telegram; unlink it first) / `telegram_in_use` (this Telegram belongs to
   *  another account); 503 `telegram_not_configured`. */
  async linkTelegram(input: LinkTelegramInput): Promise<JwtIssued> {
    const resp = await this.http.post<JwtIssued>("/auth/telegram/link", {
      body: { init_data: input.initData, email: input.email, password: input.password },
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

  /** Sign out: ends this session and the remembered sign-in on the
   *  server (best effort: a network failure still signs out locally), then
   *  forgets both tokens. */
  async signOut(): Promise<void> {
    const remember = this.remembered ? await Promise.resolve(this.remembered.get()) : null;
    try {
      await this.http.post<void>("/auth/logout", {
        body: remember ? { remember_token: remember } : {},
        retried: true,
      });
    } catch {
      // Signed out locally either way.
    }
    await Promise.resolve(this.tokens.clear());
    if (this.remembered) await Promise.resolve(this.remembered.clear());
  }
}
