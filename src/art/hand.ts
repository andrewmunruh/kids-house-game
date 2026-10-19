// Starter pieces a kid sees on the first visit. Same viewBox and floor point as the
// old drawing, with real parts and a pastel side plane. The twelve approved
// pieces live in v2-sample.ts and win over these.
import type { V2Mark } from './v2-sample';

const O = '#5a3d5c';
const ink = (w = 3.5) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const sh = (cx = 50, rx = 34) =>
  `<ellipse cx="${cx}" cy="96.4" rx="${rx}" ry="3.4" fill="${O}" opacity=".08"/><ellipse cx="${cx}" cy="97.6" rx="${Math.round(rx * 0.62)}" ry="1.55" fill="${O}" opacity=".12"/>`;

function pack(s: string): string {
  return s.replace(/\n\s*/g, '').trim();
}

const VB = '0 0 100 100';

export const HAND: Record<string, V2Mark> = {
  armchair: { vb: VB, body: pack(`
    ${sh(50, 36)}
    <rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${ink()}/>
    <rect x="52" y="24" width="26" height="42" rx="12" fill="#4aa3c8"/>
    <rect x="6" y="46" width="22" height="40" rx="10" fill="#7ec8ea" ${ink()}/>
    <ellipse cx="14" cy="48" rx="8" ry="6" fill="#b7e4f7" ${ink(2.2)}/>
    <rect x="72" y="46" width="22" height="40" rx="10" fill="#3d92b8" ${ink()}/>
    <ellipse cx="86" cy="48" rx="8" ry="6" fill="#4aa3c8" ${ink(2.2)}/>
    <rect x="24" y="58" width="52" height="22" rx="10" fill="#d7f3ff" ${ink(2.2)}/>
    <path d="M30 64 H70" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="50" cy="72" r="2.6" fill="#ff8fab" ${ink(1.6)}/>
    <rect x="28" y="40" width="18" height="14" rx="4" fill="#fff" ${ink(2)}/>
    <path d="M33 46 c2 -2 6 -2 8 0" fill="none" stroke="#7eb4dc" stroke-width="1.4" stroke-linecap="round"/>
    <rect x="20" y="86" width="6" height="10" rx="2" fill="${O}"/>
    <rect x="74" y="86" width="6" height="10" rx="2" fill="${O}"/>
  `) },

  picture: { vb: VB, body: pack(`
    <rect x="8" y="14" width="84" height="72" rx="8" fill="#e0a83a" ${ink()}/>
    <rect x="62" y="18" width="26" height="64" rx="4" fill="#c48a2a"/>
    <rect x="16" y="22" width="68" height="56" rx="4" fill="#cfefff" ${ink(2.2)}/>
    <rect x="52" y="26" width="28" height="48" fill="#9fd4f2"/>
    <circle cx="64" cy="36" r="7" fill="#fff3b0" ${ink(1.6)}/>
    <path d="M16 78 L34 52 L48 66 L60 50 L84 78 Z" fill="#74c69d" ${ink(2)}/>
    <path d="M58 78 L72 58 L84 78 Z" fill="#3d9a68"/>
    <path d="M22 30 h16" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
  `) },

  clock: { vb: VB, body: pack(`
    <circle cx="50" cy="50" r="40" fill="#fff6d8" ${ink()}/>
    <path d="M50 14 A36 36 0 0 1 86 50" fill="none" stroke="#e0a83a" stroke-width="8" stroke-linecap="round"/>
    <circle cx="50" cy="50" r="30" fill="#fff3b0" ${ink(2.2)}/>
    <circle cx="68" cy="50" r="16" fill="#e7c56a"/>
    <path d="M50 28 V34 M66 36 L62 40 M72 50 H66 M34 50 H28 M36 36 L40 40 M50 72 V66 M34 64 L38 60 M66 64 L62 60" fill="none" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M50 50 V30 M50 50 L66 58" ${ink(2.2)}/>
    <circle cx="50" cy="50" r="3.2" fill="${O}"/>
    <ellipse cx="32" cy="62" rx="4" ry="2.4" fill="#ff9bb5" opacity=".7"/>
    <ellipse cx="68" cy="62" rx="4" ry="2.4" fill="#ff9bb5" opacity=".55"/>
  `) },

  tree: { vb: VB, body: pack(`
    ${sh(50, 32)}
    <rect x="44" y="52" width="12" height="30" rx="4" fill="#e0b080" ${ink()}/>
    <rect x="50" y="56" width="6" height="24" rx="2" fill="#c4844c"/>
    <circle cx="50" cy="34" r="30" fill="#74c69d" ${ink()}/>
    <circle cx="64" cy="38" r="16" fill="#3d9a68"/>
    <path d="M40 22 Q50 16 52 30" fill="none" stroke="#2f7a52" stroke-width="1.3" opacity=".45"/>
    <circle cx="36" cy="28" r="5" fill="#ff8fab" ${ink(1.6)}/>
    <circle cx="60" cy="40" r="5" fill="#e45d88" ${ink(1.6)}/>
    <circle cx="48" cy="18" r="4.5" fill="#ffb3c6" ${ink(1.6)}/>
    <path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${ink()}/>
    <path d="M56 82 H70 L66 94 H58 Z" fill="#e0a83a"/>
  `) },

  chair: { vb: VB, body: pack(`
    ${sh(50, 30)}
    <rect x="22" y="6" width="56" height="50" rx="14" fill="#b7ebc6" ${ink()}/>
    <rect x="52" y="10" width="22" height="42" rx="10" fill="#3d9a68"/>
    <path d="M32 18 H58 M32 30 H54" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>
    <rect x="16" y="50" width="68" height="16" rx="7" fill="#7dcea0" ${ink()}/>
    <rect x="54" y="52" width="26" height="12" rx="5" fill="#3d9a68"/>
    <rect x="22" y="64" width="9" height="30" rx="4" fill="#7dcea0" ${ink(2.2)}/>
    <rect x="69" y="64" width="9" height="30" rx="4" fill="#2f7a52" ${ink(2.2)}/>
    <circle cx="40" cy="28" r="3" fill="#fff" opacity=".7"/>
  `) },

  stove: { vb: VB, body: pack(`
    ${sh(50, 36)}
    <rect x="8" y="26" width="84" height="68" rx="12" fill="#ffc2c2" ${ink()}/>
    <rect x="58" y="32" width="30" height="56" rx="8" fill="#e88888"/>
    <rect x="8" y="16" width="84" height="16" rx="6" fill="#ffe0b8" ${ink()}/>
    <rect x="58" y="18" width="30" height="12" rx="4" fill="#e0a83a"/>
    <rect x="20" y="46" width="60" height="36" rx="8" fill="#c9a0dc" ${ink(2.2)}/>
    <rect x="52" y="50" width="24" height="28" rx="6" fill="#a078b4"/>
    <path d="M28 56 H48" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <circle cx="22" cy="34" r="4" fill="#fff" ${ink(1.8)}/>
    <circle cx="40" cy="34" r="4" fill="#fff" ${ink(1.8)}/>
    <circle cx="76" cy="34" r="4" fill="#e0a83a" ${ink(1.8)}/>
  `) },

  cake: { vb: VB, body: pack(`
    ${sh(50, 36)}
    <rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${ink()}/>
    <rect x="58" y="54" width="22" height="32" rx="8" fill="#e888a8"/>
    <path d="M16 58 q8 8 16 0 q8 8 16 0 q8 8 16 0 q8 8 16 0" fill="#fff" ${ink(2)}/>
    <rect x="22" y="68" width="56" height="8" rx="3" fill="#fff6fa"/>
    <path d="M28 72 H48 M62 72 H74" fill="none" stroke="#e45d88" stroke-width="1.2" stroke-linecap="round" opacity=".35"/>
    <rect x="46" y="28" width="8" height="22" rx="3" fill="#bde0fe" ${ink(2)}/>
    <path d="M50 12 q6 8 0 14 q-6 -6 0 -14" fill="#ffd166" ${ink(1.8)}/>
    <circle cx="34" cy="64" r="3" fill="#ff8fab"/>
    <circle cx="70" cy="66" r="3" fill="#e45d88"/>
  `) },

  juice: { vb: VB, body: pack(`
    ${sh(50, 24)}
    <path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${ink()}/>
    <path d="M58 30 H74 L70 90 H62 Z" fill="#f3fbff"/>
    <path d="M28 46 H72 L70 90 H32 Z" fill="#ffb347"/>
    <path d="M58 50 H70 L68 88 H62 Z" fill="#e08a2f"/>
    <path d="M32 40 H46" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
    <path d="M58 26 L68 6" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/>
    <circle cx="40" cy="62" r="3.4" fill="#fff" opacity=".65"/>
  `) },

  stars: { vb: VB, body: pack(`
    <path d="M30 18 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffe08a" ${ink()}/>
    <path d="M34 22 l2 4 4 .6 -3 3 .6 4 -3.6 -2 -3.6 2 .6 -4 -3 -3 4 -.6z" fill="#fff" opacity=".55"/>
    <path d="M70 38 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#e888a8" ${ink()}/>
    <path d="M40 64 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#9fd4f2" ${ink()}/>
    <path d="M46 68 l1.4 3 3 .4 -2.2 2 .6 3 -2.8 -1.6 -2.8 1.6 .6 -3 -2.2 -2 3 -.4z" fill="#fff" opacity=".7"/>
  `) },

  tub: { vb: VB, body: pack(`
    ${sh(50, 40)}
    <path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${ink()}/>
    <path d="M62 52 H92 V64 Q92 86 74 86 H64 Z" fill="#d7ecf5"/>
    <rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${ink()}/>
    <rect x="64" y="46" width="30" height="6" rx="3" fill="#e888a8"/>
    <circle cx="28" cy="36" r="7" fill="#d7f3ff" ${ink(2)}/>
    <circle cx="44" cy="28" r="9" fill="#fff" ${ink(2)}/>
    <circle cx="60" cy="36" r="7" fill="#bde0fe" ${ink(2)}/>
    <path d="M24 58 q10 6 18 0" fill="none" stroke="#bde0fe" stroke-width="2" stroke-linecap="round"/>
    <rect x="22" y="88" width="8" height="8" rx="2" fill="${O}"/>
    <rect x="70" y="88" width="8" height="8" rx="2" fill="${O}"/>
  `) },

  flowers: { vb: VB, body: pack(`
    ${sh(50, 28)}
    <path d="M50 72 V28 M50 58 Q30 48 30 30 M50 58 Q70 48 70 30" stroke="#3d9a68" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M58 40 Q68 36 70 30" stroke="#2f7a52" stroke-width="1.4" fill="none" opacity=".5"/>
    <circle cx="50" cy="24" r="11" fill="#ffb3c6" ${ink()}/>
    <circle cx="56" cy="26" r="6" fill="#e45d88"/>
    <circle cx="30" cy="28" r="9" fill="#ffe08a" ${ink(2.2)}/>
    <circle cx="70" cy="28" r="9" fill="#7eb4dc" ${ink(2.2)}/>
    <circle cx="50" cy="24" r="3" fill="#fff"/>
    <path d="M32 66 H68 L62 96 H38 Z" fill="#cfefff" ${ink()}/>
    <path d="M54 70 H66 L62 94 H56 Z" fill="#7eb4dc"/>
  `) },

  vanity: { vb: VB, body: pack(`
    ${sh(50, 40)}
    <ellipse cx="50" cy="26" rx="24" ry="22" fill="#ffe08a" ${ink()}/>
    <ellipse cx="62" cy="26" rx="10" ry="16" fill="#e0a83a"/>
    <ellipse cx="50" cy="26" rx="16" ry="14" fill="#e7f6ff" ${ink(2.2)}/>
    <path d="M40 18 l8 -6 M44 28 l8 -8" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
    <rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${ink()}/>
    <rect x="60" y="50" width="30" height="10" rx="5" fill="#e888a8"/>
    <rect x="10" y="60" width="30" height="30" rx="6" fill="#ffe0ec" ${ink(2.2)}/>
    <rect x="60" y="60" width="30" height="30" rx="6" fill="#e888a8" ${ink(2.2)}/>
    <circle cx="25" cy="75" r="3" fill="#fff" ${ink(1.6)}/>
    <circle cx="75" cy="75" r="3" fill="#fff" ${ink(1.6)}/>
    <rect x="30" y="40" width="8" height="10" rx="2" fill="#c9a0dc" ${ink(1.6)}/>
    <rect x="58" y="38" width="7" height="12" rx="2" fill="#bde0fe" ${ink(1.6)}/>
    <rect x="14" y="90" width="6" height="7" rx="2" fill="${O}"/>
    <rect x="80" y="90" width="6" height="7" rx="2" fill="${O}"/>
  `) },

  mirror: { vb: VB, body: pack(`
    <path d="M50 6 C74 6 90 24 90 50 C90 78 72 96 50 96 C28 96 10 78 10 50 C10 24 26 6 50 6 Z" fill="#ffe08a" ${ink()}/>
    <path d="M50 14 C68 16 78 32 76 50 C74 70 62 84 50 86 C64 70 66 40 50 14 Z" fill="#e0a83a"/>
    <ellipse cx="50" cy="50" rx="28" ry="34" fill="#e7f6ff" ${ink(2.2)}/>
    <ellipse cx="62" cy="50" rx="12" ry="26" fill="#c5e4fb"/>
    <path d="M34 32 l12 -8 M32 46 l18 -16" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="50" cy="8" r="5" fill="#ff8fab" ${ink(1.8)}/>
  `) },

  perfume: { vb: VB, body: pack(`
    ${sh(50, 28)}
    <rect x="40" y="8" width="20" height="14" rx="5" fill="#ffe08a" ${ink()}/>
    <rect x="52" y="10" width="6" height="10" rx="2" fill="#e0a83a"/>
    <rect x="46" y="20" width="8" height="10" fill="#fff" ${ink(2)}/>
    <path d="M22 48 Q22 32 50 32 Q78 32 78 48 V78 Q78 94 64 94 H36 Q22 94 22 78 Z" fill="#ffb3c6" ${ink()}/>
    <path d="M56 40 H74 V78 Q74 90 64 90 H58 Z" fill="#e45d88"/>
    <ellipse cx="34" cy="52" rx="4" ry="8" fill="#fff" opacity=".7"/>
    <path d="M50 58 l3 6 6 .8 -4.6 4 1.4 6.2 -5.8 -3.4 -5.8 3.4 1.4 -6.2 -4.6 -4 6 -.8z" fill="#fff" ${ink(1.2)}/>
  `) },

  polish: { vb: VB, body: pack(`
    ${sh(50, 26)}
    <rect x="38" y="6" width="24" height="28" rx="8" fill="#7a6280" ${ink()}/>
    <rect x="50" y="8" width="8" height="22" rx="3" fill="#5a3d5c"/>
    <path d="M26 48 Q26 40 38 40 H62 Q74 40 74 48 V82 Q74 96 62 96 H38 Q26 96 26 82 Z" fill="#d4b4e8" ${ink()}/>
    <path d="M52 46 H70 V80 Q70 92 60 92 H54 Z" fill="#b07cc8"/>
    <ellipse cx="36" cy="58" rx="4" ry="10" fill="#fff" opacity=".65"/>
  `) },

  hairdryer: { vb: VB, body: pack(`
    ${sh(48, 30)}
    <rect x="8" y="22" width="60" height="38" rx="18" fill="#d4eeff" ${ink()}/>
    <rect x="40" y="26" width="24" height="30" rx="12" fill="#7eb4dc"/>
    <ellipse cx="78" cy="40" rx="14" ry="18" fill="#ffc8dd" ${ink()}/>
    <ellipse cx="80" cy="40" rx="7" ry="10" fill="#fff" ${ink(2)}/>
    <path d="M58 52 L66 90 Q66 96 58 96 H52 Q46 96 48 88 Z" fill="#bde0fe" ${ink()}/>
    <path d="M58 58 L64 88 H56 Z" fill="#7eb4dc"/>
    <circle cx="24" cy="36" r="6" fill="#fff" opacity=".75"/>
  `) },

  stool: { vb: VB, body: pack(`
    ${sh(50, 30)}
    <ellipse cx="50" cy="46" rx="34" ry="14" fill="#e4ccf2" ${ink()}/>
    <ellipse cx="62" cy="48" rx="16" ry="10" fill="#b07cc8"/>
    <ellipse cx="50" cy="42" rx="26" ry="8" fill="#f6e9ff" ${ink(2.2)}/>
    <path d="M36 44 H64" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/>
    <path d="M28 56 L22 92" stroke="#c9a0dc" stroke-width="5" stroke-linecap="round"/>
    <path d="M72 56 L80 92" stroke="#b07cc8" stroke-width="5" stroke-linecap="round"/>
    <path d="M50 58 V92" stroke="#d4b4e8" stroke-width="5" stroke-linecap="round"/>
    <path d="M28 56 L22 92 M72 56 L80 92 M50 58 V92" fill="none" ${ink(2)}/>
    <ellipse cx="50" cy="74" rx="18" ry="4" fill="none" ${ink(2)}/>
  `) },

  'cloud-rug': { vb: VB, body: pack(`
    <path d="M18 82 C18 70 28 66 36 70 C38 58 50 54 60 62 C66 54 82 58 84 70 C96 72 96 86 86 90 C74 97 56 95 46 90 C34 97 16 94 18 82 Z" fill="#d7f1fb"/>
    <path d="M54 64 C62 56 84 60 86 72 C96 74 96 88 86 92 C76 97 60 94 54 86 C60 80 60 70 54 64 Z" fill="#9ed4ee"/>
    <path d="M18 82 C18 70 28 66 36 70 C38 58 50 54 60 62 C66 54 82 58 84 70 C96 72 96 86 86 90 C74 97 56 95 46 90 C34 97 16 94 18 82 Z" fill="none" ${ink()}/>
    <path d="M32 82 H48 M56 86 H72" fill="none" stroke="${O}" stroke-width="1.1" stroke-linecap="round" opacity=".22"/>
  `) },

  'crib-mobile': { vb: VB, body: pack(`
    <path d="M50 4 V18" ${ink(2.2)}/>
    <ellipse cx="50" cy="24" rx="30" ry="8" fill="#fff" ${ink()}/>
    <ellipse cx="66" cy="24" rx="12" ry="6" fill="#d7ecf5"/>
    <path d="M26 28 V46 M50 32 V56 M74 28 V46" ${ink(2)}/>
    <circle cx="26" cy="54" r="8" fill="#ffe08a" ${ink(2)}/>
    <circle cx="50" cy="66" r="9" fill="#ffb3c6" ${ink(2)}/>
    <circle cx="56" cy="64" r="4" fill="#e45d88"/>
    <path d="M74 54 l6 4 -6 4 -6 -4 z" fill="#7eb4dc" ${ink(2)}/>
    <circle cx="26" cy="52" r="2" fill="#fff"/>
    <circle cx="50" cy="64" r="2" fill="#fff"/>
  `) },

  rocker: { vb: VB, body: pack(`
    ${sh(50, 30)}
    <path d="M14 87 Q50 104 86 87 Q88 84 82 81 Q50 96 18 81 Q12 84 14 87 Z" fill="#d4b4e8" ${ink()}/>
    <path d="M20 82 Q50 95 80 82" fill="none" stroke="#f6e9ff" stroke-width="2.4" stroke-linecap="round"/>
    <rect x="34" y="74" width="7" height="16" rx="2.5" fill="#ead8f6" ${ink(2.2)}/>
    <rect x="59" y="74" width="7" height="16" rx="2.5" fill="#c49ad4" ${ink(2.2)}/>
    <rect x="30" y="28" width="40" height="36" rx="12" fill="#f3e4ff" ${ink()}/>
    <rect x="52" y="32" width="16" height="28" rx="8" fill="#c49ad4"/>
    <path d="M20 48 Q16 70 30 80 H70 Q84 70 80 48 Z" fill="#fff" ${ink()}/>
    <path d="M58 52 H78 Q80 68 70 76 H60 Z" fill="#e4ccf2"/>
    <rect x="36" y="56" width="28" height="12" rx="6" fill="#ffc8dd" ${ink(2)}/>
    <path d="M42 62 H58" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <circle cx="44" cy="36" r="3" fill="#fff" opacity=".8"/>
  `) },
};
