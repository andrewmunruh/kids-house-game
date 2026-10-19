// Bathroom art, drawn to docs/art-style-v2 (plum outline, top-left light,
// a two-tone cel side plane, a white edge tick, light texture, two-ellipse
// plum contact shadow). No blur, no filter. Gradients are not used: glass is
// two flat tones plus a white tick, so two copies of a piece never share an id.
import type { ItemDef } from './items';

const O = '#5a3d5c';
const ink = (w = 3.5) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const I = ink();
const S = ink(2.2);
const vein = `fill="none" stroke="${O}" stroke-width="1.1" stroke-linecap="round" opacity=".22"`;

function shadow(cx = 50, rx = 36, floor = 97): string {
  const inner = Math.max(8, Math.round(rx * 0.62));
  return `<ellipse cx="${cx}" cy="${(floor - 0.6).toFixed(1)}" rx="${rx}" ry="3.4" fill="${O}" opacity=".08"/><ellipse cx="${cx}" cy="${(floor + 0.6).toFixed(1)}" rx="${inner}" ry="1.55" fill="${O}" opacity=".12"/>`;
}
const hi = (d: string) => `<path d="${d}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`;

function daisy(x: number, y: number): string {
  return `<g transform="translate(${x} ${y})"><circle cx="0" cy="-3.4" r="2.2" fill="#fff" ${S}/><circle cx="3.2" cy="-1" r="2.2" fill="#fff" ${S}/><circle cx="2" cy="3" r="2.2" fill="#fff" ${S}/><circle cx="-2" cy="3" r="2.2" fill="#fff" ${S}/><circle cx="-3.2" cy="-1" r="2.2" fill="#fff" ${S}/><circle cx="0" cy="0" r="1.7" fill="#ffe08a" ${S}/></g>`;
}

// Solid tub: filled body, roll rim, claw feet, water and bubbles.
const tub = `${shadow(70, 52)}
<path d="M26 78 L20 94 M46 80 L42 94 M96 80 L100 94 M116 78 L122 94" ${I}/>
<path d="M16 88 h12 l2 8 h-14 z M38 88 h12 l1 8 h-14 z M94 88 h12 l2 8 h-14 z M112 88 h12 l1 8 h-14 z" fill="#e7b56e" ${S}/>
<path d="M18 88 h8 l1 5 h-8 z M40 88 h8 l1 5 h-8 z M96 88 h8 l1 5 h-8 z M114 88 h8 l1 5 h-8 z" fill="#c9924a"/>
<path d="M14 58 Q14 86 34 90 H106 Q126 86 126 58 V48 H14 Z" fill="#f7fbff" ${I}/>
<path d="M78 52 H124 V60 Q124 84 106 88 H78 Z" fill="#d5e6f0"/>
<ellipse cx="70" cy="62" rx="46" ry="14" fill="#9fd4ee" ${S}/>
<ellipse cx="70" cy="60" rx="40" ry="10" fill="#c5e8f6"/>
<path d="M86 54 H112 Q116 62 108 68 H86 Z" fill="#8ec4e0"/>
<ellipse cx="46" cy="56" rx="14" ry="8" fill="#fff" ${S}/><ellipse cx="70" cy="52" rx="16" ry="9" fill="#fff" ${S}/><ellipse cx="96" cy="56" rx="12" ry="7" fill="#fff" ${S}/>
<circle cx="56" cy="54" r="4.2" fill="#fff" ${S}/><circle cx="82" cy="53" r="3.4" fill="#fff" ${S}/>
<path d="M10 50 Q70 34 130 50 Q70 66 10 50 Z" fill="#fff" ${I}/>
<path d="M78 42 H126 V52 Q108 62 78 52 Z" fill="#e4eef4"/>
${hi('M24 52 Q48 42 66 48')}
<path d="M18 64 H40 M96 66 H118" ${vein}/>
<path d="M108 28 H126 Q132 28 132 36 V58 H116 V40 H108 Z" fill="#f4f7f8" ${S}/>
<path d="M118 30 H130 V54 H118 Z" fill="#c5d0d8"/>
<circle cx="124" cy="24" r="5" fill="#f0c36a" ${S}/><path d="M116 20 H126" ${S}/>
${hi('M110 34 H120')}`;

