import type { HttpClient } from "../http.js";

/**
 * Sessions resource — `client.sessions.*`.
 *
 * Every device or browser the user is signed in on. Lets a settings screen
 * show "where you're signed in" and sign one or all of them out.
 *
 * ```ts
 * const sessions = await client.sessions.list();
 * const others = sessions.filter((s) => !s.current);
 * await client.sessions.revokeOthers();
 * ```
 */

export interface UserSession {
  /** Session id; pass it to `revoke`. */
  jti: string;
  issued_at: string;
  expires_at: string;
  last_seen_at: string;
  /** Client IP recorded for the session, if known. */
  remote_ip?: string | null;
  /** Browser or app that opened the session, if known. */
  user_agent?: string | null;
  /** `true` for the session this client is using. */
  current: boolean;
}

export class SessionsResource {
  constructor(private readonly http: HttpClient) {}

  /** All live sessions of the account, this one included. */
  async list(): Promise<UserSession[]> {
    return this.http.get<UserSession[]>("/me/sessions");
  }

  /** Sign out one session. Works on the current one too; the stored JWT
   *  stops working, so follow with `client.auth.signOut()`.
   *  404 when the session is unknown or already signed out. */
  async revoke(jti: string): Promise<void> {
    await this.http.delete<void>(`/me/sessions/${encodeURIComponent(jti)}`);
  }

  /** Sign out every session except this one. */
  async revokeOthers(): Promise<{ revoked_sessions: number }> {
    return this.http.post<{ revoked_sessions: number }>("/me/sessions/terminate-others");
  }
}
