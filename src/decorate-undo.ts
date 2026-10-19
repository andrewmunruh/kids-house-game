// Undo for Decorate. The stack stays in memory on this device. Nothing is written into the
// house save or sent as a new message: Undo just hands back the ordinary edit actions.
import type { Action, GameState, PlacedItem, RoomId } from './shared/state';

const MAX = 24;
const MOVE_GAP = 700;

function copyItem(it: PlacedItem): PlacedItem {
  return { id: it.id, kind: it.kind, x: it.x, y: it.y, flip: it.flip, z: it.z, scale: it.scale };
}

/** The action that puts the room back, built from the state *before* the edit. */
export function inverseDecorate(state: GameState, a: Action): Action | null {
  if (!('room' in a) || !a.room) return null;
  const roomId = a.room as RoomId;
  const room = state.rooms[roomId];
  if (!room) return null;
  switch (a.type) {
    case 'item/add':
      return a.item?.id ? { type: 'item/delete', room: roomId, id: a.item.id } : null;
    case 'item/delete': {
      const it = room.items.find(i => i.id === a.id);
      return it ? { type: 'item/add', room: roomId, item: copyItem(it) } : null;
    }
    case 'item/move': {
      const it = room.items.find(i => i.id === a.id);
      if (!it || (it.x === a.x && it.y === a.y)) return null;
      return { type: 'item/move', room: roomId, id: a.id, x: it.x, y: it.y };
    }
    case 'item/flip':
      return room.items.some(i => i.id === a.id) ? { type: 'item/flip', room: roomId, id: a.id } : null;
    case 'room/wallpaper':
      return room.wallpaper !== a.color ? { type: 'room/wallpaper', room: roomId, color: room.wallpaper } : null;
    case 'room/floor':
      return room.floor !== a.color ? { type: 'room/floor', room: roomId, color: room.floor } : null;
    case 'room/pattern':
      return room.pattern !== a.pattern ? { type: 'room/pattern', room: roomId, pattern: room.pattern } : null;
    case 'room/wallTile':
      return (room.wallTile ?? null) !== a.tile ? { type: 'room/wallTile', room: roomId, tile: room.wallTile ?? null } : null;
    case 'room/floorTile':
      return (room.floorTile ?? null) !== a.tile ? { type: 'room/floorTile', room: roomId, tile: room.floorTile ?? null } : null;
    default:
      return null;
  }
}

/**
 * Remembers decorate edits (place, move, rotate, color, delete). A drag is one step.
 * The first drop in an empty room (rug, lamp, plant, plus her piece) is one step too.
 */
export class DecorateUndo {
  private stack: Action[][] = [];
  private pending: Action[] = [];
  private pend: '' | 'add' | 'move' = '';
  private moveKey = '';
  private timer = 0;
  onChange: () => void = () => {};

  /** Steps waiting, including a drag that has not been sealed yet. */
  get depth(): number {
    return this.stack.length + (this.pending.length ? 1 : 0);
  }

  note(state: GameState, a: Action) {
    if (a.type === 'item/move') {
      const key = a.room + '\0' + a.id;
      if (this.pend === 'move' && this.moveKey === key && this.pending.length) {
        this.arm(MOVE_GAP);
        return;
      }
    }
    const inv = inverseDecorate(state, a);
    if (!inv) return;
    if (a.type === 'item/add') {
      if (this.pend !== 'add') { this.seal(); this.pend = 'add'; }
      this.pending.push(inv);
      this.arm(0);
      this.onChange();
      return;
    }
    if (a.type === 'item/move') {
      this.seal();
      this.pending = [inv];
      this.pend = 'move';
      this.moveKey = a.room + '\0' + a.id;
      this.arm(MOVE_GAP);
      this.onChange();
      return;
    }
    this.seal();
    this.stack.push([inv]);
    this.trim();
    this.onChange();
  }

  /** Close an open drag or a burst of placements. */
  seal() {
    if (this.timer) { clearTimeout(this.timer); this.timer = 0; }
    if (!this.pending.length) { this.pend = ''; this.moveKey = ''; return; }
    this.stack.push(this.pending);
    this.pending = [];
    this.pend = '';
    this.moveKey = '';
    this.trim();
  }

  /** Actions to dispatch, newest edit first. Empty when there is nothing to undo. */
  take(): Action[] | null {
    this.seal();
    const step = this.stack.pop() ?? null;
    this.onChange();
    return step ? step.slice().reverse() : null;
  }

  private arm(ms: number) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => { this.timer = 0; this.seal(); this.onChange(); }, ms) as unknown as number;
  }

  private trim() {
    while (this.stack.length > MAX) this.stack.shift();
  }
}

export const UNDO_LIMIT = MAX;
