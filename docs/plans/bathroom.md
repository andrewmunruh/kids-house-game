# Bathroom

The bathroom is in the game on this branch: room id, the approved starter, thirty shelf pieces, and a Worker allow-list. Art follows `docs/art-style-v2` on `cursor/art-refresh` (fetched, not merged). Nothing here is deployed. The mockups below are the direction Andy approved.

The nursery is the pattern: room id on the house, starter pieces for a save that has never had the room, version left at 3, protocol left at 4, and the server allow-list is the same `ROOM_IDS` list the client already trusts. Commits worth reading beside this note are `9acd1a9` (nursery room and the server names), `1f0aa5c` (strict migration), and the old-client model in `tests/rooms_test.ts`.

## Room

| | |
| --- | --- |
| id | `bathroom` |
| tab label | Bathroom |
| short label | Bath |
| tab color | `#5ec4c0` |
| order | after Nursery, and before Backyard (Backyard stays a room id with no tab) |
| starter wall | `#d7f6f8` |
| starter floor | `#f3e0c8` |
| starter pattern | `1` (the soft dots the nursery already uses) |

`RoomId`, `ROOM_IDS`, and `TAB_ROOMS` in `src/shared/state.ts` gain `bathroom`. `ROOM_IDS` is the server allow-list (`isRoom` in `src/shared/hood.ts`), the same way `nursery` and `backyard` got in. `src/main.ts` `ROOMS` and `TAB_SHORT` gain the tab. `src/scenery.ts` gains the tab color so an empty bathroom still gets the usual window. The bedroom `tub` / Bathtub stays on the bedroom shelf. The new tub is a different kind and a different name.

Save version stays **3**. `PROTOCOL` stays **4**.

## Migration

Same rules as the nursery, including the strict checks that model client `27cfcac` and the `fbd04db` house loader.

`ensureRooms` already walks `ROOM_IDS`. A save whose `rooms.bathroom` is missing, not an object, or has no `items` array receives the starter room. A bathroom that is already stored is left byte-for-byte alone, including a bathroom a kid has emptied. Each fill-in calls `initialState()` so two houses do not share one starter array (the nursery test mutates one fill-in and checks the next).

Starter pieces match the approved mockup, and every box stays inside the stage at the seven checked sizes:

| kind | name | role |
| --- | --- | --- |
| `puddle-mat` | Puddle Bath Mat | under the tub, the only overlap |
| `rain-shower` | Rain Shower | back-left, against the wall |
| `clawfoot-tub` | Clawfoot Tub | center, clear of the shower |
| `mirror-vanity` | Mirror Vanity | right wall, mirror above the cabinet |
| `little-toilet` | Little Toilet | right front |
| `bath-cubby` | Bath Cubby | far left front |

`migrate` does not bump the version. A version-3 save with no bathroom key gains that starter and keeps every other room. `cleanHouseState` already rebuilds rooms from `ROOMS`, so once `bathroom` is on that list the new Worker keeps it, the same way it keeps a custom nursery.

Disk stays as stored until the next edit. `server/core.ts` fills missing rooms in memory only, and the first accepted edit writes the filled house. A living-room edit on an old stored house must persist the starter bathroom and the original living-room items. An unknown room name (`attic`) is still nacked and must not touch the bathroom.

The implementation test, next to the nursery cases in `tests/rooms_test.ts`:

- protocol stays 4 and the fresh house is still version 3
- a house with the bathroom key deleted gains the starter kinds, and the living room is not replaced
- two fill-ins do not share objects
- a custom bathroom (one item) is not replaced, and a missing backyard is still filled
- an emptied bathroom stays empty (`ensureRooms` returns the same object)
- `migrate` of a version-3 save with no bathroom leaves `version` at 3
- `cleanHouseState` adds the starter bathroom and keeps a custom one
- `cleanAction` and `cleanPresence` accept `bathroom` and still reject `attic`
- a modeled `27cfcac` load keeps `rooms.bathroom`, and bringing that house back through `cleanHouseState` keeps it
- a modeled `fbd04db` / avatar-v2 load keeps the bathroom items, opens the living room, and a later living-room edit does not drop the bathroom
- loading an old stored house fills the bathroom in memory and does not write it back until an edit
- a bathroom edit and a rejected attic edit round-trip through the Worker
- display names stay unique, and the new file is part of that scan

