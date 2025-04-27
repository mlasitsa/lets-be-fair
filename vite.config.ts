import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/monaco-editor/min/vs', // source
          dest: 'monaco',                           // dist-react/monaco/vs/**
        },
      ],
    }),
  ],
  base: './',
  build: { outDir: 'dist-react' },
});
