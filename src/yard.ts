// Backyard preview for approval mockups. On only with ?yard=1.
// The drawings follow the art-refresh sample: plum outlines, a top-left gradient,
// a short highlight, a little texture, and a flat contact shadow. No SVG filters.
// Nothing here is in the default catalog, and an empty yard stays empty unless this flag is on.

import { svgOf, type ItemDef } from './items';
import { patchFromLook2, type Look2 } from './shared/avatar';

const O = '#5a3d5c';
const ink = (w = 3.5) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

function shadow(cx: number, rx: number, cy: number): string {
  const inner = Math.round(rx * 0.62);
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="3.2" fill="${O}" opacity=".08"/><ellipse cx="${cx}" cy="${(cy + 1.3).toFixed(1)}" rx="${inner}" ry="1.5" fill="${O}" opacity=".12"/>`;
}
function lin(id: string, light: string, deep: string): string {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${deep}"/></linearGradient>`;
}
function hi(d: string, w = 2.2): string {
  return `<path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" opacity=".62"/>`;
}
function grain(d: string): string {
  return `<path d="${d}" fill="none" stroke="${O}" stroke-width="1.15" stroke-linecap="round" opacity=".18"/>`;
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

export const YARD_KID = { x: 940, y: 548, flip: false as boolean };
export const YARD_CAT_X = 790;
export const DOOR_KID = { x: 1000, y: 540, flip: true as boolean };
export const DOOR_CAT_X = 1140;

/** Back-to-front. item/add stamps z from this order. */
export const YARD_STAGE: { kind: string; x: number; y: number }[] = [
  { kind: 'birdbath', x: 900, y: 492 },
  { kind: 'yard-swing', x: 1058, y: 496 },
  { kind: 'yard-bench', x: 1004, y: 536 },
  { kind: 'tulip-bed', x: 848, y: 548 },
  { kind: 'lemonade-cart', x: 1092, y: 548 },
  { kind: 'sandbox', x: 918, y: 578 },
  { kind: 'picnic-blanket', x: 1036, y: 588 },
];

function piece(p: { kind: string; name: string; cat: string; w: number; h: number; vb: string; wall?: boolean; holdable?: boolean; svg: string }): ItemDef {
  return { kind: p.kind, name: p.name, cat: p.cat, w: p.w, h: p.h, vb: p.vb, wall: p.wall, holdable: p.holdable ?? false, rooms: ['backyard'], svg: p.svg };
}

const swing = piece({
  kind: 'yard-swing', name: 'A-Frame Swing', cat: 'furniture', w: 156, h: 218, vb: '0 0 100 140',
  svg: `<defs>${lin('ydswingA', '#f6d7b0', '#c9844a')}${lin('ydswingB', '#ffe7c4', '#e0a15f')}${lin('ydswingS', '#fff6ea', '#f0c27a')}</defs>
    ${shadow(50, 40, 134)}
    <path d="M10 128 L30 22 L46 128 Z" fill="url(#ydswingA)" ${ink()}/>
    <path d="M54 128 L70 22 L90 128 Z" fill="url(#ydswingA)" ${ink()}/>
    ${grain('M22 70 l8 28 M24 96 l6 16 M64 72 l8 26 M66 100 l6 14')}
    ${hi('M18 48 l8 -16')}
    <rect x="24" y="16" width="52" height="12" rx="6" fill="url(#ydswingB)" ${ink()}/>
    ${hi('M30 20 h28')}
    <path d="M36 28 V86 M64 28 V86" stroke="#f4e2c4" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M36 28 V86 M64 28 V86" fill="none" ${ink(2.2)}/>
    <rect x="28" y="82" width="44" height="12" rx="5" fill="url(#ydswingS)" ${ink()}/>
    ${grain('M34 86 h32 M34 90 h32')}
    ${hi('M34 84 h20')}
    <circle cx="36" cy="28" r="2.4" fill="${O}"/><circle cx="64" cy="28" r="2.4" fill="${O}"/>`,
});

const sandbox = piece({
  kind: 'sandbox', name: 'Sandbox', cat: 'furniture', w: 168, h: 105, vb: '0 0 160 100',
  svg: `<defs>${lin('ydsandW', '#f0c48a', '#c9844a')}${lin('ydsandS', '#ffe7a8', '#f0c36a')}</defs>
    ${shadow(80, 70, 96)}
    <path d="M14 46 H146 L138 90 H22 Z" fill="url(#ydsandW)" ${ink()}/>
    ${hi('M24 52 h70')}
    <path d="M24 54 H136 L130 82 H30 Z" fill="url(#ydsandS)" ${ink(2.4)}/>
    ${grain('M40 64 q10 4 8 10 M58 60 q12 6 6 12 M78 66 q8 3 10 8 M100 62 q10 5 6 12 M118 68 q6 3 8 8')}
    <circle cx="48" cy="70" r="2" fill="#e7b85a" opacity=".7"/><circle cx="88" cy="74" r="2.2" fill="#e7b85a" opacity=".7"/><circle cx="110" cy="68" r="1.8" fill="#fff" opacity=".55"/>
    <path d="M36 40 h22 l-2 16 h-18 z" fill="#ff8fab" ${ink(2.2)}/>
    ${hi('M40 44 h10')}
    <path d="M108 36 l22 -8 4 8 -18 10 z" fill="#8ecae6" ${ink(2.2)}/>
    <path d="M112 34 l16 -6" ${ink(2.2)}/>`,
});

const slide = piece({
  kind: 'little-slide', name: 'Little Slide', cat: 'furniture', w: 150, h: 188, vb: '0 0 110 140',
  svg: `<defs>${lin('ydslideL', '#d7ecff', '#7eb6e0')}${lin('ydslideC', '#fff1f6', '#ff8fab')}${lin('ydslideW', '#f6d7b0', '#d09a55')}</defs>
    ${shadow(58, 46, 134)}
    <rect x="16" y="28" width="8" height="100" rx="4" fill="url(#ydslideW)" ${ink()}/>
    <rect x="40" y="28" width="8" height="78" rx="4" fill="url(#ydslideW)" ${ink()}/>
    <path d="M16 48 H48 M16 66 H48 M16 84 H48" ${ink(2.4)}/>
    <rect x="12" y="22" width="40" height="14" rx="5" fill="url(#ydslideL)" ${ink()}/>
    ${hi('M18 26 h22')}
    <path d="M48 30 H78 C96 30 102 48 100 70 L92 118 H68 L74 72 C76 50 70 42 52 42 Z" fill="url(#ydslideC)" ${ink()}/>
    ${hi('M62 40 q16 6 22 28')}
    ${grain('M80 56 q8 16 6 36 M86 64 q6 14 4 28')}`,
});

const bench = piece({
  kind: 'yard-bench', name: 'Garden Bench', cat: 'furniture', w: 140, h: 100, vb: '0 0 140 100',
  svg: `<defs>${lin('ydbench', '#f3d2aa', '#c9844a')}${lin('ydbenchB', '#ffe7c4', '#e0a15f')}</defs>
    ${shadow(70, 58, 96)}
    <path d="M18 28 H122 L116 58 H24 Z" fill="url(#ydbenchB)" ${ink()}/>
    ${grain('M32 36 v16 M48 34 v18 M64 36 v16 M80 34 v18 M96 36 v16 M112 38 v12')}
    ${hi('M30 32 h48')}
    <rect x="16" y="54" width="108" height="14" rx="6" fill="url(#ydbench)" ${ink()}/>
    ${hi('M24 58 h40')}
    <rect x="22" y="66" width="10" height="26" rx="4" fill="url(#ydbench)" ${ink()}/>
    <rect x="108" y="66" width="10" height="26" rx="4" fill="url(#ydbench)" ${ink()}/>
    <path d="M22 78 H32 M108 78 H118" stroke="#fff" stroke-width="1.4" opacity=".4" stroke-linecap="round"/>
    <path d="M14 24 h10 M116 24 h10" ${ink(2.4)}/>`,
});

const cart = piece({
  kind: 'lemonade-cart', name: 'Lemonade Cart', cat: 'furniture', w: 124, h: 156, vb: '0 0 110 140',
  svg: `<defs>${lin('ydcart', '#fff6ea', '#f0d2a4')}${lin('ydawn', '#fff3b0', '#ffd166')}${lin('ydawn2', '#fff', '#ffe08a')}</defs>
    ${shadow(55, 46, 134)}
    <path d="M18 48 H96 L90 108 H26 Z" fill="url(#ydcart)" ${ink()}/>
    ${grain('M34 60 v36 M50 58 v40 M66 60 v36 M80 62 v30')}
    ${hi('M28 56 v28')}
    <path d="M14 36 H100 L92 52 H22 Z" fill="url(#ydawn)" ${ink()}/>
    <path d="M22 40 h16 l-2 10 h-12 z M42 39 h16 l-2 11 h-12 z M62 39 h16 l-2 11 h-12 z" fill="url(#ydawn2)" opacity=".85"/>
    ${hi('M24 40 h40')}
    <rect x="30" y="70" width="28" height="22" rx="4" fill="#fff" ${ink(2.2)}/>
    <path d="M36 70 v22 M44 70 v22 M52 70 v22" stroke="#bde0fe" stroke-width="2"/>
    <circle cx="78" cy="78" r="10" fill="#ffe566" ${ink(2.2)}/><path d="M78 70 v4" ${ink(2)}/><ellipse cx="84" cy="72" rx="5" ry="3" fill="#80ed99" ${ink(1.6)}/>
    <circle cx="34" cy="114" r="10" fill="#5a3d5c" ${ink(2.2)}/><circle cx="34" cy="114" r="4" fill="#ffd166"/>
    <circle cx="82" cy="114" r="10" fill="#5a3d5c" ${ink(2.2)}/><circle cx="82" cy="114" r="4" fill="#ffd166"/>
    <path d="M48 28 q8 -16 18 -4" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round"/>`,
});

const lounger = piece({
  kind: 'sun-lounger', name: 'Sun Lounger', cat: 'furniture', w: 168, h: 86, vb: '0 0 170 90',
  svg: `<defs>${lin('ydlounge', '#fff0f6', '#ffb3c6')}${lin('ydloungeW', '#f6d7b0', '#d09a55')}</defs>
    ${shadow(85, 74, 86)}
    <path d="M18 58 H156 L148 78 H28 Z" fill="url(#ydloungeW)" ${ink()}/>
    <path d="M24 30 H132 L148 62 H36 Z" fill="url(#ydlounge)" ${ink()}/>
    ${grain('M40 40 l8 16 M56 36 l10 20 M74 34 l12 22 M94 36 l10 18 M114 40 l8 14')}
    ${hi('M36 36 h40')}
    <rect x="118" y="24" width="28" height="16" rx="7" fill="#fff" ${ink(2.2)}/>
    <path d="M124 30 q6 3 12 0" fill="none" stroke="#ffb3c6" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="40" cy="74" r="6" fill="${O}"/><circle cx="132" cy="74" r="6" fill="${O}"/>`,
});

const pool = piece({
  kind: 'splash-pool', name: 'Splash Pool', cat: 'furniture', w: 176, h: 96, vb: '0 0 170 96',
  svg: `<defs>${lin('ydpoolR', '#d7f4ff', '#7ec8e0')}${lin('ydpoolW', '#fff', '#c9f1ff')}</defs>
    ${shadow(85, 74, 92)}
    <ellipse cx="85" cy="58" rx="74" ry="30" fill="url(#ydpoolR)" ${ink()}/>
    <ellipse cx="85" cy="54" rx="60" ry="22" fill="url(#ydpoolW)" ${ink(2.4)}/>
    <ellipse cx="85" cy="56" rx="48" ry="14" fill="#9ad7f5"/>
    ${hi('M48 46 q20 -8 40 0')}
    <circle cx="62" cy="54" r="3" fill="#fff" opacity=".75"/><circle cx="108" cy="58" r="2.4" fill="#fff" opacity=".7"/>
    <path d="M40 40 q6 -10 4 -16 M128 38 q-4 -12 2 -18" fill="none" stroke="#7ec8e0" stroke-width="2.4" stroke-linecap="round"/>`,
});

const gate = piece({
  kind: 'picket-gate', name: 'Picket Gate', cat: 'furniture', w: 110, h: 150, vb: '0 0 100 136',
  svg: `<defs>${lin('ydgate', '#f7fff8', '#d9f2dc')}${lin('ydgateP', '#fff', '#e7f6ea')}</defs>
    ${shadow(50, 40, 130)}
    <rect x="14" y="28" width="10" height="96" rx="4" fill="url(#ydgate)" ${ink()}/>
    <rect x="76" y="28" width="10" height="96" rx="4" fill="url(#ydgate)" ${ink()}/>
    <rect x="22" y="40" width="56" height="8" rx="3" fill="url(#ydgateP)" ${ink(2.4)}/>
    <rect x="22" y="78" width="56" height="8" rx="3" fill="url(#ydgateP)" ${ink(2.4)}/>
    <rect x="30" y="34" width="10" height="78" rx="4" fill="#fff" ${ink(2.4)}/>
    <rect x="46" y="34" width="10" height="78" rx="4" fill="#fff" ${ink(2.4)}/>
    <rect x="62" y="34" width="10" height="78" rx="4" fill="#fff" ${ink(2.4)}/>
    ${hi('M32 42 v24 M48 42 v24')}
    <circle cx="70" cy="70" r="3.2" fill="#ffd166" ${ink(1.8)}/>
    <path d="M18 24 h6 M78 24 h6" ${ink(2.2)}/>`,
});

const blanket = piece({
  kind: 'picnic-blanket', name: 'Picnic Blanket', cat: 'decor', w: 186, h: 84, vb: '0 0 180 84',
  svg: `<defs>${lin('ydblank', '#ffd0e0', '#ff8fab')}${lin('ydblank2', '#fff6ea', '#ffd6e4')}</defs>
    <ellipse cx="90" cy="78" rx="78" ry="6" fill="${O}" opacity=".08"/>
    <path d="M16 28 Q90 8 164 28 L172 62 Q90 78 8 62 Z" fill="url(#ydblank)" ${ink()}/>
    <path d="M28 32 Q90 16 152 32 L158 58 Q90 70 22 58 Z" fill="url(#ydblank2)" ${ink(2.2)}/>
    ${grain('M40 36 l8 22 M60 30 l6 26 M80 28 l4 28 M100 28 l-2 28 M120 30 l-4 26 M140 34 l-6 22')}
    <rect x="46" y="40" width="22" height="14" rx="4" fill="#fff3b0" ${ink(2)}/>
    <circle cx="118" cy="46" r="8" fill="#ff6b6b" ${ink(2)}/><ellipse cx="122" cy="40" rx="5" ry="3" fill="#80ed99" ${ink(1.6)}/>
    <path d="M78 48 h16 v10 h-16 z" fill="#bde0fe" ${ink(1.8)}/>
    ${hi('M24 40 q20 -6 36 0')}`,
});

const tulips = piece({
  kind: 'tulip-bed', name: 'Tulip Bed', cat: 'decor', w: 140, h: 90, vb: '0 0 140 90',
  svg: `<defs>${lin('ydbed', '#6fbf73', '#3d9a55')}${lin('ydsoil', '#e7c4a0', '#c49a6c')}</defs>
    ${shadow(70, 58, 86)}
    <path d="M10 58 H130 L120 82 H20 Z" fill="url(#ydsoil)" ${ink()}/>
    <path d="M14 52 H126 Q120 40 70 40 Q20 40 14 52 Z" fill="url(#ydbed)" ${ink()}/>
    ${grain('M30 50 q4 6 0 10 M48 46 q4 8 0 12 M70 44 q4 8 0 14 M92 46 q4 8 0 12 M112 50 q4 6 0 10')}
    ${hi('M28 48 q20 -4 36 2')}
    <g>
      <path d="M32 58 V34" stroke="#2f8a48" stroke-width="2.4" fill="none"/>
      <path d="M32 36 q-8 2 -6 12 q8 -2 6 -12" fill="#ff8fab" ${ink(2)}/>
      <path d="M52 60 V28" stroke="#2f8a48" stroke-width="2.4" fill="none"/>
      <path d="M52 30 q-8 2 -6 12 q8 -2 6 -12" fill="#ffd166" ${ink(2)}/>
      <path d="M72 58 V26" stroke="#2f8a48" stroke-width="2.4" fill="none"/>
      <path d="M72 28 q-9 2 -7 14 q9 -2 7 -14" fill="#ff7096" ${ink(2)}/>
      <path d="M92 60 V32" stroke="#2f8a48" stroke-width="2.4" fill="none"/>
      <path d="M92 34 q-8 2 -6 12 q8 -2 6 -12" fill="#fff" ${ink(2)}/>
      <path d="M110 58 V36" stroke="#2f8a48" stroke-width="2.4" fill="none"/>
      <path d="M110 38 q-7 2 -5 11 q7 -2 5 -11" fill="#c9a0dc" ${ink(2)}/>
    </g>`,
});

const bath = piece({
  kind: 'birdbath', name: 'Birdbath', cat: 'decor', w: 84, h: 126, vb: '0 0 80 120',
  svg: `<defs>${lin('ydbath', '#f4f7f8', '#c5d0d6')}${lin('ydwater', '#d7f4ff', '#7eb6e8')}</defs>
    ${shadow(40, 28, 114)}
    <rect x="34" y="48" width="12" height="58" rx="6" fill="url(#ydbath)" ${ink()}/>
    ${hi('M37 56 v28')}
    <ellipse cx="40" cy="104" rx="18" ry="6" fill="url(#ydbath)" ${ink()}/>
    <ellipse cx="40" cy="36" rx="30" ry="12" fill="url(#ydbath)" ${ink()}/>
    <ellipse cx="40" cy="34" rx="22" ry="7" fill="url(#ydwater)" ${ink(2.2)}/>
    ${hi('M26 32 q10 -4 18 0')}
    <circle cx="34" cy="34" r="1.6" fill="#fff" opacity=".8"/>
    <path d="M58 18 q8 -8 6 2 q6 2 2 8 q-8 0 -8 -10" fill="#ffd166" ${ink(1.8)}/>`,
});

const pond = piece({
  kind: 'lily-pond', name: 'Lily Pond', cat: 'decor', w: 170, h: 90, vb: '0 0 170 90',
  svg: `<defs>${lin('ydpond', '#b9e3ff', '#5aa9e6')}${lin('ydpad', '#9be7a8', '#3d9a55')}</defs>
    ${shadow(85, 72, 84)}
    <ellipse cx="85" cy="52" rx="74" ry="28" fill="#7d6a4a" ${ink()}/>
    <ellipse cx="85" cy="50" rx="66" ry="22" fill="url(#ydpond)" ${ink(2.4)}/>
    ${hi('M40 44 q24 -8 48 2')}
    <ellipse cx="58" cy="52" rx="16" ry="7" fill="url(#ydpad)" ${ink(2)}/>
    <ellipse cx="108" cy="48" rx="18" ry="8" fill="url(#ydpad)" ${ink(2)}/>
    <circle cx="108" cy="46" r="4" fill="#ff8fab" ${ink(1.6)}/>
    <path d="M70 46 q6 4 0 8" fill="none" stroke="#fff" stroke-width="1.4" opacity=".6"/>`,
});

const lights = piece({
  kind: 'patio-lights', name: 'Patio Lights', cat: 'decor', w: 190, h: 70, vb: '0 0 180 70', wall: true,
  svg: `<defs>${lin('ydbulb', '#fff6c8', '#ffd166')}</defs>
    <path d="M8 16 Q50 36 90 14 Q130 34 172 16" fill="none" stroke="${O}" stroke-width="3" stroke-linecap="round"/>
    <g>
      <path d="M28 22 v8" ${ink(2)}/><circle cx="28" cy="40" r="10" fill="url(#ydbulb)" ${ink()}/>${hi('M24 36 q3 -2 4 2')}
      <path d="M64 28 v8" ${ink(2)}/><circle cx="64" cy="46" r="10" fill="#ffc2d4" ${ink()}/>
      <path d="M100 20 v8" ${ink(2)}/><circle cx="100" cy="38" r="10" fill="url(#ydbulb)" ${ink()}/>
      <path d="M136 28 v8" ${ink(2)}/><circle cx="136" cy="46" r="10" fill="#c9f1ff" ${ink()}/>
      <path d="M162 20 v6" ${ink(2)}/><circle cx="162" cy="36" r="8" fill="#ffd0e8" ${ink()}/>
    </g>`,
});

const toad = piece({
  kind: 'toadstool-light', name: 'Toadstool Light', cat: 'decor', w: 70, h: 84, vb: '0 0 80 96',
  svg: `<defs>${lin('ydtoad', '#ffd0e0', '#ff7096')}${lin('ydstem', '#fff', '#f6e7dc')}</defs>
    ${shadow(40, 26, 90)}
    <path d="M34 70 H46 L44 86 H36 Z" fill="url(#ydstem)" ${ink()}/>
    <path d="M10 58 Q40 18 70 58 Q40 70 10 58 Z" fill="url(#ydtoad)" ${ink()}/>
    ${hi('M22 48 q12 -8 20 -2')}
    <circle cx="28" cy="50" r="4" fill="#fff" opacity=".85"/><circle cx="46" cy="46" r="5" fill="#fff" opacity=".8"/><circle cx="40" cy="58" r="3" fill="#fff" opacity=".75"/>
    <ellipse cx="40" cy="62" rx="10" ry="3" fill="#ffe7a0" opacity=".7"/>`,
});

const stones = piece({
  kind: 'stepping-stones', name: 'Stepping Stones', cat: 'decor', w: 160, h: 64, vb: '0 0 160 70',
  svg: `<defs>${lin('ydstone', '#f7f4ef', '#d9d3cc')}</defs>
    ${shadow(80, 66, 64)}
    <ellipse cx="28" cy="40" rx="22" ry="12" fill="url(#ydstone)" ${ink()}/>
    <ellipse cx="78" cy="46" rx="24" ry="12" fill="url(#ydstone)" ${ink()}/>
    <ellipse cx="126" cy="38" rx="22" ry="12" fill="url(#ydstone)" ${ink()}/>
    ${hi('M16 36 q8 -3 14 1')}
    ${grain('M22 42 h10 M74 48 h12 M120 40 h10')}`,
});

const pinwheel = piece({
  kind: 'pinwheel', name: 'Pinwheel', cat: 'decor', w: 56, h: 90, vb: '0 0 70 100', holdable: true,
  svg: `<defs>${lin('ydpin', '#fff', '#e7eef2')}</defs>
    ${shadow(35, 16, 96)}
    <path d="M34 96 V42" stroke="#80ed99" stroke-width="4" stroke-linecap="round"/>
    <path d="M34 40 L34 14 L50 34 Z" fill="#ff8fab" ${ink(2.2)}/>
    <path d="M34 40 L58 46 L40 54 Z" fill="#ffd166" ${ink(2.2)}/>
    <path d="M34 40 L34 66 L18 46 Z" fill="#8ecae6" ${ink(2.2)}/>
    <path d="M34 40 L12 34 L28 26 Z" fill="#c9a0dc" ${ink(2.2)}/>
    <circle cx="34" cy="40" r="5" fill="url(#ydpin)" ${ink(2)}/>
    ${hi('M32 36 q2 -1 3 1')}`,
});

const barrel = piece({
  kind: 'rain-barrel', name: 'Rain Barrel', cat: 'decor', w: 86, h: 108, vb: '0 0 80 110',
  svg: `<defs>${lin('ydbar', '#7eb6e0', '#3d7ec4')}${lin('ydbar2', '#b9dcff', '#5aa9e6')}</defs>
    ${shadow(40, 30, 104)}
    <path d="M16 28 H64 L70 96 H10 Z" fill="url(#ydbar)" ${ink()}/>
    ${grain('M24 40 v44 M34 36 v52 M46 36 v52 M56 40 v44')}
    ${hi('M22 40 v30')}
    <rect x="12" y="22" width="56" height="12" rx="5" fill="url(#ydbar2)" ${ink()}/>
    <rect x="14" y="70" width="52" height="8" rx="3" fill="#3d6f9a" opacity=".35"/>
    <rect x="58" y="48" width="12" height="8" rx="3" fill="#d7ecff" ${ink(2)}/>
    <path d="M70 52 h6" ${ink(2)}/>`,
});

const bush = piece({
  kind: 'butterfly-bush', name: 'Butterfly Bush', cat: 'plants', w: 120, h: 130, vb: '0 0 100 120',
  svg: `<defs>${lin('ydbush', '#8ee0a0', '#3d9a55')}</defs>
    ${shadow(50, 36, 114)}
    <path d="M46 110 V70" stroke="#2f8a48" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="50" cy="58" rx="36" ry="30" fill="url(#ydbush)" ${ink()}/>
    <ellipse cx="30" cy="66" rx="18" ry="16" fill="#6fce86" ${ink(2.4)}/>
    <ellipse cx="72" cy="64" rx="18" ry="16" fill="#b6f0c0" ${ink(2.4)}/>
    ${hi('M28 46 q14 -8 24 2')}
    <circle cx="36" cy="52" r="4" fill="#c9a0dc" ${ink(1.6)}/><circle cx="52" cy="44" r="4.5" fill="#ff8fab" ${ink(1.6)}/><circle cx="66" cy="54" r="4" fill="#ffd166" ${ink(1.6)}/><circle cx="48" cy="64" r="3.5" fill="#fff" ${ink(1.6)}/>
    <path d="M78 36 q10 -8 8 2 q8 2 0 8 q-8 -2 -8 -10" fill="#ff8fab" ${ink(1.6)}/>`,
});

const hedge = piece({
  kind: 'hedge-row', name: 'Hedge Row', cat: 'plants', w: 190, h: 96, vb: '0 0 180 96',
  svg: `<defs>${lin('ydhedge', '#7dce8a', '#2f8a48')}</defs>
    ${shadow(90, 80, 90)}
    <path d="M8 70 Q20 28 50 40 Q70 18 100 36 Q130 16 160 38 Q176 28 176 70 Z" fill="url(#ydhedge)" ${ink()}/>
    ${grain('M30 50 q6 8 0 16 M60 42 q6 10 0 18 M100 40 q6 10 0 20 M140 44 q6 10 0 18')}
    ${hi('M24 48 q16 -6 28 2')}
    <circle cx="40" cy="48" r="3.5" fill="#ff8fab"/><circle cx="88" cy="40" r="3.5" fill="#ffd166"/><circle cx="132" cy="46" r="3.5" fill="#fff"/><circle cx="150" cy="58" r="3" fill="#c9a0dc"/>`,
});

const cup = piece({
  kind: 'lemonade-cup', name: 'Lemonade Cup', cat: 'food', w: 52, h: 70, vb: '0 0 70 90', holdable: true,
  svg: `<defs>${lin('ydcup', '#fff6c2', '#ffe566')}${lin('ydcupG', '#fff', '#f7f1e3')}</defs>
    ${shadow(35, 22, 84)}
    <path d="M18 28 H52 L48 78 H22 Z" fill="url(#ydcupG)" ${ink()}/>
    <path d="M20 40 H50 L47 78 H23 Z" fill="url(#ydcup)" ${ink(2.2)}/>
    ${hi('M24 36 v20')}
    <path d="M30 18 q5 8 0 14 q-6 -4 0 -14" fill="#ff8fab" ${ink(1.8)}/>
    <circle cx="40" cy="22" r="6" fill="#ffe566" ${ink(1.8)}/><ellipse cx="44" cy="18" rx="4" ry="2.2" fill="#80ed99" ${ink(1.4)}/>
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
    <ellipse cx="${cx}" cy="${cy + 8 * s}" rx="${40 * s}" ry="${16 * s}" fill="#c5e4ff" opacity=".35"/>
    <ellipse cx="${cx - 24 * s}" cy="${cy}" rx="${28 * s}" ry="${16 * s}" fill="#fff"/>
    <ellipse cx="${cx + 20 * s}" cy="${cy - 2 * s}" rx="${32 * s}" ry="${18 * s}" fill="#fff"/>
    <ellipse cx="${cx}" cy="${cy + 2 * s}" rx="${36 * s}" ry="${15 * s}" fill="#fff"/>
    <ellipse cx="${cx - 6 * s}" cy="${cy - 8 * s}" rx="${16 * s}" ry="${9 * s}" fill="#fff" opacity=".9"/>
  </g>`;
}

function pickets(x0: number, x1: number, top: number, bot: number, step: number): string {
  let s = '';
  const h = bot - top;
  const pw = Math.max(8, step * 0.46);
  for (let x = x0; x <= x1; x += step) {
    s += `<rect x="${x}" y="${top}" width="${pw}" height="${h}" rx="3" fill="#f7fff8" ${ink(2.4)}/>`;
    s += `<path d="M${x + 2.2} ${top + 8} v${Math.round(h * 0.45)}" stroke="#fff" stroke-width="1.4" opacity=".5" fill="none" stroke-linecap="round"/>`;
  }
  const rail = (y: number) => `<rect x="${x0 - 2}" y="${y}" width="${x1 - x0 + pw + 4}" height="8" rx="3" fill="#fff" ${ink(2.2)}/>`;
  s += rail(top + h * 0.32) + rail(top + h * 0.66);
  return s;
}

function tree(x: number, scale: number): string {
  const y = 250;
  return `<g>
    <rect x="${x - 12 * scale}" y="${y + 40 * scale}" width="${24 * scale}" height="${150 * scale}" rx="${8 * scale}" fill="#c9844a" ${ink()}/>
    <path d="M${x - 6 * scale} ${y + 60 * scale} v${70 * scale}" stroke="#f6d7b0" stroke-width="2" opacity=".45" fill="none"/>
    <ellipse cx="${x}" cy="${y}" rx="${78 * scale}" ry="${58 * scale}" fill="#3d9a55" ${ink()}/>
    <ellipse cx="${x - 36 * scale}" cy="${y + 16 * scale}" rx="${40 * scale}" ry="${32 * scale}" fill="#5cb87a" ${ink(2.6)}/>
    <ellipse cx="${x + 40 * scale}" cy="${y + 18 * scale}" rx="${38 * scale}" ry="${30 * scale}" fill="#8ed9a0" ${ink(2.6)}/>
    <ellipse cx="${x - 10 * scale}" cy="${y - 16 * scale}" rx="${28 * scale}" ry="${16 * scale}" fill="#b6f0c0" opacity=".55"/>
    <circle cx="${x - 20 * scale}" cy="${y - 8 * scale}" r="${6 * scale}" fill="#ff8fab"/>
    <circle cx="${x + 18 * scale}" cy="${y + 6 * scale}" r="${5 * scale}" fill="#ffd166"/>
    <circle cx="${x + 4 * scale}" cy="${y - 22 * scale}" r="${5 * scale}" fill="#fff"/>
  </g>`;
}

function bloom(x: number, y: number, color: string, r = 7): string {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" ${ink(2)}/><circle cx="${x - r * 0.25}" cy="${y - r * 0.28}" r="${r * 0.28}" fill="#fff" opacity=".75"/>`;
}

function grassBits(): string {
  let s = '';
  for (let i = 0; i < 90; i++) {
    const x = 660 + ((i * 137) % 1500);
    const y = 445 + ((i * 53) % 140);
    const h = 10 + (i % 6) * 2;
    s += `<path d="M${x} ${y} q${(i % 5) - 2} ${-h} 3 ${-h - 3}" fill="none" stroke="#2f8a48" stroke-width="1.5" opacity=".28" stroke-linecap="round"/>`;
  }
  for (let i = 0; i < 16; i++) {
    const x = 720 + ((i * 173) % 1200);
    const y = 470 + ((i * 67) % 110);
    s += `<circle cx="${x}" cy="${y}" r="3.2" fill="#7dce8a"/><circle cx="${x + 5}" cy="${y + 1}" r="3.2" fill="#8ed9a0"/><circle cx="${x + 2}" cy="${y - 4}" r="3.2" fill="#b6f0c0"/>`;
  }
  return s;
}

/** Full-world outdoor paint. The stage camera crops it to the same window as every other room. */
export function yardBackyardScenery(): string {
  const flowers = [
    [760, 500, '#ff8fab'], [790, 512, '#ffd166'], [830, 496, '#fff'],
    [1188, 470, '#ff8fab'], [1220, 488, '#c9a0dc'], [1254, 468, '#ffd166'],
    [980, 455, '#fff'], [1010, 448, '#ffb3c6'],
  ].map(([x, y, c]) => bloom(Number(x), Number(y), String(c), 6)).join('');
  return `<svg class="yardWorld" viewBox="0 0 2400 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${lin('ydsky', '#eaf7ff', '#8ec8f0')}
      ${lin('ydgrass', '#d9f5b8', '#67b86a')}
      ${lin('ydwall', '#fffaf3', '#f0e0cf')}
      ${lin('yddoor', '#f7e7ff', '#c9a0dc')}
      ${lin('ydroof', '#ffd0e0', '#ff8fab')}
    </defs>
    <rect width="2400" height="430" fill="url(#ydsky)"/>
    <rect y="300" width="2400" height="130" fill="#fff6e4" opacity=".28"/>
    <circle cx="1188" cy="78" r="78" fill="#ffe566" opacity=".18"/>
    <circle cx="1188" cy="78" r="34" fill="#ffe566"/>
    <circle cx="1176" cy="66" r="10" fill="#fff" opacity=".7"/>
    ${cloud(760, 58, 1.25)}${cloud(980, 112, 0.9)}${cloud(1180, 52, 1.05)}${cloud(1380, 96, 0.8)}${cloud(560, 100, 0.75)}
    <ellipse cx="1400" cy="392" rx="980" ry="40" fill="#c6e8a4" opacity=".7"/>
    ${pickets(880, 2200, 328, 414, 26)}
    <rect y="400" width="2400" height="200" fill="url(#ydgrass)"/>
    <rect y="430" width="2400" height="28" fill="#fff" opacity=".08"/>
    <rect y="500" width="2400" height="22" fill="#2f8a48" opacity=".05"/>
    <rect y="545" width="2400" height="18" fill="#fff" opacity=".06"/>
    ${grassBits()}
    <path d="M800 446 C 880 500, 960 540, 1080 592" fill="none" stroke="#e6c48a" stroke-width="46" stroke-linecap="round"/>
    <path d="M800 446 C 880 500, 960 540, 1080 592" fill="none" stroke="#f6e2b6" stroke-width="22" stroke-linecap="round"/>
    <ellipse cx="860" cy="490" rx="16" ry="8" fill="#f7edd4" ${ink(2)} opacity=".85"/>
    <ellipse cx="960" cy="540" rx="18" ry="8" fill="#f7edd4" ${ink(2)} opacity=".85"/>
    <ellipse cx="1048" cy="576" rx="16" ry="7" fill="#f7edd4" ${ink(2)} opacity=".85"/>
    ${tree(1010, 1.05)}
    ${tree(1260, 0.82)}
    <path d="M640 176 H910 L890 196 H660 Z" fill="url(#ydroof)" ${ink()}/>
    ${hi('M670 182 h120', 3)}
    <rect x="662" y="192" width="228" height="236" rx="8" fill="url(#ydwall)" ${ink()}/>
    ${grain('M678 214 H874 M678 236 H874 M678 258 H874 M678 280 H874 M678 302 H874 M678 324 H874 M678 346 H874 M678 368 H874 M678 390 H874')}
    <rect x="748" y="248" width="78" height="176" rx="8" fill="url(#yddoor)" ${ink()}/>
    <rect x="760" y="262" width="54" height="36" rx="6" fill="#c9ecff" ${ink(2.2)}/>
    <path d="M787 262 V298 M760 280 H814" ${ink(2)}/>
    <circle cx="774" cy="274" r="6" fill="#fff" opacity=".7"/>
    <rect x="762" y="312" width="50" height="48" rx="4" fill="#f3e4ff" ${ink(2)}/>
    <rect x="762" y="368" width="50" height="44" rx="4" fill="#f3e4ff" ${ink(2)}/>
    ${hi('M766 318 v28')}
    <circle cx="804" cy="352" r="4" fill="#ffd166" ${ink(1.6)}/>
    <rect x="820" y="230" width="58" height="50" rx="8" fill="#c9ecff" ${ink()}/>
    <path d="M849 230 V280 M820 255 H878" ${ink(2.2)}/>
    <path d="M814 230 q6 16 0 28" fill="none" stroke="#ff8fab" stroke-width="8" stroke-linecap="round"/>
    <path d="M884 230 q-6 16 0 28" fill="none" stroke="#ff8fab" stroke-width="8" stroke-linecap="round"/>
    <rect x="816" y="276" width="66" height="10" rx="3" fill="#ffe7c2" ${ink(2)}/>
    ${bloom(830, 272, '#ff8fab', 4)}${bloom(848, 270, '#ffd166', 4)}${bloom(866, 272, '#fff', 4)}
    <rect x="652" y="420" width="248" height="16" rx="4" fill="#e7d3b0" ${ink(2.4)}/>
    <ellipse cx="800" cy="448" rx="36" ry="8" fill="#d7b48a" ${ink(2)}/>
    ${flowers}
    ${bloom(740, 560, '#ff8fab', 8)}${bloom(768, 574, '#ffd166', 7)}${bloom(792, 552, '#fff', 6)}
    ${bloom(1148, 575, '#c9a0dc', 7)}${bloom(1176, 560, '#ff8fab', 8)}${bloom(1160, 588, '#ffd166', 6)}
    ${pickets(1088, 1500, 286, 508, 34)}
  </svg>`;
}

function doorBox(x: number, y: number, w: number, h: number): string {
  const left = (x - w / 2) / 2400 * 100;
  const top = (y - h) / 600 * 100;
  return `left:${left.toFixed(3)}%;top:${top.toFixed(3)}%;width:${(w / 2400 * 100).toFixed(3)}%;height:${(h / 600 * 100).toFixed(3)}%`;
}

const livingDoorArt = `<svg class="doorArt" viewBox="0 0 100 150">
  <defs>${lin('ydldoor', '#f7e7ff', '#c9a0dc')}${lin('ydlframe', '#fff6ea', '#f0d8c4')}</defs>
  <ellipse cx="50" cy="146" rx="36" ry="4" fill="${O}" opacity=".1"/>
  <rect x="8" y="8" width="84" height="136" rx="10" fill="url(#ydlframe)" ${ink()}/>
  <rect x="18" y="18" width="64" height="114" rx="6" fill="url(#ydldoor)" ${ink()}/>
  <rect x="26" y="26" width="48" height="32" rx="5" fill="#c9ecff" ${ink(2.2)}/>
  <path d="M50 26 V58 M26 42 H74" ${ink(2)}/>
  <circle cx="38" cy="34" r="5" fill="#fff" opacity=".75"/>
  <rect x="26" y="66" width="48" height="28" rx="4" fill="#f3e4ff" ${ink(2)}/>
  <rect x="26" y="98" width="48" height="26" rx="4" fill="#f3e4ff" ${ink(2)}/>
  ${hi('M30 70 v16')}
  <circle cx="66" cy="92" r="4" fill="#ffd166" ${ink(1.6)}/>
  <rect x="16" y="132" width="68" height="8" rx="3" fill="#e7d3b0" ${ink(2)}/>
</svg>`;

/** Living-room door is drawn on the button. The yard door is painted in the scenery; the button is the hint. */
export function yardDoorMarkup(where: 'living' | 'yard'): string {
  if (where === 'living') {
    return `<button type="button" class="yardDoor" data-yard-go="backyard" aria-label="Backyard" style="${doorBox(820, 508, 150, 240)}">${livingDoorArt}<span class="yardHintLabel"><span>Backyard</span></span></button>`;
  }
  return `<button type="button" class="yardDoor yardHint" data-yard-go="living" aria-label="Back inside" style="${doorBox(786, 448, 100, 310)}"><span class="yardHintLabel"><span>Back inside</span></span></button>`;
}

export function yardSheetHTML(): string {
  const cards = YARD_ITEMS.map(d => `<figure class="ysCard"><div class="ysArt">${svgOf(d)}</div><figcaption>${d.name.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!))}</figcaption></figure>`).join('');
  return `<div class="yardSheet" data-yard-sheet="1"><h1>Backyard pieces</h1><div class="ysGrid">${cards}</div></div>`;
}
