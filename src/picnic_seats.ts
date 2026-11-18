import { PROTOCOL } from './shared/hood';

// B17b step 1: client-only picnic seatFractions (2×-in, dx ±0.24, dy 0.22).
// Seats stay DISABLED — this module is not wired into shared seatFractions,
// anchorsOf, or resolveDrop, so a kid cannot sit at the picnic table yet and
// nothing new is sent as a seat. The fractions live here so this build can
// honestly send picnic:1. A later Worker round (step 2) will count that flag
// and enable seats when App Builder says the share is high enough.
// Do not put this file under src/shared.

export const PICNIC_SEATS_ENABLED = false;
export const PICNIC_IN_DX = 0.24;
export const PICNIC_IN_DY = 0.22;

export type PicnicSeatFractions = {
  pose: 'sit';
  spots: [{ dx: number; dy: number }, { dx: number; dy: number }];
};

/** Picnic seatFractions for a 2× table with sitters pulled in (the B17-r2 pick). */
export function picnicSeatFractions(kind: string): PicnicSeatFractions | null {
  const k = String(kind || '').toLowerCase().replace(/^pack:/, '');
  if (k !== 'picnic-table') return null;
  return {
    pose: 'sit',
    spots: [
      { dx: -PICNIC_IN_DX, dy: PICNIC_IN_DY },
      { dx: PICNIC_IN_DX, dy: PICNIC_IN_DY },
    ],
  };
}

/** True only when this build actually carries picnic seatFractions. */
export const HAS_PICNIC_SEAT_FRACTIONS = picnicSeatFractions('picnic-table') !== null;

/** Hello/join fields to advertise that capability. Empty when the fractions are absent. */
export function picnicHelloFields(): { picnic: 1 } | Record<string, never> {
  return HAS_PICNIC_SEAT_FRACTIONS ? { picnic: 1 } : {};
}

/** Capability flags sent on hello and join, next to sit:1 and baby:1. picnic:1 only when this build carries picnic seatFractions. */
export function hoodHelloCaps() {
  return { v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1, amb: 1, halloween: 1, cos: 1, needs: 1, art: 1, hb: 1, ...picnicHelloFields() };
}
