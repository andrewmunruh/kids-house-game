// Client-only: eating looks like eating on every iPad.
// Fridge open is derived each frame from synced doll positions (and a food hold
// at the fridge). It is never stored, never item.on, and never a sticky local class.
// Table nibble is derived from synced seats and holds. shared/ambient.ts is untouched,
// so an older visitor keeps today's behavior.
import { FRIDGE_RADIUS, isFridge, phaseOf, type AmbChar, type AmbItem, type Reaction } from './shared/ambient';
import { isFood } from './shared/needs';
import { isTableKind } from './play-drop';
import type { Character, GameState, PlacedItem } from './shared/state';

export const TABLE_NIBBLE_R = 200;
export const FOOD_ON_TABLE_R = 120;

export function fridgeIsOpen(
  fridge: { x: number; y: number },
  dolls: readonly { x: number; y: number }[],
): boolean {
  return dolls.some(d => Math.hypot(d.x - fridge.x, d.y - fridge.y) <= FRIDGE_RADIUS);
}

/** Open fridge ids for this room. Empty after a reload unless a doll is still standing there. */
export function openFridges(
  items: readonly AmbItem[],
  dolls: readonly { x: number; y: number }[],
): Set<string> {
  const out = new Set<string>();
  for (const it of items) if (isFridge(it.kind) && fridgeIsOpen(it, dolls)) out.add(it.id);
  return out;
}

function heldFood(c: { held?: { left?: PlacedItem | null; right?: PlacedItem | null } } | undefined): boolean {
  if (!c?.held) return false;
  return [c.held.left, c.held.right].some(it => !!it && isFood(it.kind));
}

function itemsIn(s: GameState, room: string): PlacedItem[] {
  return s.rooms[room as keyof GameState['rooms']]?.items ?? [];
}

/** A seated (or standing-with-food) doll at a table nibble-eats when food is in a hand or on the table. */
export function tableNibbleFor(
  s: GameState,
  c: Character,
): { item: string } | null {
  if (c.seat?.pose === 'lie') return null;
  const roomItems = itemsIn(s, c.room);
  const tables = roomItems.filter(i => isTableKind(i.kind));
  if (!tables.length) return null;
  let table: PlacedItem | null = null;
  let best = Infinity;
  for (const t of tables) {
    const d = Math.hypot(t.x - c.x, t.y - c.y);
    if (d <= TABLE_NIBBLE_R && d < best) { best = d; table = t; }
  }
  if (!table) return null;
  const seated = c.seat?.pose === 'sit';
  const hold = heldFood(c);
  if (!seated && !hold) return null;
  const foodOnTable = roomItems.some(i => isFood(i.kind) && Math.hypot(i.x - table!.x, i.y - table!.y) <= FOOD_ON_TABLE_R);
  if (!hold && !foodOnTable) return null;
  return { item: table.id };
}

/** Add table nibbles without replacing a reaction already chosen (dance, bath, fridge nibble, ...). */
export function addTableNibbles(
  s: GameState,
  chars: readonly AmbChar[],
  rx: Map<string, Reaction>,
): Map<string, Reaction> {
  const byId = new Map(s.characters.map(c => [c.id, c]));
  for (const ch of chars) {
    if (rx.has(ch.id)) continue;
    const c = byId.get(ch.id);
    if (!c) continue;
    const n = tableNibbleFor(s, c);
    if (!n) continue;
    rx.set(ch.id, { kind: 'nibble', item: n.item, phase: phaseOf(n.item, ch.id), face: c.x >= (itemsIn(s, c.room).find(i => i.id === n.item)?.x ?? c.x) ? -1 : 1 });
  }
  return rx;
}

/** True when a fridge item.on was written — must stay false so old clients keep today's behavior. */
export function fridgeOnFlag(items: readonly { kind: string; on?: boolean }[]): boolean {
  return items.some(i => isFridge(i.kind) && !!i.on);
}
