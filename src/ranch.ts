// Rainbow Ranch art: one wide original SVG scene (3600 x 600 world units) plus live pieces
// (animals, horses, hen house, tractor, apple tree, garden plots, feed buckets).
import { RANCH_W, ANIMAL_X, HORSE_X, PLOT_X, BARN_W, BARN_ANIMAL_X, type Plot } from './shared/ranch';

const O = '#5a3d5c';
const st = (w = 4) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const RANCH_H = 600;
export const RAINBOW = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7', '#b197fc'];
const eye = (x: number, y: number, r = 3) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${O}"/><circle cx="${x + 1}" cy="${y - 1}" r="${r / 3}" fill="#fff"/>`;
const blush = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`;

const arch = (cx: number, cy: number, r: number, w: number) => RAINBOW.map((c, i) => `<path d="M${cx - r + i * w} ${cy} A${r - i * w} ${r - i * w} 0 0 1 ${cx + r - i * w} ${cy}" fill="none" stroke="${c}" stroke-width="${w}"/>`).join('');
const tree = (x: number, y: number, s = 1, c = '#5cc985') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${st()}/>
  <circle cx="0" cy="-60" r="58" fill="${c}" ${st()}/><circle cx="-30" cy="-40" r="34" fill="${c}" ${st()}/><circle cx="32" cy="-38" r="36" fill="${c}" ${st()}/></g>`;
