#!/usr/bin/env bash
# tests/deploy_guard_mutation_test.sh: proves tests/deploy_guard_test.sh notices when a guard is removed.
# Each mutation deletes or disables ONE check in a temp copy of scripts/guarded-deploy.sh; the guard tests run
# against that copy (GUARD_SCRIPT) and must report at least one FAIL. Local temp repos only, like the guard tests.
set -uo pipefail
REPO=$(cd "$(dirname "$0")/.." && pwd)
SRC=$REPO/scripts/guarded-deploy.sh
M=$(mktemp -d /tmp/deploy-guard-mut.XXXXXX); trap 'rm -rf "$M"' EXIT
PASS=0 FAIL=0
# name | perl substitution applied to the script (must change it)
MUTS=(
  'manifest check removed|s/^grep -q "\\"name\\": \\"\$T_MANIFEST_NAME.*$/true/m'
  'must-not-contain (other hood) check removed|s/^! grep -rqF "\$T_MUST_NOT_CONTAIN".*$/true/m'
  'hood check removed|s/^grep -rqF "\$T_HOOD".*$/true/m'
  'asset base check removed|s/^for p in \$ABS.*$/true/m'
  'preview prefix/ribbon checks removed|s/^if \[ -n "\$T_PREFIX" \]; then\n.*?\nfi\n/true\n/ms'
  'build env not emptied (no env -i: caller VITE_*/NODE_ENV leak)|s/^CLEAN=\(-i PATH="\$PATH" HOME="\$HOME"\)/CLEAN=(PATH="\$PATH")/m'
  'service-worker register check removed|s/^grep -qE "\$SW_REGISTER_RE" \$JS \|\| die/true || die/m'
  'register check loosened to any .register( call|s/^SW_REGISTER_RE=.*$/SW_REGISTER_RE="\\.register\\("/m'
  'approval ref compared as a pattern (M2)|s/\$6==r/\$6 ~ r/'
  'approval ref compared as a prefix (M2)|s/\$6==r/index(\$6, r)==1/'
  '--approvals allowed outside test mode|s/\[ \$APPROVALS_GIVEN = 0 \] \|\| die/true || die/'
  'DEPLOY_APPROVALS allowed outside test mode|s/\[ -z "\$\{DEPLOY_APPROVALS:-\}" \] \|\| die/true || die/'
  'DEPLOY_HISTORY allowed outside test mode|s/\[ -z "\$\{DEPLOY_HISTORY:-\}" \] \|\| die/true || die/'
  'production --worker-changed-ok without its own approval|s/\[ "\$T_NAME" = production \] \|\| return 0/return 0/'
  'rollback VERIFIED history line dropped|s/^  hist "target=\$T_NAME ROLLBACK VERIFIED.*$/  true/m'
  'node_modules lockfile check removed|s/^  check_node_modules "\$\{GUARD_NODE_MODULES.*$/  true/m'
  'repo content cross-check removed|s/^  check_repo_content "\$PREV".*$/  true/m'
  'wrangler.toml dropped from the Worker check|s/ wrangler\.toml / /'
  'package.json dropped from the Worker check|s/ package\.json / /'
  'live curl check removed|s/^verify_live\(\) \{\n/verify_live() { echo "verify: OK"; return 0;\n/m'
  'after-push tip check removed|s/^  \[ "\$now" = "\$new" \] \|\| die.*$/  true/m'
  'unknown live build allowed without override|s/\[ \$WORKER_OK = 1 \] \|\| die "cannot tell/true || die "cannot tell/'
  'rollback approval removed|s/check_approval rollback "\$ROLLBACK_TO"/APPROVED_AT=x/'
  'rollback clean-tree check removed|s/(rollback 1\. working tree is clean"); check_clean/$1; true/'
  'production --expect-dist not mandatory|s/die "production needs --expect-dist/true "/'
  'GUARD_BUILD_CMD allowed outside test mode|s/for v in GUARD_BUILD_CMD /for v in /'
  'Worker health probe ignored|s/\[ "\$HEALTH" = .\{"ok":true\}. \] \|\| die/true || die/'
)
for m in "${MUTS[@]}"; do
  name=${m%%|*} sub=${m#*|}
  perl -0pe "$sub" "$SRC" > "$M/g.sh"; chmod +x "$M/g.sh"
  if cmp -s "$SRC" "$M/g.sh"; then echo "FAIL mutation did not apply: $name"; FAIL=$((FAIL+1)); continue; fi
  bash -n "$M/g.sh" || { echo "FAIL mutation broke syntax: $name"; FAIL=$((FAIL+1)); continue; }
  GUARD_SCRIPT="$M/g.sh" bash "$REPO/tests/deploy_guard_test.sh" > "$M/log" 2>&1
  caught=$(grep -c '^FAIL ' "$M/log")
  if [ "$caught" -gt 0 ]; then echo "PASS caught: $name ($(grep '^FAIL ' "$M/log" | head -2 | sed 's/^FAIL //' | paste -sd';'))"; PASS=$((PASS+1))
  else echo "FAIL NOT caught: $name"; FAIL=$((FAIL+1)); fi
done
echo; echo "deploy_guard_mutation_test: $PASS caught, $FAIL not caught"
[ $FAIL = 0 ]
