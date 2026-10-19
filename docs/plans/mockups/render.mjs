// Draws the bathroom plan mockups. Not part of the game.
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const O = '#5a3d5c';
const st = `stroke="${O}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`;
const shadow = `<ellipse cx="50" cy="97" rx="34" ry="3.1" fill="#1f1020" opacity=".16"/>`;
const shade = (d, op = '.16') => `<path d="${d}" fill="#3a1d3c" opacity="${op}"/>`;
const hi = (x, y, rx, ry, extra = '') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".62" ${extra}/>`;
const speck = (pts) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.15" fill="#fff" opacity=".55"/>`).join('');
const wrap = (inner) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const svg = (vb, inner) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const PORC = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="0.15" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".42" stop-color="#f4f8fb"/><stop offset="1" stop-color="#c5d8e4"/></linearGradient>`;
const CHROME = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#d5dee6"/><stop offset="1" stop-color="#8ea0ad"/></linearGradient>`;
/** Soft foam. No outline, so the bubbles do not read as rings. */
const foam = (bubbles) => bubbles.map(([x, y, r]) => `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><path d="M${x - r * .72} ${y + r * .05} Q${x} ${y + r * .9} ${x + r * .72} ${y + r * .05}" fill="#d7eef6"/><ellipse cx="${x - r * .28}" cy="${y - r * .32}" rx="${(r * .32).toFixed(1)}" ry="${(r * .2).toFixed(1)}" fill="#fff"/></g>`).join('');
const claw = (x) => `<path d="M${x} 74 C${x - 6} 82 ${x - 8} 90 ${x - 2} 93 C${x + 4} 96 ${x + 8} 92 ${x + 7} 86 C${x + 6} 80 ${x + 4} 76 ${x + 2} 74 Z" fill="#f7f1e8" ${st}/><path d="M${x - 1} 90 l-3 3 M${x + 2} 92 l0 3 M${x + 5} 90 l3 2" fill="none" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/>`;
/** Scalloped rug edge. bump is how far each scallop sticks out. */
function scallop(cx, cy, rx, ry, n, bump) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2;
    const a1 = ((i + 1) / n) * Math.PI * 2;
    const am = ((i + 0.5) / n) * Math.PI * 2;
    const x0 = cx + Math.cos(a0) * rx;
    const y0 = cy + Math.sin(a0) * ry;
    const x1 = cx + Math.cos(a1) * rx;
    const y1 = cy + Math.sin(a1) * ry;
    const xm = cx + Math.cos(am) * (rx + bump);
    const ym = cy + Math.sin(am) * (ry + bump * 0.7);
    d += (i === 0 ? `M${x0.toFixed(1)} ${y0.toFixed(1)}` : '') + `Q${xm.toFixed(1)} ${ym.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  return d + 'Z';
}
const daisy = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <g fill="#fff" stroke="${O}" stroke-width="1.7" stroke-linejoin="round">
    <circle cx="0" cy="-7.2" r="4.2"/><circle cx="6.4" cy="-3.6" r="4.2"/><circle cx="6.4" cy="3.6" r="4.2"/>
    <circle cx="0" cy="7.2" r="4.2"/><circle cx="-6.4" cy="3.6" r="4.2"/><circle cx="-6.4" cy="-3.6" r="4.2"/>
  </g>
  <circle cx="0" cy="0" r="3.3" fill="#ffd166" stroke="${O}" stroke-width="1.7"/>
</g>`;

const tub = svg('0 0 120 100', `<defs>${PORC('tubPorc')}${CHROME('tubChrome')}</defs>
  <ellipse cx="60" cy="97" rx="48" ry="3" fill="#1f1020" opacity=".16"/>
  ${claw(28)}${claw(46)}${claw(74)}${claw(92)}
  <path d="M14 58 Q10 86 36 88 H84 Q110 86 106 58 Z" fill="url(#tubPorc)" ${st}/>
  ${shade('M78 64 Q102 70 98 84 Q78 90 70 78 Z', '.1')}
  <path d="M18 70 Q60 78 102 68" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
  <path d="M8 50 Q8 36 60 34 Q112 36 112 50 Q112 66 60 68 Q8 66 8 50 Z" fill="url(#tubPorc)" ${st}/>
  <ellipse cx="60" cy="50" rx="40" ry="11" fill="#f5fcfe"/>
  ${foam([[28, 46, 12], [46, 40, 14], [66, 44, 13], [84, 46, 11], [36, 52, 9], [54, 50, 10], [74, 52, 9], [92, 42, 8], [22, 50, 7]])}
  <path d="M14 58 Q60 70 106 58" fill="none" stroke="${O}" stroke-width="3.5" stroke-linecap="round"/>
  <rect x="96" y="30" width="9" height="16" rx="3" fill="url(#tubChrome)" ${st}/>
  <path d="M100 32 C114 18 122 38 110 48" fill="none" stroke="url(#tubChrome)" stroke-width="5" stroke-linecap="round"/>
  <path d="M100 32 C114 18 122 38 110 48" fill="none" stroke="${O}" stroke-width="1.4" stroke-linecap="round"/>
  <circle cx="94" cy="28" r="3.2" fill="url(#tubChrome)" ${st}/><circle cx="106" cy="26" r="3.2" fill="url(#tubChrome)" ${st}/>
  <circle cx="110" cy="50" r="1.7" fill="#9fd4ea"/>
  ${hi(28, 46, 8, 2.2)}`);

const shower = svg('0 0 100 140', `<defs>${CHROME('shChrome')}<linearGradient id="shGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".75"/><stop offset=".4" stop-color="#dff4f8" stop-opacity=".45"/><stop offset="1" stop-color="#b7dbe6" stop-opacity=".35"/></linearGradient></defs>
  <ellipse cx="50" cy="136" rx="40" ry="3" fill="#1f1020" opacity=".16"/>
  <path d="M12 118 H88 Q94 118 94 124 V130 Q94 136 50 136 Q6 136 6 130 V124 Q6 118 12 118 Z" fill="#e7f3f6" ${st}/>
  <path d="M16 28 H84 V120 H16 Z" fill="#f5fcfe" ${st}/>
  <path d="M18 36 H82 V116 H18 Z" fill="url(#shGlass)" ${st}/>
  <path d="M50 30 V120" stroke="${O}" stroke-width="3"/>
  <path d="M28 48 L46 108" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>
  <rect x="78" y="70" width="7" height="14" rx="3" fill="#f4d58a" ${st}/>
  <rect x="10" y="22" width="80" height="8" rx="3" fill="#f3d2b5" ${st}/>
  <path d="M14 30 Q4 70 12 124 Q26 112 28 30 Z" fill="#ffd0e0" ${st}/>
  ${shade('M16 48 Q10 80 16 118 H26 V36 Q18 36 16 48 Z', '.12')}
  <path d="M18 46 q6 8 2 16" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>
  <rect x="62" y="30" width="18" height="7" rx="3" fill="url(#shChrome)" ${st}/>
  <path d="M66 40 V58 M72 38 V62 M78 42 V56" stroke="#7ec4de" stroke-width="2" stroke-linecap="round"/>
  <circle cx="66" cy="60" r="1.5" fill="#fff"/><circle cx="72" cy="64" r="1.6" fill="#fff"/><circle cx="78" cy="58" r="1.3" fill="#fff"/>
  ${speck([[36, 70], [58, 90]])}`);

