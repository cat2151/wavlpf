// Module declarations
mod filter;
mod oscillator;
mod audio_renderer;

// Re-export public API for WASM bindings
pub use filter::BiquadFilter;
pub use oscillator::{generate_sawtooth, generate_pulse};
pub use audio_renderer::render_audio;
