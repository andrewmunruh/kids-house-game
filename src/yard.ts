// Backyard preview for approval mockups. On only with ?yard=1.
// Drawings follow the approved art-style v2 (cursor/art-refresh 57da467, not merged):
// top-left light, a hard cel side plane, an edge highlight, a few texture strokes,
// a two-ellipse plum contact shadow, plum outlines, and no blur. Gradients are
// only the sky, glass, and a lamp glow. Nothing here is in the default catalog.

import { svgOf, type ItemDef } from './items';
import { patchFromLook2, type Look2 } from './shared/avatar';

const O = '#5a3d5c';
const ink = (w = 3.5) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

function shadow(cx: number, rx: number, cy: number): string {
  const inner = Math.round(rx * 0.62);
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="3.4" fill="${O}" opacity=".08"/><ellipse cx="${cx}" cy="${(cy + 1.2).toFixed(1)}" rx="${inner}" ry="1.55" fill="${O}" opacity=".12"/>`;
}
function hi(d: string, w = 2.2): string {
  return `<path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" opacity=".75"/>`;
}
function tex(d: string, w = 1.15): string {
  return `<path d="${d}" fill="none" stroke="${O}" stroke-width="${w}" stroke-linecap="round" opacity=".2"/>`;
}
function rad(id: string, color: string, a = '.7'): string {
  return `<radialGradient id="${id}" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="${color}" stop-opacity="${a}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
}
function glass(id: string, light: string, deep: string): string {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${deep}"/></linearGradient>`;
}

export function yardPreviewOn(): boolean {
  if (typeof location === 'undefined') return false;
  return /(?:^|[?&])yard=1(?:&|$)/.test(location.search);
}
export function yardShot(): string {
  if (typeof location === 'undefined') return '';
  return new URLSearchParams(location.search).get('shot') || '';
}

/** A fixed chibi look so a headless browser (no random starter) still draws avatar v2. */
export const YARD_LOOK: Look2 = {
  v: 1,
  hair: 'pigtails',
  hairC: '#a0522d',
  skin: '#f6d2b5',
  eyes: 'big',
  eyeC: '#5a321c',
  freckles: true,
  blush: true,
  top: 'classic',
  topC: '#ff7aa8',
  bottom: 'skirt',
  bottomC: '#c9a0dc',
  dress: 'sundress',
  dressC: '#ff8fab',
  shoes: 'maryjanes',
  shoesC: '#ffd166',
  acc: ['bow'],
  accC: '#ff7aa8',
};
export const yardLookPatch = () => patchFromLook2(YARD_LOOK);

/** Play frames 480 world units. The camera stays put so the house stays on the left. */
export const YARD_CAM = 870;
/** She faces the swing. The dog stands on her left, so the Kennel chip stays off the frame. */
export const YARD_KID = { x: 1136, y: 528, flip: false as boolean };
export const YARD_CAT = { x: 1216, y: 378 };
export const DOOR_KID = { x: 940, y: 540, flip: true as boolean };
export const DOOR_CAT_X = 1160;

/** Living-room door: center-bottom on the floor line (baseboard ends at y=396). */
export const LIVE_DOOR = { x: 824, y: 398, w: 96, h: 230 };
/** Same door from the yard, bottom flush with the house wall and the grass. */
export const YARD_DOOR = { x: 996, y: 372, w: 82, h: 196 };

/** Back-to-front. item/add stamps z from this order. */
export const YARD_STAGE: { kind: string; x: number; y: number }[] = [
  { kind: 'lemonade-cart', x: 938, y: 500 },
  { kind: 'yard-swing', x: 1279, y: 548 },
  { kind: 'sandbox', x: 944, y: 558 },
  { kind: 'picnic-blanket', x: 1168, y: 564 },
];

function piece(p: { kind: string; name: string; cat: string; w: number; h: number; vb: string; wall?: boolean; holdable?: boolean; svg: string }): ItemDef {
  return { kind: p.kind, name: p.name, cat: p.cat, w: p.w, h: p.h, vb: p.vb, wall: p.wall, holdable: p.holdable ?? false, rooms: ['backyard'], svg: p.svg };
}

const swing = piece({
  kind: 'yard-swing', name: 'A-Frame Swing', cat: 'furniture', w: 96, h: 148, vb: '0 0 100 154',
  svg: `${shadow(50, 40, 150)}
    <path d="M10 18 L20 18 L14 146 H4 Z" fill="#f3d2aa" ${ink()}/>
    <path d="M20 18 L32 18 L40 146 H28 Z" fill="#f0d2b0" ${ink()}/>
    <path d="M34 22 L40 18 L38 48 H34 Z" fill="#d4a373"/>
    <path d="M68 18 L80 18 L72 146 H60 Z" fill="#f3d2aa" ${ink()}/>
    <path d="M80 18 L92 18 L98 146 H86 Z" fill="#e7c49a" ${ink()}/>
    <path d="M90 22 L92 18 L98 146 H94 Z" fill="#c99366"/>
    ${tex('M10 70 l4 36 M30 78 l6 32 M66 76 l4 34 M90 72 l5 36')}
    <rect x="6" y="6" width="88" height="14" rx="2" fill="#f6e0c4" ${ink()}/>
    <rect x="70" y="9" width="20" height="8" rx="1" fill="#d4a373"/>
    <rect x="10" y="16" width="74" height="4" fill="#e7c49a"/>
    ${hi('M12 10 h32')}
    <rect x="41" y="98" width="18" height="6" rx="1" fill="#f3d2aa" ${ink(2.2)}/>
    <rect x="53" y="99" width="5" height="4" fill="#d4a373"/>
    <path d="M45 20 V102 M57 20 V102" fill="none" ${ink(2.2)}/>
    ${hi('M43 100 h8')}`,
});

const sandbox = piece({
  kind: 'sandbox', name: 'Sandbox', cat: 'furniture', w: 120, h: 54, vb: '0 0 160 72',
  svg: `${shadow(80, 64, 68)}
    <path d="M108 38 L146 26 L146 52 L108 64 Z" fill="#e7c49a" ${ink()}/>
    <path d="M126 36 L142 28 L142 48 L126 56 Z" fill="#c99366"/>
    <path d="M12 40 H108 V64 H12 Z" fill="#f3d2aa" ${ink()}/>
    <path d="M12 40 L36 18 L146 18 L108 40 Z" fill="#f6e0c4" ${ink()}/>
    <path d="M112 20 L142 20 L108 38 L90 38 Z" fill="#d4a373"/>
    <path d="M34 36 L52 24 L122 24 L100 36 Z" fill="#ffe08a" ${ink(2.2)}/>
    <path d="M98 26 L118 26 L100 34 L86 34 Z" fill="#f0c36a"/>
    ${tex('M48 30 q8 2 6 5 M68 28 q10 2 8 6 M58 34 h16')}
    <path d="M76 30 L100 36 L94 48 L70 42 Z" fill="#d7e6f2" ${ink(2.2)}/>
    <path d="M88 34 L98 38 L94 44 L84 40 Z" fill="#b7c9d6"/>
    <path d="M52 8 L64 4 L90 34 L78 38 Z" fill="#f0d2b0" ${ink()}/>
    <path d="M64 8 L72 6 L90 32 L82 34 Z" fill="#d4a373"/>
    <path d="M46 2 H66 V9 H46 Z" fill="#c99366" ${ink(2)}/>
    ${hi('M18 44 h26')}
    ${hi('M44 22 h22')}`,
});