const vanity = wrap(`${shadow}
  <rect x="10" y="48" width="80" height="42" rx="8" fill="#fff7ee" ${st}/>
  ${shade('M62 52 H86 V86 H62 Z', '.08')}
  <path d="M12 68 H88" ${st}/>
  <circle cx="28" cy="78" r="2.4" fill="${O}"/><circle cx="72" cy="78" r="2.4" fill="${O}"/>
  <rect x="8" y="42" width="84" height="10" rx="5" fill="#ffd0e0" ${st}/>
  ${hi(24, 46, 12, 2)}
  <ellipse cx="22" cy="40" rx="6" ry="3" fill="#fff" ${st}/><circle cx="22" cy="39" r="1.2" fill="#ffb3c6"/>
  <rect x="70" y="36" width="8" height="8" rx="2" fill="#cfefff" ${st}/>
  <path d="M50 8 C68 8 76 20 76 36 C76 44 64 46 50 46 C36 46 24 44 24 36 C24 20 32 8 50 8 Z" fill="#f4d58a" ${st}/>
  <ellipse cx="50" cy="28" rx="18" ry="16" fill="#e7f6ff" ${st}/>
  <path d="M36 22 l8 -6 M38 30 l14 -12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <circle cx="34" cy="10" r="2.2" fill="#fff" ${st}/>
  ${speck([[30, 74], [74, 62]])}`);

const toilet = svg('0 0 100 124', `<defs>${PORC('toiPorc')}${CHROME('toiChrome')}</defs>
  <ellipse cx="50" cy="118" rx="26" ry="3.2" fill="#1f1020" opacity=".16"/>
  <path d="M38 102 H62 L66 116 H34 Z" fill="url(#toiPorc)" ${st}/>
  <rect x="28" y="18" width="44" height="34" rx="7" fill="url(#toiPorc)" ${st}/>
  <rect x="24" y="10" width="52" height="12" rx="5" fill="#fff" ${st}/>
  ${shade('M56 22 H68 V48 H56 Z', '.1')}
  ${hi(36, 15, 10, 2.2)}
  <rect x="70" y="28" width="12" height="6" rx="3" fill="url(#toiChrome)" ${st}/>
  <circle cx="82" cy="31" r="3.2" fill="#f4d58a" ${st}/>
  <path d="M18 78 H82 Q88 78 88 86 V94 Q88 108 50 108 Q12 108 12 94 V86 Q12 78 18 78 Z" fill="url(#toiPorc)" ${st}/>
  ${shade('M60 84 H84 Q80 102 52 104 Q66 94 60 84 Z', '.1')}
  <path d="M28 92 Q50 100 74 90" fill="none" stroke="#fff" stroke-width="2.5" opacity=".4"/>
  <ellipse cx="50" cy="78" rx="32" ry="10" fill="#dfeaf1" ${st}/>
  <ellipse cx="50" cy="70" rx="32" ry="11" fill="url(#toiPorc)" ${st}/>
  <ellipse cx="50" cy="66" rx="18" ry="4.2" fill="#fff" opacity=".7"/>
  <rect x="30" y="62" width="8" height="7" rx="2" fill="#fff" ${st}/>
  <rect x="62" y="62" width="8" height="7" rx="2" fill="#fff" ${st}/>
  ${daisy(50, 71, 0.58)}
  ${speck([[40, 28], [58, 96]])}`);

const ladder = wrap(`${shadow}
  <path d="M28 16 L22 92 M72 16 L78 92" ${st}/>
  <path d="M26 36 H74 M24 56 H76 M23 74 H77" ${st}/>
  <path d="M30 40 H70 L66 54 H34 Z" fill="#ffc2d4" ${st}/>
  ${shade('M36 48 H66 L64 54 H34 Z', '.14')}
  ${hi(40, 44, 8, 2)}
  <path d="M32 60 H68 L64 74 H36 Z" fill="#c9eef6" ${st}/>
  ${shade('M38 68 H64 L62 74 H36 Z', '.12')}
  <path d="M46 42 q4 2 8 0" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>
  ${speck([[40, 66], [58, 46]])}`);

const bar = svg('0 0 130 100', `
  <circle cx="24" cy="30" r="5" fill="#fff7ee" ${st}/>
  <circle cx="106" cy="30" r="5" fill="#fff7ee" ${st}/>
  <rect x="16" y="26" width="98" height="9" rx="4.5" fill="#f3d2b5" ${st}/>
  <path d="M38 30 H92 L88 48 H42 Z" fill="#f7c9d4"/>
  <path d="M32 27 H98 C97 42 94 86 86 90 H44 C36 86 33 42 32 27 Z" fill="#fff6f2" ${st}/>
  <path d="M36 40 H94 M35 50 H93 M34 60 H92 M35 70 H91 M38 80 H88" stroke="#5eb0d4" stroke-width="4" stroke-linecap="round"/>
  <path d="M37 45 H93 M36 65 H90" stroke="#ff8fab" stroke-width="3" stroke-linecap="round"/>
  <path d="M34 27 Q65 40 96 27" fill="#ffe4ea" ${st}/>
  <path d="M44 30 Q65 35 86 30" fill="none" stroke="#fff" stroke-width="2.2" opacity=".9"/>
  ${shade('M70 44 H94 L90 84 H74 Z', '.08')}`);

const cubby = wrap(`${shadow}
  <rect x="14" y="16" width="72" height="74" rx="8" fill="#f6e2c4" ${st}/>
  ${shade('M62 20 H82 V86 H62 Z', '.1')}
  <path d="M14 40 H86 M14 64 H86" ${st}/>
  <path d="M22 24 H46 L42 36 H26 Z" fill="#ffc2d4" ${st}/>
  <path d="M52 26 H74 L70 36 H56 Z" fill="#c9eef6" ${st}/>
  <rect x="24" y="46" width="14" height="14" rx="3" fill="#fff" ${st}/>
  <rect x="44" y="48" width="10" height="12" rx="3" fill="#ffd0e0" ${st}/>
  <circle cx="68" cy="52" r="6" fill="#ffe08a" ${st}/>
  <ellipse cx="40" cy="76" rx="16" ry="6" fill="#fff" ${st}/>
  ${hi(28, 28, 6, 2)}
  ${speck([[30, 50], [60, 74]])}`);

const hamper = wrap(`${shadow}
  <path d="M22 40 H78 L84 90 H16 Z" fill="#f0d2a8" ${st}/>
  ${shade('M60 44 H78 L82 88 H64 Z', '.12')}
  <path d="M24 52 H76 M26 64 H78 M28 76 H80" stroke="#e7b98a" stroke-width="3"/>
  <path d="M36 48 V84 M50 46 V86 M64 48 V84" stroke="#e7c49a" stroke-width="2" opacity=".7"/>
  <rect x="16" y="32" width="68" height="12" rx="6" fill="#ffe0b8" ${st}/>
  <path d="M28 32 Q50 18 72 32" fill="#fff7ee" ${st}/>
  <path d="M40 30 Q50 36 58 28 L62 40 H38 Z" fill="#ffc2d4" ${st}/>
  ${hi(32, 36, 8, 2)}
  ${speck([[40, 60], [58, 72]])}`);

const step = wrap(`${shadow}
  <rect x="20" y="86" width="10" height="12" rx="2" fill="#e0b080" ${st}/>
  <rect x="70" y="86" width="10" height="12" rx="2" fill="#e0b080" ${st}/>
  <path d="M12 68 H88 V86 H12 Z" fill="#e7b56e" ${st}/>
  <path d="M12 68 L22 58 H78 L88 68 Z" fill="#ffe0b8" ${st}/>
  ${shade('M60 72 H84 V86 H60 Z', '.12')}
  <path d="M30 42 H70 V60 H30 Z" fill="#f0c48a" ${st}/>
  <path d="M30 42 L38 34 H62 L70 42 Z" fill="#fff0d2" ${st}/>
  ${hi(40, 38, 8, 2)}
  <path d="M22 62 H78" stroke="#fff" stroke-width="2" opacity=".5"/>`);

