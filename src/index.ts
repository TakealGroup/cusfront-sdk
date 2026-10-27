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
import { BonusResource } from "./resources/bonus.js";
import { DebtResource } from "./resources/debt.js";
import { CloseRequestsResource } from "./resources/close-requests.js";
import { ClaimsResource } from "./resources/claims.js";
import { CodesResource } from "./resources/codes.js";
import { ReferralResource } from "./resources/referral.js";
import { SubscriptionResource } from "./resources/subscription.js";
import { BrandingResource } from "./resources/branding.js";
import { WalletResource } from "./resources/wallet.js";
import { BlogResource } from "./resources/blog.js";
import { DocumentsResource } from "./resources/documents.js";
import { SubscriptionsResource } from "./resources/subscriptions.js";
import { SessionsResource } from "./resources/sessions.js";
import { PushResource } from "./resources/push.js";
import { MeResource } from "./resources/me.js";
import { NotificationsResource } from "./resources/notifications.js";
import { DevicesResource } from "./resources/devices.js";
import { AttributionResource } from "./resources/attribution.js";
import { HistoryResource } from "./resources/history.js";
import { ConsentsResource } from "./resources/consents.js";
import { ReceiptsResource } from "./resources/receipts.js";
import { SupportResource } from "./resources/support.js";
import { FundingOptionsResource } from "./resources/funding-options.js";
import {
  CLIENT_HEADER,
  clientHeaderValue,
  resolveClientDescriptor,
  type ClientDescriptor,
  type ResolvedClientDescriptor,
} from "./client-platform.js";
import { defaultBrowserStore, inMemoryStore, type TokenStore } from "./token-store.js";
import type { BrandConfig } from "./brand.js";
import { resolveAssetUrl } from "./assets.js";
import { fetchReady, type ReadyInfo } from "./compat.js";

