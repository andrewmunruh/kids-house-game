// Code-drawn costume overlays in the chibi's own vector style (200x320 canvas).
// Pieces ride the same limb / hip / head groups as the clothes, so every pose lines up.
import { S, f, limb, SHOULDER, HAND, type Pose } from './geom';
import { HELPER_COLORS, type CostumeId } from '../shared/costume';
import { hairRise } from './wardrobe';

const INK = 'var(--line)';
const SHEET = '#f7f3ee';
const PJ = '#3d3150';
const BONE = '#f7f1e8';
const WITCH = '#4a2f5e';
const CAT = '#2f2433';

export interface CostumeParts {
  /** Behind the body (tail, cape). In hip space. */
  back: string;
  /** Over the clothes, under the face. Already wrapped for pose. */
  over: string;
  /** Head pieces above hair and extras. Head space (caller wraps). */
  head: string;
  /** Sleeve color for the cradling arm, if the costume has sleeves. */
  sleeve: string | null;
  /** The costume drapes over her arms (ghost sheet): arms stay under it. */
  coversArms?: boolean;
}

function tube(d: string, color: string, w: number): string {
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${f(w + 7)}" stroke-linecap="round"/>`
    + `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
}

function sleeveD(side: 'l' | 'r'): string {
  const [sx, sy] = SHOULDER[side];
  const [hx, hy] = HAND[side];
  const m = side === 'l' ? -1 : 1;
  const mx = (sx + hx) / 2 + 6 * m;
  return `M${sx - 2 * m} ${sy - 2} Q${mx} ${(sy + hy) / 2 - 6} ${hx - m} ${hy - 16}`;
}

/** Long sleeve on the arm. Same class as wardrobe sleeves: it hides while cradling and keeps the SVG pose. */
function sleeves(color: string, pose: Pose, extra?: (side: 'l' | 'r') => string): string {
  return (['l', 'r'] as const).map(side => {
    const inner = tube(sleeveD(side), color, 21) + (extra ? extra(side) : '');
    return limb('arm', side, inner, pose).replace('class="arm ', 'class="arm sleeve ');
  }).join('');
}

/** Pant leg inside the .leg group, so riding hides it and sit swings it. */
function legs(color: string, pose: Pose, extra?: (side: 'l' | 'r', x: number) => string): string {
  return (['l', 'r'] as const).map(side => {
    const m = side === 'l' ? -1 : 1;
    const x = side === 'l' ? 88 : 112;
    const inner = tube(`M${x} 238 L${x + m} 280`, color, 24) + (extra ? extra(side, x) : '');
    return limb('leg', side, inner, pose);
  }).join('');
}

const TORSO = 'M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z';

function wrapHip(inner: string, pose: Pose): string {
  return pose.hip ? `<g transform="rotate(${f(pose.hip)} 100 238)">${inner}</g>` : inner;
}

function helper(color: string, pose: Pose): CostumeParts {
  const shirt = '#ffd166';
  const top = `<path d="${TORSO}" fill="${shirt}" ${S(3)}/>`;
  const bib = `<path d="M78 188 H122 V232 H78 Z" fill="${color}" ${S(2.8)}/>`
    + `<path d="M88 200 H112 V216 Q100 220 88 216 Z" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".3" stroke-linejoin="round"/>`
    + `<path d="M74 166 L82 190 M126 166 L118 190" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M74 166 L82 190 M126 166 L118 190" stroke="${color}" stroke-width="5.5" stroke-linecap="round"/>`
    + `<circle cx="82" cy="192" r="4" fill="#c9ced6" ${S(1.6)}/><circle cx="118" cy="192" r="4" fill="#c9ced6" ${S(1.6)}/>`;
  const shorts = `<path d="M66 228 H134 L136 248 Q100 256 64 248 Z" fill="${color}" ${S(3)}/>`;
  const sl = sleeves(shirt, pose, side => {
    const [hx, hy] = HAND[side];
    return `<path d="M${hx - 9} ${hy - 12} h18" stroke="#3a1d3c" stroke-width="2" opacity=".25" stroke-linecap="round"/>`;
  });
  const lg = legs(color, pose, (_s, x) => `<path d="M${x - 11} 276 h22" stroke="#3a1d3c" stroke-width="2.4" opacity=".25" stroke-linecap="round"/>`);
  return {
    back: '',
    over: lg + wrapHip(sl + top + shorts + bib, pose),
    head: '',
    sleeve: shirt,
  };
}

