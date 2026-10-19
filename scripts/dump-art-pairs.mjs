// Dump v1 (fbd04db drawings) and current v2 marks so a browser can measure ink boxes.
import { createServer } from 'vite';
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const REV = 'fbd04db';
const show = (path) => execSync(`git show ${REV}:${path}`, { encoding: 'utf8' });

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const mod = await vite.ssrLoadModule('/src/items.ts');
const { artV2Markup, loadArtRooms, ART_ROOMS } = await vite.ssrLoadModule('/src/art/catalog.ts');
const { setArtV2 } = await vite.ssrLoadModule('/src/art/flag.ts');
setArtV2(true);
await loadArtRooms(ART_ROOMS);

const manifest = JSON.parse(show('assets/items/manifest.json'));
const bySlug = Object.fromEntries(manifest.map(e => [e.slug, e]));

const out = [];
for (const item of mod.ITEMS) {
  if (item.cat === 'pets' || ['cat', 'dog', 'bunny', 'fish', 'kennel', 'cat-tower'].includes(item.kind)) continue;
  setArtV2(true);
  const mark = artV2Markup(item.kind);
  let v1 = null;
  let vb1 = item.vb || '0 0 100 100';
  if (item.kind.startsWith('pack:')) {
    const slug = item.kind.slice(5);
    const entry = bySlug[slug];
    if (!entry) continue;
    const file = 'assets/items/' + entry.svg;
    let raw = '';
    try { raw = show(file); } catch { raw = readFileSync(file, 'utf8'); }
    vb1 = (raw.match(/viewBox="([^"]+)"/) || [])[1] || (entry.viewBox || []).join(' ');
    v1 = raw.replace(/^[\s\S]*?<svg\b[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  } else {
    v1 = item.svg;
    vb1 = item.vb || '0 0 100 100';
  }
  if (!mark || !v1) {
    out.push({ kind: item.kind, missing: !mark });
    continue;
  }
  out.push({
    kind: item.kind,
    name: item.name,
    wall: !!item.wall,
    w: item.w,
    h: item.h || item.w,
    vb1,
    v1,
    vb2: mark.vb,
    v2: mark.body,
  });
}
await vite.close();
writeFileSync('/tmp/art-pairs.json', JSON.stringify(out));
console.log('pairs', out.length, 'missing', out.filter(p => p.missing).length);
