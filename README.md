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
No emails, real names, or analytics. Offline single-player keeps working at any time.

Server code: `server/core.ts` (platform-agnostic) with two adapters:
- `server/node.ts`: any Node host, JSON files on disk. `npm run server` (port 8787). Used automatically on localhost.
- `server/worker.ts` + `wrangler.toml`: **Cloudflare Workers + Durable Objects (free plan)**, one Durable Object per street.

### Going live (Cloudflare, free)
1. `npm run worker:login`: opens a Cloudflare login (Andy creates/uses a free Cloudflare account).
2. `npm run worker:deploy`: prints a URL like `https://cozy-hood.<your-subdomain>.workers.dev`.
3. Build the game against it: `VITE_HOOD_URL=https://cozy-hood.<sub>.workers.dev npm run deploy`.
(For a quick try without rebuilding, open the game with `?hood=https://cozy-hood.<sub>.workers.dev`.)

### Tests
`npm run server` (or `npm run worker:dev`), `npx vite preview`, then `npm run test:hood` (3 simulated iPads,
25 checks; add `'http://localhost:4173/kids-house-game/?hood=http://localhost:8788'` to target the Worker),
`PORT=8788 node server/smoke.mjs` for the raw protocol, and `npm run test:eggs`.
