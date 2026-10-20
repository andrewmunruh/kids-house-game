# Sit, lie, and the nursery baby

Planning note for Andy. This branch does not ship the features. It records the plan, the mockups, and one sit-pose spike that stays off unless the page is opened with `?sit=1`.

Base is `main` at `ccb9124` ("Expect phone numbers, links, and emails to be delivered in the hood test."). The SHA `8a12495` from the request is not in this repo.

Target device is an iPad 10th gen at 820×1180, 60fps. The floor is iPadOS 16 Safari, so the work stays inside what that browser already does: no CSS nesting, no `:has()`, no `color-mix()`. Kids' privacy stays as it is: first names only, no accounts, no analytics.

The long-term aim is a Sims-like house (needs, moods, usable furniture, routines). P1 and P2 are the two things the kids asked for. P3 is an architecture sketch only.

## What the game does today

Play mode already treats a sofa, armchair, chair, stool, bench, bed, or crib as a sit (`playGesture` in `src/playmode.ts`). `sitAt` in `src/main.ts` only walks her there: solo play dispatches `char/move` to `x = item.x`, `y = max(FLOOR_Y + 40, item.y - 8)`; in a neighborhood it writes the same point onto her presence. She stays standing. Decorate still drags furniture.

Save `version` stays **3**. `migrate()` in `src/shared/state.ts` upgrades v1 and v2, then fills rooms a save does not have yet. Existing rooms are left alone. `PROTOCOL` stays **4** (`src/shared/hood.ts`). New street features have been optional fields plus a capability on hello/join (`pet: 1`, `mail: 1`, `v: PROTOCOL`). Unknown house fields ride along in a full JSON blob. `cleanHouseState` rebuilds the house and drops fields it does not know. `cleanAction` returns null for an unknown action, and `reduce()` has no default, so an action an old client does not know would come back `undefined` and break the store. New action types must never be broadcast to a client that did not ask for them.

Park sitting is a different thing. `Presence.pose` is `'sit' | 'swing' | 'slide'` and `cleanPresence` only keeps it when `where === 'park'`, snapped to `PARK_SPOTS`. A house presence is rebuilt as `{ where, houseId, room, x, y, flip }`. Do not reuse park `pose` or `spot` for furniture.

Characters paint at `z-index: 5000 + y`. Items paint at `1000 + item.z`. A kid always covers the whole sofa today. A real sit needs a paint-only split (furniture back, kid, furniture front) without changing the saved `z`.

Avatar v2 is the chibi in `src/avatar/draw.ts` (`look2` on the character; missing `look2` is the classic drawing). Layers, back to front: hair-back, body, shoes, bottom, top, bottom-over, face, hair-front, accessory. Hats sit in the accessory layer. Pants, leggings, shorts, jeans, and joggers live in `.leg` and follow the leg angle. Skirts, tutus, dresses, and overalls hang from the hip (the riding pose already special-cases this). Each leg is one bone from hip to foot. The walk CSS in `src/avatar.css` overrides the SVG angle, so a seated kid has to set `animation: none` on those limbs. `richAvatars()` is on only when `CSS.supports('selector(&)')` is true.

Item art (WebP 2×, `?art=v1` SVG fallback) is on the art branches, not on this main. Anchors belong in the item manifest, not in the bitmap, so both art modes share them.

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

