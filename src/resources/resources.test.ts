import { describe, expect, it } from "vitest";
import { HttpClient, type FetchLike } from "../http.js";
import { inMemoryStore } from "../token-store.js";
import { DepositsResource, type Deposit, type FundingQuote, type Refund } from "./deposits.js";
import { CardsResource, type Card, type CardBalance, type CardProduct } from "./cards.js";
import { BalanceResource, type Balance } from "./balance.js";
import { BonusResource, type BonusPreview, type BonusWallet } from "./bonus.js";
import { BrandingResource, type Branding } from "./branding.js";
import { BlogResource } from "./blog.js";
import { DocumentsResource } from "./documents.js";
import { SubscriptionsResource } from "./subscriptions.js";
import { AuthResource, type JwtIssued, type User } from "./auth.js";
import { SessionsResource } from "./sessions.js";
import { PushResource, base64UrlToBytes } from "./push.js";
import { MeResource } from "./me.js";
import {
  NotificationsResource,
  type InboxItem,
  type NotificationPreferences,
} from "./notifications.js";
import { DevicesResource, devicePlatformOf, type Device } from "./devices.js";
import { AttributionResource, anonymousKey, currentTouch } from "./attribution.js";
import { HistoryResource } from "./history.js";
import { ConsentsResource } from "./consents.js";
import { FundingOptionsResource, type FundingOption } from "./funding-options.js";
import { CodesResource, type CodeCheck } from "./codes.js";
import { ReferralResource, type Referral } from "./referral.js";
import { SubscriptionResource, type UserSubscription } from "./subscription.js";
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
  const tokens = inMemoryStore();
  const http = new HttpClient("https://api.test", tokens, fake);
  return { captured, http, tokens };
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
    expect(captured[0]!.url).toBe("https://api.test/v1/me/deposits/dep%201%2Fwith%3Fchars");
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
  status_source: "holder",
  card_form: "virtual",
  close_blocked: null,
  topups_pending: null,
  topups_held: null,
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
  designs: [{ id: "dsg_1", name: "Midnight", image_url: "https://api.test/assets/midnight.png" }],
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
    // initial_amount is deprecated and never reaches the wire.
    expect(bodyOf(captured[0]!)).toEqual({
      type: "prepaid",
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

  it("create maps useBonus / bonusAmount to use_bonus / bonus_amount", async () => {
    const { captured, http } = rig(CARD, 201);
    await new CardsResource(http).create({
      productId: "prod_1",
      currency: "USD",
      useBonus: true,
      bonusAmount: "5",
      idempotencyKey: "idem-card-4",
    });
    expect(bodyOf(captured[0]!)).toEqual({
      product_id: "prod_1",
      currency: "USD",
      use_bonus: true,
      bonus_amount: "5",
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

  it("catalog GETs the public /card-products", async () => {
    const { captured, http } = rig([PRODUCT]);
    const list = await new CardsResource(http).catalog();
    expect(list).toEqual([PRODUCT]);
    expect(captured[0]!.url).toBe("https://api.test/v1/card-products");
    expect(captured[0]!.init.method).toBe("GET");
  });

  it("topUpTerms GETs and topUp POSTs /me/cards/{id}/topup with the idempotency key", async () => {
    const terms = {
      available: true,
      reason: null,
      currency: "USD",
      wallet_available: { amount: "91", currency: "USD" },
      min: { amount: "10", currency: "USD" },
      max: null,
    };
    const { captured, http } = rig(terms);
    expect(await new CardsResource(http).topUpTerms("card_1")).toEqual(terms);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards/card_1/topup");
    expect(captured[0]!.init.method).toBe("GET");

    const result = {
      topup: { id: "t1", status: "confirmed" },
      card: CARD,
      card_balance: { amount: "25", currency: "USD" },
      wallet: { amount: "66", currency: "USD" },
    };
    const { captured: c2, http: h2 } = rig(result);
    const out = await new CardsResource(h2).topUp("card_1", {
      amount: "15.00",
      idempotencyKey: "idem-topup-1",
    });
    expect(out).toEqual(result);
    expect(c2[0]!.url).toBe("https://api.test/v1/me/cards/card_1/topup");
    expect(c2[0]!.init.method).toBe("POST");
    expect(bodyOf(c2[0]!)).toEqual({ amount: "15.00" });
    expect(new Headers(c2[0]!.init.headers).get("Idempotency-Key")).toBe("idem-topup-1");
  });

  it("transfer POSTs /me/cards/{id}/transfer with the other card in the body", async () => {
    const result = {
      transfer: {
        id: "tr1",
        from_card_id: "card_1",
        to_card_id: "card_2",
        status: "confirmed",
        amount: "8.00",
        currency: "USD",
        failure_reason: null,
      },
      from_balance: { amount: "12", currency: "USD" },
      to_balance: { amount: "8", currency: "USD" },
      wallet: { amount: "40", currency: "USD" },
    };
    const { captured, http } = rig(result);
    const out = await new CardsResource(http).transfer("card_1", {
      toCardId: "card_2",
      amount: "8.00",
      idempotencyKey: "idem-transfer-1",
    });
    expect(out).toEqual(result);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards/card_1/transfer");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({ to_card_id: "card_2", amount: "8.00" });
    expect(headersOf(captured[0]!)["Idempotency-Key"]).toBe("idem-transfer-1");
  });

  it("reveal hands back the billing address the card is registered at", async () => {
    const revealed = {
      pan: "4242424242424242",
      cvv: "123",
      expiry_month: 9,
      expiry_year: 2029,
      holder_name: "Alex Doe",
      expires_in_seconds: 30,
      billing_address: {
        line1: "12 Marylebone Road",
        city: "London",
        postal_code: "NW1 5LA",
        country: "GB",
      },
    };
    const { captured, http } = rig(revealed);
    const out = await new CardsResource(http).reveal("card_1");
    expect(out.billing_address?.postal_code).toBe("NW1 5LA");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards/card_1/reveal");
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
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards/card_1/balance?currency=USD");
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

  it("reveal POSTs /me/cards/{id}/reveal with no re-auth body", async () => {
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
      password: "ignored since 0.3.12",
    });
    expect(out).toEqual(revealed);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards/card_1/reveal");
    expect(captured[0]!.init.method).toBe("POST");
    expect(captured[0]!.init.body ?? null).toBeNull();
  });

  it("reveal returns the issuer's page when the numbers are not handed out", async () => {
    const revealed = {
      pan: "",
      cvv: "",
      expiry_month: 6,
      expiry_year: 2028,
      holder_name: "",
      reveal_url: "https://cards.issuer.example/show?token=one-time",
      expires_in_seconds: 30,
      cardholder: {
        id: "ch_1",
        first_name: "Alice",
        last_name: "Tester",
        birth_date: "1990-01-02",
        phone: "+447700900000",
        email: "ch_1@holders.example",
        address: {
          line1: "12 Marylebone Road",
          city: "London",
          postal_code: "NW1 5LA",
          country: "GB",
        },
        source: "generated",
      },
    };
    const { http } = rig(revealed);
    const out = await new CardsResource(http).reveal("card_1");
    expect(out.reveal_url).toBe("https://cards.issuer.example/show?token=one-time");
    expect(out.pan).toBe("");
    expect(out.cardholder?.source).toBe("generated");
  });

  it("setPin POSTs /me/cards/{id}/pin with the pin only", async () => {
    const physical: Card = { ...CARD, card_form: "physical" };
    const { captured, http } = rig(physical);
    const out = await new CardsResource(http).setPin("card_1", { pin: "4321" });
    expect(out.card_form).toBe("physical");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/cards/card_1/pin");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({ pin: "4321" });
  });

  it("reads a card the issuer is still issuing, and one it froze", async () => {
    const pending: Card = {
      ...CARD,
      status: "pending",
      last4: null,
      status_source: null,
      topups_pending: "20.00",
    };
    const frozen: Card = {
      ...CARD,
      status: "frozen",
      status_source: "provider",
      close_blocked: "card_locked",
    };
    const { http } = rig([pending, frozen]);
    const cards = await new CardsResource(http).list();
    expect(cards[0]!.status).toBe("pending");
    expect(cards[0]!.topups_pending).toBe("20.00");
    // The rule for the unfreeze button: only the holder's and the operator's freezes.
    const canUnfreeze = (c: Card) => c.status === "frozen" && c.status_source !== "provider";
    expect(canUnfreeze(frozen)).toBe(false);
    expect(canUnfreeze({ ...frozen, status_source: "holder" })).toBe(true);
  });

  it("topUp returns a pending top-up when the issuer has not loaded the card yet", async () => {
    const result = {
      topup: {
        id: "tp_1",
        card_id: "card_1",
        status: "pending",
        amount: "15.00",
        currency: "USD",
        wallet_amount: "15.00",
        wallet_currency: "USD",
        failure_reason: null,
        created_at: "2026-10-11T00:00:00Z",
        updated_at: "2026-10-11T00:00:00Z",
      },
      card: { ...CARD, topups_pending: "15.00" },
      card_balance: { amount: "0", currency: "USD" },
      wallet: { amount: "85.00", currency: "USD" },
    };
    const { http } = rig(result);
    const out = await new CardsResource(http).topUp("card_1", {
      amount: "15.00",
      idempotencyKey: "k",
    });
    expect(out.topup.status).toBe("pending");
    expect(out.card.topups_pending).toBe("15.00");
  });
});

describe("BonusResource", () => {
  it("get GETs /me/bonus", async () => {
    const wallet: BonusWallet = {
      balance: "300",
      pending: "0",
      unit_currency: "USD",
      spend_on: [{ purpose: "card_issuance", available: "300", share_bps: 10000 }],
      lots: [],
      history: [],
    };
    const { captured, http } = rig(wallet);
    const out = await new BonusResource(http).get();
    expect(out).toEqual(wallet);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/bonus");
    expect(captured[0]!.init.method).toBe("GET");
  });

  it("preview POSTs /me/bonus/preview with snake_case optionals", async () => {
    const preview: BonusPreview = {
      purpose: "card_issuance",
      amount: "10",
      bonus_units: "5",
      bonus_value: "5",
      due: "5",
      credited: null,
      currency: "USD",
    };
    const { captured, http } = rig(preview);
    const out = await new BonusResource(http).preview({
      purpose: "card_issuance",
      amount: "10",
      currency: "USD",
      productId: "prod_1",
      bonusAmount: "7",
    });
    expect(out).toEqual(preview);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/bonus/preview");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({
      purpose: "card_issuance",
      amount: "10",
      currency: "USD",
      product_id: "prod_1",
      bonus_amount: "7",
    });
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
      id: "q1",
      source_amount: "5000",
      source_currency: "RUB",
      credited_amount: "57.97",
      credited_currency: "USD",
      rate: "0.011832",
      spread_bps: 200,
      provider: "manual",
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
      amount: "5000",
      currency: "RUB",
      method: "card",
      idempotencyKey: "k1",
      quote_id: "q1",
    });
    expect(bodyOf(rig2.captured[0]!)).toEqual({
      amount: "5000",
      currency: "RUB",
      method: "card",
      quote_id: "q1",
    });
  });
});

