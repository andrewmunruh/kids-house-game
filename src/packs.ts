// Image-based item packs, resolved at BUILD time by Vite.
// Expected layout (all optional — a missing or empty manifest yields zero items):
//   assets/items/manifest.json   -> [{ slug, name, room, category, size: 'small'|'medium'|'large' }]
//                                   (a bare array, or { "items": [...] })
//   assets/items/<room>/<slug>.png  (or .svg / .webp)
import type { ItemDef } from './items';

const SIZE_W: Record<string, number> = { small: 80, medium: 150, large: 260 };

export interface PackEntry { slug: string; name?: string; room?: string; category?: string; size?: string }

// import.meta.glob returns {} when nothing matches, so a missing manifest is fine.
const manifestRaw = import.meta.glob('../assets/items/manifest.json', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const files = import.meta.glob('../assets/items/**/*.{png,svg,webp,PNG,SVG,WEBP}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

function parseManifest(): PackEntry[] {
  const raw = Object.values(manifestRaw)[0];
  if (!raw || !raw.trim()) return [];
  try {
    const j = JSON.parse(raw);
    const arr = Array.isArray(j) ? j : Array.isArray(j?.items) ? j.items : [];
    return arr.filter((e: any) => e && typeof e.slug === 'string' && e.slug);
  } catch (e) { console.warn('[packs] manifest.json is not valid JSON; ignoring', e); return []; }
}

function findFile(room: string, slug: string): string | undefined {
  for (const ext of ['png', 'svg', 'webp', 'PNG', 'SVG', 'WEBP']) {
    const u = files[`../assets/items/${room}/${slug}.${ext}`];
    if (u) return u;
  }
  // fall back: any folder with that slug
  const k = Object.keys(files).find(p => p.split('/').pop()!.replace(/\.\w+$/, '') === slug);
  return k ? files[k] : undefined;
}

const norm = (s: string | undefined, d: string) => (s ?? d).toString().trim().toLowerCase() || d;

export const PACK_ITEMS: ItemDef[] = parseManifest().flatMap(e => {
  const room = norm(e.room, 'any');
  const img = findFile(room, e.slug);
  if (!img) { console.warn(`[packs] no image for ${room}/${e.slug}`); return []; }
  return [{
    kind: `pack:${e.slug}`,
    name: e.name || e.slug,
    cat: norm(e.category, 'decor'),
    rooms: [room],
    w: SIZE_W[norm(e.size, 'medium')] ?? SIZE_W.medium,
    svg: '',
    img,
  } satisfies ItemDef];
});
