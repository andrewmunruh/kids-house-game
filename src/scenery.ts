// View-only room dressing. Nothing here is written into the house save.
// An empty room gets a rug, a lamp, and a plant. A room with no window or curtains gets a window.

import { initialState } from './shared/state';

const O = '#5a3d5c';
const s = `stroke="${O}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;

const CURTAIN: Record<string, string> = {
  living: '#ff8fab', bedroom: '#c9a0dc', kitchen: '#8fd6a6', salon: '#f0a0d8', nursery: '#9ad7f5', bathroom: '#7ec8d6', backyard: '#80ed99',
};

function windowSVG(room: string) {
  const curtain = CURTAIN[room] ?? '#ffb3c6';
  return `<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${s}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${s}/>
    <path d="M80 30 V118 M28 74 H132" ${s} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${O}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${s} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${s} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${curtain}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${curtain}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${s}/>
  </svg></div>`;
}

function startersSVG() {
  return `<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
    <ellipse cx="100" cy="48" rx="92" ry="24" fill="#ffc8dd" ${s}/>
    <ellipse cx="100" cy="48" rx="64" ry="15" fill="#bde0fe" ${s} stroke-width="3"/>
    <ellipse cx="100" cy="48" rx="28" ry="7" fill="#fff6ea"/>
  </svg></div>
  <div class="sceneLamp" aria-hidden="true"><svg viewBox="0 0 80 160">
    <path d="M18 52 L30 8 H50 L62 52 Z" fill="#ffd166" ${s}/>
    <rect x="36" y="52" width="8" height="78" rx="4" fill="#c9a0dc" ${s}/>
    <ellipse cx="40" cy="136" rx="26" ry="8" fill="#b388d6" ${s}/>
    <circle cx="34" cy="28" r="4" fill="#fff" opacity=".8"/>
  </svg></div>
  <div class="scenePlant" aria-hidden="true"><svg viewBox="0 0 90 140">
    <path d="M45 128 C45 90 18 78 20 48 C40 58 44 80 45 128" fill="#5cc985" ${s}/>
    <path d="M45 128 C45 92 74 70 78 40 C58 54 50 82 45 128" fill="#80ed99" ${s}/>
    <path d="M45 128 C40 96 28 88 22 70" fill="none" stroke="#3d9a62" stroke-width="3"/>
    <path d="M30 132 H62 L56 118 H36 Z" fill="#e07a5f" ${s}/>
    <ellipse cx="46" cy="126" rx="16" ry="5" fill="#c4634a"/>
  </svg></div>`;
}

/** Real rug, lamp, and plant for the first thing placed in an empty indoor room. The yard does not gain those on the first drop. */
export function emptyRoomStarters(makeId: (kind: string) => string, room?: string): { id: string; kind: string; x: number; y: number; flip: false; z: number; scale: number }[] {
  if (room === 'backyard') return [];
  return [
    { id: makeId('rug'), kind: 'rug', x: 1152, y: 540, flip: false, z: 0, scale: 1 },
    { id: makeId('lamp'), kind: 'lamp', x: 804, y: 470, flip: false, z: 0, scale: 1 },
    { id: makeId('plant'), kind: 'plant', x: 1584, y: 480, flip: false, z: 0, scale: 1 },
  ];
}

let sig = '';

/** Preview-only. Return a full scenery string to replace the indoor dressing, or null to keep it. */
type SceneryCustom = (room: string, items: { kind: string }[]) => string | null;
let custom: SceneryCustom | null = null;
export function setRoomScenery(fn: SceneryCustom | null) {
  custom = fn;
  sig = '';
}

export function syncScenery(root: HTMLElement, room: string, items: { kind: string }[]) {
  const extra = custom?.(room, items);
  if (extra != null) {
    const next = 'custom|' + room;
    if (next === sig && root.childElementCount) return;
    sig = next;
    root.innerHTML = extra;
    root.dataset.room = room;
    return;
  }
  if (room === 'backyard') {
    const next = 'yard|' + room;
    if (next === sig && root.childElementCount) return;
    sig = next;
    root.innerHTML = '';
    root.dataset.room = room;
    return;
  }
  const empty = items.length === 0;
  const hasWindow = items.some(i => /window|curtain/i.test(i.kind));
  const next = room + (empty ? '|e' : '') + (hasWindow ? '|w' : '');
  if (next === sig && root.childElementCount) return;
  sig = next;
  root.innerHTML = (hasWindow ? '' : windowSVG(room)) + (empty ? startersSVG() : '');
  root.dataset.room = room;
}

/** Room shells: 'room-<id>' (assets/art/scene/room-<id>.webp) while the room still has its
    starting wall and floor. A wallpaper, floor, pattern or tile she picked always wins, so the
    vector shell (her choice) draws and the painting stays off. The backyard paints its outdoor scene. */
let defaults: ReturnType<typeof initialState>['rooms'] | null = null;
type Shell = { wallpaper: string; floor: string; pattern: number; wallTile?: string | null; floorTile?: string | null };
export function roomSceneArt(room: string, r: Shell): string | null {
  if (room === 'backyard') return 'backyard'; // the yard has no wallpaper/floor pick: always its painting
  defaults ??= initialState().rooms;
  const d = (defaults as Record<string, Shell>)[room];
  if (!d || r.wallTile || r.floorTile) return null;
  if (r.wallpaper.toLowerCase() !== d.wallpaper.toLowerCase() || r.floor.toLowerCase() !== d.floor.toLowerCase() || r.pattern !== d.pattern) return null;
  return 'room-' + room;
}