const slide = piece({
  kind: 'little-slide', name: 'Little Slide', cat: 'furniture', w: 150, h: 188, vb: '0 0 110 140',
  svg: `${shadow(56, 44, 134)}
    <path d="M50 34 H72 C94 36 102 56 98 82 L92 122 H70 L76 84 C78 60 72 46 52 44 Z" fill="#ffb3c6" ${ink()}/>
    <path d="M72 38 C94 42 104 62 100 86 L94 122 H86 L92 86 C94 64 86 48 72 46 Z" fill="#e45d88"/>
    <rect x="14" y="34" width="8" height="96" rx="2" fill="#f3d2aa" ${ink()}/>
    <rect x="36" y="34" width="8" height="96" rx="2" fill="#e7c49a" ${ink()}/>
    <rect x="40" y="40" width="3" height="84" fill="#c99366"/>
    <rect x="14" y="52" width="30" height="5" rx="1" fill="#f6e0c4" ${ink(2.2)}/>
    <rect x="14" y="70" width="30" height="5" rx="1" fill="#f6e0c4" ${ink(2.2)}/>
    <rect x="14" y="88" width="30" height="5" rx="1" fill="#f6e0c4" ${ink(2.2)}/>
    <rect x="14" y="106" width="30" height="5" rx="1" fill="#f6e0c4" ${ink(2.2)}/>
    <rect x="6" y="18" width="56" height="22" rx="3" fill="#f3d2aa" ${ink()}/>
    <rect x="6" y="34" width="56" height="6" fill="#d4a373"/>
    <path d="M48 20 H62 V40 H48 Z" fill="#c99366"/>
    ${hi('M12 24 h22')}
    <rect x="12" y="6" width="5" height="16" rx="1" fill="#f0d2b0" ${ink(2.2)}/>
    <rect x="40" y="6" width="5" height="16" rx="1" fill="#e7c49a" ${ink(2.2)}/>
    <path d="M14 8 H43" fill="none" ${ink(2.2)}/>
    <rect x="80" y="116" width="7" height="16" rx="1" fill="#f3d2aa" ${ink(2)}/>
    ${hi('M58 42 C74 48 86 66 86 88')}
    ${tex('M80 64 q4 16 2 28')}`,
});

const bench = piece({
  kind: 'yard-bench', name: 'Garden Bench', cat: 'furniture', w: 140, h: 100, vb: '0 0 140 100',
  svg: `${shadow(70, 58, 96)}
    <rect x="10" y="8" width="12" height="86" rx="2" fill="#f3d2aa" ${ink()}/>
    <rect x="118" y="8" width="12" height="86" rx="2" fill="#e7c49a" ${ink()}/>
    <rect x="124" y="12" width="5" height="76" fill="#c99366"/>
    <rect x="28" y="52" width="10" height="42" rx="2" fill="#f0d2b0" ${ink()}/>
    <rect x="102" y="52" width="10" height="42" rx="2" fill="#d4a373" ${ink()}/>
    <rect x="108" y="56" width="3" height="32" fill="#c99366"/>
    <rect x="18" y="10" width="104" height="8" rx="1" fill="#f6e0c4" ${ink(2.2)}/>
    <rect x="18" y="20" width="104" height="8" rx="1" fill="#f3d2aa" ${ink(2.2)}/>
    <rect x="18" y="30" width="104" height="8" rx="1" fill="#f3d2aa" ${ink(2.2)}/>
    <rect x="18" y="40" width="104" height="8" rx="1" fill="#e7c49a" ${ink(2.2)}/>
    <rect x="18" y="48" width="104" height="7" rx="1" fill="#f6e0c4" ${ink(2.2)}/>
    <rect x="18" y="57" width="104" height="7" rx="1" fill="#f3d2aa" ${ink(2.2)}/>
    <rect x="18" y="66" width="104" height="7" rx="1" fill="#e7c49a" ${ink(2.2)}/>
    <rect x="108" y="12" width="10" height="5" fill="#d4a373"/>
    <rect x="108" y="22" width="10" height="5" fill="#c99366"/>
    <rect x="108" y="50" width="10" height="4" fill="#d4a373"/>
    <rect x="108" y="68" width="10" height="4" fill="#c99366"/>
    <path d="M10 46 H40 V56 H10 Z" fill="#f6e0c4" ${ink()}/>
    <path d="M100 46 H130 V56 H100 Z" fill="#e7c49a" ${ink()}/>
    <path d="M116 48 H128 V54 H116 Z" fill="#c99366"/>
    ${hi('M22 13 h28')}
    ${hi('M14 48 h16')}
    ${tex('M36 24 h48 M36 34 h44 M34 52 h52 M34 62 h46')}`,
});

const cart = piece({
  kind: 'lemonade-cart', name: 'Lemonade Cart', cat: 'furniture', w: 108, h: 121, vb: '0 0 100 112',
  svg: `${shadow(50, 40, 106)}
    <circle cx="30" cy="96" r="11" fill="${O}" ${ink(2.2)}/><circle cx="30" cy="96" r="4.5" fill="#ffd166"/>
    <circle cx="72" cy="96" r="11" fill="${O}" ${ink(2.2)}/><circle cx="72" cy="96" r="4.5" fill="#ffd166"/>
    <rect x="18" y="92" width="66" height="5" rx="2" fill="#c99366" ${ink(2)}/>
    <rect x="16" y="46" width="68" height="46" rx="3" fill="#fff6ea" ${ink()}/>
    <rect x="66" y="50" width="14" height="38" fill="#f0d2a4"/>
    ${tex('M28 56 v28 M42 56 v28 M56 56 v28')}
    ${hi('M20 52 v16')}
    <rect x="12" y="38" width="76" height="12" rx="2" fill="#ffe08a" ${ink()}/>
    <rect x="66" y="40" width="18" height="8" fill="#f0c45c"/>
    <path d="M14 40 L22 14 H80 L88 40 Z" fill="#ff8fab" ${ink()}/>
    <path d="M34 16 L38 40 H50 L46 15 Z" fill="#fff4f7"/>
    <path d="M58 15 L62 40 H74 L70 15 Z" fill="#fff4f7"/>
    <path d="M72 16 H80 L88 40 H76 Z" fill="#e45d88"/>
    ${hi('M26 20 h18')}
    <path d="M28 52 H44 L42 72 H30 Z" fill="#fff" ${ink(2)}/>
    <path d="M30 58 H42 L41 72 H31 Z" fill="#ffe566"/>
    <path d="M28 54 L22 58 L28 62 Z" fill="#fff" ${ink(2)}/>
    <path d="M44 56 Q52 60 44 70" fill="none" ${ink(2)}/>
    <path d="M56 60 H68 L66 72 H58 Z" fill="#fff" ${ink(2)}/>
    <path d="M58 64 H66 L65 72 H59 Z" fill="#ffe566"/>
    <circle cx="78" cy="64" r="7" fill="#ffe566" ${ink(2)}/>
    <path d="M78 58 v12 M72 64 h12" fill="none" stroke="#e0a83a" stroke-width="1.3"/>`,
});

