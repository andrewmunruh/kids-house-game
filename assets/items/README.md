# Image item packs
Drop files at `assets/items/<room>/<slug>.png` (or `.svg` / `.webp`) and list them in `manifest.json`:

```json
[{ "slug": "pink-lamp", "name": "Pink Lamp", "room": "bedroom", "category": "furniture", "size": "medium" }]
```
- `room`: living | bedroom | kitchen | any (or a new room name, which gets its own drawer filter)
- `category`: furniture | decor | plants | food | pets (new names get their own drawer tab)
- `size`: small (80) | medium (150) | large (260) room units wide; images are fitted bottom-centre, transparent PNGs look best.
Read at build time (`src/packs.ts`); an empty, missing or invalid manifest just means no pack items. Rebuild + `npm run deploy` after adding.
