import { generateWav, createWavBlobUrl } from './wav';
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
  type PerformanceStats,
} from './performance-stats';
import { calculateDuration } from './timing';
import {
  readParametersFromUI,
  updateUIFields,
  mapMouseToFilterParams,
  updateMousePositionDisplay,
  type MousePosition,
} from './ui-params';
import {
  loadTone,
  isToneLoaded,
  startAudioContext,
  isAudioContextRunning,
  playWavUrl,
  stopAndCleanup,
} from './audio-player';
import {
  type PlaybackMode,
  getCurrentMode,
  switchMode,
} from './playback-mode';
import {
  initOscilloscope,
  updateOscilloscope,
  isOscilloscopeInitialized,
} from './oscilloscope';

// Global storage for the most recently generated WAV
let lastGeneratedWavUrl: string | null = null;

const SAMPLE_RATE = 44100;
const FREQUENCY = 220; // 220Hz (A3)

// Mouse position state
let mousePosition: MousePosition = { x: 0.5, y: 0.5 };

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
let filterType: 'lpf' | 'hpf' | 'bpf' | 'notch' | 'apf' | 'lowshelf' | 'highshelf' = initialSettings.filterType;

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
    filterType,
  };
}

// Track playback timeout for cleanup
let playbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

// Track whether playback loop has started
let isPlaybackLoopStarted = false;

// Store reference to scheduleNextPlay function for mode switching
let scheduleNextPlayFn: (() => void) | null = null;

// パフォーマンス統計トラッキング
const performanceStats: PerformanceStats = createPerformanceStats(10);

// Error tracking to prevent console spam
let consecutiveErrorCount = 0;
const MAX_CONSECUTIVE_ERRORS = 3;
let oscilloscopeErrorLogged = false;
let lastErrorMessage = '';
let lastErrorTime = 0;
const ERROR_LOG_COOLDOWN_MS = 5000; // Only log same error once per 5 seconds

/**
 * Log error to console with deduplication to prevent spam
 * @param message - Error message to log
 * @param error - Optional error object
 * @returns true if error was logged, false if it was suppressed
 */
function logErrorOnce(message: string, error?: unknown): boolean {
  const now = Date.now();
  const errorString = `${message}${error ? `: ${String(error)}` : ''}`;
  
  // Check if this is the same error within cooldown period
  if (errorString === lastErrorMessage && (now - lastErrorTime) < ERROR_LOG_COOLDOWN_MS) {
    return false; // Suppress duplicate error
  }
  
  // Log the error
  console.error(message, error);
  lastErrorMessage = errorString;
  lastErrorTime = now;
  return true;
}

/**
 * Display oscilloscope error message to the user
 * @param message - Error message to display
 */