const lounger = piece({
  kind: 'sun-lounger', name: 'Sun Lounger', cat: 'furniture', w: 168, h: 86, vb: '0 0 170 90',
  svg: `${shadow(86, 68, 84)}
    <path d="M16 66 H28 L32 82 H12 Z" fill="#f3d2aa" ${ink()}/>
    <path d="M126 64 H140 L146 82 H120 Z" fill="#d4a373" ${ink()}/>
    <path d="M136 68 H142 L146 80 H138 Z" fill="#c99366"/>
    <path d="M12 52 H156 V64 H12 Z" fill="#f3d2aa" ${ink()}/>
    <path d="M122 54 H154 V62 H122 Z" fill="#d4a373"/>
    <path d="M28 34 H36 L42 52 H32 Z" fill="#e7c49a" ${ink()}/>
    <path d="M50 44 H150 L154 58 H54 Z" fill="#ffd4e2" ${ink()}/>
    <path d="M128 48 H150 L154 58 H132 Z" fill="#e888a8"/>
    <path d="M18 6 L60 48 L48 58 L8 16 Z" fill="#ffb3c6" ${ink()}/>
    <path d="M38 34 L54 48 L48 56 L30 42 Z" fill="#e45d88"/>
    <ellipse cx="22" cy="14" rx="11" ry="7" fill="#fff" ${ink(2.2)}/>
    <path d="M22 8 H30 A7 7 0 0 1 30 20 H22 Z" fill="#ffd0e0"/>
    ${hi('M22 12 L50 40')}
    ${tex('M26 22 L52 46')}`,
});

const pool = piece({
  kind: 'splash-pool', name: 'Splash Pool', cat: 'furniture', w: 176, h: 96, vb: '0 0 170 96',
  svg: `<defs>${glass('ydpoolW', '#f3fbff', '#7ec8e3')}</defs>
    ${shadow(85, 72, 90)}
    <ellipse cx="85" cy="58" rx="74" ry="28" fill="#8ecae6" ${ink()}/>
    <path d="M22 52 Q40 34 78 40" fill="none" stroke="#ff8fab" stroke-width="16" stroke-linecap="round"/>
    <path d="M100 36 Q138 38 152 58" fill="none" stroke="#ffd166" stroke-width="14" stroke-linecap="round"/>
    <path d="M18 66 C22 82 50 90 85 90 C120 90 152 82 154 66 C148 78 120 84 85 84 C50 84 24 78 18 66 Z" fill="#5aa9c6"/>
    <ellipse cx="85" cy="54" rx="48" ry="16" fill="url(#ydpoolW)" ${ink(2.2)}/>
    ${hi('M36 50 q20 -10 36 0')}
    <circle cx="128" cy="48" r="4" fill="#fff" ${ink(1.6)}/>
    <circle cx="128" cy="48" r="1.6" fill="#8ecae6"/>
    <path d="M70 46 q3 -8 1 0 M96 42 q4 -9 1 1" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`,
});

const gate = piece({
  kind: 'picket-gate', name: 'Picket Gate', cat: 'furniture', w: 110, h: 150, vb: '0 0 100 136',
  svg: `${shadow(50, 38, 130)}
    <rect x="6" y="16" width="12" height="110" rx="2" fill="#f7fff8" ${ink()}/>
    <rect x="82" y="16" width="12" height="110" rx="2" fill="#e7f6ea" ${ink()}/>
    <rect x="88" y="20" width="5" height="100" fill="#c5e0c8"/>
    <rect x="4" y="40" width="16" height="6" rx="1" fill="#c99366" ${ink(2)}/>
    <rect x="4" y="96" width="16" height="6" rx="1" fill="#c99366" ${ink(2)}/>
    <rect x="16" y="38" width="68" height="8" rx="2" fill="#fff" ${ink(2.2)}/>
    <rect x="16" y="86" width="68" height="8" rx="2" fill="#fff" ${ink(2.2)}/>
    <path d="M20 90 L28 98 L80 46 L72 38 Z" fill="#f7fff8" ${ink(2.2)}/>
    <path d="M26 30 L32 14 L38 30 V112 H26 Z" fill="#fff" ${ink(2.2)}/>
    <path d="M44 30 L50 14 L56 30 V112 H44 Z" fill="#f7fff8" ${ink(2.2)}/>
    <path d="M62 30 L68 14 L74 30 V112 H62 Z" fill="#e7f6ea" ${ink(2.2)}/>
    <path d="M68 22 L74 16 L74 108 H68 Z" fill="#c5e0c8"/>
    ${hi('M28 36 v20')}
    <rect x="74" y="60" width="16" height="5" rx="1" fill="#c99366" ${ink(2)}/>
    <circle cx="86" cy="62" r="2.6" fill="#ffd166" ${ink(1.8)}/>`,
});

function gingham(): string {
  let s = '';
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 13; col++) {
      if ((row + col) % 2 === 0) s += `<rect x="${col * 15 - 6}" y="${row * 10}" width="15" height="10" fill="#ff8fab"/>`;
    }
  }
  return s;
}

