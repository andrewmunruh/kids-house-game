# B16 report — yard-bench refit + seed-spot migrate

Times are America/Chicago (CST, UTC-6). Written as the remaining steps finish so an interruption does not lose the packet.

## SHA and branch

| Item | Value |
|---|---|
| Tip (implement option 1) | `7a7250dedfbae990e2d1ea8a4c081bc0a4d3339e` — Move a seed-spot saved yard bench once and mark the save |
| Refit (rebased onto B15) | `ab1c518a27adbc91324bdc9620d91fc8fa19ce78` — Refit the yard bench wider so two kids fit (no repaint) |
| Base (production / old client) | `5909d539f77b44ac1893ed7a17de03fc2db869ff` — B15 |
| Local branch | `cursor/bench-refit-r2` in `/workspace/t-bench-refit` |
| Camera visits (this follow-up) | `4ac2edcb14bb42af8020aafc2d6689d65f349a4b` — Frame her avatar on each yard visit and keep a pan only for that visit |
| Push target | **`cursor/bench-refit-r2`** (new branch). `origin/cursor/bench-refit` is still the old `ffb61ad` off `42b8fd4`; do not force-push it. |

No deploys. B7-r7 was not rebased. Ports used: 5300–5349 only. Did not touch cozy-hood-preview, cozy-preview gh-pages, or ports 9800–9899.

## What shipped in 7a7250d

Option (1), as App Builder chose: only a yard bench that is **exactly** at the seed `1122,372` in the backyard, still at default rotation (`flip: false`) and default size (`scale` 1, no custom `size`), is moved to `1420,372`. Anything a kid placed, flipped, or resized stays put.

A one-time marker `yardBenchRefit: 1` is written into the save (version stays 3; this is an extra field, not a version bump). Once the flag is set, the nudge never re-runs, even if a bench later sits at `1122,372`.

**Limitation:** if a kid moved the bench and then put it back exactly at `1122,372` *before* the flag exists, that pose is indistinguishable from the seed, and we would move it too.

New houses are born already marked, with the starter bench at `1420,372`.

---

## Where migrate runs

`migrate()` in `src/shared/state.ts` is still the shared, pure upgrade path (“safe to run on a server too”). The B16 nudge is `applyYardBenchRefit()`, called at the end of `migrate()`, using the **raw save’s** `yardBenchRefit` (not the value spread in from `initialState()`, which is born with the flag and would otherwise skip the nudge).

It runs on **both client and Worker**:

| Path | What runs |
|---|---|
| **Client, solo** | `createStore` / `readHouse` call `migrate()`. If the raw save was unmarked, `patchSavedYardBenchRefit` writes only the bench move + marker into `localStorage` (the pre-refit copy stays in the backup key). Other in-memory fill-ins are not flushed. |
| **Client, hooded** | `adoptHouse()` in `src/net.ts` calls `migrate()` on welcome, `house`, `ack`, and before applying an `act`. The in-memory view is already at `1420` + flag. Clients do **not** send a competing `item/move` for the nudge. |
| **Worker, bring-house** | `cleanHouseState()` already calls `migrate()`, then rebuilds the house from a known-field list. |
| **Worker, disk load** | On `Neighborhood.load()`, after `ensureRooms` (still memory-only for missing rooms), `applyYardBenchRefit` runs. If a backyard was **already stored** and the refit changed the in-memory house, the Worker `save()`s that house. A fill-in of a missing backyard is still not written until the first real edit. |

So the **authoritative persist** for a street house is the Worker: one load, one write, both clients then see the same marked save. Two new clients opening the house at once do not each write a move.

---

## Marker vs Worker sanitizing

`cleanHouseState` (the Worker’s house whitelist; not `cleanPresence`, which is only presence) **rebuilds the house from known fields** and **strips unknown keys**.

An unlisted `yardBenchRefit` would be dropped on bring-house or any other `cleanHouseState` path, so a later load could treat a bench at `1122,372` as the seed again.

