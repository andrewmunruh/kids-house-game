# Backyard: plan for Andy's approval

*Drafted Mon Oct 19, 2026 against `cursor/avatar-v2` (`d672443`). Plan and mockups only. No game code, no Worker deploy.*

The nursery already shipped, and so did the empty `backyard` room key (commit `9acd1a9`, "teach the server both new room names"). This plan is the outdoor scene on top of that key: sky and a fence where the wallpaper is, grass where the floor is, a back door in the living room, and about 20 new outdoor pieces. It is still a room. It is not a 6th tab and not a new place on the street.

Mockups (shot from `docs/plans/backyard-mockup.html`, not from the game):

| | iPad 820×1180 | Phone 390×844 |
|---|---|---|
| Yard, Play | `docs/plans/mockups/yard-play-820x1180.png` | `docs/plans/mockups/yard-play-390x844.png` |
| Yard, Decorate, outdoor shelf | `docs/plans/mockups/yard-decorate-820x1180.png` | `docs/plans/mockups/yard-decorate-390x844.png` |
| Living room, back door | `docs/plans/mockups/living-door-820x1180.png` | `docs/plans/mockups/living-door-390x844.png` |

Open the HTML with `?shot=play`, `?shot=decorate`, or `?shot=door`. Width under 500px uses the phone chrome.

## Recommendation

Build the yard as the room id that is already in the save. Paint it outdoors. Enter it through a fixed back door in the living room, the same idea as the barn door. Leave Play / Decorate, the five room tabs, the Menu, and the Map where they are, so the iPad stage box does not change.

v1 does not add a swinging pose. A swing is furniture she can place. Sitting on it is an open question at the bottom.

## How it fits the code today

### Room ids

`src/shared/state.ts`:

- `RoomId` already includes `'backyard'` (line 7).
- `ROOM_IDS` is living, bedroom, kitchen, salon, nursery, backyard (line 9).
- `TAB_ROOMS` is the five indoor rooms (line 11). The yard is not a tab.
- `initialState().rooms.backyard` is sky blue `#c5ecff`, grass green `#b6e3a8`, pattern 0, and **no items** (line 134). The comment says the scene ships later.
- `ensureRooms` copies a missing room from `initialState` and leaves a stored room alone, including an emptied yard (line 167).
- `migrate` fills salon, nursery, and backyard without bumping `version` (still 3).
- `showKnownRoom` (line 301) treats anything that is not a tab as "no scene yet." A save whose `currentRoom` is `backyard` opens the living room and brings a kid who was standing in the yard with her, so she is not invisible.

The scene build changes that last rule only. A known scene list becomes the five tabs plus `backyard`. `TAB_ROOMS` stays the five tabs, and `renderTabs` in `src/main.ts` keeps reading that tab list (line 53). No 6th button.

`room/switch` is already local-only. `cleanAction` drops it (hood.ts line 403). Walking out the door does not need a new action. The client dispatches `room/switch` and sends presence `{ where: 'house', room: 'backyard', ... }`.

### Server allow-lists

There is no second room list in `server/core.ts`. The Worker calls shared helpers:

| Check | Where | Today |
|---|---|---|
| `isRoom` | `src/shared/hood.ts` line 309, `const ROOMS = ROOM_IDS` | `'backyard'` is allowed |
| `cleanAction` item, paint, tile, `char/move`, `cat/move` | hood.ts lines 384–401 | yard edits pass; `'attic'` still fails |
| `cleanHouseState` | hood.ts line 413, loops `ROOMS` | keeps a stored yard, fills a missing one |
| `cleanPresence` for `where: 'house'` | hood.ts line 498 | yard presence passes |
| `cleanCat` | hood.ts line 373 | a cat whose `room` is `backyard` passes |
| Load | `server/core.ts` line 63 | `ensureRooms` in memory; disk stays as stored until the next edit |
| Edit | `server/core.ts` line 393 | `ensureRooms` before `reduce`, so a living-room edit cannot save a house that dropped the yard |
| Wire | `wireState` / `wireHouse` | strips mailbox for old mail clients; **does not strip rooms** |

