import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'lx_submodule',
      fileName: () => `index.js`,
    },
    rollupOptions: {
      // Pour définir des options de configuration Rollup supplémentaires si nécessaire
    },
  },
});