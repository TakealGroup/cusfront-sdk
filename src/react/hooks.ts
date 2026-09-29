import { useCallback, useEffect, useRef, useState } from "react";
import { useClient } from "./context.js";
import type { User } from "../resources/auth.js";
import type { Deposit } from "../resources/deposits.js";
import type { Card, CardProduct } from "../resources/cards.js";
import type { Balance } from "../resources/balance.js";
import type {
  InboxItem,
  NotificationCategory,
  NotificationPage,
} from "../resources/notifications.js";

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
interface AsyncStateWithSetter<T> extends AsyncState<T> {
  /** Replace `data` without a round-trip (optimistic updates, silent
   *  refreshes). Internal: never exposed on a public hook. */
  setData: (update: T | null | ((prev: T | null) => T | null)) => void;
}

function useAsyncResource<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: ReadonlyArray<unknown>,
): AsyncStateWithSetter<T> {
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

  return { data, error, loading, refetch, setData };
}

/** Strip the internal setter so public hooks return exactly {@link AsyncState}. */
function publicState<T>(state: AsyncStateWithSetter<T>): AsyncState<T> {
  const { data, error, loading, refetch } = state;
  return { data, error, loading, refetch };
}

/** Current authenticated user (`client.auth.me()`). 401 surfaces as
 *  the thrown `ApiError` in `error` — treat it as "no session". */
export function useMe(): AsyncState<User> {
  const client = useClient();
  return publicState(useAsyncResource<User>(() => client.auth.me(), [client]));
}

/** The caller's deposits, most recent first (`client.deposits.list()`). */
export function useDeposits(): AsyncState<Deposit[]> {
  const client = useClient();
  return publicState(useAsyncResource<Deposit[]>(() => client.deposits.list(), [client]));
}

/** The caller's cards, most recent first (`client.cards.list()`). */
export function useCards(): AsyncState<Card[]> {
  const client = useClient();
  return publicState(useAsyncResource<Card[]>(() => client.cards.list(), [client]));
}

/**
 * The cards the user can order, default product first
 * (`client.cards.listProducts()`). Render each item's artwork through
 * `client.assetUrl(product.design.image_url)`.
 */
export function useCardProducts(): AsyncState<CardProduct[]> {
  const client = useClient();
  return publicState(useAsyncResource<CardProduct[]>(() => client.cards.listProducts(), [client]));
}

/**
 * The user's wallet balance for one currency
 * (`client.balance.get(currency)`). Re-fetches when `currency`
 * changes.
 */
export function useBalance(currency: string): AsyncState<Balance> {
  const client = useClient();
  return publicState(
    useAsyncResource<Balance>(() => client.balance.get(currency), [client, currency]),
  );
}

export interface UseNotificationsOptions {
  /** Only unread items. */
  unreadOnly?: boolean;
  category?: NotificationCategory;
  /** Page size. */
  limit?: number;
}

export interface NotificationsState extends AsyncState<NotificationPage> {
  /** Mark one item read on the server and in `data` right away. */
  markRead: (id: string) => Promise<InboxItem>;
  /** Mark everything read on the server and in `data` right away. */
  markAllRead: () => Promise<{ marked: number }>;
  /** Fetch the next page (`data.next_cursor`) and append its items.
   *  Resolves at once when there is no next page or a load is running. */
  loadMore: () => Promise<void>;
  /** True while `loadMore` is in flight. */
  loadingMore: boolean;
}

/**
 * The user's inbox (`client.notifications.list(opts)`), newest first, with
 * paging and read-state helpers. `data.items` grows as `loadMore` is
 * called; `refetch` starts over from the first page.
 *
 * ```tsx
 * const inbox = useNotifications({ limit: 20 });
 * inbox.data?.items.map((n) => (
 *   <Row key={n.id} onClick={() => inbox.markRead(n.id)} unread={!n.read_at}>
 *     {n.title}
 *   </Row>
 * ));
 * ```
 */
