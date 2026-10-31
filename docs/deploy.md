# Deploying Cozy House (guarded)

All web deploys go through `scripts/guarded-deploy.sh`. The old `deploy.sh` and `deploy-preview.sh`
force-pushed `gh-pages` and are retired: they now print a refusal and exit 3. The Worker
(`npm run worker:deploy`) is separate and is not touched by this script.

## Targets (fixed, never mixed)

| flag | pages repo | site | build | Worker |
|---|---|---|---|---|
| `--production` | andrewmunruh/kids-house-game `gh-pages` | https://andrewmunruh.github.io/kids-house-game/ | default base, `.env.production` (cozy-hood) | cozy-hood |
| `--preview` | andrewmunruh/cozy-preview `gh-pages` | https://andrewmunruh.github.io/cozy-preview/ | `VITE_BASE=/cozy-preview/`, `VITE_HOOD_URL=cozy-hood-preview`, `VITE_STORE_PREFIX=preview:`, manifest "Cozy Preview" | cozy-hood-preview |

You must give exactly one of the two flags. There is no default and no URL option.

## 1. Record the approval

Append one line to `/workspace/deploy-approvals.log` (or pass `--approvals FILE`). It lives outside the
repo, so the tree stays clean. Use Andy's exact words and the time he said them:

    2026-10-31T05:37:00-05:00 | production | e100cc11c594fffd07807f1e167933ad911757ba | Andy | "yes ship batch 2 to prod"

The line must have an ISO time with offset, the target, the full 40-hex SHA, `Andy`, and non-empty quoted words.
An approval for preview does not count for production, and an approval for one SHA does not count for another.

## 2. Dry run (always first)

    scripts/guarded-deploy.sh --production --sha <sha> --expect-dist <gate-tested dist> --dry-run

This does everything except the push. It:

1. refuses a dirty working tree (modified or untracked files);
2. refuses a SHA that is not reachable from `origin/main`. Preview may also take the exact head of a PR
   with `--pr N`;
3. refuses if the approval line is missing;
4. reads the live app SHA (from `version.json` on gh-pages, or `(abc1234)` in older deploy messages) and refuses if
   `server/`, `src/shared/` or `wrangler.toml` changed since then. If the Worker was deliberately deployed
   and verified first, with its own approval, pass `--worker-changed-ok`;
5. builds the SHA in a temp worktree **twice** and refuses unless the builds are byte-identical. With `--expect-dist`
   the build must also be byte-identical to the dist the gate tested. It checks the target config (manifest name,
   hood URL, no strings from the other target);
6. commits the dist (plus `.nojekyll` and `version.json`) **on top of** the fetched gh-pages tip, then prints the
   previous gh-pages SHA and a one-line rollback command.

## 3. Deploy

Run the same command without `--dry-run`. After step 6 it:

7. pushes `gh-pages` normally (no `-f`, no `+`). This works only as a fast-forward of the tip it just fetched;
8. curls the live `index.html` until it serves the new bundle, then checks `index.html`, `sw.js`, the manifest, the
   bundle and the CSS: each must return 200 and match the build byte for byte. It appends a line to
   `/workspace/deploy-history.log`.

It does **not** fast-forward `main`. Do that yourself if the deploy came from a PR head.

## 4. Smoke (explicit, required)

    scripts/guarded-deploy.sh --production --smoke     # or --preview --smoke

This runs under `/workspace/surprise/gate.lock`: `tests/testnav_portrait_test.py` and `tests/ui_contrast_touch_test.py`
against the live URL, then `tests/smoke_two_client.py` (new live client plus the old 10ef736 client from `OLD_DIST`)
in Chromium and WebKit. Logs go to `work/smoke-<target>-<time>/`. `v3_prod_check.py` is not in the repo yet, so
run it by hand as before.

## Rollback

    scripts/guarded-deploy.sh --production --rollback-to <previous gh-pages SHA> --expect-tip <current gh-pages SHA>

This makes a new gh-pages commit whose files are exactly those of the old commit, and pushes it normally (history is
kept, nothing is forced). It refuses if gh-pages has moved since `--expect-tip`. `--dry-run` works here too.
Run the smoke step afterwards.

## Re-checking a live deploy

    scripts/guarded-deploy.sh --production --verify-only

This fetches the gh-pages tip and curls the live site: the bundle, CSS, `index.html`, `sw.js` and manifest must all be 200 and
byte-identical to it. It is read-only.

## Tests

`tests/deploy_guard_test.sh` runs every guard against throwaway local bare repos (`GUARD_TEST_MODE=1`, which refuses
any non-local remote and fakes the build). It never contacts GitHub.
