#!/usr/bin/env bash
# Guarded deploy for Cozy House (Batch 9, D-11). Replaces deploy.sh / deploy-preview.sh, which force-pushed.
# Full usage and the approval-line format: docs/deploy.md
#
#   scripts/guarded-deploy.sh --production --sha <40-hex> [--dry-run] [--expect-dist DIR]
#   scripts/guarded-deploy.sh --preview    --sha <40-hex> [--pr N] [--dry-run] [--expect-dist DIR]
#   scripts/guarded-deploy.sh --production --rollback-to <old gh-pages SHA> --expect-tip <current gh-pages SHA> [--dry-run]
#   scripts/guarded-deploy.sh --production --verify-only --sha <40-hex>     # re-run the bundle curl check
#   scripts/guarded-deploy.sh --production --smoke                          # explicit post-deploy smoke step
#
# Refuses: dirty tree, a SHA not on origin/main (preview: or the head of the named PR), a missing approval
# line for this exact target+SHA, Worker-side changes since the live build, a non-reproducible build,
# a build that differs from --expect-dist, and any target that is not exactly one of the two below.
# Never force-pushes: the new dist is committed ON TOP of the fetched gh-pages tip and pushed normally.
set -euo pipefail

die() { echo "REFUSED: $*" >&2; exit 3; }
step() { echo; echo "== $*"; }
ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || die "run inside the kids-house-game checkout"
cd "$ROOT"

# ---------------------------------------------------------------- targets (the only two that exist)
# PRODUCTION and PREVIEW are separate, fixed tables. A target is chosen only by --production or --preview;
# there is no default and no free-form URL, so one can never be mistaken for the other.
set_target() {
  case "$1" in
    production)
      T_NAME=production
      T_PAGES_REMOTE=https://github.com/andrewmunruh/kids-house-game.git
      T_SITE=https://andrewmunruh.github.io/kids-house-game/
      T_BASE=/kids-house-game/
      T_HOOD=https://cozy-hood.andrewmunruh.workers.dev
      T_PREFIX=
      T_MANIFEST_NAME="Cozy House"
      T_MUST_NOT_CONTAIN=cozy-hood-preview
      T_WORKER=cozy-hood ;;
    preview)
      T_NAME=preview
      T_PAGES_REMOTE=https://github.com/andrewmunruh/cozy-preview.git
      T_SITE=https://andrewmunruh.github.io/cozy-preview/
      T_BASE=/cozy-preview/
      T_HOOD=https://cozy-hood-preview.andrewmunruh.workers.dev
      T_PREFIX=preview:
      T_MANIFEST_NAME="Cozy Preview"
      T_MUST_NOT_CONTAIN=cozy-hood.andrewmunruh.workers.dev
      T_WORKER=cozy-hood-preview ;;
    *) die "unknown target '$1'" ;;
  esac
}

# ---------------------------------------------------------------- args
TARGET= SHA= PR= DRY=0 EXPECT_DIST= APPROVALS=${DEPLOY_APPROVALS:-/workspace/deploy-approvals.log}
ROLLBACK_TO= EXPECT_TIP= VERIFY_ONLY=0 SMOKE=0 WORKER_OK=0
while [ $# -gt 0 ]; do
  case "$1" in
    --production) [ -z "$TARGET" ] || die "give exactly one of --production / --preview"; TARGET=production ;;
    --preview)    [ -z "$TARGET" ] || die "give exactly one of --production / --preview"; TARGET=preview ;;
    --sha) SHA=${2:-}; shift ;;
    --pr) PR=${2:-}; shift ;;
    --dry-run) DRY=1 ;;
    --expect-dist) EXPECT_DIST=${2:-}; shift ;;
    --approvals) APPROVALS=${2:-}; shift ;;
    --rollback-to) ROLLBACK_TO=${2:-}; shift ;;
    --expect-tip) EXPECT_TIP=${2:-}; shift ;;
    --verify-only) VERIFY_ONLY=1 ;;
    --smoke) SMOKE=1 ;;
    --worker-changed-ok) WORKER_OK=1 ;;
    -f|--force|--force-with-lease*) die "there is no force option. Never force-push gh-pages." ;;
    -h|--help) sed -n 2,16p "$0"; exit 0 ;;
    *) die "unknown argument '$1' (see --help)" ;;
  esac; shift
