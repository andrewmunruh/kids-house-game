// The Game Room: a glam clubhouse the kids walk into from the map.
// Original art only. Tables line up with TABLES in src/shared/games/index.ts.
import { GAMEROOM_W, TABLES } from './shared/games/index';

export const GR_H = 600;
const O = '#5a3d5c';
const st = (w = 4) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

/** Where each chair's feet go, in a little arc in front of the table. */
export function seatLayout(tb: number): { x: number; y: number }[] {
  const n = TABLES[tb].seats;
  const spread = n <= 2 ? 140 : n === 4 ? 110 : 100;
  const mid = (n - 1) / 2;
  return Array.from({ length: n }, (_, i) => ({
    x: TABLES[tb].x + (i - mid) * spread,
    y: 558 - Math.abs(i - mid) * 8,
  }));
}

const bulbColors = ['#ff7eb3', '#ffd43b', '#66d9e8', '#d0bfff', '#fff'];
const star = (x: number, y: number, s = 1, fill = '#fff') => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${fill}" stroke="${O}" stroke-width="1.2" stroke-linejoin="round"/>`;

function strand(W: number, y0: number, sag: number, n: number): string {
  const wire = `<path d="M36 ${y0} Q ${W / 2} ${y0 + sag + 8} ${W - 36} ${y0}" fill="none" stroke="${O}" stroke-width="3"/>`;
  const bulbs = Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const x = 48 + t * (W - 96);
    const y = y0 + Math.sin(t * Math.PI) * sag;
    const c = bulbColors[i % bulbColors.length];
    return `<g class="bulb" style="animation-delay:-${(i % 8) * 0.22}s"><line x1="${x}" y1="${y - 16}" x2="${x}" y2="${y - 6}" stroke="${O}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="7.5" fill="${c}" ${st(2)}/><circle cx="${x - 2}" cy="${y - 2}" r="2.2" fill="#fff" opacity=".85"/></g>`;
  }).join('');
  return wire + bulbs;
}

