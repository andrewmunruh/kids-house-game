# Batch B — town (map, map-portrait, park)
Branch cursor/art-batch-b-town from 3337aae. Preview only; no deploys.
- map: painted (region texturing of exact vector render, style C of A/B/C; B rejected: only fit 150KB at q38). Ink drift 0,0; negative 12/10 caught. scene_hotspot map: all pass (2 crowded-fake-house knock spots covered in v1 too -> NOTE).
- map-portrait: style C (A q86 132.7KB, B q54 146KB too busy/swirly, C q78 124.7KB). drift 0,0; negative caught; hotspot test map+map-portrait 367/0 (fake 0/6/12 houses). Painted at h=1020, stretched when the town is taller.
- park: style C (A q70 147.9KB flatter, B q30 145.6KB too compressed, C q46 146.8KB). drift 0,0; negative caught; hotspot test park 80/0 incl. tap slide/pond/gate.

## Gate vs base dda1839 (logs /workspace/t-batchB-town-work/gate)
tsc ok · art_catalog 13/13 · art_bounds 2/2 · art_raster 11 pass + the same 2 known base FAILs · rooms 71 · hood 44/44 (same 429 line as base) · avatar 34/34 · b0_compat 14/14 · migration vs 10ef736 43/43 · scene_hotspot (all scenes) 424/0 · sit: same node crash as base · phone: 0 FAIL, ends in the same .yardHintLabel tap timeout as base (got further than base).
JS gzip 243280 -> 244119 (+839 B). WebP: map 150152 B, map-portrait 127692 B, park 150284 B (all ≤150 KiB; map/park slightly over 150,000 B).