`rooms_test.ts` already checks that a backyard `item/add`, `room/wallTile`, and `char/move` are accepted, and that an unknown room is rejected. `hood_test.py` already syncs a backyard item between two clients.

No new allow-list word is required for the scene.

### Save and migration

Version stays **3**. Old saves already gain `rooms.backyard` from `initialState` when the key is missing. Houses saved by `fbd04db` or avatar-v2 already have the key, with `items: []`.

That split is why v1 should **not** put starter furniture in `initialState().rooms.backyard`:

- A `27cfcac` house has no `backyard` key, so `ensureRooms` would copy the starter set.
- An `fbd04db` or avatar-v2 house already has `items: []`. `ensureRooms` will not refill it. An empty list is also what a kid would have if she deleted everything, and the fill-in rule is never to overwrite a stored room.

Sky and grass are paint, not items, so an empty yard still looks like a yard. New houses use the same empty room. The Oct 18 note suggested a starter swing and sandbox. That made sense before the empty key shipped. It does not fit the saves we have now.

Pack tiles for sky, fence, and grass use the existing `room/wallTile` and `room/floorTile` actions. `TILE_RE` only checks the `<pack>/<slug>` shape. New tiles do not need a server change. Built-in `pattern` stays 0–3.

### What is already tagged backyard

Five Welcome Home pieces already have `room: "backyard"` in `assets/items/manifest.json`. Once the yard is a place you can stand, `catalogShows` will list them on that room's shelf. They keep their names. The new set does not repeat them.

| Name | Shelf |
|---|---|
| Mini Greenhouse | furniture |
| Fire Pit | furniture |
| Yard Sign | decor |
| Apple Tree | plants |
| Picnic Basket | food |

### Two client bugs the scene has to close

Both already treat the empty yard as an indoor room, because the scene was not there yet.

1. `src/scenery.ts` `syncScenery` draws an indoor window when the room has no window, and a rug, lamp, and plant when it is empty. In the yard that window would sit on the sky.
2. `emptyRoomStarters` drops a real rug, lamp, and plant the first time she places anything in an empty room. `tests/polish_test.ts` asserts that for `backyard`. The yard build should add nothing (the sky and grass are the room) and update that test. Those three kinds stay valid items; they just are not auto-placed outside.

### Pets

No new pet actions.

- The cat lives in one room. `cat/move` and `cat/set` already require `isRoom`, which includes the yard. Standing in the yard and choosing "this room" in the pet sheet uses `currentRoom`. She shows up in the yard and not in the living room, which is how a cat already works between indoor rooms.
- A dog follows her walker through presence, in the house and outside it. She follows into the yard. The Dog Kennel and Cat Tower are `rooms: ['any']`, so they already appear on the pets shelf in every room, including the yard. v1 does not add a second dog house.

### Map

Not in v1. A fence drawn inside the existing house art can come later. It must not be a new tap target. `map_test` still requires 1–12 houses with no overlaps. The Oct 18 measurement (117 units between houses at 12) still stands.

## Old clients if a house has a yard

Three builds matter. None of them draw the outdoor scene. All of them can keep the room in the JSON.

### `27cfcac` (four rooms, before the nursery)

`RoomId` is living, bedroom, kitchen, salon. `isRoom` rejects `'backyard'`. This build's Worker would `nack` a yard edit. Its client:

- `migrate` does `{ ...base.rooms, ...saved.rooms }`, so a backyard key in a newer save is **kept**, not deleted.
- Street visits start in the living room (`houseStore` holds `currentRoom` on the device).
- A welcome from a post-nursery Worker includes `rooms.backyard`, so this client's `reduce` can apply a yard `item/add` without throwing. Its `mapItems` does not guard a missing room; the throw only happens if the key is absent. A normal welcome from today's Worker has the key.
- It has four tabs. It never offers the door. Unknown item kinds are skipped and kept (`renderItems`).
- Rollback quirk: if `currentRoom` in the solo save is `backyard`, this client has no `showKnownRoom`. It will paint that room with the flat blue and green colors, skip kinds it does not know, and leave when she taps a tab. It should not throw, because the yard client always writes the room key. `fbd04db` and avatar-v2 do not have this quirk.

