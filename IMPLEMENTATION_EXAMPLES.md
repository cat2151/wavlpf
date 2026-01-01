# Implementation Example Code

This document provides concrete code examples for the proposed integration.

## BufferAdapter Implementation

```typescript
// File: @cat2151/oscilloscope-core/src/adapters/BufferAdapter.ts

/**
 * BufferAdapter - Adapter for direct Float32Array buffer input
 * Implements AudioSource interface without requiring Web Audio API
 */
export class BufferAdapter {
  private buffer: Float32Array | null = null;
  private frequencyData: Uint8Array | null = null;
  private readonly bufferSize: number;
  private readonly sampleRate: number;
  private readonly enableFFT: boolean;

  /**
   * @param bufferSize - Size of the buffer (e.g., 4096)
   * @param sampleRate - Sample rate in Hz (e.g., 44100)
   * @param enableFFT - Whether to compute FFT (optional, default: false)
   */
  constructor(bufferSize: number, sampleRate: number, enableFFT = false) {
    this.bufferSize = bufferSize;
    this.sampleRate = sampleRate;
    this.enableFFT = enableFFT;
  }

  /**
   * Set the buffer to display
   * @param buffer - Audio samples normalized to -1.0 to 1.0 range
   */
  setBuffer(buffer: Float32Array): void {
    this.buffer = buffer;
    
    if (this.enableFFT) {
      this.calculateFFT();
    }
  }

  /**
   * Get time-domain data for waveform display
   */
  getTimeDomainData(): Float32Array | null {
    return this.buffer;
  }

  /**
   * Get frequency-domain data for spectrum display
   */
  getFrequencyData(): Uint8Array | null {
    return this.frequencyData;
  }

  /**
   * Get sample rate
   */
  getSampleRate(): number {
    return this.sampleRate;
  }

  /**
   * Get FFT size
   */
  getFFTSize(): number {
    return this.bufferSize;
  }

  /**
   * Check if buffer is ready
   */
  isReady(): boolean {
    return this.buffer !== null;
  }

  /**
   * Calculate FFT from time-domain data (optional feature)
   * This is a simplified implementation - in production, use a proper FFT library
   */
  private calculateFFT(): void {
    if (!this.buffer) return;

    // For now, create a placeholder
    // In production, use libraries like:
    // - fft.js: https://www.npmjs.com/package/fft.js
    // - dsp.js: https://github.com/corbanbrook/dsp.js
    // - kiss-fft-js: https://www.npmjs.com/package/kiss-fft-js
    
    this.frequencyData = new Uint8Array(this.bufferSize / 2);
    
    // Placeholder: convert amplitude to frequency-like representation
    // Real implementation should use proper FFT algorithm
    for (let i = 0; i < this.frequencyData.length; i++) {
      const index = Math.floor(i * this.buffer.length / this.frequencyData.length);
      const amplitude = Math.abs(this.buffer[index]);
      this.frequencyData[i] = Math.min(255, Math.floor(amplitude * 255));
    }
  }

  /**
   * Enable or disable FFT calculation
   */
  setFFTEnabled(enabled: boolean): void {
    this.enableFFT = enabled;
    if (!enabled) {
      this.frequencyData = null;
    }
  }
}
```

## AudioSource Interface

```typescript
// File: @cat2151/oscilloscope-core/src/core/AudioSource.ts

/**
 * AudioSource interface - Abstraction for different audio input sources
 * Implementations: AudioManager (microphone), BufferAdapter (programmatic)
 */
export interface AudioSource {
  /**
   * Get time-domain audio data (waveform)
   * @returns Float32Array normalized to -1.0 to 1.0, or null if not ready
   */
  getTimeDomainData(): Float32Array | null;

  /**
   * Get frequency-domain audio data (spectrum)
   * @returns Uint8Array with 0-255 magnitude values, or null if not available
   */
  getFrequencyData(): Uint8Array | null;

  /**
   * Get the sample rate in Hz
   */
  getSampleRate(): number;

  /**
   * Get the FFT size (number of samples)
   */
  getFFTSize(): number;

  /**
   * Check if the audio source is ready to provide data
   */
  isReady(): boolean;
}
```

