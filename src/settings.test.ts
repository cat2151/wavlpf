import { describe, it, expect, beforeEach } from 'vitest';
import {
  Settings,
  defaultSettings,
  validateSettings,
  loadSettings,
  saveSettings,
} from './settings';

describe('settings', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('validateSettings', () => {
    it('should return default settings for empty object', () => {
      const result = validateSettings({});
      expect(result).toEqual(defaultSettings);
    });

    it('should validate bpm range (30-300)', () => {
      expect(validateSettings({ bpm: 120 }).bpm).toBe(120);
      expect(validateSettings({ bpm: 30 }).bpm).toBe(30);
      expect(validateSettings({ bpm: 300 }).bpm).toBe(300);
      expect(validateSettings({ bpm: 29 }).bpm).toBe(defaultSettings.bpm);
      expect(validateSettings({ bpm: 301 }).bpm).toBe(defaultSettings.bpm);
    });

    it('should validate beat range (1-32)', () => {
      expect(validateSettings({ beat: 8 }).beat).toBe(8);
      expect(validateSettings({ beat: 1 }).beat).toBe(1);
      expect(validateSettings({ beat: 32 }).beat).toBe(32);
      expect(validateSettings({ beat: 0 }).beat).toBe(defaultSettings.beat);
      expect(validateSettings({ beat: 33 }).beat).toBe(defaultSettings.beat);
    });

    it('should validate qMax range (0.5-50)', () => {
      expect(validateSettings({ qMax: 16 }).qMax).toBe(16);
      expect(validateSettings({ qMax: 0.5 }).qMax).toBe(0.5);
      expect(validateSettings({ qMax: 50 }).qMax).toBe(50);
      expect(validateSettings({ qMax: 0.4 }).qMax).toBe(defaultSettings.qMax);
      expect(validateSettings({ qMax: 51 }).qMax).toBe(defaultSettings.qMax);
    });

    it('should validate cutoffMax range (20-20000)', () => {
      expect(validateSettings({ cutoffMax: 4000 }).cutoffMax).toBe(4000);
      expect(validateSettings({ cutoffMax: 20 }).cutoffMax).toBe(20);
      expect(validateSettings({ cutoffMax: 20000 }).cutoffMax).toBe(20000);
      expect(validateSettings({ cutoffMax: 19 }).cutoffMax).toBe(defaultSettings.cutoffMax);
      expect(validateSettings({ cutoffMax: 20001 }).cutoffMax).toBe(defaultSettings.cutoffMax);
    });

    it('should validate decayUnit', () => {
      expect(validateSettings({ decayUnit: 'Hz' }).decayUnit).toBe('Hz');
      expect(validateSettings({ decayUnit: 'Cent' }).decayUnit).toBe('Cent');
      expect(validateSettings({ decayUnit: 'invalid' as any }).decayUnit).toBe(defaultSettings.decayUnit);
    });

    it('should validate decayRate range (0.01-1000)', () => {
      expect(validateSettings({ decayRate: 1 }).decayRate).toBe(1);
      expect(validateSettings({ decayRate: 0.01 }).decayRate).toBe(0.01);
      expect(validateSettings({ decayRate: 100 }).decayRate).toBe(100);
      expect(validateSettings({ decayRate: 1000 }).decayRate).toBe(1000);
      expect(validateSettings({ decayRate: 0 }).decayRate).toBe(defaultSettings.decayRate);
      expect(validateSettings({ decayRate: -1 }).decayRate).toBe(defaultSettings.decayRate);
      expect(validateSettings({ decayRate: 1001 }).decayRate).toBe(defaultSettings.decayRate);
    });

    it('should handle partial settings', () => {
      const result = validateSettings({ bpm: 140, beat: 16 });
      expect(result.bpm).toBe(140);
      expect(result.beat).toBe(16);
      expect(result.qMax).toBe(defaultSettings.qMax);
      expect(result.cutoffMax).toBe(defaultSettings.cutoffMax);
    });
  });

  describe('loadSettings and saveSettings', () => {
    it('should return default settings when localStorage is empty', () => {
      const result = loadSettings();
      expect(result).toEqual(defaultSettings);
    });

    it('should save and load settings from localStorage', () => {
      const testSettings: Settings = {
        bpm: 140,
        beat: 16,
        qMax: 20,
        cutoffMax: 5000,
        decayUnit: 'Cent',
        decayRate: 2,
        waveformType: 'pulse',
        dutyRatio: 75,
        processorType: 'typescript',
      };

      saveSettings(testSettings);
      const loaded = loadSettings();
      expect(loaded).toEqual(testSettings);
    });

    it('should validate settings when loading from localStorage', () => {
      // Save invalid settings directly to localStorage
      localStorage.setItem('wavlpf-settings', JSON.stringify({
        bpm: 500, // invalid
        beat: 8,
        qMax: 16,
        cutoffMax: 4000,
        decayUnit: 'Hz',
        decayRate: 1,
      }));

      const loaded = loadSettings();
      expect(loaded.bpm).toBe(defaultSettings.bpm); // should fall back to default
      expect(loaded.beat).toBe(8); // valid value should be preserved
    });

    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('wavlpf-settings', 'invalid json');
      const loaded = loadSettings();
      expect(loaded).toEqual(defaultSettings);
    });
  });
});
