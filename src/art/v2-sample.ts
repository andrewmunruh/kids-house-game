// Opt-in art sample. The catalog strings in items.ts stay the old drawings.
// Turn this on with ?art=v2 (see main.ts) or from the sample page. Nothing here
// is written into a house save, and footprints live on the item, not in this file.
//
// Each piece is a new drawing: real parts, and a hard-edged darker plane on the
// right / lower side. No blur filters. ViewBoxes stay put.

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

function rad(id: string, color: string, a = '.85'): string {
  return `<radialGradient id="${id}" cx="50%" cy="40%" r="55%"><stop offset="0" stop-color="${color}" stop-opacity="${a}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
}

function pack(s: string): string {
  return s.replace(/\n\s*/g, '').trim();
}

const VB = '0 0 100 100';

const MARKS: Record<string, V2Mark> = {
  sofa: { vb: VB, body: pack(`
    ${shadow(50, 40)}
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
    <rect x="77" y="84" width="7" height="10" rx="2" fill="${O}"/>
  `) },

  bed: { vb: VB, body: pack(`
    ${shadow(50, 40)}
    <rect x="4" y="22" width="18" height="72" rx="8" fill="#f0c49a" ${ink()}/>
    <rect x="14" y="26" width="6" height="64" rx="3" fill="#d4925a"/>
    <path d="M8 34 v14 M11 54 v12" fill="none" stroke="${O}" stroke-width="1" stroke-linecap="round" opacity=".2"/>
    <path d="M13 36 C10.5 32 7 34 8.6 38.2 C9.6 40.6 12 43 13 45.2 C14 43 16.4 40.6 17.4 38.2 C19 34 15.5 32 13 36 Z" fill="#fff0f6" ${ink(1.8)}/>
    <rect x="80" y="44" width="16" height="50" rx="7" fill="#e2b07a" ${ink()}/>
    <rect x="88" y="48" width="6" height="42" rx="3" fill="#c4844c"/>
    <rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${ink()}/>
    <rect x="40" y="50" width="54" height="36" rx="12" fill="#c4b5fd" ${ink()}/>
    <rect x="74" y="54" width="16" height="28" rx="8" fill="#9a84e6"/>
    <path d="M50 60 l4.5 4 -4.5 4 -4.5 -4 z M64 64 l4.5 4 -4.5 4 -4.5 -4 z M52 72 l4.5 4 -4.5 4 -4.5 -4 z" fill="#efe8ff" ${ink(1.5)}/>
    <path d="M20 56 q14 8 26 1 q12 7 22 -1" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    <path d="M22 58 q12 6 22 0 q10 6 18 0" fill="none" stroke="#f0c8d6" stroke-width="1.6" stroke-linecap="round"/>
    <rect x="18" y="42" width="24" height="16" rx="8" fill="#fff7f8" ${ink()}/>
    <path d="M24 48 q6 3 12 0" fill="none" stroke="#f0b8c6" stroke-width="1.5" stroke-linecap="round"/>
  `) },

  fridge: { vb: VB, body: pack(`
    ${shadow(50, 32)}
    <rect x="16" y="6" width="68" height="86" rx="14" fill="#c5e4fb" ${ink()}/>
    <rect x="64" y="12" width="16" height="74" rx="6" fill="#7eb4dc"/>
    <path d="M20 40 H80" ${ink()}/>
    <path d="M24 16 v14" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" opacity=".8"/>
    <path d="M24 50 v20" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" opacity=".75"/>
    <rect x="70" y="18" width="6" height="14" rx="3" fill="#f4f1f8" ${ink(2)}/>
    <rect x="71.2" y="20" width="1.8" height="8" rx="1" fill="#fff"/>
    <rect x="70" y="52" width="6" height="20" rx="3" fill="#f4f1f8" ${ink(2)}/>
    <rect x="71.2" y="56" width="1.8" height="12" rx="1" fill="#fff"/>
    <path d="M34 54 C29 49 22 52 25 58 C27 61 32 65 34 65 C36 65 41 61 43 58 C46 52 39 49 34 54 Z" fill="#ff8fab" ${ink(2)}/>
    <path d="M48 64 l2.4 4.8 5.2 .4 -4 3.4 1.2 5 -5 -3 -5 3 1.2 -5 -4 -3.4 5.2 -.4 z" fill="#ffd166" ${ink(2)}/>
    <circle cx="34" cy="74" r="4.2" fill="#ffb3c6" ${ink(2)}/>
    <circle cx="32.8" cy="72.8" r="1.2" fill="#fff" opacity=".8"/>
  `) },

  lamp: { vb: VB, body: pack(`
    <defs>${rad('a2lamp-glow', '#ffd56a', '.95')}</defs>
    ${shadow(50, 22)}
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
    <ellipse cx="42" cy="86" rx="6" ry="2" fill="#fff" opacity=".55"/>
  `) },

  bookshelf: { vb: VB, body: pack(`
    ${shadow(50, 36)}
    <rect x="12" y="6" width="76" height="86" rx="8" fill="#f0d2b0" ${ink()}/>
    <rect x="66" y="10" width="18" height="76" rx="4" fill="#c4844c"/>
    <path d="M18 18 h22 M20 26 h14 M18 72 h20" fill="none" stroke="${O}" stroke-width="1.1" stroke-linecap="round" opacity=".22"/>
    <rect x="16" y="36" width="68" height="7" rx="1" fill="#e0b888" ${ink(2.2)}/>
    <rect x="16" y="34" width="68" height="3" fill="#f8e2c8"/>
    <rect x="16" y="64" width="68" height="7" rx="1" fill="#e0b888" ${ink(2.2)}/>
    <rect x="16" y="62" width="68" height="3" fill="#f8e2c8"/>
    <rect x="18" y="16" width="7" height="18" rx="1" fill="#ff8fab" ${ink(2)}/>
    <rect x="26" y="22" width="6" height="12" rx="1" fill="#8ecae6" ${ink(2)}/>
    <rect x="34" y="12" width="7" height="22" rx="1" fill="#ffd166" ${ink(2)} transform="rotate(-7 37 23)"/>
    <rect x="44" y="18" width="6" height="16" rx="1" fill="#c9a0dc" ${ink(2)}/>
    <path d="M56 20 h8 v5 q-1 5 -4 5 q-3 0 -4 -5 z" fill="#ffe08a" ${ink(2)}/>
    <rect x="58" y="30" width="4" height="5" fill="#e0b060" ${ink(1.6)}/>
    <rect x="59" y="35" width="2" height="2" fill="#c4844c"/>
    <ellipse cx="28" cy="52" rx="7" ry="9" fill="#8fd4ae" ${ink(2)}/>
    <ellipse cx="36" cy="54" rx="6" ry="8" fill="#3d9a68" ${ink(2)}/>
    <path d="M30 64 h8 l-1 4 h-6 z" fill="#e8845a" ${ink(1.8)}/>
    <ellipse cx="34" cy="80" rx="12" ry="7" fill="#ffb3c6" ${ink(2.2)}/>
    <ellipse cx="40" cy="78" rx="5" ry="3" fill="#e888a8"/>
    <rect x="58" y="70" width="8" height="16" rx="1" fill="#90e0a8" ${ink(2)}/>
    <rect x="67" y="74" width="7" height="12" rx="1" fill="#ffd166" ${ink(2)}/>
  `) },

  rug: { vb: VB, body: pack(`
    <path d="M14 78 H6 M14 82 H5 M14 86 H6" fill="none" stroke="#ffb7cc" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M86 78 H94 M86 82 H95 M86 86 H94" fill="none" stroke="#e888a8" stroke-width="2.6" stroke-linecap="round"/>
    <ellipse cx="50" cy="82" rx="38" ry="11" fill="#ffc8dd" ${ink()}/>
    <path d="M18 86 Q50 95 82 86 Q50 90 18 86 Z" fill="#e888a8"/>
    <ellipse cx="50" cy="81" rx="28" ry="6.5" fill="none" stroke="#fff" stroke-width="2"/>
    <ellipse cx="50" cy="81" rx="28" ry="6.5" fill="none" stroke="#e45d88" stroke-width="2" stroke-dasharray="1.4 3.4"/>
    <ellipse cx="50" cy="81" rx="14" ry="3.4" fill="#fff6fa" ${ink(2)}/>
    <circle cx="32" cy="80" r="2" fill="#ff8fab"/>
    <circle cx="44" cy="84" r="1.8" fill="#bde0fe"/>
    <circle cx="58" cy="77" r="1.9" fill="#ffd166"/>
    <circle cx="68" cy="82" r="1.8" fill="#90e0a8"/>
    <path d="M50 79 l1.1 2.2 2.4 .2 -1.8 1.6 .6 2.4 -2.3 -1.4 -2.3 1.4 .6 -2.4 -1.8 -1.6 2.4 -.2 z" fill="#ff8fab"/>
  `) },

  plant: { vb: VB, body: pack(`
    ${shadow(50, 30)}
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
    <path d="M28 62 h14" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>
  `) },

  table: { vb: VB, body: pack(`
    ${shadow(50, 38)}
    <rect x="20" y="46" width="8" height="14" rx="2" fill="#f0b27a" ${ink(2.2)}/>
    <ellipse cx="24" cy="62" rx="8" ry="5" fill="#f4a261" ${ink()}/>
    <rect x="22" y="66" width="5" height="22" rx="2.2" fill="#e08a45" ${ink(2.2)}/>
    <ellipse cx="24.5" cy="90" rx="6" ry="3.2" fill="#d4925a" ${ink(2)}/>
    <rect x="72" y="46" width="8" height="14" rx="2" fill="#d4925a" ${ink(2.2)}/>
    <ellipse cx="76" cy="62" rx="8" ry="5" fill="#c4844c" ${ink()}/>
    <rect x="74" y="66" width="5" height="22" rx="2.2" fill="#b86e38" ${ink(2.2)}/>
    <ellipse cx="76.5" cy="90" rx="6" ry="3.2" fill="#a86834" ${ink(2)}/>
    <path d="M22 70 v8 M26 70 v8 M74 70 v8 M78 70 v8" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".35"/>
    <rect x="6" y="36" width="88" height="12" rx="3" fill="#d4925a" ${ink()}/>
    <path d="M70 38 H90 V46 H70 Z" fill="#c4844c"/>
    <rect x="6" y="24" width="88" height="14" rx="5" fill="#f6c48a" ${ink()}/>
    <path d="M64 26 H90 Q92 26 92 30 V34 H64 Z" fill="#e0a060"/>
    <path d="M14 28 h16 M18 32 h26 M52 29 h14 M16 36 h20" fill="none" stroke="${O}" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>
    <path d="M12 27 h12" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".65"/>
  `) },

  // Pack wardrobe. Same viewBox as assets/items/bedroom/wardrobe.svg.
  'pack:wardrobe': { vb: '7 -1 86 102', body: pack(`
    <ellipse cx="50" cy="96.2" rx="34" ry="3.2" fill="${O}" opacity=".08"/>
    <ellipse cx="50" cy="97.4" rx="20" ry="1.5" fill="${O}" opacity=".12"/>
    <rect x="22" y="88" width="7" height="8" rx="2" fill="${O}"/>
    <rect x="71" y="88" width="7" height="8" rx="2" fill="${O}"/>
    <rect x="14" y="16" width="72" height="72" rx="10" fill="#ead8f6" ${ink()}/>
    <rect x="20" y="24" width="28" height="56" rx="5" fill="#f7ecff" ${ink(2.2)}/>
    <rect x="38" y="28" width="8" height="48" rx="2" fill="#d7b6ea"/>
    <rect x="52" y="24" width="28" height="56" rx="5" fill="#d4b4e4" ${ink(2.2)}/>
    <rect x="70" y="28" width="8" height="48" rx="2" fill="#b07cc8"/>
    <circle cx="44" cy="52" r="3.4" fill="#f6f2fa" ${ink(2)}/><circle cx="43" cy="51" r="1.1" fill="#fff"/>
    <circle cx="56" cy="52" r="3.4" fill="#f6f2fa" ${ink(2)}/><circle cx="55" cy="51" r="1.1" fill="#fff"/>
    <path d="M12 20 Q12 4 26 4 H74 Q88 4 88 20 Z" fill="#dcc2ee" ${ink()}/>
    <path d="M60 8 H82 Q86 8 86 14 V18 H60 Z" fill="#c49ad4"/>
    <path d="M24 8 h16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".6"/>
    <circle cx="30" cy="40" r="3" fill="${O}"/><circle cx="70" cy="40" r="3" fill="${O}"/>
    <circle cx="31" cy="39" r="1" fill="#fff"/><circle cx="71" cy="39" r="1" fill="#fff"/>
    <ellipse cx="30" cy="48" rx="4" ry="2.4" fill="#ff9bb5" opacity=".7"/>
    <ellipse cx="70" cy="48" rx="4" ry="2.4" fill="#ff9bb5" opacity=".7"/>
    <path d="M30 78 C24 75 26 70 30 73 C34 70 36 75 30 78 Z" fill="#ff8fab" ${ink(2.2)}/>
    <path d="M70 78 C64 75 66 70 70 73 C74 70 76 75 70 78 Z" fill="#ff8fab" ${ink(2.2)}/>
  `) },

  teddy: { vb: VB, body: pack(`
    ${shadow(50, 32)}
    <circle cx="26" cy="24" r="10" fill="#e8c09a" ${ink()}/>
    <circle cx="74" cy="24" r="10" fill="#c48a5c" ${ink()}/>
    <circle cx="26" cy="24" r="5" fill="#f6dcc4"/>
    <circle cx="74" cy="24" r="5" fill="#deb08a"/>
    <ellipse cx="50" cy="74" rx="28" ry="22" fill="#e8c09a" ${ink()}/>
    <ellipse cx="64" cy="76" rx="12" ry="16" fill="#c48a5c"/>
    <ellipse cx="48" cy="78" rx="14" ry="11" fill="#f8e6d4" ${ink(2.2)}/>
    <ellipse cx="48" cy="78" rx="10" ry="7.5" fill="none" stroke="${O}" stroke-width="1.3" stroke-dasharray="2.1 1.7"/>
    <path d="M40 62 q-10 -6 -4 3 q4 4 6 -1 z" fill="#ff8fab" ${ink(2)}/>
    <path d="M56 62 q10 -6 4 3 q-4 4 -6 -1 z" fill="#e45d88" ${ink(2)}/>
    <circle cx="48" cy="63" r="3.2" fill="#ff7096" ${ink(2)}/>
    <circle cx="50" cy="42" r="24" fill="#f0d0b0" ${ink()}/>
    <ellipse cx="64" cy="46" rx="9" ry="16" fill="#d4a078"/>
    <path d="M36 32 q6 -4 8 2" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".55"/>
    <circle cx="42" cy="40" r="3" fill="${O}"/><circle cx="58" cy="40" r="3" fill="${O}"/>
    <circle cx="43" cy="39" r="1" fill="#fff"/><circle cx="59" cy="39" r="1" fill="#fff"/>
    <ellipse cx="50" cy="50" rx="7" ry="5" fill="#fff3e0"/>
    <circle cx="50" cy="48.5" r="2.4" fill="${O}"/>
    <ellipse cx="36" cy="48" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>
    <ellipse cx="64" cy="48" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>
  `) },

  window: { vb: VB, body: pack(`
    <defs><linearGradient id="a2win-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff4c8"/><stop offset=".42" stop-color="#b9e4ff"/><stop offset="1" stop-color="#7eb4dc"/></linearGradient></defs>
    <path d="M2 8 C10 28 4 58 8 84 C16 74 18 40 20 10 Z" fill="#ffb7cc" ${ink()}/>
    <path d="M8 16 C12 36 6 58 12 78 C18 66 18 40 22 18 Z" fill="#ff8eae"/>
    <path d="M98 8 C90 28 96 58 92 84 C84 74 82 40 80 10 Z" fill="#e45d88" ${ink()}/>
    <path d="M92 16 C88 36 94 58 88 78 C82 66 82 40 78 18 Z" fill="#e888a8"/>
    <rect x="20" y="12" width="60" height="62" rx="6" fill="#f3d7b8" ${ink()}/>
    <rect x="26" y="18" width="48" height="50" rx="3" fill="url(#a2win-sky)"/>
    <rect x="48" y="18" width="5" height="50" fill="#e8c9a8"/>
    <rect x="26" y="40" width="48" height="5" fill="#e8c9a8"/>
    <rect x="48" y="18" width="2" height="50" fill="#f8e6d0"/>
    <rect x="26" y="40" width="48" height="2" fill="#f8e6d0"/>
    <circle cx="36" cy="28" r="5" fill="#ffe08a"/>
    <ellipse cx="58" cy="30" rx="8" ry="3.5" fill="#fff" opacity=".9"/>
    <ellipse cx="64" cy="32" rx="5" ry="2.6" fill="#fff" opacity=".85"/>
    <path d="M6 62 Q16 54 18 64" fill="none" stroke="#ffd166" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="18" cy="64" r="3.2" fill="#ffd166" ${ink(2)}/>
    <path d="M94 62 Q84 54 82 64" fill="none" stroke="#e0a83a" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="82" cy="64" r="3.2" fill="#e0a83a" ${ink(2)}/>
    <rect x="14" y="72" width="72" height="8" rx="3" fill="#f0d2b0" ${ink()}/>
    <rect x="14" y="78" width="72" height="6" rx="2" fill="#d4a06a" ${ink(2.2)}/>
    <rect x="58" y="80" width="24" height="4" rx="1.5" fill="#c4844c"/>
  `) },

  crib: { vb: VB, body: pack(`
    ${shadow(50, 40)}
    <path d="M50 4 V14" ${ink(2.2)}/>
    <path d="M26 14 H74" ${ink(2.4)}/>
    <path d="M32 14 V24 M50 14 V28 M68 14 V24" fill="none" stroke="${O}" stroke-width="1.7" stroke-linecap="round"/>
    <circle cx="32" cy="28" r="5" fill="#ffd166" ${ink(2)}/>
    <circle cx="50" cy="33" r="5.2" fill="#ff8fab" ${ink(2)}/>
    <path d="M68 28 l5 3.4 -5 3.4 -5 -3.4 z" fill="#8ecae6" ${ink(2)}/>
    <rect x="8" y="38" width="10" height="52" rx="5" fill="#fff" ${ink()}/>
    <rect x="82" y="38" width="10" height="52" rx="5" fill="#7eb4dc" ${ink()}/>
    <rect x="12" y="40" width="76" height="10" rx="5" fill="#c5e8f8" ${ink()}/>
    <rect x="58" y="42" width="26" height="6" rx="3" fill="#7eb4dc"/>
    <rect x="20" y="48" width="7" height="30" rx="3.5" fill="#fff" ${ink(2.2)}/>
    <rect x="34" y="48" width="7" height="30" rx="3.5" fill="#fff" ${ink(2.2)}/>
    <rect x="48" y="48" width="7" height="30" rx="3.5" fill="#f4fbff" ${ink(2.2)}/>
    <rect x="62" y="48" width="7" height="30" rx="3.5" fill="#d7f0fb" ${ink(2.2)}/>
    <rect x="74" y="48" width="7" height="30" rx="3.5" fill="#7eb4dc" ${ink(2.2)}/>
    <rect x="18" y="60" width="64" height="14" rx="4" fill="#ffe0ec"/>
    <ellipse cx="34" cy="66" rx="8" ry="4" fill="#fff" ${ink(2)}/>
    <ellipse cx="50" cy="67" rx="8" ry="4" fill="#d7ecff" ${ink(2)}/>
    <rect x="12" y="76" width="76" height="10" rx="5" fill="#e7f6ff" ${ink()}/>
    <rect x="58" y="78" width="26" height="6" rx="3" fill="#b9dff2"/>
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
