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
  svg: `${shadow(50, 36, 148)}
    <path d="M26 28 L40 28 L34 146 H16 Z" fill="#f3d2aa" ${ink()}/>
    <path d="M32 40 L38 28 L34 140 H28 Z" fill="#d4a373"/>
    <path d="M60 28 H74 L86 146 H68 Z" fill="#e7c49a" ${ink()}/>
    <path d="M68 32 H74 L84 140 H76 Z" fill="#c99366"/>
    ${tex('M22 80 l6 28 M72 78 l8 30')}
    ${hi('M28 40 l4 -8')}
    <rect x="18" y="16" width="64" height="16" rx="4" fill="#f6e0c4" ${ink()}/>
    <rect x="62" y="19" width="16" height="10" rx="3" fill="#d4a373"/>
    ${hi('M24 20 h28')}
    <path d="M38 32 V98 M62 32 V98" fill="none" ${ink(2.2)}/>
    <rect x="28" y="94" width="44" height="14" rx="5" fill="#ffb3c6" ${ink()}/>
    <rect x="54" y="97" width="14" height="8" rx="3" fill="#e45d88"/>
    ${tex('M34 100 h30')}
    ${hi('M32 98 h16')}`,
});

const sandbox = piece({
  kind: 'sandbox', name: 'Sandbox', cat: 'furniture', w: 120, h: 54, vb: '0 0 160 72',
  svg: `${shadow(80, 62, 68)}
    <rect x="14" y="26" width="132" height="38" rx="6" fill="#f3d2aa" ${ink()}/>
    <rect x="112" y="30" width="30" height="30" rx="4" fill="#d4a373"/>
    <rect x="14" y="52" width="132" height="12" fill="#c99366"/>
    ${hi('M22 32 h40')}
    <rect x="24" y="32" width="112" height="22" rx="4" fill="#ffe7a8" ${ink(2.2)}/>
    <rect x="108" y="34" width="24" height="16" rx="3" fill="#f0c36a"/>
    ${tex('M40 40 q6 3 4 7 M64 38 q8 3 5 8 M88 40 q6 3 5 6')}
    <rect x="34" y="16" width="16" height="16" rx="3" fill="#ff8fab" ${ink(2.2)}/>
    <rect x="42" y="18" width="6" height="12" fill="#e45d88"/>
    ${hi('M36 20 h6')}
    <path d="M108 22 h22 l-2 8 h-16 z" fill="#a2d2ff" ${ink(2.2)}/>
    <path d="M120 20 l10 -6" fill="none" ${ink(2.2)}/>`,
});

const slide = piece({
  kind: 'little-slide', name: 'Little Slide', cat: 'furniture', w: 150, h: 188, vb: '0 0 110 140',
  svg: `${shadow(58, 44, 134)}
    <rect x="16" y="28" width="8" height="100" rx="4" fill="#f3d2aa" ${ink()}/>
    <rect x="20" y="32" width="3" height="92" rx="1.5" fill="#d4a373"/>
    <rect x="40" y="28" width="8" height="78" rx="4" fill="#d4a373" ${ink()}/>
    <path d="M16 48 H48 M16 66 H48 M16 84 H48" fill="none" ${ink(2.2)}/>
    <rect x="12" y="22" width="40" height="14" rx="5" fill="#bde0fe" ${ink()}/>
    <rect x="36" y="25" width="12" height="8" rx="3" fill="#7eb4dc"/>
    ${hi('M18 26 h18')}
    <path d="M48 30 H78 C96 30 102 48 100 70 L92 118 H68 L74 72 C76 50 70 42 52 42 Z" fill="#ffb3c6" ${ink()}/>
    <path d="M78 36 C92 40 98 56 96 74 L90 112 H80 L84 74 C86 56 82 46 74 44 Z" fill="#e45d88"/>
    ${hi('M60 40 q14 4 18 22')}
    ${tex('M82 58 q6 14 4 30')}`,
});

