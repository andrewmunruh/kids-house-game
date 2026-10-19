// Shared between client and server: protocol, presets, validation and the chat filter.
// Nothing here touches the DOM or Node APIs, so it runs in browsers, Node and Cloudflare Workers.
import { RANCH_W, BARN_W, RANCH_Y0, RANCH_Y1, HORSES, ANIMALS, FOODS, type Basket, type Plot, type RanchOp } from './ranch';
import { GAMEROOM_W, type TablePub, type TableOp } from './games/index';
import { CAT_COATS, DOG_BREEDS, type Cat, type Dog, initialState, migrate, newCharacter, validKennel, ROOM_W, ROOM_H, MAX_CHARS, ROOM_IDS, type Action, type GameState, type PlacedItem, type RoomId, type Character } from './state';
import { sanitizeLook2, type Look2 } from './avatar';
import { CATALOG_NAMES } from './catalog-names';
import { MAIL_COLORS, MAIL_MAX, MAIL_STICKERS, keepMailbox, type Mailbox } from './mail';

export const MAX_PLAYERS = 12;
export const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O/1/I/L
export const CODE_LEN = 6;
// custom invite codes chosen by a grown-up: letters/digits, case-insensitive (stored upper-case)
export const CODE_MIN = 4, CODE_MAX = 16;
export const normCode = (raw: unknown) => String(raw ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
export const validInvite = (c: string) => c.length >= CODE_MIN && c.length <= CODE_MAX && /^[A-Z0-9]+$/.test(c);
export const validHoodId = (id: string) => /^[A-Za-z0-9]{6,32}$/.test(id);
// roster: first names only, set by a grown-up
export const MAX_ROSTER = 12;
export const ROSTER_SUGGEST = ['Cada', 'Chloe', 'Quinn', 'Reagan', 'Sloane'];
export interface RosterEntry { name: string; claimed: boolean; hasHouse: boolean }
export const STREET_SLOT_W = 520;
export const streetWidth = (n: number) => Math.max(2400, 400 + n * STREET_SLOT_W + 400);
export const slotX = (i: number) => 500 + i * STREET_SLOT_W;
export const NEAR_X = 460, NEAR_Y = 320;

// ---------- presets (kids pick from these; no real names) ----------
export const NICKNAMES = [
  'Sunny Bunny', 'Bubbly Panda', 'Sparkle Kitty', 'Happy Hippo', 'Cozy Koala', 'Jolly Jelly', 'Zippy Fox', 'Dreamy Deer',
  'Giggly Goose', 'Peachy Pup', 'Minty Mouse', 'Rainbow Duck', 'Cuddly Cub', 'Starry Owl', 'Bouncy Frog', 'Lucky Lamb',
  'Snuggly Seal', 'Twinkle Tiger', 'Berry Bear', 'Cloudy Llama', 'Pebble Penguin', 'Honey Hedgehog', 'Marshmallow Moose', 'Cupcake Cat',
];
export const PHRASES = [
  'Hi!', 'Come over!', 'I love your house!', "Let's play!", 'Follow me!', 'Look at this!', 'Want a snack?', 'Nice!',
  'Yes!', 'No thanks', 'Hehe', 'Be right back', 'Bye!', "Let's decorate!", 'Wanna race?', 'So cute!',
];
export const EMOTES = ['👋', '😀', '😂', '😍', '😮', '😢', '🎉', '⭐', '❤️', '👍', '🍕', '🐱', '🌈', '🎶', '💤', '✨'];
export const HOUSE_STYLES = 8;

// ---------- chat filter (client gives instant feedback; server enforces) ----------
export const MAX_CHAT = 60;
const LEET: Record<string, string> = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', '$': 's', '!': 'i', '+': 't' };
const BAD = ['fuck', 'fuk', 'fck', 'shit', 'sht', 'bitch', 'btch', 'bastard', 'asshole', 'ass', 'dick', 'cock', 'pussy', 'cunt', 'whore', 'slut',
  'damn', 'crap', 'piss', 'fag', 'faggot', 'retard', 'nigger', 'nigga', 'porn', 'sex', 'sexy', 'nude', 'naked', 'boob', 'boobs', 'penis', 'vagina',
  'kill', 'suicide', 'stupid', 'idiot', 'dumb', 'hate', 'loser', 'shutup', 'wtf', 'stfu', 'gtfo', 'bs'];
const NUM_WORDS = ['zero', 'oh', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const PERSONAL = [
  /\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i, /\bi\s*live\s+(at|on|in)\b/i, /\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,
  /\b(password|passcode|zip\s*code|postcode)\b/i, /\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i,
];
const URL_RE = /(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i;
const EMAIL_RE = /\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i;
const HANDLE_RE = /@\w/;
const ADDRESS_RE = /\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;

export type FilterResult = { ok: true; text: string } | { ok: false; reason: 'empty' | 'long' | 'link' | 'contact' | 'personal' | 'words' | 'mail' };
export function filterChat(raw: unknown, max = MAX_CHAT): FilterResult {
  if (typeof raw !== 'string') return { ok: false, reason: 'empty' };
  // strip control/zero-width chars, collapse whitespace
  const text = raw.normalize('NFKC').replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g, '').replace(/\s+/g, ' ').trim();
  if (!text) return { ok: false, reason: 'empty' };
  if (text.length > max) return { ok: false, reason: 'long' };
  if (URL_RE.test(text)) return { ok: false, reason: 'link' };
  if (EMAIL_RE.test(text) || HANDLE_RE.test(text)) return { ok: false, reason: 'contact' };
  const digits = (text.match(/\d/g) ?? []).length;
  if (digits >= 5 || /\d[\d\s().\-]{4,}\d/.test(text) || ADDRESS_RE.test(text)) return { ok: false, reason: 'contact' };
  const words = text.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  let run = 0; for (const w of words) { run = NUM_WORDS.includes(w) ? run + 1 : 0; if (run >= 4) return { ok: false, reason: 'contact' }; }
  if (PERSONAL.some(r => r.test(text))) return { ok: false, reason: 'personal' };
  const norm = text.toLowerCase().replace(/[0-9@$!+]/g, c => LEET[c] ?? c);
  const toks = norm.split(/[^a-z]+/).filter(Boolean);
  const squashed = norm.replace(/[^a-z]/g, '').replace(/(.)\1{2,}/g, '$1$1');
  if (toks.some(t => BAD.includes(t) || BAD.includes(t.replace(/(.)\1+/g, '$1'))) || BAD.filter(b => b.length >= 5).some(b => squashed.includes(b)))
    return { ok: false, reason: 'words' };
  // Names and stored letters re-read through here. Keep this list as it was on fbd04db.
  return { ok: true, text };
}
const SEND_LEET: Record<string, string> = {
  '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b',
  '@': 'a', '$': 's', '!': 'i', '+': 't', 'v': 'u', '|': 'k', '<': 'k', '#': 'h',
};
function swearShape(s: string): boolean {
  return /^f+u+c+k+$/.test(s) || /^f+u+k+$/.test(s) || /^f+c+k+$/.test(s)
    || /^s+h+i+t+$/.test(s) || /^s+h+t+$/.test(s)
    || /^b+i+t+c+h+$/.test(s) || /^b+t+c+h+$/.test(s)
    || /^a+s+h+o+l+e+$/.test(s)
    || /^d+u+m+b+a+s+$/.test(s)
    || /^n+i+g{2,}e+r+$/.test(s) || /^n+i+g{2,}a+$/.test(s)
    || /^f+a+g+$/.test(s) || /^f+a+g+o+t+$/.test(s)
    || /^r+e+t+a+r+d+$/.test(s)
    || /^k+y+s+$/.test(s);
}
function swearToken(s: string): boolean {
  if (!/^[a-z]+$/.test(s)) return false;
  const stems = [s];
  const sufs = ['ing', 'in', 'ers', 'er', 'ed', 'es', 'y', 's'];
  for (let i = 0; i < sufs.length; i++) {
    const suf = sufs[i];
    if (s.endsWith(suf) && s.length > suf.length + 2) stems.push(s.slice(0, -suf.length));
  }
  for (let i = 0; i < stems.length; i++) if (swearShape(stems[i])) return true;
  return false;
}
function starForms(mapped: string): string[] {
  if (!mapped.includes('*')) return [mapped];
  const stars = mapped.split('*').length - 1;
  const stripped = mapped.replace(/\*/g, '');
  const out = stripped ? [stripped] : [];
  if (stars < 1 || stars > 3) return out;
  const chars = mapped.split('');
  const pos: number[] = [];
  for (let i = 0; i < chars.length; i++) if (chars[i] === '*') pos.push(i);
  const walk = (n: number) => {
    if (n === pos.length) { out.push(chars.join('')); return; }
    for (let a = 97; a <= 122; a++) { chars[pos[n]] = String.fromCharCode(a); walk(n + 1); }
  };
  walk(0);
  return out;
}
const COMPOUND_PREFIX = ['mother', 'sonofa', 'horse', 'bull', 'dip'];
const COMPOUND_SUFFIX = ['face', 'head', 'you'];
/** Whole word, a short ending, or a known compound such as bullshit or motherfucker. Not a loose substring. */
function blockedWord(s: string): boolean {
  const t = s.replace(/ph(?=u+c+k)/g, 'f').replace(/ph(?=u+k)/g, 'f');
  if (swearToken(t)) return true;
  if (/^w+t+f+$/.test(t) || /^s+t+f+u+$/.test(t)) return true;
  for (let i = 0; i < COMPOUND_PREFIX.length; i++) {
    const p = COMPOUND_PREFIX[i];
    if (t.startsWith(p) && t.length > p.length + 2 && blockedWord(t.slice(p.length))) return true;
  }
  for (let i = 0; i < COMPOUND_SUFFIX.length; i++) {
    const suf = COMPOUND_SUFFIX[i];
    if (t.endsWith(suf) && t.length > suf.length + 2 && blockedWord(t.slice(0, -suf.length))) return true;
  }
  return false;
}
function mapAll(token: string): string {
  let out = '';
  for (let i = 0; i < token.length; i++) out += SEND_LEET[token[i]] ?? token[i];
  return out;
}
/** Bang at the edge is both the letter i and a separator. Block if either reading is a swear. */
function readingsOf(token: string): string[] {
  const out = [mapAll(token)];
  if (token.charAt(0) === '!' || token.charAt(token.length - 1) === '!') {
    const cut = token.replace(/^!+/, '').replace(/!+$/, '');
    if (cut && cut !== token) out.push(mapAll(cut));
  }
  return out;
}
function killPhrase(tokens: string[]): boolean {
  for (let i = 0; i < tokens.length; i++) {
    if (!/^k+i+l+$/.test(tokens[i])) continue;
    const a = tokens[i + 1] || '';
    const b = tokens[i + 2] || '';
    if (/^y+o+u+r+s+e+l+f+$/.test(a) || /^u+r+s+e+l+f+$/.test(a)) return true;
    if (/^u+r+$/.test(a) && /^s+e+l+f+$/.test(b)) return true;
  }
  return false;
}
/** Main swears, compounds, obvious disguises, severe slurs, kys, and "kill yourself". */
function sendSwear(raw: string): boolean {
  const folded = raw.normalize('NFKC').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  // Periods, commas, and brackets split words. $ @ 5 1 3 0 7 | < # stay on the word, including at an edge.
  const parts = folded.split(/[^a-z0-9@$!+*v|#<]+/).filter(Boolean);
  const tokens: string[] = [];
  let buf = '';
  const flush = () => { if (buf) { tokens.push(buf); buf = ''; } };
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length === 1) buf += parts[i];
    else { flush(); tokens.push(parts[i]); }
  }
  flush();
  const reads = tokens.map(readingsOf);
  const plain = tokens.map(t => mapAll(t.replace(/^!+/, '').replace(/!+$/, '')).replace(/\*/g, ''));
  if (killPhrase(plain)) return true;
  for (let i = 0; i < reads.length; i++) {
    for (let r = 0; r < reads[i].length; r++) {
      const forms = starForms(reads[i][r]);
      for (let j = 0; j < forms.length; j++) if (blockedWord(forms[j].replace(/\*/g, ''))) return true;
    }
  }
  for (let i = 0; i < reads.length - 1; i++) {
    for (let a = 0; a < reads[i].length; a++) {
      for (let b = 0; b < reads[i + 1].length; b++) {
        const left = reads[i][a].replace(/\*/g, '');
        const right = reads[i + 1][b].replace(/\*/g, '');
        if (left && right && blockedWord(left + right)) return true;
      }
    }
  }
  return false;
}
function filterLoose(raw: unknown, max: number, blocked: 'words' | 'mail'): FilterResult {
  if (typeof raw !== 'string') return { ok: false, reason: 'empty' };
  const text = raw.normalize('NFKC').replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g, '').replace(/\s+/g, ' ').trim();
  if (!text) return { ok: false, reason: 'empty' };
  if (text.length > max) return { ok: false, reason: 'long' };
  if (sendSwear(text)) return { ok: false, reason: blocked };
  return { ok: true, text };
}
/** A new chat bubble. Light list: swears, slurs, and kys. */
export function filterSay(raw: unknown, max = MAX_CHAT): FilterResult {
  return filterLoose(raw, max, 'words');
}
export const FILTER_MSG: Record<string, string> = {
  long: 'That is a bit long!', link: 'No links, please!', contact: 'Keep numbers and contact info secret!', personal: 'Keep personal info secret!',
  words: "Let's use kind words!", mail: 'Oops, try different words!', empty: '',
};

// Old letter rules. New bubbles and new letters use filterLoose instead, so these
// lists are not on the send path. The kid still only hears "Oops, try different words!"
const MEAN = new Set<string>([...BAD, 'fat', 'ugly', 'stoopid', 'hateyou', 'hateu', 'shutup']);
const MEAN_PHRASE = new Set(['hateyou', 'hateu', 'shutup']);
const DIGIT_WORDS = ['three', 'seven', 'eight', 'four', 'five', 'nine', 'zero', 'one', 'two', 'six', 'ten', 'oh'];
const COMMON_WORD = new Set([
  'hi', 'hey', 'hello', 'bye', 'yes', 'no', 'ok', 'okay', 'oh', 'wow', 'yay', 'dear', 'love', 'house', 'cat', 'bed', 'play', 'slay',
  'cute', 'why', 'your', 'want', 'come', 'look', 'nice', 'the', 'and', 'my', 'our', 'so', 'too', 'very', 'good', 'fun', 'cool',
  'best', 'friend', 'friends', 'please', 'thanks', 'thank', 'happy', 'birthday', 'morning', 'night', 'day', 'today', 'room', 'home',
]);
const STREET_SKIP = new Set(['the', 'my', 'on', 'at', 'to', 'a', 'an', 'our', 'your', 'in', 'of', 'and', 'is', 'it', 'me', 'we', 'go', 'up', 'so', 'no', 'ok', 'be', 'do', 'or']);
const STREET_SUFFIX = 'street|st|ave|avenue|road|rd|lane|ln|drive|dr|court|ct|way|blvd';
const IN_GAME_PLACE = /\b(?:house|garden|backyard|ranch|treehouse|game\s*room|clubhouse|bedroom|kitchen|nursery|salon|park)\b/i;
const HOMO: Record<string, string> = {};
for (const pair of ['АA', 'аa', 'ВB', 'вb', 'ЕE', 'еe', 'КK', 'кk', 'МM', 'мm', 'НH', 'нh', 'ОO', 'оo', 'РP', 'рp', 'СC', 'сc', 'ТT', 'тt', 'УY', 'уy', 'ХX', 'хx', 'ІI', 'іi', 'ЈJ', 'јj', 'ЅS', 'ѕs', 'ЁE', 'ёe', 'ЇI', 'їi', 'ΑA', 'ΕE', 'ΖZ', 'ΗH', 'ΙI', 'ΚK', 'ΜM', 'ΝN', 'ΟO', 'ΡP', 'ΤT', 'ΥY', 'ΧX', 'αa', 'εe', 'ζz', 'ιi', 'κk', 'νv', 'οo', 'ρp', 'τt', 'υu', 'χx']) HOMO[pair[0]] = pair[1];

function spelledDigits(token: string): number {
  const n = token.length;
  const dp: number[] = [];
  for (let i = 0; i <= n; i++) dp.push(-1);
  dp[0] = 0;
  for (let i = 0; i < n; i++) {
    if (dp[i] < 0) continue;
    for (let w = 0; w < DIGIT_WORDS.length; w++) {
      const word = DIGIT_WORDS[w];
      if (!token.startsWith(word, i)) continue;
      const j = i + word.length;
      const v = dp[i] + (word === 'ten' ? 2 : 1);
      if (v > dp[j]) dp[j] = v;
    }
  }
  return dp[n];
}

function mapHomoglyphs(s: string): string {
  let out = '';
  for (const ch of s) out += HOMO[ch] ?? ch;
  return out;
}

/** Spaced copy keeps phrase gaps. Squeezed copy drops emoji, symbols, and punctuation so f🌸i🌸v🌸e becomes five. */
function mailForms(raw: string): string {
  const cleaned = mapHomoglyphs(String(raw).normalize('NFKC'))
    .replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu, '');
  return cleaned.replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu, '').replace(/\s+/g, ' ').trim();
}

