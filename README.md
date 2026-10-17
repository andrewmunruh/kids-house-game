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
