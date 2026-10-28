// Which drawer items belong on a room's shelf.
// "any" is a fallback for All rooms, except generic decor (rugs, lamps, plants, clocks, windows).
// Pets, plants, and food tagged "any" still show in the room you're standing in.

import { WINTER_NURSERY_SKIP } from './shared/catalog-winter';
import { HALLOWEEN_NURSERY_SKIP, HALLOWEEN_PACK_ID, halloweenVisible } from './shared/catalog-halloween';

export type ShelfItem = { rooms?: string[]; cat: string; name: string; kind?: string; pack?: string; secret?: string };

const GENERIC = /rug|lamp|light|plant|curtain|clock|window|lantern/;

export function isGenericDecor(item: ShelfItem): boolean {
  if (item.cat === 'plants') return true;
  const blob = `${item.name} ${item.kind ?? ''}`.toLowerCase();
  return GENERIC.test(blob);
}

const NURSERY_SKIP = new Set<string>(['pack:ring-light', 'pack:desk-lamp', ...WINTER_NURSERY_SKIP, ...HALLOWEEN_NURSERY_SKIP]);

/** Seasonal packs: off the shelf out of season (placed pieces still render). */
export function seasonHidden(item: { pack?: string }, now: Date = new Date()): boolean {
  return item.pack === HALLOWEEN_PACK_ID && !halloweenVisible(now);
}

function yardOnly(item: ShelfItem): boolean {
  const rooms = item.rooms ?? [];
  return rooms.includes('backyard') && !rooms.includes('any');
}

export function itemMatchesRoom(item: ShelfItem, room: string): boolean {
  if (room === 'nursery' && item.kind && NURSERY_SKIP.has(item.kind)) return false;
  if (room === 'backyard') return yardOnly(item);
  if (room === 'all' || !room) return true;
  const rooms = item.rooms;
  if (!rooms || rooms.length === 0) return true;
  if (rooms.includes(room)) return true;
  if (!rooms.includes('any')) return false;
  if (item.cat === 'decor' || item.cat === 'furniture') return isGenericDecor(item);
  return true;
}

/** What one catalog tab lists. Pack tabs keep the whole pack in every room, then drop nursery exclusions. */
export function catalogShows(item: ShelfItem, tab: string, room: string, showAllRooms: boolean, found?: ReadonlySet<string>): boolean {
  if (item.secret && !(found && found.has(item.secret))) return false;
  if (seasonHidden(item)) return false;
  if (!showAllRooms && room === 'backyard' && !yardOnly(item)) return false;
  if (room === 'nursery' && item.kind && NURSERY_SKIP.has(item.kind)) return false;
  if (tab.startsWith('pack:')) return item.pack === tab.slice(5);
  if (item.cat !== tab) return false;
  return itemMatchesRoom(item, showAllRooms ? 'all' : room);
}