describe("DepositsResource (straight onto a card)", () => {
  it("initiate carries card_id and quote() asks for the card's currency", async () => {
    const { captured, http } = rig({ ...DEPOSIT, target: "card", card_id: "card_1" });
    const deposits = new DepositsResource(http);
    await deposits.quote({ amount: "100", currency: "EUR", card_id: "card_1" });
    const out = await deposits.initiate({
      amount: "100",
      currency: "EUR",
      method: "card",
      card_id: "card_1",
      quote_id: "q_1",
      idempotencyKey: "k-card",
    });
    expect(bodyOf(captured[0]!)).toEqual({ amount: "100", currency: "EUR", card_id: "card_1" });
    expect(bodyOf(captured[1]!)).toEqual({
      amount: "100",
      currency: "EUR",
      method: "card",
      card_id: "card_1",
      quote_id: "q_1",
    });
    expect(headersOf(captured[1]!)["Idempotency-Key"]).toBe("k-card");
    expect(out.target).toBe("card");
  });

  it("issue_card is sent in the shape of POST /me/cards, snake_cased", async () => {
    const { captured, http } = rig({ ...DEPOSIT, issues_card: true });
    await new DepositsResource(http).initiate({
      amount: "25",
      currency: "USD",
      method: "card",
      issue_card: { productId: "prod_1", name: "Travel", designId: null, useBonus: false },
      idempotencyKey: "k-issue",
    });
    expect(bodyOf(captured[0]!)).toEqual({
      amount: "25",
      currency: "USD",
      method: "card",
      issue_card: { product_id: "prod_1", name: "Travel", design_id: null, use_bonus: false },
    });
  });
});

