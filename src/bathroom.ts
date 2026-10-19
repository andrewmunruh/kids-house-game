// Bathroom art. The silhouette is the real object first (a toilet, a tub, a
// fern), and the cute detail sits on that shape. Drawn to docs/art-style-v2:
// plum outline, top-left light, a two-tone cel side plane, a white edge tick,
// light texture, two-ellipse plum contact shadow. No blur, no filter.
// Gradients are not used: glass is two flat tones plus a white tick, so two
// copies of a piece never share an id.
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

// Side view of a clawfoot tub: long basin, roll rim, four claw feet, faucet, water.
const tub = `${shadow(70, 52)}
<path d="M24 76 L18 92 M50 78 L46 92 M98 78 L102 92 M120 76 L126 92" ${I}/>
<path d="M14 88 h10 l1 7 h-12 z M40 88 h10 l1 7 h-12 z M92 88 h10 l2 7 h-12 z M114 88 h10 l1 7 h-12 z" fill="#e7b56e" ${S}/>
<path d="M16 90 h6 M42 90 h6 M94 90 h6 M116 90 h6" ${S}/>
<path d="M16 58 Q14 84 36 90 H108 Q128 84 126 58 V50 H16 Z" fill="#f7fbff" ${I}/>
<path d="M80 54 H124 V62 Q122 82 108 88 H80 Z" fill="#d5e6f0"/>
<ellipse cx="72" cy="64" rx="44" ry="12" fill="#7ec8e3" ${S}/>
<ellipse cx="70" cy="62" rx="36" ry="8" fill="#b7e4f6"/>
<path d="M88 56 H114 Q118 64 106 70 H88 Z" fill="#5eb0d4"/>
<ellipse cx="46" cy="56" rx="13" ry="7" fill="#fff" ${S}/><ellipse cx="68" cy="52" rx="15" ry="8" fill="#fff" ${S}/><ellipse cx="94" cy="56" rx="11" ry="6" fill="#fff" ${S}/>
<circle cx="54" cy="54" r="3.6" fill="#fff" ${S}/><circle cx="80" cy="52" r="2.8" fill="#fff" ${S}/>
<path d="M8 52 Q72 36 134 52 Q72 66 8 52 Z" fill="#fff" ${I}/>
<path d="M82 44 H130 V52 Q108 62 82 52 Z" fill="#e4eef4"/>
${hi('M22 52 Q48 44 66 48')}
<path d="M24 68 H46 M96 70 H116" ${vein}/>
<path d="M112 30 H122 V48 H116 Q116 40 112 38 Z" fill="#f4f7f8" ${S}/>
<path d="M116 32 H122 V46 H116 Z" fill="#c5d0d8"/>
<path d="M114 30 Q108 24 104 30" fill="none" ${S}/>
<circle cx="104" cy="28" r="3.4" fill="#f0c36a" ${S}/><circle cx="118" cy="24" r="3.4" fill="#f0c36a" ${S}/>
${hi('M114 36 V44')}`;

// Glass stall, base tray, curtain pulled to the side, rain head.
const shower = `${shadow(45, 28, 116)}
<path d="M10 98 H80 L74 114 H16 Z" fill="#f7fbff" ${I}/>
<path d="M52 100 H78 L74 112 H54 Z" fill="#d5e6f0"/>
<rect x="20" y="32" width="50" height="68" rx="5" fill="#e7f6ff" ${I}/>
<path d="M48 34 H68 V98 H48 Z" fill="#b9ddf4"/>
${hi('M26 42 V92')}
<rect x="56" y="62" width="8" height="5" rx="2" fill="#f0c36a" ${S}/>
<path d="M10 28 H80" stroke="#d4a373" stroke-width="5" stroke-linecap="round"/>
<path d="M10 28 H80" fill="none" ${S}/>
<circle cx="20" cy="28" r="2.4" fill="none" ${S}/><circle cx="28" cy="28" r="2.4" fill="none" ${S}/><circle cx="36" cy="28" r="2.4" fill="none" ${S}/>
<path d="M12 30 C8 52 10 84 16 102 C26 78 22 50 28 30 Z" fill="#ffb7cc" ${I}/>
<path d="M18 32 C16 58 18 86 22 100 C28 76 24 54 30 32 Z" fill="#e888a8"/>
${hi('M14 42 V84')}
<rect x="44" y="8" width="8" height="16" rx="3" fill="#f4f7f8" ${S}/>
<path d="M46 10 H52 V22 H46 Z" fill="#c5d0d8"/>
<circle cx="48" cy="28" r="7" fill="#e8eef2" ${S}/>
<circle cx="46" cy="26" r="1.1" fill="#7ec8e3"/><circle cx="50" cy="26" r="1.1" fill="#7ec8e3"/><circle cx="48" cy="30" r="1.1" fill="#7ec8e3"/>
<path d="M42 38 V54 M48 38 V60 M54 38 V50" stroke="#7ec8e3" stroke-width="2.2" stroke-linecap="round"/>`;

