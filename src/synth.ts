import { generateSawtooth } from './oscillator';
import { BiquadLPF } from './filter';
import { generateWav, createWavBlobUrl } from './wav';
import type * as ToneTypes from 'tone';

// Tone.js is kept as null until the first user interaction. We dynamically import
// the module on a user click so that the underlying AudioContext is not created
// before a user gesture, which would violate browser autoplay policies.
let Tone: typeof ToneTypes | null = null;

// Track whether Tone.js is currently being loaded to prevent race conditions
let isToneLoading = false;

// Promise to track the loading state for concurrent clicks
let toneLoadingPromise: Promise<void> | null = null;

const SAMPLE_RATE = 44100;
const DURATION = 0.25; // 250ms
const FREQUENCY = 220; // 220Hz (A3)

// Mouse position state
let mouseX = 0.5;
let mouseY = 0.5;

// Track currently playing player
let currentPlayer: ToneTypes.Player | null = null;

// Track playback timeout for cleanup
let playbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

// Track whether playback loop has started
let isPlaybackLoopStarted = false;

/**
 * Map mouse position to filter parameters
 */
function getFilterParams(): { cutoff: number; q: number } {
  // X: Cutoff frequency 20Hz - 4000Hz
  const cutoff = 20 + mouseX * (4000 - 20);
  // Y: Q value 0.5 - 16 (inverted: top = high Q, bottom = low Q)
  const q = 0.5 + (1 - mouseY) * (16 - 0.5);
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
  // Ensure Tone is loaded
  if (!Tone) {
    console.warn('Tone.js not loaded yet');
    return;
  }
  
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
  
  // Clean up URL after playback (match 250ms interval)
  setTimeout(() => {
    URL.revokeObjectURL(wavUrl);
  }, 250);
}

/**
 * Initialize the synthesizer
 */
export async function init(): Promise<void> {
  console.log('WAVLPF Synthesizer init() called');
  
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    // Update display
    const cutoff = Math.round(20 + mouseX * (4000 - 20));
    const q = (0.5 + (1 - mouseY) * (16 - 0.5)).toFixed(2);
    
    const display = document.getElementById('params');
    if (display) {
      display.textContent = `Cutoff: ${cutoff}Hz | Q: ${q}`;
    }
  });
  
  // Play audio every 250ms using recursive setTimeout with error handling
  function scheduleNextPlay() {
    if (Tone && Tone.context.state === 'running') {
      playAudio().catch((error: unknown) => {
        console.error('Error while playing audio:', error);
      });
    }
    playbackTimeoutId = setTimeout(scheduleNextPlay, 250);
  }
  
  // Click handler for starting audio
  const handleClick = async () => {
    console.log('Click detected!');
    
    // Load Tone.js dynamically on first user interaction to comply with browser autoplay policies.
    // Dynamic import ensures AudioContext is only created after a user gesture.
    if (!Tone && !isToneLoading) {
      isToneLoading = true;
      toneLoadingPromise = (async () => {
        try {
          console.log('Loading Tone.js...');
          Tone = await import('tone') as typeof ToneTypes;
          console.log('Tone.js loaded');
        } catch (error) {
          console.error('Failed to load Tone.js:', error);
          throw error;
        } finally {
          isToneLoading = false;
          toneLoadingPromise = null;
        }
      })();
    }
    
    // Wait for Tone.js to finish loading if another click initiated the load
    if (toneLoadingPromise) {
      try {
        await toneLoadingPromise;
      } catch (error) {
        return; // Loading failed
      }
    }
    
    if (!Tone) {
      return; // Failed to load
    }
    
    if (Tone.context.state !== 'running') {
      await Tone.start();
      console.log('Audio context started');
    }
    
    // Start playback loop only once
    if (!isPlaybackLoopStarted) {
      isPlaybackLoopStarted = true;
      scheduleNextPlay();
    }
  };
  
  // Attach click listeners to multiple targets for better browser compatibility
  // Some browsers may have issues with document click events in certain scenarios
  document.addEventListener('click', handleClick);
  document.body.addEventListener('click', handleClick);
  
  // Also support touch events for touch-enabled devices
  document.addEventListener('touchstart', handleClick);
  document.body.addEventListener('touchstart', handleClick);
  
  console.log('Click handlers attached to document and body');
  
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
  
  // Reset playback loop flag
  isPlaybackLoopStarted = false;
  
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