describe("DepositsResource (a method's own terms)", () => {
  it("quote names the connector and method in snake_case and reads the fee kind back", async () => {
    const quote: FundingQuote = {
      id: "q2",
      source_amount: "1000.00",
      source_currency: "RUB",
      credited_amount: "10.41",
      credited_currency: "USD",
      rate: "0.0125",
      spread_bps: 2000,
      fee_bps: 2000,
      fee_kind: "markup",
      provider: "cbr",
      connector_slug: "indigo-mock",
      method: "sbp",
      expires_at: "2026-10-11T20:05:00Z",
    };
    const { captured, http } = rig(quote, 201);
    const out = await new DepositsResource(http).quote({
      amount: "1000.00",
      currency: "RUB",
      connectorSlug: "indigo-mock",
      method: "sbp",
    });
    expect(out.fee_kind).toBe("markup");
    expect(out.method).toBe("sbp");
    expect(bodyOf(captured[0]!)).toEqual({
      amount: "1000.00",
      currency: "RUB",
      connector_slug: "indigo-mock",
      method: "sbp",
    });
    // The rate the user sees, roubles per dollar, has the fee in it.
    const perUnit = Number(out.source_amount) / Number(out.credited_amount);
    expect(perUnit.toFixed(2)).toBe("96.06");
  });

  it("reads an expired deposit", async () => {
    const expired: Deposit = {
      ...DEPOSIT,
      status: "expired",
      method: "sbp",
      failure_reason: "not paid before the deposit expired",
      expires_at: "2026-10-11T20:05:00Z",
      fx_fee_kind: "markup",
    };
    const { http } = rig(expired);
    const d = await new DepositsResource(http).get("dep_1");
    expect(d.status).toBe("expired");
    expect(d.expires_at).toBe("2026-10-11T20:05:00Z");
  });
});