function letterForms(tok: string): string[] {
  const one = tok.replace(/(.)\1{2,}/g, '$1');
  const two = tok.replace(/(.)\1{2,}/g, '$1$1');
  return one === tok ? [tok] : [tok, one, two];
}

function mailMean(text: string): boolean {
  const leet = text.toLowerCase().replace(/[01345$@]/g, ch => LEET[ch] ?? ch);
  const words = leet.replace(/[*.]/g, '').split(/[^a-z]+/).filter(Boolean);
  const hit = (tok: string) => letterForms(tok).some(t => MEAN.has(t) || t === 'kys' || /^sto+pid$/.test(t));
  if (words.some(hit)) return true;
  let buf = '';
  const singles: string[] = [];
  const flush = () => { if (buf.length > 1) singles.push(buf); buf = ''; };
  for (let i = 0; i < words.length; i++) {
    if (words[i].length === 1) buf += words[i];
    else flush();
  }
  flush();
  if (singles.some(hit)) return true;
  for (let i = 0; i < words.length - 1; i++) if (MEAN_PHRASE.has(words[i] + words[i + 1])) return true;
  return false;
}

function mailSchool(text: string): boolean {
  if (/\b(?:middle|high)\s+school\b/i.test(text)) return true;
  const re = /\b([A-Z][a-z]+)\s+(Elementary|School|Academy|Middle|High)\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (COMMON_WORD.has(m[1].toLowerCase())) continue;
    return true;
  }
  return false;
}

