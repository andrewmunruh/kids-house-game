// Image-based packs, resolved at BUILD time by Vite. Everything is optional:
// a missing/empty/invalid manifest or a missing image just means fewer options.
//
//   assets/items/manifest.json      bare array or { "items": [...] } of entries:
//     item:     { slug, name, room, category, size: small|medium|large, pack? }      -> assets/items/<room>/<slug>.png|svg|webp
//     pattern:  { type: 'wallpaper'|'floor', slug, name, pack }                      -> assets/patterns/<pack>/<slug>.png|svg|webp
//   assets/patterns/manifest.json   (optional) same format, pattern entries only.
import type { ItemDef } from './items';

const SIZE_W: Record<string, number> = { small: 80, medium: 150, large: 260 };
export const PACK_NAMES: Record<string, string> = { 'welcome-home': 'Welcome Home', 'sunny-vibes': 'Sunny Vibes', glossy: 'Glossy' };
export const packLabel = (p: string) => PACK_NAMES[p] ?? p.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

export interface PackEntry { slug: string; name?: string; room?: string; category?: string; size?: string; pack?: string; type?: string; holdable?: boolean;
  // optional extras some deliveries include:
  gameCategory?: string; tag?: string; gameW?: number; widthUnits?: number; heightUnits?: number; png?: string; svg?: string }
export interface PatternDef { id: string; name: string; pack: string; kind: 'wallpaper' | 'floor'; url: string }

// import.meta.glob returns {} when nothing matches, so missing files are fine.
const manifests = import.meta.glob(['../assets/items/manifest.json', '../assets/patterns/manifest.json'], { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const itemFiles = import.meta.glob(['../assets/items/**/*.{png,svg,webp,PNG,SVG,WEBP}', '!../assets/items/**/_*'], { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const patternFiles = import.meta.glob(['../assets/patterns/**/*.{png,svg,webp,PNG,SVG,WEBP}', '!../assets/patterns/**/_*'], { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

function parse(raw: string | undefined, where: string): PackEntry[] {
  if (!raw || !raw.trim()) return [];
  try {
    const j = JSON.parse(raw);
    const arr = Array.isArray(j) ? j : [...(Array.isArray(j?.items) ? j.items : []), ...(Array.isArray(j?.patterns) ? j.patterns : [])];
    return arr.filter((e: any) => e && typeof e.slug === 'string' && e.slug.trim());
  } catch (e) { console.warn(`[packs] ${where} is not valid JSON; ignoring`, e); return []; }
}
const entries: PackEntry[] = Object.entries(manifests).flatMap(([k, v]) => parse(v, k));

const EXTS = ['svg', 'png', 'webp', 'SVG', 'PNG', 'WEBP']; // vector preferred
function find(files: Record<string, string>, base: string, folder: string, slug: string): string | undefined {
  for (const ext of EXTS) { const u = files[`../assets/${base}/${folder}/${slug}.${ext}`]; if (u) return u; }
  const k = Object.keys(files).find(p => p.split('/').pop()!.replace(/\.\w+$/, '') === slug);
  return k ? files[k] : undefined;
}
// Map manifest `category` onto the existing drawer tabs (furniture, decor, plants, food, pets).
const TAB_ALIASES: Record<string, string> = {
  furniture: 'furniture', appliance: 'furniture', appliances: 'furniture', seating: 'furniture', storage: 'furniture', bed: 'furniture', table: 'furniture',
  decor: 'decor', rug: 'decor', rugs: 'decor', lighting: 'decor', light: 'decor', lamp: 'decor', toy: 'decor', toys: 'decor', 'wall-art': 'decor', art: 'decor', beauty: 'decor',
  plant: 'plants', plants: 'plants', flower: 'plants', flowers: 'plants',
  food: 'food', drink: 'food', drinks: 'food', snack: 'food',
  pet: 'pets', pets: 'pets', animal: 'pets', animals: 'pets',
};
function tabFor(c: unknown) { const k = typeof c === 'string' ? c.trim().toLowerCase() : ''; return TAB_ALIASES[k] ?? TAB_ALIASES[k.replace(/s$/, '')] ?? 'decor'; }
const norm = (s: unknown, d: string) => (typeof s === 'string' && s.trim() ? s.trim().toLowerCase() : d);
const isPattern = (e: PackEntry) => ['wallpaper', 'floor'].includes(norm(e.type, ''));

const seen = new Set<string>();
export const PACK_ITEMS: ItemDef[] = entries.filter(e => !isPattern(e)).flatMap(e => {
  const room = norm(e.room, 'any'), slug = e.slug.trim();
  if (seen.has(slug)) return []; seen.add(slug);
  // explicit file paths (relative to assets/items) win; SVG preferred over PNG, then lookup by room/slug
  const explicit = [e.svg, e.png].filter((x): x is string => typeof x === 'string').map(x => itemFiles['../assets/items/' + x.replace(/^\.?\//, '')]).find(Boolean);
  const img = explicit ?? find(itemFiles, 'items', room, slug);
  if (!img) { console.warn(`[packs] no image for items/${room}/${slug}`); return []; }
  const pack = norm(e.pack, ''), size = norm(e.size, 'medium');
  const cat = tabFor(e.category);   // `category` drives the drawer tab; `tag` / `gameCategory` are informational only
  const w = typeof e.gameW === 'number' && e.gameW > 20 && e.gameW < 800 ? e.gameW : SIZE_W[size] ?? SIZE_W.medium;
  const ratio = typeof e.widthUnits === 'number' && typeof e.heightUnits === 'number' && e.widthUnits > 0 && e.heightUnits > 0 ? e.heightUnits / e.widthUnits : 1;
  const h = Math.round(w * Math.min(4, Math.max(0.2, ratio)));
  // optional manifest `holdable`; default: small/medium non-furniture items can be held
  const holdable = typeof e.holdable === 'boolean' ? e.holdable : size !== 'large' && cat !== 'furniture';
  return [{ kind: `pack:${slug}`, name: e.name || slug, cat, rooms: [room], w, h, svg: '', img, pack: pack || undefined, holdable } satisfies ItemDef];
});

export const PATTERNS_FROM_PACKS: PatternDef[] = entries.filter(isPattern).flatMap(e => {
  const pack = norm(e.pack, 'extra'), slug = e.slug.trim();
  const url = find(patternFiles, 'patterns', pack, slug);
  if (!url) { console.warn(`[packs] no image for patterns/${pack}/${slug}`); return []; }
  return [{ id: `${pack}/${slug}`, name: e.name || slug, pack, kind: norm(e.type, 'wallpaper') as 'wallpaper' | 'floor', url }];
});
export const PATTERN_MAP: Record<string, PatternDef> = Object.fromEntries(PATTERNS_FROM_PACKS.map(p => [p.id, p]));
