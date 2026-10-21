// Clothes, shoes, and extras. Pants live in .leg groups so riding hides them.
// Skirts, tutus, and dresses stay outside .leg so they sit on the saddle.
import type { Look2 } from '../shared/avatar';
import { S, SH, bumps, scallop, f, limb, type Pose, SHOULDER, HAND } from './geom';

type Look = Required<Look2>;
const L = 'var(--line)';

/** Sit swings the legs out. Skirts, tutus, dresses, and overalls then drape the lap instead of following a leg. */
function wideLegs(pose: Pose): boolean {
  return Math.abs(pose.legL) >= 40 || Math.abs(pose.legR) >= 40;
}

function shade(shape: string, u: string, rich: boolean, folds: string[] = []): string {
  const lines = folds.map(d => `<path d="${d}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`).join('');
  return (rich ? `<path d="${shape}" fill="url(#${u}c)"/>` : '') + lines;
}

/** Outlined round sleeve, one stroke, so the arm outline does not show beside it. */
function clothTube(d: string, color: string, w: number): string {
  const outer = (w + 7).toFixed(1);
  return `<path d="${d}" fill="none" stroke="${L}" stroke-width="${outer}" stroke-linecap="round"/>`
    + `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
}

function sleeve(side: 'l' | 'r', inner: string, pose: Pose): string {
  return limb('arm', side, inner, pose);
}

function shortSleeve(side: 'l' | 'r', pose: Pose, trim = false): string {
  const [sx, sy] = SHOULDER[side];
  const m = side === 'l' ? -1 : 1;
  let sl = clothTube(`M${sx} ${sy} L${sx + 7 * m} ${sy + 20}`, 'var(--top)', 22);
  if (trim) sl += `<path d="M${sx + 7 * m - 12} ${sy + 17} H${sx + 7 * m + 12}" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round" opacity=".9" transform="rotate(${-18 * m} ${sx + 7 * m} ${sy + 17})"/>`;
  return sleeve(side, sl, pose);
}

function longSleeve(side: 'l' | 'r', pose: Pose, cuff = true): string {
  const [sx, sy] = SHOULDER[side];
  const [hx, hy] = HAND[side];
  const m = side === 'l' ? -1 : 1;
  const mx = (sx + hx) / 2 + 6 * m;
  let sl = clothTube(`M${sx - 2 * m} ${sy - 2} Q${mx} ${(sy + hy) / 2 - 6} ${hx - m} ${hy - 16}`, 'var(--top)', 21);
  if (cuff) sl += clothTube(`M${hx - 3 * m} ${hy - 17} L${hx - m} ${hy - 13}`, 'var(--top-trim)', 20);
  return sleeve(side, sl, pose);
}

function puffSleeve(side: 'l' | 'r', pose: Pose, frill = false): string {
  const [sx, sy] = SHOULDER[side];
  const m = side === 'l' ? -1 : 1;
  const cx = sx + 4 * m, cy = sy + 8;
  let sl = `<path d="${bumps(cx, cy, 13, 9, 3.2)}" fill="var(--top)" ${S(2.8)}/>`;
  sl += `<ellipse cx="${cx - 4 * m}" cy="${cy - 5}" rx="5" ry="3" fill="#fff" opacity=".45"/>`;
  if (frill) sl += `<path d="M${cx - 11} ${cy + 13} ${scallop(cx - 11, cx + 11, cy + 13, 4, 3)}" fill="none" stroke="#fff" stroke-width="2.4"/>`;
  return sleeve(side, sl, pose);
}

function both(fn: (side: 'l' | 'r', pose: Pose) => string, pose: Pose): string {
  return fn('l', pose) + fn('r', pose);
}

const TORSO = 'M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 228 Q100 236 64 228 Z';

function shirtOpen(pose: Pose, body: string, sleeves: string, u: string, rich: boolean, hem: number, extra = '', folds: string[] = [], sleevesOnTop = false): string {
  const cloth = `<path d="${body}" fill="var(--top)" ${S(3)}/>${shade(body, u, rich, folds)}${extra}`;
  return `<g class="shirt" data-hem="${hem}">${sleevesOnTop ? cloth + sleeves : sleeves + cloth}</g>`;
}