function goggles(hair: string): string {
  const y = 70 - Math.min(10, hairRise(hair) / 2);
  const band = `<path d="M38 ${y + 10} Q100 ${y - 8} 162 ${y + 10}" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M38 ${y + 10} Q100 ${y - 8} 162 ${y + 10}" fill="none" stroke="#6b6f7a" stroke-width="7.5" stroke-linecap="round"/>`;
  const lens = (cx: number) => `<circle cx="${cx}" cy="${y}" r="17" fill="#c9ced6" ${S(3)}/><circle cx="${cx}" cy="${y}" r="10.5" fill="#bfe3f2" ${S(2)}/><path d="M${cx - 5} ${y - 4} q3 -4 8 -3" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`;
  return `<g data-costume-part="goggles">${band}${lens(80)}${lens(120)}<path d="M96 ${y} h8" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>`;
}

function witchHat(hair: string): string {
  const brim = 60 - hairRise(hair);
  const tall = Math.max(30, Math.min(56, brim - 4));
  const tipY = brim - tall;
  return `<g data-costume-part="witch-hat">`
    + `<path d="M64 ${brim - 2} Q82 ${brim - tall * 0.45} 92 ${tipY + 8} Q98 ${tipY - 2} 114 ${tipY + 4} Q104 ${tipY + 10} 106 ${tipY + tall * 0.4} L136 ${brim - 2} Z" fill="${WITCH}" ${S(3)}/>`
    + `<path d="M70 ${brim - 10} Q100 ${brim - 16} 130 ${brim - 10} L133 ${brim - 3} Q100 ${brim - 9} 67 ${brim - 3} Z" fill="#ff9f43" ${S(2.2)}/>`
    + `<path d="M24 ${brim + 2} Q100 ${brim - 16} 176 ${brim + 2} Q100 ${brim + 12} 24 ${brim + 2} Z" fill="${WITCH}" ${S(3)}/>`
    + `<path d="M118 ${brim - 24} l2.6 5.4 5.8 .8 -4.2 4 1 5.8 -5.2 -2.8 -5.2 2.8 1 -5.8 -4.2 -4 5.8 -.8 Z" fill="#ffd166" ${S(1.4)}/>`
    + `</g>`;
}

function catEars(hair: string): string {
  const r = hairRise(hair);
  return `<g data-costume-part="cat-ears" transform="translate(0 ${f(-r)})"><path d="M52 66 L64 20 L90 56 Z" fill="${CAT}" ${S(2.8)}/><path d="M110 56 L136 20 L148 66 Z" fill="${CAT}" ${S(2.8)}/><path d="M61 56 L66 34 L80 52 Z" fill="#f4a3c8"/><path d="M120 52 L134 34 L139 56 Z" fill="#f4a3c8"/><path d="M50 72 Q100 46 150 72" fill="none" stroke="${CAT}" stroke-width="6" stroke-linecap="round"/></g>`;
}

function catTail(pose: Pose): string {
  const d = 'M118 232 Q156 240 162 206 Q166 178 182 172';
  return wrapHip(`<g data-costume-part="cat-tail">${tube(d, CAT, 11)}<circle cx="182" cy="172" r="6" fill="${CAT}"/></g>`, pose);
}

function ghost(pose: Pose): CostumeParts {
  // Drape: shoulders to a wavy hem, covering arms and lap. No face on the sheet.
  const xs = [30, 50, 70, 90, 110, 130, 150, 170];
  let wave = '';
  for (let i = xs.length - 1; i > 0; i--) wave += ` Q${xs[i] - 10} ${i % 2 ? 276 : 266} ${xs[i - 1]} 262`;
  const body = `M64 166 Q70 154 100 152 Q130 154 136 166 Q164 196 170 262${wave} Q36 196 64 166 Z`;
  const shade = `<path d="M70 190 Q60 230 58 258 M130 190 Q140 230 142 258 M100 190 V250" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".12" stroke-linecap="round"/>`;
  return {
    back: '',
    over: wrapHip(`<g data-costume-part="ghost-sheet"><path d="${body}" fill="${SHEET}" ${S(3)}/>${shade}</g>`, pose),
    head: '',
    sleeve: SHEET,
    coversArms: true,
  };
}

/** Hood with an open face window, so her own face shows. Head space. */
function ghostHood(hair: string): string {
  const r = Math.min(16, hairRise(hair));
  const top = 30 - r;
  const outer = `M30 112 Q28 ${top} 100 ${top} Q172 ${top} 170 112 Q172 150 150 170 Q100 182 50 170 Q28 150 30 112 Z`;
  const hole = 'M54 116 Q54 76 100 74 Q146 76 146 116 Q146 152 100 156 Q54 152 54 116 Z';
  return `<g data-costume-part="ghost-hood"><path d="${outer} ${hole}" fill="${SHEET}" fill-rule="evenodd" ${S(3)}/><path d="M44 96 Q48 ${top + 26} 84 ${top + 12}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/></g>`;
}

