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

Next update after B2. Two ways in, and only in Play. Decorate does not seat anyone.

Tap-to-sit stays a tap on the furniture, for the player's own avatar. In Play, a tap on a chair, sofa, stool, or bench sits her, and a tap on a bed lies her down. A second tap on that piece stands her up.

Drag-to-sit is also Play, and it is a drag of a character, not of the furniture. The player's own avatar and the dolls the kids make (family and other NPC kids in `characters[]`) all use it. Once the baby can be put down, she uses it too. Dropping one on a chair, sofa, stool, or bench snaps her to the nearest free sit anchor and plays the sit pose. Dropping one on a bed snaps her to the lie anchor and plays the lie pose. A sofa has two anchors. If that piece has no free anchor, she drops where the finger let go, standing, beside it. Dragging her off the piece stands her up.

Decorate keeps today's move and place. Dropping a character on a chair there does not sit her. Picking up a piece someone is sitting on stands them up. They are not carried with the furniture.

### Save and protocol

Stay on save version 3 and PROTOCOL 4. Add a capability `sit: 1` on hello/join, the same way `pet: 1` and `mail: 1` work. Do not mint PROTOCOL 5.

Every house doll persists her seat, not only the active one. A reload keeps each of them sitting or lying. An old save has no `seat` and loads standing. Version stays 3.

```ts
seat?: { item: string; pose: 'sit' | 'lie'; n: 0 | 1 }
```

Omit `seat` when she is standing, so a standing kid's JSON matches an old save. Clear it when that item is deleted, held, or flipped, when Decorate actually moves that piece, and when a Play drag ends off the piece. `newCharacter` already spreads extra fields, so an old `migrate()` keeps `seat` on the object and does not throw. Old `cleanCharacter` / `cleanHouseState` drop it, because they rebuild the character from known fields. That only matters when a brand-new street house is created from a client save. An existing house lives on the Durable Object and is updated by actions, not by a second full upload. New `migrate` and new `cleanHouseState` keep a seat whose item is still in that room, and drop a dangling one. Missing `seat` stays missing.

In a neighborhood, the kid on screen is her presence, not the doll. Add an optional presence field, only for `where === 'house'`:

```ts
seat?: { id: string; pose: 'sit' | 'lie'; n: 0 | 1 }
```

`cleanPresence` on a new server keeps a seat whose id is a real item in that room and whose pose is `sit` or `lie`. A bad seat is dropped. The presence is not rejected, so `x` and `y` still arrive. An old server rebuilds house presence without the field, which is the fallback: she is standing at the seat point, and nothing throws.

Position keeps using the actions everyone already understands (`char/move` for a doll, presence `x`/`y` for a player). Do not add a `char/seat` action. An old `reduce()` would return `undefined` for an unknown type. `char/move` on the new server takes an optional `seat`. A Play snap sends the anchor. A Play drag that ends off the piece, a full piece, or any Decorate drop sends `seat: null`, and the doll stands at the release point. Old `reduce` only copies `x` and `y`, so an old client draws her standing there. The server forwards `seat` only to clients that said `sit: 1`. Everyone else gets the same `x` and `y`. Presence `seat` is included only for those clients too.

One sitter per anchor. A sofa has two anchors, so two kids can share it. A chair, armchair, stool, and bed have one. A tap on a full piece toasts "Someone is already there!" and leaves the avatar standing. A Play drag onto a full piece does not toast. She finishes the drop beside it, standing. The server is the authority for which anchor is free.

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

`playGesture` currently returns `sit` for crib and for any kind matching `/chair/`, which includes the high chair. P1 narrows that list to the categories above. In Play, a character drop sits or lies on that same list.

### Drag onto a seat

This snap exists only while the house is in Play (`play.isPlay()`). Decorate never runs it.

Today `attachCharDrag` in `src/main.ts` drags any house doll in both modes, and `attachMyAvatarDrag` drags the player's avatar in a neighborhood house. `canEdit()` is the house lock, not the mode. On pointerup she stays where the finger let go, standing. A room-tab drop still walks her to that room. P1 adds the snap on that same pointerup, and only when the mode is Play.

In Play, the drop point picks the topmost seatable item under the finger. Among that item's free anchors, she takes the nearest. Distance is from the drop to the anchor. A sofa with one kid already sitting offers the other anchor. A sofa with both anchors taken, or a chair that is taken, is a normal drop: her `x` and `y` stay at the release point, on the floor, and `seat` is omitted. She does not shove the kid who is already there. Once that drag leaves the piece, she stands up. Pointerup away from a seatable item leaves her standing at the release point, with no `seat`. Pointerup over a room tab still changes rooms, and it clears `seat`.

