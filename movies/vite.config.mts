/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig(() => ({
  cacheDir: '../node_modules/.vite/movies',
  server: {
    port: 4202,
    host: 'localhost',
    strictPort: true,
    cors: {
      origin: '*',
      credentials: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    port: 4202,
    host: 'localhost',
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    react(),
    federation({
      name: 'movies',
      filename: 'remoteEntry.js',
      exposes: {
        './MoviesApp': './src/app/app.tsx',
      },
      // remotes: {
      //   streambox: 'http://localhost:4201/assets/remoteEntry.js',
      // },
      shared: ['react', 'react-dom'],
    }),
  ],

  build: {
    // rollupOptions: {
    //   external: ['streambox/useAuthStore'],
    // },
    outDir: path.join(__dirname, '../dist'),
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
