// Original pet art (side view, facing right) and the house-cat "brain".
// Cat behaviour is computed from the clock + the cat's name, so every iPad looking at the same house
// sees the cat doing the same thing at the same moment without any network traffic.
import type { Cat } from './shared/state';

const O = '#5a3d5c';
const st = `stroke="${O}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;

export const CAT_COATS = [
  { name: 'Tabby', body: '#ffb26b', stripe: '#e8893a', belly: '#ffe3c4' },
  { name: 'Smokey', body: '#b9b6c9', stripe: '#8f8ba3', belly: '#ecebf3' },
  { name: 'Tuxedo', body: '#4f4660', stripe: '', belly: '#ffffff' },
  { name: 'Calico', body: '#fff6ec', stripe: '', belly: '#fff6ec' },
];
export const DOG_BREEDS = [
  { name: 'Pup', body: '#f2d0a4', ear: '#b07d54', snout: '#fbe7cc' },
  { name: 'Poodle', body: '#fff0f6', ear: '#ffc8dd', snout: '#fff7fb' },
  { name: 'Dachshund', body: '#c07a45', ear: '#7d4a26', snout: '#d99a68' },
  { name: 'Golden', body: '#f4b860', ear: '#e09a3e', snout: '#fbd9a0' },
  { name: 'Spotty', body: '#ffffff', ear: '#4a3f52', snout: '#ffffff' },
];

const eyes = (x1: number, x2: number, y: number, closed = false) => closed
  ? `<path d="M${x1 - 3} ${y} q3 3 6 0 M${x2 - 3} ${y} q3 3 6 0" fill="none" ${st} stroke-width="2.5"/>`
  : `<circle cx="${x1}" cy="${y}" r="2.8" fill="${O}"/><circle cx="${x2}" cy="${y}" r="2.8" fill="${O}"/><circle cx="${x1 + .9}" cy="${y - .9}" r=".9" fill="#fff"/><circle cx="${x2 + .9}" cy="${y - .9}" r=".9" fill="#fff"/>`;
const blush = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;

export type CatPose = 'stand' | 'sit' | 'nap';
export function catSVG(coat: number, pose: CatPose = 'stand') {
  const c = CAT_COATS[coat] ?? CAT_COATS[0];
  const earIn = '#ffb3c6';
  const head = (hx: number, hy: number, r: number, closed: boolean) => `
    <path d="M${hx - 13} ${hy - 8} L${hx - 10} ${hy - 25} L${hx - 1} ${hy - 13} Z" fill="${c.body}" ${st}/><path d="M${hx - 10.5} ${hy - 11} L${hx - 9.5} ${hy - 20} L${hx - 4} ${hy - 13} Z" fill="${earIn}"/>
    <path d="M${hx + 1} ${hy - 13} L${hx + 11} ${hy - 26} L${hx + 13} ${hy - 7} Z" fill="${coat === 3 ? '#f4a259' : c.body}" ${st}/><path d="M${hx + 4} ${hy - 13} L${hx + 10} ${hy - 21} L${hx + 11} ${hy - 11} Z" fill="${earIn}"/>
    <circle cx="${hx}" cy="${hy}" r="${r}" fill="${c.body}" ${st}/>
    ${coat === 3 ? `<path d="M${hx + 2} ${hy - r + 1} a${r} ${r} 0 0 1 ${r - 3} ${r - 2} q-6 2 -${r - 3} -${r - 3}z" fill="#f4a259"/>` : ''}
    ${coat === 2 ? `<ellipse cx="${hx + 2}" cy="${hy + 7}" rx="9" ry="7" fill="#fff"/>` : ''}
    ${c.stripe ? `<path d="M${hx - 4} ${hy - r + 2} v5 M${hx + 2} ${hy - r + 1} v6 M${hx + 8} ${hy - r + 3} v4" ${st} stroke="${c.stripe}" stroke-width="2.5"/>` : ''}
    ${eyes(hx - 4, hx + 7, hy, closed)}
    <path d="M${hx + 3} ${hy + 4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${hx + 0.5} ${hy + 6} q2.5 2.5 5 0" fill="none" ${st} stroke-width="2"/>
    ${blush(hx - 8, hy + 5)}${blush(hx + 12, hy + 5)}
    <path d="M${hx + r - 2} ${hy + 3} l9 -2 M${hx + r - 2} ${hy + 6} l9 2" ${st} stroke-width="1.6"/>`;
  if (pose === 'nap') return `<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${O}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${c.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${c.body}" ${st}/>
    ${coat === 3 ? `<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>` : ''}
    ${c.stripe ? `<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${st} stroke="${c.stripe}" stroke-width="3"/>` : ''}
    ${head(90, 76, 15, true)}</g></svg>`;
  if (pose === 'sit') return `<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${O}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${c.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${c.body}" ${st}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${c.belly}"/>
    ${coat === 3 ? `<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>` : ''}
    ${c.stripe ? `<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${st} stroke="${c.stripe}" stroke-width="3"/>` : ''}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${c.body}" ${st}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${c.body}" ${st}/>
    ${coat === 2 ? `<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>` : ''}
    ${head(72, 36, 17, false)}</svg>`;
  return `<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${O}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${c.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${c.body}" ${st}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${c.body}" ${st}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${c.body}" ${st}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${c.belly}"/>
    ${coat === 3 ? `<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>` : ''}
    ${c.stripe ? `<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${st} stroke="${c.stripe}" stroke-width="3"/>` : ''}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${c.body}" ${st}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${c.body}" ${st}/>
    ${coat === 2 ? `<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>` : ''}
    ${head(90, 40, 17, false)}</svg>`;
}

export function dogSVG(breed: number, pose: 'stand' | 'sit' | 'sleep' = 'stand') {
  const b = DOG_BREEDS[breed] ?? DOG_BREEDS[0];
  const sleep = pose === 'sleep';
  const long = breed === 2, poodle = breed === 1, golden = breed === 3, spotty = breed === 4;
  const bodyY = long ? 66 : 58, legTop = long ? 70 : 62, legH = 94 - legTop;
  const hx = long ? 102 : 92, hy = long ? 50 : 40;
  const leg = (x: number, cls: string) => poodle
    ? `<rect class="leg ${cls}" x="${x + 2}" y="${legTop}" width="6" height="${legH}" rx="3" fill="${b.body}" ${st}/><circle class="leg ${cls}" cx="${x + 5}" cy="91" r="6" fill="${b.body}" ${st}/>`
    : `<rect class="leg ${cls}" x="${x}" y="${legTop}" width="10" height="${legH}" rx="5" fill="${b.body}" ${st}/>`;
  const body = poodle
    ? `<circle cx="44" cy="58" r="15" fill="${b.body}" ${st}/><circle cx="70" cy="56" r="17" fill="${b.body}" ${st}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${b.body}"/>`
    : `<ellipse cx="${long ? 62 : 58}" cy="${bodyY}" rx="${long ? 42 : 32}" ry="${long ? 13 : 17}" fill="${b.body}" ${st}/>`;
  const spots = spotty ? `<circle cx="46" cy="54" r="5" fill="${O}"/><circle cx="64" cy="62" r="4" fill="${O}"/><circle cx="72" cy="50" r="3.5" fill="${O}"/><circle cx="38" cy="64" r="3" fill="${O}"/>` : '';
  const tail = poodle ? `<g class="tail"><path d="M30 52 L22 38" ${st}/><circle cx="21" cy="34" r="7" fill="${b.body}" ${st}/></g>`
    : golden ? `<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${b.body}" ${st}/>`
    : `<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${O}" stroke-width="9" stroke-linecap="round"/>`;
  const tailFill = !poodle && !golden ? `<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${b.body}" stroke-width="4.5" stroke-linecap="round"/>` : '';
  const head = `
    ${poodle ? `<circle cx="${hx - 2}" cy="${hy - 16}" r="10" fill="${b.body}" ${st}/>` : ''}
    <circle cx="${hx}" cy="${hy}" r="17" fill="${b.body}" ${st}/>
    ${spotty ? `<circle cx="${hx - 6}" cy="${hy - 8}" r="4" fill="${O}"/>` : ''}
    <ellipse cx="${hx + 13}" cy="${hy + 7}" rx="11" ry="8" fill="${b.snout}" ${st}/>
    <circle cx="${hx + 22}" cy="${hy + 4}" r="4" fill="${O}"/>
    <path d="M${hx + 14} ${hy + 12} q4 3 8 0" fill="none" ${st} stroke-width="2"/>
    ${sleep ? '' : `<path class="tongue" d="M${hx + 16} ${hy + 13} q2 7 6 0" fill="#ff8fab" ${st} stroke-width="2"/>`}
    ${sleep
      ? `<path d="M${hx + 2} ${hy - 4} q3 3 6 0" fill="none" ${st} stroke-width="2.4"/>`
      : `<circle cx="${hx + 5}" cy="${hy - 3}" r="3" fill="${O}"/><circle cx="${hx + 6}" cy="${hy - 4}" r="1" fill="#fff"/>`}
    ${blush(hx + 2, hy + 8)}
    ${poodle ? `<circle cx="${hx - 9}" cy="${hy + 8}" r="9" fill="${b.ear}" ${st}/>` : `<ellipse class="ear" cx="${hx - 9}" cy="${hy + 4}" rx="7" ry="${golden || long ? 14 : 12}" fill="${b.ear}" ${st} transform="rotate(12 ${hx - 9} ${hy + 4})"/>`}
    <path d="M${hx - 12} ${hy + 14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${hx - 1}" cy="${hy + 19}" r="3" fill="#ffd166" ${st} stroke-width="1.5"/>`;
  const sitTail = poodle ? `<g class="tail"><path d="M42 86 L28 80" ${st}/><circle cx="25" cy="78" r="7" fill="${b.body}" ${st}/></g>`
    : `<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${O}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${b.body}" stroke-width="4.5" stroke-linecap="round"/>`;
  if (pose === 'sit' || pose === 'sleep') return `<svg viewBox="0 0 130 100" class="dogsvg ${sleep ? 'sleep' : 'sit'}">${sitTail}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${b.body}" ${st}/>${spotty ? `<circle cx="54" cy="66" r="5" fill="${O}"/><circle cx="64" cy="80" r="4" fill="${O}"/>` : ''}
    ${leg(62, 'a')}${leg(74, 'b')}<g transform="translate(-22 -2)">${head}</g></svg>`;
  return `<svg viewBox="0 0 130 100" class="dogsvg stand">${tail}${tailFill}
    ${leg(long ? 30 : 34, 'b')}${leg(long ? 82 : 72, 'a')}
    ${body}${spots}
    ${leg(long ? 42 : 46, 'a')}${leg(long ? 94 : 84, 'b')}
    ${head}</svg>`;
}

// ---------- the cat's day: deterministic from the clock ----------
const hash = (s: string) => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const rnd = (seed: number, k: number) => { let x = (seed ^ Math.imul(k, 2654435761)) >>> 0; x ^= x >>> 15; x = Math.imul(x, 2246822507); x ^= x >>> 13; x = Math.imul(x, 3266489909); x ^= x >>> 16; return (x >>> 0) / 4294967296; };
const SEG = 18; // seconds per little "activity"
export type CatMood = 'walk' | 'sit' | 'nap' | 'groom' | 'play';
export type CatSpot = { x: number; mood: CatMood; flip: boolean; perch: 0 | 1 | 2; curl: 0 | 1 };
/** How far up a cat tower (as a fraction of its height) each platform sits. Matches the tower art. */
export const TOWER_LIFT = { 1: 0.35, 2: 0.60 } as const;
export function towerFootY(itemY: number, itemH: number, perch: 1 | 2) {
  return itemY - itemH * TOWER_LIFT[perch];
}
/** Resting or peeking, agreed by every iPad from the clock and the dog's name. */
export function kennelLook(name: string, nowMs: number): 'rest' | 'peek' {
  const seg = 2.8, k = Math.floor(nowMs / 1000 / seg);
  return rnd(hash(name || 'pup'), k) < 0.62 ? 'rest' : 'peek';
}
export function catAt(cat: Cat, nowMs: number, tower?: { x: number } | null, bed?: { x: number } | null, settle = false): CatSpot {
  const seed = hash(cat.name + ':' + cat.coat + ':' + cat.room + ':' + Math.round(cat.x) + (tower ? ':t' + Math.round(tower.x) : ''));
  const t = nowMs / 1000, k = Math.floor(t / SEG), into = t - k * SEG;
  if (!tower) {
    const target = (i: number) => Math.max(160, Math.min(2240, cat.x + (rnd(seed, i) - 0.5) * 760));
    const from = target(k - 1);
    let to = target(k);
    const r = rnd(seed + 7, k), mood: CatMood = r < 0.45 ? 'nap' : r < 0.75 ? 'sit' : 'groom';
    // A tower wins over a bed. With no bed, the walk is the same as before (the extra roll is a new salt).
    const curl = !!(bed && mood === 'nap' && rnd(seed + 13, k) < 0.72);
    if (curl && bed) to = Math.max(160, Math.min(2240, bed.x));
    const dist = Math.abs(to - from), walkT = Math.min(5, dist / 110);
    // Reduced motion (settle): no walking; she is simply at her spot (or curled on the bed).
    if (into < walkT && !settle) return { x: from + (to - from) * (into / walkT), mood: 'walk', flip: to < from, perch: 0, curl: 0 };
    return { x: to, mood, flip: to < from, perch: 0, curl: curl ? 1 : 0 };
  }
  // With a tower in her room she walks over, then sits, naps, or plays on a platform.
  const home = Math.max(160, Math.min(2240, tower.x));
  const perch: 1 | 2 = rnd(seed + 5, k) < 0.45 ? 2 : 1;
  const from = Math.max(160, Math.min(2240, home + (rnd(seed, k) - 0.5) * 420));
  const dist = Math.abs(home - from), walkT = Math.min(4.2, Math.max(0.6, dist / 160));
  const flip = home < from;
  if (into < walkT && !settle) return { x: from + (home - from) * (into / walkT), mood: 'walk', flip, perch: 0, curl: 0 };
  const r = rnd(seed + 11, k);
  const mood: CatMood = r < 0.34 ? 'nap' : r < 0.67 ? 'sit' : 'play';
  return { x: home, mood, flip, perch, curl: 0 };
}