done
[ -n "$TARGET" ] || die "choose a target: --production or --preview (there is no default)"
set_target "$TARGET"

# Test mode: only for tests/deploy_guard_test.sh. Every remote must then be a LOCAL path, never a URL,
# so a test can never reach GitHub. Outside test mode the overrides are ignored.
SRC_REMOTE=origin
if [ "${GUARD_TEST_MODE:-}" = 1 ]; then
  for v in "${GUARD_PAGES_REMOTE:-}" "${GUARD_SOURCE_REMOTE:-}"; do
    case "$v" in ''|/*) ;; *) die "test mode needs local absolute paths for remotes, got '$v'" ;; esac
  done
  [ -n "${GUARD_PAGES_REMOTE:-}" ] || die "test mode needs GUARD_PAGES_REMOTE (a local bare repo)"
  T_PAGES_REMOTE=$GUARD_PAGES_REMOTE
  SRC_REMOTE=${GUARD_SOURCE_REMOTE:-origin}
  T_SITE=${GUARD_SITE:-}
fi
case "$T_PAGES_REMOTE" in https://github.com/andrewmunruh/kids-house-game.git|https://github.com/andrewmunruh/cozy-preview.git|/*) ;; *) die "pages remote not allowed: $T_PAGES_REMOTE";; esac
if [ "$TARGET" = production ] && [ "$T_PAGES_REMOTE" = https://github.com/andrewmunruh/cozy-preview.git ]; then die "production target pointed at the preview repo"; fi
if [ "$TARGET" = preview ] && [ "$T_PAGES_REMOTE" = https://github.com/andrewmunruh/kids-house-game.git ]; then die "preview target pointed at the production repo"; fi

echo "TARGET: $(echo "$T_NAME" | tr a-z A-Z)  pages=$T_PAGES_REMOTE  site=${T_SITE:-<none>}  worker=$T_WORKER  $( [ $DRY = 1 ] && echo '(DRY RUN: nothing will be pushed)')"

WORK=$(mktemp -d /tmp/guarded-deploy.XXXXXX)
cleanup() { git worktree remove --force "$WORK/src" >/dev/null 2>&1 || true; rm -rf "$WORK"; }
trap cleanup EXIT
HIST=${DEPLOY_HISTORY:-$(dirname "$APPROVALS")/deploy-history.log}

# Fetch the current gh-pages tip of the chosen target into a scratch repo.
fetch_pages() {
  git init -q -b gh-pages "$WORK/pages"
  git -C "$WORK/pages" fetch -q "$T_PAGES_REMOTE" gh-pages || die "could not fetch gh-pages from $T_PAGES_REMOTE"
  PREV=$(git -C "$WORK/pages" rev-parse FETCH_HEAD)
  git -C "$WORK/pages" checkout -q -B gh-pages "$PREV"
}
push_pages() {
  local new=$1
  # Normal push of gh-pages; no '+', no -f. It only succeeds as a fast-forward of $PREV.
  git -C "$WORK/pages" push "$T_PAGES_REMOTE" "gh-pages:refs/heads/gh-pages"
  local now; now=$(git -C "$WORK/pages" ls-remote "$T_PAGES_REMOTE" refs/heads/gh-pages | cut -f1)
  [ "$now" = "$new" ] || die "after push the remote gh-pages is $now, expected $new"
}

# ---------------------------------------------------------------- bundle curl verification
verify_live() {
  local dist=$1
  [ -n "$T_SITE" ] || { echo "verify: no site URL in test mode, skipped"; return 0; }
  local want; want=$(grep -o 'assets/index-[A-Za-z0-9_-]*\.js' "$dist/index.html" | head -1)
  echo "verify: waiting for $T_SITE to serve $want (GitHub Pages can take a few minutes)"
  local ok=0
  for i in $(seq 1 60); do
    if curl -fsS "${T_SITE}index.html?gd=$RANDOM" -o "$WORK/live-index.html" 2>/dev/null && grep -q "$want" "$WORK/live-index.html"; then ok=1; break; fi
    sleep 10
  done
  [ $ok = 1 ] || die "live site never served $want (index.html is still old). Nothing else was changed."
  local bad=0
  for f in index.html sw.js manifest.webmanifest "$want" $(cd "$dist" && ls assets/*.css); do
    local code; code=$(curl -sS -o "$WORK/live.bin" -w '%{http_code}' "${T_SITE}${f}?gd=$RANDOM")
    if [ "$code" = 200 ] && cmp -s "$WORK/live.bin" "$dist/$f"; then echo "verify: $f 200 identical ($(stat -c %s "$WORK/live.bin") B)"
    else echo "verify: $f http=$code DIFFERENT"; bad=1; fi
  done
  [ $bad = 0 ] || die "live files differ from the build (see above). Roll back if players are affected."
  echo "verify: OK"
}

# ---------------------------------------------------------------- smoke (explicit step)
if [ $SMOKE = 1 ]; then
  [ -n "$T_SITE" ] || die "smoke needs a site URL"
  PY=${PY:-/workspace/.pwvenv/bin/python}
  L=${SMOKE_LOGS:-$ROOT/work/smoke-$T_NAME-$(date +%Y%m%d-%H%M%S)}; mkdir -p "$L"
  echo "smoke: logs in $L (runs under /workspace/surprise/gate.lock)"
  PFXENV=; [ "$T_NAME" = preview ] && PFXENV="PFX=preview:"
  exec 9>/workspace/surprise/gate.lock; flock 9
  rc=0
  for t in testnav_portrait ui_contrast_touch; do
    env $PFXENV "$PY" "tests/${t}_test.py" "$T_SITE" >"$L/$t.log" 2>&1 && echo "smoke: $t ok" || { echo "smoke: $t FAILED ($L/$t.log)"; rc=1; }
  done
  OLDURL="https://andrewmunruh.github.io/kids-house-game/"
  [ "$T_NAME" = preview ] && OLDURL="https://andrewmunruh.github.io/kids-house-game/?hood=$T_HOOD"
  for br in chromium webkit; do
    NEWURL=$T_SITE "$PY" tests/smoke_two_client.py "$br" "$OLDURL" >"$L/two_client_$br.log" 2>&1 || true
    if grep -q "'ok': False" "$L/two_client_$br.log" || ! grep -q "'ok': True" "$L/two_client_$br.log"; then echo "smoke: two-client $br FAILED ($L/two_client_$br.log)"; rc=1; else echo "smoke: two-client $br ok"; fi
  done
  echo "$(date -Iseconds) target=$T_NAME smoke rc=$rc logs=$L" >> "$HIST"
  [ $rc = 0 ] && echo "SMOKE: OK" || echo "SMOKE: FAILED"
  exit $rc
fi

# ---------------------------------------------------------------- rollback (normal push of the old tree on top)
if [ -n "$ROLLBACK_TO" ]; then
  [[ "$ROLLBACK_TO" =~ ^[0-9a-f]{40}$ ]] || die "--rollback-to needs a full 40-hex gh-pages SHA"
  [[ "$EXPECT_TIP" =~ ^[0-9a-f]{40}$ ]] || die "--rollback-to also needs --expect-tip <current gh-pages SHA>"
  step "rollback $T_NAME gh-pages to the tree of $ROLLBACK_TO"
  fetch_pages
  [ "$PREV" = "$EXPECT_TIP" ] || die "gh-pages tip is $PREV, not --expect-tip $EXPECT_TIP (someone deployed since?)"
  git -C "$WORK/pages" merge-base --is-ancestor "$ROLLBACK_TO" "$PREV" || die "$ROLLBACK_TO is not an earlier gh-pages commit"
  NEW=$(git -C "$WORK/pages" -c user.name=andrewmunruh -c user.email=andrewmunruh@users.noreply.github.com \
        commit-tree "$ROLLBACK_TO^{tree}" -p "$PREV" -m "rollback $T_NAME to ${ROLLBACK_TO:0:7} (tree of $ROLLBACK_TO)")
  git -C "$WORK/pages" update-ref refs/heads/gh-pages "$NEW"
  echo "previous gh-pages: $PREV"; echo "rollback commit:   $NEW (same files as $ROLLBACK_TO)"
  echo "undo this rollback: $0 --$T_NAME --rollback-to $PREV --expect-tip $NEW"
  if [ $DRY = 1 ]; then echo "DRY RUN: not pushing."; exit 0; fi
  push_pages "$NEW"
  echo "$(date -Iseconds) target=$T_NAME ROLLBACK prev=$PREV new=$NEW tree_of=$ROLLBACK_TO" >> "$HIST"
  echo "ROLLED BACK. Next: run $0 --$T_NAME --smoke"
  exit 0
fi

# ---------------------------------------------------------------- 1. clean tree
step "1. working tree is clean"
[ -z "$(git status --porcelain --untracked-files=normal)" ] || { git status --short | head -20; die "working tree is dirty (commit or stash first)"; }
echo "clean"

# ---------------------------------------------------------------- 2. SHA is on main (or the PR head, preview only)
step "2. SHA is merged"
[[ "$SHA" =~ ^[0-9a-f]{40}$ ]] || die "--sha must be the full 40-hex approved SHA"
git fetch -q "$SRC_REMOTE" "+refs/heads/main:refs/guarded/main" || die "could not fetch main from $SRC_REMOTE"
git cat-file -e "$SHA^{commit}" 2>/dev/null || git fetch -q "$SRC_REMOTE" "$SHA" 2>/dev/null || true
git cat-file -e "$SHA^{commit}" 2>/dev/null || die "$SHA is not a commit in this repo or on $SRC_REMOTE"
MAIN=$(git rev-parse refs/guarded/main)
if git merge-base --is-ancestor "$SHA" "$MAIN"; then
  echo "$SHA is reachable from $SRC_REMOTE/main ($MAIN)$( [ "$SHA" = "$MAIN" ] && echo ' (= main tip)')"
elif [ "$TARGET" = preview ] && [ -n "$PR" ]; then
  [[ "$PR" =~ ^[0-9]+$ ]] || die "--pr must be a number"
  git fetch -q "$SRC_REMOTE" "+refs/pull/$PR/head:refs/guarded/pr" || die "could not fetch PR #$PR head"
  [ "$(git rev-parse refs/guarded/pr)" = "$SHA" ] || die "$SHA is not the head of PR #$PR (head is $(git rev-parse refs/guarded/pr))"
  echo "$SHA is the head of PR #$PR (preview only)"
elif [ "$TARGET" = preview ]; then
  die "$SHA is not on $SRC_REMOTE/main. For a PR build on preview pass --pr N (the SHA must be that PR's head)."
else
  die "$SHA is not reachable from $SRC_REMOTE/main ($MAIN). Production deploys only merged main SHAs."
fi

# ---------------------------------------------------------------- 3. recorded approval
step "3. approval recorded in $APPROVALS"
# Line format (one per approval, appended by hand when Andy says yes):
#   2026-10-31T05:37:00-05:00 | production | <40-hex sha> | Andy | "<Andy's exact words>"
[ -f "$APPROVALS" ] || die "no approvals log at $APPROVALS"
LINE=$(grep -E "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9:]{8}([+-][0-9]{2}:[0-9]{2}|Z) \| $T_NAME \| $SHA \| Andy \| \".+\"\s*$" "$APPROVALS" | tail -1 || true)
[ -n "$LINE" ] || die "no approval line for target=$T_NAME sha=$SHA in $APPROVALS (need: <ISO time> | $T_NAME | $SHA | Andy | \"<exact words>\")"
date -d "$(echo "$LINE" | cut -d'|' -f1)" >/dev/null 2>&1 || die "approval time is not a valid timestamp: $LINE"
echo "approval: $LINE"

# ---------------------------------------------------------------- 4. Worker unchanged since the live build
step "4. Worker-side files unchanged since the live build"
fetch_pages
LIVE_APP=$(git -C "$WORK/pages" show "$PREV:version.json" 2>/dev/null | sed -n 's/.*"sha": *"\([0-9a-f]\{40\}\)".*/\1/p' || true)
if [ -z "$LIVE_APP" ]; then
  # Older deploys say "deploy Batch N (abc1234)" in the gh-pages commit message.
  SHORT=$(git -C "$WORK/pages" log -1 --format=%B "$PREV" | grep -oE '\(([0-9a-f]{7,40})\)' | tr -d '()' | head -1 || true)
  [ -n "$SHORT" ] && LIVE_APP=$(git rev-parse -q --verify "$SHORT^{commit}" 2>/dev/null || true)
