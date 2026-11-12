// Batch 8 (D-06/D-16): static checks on the service worker, the kill switch and the manifest.
// The browser proof is tests/sw_killswitch_test.py; this one runs with the other *_test.ts files.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const root = join(import.meta.dirname ?? __dirname, '..');
let pass = 0, fail = 0;
const check = (name: string, ok: boolean) => { ok ? pass++ : fail++; console.log((ok ? 'PASS ' : 'FAIL ') + name); };
const read = (p: string) => existsSync(join(root, p)) ? readFileSync(join(root, p), 'utf8') : '';

const sw = read('public/sw.js');
check('worker cache name carries the build stamp', sw.includes("'__COZY_BUILD__'") && /app:'\s*\+\s*BUILD/.test(sw));
check('caches are named per scope (game and preview never clash)', sw.includes('registration.scope') && sw.includes("'cozy:' + SCOPE"));
check('legacy cozy-v1 deleted only when scope is /kids-house-game/', sw.includes('OWN_LEGACY') && sw.includes("/kids-house-game/") && sw.includes("'cozy-v1'"));
check('old app caches of this scope are swept on activate', /activate[\s\S]*sweep\(\)/.test(sw));
check('only same-origin requests are handled (hood server never cached)', sw.includes('url.origin !== self.location.origin) return'));
check('sw-switch.json is never served from a cache', sw.includes("endsWith('/sw-switch.json')) return"));
check('art cache is capped', /ART_MAX\s*=\s*\d+/.test(sw) && sw.includes('trimArt'));
check('worker tells open tabs its build', sw.includes("type: 'cozy-sw'"));
check('worker never calls cache.add', !/\bcache\.add\s*\(/.test(sw));

const sws = read('public/sw-switch.json');
let on = false; try { on = JSON.parse(sws).sw === 'on'; } catch { /* missing */ }
check('kill switch ships ON (normal)', on);
const kill = read('sw/kill.js');
check('kill worker deletes caches, unregisters, reloads tabs, has no fetch handler',
  kill.includes('caches.delete') && kill.includes('registration.unregister()') && kill.includes('navigate(') && !kill.includes("'fetch'"));
check('kill worker scopes cozy-v1 to production only', kill.includes('OWN_LEGACY') && kill.includes("/kids-house-game/"));
check('kill worker notes Client.navigate iPad standalone soak check', /iPad|standalone/i.test(kill));
check('kill worker leaves saved houses alone', !/localStorage|indexedDB/.test(kill.replace(/\/\/.*$/gm, '')));
const vite = read('vite.config.ts');
check('build stamps sw.js and COZY_SW_KILL swaps in the kill worker', vite.includes('__COZY_BUILD__') && vite.includes("COZY_SW_KILL === '1'") && vite.includes('{"sw":"off"}'));
check('build id is reproducible: no clock fallback in vite.config.ts', !/Date\.now\(\)/.test(vite));
check('build id comes from git rev-parse --short=12 HEAD or SOURCE_DATE_EPOCH', vite.includes("'rev-parse', '--short=12', 'HEAD'") && vite.includes('SOURCE_DATE_EPOCH'));
check('a real build without an id source fails loudly (only the dev server falls back)', /command !== 'build'\) return 'dev'/.test(vite) && /throw new Error\('cozy build id/.test(vite));
const client = read('src/sw-client.ts');
check('client: switch read with no-store, offline = keep the worker', client.includes("cache: 'no-store'") && client.includes('catch { return false; }'));
check('client: reload after a kill at most once per tab', client.includes('sessionStorage') && client.includes('cozy-sw-killed'));
check('client: "New stuff! Tap to refresh" waits for no finger down', client.includes('New stuff! Tap to refresh') && client.includes('safeNow'));
check('client: killSW deletes cozy-v1 only for /kids-house-game/', client.includes('ownLegacy') && client.includes("/kids-house-game/"));
const main = read('src/main.ts');
check('main registers through startSW only', main.includes('startSW(') && !main.includes("serviceWorker.register("));
check('main: safeNow requires no pointer down (no 15s hold escape)', /safeNow:\s*\(\)\s*=>\s*swDown\.size\s*===\s*0\s*\}/.test(main));
let man: any = {}; try { man = JSON.parse(read('public/manifest.webmanifest')); } catch { /* */ }
check('manifest display is standalone (what iOS uses)', man.display === 'standalone');

console.log(`sw_static: ${pass} pass, ${fail} fail`);
if (fail) process.exit(1);
