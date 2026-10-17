// "What's new!" popup, shown once per device after an update.
// To announce a future update, add an entry to the TOP of CHANGELOG with the next version number.
// Brand-new devices never see the changelog; they get a short welcome instead.
import { catSVG, dogSVG } from './pets';
import { treeIcon, pawIcon } from './park';

export interface ChangeLine { art: string; text: string }
export interface ChangeEntry { v: number; title: string; lines: ChangeLine[] }

const O = '#5a3d5c';
const parkArt = `<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${O}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${O}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${O}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${O}" stroke-width="3"/></svg>`;
const houseArt = `<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${O}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${O}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${O}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${O}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${O}" stroke-width="3"/></svg>`;
const shirtArt = `<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${O}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${O}" stroke-width="3"/></svg>`;
const wrap = (svg: string) => `<div class="wnArt">${svg}</div>`;

export const CHANGELOG: ChangeEntry[] = [
  { v: 2, title: "What's new!", lines: [
    { art: wrap(parkArt), text: 'A new <b>park</b>! Swing, slide and splash with friends.' },
    { art: wrap(catSVG(3, 'sit')), text: 'Adopt a <b>cat</b>! She lives in your house.' },
    { art: wrap(dogSVG(3, 'stand')), text: 'Adopt a <b>dog</b>! Take it to the park to play fetch.' },
  ] },
];
export const LATEST = CHANGELOG[0].v;
export const WELCOME: ChangeEntry = { v: LATEST, title: 'Welcome to your cozy house!', lines: [
  { art: wrap(houseArt), text: 'Drag furniture into your rooms.' },
  { art: wrap(shirtArt), text: 'Dress up your friends.' },
  { art: wrap(catSVG(0, 'sit')), text: 'Tap the paw to adopt a pet!' },
] };

const SEEN_KEY = 'cozy-whatsnew';
const BASELINE = 1; // everything before the changelog existed counts as version 1

/** Call before the game store loads, so we can tell a brand-new device from an existing save. */
export function whatsNewCheck(): { kind: 'welcome' | 'news' | 'none'; entries: ChangeEntry[] } {
  try {
    const seen = Number(localStorage.getItem(SEEN_KEY));
    const had = ['cozy-house', 'cozy-house-v1', 'cozy-hood'].some(k => localStorage.getItem(k) !== null);
    if (!seen && !had) return { kind: 'welcome', entries: [WELCOME] };
    const since = seen || BASELINE;
    const entries = CHANGELOG.filter(e => e.v > since).slice(0, 3);
    return entries.length ? { kind: 'news', entries } : { kind: 'none', entries: [] };
  } catch { return { kind: 'none', entries: [] }; }
}
export function markSeen() { try { localStorage.setItem(SEEN_KEY, String(LATEST)); } catch {} }

export function whatsNewHTML(kind: 'welcome' | 'news', entries: ChangeEntry[]): string {
  const title = kind === 'welcome' ? WELCOME.title : entries[0].title;
  const lines = entries.flatMap(e => e.lines);
  return `<div class="wnBadge">${kind === 'welcome' ? pawIcon : treeIcon}</div>
    <h2 class="wnTitle">${title}</h2>
    <div class="wnList">${lines.map((l, i) => `<div class="wnLine" style="animation-delay:${0.15 + i * 0.18}s">${l.art}<p>${l.text}</p></div>`).join('')}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`;
}
