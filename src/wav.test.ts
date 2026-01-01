import { describe, it, expect } from 'vitest';
import { generateWav, createWavBlobUrl } from './wav';

describe('generateWav', () => {
  it('should generate valid WAV file structure', () => {
    const samples = new Float32Array([0, 0.5, -0.5, 1, -1]);
    const sampleRate = 44100;
    
    const wavData = generateWav(samples, sampleRate);
    const view = new DataView(wavData);
    
    // Check RIFF header
    const riffChars = String.fromCharCode(
      view.getUint8(0),
      view.getUint8(1),
      view.getUint8(2),
      view.getUint8(3)
    );
    expect(riffChars).toBe('RIFF');
    
    // Check WAVE format
    const waveChars = String.fromCharCode(
      view.getUint8(8),
      view.getUint8(9),
      view.getUint8(10),
      view.getUint8(11)
    );
    expect(waveChars).toBe('WAVE');
    
    // Check fmt chunk
    const fmtChars = String.fromCharCode(
      view.getUint8(12),
      view.getUint8(13),
      view.getUint8(14),
      view.getUint8(15)
    );
    expect(fmtChars).toBe('fmt ');
    
    // Check data chunk
    const dataChars = String.fromCharCode(
      view.getUint8(36),
      view.getUint8(37),
      view.getUint8(38),
      view.getUint8(39)
    );
    expect(dataChars).toBe('data');
  });
  
  it('should set correct audio format parameters', () => {
    const samples = new Float32Array([0, 0.5, -0.5]);
    const sampleRate = 44100;
    
    const wavData = generateWav(samples, sampleRate);
    const view = new DataView(wavData);
    
    // Check sample rate (offset 24)
    expect(view.getUint32(24, true)).toBe(sampleRate);
    
    // Check audio format (offset 20, should be 1 for PCM)
    expect(view.getUint16(20, true)).toBe(1);
    
    // Check number of channels (offset 22, should be 1 for mono)
    expect(view.getUint16(22, true)).toBe(1);
    
    // Check bits per sample (offset 34, should be 16)
    expect(view.getUint16(34, true)).toBe(16);
  });
  
  it('should convert float samples to 16-bit PCM correctly', () => {
    const samples = new Float32Array([0, 1, -1, 0.5, -0.5]);
    const sampleRate = 44100;
    
    const wavData = generateWav(samples, sampleRate);
    const view = new DataView(wavData);
    
    // Read PCM samples starting at offset 44
    const pcmSample0 = view.getInt16(44, true);
    const pcmSample1 = view.getInt16(46, true);
    const pcmSample2 = view.getInt16(48, true);
    const pcmSample3 = view.getInt16(50, true);
    const pcmSample4 = view.getInt16(52, true);
    
    expect(pcmSample0).toBe(0);
    expect(pcmSample1).toBe(0x7FFF); // Max positive
    expect(pcmSample2).toBe(-0x8000); // Max negative
    // Allow 1 unit of tolerance for rounding in PCM conversion
    expect(Math.abs(pcmSample3 - 0x7FFF / 2)).toBeLessThanOrEqual(1);
    expect(Math.abs(pcmSample4 - (-0x8000 / 2))).toBeLessThanOrEqual(1);
  });
  
  it('should throw error for empty sample array', () => {
    const samples = new Float32Array([]);
    const sampleRate = 44100;
    
    expect(() => generateWav(samples, sampleRate)).toThrow(
      'Cannot generate WAV file from empty sample array'
    );
  });
  
  it('should throw error for excessively large sample array', () => {
    const maxSamples = 44100 * 60 * 10; // 10 minutes
    const samples = new Float32Array(maxSamples + 1);
    const sampleRate = 44100;
    
    expect(() => generateWav(samples, sampleRate)).toThrow(
      /Sample array too large/
    );
  });
  
  it('should clamp samples outside [-1, 1] range', () => {
    const samples = new Float32Array([2, -2, 1.5, -1.5]);
    const sampleRate = 44100;
    
    const wavData = generateWav(samples, sampleRate);
    const view = new DataView(wavData);
    
    // All samples should be clamped to valid 16-bit PCM range
    const pcmSample0 = view.getInt16(44, true);
    const pcmSample1 = view.getInt16(46, true);
    const pcmSample2 = view.getInt16(48, true);
    const pcmSample3 = view.getInt16(50, true);
    
    expect(pcmSample0).toBe(0x7FFF); // Clamped to max
    expect(pcmSample1).toBe(-0x8000); // Clamped to min
    expect(pcmSample2).toBe(0x7FFF); // Clamped to max
    expect(pcmSample3).toBe(-0x8000); // Clamped to min
  });
  
  it('should generate correct file size', () => {
    const samples = new Float32Array(1000);
    const sampleRate = 44100;
    
    const wavData = generateWav(samples, sampleRate);
    
    // WAV file size = 44 bytes (header) + samples.length * 2 (16-bit samples)
    const expectedSize = 44 + samples.length * 2;
    expect(wavData.byteLength).toBe(expectedSize);
  });
});

describe('createWavBlobUrl', () => {
  it('should create a blob URL from WAV data', () => {
    const samples = new Float32Array([0, 0.5, -0.5]);
    const sampleRate = 44100;
    const wavData = generateWav(samples, sampleRate);
    
    const url = createWavBlobUrl(wavData);
    
    expect(url).toBeDefined();
    expect(typeof url).toBe('string');
    expect(url.startsWith('blob:')).toBe(true);
    
    // Clean up
    URL.revokeObjectURL(url);
  });
  
  it('should create different URLs for multiple calls', () => {
    const samples = new Float32Array([0, 0.5, -0.5]);
    const sampleRate = 44100;
    const wavData = generateWav(samples, sampleRate);
    
    const url1 = createWavBlobUrl(wavData);
    const url2 = createWavBlobUrl(wavData);
    
    expect(url1).not.toBe(url2);
    
    // Clean up
    URL.revokeObjectURL(url1);
    URL.revokeObjectURL(url2);
  });
});
