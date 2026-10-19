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
  return `<g transform="translate(${x} ${y})"><circle cx="0" cy="-4.2" r="2.6" fill="#fff" ${S}/><circle cx="3.8" cy="-1.2" r="2.6" fill="#fff" ${S}/><circle cx="2.4" cy="3.6" r="2.6" fill="#fff" ${S}/><circle cx="-2.4" cy="3.6" r="2.6" fill="#fff" ${S}/><circle cx="-3.8" cy="-1.2" r="2.6" fill="#fff" ${S}/><circle cx="0" cy="0" r="2" fill="#ffe08a" ${S}/></g>`;
}

const tub = `${shadow(70, 52)}
<path d="M28 78 L22 94 M48 80 L44 94 M96 80 L100 94 M116 78 L122 94" ${I}/>
<path d="M18 90 h8 l2 6 h-10 z M40 90 h8 l1 6 h-10 z M96 90 h8 l2 6 h-10 z M114 90 h8 l1 6 h-10 z" fill="#e7b56e" ${S}/>
<path d="M20 90 h6 l1 4 h-6 z M42 90 h6 l1 4 h-6 z M98 90 h6 l1 4 h-6 z M116 90 h6 l1 4 h-6 z" fill="#c9924a"/>
<path d="M16 62 Q16 88 36 90 H104 Q124 88 124 62 V54 H16 Z" fill="#f7fbff" ${I}/>
<path d="M86 56 H122 V62 Q122 86 104 88 H86 Z" fill="#d5e6f0"/>
<ellipse cx="70" cy="64" rx="46" ry="12" fill="#c5e8f6"/>
<ellipse cx="48" cy="60" rx="14" ry="7" fill="#fff" ${S}/><ellipse cx="70" cy="56" rx="16" ry="8" fill="#fff" ${S}/><ellipse cx="92" cy="60" rx="13" ry="6.5" fill="#fff" ${S}/>
<circle cx="58" cy="58" r="4" fill="#fff" ${S}/><circle cx="80" cy="57" r="3.4" fill="#fff" ${S}/>
<path d="M12 56 Q70 40 128 56 Q70 70 12 56 Z" fill="#fff" ${I}/>
<path d="M96 48 H124 V56 Q108 64 96 56 Z" fill="#e4eef4"/>
${hi('M28 58 Q48 50 64 54')}
<path d="M112 40 H124 Q128 40 128 46 V58 H120 V48 H112 Z" fill="#f4f7f8" ${S}/>
<path d="M120 42 H128 V56 H120 Z" fill="#c5d0d8"/>
<circle cx="124" cy="38" r="4" fill="#f0c36a" ${S}/><path d="M118 34 H124" ${S}/>
${hi('M114 44 H120')}`;

const shower = `${shadow(45, 30, 117)}
<path d="M10 96 H80 L74 112 H16 Z" fill="#f7fbff" ${I}/>
<path d="M52 98 H78 L74 110 H54 Z" fill="#d5e6f0"/>
<rect x="16" y="28" width="56" height="70" rx="6" fill="#eaf6ff" ${I}/>
<path d="M48 30 H70 V96 H48 Z" fill="#c5dff5"/>
<path d="M18 36 H70" ${vein}/>
<path d="M14 22 H76" fill="none" stroke="#d4a373" stroke-width="5" stroke-linecap="round"/>
<path d="M14 22 H76" fill="none" ${S}/>
<path d="M16 24 Q22 70 18 100" fill="#ffb7cc" ${S}/>
<path d="M22 28 Q26 70 22 96" fill="#e888a8"/>
${hi('M18 36 Q20 60 19 80')}
<rect x="40" y="8" width="10" height="16" rx="3" fill="#f4f7f8" ${S}/>
<path d="M46 8 H50 V22 H46 Z" fill="#c5d0d8"/>
<circle cx="45" cy="22" r="5" fill="#e8eef2" ${S}/>
<path d="M42 28 V40 M48 28 V38" stroke="#a2d2ff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
<rect x="62" y="58" width="8" height="4" rx="2" fill="#f0c36a" ${S}/>
${hi('M22 40 V78')}`;

