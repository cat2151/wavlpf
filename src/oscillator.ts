/**
 * Generate a sawtooth wave
 * @param frequency - Frequency in Hz
 * @param sampleRate - Sample rate in Hz
 * @param duration - Duration in seconds
 * @returns Array of samples
 */
export function generateSawtooth(frequency: number, sampleRate: number, duration: number): Float32Array {
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  
  for (let i = 0; i < numSamples; i++) {
    const time = i / sampleRate;
    const phase = (time * frequency) % 1.0;
    // Sawtooth wave: -1 to 1
    samples[i] = 2 * phase - 1;
  }
  
  return samples;
}
