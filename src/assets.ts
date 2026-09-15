/**
 * Resolve an image URL the API hands back (`design.image_url`, a logo, …)
 * into something a browser can load.
 *
 * The API returns either an absolute URL (uploaded artwork served from
 * object storage) or a path relative to the API origin (the deployment's
 * default card design, `/card-designs/default.svg`). Absolute URLs — and
 * `data:` / `blob:` URIs — come back unchanged; a relative path is joined
 * onto `baseUrl`, which is the bare API origin the client was built with.
 * These paths are host-level, so no `/v1` prefix is added.
 *
 * `baseUrl` is the same value passed to `createClient`; a trailing slash is
 * tolerated. `client.assetUrl()` calls this with the client's own base.
 */
export function resolveAssetUrl(baseUrl: string, url: string): string {
  if (isAbsolute(url)) return url;
  const base = baseUrl.replace(/\/+$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${base}${path}`;
}

/** `https://…`, `http://…`, protocol-relative `//…`, `data:` and `blob:` all count as absolute. */
function isAbsolute(url: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url);
}