const vanity = `${shadow(50, 40)}
<rect x="12" y="52" width="76" height="36" rx="8" fill="#fff" ${I}/>
<path d="M52 54 H86 V86 H52 Q56 70 52 54 Z" fill="#e7eef3"/>
<path d="M12 70 H88" ${S}/>
<circle cx="28" cy="62" r="2.4" fill="${O}"/><circle cx="72" cy="62" r="2.4" fill="${O}"/>
<circle cx="28" cy="80" r="2.4" fill="${O}"/><circle cx="72" cy="80" r="2.4" fill="${O}"/>
<path d="M22 88 H30 M70 88 H78" ${vein}/>
<ellipse cx="50" cy="30" rx="22" ry="24" fill="#f0c36a" ${I}/>
<ellipse cx="50" cy="30" rx="16" ry="18" fill="#eaf6ff" ${S}/>
<path d="M56 16 H64 V44 H56 Q60 30 56 16 Z" fill="#c5dff5"/>
${hi('M38 22 Q42 16 48 18')}
<circle cx="30" cy="8" r="3" fill="#ffe08a" ${S}/><circle cx="70" cy="8" r="3" fill="#ffe08a" ${S}/>`;

const toilet = `${shadow(50, 28)}
<path d="M34 88 H66 L62 96 H38 Z" fill="#f7fbff" ${I}/>
<rect x="30" y="18" width="40" height="28" rx="6" fill="#f7fbff" ${I}/>
<path d="M54 20 H68 V44 H54 Z" fill="#d5e6f0"/>
<rect x="58" y="28" width="6" height="10" rx="2" fill="#f4f7f8" ${S}/>
<circle cx="61" cy="27" r="2.2" fill="#f0c36a" ${S}/>
${hi('M34 24 H48')}
<ellipse cx="50" cy="74" rx="30" ry="10" fill="#e7eef3" ${I}/>
<ellipse cx="50" cy="66" rx="30" ry="11" fill="#f7fbff" ${I}/>
<path d="M50 56 H78 Q80 66 74 74 H50 Z" fill="#d5e6f0"/>
${hi('M28 64 Q36 58 46 60')}
${daisy(50, 66)}
<path d="M36 62 H42 M58 62 H64" stroke="${O}" stroke-width="2" stroke-linecap="round"/>`;

const ladder = `${shadow(50, 26)}
<path d="M28 18 L24 90 M72 18 L76 90" ${I}/>
<path d="M70 20 L74 88" stroke="#d4a373" stroke-width="4" stroke-linecap="round"/>
<path d="M26 36 H74 M25 54 H75 M24 72 H76" ${S}/>
<path d="M30 32 H70 L66 42 H34 Z" fill="#fff6f2" ${S}/>
<path d="M52 34 H68 L66 40 H52 Z" fill="#ffd6e4"/>
<path d="M36 40 H48 M54 38 H64" stroke="#8ecae6" stroke-width="2" stroke-linecap="round"/>
<path d="M32 58 H68 Q64 70 50 70 Q36 70 32 58 Z" fill="#ffb7cc" ${S}/>
<path d="M52 60 H66 Q64 68 54 68 H52 Z" fill="#e888a8"/>
${hi('M36 34 H50')}`;

const towelBar = `<path d="M14 36 H116" stroke="#d4a373" stroke-width="6" stroke-linecap="round"/>
<path d="M14 36 H116" fill="none" ${S}/>
<circle cx="16" cy="36" r="5" fill="#f3d2aa" ${S}/><circle cx="114" cy="36" r="5" fill="#e7b56e" ${S}/>
<path d="M28 32 H102 L96 78 H34 Z" fill="#fff6f2" ${I}/>
<path d="M70 34 H100 L96 76 H72 Z" fill="#ffe4ea"/>
<path d="M40 46 H90 M42 58 H88 M44 70 H86" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
<path d="M48 46 H58 M70 58 H82" stroke="#ff8fab" stroke-width="3" stroke-linecap="round"/>
${hi('M36 40 H60')}`;

