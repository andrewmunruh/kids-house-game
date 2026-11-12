// Painted pet / ranch sprites (Batch 10). SVG stays the fallback when a file
// is missing or ?art=v1 is on. Eager URLs so live pets/horses can swap every frame.
import { artRasterOn } from './flag';
import PET_FIT_JSON from './pet_fit.json';

/**
 * Per-sprite fit [sx, sy] so a painted pet's opaque box matches its SVG pose within ±3%
 * (measured by tests/b10_sprite_bounds.py). Scale only, from the bottom centre (feet stay put);
 * the webp files are not repainted. Sprites not listed draw at 1:1.
 */
const PET_FIT = PET_FIT_JSON as unknown as Record<string, [number, number]>;
export function petFitStyle(id: string): string {
  const f = PET_FIT[id];
  return f ? ` style="--fx:${f[0]};--fy:${f[1]}"` : '';
}

const petFiles = import.meta.glob('../../assets/art/pets/*.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const ranchFiles = import.meta.glob('../../assets/art/ranch/*.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

const byId = new Map<string, string>();
for (const [path, url] of Object.entries(petFiles)) {
  const id = path.split('/').pop()!.replace(/\.webp$/i, '');
  byId.set(id, url);
}
for (const [path, url] of Object.entries(ranchFiles)) {
  const id = path.split('/').pop()!.replace(/\.webp$/i, '');
  byId.set(id, url);
}

const CAT_COATS = ['tabby', 'smokey', 'tuxedo', 'calico'] as const;
const DOG_BREEDS = ['pup', 'poodle', 'dachshund', 'golden', 'spotty'] as const;
const ANIMALS = ['goat', 'sheep', 'piglet', 'chicks', 'bunny', 'cow'] as const;
/** Barn animals that stay vector (main's SVG). The chicks keep main's drawing with faces (App Builder ruling). */
const VECTOR_ANIMALS = new Set<string>(['chicks']);
const HORSES = ['chestnut', 'snowy', 'midnight', 'sunny', 'rainbow'] as const;

export function spriteUrl(id: string): string | null {
  if (!artRasterOn()) return null;
  return byId.get(id) ?? null;
}

function img(url: string, cls = 'artimg sprite', extra = ''): string {
  return `<img class="${cls}" alt="" draggable="false"${extra} src="${url}">`;
}

/** Cat coat index 0..3, pose stand|sit|nap. */
export function catSprite(coat: number, pose: 'stand' | 'sit' | 'nap', fallback: string): string {
  const name = CAT_COATS[coat] ?? CAT_COATS[0];
  const id = `cat-${name}-${pose}`;
  const url = spriteUrl(id);
  return url ? img(url, 'artimg sprite petsprite', petFitStyle(id)) : fallback;
}

/** Dog breed index 0..4, pose stand|sit|sleep. */
export function dogSprite(breed: number, pose: 'stand' | 'sit' | 'sleep', fallback: string): string {
  const name = DOG_BREEDS[breed] ?? DOG_BREEDS[0];
  const id = `dog-${name}-${pose}`;
  const url = spriteUrl(id);
  return url ? img(url, 'artimg sprite petsprite', petFitStyle(id)) : fallback;
}

export function animalSprite(i: number, fallback: string): string {
  const name = ANIMALS[i] ?? ANIMALS[0];
  if (VECTOR_ANIMALS.has(name)) return fallback;
  const url = spriteUrl(`animal-${name}`);
  return url ? img(url, 'artimg sprite ranchsprite') : fallback;
}

export function horseSprite(coat: number, saddle: boolean, fallback: string): string {
  const name = HORSES[coat] ?? HORSES[0];
  const url = spriteUrl(`horse-${name}-${saddle ? 'saddle' : 'bare'}`);
  return url ? img(url, 'artimg sprite ranchsprite horsesprite') : fallback;
}

export function ranchPropSprite(
  id: 'hen-house' | 'tractor' | 'apple-tree' | 'basket',
  fallback: string,
): string {
  const url = spriteUrl(id);
  return url ? img(url, 'artimg sprite ranchsprite') : fallback;
}