// Stall with a filled curtain, head, and tray. The rod holds the curtain, not a towel.
const shower = `${shadow(45, 28, 116)}
<path d="M12 96 H78 L72 112 H18 Z" fill="#f7fbff" ${I}/>
<path d="M50 98 H76 L72 110 H52 Z" fill="#d5e6f0"/>
<rect x="16" y="28" width="56" height="70" rx="8" fill="#e7f6ff" ${I}/>
<path d="M46 32 H68 V94 H46 Z" fill="#b9ddf4"/>
<path d="M22 40 H66 M22 54 H66 M22 68 H66" ${vein}/>
<path d="M12 22 H78" fill="none" stroke="#d4a373" stroke-width="6" stroke-linecap="round"/>
<path d="M12 22 H78" fill="none" ${S}/>
<path d="M16 24 Q14 70 20 100 Q34 78 30 24 Z" fill="#ffb7cc" ${I}/>
<path d="M24 30 Q26 72 28 96 Q34 74 32 30 Z" fill="#e888a8"/>
${hi('M18 36 Q20 60 21 82')}
<rect x="40" y="6" width="12" height="18" rx="4" fill="#f4f7f8" ${S}/>
<path d="M46 8 H52 V22 H46 Z" fill="#c5d0d8"/>
<circle cx="46" cy="24" r="6" fill="#e8eef2" ${S}/>
<path d="M42 32 V48 M48 32 V44 M44 36 V50" stroke="#8ecae6" stroke-width="2" stroke-linecap="round"/>
<rect x="60" y="58" width="10" height="6" rx="3" fill="#f0c36a" ${S}/>
${hi('M22 36 V78')}`;

// Cabinet on the floor, round mirror stacked above it.
const vanity = `${shadow(40, 28, 116)}
<rect x="8" y="62" width="64" height="46" rx="8" fill="#fff" ${I}/>
<path d="M44 64 H70 V106 H44 Q48 84 44 64 Z" fill="#e7eef3"/>
<path d="M8 84 H72" ${S}/>
<circle cx="22" cy="74" r="2.6" fill="${O}"/><circle cx="58" cy="74" r="2.6" fill="${O}"/>
<circle cx="22" cy="96" r="2.6" fill="${O}"/><circle cx="58" cy="96" r="2.6" fill="${O}"/>
<path d="M14 70 H28 M48 92 H60" ${vein}/>
<ellipse cx="40" cy="58" rx="22" ry="6" fill="#f4f7f8" ${S}/>
<path d="M40 54 H60 Q64 58 58 62 H40 Z" fill="#d5e0e8"/>
<ellipse cx="40" cy="52" rx="10" ry="4" fill="#c5e8f6" ${S}/>
<path d="M28 48 H34" ${S}/><path d="M48 48 H54" ${S}/>
<circle cx="40" cy="28" r="22" fill="#f0c36a" ${I}/>
<circle cx="40" cy="28" r="16" fill="#eaf6ff" ${S}/>
<path d="M40 14 A14 14 0 0 1 54 28 V14 Z" fill="#c5dff5"/>
${hi('M28 22 Q32 16 40 18')}
<path d="M36 6 H44" ${S}/>`;

// Side view: tall tank joined to a rounded bowl, lid and seat on top, pedestal under the bowl.
const toilet = `${shadow(48, 26, 116)}
<path d="M38 104 H60 L56 116 H42 Z" fill="#f7fbff" ${I}/>
<path d="M50 104 H60 L56 116 H52 Z" fill="#d5e6f0"/>
<rect x="4" y="14" width="40" height="72" rx="7" fill="#f7fbff" ${I}/>
<path d="M30 16 H42 V84 H30 Q34 50 30 16 Z" fill="#d5e6f0"/>
<path d="M2 14 H46 Q48 4 24 4 Q2 4 2 14 Z" fill="#fff" ${I}/>
<path d="M30 6 H44 Q46 12 42 16 H30 Z" fill="#e4eef4"/>
<circle cx="20" cy="40" r="4.6" fill="#f4f7f8" ${S}/>
<circle cx="20" cy="40" r="1.8" fill="#f0c36a"/>
${hi('M8 22 H22')}
<path d="M24 74 H66 Q82 74 82 88 Q82 106 58 110 H40 Q22 106 24 90 V74 Z" fill="#f7fbff" ${I}/>
<path d="M58 78 H80 Q82 90 74 108 H58 Z" fill="#d5e6f0"/>
<path d="M28 74 Q54 62 80 74 Q82 84 72 88 H36 Q26 84 28 74 Z" fill="#fff" ${I}/>
<path d="M54 66 H78 Q82 76 72 86 H54 Z" fill="#e7eef3"/>
<path d="M32 82 Q54 94 78 82" fill="none" ${S}/>
${hi('M34 72 Q46 66 56 70')}
${daisy(52, 74)}`;