const cupboard = wrap(`${shadow}
  <rect x="22" y="12" width="56" height="78" rx="8" fill="#e7f6f2" ${st}/>
  ${shade('M58 16 H74 V86 H58 Z', '.1')}
  <path d="M22 38 H78 M50 38 V86" ${st}/>
  <circle cx="42" cy="26" r="2.2" fill="${O}"/><circle cx="58" cy="26" r="2.2" fill="${O}"/>
  <circle cx="44" cy="58" r="2.2" fill="${O}"/><circle cx="56" cy="58" r="2.2" fill="${O}"/>
  <rect x="34" y="8" width="14" height="8" rx="2" fill="#ffd0e0" ${st}/>
  ${hi(32, 22, 6, 3)}
  ${speck([[36, 70], [64, 48]])}`);

const mat = svg('0 0 160 96', `
  <ellipse cx="80" cy="78" rx="62" ry="8" fill="#1f1020" opacity=".14"/>
  <path d="${scallop(80, 46, 48, 20, 18, 10)}" fill="#f3b7c8"/>
  <path d="${scallop(80, 46, 52, 22, 18, 11)}" fill="#ffd0dc" ${st}/>
  <path d="${scallop(80, 46, 36, 14, 14, 5)}" fill="#fff6f8"/>
  <path d="M52 40 q6 -8 12 0 M70 36 q6 -8 12 0 M88 36 q6 -8 12 0 M106 40 q5 -7 10 0 M58 52 q5 -6 10 0 M78 50 q6 -7 12 0 M98 52 q5 -6 10 0 M64 62 q5 -5 9 0 M86 60 q5 -5 10 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"/>
  <path d="M44 58 q4 6 2 10 M116 56 q-2 8 2 12 M80 28 q2 6 0 10" fill="none" stroke="#e89aaf" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
  ${speck([[62, 48], [98, 50], [78, 58], [90, 42]])}`);

const ducky = wrap(`${shadow}
  <ellipse cx="48" cy="70" rx="28" ry="20" fill="#ffd86a" ${st}/>
  ${shade('M30 74 Q48 90 70 74 Q60 84 40 82 Z', '.14')}
  <circle cx="62" cy="48" r="16" fill="#ffe08a" ${st}/>
  ${hi(56, 42, 5, 3)}
  <circle cx="66" cy="46" r="2.2" fill="${O}"/><circle cx="67" cy="45" r=".8" fill="#fff"/>
  <path d="M74 50 l14 3 -14 5 z" fill="#ff9f43" ${st}/>
  <ellipse cx="56" cy="56" rx="4" ry="2.4" fill="#ff9bb5" opacity=".7"/>
  <ellipse cx="34" cy="78" rx="6" ry="3" fill="#ffb703" ${st}/>
  ${speck([[40, 64]])}`);

const soap = wrap(`${shadow}
  <path d="M14 62 Q20 40 50 42 Q82 40 86 64 Q90 84 50 88 Q12 86 14 62 Z" fill="#fff6ea" ${st}/>
  ${shade('M24 70 Q50 92 78 68 Q70 82 40 80 Z', '.1')}
  <ellipse cx="50" cy="58" rx="16" ry="10" fill="#ffd0e0" ${st}/>
  ${hi(44, 54, 5, 2.4)}
  <circle cx="34" cy="52" r="3" fill="#fff" opacity=".8"/><circle cx="66" cy="50" r="2.2" fill="#fff" opacity=".75"/>
  ${speck([[28, 66], [70, 72]])}`);

const bottle = wrap(`${shadow}
  <rect x="40" y="10" width="20" height="10" rx="4" fill="#c9a0dc" ${st}/>
  <rect x="46" y="18" width="8" height="8" fill="#fff" ${st}/>
  <path d="M30 32 H70 L66 90 Q50 96 34 90 Z" fill="#d7f4ff" ${st}/>
  ${shade('M52 40 H66 L64 86 Q56 90 52 84 Z', '.1')}
  <circle cx="42" cy="58" r="5" fill="#fff" opacity=".75"/><circle cx="54" cy="70" r="4" fill="#fff" opacity=".6"/>
  <circle cx="48" cy="48" r="3" fill="#fff" opacity=".8"/>
  <path d="M62 28 Q78 20 80 36" fill="none" ${st}/>
  <circle cx="82" cy="24" r="4" fill="#fff" ${st}/><circle cx="74" cy="16" r="2.4" fill="#fff" opacity=".9"/>
  ${hi(40, 48, 4, 6)}`);

const mobile = wrap(`
  <path d="M50 6 V18" ${st}/>
  <ellipse cx="50" cy="22" rx="22" ry="6" fill="#fff" ${st}/>
  <path d="M32 26 V48 M50 28 V62 M68 26 V46" ${st}/>
  <circle cx="32" cy="56" r="8" fill="#c9eef6" ${st}/>${hi(29, 53, 2.4, 1.6)}
  <circle cx="50" cy="72" r="9" fill="#fff" ${st}/>${hi(47, 68, 2.6, 1.8)}
  <circle cx="68" cy="54" r="7" fill="#ffd0e0" ${st}/>${hi(66, 51, 2, 1.4)}
  <circle cx="40" cy="40" r="3" fill="#fff" opacity=".85"/>`);

const brush = wrap(`${shadow}
  <path d="M28 40 H72 L68 90 H32 Z" fill="#fff7ee" ${st}/>
  ${shade('M52 48 H68 L66 86 H52 Z', '.1')}
  <rect x="36" y="14" width="8" height="36" rx="3" fill="#8ecae6" ${st}/>
  <rect x="56" y="18" width="8" height="32" rx="3" fill="#ff8fab" ${st}/>
  <path d="M34 14 H46 M54 18 H66" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  ${hi(40, 58, 6, 3)}
  ${speck([[44, 72]])}`);

const porthole = wrap(`
  <circle cx="50" cy="50" r="40" fill="#f4d58a" ${st}/>
  <circle cx="50" cy="50" r="30" fill="#e7f6ff" ${st}/>
  <path d="M32 36 l10 -8 M34 48 l18 -16" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  ${shade('M50 50 l22 8 a30 30 0 0 1 -40 18 Z', '.1')}
  <circle cx="50" cy="10" r="4" fill="#ff8fab" ${st}/>
  ${speck([[40, 42], [62, 58]])}`);

const tray = wrap(`${shadow}
  <path d="M8 58 H92 L84 78 H16 Z" fill="#fff7ee" ${st}/>
  ${shade('M20 66 H84 L78 76 H22 Z', '.1')}
  <rect x="18" y="40" width="22" height="16" rx="3" fill="#c9e7ff" ${st}/>
  <path d="M22 44 H36" stroke="#fff" stroke-width="2"/>
  <ellipse cx="62" cy="48" rx="12" ry="8" fill="#ffd86a" ${st}/>
  <circle cx="66" cy="46" r="1.4" fill="${O}"/>
  <path d="M74 48 l6 1 -6 2 z" fill="#ff9f43"/>
  ${hi(24, 62, 10, 2)}`);

const hooks = wrap(`
  <rect x="16" y="22" width="68" height="10" rx="5" fill="#f3d2b5" ${st}/>
  <circle cx="30" cy="40" r="5" fill="#fff" ${st}/>
  <circle cx="50" cy="40" r="5" fill="#fff" ${st}/>
  <circle cx="70" cy="40" r="5" fill="#fff" ${st}/>
  <path d="M58 44 H82 L78 88 H62 Z" fill="#ffd0e0" ${st}/>
  ${shade('M66 56 H80 L76 86 H66 Z', '.12')}
  <path d="M64 58 q8 4 12 0" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>
  ${speck([[36, 26]])}`);

