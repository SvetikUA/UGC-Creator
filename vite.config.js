import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/UGC-Creator/',
  plugins: [
    tailwindcss(),
  ],
});