function mailStreet(text: string): boolean {
  const re = new RegExp(`\\b([A-Za-z]{2,})\\s+(?:${STREET_SUFFIX})\\b`, 'gi');
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (STREET_SKIP.has(m[1].toLowerCase())) continue;
    return true;
  }
  return false;
}

function joinSingleLetters(parts: string[]): string[] {
  const out: string[] = [];
  let buf = '';
  const flush = () => { if (buf) { out.push(buf); buf = ''; } };
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length === 1 && parts[i] >= 'a' && parts[i] <= 'z') buf += parts[i];
    else { flush(); out.push(parts[i]); }
  }
  flush();
  return out;
}

function mailDigits(text: string): boolean {
  const parts = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  let spelled = 0;
  for (let i = 0; i < parts.length; i++) {
    const n = spelledDigits(parts[i]);
    if (n > 0) spelled += n;
    if (n >= 3) return true;
  }
  if ((text.match(/\d/g) ?? []).length + spelled >= 5) return true;
  const lists = [parts, joinSingleLetters(parts)];
  for (let L = 0; L < lists.length; L++) {
    let run = 0;
    for (let i = 0; i < lists[L].length; i++) {
      const tok = lists[L][i];
      const isNum = /^\d+$/.test(tok) || spelledDigits(tok) > 0;
      run = isNum ? run + 1 : 0;
      if (run >= 3) return true;
    }
  }
  return false;
}

