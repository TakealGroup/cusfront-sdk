import { afterEach, describe, expect, it } from "vitest";
import {
  clientHeaderValue,
  detectClientPlatform,
  resolveClientDescriptor,
} from "./client-platform.js";
import { SDK_VERSION } from "./version.js";

/**
 * Platform detection runs against `globalThis`, so each case stubs the
 * relevant global and the `afterEach` puts it back. The suite runs under
 * Node (no `navigator`, no `matchMedia`), which is also the "non-browser →
 * web" case.
 */

type G = Record<string, unknown>;
const g = globalThis as unknown as G;
const saved: Partial<Record<"Telegram" | "navigator" | "matchMedia", unknown>> = {};

function stub(name: "Telegram" | "navigator" | "matchMedia", value: unknown) {
  if (!(name in saved)) saved[name] = g[name];
  Object.defineProperty(g, name, { value, configurable: true, writable: true });
}

afterEach(() => {
  for (const name of Object.keys(saved) as Array<keyof typeof saved>) {
    const original = saved[name];
    if (original === undefined) delete g[name];
    else Object.defineProperty(g, name, { value: original, configurable: true, writable: true });
    delete saved[name];
  }
});

describe("detectClientPlatform", () => {
  it("is `web` outside a browser", () => {
    expect(detectClientPlatform()).toBe("web");
  });

  it("is `telegram-miniapp` when Telegram.WebApp.initData is non-empty", () => {
    stub("Telegram", { WebApp: { initData: "query_id=AAH&hash=abc" } });
    expect(detectClientPlatform()).toBe("telegram-miniapp");
  });

  it("ignores an empty initData (page opened outside Telegram with the SDK script loaded)", () => {
    stub("Telegram", { WebApp: { initData: "" } });
    expect(detectClientPlatform()).toBe("web");
  });

  it("is `pwa` for iOS standalone", () => {
    stub("navigator", { standalone: true });
    expect(detectClientPlatform()).toBe("pwa");
  });

  it("is `pwa` when display-mode is standalone", () => {
    stub("navigator", {});
    stub("matchMedia", (q: string) => ({ matches: q === "(display-mode: standalone)" }));
    expect(detectClientPlatform()).toBe("pwa");
  });

  it("is `web` in a browser tab", () => {
    stub("navigator", {});
    stub("matchMedia", () => ({ matches: false }));
    expect(detectClientPlatform()).toBe("web");
  });

  it("prefers Telegram over an installed PWA", () => {
    stub("Telegram", { WebApp: { initData: "hash=abc" } });
    stub("navigator", { standalone: true });
    expect(detectClientPlatform()).toBe("telegram-miniapp");
  });
});

describe("resolveClientDescriptor / clientHeaderValue", () => {
  it("fills in the detected platform and the SDK version", () => {
    expect(resolveClientDescriptor(undefined)).toEqual({ platform: "web", version: SDK_VERSION });
    expect(clientHeaderValue(resolveClientDescriptor(undefined))).toBe(`web; ${SDK_VERSION}`);
  });

  it("keeps a given platform and version", () => {
    const d = resolveClientDescriptor({ platform: "ios", version: "1.0" });
    expect(d).toEqual({ platform: "ios", version: "1.0" });
    expect(clientHeaderValue(d)).toBe("ios; 1.0");
  });

  it("falls back to the SDK version for a platform-only descriptor", () => {
    expect(clientHeaderValue(resolveClientDescriptor({ platform: "android" }))).toBe(
      `android; ${SDK_VERSION}`,
    );
  });
});