`oldClientMigrate` in `tests/rooms_test.ts` is the `27cfcac` model: spread the saved rooms over the four rooms that client knew (`living`, `bedroom`, `kitchen`, `salon`) and keep every extra key. `fbd04db` and this branch (`d672443`) both run `ensureRooms` and then `showKnownRoom`. The new test should model that second loader too, not only the four-room spread.

## Old clients

`fbd04db` (Release B0, `main`) and the avatar-v2 build (`d672443`) do not know `bathroom`. They must not throw, and they must not delete the room.

What those two builds actually do:

- `migrate` / `ensureRooms` copy `rooms` with a spread. An extra `bathroom` key stays on the object. `showKnownRoom` only runs because `bathroom` is not in `TAB_ROOMS` or `ROOM_IDS`: `currentRoom` becomes `living`, and a kid whose `room` is `bathroom` is moved to the living room so she is not invisible. The bathroom object is not deleted. The next local save is `JSON.stringify` of that state, so the furniture is still there when she updates.
- `reduce` spreads `rooms` too. A living-room edit on those builds keeps `rooms.bathroom`.
- `wireState` strips mailbox fields for old clients. It does not rebuild the room map, so a new Worker can send the bathroom and an old client holds onto it.
- `cleanHouseState` is the wipe. It builds a new `rooms` object from the known list only. On `fbd04db` and avatar-v2 that list has no `bathroom`, so a house brought onto a street (`join` with `house`) loses the bathroom. Local play does not call `cleanHouseState`.

`27cfcac` is older. Its `migrate` is `{ ...base.rooms, ...saved.rooms }` and it has no `showKnownRoom`. If `currentRoom` is `bathroom` and `rooms.bathroom` is present, that client draws the room (there is a room object to read) and simply has no Bathroom tab. Tapping Living works. The extra key survives the spread, so a later save still has the bathroom. It does not wipe the house. She can be standing in a room with no tab until she taps another one. That is the same shape the nursery already accepted for that client.

Neither old build can paint the new kinds. Unknown `kind` values are kept in the save and skipped at draw time (`renderItems` already does this).

## Protocol and the Worker

`PROTOCOL` stays 4. A bathroom is another key on the house, the way the nursery, the backyard, the kennel, and the mailbox rode along without a new protocol. Old clients still connect. There is no new message.

The Worker has to deploy **before** any client that writes `rooms.bathroom`.

- An old Worker nac's `item/*`, `room/*`, `char/move`, `cat/move`, and presence when `room` is `bathroom`, because `isRoom` fails. That rejects the edit. It does not replace the house.
- An old Worker's `cleanHouseState` drops the bathroom when a kid brings her local house onto a street. That is a real wipe. Shipping the client first creates it.
- Once the Worker is the new one, `ROOM_IDS` accepts the room, `ensureRooms` fills a missing bathroom in memory, and the next edit persists it. Clients that are still on `fbd04db` or avatar-v2 keep playing. Their living-room edits no longer erase the bathroom, because the server applies `reduce` on the server copy.

Client and Worker can ship in one release. The Worker goes out first.

## Tabs, the Menu, and the stage

`fit()` is not part of this work. Landscape iPad keeps `VIEW_W = 1000`. Portrait iPad still derives the window from the wrap. A second chrome row is what would shrink the stage. The bathroom tab has to stay on the row that already exists.

`cursor/declutter-menu` (draft PR 17) takes the tool cluster (pets, paint, characters, sound, lock, surprises) into one Menu. The top row that remains is the room tabs, the minimap, and Chat / Menu / Map. That is the row these mockups use. iPad keeps full names there. Phones at 700px and under already switch to short names so five tabs share the row.

Where Bathroom goes:

