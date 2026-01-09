import { describe, it, expect } from 'vitest';
import { calculateDuration } from './timing';

describe('timing', () => {
  describe('calculateDuration', () => {
    it('should calculate correct duration for BPM=120, beat=8', () => {
      const duration = calculateDuration(120, 8);
      expect(duration).toBeCloseTo(0.25, 5); // 250ms
    });

    it('should calculate correct duration for BPM=120, beat=4', () => {
      const duration = calculateDuration(120, 4);
      expect(duration).toBeCloseTo(0.5, 5); // 500ms
    });

    it('should calculate correct duration for BPM=60, beat=4', () => {
      const duration = calculateDuration(60, 4);
      expect(duration).toBeCloseTo(1.0, 5); // 1000ms
    });

    it('should calculate correct duration for BPM=240, beat=16', () => {
      const duration = calculateDuration(240, 16);
      expect(duration).toBeCloseTo(0.0625, 5); // 62.5ms
    });

    it('should throw error for invalid bpm (0)', () => {
      expect(() => calculateDuration(0, 4)).toThrow('Invalid parameters');
    });

    it('should throw error for invalid bpm (negative)', () => {
      expect(() => calculateDuration(-120, 4)).toThrow('Invalid parameters');
    });

    it('should throw error for invalid beat (0)', () => {
      expect(() => calculateDuration(120, 0)).toThrow('Invalid parameters');
    });

    it('should throw error for invalid beat (negative)', () => {
      expect(() => calculateDuration(120, -4)).toThrow('Invalid parameters');
    });
  });
});
