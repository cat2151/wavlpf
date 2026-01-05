import { generateSawtooth, generatePulse } from './oscillator';
import { BiquadLPF } from './filter';
import { generateWav, createWavBlobUrl } from './wav';
import type * as ToneTypes from 'tone';
import {
  Settings,
  loadSettings,
  saveSettings,
  exportSettingsToFile,
  importSettingsFromFile,
} from './settings';
import { initWasm, isWasmInitialized, renderAudioWasm } from './wasmAudio';
import {
  createPerformanceStats,
  addPerformanceSample,
  calculatePerformanceStats,
  resetPerformanceStats,
  type PerformanceStats,
} from './performance-stats';

// Tone.js is kept as null until the first user interaction. We dynamically import
// the module on a user click so that the underlying AudioContext is not created
// before a user gesture, which would violate browser autoplay policies.
let Tone: typeof ToneTypes | null = null;

// Track whether Tone.js is currently being loaded to prevent race conditions
let isToneLoading = false;

// Promise to track the loading state for concurrent clicks
let toneLoadingPromise: Promise<void> | null = null;

const SAMPLE_RATE = 44100;
const FREQUENCY = 220; // 220Hz (A3)

// Mouse position state
let mouseX = 0.5;
let mouseY = 0.5;

// Parameter state - loaded from settings
const initialSettings: Settings = loadSettings();
let bpm = initialSettings.bpm;
let beat = initialSettings.beat;
let qMax = initialSettings.qMax;
let cutoffMax = initialSettings.cutoffMax;
let decayUnit: 'Hz' | 'Cent' = initialSettings.decayUnit;
let decayRate = initialSettings.decayRate;
let waveformType: 'sawtooth' | 'pulse' = initialSettings.waveformType;
let dutyRatio = initialSettings.dutyRatio;

// Processor type: TypeScript or WASM - loaded from settings
let processorType: 'typescript' | 'wasm' = initialSettings.processorType;

/**
 * 現在の設定を取得
 */
function getCurrentSettings(): Settings {
  return {
    bpm,
    beat,
    qMax,
    cutoffMax,
    decayUnit,
    decayRate,
    waveformType,
    dutyRatio,
    processorType,
  };
}

// Track currently playing player
let currentPlayer: ToneTypes.Player | null = null;

// Track playback timeout for cleanup
let playbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

// Track whether playback loop has started
let isPlaybackLoopStarted = false;

// パフォーマンス統計トラッキング
const performanceStats: PerformanceStats = createPerformanceStats(10);

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
 */
function getDuration(): number {
  return (60 / bpm) * (4 / beat);
}

/**
 * textareaから数値パラメータを読み込んで検証
 * @param id - 要素のID
 * @param validator - 検証関数
 * @returns 検証済みの値、または検証失敗時はnull
 */
function readNumericParameter(
  id: string,
  validator: (value: number) => boolean
): number | null {
  const el = document.getElementById(id) as HTMLTextAreaElement | null;
  if (el) {
    const value = parseFloat(el.value);
    if (!isNaN(value) && validator(value)) {
      return value;
    }
  }
  return null;
}

/**
 * UIからパラメータを読み込む
 */
