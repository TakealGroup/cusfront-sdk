import { describe, expect, it } from "vitest";
import {
  parseInitData,
  assertWellFormed,
  InitDataError,
  fromInitData,
  readWebAppInitData,
  fromTelegramWebApp,
} from "./telegram.js";
import { inMemoryStore } from "./token-store.js";
import type { FetchLike } from "./http.js";

/**
 * Telegram Mini App adapter tests. No live backend — a captured fake `fetch`
 * asserts the exchange wire shape, and the structural validators are exercised
 * directly. The HMAC itself is never validated client-side (no bot token), so
 * these tests only cover well-formedness + transport.
 */

function makeInitData(authDate: number, userId = 777000): string {
  const user = JSON.stringify({
    id: userId,
    first_name: "Alice",
    last_name: "Tester",
    username: "alice_tg",
    is_premium: true,
  });
  const sp = new URLSearchParams();
  sp.set("query_id", "AAHscript");
  sp.set("user", user);
  sp.set("auth_date", String(authDate));
  sp.set("hash", "deadbeefcafe");
  return sp.toString();
}

const NOW = 1_700_000_000;

describe("parseInitData", () => {
  it("decodes the user JSON + numeric fields and keeps the raw string", () => {
    const raw = makeInitData(NOW);
    const parsed = parseInitData(raw);
    expect(parsed.raw).toBe(raw);
    expect(parsed.hash).toBe("deadbeefcafe");
    expect(parsed.auth_date).toBe(NOW);
    expect(parsed.user?.id).toBe(777000);
    expect(parsed.user?.username).toBe("alice_tg");
    expect(parsed.user?.is_premium).toBe(true);
  });

  it("tolerates an unparseable user field", () => {
    const sp = new URLSearchParams({ user: "not-json", auth_date: "1", hash: "x" });
    const parsed = parseInitData(sp.toString());
    expect(parsed.user).toBeUndefined();
    expect(parsed.hash).toBe("x");
  });
});

describe("assertWellFormed", () => {
  it("accepts a structurally-valid, fresh payload", () => {
    const parsed = assertWellFormed(makeInitData(NOW), { nowUnix: NOW + 30 });
    expect(parsed.user?.id).toBe(777000);
  });

  it("rejects empty / missing hash / missing auth_date / bad user", () => {
    expect(() => assertWellFormed("")).toThrow(InitDataError);

    const noHash = new URLSearchParams({
      user: JSON.stringify({ id: 1 }),
      auth_date: String(NOW),
    }).toString();
    expect(() => assertWellFormed(noHash, { nowUnix: NOW })).toThrowError(
      /missing `hash`/,
    );

    const noDate = new URLSearchParams({
      user: JSON.stringify({ id: 1 }),
      hash: "x",
    }).toString();
    expect(() => assertWellFormed(noDate)).toThrowError(/auth_date/);

    const noUser = new URLSearchParams({
      auth_date: String(NOW),
      hash: "x",
    }).toString();
    expect(() => assertWellFormed(noUser, { nowUnix: NOW })).toThrowError(/`user`/);
  });

  it("rejects a stale payload but honours maxAgeSeconds=0", () => {
    const raw = makeInitData(NOW);
    expect(() =>
      assertWellFormed(raw, { nowUnix: NOW + 2 * 86_400, maxAgeSeconds: 86_400 }),
    ).toThrowError(/stale/);
    // window disabled → no throw even when ancient.
    expect(
      assertWellFormed(raw, { nowUnix: NOW + 10 * 86_400, maxAgeSeconds: 0 }).user?.id,
    ).toBe(777000);
  });
});

describe("fromInitData", () => {
  it("POSTs /auth/telegram/exchange with {init_data}, stores the JWT, returns a client", async () => {
    const captured: { url: string; init: RequestInit }[] = [];
    const fake: FetchLike = async (url, init) => {
      captured.push({ url: String(url), init: init ?? {} });
      return new Response(
        JSON.stringify({
          stage: "jwt",
          access_token: "jwt-tg-123",
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
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    };

    const store = inMemoryStore();
    const raw = makeInitData(NOW);
    const client = await fromInitData(
      raw,
      { baseUrl: "https://api.test", tokenStore: store, fetch: fake },
      { nowUnix: NOW + 5 },
    );

    expect(captured).toHaveLength(1);
    expect(captured[0]!.url).toBe("https://api.test/v1/auth/telegram/exchange");
    expect(captured[0]!.init.method).toBe("POST");
    expect(JSON.parse(captured[0]!.init.body as string)).toEqual({ init_data: raw });
    // Exchange is unauthenticated — no bearer on the request.
    const hdrs = (captured[0]!.init.headers ?? {}) as Record<string, string>;
    expect(hdrs["Authorization"]).toBeUndefined();
    // JWT persisted for subsequent client.* calls.
    expect(await client.tokens.get()).toBe("jwt-tg-123");
    expect(typeof client.auth.linkEmail).toBe("function");
  });

  it("fails fast on malformed initData without hitting the network", async () => {
    let called = false;
    const fake: FetchLike = async () => {
      called = true;
      return new Response("{}", { status: 200 });
    };
    await expect(
      fromInitData("", { baseUrl: "https://api.test", tokenStore: inMemoryStore(), fetch: fake }),
    ).rejects.toBeInstanceOf(InitDataError);
    expect(called).toBe(false);
  });
});

describe("readWebAppInitData / fromTelegramWebApp", () => {
  it("returns null outside a Telegram Mini App", () => {
    expect(readWebAppInitData()).toBeNull();
  });

  it("fromTelegramWebApp throws when not inside Telegram", async () => {
    await expect(
      fromTelegramWebApp({ baseUrl: "https://api.test", tokenStore: inMemoryStore() }),
    ).rejects.toBeInstanceOf(InitDataError);
  });
});
