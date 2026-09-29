import type { HttpClient } from "../http.js";
import type { ClientPlatform, ResolvedClientDescriptor } from "../client-platform.js";
import { base64UrlToBytes, type PushCapableRegistration } from "./push.js";

/**
 * Devices resource — `client.devices.*`.
 *
 * A user has many devices: each browser with a Web Push subscription, each
 * phone with an FCM / APNs token, and a marker for "uses the Telegram Mini
 * App". The server picks the notification channel from them: a mobile app
 * first, otherwise the device seen most recently.
 *
 * The usual browser flow, once notification permission is granted:
 *
 * ```ts
 * const reg = await navigator.serviceWorker.ready;
 * const device = await client.devices.registerWebPush(reg, { label: "Chrome on Mac" });
 * // later, from a settings screen:
 * await client.devices.unregisterWebPush(reg);
 * ```
 */

export type DeviceKind = "webpush" | "fcm" | "apns" | "telegram_miniapp";

export type DevicePlatform = "pwa" | "web" | "ios" | "android" | "telegram";

export interface Device {
  id: string;
  kind: DeviceKind;
  platform: DevicePlatform;
  /** Free-form name the app gave it ("Chrome on Mac"), or `null`. */
  label: string | null;
  locale: string | null;
  app_version: string | null;
  created_at: string;
  last_seen_at: string;
  /** Set when the device no longer receives anything (the push endpoint is
   *  gone, or someone switched it off). */
  disabled_at: string | null;
  /** `true` when it was registered from the session this client holds. */
  is_current: boolean;
}

/** `PushSubscription.toJSON()` minus the parts the server doesn't need. */
export interface WebPushCredential {
  /** `PushSubscription.endpoint`; must be https. */
  endpoint: string;
  keys: {
    /** URL-safe base64. */
    p256dh: string;
    /** URL-safe base64. */
    auth: string;
  };
}

/** FCM registration token or APNs device token. */
export interface MobilePushCredential {
  token: string;
}

export type RegisterDeviceInput =
  | {
      kind: "webpush";
      platform: DevicePlatform;
      credential: WebPushCredential;
      label?: string;
      locale?: string;
      app_version?: string;
    }
  | {
      kind: "fcm" | "apns";
      platform: DevicePlatform;
      credential: MobilePushCredential;
      label?: string;
      locale?: string;
      app_version?: string;
    }
  | {
      kind: "telegram_miniapp";
      platform: DevicePlatform;
      /** Nothing to send: the device is a marker. */
      credential: Record<string, never>;
      label?: string;
      locale?: string;
      app_version?: string;
    };

export interface RegisteredDevice {
  id: string;
  kind: DeviceKind;
  platform: DevicePlatform;
  /** VAPID public key (URL-safe base64) for `pushManager.subscribe`;
   *  `null` when push is not set up on this deployment. */
  vapid_public_key: string | null;
}

export interface RegisterWebPushOptions {
  /** A name to show in the user's device list ("Chrome on Mac"). */
  label?: string;
  /** Skip the key lookup when you already hold the deployment's VAPID
   *  public key (from an earlier `register` result, for example). */
  vapidPublicKey?: string;
}

export interface UnregisterWebPushOptions {
  /** The device to delete, from an earlier `registerWebPush` result. When
   *  omitted, every Web Push device registered from this session goes. */
  deviceId?: string;
}

/** Client platform → the platform the device list uses. */
export function devicePlatformOf(platform: ClientPlatform): DevicePlatform {
  return platform === "telegram-miniapp" ? "telegram" : platform;
}

export class DevicesResource {
  constructor(
    private readonly http: HttpClient,
    private readonly client: ResolvedClientDescriptor,
  ) {}

  /** Every device the user has, disabled ones included. */
  async list(): Promise<Device[]> {
    return this.http.get<Device[]>("/me/devices");
  }

  /** Register a device, or refresh it when the same credential is already
   *  known (then `last_seen_at`, `label` and `app_version` update and a
   *  disabled device comes back). `app_version` defaults to the client
   *  version sent in `X-Takeal-Client`.
   *
   *  Errors: 400 `validation`; 409 `push_disabled` for `webpush` when the
   *  deployment has no VAPID keys. */
  async register(input: RegisterDeviceInput): Promise<RegisteredDevice> {
    return this.http.put<RegisteredDevice>("/me/devices", {
      body: { app_version: this.client.version, ...input },
    });
  }

  /** Delete one device. 404 when it isn't the user's. */
  async remove(id: string): Promise<void> {
    await this.http.delete<void>(`/me/devices/${encodeURIComponent(id)}`);
  }

  /** Subscribe this browser to Web Push and register it as a device. Ask
   *  for notification permission before calling. Throws when push isn't
   *  set up on the deployment. */
  async registerWebPush(
    registration: PushCapableRegistration,
    opts: RegisterWebPushOptions = {},
  ): Promise<RegisteredDevice> {
    const key = opts.vapidPublicKey ?? (await this.vapidPublicKey());
    if (!key) {
      throw new Error(
        "@takeal/cusfront-sdk: push notifications are not enabled on this deployment",
      );
    }
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64UrlToBytes(key),
    });
    const json = sub.toJSON();
    if (!json.endpoint || !json.keys?.p256dh || !json.keys.auth) {
      throw new Error("@takeal/cusfront-sdk: the browser returned an incomplete push subscription");
    }
    return this.register({
      kind: "webpush",
      platform: devicePlatformOf(this.client.platform),
      credential: {
        endpoint: json.endpoint,
        keys: { p256dh: json.keys.p256dh, auth: json.keys.auth },
      },
      ...(opts.label ? { label: opts.label } : {}),
    });
  }

  /** Unsubscribe this browser from Web Push and delete the matching device
   *  (see {@link UnregisterWebPushOptions}). Safe when nothing is
   *  registered. */
  async unregisterWebPush(
    registration: PushCapableRegistration,
    opts: UnregisterWebPushOptions = {},
  ): Promise<void> {
    const sub = await registration.pushManager.getSubscription();
    if (sub) await sub.unsubscribe();
    if (opts.deviceId) {
      await this.remove(opts.deviceId);
      return;
    }
    const mine = (await this.list()).filter((d) => d.kind === "webpush" && d.is_current);
    for (const d of mine) await this.remove(d.id);
  }

  private async vapidPublicKey(): Promise<string | null> {
    const { vapid_public_key } = await this.http.get<{ vapid_public_key?: string | null }>(
      "/me/push-subscription",
    );
    return vapid_public_key ?? null;
  }
}
