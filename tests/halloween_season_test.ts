import { halloweenSeason, halloweenVisible, HALLOWEEN_NURSERY_SKIP } from '../src/shared/catalog-halloween';
import { catalogShows, seasonHidden } from '../src/roomfilter';
import { CATALOG_NAMES } from '../src/shared/catalog-names';
import { readFileSync } from 'fs';

let fails = 0;
const check = (name: string, ok: boolean, info = '') => { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${ok ? '' : ' ' + info}`); if (!ok) fails++; };
const d = (m: number, day: number) => new Date(2026, m - 1, day, 12);

check('season starts Oct 24', !halloweenSeason(d(10, 23)) && halloweenSeason(d(10, 24)));
check('season ends after Nov 2', halloweenSeason(d(11, 2)) && !halloweenSeason(d(11, 3)));
check('Oct 31 is in season', halloweenSeason(d(10, 31)));
check('off-season hidden unless switch on', !halloweenVisible(d(7, 1), false) && halloweenVisible(d(7, 1), true));
check('seasonHidden only touches the halloween pack', !seasonHidden({ pack: 'winter' }, d(7, 1)) && seasonHidden({ pack: 'halloween' }, d(7, 1)) && !seasonHidden({ pack: 'halloween' }, d(10, 30)));
const man = JSON.parse(readFileSync('assets/items/manifest.json', 'utf8')).filter((e: any) => e.pack === 'halloween');
check('11 halloween pieces', man.length === 11, String(man.length));
check('every piece is named in the catalog allow-list', man.every((e: any) => CATALOG_NAMES.includes(e.name)));
check('nursery skips exist', HALLOWEEN_NURSERY_SKIP.every(k => man.some((e: any) => 'pack:' + e.slug === k)));
check('no faces in names or slugs', man.every((e: any) => !/face|jack|skull|zombie|blood/i.test(e.slug + e.name)));
const item = { cat: 'decor', name: 'Bubbly Cauldron', kind: 'pack:hw-cauldron', pack: 'halloween', rooms: ['kitchen'] };
check('pack tab lists it in season (today or switch)', halloweenVisible() ? catalogShows(item, 'pack:halloween', 'kitchen', false) : true);
check('nursery hides the cauldron', !catalogShows(item, 'pack:halloween', 'nursery', false));
if (fails) { console.log(fails, 'failed'); process.exit(1); }
console.log('halloween season ok');
