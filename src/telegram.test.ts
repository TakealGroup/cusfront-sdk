import { describe, expect, it, vi } from "vitest";
import {
  parseInitData,
  assertWellFormed,
  InitDataError,
  fromInitData,
  exchangeInitData,
  TelegramUnknownError,
  readWebAppInitData,
  fromTelegramWebApp,
} from "./telegram.js";
import { inMemoryStore } from "./token-store.js";
import { isApiError, type ApiError } from "./error.js";
import type { FetchLike } from "./http.js";
import { SDK_VERSION } from "./version.js";

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
    language_code: "ru",
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

const JWT_SESSION = {
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
};

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
    expect(() => assertWellFormed(noHash, { nowUnix: NOW })).toThrowError(/missing `hash`/);

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
    expect(assertWellFormed(raw, { nowUnix: NOW + 10 * 86_400, maxAgeSeconds: 0 }).user?.id).toBe(
      777000,
    );
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

    // Exchange, then the Mini App registers itself as a device.
    expect(captured).toHaveLength(2);
    expect(captured[0]!.url).toBe("https://api.test/v1/auth/telegram/exchange");
    expect(captured[0]!.init.method).toBe("POST");
    expect(JSON.parse(captured[0]!.init.body as string)).toEqual({ init_data: raw });
    // Exchange is unauthenticated — no bearer on the request.
    const hdrs = (captured[0]!.init.headers ?? {}) as Record<string, string>;
    expect(hdrs["Authorization"]).toBeUndefined();
    // The client announces the Mini App platform.
    expect(hdrs["X-Takeal-Client"]).toBe(`telegram-miniapp; ${SDK_VERSION}`);
    expect(client.client.platform).toBe("telegram-miniapp");
    // JWT persisted for subsequent client.* calls.
    expect(await client.tokens.get()).toBe("jwt-tg-123");
    expect(typeof client.auth.linkEmail).toBe("function");

    expect(captured[1]!.url).toBe("https://api.test/v1/me/devices");
    expect(captured[1]!.init.method).toBe("PUT");
    const devHdrs = (captured[1]!.init.headers ?? {}) as Record<string, string>;
    expect(devHdrs["Authorization"]).toBe("Bearer jwt-tg-123");
    expect(JSON.parse(captured[1]!.init.body as string)).toEqual({
      kind: "telegram_miniapp",
      platform: "telegram",
      credential: {},
      locale: "ru",
      app_version: SDK_VERSION,
    });
  });

  it("keeps a given client version but forces the telegram-miniapp platform", async () => {
    const captured: { url: string; init: RequestInit }[] = [];
    const fake: FetchLike = async (url, init) => {
      captured.push({ url: String(url), init: init ?? {} });
      return new Response(JSON.stringify({ stage: "unknown" }), { status: 200 });
    };
    await exchangeInitData(
      makeInitData(NOW),
      {
        baseUrl: "https://api.test",
        tokenStore: inMemoryStore(),
        fetch: fake,
        client: { platform: "web", version: "2.1.0" },
      },
      { nowUnix: NOW + 5 },
    );
    const hdrs = (captured[0]!.init.headers ?? {}) as Record<string, string>;
    expect(hdrs["X-Takeal-Client"]).toBe("telegram-miniapp; 2.1.0");
  });

  it("device registration is best-effort: a failure warns and the client is still returned", async () => {
    const captured: { url: string; init: RequestInit }[] = [];
    const fake: FetchLike = async (url, init) => {
      captured.push({ url: String(url), init: init ?? {} });
      if (String(url).endsWith("/me/devices")) {
        return new Response(JSON.stringify({ code: "validation", message: "nope" }), {
          status: 400,
        });
      }
      return new Response(JSON.stringify(JWT_SESSION), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    try {
      const client = await fromInitData(
        makeInitData(NOW),
        { baseUrl: "https://api.test", tokenStore: inMemoryStore(), fetch: fake },
        { nowUnix: NOW + 5 },
      );
      expect(await client.tokens.get()).toBe("jwt-tg-123");
      expect(captured).toHaveLength(2);
      expect(warn).toHaveBeenCalledTimes(1);
      expect(String(warn.mock.calls[0]![0])).toMatch(/could not register the Mini App/);
    } finally {
      warn.mockRestore();
    }
  });

  it("registerDevice: false skips the device call", async () => {
    const captured: { url: string; init: RequestInit }[] = [];
    const fake: FetchLike = async (url, init) => {
      captured.push({ url: String(url), init: init ?? {} });
      return new Response(JSON.stringify(JWT_SESSION), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };
    await fromInitData(
      makeInitData(NOW),
      { baseUrl: "https://api.test", tokenStore: inMemoryStore(), fetch: fake },
      { nowUnix: NOW + 5, registerDevice: false },
    );
    expect(captured.map((c) => c.url)).toEqual(["https://api.test/v1/auth/telegram/exchange"]);
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

describe("fromInitData / exchangeInitData with provision:false", () => {
  function unknownFetch(captured: { url: string; init: RequestInit }[]): FetchLike {
    return async (url, init) => {
      captured.push({ url: String(url), init: init ?? {} });
      return new Response(
        JSON.stringify({ code: "telegram_unknown", message: "no account for this Telegram" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    };
  }

  it("fromInitData throws TelegramUnknownError carrying the initData; nothing stored", async () => {
    const captured: { url: string; init: RequestInit }[] = [];
    const store = inMemoryStore();
    const raw = makeInitData(NOW);
    const err = await fromInitData(
      raw,
      { baseUrl: "https://api.test", tokenStore: store, fetch: unknownFetch(captured) },
      { nowUnix: NOW + 5, provision: false },
    )
      .then(() => null)
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(TelegramUnknownError);
    expect((err as TelegramUnknownError).name).toBe("TelegramUnknownError");
    expect((err as TelegramUnknownError).initData).toBe(raw);
    expect(JSON.parse(captured[0]!.init.body as string)).toEqual({
      init_data: raw,
      provision: false,
    });
    expect(await store.get()).toBeNull();
  });

  it("exchangeInitData resolves {session: unknown} with an unauthenticated client", async () => {
    const captured: { url: string; init: RequestInit }[] = [];
    const store = inMemoryStore();
    const raw = makeInitData(NOW);
    const { client, session } = await exchangeInitData(
      raw,
      { baseUrl: "https://api.test", tokenStore: store, fetch: unknownFetch(captured) },
      { nowUnix: NOW + 5, provision: false },
    );
    expect(session).toEqual({ stage: "unknown" });
    expect(await client.tokens.get()).toBeNull();
    // The client is usable for the follow-up call.
    expect(typeof client.auth.linkTelegram).toBe("function");
  });

  it("provision is omitted from the body unless given", async () => {
    const captured: { url: string; init: RequestInit }[] = [];
    const raw = makeInitData(NOW);
    await exchangeInitData(
      raw,
      { baseUrl: "https://api.test", tokenStore: inMemoryStore(), fetch: unknownFetch(captured) },
      { nowUnix: NOW + 5 },
    ).catch(() => undefined);
    expect(JSON.parse(captured[0]!.init.body as string)).toEqual({ init_data: raw });
  });

  it("other error codes still surface as ApiError", async () => {
    const fake: FetchLike = async () =>
      new Response(JSON.stringify({ code: "invalid_init_data", message: "bad hash" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    const err = await fromInitData(
      makeInitData(NOW),
      { baseUrl: "https://api.test", tokenStore: inMemoryStore(), fetch: fake },
      { nowUnix: NOW + 5, provision: false },
    )
      .then(() => null)
      .catch((e: unknown) => e);
    expect(isApiError(err)).toBe(true);
    expect((err as ApiError).status).toBe(401);
    expect((err as ApiError).code).toBe("invalid_init_data");
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