const cubby = `${shadow(50, 34)}
<rect x="14" y="16" width="72" height="72" rx="8" fill="#f3d2aa" ${I}/>
<path d="M58 18 H84 V86 H58 Z" fill="#e7b56e"/>
<path d="M14 40 H86 M14 64 H86" ${S}/>
<path d="M22 22 H48" ${vein}/><path d="M22 48 H40" ${vein}/>
<path d="M22 28 H40 L38 36 H24 Z" fill="#fff" ${S}/>
<path d="M44 26 H62 L60 36 H46 Z" fill="#bde0fe" ${S}/>
<path d="M66 24 H78 V36 H66 Z" fill="#c5e8f6" ${S}/>
<rect x="70" y="22" width="6" height="4" rx="1" fill="#f4f7f8" ${S}/>
<path d="M24 48 H46 Q44 60 34 60 Q24 60 24 48 Z" fill="#ffb7cc" ${S}/>
<path d="M52 50 H74 L70 60 H56 Z" fill="#fff6f2" ${S}/>`;

const hamper = `${shadow(50, 32)}
<path d="M22 40 H78 L86 88 H14 Z" fill="#c9a0dc" ${I}/>
<path d="M58 42 H78 L86 86 H62 Z" fill="#b388d6"/>
<path d="M20 52 H80 M22 66 H82 M24 78 H80" ${vein}/>
<ellipse cx="50" cy="40" rx="32" ry="10" fill="#f6e9ff" ${I}/>
<path d="M50 32 H80 Q82 40 76 46 H50 Z" fill="#e4ccf2"/>
${hi('M26 38 Q36 32 48 34')}
<path d="M40 46 H64 L60 62 H44 Z" fill="#ffb7cc" ${S}/>
<path d="M52 48 H62 L60 60 H52 Z" fill="#e888a8"/>`;

const step = `${shadow(50, 34)}
<path d="M22 90 V68 M78 90 V68" ${I}/>
<path d="M12 70 L22 58 H78 L88 70 Z" fill="#f3d2aa" ${I}/>
<path d="M58 60 H78 L88 70 H64 Z" fill="#e7b56e"/>
<path d="M12 70 H88 V78 H12 Z" fill="#e7c49a" ${S}/>
<path d="M64 72 H88 V78 H64 Z" fill="#d4a373"/>
<path d="M30 58 V36 M70 58 V36" ${I}/>
<path d="M26 38 L34 28 H66 L74 38 Z" fill="#f3d2aa" ${I}/>
<path d="M56 30 H66 L74 38 H60 Z" fill="#e7b56e"/>
${hi('M18 64 H40')}<path d="M32 32 H52" ${vein}/>`;

const cupboard = `${shadow(40, 28, 117)}
<rect x="12" y="14" width="56" height="96" rx="8" fill="#f7fbff" ${I}/>
<path d="M44 16 H66 V108 H44 Z" fill="#d5e6f0"/>
<path d="M40 14 V110" ${S}/>
<rect x="18" y="24" width="16" height="28" rx="3" fill="#fff" ${S}/>
<rect x="46" y="24" width="14" height="28" rx="3" fill="#eaf6ff" ${S}/>
<rect x="18" y="64" width="16" height="28" rx="3" fill="#fff" ${S}/>
<rect x="46" y="64" width="14" height="28" rx="3" fill="#eaf6ff" ${S}/>
<circle cx="32" cy="40" r="2" fill="${O}"/><circle cx="50" cy="40" r="2" fill="${O}"/>
<circle cx="32" cy="80" r="2" fill="${O}"/><circle cx="50" cy="80" r="2" fill="${O}"/>
${hi('M16 22 H32')}<path d="M18 70 H30" ${vein}/>`;

const mat = `<path d="M8 46 Q20 28 32 46 Q44 28 56 46 Q68 28 80 46 Q92 28 104 46 Q116 28 128 46 Q136 58 128 70 Q116 86 104 70 Q92 86 80 70 Q68 86 56 70 Q44 86 32 70 Q20 86 8 70 Q0 58 8 46 Z" fill="#fff6f2" ${I}/>
<path d="M70 40 Q80 32 90 46 Q100 34 112 48 Q120 60 112 70 Q100 82 90 70 Q80 82 70 68 Z" fill="#ffd6e4"/>
<ellipse cx="68" cy="56" rx="36" ry="12" fill="#ffe4ea"/>
${hi('M24 44 Q40 36 54 42')}<path d="M30 58 H50 M78 60 H96" ${vein}/>`;

