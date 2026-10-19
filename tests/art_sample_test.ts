// The art sample must not change footprints, saves, or the default drawing.
import { readFileSync } from 'node:fs';
import { SAMPLE_KINDS, artV2Markup, artV2On, setArtV2, setArtV2FromSearch, v2Mark } from '../src/art/v2-sample';
import { ART_V2 } from '../src/art/flag';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else process.exitCode = 1;
};

const items = readFileSync(new URL('../src/items.ts', import.meta.url), 'utf8');
const catalog = items + readFileSync(new URL('../src/nursery.ts', import.meta.url), 'utf8');
const hood = readFileSync(new URL('../src/shared/hood.ts', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8');
const wardrobe = readFileSync(new URL('../assets/items/bedroom/wardrobe.svg', import.meta.url), 'utf8');
const manifest = readFileSync(new URL('../assets/items/manifest.json', import.meta.url), 'utf8');

const WIDTH: Record<string, string> = {
  sofa: '260', bed: '300', fridge: '150', lamp: '90', bookshelf: '170', rug: '320',
  plant: '110', table: '200', teddy: '100', window: '180', crib: '260',
};

function widthOf(kind: string): string | null {
  const re = new RegExp(`kind: '${kind}'[\\s\\S]{0,180}?\\bw: (\\d+)`);
  const m = catalog.match(re);
  return m ? m[1] : null;
}

check('protocol stays 4', /export const PROTOCOL = 4/.test(hood));
check('default follows the one-line switch', setArtV2FromSearch('') === ART_V2 && artV2On() === ART_V2);
check('v1 search rolls back to the old art', setArtV2FromSearch('?art=v1') === false && artV2Markup('sofa') === null);
check('v2 search forces the new art', setArtV2FromSearch('?art=v2') === true && artV2Markup('sofa') !== null);
setArtV2(false);
check('flag can turn back off', artV2On() === false && artV2Markup('bed') === null);
setArtV2FromSearch('');
check('game reads the search flag once', main.includes('setArtV2FromSearch(location.search)'));
check('svgOf asks the sample and still has the img path', items.includes('artV2Markup(d.kind)') && items.includes('class="packimg"'));
check('sample is not written to storage', !/localStorage|sessionStorage/.test(readFileSync(new URL('../src/art/v2-sample.ts', import.meta.url), 'utf8')));

check('twelve sample pieces', SAMPLE_KINDS.length === 12);
for (const kind of SAMPLE_KINDS) {
  const mark = v2Mark(kind);
  const body = mark?.body ?? '';
  check(kind + ' has a drawing', !!mark && body.length > 80);
  check(kind + ' keeps plum outlines', body.includes('#5a3d5c'));
  check(kind + ' has a darker side plane', /#(e45d88|e04878|e888a8|d4925a|c4844c|7eb4dc|3d9a68|c45c38|9a84e6|c49ad4|c48a5c|d4a078|b07cc8|e0a83a)/.test(body));
  check(kind + ' has no blur filter', !/feGaussianBlur|feDropShadow|<filter|filter=/.test(body));
  check(kind + ' markup stays small', body.length < 4200, String(body.length));
  if (kind !== 'pack:wardrobe') check(kind + ' viewBox stays 100', mark?.vb === '0 0 100 100');
  if (WIDTH[kind]) check(kind + ' footprint unchanged', widthOf(kind) === WIDTH[kind], widthOf(kind) ?? '');
}

const ward = v2Mark('pack:wardrobe');
check('wardrobe keeps the pack viewBox', ward?.vb === '7 -1 86 102');
check('wardrobe file is untouched', wardrobe.includes('viewBox="7 -1 86 102"') && wardrobe.includes('fill="#c9a0dc"'));
check('wardrobe manifest footprint stays', /"slug": "wardrobe"[\s\S]{0,420}"gameW": 150\.5/.test(manifest));
check('rug and window skip the floor shadow', !v2Mark('rug')!.body.includes('cy="96.4"') && !v2Mark('window')!.body.includes('cy="96.4"'));
check('floor pieces keep a contact shadow', v2Mark('sofa')!.body.includes('cy="96.4"') && v2Mark('crib')!.body.includes('cy="96.4"'));

console.log(pass + ' passed');