function skeleton(pose: Pose): CostumeParts {
  const top = `<path d="${TORSO}" fill="${PJ}" ${S(3)}/>`;
  const ribs = `<g data-costume-part="ribs" fill="none" stroke="${BONE}" stroke-linecap="round"><path d="M100 172 V226" stroke-width="6"/>`
    + [184, 198, 212].map((y, i) => `<path d="M${80 + i * 2} ${y} Q90 ${y - 5} 100 ${y}  M${120 - i * 2} ${y} Q110 ${y - 5} 100 ${y}" stroke-width="5.5"/>`).join('')
    + `<path d="M86 232 Q100 224 114 232" stroke-width="6"/></g>`;
  const bone = (x0: number, y0: number, x1: number, y1: number) => `<path d="M${f(x0)} ${f(y0)} L${f(x1)} ${f(y1)}" stroke="${BONE}" stroke-width="5" stroke-linecap="round"/><circle cx="${f(x0)}" cy="${f(y0)}" r="4" fill="${BONE}"/><circle cx="${f(x1)}" cy="${f(y1)}" r="4" fill="${BONE}"/>`;
  const sl = sleeves(PJ, pose, side => {
    const [sx, sy] = SHOULDER[side];
    const [hx, hy] = HAND[side];
    return bone(sx + (hx - sx) * 0.2, sy + (hy - sy) * 0.2, sx + (hx - sx) * 0.72, sy + (hy - sy) * 0.72);
  });
  const shorts = `<path d="M66 230 H134 L136 248 Q100 256 64 248 Z" fill="${PJ}" ${S(3)}/>`;
  const lg = legs(PJ, pose, (side, x) => { const m = side === 'l' ? -1 : 1; return bone(x, 246, x + m, 274); });
  return { back: '', over: lg + wrapHip(sl + shorts + top + ribs, pose), head: '', sleeve: PJ };
}

function batCape(pose: Pose): string {
  const wing = (m: number) => {
    const x = (v: number) => f(100 + m * v);
    return `M${x(20)} 166 Q${x(60)} 168 ${x(84)} 186 Q${x(90)} 220 ${x(80)} 256 Q${x(68)} 244 ${x(58)} 256 Q${x(48)} 242 ${x(36)} 254 Q${x(28)} 240 ${x(14)} 250 Z`;
  };
  return wrapHip(`<g data-costume-part="bat-cape"><path d="${wing(-1)}" fill="${WITCH}" ${S(3)}/><path d="${wing(1)}" fill="${WITCH}" ${S(3)}/><path d="M${100 - 60} 190 Q${100 - 56} 220 ${100 - 48} 240 M${100 + 60} 190 Q${100 + 56} 220 ${100 + 48} 240" fill="none" stroke="#fff" stroke-width="2.4" opacity=".18" stroke-linecap="round"/></g>`, pose);
}

function batCollar(pose: Pose): string {
  return wrapHip(`<g data-costume-part="bat-collar"><path d="M78 164 Q72 152 82 146 L92 160 Z M122 164 Q128 152 118 146 L108 160 Z" fill="${WITCH}" ${S(2.4)}/><circle cx="100" cy="166" r="5" fill="#ff9f43" ${S(1.8)}/></g>`, pose);
}

/** Overlay parts for one costume. Empty strings mean nothing to add. */
export function costumeParts(id: CostumeId, pose: Pose, hair: string): CostumeParts {
  const none: CostumeParts = { back: '', over: '', head: '', sleeve: null };
  if (id.indexOf('helper-') === 0) {
    const col = HELPER_COLORS[id.slice(7) as keyof typeof HELPER_COLORS] ?? HELPER_COLORS.yellow;
    return { ...helper(col, pose), head: goggles(hair) };
  }
  if (id === 'witch') return { ...none, head: witchHat(hair) };
  if (id === 'cat') return { ...none, back: catTail(pose), head: catEars(hair) };
  if (id === 'ghost') return { ...ghost(pose), head: ghostHood(hair) };
  if (id === 'skeleton') return skeleton(pose);
  if (id === 'bat') return { ...none, back: batCape(pose), over: batCollar(pose) };
  return none;
}