describe("FundingOptionsResource", () => {
  it("list GETs /me/funding-options", async () => {
    const options: FundingOption[] = [
      {
        slug: "indigo-a",
        mode: "mixed",
        targets: ["wallet", "card"],
        methods: ["card", "sbp"],
        issue_card: true,
        method_terms: [
          {
            method: "card",
            source_currency: null,
            fee_kind: "spread",
            fee_bps: 200,
            quote_ttl_seconds: 120,
            min_amount: null,
            max_amount: null,
            daily_limit_per_user: null,
          },
          {
            method: "sbp",
            source_currency: "RUB",
            fee_kind: "markup",
            fee_bps: 2000,
            quote_ttl_seconds: 300,
            min_amount: "500",
            max_amount: "100000",
            daily_limit_per_user: "300000",
          },
        ],
      },
    ];
    const { captured, http } = rig(options);
    const out = await new FundingOptionsResource(http).list();
    expect(captured[0]!.url).toBe("https://api.test/v1/me/funding-options");
    expect(captured[0]!.init.method ?? "GET").toBe("GET");
    expect(out).toEqual(options);
    const sbp = out[0]!.method_terms.find((m) => m.method === "sbp");
    expect(sbp?.source_currency).toBe("RUB");
    expect(sbp?.fee_kind).toBe("markup");
    expect(sbp?.daily_limit_per_user).toBe("300000");
  });
});

