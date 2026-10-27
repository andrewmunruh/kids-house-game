# M3 reactions — gate status (Track B)
Branch cursor/m3-reactions, PR #45 (still draft until all pass).
- tsc OK; unit: sit 119, baby 84, ambient 63, social 55; mail_persist node 4/4 worker 4/4 b0 1/1
- art_bounds 2/2 and art_raster 11/11 on branch and base 10ef736
- hood 43/0, gameroom webkit 69/0, gameroom chromium 30/1 (429 rate limit from shared hood; rerun on fresh hood queued), pets 46/0, ranch 41/0, map 40/0, phone 357/0, b0_compat 14/0
- migration 29/0 checks pass; script then crashed writing /opt/cursor/artifacts (env permission, needs ART_DIR)
- fps medians (5 rounds vs base): WebKit 61.0 vs 59.0 (long frames 10 vs 22); Chromium 4x CPU 59.8 vs 59.8
- m3_sync_test: 26/28 first run; reconnect test fixed (real socket drop; same sign-in stale tab is parked by design); rerun pending
- shots: test fixes (cat pinned, keyboard reach); reruns pending
