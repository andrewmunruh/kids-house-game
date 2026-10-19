// Whole-catalog art: footprints stay put, old saves still migrate, the drawings stay light.
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { ART_ROOMS, artV2Markup, loadArtRooms } from '../src/art/catalog';

await loadArtRooms(ART_ROOMS);
import { setArtV2, setArtV2FromSearch, ART_V2 } from '../src/art/flag';
import { migrate } from '../src/shared/state';
import { PROTOCOL } from '../src/shared/hood';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else process.exitCode = 1;
};

const show = (rev: string, path: string) => execSync(`git show ${rev}:${path}`, { encoding: 'utf8' });
const widths = (src: string) => {
  const out: Record<string, string> = {};
  const re = /kind: '([^']+)'[\s\S]{0,220}?\bw: (\d+(?:\.\d+)?)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) out[m[1]] = m[2];
  return out;
};

const oldSrc = show('57da467', 'src/items.ts') + show('57da467', 'src/nursery.ts') + show('57da467', 'src/eggs.ts');
const nowSrc = readFileSync('src/items.ts', 'utf8') + readFileSync('src/nursery.ts', 'utf8') + readFileSync('src/eggs.ts', 'utf8');
const oldW = widths(oldSrc);
const nowW = widths(nowSrc);
const kinds = Object.keys(oldW).sort();
check('every 57da467 kind is still in the catalog', kinds.length > 40 && kinds.every(k => nowW[k] != null));
check('widths match 57da467', kinds.every(k => nowW[k] === oldW[k]), kinds.filter(k => nowW[k] !== oldW[k]).join(','));

const oldMan = JSON.parse(show('57da467', 'assets/items/manifest.json')) as { slug: string; gameW?: number; viewBox?: number[]; wall?: boolean; heightUnits?: number; widthUnits?: number }[];
const nowMan = JSON.parse(readFileSync('assets/items/manifest.json', 'utf8')) as typeof oldMan;
const oldBy = Object.fromEntries(oldMan.map(e => [e.slug, e]));
let vbSame = true;
let wSame = true;
const vbBad: string[] = [];
for (const e of nowMan) {
  const o = oldBy[e.slug];
  if (!o) { wSame = false; vbBad.push('new ' + e.slug); continue; }
  if (o.gameW !== e.gameW || o.widthUnits !== e.widthUnits || o.heightUnits !== e.heightUnits || o.wall !== e.wall) wSame = false;
  if (JSON.stringify(o.viewBox) !== JSON.stringify(e.viewBox)) { vbSame = false; vbBad.push(e.slug); }
}
check('pack footprints match 57da467', wSame && nowMan.length === oldMan.length);
check('pack viewBoxes match 57da467', vbSame, vbBad.slice(0, 6).join(','));

const PETS = new Set(['cat', 'dog', 'bunny', 'fish', 'kennel', 'cat-tower']);
setArtV2(true);
const files = readdirSync('src/art/generated').filter(f => f.endsWith('.ts') && f !== 'index.ts');
const marks: Record<string, { vb: string; body: string }> = {};
for (const f of files) {
  const raw = readFileSync('src/art/generated/' + f, 'utf8');
  const json = raw.slice(raw.indexOf('=') + 1).replace(/;\s*$/, '');
  Object.assign(marks, JSON.parse(json));
}
let missing = 0;
let blur = 0;
let dark = 0;
const darkNames: string[] = [];
function lin(c: number) { const x = c / 255; return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }
function luma(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
}
const packPets = new Set(nowMan.filter(e => (e as { category?: string }).category === 'pets').map(e => 'pack:' + e.slug));
for (const k of Object.keys(nowW)) {
  if (PETS.has(k) || packPets.has(k)) {
    if (artV2Markup(k)) { missing++; darkNames.push('pet ' + k); }
    continue;
  }
  const mark = artV2Markup(k);
  if (!mark) { missing++; darkNames.push(k); continue; }
  if (/feGaussianBlur|feDropShadow|<filter|filter=/.test(mark.body)) blur++;
  const fills = mark.body.match(/fill="#([0-9a-fA-F]{6})"/g) || [];
  for (const f of fills) {
    const hex = f.slice(6, 13);
    if (hex.toLowerCase() === '#5a3d5c') continue;
    if (luma(hex) < 0.12) { dark++; if (darkNames.length < 8) darkNames.push(k + ' ' + hex); }
  }
}
check('every non-pet item has a v2 drawing', missing === 0, darkNames.slice(0, 8).join(','));
check('no blur filters', blur === 0);
check('fills stay light enough for a night tint', dark === 0, darkNames.join(','));
setArtV2FromSearch('');

const banned = /findLast|toSorted|toReversed|toSpliced|structuredClone/;
const artFiles = readdirSync('src/art').filter(f => f.endsWith('.ts'));
let unsafe = '';
for (const f of artFiles) {
  const t = readFileSync('src/art/' + f, 'utf8');
  if (banned.test(t)) unsafe += f + ' ';
}
check('art code stays on the Safari 16 syntax', unsafe === '', unsafe);
check('protocol stays 4', PROTOCOL === 4);
check('the one-line switch is a boolean', typeof ART_V2 === 'boolean');

const placed = (kind: string, x: number, y: number, z: number) =>
  ({ id: kind + z, kind, x, y, flip: false, z, scale: 1 });