// Cabinet, counter, inset basin and faucet, round mirror above.
const vanity = `${shadow(40, 26, 116)}
<rect x="8" y="72" width="64" height="38" rx="5" fill="#fff" ${I}/>
<path d="M46 74 H70 V108 H46 Z" fill="#e7eef3"/>
<path d="M40 72 V110" ${S}/>
<circle cx="32" cy="92" r="2.2" fill="${O}"/><circle cx="50" cy="92" r="2.2" fill="${O}"/>
${hi('M12 80 H28')}
<path d="M14 100 H30" ${vein}/>
<rect x="6" y="64" width="68" height="10" rx="3" fill="#f7fbff" ${I}/>
<path d="M48 66 H72 V72 H48 Z" fill="#d5e6f0"/>
<ellipse cx="38" cy="68" rx="16" ry="6" fill="#d7eef8" ${S}/>
<ellipse cx="38" cy="68" rx="10" ry="3.4" fill="#9fd4ee"/>
<path d="M30 62 V54 H46 V62" fill="none" ${S}/>
<circle cx="30" cy="52" r="2.6" fill="#f0c36a" ${S}/><circle cx="46" cy="52" r="2.6" fill="#e7b56e" ${S}/>
<circle cx="40" cy="28" r="22" fill="#f0c36a" ${I}/>
<circle cx="40" cy="28" r="16" fill="#eaf6ff" ${S}/>
<path d="M40 14 A14 14 0 0 1 54 28 L40 28 Z" fill="#c5dff5"/>
${hi('M28 20 Q34 14 42 16')}
<path d="M36 4 H44" ${S}/>`;

// Side view: tall tank, oval bowl joined to it, closed lid, seat rim, pedestal.
const toilet = `${shadow(48, 24, 116)}
<path d="M30 104 H66 L70 116 H26 Z" fill="#f7fbff" ${I}/>
<path d="M50 106 H66 L70 116 H52 Z" fill="#d5e6f0"/>
<path d="M38 90 H58 L60 106 H36 Z" fill="#f7fbff" ${I}/>
<path d="M50 92 H58 L60 106 H52 Z" fill="#d5e6f0"/>
<rect x="4" y="18" width="34" height="56" rx="5" fill="#f7fbff" ${I}/>
<path d="M26 20 H36 V72 H26 Q30 46 26 20 Z" fill="#d5e6f0"/>
<path d="M2 18 H40 Q42 8 22 8 Q2 8 2 18 Z" fill="#fff" ${I}/>
<path d="M26 10 H38 Q40 16 36 20 H26 Z" fill="#e4eef4"/>
<circle cx="18" cy="42" r="4.4" fill="#f4f7f8" ${S}/>
<circle cx="18" cy="42" r="1.7" fill="#f0c36a"/>
${hi('M8 26 H20')}
<ellipse cx="46" cy="76" rx="30" ry="18" fill="#f7fbff" ${I}/>
<path d="M46 62 H74 A28 16 0 0 1 70 90 H46 Z" fill="#d5e6f0"/>
<ellipse cx="48" cy="64" rx="26" ry="8" fill="#eef6fb" ${I}/>
<path d="M48 58 H72 A24 7 0 0 1 68 70 H48 Z" fill="#d5e6f0"/>
<ellipse cx="48" cy="61" rx="21" ry="6" fill="#fff" ${I}/>
<path d="M48 57 H66 A18 5 0 0 1 64 65 H48 Z" fill="#e7eef3"/>
${hi('M32 60 Q40 56 48 58')}
${daisy(46, 61)}`;

