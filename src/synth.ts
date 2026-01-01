import { generateSawtooth } from './oscillator';
import { BiquadLPF } from './filter';
import { generateWav, createWavBlobUrl } from './wav';

// Use global Tone from the UMD build loaded via script tag
// This provides better type safety than `any` while maintaining the UMD approach
interface TonePlayer {
  start(): void;
  stop(): void;
  dispose(): void;
  toDestination(): TonePlayer;
}

interface ToneContext {
  state: 'suspended' | 'running' | 'closed';
}

interface ToneStatic {
  Player: new (url: string) => TonePlayer;
  context: ToneContext;
  start(): Promise<void>;
  loaded(): Promise<void>;
}

declare const Tone: ToneStatic;

const SAMPLE_RATE = 44100;
const DURATION = 0.5; // 500ms
const FREQUENCY = 220; // 220Hz (A3)

// Mouse position state
let mouseX = 0.5;
let mouseY = 0.5;

// Track currently playing player
let currentPlayer: TonePlayer | null = null;

// Track playback timeout for cleanup
let playbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

/**
 * Map mouse position to filter parameters
 */
function getFilterParams(): { cutoff: number; q: number } {
  // X: Cutoff frequency 20Hz - 1000Hz
  const cutoff = 20 + mouseX * (1000 - 20);
  // Y: Q value 0.5 - 2
  const q = 0.5 + mouseY * (2 - 0.5);
  return { cutoff, q };
}

/**
 * Render audio with LPF and cutoff decay
 */
function renderAudio(): Float32Array {
  // Generate sawtooth wave
  const samples = generateSawtooth(FREQUENCY, SAMPLE_RATE, DURATION);
  
  // Create filter
  const filter = new BiquadLPF(SAMPLE_RATE);
  const { cutoff: initialCutoff, q } = getFilterParams();
  
  // Process each sample with cutoff decay
  const numSamples = samples.length;
  const output = new Float32Array(numSamples);
  
  // Update filter coefficients at a lower rate (~1ms intervals)
  // This is more efficient than per-sample updates since the 1Hz/ms decay is relatively slow
  const updateIntervalMs = 1;
  const samplesPerUpdate = Math.max(1, Math.floor(SAMPLE_RATE * (updateIntervalMs / 1000)));
  
  let currentCutoff = initialCutoff;
  
  for (let i = 0; i < numSamples; i++) {
    // Recalculate coefficients only every samplesPerUpdate samples
    if (i % samplesPerUpdate === 0) {
      // Calculate time in ms at this sample
      const timeMs = (i / SAMPLE_RATE) * 1000;
      
      // Decay cutoff: 1Hz per 1ms, minimum 1Hz
      currentCutoff = Math.max(1, initialCutoff - timeMs);
      
      // Update filter coefficients at this control rate
      filter.setCoefficients(currentCutoff, q);
    }
    
    // Process sample with current filter coefficients
    output[i] = filter.processSample(samples[i]);
  }
  
  return output;
}

/**
 * Generate and play audio
 */
async function playAudio(): Promise<void> {
  // Render audio
  const samples = renderAudio();
  
  // Generate WAV
  const wavData = generateWav(samples, SAMPLE_RATE);
  const wavUrl = createWavBlobUrl(wavData);
  
  // Stop previous player if exists
  if (currentPlayer) {
    try {
      currentPlayer.stop();
      currentPlayer.dispose();
    } catch (error) {
      // Log errors instead of silently ignoring them
      console.warn('Failed to stop or dispose previous player:', error);
    }
  }
  
  // Create and play new player
  currentPlayer = new Tone.Player(wavUrl).toDestination();
  await Tone.loaded();
  currentPlayer.start();
  
  // Clean up URL after playback (match 500ms interval)
  setTimeout(() => {
    URL.revokeObjectURL(wavUrl);
  }, 500);
}

/**
 * Initialize the synthesizer
 */
export async function init(): Promise<void> {
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    // Update display
    const cutoff = Math.round(20 + mouseX * (1000 - 20));
    const q = (0.5 + mouseY * (2 - 0.5)).toFixed(2);
    
    const display = document.getElementById('params');
    if (display) {
      display.textContent = `Cutoff: ${cutoff}Hz | Q: ${q}`;
    }
  });
  
  // Play audio every 500ms using recursive setTimeout with error handling
  function scheduleNextPlay() {
    if (Tone.context.state === 'running') {
      playAudio().catch((error: unknown) => {
        console.error('Error while playing audio:', error);
      });
    }
    playbackTimeoutId = setTimeout(scheduleNextPlay, 500);
  }
  
  // Start audio context on user interaction
  document.addEventListener('click', async () => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
      console.log('Audio context started');
      // Start playback loop after audio context is running
      scheduleNextPlay();
    }
  }, { once: true });
  
  console.log('WAVLPF Synthesizer initialized');
  console.log('Click anywhere to start audio');
  console.log('Move mouse to control filter parameters');
}

/**
 * Stop the synthesizer and clean up resources
 */
export function dispose(): void {
  // Clear playback timeout
  if (playbackTimeoutId !== null) {
    clearTimeout(playbackTimeoutId);
    playbackTimeoutId = null;
  }
  
  // Stop and dispose current player
  if (currentPlayer) {
    try {
      currentPlayer.stop();
      currentPlayer.dispose();
    } catch (error) {
      console.warn('Failed to dispose player during cleanup:', error);
    }
    currentPlayer = null;
  }
}