export function topLayer(pose: Pose, look: Look, u: string, rich: boolean, hem: number): string {
  if (look.dress) return '';
  const st = look.top;
  if (st === 'hoodie') {
    const body = 'M66 168 Q72 158 92 158 H108 Q128 158 134 168 L139 230 Q100 240 61 230 Z';
    const extra = `<path d="M120 162 Q132 164 134 170 L139 230 Q128 233 123 233 Z" ${SH}/>`
      + `<path d="M72 172 Q76 164 86 163" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".38"/>`
      + `<path d="M78 159 Q100 182 122 159 Q120 152 100 152 Q80 152 78 159 Z" fill="var(--top-trim)" ${S(2.8)}/>`
      + `<path d="M92 172 v18 M108 172 v18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`
      + `<circle cx="92" cy="191" r="2.6" fill="#fff" ${S(1.8)}/><circle cx="108" cy="191" r="2.6" fill="#fff" ${S(1.8)}/>`
      + `<path d="M78 202 H122 L127 222 H73 Z" fill="var(--top)" ${S(2.6)}/><path d="M78 202 H122 L124 210 H76 Z" ${SH}/>`
      + `<path d="M61 226 Q100 236 139 226 L139 234 Q100 244 61 234 Z" fill="var(--top-trim)" ${S(2.8)}/>`;
    return shirtOpen(pose, body, both(longSleeve, pose), u, rich, hem, extra, ['M74 196 q-2 12 2 22', 'M126 190 q2 14 0 26']);
  }
  if (st === 'stripes' || st === 'jersey') {
    const body = 'M68 168 Q74 158 92 158 H108 Q126 158 132 168 L135 232 Q100 238 65 232 Z';
    const cid = `${u}st`;
    const stripes = st === 'jersey'
      ? `<path d="M70 176 H130 L128 188 H72 Z" fill="var(--top-trim)"/><path d="M68 210 H132 L130 222 H70 Z" fill="var(--top-trim)"/>`
      : [166, 179, 192, 205, 218, 231].map(y => `<rect x="60" y="${y}" width="80" height="6" fill="var(--top-trim)"/>`).join('');
    const neck = st === 'jersey'
      ? `<path d="M86 160 L100 176 L114 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>`
      : `<path d="M84 159 Q100 172 116 159" fill="none" stroke="var(--top-trim)" stroke-width="5"/>`;
    const graded = rich ? `<path d="${body}" fill="url(#${u}c)"/>` : '';
    const folds = `<path d="M78 198 q-2 12 1 24" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/><path d="M122 190 q2 14 0 28" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`;
    return `<g class="shirt" data-hem="${hem}"><defs><clipPath id="${cid}"><path d="${body}"/></clipPath></defs>${both(s => shortSleeve(s, pose, true), pose)}<path d="${body}" fill="var(--top)"/><g clip-path="url(#${cid})">${graded}<path d="M118 160 L135 168 L138 236 H120 Z" ${SH}/>${stripes}</g><path d="${body}" fill="none" ${S(3)}/>${neck}${folds}</g>`;
  }
  if (st === 'sweater' || st === 'cardigan') {
    const body = st === 'cardigan'
      ? 'M68 168 Q74 158 92 158 H108 Q126 158 132 168 L134 232 H108 L100 210 L92 232 H66 Z'
      : 'M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 234 Q100 242 64 234 Z';
    const rib = `<path d="M118 166 L134 174 L136 230 Q120 236 112 228 Z" ${SH}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M64 226 Q100 236 136 226" fill="none" stroke="var(--top-trim)" stroke-width="6" stroke-linecap="round"/>`;
    const buttons = st === 'cardigan' ? [186, 202, 218].map(y => `<circle cx="100" cy="${y}" r="2.4" fill="var(--top-trim)" ${S(1.4)}/>`).join('') : '';
    return shirtOpen(pose, body, both(longSleeve, pose), u, rich, hem, rib + buttons, ['M80 190 q-2 16 0 28', 'M120 188 q2 16 0 30']);
  }
  if (st === 'tank' || st === 'bib') {
    const body = st === 'bib'
      ? 'M78 168 H122 L126 228 H74 Z'
      : 'M78 168 Q86 160 96 164 H104 Q114 160 122 168 L128 226 H72 Z';
    const wedge = `<path d="M110 172 H126 L128 226 H114 Z" ${SH}/><path d="M82 176 Q84 168 92 166" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".35"/>`;
    const extra = st === 'bib'
      ? `${wedge}<path d="M86 150 L78 168 M114 150 L122 168" stroke="${L}" stroke-width="8" stroke-linecap="round"/><path d="M86 150 L78 168 M114 150 L122 168" stroke="var(--top)" stroke-width="4.5" stroke-linecap="round"/><rect x="90" y="176" width="20" height="16" rx="3" fill="var(--top-trim)" ${S(1.6)}/>`
      : `${wedge}<path d="M84 166 Q100 176 116 166" fill="none" stroke="var(--top-trim)" stroke-width="4"/>`;
    return shirtOpen(pose, body, '', u, rich, hem, extra, ['M88 190 q2 14 0 24']);
  }
  if (st === 'puff' || st === 'ruffle') {
    const body = 'M70 168 Q76 158 92 158 H108 Q124 158 130 168 L132 222 H68 Z';
    const bow = `<path d="M100 172 l-8 -5 v10 z M100 172 l8 -5 v10 z" fill="var(--top-trim)" ${S(1.8)}/><path d="M97 174 l-4 10 M103 174 l4 10" stroke="var(--top-trim)" stroke-width="2.6" stroke-linecap="round"/>`;
    const extra = (st === 'ruffle'
      ? `<path d="M68 166 Q74 178 82 166 Q90 180 100 166 Q110 180 118 166 Q126 180 132 166" fill="var(--top-trim)" ${S(2)}/>`
      : bow)
      + `<path d="M118 162 Q128 164 130 170 L132 222 H120 Z" ${SH}/>`
      + `<path d="M74 176 Q76 168 84 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;
    return shirtOpen(pose, body, both(puffSleeve, pose), u, rich, hem, extra, ['M86 190 q2 10 0 20', 'M116 188 q-2 12 0 22'], true);
  }
  if (st === 'button') {
    const body = TORSO;
    const buttons = [180, 196, 212].map(y => `<circle cx="100" cy="${y}" r="2.6" fill="#fff" ${S(1.6)}/>`).join('');
    const extra = `<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${SH}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M100 164 V226" stroke="#fff" stroke-width="2" opacity=".7"/>${buttons}<path d="M82 160 Q100 172 118 160" fill="var(--top)" ${S(2.2)}/>`;
    return shirtOpen(pose, body, both(s => shortSleeve(s, pose, false), pose), u, rich, hem, extra, ['M78 196 q-1 12 2 20']);
  }
  if (st === 'raincoat') {
    const body = 'M62 168 Q70 156 92 156 H108 Q130 156 138 168 L146 240 Q100 252 54 240 Z';
    const extra = `<path d="M120 164 L142 176 L146 236 Q124 244 116 232 Z" ${SH}/><path d="M72 176 Q76 166 88 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M70 156 Q100 176 130 156" fill="none" stroke="var(--top-trim)" stroke-width="6"/><circle cx="100" cy="196" r="4" fill="var(--top-trim)" ${S(1.8)}/><path d="M78 214 H122" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round"/>`;
    return shirtOpen(pose, body, both(longSleeve, pose), u, rich, hem, extra, ['M76 190 q-4 18 -2 36', 'M124 188 q4 18 2 36']);
  }
  const body = TORSO;
  const extra = `<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${SH}/>`
    + `<path d="M84 160 Q100 172 116 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>`
    + `<path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;
  return shirtOpen(pose, body, both(s => shortSleeve(s, pose, false), pose), u, rich, hem, extra, ['M78 196 q-2 12 1 22', 'M122 194 q2 14 -1 24']);
}

function legWear(side: 'l' | 'r', pose: Pose, y1: number, u: string, rich: boolean, cuff = false, wide = 16): string {
  const x = side === 'l' ? 88 : 112;
  const m = side === 'l' ? -1 : 1;
  const d = `M${x - wide / 2} 226 Q${x - wide / 2 + m} ${y1 - 20} ${x - wide / 2 + 2 * m} ${y1} H${x + wide / 2} Q${x + wide / 2} ${y1 - 30} ${x + wide / 2 - m} 226 Z`;
  let p = `<path d="${d}" fill="var(--bottom)" ${S(2.8)}/>`;
  p += shade(d, u, rich, [`M${x - 4 * m} 240 Q${x} ${(226 + y1) / 2} ${x + 3 * m} ${y1 - 14}`]);
  if (side === 'r') p += `<path d="M${x + 1} 230 H${x + wide / 2} L${x + wide / 2} ${y1} H${x + 4} Z" ${SH}/>`;
  else p += `<path d="M${x - 2} 238 Q${x - 6} ${(226 + y1) / 2} ${x - 2} ${y1 - 10}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".3"/>`;
  if (cuff) p += `<path d="M${x - wide / 2 - 1} ${y1 - 8} H${x + wide / 2 + 1} V${y1 + 1} H${x - wide / 2 - 1} Z" fill="var(--bottom-trim)" ${S(2)}/>`;
  return limb('leg', side, p, pose);
}

