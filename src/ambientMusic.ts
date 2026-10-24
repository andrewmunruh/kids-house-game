// Soft procedural lullaby for a stereo or music box that is on in the current room.
// ORIGINAL: generated live with WebAudio oscillators (no samples, no recordings). See AUDIO_LICENSES.md.
// Respects the sound toggle: nothing plays while sound is off.
import { soundEnabled } from './sound';
import { BEAT_MS } from './shared/ambient';

export type MusicKind = 'stereo' | 'musicbox' | null;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let kind: MusicKind = null;
let timer: ReturnType<typeof setInterval> | null = null;
let nextT = 0;     // audio time of the next eighth note
let step = 0;      // eighth-note counter, anchored to the wall clock so iPads roughly agree

// C major pentatonic, two octaves. Indexes into this make every phrase consonant.
const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];
// Four gentle phrases (scale index, or -1 for a rest), eight eighth notes each. Original.
const PHRASES = [
  [4, -1, 5, 4, 2, -1, 3, -1],
  [2, 3, 4, -1, 3, 2, 0, -1],
  [5, -1, 7, 6, 5, -1, 4, -1],
  [3, 2, 1, -1, 2, -1, 0, -1],
];
const BASS = [130.81, 98.0, 110.0, 98.0]; // C2-ish, G, A, G: one per phrase

function ensure(): boolean {
  try {
    ctx ??= new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!master) { master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination); }
    if (ctx.state === 'suspended') void ctx.resume().catch(() => {});
    return true;
  } catch { return false; }
}

function note(freq: number, t: number, dur: number, type: OscillatorType, vol: number) {
  if (!ctx || !master) return;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0005, t + dur);
  o.connect(g).connect(master);
  o.start(t); o.stop(t + dur + 0.05);
}

function tick() {
  if (!ctx || !kind) return;
  if (!soundEnabled || document.hidden) { nextT = ctx.currentTime + 0.1; return; }
  const eighth = BEAT_MS / 2000 * (kind === 'musicbox' ? 1.35 : 1);
  if (nextT < ctx.currentTime) nextT = ctx.currentTime + 0.05;
  while (nextT < ctx.currentTime + 0.4) {
    const phrase = Math.floor(step / 8) % PHRASES.length, i = step % 8;
    const idx = PHRASES[phrase][i];
    if (kind === 'musicbox') {
      if (idx >= 0) note(SCALE[Math.min(SCALE.length - 1, idx + 3)] * 2, nextT, 0.9, 'sine', 0.05);
    } else {
      if (idx >= 0) note(SCALE[idx], nextT, 0.5, 'triangle', 0.045);
      if (i === 0) note(BASS[phrase], nextT, 1.6, 'sine', 0.06);
      if (i === 4) note(BASS[phrase] * 1.5, nextT, 1.0, 'sine', 0.035);
    }
    step++; nextT += eighth;
  }
}

/** Play the lullaby for the loudest powered thing in view, or stop. Safe to call often. */
export function setAmbientMusic(next: MusicKind) {
  if (next === kind) return;
  kind = next;
  if (!kind) {
    if (timer) { clearInterval(timer); timer = null; }
    if (master && ctx) { const g = master.gain; g.cancelScheduledValues(ctx.currentTime); g.setValueAtTime(g.value, ctx.currentTime); g.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4); }
    return;
  }
  if (!ensure() || !ctx || !master) return;
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setValueAtTime(0.5, ctx.currentTime + 0.42);
  step = Math.floor(Date.now() / (BEAT_MS / 2)) % (PHRASES.length * 8);
  nextT = ctx.currentTime + 0.45;
  if (!timer) timer = setInterval(tick, 120);
}
/** Call from a user tap: iOS only lets audio start inside a gesture. */
export function primeAmbientMusic() { ensure(); }
