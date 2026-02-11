import { describe, it, expect, afterEach } from 'vitest';
import {
  drawFullWaveform,
  initFullWaveformDisplay,
  isFullWaveformDisplayInitialized,
  disposeFullWaveformDisplay,
} from './full-waveform-display';

describe('full-waveform-display', () => {
  afterEach(() => {
    disposeFullWaveformDisplay();
  });

  describe('isFullWaveformDisplayInitialized', () => {
    it('should return false before initialization', () => {
      expect(isFullWaveformDisplayInitialized()).toBe(false);
    });
  });

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

    it('draws a visible stroke for flat clipped regions', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2;
      canvas.height = 120;

      const segmentHeights: number[] = [];
      let lastY = 0;

      const fakeContext = {
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0,
        font: '',
        fillRect: () => {},
        beginPath: () => {},
        moveTo: (_x: number, y: number) => {
          lastY = y;
        },
        lineTo: (_x: number, y: number) => {
          segmentHeights.push(Math.abs(y - lastY));
        },
        stroke: () => {},
        fillText: () => {},
      } as unknown as CanvasRenderingContext2D;

      (canvas as HTMLCanvasElement).getContext = () => fakeContext;

      initFullWaveformDisplay(canvas as HTMLCanvasElement);
      drawFullWaveform(new Float32Array([1, 1]), 48000);

      expect(segmentHeights.some((height) => height > 0)).toBe(true);
      expect(segmentHeights.every((height) => height <= canvas.height)).toBe(true);
    });
  });
});