function readParameters(): void {
  const decayUnitEl = document.getElementById('decayUnit') as HTMLSelectElement | null;
  const waveformTypeEl = document.getElementById('waveformType') as HTMLSelectElement | null;
  const processorEl = document.getElementById('processor') as HTMLSelectElement | null;
  
  // Processor Type
  if (processorEl) {
    const value = processorEl.value;
    if (value === 'typescript' || value === 'wasm') {
      // プロセッサタイプ変更時にパフォーマンス統計をリセット
      if (processorType !== value) {
        resetPerformanceStats(performanceStats);
      }
      processorType = value;
    }
  }
  
  // BPM: 30-300の範囲で検証
  const bpmValue = readNumericParameter('bpm', (value) => value >= 30 && value <= 300);
  if (bpmValue !== null) {
    bpm = bpmValue;
  }
  
  // Beat: 1-32の範囲で検証
  const beatValue = readNumericParameter('beat', (value) => value >= 1 && value <= 32);
  if (beatValue !== null) {
    beat = beatValue;
  }
  
  // Q Max: 0.5-50の範囲で検証
  const qMaxValue = readNumericParameter('qMax', (value) => value >= 0.5 && value <= 50);
  if (qMaxValue !== null) {
    qMax = qMaxValue;
  }
  
  // Cutoff Max: 20-20000Hzの範囲で検証
  const cutoffMaxValue = readNumericParameter('cutoffMax', (value) => value >= 20 && value <= 20000);
  if (cutoffMaxValue !== null) {
    cutoffMax = cutoffMaxValue;
  }
  
  // Decay Unit
  if (decayUnitEl) {
    const value = decayUnitEl.value;
    if (value === 'Hz' || value === 'Cent') {
      decayUnit = value;
    }
  }
  
  // Decay Rate: 0.01以上で検証(0は減衰なしなので最小値を0.01に設定)
  const decayRateValue = readNumericParameter('decayRate', (value) => value >= 0.01);
  if (decayRateValue !== null) {
    decayRate = decayRateValue;
  }
  
  // Waveform Type
  if (waveformTypeEl) {
    const value = waveformTypeEl.value;
    if (value === 'sawtooth' || value === 'pulse') {
      waveformType = value;
    }
  }
  
  // Duty Ratio: 0-100の範囲で検証
  const dutyRatioValue = readNumericParameter('dutyRatio', (value) => value >= 0 && value <= 100);
  if (dutyRatioValue !== null) {
    dutyRatio = dutyRatioValue;
  }
  
  // Save settings to localStorage
  saveSettings(getCurrentSettings());
}

/**
 * セント値を周波数比に変換
 * @param cents - セント値
 * @returns 周波数比
 */
function centsToRatio(cents: number): number {
  return Math.pow(2, cents / 1200);
}

/**
 * マウス位置をフィルタパラメータにマッピング
 */
function getFilterParams(): { cutoff: number; q: number } {
  // X軸: カットオフ周波数 20Hz - cutoffMax
  const cutoff = 20 + mouseX * (cutoffMax - 20);
  // Y軸: Q値 0.5 - qMax (反転: 上端=高Q, 下端=低Q)
  const q = 0.5 + (1 - mouseY) * (qMax - 0.5);
  return { cutoff, q };
}

/**
 * LPFとカットオフ減衰を適用してオーディオをレンダリング (TypeScript実装)
 * @returns 生成されたオーディオサンプルと生成時間(ms)
 */
function renderAudioTypeScript(): { samples: Float32Array; generationTimeMs: number } {
  const startTime = performance.now();
  
  const duration = getDuration();
  
  // 選択された波形を生成
  const samples = waveformType === 'pulse'
    ? generatePulse(FREQUENCY, SAMPLE_RATE, duration, dutyRatio)
    : generateSawtooth(FREQUENCY, SAMPLE_RATE, duration);
  
  // フィルタを作成
  const filter = new BiquadLPF(SAMPLE_RATE);
  const { cutoff: initialCutoff, q } = getFilterParams();
  
  // カットオフ減衰を適用して各サンプルを処理
  const numSamples = samples.length;
  const output = new Float32Array(numSamples);
  
  // フィルタ係数を低頻度で更新(約1ms間隔)
  // 減衰が比較的緩やかなため、サンプル毎の更新より効率的
  const updateIntervalMs = 1;
  const samplesPerUpdate = Math.max(1, Math.floor(SAMPLE_RATE * (updateIntervalMs / 1000)));
  
  let currentCutoff = initialCutoff;
  
  for (let i = 0; i < numSamples; i++) {
    // samplesPerUpdateサンプル毎に係数を再計算
    if (i % samplesPerUpdate === 0) {
      // このサンプル位置での時間(ms)を計算
      const timeMs = (i / SAMPLE_RATE) * 1000;
      
      // 減衰単位とレートに基づいてカットオフを減衰
      if (decayUnit === 'Hz') {
        // Hz減衰: 1msあたりdecayRate Hz、最小1Hz
        currentCutoff = Math.max(1, initialCutoff - timeMs * decayRate);
      } else {
        // Cent減衰: 1msあたりdecayRate cent
        // 減衰の上限を設定して、理論的なカットオフが1Hz未満にならないようにする
        const maxCentsDecay = 1200 * Math.log2(initialCutoff);
        const totalCentsDecay = Math.min(timeMs * decayRate, maxCentsDecay);
        const ratio = centsToRatio(-totalCentsDecay); // 減衰なので負の値
        currentCutoff = Math.max(1, initialCutoff * ratio);
      }
      
      // この制御レートでフィルタ係数を更新
      filter.setCoefficients(currentCutoff, q);
    }
    
    // 現在のフィルタ係数でサンプルを処理
    output[i] = filter.processSample(samples[i]);
  }
  
  const endTime = performance.now();
  const generationTimeMs = endTime - startTime;
  
  return { samples: output, generationTimeMs };
}