**Smallest Worker-side change (implemented, in shared `src/shared/hood.ts`):** copy `yardBenchRefit: 1` through the `cleanHouseState` rebuild. That is the whitelist addition this feature needs; it ships with the Worker. No new action type and no protocol bump.

Unit proof (`tests/rooms_test.ts`):

- `cleanHouseState` keeps the marker and the nudged bench at `1420,372`.
- An unknown extra field is still stripped, and a **already-marked** bench at `1122,372` is left there.
- Worker load of a stored seed-spot bench writes `1420` + marker **once**; a second load does not fight the save.
- Worker load leaves a kid-moved bench at `1500` and still writes the marker.

An **old** Worker (e.g. 10ef736 or today’s 5909d53, without this whitelist) still drops the flag. The bench position at `1420` is kept. A later B16 Worker or client sets the flag again and does not re-nudge. `tests/social_test.ts` records that old `cleanHouseState` vs this build matches on every field except the dropped flag.

---

## Migration test: named exception + moved bench

`migration_test.py` 45/45 passed (was 44/44 plus the new check).

- **Named exception** (this case only): `yard_bench_refit_exception` allows a seed-spot yard bench `1122,372` (default rotation and size) to move to `1420,372`, and `yardBenchRefit` to become `1`. Any other field or room diff still fails. The rooms-identical check uses this helper, named in the check title: `every room is identical … [B16 named exception: seed yard-bench 1122,372 -> 1420,372 + yardBenchRefit]` — PASS (169 items).
- **A bench a kid moved stays where she put it:** in phase A, Quinn (K2) moved `yard-bench-1` to `1500,372`. After the new build: `k2 (1500, 372) -> (1500, 372)` and the marker is set; the other houses’ seed benches are at `1420` with the marker — PASS.

Solo `cozy-house` identity uses the same named exception (the client may persist the marker on first B16 load). Disk room-name identity still holds (the Worker only rewrites an already-stored backyard’s bench + flag, not a fill-in of missing rooms).

---

## Concurrency

**Where the write happens:** Worker `load()`, not the two clients. Clients only adopt the already-migrated house.

**Harness (`concurrent_refit.py`):** rewind a stored street house to the pre-B16 seed (`1122,372`, no flag), restart the new Worker, connect two new clients at once (owner reconnects with her token, a visitor joins the same street), both enter that house via `testnav.go('house:<id>')` and switch to the backyard with `room/switch` only (not an `item/move`), then read both views and the Worker save. WebSocket spy records any `item/move`. A real assertion failure stops the run; a navigation timeout is retried once.

Boot does **not** wait for `#stage` or `#btnMap` to be visible: `body.view-street` hides `#stage`, and `body.view-map` sets `#btnMap { display: none }`. `#btnHood` lives in the closed menu. The client is ready when `#btnMenu` is up or the map already shows houses.

### Gate run (00:05–00:09 CST) — 0/10

The first gate attempt joined both clients by nickname. Nick 0 was already claimed, so both sides timed out waiting for the map. This was a harness bug, not a save fight. The gate was **not** restarted; remaining steps (migration 45/45, oldsmoke, heartbeat) finished at 00:22:41 CST.

### Retry 1 (locks acquired 00:48:05 CST, done 00:51:38 CST) — 5/10, all successful trials clean

Harness flake: `#stage` stayed hidden behind the phone/welcome overlay in some launches (waited for `#stage` visible *before* clicking `#phoneOk`).

Every trial that actually reached the house agreed:

| Browser | Trial | Result |
|---|---|---|
| WebKit | 1, 2, 3, 5 | FAIL — `#stage` hidden (did not reach the house) |
| WebKit | **4** | **PASS** — both views `1420,372` + `yardBenchRefit=1`; disk `1420` + flag once |
| Chromium | 1 | FAIL — `#stage` hidden |
| Chromium | **2, 3, 4, 5** | **PASS** — both views `1420,372` + `yardBenchRefit=1`; disk `1420` + flag once |

No trial that loaded the house double-wrote or left the bench at 1122. Chromium: 4/5 successful loads, all clean. WebKit: 1 successful load, clean.

### Retry 2 (pid 1311023, ports 5306–5307) — finished 00:57:54 CST, 0/10

