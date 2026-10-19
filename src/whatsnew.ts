import { storeKey } from './shared/storekey';
// "What's new!" popup, shown once per device after an update.
// To announce a future update, add an entry to the TOP of CHANGELOG with the next version number.
// Brand-new devices never see the changelog; they get a short welcome instead.
import { catSVG, dogSVG } from './pets';
import { treeIcon, pawIcon } from './park';
import { animalSVG, horseSVG, eggSVG, plotSVG, rainbowIcon, RAINBOW } from './ranch';
import { mapIcon, faceSVG } from './map';
import { clubIcon } from './gameroom';
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
const brushArt = `<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${O}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${O}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${O}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${O}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${O}" stroke-width="3"/></svg>`;

const ranchArt = `<svg viewBox="0 0 120 100">${RAINBOW.map((c, i) => `<path d="M${12 + i * 6} 84 A${48 - i * 6} ${48 - i * 6} 0 0 1 ${108 - i * 6} 84" fill="none" stroke="${c}" stroke-width="6"/>`).join('')}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${O}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${O}" stroke-width="3"/></svg>`;
const basketEggs = `<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${eggSVG.replace('<svg viewBox="0 0 40 40">', '').replace('</svg>', '')}</g><g transform="translate(52 22) scale(1.4)">${eggSVG.replace('<svg viewBox="0 0 40 40">', '').replace('</svg>', '')}</g></svg>`;
const inner = (svg: string, x: number, y: number, s: number) => `<g transform="translate(${x} ${y}) scale(${s})">${svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g>`;
const faceArt = `<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${O}" stroke-width="4"/>${inner(faceSVG(characterSVG({ skin: '#f1c27d', hair: '#5b3a29', hairStyle: 2, shirt: '#ff7aa8', pants: '#5aa9e6' })).replace('viewBox="14 2 72 74"', 'viewBox="0 0 100 160"'), 26, 12, 0.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`;
const clubArt = `<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${O}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18, 34, 50, 66, 82, 98].map((x, i) => `<circle cx="${x}" cy="24" r="4" fill="${['#ff7eb3', '#ffd43b', '#66d9e8', '#d0bfff'][i % 4]}" stroke="${O}" stroke-width="1.5"/>`).join('')}</svg>`;
const slayArt = `<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${O}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`;
const fourArt = `<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${O}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${O}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${O}" stroke-width="2"/></svg>`;
const cribArt = `<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${O}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${O}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${O}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`;
const cottageArt = `<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${O}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${O}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${O}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${O}" stroke-width="2"/></svg>`;
const kennelArt = `<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${O}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${O}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${O}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${O}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`;
const mailArt = `<svg viewBox="0 0 120 100"><rect x="28" y="38" width="64" height="42" rx="8" fill="#8ecae6" stroke="${O}" stroke-width="4"/><path d="M28 44 L60 68 L92 44" fill="none" stroke="${O}" stroke-width="4"/><path d="M76 30 V16" stroke="${O}" stroke-width="4" stroke-linecap="round"/><path d="M76 16 H96 L90 23 L96 30 H76 Z" fill="#ff6b6b" stroke="${O}" stroke-width="3"/></svg>`;
const playArt = `<svg viewBox="0 0 120 100"><rect x="8" y="32" width="48" height="40" rx="14" fill="#fff3b0" stroke="${O}" stroke-width="4"/><rect x="64" y="32" width="48" height="40" rx="14" fill="#fff" stroke="${O}" stroke-width="4"/><path d="M26 44 L40 52 L26 60 Z" fill="${O}"/><circle cx="88" cy="52" r="6" fill="#ff8fab" stroke="${O}" stroke-width="3"/></svg>`;
const winterArt = `<svg viewBox="0 0 120 100"><circle cx="60" cy="78" r="16" fill="#fff" stroke="${O}" stroke-width="4"/><circle cx="60" cy="54" r="12" fill="#fff" stroke="${O}" stroke-width="4"/><circle cx="60" cy="34" r="9" fill="#fff" stroke="${O}" stroke-width="4"/><circle cx="56" cy="32" r="1.8" fill="${O}"/><circle cx="64" cy="32" r="1.8" fill="${O}"/><path d="M50 38 H70" stroke="#e25d6c" stroke-width="4" stroke-linecap="round"/><path d="M42 58 L28 48 M78 58 L92 48" stroke="${O}" stroke-width="3" stroke-linecap="round"/><circle cx="22" cy="22" r="3" fill="#fff" stroke="${O}" stroke-width="2"/><circle cx="98" cy="18" r="4" fill="#d7f3ff" stroke="${O}" stroke-width="2"/></svg>`;
export const CHANGELOG: ChangeEntry[] = [
  { v: 9, title: 'Winter Cheer!', lines: [
    { art: wrap(winterArt), text: 'The <b>Winter Cheer</b> pack is in your drawer!' },
  ] },
  { v: 8, title: 'Make your look!', lines: [
    { art: wrap(mailArt), text: 'Leave a <b>letter</b> in a friend\'s mailbox!' },
    { art: wrap(playArt), text: 'Tap <b>Play</b> or <b>Decorate</b>!' },
    { art: wrap(shirtArt), text: '<b>Make your look!</b> New hair, clothes, and colors.' },
  ] },
  { v: 7, title: 'New Nursery!', lines: [
    { art: wrap(cribArt), text: 'A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!' },
    { art: wrap(cottageArt), text: 'The <b>Cozy Cottage</b> furniture pack is in your drawer!' },
    { art: wrap(kennelArt), text: 'A <b>dog kennel</b> and a <b>cat tower</b> for your pets!' },
  ] },
  { v: 6, title: 'The clubhouse is open!', lines: [
    { art: wrap(clubArt), text: 'A glam <b>clubhouse</b> on the map!' },
    { art: wrap(slayArt), text: 'Play <b>Slay</b> with friends at a table!' },
    { art: wrap(fourArt), text: 'Line up <b>hearts</b> or <b>stars</b>!' },
  ] },
  { v: 5, title: 'Your house looks even cozier!', lines: [
    { art: wrap(brushArt), text: 'Wallpaper and floors show their <b>real patterns</b> when you paint!' },
    { art: wrap(catSVG(0, 'sit')), text: 'Your cat is <b>big and cozy</b>, just like the toy cat.' },
    { art: wrap(houseArt), text: 'Tap <b>home</b> to come back from the map, the park, or the ranch.' },
  ] },
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
  return `<div class="wnBadge">${kind === 'welcome' ? pawIcon : entries[0].v >= 9 ? winterArt : entries[0].v >= 8 ? shirtArt : entries[0].v >= 7 ? cribArt : entries[0].v >= 6 ? clubIcon : entries[0].v >= 5 ? brushArt : entries[0].v >= 4 ? mapIcon : entries[0].v >= 3 ? rainbowIcon : treeIcon}</div>
    <h2 class="wnTitle">${title}</h2>
    <div class="wnList ${lines.length > 3 ? 'many' : ''}">${lines.map((l, i) => `<div class="wnLine" style="animation-delay:${0.15 + i * 0.18}s">${l.art}<p>${l.text}</p></div>`).join('')}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`;
}