fi
if [ -z "$LIVE_APP" ]; then
  [ $WORKER_OK = 1 ] || die "cannot tell which app SHA is live on $T_NAME (no version.json or (sha) in the gh-pages message). Check by hand, then pass --worker-changed-ok."
  echo "live app SHA unknown; --worker-changed-ok given"
else
  CHANGED=$(git diff --name-only "$LIVE_APP" "$SHA" -- server src/shared wrangler.toml | tr '\n' ' ')
  echo "live app SHA: $LIVE_APP"
  if [ -n "$CHANGED" ]; then
    [ $WORKER_OK = 1 ] || die "Worker-side files changed since the live build: $CHANGED. Deploy/verify the $T_WORKER Worker first (separate approval), then pass --worker-changed-ok."
    echo "Worker-side files changed ($CHANGED); --worker-changed-ok given"
  else echo "server/, src/shared/, wrangler.toml unchanged: the live $T_WORKER Worker stays compatible"; fi
fi

# ---------------------------------------------------------------- 5. build twice, byte-identical
step "5. build $SHA for $T_NAME (twice, must be byte-identical)"
git worktree add -q --detach "$WORK/src" "$SHA"
NM=${GUARD_NODE_MODULES:-$ROOT/node_modules}
[ -d "$NM" ] || die "no node_modules at $NM (npm ci first)"
ln -s "$(readlink -f "$NM")" "$WORK/src/node_modules"
build() {
  local out=$1
  if [ -n "${GUARD_BUILD_CMD:-}" ] && [ "${GUARD_TEST_MODE:-}" = 1 ]; then (cd "$WORK/src" && OUT="$out" bash -c "$GUARD_BUILD_CMD"); return; fi
  ( cd "$WORK/src" && npx tsc --noEmit && \
    if [ "$T_NAME" = preview ]; then VITE_BASE=$T_BASE VITE_HOOD_URL=$T_HOOD VITE_STORE_PREFIX=$T_PREFIX npx vite build --outDir "$out" --emptyOutDir
    else npx vite build --outDir "$out" --emptyOutDir; fi ) > "$out.log" 2>&1 || { tail -20 "$out.log"; die "build failed"; }
  if [ "$T_NAME" = preview ]; then
    sed -i 's/"name": "Cozy House", "short_name": "Cozy House"/"name": "Cozy Preview", "short_name": "Cozy Preview"/' "$out/manifest.webmanifest"
  fi
}
build "$WORK/dist"; build "$WORK/dist2"
if ! diff -r -q "$WORK/dist" "$WORK/dist2" >"$WORK/rebuild.diff" 2>&1; then head "$WORK/rebuild.diff"; die "two builds of $SHA differ: build is not reproducible"; fi
echo "byte-identical rebuild: OK ($(find "$WORK/dist" -type f | wc -l) files)"
if [ -n "$EXPECT_DIST" ]; then
  [ -f "$EXPECT_DIST/index.html" ] || die "--expect-dist $EXPECT_DIST is not a dist directory"
  D=$(diff -r -q -x .nojekyll -x version.json "$WORK/dist" "$EXPECT_DIST" || true)
  [ -z "$D" ] || { echo "$D" | head; die "build differs from the gate-tested dist $EXPECT_DIST"; }
  echo "byte-identical to the gate-tested dist $EXPECT_DIST: OK"
