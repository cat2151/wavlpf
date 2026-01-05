import { describe, it, expect } from 'vitest';
import { generateSawtooth, generatePulse } from './oscillator';

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

describe('generatePulse', () => {
  it('should generate correct number of samples', () => {
    const frequency = 220;
    const sampleRate = 44100;
    const duration = 0.5;
    const dutyRatio = 50;
    
    const samples = generatePulse(frequency, sampleRate, duration, dutyRatio);
    const expectedSamples = Math.floor(sampleRate * duration);
    
    expect(samples.length).toBe(expectedSamples);
  });
  
  it('should generate samples with values -1 or 1', () => {
    const frequency = 220;
    const sampleRate = 44100;
    const duration = 0.1;
    const dutyRatio = 50;
    
    const samples = generatePulse(frequency, sampleRate, duration, dutyRatio);
    
    // Check all samples are either -1 or 1
    for (const sample of samples) {
      expect(sample === -1 || sample === 1).toBe(true);
    }
  });
  
  it('should generate 50% duty cycle correctly', () => {
    const frequency = 100; // 100Hz for easier calculation
    const sampleRate = 44100;
    const duration = 0.01; // 10ms = 1 cycle at 100Hz
    const dutyRatio = 50;
    
    const samples = generatePulse(frequency, sampleRate, duration, dutyRatio);
    const samplesPerCycle = sampleRate / frequency;
    
    // Count high and low samples in first cycle
    let highCount = 0;
    let lowCount = 0;
    const cycleSamples = Math.floor(samplesPerCycle);
    
    for (let i = 0; i < cycleSamples; i++) {
      if (samples[i] === 1) highCount++;
      if (samples[i] === -1) lowCount++;
    }
    
    // With 50% duty, high and low counts should be roughly equal
    const ratio = highCount / cycleSamples;
    expect(ratio).toBeCloseTo(0.5, 1);
  });
  
  it('should handle 0% duty ratio', () => {
    const frequency = 220;
    const sampleRate = 44100;
    const duration = 0.1;
    const dutyRatio = 0;
    
    const samples = generatePulse(frequency, sampleRate, duration, dutyRatio);
    
    // All samples should be -1 with 0% duty
    for (const sample of samples) {
      expect(sample).toBe(-1);
    }
  });
  
  it('should handle 100% duty ratio', () => {
    const frequency = 220;
    const sampleRate = 44100;
    const duration = 0.1;
    const dutyRatio = 100;
    
    const samples = generatePulse(frequency, sampleRate, duration, dutyRatio);
    
    // All samples should be 1 with 100% duty
    for (const sample of samples) {
      expect(sample).toBe(1);
    }
  });
  
  it('should clamp duty ratio values outside 0-100 range', () => {
    const frequency = 220;
    const sampleRate = 44100;
    const duration = 0.1;
    
    // Test with duty ratio > 100
    const samplesOver = generatePulse(frequency, sampleRate, duration, 150);
    for (const sample of samplesOver) {
      expect(sample).toBe(1);
    }
    
    // Test with duty ratio < 0
    const samplesUnder = generatePulse(frequency, sampleRate, duration, -50);
    for (const sample of samplesUnder) {
      expect(sample).toBe(-1);
    }
  });
  
  it('should handle zero duration', () => {
    const frequency = 220;
    const sampleRate = 44100;
    const duration = 0;
    const dutyRatio = 50;
    
    const samples = generatePulse(frequency, sampleRate, duration, dutyRatio);
    
    expect(samples.length).toBe(0);
  });
});
