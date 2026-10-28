# cursor/arm-layers STATUS
Bug: arms draw behind clothes (builder + Play/Decorate/Photo Booth, all share chibiSVG in src/avatar/draw.ts).
- [x] clone, branch from 18ee50c, npm ci
- [x] before sheet: /workspace/t-armlayer-shots/before_sheet_{webkit,chromium}.png (35 items x 7 poses)
- [x] fix at source: src/avatar/draw.ts arms layer over clothes, sleeves nested in arm groups (one fix for builder, Play, Decorate, Photo Booth)
- [x] tests/arm_layer_test.ts (fails 2450 on base, passes after)
- [x] after sheets /workspace/t-armlayer-shots/after_sheet_*.png
- [x] in-app before/after (builder items, Play+Decorate poses, Photo Booth) x 4 sizes x WebKit+Chromium in /workspace/t-armlayer-shots/{before,after}_inapp
- [ ] gate