export function bottomLayer(pose: Pose, look: Look, u: string, rich: boolean): string {
  if (look.dress) return '<g data-layer="bottom"></g>';
  const st = look.bottom;
  if (wideLegs(pose) && (st === 'skirt' || st === 'tutu' || st === 'overalls')) {
    const d = st === 'tutu' ? 'M52 216 H148 L160 248 Q100 260 40 248 Z' : 'M62 218 H138 L152 252 Q100 264 48 252 Z';
    return `<g data-layer="bottom"><path class="skirt" d="${d}" fill="var(--bottom)" ${S(3)}/></g>`;
  }
  if (st === 'skirt') {
    const d = 'M68 222 H132 L146 262 Q100 274 54 262 Z';
    return `<g data-layer="bottom"><path class="skirt" d="${d}" fill="var(--bottom)" ${S(3)}/>${shade(d, u, rich, ['M82 234 L76 258', 'M100 232 V266', 'M118 234 L126 258'])}<path d="M114 224 H132 L146 262 Q130 268 118 266 Z" ${SH}/><path d="M72 228 Q66 246 64 258" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".3"/><path d="M84 236 v10 M116 236 v10" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/></g>`;
  }
  if (st === 'tutu') return '<g data-layer="bottom"></g>';
  if (st === 'overalls') {
    const d = 'M66 220 H134 L139 264 H106 L100 254 L94 264 H61 Z';
    return `<g data-layer="bottom"><g class="leg" style="transform-box:view-box;transform-origin:100px 238px"><path d="${d}" fill="var(--bottom)" ${S(3)}/>${shade(d, u, rich, ['M78 232 Q74 248 72 260', 'M122 230 Q128 248 132 260'])}<path d="M118 222 H134 L139 264 H122 Z" ${SH}/><path d="M64 258 H95 M105 258 H138" stroke="var(--bottom-trim)" stroke-width="4"/></g></g>`;
  }
  const shorts = st === 'shorts';
  const y1 = shorts ? 256 : 292;
  const cuff = st === 'joggers' || st === 'jeans';
  const wide = st === 'leggings' ? 12 : st === 'shorts' ? 18 : 16;
  const legs = legWear('l', pose, y1, u, rich, cuff, wide) + legWear('r', pose, y1, u, rich, cuff, wide);
  const stitch = st === 'jeans' ? `<path d="M88 232 V286 M112 232 V286" stroke="#c9a24a" stroke-width="1.4" stroke-dasharray="2 3" opacity=".7"/>` : '';
  const waist = `<path d="M70 220 H130 V230 H70 Z" fill="var(--bottom)" ${S(2.4)}/>`;
  return `<g data-layer="bottom">${waist}${legs}${stitch}</g>`;
}

