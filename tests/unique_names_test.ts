// Display names must be unique across every catalog and every pack.
// Pack manifests live in their own folders, so a pack that lands later
// (Winter Cheer, or the next one) is included without editing this list.
// Comparison ignores case and repeated spaces.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { CATALOG_NAMES } from '../src/shared/catalog-names';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++;
  else process.exitCode = 1;
};

type Hit = { name: string; where: string };

const keyOf = (name: string) => name.trim().toLowerCase().replace(/\s+/g, ' ');

function addFile(file: string, hits: Hit[]) {
  const parsed = JSON.parse(readFileSync(file, 'utf8'));
  const rows = Array.isArray(parsed) ? parsed : [...(parsed.items ?? []), ...(parsed.patterns ?? [])];
  for (const row of rows) {
    if (row && typeof row.name === 'string' && row.name.trim()) hits.push({ name: row.name.trim(), where: file });
  }
}

function manifestsUnder(root: string): string[] {
  const out: string[] = [];
  const top = `${root}/manifest.json`;
  if (existsSync(top)) out.push(top);
  if (!existsSync(root)) return out;
  for (const d of readdirSync(root, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const file = `${root}/${d.name}/manifest.json`;
    if (existsSync(file)) out.push(file);
  }
  return out;
}

function codeNames(file: string): Hit[] {
  const hits: Hit[] = [];
  const text = readFileSync(file, 'utf8');
  const re = file.endsWith('eggs.ts')
    ? /item:\s*\{[^}]*name:\s*(?:'([^']*)'|"([^"]*)")/g
    : /name:\s*(?:'([^']*)'|"([^"]*)")/g;
  for (const m of text.matchAll(re)) {
    const name = (m[1] ?? m[2] ?? '').trim();
    if (name) hits.push({ name, where: file });
  }
  return hits;
}

// Names from the Winter Cheer plan. Checked against Critter Corner so the two
// packs do not collide before that branch's manifest is in the tree. Once the
// manifest lands, the scan above catches a clash with any catalog.
const WINTER_CHEER_PLAN = [
  'Knit-Blanket Armchair', 'Plaid Cabin Sofa', 'Stone Hearth Fireplace', 'Woodstove',
  'Sled Coffee Table', 'Log Bench', 'Snowy Window Seat', 'Pinecone Side Table',
  'Mitten Ottoman', 'Birch Log Basket', 'Frosted Pine', 'Twinkle-Light Floor Lamp',
  'Decorated Holiday Tree', 'Red Plaid Quilt Bed', 'Ice-Blue Wardrobe', 'Snowflake Nightstand',
  'Fur-Trim Bench', 'Frosty Bookcase', 'Snow-Globe Lamp', 'Penguin Plush Chair',
  'Cozy Sock Hamper', 'Cocoa Cart', 'Peppermint Counter', 'Cookie Oven',
  'Mug Tree Shelf', 'Gingerbread Cottage', 'Cookie Plate', 'Marshmallow Jar',
  'Cocoa Pot', 'Cinnamon Roll Tray', 'Snowman Buddy', 'Snow Globe', 'Mug of Cocoa',
  'Mittens on a Line', 'Ice Skates', 'Snowshoes', 'Pinecone Garland', 'Berry Wreath',
  'Twinkle Light String', 'Lantern', 'LED Candle Trio', 'Snowflake Mobile',
  'Polar Bear Plush', 'Penguin Plush', 'Peppermint Swirl Rug', 'Knit Pom Rug',
  'Cabin Picture', 'Snowy Window Art', 'Wrapped Present Stack', 'Ribbon Bauble Garland',
  'Knit Stocking Row', 'Candy Cane Lamp', 'Star Tree Topper', 'Poinsettia Pot',
  'Holly Sprig', 'Nutcracker Friend', 'Reindeer Plush', 'Sleigh Planter',
];

function main() {
  const hits: Hit[] = [];
  for (const root of ['assets/items', 'assets/items/packs', 'assets/patterns']) {
    for (const file of manifestsUnder(root)) addFile(file, hits);
  }
  hits.push(...codeNames('src/items.ts'), ...codeNames('src/nursery.ts'), ...codeNames('src/eggs.ts'));

  const byKey = new Map<string, Hit[]>();
  for (const hit of hits) {
    const key = keyOf(hit.name);
    const list = byKey.get(key) ?? [];
    list.push(hit);
    byKey.set(key, list);
  }
  const dups = [...byKey.entries()].filter(([, list]) => {
    const places = new Set(list.map(h => `${h.where}\0${h.name}`));
    return places.size > 1;
  });
  const dupText = dups.map(([key, list]) => `${key} (${list.map(h => h.where).join(', ')})`).join(' | ');
  check('every catalog and pack item name is unique', dups.length === 0 && hits.length > 200, dupText);

  const allow = new Map<string, string[]>();
  for (const name of CATALOG_NAMES) {
    const key = keyOf(name);
    const list = allow.get(key) ?? [];
    list.push(name);
    allow.set(key, list);
  }
  const allowDups = [...allow.entries()].filter(([, list]) => list.length > 1);
  check('the mail allow-list has no repeated name', allowDups.length === 0, allowDups.map(([k]) => k).join(', '));

  const critterFile = 'assets/items/packs/critter/manifest.json';
  const critter = JSON.parse(readFileSync(critterFile, 'utf8')) as { name: string }[];
  const winter = new Set(WINTER_CHEER_PLAN.map(keyOf));
  const clash = critter.filter(e => winter.has(keyOf(e.name))).map(e => e.name);
  check('Critter Corner names stay off the Winter Cheer plan', clash.length === 0, clash.join(', '));

  console.log(`${pass} passed`);
}

main();
