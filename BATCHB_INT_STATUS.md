# Batch B integration (cursor/art-batch-b, PR #52)
Base origin/main ec4b455. Merged in order: b0 3337aae, rooms 9fc7d6e, town 17d1003 (clean), yard 76d1d56 (conflicts), ranch 0c68dad (conflicts).
- src/art/scene.ts: rooms 6a442c9 and yard 638b5cb made the same re-query fix; kept ONE (yard's commented version).
- scenery.css, scripts/scene_geom.js, tests/scene_hotspot_test.py, tests/scene_shots.py: all adapters kept (town, yard/clubhouse, ranch/barn, rooms). paint_checks merged (SCENE_SHIFT + lines + ref/check/floorLine).
## Assets
scene_paint.py encode(): budget now decimal (max_kb*1000) with quality step 1.
- room-nursery re-run from recipe: 152,332 -> 141,502 B (q78->q77)
- map: from town source map_C.png: 150,152 -> 147,140 B (q69); park from park_C.png: 150,284 -> 148,090 B (q45)

## Perf (Chromium, 1180x820 unless noted)
- Renderer PSS after visiting all scenes: PR 663 MB vs base 257 MB (Chromium decoded-image cache); after critical memory-pressure purge PR 167 MB vs base 153 MB (pre-fix PR 171). DOM: only 1 painted <img> holds a src after fix (was up to 5).
- Nominal decode 4 B/px: room 23 MB, map 11.2, park 27.8, ranch 34.6, barn 18.2, clubhouse 25.0.
- Park @6x CPU, dpr2: 820x1180 enter max 100 ms (base 66.7), pan 4642 px/3 s max 16.8 ms 0 slow; 1180x820 enter max 50 ms (base 66.7), pan max 16.8.

## Preview rollback values (recorded before deploy, 2026-10-29)
- Worker cozy-hood-preview version a40cfe72-19aa-49d2-9936-968939be066a (server unchanged; deploy-preview.sh does not redeploy the Worker)
- cozy-preview gh-pages f70d538c230b8dbbad9a38104ce85fa1ae71599f; live bundle assets/index-C3A4WDTr.js

## Gate (PR 7c2ece7 dist vs base ec4b455 dist; ports 6760-6769 / 6780-6789; old client 10ef736 = /workspace/t-batchB-old10)
Box was restored from a snapshot ~10:21 CT (node_modules, Playwright browsers + WebKit libs, /tmp/b0tree, old10 dist lost); all rebuilt/reinstalled, then suites rerun.
| suite | PR | base |
|---|---|---|
| tsc | ok | ok |
| art_catalog | 13 passed | 13 passed |
| art_bounds | 2 passed | 2 passed |
| art_raster | 11 passed, rc=1 (2 known) | same |
| avatar unit / costume / rooms | 50 / 20 / 71 passed | same |
| avatar_test | 34/34 | 34/34 |
| hood | 44/44 | 44/44 |
| eggs | rc=0 | rc=0 |
| b0_compat | 14/14 | 14/14 |
| mail_persist node/worker/b0 | 4/4/1 | 4/4/1 |
| migration vs 10ef736 | 43/43 | 43/43 |
| phone | 381/383, 380/383 (only "Let's play visible" at short landscape, button 43-46 px at viewport edge); one run hit a random pet covering the back-door label | 383/383, earlier 346/348 with the same "Let's play visible" fail at 932x430 |
| scene_hotspot all 13 scenes | 613 PASS, 0 FAIL | n/a |
| scene_hotspot SCENE_SHIFT=12,10 | 19 FAIL across 10 adapter scenes (expected); map/map-portrait/park/ranch use their built-in shift negatives | n/a |
Found + fixed during gate: town's `.parkWorld.sceneArtOn > svg.parkScene {visibility:hidden}` also hid the ranch svg (ranchWorld has .parkWorld) -> phone_test timed out on `.ranchScene`. Fixed with :not(.ranchWorld) (7c2ece7).

## Preview deploy (11:3x CT) — done from 7c2ece7 code (e88a8e7 adds only status)
- deploy-preview.sh: cozy-preview gh-pages f70d538 -> af9f7ae5dd4976c560fdcbb8d6b6e0327d62ab10; live bundle index-DI7YMcfJ.js (was index-C3A4WDTr.js). Worker not redeployed (stays a40cfe72-19aa-49d2-9936-968939be066a).
- curl: preview index serves index-DI7YMcfJ.js (200, 846,903 B); assets/park-CE9nIY_g.webp 200 image/webp 148,090 B, byte-identical to build. Production still index-BWqIX3eQ.js.
- Rollback: push f70d538 back to cozy-preview gh-pages (git push -f https://github.com/andrewmunruh/cozy-preview.git f70d538c230b8dbbad9a38104ce85fa1ae71599f:gh-pages from any clone that has it, or redeploy from ec4b455).

## Two-client smoke (preview, new client + old 10ef736 client) — 12:10 CT
| browser | size | ok | chips | yard | map | new-client scene art (12 views) | old client | pageerrors |
|---|---|---|---|---|---|---|---|---|
| chromium | 820x1180 / 844x390 / 390x844 | ✅✅✅ | 13/13 painted=12 | 11/11 | 2 | all painted (rooms×6, backyard, map, park, ranch, barn, clubhouse) | vector only (expected) | 0 |
| webkit | 820x1180 / 844x390 / 390x844 | ✅✅✅ | 13/13 painted=12 | 11/11 | 2 | all painted | vector only (expected) | 0 |
Map shows map-portrait on tall views and map on landscape. Hosts were only github.io and the preview worker.

## phone_test final rerun (run 5, head de7c564; code identical to 7c2ece7) — 12:45 CT
381/383. Failures: "Let's play is visible without scrolling" at 844x390 ({top:319, bot:362, h:43, ih:390}) and 667x280 (h:45, bot 294 > ih 280).
All PR phone runs, honestly reported:
| run | result | failures |
|---|---|---|
| PR1 | crash | ranch svg hidden by town CSS → fixed 7c2ece7 |
| PR2 | 380/383 | Let's play 844x390, 844x300, 667x280 |
| PR3 | crash | Let's play 844x390, then pet (Clover the cat) intercepted the tap on .yardHintLabel |
| PR4 | 381/383 | Let's play 844x300, 667x280 |
| PR5 | 381/383 | Let's play 844x390, 667x280 |
| base1 | 346/348 | Let's play 932x430 |
| base2 | 383/383 | — |
The welcome card is untouched by this PR, and base also failed this check once (base1). The button is in the viewport at 844x390, but h=43 is under the 44 px floor. That looks like the card's entry animation being measured mid-scale. The failure is NOT proven identical to base: base hit it at a different size, and the PR fails it more often (4 of 4 completed-or-partial runs vs 1 of 2). The pet-covers-label crash is a test-timing issue: a wandering pet sits over the label. Not fixed here.

## Memory mitigation decision
No code or painting change. Chromium PSS after a full tour: PR 663 MB vs base 257 MB. After a purge: 167 vs 153 MB. Only one painting stays in the DOM (release-on-leave). Worst single decoded scene: ranch 34.6 MB, park 27.8 MB. A 1.5x downscale (to 800 px tall) would save about 12–15 MB per scene, but the scene renders about 900 CSS px tall at dpr 2 on Reagan's iPad, so it would visibly soften. Decoding to the displayed size doesn't shrink WebKit's bitmap. Recommendation: ship as is, and check on the real iPad.

## Shots — /workspace/t-batchB-shots/int/
117 WebKit shots: 13 scenes × 3 sizes × {cur-ec4b455, pr-7c2ece7, pr-7c2ece7__artv1}. Also contact_844x390.png and rooms6_844x390.png.

## "Let's play visible" investigation (13:00 CT) — verdict: test-timing race, not a layout regression; code left alone
Script: .intwork/wn.py, log .intwork/wn1.log. Static servers on 6770 (PR dist 7c2ece7) and 6771 (base ec4b455). Each case: 3 fresh loads × {base, pr, pr ?art=v1} × {844x390, 844x300, 667x280} × {webkit, chromium}. Measured at the moment phone_test does (right after .whatsNew .card appears) and again after 3 s.
- **Settled (3 s), every run, both browsers, all three builds, identical:**
  - 844x390: button top 266, bottom 314, h 48; card 63–327.
  - 844x300: 221/269/48; card 18–282.
  - 667x280: 211/259/48; card 8–272.
  - PR == base == PR art=v1.
- **At first appearance:** the card is still in its pop-in animation (scaled down and lower). This happens on both builds:
  - Base WebKit 667x280 run 0: h 43.2, bottom 307 > 280. This would FAIL the test on base.
  - PR Chromium 844x390 run 2: top 318.9, bottom 362.1, h 43.2, card bottom 374. This is exactly the phone_test failure value (319/362/43/374).
  - PR Chromium 844x300 runs 1–2: h 44.5, bottom 304 > 300.
  - Early-state hits: PR 3/27 loads vs base 1/27 loads (WebKit + Chromium). The PR's extra startup work (decoding the room painting) makes it more likely the check lands mid-animation.
- The PR diff doesn't touch the welcome card or its CSS. The src diff is art/scene.ts, load.ts, gameroom-view.ts, main.ts (art host/show/release only), scenery.css (art rules), scenery.ts.
- Bisect by merge: skipped as moot. With the animation finished, there is no measurement difference to localize.
- Suggested harness fix (NOT applied, test-only): in lets_play_visible, await Promise.all(document.getAnimations().map(a=>a.finished)) or wait about 600 ms before measuring.
- **Pet over door label:** the PR changes nothing in pets or .yardHintLabel (style.css is unchanged from base, label z-index 2). The art img is pointer-events:none. A wandering pet can cover the label on base too, so it is the same test-timing hazard, not PR-specific. The run-3 crash came from the test's raw locator.tap() on a covered label.
No code change, so no re-gate, no redeploy, and no new shots. The preview stays at af9f7ae5.

## Test-only fix dde2f3e + gate (13:06 CT)
dde2f3e touches only phone_test.py (+6 lines: wait for the .whatsNew finite animations, capped at 2 s, before measuring). `git diff --stat 7c2ece7 dde2f3e` = phone_test.py + BATCHB_INT_STATUS.md only. A rebuild at dde2f3e is `diff -r` identical to /workspace/t-batchB-int-dist (the 7c2ece7 dist), so the preview build is unchanged.
Gate on the PR dist (ports 6770-6779), .intwork/gate_pr6/: tsc ok; art_catalog 13; art_bounds 2; art_raster 11 + 2 known fails (rc=1, same as base); avatar 50; costume 20; rooms 71; **phone_test 383/383 and second run 383/383**; hood 44/44; eggs ok; avatar_test 34/34; b0 14/14; mail_persist node/worker/b0 4/4/1; migration 43/43; scene_hotspot 613/0; shift negative 594/19 (expected).

## Clubhouse seam 7690913 + salon decision + final gate (13:40 CT)
- **Clubhouse (scenery.css only):** strip edge colours now match the painting's measured edge rows (top #efd0e3, bottom #bb6a8a). On tall portrait (`:has(> .grExtWrap)`) the painting's top 3% and bottom 2.5% are feathered with a mask into a matching grWorld background, so the hard seam line is gone. The vector light strings in the strip stay.
- **Salon: no change.** Measurement doesn't support "darker/more saturated". Asset means: salon L 209.6 / S 40.0, the 2nd-brightest and the least saturated of the 6 rooms (living 193/72, kitchen 206/65, bedroom 192/69, bath 211/45, nursery 209/51). Rendered 844x390 wall L/S: salon 210/42 vs rooms 194–211 / 50–61. Its shift vs production (wall L −20) is the same as the other rooms (−18 to −22). Its plum stripes read as darker, but this isn't a tone-grade outlier, so I didn't re-grade it.
- **Final gate on 7690913** (dist /workspace/t-batchB-int-dist-final, .intwork/gate_final), all identical to base: tsc ok; art_catalog 13; bounds 2; raster 11 + 2 known; avatar 50; costume 20; rooms 71; phone 383/383; hood 44/44; eggs ok; avatar_test 34/34; b0 14/14; mail 4/4/1; migration vs 10ef736 43/43; scene_hotspot 613/0; shift negative 594/19 (expected).