This retry was left running and was not restarted. All ten launches timed out waiting for `#stage` to become visible (Playwright: attached but hidden). None reached the house, so this run adds no save-level data. Likely a harness issue: `#stage` is `visibility: hidden` on `body.view-street` (the map), and a visible-stage wait is the wrong gate once a client has landed on or flashed the map. It is not a Worker double-write.

### Official 5/5 + 5/5 (locks 01:40:57 CST, done 01:42:22 CST) — 10/10, no real failures, no harness retries

Leftover retry pid 1311023 and the old 5306/5307 servers were already gone when this pass started. App Builder `r7gate.sh` held soak.lock/gate.lock on ports 9800–9801 until 01:34:51 CST; we waited and did not touch those processes. Ports used: 5306–5307 only.

`concurrent_refit.py` was fixed so both clients enter the house (or backyard) before asserting: they join/reconnect on the map, then `testnav.go('house:<id>')` and `room/switch` to the backyard. A first full 5+5 attempt still timed out on Chromium during boot because it waited for `#btnHood, #btnMap` visible — `#btnMap` is `display: none` on the map, which is where a reconnect lands. That run was stopped (WebKit had already gone 5/5; Chromium had 1 pass and several harness timeouts). Boot was changed to wait for `#btnMenu` or map houses instead, then the official run was started clean.

Log: `/workspace/t-bench-refit/logs/concurrent_5x5_run.log`. JSON: `/workspace/t-bench-refit/logs/concurrent_refit_5x5.json`.

| Browser | Result |
|---|---|
| WebKit | **5/5 PASS** — trials 1–5, first attempt each |
| Chromium | **5/5 PASS** — trials 1–5, first attempt each |

Every trial:

- two new clients loaded the same saved seed-spot house at the same time
- both views: backyard, in the house, bench at **1420,372**, **`yardBenchRefit=1`**, views agreed
- Worker disk: `yard-bench-1` at **1420,372** exactly once, flag set
- no `item/move` on the wire (`itemMoves: []` on both clients)
- no extra item/move ops

No trial failed for a real (non-harness) reason.

### Concurrency conclusion

The official proof is **WebKit 5/5 and Chromium 5/5**. Earlier 0/10 and 5/15-style runs were harness timeouts (`#stage` hidden on the map, then `#btnMap` hidden on the map) and did not reach the house. Every trial that opened the house — including this 10/10 and the earlier retry-1 five that did reach it — agreed:

- both clients saw the bench at **1420,372** with **`yardBenchRefit=1`**
- the Worker save had the bench at **1420 once** and the marker set
- no double-write or fight (the Worker persists on `load()`; clients only adopt; no `item/move` on the wire)

---

## Shots and sheets

Full-frame in-game shots of a **migrated saved house** (fixture `tests/fixtures/save_v3_old10.json`, bench started at `1122,372`) at 820×1180 and 1180×820, WebKit and Chromium. Old client is 5909d53.

Sheets (one per orientation, WebKit row + Chromium row, three columns):

- `/workspace/t-bench-refit/shots/migrated_820x1180.png`
- `/workspace/t-bench-refit/shots/migrated_1180x820.png`

| Column | What we see | Door / trunk / tulips |
|---|---|---|
| **Before** — 5909d53 client, save still at 1122 | Small catalog bench in the old nook, overlapping the tree trunk | Door and tulips clear; **trunk overlaps** the seed bench (this is why option 1 exists). 1180×820 overlap ~21.7×113 px; 820×1180 ~31.7×165 px. |
| **After** — new client opens the same save | Wide 2.2× bench at 1420, past the tree; marker set | **All clear** (door, trunk, tulips area 0) on both browsers and both orientations. |
| **Old-client view of the migrated house** — 5909d53 opens a save already at 1420 | Small catalog bench at 1420, past the tree, looks fine | **All clear** on both browsers and both orientations. |

Per-frame files live next to the sheets as `{webkit,chromium}_{820x1180,1180x820}_migrated_{before,after,oldclient}.png`.

