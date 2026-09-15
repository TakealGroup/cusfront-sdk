import type { HttpClient } from "../http.js";

/**
 * Push resource — `client.push.*`.
 *
 * Web Push for the signed-in user, through the older single-subscription
 * endpoint. The API now keeps one device per browser (see
 * `client.devices`), and this endpoint is an alias over the Web Push
 * devices: it keeps working, but new code should call
 * `client.devices.registerWebPush(reg)` / `unregisterWebPush(reg)` instead.
 *
 * Your service worker shows the notification: the payload is JSON with
 * `title`, `body` and `url` (where a click should lead).
 */

export interface PushStatus {
  /** `true` when a subscription is stored for this user. */
  subscribed: boolean;
  /** Host of the stored endpoint, e.g. `fcm.googleapis.com`. */
  endpoint_host?: string | null;
  /** VAPID public key (URL-safe base64) for `pushManager.subscribe`.
   *  `null` when push is not set up on this deployment. */
  vapid_public_key?: string | null;
}

export interface PushSubscriptionInput {
  /** `PushSubscription.endpoint`; must be https. */
  endpoint: string;
  keys: {
    /** URL-safe base64. */
    p256dh: string;
    /** URL-safe base64. */
    auth: string;
  };
}

/** The part of `ServiceWorkerRegistration` the SDK needs. Typed
 *  structurally so the core stays free of DOM lib types. */
export interface PushCapableRegistration {
  pushManager: {
    getSubscription(): Promise<{ unsubscribe(): Promise<boolean> } | null>;
    subscribe(options: {
      userVisibleOnly: boolean;
      applicationServerKey: Uint8Array;
    }): Promise<{ toJSON(): { endpoint?: string; keys?: Record<string, string> } }>;
  };
}

export class PushResource {
  constructor(private readonly http: HttpClient) {}

  /** Whether the user is subscribed, plus the VAPID key to subscribe with. */
  async status(): Promise<PushStatus> {
    return this.http.get<PushStatus>("/me/push-subscription");
  }

  /** Store a subscription you created yourself.
   *  409 `push_disabled` when the deployment has no VAPID keys.
   *  @deprecated Use `client.devices.register({ kind: "webpush", ... })`. */
  async save(input: PushSubscriptionInput): Promise<PushStatus> {
    return this.http.put<PushStatus>("/me/push-subscription", { body: input });
  }

  /** Delete the stored subscription. Safe when nothing is stored.
   *  @deprecated Use `client.devices.remove(id)` or `client.devices.unregisterWebPush(reg)`. */
  async remove(): Promise<void> {
    await this.http.delete<void>("/me/push-subscription");
  }

  /** Subscribe this browser and store the subscription. Ask for
   *  notification permission before calling. Throws when push isn't set up
   *  on the deployment.
   *  @deprecated Use `client.devices.registerWebPush(registration)`. */
  async enable(registration: PushCapableRegistration): Promise<PushStatus> {
    const { vapid_public_key } = await this.status();
    if (!vapid_public_key) {
      throw new Error("@takeal/cusfront-sdk: push notifications are not enabled on this deployment");
    }
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64UrlToBytes(vapid_public_key),
    });
    const json = sub.toJSON();
    if (!json.endpoint || !json.keys?.p256dh || !json.keys.auth) {
      throw new Error("@takeal/cusfront-sdk: the browser returned an incomplete push subscription");
    }
    return this.save({
      endpoint: json.endpoint,
      keys: { p256dh: json.keys.p256dh, auth: json.keys.auth },
    });
  }

  /** Unsubscribe this browser and delete the stored subscription.
   *  @deprecated Use `client.devices.unregisterWebPush(registration)`. */
  async disable(registration: PushCapableRegistration): Promise<void> {
    const sub = await registration.pushManager.getSubscription();
    if (sub) await sub.unsubscribe();
    await this.remove();
  }
}

/** URL-safe base64 (padding optional) → bytes. */
export function base64UrlToBytes(input: string): Uint8Array {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
