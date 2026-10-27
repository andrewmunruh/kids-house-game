# Polish batch 4 — STATUS (Track D)
Branch cursor/polish-b4, PR #47. Base main 10ef736. No deploy done.

## In
- G1: Play/Decorate + All rooms moved into the dock at >=900px on iPad (no longer scroll away in .drawerTop)
- Phone portrait Play stage bigger (377 -> 479px at 390x844)
- Left-edge fade on the room-chip bar when scrolled (iPad and phone)
- Mailbox tap pad works (mapMail z-index above house)
- Welcome copy: "Adopt a pet from the Menu ☰!" (fits 667x280)
- Menu heading "This iPad" -> "Settings"; sky row labels and layout match the other rows
- polish4_test.py (10 checks)

## Out (not safe)
- iPad portrait sofa crop: fixed V1_OFFSET camera; changing it affects stage tests and saved cameras
- Clubhouse left-edge object: snapping scroll would cut the Slay table chair
- hood.ts "temporary" wording: none exists on 10ef736

## Gate (all green)
| Suite | Result |
|---|---|
| tsc | ok |
| tests/*.ts | all pass |
| migration vs 10ef736 | 43/43 |
| hood | 43/43 |
| gameroom | 69/69 |
| pets | 46/46 |
| ranch | 41/41 |
| map | 40/40 |
| ambient_sync | 12/12 |
| b0_compat | 14/14 |
| phone_test | 357/357 |
| stage_size (vs 10ef736) | ok |
| polish_test | 7/7 |
| polish4_test | 10/10 |
| Before/after screenshots | 820x1180, 1180x820, 390x844, 844x390 in /workspace/t-polish4-mig/shots/ |
