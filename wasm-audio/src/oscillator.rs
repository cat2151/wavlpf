use wasm_bindgen::prelude::*;

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

#[cfg(test)]
mod tests {
    use super::*;

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
}