// Two filled rails, rungs, and towels draped over them.
const ladder = `${shadow(50, 28)}
<path d="M30 14 H42 L40 92 H26 Z" fill="#f3d2aa" ${I}/>
<path d="M36 16 H42 L40 90 H36 Z" fill="#e7b56e"/>
<path d="M62 14 H74 L78 92 H64 Z" fill="#e7b56e" ${I}/>
<path d="M68 16 H74 L78 90 H70 Z" fill="#c9924a"/>
<path d="M28 36 H76 V44 H28 Z" fill="#f0d2b0" ${S}/>
<path d="M27 54 H77 V62 H27 Z" fill="#e7c49a" ${S}/>
<path d="M26 72 H78 V80 H26 Z" fill="#f0d2b0" ${S}/>
<path d="M32 30 H70 Q66 48 50 48 Q34 48 32 30 Z" fill="#fff6f2" ${I}/>
<path d="M52 32 H68 Q66 46 54 46 H52 Z" fill="#ffd6e4"/>
<path d="M36 40 H48 M56 38 H66" stroke="#8ecae6" stroke-width="2.4" stroke-linecap="round"/>
<path d="M30 58 H72 Q66 78 50 78 Q34 78 30 58 Z" fill="#ffb7cc" ${I}/>
<path d="M52 60 H70 Q66 76 54 76 H52 Z" fill="#e888a8"/>
${hi('M36 34 H52')}<path d="M34 20 H40" ${vein}/>`;

const towelBar = `<path d="M16 34 H114" stroke="#d4a373" stroke-width="7" stroke-linecap="round"/>
<path d="M16 34 H114" fill="none" ${S}/>
<circle cx="18" cy="34" r="6" fill="#f3d2aa" ${S}/><circle cx="112" cy="34" r="6" fill="#e7b56e" ${S}/>
<path d="M28 30 H102 L96 82 H34 Z" fill="#fff6f2" ${I}/>
<path d="M68 32 H100 L96 80 H70 Z" fill="#ffe4ea"/>
<path d="M40 46 H90 M42 58 H88 M44 70 H86" stroke="#8ecae6" stroke-width="3.2" stroke-linecap="round"/>
<path d="M48 46 H60 M72 58 H84" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/>
${hi('M36 40 H62')}`;

const cubby = `${shadow(50, 32)}
<rect x="10" y="12" width="80" height="78" rx="8" fill="#f3d2aa" ${I}/>
<path d="M58 14 H88 V88 H58 Z" fill="#e7b56e"/>
<path d="M10 38 H90 M10 64 H90" ${S}/>
<path d="M16 20 H40 M18 28 H34" ${vein}/>
<path d="M18 22 H42 L40 34 H20 Z" fill="#fff" ${S}/>
<path d="M46 20 H66 L64 34 H48 Z" fill="#bde0fe" ${S}/>
<path d="M70 18 H84 V34 H70 Z" fill="#c5e8f6" ${S}/>
<rect x="74" y="16" width="6" height="5" rx="1" fill="#f4f7f8" ${S}/>
<path d="M18 44 H48 Q44 60 32 60 Q16 60 18 44 Z" fill="#ffb7cc" ${S}/>
<path d="M52 46 H80 L76 60 H56 Z" fill="#fff6f2" ${S}/>
<path d="M58 48 H76 L74 58 H60 Z" fill="#ffd6e4"/>
${hi('M16 18 H36')}`;

const hamper = `${shadow(50, 34)}
<path d="M18 38 H82 L90 90 H10 Z" fill="#c9a0dc" ${I}/>
<path d="M56 40 H82 L90 88 H60 Z" fill="#b388d6"/>
<path d="M16 52 H84 M18 66 H86 M20 78 H84" ${vein}/>
<ellipse cx="50" cy="38" rx="36" ry="12" fill="#f6e9ff" ${I}/>
<path d="M50 28 H84 Q86 38 78 46 H50 Z" fill="#e4ccf2"/>
${hi('M22 36 Q36 28 48 32')}
<path d="M36 46 H68 L62 66 H42 Z" fill="#ffb7cc" ${S}/>
<path d="M52 48 H66 L62 64 H52 Z" fill="#e888a8"/>`;

