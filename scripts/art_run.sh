#!/bin/bash
# Optional helper (not used by the build): preclean + process + bounds lint for one item.
# usage: PY=python LINTPY=python ITEMS=/tmp/items.json RAW=work/raw [LOW=0.3 ...] scripts/art_run.sh group item [T]
set -e; cd "$(dirname "$0")/.."
PY=${PY:-python3}; LINTPY=${LINTPY:-$PY}; RAW=${RAW:-work/raw}
RAW=$RAW LOW=${LOW-0.3} $PY scripts/art_preclean.py "$2" "${3:-110}"
$PY scripts/art_process_open.py "$ITEMS" "$RAW" "$1" "$2"
$LINTPY tests/art_bounds.py "$ITEMS" . "$2"
