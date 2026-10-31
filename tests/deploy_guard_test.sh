#!/usr/bin/env bash
# tests/deploy_guard_test.sh: guard tests for scripts/guarded-deploy.sh.
# Runs ONLY against throwaway local bare repos in a temp dir (GUARD_TEST_MODE=1 refuses any non-local remote).
# Never touches the real GitHub remotes.
set -uo pipefail
SCRIPT=$(cd "$(dirname "$0")/.." && pwd)/scripts/guarded-deploy.sh
REPO=$(cd "$(dirname "$0")/.." && pwd)
T=$(mktemp -d /tmp/deploy-guard-test.XXXXXX); trap 'rm -rf "$T"' EXIT
PASS=0 FAIL=0
ok()  { echo "PASS $1"; PASS=$((PASS+1)); }
bad() { echo "FAIL $1"; echo "----- output:"; sed 's/^/  | /' "$T/out"; FAIL=$((FAIL+1)); }
G() { git -c user.name=t -c user.email=t@t -c init.defaultBranch=main "$@"; }

# --- fixtures: app origin (bare), pages remote (bare, gh-pages, non-fast-forward denied + push log), a clone
G init -q --bare "$T/origin.git"
G init -q "$T/seed"; cd "$T/seed"
mkdir -p server src/shared; echo w1 > server/worker.ts; echo s > src/shared/x.ts; echo a1 > app.txt
G add -A; G commit -qm base; BASE=$(git rev-parse HEAD)
echo a2 > app.txt; G commit -qam "app change"; MAIN=$(git rev-parse HEAD)
G push -q "$T/origin.git" HEAD:main
G checkout -qb side; echo side > app.txt; G commit -qam "unmerged work"; SIDE=$(git rev-parse HEAD)
G push -q "$T/origin.git" side:side
G checkout -q main; echo w2 > server/worker.ts; G commit -qam "worker change"; WCHG=$(git rev-parse HEAD)
G push -q "$T/origin.git" HEAD:refs/heads/worker
G init -q --bare "$T/pages.git"; git -C "$T/pages.git" config receive.denyNonFastForwards true
cat > "$T/pages.git/hooks/update" <<H
#!/bin/sh
echo "\$1 \$2 \$3" >> "$T/pushlog"
if [ "\$2" != 0000000000000000000000000000000000000000 ] && ! git merge-base --is-ancestor "\$2" "\$3"; then echo "hook: non-fast-forward refused"; exit 1; fi
H
chmod +x "$T/pages.git/hooks/update"
G init -q "$T/p0"; cd "$T/p0"; G checkout -qb gh-pages
echo '<script src="assets/index-OLD.js"></script>' > index.html; G add -A; G commit -qm "deploy Batch 1 (${BASE:0:7})"
G push -q "$T/pages.git" gh-pages; : > "$T/pushlog"
PAGES0=$(git -C "$T/pages.git" rev-parse gh-pages)
G clone -q "$T/origin.git" "$T/work" 2>/dev/null; cd "$T/work"
mkdir -p "$T/nm"
export GUARD_TEST_MODE=1 GUARD_PAGES_REMOTE="$T/pages.git" GUARD_NODE_MODULES="$T/nm" DEPLOY_HISTORY="$T/history.log"
export GUARD_BUILD_CMD='mkdir -p "$OUT/assets"; echo "<script src=\"assets/index-$(git rev-parse --short HEAD).js\"></script>" > "$OUT/index.html"; cp app.txt "$OUT/assets/index-$(git rev-parse --short HEAD).js"'
AP="$T/approvals.log"
approve() { echo "2026-10-31T05:37:00-05:00 | $1 | $2 | Andy | \"$3\"" >> "$AP"; }
run() { "$SCRIPT" --approvals "$AP" "$@" > "$T/out" 2>&1; echo $? > "$T/rc"; }
rc() { cat "$T/rc"; }
tip() { git -C "$T/pages.git" rev-parse gh-pages; }
nopush() { [ "$(tip)" = "$1" ] && [ ! -s "$T/pushlog" ]; }

# 1. dirty tree refused
approve production "$MAIN" "yes deploy it"
echo junk > untracked.txt
run --production --sha "$MAIN"
[ "$(rc)" = 3 ] && grep -q "REFUSED: working tree is dirty" "$T/out" && nopush "$PAGES0" && ok "dirty tree (untracked file) refused, nothing pushed" || bad "dirty tree"
rm untracked.txt; echo x >> app.txt
run --production --sha "$MAIN" --dry-run
[ "$(rc)" = 3 ] && grep -q "REFUSED: working tree is dirty" "$T/out" && nopush "$PAGES0" && ok "dirty tree (modified file) refused even in --dry-run" || bad "dirty tree modified"
git checkout -q app.txt

