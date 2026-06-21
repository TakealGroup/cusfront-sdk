/**
 * AUTO-GENERATED — do not edit by hand. Run `pnpm refresh-types`.
 *
 * Source: openapi-snapshot.json (pulled from the Takeal API's /api/docs/openapi.json).
 * Generator: openapi-typescript.
 */
/* eslint-disable */
/* prettier-ignore */
export type paths = {
    "/admin/cards": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List cards across all users. Operator-only. */
        get: operations["list_cards"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/cards/{id}": {
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
    "/admin/cards/{id}/freeze": {
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
    "/admin/cards/{id}/refresh-from-connector": {
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
    "/admin/cards/{id}/reload": {
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
         *     linked funding account, not via direct reload); spool-brighty included.
         *     400 on non-prepaid card / non-active status / non-positive amount.
         */
        post: operations["reload_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/cards/{id}/terminate": {
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
    "/admin/cards/{id}/transactions": {
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
    "/admin/cards/{id}/unfreeze": {
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
    "/admin/connectors": {
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
    "/admin/connectors/{slug}": {
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
    "/admin/connectors/{slug}/configuration": {
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
    "/admin/connectors/{slug}/configuration/{key}": {
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
    "/admin/connectors/{slug}/pricing": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Replace or wipe the per-card issuance pricing on a connector. */
        put: operations["put_pricing"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/connectors/{slug}/rotate": {
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
         * @description **No grace window in MVP** — coordinate the rotation with the connector
         *     operator (update both sides). TODO(phase-2): dual-secret window.
         */
        post: operations["rotate_connector"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/merchants": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all merchants. Operator-only. Used by Hub's merchants page. */
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
    "/admin/merchants/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Fetch one merchant. Operator-only. Hub's `/merchants/{id}` detail page
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
    "/admin/merchants/{id}/acquirers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the merchant's cascade priorities, ASC by priority (lower first).
         *     Backs Hub's drag-to-reorder UI — paired with `assign_acquirer` for save.
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
    "/admin/merchants/{id}/acquirers/{slug}": {
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
         *     Reassigning via `POST .../acquirers` re-inserts cleanly thanks to the
         *     ON CONFLICT upsert.
         */
        delete: operations["remove_acquirer"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/merchants/{id}/api-keys": {
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
    "/admin/merchants/{id}/bank-accounts": {
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
         *     non-primary; promote via `POST .../{bank_id}/primary` once verified.
         */
        post: operations["create_bank_account"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/merchants/{id}/bank-accounts/{bank_id}": {
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
    "/admin/merchants/{id}/bank-accounts/{bank_id}/primary": {
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
    "/admin/merchants/{id}/customers": {
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
    "/admin/merchants/{id}/customers/{cid}": {
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
    "/admin/merchants/{id}/customers/{cid}/erase": {
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
    "/admin/merchants/{id}/users": {
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
         *     and is unrecoverable thereafter — Hub renders a copy-to-clipboard
         *     banner exactly like the API-key reveal flow. The operator hands the
         *     temp password to the human out-of-band (Slack, in person, etc.). On
         *     first login Merphy will prompt for a change (phase-2; not enforced
         *     server-side yet).
         */
        post: operations["create_merchant_user"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/merchants/{id}/users/{user_id}": {
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
    "/admin/merchants/{id}/webhook": {
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
    "/admin/merchants/{id}/webhook-endpoints": {
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
    "/admin/merchants/{id}/webhook-endpoints/{ep_id}": {
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
    "/admin/merchants/{id}/webhook-endpoints/{ep_id}/rotate": {
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
    "/admin/payments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the most recent payments across all merchants. Operator-only. Used by
         *     Hub's payments page. Joined with merchants for the legal_name.
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
    "/admin/permissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the permission catalogue — the finite set of keys the Hub role
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
    "/admin/refunds": {
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
    "/admin/roles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List every role, system roles first. Permissions arrays included so
         *     the Hub editor can render the matrix without a second fetch.
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
    "/admin/roles/{name}": {
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
    "/admin/settings": {
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
    "/admin/settings/{key}": {
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
    "/admin/settlements": {
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
    "/admin/settlements/{id}": {
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
    "/admin/settlements/{id}/close": {
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
         *     `posted`. Audited. (Settler dispatch lands in the follow-up; today
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
    "/admin/settlements/{id}/mark-completed": {
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
    "/admin/settlements/{id}/mark-failed": {
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
    "/admin/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List end-users for the operator. Operator-only. */
        get: operations["list_users"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/users/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** User detail. Used by Hub's `/users/[id]` page. */
        get: operations["get_user"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/users/{id}/balance-adjust": {
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
    "/admin/users/{id}/role": {
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
    "/admin/users/{id}/totp": {
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
    "/admin/users/{id}/totp/backup-codes/regenerate": {
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
    "/auth/login": {
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
         *        secret_base32, otpauth_url}` — first admin login: enroll a TOTP.
         *     * `{"stage":"totp_required", challenge_token, challenge_expires_at}` —
         *        returning admin login: type the code.
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
    "/auth/login/2fa/switch": {
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
    "/auth/login/otp/verify": {
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
    "/auth/login/totp": {
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
    "/auth/login/totp-setup": {
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
    "/auth/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Current authenticated user. The "do I still have a session"
         *     probe Cusfront calls on app boot — login returns the user inline,
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
    "/auth/register": {
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
    "/me/balance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** User's master balance for a given currency. */
        get: operations["get_balance"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/me/cards": {
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
        post: operations["create_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/me/cards/{id}": {
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
    "/me/cards/{id}/balance": {
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
    "/me/deposits": {
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
         * Initiate a deposit. The Takeal API calls the configured funder connector; on
         *     immediate `confirmed` the user's master balance is credited synchronously.
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
    "/me/deposits/{id}": {
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
    "/me/deposits/{id}/refunds": {
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
        AssignAcquirerBody: {
            /**
             * @description Slug matching a `ConnectorBinding` registered at the Takeal API startup
             *     (today: `mock-gator`).
             */
            connector_slug: string;
            /**
             * Format: int32
             * @description Lower = higher priority. Cascade engine tries ASC.
             */
            priority?: number;
        };
        /**
         * @description One entry per second-factor method available to the
         *     user in this deployment. Only sent when [`AvailableMethodKind::Totp`]
         *     is in the set AND at least one other method (else Hub hides the
         *     "Try another way" link entirely).
         */
        AvailableMethod: {
            /**
             * @description Hint text under the input (e.g. `"Sent to f••••@example.com"`).
             *     `None` for `totp` (no hint needed — user knows where it is).
             */
            hint?: string | null;
            /**
             * @description True when this is the server-suggested default — Hub renders the
             *     input for THIS method on first paint. Priority TOTP > Telegram >
             *     email.
             */
            is_default?: boolean;
            /** @description `"totp"` | `"telegram_otp"` | `"email_otp"`. Frozen wire shape. */
            kind: string;
            /** @description Short label Hub renders in the picker modal. */
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
        BalanceResponse: {
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
        /**
         * @description Persisted card record as it lives in `cards`. The `id` is server-side (assigned at
         *     insert) and is what `IssuingConnector::create_card` carries as the connector-side
         *     idempotency key; `provider_reference` is the connector's id, populated after the
         *     connector responds. API-side replay-safety is via `(user_id, idempotency_key)`
         *     UNIQUE + `request_fingerprint` comparison.
         *
         *     `redemption_code` is serialised to the caller exactly once — at creation. Subsequent
         *     list/get responses scrub it (the user has already seen it). This is enforced in the
         *     service layer (`scrub_redemption_code`); the database keeps the code so we can
         *     resend it if genuinely needed for support, behind an explicit operator action.
         */
        Card: {
            card_type: components["schemas"]["CardType"];
            /**
             * @description Slug of the issuer that minted this card (e.g. `spool-mock`).
             *     Persisted at insert so audit + reconciliation can match cards to providers
             *     even after the issuer config changes.
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
            /** Format: uuid */
            id: string;
            initial_amount?: string | null;
            last4?: string | null;
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
        CardRow: {
            card_type: string;
            connector_slug: string;
            /** Format: date-time */
            created_at: string;
            currency: string;
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
        /** @enum {string} */
        CardType: "credit" | "prepaid" | "gift";
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
        /**
         * @description Redacted connector view — what the operator sees on every read. Secrets
         *     are shown only as `sk_<prefix>…<suffix>` previews so an operator can
         *     recognise the row they just created but can't recover the value.
         */
        ConnectorView: {
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
            pricing?: null | components["schemas"]["PricingView"];
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
             * @description Optional. Slug of a configured issuer (e.g. `spool-mock`,
             *     `spool-marqeta`). When omitted, the first configured issuer mints the card.
             *     Unknown slug → 400 `validation`. Empty issuer list → 503.
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
             * @description Where the Takeal API dials the connector. `http://` for loopback dev,
             *     `https://` for prod.
             */
            grpc_url: string;
            /** @description `funder` | `issuer` | `acquirer`. */
            role: string;
            /**
             * @description Stable lowercase identifier. Convention: `<role>-<provider>`,
             *     e.g. `gator-blik_op`.
             */
            slug: string;
        };
        CreateConnectorResponse: {
            connector: components["schemas"]["ConnectorView"];
            /**
             * @description **One-shot, plaintext.** The Takeal API presents this as `x-takeal-auth`
             *     gRPC metadata on every outbound RPC.
             */
            outbound_auth_secret: string;
            /**
             * @description **One-shot, plaintext.** The connector HMAC-signs inbound webhooks with this
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
             * @description Optional. Slug of a configured funder (e.g. `indigo-mock`,
             *     `indigo-fireblocks`). When omitted, the first configured funder handles
             *     the deposit. Unknown slug → 400 `validation`. Empty funder list → 503.
             */
            funder_slug?: string | null;
            metadata?: {
                [key: string]: string;
            };
            /** @description One of `card`, `crypto`, `bank_transfer`. */
            method: components["schemas"]["DepositMethod"];
        };
        CreateEndpointBody: {
            /** @description Empty / omitted → receives every event. */
            event_filter?: string[];
            label: string;
            url: string;
        };
        CreateMerchantBody: {
            legal_name: string;
            settlement_currency: string;
        };
        CreateMerchantUserBody: {
            email: string;
            role: components["schemas"]["MerchantRole"];
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
        /**
         * @example {
         *       "email": "alice@example.com",
         *       "password": "hunter22supersecret"
         *     }
         */
        Credentials: {
            email: string;
            password: string;
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
             * @description Signed Hub URL for artifact download (wire_prefill etc.). NULL for
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
            /** @description Specific outband-<provider> slug, if dispatched. NULL in MVP. */
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
            /** @description Settlement method (settler family) snapshotted at open. */
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
        Health: {
            status: string;
            version: string;
        };
        LoginResponse: {
            access_token: string;
            /** Format: date-time */
            expires_at: string;
            /**
             * @description True when this user can use the operator console.
             *     JWT itself is still valid for Cusfront / Mini App calls
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
            status: components["schemas"]["MerchantApiKeyStatus"];
            /** Format: date-time */
            updated_at: string;
        };
        /** @enum {string} */
        MerchantApiKeyStatus: "active" | "revoked";
        /**
         * @description Three-tier role. Serialised lowercase for both DB +
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
        /** @description Create payload — operator-supplied via Hub. */
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
             *     out-of-band; on first login Merphy should prompt for change
             *     (phase-2; not enforced yet).
             */
            temporary_password: string;
            user: components["schemas"]["MerchantUser"];
        };
        NewRole: {
            description?: string;
            name: string;
            permissions?: string[];
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
             * @description When the binary started (UTC). Hub computes uptime client-side.
             */
            started_at: string;
            /** @description Hub renders a `mailto:` chip when set. */
            support_email?: string | null;
            /** @description Hub renders a `Support` button linking to this URL when set. */
            support_url?: string | null;
            /**
             * Format: int64
             * @description Seconds since boot. Pre-computed server-side so Hub doesn't need
             *     to do a date subtraction on every poll.
             */
            uptime_seconds: number;
            /** @description Takeal API package version. */
            version: string;
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
        PatchRoleBody: {
            /** @description Target role name. Must already exist in the `roles` table. */
            role: string;
        };
        PermissionEntry: {
            key: string;
        };
        /** @description Subset of `connector_credentials` columns covering issuance pricing. */
        PricingView: {
            /**
             * @description What Takeal pays the provider per card. Info-only, never debited.
             *     `null` when only sell-price is configured (operator hasn't recorded
             *     the cost yet).
             */
            cost_price?: string | null;
            /** @description ISO 4217. */
            currency: string;
            /** @description Free-form audit/ledger label, e.g. "OKCard MasterCard issuance". */
            fee_label?: string | null;
            /** @description What Takeal charges the end-user. Debited atomically at create_card. */
            sell_price: string;
        };
        PutConfigurationBody: {
            /** @description Replace the entire map. Pass `{}` to wipe. */
            variables: {
                [key: string]: string;
            };
        };
        /**
         * @description Body for `PUT /admin/connectors/{slug}/pricing` — replace-or-wipe the
         *     whole pricing block. Send `null` to wipe (all four columns NULL → card
         *     creation becomes free again). The four-field shape mirrors PricingView.
         *
         *     We use PUT not PATCH because the DB CHECK couples `sell_price` and
         *     `currency` — there's no meaningful "partial update": you either have a
         *     coherent pricing block or none. Hub renders one Save button for the
         *     whole block.
         */
        PutPricingBody: {
            pricing?: null | components["schemas"]["PricingView"];
        };
        PutSettingBody: {
            value: string;
        };
        Readiness: {
            checks: components["schemas"]["ReadinessChecks"];
            /**
             * @description Live in-memory snapshot from `ConnectorRegistry`. Useful for the
             *     dashboard's "X funders / Y issuers / …" header chips.
             */
            counts: components["schemas"]["ConnectorCounts"];
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
             *     `NATS_URL` unset, null-publisher path), this reports
             *     `{ ok: true, error: None, skipped: true }` so the operator console renders a
             *     neutral "skipped" dot rather than a red "down" one.
             */
            nats: components["schemas"]["CheckResult"];
            postgres: components["schemas"]["CheckResult"];
            redis: components["schemas"]["CheckResult"];
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
             * @description Echo of the available_methods set (so Hub can re-render the
             *     picker if the user wants to switch again mid-flow).
             */
            available_methods?: components["schemas"]["AvailableMethod"][];
            /** Format: date-time */
            challenge_expires_at: string;
            challenge_token: string;
            /** @description Hint text Hub renders under the code input. */
            hint: string;
            /** @description `"telegram"` | `"email"` — echo of the chosen method. */
            method: string;
            /** @enum {string} */
            stage: "otp_sent";
        };
        TerminateBody: {
            /** @description Provider-specific extras. Example: `{ "reason_code": "LOST_OR_STOLEN" }`. */
            metadata?: {
                [key: string]: string;
            };
            reason?: string;
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
            /** Format: date-time */
            cleared_at?: string | null;
            currency: string;
            decline_reason?: string | null;
            merchant_city?: string | null;
            merchant_country?: string | null;
            merchant_mcc?: string | null;
            merchant_name?: string | null;
            provider_reference: string;
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
        UserDetail: {
            /**
             * Format: int64
             * @description Count of unused backup codes on the user_totp row.
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
             * @description True when the user has a confirmed `user_totp` row.
             *     Mutually exclusive with `totp_pending`.
             */
            totp_enrolled: boolean;
            /**
             * @description True when a `user_totp` row exists but `confirmed_at`
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
             *     in the per-user detail endpoint (session 16).
             */
            has_password: boolean;
            /** Format: uuid */
            id: string;
            is_active: boolean;
            role: string;
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
            status: components["schemas"]["EndpointStatus"];
            /** Format: date-time */
            updated_at: string;
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
                /** @description Filter by issuing connector slug (e.g. `spool-brighty`). */
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
            /** @description Card detail */
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
    put_pricing: {
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
                "application/json": components["schemas"]["PutPricingBody"];
            };
        };
        responses: {
            /** @description Pricing replaced (or wiped on null) */
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
            /** @description Pricing only valid on issuer-role connectors */
            409: {
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
    list_payments: {
        parameters: {
            query?: {
                /** @description Cap on rows returned. Default 100, max 500. */
                limit?: number | null;
                /**
                 * @description Optional merchant filter — Hub's merchant detail page hits this with
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
    list_users: {
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
    get_balance: {
        parameters: {
            query: {
                /** @description Currency code (e.g. `USD`). */
                currency: string;
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
    create_card: {
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
            /** @description No issuer connectors configured for this deployment */
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
            query: {
                /** @description Currency code (e.g. `USD`). */
                currency: string;
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
            /** @description No funder connectors configured for this deployment */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
}
