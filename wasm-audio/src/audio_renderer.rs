use wasm_bindgen::prelude::*;
use crate::filter::BiquadFilter;
use crate::oscillator::{generate_sawtooth, generate_pulse};

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
