// Each living-room raster's drawn pixels sit on the SVG's visible art, shadows excluded.
import { execFile } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const KINDS = ['armchair', 'ball', 'balloon', 'bookshelf', 'chair', 'clock', 'lamp', 'picture', 'plant', 'rug', 'sofa', 'table', 'tv', 'window'];
const py = process.env.ART_PYTHON || ['/tmp/pwvenv/bin/python', 'python3'].find(p => existsSync(p) || p === 'python3')!;

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else process.exitCode = 1;
};

const vite = await createServer({
  configFile: join(root, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});
const mod = await vite.ssrLoadModule('/src/items.ts') as {
  ITEM_MAP: Record<string, { w: number; h?: number; vb?: string; svg: string; wall?: boolean }>;
  hOf: (d: { w: number; h?: number }) => number;
};
const items = KINDS.map(kind => {
  const d = mod.ITEM_MAP[kind];
  return d ? { kind, w: d.w, h: mod.hOf(d), vb: d.vb ?? '0 0 100 100', svg: d.svg, wall: !!d.wall } : null;
});
await vite.close();
check('fourteen living kinds are in the catalog', items.every(i => i && i.w > 0 && i.svg.length > 0));
const json = join(process.env.TMPDIR || '/tmp', 'art-bounds-items.json');
writeFileSync(json, JSON.stringify(items));

await new Promise<void>((resolve) => {
  execFile(py, [join(root, 'tests/art_bounds.py'), json, root], { timeout: 60000 }, (err, stdout, stderr) => {
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    check('raster alpha bounds match the svg within 3%', !err);
    resolve();
  });
});

console.log(pass + ' passed');
