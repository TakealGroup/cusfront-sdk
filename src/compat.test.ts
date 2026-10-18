import { describe, expect, it, vi } from "vitest";
import { createClient, inMemoryStore, SUPPORTED_MEISTER, satisfies } from "./index.js";

describe("satisfies", () => {
  const range = ">=0.5.0, <0.6.0";

  it("accepts versions inside the range", () => {
    expect(satisfies("0.5.0", range)).toBe(true);
    expect(satisfies("0.5.17", range)).toBe(true);
    expect(satisfies("v0.5.2", range)).toBe(true);
    expect(satisfies("0.5.2+build.7", range)).toBe(true);
  });

  it("rejects versions outside the range", () => {
    expect(satisfies("0.4.99", range)).toBe(false);
    expect(satisfies("0.6.0", range)).toBe(false);
    expect(satisfies("1.0.0", range)).toBe(false);
  });

  it("handles every comparator and a bare version", () => {
    expect(satisfies("1.2.3", ">1.2.2")).toBe(true);
    expect(satisfies("1.2.3", ">1.2.3")).toBe(false);
    expect(satisfies("1.2.3", "<=1.2.3")).toBe(true);
    expect(satisfies("1.2.4", "<=1.2.3")).toBe(false);
    expect(satisfies("1.2.3", "=1.2.3")).toBe(true);
    expect(satisfies("1.2.3", "1.2.3")).toBe(true);
    expect(satisfies("1.2.4", "1.2.3")).toBe(false);
  });

  it("keeps prereleases out unless named exactly", () => {
    expect(satisfies("0.5.1-rc.1", range)).toBe(false);
    expect(satisfies("0.6.0-rc.1", range)).toBe(false);
    expect(satisfies("0.5.1-rc.1", "=0.5.1-rc.1")).toBe(true);
    expect(satisfies("0.5.1-rc.1", "0.5.1-rc.2")).toBe(false);
  });

  it("is false for anything unparseable", () => {
    expect(satisfies("dev", range)).toBe(false);
    expect(satisfies("0.5", range)).toBe(false);
    expect(satisfies("0.5.0", "")).toBe(false);
    expect(satisfies("0.5.0", "~0.5")).toBe(false);
  });
});

describe("client.ready()", () => {
  function clientAnswering(status: number, body: unknown) {
    const fetch = vi.fn(
      async (_url: string | URL | Request, _init?: RequestInit) =>
        new Response(JSON.stringify(body), {
          status,
          headers: { "Content-Type": "application/json" },
        }),
    );
    const client = createClient({
      baseUrl: "https://api.example.test",
      tokenStore: inMemoryStore(),
      fetch: fetch as unknown as typeof globalThis.fetch,
    });
    return { client, fetch };
  }

  it("calls the unversioned /ready without a token", async () => {
    const tokens = inMemoryStore();
    await tokens.set("jwt-123");
    const fetch = vi.fn(
      async (_url: string | URL | Request, _init?: RequestInit) =>
        new Response(JSON.stringify({ status: "ready", ops: { platform_version: "0.6.7" } })),
    );
    const client = createClient({
      baseUrl: "https://api.example.test/",
      tokenStore: tokens,
      fetch: fetch as unknown as typeof globalThis.fetch,
    });
    await client.ready();
    const [url, init] = fetch.mock.calls[0]!;
    expect(url).toBe("https://api.example.test/ready");
    expect((init?.headers as Record<string, string>)["Authorization"]).toBeUndefined();
  });

  it("is compatible when the platform version is in range", async () => {
    const { client } = clientAnswering(200, {
      status: "ready",
      ops: { version: "0.6.7", platform_version: "0.6.9" },
    });
    const r = await client.ready();
    expect(r).toMatchObject({
      compatible: true,
      platformVersion: "0.6.9",
      supportedMeister: SUPPORTED_MEISTER,
      healthy: true,
      status: "ready",
    });
    expect(r.warning).toBeUndefined();
  });

  it("warns when the platform version is out of range", async () => {
    const { client } = clientAnswering(200, {
      status: "ready",
      ops: { platform_version: "0.7.1" },
    });
    const r = await client.ready();
    expect(r.compatible).toBe(false);
    expect(r.platformVersion).toBe("0.7.1");
    expect(r.warning).toContain("0.7.1");
    expect(r.warning).toContain(SUPPORTED_MEISTER);
  });

  it("treats a platform that reports no version as incompatible", async () => {
    const { client } = clientAnswering(200, { status: "ready", ops: { version: "0.4.17" } });
    const r = await client.ready();
    expect(r.compatible).toBe(false);
    expect(r.platformVersion).toBeNull();
    expect(r.warning).toMatch(/didn't report its version/);
  });

  it("returns the body of a degraded platform instead of throwing", async () => {
    const { client } = clientAnswering(503, {
      status: "degraded",
      ops: { platform_version: "0.6.7" },
    });
    const r = await client.ready();
    expect(r).toMatchObject({ compatible: true, healthy: false, status: "degraded" });
  });

  it("still throws on other failures", async () => {
    const { client } = clientAnswering(500, { code: "internal", message: "boom" });
    await expect(client.ready()).rejects.toMatchObject({ isApiError: true, status: 500 });
  });
});

describe("SUPPORTED_MEISTER", () => {
  it("is a range CI can read and the helper can parse", () => {
    expect(SUPPORTED_MEISTER).toMatch(/^[<>=]{1,2}\d+\.\d+\.\d+(, [<>=]{1,2}\d+\.\d+\.\d+)*$/);
    expect(satisfies("0.6.6", SUPPORTED_MEISTER)).toBe(false);
    expect(satisfies("0.6.7", SUPPORTED_MEISTER)).toBe(true);
  });
});