In Decorate, that same pointerup is today's drop. She stands at the release point even when the finger is over a chair, sofa, stool, bench, or bed. No pose, no toast, no `seat`. A room-tab drop still changes rooms and still clears `seat`. Furniture drag stays Decorate-only (`dragAllowed` is false in Play).

The street avatar keeps tap-to-sit, and in Play she can also be dragged onto a seat. That sit is her presence, because she is not a doll in someone else's house. Dolls the kids created, and any family or NPC kid in `characters[]`, store `seat` on the character in the house save. Friends with `sit: 1` see the pose. Friends without it see her standing at the anchor.

The baby is not a character slot. In P2, once she can be put down, the same Play drop rules apply. A chair, sofa, stool, or bench sits her. A bed lies her down. Her `seat` is saved on `baby`, and a Play drag off clears it and puts her back on the mat. Dropping her on the crib returns her to the crib. A Decorate drop does not seat her. The crib is still not a seat for a kid.

### Taps stay taps

The snap listens only to a character drag that has already moved more than 6px, and only in Play. The taps the room already has keep their own pointers.

Tap-to-sit is a tap on the furniture. The pointer goes down on a chair, sofa, stool, bench, or bed and comes up without moving 6px. That sits or lies the player's own avatar and moves her to the anchor, which is today's `sitAt`. A second tap on that same piece stands her up. Play does not drag the furniture. Today `onPlayTap` runs on pointerdown. P1 waits for pointerup, and it sits only when the finger moved less than 6px, so a slip does not sit her and does not become a character drag.

The house has no tap-the-ground walk. That gesture is the ranch. A finger that starts on empty floor still does what it does now: under 6px it deselects, and past 6px it pans the camera. That pointer never sits a character and never starts a character drag. A finger that starts on the avatar or a doll and lifts without moving 6px is a tap on her. It does not sit, stand, or move her. Switching between Play and Decorate does not clear a seat by itself.

### Moving the furniture

Call: she stands up. She is not carried.

Decorate is for placing the room, not for posing kids. A carried sit would follow the piece through a flip, into a hand, into the bin, or into another room. When a seatable item is flipped, deleted, held, or dragged past the same 6px that already counts as a furniture drag, everyone whose `seat` names that item stands at the anchor they had when the grab started, and `seat` is cleared. A tap on the piece, under 6px, leaves them seated. Putting the piece back down does not sit them again. `item/front` and `item/back` do not clear a seat, because the piece did not move.

### Pose and paint

Sit: legs out (about `legL: -76`, `legR: 76`, the spike pose), body upright, so hair, hats, and outfits stay in the standing stack. Lie: turn the whole body, and draw sleepy eyes for that frame only. Do not write `look2`.

Skirts, tutus, dresses, and overalls need a lap drape, the same lesson as the riding leg. Classic kids (no `look2`) get a simpler bent-leg drawing so dolls still sit. Held items follow `handsOf` for that pose. Walk animation is off while she is seated. Cache the SVG by look stamp plus pose. No per-frame rebuild, no blur, no extra layout thrash.

Z-order is paint-only. The item stays one saved object. While someone sits, draw the back at the item's z, the kid just above it, and a front slice (arm, blanket, crib rail) just above her. Saved `z` does not change. Zzz is a small mark on the kid, not new chrome.

### Layout

No new top-bar control. iPad 820×1180, 1024×768, and 1180×820 never match `PHONE_MQ` and never get `body.phone`. Phone rules stay under `body.phone`. Tap targets stay at least 44px. 390×844 and 375×667 use the same seat anchors in room space; only the camera scale changes. The name tag already clamps on phones. A seated tag uses that same clamp so it does not cover the drawer.

### Performance

One cached SVG per look+pose, rebuilt when the look or the pose changes, not on a timer. The walk CSS is disabled with a class, which is cheaper than fighting the animation. The three-slice paint exists only for an occupied seat. Empty rooms draw exactly as they do now. Anchors are computed when an item is placed, moved, or flipped.

### Tests

