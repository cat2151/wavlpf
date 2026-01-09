import { describe, it, expect, beforeEach } from 'vitest';
import {
  readNumericParameter,
  mapMouseToFilterParams,
  type MousePosition,
} from './ui-params';

describe('ui-params', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('readNumericParameter', () => {
    it('should read valid numeric value', () => {
      const textarea = document.createElement('textarea');
      textarea.id = 'test';
      textarea.value = '42';
      document.body.appendChild(textarea);

      const result = readNumericParameter('test', (value) => value > 0);
      expect(result).toBe(42);
    });

    it('should return null for invalid value', () => {
      const textarea = document.createElement('textarea');
      textarea.id = 'test';
      textarea.value = '-10';
      document.body.appendChild(textarea);

      const result = readNumericParameter('test', (value) => value > 0);
      expect(result).toBeNull();
    });

    it('should return null for non-numeric value', () => {
      const textarea = document.createElement('textarea');
      textarea.id = 'test';
      textarea.value = 'invalid';
      document.body.appendChild(textarea);

      const result = readNumericParameter('test', (value) => value > 0);
      expect(result).toBeNull();
    });

    it('should return null for missing element', () => {
      const result = readNumericParameter('nonexistent', (value) => value > 0);
      expect(result).toBeNull();
    });
  });

  describe('mapMouseToFilterParams', () => {
    it('should map center position to mid-range values', () => {
      const mousePos: MousePosition = { x: 0.5, y: 0.5 };
      const params = mapMouseToFilterParams(mousePos, 4000, 16);

      expect(params.cutoff).toBeCloseTo(2010, 0); // 20 + 0.5 * (4000 - 20)
      expect(params.q).toBeCloseTo(8.25, 2); // 0.5 + 0.5 * (16 - 0.5)
    });

    it('should map bottom-left corner to min cutoff and min Q', () => {
      const mousePos: MousePosition = { x: 0, y: 1 };
      const params = mapMouseToFilterParams(mousePos, 4000, 16);

      expect(params.cutoff).toBeCloseTo(20, 0);
      expect(params.q).toBeCloseTo(0.5, 2);
    });

    it('should map top-right corner to max cutoff and max Q', () => {
      const mousePos: MousePosition = { x: 1, y: 0 };
      const params = mapMouseToFilterParams(mousePos, 4000, 16);

      expect(params.cutoff).toBeCloseTo(4000, 0);
      expect(params.q).toBeCloseTo(16, 2);
    });
  });
});