Mixed old/new seating shots (for the 2.2× refit itself, not the migrate) are in `refit_{webkit,chromium}_{820x1180,1180x820}.png`. New-client view: 0 overlap, no hang. Old 5909d53 view: production pile-up (~66 px landscape / ~96 px portrait, hang), as expected with the old 140-wide catalog.

---

## Gate table

Full `refit_gate.sh` on 5909d53 + this tip, ports 5300–5349, locks acquired 23:58:04 CST, done 00:22:41 CST. (Waited for B7-r8 / r8retry to release soak.lock and gate.lock; did not kill them.)

| Step | Result |
|---|---|
| tsc | **pass**, rc=0 |
| unit (rooms, firstrun, social, sit, baby, ambient, avatar, bathroom_size) | **497 pass / 0 fail**, rc=0. Includes sit **119/119**. `rooms_test` 85 passed (nudge, marker, cleanHouseState, Worker load). `firstrun` goldens updated for 1420 + flag. |
| art_ingame_bounds (backyard) | **30/30 pass**, warn 0, fail 0, ±2% pass / ±3% warn, rc=0 |
| scene_hotspot | **549 pass / 0 fail**, rc=0 |
| migrated saved-house shots + sheets | Sheets written (see above). After and old-client: door/trunk/tulips clear. Before at 1122 overlaps the trunk (expected). |
| refit before/after + mixed shots | Sheets written. New view clear; old-client mixed view is the known production pile-up. |
| concurrent 2-client (inside the gate) | **0/10** — harness bug (nick 0 already claimed). Not a save fight. |
| concurrent 2-client (official, after harness fix) | **WebKit 5/5, Chromium 5/5**, 10/10, rc=0, 01:40:57–01:42:22 CST. See Concurrency. |
| migration | **45/45 passed**, rc=0, including the named exception and the kid-moved-bench test |
| oldsmoke chromium | **OLDSMOKE chromium PASS**, rc=0 |
| oldsmoke webkit | **OLDSMOKE webkit PASS**, rc=0 |
| heartbeat pr/pr | **PASS=18 FAIL=0 ERR=0**, rc=0 |

`tests/polish_test.ts` has a last-line CSS assertion (`new css avoids nesting, color-mix, view transitions, and :has()`) that already fails on production 5909d53. It was not part of this unit battery and is not a B16 regression.

---

## App Builder review follow-up (portrait reach + write-back)

Times are America/Chicago (CST, UTC-6). Landscape was already approved: door, trunk and tulips are clear, and the old client shows the small bench at 1420. This pass answers the two open items. Seed **x stays 1420**. Art was not repainted.

### 1. Portrait 820×1180 — what a kid actually sees

The backyard camera is staged at `YARD_CAM = 864` (`src/yard.ts` line 67) so the play set (door, tree, tulips) shares one frame at every size. `fit()` narrows the window in portrait. On an 820×1180 WebKit iPad, measured:

| | Landscape 1180×820 | Portrait 820×1180 |
|---|---|---|
| `VIEW_W` | 1000 | **482** |
| Default camera | 864 | 864 |
| Visible world | 864–1864 | **864–1346** |
| Bench at 1420 (308 wide, 1266–1574) | Fully on screen, not behind the arrow | Only **26.5%** on screen; the rest is off the right edge, **behind the › arrow** |
| Old-client small bench at 1420 (140 wide, 1350–1490) | Fully on screen | Almost entirely off the right edge (that is why it looked missing) |

A kid can pan. The › arrow is on because there is more yard to the right. One tap glides the camera to 1153, and the bench is then fully on screen. A second measurement after a slightly longer pan used for the new frames (cam ≈ 1170) puts the bench fully left of the arrow as well.

**Why the seed stays 1420:** a 308-wide bench that stays past the tree canopy needs `x ≥ 1407`. To sit fully in the default portrait window and left of the › arrow, its right edge would have to be ≤ 1266, so `x ≤ 1112`. Those two ranges do not overlap. There is no other x that is both clear of the door and trunk and fully in the default 482-wide portrait frame. Zooming the yard out far enough to keep the door and a 1420 bench in one portrait frame would letterbox the stage and no longer match the living room. So 1420 stays, and in portrait a kid uses › once to reach it — the same way she pans any other part of a wide room.

