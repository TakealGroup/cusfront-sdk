import { createContext, createElement, useContext, type ReactNode } from "react";
import type { CusfrontClient } from "../index.js";

/**
 * React context carrying a single {@link CusfrontClient} instance.
 *
 * The client is created once by the consumer (via `createClient`) and
 * handed to {@link ClientProvider}; every hook in this entry point
 * reads it back through {@link useClient}. Keeping the client in
 * context (rather than module state) means multiple deployments /
 * brands can coexist in one tree, and the SDK ships no global
 * singleton.
 *
 * SSR-safe: nothing here touches `window` / `document`, and the
 * context default is `null` so a missing provider fails loudly
 * instead of silently using a stale client.
 */
const ClientContext = createContext<CusfrontClient | null>(null);
ClientContext.displayName = "CusfrontClientContext";

export interface ClientProviderProps {
  /** The client built by `createClient(...)`. Create it once (e.g. in
   *  a module-level `const` or a `useMemo`) and pass it here — do not
   *  rebuild it on every render. */
  client: CusfrontClient;
  children?: ReactNode;
}

/**
 * Provides a {@link CusfrontClient} to the subtree. Place it near the
 * root of your app:
 *
 * ```tsx
 * const client = createClient({ baseUrl: "https://api.example.com" });
 *
 * <ClientProvider client={client}>
 *   <App />
 * </ClientProvider>
 * ```
 *
 * Authored with `createElement` rather than JSX so the SDK's build
 * needs no JSX transform configured.
 */
export function ClientProvider(props: ClientProviderProps) {
  return createElement(
    ClientContext.Provider,
    { value: props.client },
    props.children,
  );
}

/**
 * Read the {@link CusfrontClient} from context. Throws a clear error
 * when used outside a {@link ClientProvider} — surfacing the missing
 * wiring at the call site instead of a confusing null-deref later.
 */
export function useClient(): CusfrontClient {
  const client = useContext(ClientContext);
  if (client === null) {
    throw new Error(
      "@takeal/cusfront-sdk/react: useClient() (or a data hook) was called " +
        "outside of a <ClientProvider>. Wrap your app in " +
        "<ClientProvider client={createClient(...)}>.",
    );
  }
  return client;
}
