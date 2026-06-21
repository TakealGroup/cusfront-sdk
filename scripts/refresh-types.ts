/**
 * Refresh `src/types.gen.ts` from `openapi-snapshot.json`.
 *
 * Run: `pnpm refresh-types`.
 *
 * The snapshot is git-ignored (it's the full API spec dump). To
 * (re)pull it from a running Takeal API, do:
 *
 *   curl http://localhost:7777/api/docs/openapi.json > openapi-snapshot.json
 *
 * Cusfront uses the global docs (`/api/docs`), not the merchant docs —
 * it calls /auth/* + /me/*, which only the global spec includes.
 *
 * `openapi-typescript` is a build-only dep — never shipped to npm.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
// @ts-expect-error — openapi-typescript ships its own ESM types but the
// build chain here is dynamic-import-only and types resolve at runtime.
import openapiTS, { astToString } from "openapi-typescript";

const here = dirname(fileURLToPath(import.meta.url));
const snapshotPath = join(here, "..", "openapi-snapshot.json");
const outPath = join(here, "..", "src", "types.gen.ts");

const raw = readFileSync(snapshotPath, "utf-8");
const spec = JSON.parse(raw);

// The API spec routes the same handler name through both the
// end-user surface (`/me/cards/{id}/...`) and the operator surface
// (`/admin/cards/{id}/...`), so several operationIds collide. The
// spec is correct (paths disambiguate), but openapi-typescript's
// redocly bundler treats duplicate operationIds as a hard error.
//
// Dedupe in place: if we see a repeat, prefix the path's first
// segment. e.g. `get_card` under `/admin/cards/{id}` → `admin_get_card`.
// Idempotent — running on an already-deduped spec is a no-op.
function dedupeOperationIds(spec: unknown): void {
  const root = spec as {
    paths?: Record<string, Record<string, { operationId?: string }>>;
  };
  if (!root.paths) return;
  const seen = new Set<string>();
  for (const [pathKey, ops] of Object.entries(root.paths)) {
    for (const op of Object.values(ops)) {
      if (!op || typeof op !== "object" || !op.operationId) continue;
      if (!seen.has(op.operationId)) {
        seen.add(op.operationId);
        continue;
      }
      // Path looks like `/admin/...` or `/me/...` — use the second
      // segment as the prefix (skip the leading slash).
      const prefix = pathKey.split("/").filter(Boolean)[0] ?? "x";
      const next = `${prefix}_${op.operationId}`;
      op.operationId = next;
      seen.add(next);
    }
  }
}
dedupeOperationIds(spec);

const ast = await openapiTS(spec, {
  exportType: true,
  // Drop schema names that drift in/out of the spec between API
  // releases without affecting Cusfront — keeps the diff focused on
  // shape changes.
  enum: false,
});

const header = `/**
 * AUTO-GENERATED — do not edit by hand. Run \`pnpm refresh-types\`.
 *
 * Source: openapi-snapshot.json (pulled from the Takeal API's /api/docs/openapi.json).
 * Generator: openapi-typescript.
 */
/* eslint-disable */
/* prettier-ignore */
`;

writeFileSync(outPath, header + astToString(ast));

// eslint-disable-next-line no-console
console.log(`wrote ${outPath}`);