A real bug was that `frameYardCam()` and `frameHouseKid()` always snapped the backyard back to 864, including after a › tap and after a sit. A later `fit()` (resize, or switching Play/Decorate) would hide the bench again. Both now honor `camAuto()` / `markPanned()`, so once she pans, the camera stays put. Default entry is still the staged play-set camera.

Play and Decorate proof, **WebKit 820×1180**, real pointers, `tests/yard_bench_reach_test.py`: **REACH PASS**. After one › pan, two kids were dragged onto the bench and both sat (`pose-sit` on `yard-bench-1`, seats n=0 and n=1). In Decorate the bench was dragged (1420,372 → 1357.9, 392.7). Frames: `/workspace/t-bench-refit/shots/reach_play_before_sit.png`, `reach_play_two_sit.png`, `reach_decorate_dragged.png` (JPG copies under `send/`).

### New migrated frames (bench in view)

Shots now read the real `VIEW_W` from the stage and pan only when the bench would otherwise be off-screen or under the arrow — the same move a kid makes with ›. Landscape stays at the default 864 camera.

Full-size PNGs:

| What | WebKit | Chromium |
|---|---|---|
| Portrait 820×1180 after (new client, bench at 1420, cam ≈ 1170, fully in view, door/trunk/tulips clear) | `/workspace/t-bench-refit/shots/webkit_820x1180_migrated_after.png` | `/workspace/t-bench-refit/shots/chromium_820x1180_migrated_after.png` |
| Portrait 820×1180 old 5909d53 client (small bench at 1420, same cam, fully in view, clear) | `/workspace/t-bench-refit/shots/webkit_820x1180_migrated_oldclient.png` | `/workspace/t-bench-refit/shots/chromium_820x1180_migrated_oldclient.png` |
| Landscape 1180×820 after (default cam 864, fully in view, clear) | `/workspace/t-bench-refit/shots/webkit_1180x820_migrated_after.png` | `/workspace/t-bench-refit/shots/chromium_1180x820_migrated_after.png` |
| Landscape 1180×820 old 5909d53 client (small bench at 1420, default cam, fully in view, clear) | `/workspace/t-bench-refit/shots/webkit_1180x820_migrated_oldclient.png` | `/workspace/t-bench-refit/shots/chromium_1180x820_migrated_oldclient.png` |
| Before, still at 1122 (overlaps the trunk; why option 1 exists) | `/workspace/t-bench-refit/shots/webkit_820x1180_migrated_before.png`, `webkit_1180x820_migrated_before.png` | same names with `chromium_` |

Sheets (WebKit row + Chromium row): `/workspace/t-bench-refit/shots/migrated_820x1180.png` and `migrated_1180x820.png`.

Smaller JPGs for App Builder, on the box: `/workspace/t-bench-refit/send/` — including `migrated_820x1180.jpg`, `migrated_1180x820.jpg`, the after and old-client frames, the before frames, and the three reach shots.

### 2. Write-back safety

**An old 5909d53 client never sends a whole house or room that would drop `yardBenchRefit` or put the bench back at 1122.**

Outbound message types are the `ClientMsg` union in `src/shared/hood.ts` (same shape on 5909d53, lines 907–931 in that tree): `hello`, `join`, `ping`, `knock`, `dog`, `fx`, `ranch`, `act`, `pres`, `look`, `lock`, `say`, `mail`, `art`, `tbl`, `parent`. There is no house put, room put, state put, reset, or reseed message.

