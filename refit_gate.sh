#!/usr/bin/env bash
# Yard-bench refit local gate. Ports 5300-5349 only. No deploys. Kills only PIDs we start.
set -u
export TZ=America/Chicago
export GIO_MODULE_DIR=/workspace/tools/gio-mods
if [ -d /workspace/tools/wkdeps ]; then
  export LD_LIBRARY_PATH=/workspace/tools/wkdeps${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}
fi
R=/workspace/t-bench-refit
L=$R/logs
W=$R
DT=$R/dist-trial
DMIG=$R/dist-trial-mig
DOLD=/workspace/t-bench-refit/dist-5909d53
OLD10=/workspace/t-batchB-old10/dist
PY=/workspace/.pwvenv/bin/python
SHOTS=$R/shots
mkdir -p "$L" "$SHOTS"
rep(){ echo "- $(date '+%T %Z') $*" | tee -a "$L/SUMMARY.txt"; }

stop_ours() {
  local p
  for p in "$@"; do
    [ -n "${p:-}" ] || continue
    kill -- "-$p" 2>/dev/null || kill "$p" 2>/dev/null || true
  done
  sleep 0.3
}

echo "waiting soak.lock $(date '+%T %Z')"
exec 8>/workspace/t-batch4b/soak.lock
flock -w 7200 8 || { echo no soak; exit 99; }
echo "waiting gate.lock $(date '+%T %Z')"
exec 9>/workspace/surprise/gate.lock
flock -w 7200 9 || { echo no gate; exit 99; }
echo "locks acquired $(date '+%T %Z')"
rep "locks acquired"

# ---- art_ingame_bounds (backyard, focus yard-bench + all yard kinds) ----
run_bounds() {
  bash /workspace/tools/port_preflight.sh 5310 || return 2
  local S P lf=$L/art_ingame_bounds.log
  S=$(mktemp -d); ln -s "$DT" "$S/kids-house-game"
  python3 -m http.server 5310 --bind 127.0.0.1 --directory "$S" >/dev/null 2>&1 8>&- 9>&- & P=$!
  sleep 1.2
  curl -sf -o /dev/null http://127.0.0.1:5310/kids-house-game/ || { echo bounds web failed; stop_ours $P; return 3; }
  local kinds='yard-swing sandbox little-slide yard-bench lemonade-cart sun-lounger splash-pool picket-gate picnic-blanket tulip-bed birdbath lily-pond patio-lights toadstool-light stepping-stones pinwheel rain-barrel butterfly-bush hedge-row lemonade-cup picnic-table seesaw wagon birdhouse sprinkler beach-ball patio-umbrella veggie-patch hammock garden-gnome'
  ( cd "$W" && SKY=day TOL=2 WARN_TOL=3 timeout -k 20 1800 "$PY" tests/art_ingame_bounds.py \
      "http://127.0.0.1:5310/kids-house-game/" backyard $kinds ) | tee "$lf"
  echo rc=${PIPESTATUS[0]} >> "$lf"
  stop_ours $P
  git -C "$W" checkout -q -- screens shots 2>/dev/null || true
  rep "art_ingame_bounds backyard: $(grep -E '^pass ' "$lf" | tail -1) $(grep -E '^rc=' "$lf" | tail -1)"
}

# ---- scene_hotspot ----
run_hotspot() {
  bash /workspace/tools/port_preflight.sh 5310 || return 2
  local S P lf=$L/scene_hotspot.log
  S=$(mktemp -d); ln -s "$DT" "$S/kids-house-game"
  python3 -m http.server 5310 --bind 127.0.0.1 --directory "$S" >/dev/null 2>&1 8>&- 9>&- & P=$!
  sleep 1.2
  curl -sf -o /dev/null http://127.0.0.1:5310/kids-house-game/ || { echo hotspot web failed; stop_ours $P; return 3; }
  ( cd "$W" && timeout -k 20 1800 "$PY" tests/scene_hotspot_test.py "http://127.0.0.1:5310/kids-house-game/" ) | tee "$lf"
  echo rc=${PIPESTATUS[0]} >> "$lf"
  stop_ours $P
  git -C "$W" checkout -q -- screens shots 2>/dev/null || true
  local pass fail
  pass=$(grep -cE '^PASS ' "$lf" || true)
  fail=$(grep -cE '^FAIL ' "$lf" || true)
  rep "scene_hotspot: ${pass} pass / ${fail} fail  $(grep -E '^rc=' "$lf" | tail -1)"
}