Bringing a solo save onto a **27cfcac Worker** runs that Worker's `cleanHouseState`, which copies only the four rooms and drops the yard. That is the reason to confirm the live Worker is newer than `27cfcac` before the scene client ships.

### `fbd04db` (current `origin/main`, Release B0)

This build already has the empty yard key, `PROTOCOL` 4, and `showKnownRoom`. If a house has yard items:

- They stay in the save. `ensureRooms` does not replace a stored yard.
- She opens the living room. A kid saved in the yard is moved to the living room on load.
- Five indoor tabs. No door, no outdoor paint. She does not draw the yard items, because she never switches to that room.
- Yard presence is valid on this client (`isRoom` includes backyard). A friend standing in the yard is simply not in the living room. No extra message type, so nothing arrives that this reducer cannot apply.
- A cat whose home is the yard disappears from the living room until someone moves her back. Same as a cat in the nursery while you are in the kitchen.
- Her dog is drawn with the walker. If the walker is in the yard, the dog is not drawn in the living room.
- A living-room edit still syncs both ways. The server save keeps the yard items.

### Avatar-v2 (`d672443`, this branch's parent)

Same yard behavior as `fbd04db`. The extra avatar-v2 fields (`look2`, the stricter letter filter) are unrelated to the room. A mixed street must keep today's rule: an old look update does not wipe `look2`, and a yard edit does not wipe it either. `wireState` does not touch `look2`.

## PROTOCOL and the Worker

**PROTOCOL stays 4.** The comment in `src/shared/hood.ts` (line 360) already says the nursery and the backyard ride along on the house. Old clients keep unknown fields and unknown item kinds, and they do not draw them. Yard edits are the actions those clients already apply (`item/add`, paint, tiles, `char/move`, `cat/move`, presence). Nothing new has to be hidden the way pets, the ranch, and tables were.

Do not bump to 5 just to make a test sentence shorter. A bump would start filtering messages the old clients can already apply.

**The Worker does not need a new deploy for this scene.** `'backyard'` has been on the allow-list since `9acd1a9`, which is an ancestor of `fbd04db` (`origin/main`) and of avatar-v2. `server/core.ts` already fills a missing yard in memory and accepts the actions.

Ship the client only against a Worker that includes that commit. A Worker still on `27cfcac` returns `invalid` for every yard edit, and the swing would snap back. That is a gate, not a new deploy. This run does not deploy anything.

A later "she actually swings" pose is the thing that would touch the Worker. House presence drops `pose` today (`cleanPresence` keeps pose for the park only). That follow-up can stay client-local or can become a small presence change. It is not part of v1.

## Entry, and the declutter menu

`cursor/declutter-menu` (`5206fea`) moves Pets, Characters, Colors, Surprises, Lock, Sound, Mailbox, Grown-ups, and Friends into one Menu card. The top row that remains is the five room tabs, the minimap, Chat (on a street), Menu, and Map. Phone portrait puts the tabs on row 1 and Menu / Map (and the minimap, in Decorate) on row 2. iPad keeps full room names because the Menu freed the row. 12px type stays off the iPad.

`stage_size_test.py` compares the `.stage` box with commit `1f0aa5c` at 1180×820, 1024×768, 820×1180, 844×390, and 375×667. The world window stays 1000×600 on iPad (`VIEW_W`). A new top-row button or a 6th tab can wrap that row and shrink the stage. The yard must not do either.

**The entry is a fixed control inside the stage**, like `.barnDoor` on the ranch (`src/main.ts` around the barn button, hint "Petting zoo inside!").

