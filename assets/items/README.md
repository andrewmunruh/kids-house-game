# Image item packs
Read at build time by `src/packs.ts` from two manifests (both optional; missing/empty/invalid = no extra content):

- `assets/items/manifest.json`: items. Fields: `slug`, `name`, `category` (furniture | decor | plants | food | pets; other values are mapped, unknown -> decor),
  `room` (living | bedroom | kitchen | salon; omitted = shows under every room filter), optional `pack` (gets its own drawer tab), `holdable`,
  `wall: true` (snaps to the wall area), `gameW` + `widthUnits`/`heightUnits` (size + aspect; falls back to `size` small/medium/large),
  `svg`/`png` paths relative to `assets/items/` (SVG preferred). `tag`, `gameCategory`, `designW`, `viewBox`, `pngPx` are informational.
- `assets/patterns/manifest.json`: `{ type: 'wallpaper' | 'floor', slug, name, pack, svg?, png? }`, files in `assets/patterns/<pack>/`.

Files whose names start with `_` (contact sheets) are ignored. Rebuild + `npm run deploy` after changes.
