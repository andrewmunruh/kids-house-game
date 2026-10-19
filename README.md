# Cozy House (v1)
A private, touch-first 2D dollhouse game for kids. Original art (no third-party characters). Single-player v1; architected for multiplayer later.

- `npm run dev` / `npm run build` (Vite + TypeScript, plain DOM + inline SVG)
- State: `src/state.ts` — serializable JSON `GameState`, pure `reduce(state, action)`, auto-save to localStorage.
- Art: `src/items.ts` (32 SVG items), `src/character.ts`, plus image packs from `assets/items/` (see `assets/items/README.md`).
- Rooms are 2400×600 world units (2.4× the 1000-wide view). Pan by swiping empty wall/floor, two-finger drag, the ‹ › buttons, the minimap, or trackpad/wheel. Dragging near an edge auto-scrolls.
- Saves (schema v3, key `cozy-house`): v1 saves (`cozy-house-v1`) are re-centred (+700) and the single `character` becomes `characters[]`; new rooms (Salon) are added from the starter layout.
- Rooms: Living Room, Bedroom, Kitchen, Salon (vanity starter layout).
- Characters: up to 8 (People tab in the drawer or the shirt button); size little/kid/adult, accessory, skin/hair/clothes. Drag a character onto a room tab to send them there.
- Holding: drop a holdable item onto a character's hand (one per hand). Held items move, flip and travel with the character; drag one off to put it down. `holdable` defaults to small/medium non-furniture; manifest may override.
- Packs: `assets/items/manifest.json` (items; optional `pack`, `holdable`, `gameW`+`widthUnits`/`heightUnits`, explicit `svg`/`png` paths; SVG preferred) and pattern entries `{type: 'wallpaper'|'floor', slug, name, pack}` with images in `assets/patterns/<pack>/`. Packs get their own drawer tab; patterns appear in the paint panel.
- Deploy: `npm run deploy` builds and force-pushes `dist/` to the `gh-pages` branch.
- No accounts, no chat, no analytics, no network calls beyond loading the app.

## Hidden surprises
Five little secrets are tucked into the house (one per name). A tiny "Secrets found: x/5" counter
lives in the corner of the room and is saved only on this device. Each one reveals a sparkly name banner and
confetti, and unlocks a special item into the drawer (🎁 tab). Solutions are in `src/eggs.ts` (spoilers!).

