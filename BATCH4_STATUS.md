# Batch 4 — heartbeat, wake, re-send, idle timeout (MP-1/2/3/7)
Status: review fixes DONE + main merged (not deployed). LOCAL ONLY. Production untouched: main d8d63b5b481ffb555dcce3e1e4c1e82efb8ec180, bundle index-DMnbpk6d.js, gh-pages e15cd07306247fe9124851f4cc2c570623c3fbfe, Worker cozy-hood 0de9fa76-aeea-47ca-962c-0bd2b62c0bc0.
PR: https://github.com/andrewmunruh/kids-house-game/pull/56 (draft) — branch cursor/batch4-heartbeat
Head: 70e5ce5b834760104d0c2d6cccda3957bae29d8c (= merge 6e22f6e of main d8d63b5 + 2 test-only commits 3a00c20, 70e5ce5)   App code: affda9c91bebb35df64453da11c89889362e5d47 (review fixes; src/net.ts) merged as 6e22f6e
Previous head 17a533b / app code 81326ce6 (bundle index-B062ggIK.js, kept at dist-pr and dist-pr-17a533b).
Merged dist bundle: index-BjZaYyiV.js (/workspace/t-batch4/dist-merged). Pre-merge fix build: index-DhaahyG5.js (dist-pr2).

## 2026-10-30 review fixes (App Builder GO-with-changes, quality-audit/2026-10-30/batch4/REPORT.md)
1. Client silent-drop needs TWO missed pings in a row (hbMissed; any inbound message resets it). A single late pong
   (frozen main thread >5 s) re-probes instead of dropping. Silent drop now detected ~20 s (10 s + 5 s + 5 s) instead of ~11 s;
   wake probe 3 s x2 = ~6 s. resend test threshold raised 17 -> 27 s.
2. Re-send: item/add and char/add removed from SAFE_AGAIN (an add that never left the device is still sent; an ack-lost
   one is let go). cat/move, cat/set, dog/set are now targeted (base = canonical cat/dog): re-sent only if unchanged.
   SAFE_AGAIN = dog/kennel, baby/meet, baby/name.
3. tests/worker_idle_smoke.ts (wrangler dev --local = workerd, port 8794, never deployed) — see Smoke below.
4. This file: production values corrected (was main 2dea54f / bundle BXw2dA5S / gh-pages 7e8f7c7).
New tests: heartbeat_test.py scenario `safety` (ONLY=safety; DIST_PR env selects the client dist).

## Smoke (workerd, local) — smoke.log: SMOKE PASS
node in-process: sweep armed only by hb:1, cleared after last hb:1 leaves, silent hb closed 4001, old untouched.
workerd: welcome hb:1 only to hb clients; silent hb:1 closed 4001 after 40.0 s; pinging hb client kept (6 pongs);
old client silent 62 s (and 114 s total) never dropped, no pong; after last hb client left, a new silent hb client
closed 4001 after 40.0 s (timer re-armed). Interval stop itself is proven in-process (workerd has no introspection).

