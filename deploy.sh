#!/usr/bin/env bash
# Publish dist/ to the gh-pages branch (GitHub Pages source).
set -e
cd dist && touch .nojekyll && rm -rf .git && git init -q -b gh-pages && git add -A && git -c user.name=andrewmunruh -c user.email=andrewmunruh@users.noreply.github.com commit -qm "deploy" && git push -f "$(cd .. && git remote get-url origin)" gh-pages && rm -rf .git
