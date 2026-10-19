// Builds the side-by-side and hat grid pages. Screenshots are taken by the browser pass.
import { readFileSync, writeFileSync } from 'node:fs';
import { chibiSVG } from '../src/avatar/draw';
import { fillLook2, HAIR_IDS, ACC_IDS, accSlot, type Look2 } from '../src/shared/avatar';

const kit = '/tmp/chibi-kit/chibi/svg';
const kids: { name: string; file: string; look: Look2 }[] = [
  { name: 'Maya', file: 'kid-maya-v2.svg', look: { v: 1, hair: 'puffs', hairC: '#2a1914', skin: '#8a5634', eyes: 'round', eyeC: '#7b4fb8', blush: true, top: 'hoodie', topC: '#c6a8f0', bottom: 'skirt', bottomC: '#5b86c4', shoes: 'sneakers', shoesC: '#ffffff', acc: [] } },
  { name: 'Ivy', file: 'kid-ivy-v2.svg', look: { v: 1, hair: 'pony', hairC: '#c8602a', skin: '#f8d6bb', eyes: 'round', eyeC: '#3f9b52', freckles: true, blush: true, top: 'stripes', topC: '#ffffff', bottom: 'overalls', bottomC: '#ffd34e', shoes: 'boots', shoesC: '#ff9ec4', acc: [] } },
  { name: 'Zara', file: 'kid-zara-v2.svg', look: { v: 1, hair: 'braids', hairC: '#1d1416', skin: '#b97a50', eyes: 'round', eyeC: '#5a321c', blush: true, top: 'puff', topC: '#ff7f7f', bottom: 'tutu', bottomC: '#fffaf6', shoes: 'maryjanes', shoesC: '#2b1d24', acc: ['glasses'], accC: '#e8b84a' } },
  { name: 'Lily', file: 'kid-lily-v2.svg', look: { v: 1, hair: 'buns', hairC: '#4a2c1e', skin: '#ffe1cb', eyes: 'round', eyeC: '#8a5226', blush: true, dress: 'twirl', dressC: '#ffc2da', shoes: 'sandals', shoesC: '#ff9ec4', acc: ['headband'], accC: '#ffb3d1' } },
];

const pair = kids.map(k => {
  const approved = readFileSync(`${kit}/${k.file}`, 'utf8').replace(/\swidth="\d+"/, '').replace(/\sheight="\d+"/, '');
  const runtime = chibiSVG(fillLook2(k.look), { rich: true, uid: k.name.toLowerCase() });
  return `<div class="pair"><div><div class="lab">Runtime ${k.name}</div>${runtime}</div><div><div class="lab">Approved ${k.name}</div>${approved}</div></div>`;
}).join('');

const hats = ACC_IDS.filter(id => accSlot(id) === 'hat');
const cells = hats.map(hat => {
  const row = HAIR_IDS.map(hair => {
    const svg = chibiSVG(fillLook2({ v: 1, hair, eyes: 'round', eyeC: '#5a321c', skin: '#f1c27d', acc: [hat], accC: '#ffd166' }), { rich: true, uid: hat + hair }).replace('viewBox="0 0 200 320"', 'viewBox="20 0 160 170"');
    return `<div class="cell">${svg}<div>${hair}</div></div>`;
  }).join('');
  return `<div class="row"><div class="hat">${hat}</div>${row}</div>`;
}).join('');

const css = 'body{margin:0;background:#fff6ea;font:14px/1.2 system-ui} .pair{display:flex;gap:18px;padding:12px 16px;background:#ffe8f0} .pair svg{width:360px;height:576px;background:#fff;border-radius:18px} .lab{font-weight:800;margin:0 0 6px} #hats{padding:12px;background:#fff} .row{display:flex;gap:6px;align-items:end;margin:0 0 10px} .hat{width:72px;font-weight:800} .cell{width:78px;text-align:center;font-size:10px} .cell svg{width:78px;height:84px;background:#fff;border-radius:10px}';
writeFileSync('/tmp/avatar-proof.html', `<!doctype html><meta charset="utf-8"><style>${css}</style><div id="compare">${pair}</div><div id="hats">${cells}</div>`);
console.log('wrote /tmp/avatar-proof.html');