- **iPad 1180 and 820, after the Menu.** Full word **Bathroom**, sixth tab, after Nursery. On an 820-wide portrait row the six full names, a 112px minimap, and Menu + Map land near 620px, inside 820, on one line. The stage does not grow a row, so its size stays put.
- **iPad 820 today, before the Menu.** The tight case in `src/style.css` is five short names, the minimap, and seven 44px tools (lock and chat plus pets, paint, characters, sound, and map). A sixth short label **Bath** fits that row. The full word Bathroom should wait until the Menu has freed the tools. Do not drop the minimap and do not wrap the tabs.
- **Phone portrait (390).** Declutter already gives the tabs their own row and puts Menu / Map on the next one. Short labels, with **Bath** last. The row is already 44px tall. A sixth short name does not add height.
- **Phone landscape around 667.** Declutter's note says five short names, the minimap, and Chat / Menu / Map already fill that row. A sixth tab must not wrap onto a new line. If it does not fit, the tab row scrolls sideways (`pan-x`, the same trick as the drawer chips) instead of growing taller. `fit()` stays as it is.

Play hides the shelf (`body.mode-play`). Decorate shows it. Neither mode changes the stage math.

The drawer does not gain a pack chip. Nursery pieces live in `src/nursery.ts` with no pack name, and they show on the furniture, decor, and plants shelves of that room. The bathroom set should do the same, in `src/bathroom.ts`, so the scrolling chip row (already tight at 1024) does not grow. The unique-name scan in `tests/rooms_test.ts` reads `items.ts`, `nursery.ts`, and `eggs.ts`. Add `bathroom.ts` to that scan, and add the names to `src/shared/catalog-names.ts`.

Generic decor still appears, the way it does in the nursery: plants, and decor whose name is a rug, lamp, light, curtain, clock, or window. Ring Light and Desk Lamp are skipped in the nursery because they do not belong there. Skip them in the bathroom too. Bedroom pieces stay on the bedroom shelf, including the existing Bathtub and the Sunny Vibes Bubble Bath.

## The set

Thirty names, ten to a shelf. None of these strings are in `src/shared/catalog-names.ts`. Kinds are new. Wall pieces use `wall: true` and snap to the wall the way the crib mobile does. Small decor is holdable. Furniture is not.

The thirty drawings follow `docs/art-style-v2` on `cursor/art-refresh` (fetched, not merged): the real object's silhouette first, then plum outline `#5a3d5c` at weight 3.5, light from the top left, a two-tone cel side plane, a white edge tick, a few texture strokes, and the two-ellipse plum contact shadow on floor pieces. Rugs and wall pieces have no shadow. No blur filter, no `color-mix()`, no bitmap. Glass is two flat tones plus a white tick, so copies of one piece never share a gradient id. Nobody is in the water. The toilet is a closed lid and a daisy.

### Furniture

| kind | name | notes |
| --- | --- | --- |
| `clawfoot-tub` | Clawfoot Tub | starter, water and bubbles, no one in it |
| `rain-shower` | Rain Shower | starter, stall, curtain tied back, no one inside |
| `mirror-vanity` | Mirror Vanity | starter, cabinet plus the mirror |
| `little-toilet` | Little Toilet | starter, closed lid, daisy sticker |
| `towel-ladder` | Towel Ladder | towels on the rungs |
| `wall-towel-bar` | Wall Towel Bar | wall, one towel |
| `bath-cubby` | Bath Cubby | starter, open shelf, towels and a bottle |
| `clothes-hamper` | Clothes Hamper | lid, a peek of cloth |
| `sink-step` | Sink Step | two steps, so she can reach |
| `linen-cupboard` | Linen Cupboard | tall cabinet |

### Decor

| kind | name | notes |
| --- | --- | --- |
| `puddle-mat` | Puddle Bath Mat | starter, floor |
| `sunny-ducky` | Sunny Ducky | holdable |
| `shell-soap` | Shell Soap Dish | holdable |
| `bubble-bottle` | Bubble Bottle | holdable |
| `bubble-machine` | Bubble Machine | holdable, bubbles from a nozzle |
| `brush-cup` | Brush Cup | holdable, two brushes |
| `porthole-mirror` | Porthole Mirror | wall |
| `tub-tray` | Tub Tray | rests across the tub |
| `robe-hooks` | Robe Hooks | wall, hooks and one towel |
| `sand-timer` | Sand Timer | holdable |

### Plants

| kind | name | notes |
| --- | --- | --- |
| `mist-fern` | Mist Fern | floor |
| `hanging-eucalyptus` | Hanging Eucalyptus | wall |
| `pebble-succulent` | Pebble Succulent | holdable |
| `aloe-friend` | Aloe Friend | a plant with a face, like the cactus |
| `lily-pad-pot` | Lily Pad Pot | floor |
| `moss-bowl` | Moss Bowl | holdable |
| `clover-sprout` | Clover Sprout | holdable |
| `rain-sprout` | Rain Sprout | floor |
| `window-bamboo` | Window Bamboo | floor |
| `bath-herb` | Bath Herb | holdable |

