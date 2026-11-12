import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function sourceEntryPlugin(): Plugin {
  return {
    name: 'vite-source-entry',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(
          /<!-- STATIC_ENTRY_START -->[\s\S]*?<!-- STATIC_ENTRY_END -->/,
          '<script type="module" src="/src/main.tsx"></script>'
        );
      },
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [sourceEntryPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
