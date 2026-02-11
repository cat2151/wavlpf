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
  // Prevent out-of-bounds access when canvas width exceeds sample count
  const drawWidth = Math.min(width, samples.length);
  for (let x = 0; x < drawWidth; x++) {
    const startSample = x * samplesPerPixel;
    // Skip if startSample is beyond array bounds
    if (startSample >= samples.length) {
      break;
    }
    const endSample = Math.min(startSample + samplesPerPixel, samples.length);

    // Find min and max in this pixel range for better visualization
    let min = Math.max(-1, Math.min(1, samples[startSample]));
    let max = min;

    for (let i = startSample; i < endSample; i++) {
      const clampedSample = Math.max(-1, Math.min(1, samples[i]));
      if (clampedSample < min) min = clampedSample;
      if (clampedSample > max) max = clampedSample;
    }

    // Draw vertical line from min to max
    let yMin = centerY - (max * centerY * 0.9);
    let yMax = centerY - (min * centerY * 0.9);

    // Ensure flat/clipped regions remain visible by drawing at least a 1px stroke
    if (yMin === yMax) {
      const halfPixel = 0.5;
      yMin -= halfPixel;
      yMax += halfPixel;
    }

    yMin = Math.max(0, Math.min(height, yMin));
    yMax = Math.max(0, Math.min(height, yMax));

    if (yMin === yMax) {
      yMax = Math.min(height, yMax + 1);
    }

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
 * Dispose of full waveform display resources (used in tests to avoid shared state)
 */
export function disposeFullWaveformDisplay(): void {
  fullWaveformCanvas = null;
  fullWaveformContext = null;
}

/**
 * Check if full waveform display is initialized
 */
export function isFullWaveformDisplayInitialized(): boolean {
  return fullWaveformCanvas !== null && fullWaveformContext !== null;
}
