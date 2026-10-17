// The park: one wide, original SVG scene (2900 x 600 world units) plus a few live pieces (swings, ball).
import { PARK_W, PARK_SPOTS, SLIDE, DOG_AREA } from './shared/hood';

const O = '#5a3d5c';
const st = (w = 4) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const PARK_H = 600, SWING_BAR = 250;

const tree = (x: number, y: number, s = 1, c = '#5cc985') => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${st()}/>
  <circle cx="0" cy="-60" r="58" fill="${c}" ${st()}/><circle cx="-30" cy="-40" r="34" fill="${c}" ${st()}/><circle cx="32" cy="-38" r="36" fill="${c}" ${st()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`;
const flower = (x: number, y: number, c: string) => `<g transform="translate(${x} ${y})"><path d="M0 0 V-16" ${st(3)}/>${[0, 72, 144, 216, 288].map(a => `<circle cx="${Math.cos(a * Math.PI / 180) * 6}" cy="${-20 + Math.sin(a * Math.PI / 180) * 6}" r="5" fill="${c}" ${st(2)}/>`).join('')}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${st(2)}/></g>`;
const bench = (x: number) => `<g transform="translate(${x} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${st()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${st()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${st(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${st(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${st()}/></g>`;

export function parkSceneSVG() {
  const W = PARK_W;
  const fence = Array.from({ length: Math.floor((DOG_AREA.x1 - DOG_AREA.x0 + 40) / 34) }, (_, i) => {
    const x = DOG_AREA.x0 - 20 + i * 34; return `<path d="M${x} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${st(3)}/>`; }).join('');
  return `<svg class="parkScene" viewBox="0 0 ${W} ${PARK_H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${W}" height="440" fill="url(#pkSky)"/>
  ${[180, 900, 1600, 2300].map((x, i) => `<g transform="translate(${x} ${70 + (i % 2) * 30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join('')}
  <circle cx="${W - 220}" cy="90" r="46" fill="#ffe066" ${st(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${W + 100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${W}" height="190" fill="#9fe0aa"/><path d="M0 410 H${W}" ${st(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${W} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${tree(260, 390, .9)}${tree(720, 380, 1.05, '#4fbf7a')}${tree(1230, 385, .8)}${tree(1640, 380, 1, '#4fbf7a')}${tree(1990, 388, .85)}${tree(2380, 380, .95)}${tree(2860, 390, .9, '#4fbf7a')}
  ${[[300, 470, '#ff8fab'], [690, 455, '#c9a0dc'], [1210, 470, '#ffd166'], [1960, 450, '#8ecae6'], [2390, 470, '#ff8fab'], [1580, 590, '#c9a0dc'], [140, 585, '#ffd166']].map(([x, y, c]) => flower(+x, +y, String(c))).join('')}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${st()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${st()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${O}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${st(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${O}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${SWING_BAR} L310 500 M350 ${SWING_BAR} L390 500 M650 ${SWING_BAR} L610 500 M650 ${SWING_BAR} L690 500" stroke="${O}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${SWING_BAR} L310 500 M350 ${SWING_BAR} L390 500 M650 ${SWING_BAR} L610 500 M650 ${SWING_BAR} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${SWING_BAR - 10}" width="340" height="20" rx="10" fill="#ff8fab" ${st()}/></g>
  <!-- slide -->
  <g><path d="M${SLIDE.ladder - 20} 560 V${SLIDE.top.y} M${SLIDE.ladder + 30} 560 V${SLIDE.top.y}" stroke="${O}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${SLIDE.ladder - 20} 560 V${SLIDE.top.y} M${SLIDE.ladder + 30} 560 V${SLIDE.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380, 420, 460, 500, 540].map(y => `<path d="M${SLIDE.ladder - 20} ${y} H${SLIDE.ladder + 30}" ${st(5)}/>`).join('')}
    <rect x="${SLIDE.ladder - 30}" y="${SLIDE.top.y - 14}" width="100" height="18" rx="8" fill="#ffd166" ${st()}/>
    <path d="M${SLIDE.ladder + 60} ${SLIDE.top.y - 10} C 1000 ${SLIDE.top.y} 1010 520 ${SLIDE.bottom.x + 40} 548 L${SLIDE.bottom.x + 40} 572 C 990 548 975 ${SLIDE.top.y + 30} ${SLIDE.ladder + 60} ${SLIDE.top.y + 14} Z" fill="#ffd166" ${st()}/>
    <path d="M${SLIDE.ladder + 70} ${SLIDE.top.y - 2} C 990 ${SLIDE.top.y + 8} 1000 525 ${SLIDE.bottom.x + 30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${st()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${st(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${st(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${st(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${st(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${st(2)}/><circle cx="18" cy="-14" r="1.8" fill="${O}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${st()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${st(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${st(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${st(2)}/></g></g>
  ${bench(2065)}${bench(2265)}
  <!-- dog area -->
  <g>${fence}<path d="M${DOG_AREA.x0 - 20} 440 H${DOG_AREA.x1 + 20}" ${st(3)}/>
    <g transform="translate(${DOG_AREA.x0 + 10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${st(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${st(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${O}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${DOG_AREA.x1 - 30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${st()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${O}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${DOG_AREA.x0 + 120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${st(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${st(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${st(3)}/></g></g>
  </svg>`;
}
export const swingSVG = `<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${O}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${st(3)}/></svg>`;
export const ballSVG = `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${st(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`;
export const treeIcon = `<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${O}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${O}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`;
export const pawIcon = `<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${O}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${O}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${O}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${O}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${O}" stroke-width="3"/></svg>`;
export const gateIcon = `<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${O}" stroke-width="3" stroke-linecap="round"/></svg>`;
export { PARK_SPOTS };
/** The park entrance drawn at the end of the street. */
export const streetGateSVG = `<svg viewBox="0 0 220 280">
  <g transform="translate(30 250) scale(.55)"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${st()}/><circle cx="0" cy="-60" r="58" fill="#4fbf7a" ${st()}/></g>
  <g transform="translate(190 250) scale(.55)"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${st()}/><circle cx="0" cy="-60" r="58" fill="#5cc985" ${st()}/></g>
  <rect x="48" y="96" width="18" height="170" rx="6" fill="#c99366" ${st()}/><rect x="154" y="96" width="18" height="170" rx="6" fill="#c99366" ${st()}/>
  <path d="M40 106 Q110 40 180 106" fill="none" stroke="${O}" stroke-width="16" stroke-linecap="round"/><path d="M40 106 Q110 40 180 106" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
  <rect x="62" y="52" width="96" height="36" rx="12" fill="#fff6e6" ${st(3)}/><text x="110" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="${O}" font-family="Nunito, system-ui, sans-serif">PARK</text>
  <path d="M86 200 H124 M112 188 L126 200 L112 212" fill="none" stroke="${O}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
