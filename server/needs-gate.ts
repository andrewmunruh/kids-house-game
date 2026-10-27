// Server checks for need/* (M2). Kept apart from core.ts so the shared file only gains a few lines.
import type { Action } from '../src/shared/state';
import type { HouseFull } from '../src/shared/hood';
import { meetsHere, levelOf, type DriftGate } from '../src/shared/needs';

/** Returns a nack reason, or null when the action may go to reduce. */
export function needGate(a: Action, c: { needs?: number }, h: HouseFull, pid: string, players: Record<string, unknown>, gate: DriftGate, now: number): string | null {
  if (a.type !== 'need/meet' && a.type !== 'need/drift') return null;
  if ((c.needs ?? 0) < 1) return 'invalid';
  // A player's avatar is a girl, not a house doll. It has no needs.
  if (players[a.id]) return 'notyours';
  const doll = h.state.characters.find(x => x.id === a.id);
  if (!doll) return 'noop';
  if (a.type === 'need/meet') {
    // Anyone in the house may help (Andy's call). It only ever raises.
    if (levelOf(doll, a.need) >= 3 || !meetsHere(h.state, doll, a.need)) return 'noop';
    return null;
  }
  // Only the owner's own play wears her house down. A visitor's play never does.
  if (h.ownerId !== pid) return 'notyours';
  if (levelOf(doll, a.need) <= 0) return 'noop';
  return gate.ok(h.id, now) ? null : 'noop';
}