`docs/mockups/render.ts` rebuilds the HTML pages (`npx tsx docs/mockups/render.ts`). The HTML under `docs/mockups/html/` is generated and is not part of the review.

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
seat?: { item: string; pose: 'sit' | 'lie' }
```

Omit `seat` when she is standing. Clear it when that item is deleted, held, or flipped away, and when `char/move` runs on the new client (a walk is her getting up). `newCharacter` already spreads extra fields, so an old `migrate()` keeps `seat` on the object and does not throw. Old `cleanCharacter` / `cleanHouseState` drop it, because they rebuild the character from known fields. That only matters when a brand-new street house is created from a client save. An existing house lives on the Durable Object and is updated by actions, not by a second full upload.

In a neighborhood, the kid on screen is her presence, not the doll. Add an optional presence field, only for `where === 'house'`:

```ts
seat?: { id: string; pose: 'sit' | 'lie' }
```

`cleanPresence` on a new server keeps a seat whose id is a real item in that room and whose pose is `sit` or `lie`. A bad seat is dropped. The presence is not rejected, so `x` and `y` still arrive. An old server rebuilds house presence without the field, which is the fallback: she is standing at the seat point, and nothing throws.

Position keeps using the actions everyone already understands (`char/move` for a doll, presence `x`/`y` for a player). Do not add a `char/seat` action. An old `reduce()` would return `undefined` for an unknown type. The new server's `char/move` deletes `seat` on that doll. The server includes presence `seat` only when the receiving client said `sit: 1`. Everyone else gets the same `x` and `y` and draws her standing.

One sitter per anchor. A taken seat answers with a small message, same idea as `noride`, sent only to `sit: 1` clients. The client toasts "Someone is already there!" and leaves her standing. The server is the authority.

The client sends `seat` only after the server has echoed that it understands `sit`. An old Worker ignores the unknown hello field, so she still walks to the cushion (today's `sitAt`) and the pose stays on her own screen.

### Anchors

Art repaints will add anchors per item. Until then, category defaults, measured from the item's center-bottom. A flipped item mirrors `dx`.

| Category | Pose | Default |
| --- | --- | --- |
| sofa, couch, loveseat | sit | `dx: 0`, `dy: -0.28 * h` |
| chair, armchair, stool, rocker | sit | `dx: 0`, `dy: -0.38 * h` |
| bench | sit | two seats, `dx: ±0.22 * w`, `dy: -0.30 * h` |
| bed (not a pet bed) | lie | `dx: -0.08 * w` toward the pillow, `dy: -0.22 * h` |

Manifest shape, optional, used by both SVG and WebP:

```json
"seats": [{ "pose": "sit", "dx": 0, "dy": -70 }]
```

Code defaults apply when `seats` is absent. Crib, bassinet, high chair, cat bed, pet bed, and dog bed are not kid seats in P1. A bunk uses the bottom bunk only.

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
- Occupied anchor: the second kid gets the toast and stays standing.
- Real touch: pointerdown/click on a chair sits, second tap stands, a drag past 6px stands. Run on the iPad size and on 390×844. Decorate still drags the chair.
- Pose unit: hair, hat, and clothes order; skirts do not ride inside `.leg`; classic SVG still renders.

### Estimate

About **3–4 cloud-agent runs**, roughly **10–14 hours**. One run for the pose and the outfit drape, one for anchors and the paint split, one for presence, save, and the old-client gate, one for the iPad and phone pass. The Worker ships in the same release as the client. The what's-new card (v9) is part of that release, not this plan.

## P2 — Baby v1

A baby who belongs to the house, not to a character slot (`MAX_CHARS` stays 8). She starts in the nursery crib. Kids can hold her, and they can feed, burp, change, and rock her. Cute reactions and a gentle happy meter. No neglect, no crying alarm, no failure state. The meter never goes down on its own.

### Save and protocol

Stay on version 3 and PROTOCOL 4. Add `baby: 1` on hello/join.

```ts
baby?: {
  name: string;
  mood: 0 | 1 | 2 | 3 | 4;          // starts at 2, "Cozy"
  spot: 'crib' | 'arms' | 'mat';
  holder?: string;                  // player id while someone is holding her
  at?: { feed?: number; burp?: number; change?: number; rock?: number };
}
```

Omit `baby` until the house has one, so older saves stay byte-identical. Mood only rises, or the same reaction plays again when she is already at 4. It never ticks down. There is no clock and no "she is upset" state.

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

- Migration: a save with no `baby` is unchanged. A save with a baby keeps name, mood, and spot through the new `migrate` and the new `cleanHouseState`. Mood never exceeds 4 and never drops from a care action.
- Name: `cleanPetName` accepts "Bean" and "Sunny Bunny", rejects an empty string and a filtered word, and the server stores the original trimmed text only when the filter says ok.
- Old client: today's `cleanAction` returns null for `baby/care`. A broadcast helper that filters on `baby: 1` does not deliver it. A house blob with `baby` does not throw in old `migrate`.
- Two clients with `baby: 1` see the same name, mood, and holder. A client without the flag never sees the actions. A second hold is refused.
- Real touch: each care button is 44px, works with a finger, and does not cover the phone drawer. Owner rename works. A visitor can care and cannot rename.
- Deleting the crib sets `spot` to `mat` and leaves `name`.

### Estimate

About **4–5 cloud-agent runs**, roughly **14–18 hours**, plus a separate art pass for the raster baby, crib close-up, bottle, cloth, and diapers. One run for the schema, filter, and sync gate, one or two for the care loops and the card, one for the SVG fallback and the art hook, one for mixed clients and phones. The Worker ships with the client.

## P3 — Sims-like needs (sketch only)

Do not build this in P1 or P2. The seat anchor from P1 is the hook.

A need is a suggestion, not a failure. Hunger, energy, fun, social, and clean are numbers the UI may show as blossoms or a face. They never lock a piece of furniture, never alarm, and never punish. They do not tick down in P2's baby, and a future tick eases a need toward "fine", not toward a failure.

An interaction hangs off the same anchor record P1 adds:

```ts
use?: 'sit' | 'lie' | 'feed' | 'play' | 'wash'
needs?: { hunger?: number; energy?: number; fun?: number; social?: number; clean?: number }
duration?: number
pose?: 'sit' | 'lie'
fx?: string
```

A routine is a list the player starts ("morning", "bedtime"). It is not a clock that scolds. Solo play advances coarse time on a local timer, the way the cat and the garden already do. Multiplayer uses server time in coarse steps, not per frame. `moodOf(needs)` is one function. The baby meter in P2 is that function with a single input that only goes up. Later, the kid and the baby share it.

Old clients keep working the P1/P2 way: they see a kid standing or, if they speak `sit`, sitting, and they ignore needs. Needs must not be required to render a room.

A later build of this sketch is about **8–12 cloud-agent runs**. It is not estimated as part of the next update.

## Open decisions

1. One sitter per seat, or two on a sofa? Plan says one per anchor. A bench already has two anchors. A sofa could grow a second anchor later without a protocol change.
2. Persist the solo doll's seat in the save, or keep it live-only like the park? Plan says persist, omitted when she is standing, so a reload keeps her in the chair.
3. The crib is the baby's, not a kid seat. Confirm.
4. High chair: wait for the baby, or let a kid sit there in P1? Plan says wait.
5. Cat bed, pet bed, and dog bed stay pet-only. Confirm.
6. Who may care for the baby? Plan says anyone in the house can care, and only the owner can rename.
7. Happy meter never ticks down. The other idea is that it eases back to "Cozy" and never to upset. Plan says it never ticks down.
8. Nicknames go through `cleanPetName`, not the roster first-name rules, so "Bean" and names with a space work.
9. Bunk bed: bottom bunk only in P1.
10. Protocol stays 4, with `sit: 1` and `baby: 1`, rather than PROTOCOL 5.
11. The Worker and the client ship together. An old Worker is safe (pose stays local, baby actions are rejected) but friends will not see the new pose until the Worker is updated.
12. This plan is based on `ccb9124`. `8a12495` is not in the repo.
13. The spike (`?sit=1`, built-in sofa only) is local and off by default. It is not the P1 pose split, and it does not change the save.
