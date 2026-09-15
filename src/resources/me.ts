import type { HttpClient } from "../http.js";
import type { User } from "./auth.js";

/**
 * Me resource — `client.me.*`.
 *
 * Profile-level actions for the signed-in user that don't belong to another
 * resource. Today: the Telegram link.
 *
 * ```ts
 * // Inside a Mini App, with a signed-in client (e.g. opened via a deep link):
 * const me = await client.me.linkTelegram(window.Telegram.WebApp.initData);
 * me.telegram; // { username, linked_at }
 *
 * // From a settings screen:
 * await client.me.unlinkTelegram();
 * ```
 */
export class MeResource {
  constructor(private readonly http: HttpClient) {}

  /** Attach the Telegram account behind `initData` to the signed-in user.
   *  Returns the updated user (`telegram` is set). Repeating the call with
   *  the same Telegram is fine.
   *
   *  Errors: 401 `invalid_init_data`; 403 `user_disabled` /
   *  `second_factor_required`; 409 `telegram_already_linked_other` (the
   *  account already has a different Telegram; `unlinkTelegram` first) /
   *  `telegram_in_use` (that Telegram belongs to another account); 503
   *  `telegram_not_configured`. */
  async linkTelegram(initData: string): Promise<User> {
    return this.http.post<User>("/me/telegram", { body: { init_data: initData } });
  }

  /** Detach the Telegram account from the signed-in user. Returns the
   *  updated user (`telegram` is `null`).
   *
   *  Errors: 404 `telegram_not_linked`; 409 `last_credential` when the
   *  account has no password, so Telegram is its only way to sign in. */
  async unlinkTelegram(): Promise<User> {
    return this.http.delete<User>("/me/telegram");
  }
}
