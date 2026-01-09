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
                let beta = a.sqrt() * (2.0 * alpha).sqrt();
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
                let beta = a.sqrt() * (2.0 * alpha).sqrt();
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_biquad_lpf_creation() {
        let filter = BiquadFilter::new(44100.0);
        assert_eq!(filter.sample_rate, 44100.0);
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
    fn test_hpf_attenuates_low_frequencies() {
        let sample_rate = 44100.0;
        let cutoff = 500.0;
        let q = 1.0;
        let mut filter = BiquadFilter::new(sample_rate);
        filter.set_coefficients("hpf", cutoff, q);
        
        // Generate low-frequency oscillation (100Hz, well below cutoff)
        let frequency = 100.0;
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
    fn test_bpf_attenuates_outside_band() {
        let sample_rate = 44100.0;
        let cutoff = 1000.0;
        let q = 2.0;
        let mut filter = BiquadFilter::new(sample_rate);
        filter.set_coefficients("bpf", cutoff, q);
        
        // Test low frequency (well below cutoff)
        let low_freq = 200.0;
        let mut sum_input_squared_low = 0.0;
        let mut sum_output_squared_low = 0.0;
        
        filter.reset();
        for i in 0..1000 {
            let t = i as f64 / sample_rate;
            let input = (2.0 * PI * low_freq * t).sin();
            let output = filter.process_sample(input);
            sum_input_squared_low += input * input;
            sum_output_squared_low += output * output;
        }
        
        // Test high frequency (well above cutoff)
        let high_freq = 5000.0;
        let mut sum_input_squared_high = 0.0;
        let mut sum_output_squared_high = 0.0;
        
        filter.reset();
        for i in 0..1000 {
            let t = i as f64 / sample_rate;
            let input = (2.0 * PI * high_freq * t).sin();
            let output = filter.process_sample(input);
            sum_input_squared_high += input * input;
            sum_output_squared_high += output * output;
        }
        
        // Both low and high frequencies should be attenuated
        assert!(sum_output_squared_low < sum_input_squared_low * 0.1);
        assert!(sum_output_squared_high < sum_input_squared_high * 0.1);
    }

    #[test]
    fn test_notch_attenuates_cutoff_frequency() {
        let sample_rate = 44100.0;
        let cutoff = 1000.0;
        let q = 4.0;
        let mut filter = BiquadFilter::new(sample_rate);
        filter.set_coefficients("notch", cutoff, q);
        
        // Test at cutoff frequency - should be attenuated
        let mut sum_input_squared = 0.0;
        let mut sum_output_squared = 0.0;
        
        for i in 0..1000 {
            let t = i as f64 / sample_rate;
            let input = (2.0 * PI * cutoff * t).sin();
            let output = filter.process_sample(input);
            sum_input_squared += input * input;
            sum_output_squared += output * output;
        }
        
        // Cutoff frequency should be significantly attenuated
        assert!(sum_output_squared < sum_input_squared * 0.1);
    }

    #[test]
    fn test_apf_preserves_magnitude() {
        let sample_rate = 44100.0;
        let cutoff = 1000.0;
        let q = 1.0;
        let mut filter = BiquadFilter::new(sample_rate);
        filter.set_coefficients("apf", cutoff, q);
        
        // Test that APF doesn't change magnitude significantly
        let frequency = 1000.0;
        let mut sum_input_squared = 0.0;
        let mut sum_output_squared = 0.0;
        
        for i in 0..1000 {
            let t = i as f64 / sample_rate;
            let input = (2.0 * PI * frequency * t).sin();
            let output = filter.process_sample(input);
            sum_input_squared += input * input;
            sum_output_squared += output * output;
        }
        
        // Output power should be similar to input power (within 20%)
        let ratio = sum_output_squared / sum_input_squared;
        assert!(ratio > 0.8 && ratio < 1.2);
    }
}
