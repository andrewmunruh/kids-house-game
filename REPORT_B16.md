# B16 report — yard-bench refit + seed-spot migrate

Times are America/Chicago (CST, UTC-6). Written as the remaining steps finish so an interruption does not lose the packet.

## SHA and branch

| Item | Value |
|---|---|
| Tip (implement option 1) | `7a7250dedfbae990e2d1ea8a4c081bc0a4d3339e` — Move a seed-spot saved yard bench once and mark the save |
| Refit (rebased onto B15) | `ab1c518a27adbc91324bdc9620d91fc8fa19ce78` — Refit the yard bench wider so two kids fit (no repaint) |
| Base (production / old client) | `5909d539f77b44ac1893ed7a17de03fc2db869ff` — B15 |
| Local branch | `cursor/bench-refit-r2` in `/workspace/t-bench-refit` |
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

## Push

Earlier normal-push of **`cursor/bench-refit-r2`** was `4d6051e` (report on top of `7a7250d`). This follow-up adds `concurrent_refit.py` and the official 5/5 + 5/5 concurrency results (`673d160b732bfd000d2f27a494db3f8f8121b86c` is that test+report commit).

- Remote: `https://github.com/andrewmunruh/kids-house-game/tree/cursor/bench-refit-r2`
- PR link: `https://github.com/andrewmunruh/kids-house-game/pull/new/cursor/bench-refit-r2`
- `origin/cursor/bench-refit` was left at old `ffb61ad`. No force-push. No deploys, no preview/gh-pages, no ports 9800–9899.
