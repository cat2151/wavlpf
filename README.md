# wavlpf

A simple software synthesizer with low-pass filter (LPF) implemented in TypeScript.

## Features

- **220Hz Sawtooth Wave Generator**: Pure signal processing implementation
- **Biquad LPF Filter**: Interactive filter with mouse control
  - X-axis: Cutoff frequency (20Hz - 1000Hz)
  - Y-axis: Resonance Q value (0.5 - 2.0)
  - Automatic cutoff decay at 1Hz per millisecond
- **Non-realtime Rendering**: WebAudio-independent signal processing
- **500ms Audio Buffers**: New audio generated every 500ms
- **WAV Generation**: Converts processed audio to WAV format
- **Tone.js Integration**: Clean audio playback

## Demo

This application is deployed to GitHub Pages and available at: https://cat2151.github.io/wavlpf/

## Getting Started

For detailed information about the development framework and testing strategy, see [DEVELOPMENT.md](DEVELOPMENT.md).

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

This will start Vite's development server with instant HMR. The browser will open automatically at http://localhost:8080.

### Build

```bash
npm run build
```

This runs TypeScript type checking and builds the production bundle with Vite.

### Preview Production Build

```bash
npm run preview
```

Serve the production build locally to test before deployment.

### Testing

Run the test suite:

```bash
npm test         # Watch mode
npm run test:run # Run once
npm run test:ui  # Visual test runner
npm run coverage # Generate coverage report
```

### Run (Legacy)

Note: The `serve` command now uses Vite's preview server:

```bash
npm run serve
```

Then open http://localhost:8080 in your browser (or use `npm run dev` for development).

## Usage

1. Open the application in your browser
2. Click anywhere on the page to start the audio context
3. Move your mouse to control filter parameters:
   - **Horizontal position (X)**: Controls cutoff frequency (20Hz - 1000Hz)
   - **Vertical position (Y)**: Controls resonance/Q value (0.5 - 2.0)
4. Listen as new audio is generated every 500ms with the current filter settings

## Architecture

### Signal Processing (WebAudio-independent)

- `src/oscillator.ts`: Sawtooth wave generator
- `src/filter.ts`: Biquad LPF implementation using RBJ Audio EQ Cookbook formulas
- `src/wav.ts`: WAV file format generation

### Application

- `src/synth.ts`: Main synthesizer logic with mouse tracking and audio playback
- `src/index.ts`: Entry point
- `index.html`: Web interface

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment workflow:

1. Installs Node.js dependencies
2. Builds TypeScript to JavaScript
3. Copies `index.html`, `dist/`, and required files from `node_modules/` to the deployment directory
4. Deploys to GitHub Pages

The workflow is defined in `.github/workflows/deploy.yml`.

## License

MIT