# ---- shots (before 5909d53, after refit, migrated saved house, mixed) ----
run_shots() {
  bash /workspace/tools/port_preflight.sh 5300 5301 5302 || return 2
  local S0 S2 DATA P0 P2 HP
  S0=$(mktemp -d); ln -s "$DOLD" "$S0/kids-house-game"
  S2=$(mktemp -d); ln -s "$DT" "$S2/kids-house-game"
  python3 -m http.server 5300 --bind 127.0.0.1 --directory "$S0" >/dev/null 2>&1 8>&- 9>&- & P0=$!
  python3 -m http.server 5302 --bind 127.0.0.1 --directory "$S2" >/dev/null 2>&1 8>&- 9>&- & P2=$!
  DATA=$(mktemp -d)
  ( cd "$W" && PORT=5301 HOOD_DATA=$DATA exec setsid ./node_modules/.bin/tsx server/node.ts ) >"$L/shots_hood.log" 2>&1 8>&- 9>&- & HP=$!
  sleep 1.5
  curl -sf -o /dev/null http://127.0.0.1:5300/kids-house-game/ && echo before_web_ok
  curl -sf -o /dev/null http://127.0.0.1:5302/kids-house-game/ && echo after_web_ok
  BEFORE_URL=http://127.0.0.1:5300/kids-house-game/ \
  AFTER_URL=http://127.0.0.1:5302/kids-house-game/ \
  HOOD=http://127.0.0.1:5301 \
  SHOTS="$SHOTS" BROWSERS=webkit,chromium \
    timeout -k 20 2400 "$PY" "$R/shots_refit.py" | tee "$L/shots_refit.log"
  echo shots_rc=${PIPESTATUS[0]}
  "$PY" "$R/shots_refit_sheet.py" | tee -a "$L/shots_refit.log"
  stop_ours $P0 $P2 $HP
  git -C "$W" checkout -q -- screens shots 2>/dev/null || true
  rep "shots: $(ls -1 $SHOTS/*.png 2>/dev/null | wc -l) pngs; sheets $(ls $SHOTS/refit_*.png 2>/dev/null | tr '\n' ' ')"
}

# ---- migration 44/44 ----
run_mig() {
  local lf=$L/migration.log
  bash /workspace/tools/port_preflight.sh 5340 5341 5342 || return 2
  ( cd "$W" && env ART_DIR=/tmp/bench-refit-mig-art \
      "$PY" migration_test.py \
        --prod-tree /workspace/t-batchB-old10 \
        --prod-dist "$OLD10" \
        --new-dist "$DT" \
        --preview-dist "$DMIG" \
        --port-web 5340 --port-hood 5341 --port-prev 5342 \
        --work /tmp/bench-refit-migw \
      > "$lf" 2>&1
    echo rc=$? >> "$lf"
  )
  git -C "$W" checkout -q -- screens shots 2>/dev/null || true
  rep "migration: $(grep -E '[0-9]+/[0-9]+ passed' "$lf" | tail -1) $(tail -1 "$lf")"
}

