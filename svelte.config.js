import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		target: '#svelte',
		vite:{
			define: {
				...(process.env.NODE_ENV==='development' && {
					'process.env': process.env,
				}),
			}

		}
		
	}
};

export default config;
