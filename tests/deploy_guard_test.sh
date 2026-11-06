#!/usr/bin/env bash
# tests/deploy_guard_test.sh: guard tests for scripts/guarded-deploy.sh.
# Runs ONLY against throwaway local bare repos in a temp dir and a 127.0.0.1 http server (GUARD_TEST_MODE=1 refuses
# any non-local remote or URL). Never touches the real GitHub remotes or a Worker.
# GUARD_SCRIPT=<path> runs the same cases against another copy of the script (used by deploy_guard_mutation_test.sh).
set -uo pipefail
REPO=$(cd "$(dirname "$0")/.." && pwd)
SCRIPT=${GUARD_SCRIPT:-$REPO/scripts/guarded-deploy.sh}
T=$(mktemp -d /tmp/deploy-guard-test.XXXXXX)
HTTP_PID=
trap '[ -n "$HTTP_PID" ] && kill "$HTTP_PID" 2>/dev/null; rm -rf "$T"' EXIT
PASS=0 FAIL=0
ok()  { echo "PASS $1"; PASS=$((PASS+1)); }
bad() { echo "FAIL $1"; echo "----- output:"; sed 's/^/  | /' "$T/out" | tail -25; FAIL=$((FAIL+1)); }
G() { git -c user.name=t -c user.email=t@t -c init.defaultBranch=main "$@"; }
unset $(compgen -e | grep '^VITE_') 2>/dev/null || true

# --- fake build: behaves like vite here (VITE_BASE default /kids-house-game/, VITE_HOOD_URL and VITE_STORE_PREFIX
# compiled in, the PREVIEW ribbon only when a prefix is set). FAKE_MODE breaks it on purpose.
cat > "$T/fakebuild.sh" <<'F'
set -e
b=${VITE_BASE:-/kids-house-game/}; p=${VITE_STORE_PREFIX:-}; hood=${VITE_HOOD_URL:-https://cozy-hood.andrewmunruh.workers.dev}
case "${FAKE_MODE:-}" in leak) b=/cozy-preview/; p=preview: ;; prefixonly) p=preview: ;; badbase) b=/elsewhere/ ;; wronghood) hood=https://cozy-hood-preview.andrewmunruh.workers.dev ;; nohood) hood=https://example.invalid ;; noribbon) ;; esac
h=$(git rev-parse --short HEAD); mkdir -p "$OUT/assets"
# like vite: NODE_ENV=development compiles the service-worker registration out; NODE_OPTIONS changes the output
[ -n "${NODE_OPTIONS:-}" ] && h=$h-nodeopts
{ cat app.txt; echo "const hood=\"$hood\";"
  [ "${NODE_ENV:-}" != development ] && [ "${FAKE_MODE:-}" != nosw ] && echo "navigator.serviceWorker.register(B+'sw.js');"
  [ -n "$p" ] && echo "const k=e=>\"$p\"+e;"
  [ -n "$p" ] && [ "${FAKE_MODE:-}" != noribbon ] && echo "x('<div class=\"previewRibbon\">PREVIEW</div>');"; true; } > "$OUT/assets/index-$h.js"
echo "body{color:red}" > "$OUT/assets/index-$h.css"
printf '<link rel="manifest" href="manifest.webmanifest" />\n<script type="module" crossorigin src="%sassets/index-%s.js"></script>\n<link rel="stylesheet" crossorigin href="%sassets/index-%s.css">\n' "$b" "$h" "$b" "$h" > "$OUT/index.html"
if [ "${FAKE_MODE:-}" = badmanifest ]; then echo '{ "name": "Something Else", "short_name": "X" }' > "$OUT/manifest.webmanifest"
else echo '{ "name": "Cozy House", "short_name": "Cozy House" }' > "$OUT/manifest.webmanifest"; fi
echo "sw $h" > "$OUT/sw.js"
F

