import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { stripDraftPostsPlugin } from './scripts/strip-drafts.mjs';

export default defineConfig({
  plugins: [stripDraftPostsPlugin(), sveltekit()]
});
