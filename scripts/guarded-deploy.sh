#!/usr/bin/env bash
# Guarded deploy for Cozy House (Batch 9, D-11). Replaces deploy.sh / deploy-preview.sh, which force-pushed.
# Full usage and the approval-line format: docs/deploy.md
#
#   scripts/guarded-deploy.sh --production --sha <40-hex> --approval-ref TAG --expect-dist DIR --worker-version ID [--dry-run]
#   scripts/guarded-deploy.sh --preview    --sha <40-hex> --approval-ref TAG [--pr N] [--expect-dist DIR] [--worker-version ID] [--dry-run]
#   scripts/guarded-deploy.sh --production --rollback-to <old gh-pages SHA> --expect-tip <current gh-pages SHA> --approval-ref TAG [--dry-run]
#   scripts/guarded-deploy.sh --production --verify-only                    # what live index.html loads == gh-pages tip (curl)
#   scripts/guarded-deploy.sh --preview    --smoke                          # post-deploy smoke (production needs --real-street-ok)
#
# Refuses: dirty tree (deploy AND rollback), a SHA not on origin/main (preview: or the head of the named PR), a missing
# approval line for this exact target+action+SHA+ref, Worker-side changes since the live build, a non-reproducible
# build, a build that differs from --expect-dist (mandatory for production), a build whose base path, store prefix,
# preview ribbon, hood URL or manifest do not match the target, and a pages repo whose live content is the other target.
# Never force-pushes: the new dist is committed ON TOP of the fetched gh-pages tip and pushed normally.
set -euo pipefail

die() { echo "REFUSED: $*" >&2; exit 3; }
step() { echo; echo "== $*"; }
ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || die "run inside the kids-house-game checkout"
cd "$ROOT"

# ---------------------------------------------------------------- targets (the only two that exist)
# PRODUCTION and PREVIEW are separate, fixed tables. A target is chosen only by --production or --preview;
# there is no default and no free-form URL, so one can never be mistaken for the other.
PREVIEW_RIBBON='previewRibbon\">PREVIEW'   # what src/main.ts compiles to in a preview build (grep -E, escaped quote optional)
set_target() {
  case "$1" in
    production)
      T_NAME=production
      T_PAGES_REMOTE=https://github.com/andrewmunruh/kids-house-game.git
      T_SITE=https://andrewmunruh.github.io/kids-house-game/
      T_BASE=/kids-house-game/
      T_OTHER_BASE=/cozy-preview/
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
      T_OTHER_BASE=/kids-house-game/
      T_HOOD=https://cozy-hood-preview.andrewmunruh.workers.dev
      T_PREFIX=preview:
      T_MANIFEST_NAME="Cozy Preview"
      T_MUST_NOT_CONTAIN=cozy-hood.andrewmunruh.workers.dev
      T_WORKER=cozy-hood-preview ;;
    *) die "unknown target '$1'" ;;
  esac
}

# ---------------------------------------------------------------- args
TARGET= SHA= PR= DRY=0 EXPECT_DIST= APPROVALS=/workspace/deploy-approvals.log APPROVALS_GIVEN=0
ROLLBACK_TO= EXPECT_TIP= VERIFY_ONLY=0 SMOKE=0 WORKER_OK=0 REF= WORKER_VERSION= REAL_STREET_OK=0
while [ $# -gt 0 ]; do
  case "$1" in
    --production) [ -z "$TARGET" ] || die "give exactly one of --production / --preview"; TARGET=production ;;
    --preview)    [ -z "$TARGET" ] || die "give exactly one of --production / --preview"; TARGET=preview ;;
    --sha) SHA=${2:-}; shift ;;
    --pr) PR=${2:-}; shift ;;
    --dry-run) DRY=1 ;;
    --expect-dist) EXPECT_DIST=${2:-}; shift ;;
    --approvals) APPROVALS=${2:-}; APPROVALS_GIVEN=1; shift ;;
    --approval-ref|--card) REF=${2:-}; shift ;;
    --rollback-to) ROLLBACK_TO=${2:-}; shift ;;
    --expect-tip) EXPECT_TIP=${2:-}; shift ;;
    --worker-version) WORKER_VERSION=${2:-}; shift ;;
    --verify-only) VERIFY_ONLY=1 ;;
    --smoke) SMOKE=1 ;;
    --real-street-ok) REAL_STREET_OK=1 ;;
    --worker-changed-ok) WORKER_OK=1 ;;
    -f|--force|--force-with-lease*) die "there is no force option. Never force-push gh-pages." ;;
    -h|--help) sed -n 2,15p "$0"; exit 0 ;;
    *) die "unknown argument '$1' (see --help)" ;;
  esac; shift
