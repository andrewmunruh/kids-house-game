// Chibi look (look2). Optional, allow-listed, and safe to run in the browser, Node, and the Worker.
// A bad look2 is dropped by itself. Legacy skin/hair/shirt/pants/hairStyle/acc stay so older clients still draw a kid.

export const LOOK2_MAX = 400;

export const SKIN2 = ['#ffe0c4', '#f6d2b5', '#f1c27d', '#e0ac69', '#c9956c', '#c68642', '#a86b3c', '#8d5524', '#5c3a1e', '#3d2914'] as const;
export const HAIR2 = ['#2b1d16', '#5b3a29', '#a0522d', '#f4d58d', '#ff8fab', '#8ecae6', '#b388d6', '#ff9f43', '#1d1416', '#c8602a', '#7a4b32', '#f7f1e8'] as const;
export const EYE2 = ['#5a321c', '#3f9b52', '#3d7ec4', '#c48a3a', '#7b4fb8'] as const;
export const CLOTH2 = ['#ff7aa8', '#ffd166', '#5aa9e6', '#80ed99', '#c9a0dc', '#ff9f68', '#ffffff', '#5a3d5c', '#ff8f7a', '#7ec8c3', '#f7f3ee', '#f4a3c8', '#6b8e4e', '#e8d5b5', '#ef6b6b', '#3d4a6b'] as const;

export const HAIR_IDS = ['short', 'bob', 'buns', 'topbun', 'pixie', 'long', 'wavy', 'puffs', 'afro', 'curlybob', 'coily', 'boxbraids', 'braids', 'sidebraid', 'crown', 'pony', 'sidepony', 'pigtails', 'lowbun', 'locs', 'halfup', 'bangs', 'sidebangs', 'wavybob'] as const;
export const TOP_IDS = ['classic', 'stripes', 'hoodie', 'sweater', 'tank', 'puff', 'ruffle', 'button', 'jersey', 'cardigan', 'bib', 'raincoat'] as const;
export const BOTTOM_IDS = ['pants', 'jeans', 'shorts', 'skirt', 'tutu', 'leggings', 'overalls', 'joggers'] as const;
export const DRESS_IDS = ['', 'twirl', 'sundress', 'party', 'pinafore', 'jumper', 'ballet', 'nightgown', 'raindress'] as const;
export const SHOE_IDS = ['classic', 'sneakers', 'lightup', 'boots', 'rainboots', 'sandals', 'maryjanes', 'slippers'] as const;
export const EYE_IDS = ['round', 'big', 'sleepy', 'sparkle', 'soft', 'bright'] as const;
export const ACC_IDS = ['glasses', 'square', 'sunnies', 'bow', 'bigbow', 'headband', 'flower', 'cap', 'beanie', 'sunhat', 'catears', 'earmuffs'] as const;

export type HairId = typeof HAIR_IDS[number];
export type TopId = typeof TOP_IDS[number];
export type BottomId = typeof BOTTOM_IDS[number];
export type DressId = typeof DRESS_IDS[number];
export type ShoeId = typeof SHOE_IDS[number];
export type EyeId = typeof EYE_IDS[number];
export type AccId = typeof ACC_IDS[number];

export interface Look2 {
  v: 1;
  hair?: HairId;
  hairC?: string;
  skin?: string;
  eyes?: EyeId;
  eyeC?: string;
  freckles?: boolean;
  blush?: boolean;
  top?: TopId;
  topC?: string;
  bottom?: BottomId;
  bottomC?: string;
  dress?: DressId;
  dressC?: string;
  shoes?: ShoeId;
  shoesC?: string;
  acc?: AccId[];
  accC?: string;
}

export interface LegacyLook {
  skin: string;
  hair: string;
  hairStyle: number;
  shirt: string;
  pants: string;
  acc: number;
}

