use wasm_bindgen::prelude::*;
use std::f64::consts::PI;

/// Biquad LPF filter implementation
/// Based on RBJ Audio EQ Cookbook formulas
#[wasm_bindgen]
pub struct BiquadLPF {
    a0: f64,
    a1: f64,
    a2: f64,
    b1: f64,
    b2: f64,
    x1: f64,
    x2: f64,
    y1: f64,
    y2: f64,
    sample_rate: f64,
}

#[wasm_bindgen]
impl BiquadLPF {
    #[wasm_bindgen(constructor)]
    pub fn new(sample_rate: f64) -> BiquadLPF {
        BiquadLPF {
            a0: 0.0,
            a1: 0.0,
            a2: 0.0,
            b1: 0.0,
            b2: 0.0,
            x1: 0.0,
            x2: 0.0,
            y1: 0.0,
            y2: 0.0,
            sample_rate,
        }
    }

    /// Calculate filter coefficients
    pub fn set_coefficients(&mut self, cutoff_freq: f64, q: f64) {
        // Clamp cutoff frequency to prevent instability
        let clamped_cutoff = cutoff_freq.max(1.0).min(self.sample_rate / 2.5);
        
        let omega = 2.0 * PI * clamped_cutoff / self.sample_rate;
        let sin_omega = omega.sin();
        let cos_omega = omega.cos();
        let alpha = sin_omega / (2.0 * q);
        
        let b0 = (1.0 - cos_omega) / 2.0;
        let b1 = 1.0 - cos_omega;
        let b2 = (1.0 - cos_omega) / 2.0;
        let a0 = 1.0 + alpha;
        let a1 = -2.0 * cos_omega;
        let a2 = 1.0 - alpha;
        
        // Normalize coefficients
        self.a0 = b0 / a0;
        self.a1 = b1 / a0;
        self.a2 = b2 / a0;
        self.b1 = a1 / a0;
        self.b2 = a2 / a0;
    }

    /// Process a single sample through the filter
    pub fn process_sample(&mut self, input: f64) -> f64 {
        let output = self.a0 * input + self.a1 * self.x1 + self.a2 * self.x2
                     - self.b1 * self.y1 - self.b2 * self.y2;
        
        self.x2 = self.x1;
        self.x1 = input;
        self.y2 = self.y1;
        self.y1 = output;
        
        output
    }

    /// Reset filter state
    pub fn reset(&mut self) {
        self.x1 = 0.0;
        self.x2 = 0.0;
        self.y1 = 0.0;
        self.y2 = 0.0;
    }
}

/// Generate a sawtooth wave
#[wasm_bindgen]
pub fn generate_sawtooth(frequency: f64, sample_rate: f64, duration: f64) -> Vec<f64> {
    let num_samples = (sample_rate * duration).floor() as usize;
    let mut samples = Vec::with_capacity(num_samples);
    
    for i in 0..num_samples {
        let time = i as f64 / sample_rate;
        let phase = (time * frequency) % 1.0;
        // Sawtooth wave: -1 to 1
        samples.push(2.0 * phase - 1.0);
    }
    
    samples
}

/// Generate a pulse wave
#[wasm_bindgen]
pub fn generate_pulse(frequency: f64, sample_rate: f64, duration: f64, duty_ratio: f64) -> Vec<f64> {
    let num_samples = (sample_rate * duration).floor() as usize;
    let mut samples = Vec::with_capacity(num_samples);
    
    // Clamp duty ratio to valid range
    let duty = (duty_ratio / 100.0).max(0.0).min(1.0);
    
    for i in 0..num_samples {
        let time = i as f64 / sample_rate;
        let phase = (time * frequency) % 1.0;
        // Pulse wave: +1 when phase < duty, -1 otherwise
        samples.push(if phase < duty { 1.0 } else { -1.0 });
    }
    
    samples
}

/// Render audio with LPF and cutoff decay
/// Returns the filtered audio samples
#[wasm_bindgen]
pub fn render_audio(
    waveform_type: &str,
    frequency: f64,
    sample_rate: f64,
    duration: f64,
    duty_ratio: f64,
    initial_cutoff: f64,
    q: f64,
    decay_unit: &str,
    decay_rate: f64,
) -> Vec<f64> {
    // Generate waveform
    let samples = if waveform_type == "pulse" {
        generate_pulse(frequency, sample_rate, duration, duty_ratio)
    } else {
        generate_sawtooth(frequency, sample_rate, duration)
    };
    
    let num_samples = samples.len();
    let mut output = Vec::with_capacity(num_samples);
    let mut filter = BiquadLPF::new(sample_rate);
    
    // Update filter coefficients approximately every 1ms
    let update_interval_ms = 1.0;
    let samples_per_update = ((sample_rate * (update_interval_ms / 1000.0)).floor() as usize).max(1);
    
    let mut current_cutoff = initial_cutoff;
    
    for (i, &sample) in samples.iter().enumerate() {
        // Update coefficients at regular intervals
        if i % samples_per_update == 0 {
            let time_ms = (i as f64 / sample_rate) * 1000.0;
            
            // Apply cutoff decay based on unit and rate
            if decay_unit == "Hz" {
                // Hz decay: decay_rate Hz per ms, minimum 1Hz
                current_cutoff = (initial_cutoff - time_ms * decay_rate).max(1.0);
            } else {
                // Cent decay: decay_rate cents per ms
                // Limit decay to prevent cutoff from going below 1Hz
                let max_cents_decay = 1200.0 * initial_cutoff.log2();
                let total_cents_decay = (time_ms * decay_rate).min(max_cents_decay);
                let ratio = 2.0_f64.powf(-total_cents_decay / 1200.0);
                current_cutoff = (initial_cutoff * ratio).max(1.0);
            }
            
            filter.set_coefficients(current_cutoff, q);
        }
        
        output.push(filter.process_sample(sample));
    }
    
    output
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_biquad_lpf_creation() {
        let filter = BiquadLPF::new(44100.0);
        assert_eq!(filter.sample_rate, 44100.0);
    }

    #[test]
    fn test_generate_sawtooth() {
        let samples = generate_sawtooth(220.0, 44100.0, 0.1);
        assert_eq!(samples.len(), 4410);
        // Check that samples are in range [-1, 1]
        for sample in samples.iter() {
            assert!(*sample >= -1.0 && *sample <= 1.0);
        }
    }

    #[test]
    fn test_generate_pulse() {
        let samples = generate_pulse(220.0, 44100.0, 0.1, 50.0);
        assert_eq!(samples.len(), 4410);
        // Check that samples are either 1 or -1
        for sample in samples.iter() {
            assert!(*sample == 1.0 || *sample == -1.0);
        }
    }
}
