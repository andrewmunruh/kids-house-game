# Per-coat painted saddle tops (Batch 10 ride-fit)

## Scan method
Each `assets/art/ranch/horse-{chestnut,snowy,midnight,sunny,rainbow}-saddle.webp` is **480×390** (= 3× the 160×130 mount viewBox), so `vb_y = px_y / 3`.

1. Convert to RGBA.
2. In band **x=180–300**, **y=90–250** (mid-back; SVG saddle ≈ x 64–96 → px 192–288):
   - non-rainbow: opaque **orange** saddle (`r≥170`, `50≤g≤130`, `b≤70`, `r−g≥60`, `r−b≥100`)
   - rainbow: opaque **lavender** (`120≤r≤200`, `100≤g≤180`, `180≤b≤255`, `b−g≥25`, `b−r≥10`)
3. Keep rows with ≥10 hits; take the **longest contiguous** run (gap ≤2).
4. **Top** = first row in that run with ≥14 hits.
5. `PAINTED_SADDLE_TOP[coat] = top_px / 3`.

Saddle centre x ≈ 78–80 for all coats (SVG ≈ 80) → `PAINTED_MOUNT_DX = [0,0,0,0,0]`.  
Mount left nudge still **negates when `savatar` is flipped** (`.mount` uses `scaleX(-1)`).

## Values
| coat | name | PAINTED_SADDLE_TOP | PAINTED_MOUNT_DX |
|---:|---|---:|---:|
| 0 | Chestnut | 46.3 | 0 |
| 1 | Snowy | 46.3 | 0 |
| 2 | Midnight | 48.7 | 0 |
| 3 | Sunny | 49.7 | 0 |
| 4 | Rainbow Pony | 53.0 | 0 |

Previous global `PAINTED_SADDLE_TOP=66` put the hem ~+11…+17 vb below the real saddle (sunk). Per-coat tops land hem delta ≈ **−2.37** vb (stroke half-widths); within the ±3 PASS band. Main SVG `data-top=43` shows the same −2.37 stroke offset.
