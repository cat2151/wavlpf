/**
 * TypeScript wrapper for WASM audio processing module
 */

// Type definitions for the WASM module
interface WasmAudioModule {
  render_audio(
    waveformType: string,
    frequency: number,
    sampleRate: number,
    duration: number,
    dutyRatio: number,
    initialCutoff: number,
    q: number,
    decayUnit: string,
    decayRate: number,
  ): Float64Array;
}

let wasmModule: WasmAudioModule | null = null;

/**
 * Initialize the WASM module
 */
export async function initWasm(): Promise<void> {
  if (wasmModule) {
    return; // Already initialized
  }

  try {
    // Dynamically import the WASM module
    const wasm = await import('../wasm-audio/pkg/wasm_audio.js');
    wasmModule = wasm as unknown as WasmAudioModule;
  } catch (error) {
    console.error('Failed to load WASM module:', error);
    throw error;
  }
}

/**
 * Check if WASM is initialized
 */
export function isWasmInitialized(): boolean {
  return wasmModule !== null;
}

/**
 * Render audio using WASM implementation
 * Returns the filtered audio samples and generation time in ms
 */
export function renderAudioWasm(
  waveformType: 'sawtooth' | 'pulse',
  frequency: number,
  sampleRate: number,
  duration: number,
  dutyRatio: number,
  initialCutoff: number,
  q: number,
  decayUnit: 'Hz' | 'Cent',
  decayRate: number,
): { samples: Float32Array; generationTimeMs: number } {
  if (!wasmModule) {
    throw new Error('WASM module not initialized');
  }

  const startTime = performance.now();
  
  const result = wasmModule.render_audio(
    waveformType,
    frequency,
    sampleRate,
    duration,
    dutyRatio,
    initialCutoff,
    q,
    decayUnit,
    decayRate,
  );
  
  const endTime = performance.now();
  const generationTimeMs = endTime - startTime;
  
  // Convert Float64Array to Float32Array for compatibility
  const samples = new Float32Array(result);
  
  return { samples, generationTimeMs };
}
