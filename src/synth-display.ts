import { getCurrentMode } from './playback-mode';
import { calculateDuration } from './timing';
import {
  addPerformanceSample,
  calculatePerformanceStats,
  type PerformanceStats,
} from './performance-stats';

/**
 * Display oscilloscope error message to the user
 * @param message - Error message to display
 */
export function displayOscilloscopeError(message: string): void {
  const container = document.querySelector('.oscilloscope-container');
  if (!container) return;

  // Remove any existing error message
  const existingError = container.querySelector('.oscilloscope-error');
  if (existingError) {
    existingError.remove();
  }

  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'oscilloscope-error';
  errorDiv.textContent = message;

  container.appendChild(errorDiv);

  // Auto-remove error after 5 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

/**
 * 現在の設定でステータス表示を更新
 */
export function updateStatusDisplay(bpm: number, beat: number): void {
  const statusEl = document.getElementById('status');
  if (statusEl) {
    const mode = getCurrentMode();
    if (mode === 'wav') {
      const duration = calculateDuration(bpm, beat);
      statusEl.textContent = `New audio generated every ${(duration * 1000).toFixed(0)}ms (BPM: ${bpm}, Beat: ${beat})`;
    } else {
      statusEl.textContent = 'Seq Mode: Playing stored WAV every 1 second';
    }
  }
}

/**
 * 波形生成時間を表示
 * @param generationTimeMs - 生成時間(ミリ秒)
 * @param performanceStats - パフォーマンス統計オブジェクト(変更される)
 */
export function updateGenerationTimeDisplay(generationTimeMs: number, performanceStats: PerformanceStats): void {
  // この計測値を統計に追加
  addPerformanceSample(performanceStats, generationTimeMs);

  const genTimeEl = document.getElementById('generationTime');
  if (genTimeEl) {
    const stats = calculatePerformanceStats(performanceStats);

    if (stats && stats.count > 1) {
      // 複数のサンプルがある場合は詳細な統計情報を表示
      const currentText = `Generation time (Rust WASM): ${stats.current.toFixed(2)}ms`;
      const statsText = `[n=${stats.count}, min=${stats.min.toFixed(2)}ms, max=${stats.max.toFixed(2)}ms, avg=${stats.avg.toFixed(2)}ms]`;
      genTimeEl.textContent = `${currentText} ${statsText}`;
    } else {
      // 初回計測では単純表示
      genTimeEl.textContent = `Generation time (Rust WASM): ${generationTimeMs.toFixed(2)}ms`;
    }
  }
}