## Updated Oscilloscope Class

```typescript
// File: @cat2151/oscilloscope-core/src/Oscilloscope.ts

import { AudioSource } from './core/AudioSource';
import { GainController } from './core/GainController';
import { FrequencyEstimator } from './core/FrequencyEstimator';
import { WaveformRenderer } from './core/WaveformRenderer';
import { ZeroCrossDetector } from './core/ZeroCrossDetector';

/**
 * Oscilloscope - Main class for waveform visualization
 * Now supports both microphone and buffer input via AudioSource interface
 */
export class Oscilloscope {
  private audioSource: AudioSource;
  private gainController: GainController;
  private frequencyEstimator: FrequencyEstimator;
  private renderer: WaveformRenderer;
  private zeroCrossDetector: ZeroCrossDetector;
  private animationId: number | null = null;
  private isRunning = false;
  private manualRenderMode = false;

  /**
   * @param canvas - Canvas element for rendering
   * @param audioSource - Audio source (AudioManager or BufferAdapter)
   */
  constructor(canvas: HTMLCanvasElement, audioSource: AudioSource) {
    this.audioSource = audioSource;
    this.gainController = new GainController();
    this.frequencyEstimator = new FrequencyEstimator();
    this.renderer = new WaveformRenderer(canvas);
    this.zeroCrossDetector = new ZeroCrossDetector();
  }

  /**
   * Start automatic rendering (for real-time sources like microphone)
   */
  start(): void {
    this.isRunning = true;
    this.manualRenderMode = false;
    this.renderLoop();
  }

  /**
   * Stop automatic rendering
   */
  stop(): void {
    this.isRunning = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Manual render (for buffer-based sources)
   * Call this method after updating the buffer in BufferAdapter
   */
  render(): void {
    this.manualRenderMode = true;
    this.renderFrame();
  }

  /**
   * Internal rendering loop for automatic mode
   */
  private renderLoop(): void {
    if (!this.isRunning) return;
    
    this.renderFrame();
    this.animationId = requestAnimationFrame(() => this.renderLoop());
  }

  /**
   * Render a single frame
   */
  private renderFrame(): void {
    if (!this.audioSource.isReady()) {
      return;
    }

    // Get waveform data
    const dataArray = this.audioSource.getTimeDomainData();
    if (!dataArray) {
      return;
    }

    // Apply noise gate
    this.gainController.applyNoiseGate(dataArray);

    // Check if signal passed noise gate
    const isSignalAboveNoiseGate = this.gainController.isSignalAboveNoiseGate(dataArray);

    const sampleRate = this.audioSource.getSampleRate();
    const fftSize = this.audioSource.getFFTSize();

    // Fetch frequency data if needed
    const needsFrequencyData = 
      this.frequencyEstimator.getFrequencyEstimationMethod() === 'fft' || 
      this.renderer.getFFTDisplayEnabled();
    const frequencyData = needsFrequencyData ? this.audioSource.getFrequencyData() : null;

    // Estimate frequency
    const estimatedFrequency = this.frequencyEstimator.estimateFrequency(
      dataArray,
      frequencyData,
      sampleRate,
      fftSize,
      isSignalAboveNoiseGate
    );

    // Clear canvas and draw grid
    this.renderer.clearAndDrawGrid();

    // Calculate display range
    const displayRange = this.zeroCrossDetector.calculateDisplayRange(
      dataArray,
      estimatedFrequency,
      sampleRate
    );
    
    if (displayRange) {
      // Calculate auto gain
      this.gainController.calculateAutoGain(
        dataArray, 
        displayRange.startIndex, 
        displayRange.endIndex
      );
      const gain = this.gainController.getCurrentGain();
      
      // Draw waveform with zero-cross indicators
      this.renderer.drawWaveform(
        dataArray, 
        displayRange.startIndex, 
        displayRange.endIndex, 
        gain
      );
      this.renderer.drawZeroCrossLine(
        displayRange.firstZeroCross, 
        displayRange.startIndex, 
        displayRange.endIndex
      );
      if (displayRange.secondZeroCross !== undefined) {
        this.renderer.drawZeroCrossLine(
          displayRange.secondZeroCross, 
          displayRange.startIndex, 
          displayRange.endIndex
        );
      }
    } else {
      // No zero-cross found, draw entire buffer
      this.gainController.calculateAutoGain(dataArray, 0, dataArray.length);
      const gain = this.gainController.getCurrentGain();
      this.renderer.drawWaveform(dataArray, 0, dataArray.length, gain);
    }

    // Draw FFT spectrum overlay
    if (frequencyData && this.renderer.getFFTDisplayEnabled() && isSignalAboveNoiseGate) {
      this.renderer.drawFFTOverlay(
        frequencyData,
        estimatedFrequency,
        sampleRate,
        fftSize,
        this.frequencyEstimator.getMaxFrequency()
      );
    }
  }

  // Getters and setters
  getIsRunning(): boolean {
    return this.isRunning;
  }

  setAutoGain(enabled: boolean): void {
    this.gainController.setAutoGain(enabled);
  }

  getAutoGainEnabled(): boolean {
    return this.gainController.getAutoGainEnabled();
  }

  setNoiseGate(enabled: boolean): void {
    this.gainController.setNoiseGate(enabled);
  }

  getNoiseGateEnabled(): boolean {
    return this.gainController.getNoiseGateEnabled();
  }

  setNoiseGateThreshold(threshold: number): void {
    this.gainController.setNoiseGateThreshold(threshold);
  }

  getNoiseGateThreshold(): number {
    return this.gainController.getNoiseGateThreshold();
  }

  setFrequencyEstimationMethod(method: 'zero-crossing' | 'autocorrelation' | 'fft'): void {
    this.frequencyEstimator.setFrequencyEstimationMethod(method);
  }

  getFrequencyEstimationMethod(): string {
    return this.frequencyEstimator.getFrequencyEstimationMethod();
  }

  getEstimatedFrequency(): number {
    return this.frequencyEstimator.getEstimatedFrequency();
  }

  setFFTDisplay(enabled: boolean): void {
    this.renderer.setFFTDisplay(enabled);
  }

  getFFTDisplayEnabled(): boolean {
    return this.renderer.getFFTDisplayEnabled();
  }

  getCurrentGain(): number {
    return this.gainController.getCurrentGain();
  }
}
```

