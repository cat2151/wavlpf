/**
 * Oscilloscope visualization integration using cat-oscilloscope library
 */
import { Oscilloscope, BufferSource } from 'cat-oscilloscope';

let oscilloscope: Oscilloscope | null = null;
let currentBufferSource: BufferSource | null = null;
let dummyCanvases: HTMLCanvasElement[] = [];
let isUpdating = false; // Guard against concurrent updates
let hasPermanentFailure = false; // Track if oscilloscope has failed permanently to avoid repeated error logging

/**
 * Initialize the oscilloscope with a canvas element
 * Note: cat-oscilloscope requires 5 canvas elements for full functionality:
 * - Main oscilloscope display
 * - Previous waveform comparison
 * - Current waveform comparison
 * - Similarity plot
 * - Frame buffer display
 * 
 * For wavlpf's simple use case, we only need the main display,
 * so we create dummy canvases for the comparison features.
 * 
 * @param mainCanvas - Canvas element for main rendering
 * @throws Error if mainCanvas is not a valid HTMLCanvasElement
 */
export function initOscilloscope(mainCanvas: HTMLCanvasElement): void {
  if (!mainCanvas || !(mainCanvas instanceof HTMLCanvasElement)) {
    throw new Error('Invalid canvas element provided to initOscilloscope');
  }

  // Reset permanent failure flag on reinitialization to allow recovery
  hasPermanentFailure = false;

  // Clean up any existing dummy canvases from previous initialization
  cleanupDummyCanvases();

  // Create dummy canvases for comparison features
  // These are required by cat-oscilloscope but not needed for wavlpf's use case
  const createDummyCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    canvas.style.display = 'none';
    dummyCanvases.push(canvas); // Track for cleanup
    return canvas;
  };

  const previousWaveformCanvas = createDummyCanvas();
  const currentWaveformCanvas = createDummyCanvas();
  const similarityPlotCanvas = createDummyCanvas();
  const frameBufferCanvas = createDummyCanvas();

  oscilloscope = new Oscilloscope(
    mainCanvas,
    previousWaveformCanvas,
    currentWaveformCanvas,
    similarityPlotCanvas,
    frameBufferCanvas
  );
}

/**
 * Clean up dummy canvases to prevent memory leaks
 */
function cleanupDummyCanvases(): void {
  dummyCanvases.forEach(canvas => {
    // Remove any references to allow garbage collection
    canvas.width = 0;
    canvas.height = 0;
  });
  dummyCanvases = [];
}

/**
 * Validate input parameters for oscilloscope update
 * @param samples - Audio samples to validate
 * @param sampleRate - Sample rate to validate
 * @throws Error if inputs are invalid
 */
function validateInputs(samples: Float32Array, sampleRate: number): void {
  if (!samples || samples.length === 0) {
    throw new Error('Invalid samples: array is empty or null');
  }

  if (!Number.isFinite(sampleRate) || sampleRate <= 0) {
    throw new Error(`Invalid sample rate: ${sampleRate}. Must be a positive finite number.`);
  }

  // Check for invalid float values
  for (let i = 0; i < Math.min(samples.length, 100); i++) { // Sample check first 100 values
    if (!Number.isFinite(samples[i])) {
      throw new Error(`Invalid sample value at index ${i}: ${samples[i]}`);
    }
  }
}

/**
 * Update the oscilloscope visualization with new audio data
 * @param samples - Audio samples as Float32Array
 * @param sampleRate - Sample rate in Hz
 * @returns Promise that resolves when update is complete
 */
export async function updateOscilloscope(samples: Float32Array, sampleRate: number): Promise<void> {
  if (!oscilloscope) {
    throw new Error('Oscilloscope not initialized. Call initOscilloscope() first.');
  }

  // If oscilloscope has permanently failed, silently skip updates to prevent console spam
  // Note: This check is after initialization check to ensure proper error reporting for uninitialized state
  if (hasPermanentFailure) {
    return;
  }

  // Prevent concurrent updates
  if (isUpdating) {
    console.warn('Oscilloscope update already in progress, skipping this update');
    return;
  }

  try {
    isUpdating = true;

    // Validate inputs
    validateInputs(samples, sampleRate);

    // Stop previous visualization if any
    if (currentBufferSource) {
      await oscilloscope.stop();
    }

    // Create a new BufferSource with loop enabled for continuous visualization
    currentBufferSource = new BufferSource(samples, sampleRate, { loop: true });

    // Start visualization from the buffer
    await oscilloscope.startFromBuffer(currentBufferSource);
  } catch (error) {
    // Check if this is a WASM initialization error using specific error message pattern
    // We use a specific pattern to avoid false positives from generic errors that mention WASM
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('Failed to load WASM module script')) {
      // Mark as permanent failure to prevent repeated error logging
      hasPermanentFailure = true;
      // Log once and throw to notify the caller
      console.error('Oscilloscope WASM initialization failed permanently. Visualization will be disabled.', error);
      throw error;
    }
    // For other errors, just re-throw without marking as permanent
    throw error;
  } finally {
    isUpdating = false;
  }
}

/**
 * Stop the oscilloscope visualization and clean up resources
 */
export async function stopOscilloscope(): Promise<void> {
  if (oscilloscope) {
    await oscilloscope.stop();
    currentBufferSource = null;
  }
  cleanupDummyCanvases();
  oscilloscope = null;
  // Reset permanent failure flag to allow reinitialization with a fresh state
  hasPermanentFailure = false;
}

/**
 * Check if oscilloscope is initialized
 */
export function isOscilloscopeInitialized(): boolean {
  return oscilloscope !== null && !hasPermanentFailure;
}
