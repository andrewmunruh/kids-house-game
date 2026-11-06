# Deploying Cozy House (guarded)

All web deploys go through `scripts/guarded-deploy.sh`. The old `deploy.sh` and `deploy-preview.sh`
force-pushed `gh-pages` and are retired: they now print a refusal and exit 3. The Worker
(`npm run worker:deploy`) is separate and is not touched by this script.

## Targets (fixed, never mixed)

| flag | pages repo | site | build env (set by the script) | Worker |
|---|---|---|---|---|
| `--production` | andrewmunruh/kids-house-game `gh-pages` | https://andrewmunruh.github.io/kids-house-game/ | `VITE_BASE=/kids-house-game/`, `VITE_HOOD_URL=https://cozy-hood.andrewmunruh.workers.dev`, no store prefix, manifest "Cozy House" | cozy-hood |
| `--preview` | andrewmunruh/cozy-preview `gh-pages` | https://andrewmunruh.github.io/cozy-preview/ | `VITE_BASE=/cozy-preview/`, `VITE_HOOD_URL=https://cozy-hood-preview.andrewmunruh.workers.dev`, `VITE_STORE_PREFIX=preview:`, manifest "Cozy Preview" | cozy-hood-preview |

You must give exactly one of the two flags. There is no default and no URL option.

**Build environment.** Vite lets shell variables override `.env.production`, so a `VITE_STORE_PREFIX=preview:` or
`VITE_BASE=/cozy-preview/` left over from a preview build would otherwise go into a production build. Other process env leaks
the same way (`NODE_ENV=development` makes Vite compile out the service-worker registration; `NODE_OPTIONS` changes
node). So the build runs in an **empty** environment: `env -i PATH=$PATH HOME=$HOME` plus the target's `VITE_*` values,
nothing else from your shell (it prints `build env: ignoring caller's ...` when it ignores any). Every build must also
contain the `serviceWorker.register` call, for both targets.

**node_modules.** It is git-ignored, so the clean-tree check cannot see it. Instead the clean-tree step also requires
`node_modules/.package-lock.json` (written by `npm ci`/`npm install`) to list exactly the packages, versions and
integrity hashes of `package-lock.json`. This catches a stale or hand-changed install; it does not hash every file in
`node_modules` (a file edited inside a package is not caught here; the double build and `--expect-dist` limit that).

## 1. Record the approval

**Only App Builder appends approval lines, and only after Andy's own explicit yes.** The operator running the script
never writes one. The log is fixed at `/workspace/deploy-approvals.log`: `--approvals FILE` and `DEPLOY_APPROVALS` are
refused outside test mode. (This stops accidents and SHA/target/ref mix-ups; it is not a security boundary against
someone who can write that file.) It lives outside the
repo, so the tree stays clean, and it is private: Andy's exact words stay in this file only. Public gh-pages
commit messages carry only the **ref** (a card id or short tag) and the approval time.

    <ISO time>                | <target>   | <action> | <40-hex SHA>                             | Andy | ref=<tag>  | "<Andy's exact words>"
    2026-11-02T13:08:00-06:00 | production | deploy   | e0a4cfdd5a14b50c08262130923275136693bf36 | Andy | ref=card-123 | "..."
    2026-11-02T14:00:00-06:00 | production | rollback | 8f31b9d629296016668f08cb614d0541f7cee483 | Andy | ref=rb-7     | "..."

(Single spaces around each `|` in the real line; the columns above are padded for reading.)

- `action` is `deploy` (SHA = the app commit), `rollback` (SHA = the gh-pages commit you roll back **to**), or
  `worker-changed` (SHA = the app commit; needed for `--worker-changed-ok` on production, see step 5).
- Pass the same tag with `--approval-ref <tag>` (alias `--card`). Tags are 3-64 characters of `A-Z a-z 0-9 . _ -`.
  Every field is compared as an exact plain string: `card.43` does not match `ref=card-43`, and `card-4` does not
  match `ref=card-43`.
- An approval for preview does not count for production, a deploy approval does not count for a rollback, and an
  approval for one SHA or ref does not count for another. The old 5-field format is no longer accepted.

## 2. Dry run (always first)

    scripts/guarded-deploy.sh --production --sha <sha> --approval-ref <tag> \
      --expect-dist <gate-tested dist> --worker-version <live cozy-hood version id> --dry-run

For production, `--expect-dist` and `--worker-version` are **mandatory**. Read the version id from
`npx wrangler deployments list --name cozy-hood` or the Cloudflare dashboard. The script does not log in to
Cloudflare: it records the id you give it, and it probes `https://cozy-hood.andrewmunruh.workers.dev/api/health`
read-only, which must answer `{"ok":true}`. Both are optional for preview, but the health probe always runs.

The dry run does everything except the push. It:

1. refuses a dirty working tree (modified or untracked files);
2. refuses a SHA that is not reachable from `origin/main`. Preview may also take the exact head of a PR
   with `--pr N`;
3. refuses if the approval line is missing (see above);
4. fetches the target's gh-pages and cross-checks its **content**: the live `index.html` must load assets from the
   target's base path (`/kids-house-game/` or `/cozy-preview/`) and not from the other one;
