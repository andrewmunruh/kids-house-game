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

const tub = wrap(`${shadow}
  <rect x="16" y="86" width="8" height="10" rx="2" fill="#efe4d4" ${st}/><rect x="30" y="86" width="8" height="10" rx="2" fill="#efe4d4" ${st}/>
  <rect x="62" y="86" width="8" height="10" rx="2" fill="#efe4d4" ${st}/><rect x="76" y="86" width="8" height="10" rx="2" fill="#efe4d4" ${st}/>
  <path d="M6 58 H94 V70 Q94 90 72 90 H28 Q6 90 6 70 Z" fill="#fffdf8" ${st}/>
  ${shade('M10 72 H90 V78 Q88 88 72 88 H28 Q12 88 10 78 Z', '.1')}
  <path d="M14 62 H86 V70 Q84 78 70 78 H30 Q16 78 14 70 Z" fill="#c9eef6"/>
  ${shade('M18 70 H82 Q80 76 68 76 H32 Q20 76 18 70 Z', '.12')}
  <ellipse cx="34" cy="66" rx="7" ry="4.5" fill="#fff" opacity=".8" ${st}/>
  <ellipse cx="52" cy="64" rx="9" ry="5.5" fill="#f4fbff" ${st}/>
  <ellipse cx="70" cy="67" rx="6" ry="4" fill="#fff" opacity=".85" ${st}/>
  <circle cx="40" cy="64" r="1.4" fill="#fff" opacity=".8"/><circle cx="58" cy="62" r="1.2" fill="#fff"/>
  <rect x="4" y="50" width="92" height="12" rx="6" fill="#ffd0e0" ${st}/>
  ${shade('M8 56 H92 V60 Q90 62 50 62 Q10 62 8 56 Z', '.12')}
  ${hi(28, 54, 10, 2.4)}
  <rect x="86" y="46" width="6" height="10" rx="2" fill="#e7eef2" ${st}/>
  ${speck([[22, 68], [48, 84], [74, 80]])}`);

const shower = wrap(`${shadow}
  <path d="M18 90 H82 Q86 90 86 84 V48 Q86 28 50 28 Q14 28 14 48 V84 Q14 90 18 90 Z" fill="#e7f7fb" ${st}/>
  ${shade('M64 36 Q82 40 82 56 V84 H58 V40 Q58 36 64 36 Z', '.08')}
  <path d="M22 40 H78" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>
  <path d="M18 34 H82 Q86 34 86 40 V48 H14 V40 Q14 34 18 34 Z" fill="#f7fbff" ${st}/>
  <rect x="40" y="14" width="20" height="16" rx="6" fill="#d7eef5" ${st}/>
  <ellipse cx="50" cy="34" rx="16" ry="4" fill="#c5e4ee" ${st}/>
  <path d="M40 36 V58 M50 38 V64 M60 36 V56" stroke="#8ecae6" stroke-width="2" stroke-linecap="round" opacity=".85"/>
  <circle cx="40" cy="60" r="1.6" fill="#fff"/><circle cx="50" cy="66" r="1.8" fill="#fff"/><circle cx="60" cy="58" r="1.5" fill="#fff"/>
  <path d="M14 48 Q6 60 10 88" fill="#c9f0e4" ${st}/>
  ${shade('M12 60 Q8 74 12 86 H18 V52 Q14 52 12 60 Z', '.12')}
  ${hi(22, 58, 3, 8)}
  <rect x="8" y="30" width="84" height="6" rx="3" fill="#f3d2b5" ${st}/>
  ${speck([[30, 70], [46, 78], [68, 72]])}`);

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

