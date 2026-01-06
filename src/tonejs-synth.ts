/**
 * Tone.js Direct Synthesis Mode
 * 
 * This module provides direct Tone.js synthesis without WAV generation,
 * for UX prototyping and comparison with WAV-based mode.
 */

import type * as ToneTypes from 'tone';

let Tone: typeof ToneTypes | null = null;
let currentSynth: ToneTypes.MonoSynth | null = null;
let currentFilter: ToneTypes.Filter | null = null;

export interface ToneJsSynthParams {
  cutoff: number;
  q: number;
  waveformType: 'sawtooth' | 'pulse';
  dutyRatio: number;
  filterType: 'lpf' | 'hpf' | 'bpf' | 'notch' | 'apf' | 'lowshelf' | 'highshelf';
}

/**
 * Initialize Tone.js (lazy load on first user interaction)
 */
export async function initToneJs(): Promise<void> {
  if (!Tone) {
    Tone = await import('tone') as typeof ToneTypes;
  }
  
  if (Tone.context.state !== 'running') {
    await Tone.start();
  }
}

/**
 * Map filter type from synth.ts format to Tone.js format
 */
function mapFilterType(filterType: string): 'lowpass' | 'highpass' | 'bandpass' | 'notch' | 'allpass' | 'lowshelf' | 'highshelf' {
  const mapping: Record<string, 'lowpass' | 'highpass' | 'bandpass' | 'notch' | 'allpass' | 'lowshelf' | 'highshelf'> = {
    'lpf': 'lowpass',
    'hpf': 'highpass',
    'bpf': 'bandpass',
    'notch': 'notch',
    'apf': 'allpass',
    'lowshelf': 'lowshelf',
    'highshelf': 'highshelf',
  };
  return mapping[filterType] || 'lowpass';
}

/**
 * Create or update synth with current parameters
 */
export function setupToneJsSynth(params: ToneJsSynthParams): void {
  if (!Tone) {
    throw new Error('Tone.js not initialized');
  }
  
  // Dispose old synth and filter if they exist
  if (currentSynth) {
    currentSynth.triggerRelease();
    currentSynth.dispose();
  }
  if (currentFilter) {
    currentFilter.dispose();
  }
  
  // Create filter
  currentFilter = new Tone.Filter({
    frequency: params.cutoff,
    type: mapFilterType(params.filterType),
    Q: params.q,
  });
  
  // Create synth with sawtooth or pulse wave
  const oscillatorType = params.waveformType === 'sawtooth' ? 'sawtooth' : 'pulse';
  
  currentSynth = new Tone.MonoSynth({
    oscillator: {
      type: oscillatorType,
      // Note: Tone.js doesn't support duty ratio for pulse waves directly
      // This is a limitation compared to the WASM implementation
    },
    envelope: {
      attack: 0.001,
      decay: 0,
      sustain: 1,
      release: 0.001,
    },
  });
  
  // Connect synth -> filter -> destination
  currentSynth.connect(currentFilter);
  currentFilter.toDestination();
}

/**
 * Play a note with the current synth
 */
export function playToneJsNote(frequency: number = 220, duration: number = 0.25): void {
  if (!Tone || !currentSynth) {
    console.warn('Tone.js synth not ready');
    return;
  }
  
  // Stop any currently playing note
  currentSynth.triggerRelease();
  
  // Play new note
  currentSynth.triggerAttack(frequency);
  
  // Schedule release after duration
  setTimeout(() => {
    if (currentSynth) {
      currentSynth.triggerRelease();
    }
  }, duration * 1000);
}

/**
 * Update filter parameters in real-time
 */
export function updateToneJsFilter(cutoff: number, q: number): void {
  if (!Tone || !currentFilter) {
    return;
  }
  
  // Use rampTo for smooth parameter changes
  const rampTime = 0.05; // 50ms ramp for smooth changes
  currentFilter.frequency.rampTo(cutoff, rampTime);
  currentFilter.Q.rampTo(q, rampTime);
}

/**
 * Check if Tone.js is initialized
 */
export function isToneJsInitialized(): boolean {
  return Tone !== null;
}

/**
 * Dispose all Tone.js resources
 */
export function disposeToneJs(): void {
  if (currentSynth) {
    currentSynth.triggerRelease();
    currentSynth.dispose();
    currentSynth = null;
  }
  if (currentFilter) {
    currentFilter.dispose();
    currentFilter = null;
  }
}
