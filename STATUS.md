# Track F, Art Studio: status (live log; newest at bottom)
Branch cursor/art-studio, PR #48. Nothing deployed. Local servers only (ports 5850-5889), every heavy suite alone under `flock /workspace/surprise/gate.lock` with a fresh hood (setsid group, killed by exact PGID after each suite).

## Gate run 8: src = 57006b0 (07dd75c differs only in tests/art_studio_test.py)
| Suite | Result |
|---|---|
| tsc | pass |
| tests/*.ts (vite-node, 19 files) | 16 pass; art_bounds_test + art_raster_test fail exactly as on base 10ef736 (known); mail_persist_test needs `node` arg and port 8791, which is outside my allowed ports, so not run (passed 4/4 earlier in the track) |
| paint_test | 47/47 |
| migration vs built 10ef736 | 43/43 |
| hood | 43/43 |
| gameroom | 69/69 |
| phone_test | 357/357 |
| pets | 46/46 |
| ranch | 41/41 |
| map | 40/40 |
| ambient_sync | 12/12 |
| b0_compat | 14/14 (rerun b09). Run 8 failed only because my gate script passed --port-b1 5858 = --port-hood 5858 (a sed typo), not a code issue |
| art_studio_test | 128/128 on f025479 (run art10). Run 8 crashed in the street join (flaky timeout); run 9 found a test bug (camera away from the painting after reload), fixed in f025479 |

## Migration proof vs BUILT 10ef736 (43/43, gate run 8)
```
rm -rf /tmp/artst-old10 && mkdir /tmp/artst-old10 && git archive 10ef736 | tar -x -C /tmp/artst-old10
ln -s /workspace/t-artstudio/node_modules /tmp/artst-old10/node_modules && (cd /tmp/artst-old10 && npx vite build)
npx vite build && cp -r dist /tmp/artst-new-dist            # this branch
VITE_BASE=/cozy-preview/ VITE_HOOD_URL=http://localhost:5859 VITE_STORE_PREFIX=preview: npx vite build --outDir /tmp/artst-prev-dist --emptyOutDir
flock -o /workspace/surprise/gate.lock env ART_DIR=/tmp/artst-artifacts /workspace/.pwvenv/bin/python migration_test.py --prod-tree /tmp/artst-old10 --prod-dist /tmp/artst-old10/dist --new-dist /tmp/artst-new-dist --preview-dist /tmp/artst-prev-dist --port-web 5853 --port-hood 5854 --port-prev 5855 --work /tmp/artst-migr
```
Earlier migration run 4 (40/43) failed only because its preview build lacked VITE_STORE_PREFIX=preview:.
