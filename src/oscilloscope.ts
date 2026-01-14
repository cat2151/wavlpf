/**
 * Oscilloscope visualization integration using cat-oscilloscope library
 */
import { Oscilloscope, BufferSource } from 'cat-oscilloscope';

let oscilloscope: Oscilloscope | null = null;
let currentBufferSource: BufferSource | null = null;

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
 */
export function initOscilloscope(mainCanvas: HTMLCanvasElement): void {
  // Create dummy canvases for comparison features
  // These are required by cat-oscilloscope but not needed for wavlpf's use case
  const createDummyCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    canvas.style.display = 'none';
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
 * Update the oscilloscope visualization with new audio data
 * @param samples - Audio samples as Float32Array
 * @param sampleRate - Sample rate in Hz
 */
export async function updateOscilloscope(samples: Float32Array, sampleRate: number): Promise<void> {
  if (!oscilloscope) {
    console.warn('Oscilloscope not initialized');
    return;
  }

  try {
    // Stop previous visualization if any
    if (currentBufferSource) {
      await oscilloscope.stop();
    }

    // Create a new BufferSource with loop enabled for continuous visualization
    currentBufferSource = new BufferSource(samples, sampleRate, { loop: true });

    // Start visualization from the buffer
    await oscilloscope.startFromBuffer(currentBufferSource);
  } catch (error) {
    console.error('Error updating oscilloscope:', error);
  }
}

/**
 * Stop the oscilloscope visualization
 */
export async function stopOscilloscope(): Promise<void> {
  if (oscilloscope) {
    await oscilloscope.stop();
    currentBufferSource = null;
  }
}

/**
 * Check if oscilloscope is initialized
 */
export function isOscilloscopeInitialized(): boolean {
  return oscilloscope !== null;
}
