// Fresh SVG ink pairs: the drawings at fbd04db, and the drawings this branch ships.
import { createServer } from 'vite';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const REV = 'fbd04db';
const WT = '/tmp/art-fbd';
const PETS = new Set(['cat', 'dog', 'bunny', 'fish', 'kennel', 'cat-tower']);

function svgParts(raw) {
  const vb = (raw.match(/viewBox="([^"]+)"/) || [])[1] || '';
  const body = raw.replace(/^[\s\S]*?<svg\b[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return { vb, body };
}

function packSvg(root, slug) {
  const man = JSON.parse(readFileSync(root + '/assets/items/manifest.json', 'utf8'));
  const entry = man.find(e => e && e.slug === slug && typeof e.svg === 'string');
  if (!entry) return null;
  const file = root + '/assets/items/' + entry.svg.replace(/^\.?\//, '');
  if (!file.endsWith('.svg') || !existsSync(file)) return null;
  return svgParts(readFileSync(file, 'utf8'));
}

async function loadItems(root) {
  const vite = await createServer({
    root,
    configFile: root + '/vite.config.ts',
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  });
  const mod = await vite.ssrLoadModule('/src/items.ts');
  return { vite, items: mod.ITEMS };
}

rmSync(WT, { recursive: true, force: true });
execSync(`git worktree add --detach ${WT} ${REV}`, { stdio: 'inherit' });
execSync(`ln -sfn /workspace/node_modules ${WT}/node_modules`);

let now;
let old;
try {
  now = await loadItems('/workspace');
  old = await loadItems(WT);
  const oldBy = Object.fromEntries(old.items.map(i => [i.kind, i]));
  const pairs = [];
  const foot = [];
  const seen = new Set();
  for (const item of now.items) {
    seen.add(item.kind);
    if (item.cat === 'pets' || PETS.has(item.kind)) continue;
    const base = oldBy[item.kind];
    if (!base) { foot.push('new ' + item.kind); continue; }
    const h = d => d.h ?? d.w;
    if (item.w !== base.w || h(item) !== h(base) || (item.vb || '') !== (base.vb || '') || !!item.wall !== !!base.wall || item.name !== base.name) {
      foot.push(item.kind);
    }
    let v1;
    let vb1;
    let v2;
    let vb2;
    if (item.kind.startsWith('pack:')) {
      const slug = item.kind.slice(5);
      const a = packSvg(WT, slug);
      const b = packSvg('/workspace', slug);
      if (!a || !b) continue;
      vb1 = a.vb; v1 = a.body; vb2 = b.vb; v2 = b.body;
    } else if (!item.svg || !base.svg) {
      continue;
    } else {
      vb1 = base.vb || '0 0 100 100';
      v1 = base.svg;
      vb2 = item.vb || '0 0 100 100';
      v2 = item.svg;
    }
    pairs.push({ kind: item.kind, w: item.w, h: h(item), vb1, v1, vb2, v2 });
  }
  for (const item of old.items) {
    if (!seen.has(item.kind) && item.cat !== 'pets' && !PETS.has(item.kind)) foot.push('dropped ' + item.kind);
  }
  writeFileSync('/tmp/art-pairs.json', JSON.stringify({ pairs, foot }));
  console.log('pairs', pairs.length, 'foot', foot.length, foot.slice(0, 8).join(','));
} finally {
  if (now) await now.vite.close();
  if (old) await old.vite.close();
  execSync(`git worktree remove --force ${WT}`, { stdio: 'inherit' });
}
