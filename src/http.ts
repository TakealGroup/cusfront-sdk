import { ApiError, NetworkError } from "./error.js";
import type { TokenStore } from "./token-store.js";

/**
 * Internal HTTP client. One per SDK instance; injected into each
 * resource. Responsibilities:
 *
 *  - Construct absolute URLs from `baseUrl` + path.
 *  - Set `Authorization: Bearer <jwt>` from the `TokenStore`.
 *  - Set `Content-Type: application/json` on bodies.
 *  - Parse JSON responses + map non-2xx to `ApiError`.
 *  - Forward `Idempotency-Key` when the caller passes one.
 *  - Surface network failures (DNS, abort, broken pipe) as
 *    `NetworkError`.
 *
 * Auto-refresh + retry policies are deliberately NOT in here — they
 * belong to the resource layer (auth.refresh) which has the right
 * context for "is this refreshable" decisions.
 */

export type FetchLike = typeof fetch;

export interface HttpOptions {
  /** Request body. Will be JSON-serialised if not already a
   *  string / FormData / Blob. */
  body?: unknown;
  /** Idempotency key forwarded as the `Idempotency-Key` header.
   *  Required by the Takeal API on most write endpoints. */
  idempotencyKey?: string;
  /** Extra headers merged after the SDK's defaults — caller wins. */
  headers?: Record<string, string>;
  /** Bypass the token store for one call (login, refresh). */
  skipAuth?: boolean;
  /** AbortSignal forwarded to fetch. */
  signal?: AbortSignal;
}

export class HttpClient {
  constructor(
    private readonly baseUrl: string,
    private readonly tokens: TokenStore,
    private readonly fetchImpl: FetchLike,
  ) {
    if (!baseUrl) throw new Error("HttpClient: baseUrl is required");
  }

  async get<T>(path: string, opts: HttpOptions = {}): Promise<T> {
    return this.request<T>("GET", path, opts);
  }

  async post<T>(path: string, opts: HttpOptions = {}): Promise<T> {
    return this.request<T>("POST", path, opts);
  }

  async put<T>(path: string, opts: HttpOptions = {}): Promise<T> {
    return this.request<T>("PUT", path, opts);
  }

  async patch<T>(path: string, opts: HttpOptions = {}): Promise<T> {
    return this.request<T>("PATCH", path, opts);
  }

  async delete<T>(path: string, opts: HttpOptions = {}): Promise<T> {
    return this.request<T>("DELETE", path, opts);
  }

  private async request<T>(method: string, path: string, opts: HttpOptions): Promise<T> {
    const url = this.absolute(path);
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (opts.body !== undefined) headers["Content-Type"] = "application/json";
    if (opts.idempotencyKey) headers["Idempotency-Key"] = opts.idempotencyKey;
    if (!opts.skipAuth) {
      const token = await Promise.resolve(this.tokens.get());
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }
    Object.assign(headers, opts.headers ?? {});

    const init: RequestInit = {
      method,
      headers,
      ...(opts.signal ? { signal: opts.signal } : {}),
    };
    if (opts.body !== undefined) {
      init.body =
        typeof opts.body === "string" ? opts.body : JSON.stringify(opts.body);
    }

    let resp: Response;
    try {
      resp = await this.fetchImpl(url, init);
    } catch (e) {
      // DNS failure, connection refused, abort — anything before the
      // server returns a status. Map to NetworkError for the consumer.
      throw new NetworkError(
        e instanceof Error ? e.message : "network error",
        e,
      );
    }

    return parseResponse<T>(resp);
  }

  private absolute(path: string): string {
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const base = this.baseUrl.replace(/\/+$/, "");
    const tail = path.startsWith("/") ? path : `/${path}`;
    return `${base}${tail}`;
  }
}

async function parseResponse<T>(resp: Response): Promise<T> {
  // Read body once — the Takeal API either returns JSON or an empty body
  // (204 No Content on some DELETEs). Empty body → undefined cast.
  const text = await resp.text();
  let body: unknown;
  if (text.length === 0) {
    body = undefined;
  } else {
    try {
      body = JSON.parse(text);
    } catch {
      // Non-JSON response. On 2xx that's unexpected but not fatal —
      // hand back the raw text under a synthetic field. On error
      // status, fold into the ApiError body.
      body = { raw: text };
    }
  }

  if (!resp.ok) {
    const errBody = (body ?? {}) as { code?: string; message?: string };
    throw new ApiError(
      resp.status,
      errBody.code ?? `http_${resp.status}`,
      errBody.message ?? resp.statusText ?? "request failed",
      body,
    );
  }
  return body as T;
}
