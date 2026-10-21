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
    "/changelog": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Read the platform changelog
         * @description Returns the changelog of the platform version this deployment runs, as
         *     Markdown, newest version first: what's new, what changed and what to do
         *     when upgrading. English unless another available language is asked for.
         *     For staff accounts only.
         */
        get: operations["get_changelog"];
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
         * @deprecated
         * @description Deprecated: use `GET /admin/documents/images`. Kept for one release.
         */
        get: operations["list_images"];
        put?: never;
        /**
         * Upload a blog image
         * @deprecated
         * @description Deprecated: use `POST /admin/documents/images`. Kept for one release.
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
         * @deprecated
         * @description Deprecated: use `GET /admin/documents?category=blog`. Kept for one release.
         */
        get: operations["list_posts"];
        put?: never;
        /**
         * Create a blog post
         * @deprecated
         * @description Deprecated: use `POST /admin/documents`. Creates a public document in the
         *     Blog category. Kept for one release.
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
         * @deprecated
         * @description Deprecated: use `GET /admin/documents/{id}`. Kept for one release.
         */
        get: operations["get_post"];
        put?: never;
        post?: never;
        /**
         * Delete a blog post
         * @deprecated
         * @description Deprecated: use `DELETE /admin/documents/{id}`. Kept for one release.
         */
        delete: operations["delete_post"];
        options?: never;
        head?: never;
        /**
         * Update a blog post
         * @deprecated
         * @description Deprecated: use `PATCH /admin/documents/{id}`. Kept for one release.
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
         * @deprecated
         * @description Deprecated: use `POST /admin/documents/{id}/broadcast`. Kept for one release.
         */
        post: operations["broadcast"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/blog/posts/{id}/broadcast-draft": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Write a broadcast from this post
         * @deprecated
         * @description Deprecated: use `POST /admin/documents/{id}/broadcast-draft`. Kept for one release.
         */
        post: operations["broadcast_draft"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/broadcasts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List broadcasts
         * @description Newest first, drafts and sent ones together.
         */
        get: operations["list_broadcasts"];
        put?: never;
        /**
         * Write a broadcast
         * @description Creates a draft. Nothing is sent until `POST /admin/broadcasts/{id}/send`.
         */
        post: operations["create_broadcast"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/broadcasts/audience": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * How many people a segment holds
         * @description The count the editor shows before anything is sent. Pass the segment you
         *     are about to pick rather than the saved one.
         */
        get: operations["count_segment"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/broadcasts/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a broadcast
         * @description The message, its sends, how many people the segment holds now, and how
         *     many of them have opened it.
         */
        get: operations["get_broadcast"];
        /**
         * Edit a broadcast
         * @description Changing the words makes it a new message: the version goes up, so a
         *     deliberate second send reaches people who already got the first one. A
         *     change to the audience or the channels alone does not.
         */
        put: operations["update_broadcast"];
        post?: never;
        /**
         * Delete a broadcast
         * @description Drops the draft and its send history. What has already reached inboxes
         *     stays there — a message cannot be unsent.
         */
        delete: operations["delete_broadcast"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/broadcasts/{id}/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Preview a broadcast
         * @description What the message looks like in the cabinet, in the bot and on a phone,
         *     and how many people would get it right now.
         */
        post: operations["preview_broadcast"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/broadcasts/{id}/recipients": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Upload the recipient list
         * @description A CSV file with a user id in the first column, one user per line; a
         *     header line is skipped. The list replaces the previous one and is used
         *     when the broadcast's segment is `list`. Ids that are not active end-user
         *     accounts are left out and reported, so the operator sees how many lines
         *     were accepted before sending. Marketing consent still applies on top: a
         *     marketing broadcast reaches only the listed users who said yes.
         */
        put: operations["upload_recipients"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/broadcasts/{id}/send": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Send a broadcast
         * @description Hands the message to every user in the segment: an inbox row each, plus
         *     the pings that were ticked. Pressing send twice on the same words
         *     delivers once — the second call is a 409. Edit the words and the version
         *     moves, which makes a deliberate second send possible.
         */
        post: operations["send_broadcast"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/campaigns": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List campaign codes
         * @description Every code marketing has handed out, newest first, with how many visits
         *     and sign-ups it brought.
         */
        get: operations["list_campaigns"];
        put?: never;
        /**
         * Add a campaign code
         * @description From then on a visit whose `utm_campaign`, `utm_source` or Telegram code
         *     equals it counts as this campaign. Codes can't be deleted: they live on in
         *     links already published. Audited.
         */
        post: operations["create_campaign"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/campaigns/{code}": {
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
         * Edit a campaign
         * @description Changes the description or the channel. The code itself stays: links
         *     with it are already out. Audited.
         */
        patch: operations["update_campaign"];
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
    "/v1/admin/card-stock/{id}/activate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Activate plastic for a holder
         * @description The provider activates the card from the stock for the holder; the
         *     program's price is charged to the holder's wallet; the card appears in
         *     their list as a physical card. Activating the same card again returns
         *     the card it became.
         */
        post: operations["activate_stock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/card-stock/{id}/assign": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Bind plastic to a holder
         * @description Marks a card of the stock as sent to a holder, before it is activated.
         *     With `user_id` null the binding comes off and the card is in stock again.
         */
        post: operations["assign_stock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/card-stock/{id}/void": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Void plastic
         * @description A card of the stock that will never be activated. Only a card in stock or
         *     bound to a holder can be voided.
         */
        post: operations["void_stock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/card-topups/{id}/recheck": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Ask the issuer about a top-up
         * @description For a top-up the issuer accepted and has not loaded onto the card: asks
         *     the issuer how it stands. An answer settles the top-up the way the
         *     issuer's own report would; no answer leaves it as it is.
         */
        post: operations["recheck_topup"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/card-topups/{id}/return": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Return a stalled top-up to the wallet
         * @description The issuer has had the top-up for too long and the operator gives up
         *     waiting: the money goes from the card's transit account back to the
         *     holder's wallet, and the holder is told. On a deployment without a
         *     wallet the holder cannot see that balance; prefer writing the top-up off
         *     or waiting.
         */
        post: operations["return_topup"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/card-topups/{id}/write-off": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Write a stalled top-up off
         * @description The issuer kept the money and will not load the card: the operator takes
         *     the amount off the card's transit account onto the platform's adjustments
         *     account, with a note. The holder is not told; support handles the case.
         */
        post: operations["write_off_topup"];
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
    "/v1/admin/cardholders/generate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Make up cardholder details
         * @description Returns a plausible person for the card form: a name, a birth date over
         *     21, a phone for the country and an address whose city, state and postal
         *     code belong together. Nothing is stored; send the details back in
         *     `customer` when issuing the card, or leave them out and the platform
         *     makes up and stores a holder itself.
         */
        post: operations["generate"];
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
    "/v1/admin/cards/{id}/adjust": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Correct one side of a card
         * @description For a card whose books and issuer disagree. Pick the side that missed
         *     the movement: `provider` raises or lowers what the card can spend at the
         *     issuer and leaves the books alone; `books` posts the movement on the
         *     platform's books and leaves the issuer alone. The other side is never
         *     touched, so the gap closes instead of moving. A reason is required and
         *     audited. The next reconciliation reading confirms the result.
         */
        post: operations["adjust_card"];
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
    "/v1/admin/cards/{id}/force-sync": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Sync a card's balance with the provider
         * @description For a card whose balance here differs from the provider's. Asks the
         *     provider for the card's balance now and records the difference on the
         *     platform's books, so the two agree. The provider's side is not touched.
         *     The difference warning is cleared, and the audit log records who did it
         *     and what was recorded.
         */
        post: operations["force_sync_card"];
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
    "/v1/admin/cards/{id}/moderation": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Put or lift a hold on a card
         * @description A held card reads as frozen to its holder, who can't unfreeze it, top it
         *     up, reveal it, close it or move money to or from it. Nothing changes at
         *     the provider, and the holder is not told about the hold. Putting a hold on
         *     a held card updates the note; lifting a hold that isn't there does
         *     nothing. Audited.
         */
        put: operations["set_moderation"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/{id}/no-pin-limit": {
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
         * Set a physical card's no-PIN limit
         * @description The amount under which a purchase on the card is approved without the
         *     PIN, set at the provider. Only for physical cards.
         */
        patch: operations["set_no_pin_limit"];
        trace?: never;
    };
    "/v1/admin/cards/{id}/provider-fees": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the provider's fees for a card
         * @description What the card provider charged the platform for operations on this card,
         *     newest first. These come off the platform's wallet at the provider, not
         *     off the card or the holder.
         */
        get: operations["card_provider_fees"];
        put?: never;
        post?: never;
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
         *     is already terminated returns it unchanged. A closed card with no
         *     transactions, top-ups or transfers is removed altogether: the response
         *     still carries it, a later read answers 404. Audited.
         */
        post: operations["terminate_card"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/cards/{id}/topups": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List a card's top-ups
         * @description Every top-up of the card from the holder's wallet, newest first, with
         *     how each one ended. A `pending` top-up is with the issuer; a `stalled`
         *     one has been there too long and waits for an operator.
         */
        get: operations["list_card_topups"];
        put?: never;
        post?: never;
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
    "/v1/admin/code-programs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Programs
         * @description Every program with its numbers: uses by operation, people, discounts
         *     given, bonuses given to the people using its codes and to referrers,
         *     and what those people topped up and how many cards they got.
         */
        get: operations["list_code_programs"];
        put?: never;
        /**
         * Create a program
         * @description A program is the rules codes work by: the operations they apply to,
         *     dates and limits, what the person using a code gets (`effects`), and
         *     for referral codes what the referrer earns (`referrer_reward` effects,
         *     with the optional cap per invited person and reward window). Effects:
         *     `gift_subscription {tier_id, days|null}`, `discount {target, bps}` or
         *     `{target, amount, currency}`, `bonus_credit {amount}`,
         *     `grant_referral_code {program_id}`, `referrer_reward {on, amount}` or
         *     `{on, bps}` with an optional `min_amount` + `min_currency`.
         */
        post: operations["create_code_program"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/code-programs/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** A program */
        get: operations["get_code_program"];
        /**
         * Change a program
         * @description Replaces the program's terms and effects; its codes follow at once.
         *     Uses already made keep what they got. `status: disabled` switches every
         *     code of the program off, rewards to referrers included.
         */
        put: operations["update_code_program"];
        post?: never;
        /**
         * Delete a program
         * @description Only a program no code uses; switch it off otherwise.
         */
        delete: operations["delete_code_program"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/code-redemptions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Uses of codes
         * @description Newest first, by code, program or user: the operation, its amount, the
         *     discount given and what every effect did.
         */
        get: operations["list_code_redemptions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/codes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Codes */
        get: operations["list_promo_codes"];
        put?: never;
        /**
         * Create a promo code
         * @description A promo code works by its program. Referral codes are made on a user's
         *     page (`POST /admin/users/{id}/referral-code`) or by a program that
         *     grants them.
         */
        post: operations["create_promo_code"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/codes/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** A code with its latest uses */
        get: operations["get_promo_code"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Change a code
         * @description Switch it off or on, move it to another program, change its dates,
         *     limit or note. Only the fields sent change.
         */
        patch: operations["patch_promo_code"];
        trace?: never;
    };
    "/v1/admin/connector-jobs/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a job */
        get: operations["get_job"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connector-jobs/{id}/retry": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Retry the cards a job could not close
         * @description Queues a new job over the cards the provider refused in this one. Needs
         *     the `cards.mass_terminate` permission and the current code from your
         *     authenticator.
         */
        post: operations["retry_job"];
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
         * @description Changes the connector's URL, its status, and for a funding connector
         *     where its top-ups may land (`funder_mode`) and which payment methods it
         *     takes. At least one field must be present. The change takes effect
         *     immediately.
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
    "/v1/admin/connectors/{slug}/card-stock": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List a connector's plastic
         * @description Every card of the stock for this card connector, with who it is bound to
         *     and what it became. Activation codes are never returned.
         */
        get: operations["list_stock"];
        put?: never;
        /**
         * Import a batch of plastic
         * @description Puts the cards into the connector's stock. A card already there (same
         *     activation code) is skipped, so a batch can be imported again safely.
         *     Codes are stored sealed and never shown again.
         */
        post: operations["import_stock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/cards/terminate-all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Close every card of a card connector
         * @description Starts a background job that closes every open card the connector has
         *     and brings what was on each card back to its holder, the way a single
         *     close does. Needs the `cards.mass_terminate` permission and the current
         *     code from your authenticator. One job per connector runs at a time; the
         *     cards the provider refuses stay on the job and can be retried.
         */
        post: operations["terminate_all"];
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
    "/v1/admin/connectors/{slug}/deposit-pricing": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List a funding connector's method pricing
         * @description One entry per method the operator priced. A method without an entry
         *     works on the deployment-wide terms: `rates.spread_bps` off the credited
         *     side and `funding.commission_bps` on confirmed deposits.
         */
        get: operations["list_deposit_pricing"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/deposit-pricing/{method}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set a funding method's pricing
         * @description Writes the terms for one method of a funding connector: the fee and its
         *     kind, a rate source of its own, the quote lifetime, the limits. From
         *     then on quotes and deposits through that method follow the row; a
         *     `markup` row puts the fee into the rate the user sees, a `commission`
         *     row charges it as a line of its own. Deposits already made keep the
         *     terms they were made under.
         */
        put: operations["put_deposit_pricing"];
        post?: never;
        /**
         * Remove a funding method's pricing
         * @description The method goes back to the deployment-wide terms. Deposits already
         *     made keep the terms they were made under.
         */
        delete: operations["delete_deposit_pricing"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/connectors/{slug}/jobs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List a connector's jobs
         * @description Newest first, with their progress.
         */
        get: operations["list_jobs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
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
         *     pricing, for picking one when issuing a card by hand. The list is empty
         *     until the storefront has pulled the connector's catalog at least once.
         *     Editing a program (price, product card, visibility) is done through the
         *     storefront endpoints.
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
    "/v1/admin/connectors/{slug}/provider-events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List a card connector's provider fees and wallet credits
         * @description What the card provider took off the platform's wallet with it, per day
         *     and kind, and what the platform put on it, with the latest events. The
         *     wallet's balance itself is `GET /admin/connectors/{slug}/balances`.
         */
        get: operations["connector_provider_events"];
        put?: never;
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
    "/v1/admin/deposits": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List deposits
         * @description Top-ups across all users, newest first, with the user's email and, for a
         *     top-up onto a card, the card and how far its load got. Filter by
         *     `card_load_status=failed` to find the ones waiting for an operator.
         */
        get: operations["list_deposits"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/deposits/{id}": {
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
    "/v1/admin/deposits/{id}/recheck-card-load": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Ask the issuer about a waiting card load
         * @description For a top-up onto a card whose load the issuer accepted and has not
         *     finished: asks the issuer how it stands. An answer finishes the load the
         *     way the issuer's own report would; no answer leaves it waiting.
         */
        post: operations["recheck_card_load"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/deposits/{id}/refunds": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List a deposit's refunds
         * @description Every refund of the deposit, newest first: the user's own and the ones
         *     operators made. `requestor_type` says which.
         */
        get: operations["list_deposit_refunds"];
        put?: never;
        /**
         * Refund a deposit for the user
         * @description Returns part or all of a confirmed wallet top-up to the payer through the
         *     funding connector, the way the user's own refund does: the refunded share
         *     of what was credited comes off the wallet at the original rate, the
         *     source amount goes back out. The connector may settle at once
         *     (`succeeded`), later (`pending`, finished by its event) or refuse
         *     (`failed`). A top-up that went onto a card can't be refunded here. The
         *     `Idempotency-Key` header is required.
         */
        post: operations["refund_deposit"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/deposits/{id}/retry-card-load": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Retry a card load
         * @description Asks the card provider again to load a top-up that arrived but did not
         *     make it onto the card. The provider sees the same load id as the first
         *     time, so a card is never loaded twice. Allowed while the load is
         *     `failed` and the money has not gone to the wallet. If it fails again the
         *     deposit stays `failed` and the money keeps waiting: at that point the
         *     case needs a person.
         */
        post: operations["retry_card_load"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/deposits/{id}/return-card-load": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Return a waiting card load to the wallet
         * @description The issuer has had the load for too long and the operator gives up
         *     waiting: the money goes from the card's transit account to the holder's
         *     wallet, and the holder is told. On a deployment without a wallet the
         *     holder cannot see that balance; prefer writing the load off or waiting.
         */
        post: operations["return_card_load"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/deposits/{id}/write-off-card-load": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Write a waiting card load off
         * @description The issuer kept the money and will not load the card: the operator takes
         *     the amount off the card's transit account onto the platform's adjustments
         *     account, with a note. The deposit's load ends `failed`.
         */
        post: operations["write_off_card_load"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/documents": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List documents
         * @description Every document you may read, in any status, most recently changed first.
         *     Search by words, narrow by tag, category, folder, status or read level.
         */
        get: operations["list_documents"];
        put?: never;
        /**
         * Create a document
         * @description Creates a draft in the given folder (the Blog when none is given). When
         *     `slug` is omitted it is derived from the title; a title with no latin
         *     characters gets a generated slug. The read level defaults to the folder's
         *     default, the write level to your own. Neither can be set above your level.
         */
        post: operations["create_document"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/documents/folders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List folders
         * @description The whole tree as a flat list: the four categories and every folder
         *     under them, with `parent_id` to build it. Folders carry no access of
         *     their own, so everyone with the section sees all of them.
         */
        get: operations["list_folders"];
        put?: never;
        /**
         * Create a folder
         * @description A new folder inside an existing one. The key is derived from the title
         *     when omitted. New categories are not created this way.
         */
        post: operations["create_folder"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/documents/folders/{id}": {
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
         * Delete a folder
         * @description Only an empty folder can be deleted. Categories cannot.
         */
        delete: operations["delete_folder"];
        options?: never;
        head?: never;
        /**
         * Update a folder
         * @description Rename, move, reorder or change the default read level of a folder.
         *     Documents inside keep their addresses. Categories keep their place and key.
         */
        patch: operations["patch_folder"];
        trace?: never;
    };
    "/v1/admin/documents/images": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List uploaded images
         * @description Returns up to 100 uploaded images with their public URLs.
         */
        get: operations["admin_list_images"];
        put?: never;
        /**
         * Upload an image
         * @description Stores the image and returns the public URL to use in a document body.
         */
        post: operations["admin_upload_image"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/documents/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Preview a text
         * @description Renders Markdown into the blocks a reader's app receives, without saving
         *     anything. Links written as `doc:<id>` are resolved to the target's
         *     current address when you may read it.
         */
        post: operations["preview"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/documents/tags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Tags in use
         * @description Every tag on a document you may read, in any status, most used first.
         */
        get: operations["list_tags"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/documents/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a document
         * @description The document with its text, its saved versions and its announcement state.
         */
        get: operations["get_document"];
        put?: never;
        post?: never;
        /**
         * Delete a document
         * @description Removes the document, its versions and its send history for good.
         *     Anyone holding its address gets a 404. Audited.
         */
        delete: operations["delete_document"];
        options?: never;
        head?: never;
        /**
         * Update a document
         * @description Changes any of the document's fields. Editing the title, excerpt, text or
         *     cover saves a new version (set `effective_from` to say when it takes
         *     effect, `note` to say what changed) and makes a broadcast available again.
         *     Moving, tagging or changing the status does not. Levels cannot be set
         *     above your own.
         */
        patch: operations["patch_document"];
        trace?: never;
    };
    "/v1/admin/documents/{id}/broadcast": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Broadcast a document
         * @description Sends a published document that users may read to every subscriber on
         *     the given channel. Each combination of document, channel and content
         *     version is sent at most once, so a repeat call returns 409. Editing the
         *     document afterwards allows a re-send.
         */
        post: operations["admin_broadcast"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/documents/{id}/broadcast-draft": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Write a broadcast from this document
         * @description Turns the document into a draft broadcast (its title, its excerpt and a
         *     button that opens it on the site) and hands it back for the operator to
         *     edit and send. The draft is an ordinary broadcast from here on.
         */
        post: operations["admin_broadcast_draft"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/documents/{id}/versions/{version}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get one saved version
         * @description The text as it was saved in that version, with its effective date and note.
         */
        get: operations["get_version"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Change a version's date or note
         * @description Sets when a saved text takes effect, or what the note says. The text
         *     itself never changes; save the document to get a new version.
         */
        patch: operations["patch_version"];
        trace?: never;
    };
    "/v1/admin/failed-tasks/announcements": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List announcements that failed
         * @description Announcements of a document or blog post that didn't go out and weren't
         *     sent again since, newest first. Sending again uses
         *     `POST /admin/documents/{id}/broadcast` with the same channel.
         */
        get: operations["list_announcements"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/failed-tasks/card-drift": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List cards whose balance differs from the provider's
         * @description Cards whose balance here and at the provider have differed for long enough
         *     to tell operators, newest first. A card leaves the list once the two agree
         *     again.
         */
        get: operations["list_card_drift"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/failed-tasks/compensations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List compensations that failed
         * @description When an operation fails, the platform undoes what it already did: gives
         *     held bonuses back, returns money to the wallet, closes a card at the
         *     provider. Each item here is one of those steps that failed too, so money
         *     or a card is left where it shouldn't be. Every item says what is stuck and
         *     what to check. Open ones come first, newest first.
         */
        get: operations["list_compensations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/failed-tasks/compensations/{id}/resolve": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Close a failed compensation by hand
         * @description For after the money or the card has been put right by hand. Nothing is
         *     moved here: this only records who closed the item and the note saying
         *     what was done. Closing one says the books are right again, so it takes
         *     `settlements.write`, the finance permission. Audited.
         */
        post: operations["resolve_compensation"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/failed-tasks/connector-events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List connector events that weren't handled
         * @description Events a connector sent whose handling failed, newest first. A resend from
         *     the connector runs them again, and so does a retry from here.
         */
        get: operations["list_connector_events"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/failed-tasks/connector-events/{id}/retry": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Run a connector event again
         * @description Handles the stored event as if the connector had sent it again. On success
         *     it leaves this list. If it fails, the answer says why and the event stays.
         *     Audited.
         */
        post: operations["retry_connector_event"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/failed-tasks/holder-mail": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List cardholder mail that couldn't be handled
         * @description Messages in the cardholders' shared inbox that couldn't be read or passed
         *     on to the holder after several tries, newest first. Each one is still in
         *     the mailbox, marked read: look at it there, then close it here.
         */
        get: operations["list_holder_mail"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/failed-tasks/holder-mail/{id}/resolve": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Close a cardholder message that couldn't be handled
         * @description For a message dealt with by hand in the mailbox. It leaves the list; the
         *     note and who closed it are kept and audited.
         */
        post: operations["resolve_holder_mail"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/failed-tasks/summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Count open failures by kind
         * @description The counters for the Failed tasks page. Each number matches what the list
         *     of that kind shows.
         */
        get: operations["summary"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/failed-tasks/webhooks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List webhooks that ran out of attempts
         * @description Webhooks to merchants and organizations that failed every attempt, newest
         *     first.
         */
        get: operations["list_webhooks"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/failed-tasks/webhooks/{id}/retry": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Send a failed webhook again
         * @description Puts the webhook back in the queue with a fresh set of attempts, signed and
         *     addressed as it was the first time. It leaves this list; if every attempt
         *     fails again, it comes back. Audited.
         */
        post: operations["retry_webhook"];
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
    "/v1/admin/license": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Show the license state in full
         * @description Returns what this deployment's license allows and what it last reported
         *     to Takeal: the installation, the lease in use with its features and
         *     limits, and the last heartbeat exactly as it was sent. `GET /ready` shows
         *     only the mode and the lease's dates; this is the complete view.
         */
        get: operations["get_license"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/mail/lanes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Mail lanes
         * @description What transactional and broadcast mail go out through, or why they cannot.
         */
        get: operations["lanes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/mail/layout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the email layout
         * @description The shell every email is poured into: logo, colours, footer and, on
         *     broadcast mail, the unsubscribe link.
         */
        get: operations["get_layout"];
        /**
         * Save the email layout
         * @description Replaces the shipped layout for every email. The layout must print the
         *     message (`body_html`, `body_text`) and the unsubscribe link
         *     (`unsubscribe_url`), and must render; otherwise nothing is saved.
         */
        put: operations["put_layout"];
        post?: never;
        /** Go back to the shipped email layout */
        delete: operations["delete_layout"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/mail/layout/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Preview the email layout
         * @description A sample message poured into the layout, exactly as it would be sent.
         */
        post: operations["preview_layout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/mail/test": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Send a test email
         * @description One email through the lane, to your own address, in the current layout.
         *     It arrives within a minute when the lane works; when it does not, the
         *     notification worker's log and the dead letters say why.
         */
        post: operations["test_send"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Your role and permissions
         * @description What the signed-in account may do, for a console to decide which
         *     sections to show and which controls to hide. The API still checks
         *     every call on its own.
         */
        get: operations["my_access"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Change your profile
         * @description Sets the language of the console and of your notifications. It is saved
         *     on the account, so every browser you sign in from picks it up. Send
         *     `"locale": null` to go back to the browser's language. A field you leave
         *     out keeps its value. The response is the same as for `GET /admin/me`.
         */
        patch: operations["update_my_profile"];
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
         *     so pass it to the person out of band. The user has to replace it with a
         *     password of their own at the first sign-in.
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
        /**
         * Change a merchant user's role or block them
         * @description Both fields are optional; what is left out stays as it is. A role change
         *     applies to the user's open sessions at their next request. Operator-only,
         *     audited.
         */
        patch: operations["update_merchant_user"];
        trace?: never;
    };
    "/v1/admin/merchants/{id}/users/{user_id}/reset-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reset a merchant user's password
         * @description Issues a new temporary password, shown only in this response. The user's
         *     open sessions end, and at the next sign-in they have to pick a password of
         *     their own. Operator-only, audited.
         */
        post: operations["reset_merchant_user_password"];
        delete?: never;
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
         * @description Adds an endpoint on the shop named in `shop_id`, or on the merchant's
         *     default shop when `shop_id` is omitted. The signing secret is returned only
         *     in this response. Audited.
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
    "/v1/admin/metrika/conversions/upload": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Send conversions to Metrica now
         * @description Runs the upload that otherwise runs every six hours: confirmed deposits,
         *     issued cards and paid subscriptions of the last 21 days that were not
         *     sent yet. Use it to check the counter and the token right after entering
         *     them. Answers 409 while the upload is off or not configured.
         */
        post: operations["upload_now"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/notification-templates": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List notification templates
         * @description Every stored text, ordered by event and language. A `render_error` means
         *     the last message that needed this text could not be built from it: the
         *     send used the previous version and the operator should fix it.
         */
        get: operations["list_templates"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/notification-templates/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Preview a notification template
         * @description Renders the text you pass — saved or not — on sample values, and returns
         *     what each channel would show. Send `data` to preview with your own
         *     values.
         */
        post: operations["preview_template"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/notification-templates/{event_type}/{locale}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get one notification template
         * @description The current text, the earlier ones, and the sample values the preview
         *     uses.
         */
        get: operations["get_template"];
        /**
         * Save a notification template
         * @description Creates the text for this event and language, or replaces it. The text is
         *     rendered against sample values before it is stored, so a template that
         *     cannot be built never reaches a recipient: a broken one comes back as 400
         *     with the reason. The previous text is kept in the history, and the next
         *     message uses the new one — nothing is deployed.
         */
        put: operations["put_template"];
        post?: never;
        /**
         * Delete a notification template
         * @description Drops the stored text and its history. The event falls back to the text
         *     shipped with the release, so messages keep going out.
         */
        delete: operations["delete_template"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/notification-templates/{event_type}/{locale}/test-send": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Send a notification template to yourself
         * @description Sends this event to your own account with sample values, through the
         *     channel you would normally receive it on. Exactly what a user gets.
         */
        post: operations["test_send_template"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/notifications/dead-letters": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Failed notifications
         * @description Notifications a channel refused for good or that ran out of retries,
         *     newest first, with the channel's last answer.
         */
        get: operations["list_dead_letters"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/notifications/dead-letters/{id}/retry": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Send a failed notification again
         * @description Puts the notification back on its channel as it was first sent. It stays
         *     in the list, marked retried; if the channel refuses it again, it comes
         *     back as a new entry.
         */
        post: operations["retry_dead_letter"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/notifications/deliveries": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Delivery health per channel
         * @description Deliveries and failures for good per channel over the last hours, with
         *     the failure reasons (bot blocked, chat not found, push subscription
         *     gone, address bounced, provider rejected) and the notification types
         *     they hit.
         */
        get: operations["deliveries"];
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
         *     password is returned only in this response and cannot be recovered later,
         *     so pass it to the person out of band. The user has to replace it with a
         *     password of their own at the first sign-in.
         */
        post: operations["create_user"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/organizations/{id}/users/{user_id}": {
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
         * Change an organization user's role or block them
         * @description Both fields are optional; what is left out stays as it is. A role change
         *     applies to the user's open sessions at their next request. Audited.
         */
        patch: operations["update_user"];
        trace?: never;
    };
    "/v1/admin/organizations/{id}/users/{user_id}/reset-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reset an organization user's password
         * @description Issues a new temporary password, shown only in this response. The user's
         *     open sessions end, and at the next sign-in they have to pick a password of
         *     their own. Audited.
         */
        post: operations["reset_user_password"];
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
    "/v1/admin/storefront": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * The storefront
         * @description Every card product of every card connector in one list, in the order
         *     buyers see it, whether on sale or not. Each product says whether it is
         *     on sale right now and, if not, why. The response also names the currency
         *     buyers hold on this deployment, the natural one to price in.
         */
        get: operations["get_storefront"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/storefront/order": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Arrange the storefront
         * @description Sets the order tiles appear in. Send every product id first to last;
         *     products you leave out fall in behind, in the order they had. This
         *     changes nothing about which program issues a card: the issuance cascade
         *     has its own priority.
         */
        put: operations["put_order"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/storefront/products/{id}": {
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
         * Change a product
         * @description The product card buyers read (name, tagline, description, benefits, tile
         *     picture, designs, properties), the price in the currency the buyer pays,
         *     and whether it is on the storefront. Omitted fields keep their value; a
         *     text field sent empty is cleared. A product needs a name before it can
         *     go on sale: the provider's own label never reaches a buyer. Saving
         *     clears the "new" mark. The order on the storefront and the issuance
         *     settings have endpoints of their own.
         */
        patch: operations["patch_product"];
        trace?: never;
    };
    "/v1/admin/storefront/products/{id}/image": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Upload a tile picture
         * @description Stores the picture in the deployment's file storage and makes it the
         *     product's tile. PNG, WebP or JPEG, up to 1 MiB. Without file storage the
         *     call answers 503; a picture you host yourself can still be set by URL.
         */
        post: operations["upload_tile_image"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/storefront/products/{id}/issuance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Change how a program issues
         * @description The issuance cascade priority, the program status, and the country and
         *     state a made-up cardholder is placed in. These decide which program
         *     mints a card and what the provider is told about its holder, so they
         *     need the connector permission rather than the storefront one, and they
         *     never move a tile on the storefront. The cardholder policy itself comes
         *     from the provider and cannot be changed here.
         */
        put: operations["put_issuance"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/storefront/sync": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Pull the providers' catalogs
         * @description Asks every active card connector for the programs it offers and updates
         *     the label, card type, currency and BIN of each one. Everything an
         *     operator set (price, product card, designs, visibility, order) is
         *     kept. A program seen for the first time arrives hidden from buyers,
         *     marked new, at the end of the storefront. A program the provider no
         *     longer offers is removed when no card was issued on it and disabled
         *     otherwise. A connector that cannot be reached is reported and the
         *     others are still pulled. Returns the whole storefront afterwards.
         */
        post: operations["sync_storefront"];
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
    "/v1/admin/users/{id}/attribution": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Where a user came from
         * @description The user's attribution row and every touch recorded for them.
         */
        get: operations["user_attribution"];
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
    "/v1/admin/users/{id}/bonus": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * A user's bonuses
         * @description The same view the user gets from `GET /me/bonus`, with the operators'
         *     notes on the changes and a longer history.
         */
        get: operations["admin_user_bonus"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/bonus-adjust": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Credit or take back a user's bonuses
         * @description A positive amount credits the user with a lot of bonuses of its own; a
         *     negative one takes bonuses back, from the credits the spend order would
         *     use first. The note is required and goes into the audit log. A credit
         *     also sends the user a `bonus_credited` notification.
         */
        post: operations["admin_bonus_adjust"];
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
    "/v1/admin/users/{id}/referral": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * A user's codes and referrals
         * @description Their referral code, who invited them, the people they invited, what
         *     they earned for it, and the codes they used.
         */
        get: operations["user_referral"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/admin/users/{id}/referral-code": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Make a user a referrer
         * @description Gives the user a referral code of their own, working by the program.
         *     A person has one working referral code; switch the old one off first to
         *     give another.
         */
        post: operations["issue_referral_code"];
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
         * @description Puts the user on the given tier, replacing any current subscription.
         *     With `kind: gift` the subscription is a gift: never charged, ending
         *     after `gift_days` or at `gift_until`, or never when both are left out.
         *     The user is told about a gift. Audited.
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
    "/v1/attribution/touches": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Record a visit
         * @description Send it on a page load when the visit carries something: campaign tags
         *     or a click id in the address, a referrer from another site, a Telegram
         *     code, or it is the first visit from this browser. Sending it on every
         *     load is fine too: a visit with nothing new is not stored. No sign-in
         *     needed. Nothing about the device or the connection is kept.
         */
        post: operations["post_touch"];
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
    "/v1/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Sign out
         * @description Ends the session behind the bearer token and, when `remember_token` is
         *     sent, the remembered sign-in with it. Always answers 204, also for a
         *     session that already ended.
         */
        post: operations["logout"];
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
    "/v1/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Renew a remembered sign-in
         * @description Trades the `remember_token` of a sign-in made with `remember_me: true`
         *     for a new session and a new `remember_token`; the one sent stops
         *     working. Call it when a request answers 401, or when the app opens with
         *     no valid session. It works only from the browser that signed in, and
         *     not after the session was signed out (here, from another device, by a
         *     password change or by an operator). Accounts with a second factor are
         *     remembered for fewer days. The response is the `stage: "jwt"` envelope
         *     of `POST /auth/login`.
         */
        post: operations["refresh"];
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
         *     operator through `/admin/users`, not here. With a `code`, the response
         *     also carries `code_result`: whether the code was applied and what it
         *     gave (bonuses, a gift subscription), or why not.
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
         *     second factor. A new account opened through a link with a promo or
         *     referral code (`startapp=<code>`), or with `code` in the body, gets what
         *     the code gives, and the response carries `code_result`.
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
         * @deprecated
         * @description Deprecated: use `GET /documents/images/{id}`. The same bytes under the
         *     same id; kept for one release.
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
         * @deprecated
         * @description Deprecated: use `GET /documents?category=blog`. Same rows, same order,
         *     same filters; kept for one release.
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
         * @deprecated
         * @description Deprecated: use `GET /documents/{slug}`. Kept for one release.
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
         *     `GET /me/card-products`, with the list price in the currency the
         *     operator set instead of a personal one (`price.discount_bps` is always
         *     0). Products the operator hid are left out. The response carries an
         *     `ETag`; send it back in `If-None-Match` to get a 304 when nothing
         *     changed. Caches may keep it for a minute.
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
    "/v1/documents": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List documents
         * @description Published documents you may read, paged. Works without a session; with
         *     one, documents for signed-in users (and for staff, with a staff session)
         *     appear too. Filter by category, folder, tag, locale or search words. The
         *     blog comes newest first; other categories in the order set in the folder.
         */
        get: operations["documents_list_documents"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/documents/images/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get an image
         * @description Returns the raw image bytes. No authentication needed. The bytes never
         *     change under a given id, so the response carries a long-lived cache
         *     header and an ETag; clients can link to these URLs directly from
         *     `cover_url` and image blocks.
         */
        get: operations["documents_get_image"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/documents/tags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Tags in use
         * @description Every tag on a published document you may read, most used first.
         */
        get: operations["tags"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/documents/tree": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Navigation tree
         * @description Folders and the published documents you may read in them, for a
         *     sidebar or a table of contents. Empty folders are left out; the
         *     categories always appear.
         */
        get: operations["tree"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/documents/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a document by address
         * @description The published document with this slug, if you may read it. Without `at`,
         *     the text in force now: a version whose effective date is still ahead is
         *     not shown yet. With `at`, the text that was in force at that moment.
         *     Unknown slugs, unpublished documents and documents above your level
         *     return 404.
         */
        get: operations["documents_get_document"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/documents/{slug}/versions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the versions of a document
         * @description Every saved text of a published document you may read, newest first,
         *     with the date each took effect. Open one with `GET /documents/{slug}/versions/{version}`.
         */
        get: operations["list_versions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/documents/{slug}/versions/{version}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get one version of a document
         * @description The document as it read in that version. Same access rules as the
         *     document itself.
         */
        get: operations["documents_get_version"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/mail/postmark/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Postmark webhook
         * @description Point the broadcast stream's webhooks here with basic auth, any user name
         *     and `notification.mail.broadcast.webhook_secret` as the password (or an
         *     `X-Webhook-Secret` header). Delivery, Open, Click and Bounce fill the
         *     broadcast report; SubscriptionChange and SpamComplaint take the
         *     recipient off the mailing list.
         */
        post: operations["postmark_events"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/mail/unsubscribe": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Unsubscribe page
         * @description Where the link at the bottom of a broadcast email leads. It asks before
         *     doing anything, so a mail scanner that opens every link cannot
         *     unsubscribe anyone.
         */
        get: operations["unsubscribe_page"];
        put?: never;
        /**
         * Unsubscribe
         * @description The button on the unsubscribe page, and the one-click unsubscribe mail
         *     clients send (`List-Unsubscribe-Post`, RFC 8058). Broadcast email stops
         *     and marketing by email is switched off in the user's settings. Sign-in
         *     codes and card notifications are not affected. Pressing it twice is
         *     harmless.
         */
        post: operations["unsubscribe"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/attribution": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Your sign-up survey
         * @description Whether to ask the signed-in user how they heard about us.
         */
        get: operations["my_attribution"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/attribution/survey": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Answer "how did you hear about us"
         * @description Ask it on the screen after sign-up, not in the form, and let the user
         *     skip it in one tap (send `skipped`). It is asked once: a second answer is
         *     refused.
         */
        put: operations["answer_survey"];
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
    "/v1/me/bonus": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Your bonuses
         * @description Bonuses are a discount on our services. They pay for part of a new card
         *     or of the subscription fee, and bonuses that came with a payment can
         *     also be added to a top-up. The response lists what is on the account,
         *     what each bonus can go towards, the credits with bonuses left and the
         *     latest changes. `balance` is a number of bonuses; show it on its own,
         *     without a money figure next to it.
         */
        get: operations["my_bonus"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/debt": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Your debt
         * @description What you owe in card fees your card could not cover, per currency, and
         *     what each amount is for. The next top-up of any of your cards or of your
         *     account pays it first; the top-up screens show how much before you pay.
         */
        get: operations["my_debt"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/bonus/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Preview a price with bonuses
         * @description Works out, on the server and at the rate the payment would use, how many
         *     bonuses a price would take and what is left to pay, so a screen can show
         *     "was / now" and "N bonuses will be used" before you confirm. For a
         *     top-up the bonuses are added on top of what you pay. Nothing is held or
         *     spent; the numbers can change by the time you pay if prices, rates or
         *     your bonuses change.
         */
        post: operations["me_preview"];
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
         * @description Every card product this deployment offers, in the order the storefront
         *     shows them; `is_default` marks the one you get when you don't choose.
         *     Each carries its product card (tagline, benefits, tile picture), its
         *     artwork, the designs you may pick and what issuance costs you right now:
         *     in your wallet currency, your subscription discount included.
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
         * @description Issues a card through a card connector for the product's price, taken
         *     from the wallet. The card starts empty unless its product includes a
         *     starting balance (see `starting_balance` in the catalog), which is part
         *     of the price; money is added afterwards with `POST /me/cards/{id}/topup`.
         *     Only `prepaid` is available today; `credit` and `gift` return 400. The
         *     `Idempotency-Key` header is required.
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
         * @description What the card can spend right now, in the card's currency, as the card's
         *     issuer reports it: the same figure support sees. When the issuer can't be
         *     asked at this moment the answer is a 503 rather than a guess. For a card
         *     whose issuer does not report balances, the platform's own books answer.
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
    "/v1/me/cards/{id}/pin": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Set a physical card's PIN
         * @description Sends the new PIN to the card issuer. Only for physical cards that are
         *     active. The PIN is never kept on the platform; you get a notification that
         *     it was set. Rate limited like revealing card details.
         */
        post: operations["set_card_pin"];
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
         * @description Returns the full card number and CVV of your own card, along with the
         *     billing address it is registered at. The session is enough: no password
         *     or code is asked again. Rate limited per card and per user. The response
         *     is marked no-store and the details are never kept on the platform.
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
         * @description Only the card's owner can terminate it, and only once it holds no money.
         *     This cannot be undone; calling it again on a terminated card is a no-op. A closed card with no purchases,
         *     top-ups or transfers disappears from the list; this response still carries it.
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
    "/v1/me/cards/{id}/transfer": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Move money between your own cards
         * @description Takes `amount` off the card in the path and puts it on `to_card_id`. Both
         *     cards must be yours, active, in the same currency and of the same kind.
         *     The money travels through your wallet, one leg at a time: if the second
         *     leg does not go through, the transfer comes back with the status
         *     `on_wallet` and the money is on your wallet, never between the two cards.
         *     The `Idempotency-Key` header is required: the same key with the same body
         *     returns the first outcome, the same key with a different body returns 409.
         *     Someone else's card returns 404.
         */
        post: operations["transfer_card"];
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
    "/v1/me/codes/validate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Check a promo code
         * @description Says whether a code can be used on an operation and what it would do:
         *     the discount, and what else comes with it (bonuses, a gift
         *     subscription). Nothing is used up; the code is taken when the operation
         *     itself is made with it (`promo_code` on `POST /me/deposits` or
         *     `POST /me/cards`). The answer can change by then if the code runs out
         *     in the meantime.
         */
        post: operations["validate_code"];
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
        get: operations["me_list_deposits"];
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
         *
         *     With `card_id` or `issue_card` the money goes onto a card instead of the
         *     wallet. The deposit then has `target: card` and a `card_load_status`:
         *     `pending` until the card provider has loaded the card, then `succeeded`
         *     or `failed`. When the load fails, depending on the funding connector the
         *     money either goes to the wallet (`returned_to_wallet_at` is set and the
         *     user is notified) or waits while support looks into it.
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
         * @description Prices a deposit in a currency other than the one it credits before any
         *     money moves: the wallet's, or a card's for a top-up that goes straight
         *     onto a card. The rate is locked until `expires_at`; a deposit already in
         *     the credited currency needs no quote.
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
        get: operations["me_get_deposit"];
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
        post: operations["me_refund_deposit"];
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
    "/v1/me/funding-options": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the ways to top up
         * @description The funding connectors you can top up through, in the order the
         *     deployment prefers them: where the money may land (the wallet, a card, or
         *     either) and which payment methods each one takes. Build the top-up screen
         *     from this list rather than from fixed connector names.
         */
        get: operations["funding_options"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Your money history
         * @description Everything that happened to the signed-in user's money, newest first:
         *     card payments (declined ones included, with the reason in plain words),
         *     refunds, card issuance, card top-ups, transfers between the user's own
         *     cards (one entry for both sides), wallet top-ups, fees and corrections.
         *     Each entry is in the currency it happened in; a conversion also carries
         *     the other side and the rate. Pass `card_id` for one card's history.
         *     Page with `next_cursor`.
         */
        get: operations["my_history"];
        put?: never;
        post?: never;
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
    "/v1/me/referral": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Your referral code and the people you invited
         * @description Referral codes are given out by invitation: `code` is null until you
         *     have one. `link` is the invitation to share, when the deployment has set
         *     one up. The people you invited are listed without names or contacts:
         *     when they joined, whether they have a card and have topped up, and what
         *     they brought you. `rewards` says what each bonus credit was for. Bonuses
         *     are a discount on our services, not money.
         */
        get: operations["my_referral"];
        put?: never;
        post?: never;
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
    "/v1/me/subscription": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Your subscription
         * @description The tier you are on, or null. `kind` is `gift` for a subscription you
         *     were given: it is never charged, and `gift_until` says when it ends
         *     (null: it doesn't).
         */
        get: operations["my_subscription"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me/subscription/promo-code": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Use a promo code on your subscription
         * @description Sets a promo code the monthly fee is charged with, as long as the code
         *     allows (a code may work for the first months only). The code is checked
         *     now against the current fee and taken when a fee is charged; a code that
         *     stops working is simply not applied. Send `code: null` to remove it.
         *     Only a paid subscription takes a code; a gift is not charged anyway.
         */
        put: operations["set_subscription_code"];
        post?: never;
        delete?: never;
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
    "/v1/org/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Forget a remembered sign-in
         * @description The `remember_token` and the chain it belongs to stop working. The bearer
         *     token itself runs out on its own. Always answers 204.
         */
        post: operations["org_logout"];
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
        /**
         * Change your profile
         * @description Sets the language of the portal and of your notifications. It is saved on
         *     the account, so every browser you sign in from picks it up. Send
         *     `"locale": null` to go back to the browser's language. A field you leave
         *     out keeps its value. You can call it before replacing a password an
         *     operator gave you. The response is the same as for `GET /auth/me`.
         */
        patch: operations["update_me"];
        trace?: never;
    };
    "/v1/org/auth/password": {
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
         * @description Needs the current password and a new one that passes the policy. This is
         *     also how a user replaces a password issued by an operator. Every session
         *     of the account ends, this one included: the response carries a new bearer
         *     token (and a new `remember_token` if `remember_me` is set) to carry on with.
         */
        post: operations["org_change_password"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/org/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Renew a remembered sign-in
         * @description Trades the `remember_token` of a sign-in made with `remember_me: true`
         *     for a new bearer token and a new `remember_token`; the one sent stops
         *     working. It works only from the browser that signed in. Same response as
         *     `POST /auth/login`.
         */
        post: operations["org_refresh"];
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
        get: operations["org_list_webhooks"];
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
        ActivateStockBody: {
            customer?: null | components["schemas"]["CustomerInfo"];
            /** @description The holder's name for the card. */
            name?: string | null;
            /**
             * Format: uuid
             * @description The holder. Required unless the card is bound to one already; then it must match.
             */
            user_id?: string | null;
        };
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
        AdjustBody: {
            /**
             * @description Amount, decimal string, positive.
             * @example 8.00
             */
            amount: string;
            /** @description ISO 4217 code. Must match the card's currency. */
            currency: string;
            /** @description `in` adds to the card, `out` takes from it. */
            direction: components["schemas"]["AdjustDirectionBody"];
            /**
             * Format: uuid
             * @description UUID chosen by the caller, kept the same across retries. A repeat call with the same key changes nothing twice.
             */
            idempotency_key: string;
            /** @description Extra key-value pairs passed to the provider on a provider-side adjustment. */
            metadata?: {
                [key: string]: string;
            };
            /** @description Why this correction is made, in your own words. Recorded in the audit trail. */
            reason: string;
            /** @description Which side to correct. `provider` when the books already hold a movement the issuer missed; `books` when the issuer already moved and the books did not. */
            side: components["schemas"]["AdjustSideBody"];
        };
        /**
         * @description Whether the adjustment adds to the card or takes from it.
         * @enum {string}
         */
        AdjustDirectionBody: "in" | "out";
        /**
         * @description Which side of the card an adjustment touches.
         * @enum {string}
         */
        AdjustSideBody: "provider" | "books";
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
        AdminDocumentList: {
            documents: components["schemas"]["DocumentSummary"][];
            /** Format: int64 */
            page: number;
            /** Format: int64 */
            per_page: number;
            /** Format: int64 */
            total: number;
        };
        /** @description Someone a user invited, as an operator sees them. */
        AdminInvited: {
            email?: string | null;
            /** Format: date-time */
            joined_at: string;
            /** @description Bonuses they brought the referrer, decimal string. */
            rewarded: string;
            /** Format: uuid */
            user_id: string;
        };
        /** @description A user's referral side, for the operator. */
        AdminReferral: {
            code?: null | components["schemas"]["CodeView"];
            invited: components["schemas"]["AdminInvited"][];
            /** Format: int64 */
            invited_count: number;
            /** @description Codes this user used. */
            redemptions: components["schemas"]["RedemptionView"][];
            referred_by?: null | components["schemas"]["ReferredBy"];
            rewards: components["schemas"]["RewardView"][];
            total_rewarded: string;
        };
        /** @description A tag and how many documents carry it. */
        AdminTagCount: {
            /**
             * Format: int64
             * @description Documents you may read that carry it, in any status.
             */
            count: number;
            tag: string;
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
        /** @description An amount in one currency. */
        Amount: {
            /**
             * @description Decimal string, never negative; `direction` says which way it went.
             * @example 12.50
             */
            amount: string;
            /** @description ISO 4217 code. */
            currency: string;
        };
        /** @description Money in one currency. */
        AmountView: {
            /** @description Decimal string. */
            amount: string;
            currency: string;
        };
        AnnouncementPage: {
            items: components["schemas"]["FailedAnnouncement"][];
            /** Format: int64 */
            total: number;
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
             * Format: int32
             * @description For a gift: how many days it lasts. Leave out both this and `gift_until` for a gift with no end date.
             */
            gift_days?: number | null;
            /**
             * Format: date-time
             * @description For a gift: when it ends. Leave out both this and `gift_days` for a gift with no end date.
             */
            gift_until?: string | null;
            /** @description `billing` (the default: charged every month) or `gift` (never charged). */
            kind?: string | null;
            /**
             * Format: uuid
             * @description Tier to put the user on.
             */
            tier_id: string;
        };
        AssignStockBody: {
            /** @description How and when it was sent, for the record. */
            shipped_note?: string | null;
            /**
             * Format: uuid
             * @description The holder the plastic goes to. Null takes an existing binding off.
             */
            user_id?: string | null;
        };
        AttributionView: {
            /** @description The latest id per click-id name before sign-up. */
            click_ids: Record<string, never>;
            /** @description The promo or referral code the user signed up with. */
            code?: string | null;
            first_campaign?: string | null;
            /** @description `campaign`, `ads`, `organic_search`, `ai`, `telegram`, `unlisted_tags`, `referral`, `direct`; `unknown` when nothing reached us; `pre_launch` for accounts older than attribution; `organization` for a holder an organization added; `staff`. */
            first_channel: string;
            first_landing_path?: string | null;
            first_source?: string | null;
            /** Format: date-time */
            first_touch_at?: string | null;
            ga_client_id?: string | null;
            last_campaign?: string | null;
            last_channel: string;
            last_landing_path?: string | null;
            last_source?: string | null;
            /** Format: date-time */
            last_touch_at?: string | null;
            metrika_client_id?: string | null;
            posthog_distinct_id?: string | null;
            /** Format: date-time */
            recorded_at?: string | null;
            /**
             * Format: uuid
             * @description Who invited them, for a referral code.
             */
            referrer_user_id?: string | null;
            signup_platform?: string | null;
            /** @description `email`, `telegram`, or null for an account made another way. */
            signup_via?: string | null;
            survey_answer?: string | null;
            /** Format: date-time */
            survey_answered_at?: string | null;
            survey_other?: string | null;
            /** Format: int32 */
            touch_count: number;
            /** @description The user's touches, oldest first, including those after sign-up. */
            touches: components["schemas"]["TouchView"][];
        };
        AudienceCount: {
            /** Format: int64 */
            audience: number;
            /**
             * Format: int64
             * @description How many of them an email would reach.
             */
            email_audience: number;
            /** @description Whether broadcast mail is set up, so email can be ticked. */
            email_ready: boolean;
            /** @description Whether the email report will show deliveries, opens and clicks. */
            email_tracked: boolean;
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
        /** @description One renderable node of a document body. `type` says which kind it is. */
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
        /**
         * @example {
         *       "amount": "300",
         *       "funded": false,
         *       "note": "Apology for the delayed card"
         *     }
         */
        BonusAdjustBody: {
            /**
             * @description Bonuses to credit (positive) or take back (negative), up to two decimal places. Not zero.
             * @example 300
             */
            amount: string;
            /**
             * Format: date-time
             * @description A credit only: when the bonuses expire. Leave it out to follow the bonus expiry settings.
             */
            expires_at?: string | null;
            /** @description A credit only: true when a payment came with these bonuses, so they may also be added to a top-up. Leave it false for goodwill credits: those pay for part of a card or a subscription only. */
            funded?: boolean;
            /** @description Why, at least 3 characters. Goes to the audit log and the user's history in the operator console; the user never sees it. */
            note: string;
            /**
             * Format: uuid
             * @description Makes a retried request land once: send the same value to repeat a click safely. A new one is made up when it is left out.
             */
            request_id?: string | null;
        };
        /** @description A lot as the API shows it. */
        BonusLotView: {
            /** @description Bonuses credited, decimal string. */
            amount: string;
            /** Format: date-time */
            created_at: string;
            /**
             * Format: date-time
             * @description When what is left expires; null = never.
             */
            expires_at?: string | null;
            /** Format: uuid */
            id: string;
            /** @description Bonuses still left, decimal string. */
            remaining: string;
            /** @description True when these bonuses came without a payment: they go towards a card or a subscription, never a top-up. */
            restricted: boolean;
            /** @description Where the bonuses came from, e.g. `manual`. */
            source: string;
        };
        /** @description One change to a bonus balance. */
        BonusMovementView: {
            /** Format: date-time */
            created_at: string;
            /** @description Currency of `price` and `value`. */
            currency?: string | null;
            /** Format: uuid */
            id: string;
            /** @description `credit`, `debit` (taken back by support), `spend` or `expire`. */
            kind: string;
            /** @description The operator's note, only in the admin view. */
            note?: string | null;
            /**
             * Format: uuid
             * @description The card, deposit or subscription paid for.
             */
            operation_id?: string | null;
            /** @description For a spend: the price the bonuses went against, decimal string (a top-up: the amount paid). */
            price?: string | null;
            /** @description What they were spent on, for a `spend`: `card_issuance`, `subscription` or `deposit`. */
            purpose?: string | null;
            /** @description `posted`, or `reserved` while the payment they are held for is still going through. */
            status: string;
            /** @description Bonuses, decimal string, always positive; `kind` says which way. */
            units: string;
            /** @description For a spend: the part of the price the bonuses covered (a top-up: what they added), decimal string. */
            value?: string | null;
        };
        /**
         * @description What bonuses are spent on.
         * @enum {string}
         */
        BonusPurpose: "card_issuance" | "subscription" | "deposit";
        /** @description A holder's bonus wallet. */
        BonusSnapshot: {
            /** @description Bonuses the holder can use now, decimal string. */
            balance: string;
            /** @description Latest changes, newest first. */
            history: components["schemas"]["BonusMovementView"][];
            /** @description Credits with bonuses left, the soonest to expire first. */
            lots: components["schemas"]["BonusLotView"][];
            /** @description Bonuses held for a payment still going through, decimal string. */
            pending: string;
            /** @description What bonuses can pay for. */
            spend_on: components["schemas"]["BonusTarget"][];
            /** @description One bonus is a discount of one unit of this currency. Show it next to a price ("was / now"), never next to the balance. */
            unit_currency: string;
        };
        /** @description Where bonuses may go and how many. */
        BonusTarget: {
            /** @description Bonuses that may go towards it right now, decimal string. */
            available: string;
            purpose: components["schemas"]["BonusPurpose"];
            /**
             * Format: int32
             * @description The largest share of a price bonuses may cover, basis points (10000 = all of it). A card product may set its own.
             */
            share_bps: number;
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
        /** @description A broadcast with its sends and what the recipients did with it. */
        BroadcastDetail: components["schemas"]["BroadcastRow"] & {
            /**
             * Format: int64
             * @description How many people the segment holds right now.
             */
            audience: number;
            /** @description Per channel (Telegram, push, email): pings sent, delivered, failed for good with the reasons, still being retried. */
            channel_report: components["schemas"]["ChannelReport"][];
            /**
             * Format: int64
             * @description How many of them have the message in their inbox (this version).
             */
            delivered: number;
            email?: null | components["schemas"]["EmailReport"];
            /**
             * Format: int64
             * @description How many of the audience an email would reach: an address, email left
             *     on for this kind of message, not unsubscribed.
             */
            email_audience: number;
            /**
             * Format: int64
             * @description How many users the uploaded list holds; 0 when none was uploaded.
             */
            listed: number;
            /**
             * Format: int64
             * @description How many of those opened it.
             */
            opened: number;
            /** @description Every send, newest first. A second one exists only after an edit. */
            sends: components["schemas"]["BroadcastSend"][];
        };
        /** @description What a broadcast looks like on each channel before it is sent. */
        BroadcastPreview: {
            /**
             * Format: int64
             * @description How many people would get it right now.
             */
            audience: number;
            /** @description The email as it would be sent, layout and unsubscribe link included. */
            email: components["schemas"]["EmailParts"];
            /**
             * Format: int64
             * @description How many of the audience an email would reach.
             */
            email_audience: number;
            /** @description Title and body as the cabinet shows them. */
            inbox: components["schemas"]["RenderedMessage"];
            /** @description Title and first line, as a push shows them. */
            push: components["schemas"]["PushPreview"];
            /** @description The Telegram message, in the HTML subset the bot sends. */
            telegram: string;
        };
        BroadcastResult: {
            /**
             * Format: uuid
             * @description Id of this broadcast attempt.
             */
            broadcast_id: string;
            /** @description Channel the document was sent on. */
            channel: string;
            /**
             * Format: int32
             * @description Content version of the document that was sent.
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
        /** @description One broadcast as it is stored. */
        BroadcastRow: {
            /** @description The message. Paragraphs, `- ` lists, `**bold**`, `*italic*`, `[text](url)`. */
            body_markdown: string;
            /** @description Where the button goes. A path is resolved against the deployment's site. */
            button_href?: string | null;
            button_label?: string | null;
            /** @description Which of the user's own switches this answers to. */
            category: string;
            /** @description Channels besides the inbox row: `telegram`, `push`, `email`. */
            channels: string[];
            /**
             * Format: int32
             * @description Bumped whenever the words change; part of every recipient's dedupe key.
             */
            content_version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            image_url?: string | null;
            /** @description `all`, `marketing`, `has_card`, `has_deposit`, `tier`, `locale` or `list` (the uploaded list of users). */
            segment_kind: string;
            /** @description The tier code or language for the segments that take one. */
            segment_value?: string | null;
            /** @description What Telegram and push carry instead of the body, when it is written. */
            short_text?: string | null;
            /** @description `draft` or `sent`. */
            status: string;
            /** @description Headline: the inbox and push title, and the first line in Telegram. */
            title: string;
            /** Format: date-time */
            updated_at: string;
        };
        /** @description What a send did, and what became of it. */
        BroadcastSend: {
            /** Format: int32 */
            content_version: number;
            /**
             * Format: int32
             * @description How many could not be handed to the notification substrate at all.
             */
            failed: number;
            /** Format: uuid */
            id: string;
            /**
             * Format: int32
             * @description How many users the segment resolved to.
             */
            recipients: number;
            /** Format: date-time */
            sent_at: string;
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
        Campaign: {
            /** @description Where the link was placed: telegram, blogger, yandex_direct, article. */
            channel: string;
            /** @description The code that goes into links: `utm_campaign=<code>` or a Telegram `startapp=<code>`. */
            code: string;
            /** Format: date-time */
            created_at: string;
            /** @description Who added it; null when that account is gone. */
            created_by_email?: string | null;
            /** @description What this is: "post in our channel on 7 September", "placement with a blogger". */
            description: string;
            /**
             * Format: int64
             * @description Users whose first or last touch before sign-up carried this code.
             */
            signups: number;
            /**
             * Format: int64
             * @description Visits recorded with this code.
             */
            touches: number;
        };
        CampaignList: {
            campaigns: components["schemas"]["Campaign"][];
        };
        CampaignPatch: {
            channel?: string | null;
            description?: string | null;
        };
        /**
         * @description A card issued to a user. For gift cards, `redemption_code` is returned only
         *     in the creation response; later reads leave it out.
         */
        Card: {
            /**
             * @description `virtual` or `physical`. Plastic is activated from the
             *     platform's stock, has a PIN and a limit under which purchases ask none.
             */
            card_form: string;
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
            /**
             * @description The provider's own reason for a status it set, or for refusing a
             *     close; for operators, not holders.
             */
            provider_status_reason?: string | null;
            /** @description Gift cards only. Present in the creation response and omitted from later reads. */
            redemption_code?: string | null;
            status: components["schemas"]["CardStatus"];
            /**
             * @description Who made the last status change: `holder`, `operator` or
             *     `provider`. Null for cards whose status never changed since issuance,
             *     and for changes made before this was recorded.
             */
            status_source?: string | null;
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
         * @description A card with a live balance from its connector and the billing address it
         *     was issued with. The card's own fields are at the top level.
         */
        CardDetail: components["schemas"]["CardView"] & {
            billing_address?: null | components["schemas"]["Address"];
            books_balance?: null | components["schemas"]["CardBalance"];
            cardholder?: null | components["schemas"]["CardholderView"];
            live_balance?: null | components["schemas"]["CardBalance"];
        };
        /** @description An operator's hold on a card. While it stands, the holder sees the card as frozen and can't unfreeze, top up, reveal or close it, or move money to or from it. The card itself is not changed at the provider. */
        CardModeration: {
            /** @description Why the hold was put, for other operators. */
            note: string;
            /** Format: date-time */
            set_at: string;
            /**
             * Format: uuid
             * @description The operator who put the hold; null when the platform put it.
             */
            set_by?: string | null;
        };
        /** @description A card the user can issue. */
        CardProductView: {
            /** @description Selling points to list on the product card, in order. May be empty. */
            benefits: string[];
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
            /** @description Issuing this card sends the holder's real personal details to the card issuer. Show the consent screen first and send `holder_data_transfer` among the order's `consents`, or give it through `POST /me/consents`; without it the order answers 409 `holder_data_consent_required`. False: the issuer gets no real details. */
            holder_data_required: boolean;
            /**
             * Format: uuid
             * @description Product id. Pass it as `product_id` when creating a card.
             */
            id: string;
            /** @description True for the product a card gets when none is chosen. */
            is_default: boolean;
            name: string;
            price?: null | components["schemas"]["ProductPrice"];
            starting_balance?: null | components["schemas"]["MoneyView"];
            /** @description One line under the name, or null. */
            tagline?: string | null;
            /** @description What a card on this product costs to use: per payment, per decline that was the holder's doing, per cash withdrawal. A fee the card can't cover is owed and paid from the next top-up. */
            tariff: components["schemas"]["CardTariffView"];
            /** @description Picture for the product tile, absolute URL, or null: show the design then. */
            tile_image_url?: string | null;
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
        CardStatus: "pending_payment" | "pending" | "active" | "frozen" | "terminating" | "terminated" | "redeemed" | "failed";
        /**
         * @description One card of the stock, as operators see it. The activation code is not
         *     here: it is read once, sealed, when the card is activated.
         */
        CardStock: {
            /** Format: date-time */
            activated_at?: string | null;
            /** Format: date-time */
            assigned_at?: string | null;
            /** @description The operator's name for the batch it came with. */
            batch_label?: string | null;
            /**
             * Format: uuid
             * @description The card this plastic became, once activated.
             */
            card_id?: string | null;
            connector_slug: string;
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            /** @description The last four digits printed on the plastic. */
            last4: string;
            program_code: string;
            /** @description How and when the plastic was sent, in the operator's words. */
            shipped_note?: string | null;
            /** @description `in_stock`, `assigned` (bound to a holder, on its way), `activated` or `void`. */
            status: string;
            /** Format: date-time */
            updated_at: string;
            /**
             * Format: uuid
             * @description The holder the card is bound to, once it is.
             */
            user_id?: string | null;
            void_reason?: string | null;
        };
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
            /**
             * Format: date-time
             * @description When the platform last asked the provider about a top-up it had not
             *     finished; null when it never had to.
             */
            provider_checked_at?: string | null;
            /** @description The provider's reference for the reload, once it answered. */
            provider_reload_reference?: string | null;
            /** @description The operator's note on a returned or written-off top-up. */
            resolution_note?: string | null;
            /**
             * @description Who settled a top-up the provider had not finished at once: `event`
             *     (the provider reported), `poll` (the platform asked) or `operator`.
             */
            resolved_by?: string | null;
            /**
             * @description `pending` (asked of the provider, or accepted by it and not loaded
             *     yet), `confirmed`, `failed`, `stalled` (the provider has had it longer
             *     than the platform waits; the money is held on the card's transit
             *     account for an operator), `returned` (an operator sent a stalled
             *     top-up back to the wallet) or `written_off` (an operator gave it up).
             */
            status: string;
            /** Format: date-time */
            updated_at: string;
            /** @description What the wallet paid, decimal string, in `wallet_currency`. */
            wallet_amount: string;
            wallet_currency: string;
        };
        /** @description One transfer attempt as stored in `card_transfers`. */
        CardTransfer: {
            amount: string;
            /** Format: date-time */
            created_at: string;
            currency: string;
            /** @description Why it stopped, for a `failed` or `on_wallet` transfer. */
            failure_reason?: string | null;
            /** Format: uuid */
            from_card_id: string;
            /** Format: uuid */
            id: string;
            /**
             * @description `pending`, `confirmed`, `on_wallet` or `failed`. `on_wallet` means the
             *     money came off the source card but could not be put on the
             *     destination, so it is sitting on the wallet.
             */
            status: string;
            /** Format: uuid */
            to_card_id: string;
            /** Format: date-time */
            updated_at: string;
        };
        /** @description What a card on a product costs to use, on top of the operations
         *     themselves. Every line is zero when the product charges nothing for it. */
        CardTariffView: {
            /** @description Fee per cash withdrawal as a share of its amount, in percent, decimal string. */
            cash_withdrawal_percent: string;
            /** @description Fixed fee per cash withdrawal, decimal string. Charged instead of the payment fee. */
            cash_withdrawal_fixed: string;
            /** @description Currency of the fixed amounts: the card's. Null for a product held in several currencies, where they are in the card's own currency. */
            currency?: string | null;
            /** @description Fee per payment declined through the holder's own doing (not enough money, wrong card details, a frozen card, a subscription that was not cancelled with the merchant), decimal string. A decline caused by the issuer or by us costs nothing. */
            decline: string;
            /** @description Fixed fee per settled card payment, decimal string, e.g. "0.3". */
            operation_fixed: string;
            /** @description Fee per settled card payment as a share of its amount, in percent, decimal string, e.g. "1.5". */
            operation_percent: string;
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
            /** @description Why the card can't be closed yet: `first_purchase_required` when the provider only closes it after a purchase. Null otherwise. */
            close_blocked?: string | null;
            /** @description The design shown for this card: the one the holder picked, else the product's, else the deployment default. */
            design: components["schemas"]["DesignRef"];
            moderation?: null | components["schemas"]["CardModeration"];
            product?: null | components["schemas"]["ProductRef"];
            /** @description Top-ups the issuer has held too long, summed, decimal string in the card's currency: the money waits until the issuer answers or an operator decides. Null when there are none. */
            topups_held?: string | null;
            /** @description Top-ups the issuer has accepted and not loaded onto the card yet, summed, decimal string in the card's currency. Null when there are none. */
            topups_pending?: string | null;
        };
        /**
         * @description What the provider expects behind a cardholder record.
         * @enum {string}
         */
        CardholderPolicy: "synthetic" | "verified";
        /**
         * @description Where the holder's details came from.
         * @enum {string}
         */
        CardholderSource: "generated" | "provided" | "mixed";
        /**
         * @description The person a card is registered to at its provider: what the holder
         *     pays with at a checkout and what an operator sees on the card.
         */
        CardholderView: {
            /** @description Billing address: the one to enter at a checkout that asks for it. */
            address: components["schemas"]["Address"];
            /** @description `YYYY-MM-DD`. A made-up holder is always over 21. */
            birth_date: string;
            /** Format: date-time */
            created_at: string;
            /** @description The holder's mailbox at a domain the platform owns. Mail the provider sends there is relayed to the user. */
            email: string;
            first_name: string;
            /**
             * Format: uuid
             * @description Holder id. One holder serves every card of the user on the same program.
             */
            id: string;
            last_name: string;
            /** @description E.164. A made-up number belongs to the address country and need not ring anywhere: providers send codes another way. */
            phone: string;
            /** @description `generated` (made up by the platform), `provided` (sent with the issuance request) or `mixed`. */
            source: components["schemas"]["CardholderSource"];
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
        ChangePasswordRequest: {
            /** @description The password currently on the account. */
            current_password: string;
            /**
             * @description At least 12 characters with a lower-case letter, an upper-case letter
             *     and a digit; must differ from the current password.
             */
            new_password: string;
            /** @description Keep this browser signed in, as at login. */
            remember_me?: boolean;
        };
        ChangePasswordResult: {
            /**
             * Format: int64
             * @description Number of other sessions that were signed out.
             */
            revoked_sessions: number;
        };
        Changelog: {
            /** @description Languages the changelog is available in. */
            available_langs: string[];
            /** @description Language of `markdown`. */
            lang: string;
            /** @description The changelog as Markdown, newest version first. */
            markdown: string;
            /** @description Platform version this deployment runs (TKL). */
            version: string;
        };
        ChannelHealth: {
            /** @description `telegram`, `push`, `email` or `sms`. */
            channel: string;
            /** Format: int64 */
            delivered: number;
            /**
             * Format: int64
             * @description Failed for good.
             */
            failed: number;
            /** @description Failures by notification type, e.g. `card_otp`, `broadcast`. */
            failed_by_event: Record<string, never>;
            /** @description Failures by reason. */
            failed_by_reason: Record<string, never>;
            /**
             * Format: int64
             * @description Distinct users those failures hit.
             */
            users_failed: number;
        };
        /** @description One channel of a broadcast version. */
        ChannelReport: {
            /** @description `telegram`, `push`, `email` or `sms`. */
            channel: string;
            /** Format: int64 */
            delivered: number;
            /**
             * Format: int64
             * @description Failed for good.
             */
            failed: number;
            /** @description Failures by reason: `bot_blocked`, `chat_not_found`, `user_deactivated`, `subscription_gone`, `address_bounced`, `provider_rejected`, `other`. */
            failed_by_reason: Record<string, never>;
            /**
             * Format: int64
             * @description Failed so far with an error that is being retried.
             */
            retrying: number;
            /**
             * Format: int64
             * @description Pings the worker took up on this channel.
             */
            sent: number;
        };
        /**
         * @description Whether a document can be broadcast on one channel right now, and why not
         *     if it cannot.
         */
        ChannelState: {
            /**
             * @description Reason when `can_send` is false: `not_published`, `not_for_users`,
             *     `channel_disabled`, `no_subscribers`, `already_sent` or `in_flight`.
             */
            blocked_by?: string | null;
            /** @description True when a broadcast on this channel is allowed right now. */
            can_send: boolean;
            /** @description Channel name: `email` or `telegram`. */
            channel: string;
            /** @description True when an older version was already sent, so the next send is a re-send. */
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
        CodeDetail: components["schemas"]["CodeView"] & {
            /** @description The latest uses, newest first. */
            redemptions: components["schemas"]["RedemptionView"][];
        };
        /** @description A code with its program's name. */
        CodeView: {
            code: string;
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            created_by?: string | null;
            /** Format: uuid */
            id: string;
            /** @description `promo` or `referral`. */
            kind: string;
            /**
             * Format: int32
             * @description Uses of this code; null = only the program's limit.
             */
            max_redemptions?: number | null;
            note?: string | null;
            /** @description Their e-mail, in the operator's view only. */
            owner_email?: string | null;
            /**
             * Format: uuid
             * @description The person a referral code belongs to.
             */
            owner_user_id?: string | null;
            /** Format: uuid */
            program_id: string;
            program_name: string;
            /**
             * Format: int32
             * @description Uses so far, those still in flight included.
             */
            redemptions_count: number;
            /** @description `active` or `disabled`. */
            status: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            valid_from?: string | null;
            /** Format: date-time */
            valid_until?: string | null;
        };
        CodesPage: {
            items: components["schemas"]["CodeView"][];
            /** Format: int64 */
            total: number;
        };
        CompensationPage: {
            items: components["schemas"]["FailedCompensation"][];
            /** Format: int64 */
            total: number;
        };
        /**
         * @description Where a lane's configuration came from.
         * @enum {string}
         */
        ConfigSource: "settings" | "env";
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
        ConnectorEventPage: {
            items: components["schemas"]["FailedConnectorEvent"][];
            /** Format: int64 */
            total: number;
        };
        /** @description A job over a connector's cards and how far it got. */
        ConnectorJob: {
            connector_slug: string;
            /** Format: date-time */
            created_at: string;
            /**
             * Format: int32
             * @description Cards closed, or closing at the provider.
             */
            done: number;
            /**
             * Format: int32
             * @description Cards the provider refused to close.
             */
            failed: number;
            /** @description The refused cards, with the provider's reason. Empty until the job ran. */
            failed_cards: components["schemas"]["FailedCard"][];
            /** Format: date-time */
            finished_at?: string | null;
            /** Format: uuid */
            id: string;
            /** @description `terminate_all`. */
            kind: string;
            reason: string;
            /**
             * Format: uuid
             * @description The job this one retries, when it only goes over refused cards.
             */
            retry_of?: string | null;
            /** Format: date-time */
            started_at?: string | null;
            /** Format: uuid */
            started_by?: string | null;
            /** @description `queued`, `running` or `done`. A `done` job may have refused cards; see `failed`. */
            status: string;
            /**
             * Format: int32
             * @description Cards the job goes through.
             */
            total: number;
            /** Format: date-time */
            updated_at: string;
        };
        ConnectorProviderEvents: {
            /**
             * Format: int64
             * @description The window the totals cover, in days.
             */
            days: number;
            /** @description The latest events themselves, newest first. */
            recent: components["schemas"]["ProviderEventRow"][];
            /** @description Fees and credits summed per day, event type, kind and currency, newest day first. */
            totals: components["schemas"]["DailyTotal"][];
        };
        ConnectorStats: {
            /** @description What `amount` adds up for this role, e.g. "payment amount" or "deposit amount". */
            amount_basis: string;
            /** @description Counts and totals grouped by status and currency. */
            buckets: components["schemas"]["StatBucket"][];
            /** @description `funder`, `issuer`, `acquirer` or `settler`. */
            role: string;
        };
        /** @description What pulling one connector's catalog did. */
        ConnectorSyncOutcome: {
            /** @description Programs seen for the first time. They arrive hidden, at the end of the storefront. */
            arrived: string[];
            connector_slug: string;
            /** @description Programs the provider no longer offers but cards exist on: disabled, kept for history. */
            disabled: string[];
            /** @description Set when the connector could not be reached; the other connectors are still pulled. */
            error?: string | null;
            /** @description Programs the provider no longer offers and nobody holds a card on: removed. */
            removed: string[];
        };
        /**
         * @description A connector as shown on every read. Secrets appear only as short previews
         *     so an operator can recognise them but not recover the value.
         */
        ConnectorView: {
            /** @description Card connectors only: the provider accounts to watch (keys from the balances endpoint) and the balance, decimal string, under which operators are told once. Empty when nothing is watched. */
            balance_alerts: Record<string, never>;
            /**
             * Format: int32
             * @description Order in which connectors of the same role are tried. Lower comes first.
             */
            cascade_priority: number;
            /**
             * Format: date-time
             * @description When the connector last reported its version. Null if it never has.
             */
            compat_checked_at?: string | null;
            /** @description Why the connector is incompatible, naming its version and the platform versions it supports. Null unless `compat_status` is `incompatible`. */
            compat_note?: string | null;
            /** @description Whether the connector supports the platform version this deployment runs, as of its last configuration poll: `unknown` (it hasn't reported yet, or is older than version reporting), `compatible` or `incompatible`. An incompatible connector takes no traffic and can't be edited until its version matches. */
            compat_status: string;
            /** @description Configuration variable names with each value redacted. Empty when none are set. Use the configuration endpoint to read plaintext. */
            configuration_variables_preview: {
                [key: string]: string;
            };
            /**
             * Format: date-time
             * @description When the connector was created.
             */
            created_at: string;
            /** @description Funding connectors only: payment methods it takes, shown to users by `GET /me/funding-options`. */
            deposit_methods: string[];
            /** @description Funding connectors only: where top-ups may land. `wallet` (the default): on the wallet only. `the connector`: straight onto cards only, for a deployment without a wallet. `mixed`: either, as the user picks. Always `wallet` for other roles. */
            funder_mode: string;
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
         *       "name": "Groceries",
         *       "product_id": "6c1c0a3e-1b7e-4b0e-9d9e-2f0f6f9a1234"
         *     }
         */
        CreateCardBody: {
            /** @description The most bonuses to use; leave it out to use as many as the price allows. `POST /me/bonus/preview` shows the numbers first. */
            bonus_amount?: string | null;
            /** @description ISO 4217 code the card is held in. Optional with `product_id`; the product names the currency, and a different code here returns 400 `product_mismatch`. May differ from the wallet currency, in which case the price is converted at issuance. */
            currency?: string | null;
            customer?: null | components["schemas"]["CustomerInfo"];
            /**
             * Format: uuid
             * @description One of the product's designs. Omit or send `null` for the product's default design.
             */
            design_id?: string | null;
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
            /** @description A promo code for the card's price. Its discount comes off before bonuses. A code that can't be used answers 400 `promo_code_*` with the reason. Without one, the code you signed up with applies when it covers cards. */
            promo_code?: string | null;
            type?: null | components["schemas"]["CardType"];
            /** @description Pay part of the price with bonuses. On by default whenever you have bonuses; send `false` to pay it all from the wallet. The response's `bonus` says how many were used and the price before and after. */
            use_bonus?: boolean | null;
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
            /** @description The most bonuses to add; leave it out to add as many as allowed. `POST /me/bonus/preview` shows the numbers first. */
            bonus_amount?: string | null;
            /**
             * Format: uuid
             * @description Top up this card directly instead of the wallet. The card must be yours, active and prepaid. Whether a funding connector allows it is shown by `GET /me/funding-options`; one that tops up the wallet only answers 400 `target_not_allowed`. A payment in another currency than the card's needs a quote made with this `card_id`.
             */
            card_id?: string | null;
            /** @description ISO 4217 code of the amount being paid. */
            currency: string;
            customer?: null | components["schemas"]["CustomerInfo"];
            /** @description Optional. Slug of the funding connector to use; when omitted, the first configured one handles the deposit. An unknown slug returns 400. */
            funder_slug?: string | null;
            issue_card?: null | components["schemas"]["CreateCardBody"];
            /** @description Key/value pairs passed to the funding connector and stored with the deposit. Two keys are understood across connectors: `return_url`, where the provider sends the user back after a 3-D Secure step (used with `redirect_required`), and on test deployments with the mock funder `mock_scenario`, which picks the outcome: `happy` (confirmed at once, the default), `pending` (confirmed about 15 seconds later), `redirect` (a hosted confirmation page where the user approves or declines) or `fail`. Other keys are provider specific. */
            metadata?: {
                [key: string]: string;
            };
            /** @description One of `card`, `crypto`, `bank_transfer`, `sbp`. */
            method: components["schemas"]["DepositMethod"];
            /** @description A promo code for this top-up, to the wallet or to a card. Its discount comes off the commission; bonuses or a gift that come with the code arrive once the top-up is confirmed. A code that can't be used answers 400 `promo_code_*` with the reason. `POST /me/codes/validate` checks it first. */
            promo_code?: string | null;
            /**
             * Format: uuid
             * @description Required when `currency` differs from the wallet currency: id of the quote from `POST /me/deposits/quotes` this deposit executes against.
             */
            quote_id?: string | null;
            /** @description Add your bonuses on top of the top-up: you pay `amount`, the wallet gets `amount` plus what the bonuses add. On by default whenever you have bonuses that can go towards a top-up (only bonuses that came with a payment can). Send `false` to top up without them. The response shows `bonus_units` and `bonus_value` when bonuses were added. */
            use_bonus?: boolean | null;
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
            /**
             * Format: uuid
             * @description Shop the endpoint belongs to. Omitted means the default shop.
             */
            shop_id?: string | null;
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
            /**
             * Format: uuid
             * @description Quote a top-up of this card instead of the wallet: the amount is credited in the card's currency. Pass the same `card_id` to `POST /me/deposits`.
             */
            card_id?: string | null;
            /** @description The funding connector the deposit will go through (`funder_slug` of `POST /me/deposits`). With `method`, the quote is priced on that method's own terms: its fee, its rate source, its lifetime and its limits. Without it, on the deployment-wide terms. */
            connector_slug?: string | null;
            /** @description ISO 4217 code of the currency paid; must differ from the currency credited. */
            currency: string;
            method?: null | components["schemas"]["DepositMethod"];
            /** @description Quote into this currency instead of the wallet's: the currency of a card issued with the top-up (`issue_card`). Ignored when `card_id` is set. */
            target_currency?: string | null;
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
            attribution?: null | components["schemas"]["SignupAttribution"];
            /** @description A promo or referral code to sign up with. An unknown or expired code doesn't stop the sign-up: the account is created and `code_result` says why the code was not applied. Ignored on login. */
            code?: string | null;
            /** @description Account email address. */
            email: string;
            /** @description Account password. */
            password: string;
            /** @description Keep this browser signed in: the response then carries a `remember_token` for `POST /auth/refresh`. For accounts with a second factor, send it again with the code (`/auth/login/totp`, `/auth/login/otp/verify`, `/auth/login/totp-setup`). */
            remember_me?: boolean;
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
        /** @description One day's total of one kind of event in one currency. */
        DailyTotal: {
            amount: string;
            /**
             * Format: int64
             * @description How many events made the total.
             */
            count: number;
            currency: string;
            /** @description The day, `YYYY-MM-DD`, in UTC. */
            day: string;
            event_type: string;
            kind: string;
        };
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
        DeadLetter: {
            /** Format: int32 */
            attempts: number;
            /** @description `email`, `push`, `telegram`, `sms` or `inbox`. */
            channel?: string | null;
            /** @description Notification type, e.g. `card_created`. */
            event_type?: string | null;
            /** Format: date-time */
            failed_at: string;
            /** Format: uuid */
            id: string;
            /** @description What the channel answered the last time. */
            last_error: string;
            msg_id: string;
            /** @description Why it can't be sent again, when it can't. */
            not_retryable_reason?: string | null;
            /** Format: date-time */
            retried_at?: string | null;
            /** Format: uuid */
            retried_by?: string | null;
            /**
             * @description False when the message can't be sent again: it carried a one-time
             *     code, or it never was a readable notification.
             */
            retryable: boolean;
            subject: string;
            /** @description Where it was going: an address, a chat id, a push endpoint. */
            to?: string | null;
            /** Format: uuid */
            user_id?: string | null;
        };
        DeadLetterPage: {
            items: components["schemas"]["DeadLetter"][];
            /**
             * Format: int64
             * @description Rows nobody has retried yet, whatever `state` asked for.
             */
            open: number;
            /**
             * Format: int64
             * @description Rows matching `state`.
             */
            total: number;
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
        /** @description Why a payment didn't go through. */
        DeclineReason: {
            /** @description `insufficient_funds`, `limit_exceeded`, `card_blocked`, `card_expired`, `wrong_details`, `merchant_not_allowed` or `other`. New codes may appear; treat an unknown one as `other`. */
            code: string;
            /** @description The reason in plain words, in the language asked for. */
            text: string;
        };
        DeliveriesReport: {
            channels: components["schemas"]["ChannelHealth"][];
            /** Format: date-time */
            since: string;
        };
        /**
         * @description How the user funds the deposit.
         * @enum {string}
         */
        DepositMethod: "card" | "crypto" | "bank_transfer" | "sbp";
        /** @description The terms to set for one method. Fields left out are cleared. */
        DepositPricingBody: {
            daily_limit_per_user?: string | null;
            /**
             * Format: int64
             * @description 0 to 10000.
             */
            fee_bps: number;
            /** @description `markup` or `commission`. */
            fee_kind: string;
            max_amount?: string | null;
            min_amount?: string | null;
            /**
             * Format: int32
             * @description 30 to 3600, or null for rates.quote_ttl_seconds.
             */
            quote_ttl_seconds?: number | null;
            /** @description A rate source name, or null for rates.fx_provider. */
            rate_provider?: string | null;
            /** @description ISO 4217 code, or null. */
            source_currency?: string | null;
        };
        /** @description What one way of paying through a funding connector costs and allows. */
        DepositPricingView: {
            connector_slug: string;
            /** Format: date-time */
            created_at: string;
            /** @description What one user may deposit this way over 24 hours, confirmed and open deposits together; null or 0 for no limit. */
            daily_limit_per_user?: string | null;
            /**
             * Format: int64
             * @description The fee in basis points (2000 = 20 %).
             */
            fee_bps: number;
            /** @description `markup`: the fee is in the rate the user sees. `commission`: the rate is the provider's and the fee is a line of its own. */
            fee_kind: string;
            /** @description Largest single deposit, in the source currency; null or 0 for no cap. */
            max_amount?: string | null;
            /** @description `card`, `crypto`, `bank_transfer` or `sbp`. */
            method: string;
            /** @description Smallest single deposit, in the source currency; null or 0 for no floor. */
            min_amount?: string | null;
            /**
             * Format: int32
             * @description How long a quote stays executable; null reads rates.quote_ttl_seconds.
             */
            quote_ttl_seconds?: number | null;
            /** @description Rate source for this method (`cbr`, `manual`, a name from rates.custom); null reads rates.fx_provider. */
            rate_provider?: string | null;
            /** @description ISO 4217 code the user pays in through this method; null when it is the wallet's. */
            source_currency?: string | null;
            /** Format: date-time */
            updated_at: string;
        };
        /**
         * @description Where a deposit's money goes.
         * @enum {string}
         */
        DepositTarget: "wallet" | "card";
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
         * @description What a discount effect lowers.
         * @enum {string}
         */
        DiscountTarget: "card_issuance" | "funding_commission" | "subscription";
        /** @description A discount a code gives. */
        DiscountView: {
            /** @description For `fixed`: the amount off, decimal string. */
            amount?: string | null;
            /** @description What comes off: `card_issuance` (the card's price), `funding_commission` (the top-up commission) or `subscription` (the monthly fee). */
            applies_to?: string | null;
            /**
             * Format: int32
             * @description For `percent`: basis points off (1000 = 10%).
             */
            bps?: number | null;
            /** @description For `fixed`: its currency. */
            currency?: string | null;
            /** @description `percent` or `fixed`. */
            kind: string;
        };
        /** @description A document as staff see it in the console: every status, every level. */
        Document: {
            /**
             * Format: uuid
             * @description Who created it.
             */
            author_user_id?: string | null;
            /** @description The current text in Markdown. */
            body_markdown: string;
            /**
             * Format: int32
             * @description Number of saved texts; the newest version carries this number.
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
            folder_id: string;
            /** Format: uuid */
            id: string;
            /** @description Language tag such as `en`; empty when unset. */
            locale: string;
            /**
             * Format: int32
             * @description Order among siblings in the folder.
             */
            position: number;
            /**
             * Format: date-time
             * @description When the document was first published.
             */
            published_at?: string | null;
            /** @description Who may read: `public`, `users`, `staff` or `operators`. */
            read_scope: string;
            /** @description The permanent address. Survives moves and renames. */
            slug: string;
            /** @description `draft`, `published` or `archived`. */
            status: string;
            tags: string[];
            title: string;
            /** Format: date-time */
            updated_at: string;
            /**
             * Format: uuid
             * @description Who saved it last.
             */
            updated_by?: string | null;
            /** @description Who may edit: `staff` or `operators`. */
            write_scope: string;
        };
        /** @description A document with its text, history and announcement state. */
        DocumentDetail: components["schemas"]["Document"] & {
            /** @description Broadcast history, newest first. */
            broadcasts: components["schemas"]["BroadcastRow"][];
            /** @description True when you may edit this document. */
            can_edit: boolean;
            category: string;
            /** @description Send state per channel. */
            channels: components["schemas"]["ChannelState"][];
            cover_url?: string | null;
            path: components["schemas"]["PathStep"][];
            read_label: string;
            site_path: string;
            /** @description Saved texts, newest first. */
            versions: components["schemas"]["VersionSummary"][];
            write_label: string;
            /** @description Your own level: the highest read or write level you may set. */
            your_level: components["schemas"]["Scope"];
        };
        DocumentList: {
            /** @description Documents on this page. */
            documents: components["schemas"]["PublicDocument"][];
            /**
             * Format: int64
             * @description 1-based page number.
             */
            page: number;
            /**
             * Format: int64
             * @description Documents per page.
             */
            per_page: number;
            /**
             * Format: int64
             * @description Total number of published documents matching the filters that you may read.
             */
            total: number;
        };
        /** @description A document in a listing: everything but the body. */
        DocumentSummary: {
            /** @description True when you may edit this document. */
            can_edit: boolean;
            /** @description Category key. */
            category: string;
            /** Format: int32 */
            content_version: number;
            cover_url?: string | null;
            excerpt: string;
            /** Format: uuid */
            folder_id: string;
            /** Format: uuid */
            id: string;
            locale: string;
            /** @description Folder trail, root first. */
            path: components["schemas"]["PathStep"][];
            /** Format: int32 */
            position: number;
            /** Format: date-time */
            published_at?: string | null;
            /** @description The read level as a sentence, e.g. "Read by everyone". */
            read_label: string;
            read_scope: components["schemas"]["Scope"];
            /** @description Path under the site root where readers open it. */
            site_path: string;
            slug: string;
            /** @description `draft`, `published` or `archived`. */
            status: string;
            tags: string[];
            title: string;
            /** Format: date-time */
            updated_at: string;
            /** @description The write level as a sentence, e.g. "Edited by staff". */
            write_label: string;
            write_scope: components["schemas"]["Scope"];
        };
        /**
         * @description Fields to change on a document. Anything omitted stays as it is.
         *     Changing the title, excerpt, body or cover saves a new version.
         */
        DocumentUpdate: {
            body_markdown?: string | null;
            /** Format: uuid */
            cover_image_id?: string | null;
            /**
             * Format: date-time
             * @description When the new text takes effect. Only read when the text changes; now when omitted.
             */
            effective_from?: string | null;
            excerpt?: string | null;
            /**
             * Format: uuid
             * @description Move to another folder. The address does not change.
             */
            folder_id?: string | null;
            locale?: string | null;
            /** @description What changed, for the history. Only read when the text changes. */
            note?: string | null;
            /** Format: int32 */
            position?: number | null;
            read_scope?: null | components["schemas"]["Scope"];
            /** @description Changing the address breaks links people hold. Links from other documents keep working. */
            slug?: string | null;
            /** @description `draft`, `published` or `archived`. `published_at` is set the first time. */
            status?: string | null;
            tags?: string[] | null;
            title?: string | null;
            write_scope?: null | components["schemas"]["Scope"];
        };
        /** @description One saved text of a document. */
        DocumentVersion: {
            body_markdown: string;
            /** Format: date-time */
            changed_at: string;
            /**
             * Format: uuid
             * @description Who saved it.
             */
            changed_by?: string | null;
            /** Format: uuid */
            cover_image_id?: string | null;
            /** Format: uuid */
            document_id: string;
            /**
             * Format: date-time
             * @description When this text takes effect.
             */
            effective_from: string;
            excerpt: string;
            /** Format: uuid */
            id: string;
            /** @description What changed, in the editor's words. */
            note: string;
            title: string;
            /**
             * Format: int32
             * @description Counts up from 1.
             */
            version: number;
        };
        DriftPage: {
            items: components["schemas"]["DriftingCard"][];
            /** Format: int64 */
            total: number;
        };
        /** @description A card whose balance here differs from the provider's. */
        DriftingCard: {
            /** Format: uuid */
            card_id: string;
            connector_slug: string;
            currency: string;
            /**
             * @description Our balance minus the provider's: negative means the provider shows
             *     more than we do.
             */
            drift: string;
            last4?: string | null;
            /**
             * Format: date-time
             * @description When operators were told about it.
             */
            reported_at: string;
            /**
             * Format: date-time
             * @description Since when the gap has been there.
             */
            since?: string | null;
            user_email?: string | null;
            /** Format: uuid */
            user_id: string;
        };
        /**
         * @description One thing a program does. A program's effects run in order; the ones for
         *     the person using the code are applied when the operation completes, the
         *     `referrer_reward` ones pay the owner of a referral code.
         */
        Effect: {
            /** Format: int32 */
            days?: number | null;
            /** @enum {string} */
            kind: "gift_subscription";
            /** Format: uuid */
            tier_id: string;
        } | {
            amount?: string | null;
            /** Format: int32 */
            bps?: number | null;
            currency?: string | null;
            /** @enum {string} */
            kind: "discount";
            target: components["schemas"]["DiscountTarget"];
        } | {
            amount: string;
            /** @enum {string} */
            kind: "bonus_credit";
        } | {
            /** @enum {string} */
            kind: "grant_referral_code";
            /** Format: uuid */
            program_id: string;
        } | {
            amount?: string | null;
            /** Format: int32 */
            bps?: number | null;
            /** @enum {string} */
            kind: "referrer_reward";
            min_amount?: string | null;
            min_currency?: string | null;
            on: components["schemas"]["RewardEvent"];
        };
        /** @description A finished email. */
        EmailParts: {
            /** @description The HTML part. */
            html: string;
            /** @description The subject line: the message's title. */
            subject: string;
            /** @description The plain-text part. */
            text: string;
        };
        /** @description A broadcast version's emails. */
        EmailReport: {
            /**
             * Format: int64
             * @description Returned as undeliverable.
             */
            bounced: number;
            /**
             * Format: int64
             * @description A link in it was clicked.
             */
            clicked: number;
            /**
             * Format: int64
             * @description Accepted by the recipient's mail server.
             */
            delivered: number;
            /**
             * Format: int64
             * @description Opened at least once. Mail clients that block images are not counted.
             */
            opened: number;
            /**
             * Format: int64
             * @description Handed to the provider.
             */
            sent: number;
            /**
             * @description Whether the provider reports deliveries, opens and clicks. When it
             *     does not (SMTP), only `sent` is known.
             */
            tracked: boolean;
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
        /** @description An announcement of a document that didn't go out. */
        FailedAnnouncement: {
            /** @description `email` or `telegram`. */
            channel: string;
            /** Format: int32 */
            content_version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            document_id: string;
            /** @description What went wrong. */
            error?: string | null;
            /** Format: date-time */
            finished_at?: string | null;
            /**
             * Format: uuid
             * @description The attempt's id.
             */
            id: string;
            slug: string;
            title: string;
        };
        /** @description A card the provider would not close, as kept on the job. */
        FailedCard: {
            /** Format: uuid */
            card_id: string;
            last4?: string | null;
            reason: string;
        };
        /** @description A step that should have undone a failed operation and failed itself. */
        FailedCompensation: {
            /** @description How much is stuck, when it's money. */
            amount?: string | null;
            /**
             * @description References that help find the movement: the hold key, the ledger
             *     reference, the amount on the card when the wallet paid in another
             *     currency.
             */
            context: Record<string, never>;
            /** Format: date-time */
            created_at: string;
            currency?: string | null;
            /** @description What the failed step said. */
            error: string;
            /** @description What to check and do before closing it. */
            hint: string;
            /** Format: uuid */
            id: string;
            /** @description What failed to happen, e.g. `card_load_refund`. */
            kind: string;
            /** Format: date-time */
            last_failed_at: string;
            object_id: string;
            /** @description `card`, `deposit`, `card_topup`, `card_transfer` or `subscription`. */
            object_type: string;
            /**
             * Format: int32
             * @description How many times this step failed for this object while open.
             */
            occurrences: number;
            /** Format: uuid */
            organization_id?: string | null;
            organization_name?: string | null;
            resolution_note?: string | null;
            /** Format: date-time */
            resolved_at?: string | null;
            /**
             * Format: uuid
             * @description The operator who closed it. Empty when the system did.
             */
            resolved_by?: string | null;
            resolved_by_email?: string | null;
            /** @description One line on what is stuck. */
            title: string;
            user_email?: string | null;
            /**
             * Format: uuid
             * @description Whose money it is, when that's known.
             */
            user_id?: string | null;
        };
        /** @description An event from a connector that wasn't handled. */
        FailedConnectorEvent: {
            /**
             * Format: int32
             * @description How many times it was run, counting resends from the connector.
             */
            attempts: number;
            event_type: string;
            /**
             * Format: date-time
             * @description When the last run failed.
             */
            failed_at?: string | null;
            /** Format: uuid */
            id: string;
            /** @description What the last run said. Empty when the run never reported back. */
            last_error?: string | null;
            /** @description Why not, when `retryable` is false. */
            not_retryable_reason?: string | null;
            /** @description The provider's own id for the event. */
            raw_provider_event_id: string;
            /** Format: date-time */
            received_at: string;
            /** @description False when the event can't be run again from here. */
            retryable: boolean;
            /** @description The connector that sent it. */
            slug: string;
        };
        /**
         * @description A message in the cardholders' inbox the worker gave up on. It is still in
         *     the mailbox, marked read.
         */
        FailedHolderMail: {
            /** Format: int32 */
            attempts: number;
            /** Format: date-time */
            first_failed_at: string;
            /** @description IMAP folder and UID of the message. */
            folder: string;
            from_address?: string | null;
            /** Format: date-time */
            gave_up_at?: string | null;
            /** Format: uuid */
            id: string;
            last_error: string;
            message_id?: string | null;
            subject?: string | null;
            /** Format: int64 */
            uid: number;
        };
        /** @description A webhook that ran out of attempts. */
        FailedWebhook: {
            /** Format: int32 */
            attempts: number;
            /**
             * Format: date-time
             * @description When the event was queued.
             */
            created_at: string;
            /**
             * @description Whether that endpoint still takes deliveries. A retry only goes out
             *     to an active endpoint.
             */
            endpoint_active: boolean;
            /**
             * Format: uuid
             * @description The endpoint it was meant for, when it went to one of the merchant's
             *     endpoints rather than the single webhook URL.
             */
            endpoint_id?: string | null;
            event_type: string;
            /**
             * Format: date-time
             * @description When the last attempt failed.
             */
            failed_at: string;
            /** Format: uuid */
            id: string;
            last_error?: string | null;
            /**
             * Format: uuid
             * @description Set for a merchant's webhook.
             */
            merchant_id?: string | null;
            /**
             * Format: uuid
             * @description Set for an organization's webhook.
             */
            organization_id?: string | null;
            /** @description Whose webhook it is: the merchant's or the organization's legal name. */
            owner_name?: string | null;
            url: string;
        };
        /** @description A folder in the tree. The four at the top are the categories. */
        Folder: {
            /** Format: date-time */
            created_at: string;
            /** @description Read level a new document in this folder starts with. */
            default_read_scope: string;
            description: string;
            /** Format: uuid */
            id: string;
            /** @description Path segment, unique among siblings. */
            key: string;
            /**
             * Format: uuid
             * @description Absent on a category.
             */
            parent_id?: string | null;
            /**
             * Format: int32
             * @description Order among siblings.
             */
            position: number;
            title: string;
            /** Format: date-time */
            updated_at: string;
        };
        /** @description Fields to change on a folder. Anything omitted stays as it is. */
        FolderUpdate: {
            default_read_scope?: null | components["schemas"]["Scope"];
            description?: string | null;
            key?: string | null;
            /**
             * Format: uuid
             * @description Move the folder. Categories cannot be moved.
             */
            parent_id?: string | null;
            /** Format: int32 */
            position?: number | null;
            title?: string | null;
        };
        ForceSyncBody: {
            /** @description Optional note for the audit log. */
            note?: string | null;
        };
        /** @description What a sync with the provider did. */
        ForceSyncResult: {
            /** @description The card's balance on the platform before the sync. */
            books_before: string;
            /** Format: uuid */
            card_id: string;
            currency: string;
            /**
             * @description What was recorded on the platform's books to match: positive in,
             *     negative out, zero when they already agreed.
             */
            posted: string;
            /** @description The balance the provider reported for the card just now. */
            provider: string;
        };
        FreezeBody: {
            /** @description Why the card is frozen. Stored on the card. May be empty. */
            reason?: string;
        };
        /**
         * @description Where a funding connector's top-ups may land.
         * @enum {string}
         */
        FunderMode: "wallet" | "spool" | "mixed";
        /**
         * @description One way to top up: a funding connector, where its top-ups may land and
         *     how it takes payment.
         */
        FundingOptionView: {
            /** @description Whether a new card can be issued with a top-up through it (`issue_card` on `POST /me/deposits`). */
            issue_card: boolean;
            /** @description What each method costs and allows: the fee and its kind, the quote lifetime, the limits. Draw the form from this. */
            method_terms: components["schemas"]["MethodTermsView"][];
            /** @description Payment methods it takes: `card`, `crypto`, `bank_transfer`. */
            methods: components["schemas"]["DepositMethod"][];
            /** @description `wallet`: top-ups land on the wallet. `the connector`: on cards only. `mixed`: either. */
            mode: components["schemas"]["FunderMode"];
            /** @description Pass it as `funder_slug` to `POST /me/deposits`. */
            slug: string;
            /** @description Where a top-up through it may land: `wallet`, `card`, or both. */
            targets: components["schemas"]["DepositTarget"][];
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
        /**
         * @description Where the made-up holder should live. Everything is optional: the
         *     program's country and state apply when named, the deployment's default
         *     country otherwise.
         */
        GenerateCardholderBody: {
            /** @description Card connector of the program. */
            connector_slug?: string | null;
            /** @description Country to place the holder in, ISO 3166-1 alpha-2. Wins over the program's. */
            country?: string | null;
            /** @description Program id as the provider reports it. With `connector_slug`, the program's country and state are used. */
            program_code?: string | null;
            /** @description State or region within the country, e.g. `CA` or `US-CA`. Wins over the program's. */
            state?: string | null;
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
            /** @description Platform version (TKL): the version other services check their compatibility against. */
            platform_version: string;
            /** @description Always `ok`. */
            status: string;
            /** @description Version of the running API build. */
            version: string;
        };
        /** @description The card an entry is about. */
        HistoryCard: {
            /** Format: uuid */
            id: string;
            /** @description Last four digits; null while the issuer hasn't sent them. */
            last4?: string | null;
            /** @description The name the holder sees. */
            name?: string | null;
        };
        /** @description One thing that happened to the user's money. */
        HistoryItem: {
            /** @description The amount in the currency the operation happened in. For `bonus` the currency is `BNS` and the amount is a number of bonuses, not money. */
            amount: components["schemas"]["Amount"];
            card?: null | components["schemas"]["HistoryCard"];
            counter_amount?: null | components["schemas"]["Amount"];
            decline_reason?: null | components["schemas"]["DeclineReason"];
            /** @description `out` (money left the user), `in` (money came to the user) or `internal` (moved between the user's own wallet and cards). */
            direction: string;
            fee?: null | components["schemas"]["Amount"];
            /** @description Conversion rate between `amount` and `counter_amount`, as recorded at the time. */
            fx_rate?: string | null;
            /** @description Stable id of the entry, unique across kinds. */
            id: string;
            /** @description `card_purchase`, `card_refund`, `card_issued`, `card_topup`, `card_transfer`, `wallet_deposit`, `card_deposit` (a top-up that went straight onto a card; `pending` until the card is loaded), `deposit_refund`, `fee`, `balance_adjustment`, `bonus`, `card_fee` (a fee for using the card: a payment, a declined payment, a cash withdrawal) or `debt_payment` (money that paid card fees owed). More kinds will be added; show an unknown one with its `title`, `amount` and `status`. */
            kind: string;
            merchant?: null | components["schemas"]["Merchant"];
            /** Format: date-time */
            occurred_at: string;
            /** @description `completed`, `pending` (not finished yet), `declined`, `reversed` (an authorisation that was released) or `failed`. */
            status: string;
            /** @description Short description in the language asked for: the merchant, or what the operation was. */
            title: string;
            to_card?: null | components["schemas"]["HistoryCard"];
        };
        HistoryPage: {
            items: components["schemas"]["HistoryItem"][];
            /** @description Pass as `cursor` for the next, older page; null on the last page. */
            next_cursor?: string | null;
        };
        HolderMailPage: {
            items: components["schemas"]["FailedHolderMail"][];
            /** Format: int64 */
            total: number;
        };
        /** @description Metadata of an uploaded image. The bytes are served by the image endpoint. */
        ImageMeta: {
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
        ImageView: components["schemas"]["ImageMeta"] & {
            /** @description Public URL to use in document bodies. */
            url: string;
        };
        ImportStockBody: {
            /** @description Your name for the batch, e.g. the shipment number. */
            batch_label?: string | null;
            /** @description The cards. Up to 5000 per call. */
            cards: components["schemas"]["StockCardBody"][];
            /** @description The physical program of the connector these cards belong to. */
            program_code: string;
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
        /** @description Someone a referrer invited, without anything that identifies them. */
        InvitedView: {
            /** @description Whether they have a card yet. */
            has_card: boolean;
            /** @description Whether they have topped up yet. */
            has_topped_up: boolean;
            /**
             * Format: date-time
             * @description When they signed up.
             */
            joined_at: string;
            /** @description Bonuses they brought the referrer so far, decimal string. */
            rewarded: string;
        };
        /** @description Issuance settings of a program. */
        IssuanceBody: {
            /** @description Country a made-up holder's address and phone belong to, ISO 3166-1 alpha-2. `null` or empty: the deployment's default country. */
            cardholder_country?: string | null;
            /** @description State or region of a made-up holder's address, e.g. `CA` or `US-CA`. `null` or empty: any state of the country. */
            cardholder_state?: string | null;
            /** @description The program sends the holder's real details to the issuer: issue its cards only to holders who consented to that. */
            holder_data_required?: boolean | null;
            /**
             * Format: int32
             * @description Order in which this connector's programs are tried when the buyer does not choose. Lower first.
             */
            priority?: number | null;
            /** @description `active` or `disabled`. */
            status?: string | null;
        };
        /** @description How bonuses changed the price of a new card. */
        IssuanceBonus: {
            /** @description What the bonuses covered, decimal string. */
            covered: string;
            /** @description ISO 4217 code of the three amounts: the currency the wallet paid in. */
            currency: string;
            /** @description What the wallet paid ("now"), decimal string. */
            paid: string;
            /** @description The price before bonuses ("was"), decimal string. */
            price: string;
            /** @description Bonuses used. */
            units: string;
        };
        /**
         * @description Where a product comes from and how a card on it is issued. Operator
         *     information: none of it reaches a buyer.
         */
        IssuanceInfo: {
            /** @description Card BIN, if the provider reports one. */
            bin?: string | null;
            /** @description `virtual` or `physical`, as the connector declares it. A physical program's cards are activated from the connector's stock, never created. */
            card_form: string;
            /** @description `credit`, `prepaid` or `gift`. */
            card_type: string;
            /** @description Country a made-up holder's address and phone belong to, ISO 3166-1 alpha-2. Null: the deployment's default country. */
            cardholder_country?: string | null;
            /** @description Who the cardholder may be, as the provider declares it. `synthetic`: the platform makes up a plausible holder when the request carries none. `verified`: only a real person's verified details; nothing is made up, and an issuance without them is refused. */
            cardholder_policy: components["schemas"]["CardholderPolicy"];
            /** @description State or region of a made-up holder's address, for countries that have them. Null: any state of the country. */
            cardholder_state?: string | null;
            /** @description False when the connector is disabled or is not an issuer: nothing on it can be sold. */
            connector_active: boolean;
            /** @description Slug of the card connector the program belongs to. */
            connector_slug: string;
            /** @description The holder's real details go to the issuer with every card on this program. A card is then issued only to a holder who consented to that (`holder_data_transfer`); the catalog tells the cabinet to ask. Off by default: the issuer gets no real details. */
            holder_data_required: boolean;
            last_failure?: null | components["schemas"]["IssueFailure"];
            /** @description Smallest starting balance the provider requires on a new card, decimal string; null when a card may start empty. The platform funds it, so price it in. */
            min_initial_amount?: string | null;
            /**
             * Format: int32
             * @description Order in which programs of this connector are tried when the buyer does not choose. Lower first. Has no effect on the storefront.
             */
            priority: number;
            /** @description Program id as the provider reports it. */
            program_code: string;
            /** @description The provider's own name for the program. Shown to operators only. */
            provider_label: string;
            /** @description True when a new card goes to the provider with nothing on it: no minimum from the connector and no `min_load` property. Some providers refuse that; the card then fails at issuance. */
            starts_empty: boolean;
            /** @description `active` or `disabled`. A disabled program issues nothing and is not sold. */
            status: string;
        };
        /** @description An issuance the provider turned down. */
        IssueFailure: {
            /** Format: date-time */
            at: string;
            /** @description The reason as the provider or connector gave it. */
            reason: string;
        };
        IssueReferralBody: {
            /** @description The code; leave it out to get a random one. */
            code?: string | null;
            /**
             * Format: uuid
             * @description The program the code works by: what the people invited get and what the referrer earns.
             */
            program_id: string;
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
        /**
         * @description One of the two lanes.
         * @enum {string}
         */
        Lane: "transactional" | "broadcast";
        /** @description One lane, as the operator needs to see it. */
        LaneStatus: {
            /** @description Whether mail goes out on this lane right now. */
            configured: boolean;
            /** @description The sender, when configured. */
            from?: string | null;
            /** @description JMAP session URL, when the provider is JMAP. */
            jmap_url?: string | null;
            lane: components["schemas"]["Lane"];
            /** @description What is missing, when something is set up but incomplete. */
            problem?: string | null;
            /** @description `postmark`, `smtp` or `jmap`, when configured. */
            provider?: string | null;
            /** @description Whether deliveries, opens and clicks come back (Postmark only). */
            reports_events: boolean;
            /** @description SMTP host, when the provider is SMTP. */
            smtp_host?: string | null;
            source?: null | components["schemas"]["ConfigSource"];
            /** @description Postmark stream, when the provider is Postmark. */
            stream?: string | null;
        };
        LayoutPreviewBody: {
            lane?: null | components["schemas"]["Lane"];
            layout?: null | components["schemas"]["MailLayout"];
            /** @description `en` or `ru`. Default `en`. */
            locale?: string | null;
        };
        /** @description The layout in use, and what the editor needs around it. */
        LayoutView: {
            /** @description The layout shipped with this release, to start from or compare with. */
            bundled: components["schemas"]["MailLayout"];
            /** @description Whether the operator saved their own. */
            custom: boolean;
            /** @description The HTML layout in use: the operator's, or the shipped one. */
            html: string;
            /** @description Values a layout can print. */
            placeholders: components["schemas"]["Placeholder"][];
            /**
             * @description Set when a send could not render the operator's layout and used the
             *     shipped one instead.
             */
            render_error?: string | null;
            /** @description Its plain-text twin. */
            text: string;
            /** Format: date-time */
            updated_at?: string | null;
        };
        LicenseView: {
            /** @description Message from Takeal for the operator, if there is one. */
            banner?: string | null;
            /** @description The environment the installation was enrolled for, e.g. `production`. */
            environment?: string | null;
            /**
             * Format: date-time
             * @description When the lease in use expires. The deployment renews it every five minutes.
             */
            exp?: string | null;
            /** @description What the license includes: connector, provider or module slug mapped to `{"mode": "full" | "service", "until": time or absent}`. `service` keeps what already exists working and opens nothing new. A connector that isn't listed is switched off. */
            features: Record<string, never>;
            /** @description This installation's id at Takeal. */
            installation_id?: string | null;
            /**
             * Format: date-time
             * @description Last time this process checked its lease.
             */
            last_check_at?: string | null;
            /** @description Why the last check failed. Null when it succeeded. */
            last_error?: string | null;
            /**
             * Format: date-time
             * @description When the lease in use was received from Takeal.
             */
            last_good_at?: string | null;
            /** @description The last heartbeat this deployment sent to Takeal, exactly as sent: counters, connector states, user, card and merchant counts, and turnover per currency over the last 24 hours. No personal data. Null before the first heartbeat, and on processes that don't send one. */
            last_heartbeat?: Record<string, never> | null;
            /**
             * Format: int64
             * @description Serial number of the lease in use.
             */
            lease_serial?: number | null;
            /** @description The license this installation runs under. */
            license_id?: string | null;
            /** @description Limits of the license: name mapped to a number. */
            limits: Record<string, never>;
            /** @description `active`, `grace` (running on a saved or expired lease), `refusing` (new transactions are refused) or `disabled` (licensing is switched off on this deployment). */
            mode: string;
            /** @description Why new transactions are refused: `revoked`, `suspended` or `expired`. Null unless `mode` is `refusing`. */
            reason?: string | null;
            /** @description Status of the lease in use: `active`, `suspended` or `revoked`. */
            status?: string | null;
            /**
             * Format: date-time
             * @description When grace ends and new transactions start being refused. Null unless `mode` is `grace`.
             */
            until?: string | null;
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
            /** @description Keep this browser signed in: the response then carries a `remember_token` for `POST /auth/refresh`. */
            remember_me?: boolean;
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
            /**
             * Format: date-time
             * @description Until when `remember_token` works if it is not used.
             */
            remember_expires_at?: string | null;
            /** @description Present when the sign-in asked to be remembered: trade it at `POST /auth/refresh` for a new session once this one ends. Only this browser can use it. */
            remember_token?: string | null;
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
        LogoutBody: {
            /** @description The `remember_token` this browser holds, so it stops working too. */
            remember_token?: string | null;
        };
        LogoutRequest: {
            /** @description The `remember_token` this browser holds. */
            remember_token: string;
        };
        /** @description Both lanes, and the addresses to give Postmark. */
        MailLanes: {
            broadcast: components["schemas"]["LaneStatus"];
            /** @description Where Postmark should post the broadcast stream's webhooks. */
            postmark_webhook_url: string;
            transactional: components["schemas"]["LaneStatus"];
            /** @description Whether the webhook password is set. */
            webhook_secret_set: boolean;
        };
        /** @description An HTML layout and its plain-text twin. */
        MailLayout: {
            /** @description Tera HTML; values are escaped, `body_html` is printed with `| safe`. */
            html: string;
            /** @description Tera plain text; nothing is escaped. */
            text: string;
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
        Merchant: {
            city?: string | null;
            /** @description ISO 3166 country code as the card network sent it. */
            country?: string | null;
            name?: string | null;
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
            /**
             * @description The language the user picked for the portal and their notifications,
             *     one of `takeal_domain::locale::LOCALES`; `None` means automatic (the
             *     browser's language).
             */
            locale?: string | null;
            /** Format: uuid */
            merchant_id: string;
            /**
             * @description The password was set by an operator: the user has to pick their own
             *     before anything but `/merchants/auth/me` and `/merchants/auth/password`
             *     works.
             */
            must_change_password: boolean;
            role: components["schemas"]["MerchantRole"];
            /** Format: date-time */
            updated_at: string;
        };
        /** @description What one way of paying through a funding connector costs and allows. */
        MethodTermsView: {
            /** @description What you may top up this way over 24 hours, in the source currency; null for no limit. */
            daily_limit_per_user?: string | null;
            /**
             * Format: int64
             * @description The fee in basis points.
             */
            fee_bps: number;
            /** @description `spread`, `markup` or `commission`; see the quote's `fee_kind`. */
            fee_kind: string;
            /** @description Largest single top-up in the source currency; null for no cap. */
            max_amount?: string | null;
            method: components["schemas"]["DepositMethod"];
            /** @description Smallest single top-up in the source currency; null for no floor. */
            min_amount?: string | null;
            /**
             * Format: int64
             * @description How long a quote through this method stays executable.
             */
            quote_ttl_seconds: number;
            /** @description ISO 4217 code the user pays in this way; null when any currency the quote accepts. */
            source_currency?: string | null;
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
        ModerationState: {
            moderation?: null | components["schemas"]["CardModeration"];
        };
        /** @description An amount with its currency, as decimal string and ISO 4217 code. */
        /** @description An amount with its currency. */
        DebtAmount: {
            /** @description Decimal string, e.g. "1.50". */
            amount: string;
            /** @description ISO 4217 code. */
            currency: string;
        };
        /** @description One amount owed. */
        DebtLine: {
            /** @description The amount owed when it arose, decimal string. */
            amount: string;
            /** @description What it is owed for: `card_fee`, a card fee the card could not cover. */
            basis: string;
            /**
             * Format: uuid
             * @description The card the fee was for.
             */
            card_id?: string | null;
            /** @description Last four digits of that card. */
            card_last4?: string | null;
            /** Format: date-time */
            created_at: string;
            currency: string;
            /** @description `operation`, `decline` or `cash_withdrawal`: the fee behind it. */
            fee_kind?: string | null;
            /** Format: uuid */
            id: string;
            /** @description The merchant of that operation, as the card network sent it. */
            merchant_name?: string | null;
            /** @description The operation's amount, decimal string, never negative. */
            operation_amount?: string | null;
            operation_currency?: string | null;
            /** @description What is still owed of it, decimal string. */
            outstanding: string;
            /**
             * Format: date-time
             * @description When it was paid in full; null while something is owed.
             */
            settled_at?: string | null;
            /**
             * Format: uuid
             * @description The card operation the fee was for.
             */
            transaction_id?: string | null;
        };
        /** @description What the user owes. */
        MyDebtView: {
            /** @description The amounts still owed, newest first. */
            items: components["schemas"]["DebtLine"][];
            /** @description What is owed, per currency; empty when nothing is. */
            total: components["schemas"]["DebtAmount"][];
        };
        MoneyView: {
            amount: string;
            currency: string;
        };
        /** @description The signed-in operator's role and what it grants. */
        MyAccess: {
            email: string;
            /** @description Language picked for the console and notifications: `en`, `ru`, `de`, `es`, `fr`, `pt-BR` or `zh-Hans`. `null` means automatic, which follows the browser. */
            locale?: string | null;
            /** @description Every permission key the role grants, `*` for all of them. Empty for an end-user account. */
            permissions: string[];
            /** @description Role name. */
            role: string;
        };
        MyAttribution: {
            /** @description The answer given, `skipped`, or null when not answered yet. */
            survey_answer?: string | null;
            /** @description `true` while the app should ask "how did you hear about us". Asked once: any answer, skipping included, turns it off. */
            survey_pending: boolean;
        };
        /** @description A referrer's own view. */
        MyReferral: {
            /** @description Your referral code; null when you have none (codes are given out by invitation). */
            code?: string | null;
            /** @description The latest of them, newest first, without names or contacts. */
            invited: components["schemas"]["InvitedView"][];
            /**
             * Format: int64
             * @description How many people signed up with your code.
             */
            invited_count: number;
            /** @description A link that signs people up with your code; null when the deployment hasn't set one. */
            link?: string | null;
            /** @description What you were rewarded for, newest first. */
            rewards: components["schemas"]["RewardView"][];
            /** @description Bonuses you earned in total, decimal string. */
            total_rewarded: string;
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
         * @example {
         *       "channel": "telegram",
         *       "code": "tg-post-0907",
         *       "description": "Post in our channel on 7 September"
         *     }
         */
        NewCampaign: {
            channel: string;
            /** @description Up to 32 Latin letters, digits and dashes. Case doesn't matter: `Spring-Promo` and `spring-promo` are the same code. */
            code: string;
            description: string;
        };
        NewCodeBody: {
            /** @description Letters, digits and dashes, up to 32; case doesn't matter. Leave it out to get a random one. */
            code?: string | null;
            /**
             * Format: int32
             * @description Uses of this code; null = only the program's limit.
             */
            max_redemptions?: number | null;
            /** @description Where the code goes, for the team: "blogger X, October". */
            note?: string | null;
            /** Format: uuid */
            program_id: string;
            /** Format: date-time */
            valid_from?: string | null;
            /** Format: date-time */
            valid_until?: string | null;
        };
        /** @description Fields for creating a document. */
        NewDocument: {
            /** @description The text in Markdown. */
            body_markdown?: string;
            /**
             * Format: uuid
             * @description ID of an uploaded image to use as the cover.
             */
            cover_image_id?: string | null;
            /** @description Optional teaser. Derived from the body when empty. */
            excerpt?: string;
            /**
             * Format: uuid
             * @description Folder to create it in. The Blog category when omitted.
             */
            folder_id?: string | null;
            /** @description Language tag such as `en`. */
            locale?: string;
            /** Format: int32 */
            position?: number | null;
            read_scope?: null | components["schemas"]["Scope"];
            /** @description Lowercase kebab-case. Generated from the title when omitted. */
            slug?: string | null;
            tags?: string[];
            title: string;
            write_scope?: null | components["schemas"]["Scope"];
        };
        /** @description Fields for creating a folder. */
        NewFolder: {
            default_read_scope?: null | components["schemas"]["Scope"];
            description?: string;
            /** @description Path segment, lowercase kebab-case. Generated from the title when omitted. */
            key?: string | null;
            /**
             * Format: uuid
             * @description Folder to create it in. Required: new categories are not created this way.
             */
            parent_id: string;
            /** Format: int32 */
            position?: number | null;
            title: string;
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
        NoPinLimitBody: {
            /**
             * @description Purchases up to this amount, in the card's currency, ask no PIN. Zero: the PIN is always asked.
             * @example 25.00
             */
            amount: string;
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
        /**
         * @description An operation a code can be used on.
         * @enum {string}
         */
        Operation: "signup" | "deposit" | "card_issuance" | "subscription";
        /** @description A top-up as the operator sees it. */
        OperatorDepositRow: {
            /** @description Amount paid, decimal string. */
            amount: string;
            /** @description Bonuses added on top, and what they added. */
            bonus_units?: string | null;
            bonus_value?: string | null;
            /** @description Whether an operator may retry the card load now. */
            can_retry: boolean;
            /** @description Whether the load waits for the issuer's answer: an operator may check again, return the money or write it off. */
            can_settle: boolean;
            /** @description What went towards the card, in its currency, bonuses included. */
            card_amount?: string | null;
            /** @description Commission taken from a top-up onto a card, in the card's currency. */
            card_commission?: string | null;
            /** @description Slug of the card connector that issued that card. */
            card_connector_slug?: string | null;
            card_currency?: string | null;
            /**
             * Format: uuid
             * @description The card, for a top-up onto a card.
             */
            card_id?: string | null;
            card_last4?: string | null;
            /** Format: int32 */
            card_load_attempts: number;
            /** @description What the card provider answered when the load failed. */
            card_load_error?: string | null;
            /** @description `pending`, `waiting` (the issuer accepted the load and has not done it), `stalled` (the issuer has had it too long; an operator decides), `succeeded` or `failed`; null for wallet top-ups. */
            card_load_status?: string | null;
            /**
             * Format: date-time
             * @description Set when an operator wrote a stalled load off.
             */
            card_load_written_off_at?: string | null;
            /** Format: date-time */
            card_loaded_at?: string | null;
            confirmed_amount?: string | null;
            /** Format: date-time */
            confirmed_at?: string | null;
            /** @description Slug of the funding connector. */
            connector_slug: string;
            /** Format: date-time */
            created_at: string;
            credited_amount?: string | null;
            /** @description Currency credited when the deposit was converted. */
            credited_currency?: string | null;
            currency: string;
            /**
             * Format: date-time
             * @description When the deposit stops waiting for its payment; null for a deposit without a term.
             */
            expires_at?: string | null;
            failure_reason?: string | null;
            /** @description The funding connector's mode when the deposit was made: `wallet`, `the connector` or `mixed`. Decides what a failed card load does. */
            funder_mode?: string | null;
            /** @description How the fee was taken: `spread` (off the credited amount), `markup` (in the rate the user saw) or `commission` (a line of its own). */
            fx_fee_kind?: string | null;
            /** @description Provider rate of a converted deposit: credited units per 1 unit paid, before the fee. Null for a deposit in the wallet currency. */
            fx_rate?: string | null;
            /**
             * Format: int64
             * @description The fee in basis points, read through `fx_fee_kind`.
             */
            fx_spread_bps?: number | null;
            /** Format: uuid */
            id: string;
            /** @description The money part of the price of a card issued with the top-up. */
            issue_fee?: string | null;
            /** @description The card was issued with this top-up. */
            issues_card: boolean;
            method: string;
            provider_reference?: string | null;
            /**
             * Format: date-time
             * @description Set when a failed card load sent the money to the wallet instead.
             */
            returned_to_wallet_at?: string | null;
            /** @description `pending`, `redirect_required`, `confirmed` or `failed`. */
            status: string;
            /** @description Where the money goes: `wallet` or `card`. */
            target: string;
            /** Format: date-time */
            updated_at: string;
            /** @description The user's email. Null if the account was deleted. */
            user_email?: string | null;
            /** Format: uuid */
            user_id: string;
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
        /**
         * @description What the operator refunds, and why.
         * @example {
         *       "amount": "500.00",
         *       "reason": "Duplicate payment, the user asked in chat"
         *     }
         */
        OperatorRefundBody: {
            /** @description Amount to return, decimal string in the deposit's currency. Leave it out to return the whole confirmed amount. */
            amount?: string | null;
            /** @description Provider-specific extras passed through to the funding connector. On test deployments with the mock funder, `mock_scenario` picks the outcome (`happy`, `pending`, `fail`). */
            metadata?: {
                [key: string]: string;
            };
            /** @description Why the money goes back. Required; kept on the refund and in the audit log. */
            reason: string;
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
            /** @description Who asked for the refund: the user's or the operator's email, or the merchant's legal name. Null if that account was deleted. */
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
            /** @description Platform version (TKL), the one connectors, consoles and SDKs check their supported range against. Usually equal to `version`; `version` can carry a release-candidate suffix. */
            platform_version: string;
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
        /** @description The storefront order. */
        OrderBody: {
            /** @description Product ids in the order buyers should see them, first to last. Products left out keep their relative order after the listed ones. */
            ids: string[];
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
            /** @description Language picked for the portal and notifications: `en`, `ru`, `de`, `es`, `fr`, `pt-BR` or `zh-Hans`. `null` means automatic, which follows the browser. */
            locale?: string | null;
            /**
             * @description The password was issued by an operator. Until the user picks their
             *     own with `POST /auth/password`, every other call answers 403
             *     `password_change_required`.
             */
            must_change_password: boolean;
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
             * Format: date-time
             * @description When the user last signed in.
             */
            last_login_at?: string | null;
            /** @description True until the user replaces the password an operator gave them. */
            must_change_password: boolean;
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
            /** @description Keep this browser signed in; see `POST /auth/refresh`. */
            remember_me?: boolean;
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
        PatchCodeBody: {
            /**
             * Format: int32
             * @description Null removes the code's own limit.
             */
            max_redemptions?: number | null;
            note?: string | null;
            /**
             * Format: uuid
             * @description Move the code to another program.
             */
            program_id?: string | null;
            /** @description `active` or `disabled`. */
            status?: string | null;
            /**
             * Format: date-time
             * @description Null clears it.
             */
            valid_from?: string | null;
            /**
             * Format: date-time
             * @description Null clears it.
             */
            valid_until?: string | null;
        };
        PatchConfigurationKeyBody: {
            /** @description New plaintext value, up to 8 KiB. */
            value: string;
        };
        PatchConnectorBody: {
            /** @description Card connectors only: replaces the watched provider accounts. Keys are account ids from the balances endpoint, values the balance (decimal string, zero or more) under which operators are told. An empty object watches nothing. */
            balance_alerts?: Record<string, never> | null;
            /** @description Funding connectors only: the payment methods it takes, any of `card`, `crypto`, `bank_transfer`, at least one. */
            deposit_methods?: string[] | null;
            /** @description Funding connectors only: `wallet`, `the connector` or `mixed`. Takes effect on the next top-up; top-ups already made keep the mode they were made under. */
            funder_mode?: string | null;
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
         * @description What to change on a product. Omitted fields keep their value. A text
         *     field sent empty is cleared.
         */
        PatchProductBody: {
            /** @description Designs a buyer may pick besides the default. Replaces the list. */
            allowed_design_ids?: string[] | null;
            /** @description Selling points, up to 8 of up to 80 characters each. Replaces the list; empty entries are dropped. */
            benefits?: string[] | null;
            /**
             * Format: int32
             * @description How much of the price bonuses may cover, basis points from 0 (bonuses can't be used) to 10000 (all of it); `null` follows the deployment's bonus setting.
             */
            bonus_share_bps?: number | null;
            /** @description What the provider charges per card, decimal string; `null` clears it. */
            cost_price?: string | null;
            /** @description Longer description, up to 500 characters. */
            description?: string | null;
            /**
             * Format: uuid
             * @description Default design; send `null` for the deployment's default design.
             */
            design_id?: string | null;
            /** @description Properties shown to buyers. Replaces the object. */
            features?: Record<string, never> | null;
            /** @description Your note on the price, e.g. the provider's tariff name. Never shown to buyers. */
            fee_label?: string | null;
            /** @description Name buyers see, up to 60 characters. Required before the product can go on sale. */
            name?: string | null;
            /** @description Currency the buyer pays in, ISO 4217; `null` or empty means the card's own currency. */
            price_currency?: string | null;
            /** @description What the buyer pays per card, decimal string; `null` makes the card free. */
            sell_price?: string | null;
            /** @description One line under the name, up to 120 characters. */
            tagline?: string | null;
            /** @description Picture for the tile: an `http(s)` URL, or empty to show the design instead. To upload a file use the image endpoint. */
            tile_image_url?: string | null;
            /** @description Put the product on the storefront (needs a name) or take it off. */
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
        /** @description One step of a breadcrumb trail. */
        PathStep: {
            /** Format: uuid */
            id: string;
            key: string;
            title: string;
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
        Placeholder: {
            description: string;
            name: string;
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
            posts: components["schemas"]["PublicDocument"][];
            /**
             * Format: int64
             * @description Total number of published posts matching the filters.
             */
            total: number;
        };
        /**
         * @description The fields of a Postmark webhook we read. Every record type shares this
         *     shape loosely; absent fields stay `None`.
         */
        PostmarkEvent: {
            /** Format: date-time */
            BouncedAt?: string | null;
            /** Format: date-time */
            DeliveredAt?: string | null;
            Email?: string | null;
            MessageID?: string | null;
            MessageStream?: string | null;
            Metadata?: Record<string, never> | null;
            /** Format: date-time */
            ReceivedAt?: string | null;
            Recipient?: string | null;
            RecordType: string;
            SuppressSending?: boolean | null;
            SuppressionReason?: string | null;
        };
        PreferencesBody: {
            /** @description Replaces the switches. `security` and `money` keep at least one outward channel whatever is sent. */
            categories?: Record<string, never> | null;
            /** @description `en`, `ru`, `de`, `es`, `fr`, `pt-BR`, `zh-Hans`, or null for automatic. Leave it out to keep the current value. A notification with no text in the chosen language comes in English. */
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
            /** @description Language of the interface and notifications: `en`, `ru`, `de`, `es`, `fr`, `pt-BR` or `zh-Hans`. Null means automatic: the app follows the browser, and notifications follow the Telegram profile or the deployment default. */
            locale?: string | null;
            /**
             * Format: date-time
             * @description When the user left the mailing list, if they did: broadcast email
             *     stops, sign-in codes and card notifications keep coming. Switching
             *     marketing email back on puts them on the list again.
             */
            mail_unsubscribed_at?: string | null;
            /**
             * @description How they left: `link` (the page the email links to), `one_click` (the
             *     mail client's unsubscribe button), or `postmark:<reason>` (the
             *     provider, e.g. after a spam complaint).
             */
            mail_unsubscribed_via?: string | null;
            /** @description Channel to use first when it can reach the user; null = automatic (a mobile app, else the device used most recently). */
            primary_channel?: string | null;
        };
        /** @description What the editor shows next to the text. */
        Preview: {
            /** @description The text as blocks, the way a reader's app receives it. */
            body_blocks: components["schemas"]["Block"][];
            /** @description The teaser that would be derived when none is written. */
            excerpt: string;
            /** Format: int32 */
            reading_minutes: number;
        };
        PreviewBody: {
            /** @description The text to render. */
            body_markdown: string;
        };
        /** @description How bonuses change one price. */
        PreviewView: {
            /** @description The price before bonuses ("was"), or for `deposit` the amount you pay, decimal string. */
            amount: string;
            /** @description Bonuses that would be used. */
            bonus_units: string;
            /** @description What those bonuses cover ("−N"), decimal string, in `currency`. */
            bonus_value: string;
            /** @description For `deposit`: what reaches your wallet, the amount paid plus the bonus part. Null otherwise. */
            credited?: string | null;
            currency: string;
            /** @description What is left to pay ("now"). For `deposit`, the amount you pay, unchanged. */
            due: string;
            purpose: components["schemas"]["BonusPurpose"];
        };
        /** @description What issuing a card on this product costs the user right now. */
        ProductPrice: {
            /** @description What the user pays, decimal string, after their subscription discount. */
            amount: string;
            /** @description The list price before the discount, decimal string, in the same currency. */
            base_amount: string;
            /** @description ISO 4217 code of the price: the currency the buyer pays in. For a signed-in user this is their wallet currency, converted at the rate issuance will use. */
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
         * @description A change to your own profile. Every field is optional; an omitted one
         *     keeps its value.
         */
        ProfileBody: {
            /**
             * @description Language of the interface and your notifications: `en`, `ru`, `de`, `es`, `fr`, `pt-BR` or `zh-Hans`. `null` switches back to automatic, which follows the browser.
             * @example de
             */
            locale?: string | null;
        };
        /** @description A program: the rules a code works by. */
        Program: {
            /** @description The operations its codes work on. */
            applies_to: components["schemas"]["Operation"][];
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            created_by?: string | null;
            description?: string | null;
            effects: components["schemas"]["Effect"][];
            /** @description Only the person's first operation of the kind qualifies. */
            first_operation_only: boolean;
            /** Format: uuid */
            id: string;
            /**
             * Format: int32
             * @description Uses across all its codes; null = no limit.
             */
            max_redemptions?: number | null;
            /** @description The operation must be at least this much, decimal string. */
            min_amount?: string | null;
            min_amount_currency?: string | null;
            name: string;
            /**
             * Format: int32
             * @description How many times one person may use a code of this program per operation.
             */
            per_user_limit: number;
            /**
             * Format: int32
             * @description Uses so far, those still in flight included.
             */
            redemptions_count: number;
            /** @description The most bonuses one invited person may bring the referrer; null = no cap. */
            reward_cap_per_referee?: string | null;
            /**
             * Format: int32
             * @description Days after the invited person signed up during which rewards are paid; null = always.
             */
            reward_window_days?: number | null;
            /** @description `active` or `disabled`. A disabled program switches every code of it off. */
            status: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            valid_from?: string | null;
            /** Format: date-time */
            valid_until?: string | null;
        };
        ProgramDetail: components["schemas"]["Program"] & {
            stats: components["schemas"]["ProgramStats"];
        };
        /** @description What an operator sends to create or replace a program. */
        ProgramInput: {
            /** @description The operations its codes work on; at least one. */
            applies_to: components["schemas"]["Operation"][];
            description?: string | null;
            effects?: components["schemas"]["Effect"][];
            first_operation_only?: boolean;
            /** Format: int32 */
            max_redemptions?: number | null;
            min_amount?: string | null;
            min_amount_currency?: string | null;
            name: string;
            /**
             * Format: int32
             * @description Default 1.
             */
            per_user_limit?: number | null;
            reward_cap_per_referee?: string | null;
            /** Format: int32 */
            reward_window_days?: number | null;
            /** @description `active` (default) or `disabled`. */
            status?: string | null;
            /** Format: date-time */
            valid_from?: string | null;
            /** Format: date-time */
            valid_until?: string | null;
        };
        /** @description What a program cost and what it brought. */
        ProgramStats: {
            /** @description Bonuses its codes gave to the people using them, decimal string. */
            bonuses_to_users: string;
            /** Format: int64 */
            cards: number;
            /**
             * Format: int64
             * @description Cards those people got.
             */
            cards_issued: number;
            /** Format: int64 */
            codes: number;
            /** Format: int64 */
            deposits: number;
            /** @description Money off prices and commissions, by currency. */
            discounts: components["schemas"]["AmountView"][];
            /**
             * Format: int64
             * @description People invited with its referral codes.
             */
            referees: number;
            /** @description Bonuses paid to referrers, decimal string. */
            referrer_rewards: string;
            /**
             * Format: int64
             * @description Uses still in flight.
             */
            reserved: number;
            /**
             * Format: int64
             * @description Uses that went through, by operation.
             */
            signups: number;
            /** Format: int64 */
            subscriptions: number;
            /** @description Confirmed top-ups of the people who used its codes, by currency. */
            topped_up: components["schemas"]["AmountView"][];
            /**
             * Format: int64
             * @description People who used a code of the program.
             */
            users: number;
        };
        /** @description A program with its numbers, for the operator's list. */
        ProgramSummary: components["schemas"]["Program"] & {
            stats: components["schemas"]["ProgramStats"];
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
            /** @description Country a made-up holder's address and phone belong to, ISO 3166-1 alpha-2; null means the deployment's default country. */
            cardholder_country?: string | null;
            /** @description Who the cardholder may be on this program, as the provider declares it: `synthetic` (the platform may make the holder up) or `verified` (a real, verified person only). */
            cardholder_policy: string;
            /** @description State or region of a made-up holder's address; null means any state of the country. */
            cardholder_state?: string | null;
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
            /** @description Arrived from the provider and not yet looked at: it is hidden from users until someone puts it on sale. Saving its pricing or its product settings clears the mark. */
            is_new: boolean;
            /** @description Human-readable program name. */
            label: string;
            /** @description Smallest starting balance the connector requires on a new card, as it advertised it; null when a card may start empty. The platform funds it at issuance, so price it into `sell_price`. */
            min_initial_amount?: string | null;
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
        /** @description One thing the provider reported about the platform's wallet with it. */
        ProviderEventRow: {
            /** @description Decimal string. A fee is what left the wallet, a credit what came onto it. */
            amount: string;
            /**
             * Format: uuid
             * @description The card the fee was for; null for a wallet credit, or a card since purged.
             */
            card_id?: string | null;
            card_provider_reference?: string | null;
            connector_slug: string;
            currency: string;
            /** @description `card.provider_fee` or `connector.wallet_credited`. */
            event_type: string;
            /** Format: uuid */
            id: string;
            /** @description The provider's kind of fee (`transaction`, `decline`, `reload`, …) or `wallet_credit`. */
            kind: string;
            /** Format: date-time */
            occurred_at: string;
            /** @description The provider's order number or the transfer's hash. */
            provider_reference?: string | null;
        };
        /**
         * @description A document as a reader receives it. The body comes both as Markdown and
         *     as a flat list of blocks, so the client can render it with its own
         *     components.
         */
        PublicDocument: {
            /** @description The body as a flat list of blocks; the recommended input for rendering. */
            body_blocks: components["schemas"]["Block"][];
            /** @description Raw Markdown, for clients that bring their own renderer. */
            body_markdown: string;
            /** @description Category key: `blog`, `knowledge-base`, `legal` or `internal`. */
            category: string;
            /** @description Path of the cover image, when set. */
            cover_url?: string | null;
            /**
             * Format: date-time
             * @description When the text shown took effect.
             */
            effective_from: string;
            /** @description Short teaser. Derived from the first paragraph when none was written. */
            excerpt: string;
            /** @description Language tag such as `en`, when set; omitted otherwise. */
            locale?: string;
            /** @description Where the document sits, root first. Empty for the category itself. */
            path: components["schemas"]["PathStep"][];
            /**
             * Format: date-time
             * @description When the document was first published.
             */
            published_at?: string | null;
            /** @description Who may read it. */
            read_scope: components["schemas"]["Scope"];
            /**
             * Format: int32
             * @description Estimated reading time in minutes.
             */
            reading_minutes: number;
            /** @description Path under the site root where this document is read. */
            site_path: string;
            /** @description Permanent address. Link by this. */
            slug: string;
            tags: string[];
            title: string;
            /** Format: date-time */
            updated_at: string;
            /**
             * Format: int32
             * @description Number of the text shown.
             */
            version: number;
        };
        /** @description A folder as a reader sees it in the navigation tree. */
        PublicFolder: {
            description: string;
            /** Format: uuid */
            id: string;
            key: string;
            /** Format: uuid */
            parent_id?: string | null;
            /** Format: int32 */
            position: number;
            title: string;
        };
        PushKeys: {
            /** @description `PushSubscription.getKey("auth")`, URL-safe base64. */
            auth: string;
            /** @description `PushSubscription.getKey("p256dh")`, URL-safe base64. */
            p256dh: string;
        };
        PushPreview: {
            body: string;
            title: string;
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
            /** @description The funding connector and method the quote was priced for, when the request named them. The deposit has to go through the same pair. */
            connector_slug?: string | null;
            /**
             * @description What the user owes in card fees, in `credited_currency`, that this top-up pays first: it is withheld from `credited_amount` and the rest is credited. Zero when nothing is owed. Show it before the payment.
             * @example 1.50
             */
            debt_withheld: string;
            /**
             * @description Amount the wallet will be credited, net of spread, at the locked rate.
             * @example 57.97
             */
            credited_amount: string;
            /** @description ISO 4217 code of the currency credited: the wallet's, or the card's. */
            credited_currency: string;
            /**
             * Format: date-time
             * @description When the quote stops being valid, UTC.
             */
            expires_at: string;
            /**
             * Format: int64
             * @description The fee in basis points (2000 = 20 %).
             */
            fee_bps: number;
            /** @description How the fee was taken: `spread` (off the credited amount), `markup` (in the rate shown: `rate` is the provider's, the user's rate is worse by the fee) or `commission` (the rate is the provider's; a commission is charged on the credited amount separately). */
            fee_kind: string;
            /**
             * Format: uuid
             * @description Quote id; pass it as `quote_id` when creating the deposit.
             */
            id: string;
            method?: null | components["schemas"]["DepositMethod"];
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
             * @description The fee in basis points; `fee_kind` says how it was taken. The same figure as `fee_bps`, kept under its old name.
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
            /** @description License state for the console's status bar: `mode` (`active`, `grace`, `refusing` or `disabled`; `grace` also carries `until`, `refusing` carries `reason`), the lease's `status`, `exp` (also as `valid_until`), `banner`, `last_check_at`, `last_good_at` and `last_error`. Operators see the full picture at `GET /v1/admin/license`. Does not affect the HTTP status of this endpoint. */
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
        /** @description What became of an uploaded recipient list. */
        RecipientUpload: {
            /**
             * Format: int64
             * @description Users now on the list: known, active end-user accounts.
             */
            accepted: number;
            /** @description Lines that repeated an id already seen in the file. */
            duplicates: number;
            /** @description Lines that carried a value, the header not counted. */
            rows: number;
            /** @description Lines that are not a user id, or name no active end-user. */
            unrecognised: number;
            /** @description The first unrecognised lines, to find what went wrong in the file. */
            unrecognised_sample: components["schemas"]["UnrecognisedLine"][];
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
        /** @description One use of a code. */
        RedemptionView: {
            /** @description The operation's amount, decimal string. */
            amount?: string | null;
            amount_currency?: string | null;
            code: string;
            /** Format: uuid */
            code_id: string;
            /** Format: date-time */
            created_at: string;
            discount_currency?: string | null;
            /** @description What the discount took off, decimal string. */
            discount_value?: string | null;
            /** @description What each effect did. */
            effects: Record<string, never>;
            /** Format: uuid */
            id: string;
            operation: components["schemas"]["Operation"];
            /**
             * Format: uuid
             * @description The card, deposit or subscription, once it exists.
             */
            operation_id?: string | null;
            /** Format: uuid */
            program_id: string;
            /** @description `reserved` (the operation is still going through), `applied` or `released` (it did not go through; the use was given back). */
            status: string;
            /** @description The user's e-mail, in the operator's view. */
            user_email?: string | null;
            /** Format: uuid */
            user_id: string;
        };
        /** @description Who invited a user. */
        ReferredBy: {
            code: string;
            email?: string | null;
            /** Format: date-time */
            joined_at: string;
            /** Format: uuid */
            program_id: string;
            /** Format: uuid */
            user_id: string;
        };
        RefreshBody: {
            /** @description The `remember_token` from the last sign-in or refresh. */
            remember_token: string;
        };
        RefreshRequest: {
            /** @description The `remember_token` from the last sign-in or refresh. */
            remember_token: string;
        };
        /** @description A refund of a deposit. `target_type` is always `deposit` here. */
        Refund: {
            /**
             * @description Refunded amount, decimal string.
             * @example 100.00
             */
            amount: string;
            /** @description Identifier of the connector that processed the refund. */
            connector_slug: string;
            /** Format: date-time */
            created_at: string;
            /** @description ISO 4217 code, same as the deposit. */
            currency: string;
            /**
             * Format: uuid
             * @description The deposit being refunded.
             */
            deposit_id?: string | null;
            /** @description Why the refund failed, when status is `failed`. */
            failure_reason?: string | null;
            /** Format: uuid */
            id: string;
            /**
             * Format: uuid
             * @description Not set for deposit refunds.
             */
            payment_id?: string | null;
            /** @description Reference assigned by the provider, when available. */
            provider_refund_reference?: string | null;
            /** @description Reason given when the refund was requested. */
            reason: string;
            /**
             * Format: uuid
             * @description ID of the requestor.
             */
            requestor_id: string;
            /** @description Who requested the refund, e.g. `user`. */
            requestor_type: string;
            /** @description `pending`, `succeeded` or `failed`. */
            status: string;
            /** @description Always `deposit` for deposit refunds. */
            target_type: string;
            /** Format: date-time */
            updated_at: string;
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
        /**
         * @description Why a code can't be used.
         * @enum {string}
         */
        Rejection: "unknown" | "disabled" | "not_started" | "expired" | "not_applicable" | "exhausted" | "already_used" | "not_first_operation" | "below_minimum" | "currency_mismatch" | "own_code" | "already_registered";
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
        /** @description A template rendered for one recipient, in every shape a channel needs. */
        RenderedMessage: {
            /** @description Full HTML: paragraphs and lists, for email. */
            body_html: string;
            /** @description The body with the values filled in, still Markdown — what the inbox stores. */
            body_markdown: string;
            /** @description Inline tags only, bullets as `•` — what Telegram's HTML parse mode accepts. */
            body_telegram: string;
            /** @description No markup at all, for push and the text part of an email. */
            body_text: string;
            /** @description Where the button goes. */
            button_href?: string | null;
            /** @description Label of the button. */
            button_label?: string | null;
            /** @description Picture above the message. */
            image_url?: string | null;
            /**
             * @description What the short channels carry when the sender wrote a short version.
             *     Empty for a stored template: Telegram and push shorten the body
             *     themselves.
             */
            short_text?: string | null;
            /** @description The title with the values filled in. */
            title: string;
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
        ResolveBody: {
            /** @description What was done about it. Required. */
            note: string;
        };
        RevealResponse: {
            billing_address?: null | components["schemas"]["Address"];
            cardholder?: null | components["schemas"]["CardholderView"];
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
            /** @description A page at the card provider that shows the card details to the holder. Present when the provider hands out a page instead of the numbers: `pan` and `cvv` are then empty, and the client opens this address in a frame. The address is short-lived and is not kept anywhere. */
            reveal_url?: string | null;
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
        /**
         * @description The invited person's event a referrer is rewarded for.
         * @enum {string}
         */
        RewardEvent: "signup" | "card_issuance" | "first_deposit" | "deposit";
        /** @description One reward a referrer got. */
        RewardView: {
            /** @description The invited person's operation a percent was taken of, decimal string. */
            basis_amount?: string | null;
            basis_currency?: string | null;
            /** Format: uuid */
            code_id: string;
            /** Format: date-time */
            created_at: string;
            /** @description `signup`, `card_issuance`, `first_deposit` or `deposit`. */
            event: string;
            /** Format: uuid */
            id: string;
            /** @description How it was paid: `bonus`. */
            payout_kind: string;
            /** Format: uuid */
            program_id: string;
            referee_email?: string | null;
            /**
             * Format: uuid
             * @description The invited person. Only the operator's view has it.
             */
            referee_user_id?: string | null;
            /** Format: uuid */
            referrer_user_id: string;
            /** @description `pending` until the bonuses are on the account, then `credited`. */
            status: string;
            /** @description Bonuses, decimal string. */
            units: string;
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
        /**
         * @description Who may read or edit a document. Ordered: each level includes the ones
         *     before it.
         * @enum {string}
         */
        Scope: "public" | "users" | "staff" | "operators";
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
         *       "held": true,
         *       "note": "Chargeback under review"
         *     }
         */
        SetModerationBody: {
            /** @description `true` puts the hold, `false` lifts it. */
            held: boolean;
            /** @description Why, for other operators. Kept with the hold and in the audit log. */
            note?: string | null;
        };
        /** @description The new PIN. No `Debug`: the PIN is in it. */
        SetPinBody: {
            /** @description Four to six digits. */
            pin: string;
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
        /** @description An operator's note on a load they settle by hand. */
        SettleNoteBody: {
            /** @description Why. Kept on the deposit and in the audit log. */
            note: string;
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
        /** @description Where the new user came from, as the browser knows it. */
        SignupAttribution: {
            /** @description The visitor's anonymous id, the one the touches were sent with. */
            anonymous_key?: string | null;
            first_touch?: null | components["schemas"]["TouchFields"];
            /** @description Google Analytics client id from its `_ga` cookie. */
            ga_client_id?: string | null;
            last_touch?: null | components["schemas"]["TouchFields"];
            /** @description Yandex Metrica client id from its `_ym_uid` cookie. */
            metrika_client_id?: string | null;
            /** @description PostHog distinct id, so a report can open the session recording. */
            posthog_distinct_id?: string | null;
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
        /** @description One card of a batch as it comes from the provider. No `Debug`: the code is in it. */
        StockCardBody: {
            /** @description The activation code that came with it. */
            activation_code: string;
            /** @description The last four digits printed on the plastic. */
            last4: string;
        };
        /** @description What an import did. */
        StockImportOutcome: {
            /**
             * Format: int64
             * @description Cards added to the stock.
             */
            imported: number;
            /**
             * Format: int64
             * @description Cards already in the stock (same connector and activation code).
             */
            skipped: number;
        };
        /** @description One product on the storefront, with everything an operator can set. */
        StorefrontProduct: {
            /** @description Other designs a buyer may pick. */
            allowed_design_ids: string[];
            /** @description Selling points, one per entry, in the order they are listed. */
            benefits: string[];
            /**
             * Format: int32
             * @description How much of this card's price bonuses may cover, basis points; null follows the `bonus.share.card_issuance_bps` setting.
             */
            bonus_share_bps?: number | null;
            /** @description Currency the card is held in, or null for a multi-currency program. */
            card_currency?: string | null;
            /**
             * Format: int64
             * @description Cards issued on this program so far.
             */
            cards_issued: number;
            /** @description What the provider charges per card, decimal string. For the operator's books. */
            cost_price?: string | null;
            /** @description Longer description on the product card. */
            description?: string | null;
            /**
             * Format: uuid
             * @description Default design; null = the deployment's default design.
             */
            design_id?: string | null;
            /** @description Properties shown to buyers, e.g. `{"scheme": "mastercard", "apple_pay": true}`. */
            features: Record<string, never>;
            /** @description Operator's note on the price, e.g. the provider's tariff name. Never shown to buyers. */
            fee_label?: string | null;
            /**
             * Format: uuid
             * @description Product id: what buyers see and send back as `product_id`.
             */
            id: string;
            /** @description True for the product a card gets when the buyer does not choose one. Decided by the issuance cascade, not by the storefront order. */
            is_default: boolean;
            /** @description Arrived from the provider and not looked at yet. Saving the product clears it. */
            is_new: boolean;
            /** @description Provenance and issuance settings. */
            issuance: components["schemas"]["IssuanceInfo"];
            /** @description Name buyers see. Null until an operator gives one; a product is not sold without it. */
            name?: string | null;
            /** @description Why not, when `on_sale` is false: `hidden`, `unnamed`, `program_disabled` or `connector_disabled`. */
            not_on_sale_reason?: string | null;
            /** @description True when buyers can see and order this product right now. */
            on_sale: boolean;
            /** @description Currency of `sell_price` when it differs from the card's; null means the card currency. */
            price_currency?: string | null;
            /** @description What the buyer pays per card, decimal string. Null: the card is free. */
            sell_price?: string | null;
            /**
             * Format: int32
             * @description Position on the storefront, lower first. Change it with the order endpoint.
             */
            storefront_position: number;
            /** @description One line under the name on the tile. */
            tagline?: string | null;
            /** @description Picture for the tile, absolute URL. Null: the default design is shown instead. */
            tile_image_url?: string | null;
            /** Format: date-time */
            updated_at: string;
            /** @description The operator's switch: on the storefront or kept for operator and business issuance only. */
            visible_to_users: boolean;
        };
        /** @description The whole storefront. */
        StorefrontView: {
            /** @description Every wallet currency a buyer may hold here. */
            buyer_currencies: string[];
            /** @description Currency buyers hold by default on this deployment: the natural currency for prices. */
            buyer_currency: string;
            /** @description Every product of every card connector, in storefront order. */
            products: components["schemas"]["StorefrontProduct"][];
        };
        SubscriptionCodeBody: {
            /** @description The promo code, or null to remove the one set. */
            code?: string | null;
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
        /** @description How many open failures of each kind there are. */
        Summary: {
            /**
             * Format: int64
             * @description Announcements of a document or blog post that failed to go out.
             */
            announcements: number;
            /**
             * Format: int64
             * @description Cards whose balance here differs from the provider's.
             */
            card_drift: number;
            /**
             * Format: int64
             * @description Card top-ups whose money didn't reach the card.
             */
            card_loads: number;
            /**
             * Format: int64
             * @description Steps that should have undone a failed operation and failed
             *     themselves, still open.
             */
            compensations: number;
            /**
             * Format: int64
             * @description Events from connectors whose handling failed.
             */
            connector_events: number;
            /**
             * Format: int64
             * @description Mail for cardholders the inbox worker gave up on.
             */
            holder_mail: number;
            /**
             * Format: int64
             * @description Notifications a channel refused for good and nobody sent again yet.
             */
            notifications: number;
            /**
             * Format: int64
             * @description Cards that failed here but exist at the provider.
             */
            orphan_cards: number;
            /**
             * Format: int64
             * @description Webhooks to merchants and organizations that ran out of attempts.
             */
            webhooks: number;
        };
        /**
         * @example {
         *       "answer": "other",
         *       "other_text": "A podcast"
         *     }
         */
        SurveyBody: {
            /** @description `friend` (a friend told me), `telegram_channel` (saw it in a Telegram channel), `search` (found it through search), `ads` (an ad), `review` (a review or an article), `other`, or `skipped` when the user closed the question. */
            answer: string;
            /** @description The user's own words for `other`, up to 500 characters. Ignored for the other answers. */
            other_text?: string | null;
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
        /** @description The storefront after a pull. */
        SyncResult: components["schemas"]["StorefrontView"] & {
            connectors: components["schemas"]["ConnectorSyncOutcome"][];
        };
        /** @description A tag and how many documents carry it. */
        TagCount: {
            /**
             * Format: int64
             * @description Published documents you may read that carry it.
             */
            count: number;
            tag: string;
        };
        /**
         * @example {
         *       "init_data": "query_id=AAH...&user=%7B%22id%22%3A777000%2C%22first_name%22%3A%22Alice%22%7D&auth_date=1700000000&hash=abcdef..."
         *     }
         */
        TelegramExchangeBody: {
            attribution?: null | components["schemas"]["SignupAttribution"];
            /** @description A promo or referral code for a new account. Without it, the `start_param` of the Mini App link is used when it is a code. A code sent for an account that already exists is not applied (`code_result.reason: already_registered`). */
            code?: string | null;
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
        /**
         * @description The fields an operator edits.
         * @example {
         *       "body_markdown": "**{{ amount }} {{ currency }}** is in your balance.",
         *       "button_href": "/wallet",
         *       "button_label": "Open the wallet",
         *       "title": "Deposit confirmed: {{ amount }} {{ currency }}"
         *     }
         */
        TemplateBody: {
            /** @description The message. Paragraphs, `- ` lists, `**bold**`, `*italic*`, `[text](url)`, `` `code` ``. */
            body_markdown: string;
            /** @description Where the button goes. */
            button_href?: string | null;
            /** @description Optional button label. Needs `button_href` to appear. */
            button_label?: string | null;
            /** @description Optional image shown above the message where the channel can show one. */
            image_url?: string | null;
            /** @description Headline: the email subject, the inbox and push title. Placeholders allowed. */
            title: string;
        };
        /** @description One template plus everything the editor needs around it. */
        TemplateDetail: components["schemas"]["TemplateRow"] & {
            /** @description Earlier texts, newest first. */
            history: components["schemas"]["TemplateVersion"][];
            /** @description Values the preview fills the placeholders with. */
            sample_data: unknown;
        };
        /** @description What a message looks like on every channel. */
        TemplatePreview: components["schemas"]["RenderedMessage"] & {
            /** @description The values the placeholders were filled with. */
            data: unknown;
            /** @description The email exactly as it is sent, shell included. */
            email_html: string;
            /** @description The plain-text part of the email. */
            email_text: string;
        };
        /** @description One editable template: an event type in one locale. */
        TemplateRow: {
            /**
             * @description The message itself. Markdown subset: paragraphs, `- ` lists,
             *     `**bold**`, `*italic*`, `[text](url)`, `` `code` ``.
             */
            body_markdown: string;
            /** @description Where the button goes. A path is resolved against the deployment's site. */
            button_href?: string | null;
            /** @description Label of the button; needs `button_href` to show. */
            button_label?: string | null;
            /** @description The event this is the text for, e.g. `deposit_confirmed`. */
            event_type: string;
            /**
             * Format: uuid
             * @description Row id.
             */
            id: string;
            /** @description Shown above the message where the channel supports it. */
            image_url?: string | null;
            /** @description Two-letter language code. */
            locale: string;
            /** @description Set when a send could not render this row. Cleared on the next save. */
            render_error?: string | null;
            /** @description Headline: the email subject, the inbox and push title. */
            title: string;
            /**
             * Format: date-time
             * @description Last saved.
             */
            updated_at: string;
        };
        /**
         * @description One saved edit, kept so the operator can see what changed and the sender
         *     has something to fall back to.
         */
        TemplateVersion: {
            /** @description Body as saved. */
            body_markdown: string;
            /** @description Button link as saved. */
            button_href?: string | null;
            /** @description Button label as saved. */
            button_label?: string | null;
            /**
             * Format: date-time
             * @description When it was saved.
             */
            changed_at: string;
            /**
             * Format: uuid
             * @description The operator who saved it; null for the versions the migration brought in.
             */
            changed_by?: string | null;
            /**
             * Format: uuid
             * @description Version id.
             */
            id: string;
            /** @description Picture as saved. */
            image_url?: string | null;
            /** @description Title as saved. */
            title: string;
        };
        TerminateAllBody: {
            /** @description Why every card is being closed. Required; kept on the job, in the audit log and on every card. */
            reason: string;
            /** @description The current code from the operator's authenticator. Required even with a live session: this closes every card the connector has. */
            totp_code: string;
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
        TestBody: {
            /** @description `transactional` or `broadcast`. */
            lane: components["schemas"]["Lane"];
        };
        /** @description A picture for the tile. */
        TileImageBody: {
            /** @description `image/png`, `image/webp` or `image/jpeg`. */
            content_type: string;
            /** @description The file, base64 (a `data:` URL is accepted too). Up to 1 MiB. */
            data_base64: string;
            /** @description Original file name, kept for the audit trail only. */
            filename?: string | null;
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
            debt?: null | components["schemas"]["BalanceResponse"];
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
            /** @description Keep this browser signed in; see `POST /auth/refresh`. */
            remember_me?: boolean;
        };
        /**
         * @example {
         *       "anonymous_key": "8f14e45f-ceea-467a-9575-2b2f3c1d0a77",
         *       "platform": "web",
         *       "referrer": "https://t.me/",
         *       "url": "https://example.com/?utm_source=telegram&utm_campaign=spring-promo"
         *     }
         */
        TouchBody: components["schemas"]["TouchFields"] & {
            /** @description The visitor's anonymous id: a random value kept in a cookie and in local storage for a year, 8 to 64 letters, digits, dashes or underscores. In the Telegram Mini App, `tg:` followed by the Telegram user id. */
            anonymous_key: string;
        };
        /**
         * @description A visit as the front end saw it.
         * @example {
         *       "platform": "web",
         *       "referrer": "https://yandex.ru/",
         *       "url": "https://example.com/cards?utm_source=yandex&utm_medium=cpc&utm_campaign=spring-promo&yclid=123"
         *     }
         */
        TouchFields: {
            /** @description The code from a Telegram link to the bot or the Mini App (`start` / `startapp`). */
            campaign_code?: string | null;
            /** @description Google Analytics client id from its `_ga` cookie. */
            ga_client_id?: string | null;
            /** @description Yandex Metrica client id from its `_ym_uid` cookie. */
            metrika_client_id?: string | null;
            /**
             * Format: date-time
             * @description When the visit happened, for a touch the browser kept and sends later. Defaults to now; a time in the future counts as now.
             */
            occurred_at?: string | null;
            /** @description `web`, `miniapp` or `app`. Taken from the `X-Takeal-Client` header when left out. */
            platform?: string | null;
            /** @description `document.referrer` as the browser gave it. Leave it out or empty for none. */
            referrer?: string | null;
            /** @description Full address of the page the visit landed on, query included, as the browser shows it. Tags and click ids are read from it; anything that looks like an e-mail address, a phone number or a secret is dropped. */
            url?: string | null;
        };
        TouchRecorded: {
            /** @description `false` when the visit brought nothing new (a reload, a return with no tags and no foreign referrer) or the visitor already has fifty touches. */
            recorded: boolean;
        };
        TouchView: {
            campaign_code?: string | null;
            channel: string;
            click_ids: Record<string, never>;
            /** Format: uuid */
            id: string;
            /** @description `tag`, `referrer`, `telegram` or `first_visit`. */
            kind: string;
            landing_host?: string | null;
            landing_path: string;
            /** Format: date-time */
            occurred_at: string;
            /** @description `web`, `miniapp` or `app`. */
            platform: string;
            referrer?: string | null;
            source?: string | null;
            utm_campaign?: string | null;
            utm_content?: string | null;
            utm_medium?: string | null;
            utm_source?: string | null;
            utm_term?: string | null;
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
        /**
         * @example {
         *       "amount": "25.00",
         *       "to_card_id": "6f1e9a4c-6c1a-4f8e-9a1f-2b3c4d5e6f70"
         *     }
         */
        TransferCardBody: {
            /**
             * @description Amount to move, decimal string, in the cards' currency.
             * @example 25.00
             */
            amount: string;
            /**
             * Format: uuid
             * @description The card to move the money to. Must be yours, active, in the same currency and of the same kind as the card in the path.
             */
            to_card_id: string;
        };
        /** @description A finished transfer with the state the client needs to redraw both cards. */
        TransferResult: {
            /** @description Balance of the card the money left, in the cards' currency. */
            from_balance: components["schemas"]["BalanceResponse"];
            /** @description Balance of the card the money went to. */
            to_balance: components["schemas"]["BalanceResponse"];
            transfer: components["schemas"]["CardTransfer"];
            /** @description The wallet after the transfer. It holds the money when `transfer.status` is `on_wallet`. */
            wallet: components["schemas"]["BalanceResponse"];
        };
        /** @description The navigation tree: folders and the documents in them. */
        Tree: {
            /** @description Published documents you may read, in folder order. */
            documents: components["schemas"]["TreeEntry"][];
            /** @description Every folder with at least one document you may read under it, plus the categories. */
            folders: components["schemas"]["PublicFolder"][];
        };
        /** @description A document as it appears in the navigation tree: enough for a link. */
        TreeEntry: {
            excerpt: string;
            /** Format: uuid */
            folder_id: string;
            /** Format: int32 */
            position: number;
            /** @description Path under the site root where this document is read. */
            site_path: string;
            slug: string;
            tags: string[];
            title: string;
            /** Format: date-time */
            updated_at: string;
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
        UnrecognisedLine: {
            /** @description Line number in the file, from 1. */
            line: number;
            value: string;
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
        UpdateMerchantUserBody: {
            /**
             * @description `false` blocks the user: they can't sign in and their open sessions stop
             *     working at the next request. `true` lets them back in.
             */
            is_active?: boolean | null;
            role?: null | components["schemas"]["MerchantRole"];
        };
        UpdateUserBody: {
            /**
             * @description `false` blocks the user: they can't sign in and their open sessions stop
             *     working at the next request. `true` lets them back in.
             */
            is_active?: boolean | null;
            role?: null | components["schemas"]["OrganizationRole"];
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
        UploadResult: {
            /** @description Conversions sent in this run. Each event is sent once, so a second run right after sends nothing new. */
            uploaded: number;
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
            bonus?: null | components["schemas"]["IssuanceBonus"];
            /** @description `virtual` or `physical`. A physical card has a PIN (`POST /me/cards/{id}/pin`); its details are on the plastic. */
            card_form: string;
            card_type: components["schemas"]["CardType"];
            /** @description Why the card can't be closed right now, null when it can: `first_purchase_required` (it closes after its first purchase) or `card_locked` (only support can change it). */
            close_blocked?: string | null;
            /** Format: date-time */
            created_at: string;
            currency: string;
            /** @description The design shown for this card. */
            design: components["schemas"]["DesignRef"];
            /** Format: int32 */
            expiry_month?: number | null;
            /** Format: int32 */
            expiry_year?: number | null;
            /** @description For a `failed` card, a sentence for the holder saying it wasn't issued. Null otherwise. */
            failure_reason?: string | null;
            /** Format: uuid */
            id: string;
            /** @description The starting balance the card was issued with, decimal string; null or 0 for a card issued empty. */
            initial_amount?: string | null;
            /** @description Last four digits of the card number. */
            last4?: string | null;
            /** @description The name the holder gave the card. */
            name?: string | null;
            product?: null | components["schemas"]["ProductRef"];
            /** @description Gift cards only, returned once on creation. */
            redemption_code?: string | null;
            status: components["schemas"]["CardStatus"];
            /** @description Who made the last status change: `holder`, `operator` or `provider`. A card the provider froze (`frozen` with `provider`) is unfrozen only by the provider's support, so there is no point offering to unfreeze it. Null when the status never changed. */
            status_source?: string | null;
            /** @description Top-ups the issuer has held for too long, summed, decimal string in the card's currency. The money is safe and waits; support settles it. Null when there are none. */
            topups_held?: string | null;
            /** @description Top-ups the issuer has accepted and not loaded onto the card yet, summed, decimal string in the card's currency. Null when there are none. */
            topups_pending?: string | null;
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
            /** @description Bonuses the user can use, decimal string; bonuses held for a payment still going through are not counted. */
            bonus_balance: string;
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
             * @description End of the current billing period; for a gift, when it ends (null = never).
             */
            current_period_end?: string | null;
            /**
             * Format: int32
             * @description Discount on funding fees, in basis points.
             */
            funding_discount_bps: number;
            /**
             * Format: date-time
             * @description For a gift: when it ends; null = no end date.
             */
            gift_until?: string | null;
            /**
             * Format: uuid
             * @description The code that gave the gift, if one did.
             */
            granted_by_code_id?: string | null;
            /**
             * Format: uuid
             * @description The operator who gave the gift, if one did.
             */
            granted_by_user_id?: string | null;
            /** Format: uuid */
            id: string;
            /**
             * Format: int32
             * @description Discount on card issuance fees, in basis points.
             */
            issuance_discount_bps: number;
            /** @description `billing` (charged every month) or `gift` (never charged). */
            kind: string;
            /** @description Monthly fee, decimal string. */
            monthly_fee: string;
            /**
             * Format: uuid
             * @description A promo code the monthly fee is charged with.
             */
            promo_code_id?: string | null;
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
        /**
         * @example {
         *       "amount": "10.00",
         *       "code": "SPRING",
         *       "currency": "USD",
         *       "operation": "card_issuance"
         *     }
         */
        ValidateBody: {
            /** @description The operation's amount, decimal string: the top-up amount, the card's price, the monthly fee. Needed for a code with a minimum amount or a fixed discount. */
            amount?: string | null;
            /** @description The code as the person typed it; case doesn't matter. */
            code: string;
            /** @description ISO 4217 code of `amount`. For a top-up, the currency it is credited in (the wallet's or the card's) when that differs from what is paid. */
            currency?: string | null;
            /** @description `deposit`, `card_issuance`, `subscription` or `signup`. For `signup` a signed-in person always gets `already_registered`: send the code with the sign-up itself. */
            operation: components["schemas"]["Operation"];
        };
        ValidateView: {
            /** @description The code as it is stored. */
            code?: string | null;
            discount?: null | components["schemas"]["DiscountView"];
            /** @description For a card or the monthly fee with `amount` sent: what the discount takes off it, decimal string. For a top-up it comes off the commission, worked out when the top-up is made. */
            discount_value?: string | null;
            /** @description Everything else the code gives: bonuses (a discount on our services), a gift subscription, a referral code of your own. Applied once the operation goes through. */
            effects: Record<string, never>[];
            /** @description `promo` or `referral`. */
            kind?: string | null;
            /** @description A sentence to show when the code can't be used. */
            message?: string | null;
            reason?: null | components["schemas"]["Rejection"];
            /** @description Whether the code can be used on this operation now. */
            valid: boolean;
        };
        /** @description A version without its text: the list a reader picks a past redaction from. */
        VersionSummary: {
            /** Format: date-time */
            changed_at: string;
            /**
             * Format: date-time
             * @description When this text takes effect.
             */
            effective_from: string;
            /** @description What changed, in the editor's words. */
            note: string;
            title: string;
            /** Format: int32 */
            version: number;
        };
        /** @description Fields to change on a saved version: its date and its note. */
        VersionUpdate: {
            /** Format: date-time */
            effective_from?: string | null;
            note?: string | null;
        };
        VoidStockBody: {
            /** @description Why the plastic will never be activated: lost, damaged, returned. */
            reason: string;
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
        WebhookPage: {
            items: components["schemas"]["FailedWebhook"][];
            /** Format: int64 */
            total: number;
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
    get_changelog: {
        parameters: {
            query?: {
                /** @description Language code: `en`, `ru`, `de`, `es`, `fr`, `pt-BR` or `zh-Hans`. Regional variants count (`pt-PT` gives `pt-BR`, `de-AT` gives `de`). A language the changelog hasn't been translated into gives English. Without `lang`, the `Accept-Language` header decides. */
                lang?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The changelog */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Changelog"];
                };
            };
            /** @description Not signed in */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not a staff account */
            403: {
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
                    "application/json": components["schemas"]["DocumentSummary"][];
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
                "application/json": components["schemas"]["NewDocument"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentDetail"];
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
                    "application/json": components["schemas"]["DocumentDetail"];
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
                "application/json": components["schemas"]["DocumentUpdate"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentDetail"];
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
            /** @description This version was already sent on this channel */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    broadcast_draft: {
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
            /** @description The draft broadcast */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BroadcastRow"];
                };
            };
            /** @description No such post */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_broadcasts: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Broadcasts */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BroadcastRow"][];
                };
            };
            /** @description Missing the broadcasts.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_broadcast: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BroadcastBody"];
            };
        };
        responses: {
            /** @description Draft written */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BroadcastRow"];
                };
            };
            /** @description Empty title or body, unknown channel, segment or category */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the broadcasts.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    count_segment: {
        parameters: {
            query: {
                /** @description all · marketing · has_card · has_deposit · tier · locale · list */
                segment_kind: string;
                /** @description The tier code or the language, for the segments that take one */
                segment_value?: string;
                /** @description Defaults to marketing, which reaches only the users who consented */
                category?: string;
                /** @description The broadcast whose uploaded list the `list` segment counts */
                broadcast_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The number of recipients */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AudienceCount"];
                };
            };
            /** @description Unknown segment */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the broadcasts.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_broadcast: {
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
            /** @description The broadcast with its report */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BroadcastDetail"];
                };
            };
            /** @description Missing the broadcasts.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such broadcast */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    update_broadcast: {
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
            /** @description Saved */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BroadcastRow"];
                };
            };
            /** @description Empty title or body, unknown channel, segment or category */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the broadcasts.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such broadcast */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_broadcast: {
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
            /** @description Missing the broadcasts.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such broadcast */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    preview_broadcast: {
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
            /** @description One message, three shapes */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BroadcastPreview"];
                };
            };
            /** @description Missing the broadcasts.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such broadcast */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    upload_recipients: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        /** @description User ids, one per line */
        requestBody: {
            content: {
                "text/csv": string;
            };
        };
        responses: {
            /** @description What was accepted */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RecipientUpload"];
                };
            };
            /** @description Missing the broadcasts.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such broadcast */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    send_broadcast: {
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
            /** @description Handed over */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BroadcastSend"];
                };
            };
            /** @description The broadcast has no title or body, or email is ticked while broadcast mail is not set up (`mail_lane_off`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the broadcasts.send permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such broadcast */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description These exact words have already been sent (`already_sent`) */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_campaigns: {
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
                    "application/json": components["schemas"]["CampaignList"];
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
    create_campaign: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewCampaign"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
            /** @description The code or a field is not valid */
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
            /** @description The code is taken (`campaign_exists`) */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    update_campaign: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Campaign code, any case */
                code: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CampaignPatch"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
            /** @description Not permitted */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such code */
            404: {
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
    activate_stock: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Stock entry id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ActivateStockBody"];
            };
        };
        responses: {
            /** @description The card */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description No holder, or the card is void */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The holder's wallet cannot cover the program's price */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing cards.stock permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such stock entry */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `provider_refused`: the provider did not activate the card (wrong code, say) */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    assign_stock: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Stock entry id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AssignStockBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardStock"];
                };
            };
            /** @description The card is activated or void */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing cards.stock permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such stock entry */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    void_stock: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Stock entry id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VoidStockBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardStock"];
                };
            };
            /** @description The card is activated or void already */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing cards.stock permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such stock entry */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    recheck_topup: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Top-up id */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The top-up after asking; `status` says how it stands */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardTopup"];
                };
            };
            /** @description Missing cards.reconcile permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such top-up */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `not_settleable`: the top-up is not with the issuer */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    return_topup: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Top-up id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SettleNoteBody"];
            };
        };
        responses: {
            /** @description The returned top-up */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardTopup"];
                };
            };
            /** @description Missing cards.reconcile permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such top-up */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `not_settleable`: the top-up is not with the issuer */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    write_off_topup: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Top-up id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SettleNoteBody"];
            };
        };
        responses: {
            /** @description The written-off top-up */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardTopup"];
                };
            };
            /** @description Missing cards.reconcile permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such top-up */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `not_settleable`: the top-up is not with the issuer */
            409: {
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
    generate: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GenerateCardholderBody"];
            };
        };
        responses: {
            /** @description Made-up holder details */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerInfo"];
                };
            };
            /** @description The country or state is not one the platform can place a holder in */
            400: {
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
    adjust_card: {
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
                "application/json": components["schemas"]["AdjustBody"];
            };
        };
        responses: {
            /** @description The card after the correction */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description Amount not positive, currency mismatch, missing reason, or the card is not active (provider side) */
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
            /** @description The issuer cannot make this movement on this card */
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
    force_sync_card: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Card UUID */
                id: string;
            };
            cookie?: never;
        };
        /** @description Optional */
        requestBody: {
            content: {
                "application/json": components["schemas"]["ForceSyncBody"];
            };
        };
        responses: {
            /** @description Synced */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForceSyncResult"];
                };
            };
            /** @description Missing the cards.reconcile permission */
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
            /** @description The provider doesn't know this card, doesn't report its balance, or reports it in another currency */
            409: {
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
    set_moderation: {
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
                "application/json": components["schemas"]["SetModerationBody"];
            };
        };
        responses: {
            /** @description The hold after the change */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ModerationState"];
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
    set_no_pin_limit: {
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
                "application/json": components["schemas"]["NoPinLimitBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Card"];
                };
            };
            /** @description Negative amount */
            400: {
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
            /** @description No such card */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `provider_refused`: the provider did not take the limit */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not a physical card, or the connector has no PIN limit */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    card_provider_fees: {
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
                    "application/json": components["schemas"]["ProviderEventRow"][];
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
    list_card_topups: {
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
                    "application/json": components["schemas"]["CardTopup"][];
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
    list_code_programs: {
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
                    "application/json": components["schemas"]["ProgramSummary"][];
                };
            };
            /** @description Missing the codes.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_code_program: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ProgramInput"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Program"];
                };
            };
            /** @description Invalid terms or effects */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the codes.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description A program with this name exists */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_code_program: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Program id */
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
                    "application/json": components["schemas"]["ProgramDetail"];
                };
            };
            /** @description No such program */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    update_code_program: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Program id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ProgramInput"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Program"];
                };
            };
            /** @description Invalid terms or effects */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such program */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_code_program: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Program id */
                id: string;
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
            /** @description No such program */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Codes still use it */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_code_redemptions: {
        parameters: {
            query?: {
                code_id?: string | null;
                program_id?: string | null;
                user_id?: string | null;
                /** @description Default 100, at most 500. */
                limit?: number | null;
                offset?: number | null;
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
                    "application/json": components["schemas"]["RedemptionView"][];
                };
            };
        };
    };
    list_promo_codes: {
        parameters: {
            query?: {
                /** @description `promo` or `referral`. */
                kind?: string | null;
                /** @description `active` or `disabled`. */
                status?: string | null;
                program_id?: string | null;
                /** @description The owner of a referral code. */
                owner_user_id?: string | null;
                /** @description Part of the code or of the owner's e-mail. */
                q?: string | null;
                /** @description Default 100, at most 500. */
                limit?: number | null;
                offset?: number | null;
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
                    "application/json": components["schemas"]["CodesPage"];
                };
            };
        };
    };
    create_promo_code: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewCodeBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CodeView"];
                };
            };
            /** @description Invalid code or dates */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such program */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The code is taken */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_promo_code: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Code id */
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
                    "application/json": components["schemas"]["CodeDetail"];
                };
            };
            /** @description No such code */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_promo_code: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Code id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchCodeBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CodeView"];
                };
            };
            /** @description No such code */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The owner already has another working referral code */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_job: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Job id */
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
                    "application/json": components["schemas"]["ConnectorJob"];
                };
            };
            /** @description Missing connectors.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such job */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    retry_job: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Job id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TerminateAllBody"];
            };
        };
        responses: {
            /** @description The new job, queued */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConnectorJob"];
                };
            };
            /** @description Wrong or missing one-time code */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing cards.mass_terminate permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such job */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `nothing_to_retry`: the job is not finished or refused no card; `job_running`: another job on the connector has not finished */
            409: {
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
            /** @description The connector's version doesn't match the platform, so it can't be changed until it does (`connector_incompatible`) */
            409: {
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
            /** @description The connector's version doesn't match the platform, so it can't be changed until it does (`connector_incompatible`) */
            409: {
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
    list_stock: {
        parameters: {
            query?: {
                /** @description `in_stock`, `assigned`, `activated` or `void`. All when omitted. */
                status?: string | null;
            };
            header?: never;
            path: {
                /** @description Card connector slug */
                slug: string;
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
                    "application/json": components["schemas"]["CardStock"][];
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
    import_stock: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Card connector slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ImportStockBody"];
            };
        };
        responses: {
            /** @description How many cards were added and skipped */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StockImportOutcome"];
                };
            };
            /** @description Not a physical program of this connector, or a malformed row */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing cards.stock permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    terminate_all: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Card connector slug */
                slug: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TerminateAllBody"];
            };
        };
        responses: {
            /** @description The job, queued */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConnectorJob"];
                };
            };
            /** @description No reason given */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Wrong or missing one-time code */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing cards.mass_terminate permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such card connector */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `job_running`: a job on this connector has not finished */
            409: {
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
            /** @description The connector's version doesn't match the platform, so it can't be changed until it does (`connector_incompatible`) */
            409: {
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
            /** @description The connector's version doesn't match the platform, so it can't be changed until it does (`connector_incompatible`) */
            409: {
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
            /** @description The connector's version doesn't match the platform, so it can't be changed until it does (`connector_incompatible`) */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_deposit_pricing: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Funding connector slug */
                slug: string;
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
                    "application/json": components["schemas"]["DepositPricingView"][];
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
    put_deposit_pricing: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Funding connector slug */
                slug: string;
                /** @description card, crypto, bank_transfer or sbp */
                method: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DepositPricingBody"];
            };
        };
        responses: {
            /** @description The terms as stored */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepositPricingView"];
                };
            };
            /** @description Bad fee kind, fee, lifetime, currency, limit or rate source; or not a funding connector */
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
            /** @description Unknown connector slug */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_deposit_pricing: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Funding connector slug */
                slug: string;
                /** @description card, crypto, bank_transfer or sbp */
                method: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Removed, or there was nothing to remove */
            204: {
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
            /** @description Unknown connector slug */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_jobs: {
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
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConnectorJob"][];
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
    connector_provider_events: {
        parameters: {
            query?: {
                /** @description How many days back the daily totals cover. Default 30, max 365. */
                days?: number | null;
            };
            header?: never;
            path: {
                /** @description Card connector slug */
                slug: string;
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
                    "application/json": components["schemas"]["ConnectorProviderEvents"];
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
            /** @description The connector's version doesn't match the platform, so it can't be changed until it does (`connector_incompatible`) */
            409: {
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
    list_deposits: {
        parameters: {
            query?: {
                /** @description Maximum number of rows to return. Default 100, max 500. */
                limit?: number | null;
                /** @description Only deposits created before this moment, for the next page: pass the `created_at` of the last row. */
                before?: string | null;
                /** @description `pending`, `redirect_required`, `confirmed` or `failed`. */
                status?: string | null;
                /** @description Where the money goes: `wallet` or `card`. */
                target?: string | null;
                /** @description Top-ups onto a card only: `pending`, `succeeded` or `failed`. */
                card_load_status?: string | null;
                user_id?: string | null;
                /** @description Top-ups onto this card. */
                card_id?: string | null;
                /** @description Slug of the funding connector. */
                connector_slug?: string | null;
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
                    "application/json": components["schemas"]["OperatorDepositRow"][];
                };
            };
            /** @description Missing deposits.read permission */
            403: {
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
                /** @description Deposit id */
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
                    "application/json": components["schemas"]["OperatorDepositRow"];
                };
            };
            /** @description Missing deposits.read permission */
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
    recheck_card_load: {
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
            /** @description The deposit after asking; `card_load_status` says how it stands */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OperatorDepositRow"];
                };
            };
            /** @description Missing cards.reconcile permission */
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
            /** @description `not_settleable`: no card load waits for the issuer */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_deposit_refunds: {
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
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Refund"][];
                };
            };
            /** @description Missing deposits.read permission */
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
                /** @description Required. The same key with the same body returns the original refund; the same key with a different body returns 409. */
                "Idempotency-Key": string;
            };
            path: {
                /** @description Deposit id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OperatorRefundBody"];
            };
        };
        responses: {
            /** @description The refund; `status` is pending, succeeded or failed */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Refund"];
                };
            };
            /** @description No reason, no Idempotency-Key, the deposit is not confirmed or went to a card, or the amount is above what was confirmed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing deposits.refund permission */
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
            /** @description Idempotency-Key reused with a different body */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    retry_card_load: {
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
            /** @description The deposit after the attempt; `card_load_status` says how it went */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OperatorDepositRow"];
                };
            };
            /** @description Missing cards.recharge permission */
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
            /** @description `not_retryable`: not a top-up onto a card, not settled, already loaded, moved to the wallet, or an attempt is running */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    return_card_load: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Deposit id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SettleNoteBody"];
            };
        };
        responses: {
            /** @description The deposit after the return */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OperatorDepositRow"];
                };
            };
            /** @description Missing cards.reconcile permission */
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
            /** @description `not_settleable`: no card load waits for the issuer */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    write_off_card_load: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Deposit id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SettleNoteBody"];
            };
        };
        responses: {
            /** @description The deposit after the write-off */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OperatorDepositRow"];
                };
            };
            /** @description Missing cards.reconcile permission */
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
            /** @description `not_settleable`: no card load waits for the issuer */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_documents: {
        parameters: {
            query?: {
                /** @description Words to search for in the title and the text. */
                q?: string | null;
                tag?: string | null;
                /** @description Category key. */
                category?: string | null;
                /** @description Only this folder and the folders under it. */
                folder_id?: string | null;
                /** @description `draft`, `published` or `archived`. */
                status?: string | null;
                /** @description Only documents with exactly this read level. */
                read_scope?: null | components["schemas"]["Scope"];
                locale?: string | null;
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
                    "application/json": components["schemas"]["AdminDocumentList"];
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
    create_document: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewDocument"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentDetail"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not permitted, or a level above your own */
            403: {
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
    list_folders: {
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
                    "application/json": components["schemas"]["Folder"][];
                };
            };
        };
    };
    create_folder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewFolder"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Folder"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such parent */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description A folder with that key already exists here */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_folder: {
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
            /** @description Not empty, or a category */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such folder */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_folder: {
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
                "application/json": components["schemas"]["FolderUpdate"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Folder"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such folder */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description A folder with that key already exists here */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_list_images: {
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
    admin_upload_image: {
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
    preview: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PreviewBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Preview"];
                };
            };
        };
    };
    list_tags: {
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
                    "application/json": components["schemas"]["AdminTagCount"][];
                };
            };
        };
    };
    get_document: {
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
                    "application/json": components["schemas"]["DocumentDetail"];
                };
            };
            /** @description Not found, or above your level */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_document: {
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
            /** @description Edited by a level above yours */
            403: {
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
    patch_document: {
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
                "application/json": components["schemas"]["DocumentUpdate"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentDetail"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Edited by a level above yours, or a level above your own */
            403: {
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
    admin_broadcast: {
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
            /** @description Unknown channel, the document is not published, or it is not readable by users */
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
            /** @description This version was already sent on this channel */
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
    admin_broadcast_draft: {
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
            /** @description The draft broadcast */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BroadcastRow"];
                };
            };
            /** @description Missing the broadcasts.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such document */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_version: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                /** @description Version number */
                version: number;
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
                    "application/json": components["schemas"]["DocumentVersion"];
                };
            };
            /** @description No such document or version */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_version: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                /** @description Version number */
                version: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VersionUpdate"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentVersion"];
                };
            };
            /** @description Edited by a level above yours */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such document or version */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_announcements: {
        parameters: {
            query?: {
                /** @description 1 to 200. Default 50. */
                limit?: number;
                /** @description Rows to skip. Default 0. */
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
                    "application/json": components["schemas"]["AnnouncementPage"];
                };
            };
            /** @description limit out of range */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
    list_card_drift: {
        parameters: {
            query?: {
                /** @description 1 to 200. Default 50. */
                limit?: number;
                /** @description Rows to skip. Default 0. */
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
                    "application/json": components["schemas"]["DriftPage"];
                };
            };
            /** @description limit out of range */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
    list_compensations: {
        parameters: {
            query?: {
                /** @description `open` (default), `resolved` or `all`. */
                state?: "open" | "resolved" | "all";
                /** @description 1 to 200. Default 50. */
                limit?: number;
                /** @description Rows to skip. Default 0. */
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
                    "application/json": components["schemas"]["CompensationPage"];
                };
            };
            /** @description limit out of range or unknown state */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
    resolve_compensation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Failed compensation id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ResolveBody"];
            };
        };
        responses: {
            /** @description Closed */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Empty note, or one longer than 2000 characters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the settlements.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No failed compensation with that id */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Already closed (`already_resolved`) */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_connector_events: {
        parameters: {
            query?: {
                /** @description 1 to 200. Default 50. */
                limit?: number;
                /** @description Rows to skip. Default 0. */
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
                    "application/json": components["schemas"]["ConnectorEventPage"];
                };
            };
            /** @description limit out of range */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
    retry_connector_event: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Event id */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Handled */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the connectors.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Already handled, being handled right now, or can't be run again (`not_retryable`) */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Handling failed again (`handler_failed`); the message says why */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_holder_mail: {
        parameters: {
            query?: {
                /** @description 1 to 200. Default 50. */
                limit?: number;
                /** @description Rows to skip. Default 0. */
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
                    "application/json": components["schemas"]["HolderMailPage"];
                };
            };
            /** @description limit out of range */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
    resolve_holder_mail: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Row id from the list */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ResolveBody"];
            };
        };
        responses: {
            /** @description Closed */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Empty note */
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
            /** @description No open row with that id */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    summary: {
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
                    "application/json": components["schemas"]["Summary"];
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
    list_webhooks: {
        parameters: {
            query?: {
                /** @description 1 to 200. Default 50. */
                limit?: number;
                /** @description Rows to skip. Default 0. */
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
                    "application/json": components["schemas"]["WebhookPage"];
                };
            };
            /** @description limit out of range */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
    retry_webhook: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Webhook id */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queued again */
            204: {
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
            /** @description No failed webhook with that id */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The endpoint is no longer active (`endpoint_inactive`) */
            409: {
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
    get_license: {
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
                    "application/json": components["schemas"]["LicenseView"];
                };
            };
            /** @description Not signed in */
            401: {
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
        };
    };
    lanes: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Both lanes */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailLanes"];
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
    get_layout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The layout in use */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LayoutView"];
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
    put_layout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MailLayout"];
            };
        };
        responses: {
            /** @description Saved */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LayoutView"];
                };
            };
            /** @description Does not render, or leaves out the message or the unsubscribe link */
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
        };
    };
    delete_layout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The shipped layout is in use again */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LayoutView"];
                };
            };
            /** @description Missing the settings.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    preview_layout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LayoutPreviewBody"];
            };
        };
        responses: {
            /** @description The rendered email */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmailParts"];
                };
            };
            /** @description The layout does not render */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
    test_send: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TestBody"];
            };
        };
        responses: {
            /** @description Queued */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The lane is not configured (`mail_lane_off`) */
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
            /** @description The notification substrate is not reachable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    my_access: {
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
                    "application/json": components["schemas"]["MyAccess"];
                };
            };
        };
    };
    update_my_profile: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ProfileBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MyAccess"];
                };
            };
            /** @description Unknown language (`validation`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not signed in */
            401: {
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
    update_merchant_user: {
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
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateMerchantUserBody"];
            };
        };
        responses: {
            /** @description Updated user */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MerchantUser"];
                };
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
    reset_merchant_user_password: {
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
            /** @description temporary_password is plaintext and shown only once */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NewMerchantUser"];
                };
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
            /** @description The merchant has no such shop */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The shop is archived */
            409: {
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
    upload_now: {
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
                    "application/json": components["schemas"]["UploadResult"];
                };
            };
            /** @description Not permitted */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Uploads are off, or the counter or token is missing (`metrika_not_configured`) */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Metrica refused the upload (`metrika_error`) */
            502: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_templates: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Stored templates */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TemplateRow"][];
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
    preview_template: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PreviewBody"];
            };
        };
        responses: {
            /** @description What the message looks like */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TemplatePreview"];
                };
            };
            /** @description The text does not render (`template_broken`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
    get_template: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Event slug, e.g. `deposit_confirmed` */
                event_type: string;
                /** @description Language code: `en`, `ru`, `de`, `es`, `fr`, `pt-BR` or `zh-Hans` */
                locale: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The template with its history */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TemplateDetail"];
                };
            };
            /** @description Missing the settings.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No stored template for this event and language */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    put_template: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                event_type: string;
                locale: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TemplateBody"];
            };
        };
        responses: {
            /** @description Saved */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TemplateRow"];
                };
            };
            /** @description The text does not render (`template_broken`), or a field is empty */
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
        };
    };
    delete_template: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                event_type: string;
                locale: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Deleted; the shipped text is used again */
            204: {
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
            /** @description No stored template for this event and language */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    test_send_template: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                event_type: string;
                locale: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queued for your account */
            202: {
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
            /** @description No stored template for this event and language */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The notification substrate is not reachable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_dead_letters: {
        parameters: {
            query?: {
                /** @description `open` (not retried yet, the default), `retried` or `all`. */
                state?: string;
                /** @description 1 to 200. Default 50. */
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
                    "application/json": components["schemas"]["DeadLetterPage"];
                };
            };
            /** @description Unknown state or limit out of range */
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
        };
    };
    retry_dead_letter: {
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
                    "application/json": components["schemas"]["DeadLetter"];
                };
            };
            /** @description Not permitted */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such failed notification */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description This notification can't be sent again */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The queue didn't take it; try again */
            502: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deliveries: {
        parameters: {
            query?: {
                /** @description Window in hours back from now, 1 to 720. Default 24. */
                hours?: number;
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
                    "application/json": components["schemas"]["DeliveriesReport"];
                };
            };
            /** @description hours out of range */
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
    update_user: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Organization UUID. The user must belong to this organization */
                id: string;
                /** @description Organization user UUID */
                user_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUserBody"];
            };
        };
        responses: {
            /** @description Updated user */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgUserView"];
                };
            };
            /** @description Not allowed to manage organizations */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such organization user */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    reset_user_password: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Organization UUID. The user must belong to this organization */
                id: string;
                /** @description Organization user UUID */
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description temporary_password is plaintext and shown only once */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NewUserView"];
                };
            };
            /** @description Not allowed to manage organizations */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such organization user */
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
    get_storefront: {
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
                    "application/json": components["schemas"]["StorefrontView"];
                };
            };
            /** @description Missing the storefront.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    put_order: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OrderBody"];
            };
        };
        responses: {
            /** @description The storefront in its new order */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StorefrontView"];
                };
            };
            /** @description An id is listed twice (`duplicate_id`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the storefront.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description An id names no product */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patch_product: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Product id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchProductBody"];
            };
        };
        responses: {
            /** @description The product after the change */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StorefrontProduct"];
                };
            };
            /** @description A value out of bounds (`validation`), a design that does not exist or is disabled (`unknown_design`), or putting an unnamed product on sale (`unnamed_product`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the storefront.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such product */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    upload_tile_image: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Product id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TileImageBody"];
            };
        };
        responses: {
            /** @description The product with its new tile picture */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StorefrontProduct"];
                };
            };
            /** @description Unsupported or oversized file (`unsupported_image`, `image_too_large`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the storefront.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such product */
            404: {
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
    put_issuance: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Product id */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["IssuanceBody"];
            };
        };
        responses: {
            /** @description The product after the change */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StorefrontProduct"];
                };
            };
            /** @description Bad status */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the connectors.write permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No such product */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    sync_storefront: {
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
                    "application/json": components["schemas"]["SyncResult"];
                };
            };
            /** @description Missing the storefront.write permission */
            403: {
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
    user_attribution: {
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
                    "application/json": components["schemas"]["AttributionView"];
                };
            };
            /** @description Not permitted */
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
    admin_user_bonus: {
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
                    "application/json": components["schemas"]["BonusSnapshot"];
                };
            };
            /** @description Missing the users.read permission */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    admin_bonus_adjust: {
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
                "application/json": components["schemas"]["BonusAdjustBody"];
            };
        };
        responses: {
            /** @description The user's bonuses after the change */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BonusSnapshot"];
                };
            };
            /** @description Zero amount, more than two decimal places, a note that is too short, or an end date in the past */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing the users.bonus.adjust permission */
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
            /** @description `not_enough_bonuses`: the user holds fewer than the amount taken back */
            409: {
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
    user_referral: {
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
                    "application/json": components["schemas"]["AdminReferral"];
                };
            };
        };
    };
    issue_referral_code: {
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
                "application/json": components["schemas"]["IssueReferralBody"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CodeView"];
                };
            };
            /** @description No such user or program */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The user already has a working referral code, or the code is taken */
            409: {
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
    post_touch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TouchBody"];
            };
        };
        responses: {
            /** @description Whether the visit was stored */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TouchRecorded"];
                };
            };
            /** @description The anonymous key is malformed */
            400: {
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
    logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LogoutBody"];
            };
        };
        responses: {
            /** @description Signed out */
            204: {
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
    refresh: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RefreshBody"];
            };
        };
        responses: {
            /** @description New session and a new remember token */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description The token no longer works (`remember_token_invalid`): sign in again */
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
                    "application/json": components["schemas"]["PublicDocument"];
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
            /** @description Products in storefront order; `is_default` marks the one issued when none is chosen */
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
    documents_list_documents: {
        parameters: {
            query?: {
                /** @description Category key: `blog`, `knowledge-base`, `legal` or `internal`. */
                category?: string | null;
                /** @description Only documents in this folder and the folders under it. */
                folder_id?: string | null;
                /** @description Only documents carrying this tag. */
                tag?: string | null;
                /** @description Only documents in this locale. */
                locale?: string | null;
                /** @description Words to search for in the title and the text. */
                q?: string | null;
                /** @description 1-based page number. Default 1. */
                page?: number | null;
                /** @description Documents per page, 1..=50. Default 10. */
                per_page?: number | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Page of documents */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentList"];
                };
            };
            /** @description Unknown category or folder */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_get_image: {
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
    tags: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Tags with counts */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TagCount"][];
                };
            };
        };
    };
    tree: {
        parameters: {
            query?: {
                /** @description Category key. The whole tree when omitted. */
                category?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Folders and documents */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Tree"];
                };
            };
            /** @description Unknown category */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_get_document: {
        parameters: {
            query?: {
                /** @description Show the text that was in force at this moment (RFC 3339). The current text when omitted. */
                at?: string | null;
            };
            header?: never;
            path: {
                /** @description Document address */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The document */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicDocument"];
                };
            };
            /** @description No document you may read at that address, or no text in force at that moment */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_versions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Document address */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Versions, newest first */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VersionSummary"][];
                };
            };
            /** @description No document you may read at that address */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_get_version: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Document address */
                slug: string;
                /** @description Version number, from the versions list */
                version: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The document at that version */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicDocument"];
                };
            };
            /** @description No such document or version */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    postmark_events: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostmarkEvent"];
            };
        };
        responses: {
            /** @description Recorded, or not one of ours */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Wrong or missing password */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No webhook password is set */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    unsubscribe_page: {
        parameters: {
            query?: {
                /** @description The token from the email. */
                t?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The confirmation page */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/html": unknown;
                };
            };
            /** @description Not a valid link */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/html": unknown;
                };
            };
        };
    };
    unsubscribe: {
        parameters: {
            query?: {
                /** @description The token from the email. */
                t?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Unsubscribed */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/html": unknown;
                };
            };
            /** @description Not a valid link */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/html": unknown;
                };
            };
        };
    };
    my_attribution: {
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
                    "application/json": components["schemas"]["MyAttribution"];
                };
            };
        };
    };
    answer_survey: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SurveyBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MyAttribution"];
                };
            };
            /** @description Not one of the answers */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Already answered (`survey_answered`) */
            409: {
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
    my_debt: {
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
                    "application/json": components["schemas"]["MyDebtView"];
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
    my_bonus: {
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
                    "application/json": components["schemas"]["BonusSnapshot"];
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
    me_preview: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PreviewBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PreviewView"];
                };
            };
            /** @description An amount that is not positive, or an invalid currency */
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
    list_products: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Products in storefront order */
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
            /** @description Wallet balance is too low for the part of the price bonuses don't cover */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Idempotency-Key reused with a different body, or `cardholder_verification_required`: the product only issues to a verified person and no verified details were given */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No card connector is configured on this deployment, or no holder could be prepared for the product's country */
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
            /** @description `currency` is not the card's currency */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `balance_unavailable`: the balance can't be read right now; try again in a minute */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
    set_card_pin: {
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
                "application/json": components["schemas"]["SetPinBody"];
            };
        };
        responses: {
            /** @description PIN set */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserCardView"];
                };
            };
            /** @description The PIN is not four to six digits, or the card is not active */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The card belongs to another user */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `card_locked`, or `provider_refused`: the issuer did not take the PIN */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Too many attempts; try again later */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description A virtual card has no PIN */
            501: {
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
            /** @description `card_locked`: the card is frozen and only support can change it */
            409: {
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
            /** @description `first_purchase_required`: the card closes after its first purchase; `card_locked`: only support can close this card; `move_balance_first`: the card still holds money and you have another open card in the same currency, move it there with `POST /me/cards/{id}/transfer` first; `contact_support_to_close`: the card still holds money and there is no other card to move it to, support closes it; `provider_refused`: the issuer declined, the card is unchanged */
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
    transfer_card: {
        parameters: {
            query?: never;
            header: {
                /** @description Required. The same key with the same body returns the original result; the same key with a different body returns 409. */
                "Idempotency-Key": string;
            };
            path: {
                /** @description The card the money comes from */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TransferCardBody"];
            };
        };
        responses: {
            /** @description Transfer finished, or stopped with the money on the wallet (`status: on_wallet`) */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TransferResult"];
                };
            };
            /** @description Missing Idempotency-Key, amount not positive, the same card twice, different currencies (`currency_mismatch`) or two cards of different kinds (`card_kind_mismatch`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The card does not hold that much (`insufficient_funds`) */
            402: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description One of the cards is not yours */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description A card is frozen, closed or still being issued, or Idempotency-Key reused with a different body */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The card's provider cannot move money off a card */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The provider refused; the money is where it started or on your wallet */
            502: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The provider is not responding; nothing moved */
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
            /** @description `card_locked`: only support can unfreeze this card */
            409: {
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
    validate_code: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ValidateBody"];
            };
        };
        responses: {
            /** @description Whether the code works, and what it would do */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ValidateView"];
                };
            };
            /** @description An invalid amount or currency */
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
    me_list_deposits: {
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
            /** @description Missing Idempotency-Key, invalid body, or unknown funder_slug. `target_not_allowed`: the funding connector does not top up this target (the wallet, or cards). `card_not_eligible`: the card can't be topped up. For `issue_card`, also the codes of `POST /me/cards` */
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
            /** @description `card_id` is not one of your cards */
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
    me_get_deposit: {
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
    me_refund_deposit: {
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
    funding_options: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Funding connectors, preferred first; empty when none is configured */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FundingOptionView"][];
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
    my_history: {
        parameters: {
            query?: {
                /** @description Only this card's operations, transfers to and from it included. */
                card_id?: string;
                /** @description `next_cursor` of the previous page. */
                cursor?: string;
                /** @description Page size, 1 to 100, default 30. */
                limit?: number;
                /** @description `en` or `ru` for `title` and decline reasons. Defaults to the `Accept-Language` header, then English. */
                lang?: string;
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
                    "application/json": components["schemas"]["HistoryPage"];
                };
            };
            /** @description Bad cursor or limit */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `card_id` is not one of your cards */
            404: {
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
    my_referral: {
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
                    "application/json": components["schemas"]["MyReferral"];
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
    my_subscription: {
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
                    "application/json": null | components["schemas"]["UserSubscriptionView"];
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
    set_subscription_code: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SubscriptionCodeBody"];
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
            /** @description The code can't be used on the subscription (`promo_code_*`, with the reason) */
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
            /** @description No paid subscription is running */
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
    org_logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LogoutRequest"];
            };
        };
        responses: {
            /** @description Forgotten */
            204: {
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
    update_me: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ProfileBody"];
            };
        };
        responses: {
            /** @description Updated profile */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgUserPublic"];
                };
            };
            /** @description Unknown language (`validation`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
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
    org_change_password: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChangePasswordRequest"];
            };
        };
        responses: {
            /** @description Changed; use the new token */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LoginResponse"];
                };
            };
            /** @description New password rejected by the policy (`weak_password`) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Current password is wrong, or not signed in */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    org_refresh: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RefreshRequest"];
            };
        };
        responses: {
            /** @description New token and a new remember token */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LoginResponse"];
                };
            };
            /** @description The token no longer works (`remember_token_invalid`): sign in again */
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
    org_list_webhooks: {
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