const hay = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${st()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`;
const fence = (x0: number, x1: number, y: number) => {
  const posts = Array.from({ length: Math.floor((x1 - x0) / 70) + 1 }, (_, i) => `<rect x="${x0 + i * 70 - 7}" y="${y - 58}" width="14" height="64" rx="5" fill="#fff6e6" ${st(3)}/>`).join('');
  return `<rect x="${x0}" y="${y - 46}" width="${x1 - x0}" height="11" rx="5" fill="#fff6e6" ${st(3)}/><rect x="${x0}" y="${y - 22}" width="${x1 - x0}" height="11" rx="5" fill="#fff6e6" ${st(3)}/>${posts}`;
};

export function ranchSceneSVG() {
  const W = RANCH_W;
  return `<svg class="parkScene ranchScene" viewBox="0 0 ${W} ${RANCH_H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${W}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${arch(1900, 430, 620, 26)}</g>
  ${[160, 820, 1500, 2300, 3000].map((x, i) => `<g transform="translate(${x} ${70 + (i % 2) * 34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join('')}
  <g transform="translate(${W - 200} 92)"><circle r="48" fill="#ffe066" ${st()}/>${eye(-15, -6, 4)}${eye(13, -6, 4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${st(3)}/>${blush(-26, 8)}${blush(26, 8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${W + 100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${W}" height="190" fill="#a6e3a0"/><path d="M0 410 H${W}" ${st()}/>
  <path d="M0 566 Q900 530 1800 570 T${W} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${tree(3560, 400, .8, '#4fbf7a')}
  <!-- entrance gate with a rainbow arch -->
  <g class="ranchSign"><g class="ranchSignArt"><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${st()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${st()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${O}" stroke-width="44" stroke-linecap="round"/>
    ${RAINBOW.map((c, i) => `<path d="M${18 + 0} 312 A112 100 0 0 1 242 312" fill="none" stroke="${c}" stroke-width="${36 - i * 6}" stroke-linecap="round"/>`).join('')}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${st(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${O}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${st(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${O}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${RAINBOW.map((c, i) => `<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${c}" stroke-width="3" transform="translate(0 ${-7 + i * 2.8})" stroke-linejoin="round"/>`).join('')}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${st(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${st(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${st(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${st(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g class="barnBanner" transform="translate(165 300)"><g class="ranchSignArt">${RAINBOW.map((c, i) => `<rect x="${-120 + i * 40}" y="-16" width="40" height="30" fill="${c}"/>`).join('')}<rect x="-120" y="-16" width="240" height="30" fill="none" ${st(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${O}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  </g>
  ${hay(640, 560, .8)}${hay(1950, 470, .7)}${hay(1880, 470, .55)}${hay(3115, 470, .7)}${hay(3115, 425, .55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({ length: 6 }, (_, i) => { const x = 1030 + i * 66, h = 70 + (i % 3) * 18; return `<g transform="translate(${x} 470)"><path d="M0 0 V-${h}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${i % 2 ? 9 : -9}" cy="-${h / 2}" rx="11" ry="5" fill="#69db7c" ${st(2.5)}/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<ellipse cx="${Math.cos(a * Math.PI / 180) * 14}" cy="${-h + Math.sin(a * Math.PI / 180) * 14}" rx="8" ry="5" transform="rotate(${a} ${Math.cos(a * Math.PI / 180) * 14} ${-h + Math.sin(a * Math.PI / 180) * 14})" fill="#ffd43b" ${st(2)}/>`).join('')}<circle cy="-${h}" r="10" fill="#a0522d" ${st(2.5)}/></g>`; }).join('')}
  <!-- pond -->
  <ellipse cx="${POND.x}" cy="${POND.y}" rx="${POND.rx}" ry="${POND.ry}" fill="#8ecae6" ${st()}/><ellipse cx="${POND.x - 15}" cy="${POND.y - 6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${st()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${st(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${O}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${st(5)}/>
  </svg>`;
}

/** Paddock fence and the HORSES sign, drawn above the yard so they sort by foot y with the horses. */
export function paddockFenceSVG() {
  return `<svg class="fenceLayer" viewBox="0 0 ${RANCH_W} ${RANCH_H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${fence(2400, 3080, 470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${st(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${O}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`;
}

// ---------- animals (side view, facing right, viewBox 0 0 120 100; .head bobs when munching) ----------
export const ANIMAL_INFO = [
  { name: 'Goat', say: 'Meh-eh-eh!', snd: 'bleat' }, { name: 'Sheep', say: 'Baa!', snd: 'baa' }, { name: 'Piglet', say: 'Oink oink!', snd: 'oink' },
  { name: 'Chicks', say: 'Peep peep!', snd: 'peep' }, { name: 'Bunny', say: '*wiggle wiggle*', snd: 'squeak' }, { name: 'Cow', say: 'Moooo!', snd: 'moo' },
] as const;
const legs = (xs: number[], top: number, c: string, h = 94) => xs.map((x, i) => `<rect class="leg ${i % 2 ? 'b' : 'a'}" x="${x}" y="${top}" width="9" height="${h - top}" rx="4" fill="${c}" ${st(3)}/>`).join('');
export function animalSVG(i: number) {
  switch (i) {
    case 0: return `<svg viewBox="0 0 120 100">${legs([32, 44, 70, 82], 60, '#efe6dc')}<path class="tail" d="M24 50 l-8 -10" ${st(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${st()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${st(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${st()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${st(3)}/>${eye(98, 36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${st(3)}/>${blush(102, 46)}<circle cx="106" cy="44" r="2" fill="${O}"/></g></svg>`;
    case 1: return `<svg viewBox="0 0 120 100">${legs([36, 48, 70, 80], 62, '#5a4a5c')}
      ${[[40, 50], [56, 44], [72, 48], [86, 56], [70, 64], [48, 64], [34, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="#fff" ${st(3)}/>`).join('')}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${st()}/><circle cx="92" cy="32" r="8" fill="#fff" ${st(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${st(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${O}"/>${blush(102, 52)}</g></svg>`;
    case 2: return `<svg viewBox="0 0 120 100">${legs([38, 50, 66, 78], 66, '#ffadc6')}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${st(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${st()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${st()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${st(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${st(3)}/><circle cx="102" cy="54" r="1.6" fill="${O}"/><circle cx="106" cy="57" r="1.6" fill="${O}"/>${eye(92, 46)}${blush(90, 60)}</g></svg>`;
    case 3: return `<svg viewBox="0 0 120 100">${[[30, 72, 1], [62, 66, 1.15], [92, 74, .95]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${st(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${st(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${st(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${st(2)}/>${eye(7, -10, 2.2)}</g></g>`).join('')}</svg>`;
    case 4: return `<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${st(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${st()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${st(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${st(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${st(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${st()}/>${eye(92, 52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${blush(90, 63)}</g></svg>`;
    default: return `<svg viewBox="0 0 120 100">${legs([30, 42, 72, 84], 62, '#fff')}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${st(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${st()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${O}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${st(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${st()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${st(3)}/><circle cx="95" cy="52" r="1.8" fill="${O}"/><circle cx="105" cy="52" r="1.8" fill="${O}"/>${eye(94, 34)}${eye(106, 34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${st(3)}/></g></svg>`;
  }
}

// ---------- horses (viewBox 0 0 160 130, facing right; feet at the bottom) ----------
/** Pond in ranch world units (the ellipse in the yard). Rides route around it. */
export const POND = { x: 2265, y: 520, rx: 110, ry: 34 };
/** Bottom of the paddock fence posts. Sprites sort by this foot y. */
export const FENCE_FOOT = 476;

export const HORSE_COATS = [
  { name: 'Chestnut', body: '#c97b45', mane: '#7a3f22', sock: '#fff6e6' },
  { name: 'Snowy', body: '#fdf8f3', mane: '#d9cdc4', sock: '#e9ddd2' },
  { name: 'Midnight', body: '#4a3f52', mane: '#2a2230', sock: '#6b5e74' },
  { name: 'Sunny', body: '#f2c96b', mane: '#fff6e0', sock: '#fff6e0' },
  { name: 'Rainbow Pony', body: '#fff0fa', mane: 'rainbow', sock: '#ffd6ec' },
];
export function horseSVG(coat: number, saddle = false) {
  const c = HORSE_COATS[coat] ?? HORSE_COATS[0], rb = c.mane === 'rainbow';
  // Rainbow strands stay on the crest, above the saddle (saddle peak is y=43). Longer strands used to paint across it.
  const mane = rb ? RAINBOW.map((col, i) => {
    const x = 124 - i * 1.6, y = 14 + i * 2.4;
    return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q-6.5 2 -4.5 ${6 + i * 0.35}" fill="none" stroke="${col}" stroke-width="5.5" stroke-linecap="round"/>`;
  }).join('')
    : `<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${c.mane}" ${st(3)}/>`;
  const tail = rb ? `<g class="tail">${RAINBOW.map((col, i) => `<path d="M30 58 q-18 ${8 + i * 3} -14 ${36 + i}" fill="none" stroke="${col}" stroke-width="6" stroke-linecap="round"/>`).join('')}</g>`
    : `<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${c.mane}" ${st(3)}/>`;
  const leg = (x: number, cls: string) => `<g class="leg ${cls}"><rect x="${x}" y="78" width="12" height="44" rx="5" fill="${c.body}" ${st(3)}/><rect x="${x}" y="110" width="12" height="12" rx="4" fill="${c.sock}" ${st(3)}/></g>`;
  return `<svg viewBox="0 0 160 130" class="horsesvg">${tail}${leg(40, 'a')}${leg(56, 'b')}${leg(96, 'b')}${leg(112, 'a')}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${c.body}" ${st()}/>
    ${saddle || rb ? `<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${rb ? '#b197fc' : '#e8590c'}" ${st(3)}/>` : ''}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${c.body}" ${st()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${c.body}" ${st(3)}/>${mane}
    ${eye(130, 30, 3.4)}<circle cx="146" cy="42" r="2" fill="${O}"/>${blush(136, 40)}
    ${rb ? `<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${st(2)}/>` : ''}</g>
    ${rb ? `<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>` : ''}</svg>`;
}

// ---------- props ----------
export const henHouseSVG = `<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${st(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${st()}/>${RAINBOW.map((c, i) => `<rect x="${24 + i * 22}" y="66" width="22" height="10" fill="${c}"/>`).join('')}
  <rect x="24" y="66" width="132" height="10" fill="none" ${st(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${st(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${st(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${st(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${st(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${st(2)}/>${eye(106, 102, 2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${O}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`;
export const tractorSVG = `<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${st()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${st(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${st()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${st(3)}/>
  <circle cx="122" cy="98" r="28" fill="${O}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${st(3)}/><circle cx="44" cy="106" r="18" fill="${O}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${st(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${st(2)}/></svg>`;
export const appleTreeSVG = `<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${st()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${st()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${st()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${st()}/>
  ${[[80, 90], [150, 70], [175, 140], [100, 150], [130, 115], [60, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="#ff6b6b" ${st(3)}/><path d="M${x} ${y - 10} q2 -6 6 -7" fill="none" ${st(2)}/>`).join('')}</svg>`;
export const APPLE_SPOTS = [[80, 90], [150, 70], [175, 140], [100, 150]]; // in apple-tree svg units
export const appleSVG = `<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${st(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${st(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${st(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`;
export const carrotSVG = `<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${st(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${st(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`;
export const haySVG = `<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${st(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`;
export const eggSVG = `<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${st(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`;
export const flowerSVG = (c = '#ff8fab') => `<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0, 72, 144, 216, 288].map(a => `<circle cx="${20 + Math.cos(a * Math.PI / 180) * 8}" cy="${14 + Math.sin(a * Math.PI / 180) * 8}" r="7" fill="${c}" ${st(2.5)}/>`).join('')}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${st(2)}/></svg>`;
export const FEED_SVG: Record<string, string> = { carrot: carrotSVG, apple: appleSVG, hay: haySVG };
export const bucketSVG = (feed: string) => `<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${FEED_SVG[feed].replace('<svg viewBox="0 0 40 40">', '').replace('</svg>', '')}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${feed === 'carrot' ? '#74c0fc' : feed === 'apple' ? '#ffa8c5' : '#b2f2bb'}" ${st(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`;
export const basketSVG = `<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${st(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`;
const FLOWER_COLS = ['#ff8fab', '#c9a0dc', '#ffd43b', '#74c0fc', '#ff922b'];
/** A garden plot at its growth stage (viewBox 0 0 70 90). */
export function plotSVG(p: Plot | null, stage: number, i: number) {
  const soil = `<ellipse cx="35" cy="76" rx="30" ry="11" fill="${p?.wet ? '#7a4b2e' : '#9c6b46'}" ${st(3)}/>`;
  if (!p) return `<svg viewBox="0 0 70 90">${soil}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
  const col = FLOWER_COLS[i % FLOWER_COLS.length];
  let plant = '';
  if (stage === 0) plant = `<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${st(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${st(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${st(1.5)}/>`;
  if (stage === 1) plant = `<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${st(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${st(2)}/>`;
  if (stage === 2) plant = `<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${p.seed === 'flower' ? `<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${st(2)}/>` : ''}`;
  if (stage === 3) plant = p.seed === 'carrot'
    ? `<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${st(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`
    : `<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${st(2)}/>${[0, 72, 144, 216, 288].map(a => `<circle cx="${35 + Math.cos(a * Math.PI / 180) * 10}" cy="${28 + Math.sin(a * Math.PI / 180) * 10}" r="8" fill="${col}" ${st(2.5)}/>`).join('')}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${st(2)}/>`;
  const drop = p.wet ? '' : `<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${st(2)}/></g>`;
  const sparkle = stage === 3 ? `<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${st(1.5)}/></g>` : '';
  return `<svg viewBox="0 0 70 90">${soil}${plant}${drop}${sparkle}</svg>`;
}
export const wateringCanSVG = `<svg viewBox="0 0 48 48"><path d="M10 18 H32 V40 H10 Z" fill="#74c0fc" ${st(3)}/><path d="M32 24 L44 14" ${st(4)}/><path d="M14 18 Q21 6 28 18" fill="none" ${st(3)}/></svg>`;
export const rainbowIcon = `<svg viewBox="0 0 48 48">${RAINBOW.map((c, i) => `<path d="M${6 + i * 2.6} 38 A${18 - i * 2.6} ${18 - i * 2.6} 0 0 1 ${42 - i * 2.6} 38" fill="none" stroke="${c}" stroke-width="3"/>`).join('')}<path d="M4 38 H44" ${st(3)}/></svg>`;
export const hopOffIcon = `<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${st(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${st(4)}/></svg>`;
export const streetRanchGateSVG = `<svg viewBox="0 0 240 280"><rect x="38" y="110" width="18" height="160" rx="6" fill="#c99366" ${st()}/><rect x="184" y="110" width="18" height="160" rx="6" fill="#c99366" ${st()}/>
  <path d="M30 124 A90 84 0 0 1 210 124" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round"/>${RAINBOW.map((c, i) => `<path d="M30 124 A90 84 0 0 1 210 124" fill="none" stroke="${c}" stroke-width="${32 - i * 5}" stroke-linecap="round"/>`).join('')}
  <rect x="26" y="92" width="188" height="38" rx="13" fill="#fff6e6" ${st(3)}/><text x="120" y="118" text-anchor="middle" font-size="20" font-weight="900" fill="${O}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text>
  <path d="M60 270 V200 H180 V270" fill="none" stroke="#fff6e6" stroke-width="9"/><path d="M60 270 V200 H180 V270" fill="none" ${st(3)}/><path d="M60 226 H180" stroke="#fff6e6" stroke-width="9"/><path d="M60 226 H180" ${st(3)}/>
  <path d="M104 172 H140 M128 160 L142 172 L128 184" fill="none" stroke="${O}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export { ANIMAL_X, HORSE_X, PLOT_X };

/** A windmill for the yard (its sails spin; tap to make it spin faster). viewBox 0 0 200 320. */
export const windmillSVG = `<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${st(4)}/><path d="M78 200 H122 M74 260 H126" ${st(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${st(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${st(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0, 90, 180, 270].map(a => `<g transform="rotate(${a} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${['#ffd43b', '#74c0fc', '#ff8fab', '#69db7c'][a / 90]}" ${st(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${st(2)}/></g>`).join('')}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${st(3)}/></g></svg>`;

// ---------- the barn interior (BARN_W x 600): wooden walls, hay loft, lanterns, rainbow banner, stalls ----------
export const BARN_ANIMAL_NAMES = ['GOAT', 'SHEEP', 'PIGLET', 'CHICKS', 'BUNNY', 'COW'];
const lantern = (x: number) => `<g class="lantern" style="transform-origin:${x}px 146px"><path d="M${x} 146 V178" ${st(3)}/><circle cx="${x}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${x - 14} 182 H${x + 14} L${x + 11} 226 H${x - 11} Z" fill="#ffe066" ${st(3)}/><rect x="${x - 17}" y="176" width="34" height="8" rx="3" fill="#495057" ${st(2.5)}/><rect x="${x - 15}" y="224" width="30" height="7" rx="3" fill="#495057" ${st(2.5)}/><ellipse cx="${x}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;
export function barnSceneSVG() {
  const W = BARN_W;
  const planks = Array.from({ length: Math.ceil(W / 64) }, (_, i) => `<path d="M${i * 64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join('');
  const bunting = Array.from({ length: Math.ceil(W / 46) }, (_, i) => { const x = i * 46, y = 160 + Math.sin(i / 3.1) * 8; return `<path d="M${x} ${y} L${x + 40} ${y} L${x + 20} ${y + 30} Z" fill="${RAINBOW[i % 6]}" ${st(2.5)}/>`; }).join('');
  const stalls = BARN_ANIMAL_X.map((x, i) => `<g><rect x="${x - 96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${st(4)}/>
    <path d="M${x - 96} 350 H${x + 96} M${x - 96} 384 H${x + 96} M${x - 96} 412 H${x + 96}" stroke="#d9a074" stroke-width="3"/><path d="M${x - 96} 318 L${x + 96} 440 M${x + 96} 318 L${x - 96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${x - 54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${st(3)}/><text x="${x}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${O}" font-family="Nunito, system-ui, sans-serif">${BARN_ANIMAL_NAMES[i]}</text></g>`).join('');
  return `<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${W} ${RANCH_H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="440" fill="#e8a87c"/>${planks}
  <!-- hay loft -->
  <rect width="${W}" height="128" fill="#c98a5e"/>${Array.from({ length: Math.ceil(W / 64) }, (_, i) => `<path d="M${i * 64 + 32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join('')}
  ${[120, 260, 420, 980, 1130, 1290, 1640, 1790].map((x, i) => hay(x, 126, i % 3 === 1 ? .72 : .85)).join('')}${[190, 1060, 1720].map(x => hay(x, 82, .7)).join('')}
  <rect x="0" y="126" width="${W}" height="24" fill="#a8653a" ${st(4)}/>
  ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${120 + i * 280} 150 L${180 + i * 280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120 + i * 280} 150 L${180 + i * 280} 210" ${st(2)}/>`).join('')}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190, 240, 290, 340, 390].map(y => `<path d="M${-22 - (y - 150) * .028} ${y} H${22 + (y - 150) * .028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join('')}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${W / 2} 176 ${W} 160" fill="none" ${st(2)}/>${bunting}
  <g transform="translate(${W / 2 + 60} 236)">${RAINBOW.map((c, i) => `<rect x="${-180 + i * 60}" y="-26" width="60" height="44" fill="${c}"/>`).join('')}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${st(4)}/>
    <path d="M-180 -26 L-200 -4 L-180 18 M180 -26 L200 -4 L180 18" fill="#ff8fab" ${st(3)}/>
    <text x="0" y="6" text-anchor="middle" font-size="26" font-weight="900" fill="#fff" stroke="${O}" stroke-width="5" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- round windows with daylight -->
  ${[440, 1720].map(x => `<circle cx="${x}" cy="236" r="34" fill="#c7e8ff" ${st(4)}/><path d="M${x - 34} 236 H${x + 34} M${x} 202 V270" ${st(3)}/>`).join('')}
  ${stalls}
  <!-- the big door (back outside) -->
  <rect x="24" y="200" width="206" height="244" rx="10" fill="#b5703f" ${st(4)}/>
  <rect x="38" y="214" width="178" height="230" fill="#c7e8ff"/><path d="M38 360 Q120 330 216 352 V444 H38 Z" fill="#a6e3a0"/><circle cx="180" cy="250" r="16" fill="#ffe066"/>
  <path d="M38 214 H216 V444 M38 214 V444" fill="none" ${st(4)}/>
  <!-- straw floor -->
  <rect x="0" y="438" width="${W}" height="162" fill="#f2d58a"/><path d="M0 440 H${W}" ${st(4)}/>
  ${Array.from({ length: 70 }, (_, i) => { const x = (i * 137) % W, y = 470 + (i * 53) % 120; return `<path d="M${x} ${y} l${14 + (i % 3) * 4} ${i % 2 ? -4 : 4}" stroke="#d9a93f" stroke-width="3" stroke-linecap="round"/>`; }).join('')}
  <!-- feed station -->
  <g transform="translate(356 0)"><rect x="-70" y="456" width="140" height="34" rx="12" fill="#fff6e6" ${st(3)}/><text x="0" y="480" text-anchor="middle" font-size="16" font-weight="900" fill="${O}" font-family="Nunito, system-ui, sans-serif">FOOD 🥕🍎🌾</text></g>
  ${hay(1790, 590, .8)}${hay(1700, 600, .65)}
  ${[290, 660, 1330, 1590].map(lantern).join('')}
  </svg>`;
}