const blanket = piece({
  kind: 'picnic-blanket', name: 'Picnic Blanket', cat: 'decor', w: 110, h: 36, vb: '0 0 180 59',
  svg: `<defs><clipPath id="ydging"><path d="M22 20 L156 12 L174 44 L36 52 Z"/></clipPath></defs>
    ${shadow(96, 74, 54)}
    <path d="M22 20 L156 12 L174 44 L36 52 Z" fill="#fff0f5" ${ink()}/>
    <g clip-path="url(#ydging)">${gingham()}</g>
    <path d="M148 14 L170 42 L160 46 L138 18 Z" fill="#e45d88"/>
    <path d="M96 30 L128 26 L134 42 L100 46 Z" fill="#f3d2aa" ${ink(2)}/>
    <path d="M120 28 L128 26 L134 42 L126 43 Z" fill="#c99366"/>
    <path d="M104 30 Q114 14 126 28" fill="none" ${ink(2.2)}/>
    ${tex('M104 34 h22 M104 38 h24', 1)}
    ${hi('M34 26 l28 -3')}`,
});

function tulip(x: number, top: number, color: string, side: string): string {
  return `<path d="M${x - 1.5} ${top + 16} H${x + 1.5} V${top + 40} H${x - 1.5} Z" fill="#3d9a68"/>
    <path d="M${x} ${top + 24} C${x - 16} ${top + 18} ${x - 14} ${top + 36} ${x - 1} ${top + 34}" fill="#74c69d" ${ink(1.6)}/>
    <path d="M${x} ${top + 22} C${x + 16} ${top + 16} ${x + 12} ${top + 36} ${x + 1} ${top + 32}" fill="#52b788"/>
    <path d="M${x} ${top + 18} C${x - 10} ${top + 8} ${x - 8} ${top} ${x} ${top + 6} C${x + 8} ${top} ${x + 10} ${top + 8} ${x} ${top + 18} Z" fill="${color}" ${ink(1.8)}/>
    <path d="M${x + 1} ${top + 6} C${x + 7} ${top + 4} ${x + 8} ${top + 13} ${x + 1} ${top + 15} Z" fill="${side}"/>`;
}

const tulips = piece({
  kind: 'tulip-bed', name: 'Tulip Bed', cat: 'decor', w: 140, h: 90, vb: '0 0 140 90',
  svg: `${shadow(70, 56, 86)}
    <path d="M10 56 H130 L120 82 H20 Z" fill="#f0d2b0" ${ink()}/>
    <path d="M96 58 H126 L118 78 H92 Z" fill="#d4a373"/>
    <path d="M16 56 Q70 42 124 56 Q70 64 16 56 Z" fill="#c4a484" ${ink(2.2)}/>
    ${hi('M22 60 h24')}
    ${tulip(32, 16, '#ff8fab', '#e45d88')}
    ${tulip(54, 8, '#ffd166', '#e0a83a')}
    ${tulip(76, 4, '#ff7096', '#e04578')}
    ${tulip(98, 12, '#fff', '#ffd0e0')}
    ${tulip(118, 18, '#c9a0dc', '#b388d6')}`,
});

const bath = piece({
  kind: 'birdbath', name: 'Birdbath', cat: 'decor', w: 84, h: 126, vb: '0 0 80 120',
  svg: `<defs>${glass('ydbathW', '#f3fbff', '#8ecae6')}</defs>
    ${shadow(40, 28, 114)}
    <ellipse cx="40" cy="106" rx="20" ry="7" fill="#e7eef2" ${ink()}/>
    <path d="M30 46 H50 C56 70 58 86 52 104 H28 C22 86 24 70 30 46 Z" fill="#f4f7f8" ${ink()}/>
    <path d="M42 52 H50 C54 72 54 88 50 100 H44 Z" fill="#c5d0d6"/>
    ${hi('M33 62 v22')}
    <ellipse cx="40" cy="40" rx="32" ry="13" fill="#f7fafb" ${ink()}/>
    <path d="M40 28 C66 28 72 38 72 42 C72 52 58 54 40 54 C60 54 68 48 68 42 C68 36 58 32 40 34 Z" fill="#d5dee4"/>
    <ellipse cx="40" cy="38" rx="22" ry="7" fill="url(#ydbathW)" ${ink(2.2)}/>
    ${hi('M22 36 q10 -4 18 0')}
    <path d="M48 30 L40 24 L42 34 Z" fill="#f0c45c" ${ink(1.6)}/>
    <ellipse cx="56" cy="28" rx="11" ry="6" fill="#ffd166" ${ink(1.8)}/>
    <circle cx="66" cy="24" r="4.5" fill="#ffe08a" ${ink(1.6)}/>
    <path d="M70 24 L77 26 L70 28 Z" fill="#e07a3f"/>
    <circle cx="67" cy="23" r="1" fill="${O}"/>
    <path d="M54 32 V40 M60 32 V40" fill="none" stroke="#c99366" stroke-width="1.4" stroke-linecap="round"/>`,
});

const pond = piece({
  kind: 'lily-pond', name: 'Lily Pond', cat: 'decor', w: 170, h: 90, vb: '0 0 170 90',
  svg: `<defs>${glass('ydpondW', '#eaf6ff', '#5aa9e6')}</defs>
    ${shadow(85, 70, 84)}
    <ellipse cx="85" cy="54" rx="74" ry="28" fill="#c4a484" ${ink()}/>
    <path d="M85 30 C142 32 158 48 158 56 C158 72 126 82 85 82 C124 80 150 68 150 56 C150 44 126 36 85 36 Z" fill="#a88462"/>
    <ellipse cx="85" cy="52" rx="62" ry="20" fill="url(#ydpondW)" ${ink(2.2)}/>
    ${hi('M40 46 q24 -8 42 2')}
    <path fill="#95d5b2" ${ink(2)} fill-rule="evenodd" d="M58 54 m-16 0 a16 7 0 1 0 32 0 a16 7 0 1 0 -32 0 M58 50 L72 54 L58 58 Z"/>
    <path d="M66 50 L74 54 L66 56 Z" fill="#3d9a68"/>
    <path fill="#74c69d" ${ink(2)} fill-rule="evenodd" d="M112 48 m-18 0 a18 8 0 1 0 36 0 a18 8 0 1 0 -36 0 M112 42 L128 48 L112 54 Z"/>
    <path d="M40 58 q-4 -16 2 -22 q6 8 2 16" fill="#52b788" ${ink(1.6)}/>
    <path d="M108 40 l2 -8 l4 6 l4 -7 l2 8 l-4 3 z" fill="#ff8fab" ${ink(1.6)}/>
    <path d="M112 36 l3 -6 l2 5 l3 -5 l1 6 z" fill="#fff" ${ink(1.4)}/>
    <circle cx="112" cy="40" r="2.4" fill="#ffd166"/>`,
});

function bulb(x: number, y: number, color: string, side: string, r = 10): string {
  return `<path d="M${x} ${y - r - 8} V${y - r}" fill="none" ${ink(2.2)}/>
    <rect x="${x - 4}" y="${y - r - 2}" width="8" height="5" rx="1" fill="#c99366" ${ink(1.8)}/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${color}" ${ink()}/>
    <path d="M${x + 1} ${y - r + 3} H${x + r - 1} V${y + r - 3} H${x + 2} Z" fill="${side}"/>
    ${hi(`M${x - r + 3} ${y - 2} q2 -3 4 0`)}`;
}

