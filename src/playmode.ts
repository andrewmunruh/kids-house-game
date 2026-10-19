// Play vs Decorate. Remembered on this iPad only (never sent to the street).
import { storeKey } from './shared/storekey';

export type HouseMode = 'play' | 'decorate';

const KEY = () => storeKey('cozy-play');

export function loadOwnMode(): HouseMode {
  try { return localStorage.getItem(KEY()) === 'play' ? 'play' : 'decorate'; } catch { return 'decorate'; }
}
export function saveOwnMode(m: HouseMode) {
  try { localStorage.setItem(KEY(), m); } catch { /* private mode */ }
}

/** Decorate is today's dragging. Play never moves, picks up, or deletes furniture. */
export function dragAllowed(mode: HouseMode): boolean { return mode === 'decorate'; }

export type PlayGesture = 'wiggle' | 'lamp' | 'open' | 'sit' | 'kennel' | 'tower';

/** Which tap a piece of furniture gets in Play. Kennel and the cat tower keep the interactions they already had. */
export function playGesture(kind: string): PlayGesture {
  if (kind === 'kennel') return 'kennel';
  if (kind === 'cat-tower') return 'tower';
  if (kind === 'lamp' || /(^|:)lamp|starlamp|light/.test(kind)) return 'lamp';
  if (kind === 'fridge' || kind === 'stove' || kind === 'vanity' || kind === 'bookshelf' || kind === 'window' || kind === 'mirror' || kind === 'tv'
    || /fridge|stove|cabinet|drawer|vanity/.test(kind)) return 'open';
  if (kind === 'sofa' || kind === 'armchair' || kind === 'chair' || kind === 'stool' || kind === 'bed' || kind === 'crib'
    || /(sofa|armchair|chair|stool|bench)/.test(kind)) return 'sit';
  return 'wiggle';
}

const HAND = `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>`;
const BRUSH = `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>`;

export function installPlayMode(root: HTMLElement, opts: { ownHouse: () => boolean; onChange?: () => void }): {
  mode: () => HouseMode;
  isPlay: () => boolean;
  /** Call when she enters a house. A friend's house starts in Play. Her own house uses the last choice. */
  sync: (own: boolean) => void;
} {
  let mode: HouseMode = 'decorate';
  const playBtn = root.querySelector<HTMLButtonElement>('#modePlay')!;
  const decoBtn = root.querySelector<HTMLButtonElement>('#modeDecorate')!;
  playBtn.querySelector('.modeIco')!.innerHTML = HAND;
  decoBtn.querySelector('.modeIco')!.innerHTML = BRUSH;
  const paint = () => {
    const play = mode === 'play';
    document.body.classList.toggle('mode-play', play);
    playBtn.classList.toggle('on', play);
    decoBtn.classList.toggle('on', !play);
    playBtn.setAttribute('aria-pressed', play ? 'true' : 'false');
    decoBtn.setAttribute('aria-pressed', play ? 'false' : 'true');
  };
  const set = (next: HouseMode, persist: boolean) => {
    mode = next;
    if (persist) saveOwnMode(next);
    paint();
    opts.onChange?.();
  };
  root.addEventListener('pointerdown', e => e.stopPropagation());
  root.addEventListener('click', e => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-mode]');
    if (!b) return;
    const next = b.dataset.mode === 'play' ? 'play' : 'decorate';
    set(next, opts.ownHouse());
  });
  paint();
  return {
    mode: () => mode,
    isPlay: () => mode === 'play',
    sync(own: boolean) { set(own ? loadOwnMode() : 'play', false); },
  };
}