- It sits on the living-room wall, in the camera frame she already sees, with a hint that says **Backyard**.
- It is not an item. She cannot drag it, delete it, or count it toward the 80-item cap. Decorate does not select it.
- Play does not hide it. `mail.css` hides the shelf in Play, not the stage.
- In the yard, a matching control on the house wall says **Back inside** and returns her to the living room (`room/switch` to `living`, presence follows).
- Tapping Living, Bedroom, Kitchen, Salon, or Nursery also leaves the yard. While she is outside, none of those tabs is selected. The mockups show that.
- Hit target at least 44×44 CSS pixels on 390×844 and 820×1180, after the stage scale. The barn door is the pattern: a world-sized button, not a 44px button in world units.
- No Menu row and no Map button. The Menu is tools. The Map is the neighborhood. The door is how you go outside at home.

The door is inside the stage on both today's top bar and the declutter top bar, so the yard branch does not have to wait for declutter to keep the stage size. Before the client ships, rebase onto declutter if that has landed, and re-run `stage_size_test`. The door must not move `.top` or `.drawer` height.

Kitchen door: not in v1. One door is enough to learn, and a second hit target is a second thing to keep clear of the stove.

## Outdoor look

Same DOM as a room: `.wall` (top 390px), `.floor`, `.layer` for items. One class on the stage when `currentRoom === 'backyard'`.

- The wall slot is sky, with a fence band along the bottom. The floor slot is grass. The white baseboard is hidden outside.
- Default colors are the ones already in the save (`#c5ecff`, `#b6e3a8`), so an old client who does paint this room sees a flat blue wall and a flat green floor.
- Sky, fence, and grass options are pack tiles, no `pack` label on the items below, plus the three new tiles. Paint sheet titles in this room only: Sky, Fence, Grass. The actions stay `room/wallpaper`, `room/floor`, `room/pattern`, `room/wallTile`, `room/floorTile`.
- Clouds, if they move, are one layer on `transform`, paused when `prefers-reduced-motion` is set. No `requestAnimationFrame` loop. The cat and dog tickers already exist and should not gain a yard-only loop.
- Fence pickets are part of that one background, not a DOM node per picket.

### Tiles (paint sheet, not the shelf)

Names checked against `assets/patterns/manifest.json`. Sky Clouds, Sky Tiles, and Cloud Sky already exist and are indoor papers.

| Slot | Name | Kind |
|---|---|---|
| Sky and fence | Morning Sky | wall tile, the default look |
| Sky and fence | Rosy Sunset | wall tile |
| Sky and fence | Cloud Fence | wall tile |
| Grass | Soft Lawn | floor tile, the default look |
| Grass | Clover Patch | floor tile |
| Grass | Stone Path | floor tile |

No pack tab. Pattern files follow the current manifest shape (`<pack>/<slug>`). A short pack id such as `yard` is fine because these are paint swatches, not a drawer tab. Confirm the drawer does not grow a tab when the only new `pack` values are pattern packs. Today `TABS` grows a pack tab from **items** with a `pack` field (`src/main.ts` line 70), not from pattern packs. Keep it that way.

## Item set

20 new pieces, original names, no pack field, `rooms: ['backyard']` only. Same plum outline `#5a3d5c` and 100×100 viewBox as `src/items.ts`. No trademarked characters, no scary creatures, no real brands on the lemonade cart.

About 10 land on the furniture shelf and about 10 on the decor shelf, once the five Welcome Home pieces above are counted. Plants and food stay short on purpose: the plants shelf already lists every `any`-room plant.

`playGesture` in `src/playmode.ts` treats a kind matching `bench` as sit (she walks to the spot). Name the bench kind so that happens (`yard-bench`). Do not put `bench` in the swing kinds. Swings wiggle in v1, like a lamp that is not a lamp.

### Furniture shelf (8 new + Mini Greenhouse + Fire Pit)