const step = `${shadow(50, 34)}
<path d="M18 92 V64 H82 V92" fill="#e7c49a" ${I}/>
<path d="M58 66 H82 V92 H58 Z" fill="#d4a373"/>
<path d="M10 62 L22 50 H78 L90 62 Z" fill="#f3d2aa" ${I}/>
<path d="M56 52 H78 L90 62 H64 Z" fill="#e7b56e"/>
<path d="M10 62 H90 V72 H10 Z" fill="#e7c49a" ${S}/>
<path d="M62 64 H90 V72 H62 Z" fill="#d4a373"/>
<path d="M28 50 V28 H72 V50" fill="#f3d2aa" ${I}/>
<path d="M56 30 H72 V50 H56 Z" fill="#e7b56e"/>
<path d="M22 30 L32 18 H68 L78 30 Z" fill="#f3d2aa" ${I}/>
<path d="M54 20 H68 L78 30 H58 Z" fill="#e7b56e"/>
${hi('M16 58 H42')}<path d="M30 24 H52" ${vein}/>`;

const cupboard = `${shadow(40, 26, 116)}
<rect x="10" y="8" width="60" height="102" rx="8" fill="#f7fbff" ${I}/>
<path d="M44 10 H68 V108 H44 Z" fill="#d5e6f0"/>
<path d="M40 8 V110" ${S}/>
<rect x="16" y="20" width="18" height="32" rx="3" fill="#fff" ${S}/>
<rect x="46" y="20" width="16" height="32" rx="3" fill="#eaf6ff" ${S}/>
<rect x="16" y="64" width="18" height="32" rx="3" fill="#fff" ${S}/>
<rect x="46" y="64" width="16" height="32" rx="3" fill="#eaf6ff" ${S}/>
<circle cx="32" cy="36" r="2.2" fill="${O}"/><circle cx="52" cy="36" r="2.2" fill="${O}"/>
<circle cx="32" cy="80" r="2.2" fill="${O}"/><circle cx="52" cy="80" r="2.2" fill="${O}"/>
${hi('M14 16 H32')}<path d="M18 70 H30" ${vein}/>`;

const mat = `<path d="M8 28 Q22 10 36 28 Q50 10 64 28 Q78 10 92 28 Q106 10 120 28 Q132 10 132 36 Q132 52 120 52 Q106 70 92 52 Q78 70 64 52 Q50 70 36 52 Q22 70 8 52 Q-2 40 8 28 Z" fill="#fff6f2" ${I}/>
<path d="M70 22 Q82 14 94 28 Q106 16 118 32 Q124 46 116 52 Q104 64 92 52 Q80 64 70 48 Z" fill="#ffd6e4"/>
<ellipse cx="64" cy="40" rx="36" ry="12" fill="#ffe4ea"/>
${hi('M20 30 Q40 20 56 28')}<path d="M28 42 H52 M78 44 H100" ${vein}/>`;

const ducky = `${shadow(50, 26)}
<ellipse cx="44" cy="68" rx="30" ry="20" fill="#ffe08a" ${I}/>
<path d="M50 52 H76 V84 H54 Q48 70 50 52 Z" fill="#f4c95d"/>
<circle cx="64" cy="40" r="18" fill="#ffe08a" ${I}/>
<path d="M68 26 H80 V54 H68 Q74 40 68 26 Z" fill="#f4c95d"/>
<path d="M76 38 L94 44 L76 52 Z" fill="#f4a261" ${S}/>
<circle cx="58" cy="38" r="2.4" fill="${O}"/>
${hi('M28 60 Q38 52 48 56')}<path d="M22 86 Q32 78 42 86" fill="none" ${S}/>`;

const soap = `${shadow(50, 26)}
<path d="M12 60 Q16 36 50 32 Q84 36 88 60 Q84 86 50 90 Q16 86 12 60 Z" fill="#fff6f2" ${I}/>
<path d="M54 36 Q80 42 84 60 Q80 82 54 86 Z" fill="#ffd6e4"/>
<path d="M26 58 Q50 72 74 58" ${vein}/>
<rect x="28" y="46" width="40" height="20" rx="8" fill="#bde0fe" ${S}/>
<path d="M50 48 H66 V64 H50 Z" fill="#8ecae6"/>
${hi('M32 50 H46')}`;

const bottle = `${shadow(50, 16)}
<rect x="38" y="8" width="24" height="10" rx="3" fill="#f0c36a" ${S}/>
<path d="M54 10 H66 L64 6 H56 Z" fill="#f4f7f8" ${S}/>
<rect x="44" y="18" width="12" height="10" fill="#f7fbff" ${S}/>
<path d="M30 32 H70 L64 86 Q50 96 36 86 Z" fill="#d7f3ff" ${I}/>
<path d="M52 34 H70 L64 84 Q56 92 52 84 Z" fill="#a9dff6"/>
${hi('M36 42 Q42 36 48 42')}<circle cx="42" cy="58" r="4" fill="#fff" opacity=".9"/><circle cx="54" cy="70" r="3" fill="#fff" opacity=".8"/>`;

