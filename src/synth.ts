import { generateSawtooth } from './oscillator.js';
import { BiquadLPF } from './filter.js';
import { generateWav, createWavBlobUrl } from './wav.js';

// Use global Tone from the UMD build
declare const Tone: any;

const SAMPLE_RATE = 44100;
const DURATION = 0.5; // 500ms
const FREQUENCY = 220; // 220Hz (A3)

// Mouse position state
let mouseX = 0.5;
let mouseY = 0.5;

// Track currently playing player
let currentPlayer: any = null;

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
  
  for (let i = 0; i < numSamples; i++) {
    // Calculate time in ms
    const timeMs = (i / SAMPLE_RATE) * 1000;
    
    // Decay cutoff: 1Hz per 1ms, minimum 1Hz
    let cutoff = initialCutoff - timeMs;
    cutoff = Math.max(1, cutoff);
    
    // Update filter coefficients for this sample
    filter.setCoefficients(cutoff, q);
    
    // Process sample
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
      // Ignore errors if already stopped/disposed
    }
  }
  
  // Create and play new player
  currentPlayer = new Tone.Player(wavUrl).toDestination();
  await Tone.loaded();
  currentPlayer.start();
  
  // Clean up URL after playback
  setTimeout(() => {
    URL.revokeObjectURL(wavUrl);
  }, 1000);
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
  
  // Start audio context on user interaction
  document.addEventListener('click', async () => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
      console.log('Audio context started');
    }
  });
  
  // Play audio every 500ms using recursive setTimeout
  function scheduleNextPlay() {
    if (Tone.context.state === 'running') {
      playAudio();
    }
    setTimeout(scheduleNextPlay, 500);
  }
  
  setTimeout(scheduleNextPlay, 500);
  
  console.log('WAVLPF Synthesizer initialized');
  console.log('Click anywhere to start audio');
  console.log('Move mouse to control filter parameters');
}