const bench = piece({
  kind: 'yard-bench', name: 'Garden Bench', cat: 'furniture', w: 140, h: 100, vb: '0 0 140 100',
  svg: `${shadow(70, 56, 96)}
    <path d="M18 28 H122 L116 56 H24 Z" fill="#f6e0c4" ${ink()}/>
    <path d="M86 32 H118 L114 52 H84 Z" fill="#d4a373"/>
    ${tex('M32 36 v14 M50 34 v16 M68 36 v14 M104 36 v12')}
    ${hi('M28 32 h36')}
    <rect x="16" y="52" width="108" height="16" rx="6" fill="#f3d2aa" ${ink()}/>
    <rect x="78" y="55" width="42" height="10" rx="4" fill="#d4a373"/>
    ${hi('M24 56 h32')}
    <rect x="22" y="66" width="10" height="26" rx="4" fill="#f0d2b0" ${ink()}/>
    <rect x="28" y="70" width="3" height="18" fill="#d4a373"/>
    <rect x="108" y="66" width="10" height="26" rx="4" fill="#d4a373" ${ink()}/>
    <path d="M14 24 h12 M114 24 h12" fill="none" ${ink(2.2)}/>`,
});

const cart = piece({
  kind: 'lemonade-cart', name: 'Lemonade Cart', cat: 'furniture', w: 108, h: 121, vb: '0 0 100 112',
  svg: `${shadow(50, 38, 106)}
    <rect x="18" y="46" width="64" height="44" rx="4" fill="#fff6ea" ${ink()}/>
    <rect x="64" y="50" width="14" height="36" fill="#f0d2a4"/>
    ${tex('M28 56 v26 M42 56 v26 M56 56 v26')}
    ${hi('M22 54 v18')}
    <rect x="14" y="36" width="72" height="14" rx="3" fill="#ffe08a" ${ink()}/>
    <rect x="64" y="38" width="18" height="10" rx="2" fill="#f0c45c"/>
    <path d="M16 36 L22 16 H78 L84 36 Z" fill="#ff8fab" ${ink()}/>
    <path d="M58 20 H76 L82 34 H62 Z" fill="#e45d88"/>
    ${hi('M24 22 h22')}
    <rect x="26" y="58" width="24" height="20" rx="3" fill="#f3fbff" ${ink(2.2)}/>
    <path d="M32 58 v20 M38 58 v20 M44 58 v20" fill="none" stroke="#a2d2ff" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="68" cy="68" r="8" fill="#ffe566" ${ink(2.2)}/>
    <path d="M70 64 h5 l-1 5 h-3 z" fill="#e0a83a"/>
    <rect x="22" y="86" width="56" height="4" rx="2" fill="#c99366" ${ink(2.2)}/>
    <circle cx="32" cy="96" r="8" fill="${O}" ${ink(2.2)}/><circle cx="32" cy="96" r="3" fill="#ffd166"/>
    <circle cx="70" cy="96" r="8" fill="${O}" ${ink(2.2)}/><circle cx="70" cy="96" r="3" fill="#ffd166"/>`,
});

const lounger = piece({
  kind: 'sun-lounger', name: 'Sun Lounger', cat: 'furniture', w: 168, h: 86, vb: '0 0 170 90',
  svg: `${shadow(85, 70, 84)}
    <path d="M18 56 H156 L148 76 H28 Z" fill="#f3d2aa" ${ink()}/>
    <path d="M110 58 H152 L146 74 H108 Z" fill="#d4a373"/>
    <path d="M24 28 H132 L148 60 H36 Z" fill="#ffd4e2" ${ink()}/>
    <path d="M100 32 H146 L150 58 H108 Z" fill="#e888a8"/>
    ${tex('M40 38 l8 16 M58 34 l10 18 M78 34 l10 16')}
    ${hi('M34 34 h36')}
    <rect x="118" y="20" width="28" height="16" rx="7" fill="#fff" ${ink(2.2)}/>
    <path d="M136 22 H144 V34 H136 Z" fill="#ffd0e0"/>
    <path d="M124 28 q6 3 12 0" fill="none" stroke="#ffb3c6" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="40" cy="74" r="6" fill="${O}" ${ink(2.2)}/><circle cx="40" cy="74" r="2.2" fill="#ffd166"/>
    <circle cx="132" cy="74" r="6" fill="${O}" ${ink(2.2)}/><circle cx="132" cy="74" r="2.2" fill="#ffd166"/>`,
});

