/**
 * パフォーマンス統計トラッキングのテスト
 * 
 * パフォーマンストラッキング関数が
 * 生成時間サンプルから正しく統計を計算することを検証します。
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  createPerformanceStats,
  addPerformanceSample,
  calculatePerformanceStats,
  resetPerformanceStats,
  type PerformanceStats,
} from './performance-stats';

describe('Performance Statistics', () => {
  let stats: PerformanceStats;

  beforeEach(() => {
    stats = createPerformanceStats(10);
  });

  describe('addPerformanceSample', () => {
    it('should add samples to the array', () => {
      addPerformanceSample(stats, 10);
      addPerformanceSample(stats, 20);
      addPerformanceSample(stats, 30);

      expect(stats.samples).toEqual([10, 20, 30]);
    });

    it('should maintain maximum sample count', () => {
      const smallStats = createPerformanceStats(3);
      
      addPerformanceSample(smallStats, 10);
      addPerformanceSample(smallStats, 20);
      addPerformanceSample(smallStats, 30);
      addPerformanceSample(smallStats, 40);
      addPerformanceSample(smallStats, 50);

      expect(smallStats.samples).toEqual([30, 40, 50]);
      expect(smallStats.samples.length).toBe(3);
    });

    it('should remove oldest samples first (FIFO)', () => {
      const smallStats = createPerformanceStats(2);
      
      addPerformanceSample(smallStats, 100);
      addPerformanceSample(smallStats, 200);
      addPerformanceSample(smallStats, 300);

      expect(smallStats.samples).toEqual([200, 300]);
    });
  });

  describe('calculatePerformanceStats', () => {
    it('should return null for empty samples', () => {
      const result = calculatePerformanceStats(stats);
      expect(result).toBeNull();
    });

    it('should calculate correct statistics for single sample', () => {
      addPerformanceSample(stats, 15.5);
      
      const result = calculatePerformanceStats(stats);
      
      expect(result).not.toBeNull();
      expect(result?.current).toBe(15.5);
      expect(result?.min).toBe(15.5);
      expect(result?.max).toBe(15.5);
      expect(result?.avg).toBe(15.5);
      expect(result?.count).toBe(1);
    });

    it('should calculate correct statistics for multiple samples', () => {
      addPerformanceSample(stats, 10);
      addPerformanceSample(stats, 20);
      addPerformanceSample(stats, 30);
      
      const result = calculatePerformanceStats(stats);
      
      expect(result).not.toBeNull();
      expect(result?.current).toBe(30);
      expect(result?.min).toBe(10);
      expect(result?.max).toBe(30);
      expect(result?.avg).toBe(20);
      expect(result?.count).toBe(3);
    });

    it('should handle decimal values correctly', () => {
      addPerformanceSample(stats, 10.5);
      addPerformanceSample(stats, 20.3);
      addPerformanceSample(stats, 15.7);
      
      const result = calculatePerformanceStats(stats);
      
      expect(result).not.toBeNull();
      expect(result?.current).toBe(15.7);
      expect(result?.min).toBe(10.5);
      expect(result?.max).toBe(20.3);
      expect(result?.avg).toBeCloseTo(15.5, 1);
      expect(result?.count).toBe(3);
    });

    it('should track current value as last added sample', () => {
      addPerformanceSample(stats, 100);
      addPerformanceSample(stats, 50);
      addPerformanceSample(stats, 75);
      
      const result = calculatePerformanceStats(stats);
      
      expect(result?.current).toBe(75);
    });

    it('should calculate stats correctly after reaching max samples', () => {
      const smallStats = createPerformanceStats(3);
      
      addPerformanceSample(smallStats, 10);
      addPerformanceSample(smallStats, 20);
      addPerformanceSample(smallStats, 30);
      addPerformanceSample(smallStats, 40);
      
      const result = calculatePerformanceStats(smallStats);
      
      expect(result).not.toBeNull();
      expect(result?.current).toBe(40);
      expect(result?.min).toBe(20);
      expect(result?.max).toBe(40);
      expect(result?.avg).toBeCloseTo(30, 1);
      expect(result?.count).toBe(3);
    });
  });

  describe('resetPerformanceStats', () => {
    it('should clear all samples', () => {
      addPerformanceSample(stats, 10);
      addPerformanceSample(stats, 20);
      addPerformanceSample(stats, 30);

      resetPerformanceStats(stats);

      expect(stats.samples).toEqual([]);
      expect(calculatePerformanceStats(stats)).toBeNull();
    });

    it('should allow adding new samples after reset', () => {
      addPerformanceSample(stats, 10);
      resetPerformanceStats(stats);
      addPerformanceSample(stats, 50);

      const result = calculatePerformanceStats(stats);
      
      expect(result).not.toBeNull();
      expect(result?.count).toBe(1);
      expect(result?.current).toBe(50);
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle typical browser timing values (multiples of 10ms)', () => {
      // Simulate browser-quantized timing values
      addPerformanceSample(stats, 10);
      addPerformanceSample(stats, 10);
      addPerformanceSample(stats, 20);
      addPerformanceSample(stats, 10);
      addPerformanceSample(stats, 20);
      
      const result = calculatePerformanceStats(stats);
      
      expect(result).not.toBeNull();
      expect(result?.min).toBe(10);
      expect(result?.max).toBe(20);
      expect(result?.avg).toBe(14); // (10+10+20+10+20)/5 = 14
      expect(result?.count).toBe(5);
    });

    it('should show meaningful statistics even with low precision values', () => {
      // All measurements are the same due to browser quantization
      addPerformanceSample(stats, 10);
      addPerformanceSample(stats, 10);
      addPerformanceSample(stats, 10);
      
      const result = calculatePerformanceStats(stats);
      
      expect(result).not.toBeNull();
      expect(result?.min).toBe(10);
      expect(result?.max).toBe(10);
      expect(result?.avg).toBe(10);
      expect(result?.count).toBe(3);
    });

    it('should handle varying performance across multiple runs', () => {
      // Simulate varying performance: fast, slow, fast pattern
      const times = [10, 10, 30, 20, 10, 20, 10, 30, 10, 20];
      times.forEach(time => addPerformanceSample(stats, time));
      
      const result = calculatePerformanceStats(stats);
      
      expect(result).not.toBeNull();
      expect(result?.count).toBe(10);
      expect(result?.min).toBe(10);
      expect(result?.max).toBe(30);
      expect(result?.avg).toBe(17); // 170/10 = 17
    });
  });
});
