// Footprints and ink stay on the fbd04db drawings. Measured fresh, not from a saved file.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { PROTOCOL } from '../src/shared/hood';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else process.exitCode = 1;
};

const show = (path: string) => execSync(`git show fbd04db:${path}`, { encoding: 'utf8' });
const widths = (src: string) => {
  const out: Record<string, string> = {};
  const re = /kind: '([^']+)'[\s\S]{0,220}?\bw: (\d+(?:\.\d+)?)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) out[m[1]] = m[2];
  return out;
};

const oldSrc = show('src/items.ts') + show('src/nursery.ts') + show('src/eggs.ts');
const nowSrc = readFileSync('src/items.ts', 'utf8') + readFileSync('src/nursery.ts', 'utf8') + readFileSync('src/eggs.ts', 'utf8');
const oldW = widths(oldSrc);
const nowW = widths(nowSrc);
const kinds = Object.keys(oldW).sort();
check('every fbd04db kind is still in the catalog', kinds.length > 40 && kinds.every(k => nowW[k] != null));
check('widths match fbd04db', kinds.every(k => nowW[k] === oldW[k]), kinds.filter(k => nowW[k] !== oldW[k]).join(','));

type Man = { slug: string; gameW?: number; viewBox?: number[]; wall?: boolean; heightUnits?: number; widthUnits?: number };
const oldMan = JSON.parse(show('assets/items/manifest.json')) as Man[];
const nowMan = JSON.parse(readFileSync('assets/items/manifest.json', 'utf8')) as Man[];
const oldBy = Object.fromEntries(oldMan.map(e => [e.slug, e]));
let vbSame = true;
let wSame = true;
const vbBad: string[] = [];
for (const e of nowMan) {
  const o = oldBy[e.slug];
  if (!o) continue;
  if (o.gameW !== e.gameW || o.widthUnits !== e.widthUnits || o.heightUnits !== e.heightUnits || o.wall !== e.wall) wSame = false;
  if (JSON.stringify(o.viewBox) !== JSON.stringify(e.viewBox)) { vbSame = false; vbBad.push(e.slug); }
}
check('pack footprints match fbd04db', wSame && nowMan.length >= oldMan.length);
check('pack viewBoxes match fbd04db', vbSame, vbBad.slice(0, 6).join(','));
check('protocol stays 4', PROTOCOL === 4);

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

execSync('node scripts/dump-art-pairs.mjs', { stdio: 'inherit' });
const dumped = JSON.parse(readFileSync('/tmp/art-pairs.json', 'utf8')) as {
  pairs: { kind: string; vb1: string; v1: string; vb2: string; v2: string }[];
  foot: string[];
};
check('runtime footprints match fbd04db', dumped.foot.length === 0, dumped.foot.slice(0, 8).join(','));
const vbDrift = dumped.pairs.filter(p => p.vb1 !== p.vb2).map(p => p.kind);
check('svg viewBoxes match fbd04db', vbDrift.length === 0, vbDrift.slice(0, 6).join(','));

const lintBad: string[] = [];
for (const p of dumped.pairs) {
  const msg = lintSvg(p.kind, p.v2);
  if (msg) lintBad.push(msg);
}
check('svg markup is well formed', lintBad.length === 0, lintBad.slice(0, 6).join('; '));

// New Winter Cheer slugs are not in fbd04db, so the equality checks above skip
// them. Hold the paintings to the shipped raster contract instead.
let winterOk = false;
try {
  execSync('python3 tests/winter_art_check.py', { stdio: 'inherit' });
  winterOk = true;
} catch {
  winterOk = false;
}
check('winter paintings are exact 3x under 60KB', winterOk);

const py = ['/tmp/pwvenv/bin/python', '/workspace/.pwvenv/bin/python', 'python3'].find(p => {
  try { execSync(`${p} -c "import playwright"`, { stdio: 'ignore' }); return true; } catch { return false; }
});
check('placement measurer is available', !!py, 'playwright python');
if (py) {
  let raw = '';
  try {
    raw = execSync(`${py} tests/measure_place.py`, {
      input: JSON.stringify(dumped.pairs),
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (err) {
    raw = (err as { stdout?: string }).stdout || '';
  }
  const measured = JSON.parse(raw) as { checked: number; bad: { kind: string; dax: number; day: number; dw: number; dh: number; out: boolean; bad?: boolean }[] };
  const bad = measured.bad;
  const drift = bad.filter(r => r.bad || r.dax > 0.04 || r.day > 0.04 || r.dw > 0.12 || r.dh > 0.12);
  const spilled = bad.filter(r => r.out);
  check('ink anchor and size match fbd04db', drift.length === 0 && measured.checked > 200,
    drift.slice(0, 8).map(r => `${r.kind} a${(r.day || 0).toFixed(2)} w${(r.dw || 0).toFixed(2)} h${(r.dh || 0).toFixed(2)}`).join(', ') + ` checked ${measured.checked}`);
  check('svg stays inside its viewBox', spilled.length === 0, spilled.slice(0, 8).map(r => r.kind).join(','));
}

console.log(pass + ' passed');
