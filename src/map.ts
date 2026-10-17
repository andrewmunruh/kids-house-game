// Neighborhood map: a bird's-eye illustrated map (1000 x 700 map units) with a curvy street.
// Houses sit along the road (placed by measuring the road path), the park top-left,
// Rainbow Ranch at the end of the road, and a little town square where kids "on the map" stand.
const O = '#5a3d5c';
const st = (w = 4) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const RAINBOW = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7', '#b197fc'];
export const MAP_W = 1000, MAP_H = 700;
export const ROAD_D = 'M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150';
export const PARK = { x: 115, y: 170 }, RANCH = { x: 880, y: 120 }, SQUARE = { x: 600, y: 480 };
/** Glam clubhouse, in the open grass inside the S-curve. */
export const CLUB = { x: 430, y: 262 };
export const BARN_PIN = { x: 905, y: 92 };

const tree = (x: number, y: number, s = 1, c = '#5cc985') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${st(3)}/><circle cx="0" cy="-10" r="20" fill="${c}" ${st(3)}/><circle cx="-12" cy="-2" r="12" fill="${c}" ${st(3)}/><circle cx="12" cy="-3" r="13" fill="${c}" ${st(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`;
const flower = (x: number, y: number, c: string) => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map(a => `<circle cx="${Math.cos(a * Math.PI / 180) * 4}" cy="${Math.sin(a * Math.PI / 180) * 4}" r="3.6" fill="${c}"/>`).join('')}<circle r="2.6" fill="#ffd43b"/></g>`;

/** The ground: grass, meadows, a pond, the road, the town square with its fountain. */
export function mapBgSVG() {
  return `<svg class="mapBg" viewBox="0 0 ${MAP_W} ${MAP_H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${MAP_W}" height="${MAP_H}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${st()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${O}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${ROAD_D}" fill="none" stroke="${O}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${ROAD_D}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${ROAD_D}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${SQUARE.x} ${SQUARE.y})"><circle r="74" fill="#f7e6c8" ${st()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${st()}/><circle r="13" fill="#fff6e6" ${st(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${flower(-52, -40, '#ff8fab')}${flower(54, -38, '#b197fc')}${flower(-56, 40, '#ffd43b')}${flower(52, 44, '#ff8fab')}</g>
  ${[[60, 330, '#ff8fab'], [300, 470, '#b197fc'], [430, 560, '#ffd43b'], [760, 520, '#ff8fab'], [950, 260, '#b197fc'], [600, 260, '#ffd43b'], [380, 90, '#ff8fab'], [40, 120, '#b197fc'], [960, 420, '#ffd43b'], [840, 640, '#b197fc'], [210, 620, '#ff8fab']].map(([x, y, c]) => flower(+x, +y, String(c)) + flower(+x + 14, +y + 8, String(c))).join('')}
  </svg>`;
}

/** Trees, drawn on top of the ground but under houses (positions picked to avoid the road and the spots). */
export function mapTreesSVG(spots: { x: number; y: number; r: number }[], onRoad: (x: number, y: number) => boolean) {
  const out: string[] = []; let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 260 && out.length < 34; i++) {
    const x = 30 + rnd() * (MAP_W - 60), y = 40 + rnd() * (MAP_H - 70);
    if (onRoad(x, y) || spots.some(s => Math.hypot(s.x - x, s.y - y) < s.r)) continue;
    spots.push({ x, y, r: 46 });
    out.push(tree(x, y, 0.75 + rnd() * 0.45, ['#5cc985', '#4fbf7a', '#78d39a'][i % 3]));
  }
  return `<svg class="mapTrees" viewBox="0 0 ${MAP_W} ${MAP_H}" xmlns="http://www.w3.org/2000/svg">${out.join('')}</svg>`;
}

/** The park from above-ish: lawn, swing set, slide, a tree. */
export const parkMiniSVG = `<svg viewBox="0 0 200 170"><ellipse cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${st()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${st(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${st(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${st(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${st(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${st(2.5)}/>
  ${tree(40, 66, 1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${st(3)}/><path d="M178 88 V132" ${st(4)}/>
</svg>`;

/** Rainbow Ranch from above-ish: a rainbow, the red barn, a fence and a pony. */
export const ranchMiniSVG = `<svg viewBox="0 0 220 180"><ellipse cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${st()}/>
  ${RAINBOW.map((c, i) => `<path d="M${20 + i * 7} 120 A${90 - i * 7} ${84 - i * 7} 0 0 1 ${200 - i * 7} 120" fill="none" stroke="${c}" stroke-width="7"/>`).join('')}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${st(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${O}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${RAINBOW.map((c, i) => `<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${c}" stroke-width="1.3" transform="translate(0 ${-3 + i * 1.2})"/>`).join('')}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${st(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${st(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${st(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${st(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${st(5)}/>${RAINBOW.slice(0, 4).map((c, i) => `<path d="M38 ${-34 + i * 5} q-14 4 -20 14" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`).join('')}<path d="M-20 14 V34 M20 14 V34" ${st(6)}/></g>
</svg>`;

/** The clubhouse from above: a pink cottage, neon heart, fairy lights and two little tables. */
export const clubhouseMiniSVG = `<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${st()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${st(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${st(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${st(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${st(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${st(2)}/>
  ${[36, 52, 68, 84, 100, 116, 132, 148].map((x, i) => `<circle cx="${x}" cy="58" r="3.2" fill="${['#ff7eb3', '#ffd43b', '#66d9e8', '#d0bfff'][i % 4]}" ${st(1.4)}/>`).join('')}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`;

export const mapIcon = `<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${st(3)}/><path d="M17 8 V35 M31 13 V40" ${st(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${st(2)}/></svg>`;

/** A round face for map markers: the character art cropped to the head. */
export const faceSVG = (charSvg: string) => charSvg.replace('viewBox="0 0 100 160"', 'viewBox="14 2 72 74"');