const pool = piece({
  kind: 'splash-pool', name: 'Splash Pool', cat: 'furniture', w: 176, h: 96, vb: '0 0 170 96',
  svg: `<defs>${glass('ydpoolW', '#f3fbff', '#7ec8e3')}</defs>
    ${shadow(85, 70, 90)}
    <ellipse cx="85" cy="58" rx="74" ry="28" fill="#d7f4ff" ${ink()}/>
    <path d="M85 32 C130 32 156 48 156 58 C156 74 124 86 85 86 C110 86 140 74 140 58 C140 46 116 36 85 36 Z" fill="#7eb4dc"/>
    <ellipse cx="85" cy="54" rx="58" ry="20" fill="url(#ydpoolW)" ${ink(2.2)}/>
    ${hi('M48 48 q22 -8 40 0')}
    <circle cx="64" cy="54" r="3" fill="#fff" opacity=".8"/><circle cx="108" cy="58" r="2.2" fill="#fff" opacity=".7"/>
    <path d="M40 40 q6 -10 4 -16 M128 38 q-4 -12 2 -18" fill="none" stroke="#7ec8e0" stroke-width="2.4" stroke-linecap="round"/>`,
});

const gate = piece({
  kind: 'picket-gate', name: 'Picket Gate', cat: 'furniture', w: 110, h: 150, vb: '0 0 100 136',
  svg: `${shadow(50, 38, 130)}
    <rect x="14" y="28" width="10" height="96" rx="4" fill="#f7fff8" ${ink()}/>
    <rect x="20" y="34" width="3" height="84" fill="#d5ead8"/>
    <rect x="76" y="28" width="10" height="96" rx="4" fill="#d9f2dc" ${ink()}/>
    <rect x="22" y="40" width="56" height="8" rx="3" fill="#fff" ${ink(2.2)}/>
    <rect x="22" y="78" width="56" height="8" rx="3" fill="#fff" ${ink(2.2)}/>
    <rect x="30" y="34" width="10" height="78" rx="4" fill="#fff" ${ink(2.2)}/>
    <rect x="36" y="40" width="3" height="66" fill="#e7f6ea"/>
    <rect x="46" y="34" width="10" height="78" rx="4" fill="#f7fff8" ${ink(2.2)}/>
    <rect x="62" y="34" width="10" height="78" rx="4" fill="#d9f2dc" ${ink(2.2)}/>
    ${hi('M32 42 v22')}
    <circle cx="70" cy="70" r="3.2" fill="#ffd166" ${ink(2.2)}/>`,
});

const blanket = piece({
  kind: 'picnic-blanket', name: 'Picnic Blanket', cat: 'decor', w: 110, h: 36, vb: '0 0 180 59',
  svg: `${shadow(90, 70, 54)}
    <rect x="14" y="14" width="152" height="34" rx="8" fill="#ff8fab" ${ink()}/>
    <rect x="118" y="18" width="44" height="26" rx="6" fill="#e45d88"/>
    <rect x="26" y="20" width="100" height="22" rx="5" fill="#fff0f5" ${ink(2.2)}/>
    <rect x="100" y="22" width="22" height="16" rx="4" fill="#ffd0e0"/>
    ${tex('M36 26 v12 M52 24 v14 M68 24 v14 M84 24 v14')}
    <rect x="40" y="26" width="18" height="10" rx="2" fill="#fff3b0" ${ink(2.2)}/>
    <circle cx="78" cy="31" r="5" fill="#ff7096" ${ink(2.2)}/>
    <path d="M80 27 h4 l-1 3 h-2 z" fill="#74c69d"/>
    ${hi('M22 20 h24')}`,
});

const tulips = piece({
  kind: 'tulip-bed', name: 'Tulip Bed', cat: 'decor', w: 140, h: 90, vb: '0 0 140 90',
  svg: `${shadow(70, 56, 86)}
    <path d="M10 58 H130 L120 82 H20 Z" fill="#f0d2b0" ${ink()}/>
    <path d="M90 60 H126 L118 78 H86 Z" fill="#d4a373"/>
    <path d="M14 52 H126 Q120 38 70 38 Q20 38 14 52 Z" fill="#74c69d" ${ink()}/>
    <path d="M78 42 H122 Q116 40 100 44 Q88 52 78 50 Z" fill="#3d9a68"/>
    ${hi('M28 48 q18 -4 30 2')}
    ${tex('M36 50 q3 5 0 8 M58 46 q3 6 0 10 M96 48 q3 5 0 8')}
    <path d="M32 56 V32" stroke="#52b788" stroke-width="2.4" fill="none"/>
    <path d="M32 34 q-8 2 -6 12 q8 -2 6 -12" fill="#ff8fab" ${ink(2)}/>
    <path d="M34 36 q4 2 2 8" fill="#e45d88"/>
    <path d="M54 58 V26" stroke="#52b788" stroke-width="2.4" fill="none"/>
    <path d="M54 28 q-8 2 -6 12 q8 -2 6 -12" fill="#ffd166" ${ink(2)}/>
    <path d="M74 56 V24" stroke="#52b788" stroke-width="2.4" fill="none"/>
    <path d="M74 26 q-9 2 -7 14 q9 -2 7 -14" fill="#ff7096" ${ink(2)}/>
    <path d="M76 28 q5 2 2 8" fill="#e04578"/>
    <path d="M94 58 V30" stroke="#52b788" stroke-width="2.4" fill="none"/>
    <path d="M94 32 q-8 2 -6 12 q8 -2 6 -12" fill="#fff" ${ink(2)}/>
    <path d="M112 56 V34" stroke="#52b788" stroke-width="2.4" fill="none"/>
    <path d="M112 36 q-7 2 -5 11 q7 -2 5 -11" fill="#c9a0dc" ${ink(2)}/>`,
});