export type { BrandConfig } from "./brand.js";
export { resolveAssetUrl } from "./assets.js";
export { ApiError, NetworkError, isApiError, isNetworkError } from "./error.js";
export { defaultBrowserStore, inMemoryStore, type TokenStore } from "./token-store.js";
export { SDK_VERSION } from "./version.js";
export { SUPPORTED_MEISTER, satisfies } from "./compat.js";
export type { ReadyInfo, ReadyBody } from "./compat.js";
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
  CreateQuoteInput,
  FundingQuote,
  CardLoadStatus,
  IssueCardInput,
  FeeKind,
} from "./resources/deposits.js";
export type {
  DepositTarget,
  FunderMode,
  FundingOption,
  MethodTerms,
} from "./resources/funding-options.js";
export type {
  Card,
  CardType,
  CardStatus,
  CardStatusSource,
  CardForm,
  CloseBlockedReason,
  CardDesignRef,
  CardProduct,
  CardProductPrice,
  CreateCardInput,
  UpdateCardInput,
  CardBalance,
  TopUpTerms,
  TopUpInput,
  CardTopUp,
  CardTopUpStatus,
  TopUpResult,
  RevealCardInput,
  RevealedCard,
  BillingAddress,
  Cardholder,
  SetPinInput,
  TransferInput,
  CardTransfer,
  TransferResult,
  IssuanceBonus,
  CardInTransit,
  CardOrderInput,
  CardOrder,
  CardOrderError,
  CardTariff,
} from "./resources/cards.js";
export type { Debt, DebtAmount, DebtLine, CardFeeKind } from "./resources/debt.js";
export type {
  CloseAmount,
  CloseRefund,
  CloseRequest,
  CloseRequestError,
  CloseRequestStatus,
  PayoutDetailsInput,
  PayoutDetailsShown,
} from "./resources/close-requests.js";
export type {
  Claim,
  ClaimError,
  ClaimKind,
  ClaimPage,
  ClaimStatus,
  ClaimTransaction,
  CreateClaimInput,
} from "./resources/claims.js";
export type { Balance } from "./resources/balance.js";
export type {
  BonusLot,
  BonusMovement,
  BonusPreview,
  BonusPreviewInput,
  BonusPurpose,
  BonusTarget,
  BonusWallet,
} from "./resources/bonus.js";
export type {
  CodeCheck,
  CodeDiscount,
  CodeEffect,
  CodeEffectOutcome,
  CodeOperation,
  CodeRejection,
  CodeResult,
  ValidateCodeInput,
} from "./resources/codes.js";
export type { InvitedFriend, Referral, ReferralReward } from "./resources/referral.js";
export type { UserSubscription } from "./resources/subscription.js";
export type { Branding } from "./resources/branding.js";
export type { Wallet } from "./resources/wallet.js";
export type { BlogPost, BlogBlock, BlogList, BlogListInput } from "./resources/blog.js";
export type {
  Document,
  DocumentBlock,
  DocumentCategory,
  DocumentScope,
  DocumentPathStep,
  DocumentList,
  DocumentListInput,
  DocumentFolder,
  DocumentTree,
  DocumentTreeEntry,
  DocumentVersionSummary,
  DocumentTag,
} from "./resources/documents.js";
export type { Subscriptions, BroadcastChannel } from "./resources/subscriptions.js";
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
  EmailChangeRequested,
  RequestEmailCodeInput,
  EmailCodeSent,
  VerifyEmailCodeInput,
  EmailCodeSession,
} from "./resources/auth.js";
export type { MeResource } from "./resources/me.js";
export type {
  HistoryKind,
  HistoryStatus,
  HistoryAmount,
  HistoryCard,
  HistoryItem,
  HistoryPage,
  ListHistoryParams,
} from "./resources/history.js";
export type {
  ConsentKind,
  ConsentChannel,
  ConsentDocument,
  ConsentOptions,
  ConsentState,
  Consents,
  ConsentsResource,
  CookieChoiceInput,
} from "./resources/consents.js";
export { HOLDER_DATA_CONSENT, DISPUTE_DOCUMENTS_CONSENT } from "./resources/consents.js";
export type {
  Receipt,
  ReceiptKind,
  ReceiptsResource,
  ListReceiptsParams,
} from "./resources/receipts.js";
export type {
  SupportAttachment,
  SupportChannel,
  SupportConversation,
  SupportConversationStatus,
  SupportFile,
  SupportMessage,
  SupportMessageStatus,
  SupportRatingRequest,
  SupportResource,
} from "./resources/support.js";
export { anonymousKey, currentTouch } from "./resources/attribution.js";
export type {
  TouchFields,
  TouchInput,
  TouchResult,
  SignupAttribution,
  SurveyAnswer,
  AttributionStatus,
  AnonymousKeyOptions,
} from "./resources/attribution.js";
export {
  ANALYTICS_EVENTS,
  METRIKA_GOALS,
  NO_CAPTURE_CLASS,
  initAnalytics,
  setAnalyticsZone,
  track,
  page,
  identify,
  resetAnalytics,
  posthogDistinctId,
  sanitizeUrl,
  sanitizeProperties,
} from "./analytics.js";
export type {
  AnalyticsZone,
  AnalyticsEvent,
  AnalyticsProperties,
  AnalyticsOptions,
  PostHogOptions,
  MetrikaOptions,
  PostHogLike,
} from "./analytics.js";
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
  /** Where the remember token of a "remember me" sign-in is kept. Defaults
   *  to `localStorage` under `takeal_remember` in a browser, in memory
   *  elsewhere. Native wrappers should pass secure storage. */
  rememberStore?: TokenStore;
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
  /** Deposits (money IN via a funder connector, to the wallet or straight onto a card): initiate, get, list, refund. */
  readonly deposits: DepositsResource;
  /** The ways to top up: each funding connector, where its top-ups land and the methods it takes. */
  readonly fundingOptions: FundingOptionsResource;
  /** Cards (money OUT via an issuer connector): the product catalog, create, get, list, update, balance. */
  readonly cards: CardsResource;
  /** Wallet balance lookup (defaults to the wallet's own currency). */
  readonly balance: BalanceResource;
  /** Bonuses: a discount on the platform's services. Balance, credits, history and a price preview. */
  readonly bonus: BonusResource;
  /** Card fees the user's cards could not cover: paid first from the next top-up. */
  readonly debt: DebtResource;
  /** Close a card that still holds money: the rest goes back the way it was paid. */
  readonly closeRequests: CloseRequestsResource;
  /** Dispute a card operation or complain, and follow claims (lost and stolen cards included) by number and status. */
  readonly claims: ClaimsResource;
  /** Promo and referral codes: check what a code would do before using it. */
  readonly codes: CodesResource;
  /** For referrers: the referral code, the link to share, invited friends and rewards. */
  readonly referral: ReferralResource;
  /** The user's own subscription tier or gift, and a promo code for its monthly fee. */
  readonly subscription: SubscriptionResource;
  /** The wallet's currency: read it, switch it while the wallet is empty. */
  readonly wallet: WalletResource;
  /** Runtime white-label config (`GET /branding`, public): names, logo, wallet label. */
  readonly branding: BrandingResource;
  /** Documents: blog posts, the knowledge base, legal pages. Public before sign-in, more once signed in. */
  readonly documents: DocumentsResource;
  /** Public blog posts, returned as structured blocks to render in your own style.
   *  @deprecated Use `documents.list({ category: "blog" })` and `documents.get(slug)`; the blog is a category of Documents now. The old paths answer for one more release. */
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
  /** Where users come from: record visits, ask "how did you hear about us". */
  readonly attribution: AttributionResource;
  /** Everything that happened to the user's money in one list, or one card's part of it. */
  readonly history: HistoryResource;
  /** What the user agreed to; give or withdraw the optional consents. */
  readonly consents: ConsentsResource;
  /** A numbered receipt for every payment. */
  readonly receipts: ReceiptsResource;
  /** The chat with support: messages, files, the conversation's status. */
  readonly support: SupportResource;
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
  /**
   * Ask the deployment whether it is up and which platform version it runs
   * (`GET /ready`, public). `compatible` is false, with a `warning`, when the
   * version is outside `SUPPORTED_MEISTER` or the platform didn't report one.
   * A degraded platform (503) answers with `healthy: false`, not an error.
   */
  ready(opts?: { signal?: AbortSignal }): Promise<ReadyInfo>;
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
  const remembered = opts.rememberStore ?? pickDefaultStore("takeal_remember");
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
    ready: (o?: { signal?: AbortSignal }) => fetchReady(http, o),
    auth: new AuthResource(http, tokens, remembered),
    deposits: new DepositsResource(http),
    fundingOptions: new FundingOptionsResource(http),
    cards: new CardsResource(http),
    balance: new BalanceResource(http),
    bonus: new BonusResource(http),
    debt: new DebtResource(http),
    closeRequests: new CloseRequestsResource(http),
    claims: new ClaimsResource(http),
    codes: new CodesResource(http),
    referral: new ReferralResource(http),
    subscription: new SubscriptionResource(http),
    wallet: new WalletResource(http),
    branding: new BrandingResource(http),
    documents: new DocumentsResource(http),
    blog: new BlogResource(http),
    subscriptions: new SubscriptionsResource(http),
    sessions: new SessionsResource(http),
    push: new PushResource(http),
    me: new MeResource(http),
    notifications: new NotificationsResource(http),
    devices: new DevicesResource(http, client),
    attribution: new AttributionResource(http),
    history: new HistoryResource(http),
    consents: new ConsentsResource(http),
    receipts: new ReceiptsResource(http),
    support: new SupportResource(http),
  };
}

function pickDefaultStore(key?: string): TokenStore {
  if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
    return defaultBrowserStore(key);
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
