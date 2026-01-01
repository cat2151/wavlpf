import { describe, it, expect, beforeEach } from 'vitest';
import { BiquadLPF } from './filter';

describe('BiquadLPF', () => {
  let filter: BiquadLPF;
  const sampleRate = 44100;
  
  beforeEach(() => {
    filter = new BiquadLPF(sampleRate);
  });
  
  it('should create filter instance', () => {
    expect(filter).toBeDefined();
    expect(filter).toBeInstanceOf(BiquadLPF);
  });
  
  it('should process samples without crashing', () => {
    filter.setCoefficients(1000, 1.0);
    
    const input = 0.5;
    const output = filter.processSample(input);
    
    expect(typeof output).toBe('number');
    expect(isFinite(output)).toBe(true);
  });
  
  it('should attenuate high frequencies', () => {
    const cutoff = 500;
    const q = 1.0;
    filter.setCoefficients(cutoff, q);
    
    // Generate high-frequency oscillation (5kHz, well above cutoff)
    const frequency = 5000;
    const numSamples = 1000;
    let sumInputSquared = 0;
    let sumOutputSquared = 0;
    
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const input = Math.sin(2 * Math.PI * frequency * t);
      const output = filter.processSample(input);
      
      sumInputSquared += input * input;
      sumOutputSquared += output * output;
    }
    
    // Output power should be significantly less than input power
    expect(sumOutputSquared).toBeLessThan(sumInputSquared * 0.1);
  });
  
  it('should pass low frequencies', () => {
    const cutoff = 5000;
    const q = 1.0;
    filter.setCoefficients(cutoff, q);
    
    // Generate low-frequency oscillation (100Hz, well below cutoff)
    const frequency = 100;
    const numSamples = 1000;
    let sumInputSquared = 0;
    let sumOutputSquared = 0;
    
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const input = Math.sin(2 * Math.PI * frequency * t);
      const output = filter.processSample(input);
      
      sumInputSquared += input * input;
      sumOutputSquared += output * output;
    }
    
    // Output power should be close to input power (allowing for some attenuation)
    expect(sumOutputSquared).toBeGreaterThan(sumInputSquared * 0.5);
  });
  
  it('should reset filter state', () => {
    filter.setCoefficients(1000, 1.0);
    
    // Process some samples to build up state
    filter.processSample(1.0);
    filter.processSample(0.5);
    filter.processSample(-0.5);
    
    // Reset
    filter.reset();
    
    // After reset, same input should give same output as fresh filter
    const freshFilter = new BiquadLPF(sampleRate);
    freshFilter.setCoefficients(1000, 1.0);
    
    const input = 0.3;
    const outputAfterReset = filter.processSample(input);
    const outputFresh = freshFilter.processSample(input);
    
    expect(outputAfterReset).toBeCloseTo(outputFresh, 10);
  });
  
  it('should handle different Q values', () => {
    const cutoff = 1000;
    
    filter.setCoefficients(cutoff, 0.5); // Low Q
    const outputLowQ = filter.processSample(1.0);
    
    filter.reset();
    filter.setCoefficients(cutoff, 2.0); // High Q
    const outputHighQ = filter.processSample(1.0);
    
    // Different Q values should produce different outputs
    expect(outputLowQ).not.toBe(outputHighQ);
  });
  
  it('should clamp cutoff frequency to safe range', () => {
    // Test with very high cutoff (beyond Nyquist)
    expect(() => {
      filter.setCoefficients(50000, 1.0); // Well beyond sampleRate/2
      filter.processSample(1.0);
    }).not.toThrow();
    
    // Test with very low cutoff
    expect(() => {
      filter.setCoefficients(0.1, 1.0);
      filter.processSample(1.0);
    }).not.toThrow();
  });
  
  it('should maintain stability with coefficient updates', () => {
    // Rapidly change coefficients
    for (let i = 0; i < 100; i++) {
      const cutoff = 100 + i * 10;
      const q = 0.5 + (i % 15) * 0.1;
      filter.setCoefficients(cutoff, q);
      
      const output = filter.processSample(Math.sin(i * 0.1));
      expect(isFinite(output)).toBe(true);
    }
  });
});