const lights = piece({
  kind: 'patio-lights', name: 'Patio Lights', cat: 'decor', w: 190, h: 70, vb: '0 0 180 70', wall: true,
  svg: `<path d="M8 12 Q50 32 90 12 Q130 32 172 14" fill="none" ${ink()}/>
    ${bulb(28, 40, '#fff6c8', '#f0c45c')}
    ${bulb(64, 46, '#ffc2d4', '#e45d88')}
    ${bulb(100, 36, '#fff1c2', '#f0c45c')}
    ${bulb(136, 46, '#c9f1ff', '#7eb4dc')}
    ${bulb(164, 34, '#ffd0e8', '#e888a8', 8)}`,
});

const toad = piece({
  kind: 'toadstool-light', name: 'Toadstool Light', cat: 'decor', w: 70, h: 84, vb: '0 0 80 96',
  svg: `<defs>${rad('ydtoadG', '#ffe7a0', '.9')}</defs>
    ${shadow(40, 26, 90)}
    <ellipse cx="40" cy="70" rx="18" ry="8" fill="url(#ydtoadG)"/>
    <path d="M32 58 H48 L52 84 H28 Z" fill="#fff7f8" ${ink()}/>
    <path d="M42 60 H48 L50 82 H43 Z" fill="#f0d8cc"/>
    <path d="M6 58 Q40 8 74 58 Q40 74 6 58 Z" fill="#ff8fab" ${ink()}/>
    <path d="M44 22 Q66 16 72 54 Q52 66 44 52 Z" fill="#e45d88"/>
    ${hi('M18 48 q16 -12 26 -2')}
    <circle cx="26" cy="48" r="5" fill="#fff" ${ink(2)}/>
    <circle cx="44" cy="40" r="6" fill="#fff" ${ink(2)}/>
    <circle cx="36" cy="56" r="3.5" fill="#fff" ${ink(2)}/>
    <path d="M22 52 h6 M40 46 h8" fill="none" stroke="#ffd0e0" stroke-width="1.2" stroke-linecap="round"/>`,
});

const stones = piece({
  kind: 'stepping-stones', name: 'Stepping Stones', cat: 'decor', w: 160, h: 64, vb: '0 0 160 70',
  svg: `${shadow(80, 66, 64)}
    <path d="M8 40 L24 28 L50 32 L54 50 L30 58 L10 52 Z" fill="#f7f4ef" ${ink()}/>
    <path d="M34 36 L50 32 L54 50 L36 54 Z" fill="#d9d3cc"/>
    <path d="M56 44 L78 32 L108 36 L112 56 L80 64 L58 58 Z" fill="#f4f1ec" ${ink()}/>
    <path d="M86 40 L108 36 L112 56 L90 58 Z" fill="#d4cdc4"/>
    <path d="M110 30 L128 20 L154 28 L150 48 L124 52 L108 42 Z" fill="#e7e2dc" ${ink()}/>
    <path d="M132 26 L152 28 L148 46 L130 44 Z" fill="#d0c9c2"/>
    ${hi('M16 38 q8 -4 14 0')}
    ${tex('M22 44 h12 M72 48 h16 M124 36 h12')}`,
});

const pinwheel = piece({
  kind: 'pinwheel', name: 'Pinwheel', cat: 'decor', w: 56, h: 90, vb: '0 0 70 100', holdable: true,
  svg: `${shadow(35, 16, 96)}
    <rect x="31" y="44" width="6" height="50" rx="2" fill="#c99366" ${ink()}/>
    <rect x="34" y="48" width="3" height="42" fill="#c99366"/>
    <path d="M34 40 L34 8 Q54 16 48 36 Z" fill="#ff8fab" ${ink(2.2)}/>
    <path d="M42 18 Q50 28 36 34 Z" fill="#e45d88"/>
    <path d="M34 40 L62 32 Q58 54 40 50 Z" fill="#ffd166" ${ink(2.2)}/>
    <path d="M54 38 Q58 48 42 46 Z" fill="#e0a83a"/>
    <path d="M34 40 L34 72 Q14 64 20 44 Z" fill="#8ecae6" ${ink(2.2)}/>
    <path d="M26 58 Q16 50 32 46 Z" fill="#5aa9d6"/>
    <path d="M34 40 L6 48 Q12 26 28 30 Z" fill="#c9a0dc" ${ink(2.2)}/>
    <path d="M16 36 Q14 28 28 34 Z" fill="#b388d6"/>
    <circle cx="34" cy="40" r="5" fill="#fff" ${ink(2.2)}/>
    <circle cx="34" cy="40" r="1.8" fill="${O}"/>`,
});

const barrel = piece({
  kind: 'rain-barrel', name: 'Rain Barrel', cat: 'decor', w: 86, h: 108, vb: '0 0 80 110',
  svg: `${shadow(40, 30, 104)}
    <path d="M22 30 C12 48 12 78 22 98 H58 C68 78 68 48 58 30 Z" fill="#8ecae6" ${ink()}/>
    <path d="M46 34 C58 48 60 76 54 96 H58 C66 76 66 50 56 32 Z" fill="#5aa9c6"/>
    ${tex('M28 40 v48 M36 36 v54 M44 38 v50')}
    ${hi('M24 42 v24')}
    <ellipse cx="40" cy="30" rx="20" ry="8" fill="#bde0fe" ${ink()}/>
    <ellipse cx="46" cy="30" rx="10" ry="5" fill="#7eb4dc"/>
    <path d="M16 48 H64" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <path d="M14 74 H66" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <rect x="56" y="78" width="14" height="7" rx="2" fill="#d7ecff" ${ink(2)}/>
    <path d="M70 81 h6" fill="none" ${ink(2)}/>
    <path d="M34 18 q6 -8 12 0" fill="none" stroke="#7eb4dc" stroke-width="2.2" stroke-linecap="round"/>`,
});

