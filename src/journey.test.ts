import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { createClient, inMemoryStore, ApiError, isApiError } from "./index.js";

/**
 * Live END-TO-END journey — the full Cusfront end-user path against a running
 * Takeal API (default `http://localhost:7777`, override `LIVE_API_URL`).
 * Skipped when unreachable so CI stays green without the stack.
 *
 * Requires a reachable Takeal API with at least one funder + one issuer
 * connector configured (so deposits + card issuance settle). This is the SDK's
 * primary backend-contract shake-down: it drives every resource a Cusfront
 * uses and asserts the documented wire shapes, so a backend regression on the
 * end-user surface surfaces here loudly.
 */

const LIVE = process.env.LIVE_API_URL ?? "http://localhost:7777";
const EMAIL = process.env.LIVE_EMAIL ?? "alice@example.com";
const PASSWORD = process.env.LIVE_PASSWORD ?? "hunter22supersecret";
const CCY = "USD";

async function reachable(): Promise<boolean> {
  try {
    const r = await fetch(`${LIVE}/health`, { signal: AbortSignal.timeout(800) });
    return r.ok;
  } catch {
    return false;
  }
}

const uuid = () => globalThis.crypto.randomUUID();
const num = (s: string | null | undefined) => Number(s ?? "0");

describe.runIf(await reachable())("live Cusfront journey", () => {
  it("deposit → balance → card lifecycle, full round-trip", async () => {
    const client = createClient({ baseUrl: LIVE, tokenStore: inMemoryStore() });

    // --- auth -------------------------------------------------------------
    const login = await client.auth.login({ email: EMAIL, password: PASSWORD });
    expect(login.stage, `login stage (got ${JSON.stringify(login)})`).toBe("jwt");
    if (login.stage !== "jwt") throw new Error("not jwt");
    const me = await client.auth.me();
    expect(me.email).toBe(EMAIL);

    // --- balance baseline -------------------------------------------------
    const bal0 = await client.balance.get(CCY);
    expect(bal0.currency).toBe(CCY);
    expect(typeof bal0.amount).toBe("string");
    const before = num(bal0.amount);

    // --- deposit ----------------------------------------------------------
    const dep = await client.deposits.initiate({
      amount: "100.00",
      currency: CCY,
      method: "card",
      idempotencyKey: uuid(),
      customer: { email: EMAIL, first_name: "Alice", last_name: "Tester" },
    });
    expect(dep.id, `deposit id (got ${JSON.stringify(dep)})`).toBeTruthy();
    expect(["pending", "redirect_required", "confirmed", "failed"]).toContain(dep.status);
    expect(num(dep.amount), `deposit amount value (raw: ${dep.amount})`).toBe(100);
    // Money must serialize clean — no NUMERIC(_,18) "100.000000000000000000" tail.
    expect(dep.amount, "deposit amount is a clean money string").not.toMatch(/\d0{6,}$/);
    expect(dep.connector_slug).toBeTruthy();

    // get + list round-trip the same row.
    const depGet = await client.deposits.get(dep.id);
    expect(depGet.id).toBe(dep.id);
    const depList = await client.deposits.list();
    expect(depList.some((d) => d.id === dep.id), "deposit appears in list").toBe(true);

    // mock funder settles synchronously → balance should rise by 100.
    const confirmed = dep.status === "confirmed";
    const bal1 = await client.balance.get(CCY);
    const after = num(bal1.amount);
    if (confirmed) {
      expect(after, `balance ${before}→${after} after confirmed 100 deposit`).toBeCloseTo(
        before + 100,
        2,
      );
    }

    // --- card lifecycle (needs spendable balance) -------------------------
    const spendable = confirmed ? after : before;
    if (spendable < 10) {
      throw new Error(
        `insufficient balance (${spendable}) to test card issuance; deposit status=${dep.status}`,
      );
    }

    const card = await client.cards.create({
      type: "prepaid",
      initial_amount: "10.00",
      currency: CCY,
      idempotencyKey: uuid(),
      customer: { email: EMAIL, first_name: "Alice", last_name: "Tester" },
    });
    expect(card.id, `card id (got ${JSON.stringify(card)})`).toBeTruthy();
    expect(card.card_type).toBe("prepaid");
    expect(card.status, `card status (reason: ${card.failure_reason})`).toBe("active");
    expect(card.initial_amount ?? "", "card initial_amount clean").not.toMatch(/\d0{6,}$/);

    const cardGet = await client.cards.get(card.id);
    expect(cardGet.id).toBe(card.id);
    const cardList = await client.cards.list();
    expect(cardList.some((c) => c.id === card.id), "card appears in list").toBe(true);

    // prepaid balance (live, from the issuer).
    const cb = await client.cards.balance(card.id, CCY);
    expect(cb.currency).toBe(CCY);
    expect(typeof cb.amount).toBe("string");

    // reveal: re-auth with password → full (mock) PAN + CVV.
    const revealed = await client.cards.reveal(card.id, { password: PASSWORD });
    expect(revealed.pan.length, `pan (${JSON.stringify(revealed)})`).toBeGreaterThanOrEqual(12);
    expect(revealed.cvv).toBeTruthy();
    expect(revealed.expires_in_seconds).toBeGreaterThan(0);
    // Wrong password → 401 (re-auth gate holds even with a valid session).
    const badReveal = await client.cards
      .reveal(card.id, { password: "definitely-wrong" })
      .then(() => null)
      .catch((e) => e);
    expect(isApiError(badReveal), `expected ApiError, got ${badReveal}`).toBe(true);
    expect((badReveal as ApiError).status).toBe(401);

    // freeze → unfreeze → terminate.
    const frozen = await client.cards.freeze(card.id, "journey test");
    expect(frozen.status).toBe("frozen");
    const unfrozen = await client.cards.unfreeze(card.id);
    expect(unfrozen.status).toBe("active");
    const terminated = await client.cards.terminate(card.id, "journey test cleanup");
    expect(terminated.status).toBe("terminated");

    await client.auth.signOut();
    expect(await client.tokens.get()).toBeNull();
  });

  // Card catalog → issue from a product with a name + design → rename.
  // Skips itself when the API under test predates the catalog (404 on the
  // route, or an empty list because no product is visible to the user).
  it("catalog → issue from a product with name + design → rename", async () => {
    const client = createClient({ baseUrl: LIVE, tokenStore: inMemoryStore() });
    await client.auth.login({ email: EMAIL, password: PASSWORD });

    const products = await client.cards.listProducts().catch((e: unknown) => {
      if (isApiError(e) && e.status === 404) return null;
      throw e;
    });
    if (!products || products.length === 0) {
      console.warn("live journey: no card products on this API, skipping the catalog scenario");
      return;
    }

    const product = products.find((p) => p.is_default) ?? products[0]!;
    expect(product.id).toBeTruthy();
    expect(product.name).toBeTruthy();
    expect(["prepaid", "credit", "gift"]).toContain(product.card_type);
    expect(product.design.image_url, "product has artwork").toBeTruthy();
    expect(Array.isArray(product.designs)).toBe(true);
    expect(typeof product.features).toBe("object");
    if (product.price) {
      expect(num(product.price.amount)).toBeLessThanOrEqual(num(product.price.base_amount));
      expect(product.price.discount_bps).toBeGreaterThanOrEqual(0);
    }
    // The artwork URL resolves to something a browser can load.
    expect(client.assetUrl(product.design.image_url)).toMatch(/^https?:\/\//);

    const one = await client.cards.getProduct(product.id);
    expect(one.id).toBe(product.id);

    // Make sure there is money for the load + the fee.
    const ccy = product.currency ?? CCY;
    const fee = product.price ? num(product.price.amount) : 0;
    const need = 10 + fee;
    const bal = await client.balance.get(ccy);
    if (num(bal.amount) < need) {
      const dep = await client.deposits.initiate({
        amount: "100.00",
        currency: ccy,
        method: "card",
        idempotencyKey: uuid(),
        customer: { email: EMAIL, first_name: "Alice", last_name: "Tester" },
      });
      if (dep.status !== "confirmed") {
        throw new Error(`deposit did not confirm (status=${dep.status}); cannot fund the card`);
      }
    }

    const card = await client.cards.create({
      productId: product.id,
      name: "Groceries",
      designId: product.design.id,
      initial_amount: "10.00",
      currency: ccy,
      idempotencyKey: uuid(),
      customer: { email: EMAIL, first_name: "Alice", last_name: "Tester" },
    });
    expect(card.id, `card id (got ${JSON.stringify(card)})`).toBeTruthy();
    expect(card.status, `card status (reason: ${card.failure_reason})`).toBe("active");
    expect(card.card_type).toBe(product.card_type);
    expect(card.name).toBe("Groceries");
    expect(card.design.id).toBe(product.design.id);
    expect(card.design.image_url).toBeTruthy();
    expect(card.product?.id, `card.product (got ${JSON.stringify(card.product)})`).toBe(product.id);
    expect(card.product?.name).toBe(product.name);

    // The list / get views carry the same fields.
    const got = await client.cards.get(card.id);
    expect(got.name).toBe("Groceries");
    expect(got.product?.id).toBe(product.id);

    // Rename.
    const renamed = await client.cards.update(card.id, { name: "Coffee" });
    expect(renamed.id).toBe(card.id);
    expect(renamed.name).toBe("Coffee");
    expect((await client.cards.get(card.id)).name).toBe("Coffee");

    // A name that is too long is rejected as 400, not 500.
    const tooLong = await client.cards
      .update(card.id, { name: "x".repeat(41) })
      .then(() => null)
      .catch((e) => e);
    expect(isApiError(tooLong), `expected ApiError, got ${tooLong}`).toBe(true);
    expect((tooLong as ApiError).status).toBe(400);

    await client.cards.terminate(card.id, "journey test cleanup");
    await client.auth.signOut();
  });

  // Inbox, preferences and devices. Skips itself when the API under test
  // predates the inbox (404 on the route).
  it("notifications inbox + preferences, device register → list → remove", async () => {
    const client = createClient({
      baseUrl: LIVE,
      tokenStore: inMemoryStore(),
      client: { platform: "web", version: "journey" },
    });
    await client.auth.login({ email: EMAIL, password: PASSWORD });

    const page = await client.notifications.list({ limit: 10 }).catch((e: unknown) => {
      if (isApiError(e) && e.status === 404) return null;
      throw e;
    });
    if (!page) {
      console.warn("live journey: no notifications inbox on this API, skipping the scenario");
      return;
    }
    expect(Array.isArray(page.items)).toBe(true);
    expect(typeof page.unread_count).toBe("number");
    expect(page.next_cursor === null || typeof page.next_cursor === "string").toBe(true);
    for (const n of page.items) {
      expect(n.id).toBeTruthy();
      expect(["money", "card", "security", "account", "marketing"]).toContain(n.category);
      expect(typeof n.title).toBe("string");
      expect(n.href === null || n.href.startsWith("/")).toBe(true);
    }
    // The user_registered item may or may not exist for a seeded account;
    // no assertion on it. Filters and the count endpoint still answer.
    const unread = await client.notifications.list({ unreadOnly: true, category: "money" });
    expect(unread.items.every((n) => n.read_at === null && n.category === "money")).toBe(true);
    expect(typeof (await client.notifications.unreadCount())).toBe("number");
    if (page.items[0]) {
      const read = await client.notifications.markRead(page.items[0].id);
      expect(read.id).toBe(page.items[0].id);
      expect(read.read_at).not.toBeNull();
    }
    expect(typeof (await client.notifications.markAllRead()).marked).toBe("number");

    const prefs = await client.notifications.getPreferences();
    expect(Array.isArray(prefs.available_channels), `prefs (got ${JSON.stringify(prefs)})`).toBe(true);
    expect(typeof prefs.categories).toBe("object");
    const ru = await client.notifications.setPreferences({ locale: "ru" });
    expect(ru.locale).toBe("ru");
    const back = await client.notifications.setPreferences({ locale: prefs.locale });
    expect(back.locale).toBe(prefs.locale);
    // Unknown locale → 400, not 500.
    const badLocale = await client.notifications
      .setPreferences({ locale: "xx" })
      .then(() => null)
      .catch((e) => e);
    expect(isApiError(badLocale), `expected ApiError, got ${badLocale}`).toBe(true);
    expect((badLocale as ApiError).status).toBe(400);

    const dev = await client.devices.register({
      kind: "telegram_miniapp",
      platform: "telegram",
      credential: {},
      label: "journey",
    });
    expect(dev.id, `device (got ${JSON.stringify(dev)})`).toBeTruthy();
    expect(dev.kind).toBe("telegram_miniapp");
    expect(dev.platform).toBe("telegram");
    const devices = await client.devices.list();
    const mine = devices.find((d) => d.id === dev.id);
    expect(mine, "registered device appears in the list").toBeTruthy();
    expect(mine!.is_current).toBe(true);
    expect(mine!.app_version).toBe("journey");
    // Registering the same marker again is idempotent (200, same id).
    const again = await client.devices.register({ kind: "telegram_miniapp", platform: "telegram", credential: {} });
    expect(again.id).toBe(dev.id);
    await client.devices.remove(dev.id);
    expect((await client.devices.list()).some((d) => d.id === dev.id)).toBe(false);
    const gone = await client.devices.remove(dev.id).then(() => null).catch((e) => e);
    expect(isApiError(gone), `expected ApiError, got ${gone}`).toBe(true);
    expect((gone as ApiError).status).toBe(404);

    await client.auth.signOut();
  });

  // Error-shape contract a Cusfront relies on: predictable HTTP statuses +
  // typed ApiError. Catches backend regressions that turn a 4xx into a 500.
  it("surfaces typed errors with sane statuses", async () => {
    const client = createClient({ baseUrl: LIVE, tokenStore: inMemoryStore() });
    await client.auth.login({ email: EMAIL, password: PASSWORD });

    // Unknown card → 404, not 500.
    const noCard = await client.cards
      .get("00000000-0000-0000-0000-000000000000")
      .then(() => null)
      .catch((e) => e);
    expect(isApiError(noCard), `expected ApiError, got ${noCard}`).toBe(true);
    expect((noCard as ApiError).status).toBe(404);

    // Bad currency on deposit → 400, not 500.
    const badCcy = await client.deposits
      .initiate({ amount: "1.00", currency: "ZZZ", method: "card", idempotencyKey: uuid() })
      .then(() => null)
      .catch((e) => e);
    expect(isApiError(badCcy), `expected ApiError, got ${badCcy}`).toBe(true);
    expect((badCcy as ApiError).status, `bad-currency status (msg: ${(badCcy as ApiError).message})`).toBe(400);

    // Unauthenticated balance → 401.
    const anon = createClient({ baseUrl: LIVE, tokenStore: inMemoryStore() });
    const noAuth = await anon.balance.get(CCY).then(() => null).catch((e) => e);
    expect(isApiError(noAuth), `expected ApiError, got ${noAuth}`).toBe(true);
    expect((noAuth as ApiError).status).toBe(401);
  });
});

/**
 * Telegram link journey. Needs the API's bot token to sign `initData` the way
 * Telegram does, so it only runs with `LIVE_TELEGRAM_BOT_TOKEN` set to the
 * token the API under test is configured with.
 */
const BOT_TOKEN = process.env.LIVE_TELEGRAM_BOT_TOKEN;

/** Sign `initData` exactly as Telegram does for a Mini App launch. */
function signInitData(botToken: string, fields: Record<string, string>): string {
  const dataCheckString = Object.keys(fields)
    .sort()
    .map((k) => `${k}=${fields[k]}`)
    .join("\n");
  const secret = createHmac("sha256", "WebAppData").update(botToken).digest();
  const hash = createHmac("sha256", secret).update(dataCheckString).digest("hex");
  const sp = new URLSearchParams(fields);
  sp.set("hash", hash);
  return sp.toString();
}

describe.runIf((await reachable()) && Boolean(BOT_TOKEN))("live Telegram link journey", () => {
  it("register → exchange(provision:false) unknown → link → exchange → unlink", async () => {
    const email = `journey-tg-${uuid()}@example.com`;
    const password = "Journey-Passw0rd-tg";
    const tgId = 100_000_000 + Math.floor(Math.random() * 900_000_000);
    const initData = signInitData(BOT_TOKEN!, {
      auth_date: String(Math.floor(Date.now() / 1000)),
      query_id: `AAH${uuid().replace(/-/g, "").slice(0, 16)}`,
      user: JSON.stringify({ id: tgId, first_name: "Journey", username: `journey_${tgId}` }),
    });

    // --- an email account exists first ------------------------------------
    const owner = createClient({ baseUrl: LIVE, tokenStore: inMemoryStore() });
    const registered = await owner.auth.register({ email, password, wallet_currency: CCY });
    expect(registered.user.email).toBe(email);
    expect(registered.user.telegram ?? null).toBeNull();

    // --- Mini App opens: unknown Telegram, nothing created ------------------
    const app = createClient({ baseUrl: LIVE, tokenStore: inMemoryStore() });
    const first = await app.auth.exchangeTelegram({ initData, provision: false });
    expect(first, `first exchange (got ${JSON.stringify(first)})`).toEqual({ stage: "unknown" });
    expect(await app.tokens.get()).toBeNull();

    // --- "I already have an account" ---------------------------------------
    const linked = await app.auth.linkTelegram({ initData, email, password });
    expect(linked.stage).toBe("jwt");
    expect(linked.user.id).toBe(registered.user.id);
    expect(linked.user.telegram, `telegram on link (got ${JSON.stringify(linked.user)})`).not.toBeNull();
    expect(linked.user.telegram?.username).toBe(`journey_${tgId}`);
    expect(typeof linked.user.telegram?.linked_at).toBe("string");
    expect(await app.tokens.get()).toBe(linked.access_token);

    // --- next launch: the exchange finds the link -------------------------
    const again = createClient({ baseUrl: LIVE, tokenStore: inMemoryStore() });
    const second = await again.auth.exchangeTelegram({ initData, provision: false });
    expect(second.stage).toBe("jwt");
    if (second.stage !== "jwt") throw new Error("not jwt");
    expect(second.user.id).toBe(registered.user.id);
    const me = await again.auth.me();
    expect(me.telegram?.username).toBe(`journey_${tgId}`);

    // --- unlink from a signed-in session ----------------------------------
    const unlinked = await again.me.unlinkTelegram();
    expect(unlinked.id).toBe(registered.user.id);
    expect(unlinked.telegram).toBeNull();

    // A second unlink has nothing to remove.
    const twice = await again.me.unlinkTelegram().then(() => null).catch((e) => e);
    expect(isApiError(twice), `expected ApiError, got ${twice}`).toBe(true);
    expect((twice as ApiError).status).toBe(404);
  });
});
