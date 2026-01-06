/**
 * TypeScript wrapper for WASM audio processing module
 */

// Import types dynamically
type WasmModule = typeof import('../wasm-audio/pkg/wasm_audio.js');

let wasmModule: WasmModule | null = null;
let wasmInitPromise: Promise<void> | null = null;

/**
 * Initialize the WASM module
 */
export async function initWasm(): Promise<void> {
  if (wasmModule) {
    return; // Already initialized
  }

  // If already initializing, wait for that to complete
  if (wasmInitPromise) {
    return wasmInitPromise;
  }

  wasmInitPromise = (async () => {
    try {
      // Dynamically import the WASM module
      const wasm = await import('../wasm-audio/pkg/wasm_audio.js');
      
      // Initialize the WASM module (this loads the .wasm file)
      if (wasm.default) {
        await wasm.default();
      }
      
      wasmModule = wasm;
      console.log('WASM module initialized successfully');
    } catch (error) {
      console.error('Failed to load WASM module:', error);
      wasmInitPromise = null;
      throw error;
    }
  })();

  return wasmInitPromise;
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
  filterType: 'lpf' | 'hpf' | 'bpf' | 'notch' | 'apf' | 'lowshelf' | 'highshelf',
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
    filterType,
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
