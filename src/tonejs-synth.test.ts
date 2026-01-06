/**
 * Unit tests for tonejs-synth module
 * 
 * These tests verify the core functionality of Tone.js synthesis without
 * requiring actual audio playback.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type * as ToneTypes from 'tone';

// Mock Tone.js module
const mockTone = {
  context: {
    state: 'suspended' as const,
  },
  start: vi.fn().mockResolvedValue(undefined),
  Filter: vi.fn().mockImplementation((params: any) => ({
    frequency: { value: params.frequency, rampTo: vi.fn() },
    Q: { value: params.Q, rampTo: vi.fn() },
    type: params.type,
    dispose: vi.fn(),
    toDestination: vi.fn(),
  })),
  MonoSynth: vi.fn().mockImplementation(() => ({
    triggerAttack: vi.fn(),
    triggerRelease: vi.fn(),
    dispose: vi.fn(),
    connect: vi.fn(),
  })),
} as unknown as typeof ToneTypes;

// Import functions to test
import {
  setToneInstance,
  initToneJs,
  setupToneJsSynth,
  isToneJsInitialized,
  isSynthSetup,
  disposeToneJs,
  type ToneJsSynthParams,
} from './tonejs-synth';

describe('tonejs-synth', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Clear module state by calling dispose
    disposeToneJs();
  });

  describe('setToneInstance', () => {
    it('should set the Tone.js instance', () => {
      setToneInstance(mockTone);
      expect(isToneJsInitialized()).toBe(true);
    });
  });

  describe('initToneJs', () => {
    it('should throw error if Tone instance not set', async () => {
      await expect(initToneJs()).rejects.toThrow('Tone.js instance not set');
    });

    it('should start audio context if not running', async () => {
      setToneInstance(mockTone);
      mockTone.context.state = 'suspended';
      
      await initToneJs();
      
      expect(mockTone.start).toHaveBeenCalled();
    });

    it('should not start audio context if already running', async () => {
      setToneInstance(mockTone);
      mockTone.context.state = 'running';
      
      await initToneJs();
      
      expect(mockTone.start).not.toHaveBeenCalled();
    });
  });

  describe('setupToneJsSynth', () => {
    const testParams: ToneJsSynthParams = {
      cutoff: 1000,
      q: 5,
      waveformType: 'sawtooth',
      dutyRatio: 50,
      filterType: 'lpf',
    };

    it('should throw error if Tone.js not initialized', () => {
      expect(() => setupToneJsSynth(testParams)).toThrow('Tone.js not initialized');
    });

    it('should create synth and filter on first call', () => {
      setToneInstance(mockTone);
      
      setupToneJsSynth(testParams);
      
      expect(mockTone.Filter).toHaveBeenCalledWith({
        frequency: 1000,
        type: 'lowpass',
        Q: 5,
      });
      expect(mockTone.MonoSynth).toHaveBeenCalled();
      expect(isSynthSetup()).toBe(true);
    });

    it('should map filter types correctly', () => {
      setToneInstance(mockTone);
      
      const filterTypeMappings: Array<[ToneJsSynthParams['filterType'], string]> = [
        ['lpf', 'lowpass'],
        ['hpf', 'highpass'],
        ['bpf', 'bandpass'],
        ['notch', 'notch'],
        ['apf', 'allpass'],
        ['lowshelf', 'lowshelf'],
        ['highshelf', 'highshelf'],
      ];

      filterTypeMappings.forEach(([input, expected]) => {
        vi.clearAllMocks();
        setupToneJsSynth({ ...testParams, filterType: input });
        expect(mockTone.Filter).toHaveBeenCalledWith(
          expect.objectContaining({ type: expected })
        );
      });
    });

    it('should reuse synth and filter if waveform and filter type unchanged', () => {
      setToneInstance(mockTone);
      
      // First call - creates instances
      setupToneJsSynth(testParams);
      const firstFilterCallCount = mockTone.Filter.mock.calls.length;
      const firstSynthCallCount = mockTone.MonoSynth.mock.calls.length;
      
      // Second call with same waveform and filter type - should reuse
      setupToneJsSynth({ ...testParams, cutoff: 2000 });
      
      // Should not create new instances
      expect(mockTone.Filter.mock.calls.length).toBe(firstFilterCallCount);
      expect(mockTone.MonoSynth.mock.calls.length).toBe(firstSynthCallCount);
    });

    it('should recreate synth if waveform type changes', () => {
      setToneInstance(mockTone);
      
      // First call with sawtooth
      setupToneJsSynth({ ...testParams, waveformType: 'sawtooth' });
      const firstSynthCallCount = mockTone.MonoSynth.mock.calls.length;
      
      // Second call with pulse - should recreate
      setupToneJsSynth({ ...testParams, waveformType: 'pulse' });
      
      expect(mockTone.MonoSynth.mock.calls.length).toBe(firstSynthCallCount + 1);
    });

    it('should recreate filter if filter type changes', () => {
      setToneInstance(mockTone);
      
      // First call with lpf
      setupToneJsSynth({ ...testParams, filterType: 'lpf' });
      const firstFilterCallCount = mockTone.Filter.mock.calls.length;
      
      // Second call with hpf - should recreate
      setupToneJsSynth({ ...testParams, filterType: 'hpf' });
      
      expect(mockTone.Filter.mock.calls.length).toBe(firstFilterCallCount + 1);
    });
  });

  describe('isToneJsInitialized', () => {
    it('should return false when Tone.js not set', () => {
      expect(isToneJsInitialized()).toBe(false);
    });

    it('should return true when Tone.js is set', () => {
      setToneInstance(mockTone);
      expect(isToneJsInitialized()).toBe(true);
    });
  });

  describe('isSynthSetup', () => {
    it('should return false before setup', () => {
      setToneInstance(mockTone);
      expect(isSynthSetup()).toBe(false);
    });

    it('should return true after setup', () => {
      setToneInstance(mockTone);
      setupToneJsSynth({
        cutoff: 1000,
        q: 5,
        waveformType: 'sawtooth',
        dutyRatio: 50,
        filterType: 'lpf',
      });
      expect(isSynthSetup()).toBe(true);
    });

    it('should return false after dispose', () => {
      setToneInstance(mockTone);
      setupToneJsSynth({
        cutoff: 1000,
        q: 5,
        waveformType: 'sawtooth',
        dutyRatio: 50,
        filterType: 'lpf',
      });
      disposeToneJs();
      expect(isSynthSetup()).toBe(false);
    });
  });

  describe('disposeToneJs', () => {
    it('should clean up all resources', () => {
      setToneInstance(mockTone);
      const params: ToneJsSynthParams = {
        cutoff: 1000,
        q: 5,
        waveformType: 'sawtooth',
        dutyRatio: 50,
        filterType: 'lpf',
      };
      
      setupToneJsSynth(params);
      const filter = mockTone.Filter.mock.results[0].value;
      const synth = mockTone.MonoSynth.mock.results[0].value;
      
      disposeToneJs();
      
      expect(synth.dispose).toHaveBeenCalled();
      expect(filter.dispose).toHaveBeenCalled();
      expect(isSynthSetup()).toBe(false);
    });
  });
});
