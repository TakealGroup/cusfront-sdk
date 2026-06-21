/**
 * `@takeal/cusfront-sdk/react` — optional React hooks layer.
 *
 * Ships separately from the core barrel so projects that don't use
 * React pay nothing for it, and React stays a `peerDependency` (never
 * bundled). Import only from this sub-path:
 *
 * ```tsx
 * import { ClientProvider, useBalance } from "@takeal/cusfront-sdk/react";
 * ```
 *
 * Provides:
 *  - {@link ClientProvider} / {@link useClient} — context plumbing for a
 *    single `createClient(...)` instance.
 *  - {@link useMe} / {@link useDeposits} / {@link useCards} /
 *    {@link useBalance} — read hooks over the matching resources, each
 *    returning `{ data, error, loading, refetch }`.
 *
 * All hooks are SSR-safe (no top-level `window` / `document` access;
 * effects only) and free of third-party data-fetching deps.
 */
export {
  ClientProvider,
  useClient,
  type ClientProviderProps,
} from "./context.js";
export {
  useMe,
  useDeposits,
  useCards,
  useBalance,
  type AsyncState,
} from "./hooks.js";
