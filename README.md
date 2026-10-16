# Cozy House (v1)
A private, touch-first 2D dollhouse game for kids. Original art (no third-party characters). Single-player v1; architected for multiplayer later.

- `npm run dev` / `npm run build` (Vite + TypeScript, plain DOM + inline SVG)
- State: `src/state.ts` — serializable JSON `GameState`, pure `reduce(state, action)`, auto-save to localStorage.
- Art: `src/items.ts` (32 SVG items), `src/character.ts`.
- No accounts, no chat, no analytics, no network calls beyond loading the app.
