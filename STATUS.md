# Art Studio (Track F) — final status

## Final head verification (run 13, on 3852720 code; app/server unchanged since 57006b0)
`git log 57006b0..HEAD -- src server` is empty, so the gate run 8 suites below ran on the same src/server as the final head; later commits are tests/STATUS only.
| Suite | Result |
|---|---|
| tsc (tsc13) | pass |
| paint_test.ts (paint13b) | 47/47 |
| art_studio_test.py (art13) | 128/128 |
All under `flock -o /workspace/surprise/gate.lock` via /tmp/artst-run1.sh (fresh setsid hood on 5850, killed by process group). No art-studio process held gate.lock after the runs; the holders seen were other tracks' runs.

## Screenshots (tests/art_studio_shots.py, shots14)
/workspace/surprise/art-studio-shots/pr/ holds 1_paint_button, 2_studio, 3_hung, 4_selected_handle and 5_resized_toolbar at 820x1180, 1180x820, 844x390 and 390x844, so 20 files. Each painting was resized to size 1.5 and the toolbar was visible at every size. The art_studio_test shots (studio_*, hung_*, wallpiece_* etc.) are in /workspace/surprise/art-studio-shots/.
Honest notes:
- At 844x390 and 390x844 the item toolbar sits close under the painting. The test checks that it covers no more than 10% of the painting in portrait.
- The resize grip is small at phone sizes.

## Earlier log: Track F, Art Studio: status (live log; newest at bottom)
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
| b0_compat | 14/14 (rerun b09). Run 8 failed only because my gate script passed --port-b1 5858 = --port-hood 5858 (a sed typo), not a code issue |
| art_studio_test | 128/128 on f025479 (run art10). Run 8 crashed in the street join (flaky timeout); run 9 found a test bug (camera away from the painting after reload), fixed in f025479 |

## Migration proof vs BUILT 10ef736 (43/43, gate run 8)
```
rm -rf /tmp/artst-old10 && mkdir /tmp/artst-old10 && git archive 10ef736 | tar -x -C /tmp/artst-old10
ln -s /workspace/t-artstudio/node_modules /tmp/artst-old10/node_modules && (cd /tmp/artst-old10 && npx vite build)
npx vite build && cp -r dist /tmp/artst-new-dist            # this branch
VITE_BASE=/cozy-preview/ VITE_HOOD_URL=http://localhost:5859 VITE_STORE_PREFIX=preview: npx vite build --outDir /tmp/artst-prev-dist --emptyOutDir
flock -o /workspace/surprise/gate.lock env ART_DIR=/tmp/artst-artifacts /workspace/.pwvenv/bin/python migration_test.py --prod-tree /tmp/artst-old10 --prod-dist /tmp/artst-old10/dist --new-dist /tmp/artst-new-dist --preview-dist /tmp/artst-prev-dist --port-web 5853 --port-hood 5854 --port-prev 5855 --work /tmp/artst-migr
```
Earlier migration run 4 (40/43) failed only because its preview build lacked VITE_STORE_PREFIX=preview:.

## Merge check with origin/cursor/integration3 (eb57e47)
Throwaway worktree /tmp/artst-merge (detached, `git merge --no-commit origin/cursor/integration3`, never committed or pushed).
Conflicts in server/core.ts, src/net.ts and src/shared/hood.ts were all flag unions: Conn/hello/join get both `needs`/`halloween`/`cos` and `art`; the welcome sends `needs: 1, art: 1`; net.ts keeps speaksArt and speaksNeeds; the PROTOCOL comment keeps both notes.
On the merged tree: tsc OK, vite build OK, paint_test 47/47, art_studio_test 128/128 (merged6; web 5856, hood 5857, run under flock).
Found along the way: on integration a fresh painting could land over the back door, and the door button swallowed its drag. Fixed in 57006b0 (paintings avoid the door and render in front of it). 541180c makes the test drag far enough that the door rule doesn't snap it back.