done
[ -n "$TARGET" ] || die "choose a target: --production or --preview (there is no default)"
set_target "$TARGET"

# Test mode: only for tests/deploy_guard_test.sh. Every remote must then be a LOCAL path and every URL a
# 127.0.0.1 URL, so a test can never reach GitHub or a Worker. Outside test mode every GUARD_* override is refused.
SRC_REMOTE=origin
HEALTH_URL=$T_HOOD/api/health
if [ "${GUARD_TEST_MODE:-}" = 1 ]; then
  for v in "${GUARD_PAGES_REMOTE:-}" "${GUARD_SOURCE_REMOTE:-}"; do
    case "$v" in ''|/*) ;; *) die "test mode needs local absolute paths for remotes, got '$v'" ;; esac
  done
  for v in "${GUARD_SITE:-}" "${GUARD_HEALTH_URL:-}"; do
    case "$v" in ''|http://127.0.0.1:*) ;; *) die "test mode URLs must be http://127.0.0.1:..., got '$v'" ;; esac
  done
  [ -n "${GUARD_PAGES_REMOTE:-}" ] || die "test mode needs GUARD_PAGES_REMOTE (a local bare repo)"
  T_PAGES_REMOTE=$GUARD_PAGES_REMOTE
  SRC_REMOTE=${GUARD_SOURCE_REMOTE:-origin}
  T_SITE=${GUARD_SITE:-}
  HEALTH_URL=${GUARD_HEALTH_URL:-}
  [ -z "${DEPLOY_APPROVALS:-}" ] || APPROVALS=$DEPLOY_APPROVALS
else
  # The approvals log is fixed outside test mode: only App Builder appends lines to it, after Andy's own yes.
  for v in GUARD_BUILD_CMD GUARD_PAGES_REMOTE GUARD_SOURCE_REMOTE GUARD_SITE GUARD_HEALTH_URL GUARD_NODE_MODULES GUARD_VERIFY_TRIES; do
    [ -z "${!v:-}" ] || die "$v is only allowed in test mode (GUARD_TEST_MODE=1 with local remotes); unset it"
  done
  [ $APPROVALS_GIVEN = 0 ] || die "--approvals is only allowed in test mode; the approvals log is fixed at /workspace/deploy-approvals.log"
  [ -z "${DEPLOY_APPROVALS:-}" ] || die "DEPLOY_APPROVALS is only allowed in test mode; unset it"
[ -z "${DEPLOY_HISTORY:-}" ] || die "DEPLOY_HISTORY is only allowed in test mode; unset it"
fi
case "$T_PAGES_REMOTE" in https://github.com/andrewmunruh/kids-house-game.git|https://github.com/andrewmunruh/cozy-preview.git|/*) ;; *) die "pages remote not allowed: $T_PAGES_REMOTE";; esac
if [ "$TARGET" = production ] && [ "$T_PAGES_REMOTE" = https://github.com/andrewmunruh/cozy-preview.git ]; then die "production target pointed at the preview repo"; fi
if [ "$TARGET" = preview ] && [ "$T_PAGES_REMOTE" = https://github.com/andrewmunruh/kids-house-game.git ]; then die "preview target pointed at the production repo"; fi

echo "TARGET: $(echo "$T_NAME" | tr a-z A-Z)  pages=$T_PAGES_REMOTE  site=${T_SITE:-<none>}  worker=$T_WORKER  $( [ $DRY = 1 ] && echo '(DRY RUN: nothing will be pushed)')"

WORK=$(mktemp -d /tmp/guarded-deploy.XXXXXX)
cleanup() { git worktree remove --force "$WORK/src" >/dev/null 2>&1 || true; rm -rf "$WORK"; }
trap cleanup EXIT
HIST=${DEPLOY_HISTORY:-$(dirname "$APPROVALS")/deploy-history.log}

# Fetch the current gh-pages tip of the chosen target into a scratch repo, then cross-check by CONTENT that this
# repo really serves this target (catches a local/test remote, or a mix-up, that the URL check cannot).
fetch_pages() {
  git init -q -b gh-pages "$WORK/pages"
  git -C "$WORK/pages" fetch -q "$T_PAGES_REMOTE" gh-pages || die "could not fetch gh-pages from $T_PAGES_REMOTE"
  PREV=$(git -C "$WORK/pages" rev-parse FETCH_HEAD)
  git -C "$WORK/pages" checkout -q -B gh-pages "$PREV"
  check_repo_content "$PREV" "the current $T_NAME gh-pages tip"
}
check_repo_content() {  # $1 = gh-pages commit; its index.html must load assets from THIS target's base path
  local idx; idx=$(git -C "$WORK/pages" show "$1:index.html" 2>/dev/null || true)
  [ -n "$idx" ] || die "$2 ($1) has no index.html; is $T_PAGES_REMOTE really the $T_NAME pages repo?"
  echo "$idx" | grep -qF "\"${T_BASE}assets/" || die "$2 ($1) does not load assets from $T_BASE: $T_PAGES_REMOTE is not the $T_NAME site (wrong repo?)"
  ! echo "$idx" | grep -qF "\"${T_OTHER_BASE}" || die "$2 ($1) loads from $T_OTHER_BASE: that is the other target's content"
}
push_pages() {
  local new=$1
  # Normal push of gh-pages; no '+', no -f. It only succeeds as a fast-forward of $PREV.
  git -C "$WORK/pages" push "$T_PAGES_REMOTE" "gh-pages:refs/heads/gh-pages"
  local now; now=$(git -C "$WORK/pages" ls-remote "$T_PAGES_REMOTE" refs/heads/gh-pages | cut -f1)
  [ "$now" = "$new" ] || die "after push the remote gh-pages is $now, expected $new"
  echo "remote gh-pages is now $new"
}
hist() { echo "$(date -Iseconds) $*" >> "$HIST"; }

# Approval line (one per approval, appended by hand when Andy says yes). Andy's words stay in this PRIVATE log;
# only the ref tag goes into public commit messages.
#   2026-11-02T13:08:00-06:00 | production | deploy   | <40-hex app sha>       | Andy | ref=<card id or tag> | "<exact words>"
#   2026-11-02T13:08:00-06:00 | production | rollback | <40-hex rollback-to>   | Andy | ref=<card id or tag> | "<exact words>"
check_approval() {  # $1 = action, $2 = sha
  [[ "$REF" =~ ^[A-Za-z0-9._-]{3,64}$ ]] || die "--approval-ref <card id or short tag> is required for a $1 (3-64 of A-Z a-z 0-9 . _ -)"
  [ -f "$APPROVALS" ] || die "no approvals log at $APPROVALS"
  # Fields are compared as plain strings (awk ==), never as a pattern: '.' in a ref is a literal dot.
  LINE=$(awk -F' [|] ' -v t="$T_NAME" -v a="$1" -v h="$2" -v r="ref=$REF" '
    NF==7 && $1 ~ /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9:]{8}([+-][0-9]{2}:[0-9]{2}|Z)$/ && $2==t && $3==a && $4==h && $5=="Andy" && $6==r && $7 ~ /^".+"[ \t]*$/ { l=$0 }
    END { if (l!="") print l }' "$APPROVALS")
  [ -n "$LINE" ] || die "no approval line for target=$T_NAME action=$1 sha=$2 ref=$REF in $APPROVALS (need: <ISO time> | $T_NAME | $1 | $2 | Andy | ref=$REF | \"<exact words>\")"
  APPROVED_AT=$(echo "$LINE" | cut -d'|' -f1 | tr -d ' ')
  date -d "$APPROVED_AT" >/dev/null 2>&1 || die "approval time is not a valid timestamp: $LINE"
  echo "approval: $T_NAME $1 ${2:0:12} ref=$REF at $APPROVED_AT (words kept in the private log only)"
}
check_clean() {
  # node_modules is git-ignored, so git status cannot see it. Instead the installed tree must match the lockfile
  # exactly (npm's hidden node_modules/.package-lock.json vs package-lock.json: same packages, versions, integrity).
  check_node_modules "${GUARD_NODE_MODULES:-$ROOT/node_modules}" "$ROOT/package-lock.json"
  [ -z "$(git status --porcelain --untracked-files=normal)" ] || { git status --short | head -20; die "working tree is dirty (commit or stash first)"; }
  echo "clean"
}

check_node_modules() {  # $1 node_modules dir, $2 package-lock.json
  [ -f "$2" ] || die "no package-lock.json at $2"
  [ -f "$1/.package-lock.json" ] || die "node_modules at $1 was not installed by npm from the lockfile (no .package-lock.json); run npm ci"
  node -e '
const fs=require("fs"),[nm,lf]=process.argv.slice(1);
const L=JSON.parse(fs.readFileSync(lf)).packages||{},H=JSON.parse(fs.readFileSync(nm+"/.package-lock.json")).packages||{},bad=[];
for(const k in H){const b=L[k];if(!b)bad.push("extra "+k);else if(H[k].version!==b.version||(H[k].integrity||"")!==(b.integrity||""))bad.push("differs "+k);}
for(const k in L){if(k!==""&&!H[k]&&!L[k].optional&&!L[k].peer)bad.push("missing "+k);}
if(bad.length){console.log(bad.slice(0,10).join("\n"));process.exit(1);}' "$1" "$2" || die "node_modules does not match package-lock.json (run npm ci)"
}
# ---------------------------------------------------------------- live verification: follow what index.html loads
# Fetch the live index.html, then every URL it actually loads (script src, link href: bundle, CSS, manifest, icons),
# resolved the way a browser would, plus sw.js. Each must be 200 and byte-identical to the deployed tree. Every
# absolute path it loads must start with the target's base path.
verify_live() {
  local tree=$1
  [ -n "$T_SITE" ] || { echo "verify: no site URL in test mode, skipped"; return 0; }
  local tries=${GUARD_VERIFY_TRIES:-60} pause=10; [ "${GUARD_TEST_MODE:-}" = 1 ] && pause=1
  echo "verify: waiting for $T_SITE index.html to match the deployed one (GitHub Pages can take a few minutes)"
  local ok=0
  for i in $(seq 1 "$tries"); do
    if curl -fsS "${T_SITE}index.html?gd=$RANDOM" -o "$WORK/live-index.html" 2>/dev/null && cmp -s "$WORK/live-index.html" "$tree/index.html"; then ok=1; break; fi
    sleep $pause
  done
  [ $ok = 1 ] || die "live index.html never matched the deployed one. Nothing else was changed."
  local origin; origin=$(echo "$T_SITE" | grep -oE '^https?://[^/]+')
  local refs; refs=$(grep -oE '(src|href)="[^"]+"' "$WORK/live-index.html" | sed -E 's/^(src|href)="//; s/"$//' | sort -u)
  [ -n "$refs" ] || die "live index.html loads nothing (no src/href)"
  local bad=0 n=0 url rel ref
  for ref in $refs sw.js; do
    case "$ref" in
      http://*|https://*|//*) echo "verify: $ref is off-site: NOT ALLOWED"; bad=1; continue ;;
      /*) [[ "$ref" == "$T_BASE"* ]] || { echo "verify: $ref is outside base $T_BASE"; bad=1; continue; }
          url=$origin$ref; rel=${ref#"$T_BASE"} ;;
      *) url=$T_SITE$ref; rel=$ref ;;
    esac
    rel=${rel%%\?*}
    [ -f "$tree/$rel" ] || { echo "verify: live index.html loads $ref but the deployed tree has no $rel"; bad=1; continue; }
    local code; code=$(curl -sS -o "$WORK/live.bin" -w '%{http_code}' "$url?gd=$RANDOM" || echo 000)
    if [ "$code" = 200 ] && cmp -s "$WORK/live.bin" "$tree/$rel"; then echo "verify: $ref 200 identical ($(stat -c %s "$WORK/live.bin") B)"; n=$((n+1))
    else echo "verify: $ref http=$code DIFFERENT"; bad=1; fi
  done
  [ $bad = 0 ] || die "live site does not serve exactly the deployed files (see above). Roll back if players are affected."
  echo "verify: OK (index.html + $n files it loads, all identical)"
}

# ---------------------------------------------------------------- verify-only: live site == gh-pages tip
if [ $VERIFY_ONLY = 1 ]; then
  fetch_pages; echo "gh-pages tip: $PREV"; verify_live "$WORK/pages"; exit 0
fi

# ---------------------------------------------------------------- smoke (explicit step)
if [ $SMOKE = 1 ]; then
  [ -n "$T_SITE" ] || die "smoke needs a site URL"
  # The two-client smoke CREATES A REAL STREET on the target's Worker (cozy-hood for production). On preview that
  # is harmless; on production it leaves a real street in the production Durable Object, so it needs an explicit flag.
  [ "$T_NAME" = preview ] || [ $REAL_STREET_OK = 1 ] || die "production smoke creates a real street on the production Worker. Smoke preview instead, or pass --real-street-ok"
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
  hist "target=$T_NAME smoke rc=$rc logs=$L"
  [ $rc = 0 ] && echo "SMOKE: OK" || echo "SMOKE: FAILED"
  exit $rc
fi

# ---------------------------------------------------------------- rollback (normal push of the old tree on top)
if [ -n "$ROLLBACK_TO" ]; then
  [[ "$ROLLBACK_TO" =~ ^[0-9a-f]{40}$ ]] || die "--rollback-to needs a full 40-hex gh-pages SHA"
  [[ "$EXPECT_TIP" =~ ^[0-9a-f]{40}$ ]] || die "--rollback-to also needs --expect-tip <current gh-pages SHA>"
  step "rollback 1. working tree is clean"; check_clean
  step "rollback 2. approval recorded in $APPROVALS"; check_approval rollback "$ROLLBACK_TO"
  step "rollback 3. $T_NAME gh-pages to the tree of $ROLLBACK_TO"
  fetch_pages
  [ "$PREV" = "$EXPECT_TIP" ] || die "gh-pages tip is $PREV, not --expect-tip $EXPECT_TIP (someone deployed since?)"
  git -C "$WORK/pages" merge-base --is-ancestor "$ROLLBACK_TO" "$PREV" || die "$ROLLBACK_TO is not an earlier gh-pages commit"
  check_repo_content "$ROLLBACK_TO" "rollback target"
  NEW=$(git -C "$WORK/pages" -c user.name=andrewmunruh -c user.email=andrewmunruh@users.noreply.github.com \
        commit-tree "$ROLLBACK_TO^{tree}" -p "$PREV" -m "rollback $T_NAME to ${ROLLBACK_TO:0:7} (tree of $ROLLBACK_TO)" -m "Approval-Ref: $REF ($APPROVED_AT)")
  git -C "$WORK/pages" update-ref refs/heads/gh-pages "$NEW"
  git -C "$WORK/pages" checkout -q -f gh-pages
  echo "previous gh-pages: $PREV"; echo "rollback commit:   $NEW (same files as $ROLLBACK_TO)"
  echo "undo this rollback: $0 --$T_NAME --rollback-to $PREV --expect-tip $NEW --approval-ref <new ref>"
  if [ $DRY = 1 ]; then echo "DRY RUN: not pushing."; exit 0; fi
  hist "target=$T_NAME ROLLBACK PENDING prev=$PREV new=$NEW tree_of=$ROLLBACK_TO ref=$REF"
  push_pages "$NEW"
  hist "target=$T_NAME ROLLBACK PUSHED prev=$PREV new=$NEW tree_of=$ROLLBACK_TO ref=$REF"
  step "rollback 4. verify the live site serves the rolled-back files"
  verify_live "$WORK/pages"
  hist "target=$T_NAME ROLLBACK VERIFIED prev=$PREV new=$NEW tree_of=$ROLLBACK_TO ref=$REF"
  echo "ROLLED BACK. Next: run $0 --$T_NAME --smoke"
  exit 0
fi

# ---------------------------------------------------------------- 1. clean tree
step "1. working tree is clean"; check_clean

# ---------------------------------------------------------------- 2. SHA is on main (or the PR head, preview only)
step "2. SHA is merged"
[[ "$SHA" =~ ^[0-9a-f]{40}$ ]] || die "--sha must be the full 40-hex approved SHA"
if [ "$TARGET" = production ] && [ -z "$EXPECT_DIST" ]; then die "production needs --expect-dist <the gate-tested dist of this SHA>"; fi
if [ -n "$EXPECT_DIST" ]; then [ -f "$EXPECT_DIST/index.html" ] || die "--expect-dist $EXPECT_DIST is not a dist directory"; fi
if [ "$TARGET" = production ] && [ -z "$WORKER_VERSION" ]; then die "production needs --worker-version <live $T_WORKER version id> (recorded before the push)"; fi
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
step "3. approval recorded in $APPROVALS"; check_approval deploy "$SHA"

# ---------------------------------------------------------------- 4. Worker unchanged since the live build
step "4. Worker-side files unchanged since the live build"
fetch_pages
LIVE_APP=$(git -C "$WORK/pages" show "$PREV:version.json" 2>/dev/null | sed -n 's/.*"sha": *"\([0-9a-f]\{40\}\)".*/\1/p' || true)
if [ -z "$LIVE_APP" ]; then
  # Older deploys say "deploy Batch N (abc1234)" in the gh-pages commit message.
  SHORT=$(git -C "$WORK/pages" log -1 --format=%B "$PREV" | grep -oE '\(([0-9a-f]{7,40})\)' | tr -d '()' | head -1 || true)
  [ -n "$SHORT" ] && LIVE_APP=$(git rev-parse -q --verify "$SHORT^{commit}" 2>/dev/null || true)
