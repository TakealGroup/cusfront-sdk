import { describe, expect, it } from "vitest";
import { createClient } from "./index.js";

/**
 * Live smoke test — runs against a Takeal API assumed to be on
 * `http://localhost:7777`. Skipped when that's unreachable so the
 * CI runs (which don't spin up the stack) don't fail spuriously.
 *
 * Validates the wire shape end-to-end: SDK construct → login →
 * /auth/me round-trip. Exercises the JWT-store path + the typed
 * response discriminator.
 */

const LIVE = process.env.LIVE_API_URL ?? "http://localhost:7777";

async function reachable(): Promise<boolean> {
  try {
    const r = await fetch(`${LIVE}/health`, {
      signal: AbortSignal.timeout(800),
    });
    return r.ok;
  } catch {
    return false;
  }
}

describe.runIf(await reachable())("live API smoke", () => {
  it("logs alice in, /me returns her user", async () => {
    const client = createClient({ baseUrl: LIVE });

    const login = await client.auth.login({
      email: "alice@example.com",
      password: "hunter22supersecret",
    });
    expect(login.stage).toBe("jwt");
    if (login.stage !== "jwt") throw new Error("expected JWT stage");

    expect(login.user.email).toBe("alice@example.com");
    expect(login.user.role).toBe("user");

    // /auth/me now uses the stored token.
    const me = await client.auth.me();
    expect(me.email).toBe("alice@example.com");
    expect(me.id).toBe(login.user.id);

    await client.auth.signOut();
    const post = await client.tokens.get();
    expect(post).toBeNull();
  });
});