| Name | Kind | Size | Play tap in v1 |
|---|---|---|---|
| A-Frame Swing | `yard-swing` | large | wiggle |
| Sandbox | `sandbox` | large | wiggle |
| Little Slide | `little-slide` | large | wiggle |
| Garden Bench | `yard-bench` | medium | existing sit (walk to it) |
| Lemonade Cart | `lemonade-cart` | large | wiggle |
| Sun Lounger | `sun-lounger` | medium | wiggle |
| Splash Pool | `splash-pool` | large | wiggle |
| Picket Gate | `picket-gate` | medium | wiggle. Not a door. |

### Decor shelf (9 new + Yard Sign)

| Name | Kind | Size | Notes |
|---|---|---|---|
| Picnic Blanket | `picnic-blanket` | large | |
| Tulip Bed | `tulip-bed` | medium | |
| Birdbath | `birdbath` | medium | |
| Lily Pond | `lily-pond` | large | |
| Patio Lights | `patio-lights` | medium | `wall: true`, hangs on the fence |
| Toadstool Light | `toadstool-light` | small | |
| Stepping Stones | `stepping-stones` | medium | |
| Pinwheel | `pinwheel` | small | holdable |
| Rain Barrel | `rain-barrel` | medium | |

### Short shelves

| Shelf | New | Already on this shelf in the yard |
|---|---|---|
| Plants | Butterfly Bush `butterfly-bush`, Hedge Row `hedge-row` | Apple Tree, plus every plant tagged `any` |
| Food | Lemonade Cup `lemonade-cup` (small, holdable) | Picnic Basket |
| Pets | none | Dog Kennel, Cat Tower, and the other `any` pets |

Names deliberately not reused: Swing Chair, Macrame Swing Chair, Picnic Basket, Lattice Bench, Waiting Bench, Lemon Tree, String Lights, Cozy Lights, Fairy-Light Garland, Mushroom Stool, Apple Tree, Fire Pit, Yard Sign, Mini Greenhouse, Pet Bowl, Dog Kennel, Cat Tower, Cloud Sky, Sky Clouds, Sky Tiles, Bubble Bath, Tulip Vase, Daisy Pot.

The mockup shelf draws a name under each icon so the set is readable. The real shelf stays icon-only, with the name in `aria-label`, matching `renderDrawer`.

What's New, when the client ships, is the next number after today's v8 ("Make your look!"). Not in this branch.

## iPadOS 16 Safari and 60fps

`vite.config.ts` already targets `safari16` and `cssTarget: 'safari16'`. The yard stays inside that. The oldest iPad called out in that file is iPadOS 16.6.

- No `findLast`, `toSorted`, or `structuredClone` (esbuild does not polyfill them).
- No popover, anchor positioning, or `color-mix()` (those miss early iOS 16).
- The outdoor look is CSS on the nodes the room already paints. One extra background layer is enough.
- Motion is `transform` and `opacity` only, and it respects `prefers-reduced-motion`, which the house already checks.
- Do not animate `background-position` on the full wall, and do not add a blur or a shadow over the whole stage.
- Items stay absolutely positioned SVG, same as the rest of the catalog. The 80-item cap stays.

## Test plan

No new harness. Extend the ones that already compare these builds.

### Migration, strict, from `27cfcac`

Same shape as `migration_test.py`: old build and old server create the street, new build and new server open a copy.

- The four old rooms match byte for byte: items, positions, paint, characters, cat.
- Nursery fill-in stays the crib, cloud rug, mobile, and rocker.
- Backyard exists. `items` is still `[]` if we keep the empty starter. Wallpaper and floor are the default sky and grass colors. Nothing else on the house changes (kennel, mailbox, basket, garden, settings).
- Disk is not rewritten until the first edit. The first edit writes the yard key and does not drop old items.
- A yard edit after the upgrade reloads from disk.
- Rollback: `27cfcac` opens a save that already has yard items and `currentRoom: 'living'`. No page errors, four tabs, yard items still in `localStorage` after she edits the living room.

### Migration, strict, from `fbd04db`

`b0_compat_test.py` is the mixed-street harness (`/tmp/b0tree` at `fbd04db`). Add a yard case next to the mailbox and `look2` cases.