const timer = wrap(`${shadow}
  <rect x="42" y="8" width="16" height="8" rx="3" fill="#f3d2b5" ${st}/>
  <path d="M30 22 H70 L58 48 H42 Z" fill="#fff6ea" ${st}/>
  <path d="M30 78 H70 L58 52 H42 Z" fill="#c9eef6" ${st}/>
  <path d="M30 22 H70 L58 48 H42 Z" fill="none" ${st}/>
  <path d="M30 78 H70 L58 52 H42 Z" fill="none" ${st}/>
  ${shade('M48 28 H66 L58 46 H46 Z', '.1')}
  <circle cx="50" cy="62" r="1.6" fill="#8ecae6"/><circle cx="54" cy="68" r="1.3" fill="#8ecae6"/>
  ${hi(42, 30, 4, 2)}`);

const fern = wrap(`${shadow}
  <path d="M50 88 C50 60 18 50 16 28 C36 36 44 58 50 88" fill="#7dce8a" ${st}/>
  <path d="M50 88 C50 62 82 48 86 24 C66 36 58 60 50 88" fill="#5db87a" ${st}/>
  <path d="M50 88 C46 64 34 58 24 46" fill="none" stroke="#3d9a62" stroke-width="3"/>
  ${hi(28, 40, 4, 6, 'transform="rotate(-30 28 40)"')}
  <path d="M32 78 H68 L62 96 H38 Z" fill="#fff" ${st}/>
  <rect x="30" y="74" width="40" height="8" rx="3" fill="#ffd0e0" ${st}/>
  ${speck([[40, 50], [64, 42]])}`);

const eucalyptus = wrap(`
  <path d="M50 8 V92" ${st}/>
  <ellipse cx="36" cy="28" rx="12" ry="6" fill="#8fd4a8" ${st} transform="rotate(-30 36 28)"/>
  <ellipse cx="64" cy="40" rx="12" ry="6" fill="#b7e4c7" ${st} transform="rotate(28 64 40)"/>
  <ellipse cx="34" cy="54" rx="12" ry="6" fill="#74c69d" ${st} transform="rotate(-24 34 54)"/>
  <ellipse cx="66" cy="66" rx="11" ry="5" fill="#95d5b2" ${st} transform="rotate(26 66 66)"/>
  <ellipse cx="40" cy="78" rx="10" ry="5" fill="#8fd4a8" ${st} transform="rotate(-18 40 78)"/>
  ${hi(32, 26, 3, 1.4, 'transform="rotate(-30 32 26)"')}
  ${speck([[60, 38], [38, 52]])}`);

const succulent = wrap(`${shadow}
  <path d="M24 62 H76 L70 94 H30 Z" fill="#f3d2b5" ${st}/>
  <ellipse cx="36" cy="48" rx="10" ry="16" fill="#95d5b2" ${st} transform="rotate(-28 36 48)"/>
  <ellipse cx="64" cy="48" rx="10" ry="16" fill="#74c69d" ${st} transform="rotate(28 64 48)"/>
  <ellipse cx="50" cy="40" rx="10" ry="18" fill="#b7e4c7" ${st}/>
  ${hi(46, 32, 3, 5)}
  <circle cx="40" cy="78" r="3" fill="#e7d3b0"/><circle cx="52" cy="82" r="2.4" fill="#efe4d4"/><circle cx="62" cy="76" r="2.6" fill="#e7d3b0"/>
  ${speck([[50, 36]])}`);

const aloe = wrap(`${shadow}
  <path d="M50 86 L38 40 Q50 30 62 40 Z" fill="#b7e4c7" ${st}/>
  <path d="M34 80 L22 36 Q36 28 42 48 Z" fill="#95d5b2" ${st}/>
  <path d="M66 80 L78 36 Q64 28 58 48 Z" fill="#74c69d" ${st}/>
  ${shade('M50 70 L44 48 Q50 44 56 48 Z', '.12')}
  <circle cx="46" cy="58" r="1.6" fill="${O}"/><circle cx="56" cy="58" r="1.6" fill="${O}"/>
  <path d="M48 64 q2 2 4 0" fill="none" ${st}/>
  <path d="M28 70 H72 L66 96 H34 Z" fill="#c9a0dc" ${st}/>
  ${speck([[48, 48]])}`);

const lily = wrap(`${shadow}
  <path d="M26 64 H74 L68 94 H32 Z" fill="#c9eef6" ${st}/>
  <ellipse cx="40" cy="46" rx="14" ry="8" fill="#7dce8a" ${st}/>
  <ellipse cx="60" cy="44" rx="14" ry="8" fill="#95d5b2" ${st}/>
  <ellipse cx="50" cy="36" rx="12" ry="7" fill="#b7e4c7" ${st}/>
  <circle cx="50" cy="34" r="4" fill="#ffd0e0" ${st}/>
  ${hi(36, 44, 4, 2)}
  ${speck([[58, 42], [44, 78]])}`);

const moss = wrap(`${shadow}
  <path d="M16 58 Q18 40 50 40 Q82 40 84 58 V78 Q84 94 50 94 Q16 94 16 78 Z" fill="#fff7ee" ${st}/>
  <path d="M22 58 Q50 48 78 58 V70 H22 Z" fill="#8fd4a8"/>
  ${shade('M24 64 Q50 74 76 62 V70 H24 Z', '.12')}
  <circle cx="36" cy="56" r="6" fill="#74c69d" ${st}/><circle cx="52" cy="52" r="7" fill="#b7e4c7" ${st}/><circle cx="66" cy="56" r="5" fill="#95d5b2" ${st}/>
  ${hi(48, 48, 3, 2)}`);

const clover = wrap(`${shadow}
  <path d="M46 70 H54 L52 92 H48 Z" fill="#74c69d" ${st}/>
  <circle cx="40" cy="52" r="12" fill="#8fd4a8" ${st}/>
  <circle cx="60" cy="52" r="12" fill="#74c69d" ${st}/>
  <circle cx="50" cy="40" r="12" fill="#b7e4c7" ${st}/>
  ${hi(46, 36, 3, 2)}
  <path d="M30 78 H70 L64 96 H36 Z" fill="#ffd0e0" ${st}/>
  ${speck([[50, 50]])}`);

const rainSprout = wrap(`${shadow}
  <path d="M50 90 V48" stroke="#3d9a62" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="34" cy="46" rx="14" ry="8" fill="#7dce8a" ${st} transform="rotate(-20 34 46)"/>
  <ellipse cx="66" cy="44" rx="14" ry="8" fill="#95d5b2" ${st} transform="rotate(18 66 44)"/>
  <circle cx="50" cy="34" r="8" fill="#ffd166" ${st}/>
  <path d="M46 20 q2 -8 6 -6" fill="none" stroke="#8ecae6" stroke-width="2"/>
  <circle cx="54" cy="12" r="2" fill="#8ecae6"/>
  <path d="M28 74 H72 L66 96 H34 Z" fill="#fff" ${st}/>
  ${speck([[48, 32]])}`);

const bamboo = wrap(`${shadow}
  <rect x="44" y="18" width="12" height="64" rx="6" fill="#b7e4c7" ${st}/>
  <path d="M44 36 H56 M44 52 H56" ${st}/>
  <ellipse cx="28" cy="40" rx="14" ry="6" fill="#7dce8a" ${st} transform="rotate(-40 28 40)"/>
  <ellipse cx="74" cy="48" rx="14" ry="6" fill="#95d5b2" ${st} transform="rotate(36 74 48)"/>
  <path d="M30 76 H70 L64 96 H36 Z" fill="#cfefff" ${st}/>
  ${hi(48, 24, 2, 4)}
  ${speck([[48, 44]])}`);

