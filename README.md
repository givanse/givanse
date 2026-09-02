# givan.se

Personal static site for [givan.se](https://givan.se): markdown posts, about, Disqus, and share buttons. Built with Svelte 5, SvelteKit, Vite, and `@sveltejs/adapter-static` for Netlify.

Requires Node.js 18.13 or newer.

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
