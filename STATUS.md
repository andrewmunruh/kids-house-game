# Track F, Art Studio slice 1: status
PR #48 is ready for review. All gate suites are green (table below). Screenshots are in /workspace/surprise/art-studio-shots/.
Slips: the clubhouse gallery wall; offline paintings are not uploaded when a house is imported to a street; a refused save leaves a placeholder (with a toast).

## Gate (final code = 257d531 src/server; head adds tests/docs only)
| Suite | Result |
|---|---|
| tsc (`npx tsc --noEmit -p .`) | pass |
| tests/*.ts (vite-node) | pass, incl. paint_test 38/38 and mail_persist (node) 4/4. art_bounds_test and art_raster_test fail exactly as on base 10ef736 (known). |
| migration vs 10ef736 | pass (rerun after the Worker change) |
| hood, pets, ranch, map, ambient_sync, b0_compat, phone_test | pass |
| gameroom | pass on rerun with a fresh hood server. The first run hit a 429 from the hood's /api/create rate limit; Art Studio changes nothing there. |
| art_studio_test.py (UI, tools, 7 sizes, street sync with identical pixels, old 10ef736 client) | 46/46 |

Every heavy suite ran alone under `flock /workspace/surprise/gate.lock`, each with a fresh local hood on ports 5850–5860. Nothing was deployed and the production Worker was never hit.
