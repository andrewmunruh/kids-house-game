# B18 — Needs and reactions polish (plan and before shots only)

**Branch:** `cursor/b18-needs-polish` off B7-r9 `ea83ae5` (`ea83ae5935e486e0f628a7bcd1d491ae26812d1a`)  
**Base:** production `main` `5909d53` plus B7-r9 (picnic seats stay **off**).  
**Status:** HOLD. Plan and before shots only — no features built, no wrangler, no deploy.  
**Times:** America/Chicago (CST), Wednesday Nov 18, 2026. Ports 5350–5399 only. Locks were not taken (App Builder held them on the 9900s). `/workspace/r17a`, the 9800s, cozy-hood-preview and cozy-preview were not touched.

This batch is the next polish pass on the approved deeper-play plan at `/workspace/needs-plan/PLAN.md`. Andy wants the most polish here: clear feedback when a need is met, reactions that feel alive, and less confusion, especially when two kids play together on iPads.

## What is already shipped

Checked on production `main` `5909d53` and B7-r9 `ea83ae5935e486e0f628a7bcd1d491ae26812d1a`. For needs, ambient and social they are the same tree except a two-line B7 CSS tweak (`.char.pose-lie.need-snooze::after` paints `z z` while she stays in the lie pose). Git log and `/workspace/release-plan/PLAN.md` agree:

- **M1 ambient + verbs** (`c67bb40` and follow-ups): `item/power` + `on` + `amb:1`, stereo dance (`cute-speaker` / `cc-record-player` / `retro-radio`), TV watch + sit-if-allowed, fireplace warm-hands, music-box wind-down, toy hug/bounce, bed/tub/fridge verbs, sparkle on leaving the tub. Reactions are derived, never sent.
- **M2 needs + sync** (`76b5b5e`, `416d386`, later hint/bubble work): `needs` field, `cleanNeeds`, play-time-only drift, `need/meet` / `need/drift`, `needs:1`, thought bubbles, “Show wishes”, care burst, helpful-spot shimmer, first hint in a few minutes. No v4 bump; untouched saves stay byte-identical.
- **M3 social + remaining ambient** (`10012a0`): friend wave / hop / heart, dance duet, arrival wave, baby coo, pets trot and settle beside a sitting or lying doll; piano, stove, swings, slide, aquarium/fountain, doll house, ducky.
- **B11 polish** (in R1, then follow-up): Show-wishes label, stronger hint, Kitchen-tab pulse for a hungry doll, bigger hop/heart, clearer stereo notes and fire glow.
- **B13 polish** (`a279b57`, `92b3578`): hide leftover wishes while she is already meeting a need, room-turn chevrons yield to a sleeper, a drop on the table sits her in the nearest empty chair, held snacks are put down before a bath or bed, baby care tray clear of Paint, visiting-friend chrome given room. Item 6 (toilet as a potty) was deferred because it needs a Worker change.

Not in this batch (held or already declined):

- Toilet as a potty (B13 item 6) and sink-vanity as a clean station — both need `src/shared/needs.ts` / `sit.ts` and a Worker, or friends will disagree.
- Synced lamp glow — today’s `lamp-on` class is local to the iPad that tapped it; putting lamps in `isPowerable` needs a Worker `item/power` path.
- Bath soak pose — App Builder skipped this as a B13 follow-up.

## Ranked plan (four items)

All four are client-only. No `src/shared` or Worker change, no save version bump, no migrate, no new stored fields. Picnic seats stay off. No faces on items (plush keep theirs). No repaint of shipped art.

### 1. Need-met celebration that both iPads can catch

**What.** When a need is met — auto-care or a friend tapping to tuck her in — play a short, need-specific celebration on every `needs:1` client that sees the level rise: a bigger burst that uses the wish’s own icon (apple crumbs, a fading `z`, bath bubbles, a toy sparkle), a clear cozy hop, and a tiny heart from a nearby friend if one is in the room. Reduced motion stays a still glow, as today.

**Why.** Today the wish simply vanishes behind a small generic ring of hearts and sparks (`need-burst`, 14px, 1.1s). It is easy to miss, especially on the other iPad. The burst already keys off the stored level change, so both clients can show a better one with no new action. This is the “she did it!” moment kids play needs for.

**Files.** `src/needs-ui.ts`, `src/needs.css`, maybe a light hook in `src/social.ts` / `src/social.css` for the nearby-friend heart. Tests in `tests/needs_shots.py` / a small Playwright check.