## Resize-handle rework (Oct 27, 2026)
- Handle: a yellow disc (52px visible) with a diagonal two-headed arrow and no pencil, with a 64px touch target. It sits on the painting's bottom-right corner (inset 14px, or centred on the corner when the painting is small). It pulses on first pick, or shows a static glow under reduced motion. Resize is measured along the diagonal, keeping the aspect ratio and min/max steps.
- Toolbar keeps off the handle and the painting: 12/12 shot checks show toolbarOnGrip 0, toolbarOnArt 0 and onCorner True.
- Gate (app src unchanged since fcc79fa; each suite run alone under flock): tsc pass · paint_test 47/47 · art_studio_test 132/132 · phone_test 357/357.
- Shots in /workspace/surprise/art-studio-shots/pr/: {1_paint_button,2_studio,3_hung,4_selected_handle,6_mid_resize,5_resized_toolbar,7_small_painting}_{820x1180,1180x820,844x390,390x844}.png
- OPEN: at 844x390, after the painting is grown to 1.5 there, a second drag on the handle (mouse or Pencil, even after a reload) does not reach the handle's pointerdown handler, so 7_small_painting_844x390 still shows size 1.5. The test's Pencil shrink at 844x390 (on a painting resized at 820x1180) passes. Not yet root-caused.

## 844x390 handle bug: root cause and fix (8b555d3, regression test 00fac37)
- Cause: at 844x390, a painting grown to 1.5 puts its corner handle on top of the backyard door (handle 295-359 x 132-196, door 325-369 x 116-217). The stage's capture-phase "door wins a tap" rescue (the code that lets a tap on a pet or piece standing over the door still open it) claimed those presses and stopped them before the handle saw them. An instrumented stopPropagation traced it to that listener.
- Proof: on the pre-fix build, the new regression test's plain tap on the handle walked her through the door (`house:here` became `house:gone`).
- Fix (APP CODE, needs App Builder review): the rescue now ignores presses whose target is inside `#artGrip` or `#toolbar`. It is one line in the stage capture pointerdown.
- Door rescue still works: phone_test "a real touch on Back inside still works with a pet on the door" passes (chromium 390x844, 375x667, 430x932; webkit 390x844).
- Regression test (844x390 only, no resize at another size first): grow to 1.5, plain tap on the handle (stays in the room), then a second mouse drag shrinks it, a hit-tested finger drag grows it and a hit-tested Pencil drag shrinks it. All pass. art_studio_test is 138/138.

### Gate on 00fac37 / e8e5f71 (app src = 8b555d3), one suite at a time under the gate lock with a fresh hood each time
| Suite | Result |
|---|---|
| tsc | pass |
| paint_test | 47/47 |
| art_studio_test (with old client) | 138/138 (art28) |
| phone_test | 357/357 (phone11). phone9/phone10 each failed one welcome-card "Let's play visible" check at a different short height (932x340, then 844x300); it is a timing flake unrelated to the door/handle change |
| hood | 43/43 |
| gameroom | 69/69 |
| map | 40/40 |
| b0_compat | 14/14 (b0r10; b09 hit the known --port-b1 = --port-hood script typo) |
| migration | 43/43 |
Shots (shots27) in /workspace/surprise/art-studio-shots/pr/: 7_small_painting is 0.75-0.875 at all four sizes (844x390 now 0.75 with no retry). onCorner is true, and toolbarOnGrip and toolbarOnArt are 0 everywhere.

## Round 2 review items (App Builder, Oct 28)
- (a)+(b) SERVER CODE, needs App Builder review (`server/core.ts` saveArt):
  - A full street now refuses with `streetfull`. The cross-house clearing is gone, so nothing in another child's house is ever deleted.
  - The owner may still free her own oldest unhung drafts (house cap and street cap). A painting saved within the last 90 s that is not yet hung (`artFresh`) is never cleared.
  - The client already shows "The street is full of art! Take one down to hang a new one." for `streetfull`.
  - paint_test grows from 47 to 51 checks:
    - a full street refuses with streetfull and no other house changes;
    - she can free her own draft, and no other house changes;
    - a just-saved, unplaced painting is never cleared (house cap and street cap);
    - two simultaneous saves each clear only their own draft;
    - a friend on a full street is refused;
    - the old (no art:1) client is never sent art or artFail.
  - Save stays v3, protocol 4.
