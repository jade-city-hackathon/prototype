import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import version from 'vite-plugin-package-version';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
// https://vitejs.dev/config/

export default defineConfig(() => {
  return {
    plugins: [nodePolyfills(), version(), react()],
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
    resolve: {
      alias: {
        crypto: 'crypto-browserify',
        process: 'process/browser',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib',
        util: 'util',
      },
    },
  };
});