// Two rails, four rungs, a towel hanging in two tails over a rung.
const ladder = `${shadow(50, 26)}
<path d="M26 6 H36 L40 94 H28 Z" fill="#f3d2aa" ${I}/>
<path d="M32 8 H36 L40 92 H34 Z" fill="#e7b56e"/>
<path d="M64 6 H74 L78 94 H66 Z" fill="#e7b56e" ${I}/>
<path d="M70 8 H74 L78 92 H72 Z" fill="#c9924a"/>
<rect x="28" y="20" width="46" height="5" rx="1.5" fill="#f0d2b0" ${S}/>
<rect x="28" y="38" width="47" height="5" rx="1.5" fill="#e7c49a" ${S}/>
<rect x="27" y="56" width="49" height="5" rx="1.5" fill="#f0d2b0" ${S}/>
<rect x="26" y="74" width="51" height="5" rx="1.5" fill="#e7c49a" ${S}/>
<path d="M32 36 H70 L66 58 H56 L52 44 H46 L40 60 H34 Z" fill="#fff" ${I}/>
<path d="M54 38 H68 L64 56 H56 Z" fill="#ffe4ea"/>
<path d="M36 46 H48 M58 42 H66" stroke="#8ecae6" stroke-width="2.2" stroke-linecap="round"/>
<path d="M30 54 H72 L68 84 H58 L52 66 H44 L38 86 H32 Z" fill="#ffb7cc" ${I}/>
<path d="M54 56 H70 L66 82 H56 Z" fill="#e888a8"/>
${hi('M36 40 H50')}<path d="M32 16 H38" ${vein}/>`;

const towelBar = `<path d="M18 28 V18 H28 V28 M102 28 V18 H112 V28" fill="none" ${S}/>
<path d="M16 30 H114" stroke="#d4a373" stroke-width="7" stroke-linecap="round"/>
<path d="M16 30 H114" fill="none" ${S}/>
<path d="M30 28 H100 L96 78 H70 L64 40 H56 L50 78 H34 Z" fill="#fff6f2" ${I}/>
<path d="M68 30 H98 L94 76 H72 Z" fill="#ffe4ea"/>
<path d="M40 46 H58 M72 46 H90 M42 58 H56 M74 58 H88 M44 70 H54" stroke="#8ecae6" stroke-width="2.6" stroke-linecap="round"/>
${hi('M36 38 H52')}`;

const cubby = `${shadow(50, 34)}
<rect x="8" y="10" width="84" height="80" rx="6" fill="#f3d2aa" ${I}/>
<path d="M56 12 H90 V88 H56 Z" fill="#e7b56e"/>
<path d="M8 50 H92 M50 10 V90" ${S}/>
<rect x="14" y="16" width="30" height="28" rx="3" fill="#f7e6cf" ${S}/>
<rect x="56" y="16" width="28" height="28" rx="3" fill="#e7c49a" ${S}/>
<rect x="14" y="56" width="30" height="28" rx="3" fill="#f7e6cf" ${S}/>
<rect x="56" y="56" width="28" height="28" rx="3" fill="#e7c49a" ${S}/>
<path d="M18 22 H40 L38 38 H20 Z" fill="#fff" ${S}/>
<path d="M60 20 H78 V40 H62 Z" fill="#c5e8f6" ${S}/>
<rect x="70" y="18" width="6" height="6" rx="1" fill="#f0c36a" ${S}/>
<path d="M18 62 H40 Q36 78 28 78 Q16 78 18 62 Z" fill="#ffb7cc" ${S}/>
<ellipse cx="70" cy="70" rx="8" ry="6" fill="#fff6f2" ${S}/>
${hi('M12 16 H28')}`;

const hamper = `${shadow(50, 32)}
<rect x="18" y="40" width="64" height="50" rx="8" fill="#c9a0dc" ${I}/>
<path d="M56 42 H80 V88 H56 Z" fill="#b388d6"/>
<path d="M22 54 H78 M24 66 H78 M26 78 H76" ${vein}/>
<path d="M16 40 H40 L48 22 H78 L84 40 Z" fill="#f6e9ff" ${I}/>
<path d="M56 38 H78 L84 40 H60 Z" fill="#e4ccf2"/>
${hi('M24 36 H40')}
<path d="M34 28 H62 L58 48 H40 Z" fill="#ffb7cc" ${S}/>
<path d="M50 30 H60 L58 46 H50 Z" fill="#e888a8"/>`;

const step = `${shadow(50, 36)}
<path d="M8 62 H92 V94 H8 Z" fill="#e7c49a" ${I}/>
<path d="M62 64 H92 V94 H62 Z" fill="#d4a373"/>
<path d="M8 62 H92 V70 H8 Z" fill="#f3d2aa" ${S}/>
<path d="M64 62 H92 V70 H64 Z" fill="#e7b56e"/>
<path d="M24 32 H76 V62 H24 Z" fill="#f3d2aa" ${I}/>
<path d="M58 34 H76 V62 H58 Z" fill="#e7b56e"/>
<path d="M24 32 H76 V40 H24 Z" fill="#f7e2c4" ${S}/>
<path d="M60 32 H76 V40 H60 Z" fill="#e7c49a"/>
${hi('M14 66 H40')}<path d="M30 48 H48" ${vein}/>`;

