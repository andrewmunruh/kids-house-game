// Current catalog drawings for the raster-art tools: every item (pets included),
// with the SVG body and viewBox the raster must match. Writes /tmp/art-items.json
// (or argv[2]). Pack items read their SVG file from assets/items/manifest.json.
import { createServer } from 'vite';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = process.env.ART_ROOT || resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.argv[2] || '/tmp/art-items.json';
const man = JSON.parse(readFileSync(ROOT + '/assets/items/manifest.json', 'utf8'));
const vite = await createServer({ root: ROOT, configFile: ROOT + '/vite.config.ts', server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' });
try {
  const { ITEMS } = await vite.ssrLoadModule('/src/items.ts');
  const out = [];
  for (const it of ITEMS) {
    let vb = it.vb || '0 0 100 100';
    let svg = it.svg || '';
    if (it.kind.startsWith('pack:')) {
      const e = man.find(m => m && m.slug === it.kind.slice(5) && typeof m.svg === 'string');
      const f = e && ROOT + '/assets/items/' + e.svg.replace(/^\.?\//, '');
      if (!f || !existsSync(f)) continue;
      const raw = readFileSync(f, 'utf8');
      vb = (raw.match(/viewBox="([^"]+)"/) || [])[1] || vb;
      svg = raw.replace(/^[\s\S]*?<svg\b[^>]*>/, '').replace(/<\/svg>\s*$/, '');
    }
    if (!svg) continue;
    out.push({ kind: it.kind, name: it.name, cat: it.cat, rooms: it.rooms || ['any'], pack: it.pack || null, w: it.w, h: it.h ?? it.w, wall: !!it.wall, vb, svg });
  }
  writeFileSync(OUT, JSON.stringify(out));
  console.log('items', out.length, '->', OUT);
} finally {
  await vite.close();
}
