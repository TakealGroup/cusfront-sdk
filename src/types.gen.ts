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
        /**
         * Get the public brand configuration
         * @description No authentication needed; clients call this before login to render the
         *     platform name, logo, favicon, wallet label and brand colours.
         */
        get: operations["get_branding"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/card-designs/default.svg": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["default_design_svg"];
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
        /**
         * Check that the process is alive
         * @description Returns 200 whenever the process can answer. Dependencies are not
         *     checked here; use `GET /ready` for that. The body carries the build
         *     version.
         */
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
         * Check that every dependency is reachable
         * @description Round-trips each critical dependency and returns 200 when all of them
         *     answer, 503 when any of them fails. The body is the same in both cases:
         *     per-dependency results, connector counts, support info and license state.
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
    "/v1/admin/assets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Upload a brand image
         * @description Stores a logo or favicon in the deployment's file storage and returns
         *     its public URL, for the Branding settings. Needs file storage on the
         *     deployment.
         */
        post: operations["upload_asset"];
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
        /**
         * List uploaded blog images
         * @description Returns up to 100 uploaded images with their public URLs.
         */
        get: operations["list_images"];
        put?: never;
        /**
         * Upload a blog image
         * @description Stores the image and returns the public URL to use in a post body.
         */
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
        /**
         * List all blog posts
         * @description Returns posts in every status, most recently changed first, each with its
         *     broadcast state.
         */
        get: operations["list_posts"];
        put?: never;
        /**
         * Create a blog post
         * @description Creates a draft. When `slug` is omitted it is derived from the title; a
         *     title with no latin characters gets a generated slug instead of an error.
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
        /**
         * Get a blog post
         * @description Returns one post with its broadcast history and per-channel send state.
         */
        get: operations["get_post"];
        put?: never;
        post?: never;
        /**
         * Delete a blog post
         * @description Permanently removes the post. Audited.
         */
        delete: operations["delete_post"];
        options?: never;
        head?: never;
        /**
         * Update a blog post
         * @description Changes any of the post's fields. Editing content bumps `content_version`,
         *     which makes a broadcast available again; changing only the status does not.
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
         * Broadcast a blog post
         * @description Sends a published post to every subscriber on the given channel. Each
         *     combination of post, channel and content version is sent at most once, so
         *     a repeat call returns 409. Editing the post afterwards allows a re-send.
         */
        post: operations["broadcast"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/card-designs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List card designs
         * @description Every design, active and disabled, newest first.
         */
        get: operations["list_designs"];
        put?: never;
        /**
         * Add a card design
         * @description Either upload a PNG or WebP image (up to 512 KiB) or give the URL of an
         *     image you host. Uploads need file storage on the deployment; without it
         *     the call answers 503 and URL designs still work.
         */
        post: operations["create_design"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/card-designs/{id}": {
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
         * Disable a card design
         * @description The image is kept: cards already using the design keep showing it, and
         *     the design can be enabled again. Refused while an active program uses it
         *     as its default design.
         */
        delete: operations["delete_design"];
        options?: never;
        head?: never;
        /** Rename or enable / disable a card design */
        patch: operations["patch_design"];
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
         * List card transactions across all cards
         * @description Returns stored card transactions newest first, with optional filters by
         *     card, user or connector. Page with `limit` and `offset`.
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
        /**
         * List cards
         * @description Returns cards across all users, newest first, with optional filters by
         *     status, user, type or connector. Operator-only.
         */
        get: operations["list_cards"];
        put?: never;
        /**
         * Issue a card to a user
         * @description Creates a card for the given user through the chosen connector and loads
         *     it from the user's wallet. Send an `Idempotency-Key` header to make retries
         *     safe; without one, every call issues a new card. Operator-only.
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
         * List orphaned cards
         * @description Returns cards marked `failed` that the provider nonetheless created.
         *     These may be live and spendable even though the user was never charged.
         *     Use the reconcile endpoint to close or adopt each one.
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
        /**
         * Get a card
         * @description Returns one card with a live balance from its connector. If the connector
         *     does not answer, the card is still returned with `live_balance` null.
         *     Operator-only.
         */
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
         * Lower a shared card's spending limit
         * @description Reduces the card's limit by `amount`, the reverse of a reload. Only works
         *     on shared-funding cards, where the provider decides; other cards return
         *     501. No wallet balance changes, since shared cards spend from the
         *     provider's pooled funds. Audited.
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
         * Freeze a card
         * @description Blocks spending on the card until it is unfrozen. Freezing a card that is
         *     already frozen returns it unchanged. Audited.
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
         * Reconcile an orphaned card
         * @description Resolves a card that failed on our side but exists at the provider. `close`
         *     terminates it at the provider; `adopt` charges the user for the load that
         *     was never taken and activates the card. Audited.
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
         * Refresh a card from its connector
         * @description Re-reads the last four digits, expiry and status from the provider and
         *     stores them on the card. Use it when issuance left those fields blank.
         *     Safe to repeat. The full card number is never returned. Audited.
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
         * Reload a prepaid card
         * @description Adds funds to an active prepaid card. Many providers do not support direct
         *     reloads and return 501. The amount must be positive and in the card's
         *     currency. Audited.
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
         * Terminate a card
         * @description Permanently closes the card. This cannot be undone. Terminating a card that
         *     is already terminated returns it unchanged. A closed card that never had a
         *     transaction is removed altogether: the response still carries it, a later
         *     read answers 404. Audited.
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
         * List a card's transactions
         * @description Fetches recent transactions live from the card's connector, one page at a
         *     time. Pass the returned `next_page_token` to get the next page.
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
         * Unfreeze a card
         * @description Allows spending on a frozen card again. Unfreezing a card that is already
         *     active returns it unchanged. Audited.
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
        /**
         * List connectors
         * @description Returns every connector, active and disabled, newest first. Secrets are
         *     redacted. Operator-only.
         */
        get: operations["list_connectors"];
        put?: never;
        /**
         * Create a connector
         * @description Registers a new connector and generates both of its secrets. The plaintext
         *     secrets are returned only in this response; copy them now. The connector is
         *     usable as soon as the response returns.
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
        /**
         * List connector health metrics
         * @description Returns circuit-breaker and rate-limiter counters for every connector,
         *     so an operator can see which ones are failing or being throttled.
         */
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
         * Disable a connector
         * @description Sets the connector's status to `disabled`. The connector is kept for audit
         *     history and can be re-enabled with a PATCH setting `status` to `active`.
         *     Disabling an already disabled connector still returns 204.
         */
        delete: operations["disable_connector"];
        options?: never;
        head?: never;
        /**
         * Update a connector
         * @description Changes the connector's URL, its status, or both. At least one field must
         *     be present. The change takes effect immediately.
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
         * Get a card connector's provider balances
         * @description Returns the balances of the accounts the platform holds with the card
         *     provider. Empty for providers that have no account balance concept.
         *     Operator-only.
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
         * Read a connector's configuration
         * @description Returns every configuration variable in plaintext. Each call is written
         *     to the audit log.
         */
        get: operations["get_configuration"];
        /**
         * Replace a connector's configuration
         * @description Overwrites all configuration variables with the given set. Keys must match
         *     `[a-z][a-z0-9_]{0,63}` and each value may be up to 8 KiB. The connector
         *     picks up the change on its next poll.
         */
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
        /**
         * Remove one configuration variable
         * @description Deletes a single variable. Removing a key that is not set is not an error.
         *     Returns the full set after the change.
         */
        delete: operations["delete_configuration_key"];
        options?: never;
        head?: never;
        /**
         * Set one configuration variable
         * @description Creates or updates a single variable and leaves the others untouched.
         *     Returns the full set after the change.
         */
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
         * List a card connector's programs
         * @description Returns the card programs known for this connector together with their
         *     pricing. The list is empty until the programs have been synced from the
         *     connector at least once.
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
         * Sync a card connector's programs
         * @description Asks the connector for the programs it offers and updates the label, card
         *     type, currency and BIN of each one. Pricing set by operators is kept. A
         *     program the connector no longer offers is removed when no card was issued
         *     on it, and disabled otherwise. Returns the full list after the sync.
         */
        post: operations["sync_programs"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/programs/{program_code}": {
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
         * Set what users see for a card program
         * @description Name, description, designs, visibility and properties of one program in
         *     the user catalog. Pricing stays under `/pricing`. Omitted fields keep
         *     their value; `design_id: null` returns the program to the deployment's
         *     default design.
         */
        patch: operations["patch_program"];
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
         * Set pricing for a card program
         * @description Sets the cost price, sell price, fee label, priority and status of one
         *     program. The program must already be known, so sync the connector first.
         *     A currency is required whenever `sell_price` is set.
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
         * Rotate a connector's secrets
         * @description Replaces both secrets at once. The old values stop working immediately and
         *     there is no overlap period, so update the connector's side right after.
         *     The new plaintext secrets are returned only in this response.
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
         * Get a connector's activity totals
         * @description Returns counts and summed amounts for everything that went through this
         *     connector, grouped by status and currency. What is counted depends on the
         *     connector's role: payments, deposits, cards or settlement cycles. Operator-only.
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
         * Test an exchange rate provider
         * @description Fetches one rate from the given provider without making it active. Use it
         *     to check a new `rates.custom` entry against a real currency pair before
         *     deposits depend on it. The rate cache is bypassed.
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
         * List exchange rate providers
         * @description Returns the provider names that can be set in `rates.fx_provider`, plus
         *     the one currently active.
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
        /**
         * List all merchants
         * @description Returns every merchant on this deployment. Operator-only.
         */
        get: operations["list_merchants"];
        put?: never;
        /**
         * Create a merchant
         * @description Onboards a new merchant with a legal name and settlement currency. Operator-only.
         */
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
         * Get a merchant
         * @description Returns one merchant by id. Operator-only.
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
         * List a merchant's payment connectors
         * @description Returns the merchant's cascade, ordered by priority with the lowest value
         *     first. Use the assign endpoint to change a priority.
         */
        get: operations["list_acquirers"];
        put?: never;
        /**
         * Assign a payment connector to a merchant
         * @description Adds the connector to the merchant's cascade at the given priority. If the
         *     connector is already assigned, its priority is updated and it is re-enabled.
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
         * Remove a payment connector from a merchant
         * @description Deletes the assignment so the cascade no longer considers this connector.
         *     The connector can be assigned again later with the assign endpoint. Audited.
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
         * Create an API key for a merchant
         * @description Mints a new key and secret pair on the merchant's default shop. The plaintext
         *     secret is returned only in this response and cannot be retrieved later.
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
         * List a merchant's bank accounts
         * @description Returns the merchant's active settlement bank accounts. Pass
         *     `include_archived=true` to also see archived ones.
         */
        get: operations["list_bank_accounts"];
        put?: never;
        /**
         * Add a bank account to a merchant
         * @description Creates a settlement bank account. New accounts are not primary; use the
         *     primary endpoint to promote one once it has been verified.
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
         * Archive a bank account
         * @description Marks the account as archived and hides it from default listings. Past
         *     settlement cycles keep their copy of the account details. If the account
         *     was primary, the merchant has no primary for that currency until another
         *     account is promoted.
         */
        delete: operations["archive_bank_account"];
        options?: never;
        head?: never;
        /**
         * Update a bank account
         * @description Changes only the fields present in the body. To clear `currency` so the
         *     account is no longer pinned to one, pass `"currency": null` explicitly.
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
         * Make a bank account primary
         * @description Promotes the account to the merchant's primary for its currency and
         *     demotes the previous primary in the same step, so there is always exactly
         *     one per currency. Archived accounts cannot be promoted.
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
         * List a merchant's customers
         * @description Returns customers most recently seen first. Erased customers are included
         *     with their personal fields set to null and `erased_at` filled in.
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
        /**
         * Get a merchant's customer
         * @description Returns one customer with all personal details and activity counters.
         */
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
         * Erase a customer's personal data
         * @description Clears the customer's personal fields and records when it happened, for
         *     GDPR erasure requests. The customer record itself stays. A second call
         *     returns 409 with code `already_erased`.
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
        /**
         * List a merchant's shops
         * @description Returns every shop of the merchant, including archived ones.
         */
        get: operations["admin_list_shops"];
        put?: never;
        /**
         * Create a shop for a merchant
         * @description Adds a shop under the merchant. API keys and webhook endpoints are
         *     attached per shop. Audited.
         */
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
        /**
         * Get a merchant's shop
         * @description Returns one shop. 404 if it does not belong to the merchant.
         */
        get: operations["admin_get_shop"];
        put?: never;
        post?: never;
        /**
         * Archive a merchant's shop
         * @description Marks the shop as archived. Its keys stop working and it disappears from
         *     the merchant's own listings. Audited.
         */
        delete: operations["admin_archive_shop"];
        options?: never;
        head?: never;
        /**
         * Update a merchant's shop
         * @description Changes only the fields present in the body.
         */
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
        /**
         * List a shop's API keys
         * @description Returns the shop's keys without their secrets.
         */
        get: operations["admin_list_secrets"];
        put?: never;
        /**
         * Create an API key for a shop
         * @description Mints a key and secret pair for the shop. The plaintext secret is
         *     returned only in this response. Audited.
         */
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
        /**
         * Revoke a shop's API key
         * @description Disables the key immediately. This cannot be undone. Audited.
         */
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
        /**
         * List a merchant's users
         * @description Returns every merchant portal login that belongs to the merchant. Operator-only.
         */
        get: operations["list_merchant_users"];
        put?: never;
        /**
         * Create a merchant user
         * @description Creates a merchant portal login with a temporary password. The plaintext
         *     password is returned only in this response and cannot be recovered later,
         *     so pass it to the person out of band. A password change on first login is
         *     not enforced by the API.
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
         * Delete a merchant user
         * @description Permanently removes the merchant portal login. Returns 404 if the user does
         *     not belong to the merchant in the path. Operator-only, audited.
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
        /**
         * Set a merchant's webhook
         * @description Sets or replaces the URL and signing secret used for the merchant's webhook
         *     deliveries. Both fields are required.
         */
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
        /**
         * List a merchant's webhook endpoints
         * @description Returns every endpoint configured for the merchant. Secrets are not
         *     included.
         */
        get: operations["admin_list"];
        put?: never;
        /**
         * Create a webhook endpoint for a merchant
         * @description Adds an endpoint on the merchant's default shop. The signing secret is
         *     returned only in this response. Audited.
         */
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
        /**
         * Archive a merchant's webhook endpoint
         * @description Stops deliveries to the endpoint and hides it from listings. The record is
         *     kept for history. Audited.
         */
        delete: operations["admin_archive"];
        options?: never;
        head?: never;
        /**
         * Update a merchant's webhook endpoint
         * @description Changes only the fields present in the body. Returns 404 if the endpoint
         *     does not belong to the merchant. Audited.
         */
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
        /**
         * Rotate a merchant's webhook secret
         * @description Replaces the endpoint's signing secret. The old secret stops working
         *     immediately. The new secret is returned only in this response. Audited.
         */
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
         * Get card spend metrics
         * @description Returns totals and breakdowns of card transactions over the last
         *     `window_days` (default 7, max 90), optionally limited to one currency.
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
        /**
         * List organizations
         * @description Returns every organization with its current prepaid balance.
         */
        get: operations["list_organizations"];
        put?: never;
        /**
         * Create an organization
         * @description Onboards a new organization with a legal name and billing currency. It
         *     starts with a zero prepaid balance.
         */
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
        /**
         * Get an organization
         * @description Returns one organization with its current prepaid balance.
         */
        get: operations["get_organization"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Change an organization's status
         * @description Sets the organization to `active`, `suspended` or `closed`. Audited.
         */
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
        /**
         * Create an API key for an organization
         * @description Mints a key and secret pair for the organization's server-to-server
         *     calls. The plaintext secret is returned only in this response.
         */
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
        /**
         * List an organization's card pricing
         * @description Returns the per-card price the organization pays for each card type.
         */
        get: operations["get_pricing"];
        /**
         * Set an organization's card pricing
         * @description Creates or replaces the per-card price for one card type. Audited.
         */
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
        /**
         * Remove an organization's card pricing
         * @description Deletes the per-card price for one card type.
         */
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
         * Top up an organization's prepaid balance
         * @description Credits the organization's prepaid balance by hand, for money received
         *     outside the platform. Returns the organization with the new balance. Audited.
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
        /**
         * List an organization's users
         * @description Returns every login that belongs to the organization.
         */
        get: operations["list_users"];
        put?: never;
        /**
         * Create an organization user
         * @description Creates a login for the organization with a temporary password. The
         *     password is returned only in this response and cannot be recovered later.
         */
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
         * List recent payments across all merchants
         * @description Returns the newest payments on the deployment, with the merchant's legal
         *     name on each row. Filter by merchant, status, method or currency. Operator-only.
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
         * List all permissions
         * @description Returns every permission key a role can be granted. Use it to build a
         *     role editor.
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
        /**
         * List refunds
         * @description Returns refunds across all users and merchants, newest first, with the
         *     requestor's name resolved on each row. Operator-only.
         */
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
         * List roles
         * @description Returns every role, system roles first, each with its full permission
         *     list.
         */
        get: operations["list_roles"];
        put?: never;
        /**
         * Create a role
         * @description Creates a custom role with the given permissions. The built-in roles
         *     (user, customer, support, finance, operator) cannot be created here, and
         *     the wildcard permission is reserved for the operator role.
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
        /**
         * Get a role
         * @description Returns one role by name with its permission list.
         */
        get: operations["get_role"];
        put?: never;
        post?: never;
        /**
         * Delete a role
         * @description Removes a custom role. Built-in roles cannot be deleted.
         */
        delete: operations["delete_role"];
        options?: never;
        head?: never;
        /**
         * Update a role
         * @description Changes the description, the permissions, or both. The operator role's
         *     permissions cannot be changed; its description can.
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
         * List settings
         * @description Returns every known setting with its current value. Secret values are
         *     redacted, so this call is not audited. Operator-only.
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
         * Reveal a setting
         * @description Returns the full plaintext value of one setting, or its default when
         *     nothing is set. Every call is written to the audit log.
         */
        get: operations["get_setting"];
        /**
         * Set a setting
         * @description Validates the value against the setting's constraint and stores it. The
         *     change takes effect immediately. Audited.
         */
        put: operations["put_setting"];
        post?: never;
        /**
         * Reset a setting
         * @description Removes the stored value so the setting falls back to its default. Audited.
         */
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
        /**
         * List settlement cycles
         * @description Returns cycles newest first, optionally filtered by merchant or status.
         *     Operator-only.
         */
        get: operations["list_cycles"];
        put?: never;
        /**
         * Open a settlement cycle
         * @description Starts a new cycle for a merchant. A merchant can have only one cycle in
         *     progress at a time; close or fail the current one first. Audited.
         */
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
        /**
         * Get a settlement cycle
         * @description Returns one cycle with its amounts and current status.
         */
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
         * Close a settlement cycle
         * @description Freezes the period, computes the gross, fee and net amounts, and moves
         *     the cycle to `posted`. No money is moved: the operator pays the merchant
         *     and then calls mark-completed. Audited.
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
        /**
         * Mark a settlement cycle completed
         * @description Records that the merchant has been paid and moves the cycle to
         *     `completed`. Only a `posted` cycle can be completed. Audited.
         */
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
         * Mark a settlement cycle failed
         * @description Ends the cycle as `failed` with a reason, for example when the payout
         *     could not be made. A new cycle can then be opened for the merchant. Audited.
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
        /**
         * List subscription tiers
         * @description Returns every tier, active and disabled.
         */
        get: operations["list_tiers"];
        put?: never;
        /**
         * Create a subscription tier
         * @description Adds a tier with its monthly fee and discounts. Audited.
         */
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
        /**
         * Delete a subscription tier
         * @description Removes a tier that no user is subscribed to. Audited.
         */
        delete: operations["delete_tier"];
        options?: never;
        head?: never;
        /**
         * Update a subscription tier
         * @description Changes only the fields present in the body. Audited.
         */
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
        /**
         * List users
         * @description Returns end-user accounts newest first, optionally filtered by email or
         *     narrowed to accounts that still lack a real email. Operator-only.
         */
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
        /**
         * Get a user
         * @description Returns account details, two-factor status and activity counts for one
         *     user.
         */
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
         * Get a user's balance
         * @description Returns the user's wallet balance in one currency. This is the balance
         *     the balance-adjust endpoint credits or debits.
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
         * Adjust a user's balance by hand
         * @description Credits or debits the user's wallet directly, bypassing risk checks. A
         *     positive amount credits, a negative one debits. The note is required and
         *     goes into the audit log. Use this only to correct mistakes.
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
         * List a user's balances
         * @description Returns every non-zero balance the user holds, in any currency, with the
         *     wallet currency flagged. Use it to find balances that need migrating.
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
    "/v1/admin/users/{id}/devices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** A user's devices */
        get: operations["admin_list_devices"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/devices/{device_id}": {
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
         * Disable a user's device
         * @description Support action for a device that keeps buzzing or was left on a shared
         *     computer. Needs the `users.write` permission. Audited.
         */
        patch: operations["admin_patch_device"];
        trace?: never;
    };
    "/v1/admin/users/{id}/notification-preferences": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** A user's notification preferences */
        get: operations["admin_get_preferences"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/notifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * What a user was sent lately
         * @description The user's inbox as they see it, newest first. For "why didn't I get a
         *     notification?": an item here means it was sent; check the devices for
         *     where.
         */
        get: operations["admin_list_notifications"];
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
         * Change a user's role
         * @description Moves the user to another role. The role must already exist. Returns the
         *     updated user. Audited.
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
        /**
         * Sign a user out everywhere
         * @description Operator action. Every session of the user is signed out, none is kept.
         *     Needs the `users.write` permission.
         */
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
        /**
         * Get a user's subscription
         * @description Returns the tier the user is on and when it renews.
         */
        get: operations["get_user_subscription"];
        /**
         * Assign a subscription to a user
         * @description Puts the user on the given tier, replacing any current subscription. Audited.
         */
        put: operations["assign_user_subscription"];
        post?: never;
        /**
         * Cancel a user's subscription
         * @description Removes the user from their tier. Audited.
         */
        delete: operations["cancel_user_subscription"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/telegram": {
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
         * Unlink a user's Telegram account
         * @description Operator action for support cases. Removes the user's Telegram link so
         *     the Mini App treats them as a new visitor next time; the user can link
         *     again themselves. Refused when the account has no password, because
         *     nothing would be left to sign in with. Needs the `users.write`
         *     permission. Always audited.
         */
        delete: operations["admin_unlink_telegram"];
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
         * Reset a user's two-factor authentication
         * @description Removes the user's authenticator enrolment so they set it up again on
         *     their next login. Use it when someone has lost their phone. It also lifts
         *     a lock from too many wrong codes. Safe to call for a user who is not
         *     enrolled; the response then says `removed: false`. Always audited.
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
         * Regenerate a user's two-factor backup codes
         * @description Issues ten new single-use backup codes and invalidates all old ones at
         *     once. The plaintext codes are returned only in this response. The user
         *     must already have two-factor authentication set up.
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
         * Set a user's wallet currency
         * @description Operator action; any ISO 4217 code is accepted. Balances held in the
         *     previous currency are treated as foreign and can be converted with
         *     `POST /admin/users/{id}/wallet-migrate`. Needs the `users.write`
         *     permission.
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
         * Migrate a user's balance into the wallet currency
         * @description Converts the user's whole balance in `source_currency` into their wallet
         *     currency at the current rate plus spread. The conversion is atomic and
         *     audited, and a repeat call for the same balance does not convert twice.
         *     If no rate is available the migration is refused rather than estimated.
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
         * Log in with email and password
         * @description The response is tagged by `stage`. End users get `jwt` with the session
         *     token right away. Accounts whose role has any operator permission must
         *     pass a second factor: `totp_setup_required` on the first login (enrol an
         *     authenticator, then call `POST /auth/login/totp-setup`) and
         *     `totp_required` afterwards (call `POST /auth/login/totp`). A wrong
         *     password and an unknown email return the same 401.
         *
         *     Five wrong codes in a row lock the account for 15 minutes. Each lock
         *     after that lasts twice as long as the previous one, up to 24 hours, until
         *     the user signs in successfully. While the account is locked, this
         *     endpoint and the code endpoints return 429 with `too_many_attempts`. An
         *     operator can lift the lock by resetting the user's two-factor setup.
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
        /**
         * Switch to a Telegram or email code
         * @description Sends a one-time code by the chosen method and returns a new
         *     `challenge_token` for `POST /auth/login/otp/verify`. The method must be
         *     in `available_methods` of the `totp_required` login response. A
         *     `totp_setup_required` challenge can't be switched; finish enrolment first.
         */
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
        /**
         * Complete login with a Telegram or email code
         * @description Send the `challenge_token` from the switch response with the code the
         *     user received.
         */
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
        /**
         * Complete login with an authenticator code
         * @description Send the `challenge_token` from the `totp_required` response with the
         *     6-digit code. A backup code in `XXXX-XXXX` form is accepted instead;
         *     using one removes the authenticator enrolment, and the user enrols again
         *     on the next login. Wrong codes count toward the lock described under
         *     `POST /auth/login`; the fifth one in a row returns 429.
         */
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
        /**
         * Confirm authenticator enrolment and complete login
         * @description Send the `challenge_token` from the `totp_setup_required` response with
         *     the first code from the authenticator app. The response is the session
         *     plus `backup_codes`: ten one-time codes returned only once, so show them
         *     to the user right away.
         */
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
         * Get the current user
         * @description Returns the account behind the bearer token, plus its `wallet_currency`
         *     and `telegram` (`{ username, linked_at }` or `null`).
         *     Use it on app start to check whether a stored token is still valid; a
         *     401 means the token expired or was revoked and the user must log in
         *     again.
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
         * Change your password
         * @description Needs the current password and a new one that passes the policy. Every
         *     other session of the account is signed out; the session making this call
         *     stays valid.
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
         * Register an end-user account
         * @description Creates an account with the `user` role and signs it in; the response
         *     carries the session token and the user. Operator roles are granted by an
         *     operator through `/admin/users`, not here.
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
         * Sign in with Telegram
         * @description Exchanges a signed Telegram Mini App `initData` payload for a session. A
         *     Telegram id seen for the first time gets a new end-user account with a
         *     placeholder email and `email_pending: true`; the client should then ask
         *     for a real address and send it to `POST /me/email`. With
         *     `provision: false` an unknown id is answered with `404 telegram_unknown`
         *     and no account is created, so the app can ask whether the user already
         *     has one and link it with `POST /auth/telegram/link`. The response is the
         *     `stage: "jwt"` envelope of `POST /auth/login`. Accounts with operator
         *     permissions can't sign in this way; they use `POST /auth/login` with a
         *     second factor.
         */
        post: operations["telegram_exchange"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/telegram/link": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Link Telegram to an existing account and sign in
         * @description For a Mini App user who already has an email + password account. Proves
         *     the password, attaches the Telegram account from `init_data` to that
         *     account and returns a session, the `stage: "jwt"` envelope of
         *     `POST /auth/login`. From then on `POST /auth/telegram/exchange` signs
         *     the user straight in.
         *
         *     One Telegram account maps to one account here. A Telegram id that the
         *     exchange had auto-provisioned into an empty account (no password, no
         *     activity) is moved over and that empty account is retired. A Telegram id
         *     that belongs to an account with activity is refused with
         *     `telegram_in_use`; an account that already has a different Telegram is
         *     refused with `telegram_already_linked_other`. Operator accounts can't
         *     be linked. Linking sends a security notice to the account.
         */
        post: operations["telegram_link"];
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
         * Get a blog image
         * @description Returns the raw image bytes. No authentication needed. The bytes never
         *     change under a given id, so the response carries a long-lived cache
         *     header and an ETag; clients can link to these URLs directly from
         *     `cover_url` and image blocks.
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
        /**
         * List published posts
         * @description Newest first, paged. No authentication needed. Filter by `tag` or
         *     `locale`.
         */
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
        /**
         * Get a published post by slug
         * @description No authentication needed. Unpublished posts and unknown slugs return
         *     404.
         */
        get: operations["blog_get_post"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/card-products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the cards this deployment offers
         * @description The catalog for a landing page or a cabinet before sign-in. No
         *     authentication needed. Same products, order and default as
         *     `GET /me/card-products`, with the list price instead of a personal one
         *     (`price.discount_bps` is always 0). Products the operator hid are left
         *     out. The response carries an `ETag`; send it back in `If-None-Match` to
         *     get a 304 when nothing changed. Caches may keep it for a minute.
         */
        get: operations["list_public_products"];
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
         * Get your wallet balance
         * @description Returns the balance in the requested currency, or in the wallet currency
         *     when `currency` is omitted. The wallet's display name comes from
         *     `wallet_label` in `GET /branding`; the fields here never change.
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
    "/v1/me/card-products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the cards you can issue
         * @description Every card product this deployment offers, first the one you get when
         *     you don't choose. Each carries its artwork, the designs you may pick and
         *     what issuance costs you right now, your subscription discount included.
         */
        get: operations["list_products"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/card-products/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get one card product */
        get: operations["get_product"];
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
        /**
         * List your cards
         * @description Most recent first.
         */
        get: operations["me_list_cards"];
        put?: never;
        /**
         * Create a card
         * @description Issues a card through a card connector and, for a prepaid card, loads
         *     `initial_amount` from the wallet. Only `prepaid` is available today;
         *     `credit` and `gift` return 400. The `Idempotency-Key` header is required.
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
        /** Get a card */
        get: operations["me_get_card"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Rename a card or change its design
         * @description Only the name and the design can change, and the card is not reissued:
         *     this is the picture you see, nothing else. Pick a design the card's
         *     product offers or one this deployment offers on every product.
         */
        patch: operations["patch_card"];
        trace?: never;
    };
    "/v1/me/cards/{id}/balance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a card's balance
         * @description Returns the remaining balance of a prepaid card, in the card's currency
         *     unless `currency` is given.
         */
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
         * Freeze a card
         * @description Only the card's owner can freeze it; someone else's card returns 404 or
         *     403. Freezing an already frozen card is a no-op. Returns 501 when the
         *     connector does not support freezing.
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
        /**
         * Reveal card details
         * @description Returns the full card number and CVV of your own card. The session is
         *     enough: no password or code is asked again. Rate limited per card and per
         *     user. The response is marked no-store and the details are never kept on
         *     the platform.
         */
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
        /**
         * Terminate a card
         * @description Only the card's owner can terminate it. This cannot be undone; calling it
         *     again on a terminated card is a no-op. A closed card that never had a
         *     transaction disappears from the list; this response still carries it.
         */
        post: operations["me_terminate_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/cards/{id}/topup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Terms of a card top-up
         * @description What the client needs before it draws the top-up form: whether the card
         *     can be topped up now, the currency, what the wallet holds, and the floor
         *     and cap the card's product puts on a single top-up. Someone else's card
         *     returns 404.
         */
        get: operations["get_topup_terms"];
        put?: never;
        /**
         * Top up a card from the wallet
         * @description Moves `amount` from the wallet onto the caller's own card. The wallet is
         *     debited first and the card's provider then loads the card; if the
         *     provider refuses, the money is back on the wallet and the call says so.
         *     The response carries the card and both balances, so no second request is
         *     needed. The `Idempotency-Key` header is required: the same key with the
         *     same amount returns the first outcome, the same key with a different
         *     amount returns 409. Someone else's card returns 404.
         */
        post: operations["topup_card"];
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
        /**
         * Unfreeze a card
         * @description Only the card's owner can unfreeze it. Unfreezing a card that is not
         *     frozen is a no-op.
         */
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
        /**
         * List your deposits
         * @description Most recent first.
         */
        get: operations["list_deposits"];
        put?: never;
        /**
         * Create a deposit
         * @description Starts a top-up through a funding connector. When the connector confirms
         *     right away the wallet is credited in the same call; otherwise the deposit
         *     comes back `pending` or `redirect_required` and is confirmed later. With
         *     `redirect_required`, send the user to `redirect_url`; the provider brings
         *     them back to `metadata.return_url` once they are done, and the deposit
         *     turns `confirmed` or `failed` on its own. Poll `GET /me/deposits/{id}`
         *     for the final state. The `Idempotency-Key` header is required: the same
         *     key with the same body returns the original deposit, the same key with a
         *     different body returns 409.
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
         * Create a deposit quote
         * @description Prices a deposit in a currency other than the wallet's before any money
         *     moves. The rate is locked until `expires_at`; deposits in the wallet
         *     currency need no quote.
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
        /** Get a deposit */
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
         * Refund a deposit
         * @description Only confirmed deposits can be refunded. When the connector settles
         *     inline the refund comes back `succeeded`; otherwise it stays `pending`
         *     and is updated once the provider reports the outcome. The
         *     `Idempotency-Key` header is required.
         */
        post: operations["refund_deposit"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/devices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Your devices */
        get: operations["list_devices"];
        /**
         * Register this device
         * @description Idempotent on the credential: sending the same endpoint or token again
         *     refreshes the device (and re-enables it) instead of adding another.
         */
        put: operations["register_device"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/devices/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Remove a device */
        delete: operations["delete_device"];
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
         * Set your email address
         * @description Accounts created through the Telegram Mini App start with a placeholder
         *     address and `email_pending: true`; call this once the user has entered a
         *     real one and the flag is cleared. Password accounts can use it to change
         *     their email. An address already used by another account returns 409. The
         *     address is not verified for ownership.
         */
        post: operations["set_email"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/notification-preferences": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get your notification preferences */
        get: operations["get_preferences"];
        /**
         * Change your notification preferences
         * @description Every field is optional; omitted ones keep their value. The inbox always
         *     gets every notification. Security and money notices keep at least one
         *     outward channel when any is available, whatever the switches say.
         */
        put: operations["put_preferences"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/notifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List your notifications
         * @description Newest first, with a cursor for the next page. Every notification the
         *     app would have shown as a push, a Telegram message or an email is here
         *     too, whether or not that message arrived.
         */
        get: operations["list_notifications"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/notifications/read-all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Mark every notification as read */
        post: operations["mark_all_read"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/notifications/unread-count": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** How many notifications you haven't read */
        get: operations["unread_count"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/notifications/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete a notification */
        delete: operations["delete_notification"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/notifications/{id}/read": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Mark a notification as read */
        post: operations["mark_read"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/push-subscription": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get your push subscription status
         * @description Deprecated: use `GET /me/devices`. Returns whether a Web Push device is
         *     registered and the VAPID public key the browser needs to subscribe.
         */
        get: operations["get_push_subscription"];
        /**
         * Store your push subscription
         * @description Deprecated: use `PUT /me/devices` with `kind: "webpush"`. Registers the
         *     subscription the browser returned from `pushManager.subscribe` as a
         *     device of yours; sending the same endpoint again refreshes it.
         */
        put: operations["put_push_subscription"];
        post?: never;
        /**
         * Remove your push subscription
         * @description Deprecated: use `DELETE /me/devices/{id}`. Removes every Web Push device
         *     of yours. The client should also unsubscribe in the browser. Safe to call
         *     when nothing is stored.
         */
        delete: operations["delete_push_subscription"];
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
        /**
         * List your active sessions
         * @description Returns every live session of the account, including the one making this
         *     call, which is marked with `current: true`.
         */
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
         * Sign out all other sessions
         * @description Every session of the account except the one making this call is signed
         *     out.
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
        /**
         * Sign out one session
         * @description Works on any of the caller's sessions, including the current one. Returns
         *     404 when the session is unknown or already signed out.
         */
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
        /**
         * Get your announcement subscriptions
         * @description Returns the channels you are subscribed to and the ones this deployment
         *     can deliver on.
         */
        get: operations["get_subscriptions"];
        /**
         * Replace your announcement subscriptions
         * @description Subscribing to a channel the account has no contact for, such as Telegram
         *     without a linked account, is accepted, but nothing can be delivered there
         *     until the channel is linked.
         */
        put: operations["put_subscriptions"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/telegram": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Link Telegram to your account
         * @description For a signed-in user inside the Mini App. Attaches the Telegram account
         *     from `init_data` to the current account, under the same rules as
         *     `POST /auth/telegram/link`, and returns the updated user. Linking the
         *     same Telegram account again is a no-op.
         */
        post: operations["me_link_telegram"];
        /**
         * Unlink Telegram from your account
         * @description Detaches the Telegram account. Refused when the account has no password,
         *     because nothing would be left to sign in with.
         */
        delete: operations["me_unlink_telegram"];
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
        /**
         * Get your wallet currency
         * @description Returns the currency the wallet is held in and the currencies the caller
         *     may switch to.
         */
        get: operations["get_my_wallet"];
        /**
         * Switch your wallet currency
         * @description Only allowed while every balance is zero; a funded wallet is migrated by
         *     an operator instead. The new currency must be one of `allowed` from
         *     `GET /me/wallet`.
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
        /** List API keys */
        get: operations["list_keys"];
        put?: never;
        /**
         * Create an API key
         * @description Returns the key and its secret. The secret is shown only once.
         */
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
        /**
         * Revoke an API key
         * @description The key stops working immediately.
         */
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
        /**
         * Log in as an organization user
         * @description Returns a bearer token and the user's profile. Wrong credentials give 401.
         *     If the email belongs to more than one organization and `organization_id`
         *     is not set, the response is 409.
         */
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
        /**
         * Get the current organization user
         * @description Returns the profile of the user behind the bearer token, including their
         *     organization and role.
         */
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
        /**
         * Get the prepay balance
         * @description Returns the current prepay balance in the organization's billing currency.
         */
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
        /** List the organization's cards */
        get: operations["org_list_cards"];
        put?: never;
        /**
         * Issue a prepaid card
         * @description Issues a prepaid card to the holder and funds it from the organization's
         *     prepay balance. Your organization's issuance fee is debited first, then the
         *     load amount. The card provider is chosen by the platform and is not exposed.
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
        /** Get a card */
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
        /**
         * Get a card's balance
         * @description Returns the card's current balance, or `null` when the provider has not
         *     reported one.
         */
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
        /**
         * Freeze a card
         * @description Blocks spending on the card until it is unfrozen.
         */
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
        /**
         * Reload a card
         * @description Adds funds to the card from the organization's prepay balance.
         */
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
        /**
         * Terminate a card
         * @description Closes the card for good. This cannot be undone.
         */
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
        /**
         * Unfreeze a card
         * @description Restores spending on a frozen card.
         */
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
        /**
         * Get the current organization
         * @description Returns the organization behind the credentials and its current prepay balance.
         */
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
        /**
         * List members
         * @description Returns the active roster.
         */
        get: operations["list_members"];
        put?: never;
        /**
         * Add a member
         * @description Adds one person to the roster by email. A holder account is created if the
         *     email is new. Adding an email that is already on the roster returns the
         *     existing member and re-activates them if they had been removed.
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
         * Add members in bulk
         * @description Adds many members in one request. Rows that fail are reported in `errors`
         *     next to the ones that succeeded; the batch never fails as a whole.
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
         * Remove a member
         * @description Takes the person off the roster. Cards already issued to them keep working;
         *     they are only left out of future payroll runs.
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
         * Run a payroll batch
         * @description Issues a prepaid card to each listed member, funded from the prepay balance.
         *     Each card costs your organization's issuance fee plus the load amount.
         *     Results are per member; one failure does not stop the batch.
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
        /** List webhook endpoints */
        get: operations["list_webhooks"];
        put?: never;
        /**
         * Create a webhook endpoint
         * @description Returns the endpoint and its signing secret. The secret is shown only once.
         */
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
        /**
         * Archive a webhook endpoint
         * @description Stops deliveries to the endpoint. Archived endpoints are kept but no longer
         *     receive events.
         */
        delete: operations["delete_webhook"];
        options?: never;
        head?: never;
        /**
         * Update a webhook endpoint
         * @description Only the fields you send are changed.
         */
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
        /**
         * Rotate a webhook signing secret
         * @description Generates a new signing secret and returns it once. Deliveries are signed
         *     with the new secret from now on.
         */
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
         * @description Postal address. ISO 3166 codes are recommended for `state` and `country`
         *     but not enforced.
         */
        Address: {
            city?: string | null;
            /** @description ISO 3166-1 alpha-2 code, e.g. "US". */
            country?: string | null;
            /** @description Street address, first line. */
            line1?: string | null;
            /** @description Street address, second line. */
            line2?: string | null;
            postal_code?: string | null;
            /** @description ISO 3166-2 subdivision code, e.g. "US-CA". Free text is accepted. */
            state?: string | null;
        };
        AdjustBalanceBody: {
            /**
             * @description Amount to apply, decimal string. Positive credits the user, negative debits. Must not be zero.
             * @example 10.00
             */
            amount: string;
            /** @description ISO 4217 code of the balance to adjust. */
            currency: string;
            /** @description Why the adjustment is made, at least 3 characters. Stored in the audit log. */
            note: string;
        };
        AdjustBalanceResult: {
            /** @description Amount applied, decimal string, signed as in the request. */
            amount: string;
            /** @description ISO 4217 code. */
            currency: string;
            /** @description `credit` or `debit`. */
            direction: string;
            /**
             * Format: uuid
             * @description User UUID.
             */
            user_id: string;
        };
        AdminCreateCardBody: {
            /** @description Card BIN to issue on. Passed to the connector as `issuer_bin`. */
            bin?: string | null;
            /** @description ISO 4217 code, e.g. `USD`. */
            currency: string;
            customer?: null | components["schemas"]["CustomerInfo"];
            /**
             * Format: uuid
             * @description Design to show on the card; omit for the program's default design.
             */
            design_id?: string | null;
            /**
             * @description Amount to load onto the card, decimal string. Debited from the user's wallet.
             * @example 1.00
             */
            initial_amount?: string | null;
            /** @description Slug of the card connector to issue through. */
            issuer_slug: string;
            /** @description Extra key-value pairs passed to the connector. `issuer_program_id` and `issuer_bin` are always taken from the fields above. */
            metadata?: {
                [key: string]: string;
            };
            /** @description Name shown to the holder, 1 to 40 characters. Defaults to the program's name for users. */
            name?: string | null;
            /** @description Program id from the connector's program list. Passed to the connector as `issuer_program_id`. */
            program_id?: string | null;
            /** @description Card type. Only `prepaid` is supported today, and it is the default. */
            type?: components["schemas"]["CardType"];
            /**
             * Format: uuid
             * @description User the card is issued to.
             */
            user_id: string;
        };
        /**
         * @description A blog post together with its broadcast history and the current send state
         *     for each channel.
         */
        AdminPostView: components["schemas"]["BlogPost"] & {
            /** @description Broadcast history, newest first. */
            broadcasts: components["schemas"]["BroadcastRow"][];
            /** @description Send state per channel. */
            channels: components["schemas"]["ChannelState"][];
            /** @description Public URL of the cover image, when one is set. */
            cover_url?: string | null;
        };
        AdminWalletView: {
            /** @description ISO 4217 code the wallet is now held in. */
            currency: string;
            /** @description Always `true` after an operator sets the currency. */
            explicit: boolean;
            /**
             * Format: uuid
             * @description The user whose wallet was changed.
             */
            user_id: string;
        };
        /**
         * @description An API key as shown in listings. The secret is never included; it was
         *     shown once when the key was created.
         */
        ApiKeyRow: {
            /**
             * Format: date-time
             * @description When the key was created.
             */
            created_at: string;
            /**
             * Format: uuid
             * @description Key UUID.
             */
            id: string;
            /** @description Public key identifier, sent as `X-Merchant-Key`. */
            key: string;
            /**
             * Format: date-time
             * @description When the key was last used to authenticate, if ever.
             */
            last_used_at?: string | null;
            /**
             * Format: uuid
             * @description Shop the key belongs to.
             */
            shop_id: string;
            /** @description `active` or `revoked`. */
            status: string;
        };
        /** @description A newly created API key together with its secret. */
        ApiKeySecretView: {
            api_key: components["schemas"]["ApiKeyView"];
            /**
             * @description Secret to send as `X-Organization-Secret`. Shown only in this response;
             *     store it now.
             */
            secret: string;
        };
        /** @description An API key for server-to-server calls. */
        ApiKeyView: {
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            /** @description Public part of the key, sent as `X-Organization-Key`. */
            key: string;
            /** @description Your own label for the key. */
            label: string;
            /**
             * Format: date-time
             * @description Last time the key authenticated a request.
             */
            last_used_at?: string | null;
            /** @description `active` or `revoked`. */
            status: string;
        };
        AssignAcquirerBody: {
            /** @description Slug of a registered payment connector. */
            connector_slug: string;
            /**
             * Format: int32
             * @description Cascade position. Lower values are tried first. Default 100.
             */
            priority?: number;
        };
        AssignBody: {
            /**
             * Format: uuid
             * @description Tier to put the user on.
             */
            tier_id: string;
        };
        /** @description One second-factor method the user can complete login with. */
        AvailableMethod: {
            /** @description Hint to show under the code input, such as where the code was sent. Absent for `totp`. */
            hint?: string | null;
            /** @description `true` for the method the client should show first. Priority is TOTP, then Telegram, then email. */
            is_default?: boolean;
            /** @description `totp`, `telegram_otp` or `email_otp`. */
            kind: string;
            /** @description Short label to show in a method picker. */
            label: string;
        };
        BackupCodesResult: {
            /**
             * Format: int64
             * @description Number of unused backup codes after the reset.
             */
            backup_codes_remaining: number;
            /** @description Ten new single-use codes in `XXXX-XXXX` form. Shown only once. */
            codes: string[];
            /**
             * Format: uuid
             * @description User UUID.
             */
            user_id: string;
        };
        BalanceDto: {
            /** @description Account id on the provider's side. */
            account: string;
            /**
             * @description Current balance, decimal string.
             * @example 168.30
             */
            amount: string;
            /** @description ISO 4217 code. */
            currency: string;
            /** @description Human-readable account name. */
            label: string;
        };
        BalanceResponse: {
            /** @description Balance as a decimal string, e.g. "12.50". */
            amount: string;
            /** @description ISO 4217 code. */
            currency: string;
        };
        BalanceView: {
            /** @description Amount as a decimal string. */
            amount: string;
            /** @description ISO 4217 code. */
            currency: string;
        };
        /** @description A merchant bank account that settlements are paid to. */
        BankAccount: {
            /** @description Local account number, for banks without IBAN. */
            account_number: string;
            /** @description ISO 3166-1 alpha-2 country of the bank. */
            bank_country: string;
            bank_name: string;
            /** Format: date-time */
            created_at: string;
            /** @description ISO 4217 code. Null means the account can be used for any currency. */
            currency?: string | null;
            /** @description Name of the account holder. */
            holder_name: string;
            /** @description IBAN, when the account has one. */
            iban: string;
            /** Format: uuid */
            id: string;
            /** @description Whether this is the default destination for its currency. */
            is_primary: boolean;
            /** @description Your own label for the account. */
            label: string;
            /** Format: uuid */
            merchant_id: string;
            /** @description Routing, sort or BSB code, where applicable. */
            routing_number: string;
            /** @description `active` or `archived`. */
            status: components["schemas"]["BankAccountStatus"];
            /** @description SWIFT/BIC code. */
            swift_bic: string;
            /** Format: date-time */
            updated_at: string;
        };
        /** @enum {string} */
        BankAccountStatus: "active" | "archived";
        /** @description Fields to change on a bank account. Anything omitted stays as it is. */
        BankAccountUpdate: {
            account_number?: string | null;
            bank_country?: string | null;
            bank_name?: string | null;
            /** @description ISO 4217 code. Send null to make the account usable with any currency. */
            currency?: string | null;
            holder_name?: string | null;
            iban?: string | null;
            label?: string | null;
            routing_number?: string | null;
            swift_bic?: string | null;
        };
        /** @description One renderable node of a post body. `type` says which kind it is. */
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
            /** @description Alt text; omitted when empty. */
            alt?: string;
            /** @description Caption, taken from an italic line right under the image. */
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
        /** @description Metadata of an uploaded image. The bytes are served by the image endpoint. */
        BlogImageMeta: {
            /** @description Alt text. */
            alt: string;
            /**
             * Format: int32
             * @description Size in bytes.
             */
            byte_size: number;
            /** @description MIME type, e.g. `image/png`. */
            content_type: string;
            /** Format: date-time */
            created_at: string;
            /** @description Original file name. */
            filename: string;
            /** Format: uuid */
            id: string;
        };
        /** @description A blog post as operators see it, drafts included. Readers get `PublicPost`. */
        BlogPost: {
            /**
             * Format: uuid
             * @description Operator who created the post.
             */
            author_user_id?: string | null;
            /** @description Post body in Markdown. */
            body_markdown: string;
            /**
             * Format: int32
             * @description Increases on every content edit. Broadcasts record the version they were sent for.
             */
            content_version: number;
            /**
             * Format: uuid
             * @description ID of the uploaded cover image, when set.
             */
            cover_image_id?: string | null;
            /** Format: date-time */
            created_at: string;
            /** @description Short teaser. Empty when it should be derived from the body. */
            excerpt: string;
            /** Format: uuid */
            id: string;
            /** @description Language tag such as `en`; empty when unset. */
            locale: string;
            /**
             * Format: date-time
             * @description When the post was first published.
             */
            published_at?: string | null;
            /** @description URL key, lowercase kebab-case. */
            slug: string;
            /** @description `draft`, `published` or `archived`. */
            status: string;
            tags: string[];
            title: string;
            /** Format: date-time */
            updated_at: string;
        };
        Branding: {
            /** @description Accent colour as `#rrggbb`. Empty means the client uses its bundled palette. */
            accent_color: string;
            /** @description Favicon, an absolute URL or a `data:` URI. Empty means the client uses its bundled default. */
            favicon_url: string;
            /** @description Logo image, an absolute URL or a `data:` URI. Empty means the client uses its bundled default. */
            logo_url: string;
            /** @description Name shown to merchants for the merchant portal. Falls back to the built-in name when not set. */
            merchant_portal_name: string;
            /** @description Platform name shown in the operator console and client apps. Default "Takeal". */
            platform_name: string;
            /** @description Primary brand colour as `#rrggbb`. Empty means the client uses its bundled palette. */
            primary_color: string;
            /** @description Secondary brand colour as `#rrggbb`. Empty means the client uses its bundled palette. */
            secondary_color: string;
            /** @description Display name for the end user's balance, e.g. "Wallet" or "Acme Wallet". Display only; JSON field names never change. Default "Wallet". */
            wallet_label: string;
        };
        BreakerView: {
            /**
             * Format: int64
             * @description Total calls made to the connector since the API started.
             */
            calls: number;
            /**
             * Format: int32
             * @description Failures in a row since the last successful call.
             */
            consecutive_failures: number;
            /**
             * Format: int64
             * @description Total calls that failed since the API started.
             */
            failures: number;
            /**
             * Format: int64
             * @description How many times the circuit has opened since the API started.
             */
            opens: number;
            /**
             * Format: int64
             * @description Calls rejected because the circuit was open.
             */
            rejects_open: number;
            /**
             * Format: int64
             * @description Calls rejected by the connector's rate limiter.
             */
            rejects_rate: number;
            /** @description Connector slug. */
            slug: string;
            /** @description Circuit state: `closed`, `open` or `half_open`. */
            state: string;
        };
        BroadcastBody: {
            /** @description Channel to send on: `email` or `telegram`. */
            channel: string;
        };
        BroadcastResult: {
            /**
             * Format: uuid
             * @description Id of this broadcast attempt.
             */
            broadcast_id: string;
            /** @description Channel the post was sent on. */
            channel: string;
            /**
             * Format: int32
             * @description Content version of the post that was sent.
             */
            content_version: number;
            /**
             * Format: int32
             * @description Number of subscribers a message could not be queued for. They are not retried.
             */
            failures: number;
            /**
             * Format: int32
             * @description Number of subscribers a message was queued for.
             */
            recipients: number;
        };
        /** @description One send of a post to one channel. */
        BroadcastRow: {
            /** @description Delivery channel. */
            channel: string;
            /**
             * Format: int32
             * @description The post's `content_version` when the broadcast was requested. If the
             *     post changed since, it can be sent again.
             */
            content_version: number;
            /** Format: date-time */
            created_at: string;
            /** @description Error message when status is `failed`. */
            error?: string | null;
            /**
             * Format: int32
             * @description Deliveries that failed.
             */
            failures: number;
            /**
             * Format: date-time
             * @description When the broadcast finished.
             */
            finished_at?: string | null;
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            post_id: string;
            /**
             * Format: int32
             * @description Number of recipients targeted.
             */
            recipients: number;
            /**
             * Format: uuid
             * @description Operator who requested the broadcast.
             */
            requested_by?: string | null;
            /** @description `queued`, `running`, `completed` or `failed`. */
            status: string;
        };
        BulkInviteBody: {
            /** @description Members to add. */
            members: components["schemas"]["InviteBody"][];
        };
        BulkInviteResult: {
            /** @description Rows that failed, with the reason. */
            errors: components["schemas"]["RowError"][];
            /** @description Members that were added or re-activated. */
            invited: components["schemas"]["MemberView"][];
        };
        /**
         * @description A card issued to a user. For gift cards, `redemption_code` is returned only
         *     in the creation response; later reads leave it out.
         */
        Card: {
            card_type: components["schemas"]["CardType"];
            /** @description Identifier of the card connector that issued this card. */
            connector_slug: string;
            /** Format: date-time */
            created_at: string;
            /** @description ISO 4217 code of the card balance. */
            currency: string;
            /**
             * Format: uuid
             * @description The design the holder picked. Null means the product's default design.
             */
            design_id?: string | null;
            /**
             * Format: int32
             * @description Expiry month, 1 to 12.
             */
            expiry_month?: number | null;
            /**
             * Format: int32
             * @description Expiry year, four digits.
             */
            expiry_year?: number | null;
            /** @description Why issuance failed, when status is `failed`. */
            failure_reason?: string | null;
            /**
             * @description How the card is funded: `shared` draws from a pooled account up to a
             *     per-card limit, `standard` is prepaid and reloadable. Null until the
             *     provider reports it.
             */
            funding_mode?: string | null;
            /** Format: uuid */
            id: string;
            /** @description Amount loaded at issuance, decimal string. */
            initial_amount?: string | null;
            /** @description Last four digits of the card number, once known. */
            last4?: string | null;
            /** @description The holder's own name for the card. Null until they set one. */
            name?: string | null;
            /**
             * @description Provider program or plan the card was issued under. Null when the
             *     provider has no program catalogue.
             */
            program_code?: string | null;
            /** @description Reference assigned by the card provider. */
            provider_reference?: string | null;
            /** @description Gift cards only. Present in the creation response and omitted from later reads. */
            redemption_code?: string | null;
            status: components["schemas"]["CardStatus"];
            /** Format: date-time */
            updated_at: string;
            /**
             * Format: uuid
             * @description The holder.
             */
            user_id: string;
        };
        /** @description Balance or spending limit as reported by the connector. */
        CardBalance: {
            /**
             * @description Current amount, decimal string. Null when the connector reports no balance.
             * @example 21.00
             */
            amount?: string | null;
            /** @description ISO 4217 code. */
            currency?: string | null;
        };
        /**
         * @description A card with a live balance from its connector. The card's own fields are
         *     at the top level; `live_balance` is nested.
         */
        CardDetail: components["schemas"]["CardView"] & {
            live_balance?: null | components["schemas"]["CardBalance"];
        };
        /** @description A card the user can issue. */
        CardProductView: {
            /** @description `prepaid`, `credit` or `gift`. */
            card_type: string;
            /** @description Currency the card is held in, or null when the product is multi-currency. */
            currency?: string | null;
            /** @description The operator's description for users, or null. */
            description?: string | null;
            /** @description The design a card gets unless another one is picked. */
            design: components["schemas"]["DesignRef"];
            /** @description Every design the user may pick for this product. */
            designs: components["schemas"]["DesignRef"][];
            /** @description Properties the operator entered, e.g. `{"scheme": "mastercard", "apple_pay": true, "reloadable": false, "min_load": "10", "max_load": "5000"}`. May be empty. */
            features: Record<string, never>;
            /**
             * Format: uuid
             * @description Product id. Pass it as `product_id` when creating a card.
             */
            id: string;
            /** @description True for the product a card gets when none is chosen. */
            is_default: boolean;
            name: string;
            price?: null | components["schemas"]["ProductPrice"];
        };
        CardRow: {
            /** @description `credit`, `prepaid` or `gift`. */
            card_type: string;
            /** @description Slug of the card connector that issued the card. */
            connector_slug: string;
            /**
             * Format: date-time
             * @description When the card was created.
             */
            created_at: string;
            /** @description ISO 4217 code. */
            currency: string;
            /** @description The design shown for the card. */
            design: components["schemas"]["DesignRef"];
            /** @description How the provider funds the card: `shared` or `standard`. Null when the provider does not distinguish. */
            funding_mode?: string | null;
            /**
             * Format: uuid
             * @description Card UUID.
             */
            id: string;
            /**
             * @description Amount loaded at issuance, decimal string. Does not change with later spend or top-ups.
             * @example 50.00
             */
            initial_amount?: string | null;
            /** @description Last four digits of the card number. The full number is never exposed. */
            last4?: string | null;
            /** @description The holder's name for the card, or null. */
            name?: string | null;
            /** @description Current card status. */
            status: string;
            /** @description Owner's login email. */
            user_email: string;
            /**
             * Format: uuid
             * @description Owner's user UUID.
             */
            user_id: string;
        };
        /**
         * @description Where a card is in its lifecycle.
         * @enum {string}
         */
        CardStatus: "pending_payment" | "active" | "frozen" | "terminated" | "redeemed" | "failed";
        /** @description One top-up attempt as stored in `card_topups`. */
        CardTopup: {
            /** @description What landed on the card, decimal string, in `currency`. */
            amount: string;
            /** Format: uuid */
            card_id: string;
            /** Format: date-time */
            created_at: string;
            currency: string;
            /** @description Why it failed, for a `failed` top-up. */
            failure_reason?: string | null;
            /** Format: uuid */
            id: string;
            /** @description `pending`, `confirmed` or `failed`. */
            status: string;
            /** Format: date-time */
            updated_at: string;
            /** @description What the wallet paid, decimal string, in `wallet_currency`. */
            wallet_amount: string;
            wallet_currency: string;
        };
        CardTxnRow: {
            /**
             * @description Signed amount, decimal string. Negative is spend.
             * @example -10.32
             */
            amount: string;
            /**
             * Format: date-time
             * @description When the transaction was authorised, if known.
             */
            authorised_at?: string | null;
            /** @description Amount actually charged to the card, decimal string. */
            billing_amount?: string | null;
            /** @description Currency of `billing_amount`, ISO 4217 code. */
            billing_currency?: string | null;
            /** @description The charged amount in USD, decimal string. */
            billing_usd_amount?: string | null;
            /**
             * Format: uuid
             * @description Card the transaction belongs to.
             */
            card_id: string;
            /**
             * Format: date-time
             * @description When the transaction cleared, if it has.
             */
            cleared_at?: string | null;
            /** @description Slug of the card connector that issued the card. */
            connector_slug: string;
            /** @description Currency of `amount`, ISO 4217 code. */
            currency: string;
            /** @description Why the transaction was declined, when it was. */
            decline_reason?: string | null;
            /**
             * Format: uuid
             * @description Transaction UUID.
             */
            id: string;
            /** @description Last four digits of the card number. */
            last4?: string | null;
            /** @description Merchant country code. */
            merchant_country?: string | null;
            /** @description Merchant category code. */
            merchant_mcc?: string | null;
            /** @description Merchant name as reported by the card network. */
            merchant_name?: string | null;
            /**
             * Format: date-time
             * @description Cleared time if available, else authorised time. Used for ordering.
             */
            occurred_at: string;
            /** @description Status string exactly as the provider reports it. */
            provider_status?: string | null;
            /** @description Transaction id on the provider's side. */
            provider_txn_id: string;
            /**
             * @description `pending`, `cleared`, `reversed`, `declined` or `unknown`. `unknown` means the provider reported a status we do not map. The provider's own value is in `provider_status`.
             * @example cleared
             */
            status: string;
            /** @description Card owner's login email, if known. */
            user_email?: string | null;
            /**
             * Format: uuid
             * @description Card owner's user UUID, if known.
             */
            user_id?: string | null;
        };
        /**
         * @description Card product type.
         * @enum {string}
         */
        CardType: "credit" | "prepaid" | "gift";
        /**
         * @description A card with its presentation: the stored row plus the resolved design
         *     and the product it was issued on.
         */
        CardView: components["schemas"]["Card"] & {
            /** @description The design shown for this card: the one the holder picked, else the product's, else the deployment default. */
            design: components["schemas"]["DesignRef"];
            product?: null | components["schemas"]["ProductRef"];
        };
        ChangePasswordBody: {
            /** @description The password currently on the account. */
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
             * @description Number of other sessions that were signed out.
             */
            revoked_sessions: number;
        };
        /**
         * @description Whether a post can be broadcast on one channel right now, and why not if it
         *     cannot.
         */
        ChannelState: {
            /**
             * @description Reason when `can_send` is false: `not_published`, `channel_disabled`,
             *     `no_subscribers`, `already_sent` or `in_flight`.
             */
            blocked_by?: string | null;
            /** @description True when a broadcast on this channel is allowed right now. */
            can_send: boolean;
            /** @description Channel name: `email` or `telegram`. */
            channel: string;
            /** @description True when an older version of this post was already sent, so the next send is a re-send. */
            is_resend: boolean;
            /**
             * Format: date-time
             * @description When the most recent completed send finished, if any.
             */
            last_sent_at?: string | null;
            /**
             * Format: int32
             * @description Recipient count of the most recent completed send, if any.
             */
            last_sent_recipients?: number | null;
            /**
             * Format: int64
             * @description Number of active subscribers on this channel.
             */
            subscribers: number;
        };
        CheckResult: {
            /** @description Error text when the check failed. */
            error?: string | null;
            /** @description `true` when the dependency answered. */
            ok: boolean;
            /** @description `true` when the dependency is not configured in this deployment and the check was skipped; `ok` stays `true` in that case. */
            skipped?: boolean;
        };
        ConfigurationView: {
            /**
             * Format: date-time
             * @description When the connector was last changed.
             */
            updated_at: string;
            /** @description All configuration variables in plaintext. */
            variables: {
                [key: string]: string;
            };
        };
        ConnectorCounts: {
            /** @description Payment connectors (merchant acquiring). */
            acquirers: number;
            /** @description Funding connectors (money in). */
            funders: number;
            /** @description Card connectors (user spending). */
            issuers: number;
            /** @description Settlement connectors (merchant payouts). */
            settlers: number;
        };
        ConnectorStats: {
            /** @description What `amount` adds up for this role, e.g. "payment amount" or "deposit amount". */
            amount_basis: string;
            /** @description Counts and totals grouped by status and currency. */
            buckets: components["schemas"]["StatBucket"][];
            /** @description `funder`, `issuer`, `acquirer` or `settler`. */
            role: string;
        };
        /**
         * @description A connector as shown on every read. Secrets appear only as short previews
         *     so an operator can recognise them but not recover the value.
         */
        ConnectorView: {
            /**
             * Format: int32
             * @description Order in which connectors of the same role are tried. Lower comes first.
             */
            cascade_priority: number;
            /** @description Configuration variable names with each value redacted. Empty when none are set. Use the configuration endpoint to read plaintext. */
            configuration_variables_preview: {
                [key: string]: string;
            };
            /**
             * Format: date-time
             * @description When the connector was created.
             */
            created_at: string;
            /** @description URL the platform calls the connector on. */
            grpc_url: string;
            /** @description Redacted preview of the secret the platform presents when calling the connector. */
            outbound_auth_secret_preview: string;
            /** @description `funder`, `issuer`, `acquirer` or `settler`. */
            role: string;
            /** @description Redacted preview of the secret the connector uses to sign its webhooks. */
            signing_secret_preview: string;
            /** @description Stable lowercase identifier of the connector. */
            slug: string;
            /** @description `active` or `disabled`. */
            status: string;
            /**
             * Format: date-time
             * @description When the connector was last changed.
             */
            updated_at: string;
        };
        /**
         * @example {
         *       "currency": "USD",
         *       "initial_amount": "50.00",
         *       "name": "Groceries",
         *       "product_id": "6c1c0a3e-1b7e-4b0e-9d9e-2f0f6f9a1234"
         *     }
         */
        CreateCardBody: {
            /** @description ISO 4217 code the card is held in. May differ from the wallet currency; the load is then converted at issuance. */
            currency: string;
            customer?: null | components["schemas"]["CustomerInfo"];
            /**
             * Format: uuid
             * @description One of the product's designs. Omit or send `null` for the product's default design.
             */
            design_id?: string | null;
            /** @description Amount to load onto a prepaid card, decimal string, taken from the wallet. */
            initial_amount?: string | null;
            /** @description Optional. Slug of the card connector to use; when omitted, the first configured one issues the card. An unknown slug returns 400. */
            issuer_slug?: string | null;
            /** @description Free-form key/value pairs stored with the card. */
            metadata?: {
                [key: string]: string;
            };
            /** @description Your name for the card, 1 to 40 characters. Defaults to the product name. */
            name?: string | null;
            /**
             * Format: uuid
             * @description The card product from `GET /me/card-products`. Sets the issuer, the program and the card type; without it the deployment's default product is used.
             */
            product_id?: string | null;
            type?: null | components["schemas"]["CardType"];
        };
        CreateConnectorBody: {
            /** @description URL the platform will call the connector on. Must start with `http://` or `https://`. */
            grpc_url: string;
            /** @description `funder`, `issuer` or `acquirer`. */
            role: string;
            /** @description Stable lowercase identifier, 3 to 64 characters of `a-z`, `0-9`, `-` and `_`, starting with a letter. */
            slug: string;
        };
        CreateConnectorResponse: {
            /** @description The created connector. */
            connector: components["schemas"]["ConnectorView"];
            /** @description Plaintext secret the platform presents when calling the connector. Shown only once. */
            outbound_auth_secret: string;
            /** @description Plaintext secret the connector uses to sign its webhooks. Shown only once; later reads return a redacted preview. */
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
            /**
             * @description Amount to deposit, decimal string, e.g. "100.00".
             * @example 100.00
             */
            amount: string;
            /** @description ISO 4217 code of the amount being paid. */
            currency: string;
            customer?: null | components["schemas"]["CustomerInfo"];
            /** @description Optional. Slug of the funding connector to use; when omitted, the first configured one handles the deposit. An unknown slug returns 400. */
            funder_slug?: string | null;
            /** @description Key/value pairs passed to the funding connector and stored with the deposit. Two keys are understood across connectors: `return_url`, where the provider sends the user back after a 3-D Secure step (used with `redirect_required`), and on test deployments with the mock funder `mock_scenario`, which picks the outcome: `happy` (confirmed at once, the default), `pending` (confirmed about 15 seconds later), `redirect` (a hosted confirmation page where the user approves or declines) or `fail`. Other keys are provider specific. */
            metadata?: {
                [key: string]: string;
            };
            /** @description One of `card`, `crypto`, `bank_transfer`. */
            method: components["schemas"]["DepositMethod"];
            /**
             * Format: uuid
             * @description Required when `currency` differs from the wallet currency: id of the quote from `POST /me/deposits/quotes` this deposit executes against.
             */
            quote_id?: string | null;
        };
        /**
         * @example {
         *       "content_type": "image/webp",
         *       "image_base64": "UklGRiQAAABXRUJQ...",
         *       "name": "Midnight"
         *     }
         */
        CreateDesignBody: {
            /** @description Who may pick this design: `product` (only where a product offers it, the default) or `all` (on every product). */
            availability?: string | null;
            /** @description MIME type of the upload: `image/webp`. Required with `image_base64`. */
            content_type?: string | null;
            /** @description MIME type of the back upload: `image/webp`. Defaults to `content_type`. */
            content_type_back?: string | null;
            /** @description The front of the card, base64 WebP. Up to 512 KiB; 1586×1000 (the proportions of a card) looks best, and an animated WebP is fine. */
            image_base64?: string | null;
            /** @description The back of the card, base64 WebP. Optional: a one-sided design shows its front wherever the back would go. */
            image_base64_back?: string | null;
            /** @description Instead of an upload: an absolute `https://` URL of the image you host yourself. */
            image_url?: string | null;
            /** @description The back of the card at an `https://` URL of your own, next to `image_url`. */
            image_url_back?: string | null;
            /** @description Shown to operators and users when they pick a design. */
            name: string;
        };
        CreateEndpointBody: {
            /** @description Event types to deliver, e.g. `payment.succeeded`. Empty or omitted means every event. */
            event_filter?: string[];
            /** @description Name to tell endpoints apart. */
            label: string;
            /** @description HTTPS URL that receives the deliveries. */
            url: string;
        };
        CreateKeyBody: {
            /** @description Optional label. Defaults to "default". */
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
            /** @description Currency the organization is billed in, ISO 4217 code. */
            billing_currency: string;
            /** @description Registered legal name. */
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
             * @description Amount the user will pay, decimal string, in `currency`.
             * @example 5000.00
             */
            amount: string;
            /** @description ISO 4217 code of the currency paid; must differ from the wallet currency. */
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
             * @description Amount to refund, decimal string. Omit to refund the full confirmed amount.
             * @example 100.00
             */
            amount?: string | null;
            /** @description Provider-specific extras passed through to the connector. */
            metadata?: {
                [key: string]: string;
            };
            /** @description Free-text reason for the refund. */
            reason?: string;
        };
        CreateUserBody: {
            /** @description Login email. Must be unique. */
            email: string;
            /** @description Role within the organization. */
            role: components["schemas"]["OrganizationRole"];
        };
        CreateWebhookBody: {
            /**
             * @description Event patterns to deliver: exact types like `card.created`, prefixes
             *     like `card.*`, or `*`. Empty means all events.
             */
            event_filter?: string[];
            /** @description Your own label for the endpoint. */
            label: string;
            /** @description URL that will receive the events. */
            url: string;
        };
        /**
         * @example {
         *       "email": "alice@example.com",
         *       "password": "Correct-Horse-Battery-9"
         *     }
         */
        Credentials: {
            /** @description Account email address. */
            email: string;
            /** @description Account password. */
            password: string;
            /** @description Optional wallet currency for a new account, ISO 4217; must be one this deployment offers. Defaults to the deployment currency. Ignored on login. */
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
        /**
         * @description Customer details attached to a payment, deposit or card. Which fields are
         *     required depends on the provider; a missing required field fails the request.
         */
        CustomerInfo: {
            billing_address?: null | components["schemas"]["Address"];
            /**
             * @description Date of birth, `YYYY-MM-DD`. Some card providers require it for
             *     cardholder records.
             */
            birth_date?: string | null;
            email?: string | null;
            first_name?: string | null;
            last_name?: string | null;
            /** @description E.164 format, e.g. "+48...". Free text is accepted. */
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
        /** @description A settlement cycle: one payout window for a merchant. */
        Cycle: {
            /**
             * @description Signed link for operators to download the payout document (wire
             *     instructions and the like). Null for methods that pay out automatically.
             */
            artifact_url?: string | null;
            /**
             * Format: date-time
             * @description When the cycle became `completed`.
             */
            completed_at?: string | null;
            /**
             * Format: uuid
             * @description Operator who marked the cycle completed.
             */
            completed_by?: string | null;
            /**
             * Format: date-time
             * @description When the cycle was created.
             */
            created_at: string;
            /** @description ISO 4217 settlement currency, fixed when the cycle opens. */
            currency: string;
            /** @description Why the cycle failed, when status is `failed`. */
            failure_reason?: string | null;
            /**
             * @description Platform fee deducted from the gross amount, decimal string.
             * @example 25.00
             */
            fee_amount: string;
            /**
             * @description Sum of cleared payments in the window, decimal string.
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
             * @description The merchant being paid.
             */
            merchant_id: string;
            /**
             * @description What the merchant receives: gross minus fee, decimal string.
             * @example 975.00
             */
            net_amount: string;
            /** @description Identifier of the settlement connector the payout was dispatched to, if any. */
            outband_slug?: string | null;
            /**
             * Format: date-time
             * @description End of the payout window; set when the cycle closes.
             */
            period_end?: string | null;
            /**
             * Format: date-time
             * @description Start of the payout window.
             */
            period_start: string;
            /**
             * Format: date-time
             * @description When the cycle became `posted`.
             */
            posted_at?: string | null;
            /** @description Settlement method, fixed when the cycle opens. */
            settlement_method: string;
            /** @description Current status. */
            status: components["schemas"]["CycleStatus"];
            /**
             * Format: date-time
             * @description When the cycle last changed.
             */
            updated_at: string;
        };
        /**
         * @description Where a settlement cycle is in its lifecycle.
         * @enum {string}
         */
        CycleStatus: "open" | "freezing" | "posted" | "completed" | "failed";
        DayBucket: {
            /**
             * Format: int64
             * @description Number of transactions that day.
             */
            count: number;
            /**
             * Format: date-time
             * @description Start of the day, UTC.
             */
            day: string;
            /** @description Total spend that day, decimal string. */
            spend: string;
        };
        DebitBody: {
            /**
             * @description Amount to lower the card's spending limit by, decimal string.
             * @example 10.00
             */
            amount: string;
            /** @description ISO 4217 code, e.g. `USD`. Must match the card's currency. */
            currency: string;
            /**
             * Format: uuid
             * @description UUID chosen by the caller, kept the same across retries. A repeat call with the same key does not debit twice.
             */
            idempotency_key: string;
            /** @description Extra key-value pairs passed to the provider. */
            metadata?: {
                [key: string]: string;
            };
        };
        /**
         * @description How the user funds the deposit.
         * @enum {string}
         */
        DepositMethod: "card" | "crypto" | "bank_transfer";
        /** @description A design as clients see it on a product or a card. */
        DesignRef: {
            /**
             * Format: uuid
             * @description Design id; null for the deployment's default design.
             */
            id?: string | null;
            /** @description Where to load the image: an absolute URL, or `/card-designs/default.svg` relative to the API origin. */
            image_url: string;
            /** @description The back of the card, when the design has one; null when it is one-sided. */
            image_url_back?: string | null;
            /** @description Display name. */
            name: string;
        };
        /** @description A card design. */
        DesignView: {
            /** @description `product` — only where a product offers it; `all` — on every product. */
            availability: string;
            /** @description MIME type of an uploaded image; null for URL designs. */
            content_type?: string | null;
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            /** @description Where the image is served from. */
            image_url: string;
            /** @description The back of the card, when the design has one. */
            image_url_back?: string | null;
            name: string;
            /** @description `upload` (kept in this deployment's file storage) or `url`. */
            source: string;
            /** @description `active` or `disabled`. Disabled designs stay on the cards that use them but can't be picked any more. */
            status: string;
            /** Format: date-time */
            updated_at: string;
        };
        /** @description A device that can receive push notifications, or a Mini App marker. */
        DeviceView: {
            app_version?: string | null;
            /** Format: date-time */
            created_at: string;
            /**
             * Format: date-time
             * @description Set when the device no longer receives anything.
             */
            disabled_at?: string | null;
            /** @description `gone` (the push service dropped it), `user` or `operator`. */
            disabled_reason?: string | null;
            /** Format: uuid */
            id: string;
            /** @description True for the device registered from the current session. Absent in operator views. */
            is_current?: boolean | null;
            /** @description `webpush`, `fcm`, `apns` or `telegram_miniapp`. */
            kind: string;
            /** @description Free text from the client, e.g. "Chrome on Android". */
            label?: string | null;
            /** Format: date-time */
            last_seen_at: string;
            locale?: string | null;
            /** @description `pwa`, `web`, `ios`, `android` or `telegram`. */
            platform: string;
        };
        DisabledDesign: {
            /** Format: uuid */
            id: string;
            /** @description Always `disabled`. */
            status: string;
        };
        /**
         * @description Lifecycle of a webhook endpoint. `archived` is soft-delete; the row
         *     stays for audit but no new outbox materialisation references it.
         * @enum {string}
         */
        EndpointStatus: "active" | "disabled" | "archived";
        EndpointWithSecret: {
            /** @description The endpoint. */
            endpoint: components["schemas"]["WebhookEndpoint"];
            /** @description Plaintext secret used to sign deliveries. Shown only once, at creation or rotation. */
            signing_secret: string;
        };
        FreezeBody: {
            /** @description Why the card is frozen. Stored on the card. May be empty. */
            reason?: string;
        };
        FxProbeResult: {
            /** @description Currency converted into, ISO 4217 code. */
            dst: string;
            /** @description Provider that answered. */
            provider: string;
            /**
             * @description Rate as returned by the provider, before any spread. Decimal string.
             * @example 0.0125
             */
            rate: string;
            /** @description Currency converted from, ISO 4217 code. */
            src: string;
        };
        FxProvidersView: {
            /** @description The provider currently in use. */
            active: string;
            /**
             * @description Every name accepted by the `rates.fx_provider` setting: the built-in
             *     providers plus any defined in `rates.custom`.
             */
            available: string[];
            /** @description The wallet currency every quote converts into, ISO 4217 code. */
            local_currency: string;
        };
        GroupSpend: {
            /**
             * Format: int64
             * @description Number of transactions in the group.
             */
            count: number;
            /** @description Group label: a connector slug, a funding mode or a merchant name, depending on the list. */
            key?: string | null;
            /** @description Total spend in the group, decimal string. */
            spend: string;
        };
        Health: {
            /** @description Always `ok`. */
            status: string;
            /** @description Version of the running API build. */
            version: string;
        };
        ImageView: components["schemas"]["BlogImageMeta"] & {
            /** @description Public URL to use in post bodies. */
            url: string;
        };
        /** @description One notification as the user sees it. */
        InboxItem: {
            body: string;
            /** @description `money`, `card`, `security`, `account` or `marketing`. */
            category: string;
            /** Format: date-time */
            created_at: string;
            /** @description The event's fields, for apps that render their own wording. */
            data: Record<string, never>;
            event_type: string;
            /** @description Where the app should go when the item is opened, e.g. `/cards/<id>`; null when nowhere in particular. */
            href?: string | null;
            /** Format: uuid */
            id: string;
            locale: string;
            /**
             * Format: date-time
             * @description When the user read it; null while unread.
             */
            read_at?: string | null;
            title: string;
        };
        /** @description A page of the inbox. */
        InboxPage: {
            items: components["schemas"]["InboxItem"][];
            /** @description Pass as `cursor` for the next page; null on the last one. */
            next_cursor?: string | null;
            /**
             * Format: int64
             * @description Unread items across the whole inbox, not just this page.
             */
            unread_count: number;
        };
        InviteBody: {
            /** @description Member's email. A holder account is created if the email is new. */
            email: string;
            /** @description Optional. */
            full_name?: string | null;
        };
        IssuingMetrics: {
            /**
             * Format: int64
             * @description Number of distinct cards with at least one transaction in the window.
             */
            active_cards: number;
            /** @description Spend per card connector, highest first. */
            by_connector: components["schemas"]["GroupSpend"][];
            /** @description Spend per card funding mode, highest first. */
            by_plan: components["schemas"]["GroupSpend"][];
            /** @description Transaction counts per status. */
            by_status: components["schemas"]["StatusCount"][];
            /** @description Currency filter that was applied, if any. */
            currency?: string | null;
            /** @description Spend and count per day, oldest first. */
            daily: components["schemas"]["DayBucket"][];
            /**
             * Format: int64
             * @description Number of declined transactions in the window.
             */
            declined_count: number;
            /** @description Total spend in the window, excluding declined transactions. Decimal string. */
            spend: string;
            /** @description The ten merchants with the highest spend. */
            top_merchants: components["schemas"]["GroupSpend"][];
            /**
             * Format: int64
             * @description Total transactions in the window, including declined.
             */
            txn_count: number;
            /**
             * Format: int64
             * @description Length of the window in days.
             */
            window_days: number;
        };
        /** @description Optional reason for freezing or terminating a card. */
        LifecycleReasonBody: {
            /** @description Free-text reason, kept in the audit log. */
            reason?: string | null;
        };
        LoginRequest: {
            /** @description Email address of the organization user. */
            email: string;
            /**
             * Format: uuid
             * @description Optional. Needed when the email belongs to more than one organization;
             *     login returns 409 in that case.
             */
            organization_id?: string | null;
            password: string;
        };
        LoginResponse: {
            /** @description Bearer token for the `Authorization` header. */
            access_token: string;
            /**
             * Format: date-time
             * @description When the token expires, UTC.
             */
            expires_at: string;
            /** @description `true` when this user may open the operator console. The token is valid for client apps either way. */
            hub_access?: boolean;
            /** @enum {string} */
            stage: "jwt";
            /** @description The signed-in user. The password hash is never included. */
            user: unknown;
        } | {
            /**
             * Format: date-time
             * @description When the challenge expires, UTC.
             */
            challenge_expires_at: string;
            /** @description Token to send back with the code. */
            challenge_token: string;
            /** @description `otpauth://` URL to render as a QR code. */
            otpauth_url: string;
            /** @description The authenticator secret in base32, for manual entry. */
            secret_base32: string;
            /** @enum {string} */
            stage: "totp_setup_required";
        } | {
            /** @description Second-factor methods this user can use on this deployment. Offer a picker when there are two or more. */
            available_methods?: components["schemas"]["AvailableMethod"][];
            /**
             * Format: date-time
             * @description When the challenge expires, UTC.
             */
            challenge_expires_at: string;
            /** @description Token to send back with the code. */
            challenge_token: string;
            /** @enum {string} */
            stage: "totp_required";
        };
        MarkFailedBody: {
            /** @description Why the settlement failed, in plain words. Stored on the cycle and in the audit log. */
            reason: string;
        };
        MarkedCount: {
            /** Format: int64 */
            marked: number;
        };
        /**
         * @example {
         *       "init_data": "query_id=AAH...&user=%7B%22id%22%3A777000%7D&auth_date=1700000000&hash=abcdef..."
         *     }
         */
        MeLinkTelegramBody: {
            /** @description Raw `window.Telegram.WebApp.initData` of the Mini App session to attach. */
            init_data: string;
        };
        /** @description A person on the organization's roster. */
        MemberView: {
            /**
             * Format: date-time
             * @description When the member was added.
             */
            created_at: string;
            email: string;
            full_name?: string | null;
            /** Format: uuid */
            id: string;
            /** @description Roster status; `active` for listed members. */
            status: string;
            /**
             * Format: uuid
             * @description ID of the member's holder account; cards are issued to this user.
             */
            user_id: string;
        };
        /** @description A merchant business. */
        Merchant: {
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            legal_name: string;
            /** @description ISO 4217 code that settlements are paid in. */
            settlement_currency: string;
            /** @description `active`, `suspended` or `closed`. */
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
         * @description An API key for server-to-server calls. The secret is returned only once,
         *     when the key is created.
         */
        MerchantApiKey: {
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            /** @description Public part of the key, sent as `X-Merchant-Key`. */
            key: string;
            /**
             * Format: date-time
             * @description Last time the key authenticated a request.
             */
            last_used_at?: string | null;
            /** Format: uuid */
            merchant_id: string;
            /**
             * Format: uuid
             * @description The shop this key belongs to. Every key is tied to exactly one shop.
             */
            shop_id: string;
            /** @description `active` or `revoked`. */
            status: components["schemas"]["MerchantApiKeyStatus"];
            /** Format: date-time */
            updated_at: string;
        };
        /** @enum {string} */
        MerchantApiKeyStatus: "active" | "revoked";
        /**
         * @description Access level of a merchant user.
         * @enum {string}
         */
        MerchantRole: "admin" | "member" | "viewer";
        /** @enum {string} */
        MerchantStatus: "active" | "suspended" | "closed";
        /** @description A user account belonging to a merchant. */
        MerchantUser: {
            /** Format: date-time */
            created_at: string;
            email: string;
            /** Format: uuid */
            id: string;
            /** @description Inactive users cannot log in. */
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
            /** @description ISO 4217 code of the balance to convert. Must differ from the wallet currency. */
            source_currency: string;
        };
        MigrateWalletResult: {
            /**
             * @description Amount credited to the wallet after spread, decimal string.
             * @example 62.50
             */
            credited_amount: string;
            /** @description Wallet currency it was converted into, ISO 4217 code. */
            local_currency: string;
            /** @description Rate provider that supplied the rate. */
            provider: string;
            /**
             * @description Exchange rate used, before spread. Decimal string.
             * @example 0.0125
             */
            rate: string;
            /**
             * @description Amount that was converted, decimal string.
             * @example 5000.00
             */
            source_amount: string;
            /** @description Currency it was converted from, ISO 4217 code. */
            source_currency: string;
            /**
             * Format: int64
             * @description Spread applied, in basis points (100 = 1%).
             */
            spread_bps: number;
            /**
             * Format: uuid
             * @description User UUID.
             */
            user_id: string;
        };
        MintKeyBody: {
            /** @description Free-text label to tell keys apart. Defaults to "default". */
            label?: string | null;
        };
        MintKeyResponse: {
            /**
             * Format: uuid
             * @description Key UUID.
             */
            id: string;
            /** @description Public key identifier, sent as `X-Organization-Key`. */
            key: string;
            /** @description Label given at creation. */
            label: string;
            /** @description Plaintext secret, sent as `X-Organization-Secret`. Shown only once. */
            secret: string;
        };
        /** @description Fields for adding a bank account. */
        NewBankAccount: {
            account_number?: string;
            /** @description ISO 3166-1 alpha-2 country of the bank. */
            bank_country?: string;
            bank_name?: string;
            /** @description ISO 4217 code. Omit or send null for an account usable with any currency. */
            currency?: string | null;
            /** @description Name of the account holder. */
            holder_name: string;
            iban?: string;
            /** @description Your own label for the account. */
            label: string;
            routing_number?: string;
            swift_bic?: string;
        };
        /**
         * @description A newly created API key together with its secret. The secret is stored
         *     hashed, so this response is the only place it appears in plain text.
         */
        NewMerchantApiKey: {
            api_key: components["schemas"]["MerchantApiKey"];
            /**
             * @description Plain-text secret, shown only in this response. Store it now; it cannot
             *     be retrieved later.
             */
            secret: string;
        };
        /** @description A newly created merchant user with a one-time temporary password. */
        NewMerchantUser: {
            /**
             * @description Temporary password in plain text, shown only in this response. Hand it
             *     to the user out of band; they should change it after their first login.
             */
            temporary_password: string;
            user: components["schemas"]["MerchantUser"];
        };
        /** @description Fields for creating a post. */
        NewPost: {
            /** @description Post body in Markdown. */
            body_markdown?: string;
            /**
             * Format: uuid
             * @description ID of an uploaded image to use as the cover.
             */
            cover_image_id?: string | null;
            /** @description Optional teaser. Derived from the body when empty. */
            excerpt?: string;
            /** @description Language tag such as `en`. */
            locale?: string;
            /** @description Lowercase kebab-case. Generated from the title when omitted. */
            slug?: string | null;
            tags?: string[];
            title: string;
        };
        /** @description Fields for creating a role. */
        NewRole: {
            /** @description Free-text description. */
            description?: string;
            /** @description Unique role name. */
            name: string;
            /** @description Permission keys to grant. Each must exist in the permission catalogue. */
            permissions?: string[];
        };
        /** @description Fields for creating a shop. */
        NewShop: {
            /** @description Optional CSS colour value used as the shop's accent. */
            brand_color?: string | null;
            /** @description Optional ISO 4217 code used as the default display currency. */
            currency_hint?: string | null;
            /** @description Display name. */
            name: string;
        };
        NewTierBody: {
            /** @description Currency of the fee, ISO 4217 code. */
            currency: string;
            /**
             * Format: int32
             * @description Discount on deposit fees, in basis points (100 = 1%). Default 0.
             */
            funding_discount_bps?: number;
            /**
             * Format: int32
             * @description Days a subscriber keeps the tier after a failed monthly charge. Default 0.
             */
            grace_window_days?: number;
            /**
             * Format: int32
             * @description Discount on card issuance fees, in basis points (100 = 1%). Default 0.
             */
            issuance_discount_bps?: number;
            /** @description Fee charged every month, decimal string, e.g. "9.99". */
            monthly_fee: string;
            /** @description Tier name shown to users. */
            name: string;
            /**
             * Format: int32
             * @description Free trial length in days before the first charge. Default 0.
             */
            tryout_window_days?: number;
        };
        NewUserView: {
            /** @description Temporary password, shown only once. Pass it to the person out of band. */
            temporary_password: string;
            /** @description The created user. */
            user: components["schemas"]["OrgUserView"];
        };
        OpenCycleBody: {
            /**
             * Format: uuid
             * @description Merchant to open the cycle for.
             */
            merchant_id: string;
            /**
             * Format: date-time
             * @description Start of the settlement period. Defaults to the end of the merchant's previous cycle, or now if there is none.
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
            /** @description Who asked for the refund: the user's email or the merchant's legal name. Null if that account was deleted. */
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
             * @description When the process started, UTC.
             */
            started_at: string;
            /** @description Support email address, when the deployment has one. */
            support_email?: string | null;
            /** @description Support page URL, when the deployment has one. */
            support_url?: string | null;
            /**
             * Format: int64
             * @description Seconds since the process started.
             */
            uptime_seconds: number;
            /** @description Version of the running API build. */
            version: string;
        };
        /** @description A card issued by this organization. */
        OrgCardView: {
            /** @description Card product type. */
            card_type: components["schemas"]["CardType"];
            /** Format: date-time */
            created_at: string;
            /** @description ISO 4217 code of the card balance. */
            currency: string;
            /**
             * Format: int32
             * @description Expiry month, 1 to 12.
             */
            expiry_month?: number | null;
            /**
             * Format: int32
             * @description Expiry year, four digits.
             */
            expiry_year?: number | null;
            /** @description Why issuance failed, when status is `failed`. */
            failure_reason?: string | null;
            /**
             * Format: uuid
             * @description ID of the end user the card was issued to.
             */
            holder_user_id: string;
            /** Format: uuid */
            id: string;
            /** @description Amount loaded at issuance, decimal string. */
            initial_amount?: string | null;
            /** @description Last four digits of the card number, once known. */
            last4?: string | null;
            /** @description Name shown to the holder, or null. */
            name?: string | null;
            /** @description Current lifecycle status. */
            status: components["schemas"]["CardStatus"];
            /** Format: date-time */
            updated_at: string;
        };
        /** @description The organization behind the current credentials. */
        OrgInfo: {
            /** @description ISO 4217 code of the prepay balance. */
            billing_currency: string;
            /** Format: uuid */
            id: string;
            /** @description Legal name of the organization. */
            legal_name: string;
            /** @description Current prepay balance as a decimal string. */
            prepay_balance: string;
            /** @description `active`, `suspended` or `closed`. */
            status: string;
        };
        /** @description An organization user's profile. */
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
            /** @description Legal name of the organization this user belongs to. */
            organization_name: string;
            role: components["schemas"]["OrganizationRole"];
            /**
             * @description Always `"organization_user"`. Tells this login apart from a merchant
             *     user login in clients that support both.
             */
            user_type: string;
        };
        OrgUserView: {
            /**
             * Format: date-time
             * @description When the user was created.
             */
            created_at: string;
            /** @description Login email. */
            email: string;
            /**
             * Format: uuid
             * @description User UUID.
             */
            id: string;
            /** @description False when the user has been deactivated. */
            is_active: boolean;
            /**
             * Format: uuid
             * @description Organization the user belongs to.
             */
            organization_id: string;
            /** @description Role within the organization. */
            role: components["schemas"]["OrganizationRole"];
        };
        OrgView: {
            /** @description Currency the organization is billed in, ISO 4217 code. */
            billing_currency: string;
            /**
             * Format: date-time
             * @description When the organization was created.
             */
            created_at: string;
            /**
             * Format: uuid
             * @description Organization UUID.
             */
            id: string;
            /** @description Registered legal name. */
            legal_name: string;
            /** @description Current prepaid balance in the billing currency, decimal string. */
            prepay_balance: string;
            /** @description `active`, `suspended` or `closed`. */
            status: components["schemas"]["OrganizationStatus"];
            /**
             * Format: date-time
             * @description When the organization was last changed.
             */
            updated_at: string;
        };
        /**
         * @description Issuance fee charged to an organization for one card type. When no pricing
         *     exists for a card type, issuing that type is free.
         */
        OrganizationCardPricing: {
            /** @description `credit`, `prepaid` or `gift`. */
            card_type: string;
            /** Format: date-time */
            created_at: string;
            /** @description ISO 4217 code of the fee. */
            currency: string;
            /** @description Optional label for the fee, as shown on statements. */
            fee_label?: string | null;
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            organization_id: string;
            /**
             * @description Fee per card, decimal string.
             * @example 5.00
             */
            sell_price: string;
            /** Format: date-time */
            updated_at: string;
        };
        /**
         * @description Access level of an organization user.
         * @enum {string}
         */
        OrganizationRole: "admin" | "member" | "viewer";
        /** @enum {string} */
        OrganizationStatus: "active" | "suspended" | "closed";
        OrphanRow: {
            /** @description Slug of the card connector that issued the card. */
            connector_slug: string;
            /**
             * Format: date-time
             * @description When the card was created.
             */
            created_at: string;
            /** @description ISO 4217 code. */
            currency: string;
            /** @description Why the issuance was marked failed. */
            failure_reason?: string | null;
            /** @description How the provider funds the card: `shared` or `standard`, if known. */
            funding_mode?: string | null;
            /**
             * Format: uuid
             * @description Card UUID.
             */
            id: string;
            /**
             * @description Amount that was meant to be loaded, decimal string.
             * @example 10.00
             */
            initial_amount?: string | null;
            /** @description Last four digits of the card number. */
            last4?: string | null;
            /** @description Card id on the provider's side. */
            provider_reference?: string | null;
            /** @description Owner's login email. */
            user_email: string;
            /**
             * Format: uuid
             * @description Owner's user UUID.
             */
            user_id: string;
        };
        OtpVerifyBody: {
            /** @description The `challenge_token` from the `POST /auth/login/2fa/switch` response. */
            challenge_token: string;
            /** @description The 6-digit code the user received. */
            code: string;
        };
        /**
         * @example {
         *       "design_id": null,
         *       "name": "Groceries"
         *     }
         */
        PatchCardBody: {
            /**
             * Format: uuid
             * @description Design to show; `null` picks the product's default. Omit to keep the current one.
             */
            design_id?: string | null;
            /** @description New name, 1–40 characters. Omit to keep the current one. */
            name?: string | null;
        };
        PatchConfigurationKeyBody: {
            /** @description New plaintext value, up to 8 KiB. */
            value: string;
        };
        PatchConnectorBody: {
            /** @description New URL to call the connector on. Must start with `http://` or `https://`. */
            grpc_url?: string | null;
            /** @description `active` or `disabled`. */
            status?: string | null;
        };
        PatchDesignBody: {
            /** @description `product` (only where a product offers it) or `all` (on every product). */
            availability?: string | null;
            name?: string | null;
            /** @description `active` or `disabled`. */
            status?: string | null;
        };
        PatchDeviceBody: {
            /** @description Only `true` is accepted: the device stops receiving anything. The user re-enables it by turning notifications on again in the app. */
            disabled: boolean;
        };
        PatchOrgBody: {
            /** @description New status: `active`, `suspended` or `closed`. */
            status: components["schemas"]["OrganizationStatus"];
        };
        /**
         * @description What users see for one card program. Every field is optional; omitted
         *     fields keep their value.
         */
        PatchProgramBody: {
            /** @description Designs a user may pick besides the default. Replaces the list. */
            allowed_design_ids?: string[] | null;
            /** @description Description shown to users. Empty clears it. */
            description?: string | null;
            /**
             * Format: uuid
             * @description Default design; send `null` for the deployment's default design.
             */
            design_id?: string | null;
            /** @description Name shown to users. Empty clears it (the provider label is shown then). */
            display_name?: string | null;
            /** @description Properties shown to users. Replaces the object. */
            features?: Record<string, never> | null;
            /** @description Show the program in the user catalog. */
            visible_to_users?: boolean | null;
        };
        PatchRoleBody: {
            /** @description Name of an existing role. */
            role: string;
        };
        PatchTierBody: {
            /** @description New fee currency, ISO 4217 code. */
            currency?: string | null;
            /**
             * Format: int32
             * @description Discount on deposit fees, in basis points.
             */
            funding_discount_bps?: number | null;
            /**
             * Format: int32
             * @description Days a subscriber keeps the tier after a failed monthly charge.
             */
            grace_window_days?: number | null;
            /**
             * Format: int32
             * @description Discount on card issuance fees, in basis points.
             */
            issuance_discount_bps?: number | null;
            /** @description New monthly fee, decimal string. */
            monthly_fee?: string | null;
            /** @description New tier name. */
            name?: string | null;
            /** @description `active` or `disabled`. */
            status?: string | null;
            /**
             * Format: int32
             * @description Free trial length in days.
             */
            tryout_window_days?: number | null;
        };
        PayrollBody: {
            /** @description ISO 4217 code used for every run in the batch. */
            currency: string;
            /** @description One entry per member to pay. */
            runs: components["schemas"]["PayrollRun"][];
        };
        /** @description Outcome of one payroll run. */
        PayrollResult: {
            /** @description Requested amount, decimal string. */
            amount: string;
            /**
             * Format: uuid
             * @description ID of the issued card, when successful.
             */
            card_id?: string | null;
            /** @description Member's email; empty when the member was not found. */
            email: string;
            /** @description Why the run failed, when status is `failed`. */
            error?: string | null;
            /** Format: uuid */
            member_id: string;
            /** @description `active` when the card was issued, otherwise `failed`. */
            status: string;
        };
        PayrollRun: {
            /** @description Amount to load on the member's card, decimal string. */
            amount: string;
            /**
             * Format: uuid
             * @description Roster member to pay.
             */
            member_id: string;
        };
        PermissionEntry: {
            /** @description Permission key, e.g. `merchants.read`. */
            key: string;
        };
        PostList: {
            /**
             * Format: int64
             * @description 1-based page number.
             */
            page: number;
            /**
             * Format: int64
             * @description Posts per page.
             */
            per_page: number;
            /** @description Posts on this page, newest first. */
            posts: components["schemas"]["PublicPost"][];
            /**
             * Format: int64
             * @description Total number of published posts matching the filters.
             */
            total: number;
        };
        /**
         * @description Fields to change on a post. Anything omitted stays as it is. Changing the
         *     title, excerpt, body, cover or tags increases `content_version`, which
         *     makes the post eligible for another broadcast.
         */
        PostUpdate: {
            body_markdown?: string | null;
            /** Format: uuid */
            cover_image_id?: string | null;
            excerpt?: string | null;
            locale?: string | null;
            slug?: string | null;
            /**
             * @description `draft`, `published` or `archived`. `published_at` is set the first
             *     time a post is published.
             */
            status?: string | null;
            tags?: string[] | null;
            title?: string | null;
        };
        PreferencesBody: {
            /** @description Replaces the switches. `security` and `money` keep at least one outward channel whatever is sent. */
            categories?: Record<string, never> | null;
            /** @description `en`, `ru` or null for the deployment default. Omit to keep. */
            locale?: string | null;
            /** @description `push`, `telegram`, `email`, `sms` or null for automatic. Omit to keep. */
            primary_channel?: string | null;
        };
        /** @description How and where a user wants to be told. */
        PreferencesView: {
            /** @description Channels this deployment can deliver on right now. */
            available_channels: string[];
            /** @description Per-category switches: `{"marketing": {"push": false, "email": true}}`. A missing switch means on, except for `marketing`, which is opt-in. */
            categories: Record<string, never>;
            /** @description Language of notifications, `en` or `ru`; null = the deployment's default. */
            locale?: string | null;
            /** @description Channel to use first when it can reach the user; null = automatic (a mobile app, else the device used most recently). */
            primary_channel?: string | null;
        };
        /** @description What issuing a card on this product costs the user right now. */
        ProductPrice: {
            /** @description What the user pays, decimal string, after their subscription discount. */
            amount: string;
            /** @description The list price before the discount, decimal string. */
            base_amount: string;
            /** @description ISO 4217 code of the price. */
            currency: string;
            /**
             * Format: int32
             * @description Discount applied, in basis points (1000 = 10%).
             */
            discount_bps: number;
            /** @description Wording for the fee line, e.g. "Card issuance". */
            label: string;
        };
        /** @description The product a card was issued on. */
        ProductRef: {
            /** Format: uuid */
            id: string;
            name: string;
        };
        /**
         * @description One card program offered by a card connector, with the operator-set
         *     pricing. Pass `program_code` as `program_id` when creating a card.
         */
        ProgramView: {
            /** @description Other designs a user may pick. */
            allowed_design_ids: string[];
            /** @description Card BIN, if the provider reports one. */
            bin?: string | null;
            /** @description Card type: `credit`, `prepaid` or `gift`. */
            card_type: string;
            /** @description What the provider charges per card, decimal string, e.g. "2.00". */
            cost_price?: string | null;
            /** @description Card currency, ISO 4217 code, if the program is single-currency. */
            currency?: string | null;
            /** @description Description shown to users. */
            description?: string | null;
            /**
             * Format: uuid
             * @description Default design; null = the deployment's default design.
             */
            design_id?: string | null;
            /** @description Name shown to users; null falls back to `label`. */
            display_name?: string | null;
            /** @description Free-form properties shown to users, e.g. `{"scheme": "mastercard", "apple_pay": true}`. */
            features: Record<string, never>;
            /** @description Label shown next to the fee in the client app. */
            fee_label?: string | null;
            /**
             * Format: uuid
             * @description Product id users see in `GET /me/card-products` and send as `product_id`.
             */
            id: string;
            /** @description Human-readable program name. */
            label: string;
            /**
             * Format: int32
             * @description Order in which programs are tried within this connector. Lower comes first.
             */
            priority: number;
            /** @description Program id as advertised by the card provider. */
            program_code: string;
            /** @description What the user pays per card, decimal string, e.g. "5.00". */
            sell_price?: string | null;
            /** @description `active` or `disabled`. */
            status: string;
            /** @description False keeps the program for operator and business issuance only. */
            visible_to_users: boolean;
        };
        /**
         * @description A published post as the client app receives it. The body comes both as
         *     Markdown and as a flat list of blocks, so the client can render it with
         *     its own components.
         */
        PublicPost: {
            /** @description The body as a flat list of blocks; the recommended input for rendering. */
            body_blocks: components["schemas"]["Block"][];
            /** @description Raw Markdown, for clients that bring their own renderer. */
            body_markdown: string;
            /** @description Path of the cover image, when set. */
            cover_url?: string | null;
            /** @description Short teaser. Derived from the first paragraph when none was written. */
            excerpt: string;
            /** @description Language tag such as `en`, when set; omitted otherwise. */
            locale?: string;
            /**
             * Format: date-time
             * @description When the post was first published.
             */
            published_at?: string | null;
            /**
             * Format: int32
             * @description Estimated reading time in minutes.
             */
            reading_minutes: number;
            /** @description Stable public identifier. Link to posts by slug. */
            slug: string;
            tags: string[];
            title: string;
            /** Format: date-time */
            updated_at: string;
        };
        PushKeys: {
            /** @description `PushSubscription.getKey("auth")`, URL-safe base64. */
            auth: string;
            /** @description `PushSubscription.getKey("p256dh")`, URL-safe base64. */
            p256dh: string;
        };
        /**
         * @example {
         *       "endpoint": "https://fcm.googleapis.com/fcm/send/...",
         *       "keys": {
         *         "auth": "k9...",
         *         "p256dh": "BN..."
         *       }
         *     }
         */
        PushSubscriptionBody: {
            /** @description Push-service URL from `PushSubscription.endpoint`; must be https. */
            endpoint: string;
            /** @description Encryption keys from the same `PushSubscription`. */
            keys: components["schemas"]["PushKeys"];
        };
        PushSubscriptionView: {
            /** @description Host of the stored endpoint, e.g. `fcm.googleapis.com`. The full URL is never returned. */
            endpoint_host?: string | null;
            /** @description `true` when a subscription is stored for this user. */
            subscribed: boolean;
            /** @description VAPID public key to pass as `applicationServerKey` to `pushManager.subscribe`, URL-safe base64. `null` when push is not enabled on this deployment. */
            vapid_public_key?: string | null;
        };
        PutConfigurationBody: {
            /** @description The complete new set of variables. Pass `{}` to remove them all. */
            variables: {
                [key: string]: string;
            };
        };
        PutPricingBody: {
            /** @description Card type the price applies to: `credit`, `prepaid` or `gift`. */
            card_type: string;
            /** @description Currency of the price, ISO 4217 code. */
            currency: string;
            /** @description Label shown next to the fee. */
            fee_label?: string | null;
            /** @description Price charged per card issued, decimal string, e.g. "5.00". */
            sell_price: string;
        };
        /** @description Pricing and availability of one card program. */
        PutProgramPricingBody: {
            /** @description What the provider charges per card, decimal string, e.g. "2.00". Must be 0 or more. */
            cost_price?: string | null;
            /** @description Currency of the prices, ISO 4217 code. Required when `sell_price` is set. */
            currency?: string | null;
            /** @description Label shown next to the fee in the client app. */
            fee_label?: string | null;
            /**
             * Format: int32
             * @description Order in which programs are tried within this connector. Lower comes first.
             */
            priority?: number | null;
            /** @description What the user pays per card, decimal string, e.g. "5.00". Must be 0 or more. */
            sell_price?: string | null;
            /** @description `active` or `disabled`. */
            status?: string | null;
        };
        PutSettingBody: {
            /** @description New value, as a string. Validated against the setting's constraint. */
            value: string;
        };
        /**
         * @description A rate-locked funding quote. Pay `source_amount` in `source_currency` and
         *     the wallet is credited `credited_amount` in `credited_currency`. Execute it
         *     by passing `id` as `quote_id` to `POST /me/deposits` before `expires_at`.
         */
        QuoteView: {
            /**
             * @description Amount the wallet will be credited, net of spread, at the locked rate.
             * @example 57.97
             */
            credited_amount: string;
            /** @description ISO 4217 code of the wallet currency. */
            credited_currency: string;
            /**
             * Format: date-time
             * @description When the quote stops being valid, UTC.
             */
            expires_at: string;
            /**
             * Format: uuid
             * @description Quote id; pass it as `quote_id` when creating the deposit.
             */
            id: string;
            /** @description Name of the rate source. */
            provider: string;
            /**
             * @description Provider rate before spread, credited units per 1 source unit.
             * @example 0.011832
             */
            rate: string;
            /**
             * @description Amount the user pays, decimal string.
             * @example 5000.00
             */
            source_amount: string;
            /** @description ISO 4217 code of the amount paid. */
            source_currency: string;
            /**
             * Format: int64
             * @description Spread applied on top of the provider rate, in basis points.
             */
            spread_bps: number;
        };
        ReadAllBody: {
            /**
             * Format: date-time
             * @description Only items created at or before this moment. Omit for everything.
             */
            before?: string | null;
        };
        Readiness: {
            /** @description Result of each dependency check. */
            checks: components["schemas"]["ReadinessChecks"];
            /** @description Number of configured connectors per role. */
            counts: components["schemas"]["ConnectorCounts"];
            /** @description License state. `mode` is one of `active`, `grace`, `refusing`, `disabled`; `refusing` also carries `reason`. Does not affect the HTTP status of this endpoint. */
            license: Record<string, never>;
            /** @description Support channels and build info, fixed for the lifetime of the process. */
            ops: components["schemas"]["OpsInfoView"];
            /** @description `ready` when every dependency check passed, `degraded` otherwise; the HTTP status is 200 or 503 to match. */
            status: string;
        };
        ReadinessChecks: {
            formance: components["schemas"]["CheckResult"];
            /** @description NATS check. When no message broker is configured this reports `{ ok: true, skipped: true }` rather than a failure. */
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
            /** @description `close` terminates the card at the provider and marks it `terminated`. `adopt` charges the user the unpaid load and marks it `active`. */
            action: string;
        };
        /**
         * @example {
         *       "credential": {
         *         "endpoint": "https://fcm.googleapis.com/fcm/send/...",
         *         "keys": {
         *           "auth": "k9...",
         *           "p256dh": "BN..."
         *         }
         *       },
         *       "kind": "webpush",
         *       "label": "Chrome on Android",
         *       "platform": "pwa"
         *     }
         */
        RegisterDeviceBody: {
            /** @description Version of the app on the device. */
            app_version?: string | null;
            /** @description `webpush`: `{ endpoint, keys: { p256dh, auth } }`; `fcm` / `apns`: `{ token }`; `telegram_miniapp`: `{}`. */
            credential: Record<string, never>;
            /** @description `webpush`, `fcm`, `apns` or `telegram_miniapp`. */
            kind: string;
            /** @description Shown to the user in their device list, e.g. "Chrome on Android". */
            label?: string | null;
            /** @description Language of this device, two letters. */
            locale?: string | null;
            /** @description `pwa`, `web`, `ios`, `android` or `telegram`. */
            platform: string;
        };
        /** @description What a registration answers. */
        RegisteredDevice: {
            /** Format: uuid */
            id: string;
            kind: string;
            platform: string;
            /** @description VAPID public key to subscribe with, for Web Push; null when push is not set up. */
            vapid_public_key?: string | null;
        };
        ReloadBody: {
            /**
             * @description Amount to add, decimal string.
             * @example 25.00
             */
            amount: string;
            /** @description ISO 4217 code, e.g. `EUR`. Must match the card's currency. */
            currency: string;
            /** @description Extra key-value pairs passed to the provider. */
            metadata?: {
                [key: string]: string;
            };
            /**
             * Format: uuid
             * @description UUID chosen by the caller. A repeat call with the same id does not reload twice.
             */
            reload_id: string;
        };
        ResetTotpResult: {
            /** @description True when a two-factor enrolment was removed, false when the user had none. */
            removed: boolean;
            /**
             * Format: uuid
             * @description User UUID.
             */
            user_id: string;
        };
        RevealResponse: {
            /** @description Card security code. */
            cvv: string;
            /**
             * Format: int32
             * @description How long the client should show the details before clearing them, in seconds.
             */
            expires_in_seconds: number;
            /**
             * Format: int32
             * @description Expiry month, 1 to 12.
             */
            expiry_month: number;
            /**
             * Format: int32
             * @description Expiry year.
             */
            expiry_year: number;
            /** @description Name on the card. */
            holder_name: string;
            /** @description Full card number. */
            pan: string;
        };
        RevealedSetting: {
            /** @description True when a value has been set explicitly. */
            is_set: boolean;
            /** @description Dotted setting key. */
            key: string;
            /** @description `plain` or `secret`. */
            kind: string;
            /**
             * Format: date-time
             * @description When the value was last set, if it has been.
             */
            updated_at?: string | null;
            /** @description Full plaintext value, or the default when nothing is set. */
            value?: string | null;
        };
        /** @description An operator role and the permissions it grants. */
        RoleRow: {
            /** Format: date-time */
            created_at: string;
            /** @description Free-text description. */
            description: string;
            /** @description System roles cannot be deleted. */
            is_system: boolean;
            /** @description Unique role name. */
            name: string;
            /** @description Permission keys granted by this role. `*` grants everything. */
            permissions: string[];
            /** Format: date-time */
            updated_at: string;
        };
        /** @description Fields to change on a role. Anything omitted stays as it is. */
        RoleUpdate: {
            description?: string | null;
            /** @description Replaces the full permission list when sent. */
            permissions?: string[] | null;
        };
        RotateConnectorResponse: {
            /** @description The connector after rotation. */
            connector: components["schemas"]["ConnectorView"];
            /** @description New plaintext outbound auth secret. Shown only once. */
            outbound_auth_secret: string;
            /** @description New plaintext webhook signing secret. Shown only once. */
            signing_secret: string;
        };
        RowError: {
            /** @description Email from the failed row. */
            email: string;
            /** @description What went wrong. */
            error: string;
        };
        SessionView: {
            /** @description `true` for the session making this request. */
            current: boolean;
            /**
             * Format: date-time
             * @description When the session expires, UTC.
             */
            expires_at: string;
            /**
             * Format: date-time
             * @description When the session was opened, UTC.
             */
            issued_at: string;
            /**
             * Format: uuid
             * @description Session id; pass it to `DELETE /me/sessions/{jti}` to sign it out.
             */
            jti: string;
            /**
             * Format: date-time
             * @description When the session was last used, UTC.
             */
            last_seen_at: string;
            /** @description Client IP address recorded for the session, if known. */
            remote_ip?: string | null;
            /** @description Browser or client that opened the session, if known. */
            user_agent?: string | null;
        };
        /**
         * @example {
         *       "email": "alice@example.com"
         *     }
         */
        SetEmailBody: {
            /** @description Email address to attach. Trimmed and lower-cased; must not be used by another account. */
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
            /** @description The complete set to keep; this replaces the current one. An empty array unsubscribes from everything. */
            channels: string[];
        };
        /**
         * @example {
         *       "currency": "EUR"
         *     }
         */
        SetWalletBody: {
            /** @description ISO 4217 code, e.g. "EUR". */
            currency: string;
        };
        SetWebhookBody: {
            /** @description HMAC-SHA256 secret used to sign every delivered payload. */
            signing_secret: string;
            /** @description URL that receives webhook deliveries, e.g. `https://acme.example.com/webhooks`. */
            url: string;
        };
        SettingRow: {
            /** @description Human-readable description of the accepted values. */
            constraint: string;
            /** @description Built-in default, or null when there is none. */
            default?: string | null;
            /** @description What the setting controls. */
            description: string;
            /** @description True when a value has been set explicitly rather than falling back to the default. */
            is_set: boolean;
            /** @description Dotted setting key, e.g. `branding.site_url`. */
            key: string;
            /** @description `plain` or `secret`. Secret values are redacted in lists. */
            kind: string;
            /**
             * Format: date-time
             * @description When the value was last set, if it has been.
             */
            updated_at?: string | null;
            /**
             * Format: uuid
             * @description Operator who last set the value, if known.
             */
            updated_by?: string | null;
            /** @description Current value. Redacted for `secret` settings. Null when the setting is neither set nor has a default. */
            value?: string | null;
        };
        /**
         * @description A shop: one brand or storefront under a merchant. API keys and webhook
         *     endpoints are tied to a shop.
         */
        Shop: {
            /**
             * @description Accent colour for this shop in the merchant portal, as a CSS colour
             *     value. Null means the default theme.
             */
            brand_color?: string | null;
            /** Format: date-time */
            created_at: string;
            /**
             * @description ISO 4217 code used as the default display currency in dashboards. It
             *     does not restrict which currencies payments can use.
             */
            currency_hint?: string | null;
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            merchant_id: string;
            /** @description Display name. */
            name: string;
            /** @description `active` or `archived`. */
            status: components["schemas"]["ShopStatus"];
            /** Format: date-time */
            updated_at: string;
        };
        /** @enum {string} */
        ShopStatus: "active" | "archived";
        /** @description Fields to change on a shop. Anything omitted stays as it is. */
        ShopUpdate: {
            /** @description Send null to clear the accent colour; omit to leave it as is. */
            brand_color?: string | null;
            /** @description Send null to clear the display currency; omit to leave it as is. */
            currency_hint?: string | null;
            name?: string | null;
            status?: null | components["schemas"]["ShopStatus"];
        };
        StatBucket: {
            /**
             * @description Sum of the amounts in this bucket, decimal string.
             * @example 1234.50
             */
            amount: string;
            /**
             * Format: int64
             * @description Number of rows in this bucket.
             */
            count: number;
            /** @description ISO 4217 code or crypto asset code. */
            currency: string;
            /** @description Status the rows in this bucket share. */
            status: string;
        };
        StatusCount: {
            /**
             * Format: int64
             * @description Number of transactions with this status.
             */
            count: number;
            /** @description Transaction status. */
            status: string;
        };
        /** @description A subscription plan. */
        SubscriptionTier: {
            /** Format: date-time */
            created_at: string;
            /** @description ISO 4217 code of the fee. */
            currency: string;
            /**
             * Format: int32
             * @description Discount on funding fees, in basis points.
             */
            funding_discount_bps: number;
            /**
             * Format: int32
             * @description Days after a missed payment before the subscription lapses.
             */
            grace_window_days: number;
            /** Format: uuid */
            id: string;
            /**
             * Format: int32
             * @description Discount on card issuance fees, in basis points.
             */
            issuance_discount_bps: number;
            /** @description Monthly fee, decimal string. */
            monthly_fee: string;
            /** @description Display name. */
            name: string;
            /** @description `active` or `disabled`. */
            status: string;
            /**
             * Format: int32
             * @description Free trial length in days.
             */
            tryout_window_days: number;
            /** Format: date-time */
            updated_at: string;
        };
        /** @description Which channels this user agreed to receive announcements on. */
        SubscriptionsView: {
            /** @description Channels this deployment can deliver on right now; only offer these as options. */
            available: string[];
            /** @description Channels the user is subscribed to, e.g. `["email"]`. */
            channels: string[];
        };
        SwitchBody: {
            /** @description The `challenge_token` from the `totp_required` login response. Always send that original token, also when switching again; a token from an earlier switch is not accepted. */
            challenge_token: string;
            /** @description `telegram` or `email`. The method must be listed in `available_methods`. */
            method: string;
        };
        /**
         * @description Response of `POST /auth/login/2fa/switch`, tagged on `stage` like the
         *     other login responses.
         */
        SwitchResponse: {
            /** @description The same `available_methods` as the login response, so the client can offer a switch again. */
            available_methods?: components["schemas"]["AvailableMethod"][];
            /**
             * Format: date-time
             * @description When the challenge expires, UTC.
             */
            challenge_expires_at: string;
            /** @description Token to send back with the code. */
            challenge_token: string;
            /** @description Hint to show under the code input, e.g. where the code was sent. */
            hint: string;
            /** @description The method that was used: `telegram_otp` or `email_otp`. */
            method: string;
            /** @enum {string} */
            stage: "otp_sent";
        };
        /**
         * @example {
         *       "init_data": "query_id=AAH...&user=%7B%22id%22%3A777000%2C%22first_name%22%3A%22Alice%22%7D&auth_date=1700000000&hash=abcdef..."
         *     }
         */
        TelegramExchangeBody: {
            /** @description Raw `window.Telegram.WebApp.initData` string as handed to the Mini App by the Telegram client; verified server-side against the bot token. */
            init_data: string;
            /** @description Create an account for a Telegram id seen for the first time. Defaults to `true`. Send `false` to get `404 telegram_unknown` instead, so the app can offer "create an account" or "I already have one" (`POST /auth/telegram/link`). */
            provision?: boolean;
        };
        /** @description The Telegram account attached to a user, as shown to clients. */
        TelegramLink: {
            /**
             * Format: date-time
             * @description When the Telegram account was attached.
             */
            linked_at: string;
            /** @description Telegram username without the `@`; absent when the account has none. */
            username?: string | null;
        };
        /**
         * @example {
         *       "email": "alice@example.com",
         *       "init_data": "query_id=AAH...&user=%7B%22id%22%3A777000%7D&auth_date=1700000000&hash=abcdef...",
         *       "password": "Correct-Horse-Battery-9"
         *     }
         */
        TelegramLinkBody: {
            /** @description Email of the existing account. */
            email: string;
            /** @description Raw `window.Telegram.WebApp.initData` as handed to the Mini App; verified server-side against the bot token. */
            init_data: string;
            /** @description Password of the existing account. */
            password: string;
        };
        TerminateBody: {
            /**
             * @description Close a card that never reached the issuer (creation pending or failed
             *     before the issuer was called). Without it such a card answers 409
             *     `creation_pending`. Nothing is sent to the issuer and nothing is
             *     refunded: the card was never charged, or was refunded when it failed.
             */
            force?: boolean;
            /** @description Extra key-value pairs passed to the provider, e.g. `{ "reason_code": "LOST_OR_STOLEN" }`. */
            metadata?: {
                [key: string]: string;
            };
            /** @description Why the card is terminated. Stored on the card. May be empty. */
            reason?: string;
        };
        TerminateResult: {
            /**
             * Format: int64
             * @description Number of sessions that were signed out.
             */
            revoked_sessions: number;
        };
        TopupBody: {
            /** @description Amount to add, decimal string, e.g. "500.00". Must be positive. */
            amount: string;
            /** @description ISO 4217 code. Defaults to the organization's billing currency. */
            currency?: string | null;
        };
        /**
         * @example {
         *       "amount": "25.00"
         *     }
         */
        TopupCardBody: {
            /** @description Amount to add to the card, decimal string, in the card's currency. It is taken from the wallet; a wallet held in another currency pays the converted amount, priced at the moment of the call. */
            amount: string;
        };
        /** @description A completed top-up with the state the client needs to redraw. */
        TopupResult: {
            card: components["schemas"]["UserCardView"];
            /** @description The card balance after the top-up, in the card's currency. */
            card_balance: components["schemas"]["BalanceResponse"];
            topup: components["schemas"]["CardTopup"];
            /** @description The wallet balance after the top-up, in the wallet's currency. */
            wallet: components["schemas"]["BalanceResponse"];
        };
        /** @description What a top-up of this card can be right now. */
        TopupTerms: {
            /** @description Whether the card can be topped up at this moment. */
            available: boolean;
            /** @description Currency top-ups are made in: the card's. */
            currency: string;
            max?: null | components["schemas"]["BalanceResponse"];
            min?: null | components["schemas"]["BalanceResponse"];
            /** @description Why not, in plain words, when `available` is false. */
            reason?: string | null;
            /** @description What the wallet holds right now, in the wallet's currency. */
            wallet_available: components["schemas"]["BalanceResponse"];
        };
        TotpStepBody: {
            /** @description The `challenge_token` from the login response. */
            challenge_token: string;
            /** @description 6-digit code from the authenticator app; surrounding whitespace is ignored. */
            code: string;
        };
        TransactionItem: {
            /**
             * @description Amount at the merchant, decimal string.
             * @example 12.50
             */
            amount: string;
            /**
             * Format: date-time
             * @description When the transaction was authorised, if known.
             */
            authorised_at?: string | null;
            /**
             * @description Amount actually charged to the card, decimal string. Differs from `amount` when the purchase currency is not the card currency.
             * @example 6.51
             */
            billing_amount?: string | null;
            /** @description Currency of `billing_amount`, ISO 4217 code. */
            billing_currency?: string | null;
            /** @description The charged amount in USD, decimal string. */
            billing_usd_amount?: string | null;
            /**
             * Format: date-time
             * @description When the transaction cleared, if it has.
             */
            cleared_at?: string | null;
            /** @description Currency of `amount`, ISO 4217 code. */
            currency: string;
            /** @description Why the transaction was declined, when it was. */
            decline_reason?: string | null;
            /** @description Merchant city. */
            merchant_city?: string | null;
            /** @description Merchant country code. */
            merchant_country?: string | null;
            /** @description Merchant category code. */
            merchant_mcc?: string | null;
            /** @description Merchant name as reported by the card network. */
            merchant_name?: string | null;
            /** @description Transaction id on the provider's side. */
            provider_reference: string;
            /** @description Status string exactly as the provider reports it. */
            provider_status?: string | null;
            /**
             * @description `pending`, `cleared`, `reversed`, `declined` or `unknown`. The provider's own value is in `provider_status`.
             * @example cleared
             */
            status: string;
        };
        TransactionsPage: {
            /** @description Pass as `page_token` to get the next page. Empty when there are no more pages. */
            next_page_token: string;
            /** @description Transactions on this page, newest first. */
            transactions: components["schemas"]["TransactionItem"][];
        };
        UnlinkTelegramResult: {
            /** @description True when a Telegram link was removed, false when the user had none. */
            removed: boolean;
            /**
             * Format: uuid
             * @description User UUID.
             */
            user_id: string;
        };
        UnreadCount: {
            /** Format: int64 */
            unread: number;
        };
        UpdateEndpointBody: {
            /** @description New event filter. Empty list means every event. */
            event_filter?: string[] | null;
            /** @description New label. */
            label?: string | null;
            status?: null | components["schemas"]["EndpointStatus"];
            /** @description New delivery URL. */
            url?: string | null;
        };
        /** @description Fields to change on a webhook endpoint. Anything omitted stays as it is. */
        UpdateWebhookBody: {
            /** @description Event patterns to deliver. Empty means all events. */
            event_filter?: string[] | null;
            label?: string | null;
            status?: null | components["schemas"]["EndpointStatus"];
            url?: string | null;
        };
        /**
         * @example {
         *       "content_type": "image/png",
         *       "data_base64": "iVBORw0KGgo...",
         *       "filename": "logo.png"
         *     }
         */
        UploadAssetBody: {
            /** @description `image/png`, `image/webp`, `image/jpeg`, `image/svg+xml` or `image/x-icon`. */
            content_type: string;
            /** @description The file, base64 (a `data:` URL is accepted too). Up to 1 MiB. */
            data_base64: string;
            /** @description Original file name, kept for the audit trail only. */
            filename?: string | null;
        };
        UploadImageBody: {
            /** @description Alternative text, shown by screen readers and when the image fails to load. */
            alt?: string;
            /** @description MIME type: `image/png`, `image/jpeg`, `image/webp`, `image/gif` or `image/svg+xml`. */
            content_type: string;
            /** @description Base64-encoded image bytes. A full `data:` URL is accepted too; the prefix is stripped. */
            data_base64: string;
            /** @description Original file name, optional. */
            filename?: string;
        };
        UploadedAsset: {
            /** @description Permanent public URL of the file. Paste it into a branding setting. */
            url: string;
        };
        UserBalanceResult: {
            /**
             * @description Current wallet balance, decimal string.
             * @example 42.50
             */
            amount: string;
            /** @description ISO 4217 code the balance is in. */
            currency: string;
            /**
             * Format: uuid
             * @description User UUID.
             */
            user_id: string;
        };
        /**
         * @description The card as its holder sees it: the presentation without the operator's
         *     fields. Which connector issued it, its reference there, the program code
         *     and the funding model are deployment internals; the holder gets the
         *     product and the design instead.
         */
        UserCardView: {
            card_type: components["schemas"]["CardType"];
            /** Format: date-time */
            created_at: string;
            currency: string;
            /** @description The design shown for this card. */
            design: components["schemas"]["DesignRef"];
            /** Format: int32 */
            expiry_month?: number | null;
            /** Format: int32 */
            expiry_year?: number | null;
            /** @description Why issuance failed, for a `failed` card. */
            failure_reason?: string | null;
            /** Format: uuid */
            id: string;
            /** @description The amount loaded at issuance, decimal string. */
            initial_amount?: string | null;
            /** @description Last four digits of the card number. */
            last4?: string | null;
            /** @description The name the holder gave the card. */
            name?: string | null;
            product?: null | components["schemas"]["ProductRef"];
            /** @description Gift cards only, returned once on creation. */
            redemption_code?: string | null;
            status: components["schemas"]["CardStatus"];
            /** Format: date-time */
            updated_at: string;
            /** Format: uuid */
            user_id: string;
        };
        UserDetail: {
            /**
             * Format: int64
             * @description Unused two-factor backup codes. Zero when none were generated or after a backup code login.
             */
            backup_codes_remaining: number;
            /**
             * Format: int64
             * @description Number of cards the user has been issued.
             */
            card_count: number;
            /**
             * Format: date-time
             * @description When the account was created.
             */
            created_at: string;
            /**
             * Format: int64
             * @description Number of deposits the user has made.
             */
            deposit_count: number;
            /** @description Login email. */
            email: string;
            /** @description True while the account still holds the placeholder address it was created with from Telegram, before the user added a real email. */
            email_pending: boolean;
            /** @description True when the user can log in with a password. */
            has_password: boolean;
            /**
             * Format: uuid
             * @description User UUID.
             */
            id: string;
            /** @description False when the account has been deactivated. */
            is_active: boolean;
            /** @description Role name. */
            role: string;
            telegram?: null | components["schemas"]["TelegramLink"];
            /** @description True when two-factor authentication is fully set up. Never true together with `totp_pending`. */
            totp_enrolled: boolean;
            /** @description True when the user started two-factor setup but has not confirmed it with a code yet. */
            totp_pending: boolean;
            /**
             * Format: date-time
             * @description When the account was last changed.
             */
            updated_at: string;
        };
        UserRow: {
            /**
             * Format: int64
             * @description Number of cards the user has been issued.
             */
            card_count: number;
            /**
             * Format: date-time
             * @description When the account was created.
             */
            created_at: string;
            /**
             * Format: int64
             * @description Number of deposits the user has made.
             */
            deposit_count: number;
            /** @description Login email. */
            email: string;
            /** @description True while the account still holds the placeholder address it was created with from Telegram. */
            email_pending: boolean;
            /** @description True when the user can log in with a password. */
            has_password: boolean;
            /**
             * Format: uuid
             * @description User UUID.
             */
            id: string;
            /** @description False when the account has been deactivated. */
            is_active: boolean;
            /** @description Role name. */
            role: string;
        };
        /** @description A user's subscription with its plan details. */
        UserSubscriptionView: {
            /** @description ISO 4217 code of the fee. */
            currency: string;
            /**
             * Format: date-time
             * @description End of the current billing period.
             */
            current_period_end?: string | null;
            /**
             * Format: int32
             * @description Discount on funding fees, in basis points.
             */
            funding_discount_bps: number;
            /** Format: uuid */
            id: string;
            /**
             * Format: int32
             * @description Discount on card issuance fees, in basis points.
             */
            issuance_discount_bps: number;
            /** @description Monthly fee, decimal string. */
            monthly_fee: string;
            /**
             * Format: date-time
             * @description When the subscription started.
             */
            started_at: string;
            /** @description Subscription status. */
            status: string;
            /** Format: uuid */
            tier_id: string;
            /** @description Display name of the plan. */
            tier_name: string;
            /** Format: uuid */
            user_id: string;
        };
        WalletBalanceRow: {
            /**
             * @description Balance in this currency, decimal string.
             * @example 5000.00
             */
            amount: string;
            /** @description ISO 4217 code. */
            currency: string;
            /** @description True for the user's wallet currency. Balances in other currencies can be migrated into it. */
            is_local: boolean;
        };
        WalletBalancesView: {
            /** @description Every non-zero balance, wallet currency first. */
            balances: components["schemas"]["WalletBalanceRow"][];
            /** @description The user's wallet currency, ISO 4217 code. Migrations convert into this. */
            local_currency: string;
            /**
             * Format: uuid
             * @description User UUID.
             */
            user_id: string;
            /** @description True when the wallet currency was chosen for this user, false when it is the deployment default. */
            wallet_currency_explicit: boolean;
        };
        WalletView: {
            /** @description Currencies the user may switch to with `PUT /me/wallet`. */
            allowed: string[];
            /** @description ISO 4217 code the wallet is held in. */
            currency: string;
            /** @description `true` when the user or an operator chose the currency; `false` when it is the deployment default. */
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
        /** @description A webhook endpoint together with its signing secret. */
        WebhookSecretView: {
            endpoint: components["schemas"]["WebhookView"];
            /**
             * @description HMAC secret used to sign deliveries. Shown only in this response, on
             *     create and rotate; store it now.
             */
            signing_secret: string;
        };
        /** @description A webhook endpoint that receives card events. */
        WebhookView: {
            /** Format: date-time */
            created_at: string;
            /**
             * @description Event patterns delivered to this endpoint: exact types like `card.created`,
             *     prefixes like `card.*`, or `*`. Empty means all events.
             */
            event_filter: string[];
            /** Format: uuid */
            id: string;
            /** @description Your own label for the endpoint. */
            label: string;
            /** @description `active`, `disabled` or `archived`. */
            status: components["schemas"]["EndpointStatus"];
            /** @description URL that receives the events. */
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
            /** @description Brand configuration */
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
    default_design_svg: {
        parameters: {
            query?: {
                /** @description `back` for the back of the card; omit for the front */
                side?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description SVG image */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "image/svg+xml": unknown;
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
            /** @description Every dependency answered */
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
    upload_asset: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UploadAssetBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UploadedAsset"];
                };
            };
            /** @description Unsupported or oversized file (`unsupported_image`, `image_too_large`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the settings.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No file storage on this deployment (`object_store_not_configured`) */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
                /** @description Page number, starting at 1. */
                page?: number | null;
                /** @description Rows per page. Default 50, max 200. */
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
            /** @description Unknown channel, or the post is not published */
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
            /** @description This version of the post was already sent on this channel */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The channel is disabled on this deployment */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_designs: {
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
                    "application/json": components["schemas"]["DesignView"][];
                };
            };
            /** @description Missing the settings.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_design: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateDesignBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DesignView"];
                };
            };
            /** @description Bad name, unsupported or oversized image, or neither an upload nor a URL (`validation`, `unsupported_image`, `image_too_large`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the settings.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No file storage on this deployment (`object_store_not_configured`) */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_design: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Design id */
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
                    "application/json": components["schemas"]["DisabledDesign"];
                };
            };
            /** @description Missing the settings.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such design */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description An active program uses this design as its default (`design_in_use`) */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_design: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Design id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchDesignBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DesignView"];
                };
            };
            /** @description Bad name or status */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the settings.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such design */
            404: {
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
                /** @description Only transactions on this card */
                card_id?: string;
                /** @description Only transactions on cards owned by this user */
                user_id?: string;
                /** @description Only transactions on cards from this connector */
                connector_slug?: string;
                /** @description Maximum number of rows. Default 100, max 500 */
                limit?: number;
                /** @description Rows to skip. Default 0 */
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
            /** @description Missing the cards.read permission */
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
                /** @description Filter by status, e.g. `active`, `frozen`, `terminated`, `redeemed` or `failed`. */
                status?: string | null;
                /** @description Only return cards owned by this user UUID. */
                user_id?: string | null;
                /** @description Filter by card type: `credit`, `prepaid` or `gift`. */
                card_type?: string | null;
                /** @description Only return cards issued through this connector slug. */
                connector_slug?: string | null;
                /** @description Maximum number of rows to return. Default 100, max 500. */
                limit?: number | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Cards, newest first */
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
                /** @description Optional. A repeat call with the same key and body returns the card created the first time */
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
            /** @description Invalid body, unknown connector, or unsupported card type */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The user's wallet cannot cover the issuance fee or the load amount */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the cards.lifecycle permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No card connectors configured */
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
            /** @description Cards that failed on our side but exist at the provider */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrphanRow"][];
                };
            };
            /** @description Missing the cards.read permission */
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
            /** @description The card with its live balance */
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
                /** @description Card UUID */
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
            /** @description Card with the lowered limit */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description Card not active, amount not positive, or currency mismatch */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the cards.recharge permission */
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
            /** @description The card's limit cannot be edited, because it is not a shared card */
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
                /** @description Card UUID */
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
            /** @description The card cannot be frozen, for example because it is terminated */
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
            /** @description The connector does not support freezing */
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
                /** @description Card UUID */
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
            /** @description Unknown action, or the card has no provider reference */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Adopt failed because the user's wallet cannot cover the load */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the cards.lifecycle permission */
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
                /** @description Card UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Refreshed card */
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
            /** @description The connector does not support reading card details */
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
                /** @description Card UUID */
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
            /** @description Not a prepaid card, card not active, or amount not positive */
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
            /** @description The connector does not support reloads */
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
                /** @description Card UUID */
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
            /** @description The card never reached the issuer; send `force: true` to close it anyway */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The connector does not support termination */
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
                /** @description Rows per page. Default 50. The provider may return fewer. */
                page_size?: number | null;
                /** @description `next_page_token` from the previous page. Omit for the first page. */
                page_token?: string | null;
            };
            header?: never;
            path: {
                /** @description Card UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description One page of transactions */
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
            /** @description The connector does not provide transaction history */
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
                /** @description Card UUID */
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
            /** @description The card cannot be unfrozen, for example because it is terminated */
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
            /** @description The connector does not support unfreezing */
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
            /** @description Connectors with redacted secrets */
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
            /** @description Created. Both secrets are plaintext and shown only once */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateConnectorResponse"];
                };
            };
            /** @description Invalid slug, role or URL */
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
            /** @description One entry per connector */
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
                /** @description Connector slug */
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
            /** @description Invalid URL or status, or an empty body */
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
                /** @description Card connector slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description One entry per provider account */
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
                /** @description Connector slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Plaintext configuration variables */
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
            /** @description The stored configuration could not be decrypted */
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
                /** @description Connector slug */
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
            /** @description Invalid key, value too large, or the whole map is too large */
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
                /** @description Connector slug */
                slug: string;
                /** @description Variable name */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Removed, or the key was not set */
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
                /** @description Connector slug */
                slug: string;
                /** @description Variable name, matching [a-z][a-z0-9_]{0,63} */
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
            /** @description Invalid key or value too large */
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
                /** @description Card connector slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Programs with pricing */
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
                /** @description Card connector slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Programs with pricing after the sync */
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
    patch_program: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Card connector slug */
                slug: string;
                /** @description Program id as returned by the program list */
                program_code: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchProgramBody"];
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
            /** @description A design that does not exist or is disabled (`unknown_design`), or `features` is not an object */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing connectors.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown program. Sync the connector first */
            404: {
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
                /** @description Card connector slug */
                slug: string;
                /** @description Program id as returned by the program list */
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
            /** @description Negative price, invalid currency, missing currency, or bad status */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown program. Sync the connector first */
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
                /** @description Connector slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Rotated. Both new secrets are plaintext and shown only once */
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
            /** @description Totals grouped by status and currency */
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
                /** @description Provider name to try. Defaults to the active one. */
                provider?: string | null;
                /** @description Currency to convert from, ISO 4217 code, e.g. `RUB`. */
                src: string;
                /** @description Currency to convert into, ISO 4217 code. Defaults to the wallet currency. */
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
            /** @description Invalid currency, or src and dst are the same */
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
            /** @description The provider is unknown or returned no usable rate */
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
                /** @description Include archived accounts. Default false. */
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
                /** @description Maximum number of rows to return. Default 200, max 1000. */
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
                /** @description Merchant UUID */
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
                /** @description Merchant UUID */
                id: string;
                /** @description Shop UUID */
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
                /** @description Merchant UUID */
                id: string;
                /** @description Shop UUID */
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
                /** @description Merchant UUID */
                id: string;
                /** @description Shop UUID */
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
                /** @description Merchant UUID */
                id: string;
                /** @description Shop UUID */
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
                /** @description Merchant UUID */
                id: string;
                /** @description Shop UUID */
                shop_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Created. The secret is shown only once */
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
                /** @description Merchant UUID */
                id: string;
                /** @description Shop UUID */
                shop_id: string;
                /** @description API key UUID */
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
            /** @description Created. temporary_password is plaintext and shown only once */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NewMerchantUser"];
                };
            };
            /** @description Invalid email, or the email is already in use */
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
                /** @description Merchant UUID. The user must belong to this merchant */
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
                /** @description Merchant UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Endpoints without secrets */
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
                /** @description Merchant UUID */
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
            /** @description Created. The signing secret is shown only once */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EndpointWithSecret"];
                };
            };
            /** @description Invalid URL or empty label */
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
                /** @description Merchant UUID */
                id: string;
                /** @description Endpoint UUID */
                ep_id: string;
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
                /** @description Merchant UUID */
                id: string;
                /** @description Endpoint UUID */
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
                /** @description Merchant UUID */
                id: string;
                /** @description Endpoint UUID */
                ep_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Rotated. The new signing secret is shown only once */
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
                /** @description Days to look back. Default 7, max 90 */
                window_days?: number;
                /** @description Only count transactions in this ISO 4217 currency */
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
            /** @description Missing the cards.read permission */
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
            /** @description Missing the organizations.read permission */
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
            /** @description Invalid legal name or currency */
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
                /** @description Organization UUID */
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
                /** @description Organization UUID */
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
                /** @description Organization UUID */
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
                /** @description Organization UUID */
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
                /** @description Organization UUID */
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
                /** @description Organization UUID */
                id: string;
                /** @description `credit`, `prepaid` or `gift` */
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
                /** @description Organization UUID */
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
            /** @description Amount is not positive or the currency is invalid */
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
                /** @description Organization UUID */
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
                /** @description Organization UUID */
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
                /** @description Maximum number of rows to return. Default 100, max 500. */
                limit?: number | null;
                /** @description Only return payments for this merchant UUID. */
                merchant_id?: string | null;
                /**
                 * @description Filter by status: `pending`, `redirect_required`, `succeeded`, `failed` or
                 *     `no_connector_available`.
                 */
                status?: string | null;
                /** @description Filter by payment method, e.g. `card`, `crypto`, `apm`. */
                method?: string | null;
                /** @description Filter by currency, ISO 4217 code or crypto asset code. */
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
                /** @description Maximum number of rows to return. Default 100, max 500. */
                limit?: number | null;
                /** @description Filter by status: `pending`, `succeeded` or `failed`. */
                status?: string | null;
                /** @description Filter by what was refunded: `deposit` or `payment`. */
                target_type?: string | null;
                /** @description Only return refunds requested by this user or merchant UUID. */
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
                /** @description Role name */
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
                /** @description Role name */
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
            /** @description All settings, secret values redacted */
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
                /** @description Dotted setting key, e.g. branding.site_url */
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
                /** @description Dotted setting key */
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
            /** @description The value does not satisfy the setting's constraint */
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
                /** @description Dotted setting key */
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
                /** @description Only return cycles for this merchant UUID. */
                merchant_id?: string | null;
                /** @description Filter by status: `open`, `freezing`, `posted`, `completed` or `failed`. */
                status?: string | null;
                /** @description Maximum number of rows to return. Default 200, max 1000. */
                limit?: number | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Settlement cycles, newest first */
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
            /** @description Merchant not found or not active */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The merchant already has a cycle in progress */
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
            /** @description The cycle */
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
                /** @description Cycle UUID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Cycle posted with the payable amount computed */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Cycle"];
                };
            };
            /** @description The cycle is not in a state that can be closed */
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
                /** @description Cycle UUID */
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
            /** @description The cycle is not in a state that can be completed */
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
                /** @description Cycle UUID */
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
            /** @description The cycle is already completed or failed */
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
            /** @description Invalid fee, currency or discount */
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
                /** @description Tier UUID */
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
            /** @description Users are still subscribed to this tier */
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
                /** @description Tier UUID */
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
                /** @description Case-insensitive substring to match against the email. Omit for no filter. */
                q?: string | null;
                /** @description Maximum number of rows to return. Default 100, max 500. */
                limit?: number | null;
                /** @description `true` returns only accounts still on the placeholder email they were created with from Telegram; `false` only accounts with a real email. Omit for both. */
                email_pending?: boolean | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Users, newest first */
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
                /** @description User UUID */
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
                /** @description ISO 4217 code. Default USD */
                currency?: string;
            };
            header?: never;
            path: {
                /** @description User UUID */
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
            /** @description Missing the users.read permission */
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
                /** @description User UUID */
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
            /** @description Zero amount, invalid currency, or note too short */
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
                /** @description User UUID */
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
    admin_list_devices: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description User UUID */
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
                    "application/json": components["schemas"]["DeviceView"][];
                };
            };
            /** @description Missing the users.read permission */
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
    admin_patch_device: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description User UUID */
                id: string;
                device_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchDeviceBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DeviceView"];
                };
            };
            /** @description Only `disabled: true` is supported */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the users.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such device */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_get_preferences: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description User UUID */
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
                    "application/json": components["schemas"]["PreferencesView"];
                };
            };
            /** @description Missing the users.read permission */
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
    admin_list_notifications: {
        parameters: {
            query?: {
                /** @description Page size, 1 to 100. Default 20. */
                limit?: number | null;
            };
            header?: never;
            path: {
                /** @description User UUID */
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
                    "application/json": components["schemas"]["InboxPage"];
                };
            };
            /** @description Missing the users.read permission */
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
    patch_user_role: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description User UUID */
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
            /** @description Caller lacks the `users.write` permission */
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
                /** @description User UUID */
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
            /** @description The user has no subscription */
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
                /** @description User UUID */
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
                /** @description User UUID */
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
    admin_unlink_telegram: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description User UUID */
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
                    "application/json": components["schemas"]["UnlinkTelegramResult"];
                };
            };
            /** @description Caller lacks the `users.write` permission */
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
            /** @description The account has no password; Telegram is its only way in (`last_credential`) */
            409: {
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
                /** @description User UUID */
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
                /** @description User UUID */
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
            /** @description The user has no two-factor enrolment */
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
            /** @description Caller lacks the `users.write` permission */
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
                /** @description User UUID */
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
            /** @description Invalid currency, the source is already the wallet currency, or the balance is zero */
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
            /** @description No exchange rate available. Nothing was converted */
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
            /** @description Session or second-factor challenge; see `stage` */
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
            /** @description Account is disabled */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Locked after too many wrong codes; the message says when to try again */
            429: {
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
            /** @description Locked after too many wrong codes; the message says when to try again */
            429: {
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
            /** @description Signed in; returns the session token and user */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Wrong code or expired challenge */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Locked after too many wrong codes; the message says when to try again */
            429: {
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
            /** @description Signed in; returns the session token and user */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Wrong code or expired challenge */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Locked after too many wrong codes; the message says when to try again */
            429: {
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
            /** @description Enrolled and signed in; includes ten one-time backup codes */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Wrong code or expired challenge */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Locked after too many wrong codes; the message says when to try again */
            429: {
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
            /** @description Token missing, expired or revoked */
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
            /** @description Current password is wrong */
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
            /** @description Account created and signed in; returns the session token and user */
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
            /** @description initData signature is invalid or too old */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Account is disabled (`user_disabled`), or it has operator permissions and must sign in with email and password (`second_factor_required`) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `provision: false` and this Telegram id has no account yet (`telegram_unknown`) */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Telegram login is not enabled on this deployment */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    telegram_link: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TelegramLinkBody"];
            };
        };
        responses: {
            /** @description Linked and signed in; the `stage: "jwt"` envelope */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Wrong email or password (`unauthenticated`), or the initData signature is invalid or stale (`invalid_init_data`) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Account disabled (`user_disabled`) or it has operator permissions (`second_factor_required`) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `telegram_already_linked_other` or `telegram_in_use` */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Telegram sign-in is not enabled on this deployment */
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
    list_public_products: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Products in the order they are issued, the default first */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardProductView"][];
                };
            };
            /** @description Not modified since the `If-None-Match` tag */
            304: {
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
                /** @description ISO 4217 code, e.g. `USD`. Omit for the wallet's own currency (or the card's, for a card balance). */
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
    list_products: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Products in the order they are issued */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardProductView"][];
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
    get_product: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Product id */
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
                    "application/json": components["schemas"]["CardProductView"];
                };
            };
            /** @description Missing or invalid token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such product, or it is not offered right now */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
                content: {
                    "application/json": components["schemas"]["UserCardView"][];
                };
            };
        };
    };
    me_create_card: {
        parameters: {
            query?: never;
            header: {
                /** @description Required. The same key with the same body returns the original result; the same key with a different body returns 409. */
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
                content: {
                    "application/json": components["schemas"]["UserCardView"];
                };
            };
            /** @description Missing Idempotency-Key, invalid body, unknown issuer_slug, a card type that is not available yet, `unknown_product`, `product_mismatch`, `design_not_allowed` or `invalid_name` */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Wallet balance is too low for the prepaid load */
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
            /** @description No card connector is configured on this deployment */
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
                content: {
                    "application/json": components["schemas"]["UserCardView"];
                };
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
    patch_card: {
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
                "application/json": components["schemas"]["PatchCardBody"];
            };
        };
        responses: {
            /** @description The card */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserCardView"];
                };
            };
            /** @description `invalid_name` or `design_not_allowed` */
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
                /** @description ISO 4217 code, e.g. `USD`. Omit for the wallet's own currency (or the card's, for a card balance). */
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
            /** @description The connector does not support freezing */
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
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RevealResponse"];
                };
            };
            /** @description The card belongs to another user */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Too many reveals; try again later */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The connector cannot reveal card details */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Card provider error */
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
            /** @description The connector does not support termination */
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
    get_topup_terms: {
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
                    "application/json": components["schemas"]["TopupTerms"];
                };
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
    topup_card: {
        parameters: {
            query?: never;
            header: {
                /** @description Required. The same key with the same amount returns the original result; the same key with a different amount returns 409. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TopupCardBody"];
            };
        };
        responses: {
            /** @description Card topped up */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TopupResult"];
                };
            };
            /** @description Missing Idempotency-Key, amount not positive, or outside the product's floor and cap (`amount_below_minimum`, `amount_above_maximum`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not enough money in the wallet (`insufficient_funds`) */
            402: {
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
            /** @description Card frozen, closed or still being issued (`card_not_active`, `card_pending`), or Idempotency-Key reused with a different amount */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The card's provider does not support top-ups */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The provider declined the top-up; the wallet is whole */
            502: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The provider is not responding; the wallet is whole */
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
            /** @description The connector does not support unfreezing */
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
                /** @description Required. The same key with the same body returns the original result; the same key with a different body returns 409. */
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
            /** @description Deposit created; `status` is one of pending, redirect_required, confirmed, failed */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing Idempotency-Key, invalid body, or unknown funder_slug */
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
            /** @description No funding connector is configured on this deployment */
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
            /** @description Quote created; pass its id as `quote_id` to POST /me/deposits */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuoteView"];
                };
            };
            /** @description Invalid amount or currency, or the currency is already the wallet currency */
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
            /** @description No exchange rate available; cross-currency deposits are refused rather than priced from a guess */
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
                /** @description Deposit id */
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
                /** @description Required. The same key with the same body returns the original result; the same key with a different body returns 409. */
                "Idempotency-Key": string;
            };
            path: {
                /** @description Id of the deposit being refunded */
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
            /** @description Refund created; `status` is one of pending, succeeded, failed */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing Idempotency-Key, deposit not confirmed, amount above the original, or unknown connector */
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
    list_devices: {
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
                    "application/json": components["schemas"]["DeviceView"][];
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
    register_device: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RegisterDeviceBody"];
            };
        };
        responses: {
            /** @description Known device, refreshed */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RegisteredDevice"];
                };
            };
            /** @description New device */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RegisteredDevice"];
                };
            };
            /** @description Bad kind, platform or credential */
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
            /** @description Web Push is not enabled on this deployment (`push_disabled`) */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_device: {
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
            /** @description No such device */
            404: {
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
    get_preferences: {
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
                    "application/json": components["schemas"]["PreferencesView"];
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
    put_preferences: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PreferencesBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PreferencesView"];
                };
            };
            /** @description Unknown channel, category or locale */
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
    list_notifications: {
        parameters: {
            query?: {
                /** @description Opaque cursor from a previous page. */
                cursor?: string | null;
                /** @description Page size, 1 to 100. Default 50. */
                limit?: number | null;
                /** @description `true` returns unread items only. */
                unread?: boolean | null;
                /** @description Only this category. */
                category?: string | null;
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
                    "application/json": components["schemas"]["InboxPage"];
                };
            };
            /** @description Bad cursor or unknown category */
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
    mark_all_read: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReadAllBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MarkedCount"];
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
    unread_count: {
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
                    "application/json": components["schemas"]["UnreadCount"];
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
    delete_notification: {
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
            /** @description No such notification */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    mark_read: {
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
                    "application/json": components["schemas"]["InboxItem"];
                };
            };
            /** @description No such notification */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_push_subscription: {
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
                    "application/json": components["schemas"]["PushSubscriptionView"];
                };
            };
        };
    };
    put_push_subscription: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PushSubscriptionBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PushSubscriptionView"];
                };
            };
            /** @description Endpoint is not an https URL or the keys are not URL-safe base64 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Push notifications are not enabled on this deployment */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_push_subscription: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Subscription removed; also returned when none was stored */
            204: {
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
            /** @description Subscribed and available channels */
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
    me_link_telegram: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MeLinkTelegramBody"];
            };
        };
        responses: {
            /** @description The user, with `telegram` set */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Missing token, or the initData signature is invalid or stale (`invalid_init_data`) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Account disabled (`user_disabled`) or it has operator permissions (`second_factor_required`) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `telegram_already_linked_other` or `telegram_in_use` */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Telegram sign-in is not enabled on this deployment */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    me_unlink_telegram: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The user, with `telegram: null` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Missing or invalid token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No Telegram account is linked (`telegram_not_linked`) */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The account has no password; Telegram is its only way in (`last_credential`) */
            409: {
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
            /** @description Currency is not offered on this deployment */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Wallet holds a balance; ask an operator to migrate it */
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
                /** @description API key UUID */
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
            /** @description Logged in */
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
            /** @description Email belongs to more than one organization; retry with organization_id */
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
            /** @description Current user */
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
            /** @description Prepay balance is insufficient */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No card connector is configured */
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
                /** @description Card UUID */
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
            /** @description No such card */
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
                /** @description Card UUID */
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
                /** @description Card UUID */
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
                /** @description Card UUID */
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
            /** @description Prepay balance is insufficient */
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
                /** @description Card UUID */
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
                /** @description Card UUID */
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
            /** @description Invalid email */
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
                /** @description Member UUID */
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
            /** @description Invalid request body */
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
                /** @description Endpoint UUID */
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
                /** @description Endpoint UUID */
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
                /** @description Endpoint UUID */
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
