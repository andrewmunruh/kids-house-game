# Integration 1 status (untracked)
- Branch cursor/integration @ 3034dcc (merges b4, party-photobooth, halloween, costumes; STATUS.md removed).
- Conflicts: main.ts imports (party+halloween), join flags halloween+cos in server/core.ts, src/net.ts, src/shared/hood.ts (both kept).
- tsc OK, tests/*.ts OK (art_raster 2 fails = base). Heavy gate running: /tmp/ti/batch.sh -> /tmp/ti/logs/
- Pushed cursor/integration 18ee50c. Preview deployed: Worker c708a822, gh-pages 9727abc, bundle index-9_Wcrfh4.js. Next: preview smoke + shots.

## Step 4/5 done (Oct 27 ~2:35 PM CDT)
Preview smoke /tmp/ti/smoke_integ.py: 26/26 PASS at 820x1180, 844x390, 390x844 (log /tmp/ti/logs/smoke.log). 30 shots in /workspace/t-integ-shots/. Local web servers 5890/5891 stopped.

## INTEGRATION 2 (branch cursor/integration2, NOT cursor/integration which stays 18ee50c = release 1)
- Merged m3-reactions (ff3c45f) + m2-needs (7ee19a5); shots/m3 removed; STATUS.md removed. Pushed origin/cursor/integration2 = 7ee19a5.
- Conflicts: main.ts imports (all kept + installNeeds); main.ts rx: keysPlaying + party phase sync both kept; core.ts/net.ts/hood.ts flags halloween+cos+needs all kept; welcome cos+needs; state.ts costume clean + needs clean both kept.
- Gate in progress: /tmp/ti2/batch.sh -> /tmp/ti2/logs/batch.out; cross test /tmp/ti2/cross_test.py pending; fps pending. Static servers 5890(new) 5891(10ef736) 5893(base 18ee50c), pids /tmp/ti2/web-*.pid.
- halloween_art rc=1 cause: harness — /workspace/.pwvenv python has no numpy (ModuleNotFoundError). Not a hood test; with /usr/bin/python3 it passes: "halloween art ok 11 items" (4:1x PM CDT). needs_test.ts 51 passed (vite-node). tsc OK, tests/*.ts all pass.

## INTEGRATION 3 (branch cursor/integration3) — 6:0x PM CDT
- 5ff068c = merge m2-needs 437880e (lying bubble fix, clean). eb57e47 = add tests/cross_feature_test.py + cross_lying_bubble_test.py from d493b12. Pushed origin/cursor/integration3 = eb57e47.
- Build /tmp/ti3/www-new (index-s0sFbSJy). Harness /tmp/ti3/run.sh -> inner.sh: inside the lock starts web 5890/old 5891/hood 5892 fresh, kills exact pgids, checks for leaks. Log /tmp/ti3/logs/batch.out.
- tsc OK; tests/*_test.ts 20/20 files pass (mail_persist on PORT 5894); halloween_art (/usr/bin/python3) OK 11 items.
- 18:27 hood rc=0 :: 43/43 checks passed
- 18:33 gameroom rc=0 :: 69/69 checks passed
- 18:34 pets rc=0 :: 46/46 passed
- 18:36 ranch rc=0 :: 41/41 passed
- 18:37 map rc=0 :: 40/40 passed
- 18:37 polish rc=0 :: 7 passed, 0 failed
- 18:37 polish4 rc=0 :: 10/10 checks passed
- 18:38 avatar rc=0 :: 34/34 checks passed
- 18:39 ambient_sync rc=0 :: 12/12 checks passed
- 18:39 costume_sync rc=0 :: 23/23 checks passed
- 18:40 tot_sync rc=0 :: 14/14 checks passed
- 18:41 photobooth rc=0 :: PHOTOBOOTH PASS
- 18:41 party_shots rc=0 :: PARTY PASS
- 18:43 m3_sync rc=1 :: 28/29 checks passed ['after reconnect (A and the live screen): all new clients agree (longest split 1750ms)']
- 18:45 needs_sync rc=0 :: 27/27 checks passed
- 18:45 needs_shots rc=0 :: ALL OK
- m3_sync on eb57e47: 28/29, FAIL 'after reconnect ... longest split 1750ms' (threshold: worst <= 6 samples @250ms = 1500ms). Investigating: 3 reruns on eb57e47 + 3 on 7ee19a5 (/tmp/ti2/www-new) after batch.
- 18:48 cross_feature rc=0 :: 35/35 checks passed []
- 18:48 cross_lying rc=0 :: LYING-BUBBLE PASS
- 18:49 phone rc=0 :: 357/357 passed
- 18:50 b0 rc=0 :: 14/14 passed
- 18:52 migration rc=0 :: 43/43 passed
- eb57e47: 19:07 m3_new_r1 rc=0 :: 29/29 checks passed []
- 7ee19a5: 19:14 m3_old_r1 rc=0 :: 29/29 checks passed []
- eb57e47: 19:18 m3_new_r2 rc=0 :: 29/29 checks passed []
- 7ee19a5: 19:27 m3_old_r2 rc=0 :: 29/29 checks passed []
- eb57e47: 19:31 m3_new_r3 rc=0 :: 29/29 checks passed []
- 7ee19a5: 19:40 m3_old_r3 rc=1 :: 28/29 checks passed ['dropped far away: no pair reactions left for her on either']
- 19:40 m3 reruns: eb57e47 r1/r2/r3 29/29 (reconnect split 500/1250/0ms); 7ee19a5 r1/r2 29/29 (250/750ms), r3 28/29 (different flake: 'dropped far away: no pair reactions left'). Verdict: loaded-box timing flake (threshold worst<=6 samples@250ms=1500ms; load avg ~7). Not a regression.
- 19:5x eb57e47 recheck: tsc OK; tests/*_test.ts 18/20 + art_bounds pass with pwvenv python on PATH; art_raster 11/13 — same 2 FAILs on 7ee19a5 AND 18ee50c (production) => pre-existing, not a regression. needs_test 51 passed. halloween_art_check (/usr/bin/python3) ok 11 items. Old client 10ef736: cross_feature (6) 5 PASS, also m3/needs/ambient/costume/tot sync + migration 43/43.
- 19:5x PREVIEW DEPLOYED eb57e47: Worker b4855e92-f695-4d49-a3b3-c863d8dfe101 (rollback c708a822-0c96-49e4-b2ff-0b138e6b9203); gh-pages a024672 (rollback 9727abc); bundle index-BhzaqjNM.js (rollback index-9_Wcrfh4.js).
- 20:1x PREVIEW SMOKE (/tmp/ti3/smoke3.py, webkit, 2 clients on a throwaway preview street) 23/23 at 820x1180, 844x390, 390x844: bundle, preview Worker, no needsqa hook, reactions synced A==B, party+reactions on both, need bubble+fridge glow+care burst (solo house: the server DriftGate allows 1 drift step per window, so the 3-step setup only works offline, by design), no page errors, no production hosts. Shots: /workspace/t-integ-shots2/ (18). No servers left running.

## Integration 4 (final candidate) — cursor/integration4
- 20:5x CDT branch from eb57e47; merged m2-needs c2cd7e7 (STATUS.md modify/delete -> kept deleted), party-perf-fix2 7d0246a (clean), followups 5ed797a (clean); m3_sync limit 1500->2000ms (worst<=8). Head 0e2b0f7, pushed.
- 21:1x tsc OK; tests/*_test.ts 22 files: all pass except art_raster 2 FAILs (same pre-existing pair as 18ee50c/7ee19a5/eb57e47); needs_test 51, needs_first_hint_test 11, arrive_test all pass. art_catalog needs numpy python first on PATH (/usr/bin), art_bounds/art_raster need pwvenv (playwright) — harness, not code. halloween_art_check (/usr/bin/python3) ok 11 items.
- 20:58 hood rc=0 :: 44/44 checks passed
- 21:01 gameroom rc=0 :: 69/69 checks passed
- 21:03 pets rc=0 :: 46/46 passed
- 21:07 ranch rc=0 :: 41/41 passed
- 21:10 map rc=0 :: 40/40 passed
- 21:14 polish rc=0 :: 7 passed, 0 failed
- 21:15 polish4 rc=0 :: 10/10 checks passed
- 21:22 avatar rc=0 :: 34/34 checks passed
- 21:28 ambient_sync rc=0 :: 12/12 checks passed
- 21:34 costume_sync rc=0 :: 23/23 checks passed
- 21:35 tot_sync rc=1 :: 13/14 checks passed
- 21:37 photobooth rc=1 :: PHOTOBOOTH FAIL
- 21:39 party_shots rc=0 :: PARTY PASS
- 21:42 m3_sync rc=0 :: 29/29 checks passed []
- 21:44 needs_sync rc=0 :: 27/27 checks passed
- 21:44 needs_shots rc=0 :: ALL OK
- 21:45 tot_i4_r1 rc=1 :: 13/14 checks passed
- 21:46 needs_bubble_fit rc=0 :: ALL OK
- 21:46 pb_i4_r1 rc=1 :: PHOTOBOOTH FAIL
- 21:49 cross_feature rc=1 :: 34/35 checks passed ['(4) owner A (inside, party on, doll asleep) gets one "came trick-or-treating!" note']
- 21:49 tot_i4_r2 rc=0 :: 14/14 checks passed
- 21:53 cross_lying rc=0 :: LYING-BUBBLE PASS
- 21:54 pb_i4_r2 rc=1 :: PHOTOBOOTH FAIL
- 21:57 phone rc=0 :: 359/359 passed
- 21:57 tot_i4_r3 rc=0 :: 14/14 checks passed
- 21:59 b0 rc=0 :: 14/14 passed
- 21:59 pb_i4_r3 rc=1 :: PHOTOBOOTH FAIL
- 22:01 migration rc=0 :: 43/43 passed
- 22:02 tot_eb57e47_r1 rc=0 :: 14/14 checks passed
- 22:03 pb_eb57e47_r1 rc=1 :: PHOTOBOOTH FAIL
- 22:03 tot_eb57e47_r2 rc=1 :: 13/14 checks passed
- 22:04 pb_eb57e47_r2 rc=1 :: PHOTOBOOTH FAIL
- 22:09 tot_18ee50c_r1 rc=1 :: 13/14 checks passed
- 22:10 pb_18ee50c_r1 rc=1 :: PHOTOBOOTH FAIL
- 22:11 tot_18ee50c_r2 rc=1 :: 13/14 checks passed
- 22:12 pb_18ee50c_r2 rc=1 :: PHOTOBOOTH FAIL
- 22:21 cf_i4_r1 rc=1 :: 
- 22:21 cf_i4_r2 rc=1 :: 
- 22:21 cf_eb57e47_r1 rc=1 :: 
- 22:21 partycmp rc=1 :: 

- 22:36 photobooth & tot_sync classified PRE-EXISTING (fail on 18ee50c too). cross_feature reruns in progress (diag2/diag3).
- 22:40 old-client 10ef736 checks confirmed in m3/needs/ambient/costume/tot/cross_feature(6) logs; migration 43/43; b0 14/14; tsc OK; preview build bundle index-KUye7vth.js
