import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          products: path.resolve(__dirname, 'products.html'),
          services: path.resolve(__dirname, 'services.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          blogHighwayGuide: path.resolve(__dirname, 'blog/sh28-highway-guide.html'),
          blogDalBaati: path.resolve(__dirname, 'blog/dal-baati-churma.html'),
          blogFamilyStay: path.resolve(__dirname, 'blog/family-ac-stay.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
