import { resolve } from 'path';
import react from '@vitejs/plugin-react';

import { defineConfig, type UserConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
      {
        find: '@test',
        replacement: resolve(__dirname, './test'),
      },
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test.setup.ts',
  },
} as UserConfig);
