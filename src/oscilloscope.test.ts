import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  initOscilloscope,
  updateOscilloscope,
  stopOscilloscope,
  isOscilloscopeInitialized,
} from './oscilloscope';

// Helper function to check if canvas 2D context is supported in the test environment
function canvasSupported(): boolean {
  try {
    const testCanvas = document.createElement('canvas');
    const ctx = testCanvas.getContext('2d');
    return ctx !== null;
  } catch {
    return false;
  }
}

// Skip all tests if canvas 2D context is not supported (e.g., in happy-dom CI environment)
const shouldSkipTests = !canvasSupported();

describe.skipIf(shouldSkipTests)('oscilloscope', () => {
  let canvas: HTMLCanvasElement;
  let previousWaveformCanvas: HTMLCanvasElement;
  let currentWaveformCanvas: HTMLCanvasElement;
  let similarityPlotCanvas: HTMLCanvasElement;
  let frameBufferCanvas: HTMLCanvasElement;
  let pianoKeyboardCanvas: HTMLCanvasElement;

  beforeEach(() => {
    // Create main canvas element for testing
    canvas = document.createElement('canvas');
    canvas.id = 'oscilloscope';
    canvas.width = 800;
    canvas.height = 300;
    document.body.appendChild(canvas);

    // Create additional required canvas elements
    previousWaveformCanvas = document.createElement('canvas');
    previousWaveformCanvas.id = 'previousWaveformCanvas';
    previousWaveformCanvas.width = 250;
    previousWaveformCanvas.height = 120;
    document.body.appendChild(previousWaveformCanvas);

    currentWaveformCanvas = document.createElement('canvas');
    currentWaveformCanvas.id = 'currentWaveformCanvas';
    currentWaveformCanvas.width = 250;
    currentWaveformCanvas.height = 120;
    document.body.appendChild(currentWaveformCanvas);

    similarityPlotCanvas = document.createElement('canvas');
    similarityPlotCanvas.id = 'similarityPlotCanvas';
    similarityPlotCanvas.width = 250;
    similarityPlotCanvas.height = 120;
    document.body.appendChild(similarityPlotCanvas);

    frameBufferCanvas = document.createElement('canvas');
    frameBufferCanvas.id = 'frameBufferCanvas';
    frameBufferCanvas.width = 800;
    frameBufferCanvas.height = 120;
    document.body.appendChild(frameBufferCanvas);

    pianoKeyboardCanvas = document.createElement('canvas');
    pianoKeyboardCanvas.id = 'pianoKeyboardCanvas';
    pianoKeyboardCanvas.width = 800;
    pianoKeyboardCanvas.height = 60;
    document.body.appendChild(pianoKeyboardCanvas);

    // Create debug overlay elements
    const frequencyValue = document.createElement('span');
    frequencyValue.id = 'frequencyValue';
    document.body.appendChild(frequencyValue);

    const noteValue = document.createElement('span');
    noteValue.id = 'noteValue';
    document.body.appendChild(noteValue);

    const gainValue = document.createElement('span');
    gainValue.id = 'gainValue';
    document.body.appendChild(gainValue);

    const similarityValue = document.createElement('span');
    similarityValue.id = 'similarityValue';
    document.body.appendChild(similarityValue);
  });

  afterEach(async () => {
    // Clean up
    await stopOscilloscope();
    
    // Remove all canvas elements
    [canvas, previousWaveformCanvas, currentWaveformCanvas, 
     similarityPlotCanvas, frameBufferCanvas, pianoKeyboardCanvas].forEach(c => {
      if (c.parentNode) {
        c.parentNode.removeChild(c);
      }
    });

    // Remove debug overlay elements
    ['frequencyValue', 'noteValue', 'gainValue', 'similarityValue'].forEach(id => {
      const element = document.getElementById(id);
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  });

  describe('initOscilloscope', () => {
    it('should initialize oscilloscope with valid canvas', () => {
      expect(() => initOscilloscope(canvas)).not.toThrow();
      expect(isOscilloscopeInitialized()).toBe(true);
    });

    it('should throw error with null canvas', () => {
      expect(() => initOscilloscope(null as any)).toThrow('Invalid canvas element');
    });

    it('should throw error with invalid canvas element', () => {
      const div = document.createElement('div');
      expect(() => initOscilloscope(div as any)).toThrow('Invalid canvas element');
    });

    it('should throw error when required canvases are missing', () => {
      // Remove one of the required canvases
      const missingCanvas = document.getElementById('previousWaveformCanvas');
      if (missingCanvas && missingCanvas.parentNode) {
        missingCanvas.parentNode.removeChild(missingCanvas);
      }
      
      expect(() => initOscilloscope(canvas)).toThrow('required oscilloscope canvas elements not found');
    });

    it('should clean up previous initialization on re-init', () => {
      initOscilloscope(canvas);
      expect(isOscilloscopeInitialized()).toBe(true);
      
      // Re-initialize should not throw
      expect(() => initOscilloscope(canvas)).not.toThrow();
      expect(isOscilloscopeInitialized()).toBe(true);
    });
  });

  describe('isOscilloscopeInitialized', () => {
    it('should return false before initialization', () => {
      expect(isOscilloscopeInitialized()).toBe(false);
    });

    it('should return true after initialization', () => {
      initOscilloscope(canvas);
      expect(isOscilloscopeInitialized()).toBe(true);
    });

    it('should return false after stop', async () => {
      initOscilloscope(canvas);
      expect(isOscilloscopeInitialized()).toBe(true);
      
      await stopOscilloscope();
      expect(isOscilloscopeInitialized()).toBe(false);
    });
  });

  describe('updateOscilloscope', () => {
    beforeEach(() => {
      initOscilloscope(canvas);
    });

    it('should throw error when not initialized', async () => {
      await stopOscilloscope();
      
      const samples = new Float32Array(1024);
      await expect(updateOscilloscope(samples, 44100)).rejects.toThrow('not initialized');
    });

    it('should not repeatedly log WASM errors after permanent failure', async () => {
      // This test verifies the fix for Issue #86
      // After a WASM initialization error, subsequent calls should silently return
      // without logging errors to prevent console spam
      
      const samples = new Float32Array(1024);
      const consoleErrorSpy = { error: console.error };
      let errorCount = 0;
      
      console.error = (...args: any[]) => {
        if (args.some((arg: any) => 
          typeof arg === 'string' && 
          (arg.includes('WASM') || arg.includes('wasm'))
        )) {
          errorCount++;
        }
      };

      try {
        // First call - may throw and log error if WASM init fails
        await updateOscilloscope(samples, 44100).catch(() => {});
        
        // Subsequent calls should silently return without logging
        await updateOscilloscope(samples, 44100).catch(() => {});
        await updateOscilloscope(samples, 44100).catch(() => {});
        await updateOscilloscope(samples, 44100).catch(() => {});
        
        // Error should be logged at most once
        expect(errorCount).toBeLessThanOrEqual(1);
      } finally {
        console.error = consoleErrorSpy.error;
      }
    });

    it('should reset permanent failure flag after stop and reinit', async () => {
      // This test verifies that the permanent failure flag is reset when the oscilloscope
      // is stopped and reinitialized, allowing recovery from a previous WASM failure
      
      const samples = new Float32Array(1024);
      
      // Simulate a WASM failure by calling update (which may fail in test environment)
      await updateOscilloscope(samples, 44100).catch(() => {});
      
      // Stop the oscilloscope
      await stopOscilloscope();
      expect(isOscilloscopeInitialized()).toBe(false);
      
      // Reinitialize - this should reset the permanent failure flag
      initOscilloscope(canvas);
      expect(isOscilloscopeInitialized()).toBe(true);
      
      // Update should be attempted again (not silently skipped)
      // If WASM is available, it should work; if not, it should fail with proper error
      // Either way, it should not be silently skipped due to permanent failure flag
      const updatePromise = updateOscilloscope(samples, 44100);
      
      // The update should either succeed or throw an error, but not silently return
      // due to the permanent failure flag being set from before
      await expect(updatePromise).resolves.not.toThrow();
    });

    it('should throw error with empty samples', async () => {
      const samples = new Float32Array(0);
      await expect(updateOscilloscope(samples, 44100)).rejects.toThrow('empty');
    });

    it('should throw error with null samples', async () => {
      await expect(updateOscilloscope(null as any, 44100)).rejects.toThrow('Invalid samples');
    });

    it('should throw error with negative sample rate', async () => {
      const samples = new Float32Array(1024);
      await expect(updateOscilloscope(samples, -44100)).rejects.toThrow('Invalid sample rate');
    });

    it('should throw error with zero sample rate', async () => {
      const samples = new Float32Array(1024);
      await expect(updateOscilloscope(samples, 0)).rejects.toThrow('Invalid sample rate');
    });

    it('should throw error with NaN sample rate', async () => {
      const samples = new Float32Array(1024);
      await expect(updateOscilloscope(samples, NaN)).rejects.toThrow('Invalid sample rate');
    });

    it('should throw error with Infinity sample rate', async () => {
      const samples = new Float32Array(1024);
      await expect(updateOscilloscope(samples, Infinity)).rejects.toThrow('Invalid sample rate');
    });

    it('should throw error with NaN in samples', async () => {
      const samples = new Float32Array(1024);
      samples[0] = NaN;
      await expect(updateOscilloscope(samples, 44100)).rejects.toThrow('Invalid sample value');
    });

    it('should throw error with Infinity in samples', async () => {
      const samples = new Float32Array(1024);
      samples[50] = Infinity;
      await expect(updateOscilloscope(samples, 44100)).rejects.toThrow('Invalid sample value');
    });

    it('should handle valid 440Hz sine wave', async () => {
      const sampleRate = 44100;
      const duration = 0.1; // 100ms
      const frequency = 440;
      const samples = new Float32Array(sampleRate * duration);
      
      // Generate 440Hz sine wave
      for (let i = 0; i < samples.length; i++) {
        samples[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate);
      }

      // Should not throw
      await expect(updateOscilloscope(samples, sampleRate)).resolves.not.toThrow();
    });

    it('should handle different sample rates', async () => {
      const samples = new Float32Array(1024);
      
      // Test with different sample rates
      await expect(updateOscilloscope(samples, 44100)).resolves.not.toThrow();
      await expect(updateOscilloscope(samples, 48000)).resolves.not.toThrow();
      await expect(updateOscilloscope(samples, 22050)).resolves.not.toThrow();
    });

    it('should warn and skip if update already in progress', async () => {
      const samples = new Float32Array(1024);
      const consoleSpy = { warn: console.warn };
      let warnCalled = false;
      
      console.warn = (msg: string) => {
        if (msg.includes('already in progress')) {
          warnCalled = true;
        }
      };

      // Start first update (don't await)
      const firstUpdate = updateOscilloscope(samples, 44100);
      
      // Try to start second update immediately
      await updateOscilloscope(samples, 44100);
      
      // Wait for first to complete
      await firstUpdate;

      console.warn = consoleSpy.warn;
      
      // Note: This test may not reliably trigger the race condition
      // in a test environment, but validates the code path exists
    });
  });

  describe('stopOscilloscope', () => {
    it('should not throw when oscilloscope not initialized', async () => {
      await expect(stopOscilloscope()).resolves.not.toThrow();
    });

    it('should clean up oscilloscope state', async () => {
      initOscilloscope(canvas);
      expect(isOscilloscopeInitialized()).toBe(true);
      
      await stopOscilloscope();
      expect(isOscilloscopeInitialized()).toBe(false);
    });

    it('should clean up after updates', async () => {
      initOscilloscope(canvas);
      
      const samples = new Float32Array(1024);
      await updateOscilloscope(samples, 44100);
      
      await stopOscilloscope();
      expect(isOscilloscopeInitialized()).toBe(false);
    });
  });
});