const herb = wrap(`${shadow}
  <rect x="36" y="40" width="28" height="48" rx="8" fill="#fff" ${st}/>
  ${shade('M52 46 H62 V82 H52 Z', '.08')}
  <path d="M50 40 V18" stroke="#3d9a62" stroke-width="3"/>
  <ellipse cx="40" cy="28" rx="10" ry="5" fill="#7dce8a" ${st}/>
  <ellipse cx="62" cy="24" rx="10" ry="5" fill="#95d5b2" ${st}/>
  <ellipse cx="50" cy="16" rx="8" ry="4" fill="#b7e4c7" ${st}/>
  <rect x="34" y="36" width="32" height="8" rx="3" fill="#ffd0e0" ${st}/>
  ${speck([[46, 60]])}`);

const ITEMS = {
  tub, shower, vanity, toilet, ladder, bar, cubby, hamper, step, cupboard,
  mat, ducky, soap, bottle, mobile, brush, porthole, tray, hooks, timer,
  fern, eucalyptus, succulent, aloe, lily, moss, clover, rainSprout, bamboo, herb,
};

const FURNITURE = [
  ['tub', 'Clawfoot Tub'], ['shower', 'Rain Shower'], ['vanity', 'Mirror Vanity'], ['toilet', 'Little Toilet'],
  ['ladder', 'Towel Ladder'], ['bar', 'Wall Towel Bar'], ['cubby', 'Bath Cubby'], ['hamper', 'Clothes Hamper'],
  ['step', 'Sink Step'], ['cupboard', 'Linen Cupboard'],
];

const kid = readFileSync(join(dir, 'kid.svg'), 'utf8').replace('<svg ', '<svg class="kidSvg" ');

const MENU = `<svg viewBox="0 0 48 48"><path d="M11 15 H37 M11 24 H37 M11 33 H37" fill="none" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>`;
const MAP = `<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M17 8 V35 M31 13 V40" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2"/></svg>`;
const HAND = `<svg viewBox="0 0 48 48"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>`;
const BRUSH = `<svg viewBox="0 0 48 48"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3"/></svg>`;
const CHAIR = `<svg viewBox="0 0 48 48"><rect x="14" y="8" width="20" height="18" rx="6" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/><rect x="10" y="24" width="28" height="8" rx="3" fill="#5cc985" stroke="#5a3d5c" stroke-width="3"/></svg>`;
const BALLOON = `<svg viewBox="0 0 48 48"><ellipse cx="20" cy="20" rx="10" ry="12" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><ellipse cx="32" cy="18" rx="9" ry="11" fill="#a2d2ff" stroke="#5a3d5c" stroke-width="3"/></svg>`;
const FLOWER = `<svg viewBox="0 0 48 48"><circle cx="24" cy="20" r="8" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><circle cx="14" cy="26" r="6" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M24 28 V40" stroke="#52b788" stroke-width="3"/></svg>`;
const DONUT = `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="12" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="24" cy="24" r="4" fill="#fff" stroke="#5a3d5c" stroke-width="3"/></svg>`;
const CAT = `<svg viewBox="0 0 48 48"><circle cx="24" cy="26" r="12" fill="#ffb347" stroke="#5a3d5c" stroke-width="3"/><path d="M14 18 L16 8 L22 16 M34 18 L32 8 L26 16" fill="#ffb347" stroke="#5a3d5c" stroke-width="3"/></svg>`;

