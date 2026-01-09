/**
 * BPMとビート値から再生周期を計算するモジュール
 */

/**
 * BPMとビート値から再生周期(秒)を計算
 * 
 * 4分音符の長さ = 60 / BPM [秒]
 * ビート値はノートの長さとして解釈: 1/beat
 *   - beat = 4 -> 4分音符
 *   - beat = 8 -> 8分音符
 * 
 * 再生周期 = (60秒 / BPM) × (4 / beat)
 * 例: BPM=120, beat=8の場合: (60/120) × (4/8) = 0.5 × 0.5 = 0.25秒 = 250ms
 * 例: BPM=120, beat=4の場合: (60/120) × (4/4) = 0.5 × 1   = 0.5秒  = 500ms
 * 
 * @param bpm - BPM値（正の数である必要があります）
 * @param beat - ビート値（正の数である必要があります）
 * @returns 再生周期(秒)
 * @throws {Error} bpmまたはbeatが0以下の場合
 */
export function calculateDuration(bpm: number, beat: number): number {
  if (bpm <= 0 || beat <= 0) {
    throw new Error(`Invalid parameters: bpm=${bpm}, beat=${beat}. Both must be positive numbers.`);
  }
  return (60 / bpm) * (4 / beat);
}
