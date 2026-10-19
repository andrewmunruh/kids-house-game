// Each living-room raster's drawn pixels sit on the SVG's drawn box, at the same feet.
import { execFile } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { createServer } from 'vite';

const KINDS = ['armchair', 'ball', 'balloon', 'bookshelf', 'chair', 'clock', 'lamp', 'picture', 'plant', 'rug', 'sofa', 'table', 'tv', 'window'];

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else process.exitCode = 1;
};

const vite = await createServer({
  configFile: '/workspace/vite.config.ts',
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
writeFileSync('/tmp/art-bounds-items.json', JSON.stringify(items));

await new Promise<void>((resolve) => {
  execFile('/tmp/pwvenv/bin/python', ['tests/art_bounds.py', '/tmp/art-bounds-items.json'], { timeout: 60000 }, (err, stdout, stderr) => {
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    check('raster alpha bounds match the svg within 3%', !err);
    resolve();
  });
});

console.log(pass + ' passed');
