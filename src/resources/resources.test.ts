import { describe, expect, it } from "vitest";
import { HttpClient, type FetchLike } from "../http.js";
import { inMemoryStore } from "../token-store.js";
import { DepositsResource, type Deposit, type Refund } from "./deposits.js";
import { CardsResource, type Card, type CardBalance } from "./cards.js";
import { BalanceResource, type Balance } from "./balance.js";
import { BrandingResource, type Branding } from "./branding.js";
import { AuthResource, type JwtIssued, type User } from "./auth.js";

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
    expect(captured[0]!.url).toBe("https://api.test/me/deposits");
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
      "https://api.test/me/deposits/dep%201%2Fwith%3Fchars",
    );
    expect(captured[0]!.init.method).toBe("GET");

    const { captured: c2, http: h2 } = rig([DEPOSIT]);
    await new DepositsResource(h2).list();
    expect(c2[0]!.url).toBe("https://api.test/me/deposits");
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
    expect(captured[0]!.url).toBe("https://api.test/me/deposits/dep_1/refunds");
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
  created_at: "2026-06-21T00:00:00Z",
  updated_at: "2026-06-21T00:00:00Z",
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
    expect(captured[0]!.url).toBe("https://api.test/me/cards");
    expect(captured[0]!.init.method).toBe("POST");
    expect(headersOf(captured[0]!)["Idempotency-Key"]).toBe("idem-card");
    expect(bodyOf(captured[0]!)).toEqual({
      type: "prepaid",
      initial_amount: "50.00",
      currency: "USD",
    });
  });

  it("get / list hit the right paths", async () => {
    const { captured, http } = rig(CARD);
    await new CardsResource(http).get("card_1");
    expect(captured[0]!.url).toBe("https://api.test/me/cards/card_1");

    const { captured: c2, http: h2 } = rig([CARD]);
    await new CardsResource(h2).list();
    expect(c2[0]!.url).toBe("https://api.test/me/cards");
  });

  it("balance GETs /me/cards/{id}/balance with the currency query", async () => {
    const bal: CardBalance = { amount: "12.34", currency: "USD" };
    const { captured, http } = rig(bal);
    const out = await new CardsResource(http).balance("card_1", "USD");
    expect(out).toEqual(bal);
    expect(captured[0]!.url).toBe(
      "https://api.test/me/cards/card_1/balance?currency=USD",
    );
  });

  it("exposes ownership-gated lifecycle methods", async () => {
    const { captured, http } = rig(CARD);
    const cards = new CardsResource(http);
    expect(typeof cards.freeze).toBe("function");
    expect(typeof cards.unfreeze).toBe("function");
    expect(typeof cards.terminate).toBe("function");

    await cards.freeze("card_1", "lost");
    expect(captured[0]!.url).toBe("https://api.test/me/cards/card_1/freeze");
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
    expect(captured[0]!.url).toBe("https://api.test/me/cards/card_1/reveal");
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
    expect(captured[0]!.url).toBe("https://api.test/me/balance?currency=EUR");
    expect(captured[0]!.init.method).toBe("GET");
  });
});

describe("BrandingResource", () => {
  it("get GETs /branding without an Authorization header", async () => {
    const brand: Branding = {
      platform_name: "Acme",
      merchant_portal_name: "Acme Partners",
      logo_url: "",
      favicon_url: "",
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
    expect(captured[0]!.url).toBe("https://api.test/auth/telegram/exchange");
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
    expect(captured[0]!.url).toBe("https://api.test/me/email");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({ email: "alice@example.com" });
  });
});
