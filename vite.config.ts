import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import version from 'vite-plugin-package-version';
// https://vitejs.dev/config/

export default defineConfig(() => {
  return {
    plugins: [version(), react()],
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
    resolve: {
      alias: {
        process: 'process/browser',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib',
        util: 'util',
      },
    },
  };
});
