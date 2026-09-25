import type { HttpClient } from "../http.js";

/**
 * Documents resource: `client.documents.*`.
 *
 * Everything the operators write lives in one tree: blog posts, the
 * knowledge base, legal pages, internal notes. Every call here works before
 * the user signs in and shows more once they have: a signed-in user sees the
 * documents marked for users, staff see theirs. The SDK sends the session
 * token when it has one, so the same call serves the public site and the
 * signed-in cabinet.
 *
 * A document arrives as a list of typed blocks. `body_blocks` is flat; map
 * each `type` onto your own component and the document inherits your site's
 * styling. `body_markdown` is there too if you'd rather run your own renderer.
 *
 * ```ts
 * // The knowledge base: folders and articles for a sidebar.
 * const tree = await client.documents.tree({ category: "knowledge-base" });
 *
 * // One article, with the text in force today.
 * const doc = await client.documents.get("how-to-top-up");
 *
 * // A legal page as it read on a given day, and its history.
 * const then = await client.documents.get("offer", { at: "2026-01-01T00:00:00Z" });
 * const versions = await client.documents.versions("offer");
 *
 * doc.body_blocks.map((b) => {
 *   switch (b.type) {
 *     case "heading":   return <Heading level={b.level}>{b.text}</Heading>;
 *     case "paragraph": return <P>{b.text}</P>;
 *     case "image":     return <Figure src={client.assetUrl(b.url)} alt={b.alt} caption={b.caption} />;
 *     case "list":      return <List ordered={b.ordered} items={b.items} />;
 *     case "quote":     return <Quote>{b.text}</Quote>;
 *     case "code":      return <Code lang={b.lang}>{b.text}</Code>;
 *     case "divider":   return <Hr />;
 *   }
 * });
 * ```
 *
 * Links between documents come out as site paths: `/blog/<slug>` for a post,
 * `/docs/<slug>` for everything else (`site_path` on each document says which
 * one it is). Route those two prefixes to your document pages and links keep
 * working after a document is renamed or moved.
 */

/** Category keys: the four folders at the top of the tree. */
export type DocumentCategory = "blog" | "knowledge-base" | "legal" | "internal";

/** Who may read a document. */
export type DocumentScope = "public" | "users" | "staff" | "operators";

/** One node of a document body. Discriminated on `type`. */
export type DocumentBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; alt?: string; caption?: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang?: string; text: string }
  | { type: "divider" };

/** One step of the folder trail, root first. */
export interface DocumentPathStep {
  id: string;
  key: string;
  title: string;
}

export interface Document {
  /** Permanent address. Link by this; it survives renames and moves. */
  slug: string;
  title: string;
  /** Teaser for cards; falls back to the first paragraph. */
  excerpt: string;
  /** Image URL, relative to the API origin. Absent when no cover is set. */
  cover_url?: string;
  /** Raw Markdown, for consumers that bring their own renderer. */
  body_markdown: string;
  /** The recommended input for rendering; see the module docs. */
  body_blocks: DocumentBlock[];
  tags: string[];
  /** Present only when the document declares one. */
  locale?: string;
  /** Rough read time in minutes (minimum 1). */
  reading_minutes: number;
  published_at: string | null;
  updated_at: string;
  /** Category the document sits in. */
  category: DocumentCategory | string;
  /** Folder trail, root first. */
  path: DocumentPathStep[];
  /** Who may read it. */
  read_scope: DocumentScope;
  /** Number of the text shown. */
  version: number;
  /** When the text shown took effect. */
  effective_from: string;
  /** Path under the site root where this document is read. */
  site_path: string;
}

export interface DocumentListInput {
  /** Category key. */
  category?: DocumentCategory | string;
  /** Only documents in this folder and the folders under it. */
  folderId?: string;
  /** Only documents carrying this tag. */
  tag?: string;
  /** Only documents in this locale. */
  locale?: string;
  /** Words to search for in the title and the text. */
  q?: string;
  /** 1-based. Default 1. */
  page?: number;
  /** 1..=50. Default 10. */
  perPage?: number;
}

export interface DocumentList {
  documents: Document[];
  total: number;
  page: number;
  per_page: number;
}

/** A folder as it appears in the navigation tree. */
export interface DocumentFolder {
  id: string;
  parent_id: string | null;
  key: string;
  title: string;
  description: string;
  position: number;
}

/** A document as it appears in the navigation tree: enough for a link. */
export interface DocumentTreeEntry {
  folder_id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  position: number;
  updated_at: string;
  site_path: string;
}

export interface DocumentTree {
  /** Folders with at least one document you may read under them, plus the categories. */
  folders: DocumentFolder[];
  /** Published documents you may read, in folder order. */
  documents: DocumentTreeEntry[];
}

/** One saved text of a document, without the text itself. */
export interface DocumentVersionSummary {
  version: number;
  title: string;
  /** When this text took effect. */
  effective_from: string;
  /** What changed, in the editor's words. Often empty. */
  note: string;
  changed_at: string;
}

export interface DocumentTag {
  tag: string;
  /** Published documents you may read that carry it. */
  count: number;
}

export class DocumentsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Published documents you may read, paged. The blog comes newest first,
   * other categories in the order set by the editors.
   */
  async list(input: DocumentListInput = {}): Promise<DocumentList> {
    const q = new URLSearchParams();
    if (input.category) q.set("category", input.category);
    if (input.folderId) q.set("folder_id", input.folderId);
    if (input.tag) q.set("tag", input.tag);
    if (input.locale) q.set("locale", input.locale);
    if (input.q) q.set("q", input.q);
    if (input.page) q.set("page", String(input.page));
    if (input.perPage) q.set("per_page", String(input.perPage));
    const qs = q.toString();
    return this.http.get<DocumentList>(`/documents${qs ? `?${qs}` : ""}`);
  }

  /** Folders and documents for a sidebar or a table of contents. */
  async tree(input: { category?: DocumentCategory | string } = {}): Promise<DocumentTree> {
    const qs = input.category ? `?category=${encodeURIComponent(input.category)}` : "";
    return this.http.get<DocumentTree>(`/documents/tree${qs}`);
  }

  /** Every tag on a document you may read, most used first. */
  async tags(): Promise<DocumentTag[]> {
    return this.http.get<DocumentTag[]>("/documents/tags");
  }

  /**
   * One document by its address. Without `at`, the text in force now; with
   * `at` (an ISO 8601 moment), the text that was in force then. Unknown
   * addresses and documents above your level are a 404.
   */
  async get(slug: string, opts: { at?: string | Date } = {}): Promise<Document> {
    const at = opts.at instanceof Date ? opts.at.toISOString() : opts.at;
    const qs = at ? `?at=${encodeURIComponent(at)}` : "";
    return this.http.get<Document>(`/documents/${encodeURIComponent(slug)}${qs}`);
  }

  /** Every saved text of a document, newest first, with the date each took effect. */
  async versions(slug: string): Promise<DocumentVersionSummary[]> {
    return this.http.get<DocumentVersionSummary[]>(`/documents/${encodeURIComponent(slug)}/versions`);
  }

  /** The document as it read in one version. */
  async version(slug: string, version: number): Promise<Document> {
    return this.http.get<Document>(`/documents/${encodeURIComponent(slug)}/versions/${version}`);
  }

  /**
   * Absolute URL for an image path returned inside a document (`cover_url`,
   * or an image block's `url`). Handy when the app renders on a different
   * origin than the API.
   */
  imageUrl(baseUrl: string, path: string): string {
    if (/^https?:\/\//i.test(path)) return path;
    return `${baseUrl.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
  }
}
