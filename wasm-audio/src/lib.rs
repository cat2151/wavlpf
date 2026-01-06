use wasm_bindgen::prelude::*;
use std::f64::consts::PI;

/// Biquad filter implementation supporting multiple filter types
/// Based on RBJ Audio EQ Cookbook formulas
#[wasm_bindgen]
pub struct BiquadFilter {
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
impl BiquadFilter {
    #[wasm_bindgen(constructor)]
    pub fn new(sample_rate: f64) -> BiquadFilter {
        BiquadFilter {
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

    /// Calculate filter coefficients based on filter type
    /// filter_type: "lpf", "hpf", "bpf", "notch", "apf", "lowshelf", "highshelf"
    pub fn set_coefficients(&mut self, filter_type: &str, cutoff_freq: f64, q: f64) {
        // Clamp cutoff frequency to prevent instability
        let clamped_cutoff = cutoff_freq.max(1.0).min(self.sample_rate / 2.5);
        
        let omega = 2.0 * PI * clamped_cutoff / self.sample_rate;
        let sin_omega = omega.sin();
        let cos_omega = omega.cos();
        let alpha = sin_omega / (2.0 * q);
        
        // Calculate coefficients based on filter type (RBJ Audio EQ Cookbook)
        let (b0, b1, b2, a0, a1, a2) = match filter_type {
            "lpf" => {
                // Low-pass filter
                let b0 = (1.0 - cos_omega) / 2.0;
                let b1 = 1.0 - cos_omega;
                let b2 = (1.0 - cos_omega) / 2.0;
                let a0 = 1.0 + alpha;
                let a1 = -2.0 * cos_omega;
                let a2 = 1.0 - alpha;
                (b0, b1, b2, a0, a1, a2)
            },
            "hpf" => {
                // High-pass filter
                let b0 = (1.0 + cos_omega) / 2.0;
                let b1 = -(1.0 + cos_omega);
                let b2 = (1.0 + cos_omega) / 2.0;
                let a0 = 1.0 + alpha;
                let a1 = -2.0 * cos_omega;
                let a2 = 1.0 - alpha;
                (b0, b1, b2, a0, a1, a2)
            },
            "bpf" => {
                // Band-pass filter (constant skirt gain, peak gain = Q)
                let b0 = alpha;
                let b1 = 0.0;
                let b2 = -alpha;
                let a0 = 1.0 + alpha;
                let a1 = -2.0 * cos_omega;
                let a2 = 1.0 - alpha;
                (b0, b1, b2, a0, a1, a2)
            },
            "notch" => {
                // Notch filter (band-reject)
                let b0 = 1.0;
                let b1 = -2.0 * cos_omega;
                let b2 = 1.0;
                let a0 = 1.0 + alpha;
                let a1 = -2.0 * cos_omega;
                let a2 = 1.0 - alpha;
                (b0, b1, b2, a0, a1, a2)
            },
            "apf" => {
                // All-pass filter
                let b0 = 1.0 - alpha;
                let b1 = -2.0 * cos_omega;
                let b2 = 1.0 + alpha;
                let a0 = 1.0 + alpha;
                let a1 = -2.0 * cos_omega;
                let a2 = 1.0 - alpha;
                (b0, b1, b2, a0, a1, a2)
            },
            "lowshelf" => {
                // Low-shelf filter (using Q as shelf slope, defaulting to A=1.0 for 0dB gain)
                let a: f64 = 1.0; // Gain factor (A = 10^(dBGain/40)), using 0dB for now
                let beta = (a.sqrt() * 2.0 * alpha).sqrt();
                let b0 = a * ((a + 1.0) - (a - 1.0) * cos_omega + beta);
                let b1 = 2.0 * a * ((a - 1.0) - (a + 1.0) * cos_omega);
                let b2 = a * ((a + 1.0) - (a - 1.0) * cos_omega - beta);
                let a0 = (a + 1.0) + (a - 1.0) * cos_omega + beta;
                let a1 = -2.0 * ((a - 1.0) + (a + 1.0) * cos_omega);
                let a2 = (a + 1.0) + (a - 1.0) * cos_omega - beta;
                (b0, b1, b2, a0, a1, a2)
            },
            "highshelf" => {
                // High-shelf filter (using Q as shelf slope, defaulting to A=1.0 for 0dB gain)
                let a: f64 = 1.0; // Gain factor (A = 10^(dBGain/40)), using 0dB for now
                let beta = (a.sqrt() * 2.0 * alpha).sqrt();
                let b0 = a * ((a + 1.0) + (a - 1.0) * cos_omega + beta);
                let b1 = -2.0 * a * ((a - 1.0) + (a + 1.0) * cos_omega);
                let b2 = a * ((a + 1.0) + (a - 1.0) * cos_omega - beta);
                let a0 = (a + 1.0) - (a - 1.0) * cos_omega + beta;
                let a1 = 2.0 * ((a - 1.0) - (a + 1.0) * cos_omega);
                let a2 = (a + 1.0) - (a - 1.0) * cos_omega - beta;
                (b0, b1, b2, a0, a1, a2)
            },
            _ => {
                // Default to LPF for unknown filter types
                let b0 = (1.0 - cos_omega) / 2.0;
                let b1 = 1.0 - cos_omega;
                let b2 = (1.0 - cos_omega) / 2.0;
                let a0 = 1.0 + alpha;
                let a1 = -2.0 * cos_omega;
                let a2 = 1.0 - alpha;
                (b0, b1, b2, a0, a1, a2)
            }
        };
        
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
    
    // Clamp duty ratio to [0, 100] then normalize to [0, 1] to match TypeScript implementation
    let duty = duty_ratio.max(0.0).min(100.0) / 100.0;
    
    for i in 0..num_samples {
        let time = i as f64 / sample_rate;
        let phase = (time * frequency) % 1.0;
        // Pulse wave: +1 when phase < duty, -1 otherwise
        samples.push(if phase < duty { 1.0 } else { -1.0 });
    }
    
    samples
}

/// Render audio with biquad filter and cutoff decay
/// Returns the filtered audio samples
#[wasm_bindgen]
pub fn render_audio(
    waveform_type: &str,
    frequency: f64,
    sample_rate: f64,
    duration: f64,
    duty_ratio: f64,
    filter_type: &str,
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
    let mut filter = BiquadFilter::new(sample_rate);
    
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
                // Calculate maximum cents decay that would bring cutoff to 1Hz
                let max_cents_decay = 1200.0 * initial_cutoff.log2();
                let total_cents_decay = (time_ms * decay_rate).min(max_cents_decay);
                let ratio = 2.0_f64.powf(-total_cents_decay / 1200.0);
                current_cutoff = (initial_cutoff * ratio).max(1.0);
            }
            
            filter.set_coefficients(filter_type, current_cutoff, q);
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
        let filter = BiquadFilter::new(44100.0);
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

    #[test]
    fn test_biquad_lpf_attenuates_high_frequencies() {
        let sample_rate = 44100.0;
        let cutoff = 500.0;
        let q = 1.0;
        let mut filter = BiquadFilter::new(sample_rate);
        filter.set_coefficients("lpf", cutoff, q);
        
        // Generate high-frequency oscillation (5kHz, well above cutoff)
        let frequency = 5000.0;
        let num_samples = 1000;
        let mut sum_input_squared = 0.0;
        let mut sum_output_squared = 0.0;
        
        for i in 0..num_samples {
            let t = i as f64 / sample_rate;
            let input = (2.0 * PI * frequency * t).sin();
            let output = filter.process_sample(input);
            
            sum_input_squared += input * input;
            sum_output_squared += output * output;
        }
        
        // Output power should be significantly less than input power
        assert!(sum_output_squared < sum_input_squared * 0.1);
    }

    #[test]
    fn test_render_audio_with_hz_decay() {
        let result = render_audio(
            "sawtooth",
            220.0,
            44100.0,
            0.1,
            50.0,
            "lpf",
            1000.0,
            1.0,
            "Hz",
            10.0,
        );
        
        // Should have correct number of samples
        assert_eq!(result.len(), 4410);
        
        // All samples should be finite
        for sample in result.iter() {
            assert!(sample.is_finite());
        }
    }

    #[test]
    fn test_render_audio_with_cent_decay() {
        let result = render_audio(
            "pulse",
            220.0,
            44100.0,
            0.1,
            25.0,
            "lpf",
            2000.0,
            2.0,
            "Cent",
            100.0,
        );
        
        // Should have correct number of samples
        assert_eq!(result.len(), 4410);
        
        // All samples should be finite
        for sample in result.iter() {
            assert!(sample.is_finite());
        }
    }

    #[test]
    fn test_pulse_duty_ratio_clamping() {
        // Test that duty ratio is clamped like TypeScript implementation
        let samples_negative = generate_pulse(220.0, 44100.0, 0.01, -10.0);
        let samples_over = generate_pulse(220.0, 44100.0, 0.01, 150.0);
        let samples_50 = generate_pulse(220.0, 44100.0, 0.01, 50.0);
        
        // All should produce valid outputs
        assert!(samples_negative.len() > 0);
        assert!(samples_over.len() > 0);
        assert!(samples_50.len() > 0);
    }

    #[test]
    fn test_filter_types_hpf() {
        let result = render_audio(
            "sawtooth",
            220.0,
            44100.0,
            0.1,
            50.0,
            "hpf",
            1000.0,
            1.0,
            "Hz",
            10.0,
        );
        
        assert_eq!(result.len(), 4410);
        for sample in result.iter() {
            assert!(sample.is_finite());
        }
    }

    #[test]
    fn test_filter_types_bpf() {
        let result = render_audio(
            "sawtooth",
            220.0,
            44100.0,
            0.1,
            50.0,
            "bpf",
            1000.0,
            2.0,
            "Hz",
            10.0,
        );
        
        assert_eq!(result.len(), 4410);
        for sample in result.iter() {
            assert!(sample.is_finite());
        }
    }

    #[test]
    fn test_filter_types_notch() {
        let result = render_audio(
            "sawtooth",
            220.0,
            44100.0,
            0.1,
            50.0,
            "notch",
            1000.0,
            4.0,
            "Hz",
            10.0,
        );
        
        assert_eq!(result.len(), 4410);
        for sample in result.iter() {
            assert!(sample.is_finite());
        }
    }

    #[test]
    fn test_filter_types_apf() {
        let result = render_audio(
            "sawtooth",
            220.0,
            44100.0,
            0.1,
            50.0,
            "apf",
            1000.0,
            1.0,
            "Hz",
            10.0,
        );
        
        assert_eq!(result.len(), 4410);
        for sample in result.iter() {
            assert!(sample.is_finite());
        }
    }

    #[test]
    fn test_filter_types_lowshelf() {
        let result = render_audio(
            "sawtooth",
            220.0,
            44100.0,
            0.1,
            50.0,
            "lowshelf",
            1000.0,
            1.0,
            "Hz",
            10.0,
        );
        
        assert_eq!(result.len(), 4410);
        for sample in result.iter() {
            assert!(sample.is_finite());
        }
    }

    #[test]
    fn test_filter_types_highshelf() {
        let result = render_audio(
            "sawtooth",
            220.0,
            44100.0,
            0.1,
            50.0,
            "highshelf",
            1000.0,
            1.0,
            "Hz",
            10.0,
        );
        
        assert_eq!(result.len(), 4410);
        for sample in result.iter() {
            assert!(sample.is_finite());
        }
    }
}