/**
 * LPFとカットオフ減衰を適用してオーディオをレンダリング
 * @returns 生成されたオーディオサンプルと生成時間(ms)
 */
function renderAudio(): { samples: Float32Array; generationTimeMs: number } {
  if (processorType === 'wasm') {
    // WASM実装を使用
    if (!isWasmInitialized()) {
      console.warn('WASM not initialized, falling back to TypeScript');
      return renderAudioTypeScript();
    }
    
    const duration = getDuration();
    const { cutoff: initialCutoff, q } = getFilterParams();
    
    try {
      return renderAudioWasm(
        waveformType,
        FREQUENCY,
        SAMPLE_RATE,
        duration,
        dutyRatio,
        initialCutoff,
        q,
        decayUnit,
        decayRate,
      );
    } catch (error) {
      console.error('WASM rendering failed, falling back to TypeScript:', error);
      return renderAudioTypeScript();
    }
  } else {
    // TypeScript実装を使用
    return renderAudioTypeScript();
  }
}

/**
 * Generate and play audio
 */
async function playAudio(): Promise<void> {
  // Ensure Tone is loaded
  if (!Tone) {
    console.warn('Tone.js not loaded yet');
    return;
  }
  
  // Render audio
  const { samples, generationTimeMs } = renderAudio();
  
  // Generate WAV
  const wavData = generateWav(samples, SAMPLE_RATE);
  const wavUrl = createWavBlobUrl(wavData);
  
  // Stop previous player if exists
  if (currentPlayer) {
    try {
      currentPlayer.stop();
      currentPlayer.dispose();
    } catch (error) {
      // Log errors instead of silently ignoring them
      console.warn('Failed to stop or dispose previous player:', error);
    }
  }
  
  // Create and play new player
  currentPlayer = new Tone.Player(wavUrl).toDestination();
  await Tone.loaded();
  currentPlayer.start();
  
  // Update generation time display
  updateGenerationTimeDisplay(generationTimeMs);
  
  // Clean up URL after playback (match duration)
  setTimeout(() => {
    URL.revokeObjectURL(wavUrl);
  }, getDuration() * 1000);
}

/**
 * UIフィールドを現在の設定値で更新
 */
function updateUIFields(): void {
  const bpmEl = document.getElementById('bpm') as HTMLTextAreaElement | null;
  const beatEl = document.getElementById('beat') as HTMLTextAreaElement | null;
  const qMaxEl = document.getElementById('qMax') as HTMLTextAreaElement | null;
  const cutoffMaxEl = document.getElementById('cutoffMax') as HTMLTextAreaElement | null;
  const decayUnitEl = document.getElementById('decayUnit') as HTMLSelectElement | null;
  const decayRateEl = document.getElementById('decayRate') as HTMLTextAreaElement | null;
  const waveformTypeEl = document.getElementById('waveformType') as HTMLSelectElement | null;
  const dutyRatioEl = document.getElementById('dutyRatio') as HTMLTextAreaElement | null;
  const processorEl = document.getElementById('processor') as HTMLSelectElement | null;
  
  if (bpmEl) bpmEl.value = String(bpm);
  if (beatEl) beatEl.value = String(beat);
  if (qMaxEl) qMaxEl.value = String(qMax);
  if (cutoffMaxEl) cutoffMaxEl.value = String(cutoffMax);
  if (decayUnitEl) decayUnitEl.value = decayUnit;
  if (decayRateEl) decayRateEl.value = String(decayRate);
  if (waveformTypeEl) waveformTypeEl.value = waveformType;
  if (dutyRatioEl) dutyRatioEl.value = String(dutyRatio);
  if (processorEl) processorEl.value = processorType;
}