# --- fixtures: app origin (bare), pages remotes (bare, non-fast-forward denied, push log, served over 127.0.0.1)
G init -q --bare "$T/origin.git"
G init -q "$T/seed"; cd "$T/seed"
mkdir -p server src/shared; echo w1 > server/worker.ts; echo s > src/shared/x.ts; echo a1 > app.txt; echo 'name="cozy-hood"' > wrangler.toml; echo '{}' > package.json; echo '{"packages":{"":{},"node_modules/a":{"version":"1.0.0","integrity":"sha-a"}}}' > package-lock.json
G add -A; G commit -qm base; BASE=$(git rev-parse HEAD)
echo a2 > app.txt; G commit -qam "app change"; MAIN=$(git rev-parse HEAD)
G push -q "$T/origin.git" HEAD:main
G checkout -qb side; echo side > app.txt; G commit -qam "unmerged work"; SIDE=$(git rev-parse HEAD); G push -q "$T/origin.git" side:side
G checkout -q main
newc() { G -C "$T/seed" checkout -q "$MAIN"; eval "$1"; G -C "$T/seed" commit -qam "$2"; git -C "$T/seed" rev-parse HEAD; }
WCHG=$(newc 'echo w2 > server/worker.ts' "worker change")
WTOML=$(newc 'echo "name=\"cozy-hood\"  # v2" > wrangler.toml' "wrangler change")
WPKG=$(newc 'echo "{\"a\":1}" > package.json' "package change")
MAIN3=$(newc 'echo a3 > app.txt' "app change 3")
G -C "$T/seed" checkout -q main
for c in $WCHG $WTOML $WPKG $MAIN3; do G -C "$T/seed" push -q "$T/origin.git" "$c:refs/heads/x-${c:0:7}"; done
mkdir -p "$T/www/api"; echo '{"ok":true}' > "$T/www/api/health"
mkpages() {  # $1 bare repo, $2 served dir name (= base without slashes), $3 seed commit message
  G init -q --bare "$1"; git -C "$1" config receive.denyNonFastForwards true
  cat > "$1/hooks/update" <<H
#!/bin/sh
echo "\$1 \$2 \$3" >> "$T/pushlog"
if [ "\$2" != 0000000000000000000000000000000000000000 ] && ! git merge-base --is-ancestor "\$2" "\$3"; then echo "hook: non-fast-forward refused"; exit 1; fi
H
  # post-receive publishes like GitHub Pages; with $T/race present it rewinds the ref (someone else moved gh-pages)
  cat > "$1/hooks/post-receive" <<H
#!/bin/sh
read old new ref
if [ -f "$T/race" ]; then git update-ref refs/heads/gh-pages "\$old"; exit 0; fi
mkdir -p "$T/www/$2"; git --work-tree="$T/www/$2" checkout -f gh-pages -- . 2>/dev/null
H
  chmod +x "$1/hooks/update" "$1/hooks/post-receive"
  rm -rf "$T/p0"; G init -q "$T/p0"; cd "$T/p0"; G checkout -qb gh-pages; mkdir assets
  echo "<script src=\"/$2/assets/index-OLD.js\"></script>" > index.html; echo old > assets/index-OLD.js; echo sw0 > sw.js
  G add -A; G commit -qm "$3"; G push -q "$1" gh-pages
}
mkpages "$T/pages.git" kids-house-game "deploy Batch 1 (${BASE:0:7})"
mkpages "$T/ppages.git" cozy-preview "seed preview (no sha)"
: > "$T/pushlog"
PAGES0=$(git -C "$T/pages.git" rev-parse gh-pages)
PORT=$(python3 -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1])')
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$T/www" >/dev/null 2>&1 & HTTP_PID=$!
for i in $(seq 50); do curl -fs "http://127.0.0.1:$PORT/api/health" >/dev/null && break; sleep 0.1; done
G clone -q "$T/origin.git" "$T/work" 2>/dev/null; cd "$T/work"
mkdir -p "$T/nm"; echo '{"packages":{"node_modules/a":{"version":"1.0.0","integrity":"sha-a"}}}' > "$T/nm/.package-lock.json"
export GUARD_TEST_MODE=1 GUARD_PAGES_REMOTE="$T/pages.git" GUARD_NODE_MODULES="$T/nm" DEPLOY_HISTORY="$T/history.log"
export GUARD_BUILD_CMD="bash $T/fakebuild.sh" GUARD_SITE="http://127.0.0.1:$PORT/kids-house-game/" GUARD_HEALTH_URL="http://127.0.0.1:$PORT/api/health" GUARD_VERIFY_TRIES=5
PSITE="http://127.0.0.1:$PORT/cozy-preview/"
mkdist() {  # $1 sha, $2 out dir, rest: env for the build (as the gate would have built it)
  local s=$1 o=$2; shift 2; rm -rf "$o" "$T/wt"; mkdir -p "$o"
  git -C "$T/work" fetch -q origin "$s" 2>/dev/null; git -C "$T/work" worktree add -q --detach "$T/wt" "$s"
  ( cd "$T/wt" && env "$@" OUT="$o" bash "$T/fakebuild.sh" ); git -C "$T/work" worktree remove --force "$T/wt"
}
mkdist "$MAIN" "$T/gd-main" VITE_BASE=/kids-house-game/
AP="$T/approvals.log"
approve() { echo "2026-11-02T13:08:00-06:00 | $1 | $2 | $3 | Andy | ref=$4 | \"$5\"" >> "$AP"; }   # target action sha ref words
run() { "$SCRIPT" --approvals "$AP" "$@" > "$T/out" 2>&1; echo $? > "$T/rc"; }
runp() { GUARD_PAGES_REMOTE="$T/ppages.git" GUARD_SITE="$PSITE" run --preview "$@"; }
P() { echo --expect-dist "$T/gd-main" --worker-version v-test-1 --approval-ref card-42; }
rc() { cat "$T/rc"; }
has() { grep -q -- "$1" "$T/out"; }
refused() { [ "$(rc)" = 3 ] && has "$1"; }
tip() { git -C "$T/pages.git" rev-parse gh-pages; }
nopush() { [ "$(tip)" = "$1" ] && [ ! -s "$T/pushlog" ]; }

