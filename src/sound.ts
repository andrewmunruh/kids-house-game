let ctx: AudioContext | null = null;
export let soundEnabled = true;
export const setSound = (on: boolean) => { soundEnabled = on; };
function tone(freq: number, dur: number, type: OscillatorType = 'sine', slide = 0, vol = 0.15) {
  if (!soundEnabled) return;
  try {
    ctx ??= new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === 'suspended') void ctx.resume().catch(() => {});
    const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
    const f = Math.max(40, freq * (0.94 + Math.random() * 0.12));
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, f * slide), t + dur);
    const attack = Math.min(0.02, Math.max(0.008, dur * 0.22));
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t + attack);
    g.gain.exponentialRampToValueAtTime(0.001, t + Math.max(dur, attack + 0.02));
    if (type === 'square' || type === 'sawtooth') {
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.setValueAtTime(1400, t); filter.Q.setValueAtTime(0.7, t);
      o.connect(filter).connect(g).connect(ctx.destination);
    } else o.connect(g).connect(ctx.destination);
    o.start(t); o.stop(t + dur + 0.02);
  } catch {}
}
export const sfx = {
  pick: () => tone(520, 0.12, 'sine', 1.6),
  drop: () => { tone(380, 0.1, 'triangle', 0.7); setTimeout(() => tone(620, 0.08, 'sine'), 60); },
  pop: () => tone(800, 0.15, 'square', 0.3, 0.08),
  click: () => tone(660, 0.07, 'triangle'),
  swish: () => tone(300, 0.25, 'sine', 2.5, 0.1),
  meow: () => { tone(700, 0.12, 'triangle', 1.3, 0.1); setTimeout(() => tone(900, 0.22, 'triangle', 0.6, 0.1), 110); },
  purr: () => [0, 90, 180, 270, 360].forEach(d => setTimeout(() => tone(70, 0.09, 'sawtooth', 1, 0.05), d)),
  woof: () => { tone(260, 0.09, 'square', 0.6, 0.09); setTimeout(() => tone(220, 0.12, 'square', 0.5, 0.09), 130); },
  spin: () => tone(400, 0.35, 'sine', 2.2, 0.08),
  boing: () => tone(200, 0.3, 'sine', 3, 0.1),
  splash: () => [0, 50, 110].forEach((d, i) => setTimeout(() => tone(900 - i * 200, 0.12, 'triangle', 0.4, 0.06), d)),
  moo: () => { tone(160, 0.5, 'sawtooth', 0.8, 0.07); setTimeout(() => tone(140, 0.45, 'sawtooth', 0.85, 0.06), 380); },
  baa: () => [0, 90, 180].forEach(d => setTimeout(() => tone(420, 0.1, 'sawtooth', 0.95, 0.05), d)),
  bleat: () => [0, 70, 140, 210].forEach(d => setTimeout(() => tone(520, 0.07, 'square', 1.05, 0.04), d)),
  oink: () => { tone(300, 0.12, 'square', 0.6, 0.07); setTimeout(() => tone(330, 0.12, 'square', 0.55, 0.07), 160); },
  peep: () => [0, 120, 240].forEach((d, i) => setTimeout(() => tone(1800 + i * 150, 0.07, 'sine', 1.2, 0.08), d)),
  squeak: () => tone(1400, 0.1, 'sine', 1.5, 0.08),
  neigh: () => { tone(700, 0.5, 'sawtooth', 0.6, 0.05); [0, 60, 120, 180, 240].forEach(d => setTimeout(() => tone(620 - d, 0.06, 'triangle', 1, 0.04), 300 + d)); },
  honk: () => { tone(330, 0.18, 'square', 1, 0.07); setTimeout(() => tone(330, 0.25, 'square', 1, 0.07), 230); },
  munch: () => [0, 110, 220, 330].forEach(d => setTimeout(() => tone(180 + Math.random() * 60, 0.05, 'square', 0.6, 0.05), d)),
  cluck: () => [0, 100, 180].forEach((d, i) => setTimeout(() => tone(600 + i * 80, 0.06, 'square', 0.8, 0.05), d)),
  plant: () => { tone(260, 0.1, 'triangle', 0.6); setTimeout(() => tone(520, 0.1, 'sine'), 90); },
  water: () => [0, 60, 120, 180, 240].forEach((d, i) => setTimeout(() => tone(1200 - i * 120, 0.08, 'sine', 0.7, 0.05), d)),
  pickup: () => [660, 880, 990].forEach((f, i) => setTimeout(() => tone(f, 0.1, 'triangle'), i * 60)),
  sparkle: () => [880, 1100, 1320].forEach((f, i) => setTimeout(() => tone(f, 0.12), i * 70)),
};
