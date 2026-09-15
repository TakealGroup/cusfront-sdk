import { describe, expect, it } from "vitest";
import { HttpClient, type FetchLike } from "../http.js";
import { inMemoryStore } from "../token-store.js";
import { DepositsResource, type Deposit, type Refund } from "./deposits.js";
import { CardsResource, type Card, type CardBalance, type CardProduct } from "./cards.js";
import { BalanceResource, type Balance } from "./balance.js";
import { BrandingResource, type Branding } from "./branding.js";
import { BlogResource } from "./blog.js";
import { SubscriptionsResource } from "./subscriptions.js";
import { AuthResource, type JwtIssued, type User } from "./auth.js";
import { SessionsResource } from "./sessions.js";
import { PushResource, base64UrlToBytes } from "./push.js";
import { MeResource } from "./me.js";
import { NotificationsResource, type InboxItem, type NotificationPreferences } from "./notifications.js";
import { DevicesResource, devicePlatformOf, type Device } from "./devices.js";
import { isApiError, type ApiError } from "../error.js";

/**
 * Resource-level wire-shape tests. A captured fake `fetch` asserts the SDK
 * issues the right method + path + body + headers against the Takeal API `/me/*`
 * surface, and that the typed response flows back unchanged. No live backend.
 */

interface Captured {
  url: string;
  init: RequestInit;
}

