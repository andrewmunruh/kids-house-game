// Mailbox letters ride on the house the way dogKennel does: optional, absent when empty,
// and kept by any client that spreads a save it does not understand.
// Nothing here imports the DOM or the chat filter, so state.ts can use it without a cycle.

export const MAIL_MAX = 80;
export const MAIL_CAP = 30;
export const MAIL_TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const MAIL_COLORS = 5;
export const MAIL_STICKERS = 6;
export const MAIL_RATE_MAX = 5;
export const MAIL_RATE_WINDOW_MS = 60_000;

export const MAIL_COLOR = ['#ffd6e8', '#fff3b0', '#d8f5e8', '#e6d6ff', '#d6efff'] as const;

export interface Letter {
  id: string;
  /** First name (or preset nickname) stamped by the server from the connection. */
  from: string;
  fromPid: string;
  text: string;
  color: number;
  sticker: number;
  at: number;
  read?: boolean;
}

export interface Mailbox { letters: Letter[] }

const LETTER_ID = /^m[A-Za-z0-9]{4,40}$/;
const PID_RE = /^[A-Za-z0-9:_\/.-]{1,80}$/;

/** Remove link-shaped text so a letter can never show a URL or an email. */
export function stripUrls(raw: string): string {
  return raw
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/\bwww\.\S+/gi, '')
    .replace(/\b[a-z0-9-]+\s*(?:\.|\(dot\)|\sdot\s)\s*(?:com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b\S*/gi, '')
    .replace(/\S+\s*(?:@|\(at\)|\sat\s)\s*\S+\s*(?:\.|\sdot\s)\s*\w{2,}/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Kid-friendly age of a letter. No dates, no clocks. */
export function friendlyWhen(at: number, now = Date.now()): string {
  const days = Math.floor((now - at) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return 'a few days ago';
  return 'a while ago';
}

/**
 * Structural keep: shape, length, 30-day expiry, cap 30 (newest stay).
 * Word filtering happens in filterMailbox. This only drops junk: bad shape, age, and size.
 * Returns null when there is nothing to store, so the key stays off old saves.
 */
export function keepMailbox(raw: unknown, now = Date.now()): Mailbox | null {
  const list = (raw as { letters?: unknown } | null)?.letters;
  if (!Array.isArray(list)) return null;
  const letters: Letter[] = [];
  for (const item of list.slice(-MAIL_CAP * 2)) {
    if (!item || typeof item !== 'object') continue;
    const l = item as Partial<Letter>;
    if (typeof l.id !== 'string' || !LETTER_ID.test(l.id)) continue;
    if (typeof l.from !== 'string') continue;
    const from = l.from.normalize('NFC').replace(/\s+/g, ' ').trim();
    if (!from || from.length > 24) continue;
    if (typeof l.fromPid !== 'string' || !PID_RE.test(l.fromPid)) continue;
    if (typeof l.text !== 'string' || l.text.length > MAIL_MAX) continue;
    if (typeof l.at !== 'number' || !Number.isFinite(l.at) || now - l.at > MAIL_TTL_MS || l.at > now + 86400000) continue;
    if (!Number.isInteger(l.color) || l.color! < 0 || l.color! >= MAIL_COLORS) continue;
    if (!Number.isInteger(l.sticker) || l.sticker! < 0 || l.sticker! >= MAIL_STICKERS) continue;
    const text = l.text.normalize('NFKC').replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g, '').replace(/\s+/g, ' ').trim();
    // Empty text is a sender's Delivered/Read copy (the words stay on the owner's letter only).
    // A link the send path accepted stays. Rewriting it here would delete the letter on reload.
    if (text.length > MAIL_MAX) continue;
    const letter: Letter = { id: l.id, from, fromPid: l.fromPid, text, color: l.color!, sticker: l.sticker!, at: l.at };
    if (l.read === true) letter.read = true;
    letters.push(letter);
  }
  const kept = letters.slice(-MAIL_CAP);
  return kept.length ? { letters: kept } : null;
}

/** What a connection is allowed to see. The owner gets the words. A sender gets Delivered/Read and no words. Everyone else gets nothing. */
export function projectMailbox(box: Mailbox | null | undefined, viewerPid: string, ownerId: string): Mailbox | null {
  if (!box?.letters.length) return null;
  if (viewerPid === ownerId) return box;
  const mine = box.letters.filter(l => l.fromPid === viewerPid).map(l => ({ ...l, text: '' }));
  return mine.length ? { letters: mine } : null;
}

export function unreadCount(box: Mailbox | null | undefined): number {
  return box?.letters.filter(l => !l.read && l.text).length ?? 0;
}