function displayOscilloscopeError(message: string): void {
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
  errorDiv.style.cssText = `
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    border-radius: 5px;
    padding: 0.5em;
    margin-top: 0.5em;
    font-size: 0.9em;
  `;
  errorDiv.textContent = message;

  container.appendChild(errorDiv);

  // Auto-remove error after 5 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

/**
 * UIからパラメータを読み込む
 */
function readParameters(): void {
  const newSettings = readParametersFromUI(getCurrentSettings());
  
  // Update state
  bpm = newSettings.bpm;
  beat = newSettings.beat;
  qMax = newSettings.qMax;
  cutoffMax = newSettings.cutoffMax;
  decayUnit = newSettings.decayUnit;
  decayRate = newSettings.decayRate;
  waveformType = newSettings.waveformType;
  dutyRatio = newSettings.dutyRatio;
  filterType = newSettings.filterType;
  
  // Save settings to localStorage
  saveSettings(newSettings);
}

/**
 * LPFとカットオフ減衰を適用してオーディオをレンダリング (Rust WASM使用)
 * @returns 生成されたオーディオサンプルと生成時間(ms)
 */
function renderAudio(): { samples: Float32Array; generationTimeMs: number } {
  if (!isWasmInitialized()) {
    throw new Error('WASM module not initialized. Please wait for initialization to complete.');
  }
  
  const duration = calculateDuration(bpm, beat);
  const { cutoff: initialCutoff, q } = mapMouseToFilterParams(mousePosition, cutoffMax, qMax);
  
  return renderAudioWasm(
    waveformType,
    FREQUENCY,
    SAMPLE_RATE,
    duration,
    dutyRatio,
    filterType,
    initialCutoff,
    q,
    decayUnit,
    decayRate,
  );
}

/**
 * Generate and play audio (WAV mode)
 */
async function playAudioWav(): Promise<void> {
  // Ensure Tone is loaded
  if (!isToneLoaded()) {
    console.warn('Tone.js not loaded yet');
    return;
  }
  
  // Render audio
  const { samples, generationTimeMs } = renderAudio();
  
  // Update oscilloscope visualization with generated samples (non-blocking)
  // We don't await this to prevent delaying audio playback
  if (isOscilloscopeInitialized()) {
    updateOscilloscope(samples, SAMPLE_RATE).catch((error) => {
      // Only log oscilloscope errors once to prevent console spam
      if (!oscilloscopeErrorLogged) {
        console.error('Failed to update oscilloscope:', error);
        // Display error to user
        displayOscilloscopeError('Visualization update failed. The oscilloscope may not be functioning correctly.');
        oscilloscopeErrorLogged = true;
      }
    });
  }
  
  // Generate WAV
  const wavData = generateWav(samples, SAMPLE_RATE);
  const wavUrl = createWavBlobUrl(wavData);
  
  // Store the generated WAV URL for seq mode
  // Revoke the previous URL to prevent memory leaks
  if (lastGeneratedWavUrl) {
    URL.revokeObjectURL(lastGeneratedWavUrl);
  }
  lastGeneratedWavUrl = wavUrl;
  
  // Play audio
  await playWavUrl(wavUrl);
  
  // Update generation time display
  updateGenerationTimeDisplay(generationTimeMs);
}

/**
 * Play audio using stored WAV (Seq mode)
 */
async function playAudioSeq(): Promise<void> {
  // Ensure Tone is loaded
  if (!isToneLoaded()) {
    console.warn('Tone.js not loaded yet');
    return;
  }
  
  // Check if we have a stored WAV
  if (!lastGeneratedWavUrl) {
    console.warn('No WAV stored yet. Generate audio first.');
    
    // Provide user-visible feedback so it's clear why Seq mode did not play audio
    const genTimeEl = document.getElementById('generationTime');
    if (genTimeEl) {
      genTimeEl.textContent =
        'WAVが生成されていません。まずWAV Generation Modeでオーディオを生成してください。';
    }
    return;
  }
  
  // Play stored WAV
  await playWavUrl(lastGeneratedWavUrl);
  
  // Clear generation time display for seq mode
  const genTimeEl = document.getElementById('generationTime');
  if (genTimeEl) {
    genTimeEl.textContent = 'Generation time: N/A (Seq mode - playing stored WAV)';
  }
}

/**
 * Play audio based on current mode
 */
async function playAudio(): Promise<void> {
  const mode = getCurrentMode();
  if (mode === 'wav') {
    await playAudioWav();
  } else {
    await playAudioSeq();
  }
}

/**
 * WAVモードとSeqモード間を切り替える
 * @param mode - 切り替え先のモード ('wav' または 'seq')
 * @returns Promise<void>
 * 
 * 動作:
 * - タブのUI状態（active class、ARIA属性）を更新
 * - 再生中の場合は適切な間隔で再生スケジュールを再設定
 * - ステータス表示を更新
 */
async function handleModeSwitch(mode: PlaybackMode): Promise<void> {
  await switchMode(mode, () => {
    // Reset error tracking when switching modes
    consecutiveErrorCount = 0;
    
    // Reschedule playback with appropriate interval
    if (isPlaybackLoopStarted && playbackTimeoutId !== null && scheduleNextPlayFn) {
      clearTimeout(playbackTimeoutId);
      scheduleNextPlayFn();
    } else if (isPlaybackLoopStarted) {
      // Log warning if playback loop is started but scheduling function is unavailable
      console.warn('Playback loop is started but scheduling function is not available');
    }
    
    // Update status display
    updateStatusDisplay();
  });
}

/**
 * シンセサイザーを初期化
 */
export async function init(): Promise<void> {
  // Initialize WASM module - required for all audio processing
  await initWasm().catch((error) => {
    console.error('Failed to initialize WASM module:', error);
    
    // WASM初期化エラーをユーザーに分かりやすく通知
    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent =
        'シンセサイザーの初期化に失敗しました。ページを再読み込みしてください。';
    }
    
    throw new Error('WASM initialization failed. The synthesizer cannot run without Rust WASM module.');
  });
  
  // Initialize oscilloscope
  const canvas = document.getElementById('oscilloscope') as HTMLCanvasElement | null;
  if (canvas) {
    try {
      initOscilloscope(canvas);
    } catch (error) {
      console.error('Failed to initialize oscilloscope:', error);
      displayOscilloscopeError(
        'Failed to initialize waveform visualization. The oscilloscope feature will not be available.'
      );
    }
  } else {
    console.error(
      'Oscilloscope canvas element not found. Expected element with id="oscilloscope". ' +
      'Waveform visualization will not be available.'
    );
  }
  
  // マウス位置を追跡
  document.addEventListener('mousemove', (e) => {
    mousePosition = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
    
    // 表示を更新
    updateMousePositionDisplay(mousePosition, cutoffMax, qMax);
  });
  
  // パラメータ変更のための入力イベントリスナーを追加(デバウンス処理)
  let inputDebounceTimer: number | null = null;
  const handleInputChange = () => {
    if (inputDebounceTimer !== null) {
      clearTimeout(inputDebounceTimer);
    }
    inputDebounceTimer = window.setTimeout(() => {
      readParameters();
      updateUIFields(getCurrentSettings()); // 検証された値でUIを更新し、無効な入力との不一致を防ぐ
      updateStatusDisplay();
      
      // パラメータ変更時に既存の再生スケジュールをキャンセルして再スケジュール
      if (isPlaybackLoopStarted && playbackTimeoutId !== null) {
        clearTimeout(playbackTimeoutId);
        const duration = calculateDuration(bpm, beat);
        playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
      }
    }, 150);
  };
  
  const inputs = ['bpm', 'beat', 'qMax', 'cutoffMax', 'decayUnit', 'decayRate', 'waveformType', 'dutyRatio', 'filterType'];
  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', handleInputChange);
    }
  });
  
  // UIフィールドを保存済み設定で初期化
  updateUIFields(getCurrentSettings());
  
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
      filterType = importedSettings.filterType;
      
      // Update UI
      updateUIFields(importedSettings);
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
        const duration = calculateDuration(bpm, beat);
        playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
      }
    });
  }
  
  // Tab switching handlers
  const tabWav = document.getElementById('tabWav');
  const tabSeq = document.getElementById('tabSeq');
  
  if (tabWav) {
    tabWav.addEventListener('click', async () => {
      await handleModeSwitch('wav');
    });
  }
  
  if (tabSeq) {
    tabSeq.addEventListener('click', async () => {
      await handleModeSwitch('seq');
    });
  }
  
  // 計算された再生周期に基づいてオーディオを再生(再帰的setTimeoutでエラーハンドリング)
  function scheduleNextPlay() {
    // Check if we've hit the error limit
    if (consecutiveErrorCount >= MAX_CONSECUTIVE_ERRORS) {
      console.error(
        `Playback stopped after ${MAX_CONSECUTIVE_ERRORS} consecutive errors. ` +
        'Please check the console for details and reload the page to try again.'
      );
      isPlaybackLoopStarted = false;
      
      // Display user-friendly error message
      const statusEl = document.getElementById('status');
      if (statusEl) {
        statusEl.textContent = 
          '再生中にエラーが発生したため、自動再生を停止しました。ページを再読み込みしてください。';
      }
      return; // Stop the loop
    }
    
    if (isAudioContextRunning()) {
      playAudio()
        .then(() => {
          // Reset error count on successful playback
          consecutiveErrorCount = 0;
        })
        .catch((error: unknown) => {
          consecutiveErrorCount++;
          
          // Use deduplication when logging errors
          const errorLogged = logErrorOnce('Error while playing audio', error);
          
          // If this is a new error that was logged, show additional context
          if (errorLogged && consecutiveErrorCount > 1) {
            console.warn(
              `Consecutive error count: ${consecutiveErrorCount}/${MAX_CONSECUTIVE_ERRORS}. ` +
              `Playback will stop if errors persist.`
            );
          }
        });
    }
    
    // Only schedule next play if we haven't hit the error limit
    if (consecutiveErrorCount < MAX_CONSECUTIVE_ERRORS) {
      // Use 1 second interval for seq mode, otherwise use calculated duration
      const mode = getCurrentMode();
      const interval = mode === 'seq' ? 1000 : calculateDuration(bpm, beat) * 1000;
      playbackTimeoutId = setTimeout(scheduleNextPlay, interval);
    }
  }
  
  // Store reference for mode switching
  scheduleNextPlayFn = scheduleNextPlay;
  
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
    if (!isToneLoaded()) {
      await loadTone();
    }
    
    if (!isToneLoaded()) {
      return; // Failed to load
    }
    
    await startAudioContext();
    
    // Start playback loop only once
    if (!isPlaybackLoopStarted) {
      isPlaybackLoopStarted = true;
      consecutiveErrorCount = 0; // Reset error count when starting playback
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
 */
function updateGenerationTimeDisplay(generationTimeMs: number): void {
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
  stopAndCleanup();
  
  // Clean up stored WAV URL
  if (lastGeneratedWavUrl) {
    URL.revokeObjectURL(lastGeneratedWavUrl);
    lastGeneratedWavUrl = null;
  }
}
