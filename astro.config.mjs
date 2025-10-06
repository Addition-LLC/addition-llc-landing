import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

import node from '@astrojs/node';

// Import the Vercel adapter
// import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'server',

  // adapter: vercel(),
  // adapter:
  site: 'https://Addition-llc.github.io',

  outDir: './dist',

  build: {
    assets: 'astro'
  },

  adapter: node({
    mode: 'middleware'
  }),
  server: {
    allowedHosts: ['localhost', '127.0.0.1', 'additionplus.ai', 'www.additionplus.ai'],
  },
});
