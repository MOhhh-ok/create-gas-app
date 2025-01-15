import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import path from 'path';
import rollupPluginGas from 'rollup-plugin-google-apps-script';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    rollupPluginGas(),
    typescript(),
    {
      name: 'copy-appsscript-json',
      writeBundle() {
        const srcFile = path.resolve(__dirname, 'appsscript.json');
        const distDir = path.resolve(__dirname, 'dist');
        const distFile = path.join(distDir, 'appsscript.json');

        if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
        fs.copyFileSync(srcFile, distFile);
      },
    },
  ],
  build: {
    rollupOptions: {
      input: 'src/index.ts',
      output: {
        dir: 'dist',
        entryFileNames: 'main.js',
      },
    },
    minify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