- A house that `fbd04db` saved with an empty yard is still empty after the new build loads it. Nursery, kennel, mailbox, and `look2` match.
- The new client places a swing and a tulip bed. The other five rooms are unchanged.
- The `fbd04db` client on that street: five tabs, no `.backDoor`, no JS errors, living-room edit syncs both ways, swing still in `rooms.backyard` on the server and on the new iPad.
- She does not draw the swing. A friend whose presence room is `backyard` does not throw; the friend is not standing in the living room.
- Cat home `backyard` does not throw on `fbd04db`. The cat is not drawn in the living room.

### Avatar-v2 client against the yard build

Same checks as `fbd04db`, plus the existing avatar rule: the avatar-v2 client sends a legacy look update, `look2` is still there, and the yard items are still there.

### Old-client check

Keep the block already in `migration_test.py` (the `27cfcac` page against the new server, around the "old client shows four tabs" check). Add:

- Four tabs, no door, no errors, after a friend has filled the yard.
- Her living-room `item/add` is visible on the new client.
- The server copy still has the yard items, the nursery, the kennel, and the mailbox.

### Multi-client (two yard clients)

- A places the A-Frame Swing. B sees it without reloading.
- A goes out the back door. B, still in the living room, does not see A. B uses the door and does.
- A's dog is beside her in the yard. The cat, moved to the yard, is visible to both there and hidden in the living room.
- A locked house: B can look and cannot `item/add` (existing `nack` `'locked'`).
- The 80-item cap still rejects the 81st.
- An unknown room is still rejected.

### Layout

- `stage_size_test.py` unchanged: the `.stage` box matches `1f0aa5c` at all five sizes, in Play and in Decorate, in the living room and in the yard.
- Five tabs, never six. Menu and Map fully on screen at 820×1180 and 1024×768, solo and on a street, including after declutter.
- Door hit target ≥ 44px at 820×1180 and 390×844. The hint is not clipped. Phone Play still hides the shelf. Phone Decorate scrolls the outdoor shelf sideways and does not scroll the page.
- `phone_test` / the mail UI 44px checks still pass. The door must not cover the Play / Decorate toggle.

### Server

`npm run test` path that already runs `tests/rooms_test.ts`: `PROTOCOL === 4`, yard actions accepted, attic rejected. No Worker deploy in the test. `hood_test` keeps the backyard sync it has, and adds the door only as a UI check (the door is not a message).

## Out of scope for the build, unless Andy asks

- A 6th tab, a tool button, or a Menu row.
- A new presence `where`.
- A PROTOCOL bump.
- A Worker deploy.
- Starter furniture in yards that are already empty.
- Street-map yard art.
- A kitchen door.
- A second dog house.
- Swinging animation.
- What's New copy in this branch.

## Open questions for Andy

1. **Can kids sit on swings in v1?** Recommendation: no. The A-Frame Swing and the Little Slide are furniture. A Play tap wiggles them. The Garden Bench uses the sit we already have (she walks over and stands at it). A real swinging pose is how the park works, and house presence drops `pose`, so it is a follow-up. The mockups show her on the grass beside the swing, not on it.
2. **Empty yards stay empty?** Recommendation: yes. Sky and grass are enough. Adding a starter swing now would show up for `27cfcac` houses and not for houses saved since the nursery.
3. **Kitchen door in v1, or living room only?** Recommendation: living room only. The mockups show that door.
4. **Keep the five Welcome Home pieces on the yard shelf?** Recommendation: yes. They were tagged `backyard` for this. Please look at Fire Pit in particular and say if a cozy campfire is fine for this age.
5. **Bunny hutch?** Recommendation: not in v1. The Dog Kennel and Cat Tower already go in the yard. A hutch is a new pet house with no pet to put in it.
6. **Map fence in the same release?** Recommendation: later, inside the existing house drawing, not a new tap target.
7. **While she is outside, no room tab is selected.** Tapping any room tab goes back inside. Does that read clearly, or should Living stay highlighted?
