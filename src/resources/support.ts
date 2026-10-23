import type { HttpClient } from "../http.js";

/**
 * Support resource — `client.support.*`: the chat with support.
 *
 *   GET  /me/support/messages             → list
 *   POST /me/support/messages             → send
 *   GET  /me/support/attachments/{id}     → attachment
 *
 * What the person writes shows in the conversation at once, with the status
 * `queued`, and goes to support right after (`delivered`). Support answers
 * come back in the same conversation, with the text ready as cleaned HTML in
 * `html`: show it as it is, it carries only paragraphs, line breaks, bold,
 * italic, strikethrough, code, links, lists and quotes. A new answer also
 * comes as a `support_reply` notification.
 *
 * The person may write from the Telegram bot too; it is one conversation,
 * and `channel` says where each message came from.
 */

/** Where a message came from, or where an answer was sent. */
export type SupportChannel = "cabinet" | "telegram" | (string & {});

/** How far a message got: `queued` until support has it. */
export type SupportMessageStatus = "queued" | "delivered" | "failed" | (string & {});

/** The conversation's state: `none` until the person writes for the first
 *  time, `resolved` once support closed it. Writing again reopens it. */
export type SupportConversationStatus = "none" | "open" | "resolved" | (string & {});

/** A file in the conversation. Download it with `attachment(id)`. */
export interface SupportAttachment {
  id: string;
  file_name: string;
  content_type: string;
  /** Bytes. */
  size: number;
}

/** One message. */
export interface SupportMessage {
  id: string;
  /** `user` for what the person wrote, `support` for an answer. */
  author: "user" | "support" | (string & {});
  /** The name the support agent goes by; answers only. */
  operator_name: string | null;
  channel: SupportChannel | null;
  /** What the person wrote, plain text. Empty on answers. */
  text: string;
  /** The answer as cleaned HTML. Empty on the person's own messages. */
  html: string;
  attachments: SupportAttachment[];
  status: SupportMessageStatus;
  created_at: string;
}

/** A page of the conversation, oldest first. */
export interface SupportConversation {
  status: SupportConversationStatus;
  items: SupportMessage[];
  /** Older messages exist: `list({ before: items[0].created_at })`. */
  has_more: boolean;
}

/** A file to send. `data` may be a `Blob` (a `File` from an input), bytes,
 *  or base64 already. */
export interface SupportFile {
  fileName: string;
  /** E.g. `image/png`. Pictures and PDF up to 20 MB by default; the platform
   *  sets the list and the size. */
  contentType: string;
  data: Blob | ArrayBuffer | Uint8Array | string;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

async function toBase64(data: SupportFile["data"]): Promise<string> {
  if (typeof data === "string") return data;
  if (data instanceof Uint8Array) return bytesToBase64(data);
  if (data instanceof ArrayBuffer) return bytesToBase64(new Uint8Array(data));
  return bytesToBase64(new Uint8Array(await data.arrayBuffer()));
}

export class SupportResource {
  constructor(private readonly http: HttpClient) {}

  /** The latest messages, oldest first, and the conversation's status.
   *  `before` reads further back; `limit` is 1 to 100 (50). */
  async list(
    opts: { before?: string; limit?: number; signal?: AbortSignal } = {},
  ): Promise<SupportConversation> {
    const q = new URLSearchParams();
    if (opts.before) q.set("before", opts.before);
    if (opts.limit !== undefined) q.set("limit", String(opts.limit));
    const qs = q.toString();
    return this.http.get<SupportConversation>(`/me/support/messages${qs ? `?${qs}` : ""}`, {
      signal: opts.signal,
    });
  }

  /** Write to support. Text, files or both; up to 10 files. */
  async send(
    message: { text?: string; files?: SupportFile[] },
    opts: { signal?: AbortSignal } = {},
  ): Promise<SupportMessage> {
    const attachments = await Promise.all(
      (message.files ?? []).map(async (f) => ({
        file_name: f.fileName,
        content_type: f.contentType,
        data_base64: await toBase64(f.data),
      })),
    );
    return this.http.post<SupportMessage>("/me/support/messages", {
      body: { text: message.text ?? "", attachments },
      signal: opts.signal,
    });
  }

  /** A file from the conversation: the person's own or one support sent. */
  async attachment(id: string, opts: { signal?: AbortSignal } = {}): Promise<Blob> {
    return this.http.getBlob(`/me/support/attachments/${encodeURIComponent(id)}`, {
      signal: opts.signal,
    });
  }

  /** Just the conversation's status. */
  async status(opts: { signal?: AbortSignal } = {}): Promise<SupportConversationStatus> {
    return (await this.list({ limit: 1, signal: opts.signal })).status;
  }
}
