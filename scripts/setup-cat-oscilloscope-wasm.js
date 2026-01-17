#!/usr/bin/env node

/**
 * Post-install script to copy cat-oscilloscope WASM files to public directory
 * 
 * This script runs after npm install to ensure the cat-oscilloscope WASM files
 * are available in the public/wasm directory for both development and production builds.
 * 
 * Background:
 * - cat-oscilloscope uses Rust/WASM for high-performance audio processing
 * - The WASM module is loaded dynamically at runtime from {basePath}/wasm/wasm_processor.js
 * - Vite automatically copies files from public/ to dist/ during build
 * - This ensures WASM files are available in both dev server and production build
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'node_modules', 'cat-oscilloscope', 'dist', 'wasm');
const destDir = path.join(__dirname, '..', 'public', 'wasm');

// Files to copy from cat-oscilloscope
const files = [
  'wasm_processor.js',
  'wasm_processor_bg.wasm',
  'wasm_processor_bg.wasm.d.ts',
  'wasm_processor.d.ts',
  'package.json',
];

try {
  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.warn('⚠️  cat-oscilloscope WASM source directory not found. Skipping setup.');
    console.warn('   Expected:', sourceDir);
    console.warn('   This is normal if cat-oscilloscope is not yet installed.');
    process.exit(0);
  }

  // Create destination directory if it doesn't exist
  fs.mkdirSync(destDir, { recursive: true });

  // Copy each file - all files are required for WASM to work
  const missingFiles = [];
  for (const file of files) {
    const src = path.join(sourceDir, file);
    
    if (!fs.existsSync(src)) {
      missingFiles.push(file);
    }
  }

  // Fail early if any required files are missing
  if (missingFiles.length > 0) {
    console.error('❌ Required WASM files are missing:');
    missingFiles.forEach(file => console.error(`   - ${file}`));
    console.error('   Source directory:', sourceDir);
    console.error('   cat-oscilloscope may not be properly installed or built.');
    process.exit(1);
  }

  // Copy all files
  for (const file of files) {
    const src = path.join(sourceDir, file);
    const dest = path.join(destDir, file);
    fs.copyFileSync(src, dest);
  }

  console.log('✓ cat-oscilloscope WASM files copied to public/wasm/');
} catch (error) {
  console.error('❌ Failed to copy cat-oscilloscope WASM files:', error.message);
  console.error('   Source:', sourceDir);
  console.error('   Destination:', destDir);
  // Fail the installation to provide immediate feedback
  process.exit(1);
}