const ducky = `${shadow(50, 24)}
<ellipse cx="46" cy="70" rx="28" ry="18" fill="#ffe08a" ${I}/>
<path d="M52 56 H74 V82 H56 Q52 70 52 56 Z" fill="#f4c95d"/>
<circle cx="62" cy="42" r="16" fill="#ffe08a" ${I}/>
<path d="M66 30 H76 V52 H66 Q70 40 66 30 Z" fill="#f4c95d"/>
<path d="M74 40 L90 44 L74 50 Z" fill="#f4a261" ${S}/>
<circle cx="58" cy="40" r="2.2" fill="${O}"/>
${hi('M36 62 Q42 56 50 58')}<path d="M24 86 Q32 80 40 86" fill="none" ${S}/>`;

const soap = `${shadow(50, 26)}
<path d="M14 62 Q18 40 50 36 Q82 40 86 62 Q82 84 50 88 Q18 84 14 62 Z" fill="#fff6f2" ${I}/>
<path d="M54 40 Q78 44 82 62 Q78 80 54 84 Z" fill="#ffd6e4"/>
<path d="M28 58 Q50 70 72 58" ${vein}/>
<rect x="32" y="48" width="36" height="18" rx="8" fill="#bde0fe" ${S}/>
<path d="M52 50 H66 V64 H52 Z" fill="#8ecae6"/>
${hi('M36 52 H48')}`;

const bottle = `${shadow(50, 16)}
<rect x="40" y="10" width="20" height="8" rx="3" fill="#f0c36a" ${S}/>
<path d="M56 12 H66 L64 8 H58 Z" fill="#f4f7f8" ${S}/>
<rect x="46" y="18" width="8" height="8" fill="#f7fbff" ${S}/>
<path d="M34 30 H66 L62 86 Q50 94 38 86 Z" fill="#d7f3ff" ${I}/>
<path d="M52 32 H66 L62 84 Q56 90 52 84 Z" fill="#a9dff6"/>
${hi('M38 40 Q42 36 46 40')}<circle cx="44" cy="58" r="3" fill="#fff" opacity=".85"/><circle cx="54" cy="70" r="2.4" fill="#fff" opacity=".75"/>`;

const mobile = `<path d="M50 6 V18" ${I}/>
<ellipse cx="50" cy="22" rx="26" ry="7" fill="#fff" ${I}/>
<path d="M62 18 H74 V26 H62 Z" fill="#e7eef3"/>
<path d="M30 26 V44 M50 28 V52 M70 26 V42" ${S}/>
<circle cx="30" cy="52" r="8" fill="#c5e8f6" ${S}/><circle cx="27" cy="49" r="2" fill="#fff"/>
<circle cx="50" cy="62" r="9" fill="#ffb7cc" ${S}/><circle cx="47" cy="59" r="2" fill="#fff"/>
<circle cx="70" cy="50" r="7" fill="#ffe08a" ${S}/><circle cx="68" cy="48" r="1.8" fill="#fff"/>`;

const brush = `${shadow(50, 18)}
<path d="M30 40 H70 L66 88 H34 Z" fill="#f7fbff" ${I}/>
<path d="M54 42 H70 L66 86 H54 Z" fill="#d5e6f0"/>
<ellipse cx="50" cy="40" rx="22" ry="7" fill="#fff" ${I}/>
${hi('M36 44 V70')}
<rect x="38" y="18" width="6" height="28" rx="2" fill="#ffb7cc" ${S}/>
<rect x="54" y="14" width="6" height="30" rx="2" fill="#8ecae6" ${S}/>
<path d="M36 18 H46 L44 12 H38 Z" fill="#e888a8" ${S}/>
<path d="M52 14 H62 L60 8 H54 Z" fill="#5eb0d4" ${S}/>`;

const porthole = `<circle cx="50" cy="50" r="36" fill="#f0c36a" ${I}/>
<circle cx="50" cy="50" r="26" fill="#eaf6ff" ${S}/>
<path d="M50 26 A24 24 0 0 1 74 50 V26 Z" fill="#c5dff5"/>
${hi('M32 36 Q38 28 48 30')}
<circle cx="50" cy="12" r="4" fill="#ffb7cc" ${S}/>`;

