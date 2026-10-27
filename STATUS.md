# M2 needs status: GATE GREEN on the final build (src as of 0a52e64), Oct 27 2026, 2:13 PM CT
- tsc OK; tests/*.ts all pass (needs_test 51/51 incl. 10ef736 old-client check; mail_persist 4/4). art_raster: 2 FAILs pre-existing on 10ef736 (art untouched).
- Each suite ran one at a time under the gate lock, on a fresh hood:

| Suite | Result |
|---|---|
| needs_sync | 27/27 |
| hood | 43/43 |
| pets | 46/46 |
| gameroom | 69/69 |
| ranch | 41/41 |
| map | 40/40 |
| ambient_sync | 9/9 |
| b0_compat | 14/14 |
| phone | 357/357 |
| migration vs 10ef736 | 43/43 |

- needs_shots 15/15. Screenshots in /workspace/t-needs-shots (not committed).
- The `window.__needs` test hook only exists with `?needsqa=1`.