fi
worker_ok_approval() {  # production: --worker-changed-ok needs its own approval line (action worker-changed, same SHA)
  [ "$T_NAME" = production ] || return 0
  local keep=$APPROVED_AT; check_approval worker-changed "$SHA"; APPROVED_AT=$keep
}
WORKER_PATHS="server src/shared wrangler.toml package.json package-lock.json"
if [ -z "$LIVE_APP" ]; then
  [ $WORKER_OK = 1 ] || die "cannot tell which app SHA is live on $T_NAME (no version.json or (sha) in the gh-pages message). Check by hand, then pass --worker-changed-ok."
  worker_ok_approval
  echo "live app SHA unknown; --worker-changed-ok given"
else
  CHANGED=$(git diff --name-only "$LIVE_APP" "$SHA" -- $WORKER_PATHS | tr '\n' ' ')
  echo "live app SHA: $LIVE_APP"
  if [ -n "$CHANGED" ]; then
    [ $WORKER_OK = 1 ] || die "Worker-side files changed since the live build: $CHANGED. Deploy/verify the $T_WORKER Worker first (separate approval), then pass --worker-changed-ok."
  worker_ok_approval
    echo "Worker-side files changed ($CHANGED); --worker-changed-ok given"
  else echo "$WORKER_PATHS unchanged: the live $T_WORKER Worker stays compatible"; fi
