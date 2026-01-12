/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
// import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
// import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
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
      shared: ['react', 'react-dom'],
    }),
    // nxViteTsPaths(),
    // nxCopyAssetsPlugin(['*.md']),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //   plugins: () => [ nxViteTsPaths() ],
  // },
  build: {
    rollupOptions: {
      external: ['streambox/useAuthStore'],
    },
    outDir: path.join(__dirname, '../dist'),
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
