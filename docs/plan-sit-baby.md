# Sit, lie, and the nursery baby

Planning note. This branch does not ship sit, lie, or the baby. It records the plan, the mockups, and one sit-pose spike that stays off unless the page is opened with `?sit=1`.

Decisions Andy made, and the defaults he left in place, are locked in [Locked decisions](#locked-decisions). They are not still open.

This branch includes `main` at `8a1249554979df72f840bc4e9fbc4c63139eda92` ("Merge origin/main (ccb9124) into the living-room art pilot."). That commit is the painted living-room set: WebP 2× for the sofa, armchair, chair, and the other living-room pieces, with `?art=v1` keeping the SVG.

Target device is an iPad 10th gen at 820×1180, 60fps. The floor is iPadOS 16 Safari, so the work stays inside what that browser already does: no CSS nesting, no `:has()`, no `color-mix()`. Kids' privacy stays as it is: first names only, no accounts, no analytics.

The long-term aim is a Sims-like house (needs, moods, usable furniture, routines). P1 and P2 are the two things the kids asked for. P3 is an architecture sketch only.

## What the game does today

Play mode already treats a sofa, armchair, chair, stool, bench, bed, or crib as a sit (`playGesture` in `src/playmode.ts`). `sitAt` in `src/main.ts` only walks her there: solo play dispatches `char/move` to `x = item.x`, `y = max(FLOOR_Y + 40, item.y - 8)`; in a neighborhood it writes the same point onto her presence. She stays standing. Decorate still drags furniture.

Save `version` stays **3**. `migrate()` in `src/shared/state.ts` upgrades v1 and v2, then fills rooms a save does not have yet. Existing rooms are left alone. `PROTOCOL` stays **4** (`src/shared/hood.ts`). New street features have been optional fields plus a capability on hello/join (`pet: 1`, `mail: 1`, `v: PROTOCOL`). Unknown house fields ride along in a full JSON blob. `cleanHouseState` rebuilds the house and drops fields it does not know. `cleanAction` returns null for an unknown action, and `reduce()` has no default, so an action an old client does not know would come back `undefined` and break the store. New action types must never be broadcast to a client that did not ask for them.

Park sitting is a different thing. `Presence.pose` is `'sit' | 'swing' | 'slide'` and `cleanPresence` only keeps it when `where === 'park'`, snapped to `PARK_SPOTS`. A house presence is rebuilt as `{ where, houseId, room, x, y, flip }`. Do not reuse park `pose` or `spot` for furniture.

Characters paint at `z-index: 5000 + y`. Items paint at `1000 + item.z`. A kid always covers the whole sofa today. A real sit needs a paint-only split (furniture back, kid, furniture front) without changing the saved `z`.

Avatar v2 is the chibi in `src/avatar/draw.ts` (`look2` on the character; missing `look2` is the classic drawing). Layers, back to front: hair-back, body, shoes, bottom, top, bottom-over, face, hair-front, accessory. Hats sit in the accessory layer. Pants, leggings, shorts, jeans, and joggers live in `.leg` and follow the leg angle. Skirts, tutus, dresses, and overalls hang from the hip (the riding pose already special-cases this). Each leg is one bone from hip to foot. The walk CSS in `src/avatar.css` overrides the SVG angle, so a seated kid has to set `animation: none` on those limbs. `richAvatars()` is on only when `CSS.supports('selector(&)')` is true.

The living-room paintings are in the game now (`assets/art/any/*.webp`). `ART_RASTER` is on. `?art=v1` forces the SVG. `?art=v2` forces raster. A missing file falls back to the SVG. The painting is fitted to the same square footprint as the SVG (`object-fit: contain`, bottom-center), so one anchor fraction lands on both drawings. Anchors belong in the item record, not in the bitmap.

## Mockups

Drawn at the real iPad and phone sizes. They are compositions, not the game. The sofa and chair kids use the spike sit pose (legs out, body upright) with real chibi layers. The bed kid is a standing chibi turned onto the mattress, with sleepy eyes and a Zzz. The baby is an original nursery drawing. Nickname on the kid is the preset "Sunny Bunny". The baby's nickname is "Bean". The meter is four of five blossoms and the word "Cozy".

| File | What |
| --- | --- |
| `docs/mockups/sit-sofa-820x1180.png` | Puffs, bow, leggings, seated on the pink sofa |
| `docs/mockups/sit-sofa-390x844.png` | Same, phone |
| `docs/mockups/sit-chair-820x1180.png` | Long hair, sunhat, sundress, seated on the green chair |
| `docs/mockups/sit-chair-390x844.png` | Same, phone |
| `docs/mockups/lie-bed-820x1180.png` | Braids and nightgown, lying on the bed |
| `docs/mockups/lie-bed-390x844.png` | Same, phone |
| `docs/mockups/baby-care-820x1180.png` | Nursery care card: blossoms, Cozy, Bottle, Burp, Diaper, Rock |
| `docs/mockups/baby-care-390x844.png` | Same, phone |
| `docs/mockups/nursery-820x1180.png` | Crib, baby, rocker, bottle, no care card |
| `docs/mockups/nursery-390x844.png` | Same, phone |
| `docs/mockups/anchors-living.png` | Locked anchors on the SVG and the living-room painting |

`docs/mockups/render.ts` rebuilds the room mockups (`npx tsx docs/mockups/render.ts`). The HTML under `docs/mockups/html/` is generated and is not part of the review.

iPad chrome in the mockups matches the current shell: room tabs, minimap, Play selected. No new top-bar button.

## Spike in this branch

`src/avatar/sit.ts` exports `SIT_POSE` and `sitSpikeOn()`. The pose is on only for `?sit=1`. Any other query, including none, stays off.

When it is on, a Play tap on the **built-in** sofa (`kind === 'sofa'`, not a pack sofa) toggles a memory pose and still calls the existing `sitAt`. A second tap, or a drag of more than 6px, clears the pose. The pose is a `Map` in the page. It is not written to the house, the street, or `localStorage`. Friends do not see it. A classic doll with no `look2` still walks to the sofa and does not get the chibi pose.

`chibiSVG` takes an optional pose. The default SVG bytes stay the same: `data-pose` is added only when a pose name is passed. Hair, hat, and clothes stay in the standing layer order. `tests/avatar_test.ts` checks the flag, the layer order, and that `initialState()` is still version 3 with no `"seat"` field.

This is a paint spike. She still draws in front of the whole sofa. Hips are lifted with `translateY(-20%)` so they land nearer the cushion given `sitAt`'s `y = item.y - 8`. Dresses are not draped. That is P1 work.

## P1 — Sit and lie

Next update after B2. Tap a chair, sofa, stool, or bench and she sits. Tap a bed and she lies down. Tap the same piece again, or drag her, and she stands up.

### Save and protocol

Stay on save version 3 and PROTOCOL 4. Add a capability `sit: 1` on hello/join, the same way `pet: 1` and `mail: 1` work. Do not mint PROTOCOL 5.

Solo dolls persist the seat so a reload keeps her sitting:

```ts
seat?: { item: string; pose: 'sit' | 'lie'; n: 0 | 1 }
```

Omit `seat` when she is standing. Clear it when that item is deleted, held, or flipped away, and when `char/move` runs on the new client (a walk is her getting up). `newCharacter` already spreads extra fields, so an old `migrate()` keeps `seat` on the object and does not throw. Old `cleanCharacter` / `cleanHouseState` drop it, because they rebuild the character from known fields. That only matters when a brand-new street house is created from a client save. An existing house lives on the Durable Object and is updated by actions, not by a second full upload.

In a neighborhood, the kid on screen is her presence, not the doll. Add an optional presence field, only for `where === 'house'`:

```ts
seat?: { id: string; pose: 'sit' | 'lie'; n: 0 | 1 }
```

`cleanPresence` on a new server keeps a seat whose id is a real item in that room and whose pose is `sit` or `lie`. A bad seat is dropped. The presence is not rejected, so `x` and `y` still arrive. An old server rebuilds house presence without the field, which is the fallback: she is standing at the seat point, and nothing throws.

Position keeps using the actions everyone already understands (`char/move` for a doll, presence `x`/`y` for a player). Do not add a `char/seat` action. An old `reduce()` would return `undefined` for an unknown type. The new server's `char/move` deletes `seat` on that doll. The server includes presence `seat` only when the receiving client said `sit: 1`. Everyone else gets the same `x` and `y` and draws her standing.

One sitter per anchor. A sofa has two anchors, so two kids can share it. A chair, armchair, stool, and bed have one. When every anchor on that piece is taken, the server answers with a small message, same idea as `noride`, sent only to `sit: 1` clients. The client toasts "Someone is already there!" and leaves her standing. The server is the authority.

The seat records which anchor, so two kids on one sofa do not collide:

```ts
seat?: { item: string; pose: 'sit' | 'lie'; n: 0 | 1 }
```

`n` is `0` on a one-seat piece. On a sofa, `0` is the left anchor and `1` is the right, before a flip. A flip mirrors `dx`, so the anchors swap sides with the drawing. A bad `n` is dropped with the seat. The presence is not rejected.

The client sends `seat` only after the server has echoed that it understands `sit`. An old Worker ignores the unknown hello field, so she still walks to the cushion (today's `sitAt`) and the pose stays on her own screen.

### Anchors

Measured from the item's center-bottom. `x` fraction is `0.5 + dx / w`. `y` fraction from the top is `1 + dy / h`. A flipped item mirrors `dx`. The same numbers are used for the painting and for `?art=v1`, because both fill the same square.

Checked against the living-room paintings and their SVG drawings (`docs/mockups/anchors-living.png`). The ring sits on the cushion in both modes.

| Item | Pose | Anchors | Where it lands |
| --- | --- | --- | --- |
| sofa | sit | two: `dx: ±0.18 * w`, `dy: -0.33 * h` | Both rings on the seat, clear of the arms. SVG and WebP. |
| armchair | sit | one: `dx: 0`, `dy: -0.32 * h` | On the seat, not the back. SVG and WebP. |
| chair | sit | one: `dx: 0`, `dy: -0.48 * h` | On the seat, above the legs. SVG and WebP. |
| bed | lie | one: `dx: -0.08 * w`, `dy: -0.30 * h` | On the blanket, toward the pillow. SVG only. |

The living-room art set has no bed painting. The lie anchor is locked to the current bed SVG. When a bed WebP arrives, recheck this fraction before shipping lie. Do not invent a second bed anchor.

Category fallback, for a piece that has no `seats` entry yet. A painted item above wins over the category.

| Category | Pose | Fallback |
| --- | --- | --- |
| sofa, couch, loveseat | sit | the sofa pair above |
| chair | sit | the chair above |
| armchair | sit | the armchair above |
| stool, rocker | sit | one seat, `dx: 0`, `dy: -0.38 * h` |
| bench | sit | two seats, `dx: ±0.22 * w`, `dy: -0.30 * h` |
| bed (not a pet bed) | lie | the bed above |

Manifest shape, optional, shared by SVG and WebP. `dx` and `dy` are room pixels (`dx` already multiplied by width):

```json
"seats": [
  { "pose": "sit", "dx": -47, "dy": -86 },
  { "pose": "sit", "dx": 47, "dy": -86 }
]
```

Those two numbers are the built-in sofa (`w` 260, `h` 260), rounded: `±0.18 * 260` is 47, and `-0.33 * 260` is -86. Code defaults apply when `seats` is absent. Crib, bassinet, high chair, cat bed, pet bed, and dog bed are not kid seats in P1. A bunk uses the bottom bunk only.

`playGesture` currently returns `sit` for crib and for any kind matching `/chair/`, which includes the high chair. P1 narrows that list to the categories above.

### Pose and paint

Sit: legs out (about `legL: -76`, `legR: 76`, the spike pose), body upright, so hair, hats, and outfits stay in the standing stack. Lie: turn the whole body, and draw sleepy eyes for that frame only. Do not write `look2`.

Skirts, tutus, dresses, and overalls need a lap drape, the same lesson as the riding leg. Classic kids (no `look2`) get a simpler bent-leg drawing so dolls still sit. Held items follow `handsOf` for that pose. Walk animation is off while she is seated. Cache the SVG by look stamp plus pose. No per-frame rebuild, no blur, no extra layout thrash.

Z-order is paint-only. The item stays one saved object. While someone sits, draw the back at the item's z, the kid just above it, and a front slice (arm, blanket, crib rail) just above her. Saved `z` does not change. Zzz is a small mark on the kid, not new chrome.

### Layout

No new top-bar control. iPad 820×1180, 1024×768, and 1180×820 never match `PHONE_MQ` and never get `body.phone`. Phone rules stay under `body.phone`. Tap targets stay at least 44px. 390×844 and 375×667 use the same seat anchors in room space; only the camera scale changes. The name tag already clamps on phones. A seated tag uses that same clamp so it does not cover the drawer.

### Performance

One cached SVG per look+pose, rebuilt when the look or the pose changes, not on a timer. The walk CSS is disabled with a class, which is cheaper than fighting the animation. The three-slice paint exists only for an occupied seat. Empty rooms draw exactly as they do now. Anchors are computed when an item is placed, moved, or flipped.

### Tests

- Migration: a version-3 save with no `seat` loads unchanged. A save with `seat` still loads, version stays 3, and a missing item clears the seat. `JSON` of a standing kid has no `seat` key.
- Old client: fixture of today's `migrate` + `cleanHouseState` on a blob that contains `seat`. No throw. The field is dropped by `cleanHouseState` and kept by `migrate`.
- Multi-client: two `sit: 1` clients see the pose. A client that did not send `sit: 1` receives the presence without `seat` and draws her standing at that `x`,`y`. An old server strips `seat`. No unknown action is broadcast.
- Occupied anchor: the second kid on a chair gets the toast and stays standing. The second kid on a sofa takes the free anchor. A third kid on that sofa gets the toast.
- Real touch: pointerdown/click on a chair sits, second tap stands, a drag past 6px stands. Run on the iPad size and on 390×844. Decorate still drags the chair.
- Pose unit: hair, hat, and clothes order; skirts do not ride inside `.leg`; classic SVG still renders.

### Estimate

About **3–4 cloud-agent runs**, roughly **10–14 hours**. One run for the pose and the outfit drape, one for anchors and the paint split, one for presence, save, and the old-client gate, one for the iPad and phone pass. The Worker ships in the same release as the client. The what's-new card (v9) is part of that release, not this plan.

## P2 — Baby v1

A baby who belongs to the house, not to a character slot (`MAX_CHARS` stays 8). She starts in the nursery crib. Kids can hold her, and they can feed, burp, change, and rock her. Cute reactions and a gentle happy meter. No neglect, no crying alarm, no failure state. Care only raises the meter. On its own it eases back to Cozy and stops there. It never becomes upset, empty, or negative.

### Save and protocol

Stay on version 3 and PROTOCOL 4. Add `baby: 1` on hello/join.

```ts
baby?: {
  name: string;
  mood: 2 | 3 | 4;                  // 2 is Cozy, the floor. P2 never stores 0 or 1.
  spot: 'crib' | 'arms' | 'mat';
  holder?: string;                  // player id while someone is holding her
  at?: { feed?: number; burp?: number; change?: number; rock?: number };
}
```

Omit `baby` until the house has one, so older saves stay byte-identical. Mood starts at 2, labeled Cozy. A care action raises it by one, or plays the reaction again when she is already at 4. It never lowers her on the tap.

Left alone, mood eases one step toward 2 about every 45 seconds, then stops. 4 becomes 3, 3 becomes 2, 2 stays 2. A new care resets that wait. Solo play uses local time, the way the cat already does. In a neighborhood the server owns the clock, in coarse steps, so both kids see the same blossoms. The label is Cozy at 2 and Happy at 3 or 4. The blossoms are never empty, never red, and there is no sad face and no alarm.

The nickname does not have to be a person's name. Run it through `cleanPetName` (letters, numbers, apostrophe, hyphen, space, 14 characters, at most two digits) and then the existing light `filterChat`. Do not use `cleanFirstName`, which rejects spaces and digits. Offer the pet-name style presets plus a typed nickname. "Bean" and "Sunny Bunny" are both legal. The owner renames. Anyone in the house can do a care action.

Actions, accepted by the new server and forwarded only to `baby: 1` clients:

- `baby/name`
- `baby/care` with `feed | burp | change | rock`
- `baby/hold` to pick up or put down

`cleanAction` on an old server returns null for these, so they never enter `reduce()`. An old client never receives them. A full house JSON may contain `baby`. Old `migrate()` spreads it and ignores it. Old `cleanHouseState` drops it on the one path that rebuilds a house (creating a street house from a local save). After the house is on the server, ordinary item and character actions do not rebuild `baby`. New `cleanHouseState` keeps a valid baby. Deleting the crib moves her to the mat. It does not delete her.

One holder at a time, same idea as a horse. A second kid hears "Someone is cuddling!" Care items (bottle, burp cloth, diapers) can be catalog items that trigger the matching care action, or buttons on the in-world card. The card is enough for v1. The items are there so the nursery looks like a nursery.

### Art and UI

Paint her in the AI raster style when that rollout reaches the nursery: WebP 2× plus an SVG fallback, recognizable silhouette first, cute second. The mockup SVG is the fallback shape: a wrapped bundle and a large head, plum outline, same family as the crib.

The care UI is an in-world card, like the kennel button, not a new drawer row and not a new room tab. Four actions at 44px: Bottle, Burp, Diaper, Rock. The meter is five blossoms and a word (Cozy), never a score and never red. On 390×844 and 375×667 the card sits above the drawer, full width minus a small margin, one row of four. If a label would clip at 375, shorten the label, do not shrink below 44px. iPad layout of the top bar and the drawer does not change.

Reactions are short and local: a wiggle, a small burp cloud, a fresh wrap, closed eyes while rocking. Zzz while she is asleep in the crib. No alarm sound.

### Performance

One baby SVG, cached by mood and spot. Care plays a CSS class for about a second. The meter is five shapes, redrawn on a tap, not on a timer. No particle system and no extra room.

### Tests

- Migration: a save with no `baby` is unchanged. A save with a baby keeps name, mood, and spot through the new `migrate` and the new `cleanHouseState`. Care never lowers mood and never stores it above 4 or below 2. The ease can lower it only as far as 2.
- Name: `cleanPetName` accepts "Bean" and "Sunny Bunny", rejects an empty string and a filtered word, and the server stores the original trimmed text only when the filter says ok.
- Old client: today's `cleanAction` returns null for `baby/care`. A broadcast helper that filters on `baby: 1` does not deliver it. A house blob with `baby` does not throw in old `migrate`.
- Two clients with `baby: 1` see the same name, mood, and holder. A client without the flag never sees the actions. A second hold is refused.
- Real touch: each care button is 44px, works with a finger, and does not cover the phone drawer. Owner rename works. A visitor can care and cannot rename.
- Deleting the crib sets `spot` to `mat` and leaves `name`.

### Estimate

About **4–5 cloud-agent runs**, roughly **14–18 hours**, plus a separate art pass for the raster baby, crib close-up, bottle, cloth, and diapers. One run for the schema, filter, and sync gate, one or two for the care loops and the card, one for the SVG fallback and the art hook, one for mixed clients and phones. The Worker ships with the client.

## P3 — Sims-like needs (sketch only)

Do not build this in P1 or P2. The seat anchor from P1 is the hook.

A need is a suggestion, not a failure. Hunger, energy, fun, social, and clean are numbers the UI may show as blossoms or a face. They never lock a piece of furniture, never alarm, and never punish. P2's baby eases only as far as Cozy. A future kid tick eases a need toward "fine", not toward a failure.

An interaction hangs off the same anchor record P1 adds:

```ts
use?: 'sit' | 'lie' | 'feed' | 'play' | 'wash'
needs?: { hunger?: number; energy?: number; fun?: number; social?: number; clean?: number }
duration?: number
pose?: 'sit' | 'lie'
fx?: string
```

A routine is a list the player starts ("morning", "bedtime"). It is not a clock that scolds. Solo play advances coarse time on a local timer, the way the cat and the garden already do. Multiplayer uses server time in coarse steps, not per frame. `moodOf(needs)` is one function. The baby meter in P2 is that function with a floor at Cozy: care raises it, time eases it back to the floor, and it has no upset side. Later, the kid and the baby share it.

Old clients keep working the P1/P2 way: they see a kid standing or, if they speak `sit`, sitting, and they ignore needs. Needs must not be required to render a room.

A later build of this sketch is about **8–12 cloud-agent runs**. It is not estimated as part of the next update.

## Locked decisions

Andy locked 1 and 7. The rest were the plan's defaults. They are locked the same way. P1 and P2 build these, not a fresh set of choices.

1. Two kids can share a sofa. A sofa has two seat anchors. A chair, armchair, stool, and bed have one. One kid per anchor. The second sofa seat is the other anchor. A full piece toasts "Someone is already there!"
2. A solo doll's seat is saved, and omitted when she is standing, so a reload keeps her in the chair.
3. The crib is the baby's. A kid does not sit in it in P1.
4. The high chair waits for the baby. It is not a kid seat in P1.
5. Cat bed, pet bed, and dog bed stay pet-only.
6. Anyone in the house can feed, burp, change, or rock the baby. Only the owner renames her.
7. The happy meter eases back to Cozy. Care raises it. About every 45 seconds it steps down one, and it stops at 2. It never stores a mood below Cozy, never shows an empty or red meter, and never has an upset or failure state.
8. Nicknames go through `cleanPetName` and the light chat filter, not the roster first-name rules. "Bean" and a space are allowed.
9. A bunk bed uses the bottom bunk only in P1.
10. Protocol stays 4, with `sit: 1` and `baby: 1`. There is no PROTOCOL 5 for this.
11. The Worker and the client ship together. An old Worker is safe (the pose stays on her own screen, baby actions are rejected) and friends see the new pose once that Worker is the one they are connected to.
12. The living-room paintings from `8a12495` are the art these anchors were checked against. The bed has no painting in that set, so the lie anchor is the SVG measurement above until a bed WebP exists.
13. The spike (`?sit=1`, built-in sofa only) stays off by default. It is one local pose, not the two-seat feature, and it does not change the save.
