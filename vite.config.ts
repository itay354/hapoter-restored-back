import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  optimizeDeps: {
    include: ['lucide-react'],
    exclude: ['fsevents'],
  },
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    watch: {
      usePolling: true,
    },
    hmr: {
      overlay: false,
    },
    fs: {
      allow: ['..'],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  esbuild: {
    target: 'es2020',
    logOverride: { 
      'this-is-undefined-in-esm': 'silent' 
    },
    keepNames: true,
  },
  define: {
    global: 'globalThis',
  },
});