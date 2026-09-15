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
