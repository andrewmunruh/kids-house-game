// Item names must be unique across built-ins, nursery, secrets, and every pack.
// Pack branches keep their allow-list in a separate file; this still sees the merged catalog.
import { readFileSync } from 'node:fs';
import { CATALOG_NAMES } from '../src/shared/catalog-names';
import { WINTER_CATALOG_NAMES, WINTER_NURSERY_SKIP, WINTER_PACK_LABEL } from '../src/shared/catalog-winter';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++;
  else process.exitCode = 1;
};

function quotedNames(file: string, re: RegExp): string[] {
  const out: string[] = [];
  for (const m of readFileSync(file, 'utf8').matchAll(re)) out.push(m[1] ?? m[2]);
  return out;
}

const names: { name: string; where: string }[] = [];
const manifest = JSON.parse(readFileSync('assets/items/manifest.json', 'utf8')) as { name?: string; type?: string; slug?: string; pack?: string }[];
for (const e of manifest) {
  if (!e?.name || e.type === 'wallpaper' || e.type === 'floor') continue;
  names.push({ name: e.name, where: `items/${e.pack || 'core'}/${e.slug || e.name}` });
}
const patterns = JSON.parse(readFileSync('assets/patterns/manifest.json', 'utf8')) as { name?: string; type?: string; slug?: string; pack?: string }[];
for (const e of patterns) {
  if (!e?.name) continue;
  names.push({ name: e.name, where: `pattern/${e.pack || 'core'}/${e.slug || e.name}` });
}
for (const n of quotedNames('src/items.ts', /name:\s*(?:'([^']*)'|"([^"]*)")/g)) names.push({ name: n, where: 'src/items.ts' });
for (const n of quotedNames('src/nursery.ts', /name:\s*(?:'([^']*)'|"([^"]*)")/g)) names.push({ name: n, where: 'src/nursery.ts' });
for (const n of quotedNames('src/eggs.ts', /item:\s*\{[^}]*name:\s*(?:'([^']*)'|"([^"]*)")/g)) names.push({ name: n, where: 'src/eggs.ts' });

const seen = new Map<string, string[]>();
for (const row of names) {
  const list = seen.get(row.name) ?? [];
  list.push(row.where);
  seen.set(row.name, list);
}
const dups = [...seen.entries()].filter(([, where]) => where.length > 1);
check('every item and pattern name is unique', dups.length === 0, dups.slice(0, 6).map(([n, w]) => `${n} (${w.join(', ')})`).join(' | '));

const catalogDup = CATALOG_NAMES.filter((n, i) => CATALOG_NAMES.indexOf(n) !== i);
check('the mail allow-list has no repeated name', catalogDup.length === 0, catalogDup.slice(0, 6).join(' | '));

const winterInList = WINTER_CATALOG_NAMES.every(n => CATALOG_NAMES.includes(n));
check('Winter Cheer names are on the mail allow-list', winterInList && CATALOG_NAMES.includes(WINTER_PACK_LABEL) && WINTER_CATALOG_NAMES.length >= 58);

const holiday = new Set(WINTER_NURSERY_SKIP);
check('holiday pieces are listed for the nursery skip', holiday.size === 12 && holiday.has('pack:wc-holiday-tree') && holiday.has('pack:wc-gingerbread') && holiday.has('pack:wc-gingerbread-village') && holiday.has('pack:wc-sleigh-planter'));

console.log(`${pass} passed`);
