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

/**
 * Generate a pulse wave
 * @param frequency - Frequency in Hz
 * @param sampleRate - Sample rate in Hz
 * @param duration - Duration in seconds
 * @param dutyRatio - Duty ratio as percentage (0-100)
 * @returns Array of samples
 */
export function generatePulse(frequency: number, sampleRate: number, duration: number, dutyRatio: number): Float32Array {
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  
  // Clamp duty ratio to valid range
  const duty = Math.max(0, Math.min(100, dutyRatio)) / 100;
  
  for (let i = 0; i < numSamples; i++) {
    const time = i / sampleRate;
    const phase = (time * frequency) % 1.0;
    // Pulse wave: +1 when phase < duty, -1 otherwise
    samples[i] = phase < duty ? 1 : -1;
  }
  
  return samples;
}
