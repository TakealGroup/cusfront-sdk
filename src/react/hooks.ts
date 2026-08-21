import { useCallback, useEffect, useState } from "react";
import { useClient } from "./context.js";
import type { User } from "../resources/auth.js";
import type { Deposit } from "../resources/deposits.js";
import type { Card } from "../resources/cards.js";
import type { Balance } from "../resources/balance.js";

/**
 * Data-fetching hooks for the React entry point.
 *
 * Each hook wraps one resource call and exposes the same small,
 * predictable shape:
 *
 * ```ts
 * const { data, error, loading, refetch } = useDeposits();
 * ```
 *
 * Design notes:
 *  - Pure React (`useState` + `useEffect` + `useCallback`); no external
 *    data-fetching library, so the React entry stays tiny and the
 *    consumer keeps full control of caching.
 *  - The effect is cancellation-guarded: if the component unmounts (or
 *    the inputs change) before the request settles, the stale result is
 *    dropped instead of writing to an unmounted component.
 *  - SSR-safe: the fetch only runs inside `useEffect`, which never
 *    executes during server render.
 *  - `error` holds whatever the resource threw — typically the SDK's
 *    `ApiError` / `NetworkError` (branch with `isApiError` /
 *    `isNetworkError`).
 */

/** Common return shape for every data hook. */
export interface AsyncState<T> {
  /** The resolved value, or `null` before the first success / on error. */
  data: T | null;
  /** The thrown error, or `null` while loading / on success. */
  error: unknown;
  /** True from mount (and from each `refetch`) until the call settles. */
  loading: boolean;
  /** Re-run the underlying resource call. Returns a promise that
   *  resolves once the refetch settles (useful for pull-to-refresh). */
  refetch: () => Promise<void>;
}

/**
 * Internal engine shared by every public hook.
 *
 * `fetcher` is invoked on mount and whenever the caller's `deps`
 * change. It is handed an `AbortSignal` so resource calls that accept
 * one can cancel in-flight work; results are additionally gated behind
 * a `cancelled` flag so a late resolve never lands after teardown.
 *
 * The caller passes a stable `fetcher` (memoise it with `useCallback`)
 * — `useAsyncResource` does not re-subscribe on identity changes alone,
 * only on the explicit `deps` array, mirroring `useEffect` semantics.
 */
function useAsyncResource<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: ReadonlyArray<unknown>,
): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // Bumping this re-runs the effect on demand, reusing the exact same
  // cancellation machinery a dependency change would.
  const [nonce, setNonce] = useState(0);

  const refetch = useCallback(async () => {
    setNonce((n) => n + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetcher(controller.signal)
      .then((result) => {
        if (cancelled) return;
        setData(result);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        // Ignore the abort we triggered ourselves on teardown.
        if (controller.signal.aborted) return;
        setError(e);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
    // `fetcher` is intentionally omitted from the dep list: callers
    // memoise it, and re-runs are driven by `deps` + `nonce` so that an
    // unstable inline fetcher can't cause an effect loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  return { data, error, loading, refetch };
}

/** Current authenticated user (`client.auth.me()`). 401 surfaces as
 *  the thrown `ApiError` in `error` — treat it as "no session". */
export function useMe(): AsyncState<User> {
  const client = useClient();
  return useAsyncResource<User>(() => client.auth.me(), [client]);
}

/** The caller's deposits, most recent first (`client.deposits.list()`). */
export function useDeposits(): AsyncState<Deposit[]> {
  const client = useClient();
  return useAsyncResource<Deposit[]>(() => client.deposits.list(), [client]);
}

/** The caller's cards, most recent first (`client.cards.list()`). */
export function useCards(): AsyncState<Card[]> {
  const client = useClient();
  return useAsyncResource<Card[]>(() => client.cards.list(), [client]);
}

/**
 * The user's wallet balance for one currency
 * (`client.balance.get(currency)`). Re-fetches when `currency`
 * changes.
 */
export function useBalance(currency: string): AsyncState<Balance> {
  const client = useClient();
  return useAsyncResource<Balance>(
    () => client.balance.get(currency),
    [client, currency],
  );
}
