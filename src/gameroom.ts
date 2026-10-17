// The Game Room: a glam clubhouse the kids walk into from the map.
// Original art only. Tables line up with TABLES in src/shared/games/index.ts.
import { GAMEROOM_W, GAMES, TABLES } from './shared/games/index';

export const GR_H = 600;
const O = '#5a3d5c';
const st = (w = 4) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

/** Where each chair's feet go, in a little arc in front of the table. */
export function seatLayout(tb: number): { x: number; y: number }[] {
  const n = TABLES[tb].seats;
  const spread = n <= 2 ? 110 : n === 4 ? 72 : 62;
  const mid = (n - 1) / 2;
  return Array.from({ length: n }, (_, i) => ({
    x: TABLES[tb].x + (i - mid) * spread,
    y: 558 - Math.abs(i - mid) * 7,
  }));
}

const bulbColors = ['#ff7eb3', '#ffd43b', '#66d9e8', '#d0bfff', '#fff'];
const bean = (x: number, y: number, c: string) => `<g transform="translate(${x} ${y})">
  <ellipse cx="0" cy="18" rx="38" ry="10" fill="#000" opacity=".12"/>
  <path d="M-34 8 Q-40 -18 -8 -22 Q8 -36 28 -16 Q42 0 30 14 Q10 26 -20 18 Q-36 14 -34 8 Z" fill="${c}" ${st(3)}/>
  <path d="M-16 -8 Q-4 -18 10 -6" fill="none" stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"/>
</g>`;
const star = (x: number, y: number, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -8 L2 -2 L8 -2 L3 2 L5 8 L0 4 L-5 8 L-3 2 L-8 -2 L-2 -2 Z" fill="#fff" opacity=".9"/>`;

function tableArt(tb: number): string {
  const t = TABLES[tb];
  const name = t.game === 'four' ? 'Four' : 'Slay';
  const felt = t.game === 'four' ? '#7ad7ea' : tb === 0 ? '#ff8ec8' : '#e0b0ff';
  const w = t.seats >= 6 ? 168 : t.seats >= 4 ? 128 : 96;
  const chairs = seatLayout(tb).map(c => `<g transform="translate(${c.x} ${c.y - 36})">
    <rect x="-16" y="-8" width="32" height="22" rx="8" fill="#fff6fb" ${st(3)}/>
    <rect x="-18" y="10" width="36" height="10" rx="5" fill="#ffd0e6" ${st(3)}/>
  </g>`).join('');
  return `${chairs}
  <g transform="translate(${t.x} 498)">
    <ellipse cx="0" cy="28" rx="${w + 18}" ry="18" fill="#000" opacity=".1"/>
    <rect x="${-w}" y="-8" width="${w * 2}" height="46" rx="20" fill="${felt}" ${st()}/>
    <rect x="${-w + 10}" y="0" width="${w * 2 - 20}" height="28" rx="12" fill="#fff" opacity=".28"/>
    <text x="0" y="20" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${O}" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${name}</text>
  </g>`;
}

/** Wide side-view of the clubhouse: fairy lights, beanbags, neon heart, three game tables. */
export function gameRoomSVG(): string {
  const W = GAMEROOM_W;
  const lights = Array.from({ length: 26 }, (_, i) => {
    const x = 70 + i * ((W - 140) / 25);
    const y = 54 + (i % 2) * 12;
    return `<g class="bulb" style="animation-delay:-${(i % 6) * 0.25}s"><line x1="${x}" y1="36" x2="${x}" y2="${y - 6}" stroke="${O}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="7" fill="${bulbColors[i % bulbColors.length]}" ${st(2)}/><circle cx="${x - 2}" cy="${y - 2}" r="2.2" fill="#fff" opacity=".8"/></g>`;
  }).join('');
  const spark = [[180, 120], [260, 180], [620, 150], [980, 130], [1280, 170], [1680, 140], [1980, 180], [2360, 130], [2480, 200]].map(([x, y], i) => star(x, y, 0.8 + (i % 3) * 0.25)).join('');
  return `<svg class="grScene" viewBox="0 0 ${W} ${GR_H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grWall" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffd0ea"/><stop offset="0.35" stop-color="#f3d4ff"/><stop offset="0.68" stop-color="#d7f6ff"/><stop offset="1" stop-color="#fff3c4"/>
    </linearGradient>
    <linearGradient id="grFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffb3d1"/><stop offset="1" stop-color="#e89ab8"/>
    </linearGradient>
    <radialGradient id="disco" cx="40%" cy="35%" r="65%">
      <stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="#e7f5ff"/><stop offset="1" stop-color="#d0bfff"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${GR_H}" fill="url(#grWall)"/>
  <rect y="500" width="${W}" height="100" fill="url(#grFloor)"/>
  <rect y="496" width="${W}" height="10" fill="#ffd43b" ${st(3)}/>
  <path d="M40 38 Q ${W / 2} 78 ${W - 40} 36" fill="none" stroke="${O}" stroke-width="3"/>
  ${lights}
  ${spark}
  <g class="disco" transform="translate(1280 78)">
    <line y1="0" y2="18" stroke="${O}" stroke-width="3"/>
    <circle cy="36" r="22" fill="url(#disco)" ${st(3)}/>
    <path d="M-12 30 L0 48 L12 30 M-8 42 H8" fill="none" stroke="#fff" stroke-width="2"/>
  </g>
  <g class="neonSign" transform="translate(300 118)">
    <rect x="-8" y="-48" width="250" height="78" rx="22" fill="#2b1430" ${st(4)}/>
    <path d="M36 8 C28 -8 8 -4 16 12 C22 24 36 32 36 32 C36 32 50 24 56 12 C64 -4 44 -8 36 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="150" y="16" text-anchor="middle" font-size="32" font-weight="900" fill="#ff7eb3" stroke="#fff" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">CLUB</text>
  </g>
  ${bean(210, 500, '#ff8ec8')}
  ${bean(1040, 512, '#d0bfff')}
  ${bean(1760, 508, '#8ce4f2')}
  ${bean(2460, 500, '#ffd43b')}
  <g transform="translate(90 250)">
    <rect x="0" y="40" width="70" height="150" rx="10" fill="#ff8ec8" ${st()}/>
    <circle cx="58" cy="118" r="5" fill="#ffd43b" ${st(2)}/>
    <rect x="10" y="8" width="50" height="22" rx="8" fill="#fff6e6" ${st(2)}/>
    <text x="35" y="24" text-anchor="middle" font-size="13" font-weight="900" fill="${O}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
  </g>
  ${TABLES.map((_, i) => tableArt(i)).join('')}
  </svg>`;
}

/** Round top-bar / What's New icon: a neon heart. */
export const clubIcon = `<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${O}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`;