export function bottomOverLayer(pose: Pose, look: Look, u: string, rich: boolean): string {
  if (look.dress) return '<g data-layer="bottom-over"></g>';
  const st = look.bottom;
  if (st === 'overalls') {
    const bib = 'M78 180 H122 L124 228 H76 Z';
    return `<g data-layer="bottom-over"><path d="M80 176 L72 164 M120 176 L128 164" stroke="${L}" stroke-width="12" stroke-linecap="round"/><path d="M80 176 L72 164 M120 176 L128 164" stroke="var(--bottom)" stroke-width="7.5" stroke-linecap="round"/><path d="${bib}" fill="var(--bottom)" ${S(3)}/>${shade(bib, u, rich, ['M86 200 q14 6 28 0'])}<path d="M88 190 H112 V206 Q100 212 88 206 Z" fill="var(--bottom-trim)" ${S(2.4)}/><circle cx="82" cy="186" r="3.6" fill="#fff" ${S(2)}/><circle cx="118" cy="186" r="3.6" fill="#fff" ${S(2)}/><path d="M66 222 H134 L135 230 H65 Z" fill="var(--bottom)" ${S(3)}/><path d="M108 180 H122 L124 228 H110 Z" ${SH}/><path d="M82 182 v12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></g>`;
  }
  if (st === 'tutu') {
    if (wideLegs(pose)) {
      const d = 'M58 220 H142 L154 246 Q100 256 46 246 Z';
      return `<g data-layer="bottom-over"><path class="skirt" d="${d}" fill="var(--bottom)" ${S(2.4)}/></g>`;
    }
    let tiers = '';
    const rows: [number, number, number, number][] = [[266, 50, 150, 8], [256, 56, 144, 7], [246, 64, 136, 6]];
    for (let i = 0; i < rows.length; i++) {
      const [y, x0, x1, depth] = rows[i];
      const d = `M${x0 + 8} ${y - 22} H${x1 - 8} L${x1} ${y} ${scallop(x1, x0, y, 6, depth)} Z`;
      tiers += `<path class="skirt" d="${d}" fill="var(--bottom)" ${S(2.4)}/>`;
      tiers += `<path d="M${x1 - 20} ${y - 16} L${x1 - 6} ${y - 2}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".2"/>`;
    }
    const band = 'M66 214 H134 V224 H66 Z';
    return `<g data-layer="bottom-over">${tiers}<path d="${band}" fill="var(--bottom-trim)" ${S(2.6)}/>${shade(band, u, rich)}</g>`;
  }
  return '<g data-layer="bottom-over"></g>';
}

