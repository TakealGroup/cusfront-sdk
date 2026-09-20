/**
 * `@takeal/cusfront-sdk` — typed client for the Takeal end-user API.
 *
 * Entry point: `createClient({ baseUrl, brand?, client?, tokenStore?, fetch? })`.
 * Resources are accessed off the returned client (`client.auth.login`,
 * `client.cards.list`, …). Sub-exports under `@takeal/cusfront-sdk/<resource>`
 * publish each resource independently so a Cusfront only pulls what
 * it imports.
 *
 * Brand-neutral by design. No customer / deployment names embedded.
 * Brand swap happens at runtime via `BrandConfig`.
 */

import { HttpClient, type FetchLike } from "./http.js";
import { AuthResource } from "./resources/auth.js";
import { DepositsResource } from "./resources/deposits.js";
import { CardsResource } from "./resources/cards.js";
import { BalanceResource } from "./resources/balance.js";
import { BrandingResource } from "./resources/branding.js";
import { WalletResource } from "./resources/wallet.js";
import { BlogResource } from "./resources/blog.js";
import { SubscriptionsResource } from "./resources/subscriptions.js";
import { SessionsResource } from "./resources/sessions.js";
import { PushResource } from "./resources/push.js";
import { MeResource } from "./resources/me.js";
import { NotificationsResource } from "./resources/notifications.js";
import { DevicesResource } from "./resources/devices.js";
import {
  CLIENT_HEADER,
  clientHeaderValue,
  resolveClientDescriptor,
  type ClientDescriptor,
  type ResolvedClientDescriptor,
} from "./client-platform.js";
import {
  defaultBrowserStore,
  inMemoryStore,
  type TokenStore,
} from "./token-store.js";
import type { BrandConfig } from "./brand.js";
import { resolveAssetUrl } from "./assets.js";

export type { BrandConfig } from "./brand.js";
export { resolveAssetUrl } from "./assets.js";
export { ApiError, NetworkError, isApiError, isNetworkError } from "./error.js";
export { defaultBrowserStore, inMemoryStore, type TokenStore } from "./token-store.js";
export { SDK_VERSION } from "./version.js";
export {
  CLIENT_HEADER,
  detectClientPlatform,
  type ClientDescriptor,
  type ClientPlatform,
  type ResolvedClientDescriptor,
} from "./client-platform.js";

// Re-export resource types so consumers can `import { Deposit } from
// "@takeal/cusfront-sdk"` without reaching into sub-paths.
export type { Address, CustomerInfo } from "./types/customer.js";
export type {
  Deposit,
  DepositStatus,
  DepositMethod,
  InitiateDepositInput,
  CreateDepositRefundInput,
  Refund,
  CreateQuoteInput, FundingQuote } from "./resources/deposits.js";
export type {
  Card,
  CardType,
  CardStatus,
  CardDesignRef,
  CardProduct,
  CardProductPrice,
  CreateCardInput,
  UpdateCardInput,
  CardBalance,
  TopUpTerms,
  TopUpInput,
  CardTopUp,
  TopUpResult,
  RevealCardInput,
  RevealedCard,
} from "./resources/cards.js";
export type { Balance } from "./resources/balance.js";
export type { Branding } from "./resources/branding.js";
export type { Wallet } from "./resources/wallet.js";
export type { BlogPost, BlogBlock, BlogList, BlogListInput } from "./resources/blog.js";
export type {
  Subscriptions,
  BroadcastChannel,
} from "./resources/subscriptions.js";
export type {
  User,
  LoginInput,
  LoginResponse,
  JwtIssued,
  TotpRequired,
  TotpSetupRequired,
  OtpSentResponse,
  RegisterInput,
  Session,
  TotpSetupComplete,
  ChangePasswordInput,
  TelegramLink,
  TelegramUnknown,
  ExchangeTelegramInput,
  LinkTelegramInput,
} from "./resources/auth.js";
export type { MeResource } from "./resources/me.js";
export type { UserSession } from "./resources/sessions.js";
export type {
  PushStatus,
  PushSubscriptionInput,
  PushCapableRegistration,
} from "./resources/push.js";
export { isCardOtp } from "./resources/notifications.js";
export type {
  NotificationCategory,
  NotificationChannel,
  NotificationLocale,
  InboxItem,
  CardOtpData,
  NotificationPage,
  ListNotificationsParams,
  NotificationCategoryPreferences,
  NotificationPreferences,
  NotificationPreferencesInput,
} from "./resources/notifications.js";
export type {
  DeviceKind,
  DevicePlatform,
  Device,
  WebPushCredential,
  MobilePushCredential,
  RegisterDeviceInput,
  RegisteredDevice,
  RegisterWebPushOptions,
  UnregisterWebPushOptions,
} from "./resources/devices.js";

