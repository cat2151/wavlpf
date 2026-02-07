/**
 * Real-time audio analysis using Tone.js FFT and Waveform analyzers
 * Displays FFT spectrum and waveform at 1/60 second intervals during playback
 */

import type * as ToneTypes from 'tone';

// Analyzers for real-time audio analysis
let fftAnalyzer: ToneTypes.FFT | null = null;
let waveformAnalyzer: ToneTypes.Waveform | null = null;

// Canvas elements and contexts for visualization
let fftCanvas: HTMLCanvasElement | null = null;
let fftContext: CanvasRenderingContext2D | null = null;
let waveformCanvas: HTMLCanvasElement | null = null;
let waveformContext: CanvasRenderingContext2D | null = null;

// Animation frame ID for cleanup
let animationFrameId: number | null = null;
let lastUpdateTime = 0;
const UPDATE_INTERVAL_MS = 1000 / 60; // 1/60 second = 16.67ms

// Track if analyzers are initialized
let isInitialized = false;

/**
 * Initialize real-time analyzers
 * Must be called after Tone.js is loaded
 * @param Tone - Tone.js module
 * @param fftCanvasElement - Canvas for FFT display
 * @param waveformCanvasElement - Canvas for waveform display
 */
export function initRealtimeAnalysis(
  Tone: typeof ToneTypes,
  fftCanvasElement: HTMLCanvasElement,
  waveformCanvasElement: HTMLCanvasElement
): void {
  if (isInitialized) {
    return; // Already initialized
  }

  // Store canvas references
  fftCanvas = fftCanvasElement;
  waveformCanvas = waveformCanvasElement;

  // Get 2D contexts
  fftContext = fftCanvas.getContext('2d');
  waveformContext = waveformCanvas.getContext('2d');

  if (!fftContext || !waveformContext) {
    throw new Error('Failed to get 2D contexts for analysis canvases');
  }

  // Create analyzers
  // FFT with 1024 samples provides good frequency resolution
  fftAnalyzer = new Tone.FFT(1024);
  // Waveform with 1024 samples for smooth display
  waveformAnalyzer = new Tone.Waveform(1024);

  // Connect analyzers to Tone.js destination
  Tone.Destination.connect(fftAnalyzer);
  Tone.Destination.connect(waveformAnalyzer);

  isInitialized = true;
  console.log('Real-time analysis initialized');
}

/**
 * Start real-time visualization updates
 */
export function startRealtimeVisualization(): void {
  if (!isInitialized) {
    console.warn('Real-time analysis not initialized');
    return;
  }

  if (animationFrameId !== null) {
    return; // Already running
  }

  lastUpdateTime = performance.now();
  animate();
}

/**
 * Stop real-time visualization updates
 */
export function stopRealtimeVisualization(): void {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  // Clear canvases
  if (fftContext && fftCanvas) {
    fftContext.clearRect(0, 0, fftCanvas.width, fftCanvas.height);
  }
  if (waveformContext && waveformCanvas) {
    waveformContext.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
  }
}

/**
 * Animation loop for real-time visualization
 * Updates at approximately 1/60 second intervals
 */
function animate(): void {
  const currentTime = performance.now();
  const deltaTime = currentTime - lastUpdateTime;

  // Update at 1/60 second intervals (approximately 60 FPS)
  if (deltaTime >= UPDATE_INTERVAL_MS) {
    drawFFT();
    drawWaveform();
    lastUpdateTime = currentTime;
  }

  animationFrameId = requestAnimationFrame(animate);
}

/**
 * Draw FFT spectrum
 */
function drawFFT(): void {
  if (!fftAnalyzer || !fftContext || !fftCanvas) {
    return;
  }

  const width = fftCanvas.width;
  const height = fftCanvas.height;

  // Get FFT values (frequency domain data in decibels)
  const values = fftAnalyzer.getValue() as Float32Array;

  // Clear canvas
  fftContext.fillStyle = 'rgba(0, 0, 0, 0.9)';
  fftContext.fillRect(0, 0, width, height);

  // Draw spectrum
  fftContext.fillStyle = '#00ff00';
  fftContext.strokeStyle = '#00ff00';
  fftContext.lineWidth = 2;

  const barWidth = width / values.length;

  fftContext.beginPath();
  for (let i = 0; i < values.length; i++) {
    // Convert from dB (-100 to 0) to canvas height (0 to 1)
    const value = (values[i] + 100) / 100;
    const barHeight = value * height;
    const x = i * barWidth;
    const y = height - barHeight;

    if (i === 0) {
      fftContext.moveTo(x, y);
    } else {
      fftContext.lineTo(x, y);
    }
  }
  fftContext.stroke();

  // Draw axis labels
  fftContext.fillStyle = '#888';
  fftContext.font = '10px monospace';
  fftContext.fillText('FFT Spectrum', 5, 15);
  fftContext.fillText('0Hz', 5, height - 5);
  fftContext.fillText('22kHz', width - 40, height - 5);
}

/**
 * Draw waveform
 */
function drawWaveform(): void {
  if (!waveformAnalyzer || !waveformContext || !waveformCanvas) {
    return;
  }

  const width = waveformCanvas.width;
  const height = waveformCanvas.height;

  // Get waveform values (time domain data, -1 to 1)
  const values = waveformAnalyzer.getValue() as Float32Array;

  // Clear canvas
  waveformContext.fillStyle = 'rgba(0, 0, 0, 0.9)';
  waveformContext.fillRect(0, 0, width, height);

  // Draw waveform
  waveformContext.strokeStyle = '#00ffff';
  waveformContext.lineWidth = 2;

  const sliceWidth = width / values.length;
  const centerY = height / 2;

  waveformContext.beginPath();
  for (let i = 0; i < values.length; i++) {
    const x = i * sliceWidth;
    const y = centerY + (values[i] * centerY * 0.9); // Scale to 90% of height

    if (i === 0) {
      waveformContext.moveTo(x, y);
    } else {
      waveformContext.lineTo(x, y);
    }
  }
  waveformContext.stroke();

  // Draw center line
  waveformContext.strokeStyle = '#444';
  waveformContext.lineWidth = 1;
  waveformContext.beginPath();
  waveformContext.moveTo(0, centerY);
  waveformContext.lineTo(width, centerY);
  waveformContext.stroke();

  // Draw label
  waveformContext.fillStyle = '#888';
  waveformContext.font = '10px monospace';
  waveformContext.fillText('Real-time Waveform', 5, 15);
}

/**
 * Check if real-time analysis is initialized
 */
export function isRealtimeAnalysisInitialized(): boolean {
  return isInitialized;
}

/**
 * Dispose of real-time analysis resources
 */
export function disposeRealtimeAnalysis(): void {
  stopRealtimeVisualization();

  if (fftAnalyzer) {
    fftAnalyzer.dispose();
    fftAnalyzer = null;
  }

  if (waveformAnalyzer) {
    waveformAnalyzer.dispose();
    waveformAnalyzer = null;
  }

  fftCanvas = null;
  fftContext = null;
  waveformCanvas = null;
  waveformContext = null;
  isInitialized = false;
}