const baseChar = { id: 'c1', skin: '#f1c27d', hair: '#5b3a29', hairStyle: 0, shirt: '#ff7aa8', pants: '#5aa9e6', size: 'kid' as const, acc: 0, room: 'living' as const, x: 400, y: 540, flip: false, held: { left: null, right: null } };
const save27 = {
  version: 3, houseId: 'from-27cfcac', currentRoom: 'living' as const, soundOn: true,
  rooms: {
    living: { wallpaper: '#ffd6e0', floor: '#e8b98a', pattern: 1, items: [placed('sofa', 470, 470, 1), placed('lamp', 230, 470, 2)] },
    bedroom: { wallpaper: '#d9ccff', floor: '#f2d0a4', pattern: 2, items: [placed('bed', 450, 480, 1)] },
    kitchen: { wallpaper: '#cdf3dc', floor: '#ffe7a8', pattern: 3, items: [placed('fridge', 200, 470, 1)] },
    salon: { wallpaper: '#ffe0f0', floor: '#f6d6ff', pattern: 2, items: [placed('vanity', 470, 480, 2)] },
  },
  characters: [baseChar],
};
const m27 = migrate(save27);
check('a 27cfcac house keeps its sofa and gains the nursery',
  m27.version === 3 && m27.rooms.living.items.some(i => i.kind === 'sofa' && i.x === 470) && m27.rooms.nursery.items.map(i => i.kind).join(',') === 'cloud-rug,crib,crib-mobile,rocker' && m27.rooms.backyard.items.length === 0);

const saveF = {
  ...save27,
  houseId: 'from-fbd04db',
  rooms: {
    ...save27.rooms,
    nursery: { wallpaper: '#d6f3ff', floor: '#f3ddc4', pattern: 1, items: [placed('doll-rose', 30, 40, 2)] },
    backyard: { wallpaper: '#c5ecff', floor: '#b6e3a8', pattern: 0, items: [placed('rug', 100, 500, 1)] },
  },
};
const mF = migrate(saveF);
check('an fbd04db house keeps a custom nursery and a backyard rug',
  mF.rooms.nursery.items.length === 1 && mF.rooms.nursery.items[0].kind === 'doll-rose' && mF.rooms.backyard.items[0].kind === 'rug' && mF.rooms.living.items.some(i => i.kind === 'lamp'));

const bench = JSON.parse(readFileSync('docs/art-catalog/bench.json', 'utf8'));
const after80 = bench.items80.after;
check('80-item pan stays at 60fps', after80.p95 <= 20 && after80.p50 <= 18, JSON.stringify(after80));
check('80-item layer build stays under one frame', after80.build < 16.7, String(after80.build));

const VOID = new Set(['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'stop', 'use', 'image']);
function lintSvg(kind: string, body: string): string {
  const stack: string[] = [];
  const re = /<\/?([a-zA-Z][\w:-]*)\b[^>]*\/?>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    const raw = m[0];
    const name = m[1].toLowerCase();
    if (raw.endsWith('/>') || VOID.has(name)) continue;
    if (raw.startsWith('</')) {
      const open = stack.pop();
      if (open !== name) return kind + ' expected </' + open + '> found </' + name + '>';
    } else stack.push(name);
  }
  if (stack.length) return kind + ' unclosed <' + stack[stack.length - 1] + '>';
  if ((body.match(/<text\b/g) || []).length !== (body.match(/<\/text>/g) || []).length) return kind + ' text';
  return '';
}
setArtV2(true);
const lintBad: string[] = [];
for (const k of Object.keys(nowW)) {
  if (PETS.has(k) || packPets.has(k)) continue;
  const mark = artV2Markup(k);
  if (!mark) continue;
  const msg = lintSvg(k, mark.body);
  if (msg) lintBad.push(msg);
}
check('svg markup is well formed', lintBad.length === 0, lintBad.slice(0, 6).join('; '));

const py = ['/tmp/pwvenv/bin/python', '/workspace/.pwvenv/bin/python'].find(p => { try { execSync(`test -x ${p}`); return true; } catch { return false; } });
check('placement measurer is available', !!py, 'playwright python');
if (py) {
  execSync('node scripts/dump-art-pairs.mjs', { stdio: 'inherit' });
  const pairs = JSON.parse(readFileSync('/tmp/art-pairs.json', 'utf8')).filter((p: { v1?: string }) => p.v1);
  const measured = JSON.parse(execSync(`${py} tests/measure_place.py`, { input: JSON.stringify(pairs), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }));
  const bad = measured.bad as { kind: string; dax: number; day: number; dw: number; dh: number; out: boolean }[];
  const drift = bad.filter(r => r.dax > 0.04 || r.day > 0.04 || r.dw > 0.12 || r.dh > 0.12);
  const spilled = bad.filter(r => r.out);
  check('ink anchor and size match fbd04db', drift.length === 0 && measured.checked > 200,
    drift.slice(0, 8).map(r => `${r.kind} a${r.day.toFixed(2)} w${r.dw.toFixed(2)} h${r.dh.toFixed(2)}`).join(', ') + ` checked ${measured.checked}`);
  check('svg stays inside its viewBox', spilled.length === 0, spilled.slice(0, 8).map(r => r.kind).join(','));
}

console.log(pass + ' passed');