const tray = `${shadow(50, 40)}
<path d="M8 58 H92 L84 72 H16 Z" fill="#f3d2aa" ${I}/>
<path d="M58 58 H92 L84 72 H62 Z" fill="#e7b56e"/>
${hi('M16 62 H40')}<path d="M24 66 H48" ${vein}/>
<rect x="22" y="40" width="22" height="14" rx="4" fill="#fff" ${S}/>
<path d="M34 42 H42 V52 H34 Z" fill="#e7eef3"/>
<ellipse cx="64" cy="46" rx="14" ry="8" fill="#ffb7cc" ${S}/>
<path d="M64 40 H74 V50 H64 Z" fill="#e888a8"/>`;

const hooks = `<path d="M16 28 H104" stroke="#d4a373" stroke-width="6" stroke-linecap="round"/>
<path d="M16 28 H104" fill="none" ${S}/>
<circle cx="32" cy="28" r="4" fill="#f0c36a" ${S}/><circle cx="58" cy="28" r="4" fill="#f0c36a" ${S}/><circle cx="84" cy="28" r="4" fill="#e7b56e" ${S}/>
<path d="M26 32 Q22 36 28 44 M52 32 Q48 36 54 44 M78 32 Q74 36 80 44" fill="none" ${S}/>
<path d="M70 36 H98 L94 78 H74 Z" fill="#bde0fe" ${I}/>
<path d="M86 38 H98 L94 76 H86 Z" fill="#8ecae6"/>
${hi('M76 46 V66')}`;

const timer = `${shadow(50, 16)}
<path d="M34 18 H66 M34 82 H66" ${I}/>
<path d="M38 22 H62 L54 48 H46 Z" fill="#eaf6ff" ${I}/>
<path d="M54 24 H62 L54 46 H50 Z" fill="#c5dff5"/>
<path d="M38 78 H62 L54 52 H46 Z" fill="#ffe08a" ${I}/>
<path d="M54 76 H62 L54 54 H50 Z" fill="#f4c95d"/>
<rect x="44" y="46" width="12" height="8" rx="2" fill="#d4a373" ${S}/>
${hi('M42 28 H50')}`;

const fern = `${shadow(50, 22)}
<path d="M36 70 H64 L58 94 H42 Z" fill="#ff9f68" ${I}/>
<path d="M52 72 H64 L58 92 H52 Z" fill="#e07a3f"/>
<rect x="32" y="64" width="36" height="8" rx="3" fill="#ffb385" ${S}/>
<path d="M50 68 C30 60 22 40 28 24" fill="none" stroke="#52b788" stroke-width="3" stroke-linecap="round"/>
<path d="M50 68 C70 58 78 36 72 22" fill="none" stroke="#74c69d" stroke-width="3" stroke-linecap="round"/>
<path d="M50 70 V30" stroke="#52b788" stroke-width="3" stroke-linecap="round"/>
<path d="M32 48 Q40 40 36 30 M28 40 Q36 36 34 26" fill="#95d5b2" ${S}/>
<path d="M68 46 Q60 38 64 28 M74 36 Q66 34 68 24" fill="#52b788" ${S}/>
<path d="M44 40 Q50 32 48 22" fill="#74c69d" ${S}/>
<path d="M34 36 L40 32" ${vein}/>${hi('M40 68 H52')}`;

const eucalyptus = `<path d="M50 8 V22" ${I}/>
<path d="M28 18 H72" stroke="#d4a373" stroke-width="5" stroke-linecap="round"/>
<path d="M28 18 H72" fill="none" ${S}/>
<path d="M50 24 C40 40 36 50 42 70" fill="none" stroke="#74c69d" stroke-width="2.4"/>
<ellipse cx="36" cy="36" rx="8" ry="5" fill="#95d5b2" ${S} transform="rotate(-30 36 36)"/>
<ellipse cx="58" cy="40" rx="9" ry="5" fill="#52b788" ${S} transform="rotate(24 58 40)"/>
<ellipse cx="34" cy="52" rx="8" ry="5" fill="#74c69d" ${S} transform="rotate(-20 34 52)"/>
<ellipse cx="60" cy="56" rx="8" ry="5" fill="#95d5b2" ${S} transform="rotate(18 60 56)"/>
<ellipse cx="46" cy="68" rx="7" ry="4" fill="#52b788" ${S}/>
<path d="M34 34 L40 38 M56 38 L62 42" ${vein}/>`;