- (1) 390x844 room size: NOT intentional, and NOT caused by the art studio.
  - Measured in Play mode at 390x844. Our base 10ef736 and this branch both gave stage 366x377 and door 60x145. Production 18ee50c gave stage 366x479 and door 77x184.
  - Production fixed this in 7efd36f ("phone portrait Play lets the room fill more of the tall box, 377px to 479px"), which landed after our base.
  - Fix: cherry-picked 7efd36f cleanly as c3d8559 (src/main.ts, 4 lines). This branch now measures the same as production (door 77x184). The Art Studio still fits at 390x844.
- (2) Studio buttons at 844x390: APP CSS, needs App Builder review (d1a4cf6, `src/paint/studio.css`).
  - At landscape heights of 385-500px, the close button, colours, sizes and Hang it up go from 36/40px to 44px.
  - At 844x390 and 932x430 there is no side-panel overflow, and Hang it up stays in the card.
  - At 667x375 and 740x360 the 44px sizes overflowed the panel (Hang it up left the card at 740x360). Those heights keep 36/40px.
- (3) Server wall-band clamp: SKIPPED as not low risk.
  - WALL_BOTTOM is a client-only rule that applies to every wall item.
  - A server clamp would sit in the generic item move/place path that old clients (10ef736) use. Their local positions would drift from the server unless every move were echoed back.

## Round 2 (App Builder review of ba16461), final head after 779a513
- (a)+(b) SERVER, App Builder to review (7b48098, `server/core.ts` saveArt):
  - A full street is refused with `streetfull`, and another child's house is never touched.
  - The saver may free only her OWN oldest unhung draft. A painting saved in the last 90 s and not yet hung is never cleared.
  - paint_test is now 51 checks. art_studio_test section 7 was rewritten (779a513): the new girl on a full street is refused with the street-full toast and no frame is left on her wall. The server still holds every painting in houses B, E and F. The owner either frees her own old draft or is refused, and no orphan frame is left. The old 10ef736 client still passes.
- (1) The smaller 390x844 room was NOT intentional, and the art studio did not cause it.
  - Measured in Play mode: our base 10ef736 already had stage 366x377 and door 60x145. Production 18ee50c has 366x479 and 77x184.
  - Production fixed it in 7efd36f after our base. Cherry-picked cleanly as c3d8559, and the door now measures 77x184, the same as production.
- (2) APP CSS, App Builder to review (d1a4cf6):
  - At landscape heights of 385-500px (844x390, 932x430), the close button, colours, sizes and Hang it up go to 44px with no overflow.
  - Below 385px (667x375, 740x360) they stay at 36/40px, because 44px pushed Hang it up out of the card.
- (3) Server wall-band clamp: SKIPPED, not low risk.
  - WALL_BOTTOM is a client-only rule for every wall item.
  - A server clamp would sit in the generic item move path that 10ef736 clients use, and their positions would drift from the server's.
- Shots at 4 sizes, regenerated from app code d1a4cf6: /workspace/surprise/art-studio-shots/pr/ (1_paint_button … 7_small_painting, at 390x844, 844x390, 820x1180 and 1180x820).

### Gate: one suite at a time under /workspace/surprise/gate.lock, fresh hood each time, screens/ and shots/ restored after each
Suites ran on 5bbf905. App and server code are identical to the final head; 779a513 changes only tests/art_studio_test.py, which was re-run on its own.

| Suite | Result |
|---|---|
| tsc (`tsc --noEmit -p .`) | ok |
| paint_test | 51/51 |
| art_studio_test (OLDWEB=10ef736) | 139/139 (on 779a513) |
| phone_test | 357/357 |
| hood | 43/43 |
| gameroom | 69/69 |
| map | 40/40 |
| b0_compat | 14/14 |
| migration (vs built 10ef736) | 43/43 |

