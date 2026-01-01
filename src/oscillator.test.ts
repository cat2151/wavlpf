import { describe, it, expect } from 'vitest';
import { generateSawtooth } from './oscillator';

describe('generateSawtooth', () => {
  it('should generate correct number of samples', () => {
    const frequency = 220;
    const sampleRate = 44100;
    const duration = 0.5;
    
    const samples = generateSawtooth(frequency, sampleRate, duration);
    const expectedSamples = Math.floor(sampleRate * duration);
    
    expect(samples.length).toBe(expectedSamples);
  });
  
  it('should generate samples in range [-1, 1]', () => {
    const frequency = 220;
    const sampleRate = 44100;
    const duration = 0.1;
    
    const samples = generateSawtooth(frequency, sampleRate, duration);
    
    // Check all samples are in valid range
    for (const sample of samples) {
      expect(sample).toBeGreaterThanOrEqual(-1);
      expect(sample).toBeLessThanOrEqual(1);
    }
  });
  
  it('should generate periodic waveform', () => {
    const frequency = 1000; // 1kHz for easier period calculation
    const sampleRate = 44100;
    const duration = 0.01; // 10ms
    
    const samples = generateSawtooth(frequency, sampleRate, duration);
    const samplesPerCycle = sampleRate / frequency;
    
    // Check that the waveform repeats with the correct period
    // Sample at start of cycle should be close to -1
    const startSample = samples[0];
    expect(startSample).toBeCloseTo(-1, 1);
    
    // Sample near end of first cycle should be close to 1
    const endOfCycleSample = samples[Math.floor(samplesPerCycle) - 1];
    expect(endOfCycleSample).toBeCloseTo(1, 0);
  });
  
  it('should handle zero duration', () => {
    const frequency = 220;
    const sampleRate = 44100;
    const duration = 0;
    
    const samples = generateSawtooth(frequency, sampleRate, duration);
    
    expect(samples.length).toBe(0);
  });
  
  it('should generate different values for different frequencies', () => {
    const sampleRate = 44100;
    const duration = 0.1;
    
    const samples220 = generateSawtooth(220, sampleRate, duration);
    const samples440 = generateSawtooth(440, sampleRate, duration);
    
    // At sample 100, values should be different due to different frequencies
    expect(samples220[100]).not.toBe(samples440[100]);
  });
});