const bush = piece({
  kind: 'butterfly-bush', name: 'Butterfly Bush', cat: 'plants', w: 120, h: 130, vb: '0 0 100 120',
  svg: `${shadow(50, 36, 114)}
    <path d="M48 108 C46 88 40 78 34 70" fill="none" stroke="#3d9a68" stroke-width="4" stroke-linecap="round"/>
    <path d="M50 108 C52 86 62 76 70 66" fill="none" stroke="#3d9a68" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="34" cy="68" rx="18" ry="16" fill="#95d5b2" ${ink(2.2)}/>
    <ellipse cx="68" cy="66" rx="20" ry="18" fill="#3d9a68" ${ink(2.2)}/>
    <ellipse cx="50" cy="58" rx="26" ry="22" fill="#74c69d" ${ink()}/>
    ${hi('M30 50 q12 -6 18 2')}
    <path d="M30 62 C28 40 34 28 36 48 C38 30 46 32 42 58 Z" fill="#c9a0dc" ${ink(1.8)}/>
    <path d="M48 56 C46 32 54 18 56 40 C60 22 68 28 62 54 Z" fill="#b388d6" ${ink(1.8)}/>
    <path d="M66 60 C66 40 74 30 74 48 C78 34 84 40 78 60 Z" fill="#a78bfa" ${ink(1.8)}/>
    <path d="M22 36 C8 22 6 34 16 40 C6 42 10 54 22 46 C20 54 32 52 28 42 C34 36 30 28 22 36 Z" fill="#ff8fab" ${ink(1.8)}/>
    <path d="M22 36 C10 28 14 40 20 40 Z" fill="#e45d88"/>
    <path d="M24 40 C12 46 16 54 24 48 Z" fill="#ffd166" ${ink(1.6)}/>
    <ellipse cx="24" cy="40" rx="2.2" ry="6" fill="${O}"/>
    <path d="M22 34 Q16 26 14 22 M26 34 Q30 26 34 22" fill="none" stroke="${O}" stroke-width="1.3" stroke-linecap="round"/>
    <circle cx="13" cy="21" r="1.2" fill="${O}"/><circle cx="35" cy="21" r="1.2" fill="${O}"/>`,
});

const hedge = piece({
  kind: 'hedge-row', name: 'Hedge Row', cat: 'plants', w: 190, h: 96, vb: '0 0 180 96',
  svg: `${shadow(90, 78, 90)}
    <rect x="6" y="36" width="52" height="46" rx="14" fill="#74c69d" ${ink()}/>
    <rect x="40" y="42" width="14" height="34" rx="6" fill="#3d9a68"/>
    <rect x="62" y="26" width="56" height="56" rx="16" fill="#95d5b2" ${ink()}/>
    <rect x="98" y="32" width="16" height="44" rx="6" fill="#52b788"/>
    <rect x="122" y="34" width="52" height="48" rx="14" fill="#74c69d" ${ink()}/>
    <rect x="156" y="40" width="14" height="36" rx="6" fill="#3d9a68"/>
    ${tex('M18 52 q4 6 0 12 M78 44 q4 8 0 14 M140 50 q4 6 0 12')}
    ${hi('M14 46 q12 -6 20 2')}
    ${hi('M70 36 q14 -6 22 2')}`,
});

const cup = piece({
  kind: 'lemonade-cup', name: 'Lemonade Cup', cat: 'food', w: 52, h: 70, vb: '0 0 70 90', holdable: true,
  svg: `${shadow(35, 22, 84)}
    <path d="M18 32 H52 L46 76 H24 Z" fill="#fff" ${ink()}/>
    <path d="M40 34 H50 L46 74 H40 Z" fill="#f0e6d8"/>
    <path d="M20 44 H50 L46 76 H24 Z" fill="#ffe566"/>
    <path d="M40 46 H48 L46 74 H40 Z" fill="#f0c45c"/>
    <ellipse cx="35" cy="44" rx="15" ry="6" fill="#fff3a0" ${ink(2)}/>
    <ellipse cx="35" cy="32" rx="17" ry="7" fill="#fff" ${ink()}/>
    <path d="M40 42 L48 16 H58" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="20" cy="30" r="8" fill="#ffe566" ${ink(1.8)}/>
    <path d="M20 23 v14 M14 30 h12" fill="none" stroke="#fff" stroke-width="1.4"/>
    <path d="M16 26 q4 4 8 0 M16 34 q4 -4 8 0" fill="none" stroke="#e0a83a" stroke-width="1.2"/>
    ${hi('M24 38 v14')}`,
});

export const YARD_ITEMS: ItemDef[] = [
  swing, sandbox, slide, bench, cart, lounger, pool, gate,
  blanket, tulips, bath, pond, lights, toad, stones, pinwheel, barrel,
  bush, hedge, cup,
];

export function registerYardItems(items: ItemDef[], map: Record<string, ItemDef>) {
  for (const it of YARD_ITEMS) {
    if (map[it.kind]) continue;
    items.push(it);
    map[it.kind] = it;
  }
}

function cloud(cx: number, cy: number, s: number): string {
  return `<g>
    <ellipse cx="${cx - 22 * s}" cy="${cy}" rx="${26 * s}" ry="${14 * s}" fill="#fff"/>
    <ellipse cx="${cx + 18 * s}" cy="${cy - 2 * s}" rx="${30 * s}" ry="${16 * s}" fill="#fff"/>
    <ellipse cx="${cx}" cy="${cy + 4 * s}" rx="${34 * s}" ry="${13 * s}" fill="#fff"/>
  </g>`;
}

function pickets(x0: number, x1: number, top: number, bot: number, step: number): string {
  const pw = 12;
  const rail = (y: number) => `<rect x="${x0 - 2}" y="${y}" width="${x1 - x0 + pw + 4}" height="8" rx="3" fill="#fff" ${ink(2.2)}/><rect x="${(x1 - 40).toFixed(1)}" y="${y + 1}" width="30" height="6" rx="2" fill="#d5ead8"/>`;
  let s = rail(top + 26) + rail(bot - 28);
  for (let x = x0; x <= x1; x += step) {
    s += `<path d="M${x} ${top + 12} L${x + pw / 2} ${top} L${x + pw} ${top + 12} V${bot} H${x} Z" fill="#f7fff8" ${ink(2.2)}/>`;
    s += `<path d="M${(x + pw * 0.58).toFixed(1)} ${top + 10} H${x + pw - 1} V${bot - 4} H${(x + pw * 0.58).toFixed(1)} Z" fill="#d5ead8"/>`;
    s += `<path d="M${x + 2} ${top + 18} v22" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".75" fill="none"/>`;
  }
  return s;
}