const succulent = `${shadow(50, 20)}
<path d="M28 62 H72 L66 92 H34 Z" fill="#e7c49a" ${I}/>
<path d="M54 64 H72 L66 90 H54 Z" fill="#d4a373"/>
<ellipse cx="50" cy="58" rx="24" ry="7" fill="#f3d2aa" ${S}/>
<ellipse cx="50" cy="48" rx="8" ry="16" fill="#95d5b2" ${S}/>
<ellipse cx="34" cy="50" rx="8" ry="12" fill="#74c69d" ${S} transform="rotate(-28 34 50)"/>
<ellipse cx="66" cy="50" rx="8" ry="12" fill="#52b788" ${S} transform="rotate(28 66 50)"/>
<path d="M50 40 V54" ${vein}/>${hi('M36 64 H48')}`;

const aloe = `${shadow(50, 22)}
<path d="M32 72 H68 L62 94 H38 Z" fill="#c9a0dc" ${I}/>
<path d="M54 74 H68 L62 92 H54 Z" fill="#b388d6"/>
<path d="M50 70 L42 28 L58 70 Z" fill="#95d5b2" ${I}/>
<path d="M52 66 L56 36 L58 68 Z" fill="#74c69d"/>
<path d="M50 68 L24 40 L40 72 Z" fill="#74c69d" ${S}/>
<path d="M50 68 L78 42 L62 72 Z" fill="#52b788" ${S}/>
<path d="M46 48 L50 40" ${vein}/>
<circle cx="46" cy="50" r="2" fill="${O}"/><circle cx="56" cy="50" r="2" fill="${O}"/>
<path d="M46 58 Q50 62 54 58" fill="none" ${S}/>
${hi('M40 74 H52')}`;

const lily = `${shadow(50, 24)}
<path d="M30 66 H70 L64 94 H36 Z" fill="#bde0fe" ${I}/>
<path d="M54 68 H70 L64 92 H54 Z" fill="#8ecae6"/>
<ellipse cx="50" cy="62" rx="26" ry="8" fill="#eaf6ff" ${S}/>
<ellipse cx="36" cy="46" rx="14" ry="8" fill="#95d5b2" ${S} transform="rotate(-16 36 46)"/>
<ellipse cx="64" cy="44" rx="14" ry="8" fill="#52b788" ${S} transform="rotate(18 64 44)"/>
<ellipse cx="50" cy="36" rx="12" ry="7" fill="#74c69d" ${S}/>
<circle cx="50" cy="34" r="4" fill="#ffb7cc" ${S}/>
<path d="M40 44 L48 40" ${vein}/>${hi('M36 70 H48')}`;

const moss = `${shadow(50, 22)}
<path d="M16 58 Q50 46 84 58 Q80 90 50 94 Q20 90 16 58 Z" fill="#e7c49a" ${I}/>
<path d="M54 54 Q80 58 80 74 Q76 88 54 90 Z" fill="#d4a373"/>
<ellipse cx="34" cy="52" rx="12" ry="8" fill="#95d5b2" ${S}/>
<ellipse cx="52" cy="46" rx="14" ry="9" fill="#74c69d" ${S}/>
<ellipse cx="68" cy="52" rx="11" ry="7" fill="#52b788" ${S}/>
<path d="M46 44 L52 40" ${vein}/>${hi('M28 60 Q36 56 42 58')}`;

const clover = `${shadow(50, 16)}
<path d="M46 70 V92" stroke="#52b788" stroke-width="3" stroke-linecap="round"/>
<path d="M42 88 H58 L54 96 H46 Z" fill="#ff9f68" ${S}/>
<circle cx="40" cy="52" r="12" fill="#95d5b2" ${S}/>
<circle cx="60" cy="52" r="12" fill="#52b788" ${S}/>
<circle cx="50" cy="40" r="12" fill="#74c69d" ${S}/>
<path d="M50 36 V48" ${vein}/>${hi('M34 48 H42')}`;

