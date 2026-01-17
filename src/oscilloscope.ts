/**
 * Oscilloscope visualization integration using cat-oscilloscope library
 */
import { Oscilloscope, BufferSource, PianoKeyboardRenderer, OverlaysLayoutConfig } from 'cat-oscilloscope';

let oscilloscope: Oscilloscope | null = null;
let currentBufferSource: BufferSource | null = null;
let pianoKeyboard: PianoKeyboardRenderer | null = null;
let isUpdating = false; // Guard against concurrent updates
let hasPermanentFailure = false; // Track if oscilloscope has failed permanently to avoid repeated error logging
let debugUpdateInterval: number | null = null; // Interval ID for debug overlay updates

/**
 * Initialize the oscilloscope with all required canvas elements
 * cat-oscilloscope requires 5 canvas elements for full functionality:
 * - Main oscilloscope display
 * - Previous waveform comparison
 * - Current waveform comparison
 * - Similarity plot
 * - Frame buffer display
 * 
 * Additionally, we use PianoKeyboardRenderer for piano keyboard visualization.
 * 
 * @param mainCanvas - Canvas element for main rendering
 * @throws Error if any required canvas element is not found or invalid
 */
export function initOscilloscope(mainCanvas: HTMLCanvasElement): void {
  if (!mainCanvas || !(mainCanvas instanceof HTMLCanvasElement)) {
    throw new Error('Invalid canvas element provided to initOscilloscope');
  }

  // Reset permanent failure flag on reinitialization to allow recovery
  hasPermanentFailure = false;

  // Get all required canvas elements from the DOM
  const previousWaveformCanvas = document.getElementById('previousWaveformCanvas');
  const currentWaveformCanvas = document.getElementById('currentWaveformCanvas');
  const similarityPlotCanvas = document.getElementById('similarityPlotCanvas');
  const frameBufferCanvas = document.getElementById('frameBufferCanvas');
  const pianoKeyboardCanvas = document.getElementById('pianoKeyboardCanvas');

  // Validate all canvas elements exist
  if (!previousWaveformCanvas || !currentWaveformCanvas || !similarityPlotCanvas || !frameBufferCanvas || !pianoKeyboardCanvas) {
    throw new Error('One or more required oscilloscope canvas elements not found in DOM');
  }

  // Validate all elements are actually HTMLCanvasElement instances
  const canvasElements = [
    { element: previousWaveformCanvas, id: 'previousWaveformCanvas' },
    { element: currentWaveformCanvas, id: 'currentWaveformCanvas' },
    { element: similarityPlotCanvas, id: 'similarityPlotCanvas' },
    { element: frameBufferCanvas, id: 'frameBufferCanvas' },
    { element: pianoKeyboardCanvas, id: 'pianoKeyboardCanvas' }
  ];

  for (const { element, id } of canvasElements) {
    if (!(element instanceof HTMLCanvasElement)) {
      throw new Error(`Element with id "${id}" is not a canvas element`);
    }
  }

  // Configure overlay layout to position frequency plot in top-right corner
  // and FFT overlay in bottom-left corner
  const overlaysLayout: OverlaysLayoutConfig = {
    frequencyPlot: {
      position: { x: 'right-10', y: 10 },
      size: { width: 280, height: 120 }
    },
    fftOverlay: {
      position: { x: 10, y: '65%' },
      size: { width: '35%', height: '35%' }
    },
    harmonicAnalysis: {
      position: { x: 10, y: 10 },
      size: { width: 500, height: 'auto' }
    }
  };

  // Initialize the main oscilloscope (elements are now validated as HTMLCanvasElement)
  oscilloscope = new Oscilloscope(
    mainCanvas,
    previousWaveformCanvas as HTMLCanvasElement,
    currentWaveformCanvas as HTMLCanvasElement,
    similarityPlotCanvas as HTMLCanvasElement,
    frameBufferCanvas as HTMLCanvasElement,
    overlaysLayout
  );

  // Initialize piano keyboard renderer
  pianoKeyboard = new PianoKeyboardRenderer(pianoKeyboardCanvas as HTMLCanvasElement);

  // Start debug overlay updates
  startDebugOverlayUpdates();
}

/**
 * Start periodic updates of the debug overlay
 */
function startDebugOverlayUpdates(): void {
  // Clear any existing interval
  if (debugUpdateInterval !== null) {
    clearInterval(debugUpdateInterval);
  }

  // Update debug overlay every 100ms (10 FPS)
  debugUpdateInterval = window.setInterval(() => {
    if (!oscilloscope || hasPermanentFailure) return;

    try {
      // Update frequency display
      const frequency = oscilloscope.getEstimatedFrequency();
      const frequencyElement = document.getElementById('frequencyValue');
      if (frequencyElement) {
        frequencyElement.textContent = frequency > 0 ? `${frequency.toFixed(1)} Hz` : '--- Hz';
      }

      // Update note display
      const noteElement = document.getElementById('noteValue');
      if (noteElement && frequency > 0) {
        noteElement.textContent = frequencyToNote(frequency);
      } else if (noteElement) {
        noteElement.textContent = '---';
      }

      // Update gain display
      const gain = oscilloscope.getCurrentGain();
      const gainElement = document.getElementById('gainValue');
      if (gainElement) {
        gainElement.textContent = `${gain.toFixed(2)}x`;
      }

      // Update similarity display
      const similarity = oscilloscope.getSimilarityScore();
      const similarityElement = document.getElementById('similarityValue');
      if (similarityElement) {
        similarityElement.textContent = similarity >= 0 ? `${(similarity * 100).toFixed(1)}%` : '---';
      }

      // Update piano keyboard
      if (pianoKeyboard && frequency > 0) {
        pianoKeyboard.render(frequency);
      } else if (pianoKeyboard) {
        pianoKeyboard.clear();
      }
    } catch (error) {
      console.error('Error updating debug overlay:', error);
    }
  }, 100);
}

/**
 * Stop debug overlay updates
 */
function stopDebugOverlayUpdates(): void {
  if (debugUpdateInterval !== null) {
    clearInterval(debugUpdateInterval);
    debugUpdateInterval = null;
  }
}

/**
 * Convert frequency to note name (simple implementation)
 */
function frequencyToNote(frequency: number): string {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const a4 = 440;
  const c0 = a4 * Math.pow(2, -4.75); // C0 frequency

  if (frequency < 16 || frequency > 20000) {
    return '---';
  }

  const halfSteps = 12 * Math.log2(frequency / c0);
  const octave = Math.floor(halfSteps / 12);
  const noteIndexRaw = Math.floor(halfSteps % 12);
  const note = Math.min(Math.max(noteIndexRaw, 0), noteNames.length - 1);

  return `${noteNames[note]}${octave}`;
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
  stopDebugOverlayUpdates();
  pianoKeyboard = null;
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
