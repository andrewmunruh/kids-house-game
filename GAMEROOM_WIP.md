# Game Room + "Slay" — WORK IN PROGRESS (branch `preview-gameroom`, NOT shipped)

Handed off mid-build on 2026-10-17. The map + barn is live in production (main @ 1b33280); this branch = main + the work below.

## Done (tested)
- **Plug-in rules interface** `src/shared/games/types.ts` (`GameRules`: setup, cleanMove, legal, apply, turn, winner,
  view (per-player, hides other hands), autoMove (for an away player), removePlayer (leave mid-game)). Pure TS, runs on server + tests.
- **Slay** rules `src/shared/games/slay.ts`: original Uno-style game. 108 cards: 4 colors (0 pink, 1 lilac, 2 aqua, 3 gold),
  0-9, skip ("Nope"), rev ("Flip"), d2 (+2), wild ("Crown"), w4 (Crown +4). 7-card hands; you may play only the card you just
  drew (or pass); an unplayable drawn card passes automatically; "SLAY!" call with <=2 cards; forgetting it = draw 2 when the
  next player moves; a stalemate (all cards in hands, nobody can play) gives the win to the fewest cards; MAX_HAND 30.
- **Four in a Row** rules `src/shared/games/four.ts` (7x6, 2 players, win line + draw) — proves the plug-in system.
- **Catalog + tables** `src/shared/games/index.ts`: GAMES, TABLES (slay 6 seats @x720, four 2 seats @x1500, slay 4 seats @x2150),
  GAMEROOM_W=2600, TablePub, TableOp + cleanTableOp, NUDGE_MS=20s.
- **Protocol 4** (`src/shared/hood.ts`): presence `where:'gameroom'`; client msg `{t:'tbl', op:'sit'|'leave'|'start'|'move'|'nudge', tb, seat?, m?}`;
  server msgs `{t:'table', table}` (personalized), `{t:'tblFail', tb, reason}`; welcome has `tables` for v>=4 clients only.
- **Server** (`server/core.ts`): table manager — must be in the Game Room to sit; one table at a time; first seated = host
  (passes on when she leaves); host starts with min..max seated; moves validated by rules; hidden hand sent only to its owner
  (watchers get counts); seats kept by player id -> reconnect returns her seat + cards; walking out of the Game Room frees a
  lobby seat but keeps a mid-game seat; away (offline / out of the room) >= 20s on her turn -> any seated friend can `nudge`
  (server plays autoMove); leaving mid-game -> removePlayer (her cards go back in the deck) or game over if 1 left (she wins);
  parent "remove kid" drops her seats; tables persisted in KV key `tables` (survive DO restart).
- **Tests**: `npx tsx tests/rules_sim.ts` (600 random Slay games for 2-6 players: card conservation, no hidden info in watcher
  view, removePlayer; 500 Four games) and `npx tsx tests/tables_test.ts` (19 protocol checks with the real Neighborhood class +
  fake sockets: seats, host, hidden hands, reconnect mid-game, out-of-turn refused, nudge, leave, Four, persistence).

## Not started (remaining work)
1. **Client net** (`src/net.ts`): store `tables` from welcome/`table`, emit 'table'/'tblFail', `tbl(op)` sender.
2. **Map spot**: a glam clubhouse mini on the map at about {x:430,y:262} (free space inside the S-curve); add it to
   `baseTaken()` (re-check `__mapLayout` 1..12), faces anchor, `placeOf` for 'gameroom', go-to-friend.
3. **Game Room scene** (`#gameroom`, like `#park`): Andy's style = glam clubhouse: fairy lights, beanbags, neon heart sign,
   pastel-to-hot-pink/lilac/aqua/gold gradients, sparkles. Tables at TABLES[i].x with chairs; seated kids drawn at their chair
   (visible to all); tap empty chair = sit; tap table = watch; walk by tap/drag (reuse attachParkDrag pattern).
4. **Table overlay + per-game UI plug-ins** (`src/games/*-ui.ts`): lobby (seats, Start for host when 2+, "waiting for host"),
   play, over (winner). Buttons: "Back to room" (keep seat), "Leave table". "Play for her" button when `away >= 20s`.
5. **Slay UI** per Andy: name "Slay", girly preteen glam (age 8-10, nothing mature); card icons: Crown = wild, heart-eyes /
   lipstick-kiss style = +2, hair-flip/sparkle swirl = reverse, sunglasses / hand-wave "nope" = skip; rounded bubbly font;
   big "SLAY!" button (instead of "Last card!"); glam table felt; animated card play (ev.n changes -> fly card from player
   to pile); whose-turn highlight; color picker for Crown; winner celebration "You slayed!" + confetti (`confetti()` in src/eggs.ts).
   Large touch targets for iPad (1024x768).
6. **Four in a Row UI** (pink hearts vs aqua stars).
7. **What's New** v5 entry for the Game Room (src/whatsnew.ts; migration test reads the latest version automatically).
8. **Solo mode** decision: tables need 2+ kids; show "Play with friends on your street" (or add bots later).
9. **Playwright**: 3 kids play a full Slay round to completion (drive via UI; can read `view` for legal moves), verify a kid's
   DOM never shows others' cards, reconnect mid-game (close/reopen context), Four in a Row game; rerun all suites + migration.
10. Deploy to preview: `./deploy-preview.sh` + preview Worker (`--env preview`). Protocol 4 must reach production Worker
    BEFORE a protocol-4 site ships (Worker first, then Pages).
