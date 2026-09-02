# givan.se

Personal static site for [givan.se](https://givan.se) (Netlify project `givanse`). Markdown posts, about, Disqus, and share buttons. Svelte 5, SvelteKit, Vite, `@sveltejs/adapter-static`.

**Production branch is `svelte`** (SvelteKit migration). Requires Node.js 18.13 or newer.

## Developing

```bash
npm install
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

```bash
npm run build
```

The static output is written to `build/` (the Netlify publish directory). Preview it with `npm run preview`.

## Deliberate Netlify deploys (shared 300 credits/month)

All sites on this Netlify account share **300 credits/month**. A production deploy costs ~15 credits. Do not auto-ship every push to `svelte`. Do **not** burn a production deploy just to land `netlify.toml` or the ignore script.

Site settings and publishes are **CLI only** (`netlify` / `netlify api`). `skip_prs` is already true. `allowed_branches` is already `["svelte"]` (`broccoli-taco` removed) via `netlify api updateSite`. **`stop_builds` stays false.**

### How to ship https://givan.se

Intentional production publish is **`netlify deploy --prod`** or a **build hook POST**.

```bash
# from a linked clone (site name givanse); builds then publishes production
netlify deploy --prod --site givanse
```

**Build hook** (always builds; Netlify does not honor `ignore` for hooks):

```bash
# once
netlify api createSiteBuildHook --data '{"site_id":"givanse","body":{"title":"manual svelte","branch":"svelte"}}'
# each ship
curl -sS -X POST -d '{}' "$HOOK_URL"
```

### Squash-merge without shipping

Unless the merge **is** the intentional ship, squash-merge with **`[skip netlify]`** in the squash commit message so Netlify does not start a production build:

```text
Explicit Netlify deploys only (skip PR previews, path ignore on prod) [skip netlify]

Closes #41
```

This ignore/README/toml PR is **not** an intentional ship — squash with `[skip netlify]`, then ship later with `netlify deploy --prod` or a hook POST when the live site should change.

### Repo policy (`netlify.toml`)

- **No Deploy Preview on every PR:** `[context.deploy-preview] ignore = "exit 0"`. `skip_prs` is already true via CLI.
- **Production path ignore (safety net):** `bash ./scripts/netlify-ignore.sh` skips when `src/`, `static/`, and SvelteKit/Vite config did not change. It **fails open** (runs the build) if `CACHED_COMMIT_REF` / `COMMIT_REF` are missing or git cannot tell. It **honors `[build].base`** by diffing from `NETLIFY_REPO_PATH` (or git toplevel) so a leftover Base directory cannot always-skip real site paths.
- **`stop_builds` stays false.** That would also block `netlify deploy --prod` and build hooks.

Header or CSP edits in `netlify.toml` reach the CDN only on an intentional ship (`netlify deploy --prod` or hook POST).

### FLAG: `allowed_branches` leftover (already fixed via CLI)

`repo_branch` is **`svelte`**. `allowed_branches` **used to** list leftover **`broccoli-taco`**. It is already `["svelte"]` via `netlify api updateSite`. If it regresses:

```bash
netlify api updateSite --data '{"site_id":"givanse","body":{"build_settings":{"repo_branch":"svelte","allowed_branches":["svelte"],"skip_prs":true,"stop_builds":false}}}'
```