Play taps, when this is built: a kind that already matches `vanity` or `mirror` opens, so the vanity and the porthole mirror do. The tub, the shower, and the toilet wiggle. They do not use the sit pose. There is no bathing animation.

## iPadOS 16 and 60fps

The pack is static SVG inside the item nodes the room already creates. Shading is an extra filled path (`#3a1d3c` at about 0.16 opacity) and a white ellipse, which is what `src/avatar/geom.ts` allows. Texture is a handful of circles, not a filter and not a bitmap. Contact shadows are the ellipse the catalog already draws. No `feGaussianBlur`, no `backdrop-filter`, no `color-mix()`, no per-frame canvas. Bubbles on the tub are drawn, not animated. If a later pass wants one bubble to bob, it has to be a CSS transform that stops under `prefers-reduced-motion`, and it has to stay off while the room is not showing.

The stage, the camera, and `fit()` stay as they are. Adding a tab to the existing row does not add draw cost.

## Mockups

Drawn at the real artboard sizes. The top row is the declutter Menu row, because that is the row Bathroom has to fit. The girl is the chibi renderer already on this branch, dressed, standing on the floor. She is not in the tub.

| file | size | what it shows |
| --- | --- | --- |
| [bathroom-play-ipad.png](mockups/bathroom-play-ipad.png) | 820×1180 | Play, shelf hidden, dressed bathroom |
| [bathroom-play-phone.png](mockups/bathroom-play-phone.png) | 390×844 | Play on a phone, short tab Bath |
| [bathroom-decorate-ipad.png](mockups/bathroom-decorate-ipad.png) | 820×1180 | Decorate, furniture shelf open |
| [bathroom-decorate-phone.png](mockups/bathroom-decorate-phone.png) | 390×844 | Decorate, shelf open |
| [bathroom-tabs-ipad.png](mockups/bathroom-tabs-ipad.png) | 820×1180 | where the sixth tab sits on iPad |
| [bathroom-tabs-phone.png](mockups/bathroom-tabs-phone.png) | 390×844 | where Bath sits on the phone row |
| [bathroom-contact.png](mockups/bathroom-contact.png) | 820×1180 | pieces 1–15, with display names |
| [bathroom-contact-2.png](mockups/bathroom-contact-2.png) | 820×1180 | pieces 16–30, with display names |

The portrait camera is the existing narrow window (`VIEW_W` floors at 480, the stage is that width by 600). The pictures show a finished, tidy bathroom in that window, at the same scale as the girl. Tile wainscot sits under the wallpaper. A glass shower has a curtain and a door. The clawfoot tub is full of foam, with a roll-top rim, four claw feet, a faucet, and the duck on the rim. The toilet is a closed lid with a daisy. The mat is a fluffy scalloped rug on the floor. A wall shelf holds jars, a water glass, and a soap pump, and a towel hangs from a hook. She stands beside the tub, dressed, not in the water.

## Open questions

1. Starter set of four, as above, or an empty bathroom the way the backyard is empty until its scene exists?
2. Built-in shelves, like the nursery, with no new drawer chip? A "Bath Time" pack tab would sit on the chip row the 1024 layout already scrolls.
3. Land this on top of the Menu branch, or ship it against today's seven-tool row with the short label Bath everywhere under 900px?
4. On a 667-wide phone on its side, is a sideways-scrolling tab row all right if six names do not fit?
5. What's New is v8 on this branch. The Menu branch is using v9, Winter Cheer v10, Critter Corner v11. Which number should the bathroom announcement take, and should it wait until the art is in?
6. Skip Ring Light and Desk Lamp in the bathroom, the way the nursery does?
7. The bedroom Bathtub and the Sunny Vibes Bubble Bath stay where they are. Confirm we do not move or rename them.
8. Little Toilet is a closed lid and a daisy, no person. Is that the right tone, or should the toilet wait?
9. Wallpaper and floor stay plain starter colors (no new pattern pack) for the first pass?
10. Bubbles stay still. Any one of them allowed to bob?
