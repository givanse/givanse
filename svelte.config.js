import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    ssr: false,
    adapter: adapter({
      esbuild(default_options) {
        // workaround
        // https://github.com/sveltejs/kit/issues/3054
        default_options.inject = [];
        return default_options;
      }
    }),
  }
};

export default config;
