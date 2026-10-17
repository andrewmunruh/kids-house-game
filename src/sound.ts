let ctx: AudioContext | null = null;
export let soundEnabled = true;
export const setSound = (on: boolean) => { soundEnabled = on; };
function tone(freq: number, dur: number, type: OscillatorType = 'sine', slide = 0, vol = 0.15) {
  if (!soundEnabled) return;
  try {
    ctx ??= new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(freq * slide, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + dur);
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
  sparkle: () => [880, 1100, 1320].forEach((f, i) => setTimeout(() => tone(f, 0.12), i * 70)),
};
