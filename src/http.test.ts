import { describe, expect, it } from "vitest";
import { HttpClient } from "./http.js";
import { inMemoryStore } from "./token-store.js";
import { ApiError, NetworkError } from "./error.js";

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
