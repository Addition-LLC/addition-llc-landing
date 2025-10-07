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
  site: 'https://additionplus.ai',

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
  }),

  // Add this vite configuration block
  vite: {
    server: {
      // This allows the server to be accessible on your local network
      host: true, 
      // This specifically allows your custom domain to connect
      allowedHosts: ['additionplus.ai'],
    }
  }
});
