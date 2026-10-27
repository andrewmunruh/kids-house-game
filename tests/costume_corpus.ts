// Shared corpus: every SVG an avatar can draw without a costume. Run in an old tree and here; output must match byte for byte.
import { characterSVG, cradleFrontSVG } from '../src/character';
import { randomLook2 } from '../src/shared/avatar';
export function corpus(): string[] {
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const out: string[] = [];
  for (let i = 0; i < 24; i++) {
    const look2 = randomLook2(rnd as never);
    const c = { skin: '#f1c27d', hair: '#5b3a29', hairStyle: i % 4, shirt: '#ff7aa8', pants: '#5aa9e6', acc: i % 3, look2 };
    for (const p of [null, 'sit', 'lie'] as const) for (const h of [false, true]) out.push(characterSVG(c, p, h));
    for (const p of [null, 'sit', 'lie'] as const) out.push(String((cradleFrontSVG as (...a: unknown[]) => unknown)(c, p)));
    out.push(characterSVG({ ...c, look2: null }, null, false));
  }
  return out;
}