/**
 * シンセサイザーを初期化
 */
export async function init(): Promise<void> {
  // Initialize WASM module early (but don't block on it)
  initWasm().catch((error) => {
    console.error('Failed to initialize WASM module:', error);
    
    // Provide UI feedback when WASM initialization fails
    const processorSelect = document.getElementById('processor') as HTMLSelectElement | null;
    if (processorSelect) {
      // Disable WASM option
      const wasmOption = Array.from(processorSelect.options).find(
        (option) => option.value === 'wasm',
      );
      if (wasmOption) {
        wasmOption.disabled = true;
        wasmOption.text = 'Rust WASM (unavailable)';
      }
      // If WASM is currently selected, fall back to TypeScript
      if (processorSelect.value === 'wasm') {
        processorSelect.value = 'typescript';
        processorType = 'typescript';
      }
    }
  });
  
  // マウス位置を追跡
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    // 表示を更新
    const cutoff = Math.round(20 + mouseX * (cutoffMax - 20));
    const q = (0.5 + (1 - mouseY) * (qMax - 0.5)).toFixed(2);
    
    const display = document.getElementById('params');
    if (display) {
      display.textContent = `Cutoff: ${cutoff}Hz | Q: ${q}`;
    }
  });
  
  // パラメータ変更のための入力イベントリスナーを追加(デバウンス処理)
  let inputDebounceTimer: number | null = null;
  const handleInputChange = () => {
    if (inputDebounceTimer !== null) {
      clearTimeout(inputDebounceTimer);
    }
    inputDebounceTimer = window.setTimeout(() => {
      readParameters();
      updateUIFields(); // 検証された値でUIを更新し、無効な入力との不一致を防ぐ
      updateStatusDisplay();
      
      // パラメータ変更時に既存の再生スケジュールをキャンセルして再スケジュール
      if (isPlaybackLoopStarted && playbackTimeoutId !== null) {
        clearTimeout(playbackTimeoutId);
        const duration = getDuration();
        playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
      }
    }, 150);
  };
  
  const inputs = ['bpm', 'beat', 'qMax', 'cutoffMax', 'decayUnit', 'decayRate', 'waveformType', 'dutyRatio', 'processor'];
  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', handleInputChange);
    }
  });
  
  // UIフィールドを保存済み設定で初期化
  updateUIFields();
  
  // パラメータの初期読み込み
  readParameters();
  updateStatusDisplay();
  
  // Export settings button handler
  const exportBtn = document.getElementById('exportSettings');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      exportSettingsToFile(getCurrentSettings());
    });
  }
  
  // Import settings button handler
  const importBtn = document.getElementById('importSettings');
  if (importBtn) {
    importBtn.addEventListener('click', async () => {
      const importedSettings = await importSettingsFromFile();
      
      if (!importedSettings) {
        // User cancelled or error occurred
        const statusEl = document.getElementById('status');
        if (statusEl) {
          const originalText = statusEl.textContent;
          statusEl.textContent = '設定のインポートに失敗しました。ファイル形式を確認してください。';
          setTimeout(() => {
            if (statusEl.textContent?.includes('インポートに失敗')) {
              statusEl.textContent = originalText;
            }
          }, 3000);
        }
        return;
      }
      
      // Update state
      bpm = importedSettings.bpm;
      beat = importedSettings.beat;
      qMax = importedSettings.qMax;
      cutoffMax = importedSettings.cutoffMax;
      decayUnit = importedSettings.decayUnit;
      decayRate = importedSettings.decayRate;
      waveformType = importedSettings.waveformType;
      dutyRatio = importedSettings.dutyRatio;
      processorType = importedSettings.processorType;
      
      // Update UI
      updateUIFields();
      updateStatusDisplay();
      
      // Save to localStorage
      saveSettings(importedSettings);
      
      // Show success feedback
      const statusEl = document.getElementById('status');
      if (statusEl) {
        const originalText = statusEl.textContent;
        statusEl.textContent = '設定をインポートしました。';
        setTimeout(() => {
          if (statusEl.textContent?.includes('インポートしました')) {
            statusEl.textContent = originalText;
          }
        }, 3000);
      }
      
      // Reschedule playback if already playing
      if (isPlaybackLoopStarted && playbackTimeoutId !== null) {
        clearTimeout(playbackTimeoutId);
        const duration = getDuration();
        playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
      }
    });
  }
  
  // 計算された再生周期に基づいてオーディオを再生(再帰的setTimeoutでエラーハンドリング)
  function scheduleNextPlay() {
    if (Tone && Tone.context.state === 'running') {
      playAudio().catch((error: unknown) => {
        console.error('Error while playing audio:', error);
      });
    }
    const duration = getDuration();
    playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
  }
  
  // Click handler for starting audio
  const handleClick = async (event: Event) => {
    // For touch events, prevent the subsequent click event from firing.
    // This ensures handleClick is only called once per tap on touch devices.
    // Note: This may interfere with touch scrolling, but is necessary to prevent
    // duplicate audio context initialization on touch-enabled devices.
    if (event.type === 'touchstart') {
      event.preventDefault();
    }
    
    // Load Tone.js dynamically on first user interaction to comply with browser autoplay policies.
    // Dynamic import ensures AudioContext is only created after a user gesture.
    if (!Tone && !isToneLoading) {
      isToneLoading = true;
      toneLoadingPromise = (async () => {
        try {
          Tone = await import('tone') as typeof ToneTypes;
        } catch (error) {
          console.error('Failed to load Tone.js:', error);
          throw error;
        } finally {
          isToneLoading = false;
          toneLoadingPromise = null;
        }
      })();
    }
    
    // Wait for Tone.js to finish loading if another click initiated the load
    if (toneLoadingPromise) {
      try {
        await toneLoadingPromise;
      } catch (error) {
        return; // Loading failed
      }
    }
    
    if (!Tone) {
      return; // Failed to load
    }
    
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }
    
    // Start playback loop only once
    if (!isPlaybackLoopStarted) {
      isPlaybackLoopStarted = true;
      scheduleNextPlay();
    }
  };
  
  // Attach click listener only to document to avoid duplicate execution from event bubbling
  // Touch events use { passive: false } since preventDefault() is called in the handler
  document.addEventListener('click', handleClick);
  document.addEventListener('touchstart', handleClick, { passive: false });
}