fi
# Record the live Worker before anything is pushed: the version id the operator read (wrangler deployments / dashboard)
# and a read-only health probe of the Worker itself.
HEALTH=skipped
if [ -n "$HEALTH_URL" ]; then
  HEALTH=$(curl -fsS -m 15 "$HEALTH_URL" 2>/dev/null | tr -d '\n ' || true)
  [ "$HEALTH" = '{"ok":true}' ] || die "the $T_WORKER Worker health check ($HEALTH_URL) did not answer {\"ok\":true} (got '${HEALTH:-nothing}')"
fi
echo "live Worker: $T_WORKER version=${WORKER_VERSION:-<not given>} health=$HEALTH"

# ---------------------------------------------------------------- 5. build twice, byte-identical, target-checked
step "5. build $SHA for $T_NAME (twice, must be byte-identical)"
# Disable any checkout hooks from the caller's repo: the worktree is for building only.
git -c core.hooksPath=/dev/null worktree add -q --detach "$WORK/src" "$SHA"
NM=${GUARD_NODE_MODULES:-$ROOT/node_modules}
[ -d "$NM" ] || die "no node_modules at $NM (npm ci first)"
ln -s "$(readlink -f "$NM")" "$WORK/src/node_modules"
# Every VITE_* variable from the caller's shell is dropped (a leftover VITE_STORE_PREFIX / VITE_BASE from a preview
# build would otherwise override .env.production), then the target's values are set explicitly.
# The build runs in an EMPTY environment (env -i) plus PATH and HOME and the target's values: nothing from the caller's
# shell reaches vite (a leftover VITE_STORE_PREFIX/VITE_BASE, NODE_ENV=development, NODE_OPTIONS, ...).
LEFT=$(compgen -e | grep -E '^(VITE_|NODE_ENV$|NODE_OPTIONS$|BABEL_ENV$)' | tr '\n' ' ' || true)
[ -z "$LEFT" ] || echo "build env: ignoring caller's $LEFT(the build gets only PATH, HOME and the target values)"
CLEAN=(-i PATH="$PATH" HOME="$HOME")
[ "${GUARD_TEST_MODE:-}" = 1 ] && [ -n "${FAKE_MODE:-}" ] && CLEAN+=(FAKE_MODE="$FAKE_MODE")   # test fixture knob only
TENV=(VITE_BASE="$T_BASE" VITE_HOOD_URL="$T_HOOD"); [ -n "$T_PREFIX" ] && TENV+=(VITE_STORE_PREFIX="$T_PREFIX")
build() {
  local out=$1
  if [ -n "${GUARD_BUILD_CMD:-}" ]; then
    (cd "$WORK/src" && env "${CLEAN[@]}" "${TENV[@]}" OUT="$out" bash -c "$GUARD_BUILD_CMD") > "$out.log" 2>&1 || { tail -20 "$out.log"; die "build failed"; }
  else
    ( cd "$WORK/src" && env "${CLEAN[@]}" "${TENV[@]}" bash -c 'npx tsc --noEmit && npx vite build --outDir "$0" --emptyOutDir' "$out" ) > "$out.log" 2>&1 || { tail -20 "$out.log"; die "build failed"; }
  fi
  if [ "$T_NAME" = preview ]; then
    sed -i 's/"name": "Cozy House", "short_name": "Cozy House"/"name": "Cozy Preview", "short_name": "Cozy Preview"/' "$out/manifest.webmanifest"
  fi
}
build "$WORK/dist"; build "$WORK/dist2"
if ! diff -r -q "$WORK/dist" "$WORK/dist2" >"$WORK/rebuild.diff" 2>&1; then head "$WORK/rebuild.diff"; die "two builds of $SHA differ: build is not reproducible"; fi
echo "byte-identical rebuild: OK ($(find "$WORK/dist" -type f | wc -l) files)"
if [ -n "$EXPECT_DIST" ]; then
  if ! diff -r -q -x .nojekyll -x version.json "$WORK/dist" "$EXPECT_DIST" >"$WORK/expect.diff" 2>&1; then head "$WORK/expect.diff"; die "build differs from the gate-tested dist $EXPECT_DIST"; fi
  echo "byte-identical to the gate-tested dist $EXPECT_DIST: OK"