**Shared / Worker.** No. The existing `need/meet` broadcast is enough.

**Saved houses.** None. No migrate.

**Test plan.** Unit: the burst class/icon matches the need that just rose. In-game, both sizes, WebKit and Chromium: meet hungry at the fridge, sleepy in bed, clean in the tub, playful with a toy; the celebration is visible for at least a beat and the leftover wish stays hidden. Two iPads: A meets, B sees the same celebration within 1s. Wishes-off still shows the celebration (it is care feedback, not a wish). Reduced motion: no hop, still glow only. Old client without `needs:1` is unchanged.

**Before.** `kitchen_hungry_wish`, `kitchen_hungry_burst`, `bedroom_sleepy_wish`, `bedroom_lie_zzz`, `bathroom_clean_wish`, `bathroom_in_tub`.

### 2. Eating looks like eating, on both iPads

**What.** A doll who is meeting hungry at the table (seated in a chair with food, or holding a snack there) gets a visible nibble: a small bite sway and a crumb/sparkle, derived from synced seats and holds so both iPads agree. A doll who is next to the fridge meeting hungry causes the fridge to read as open (squash or crop of the existing sprite, plus the snack overlay) on every client, instead of a local `.opened` class. No repaint; if a honest door crop is not possible, use a squash plus the overlay and say so.

**Why.** B13 already sits her in the chair, but there is almost no bite feedback — she just sits. Fridge “open” is a local DOM toggle (`playGesture` `open`), so a friend on the other iPad still sees a closed fridge and a standing doll. `meetsHere('hungry')` already treats “near the fridge” or “holding food” as care; the picture should match that, and it can be derived from positions like every other reaction.

**Files.** `src/main.ts` (ambient nibble + fridge paint), `src/ambient.css`, maybe `src/social.ts`. Prefer not to touch `src/shared/ambient.ts` (`nibble` is already a `ReactionKind`; a client-only path can apply it when she is seated at a table with food or standing at the fridge). Tests: Playwright kitchen frames + a two-client “both see the open fridge / nibble” check.

**Shared / Worker.** No, if nibble/open stay derived. Do not add fridge to `POWERABLE` in this batch (that would need a Worker).

**Saved houses.** None. No migrate. Local `.opened` is not stored today; we will not start storing it.

**Test plan.** Sit her at the starter table with the cake: nibble is visible, chair stays the existing seat, no shared sit math change. Stand her at the fridge to meet hungry: both iPads show the same open/nibble treatment within 1s; a third old client is unaffected. Tapping the fridge in Decorate is unchanged. `git diff --stat assets/` stays empty. Art bounds and scene_hotspot stay green.

**Before.** `kitchen_eat_at_table` (sits, no nibble), `kitchen_hungry_wish`, `kitchen_fridge_closed`, `kitchen_fridge_opened_local` (the local overlay is barely visible; there is no door).

### 3. Share a snack

**What.** When two dolls are close in Play and one is holding food, a drop or a tap can pass the snack hand to hand, using the existing `char/hold` and `char/release` actions. The giver lets go onto the friend’s empty hand; both may nibble for a moment. Ownership stays as it is today: a visitor cannot take a hold she is not allowed to move, and a nack just leaves the snack where it was. No new stored field.

**Why.** The deeper-play plan called this out in M3 (“share food, a held item passes hand to hand”). It is one of the first things two kids will try, and today nothing happens — she just stands there holding the whole cake.

**Files.** `src/play-drop.ts` and/or Play-tap in `src/main.ts`, `src/social.ts` for the short shared-nibble cue. Tests in `tests/play_drop_test.ts` plus an in-game two-doll / two-client check.

**Shared / Worker.** No. Reuse `char/hold` and `char/release`.

**Saved houses.** None. Only a momentary hold change, the same as picking up a toy today. No migrate.

**Test plan.** Two dolls in the kitchen, A holds the cake, drop or tap onto B: the cake is in B’s hand, A’s hand is empty, both clients agree. A visitor who may not move B’s hold gets the existing `notyours` / no-op and the cake stays with A. Passing food does not add a face to the snack. Reduced motion: the pass still happens, without a hop.

**Before.** `kitchen_share_snack` (she holds the cake; her friend just stands there).

### 4. The house pet curls at the foot of the bed