const sprout = `${shadow(50, 18)}
<path d="M34 74 H66 L60 94 H40 Z" fill="#fff" ${I}/>
<path d="M54 76 H66 L60 92 H54 Z" fill="#e7eef3"/>
<path d="M50 74 V48" stroke="#52b788" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="36" cy="46" rx="14" ry="8" fill="#95d5b2" ${S} transform="rotate(-30 36 46)"/>
<ellipse cx="64" cy="44" rx="14" ry="8" fill="#52b788" ${S} transform="rotate(28 64 44)"/>
<circle cx="50" cy="36" r="4" fill="#bde0fe" ${S}/>
<path d="M30 44 L40 40" ${vein}/>${hi('M40 78 H50')}`;

const bamboo = `${shadow(50, 16)}
<rect x="40" y="70" width="20" height="22" rx="4" fill="#e7c49a" ${I}/>
<path d="M52 72 H58 V90 H52 Z" fill="#d4a373"/>
<path d="M46 28 V72 M58 22 V72" stroke="#74c69d" stroke-width="5" stroke-linecap="round"/>
<path d="M46 40 H54 M58 36 H66 M46 56 H54" stroke="#52b788" stroke-width="2" stroke-linecap="round"/>
<ellipse cx="30" cy="36" rx="10" ry="5" fill="#95d5b2" ${S} transform="rotate(-20 30 36)"/>
<ellipse cx="74" cy="30" rx="10" ry="5" fill="#52b788" ${S} transform="rotate(16 74 30)"/>
${hi('M44 76 H50')}`;

const herb = `${shadow(50, 14)}
<path d="M36 62 H64 L60 92 H40 Z" fill="#c9a0dc" ${I}/>
<path d="M54 64 H64 L60 90 H54 Z" fill="#b388d6"/>
<path d="M44 62 V36 M50 62 V28 M56 62 V38" stroke="#52b788" stroke-width="2.4" stroke-linecap="round"/>
<ellipse cx="40" cy="40" rx="6" ry="3.5" fill="#95d5b2" ${S}/><ellipse cx="50" cy="32" rx="6" ry="3.5" fill="#74c69d" ${S}/>
<ellipse cx="60" cy="42" rx="6" ry="3.5" fill="#52b788" ${S}/>
<path d="M48 30 L52 28" ${vein}/>${hi('M40 68 H50')}`;

export const BATHROOM_ITEMS: ItemDef[] = [
  { kind: 'clawfoot-tub', name: 'Clawfoot Tub', cat: 'furniture', w: 250, h: 180, vb: '0 0 140 100', svg: tub },
  { kind: 'rain-shower', name: 'Rain Shower', cat: 'furniture', w: 150, h: 220, vb: '0 0 90 120', svg: shower },
  { kind: 'mirror-vanity', name: 'Mirror Vanity', cat: 'furniture', w: 190, svg: vanity },
  { kind: 'little-toilet', name: 'Little Toilet', cat: 'furniture', w: 120, svg: toilet },
  { kind: 'towel-ladder', name: 'Towel Ladder', cat: 'furniture', w: 120, svg: ladder },
  { kind: 'wall-towel-bar', name: 'Wall Towel Bar', cat: 'decor', w: 170, wall: true, vb: '0 0 130 100', svg: towelBar },
  { kind: 'bath-cubby', name: 'Bath Cubby', cat: 'furniture', w: 150, svg: cubby },
  { kind: 'clothes-hamper', name: 'Clothes Hamper', cat: 'furniture', w: 130, svg: hamper },
  { kind: 'sink-step', name: 'Sink Step', cat: 'furniture', w: 110, svg: step },
  { kind: 'linen-cupboard', name: 'Linen Cupboard', cat: 'furniture', w: 120, h: 180, vb: '0 0 80 120', svg: cupboard },
  { kind: 'puddle-mat', name: 'Puddle Bath Mat', cat: 'decor', w: 320, vb: '0 0 140 100', svg: mat },
  { kind: 'sunny-ducky', name: 'Sunny Ducky', cat: 'decor', w: 80, svg: ducky },
  { kind: 'shell-soap', name: 'Shell Soap Dish', cat: 'decor', w: 70, svg: soap },
  { kind: 'bubble-bottle', name: 'Bubble Bottle', cat: 'decor', w: 55, svg: bottle },
  { kind: 'bubble-mobile', name: 'Bubble Mobile', cat: 'decor', w: 140, wall: true, svg: mobile },
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
