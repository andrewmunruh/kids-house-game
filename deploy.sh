#!/usr/bin/env bash
# RETIRED in Batch 9: this script force-pushed gh-pages. It now refuses to run.
# Use scripts/guarded-deploy.sh (see docs/deploy.md).
echo "REFUSED: $(basename "$0") is retired (it force-pushed gh-pages). Use scripts/guarded-deploy.sh, see docs/deploy.md." >&2
exit 3
