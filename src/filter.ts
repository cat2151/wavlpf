/**
 * Biquad LPF filter implementation
 * Based on RBJ Audio EQ Cookbook formulas
 */
export class BiquadLPF {
  private a0: number = 0;
  private a1: number = 0;
  private a2: number = 0;
  private b1: number = 0;
  private b2: number = 0;
  
  // Filter state
  private x1: number = 0;
  private x2: number = 0;
  private y1: number = 0;
  private y2: number = 0;
  
  private sampleRate: number;
  
  constructor(sampleRate: number) {
    this.sampleRate = sampleRate;
  }
  
  /**
   * Calculate filter coefficients
   * @param cutoffFreq - Cutoff frequency in Hz
   * @param q - Q value (resonance)
   */
  setCoefficients(cutoffFreq: number, q: number): void {
    const omega = 2 * Math.PI * cutoffFreq / this.sampleRate;
    const sinOmega = Math.sin(omega);
    const cosOmega = Math.cos(omega);
    const alpha = sinOmega / (2 * q);
    
    const b0 = (1 - cosOmega) / 2;
    const b1 = 1 - cosOmega;
    const b2 = (1 - cosOmega) / 2;
    const a0 = 1 + alpha;
    const a1 = -2 * cosOmega;
    const a2 = 1 - alpha;
    
    // Normalize coefficients
    this.a0 = b0 / a0;
    this.a1 = b1 / a0;
    this.a2 = b2 / a0;
    this.b1 = a1 / a0;
    this.b2 = a2 / a0;
  }
  
  /**
   * Process a single sample through the filter
   * @param input - Input sample
   * @returns Filtered output sample
   */
  processSample(input: number): number {
    const output = this.a0 * input + this.a1 * this.x1 + this.a2 * this.x2 
                   - this.b1 * this.y1 - this.b2 * this.y2;
    
    // Update state
    this.x2 = this.x1;
    this.x1 = input;
    this.y2 = this.y1;
    this.y1 = output;
    
    return output;
  }
  
  /**
   * Reset filter state
   */
  reset(): void {
    this.x1 = 0;
    this.x2 = 0;
    this.y1 = 0;
    this.y2 = 0;
  }
}