function rig(responseBody: unknown, status = 200) {
  const captured: Captured[] = [];
  const fake: FetchLike = async (url, init) => {
    captured.push({ url: String(url), init: init ?? {} });
    return new Response(JSON.stringify(responseBody), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  };
  const http = new HttpClient("https://api.test", inMemoryStore(), fake);
  return { captured, http };
}

function headersOf(c: Captured): Record<string, string> {
  return (c.init.headers ?? {}) as Record<string, string>;
}

function bodyOf(c: Captured): unknown {
  return c.init.body ? JSON.parse(c.init.body as string) : undefined;
}

const DEPOSIT: Deposit = {
  id: "dep_1",
  user_id: "usr_1",
  connector_slug: "indigo-mock",
  provider_reference: null,
  status: "redirect_required",
  amount: "100.00",
  currency: "USD",
  method: "card",
  redirect_url: "https://psp.test/3ds",
  failure_reason: null,
  confirmed_amount: null,
  confirmed_at: null,
  created_at: "2026-06-21T00:00:00Z",
  updated_at: "2026-06-21T00:00:00Z",
};

describe("DepositsResource", () => {
  it("initiate POSTs /me/deposits with body + Idempotency-Key, strips the key from the body", async () => {
    const { captured, http } = rig(DEPOSIT, 201);
    const deposits = new DepositsResource(http);

    const out = await deposits.initiate({
      amount: "100.00",
      currency: "USD",
      method: "card",
      funder_slug: "indigo-mock",
      idempotencyKey: "idem-1",
    });

    expect(out).toEqual(DEPOSIT);
    expect(captured).toHaveLength(1);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/deposits");
    expect(captured[0]!.init.method).toBe("POST");
    expect(headersOf(captured[0]!)["Idempotency-Key"]).toBe("idem-1");
    // The transport-only `idempotencyKey` must NOT leak into the JSON body.
    expect(bodyOf(captured[0]!)).toEqual({
      amount: "100.00",
      currency: "USD",
      method: "card",
      funder_slug: "indigo-mock",
    });
  });

  it("get / list hit the right paths", async () => {
    const { captured, http } = rig(DEPOSIT);
    const deposits = new DepositsResource(http);
    await deposits.get("dep 1/with?chars");
    expect(captured[0]!.url).toBe(
      "https://api.test/v1/me/deposits/dep%201%2Fwith%3Fchars",
    );
    expect(captured[0]!.init.method).toBe("GET");

    const { captured: c2, http: h2 } = rig([DEPOSIT]);
    await new DepositsResource(h2).list();
    expect(c2[0]!.url).toBe("https://api.test/v1/me/deposits");
  });

  it("refund POSTs /me/deposits/{id}/refunds", async () => {
    const refund: Refund = {
      id: "rf_1",
      target_type: "deposit",
      deposit_id: "dep_1",
      connector_slug: "indigo-mock",
      amount: "50.00",
      currency: "USD",
      reason: "customer_request",
      status: "succeeded",
      requestor_type: "user",
      requestor_id: "usr_1",
      created_at: "2026-06-21T00:00:00Z",
      updated_at: "2026-06-21T00:00:00Z",
    };
    const { captured, http } = rig(refund, 201);
    const out = await new DepositsResource(http).refund("dep_1", {
      amount: "50.00",
      reason: "customer_request",
      idempotencyKey: "idem-rf",
    });
    expect(out).toEqual(refund);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/deposits/dep_1/refunds");
    expect(headersOf(captured[0]!)["Idempotency-Key"]).toBe("idem-rf");
    expect(bodyOf(captured[0]!)).toEqual({
      amount: "50.00",
      reason: "customer_request",
    });
  });
});

const CARD: Card = {
  id: "card_1",
  user_id: "usr_1",
  card_type: "prepaid",
  connector_slug: "spool-mock",
  provider_reference: "prov_1",
  status: "active",
  last4: "4242",
  expiry_month: 6,
  expiry_year: 2028,
  initial_amount: "50.00",
  currency: "USD",
  failure_reason: null,
  name: "Groceries",
  design: { id: null, image_url: "/card-designs/default.svg" },
  product: { id: "prod_1", name: "Virtual Mastercard USD" },
  created_at: "2026-06-21T00:00:00Z",
  updated_at: "2026-06-21T00:00:00Z",
};

const PRODUCT: CardProduct = {
  id: "prod_1",
  name: "Virtual Mastercard USD",
  description: "For subscriptions and online purchases.",
  card_type: "prepaid",
  currency: "USD",
  features: { scheme: "mastercard", apple_pay: true },
  design: { id: null, name: "Default", image_url: "/card-designs/default.svg" },
  designs: [
    { id: "dsg_1", name: "Midnight", image_url: "https://api.test/assets/midnight.png" },
  ],
  price: {
    amount: "4.50",
    currency: "USD",
    label: "Card issuance",
    base_amount: "5.00",
    discount_bps: 1000,
  },
  is_default: true,
};

describe("CardsResource", () => {
  it("create POSTs /me/cards with body + Idempotency-Key", async () => {
    const { captured, http } = rig(CARD, 201);
    const out = await new CardsResource(http).create({
      type: "prepaid",
      initial_amount: "50.00",
      currency: "USD",
      idempotencyKey: "idem-card",
    });
    expect(out).toEqual(CARD);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards");
    expect(captured[0]!.init.method).toBe("POST");
    expect(headersOf(captured[0]!)["Idempotency-Key"]).toBe("idem-card");
    expect(bodyOf(captured[0]!)).toEqual({
      type: "prepaid",
      initial_amount: "50.00",
      currency: "USD",
    });
  });

  it("create maps productId / name / designId to snake_case and keeps the key in the header", async () => {
    const { captured, http } = rig(CARD, 201);
    await new CardsResource(http).create({
      productId: "prod_1",
      name: "Groceries",
      designId: "dsg_1",
      initial_amount: "50.00",
      currency: "USD",
      idempotencyKey: "idem-card-2",
    });
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards");
    expect(headersOf(captured[0]!)["Idempotency-Key"]).toBe("idem-card-2");
    expect(bodyOf(captured[0]!)).toEqual({
      product_id: "prod_1",
      name: "Groceries",
      design_id: "dsg_1",
      initial_amount: "50.00",
      currency: "USD",
    });
  });

  it("create sends design_id: null explicitly and omits unset optionals", async () => {
    const { captured, http } = rig(CARD, 201);
    await new CardsResource(http).create({
      productId: "prod_1",
      designId: null,
      currency: "USD",
      idempotencyKey: "idem-card-3",
    });
    expect(bodyOf(captured[0]!)).toEqual({
      product_id: "prod_1",
      design_id: null,
      currency: "USD",
    });
  });

  it("listProducts / getProduct GET /me/card-products[/{id}]", async () => {
    const { captured, http } = rig([PRODUCT]);
    const list = await new CardsResource(http).listProducts();
    expect(list).toEqual([PRODUCT]);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/card-products");
    expect(captured[0]!.init.method).toBe("GET");

    const { captured: c2, http: h2 } = rig(PRODUCT);
    const one = await new CardsResource(h2).getProduct("prod 1");
    expect(one).toEqual(PRODUCT);
    expect(c2[0]!.url).toBe("https://api.test/v1/me/card-products/prod%201");
  });

  it("update PATCHes /me/cards/{id} with only the given fields, snake_cased", async () => {
    const { captured, http } = rig({ ...CARD, name: "Coffee" });
    const out = await new CardsResource(http).update("card_1", { name: "Coffee" });
    expect(out.name).toBe("Coffee");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards/card_1");
    expect(captured[0]!.init.method).toBe("PATCH");
    expect(bodyOf(captured[0]!)).toEqual({ name: "Coffee" });

    const { captured: c2, http: h2 } = rig(CARD);
    await new CardsResource(h2).update("card_1", { designId: null });
    expect(bodyOf(c2[0]!)).toEqual({ design_id: null });

    const { captured: c3, http: h3 } = rig(CARD);
    await new CardsResource(h3).update("card_1", { name: "Coffee", designId: "dsg_1" });
    expect(bodyOf(c3[0]!)).toEqual({ name: "Coffee", design_id: "dsg_1" });
  });

  it("get / list hit the right paths", async () => {
    const { captured, http } = rig(CARD);
    await new CardsResource(http).get("card_1");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards/card_1");

    const { captured: c2, http: h2 } = rig([CARD]);
    await new CardsResource(h2).list();
    expect(c2[0]!.url).toBe("https://api.test/v1/me/cards");
  });

  it("balance GETs /me/cards/{id}/balance with the currency query", async () => {
    const bal: CardBalance = { amount: "12.34", currency: "USD" };
    const { captured, http } = rig(bal);
    const out = await new CardsResource(http).balance("card_1", "USD");
    expect(out).toEqual(bal);
    expect(captured[0]!.url).toBe(
      "https://api.test/v1/me/cards/card_1/balance?currency=USD",
    );
  });

  it("exposes ownership-gated lifecycle methods", async () => {
    const { captured, http } = rig(CARD);
    const cards = new CardsResource(http);
    expect(typeof cards.freeze).toBe("function");
    expect(typeof cards.unfreeze).toBe("function");
    expect(typeof cards.terminate).toBe("function");

    await cards.freeze("card_1", "lost");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards/card_1/freeze");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({ reason: "lost" });
  });

  it("reveal POSTs /me/cards/{id}/reveal with the re-auth body", async () => {
    const revealed = {
      pan: "4111111111111111",
      cvv: "123",
      expiry_month: 6,
      expiry_year: 2028,
      holder_name: "Alice Tester",
      expires_in_seconds: 30,
    };
    const { captured, http } = rig(revealed);
    const out = await new CardsResource(http).reveal("card_1", {
      password: "pw",
      totpCode: "123456",
    });
    expect(out).toEqual(revealed);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards/card_1/reveal");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({ password: "pw", totp_code: "123456" });
  });
});

describe("BalanceResource", () => {
  it("get GETs /me/balance with the currency query", async () => {
    const bal: Balance = { amount: "999.00", currency: "EUR" };
    const { captured, http } = rig(bal);
    const out = await new BalanceResource(http).get("EUR");
    expect(out).toEqual(bal);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/balance?currency=EUR");
    expect(captured[0]!.init.method).toBe("GET");
  });
});

describe("DepositsResource (fx quotes)", () => {
  it("quote POSTs /me/deposits/quotes and initiate carries quote_id", async () => {
    const q = {
      id: "q1", source_amount: "5000", source_currency: "RUB",
      credited_amount: "57.97", credited_currency: "USD",
      rate: "0.011832", spread_bps: 200, provider: "manual",
      expires_at: "2026-08-24T00:02:00Z",
    };
    const { captured, http } = rig(q);
    const out = await new DepositsResource(http).quote({ amount: "5000", currency: "RUB" });
    expect(out).toEqual(q);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/deposits/quotes");
    expect(bodyOf(captured[0]!)).toEqual({ amount: "5000", currency: "RUB" });

    const dep = { id: "d1" } as unknown as Deposit;
    const rig2 = rig(dep);
    await new DepositsResource(rig2.http).initiate({
      amount: "5000", currency: "RUB", method: "card",
      idempotencyKey: "k1", quote_id: "q1",
    });
    expect(bodyOf(rig2.captured[0]!)).toEqual({
      amount: "5000", currency: "RUB", method: "card", quote_id: "q1",
    });
  });
});

describe("BlogResource", () => {
  it("list is public and passes paging + filters", async () => {
    const page = { posts: [], total: 0, page: 2, per_page: 5 };
    const { captured, http } = rig(page);
    const out = await new BlogResource(http).list({ page: 2, perPage: 5, tag: "news" });
    expect(out).toEqual(page);
    expect(captured[0]!.url).toBe("https://api.test/v1/blog/posts?page=2&per_page=5&tag=news");
    expect(new Headers(captured[0]!.init.headers).get("authorization")).toBeNull();
  });

  it("get returns the structured body", async () => {
    const post = {
      slug: "wallet-2-0",
      title: "Wallet 2.0",
      excerpt: "What changed",
      body_markdown: "# H\n\ntext",
      body_blocks: [
        { type: "heading", level: 1, text: "H" },
        { type: "paragraph", text: "text" },
      ],
      tags: [],
      reading_minutes: 1,
      published_at: null,
      updated_at: "2026-08-25T00:00:00Z",
    };
    const { captured, http } = rig(post);
    const out = await new BlogResource(http).get("wallet-2-0");
    expect(out.body_blocks[0]).toEqual({ type: "heading", level: 1, text: "H" });
    expect(captured[0]!.url).toBe("https://api.test/v1/blog/posts/wallet-2-0");
  });

  it("imageUrl absolutises API paths and leaves absolute URLs alone", () => {
    const r = new BlogResource(rig({}).http);
    expect(r.imageUrl("https://api.test/", "/v1/blog/images/x")).toBe(
      "https://api.test/v1/blog/images/x",
    );
    expect(r.imageUrl("https://api.test", "https://cdn/x.png")).toBe("https://cdn/x.png");
  });
});

describe("SubscriptionsResource", () => {
  it("set PUTs the whole channel set", async () => {
    const body = { channels: ["email"], available: ["email", "telegram"] };
    const { captured, http } = rig(body);
    const out = await new SubscriptionsResource(http).set(["email"]);
    expect(out).toEqual(body);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/subscriptions");
    expect(captured[0]!.init.method).toBe("PUT");
    expect(bodyOf(captured[0]!)).toEqual({ channels: ["email"] });
  });
});

describe("BrandingResource", () => {
  it("get GETs /branding without an Authorization header", async () => {
    const brand: Branding = {
      platform_name: "Acme",
      merchant_portal_name: "Acme Partners",
      logo_url: "",
      favicon_url: "",
      primary_color: "",
      secondary_color: "",
      accent_color: "",
      wallet_label: "Acme Wallet",
    };
    const { captured, http } = rig(brand);
    const out = await new BrandingResource(http).get();
    expect(out).toEqual(brand);
    expect(captured[0]!.url).toBe("https://api.test/branding");
    expect(captured[0]!.init.method).toBe("GET");
    const headers = new Headers(captured[0]!.init.headers);
    expect(headers.get("authorization")).toBeNull();
  });
});

describe("AuthResource (telegram + email)", () => {
  const TG_SESSION: JwtIssued = {
    stage: "jwt",
    access_token: "jwt-tg",
    expires_at: "2026-06-24T00:00:00Z",
    user: {
      id: "usr_tg",
      email: "tg-777000@telegram.local",
      role: "user",
      is_active: true,
      email_pending: true,
      created_at: "2026-06-23T00:00:00Z",
      updated_at: "2026-06-23T00:00:00Z",
    },
    hub_access: false,
  };

  it("exchangeTelegram POSTs /auth/telegram/exchange unauthenticated + stores the JWT", async () => {
    const { captured, http } = rig(TG_SESSION);
    const store = inMemoryStore();
    const out = await new AuthResource(http, store).exchangeTelegram({
      initData: "user=%7B%22id%22%3A777000%7D&auth_date=1700000000&hash=abc",
    });
    expect(out.user.email_pending).toBe(true);
    expect(captured[0]!.url).toBe("https://api.test/v1/auth/telegram/exchange");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({
      init_data: "user=%7B%22id%22%3A777000%7D&auth_date=1700000000&hash=abc",
    });
    expect(headersOf(captured[0]!)["Authorization"]).toBeUndefined();
    expect(await store.get()).toBe("jwt-tg");
  });

  it("linkEmail POSTs /me/email and returns the updated user", async () => {
    const updated: User = {
      id: "usr_tg",
      email: "alice@example.com",
      role: "user",
      is_active: true,
      email_pending: false,
      created_at: "2026-06-23T00:00:00Z",
      updated_at: "2026-06-23T00:01:00Z",
    };
    const { captured, http } = rig(updated);
    const out = await new AuthResource(http, inMemoryStore()).linkEmail({
      email: "alice@example.com",
    });
    expect(out.email_pending).toBe(false);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/email");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({ email: "alice@example.com" });
  });
});

describe("AuthResource (telegram link)", () => {
  const INIT_DATA = "user=%7B%22id%22%3A777000%7D&auth_date=1700000000&hash=abc";
  const LINKED: JwtIssued = {
    stage: "jwt",
    access_token: "jwt-linked",
    expires_at: "2026-06-24T00:00:00Z",
    user: {
      id: "usr_email",
      email: "alice@example.com",
      role: "user",
      is_active: true,
      email_pending: false,
      created_at: "2026-06-23T00:00:00Z",
      updated_at: "2026-06-23T00:00:00Z",
      wallet_currency: "USD",
      telegram: { username: "alice_tg", linked_at: "2026-06-23T00:05:00Z" },
    },
    hub_access: false,
  };

  it("exchangeTelegram with provision:false sends the flag and maps 404 telegram_unknown to {stage:'unknown'}", async () => {
    const { captured, http } = rig(
      { code: "telegram_unknown", message: "no account for this Telegram" },
      404,
    );
    const store = inMemoryStore();
    const out = await new AuthResource(http, store).exchangeTelegram({
      initData: INIT_DATA,
      provision: false,
    });
    expect(out).toEqual({ stage: "unknown" });
    expect(bodyOf(captured[0]!)).toEqual({ init_data: INIT_DATA, provision: false });
    expect(headersOf(captured[0]!)["Authorization"]).toBeUndefined();
    // Nothing was stored: the client stays signed out.
    expect(await store.get()).toBeNull();
  });

  it("exchangeTelegram with provision:false still signs in a known Telegram", async () => {
    const { captured, http } = rig(LINKED);
    const store = inMemoryStore();
    const out = await new AuthResource(http, store).exchangeTelegram({
      initData: INIT_DATA,
      provision: false,
    });
    expect(out.stage).toBe("jwt");
    if (out.stage !== "jwt") throw new Error("unreachable");
    expect(out.user.telegram?.username).toBe("alice_tg");
    expect(bodyOf(captured[0]!)).toEqual({ init_data: INIT_DATA, provision: false });
    expect(await store.get()).toBe("jwt-linked");
  });

  it("exchangeTelegram rethrows every other error as ApiError", async () => {
    for (const [status, code] of [
      [401, "invalid_init_data"],
      [404, "not_found"],
      [503, "telegram_not_configured"],
    ] as const) {
      const { http } = rig({ code, message: "nope" }, status);
      const err = await new AuthResource(http, inMemoryStore())
        .exchangeTelegram({ initData: INIT_DATA, provision: false })
        .then(() => null)
        .catch((e: unknown) => e);
      expect(isApiError(err), `${status} ${code} should throw`).toBe(true);
      expect((err as ApiError).status).toBe(status);
      expect((err as ApiError).code).toBe(code);
    }
  });

  it("linkTelegram POSTs /auth/telegram/link unauthenticated with init_data + credentials and stores the JWT", async () => {
    const { captured, http } = rig(LINKED);
    const store = inMemoryStore();
    const out = await new AuthResource(http, store).linkTelegram({
      initData: INIT_DATA,
      email: "alice@example.com",
      password: "hunter22supersecret",
    });
    expect(out.stage).toBe("jwt");
    expect(out.user.id).toBe("usr_email");
    expect(out.user.telegram).toEqual({ username: "alice_tg", linked_at: "2026-06-23T00:05:00Z" });
    expect(captured[0]!.url).toBe("https://api.test/v1/auth/telegram/link");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({
      init_data: INIT_DATA,
      email: "alice@example.com",
      password: "hunter22supersecret",
    });
    expect(headersOf(captured[0]!)["Authorization"]).toBeUndefined();
    expect(await store.get()).toBe("jwt-linked");
  });

  it("linkTelegram surfaces 409 telegram_in_use as ApiError", async () => {
    const { http } = rig({ code: "telegram_in_use", message: "taken" }, 409);
    const err = await new AuthResource(http, inMemoryStore())
      .linkTelegram({ initData: INIT_DATA, email: "a@b.c", password: "x" })
      .then(() => null)
      .catch((e: unknown) => e);
    expect(isApiError(err)).toBe(true);
    expect((err as ApiError).code).toBe("telegram_in_use");
  });
});

describe("MeResource", () => {
  const USER: User = {
    id: "usr_email",
    email: "alice@example.com",
    role: "user",
    is_active: true,
    created_at: "2026-06-23T00:00:00Z",
    updated_at: "2026-06-23T00:00:00Z",
    telegram: { username: null, linked_at: "2026-06-23T00:05:00Z" },
  };

  it("linkTelegram POSTs /me/telegram with {init_data}", async () => {
    const { captured, http } = rig(USER);
    const out = await new MeResource(http).linkTelegram("auth_date=1&hash=abc");
    expect(out.telegram?.linked_at).toBe("2026-06-23T00:05:00Z");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/telegram");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({ init_data: "auth_date=1&hash=abc" });
  });

  it("unlinkTelegram DELETEs /me/telegram and returns the user", async () => {
    const { captured, http } = rig({ ...USER, telegram: null });
    const out = await new MeResource(http).unlinkTelegram();
    expect(out.telegram).toBeNull();
    expect(captured[0]!.url).toBe("https://api.test/v1/me/telegram");
    expect(captured[0]!.init.method).toBe("DELETE");
    expect(captured[0]!.init.body).toBeUndefined();
  });

  it("unlinkTelegram surfaces 409 last_credential", async () => {
    const { http } = rig({ code: "last_credential", message: "no password" }, 409);
    const err = await new MeResource(http).unlinkTelegram().then(() => null).catch((e: unknown) => e);
    expect(isApiError(err)).toBe(true);
    expect((err as ApiError).status).toBe(409);
    expect((err as ApiError).code).toBe("last_credential");
  });
});

describe("AuthResource (register, totp setup, password)", () => {
  const { stage: _stage, ...SESSION } = {
    stage: "jwt",
    access_token: "jwt-new",
    expires_at: "2026-09-14T00:00:00Z",
    user: {
      id: "usr_new",
      email: "bob@example.com",
      role: "user",
      is_active: true,
      created_at: "2026-09-13T00:00:00Z",
      updated_at: "2026-09-13T00:00:00Z",
    },
    hub_access: false,
  };

  it("register POSTs /auth/register unauthenticated + stores the JWT", async () => {
    const { captured, http } = rig(SESSION);
    const store = inMemoryStore();
    const out = await new AuthResource(http, store).register({
      email: "bob@example.com",
      password: "Correct-Horse-9",
      wallet_currency: "EUR",
    });
    expect(out.user.id).toBe("usr_new");
    expect(captured[0]!.url).toBe("https://api.test/v1/auth/register");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({
      email: "bob@example.com",
      password: "Correct-Horse-9",
      wallet_currency: "EUR",
    });
    expect(headersOf(captured[0]!)["Authorization"]).toBeUndefined();
    expect(await store.get()).toBe("jwt-new");
  });

  it("completeTotpSetup POSTs /auth/login/totp-setup and returns the backup codes", async () => {
    const { captured, http } = rig({ ...SESSION, backup_codes: ["ABCD-EFGH"] });
    const store = inMemoryStore();
    const out = await new AuthResource(http, store).completeTotpSetup({
      challenge_token: "chal",
      code: "123456",
    });
    expect(out.backup_codes).toEqual(["ABCD-EFGH"]);
    expect(captured[0]!.url).toBe("https://api.test/v1/auth/login/totp-setup");
    expect(bodyOf(captured[0]!)).toEqual({ challenge_token: "chal", code: "123456" });
    expect(await store.get()).toBe("jwt-new");
  });

  it("changePassword POSTs /auth/password with the bearer token", async () => {
    const { captured, http } = rig({ revoked_sessions: 2 });
    const out = await new AuthResource(http, inMemoryStore()).changePassword({
      current_password: "old-Password-1",
      new_password: "new-Password-2",
    });
    expect(out.revoked_sessions).toBe(2);
    expect(captured[0]!.url).toBe("https://api.test/v1/auth/password");
    expect(captured[0]!.init.method).toBe("POST");
  });
});

describe("SessionsResource", () => {
  it("list / revoke / revokeOthers hit the right paths", async () => {
    const { captured, http } = rig({ revoked_sessions: 1 });
    const r = new SessionsResource(http);
    await r.list();
    await r.revoke("5f0c0b8e-0000-4000-8000-000000000001");
    const out = await r.revokeOthers();
    expect(out.revoked_sessions).toBe(1);
    expect(captured.map((c) => [c.init.method, c.url])).toEqual([
      ["GET", "https://api.test/v1/me/sessions"],
      ["DELETE", "https://api.test/v1/me/sessions/5f0c0b8e-0000-4000-8000-000000000001"],
      ["POST", "https://api.test/v1/me/sessions/terminate-others"],
    ]);
  });
});

describe("PushResource", () => {
  const KEY = "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U";

  it("status / remove hit /me/push-subscription", async () => {
    const { captured, http } = rig({ subscribed: false, vapid_public_key: KEY });
    const r = new PushResource(http);
    const s = await r.status();
    await r.remove();
    expect(s.vapid_public_key).toBe(KEY);
    expect(captured.map((c) => [c.init.method, c.url])).toEqual([
      ["GET", "https://api.test/v1/me/push-subscription"],
      ["DELETE", "https://api.test/v1/me/push-subscription"],
    ]);
  });

  it("enable subscribes with the VAPID key and PUTs the subscription", async () => {
    const { captured, http } = rig({ subscribed: true, vapid_public_key: KEY });
    let usedKey: Uint8Array | undefined;
    const registration = {
      pushManager: {
        getSubscription: async () => null,
        subscribe: async (o: { userVisibleOnly: boolean; applicationServerKey: Uint8Array }) => {
          usedKey = o.applicationServerKey;
          return {
            toJSON: () => ({
              endpoint: "https://push.example/abc",
              keys: { p256dh: "p256", auth: "auth" },
            }),
          };
        },
      },
    };
    const out = await new PushResource(http).enable(registration);
    expect(out.subscribed).toBe(true);
    expect(usedKey).toEqual(base64UrlToBytes(KEY));
    expect(usedKey!.length).toBe(65);
    expect(captured[1]!.init.method).toBe("PUT");
    expect(captured[1]!.url).toBe("https://api.test/v1/me/push-subscription");
    expect(bodyOf(captured[1]!)).toEqual({
      endpoint: "https://push.example/abc",
      keys: { p256dh: "p256", auth: "auth" },
    });
  });

  it("enable refuses when the deployment has no VAPID key", async () => {
    const { http } = rig({ subscribed: false, vapid_public_key: null });
    const registration = {
      pushManager: {
        getSubscription: async () => null,
        subscribe: async () => {
          throw new Error("should not subscribe");
        },
      },
    };
    await expect(new PushResource(http).enable(registration)).rejects.toThrow(/not enabled/);
  });
});

// ---------------------------------------------------------------------------
// Notifications + devices
// ---------------------------------------------------------------------------

/** A fake fetch that answers per (method, path) so one test can drive a
 *  multi-call flow. Unmatched requests get 404. */
function router(routes: Record<string, { status?: number; body?: unknown }>) {
  const captured: Captured[] = [];
  const fake: FetchLike = async (url, init) => {
    captured.push({ url: String(url), init: init ?? {} });
    const u = new URL(String(url));
    const key = `${init?.method ?? "GET"} ${u.pathname}`;
    const route = routes[key];
    if (!route) return new Response(JSON.stringify({ code: "not_found", message: key }), { status: 404 });
    const status = route.status ?? 200;
    if (status === 204 || route.body === undefined) return new Response(null, { status });
    return new Response(JSON.stringify(route.body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  };
  const http = new HttpClient("https://api.test", inMemoryStore(), fake);
  return { captured, http };
}

const ITEM: InboxItem = {
  id: "ntf_1",
  event_type: "deposit_confirmed",
  category: "money",
  title: "Deposit confirmed",
  body: "100.00 USD is in your wallet.",
  href: "/deposits/dep_1",
  data: { amount: "100.00", currency: "USD" },
  locale: "en",
  read_at: null,
  created_at: "2026-09-15T00:00:00Z",
};

const PREFS: NotificationPreferences = {
  primary_channel: null,
  categories: { marketing: { email: true, telegram: false } },
  locale: "ru",
  available_channels: ["push", "telegram", "email"],
};

describe("NotificationsResource", () => {
  it("list GETs /me/notifications with only the given query params", async () => {
    const page = { items: [ITEM], next_cursor: "c2", unread_count: 3 };
    const { captured, http } = rig(page);
    const r = new NotificationsResource(http);

    expect(await r.list()).toEqual(page);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/notifications");
    expect(captured[0]!.init.method).toBe("GET");

    await r.list({ cursor: "c2", limit: 20, unreadOnly: true, category: "money" });
    const u = new URL(captured[1]!.url);
    expect(u.pathname).toBe("/v1/me/notifications");
    expect(Object.fromEntries(u.searchParams)).toEqual({
      cursor: "c2",
      limit: "20",
      unread: "true",
      category: "money",
    });

    await r.list({ unreadOnly: false, limit: 5 });
    expect(new URL(captured[2]!.url).search).toBe("?limit=5");
  });

  it("unreadCount unwraps {unread}", async () => {
    const { captured, http } = rig({ unread: 7 });
    expect(await new NotificationsResource(http).unreadCount()).toBe(7);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/notifications/unread-count");
  });

  it("markRead POSTs /me/notifications/{id}/read and returns the item", async () => {
    const read = { ...ITEM, read_at: "2026-09-15T01:00:00Z" };
    const { captured, http } = rig(read);
    expect(await new NotificationsResource(http).markRead("ntf 1")).toEqual(read);
    expect(captured[0]!.init.method).toBe("POST");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/notifications/ntf%201/read");
    expect(bodyOf(captured[0]!)).toBeUndefined();
  });

  it("markAllRead POSTs read-all with an optional `before`", async () => {
    const { captured, http } = rig({ marked: 4 });
    const r = new NotificationsResource(http);
    expect(await r.markAllRead()).toEqual({ marked: 4 });
    expect(captured[0]!.url).toBe("https://api.test/v1/me/notifications/read-all");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({});

    await r.markAllRead("2026-09-15T00:00:00Z");
    expect(bodyOf(captured[1]!)).toEqual({ before: "2026-09-15T00:00:00Z" });
  });

  it("remove DELETEs /me/notifications/{id}", async () => {
    const { captured, http } = router({ "DELETE /v1/me/notifications/ntf_1": { status: 204 } });
    await new NotificationsResource(http).remove("ntf_1");
    expect(captured[0]!.init.method).toBe("DELETE");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/notifications/ntf_1");
  });

  it("getPreferences / setPreferences use /me/notification-preferences", async () => {
    const { captured, http } = rig(PREFS);
    const r = new NotificationsResource(http);
    expect(await r.getPreferences()).toEqual(PREFS);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/notification-preferences");
    expect(captured[0]!.init.method).toBe("GET");

    await r.setPreferences({
      primary_channel: null,
      categories: { marketing: { email: true } },
      locale: "ru",
    });
    expect(captured[1]!.init.method).toBe("PUT");
    expect(captured[1]!.url).toBe("https://api.test/v1/me/notification-preferences");
    expect(bodyOf(captured[1]!)).toEqual({
      primary_channel: null,
      categories: { marketing: { email: true } },
      locale: "ru",
    });

    await r.setPreferences({ locale: "en" });
    expect(bodyOf(captured[2]!)).toEqual({ locale: "en" });
  });
});

const DEVICE: Device = {
  id: "dev_1",
  kind: "webpush",
  platform: "pwa",
  label: "Chrome on Mac",
  locale: null,
  app_version: "0.3.0",
  created_at: "2026-09-15T00:00:00Z",
  last_seen_at: "2026-09-15T00:00:00Z",
  disabled_at: null,
  is_current: true,
};

const KEY = "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U";
const PWA = { platform: "pwa" as const, version: "0.3.0" };

function fakeRegistration(state: { subscribed: boolean; usedKey?: Uint8Array; unsubscribed?: boolean }) {
  return {
    pushManager: {
      getSubscription: async () =>
        state.subscribed
          ? {
              unsubscribe: async () => {
                state.unsubscribed = true;
                return true;
              },
            }
          : null,
      subscribe: async (o: { userVisibleOnly: boolean; applicationServerKey: Uint8Array }) => {
        state.usedKey = o.applicationServerKey;
        state.subscribed = true;
        return {
          toJSON: () => ({
            endpoint: "https://push.example/abc",
            keys: { p256dh: "p256", auth: "auth" },
          }),
        };
      },
    },
  };
}

describe("DevicesResource", () => {
  it("list GETs /me/devices", async () => {
    const { captured, http } = rig([DEVICE]);
    expect(await new DevicesResource(http, PWA).list()).toEqual([DEVICE]);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/devices");
    expect(captured[0]!.init.method).toBe("GET");
  });

  it("register PUTs /me/devices with the client version as app_version by default", async () => {
    const out = { id: "dev_tg", kind: "telegram_miniapp", platform: "telegram", vapid_public_key: null };
    const { captured, http } = rig(out, 201);
    const r = new DevicesResource(http, PWA);
    expect(
      await r.register({ kind: "telegram_miniapp", platform: "telegram", credential: {}, locale: "ru" }),
    ).toEqual(out);
    expect(captured[0]!.init.method).toBe("PUT");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/devices");
    expect(bodyOf(captured[0]!)).toEqual({
      kind: "telegram_miniapp",
      platform: "telegram",
      credential: {},
      locale: "ru",
      app_version: "0.3.0",
    });

    await r.register({ kind: "fcm", platform: "android", credential: { token: "t" }, app_version: "9.9" });
    expect(bodyOf(captured[1]!)).toEqual({
      kind: "fcm",
      platform: "android",
      credential: { token: "t" },
      app_version: "9.9",
    });
  });

  it("remove DELETEs /me/devices/{id}", async () => {
    const { captured, http } = router({ "DELETE /v1/me/devices/dev_1": { status: 204 } });
    await new DevicesResource(http, PWA).remove("dev_1");
    expect(captured[0]!.init.method).toBe("DELETE");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/devices/dev_1");
  });

  it("registerWebPush fetches the VAPID key, subscribes and PUTs a webpush device", async () => {
    const registered = { id: "dev_1", kind: "webpush", platform: "pwa", vapid_public_key: KEY };
    const { captured, http } = router({
      "GET /v1/me/push-subscription": { body: { subscribed: false, vapid_public_key: KEY } },
      "PUT /v1/me/devices": { status: 201, body: registered },
    });
    const state = { subscribed: false } as { subscribed: boolean; usedKey?: Uint8Array };
    const out = await new DevicesResource(http, PWA).registerWebPush(fakeRegistration(state), {
      label: "Chrome on Mac",
    });
    expect(out).toEqual(registered);
    expect(state.usedKey).toEqual(base64UrlToBytes(KEY));
    expect(captured.map((c) => [c.init.method, c.url])).toEqual([
      ["GET", "https://api.test/v1/me/push-subscription"],
      ["PUT", "https://api.test/v1/me/devices"],
    ]);
    expect(bodyOf(captured[1]!)).toEqual({
      kind: "webpush",
      platform: "pwa",
      credential: { endpoint: "https://push.example/abc", keys: { p256dh: "p256", auth: "auth" } },
      label: "Chrome on Mac",
      app_version: "0.3.0",
    });
  });

  it("registerWebPush skips the key lookup when given one, and maps telegram-miniapp to telegram", async () => {
    const { captured, http } = router({
      "PUT /v1/me/devices": { status: 200, body: { id: "dev_1", kind: "webpush", platform: "telegram", vapid_public_key: KEY } },
    });
    const state = { subscribed: false };
    await new DevicesResource(http, { platform: "telegram-miniapp", version: "1.0" }).registerWebPush(
      fakeRegistration(state),
      { vapidPublicKey: KEY },
    );
    expect(captured).toHaveLength(1);
    expect((bodyOf(captured[0]!) as { platform: string }).platform).toBe("telegram");
    expect(devicePlatformOf("telegram-miniapp")).toBe("telegram");
    expect(devicePlatformOf("ios")).toBe("ios");
  });

  it("registerWebPush refuses when the deployment has no VAPID key", async () => {
    const { http } = router({
      "GET /v1/me/push-subscription": { body: { subscribed: false, vapid_public_key: null } },
    });
    const state = { subscribed: false };
    await expect(
      new DevicesResource(http, PWA).registerWebPush(fakeRegistration(state)),
    ).rejects.toThrow(/not enabled/);
    expect(state.subscribed).toBe(false);
  });

  it("unregisterWebPush unsubscribes the browser and deletes this session's webpush devices", async () => {
    const other: Device = { ...DEVICE, id: "dev_2", is_current: false };
    const tg: Device = { ...DEVICE, id: "dev_3", kind: "telegram_miniapp", platform: "telegram" };
    const { captured, http } = router({
      "GET /v1/me/devices": { body: [DEVICE, other, tg] },
      "DELETE /v1/me/devices/dev_1": { status: 204 },
    });
    const state = { subscribed: true } as { subscribed: boolean; unsubscribed?: boolean };
    await new DevicesResource(http, PWA).unregisterWebPush(fakeRegistration(state));
    expect(state.unsubscribed).toBe(true);
    expect(captured.map((c) => [c.init.method, c.url])).toEqual([
      ["GET", "https://api.test/v1/me/devices"],
      ["DELETE", "https://api.test/v1/me/devices/dev_1"],
    ]);
  });

  it("unregisterWebPush deletes exactly the given device id", async () => {
    const { captured, http } = router({ "DELETE /v1/me/devices/dev_9": { status: 204 } });
    const state = { subscribed: false };
    await new DevicesResource(http, PWA).unregisterWebPush(fakeRegistration(state), { deviceId: "dev_9" });
    expect(captured.map((c) => [c.init.method, c.url])).toEqual([
      ["DELETE", "https://api.test/v1/me/devices/dev_9"],
    ]);
  });
});