const machine = `${shadow(50, 28)}
<rect x="14" y="46" width="72" height="42" rx="16" fill="#d7f3ff" ${I}/>
<path d="M52 48 H84 V86 H52 Q64 66 52 48 Z" fill="#a9dff6"/>
<rect x="32" y="28" width="28" height="20" rx="8" fill="#f7fbff" ${S}/>
<path d="M48 30 H58 V46 H48 Z" fill="#d5e6f0"/>
<circle cx="46" cy="24" r="9" fill="#c5e8f6" ${I}/>
<path d="M46 16 H54 V24 H46 Z" fill="#e7eef3"/>
<circle cx="26" cy="16" r="7" fill="#fff" ${S}/><circle cx="22" cy="14" r="2" fill="#fff"/>
<circle cx="70" cy="12" r="5" fill="#eaf6ff" ${S}/>
<circle cx="50" cy="6" r="3.4" fill="#fff" ${S}/>
<circle cx="30" cy="66" r="6" fill="#ffb7cc" ${S}/>
${hi('M22 56 Q34 48 46 54')}`;

const brush = `${shadow(50, 20)}
<path d="M28 42 H72 L68 90 H32 Z" fill="#f7fbff" ${I}/>
<path d="M54 44 H72 L68 88 H54 Z" fill="#d5e6f0"/>
<ellipse cx="50" cy="42" rx="24" ry="8" fill="#fff" ${I}/>
${hi('M34 48 V74')}
<rect x="36" y="16" width="8" height="30" rx="3" fill="#ffb7cc" ${S}/>
<rect x="54" y="12" width="8" height="32" rx="3" fill="#8ecae6" ${S}/>
<path d="M34 16 H46 L44 8 H36 Z" fill="#e888a8" ${S}/>
<path d="M52 12 H64 L62 4 H54 Z" fill="#5eb0d4" ${S}/>`;

const porthole = `<circle cx="50" cy="52" r="40" fill="#f0c36a" ${I}/>
<circle cx="50" cy="52" r="28" fill="#eaf6ff" ${S}/>
<path d="M50 26 A26 26 0 0 1 76 52 V26 Z" fill="#c5dff5"/>
${hi('M30 40 Q38 30 50 32')}
<circle cx="50" cy="8" r="5" fill="#ffb7cc" ${S}/>`;

const tray = `${shadow(50, 42)}
<path d="M6 58 H94 L84 78 H16 Z" fill="#f3d2aa" ${I}/>
<path d="M58 58 H94 L84 78 H62 Z" fill="#e7b56e"/>
${hi('M14 64 H42')}<path d="M22 70 H50" ${vein}/>
<rect x="20" y="36" width="26" height="18" rx="4" fill="#fff" ${S}/>
<path d="M34 38 H44 V52 H34 Z" fill="#e7eef3"/>
<ellipse cx="66" cy="44" rx="16" ry="10" fill="#ffb7cc" ${S}/>
<path d="M66 36 H78 V50 H66 Z" fill="#e888a8"/>`;

const hooks = `<path d="M12 26 H108" stroke="#d4a373" stroke-width="7" stroke-linecap="round"/>
<path d="M12 26 H108" fill="none" ${S}/>
<circle cx="30" cy="26" r="5" fill="#f0c36a" ${S}/><circle cx="58" cy="26" r="5" fill="#f0c36a" ${S}/><circle cx="86" cy="26" r="5" fill="#e7b56e" ${S}/>
<path d="M24 30 Q18 36 26 48 M52 30 Q46 36 54 48 M80 30 Q74 36 82 48" fill="none" ${S}/>
<path d="M66 34 H104 L98 86 H72 Z" fill="#bde0fe" ${I}/>
<path d="M86 36 H104 L98 84 H86 Z" fill="#8ecae6"/>
${hi('M74 46 V72')}`;

const timer = `${shadow(50, 18)}
<path d="M32 14 H68 M32 86 H68" ${I}/>
<path d="M36 18 H64 L54 48 H46 Z" fill="#eaf6ff" ${I}/>
<path d="M54 20 H64 L54 46 H50 Z" fill="#c5dff5"/>
<path d="M36 82 H64 L54 52 H46 Z" fill="#ffe08a" ${I}/>
<path d="M54 80 H64 L54 54 H50 Z" fill="#f4c95d"/>
<rect x="42" y="44" width="16" height="12" rx="3" fill="#d4a373" ${S}/>
${hi('M40 26 H52')}`;