export interface CreateClientOptions {
  /** Absolute origin of the Takeal API deployment, no trailing slash.
   *  e.g. `"https://api.takeal.example.com"`. */
  baseUrl: string;
  /** Runtime brand config. Optional; consumer renders its own brand
   *  if omitted. */
  brand?: BrandConfig;
  /** What kind of app this is, sent on every request as
   *  `X-Takeal-Client: <platform>; <version>`. The server uses it to spot
   *  a sign-in from a new device and to pick the notification channel.
   *  `platform` is detected at runtime when omitted (`telegram-miniapp`
   *  inside Telegram, `pwa` when installed, `web` otherwise); `version`
   *  defaults to the SDK version. Native wrappers should pass
   *  `{ platform: "ios" | "android", version }`. */
  client?: ClientDescriptor;
  /** Token persistence. Defaults to `defaultBrowserStore()` when
   *  `window.localStorage` is present, else `inMemoryStore()`. */
  tokenStore?: TokenStore;
  /** Override the `fetch` implementation — useful for Node < 18,
   *  React Native < 0.74, MSW intercept layers, etc. */
  fetch?: FetchLike;
  /** When true, the SDK runs every response through a zod schema
   *  before handing it to the caller. Requires `zod` >= 3.22 as a
   *  peer dep. Off by default; types-only validation is sufficient
   *  for the steady-state case. */
  validate?: boolean;
}

export interface CusfrontClient {
  /** Read-only brand config — pass through from createClient args. */
  readonly brand: BrandConfig | undefined;
  /** The platform and version this client announces in `X-Takeal-Client`. */
  readonly client: ResolvedClientDescriptor;
  /** Auth resource: login, refresh, current user, logout. */
  readonly auth: AuthResource;
  /** Deposits (money IN via a funder connector): initiate, get, list, refund. */
  readonly deposits: DepositsResource;
  /** Cards (money OUT via an issuer connector): the product catalog, create, get, list, update, balance. */
  readonly cards: CardsResource;
  /** Wallet balance lookup (defaults to the wallet's own currency). */
  readonly balance: BalanceResource;
  /** The wallet's currency: read it, switch it while the wallet is empty. */
  readonly wallet: WalletResource;
  /** Runtime white-label config (`GET /branding`, public): names, logo, wallet label. */
  readonly branding: BrandingResource;
  /** Public blog posts, returned as structured blocks to render in your own style. */
  readonly blog: BlogResource;
  /** The user's announcement channel subscriptions.
   *  @deprecated Use `notifications.setPreferences({ categories: { marketing: {...} } })`. */
  readonly subscriptions: SubscriptionsResource;
  /** Where the user is signed in: list sessions, sign one or all others out. */
  readonly sessions: SessionsResource;
  /** Web Push subscription for the signed-in user.
   *  @deprecated Use `devices.registerWebPush` / `devices.unregisterWebPush`. */
  readonly push: PushResource;
  /** The user's inbox and notification preferences. */
  readonly notifications: NotificationsResource;
  /** The user's devices: browsers with Web Push, phones, the Telegram Mini App. */
  readonly devices: DevicesResource;
  /** Profile actions for the signed-in user: link or unlink Telegram. */
  readonly me: MeResource;
  /** Direct access to the token store (e.g. for an explicit sign-out
   *  on Capacitor's lifecycle "app pausing" event). */
  readonly tokens: TokenStore;
  /**
   * Turn an image URL from the API (`card.design.image_url`,
   * `product.design.image_url`) into one a browser can load. Absolute URLs
   * pass through; a path relative to the API origin (the default card
   * design, `/card-designs/default.svg`) is joined onto `baseUrl`.
   */
  assetUrl(url: string): string;
}

/**
 * Build a new client. Stateless across calls — multiple clients can
 * coexist (e.g. an admin Cusfront with a different baseUrl than the
 * end-user one). Each gets its own `TokenStore`.
 *
 * `validate: true` is honoured by individual resources that ship
 * matching zod schemas; resources without a schema ignore it.
 */
export function createClient(opts: CreateClientOptions): CusfrontClient {
  const tokens = opts.tokenStore ?? pickDefaultStore();
  const fetchImpl = opts.fetch ?? defaultFetch();
  const client = resolveClientDescriptor(opts.client);
  const http = new HttpClient(opts.baseUrl, tokens, fetchImpl, {
    [CLIENT_HEADER]: clientHeaderValue(client),
  });

  return {
    brand: opts.brand,
    client,
    tokens,
    assetUrl: (url: string) => resolveAssetUrl(opts.baseUrl, url),
    auth: new AuthResource(http, tokens),
    deposits: new DepositsResource(http),
    cards: new CardsResource(http),
    balance: new BalanceResource(http),
    wallet: new WalletResource(http),
    branding: new BrandingResource(http),
    blog: new BlogResource(http),
    subscriptions: new SubscriptionsResource(http),
    sessions: new SessionsResource(http),
    push: new PushResource(http),
    me: new MeResource(http),
    notifications: new NotificationsResource(http),
    devices: new DevicesResource(http, client),
  };
}

function pickDefaultStore(): TokenStore {
  if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
    return defaultBrowserStore();
  }
  return inMemoryStore();
}

function defaultFetch(): FetchLike {
  if (typeof globalThis !== "undefined" && typeof globalThis.fetch === "function") {
    // Bind to globalThis so `this` is correct inside the implementation
    // (some polyfills choke on a detached reference).
    return globalThis.fetch.bind(globalThis);
  }
  throw new Error(
    "@takeal/cusfront-sdk: native fetch is not available in this runtime. " +
      "Pass a polyfill via createClient({ fetch }).",
  );
}
