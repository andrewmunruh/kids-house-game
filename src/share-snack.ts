// B18 item 3: share a snack. Isolated so this commit can be dropped (revert or omit)
// without touching the celebration, the pet-at-the-foot, or the derived fridge/nibble.
// Ownership rules and nacks stay exactly as they are: we never send char/hold or
// char/release until the pass is known-good, and a refused pass dispatches nothing.
import type { Action, Character, GameState, Hand, RoomId } from './shared/state';
import { isFood } from './shared/needs';

export const PASS_R = 200;

export type ShareRefuse = 'notyours' | 'no-snack' | 'hands-full' | 'too-far' | 'no-target';

export type ShareOk = {
  ok: true;
  fromId: string;
  toId: string;
  fromHand: Hand;
  toHand: Hand;
  itemId: string;
  kind: string;
  room: RoomId;
  x: number;
  y: number;
};

export type ShareNo = { ok: false; reason: ShareRefuse };

export type ShareResult = ShareOk | ShareNo;

export type ShareCtx = {
  /** House dolls only. Avatars / other players' ids are passed in as playerIds. */
  state: GameState;
  fromId: string;
  toId: string;
  /** Player (avatar) ids the passer cannot char/hold onto. Existing notyours rule. */
  playerIds?: ReadonlySet<string> | readonly string[];
};

function handsOf(c: Character): Hand[] { return ['left', 'right']; }

function snackInHand(c: Character): { hand: Hand; itemId: string; kind: string } | null {
  for (const hand of handsOf(c)) {
    const it = c.held[hand];
    if (it && isFood(it.kind)) return { hand, itemId: it.id, kind: it.kind };
  }
  return null;
}

function freeHand(c: Character): Hand | null {
  for (const hand of handsOf(c)) if (!c.held[hand]) return hand;
  return null;
}

function isPlayerId(id: string, playerIds?: ShareCtx['playerIds']): boolean {
  if (!id) return true;
  if (id.startsWith('p:')) return true;
  if (!playerIds) return false;
  const set = playerIds instanceof Set ? playerIds : new Set(playerIds);
  return set.has(id);
}

/**
 * May we pass a snack from fromId to toId?
 * A doll the passer cannot control (another player's avatar, or an id that is
 * not a house character) is refused. Existing ownership / nack is unchanged:
 * we simply do not dispatch.
 */
export function planShare(ctx: ShareCtx): ShareResult {
  const { state, fromId, toId } = ctx;
  if (!toId || toId === fromId) return { ok: false, reason: 'no-target' };
  if (isPlayerId(toId, ctx.playerIds) || isPlayerId(fromId, ctx.playerIds)) return { ok: false, reason: 'notyours' };
  const from = state.characters.find(c => c.id === fromId);
  const to = state.characters.find(c => c.id === toId);
  if (!from) return { ok: false, reason: 'no-snack' };
  if (!to) return { ok: false, reason: 'notyours' };
  const snack = snackInHand(from);
  if (!snack) return { ok: false, reason: 'no-snack' };
  if (from.room !== to.room) return { ok: false, reason: 'too-far' };
  const d = Math.hypot(from.x - to.x, from.y - to.y);
  if (d > PASS_R) return { ok: false, reason: 'too-far' };
  const handTo = freeHand(to);
  if (!handTo) return { ok: false, reason: 'hands-full' };
  return {
    ok: true,
    fromId, toId,
    fromHand: snack.hand,
    toHand: handTo,
    itemId: snack.itemId,
    kind: snack.kind,
    room: from.room,
    x: to.x,
    y: to.y,
  };
}

/** Release then hold. Caller only dispatches these after planShare said ok. */
export function shareActions(ok: ShareOk): Action[] {
  return [
    { type: 'char/release', id: ok.fromId, hand: ok.fromHand, x: ok.x, y: ok.y },
    { type: 'char/hold', id: ok.toId, hand: ok.toHand, room: ok.room, itemId: ok.itemId },
  ];
}

export type SnackWhere = { holder: string | null; hand: Hand | null; itemId: string; copies: number };

/** Count where a snack is, to prove it was not lost or duplicated. */
export function locateSnack(state: GameState, itemId: string): SnackWhere {
  let holder: string | null = null;
  let hand: Hand | null = null;
  let copies = 0;
  for (const c of state.characters) {
    for (const h of handsOf(c)) {
      if (c.held[h]?.id === itemId) { holder = c.id; hand = h; copies++; }
    }
  }
  for (const room of Object.values(state.rooms)) {
    for (const it of room.items) if (it.id === itemId) copies++;
  }
  return { holder, hand, itemId, copies };
}

/**
 * If a hold did not land, put the snack back in the original hand (no loss, no duplicate).
 * Returns a recover action or null when the world is already consistent.
 */
export function recoverShare(state: GameState, planned: ShareOk): Action | null {
  const loc = locateSnack(state, planned.itemId);
  if (loc.copies !== 1) {
    // Duplicated or gone: do not invent a second copy. The caller can only report it.
    return null;
  }
  if (loc.holder === planned.toId) return null; // success
  if (loc.holder === planned.fromId) return null; // never left, or already restored
  if (loc.holder) return null; // someone else has it; don't steal
  // On the floor: pick it back up with the passer if that hand is free.
  const from = state.characters.find(c => c.id === planned.fromId);
  if (!from) return null;
  if (from.held[planned.fromHand]) return null;
  return { type: 'char/hold', id: planned.fromId, hand: planned.fromHand, room: from.room, itemId: planned.itemId };
}

export function snackHands(c: Character | undefined): { left: string | null; right: string | null } {
  return { left: c?.held.left?.id ?? null, right: c?.held.right?.id ?? null };
}
