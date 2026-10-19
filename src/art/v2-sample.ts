// Opt-in art sample. The catalog strings in items.ts stay the old drawings.
// Turn this on with ?art=v2 (see main.ts) or from the sample page. Nothing here
// is written into a house save, and footprints live on the item, not in this file.

export interface V2Mark {
  /** viewBox. Built-ins stay 0 0 100 100. Wardrobe keeps the pack viewBox. */
  vb: string;
  body: string;
}

const O = '#5a3d5c';

const ink = (w = 3.5) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

/** Two flat ellipses. Soft contact without a blur filter. */
function shadow(cx = 50, rx = 36): string {
  const inner = Math.round(rx * 0.62);
  return `<ellipse cx="${cx}" cy="96.4" rx="${rx}" ry="3.4" fill="${O}" opacity=".08"/><ellipse cx="${cx}" cy="97.6" rx="${inner}" ry="1.55" fill="${O}" opacity=".12"/>`;
}

/** Top-left light. The far stop is the color the flat art already used. */
function lin(id: string, light: string, deep: string): string {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${deep}"/></linearGradient>`;
}

function rad(id: string, color: string, a = '.7'): string {
  return `<radialGradient id="${id}" cx="32%" cy="28%" r="68%"><stop offset="0" stop-color="${color}" stop-opacity="${a}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
}

function pack(s: string): string {
  return s.replace(/\n\s*/g, '').trim();
}

const VB = '0 0 100 100';

const MARKS: Record<string, V2Mark> = {
  sofa: { vb: VB, body: pack(`
    <defs>${lin('a2sofa-back', '#ffe6ef', '#ffb3c6')}${lin('a2sofa-body', '#ffd4e2', '#ff8fab')}${lin('a2sofa-arm', '#ffb0c8', '#ff7096')}${lin('a2sofa-seat', '#fff4f7', '#ffc2d1')}</defs>
    ${shadow(50, 40)}
    <rect x="6" y="40" width="88" height="40" rx="16" fill="url(#a2sofa-body)" ${ink()}/>
    <rect x="16" y="28" width="68" height="30" rx="12" fill="url(#a2sofa-back)" ${ink()}/>
    <path d="M28 40 h8 M46 37 h10 M64 40 h8" fill="none" stroke="${O}" stroke-width="1.15" stroke-linecap="round" opacity=".18"/>
    <path d="M26 34 q10 -3 18 1" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".6"/>
    <rect x="2" y="48" width="18" height="38" rx="9" fill="url(#a2sofa-arm)" ${ink()}/>
    <rect x="80" y="48" width="18" height="38" rx="9" fill="url(#a2sofa-arm)" ${ink()}/>
    <path d="M8 56 v16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    <rect x="20" y="60" width="60" height="18" rx="8" fill="url(#a2sofa-seat)" ${ink()}/>
    <path d="M34 64 v9 M50 63 v11 M66 64 v9" fill="none" stroke="${O}" stroke-width="1.2" stroke-linecap="round" opacity=".2"/>
    <ellipse cx="42" cy="67" rx="12" ry="3.2" fill="#fff" opacity=".4"/>
    <rect x="24" y="55" width="16" height="13" rx="5" fill="#fff" ${ink(2.2)}/>
    <path d="M28 60 q4 2.5 8 0" fill="none" stroke="#ffb3c6" stroke-width="1.4" stroke-linecap="round"/>
    <rect x="14" y="86" width="6" height="10" rx="2" fill="${O}"/>
    <rect x="80" y="86" width="6" height="10" rx="2" fill="${O}"/>
    <path d="M15.5 88 v5" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".35"/>
  `) },

  bed: { vb: VB, body: pack(`
    <defs>${lin('a2bed-wood', '#f3d2aa', '#c99366')}${lin('a2bed-sheet', '#ffffff', '#f4e6ea')}${lin('a2bed-quilt', '#e6dcff', '#a78bfa')}${lin('a2bed-pillow', '#fff7f8', '#fde2e4')}</defs>
    ${shadow(50, 38)}
    <rect x="4" y="22" width="18" height="72" rx="8" fill="url(#a2bed-wood)" ${ink()}/>
    <path d="M9 32 v18 M13 40 v22 M9 58 v16" fill="none" stroke="${O}" stroke-width="1" stroke-linecap="round" opacity=".16"/>
    <path d="M7 30 v20" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".45"/>
    <rect x="80" y="44" width="16" height="50" rx="7" fill="url(#a2bed-wood)" ${ink()}/>
    <path d="M84 54 v16 M88 62 v14" fill="none" stroke="${O}" stroke-width="1" stroke-linecap="round" opacity=".16"/>
    <rect x="14" y="54" width="76" height="30" rx="10" fill="url(#a2bed-sheet)" ${ink()}/>
    <rect x="40" y="50" width="54" height="36" rx="12" fill="url(#a2bed-quilt)" ${ink()}/>
    <path d="M50 62 q14 7 32 1" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".45"/>
    <path d="M52 70 q12 5 26 0" fill="none" stroke="${O}" stroke-width="1.1" stroke-linecap="round" opacity=".15"/>
    <circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/>
    <rect x="18" y="42" width="24" height="16" rx="8" fill="url(#a2bed-pillow)" ${ink()}/>
    <path d="M24 48 q6 3 12 0" fill="none" stroke="#f7c2cb" stroke-width="1.4" stroke-linecap="round"/>
  `) },

  fridge: { vb: VB, body: pack(`
    <defs>${lin('a2fridge', '#f3fbff', '#bde0fe')}</defs>
    ${shadow(50, 32)}
    <rect x="16" y="4" width="68" height="90" rx="14" fill="url(#a2fridge)" ${ink()}/>
    <path d="M22 14 v16" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".65"/>
    <path d="M16 38 H84" ${ink()}/>
    <rect x="70" y="14" width="5" height="16" rx="2" fill="${O}"/>
    <rect x="70" y="46" width="5" height="22" rx="2" fill="${O}"/>
    <path d="M71.2 16 v10" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".45"/>
    <circle cx="32" cy="22" r="5" fill="#ff8fab" ${ink()}/>
    <rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${ink()}/>
    <path d="M30 56 h4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>
  `) },

  lamp: { vb: VB, body: pack(`
    <defs>${lin('a2lamp-shade', '#fff8e4', '#ffd166')}${lin('a2lamp-stem', '#f0d8f6', '#c9a0dc')}${lin('a2lamp-base', '#e4ccf2', '#b388d6')}${rad('a2lamp-glow', '#fff1c2', '.75')}</defs>
    ${shadow(50, 24)}
    <ellipse cx="50" cy="28" rx="30" ry="22" fill="url(#a2lamp-glow)"/>
    <path d="M24 40 L34 6 H66 L76 40 Z" fill="url(#a2lamp-shade)" ${ink()}/>
    <path d="M32 16 q6 -2 8 4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>
    <rect x="46" y="40" width="8" height="48" rx="4" fill="url(#a2lamp-stem)" ${ink()}/>
    <path d="M48 46 v28" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".4"/>
    <ellipse cx="50" cy="92" rx="22" ry="6" fill="url(#a2lamp-base)" ${ink()}/>
    <ellipse cx="46" cy="90" rx="8" ry="2" fill="#fff" opacity=".45"/>
    <circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>
  `) },

  bookshelf: { vb: VB, body: pack(`
    <defs>${lin('a2shelf-wood', '#f0d2b0', '#d4a373')}</defs>
    ${shadow(50, 36)}
    <rect x="10" y="4" width="80" height="90" rx="10" fill="url(#a2shelf-wood)" ${ink()}/>
    <path d="M16 18 h22 M18 26 h30 M48 16 h16" fill="none" stroke="${O}" stroke-width="1" stroke-linecap="round" opacity=".14"/>
    <path d="M16 10 h24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".4"/>
    <path d="M10 34 H90 M10 64 H90" ${ink()}/>
    <path d="M14 32.2 H86 M14 62.2 H86" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>
    <rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${ink()}/>
    <rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${ink()}/>
    <rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${ink()}/>
    <path d="M19.4 14 v16 M29.4 18 v12 M39.4 14 v16" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".55"/>
    <rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${ink()}/>
    <rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${ink()}/>
    <path d="M61.4 44 v16 M71.4 48 v12" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".55"/>
    <circle cx="34" cy="80" r="8" fill="#ffadad" ${ink()}/>
    <circle cx="31" cy="77" r="2.2" fill="#fff" opacity=".65"/>
  `) },

  rug: { vb: VB, body: pack(`
    <defs>${lin('a2rug-out', '#ffe4ef', '#ffc8dd')}${lin('a2rug-mid', '#e5f4ff', '#bde0fe')}</defs>
    <ellipse cx="50" cy="82" rx="48" ry="14" fill="url(#a2rug-out)" ${ink()}/>
    <path d="M16 80 Q50 74 84 80" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".5"/>
    <path d="M20 86 Q50 91 80 86" fill="none" stroke="${O}" stroke-width="1" stroke-linecap="round" opacity=".14"/>
    <ellipse cx="50" cy="82" rx="34" ry="9" fill="url(#a2rug-mid)" ${ink()}/>
    <path d="M26 80 Q50 76 74 80" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".4"/>
    <ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${ink()}/>
  `) },

  plant: { vb: VB, body: pack(`
    <defs>${lin('a2plant-l', '#c6f0d6', '#74c69d')}${lin('a2plant-r', '#b7ebc8', '#52b788')}${lin('a2plant-m', '#e7f8ee', '#95d5b2')}${lin('a2plant-pot', '#ffd0b0', '#ff9f68')}</defs>
    ${shadow(50, 30)}
    <ellipse cx="34" cy="38" rx="12" ry="26" fill="url(#a2plant-l)" ${ink()} transform="rotate(-25 34 38)"/>
    <ellipse cx="66" cy="38" rx="12" ry="26" fill="url(#a2plant-r)" ${ink()} transform="rotate(25 66 38)"/>
    <ellipse cx="50" cy="30" rx="12" ry="28" fill="url(#a2plant-m)" ${ink()}/>
    <path d="M50 14 v28" fill="none" stroke="${O}" stroke-width="1.2" stroke-linecap="round" opacity=".28"/>
    <path d="M44 24 q6 -6 4 2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>
    <path d="M24 62 H76 L70 94 H30 Z" fill="url(#a2plant-pot)" ${ink()}/>
    <path d="M32 70 q6 2 8 10" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".45"/>
    <rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${ink()}/>
    <ellipse cx="50" cy="64" rx="22" ry="3.2" fill="#c9845a" opacity=".35"/>
    <path d="M28 60 h16" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>
  `) },

  table: { vb: VB, body: pack(`
    <defs>${lin('a2table-top', '#ffd7b0', '#f4a261')}${lin('a2table-leg', '#f0b27a', '#e07a3f')}</defs>
    ${shadow(50, 40)}
    <rect x="4" y="30" width="92" height="14" rx="7" fill="url(#a2table-top)" ${ink()}/>
    <path d="M12 34 h22 M18 38 h34 M48 35 h18" fill="none" stroke="${O}" stroke-width="1" stroke-linecap="round" opacity=".16"/>
    <path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".55" stroke-linecap="round"/>
    <rect x="14" y="42" width="10" height="54" rx="5" fill="url(#a2table-leg)" ${ink()}/>
    <rect x="76" y="42" width="10" height="54" rx="5" fill="url(#a2table-leg)" ${ink()}/>
    <path d="M16.5 48 v30" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".4"/>
  `) },

  // Pack wardrobe. Same viewBox as assets/items/bedroom/wardrobe.svg so the box does not move.
  'pack:wardrobe': { vb: '7 -1 86 102', body: pack(`
    <defs>${lin('a2ward-body', '#f6e9ff', '#c9a0dc')}${lin('a2ward-crown', '#ecd8f8', '#b388d6')}</defs>
    <ellipse cx="50" cy="96.2" rx="36" ry="3.2" fill="${O}" opacity=".08"/>
    <ellipse cx="50" cy="97.4" rx="22" ry="1.5" fill="${O}" opacity=".12"/>
    <rect x="22" y="88" width="7" height="8" rx="2" fill="${O}"/>
    <rect x="71" y="88" width="7" height="8" rx="2" fill="${O}"/>
    <rect x="14" y="8" width="72" height="82" rx="14" fill="url(#a2ward-body)" ${ink()}/>
    <path d="M22 22 q8 2 6 12 M24 42 q10 2 4 14" fill="none" stroke="${O}" stroke-width="1" stroke-linecap="round" opacity=".12"/>
    <rect x="20" y="18" width="26" height="62" rx="8" fill="#f7ecff" stroke="${O}" stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="54" y="18" width="26" height="62" rx="8" fill="#c9a0dc" stroke="${O}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M24 24 v16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".55"/>
    <path d="M50 16 V86" fill="none" stroke="${O}" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="42" y="46" width="4" height="12" rx="2" fill="${O}"/>
    <rect x="54" y="46" width="4" height="12" rx="2" fill="${O}"/>
    <path d="M43 48 v6" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".4"/>
    <path d="M10 12 Q10 2 22 2 H78 Q90 2 90 12 Z" fill="url(#a2ward-crown)" ${ink()}/>
    <path d="M22 5 h20" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".5"/>
    <ellipse cx="22" cy="24" rx="2.5" ry="8" fill="#fff" opacity=".55"/>
    <circle cx="30" cy="34" r="3" fill="${O}"/><circle cx="70" cy="34" r="3" fill="${O}"/>
    <circle cx="31" cy="33" r="1" fill="#fff"/><circle cx="71" cy="33" r="1" fill="#fff"/>
    <ellipse cx="30" cy="42" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>
    <ellipse cx="70" cy="42" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>
    <path d="M30 73.6 C24 70.4 26 65.6 30 68.4 C34 65.6 36 70.4 30 73.6 Z" fill="#ff8fab" ${ink(2.5)}/>
    <path d="M70 73.6 C64 70.4 66 65.6 70 68.4 C74 65.6 76 70.4 70 73.6 Z" fill="#ff8fab" ${ink(2.5)}/>
  `) },

  teddy: { vb: VB, body: pack(`
    <defs>${lin('a2teddy-fur', '#f0cfa6', '#d4a373')}${lin('a2teddy-head', '#f6d7b4', '#e6b88a')}</defs>
    ${shadow(50, 32)}
    <circle cx="26" cy="22" r="10" fill="url(#a2teddy-fur)" ${ink()}/>
    <circle cx="74" cy="22" r="10" fill="url(#a2teddy-fur)" ${ink()}/>
    <circle cx="26" cy="22" r="5" fill="#f3d2b8"/>
    <circle cx="74" cy="22" r="5" fill="#f3d2b8"/>
    <ellipse cx="50" cy="72" rx="28" ry="24" fill="url(#a2teddy-fur)" ${ink()}/>
    <ellipse cx="50" cy="76" rx="14" ry="12" fill="#f6e3cf"/>
    <path d="M42 74 q8 3 16 0 M44 80 q6 2 12 0" fill="none" stroke="${O}" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>
    <circle cx="50" cy="38" r="26" fill="url(#a2teddy-head)" ${ink()}/>
    <path d="M34 30 q6 -4 8 2" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    <circle cx="40" cy="36" r="3" fill="${O}"/><circle cx="60" cy="36" r="3" fill="${O}"/>
    <circle cx="41" cy="35" r="1" fill="#fff"/><circle cx="61" cy="35" r="1" fill="#fff"/>
    <ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/>
    <circle cx="50" cy="46" r="2.5" fill="${O}"/>
    <ellipse cx="32" cy="46" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>
    <ellipse cx="68" cy="46" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>
  `) },

  window: { vb: VB, body: pack(`
    <defs>${lin('a2win-sky', '#eaf6ff', '#a2d2ff')}${lin('a2win-curt', '#ffd5e4', '#ff8fab')}</defs>
    <rect x="12" y="8" width="76" height="76" rx="38" fill="url(#a2win-sky)" ${ink()}/>
    <path d="M50 8 V84 M12 50 H88" ${ink()}/>
    <circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/>
    <path d="M22 26 q8 -2 10 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    <path d="M1 8 Q14 40 7 92 Q16 88 18 86 Q26 42 15 4 Z" fill="url(#a2win-curt)" ${ink()}/>
    <path d="M99 8 Q86 40 93 92 Q84 88 82 86 Q74 42 85 4 Z" fill="url(#a2win-curt)" ${ink()}/>
    <path d="M7 22 q3 16 1 26" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" opacity=".5"/>
    <path d="M91 28 q-2 12 0 20" fill="none" stroke="${O}" stroke-width="1" stroke-linecap="round" opacity=".12"/>
  `) },

  crib: { vb: VB, body: pack(`
    <defs>${lin('a2crib-rail', '#e7f7ff', '#9ad7f5')}${lin('a2crib-bed', '#fff5f8', '#ffe0ec')}</defs>
    ${shadow(50, 40)}
    <rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${ink()}/>
    <path d="M14 36 v10" fill="none" stroke="#e7f4fb" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${ink()}/>
    <path d="M21.6 32 v18" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>
    <rect x="6" y="22" width="88" height="12" rx="6" fill="url(#a2crib-rail)" ${ink()}/>
    <path d="M16 25 h22" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".65"/>
    <rect x="14" y="48" width="72" height="16" rx="6" fill="url(#a2crib-bed)"/>
    <path d="M22 54 q16 4 28 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>
    <ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${ink()}/>
    <ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${ink()}/>
    <path d="M28 55 q3 1.5 6 0" fill="none" stroke="#f3c6d4" stroke-width="1" stroke-linecap="round"/>
  `) },
};

/** Sheet and room order. Display names come from the catalog. */
export const SAMPLE_KINDS = ['sofa', 'bed', 'fridge', 'lamp', 'bookshelf', 'rug', 'plant', 'table', 'pack:wardrobe', 'teddy', 'window', 'crib'] as const;

let on = false;

export function artV2On(): boolean {
  return on;
}

export function setArtV2(v: boolean): void {
  on = v;
}

/** True only when the page was opened with ?art=v2. Not stored on the house. */
export function setArtV2FromSearch(search: string): boolean {
  on = new URLSearchParams(search).get('art') === 'v2';
  return on;
}

export function v2Mark(kind: string): V2Mark | null {
  return MARKS[kind] ?? null;
}

/** Null unless the sample is on, so svgOf keeps drawing the catalog art. */
export function artV2Markup(kind: string): V2Mark | null {
  return on ? v2Mark(kind) : null;
}