const bath = piece({
  kind: 'birdbath', name: 'Birdbath', cat: 'decor', w: 84, h: 126, vb: '0 0 80 120',
  svg: `<defs>${glass('ydbathW', '#f3fbff', '#8ecae6')}</defs>
    ${shadow(40, 26, 114)}
    <rect x="34" y="48" width="12" height="58" rx="5" fill="#f4f7f8" ${ink()}/>
    <rect x="41" y="52" width="4" height="50" rx="2" fill="#c5d0d6"/>
    ${hi('M37 58 v24')}
    <ellipse cx="40" cy="104" rx="18" ry="6" fill="#e7eef2" ${ink()}/>
    <ellipse cx="40" cy="36" rx="30" ry="12" fill="#f7fafb" ${ink()}/>
    <path d="M40 24 C62 24 70 34 70 36 C70 46 56 48 40 48 C58 48 66 42 66 36 C66 30 56 26 40 28 Z" fill="#d5dee4"/>
    <ellipse cx="40" cy="34" rx="22" ry="7" fill="url(#ydbathW)" ${ink(2.2)}/>
    ${hi('M26 32 q8 -4 16 0')}
    <path d="M58 18 q8 -8 6 2 q6 2 2 8 q-8 0 -8 -10" fill="#ffd166" ${ink(1.8)}/>`,
});

const pond = piece({
  kind: 'lily-pond', name: 'Lily Pond', cat: 'decor', w: 170, h: 90, vb: '0 0 170 90',
  svg: `<defs>${glass('ydpondW', '#eaf6ff', '#5aa9e6')}</defs>
    ${shadow(85, 70, 84)}
    <ellipse cx="85" cy="52" rx="74" ry="28" fill="#c4a484" ${ink()}/>
    <path d="M85 26 C140 28 158 46 158 54 C158 70 124 80 85 80 C120 78 148 66 148 54 C148 42 124 32 85 32 Z" fill="#a88462"/>
    <ellipse cx="85" cy="50" rx="64" ry="20" fill="url(#ydpondW)" ${ink(2.2)}/>
    ${hi('M42 44 q22 -6 40 2')}
    <ellipse cx="58" cy="52" rx="16" ry="7" fill="#95d5b2" ${ink(2)}/>
    <ellipse cx="66" cy="52" rx="6" ry="4" fill="#3d9a68"/>
    <ellipse cx="108" cy="48" rx="18" ry="8" fill="#74c69d" ${ink(2)}/>
    <ellipse cx="116" cy="48" rx="7" ry="5" fill="#3d9a68"/>
    <circle cx="108" cy="46" r="4" fill="#ff8fab" ${ink(1.6)}/>
    ${tex('M58 52 h12 M108 48 h14', 1)}`,
});

const lights = piece({
  kind: 'patio-lights', name: 'Patio Lights', cat: 'decor', w: 190, h: 70, vb: '0 0 180 70', wall: true,
  svg: `<path d="M8 16 Q50 34 90 14 Q130 32 172 16" fill="none" ${ink()}/>
    <path d="M28 22 v8" fill="none" ${ink(2.2)}/><circle cx="28" cy="40" r="10" fill="#fff6c8" ${ink()}/><path d="M32 34 h5 v10 h-4 z" fill="#f0c45c"/>${hi('M24 36 q2 -2 3 1')}
    <path d="M64 26 v8" fill="none" ${ink(2.2)}/><circle cx="64" cy="44" r="10" fill="#ffc2d4" ${ink()}/><path d="M68 38 h5 v10 h-4 z" fill="#e45d88"/>
    <path d="M100 18 v8" fill="none" ${ink(2.2)}/><circle cx="100" cy="36" r="10" fill="#fff1c2" ${ink()}/>${hi('M96 32 q2 -2 3 1')}
    <path d="M136 26 v8" fill="none" ${ink(2.2)}/><circle cx="136" cy="44" r="10" fill="#c9f1ff" ${ink()}/><path d="M140 38 h5 v10 h-4 z" fill="#7eb4dc"/>
    <path d="M162 18 v6" fill="none" ${ink(2.2)}/><circle cx="162" cy="34" r="8" fill="#ffd0e8" ${ink()}/>`,
});

