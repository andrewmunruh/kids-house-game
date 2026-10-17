import { storeKey } from './shared/storekey';
// "What's new!" popup, shown once per device after an update.
// To announce a future update, add an entry to the TOP of CHANGELOG with the next version number.
// Brand-new devices never see the changelog; they get a short welcome instead.
import { catSVG, dogSVG } from './pets';
import { treeIcon, pawIcon } from './park';
import { animalSVG, horseSVG, eggSVG, plotSVG, rainbowIcon, RAINBOW } from './ranch';
import { mapIcon, faceSVG } from './map';
import { characterSVG } from './character';

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

const ranchArt = `<svg viewBox="0 0 120 100">${RAINBOW.map((c, i) => `<path d="M${12 + i * 6} 84 A${48 - i * 6} ${48 - i * 6} 0 0 1 ${108 - i * 6} 84" fill="none" stroke="${c}" stroke-width="6"/>`).join('')}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${O}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${O}" stroke-width="3"/></svg>`;
const basketEggs = `<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${eggSVG.replace('<svg viewBox="0 0 40 40">', '').replace('</svg>', '')}</g><g transform="translate(52 22) scale(1.4)">${eggSVG.replace('<svg viewBox="0 0 40 40">', '').replace('</svg>', '')}</g></svg>`;
const inner = (svg: string, x: number, y: number, s: number) => `<g transform="translate(${x} ${y}) scale(${s})">${svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g>`;
const faceArt = `<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${O}" stroke-width="4"/>${inner(faceSVG(characterSVG({ skin: '#f1c27d', hair: '#5b3a29', hairStyle: 2, shirt: '#ff7aa8', pants: '#5aa9e6' })).replace('viewBox="14 2 72 74"', 'viewBox="0 0 100 160"'), 26, 12, 0.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`;
export const CHANGELOG: ChangeEntry[] = [
  { v: 4, title: 'A map of our neighborhood!', lines: [
    { art: wrap(mapIcon), text: 'Tap the <b>map</b> to go anywhere!' },
    { art: wrap(faceArt), text: "Tap a friend's face to <b>find her</b>." },
    { art: wrap(animalSVG(0)), text: 'The petting zoo is inside the <b>barn</b> now!' },
  ] },
  { v: 3, title: 'Rainbow Ranch is open!', lines: [
    { art: wrap(ranchArt), text: 'Visit <b>Rainbow Ranch</b>!' },
    { art: wrap(animalSVG(1)), text: 'Pet and feed animals at the <b>petting zoo</b>.' },
    { art: wrap(`<svg viewBox="0 0 160 130">${inner(horseSVG(4), 0, 0, 1)}</svg>`), text: 'Ride <b>horses</b> and the <b>rainbow pony</b>!' },
    { art: wrap(basketEggs), text: 'Collect <b>eggs</b> from the hens.' },
    { art: wrap(`<svg viewBox="0 0 70 90">${inner(plotSVG({ seed: 'carrot', at: 0, wet: 1 }, 3, 0), 0, 0, 1)}</svg>`), text: 'Grow carrots and flowers in the <b>garden</b>.' },
  ] },
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

const SEEN_KEY = storeKey('cozy-whatsnew');
const BASELINE = 1; // everything before the changelog existed counts as version 1

/** Call before the game store loads, so we can tell a brand-new device from an existing save. */
export function whatsNewCheck(): { kind: 'welcome' | 'news' | 'none'; entries: ChangeEntry[] } {
  try {
    const seen = Number(localStorage.getItem(SEEN_KEY));
    const had = ['cozy-house', 'cozy-house-v1', 'cozy-hood'].some(k => localStorage.getItem(storeKey(k)) !== null);
    if (!seen && !had) return { kind: 'welcome', entries: [WELCOME] };
    const since = seen || BASELINE;
    const entries = CHANGELOG.filter(e => e.v > since).slice(0, 3);
    return entries.length ? { kind: 'news', entries } : { kind: 'none', entries: [] };
  } catch { return { kind: 'none', entries: [] }; }
}
export function markSeen() { try { localStorage.setItem(SEEN_KEY, String(LATEST)); } catch {} }

export function whatsNewHTML(kind: 'welcome' | 'news', entries: ChangeEntry[]): string {
  const title = kind === 'welcome' ? WELCOME.title : entries[0].title;
  const lines = entries.flatMap(e => e.lines).slice(0, 5); // newest first, never a wall of text
  return `<div class="wnBadge">${kind === 'welcome' ? pawIcon : entries[0].v >= 4 ? mapIcon : entries[0].v >= 3 ? rainbowIcon : treeIcon}</div>
    <h2 class="wnTitle">${title}</h2>
    <div class="wnList ${lines.length > 3 ? 'many' : ''}">${lines.map((l, i) => `<div class="wnLine" style="animation-delay:${0.15 + i * 0.18}s">${l.art}<p>${l.text}</p></div>`).join('')}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`;
}