const cupboard = `${shadow(40, 24, 116)}
<rect x="14" y="108" width="8" height="6" rx="1" fill="${O}"/><rect x="58" y="108" width="8" height="6" rx="1" fill="${O}"/>
<rect x="10" y="12" width="60" height="96" rx="6" fill="#f7fbff" ${I}/>
<path d="M46 14 H68 V106 H46 Z" fill="#d5e6f0"/>
<path d="M40 12 V108" ${S}/>
<path d="M10 12 H70 Q72 4 40 4 Q8 4 10 12 Z" fill="#eaf6ff" ${I}/>
<path d="M46 6 H68 Q70 10 66 14 H46 Z" fill="#d5e6f0"/>
<circle cx="34" cy="48" r="2.2" fill="${O}"/><circle cx="48" cy="48" r="2.2" fill="${O}"/>
<circle cx="34" cy="86" r="2.2" fill="${O}"/><circle cx="48" cy="86" r="2.2" fill="${O}"/>
${hi('M14 20 H30')}<path d="M16 60 H30" ${vein}/>`;

const mat = `<path d="M10 30 Q24 12 38 28 Q52 12 66 28 Q80 12 94 28 Q108 12 122 28 Q134 22 132 40 Q128 58 114 58 Q100 72 86 56 Q72 72 58 56 Q44 72 30 56 Q16 70 8 48 Q4 36 10 30 Z" fill="#fff6f2" ${I}/>
<path d="M72 24 Q86 16 98 30 Q112 18 124 36 Q126 50 114 54 Q100 66 88 52 Q76 64 72 46 Z" fill="#ffd6e4"/>
<ellipse cx="66" cy="42" rx="34" ry="10" fill="#ffe4ea"/>
${hi('M22 32 Q42 22 58 30')}<path d="M30 44 H54 M80 46 H104" ${vein}/>`;

const ducky = `${shadow(48, 28)}
<ellipse cx="40" cy="70" rx="28" ry="18" fill="#ffe08a" ${I}/>
<path d="M46 56 H66 V84 H48 Q44 70 46 56 Z" fill="#f4c95d"/>
<ellipse cx="28" cy="66" rx="8" ry="5" fill="#fff2b8" ${S}/>
<circle cx="62" cy="42" r="16" fill="#ffe08a" ${I}/>
<path d="M66 30 H78 V52 H66 Q72 40 66 30 Z" fill="#f4c95d"/>
<path d="M74 40 L94 46 L74 54 Z" fill="#f4a261" ${S}/>
<circle cx="56" cy="40" r="2.2" fill="${O}"/>
${hi('M22 62 Q32 54 42 58')}<path d="M18 78 Q26 72 34 80" fill="none" ${S}/>`;

const soap = `${shadow(50, 30)}
<path d="M50 86 Q16 78 14 52 Q18 28 50 34 Q82 28 86 52 Q84 78 50 86 Z" fill="#fff6f2" ${I}/>
<path d="M50 36 Q78 32 82 52 Q78 74 50 82 Z" fill="#ffd6e4"/>
<path d="M50 40 V78 M36 44 Q32 60 40 74 M64 44 Q70 60 62 74 M26 52 Q24 64 32 72 M74 52 Q78 64 70 72" ${vein}/>
<rect x="30" y="48" width="40" height="16" rx="6" fill="#bde0fe" ${S}/>
<path d="M52 50 H68 V62 H52 Z" fill="#8ecae6"/>
<path d="M36 56 Q50 50 64 56" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
${hi('M22 48 Q32 40 42 46')}`;

const bottle = `${shadow(50, 18)}
<path d="M58 14 H74 L70 8 H62 Z" fill="#f4f7f8" ${S}/>
<rect x="36" y="12" width="26" height="8" rx="2" fill="#f0c36a" ${S}/>
<rect x="42" y="20" width="14" height="10" fill="#f7fbff" ${S}/>
<path d="M28 34 H70 Q74 34 72 42 L66 88 Q50 98 34 88 L26 42 Q24 34 28 34 Z" fill="#d7f3ff" ${I}/>
<path d="M52 36 H70 L64 86 Q54 94 52 84 Z" fill="#a9dff6"/>
<path d="M34 48 H64" ${S}/>
${hi('M34 44 Q40 38 46 44')}<circle cx="40" cy="62" r="3.4" fill="#fff" opacity=".9"/><circle cx="52" cy="74" r="2.6" fill="#fff" opacity=".8"/>`;