const toilet = wrap(`${shadow}
  <rect x="28" y="18" width="44" height="28" rx="8" fill="#fffdf8" ${st}/>
  ${shade('M52 22 H68 V42 H52 Z', '.1')}
  ${hi(38, 26, 8, 3)}
  <circle cx="40" cy="32" r="5" fill="#fff" ${st}/>
  <circle cx="40" cy="32" r="2.2" fill="#ffd166"/>
  <circle cx="38" cy="34" r="1.6" fill="#fff"/>
  <path d="M22 46 H78 Q84 46 84 54 V72 Q84 92 50 92 Q16 92 16 72 V54 Q16 46 22 46 Z" fill="#fffdf8" ${st}/>
  ${shade('M24 70 H76 Q74 86 50 86 Q26 86 24 70 Z', '.1')}
  <ellipse cx="50" cy="52" rx="26" ry="8" fill="#f4fbff" ${st}/>
  ${hi(36, 50, 8, 2)}
  ${speck([[48, 28], [60, 74]])}`);

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

const bar = wrap(`
  <rect x="14" y="28" width="72" height="8" rx="4" fill="#f3d2b5" ${st}/>
  <circle cx="22" cy="32" r="3" fill="#fff" ${st}/><circle cx="78" cy="32" r="3" fill="#fff" ${st}/>
  <path d="M30 36 H70 L64 88 H36 Z" fill="#d9f3ea" ${st}/>
  ${shade('M40 50 H64 L60 88 H44 Z', '.1')}
  <path d="M40 48 q10 6 20 0" fill="none" stroke="#fff" stroke-width="3" opacity=".65"/>
  <path d="M36 70 H64" stroke="#fff" stroke-width="2" opacity=".4"/>
  ${speck([[46, 60], [56, 74]])}`);

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
  <path d="M18 78 H82 L76 92 H24 Z" fill="#f6e2c4" ${st}/>
  <path d="M28 58 H72 L68 76 H32 Z" fill="#fff3d6" ${st}/>
  ${shade('M48 60 H70 L66 76 H46 Z', '.12')}
  ${hi(36, 64, 8, 2)}
  <rect x="34" y="88" width="8" height="8" rx="2" fill="${O}"/><rect x="58" y="88" width="8" height="8" rx="2" fill="${O}"/>
  ${speck([[40, 70], [60, 84]])}`);

const cupboard = wrap(`${shadow}
  <rect x="22" y="12" width="56" height="78" rx="8" fill="#e7f6f2" ${st}/>
  ${shade('M58 16 H74 V86 H58 Z', '.1')}
  <path d="M22 38 H78 M50 38 V86" ${st}/>
  <circle cx="42" cy="26" r="2.2" fill="${O}"/><circle cx="58" cy="26" r="2.2" fill="${O}"/>
  <circle cx="44" cy="58" r="2.2" fill="${O}"/><circle cx="56" cy="58" r="2.2" fill="${O}"/>
  <rect x="34" y="8" width="14" height="8" rx="2" fill="#ffd0e0" ${st}/>
  ${hi(32, 22, 6, 3)}
  ${speck([[36, 70], [64, 48]])}`);

const mat = wrap(`
  <ellipse cx="50" cy="78" rx="46" ry="16" fill="#c9eef6" ${st}/>
  <ellipse cx="50" cy="76" rx="34" ry="10" fill="#fff" ${st}/>
  <path d="M22 74 Q34 66 50 74 T78 70" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/>
  <ellipse cx="50" cy="86" rx="30" ry="5" fill="#3a1d3c" opacity=".08"/>
  ${speck([[30, 78], [62, 80], [46, 72]])}`);

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

function piece(key, x, y, w) {
  // x,y are bottom-center in a 480×600 window. Square art, so height equals width.
  const h = w;
  return `<div class="piece" style="left:${(x - w / 2) / 480 * 100}%;top:${(y - h) / 600 * 100}%;width:${w / 480 * 100}%;height:${h / 600 * 100}%">${ITEMS[key]}</div>`;
}

function room() {
  return `<div class="room">
    <div class="wall"></div><div class="floor"></div><div class="base"></div>
    <div class="window">${ITEMS.porthole}</div>
    ${piece('eucalyptus', 70, 250, 70)}
    ${piece('bar', 150, 230, 90)}
    ${piece('mat', 250, 555, 300)}
    ${piece('ladder', 48, 500, 78)}
    ${piece('tub', 168, 500, 210)}
    ${piece('ducky', 230, 400, 70)}
    ${piece('bottle', 118, 390, 52)}
    ${piece('vanity', 390, 490, 168)}
    ${piece('fern', 455, 505, 96)}
    <div class="piece kid" style="left:${(268 - 54) / 480 * 100}%;top:${(548 - 170) / 600 * 100}%;width:${108 / 480 * 100}%;height:${170 / 600 * 100}%">${kid}</div>
    ${NUDGE('left')}${NUDGE('right')}
  </div>`;
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
  .stageWrap { flex:1; min-height:0; margin:${phone ? '4px 6px' : '6px 12px'}; position:relative; }
  .stage { position:absolute; inset:0; border:6px solid var(--ink); border-radius:${phone ? 22 : 28}px; overflow:hidden; background:#fff; box-shadow:0 8px 0 rgba(90,61,92,.22); }
  .room { position:absolute; inset:0; }
  .wall { position:absolute; left:0; right:0; top:0; height:62%; background:#d7f6f8;
    background-image:radial-gradient(circle, rgba(255,255,255,.75) 5px, transparent 6px); background-size:34px 34px; }
  .floor { position:absolute; left:0; right:0; top:62%; bottom:0; background:#f3e0c8;
    background-image:repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 72px), linear-gradient(rgba(0,0,0,.05), transparent 46%); }
  .base { position:absolute; left:0; right:0; top:calc(62% - 8px); height:14px; background:#fff; border-top:4px solid var(--ink); border-bottom:4px solid var(--ink); }
  .piece { position:absolute; }
  .piece svg { width:100%; height:100%; overflow:visible; }
  .window { position:absolute; left:30%; top:4%; width:22%; height:26%; }
  .kid svg { width:100%; height:100%; }
  .nudge { position:absolute; top:46%; width:${phone ? 36 : 44}px; height:${phone ? 52 : 64}px; border-radius:16px; background:rgba(255,255,255,.88);
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

function contact() {
  const cells = [
    ['tub', 'Clawfoot Tub'], ['shower', 'Rain Shower'], ['vanity', 'Mirror Vanity'], ['toilet', 'Little Toilet'],
    ['ladder', 'Towel Ladder'], ['mat', 'Puddle Bath Mat'], ['ducky', 'Sunny Ducky'], ['fern', 'Mist Fern'],
    ['cubby', 'Bath Cubby'], ['bottle', 'Bubble Bottle'], ['soap', 'Shell Soap Dish'], ['hamper', 'Clothes Hamper'],
  ];
  const grid = cells.map(([k, name]) => `<div class="cell"><div class="art">${ITEMS[k]}</div><div class="name">${name}</div></div>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing:border-box; margin:0; padding:0; }
    html, body { width:820px; height:1180px; overflow:hidden; background:linear-gradient(165deg,#e7f8f6,#ffe9f2 70%);
      font-family:ui-rounded,"Nunito",system-ui,sans-serif; color:#5a3d5c; }
    h1 { font-size:32px; padding:28px 28px 0; }
    p { font-weight:700; font-size:16px; padding:6px 28px 12px; opacity:.8; }
    .grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; padding:8px 24px 24px; }
    .cell { background:#fff; border:4px solid #5a3d5c; border-radius:22px; box-shadow:0 6px 0 rgba(90,61,92,.18); padding:12px 12px 10px; }
    .art { height:210px; } .art svg { width:100%; height:100%; }
    .name { text-align:center; font-weight:800; font-size:16px; }
  </style></head><body>
    <h1>Bathroom pieces</h1>
    <p>Plum outlines, soft shade, a highlight, and a contact shadow. Twelve of the thirty.</p>
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
  ['bathroom-contact.png', contact(), 820, 1180],
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
