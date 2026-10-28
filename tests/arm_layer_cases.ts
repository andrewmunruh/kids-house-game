// Every clothing item x every arm pose, as standalone SVGs (arm swing applied like the CSS does).
import { chibiSVG } from '../src/avatar/draw';
import { SIT_POSE, LIE_POSE } from '../src/avatar/sit';
import { TOP_IDS, BOTTOM_IDS, DRESS_IDS, LOOK2_DEFAULTS, type Look2 } from '../src/shared/avatar';
import { COSTUME_IDS, type CostumeId } from '../src/shared/costume';

/** CSS swing on the bare arm (sleeves keep the SVG pose), matching avatar.css / ambient.css. */
export const POSES: { name: string; poseName?: 'sit' | 'lie'; swing: number }[] = [
  { name: 'idle', swing: 0 },
  { name: 'walk', swing: 16 },          // armOutL/R end
  { name: 'sit', poseName: 'sit', swing: 0 },
  { name: 'lie', poseName: 'lie', swing: 0 },
  { name: 'dance', swing: 34 },         // ambArmL/R end (Dance Party)
  { name: 'wave', swing: -18 },         // hug/reaction pose, arms in front
  { name: 'warm', swing: 28 },          // warm-hands reaction
];

export interface Case { id: string; kind: string; item: string; pose: string; svg: string }

function items(): { kind: string; item: string; look: Look2; costume: CostumeId | null }[] {
  const base: Look2 = { ...LOOK2_DEFAULTS, skin: '#c9956c', topC: '#5aa9e6', bottomC: '#ff7aa8' };
  const out: { kind: string; item: string; look: Look2; costume: CostumeId | null }[] = [];
  for (const t of TOP_IDS) out.push({ kind: 'top', item: t, look: { ...base, top: t, dress: '' }, costume: null });
  for (const d of DRESS_IDS) if (d) out.push({ kind: 'dress', item: d, look: { ...base, dress: d, dressC: '#c9a0dc' }, costume: null });
  for (const b of BOTTOM_IDS) out.push({ kind: 'bottom', item: b, look: { ...base, bottom: b, dress: '' }, costume: null });
  for (const c of COSTUME_IDS) out.push({ kind: 'costume', item: c, look: { ...base, dress: '' }, costume: c });
  return out;
}

export function cases(): Case[] {
  const res: Case[] = [];
  for (const it of items()) for (const p of POSES) {
    const pose = p.poseName === 'sit' ? SIT_POSE : p.poseName === 'lie' ? LIE_POSE : undefined;
    let svg = chibiSVG(it.look, { uid: `t${res.length}`, rich: true, pose, poseName: p.poseName, costume: it.costume });
    if (p.swing) {
      const css = `<style>.arm.l:not(.sleeve){transform:rotate(${p.swing}deg)}.arm.r:not(.sleeve){transform:rotate(${-p.swing}deg)}</style>`;
      svg = svg.replace(/(<svg[^>]*>)/, `$1${css}`);
    }
    res.push({ id: `${it.kind}-${it.item}-${p.name}`, kind: it.kind, item: it.item, pose: p.name, svg });
  }
  return res;
}

if (process.argv[2]) {
  const fs = await import('node:fs');
  fs.writeFileSync(process.argv[2], JSON.stringify(cases()));
  console.log('wrote', cases().length);
}