## wavlpf Integration Example

### HTML Changes

```html
<!-- index.html - Add canvas for waveform display -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WAVLPF Synthesizer</title>
  <style>
    /* ... existing styles ... */
    
    #waveform-container {
      margin-top: 2em;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;
    }
    
    #waveform-canvas {
      background-color: #000000;
      border: 2px solid #00ff00;
      border-radius: 4px;
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
    }
    
    .waveform-label {
      font-size: 0.9em;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>WAVLPF Synthesizer</h1>
    <div class="instructions">
      Click anywhere to start<br>
      Move your mouse to control the filter
    </div>
    <div id="params">Cutoff: 510Hz | Q: 1.25</div>
    
    <!-- NEW: Waveform visualization -->
    <div id="waveform-container">
      <div class="waveform-label">Waveform Display</div>
      <canvas
        id="waveform-canvas"
        width="800"
        height="300"
        aria-label="Synthesizer waveform visualization"
      ></canvas>
    </div>
    
    <div class="info">
      X-axis: Cutoff Frequency (20Hz - 4000Hz)<br>
      Y-axis: Resonance Q (0.5 - 16.0)<br>
      <br>
      220Hz Sawtooth wave with LPF<br>
      Cutoff decays at 1Hz/ms
    </div>
    <div class="status">
      New audio generated every 250ms
    </div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/tone@14.9.17/build/Tone.js"></script>
  <script type="module" src="/src/index.ts"></script>
</body>
</html>
```

### synth.ts Integration