## Results on final head (dist-merged index-BjZaYyiV.js = app code of 6e22f6e/70e5ce5; lock deadlock resolved, orphan gone, nothing killed)
### New tests (ONLY=safety) — old = 17a533b dist, new = merged dist
| check | old | new |
|---|---|---|
| one late pong (7 s) does not drop the socket (2-miss) | FAIL (dropped) | PASS |
| ack-lost item/add not re-sent after friend deleted it | FAIL (count 1,1) | PASS (0,0) |
| ack-lost cat/move not re-sent when server cat moved (carry step) | RUNNING (chain2) | PASS (pr/base run: kept-when-moved 0, kept-when-unchanged 1) |
| cat/move into a dead socket (target unchanged) still delivered | PASS | PASS (regression guard) |
Cat check rewritten in 3a00c20: the server nacks a friend's cat/move ('notyours'), so the first version (friend moves her
cat) could never pass; the competing writer is her own other device, modelled at carry().
### Heartbeat matrix (hb2-*.log, merged dist)
pr/pr: all PASS except wake 6.0 s vs stale <5 s threshold (by design 3 s x2; threshold fixed in 70e5ce5, re-run hb3 queued)
and the first cat version (superseded). Silent drop 15.8 s; resend exactly once; conflict ok; no double apply; idle away 41.3 s;
old client never dropped. pr/base: all PASS except silent drop (known gap: old Worker has no ping). old/pr: old client FAILs
silent-drop/resend/wake as before (expected, old code); compat PASS.
### Gate (gate_merged vs base /workspace/t-batch1/gate_prod on d8d63b5): IDENTICAL
tsc ok; art_bounds 2/0, art_catalog 13/0, art_raster 59/2 (same known FAILs), avatar 50/0, avatar_test 34/0, b0 14/0,
costume 20/0, eggs 25/0, hood 44/0, mail_persist b0 1/0 node 4/0 worker 4/0, migration 44/0, phone 383/0, rooms 71/0,
scene_hotspot 613/0, shift 594/19 (same FAIL set as base). art_copy: RUNNING.
### Smoke re-run on final head: smoke-final.log SMOKE PASS (same 11 checks).

## Previous results (17a533b, before the fixes)

## Server diff vs main d8d63b5 (additive, unchanged by the fixes): server/core.ts +28/-2 (the 2 "-" lines only gain fields: Conn hb?/lastRx?, welcome `...(c.hb?{hb:1}:{})`)
- IDLE_MS=40000, sweep every 5 s, lazy interval; drops only conns with c.hb (hello/join hb:1). close(4001,'idle') + onClose.
- 'ping' -> 'pong' only if c.hb. worker.ts/node.ts unchanged. Protocol 4, save v3 unchanged.

## tests/heartbeat_test.py matrix (CLIENT/SERVER) — logs hb-*.log
| scenario | pr/pr | base/base | pr/base (new client, old Worker) | old10ef736/pr | base/pr |
|---|---|---|---|---|---|
| two-way edit, chat, mail, no page errors | PASS | PASS | PASS | PASS | PASS |
| silent drop detected ~11 s | PASS 10.8 s | FAIL | n/a (no ping on old Worker; known gap) | FAIL (old) | FAIL (base) |
| edit on dead socket re-sent once | PASS | FAIL (reverted) | PASS | FAIL (old) | FAIL |
| conflict: friend's newer edit wins | PASS | PASS | PASS | PASS | PASS |
| ack lost: no double apply | PASS | PASS | PASS | PASS | PASS |
| wake ('online') -> fresh socket | PASS 3.0 s | FAIL | PASS 0.0 s | FAIL | FAIL |
| offline chat >10 s dropped | PASS | FAIL | PASS | FAIL | FAIL |
| idle drop hb:1 at 40 s | PASS 41.3 s after last byte | (none: never dropped) | never dropped (correct) | never dropped (correct) | never dropped (correct) |
| old 10ef736 client silent 55 s, never dropped | PASS | PASS | PASS | PASS | PASS |
| clean rejoin (same pid/house, 1 avatar) | PASS | PASS* | PASS | PASS* | PASS* |
| edit after wake reaches friend | PASS | FAIL | PASS | FAIL | FAIL |
*never left, so "rejoin" trivially. Old/base FAILs = existing production behaviour, unchanged by the server.

## Gate (gate.sh, ports 6950-59): 18 suites, PR == base (2dea54f, /workspace/t-batch3/gate_pr2), identical FAIL sets
(art_raster 2 + scene_hotspot_shift pre-existing FAILs on base too). tsc root clean; server tsc 14 pre-existing errors both.

## Notes
- CDP Page.setWebLifecycleState=frozen does NOT stop timers in headless Chromium -> sleep modelled as silent wifi (half-open via proxy, new sockets refused).
- One early matrix run showed the drop 31 s after the "last byte": measurement counted stale proxy pairs; fixed (live pairs only); 4 later runs 40.7–41.6 s.
- No UI change -> no screenshots needed (rejoin/resend shots in shots/ for reference).
