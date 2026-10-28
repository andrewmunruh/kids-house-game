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

## App Builder preview-2 follow-ups (Oct 27 2026, evening CT): DONE, awaiting App Builder re-review
- 437880e: a lying doll's bubble and z now sit over her head (cross_lying_bubble_test from d493b12).
- d055d6b: plum #5b3d5c in the needs art/css. `khg.showWishes` goes through storeKey, so preview builds use `preview:khg.showWishes` and production keeps `khg.showWishes`.
- 91b1350: first hint comes much sooner. The pick is per doll: a doll with a need part-way down finishes it, and a doll already showing a wish is skipped. Cadence (visible play only): 75s for the first step, 2 min while no wish shows, 4 min once one does. Server cap is 96s. The first hint now comes at 3.25 min with 1 doll and with 4 (it was 20 and 68 min). New hints stay at least 3 min apart (8 min with 4 dolls). tests/needs_first_hint_test.ts.
- Bubble keeps a minimum on-screen width of 36px (40px on a portrait phone) by dividing by the stage scale. tests/needs_bubble_fit_test.py runs at 4 sizes.
- Gate GREEN on 3f65a8a src: tsc OK; needs_test 51/51 (includes 10ef736 old-client check); first_hint 11/11; needs_sync 27/27; needs_shots ALL OK; bubble_fit ALL OK (4 sizes); cross_lying PASS; sit_test 119; sit_touch 0 problems. Each ran under the gate lock on a fresh hood, and each hood was killed by PID afterward. Shots in /workspace/t-needs-shots.
- APP CODE: needs App Builder re-review before production. No deploy.