fi
if [ -z "${GUARD_BUILD_CMD:-}" ]; then
  grep -q "\"name\": \"$T_MANIFEST_NAME\"" "$WORK/dist/manifest.webmanifest" || die "manifest name is not '$T_MANIFEST_NAME'"
  ! grep -rqF "$T_MUST_NOT_CONTAIN" "$WORK/dist" || die "$T_NAME build contains '$T_MUST_NOT_CONTAIN' (wrong target config)"
  grep -rqF "$T_HOOD" "$WORK/dist/assets" || die "$T_NAME build does not point at $T_HOOD"
  echo "target config: manifest '$T_MANIFEST_NAME', hood $T_HOOD, no '$T_MUST_NOT_CONTAIN'"
fi
BUNDLE=$(grep -o 'assets/index-[A-Za-z0-9_-]*\.js' "$WORK/dist/index.html" | head -1 || true)
echo "bundle: ${BUNDLE:-<none>}"

# ---------------------------------------------------------------- 6. commit on top of gh-pages, show rollback
step "6. commit dist on top of $T_NAME gh-pages"
find "$WORK/pages" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -a "$WORK/dist/." "$WORK/pages/"; touch "$WORK/pages/.nojekyll"
printf '{"sha": "%s", "target": "%s", "builtAt": "%s"}\n' "$SHA" "$T_NAME" "$(date -Iseconds)" > "$WORK/pages/version.json"
git -C "$WORK/pages" add -A
git -C "$WORK/pages" diff --cached --quiet -- . ':!version.json' && die "the build is identical to what is live on $T_NAME; nothing to deploy"
git -C "$WORK/pages" -c user.name=andrewmunruh -c user.email=andrewmunruh@users.noreply.github.com commit -q \
  -m "deploy $T_NAME (${SHA:0:7})" -m "App-SHA: $SHA" -m "Approval: $LINE"
NEW=$(git -C "$WORK/pages" rev-parse HEAD)
echo "previous gh-pages: $PREV"
echo "new gh-pages:      $NEW (parent $PREV, fast-forward)"
echo "ROLLBACK (one line): $0 --$T_NAME --rollback-to $PREV --expect-tip $NEW"

if [ $DRY = 1 ]; then
  echo; echo "DRY RUN complete: every check passed, nothing was pushed. $T_NAME gh-pages is still $PREV."
  exit 0
fi

# ---------------------------------------------------------------- 7. push (normal, never forced)
step "7. push gh-pages to $T_NAME (normal push)"
push_pages "$NEW"
echo "$(date -Iseconds) target=$T_NAME app=$SHA prev=$PREV new=$NEW bundle=$BUNDLE approval=[$LINE]" >> "$HIST"

# ---------------------------------------------------------------- 8. bundle curl verification
step "8. verify the live site serves this build"
verify_live "$WORK/dist"

step "DEPLOYED $T_NAME: gh-pages $PREV..$NEW, bundle $BUNDLE"
echo "NEXT (required): post-deploy smoke:  $0 --$T_NAME --smoke"
echo "ROLLBACK:                            $0 --$T_NAME --rollback-to $PREV --expect-tip $NEW"