# 2. non-main SHA refused
approve production "$SIDE" "yes"
run --production --sha "$SIDE"
[ "$(rc)" = 3 ] && grep -q "is not reachable from origin/main" "$T/out" && nopush "$PAGES0" && ok "non-main (unmerged branch) SHA refused for production" || bad "non-main SHA"
run --production --sha "${MAIN:0:7}"
[ "$(rc)" = 3 ] && grep -q "full 40-hex" "$T/out" && ok "short SHA refused" || bad "short SHA"
approve preview "$SIDE" "yes preview"
run --preview --sha "$SIDE"
[ "$(rc)" = 3 ] && grep -q "pass --pr N" "$T/out" && nopush "$PAGES0" && ok "non-main SHA refused for preview without --pr" || bad "preview non-main"
run --preview --sha "$SIDE" --pr 7
[ "$(rc)" = 3 ] && grep -q "could not fetch PR #7" "$T/out" && nopush "$PAGES0" && ok "preview --pr refused when that PR head does not exist" || bad "preview pr missing"
git -C "$T/origin.git" update-ref refs/pull/7/head "$SIDE"
run --preview --sha "$SIDE" --pr 7 --dry-run
[ "$(rc)" = 0 ] && grep -q "is the head of PR #7 (preview only)" "$T/out" && nopush "$PAGES0" && ok "preview accepts the exact head of an explicit PR (dry run)" || bad "preview pr head"
run --preview --sha "$MAIN" --pr 7
[ "$(rc)" = 3 ] && grep -q "no approval line for target=preview" "$T/out" && ok "preview of main SHA still needs its own preview approval" || bad "preview approval"

# 3. missing approval refused
rm -f "$AP"
run --production --sha "$MAIN"
[ "$(rc)" = 3 ] && grep -q "no approvals log" "$T/out" && nopush "$PAGES0" && ok "missing approvals log refused" || bad "missing log"
approve preview "$MAIN" "preview yes"
run --production --sha "$MAIN"
[ "$(rc)" = 3 ] && grep -q "no approval line for target=production sha=$MAIN" "$T/out" && nopush "$PAGES0" && ok "approval for the other target does not count" || bad "other target approval"
echo "2026-10-31T05:37:00-05:00 | production | $MAIN | Andy | \"\"" >> "$AP"
echo "2026-10-31T05:37:00-05:00 | production | $MAIN | Bob | \"ship\"" >> "$AP"
echo "yesterday | production | $MAIN | Andy | \"ship\"" >> "$AP"
run --production --sha "$MAIN"
[ "$(rc)" = 3 ] && grep -q "no approval line" "$T/out" && nopush "$PAGES0" && ok "approval with empty words / not Andy / no ISO time refused" || bad "malformed approvals"
approve production "$BASE" "ship the old one"
run --production --sha "$MAIN"
[ "$(rc)" = 3 ] && grep -q "no approval line" "$T/out" && ok "approval for a different SHA does not count" || bad "other sha approval"
run --production
[ "$(rc)" = 3 ] && grep -q "full 40-hex" "$T/out" && ok "missing --sha argument refused" || bad "missing sha"
approve production "$MAIN" "yes, deploy $MAIN to production"

# 4. dry run does everything except push
run --production --sha "$MAIN" --dry-run
[ "$(rc)" = 0 ] && grep -q "DRY RUN complete" "$T/out" && grep -q "previous gh-pages: $PAGES0" "$T/out" \
  && grep -q "ROLLBACK (one line): .* --production --rollback-to $PAGES0 --expect-tip " "$T/out" \
  && grep -q "byte-identical rebuild: OK" "$T/out" && grep -q "unchanged: the live cozy-hood Worker" "$T/out" && nopush "$PAGES0" \
  && ok "dry run passes all checks, prints prev SHA + rollback, pushes nothing" || bad "dry run"

