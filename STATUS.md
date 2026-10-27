# Track C (Halloween) status

Branch `cursor/halloween`, PR #42. Base: 10ef736.

## Done

- **Decor pack "Spooky Cute":** 11 painted pieces (no faces, plum outline, 3x, 3-16 KB each).
  - Code: `src/shared/catalog-halloween.ts`.
  - Seasonal switch: shows Oct 24 - Nov 2, plus the `HALLOWEEN_ON` constant.
  - Out of season it is hidden from the shelf only, so placed pieces keep rendering.
- **Trick-or-treat:**
  - Each neighbor's house gets a pumpkin knock button, and every knock gives +1 treat.
  - A candy bucket pill shows on the street. The count lives in localStorage `cozy-candy`, so the save stays v3.
  - The owner gets a toast, "X came trick-or-treating!", at most once per friend every 20s.
  - Protocol: join flag `halloween:1`; client→server `knock`; server→owner `knocked` (flag-gated); protocol stays 4. Nothing is stored on the server.
  - `?halloween=1` / `?halloween=0` override for previews.
- **Tests:**
  - `tests/halloween_art_check.py` (contract plus ±3% ink bounds)
  - `tests/halloween_season_test.ts`
  - `tests/trick_or_treat_test.ts` (24 checks)
  - `tests/trick_or_treat_sync_test.py`: 3-house street with a 10ef736 old client, 14/14

## Gate (all green, code at 5f767fd)

| Suite | Result |
|---|---|
| tsc | pass |
| tests/*.ts (incl. art catalog + Halloween art contract, season, trick_or_treat 24) | all pass (mail_persist node 4 / b0 1) |
| art_ingame_bounds living SKY=day | 11/11 within ±2% |
| art_ingame_bounds living SKY=night | 10/10; moon lantern is not measurable at night (lit) |
| migration vs 10ef736 | 43/43 |
| hood | 43/43 |
| gameroom | 69/69 |
| pets | 46/46 |
| ranch | 41/41 |
| map | 40/40 |
| phone | 357/357 |
| ambient_sync (10ef736 old client) | 12/12 |
| b0_compat | 14/14 |
| trick_or_treat_sync (3 houses, 10ef736 old client) | 14/14 |


Logs are in `work/g2-*.log` (gitignored). Shots are in `/tmp/hw-shots`.

## Slipped

- Bat garland and cobweb were dropped (thin strands did not survive the cutout).
- No What's New entry.
- Costumes belong to Track C2.
