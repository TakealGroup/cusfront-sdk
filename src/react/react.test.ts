// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { createElement, type ReactNode } from "react";
import { act, cleanup, render, renderHook, screen, waitFor } from "@testing-library/react";
import {
  ClientProvider,
  useBalance,
  useCardProducts,
  useClient,
  useNotifications,
  useUnreadCount,
} from "./index.js";
import type { CusfrontClient } from "../index.js";
import type { Balance } from "../resources/balance.js";
import type { CardProduct } from "../resources/cards.js";
import type { InboxItem, NotificationPage, ListNotificationsParams } from "../resources/notifications.js";

/**
 * React-hook tests. Scoped to jsdom via the file-level pragma above so
 * the rest of the suite keeps running under the default `node`
 * environment (vitest config is left untouched).
 *
 * A fake client mocks just the resource methods each hook touches —
 * no network, no real HttpClient.
 */

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const USD: Balance = { amount: "100.00", currency: "USD" };

/** Build a minimal fake client. Only the methods under test are real;
 *  the rest are present as typed no-ops so the cast is sound. */
function fakeClient(overrides: {
  balanceGet?: (currency: string) => Promise<Balance>;
  listProducts?: () => Promise<CardProduct[]>;
  notifications?: Partial<CusfrontClient["notifications"]>;
} = {}): CusfrontClient {
  const balanceGet =
    overrides.balanceGet ?? ((currency: string) => Promise.resolve({ amount: "100.00", currency }));
  return {
    brand: undefined,
    tokens: { get: () => null, set: () => {}, clear: () => {} },
    auth: { me: () => Promise.reject(new Error("unused")) },
    deposits: { list: () => Promise.resolve([]) },
    cards: {
      list: () => Promise.resolve([]),
      listProducts: overrides.listProducts ?? (() => Promise.resolve([])),
    },
    balance: { get: balanceGet },
    notifications: {
      list: () => Promise.resolve({ items: [], next_cursor: null, unread_count: 0 }),
      unreadCount: () => Promise.resolve(0),
      markRead: () => Promise.reject(new Error("unused")),
      markAllRead: () => Promise.reject(new Error("unused")),
      ...overrides.notifications,
    },
  } as unknown as CusfrontClient;
}

function wrapper(client: CusfrontClient) {
  return ({ children }: { children: ReactNode }) =>
    createElement(ClientProvider, { client }, children);
}

describe("ClientProvider + useClient", () => {
  it("exposes the provided client to the subtree", () => {
    const client = fakeClient();
    const { result } = renderHook(() => useClient(), {
      wrapper: wrapper(client),
    });
    expect(result.current).toBe(client);
  });

  it("throws a clear error when used outside a provider", () => {
    // Silence React's error-boundary console noise for this case.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useClient())).toThrow(
      /outside of a <ClientProvider>/,
    );
    spy.mockRestore();
  });

  it("renders children", () => {
    render(
      createElement(
        ClientProvider,
        { client: fakeClient() },
        createElement("span", null, "hello"),
      ),
    );
    expect(screen.getByText("hello")).toBeTruthy();
  });
});

