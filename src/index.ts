import { init } from './synth';

console.log('index.ts loaded');

// Track if init has been called to prevent double initialization
let initialized = false;

// Initialize synth when page loads
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  if (!initialized) {
    initialized = true;
    init();
  }
});

// Fallback: if DOMContentLoaded already fired, init immediately
if (document.readyState === 'loading') {
  console.log('Document still loading, waiting for DOMContentLoaded');
} else {
  console.log('Document already loaded, initializing immediately');
  if (!initialized) {
    initialized = true;
    init();
  }
}
