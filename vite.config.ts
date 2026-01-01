import { defineConfig } from 'vite';

export default defineConfig({
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
  
  // Test configuration (for Vitest)
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
