#!/usr/bin/env bash
# Production ignore safety net for https://givan.se (Netlify site `givanse`).
#
# Netlify: exit 0 → skip this build; any other exit → run the build.
# Fail OPEN: missing refs, a bad repo path, or git errors must NOT skip.
# Never always-skip real site paths (`src/`, `static/`, SvelteKit/Vite config).
#
# Honor `[build].base`: the ignore command runs from the base directory (repo
# root here; this site has no toml `base`). Diff from the git root so a leftover
# UI base cannot make `git diff .` miss site files. Prefer `NETLIFY_REPO_PATH`
# when Netlify sets it.
#
# README / this script / netlify.toml-only changes do not publish a new site
# (no production deploy just to land toml). Header/CSP toml edits need a
# Trigger deploy or build hook — hooks ignore this exit code and always build.

if [[ -n "${NETLIFY_REPO_PATH:-}" ]]; then
  if [[ ! -d "${NETLIFY_REPO_PATH}" ]]; then
    exit 1
  fi
  cd "${NETLIFY_REPO_PATH}" || exit 1
else
  root="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 1
  cd "${root}" || exit 1
fi

cached="${CACHED_COMMIT_REF:-}"
commit="${COMMIT_REF:-}"
if [[ -z "${cached}" || -z "${commit}" ]]; then
  exit 1
fi

if ! git cat-file -e "${cached}^{commit}" 2>/dev/null; then
  exit 1
fi
if ! git cat-file -e "${commit}^{commit}" 2>/dev/null; then
  exit 1
fi

# Paths that actually rebuild https://givan.se. Do not list README.md,
# scripts/, or netlify.toml — those must not burn ~15 credits on their own.
site_paths=(
  src
  static
  package.json
  package-lock.json
  svelte.config.js
  vite.config.js
  tsconfig.json
  tailwind.config.cjs
  postcss.config.cjs
  .nvmrc
  .npmrc
)

git diff --quiet "${cached}" "${commit}" -- "${site_paths[@]}"
status=$?
if [[ "${status}" -eq 0 ]]; then
  exit 0
fi
exit 1