fi
# Target checks always run (the test build must produce real target output too).
D=$WORK/dist
grep -q "\"name\": \"$T_MANIFEST_NAME\"" "$D/manifest.webmanifest" 2>/dev/null || die "manifest name is not '$T_MANIFEST_NAME'"
! grep -rqF "$T_MUST_NOT_CONTAIN" "$D" || die "$T_NAME build contains '$T_MUST_NOT_CONTAIN' (wrong target config)"
grep -rqF "$T_HOOD" "$D/assets" || die "$T_NAME build does not point at $T_HOOD"
ABS=$(grep -oE '(src|href)="/[^"]*"' "$D/index.html" | sed -E 's/^(src|href)="//; s/"$//' || true)
[ -n "$ABS" ] || die "index.html loads no assets by absolute path (expected ${T_BASE}assets/...)"
for p in $ABS; do [[ "$p" == "$T_BASE"* ]] || die "index.html loads $p: asset base is not $T_BASE"; done
grep -qF "\"${T_BASE}assets/index-" "$D/index.html" || die "index.html does not load its bundle from ${T_BASE}assets/"
JS=$(find "$D/assets" -name '*.js')
grep -qF "serviceWorker.register" $JS || die "$T_NAME build has no serviceWorker.register call (built with NODE_ENV=development or a non-production mode?)"
if [ -n "$T_PREFIX" ]; then
  grep -qF "\"$T_PREFIX\"" $JS || die "preview build has no '$T_PREFIX' store prefix: it would read and write the real save"
  grep -qE "$PREVIEW_RIBBON" $JS || die "preview build has no PREVIEW ribbon"
