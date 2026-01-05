/**
 * パフォーマンス統計トラッキング
 * 
 * 波形生成処理の処理時間を統計的に追跡し、
 * より正確な処理時間の推定を可能にします。
 */

// パフォーマンス統計の構造
export interface PerformanceStats {
  samples: number[];  // 最近の生成時間
  maxSamples: number; // 保持する最大サンプル数
}

/**
 * パフォーマンス統計を作成
 * @param maxSamples - 保持する最大サンプル数
 * @returns 初期化されたパフォーマンス統計
 */
export function createPerformanceStats(maxSamples: number = 10): PerformanceStats {
  return {
    samples: [],
    maxSamples,
  };
}

/**
 * パフォーマンス統計に生成時間の計測値を追加する
 * @param stats - パフォーマンス統計オブジェクト
 * @param timeMs - 生成時間（ミリ秒）
 */
export function addPerformanceSample(stats: PerformanceStats, timeMs: number): void {
  stats.samples.push(timeMs);
  // 最新のサンプルのみを保持
  if (stats.samples.length > stats.maxSamples) {
    stats.samples.shift();
  }
}

/**
 * パフォーマンスサンプルから統計値を計算する
 * @param stats - パフォーマンス統計オブジェクト
 * @returns 統計情報（current, min, max, avg, count）、サンプルがない場合はnull
 */
export function calculatePerformanceStats(stats: PerformanceStats): {
  current: number;
  min: number;
  max: number;
  avg: number;
  count: number;
} | null {
  const samples = stats.samples;
  if (samples.length === 0) return null;

  const current = samples[samples.length - 1];
  const min = Math.min(...samples);
  const max = Math.max(...samples);
  const avg = samples.reduce((a, b) => a + b, 0) / samples.length;

  return {
    current,
    min,
    max,
    avg,
    count: samples.length,
  };
}

/**
 * パフォーマンス統計をリセットする（例: プロセッサタイプ変更時）
 * @param stats - パフォーマンス統計オブジェクト
 */
export function resetPerformanceStats(stats: PerformanceStats): void {
  stats.samples = [];
}