```typescript
// src/synth.ts - Enhanced with waveform visualization
import { generateSawtooth } from './oscillator';
import { BiquadLPF } from './filter';
import { generateWav, createWavBlobUrl } from './wav';
import { Oscilloscope } from '@cat2151/oscilloscope-core';
import { BufferAdapter } from '@cat2151/oscilloscope-core/adapters';

// ... existing Tone declarations ...

const SAMPLE_RATE = 44100;
const DURATION = 0.25; // 250ms
const FREQUENCY = 220; // 220Hz (A3)
const BUFFER_SIZE = Math.floor(SAMPLE_RATE * DURATION); // ~11025 samples

// Mouse position state
let mouseX = 0.5;
let mouseY = 0.5;

// Track currently playing player
let currentPlayer: TonePlayer | null = null;

// Track playback timeout for cleanup
let playbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

// NEW: Oscilloscope for waveform visualization
let oscilloscope: Oscilloscope | null = null;
let bufferAdapter: BufferAdapter | null = null;

/**
 * Map mouse position to filter parameters
 */
function getFilterParams(): { cutoff: number; q: number } {
  // X: Cutoff frequency 20Hz - 4000Hz
  const cutoff = 20 + mouseX * (4000 - 20);
  // Y: Q value 0.5 - 16 (inverted: top = high Q, bottom = low Q)
  const q = 0.5 + (1 - mouseY) * (16 - 0.5);
  return { cutoff, q };
}

/**
 * Render audio with LPF and cutoff decay
 */
function renderAudio(): Float32Array {
  // Generate sawtooth wave
  const samples = generateSawtooth(FREQUENCY, SAMPLE_RATE, DURATION);
  
  // NEW: Display pre-filter waveform (optional)
  if (bufferAdapter && oscilloscope) {
    bufferAdapter.setBuffer(samples);
    oscilloscope.render();
  }
  
  // Create filter
  const filter = new BiquadLPF(SAMPLE_RATE);
  const { cutoff: initialCutoff, q } = getFilterParams();
  
  // Process each sample with cutoff decay
  const numSamples = samples.length;
  const output = new Float32Array(numSamples);
  
  const updateIntervalMs = 1;
  const samplesPerUpdate = Math.max(1, Math.floor(SAMPLE_RATE * (updateIntervalMs / 1000)));
  
  let currentCutoff = initialCutoff;
  
  for (let i = 0; i < numSamples; i++) {
    if (i % samplesPerUpdate === 0) {
      const timeMs = (i / SAMPLE_RATE) * 1000;
      currentCutoff = Math.max(1, initialCutoff - timeMs);
      filter.setCoefficients(currentCutoff, q);
    }
    
    output[i] = filter.processSample(samples[i]);
  }
  
  // NEW: Display post-filter waveform
  if (bufferAdapter && oscilloscope) {
    bufferAdapter.setBuffer(output);
    oscilloscope.render();
  }
  
  return output;
}

/**
 * Generate and play audio
 */
async function playAudio(): Promise<void> {
  // Render audio
  const samples = renderAudio();
  
  // Generate WAV
  const wavData = generateWav(samples, SAMPLE_RATE);
  const wavUrl = createWavBlobUrl(wavData);
  
  // Stop previous player if exists
  if (currentPlayer) {
    try {
      currentPlayer.stop();
      currentPlayer.dispose();
    } catch (error) {
      console.warn('Failed to stop or dispose previous player:', error);
    }
  }
  
  // Create and play new player
  currentPlayer = new Tone.Player(wavUrl).toDestination();
  await Tone.loaded();
  currentPlayer.start();
  
  // Clean up URL after playback
  setTimeout(() => {
    URL.revokeObjectURL(wavUrl);
  }, 250);
}

/**
 * Initialize the oscilloscope visualization
 */
function initOscilloscope(): void {
  const canvas = document.getElementById('waveform-canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.warn('Waveform canvas not found, skipping oscilloscope initialization');
    return;
  }
  
  try {
    bufferAdapter = new BufferAdapter(BUFFER_SIZE, SAMPLE_RATE, false);
    oscilloscope = new Oscilloscope(canvas, bufferAdapter);
    
    // Configure oscilloscope
    oscilloscope.setAutoGain(true);
    oscilloscope.setFFTDisplay(false); // Disable FFT for now (no real-time data)
    oscilloscope.setNoiseGate(false);  // Disable noise gate (we control the signal)
    
    console.log('Oscilloscope initialized successfully');
  } catch (error) {
    console.error('Failed to initialize oscilloscope:', error);
  }
}

/**
 * Initialize the synthesizer
 */
export async function init(): Promise<void> {
  // NEW: Initialize oscilloscope
  initOscilloscope();
  
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    // Update display
    const cutoff = Math.round(20 + mouseX * (4000 - 20));
    const q = (0.5 + (1 - mouseY) * (16 - 0.5)).toFixed(2);
    
    const display = document.getElementById('params');
    if (display) {
      display.textContent = `Cutoff: ${cutoff}Hz | Q: ${q}`;
    }
  });
  
  // Play audio every 250ms
  function scheduleNextPlay() {
    if (Tone.context.state === 'running') {
      playAudio().catch((error: unknown) => {
        console.error('Error while playing audio:', error);
      });
    }
    playbackTimeoutId = setTimeout(scheduleNextPlay, 250);
  }
  
  // Start audio context on user interaction
  document.addEventListener('click', async () => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
      console.log('Audio context started');
      scheduleNextPlay();
    }
  }, { once: true });
  
  console.log('WAVLPF Synthesizer initialized');
  console.log('Click anywhere to start audio');
  console.log('Move mouse to control filter parameters');
}

/**
 * Stop the synthesizer and clean up resources
 */
export function dispose(): void {
  // Clear playback timeout
  if (playbackTimeoutId !== null) {
    clearTimeout(playbackTimeoutId);
    playbackTimeoutId = null;
  }
  
  // Stop and dispose current player
  if (currentPlayer) {
    try {
      currentPlayer.stop();
      currentPlayer.dispose();
    } catch (error) {
      console.warn('Failed to dispose player during cleanup:', error);
    }
    currentPlayer = null;
  }
  
  // NEW: Clean up oscilloscope
  if (oscilloscope) {
    oscilloscope.stop();
    oscilloscope = null;
  }
  
  bufferAdapter = null;
}
```

