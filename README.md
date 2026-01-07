# wavlpf

A simple software synthesizer with a Low-Pass Filter (LPF) implemented in Rust WASM

## Demo

https://cat2151.github.io/wavlpf/

Note: This document is preliminary and was generated hastily by an LLM. It will be revised in the future.

## Features

- **Rust WASM Signal Processor**: High-performance DSP processing implemented in Rust
  - Millisecond-precision performance measurement
  - Implemented as a Rust crate, usable from native applications
- **220Hz Waveform Generator**: Sawtooth or pulse wave, with adjustable duty cycle
- **Biquad LPF Filter**: Interactive filter controlled by mouse
  - X-axis: Cutoff frequency (20Hz - configurable max value)
  - Y-axis: Resonance Q value (0.5 - configurable max value, inverted: Up = High, Down = Low)
  - Configurable cutoff decay (Hz or Cent/millisecond)
- **Non-realtime Rendering**: WebAudio-independent signal processing
- **Configurable Audio Buffer**: BPM and beat-based audio generation timing
- **WAV Generation**: Converts processed audio to WAV format
- **Tone.js Integration**: Clean audio playback
- **Settings Persistence**: Import/export settings as JSON files

## Related Documentation

### cat-oscilloscope Integration Research

**🌟 Recommended** - [CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md](CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md) - **Comprehensive analysis with a focus on best practices** (Japanese)

**Reference Materials**:
- [CAT_OSCILLOSCOPE_INTEGRATION.md](CAT_OSCILLOSCOPE_INTEGRATION.md) - Minimal change approach (for reference)
- [ARCHITECTURE_DIAGRAMS.md](ARCHITECTURE_DIAGRAMS.md) - Architecture diagrams
- [IMPLEMENTATION_EXAMPLES.md](IMPLEMENTATION_EXAMPLES.md) - Implementation examples

### Development Guide

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development framework and testing strategy

## Getting Started

For details on the development framework and testing strategy, refer to [DEVELOPMENT.md](DEVELOPMENT.md).

For integrating waveform visualization, refer to [CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md](CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md).

### Prerequisites

- Node.js (v14 or higher)
- npm
- Rust and wasm-pack (for building WASM modules)

Installing Rust and wasm-pack:
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install wasm-pack
cargo install wasm-pack
```

### Installation

```bash
npm install
```

### Development

Start the development server with Hot Module Replacement:

```bash
npm run dev
```

This will launch an instant HMR-enabled Vite development server. The browser will automatically open to http://localhost:8080.

### Build

Build the WASM module and the entire application:

```bash
# Build WASM module only
npm run build:wasm

# Build everything (WASM + TypeScript + Vite production bundle)
npm run build
```

This performs TypeScript type checking, builds the Rust WASM module, and creates a production bundle with Vite.

**⚠️ Critical Note on wasm-opt ⚠️**: 
- By default, the build uses `wasm-opt` (from binaryen) for WASM optimization
- **This has been verified to work correctly in ALL environments including CI**
- **Setting `wasm-opt = false` in `wasm-audio/Cargo.toml` is strictly PROHIBITED**
- In the past, AI agents incorrectly added `wasm-opt = false` twice based on unfounded assumptions
- The owner has verified that wasm-opt works correctly when enabled
- Do NOT change the default setting (wasm-opt enabled)
- Even for local debugging, do NOT commit changes that disable wasm-opt

### Preview Production Build

```bash
npm run preview
```

Locally verify the production build before deployment.

### Testing

Run the test suite:

```bash
npm test         # Watch mode
npm run test:run # Run once
npm run test:ui  # Visual test runner
npm run coverage # Generate coverage report
```

### Execution (Legacy)

Note: The `serve` command now uses Vite's preview server:

```bash
npm run serve
```

Then, open http://localhost:8080 in your browser (for development, use `npm run dev`).

## Usage

1. Open the application in your browser
2. Click anywhere on the page to start the audio context
3. **Configure Parameters**:
   - Waveform type: Sawtooth or Pulse
   - Duty Cycle: For pulse wave (0-100%)
   - BPM and Beats: Control audio generation timing
   - Q Max: Maximum resonance value
   - Cutoff Frequency Max: Maximum cutoff frequency
   - Decay Unit: Hz or Cent
   - Decay Rate: Decay rate per millisecond
4. Move your mouse to control filter parameters in real-time:
   - **Horizontal position (X)**: Controls cutoff frequency (20Hz - max value)
   - **Vertical position (Y)**: Controls resonance/Q value (0.5 - max value, inverted: Up = High, Down = Low)
5. Check the **Generation Time** display to monitor performance
6. Listen to new audio generated based on BPM and beat settings

## Architecture

### Signal Processing (WebAudio Independent)

#### Rust WASM Implementation
- `wasm-audio/src/lib.rs`: Complete signal processing pipeline in Rust
  - Oscillator generation (sawtooth, pulse)
  - Biquad LPF filter using RBJ Audio EQ Cookbook formulas
  - Audio rendering including cutoff decay
- `wasm-audio/pkg/`: Generated WASM bindings

#### Integration
- `src/wasmAudio.ts`: TypeScript wrapper for the WASM module
  - Dynamic WASM loading
  - Performance measurement

### Application

- `src/synth.ts`: Main synthesizer logic, including mouse tracking and audio playback
- `src/wav.ts`: WAV file format generation
- `src/settings.ts`: Settings persistence (localStorage and JSON import/export)
- `src/index.ts`: Entry point
- `index.html`: Web interface

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment workflow:

1. Installs Node.js dependencies
2. Builds TypeScript to JavaScript
3. Copies necessary files from `index.html`, `dist/`, and `node_modules/` to the deployment directory
4. Deploys to GitHub Pages

The workflow is defined in `.github/workflows/deploy.yml`.

## License

MIT