function tree(x: number, scale: number): string {
  const y = 150;
  const trunkTop = y + 46 * scale;
  const trunkH = 372 - trunkTop;
  return `<g>
    <rect x="${x - 14 * scale}" y="${trunkTop}" width="${28 * scale}" height="${trunkH}" rx="${6 * scale}" fill="#e7b98a" ${ink()}/>
    <rect x="${x + 4 * scale}" y="${trunkTop + 8 * scale}" width="${8 * scale}" height="${trunkH - 16 * scale}" fill="#c99366"/>
    ${tex(`M${x - 4 * scale} ${trunkTop + 28 * scale} v${36 * scale}`)}
    ${hi(`M${x - 8 * scale} ${trunkTop + 16 * scale} v${22 * scale}`)}
    <ellipse cx="${x - 34 * scale}" cy="${y + 16 * scale}" rx="${42 * scale}" ry="${34 * scale}" fill="#95d5b2" ${ink(2.2)}/>
    <ellipse cx="${x}" cy="${y}" rx="${68 * scale}" ry="${50 * scale}" fill="#74c69d" ${ink()}/>
    <ellipse cx="${x + 40 * scale}" cy="${y + 8 * scale}" rx="${40 * scale}" ry="${36 * scale}" fill="#3d9a68" ${ink(2.2)}/>
    ${hi(`M${x - 36 * scale} ${y - 18 * scale} q${16 * scale} -8 ${28 * scale} 2`)}
  </g>`;
}

function bloom(x: number, y: number, color: string, r = 6): string {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" ${ink(1.8)}/><circle cx="${x + r * 0.35}" cy="${y + r * 0.15}" r="${r * 0.28}" fill="${color === '#fff' ? '#f0d0dc' : '#e888a8'}" opacity=".9"/>`;
}

/** Full-world outdoor paint. The stage camera crops it to the same window as every other room. */
export function yardBackyardScenery(): string {
  return `<svg class="yardWorld" viewBox="0 0 2400 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ydsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6eb6e8"/>
        <stop offset=".48" stop-color="#c5e6fb"/>
        <stop offset="1" stop-color="#fff3df"/>
      </linearGradient>
      ${rad('ydsun', '#ffe566', '.55')}
    </defs>
    <rect width="2400" height="430" fill="url(#ydsky)"/>
    <circle id="ydSunGlow" cx="1180" cy="68" r="62" fill="url(#ydsun)"/>
    <circle id="ydSun" cx="1180" cy="68" r="30" fill="#ffe566"/>
    <circle cx="1170" cy="58" r="8" fill="#fff" opacity=".8"/>
    ${cloud(980, 96, 1.05)}${cloud(1320, 78, 0.85)}${cloud(1500, 120, 0.7)}
    <rect y="360" width="2400" height="240" fill="#c6ef9a"/>
    <rect y="360" width="2400" height="28" fill="#e7f8c8"/>
    <rect y="520" width="2400" height="80" fill="#9ed67a"/>
    <path d="M1040 470 q30 -12 16 -6 M1200 510 q28 -12 14 -4 M1360 548 q24 -10 12 -4" fill="none" stroke="#3d9a68" stroke-width="1.2" stroke-linecap="round" opacity=".22"/>
    ${pickets(846, 2118, 258, 372, 24)}
    ${tree(1264, 0.8)}
    <path d="M840 120 H1076 L1054 152 H862 Z" fill="#ffb3c6" ${ink()}/>
    <path d="M960 126 H1064 L1046 148 H976 Z" fill="#e45d88"/>
    ${hi('M876 132 h56')}
    <rect x="864" y="150" width="196" height="222" rx="4" fill="#fff6ea" ${ink()}/>
    <rect x="1044" y="156" width="12" height="210" fill="#f0dcc4"/>
    ${tex('M880 174 H1000 M880 202 H1000 M880 230 H990 M880 294 H1000 M880 334 H980')}
    <rect x="884" y="180" width="44" height="36" rx="4" fill="#c9ecff" ${ink(2.2)}/>
    <rect x="912" y="184" width="12" height="28" fill="#8ecae6"/>
    <path d="M906 180 V216 M884 198 H928" fill="none" ${ink(2.2)}/>
    ${hi('M890 188 h12')}
  </svg>`;
}

function doorBox(x: number, y: number, w: number, h: number): string {
  const left = (x - w / 2) / 2400 * 100;
  const top = (y - h) / 600 * 100;
  return `left:${left.toFixed(3)}%;top:${top.toFixed(3)}%;width:${(w / 2400 * 100).toFixed(3)}%;height:${(h / 600 * 100).toFixed(3)}%`;
}

/** Straight-on panel door. The same drawing is the living-room door and the yard door. */
function panelDoor(): string {
  return `<svg class="doorArt" viewBox="0 0 100 230">
    <rect x="4" y="2" width="92" height="226" rx="3" fill="#f3d2aa" ${ink()}/>
    <rect x="76" y="6" width="16" height="218" fill="#d4a373"/>
    <rect x="14" y="12" width="72" height="206" rx="2" fill="#f6e9ff" ${ink(2.2)}/>
    <rect x="70" y="16" width="12" height="198" fill="#d4b4e6"/>
    <rect x="24" y="22" width="52" height="42" rx="3" fill="#c9ecff" ${ink(2.2)}/>
    <rect x="60" y="26" width="12" height="34" fill="#8ecae6"/>
    <path d="M50 22 V64 M24 43 H76" fill="none" ${ink(2.2)}/>
    ${hi('M28 28 h18')}
    <rect x="24" y="76" width="52" height="56" rx="3" fill="#f7ecff" ${ink(2.2)}/>
    <rect x="62" y="80" width="10" height="48" fill="#e0c8f0"/>
    ${hi('M28 84 v22')}
    <rect x="24" y="144" width="52" height="56" rx="3" fill="#f7ecff" ${ink(2.2)}/>
    <rect x="62" y="148" width="10" height="48" fill="#e0c8f0"/>
    <circle cx="64" cy="126" r="4.2" fill="#ffd166" ${ink(2.2)}/>
    <rect x="10" y="214" width="80" height="10" rx="2" fill="#e7c49a" ${ink(2.2)}/>
  </svg>`;
}

/** Both doors use the panel drawing. The yard copy sits in the house wall. */
export function yardDoorMarkup(where: 'living' | 'yard'): string {
  const box = where === 'living' ? LIVE_DOOR : YARD_DOOR;
  const go = where === 'living' ? 'backyard' : 'living';
  const label = where === 'living' ? 'Backyard' : 'Back inside';
  return `<button type="button" class="yardDoor" data-yard-go="${go}" aria-label="${label}" style="${doorBox(box.x, box.y, box.w, box.h)}">${panelDoor()}<span class="yardHintLabel"><span>${label}</span></span></button>`;
}

function sheetCard(name: string, art: string): string {
  const safe = name.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!));
  return `<figure class="ysCard"><div class="ysArt">${art}</div><figcaption>${safe}</figcaption></figure>`;
}

export function yardSheetHTML(): string {
  const cards = YARD_ITEMS.map(d => sheetCard(d.name, svgOf(d))).join('');
  return `<div class="yardSheet" data-yard-sheet="1"><h1>Backyard pieces</h1><div class="ysGrid">${cards}</div></div>`;
}