**What.** When a doll is lying in a bed, the house cat or dog that already trots over and settles should curl at the **foot** of that bed (by her feet, using the existing nap/sit pet sprite and a client-only transform). Two pets pick opposite sides of the foot if both are in the room. The stored pet position does not change. Seated-on-a-chair settle can stay as it is.

**Why.** The plan’s M3 line was “cat/dog near a sleeping doll → curls at the foot of the bed.” Today the pet naptpose is already used and looks sweet, but she settles mid-mattress beside the doll’s torso. Kids putting a doll to bed expect the pet at her feet.

**Files.** `src/social.ts`, `src/social.css`, possibly `src/pets.ts` for which existing sprite to paint. Keep `src/shared/social.ts` unchanged if the foot position can be computed on the client from the bed item and the doll’s lie pose (prefer that).

**Shared / Worker.** Prefer no. Reactions are not sent. Avoid a `PetRx` shape change in `src/shared/social.ts` unless a tiny shared helper is the clean way and stays unused by the Worker.

**Saved houses.** None. Cosmetic transform only. No migrate. `cat/move` / kennel state stay untouched.

**Test plan.** Lie a doll on the starter bed, add a house cat in the bedroom: the cat curls at the foot, not mid-torso, in both orientations. A second pet takes the other side of the foot. Stored `cat.x` / `dog` are unchanged after the settle. Both iPads agree. No new art files. Dragging the doll off the bed releases the curl.

**Before.** `bedroom_lie_zzz`, `bedroom_pet_at_bed` (the tabby is already in a nap pose, mid-bed next to her, not at the foot).

## Before shots

Full in-game WebKit frames on `ea83ae5935e486e0f628a7bcd1d491ae26812d1a` (production dist, no PREVIEW ribbon) at 820×1180 and 1180×820. Solo house, Play mode, starter furniture. Ports 5350 only (static), no locks.

- PNGs: `/workspace/t-b18/shots/before/`
- JPGs under 1 MB: `/workspace/t-b18/send/before/`
- Contact sheets: `contact_820x1180.png` / `.jpg` and `contact_1180x820.png` / `.jpg`

| State | Portrait | Landscape |
|---|---|---|
| Hungry wish, fridge in view | `webkit_820x1180_kitchen_hungry_wish` | `webkit_1180x820_kitchen_hungry_wish` |
| Need met: generic sparkle burst | `webkit_820x1180_kitchen_hungry_burst` | `webkit_1180x820_kitchen_hungry_burst` |
| At the fridge after care, door shut | `webkit_820x1180_kitchen_fridge_closed` | `webkit_1180x820_kitchen_fridge_closed` |
| Local fridge “open” (no real door) | `webkit_820x1180_kitchen_fridge_opened_local` | `webkit_1180x820_kitchen_fridge_opened_local` |
| Seated at the table, no nibble | `webkit_820x1180_kitchen_eat_at_table` | `webkit_1180x820_kitchen_eat_at_table` |
| Holds the cake; friend does not share | `webkit_820x1180_kitchen_share_snack` | `webkit_1180x820_kitchen_share_snack` |
| Sleepy wish beside the bed | `webkit_820x1180_bedroom_sleepy_wish` | `webkit_1180x820_bedroom_sleepy_wish` |
| Asleep: z z | `webkit_820x1180_bedroom_lie_zzz` | `webkit_1180x820_bedroom_lie_zzz` |
| Cat naps mid-bed, not at her feet | `webkit_820x1180_bedroom_pet_at_bed` | `webkit_1180x820_bedroom_pet_at_bed` |
| Clean wish beside the tub | `webkit_820x1180_bathroom_clean_wish` | `webkit_1180x820_bathroom_clean_wish` |
| Standing in the tub, weak burst | `webkit_820x1180_bathroom_in_tub` | `webkit_1180x820_bathroom_in_tub` |

## Build rules (when App Builder clears the plan)

- Client-only. If an item turns out to need `src/shared` or the Worker, stop and say so instead of adding it silently.
- Picnic seats stay off.
- Ports 5350–5399; take `soak.lock` / `gate.lock` only when needed, and yield to App Builder.
- Normal push of `cursor/b18-needs-polish` only. No wrangler, no deploy, no push to `main`, `gh-pages`, B17 branches, or either Worker.
- Kid-safe, original names and art. No faces on items (plush keep theirs). Never repaint shipped art. `git diff --stat assets/` must stay empty.
- After the build: before/after of every scene touched, full gate including migration and oldsmoke, two-client checks for items 1–3.