describe("DocumentsResource", () => {
  it("list passes every filter and sends the session when there is one", async () => {
    const page = { documents: [], total: 0, page: 2, per_page: 5 };
    const { captured, http, tokens } = rig(page);
    await tokens.set("jwt-1");
    const out = await new DocumentsResource(http).list({
      category: "knowledge-base",
      folderId: "f1",
      tag: "fees",
      locale: "ru",
      q: "top up",
      page: 2,
      perPage: 5,
    });
    expect(out).toEqual(page);
    expect(captured[0]!.url).toBe(
      "https://api.test/v1/documents?category=knowledge-base&folder_id=f1&tag=fees&locale=ru&q=top+up&page=2&per_page=5",
    );
    expect(new Headers(captured[0]!.init.headers).get("authorization")).toBe("Bearer jwt-1");
  });

  it("list works without a session", async () => {
    const { captured, http } = rig({ documents: [], total: 0, page: 1, per_page: 10 });
    await new DocumentsResource(http).list({ category: "blog" });
    expect(captured[0]!.url).toBe("https://api.test/v1/documents?category=blog");
    expect(new Headers(captured[0]!.init.headers).get("authorization")).toBeNull();
  });

  it("get takes a moment and returns the structured body", async () => {
    const doc = {
      slug: "offer",
      title: "Offer",
      excerpt: "",
      body_markdown: "# H",
      body_blocks: [{ type: "heading", level: 1, text: "H" }],
      tags: [],
      reading_minutes: 1,
      published_at: null,
      updated_at: "2026-09-25T00:00:00Z",
      category: "legal",
      path: [{ id: "c", key: "legal", title: "Legal documents" }],
      read_scope: "public",
      version: 2,
      effective_from: "2026-01-01T00:00:00Z",
      site_path: "/docs/offer",
    };
    const { captured, http } = rig(doc);
    const r = new DocumentsResource(http);
    const out = await r.get("offer", { at: new Date("2026-03-01T00:00:00Z") });
    expect(out.site_path).toBe("/docs/offer");
    expect(captured[0]!.url).toBe(
      "https://api.test/v1/documents/offer?at=2026-03-01T00%3A00%3A00.000Z",
    );
    await r.get("offer");
    expect(captured[1]!.url).toBe("https://api.test/v1/documents/offer");
  });

  it("tree, tags and versions hit their paths", async () => {
    const { captured, http } = rig([]);
    const r = new DocumentsResource(http);
    await r.tree({ category: "knowledge-base" });
    await r.tags();
    await r.versions("offer");
    await r.version("offer", 2);
    expect(captured.map((c) => c.url)).toEqual([
      "https://api.test/v1/documents/tree?category=knowledge-base",
      "https://api.test/v1/documents/tags",
      "https://api.test/v1/documents/offer/versions",
      "https://api.test/v1/documents/offer/versions/2",
    ]);
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
    const err = await new MeResource(http)
      .unlinkTelegram()
      .then(() => null)
      .catch((e: unknown) => e);
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
  const KEY =
    "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U";

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
    if (!route)
      return new Response(JSON.stringify({ code: "not_found", message: key }), { status: 404 });
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

const KEY =
  "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U";
const PWA = { platform: "pwa" as const, version: "0.3.0" };

function fakeRegistration(state: {
  subscribed: boolean;
  usedKey?: Uint8Array;
  unsubscribed?: boolean;
}) {
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
    const out = {
      id: "dev_tg",
      kind: "telegram_miniapp",
      platform: "telegram",
      vapid_public_key: null,
    };
    const { captured, http } = rig(out, 201);
    const r = new DevicesResource(http, PWA);
    expect(
      await r.register({
        kind: "telegram_miniapp",
        platform: "telegram",
        credential: {},
        locale: "ru",
      }),
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

    await r.register({
      kind: "fcm",
      platform: "android",
      credential: { token: "t" },
      app_version: "9.9",
    });
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
      "PUT /v1/me/devices": {
        status: 200,
        body: { id: "dev_1", kind: "webpush", platform: "telegram", vapid_public_key: KEY },
      },
    });
    const state = { subscribed: false };
    await new DevicesResource(http, {
      platform: "telegram-miniapp",
      version: "1.0",
    }).registerWebPush(fakeRegistration(state), { vapidPublicKey: KEY });
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
    await new DevicesResource(http, PWA).unregisterWebPush(fakeRegistration(state), {
      deviceId: "dev_9",
    });
    expect(captured.map((c) => [c.init.method, c.url])).toEqual([
      ["DELETE", "https://api.test/v1/me/devices/dev_9"],
    ]);
  });
});

describe("AttributionResource", () => {
  it("touch POSTs /attribution/touches without a bearer", async () => {
    const { captured, http } = rig({ recorded: true });
    const out = await new AttributionResource(http).touch({
      anonymous_key: "k-12345678",
      url: "https://site.test/?utm_campaign=spring",
      referrer: "https://t.me/",
    });
    expect(out.recorded).toBe(true);
    expect(captured[0]!.url).toBe("https://api.test/v1/attribution/touches");
    expect(captured[0]!.init.method).toBe("POST");
    expect(new Headers(captured[0]!.init.headers).get("Authorization")).toBeNull();
    expect(JSON.parse(String(captured[0]!.init.body))).toEqual({
      anonymous_key: "k-12345678",
      url: "https://site.test/?utm_campaign=spring",
      referrer: "https://t.me/",
    });
  });

  it("answerSurvey PUTs the answer and keeps other_text only when given", async () => {
    const { captured, http } = rig({ survey_pending: false, survey_answer: "skipped" });
    await new AttributionResource(http).answerSurvey("skipped");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/attribution/survey");
    expect(captured[0]!.init.method).toBe("PUT");
    expect(JSON.parse(String(captured[0]!.init.body))).toEqual({ answer: "skipped" });
  });

  it("status GETs /me/attribution", async () => {
    const { captured, http } = rig({ survey_pending: true, survey_answer: null });
    const out = await new AttributionResource(http).status();
    expect(out.survey_pending).toBe(true);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/attribution");
  });

  it("the anonymous key is the Telegram id in the Mini App, undefined outside a browser", () => {
    const g = globalThis as { Telegram?: unknown };
    expect(anonymousKey()).toBeUndefined();
    g.Telegram = { WebApp: { initDataUnsafe: { user: { id: 777 }, start_param: "tg-post" } } };
    try {
      expect(anonymousKey()).toBe("tg:777");
      expect(currentTouch()).toEqual({ campaign_code: "tg-post", platform: "miniapp" });
    } finally {
      delete g.Telegram;
    }
  });

  it("the anonymous key survives losing either the cookie or the storage", () => {
    const store = new Map<string, string>();
    const g = globalThis as { document?: unknown; localStorage?: unknown };
    let cookie = "";
    g.document = {
      get cookie() {
        return cookie;
      },
      set cookie(v: string) {
        cookie = v.split(";")[0]!;
      },
      referrer: "",
    };
    g.localStorage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
    };
    try {
      const first = anonymousKey()!;
      expect(first).toMatch(/^[A-Za-z0-9_-]{8,64}$/);
      store.clear();
      expect(anonymousKey()).toBe(first);
      cookie = "";
      expect(anonymousKey()).toBe(first);
    } finally {
      delete g.document;
      delete g.localStorage;
    }
  });
});