- Migration: a version-3 save with no `seat` loads unchanged, and every doll is standing. A save with `seat` on a second doll, not the active one, still loads, version stays 3, and a missing item clears that seat. `JSON` of a standing kid has no `seat` key.
- Old client: fixture of today's `migrate` + `cleanHouseState` on a blob that contains `seat`. No throw. The field is dropped by `cleanHouseState` and kept by `migrate`. An old `char/move` still only copies `x` and `y`.
- Drag snap, pure rules before the paint, and only in Play: drop a non-active doll on a chair and she stores `seat` with pose `sit` at that anchor. Drop her on a bed and the pose is `lie`. Drop her on a sofa that already has one sitter and she takes the other anchor. Drop her on a full sofa or a taken chair and she keeps the release `x`,`y` with no `seat` key. Drag her off and the key is gone. A room-tab drop changes her room and clears `seat`.
- Decorate does not sit: the same drop of that doll onto a chair, with the mode set to decorate, leaves no `seat` key and leaves her at the release `x`,`y`. Dragging the occupied chair past 6px, flipping it, deleting it, or holding it clears `seat` and leaves her standing at the anchor she had when the grab started. She is not carried. A tap on that chair under 6px leaves her seated. `item/front` leaves her seated.
- Taps stay taps: a pointer that starts on a chair and lifts without moving 6px sits the player's own avatar and does not drag her. A pointer that starts on that chair and moves past 6px does not sit anyone and does not move the chair, because Play does not drag furniture. A pointer that starts on empty floor still deselects under 6px and pans past 6px, and it never writes `seat`. A pointer that starts on a doll and lifts without moving 6px does not move her and does not write `seat`.
- Multi-client: two `sit: 1` clients see a doll dragged in Play sitting after the house action. A client that did not send `sit: 1` receives `char/move` without `seat` and draws her standing at that `x`,`y`. An old server strips `seat`. No unknown action is broadcast. Reload the house and the doll is still seated. A Decorate drop is seen as standing.
- Occupied anchor: a tap on a full chair toasts and the avatar stays standing. A Play drag onto that chair does not toast. The doll lands beside it, standing. The second Play drag onto a sofa takes the free anchor. A third Play drag onto that sofa lands beside it.
- Tap still sits the player's own avatar, in Play, without a drag. A second tap stands her up. Her neighborhood sit is presence. A doll's sit is the house save.
- Real touch, in Play: pointer-drag a created kid onto the painted chair and onto the same chair with `?art=v1`, then onto the sofa's second seat, then onto a bed, then off the bed. Then switch to Decorate and drop her on the chair: she stays standing. Drag that chair: she stands at the old anchor. Run on the iPad size and on 390×844. A drop on a room tab still changes rooms. A floor pan still pans.
- Pose unit: hair, hat, and clothes order; skirts do not ride inside `.leg`; classic SVG still renders. A classic doll with no `look2` still snaps and gets the simpler bent-leg sit.

### Estimate

About **4 cloud-agent runs**, roughly **12–14 hours**. One run for the pose and the outfit drape, one for anchors and the paint split, one for the Play-only drag-snap, the Decorate stand-up, the saved seat on every doll, and the old-client gate, one for the iPad and phone pass. The Worker ships in the same release as the client. The what's-new card (v9) is part of that release, not this plan.

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
- In Play, drop the baby on a chair and she stores a sit seat. Drop her on a bed and she stores a lie seat. Drag her off and `seat` is gone, `spot` is `mat`. Drop her on the crib and `spot` is `crib`. A taken chair drops her beside it, standing, with no seat. In Decorate, the same chair drop leaves her standing with no seat. Moving that chair stands her at the old anchor.
- Deleting the crib sets `spot` to `mat` and leaves `name`. A seat on some other piece is left alone.

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

Andy locked 1 and 7, and he locked the Play-only drag in 14 and 16. Standing a seated kid when the furniture moves (15) is the call he left open: they stand, they are not carried. The rest were the plan's defaults. They are locked the same way. P1 and P2 build these, not a fresh set of choices.

1. Two kids can share a sofa. A sofa has two seat anchors. A chair, armchair, stool, and bed have one. One kid per anchor. The second sofa seat is the other anchor. A tap on a full piece toasts "Someone is already there!" A Play drag onto a full piece drops beside it, standing, with no toast.
2. Every house doll's seat is saved on that character, and omitted when she is standing. An old save has no `seat` and loads standing. A reload keeps each seated doll where she was, including dolls that are not the active kid.
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
14. Drag-to-sit and drag-to-lie are Play only. In Play, dragging the player's own avatar or a kid-created character onto a chair, sofa, stool, or bench snaps her to the nearest free sit anchor. A bed snaps her to lie. A sofa allows two. No free anchor means a standing drop beside the piece. Dragging her off stands her up. The doll's seat is in the house save and syncs to `sit: 1` clients. The baby uses the same Play drop once she can be put down.
15. Decorate does not seat. Dropping a character there is an ordinary place, even on a chair or a bed. Moving, flipping, deleting, or holding a piece someone is sitting on stands them at the anchor they had when the grab started and clears `seat`. They are not carried. A tap under 6px on that piece leaves them seated. Switching mode does not clear a seat.
16. Play drags do not take the other taps. Tap-to-sit is a furniture tap under 6px and still sits the player's own avatar. A finger on empty floor still deselects or pans, and it never sits anyone. The house does not gain a tap-the-ground walk. A finger on a character that lifts without moving 6px does not sit or move her.
