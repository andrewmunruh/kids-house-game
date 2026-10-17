// Rainbow Ranch: pure rules shared by the server (street play) and the solo reducer.
// Garden plots are shared per street; each kid has her own basket (eggs, carrots, flowers).
export const RANCH_W = 3600;
export const RANCH_Y0 = 470, RANCH_Y1 = 590;          // where kids can walk
export const ANIMALS = ['goat', 'sheep', 'piglet', 'chicks', 'bunny', 'cow'] as const;
export const ANIMAL_X = [1085, 1215, 1345, 1470, 1600, 1735];
export const ANIMAL_Y = 520;
export const PEN = { x0: 1000, x1: 1840 };
/** The barn interior (its own scene): the petting zoo lives inside, with the feed buckets by the door. */
export const BARN_W = 1900;
export const BARN_ANIMAL_X = [600, 800, 1000, 1200, 1400, 1600];
export const BARN_DOOR_X = 435; // where you come out in the yard (the barn's big door)
export const HORSES = ['Chestnut', 'Snowy', 'Midnight', 'Sunny', 'Rainbow'] as const;
export const HORSE_X = [2470, 2600, 2730, 2860, 2990];
export const HORSE_Y = 540;
export const FOODS = ['pet', 'carrot', 'apple', 'hay'] as const; // fx food index (0 = a pat)
export const PLOTS = 6;
export const PLOT_X = (i: number) => 3175 + i * 68;
export const PLOT_Y = 560;
export const GROW_MS = 80_000;                          // about 1.5 minutes after watering
export const BASKET_MAX = 20;
export const EGG_COOLDOWN = 1500;
export type Seed = 'carrot' | 'flower';
export interface Plot { seed: Seed; at: number; wet: number }
export type Basket = { egg: number; carrot: number; flower: number };
export type BasketKind = keyof Basket;
export const BASKET_KINDS: BasketKind[] = ['egg', 'carrot', 'flower'];
/** What a basket item becomes when she puts it in her room (catalog kinds in items.ts). */
export const BASKET_ITEM: Record<BasketKind, string> = { egg: 'ranch-egg', carrot: 'ranch-carrot', flower: 'ranch-bouquet' };

export const emptyBasket = (): Basket => ({ egg: 0, carrot: 0, flower: 0 });
const int = (v: unknown, lo: number, hi: number) => (Number.isInteger(v) && (v as number) >= lo && (v as number) <= hi ? (v as number) : null);
export function cleanBasket(b: any): Basket {
  const o = emptyBasket(); if (!b || typeof b !== 'object') return o;
  for (const k of BASKET_KINDS) o[k] = int(b[k], 0, BASKET_MAX) ?? 0;
  return o;
}
export function cleanPlots(p: any): (Plot | null)[] {
  const out: (Plot | null)[] = Array(PLOTS).fill(null);
  if (Array.isArray(p)) for (let i = 0; i < PLOTS; i++) {
    const x = p[i]; if (!x || (x.seed !== 'carrot' && x.seed !== 'flower')) continue;
    const at = Number(x.at), wet = Number(x.wet);
    if (Number.isFinite(at) && Number.isFinite(wet)) out[i] = { seed: x.seed, at, wet };
  }
  return out;
}
/** 0 = seeds (needs water), 1 = sprout, 2 = growing, 3 = ready to pick */
export function plotStage(p: Plot | null, now: number): 0 | 1 | 2 | 3 {
  if (!p || !p.wet) return 0;
  const f = (now - p.wet) / GROW_MS; return f >= 1 ? 3 : f >= 0.4 ? 2 : 1;
}

export type RanchOp =
  | { op: 'plant'; i: number; seed: Seed } | { op: 'water'; i: number } | { op: 'pick'; i: number }
  | { op: 'egg' } | { op: 'use'; kind: 'carrot' }
  | { op: 'take'; kind: BasketKind; id: string; room: string; x: number };
export function cleanRanchOp(o: any): RanchOp | null {
  if (!o || typeof o !== 'object') return null;
  const i = int(o.i, 0, PLOTS - 1);
  switch (o.op) {
    case 'plant': return i !== null && (o.seed === 'carrot' || o.seed === 'flower') ? { op: 'plant', i, seed: o.seed } : null;
    case 'water': case 'pick': return i !== null ? { op: o.op, i } : null;
    case 'egg': return { op: 'egg' };
    case 'use': return o.kind === 'carrot' ? { op: 'use', kind: 'carrot' } : null;
    case 'take': {
      if (!BASKET_KINDS.includes(o.kind) || typeof o.id !== 'string' || !/^[A-Za-z0-9_-]{1,40}$/.test(o.id) || typeof o.room !== 'string') return null;
      const x = Number(o.x); if (!Number.isFinite(x)) return null;
      return { op: 'take', kind: o.kind, id: o.id, room: o.room.slice(0, 20), x: Math.max(80, Math.min(2320, x)) };
    }
  }
  return null;
}
export interface RanchResult { plots: (Plot | null)[]; basket: Basket; garden: boolean; got?: BasketKind }
/** Apply one ranch interaction. Returns the new garden + basket, or a reason it can't happen. */
export function ranchApply(plots: (Plot | null)[], basket: Basket, o: RanchOp, now: number, lastEgg = 0): RanchResult | string {
  const P = plots.slice(), B = { ...basket };
  switch (o.op) {
    case 'plant': if (P[o.i]) return 'taken'; P[o.i] = { seed: o.seed, at: now, wet: 0 }; return { plots: P, basket: B, garden: true };
    case 'water': { const p = P[o.i]; if (!p) return 'empty'; if (p.wet) return 'wet'; P[o.i] = { ...p, wet: now }; return { plots: P, basket: B, garden: true }; }
    case 'pick': {
      const p = P[o.i]; if (!p) return 'empty'; if (plotStage(p, now) < 3) return 'notReady';
      if (B[p.seed] >= BASKET_MAX) return 'full';
      B[p.seed]++; P[o.i] = null; return { plots: P, basket: B, garden: true, got: p.seed };
    }
    case 'egg': if (now - lastEgg < EGG_COOLDOWN) return 'slow'; if (B.egg >= BASKET_MAX) return 'full'; B.egg++; return { plots: P, basket: B, garden: false, got: 'egg' };
    case 'use': if (B.carrot <= 0) return 'none'; B.carrot--; return { plots: P, basket: B, garden: false };
    case 'take': if (B[o.kind] <= 0) return 'none'; B[o.kind]--; return { plots: P, basket: B, garden: false };
  }
}
