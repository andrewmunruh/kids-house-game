# B13 — Needs and reactions polish

Branch: `cursor/batch13` off `2ae692f`. Step 1 QA (CST, America/Chicago) on the current R1 client (`/workspace/r1/dist-pr`). In-game on iPad 820×1180 and 1180×820, Chromium and WebKit. Local hood only for the two-client pass (ports 5377/5378). No deploys.

B11 already shipped into R1 (show-wishes label, plush grip, fridge hint glow, Kitchen-tab pulse, friend hop/heart, stereo/fire FX, lie+snooze “z z”). Those are not re-proposed. The Kitchen-tab pulse is still working (see `shots/before/webkit_820x1180_hungry_living_kitchen_tab.png`).

Art rules for the build: no faces on items (plush keep theirs); never repaint shipped art (refits only); bounds ±3%; kid-safe; original.

## QA notes (not proposed)

- Stereo dance and doll-to-doll `soc-duet` already sync to a visiting friend. Probes: `shots/before/friends.json`. Guest shot: `shots/before/webkit_820x1180_friend_guest.png`.
- The floating “Backyard” label in the living room is the audit P3 layout note, not a need/reaction. Left out of this batch.
- A first recapture of the bed conflict forgot `room/switch` (`shots/before/*_lie_bed_apple_wish_vs_zzz.png` is still the bathroom). The evidence below is the framed first-pass QA shot, copied to `shots/before/*_lie_bed_apple_and_chevron.png`.

## Items

### 1. Baby care “Cozy” is hidden under Paint (portrait)

**Before:** `/workspace/t-batch13/shots/before/webkit_820x1180_baby_care_bar_vs_paint.png`

In 820×1180 the care tray sits at the bottom of the stage. The Paint pill covers the mood word “Cozy” and the blossom meter. Bottle / Burp / Diaper / Rock / Name stay visible, so a kid can still tap care, but they cannot see how the baby feels. The same tray is already clear in landscape (`shots/before/webkit_1180x820_baby_care_bar_vs_paint.png`).

**Polish:** Client-only CSS. Shift the tray or the Paint pill in iPad portrait so the mood word and blossoms stay fully visible. Do not shrink care buttons below 44px.

### 2. Apple wish + “z z” while she is already in bed

**Before:** `/workspace/t-batch13/shots/before/webkit_820x1180_lie_bed_apple_and_chevron.png`  
**Also (landscape, fully framed):** `/workspace/t-batch13/shots/before/webkit_1180x820_lie_bed_apple_and_chevron.png`

`wishOf` always shows the lowest leftover need, even when she is already meeting another one. A doll lying in bed shows the snooze “z z” and an apple thought at the same time. In the landscape frame a slice of cake is still on the bed with her (see item 5). The kitchen tab also pulses, so the room is shouting “hungry” during a sleep.

**Polish:** Client paint (and only `wishOf` if a small shared tweak stays compatible). While a doll is meeting a need here (lying, in the tub, holding food), hide other wish bubbles so the z z / bath bubbles can read clearly.

### 3. Room-turn chevron covers a sleeping doll and crowds her wish

**Before:** `/workspace/t-batch13/shots/before/webkit_820x1180_lie_bed_apple_and_chevron.png`

In iPad portrait the right `>` chevron sits on the sleeping doll’s legs and presses against her apple bubble and the “z z”. The bed is a right-hand piece of furniture, so this is the everyday sleep view, not a rare camera extreme. Landscape does not clip her.

**Polish:** Client-only. Nudge arrows should yield when a character or wish sits under them (nudge the arrow, tuck the bubble, or raise the doll/bubble above the chrome). Keep the 44px tap target.

### 4. Eating stands on the table; the chair stays empty

**Before:** `/workspace/t-batch13/shots/before/webkit_820x1180_eat_standing_on_table.png`

Dropping a hungry doll on the cake/table leaves her standing through the tabletop, holding the cake, with the kitchen chair empty beside her. There is little nibble feedback. Kids will try to “eat at the table.”

**Polish:** Client play-drop only. When a doll is dropped on the table, or on food that is on the table, sit her in the nearest empty chair (existing chair `seatFractions`, already understood by the server). Keep a small bite/sparkle if one is already in the care path. Do not change shared sit math for chairs.

### 5. Held snacks come into the bath and bed; a bath drop leaves her standing in the tub

**Before (tub):** `/workspace/t-batch13/shots/before/webkit_820x1180_tub_still_holding_cake.png`  
**Before (bed):** `/workspace/t-batch13/shots/before/webkit_1180x820_lie_bed_apple_and_chevron.png`

`char/move` does not release a held item. Walking from the kitchen to the bathroom with cake, then dropping her on the tub, leaves her standing on the bath mat in the tub still holding the cake. The same leftover cake sits on the bed in the sleep frame. Auto-care still runs (bath bubbles / z z), so the need can clear, but the picture is wrong.

**Polish:** Client play-drop. Before a drop onto a tub or bed, `char/release` any held food onto a nearby free floor spot (or the last table), then sit/soak in the tub or lie on the bed. Use existing `char/release` and seat actions so friends stay in sync without a Worker change.

### 6. The toilet is not a potty

**Before:** `/workspace/t-batch13/shots/before/webkit_820x1180_potty_stand_at_toilet.png`

The bathroom ships a toilet, and kids will drop a doll on it. Today `seatFractions` has no toilet pattern, `meetsHere('clean')` is tub-only, and a drop just stands her in front of the bowl with a bubbles wish. The tub is the only thing that glows.

**Polish:** This one is **not client-only.** Add a toilet seat in `src/shared/sit.ts` and treat the toilet as a clean station in `src/shared/needs.ts`, plus a small sit/potty cue. Solo play and a local hood pick this up from the shared modules. Production visiting-friends will not agree on the seat/need until a later Worker deploy (out of scope; no deploys in this batch).

### 7. A visiting friend’s chrome clips the Bathroom tab and pal names

**Before (guest):** `/workspace/t-batch13/shots/before/webkit_820x1180_friend_guest.png`  
**Contrast (host, tabs and names clear):** `/workspace/t-batch13/shots/before/webkit_820x1180_friend_host.png`

In 820×1180 the visitor bar (“Sunny Bunny’s House · Sunny Bunny”) plus the extra home/mail/book icons push the room tabs into the chrome. “Bathroom” reads as “Bathrc”. The guest camera also clips the pal name “Bubbly Panda” to “Bubbly Pan” at the right edge. Dance notes and the dolls themselves do sync.

**Polish:** Client-only layout. Give the tab row and in-room name tags room to finish their words when the visitor chrome is on. Do not shrink tap targets under 44px.

## Build rules

- Prefer client-only. Item 6 is the exception and is called out above.
- Ports 5300–5399; take `/workspace/t-batch4b/soak.lock` then `/workspace/surprise/gate.lock` for heavy browser tests.
- Normal push of `cursor/batch13` only. No deploys, no push to `main`, `gh-pages`, `cursor/release-r1`, or either Worker.
- `TILES_DEFAULT` stays false.
- Gate after the build: unit tests, migration, heartbeat multi-client, old-client smoke, `art_ingame_bounds`, `scene_hotspot`, ranch.
- Whole-scene before/after of every scene touched, plus a side-by-side sheet, in the batch REPORT.
