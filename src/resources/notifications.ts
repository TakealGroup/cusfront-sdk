import type { HttpClient } from "../http.js";

/**
 * Notifications resource — `client.notifications.*`.
 *
 * Every notification a user gets is also kept server-side as an inbox item,
 * whatever else was sent (a push, a Telegram message, an email). The inbox
 * is what the app shows; the other channels are the nudge to open it.
 *
 * ```ts
 * const page = await client.notifications.list({ limit: 20 });
 * for (const item of page.items) {
 *   render(item.title, item.body, item.href); // href: a path inside your app, or null
 * }
 * await client.notifications.markRead(page.items[0].id);
 * ```
 *
 * Preferences decide where the nudge goes: a primary channel (or automatic
 * when `null`), per-category switches, and the user's language.
 */

/** What an item is about. `security` and `money` can't be switched off
 *  completely; `marketing` is off until the user opts in. */
export type NotificationCategory = "money" | "card" | "security" | "account" | "marketing";

/** A way to reach the user outside the inbox. */
export type NotificationChannel = "push" | "telegram" | "email" | "sms";

/** Language the user reads notifications in. */
export type NotificationLocale = "en" | "ru" | (string & {});

export interface InboxItem {
  id: string;
  /** What happened, e.g. `deposit_confirmed`, `card_transaction`, `login_new_device`. */
  event_type: string;
  category: NotificationCategory;
  title: string;
  body: string;
  /** A path inside the client app to open on tap (`/cards/<id>`,
   *  `/deposits/<id>`, `/subscription`, `/settings/sessions`), or `null`. */
  href: string | null;
  /** Event details (amount, currency, card last four and so on); the keys
   *  depend on `event_type`. */
  data: Record<string, unknown>;
  /** Language the item was rendered in. */
  locale: string;
  /** When the user read it, or `null` while unread. */
  read_at: string | null;
  created_at: string;
}

export interface NotificationPage {
  /** Newest first. */
  items: InboxItem[];
  /** Pass back as `cursor` to get the next page; `null` on the last one. */
  next_cursor: string | null;
  /** Unread items across the whole inbox, not just this page. */
  unread_count: number;
}

export interface ListNotificationsParams {
  /** `next_cursor` from the previous page. */
  cursor?: string;
  /** Page size; the server caps it. */
  limit?: number;
  /** Only items without `read_at`. */
  unreadOnly?: boolean;
  category?: NotificationCategory;
}

/** Per-category channel switches: `{ money: { push: true, email: false } }`.
 *  A channel missing from a category keeps its default. */
export type NotificationCategoryPreferences = Partial<
  Record<NotificationCategory, Partial<Record<NotificationChannel, boolean>>>
>;

export interface NotificationPreferences {
  /** The channel to use first; `null` means automatic (the server picks by
   *  the user's devices). */
  primary_channel: NotificationChannel | null;
  categories: NotificationCategoryPreferences;
  /** `null` when unset: the server falls back to the Telegram profile's
   *  language, then the deployment default. */
  locale: NotificationLocale | null;
  /** Channels this deployment can deliver on. Render toggles only for
   *  these. */
  available_channels: NotificationChannel[];
}

/** Body of `setPreferences`. Every field is optional; only the given ones
 *  change. `primary_channel: null` switches back to automatic. */
export interface NotificationPreferencesInput {
  primary_channel?: NotificationChannel | null;
  categories?: NotificationCategoryPreferences;
  locale?: NotificationLocale | null;
}

export class NotificationsResource {
  constructor(private readonly http: HttpClient) {}

  /** One page of the inbox, newest first. */
  async list(params: ListNotificationsParams = {}): Promise<NotificationPage> {
    const q = new URLSearchParams();
    if (params.cursor) q.set("cursor", params.cursor);
    if (params.limit !== undefined) q.set("limit", String(params.limit));
    if (params.unreadOnly) q.set("unread", "true");
    if (params.category) q.set("category", params.category);
    const qs = q.toString();
    return this.http.get<NotificationPage>(`/me/notifications${qs ? `?${qs}` : ""}`);
  }

  /** How many items are unread. Cheap; fine to poll for a badge. */
  async unreadCount(): Promise<number> {
    const { unread } = await this.http.get<{ unread: number }>("/me/notifications/unread-count");
    return unread;
  }

  /** Mark one item read. Returns the item; calling it again is harmless. */
  async markRead(id: string): Promise<InboxItem> {
    return this.http.post<InboxItem>(`/me/notifications/${encodeURIComponent(id)}/read`);
  }

  /** Mark every unread item read, or only those created before `before`
   *  (ISO timestamp). Returns how many changed. */
  async markAllRead(before?: string): Promise<{ marked: number }> {
    return this.http.post<{ marked: number }>("/me/notifications/read-all", {
      body: before ? { before } : {},
    });
  }

  /** Delete one item. 404 when it isn't the user's. */
  async remove(id: string): Promise<void> {
    await this.http.delete<void>(`/me/notifications/${encodeURIComponent(id)}`);
  }

  /** The user's channel and language settings. */
  async getPreferences(): Promise<NotificationPreferences> {
    return this.http.get<NotificationPreferences>("/me/notification-preferences");
  }

  /** Change some settings; the rest stay. Returns the stored view.
   *  400 `validation` for an unknown category, channel or locale. */
  async setPreferences(input: NotificationPreferencesInput): Promise<NotificationPreferences> {
    return this.http.put<NotificationPreferences>("/me/notification-preferences", {
      body: input,
    });
  }
}
