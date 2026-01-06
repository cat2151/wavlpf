import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for GitHub Pages deployment
  base: '/wavlpf/',
  
  // Vite development server configuration
  server: {
    port: 8080,
    open: true,
    fs: {
      // Allow serving files from project root (includes all project files)
      // The '.' entry alone would be sufficient, but './wasm-audio/pkg' is kept
      // for explicitness to document the WASM module requirement
      allow: ['.', './wasm-audio/pkg'],
    },
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Ensure proper module output
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  
  // Optimize deps to exclude WASM from pre-bundling
  optimizeDeps: {
    exclude: ['wasm-audio'],
  },
  
  // Vitest configuration
  // Vitest uses Vite's configuration system for seamless integration
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
    },
  },
});