5. reads the live app SHA (from `version.json` on gh-pages, or `(abc1234)` in older deploy messages) and refuses if
   `server/`, `src/shared/`, `wrangler.toml`, `package.json` or `package-lock.json` changed since then. It also
   refuses when it cannot tell which build is live. If the Worker was deliberately deployed and verified first, with
   its own approval, or you checked the live build by hand, pass `--worker-changed-ok`. On **production** that flag
   also needs its own approval line (`action` = `worker-changed`, same SHA and ref). It is not simply refused for
   production, because a deploy that ships a Worker-side change (after the Worker itself was deployed) would then
   never be possible; preview needs no extra line;
6. records the live Worker (the version id and the health probe);
7. builds the SHA in a temp worktree **twice**, with the cleared and explicit env above, and refuses unless the builds
   are byte-identical and (when given) byte-identical to `--expect-dist`. Then it checks the target:

**Gate dist.** Build `--expect-dist` in a **clean, separate environment** (for example `env -i PATH=$PATH HOME=$HOME` plus the target's `VITE_*` values, or the same empty env the script uses). The script's empty build env stops the caller's shell from leaking into *this* build, but `--expect-dist` is the only check that catches a tampered build tool or a polluted *gate* build of the same SHA. If the gate dist was built in the same polluted shell as a bad deploy candidate, both trees match and the tampering slips through.
   - the manifest name;
   - the hood URL is in the bundle and the other target's hood is not;
   - every absolute `src`/`href` in `index.html` starts with the target's base path;
   - production: **no** `"preview:"` store prefix and **no** PREVIEW ribbon in the JS;
   - preview: the `"preview:"` prefix **and** the PREVIEW ribbon **are** in the JS;
8. commits the dist (plus `.nojekyll` and `version.json`) **on top of** the fetched gh-pages tip. The commit message
   has the app SHA, `Approval-Ref: <tag> (<time>)` and the Worker version. It then prints the previous gh-pages SHA
   and a one-line rollback command.

## 3. Deploy

Run the same command without `--dry-run`. After step 8 it:

9. writes a `PENDING` line to `/workspace/deploy-history.log` (app SHA, previous and new gh-pages SHAs, ref,
   Worker version, health), then pushes `gh-pages` normally (no `-f`, no `+`). This works only as a fast-forward
   of the tip it just fetched. It then checks with `ls-remote` that the remote tip is exactly the new commit, and
   writes a `PUSHED` line;
10. polls the live `index.html` until it is byte-identical to the deployed one. Then it fetches **every URL that
   index.html actually loads** (the script bundle, the stylesheet, the manifest and the icons), resolved the way a
   browser does, plus `sw.js`. Each must return 200 and match the deployed file byte for byte. A path outside the
   base path, or an off-site URL, fails the check. On success it writes a `VERIFIED` line.

It does **not** fast-forward `main`. Do that yourself if the deploy came from a PR head.

## 4. Smoke (explicit, required)

    scripts/guarded-deploy.sh --preview --smoke
    scripts/guarded-deploy.sh --production --smoke --real-street-ok

The smoke runs under `/workspace/surprise/gate.lock`. It runs `tests/testnav_portrait_test.py` and
`tests/ui_contrast_touch_test.py` against the live URL. Then it runs `tests/smoke_two_client.py` in Chromium and WebKit:
the new live client plus the old 10ef736 client from `OLD_DIST`. Logs go to `work/smoke-<target>-<time>/`.

**The two-client smoke creates a real street** on the target's Worker. On preview (cozy-hood-preview) that does no
harm. On production it leaves a real street in the production cozy-hood Durable Object, so production smoke is refused
unless you pass `--real-street-ok`. Prefer smoking preview with the same SHA. If a WebKit or Chromium process dies mid-run
(`TargetClosedError` on every page, no app error), `smoke_two_client.py` retries that size once in a fresh browser and
marks the row `retried_after_browser_crash`. App errors are never retried. `v3_prod_check.py` is not in the repo yet, so
run it by hand as before.

## Rollback

    scripts/guarded-deploy.sh --production --rollback-to <previous gh-pages SHA> --expect-tip <current gh-pages SHA> \
      --approval-ref <tag>

A rollback needs its own approval line (`action` = `rollback`, SHA = the `--rollback-to` commit) and a clean working
tree, the same as a deploy. It makes a new gh-pages commit whose files are exactly those of the old commit, and pushes
it normally: history is kept and nothing is forced. It refuses if gh-pages has moved since `--expect-tip`, or if the old
commit is not the target's content. It writes `PENDING`/`PUSHED` history lines, runs the same live check as a
deploy, and writes a `ROLLBACK VERIFIED` line when the check passes. `--dry-run` works here too. Run the smoke step afterwards.

## Re-checking a live deploy

    scripts/guarded-deploy.sh --production --verify-only

This fetches the gh-pages tip and runs the live check from step 10 against it. It is read-only.

## Tests

- `tests/deploy_guard_test.sh` runs every guard against throwaway local bare repos, plus a `127.0.0.1` http server that
  publishes pushes the way Pages does. It sets `GUARD_TEST_MODE=1`, which refuses any non-local remote or URL and
  uses a fake build that honours `VITE_*` like Vite. It never contacts GitHub or a Worker.
- `GUARD_*` variables, including `GUARD_BUILD_CMD`, are refused outside test mode.
- `tests/deploy_guard_mutation_test.sh` removes one guard at a time from a temp copy of the script and checks that
  the guard tests then fail.