const machine = `${shadow(50, 30)}
<rect x="16" y="48" width="68" height="40" rx="10" fill="#d7f3ff" ${I}/>
<path d="M56 50 H82 V86 H56 Z" fill="#a9dff6"/>
<circle cx="42" cy="68" r="12" fill="#eaf6ff" ${I}/>
<circle cx="42" cy="68" r="6" fill="#7ec8e3" ${S}/>
<rect x="34" y="30" width="22" height="18" rx="4" fill="#f7fbff" ${S}/>
<path d="M46 32 H54 V46 H46 Z" fill="#d5e6f0"/>
<circle cx="58" cy="40" r="3" fill="#ffb7cc" ${S}/>
<circle cx="70" cy="28" r="6" fill="#fff" ${S}/>
<circle cx="82" cy="16" r="4.5" fill="#eaf6ff" ${S}/>
<circle cx="64" cy="10" r="3" fill="#fff" ${S}/>
${hi('M22 58 H40')}`;

const brush = `${shadow(50, 20)}
<path d="M30 46 H70 L66 90 H34 Z" fill="#f7fbff" ${I}/>
<path d="M54 48 H70 L66 88 H54 Z" fill="#d5e6f0"/>
<ellipse cx="50" cy="46" rx="22" ry="7" fill="#fff" ${I}/>
${hi('M36 54 V78')}
<rect x="36" y="22" width="7" height="26" rx="2" fill="#ffb7cc" ${S}/>
<rect x="56" y="18" width="7" height="30" rx="2" fill="#8ecae6" ${S}/>
<rect x="34" y="12" width="11" height="12" rx="2" fill="#fff" ${S}/>
<path d="M35 14 H44 M35 17 H44 M35 20 H44" stroke="#e888a8" stroke-width="1.2"/>
<rect x="54" y="8" width="11" height="12" rx="2" fill="#fff" ${S}/>
<path d="M55 10 H64 M55 13 H64 M55 16 H64" stroke="#5eb0d4" stroke-width="1.2"/>`;

const porthole = `<circle cx="50" cy="54" r="40" fill="#f0c36a" ${I}/>
<circle cx="50" cy="54" r="28" fill="#eaf6ff" ${S}/>
<path d="M50 28 A26 26 0 0 1 76 54 L50 54 Z" fill="#c5dff5"/>
<circle cx="50" cy="18" r="2.2" fill="${O}"/><circle cx="78" cy="36" r="2.2" fill="${O}"/>
<circle cx="82" cy="66" r="2.2" fill="${O}"/><circle cx="62" cy="86" r="2.2" fill="${O}"/>
<circle cx="30" cy="84" r="2.2" fill="${O}"/><circle cx="16" cy="60" r="2.2" fill="${O}"/>
<circle cx="20" cy="34" r="2.2" fill="${O}"/>
${hi('M32 42 Q40 32 52 34')}
<circle cx="50" cy="8" r="4" fill="none" ${S}/><path d="M50 4 V8" ${S}/>`;

const tray = `${shadow(50, 40)}
<path d="M8 48 H22 V62 H8 Z M78 48 H92 V62 H78 Z" fill="#e7b56e" ${S}/>
<path d="M6 56 H94 L88 74 H12 Z" fill="#f3d2aa" ${I}/>
<path d="M60 56 H94 L88 74 H64 Z" fill="#e7b56e"/>
<path d="M6 56 H94 V62 H6 Z" fill="#f7e2c4" ${S}/>
${hi('M16 60 H40')}<path d="M20 68 H48" ${vein}/>
<rect x="18" y="34" width="24" height="20" rx="2" fill="#fff" ${S}/>
<path d="M32 36 H40 V52 H32 Z" fill="#e7eef3"/>
<rect x="52" y="40" width="22" height="12" rx="4" fill="#bde0fe" ${S}/>
<path d="M64 42 H72 V50 H64 Z" fill="#8ecae6"/>`;