export function useNotifications(opts: UseNotificationsOptions = {}): NotificationsState {
  const client = useClient();
  const { unreadOnly, category, limit } = opts;
  const state = useAsyncResource<NotificationPage>(
    () =>
      client.notifications.list({
        ...(unreadOnly !== undefined ? { unreadOnly } : {}),
        ...(category !== undefined ? { category } : {}),
        ...(limit !== undefined ? { limit } : {}),
      }),
    [client, unreadOnly, category, limit],
  );
  const { setData } = state;
  const [loadingMore, setLoadingMore] = useState(false);
  // The cursor lives in a ref too, so `loadMore` doesn't change identity
  // (and re-trigger consumer effects) on every page.
  const cursorRef = useRef<string | null>(null);
  cursorRef.current = state.data?.next_cursor ?? null;
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const markRead = useCallback(
    async (id: string) => {
      const item = await client.notifications.markRead(id);
      if (mounted.current) {
        setData((prev) => {
          if (!prev) return prev;
          const wasUnread = prev.items.some((n) => n.id === id && n.read_at === null);
          return {
            ...prev,
            items: prev.items.map((n) => (n.id === id ? item : n)),
            unread_count: Math.max(0, prev.unread_count - (wasUnread ? 1 : 0)),
          };
        });
      }
      return item;
    },
    [client, setData],
  );

  const markAllRead = useCallback(async () => {
    const out = await client.notifications.markAllRead();
    if (mounted.current) {
      const now = new Date().toISOString();
      setData((prev) =>
        prev
          ? {
              ...prev,
              items: prev.items.map((n) => (n.read_at === null ? { ...n, read_at: now } : n)),
              unread_count: 0,
            }
          : prev,
      );
    }
    return out;
  }, [client, setData]);

  const loadMore = useCallback(async () => {
    const cursor = cursorRef.current;
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const page = await client.notifications.list({
        cursor,
        ...(unreadOnly !== undefined ? { unreadOnly } : {}),
        ...(category !== undefined ? { category } : {}),
        ...(limit !== undefined ? { limit } : {}),
      });
      if (!mounted.current) return;
      setData((prev) =>
        prev
          ? {
              items: [...prev.items, ...page.items],
              next_cursor: page.next_cursor,
              unread_count: page.unread_count,
            }
          : page,
      );
    } finally {
      if (mounted.current) setLoadingMore(false);
    }
  }, [client, setData, unreadOnly, category, limit, loadingMore]);

  return { ...publicState(state), markRead, markAllRead, loadMore, loadingMore };
}

export interface UseUnreadCountOptions {
  /** Re-fetch every this many milliseconds. Default 30000; `0` disables
   *  polling. */
  pollMs?: number;
}

/** Message a service worker posts to open clients when a push arrives, so
 *  badges refresh without waiting for the next poll. */
export const PUSH_MESSAGE_TYPE = "takeal:push";

/**
 * Unread inbox items (`client.notifications.unreadCount()`) for a badge.
 * Refreshes silently (no `loading` flip) on an interval and whenever the
 * page's service worker posts `{ type: "takeal:push" }`, which your
 * `push` handler should do for every open client.
 */
export function useUnreadCount(opts: UseUnreadCountOptions = {}): AsyncState<number> {
  const client = useClient();
  const pollMs = opts.pollMs ?? 30_000;
  const state = useAsyncResource<number>(() => client.notifications.unreadCount(), [client]);
  const { setData } = state;

  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      client.notifications
        .unreadCount()
        .then((n) => {
          if (!cancelled) setData(n);
        })
        .catch(() => {
          // A failed background refresh keeps the last known value.
        });
    };

    const timer = pollMs > 0 ? setInterval(refresh, pollMs) : undefined;

    const sw = serviceWorkerContainer();
    const onMessage = (event: { data?: unknown }) => {
      const data = event.data as { type?: unknown } | null | undefined;
      if (data && data.type === PUSH_MESSAGE_TYPE) refresh();
    };
    sw?.addEventListener("message", onMessage);

    return () => {
      cancelled = true;
      if (timer !== undefined) clearInterval(timer);
      sw?.removeEventListener("message", onMessage);
    };
  }, [client, pollMs, setData]);

  return publicState(state);
}

interface MessageTarget {
  addEventListener(type: "message", listener: (event: { data?: unknown }) => void): void;
  removeEventListener(type: "message", listener: (event: { data?: unknown }) => void): void;
}

/** `navigator.serviceWorker` when the runtime has one; null on the server
 *  and in browsers without service workers. */
function serviceWorkerContainer(): MessageTarget | null {
  const nav = (globalThis as { navigator?: { serviceWorker?: unknown } }).navigator;
  const sw = nav?.serviceWorker as MessageTarget | undefined;
  if (!sw || typeof sw.addEventListener !== "function") return null;
  return sw;
}