const toad = piece({
  kind: 'toadstool-light', name: 'Toadstool Light', cat: 'decor', w: 70, h: 84, vb: '0 0 80 96',
  svg: `<defs>${rad('ydtoadG', '#ffe7a0', '.85')}</defs>
    ${shadow(40, 24, 90)}
    <ellipse cx="40" cy="78" rx="16" ry="6" fill="url(#ydtoadG)"/>
    <path d="M34 68 H46 L44 84 H36 Z" fill="#fff7f8" ${ink()}/>
    <path d="M41 70 H45 L44 82 H41 Z" fill="#f0d8cc"/>
    <path d="M10 56 Q40 16 70 56 Q40 68 10 56 Z" fill="#ff8fab" ${ink()}/>
    <path d="M42 28 Q62 24 68 52 Q50 60 42 56 Z" fill="#e45d88"/>
    ${hi('M22 46 q12 -8 18 -2')}
    <circle cx="28" cy="48" r="4" fill="#fff" ${ink(2.2)}/><circle cx="46" cy="44" r="5" fill="#fff" ${ink(2.2)}/><circle cx="38" cy="56" r="3" fill="#fff" ${ink(2.2)}/>`,
});

const stones = piece({
  kind: 'stepping-stones', name: 'Stepping Stones', cat: 'decor', w: 160, h: 64, vb: '0 0 160 70',
  svg: `${shadow(80, 64, 64)}
    <ellipse cx="28" cy="40" rx="22" ry="12" fill="#f7f4ef" ${ink()}/>
    <ellipse cx="36" cy="42" rx="10" ry="7" fill="#d9d3cc"/>
    <ellipse cx="78" cy="46" rx="24" ry="12" fill="#f4f1ec" ${ink()}/>
    <ellipse cx="88" cy="48" rx="10" ry="7" fill="#d4cdc4"/>
    <ellipse cx="126" cy="38" rx="22" ry="12" fill="#e7e2dc" ${ink()}/>
    ${hi('M16 36 q8 -3 12 1')}
    ${tex('M22 42 h8 M74 48 h10 M118 40 h8')}`,
});

const pinwheel = piece({
  kind: 'pinwheel', name: 'Pinwheel', cat: 'decor', w: 56, h: 90, vb: '0 0 70 100', holdable: true,
  svg: `${shadow(35, 14, 96)}
    <rect x="31" y="42" width="6" height="54" rx="3" fill="#74c69d" ${ink()}/>
    <rect x="34" y="46" width="3" height="46" fill="#3d9a68"/>
    <path d="M34 40 L34 14 L50 34 Z" fill="#ff8fab" ${ink(2.2)}/>
    <path d="M40 22 L48 32 L36 34 Z" fill="#e45d88"/>
    <path d="M34 40 L58 46 L40 54 Z" fill="#ffd166" ${ink(2.2)}/>
    <path d="M48 44 L56 48 L42 50 Z" fill="#e0a83a"/>
    <path d="M34 40 L34 66 L18 46 Z" fill="#8ecae6" ${ink(2.2)}/>
    <path d="M30 52 L22 50 L32 46 Z" fill="#5aa9d6"/>
    <path d="M34 40 L12 34 L28 26 Z" fill="#c9a0dc" ${ink(2.2)}/>
    <circle cx="34" cy="40" r="5" fill="#fff" ${ink(2.2)}/>
    ${hi('M32 37 q2 -1 2 1')}`,
});

const barrel = piece({
  kind: 'rain-barrel', name: 'Rain Barrel', cat: 'decor', w: 86, h: 108, vb: '0 0 80 110',
  svg: `${shadow(40, 28, 104)}
    <path d="M16 28 H64 L70 96 H10 Z" fill="#8ecae6" ${ink()}/>
    <path d="M48 32 H66 L70 92 H52 Z" fill="#3d7ea8"/>
    ${tex('M26 40 v40 M36 36 v48 M46 38 v44')}
    ${hi('M22 40 v26')}
    <rect x="12" y="22" width="56" height="12" rx="5" fill="#bde0fe" ${ink()}/>
    <rect x="46" y="24" width="18" height="8" rx="3" fill="#7eb4dc"/>
    <rect x="14" y="70" width="52" height="8" rx="3" fill="#2f6f9a" opacity=".28"/>
    <rect x="58" y="48" width="12" height="8" rx="3" fill="#d7ecff" ${ink(2)}/>
    <path d="M70 52 h6" ${ink(2)}/>`,
});