const NUDGE = (dir) => `<button class="nudge ${dir}" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="${dir === 'left' ? 'M24 10 L14 20 L24 30' : 'M16 10 L26 20 L16 30'}" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;

function tabs(full, on) {
  const names = full
    ? [['Living Room', 'living'], ['Bedroom', 'bedroom'], ['Kitchen', 'kitchen'], ['Salon', 'salon'], ['Nursery', 'nursery'], ['Bathroom', 'bathroom']]
    : [['Living', 'living'], ['Bed', 'bedroom'], ['Kitchen', 'kitchen'], ['Salon', 'salon'], ['Nursery', 'nursery'], ['Bath', 'bathroom']];
  const colors = { living: '#ff8fab', bedroom: '#b388d6', kitchen: '#5cc985', salon: '#f0a0d8', nursery: '#9ad7f5', bathroom: '#5ec4c0' };
  return names.map(([label, id]) => `<button class="tab ${id === on ? 'on' : ''}" style="--c:${colors[id]}">${label}</button>`).join('');
}

function sceneSvg() {
  const S = `stroke="${O}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
  const s2 = `stroke="${O}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;
  return `<svg class="scene" viewBox="0 0 480 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${PORC('scPorc')}${CHROME('scChrome')}
      <linearGradient id="scGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".78"/><stop offset=".5" stop-color="#dff4f8" stop-opacity=".4"/><stop offset="1" stop-color="#b7dbe6" stop-opacity=".3"/></linearGradient>
      <linearGradient id="scFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e4cc"/><stop offset="1" stop-color="#e4c9a4"/></linearGradient>
      <linearGradient id="scWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8dcb8"/><stop offset="1" stop-color="#e2b98a"/></linearGradient>
    </defs>
    <rect width="480" height="300" fill="#d7f6f8"/>
    ${wallDots()}
    <rect y="300" width="480" height="100" fill="#e5f4f7"/>
    ${wainscot()}
    <rect y="294" width="480" height="12" fill="#fff" ${S}/>
    <rect y="388" width="480" height="14" fill="#fff7ee" ${S}/>
    <rect y="400" width="480" height="200" fill="url(#scFloor)"/>
    <g stroke="#c9aa84" stroke-width="2" opacity=".4">
      <path d="M0 452 H480 M0 512 H480 M0 572 H480"/>
      <path d="M80 400 V452 M180 400 V452 M290 400 V452 M400 400 V452"/>
      <path d="M40 452 V512 M140 452 V512 M240 452 V512 M340 452 V512 M430 452 V512"/>
      <path d="M100 512 V600 M200 512 V600 M310 512 V600 M410 512 V600"/>
    </g>

    <g>
      <path d="M48 36 V118" stroke="${O}" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="36" cy="58" rx="12" ry="5" fill="#8fd4a8" stroke="${O}" stroke-width="2.4" transform="rotate(-28 36 58)"/>
      <ellipse cx="62" cy="74" rx="12" ry="5" fill="#b7e4c7" stroke="${O}" stroke-width="2.4" transform="rotate(26 62 74)"/>
      <ellipse cx="38" cy="96" rx="11" ry="4.5" fill="#74c69d" stroke="${O}" stroke-width="2.4" transform="rotate(-20 38 96)"/>
    </g>

    <path d="M168 132 Q156 78 186 68 Q164 96 172 132 Z" fill="#ffd0e0" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M214 132 Q228 78 198 68 Q218 96 210 132 Z" fill="#ffc2d4" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>
    <circle cx="190" cy="96" r="18" fill="#f4d58a" stroke="${O}" stroke-width="2.8"/>
    <circle cx="190" cy="96" r="12" fill="#cfefff" stroke="${O}" stroke-width="2.4"/>
    <path d="M182 90 l6 -5 M184 100 l8 -7" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>

    <circle cx="128" cy="168" r="5" fill="#f3d2b5" stroke="${O}" stroke-width="2.4"/>
    <path d="M128 168 v8" stroke="${O}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M122 176 q-10 6 -8 24 q12 3 16 -6 q4 10 14 6 q-2 -18 -22 -24 Z" fill="#7ec8e3" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M120 190 q6 4 10 0" fill="none" stroke="#fff" stroke-width="1.6" opacity=".7"/>

    <path d="M300 156 H424 Q430 156 430 162 V168 H294 V162 Q294 156 300 156 Z" fill="url(#scWood)" stroke="${O}" stroke-width="2.2"/>
    <path d="M312 168 V180 M412 168 V180" stroke="${O}" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="304" y="140" width="12" height="16" rx="3" fill="#fff" stroke="${O}" stroke-width="1.8"/>
    <rect x="306" y="148" width="8" height="7" rx="2" fill="#ffb7d1"/>
    <rect x="305" y="136" width="10" height="6" rx="2" fill="#f3d2b5" stroke="${O}" stroke-width="1.6"/>
    <rect x="322" y="142" width="12" height="14" rx="3" fill="#fff" stroke="${O}" stroke-width="1.8"/>
    <rect x="324" y="148" width="8" height="6" rx="1.5" fill="#c9eef6"/>
    <rect x="323" y="138" width="10" height="6" rx="2" fill="#e7f6f2" stroke="${O}" stroke-width="1.6"/>
    <path d="M346 132 L362 132 L358 156 L350 156 Z" fill="#e5f6ff" fill-opacity=".95" stroke="${O}" stroke-width="1.8"/>
    <ellipse cx="354" cy="132" rx="9" ry="3.2" fill="#f7fdff" stroke="${O}" stroke-width="1.8"/>
    <path d="M350 142 L352 156 L356 156 L358 142 Q354 145 350 142 Z" fill="#7ec8e3" opacity=".92"/>
    <ellipse cx="354" cy="142" rx="6" ry="2" fill="#3d9ec4"/>
    <path d="M349 136 L351 152" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".85"/>
    <rect x="372" y="138" width="14" height="18" rx="3" fill="#fff" stroke="${O}" stroke-width="1.8"/>
    <rect x="375" y="146" width="8" height="8" rx="2" fill="#ffb7d1"/>
    <rect x="374" y="130" width="10" height="9" rx="2" fill="url(#scChrome)" stroke="${O}" stroke-width="1.5"/>
    <rect x="373" y="124" width="12" height="8" rx="2" fill="url(#scChrome)" stroke="${O}" stroke-width="1.5"/>
    <path d="M385 128 H396" stroke="#d5dee6" stroke-width="3" stroke-linecap="round"/>
    <path d="M385 128 H396" fill="none" stroke="${O}" stroke-width="1.3" stroke-linecap="round"/>
    <rect x="392" y="124" width="6" height="6" rx="1.5" fill="#f4d58a" stroke="${O}" stroke-width="1.3"/>
    <rect x="376" y="118" width="6" height="7" rx="1.5" fill="#fff" stroke="${O}" stroke-width="1.4"/>
    <circle cx="398" cy="136" r="1.3" fill="#9fd4ea"/>

    <ellipse cx="50" cy="500" rx="34" ry="4" fill="#1f1020" opacity=".13"/>
    <path d="M22 476 H78 Q86 476 86 484 V492 Q86 504 50 504 Q14 504 14 492 V484 Q14 476 22 476 Z" fill="#e7f3f6" ${S}/>
    <path d="M26 276 H74 V478 H26 Z" fill="#f7fcfe" ${S}/>
    <path d="M30 288 H70 V470 H30 Z" fill="url(#scGlass)" ${S}/>
    <path d="M50 280 V478" ${S}/>
    <path d="M36 320 L46 450" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>
    <rect x="60" y="360" width="8" height="16" rx="3" fill="#f4d58a" ${S}/>
    <rect x="18" y="264" width="64" height="12" rx="4" fill="url(#scWood)" ${S}/>
    <path d="M24 276 Q16 340 22 470 Q36 440 38 276 Z" fill="#ffd0e0" ${S}/>
    <path d="M28 318 q5 8 1 12" fill="none" stroke="#fff" stroke-width="2" opacity=".75"/>
    <rect x="52" y="286" width="14" height="7" rx="3" fill="url(#scChrome)" ${S}/>
    <path d="M56 293 v12 M62 291 v16 M68 294 v10" stroke="#7ec4de" stroke-width="2" stroke-linecap="round"/>
    <circle cx="56" cy="308" r="1.6" fill="#fff"/><circle cx="62" cy="310" r="1.8" fill="#fff"/>

    <ellipse cx="278" cy="542" rx="62" ry="4.5" fill="#1f1020" opacity=".14"/>
    <path d="M236 500 C230 516 226 530 232 540 C238 546 244 538 242 526 C240 514 238 506 236 500 Z" fill="#f7f1e8" ${S}/>
    <path d="M262 508 C256 522 252 534 258 542 C264 548 270 540 268 528 C266 516 264 510 262 508 Z" fill="#f7f1e8" ${S}/>
    <path d="M300 508 C294 522 290 534 296 542 C302 548 308 540 306 528 C304 516 302 510 300 508 Z" fill="#f7f1e8" ${S}/>
    <path d="M326 500 C320 516 316 530 322 540 C328 546 334 538 332 526 C330 514 328 506 326 500 Z" fill="#f7f1e8" ${S}/>
    <path d="M232 520 l-3 3 M260 528 l-2 3 M298 528 l-2 3 M326 520 l-3 3" fill="none" stroke="${O}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M230 468 Q222 516 258 524 H304 Q338 516 330 468 Z" fill="url(#scPorc)" ${S}/>
    ${shade('M300 482 Q332 496 328 516 Q300 522 288 500 Z', '.1')}
    <path d="M240 490 Q280 506 328 488" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <path d="M214 450 Q212 424 280 420 Q348 424 346 450 Q346 478 280 484 Q214 478 214 450 Z" fill="url(#scPorc)" ${S}/>
    <ellipse cx="280" cy="450" rx="52" ry="13" fill="#f5fcfe"/>
    ${foam([[246, 440, 11], [270, 432, 13], [298, 438, 12], [236, 448, 8], [258, 450, 8], [286, 448, 9], [316, 442, 10]])}
    <path d="M220 462 Q280 488 340 462" fill="none" ${S}/>
    <rect x="312" y="418" width="9" height="18" rx="3" fill="url(#scChrome)" ${S}/>
    <path d="M316 422 C332 402 346 428 332 448" fill="none" stroke="url(#scChrome)" stroke-width="6" stroke-linecap="round"/>
    <path d="M316 422 C332 402 346 428 332 448" fill="none" ${s2}/>
    <circle cx="308" cy="414" r="4" fill="url(#scChrome)" ${S}/>
    <circle cx="324" cy="410" r="4" fill="url(#scChrome)" ${S}/>
    <circle cx="332" cy="450" r="2" fill="#9fd4ea"/>

    <ellipse cx="268" cy="472" rx="16" ry="10" fill="#ffd86a" ${S}/>
    <circle cx="282" cy="460" r="10" fill="#ffe08a" ${S}/>
    <ellipse cx="278" cy="456" rx="3" ry="1.8" fill="#fff" opacity=".75"/>
    <circle cx="285" cy="458" r="1.5" fill="${O}"/>
    <path d="M290 462 l9 2 -9 3 z" fill="#ff9f43" ${S}/>
    <ellipse cx="260" cy="482" rx="5" ry="2.4" fill="#ffb703" ${S}/>
    <ellipse cx="274" cy="484" rx="4.5" ry="2.2" fill="#ffb703" ${S}/>

    <ellipse cx="383" cy="546" rx="28" ry="3.6" fill="#1f1020" opacity=".13"/>
    <path d="M368 512 H398 L402 546 H364 Z" fill="url(#scPorc)" ${S}/>
    <rect x="366" y="424" width="34" height="32" rx="6" fill="url(#scPorc)" ${S}/>
    <rect x="362" y="416" width="42" height="12" rx="5" fill="#fff" ${S}/>
    <rect x="396" y="434" width="12" height="6" rx="3" fill="url(#scChrome)" ${S}/>
    <circle cx="408" cy="437" r="3" fill="#f4d58a" ${S}/>
    <path d="M354 468 H412 Q418 468 418 476 V490 Q418 514 383 514 Q348 514 348 490 V476 Q348 468 354 468 Z" fill="url(#scPorc)" ${S}/>
    <path d="M360 496 Q383 506 406 494" fill="none" stroke="#fff" stroke-width="2.4" opacity=".4"/>
    <ellipse cx="383" cy="476" rx="28" ry="9" fill="#dfeaf1" ${S}/>
    <ellipse cx="383" cy="466" rx="28" ry="10" fill="url(#scPorc)" ${S}/>
    <ellipse cx="383" cy="462" rx="14" ry="3.2" fill="#fff" opacity=".7"/>
    <rect x="360" y="456" width="7" height="6" rx="1.5" fill="#fff" ${S}/>
    <rect x="398" y="456" width="7" height="6" rx="1.5" fill="#fff" ${S}/>
    ${daisy(383, 466, 0.55)}

    <ellipse cx="446" cy="546" rx="22" ry="3.4" fill="#1f1020" opacity=".13"/>
    <rect x="424" y="500" width="44" height="44" rx="6" fill="#fff7ee" ${S}/>
    <path d="M424 522 H468" ${S}/>
    <circle cx="436" cy="512" r="1.8" fill="${O}"/><circle cx="456" cy="512" r="1.8" fill="${O}"/>
    <rect x="420" y="490" width="52" height="12" rx="5" fill="#ffd0e0" ${S}/>
    <path d="M446 452 C460 452 468 468 468 484 C468 496 458 500 446 500 C434 500 424 496 424 484 C424 468 432 452 446 452 Z" fill="#f4d58a" ${S}/>
    <ellipse cx="446" cy="478" rx="12" ry="16" fill="#e7f6ff" ${S}/>
    <path d="M438 470 l5 -4 M440 480 l8 -7" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>

    <path d="${scallop(278, 574, 62, 12, 14, 7)}" fill="#f3b7c8"/>
    <path d="${scallop(278, 574, 66, 14, 14, 7)}" fill="#ffd0dc" ${S}/>
    <path d="${scallop(278, 574, 44, 8, 10, 3)}" fill="#fff6f8"/>
    <path d="M230 568 q8 -6 12 0 M258 562 q8 -6 12 0 M286 560 q8 -6 12 0 M314 566 q7 -5 11 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"/>

  </svg>`;
}

function room() {
  const kidH = 186;
  const kidW = kidH * (200 / 320);
  const feet = 548;
  const left = 92;
  return `<div class="room">
    ${sceneSvg()}
    <div class="piece kid" style="left:${left / 480 * 100}%;top:${(feet - kidH) / 600 * 100}%;width:${kidW / 480 * 100}%;height:${kidH / 600 * 100}%">${kid}</div>
    ${NUDGE('left')}${NUDGE('right')}
  </div>`;
}

function wallDots() {
  let s = '';
  for (let y = 16; y < 286; y += 26) {
    for (let x = (y / 26) % 2 ? 22 : 10; x < 472; x += 26) s += `<circle cx="${x}" cy="${y}" r="2.1" fill="#fff" opacity=".82"/>`;
  }
  return s;
}
function wainscot() {
  let s = '';
  const size = 28;
  for (let y = 312; y < 384; y += size) {
    for (let x = 4; x < 476; x += size) {
      s += `<rect x="${x}" y="${y}" width="${size - 3}" height="${Math.min(size - 3, 382 - y)}" rx="2" fill="#f7fcfd" stroke="#d4e4ec" stroke-width="1.4"/>`;
    }
  }
  return s;
}

function shelf() {
  return FURNITURE.map(([k]) => `<div class="thing">${ITEMS[k]}</div>`).join('');
}

function page({ w, h, phone, play, tabsNote }) {
  const full = !phone;
  return `<!doctype html><html><head><meta charset="utf-8">
