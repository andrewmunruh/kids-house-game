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
export const CLUB = { x: 400, y: 260 };
export const BARN_PIN = { x: 905, y: 92 };

const tree = (x: number, y: number, s = 1, c = '#5cc985') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${st(3)}/><circle cx="0" cy="-10" r="20" fill="${c}" ${st(3)}/><circle cx="-12" cy="-2" r="12" fill="${c}" ${st(3)}/><circle cx="12" cy="-3" r="13" fill="${c}" ${st(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`;
const puff = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff"><ellipse cx="0" cy="10" rx="46" ry="22"/><ellipse cx="-36" cy="16" rx="28" ry="16"/><ellipse cx="38" cy="14" rx="30" ry="18"/><ellipse cx="10" cy="2" rx="24" ry="18"/></g>`;
const bloom = (x: number, y: number, c: string, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${[0, 72, 144, 216, 288].map(a => `<circle cx="${(Math.cos(a * Math.PI / 180) * 8).toFixed(1)}" cy="${(Math.sin(a * Math.PI / 180) * 8).toFixed(1)}" r="6.5" fill="${c}" ${st(2)}/>`).join('')}<circle r="4.5" fill="#ffd43b" ${st(2)}/></g>`;
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
export function mapTreesSVG(spots: { x: number; y: number; r: number }[], onRoad: (x: number, y: number) => boolean, w = MAP_W, h = MAP_H) {
  const out: string[] = []; let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 260 && out.length < 34; i++) {
    const x = 30 + rnd() * (w - 60), y = 40 + rnd() * (h - 70);
    if (onRoad(x, y) || spots.some(s => Math.hypot(s.x - x, s.y - y) < s.r)) continue;
    spots.push({ x, y, r: 46 });
    out.push(tree(x, y, 0.75 + rnd() * 0.45, ['#5cc985', '#4fbf7a', '#78d39a'][i % 3]));
  }
  return `<svg class="mapTrees" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${out.join('')}</svg>`;
}

/**
 * Phone portrait only. A tall street: landmarks across the top, houses in two
 * columns, friends gathered lower down. The iPad keeps mapBgSVG (1000×700).
 * This drawing has no #mapRoad, so the landscape house-gap check stays on the wide street.
 */
export function mapPortraitBgSVG(w: number, h: number) {
  const mid = w / 2;
  const road = `M ${mid} 36 C ${mid - 36} ${h * 0.28}, ${mid + 28} ${h * 0.48}, ${mid - 8} ${h * 0.68} S ${mid + 18} ${h * 0.86}, ${mid} ${h - 28}`;
  return `<svg class="mapBg" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" rx="28" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="${w * 0.22}" cy="${h * 0.22}" rx="90" ry="48"/><ellipse cx="${w * 0.78}" cy="${h * 0.42}" rx="80" ry="40"/><ellipse cx="${w * 0.3}" cy="${h * 0.72}" rx="100" ry="46"/></g>
  <ellipse cx="78" cy="${h * 0.58}" rx="46" ry="28" fill="#8ecae6" ${st()}/><ellipse cx="70" cy="${h * 0.56}" rx="24" ry="10" fill="#bde6f7"/>
  <path d="${road}" fill="none" stroke="${O}" stroke-width="44" stroke-linecap="round"/>
  <path d="${road}" fill="none" stroke="#f2dcb8" stroke-width="34" stroke-linecap="round"/>
  <path d="${road}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round" opacity=".9"/>
  ${[[40, 250, '#ff8fab'], [500, 280, '#b197fc'], [70, 520, '#ffd43b'], [490, 640, '#ff8fab'], [50, 860, '#74c0fc'], [500, 980, '#ffd43b']].map(([x, y, c]) => flower(+x, +y, String(c)) + flower(+x + 16, +y + 10, String(c))).join('')}
  </svg>`;
}

const bush = (x: number, y: number, s = 1, c = '#4fbf7a') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="10" rx="28" ry="8" fill="#000" opacity=".08"/><circle cx="-14" cy="-2" r="16" fill="${c}" ${st(3)}/><circle cx="14" cy="0" r="18" fill="${c}" ${st(3)}/><circle cx="0" cy="-12" r="14" fill="${c}" ${st(3)}/><circle cx="-4" cy="-16" r="4" fill="#fff" opacity=".28"/></g>`;
const butterfly = (x: number, y: number, c = '#ff8fab') => `<g transform="translate(${x} ${y})"><ellipse cx="-7" cy="-2" rx="8" ry="5" fill="${c}" ${st(2)} transform="rotate(-24)"/><ellipse cx="7" cy="-2" rx="8" ry="5" fill="${c}" ${st(2)} transform="rotate(24)"/><ellipse cx="-6" cy="4" rx="6" ry="4" fill="#b197fc" ${st(1.6)} transform="rotate(18)"/><ellipse cx="6" cy="4" rx="6" ry="4" fill="#b197fc" ${st(1.6)} transform="rotate(-18)"/><path d="M0 -6 V8" ${st(2)}/></g>`;

/**
 * Phone portrait only. Flowers, bushes, and a butterfly in the open grass under
 * the houses. Spots already claimed by a house, the road, or the square are skipped.
 * The iPad street never calls this.
 */
export function portraitMeadowSVG(w: number, h: number, avoid: { x: number; y: number; r: number }[]) {
  const mid = w / 2;
  const clear = (x: number, y: number, r: number) => y > h * 0.4 && y < h - 28
    && Math.abs(x - mid) > 52
    && !avoid.some(s => Math.hypot(s.x - x, s.y - y) < s.r + r);
  const cols = [0.07, 0.15, 0.22, 0.78, 0.85, 0.93];
  const rows = [0.46, 0.54, 0.62, 0.7, 0.78, 0.86, 0.93];
  const colors = ['#ff8fab', '#b197fc', '#ffd43b', '#74c0fc', '#69db7c'];
  const bits: string[] = [];
  let n = 0;
  rows.forEach((ry, ri) => {
    cols.forEach((rx, ci) => {
      const x = Math.round(w * rx + ((ri + ci) % 2 ? 8 : -6));
      const y = Math.round(h * ry);
      if ((ri + ci) % 3 === 0) {
        if (!clear(x, y, 34)) return;
        bits.push(bush(x, y, 0.85 + (ci % 2) * 0.15, ['#4fbf7a', '#5cc985', '#3dae6a'][(ri + ci) % 3]));
      } else {
        if (!clear(x, y, 18)) return;
        const c = colors[(ri * 2 + ci) % colors.length];
        bits.push(bloom(x, y, c, 0.85));
        if ((ri + ci) % 2 === 0 && clear(x + 18, y + 12, 14)) bits.push(bloom(x + 18, y + 12, colors[(ri + ci + 2) % colors.length], 0.7));
      }
      n++;
    });
  });
  const fly = [
    [w * 0.2, h * 0.5],
    [w * 0.8, h * 0.66],
    [w * 0.18, h * 0.84],
  ];
  for (const [x, y] of fly) {
    if (clear(x, y, 16)) bits.push(butterfly(Math.round(x), Math.round(y), n % 2 ? '#ffd43b' : '#ff8fab'));
  }
  return `<svg class="mapMeadowFill" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${bits.join('')}</svg>`;
}

/** Sky behind a portrait letterbox. Clouds sit in the band above the map card. */
export const mapSkySVG = `<svg class="mapSkyArt" viewBox="0 0 900 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
  ${puff(280, 28, 1.05)}${puff(430, 8, 0.8)}${puff(560, 36, 0.95)}
  ${puff(250, 88, 0.75)}${puff(390, 108, 1.05)}${puff(540, 96, 0.85)}${puff(640, 78, 0.7)}
  <g fill="none" stroke-linecap="round">
    ${['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7'].map((c, i) => `<path d="M300 ${118 + i * 6} A70 48 0 0 1 430 ${112 + i * 6}" stroke="${c}" stroke-width="5"/>`).join('')}
  </g>
</svg>`;

/** Hills, a fence, and flowers in the grass band under the map card. */
export const mapMeadowSVG = `<svg class="mapMeadowArt" viewBox="0 0 900 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <path d="M0 108 C 90 62 170 118 280 84 C 390 50 470 112 590 78 C 700 48 790 100 900 72 V 220 H0 Z" fill="#c9f2c4"/>
  <path d="M0 148 C 130 108 250 168 400 132 C 540 100 680 168 900 128 V 260 H0 Z" fill="#9be39a"/>
  <path d="M0 200 C 160 168 320 230 500 196 C 660 168 780 220 900 190 V 320 H0 Z" fill="#7dce78"/>
  <g stroke="#c99366" stroke-width="7" stroke-linecap="round">
    <path d="M16 168 H884"/><path d="M16 194 H884"/>
    ${Array.from({ length: 17 }, (_, i) => `<path d="M${28 + i * 52} 146 V218"/>`).join('')}
  </g>
  <g stroke="#fff6e6" stroke-width="3" stroke-linecap="round" opacity=".9">
    <path d="M16 164 H884"/><path d="M16 190 H884"/>
  </g>
  ${[[48, 188, '#ff8fab', 0.85], [120, 176, '#ffd43b', 0.7], [200, 198, '#b197fc', 0.9], [280, 172, '#ff8fab', 0.75], [360, 204, '#74c0fc', 0.8], [450, 178, '#ffd43b', 0.85], [530, 200, '#ff8fab', 0.75], [620, 174, '#b197fc', 0.8], [700, 196, '#69db7c', 0.7], [790, 180, '#ffd43b', 0.85]].map(([x, y, c, s]) => bloom(+x, +y, String(c), +s)).join('')}
  ${[[80, 248, '#ff8fab'], [160, 268, '#b197fc'], [250, 242, '#ffd43b'], [340, 274, '#ff8fab'], [430, 250, '#74c0fc'], [520, 270, '#b197fc'], [610, 246, '#ffd43b'], [700, 272, '#ff8fab'], [790, 252, '#69db7c']].map(([x, y, c]) => bloom(+x, +y, String(c), 1.05)).join('')}
  ${[[110, 304, '#ffd43b'], [230, 292, '#ff8fab'], [360, 308, '#b197fc'], [490, 294, '#74c0fc'], [620, 306, '#ff8fab'], [750, 296, '#ffd43b']].map(([x, y, c]) => bloom(+x, +y, String(c), 0.9)).join('')}
</svg>`;

/** The park from above-ish: lawn, swing set, slide, a tree. */
export const parkMiniSVG = `<svg viewBox="0 0 200 170"><ellipse class="parkLawn" cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${st()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${st(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${st(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${st(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${st(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${st(2.5)}/>
  ${tree(40, 66, 1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${st(3)}/><path d="M178 88 V132" ${st(4)}/>
</svg>`;

/** Rainbow Ranch from above-ish: a rainbow, the red barn, a fence and a pony. */
export const ranchMiniSVG = `<svg viewBox="0 0 220 180"><ellipse class="ranchGrass" cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${st()}/>
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
  ${[36, 52, 68, 84, 100, 116, 132, 148].map((x, i) => `<circle class="clubBulb" cx="${x}" cy="58" r="3.2" fill="${['#ff7eb3', '#ffd43b', '#66d9e8', '#d0bfff'][i % 4]}" ${st(1.4)}/>`).join('')}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`;

export const mapIcon = `<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${st(3)}/><path d="M17 8 V35 M31 13 V40" ${st(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${st(2)}/></svg>`;

/** A round face for map markers: the character art cropped to the head. */
export const faceSVG = (charSvg: string) => charSvg.indexOf('data-chibi') >= 0
  ? charSvg.replace('viewBox="0 0 200 320"', 'viewBox="24 0 152 168"')
  : charSvg.replace('viewBox="0 0 100 160"', 'viewBox="14 2 72 74"');