function heart(x: number, y: number): string {
  return `<path d="M${x} ${y + 2} c-3 -5 -9 -1 -5 3 l5 4 l5 -4 c4 -4 -2 -8 -5 -3z" fill="var(--top-trim)" opacity=".85"/>`;
}

export function dressLayer(pose: Pose, look: Look, u: string, rich: boolean, hem: number): string {
  const d = look.dress;
  if (!d) return '';
  const cid = `${u}dr`;
  let skirt = 'M72 210 H128 L150 268 Q100 282 50 268 Z';
  let bodice = 'M72 168 Q78 158 94 158 H106 Q122 158 128 168 L130 214 H70 Z';
  let extra = '';
  let sleeves = both(s => puffSleeve(s, pose, true), pose);
  let puffOnTop = true;
  if (d === 'sundress') {
    skirt = 'M76 214 H124 L140 266 Q100 276 60 266 Z';
    extra = `<path d="M78 166 Q100 180 122 166" fill="none" stroke="var(--top-trim)" stroke-width="5"/>`;
    sleeves = '';
    puffOnTop = false;
  } else if (d === 'party') {
    const hearts = [[64, 236], [86, 228], [108, 234], [130, 242], [76, 254], [100, 250], [122, 258], [92, 188]].map(([x, y]) => heart(x, y)).join('');
    extra = hearts + `<path d="M100 214 l-10 -6 v12 z M100 214 l10 -6 v12 z" fill="var(--top-trim)" ${S(1.8)}/><path d="M52 262 Q100 276 148 262" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 5" opacity=".85"/>`;
  } else if (d === 'pinafore') {
    bodice = 'M80 176 H120 L122 214 H78 Z';
    extra = `<path d="M86 158 L80 178 M114 158 L120 178" stroke="var(--top)" stroke-width="5" stroke-linecap="round"/>`;
    sleeves = '';
    puffOnTop = false;
    skirt = 'M74 212 H126 L142 264 Q100 274 58 264 Z';
  } else if (d === 'jumper') {
    extra = `<path d="M84 160 Q100 174 116 160" fill="var(--top-trim)" ${S(2)}/>`;
    sleeves = both(s => shortSleeve(s, pose, true), pose);
    puffOnTop = false;
  } else if (d === 'ballet') {
    skirt = 'M78 214 H122 L132 250 Q100 258 68 250 Z';
    extra = `<path d="M70 248 ${scallop(70, 130, 248, 5, 5)}" fill="none" stroke="#fff" stroke-width="2"/>`;
    sleeves = both(puffSleeve, pose);
  } else if (d === 'nightgown') {
    skirt = 'M80 214 H120 L132 270 Q100 278 68 270 Z';
    extra = `<path d="M88 164 Q100 176 112 164" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`;
    sleeves = both(longSleeve, pose);
    puffOnTop = false;
  } else if (d === 'raindress') {
    skirt = 'M70 212 H130 L148 268 Q100 280 52 268 Z';
    extra = `<path d="M76 168 Q100 186 124 168" fill="none" stroke="var(--top-trim)" stroke-width="5"/><circle cx="100" cy="198" r="3.4" fill="var(--top-trim)"/>`;
    sleeves = both(longSleeve, pose);
    puffOnTop = false;
  } else {
    skirt = 'M70 214 H130 L152 266 Q100 280 48 266 Z';
    bodice = 'M70 168 Q76 158 92 158 H108 Q124 158 130 168 L131 216 H69 Z';
    const hearts = [[66, 236], [86, 228], [110, 232], [132, 240], [76, 254], [100, 248], [124, 258], [56, 260], [144, 262], [96, 266], [84, 182], [114, 190], [100, 200]].map(([x, y]) => heart(x, y)).join('');
    extra = hearts
      + `<path d="M112 214 H130 L152 266 Q138 271 128 272 Z" ${SH}/>`
      + `<path d="M118 162 L130 168 L131 216 H120 Z" ${SH}/>`
      + `<path d="M50 262 Q100 276 150 262" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9"/>`
      + `<path d="M60 226 Q56 244 54 258" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/>`
      + `<path d="M68 210 H132 V220 H68 Z" fill="var(--top-trim)" ${S(2.6)}/>`
      + `<path d="M100 215 l-13 -8 v16 z M100 215 l13 -8 v16 z" fill="var(--top-trim)" ${S(2.2)}/><circle cx="100" cy="215" r="3.6" fill="var(--top-trim)" ${S(2)}/>`
      + `<path d="M97 218 l-5 14 M103 218 l5 14" stroke="var(--top-trim)" stroke-width="3" stroke-linecap="round"/>`
      + `<path d="M80 158 Q78 172 94 170 Q99 166 100 162 Q101 166 106 170 Q122 172 120 158 Q100 164 80 158 Z" fill="#fff" ${S(2.4)}/>`;
  }
  if (wideLegs(pose)) skirt = 'M68 214 H132 L150 250 Q100 262 50 250 Z';
  const clip = `${skirt} ${bodice}`;
  const cloth = `<path class="skirt" d="${skirt}" fill="var(--top)" ${S(3)}/><path d="${bodice}" fill="var(--top)" ${S(3)}/><g clip-path="url(#${cid})">${shade(clip, u, rich, ['M80 226 Q74 248 70 266', 'M120 226 Q126 248 130 266'])}${extra}</g>`;
  return `<g class="shirt" data-hem="${hem}"><defs><clipPath id="${cid}"><path d="${clip}"/></clipPath></defs>${puffOnTop ? cloth + sleeves : sleeves + cloth}</g>`;
}

