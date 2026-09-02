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

### How to ship https://givan.se

1. **Trigger deploy** (usual path)
   - Open [Deploys](https://app.netlify.com/projects/givanse/deploys) for project `givanse`
   - **Trigger deploy** → **Deploy site** (production branch `svelte`)
2. **Build hook** (always builds; Netlify does not honor `ignore` for hooks)
   - **Project configuration** → **Build & deploy** → **Continuous deployment** → **Build hooks**
   - Add a hook on branch `svelte`, then `POST` the hook URL

There is no GitHub Actions `workflow_dispatch` deploy today.

### Repo policy (`netlify.toml`)

- **No Deploy Preview on every PR:** `[context.deploy-preview] ignore = "exit 0"`. UI **`skip_prs` is already true** — leave it on.
- **Production path ignore (safety net):** `bash ./scripts/netlify-ignore.sh` skips when `src/`, `static/`, and SvelteKit/Vite config did not change. It **fails open** (runs the build) if `CACHED_COMMIT_REF` / `COMMIT_REF` are missing or git cannot tell. It **honors `[build].base`** by diffing from `NETLIFY_REPO_PATH` (or git toplevel) so a leftover UI base cannot always-skip real site paths.
- **Do not set `stop_builds`.** That also blocks Trigger deploy and build hooks.

Merging README / ignore / toml-only changes should **not** publish a new production site. Header or CSP edits in `netlify.toml` still need a Trigger deploy or build hook to reach the CDN.

### FLAG: leftover `allowed_branches` is still `broccoli-taco`

Netlify `build_settings.repo_branch` is **`svelte`**, but **`allowed_branches` still includes leftover `broccoli-taco` (not `svelte`)**. That is stale from before the SvelteKit migration. This repo cannot change it.

**Gastón should set Allowed branches to `svelte` (and remove `broccoli-taco`) in the Netlify UI:**

1. Open [Project configuration → Build & deploy](https://app.netlify.com/projects/givanse/configuration/deploys) for `givanse`
2. **Continuous deployment** / **Branches** (Branches and deploy contexts → **Configure**)
3. Set **Allowed branches** / branch deploys to **`svelte`** only (or **None** if production-on-`svelte` plus Trigger deploy is enough)
4. **Remove `broccoli-taco`**
5. Confirm **Deploy Previews** stay disabled (`skip_prs` already true)
6. Leave **Stop builds** **off** (`stop_builds` must stay false)