Not on the list: art_bounds_test.ts, art_raster_test.ts and mail_persist_test.ts in tests/*.ts fail under vite-node exactly as they did in the earlier gate on 00fac37. This is unchanged and not caused by round 2. No deploy.

## Release 2 merge and preview (Oct 28, 2026)
- Merged origin/main e25ad21 as f4ab7ab, a merge commit with no rebase. The conflicts were flag unions only:
  - server/core.ts: Conn gets halloween/cos/needs/art. Welcome sends `cos:1, needs:1, art:1`, and hello/join set all four flags.
  - src/net.ts: speaksArt and speaksNeeds are both kept. join/hello send `halloween, cos, needs, art`.
  - src/shared/hood.ts: both PROTOCOL notes are kept, the hello/join/welcome types are unions, and `knock` from main is kept.
  - tsc ok.
- Gate on the merged head: running (gate 11), see below.

### Gate 11 on the merged head (app/server = f4ab7ab; 9be35a7 adds STATUS only). One suite at a time under the gate lock, fresh hood each time, screens/ restored after each
| Suite | Result |
|---|---|
| tsc | ok |
| paint_test | 51/51 |
| art_studio_test, old client 10ef736 | 139/139 |
| art_studio_test, old production client 18ee50c | 139/139 |
| phone_test | 359/359 |
| hood | 44/44 |
| gameroom | 69/69 |
| map | 40/40 |
| b0_compat | 14/14 |
| migration (built 10ef736) | 43/43 |
| needs_sync (old client 18ee50c) | 27/27 |
| needs_bubble_fit | ALL OK |
| needs_test.ts, needs_first_hint_test.ts | pass |
| m3_sync | 29/29 |
| costume_sync (old client 10ef736) | 23/23. The first run used 18ee50c as the "old" client; that build already draws costumes, so its 3 checks expecting the plain avatar could not pass. The re-run with 10ef736 passed. |
| ambient_sync | 12/12 |
| cross_feature | 35/35 |

Known, ignored:
- art_raster_test.ts fails 2 checks (on the known list).
- art_bounds_test.ts fails 1 check, the same as before the merge.
- mail_persist_test.ts is a harness that needs a mode argument (node, worker or b0); it is not a standalone unit test.
- None of the listed known flakes (photobooth 820x1180, tot_sync note, cross_feature trick-or-treat note) showed up in these runs. photobooth_test and tot_sync were not in this run.

### PREVIEW deploy (Oct 28, 00:5x CT), production untouched
- Preview Worker cozy-hood-preview: version aec3b39f-8a8c-4a61-9a7e-aae56f8c8391, from 995ce76 (app/server = f4ab7ab). Same DO classes; paintings use the new `art:<houseId>` key inside HoodDO.
- gh-pages cozy-preview: 36056b1c4d433bce6840a1fd48131b2236fff6fc, bundle index-ChnPX1Jt.js.
- Rollback: Worker 27fc1494-fa64-46e2-bf3b-0b702f0e517c, gh-pages dcc6a1172a801f29682547cce4beefb66cd38d1d, bundle index-KUye7vth.js.

### Preview smoke (step 4), live cozy-preview + cozy-hood-preview
Throwaway preview streets, A at each viewport + B at 820x1180, Chromium. Script and logs: /workspace/surprise/art-studio-shots/preview4/ (smoke4.py, run-final.log, run-prev.log).
Final run 24/25:
- 820x1180: paint+hang, B sees bitmap, move (B follows), handle resize 1->1.5 (B follows), reload keeps place/size/bitmap, delete (gone on A and B), needs wish reaches B and care clears it on B, full street (60 unhung drafts on 5 filler houses) refuses a new girl with "The street is full of art!" toast and no frame: all PASS.
- 844x390: paint, hang, move, resize, reload PASS. The delete straight after reload timed out in the final run (harness: locator.bounding_box wait). It PASSED in the earlier full run and in an isolated 844x390 rerun, and needs PASSED at 844x390 in that earlier run. Recorded as a harness flake.
- 390x844: every check PASS.
- No page/console errors; only hosts were andrewmunruh.github.io + cozy-hood-preview (no production).
- Harness notes: an earlier 820x1180 run once missed the move drag (camera easing), passed on rerun. need/meet only counts at the right spot, so care is tested by walking the doll to the fridge.

### 844x390 delete-after-reload proof (live preview, index-ChnPX1Jt.js)
5 fresh throwaway streets in a row, each: hang, move, handle resize to 1.5, reload, then delete with a real mouse tap. 32/32 PASS.
- After reload the painting element exists in the right room every time.
- Toolbar on screen (y 218-278 of 390), every button's elementFromPoint is itself, no overlap with door (.yardDoor), arrows (#nudgeL/R), title pill (#streetTitle), preview ribbon or mode hint; body safe-area padding 0.
- Pointer log each run: pointerdown/pointerup/click on data-a=delete, then the painting is gone on A and B.
- No page errors, no production hosts.
Logs, script and toolbar shots: /workspace/surprise/art-studio-shots/preview4/deleteproof_*.
The earlier failure only happened in the full smoke, right after the 820x1180 full-street round in the same browser, and it was not reproduced here.

## 1:49 AM full-order rerun (live preview, no deploy)
- After the reboot: cozy-preview serves index-ChnPX1Jt.js, gh-pages is 36056b1c, and the Worker /api/create returns 200. Head matched origin.
- 2 passes, 820x1180 full street (60 unhung) then 844x390 in the same browser: 19/22. Pass 2 at 844 failed. A tap on the moved painting (x~992) sent the room to backyard, and the painting find timed out after 30 s. This is the original smoke failure.
- Deterministic repro without a full street: FORCEX=740. The tap at (237,104) is inside the back door's .yardHintLabel rect [132,73,237,111]. The stage capture door rescue (src/main.ts doorAtPoint, about line 1255) exempts only #artGrip/#toolbar, so it steals the painting tap and calls goDoor('backyard').
- Fix for App Builder (not applied, not deployed): in that capture handler, return early when e.target.closest('.item') is set (hung paintings and furniture above the door), and/or shrink the label hit area.
- Pass 1 at 820 also hit a harness TypeError after the hang (an ITEM lookup returned None, probably the same room switch). Not yet confirmed.
- Evidence: /workspace/surprise/art-studio-shots/preview4/{fullorder.py,fullorder.log,repro_x.log,*.png}

## Door rescue fix (hung paintings), 2026-10-28 ~02:50 CDT
- c1419ac src/main.ts: the stage capture-phase door rescue now also returns early when the press target is inside a hung painting (`.item[data-kind="picture"][data-sig]`), besides #artGrip/#toolbar. Pets/furniture in front of the door keep the rescue.
- Tests: art_studio_test 844x390 painting at x=740 + painting over the door label (041f8fb); phone_test lamp drawn over the door + shelf in front open the yard (c80a3db).
- Gate on de020ef (pre-test-fix): tsc ok, paint 51/51, phone 371/371, hood 44, gameroom 69, map 40, b0_compat 14, needs_sync 27, m3_sync 29, ambient_sync 12, cross_feature 35 all green; migration 29/0 but rc=1 (ART_DIR /opt/cursor perms, harness), costume_sync timeout (rerun queued); art 141/142 (weak overlap check, fixed in 041f8fb).
- In progress: phone_test + prefix control on c80a3db+, migration/costume reruns, art_10c/art_18c/prefix control on 041f8fb. Preview NOT yet deployed (still index-ChnPX1Jt.js).
- Gate reruns: phone_test 383/383 (041f8fb), migration 43/43 (ART_DIR set), costume_sync 23/23, art_studio_test 142/142 with old 18ee50c and 142/142 with old 10ef736 (d51ebc2; one earlier 10ef736 run timed out on a Fill-tool click, rerun green). Pre-fix negative control: art 128/129, failing exactly the painting-over-door tap (she went to backyard); phone_test pre-fix 383/383 (rescue unchanged). Deploying preview next.