function shoeOne(side: 'l' | 'r', pose: Pose, inner: string, x: number): string {
  const body = side === 'l' ? `<g transform="translate(${2 * x} 0) scale(-1 1)">${inner}</g>` : inner;
  return limb('leg', side, body, pose);
}

export function shoesLayer(pose: Pose, look: Look): string {
  const st = look.shoes;
  let out = '';
  for (const side of ['l', 'r'] as const) {
    const x = side === 'l' ? 87 : 113;
    let p = '';
    if (st === 'sneakers' || st === 'lightup') {
      const dots = st === 'lightup' ? `<circle cx="${x - 4}" cy="292" r="2.2" fill="#ff8fab"/><circle cx="${x + 4}" cy="296" r="2.2" fill="#8ecae6"/><circle cx="${x}" cy="300" r="2" fill="#ffd166"/>` : '';
      p = `<path d="M${x} 270 V286" fill="none" stroke="var(--sock)" stroke-width="16" stroke-linecap="round"/>`
        + `<path d="M${x - 14} 296 Q${x - 14} 284 ${x} 284 Q${x + 14} 284 ${x + 16} 296 Q${x + 22} 298 ${x + 22} 304 Q${x + 22} 310 ${x + 12} 310 H${x - 14} Q${x - 18} 310 ${x - 16} 302 Z" fill="var(--shoe)" ${S(2.8)}/>`
        + `<path d="M${x - 12} 304 H${x + 18}" stroke="var(--shoe-trim)" stroke-width="3.5" stroke-linecap="round"/>`
        + `<path d="M${x - 6} 290 l5 2 M${x - 6} 295 l6 2" stroke="${L}" stroke-width="1.8" stroke-linecap="round"/>${dots}`;
    } else if (st === 'boots' || st === 'rainboots') {
      const y0 = st === 'rainboots' ? 248 : 258;
      const dots = st === 'boots'
        ? [[-6, 272], [5, 268], [-2, 284], [7, 290], [-8, 294]].map(([dx, y]) => `<circle cx="${x + dx}" cy="${y}" r="2.6" fill="#fff" opacity=".9"/>`).join('')
        : '';
      p = `<path d="M${x - 14} ${y0} H${x + 14} V296 Q${x + 22} 298 ${x + 22} 304 Q${x + 22} 310 ${x + 10} 310 H${x - 14} Q${x - 18} 310 ${x - 16} 302 Z" fill="var(--shoe)" ${S(2.8)}/>`
        + `<path d="M${x - 16} ${y0 - 4} H${x + 16} V${y0 + 8} H${x - 16} Z" fill="var(--shoe)" ${S(2.6)}/>`
        + dots
        + (st === 'rainboots'
          ? `<path d="M${x - 12} ${y0 + 16} H${x + 12}" stroke="var(--shoe-trim)" stroke-width="4" stroke-linecap="round"/>`
          : `<path d="M${x - 6} ${y0 + 14} V292" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".45"/>`);
    } else if (st === 'maryjanes') {
      p = `<path d="M${x} 266 V290" fill="none" stroke="var(--sock)" stroke-width="15" stroke-linecap="round"/>`
        + `<path d="M${x - 12} 274 ${scallop(x - 12, x + 12, 274, 4, 4)} L${x + 12} 268 H${x - 12} Z" fill="var(--sock)" ${S(2)}/>`
        + `<path d="M${x - 13} 298 Q${x - 13} 290 ${x} 290 Q${x + 13} 290 ${x + 14} 298 Q${x + 20} 300 ${x + 20} 304 Q${x + 20} 309 ${x + 8} 309 H${x - 12} Q${x - 16} 309 ${x - 14} 302 Z" fill="var(--shoe)" ${S(2.8)}/>`
        + `<path d="M${x - 10} 294 H${x + 12}" stroke="${L}" stroke-width="2"/><circle cx="${x + 8}" cy="294" r="2.2" fill="var(--acc)"/>`;
    } else if (st === 'sandals') {
      p = `<path d="M${x - 12} 298 Q${x - 12} 286 ${x} 286 Q${x + 12} 286 ${x + 14} 296 Q${x + 18} 298 ${x + 18} 302 Q${x + 18} 306 ${x + 8} 306 H${x - 12} Q${x - 16} 306 ${x - 14} 300 Z" fill="var(--skin)" ${S(2.4)}/>`
        + `<path d="M${x - 14} 304 H${x + 18}" stroke="var(--shoe)" stroke-width="5" stroke-linecap="round"/>`
        + `<path d="M${x - 8} 292 H${x + 10} M${x + 2} 300 L${x + 8} 290" stroke="var(--shoe)" stroke-width="4" stroke-linecap="round"/>`
        + `<circle cx="${x + 2}" cy="293" r="3" fill="var(--shoe-trim)" ${S(1.4)}/>`;
    } else if (st === 'slippers') {
      p = `<path d="M${x - 14} 292 Q${x - 14} 280 ${x} 278 Q${x + 16} 280 ${x + 18} 294 Q${x + 22} 296 ${x + 20} 304 H${x - 14} Q${x - 18} 304 ${x - 16} 296 Z" fill="var(--shoe)" ${S(2.8)}/>`
        + `<path d="M${x - 6} 286 q6 -4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`;
    } else {
      p = `<ellipse cx="${x + 2}" cy="304" rx="16" ry="7" fill="var(--shoe)" ${S(2.6)}/>`;
    }
    out += shoeOne(side, pose, p, x);
  }
  return `<g data-layer="shoes">${out}</g>`;
}