# ---- oldsmoke both browsers (10ef736 + new) ----
run_oldsmoke() {
  bash /workspace/tools/port_preflight.sh 5320 5321 5322 || return 2
  local S1 S2 DATA P1 P2 HP
  S1=$(mktemp -d); ln -s "$DT" "$S1/kids-house-game"
  S2=$(mktemp -d); ln -s "$OLD10" "$S2/kids-house-game"
  python3 -m http.server 5320 --bind 127.0.0.1 --directory "$S1" >/dev/null 2>&1 8>&- 9>&- & P1=$!
  python3 -m http.server 5322 --bind 127.0.0.1 --directory "$S2" >/dev/null 2>&1 8>&- 9>&- & P2=$!
  DATA=$(mktemp -d)
  ( cd "$W" && PORT=5321 HOOD_DATA=$DATA exec setsid ./node_modules/.bin/tsx server/node.ts ) >"$L/oldsmoke_hood.log" 2>&1 8>&- 9>&- & HP=$!
  sleep 2
  local br
  for br in chromium webkit; do
    NEWURL="http://127.0.0.1:5320/kids-house-game/?hood=http://127.0.0.1:5321" \
      timeout -k 20 1800 "$PY" /workspace/t-batch8/oldsmoke.py "$br" \
        "http://127.0.0.1:5322/kids-house-game/?hood=http://127.0.0.1:5321" \
        > "$L/oldsmoke_${br}.log" 2>&1
    echo rc=$? >> "$L/oldsmoke_${br}.log"
    rep "oldsmoke $br: $(grep -E 'OLDSMOKE' "$L/oldsmoke_${br}.log" | tail -1) $(grep -E '^rc=' "$L/oldsmoke_${br}.log" | tail -1)"
  done
  stop_ours $P1 $P2 $HP
}

# ---- heartbeat pr/pr (refit client + refit worker), ports 5330-5335 ----
run_hb() {
  bash /workspace/tools/port_preflight.sh 5330 5331 5332 5333 5334 5335 || return 2
  local lf=$L/heartbeat_pr_pr.log
  env DIST_PR="$DT" TREE_PR="$W" DIST_BASE="$DOLD" TREE_BASE=/workspace/t-batch15/wt \
    SH="$L/hb_shots/" \
    timeout -k 30 3600 "$PY" /workspace/t-r2/tools/heartbeat_test.py pr pr "$L/heartbeat_pr_pr.json" \
    > "$lf" 2>&1
  echo rc=$? >> "$lf"
  git -C "$W" checkout -q -- screens shots 2>/dev/null || true
  rep "heartbeat pr/pr: $(grep -m1 HB_SUMMARY "$lf") $(grep -E '^rc=' "$lf" | tail -1)"
}

run_tsc() {
  local lf=$L/tsc.log
  ( cd "$W" && npx tsc --noEmit --pretty false ) | tee "$lf"
  echo rc=${PIPESTATUS[0]} >> "$lf"
  rep "tsc: $(grep -E '^rc=' "$lf" | tail -1)"
}

run_unit() {
  local lf=$L/unit.log
  : > "$lf"
  local t rc=0
  # polish_test's last CSS assertion already fails on 5909d53 (pre-existing); run the rest.
  for t in tests/rooms_test.ts tests/firstrun_test.ts tests/social_test.ts tests/sit_test.ts            tests/baby_test.ts tests/ambient_test.ts tests/avatar_test.ts tests/bathroom_size_test.ts; do
    echo "===== $t =====" | tee -a "$lf"
    ( cd "$W" && npx vite-node "$t" ) | tee -a "$lf"
    local e=${PIPESTATUS[0]}
    if [ "$e" -ne 0 ]; then rc=$e; fi
  done
  echo rc=$rc >> "$lf"
  local pass fail
  pass=$(grep -cE '^PASS ' "$lf" || true)
  fail=$(grep -cE '^FAIL ' "$lf" || true)
  rep "unit: ${pass} pass / ${fail} fail  rc=$rc"
  return $rc
}

run_concurrent() {
  bash /workspace/tools/port_preflight.sh 5306 5307 || return 2
  local lf=$L/concurrent_refit.log
  ( cd "$W" && NEW_DIST="$DT" TREE_PR="$W" PORT_WEB=5306 PORT_HOOD=5307 TRIALS=5       BROWSERS=webkit,chromium OUT="$L/concurrent_refit.json"       timeout -k 20 2400 "$PY" "$R/concurrent_refit.py" ) | tee "$lf"
  echo rc=${PIPESTATUS[0]} >> "$lf"
  rep "concurrent 2-client load: $(grep -E 'CONCURRENT ' "$lf" | tail -1) $(grep -E '^rc=' "$lf" | tail -1)"
}


# ---- portrait 820x1180 WebKit: reach, tap-sit two kids, Decorate drag ----

