# cat-oscilloscope Integration Analysis Report

## Executive Summary

This document analyzes the optimal library structure for integrating cat-oscilloscope into wavlpf for waveform visualization.

**Key Recommendation**: Refactor cat-oscilloscope into a modular library with adapter pattern to support both microphone input and direct buffer visualization.

**Estimated Effort**: 7-12 hours for cat-oscilloscope refactoring + 6-10 hours for wavlpf integration

## Project Analysis

### cat-oscilloscope Current Structure

cat-oscilloscope is a browser-based oscilloscope-style waveform visualizer with:

**Features**:
- Microphone input with real-time capture
- Zero-cross detection for stable display
- Auto-gain control
- FFT spectrum overlay
- Multiple frequency estimation algorithms (Zero-Crossing, Autocorrelation, FFT)

**Architecture**:
```
src/
├── Oscilloscope.ts          # Main coordinator
├── AudioManager.ts          # Web Audio API integration
├── GainController.ts        # Auto-gain & noise gate
├── FrequencyEstimator.ts    # Frequency detection algorithms
├── WaveformRenderer.ts      # Canvas rendering
├── ZeroCrossDetector.ts     # Zero-crossing detection
└── utils.ts                 # Utility functions
```

**Design Principles**:
- Single Responsibility Principle
- Clear module boundaries
- High reusability potential

### wavlpf Current Structure

wavlpf is a software synthesizer with LPF filter:

**Features**:
- 220Hz sawtooth wave generation
- Biquad LPF filter with mouse control
- Non-realtime rendering (WebAudio-independent)
- WAV generation
- Tone.js integration

**Architecture**:
```
src/
├── index.ts        # Entry point
├── synth.ts        # Main synthesizer logic
├── oscillator.ts   # Sawtooth generation
├── filter.ts       # Biquad LPF implementation
└── wav.ts          # WAV file generation
```

## Integration Challenges

### Technical Issues

1. **Different Audio Sources**:
   - cat-oscilloscope: Microphone input (Web Audio API)
   - wavlpf: Programmatically generated audio (Float32Array)

2. **Display Timing**:
   - cat-oscilloscope: Real-time continuous display
   - wavlpf: 250ms buffer intervals

3. **Dependencies**:
   - cat-oscilloscope: Requires Web Audio API
   - wavlpf: Only Tone.js (indirect Web Audio usage)

## Recommended Solution: Modular Library Architecture

### Proposed Structure

```
@cat2151/oscilloscope-core/
├── src/
│   ├── core/                    # Core features (no audio input)
│   │   ├── WaveformRenderer.ts  # Canvas drawing (independent)
│   │   ├── ZeroCrossDetector.ts # Zero-cross detection (independent)
│   │   ├── FrequencyEstimator.ts # Frequency estimation (independent)
│   │   ├── GainController.ts    # Gain control (independent)
│   │   └── utils.ts             # Utilities
│   │
│   ├── adapters/                # Adapter layer
│   │   ├── AudioManager.ts      # Web Audio API integration
│   │   └── BufferAdapter.ts     # Float32Array input (NEW)
│   │
│   └── Oscilloscope.ts          # Integration class
│
└── package.json
```

### Key Changes

#### 1. AudioSource Interface

```typescript
export interface AudioSource {
  getTimeDomainData(): Float32Array | null;
  getFrequencyData(): Uint8Array | null;
  getSampleRate(): number;
  getFFTSize(): number;
  isReady(): boolean;
}
```

#### 2. BufferAdapter Implementation

```typescript
export class BufferAdapter implements AudioSource {
  private buffer: Float32Array | null = null;
  private frequencyData: Uint8Array | null = null;
  
  constructor(
    private bufferSize: number,
    private sampleRate: number
  ) {}
  
  setBuffer(buffer: Float32Array): void {
    this.buffer = buffer;
    this.calculateFFT();
  }
  
  getTimeDomainData(): Float32Array | null {
    return this.buffer;
  }
  
  getFrequencyData(): Uint8Array | null {
    return this.frequencyData;
  }
  
  getSampleRate(): number {
    return this.sampleRate;
  }
  
  getFFTSize(): number {
    return this.bufferSize;
  }
  
  isReady(): boolean {
    return this.buffer !== null;
  }
  
  private calculateFFT(): void {
    // FFT implementation (if needed)
  }
}
```

#### 3. Updated Oscilloscope Class

```typescript
export class Oscilloscope {
  private audioSource: AudioSource;
  private gainController: GainController;
  private frequencyEstimator: FrequencyEstimator;
  private renderer: WaveformRenderer;
  private zeroCrossDetector: ZeroCrossDetector;
  
  constructor(canvas: HTMLCanvasElement, audioSource: AudioSource) {
    this.audioSource = audioSource;
    // ... initialize other components
  }
  
  render(): void {
    if (!this.audioSource.isReady()) return;
    
    const dataArray = this.audioSource.getTimeDomainData();
    if (!dataArray) return;
    
    // Existing rendering logic
    this.gainController.applyNoiseGate(dataArray);
    // ... rest of rendering code
  }
}
```

