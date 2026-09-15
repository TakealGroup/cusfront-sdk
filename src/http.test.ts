import { describe, expect, it } from "vitest";
import { HttpClient } from "./http.js";
import { inMemoryStore } from "./token-store.js";
import { ApiError, NetworkError } from "./error.js";
import { createClient, SDK_VERSION } from "./index.js";

/**
 * Minimal happy-path + error-path coverage for the HTTP client.
 * Resources are tested at the resource level (per-file *.test.ts).
 */

const ok = (body: unknown, init?: ResponseInit): Response =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });

const err = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

describe("HttpClient", () => {
  it("attaches the bearer token from the store", async () => {
    let captured: RequestInit | undefined;
    const store = inMemoryStore();
    await store.set("test-jwt");

    const fake: typeof fetch = async (_url, init) => {
      captured = init;
      return ok({ ok: true });
    };
    const http = new HttpClient("https://example.test", store, fake);

    await http.get("/me");
    const headers = captured?.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer test-jwt");
  });

  it("skips auth when skipAuth is set", async () => {
    let captured: RequestInit | undefined;
    const store = inMemoryStore();
    await store.set("test-jwt");

    const fake: typeof fetch = async (_url, init) => {
      captured = init;
      return ok({ stage: "jwt" });
    };
    const http = new HttpClient("https://example.test", store, fake);

    await http.post("/auth/login", { body: { email: "a@b.c" }, skipAuth: true });
    const headers = (captured?.headers ?? {}) as Record<string, string>;
    expect(headers.Authorization).toBeUndefined();
  });

  it("maps a 403 response onto ApiError with the server code", async () => {
    const fake: typeof fetch = async () =>
      err(403, { code: "permission_required", message: "missing X" });
    const http = new HttpClient("https://example.test", inMemoryStore(), fake);

    await expect(http.get("/admin/whatever")).rejects.toMatchObject({
      isApiError: true,
      status: 403,
      code: "permission_required",
      message: "missing X",
    });
  });

  it("wraps fetch failures in NetworkError", async () => {
    const fake: typeof fetch = async () => {
      throw new TypeError("Failed to fetch");
    };
    const http = new HttpClient("https://example.test", inMemoryStore(), fake);

    await expect(http.get("/auth/me")).rejects.toMatchObject({
      isNetworkError: true,
    });
  });

  it("preserves an Idempotency-Key header when provided", async () => {
    let captured: RequestInit | undefined;
    const fake: typeof fetch = async (_url, init) => {
      captured = init;
      return ok({ id: "abc" }, { status: 201 });
    };
    const http = new HttpClient("https://example.test", inMemoryStore(), fake);

    await http.post("/me/deposits", {
      body: { amount: "10" },
      idempotencyKey: "key-42",
    });
    const headers = (captured?.headers ?? {}) as Record<string, string>;
    expect(headers["Idempotency-Key"]).toBe("key-42");
  });
});

describe("X-Takeal-Client", () => {
  function capture() {
    const calls: RequestInit[] = [];
    const fake: typeof fetch = async (_url, init) => {
      calls.push(init ?? {});
      return ok({});
    };
    return { calls, fake, headers: (i: number) => (calls[i]?.headers ?? {}) as Record<string, string> };
  }

  it("sends `<platform>; <version>` on every request when `client` is given", async () => {
    const { fake, headers } = capture();
    const client = createClient({
      baseUrl: "https://example.test",
      fetch: fake,
      tokenStore: inMemoryStore(),
      client: { platform: "pwa", version: "0.3.0" },
    });
    await client.branding.get();
    await client.auth.login({ email: "a@b.c", password: "x" }).catch(() => undefined);
    expect(headers(0)["X-Takeal-Client"]).toBe("pwa; 0.3.0");
    expect(headers(1)["X-Takeal-Client"]).toBe("pwa; 0.3.0");
    expect(client.client).toEqual({ platform: "pwa", version: "0.3.0" });
  });

  it("uses the SDK version when the app gives none", async () => {
    const { fake, headers } = capture();
    const client = createClient({
      baseUrl: "https://example.test",
      fetch: fake,
      tokenStore: inMemoryStore(),
      client: { platform: "android" },
    });
    await client.branding.get();
    expect(headers(0)["X-Takeal-Client"]).toBe(`android; ${SDK_VERSION}`);
  });

  it("defaults to `web` outside a browser and does not crash without navigator", async () => {
    const { fake, headers } = capture();
    const client = createClient({ baseUrl: "https://example.test", fetch: fake, tokenStore: inMemoryStore() });
    await client.branding.get();
    expect(headers(0)["X-Takeal-Client"]).toBe(`web; ${SDK_VERSION}`);
  });

  it("detects the Telegram Mini App from window.Telegram", async () => {
    const g = globalThis as { Telegram?: unknown };
    g.Telegram = { WebApp: { initData: "query_id=AAH&hash=abc" } };
    try {
      const { fake, headers } = capture();
      const client = createClient({ baseUrl: "https://example.test", fetch: fake, tokenStore: inMemoryStore() });
      await client.branding.get();
      expect(headers(0)["X-Takeal-Client"]).toBe(`telegram-miniapp; ${SDK_VERSION}`);
    } finally {
      delete g.Telegram;
    }
  });

  it("per-call headers still win over the defaults", async () => {
    let captured: RequestInit | undefined;
    const fake: typeof fetch = async (_url, init) => {
      captured = init;
      return ok({});
    };
    const http = new HttpClient("https://example.test", inMemoryStore(), fake, {
      "X-Takeal-Client": "web; 1.0",
    });
    await http.get("/me", { headers: { "X-Takeal-Client": "ios; 2.0" } });
    expect((captured?.headers as Record<string, string>)["X-Takeal-Client"]).toBe("ios; 2.0");
  });
});

// Surface-check the error classes hold their discriminator field. Cheap
// guard against accidentally renaming the field that consumers branch on.
describe("error guards", () => {
  it("ApiError carries isApiError=true", () => {
    const e = new ApiError(400, "validation", "bad");
    expect(e.isApiError).toBe(true);
    expect(e.status).toBe(400);
  });
  it("NetworkError carries isNetworkError=true", () => {
    const e = new NetworkError("offline");
    expect(e.isNetworkError).toBe(true);
  });
});
