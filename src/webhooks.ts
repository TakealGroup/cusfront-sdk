/**
 * `@takeal/cusfront-sdk/webhooks` — Takeal webhook signature verification.
 *
 * Pure + isomorphic: zero network, zero deps. Uses Web Crypto (`crypto.subtle`),
 * available natively in Node 18+, modern browsers, Bun, Deno, and Cloudflare
 * Workers. No Node `crypto` import, so the same bundle runs on the edge.
 *
 * ## What it verifies
 *
 * The signature is HMAC-SHA256 over the **raw request body bytes** with the
 * endpoint's webhook signing secret. Precisely:
 *  - **Algorithm:** HMAC-SHA256.
 *  - **Signed payload:** the verbatim request body bytes — NO timestamp prefix,
 *    NO canonicalisation, NO re-serialisation. Verify against the bytes you
 *    received off the wire, never against `JSON.stringify(parsedBody)` (key
 *    ordering / whitespace would differ and the check would fail).
 *  - **Header:** `X-Takeal-Signature: sha256=<lowercase-hex>` (lowercase hex,
 *    64 chars, `sha256=` prefix).
 *  - **No timestamp** in the signed material, so there is no replay window to
 *    enforce here. (Dedupe instead on the `X-Takeal-Event-Id` header.)
 *
 * @example
 * ```ts
 * import { verifyWebhook, SIGNATURE_HEADER } from "@takeal/cusfront-sdk/webhooks";
 *
 * // In a raw-body-aware handler:
 * const ok = await verifyWebhook({
 *   payload: rawBodyText,                 // string or Uint8Array — the EXACT bytes
 *   signatureHeader: req.headers[SIGNATURE_HEADER.toLowerCase()],
 *   secret: process.env.TAKEAL_WEBHOOK_SECRET!,
 * });
 * if (!ok) return res.status(401).end();
 * ```
 */

/** The header the Takeal API attaches the signature under. */
export const SIGNATURE_HEADER = "X-Takeal-Signature" as const;
/** Per-event id header — use it to dedupe deliveries. */
export const EVENT_ID_HEADER = "X-Takeal-Event-Id" as const;
/** Event-type header (e.g. `payment.succeeded`). */
export const EVENT_TYPE_HEADER = "X-Takeal-Event-Type" as const;

/** Prefix the Takeal API puts in front of the hex digest. */
const SIG_PREFIX = "sha256=";

export interface VerifyWebhookInput {
  /**
   * The EXACT request body as received — a UTF-8 string or the raw bytes.
   * Must be the unparsed body: re-serialising parsed JSON changes whitespace /
   * key order and breaks the signature.
   */
  payload: string | Uint8Array | ArrayBuffer;
  /**
   * The value of the `X-Takeal-Signature` header. Accepts the full
   * `sha256=<hex>` form or a bare hex digest. `null` / `undefined` → `false`.
   */
  signatureHeader: string | null | undefined;
  /** The endpoint's webhook signing secret (shared with the Takeal API). */
  secret: string;
}

/**
 * Verify a Takeal webhook signature. Resolves `true` iff the HMAC-SHA256 of
 * `payload` under `secret` matches `signatureHeader` (constant-time). Never
 * throws on a bad/missing signature — returns `false`. Throws only if Web
 * Crypto is entirely unavailable in the runtime.
 */
export async function verifyWebhook(input: VerifyWebhookInput): Promise<boolean> {
  const { payload, signatureHeader, secret } = input;
  if (!signatureHeader || !secret) return false;

  const providedHex = parseSignature(signatureHeader);
  if (providedHex === null) return false;

  const expectedHex = await hmacSha256Hex(secret, toBytes(payload));
  return timingSafeEqualHex(providedHex, expectedHex);
}

/**
 * Lower-level variant: compute the canonical `sha256=<hex>` header value for a
 * body. Handy for tests, for re-signing in a proxy, or for asserting against a
 * known vector. The output is byte-for-byte what the Takeal API emits.
 */
export async function computeSignature(
  secret: string,
  payload: string | Uint8Array | ArrayBuffer,
): Promise<string> {
  const hex = await hmacSha256Hex(secret, toBytes(payload));
  return `${SIG_PREFIX}${hex}`;
}

// --- internals --------------------------------------------------------------

/** Extract the lowercase hex digest from a header value, or `null` if malformed. */
function parseSignature(header: string): string | null {
  const raw = header.trim();
  const hex = raw.startsWith(SIG_PREFIX) ? raw.slice(SIG_PREFIX.length) : raw;
  // A SHA-256 digest is exactly 64 hex chars. Reject anything else early so a
  // garbage header can't reach the (still constant-time) compare with a length
  // that leaks via the early-return below.
  if (hex.length !== 64) return null;
  if (!/^[0-9a-fA-F]{64}$/.test(hex)) return null;
  return hex.toLowerCase();
}

function getSubtle(): SubtleCrypto {
  const c = (globalThis as { crypto?: Crypto }).crypto;
  if (!c || !c.subtle) {
    throw new Error(
      "@takeal/cusfront-sdk/webhooks: Web Crypto (crypto.subtle) is not " +
        "available in this runtime. Node >= 18, modern browsers, Bun, Deno, " +
        "and Workers all provide it.",
    );
  }
  return c.subtle;
}

async function hmacSha256Hex(secret: string, body: ArrayBuffer): Promise<string> {
  const subtle = getSubtle();
  const key = await subtle.importKey(
    "raw",
    encodeUtf8(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await subtle.sign("HMAC", key, body);
  return bytesToHex(new Uint8Array(sig));
}

/**
 * Normalise any accepted payload form into a plain `ArrayBuffer`. We hand the
 * `ArrayBuffer` (not a `Uint8Array` view) to Web Crypto so the typing is exact
 * across runtimes — lib.dom's `BufferSource` is strict about `SharedArrayBuffer`
 * -backed views, and a fresh copy sidesteps that entirely.
 */
function toBytes(payload: string | Uint8Array | ArrayBuffer): ArrayBuffer {
  if (typeof payload === "string") return encodeUtf8(payload);
  if (payload instanceof ArrayBuffer) return payload;
  // Copy the view's bytes into a standalone ArrayBuffer (handles offset/length
  // sub-views and SharedArrayBuffer-backed arrays uniformly).
  return payload.slice().buffer;
}

function encodeUtf8(s: string): ArrayBuffer {
  return new TextEncoder().encode(s).slice().buffer;
}

function bytesToHex(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i]!.toString(16).padStart(2, "0");
  }
  return out;
}

/**
 * Constant-time comparison of two equal-length lowercase-hex strings. Both
 * inputs are 64-char digests by the time we get here (`parseSignature` rejects
 * other lengths; our own digest is always 64), so the loop runs a fixed number
 * of iterations and the timing does not depend on where the first mismatch is.
 */
function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
