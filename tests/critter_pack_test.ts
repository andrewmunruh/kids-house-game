// Critter Corner shape: indoor pieces only, original slugs, shelf groups near ten.
import { readFileSync, readdirSync } from 'node:fs';
import { CATALOG_NAMES } from '../src/shared/catalog-names';
import { CRITTER_CORNER_NAMES } from '../src/shared/catalog-names-critter';
import { CRITTER_PACK_NAMES } from '../src/packs-critter';
import { PROTOCOL } from '../src/shared/hood';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++;
  else process.exitCode = 1;
};

type Item = {
  slug: string; name: string; category?: string; pack?: string; group?: string;
  room?: string; rooms?: string[]; type?: string; holdable?: boolean; wall?: boolean;
};
type Pattern = { slug: string; name: string; type?: string; pack?: string };

function main() {
  const items = JSON.parse(readFileSync('assets/items/packs/critter/manifest.json', 'utf8')) as Item[];
  const patterns = JSON.parse(readFileSync('assets/patterns/critter/manifest.json', 'utf8')) as Pattern[];
  const furniture = items.filter(e => e.category === 'furniture');
  const decor = items.filter(e => e.category === 'decor');
  check('protocol stays 4', PROTOCOL === 4);
  check('the pack is 30 furniture and 32 decor', items.length === 62 && furniture.length === 30 && decor.length === 32, `${items.length} ${furniture.length} ${decor.length}`);
  check('five wallpapers and four floors', patterns.filter(p => p.type === 'wallpaper').length === 5 && patterns.filter(p => p.type === 'floor').length === 4);

  const slugRe = /^cr-[a-z0-9-]{1,21}$/;
  const badSlug = [...items, ...patterns].filter(e => !slugRe.test(e.slug) || e.slug.length > 24).map(e => e.slug);
  check('slugs start with cr- and stay within 24 characters', badSlug.length === 0, badSlug.join(', '));
  check('the drawer label lives in its own module', CRITTER_PACK_NAMES.critter === 'Critter Corner');

  const groups = new Map<string, number>();
  for (const e of items) groups.set(e.group || '', (groups.get(e.group || '') ?? 0) + 1);
  const groupBad = [...groups.entries()].filter(([g, n]) => !g || n < 8 || n > 12);
  check('each shelf group holds about ten pieces', groups.size === 6 && groupBad.length === 0, [...groups.entries()].map(([g, n]) => `${g}:${n}`).join(' '));

  const outdoors = items.filter(e => e.room === 'backyard' || e.rooms?.includes('backyard'));
  check('outdoor toys stay out of this pack', outdoors.length === 0);
  const kitchen = items.find(e => e.slug === 'cr-toy-kitchen');
  check('the toy kitchen is nursery furniture that also belongs in the kitchen', !!kitchen && kitchen.room === 'nursery' && kitchen.rooms?.includes('kitchen') && kitchen.rooms?.includes('nursery') && kitchen.category === 'furniture');

  const names = items.map(e => e.name);
  const missing = names.filter(n => !CRITTER_CORNER_NAMES.includes(n) || !CATALOG_NAMES.includes(n));
  const extra = CRITTER_CORNER_NAMES.filter(n => !names.includes(n));
  check('every piece is on the mail allow-list from its own file', missing.length === 0 && extra.length === 0, missing.concat(extra).slice(0, 8).join(', '));

  const heavy: string[] = [];
  for (const file of readdirSync('assets/items/packs/critter')) {
    if (!file.endsWith('.svg')) continue;
    const text = readFileSync(`assets/items/packs/critter/${file}`, 'utf8');
    if (/feGaussianBlur|feDropShadow|filter\s*=/i.test(text)) heavy.push(file);
  }
  for (const file of readdirSync('assets/patterns/critter')) {
    if (!file.endsWith('.svg')) continue;
    const text = readFileSync(`assets/patterns/critter/${file}`, 'utf8');
    if (/feGaussianBlur|feDropShadow|filter\s*=/i.test(text)) heavy.push(file);
  }
  check('new art has no heavy SVG filters', heavy.length === 0, heavy.join(', '));

  console.log(`${pass} passed`);
}

main();
