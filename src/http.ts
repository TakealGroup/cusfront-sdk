import { ApiError, NetworkError } from "./error.js";
import type { TokenStore } from "./token-store.js";

/**
 * Internal HTTP client. One per SDK instance; injected into each
 * resource. Responsibilities:
 *
 *  - Construct absolute URLs from `baseUrl` + API version + path.
 *    Resources pass contract paths (`/me/deposits`); the `/v1` prefix is
 *    added here, in one place. Only the deployment-level endpoints
 *    (`/ready`, `/branding`, …) stay unversioned.
 *  - Set `Authorization: Bearer <jwt>` from the `TokenStore`.
 *  - Set `Content-Type: application/json` on bodies.
 *  - Parse JSON responses + map non-2xx to `ApiError`.
 *  - Forward `Idempotency-Key` when the caller passes one.
 *  - Send the constructor's `defaultHeaders` (the `X-Takeal-Client`
 *    descriptor) on every request.
 *  - Surface network failures (DNS, abort, broken pipe) as
 *    `NetworkError`.
 *
 * A 401 on an authenticated call asks the refresher (set by the auth
 * resource when a remembered sign-in exists) for a new session once, and
 * repeats the call when it got one. Concurrent 401s share one refresh.
 */

export type FetchLike = typeof fetch;

/** Current public contract revision of the Takeal API. */
export const API_VERSION = "/v1";

/** Host-level endpoints that are not part of a versioned contract. */
const UNVERSIONED = new Set(["/health", "/ready", "/branding", "/favicon.ico"]);

/**
 * `/me/deposits` → `/v1/me/deposits`. Already-versioned paths and the
 * unversioned ops endpoints pass through untouched.
 */
export function versionedPath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const bare = p.split("?")[0]!;
  if (UNVERSIONED.has(bare)) return p;
  if (bare === API_VERSION || bare.startsWith(`${API_VERSION}/`)) return p;
  return `${API_VERSION}${p}`;
}

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
  /** Internal: this is the repeat after a refresh. */
  retried?: boolean;
}

export class HttpClient {
  constructor(
    private readonly baseUrl: string,
    private readonly tokens: TokenStore,
    private readonly fetchImpl: FetchLike,
    /** Headers sent on every request, below the per-call `headers`
     *  (a caller can still override one). */
    private readonly defaultHeaders: Record<string, string> = {},
  ) {
    if (!baseUrl) throw new Error("HttpClient: baseUrl is required");
  }

  private refresher: (() => Promise<boolean>) | undefined;
  private refreshing: Promise<boolean> | undefined;

  /** Called once on a 401; resolves `true` when a new session was stored. */
  setRefresher(fn: (() => Promise<boolean>) | undefined): void {
    this.refresher = fn;
  }

  /** One refresh at a time, whoever asks. */
  refreshOnce(): Promise<boolean> {
    if (!this.refresher) return Promise.resolve(false);
    if (!this.refreshing) {
      this.refreshing = this.refresher()
        .catch(() => false)
        .finally(() => {
          this.refreshing = undefined;
        });
    }
    return this.refreshing;
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

  /** GET a file. Same auth and refresh as the JSON calls; an error status
   *  throws `ApiError` the same way. */
  async getBlob(path: string, opts: HttpOptions = {}): Promise<Blob> {
    const resp = await this.send("GET", path, { ...opts, accept: "*/*" });
    if (!resp.ok) return parseResponse<never>(resp);
    return resp.blob();
  }

  private async request<T>(method: string, path: string, opts: HttpOptions): Promise<T> {
    return parseResponse<T>(await this.send(method, path, opts));
  }

  private async send(
    method: string,
    path: string,
    opts: HttpOptions & { accept?: string },
  ): Promise<Response> {
    const url = this.absolute(path);
    const headers: Record<string, string> = {
      Accept: opts.accept ?? "application/json",
      ...this.defaultHeaders,
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
      init.body = typeof opts.body === "string" ? opts.body : JSON.stringify(opts.body);
    }

    let resp: Response;
    try {
      resp = await this.fetchImpl(url, init);
    } catch (e) {
      // DNS failure, connection refused, abort — anything before the
      // server returns a status. Map to NetworkError for the consumer.
      throw new NetworkError(e instanceof Error ? e.message : "network error", e);
    }

    if (resp.status === 401 && !opts.skipAuth && !opts.retried && this.refresher) {
      if (await this.refreshOnce()) {
        return this.send(method, path, { ...opts, retried: true });
      }
    }
    return resp;
  }

  private absolute(path: string): string {
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const base = this.baseUrl.replace(/\/+$/, "");
    return `${base}${versionedPath(path)}`;
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
