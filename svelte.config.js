import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from 'tailwindcss';

const config = {
  preprocess: vitePreprocess({
    postcss: {
      plugins: [tailwindcss],
    },
  }),
 
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
      // ❌ Removed: onError, csr, browser - not valid adapter options
    }),
   
    // ✅ Valid v2 alias config (single entry, no duplicates)
    alias: {
      $lib: 'src/lib',
      $posts: 'static/posts-markdown' // For markdown files
    }
  }
  // ✅ Removed runes: false - let SvelteKit v2 handle properly
};

export default config;