## Shared neighborhood (multiplayer)
A parent creates a street (adult check) and gets a 6-character invite code. Kids join with the code plus a
preset nickname, and can bring their local house along. Everyone sees changes live. The server validates every
action. Owners can lock their house (look, don't touch). Chat is proximity speech bubbles: preset phrases and emotes,
plus optional typed text up to 60 characters, filtered for bad words, numbers, links, emails, and addresses.
Free typing can be switched off on the grown-up screen. Bubbles are only relayed live, never stored or logged.
Letters live in each house's mailbox for up to 30 days. They are filtered more strictly than chat, and only the writer's first name is stored. A friend can leave three unread letters. A grown-up can read and clear one mailbox or every mailbox, or turn off “Let kids type their own letters” so new letters can only use the same preset phrases as chat bubbles. That letters switch follows free typing until a grown-up sets it on its own.
No emails, real names, or analytics. Offline single-player keeps working at any time.

Server code: `server/core.ts` (platform-agnostic) with two adapters:
- `server/node.ts`: any Node host, JSON files on disk. `npm run server` (port 8787). Used automatically on localhost.
- `server/worker.ts` + `wrangler.toml`: **Cloudflare Workers + Durable Objects (free plan)**, one Durable Object per street.

### Live server
Deployed at **https://cozy-hood.andrewmunruh.workers.dev** (Cloudflare Workers + Durable Objects, free plan).
`.env.production` points production builds at it, so `npm run deploy` ships a client that talks to it.
Redeploy the server with `CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ACCOUNT_ID=… npm run worker:deploy`.
For local multiplayer testing, open the preview with `?hood=http://localhost:8787` (Node) or `?hood=http://localhost:8788` (Worker).

### Sign-in and invite codes
- Grown-up screen → *Kids' names*: add first names (one-tap suggestions). Kids joining pick their name; one iPad per name,
  remembered on that iPad (no password/email). *Reset* signs a name out so she can sign in on another iPad and keep her house.
  With no names on the list, kids pick a preset nickname instead.
- Grown-up screen → *Invite code*: set a memorable code (4–16 letters/numbers, not case-sensitive, unique across streets),
  e.g. a word plus a number. Changing it never disconnects anyone (devices use the street's permanent id).
- Code lookups are throttled per IP (20 per 10 min, at most 8 wrong codes per 10 min). A stranger with the code still
  can only pick an unclaimed name from the list.

## Park and pets
- **Park**: tree button (or the PARK gate at the end of the street). Wide pannable scene with swings, slide, pond,
  picnic blanket, benches and a fenced dog area. In a neighborhood everyone in the park sees each other live and
  proximity chat works; in solo play it's just her. Tap a swing/bench/blanket to sit (tap again to hop off), tap the
  slide, splash the pond, throw the ball in the dog area for fetch.
- **Cat** (paw button > Cat): 4 coats, preset or typed name (filtered). Lives in her house (part of the house state,
  only the owner can change it, the server checks), wanders and naps on a clock-based schedule so every iPad shows the
  same thing. Tap for purr hearts. "Here, kitty!" calls her to the current room.
- **Dog** (paw button > Dog): 5 breeds + name. Heels behind her character in the house, on the street, in friends'
  houses and the park; tap for tricks (sit, spin, bark), seen by everyone nearby.
- Old cached apps (protocol v1) never receive pet actions or effects; new fields are optional, so old saves load as-is.

## Rainbow Ranch

A big, pannable ranch past the park. Walk through the rainbow-arch gate at the end of the street, or tap the rainbow button in the top bar. It works in solo play too.

- **Petting zoo:** goat, sheep, piglet, chicks, bunny and cow. Tap one to get a sound, a bubble and hearts. Drag a carrot, apple or hay from the buckets onto an animal and it munches. Friends see it live.
- **Props:** tap the tractor to honk, tap the apple tree to drop apples (fallen apples work as food), plus a pond, a barn with rainbow trim, hay bales, the sun and clouds.
- **Hen house:** tap it to collect eggs into your own basket (up to 20).
- **Horses:** Chestnut, Snowy, Midnight, Sunny and the Rainbow Pony. Tap one to ride it; riding is faster. Hop off with the button in the top bar. Only one rider per horse ("Someone is riding!"), and horses stay at the ranch.
- **Garden:** 6 shared plots. Plant carrot or flower seeds, water them, and about 80 seconds later pick carrots or bouquets. Carrots can feed horses and animals.
- **Basket:** eggs, carrots and bouquets go in your basket. At home, tap the basket chip to put one in the room as a real holdable item.

The server checks everything: you have to be at the ranch, one rider per horse, an egg cooldown, the basket limit, ripe plots, and taking items only into your own house. The garden uses server time, so it grows the same on every iPad. Ranch messages only go to new clients (protocol 3). Older clients keep working and simply don't see the ranch.

## What's new popup
`src/whatsnew.ts` holds `CHANGELOG`. To announce an update, add an entry at the top with the next `v` (2 = park +
pets) and 2-3 short lines with art. Each device shows unseen entries once (`localStorage['cozy-whatsnew']`). A
brand-new device (no saved house) gets the short welcome instead.

### Tests

`npm run test:ranch -- <url>` runs a multi-client ranch test: solo play, 3 iPads and an old v2 socket. It takes about 2 minutes because it waits for the garden to grow. `npm run test:whatsnew -- <url>` checks the popup.
`npm run test:pets` (park/pets, 34 checks, 3 iPads + an old-app socket), `python whatsnew_test.py` (popup), and:
`npm run server` (or `npm run worker:dev`), `npx vite preview`, then `npm run test:hood` (3 simulated iPads,
25 checks; add `'http://localhost:4173/kids-house-game/?hood=http://localhost:8788'` to target the Worker),
`PORT=8788 node server/smoke.mjs` for the raw protocol, `npm run test:eggs`, and `npm run test:phone` (phone viewports only; iPad sizes must not pick up the phone layout).
