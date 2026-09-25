import type { HttpClient } from "../http.js";

/**
 * Blog resource — `client.blog.*`.
 *
 * @deprecated The blog is a category of Documents now. Use
 * `client.documents.list({ category: "blog" })` and `client.documents.get(slug)`:
 * same posts, same slugs, same block shape, plus the folder trail and the
 * version history. `/blog/*` on the API answers for one more release and then
 * goes away; this class goes with it.
 *
 * Posts are public: these calls work before the user logs in, which is what
 * a marketing page or a Mini App landing screen needs.
 *
 * A post arrives as a **structured document**, not as HTML. `body_blocks` is
 * a flat list of typed nodes; map each `type` onto your own component and the
 * post inherits your site's styling. `body_markdown` is there too if you'd
 * rather run your own renderer.
 *
 * ```ts
 * const { posts } = await client.blog.list({ perPage: 5 });
 * const post = await client.blog.get(posts[0].slug);
 *
 * post.body_blocks.map((b) => {
 *   switch (b.type) {
 *     case "heading":   return <Heading level={b.level}>{b.text}</Heading>;
 *     case "paragraph": return <P>{b.text}</P>;
 *     case "image":     return <Figure src={b.url} alt={b.alt} caption={b.caption} />;
 *     case "list":      return <List ordered={b.ordered} items={b.items} />;
 *     case "quote":     return <Quote>{b.text}</Quote>;
 *     case "code":      return <Code lang={b.lang}>{b.text}</Code>;
 *     case "divider":   return <Hr />;
 *   }
 * });
 * ```
 *
 * Inline emphasis (`**bold**`, `[link](url)`) is left as Markdown inside
 * block text — every renderer already knows what to do with it.
 */

/** One node of a post body. Discriminated on `type`. */
export type BlogBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; alt?: string; caption?: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang?: string; text: string }
  | { type: "divider" };

export interface BlogPost {
  /** Stable public key — link by this. */
  slug: string;
  title: string;
  /** Teaser for cards; falls back to the first paragraph. */
  excerpt: string;
  /** Image URL, relative to the API origin. Absent when no cover is set. */
  cover_url?: string;
  /** Raw Markdown, for consumers that bring their own renderer. */
  body_markdown: string;
  /** The recommended input for rendering — see the module docs. */
  body_blocks: BlogBlock[];
  tags: string[];
  /** Present only when the post declares one. */
  locale?: string;
  /** Rough read time in minutes (minimum 1). */
  reading_minutes: number;
  published_at: string | null;
  updated_at: string;
}

export interface BlogListInput {
  /** 1-based. Default 1. */
  page?: number;
  /** 1..=50. Default 10. */
  perPage?: number;
  /** Only posts carrying this tag. */
  tag?: string;
  /** Only posts in this locale. */
  locale?: string;
}

export interface BlogList {
  posts: BlogPost[];
  total: number;
  page: number;
  per_page: number;
}

/** @deprecated See the module docs: use `client.documents`. */
export class BlogResource {
  constructor(private readonly http: HttpClient) {}

  /** Published posts, newest first. No authentication required. */
  async list(input: BlogListInput = {}): Promise<BlogList> {
    const q = new URLSearchParams();
    if (input.page) q.set("page", String(input.page));
    if (input.perPage) q.set("per_page", String(input.perPage));
    if (input.tag) q.set("tag", input.tag);
    if (input.locale) q.set("locale", input.locale);
    const qs = q.toString();
    return this.http.get<BlogList>(`/blog/posts${qs ? `?${qs}` : ""}`, {
      skipAuth: true,
    });
  }

  /** One post by slug. No authentication required. */
  async get(slug: string): Promise<BlogPost> {
    return this.http.get<BlogPost>(`/blog/posts/${encodeURIComponent(slug)}`, {
      skipAuth: true,
    });
  }

  /**
   * Absolute URL for an image path returned inside a post (`cover_url`, or an
   * image block's `url`). Handy when the app renders on a different origin
   * than the API.
   */
  imageUrl(baseUrl: string, path: string): string {
    if (/^https?:\/\//i.test(path)) return path;
    return `${baseUrl.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
  }
}