const COVER_HAT = new Set(['cap', 'beanie', 'sunhat']);
const PERCH_HAT = new Set(['catears', 'earmuffs']);

/** Pixels this hair rises above a short cut. Hats move up by the same amount. */
export function hairRise(hair: string): number {
  if (hair === 'afro') return 28;
  if (hair === 'topbun') return 20;
  if (hair === 'puffs' || hair === 'coily') return 16;
  if (hair === 'buns' || hair === 'curlybob') return 12;
  if (hair === 'long' || hair === 'wavy' || hair === 'wavybob') return 8;
  return 0;
}

function placeHat(hair: string, id: string, svg: string): string {
  if (!COVER_HAT.has(id) && !PERCH_HAT.has(id)) return svg;
  const rise = hairRise(hair);
  if (!rise) return svg;
  return `<g data-hat="${id}" transform="translate(0 ${f(-rise)})">${svg}</g>`;
}

/** Hide the hair that would poke through a cap, beanie, or sun hat. Empty when no covering hat is on. */
export function hatHairMask(u: string, hair: string, acc: readonly string[]): string {
  let hat = '';
  for (let i = 0; i < acc.length; i++) if (COVER_HAT.has(acc[i])) hat = acc[i];
  if (!hat) return '';
  const rise = hairRise(hair);
  const brim = (hat === 'beanie' ? 58 : hat === 'cap' ? 64 : 62) - rise;
  const y = Math.min(70, brim);
  const rx = hair === 'afro' || hair === 'puffs' || hair === 'coily' ? 92 : 78;
  return `<mask id="${u}hm" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" data-brim="${f(y)}"><rect x="-30" y="-50" width="260" height="420" fill="#fff"/><rect x="${f(100 - rx)}" y="-50" width="${f(rx * 2)}" height="${f(y + 50)}" fill="#000"/></mask>`;
}