/**
 * 現在の設定でステータス表示を更新
 */
function updateStatusDisplay(): void {
  const statusEl = document.getElementById('status');
  if (statusEl) {
    const duration = getDuration();
    statusEl.textContent = `New audio generated every ${(duration * 1000).toFixed(0)}ms (BPM: ${bpm}, Beat: ${beat})`;
  }
}

/**
 * 波形生成時間を表示
 * @param generationTimeMs - 生成時間(ミリ秒)
 */
function updateGenerationTimeDisplay(generationTimeMs: number): void {
  // この計測値を統計に追加
  addPerformanceSample(performanceStats, generationTimeMs);
  
  const genTimeEl = document.getElementById('generationTime');
  if (genTimeEl) {
    const processorName = processorType === 'wasm' ? 'Rust WASM' : 'TypeScript';
    const stats = calculatePerformanceStats(performanceStats);
    
    if (stats && stats.count > 1) {
      // 複数のサンプルがある場合は詳細な統計情報を表示
      const currentText = `Generation time (${processorName}): ${stats.current.toFixed(2)}ms`;
      const statsText = `[n=${stats.count}, min=${stats.min.toFixed(2)}ms, max=${stats.max.toFixed(2)}ms, avg=${stats.avg.toFixed(2)}ms]`;
      genTimeEl.textContent = `${currentText} ${statsText}`;
    } else {
      // 初回計測では単純表示
      genTimeEl.textContent = `Generation time (${processorName}): ${generationTimeMs.toFixed(2)}ms`;
    }
  }
}

/**
 * Stop the synthesizer and clean up resources
 */
export function dispose(): void {
  // Clear playback timeout
  if (playbackTimeoutId !== null) {
    clearTimeout(playbackTimeoutId);
    playbackTimeoutId = null;
  }
  
  // Reset playback loop flag
  isPlaybackLoopStarted = false;
  
  // Stop and dispose current player
  if (currentPlayer) {
    try {
      currentPlayer.stop();
      currentPlayer.dispose();
    } catch (error) {
      console.warn('Failed to dispose player during cleanup:', error);
    }
    currentPlayer = null;
  }
}