const hooks = `<path d="M8 22 H112" stroke="#d4a373" stroke-width="7" stroke-linecap="round"/>
<path d="M8 22 H112" fill="none" ${S}/>
<circle cx="28" cy="22" r="4" fill="#f0c36a" ${S}/><circle cx="58" cy="22" r="4" fill="#f0c36a" ${S}/><circle cx="88" cy="22" r="4" fill="#e7b56e" ${S}/>
<path d="M24 26 Q16 34 26 48 M54 26 Q46 34 56 48 M84 26 Q76 34 86 48" fill="none" ${S}/>
<path d="M70 30 H108 L102 88 H76 Z" fill="#bde0fe" ${I}/>
<path d="M90 32 H108 L102 86 H90 Z" fill="#8ecae6"/>
<path d="M78 48 H100 M80 60 H98 M82 72 H96" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>
${hi('M76 40 V70')}`;

const timer = `${shadow(50, 16)}
<rect x="30" y="10" width="40" height="8" rx="2" fill="#e7b56e" ${I}/>
<rect x="30" y="84" width="40" height="8" rx="2" fill="#c9924a" ${I}/>
<path d="M36 18 H64 L54 46 H46 Z" fill="#eaf6ff" ${I}/>
<path d="M52 20 H64 L54 44 H48 Z" fill="#c5dff5"/>
<path d="M36 84 H64 L54 56 H46 Z" fill="#eaf6ff" ${I}/>
<path d="M52 82 H64 L54 58 H48 Z" fill="#c5dff5"/>
<path d="M46 40 H54 L52 52 H48 Z" fill="#ffe08a"/>
<path d="M40 70 H60 L56 82 H44 Z" fill="#f4c95d" ${S}/>
<path d="M50 46 V56" stroke="#f4c95d" stroke-width="2" stroke-linecap="round"/>
${hi('M40 24 H52')}`;

function frond(x0: number, y0: number, cx: number, cy: number, x1: number, y1: number, fill: string): string {
  let s = `<g stroke="${O}" stroke-width="1.6"><path d="M${x0} ${y0} Q${cx} ${cy} ${x1} ${y1}" fill="none" stroke="#2f6b45" stroke-width="1.8" stroke-linecap="round"/>`;
  for (let i = 1; i <= 4; i++) {
    const t = i / 4.6;
    const u = 1 - t;
    const x = +(u * u * x0 + 2 * u * t * cx + t * t * x1).toFixed(0);
    const y = +(u * u * y0 + 2 * u * t * cy + t * t * y1).toFixed(0);
    const rx = (7 - i * 0.6).toFixed(0);
    const rot = x1 < 50 ? -50 : 50;
    s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="2.4" fill="${fill}" transform="rotate(${rot} ${x} ${y})"/>`;
    s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="2.4" fill="${i % 2 ? '#74c69d' : fill}" transform="rotate(${-rot} ${x} ${y})"/>`;
  }
  return s + '</g>';
}

const fern = `${shadow(50, 24)}
<path d="M34 74 H66 L60 96 H40 Z" fill="#e8845a" ${I}/>
<path d="M52 76 H66 L60 94 H52 Z" fill="#c45c38"/>
<rect x="28" y="66" width="44" height="10" rx="3" fill="#f0a078" ${I}/>
<path d="M52 68 H70 V74 H52 Z" fill="#d47848"/>
${hi('M34 70 H48')}
${frond(50, 70, 28, 48, 18, 22, '#95d5b2')}
${frond(50, 70, 36, 36, 40, 12, '#d8f6e4')}
${frond(50, 70, 70, 40, 84, 16, '#3d9a68')}`;

function coins(x: number, fill: string): string {
  let s = `<g stroke="${O}" stroke-width="1.6" stroke-linejoin="round"><path d="M${x} 24 V84" fill="none" stroke="#3d9a68" stroke-width="2" stroke-linecap="round"/>`;
  for (let i = 0; i < 4; i++) {
    const y = 32 + i * 12;
    s += `<ellipse cx="${x - 8}" cy="${y}" rx="6" ry="3.6" fill="${fill}" transform="rotate(-30 ${x - 8} ${y})"/>`;
    s += `<ellipse cx="${x + 8}" cy="${y + 4}" rx="6" ry="3.6" fill="${i % 2 ? '#3d9a68' : '#52b788'}" transform="rotate(28 ${x + 8} ${y + 4})"/>`;
  }
  return s + '</g>';
}

const eucalyptus = `<path d="M22 14 H78" stroke="#d4a373" stroke-width="6" stroke-linecap="round"/>
<path d="M22 14 H78" fill="none" ${S}/>
<circle cx="30" cy="14" r="3" fill="#f3d2aa" ${S}/><circle cx="70" cy="14" r="3" fill="#e7b56e" ${S}/>
${coins(36, '#95d5b2')}${coins(64, '#74c69d')}`;