describe("useBalance", () => {
  it("transitions loading -> data", async () => {
    const get = vi.fn((currency: string) => Promise.resolve({ amount: "100.00", currency }));
    const client = fakeClient({ balanceGet: get });

    const { result } = renderHook(() => useBalance("USD"), {
      wrapper: wrapper(client),
    });

    // Initial synchronous render: loading, no data yet.
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(USD);
    expect(result.current.error).toBeNull();
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("USD");
  });

  it("surfaces a thrown error in `error` and clears `data`", async () => {
    const boom = new Error("balance unavailable");
    const client = fakeClient({ balanceGet: () => Promise.reject(boom) });

    const { result } = renderHook(() => useBalance("USD"), {
      wrapper: wrapper(client),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe(boom);
    expect(result.current.data).toBeNull();
  });

  it("refetch re-invokes the resource", async () => {
    const get = vi.fn((currency: string) => Promise.resolve({ amount: "100.00", currency }));
    const client = fakeClient({ balanceGet: get });

    const { result } = renderHook(() => useBalance("USD"), {
      wrapper: wrapper(client),
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(get).toHaveBeenCalledTimes(1);

    await result.current.refetch();

    await waitFor(() => expect(get).toHaveBeenCalledTimes(2));
    expect(result.current.data).toEqual(USD);
  });

  it("re-fetches when the currency argument changes", async () => {
    const get = vi.fn((currency: string) => Promise.resolve({ amount: "1.00", currency }));
    const client = fakeClient({ balanceGet: get });

    const { result, rerender } = renderHook(
      ({ cur }: { cur: string }) => useBalance(cur),
      { wrapper: wrapper(client), initialProps: { cur: "USD" } },
    );
    await waitFor(() => expect(result.current.data?.currency).toBe("USD"));

    rerender({ cur: "EUR" });
    await waitFor(() => expect(result.current.data?.currency).toBe("EUR"));
    expect(get).toHaveBeenCalledWith("EUR");
  });
});

describe("useCardProducts", () => {
  it("resolves the catalog from client.cards.listProducts()", async () => {
    const product: CardProduct = {
      id: "prod_1",
      name: "Virtual Mastercard USD",
      description: null,
      card_type: "prepaid",
      currency: "USD",
      features: {},
      design: { id: null, image_url: "/card-designs/default.svg" },
      designs: [],
      price: null,
      is_default: true,
    };
    const listProducts = vi.fn(() => Promise.resolve([product]));
    const { result } = renderHook(() => useCardProducts(), {
      wrapper: wrapper(fakeClient({ listProducts })),
    });
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([product]);
    expect(result.current.error).toBeNull();
    expect(listProducts).toHaveBeenCalledTimes(1);
  });
});

function item(id: string, read = false): InboxItem {
  return {
    id,
    event_type: "deposit_confirmed",
    category: "money",
    title: `Item ${id}`,
    body: "",
    href: null,
    data: {},
    locale: "en",
    read_at: read ? "2026-09-15T00:00:00Z" : null,
    created_at: "2026-09-15T00:00:00Z",
  };
}

describe("useNotifications", () => {
  it("loads the first page with the given filters, then loadMore appends by cursor", async () => {
    const pages: Record<string, NotificationPage> = {
      first: { items: [item("a"), item("b")], next_cursor: "c2", unread_count: 3 },
      c2: { items: [item("c", true)], next_cursor: null, unread_count: 3 },
    };
    const list = vi.fn((p: ListNotificationsParams = {}) => Promise.resolve(pages[p.cursor ?? "first"]!));
    const { result } = renderHook(() => useNotifications({ limit: 2, unreadOnly: true }), {
      wrapper: wrapper(fakeClient({ notifications: { list } })),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(list).toHaveBeenCalledWith({ limit: 2, unreadOnly: true });
    expect(result.current.data?.items.map((n) => n.id)).toEqual(["a", "b"]);
    expect(result.current.loadingMore).toBe(false);

    await act(async () => {
      await result.current.loadMore();
    });
    expect(list).toHaveBeenLastCalledWith({ cursor: "c2", limit: 2, unreadOnly: true });
    expect(result.current.data?.items.map((n) => n.id)).toEqual(["a", "b", "c"]);
    expect(result.current.data?.next_cursor).toBeNull();

    // No next page: nothing is fetched.
    await act(async () => {
      await result.current.loadMore();
    });
    expect(list).toHaveBeenCalledTimes(2);
  });

  it("markRead swaps the item in place and decrements unread_count", async () => {
    const list = vi.fn(() =>
      Promise.resolve({ items: [item("a"), item("b", true)], next_cursor: null, unread_count: 5 }),
    );
    const markRead = vi.fn((id: string) => Promise.resolve(item(id, true)));
    const { result } = renderHook(() => useNotifications(), {
      wrapper: wrapper(fakeClient({ notifications: { list, markRead } })),
    });
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.markRead("a");
    });
    expect(markRead).toHaveBeenCalledWith("a");
    expect(result.current.data?.items[0]?.read_at).not.toBeNull();
    expect(result.current.data?.unread_count).toBe(4);

    // Already read: the count stays.
    await act(async () => {
      await result.current.markRead("b");
    });
    expect(result.current.data?.unread_count).toBe(4);
    expect(list).toHaveBeenCalledTimes(1);
  });

  it("markAllRead clears every read_at locally", async () => {
    const list = vi.fn(() =>
      Promise.resolve({ items: [item("a"), item("b")], next_cursor: null, unread_count: 2 }),
    );
    const markAllRead = vi.fn(() => Promise.resolve({ marked: 2 }));
    const { result } = renderHook(() => useNotifications(), {
      wrapper: wrapper(fakeClient({ notifications: { list, markAllRead } })),
    });
    await waitFor(() => expect(result.current.loading).toBe(false));

    let out: { marked: number } | undefined;
    await act(async () => {
      out = await result.current.markAllRead();
    });
    expect(out).toEqual({ marked: 2 });
    expect(result.current.data?.items.every((n) => n.read_at !== null)).toBe(true);
    expect(result.current.data?.unread_count).toBe(0);
  });
});

describe("useUnreadCount", () => {
  afterEach(() => {
    vi.useRealTimers();
    delete (navigator as { serviceWorker?: unknown }).serviceWorker;
  });

  it("fetches once, then polls on the interval without flipping `loading`", async () => {
    vi.useFakeTimers();
    let n = 1;
    const unreadCount = vi.fn(() => Promise.resolve(n++));
    const { result } = renderHook(() => useUnreadCount({ pollMs: 1000 }), {
      wrapper: wrapper(fakeClient({ notifications: { unreadCount } })),
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(1);
    expect(unreadCount).toHaveBeenCalledTimes(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(unreadCount).toHaveBeenCalledTimes(2);
    expect(result.current.data).toBe(2);
    expect(result.current.loading).toBe(false);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(unreadCount).toHaveBeenCalledTimes(4);
    expect(result.current.data).toBe(4);
  });

  it("pollMs: 0 disables polling", async () => {
    vi.useFakeTimers();
    const unreadCount = vi.fn(() => Promise.resolve(3));
    renderHook(() => useUnreadCount({ pollMs: 0 }), {
      wrapper: wrapper(fakeClient({ notifications: { unreadCount } })),
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(120_000);
    });
    expect(unreadCount).toHaveBeenCalledTimes(1);
  });

  it("refreshes on a service-worker `takeal:push` message and unsubscribes on unmount", async () => {
    const sw = new EventTarget();
    Object.defineProperty(navigator, "serviceWorker", { value: sw, configurable: true });
    const unreadCount = vi.fn(() => Promise.resolve(9));
    const { result, unmount } = renderHook(() => useUnreadCount({ pollMs: 0 }), {
      wrapper: wrapper(fakeClient({ notifications: { unreadCount } })),
    });
    await waitFor(() => expect(result.current.data).toBe(9));

    await act(async () => {
      sw.dispatchEvent(new MessageEvent("message", { data: { type: "something-else" } }));
    });
    expect(unreadCount).toHaveBeenCalledTimes(1);

    await act(async () => {
      sw.dispatchEvent(new MessageEvent("message", { data: { type: "takeal:push" } }));
    });
    await waitFor(() => expect(unreadCount).toHaveBeenCalledTimes(2));

    unmount();
    sw.dispatchEvent(new MessageEvent("message", { data: { type: "takeal:push" } }));
    expect(unreadCount).toHaveBeenCalledTimes(2);
  });
});