const fern = `${shadow(50, 26)}
<path d="M34 72 H66 L60 96 H40 Z" fill="#e8845a" ${I}/>
<path d="M52 74 H66 L60 94 H52 Z" fill="#c45c38"/>
<rect x="28" y="64" width="44" height="12" rx="4" fill="#f0a078" ${I}/>
<path d="M52 66 H68 V74 H52 Z" fill="#d47848"/>
${hi('M34 68 H48')}
<path d="M50 70 C28 58 16 36 24 14 C36 28 42 48 50 70 Z" fill="#d8f6e4" ${I}/>
<path d="M50 22 C58 36 56 52 50 66 C58 50 60 32 50 22 Z" fill="#52b788"/>
<path d="M50 20 V60" ${vein}/>
<ellipse cx="28" cy="40" rx="16" ry="22" fill="#95d5b2" ${I} transform="rotate(-28 28 40)"/>
<path d="M30 28 C26 42 30 54 42 60" fill="#52b788"/>
<ellipse cx="74" cy="38" rx="14" ry="20" fill="#3d9a68" ${I} transform="rotate(24 74 38)"/>
<path d="M22 58 C16 46 10 44 12 32 C22 40 28 52 32 62 Z" fill="#74c69d" ${S}/>
<path d="M78 56 C84 44 90 40 86 28 C76 38 72 50 70 62 Z" fill="#52b788" ${S}/>`;

const eucalyptus = `<path d="M50 6 V20" ${I}/>
<path d="M24 16 H76" stroke="#d4a373" stroke-width="6" stroke-linecap="round"/>
<path d="M24 16 H76" fill="none" ${S}/>
<path d="M50 22 C38 40 34 52 42 74" fill="none" stroke="#74c69d" stroke-width="3"/>
<ellipse cx="32" cy="34" rx="12" ry="7" fill="#95d5b2" ${I} transform="rotate(-32 32 34)"/>
<ellipse cx="62" cy="36" rx="12" ry="7" fill="#52b788" ${I} transform="rotate(26 62 36)"/>
<ellipse cx="30" cy="52" rx="11" ry="6" fill="#74c69d" ${I} transform="rotate(-18 30 52)"/>
<ellipse cx="64" cy="54" rx="11" ry="6" fill="#3d9a68" ${I} transform="rotate(18 64 54)"/>
<ellipse cx="46" cy="70" rx="10" ry="6" fill="#52b788" ${I}/>
<path d="M34 32 L42 38 M58 34 L66 40" ${vein}/>`;

const succulent = `${shadow(50, 22)}
<path d="M26 64 H74 L68 94 H32 Z" fill="#e7c49a" ${I}/>
<path d="M54 66 H74 L68 92 H54 Z" fill="#d4a373"/>
<ellipse cx="50" cy="60" rx="26" ry="8" fill="#f3d2aa" ${S}/>
<ellipse cx="50" cy="46" rx="10" ry="18" fill="#95d5b2" ${I}/>
<path d="M52 34 V52" fill="#52b788"/>
<ellipse cx="32" cy="50" rx="10" ry="14" fill="#74c69d" ${I} transform="rotate(-30 32 50)"/>
<ellipse cx="68" cy="50" rx="10" ry="14" fill="#3d9a68" ${I} transform="rotate(30 68 50)"/>
<path d="M48 36 V50" ${vein}/>${hi('M32 66 H46')}`;

const aloe = `${shadow(50, 24)}
<path d="M30 72 H70 L64 96 H36 Z" fill="#c9a0dc" ${I}/>
<path d="M54 74 H70 L64 94 H54 Z" fill="#b388d6"/>
<path d="M50 70 L40 22 L60 70 Z" fill="#b7ebc8" ${I}/>
<path d="M52 66 L58 30 L60 68 Z" fill="#52b788"/>
<path d="M50 68 L22 36 L40 72 Z" fill="#74c69d" ${I}/>
<path d="M50 68 L80 38 L62 72 Z" fill="#3d9a68" ${I}/>
<path d="M46 40 L52 32" ${vein}/>
<circle cx="46" cy="48" r="2.2" fill="${O}"/><circle cx="56" cy="48" r="2.2" fill="${O}"/>
<path d="M46 56 Q50 60 54 56" fill="none" ${S}/>
${hi('M38 76 H52')}`;