- **`hello`** is token-only. Reconnect does not attach a house (`server/core.ts` on 5909d53, the `hello` and `join` switch around lines 487–557).
- **`join`** may include `house` once, when a kid first brings her local save onto a new street. After that the Worker owns the house. That one-time bring runs `cleanHouseState`. An old Worker would strip an unknown `yardBenchRefit` flag but would keep item positions, so a bench already at 1420 stays at 1420.
- **`act`** is the only furniture write. `cleanAction` in `src/shared/hood.ts` (starts line 711) accepts per-item edits such as `item/move` (line 716: id + x + y only). It returns null for `game/reset`, `room/switch`, and any invented `state/put`, `house/put`, `room/put`, or `game/reseed`.
- On the old client, `houseStore.dispatch` in `src/net.ts` lines 399–409 **returns without sending** for `game/reset`, and treats `room/switch` as a local room choice. An item/move is sent only if the kid actually moves that piece.

So an old client viewing a migrated house at 1420 with the flag set will not write the flag away or move the bench, unless the kid herself drags it.

**Old Worker + new client, no migrate/strip loop.** 5909d53 `cleanHouseState` (`src/shared/hood.ts` lines 773–801 in that tree) rebuilds the house from a known-field list and drops `yardBenchRefit`. The new Worker copies the flag through (current `src/shared/hood.ts` lines 799–801).

The new client's `adoptHouse` in `src/net.ts` lines 10–16 is **adopt-only**: it calls `migrate()` in memory and never dispatches an `act`, `item/move`, or whole-house write-back. If the Worker returns a house with the bench already at 1420 and no marker, `applyYardBenchRefit` (`src/shared/state.ts` lines 530–546) only sets the in-memory flag; it does not move the bench, because 1420 is not the seed pose. If the Worker still has a seed bench at 1122 (an old Worker never nudged), adopt moves it to 1420 **in memory only**. That does not go back over the wire, so it cannot fight a kid's later placement or send a move on every load.

Tests in `tests/rooms_test.ts` (the new write-back block): old sanitizer strips the flag and keeps 1420; five strip+migrate rounds stay at 1420; a second adopt after an old sanitizer does not move again; a kid-placed bench at 1500 stays at 1500; `cleanAction` rejects whole-house/reset/reseed; `item/move` only changes that item. All added checks passed; rooms_test is included in the unit battery.

The 2-client concurrent test was not re-run because the seed x did not change. The official result remains WebKit 5/5 and Chromium 5/5 at 1420.

### Gate (this follow-up)

Full `refit_gate.sh` on ports 5300–5349, locks acquired 02:00:45 CST, done 02:26:00 CST. Concurrent was skipped because the seed is still 1420 (official WebKit 5/5 and Chromium 5/5 still stand).

| Step | Result |
|---|---|
| tsc | **pass**, rc=0 |
| unit (rooms, firstrun, social, sit, baby, ambient, avatar, bathroom_size) | **506 pass / 0 fail**, rc=0. Includes sit **119/119**. rooms_test **94 passed** (the earlier B16 checks plus the new write-back block). |
| art_ingame_bounds (backyard) | **30/30 pass**, warn 0, fail 0, rc=0 |
| scene_hotspot | **549 pass / 0 fail**, rc=0 |
| migrated saved-house shots + sheets | Sheets rewritten with the bench in view in both orientations. After and old-client: door/trunk/tulips clear. Before at 1122 overlaps the trunk (expected). |
| yard_bench_reach (WebKit 820×1180) | **REACH PASS**, rc=0 — two kids sit, Decorate drag works |
| refit before/after + mixed shots | Sheets written. New view clear; old-client mixed view is the known production pile-up. |
| migration | **45/45 passed**, rc=0, including the named exception and the kid-moved-bench test |
| oldsmoke chromium | **OLDSMOKE chromium PASS**, rc=0 |
| oldsmoke webkit | **OLDSMOKE webkit PASS**, rc=0 |
| heartbeat pr/pr | **PASS=18 FAIL=0 ERR=0**, rc=0 |

---

## Push


Earlier normal-push of **`cursor/bench-refit-r2`** was `4d6051e` (report on top of `7a7250d`). This follow-up adds `concurrent_refit.py` and the official 5/5 + 5/5 concurrency results (`673d160b732bfd000d2f27a494db3f8f8121b86c` is that test+report commit).

The portrait-reach and write-back follow-up is `3694e2002db638ecfe896ea1e1539acc53b5c01f`.

