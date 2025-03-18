import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { optimizeCss } from 'carbon-preprocess-svelte';

export default defineConfig({
	optimizeDeps: {
		exclude: ['carbon-components-svelte', 'carbon-pictograms-svelte']
	},
	plugins: [sveltekit(), optimizeCss()]
});
