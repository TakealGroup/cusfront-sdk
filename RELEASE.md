# Releasing `@takeal/cusfront-sdk`

The SDK version matches the Takeal platform release it was checked against:
SDK `0.2.8` goes with platform tag `v0.2.8`. Not every platform release needs
an SDK release, but when one ships it takes the platform's number.

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

# 2. Version = platform tag without the "v". Add a dated CHANGELOG section.
npm version 0.2.8 --no-git-tag-version

# 3. Dry run. prepublishOnly runs typecheck, tests and build first.
npm publish --access public --dry-run

# 4. Publish, commit, and tag this repo with the same version.
npm publish --access public
git tag v0.2.8 && git push origin v0.2.8

# 5. Check that the published package installs and imports.
cd "$(mktemp -d)" && npm init -y >/dev/null && npm i @takeal/cusfront-sdk@0.2.8
node -e "import('@takeal/cusfront-sdk').then(m => console.log(typeof m.createClient))"    # function
node -e "import('@takeal/cusfront-sdk/push').then(m => console.log(typeof m.PushResource))" # function
```

The tarball ships `dist/`, `README.md`, `CHANGELOG.md`, `LICENSE` and
`package.json` only. If `files` in `package.json` changes, read the dry-run
file list before publishing.

## Repository link

npm renders `repository.url` as a link. It only opens for people who aren't
signed in to git.wiseless.xyz when both the repository and the organization
that owns it are public.
