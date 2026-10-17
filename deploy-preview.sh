#!/usr/bin/env bash
# PREVIEW deploy: never touches production (andrewmunruh/kids-house-game gh-pages or the cozy-hood Worker).
#   1. builds with base /cozy-preview/, the preview server URL, and prefixed localStorage keys ("preview:")
#   2. publishes dist-preview/ to the gh-pages branch of the separate repo andrewmunruh/cozy-preview
# The preview Worker is deployed separately: npx wrangler deploy --env preview
set -e
cd "$(dirname "$0")"
VITE_BASE=/cozy-preview/ VITE_HOOD_URL=https://cozy-hood-preview.andrewmunruh.workers.dev VITE_STORE_PREFIX=preview: \
  npx tsc --noEmit && VITE_BASE=/cozy-preview/ VITE_HOOD_URL=https://cozy-hood-preview.andrewmunruh.workers.dev VITE_STORE_PREFIX=preview: npx vite build --outDir dist-preview --emptyOutDir
sed -i 's/"name": "Cozy House", "short_name": "Cozy House"/"name": "Cozy Preview", "short_name": "Cozy Preview"/' dist-preview/manifest.webmanifest
cd dist-preview && touch .nojekyll && rm -rf .git && git init -q -b gh-pages && git add -A && git -c user.name=andrewmunruh -c user.email=andrewmunruh@users.noreply.github.com commit -qm "preview deploy" && git push -f https://github.com/andrewmunruh/cozy-preview.git gh-pages && rm -rf .git
