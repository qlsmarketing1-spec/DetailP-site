import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: false,
      },
      plugins: [
        react(),
        tailwindcss(),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'import.meta.env.VITE_CONTENTFUL_SPACE_ID': JSON.stringify(env.VITE_CONTENTFUL_SPACE_ID),
        'import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN': JSON.stringify(env.VITE_CONTENTFUL_ACCESS_TOKEN),
        'import.meta.env.VITE_CONTENTFUL_ENVIRONMENT': JSON.stringify(env.VITE_CONTENTFUL_ENVIRONMENT || 'master')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