/** A fullwidth or compatibility digit-word (ｆｉｖｅ) is a number even when it is only one word. Plain "five" is not. */
function obfuscatedNumber(raw: string): boolean {
  const norm = String(raw).normalize('NFKC');
  if (norm === raw) return false;
  const tokens = norm.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  for (let i = 0; i < tokens.length; i++) if (/^\d+$/.test(tokens[i]) || spelledDigits(tokens[i]) > 0) return true;
  return false;
}

/** A capitalised First Last pair. A roster first name is allowed only when the second word is ordinary. */
function mailNames(text: string, roster: string[]): boolean {
  const words = text.match(/[A-Za-z]+/g) ?? [];
  const known = new Set(roster.map(n => n.toLowerCase()));
  for (let i = 0; i < words.length - 1; i++) {
    const a = words[i], b = words[i + 1];
    if (!/^[A-Z][a-z]+$/.test(a) || !/^[A-Z][a-z]+$/.test(b)) continue;
    const al = a.toLowerCase(), bl = b.toLowerCase();
    if (COMMON_WORD.has(al) || COMMON_WORD.has(bl)) continue;
    if (al === ITEM_WORD && bl === ITEM_WORD) continue;
    if (known.has(al) && COMMON_WORD.has(bl)) continue;
    return true;
  }
  return false;
}

