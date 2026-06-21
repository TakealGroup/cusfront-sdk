// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { createElement, type ReactNode } from "react";
import { cleanup, render, renderHook, screen, waitFor } from "@testing-library/react";
import { ClientProvider, useBalance, useClient } from "./index.js";
import type { CusfrontClient } from "../index.js";
import type { Balance } from "../resources/balance.js";

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
} = {}): CusfrontClient {
  const balanceGet =
    overrides.balanceGet ?? ((currency: string) => Promise.resolve({ amount: "100.00", currency }));
  return {
    brand: undefined,
    tokens: { get: () => null, set: () => {}, clear: () => {} },
    auth: { me: () => Promise.reject(new Error("unused")) },
    deposits: { list: () => Promise.resolve([]) },
    cards: { list: () => Promise.resolve([]) },
    balance: { get: balanceGet },
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
