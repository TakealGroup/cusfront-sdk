/**
 * AUTO-GENERATED — do not edit by hand. Run `pnpm refresh-types`.
 *
 * Source: openapi-snapshot.json (pulled from the Takeal API's /docs/openapi.json).
 * Generator: openapi-typescript.
 */
/* eslint-disable */
/* prettier-ignore */
export type paths = {
    "/branding": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Public white-label brand config. **No auth** — consumed on pre-login screens. */
        get: operations["get_branding"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Liveness probe. Returns 200 as long as the process is up. */
        get: operations["health"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ready": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Readiness probe — deep, round-trips deps. Returns 200 if all pass,
         *     503 if any fails. Body always includes the per-dep results + counts
         *     + ops surface so the operator UI can render even on a 503.
         */
        get: operations["ready"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/blog/images": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["list_images"];
        put?: never;
        /** Upload an image and get back the URL to drop into a post body. */
        post: operations["upload_image"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/blog/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** All posts (any status), newest activity first. */
        get: operations["list_posts"];
        put?: never;
        /**
         * Create a draft. `slug` is derived from the title when omitted; a title
         *     with no latin characters gets a generated handle instead of an error.
         */
        post: operations["create_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/blog/posts/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_post"];
        put?: never;
        post?: never;
        delete: operations["delete_post"];
        options?: never;
        head?: never;
        /**
         * Edit a post. Changing any content field bumps `content_version`, which
         *     re-arms the broadcast buttons; a pure status change does not.
         */
        patch: operations["patch_post"];
        trace?: never;
    };
    "/v1/admin/blog/posts/{id}/broadcast": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fan a published post out to everyone subscribed to `channel`.
         * @description Idempotent per (post, channel, content version): a repeat click returns
         *     409 rather than sending twice. Editing the post afterwards makes a
         *     re-send available again.
         */
        post: operations["broadcast"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/card-transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Cross-card VCI spend feed, newest first, served from `card_transactions`.
         *     Optional filters: `card_id`, `user_id`, `connector_slug`. Paginated via
         *     `limit` (≤500, default 100) + `offset`.
         */
        get: operations["list_card_transactions_all"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List cards across all users. Operator-only. */
        get: operations["list_cards"];
        put?: never;
        /**
         * Issue a card for an end-user (operator action). Operator-only.
         * @description **Idempotency:** honors the `Idempotency-Key` header when present; otherwise
         *     a fresh key is generated server-side (operator-initiated issuance).
         */
        post: operations["create_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/orphans": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List suspected orphaned cards: `failed` rows that still carry a
         *     `provider_reference` — the provider likely created + funded the card before
         *     a later Takeal step failed, so it may be live + spendable off our float.
         */
        get: operations["list_orphans"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a single card's full detail. Operator-only. */
        get: operations["get_card"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/{id}/debit": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Manually debit a SHARED card — lowers its cumulative limit by `amount`
         *     (floored at the provider minimum). The mirror of "Manual top up". No ledger
         *     move: shared cards draw from the connector's pooled wallet, so there's
         *     nothing to reclaim. STANDARD/prepaid cards return 501 (limit not editable).
         * @description **Shared-gating source of truth:** the *connector* is the single
         *     authority — a non-shared card's connector returns 501 here, fail-safe,
         *     regardless of what `cards.funding_mode` says. The persisted `funding_mode`
         *     (and the operator console button that keys off it) is an **informational** hint only;
         *     it can lag the live connector (lazy backfill / COALESCE-on-refresh) and is
         *     never the enforcement point.
         */
        post: operations["debit_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/{id}/freeze": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Freeze a card. Idempotent — replaying on an already-frozen card returns the
         *     current row. Providers without freeze support return 501.
         */
        post: operations["freeze_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/{id}/reconcile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reconcile a suspected orphan. `close` terminates it at the provider;
         *     `adopt` charges the still-unpaid load and activates it (402 if the user
         *     can't cover it).
         */
        post: operations["reconcile_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/{id}/refresh-from-connector": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Re-pull last4 + expiry + status from the card's issuer connector and
         *     mirror the answer into our local row. Recovery path for the cases where
         *     the original `CreateCard` left fields blank (PENDING-fallback, missing
         *     `maskedCardNo` on first response, etc.). Idempotent. (PCI rule
         *     still applies: the connector never returns full PAN — only last4.)
         */
        post: operations["refresh_card_from_connector"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/{id}/reload": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reload a PREPAID card. Most providers return 501 (funds flow via the
         *     linked funding account, not via direct reload); the connector included.
         *     400 on non-prepaid card / non-active status / non-positive amount.
         */
        post: operations["reload_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/{id}/terminate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Terminate a card. **One-way.** Idempotent — calling on an already-terminated
         *     card returns the current row without re-calling the connector.
         */
        post: operations["terminate_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/{id}/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List recent transactions on a card. Pagination via opaque `page_token`.
         *     501 from providers without a history API.
         */
        get: operations["list_card_transactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/{id}/unfreeze": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Unfreeze a previously-frozen card. Idempotent on already-active. 501 from
         *     providers that don't support unfreeze.
         */
        post: operations["unfreeze_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all connectors (active + disabled). Secrets are redacted. Operator-only. */
        get: operations["list_connectors"];
        put?: never;
        /**
         * Create a new connector. Server generates both secrets (`signing_secret`
         *     + `outbound_auth_secret`) and returns them **plaintext one-shot**.
         *     After commit, the in-memory `ConnectorRegistry` is refreshed so the new
         *     slug is immediately usable by the funding / issuing / acquiring services.
         */
        post: operations["create_connector"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/breakers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Per-connector circuit-breaker + rate-limiter metrics. Operator-only. */
        get: operations["list_breakers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Soft-disable: sets `status = 'disabled'`. The row stays for audit
         *     history. Use `PATCH` with `status: "active"` to re-enable.
         */
        delete: operations["disable_connector"];
        options?: never;
        head?: never;
        /**
         * Update `grpc_url` and/or `status` for an existing connector. Either
         *     field can be omitted; the request is a no-op if both are.
         */
        patch: operations["patch_connector"];
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/balances": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Master/account balances for an issuer connector (e.g. OKCard channel
         *     wallets). Empty for connectors without a wallet concept. Operator-only.
         */
        get: operations["connector_balances"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/configuration": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * GET full plaintext map. **Audited** — every call emits
         *     `admin.connector.configuration.viewed`.
         */
        get: operations["get_configuration"];
        /** PUT — replace the full map. */
        put: operations["put_configuration"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/configuration/{key}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** DELETE one key. */
        delete: operations["delete_configuration_key"];
        options?: never;
        head?: never;
        /** PATCH one key. */
        patch: operations["patch_configuration_key"];
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/programs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the per-program catalogue + pricing for an issuer. Powers the operator console
         *     pricing UI + the "Add card" picker. Empty until `POST.../programs/sync`.
         */
        get: operations["list_programs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/programs/sync": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Sync the program catalogue from the connector's advertised list (option (c):
         *     the connector knows its BINs, we own the pricing). Upserts catalogue fields
         *     (label / card_type / currency / bin) and **preserves** operator-set pricing.
         */
        post: operations["sync_programs"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/programs/{program_code}/pricing": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set price / priority / status on one program. The program row must
         *     exist (run sync first). Currency is required whenever a sell_price is set.
         */
        put: operations["put_program_pricing"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/rotate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Generate new secrets for an existing connector. Both `signing_secret` and
         *     `outbound_auth_secret` are replaced atomically; previous values stop
         *     working immediately. Plaintext one-shot return.
         * @description **No grace window in MVP** — coordinate the rotation with the slave
         *     operator (update both sides). TODO(phase-2): dual-secret window.
         */
        post: operations["rotate_connector"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Per-connector aggregate stats (count + summed amount, grouped by
         *     status + currency) from the platform own tables. Operator-only.
         */
        get: operations["connector_stats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/fx/probe": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Fetch a rate from one source **without** making it active.
         * @description The point is to try a freshly-defined `rates.custom` entry against a real
         *     pair before production FX depends on it; otherwise the only way to find
         *     out a definition is wrong is a user's deposit. Bypasses the rate cache.
         */
        get: operations["fx_probe"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/fx/providers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List selectable rate sources. Powers a real dropdown instead of asking an
         *     operator to remember which names exist.
         */
        get: operations["fx_providers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all merchants. Operator-only. Used by the operator console's merchants page. */
        get: operations["list_merchants"];
        put?: never;
        /** Onboard a new merchant. Operator-only. */
        post: operations["create_merchant"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Fetch one merchant. Operator-only. the operator console's `/merchants/{id}` detail page
         *     and the cascade-management UI both call this.
         */
        get: operations["get_merchant"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/acquirers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the merchant's cascade priorities, ASC by priority (lower first).
         *     Backs the operator console's drag-to-reorder UI — paired with `assign_acquirer` for save.
         */
        get: operations["list_acquirers"];
        put?: never;
        /**
         * Assign (or update) an acquiring connector to a merchant. ON CONFLICT
         *     (merchant_id, connector_slug) updates priority + re-enables.
         */
        post: operations["assign_acquirer"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/acquirers/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove a connector from the merchant's cascade. Audited.
         * @description Hard-delete: removes the row so the cascade engine stops considering it.
         *     Reassigning via `POST.../acquirers` re-inserts cleanly thanks to the
         *     ON CONFLICT upsert.
         */
        delete: operations["remove_acquirer"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/api-keys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Mint a new API key + secret pair for a merchant. The plaintext `secret` is
         *     returned **once** in the response — it cannot be retrieved later.
         */
        post: operations["create_api_key"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/bank-accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List bank accounts for a merchant. Active rows only by default;
         *     pass `?include_archived=true` to surface soft-deleted history.
         */
        get: operations["list_bank_accounts"];
        put?: never;
        /**
         * Create a new bank account for the merchant. The row is created
         *     non-primary; promote via `POST.../{bank_id}/primary` once verified.
         */
        post: operations["create_bank_account"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/bank-accounts/{bank_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Soft-delete the bank account (status → archived). The cycle history
         *     referencing this row keeps its snapshot data intact; the `bank_account_id`
         *     pointer stays live but the source row is hidden from default listings.
         *     If the archived row was primary, it loses its flag — the merchant is
         *     left without a primary for that currency until the operator promotes
         *     another row.
         */
        delete: operations["archive_bank_account"];
        options?: never;
        head?: never;
        /**
         * Patch fields on an existing bank account. Any field omitted leaves
         *     the column untouched. To clear `currency` (drop the per-currency pin),
         *     pass `"currency": null` explicitly.
         */
        patch: operations["update_bank_account"];
        trace?: never;
    };
    "/v1/admin/merchants/{id}/bank-accounts/{bank_id}/primary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Promote a bank account to primary. Un-flags any prior primary for
         *     the same (merchant, currency) tuple in a single transaction —
         *     concurrent calls cannot leave the merchant with zero or two primaries
         *     for the same currency.
         */
        post: operations["set_primary_bank_account"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/customers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List a merchant's customers, sorted last_seen_at DESC. Includes
         *     tombstoned rows for accounting clarity — the JSON shape keeps PII
         *     columns null for those, with `erased_at` set.
         */
        get: operations["list_customers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/customers/{cid}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a single customer with full PII + counters. */
        get: operations["get_customer"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/customers/{cid}/erase": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * GDPR right-to-erasure. NULL the PII columns, stamp `erased_at`. Idempotent
         *     only against itself — a second call returns 409 with `already_erased`.
         */
        post: operations["erase_customer"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/shops": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["admin_list_shops"];
        put?: never;
        post: operations["admin_create_shop"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/shops/{shop_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["admin_get_shop"];
        put?: never;
        post?: never;
        delete: operations["admin_archive_shop"];
        options?: never;
        head?: never;
        patch: operations["admin_patch_shop"];
        trace?: never;
    };
    "/v1/admin/merchants/{id}/shops/{shop_id}/secrets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["admin_list_secrets"];
        put?: never;
        post: operations["admin_create_secret"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/shops/{shop_id}/secrets/{key_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["admin_revoke_secret"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all merchant users for a merchant. Operator-only. */
        get: operations["list_merchant_users"];
        put?: never;
        /**
         * Operator-side: create a new merchant user with a one-shot temporary
         *     password. The plaintext password is returned in this response **once**
         *     and is unrecoverable thereafter — the operator console renders a copy-to-clipboard
         *     banner exactly like the API-key reveal flow. The operator hands the
         *     temp password to the human out-of-band (Slack, in person, etc.). On
         *     first login the merchant portal will prompt for a change (phase-2; not enforced
         *     server-side yet).
         */
        post: operations["create_merchant_user"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/users/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete (or disable, depending on the future flag) a merchant user.
         *     Operator-only. Hard-delete today; phase-2 turns this into a soft
         *     delete with an `is_active=false` flip + retained audit row.
         */
        delete: operations["delete_merchant_user"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/webhook": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Configure (or rotate) the merchant's webhook URL + signing secret. */
        post: operations["set_webhook"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/webhook-endpoints": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["admin_list"];
        put?: never;
        post: operations["admin_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/merchants/{id}/webhook-endpoints/{ep_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["admin_archive"];
        options?: never;
        head?: never;
        patch: operations["admin_update"];
        trace?: never;
    };
    "/v1/admin/merchants/{id}/webhook-endpoints/{ep_id}/rotate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["admin_rotate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/metrics/issuing": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * VCI/issuing metrics over `card_transactions` for the last `window_days`
         *     (default 7, max 90), optionally filtered to one `currency`. Powers the operator console
         *     dashboard KPIs + the /card-spend breakdown without a client-side scan.
         */
        get: operations["issuing_metrics"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/organizations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["list_organizations"];
        put?: never;
        post: operations["create_organization"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/organizations/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_organization"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["patch_organization"];
        trace?: never;
    };
    "/v1/admin/organizations/{id}/keys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["mint_key"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/organizations/{id}/pricing": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_pricing"];
        put: operations["put_pricing"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/organizations/{id}/pricing/{card_type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["delete_pricing"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/organizations/{id}/topup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Credit the org prepay balance (`world -> orgs:<id>:available`). Operator
         *     manual top-up; a future the connector deposit path can reuse the same account.
         */
        post: operations["topup"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/organizations/{id}/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["list_users"];
        put?: never;
        post: operations["create_user"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/payments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the most recent payments across all merchants. Operator-only. Used by
         *     the operator console's payments page. Joined with merchants for the legal_name.
         */
        get: operations["list_payments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/permissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the permission catalogue — the finite set of keys the operator console role
         *     editor renders as toggles. No data, just the schema.
         */
        get: operations["list_permissions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/refunds": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List refunds across the deployment, newest first. Operator-only. */
        get: operations["list_refunds"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/roles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List every role, system roles first. Permissions arrays included so
         *     the operator console editor can render the matrix without a second fetch.
         */
        get: operations["list_roles"];
        put?: never;
        /**
         * Create a non-system custom role. The seeded five (user / customer /
         *     support / finance / operator) cannot be re-created via this route.
         */
        post: operations["create_role"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/roles/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Fetch one role by name. */
        get: operations["get_role"];
        put?: never;
        post?: never;
        /** Delete a custom role. System roles are protected. */
        delete: operations["delete_role"];
        options?: never;
        head?: never;
        /**
         * Patch description and/or permissions on an existing role. The
         *     operator role's permissions are locked at the wildcard; description
         *     edits are allowed.
         */
        patch: operations["patch_role"];
        trace?: never;
    };
    "/v1/admin/settings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List every declared setting with its (possibly-redacted) current value.
         *     Operator-only. NOT audited — list reads don't reveal secrets.
         */
        get: operations["list_settings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/settings/{key}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Reveal the full value of one setting. **Audited.** Returns full
         *     plaintext (or default). Failing to find the key is 404.
         */
        get: operations["get_setting"];
        /** Set a value. Runs validator before encrypting + persisting. */
        put: operations["put_setting"];
        post?: never;
        /** Delete the row — value falls back to SCHEMA default. */
        delete: operations["delete_setting"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/settlements": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List settlement cycles, newest first. Operator-only. */
        get: operations["list_cycles"];
        put?: never;
        /** Manually open a fresh cycle. Audited. */
        post: operations["open_cycle"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/settlements/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Fetch one cycle. */
        get: operations["get_cycle"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/settlements/{id}/close": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Close the cycle — freezes the window, computes payable, moves to
         *     `posted`. Audited. (the connector dispatch lands in the follow-up; today
         *     the operator handles the actual money-move and then calls
         *     `mark-completed`.)
         */
        post: operations["close_cycle"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/settlements/{id}/mark-completed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Operator confirms the money actually moved. Audited. */
        post: operations["mark_completed"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/settlements/{id}/mark-failed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Mark a cycle as failed (e.g. operator hit an issue moving money;
         *     cycle goes terminal-bad so a fresh one can open). Audited.
         */
        post: operations["mark_failed"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/subscriptions/tiers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["list_tiers"];
        put?: never;
        post: operations["create_tier"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/subscriptions/tiers/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["delete_tier"];
        options?: never;
        head?: never;
        patch: operations["patch_tier"];
        trace?: never;
    };
    "/v1/admin/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List end-users for the operator. Operator-only. */
        get: operations["admin_list_users"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** User detail. Used by the operator console's `/users/[id]` page. */
        get: operations["get_user"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/balance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Current internal (Formance ledger) balance for a user, in one currency.
         *     Backs the operator console's "Ledger Balance" card — the real balance Takeal holds for
         *     this user, which the manual adjust endpoint credits / debits.
         */
        get: operations["get_user_balance"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/balance-adjust": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Operator-only manual balance adjustment. Positive amount credits;
         *     negative debits. Mandatory `note` ends up in the audit metadata so
         *     the trail is never anonymous.
         * @description Skips the risk evaluator on purpose — this is an operator-driven
         *     fix-up of last resort.
         */
        post: operations["adjust_balance"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/balances": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List every non-zero balance a user holds, flagging the local currency.
         *     Powers the migration panel in the operator console.
         */
        get: operations["list_user_balances"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/role": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Reassign a user's role. The target role must already exist; the
         *     FK on `users.role → roles.name` rejects unknown names with a
         *     foreign-key violation.
         */
        patch: operations["patch_user_role"];
        trace?: never;
    };
    "/v1/admin/users/{id}/sessions/terminate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Operator: sign a user out everywhere (all sessions, none kept). */
        post: operations["admin_terminate_sessions"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/subscription": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_user_subscription"];
        put: operations["assign_user_subscription"];
        post?: never;
        delete: operations["cancel_user_subscription"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/totp": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Operator-only TOTP reset. Deletes the user's `user_totp` row so that
         *     their next login restarts at `totp_setup_required`.
         * @description Idempotent — returns 200 with `removed: false` when the user wasn't
         *     enrolled. Always emits an audit event so the trail is preserved
         *     regardless of whether a row was actually removed.
         *
         *     Use case: admin lost their phone / authenticator app. Operator
         *     resets, admin re-enrols on next login.
         */
        delete: operations["reset_totp"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/totp/backup-codes/regenerate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Regenerate the 10 one-shot backup codes on a user's TOTP enrolment.
         *     Old codes are invalidated immediately (the array is replaced
         *     wholesale). 404 when the user has no TOTP enrolment at all.
         * @description Use case: the operator gave the user a one-shot recovery flow and
         *     wants to rotate the unused codes; or the user themselves asks the
         *     operator to rotate after suspected disclosure.
         */
        post: operations["regenerate_backup_codes"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/wallet": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Operator: set a user's Wallet currency. Any ISO 4217 code; balances held
         *     in the previous currency become "foreign" and can be converted with
         *     `POST /admin/users/{id}/wallet-migrate`.
         */
        patch: operations["admin_set_wallet"];
        trace?: never;
    };
    "/v1/admin/users/{id}/wallet-migrate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Convert a user's entire `source_currency` balance into the local currency
         *     at the current rate + spread. Atomic; audited; idempotent on the
         *     (user, source, amount) tuple so a double-click can't double-convert.
         */
        post: operations["migrate_wallet_balance"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Log in with email + password. Returns one of three envelopes:
         * @description * `{"stage":"jwt", access_token, expires_at, user}` — end-user/customer roles.
         *     * `{"stage":"totp_setup_required", challenge_token, challenge_expires_at,
         *      secret_base32, otpauth_url}` — first admin login: enroll a TOTP.
         *     * `{"stage":"totp_required", challenge_token, challenge_expires_at}` —
         *      returning admin login: type the code.
         *
         *     Wrong-password and unknown-email return the same 401 (no enumeration).
         */
        post: operations["login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/login/2fa/switch": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["login_2fa_switch"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/login/otp/verify": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["login_otp_verify"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/login/totp": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["login_totp"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/login/totp-setup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["login_totp_setup"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Current authenticated user. The "do I still have a session"
         *     probe the client app calls on app boot — login returns the user inline,
         *     but consumers need a way to re-validate without re-running the
         *     password flow. 401 → token expired / invalidated → consumer
         *     kicks back to /login.
         */
        get: operations["me"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Change the caller's own password. Every other session is signed out; the
         *     one making this call stays valid.
         */
        post: operations["change_password"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Register a new end-user account. Role is always `user`; admin-side
         *     roles are operator-issued via `/admin/users` flows. End-users skip
         *     the TOTP gate entirely.
         */
        post: operations["register"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/telegram/exchange": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Exchange a signed Telegram Mini App `initData` payload for a session JWT.
         * @description The bot token is the shared secret, so validation is authoritative here.
         *     First-time Telegram users are **auto-provisioned**: a fresh end-user is
         *     created keyed by the Telegram id, with a synthetic placeholder email and
         *     `email_pending = true`. The client must then collect a real email from the
         *     user and attach it via `POST /me/email` (which clears the flag).
         *
         *     Returns the same `{"stage":"jwt", access_token, expires_at, user, …}`
         *     envelope as `/auth/login`; `user.email_pending` tells the client whether to
         *     prompt for an email.
         */
        post: operations["telegram_exchange"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/blog/images/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Serve an image's bytes. **No auth**. Content is immutable per id, so it
         *     carries a long-lived cache and an ETag — a the client app can hotlink these
         *     straight from `cover_url` / image blocks.
         */
        get: operations["get_image"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/blog/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Published posts, newest first. **No auth** — public content. */
        get: operations["blog_list_posts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/blog/posts/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** One published post by its slug. **No auth**. */
        get: operations["blog_get_post"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/balance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * User's wallet balance for a given currency. (Display name is brandable via
         *     `GET /branding` → `wallet_label`; this field set never changes.)
         */
        get: operations["get_balance"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/cards": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List the authenticated user's cards, most recent first. */
        get: operations["me_list_cards"];
        put?: never;
        /**
         * Create a card. Currently only PREPAID is implemented end-to-end; CREDIT and
         *     GIFT return 400 `not yet implemented`.
         * @description **Idempotency:** the `Idempotency-Key` header is required.
         */
        post: operations["me_create_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/cards/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Fetch a single card. */
        get: operations["me_get_card"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/cards/{id}/balance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Prepaid card's remaining balance. */
        get: operations["get_card_balance"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/cards/{id}/freeze": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Freeze the caller's **own** card. Ownership-gated (404/403 if it isn't
         *     theirs). Idempotent; 501 if the connector doesn't support freeze.
         */
        post: operations["me_freeze_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/cards/{id}/reveal": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Reveal full PAN + CVV for the caller's OWN card. */
        post: operations["reveal_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/cards/{id}/terminate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Terminate the caller's **own** card. One-way; idempotent. Ownership-gated. */
        post: operations["me_terminate_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/cards/{id}/unfreeze": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Unfreeze the caller's **own** card. Ownership-gated. Idempotent. */
        post: operations["me_unfreeze_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/deposits": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List the authenticated user's deposits, most recent first. */
        get: operations["list_deposits"];
        put?: never;
        /**
         * Initiate a deposit. the platform calls the configured the connector; on
         *     immediate `confirmed` the user's wallet balance is credited synchronously.
         * @description **Idempotency:** the `Idempotency-Key` header is required. Replay returns the
         *     original deposit; a different body with the same key returns 409.
         */
        post: operations["create_deposit"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/deposits/quotes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Price a cross-currency deposit BEFORE paying. The rate is locked for
         *     the quote's TTL; deposits in the local currency need no quote.
         */
        post: operations["create_deposit_quote"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/deposits/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Fetch a single deposit. */
        get: operations["get_deposit"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/deposits/{id}/refunds": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Refund a previously-confirmed deposit. Synchronous if the
         *     connector settles inline; otherwise the row stays `pending` and flips later
         *     via the inbound `deposit.refunded` event.
         * @description **Idempotency:** `Idempotency-Key` header required.
         */
        post: operations["refund_deposit"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/email": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Attach a real email to the current user and clear `email_pending`.
         * @description Telegram Mini App users are auto-provisioned with a synthetic placeholder
         *     email (`email_pending = true`); the client calls this once
         *     it has collected the user's real address. Password-registered users may
         *     also use it to change their email. The new address must be unique (409).
         *
         *     Note: email *ownership verification* (a confirmation OTP) is a follow-up —
         *     this records the attached address and lifts the pending flag.
         */
        post: operations["set_email"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/sessions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Live sessions of the caller (this device + every other signed-in one). */
        get: operations["list_sessions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/sessions/terminate-others": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Sign out every other device signed in as the caller. The current
         *     session stays.
         */
        post: operations["terminate_other_sessions"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/sessions/{jti}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Sign out one session (any device, including the current one). */
        delete: operations["revoke_session"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/subscriptions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** The caller's announcement subscriptions. */
        get: operations["get_subscriptions"];
        /**
         * Replace the caller's announcement subscriptions.
         * @description Subscribing to a channel the account has no contact for (Telegram without
         *     a linked account) is accepted but silently undeliverable — link the
         *     channel first.
         */
        put: operations["put_subscriptions"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/wallet": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** The caller's Wallet currency and the currencies they may switch to. */
        get: operations["get_my_wallet"];
        /**
         * Switch the caller's Wallet currency. Allowed only while every balance is
         *     zero (a funded Wallet is migrated by an operator instead), and only to
         *     the local currency or one listed in `wallet.allowed_currencies`.
         */
        put: operations["set_my_wallet"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/api-keys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["list_keys"];
        put?: never;
        post: operations["create_key"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/api-keys/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["delete_key"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Organization-user login. Returns a scoped JWT for the merchant portal's VCI admin. */
        post: operations["org_login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/auth/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Current org-user (whoami) — the merchant portal bootstraps its session from this. */
        get: operations["org_me"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/balance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Current prepay balance in the org's billing currency. */
        get: operations["org_balance"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/cards": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all cards this organization has issued. */
        get: operations["org_list_cards"];
        put?: never;
        /**
         * Issue a prepaid card for an end-user holder, funded from the org prepay
         *     balance. The resale fee (per-org, per-card-type) is debited first; then the
         *     card load. Connector is chosen by Takeal and not revealed.
         */
        post: operations["org_create_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/cards/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["org_get_card"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/cards/{id}/balance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["card_balance"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/cards/{id}/freeze": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["org_freeze_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/cards/{id}/reload": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["org_reload_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/cards/{id}/terminate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["org_terminate_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/cards/{id}/unfreeze": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["org_unfreeze_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Organization info + current prepay balance. Whoami for the resale client. */
        get: operations["org_org_me"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List the org's active employee roster. */
        get: operations["list_members"];
        put?: never;
        /**
         * Invite one end-user (employee) by email. Find-or-creates a passwordless
         *     Takeal user and rosters them under the org. Idempotent per email.
         */
        post: operations["invite_member"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/members/bulk": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Bulk-invite employees (CSV-style upload from the merchant portal). Per-row errors are
         *     returned alongside the successes rather than failing the whole batch.
         */
        post: operations["bulk_invite_members"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/members/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove an employee from the roster (soft). Their already-issued cards keep
         *     working — this only stops them appearing in future payroll runs.
         */
        delete: operations["remove_member"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/payroll": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Run a salary batch: issue a prepaid card to each listed member, funded from
         *     the org prepay balance (per-org resale fee + load). Per-member results;
         *     one failure doesn't abort the batch.
         */
        post: operations["run_payroll"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/webhook-endpoints": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["list_webhooks"];
        put?: never;
        post: operations["create_webhook"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/webhook-endpoints/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["delete_webhook"];
        options?: never;
        head?: never;
        patch: operations["update_webhook"];
        trace?: never;
    };
    "/v1/org/webhook-endpoints/{id}/rotate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["rotate_webhook"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        /**
         * @description Postal address. ISO 3166 codes for `state` / `country` are recommended where
         *     the provider supports them, but not enforced at this layer.
         */
        Address: {
            city?: string | null;
            /** @description ISO 3166-1 alpha-2, e.g. `"US"`. */
            country?: string | null;
            line1?: string | null;
            line2?: string | null;
            postal_code?: string | null;
            /** @description ISO 3166-2 subdivision code, e.g. `"US-CA"`. Free-form fallback accepted. */
            state?: string | null;
        };
        AdjustBalanceBody: {
            /**
             * @description Positive = credit, negative = debit. Decimal-as-string on the wire.
             * @example 10.00
             */
            amount: string;
            /** @description ISO 4217 — matches one of the operator-configured ledger currencies. */
            currency: string;
            /** @description Mandatory human-readable justification (audit metadata). */
            note: string;
        };
        AdjustBalanceResult: {
            amount: string;
            currency: string;
            direction: string;
            /** Format: uuid */
            user_id: string;
        };
        AdminCreateCardBody: {
            /** @description Chosen card BIN; threaded as `metadata["issuer_bin"]`. */
            bin?: string | null;
            /** @description ISO 4217 currency, e.g. `USD`. */
            currency: string;
            customer?: null | components["schemas"]["CustomerInfo"];
            /**
             * @description Prepaid load amount (debited from the target user's wallet balance).
             * @example 1.00
             */
            initial_amount?: string | null;
            /** @description Issuer connector slug, e.g. `the connector`. */
            issuer_slug: string;
            /**
             * @description Extra connector metadata. `issuer_program_id`/`issuer_bin` are set from
             *     the fields above and override any same-named keys here.
             */
            metadata?: {
                [key: string]: string;
            };
            /**
             * @description Chosen program/product id from `GET /admin/connectors/{slug}/programs`.
             *     Threaded to the connector as `metadata["issuer_program_id"]`.
             */
            program_id?: string | null;
            /** @description Card type. Only `prepaid` is wired end-to-end today; defaults to prepaid. */
            type?: components["schemas"]["CardType"];
            /**
             * Format: uuid
             * @description End-user the card is issued for.
             */
            user_id: string;
        };
        /**
         * @description Everything the operator console needs to render one post row *and* decide the state of its
         *     broadcast buttons, in a single fetch.
         */
        AdminPostView: components["schemas"]["BlogPost"] & {
            /** @description Send history, newest first. */
            broadcasts: components["schemas"]["BroadcastRow"][];
            /** @description Per-channel button state — see [`ChannelState`]. */
            channels: components["schemas"]["ChannelState"][];
            /** @description Public URL of the cover image, when set. */
            cover_url?: string | null;
        };
        AdminWalletView: {
            currency: string;
            explicit: boolean;
            /** Format: uuid */
            user_id: string;
        };
        /**
         * @description What we return for an API key on the listing endpoint. `key` is the
         *     public-ish identifier (safe to display); the secret was captured
         *     exactly once at creation time.
         */
        ApiKeyRow: {
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            key: string;
            /** Format: date-time */
            last_used_at?: string | null;
            /** Format: uuid */
            shop_id: string;
            status: string;
        };
        ApiKeySecretView: {
            api_key: components["schemas"]["ApiKeyView"];
            /** @description One-shot plaintext secret (X-Organization-Secret). */
            secret: string;
        };
        ApiKeyView: {
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            key: string;
            label: string;
            /** Format: date-time */
            last_used_at?: string | null;
            status: string;
        };
        AssignAcquirerBody: {
            /**
             * @description Slug matching a `ConnectorBinding` registered at the platform startup
             *     (today: `mock-the connector`).
             */
            connector_slug: string;
            /**
             * Format: int32
             * @description Lower = higher priority. Cascade engine tries ASC.
             */
            priority?: number;
        };
        AssignBody: {
            /** Format: uuid */
            tier_id: string;
        };
        /**
         * @description one entry per second-factor method available to the
         *     user in this deployment. Only sent when [`AvailableMethodKind::Totp`]
         *     is in the set AND at least one other method (else the operator console hides the
         *     "Try another way" link entirely).
         */
        AvailableMethod: {
            /**
             * @description Hint text under the input (e.g. `"Sent to f••••@example.com"`).
             *     `None` for `totp` (no hint needed — user knows where it is).
             */
            hint?: string | null;
            /**
             * @description True when this is the server-suggested default — the operator console renders the
             *     input for THIS method on first paint. Priority TOTP > Telegram >
             *     email.
             */
            is_default?: boolean;
            /** @description `"totp"` | `"telegram_otp"` | `"email_otp"`. Frozen wire shape. */
            kind: string;
            /** @description Short label the operator console renders in the picker modal. */
            label: string;
        };
        BackupCodesResult: {
            /**
             * Format: int64
             * @description New length of `user_totp.backup_codes_hash` after the rotate.
             */
            backup_codes_remaining: number;
            /**
             * @description 10 freshly-generated `XXXX-XXXX` plaintext codes. Returned ONCE.
             *     Operator surfaces them in a copy-to-clipboard panel; never
             *     stored client-side.
             */
            codes: string[];
            /** Format: uuid */
            user_id: string;
        };
        BalanceDto: {
            account: string;
            /** @example 168.30 */
            amount: string;
            currency: string;
            label: string;
        };
        BalanceResponse: {
            amount: string;
            currency: string;
        };
        BalanceView: {
            amount: string;
            currency: string;
        };
        BankAccount: {
            account_number: string;
            bank_country: string;
            bank_name: string;
            /** Format: date-time */
            created_at: string;
            /** @description ISO 4217 — `None` = applicable to any currency. */
            currency?: string | null;
            holder_name: string;
            iban: string;
            /** Format: uuid */
            id: string;
            is_primary: boolean;
            label: string;
            /** Format: uuid */
            merchant_id: string;
            routing_number: string;
            status: components["schemas"]["BankAccountStatus"];
            swift_bic: string;
            /** Format: date-time */
            updated_at: string;
        };
        /** @enum {string} */
        BankAccountStatus: "active" | "archived";
        /** @description Partial-update payload. Any field omitted = unchanged. */
        BankAccountUpdate: {
            account_number?: string | null;
            bank_country?: string | null;
            bank_name?: string | null;
            currency?: string | null;
            holder_name?: string | null;
            iban?: string | null;
            label?: string | null;
            routing_number?: string | null;
            swift_bic?: string | null;
        };
        /** @description One renderable node of a post body. */
        Block: {
            /** Format: int32 */
            level: number;
            text: string;
            /** @enum {string} */
            type: "heading";
        } | {
            text: string;
            /** @enum {string} */
            type: "paragraph";
        } | {
            alt?: string;
            /**
             * @description Text on the line right after the image, if it was italic
             *     (`*caption*`) — the conventional way to caption in Markdown.
             */
            caption?: string | null;
            /** @enum {string} */
            type: "image";
            url: string;
        } | {
            items: string[];
            ordered: boolean;
            /** @enum {string} */
            type: "list";
        } | {
            text: string;
            /** @enum {string} */
            type: "quote";
        } | {
            lang?: string;
            text: string;
            /** @enum {string} */
            type: "code";
        } | {
            /** @enum {string} */
            type: "divider";
        };
        /** @description Image metadata (bytes are streamed separately by the read endpoint). */
        BlogImageMeta: {
            alt: string;
            /** Format: int32 */
            byte_size: number;
            content_type: string;
            /** Format: date-time */
            created_at: string;
            filename: string;
            /** Format: uuid */
            id: string;
        };
        /**
         * @description A post row as stored. Operator-facing; the public payload is
         *     [`PublicPost`].
         */
        BlogPost: {
            /** Format: uuid */
            author_user_id?: string | null;
            body_markdown: string;
            /**
             * Format: int32
             * @description Bumped on every content edit; broadcast buttons compare against it.
             */
            content_version: number;
            /** Format: uuid */
            cover_image_id?: string | null;
            /** Format: date-time */
            created_at: string;
            excerpt: string;
            /** Format: uuid */
            id: string;
            locale: string;
            /** Format: date-time */
            published_at?: string | null;
            slug: string;
            status: string;
            tags: string[];
            title: string;
            /** Format: date-time */
            updated_at: string;
        };
        Branding: {
            /** @description Accent colour, `#rrggbb`. Empty → the client's bundled palette. */
            accent_color: string;
            /**
             * @description Favicon (absolute URL or `data:` URI). Empty → the client's bundled
             *     default favicon.
             */
            favicon_url: string;
            /**
             * @description Logo image (absolute URL or `data:` URI). Empty → the client's bundled
             *     default logo.
             */
            logo_url: string;
            /**
             * @description Operator-chosen merchant/tenant portal name. Replaces "the merchant portal" in
             *     the merchant portal. Default "the merchant portal".
             */
            merchant_portal_name: string;
            /** @description Operator-chosen platform name. Replaces "Takeal" in the operator console. Default "Takeal". */
            platform_name: string;
            /** @description Primary brand colour, `#rrggbb`. Empty → the client's bundled palette. */
            primary_color: string;
            /** @description Secondary brand colour, `#rrggbb`. Empty → the client's bundled palette. */
            secondary_color: string;
            /**
             * @description User-facing name of the end-user's balance (e.g. "Wallet",
             *     "Acme Wallet"). Display-only — JSON field names such as `balance`
             *     never change. Default "Wallet".
             */
            wallet_label: string;
        };
        BreakerView: {
            /** Format: int64 */
            calls: number;
            /** Format: int32 */
            consecutive_failures: number;
            /** Format: int64 */
            failures: number;
            /**
             * Format: int64
             * @description How many times the circuit has tripped open since boot.
             */
            opens: number;
            /**
             * Format: int64
             * @description Calls rejected because the circuit was open.
             */
            rejects_open: number;
            /**
             * Format: int64
             * @description Calls rejected by the per-slug rate limiter.
             */
            rejects_rate: number;
            slug: string;
            /** @description `closed` | `open` | `half_open`. */
            state: string;
        };
        BroadcastBody: {
            /** @description `email` | `telegram`. */
            channel: string;
        };
        BroadcastResult: {
            /** Format: uuid */
            broadcast_id: string;
            channel: string;
            /** Format: int32 */
            content_version: number;
            /**
             * Format: int32
             * @description Subscribers we could not enqueue for (transport hiccups); they are
             *     counted, not retried — the post is still readable on the site.
             */
            failures: number;
            /**
             * Format: int32
             * @description Messages handed to the notification substrate.
             */
            recipients: number;
        };
        /** @description One send attempt of a post to one channel. */
        BroadcastRow: {
            channel: string;
            /**
             * Format: int32
             * @description The post's `content_version` at request time. When the post has moved
             *     on, the operator console offers a re-send.
             */
            content_version: number;
            /** Format: date-time */
            created_at: string;
            error?: string | null;
            /** Format: int32 */
            failures: number;
            /** Format: date-time */
            finished_at?: string | null;
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            post_id: string;
            /** Format: int32 */
            recipients: number;
            /** Format: uuid */
            requested_by?: string | null;
            status: string;
        };
        BulkInviteBody: {
            members: components["schemas"]["InviteBody"][];
        };
        BulkInviteResult: {
            errors: components["schemas"]["RowError"][];
            invited: components["schemas"]["MemberView"][];
        };
        /**
         * @description Persisted card record as it lives in `cards`. The `id` is the platform-side (assigned at
         *     insert) and is what `IssuingConnector::create_card` carries as the connector-side
         *     idempotency key; `provider_reference` is the connector's id, populated after the
         *     connector responds. API-side replay-safety is via `(user_id, idempotency_key)`
         *     UNIQUE + `request_fingerprint` comparison.
         *
         *     `redemption_code` is serialised to the caller exactly once — at creation. Subsequent
         *     list/get responses scrub it (the user has already seen it). This is enforced in the
         *     service layer (`scrub_redemption_code`); the database keeps the code so we can
         *     resend it if genuinely needed for support, behind an explicit operator action.
         *
         *     **SQL column-sync invariant:** `FromRow` maps by name and has no
         *     `#[sqlx(default)]`, so EVERY `SELECT … FROM cards` and `… RETURNING …` that
         *     decodes into `Card` must list ALL of the columns below — a missing column is a
         *     runtime decode error (HTTP 500), not a compile error. When you add a field
         *     here, add the matching column to every Card-producing query in
         *     `service.rs` (the idempotent-replay SELECTs are the easy ones to forget).
         */
        Card: {
            card_type: components["schemas"]["CardType"];
            /**
             * @description Slug of the connector binding that minted this card (e.g. `the connector`).
             *     Persisted at insert so audit + reconciliation can match cards to providers
             *     even after `the connector` env config changes.
             */
            connector_slug: string;
            /** Format: date-time */
            created_at: string;
            currency: string;
            /** Format: int32 */
            expiry_month?: number | null;
            /** Format: int32 */
            expiry_year?: number | null;
            failure_reason?: string | null;
            /**
             * @description provider-driven funding model, lower-case (`shared` | `standard`).
             *     `shared` = master-account (draws from a pooled wallet up to a per-card
             *     cumulative limit — the opposite of prepaid); `standard` = prepaid/recharge.
             *     NULL until the connector reports it (on create or refresh-from-connector).
             */
            funding_mode?: string | null;
            /** Format: uuid */
            id: string;
            initial_amount?: string | null;
            last4?: string | null;
            /**
             * @description the resolved issuer program/plan this card was minted against
             *     (the `issuer_program_id` sent to the connector). NULL for cards issued
             *     before or against connectors without a program catalogue.
             */
            program_code?: string | null;
            provider_reference?: string | null;
            /**
             * @description Set on creation for Gift cards only. Scrubbed before returning to the client on
             *     list/get to avoid replay; kept in the DB for operator-side recovery.
             */
            redemption_code?: string | null;
            status: components["schemas"]["CardStatus"];
            /** Format: date-time */
            updated_at: string;
            /** Format: uuid */
            user_id: string;
        };
        /** @description Live balance/limit, nested under the card detail's `live_balance`. */
        CardBalance: {
            /**
             * @description Live amount; `null` when the connector doesn't report a balance.
             * @example 21.00
             */
            amount?: string | null;
            currency?: string | null;
        };
        /**
         * @description Single card's full detail + a best-effort live balance/limit from the
         *     connector. The card fields are flattened (so the JSON is the `Card` shape
         *     plus a nested `live_balance`).
         */
        CardDetail: components["schemas"]["Card"] & {
            live_balance?: null | components["schemas"]["CardBalance"];
        };
        CardRow: {
            card_type: string;
            connector_slug: string;
            /** Format: date-time */
            created_at: string;
            currency: string;
            /**
             * @description provider-driven funding model (`shared` | `standard`). `null` for
             *     cards issued before / connectors that don't distinguish.
             */
            funding_mode?: string | null;
            /** Format: uuid */
            id: string;
            /** @example 50.00 */
            initial_amount?: string | null;
            last4?: string | null;
            status: string;
            user_email: string;
            /** Format: uuid */
            user_id: string;
        };
        /** @enum {string} */
        CardStatus: "pending_payment" | "active" | "frozen" | "terminated" | "redeemed" | "failed";
        CardTxnRow: {
            /**
             * @description Signed decimal-as-string; negative = spend.
             * @example -10.32
             */
            amount: string;
            /** Format: date-time */
            authorised_at?: string | null;
            /** @description What the card was actually charged (billing leg), decimal-as-string. */
            billing_amount?: string | null;
            billing_currency?: string | null;
            /** @description The billing leg in USD (the ledger currency), decimal-as-string. */
            billing_usd_amount?: string | null;
            /** Format: uuid */
            card_id: string;
            /** Format: date-time */
            cleared_at?: string | null;
            connector_slug: string;
            currency: string;
            decline_reason?: string | null;
            /** Format: uuid */
            id: string;
            last4?: string | null;
            merchant_country?: string | null;
            merchant_mcc?: string | null;
            merchant_name?: string | null;
            /** Format: date-time */
            occurred_at: string;
            /** @description Provider's raw status (e.g. OKCard txnStatus "SUCCESS") — panel parity. */
            provider_status?: string | null;
            provider_txn_id: string;
            /**
             * @description Normalised status: `pending` | `cleared` | `reversed` | `declined` |
             *     `unknown`. Provider-specific values are mapped by the connector
             *     (e.g. OKCard `SUCCESS` → `cleared`); `unknown` = the connector
             *     reported something outside the contract and the row is kept rather
             *     than dropped. The raw value is in `provider_status`.
             * @example cleared
             */
            status: string;
            user_email?: string | null;
            /** Format: uuid */
            user_id?: string | null;
        };
        /** @enum {string} */
        CardType: "credit" | "prepaid" | "gift";
        ChangePasswordBody: {
            current_password: string;
            /**
             * @description At least 12 characters with a lower-case letter, an upper-case letter
             *     and a digit; must differ from the current password.
             */
            new_password: string;
        };
        ChangePasswordResult: {
            /**
             * Format: int64
             * @description Other sessions of this account that were signed out.
             */
            revoked_sessions: number;
        };
        /**
         * @description Derived state of one broadcast button. The server decides; the operator console renders.
         *     Keeping this here means the rules can't drift between the UI and the
         *     endpoint that enforces them.
         */
        ChannelState: {
            /**
             * @description Machine-readable reason when `can_send` is false:
             *     `not_published` | `channel_disabled` | `no_subscribers` | `already_sent` | `in_flight`.
             */
            blocked_by?: string | null;
            /** @description Whether the button should be clickable. */
            can_send: boolean;
            /** @description `email` | `telegram` | … */
            channel: string;
            /**
             * @description True when a send exists for an older version of the post — the operator console
             *     offers "re-send (updated)" rather than a first send.
             */
            is_resend: boolean;
            /** Format: date-time */
            last_sent_at?: string | null;
            /**
             * Format: int32
             * @description Recipients of the most recent completed send, if any.
             */
            last_sent_recipients?: number | null;
            /**
             * Format: int64
             * @description Active subscribers on this channel right now.
             */
            subscribers: number;
        };
        CheckResult: {
            error?: string | null;
            ok: boolean;
            /**
             * @description `true` when the check was a no-op because the dependency isn't
             *     configured in this deployment. `ok` stays `true` in that case so
             *     the aggregate readiness isn't false-positive-degraded.
             */
            skipped?: boolean;
        };
        ConfigurationView: {
            /** Format: date-time */
            updated_at: string;
            /** @description Full plaintext map. **One-shot reveal — this endpoint is audited.** */
            variables: {
                [key: string]: string;
            };
        };
        ConnectorCounts: {
            acquirers: number;
            funders: number;
            issuers: number;
            settlers: number;
        };
        ConnectorStats: {
            /** @description What `amount` sums for this role (e.g. "payment amount", "card load"). */
            amount_basis: string;
            buckets: components["schemas"]["StatBucket"][];
            /** @description `funder` | `issuer` | `acquirer` | `settler`. */
            role: string;
        };
        /**
         * @description Redacted connector view — what the operator sees on every read. Secrets
         *     are shown only as `sk_<prefix>…<suffix>` previews so an operator can
         *     recognise the row they just created but can't recover the value.
         */
        ConnectorView: {
            /**
             * Format: int32
             * @description point 4 — issuer cascade order (lower wins). Per-program pricing
             *     (the `connector_card_programs` table) replaced the earlier per-connector
             *     pricing block in.
             */
            cascade_priority: number;
            /**
             * @description Redacted preview of `configuration_variables` — keys present + each
             *     value redacted as `sk_<prefix>…<suffix>`. Empty `{}` on rows that
             *     haven't had any variables written yet. **No plaintext.** Use
             *     `GET /admin/connectors/{slug}/configuration` for that (audited).
             */
            configuration_variables_preview: {
                [key: string]: string;
            };
            /** Format: date-time */
            created_at: string;
            grpc_url: string;
            outbound_auth_secret_preview: string;
            role: string;
            signing_secret_preview: string;
            slug: string;
            status: string;
            /** Format: date-time */
            updated_at: string;
        };
        /**
         * @example {
         *       "currency": "USD",
         *       "initial_amount": "50.00",
         *       "type": "prepaid"
         *     }
         */
        CreateCardBody: {
            currency: string;
            customer?: null | components["schemas"]["CustomerInfo"];
            initial_amount?: string | null;
            /**
             * @description Optional. Slug of a configured the connector (e.g. `the connector`,
             *     `the connector`). When omitted, the first configured the connector mints the card.
             *     Unknown slug → 400 `validation`. Empty the connector list → 503.
             */
            issuer_slug?: string | null;
            metadata?: {
                [key: string]: string;
            };
            /**
             * @description `credit` (TODO phase-2), `prepaid`, or `gift` (TODO phase-2). Only `prepaid`
             *     is fully wired today.
             */
            type: components["schemas"]["CardType"];
        };
        CreateConnectorBody: {
            /**
             * @description Where the platform dials the slave. `http://` for loopback dev,
             *     `https://` for prod.
             */
            grpc_url: string;
            /** @description `funder` | `issuer` | `acquirer`. */
            role: string;
            /**
             * @description Stable lowercase identifier. Convention: `<role>-<provider>`,
             *     e.g. `the connector`. See CLAUDE.md "Naming Convention".
             */
            slug: string;
        };
        CreateConnectorResponse: {
            connector: components["schemas"]["ConnectorView"];
            /**
             * @description **One-shot, plaintext.** the platform presents this as `x-takeal-auth`
             *     gRPC metadata on every outbound RPC.
             */
            outbound_auth_secret: string;
            /**
             * @description **One-shot, plaintext.** Slave HMAC-signs inbound webhooks with this
             *     secret (`X-Takeal-Connector-Signature`). Operator copies
             *     it now; subsequent reads only return the redacted preview.
             */
            signing_secret: string;
        };
        /**
         * @example {
         *       "amount": "100.00",
         *       "currency": "USD",
         *       "method": "card"
         *     }
         */
        CreateDepositBody: {
            /** @example 100.00 */
            amount: string;
            currency: string;
            customer?: null | components["schemas"]["CustomerInfo"];
            /**
             * @description Optional. Slug of a configured the connector (e.g. `the connector`,
             *     `the connector`). When omitted, the first configured the connector handles
             *     the deposit. Unknown slug → 400 `validation`. Empty the connector list → 503.
             */
            funder_slug?: string | null;
            metadata?: {
                [key: string]: string;
            };
            /** @description One of `card`, `crypto`, `bank_transfer`. */
            method: components["schemas"]["DepositMethod"];
            /**
             * Format: uuid
             * @description Required when `currency` differs from the Wallet's local currency
             *     (see `GET /branding` + `POST /me/deposits/quotes`): the rate-locked
             *     quote this deposit executes against.
             */
            quote_id?: string | null;
        };
        CreateEndpointBody: {
            /** @description Empty / omitted → receives every event. */
            event_filter?: string[];
            label: string;
            url: string;
        };
        CreateKeyBody: {
            label?: string | null;
        };
        CreateMerchantBody: {
            legal_name: string;
            settlement_currency: string;
        };
        CreateMerchantUserBody: {
            email: string;
            role: components["schemas"]["MerchantRole"];
        };
        CreateOrgBody: {
            billing_currency: string;
            legal_name: string;
        };
        /**
         * @example {
         *       "amount": "5000.00",
         *       "currency": "RUB"
         *     }
         */
        CreateQuoteBody: {
            /**
             * @description Amount the user will pay, in `currency`.
             * @example 5000.00
             */
            amount: string;
            /** @description ISO 4217 source currency — must differ from the local currency. */
            currency: string;
        };
        /**
         * @example {
         *       "amount": "100.00",
         *       "reason": "customer_request"
         *     }
         */
        CreateRefundBody: {
            /**
             * @description Amount to refund. Omit for full refund of the original confirmed amount.
             * @example 100.00
             */
            amount?: string | null;
            /**
             * @description Provider-specific extras. The mock funder recognises
             *     `mock_scenario` = `happy|pending|fail`.
             */
            metadata?: {
                [key: string]: string;
            };
            /** @description Human-readable reason. */
            reason?: string;
        };
        CreateUserBody: {
            email: string;
            role: components["schemas"]["OrganizationRole"];
        };
        CreateWebhookBody: {
            event_filter?: string[];
            label: string;
            url: string;
        };
        /**
         * @example {
         *       "email": "alice@example.com",
         *       "password": "hunter22supersecret"
         *     }
         */
        Credentials: {
            email: string;
            password: string;
            /**
             * @description Optional Wallet currency for the new account. Must be the
             *     deployment's local currency or one of `wallet.allowed_currencies`;
             *     omitted = local. Ignored on login.
             */
            wallet_currency?: string | null;
        };
        /** @description Full per-merchant customer row. */
        Customer: {
            /** @description Billing address line 1. */
            address_line1?: string | null;
            /** @description Billing address line 2. */
            address_line2?: string | null;
            /**
             * Format: date
             * @description ISO 8601 date — stored as `NaiveDate` in the DB.
             */
            birth_date?: string | null;
            /** @description City. */
            city?: string | null;
            /** @description ISO 3166-1 alpha-2. */
            country?: string | null;
            /**
             * Format: date-time
             * @description Row creation time.
             */
            created_at: string;
            /** @description Lowercased on insert/upsert for the LOWER() partial-unique index. */
            email?: string | null;
            /**
             * Format: date-time
             * @description Set when the row was tombstoned. PII columns are NULL when this
             *     is non-null; the row stays so payment_history links survive.
             */
            erased_at?: string | null;
            /** @description Merchant-supplied dedup key (e.g. CRM id). NULL once erased. */
            external_id?: string | null;
            /** @description Given name. */
            first_name?: string | null;
            /**
             * Format: date-time
             * @description First time this customer was upserted at this merchant.
             */
            first_seen_at: string;
            /**
             * Format: uuid
             * @description Stable internal id.
             */
            id: string;
            /** @description Family name. */
            last_name?: string | null;
            /**
             * Format: date-time
             * @description Touched on every successful upsert.
             */
            last_seen_at: string;
            /**
             * Format: uuid
             * @description FK → merchants.id. Per-merchant scope.
             */
            merchant_id: string;
            /**
             * Format: int64
             * @description Count of every payment row stamped with this customer_id (any status).
             */
            payment_count: number;
            /** @description Free-form on this layer; downstream providers may insist on E.164. */
            phone?: string | null;
            /** @description Postal code. */
            postal_code?: string | null;
            /** @description State / province (ISO 3166-2 fragment recommended). */
            state?: string | null;
            /**
             * Format: int64
             * @description Count of payment rows that reached `succeeded`. Lifetime — refunds
             *     don't decrement.
             */
            succeeded_count: number;
            /**
             * Format: date-time
             * @description Row last-update time.
             */
            updated_at: string;
        };
        CustomerInfo: {
            billing_address?: null | components["schemas"]["Address"];
            /**
             * @description ISO 8601 `YYYY-MM-DD`. Optional. KYC-tier issuers (OKCard) flag
             *     cardholder records without it; the connector decides whether to
             *     reject upfront or pass through (Polish-bug-d, 2026-06-09).
             */
            birth_date?: string | null;
            email?: string | null;
            first_name?: string | null;
            last_name?: string | null;
            /** @description E.164 format, e.g. `"+48..."`. Free-form fallback accepted. */
            phone?: string | null;
        };
        /**
         * @description Row shape for the list endpoints. Subset of [`Customer`] — drops
         *     the address columns for table-friendly width.
         */
        CustomerListItem: {
            /** @description ISO 3166-1 alpha-2 — NULL when erased. */
            country?: string | null;
            /** @description Email — NULL when erased. */
            email?: string | null;
            /**
             * Format: date-time
             * @description Tombstone timestamp, if any.
             */
            erased_at?: string | null;
            /** @description External id (CRM id, etc.) — null when absent or erased. */
            external_id?: string | null;
            /** @description First name — NULL when erased. */
            first_name?: string | null;
            /**
             * Format: uuid
             * @description Stable internal id.
             */
            id: string;
            /** @description Last name — NULL when erased. */
            last_name?: string | null;
            /**
             * Format: date-time
             * @description Last seen.
             */
            last_seen_at: string;
            /**
             * Format: uuid
             * @description FK → merchants.id.
             */
            merchant_id: string;
            /**
             * Format: int64
             * @description Lifetime payment count.
             */
            payment_count: number;
            /**
             * Format: int64
             * @description Lifetime succeeded count.
             */
            succeeded_count: number;
        };
        /** @description One row from `settlement_cycles`. */
        Cycle: {
            /**
             * @description Signed the operator console URL for artifact download (wire_prefill etc.). NULL for
             *     auto-payout methods.
             */
            artifact_url?: string | null;
            /**
             * Format: date-time
             * @description Timestamp of `completed` transition.
             */
            completed_at?: string | null;
            /**
             * Format: uuid
             * @description Operator who marked completed.
             */
            completed_by?: string | null;
            /**
             * Format: date-time
             * @description Row creation timestamp.
             */
            created_at: string;
            /** @description Settlement currency, snapshotted at open. */
            currency: string;
            /** @description Set when status='failed'. */
            failure_reason?: string | null;
            /**
             * @description Takeal fee deducted from gross.
             * @example 25.00
             */
            fee_amount: string;
            /**
             * @description Sum of cleared payments in the window.
             * @example 1000.00
             */
            gross_amount: string;
            /**
             * Format: uuid
             * @description Cycle UUID.
             */
            id: string;
            /**
             * Format: uuid
             * @description Owning merchant.
             */
            merchant_id: string;
            /**
             * @description What the merchant ultimately receives (gross − fee).
             * @example 975.00
             */
            net_amount: string;
            /** @description Specific the connector-<provider> slug, if dispatched. NULL in MVP. */
            outband_slug?: string | null;
            /**
             * Format: date-time
             * @description Window end (set at cycle close — when status moves to `Freezing`).
             */
            period_end?: string | null;
            /**
             * Format: date-time
             * @description Window start (set at cycle open).
             */
            period_start: string;
            /**
             * Format: date-time
             * @description Timestamp of `posted` transition.
             */
            posted_at?: string | null;
            /** @description Settlement method (the connector family) snapshotted at open. */
            settlement_method: string;
            /** @description State machine position. */
            status: components["schemas"]["CycleStatus"];
            /**
             * Format: date-time
             * @description Last mutation timestamp.
             */
            updated_at: string;
        };
        /**
         * @description Cycle state. Matches the `settlement_cycles.status` CHECK; same wire
         *     form (snake_case) in audit metadata + ApiError code.
         * @enum {string}
         */
        CycleStatus: "open" | "freezing" | "posted" | "completed" | "failed";
        DayBucket: {
            /** Format: int64 */
            count: number;
            /** Format: date-time */
            day: string;
            spend: string;
        };
        DebitBody: {
            /**
             * @description Amount to LOWER the card's cumulative limit by (shared cards only).
             * @example 10.00
             */
            amount: string;
            /** @description ISO 4217 currency code (e.g. `USD`). Must match the card's currency. */
            currency: string;
            /**
             * Format: uuid
             * @description client-generated idempotency key (UUID), stable across retries of
             *     the same intent. A replay with the same key is a no-op — protects
             *     against double-submit lowering the limit twice.
             */
            idempotency_key: string;
            metadata?: {
                [key: string]: string;
            };
        };
        /** @enum {string} */
        DepositMethod: "card" | "crypto" | "bank_transfer";
        /**
         * @description Lifecycle of a webhook endpoint. `archived` is soft-delete; the row
         *     stays for audit but no new outbox materialisation references it.
         * @enum {string}
         */
        EndpointStatus: "active" | "disabled" | "archived";
        EndpointWithSecret: {
            endpoint: components["schemas"]["WebhookEndpoint"];
            /**
             * @description Plaintext signing secret. Captured **once** at create/rotate
             *     time — every subsequent read returns the endpoint without it.
             */
            signing_secret: string;
        };
        FreezeBody: {
            /** @description Free-text reason recorded on the card row. Empty → no reason logged. */
            reason?: string;
        };
        FxProbeResult: {
            dst: string;
            provider: string;
            /**
             * @description Provider rate, before spread.
             * @example 0.0125
             */
            rate: string;
            src: string;
        };
        FxProvidersView: {
            /** @description The one currently in force. */
            active: string;
            /**
             * @description Every name valid in `rates.fx_provider`: the compiled-in providers
             *     plus whatever `rates.custom` defines.
             */
            available: string[];
            /** @description The Wallet currency every quote converts into. */
            local_currency: string;
        };
        GroupSpend: {
            /** Format: int64 */
            count: number;
            /** @description connector_slug / funding plan / merchant name, depending on the list. */
            key?: string | null;
            spend: string;
        };
        Health: {
            status: string;
            version: string;
        };
        ImageView: components["schemas"]["BlogImageMeta"] & {
            /** @description Public URL to reference from post bodies. */
            url: string;
        };
        InviteBody: {
            email: string;
            full_name?: string | null;
        };
        IssuingMetrics: {
            /** Format: int64 */
            active_cards: number;
            by_connector: components["schemas"]["GroupSpend"][];
            by_plan: components["schemas"]["GroupSpend"][];
            by_status: components["schemas"]["StatusCount"][];
            currency?: string | null;
            daily: components["schemas"]["DayBucket"][];
            /** Format: int64 */
            declined_count: number;
            /** @description Total non-declined spend (sum of |amount|) in the window. */
            spend: string;
            top_merchants: components["schemas"]["GroupSpend"][];
            /** Format: int64 */
            txn_count: number;
            /** Format: int64 */
            window_days: number;
        };
        /** @description Body for self-service freeze / terminate — `reason` is optional. */
        LifecycleReasonBody: {
            reason?: string | null;
        };
        LoginRequest: {
            email: string;
            /**
             * Format: uuid
             * @description Optional. Disambiguates when the email belongs to more than one org.
             */
            organization_id?: string | null;
            password: string;
        };
        LoginResponse: {
            access_token: string;
            /** Format: date-time */
            expires_at: string;
            /**
             * @description true when this user can use Takeal the operator console.
             *     JWT itself is still valid for the client app / Mini App calls
             *     regardless; only the operator console gates on this field.
             */
            hub_access?: boolean;
            /** @enum {string} */
            stage: "jwt";
            /**
             * @description Public user view. Schema mirrors `takeal_identity::User` minus
             *     the redacted `password_hash` field — utoipa schemas aren't
             *     derived on User upstream, so we keep this opaque.
             */
            user: unknown;
        } | {
            /** Format: date-time */
            challenge_expires_at: string;
            challenge_token: string;
            otpauth_url: string;
            secret_base32: string;
            /** @enum {string} */
            stage: "totp_setup_required";
        } | {
            available_methods?: components["schemas"]["AvailableMethod"][];
            /** Format: date-time */
            challenge_expires_at: string;
            challenge_token: string;
            /** @enum {string} */
            stage: "totp_required";
        };
        MarkFailedBody: {
            /** @description Operator-supplied human-readable cause. */
            reason: string;
        };
        MemberView: {
            /** Format: date-time */
            created_at: string;
            email: string;
            full_name?: string | null;
            /** Format: uuid */
            id: string;
            status: string;
            /** Format: uuid */
            user_id: string;
        };
        Merchant: {
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            legal_name: string;
            settlement_currency: string;
            status: components["schemas"]["MerchantStatus"];
            /** Format: date-time */
            updated_at: string;
        };
        MerchantAcquirerRow: {
            connector_slug: string;
            enabled: boolean;
            /** Format: uuid */
            merchant_id: string;
            /** Format: int32 */
            priority: number;
        };
        /**
         * @description The stored representation of a merchant API key. `secret_hash` is the argon2id PHC
         *     string; the plaintext secret is only ever returned to the client at creation time
         *     via `NewMerchantApiKey` in `auth.rs`.
         */
        MerchantApiKey: {
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            key: string;
            /** Format: date-time */
            last_used_at?: string | null;
            /** Format: uuid */
            merchant_id: string;
            /**
             * Format: uuid
             * @description an earlier release — every key belongs to exactly one shop under its
             *     merchant. Backfill seeded existing keys onto each merchant's
             *     "Default" shop; new keys carry whichever shop the operator /
             *     merchant_user chose at create time.
             */
            shop_id: string;
            status: components["schemas"]["MerchantApiKeyStatus"];
            /** Format: date-time */
            updated_at: string;
        };
        /** @enum {string} */
        MerchantApiKeyStatus: "active" | "revoked";
        /**
         * @description Three-tier role per the API contract. Serialised lowercase for both DB +
         *     JSON. Comparison is case-insensitive at the DB CHECK constraint.
         * @enum {string}
         */
        MerchantRole: "admin" | "member" | "viewer";
        /** @enum {string} */
        MerchantStatus: "active" | "suspended" | "closed";
        /**
         * @description Row shape. `password_hash` is intentionally not serialised — see
         *     `#[serde(skip_serializing)]`. Same precaution as `users.password_hash`
         *     (identity crate).
         */
        MerchantUser: {
            /** Format: date-time */
            created_at: string;
            email: string;
            /** Format: uuid */
            id: string;
            is_active: boolean;
            /** Format: date-time */
            last_login_at?: string | null;
            /** Format: uuid */
            merchant_id: string;
            role: components["schemas"]["MerchantRole"];
            /** Format: date-time */
            updated_at: string;
        };
        /**
         * @example {
         *       "source_currency": "RUB"
         *     }
         */
        MigrateWalletBody: {
            /** @description The non-local currency balance to convert into the local currency. */
            source_currency: string;
        };
        MigrateWalletResult: {
            /** @example 62.50 */
            credited_amount: string;
            local_currency: string;
            provider: string;
            /** @example 0.0125 */
            rate: string;
            /** @example 5000.00 */
            source_amount: string;
            source_currency: string;
            /** Format: int64 */
            spread_bps: number;
            /** Format: uuid */
            user_id: string;
        };
        MintKeyBody: {
            label?: string | null;
        };
        MintKeyResponse: {
            /** Format: uuid */
            id: string;
            key: string;
            label: string;
            /** @description One-shot plaintext secret (X-Organization-Secret). */
            secret: string;
        };
        /** @description Create payload — operator-supplied via the operator console. */
        NewBankAccount: {
            account_number?: string;
            bank_country?: string;
            bank_name?: string;
            /** @description `None` (or absent in JSON) = applicable to any currency. */
            currency?: string | null;
            holder_name: string;
            iban?: string;
            label: string;
            routing_number?: string;
            swift_bic?: string;
        };
        /**
         * @description Returned at API-key creation time. The `secret` field is plaintext and is
         *     **the only opportunity** for the operator to capture it — it is hashed before
         *     being stored. After this struct goes out of scope the secret is unrecoverable.
         */
        NewMerchantApiKey: {
            api_key: components["schemas"]["MerchantApiKey"];
            /** @description Plaintext secret. Captured **once** at creation; unrecoverable thereafter. */
            secret: string;
        };
        /**
         * @description Returned at user-create time. `temporary_password` is plaintext and is
         *     **the only opportunity** for the operator to capture it; mirror of
         *     `NewMerchantApiKey.secret`.
         */
        NewMerchantUser: {
            /**
             * @description Plaintext temp password. Operator delivers this to the human
             *     out-of-band; on first login the merchant portal should prompt for change
             *     (phase-2; not enforced yet).
             */
            temporary_password: string;
            user: components["schemas"]["MerchantUser"];
        };
        NewPost: {
            body_markdown?: string;
            /** Format: uuid */
            cover_image_id?: string | null;
            excerpt?: string;
            locale?: string;
            /** @description Lowercase kebab-case. Generated from the title when omitted. */
            slug?: string | null;
            tags?: string[];
            title: string;
        };
        NewRole: {
            description?: string;
            name: string;
            permissions?: string[];
        };
        /**
         * @description Create-shop payload — both operator (`/admin/.../shops`) and
         *     merchant-self (`/merchants/me/shops`) surfaces accept this.
         */
        NewShop: {
            brand_color?: string | null;
            currency_hint?: string | null;
            name: string;
        };
        NewTierBody: {
            currency: string;
            /** Format: int32 */
            funding_discount_bps?: number;
            /** Format: int32 */
            grace_window_days?: number;
            /** Format: int32 */
            issuance_discount_bps?: number;
            monthly_fee: string;
            name: string;
            /** Format: int32 */
            tryout_window_days?: number;
        };
        NewUserView: {
            /** @description One-shot temporary password to hand the org admin out-of-band. */
            temporary_password: string;
            user: components["schemas"]["OrgUserView"];
        };
        OpenCycleBody: {
            /** Format: uuid */
            merchant_id: string;
            /**
             * Format: date-time
             * @description Optional. Defaults to the previous cycle's `period_end` (or NOW()
             *     when no prior cycle exists for this merchant).
             */
            period_start?: string | null;
        };
        OperatorPaymentRow: {
            /** @example 99.50 */
            amount: string;
            cleared_amount?: string | null;
            connector_slug?: string | null;
            /** Format: date-time */
            created_at: string;
            currency: string;
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            merchant_id: string;
            merchant_name: string;
            method: string;
            status: string;
        };
        OperatorRefundRow: {
            /** @example 10.00 */
            amount: string;
            connector_slug: string;
            /** Format: date-time */
            created_at: string;
            currency: string;
            failure_reason?: string | null;
            /** Format: uuid */
            id: string;
            provider_refund_reference?: string | null;
            reason: string;
            /** Format: uuid */
            requestor_id: string;
            /**
             * @description Resolved label — user email for user requestors, merchant legal_name
             *     for merchant requestors. `None` when the row has been deleted.
             */
            requestor_name?: string | null;
            requestor_type: string;
            status: string;
            /** Format: uuid */
            target_id: string;
            target_type: string;
            /** Format: date-time */
            updated_at: string;
        };
        OpsInfoView: {
            /**
             * Format: date-time
             * @description When the binary started (UTC). the operator console computes uptime client-side.
             */
            started_at: string;
            /** @description the operator console renders a `mailto:` chip when set. */
            support_email?: string | null;
            /** @description the operator console renders a `Support` button linking to this URL when set. */
            support_url?: string | null;
            /**
             * Format: int64
             * @description Seconds since boot. Pre-computed server-side so the operator console doesn't need
             *     to do a date subtraction on every poll.
             */
            uptime_seconds: number;
            /** @description `the platform` package version. */
            version: string;
        };
        /**
         * @description Card as the org sees it. Deliberately omits `connector_slug` +
         *     `provider_reference` (issuer attribution) and `redemption_code` (PCI).
         */
        OrgCardView: {
            card_type: components["schemas"]["CardType"];
            /** Format: date-time */
            created_at: string;
            currency: string;
            /** Format: int32 */
            expiry_month?: number | null;
            /** Format: int32 */
            expiry_year?: number | null;
            failure_reason?: string | null;
            /**
             * Format: uuid
             * @description The end-user holder this card was issued to.
             */
            holder_user_id: string;
            /** Format: uuid */
            id: string;
            initial_amount?: string | null;
            last4?: string | null;
            status: components["schemas"]["CardStatus"];
            /** Format: date-time */
            updated_at: string;
        };
        OrgInfo: {
            billing_currency: string;
            /** Format: uuid */
            id: string;
            legal_name: string;
            prepay_balance: string;
            status: string;
        };
        OrgUserPublic: {
            /** Format: date-time */
            created_at: string;
            email: string;
            /** Format: uuid */
            id: string;
            /** Format: date-time */
            last_login_at?: string | null;
            /** Format: uuid */
            organization_id: string;
            organization_name: string;
            role: components["schemas"]["OrganizationRole"];
            /**
             * @description Stable discriminator for the merchant portal's dual-mode login. Always
             *     `"organization_user"` here (merchant login returns `"merchant_user"`).
             */
            user_type: string;
        };
        OrgUserView: {
            /** Format: date-time */
            created_at: string;
            email: string;
            /** Format: uuid */
            id: string;
            is_active: boolean;
            /** Format: uuid */
            organization_id: string;
            role: components["schemas"]["OrganizationRole"];
        };
        OrgView: {
            billing_currency: string;
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            legal_name: string;
            prepay_balance: string;
            status: components["schemas"]["OrganizationStatus"];
            /** Format: date-time */
            updated_at: string;
        };
        /**
         * @description Per-org, per-card-type issuance sell_price. When no row matches a card_type, org issuance is free for
         *     that type (operator must configure it for a real reseller).
         */
        OrganizationCardPricing: {
            /**
             * @description `credit` | `prepaid` | `gift`. Kept as a String to avoid coupling this
             *     crate to the issuing crate's CardType (layering — both are domain crates).
             */
            card_type: string;
            /** Format: date-time */
            created_at: string;
            currency: string;
            fee_label?: string | null;
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            organization_id: string;
            /** @example 5.00 */
            sell_price: string;
            /** Format: date-time */
            updated_at: string;
        };
        /** @enum {string} */
        OrganizationRole: "admin" | "member" | "viewer";
        /** @enum {string} */
        OrganizationStatus: "active" | "suspended" | "closed";
        OrphanRow: {
            connector_slug: string;
            /** Format: date-time */
            created_at: string;
            currency: string;
            failure_reason?: string | null;
            funding_mode?: string | null;
            /** Format: uuid */
            id: string;
            /** @example 10.00 */
            initial_amount?: string | null;
            last4?: string | null;
            provider_reference?: string | null;
            user_email: string;
            /** Format: uuid */
            user_id: string;
        };
        OtpVerifyBody: {
            /** @description `otp_pending`-scope token returned by `/2fa/switch`. */
            challenge_token: string;
            /** @description 6-digit code the user typed. */
            code: string;
        };
        PatchConfigurationKeyBody: {
            /** @description New plaintext value for the key. */
            value: string;
        };
        PatchConnectorBody: {
            grpc_url?: string | null;
            /** @description `active` | `disabled`. */
            status?: string | null;
        };
        PatchOrgBody: {
            /** @description `active` | `suspended` | `closed`. */
            status: components["schemas"]["OrganizationStatus"];
        };
        PatchRoleBody: {
            /** @description Target role name. Must already exist in the `roles` table. */
            role: string;
        };
        PatchTierBody: {
            currency?: string | null;
            /** Format: int32 */
            funding_discount_bps?: number | null;
            /** Format: int32 */
            grace_window_days?: number | null;
            /** Format: int32 */
            issuance_discount_bps?: number | null;
            monthly_fee?: string | null;
            name?: string | null;
            /** @description `active` | `disabled`. */
            status?: string | null;
            /** Format: int32 */
            tryout_window_days?: number | null;
        };
        PayrollBody: {
            currency: string;
            runs: components["schemas"]["PayrollRun"][];
        };
        PayrollResult: {
            amount: string;
            /** Format: uuid */
            card_id?: string | null;
            email: string;
            error?: string | null;
            /** Format: uuid */
            member_id: string;
            /** @description `active` when the salary card was issued, else `failed`. */
            status: string;
        };
        PayrollRun: {
            amount: string;
            /** Format: uuid */
            member_id: string;
        };
        PermissionEntry: {
            key: string;
        };
        PostList: {
            /** Format: int64 */
            page: number;
            /** Format: int64 */
            per_page: number;
            posts: components["schemas"]["PublicPost"][];
            /** Format: int64 */
            total: number;
        };
        /**
         * @description Partial update. Absent fields are left alone; changing any *content* field
         *     bumps `content_version` and thereby re-arms the broadcast buttons.
         */
        PostUpdate: {
            body_markdown?: string | null;
            /** Format: uuid */
            cover_image_id?: string | null;
            excerpt?: string | null;
            locale?: string | null;
            slug?: string | null;
            /**
             * @description `draft` | `published` | `archived`. Publishing stamps `published_at`
             *     the first time.
             */
            status?: string | null;
            tags?: string[] | null;
            title?: string | null;
        };
        /**
         * @description One row of the per-program catalogue + pricing. `program_code` is the
         *     provider product / program id (== the connector's advertised `id`); the
         *     operator edits cost/sell/fee_label/priority/status. Pass `program_code` back
         *     as `program_id` to POST /admin/cards.
         */
        ProgramView: {
            bin?: string | null;
            /** @description `credit` | `prepaid` | `gift`. */
            card_type: string;
            cost_price?: string | null;
            currency?: string | null;
            fee_label?: string | null;
            label: string;
            /**
             * Format: int32
             * @description Program-cascade order within the issuer (lower wins).
             */
            priority: number;
            program_code: string;
            sell_price?: string | null;
            /** @description `active` | `disabled`. */
            status: string;
        };
        /**
         * @description What a the client app gets. Structured, style-free: the client maps block types
         *     onto its own components, so a post looks native on every surface.
         */
        PublicPost: {
            /**
             * @description The same body as a flat block list — the recommended input for
             *     rendering in the site's own components.
             */
            body_blocks: components["schemas"]["Block"][];
            /** @description Raw Markdown, for clients that bring their own renderer. */
            body_markdown: string;
            /** @description Absolute-path URL of the cover image, when set. */
            cover_url?: string | null;
            /** @description Teaser for cards. Falls back to the first paragraph, trimmed. */
            excerpt: string;
            /** @description BCP-47-ish tag when the operator set one; empty otherwise. */
            locale?: string;
            /** Format: date-time */
            published_at?: string | null;
            /** Format: int32 */
            reading_minutes: number;
            /** @description Stable public key — link by this, never by uuid. */
            slug: string;
            tags: string[];
            title: string;
            /** Format: date-time */
            updated_at: string;
        };
        PutConfigurationBody: {
            /** @description Replace the entire map. Pass `{}` to wipe. */
            variables: {
                [key: string]: string;
            };
        };
        PutPricingBody: {
            /** @description `credit` | `prepaid` | `gift`. */
            card_type: string;
            currency: string;
            fee_label?: string | null;
            sell_price: string;
        };
        /** @description Body for `PUT /admin/connectors/{slug}/programs/{program_code}/pricing`. */
        PutProgramPricingBody: {
            cost_price?: string | null;
            currency?: string | null;
            fee_label?: string | null;
            /** Format: int32 */
            priority?: number | null;
            sell_price?: string | null;
            /** @description `active` | `disabled`. */
            status?: string | null;
        };
        PutSettingBody: {
            value: string;
        };
        /**
         * @description A rate-locked funding quote: pay `source_amount source_currency`,
         *     the Wallet gets `credited_amount credited_currency`. Execute by passing
         *     `id` as `quote_id` to `POST /me/deposits` before `expires_at`.
         */
        QuoteView: {
            /**
             * @description What the Wallet will be credited, net of spread, at the locked rate.
             * @example 57.97
             */
            credited_amount: string;
            credited_currency: string;
            /** Format: date-time */
            expires_at: string;
            /** Format: uuid */
            id: string;
            provider: string;
            /**
             * @description Provider rate before spread (credited units per 1 source unit).
             * @example 0.011832
             */
            rate: string;
            /** @example 5000.00 */
            source_amount: string;
            source_currency: string;
            /** Format: int64 */
            spread_bps: number;
        };
        Readiness: {
            checks: components["schemas"]["ReadinessChecks"];
            /**
             * @description Live in-memory snapshot from `ConnectorRegistry`. Useful for the
             *     dashboard's "X funders / Y issuers / …" header chips.
             */
            counts: components["schemas"]["ConnectorCounts"];
            /**
             * @description License kill-switch state. `mode` is one of `active`,
             *     `grace`, `refusing`, `disabled`; `refusing` carries `reason`. the operator console
             *     renders a banner on anything but `active`. Does NOT affect the HTTP
             *     status of `/ready` — a refusing the platform is healthy, just closed.
             */
            license: Record<string, never>;
            /**
             * @description Operator-facing channels + build info read at boot from env.
             *     Immutable for the process lifetime.
             */
            ops: components["schemas"]["OpsInfoView"];
            /**
             * @description `ready` when every dependency probe passed, `degraded` otherwise.
             *     HTTP status is 200 vs 503 in the same split.
             */
            status: string;
        };
        ReadinessChecks: {
            formance: components["schemas"]["CheckResult"];
            /**
             * @description NATS probe. When the deployment is unconfigured for NATS (env
             *     `NATS_URL` unset, NullPublisher path), this reports
             *     `{ ok: true, error: None, skipped: true }` so the operator console renders a
             *     neutral "skipped" dot rather than a red "down" one.
             */
            nats: components["schemas"]["CheckResult"];
            postgres: components["schemas"]["CheckResult"];
            redis: components["schemas"]["CheckResult"];
        };
        /**
         * @example {
         *       "action": "close"
         *     }
         */
        ReconcileBody: {
            /**
             * @description `close` — terminate the card at the provider (recover float), mark
             *     `terminated`. `adopt` — charge the unpaid load, mark `active`.
             */
            action: string;
        };
        ReloadBody: {
            /** @example 25.00 */
            amount: string;
            /** @description ISO 4217 currency code (e.g. `EUR`). Must match the card's currency. */
            currency: string;
            metadata?: {
                [key: string]: string;
            };
            /**
             * Format: uuid
             * @description Operator-supplied UUID. Acts as the connector idempotency key — replays
             *     with the same id are a no-op at the provider.
             */
            reload_id: string;
        };
        ResetTotpResult: {
            /**
             * @description True when there was a `user_totp` row that was removed; false if the
             *     user wasn't enrolled (the endpoint is idempotent).
             */
            removed: boolean;
            /** Format: uuid */
            user_id: string;
        };
        RevealBody: {
            /** @description Mandatory re-auth: the user's account password. */
            password: string;
            /** @description Required when the user has TOTP enrolled; ignored otherwise. */
            totp_code?: string | null;
        };
        RevealResponse: {
            cvv: string;
            /**
             * Format: int32
             * @description Seconds the client should display before auto-clearing.
             */
            expires_in_seconds: number;
            /** Format: int32 */
            expiry_month: number;
            /** Format: int32 */
            expiry_year: number;
            holder_name: string;
            pan: string;
        };
        RevealedSetting: {
            is_set: boolean;
            key: string;
            kind: string;
            /** Format: date-time */
            updated_at?: string | null;
            /** @description Full plaintext value (or default). */
            value?: string | null;
        };
        RoleRow: {
            /** Format: date-time */
            created_at: string;
            description: string;
            is_system: boolean;
            name: string;
            /**
             * @description Stored as JSONB in Postgres; deserialised here as `Vec<String>`
             *     so we can iterate without re-parsing per call.
             */
            permissions: string[];
            /** Format: date-time */
            updated_at: string;
        };
        RoleUpdate: {
            description?: string | null;
            permissions?: string[] | null;
        };
        RotateConnectorResponse: {
            connector: components["schemas"]["ConnectorView"];
            outbound_auth_secret: string;
            signing_secret: string;
        };
        RowError: {
            email: string;
            error: string;
        };
        SessionView: {
            /** @description The session making this request. */
            current: boolean;
            /** Format: date-time */
            expires_at: string;
            /** Format: date-time */
            issued_at: string;
            /** Format: uuid */
            jti: string;
            /** Format: date-time */
            last_seen_at: string;
            remote_ip?: string | null;
            user_agent?: string | null;
        };
        /**
         * @example {
         *       "email": "alice@example.com"
         *     }
         */
        SetEmailBody: {
            /**
             * @description The real email to attach. Validated (one '@', dotted domain, no
             *     whitespace), lower-cased + trimmed, and must be unique deployment-wide.
             */
            email: string;
        };
        /**
         * @example {
         *       "channels": [
         *         "email",
         *         "telegram"
         *       ]
         *     }
         */
        SetSubscriptionsBody: {
            /**
             * @description The complete desired set — this is a replace, not a merge. An empty
             *     array unsubscribes from everything.
             */
            channels: string[];
        };
        /**
         * @example {
         *       "currency": "EUR"
         *     }
         */
        SetWalletBody: {
            currency: string;
        };
        SetWebhookBody: {
            /**
             * @description HMAC-SHA256 signing secret. Plaintext at rest — the worker signs each
             *     payload with this key.
             */
            signing_secret: string;
            /** @description Endpoint URL the receiver listens on, e.g. `https://acme.example.com/webhooks`. */
            url: string;
        };
        SettingRow: {
            constraint: string;
            /** @description Default from SCHEMA, or empty when there's no default. */
            default?: string | null;
            description: string;
            /** @description `true` if the row is in DB (vs falling back to default). */
            is_set: boolean;
            key: string;
            kind: string;
            /** Format: date-time */
            updated_at?: string | null;
            /** Format: uuid */
            updated_by?: string | null;
            /**
             * @description Current value. For `secret` kind, redacted. For `plain`, full.
             *     `None` when the setting has neither a row nor a default — i.e.
             *     genuinely unset.
             */
            value?: string | null;
        };
        Shop: {
            /**
             * @description CSS colour token the merchant portal surfaces as per-shop accent. None →
             *     inherit deployment-wide theme.
             */
            brand_color?: string | null;
            /** Format: date-time */
            created_at: string;
            /**
             * @description ISO 4217 dashboard hint. Doesn't constrain transaction
             *     currencies — that's per-acquirer / per-payment.
             */
            currency_hint?: string | null;
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            merchant_id: string;
            name: string;
            status: components["schemas"]["ShopStatus"];
            /** Format: date-time */
            updated_at: string;
        };
        /** @enum {string} */
        ShopStatus: "active" | "archived";
        /** @description Partial-update payload. Omitted fields = unchanged. */
        ShopUpdate: {
            /** @description `Some(None)` clears `brand_color`; absent = leave as-is. */
            brand_color?: string | null;
            currency_hint?: string | null;
            name?: string | null;
            status?: null | components["schemas"]["ShopStatus"];
        };
        StatBucket: {
            /** @example 1234.50 */
            amount: string;
            /** Format: int64 */
            count: number;
            currency: string;
            status: string;
        };
        StatusCount: {
            /** Format: int64 */
            count: number;
            status: string;
        };
        SubscriptionTier: {
            /** Format: date-time */
            created_at: string;
            currency: string;
            /** Format: int32 */
            funding_discount_bps: number;
            /** Format: int32 */
            grace_window_days: number;
            /** Format: uuid */
            id: string;
            /** Format: int32 */
            issuance_discount_bps: number;
            monthly_fee: string;
            name: string;
            status: string;
            /** Format: int32 */
            tryout_window_days: number;
            /** Format: date-time */
            updated_at: string;
        };
        /** @description Which channels this user agreed to receive announcements on. */
        SubscriptionsView: {
            /**
             * @description Channels this deployment can actually deliver on right now — a client
             *     should only offer these as toggles.
             */
            available: string[];
            /** @description Channels the user is subscribed to, e.g. `["email"]`. */
            channels: string[];
        };
        SwitchBody: {
            /**
             * @description The challenge from the prior `/auth/login` response. Must be a
             *     `totp_pending`-scope token; mid-flow re-switches re-decode the
             *     **original** token to look up the user, so the new flow's
             *     `otp_pending`-scope token never becomes a switch input.
             */
            challenge_token: string;
            /**
             * @description `"telegram"` | `"email"`. Must be in this user's
             *     `available_methods`.
             */
            method: string;
        };
        /**
         * @description Response of `/auth/login/2fa/switch`. Tagged on `stage` for parity
         *     with the rest of the auth state machine.
         */
        SwitchResponse: {
            /**
             * @description Echo of the available_methods set (so the operator console can re-render the
             *     picker if the user wants to switch again mid-flow).
             */
            available_methods?: components["schemas"]["AvailableMethod"][];
            /** Format: date-time */
            challenge_expires_at: string;
            challenge_token: string;
            /** @description Hint text the operator console renders under the code input. */
            hint: string;
            /** @description `"telegram"` | `"email"` — echo of the chosen method. */
            method: string;
            /** @enum {string} */
            stage: "otp_sent";
        };
        /**
         * @example {
         *       "init_data": "query_id=AAH...&user=%7B%22id%22%3A777000%2C%22first_name%22%3A%22Alice%22%7D&auth_date=1700000000&hash=abcdef…"
         *     }
         */
        TelegramExchangeBody: {
            /**
             * @description Raw `window.Telegram.WebApp.initData` query string handed to the Mini
             *     App by the Telegram client. Validated server-side against the
             *     deployment's bot token — never trust it unsigned.
             */
            init_data: string;
        };
        TerminateBody: {
            /** @description Provider-specific extras. Example: `{ "reason_code": "LOST_OR_STOLEN" }`. */
            metadata?: {
                [key: string]: string;
            };
            reason?: string;
        };
        TerminateResult: {
            /** Format: int64 */
            revoked_sessions: number;
        };
        TopupBody: {
            amount: string;
            /** @description Defaults to the org's billing currency when omitted. */
            currency?: string | null;
        };
        TotpStepBody: {
            challenge_token: string;
            /**
             * @description 6-digit code from the user's authenticator app. Whitespace
             *     allowed at the boundaries; verified after trim.
             */
            code: string;
        };
        TransactionItem: {
            /** @example 12.50 */
            amount: string;
            /** Format: date-time */
            authorised_at?: string | null;
            /**
             * @description What the card was actually charged (billing leg) + its currency — may
             *     differ from the merchant `amount` (e.g. a EUR purchase billed in USD).
             * @example 6.51
             */
            billing_amount?: string | null;
            billing_currency?: string | null;
            /** @description The billing leg in USD (the ledger currency), decimal-as-string. */
            billing_usd_amount?: string | null;
            /** Format: date-time */
            cleared_at?: string | null;
            currency: string;
            decline_reason?: string | null;
            merchant_city?: string | null;
            merchant_country?: string | null;
            merchant_mcc?: string | null;
            merchant_name?: string | null;
            provider_reference: string;
            /** @description Provider's raw status (e.g. OKCard txnStatus "SUCCESS") — panel parity. */
            provider_status?: string | null;
            /**
             * @description Normalised status: `pending` | `cleared` | `reversed` | `declined` |
             *     `unknown` (see `CardTxnRow.status`). Raw provider value in
             *     `provider_status`.
             * @example cleared
             */
            status: string;
        };
        TransactionsPage: {
            /** @description Empty when there are no more pages. */
            next_page_token: string;
            transactions: components["schemas"]["TransactionItem"][];
        };
        UpdateEndpointBody: {
            event_filter?: string[] | null;
            label?: string | null;
            status?: null | components["schemas"]["EndpointStatus"];
            url?: string | null;
        };
        UpdateWebhookBody: {
            event_filter?: string[] | null;
            label?: string | null;
            status?: null | components["schemas"]["EndpointStatus"];
            url?: string | null;
        };
        UploadImageBody: {
            /**
             * @description Alternative text. Worth filling in: it is what screen readers and
             *     broken-image states show.
             */
            alt?: string;
            /** @description `image/png` | `image/jpeg` | `image/webp` | `image/gif` | `image/svg+xml`. */
            content_type: string;
            /**
             * @description Base64 payload. A `data:` URL from the browser's FileReader is
             *     accepted as-is — the prefix is stripped server-side.
             */
            data_base64: string;
            filename?: string;
        };
        UserBalanceResult: {
            /**
             * @description Current ledger balance in `currency` (Formance), decimal-as-string.
             *     Same representation as `/me/balance` (`money.amount.to_string()`).
             * @example 42.50
             */
            amount: string;
            currency: string;
            /** Format: uuid */
            user_id: string;
        };
        UserDetail: {
            /**
             * Format: int64
             * @description count of unused backup codes on the user_totp row.
             *     Zero on legacy rows (the operator can hit "Regenerate" to
             *     populate). Drops by 1 every time the user logs in with a backup
             *     code (which also deletes the user_totp row, so the next check
             *     returns `0` and `totp_enrolled=false`).
             */
            backup_codes_remaining: number;
            /** Format: int64 */
            card_count: number;
            /** Format: date-time */
            created_at: string;
            /** Format: int64 */
            deposit_count: number;
            email: string;
            has_password: boolean;
            /** Format: uuid */
            id: string;
            is_active: boolean;
            role: string;
            /**
             * @description true when the user has a confirmed `user_totp` row.
             *     Mutually exclusive with `totp_pending`.
             */
            totp_enrolled: boolean;
            /**
             * @description true when a `user_totp` row exists but `confirmed_at`
             *     is NULL (the user fetched a QR but hasn't entered a verification
             *     code yet). Operator UX surfaces this as "Setup in progress".
             */
            totp_pending: boolean;
            /** Format: date-time */
            updated_at: string;
        };
        UserRow: {
            /** Format: int64 */
            card_count: number;
            /** Format: date-time */
            created_at: string;
            /** Format: int64 */
            deposit_count: number;
            email: string;
            /**
             * @description True iff `password_hash IS NOT NULL` — quick signal that password
             *     login is one of this user's auth methods. Multi-auth specifics
             *     (Telegram link, OIDC, etc.) live in `identity_links` and surface
             *     in the per-user detail endpoint (an earlier release).
             */
            has_password: boolean;
            /** Format: uuid */
            id: string;
            is_active: boolean;
            role: string;
        };
        /** @description A user's subscription joined with its tier (for display + the worker). */
        UserSubscriptionView: {
            currency: string;
            /** Format: date-time */
            current_period_end?: string | null;
            /** Format: int32 */
            funding_discount_bps: number;
            /** Format: uuid */
            id: string;
            /** Format: int32 */
            issuance_discount_bps: number;
            monthly_fee: string;
            /** Format: date-time */
            started_at: string;
            status: string;
            /** Format: uuid */
            tier_id: string;
            tier_name: string;
            /** Format: uuid */
            user_id: string;
        };
        WalletBalanceRow: {
            /** @example 5000.00 */
            amount: string;
            currency: string;
            /**
             * @description True for the user's Wallet currency (their own, else the deployment's
             *     `wallet.local_currency`); the others are candidates for migration.
             */
            is_local: boolean;
        };
        WalletBalancesView: {
            balances: components["schemas"]["WalletBalanceRow"][];
            /** @description The user's Wallet currency — the migration target. */
            local_currency: string;
            /** Format: uuid */
            user_id: string;
            /**
             * @description True when the user (or an operator) chose it explicitly, false when
             *     it is the deployment default.
             */
            wallet_currency_explicit: boolean;
        };
        WalletView: {
            /** @description Currencies the user may switch to with `PUT /me/wallet`. */
            allowed: string[];
            /** @description The currency this Wallet is held in. */
            currency: string;
            /**
             * @description `true` when the user chose it themselves (or an operator set it);
             *     `false` when it is the deployment default.
             */
            explicit: boolean;
        };
        WebhookConfig: {
            /** Format: uuid */
            merchant_id: string;
            url: string;
        };
        /** @description One row in `merchant_webhook_endpoints`. */
        WebhookEndpoint: {
            /** Format: date-time */
            created_at: string;
            /** @description Empty array = receive all events. See `filter::matches`. */
            event_filter: string[];
            /** Format: uuid */
            id: string;
            label: string;
            /** Format: date-time */
            last_delivered_at?: string | null;
            /** Format: date-time */
            last_error_at?: string | null;
            last_error_message?: string | null;
            /** Format: uuid */
            merchant_id: string;
            /**
             * Format: uuid
             * @description an earlier release — endpoints are per-shop now. Backfill seeded
             *     existing rows onto each merchant's "Default" shop.
             */
            shop_id: string;
            status: components["schemas"]["EndpointStatus"];
            /** Format: date-time */
            updated_at: string;
            url: string;
        };
        WebhookSecretView: {
            endpoint: components["schemas"]["WebhookView"];
            /** @description One-shot HMAC signing secret. Captured at create/rotate. */
            signing_secret: string;
        };
        WebhookView: {
            /** Format: date-time */
            created_at: string;
            event_filter: string[];
            /** Format: uuid */
            id: string;
            label: string;
            status: components["schemas"]["EndpointStatus"];
            url: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
    get_branding: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description White-label brand config */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Branding"];
                };
            };
        };
    };
    health: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Process is alive */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Health"];
                };
            };
        };
    };
    ready: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description All dependencies probed successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Readiness"];
                };
            };
            /** @description At least one dependency failed; `checks` shows which */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Readiness"];
                };
            };
        };
    };
    list_images: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ImageView"][];
                };
            };
        };
    };
    upload_image: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UploadImageBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ImageView"];
                };
            };
            /** @description Bad base64, unsupported type, or over the size limit */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_posts: {
        parameters: {
            query?: {
                page?: number | null;
                per_page?: number | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminPostView"][];
                };
            };
            /** @description Not permitted */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewPost"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminPostView"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Slug already taken */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminPostView"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostUpdate"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminPostView"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Slug already taken */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    broadcast: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BroadcastBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BroadcastResult"];
                };
            };
            /** @description Unknown channel, or the post isn't published */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not permitted */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Already sent for this version */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Channel disabled in this deployment */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_card_transactions_all: {
        parameters: {
            query?: {
                card_id?: string;
                user_id?: string;
                connector_slug?: string;
                limit?: number;
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardTxnRow"][];
                };
            };
            /** @description Missing cards:read */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_cards: {
        parameters: {
            query?: {
                /**
                 * @description Filter by card status (e.g. `active`, `frozen`, `terminated`,
                 *     `redeemed`, `failed`). Empty → no filter.
                 */
                status?: string | null;
                /** @description Filter by owning user. Empty → all users. */
                user_id?: string | null;
                /** @description `credit` | `prepaid` | `gift`. */
                card_type?: string | null;
                /** @description Filter by issuing connector slug (e.g. `the connector`). */
                connector_slug?: string | null;
                /** @description Cap on rows. Default 100, max 500. */
                limit?: number | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of cards */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardRow"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_card: {
        parameters: {
            query?: never;
            header?: {
                /** @description Optional. Same key + body replays the original card. */
                "Idempotency-Key"?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AdminCreateCardBody"];
            };
        };
        responses: {
            /** @description Card created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description Validation / unknown issuer_slug / card_type unimplemented */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient funds for the issuance fee or prepaid load */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing cards.lifecycle permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No issuer connectors configured */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_orphans: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Suspected orphans */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrphanRow"][];
                };
            };
            /** @description Missing cards.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Card UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Card detail + live balance */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardDetail"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    debit_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DebitBody"];
            };
        };
        responses: {
            /** @description Debited card */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description Validation (non-active card / non-positive amount / currency mismatch) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing cards.recharge permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector doesn't support limit edit (non-shared card) */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    freeze_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FreezeBody"];
            };
        };
        responses: {
            /** @description Updated card */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description Validation (e.g. card terminated) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector doesn't support freeze */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    reconcile_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReconcileBody"];
            };
        };
        responses: {
            /** @description Reconciled card */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description Bad action / no provider reference */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Adopt failed — user can't cover the load */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing cards.lifecycle permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    refresh_card_from_connector: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Refreshed card row */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector doesn't expose get_card */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    reload_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReloadBody"];
            };
        };
        responses: {
            /** @description Reloaded card */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector doesn't support reload */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    terminate_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TerminateBody"];
            };
        };
        responses: {
            /** @description Terminated card */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector doesn't support terminate */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_card_transactions: {
        parameters: {
            query?: {
                /** @description Page size hint. Connector may clamp to its own max. Default 50. */
                page_size?: number | null;
                /** @description Opaque continuation token from a previous response. Empty == first page. */
                page_token?: string | null;
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Page of transactions */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TransactionsPage"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector doesn't support listing */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    unfreeze_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Updated card */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description Validation (e.g. card terminated) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector doesn't support unfreeze */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_connectors: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of connectors (redacted) */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConnectorView"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_connector: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateConnectorBody"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateConnectorResponse"];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Slug already exists */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_breakers: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Per-slug breaker metrics */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BreakerView"][];
                };
            };
            /** @description Missing connectors.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    disable_connector: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Disabled */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such connector */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_connector: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Connector slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchConnectorBody"];
            };
        };
        responses: {
            /** @description Updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConnectorView"];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such connector */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    connector_balances: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Issuer connector slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of balances */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BalanceDto"][];
                };
            };
            /** @description Missing connectors.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown connector slug */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_configuration: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Plaintext configuration map */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConfigurationView"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such connector */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Decryption failure */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    put_configuration: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PutConfigurationBody"];
            };
        };
        responses: {
            /** @description Replaced */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConfigurationView"];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such connector */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_configuration_key: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Deleted (or no-op) */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConfigurationView"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such connector */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_configuration_key: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
                /** @description Configuration variable name */
                key: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchConfigurationKeyBody"];
            };
        };
        responses: {
            /** @description Updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConfigurationView"];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such connector */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_programs: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Issuer connector slug, e.g. the connector */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of programs + pricing */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProgramView"][];
                };
            };
            /** @description Missing connectors.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    sync_programs: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Synced catalogue + pricing */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProgramView"][];
                };
            };
            /** @description Missing connectors.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    put_program_pricing: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
                program_code: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PutProgramPricingBody"];
            };
        };
        responses: {
            /** @description Updated program */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProgramView"];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown program — sync first */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    rotate_connector: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Rotated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RotateConnectorResponse"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such connector */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    connector_stats: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Connector slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Aggregate stats */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConnectorStats"];
                };
            };
            /** @description Missing connectors.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown connector slug */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    fx_probe: {
        parameters: {
            query: {
                /** @description Source name to try. Defaults to the active one. */
                provider?: string | null;
                /** @description Currency to convert from, e.g. `RUB`. */
                src: string;
                /** @description Currency to convert into. Defaults to the Wallet's local currency. */
                dst?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FxProbeResult"];
                };
            };
            /** @description Bad currency, or src == dst */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not permitted */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The source is unknown or returned no usable rate */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    fx_providers: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FxProvidersView"];
                };
            };
            /** @description Not permitted */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_merchants: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of merchants */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Merchant"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_merchant: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateMerchantBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Merchant"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_merchant: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Merchant"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such merchant */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_acquirers: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MerchantAcquirerRow"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such merchant */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    assign_acquirer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AssignAcquirerBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MerchantAcquirerRow"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such merchant */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    remove_acquirer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
                /** @description Connector slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Removed */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such merchant or assignment */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_api_key: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NewMerchantApiKey"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such merchant */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_bank_accounts: {
        parameters: {
            query?: {
                /** @description Include archived rows. Default false. */
                include_archived?: boolean | null;
            };
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BankAccount"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Merchant not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_bank_account: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewBankAccount"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BankAccount"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Merchant not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    archive_bank_account: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
                /** @description Bank account UUID */
                bank_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Archived */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Merchant or bank account not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    update_bank_account: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
                /** @description Bank account UUID */
                bank_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BankAccountUpdate"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BankAccount"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Merchant or bank account not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    set_primary_bank_account: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
                /** @description Bank account UUID */
                bank_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BankAccount"];
                };
            };
            /** @description Cannot promote an archived account */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Merchant or bank account not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_customers: {
        parameters: {
            query?: {
                /** @description Max rows. Defaults to 200; clamped server-side to [1, 1000]. */
                limit?: number | null;
            };
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerListItem"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_customer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
                /** @description Customer UUID */
                cid: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Customer"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such customer */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    erase_customer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
                /** @description Customer UUID */
                cid: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Erased */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such customer */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Already erased */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_list_shops: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Shop"][];
                };
            };
        };
    };
    admin_create_shop: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewShop"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Shop"];
                };
            };
        };
    };
    admin_get_shop: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                shop_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Shop"];
                };
            };
        };
    };
    admin_archive_shop: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                shop_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Archived */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_patch_shop: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                shop_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ShopUpdate"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Shop"];
                };
            };
        };
    };
    admin_list_secrets: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                shop_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiKeyRow"][];
                };
            };
        };
    };
    admin_create_secret: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                shop_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NewMerchantApiKey"];
                };
            };
        };
    };
    admin_revoke_secret: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                shop_id: string;
                key_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Revoked */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_merchant_users: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of merchant users */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MerchantUser"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_merchant_user: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateMerchantUserBody"];
            };
        };
        responses: {
            /** @description Created — temporary_password is plaintext, captured once */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NewMerchantUser"];
                };
            };
            /** @description Validation error (bad email, duplicate) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such merchant */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_merchant_user: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Merchant UUID (path-only for routing; ownership re-verified server-side) */
                id: string;
                /** @description Merchant user UUID */
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such merchant user */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    set_webhook: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SetWebhookBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookConfig"];
                };
            };
            /** @description url or signing_secret empty */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such merchant */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_list: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of endpoints */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookEndpoint"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateEndpointBody"];
            };
        };
        responses: {
            /** @description Created; signing_secret revealed once */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EndpointWithSecret"];
                };
            };
            /** @description Validation failed (bad URL, empty label) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_archive: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                ep_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Archived (soft delete) */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Endpoint not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                ep_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateEndpointBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookEndpoint"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Endpoint not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_rotate: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                ep_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description New signing_secret revealed once */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EndpointWithSecret"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Endpoint not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    issuing_metrics: {
        parameters: {
            query?: {
                window_days?: number;
                currency?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["IssuingMetrics"];
                };
            };
            /** @description Missing cards:read */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_organizations: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgView"][];
                };
            };
            /** @description Missing organizations.read */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_organization: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateOrgBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgView"];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_organization: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgView"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_organization: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchOrgBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgView"];
                };
            };
        };
    };
    mint_key: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MintKeyBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MintKeyResponse"];
                };
            };
        };
    };
    get_pricing: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrganizationCardPricing"][];
                };
            };
        };
    };
    put_pricing: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PutPricingBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrganizationCardPricing"];
                };
            };
        };
    };
    delete_pricing: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                card_type: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    topup: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TopupBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgView"];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_users: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgUserView"][];
                };
            };
        };
    };
    create_user: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateUserBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NewUserView"];
                };
            };
        };
    };
    list_payments: {
        parameters: {
            query?: {
                /** @description Cap on rows returned. Default 100, max 500. */
                limit?: number | null;
                /**
                 * @description Optional merchant filter — the operator console's merchant detail page hits this with
                 *     `?merchant_id=<id>` to render the per-merchant recent activity panel.
                 */
                merchant_id?: string | null;
                /**
                 * @description `pending` | `redirect_required` | `succeeded` | `failed` |
                 *     `no_connector_available`.
                 */
                status?: string | null;
                /** @description Payment method slug — `card`, `crypto`, `apm`, … */
                method?: string | null;
                /** @description ISO 4217 / crypto code. */
                currency?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of payments across all merchants */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OperatorPaymentRow"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_permissions: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PermissionEntry"][];
                };
            };
        };
    };
    list_refunds: {
        parameters: {
            query?: {
                /** @description Cap on rows returned. Default 100, max 500. */
                limit?: number | null;
                /** @description `pending` | `succeeded` | `failed`. */
                status?: string | null;
                /** @description `deposit` | `payment`. */
                target_type?: string | null;
                /** @description Filter to one requestor (user or merchant UUID). */
                requestor_id?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OperatorRefundRow"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_roles: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RoleRow"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_role: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewRole"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RoleRow"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Role name conflicts with a system role or existing custom role */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_role: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Role name */
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RoleRow"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such role */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_role: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Role not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description System role cannot be deleted */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_role: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RoleUpdate"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RoleRow"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Role not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Operator-role permissions are locked */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_settings: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of declared settings (redacted) */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SettingRow"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_setting: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Setting key (dotted) */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Full plaintext value */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RevealedSetting"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown setting key */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    put_setting: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                key: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PutSettingBody"];
            };
        };
        responses: {
            /** @description Updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SettingRow"];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown setting key */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_setting: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Reset to default */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown setting key */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_cycles: {
        parameters: {
            query?: {
                /** @description Limit to one merchant. */
                merchant_id?: string | null;
                /** @description Limit to one status (`open` | `freezing` | `posted` | `completed` | `failed`). */
                status?: string | null;
                /** @description Row cap. Default 200, max 1000. */
                limit?: number | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of cycles */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Cycle"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    open_cycle: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OpenCycleBody"];
            };
        };
        responses: {
            /** @description Cycle opened */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Cycle"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Merchant not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Merchant already has an in-flight cycle */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_cycle: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Cycle UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Cycle detail */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Cycle"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such cycle */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    close_cycle: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Cycle posted (payable computed) */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Cycle"];
                };
            };
            /** @description Invalid transition */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such cycle */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    mark_completed: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Cycle completed */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Cycle"];
                };
            };
            /** @description Invalid transition */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such cycle */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    mark_failed: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MarkFailedBody"];
            };
        };
        responses: {
            /** @description Cycle marked failed */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Cycle"];
                };
            };
            /** @description Invalid transition */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such cycle */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_tiers: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SubscriptionTier"][];
                };
            };
        };
    };
    create_tier: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewTierBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SubscriptionTier"];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_tier: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Still assigned */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_tier: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchTierBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SubscriptionTier"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_list_users: {
        parameters: {
            query?: {
                /** @description Email-substring filter (case-insensitive). Empty → no filter. */
                q?: string | null;
                /** @description Cap on rows. Default 100, max 500. */
                limit?: number | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of users */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserRow"][];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_user: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDetail"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such user */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_user_balance: {
        parameters: {
            query?: {
                /** @description ISO 4217 currency (default USD) */
                currency?: string;
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserBalanceResult"];
                };
            };
            /** @description Invalid currency */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing users:read */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    adjust_balance: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AdjustBalanceBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdjustBalanceResult"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_user_balances: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WalletBalancesView"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_user_role: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchRoleBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDetail"];
                };
            };
            /** @description Unknown role */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_terminate_sessions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TerminateResult"];
                };
            };
            /** @description Missing users.write */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_user_subscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserSubscriptionView"];
                };
            };
            /** @description No subscription */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    assign_user_subscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AssignBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserSubscriptionView"];
                };
            };
        };
    };
    cancel_user_subscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Cancelled */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    reset_totp: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResetTotpResult"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    regenerate_backup_codes: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BackupCodesResult"];
                };
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User has no TOTP enrolment */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_set_wallet: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SetWalletBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminWalletView"];
                };
            };
            /** @description Missing users.write */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    migrate_wallet_balance: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MigrateWalletBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MigrateWalletResult"];
                };
            };
            /** @description Nothing to migrate / source is already local / bad currency */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an operator */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Rate provider unavailable — migration refused, never guessed */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Credentials"];
            };
        };
        responses: {
            /** @description One of jwt | totp_setup_required | totp_required */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LoginResponse"];
                };
            };
            /** @description Invalid credentials */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User is disabled */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    login_2fa_switch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SwitchBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SwitchResponse"];
                };
            };
            /** @description Method not available for this user */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invalid or expired challenge token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    login_otp_verify: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OtpVerifyBody"];
            };
        };
        responses: {
            /** @description Authenticated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Invalid code / expired challenge */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    login_totp: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TotpStepBody"];
            };
        };
        responses: {
            /** @description Authenticated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Invalid code / expired challenge */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    login_totp_setup: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TotpStepBody"];
            };
        };
        responses: {
            /** @description Enrolled + authenticated + 10 one-shot backup codes */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Invalid code / expired challenge */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    me: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Current user */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Token missing / expired / invalidated */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    change_password: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChangePasswordBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChangePasswordResult"];
                };
            };
            /** @description New password rejected by policy */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Current password wrong */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    register: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Credentials"];
            };
        };
        responses: {
            /** @description User created; auto-logged-in. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation failed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Email already registered */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    telegram_exchange: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TelegramExchangeBody"];
            };
        };
        responses: {
            /** @description Session issued */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description initData signature invalid / stale */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Account disabled */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Telegram login not configured (no bot token) */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_image: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Image id */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Image bytes */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "image/*": unknown;
                };
            };
            /** @description Not modified */
            304: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such image */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    blog_list_posts: {
        parameters: {
            query?: {
                /** @description 1-based page number. Default 1. */
                page?: number | null;
                /** @description Posts per page, 1..=50. Default 10. */
                per_page?: number | null;
                /** @description Only posts carrying this tag. */
                tag?: string | null;
                /** @description Only posts in this locale. */
                locale?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Page of published posts */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostList"];
                };
            };
        };
    };
    blog_get_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Post slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The post */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicPost"];
                };
            };
            /** @description No published post with that slug */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_balance: {
        parameters: {
            query?: {
                /** @description Currency code (e.g. `USD`). Omit for the caller's Wallet currency. */
                currency?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BalanceResponse"];
                };
            };
        };
    };
    me_list_cards: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of cards */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    me_create_card: {
        parameters: {
            query?: never;
            header: {
                /** @description Required. Same key + body replays; same key + different body returns 409. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCardBody"];
            };
        };
        responses: {
            /** @description Card created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing Idempotency-Key, validation, unknown issuer_slug, or card_type unimplemented */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient funds (PREPAID load) */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Idempotency-Key reused with a different body */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No the connectors configured for this deployment */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    me_get_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Card found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Card belongs to another user */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_card_balance: {
        parameters: {
            query?: {
                /** @description Currency code (e.g. `USD`). Omit for the caller's Wallet currency. */
                currency?: string | null;
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BalanceResponse"];
                };
            };
        };
    };
    me_freeze_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LifecycleReasonBody"];
            };
        };
        responses: {
            /** @description Updated card */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector doesn't support freeze */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    reveal_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RevealBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RevealResponse"];
                };
            };
            /** @description Re-auth failed (password / TOTP) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not the caller's card */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Too many reveals */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector has no sensitive-data endpoint */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Provider error */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    me_terminate_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LifecycleReasonBody"];
            };
        };
        responses: {
            /** @description Terminated card */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector doesn't support terminate */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    me_unfreeze_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Updated card */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector doesn't support unfreeze */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Connector unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_deposits: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of deposits */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_deposit: {
        parameters: {
            query?: never;
            header: {
                /** @description Required. Same key + body replays; same key + different body returns 409. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateDepositBody"];
            };
        };
        responses: {
            /** @description Deposit created (status may be pending/redirect_required/confirmed/failed) */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing Idempotency-Key, validation, or unknown funder_slug */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing or invalid token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Idempotency-Key reused with a different body */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No the connectors configured for this deployment */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_deposit_quote: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateQuoteBody"];
            };
        };
        responses: {
            /** @description Quote created; execute via POST /me/deposits with quote_id */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuoteView"];
                };
            };
            /** @description Bad amount/currency, or the currency already IS the local currency */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing or invalid token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Rate provider unavailable/unconfigured — cross-currency funding is refused, never guessed */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    get_deposit: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Deposit UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Deposit found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Deposit belongs to another user */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such deposit */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    refund_deposit: {
        parameters: {
            query?: never;
            header: {
                /** @description Required. */
                "Idempotency-Key": string;
            };
            path: {
                /** @description Original deposit UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateRefundBody"];
            };
        };
        responses: {
            /** @description Refund created (pending|succeeded|failed) */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing Idempotency-Key, deposit not CONFIRMED, amount > original, or unknown connector */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing or invalid token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such deposit */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Idempotency-Key reused with a different body */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    set_email: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SetEmailBody"];
            };
        };
        responses: {
            /** @description Email attached; returns the updated user */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Invalid email */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Email already in use */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_sessions: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SessionView"][];
                };
            };
        };
    };
    terminate_other_sessions: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TerminateResult"];
                };
            };
        };
    };
    revoke_session: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                jti: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such live session */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_subscriptions: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Subscribed + available channels */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SubscriptionsView"];
                };
            };
            /** @description Missing or invalid token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    put_subscriptions: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SetSubscriptionsBody"];
            };
        };
        responses: {
            /** @description The stored set */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SubscriptionsView"];
                };
            };
            /** @description Unsupported channel */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing or invalid token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_my_wallet: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WalletView"];
                };
            };
        };
    };
    set_my_wallet: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SetWalletBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WalletView"];
                };
            };
            /** @description Currency not allowed here */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Wallet holds a balance — ask an operator to migrate it */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_keys: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiKeyView"][];
                };
            };
        };
    };
    create_key: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateKeyBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiKeySecretView"];
                };
            };
        };
    };
    delete_key: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Revoked */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    org_login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginRequest"];
            };
        };
        responses: {
            /** @description Authenticated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LoginResponse"];
                };
            };
            /** @description Invalid credentials */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Ambiguous — email belongs to multiple orgs */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    org_me: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Current org user */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgUserPublic"];
                };
            };
            /** @description Unauthenticated */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    org_balance: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BalanceView"];
                };
            };
        };
    };
    org_list_cards: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgCardView"][];
                };
            };
        };
    };
    org_create_card: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCardBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgCardView"];
                };
            };
            /** @description Org prepay balance insufficient */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No issuer connector configured */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    org_get_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgCardView"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    card_balance: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BalanceView"];
                };
            };
        };
    };
    org_freeze_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FreezeBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgCardView"];
                };
            };
        };
    };
    org_reload_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReloadBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgCardView"];
                };
            };
            /** @description Org prepay insufficient */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    org_terminate_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FreezeBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgCardView"];
                };
            };
        };
    };
    org_unfreeze_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgCardView"];
                };
            };
        };
    };
    org_org_me: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgInfo"];
                };
            };
            /** @description Unauthenticated */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_members: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MemberView"][];
                };
            };
        };
    };
    invite_member: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InviteBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MemberView"];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    bulk_invite_members: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BulkInviteBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BulkInviteResult"];
                };
            };
        };
    };
    remove_member: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Removed */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    run_payroll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PayrollBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PayrollResult"][];
                };
            };
            /** @description Validation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_webhooks: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookView"][];
                };
            };
        };
    };
    create_webhook: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateWebhookBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookSecretView"];
                };
            };
        };
    };
    delete_webhook: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Archived */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    update_webhook: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateWebhookBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookView"];
                };
            };
        };
    };
    rotate_webhook: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookSecretView"];
                };
            };
        };
    };
}
