import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for GitHub Pages deployment
  base: '/wavlpf/',
  
  // Vite development server configuration
  server: {
    port: 8080,
    open: true,
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
