# Track E status: gate complete, review fixes done
Review fixes (App Builder), done:
1. Pale strip inside the frame. Cause: the corner clip radius used the on-screen scale (1.21x) instead of the canvas's own scale (2x), so the page behind the stage's rounded corners showed through. Fixed: the clip uses the stage's own px times the render scale. A diagonal corner check in the test confirms it.
2. Cropped dolls. These were test positions: feet at y 585-640, but the room floor ends at 600 and new dolls spawn at 520-560. The capture was not cutting anything; the photo matches the screen.
   - Now 4 dolls stand in the usual band, plus a doll at the right/bottom edge of the visible play area (feet at 588). All are wholly on screen and in the photo at 820x1180, 844x390 and 390x844.
   - App note, not a capture issue: a doll dragged to the very last floor row (feet at 598-600) loses about 7px of feet on screen too.
3. Added a 390x844 portrait shot. Also added a camera-button menu shot and the saved file for each size (saved == preview image, byte-identical).

Results:
- tsc OK. tests/*.ts all pass except art_raster's 2 FAILs, which base 10ef736 fails the same way.
- party_test 6/6. party_shots PASS (reduced motion: 0 running animations).
- photobooth PASS: flush, edge doll in frame, photo-vs-screen diff 3.4 still / 7-19 while the party moves, download fallback, no network.
- Earlier full gate on fe0281e all PASS. This change only touches src/photobooth.ts and test files.

Shots: /workspace/t-party-shots/ — {screen,photo,card,menu,saved}-{820x1180[-party],844x390-party,390x844-party}.png, party-*.png