describe("AuthResource (attribution at sign-up)", () => {
  it("register sends the attribution block as given", async () => {
    const { captured, http } = rig({
      access_token: "t",
      expires_at: "2026-01-01T00:00:00Z",
      user: {},
    });
    await new AuthResource(http, inMemoryStore()).register({
      email: "a@example.invalid",
      password: "Correct-Horse-Battery-9",
      attribution: { anonymous_key: "k-12345678", posthog_distinct_id: "ph" },
    });
    expect(JSON.parse(String(captured[0]!.init.body)).attribution).toEqual({
      anonymous_key: "k-12345678",
      posthog_distinct_id: "ph",
    });
  });

  it("exchangeTelegram passes attribution through", async () => {
    const { captured, http } = rig({ stage: "jwt", access_token: "t", expires_at: "x", user: {} });
    await new AuthResource(http, inMemoryStore()).exchangeTelegram({
      initData: "a=b",
      attribution: { metrika_client_id: "ym" },
    });
    expect(JSON.parse(String(captured[0]!.init.body))).toEqual({
      init_data: "a=b",
      attribution: { metrika_client_id: "ym" },
    });
  });
});

describe("HistoryResource", () => {
  it("list GETs /me/history with the filters it was given", async () => {
    const { captured, http } = rig({ items: [], next_cursor: null });
    await new HistoryResource(http).list({ cardId: "c1", limit: 10, lang: "ru", cursor: "abc" });
    expect(captured[0]!.url).toBe(
      "https://api.test/v1/me/history?card_id=c1&cursor=abc&limit=10&lang=ru",
    );
  });

  it("all() follows next_cursor to the end", async () => {
    const pages = [
      { items: [{ id: "a" }, { id: "b" }], next_cursor: "p2" },
      { items: [{ id: "c" }], next_cursor: null },
    ];
    const urls: string[] = [];
    const fake: FetchLike = async (url) => {
      urls.push(String(url));
      return new Response(JSON.stringify(pages.shift()), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };
    const http = new HttpClient("https://api.test", inMemoryStore(), fake);
    const ids: string[] = [];
    for await (const item of new HistoryResource(http).all({ limit: 2 })) ids.push(item.id);
    expect(ids).toEqual(["a", "b", "c"]);
    expect(urls[1]).toContain("cursor=p2");
  });
});

describe("AuthResource (remember me)", () => {
  function routed(
    routes: Record<string, (init: RequestInit) => { status?: number; body?: unknown }>,
  ) {
    const calls: { url: string; init: RequestInit }[] = [];
    const fake: FetchLike = async (url, init) => {
      const u = String(url);
      calls.push({ url: u, init: init ?? {} });
      const key = `${init?.method ?? "GET"} ${u.replace("https://api.test", "")}`;
      const r = routes[key]?.(init ?? {}) ?? {
        status: 404,
        body: { code: "not_found", message: key },
      };
      return new Response(r.body === undefined ? null : JSON.stringify(r.body), {
        status: r.status ?? 200,
        headers: { "Content-Type": "application/json" },
      });
    };
    return { calls, fake };
  }

  it("login with remember sends remember_me and keeps the remember token", async () => {
    const { calls, fake } = routed({
      "POST /v1/auth/login": () => ({
        body: { stage: "jwt", access_token: "a1", expires_at: "x", user: {}, remember_token: "r1" },
      }),
    });
    const tokens = inMemoryStore();
    const remembered = inMemoryStore();
    await new AuthResource(
      new HttpClient("https://api.test", tokens, fake),
      tokens,
      remembered,
    ).login({
      email: "a@example.invalid",
      password: "p",
      remember: true,
    });
    expect(JSON.parse(String(calls[0]!.init.body))).toEqual({
      email: "a@example.invalid",
      password: "p",
      remember_me: true,
    });
    expect(tokens.get()).toBe("a1");
    expect(remembered.get()).toBe("r1");
  });

  it("a 401 renews the session once and repeats the call", async () => {
    let meCalls = 0;
    const { calls, fake } = routed({
      "GET /v1/auth/me": (init) => {
        meCalls++;
        const auth = new Headers(init.headers).get("Authorization");
        return auth === "Bearer a2"
          ? { body: { id: "u1" } }
          : { status: 401, body: { code: "unauthenticated", message: "x" } };
      },
      "POST /v1/auth/refresh": () => ({
        body: { stage: "jwt", access_token: "a2", expires_at: "x", user: {}, remember_token: "r2" },
      }),
    });
    const tokens = inMemoryStore();
    tokens.set("a1");
    const remembered = inMemoryStore();
    remembered.set("r1");
    const http = new HttpClient("https://api.test", tokens, fake);
    const auth = new AuthResource(http, tokens, remembered);
    const [a, b] = await Promise.all([auth.me(), auth.me()]);
    expect(a.id).toBe("u1");
    expect(b.id).toBe("u1");
    expect(calls.filter((c) => c.url.endsWith("/auth/refresh")).length).toBe(1);
    expect(
      JSON.parse(String(calls.find((c) => c.url.endsWith("/auth/refresh"))!.init.body)),
    ).toEqual({ remember_token: "r1" });
    expect(tokens.get()).toBe("a2");
    expect(remembered.get()).toBe("r2");
    expect(meCalls).toBe(4);
  });

  it("a refused remember token signs out locally and the 401 comes through", async () => {
    const { fake } = routed({
      "GET /v1/auth/me": () => ({ status: 401, body: { code: "unauthenticated", message: "x" } }),
      "POST /v1/auth/refresh": () => ({
        status: 401,
        body: { code: "remember_token_invalid", message: "x" },
      }),
    });
    const tokens = inMemoryStore();
    tokens.set("a1");
    const remembered = inMemoryStore();
    remembered.set("r1");
    const auth = new AuthResource(
      new HttpClient("https://api.test", tokens, fake),
      tokens,
      remembered,
    );
    await expect(auth.me()).rejects.toMatchObject({ status: 401 });
    expect(tokens.get()).toBeNull();
    expect(remembered.get()).toBeNull();
  });

  it("signOut ends the session and the remembered sign-in on the server", async () => {
    const { calls, fake } = routed({ "POST /v1/auth/logout": () => ({ status: 204 }) });
    const tokens = inMemoryStore();
    tokens.set("a1");
    const remembered = inMemoryStore();
    remembered.set("r1");
    await new AuthResource(
      new HttpClient("https://api.test", tokens, fake),
      tokens,
      remembered,
    ).signOut();
    expect(JSON.parse(String(calls[0]!.init.body))).toEqual({ remember_token: "r1" });
    expect(tokens.get()).toBeNull();
    expect(remembered.get()).toBeNull();
  });
});

describe("codes, referral, subscription", () => {
  it("codes.validate POSTs /me/codes/validate", async () => {
    const check: CodeCheck = {
      valid: true,
      code: "SPRING",
      kind: "promo",
      reason: null,
      message: null,
      discount: {
        kind: "percent",
        bps: 5000,
        amount: null,
        currency: null,
        applies_to: "card_issuance",
      },
      discount_value: "5",
      effects: [{ kind: "bonus_credit", amount: "2" }],
    };
    const { captured, http } = rig(check);
    const out = await new CodesResource(http).validate({
      code: "spring",
      operation: "card_issuance",
      amount: "10",
      currency: "USD",
    });
    expect(out).toEqual(check);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/codes/validate");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({
      code: "spring",
      operation: "card_issuance",
      amount: "10",
      currency: "USD",
    });
  });

  it("referral.get GETs /me/referral", async () => {
    const ref: Referral = {
      code: "ALICE",
      link: "https://t.me/examplebot/app?startapp=ALICE",
      invited_count: 1,
      invited: [
        {
          joined_at: "2026-09-28T00:00:00Z",
          rewarded: "11.00",
          has_card: false,
          has_topped_up: true,
        },
      ],
      total_rewarded: "11.00",
      rewards: [],
    };
    const { captured, http } = rig(ref);
    expect(await new ReferralResource(http).get()).toEqual(ref);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/referral");
  });

  it("subscription.get and setPromoCode", async () => {
    const sub: UserSubscription = {
      id: "sub_1",
      tier_id: "tier_1",
      tier_name: "Plus",
      status: "active",
      kind: "gift",
      gift_until: null,
      monthly_fee: "5",
      currency: "USD",
      issuance_discount_bps: 0,
      funding_discount_bps: 0,
      started_at: "2026-09-28T00:00:00Z",
      current_period_end: null,
      promo_code_id: null,
    };
    const { captured, http } = rig(sub);
    const r = new SubscriptionResource(http);
    expect(await r.get()).toEqual(sub);
    await r.setPromoCode(null);
    expect(captured[0]!.url).toBe("https://api.test/v1/me/subscription");
    expect(captured[1]!.url).toBe("https://api.test/v1/me/subscription/promo-code");
    expect(captured[1]!.init.method).toBe("PUT");
    expect(bodyOf(captured[1]!)).toEqual({ code: null });
  });

  it("cards.create sends promoCode as promo_code; deposits pass promo_code through", async () => {
    const { captured, http } = rig({ id: "card_1" });
    await new CardsResource(http).create({
      productId: "prod_1",
      currency: "USD",
      promoCode: "SPRING",
      idempotencyKey: "k1",
    });
    expect(bodyOf(captured[0]!)).toMatchObject({ product_id: "prod_1", promo_code: "SPRING" });
    await new DepositsResource(http).initiate({
      amount: "100",
      currency: "USD",
      method: "card",
      promo_code: "HALF",
      idempotencyKey: "k2",
    });
    expect(bodyOf(captured[1]!)).toMatchObject({ amount: "100", promo_code: "HALF" });
  });

  it("register and exchangeTelegram send the code and hand back code_result", async () => {
    const session = {
      access_token: "t",
      expires_at: "2026-09-29T00:00:00Z",
      user: {
        id: "u",
        email: "a@example.invalid",
        role: "user",
        is_active: true,
        created_at: "",
        updated_at: "",
      },
      code_result: {
        code: "SPRING",
        status: "rejected",
        reason: "expired",
        message: "This code has expired.",
        effects: [],
      },
    };
    const { captured, http, tokens } = rig(session);
    const auth = new AuthResource(http, tokens);
    const r = await auth.register({
      email: "a@example.invalid",
      password: "Correct-Horse-Battery-9",
      code: "SPRING",
    });
    expect(r.code_result?.reason).toBe("expired");
    expect(bodyOf(captured[0]!)).toMatchObject({ code: "SPRING" });
    await auth.exchangeTelegram({ initData: "x", code: "ALICE" });
    expect(bodyOf(captured[1]!)).toEqual({ init_data: "x", code: "ALICE" });
  });
});