function bow(cx: number, cy: number, s: number): string {
  return `<g transform="translate(${cx} ${cy}) scale(${s})"><path d="M0 0 C-8 -14 -30 -14 -28 0 C-30 14 -8 14 0 0 Z" fill="var(--acc)" ${S(2.6)}/><path d="M0 0 C8 -14 30 -14 28 0 C30 14 8 14 0 0 Z" fill="var(--acc)" ${S(2.6)}/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="var(--acc2)" ${S(2.2)}/></g>`;
}

export function accessoryLayer(look: Look): string {
  const parts = look.acc.map(a => {
    if (a === 'glasses') return `<circle cx="76" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="124" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="76" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><circle cx="124" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3.2"/><path d="M58 108 L42 104 M142 108 L158 104" stroke="var(--frame)" stroke-width="3.2" stroke-linecap="round"/>`;
    if (a === 'square') return `<rect x="58" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><rect x="108" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><path d="M92 112 H108" stroke="var(--frame)" stroke-width="3.2"/>`;
    if (a === 'sunnies') return `<path d="M56 104 H94 Q96 122 76 122 Q56 122 56 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M106 104 H144 Q146 122 124 122 Q104 122 106 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3"/>`;
    if (a === 'bow') return bow(100, 78, 0.7);
    if (a === 'bigbow') return bow(100, 70, 1.15);
    if (a === 'headband') return `<path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="${L}" stroke-width="12" stroke-linecap="round"/><path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round"/>${bow(100, 32, 0.85)}`;
    if (a === 'flower') return `<g transform="translate(138 78)">${[0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="0" cy="-8" rx="5" ry="8" fill="var(--acc)" ${S(1.6)} transform="rotate(${a})"/>`).join('')}<circle r="4.5" fill="var(--acc2)" ${S(1.6)}/></g>`;
    if (a === 'cap') return placeHat(look.hair, 'cap', `<path d="M54 64 Q56 20 100 16 Q144 20 146 64 Q128 54 100 56 Q72 54 54 64 Z" fill="var(--acc)" ${S(3)}/><path d="M48 56 Q100 66 152 56 L156 62 Q100 70 44 62 Z" fill="var(--acc)" ${S(3)}/><circle cx="100" cy="18" r="4.5" fill="#fff" ${S(2)}/>`);
    if (a === 'beanie') return placeHat(look.hair, 'beanie', `<path d="M50 66 Q48 14 100 8 Q152 14 150 66 Q128 56 100 58 Q72 56 50 66 Z" fill="var(--acc)" ${S(3)}/><path d="M50 58 H150" stroke="var(--acc2)" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="8" r="7" fill="var(--acc2)" ${S(2.4)}/>`);
    if (a === 'sunhat') return placeHat(look.hair, 'sunhat', `<path d="M66 56 Q68 22 100 18 Q132 22 134 56 Q118 48 100 50 Q82 48 66 56 Z" fill="var(--acc)" ${S(3)}/><path d="M18 56 Q100 68 182 56 Q170 64 100 66 Q30 64 18 56 Z" fill="var(--acc)" ${S(3)}/><path d="M72 46 Q100 38 128 46" fill="none" stroke="var(--acc2)" stroke-width="4"/>`);
    if (a === 'catears') return placeHat(look.hair, 'catears', `<path d="M58 62 L70 18 L86 60 Z" fill="var(--acc)" ${S(2.6)}/><path d="M114 60 L130 18 L142 62 Z" fill="var(--acc)" ${S(2.6)}/><path d="M64 54 L72 30 L80 52 Z" fill="var(--acc2)"/><path d="M120 52 L128 30 L136 54 Z" fill="var(--acc2)"/>`);
    if (a === 'earmuffs') return placeHat(look.hair, 'earmuffs', `<path d="M44 68 Q48 26 100 22 Q152 26 156 68" fill="none" stroke="var(--acc)" stroke-width="6"/><circle cx="34" cy="86" r="14" fill="var(--acc)" ${S(2.8)}/><circle cx="166" cy="86" r="14" fill="var(--acc)" ${S(2.8)}/><circle cx="34" cy="86" r="6" fill="var(--acc2)"/><circle cx="166" cy="86" r="6" fill="var(--acc2)"/>`);
    return '';
  }).join('');
  return `<g data-layer="accessory">${parts}</g>`;
}

export type { Look };
