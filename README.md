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

Gastón prefers the **Netlify CLI** (`netlify api` / `netlify deploy --trigger`) for site settings and publishes.

### How to ship https://givan.se

Linked git production build of `svelte` (does not upload the laptop working tree):

```bash
# site name works as --site; or use the Project ID / NETLIFY_SITE_ID
netlify deploy --trigger --prod --site givanse
```

Same via the API (empty POST = git build of the production branch):

```bash
netlify api createSiteBuild --data '{"site_id":"givanse"}'
```

**Build hook** (always builds; Netlify does not honor `ignore` for hooks):

```bash
# once: create a hook on svelte
netlify api createSiteBuildHook --data '{"site_id":"givanse","body":{"title":"manual svelte","branch":"svelte"}}'
# then, whenever you want a production deploy:
curl -sS -X POST -d '{}' "$HOOK_URL"
```

`netlify deploy --prod` without `--trigger` uploads **local** files. Use `--trigger` (or `createSiteBuild` / a hook) unless you intend a CLI file deploy.

### Repo policy (`netlify.toml`)

- **No Deploy Preview on every PR:** `[context.deploy-preview] ignore = "exit 0"`. **`skip_prs` is already true** — leave it on. If it ever flips: `netlify api updateSite` with `build_settings.skip_prs = true`.
- **Production path ignore (safety net):** `bash ./scripts/netlify-ignore.sh` skips when `src/`, `static/`, and SvelteKit/Vite config did not change. It **fails open** (runs the build) if `CACHED_COMMIT_REF` / `COMMIT_REF` are missing or git cannot tell. It **honors `[build].base`** by diffing from `NETLIFY_REPO_PATH` (or git toplevel) so a leftover Base directory cannot always-skip real site paths.
- **Do not set `stop_builds`.** That also blocks `--trigger`, `createSiteBuild`, and build hooks.

Merging README / ignore / toml-only changes should **not** publish a new production site. Header or CSP edits in `netlify.toml` still need `--trigger`, `createSiteBuild`, or a build hook to reach the CDN.

### FLAG: `allowed_branches` leftover (already fixed via CLI)

Netlify `repo_branch` is **`svelte`**. `allowed_branches` **used to** still list leftover **`broccoli-taco`** (not `svelte`) from before the SvelteKit migration. That list is **already** `["svelte"]` via `netlify api updateSite` (`broccoli-taco` removed).

If it regresses:

```bash
netlify api updateSite --data '{"site_id":"givanse","body":{"build_settings":{"repo_branch":"svelte","allowed_branches":["svelte"]}}}'
```

`skip_prs` is already true. Leave **`stop_builds` false**.
