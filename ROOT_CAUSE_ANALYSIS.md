# Root Cause Analysis: cat-oscilloscope WASM Loading Failure

## Investigation Date
2026-01-17

## Problem Statement
Console errors flood every ~250ms after clicking to start audio:
- `Failed to load resource: the server responded with a status of 404 (Not Found)`
- `Failed to initialize WASM module: Error: Failed to load WASM module script`
- `Error starting from buffer`
- `Failed to update oscilloscope`

## Investigation Method
Used headless browser (Playwright) to test actual GitHub Pages deployment and identify specific 404 errors.

## Root Cause Identified

### Primary Issue: Missing WASM File
**404 Error**: `https://cat2151.github.io/wavlpf/wasm/wasm_processor.js`

The cat-oscilloscope WASM processor file is completely missing from the GitHub Pages deployment.

### Dependency Chain Failure

1. **package.json Configuration Problem**
   ```json
   "dependencies": {
     "cat-oscilloscope": "file:../../../../../tmp/cat-oscilloscope"
   }
   ```
   - Points to `/tmp/cat-oscilloscope` which doesn't exist
   - This is a symbolic link that works locally but breaks in CI/deployment

2. **Postinstall Script Silent Failure**
   - `scripts/setup-cat-oscilloscope-wasm.js` runs after `npm install`
   - Checks for `node_modules/cat-oscilloscope/dist/wasm/`
   - Since cat-oscilloscope isn't properly installed, source directory doesn't exist
   - Script exits with warning (not error), allowing build to continue
   - Result: `public/wasm/` directory is empty

3. **Deployment Without WASM Files**
   - Vite build copies `public/` to `dist/`
   - Since `public/wasm/` is empty, no WASM files are deployed
   - GitHub Pages serves the site without the required WASM processor

### Why Errors Repeat Every 250ms
- Audio is regenerated every ~250ms (based on BPM=120, beat=8)
- Each audio generation cycle calls `updateOscilloscope()`
- cat-oscilloscope tries to load WASM module from `/wasm/wasm_processor.js`
- 404 error occurs, triggering JavaScript errors
- Next audio cycle → same process repeats → continuous console spam

## Evidence

### Headless Browser Test Results
```
ALL WASM-RELATED REQUESTS:
1. https://cat2151.github.io/wavlpf/assets/wasm_audio-BQneYQC-.js  ✓ (200 OK - wavlpf's own WASM)
2. https://cat2151.github.io/wavlpf/assets/wasm_audio_bg-DXOFzASw.wasm  ✓ (200 OK - wavlpf's own WASM)
3. https://cat2151.github.io/wavlpf/wasm/wasm_processor.js  ❌ (404 NOT FOUND - cat-oscilloscope WASM)
```

### Local Environment Check
```bash
$ ls -la node_modules/cat-oscilloscope
lrwxrwxrwx cat-oscilloscope -> ../../../../../../tmp/cat-oscilloscope

$ ls /tmp/cat-oscilloscope
ls: cannot access '/tmp/cat-oscilloscope': No such file or directory
```

## Why Previous "Spam Suppression" Approach Was Wrong

The initial PR focused on suppressing error messages after the first failure. This was treating the symptom, not the disease:

❌ **What we did**: Added `hasPermanentFailure` flag to silence repeated errors
✅ **What we should do**: Fix why cat-oscilloscope WASM isn't being loaded

The anti-pattern was "problem concealment" - hiding the errors instead of fixing why the WASM file is missing.

## Required Fix

According to `CAT_OSCILLOSCOPE_INSTALLATION.md`, there are several options:

### Option 1: Install from Local Build (Current Documented Method)
```bash
git clone https://github.com/cat2151/cat-oscilloscope.git /tmp/cat-oscilloscope
cd /tmp/cat-oscilloscope
npm install
npm run build:lib
cd /path/to/wavlpf
npm install /tmp/cat-oscilloscope
```

**Problem**: This only works locally, not in CI/deployment

### Option 2: Use npm link (Development Only)
**Problem**: Doesn't work for GitHub Actions or deployment

### Option 3: Publish to npm (Recommended)
**Problem**: Requires cat-oscilloscope owner to publish package

### Option 4: Use git submodule + build in CI
**Solution**: Could work for CI, but adds build complexity

### Option 5: Direct GitHub Install with prepareScript
**Solution**: Add `prepare` script to cat-oscilloscope to auto-build on install

### Option 6: Commit dist/ files (Documented as "dist commit" approach)
**Solution**: Simple but requires cat-oscilloscope to commit build artifacts

## Recommended Solution

Based on copilot-instructions.md note about "dist commit方式":

The cat-oscilloscope library should:
1. Build the WASM files
2. Commit them to the repository in a `dist/` branch or tag
3. Update wavlpf's package.json to reference a specific release:
   ```json
   "cat-oscilloscope": "github:cat2151/cat-oscilloscope#v1.0.0"
   ```

This allows GitHub Actions to install the pre-built package without needing Rust/wasm-pack in CI.

## Next Steps

1. **Decision needed**: Which installation method to use for cat-oscilloscope?
2. **If dist commit approach**: 
   - Wait for cat-oscilloscope to publish a release with dist files
   - Update package.json dependency
   - Verify postinstall script works
3. **If npm publish**:
   - Wait for cat-oscilloscope to be published to npm
   - Update package.json to use npm version
4. **If other approach**:
   - Document and implement the chosen solution

## Files to Update After Decision

- `package.json` - Fix cat-oscilloscope dependency
- `.github/workflows/deploy.yml` - May need to install build tools if building from source
- `CAT_OSCILLOSCOPE_INSTALLATION.md` - Update with working instructions