describe("ConsentsResource", () => {
  it("get GETs /me/consents", async () => {
    const { captured, http } = rig({ consents: [] });
    await new ConsentsResource(http).get();
    expect(captured[0]!.url).toBe("https://api.test/v1/me/consents");
    expect(captured[0]!.init.method ?? "GET").toBe("GET");
  });

  it("set POSTs the kind, the choice and the channel", async () => {
    const { captured, http } = rig({ consents: [] });
    await new ConsentsResource(http).set("marketing", false, "cabinet");
    expect(captured[0]!.url).toBe("https://api.test/v1/me/consents");
    expect(captured[0]!.init.method).toBe("POST");
    expect(bodyOf(captured[0]!)).toEqual({ kind: "marketing", given: false, channel: "cabinet" });
  });

  it("setCookies POSTs /consents/cookies with the anonymous key", async () => {
    const { captured, http } = rig({ recorded: true });
    const r = await new ConsentsResource(http).setCookies({
      analytics: false,
      anonymousKey: "anon-12345678",
    });
    expect(r.recorded).toBe(true);
    expect(captured[0]!.url).toBe("https://api.test/v1/consents/cookies");
    expect(bodyOf(captured[0]!)).toEqual({ analytics: false, anonymous_key: "anon-12345678" });
  });

  it("register and card orders carry consents on the wire", async () => {
    const reg = rig({ access_token: "t", token_type: "Bearer", expires_in: 1, user: {} });
    await new AuthResource(reg.http, reg.tokens).register({
      email: "a@example.invalid",
      password: "x",
      consents: ["terms", "personal_data"],
      consent_channel: "site",
    });
    expect(bodyOf(reg.captured[0]!)).toMatchObject({
      consents: ["terms", "personal_data"],
      consent_channel: "site",
    });

    const card = rig({ id: "c1" });
    await new CardsResource(card.http).create({
      productId: "p1",
      currency: "USD",
      consents: ["terms"],
      consentChannel: "cabinet",
      idempotencyKey: "k1",
    });
    expect(bodyOf(card.captured[0]!)).toMatchObject({
      consents: ["terms"],
      consent_channel: "cabinet",
    });
    expect(bodyOf(card.captured[0]!)).not.toHaveProperty("consentChannel");
  });
});
