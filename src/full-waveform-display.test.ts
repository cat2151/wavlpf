/**
 * Tests for full waveform display module
 */
import { describe, it, expect } from 'vitest';
import {
  drawFullWaveform,
  initFullWaveformDisplay,
  isFullWaveformDisplayInitialized,
} from './full-waveform-display';

describe('full-waveform-display', () => {
  describe('isFullWaveformDisplayInitialized', () => {
    it('should return false before initialization', () => {
      expect(isFullWaveformDisplayInitialized()).toBe(false);
    });
  });

  // Note: Full initialization and rendering tests require DOM canvas elements,
  // which are not available in the test environment.
  // Integration testing should be done in a browser environment.

  describe('drawFullWaveform', () => {
    it('clamps samples to canvas bounds when rendering', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 4;
      canvas.height = 100;

      const recordedY: number[] = [];
      const fakeContext = {
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0,
        font: '',
        fillRect: () => {},
        beginPath: () => {},
        moveTo: (_x: number, y: number) => recordedY.push(y),
        lineTo: (_x: number, y: number) => recordedY.push(y),
        stroke: () => {},
        fillText: () => {},
      } as unknown as CanvasRenderingContext2D;

      (canvas as HTMLCanvasElement).getContext = () => fakeContext;

      initFullWaveformDisplay(canvas as HTMLCanvasElement);
      drawFullWaveform(new Float32Array([1.5, -1.5, 2, -2]), 48000);

      expect(recordedY.length).toBeGreaterThan(0);
      expect(Math.min(...recordedY)).toBeGreaterThanOrEqual(0);
      expect(Math.max(...recordedY)).toBeLessThanOrEqual(canvas.height);
    });
  });
});
