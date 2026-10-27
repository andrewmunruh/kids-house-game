# M3 reactions — gate status (Track B)
Branch cursor/m3-reactions, PR #45 (still draft until all pass).
- tsc OK; unit: sit 119, baby 84, ambient 63, social 55; mail_persist node 4/4 worker 4/4 b0 1/1
- art_bounds 2/2 and art_raster 11/11 on branch and base 10ef736
- hood 43/0, gameroom webkit 69/0, gameroom chromium 69/0 (rerun on fresh hood; first run hit a 429 from the shared hood), pets 46/0, ranch 41/0, map 40/0, phone 357/0, b0_compat 14/0
- migration vs 10ef736 43/43 (ART_DIR=/tmp; first run only crashed on /opt permission); ambient_sync 12/0
- fps medians (5 rounds vs base): WebKit 61.0 vs 59.0 (long frames 10 vs 22); Chromium 4x CPU 59.8 vs 59.8
- m3_sync_test (A new, B new reduced-motion, O old 10ef736, stale tab S): 29/29; nothing new sent
- m3_shots at 3 sizes: all scenes pass (fixed scenes rerun 10/10 each size); shots/m3 committed
PR #45 marked ready.
