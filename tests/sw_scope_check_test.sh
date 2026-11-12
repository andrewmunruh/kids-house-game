#!/usr/bin/env bash
# tests/sw_scope_check_test.sh: the post-deploy preview runtime check (guarded-deploy.sh --preview --check-sw)
# against a LOCAL 127.0.0.1 server only (GUARD_TEST_MODE=1; the page is not allowed to reach any other host).
#   positive: a real preview build served at /cozy-preview/ -> registration for /cozy-preview/ found
#   negative: the same build without sw.js -> refused;  a page that registers nothing -> refused
# SW_SCOPE_DIST=<preview dist> reuses a build; otherwise HEAD is built with the preview env (empty env, like the guard).
set -uo pipefail
REPO=$(cd "$(dirname "$0")/.." && pwd); SCRIPT=${GUARD_SCRIPT:-$REPO/scripts/guarded-deploy.sh}
T=$(mktemp -d /tmp/sw-scope-test.XXXXXX); HTTP_PID=
trap '[ -n "$HTTP_PID" ] && kill $HTTP_PID 2>/dev/null; rm -rf "$T"' EXIT
PASS=0 FAIL=0
ok() { echo "PASS $1"; PASS=$((PASS+1)); }; bad() { echo "FAIL $1"; sed 's/^/  | /' "$T/out" | tail -15; FAIL=$((FAIL+1)); }
D=${SW_SCOPE_DIST:-}
if [ -z "$D" ]; then
  D=$T/build; ( cd "$REPO" && env -i PATH="$PATH" HOME="$HOME" VITE_BASE=/cozy-preview/ VITE_HOOD_URL=https://cozy-hood-preview.andrewmunruh.workers.dev VITE_STORE_PREFIX=preview: npx vite build --outDir "$D" --emptyOutDir ) > "$T/build.log" 2>&1 || { tail -20 "$T/build.log"; echo "build failed"; exit 1; }
fi
mkdir -p "$T/pages" "$T/w1" "$T/w2" "$T/w3/cozy-preview"
cp -a "$D" "$T/w1/cozy-preview"                                   # full preview build
cp -a "$D" "$T/w2/cozy-preview"; rm -f "$T/w2/cozy-preview/sw.js"  # same build, sw.js missing (register fails)
echo '<!doctype html><title>no sw</title><p>plain page</p>' > "$T/w3/cozy-preview/index.html"   # registers nothing
PIDS=(); PORTS=()
for w in w1 w2 w3; do
  p=$(python3 -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1])')
  python3 -m http.server "$p" --bind 127.0.0.1 --directory "$T/$w" >/dev/null 2>&1 & PIDS+=($!); PORTS+=("$p")
  for i in $(seq 50); do curl -fs "http://127.0.0.1:$p/cozy-preview/" >/dev/null && break; sleep 0.1; done
done
HTTP_PID="${PIDS[*]}"
chk() { GUARD_TEST_MODE=1 GUARD_PAGES_REMOTE="$T/pages" GUARD_SITE="http://127.0.0.1:$1/cozy-preview/" "$SCRIPT" --preview --check-sw > "$T/out" 2>&1; echo $? > "$T/rc"; }
rc() { cat "$T/rc"; }; has() { grep -q -- "$1" "$T/out"; }
chk "${PORTS[0]}"
[ "$(rc)" = 0 ] && has 'sw-scope: OK (registration for /cozy-preview/ serving /cozy-preview/sw.js)' && ok "preview build: registration for /cozy-preview/ found (local server)" || bad "positive"
chk "${PORTS[1]}"
[ "$(rc)" = 3 ] && has 'REFUSED: sw-scope: no service-worker registration for /cozy-preview/' && ok "same build without sw.js: refused" || bad "no sw.js"
chk "${PORTS[2]}"
[ "$(rc)" = 3 ] && has 'REFUSED: sw-scope' && ok "page that registers nothing: refused" || bad "plain page"
GUARD_TEST_MODE=1 GUARD_PAGES_REMOTE="$T/pages" GUARD_SITE="http://127.0.0.1:${PORTS[0]}/cozy-preview/" "$SCRIPT" --production --check-sw > "$T/out" 2>&1; echo $? > "$T/rc"
[ "$(rc)" = 3 ] && has 'is for --preview only' && ok "--check-sw refused for production" || bad "prod refused"
echo; echo "sw_scope_check_test: $PASS passed, $FAIL failed"; [ $FAIL = 0 ]