const lily = `${shadow(50, 26)}
<path d="M28 68 H72 L66 96 H34 Z" fill="#bde0fe" ${I}/>
<path d="M54 70 H72 L66 94 H54 Z" fill="#8ecae6"/>
<ellipse cx="50" cy="64" rx="28" ry="9" fill="#eaf6ff" ${S}/>
<ellipse cx="32" cy="46" rx="16" ry="10" fill="#95d5b2" ${I} transform="rotate(-18 32 46)"/>
<ellipse cx="68" cy="44" rx="16" ry="10" fill="#3d9a68" ${I} transform="rotate(20 68 44)"/>
<ellipse cx="50" cy="34" rx="14" ry="9" fill="#74c69d" ${I}/>
<path d="M50 28 V42" ${vein}/>
<circle cx="50" cy="30" r="6" fill="#ffb7cc" ${S}/>
<circle cx="48" cy="28" r="2" fill="#fff"/>
${hi('M34 72 H48')}`;

const moss = `${shadow(50, 24)}
<path d="M14 58 Q50 44 86 58 Q82 92 50 96 Q18 92 14 58 Z" fill="#e7c49a" ${I}/>
<path d="M54 52 Q82 58 82 74 Q78 90 54 92 Z" fill="#d4a373"/>
<ellipse cx="32" cy="50" rx="14" ry="10" fill="#95d5b2" ${I}/>
<ellipse cx="52" cy="42" rx="16" ry="11" fill="#74c69d" ${I}/>
<ellipse cx="70" cy="50" rx="13" ry="9" fill="#3d9a68" ${I}/>
<path d="M46 44 L54 38" ${vein}/>${hi('M24 62 Q36 56 44 58')}`;

const clover = `${shadow(50, 18)}
<path d="M46 68 V94" stroke="#52b788" stroke-width="4" stroke-linecap="round"/>
<path d="M40 86 H60 L56 98 H44 Z" fill="#e8845a" ${S}/>
<circle cx="36" cy="48" r="14" fill="#b7ebc8" ${I}/>
<circle cx="64" cy="48" r="14" fill="#3d9a68" ${I}/>
<circle cx="50" cy="34" r="14" fill="#74c69d" ${I}/>
<path d="M50 28 V46" ${vein}/>${hi('M28 44 H40')}`;

const sprout = `${shadow(50, 20)}
<path d="M32 74 H68 L62 96 H38 Z" fill="#fff" ${I}/>
<path d="M54 76 H68 L62 94 H54 Z" fill="#e7eef3"/>
<path d="M50 74 V46" stroke="#52b788" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="32" cy="44" rx="16" ry="10" fill="#95d5b2" ${I} transform="rotate(-32 32 44)"/>
<ellipse cx="68" cy="42" rx="16" ry="10" fill="#3d9a68" ${I} transform="rotate(30 68 42)"/>
<circle cx="50" cy="32" r="5" fill="#bde0fe" ${S}/>
<path d="M28 42 L40 36" ${vein}/>${hi('M38 80 H52')}`;

const bamboo = `${shadow(50, 18)}
<rect x="38" y="70" width="24" height="22" rx="4" fill="#e7c49a" ${I}/>
<path d="M52 72 H60 V90 H52 Z" fill="#d4a373"/>
<path d="M44 24 V72" stroke="#95d5b2" stroke-width="8" stroke-linecap="round"/>
<path d="M58 16 V72" stroke="#52b788" stroke-width="8" stroke-linecap="round"/>
<path d="M44 24 V72" fill="none" ${S}/>
<path d="M58 16 V72" fill="none" ${S}/>
<path d="M40 40 H52 M58 34 H70 M40 56 H52" stroke="#3d9a68" stroke-width="2.4" stroke-linecap="round"/>
<ellipse cx="28" cy="34" rx="12" ry="6" fill="#95d5b2" ${I} transform="rotate(-24 28 34)"/>
<ellipse cx="76" cy="28" rx="12" ry="6" fill="#3d9a68" ${I} transform="rotate(18 76 28)"/>
${hi('M42 76 H50')}`;

