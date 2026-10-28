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
| b0_compat | FAIL in run 8 (timed out waiting for #btnHood); rerun pending |
| art_studio_test | run 8 crashed in street join (timeout on [data-m=fresh]); rerun pending on 07dd75c |