const succulent = `${shadow(50, 22)}
<path d="M28 66 H72 L66 94 H34 Z" fill="#e7c49a" ${I}/>
<path d="M54 68 H72 L66 92 H54 Z" fill="#d4a373"/>
<ellipse cx="50" cy="64" rx="24" ry="7" fill="#f3d2aa" ${S}/>
<ellipse cx="34" cy="62" rx="4" ry="2.4" fill="#c4b7ae" ${S}/>
<ellipse cx="50" cy="63" rx="3.4" ry="2" fill="#d9cfc6" ${S}/>
<ellipse cx="64" cy="62" rx="4" ry="2.2" fill="#b7aaa0" ${S}/>
<ellipse cx="50" cy="48" rx="8" ry="16" fill="#b7ebc8" ${I}/>
<ellipse cx="36" cy="50" rx="7" ry="13" fill="#74c69d" ${I} transform="rotate(-28 36 50)"/>
<ellipse cx="64" cy="50" rx="7" ry="13" fill="#3d9a68" ${I} transform="rotate(28 64 50)"/>
<ellipse cx="30" cy="54" rx="6" ry="11" fill="#95d5b2" ${S} transform="rotate(-52 30 54)"/>
<ellipse cx="70" cy="54" rx="6" ry="11" fill="#2f7a52" ${S} transform="rotate(52 70 54)"/>
<ellipse cx="50" cy="42" rx="5" ry="9" fill="#d8f6e4" ${S}/>
${hi('M34 70 H46')}`;

const aloe = `${shadow(50, 24)}
<path d="M30 74 H70 L64 96 H36 Z" fill="#c9a0dc" ${I}/>
<path d="M54 76 H70 L64 94 H54 Z" fill="#b388d6"/>
<path d="M50 76 L18 40 L36 78 Z" fill="#74c69d" ${I}/>
<path d="M50 76 L82 42 L64 78 Z" fill="#2f7a52" ${I}/>
<path d="M50 78 L34 18 L66 78 Z" fill="#b7ebc8" ${I}/>
<path d="M54 74 L62 28 L66 76 Z" fill="#52b788"/>
<path d="M24 48 l3 2 M30 40 l3 2 M70 44 l3 2 M76 52 l3 2 M42 30 l2 2 M58 28 l2 2" ${S}/>
<circle cx="46" cy="52" r="2" fill="${O}"/><circle cx="56" cy="52" r="2" fill="${O}"/>
<path d="M46 60 Q50 64 54 60" fill="none" ${S}/>
${hi('M38 80 H50')}`;

const lily = `${shadow(50, 26)}
<path d="M26 70 H74 L68 96 H32 Z" fill="#bde0fe" ${I}/>
<path d="M54 72 H74 L68 94 H54 Z" fill="#8ecae6"/>
<ellipse cx="50" cy="68" rx="26" ry="8" fill="#7ec8e3" ${S}/>
<path d="M32 54 L46 46 A14 14 0 1 1 46 60 Z" fill="#3d9a68" ${I}/>
<path d="M68 52 L80 46 A12 12 0 1 0 78 60 Z" fill="#74c69d" ${I}/>
<circle cx="50" cy="36" r="4" fill="#ffe08a" ${S}/>
<circle cx="50" cy="28" r="5" fill="#ffb7cc" ${S}/>
<circle cx="42" cy="34" r="5" fill="#ff8fab" ${S}/>
<circle cx="58" cy="34" r="5" fill="#e888a8" ${S}/>
<circle cx="44" cy="24" r="4.2" fill="#ffd6e4" ${S}/>
<circle cx="56" cy="24" r="4.2" fill="#ffb7cc" ${S}/>
${hi('M32 76 H46')}`;

const moss = `${shadow(50, 28)}
<path d="M12 62 Q50 50 88 62 Q84 94 50 98 Q16 94 12 62 Z" fill="#e7c49a" ${I}/>
<path d="M54 56 Q84 62 84 76 Q80 92 54 94 Z" fill="#d4a373"/>
<ellipse cx="28" cy="58" rx="10" ry="7" fill="#95d5b2" ${I}/>
<ellipse cx="44" cy="52" rx="11" ry="8" fill="#74c69d" ${I}/>
<ellipse cx="60" cy="50" rx="10" ry="7" fill="#52b788" ${I}/>
<ellipse cx="74" cy="56" rx="9" ry="6" fill="#3d9a68" ${I}/>
<ellipse cx="36" cy="60" rx="6" ry="4" fill="#b7ebc8" ${S}/>
<ellipse cx="54" cy="58" rx="6" ry="4" fill="#2f7a52" ${S}/>
${hi('M22 66 Q34 60 44 62')}`;