/** House pieces copied from the approved sample so the comparison is the real sofa, lamp, and plant. */
function houseCard(name: string, body: string): string {
  return sheetCard(name, `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${body}</svg>`);
}
export function yardCompareHTML(): string {
  const sampleShadow = (cx: number, rx: number) => shadow(cx, rx, 96.4);
  const sofa = `
    ${sampleShadow(50, 40)}
    <path d="M18 58 V30 Q18 18 32 18 H68 Q82 18 82 30 V58 Z" fill="#ffb7cc" ${ink()}/>
    <path d="M56 24 H76 Q80 24 80 32 V52 H56 Z" fill="#e888a8"/>
    <circle cx="34" cy="38" r="3.4" fill="#ff8fab" ${ink(2)}/><circle cx="33" cy="37" r="1.1" fill="#fff"/>
    <circle cx="50" cy="36" r="3.4" fill="#ff8fab" ${ink(2)}/><circle cx="49" cy="35" r="1.1" fill="#fff"/>
    <circle cx="66" cy="38" r="3.4" fill="#e45d88" ${ink(2)}/><circle cx="65" cy="37" r="1.1" fill="#fff"/>
    <rect x="4" y="44" width="20" height="38" rx="10" fill="#ff7096" ${ink()}/>
    <ellipse cx="14" cy="44" rx="12" ry="9" fill="#ff9ab6" ${ink()}/>
    <ellipse cx="9" cy="41" rx="4" ry="2.4" fill="#fff" opacity=".7"/>
    <rect x="76" y="44" width="20" height="38" rx="10" fill="#e04878" ${ink()}/>
    <ellipse cx="86" cy="44" rx="12" ry="9" fill="#e45d88" ${ink()}/>
    <rect x="20" y="64" width="60" height="16" rx="6" fill="#ff8fab" ${ink()}/>
    <rect x="22" y="56" width="28" height="22" rx="7" fill="#ffe0ea" ${ink(2.4)}/>
    <rect x="50" y="56" width="28" height="22" rx="7" fill="#ffc2d4" ${ink(2.4)}/>
    <rect x="66" y="58" width="10" height="18" rx="4" fill="#e888a8"/>
    <path d="M26 60 h20 M54 60 h16 M26 74 h20 M54 74 h16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M50 58 v18" fill="none" stroke="#e45d88" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="26" y="46" width="20" height="16" rx="5" fill="#fff" ${ink(2.2)}/>
    <path d="M33 52 c-2.2 -3.2 -6.4 -.4 -3.4 2.6 c1 1.2 3.4 2.6 3.4 2.6 c0 0 2.4 -1.4 3.4 -2.6 c3 -3 -1.2 -5.8 -3.4 -2.6 z" fill="#ff8fab"/>
    <path d="M41 56 c-1.4 -2 -4.2 0 -2.2 1.8 c.7 .8 2.2 1.6 2.2 1.6 c0 0 1.5 -.8 2.2 -1.6 c2 -1.8 -.8 -3.8 -2.2 -1.8 z" fill="#7eb4dc"/>
    <rect x="16" y="84" width="7" height="10" rx="2" fill="${O}"/>
    <rect x="77" y="84" width="7" height="10" rx="2" fill="${O}"/>`;
  const lamp = `
    <defs>${rad('a2lamp-glow', '#ffd56a', '.95')}</defs>
    ${sampleShadow(50, 22)}
    <path d="M34 8 L42 8 L37 40 L24 40 Z" fill="#fff6d4"/>
    <path d="M42 8 L50 8 L50 40 L37 40 Z" fill="#ffe08a"/>
    <path d="M50 8 L58 8 L63 40 L50 40 Z" fill="#f0c45c"/>
    <path d="M58 8 L66 8 L76 40 L63 40 Z" fill="#e0a83a"/>
    <path d="M24 40 L34 8 H66 L76 40 Z" fill="none" ${ink()}/>
    <path d="M42 8 L37 40 M50 8 V40 M58 8 L63 40" fill="none" stroke="${O}" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="50" cy="36" rx="20" ry="10" fill="url(#a2lamp-glow)"/>
    <rect x="46" y="40" width="8" height="42" rx="3" fill="#e4ccf2" ${ink()}/>
    <rect x="50" y="44" width="4" height="34" rx="2" fill="#c49ad4"/>
    <ellipse cx="50" cy="88" rx="20" ry="6" fill="#d4b4e6" ${ink()}/>
    <ellipse cx="60" cy="90" rx="8" ry="3" fill="#b888c8"/>
    <ellipse cx="42" cy="86" rx="6" ry="2" fill="#fff" opacity=".55"/>`;
  const plant = `
    ${sampleShadow(50, 30)}
    <ellipse cx="30" cy="40" rx="14" ry="22" fill="#b7ebc8" ${ink()} transform="rotate(-30 30 40)"/>
    <path d="M34 28 C30 40 32 52 44 58" fill="#52b078"/>
    <ellipse cx="72" cy="42" rx="13" ry="20" fill="#3d9a68" ${ink()} transform="rotate(26 72 42)"/>
    <path d="M50 66 C40 44 42 18 50 6 C58 18 60 44 50 66 Z" fill="#d8f6e4" ${ink()}/>
    <path d="M54 18 C60 32 58 48 50 58 C56 44 58 28 54 18 Z" fill="#52b078"/>
    <path d="M50 14 V52" fill="none" stroke="#2f7a52" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
    <path d="M40 60 C34 50 24 48 22 38 C32 44 38 54 42 64 Z" fill="#74c69d" ${ink(2.2)}/>
    <path d="M28 64 H74 L68 94 H34 Z" fill="#e8845a" ${ink()}/>
    <path d="M58 66 H72 L68 92 H60 Z" fill="#c45c38"/>
    <rect x="22" y="58" width="58" height="10" rx="4" fill="#f0a078" ${ink()}/>
    <rect x="56" y="60" width="20" height="6" rx="3" fill="#d47848"/>
    <ellipse cx="50" cy="65" rx="20" ry="3" fill="#a86a42" opacity=".4"/>
    <path d="M28 62 h14" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>`;
  const byKind = Object.fromEntries(YARD_ITEMS.map(d => [d.kind, d]));
  const row = (house: string, houseArt: string, kind: string) =>
    houseCard(house, houseArt) + sheetCard(byKind[kind].name, svgOf(byKind[kind]));
  const rows = row('Sofa', sofa, 'yard-swing') + row('Lamp', lamp, 'lemonade-cart') + row('Plant', plant, 'birdbath');
  return `<div class="yardSheet yardCompare" data-yard-compare="1"><h1>House style and the yard</h1><p class="ysNote">Sofa, lamp, and plant are the approved refresh. Swing, cart, and birdbath use the same light.</p><div class="ysPair">${rows}</div></div>`;
}