const herb = `${shadow(50, 16)}
<path d="M34 64 H66 L62 94 H38 Z" fill="#c9a0dc" ${I}/>
<path d="M54 66 H66 L62 92 H54 Z" fill="#b388d6"/>
<path d="M42 64 V34 M50 64 V24 M58 64 V36" stroke="#52b788" stroke-width="3.2" stroke-linecap="round"/>
<ellipse cx="36" cy="38" rx="10" ry="6" fill="#95d5b2" ${I}/><ellipse cx="50" cy="28" rx="10" ry="6" fill="#74c69d" ${I}/>
<ellipse cx="64" cy="40" rx="10" ry="6" fill="#3d9a68" ${I}/>
<path d="M46 30 L54 26" ${vein}/>${hi('M40 70 H52')}`;

export const BATHROOM_ITEMS: ItemDef[] = [
  { kind: 'clawfoot-tub', name: 'Clawfoot Tub', cat: 'furniture', w: 128, h: 100, vb: '0 0 140 100', svg: tub },
  { kind: 'rain-shower', name: 'Rain Shower', cat: 'furniture', w: 82, h: 140, vb: '0 0 90 120', svg: shower },
  { kind: 'mirror-vanity', name: 'Mirror Vanity', cat: 'furniture', w: 82, h: 155, vb: '0 0 80 120', svg: vanity },
  { kind: 'little-toilet', name: 'Little Toilet', cat: 'furniture', w: 64, h: 100, vb: '0 0 80 120', svg: toilet },
  { kind: 'towel-ladder', name: 'Towel Ladder', cat: 'furniture', w: 120, svg: ladder },
  { kind: 'wall-towel-bar', name: 'Wall Towel Bar', cat: 'decor', w: 170, wall: true, vb: '0 0 130 100', svg: towelBar },
  { kind: 'bath-cubby', name: 'Bath Cubby', cat: 'furniture', w: 62, h: 84, svg: cubby },
  { kind: 'clothes-hamper', name: 'Clothes Hamper', cat: 'furniture', w: 130, svg: hamper },
  { kind: 'sink-step', name: 'Sink Step', cat: 'furniture', w: 110, svg: step },
  { kind: 'linen-cupboard', name: 'Linen Cupboard', cat: 'furniture', w: 120, h: 180, vb: '0 0 80 120', svg: cupboard },
  { kind: 'puddle-mat', name: 'Puddle Bath Mat', cat: 'decor', w: 108, h: 62, vb: '0 0 140 80', svg: mat },
  { kind: 'sunny-ducky', name: 'Sunny Ducky', cat: 'decor', w: 80, svg: ducky },
  { kind: 'shell-soap', name: 'Shell Soap Dish', cat: 'decor', w: 70, svg: soap },
  { kind: 'bubble-bottle', name: 'Bubble Bottle', cat: 'decor', w: 55, svg: bottle },
  { kind: 'bubble-machine', name: 'Bubble Machine', cat: 'decor', w: 100, svg: machine },
  { kind: 'brush-cup', name: 'Brush Cup', cat: 'decor', w: 70, svg: brush },
  { kind: 'porthole-mirror', name: 'Porthole Mirror', cat: 'decor', w: 110, wall: true, svg: porthole },
  { kind: 'tub-tray', name: 'Tub Tray', cat: 'decor', w: 160, svg: tray },
  { kind: 'robe-hooks', name: 'Robe Hooks', cat: 'decor', w: 140, wall: true, vb: '0 0 120 100', svg: hooks },
  { kind: 'sand-timer', name: 'Sand Timer', cat: 'decor', w: 60, svg: timer },
  { kind: 'mist-fern', name: 'Mist Fern', cat: 'plants', w: 110, svg: fern },
  { kind: 'hanging-eucalyptus', name: 'Hanging Eucalyptus', cat: 'plants', w: 100, wall: true, svg: eucalyptus },
  { kind: 'pebble-succulent', name: 'Pebble Succulent', cat: 'plants', w: 70, svg: succulent },
  { kind: 'aloe-friend', name: 'Aloe Friend', cat: 'plants', w: 90, svg: aloe },
  { kind: 'lily-pad-pot', name: 'Lily Pad Pot', cat: 'plants', w: 100, svg: lily },
  { kind: 'moss-bowl', name: 'Moss Bowl', cat: 'plants', w: 80, svg: moss },
  { kind: 'clover-sprout', name: 'Clover Sprout', cat: 'plants', w: 70, svg: clover },
  { kind: 'rain-sprout', name: 'Rain Sprout', cat: 'plants', w: 80, svg: sprout },
  { kind: 'window-bamboo', name: 'Window Bamboo', cat: 'plants', w: 80, svg: bamboo },
  { kind: 'bath-herb', name: 'Bath Herb', cat: 'plants', w: 60, svg: herb },
];