# 1. dirty tree refused
approve production deploy "$MAIN" card-42 "yes deploy it"
echo junk > untracked.txt
run --production --sha "$MAIN" $(P)
refused "REFUSED: working tree is dirty" && nopush "$PAGES0" && ok "dirty tree (untracked file) refused, nothing pushed" || bad "dirty tree"
rm untracked.txt; echo x >> app.txt
run --production --sha "$MAIN" $(P) --dry-run
refused "REFUSED: working tree is dirty" && nopush "$PAGES0" && ok "dirty tree (modified file) refused even in --dry-run" || bad "dirty tree modified"
git checkout -q app.txt

# 2. non-main SHA refused
approve production deploy "$SIDE" card-42 "yes"
run --production --sha "$SIDE" $(P)
refused "is not reachable from origin/main" && nopush "$PAGES0" && ok "non-main (unmerged branch) SHA refused for production" || bad "non-main SHA"
run --production --sha "${MAIN:0:7}" $(P)
refused "full 40-hex" && ok "short SHA refused" || bad "short SHA"
approve preview deploy "$SIDE" pv-1 "yes preview"
runp --sha "$SIDE" --approval-ref pv-1 --worker-changed-ok
refused "pass --pr N" && nopush "$PAGES0" && ok "non-main SHA refused for preview without --pr" || bad "preview non-main"
runp --sha "$SIDE" --pr 7 --approval-ref pv-1 --worker-changed-ok
refused "could not fetch PR #7" && ok "preview --pr refused when that PR head does not exist" || bad "preview pr missing"
git -C "$T/origin.git" update-ref refs/pull/7/head "$SIDE"
runp --sha "$SIDE" --pr 7 --approval-ref pv-1 --worker-changed-ok --dry-run
[ "$(rc)" = 0 ] && has "is the head of PR #7 (preview only)" && has "ribbon present" && nopush "$PAGES0" && ok "preview accepts the exact head of an explicit PR (dry run, preview target checks pass)" || bad "preview pr head"
runp --sha "$MAIN" --pr 7 --approval-ref pv-1 --worker-changed-ok
refused "no approval line for target=preview action=deploy sha=$MAIN" && ok "preview of main SHA still needs its own preview approval" || bad "preview approval"

