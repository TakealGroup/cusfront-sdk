import { describe, expect, it } from "vitest";
import { createClient, inMemoryStore, resolveAssetUrl } from "./index.js";

/**
 * `resolveAssetUrl` / `client.assetUrl`: image URLs from the API are either
 * absolute (uploaded artwork) or relative to the API origin (the default card
 * design). The helper joins the relative ones onto the client's base URL and
 * never adds the `/v1` prefix — these are host-level paths.
 */
describe("resolveAssetUrl", () => {
  it("leaves absolute URLs untouched", () => {
    const base = "https://api.example.com";
    expect(resolveAssetUrl(base, "https://cdn.example.com/a.png")).toBe(
      "https://cdn.example.com/a.png",
    );
    expect(resolveAssetUrl(base, "http://other.test/b.webp")).toBe("http://other.test/b.webp");
    expect(resolveAssetUrl(base, "//cdn.example.com/c.png")).toBe("//cdn.example.com/c.png");
    expect(resolveAssetUrl(base, "data:image/svg+xml;base64,AAA")).toBe(
      "data:image/svg+xml;base64,AAA",
    );
  });

  it("joins a relative path onto the API origin without a /v1 prefix", () => {
    expect(resolveAssetUrl("https://api.example.com", "/card-designs/default.svg")).toBe(
      "https://api.example.com/card-designs/default.svg",
    );
    // Trailing slash on the base and a missing leading slash on the path are both tolerated.
    expect(resolveAssetUrl("https://api.example.com/", "/card-designs/default.svg")).toBe(
      "https://api.example.com/card-designs/default.svg",
    );
    expect(resolveAssetUrl("https://api.example.com", "card-designs/default.svg")).toBe(
      "https://api.example.com/card-designs/default.svg",
    );
  });

  it("client.assetUrl uses the client's baseUrl", () => {
    const client = createClient({
      baseUrl: "https://api.example.com",
      tokenStore: inMemoryStore(),
      fetch: async () => new Response("{}"),
    });
    expect(client.assetUrl("/card-designs/default.svg")).toBe(
      "https://api.example.com/card-designs/default.svg",
    );
    expect(client.assetUrl("https://api.example.com/assets/k.png")).toBe(
      "https://api.example.com/assets/k.png",
    );
  });
});