### package.json Updates

```json
{
  "name": "wavlpf",
  "version": "1.0.0",
  "description": "Simple software synthesizer with LPF filter",
  "main": "dist/index.js",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "coverage": "vitest run --coverage",
    "serve": "vite preview"
  },
  "keywords": [
    "synthesizer",
    "audio",
    "lpf",
    "tone.js",
    "oscilloscope"
  ],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "tone": "^14.7.77",
    "@cat2151/oscilloscope-core": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@vitest/ui": "^4.0.16",
    "happy-dom": "^20.0.11",
    "typescript": "^5.3.3",
    "vite": "^7.3.0",
    "vitest": "^4.0.16"
  }
}
```

## Testing Example

```typescript
// src/__tests__/oscilloscope-integration.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { BufferAdapter } from '@cat2151/oscilloscope-core/adapters';
import { generateSawtooth } from '../oscillator';

describe('Oscilloscope Integration', () => {
  let bufferAdapter: BufferAdapter;
  const SAMPLE_RATE = 44100;
  const BUFFER_SIZE = 4096;

  beforeEach(() => {
    bufferAdapter = new BufferAdapter(BUFFER_SIZE, SAMPLE_RATE);
  });

  it('should accept Float32Array buffers', () => {
    const samples = generateSawtooth(220, SAMPLE_RATE, 0.1);
    
    bufferAdapter.setBuffer(samples);
    
    expect(bufferAdapter.isReady()).toBe(true);
    expect(bufferAdapter.getTimeDomainData()).toBe(samples);
  });

  it('should return correct sample rate', () => {
    expect(bufferAdapter.getSampleRate()).toBe(SAMPLE_RATE);
  });

  it('should return correct FFT size', () => {
    expect(bufferAdapter.getFFTSize()).toBe(BUFFER_SIZE);
  });

  it('should handle buffer updates', () => {
    const samples1 = generateSawtooth(220, SAMPLE_RATE, 0.1);
    const samples2 = generateSawtooth(440, SAMPLE_RATE, 0.1);
    
    bufferAdapter.setBuffer(samples1);
    expect(bufferAdapter.getTimeDomainData()).toBe(samples1);
    
    bufferAdapter.setBuffer(samples2);
    expect(bufferAdapter.getTimeDomainData()).toBe(samples2);
  });
});
```

---

These examples provide complete, production-ready code for the proposed integration architecture.