# 3. approvals
rm -f "$AP"
run --production --sha "$MAIN" $(P)
refused "no approvals log" && nopush "$PAGES0" && ok "missing approvals log refused" || bad "missing log"
approve preview deploy "$MAIN" card-42 "preview yes"
run --production --sha "$MAIN" $(P)
refused "no approval line for target=production action=deploy sha=$MAIN" && nopush "$PAGES0" && ok "approval for the other target does not count" || bad "other target approval"
approve production deploy "$MAIN" card-42 ""
echo "2026-11-02T13:08:00-06:00 | production | deploy | $MAIN | Bob | ref=card-42 | \"ship\"" >> "$AP"
echo "yesterday | production | deploy | $MAIN | Andy | ref=card-42 | \"ship\"" >> "$AP"
echo "2026-11-02T13:08:00-06:00 | production | $MAIN | Andy | \"old format\"" >> "$AP"
run --production --sha "$MAIN" $(P)
refused "no approval line" && nopush "$PAGES0" && ok "approval with empty words / not Andy / no ISO time / old format refused" || bad "malformed approvals"
approve production deploy "$BASE" card-42 "ship the old one"
run --production --sha "$MAIN" $(P)
refused "no approval line" && ok "approval for a different SHA does not count" || bad "other sha approval"
approve production rollback "$MAIN" card-42 "roll"
run --production --sha "$MAIN" $(P)
refused "no approval line" && ok "a rollback approval does not approve a deploy" || bad "rollback approval for deploy"
approve production deploy "$MAIN" card-41 "yes, deploy $MAIN to production"
run --production --sha "$MAIN" $(P)
refused "ref=card-42" && ok "approval with a different ref tag does not count" || bad "other ref"
run --production --sha "$MAIN" --expect-dist "$T/gd-main" --worker-version v1
refused "--approval-ref <card id or short tag> is required" && ok "deploy without --approval-ref refused" || bad "no ref"
run --production $(P)
refused "full 40-hex" && ok "missing --sha argument refused" || bad "missing sha"
approve production deploy "$MAIN" card-42 "yes, deploy $MAIN to production"

# 4. production-only requirements
run --production --sha "$MAIN" --worker-version v1 --approval-ref card-42 --dry-run
refused "production needs --expect-dist" && ok "production without --expect-dist refused" || bad "expect-dist mandatory"
run --production --sha "$MAIN" --expect-dist "$T/gd-main" --approval-ref card-42 --dry-run
refused "production needs --worker-version" && ok "production without --worker-version refused" || bad "worker-version mandatory"
GUARD_HEALTH_URL="http://127.0.0.1:$PORT/api/nope" run --production --sha "$MAIN" $(P) --dry-run
refused "health check" && ok "Worker health probe failing refused" || bad "health"

# 5. dry run does everything except push
run --production --sha "$MAIN" $(P) --dry-run
[ "$(rc)" = 0 ] && has "DRY RUN complete" && has "previous gh-pages: $PAGES0" \
  && has "ROLLBACK (one line): .* --production --rollback-to $PAGES0 --expect-tip " \
  && has "byte-identical rebuild: OK" && has "unchanged: the live cozy-hood Worker" && has "live Worker: cozy-hood version=v-test-1 health={\"ok\":true}" \
  && has "base /kids-house-game/, .*ribbon absent" && nopush "$PAGES0" \
  && ok "dry run passes all checks, records the Worker, prints prev SHA + rollback, pushes nothing" || bad "dry run"

# 6. leftover build env (R2) and target checks
( export VITE_STORE_PREFIX=preview: VITE_BASE=/cozy-preview/ VITE_HOOD_URL=https://cozy-hood-preview.andrewmunruh.workers.dev VITE_EXTRA=1
  run --production --sha "$MAIN" $(P) --dry-run )