else
  ! grep -qF '"preview:"' $JS || die "production build contains the 'preview:' store prefix (leftover preview env?)"
  ! grep -qE "$PREVIEW_RIBBON" $JS || die "production build contains the PREVIEW ribbon (leftover preview env?)"
fi
echo "target config: base $T_BASE, manifest '$T_MANIFEST_NAME', hood $T_HOOD, service worker registered, prefix '${T_PREFIX:-<none>}', ribbon $( [ -n "$T_PREFIX" ] && echo present || echo absent ), no '$T_MUST_NOT_CONTAIN'"
BUNDLE=$(grep -o 'assets/index-[A-Za-z0-9_-]*\.js' "$D/index.html" | head -1 || true)
echo "bundle: ${BUNDLE:-<none>}"

# ---------------------------------------------------------------- 6. commit on top of gh-pages, show rollback
step "6. commit dist on top of $T_NAME gh-pages"
find "$WORK/pages" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -a "$D/." "$WORK/pages/"; touch "$WORK/pages/.nojekyll"
printf '{"sha": "%s", "target": "%s", "builtAt": "%s"}\n' "$SHA" "$T_NAME" "$(date -Iseconds)" > "$WORK/pages/version.json"
git -C "$WORK/pages" add -A
git -C "$WORK/pages" diff --cached --quiet -- . ':!version.json' && die "the build is identical to what is live on $T_NAME; nothing to deploy"
git -C "$WORK/pages" -c user.name=andrewmunruh -c user.email=andrewmunruh@users.noreply.github.com commit -q \
  -m "deploy $T_NAME (${SHA:0:7})" -m "App-SHA: $SHA" -m "Approval-Ref: $REF ($APPROVED_AT)" -m "Worker: $T_WORKER ${WORKER_VERSION:-unknown}"
