import { init } from './synth';

// Track if init has been called to prevent double initialization
let initialized = false;

// Initialize synth when page loads
window.addEventListener('DOMContentLoaded', () => {
  if (!initialized) {
    initialized = true;
    init();
  }
});

// Fallback: if DOMContentLoaded already fired, init immediately
if (document.readyState !== 'loading') {
  if (!initialized) {
    initialized = true;
    init();
  }
}
