import { isApiError } from "./error.js";
import type { HttpClient } from "./http.js";

/**
 * Which platform versions this SDK works with, as a semver range:
 * comparators separated by ", ". Keep this the only definition.
 */
export const SUPPORTED_MEISTER = ">=0.7.6, <1.0.0";

/** What `client.ready()` returns. */
export interface ReadyInfo {
  /** `true` when the platform reported a version inside `supportedMeister`. */
  compatible: boolean;
  /** The platform version the deployment reported, or `null` when it didn't. */
  platformVersion: string | null;
  /** The range this SDK supports (`SUPPORTED_MEISTER`). */
  supportedMeister: string;
  /** Why `compatible` is false, in one English sentence for logs or a banner. */
  warning?: string;
  /** `true` when every platform dependency answered (HTTP 200), `false` on 503. */
  healthy: boolean;
  /** `ready` or `degraded`, as the platform reports it. */
  status: string;
  /** The raw `GET /ready` body, for fields this type doesn't name. */
  raw: ReadyBody;
}

/** The part of the `GET /ready` body the SDK reads. */
export interface ReadyBody {
  status?: string;
  ops?: {
    /** Build version of the API process. */
    version?: string;
    /** The platform version. Missing on platforms before 0.5.0. */
    platform_version?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

type Parsed = { core: [number, number, number]; pre: string | null };

const SEMVER =
  /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/;

function parse(v: string): Parsed | null {
  const m = SEMVER.exec(v.trim());
  if (!m) return null;
  return { core: [Number(m[1]), Number(m[2]), Number(m[3])], pre: m[4] ?? null };
}

function cmpCore(a: Parsed, b: Parsed): number {
  for (let i = 0; i < 3; i++) {
    if (a.core[i] !== b.core[i]) return a.core[i]! < b.core[i]! ? -1 : 1;
  }
  return 0;
}

/**
 * `satisfies("0.5.3", ">=0.5.0, <0.6.0")` → `true`.
 *
 * The range is comma-separated comparators (`>=`, `>`, `<=`, `<`, `=`) or a
 * bare version meaning exactly that version; all must hold. A prerelease
 * (`0.5.1-rc.1`) never satisfies a range unless a comparator names it
 * exactly. Anything unparseable gives `false`.
 */
export function satisfies(version: string, range: string): boolean {
  const v = parse(version);
  if (!v) return false;
  const parts = range
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return false;

  let exactPre = false;
  for (const part of parts) {
    const m = /^(>=|<=|>|<|=)?\s*(.+)$/.exec(part);
    if (!m) return false;
    const op = m[1] ?? "=";
    const target = parse(m[2]!);
    if (!target) return false;

    const c = cmpCore(v, target);
    if (op === "=") {
      if (c !== 0 || v.pre !== target.pre) return false;
      if (v.pre !== null) exactPre = true;
      continue;
    }
    const ok = op === ">=" ? c >= 0 : op === ">" ? c > 0 : op === "<=" ? c <= 0 : c < 0;
    if (!ok) return false;
  }
  return v.pre === null || exactPre;
}

/** Judge a `GET /ready` body against `SUPPORTED_MEISTER`. */
export function readyInfo(raw: ReadyBody, healthy: boolean): ReadyInfo {
  const reported = raw?.ops?.platform_version;
  const platformVersion = typeof reported === "string" && reported ? reported : null;
  const base = {
    platformVersion,
    supportedMeister: SUPPORTED_MEISTER,
    healthy,
    status: typeof raw?.status === "string" ? raw.status : healthy ? "ready" : "degraded",
    raw,
  };
  if (platformVersion === null) {
    return {
      ...base,
      compatible: false,
      warning: `The platform didn't report its version; this SDK supports ${SUPPORTED_MEISTER}.`,
    };
  }
  if (!satisfies(platformVersion, SUPPORTED_MEISTER)) {
    return {
      ...base,
      compatible: false,
      warning: `This SDK supports platform ${SUPPORTED_MEISTER}, the platform runs ${platformVersion}. Some calls may fail until the SDK is updated.`,
    };
  }
  return { ...base, compatible: true };
}

/**
 * `GET /ready` (public, unversioned). A 503 still carries the body, so a
 * degraded platform answers with `healthy: false` instead of throwing.
 * Network failures and other statuses throw as usual.
 */
export async function fetchReady(
  http: HttpClient,
  opts: { signal?: AbortSignal } = {},
): Promise<ReadyInfo> {
  try {
    const body = await http.get<ReadyBody>("/ready", { skipAuth: true, signal: opts.signal });
    return readyInfo(body ?? {}, true);
  } catch (e) {
    if (isApiError(e) && e.status === 503 && typeof e.body === "object" && e.body !== null) {
      return readyInfo(e.body as ReadyBody, false);
    }
    throw e;
  }
}