[ "$(rc)" = 0 ] && has "ignoring caller's VITE_" && has "byte-identical to the gate-tested dist" && ok "leftover VITE_* preview env is dropped: production build is still the gate-tested one" || bad "env leak cleared"
mkdist "$MAIN" "$T/gd-leak" FAKE_MODE=leak
FAKE_MODE=leak run --production --sha "$MAIN" $(P) --expect-dist "$T/gd-leak" --dry-run
refused "asset base is not /kids-house-game/" && ok "production build loading assets from /cozy-preview/ refused" || bad "base check"
mkdist "$MAIN" "$T/gd-pfx" FAKE_MODE=prefixonly
FAKE_MODE=prefixonly run --production --sha "$MAIN" $(P) --expect-dist "$T/gd-pfx" --dry-run
refused "production build contains the 'preview:' store prefix" && ok "production build with the preview store prefix refused" || bad "prefix check"
for mode in wronghood:"contains 'cozy-hood-preview'" nohood:"does not point at https://cozy-hood.andrewmunruh.workers.dev"; do
  md=${mode%%:*} msg=${mode#*:}; msg=${msg//\"/}; mkdist "$MAIN" "$T/gd-$md" FAKE_MODE=$md
  FAKE_MODE=$md run --production --sha "$MAIN" $(P) --expect-dist "$T/gd-$md" --dry-run
  refused "$msg" && ok "production build with the wrong hood ($md) refused" || bad "hood check $md"
done
approve preview deploy "$MAIN" pv-2 "preview main"
FAKE_MODE=noribbon runp --sha "$MAIN" --approval-ref pv-2 --worker-changed-ok --dry-run
refused "preview build has no PREVIEW ribbon" && ok "preview build without the PREVIEW ribbon refused" || bad "ribbon check"
FAKE_MODE=badmanifest runp --sha "$MAIN" --approval-ref pv-2 --worker-changed-ok --dry-run
refused "manifest name is not 'Cozy Preview'" && ok "preview build with the wrong manifest name refused" || bad "manifest check"
FAKE_MODE=badbase runp --sha "$MAIN" --approval-ref pv-2 --worker-changed-ok --dry-run
refused "asset base is not /cozy-preview/" && ok "preview build with the wrong asset base refused" || bad "preview base check"
runp --sha "$MAIN" --approval-ref pv-2 --dry-run
refused "cannot tell which app SHA is live on preview" && ok "unknown live build refused without --worker-changed-ok" || bad "unknown live"
runp --sha "$MAIN" --approval-ref pv-2 --worker-changed-ok --dry-run
[ "$(rc)" = 0 ] && has "prefix 'preview:', ribbon present" && ok "unknown live build allowed with --worker-changed-ok; preview prefix + ribbon present" || bad "unknown live ok"

# 7. other refusals
run --production --sha "$MAIN" $(P) --force
refused "no force option" && ok "--force refused" || bad "--force"
run --sha "$MAIN"
refused "there is no default" && ok "no target refused" || bad "no target"
run --production --preview --sha "$MAIN"
refused "exactly one of" && ok "both targets refused" || bad "both targets"
GUARD_PAGES_REMOTE=https://github.com/andrewmunruh/kids-house-game.git run --production --sha "$MAIN" $(P) --dry-run
refused "needs local absolute paths" && ok "test mode refuses a real (URL) remote" || bad "test mode url"
GUARD_SITE=https://andrewmunruh.github.io/kids-house-game/ run --production --sha "$MAIN" $(P) --dry-run
refused "must be http://127.0.0.1" && ok "test mode refuses a real site URL" || bad "test mode site"
GUARD_TEST_MODE=0 DEPLOY_HISTORY= run --production --sha "$MAIN" $(P) --dry-run
refused "GUARD_BUILD_CMD is only allowed in test mode" && ok "GUARD_BUILD_CMD refused outside test mode" || bad "build cmd outside test"
GUARD_PAGES_REMOTE="$T/ppages.git" run --production --sha "$MAIN" $(P) --dry-run
refused "does not load assets from /kids-house-game/" && ok "production pointed at a preview pages repo refused (content cross-check)" || bad "repo cross-check"
for c in "$WCHG:server/worker.ts" "$WTOML:wrangler.toml" "$WPKG:package.json"; do
  s=${c%%:*} f=${c#*:}; G -C "$T/seed" push -q -f "$T/origin.git" "$s:main"   # fixture origin only (local temp repo)
  approve production deploy "$s" card-42 "yes"
  run --production --sha "$s" $(P) --dry-run
  refused "Worker-side files changed since the live build: $f" && nopush "$PAGES0" && ok "Worker-side change ($f) since live build refused" || bad "worker change $f"
done
G -C "$T/seed" push -q -f "$T/origin.git" "$MAIN:main"   # restore the fixture origin's main (local temp repo only)
GUARD_BUILD_CMD='mkdir -p "$OUT"; echo $RANDOM > "$OUT/index.html"' run --production --sha "$MAIN" $(P) --dry-run
refused "build is not reproducible" && ok "non-reproducible build refused" || bad "reproducible"
mkdir -p "$T/gate-dist/assets"; echo nope > "$T/gate-dist/index.html"
run --production --sha "$MAIN" $(P) --dry-run --expect-dist "$T/gate-dist"
refused "differs from the gate-tested dist" && ok "build differing from the gate-tested dist refused" || bad "expect-dist"
run --production --sha "$MAIN" $(P) --expect-dist /nonexistent
refused "is not a dist directory" && [ "$(tip)" = "$PAGES0" ] && ok "--expect-dist that is not a dist dir refused" || bad "expect-dist missing"
for s in deploy.sh deploy-preview.sh; do
  bash "$REPO/$s" > "$T/out" 2>&1; r=$?
  [ $r = 3 ] && grep -q "is retired" "$T/out" && ok "old $s refuses to run" || bad "old $s"
done
run --production --smoke
refused "creates a real street" && ok "production smoke refused without --real-street-ok" || bad "prod smoke"

# 8. real push to the local bare remote: normal fast-forward, never forced, then the live check
: > "$T/pushlog"
run --production --sha "$MAIN" $(P)
NEW=$(tip)
[ "$(rc)" = 0 ] && has "DEPLOYED production" && [ "$(git -C "$T/pages.git" rev-parse "$NEW^")" = "$PAGES0" ] \
  && [ "$(wc -l < "$T/pushlog")" = 1 ] && grep -q "^refs/heads/gh-pages $PAGES0 $NEW$" "$T/pushlog" \
  && git -C "$T/pages.git" show "$NEW:version.json" | grep -q "\"sha\": \"$MAIN\"" && git -C "$T/pages.git" show "$NEW:.nojekyll" >/dev/null 2>&1 \
  && ok "deploy = one normal fast-forward push on top of the old tip (parent $PAGES0), version.json + .nojekyll" || bad "real push"
has "verify: /kids-house-game/assets/index-.*\.css 200 identical" && has "verify: manifest.webmanifest 200 identical" && has "verify: OK" \
  && ok "live check followed what index.html loads (bundle, CSS, manifest) and all matched" || bad "live verify"
MSG=$(git -C "$T/pages.git" log -1 --format=%B "$NEW")
echo "$MSG" | grep -q "Approval-Ref: card-42" && ! echo "$MSG" | grep -q "yes, deploy" && echo "$MSG" | grep -q "Worker: cozy-hood v-test-1" \
  && ok "commit message carries the ref tag and Worker version, not Andy's words" || { echo "$MSG" > "$T/out"; bad "commit message"; }
grep -n "PENDING app=$MAIN prev=$PAGES0 new=$NEW .*worker=cozy-hood@v-test-1" "$T/history.log" | cut -d: -f1 > "$T/l1"
grep -n "PUSHED app=$MAIN prev=$PAGES0 new=$NEW" "$T/history.log" | cut -d: -f1 > "$T/l2"
[ -s "$T/l1" ] && [ -s "$T/l2" ] && [ "$(cat "$T/l1")" -lt "$(cat "$T/l2")" ] && grep -q "VERIFIED new=$NEW" "$T/history.log" \
  && ok "history: PENDING line (with Worker version) before the push, then PUSHED, then VERIFIED" || { cp "$T/history.log" "$T/out"; bad "history"; }
! grep -nE "git[^#]* push[^#]*( -f| --force|\+gh-pages|\+refs/heads/gh)" "$SCRIPT" && ok "script has no forced push anywhere" || bad "forced push in script"
run --production --sha "$MAIN" $(P)
refused "nothing to deploy" && [ "$(tip)" = "$NEW" ] && ok "re-deploying the live build refused (nothing to deploy)" || bad "redeploy same"
run --production --verify-only
[ "$(rc)" = 0 ] && has "verify: OK" && ok "--verify-only passes when the live site serves the gh-pages tip" || bad "verify-only ok"
CSS=$(ls "$T/www/kids-house-game/assets/"*.css); cp "$CSS" "$T/css.bak"; echo "/* tampered */" >> "$CSS"
run --production --verify-only
refused "does not serve exactly the deployed files" && has "css http=200 DIFFERENT" && ok "--verify-only refuses when a file index.html loads differs (CSS)" || bad "verify-only tampered"
cp "$T/css.bak" "$CSS"

# 9. rollback: needs a clean tree, its own approval, the expected tip
: > "$T/pushlog"
run --production --rollback-to "$PAGES0" --expect-tip "$NEW"
refused "--approval-ref <card id or short tag> is required for a rollback" && nopush "$NEW" && ok "rollback without --approval-ref refused" || bad "rollback no ref"
run --production --rollback-to "$PAGES0" --expect-tip "$NEW" --approval-ref rb-1
refused "no approval line for target=production action=rollback sha=$PAGES0" && nopush "$NEW" && ok "rollback without its own approval line refused (a deploy approval does not count)" || bad "rollback no approval"
approve production rollback "$PAGES0" rb-1 "yes roll back"
echo junk > untracked.txt
run --production --rollback-to "$PAGES0" --expect-tip "$NEW" --approval-ref rb-1
refused "working tree is dirty" && nopush "$NEW" && ok "rollback with a dirty tree refused" || bad "rollback dirty"
rm untracked.txt
run --production --rollback-to "$PAGES0" --expect-tip "$PAGES0" --approval-ref rb-1
refused "not --expect-tip" && nopush "$NEW" && ok "rollback refused when gh-pages moved (wrong --expect-tip)" || bad "rollback expect-tip"
run --production --rollback-to "$PAGES0" --expect-tip "$NEW" --approval-ref rb-1
RB=$(tip)
[ "$(rc)" = 0 ] && [ "$(git -C "$T/pages.git" rev-parse "$RB^")" = "$NEW" ] && [ "$(git -C "$T/pages.git" rev-parse "$RB^{tree}")" = "$(git -C "$T/pages.git" rev-parse "$PAGES0^{tree}")" ] \
  && grep -q "^refs/heads/gh-pages $NEW $RB$" "$T/pushlog" && has "verify: OK" && grep -q "ROLLBACK PENDING prev=$NEW" "$T/history.log" \
  && ok "rollback = new commit with the old tree on top, normal push, live check, pending history line" || bad "rollback"
grep -q "ROLLBACK PENDING prev=$NEW" "$T/history.log" && grep -q "ROLLBACK PUSHED prev=$NEW" "$T/history.log" && grep -q "ROLLBACK VERIFIED prev=$NEW new=$RB" "$T/history.log" \
  && ok "rollback writes PENDING, PUSHED and VERIFIED history lines" || bad "rollback verified line"
G -C "$T/p0" push -q -f "$T/pages.git" "$PAGES0:gh-pages" > "$T/out" 2>&1; [ "$(tip)" = "$RB" ] && ok "fixture remote rejects non-fast-forward (sanity)" || bad "fixture nff"

# 10. after the push, the remote tip must be ours
G -C "$T/seed" push -q -f "$T/origin.git" "$MAIN3:main"
mkdist "$MAIN3" "$T/gd-main3"; approve production deploy "$MAIN3" card-43 "yes main3"
touch "$T/race"
run --production --sha "$MAIN3" --expect-dist "$T/gd-main3" --worker-version v-test-1 --approval-ref card-43 --worker-changed-ok
refused "no approval line for target=production action=worker-changed sha=$MAIN3 ref=card-43" && [ "$(tip)" = "$RB" ] && ok "production --worker-changed-ok needs its own worker-changed approval line" || bad "worker-changed approval"
approve production worker-changed "$MAIN3" card-43 "yes worker is fine"
run --production --sha "$MAIN3" --expect-dist "$T/gd-main3" --worker-version v-test-1 --approval-ref card-43 --worker-changed-ok
rm -f "$T/race"
refused "after push the remote gh-pages is $RB" && ok "remote gh-pages not at our commit after the push is caught" || bad "after-push tip check"

# 11. Batch 9 recheck: M1 caller env, M2 exact ref, approvals file, node_modules
G -C "$T/seed" push -q -f "$T/origin.git" "$MAIN:main"; PG=$(tip)
mkdist "$MAIN" "$T/gd-m1"
# the live tip is now a rollback commit (live app SHA unknown): production then needs a worker-changed approval too
approve production worker-changed "$MAIN" card-42 "yes"; approve production worker-changed "$MAIN" card-77 "yes"
NODE_ENV=development run --production --sha "$MAIN" $(P) --expect-dist "$T/gd-m1" --worker-changed-ok --dry-run
[ "$(rc)" = 0 ] && has "ignoring caller's NODE_ENV" && has "service worker registered" && ok "M1: leaked NODE_ENV=development does not reach the build (SW still registered)" || bad "M1 NODE_ENV"
NODE_OPTIONS=--no-warnings run --production --sha "$MAIN" $(P) --expect-dist "$T/gd-m1" --worker-changed-ok --dry-run
[ "$(rc)" = 0 ] && has "ignoring caller's NODE_OPTIONS" && ok "M1: leaked NODE_OPTIONS does not reach the build (identical to the clean gate dist)" || bad "M1 NODE_OPTIONS"
mkdist "$MAIN" "$T/gd-nosw" FAKE_MODE=nosw
FAKE_MODE=nosw run --production --sha "$MAIN" $(P) --expect-dist "$T/gd-nosw" --worker-changed-ok --dry-run
refused "has no serviceWorker.register call" && ok "M1: production build without service-worker registration refused" || bad "M1 nosw prod"
FAKE_MODE=nosw runp --sha "$MAIN" --approval-ref pv-2 --worker-changed-ok --dry-run
refused "preview build has no serviceWorker.register call" && ok "M1: preview build without service-worker registration refused" || bad "M1 nosw preview"
mkdist "$MAIN" "$T/gd-dev" NODE_ENV=development
NODE_ENV=development run --production --sha "$MAIN" $(P) --expect-dist "$T/gd-dev" --worker-changed-ok --dry-run
refused "build differs from the gate-tested dist" && ok "M1: a gate dist built with NODE_ENV=development is refused" || bad "M1 dev gate dist"
approve production deploy "$MAIN" card-77 "yes"
run --production --sha "$MAIN" $(P | sed 's/card-42/card.77/') --dry-run
refused "no approval line for target=production action=deploy sha=$MAIN ref=card.77" && ok "M2: --approval-ref card.77 does not match ref=card-77 (plain string compare)" || bad "M2 dot"
run --production --sha "$MAIN" $(P | sed 's/card-42/card-7/') --dry-run
refused "ref=card-7 in" && ok "M2: a prefix of the approved ref does not match (whole-ref compare)" || bad "M2 prefix"
run --production --sha "$MAIN" $(P | sed 's/card-42/card-77/') --worker-changed-ok --dry-run
[ "$(rc)" = 0 ] && ok "M2: the exact ref still matches" || bad "M2 exact"
GUARD_TEST_MODE=0 GUARD_PAGES_REMOTE= GUARD_BUILD_CMD= GUARD_SITE= GUARD_HEALTH_URL= GUARD_NODE_MODULES= GUARD_VERIFY_TRIES= DEPLOY_HISTORY= run --production --sha "$MAIN" $(P) --dry-run
refused "--approvals is only allowed in test mode" && ok "--approvals refused outside test mode" || bad "approvals outside test"
GUARD_TEST_MODE=0 GUARD_PAGES_REMOTE= GUARD_BUILD_CMD= GUARD_SITE= GUARD_HEALTH_URL= GUARD_NODE_MODULES= GUARD_VERIFY_TRIES= DEPLOY_HISTORY= DEPLOY_APPROVALS="$AP" "$SCRIPT" --production --sha "$MAIN" $(P) --dry-run > "$T/out" 2>&1; echo $? > "$T/rc"
refused "DEPLOY_APPROVALS is only allowed in test mode" && ok "DEPLOY_APPROVALS refused outside test mode" || bad "DEPLOY_APPROVALS outside test"
GUARD_TEST_MODE=0 GUARD_PAGES_REMOTE= GUARD_BUILD_CMD= GUARD_SITE= GUARD_HEALTH_URL= GUARD_NODE_MODULES= GUARD_VERIFY_TRIES= DEPLOY_HISTORY="$T/h2.log" "$SCRIPT" --production --sha "$MAIN" $(P) --dry-run > "$T/out" 2>&1; echo $? > "$T/rc"
refused "DEPLOY_HISTORY is only allowed in test mode" && ok "DEPLOY_HISTORY refused outside test mode" || bad "DEPLOY_HISTORY outside test"
# worktree add must not run the caller's checkout hooks (core.hooksPath=/dev/null)
mkdir -p "$T/work/.git/hooks"
printf '#!/bin/sh\necho fired >> "%s/hook.fired"\n' "$T" > "$T/work/.git/hooks/post-checkout"
chmod +x "$T/work/.git/hooks/post-checkout"; rm -f "$T/hook.fired"
run --production --sha "$MAIN" $(P) --worker-changed-ok --dry-run
[ "$(rc)" = 0 ] && [ ! -f "$T/hook.fired" ] && ok "git worktree add runs with core.hooksPath=/dev/null (caller post-checkout did not fire)" || bad "worktree hooksPath"
cp "$T/nm/.package-lock.json" "$T/nmlock.bak"; echo '{"packages":{"node_modules/a":{"version":"1.0.1","integrity":"sha-x"}}}' > "$T/nm/.package-lock.json"
run --production --sha "$MAIN" $(P) --dry-run
refused "node_modules does not match package-lock.json" && ok "node_modules that differs from the lockfile refused" || bad "node_modules mismatch"
rm "$T/nm/.package-lock.json"; run --production --sha "$MAIN" $(P) --dry-run
refused "was not installed by npm from the lockfile" && ok "node_modules without npm's lock record refused" || bad "node_modules no lock"
cp "$T/nmlock.bak" "$T/nm/.package-lock.json"

echo; echo "deploy_guard_test: $PASS passed, $FAIL failed"
[ $FAIL = 0 ]