<style>
  :root { --ink:#5a3d5c; }
  * { box-sizing:border-box; margin:0; padding:0; }
  html, body { width:${w}px; height:${h}px; overflow:hidden; background:
    radial-gradient(circle at 15% 10%, #fff6fa 0 18%, transparent 19%),
    radial-gradient(circle at 90% 85%, #fff6fa 0 14%, transparent 15%),
    linear-gradient(160deg, #ffe0ec, #e6ddff);
    font-family: ui-rounded, "Nunito", "Varela Round", system-ui, sans-serif; color:var(--ink); }
  #app { height:100%; display:flex; flex-direction:column; }
  .top { display:flex; align-items:center; gap:${phone ? 4 : 6}px; padding:${phone ? '6px 8px 2px' : '6px 8px 4px'}; }
  .tabs { display:flex; gap:${phone ? 3 : 4}px; flex:${phone ? '1 0 100%' : '0 1 auto'}; min-width:0; }
  .tab { border:3px solid transparent; background:#fff; border-radius:${phone ? 14 : 18}px; font-weight:800;
    font-size:${phone ? 13 : 14}px; min-height:44px; padding:${phone ? '0 2px' : '0 8px'}; white-space:nowrap;
    box-shadow:0 3px 0 #e6c9d8; color:var(--ink); flex:${phone ? '1 1 auto' : '0 0 auto'}; }
  .tab.on { background:var(--c); color:#fff; border-color:var(--ink); box-shadow:0 3px 0 rgba(90,61,92,.35); }
  .minimap { width:${phone ? 0 : 112}px; height:44px; border:4px solid var(--ink); border-radius:12px; overflow:hidden; position:relative; background:#d7f6f8; flex:0 0 auto; ${phone ? 'display:none;' : ''} }
  .minimap .mf { position:absolute; left:0; right:0; bottom:0; height:35%; background:#f3e0c8; }
  .minimap .mv { position:absolute; top:2px; bottom:2px; left:38%; width:22%; border:2px solid #fff; box-shadow:0 0 0 2px var(--ink); border-radius:6px; }
  .tools { display:flex; gap:${phone ? 4 : 6}px; margin-left:auto; }
  .round { width:44px; height:44px; border-radius:50%; background:#fff; border:3px solid var(--ink); padding:7px; box-shadow:0 3px 0 #e6c9d8; }
  .round.map { background:#fff3b0; }
  .round svg { width:100%; height:100%; display:block; }
  .stageWrap { flex:1; min-height:0; margin:${phone ? '4px 6px' : '6px 12px'}; display:flex; align-items:center; justify-content:center; container-type:size; }
  .stage { position:relative; width:min(100cqw, calc(100cqh * 480 / 600)); aspect-ratio:480 / 600; border:6px solid var(--ink); border-radius:${phone ? 22 : 28}px; overflow:hidden; background:#d7f6f8; box-shadow:0 8px 0 rgba(90,61,92,.22); }
  .room { position:absolute; inset:0; }
  .scene { width:100%; height:100%; display:block; }
  .piece { position:absolute; }
  .piece svg { width:100%; height:100%; overflow:visible; }
  .kid { z-index:2; }
  .kid svg { width:100%; height:100%; }
  .nudge { position:absolute; top:46%; z-index:3; width:${phone ? 36 : 44}px; height:${phone ? 52 : 64}px; border-radius:16px; background:rgba(255,255,255,.88);
    border:4px solid var(--ink); padding:6px; box-shadow:0 3px 0 rgba(90,61,92,.2); }
  .nudge.left { left:8px; } .nudge.right { right:8px; }
  .nudge svg { width:100%; height:100%; }
  .drawer { flex:0 0 auto; padding:${phone ? '4px 8px 8px' : '6px 12px 12px'}; display:flex; flex-direction:column; gap:${phone ? 6 : 8}px; }
  .drawerTop { display:flex; gap:6px; align-items:center; overflow:hidden; }
  .mode { display:flex; gap:2px; background:#fff; border-radius:16px; padding:3px; border:3px solid transparent; box-shadow:0 3px 0 #e6c9d8; }
  .mode button { display:flex; align-items:center; gap:4px; height:${phone ? 38 : 42}px; padding:0 ${phone ? 8 : 10}px; border-radius:12px; border:3px solid transparent; background:transparent; font-weight:800; font-size:${phone ? 14 : 15}px; color:var(--ink); }
  .mode button.on { background:#fff3b0; border-color:var(--ink); }
  .mode svg { width:${phone ? 20 : 24}px; height:${phone ? 20 : 24}px; }
  .rf { height:${phone ? 38 : 44}px; padding:0 12px; border-radius:14px; background:#fff; border:3px solid transparent; font-weight:800; font-size:${phone ? 13 : 14}px; box-shadow:0 3px 0 #e6c9d8; color:var(--ink); white-space:nowrap; }
  .cats { display:flex; gap:6px; }
  .cat { width:${phone ? 40 : 48}px; height:${phone ? 40 : 48}px; border-radius:12px; background:#fff; border:3px solid transparent; box-shadow:0 3px 0 #e6c9d8; padding:4px; }
  .cat.on { background:#fff3b0; border-color:var(--ink); }
  .cat svg { width:100%; height:100%; }
  .shelf { height:${phone ? 86 : 112}px; display:flex; gap:${phone ? 8 : 10}px; overflow:hidden; padding:8px 10px; background:rgba(255,255,255,.72);
    border-radius:${phone ? 18 : 22}px; border:4px solid var(--ink); }
  .thing { flex:0 0 ${phone ? 68 : 92}px; height:${phone ? 68 : 92}px; background:#fff; border-radius:18px; padding:8px; box-shadow:0 4px 0 #e6c9d8; }
  .thing svg { width:100%; height:100%; }
  .note { flex:0 0 auto; margin:0 12px 8px; background:#fff; border:3px solid var(--ink); border-radius:14px; padding:6px 10px; font-weight:800; font-size:${phone ? 12 : 14}px; text-align:center; }
  body.phone .top { flex-wrap:wrap; }
  body.phone .tools { order:2; }
</style></head>
<body class="${phone ? 'phone' : ''}">
<div id="app">
  <div class="top">
    <div class="tabs">${tabs(full, 'bathroom')}</div>
    <div class="minimap" aria-hidden="true"><div class="mf"></div><div class="mv"></div></div>
    <div class="tools"><button class="round">${MENU}</button><button class="round map">${MAP}</button></div>
  </div>
  <div class="stageWrap"><div class="stage">${room()}</div></div>
  <div class="drawer">
    <div class="drawerTop">
      <div class="mode">
        <button class="${play ? 'on' : ''}">${HAND}<span>Play</span></button>
        <button class="${play ? '' : 'on'}">${BRUSH}<span>Decorate</span></button>
      </div>
      ${play ? '' : `<button class="rf">All rooms</button><div class="cats"><div class="cat on">${CHAIR}</div><div class="cat">${BALLOON}</div><div class="cat">${FLOWER}</div><div class="cat">${DONUT}</div><div class="cat">${CAT}</div></div>`}
    </div>
    ${play ? '' : `<div class="shelf">${shelf()}</div>`}
  </div>
  ${tabsNote ? `<div class="note">${tabsNote}</div>` : ''}
</div>
</body></html>`;
}

const DECOR = [
  ['mat', 'Puddle Bath Mat'], ['ducky', 'Sunny Ducky'], ['soap', 'Shell Soap Dish'], ['bottle', 'Bubble Bottle'], ['brush', 'Brush Cup'],
  ['porthole', 'Porthole Mirror'], ['tray', 'Tub Tray'], ['hooks', 'Robe Hooks'], ['timer', 'Sand Timer'], ['mobile', 'Bubble Mobile'],
];
const PLANTS = [
  ['fern', 'Mist Fern'], ['eucalyptus', 'Hanging Eucalyptus'], ['succulent', 'Pebble Succulent'], ['aloe', 'Aloe Friend'], ['lily', 'Lily Pad Pot'],
  ['moss', 'Moss Bowl'], ['clover', 'Clover Sprout'], ['rainSprout', 'Rain Sprout'], ['bamboo', 'Window Bamboo'], ['herb', 'Bath Herb'],
];

function contact(pageNo) {
  const cells = pageNo === 1 ? [...FURNITURE, ...DECOR.slice(0, 5)] : [...DECOR.slice(5), ...PLANTS];
  const grid = cells.map(([k, name]) => `<div class="cell"><div class="art">${ITEMS[k]}</div><div class="name">${name}</div></div>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing:border-box; margin:0; padding:0; }
    html, body { width:820px; height:1180px; overflow:hidden; background:linear-gradient(165deg,#e7f8f6,#ffe9f2 70%);
      font-family:ui-rounded,"Nunito",system-ui,sans-serif; color:#5a3d5c; }
    h1 { font-size:28px; padding:20px 28px 0; }
    p { font-weight:700; font-size:15px; padding:4px 28px 8px; opacity:.8; }
    .grid { height:1100px; display:grid; grid-template-columns:repeat(3, 1fr); grid-template-rows:repeat(5, 1fr); gap:12px; padding:0 22px 18px; }
    .cell { background:#fff; border:4px solid #5a3d5c; border-radius:18px; box-shadow:0 5px 0 rgba(90,61,92,.18); padding:8px 10px 6px; display:flex; flex-direction:column; min-height:0; }
    .art { flex:1; min-height:0; } .art svg { width:100%; height:100%; }
    .name { text-align:center; font-weight:800; font-size:15px; padding-top:4px; }
  </style></head><body>
    <h1>Bathroom pieces · ${pageNo} of 2</h1>
    <p>${pageNo === 1 ? 'Furniture, then the first five decor pieces.' : 'The rest of the decor, then the plants.'}</p>
    <div class="grid">${grid}</div>
  </body></html>`;
}

const shots = [
  ['bathroom-play-ipad.png', page({ w: 820, h: 1180, phone: false, play: true }), 820, 1180],
  ['bathroom-play-phone.png', page({ w: 390, h: 844, phone: true, play: true }), 390, 844],
  ['bathroom-decorate-ipad.png', page({ w: 820, h: 1180, phone: false, play: false }), 820, 1180],
  ['bathroom-decorate-phone.png', page({ w: 390, h: 844, phone: true, play: false }), 390, 844],
  ['bathroom-tabs-ipad.png', page({ w: 820, h: 1180, phone: false, play: true, tabsNote: 'Bathroom is the sixth tab, after Nursery. One row, so the stage stays the same size.' }), 820, 1180],
  ['bathroom-tabs-phone.png', page({ w: 390, h: 844, phone: true, play: true, tabsNote: 'Short label Bath, on the tab row. Menu and Map stay on the next row.' }), 390, 844],
  ['bathroom-contact.png', contact(1), 820, 1180],
  ['bathroom-contact-2.png', contact(2), 820, 1180],
];

mkdirSync(dir, { recursive: true });
const chrome = '/usr/bin/google-chrome';
for (const [name, html, w, h] of shots) {
  const htmlPath = join('/tmp', name.replace('.png', '.html'));
  const pngPath = join(dir, name);
  writeFileSync(htmlPath, html);
  const r = spawnSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--window-size=${w},${h}`, `--screenshot=${pngPath}`, `file://${htmlPath}`,
  ], { encoding: 'utf8' });
  if (r.status !== 0) {
    console.error(r.stdout, r.stderr);
    process.exit(r.status || 1);
  }
  const buf = readFileSync(pngPath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  console.log(name, width + 'x' + height);
}
