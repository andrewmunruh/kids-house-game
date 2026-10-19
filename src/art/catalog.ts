// The drawing the game uses. ART_V2 in flag.ts is the one-line rollback.
// Room drawings load on demand so the first script stays about the size it was
// before the catalog refresh. Hand and sample pieces are small and stay eager.
import { artV2On } from './flag';
import { FIT } from './fit';
import { HAND } from './hand';
import { v2Mark, type V2Mark } from './v2-sample';

export type { V2Mark };

const cache = new Map<string, V2Mark>();
const pending = new Map<string, Promise<void>>();

const LOADERS: Record<string, () => Promise<Record<string, V2Mark>>> = {
  living: () => import('./generated/living').then(m => m.LIVING),
  bedroom: () => import('./generated/bedroom').then(m => m.BEDROOM),
  kitchen: () => import('./generated/kitchen').then(m => m.KITCHEN),
  salon: () => import('./generated/salon').then(m => m.SALON),
  nursery: () => import('./generated/nursery').then(m => m.NURSERY),
  backyard: () => import('./generated/backyard').then(m => m.BACKYARD),
  any: () => import('./generated/any').then(m => m.ANY),
  ranch: () => import('./generated/ranch').then(m => m.RANCH),
};

export const ART_ROOMS = Object.keys(LOADERS);

export function loadArtRoom(room: string): Promise<void> {
  if (!LOADERS[room]) return Promise.resolve();
  const have = pending.get(room);
  if (have) return have;
  const job = LOADERS[room]().then(marks => {
    for (const [k, v] of Object.entries(marks)) cache.set(k, v);
  });
  pending.set(room, job);
  return job;
}

/** Load the rooms a visit needs. Repeated calls share one import per room. */
export function loadArtRooms(rooms: readonly string[]): Promise<void> {
  return Promise.all(rooms.map(loadArtRoom)).then(() => undefined);
}

function fitted(kind: string, mark: V2Mark): V2Mark {
  const f = FIT[kind];
  if (!f) return mark;
  const tx = f[0], ty = f[1], sx = f[2], sy = f[3];
  // Contact shadows stay on the floor line. Scaling them with the drawing
  // would shove the faint ellipse out of the viewBox.
  const shadows: string[] = [];
  const body = mark.body.replace(/<ellipse\b[^>]*opacity="0?\.(?:0\d*|1[0-4]\d*)"[^>]*\/?>/gi, tag => {
    shadows.push(tag);
    return '';
  });
  return { vb: mark.vb, body: `${shadows.join('')}<g transform="translate(${tx} ${ty}) scale(${sx} ${sy})">${body}</g>` };
}

/** Approved sample drawings win, then the starter hand drawings, then the room batches. */
export function artV2Markup(kind: string): V2Mark | null {
  if (!artV2On()) return null;
  const mark = v2Mark(kind) ?? HAND[kind] ?? cache.get(kind) ?? null;
  return mark ? fitted(kind, mark) : null;
}
