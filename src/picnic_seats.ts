import { PROTOCOL } from './shared/hood';
import { seatFractions } from './shared/sit';

// B17b1-r2: B16's shared seatFractions('picnic-table') entry is the single source
// of truth for where picnic sitters go. This module adds no fractions of its own.
// It does two client-only things:
//   1. advertise picnic:1 on hello/join when that shared entry exists, and
//   2. keep the client from seating anyone there (PICNIC_SEATS_ENABLED stays false
//      until a later step turns picnic seats on).
// Do not put this file under src/shared.

export const PICNIC_SEATS_ENABLED = false;

/** True when the shared sit.ts carries picnic-table seat fractions. */
export const HAS_PICNIC_SEAT_FRACTIONS = seatFractions('picnic-table') !== null;

/** The client's seat fractions: shared ones, except the picnic table stays unsittable while seats are off. */
export function clientSeatFractions(kind: string) {
  const k = String(kind || '').toLowerCase().replace(/^pack:/, '');
  if (k === 'picnic-table' && !PICNIC_SEATS_ENABLED) return null;
  return seatFractions(kind);
}

/** Hello/join field that advertises picnic seats. Empty when the shared fractions are absent. */
export function picnicHelloFields(): { picnic: 1 } | Record<string, never> {
  return HAS_PICNIC_SEAT_FRACTIONS ? { picnic: 1 } : {};
}

/** Capability flags sent on hello and join, next to sit:1 and baby:1. */
export function hoodHelloCaps() {
  return { v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1, amb: 1, halloween: 1, cos: 1, needs: 1, art: 1, hb: 1, ...picnicHelloFields() };
}
