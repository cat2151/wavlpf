/**
 * Full rendered waveform display
 * Shows the entire pre-rendered audio buffer as a static waveform
 */

// Canvas and context for full waveform display
let fullWaveformCanvas: HTMLCanvasElement | null = null;
let fullWaveformContext: CanvasRenderingContext2D | null = null;

/**
 * Initialize full waveform display
 * @param canvasElement - Canvas element for full waveform display
 */
export function initFullWaveformDisplay(canvasElement: HTMLCanvasElement): void {
  fullWaveformCanvas = canvasElement;
  fullWaveformContext = fullWaveformCanvas.getContext('2d');

  if (!fullWaveformContext) {
    throw new Error('Failed to get 2D context for full waveform canvas');
  }

  console.log('Full waveform display initialized');
}

/**
 * Draw the full rendered waveform
 * @param samples - Audio samples as Float32Array
 * @param sampleRate - Sample rate in Hz
 */
export function drawFullWaveform(samples: Float32Array, sampleRate: number): void {
  if (!fullWaveformContext || !fullWaveformCanvas) {
    console.warn('Full waveform display not initialized');
    return;
  }

  const width = fullWaveformCanvas.width;
  const height = fullWaveformCanvas.height;

  // Clear canvas
  fullWaveformContext.fillStyle = 'rgba(0, 0, 0, 0.9)';
  fullWaveformContext.fillRect(0, 0, width, height);

  // Draw waveform
  fullWaveformContext.strokeStyle = '#ff8800';
  fullWaveformContext.lineWidth = 1;

  const centerY = height / 2;
  const samplesPerPixel = Math.ceil(samples.length / width);

  fullWaveformContext.beginPath();
  for (let x = 0; x < width; x++) {
    const startSample = x * samplesPerPixel;
    const endSample = Math.min(startSample + samplesPerPixel, samples.length);

    // Find min and max in this pixel range for better visualization
    let min = samples[startSample];
    let max = samples[startSample];

    for (let i = startSample; i < endSample; i++) {
      if (samples[i] < min) min = samples[i];
      if (samples[i] > max) max = samples[i];
    }

    // Draw vertical line from min to max
    const yMin = centerY - (max * centerY * 0.9);
    const yMax = centerY - (min * centerY * 0.9);

    fullWaveformContext.moveTo(x, yMin);
    fullWaveformContext.lineTo(x, yMax);
  }
  fullWaveformContext.stroke();

  // Draw center line
  fullWaveformContext.strokeStyle = '#444';
  fullWaveformContext.lineWidth = 1;
  fullWaveformContext.beginPath();
  fullWaveformContext.moveTo(0, centerY);
  fullWaveformContext.lineTo(width, centerY);
  fullWaveformContext.stroke();

  // Draw labels
  fullWaveformContext.fillStyle = '#888';
  fullWaveformContext.font = '10px monospace';
  fullWaveformContext.fillText('Full Rendered Waveform', 5, 15);

  // Calculate and display duration
  const durationMs = (samples.length / sampleRate) * 1000;
  fullWaveformContext.fillText(`Duration: ${durationMs.toFixed(1)}ms`, 5, height - 5);
  fullWaveformContext.fillText(`Samples: ${samples.length}`, width - 120, height - 5);
}

/**
 * Clear the full waveform display
 */
export function clearFullWaveform(): void {
  if (fullWaveformContext && fullWaveformCanvas) {
    fullWaveformContext.clearRect(0, 0, fullWaveformCanvas.width, fullWaveformCanvas.height);
  }
}

/**
 * Check if full waveform display is initialized
 */
export function isFullWaveformDisplayInitialized(): boolean {
  return fullWaveformCanvas !== null && fullWaveformContext !== null;
}
