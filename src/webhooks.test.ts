import { describe, expect, it } from "vitest";
import {
  verifyWebhook,
  computeSignature,
  SIGNATURE_HEADER,
  EVENT_ID_HEADER,
  EVENT_TYPE_HEADER,
} from "./webhooks.js";

/**
 * Verifier coverage. The known vector below was computed independently with
 * Node's `crypto.createHmac("sha256", secret).update(body).digest("hex")` —
 * the exact algorithm the Takeal API uses to sign webhooks (raw body bytes,
 * lowercase hex, `sha256=` prefix).
 * Matching it proves the SDK reproduces the Takeal API's signing byte-for-byte.
 */

const SECRET = "whsec_test_secret";
const BODY =
  '{"event_type":"deposit.confirmed","id":"11111111-1111-1111-1111-111111111111"}';
const KNOWN_SIG =
  "sha256=da5b556196884d5ef73cf3bd4a1a4de06a63f016373093fb55d6aeaaf73b3e32";

describe("webhook signature constants", () => {
  it("pins the exact Takeal header names", () => {
    expect(SIGNATURE_HEADER).toBe("X-Takeal-Signature");
    expect(EVENT_ID_HEADER).toBe("X-Takeal-Event-Id");
    expect(EVENT_TYPE_HEADER).toBe("X-Takeal-Event-Type");
  });
});

describe("computeSignature", () => {
  it("reproduces the known Takeal vector exactly", async () => {
    const sig = await computeSignature(SECRET, BODY);
    expect(sig).toBe(KNOWN_SIG);
  });

  it("emits sha256=<64 lowercase hex chars>", async () => {
    const sig = await computeSignature(SECRET, "anything");
    expect(sig).toMatch(/^sha256=[0-9a-f]{64}$/);
  });
});

describe("verifyWebhook", () => {
  it("accepts a valid signature (full sha256= header form)", async () => {
    const ok = await verifyWebhook({
      payload: BODY,
      signatureHeader: KNOWN_SIG,
      secret: SECRET,
    });
    expect(ok).toBe(true);
  });

  it("accepts a bare hex digest (no sha256= prefix)", async () => {
    const ok = await verifyWebhook({
      payload: BODY,
      signatureHeader: KNOWN_SIG.slice("sha256=".length),
      secret: SECRET,
    });
    expect(ok).toBe(true);
  });

  it("accepts the payload as raw bytes (Uint8Array)", async () => {
    const ok = await verifyWebhook({
      payload: new TextEncoder().encode(BODY),
      signatureHeader: KNOWN_SIG,
      secret: SECRET,
    });
    expect(ok).toBe(true);
  });

  it("rejects a tampered body", async () => {
    const ok = await verifyWebhook({
      payload: BODY.replace("confirmed", "failed"),
      signatureHeader: KNOWN_SIG,
      secret: SECRET,
    });
    expect(ok).toBe(false);
  });

  it("rejects a wrong secret", async () => {
    const ok = await verifyWebhook({
      payload: BODY,
      signatureHeader: KNOWN_SIG,
      secret: "whsec_wrong",
    });
    expect(ok).toBe(false);
  });

  it("rejects a missing / empty signature header", async () => {
    expect(
      await verifyWebhook({ payload: BODY, signatureHeader: null, secret: SECRET }),
    ).toBe(false);
    expect(
      await verifyWebhook({ payload: BODY, signatureHeader: "", secret: SECRET }),
    ).toBe(false);
    expect(
      await verifyWebhook({
        payload: BODY,
        signatureHeader: undefined,
        secret: SECRET,
      }),
    ).toBe(false);
  });

  it("rejects a malformed signature (wrong length / non-hex)", async () => {
    expect(
      await verifyWebhook({
        payload: BODY,
        signatureHeader: "sha256=deadbeef",
        secret: SECRET,
      }),
    ).toBe(false);
    expect(
      await verifyWebhook({
        payload: BODY,
        signatureHeader: "sha256=" + "z".repeat(64),
        secret: SECRET,
      }),
    ).toBe(false);
  });

  it("rejects an empty secret", async () => {
    const ok = await verifyWebhook({
      payload: BODY,
      signatureHeader: KNOWN_SIG,
      secret: "",
    });
    expect(ok).toBe(false);
  });

  it("round-trips: computeSignature output verifies", async () => {
    const payload = '{"event_type":"payment.succeeded","amount":"42.00"}';
    const sig = await computeSignature(SECRET, payload);
    expect(await verifyWebhook({ payload, signatureHeader: sig, secret: SECRET })).toBe(
      true,
    );
  });
});
