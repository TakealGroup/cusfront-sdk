/**
 * Errors surfaced by the SDK. All HTTP failures map onto `ApiError`;
 * network-level / abort / serialisation failures get the generic
 * `NetworkError`. Consumers catch on the discriminator field
 * (`isApiError` / `isNetworkError`) rather than `instanceof` — works
 * across bundler boundaries where multiple copies of the class can
 * coexist.
 */
export class ApiError extends Error {
  readonly isApiError = true as const;

  constructor(
    /** HTTP status code returned by the Takeal API. */
    public readonly status: number,
    /** Stable machine-readable code (e.g. `"insufficient_funds"`,
     *  `"permission_required"`, `"validation"`). Same enum the
     *  TypeScript types pin via openapi-typescript. */
    public readonly code: string,
    /** Human-readable message. English; the consumer maps to its
     *  own i18n layer before showing to end-users. */
    message: string,
    /** Full parsed response body when available. Carries field-level
     *  validation details for `code = "validation"`. */
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class NetworkError extends Error {
  readonly isNetworkError = true as const;

  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "NetworkError";
  }
}

/** Type guard — preferred over `instanceof` (bundler-safe). */
export function isApiError(e: unknown): e is ApiError {
  return typeof e === "object" && e !== null && (e as { isApiError?: boolean }).isApiError === true;
}

export function isNetworkError(e: unknown): e is NetworkError {
  return (
    typeof e === "object" &&
    e !== null &&
    (e as { isNetworkError?: boolean }).isNetworkError === true
  );
}
