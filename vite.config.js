import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    define: {
      global: 'window', // Polyfill global for browser environment
    },
    plugins: [react()],
  };
});
