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
const FREQUENCY = 220; // 220Hz (A3)

// Mouse position state
let mouseX = 0.5;
let mouseY = 0.5;

// Parameter state
let bpm = 120;
let beat = 8;
let qMax = 16;
let cutoffMax = 4000;
let decayUnit: 'Hz' | 'Cent' = 'Hz';
let decayRate = 1;

// Track currently playing player
let currentPlayer: ToneTypes.Player | null = null;

// Track playback timeout for cleanup
let playbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

// Track whether playback loop has started
let isPlaybackLoopStarted = false;

/**
 * Calculate duration in seconds based on BPM and beat
 */
function getDuration(): number {
  // Duration = (60 seconds / BPM) * (beat / 8)
  // For BPM=120, beat=8: (60/120) * (8/8) = 0.5 * 1 = 0.5s = 500ms
  // For BPM=120, beat=4: (60/120) * (4/8) = 0.5 * 0.5 = 0.25s = 250ms
  return (60 / bpm) * (beat / 8);
}

/**
 * Read parameters from UI
 */
function readParameters(): void {
  const bpmEl = document.getElementById('bpm') as HTMLTextAreaElement;
  const beatEl = document.getElementById('beat') as HTMLTextAreaElement;
  const qMaxEl = document.getElementById('qMax') as HTMLTextAreaElement;
  const cutoffMaxEl = document.getElementById('cutoffMax') as HTMLTextAreaElement;
  const decayUnitEl = document.getElementById('decayUnit') as HTMLSelectElement;
  const decayRateEl = document.getElementById('decayRate') as HTMLTextAreaElement;
  
  if (bpmEl) {
    const value = parseFloat(bpmEl.value);
    if (!isNaN(value) && value > 0) {
      bpm = value;
    }
  }
  
  if (beatEl) {
    const value = parseFloat(beatEl.value);
    if (!isNaN(value) && value > 0) {
      beat = value;
    }
  }
  
  if (qMaxEl) {
    const value = parseFloat(qMaxEl.value);
    if (!isNaN(value) && value > 0) {
      qMax = value;
    }
  }
  
  if (cutoffMaxEl) {
    const value = parseFloat(cutoffMaxEl.value);
    if (!isNaN(value) && value > 0) {
      cutoffMax = value;
    }
  }
  
  if (decayUnitEl) {
    decayUnit = decayUnitEl.value as 'Hz' | 'Cent';
  }
  
  if (decayRateEl) {
    const value = parseFloat(decayRateEl.value);
    if (!isNaN(value) && value >= 0) {
      decayRate = value;
    }
  }
}

/**
 * Convert cents to frequency ratio
 * @param cents - Number of cents
 * @returns Frequency ratio
 */
function centsToRatio(cents: number): number {
  return Math.pow(2, cents / 1200);
}

/**
 * Map mouse position to filter parameters
 */
function getFilterParams(): { cutoff: number; q: number } {
  // X: Cutoff frequency 20Hz - cutoffMax
  const cutoff = 20 + mouseX * (cutoffMax - 20);
  // Y: Q value 0.5 - qMax (inverted: top = high Q, bottom = low Q)
  const q = 0.5 + (1 - mouseY) * (qMax - 0.5);
  return { cutoff, q };
}

/**
 * Render audio with LPF and cutoff decay
 */
function renderAudio(): Float32Array {
  const duration = getDuration();
  
  // Generate sawtooth wave
  const samples = generateSawtooth(FREQUENCY, SAMPLE_RATE, duration);
  
  // Create filter
  const filter = new BiquadLPF(SAMPLE_RATE);
  const { cutoff: initialCutoff, q } = getFilterParams();
  
  // Process each sample with cutoff decay
  const numSamples = samples.length;
  const output = new Float32Array(numSamples);
  
  // Update filter coefficients at a lower rate (~1ms intervals)
  // This is more efficient than per-sample updates since the decay is relatively slow
  const updateIntervalMs = 1;
  const samplesPerUpdate = Math.max(1, Math.floor(SAMPLE_RATE * (updateIntervalMs / 1000)));
  
  let currentCutoff = initialCutoff;
  
  for (let i = 0; i < numSamples; i++) {
    // Recalculate coefficients only every samplesPerUpdate samples
    if (i % samplesPerUpdate === 0) {
      // Calculate time in ms at this sample
      const timeMs = (i / SAMPLE_RATE) * 1000;
      
      // Decay cutoff based on decay unit and rate
      if (decayUnit === 'Hz') {
        // Decay in Hz: decayRate Hz per 1ms, minimum 1Hz
        currentCutoff = Math.max(1, initialCutoff - timeMs * decayRate);
      } else {
        // Decay in Cent: decayRate cents per 1ms
        const totalCentsDecay = timeMs * decayRate;
        const ratio = centsToRatio(-totalCentsDecay); // Negative because we're decaying
        currentCutoff = Math.max(1, initialCutoff * ratio);
      }
      
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
  
  // Clean up URL after playback (match duration)
  setTimeout(() => {
    URL.revokeObjectURL(wavUrl);
  }, getDuration() * 1000);
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
    const cutoff = Math.round(20 + mouseX * (cutoffMax - 20));
    const q = (0.5 + (1 - mouseY) * (qMax - 0.5)).toFixed(2);
    
    const display = document.getElementById('params');
    if (display) {
      display.textContent = `Cutoff: ${cutoff}Hz | Q: ${q}`;
    }
  });
  
  // Add input event listeners for parameter changes
  const inputs = ['bpm', 'beat', 'qMax', 'cutoffMax', 'decayUnit', 'decayRate'];
  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', () => {
        readParameters();
        updateStatusDisplay();
      });
    }
  });
  
  // Initial parameter read
  readParameters();
  updateStatusDisplay();
  
  // Play audio based on calculated duration using recursive setTimeout with error handling
  function scheduleNextPlay() {
    if (Tone && Tone.context.state === 'running') {
      playAudio().catch((error: unknown) => {
        console.error('Error while playing audio:', error);
      });
    }
    const duration = getDuration();
    playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
  }
  
  // Click handler for starting audio
  const handleClick = async (event: Event) => {
    // For touch events, prevent the subsequent click event from firing.
    // This ensures handleClick is only called once per tap on touch devices.
    // Note: This may interfere with touch scrolling, but is necessary to prevent
    // duplicate audio context initialization on touch-enabled devices.
    if (event.type === 'touchstart') {
      event.preventDefault();
    }
    
    // Load Tone.js dynamically on first user interaction to comply with browser autoplay policies.
    // Dynamic import ensures AudioContext is only created after a user gesture.
    if (!Tone && !isToneLoading) {
      isToneLoading = true;
      toneLoadingPromise = (async () => {
        try {
          Tone = await import('tone') as typeof ToneTypes;
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
    }
    
    // Start playback loop only once
    if (!isPlaybackLoopStarted) {
      isPlaybackLoopStarted = true;
      scheduleNextPlay();
    }
  };
  
  // Attach click listener only to document to avoid duplicate execution from event bubbling
  // Touch events use { passive: false } since preventDefault() is called in the handler
  document.addEventListener('click', handleClick);
  document.addEventListener('touchstart', handleClick, { passive: false });
}

/**
 * Update the status display with current settings
 */
function updateStatusDisplay(): void {
  const statusEl = document.getElementById('status');
  if (statusEl) {
    const duration = getDuration();
    statusEl.textContent = `New audio generated every ${(duration * 1000).toFixed(0)}ms (BPM: ${bpm}, Beat: ${beat})`;
  }
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
