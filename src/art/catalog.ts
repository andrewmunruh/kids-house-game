// The drawing the game uses. ART_V2 in flag.ts is the one-line rollback.
import { artV2On } from './flag';
import { GENERATED } from './generated';
import { HAND } from './hand';
import { v2Mark, type V2Mark } from './v2-sample';

export type { V2Mark };

/** Approved sample drawings win, then the starter hand drawings, then the room batches. */
export function artV2Markup(kind: string): V2Mark | null {
  if (!artV2On()) return null;
  return v2Mark(kind) ?? HAND[kind] ?? GENERATED[kind] ?? null;
}