const clover = `${shadow(50, 16)}
<path d="M48 62 V90" stroke="#52b788" stroke-width="3.5" stroke-linecap="round"/>
<path d="M40 84 H60 L56 98 H44 Z" fill="#e8845a" ${S}/>
<path d="M50 50 C50 40 36 38 36 48 C36 56 50 62 50 62 C50 62 64 56 64 48 C64 38 50 40 50 50 Z" fill="#74c69d" ${I}/>
<path d="M34 58 C24 52 22 38 34 40 C42 42 46 52 48 58 C40 54 36 60 34 58 Z" fill="#b7ebc8" ${I}/>
<path d="M66 58 C76 52 78 38 66 40 C58 42 54 52 52 58 C60 54 64 60 66 58 Z" fill="#3d9a68" ${I}/>
<path d="M50 46 V58 M40 50 L46 54 M60 50 L54 54" ${vein}/>
${hi('M40 46 H48')}`;

const sprout = `${shadow(50, 18)}
<path d="M32 74 H68 L62 96 H38 Z" fill="#fff" ${I}/>
<path d="M54 76 H68 L62 94 H54 Z" fill="#e7eef3"/>
<path d="M50 74 V48" stroke="#52b788" stroke-width="3.5" stroke-linecap="round"/>
<ellipse cx="32" cy="46" rx="14" ry="8" fill="#95d5b2" ${I} transform="rotate(-36 32 46)"/>
<ellipse cx="68" cy="44" rx="14" ry="8" fill="#3d9a68" ${I} transform="rotate(34 68 44)"/>
<path d="M26 44 Q34 40 40 48" ${vein}/>
<path d="M50 28 C50 22 46 22 46 26 C46 30 50 32 50 32 C50 32 54 30 54 26 C54 22 50 22 50 28 Z" fill="#7ec8e3" ${S}/>
${hi('M38 80 H52')}`;

const bamboo = `${shadow(50, 18)}
<rect x="36" y="74" width="28" height="18" rx="3" fill="#e7c49a" ${I}/>
<path d="M52 76 H62 V90 H52 Z" fill="#d4a373"/>
<path d="M42 18 V76" stroke="#b7ebc8" stroke-width="8" stroke-linecap="round"/>
<path d="M58 10 V76" stroke="#52b788" stroke-width="8" stroke-linecap="round"/>
<path d="M42 18 V76 M58 10 V76" fill="none" ${S}/>
<path d="M38 34 H48 M38 50 H48 M38 64 H48" stroke="#2f6b45" stroke-width="2.4"/>
<path d="M54 28 H68 M54 46 H68 M54 62 H68" stroke="#1f5c38" stroke-width="2.4"/>
<ellipse cx="26" cy="32" rx="12" ry="5" fill="#95d5b2" ${I} transform="rotate(-28 26 32)"/>
<ellipse cx="78" cy="24" rx="12" ry="5" fill="#3d9a68" ${I} transform="rotate(22 78 24)"/>
${hi('M40 78 H50')}`;

const herb = `${shadow(50, 16)}
<path d="M32 68 H68 L62 96 H38 Z" fill="#c9a0dc" ${I}/>
<path d="M54 70 H68 L62 94 H54 Z" fill="#b388d6"/>
<path d="M40 68 V40 M50 68 V28 M60 68 V42" stroke="#3d9a68" stroke-width="2.4" stroke-linecap="round"/>
<ellipse cx="32" cy="44" rx="8" ry="4.5" fill="#95d5b2" ${I}/><ellipse cx="48" cy="44" rx="8" ry="4.5" fill="#74c69d" ${I}/>
<ellipse cx="34" cy="34" rx="7" ry="4" fill="#b7ebc8" ${S}/><ellipse cx="48" cy="32" rx="7" ry="4" fill="#52b788" ${S}/>
<ellipse cx="50" cy="26" rx="8" ry="4.5" fill="#d8f6e4" ${I}/><ellipse cx="62" cy="36" rx="7" ry="4" fill="#3d9a68" ${I}/>
<ellipse cx="58" cy="46" rx="8" ry="4.5" fill="#2f7a52" ${I}/><ellipse cx="70" cy="44" rx="7" ry="4" fill="#74c69d" ${S}/>
${hi('M38 74 H50')}`;

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
