# Release checklist — `@takeal/cusfront-sdk`

Publishing is **blocked** until the npm org + an automation token exist. Once a
maintainer has both, the package is ready to ship — everything below the
"blocked" line is already verified.

## Blocked on (one-time setup)

1. Create the `@takeal` org on npmjs.com (or claim the scope under a user).
2. Create an **automation** access token (Account → Access Tokens → Generate →
   *Automation*) with publish rights to the scope.
3. Authenticate locally or in CI:
   - Local: `npm login` (or `npm config set //registry.npmjs.org/:_authToken=<TOKEN>`).
   - CI: set `NODE_AUTH_TOKEN` and add an `.npmrc` with
     `//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}`.

## Already verified (no action needed)

- `npm run typecheck` — clean.
- `npm run test` — full suite green (unit + wire-shape + telegram adapter;
  live journey green against a running deployment).
- `npm run build` — tsup ESM + CJS + `.d.ts` for every entry, incl. `./telegram`.
- `npm publish --access public --dry-run` — succeeds; `prepublishOnly` re-runs
  typecheck + test + build before packing.
- Tarball contents audited: ships `dist/`, `README.md`, `CHANGELOG.md`,
  `LICENSE`, `package.json` only. No `src/`, no `openapi-snapshot.json`, no
  `.env`, no `node_modules`.
- `package.json` has `"publishConfig": { "access": "public" }` so the scoped
  package publishes publicly.

## Publish steps (when unblocked)

```bash
# 1. confirm the version is right (first release = 0.1.0).
#    bump in package.json + add a dated section to CHANGELOG.md if not 0.1.0.

# 2. final dry-run.
npm publish --access public --dry-run

# 3. publish for real.
npm publish --access public

# 4. tag the release.
git tag v0.1.0
git push origin v0.1.0

# 5. verify the published tarball installs + imports cleanly.
cd $(mktemp -d) && npm init -y >/dev/null && npm i @takeal/cusfront-sdk
node -e "import('@takeal/cusfront-sdk').then(m => console.log(typeof m.createClient))"   # → function
node -e "import('@takeal/cusfront-sdk/telegram').then(m => console.log(typeof m.fromInitData))" # → function
```