### Usage in wavlpf

```typescript
// synth.ts
import { Oscilloscope, BufferAdapter } from '@cat2151/oscilloscope-core';

// Initialize oscilloscope
const canvas = document.getElementById('waveform-canvas') as HTMLCanvasElement;
const bufferAdapter = new BufferAdapter(4096, SAMPLE_RATE);
const oscilloscope = new Oscilloscope(canvas, bufferAdapter);

// Configure
oscilloscope.setAutoGain(true);
oscilloscope.setFFTDisplay(true);

function renderAudio(): Float32Array {
  const samples = generateSawtooth(FREQUENCY, SAMPLE_RATE, DURATION);
  
  // Display before filtering (optional)
  bufferAdapter.setBuffer(samples);
  oscilloscope.render();
  
  // Apply filter
  const filtered = applyFilter(samples);
  
  // Display after filtering
  bufferAdapter.setBuffer(filtered);
  oscilloscope.render();
  
  return filtered;
}
```

## Benefits Analysis

### Advantages

1. **Complete Independence**: No Web Audio API required for buffer visualization
2. **High Reusability**: Can be used in other projects
3. **Clear Separation of Concerns**: Audio input and rendering completely separated
4. **Easy Testing**: Unit tests without mocks
5. **Performance**: No unnecessary features
6. **Flexibility**: Support for multiple input sources

### Disadvantages

1. **Initial Development Cost**: Refactoring required
2. **Code Migration**: Need to separate AudioManager
3. **Documentation Updates**: Usage instructions need updating

## Implementation Estimates

### cat-oscilloscope Refactoring

| Task | Effort | Description |
|------|--------|-------------|
| BufferAdapter implementation | 2-3h | New adapter creation |
| Oscilloscope refactoring | 1-2h | Interface introduction |
| AudioManager separation | 1-2h | Adapter conversion |
| Test code | 2-3h | Unit tests |
| Documentation | 1-2h | README updates |
| **Total** | **7-12h** | 1-2 days |

### wavlpf Integration

| Task | Effort | Description |
|------|--------|-------------|
| UI integration | 2-3h | Canvas addition, layout |
| Library integration | 1-2h | Package install, init |
| Display implementation | 2-3h | renderAudio calls |
| Styling | 1-2h | Design integration |
| **Total** | **6-10h** | 1 day |

## Alternative: Lightweight Implementation

If full oscilloscope features are not needed, implement minimal waveform display in wavlpf:

```typescript
// src/waveform-display.ts (new)
export class SimpleWaveformDisplay {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }
  
  draw(samples: Float32Array): void {
    // Clear
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw waveform
    this.ctx.strokeStyle = '#0f0';
    this.ctx.beginPath();
    
    const step = samples.length / this.canvas.width;
    for (let i = 0; i < this.canvas.width; i++) {
      const sample = samples[Math.floor(i * step)];
      const y = (1 - sample) * this.canvas.height / 2;
      if (i === 0) {
        this.ctx.moveTo(i, y);
      } else {
        this.ctx.lineTo(i, y);
      }
    }
    
    this.ctx.stroke();
  }
}
```

**Pros**: Minimal implementation, no dependencies  
**Cons**: Limited features, no zero-cross detection, no FFT

## Conclusion

### Final Recommendation: Modular Library Architecture

By refactoring cat-oscilloscope into a modular library:

1. **Smooth wavlpf Integration**: Direct buffer passing via BufferAdapter
2. **Future Extensibility**: Reusable in other projects
3. **Maintainability**: Clear separation of concerns
4. **Reasonable Effort**: 1-2 days of development

### Implementation Phases

**Phase 1**: cat-oscilloscope Refactoring (1-2 days)
- Introduce AudioSource interface
- Implement BufferAdapter
- Verify existing functionality

**Phase 2**: wavlpf Integration (1 day)
- Add package dependency
- UI integration
- Display implementation

**Phase 3**: Optimization (Optional)
- Performance tuning
- UI/UX adjustments
- Documentation

### Next Steps

1. Create new branch in cat-oscilloscope repository
2. Implement BufferAdapter
3. Refactor Oscilloscope
4. Publish as npm package (or direct integration)
5. Implement wavlpf integration

## Package Configuration

```json
{
  "name": "@cat2151/oscilloscope-core",
  "version": "1.0.0",
  "description": "Modular oscilloscope library for browser-based waveform visualization",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./core": "./dist/core/index.js",
    "./adapters": "./dist/adapters/index.js"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "peerDependencies": {},
  "devDependencies": {
    "typescript": "^5.3.3",
    "vite": "^6.0.0"
  }
}
```

## References

- cat-oscilloscope: https://github.com/cat2151/cat-oscilloscope
- wavlpf: https://github.com/cat2151/wavlpf
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

---

**Created**: 2026-01-01  
**Version**: 1.0  
**Status**: Analysis Complete - Ready for Implementation