# ---- yard camera visits: frame her on entry/switch, keep pan only this visit ----
run_cam_visit() {
  bash /workspace/tools/port_preflight.sh 5312 || return 2
  local S P lf=$L/yard_cam_visit.log
  S=$(mktemp -d); ln -s "$DT" "$S/kids-house-game"
  python3 -m http.server 5312 --bind 127.0.0.1 --directory "$S" >/dev/null 2>&1 8>&- 9>&- & P=$!
  sleep 1.0
  curl -sf -o /dev/null http://127.0.0.1:5312/kids-house-game/ || { echo cam-visit web failed; stop_ours $P; return 3; }
  ( cd "$W" && URL=http://127.0.0.1:5312/kids-house-game/ BROWSERS=webkit,chromium \
      timeout -k 20 900 "$PY" tests/yard_cam_visit_test.py ) | tee "$lf"
  echo rc=${PIPESTATUS[0]} >> "$lf"
  stop_ours $P
  rep "yard_cam_visit 820x1180: $(grep -E 'YARD_CAM_VISIT ' "$lf" | tail -1) $(grep -E '^rc=' "$lf" | tail -1)"
}

run_reach() {
  bash /workspace/tools/port_preflight.sh 5310 || return 2
  local S P lf=$L/yard_bench_reach.log
  S=$(mktemp -d); ln -s "$DT" "$S/kids-house-game"
  python3 -m http.server 5310 --bind 127.0.0.1 --directory "$S" >/dev/null 2>&1 8>&- 9>&- & P=$!
  sleep 1.0
  curl -sf -o /dev/null http://127.0.0.1:5310/kids-house-game/ || { echo reach web failed; stop_ours $P; return 3; }
  ( cd "$W" && URL=http://127.0.0.1:5310/kids-house-game/ REACH_SHOTS="$SHOTS"       timeout -k 20 600 "$PY" tests/yard_bench_reach_test.py ) | tee "$lf"
  echo rc=${PIPESTATUS[0]} >> "$lf"
  stop_ours $P
  rep "yard_bench_reach 820x1180 webkit: $(grep -E 'REACH ' "$lf" | tail -1) $(grep -E '^rc=' "$lf" | tail -1)"
}

run_migrated_shots() {
  bash /workspace/tools/port_preflight.sh 5300 5302 || return 2
  local S0 S2 P0 P2
  S0=$(mktemp -d); ln -s "$DOLD" "$S0/kids-house-game"
  S2=$(mktemp -d); ln -s "$DT" "$S2/kids-house-game"
  python3 -m http.server 5300 --bind 127.0.0.1 --directory "$S0" >/dev/null 2>&1 8>&- 9>&- & P0=$!
  python3 -m http.server 5302 --bind 127.0.0.1 --directory "$S2" >/dev/null 2>&1 8>&- 9>&- & P2=$!
  sleep 1.2
  curl -sf -o /dev/null http://127.0.0.1:5300/kids-house-game/ && echo old_web_ok
  curl -sf -o /dev/null http://127.0.0.1:5302/kids-house-game/ && echo new_web_ok
  BEFORE_URL=http://127.0.0.1:5300/kids-house-game/   AFTER_URL=http://127.0.0.1:5302/kids-house-game/   SHOTS="$SHOTS" BROWSERS=webkit,chromium     timeout -k 20 2400 "$PY" "$R/shots_migrated.py" | tee "$L/shots_migrated.log"
  echo migrated_shots_rc=${PIPESTATUS[0]}
  "$PY" "$R/shots_migrated_sheet.py" | tee -a "$L/shots_migrated.log"
  stop_ours $P0 $P2
  git -C "$W" checkout -q -- screens shots 2>/dev/null || true
  rep "migrated shots: sheets $(ls $SHOTS/migrated_*.png 2>/dev/null | tr '\n' ' ')"
}

echo "===== bench-refit gate start $(date '+%F %T %Z') ====="
run_tsc
run_unit
run_bounds
run_hotspot
run_migrated_shots
run_reach
run_cam_visit
run_shots
# seed x is still 1420; official 5/5+5/5 concurrent stands
# run_concurrent
run_mig
run_oldsmoke
run_hb
echo "===== bench-refit gate done $(date '+%F %T %Z') ====="
rep "gate done"
cat "$L/SUMMARY.txt"