- Remote: `https://github.com/andrewmunruh/kids-house-game/tree/cursor/bench-refit-r2`
- PR link: `https://github.com/andrewmunruh/kids-house-game/pull/new/cursor/bench-refit-r2`
- `origin/cursor/bench-refit` was left at old `ffb61ad`. No force-push. No deploys, no preview/gh-pages, no ports 9800–9899.

## Camera visits (after 1c1d9db preview clearance)

App Builder accepted seed 1420 and the write-back proof at 1c1d9db, and asked for one more check: the camera must frame the kid's own avatar on first entry to the yard and on every room switch. A pan is kept only for the rest of that same visit, so no kid is stranded off-camera.

### What the code did, and the fix

Before this change, `panned` and `cams[room]` were never cleared on `room/switch`. A backyard pan (for example cam ≈ 1132 after a › tap to reach the bench at 1420) was restored on the next visit. `goThroughYardDoor` still places her at YARD_KID 1084, so in portrait (VIEW_W = 482) a stale cam of ~1132 left her off the left edge.

`src/main.ts` now:

- Adds `beginRoomVisit(room)`, which deletes `panned` and `cams[room]` for that room.
- Calls it at the start of the `room/switch` handler, before `moveMeToRoom` / `renderAll` / `fit()`.
- On a new backyard visit (`camAuto()`), `frameHouseKid` falls through to the existing avatar-framing path (body and name tag inside the stage, clear of the ‹ › arrows). `frameYardCam` delegates to `frameHouseKid` instead of snapping to `YARD_CAM`, so a tab-switch while she is already at the bench still frames her there.
- After a pan or a sit in the same visit (`!camAuto()`), `frameHouseKid` and `frameYardCam` keep that camera. `moveDoll` and `placeMe` call `markPanned()` when a seat is set, so a sit does not snap the view back.

Visit-scope applies to every room, not only the backyard.

### Gate test

`tests/yard_cam_visit_test.py` runs at 820×1180 on WebKit and Chromium (Playwright, has_touch, fixture `save_v3_old10.json`). It covers:

1. First yard entry through the living-room back door (lands at YARD_KID 1084) frames her avatar.
2. One › pan (cam 843 → 1132.2) then a tap-sit on `yard-bench-1`; the pan is kept at 1132.2.
3. Leave for the house and come back through the door: cam returns to 843, she is framed at 1084, not the stale 1132.2 pan.
4. A `room/switch` to living (824) and to kitchen (900) frames her avatar.

Hooked into `refit_gate.sh` as `run_cam_visit` on port 5312, after `run_reach`. Concurrent load was not re-run: the seed is still 1420. Work SHA: `4ac2edcb14bb42af8020aafc2d6689d65f349a4b`.

Pre-gate run of that test (dist-trial, port 5312, 02:35 CST): **YARD_CAM_VISIT PASS** on WebKit and Chromium.

### Full gate

Full gate 02:36:01–02:55:02 CST under soak.lock then gate.lock, ports 5300–5349 only. Concurrent skipped (seed still 1420). All green:

| Step | Result | When (CST) |
|---|---|---|
| tsc | rc=0 | 02:36:03 |
| unit | 506 pass / 0 fail | 02:36:09 |
| art_ingame_bounds backyard | 30/30 pass, 0 warn | 02:36:42 |
| scene_hotspot | 549 pass / 0 fail | 02:40:35 |
| migrated shots | sheets written | 02:41:09 |
| yard_bench_reach 820×1180 WebKit | REACH PASS | 02:41:18 |
| yard_cam_visit 820×1180 WebKit + Chromium | YARD_CAM_VISIT PASS | 02:41:34 |
| refit shots | 50 pngs + sheets | 02:42:53 |
| migration | 45/45 passed | 02:43:52 |
| oldsmoke chromium | PASS | 02:47:16 |
| oldsmoke webkit | PASS | 02:50:45 |
| heartbeat pr/pr | 18/0/0 | 02:55:02 |

No wrangler, no deploy, no touch of ports 9800–9899. Ports 5300–5349 were clear after the gate.