const bush = piece({
  kind: 'butterfly-bush', name: 'Butterfly Bush', cat: 'plants', w: 120, h: 130, vb: '0 0 100 120',
  svg: `${shadow(50, 34, 114)}
    <path d="M46 108 V68" stroke="#3d9a68" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="50" cy="56" rx="34" ry="28" fill="#74c69d" ${ink()}/>
    <ellipse cx="30" cy="64" rx="16" ry="14" fill="#95d5b2" ${ink(2.2)}/>
    <ellipse cx="70" cy="62" rx="18" ry="16" fill="#3d9a68" ${ink(2.2)}/>
    ${hi('M28 46 q12 -6 20 2')}
    ${tex('M48 40 v24')}
    <circle cx="36" cy="50" r="4" fill="#c9a0dc" ${ink(1.6)}/><circle cx="52" cy="42" r="4.2" fill="#ff8fab" ${ink(1.6)}/><circle cx="64" cy="52" r="3.6" fill="#ffd166" ${ink(1.6)}/>
    <path d="M78 34 q10 -8 8 2 q8 2 0 8 q-8 -2 -8 -10" fill="#ff8fab" ${ink(1.6)}/>`,
});

const hedge = piece({
  kind: 'hedge-row', name: 'Hedge Row', cat: 'plants', w: 190, h: 96, vb: '0 0 180 96',
  svg: `${shadow(90, 76, 90)}
    <path d="M8 70 Q20 28 50 40 Q70 18 100 36 Q130 16 160 38 Q176 28 176 70 Z" fill="#74c69d" ${ink()}/>
    <path d="M100 28 Q140 18 168 40 Q176 50 174 70 H120 Q130 48 100 40 Z" fill="#3d9a68"/>
    ${tex('M36 52 q4 6 0 12 M70 44 q4 8 0 14 M150 48 q4 6 0 12')}
    ${hi('M24 48 q14 -6 24 2')}
    <circle cx="40" cy="48" r="3.4" fill="#ff8fab" ${ink(2.2)}/><circle cx="88" cy="40" r="3.4" fill="#ffd166" ${ink(2.2)}/><circle cx="128" cy="46" r="3.2" fill="#fff" ${ink(2.2)}/>`,
});

const cup = piece({
  kind: 'lemonade-cup', name: 'Lemonade Cup', cat: 'food', w: 52, h: 70, vb: '0 0 70 90', holdable: true,
  svg: `${shadow(35, 20, 84)}
    <path d="M18 28 H52 L48 76 H22 Z" fill="#fff" ${ink()}/>
    <path d="M40 30 H50 L47 74 H40 Z" fill="#f0e6d8"/>
    <path d="M20 40 H50 L47 76 H23 Z" fill="#ffe566" ${ink(2.2)}/>
    <path d="M40 42 H48 L46 74 H40 Z" fill="#f0c45c"/>
    ${hi('M24 36 v16')}
    <path d="M30 16 q5 8 0 14 q-6 -4 0 -14" fill="#ff8fab" ${ink(1.8)}/>
    <circle cx="42" cy="20" r="6" fill="#ffe566" ${ink(1.6)}/>
    <path d="M44 16 h4 l-1 5 h-3 z" fill="#e0a83a"/>
    <ellipse cx="46" cy="16" rx="3.4" ry="2" fill="#74c69d" ${ink(1.4)}/>
    <rect x="24" y="22" width="22" height="6" rx="2" fill="#fff" ${ink(1.6)}/>`,
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
    ${pickets(1084, 1680, 268, 372, 28)}
    <rect y="360" width="2400" height="240" fill="#c6ef9a"/>
    <rect y="360" width="2400" height="28" fill="#e7f8c8"/>
    <rect y="520" width="2400" height="80" fill="#9ed67a"/>
    <path d="M1040 470 q30 -12 16 -6 M1200 510 q28 -12 14 -4 M1360 548 q24 -10 12 -4" fill="none" stroke="#3d9a68" stroke-width="1.2" stroke-linecap="round" opacity=".22"/>
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
