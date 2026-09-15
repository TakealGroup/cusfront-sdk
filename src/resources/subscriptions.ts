import type { HttpClient } from "../http.js";

/**
 * Subscriptions resource — `client.subscriptions.*`.
 *
 * Which channels the signed-in user agreed to receive announcements on.
 * `available` tells you which toggles to render: a deployment with no
 * Telegram bot configured can't deliver there, so offering the switch would
 * be a lie.
 *
 * ```ts
 * const { channels, available } = await client.subscriptions.get();
 * await client.subscriptions.set([...channels, "telegram"]);
 * ```
 *
 * Unrelated to paid/VIP tiers — this is only about announcements.
 *
 * @deprecated Announcements are now the `marketing` category of the
 * notification preferences. Read them with
 * `client.notifications.getPreferences()` and change them with
 * `client.notifications.setPreferences({ categories: { marketing: { email: true, telegram: false } } })`.
 * This endpoint keeps working as an alias over that setting.
 */

export type BroadcastChannel = "email" | "telegram" | (string & {});

export interface Subscriptions {
  /** Channels the user currently receives announcements on. */
  channels: BroadcastChannel[];
  /** Channels this deployment can actually deliver on. */
  available: BroadcastChannel[];
}

/** @deprecated See the note at the top of this module. */
export class SubscriptionsResource {
  constructor(private readonly http: HttpClient) {}

  async get(): Promise<Subscriptions> {
    return this.http.get<Subscriptions>("/me/subscriptions");
  }

  /**
   * Replace the whole set — this is a PUT, not a merge. Pass `[]` to opt out
   * of everything.
   */
  async set(channels: BroadcastChannel[]): Promise<Subscriptions> {
    return this.http.put<Subscriptions>("/me/subscriptions", {
      body: { channels },
    });
  }
}