# 5. other refusals
run --production --sha "$MAIN" --force
[ "$(rc)" = 3 ] && grep -q "no force option" "$T/out" && ok "--force refused" || bad "--force"
run --sha "$MAIN"
[ "$(rc)" = 3 ] && grep -q "there is no default" "$T/out" && ok "no target refused" || bad "no target"
run --production --preview --sha "$MAIN"
[ "$(rc)" = 3 ] && grep -q "exactly one of" "$T/out" && ok "both targets refused" || bad "both targets"
GUARD_PAGES_REMOTE=https://github.com/andrewmunruh/kids-house-game.git run --production --sha "$MAIN" --dry-run
[ "$(rc)" = 3 ] && grep -q "needs local absolute paths" "$T/out" && ok "test mode refuses a real (URL) remote" || bad "test mode url"
git fetch -q origin worker; approve production "$WCHG" "yes"
G -C "$T/seed" push -q "$T/origin.git" "$WCHG:main"
run --production --sha "$WCHG" --dry-run
[ "$(rc)" = 3 ] && grep -q "Worker-side files changed since the live build: server/worker.ts" "$T/out" && nopush "$PAGES0" && ok "Worker-side change since live build refused" || bad "worker change"
G -C "$T/seed" push -q -f "$T/origin.git" "$MAIN:main"   # restore the fixture origin's main (local temp repo only)
GUARD_BUILD_CMD='mkdir -p "$OUT"; echo $RANDOM > "$OUT/index.html"' run --production --sha "$MAIN" --dry-run
[ "$(rc)" = 3 ] && grep -q "build is not reproducible" "$T/out" && ok "non-reproducible build refused" || bad "reproducible"
mkdir -p "$T/gate-dist/assets"; echo nope > "$T/gate-dist/index.html"
run --production --sha "$MAIN" --dry-run --expect-dist "$T/gate-dist"
[ "$(rc)" = 3 ] && grep -q "differs from the gate-tested dist" "$T/out" && ok "build differing from the gate-tested dist refused" || bad "expect-dist"
for s in deploy.sh deploy-preview.sh; do
  bash "$REPO/$s" > "$T/out" 2>&1; r=$?
  [ $r = 3 ] && grep -q "is retired" "$T/out" && ok "old $s refuses to run" || bad "old $s"
done

# 6. real push to the local bare remote: normal fast-forward, never forced
run --production --sha "$MAIN" --expect-dist /nonexistent
[ "$(rc)" = 3 ] && grep -q "is not a dist directory" "$T/out" && [ "$(tip)" = "$PAGES0" ] && ok "--expect-dist that is not a dist dir refused" || bad "expect-dist missing"
mkdir -p "$T/gd2"; ( cd "$T/work" && git worktree add -q --detach "$T/wt" "$MAIN" && cd "$T/wt" && OUT="$T/gd2" bash -c "$GUARD_BUILD_CMD" && cd "$T/work" && git worktree remove --force "$T/wt" )
: > "$T/pushlog"
run --production --sha "$MAIN" --expect-dist "$T/gd2"
NEW=$(tip)
[ "$(rc)" = 0 ] && grep -q "DEPLOYED production" "$T/out" && [ "$(git -C "$T/pages.git" rev-parse "$NEW^")" = "$PAGES0" ] \
  && [ "$(wc -l < "$T/pushlog")" = 1 ] && grep -q "^refs/heads/gh-pages $PAGES0 $NEW$" "$T/pushlog" \
  && git -C "$T/pages.git" show "$NEW:version.json" | grep -q "\"sha\": \"$MAIN\"" && git -C "$T/pages.git" show "$NEW:.nojekyll" >/dev/null 2>&1 \
  && ok "deploy = one normal fast-forward push on top of the old tip (parent $PAGES0), version.json + .nojekyll" || bad "real push"
! grep -nE "git[^#]* push[^#]*( -f| --force|\+gh-pages|\+refs/heads/gh)" "$SCRIPT" && ok "script has no forced push anywhere" || bad "forced push in script"
run --production --sha "$MAIN"
[ "$(rc)" = 3 ] && grep -q "nothing to deploy" "$T/out" && [ "$(tip)" = "$NEW" ] && ok "re-deploying the live build refused (nothing to deploy)" || bad "redeploy same"
# someone else moved gh-pages: we fetch the new tip, so our push is still a fast-forward of it
# rollback
: > "$T/pushlog"
run --production --rollback-to "$PAGES0" --expect-tip "$PAGES0"
[ "$(rc)" = 3 ] && grep -q "not --expect-tip" "$T/out" && [ "$(tip)" = "$NEW" ] && ok "rollback refused when gh-pages moved (wrong --expect-tip)" || bad "rollback expect-tip"
run --production --rollback-to "$PAGES0" --expect-tip "$NEW"
RB=$(tip)
[ "$(rc)" = 0 ] && [ "$(git -C "$T/pages.git" rev-parse "$RB^")" = "$NEW" ] && [ "$(git -C "$T/pages.git" rev-parse "$RB^{tree}")" = "$(git -C "$T/pages.git" rev-parse "$PAGES0^{tree}")" ] \
  && grep -q "^refs/heads/gh-pages $NEW $RB$" "$T/pushlog" && ok "rollback = new commit with the old tree on top, normal push" || bad "rollback"
# a forced rewind of the remote is impossible anyway
G -C "$T/p0" push -q -f "$T/pages.git" "$PAGES0:gh-pages" > "$T/out" 2>&1; [ "$(tip)" = "$RB" ] && ok "fixture remote rejects non-fast-forward (sanity)" || bad "fixture nff"
[ -s "$T/history.log" ] && grep -q "app=$MAIN prev=$PAGES0 new=$NEW" "$T/history.log" && ok "deploy history logged" || bad "history"

echo; echo "deploy_guard_test: $PASS passed, $FAIL failed"
[ $FAIL = 0 ]