function mailAgePlace(text: string): boolean {
  if (!/\b(?:i'm|im|i am)\b/i.test(text)) return false;
  if (!/\b(?:\d{1,2}|zero|oh|one|two|three|four|five|six|seven|eight|nine|ten)\b/i.test(text)) return false;
  return /\blive\s+(?:on|at)\b/i.test(text) || mailStreet(text);
}

function mailMeetup(text: string): boolean {
  if (/\bat\s+\d{1,2}\b/.test(text) || /\b\d{1,2}\s*(?:am|pm)\b/i.test(text) || /\b\d{1,2}:\d{2}\b/.test(text)) return true;
  const invite = /\b(?:come to|meet me)\b/i.test(text);
  if (invite && IN_GAME_PLACE.test(text)) return false;
  if (invite) return true;
  if (/\bat the park\b/i.test(text)) return true;
  return false;
}

function escapeReg(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const CATALOG_RE = (() => {
  const phrases = [...new Set(CATALOG_NAMES.map(n => mailForms(n)).filter(n => n.length >= 2))].sort((a, b) => b.length - a.length);
  return new RegExp(`(^|[^A-Za-z])(?:${phrases.map(escapeReg).join('|')})(?![A-Za-z])`, 'gi');
})();
const ITEM_WORD = 'item';
/** An item name becomes one ordinary word, so it cannot hide the word next to it. */
function maskCatalog(text: string): string {
  return text.replace(CATALOG_RE, (m, pre: string) => pre + 'Item');
}
/** "cool drive in my house" is the game. A capitalised Name drive plus an address still blocks. */
function coolDriveOk(text: string): boolean {
  if (!/\bcool drive in my house\b/i.test(text)) return false;
  const stripped = text.replace(/\bcool drive\b/ig, ' ');
  if (!/\b[A-Z][a-z]+\s+drive\b/.test(stripped)) return true;
  const address = ADDRESS_RE.test(text) || /\b(?:address|apt|apartment)\b/i.test(text) || /\blive\s+(?:on|at)\b/i.test(text) || mailStreet(stripped);
  return !address;
}
function maskSafePhrases(text: string): string {
  let out = maskCatalog(text);
  out = out.replace(/\bbest way to play\b/gi, m => ' '.repeat(m.length));
  if (coolDriveOk(text)) out = out.replace(/\bcool drive in my house\b/gi, m => ' '.repeat(m.length));
  out = out.replace(/\bmy favorite number is\b/gi, m => ' '.repeat(m.length));
  return out;
}
function textMeBlocked(text: string): boolean {
  if (/\bcall\s+me\b/i.test(text)) return true;
  if (!/\btext\s+me\b/i.test(text)) return false;
  return !/\btext\s+me\b[\s\S]{0,48}?\b(?:with\s+a\s+letter|in\s+the\s+game)\b/i.test(text);
}
function phoneNumberBlocked(text: string): boolean {
  if (/\bkys\b/i.test(text)) return true;
  const masked = maskSafePhrases(text);
  return /\bphone\b/i.test(masked) || /\bnumber\b/i.test(masked);
}

function mailBlocked(raw: string, roster: string[]): boolean {
  if (obfuscatedNumber(raw)) return true;
  const text = mailForms(raw);
  if (/\b(?:fortnite|roblox|minecraft|tiktok|snapchat|discord|instagram|youtube|twitch|xbox|psn)\b/i.test(text)) return true;
  if (/\b(?:snap|insta)\b/i.test(text)) return true;
  if (/\b(?:add|friend)\s+me\b[\s,.:!\-]*[A-Za-z0-9_]{2,}/i.test(text)) return true;
  if (/\b(?:user|username)\b[\s:._-]*[@#]?[A-Za-z0-9_]{2,}/i.test(text)) return true;
  if (/(^|\s)@[A-Za-z0-9_]{2,}/.test(text)) return true;
  if (mailAgePlace(text)) return true;
  if (/\blive\s+(?:on|at)\b/i.test(text) || /\b(?:my\s+)?address\b/i.test(text) || /\blast\s+name\b/i.test(text)) return true;
  if (textMeBlocked(text) || phoneNumberBlocked(text)) return true;
  if (/\bplay\s+for\s+the\b/i.test(text) || /\b(?:soccer|softball|dance)\s+team\b/i.test(text)) return true;
  if (mailSchool(text)) return true;
  if (mailMeetup(text)) return true;
  if (mailDigits(text) || mailDigits(maskCatalog(text))) return true;
  if (mailMean(text)) return true;
  const safe = maskSafePhrases(text);
  if (mailStreet(safe)) return true;
  if (mailNames(safe, roster)) return true;
  return false;
}

// ---------- validation (server-authoritative; also used when importing a local house) ----------
const ROOMS: RoomId[] = ROOM_IDS;
const isRoom = (r: unknown): r is RoomId => ROOMS.includes(r as RoomId);
const num = (v: unknown, lo: number, hi: number): number | null => (typeof v === 'number' && Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : null);
const str = (v: unknown, re: RegExp, max = 80): string | null => (typeof v === 'string' && v.length <= max && re.test(v) ? v : null);
const ID_RE = /^[A-Za-z0-9:_\/.-]{1,80}$/;
const COLOR_RE = /^#[0-9a-fA-F]{3,8}$/;
const KIND_RE = /^[A-Za-z0-9:_\/-]{1,100}$/;
const TILE_RE = /^[a-z0-9_-]{1,40}\/[a-z0-9_.-]{1,60}$/i;
const SIZES = ['little', 'kid', 'adult'] as const;

export function cleanItem(i: any): PlacedItem | null {
  if (!i || typeof i !== 'object') return null;
  const id = str(i.id, ID_RE), kind = str(i.kind, KIND_RE, 100);
  if (!id || !kind) return null;
  return { id, kind, x: num(i.x, 0, ROOM_W) ?? ROOM_W / 2, y: num(i.y, 0, ROOM_H) ?? 500, flip: i.flip === true, z: Math.round(num(i.z, -1e6, 1e6) ?? 0), scale: num(i.scale, 0.3, 3) ?? 1 };
}
export type Look = Pick<Character, 'skin' | 'hair' | 'hairStyle' | 'shirt' | 'pants' | 'size' | 'acc'> & { look2?: Look2 };
export function cleanLookPatch(p: any): Partial<Look & { flip: boolean; look2: Look2 | null }> | null {
  if (!p || typeof p !== 'object') return null;
  const out: any = {};
  for (const k of ['skin', 'hair', 'shirt', 'pants'] as const) if (k in p) { const c = str(p[k], COLOR_RE, 9); if (!c) return null; out[k] = c; }
  if ('hairStyle' in p) { const v = num(p.hairStyle, 0, 3); if (v === null) return null; out.hairStyle = Math.round(v); }
  if ('acc' in p) { const v = num(p.acc, 0, 3); if (v === null) return null; out.acc = Math.round(v); }
  if ('size' in p) { if (!SIZES.includes(p.size)) return null; out.size = p.size; }
  if ('flip' in p) { if (typeof p.flip !== 'boolean') return null; out.flip = p.flip; }
  // Old clients send the legacy colors and omit look2. Leaving the key off keeps her chibi look.
  // look2 is replaced or cleared only when this patch includes it (a B1 "use classic look" sends null).
  if ('look2' in p) out.look2 = sanitizeLook2(p.look2) ?? null;
  return Object.keys(out).length ? out : null;
}
export function cleanLook(p: any): Look {
  const base = newCharacter({ id: 'x' });
  const c = cleanLookPatch({ skin: p?.skin, hair: p?.hair, hairStyle: p?.hairStyle, shirt: p?.shirt, pants: p?.pants, size: p?.size, acc: p?.acc }) ?? {};
  const pickOr = <K extends keyof Look>(k: K): Look[K] => ((c as any)[k] ?? base[k]);
  const out: Look = { skin: pickOr('skin'), hair: pickOr('hair'), hairStyle: pickOr('hairStyle'), shirt: pickOr('shirt'), pants: pickOr('pants'), size: pickOr('size'), acc: pickOr('acc') };
  if (p && typeof p === 'object' && 'look2' in p) { const s = sanitizeLook2(p.look2); if (s) out.look2 = s; }
  return out;
}
/** A legacy look update omits look2. Keep the chibi look already stored. An explicit look2 replaces or clears it. */
export function applyLook(prev: Look | null | undefined, incoming: unknown): Look {
  const next = cleanLook(incoming);
  if (prev?.look2 && !(incoming && typeof incoming === 'object' && 'look2' in incoming)) next.look2 = prev.look2;
  return next;
}
function cleanCharacter(c: any): Character | null {
  const id = str(c?.id, ID_RE); if (!id || !isRoom(c?.room)) return null;
  return newCharacter({ ...cleanLook(c), id, room: c.room, x: num(c.x, 0, ROOM_W) ?? ROOM_W / 2, y: num(c.y, 60, ROOM_H) ?? 540, flip: c.flip === true,
    held: { left: c.held?.left ? cleanItem(c.held.left) : null, right: c.held?.right ? cleanItem(c.held.right) : null } });
}

// ---------- pets ----------
export const PROTOCOL = 4; // 2 = pets, park, fx; 3 = Rainbow Ranch; 4 = Game Room tables. Nursery, backyard, dogKennel, and mailbox ride along on the house: old clients keep unknown fields and simply do not draw them. dog/kennel acts go only to clients that say pet:1, so an older client never applies an action it does not know. Mail messages go only to clients that say mail:1. A grown-up mailbox listing is an optional field on parentInfo; old clients ignore it. settings.freeMail is optional too: missing means letters follow freeChat.
export const PROTO_PETS = 2, PROTO_RANCH = 3, PROTO_GAMES = 4;
export const CAT_NAMES = ['Mittens', 'Luna', 'Biscuit', 'Pumpkin', 'Whiskers', 'Mochi', 'Pepper', 'Noodle', 'Ginger', 'Socks'];
export const DOG_NAMES = ['Buddy', 'Coco', 'Max', 'Daisy', 'Peanut', 'Rocket', 'Bella', 'Waffles', 'Scout', 'Honey'];
export function cleanPetName(raw: unknown): string | null {
  const t = String(raw ?? '').normalize('NFC').replace(/\s+/g, ' ').trim();
  if (!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)) return null;
  if ((t.match(/\d/g) ?? []).length > 2) return null;
  const f = filterChat(t); return f.ok ? t : null;
}
export function cleanCat(c: any): Cat | null {
  if (!c || typeof c !== 'object') return null;
  const name = cleanPetName(c.name), coat = num(c.coat, 0, CAT_COATS - 1), x = num(c.x, 100, ROOM_W - 100) ?? ROOM_W / 2;
  return name && coat !== null && isRoom(c.room) ? { name, coat: Math.round(coat), room: c.room, x } : null;
}
export function cleanDog(d: any): Dog | null {
  if (!d || typeof d !== 'object') return null;
  const name = cleanPetName(d.name), breed = num(d.breed, 0, DOG_BREEDS - 1);
  if (!name || breed === null) return null;
  const owner = d.owner == null ? undefined : str(d.owner, ID_RE) ?? undefined;
  return { name, breed: Math.round(breed), ...(owner ? { owner } : {}) };
}

/** Turn an untrusted action into a safe one, or null to reject. UI-only actions are never accepted over the network. */
export function cleanAction(a: any): Action | null {
  if (!a || typeof a !== 'object' || typeof a.type !== 'string') return null;
  const room = a.room;
  switch (a.type) {
    case 'item/add': { const item = cleanItem(a.item); return isRoom(room) && item ? { type: a.type, room, item } : null; }
    case 'item/move': { const id = str(a.id, ID_RE), x = num(a.x, 0, ROOM_W), y = num(a.y, 0, ROOM_H); return isRoom(room) && id && x !== null && y !== null ? { type: a.type, room, id, x, y } : null; }
    case 'item/flip': case 'item/front': case 'item/back': case 'item/delete': { const id = str(a.id, ID_RE); return isRoom(room) && id ? { type: a.type, room, id } : null; }
    case 'room/wallpaper': case 'room/floor': { const color = str(a.color, COLOR_RE, 9); return isRoom(room) && color ? { type: a.type, room, color } : null; }
    case 'room/pattern': { const p = num(a.pattern, 0, 3); return isRoom(room) && p !== null ? { type: a.type, room, pattern: Math.round(p) } : null; }
    case 'room/wallTile': case 'room/floorTile': { if (!isRoom(room)) return null; if (a.tile === null) return { type: a.type, room, tile: null }; const t = str(a.tile, TILE_RE, 101); return t ? { type: a.type, room, tile: t } : null; }
    case 'char/add': { const c = cleanCharacter(a.char); return c ? { type: a.type, char: { ...c, held: { left: null, right: null } } } : null; }
    case 'char/update': { const id = str(a.id, ID_RE), patch = cleanLookPatch(a.patch); return id && patch ? { type: a.type, id, patch } : null; }
    case 'char/move': { const id = str(a.id, ID_RE), x = num(a.x, 0, ROOM_W), y = num(a.y, 60, ROOM_H); return id && isRoom(room) && x !== null && y !== null ? { type: a.type, id, room, x, y } : null; }
    case 'char/delete': { const id = str(a.id, ID_RE); return id ? { type: a.type, id } : null; }
    case 'char/hold': { const id = str(a.id, ID_RE), itemId = str(a.itemId, ID_RE); return id && itemId && isRoom(room) && (a.hand === 'left' || a.hand === 'right') ? { type: a.type, id, hand: a.hand, room, itemId } : null; }
    case 'char/release': { const id = str(a.id, ID_RE), x = num(a.x, 0, ROOM_W), y = num(a.y, 0, ROOM_H); return id && x !== null && y !== null && (a.hand === 'left' || a.hand === 'right') ? { type: a.type, id, hand: a.hand, x, y } : null; }
    case 'cat/set': { if (a.cat === null) return { type: a.type, cat: null }; const cat = cleanCat(a.cat); return cat ? { type: a.type, cat } : null; }
    case 'cat/move': { const x = num(a.x, 100, ROOM_W - 100); return isRoom(room) && x !== null ? { type: a.type, room, x } : null; }
    case 'dog/kennel': { if (a.item === null) return { type: 'dog/kennel', item: null }; const id = str(a.item, ID_RE); return id ? { type: 'dog/kennel', item: id } : null; }
    default: return null; // room/switch, settings/sound, game/reset, dog/set (dogs live on the player) are local-only
  }
}

/** Sanitize a whole house (e.g. a kid's local house brought into the neighborhood). */
export function cleanHouseState(raw: any): GameState {
  let s: GameState;
  try { s = migrate(raw); } catch { return initialState(); }
  const base = initialState();
  const rooms = {} as GameState['rooms'];
  for (const r of ROOMS) {
    const src: any = (s.rooms as any)?.[r] ?? base.rooms[r];
    rooms[r] = {
      wallpaper: str(src.wallpaper, COLOR_RE, 9) ?? base.rooms[r].wallpaper, floor: str(src.floor, COLOR_RE, 9) ?? base.rooms[r].floor,
      pattern: Math.round(num(src.pattern, 0, 3) ?? 0), wallTile: src.wallTile ? str(src.wallTile, TILE_RE, 101) : null, floorTile: src.floorTile ? str(src.floorTile, TILE_RE, 101) : null,
      items: (Array.isArray(src.items) ? src.items : []).slice(0, 80).map(cleanItem).filter(Boolean) as PlacedItem[],
    };
  }
  const characters = (Array.isArray(s.characters) ? s.characters : []).slice(0, MAX_CHARS).map(cleanCharacter).filter(Boolean) as Character[];
  const cat = (s as any).cat ? cleanCat((s as any).cat) : null;
  const dogKennel = validKennel({ dogKennel: (s as any).dogKennel, rooms });
  const mailbox = filterMailbox((s as any).mailbox);
  const house: GameState = { ...base, rooms, characters, currentRoom: 'living', soundOn: true, cat, dog: null, dogKennel };
  return mailbox ? { ...house, mailbox } : house;
}

/** A new letter. Same light list as a new bubble. */
export function cleanMailText(raw: unknown, _roster: string[] = []): FilterResult {
  return filterLoose(raw, MAIL_MAX, 'mail');
}

/** A stored letter stays when sending would allow it, or when fbd04db's chat list already allowed it. The text is never rewritten. */
function storedLetterOk(text: string): boolean {
  const light = filterLoose(text, MAIL_MAX, 'mail');
  if (light.ok && light.text === text) return true;
  const old = filterChat(text, MAIL_MAX);
  return old.ok && old.text === text;
}

/** Letters follow this when a street has never set freeMail.
 *  'follow freeChat' uses the chat switch, which is today's behavior.
 *  Set this to false and new streets are presets-only until a grown-up says otherwise. */
export const MAIL_FREE_DEFAULT: 'follow freeChat' | boolean = 'follow freeChat';

export interface StreetSettings { freeChat: boolean; freeMail?: boolean }

export function mailIsFree(settings: { freeChat: boolean; freeMail?: boolean }): boolean {
  if (typeof settings.freeMail === 'boolean') return settings.freeMail;
  if (MAIL_FREE_DEFAULT === 'follow freeChat') return settings.freeChat;
  return MAIL_FREE_DEFAULT;
}

/** Same light list as sending, plus any letter fbd04db would have kept. Shape, cap, and the 30-day fade happen in keepMailbox. */
export function filterMailbox(raw: unknown, now = Date.now()): Mailbox | null {
  const box = keepMailbox(raw, now);
  if (!box) return null;
  const letters = box.letters.filter(l => !l.text || storedLetterOk(l.text));
  return letters.length ? { letters } : null;
}

export function mailColor(n: unknown): number { return Number.isInteger(n) && (n as number) >= 0 && (n as number) < MAIL_COLORS ? n as number : -1; }
export function mailSticker(n: unknown): number { return Number.isInteger(n) && (n as number) >= 0 && (n as number) < MAIL_STICKERS ? n as number : -1; }

// ---------- presence ----------
// The park: a fixed, shared scene at the end of the street (and in solo play).
export const PARK_W = 2900;
export type Pose = 'sit' | 'swing' | 'slide';
export interface ParkSpot { kind: 'swing' | 'bench' | 'blanket'; x: number; y: number }
export const PARK_SPOTS: ParkSpot[] = [
  { kind: 'swing', x: 430, y: 500 }, { kind: 'swing', x: 570, y: 500 },
  { kind: 'blanket', x: 1730, y: 548 }, { kind: 'blanket', x: 1850, y: 548 },
  { kind: 'bench', x: 2025, y: 512 }, { kind: 'bench', x: 2105, y: 512 }, { kind: 'bench', x: 2225, y: 512 }, { kind: 'bench', x: 2305, y: 512 },
];
export const SLIDE = { top: { x: 905, y: 330 }, bottom: { x: 1110, y: 545 }, ladder: 850 };
export const DOG_AREA = { x0: 2440, x1: 2840, y0: 470, y1: 585 };
export interface Presence { where: 'street' | 'house' | 'park' | 'ranch' | 'barn' | 'gameroom'; houseId?: string; room?: RoomId; x: number; y: number; flip: boolean; pose?: Pose; spot?: number; ride?: number }
export function cleanPresence(p: any, houseExists: (id: string) => boolean): Presence | null {
  if (!p || (p.where !== 'street' && p.where !== 'house' && p.where !== 'park' && p.where !== 'ranch' && p.where !== 'barn' && p.where !== 'gameroom')) return null;
  const x = num(p.x, 0, 20000), y = num(p.y, 0, ROOM_H); if (x === null || y === null) return null;
  if (p.where === 'street') return { where: 'street', x, y, flip: p.flip === true };
  if (p.where === 'ranch') {
    const out: Presence = { where: 'ranch', x: Math.max(40, Math.min(x, RANCH_W - 40)), y: Math.max(RANCH_Y0, Math.min(y, RANCH_Y1)), flip: p.flip === true };
    if (Number.isInteger(p.ride) && p.ride >= 0 && p.ride < HORSES.length) out.ride = p.ride; // horses never leave the ranch
    return out;
  }
  if (p.where === 'barn') return { where: 'barn', x: Math.max(40, Math.min(x, BARN_W - 40)), y: Math.max(RANCH_Y0, Math.min(y, RANCH_Y1)), flip: p.flip === true }; // no horses inside
  if (p.where === 'gameroom') return { where: 'gameroom', x: Math.max(40, Math.min(x, GAMEROOM_W - 40)), y: Math.max(RANCH_Y0, Math.min(y, RANCH_Y1)), flip: p.flip === true };
  if (p.where === 'park') {
    const out: Presence = { where: 'park', x: Math.min(x, PARK_W), y, flip: p.flip === true };
    if (p.pose === 'slide') out.pose = 'slide';
    else if ((p.pose === 'sit' || p.pose === 'swing') && Number.isInteger(p.spot) && PARK_SPOTS[p.spot]) {
      const sp = PARK_SPOTS[p.spot]; out.pose = sp.kind === 'swing' ? 'swing' : 'sit'; out.spot = p.spot; out.x = sp.x; out.y = sp.y;
    }
    return out;
  }
  const houseId = str(p.houseId, ID_RE); if (!houseId || !houseExists(houseId) || !isRoom(p.room)) return null;
  return { where: 'house', houseId, room: p.room, x: Math.min(x, ROOM_W), y, flip: p.flip === true };
}
export const sameSpot = (a: Presence, b: Presence) => a.where === b.where && (a.where !== 'house' || (a.houseId === b.houseId && a.room === b.room));

// ---------- fx: short-lived effects relayed to kids in the same place (never stored) ----------
export type Fx = { k: 'trick'; owner: string; v: number } | { k: 'purr' } | { k: 'leap' } | { k: 'ball'; x: number; y: number } | { k: 'splash'; x: number }
  | { k: 'zoo'; a: number; f: number } | { k: 'apple'; v: number } | { k: 'honk' } | { k: 'hen' };
export const RANCH_FX = new Set(['zoo', 'apple', 'honk', 'hen']);
/** Where a ranch effect may come from: the petting zoo is inside the barn (older clients still pet in the yard). */
export const fxAllowedAt = (k: string, where: Presence['where']) => k === 'zoo' ? where === 'ranch' || where === 'barn' : where === 'ranch';
export function cleanFx(f: any): Fx | null {
  if (!f || typeof f !== 'object') return null;
  if (f.k === 'trick') { const owner = str(f.owner, ID_RE), v = num(f.v, 0, 2); return owner && v !== null ? { k: 'trick', owner, v: Math.round(v) } : null; }
  if (f.k === 'purr') return { k: 'purr' };
  if (f.k === 'leap') return { k: 'leap' };
  if (f.k === 'ball') { const x = num(f.x, DOG_AREA.x0, DOG_AREA.x1), y = num(f.y, DOG_AREA.y0, DOG_AREA.y1); return x !== null && y !== null ? { k: 'ball', x, y } : null; }
  if (f.k === 'splash') { const x = num(f.x, 0, PARK_W); return x !== null ? { k: 'splash', x } : null; }
  if (f.k === 'zoo') { const a = f.a, fd = f.f; return Number.isInteger(a) && a >= 0 && a < ANIMALS.length + HORSES.length && Number.isInteger(fd) && fd >= 0 && fd < FOODS.length ? { k: 'zoo', a, f: fd } : null; }
  if (f.k === 'apple') return Number.isInteger(f.v) && f.v >= 0 && f.v < 4 ? { k: 'apple', v: f.v } : null;
  if (f.k === 'honk' || f.k === 'hen') return { k: f.k };
  return null;
}
export const isNear = (a: Presence, b: Presence) => sameSpot(a, b) && Math.abs(a.x - b.x) <= NEAR_X && Math.abs(a.y - b.y) <= NEAR_Y;

// ---------- protocol ----------
export interface PlayerPub { pid: string; nickname: string; houseId: string; look: Look; online: boolean; dog?: Dog | null; basket?: Basket }
export interface HouseMeta { id: string; ownerId: string; name: string; locked: boolean; style: number; slot: number }
export interface HouseFull extends HouseMeta { state: GameState }
export type Bubble = { kind: 'phrase' | 'emote'; v: number } | { kind: 'text'; v: string };

export type ClientMsg =
  | { t: 'hello'; token: string; v?: number; pet?: number; mail?: number }
  | { t: 'join'; nickname: string; look: Look; house?: unknown; dog?: Dog | null; v?: number; pet?: number; mail?: number }
  | { t: 'dog'; dog: Dog | null }
  | { t: 'fx'; fx: Fx }
  | { t: 'ranch'; o: RanchOp }
  | { t: 'act'; houseId: string; cid: number; action: Action }
  | { t: 'pres'; p: Presence }
  | { t: 'look'; look: Look }
  | { t: 'lock'; houseId: string; locked: boolean }
  | { t: 'say'; b: Bubble }
  | { t: 'mail'; op: 'send'; houseId: string; text: string; color: number; sticker: number }
  | { t: 'mail'; op: 'read' | 'drop'; houseId: string; id: string }
  | ({ t: 'tbl' } & TableOp)
  | { t: 'parent'; key: string; op: 'info' } | { t: 'parent'; key: string; op: 'rename'; houseId: string; name: string }
  | { t: 'parent'; key: string; op: 'remove'; pid: string } | { t: 'parent'; key: string; op: 'freeChat' | 'freeMail'; on: boolean }
  | { t: 'parent'; key: string; op: 'rosterAdd' | 'rosterRemove' | 'unclaim'; name: string } | { t: 'parent'; key: string; op: 'setCode'; code: string }
  | { t: 'parent'; key: string; op: 'mailClear'; houseId: string; id?: string } | { t: 'parent'; key: string; op: 'mailClearAll' };

export type ServerMsg =
  | { t: 'joined'; token: string; pid: string }
  | { t: 'welcome'; pid: string; settings: StreetSettings; players: PlayerPub[]; houses: HouseFull[]; presence: Record<string, Presence>; ranch?: { plots: (Plot | null)[]; now: number }; tables?: TablePub[] }
  | { t: 'act'; houseId: string; by: string; cid: number; action: Action }
  | { t: 'nack'; houseId: string; cid: number; reason: string; state?: GameState }
  | { t: 'pres'; pid: string; p: Presence | null }
  | { t: 'players'; players: PlayerPub[] }
  | { t: 'house'; house: HouseFull } | { t: 'houseMeta'; meta: HouseMeta } | { t: 'houseGone'; houseId: string }
  | { t: 'settings'; settings: StreetSettings }
  | { t: 'bubble'; pid: string; b: Bubble }
  | { t: 'fx'; pid: string; fx: Fx }
  | { t: 'ranch'; plots: (Plot | null)[]; now: number }
  | { t: 'ranchFail'; reason: string; plots: (Plot | null)[]; now: number }
  | { t: 'noride'; ride: number }
  | { t: 'table'; table: TablePub }
  | { t: 'tblFail'; tb: number; reason: string }
  | { t: 'sayFail'; reason: string }
  | { t: 'mailbox'; houseId: string; mailbox: Mailbox }
  | { t: 'mailFail'; houseId: string; reason: string }
  | { t: 'parentInfo'; code: string; settings: StreetSettings; players: PlayerPub[]; houses: HouseMeta[]; roster: RosterEntry[]; note?: string; mail?: { houseId: string; name: string; letters: { id: string; from: string; text: string; at: number }[] }[] }
  | { t: 'error'; code: 'nohood' | 'badtoken' | 'nickname' | 'full' | 'badkey' | 'bad'; msg?: string }
  | { t: 'removed' };

export function cleanHouseName(raw: unknown): string | null {
  const f = filterChat(raw); if (!f.ok || f.text.length > 24) return null; return f.text;
}

/** A single first name: letters, hyphens, apostrophes. No spaces, so a last name cannot be stored. Already-saved names are left as they are. */
export function cleanFirstName(raw: unknown): string | null {
  const t = String(raw ?? '').normalize('NFC').replace(/\s+/g, ' ').trim();
  if (!/^\p{L}[\p{L}'-]{0,19}$/u.test(t)) return null;
  const f = filterChat(t); if (!f.ok) return null;
  return t.charAt(0).toUpperCase() + t.slice(1);
}
