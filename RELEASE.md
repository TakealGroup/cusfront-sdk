# Releasing `@takeal/cusfront-sdk`

The SDK has its own version. It started at `0.5.0` together with every other
Takeal service and moves on its own from there: a fix in the SDK is a new SDK
patch release, whatever the platform does. The platform versions an SDK
release works with are in `SUPPORTED_MEISTER` (`src/compat.ts`), a semver
range such as `">=0.5.0, <0.6.0"`; `client.ready()` checks it against the
deployment at run time.

Before a release, check the range: widen it when the SDK was tested against a
newer platform, narrow it when the SDK relies on something only a newer
platform has. The platform changelog (`CHANGELOG.md` in the meister repo)
mentions SDK releases that matter to operators, with the SDK's version.

## One-time setup

The `@takeal` scope already exists on npmjs.com. Publishing needs an npm
account with publish rights on it, signed in on the machine that publishes:

- `npm login`, or
- a granular access token with read-write access to `@takeal/cusfront-sdk`:
  `npm config set //registry.npmjs.org/:_authToken=<TOKEN>`.
  In CI, put the token in `NODE_AUTH_TOKEN` and use an `.npmrc` containing
  `//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}`.

## Steps

```bash
# 1. Types from the API this release was checked against.
curl https://api.<deployment>/docs/openapi.json > openapi-snapshot.json
npm run refresh-types

# 2. The SDK's own next version. Add a dated CHANGELOG section, check
#    SUPPORTED_MEISTER in src/compat.ts.
npm version 0.5.0 --no-git-tag-version

# 3. Dry run. prepublishOnly runs typecheck, tests and build first.
npm publish --access public --dry-run

# 4. Publish, commit, and tag this repo with the same version.
npm publish --access public
git tag v0.5.0 && git push origin v0.5.0

# 5. Check that the published package installs and imports.
cd "$(mktemp -d)" && npm init -y >/dev/null && npm i @takeal/cusfront-sdk@0.5.0
node -e "import('@takeal/cusfront-sdk').then(m => console.log(typeof m.createClient))"    # function
node -e "import('@takeal/cusfront-sdk/push').then(m => console.log(typeof m.PushResource))" # function
```

The tarball ships `dist/`, `README.md`, `CHANGELOG.md`, `LICENSE` and
`package.json` only. If `files` in `package.json` changes, read the dry-run
file list before publishing.

## Repository link

npm renders `repository.url` as a link. It only opens for people who aren't
signed in to git.wiseless.net when both the repository and the organization
that owns it are public.