const HAIR_SET = new Set<string>(HAIR_IDS);
const TOP_SET = new Set<string>(TOP_IDS);
const BOTTOM_SET = new Set<string>(BOTTOM_IDS);
const DRESS_SET = new Set<string>(DRESS_IDS);
const SHOE_SET = new Set<string>(SHOE_IDS);
const EYE_SET = new Set<string>(EYE_IDS);
const ACC_SET = new Set<string>(ACC_IDS);

const STYLE0 = new Set(['short', 'pixie', 'coily', 'afro', 'bangs']);
const STYLE2 = new Set(['buns', 'puffs']);
const STYLE3 = new Set(['topbun', 'lowbun']);

export const LOOK2_DEFAULTS: Required<Look2> = {
  v: 1,
  hair: 'buns',
  hairC: '#5b3a29',
  skin: '#f1c27d',
  eyes: 'round',
  eyeC: '#5a321c',
  freckles: false,
  blush: true,
  top: 'classic',
  topC: '#ff7aa8',
  bottom: 'pants',
  bottomC: '#5aa9e6',
  dress: '',
  dressC: '#ff7aa8',
  shoes: 'classic',
  shoesC: '#5a3d5c',
  acc: [],
  accC: '#ffd166',
};

function plain(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

function inList(v: unknown, set: Set<string>): v is string {
  return typeof v === 'string' && set.has(v);
}

function canonColor(v: unknown, palette: readonly string[]): string | null {
  if (typeof v !== 'string') return null;
  const h = v.trim().toLowerCase();
  for (let i = 0; i < palette.length; i++) if (palette[i] === h) return palette[i];
  return null;
}

/** Null when look2 is the wrong type or over the size cap. Bad inner fields are omitted; the rest is kept. */
export function sanitizeLook2(raw: unknown): Look2 | null {
  if (!plain(raw)) return null;
  let size = 0;
  try { size = JSON.stringify(raw).length; } catch { return null; }
  if (size > LOOK2_MAX) return null;
  const out: Look2 = { v: 1 };
  if (inList(raw.hair, HAIR_SET)) out.hair = raw.hair as HairId;
  const hairC = canonColor(raw.hairC, HAIR2); if (hairC) out.hairC = hairC;
  const skin = canonColor(raw.skin, SKIN2); if (skin) out.skin = skin;
  if (inList(raw.eyes, EYE_SET)) out.eyes = raw.eyes as EyeId;
  const eyeC = canonColor(raw.eyeC, EYE2); if (eyeC) out.eyeC = eyeC;
  if (raw.freckles === true || raw.freckles === false) out.freckles = raw.freckles;
  if (raw.blush === true || raw.blush === false) out.blush = raw.blush;
  if (inList(raw.top, TOP_SET)) out.top = raw.top as TopId;
  const topC = canonColor(raw.topC, CLOTH2); if (topC) out.topC = topC;
  if (inList(raw.bottom, BOTTOM_SET)) out.bottom = raw.bottom as BottomId;
  const bottomC = canonColor(raw.bottomC, CLOTH2); if (bottomC) out.bottomC = bottomC;
  if (inList(raw.dress, DRESS_SET)) out.dress = raw.dress as DressId;
  const dressC = canonColor(raw.dressC, CLOTH2); if (dressC) out.dressC = dressC;
  if (inList(raw.shoes, SHOE_SET)) out.shoes = raw.shoes as ShoeId;
  const shoesC = canonColor(raw.shoesC, CLOTH2); if (shoesC) out.shoesC = shoesC;
  if (Array.isArray(raw.acc)) {
    const acc: AccId[] = [];
    for (let i = 0; i < raw.acc.length && acc.length < 2; i++) {
      const id = raw.acc[i];
      if (typeof id === 'string' && ACC_SET.has(id) && acc.indexOf(id as AccId) < 0) acc.push(id as AccId);
    }
    out.acc = acc;
  }
  const accC = canonColor(raw.accC, CLOTH2); if (accC) out.accC = accC;
  return out;
}

export function fillLook2(p: Look2 | null | undefined): Required<Look2> {
  const d = LOOK2_DEFAULTS;
  const s = p ?? ({} as Look2);
  return {
    v: 1,
    hair: s.hair ?? d.hair,
    hairC: s.hairC ?? d.hairC,
    skin: s.skin ?? d.skin,
    eyes: s.eyes ?? d.eyes,
    eyeC: s.eyeC ?? d.eyeC,
    freckles: s.freckles ?? d.freckles,
    blush: s.blush ?? d.blush,
    top: s.top ?? d.top,
    topC: s.topC ?? d.topC,
    bottom: s.bottom ?? d.bottom,
    bottomC: s.bottomC ?? d.bottomC,
    dress: s.dress ?? d.dress,
    dressC: s.dressC ?? d.dressC,
    shoes: s.shoes ?? d.shoes,
    shoesC: s.shoesC ?? d.shoesC,
    acc: s.acc ? s.acc.slice() : [],
    accC: s.accC ?? d.accC,
  };
}

function hexRgb(h: string): [number, number, number] | null {
  const m = /^#([0-9a-f]{6})$/i.exec(h.trim());
  if (!m) {
    const s = /^#([0-9a-f]{3})$/i.exec(h.trim());
    if (!s) return null;
    return [parseInt(s[1][0] + s[1][0], 16), parseInt(s[1][1] + s[1][1], 16), parseInt(s[1][2] + s[1][2], 16)];
  }
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function nearestColor(hex: string, palette: readonly string[]): string {
  const hit = canonColor(hex, palette);
  if (hit) return hit;
  const rgb = hexRgb(hex);
  if (!rgb) return palette[0];
  let best = palette[0], bd = 1e12;
  for (let i = 0; i < palette.length; i++) {
    const q = hexRgb(palette[i]);
    if (!q) continue;
    const d = (rgb[0] - q[0]) * (rgb[0] - q[0]) + (rgb[1] - q[1]) * (rgb[1] - q[1]) + (rgb[2] - q[2]) * (rgb[2] - q[2]);
    if (d < bd) { bd = d; best = palette[i]; }
  }
  return best;
}

export function hairStyleOf(hair: string): number {
  if (STYLE0.has(hair)) return 0;
  if (STYLE2.has(hair)) return 2;
  if (STYLE3.has(hair)) return 3;
  return 1;
}

export function legacyAcc(acc: readonly string[]): number {
  for (let i = 0; i < acc.length; i++) {
    const a = acc[i];
    if (a === 'glasses' || a === 'square' || a === 'sunnies') return 2;
  }
  for (let i = 0; i < acc.length; i++) {
    const a = acc[i];
    if (a === 'cap' || a === 'beanie' || a === 'sunhat') return 3;
  }
  for (let i = 0; i < acc.length; i++) {
    const a = acc[i];
    if (a === 'bow' || a === 'bigbow') return 1;
  }
  return 0;
}

/** Nearest legacy fields so an old client draws a close version of this look. */
export function legacyFromLook2(look: Look2): LegacyLook {
  const L = fillLook2(look);
  const dressed = L.dress !== '';
  return {
    skin: L.skin,
    hair: L.hairC,
    hairStyle: hairStyleOf(L.hair),
    shirt: dressed ? L.dressC : L.topC,
    pants: dressed ? L.dressC : L.bottomC,
    acc: legacyAcc(L.acc),
  };
}

const LEGACY_HAIR = ['short', 'bob', 'buns', 'topbun'] as const;

/** First open of the customizer: build a look2 from the classic fields without inventing a new outfit. */
export function look2FromLegacy(c: { skin?: string; hair?: string; hairStyle?: number; shirt?: string; pants?: string; acc?: number }): Look2 {
  const hs = typeof c.hairStyle === 'number' && c.hairStyle >= 0 && c.hairStyle <= 3 ? Math.round(c.hairStyle) : 0;
  const acc = c.acc === 1 ? ['bow' as AccId] : c.acc === 2 ? ['glasses' as AccId] : c.acc === 3 ? ['cap' as AccId] : [];
  const shirt = nearestColor(String(c.shirt ?? ''), CLOTH2);
  return {
    v: 1,
    hair: LEGACY_HAIR[hs],
    hairC: nearestColor(String(c.hair ?? ''), HAIR2),
    skin: nearestColor(String(c.skin ?? ''), SKIN2),
    eyes: 'round',
    eyeC: '#5a321c',
    freckles: false,
    blush: true,
    top: 'classic',
    topC: shirt,
    bottom: 'pants',
    bottomC: nearestColor(String(c.pants ?? ''), CLOTH2),
    dress: '',
    dressC: shirt,
    shoes: 'classic',
    shoesC: '#5a3d5c',
    acc,
    accC: '#ffd166',
  };
}

export function patchFromLook2(look: Look2): LegacyLook & { look2: Look2 } {
  const clean = sanitizeLook2(look) ?? { v: 1 as const };
  const filled = fillLook2(clean);
  return { ...legacyFromLook2(filled), look2: filled };
}

const FACE_ACC = new Set(['glasses', 'square', 'sunnies']);
const BOW_ACC = new Set(['bow', 'bigbow', 'flower', 'headband']);
const HAT_ACC = new Set(['cap', 'beanie', 'sunhat', 'catears', 'earmuffs']);
export function accSlot(id: string): string {
  if (FACE_ACC.has(id)) return 'face';
  if (BOW_ACC.has(id)) return 'bow';
  if (HAT_ACC.has(id)) return 'hat';
  return 'other';
}

function pick<T>(rng: () => number, a: readonly T[]): T {
  return a[Math.floor(rng() * a.length)];
}

/** A full preset look. Dresses are common, and two extras never share a slot. */
export function randomLook2(rng: () => number = Math.random): Look2 {
  const dressOn = rng() < 0.38;
  const roll = rng();
  let acc: AccId[] = [];
  if (roll < 0.22) acc = [];
  else if (roll < 0.68) acc = [pick(rng, ACC_IDS)];
  else {
    const a = pick(rng, ACC_IDS);
    const pool = ACC_IDS.filter(id => accSlot(id) !== accSlot(a));
    acc = [a, pick(rng, pool)];
  }
  return {
    v: 1,
    hair: pick(rng, HAIR_IDS),
    hairC: pick(rng, HAIR2),
    skin: pick(rng, SKIN2),
    eyes: pick(rng, EYE_IDS),
    eyeC: pick(rng, EYE2),
    freckles: rng() < 0.4,
    blush: rng() < 0.85,
    top: pick(rng, TOP_IDS),
    topC: pick(rng, CLOTH2),
    bottom: pick(rng, BOTTOM_IDS),
    bottomC: pick(rng, CLOTH2),
    dress: dressOn ? pick(rng, DRESS_IDS.filter(d => d !== '')) : '',
    dressC: pick(rng, CLOTH2),
    shoes: pick(rng, SHOE_IDS),
    shoesC: pick(rng, CLOTH2),
    acc,
    accC: pick(rng, CLOTH2),
  };
}

/** New street houses get a random kid. The deterministic starter used by tests is left alone. */
export function withRandomStarter<T extends { characters: any[] }>(state: T, rng: () => number = Math.random): T {
  const c0 = state.characters[0];
  if (!c0) return state;
  const look2 = randomLook2(rng);
  const leg = legacyFromLook2(look2);
  const characters = state.characters.slice();
  characters[0] = { ...c0, ...leg, look2 };
  return { ...state, characters };
}

export function lookStamp(c: { skin: string; hair: string; hairStyle: number; shirt: string; pants: string; acc: number; look2?: Look2 | null }): string {
  return [c.skin, c.hair, c.hairStyle, c.shirt, c.pants, c.acc, c.look2 ? JSON.stringify(c.look2) : ''].join('|');
}
