# Cozy House (v1)
A private, touch-first 2D dollhouse game for kids. Original art (no third-party characters). Single-player v1; architected for multiplayer later.

- `npm run dev` / `npm run build` (Vite + TypeScript, plain DOM + inline SVG)
- State: `src/state.ts` — serializable JSON `GameState`, pure `reduce(state, action)`, auto-save to localStorage.
- Art: `src/items.ts` (32 SVG items), `src/character.ts`, plus image packs from `assets/items/` (see `assets/items/README.md`).
- Rooms are 2400×600 world units (2.4× the 1000-wide view). Pan by swiping empty wall/floor, two-finger drag, the ‹ › buttons, the minimap, or trackpad/wheel. Dragging near an edge auto-scrolls.
- Saves: v1 saves (`cozy-house-v1`) are migrated to v2 (`cozy-house`) by re-centring positions (+700).
- Deploy: `npm run deploy` builds and force-pushes `dist/` to the `gh-pages` branch.
- No accounts, no chat, no analytics, no network calls beyond loading the app.
