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

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

### Run

```bash
npm run serve
```

Then open http://localhost:8080 in your browser.

### Development

```bash
npm run dev
```

This will start TypeScript in watch mode for continuous compilation.

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

## License

MIT