const bean = (x: number, y: number, c: string, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${c}" ${st(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`;
const pouf = (x: number, y: number, c: string) => `<g transform="translate(${x} ${y})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${c}" ${st(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${st(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${st(2)}/>
</g>`;

function poster(x: number, y: number, rot: number, bg: string, art: string, cls = ''): string {
  return `<g class="photoFrame${cls}" transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${st(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${bg}"/>
    ${art}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`;
}
function polaroid(x: number, y: number, rot: number, bg: string, art: string): string {
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${st(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${bg}"/>
    ${art}
  </g>`;
}
function plant(x: number, y: number, pot: string, leaf: string): string {
  return `<g transform="translate(${x} ${y})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${pot}" ${st(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${st(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${leaf}" ${st(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${leaf}" ${st(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${leaf}" ${st(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${st(2)}/>
  </g>`;
}
function fridge(x: number, y: number): string {
  return `<g transform="translate(${x} ${y})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${st()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${st(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${st(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${st(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${st(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${st(1.5)}/>
  </g>`;
}

function chairArt(x: number, y: number, cushion: string): string {
  return `<g transform="translate(${x} ${y})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${st()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${cushion}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${cushion}" ${st()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round"/>
  </g>`;
}

function tableArt(tb: number): string {
  const t = TABLES[tb];
  const name = t.game === 'four' ? 'Four' : 'Slay';
  const felt = t.game === 'four' ? '#7ad7ea' : tb === 0 ? '#ff8ec8' : '#e0b0ff';
  const cushion = t.game === 'four' ? '#b8f2ff' : tb === 0 ? '#ffd0e6' : '#ead9ff';
  const rx = t.seats >= 6 ? 250 : t.seats >= 4 ? 200 : 150;
  const chairs = seatLayout(tb).map(c => chairArt(c.x, c.y, cushion)).join('');
  return `${chairs}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${rx + 18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${st(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${st(3)}/>
    <ellipse cx="0" cy="-4" rx="${rx}" ry="30" fill="${felt}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${rx - 16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-rx * 0.25}" cy="-12" rx="${rx * 0.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${O}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${name}</text>
  </g>`;
}

const heart = (x: number, y: number, s = 1, fill = '#ff4d94') => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${fill}" stroke="${O}" stroke-width="1.6" stroke-linejoin="round"/>`;

/** Wide side-view of the clubhouse: lights, neon, beanbags, rugs, and three round tables. */
export function gameRoomSVG(): string {
  const W = GAMEROOM_W;
  const sparks = [[120, 200], [260, 250], [640, 210], [900, 250], [1180, 190], [1560, 230], [1860, 180], [2100, 240], [2420, 200], [2520, 280]];
  return `<svg class="grScene" viewBox="0 0 ${W} ${GR_H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe0f2"/><stop offset="0.45" stop-color="#f3d4ff"/><stop offset="0.78" stop-color="#e7f7ff"/><stop offset="1" stop-color="#fff1c9"/>
    </linearGradient>
    <linearGradient id="grFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f7b7d4"/><stop offset="1" stop-color="#e089ab"/>
    </linearGradient>
    <linearGradient id="grSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c9f0ff"/><stop offset="1" stop-color="#ffe0f0"/>
    </linearGradient>
    <radialGradient id="disco" cx="38%" cy="32%" r="68%">
      <stop offset="0" stop-color="#fff"/><stop offset="0.4" stop-color="#ffe0f2"/><stop offset="1" stop-color="#d0bfff"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${GR_H}" fill="url(#grWall)"/>
  <rect y="390" width="${W}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({ length: 8 }, (_, i) => `<rect x="${40 + i * 330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join('')}
  <rect y="468" width="${W}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${W}" height="12" fill="#ffd43b" ${st(3)}/>
  ${[720, 1500, 2150].map((x, i) => `<ellipse cx="${x}" cy="548" rx="${i === 1 ? 210 : 280}" ry="42" fill="${i === 1 ? '#d8f6ff' : i === 0 ? '#ffe0f0' : '#f3e8ff'}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join('')}
  ${strand(W, 28, 22, 28)}
  ${strand(W, 78, 16, 18)}
  ${sparks.map(([x, y], i) => star(x, y, 0.7 + (i % 3) * 0.28, i % 2 ? '#fff' : '#ffd43b')).join('')}

  <g transform="translate(1180 70)">
    <rect x="20" y="20" width="220" height="150" rx="16" fill="url(#grSky)" ${st()}/>
    <path d="M20 70 H240 M130 20 V170" ${st(3)}/>
    <circle cx="78" cy="48" r="14" fill="#ffd43b" ${st(2)}/>
    <path d="M8 36 Q20 90 8 150" fill="#ff8ec8" ${st(3)}/><path d="M252 36 Q240 90 252 150" fill="#d0bfff" ${st(3)}/>
  </g>

  <g class="neonSign" transform="translate(560 168)">
    <g class="neonSignArt">
    <rect x="-228" y="-58" width="456" height="108" rx="28" fill="#2b1430" ${st(5)}/>
    <rect class="neonRing" x="-214" y="-44" width="428" height="80" rx="22" fill="none" stroke="#ff4d94" stroke-width="4"/>
    <path d="M-150 8 C-162 -14 -186 -8 -174 12 C-166 26 -150 36 -150 36 C-150 36 -134 26 -126 12 C-114 -8 -138 -14 -150 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="6" y="16" text-anchor="middle" font-size="40" font-weight="900" fill="#ff7eb3" stroke="#fff6fb" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY CLUB</text>
    </g>
  </g>

  ${poster(500, 340, -6, '#ffe0f0', `${heart(0, 8, 1.4)}${star(-18, -16, 0.7, '#ffd43b')}${star(18, -10, 0.55, '#66d9e8')}`, ' frameAtHead')}
  ${poster(424, 186, -8, '#ffe0f0', `${heart(0, 8, 1.4)}${star(-18, -16, 0.7, '#ffd43b')}${star(18, -10, 0.55, '#66d9e8')}`, ' framePhone')}
  ${poster(980, 240, 5, '#e7fbff', `<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${st(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${O}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${st(2)}/>`)}
  ${poster(1680, 255, -4, '#fff3c4', `${star(0, 2, 1.5, '#ffd43b')}`)}
  ${poster(2360, 245, 6, '#f3e8ff', `${heart(0, 4, 1.3, '#d0bfff')}`)}
  ${polaroid(400, 300, 8, '#fff0f6', heart(0, -4, 1.1))}
  ${polaroid(820, 310, -7, '#e7fbff', star(0, -6, 1, '#66d9e8'))}
  ${polaroid(1900, 300, 9, '#fff6e6', star(0, -6, 1, '#ffd43b'))}
  ${polaroid(2280, 320, -8, '#ffe0f0', heart(0, -4, 1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${O}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${st(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${star(-30, 20, 0.45)}${star(32, 28, 0.4, '#ffd43b')}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${st()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${st(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${O}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${st(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${plant(40, 400, '#ffd43b', '#8ce99a')}
  ${plant(1080, 392, '#ff8ec8', '#69db7c')}
  ${plant(1600, 400, '#d0bfff', '#8ce99a')}
  ${plant(2520, 396, '#66d9e8', '#69db7c')}
  ${fridge(200, 348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${st()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${st(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${st(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${st(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${st(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${O}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${bean(330, 455, '#ff8ec8', 1.05)}
  ${bean(1120, 468, '#d0bfff')}
  ${bean(1360, 470, '#8ce4f2', 0.9)}
  ${bean(1780, 462, '#ffd43b')}
  ${pouf(1480, 500, '#ffb3d9')}
  ${pouf(2000, 505, '#c9b3ff')}
  ${bean(2550, 468, '#ff8ec8', 0.85)}

  ${TABLES.map((_, i) => tableArt(i)).join('')}
  </svg>`;
}

/** Round top-bar / What's New icon: a neon heart. */
export const clubIcon = `<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${O}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`;