NEW=$(git -C "$WORK/pages" rev-parse HEAD)
echo "previous gh-pages: $PREV"
echo "new gh-pages:      $NEW (parent $PREV, fast-forward)"
echo "ROLLBACK (one line): $0 --$T_NAME --rollback-to $PREV --expect-tip $NEW --approval-ref <ref>"

if [ $DRY = 1 ]; then
  echo; echo "DRY RUN complete: every check passed, nothing was pushed. $T_NAME gh-pages is still $PREV."
  exit 0
fi

# ---------------------------------------------------------------- 7. push (normal, never forced)
step "7. push gh-pages to $T_NAME (normal push)"
hist "target=$T_NAME PENDING app=$SHA prev=$PREV new=$NEW bundle=$BUNDLE ref=$REF worker=$T_WORKER@${WORKER_VERSION:-unknown} health=$HEALTH"
push_pages "$NEW"
hist "target=$T_NAME PUSHED app=$SHA prev=$PREV new=$NEW bundle=$BUNDLE ref=$REF"

# ---------------------------------------------------------------- 8. live verification
step "8. verify the live site serves this build"
verify_live "$WORK/pages"
hist "target=$T_NAME VERIFIED new=$NEW"

step "DEPLOYED $T_NAME: gh-pages $PREV..$NEW, bundle $BUNDLE"
echo "NEXT (required): post-deploy smoke:  $0 --$T_NAME --smoke"
echo "ROLLBACK:                            $0 --$T_NAME --rollback-to $PREV --expect-tip $NEW --approval-ref <ref>"
