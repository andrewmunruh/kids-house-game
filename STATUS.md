# Track F, Art Studio slice 1: status
PR #48 (draft), branch cursor/art-studio. All Worker requirements are implemented and tested (see the PR body).
Gate (run with /tmp/artst-gate.sh, results in /tmp/artst-gate/summary):
- Passed: tsc, tests/*.ts, migration, hood, pets, ranch, map, ambient_sync, b0_compat.
- Base failures: art_bounds and art_raster.
- gameroom failed once on a 429 from /api/create (rate limit); a rerun is pending.
- Still to run: phone, art_studio.
Slips: the clubhouse gallery wall; offline paintings are not uploaded when a house is imported to a street.
