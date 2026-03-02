import { generateWav, createWavBlobUrl } from './wav';
import {
  Settings,
  loadSettings,
  saveSettings,
} from './settings';
import { initWasm, isWasmInitialized, renderAudioWasm } from './wasmAudio';
import {
  createPerformanceStats,
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
  getTone,
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
import {
  initRealtimeAnalysis,
  startRealtimeVisualization,
  stopRealtimeVisualization,
  isRealtimeAnalysisInitialized,
  disposeRealtimeAnalysis,
} from './realtime-analysis';
import {
  initFullWaveformDisplay,
  drawFullWaveform,
  clearFullWaveform,
  isFullWaveformDisplayInitialized,
} from './full-waveform-display';
import {
  displayOscilloscopeError,
  updateStatusDisplay,
  updateGenerationTimeDisplay,
} from './synth-display';
import {
  setupExportSettingsButton,
  setupImportSettingsButton,
  setupTabHandlers,
  setupMouseAndInputHandlers,
} from './synth-ui-setup';

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

// Track if oscilloscope error has been displayed to avoid repeated UI notifications
let hasShownOscilloscopeError = false;

// Store reference to scheduleNextPlay function for mode switching
let scheduleNextPlayFn: (() => void) | null = null;

// パフォーマンス統計トラッキング
const performanceStats: PerformanceStats = createPerformanceStats(10);

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
      // Only log and display error once to prevent console spam
      if (!hasShownOscilloscopeError) {
        hasShownOscilloscopeError = true;
        console.error('Failed to update oscilloscope:', error);
        // Display error to user
        displayOscilloscopeError('Visualization update failed. The oscilloscope may not be functioning correctly.');
      }
    });
  }

  // Update full waveform display with rendered samples
  if (isFullWaveformDisplayInitialized()) {
    drawFullWaveform(samples, SAMPLE_RATE);
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
  updateGenerationTimeDisplay(generationTimeMs, performanceStats);
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
    // Reschedule playback with appropriate interval
    if (isPlaybackLoopStarted && playbackTimeoutId !== null && scheduleNextPlayFn) {
      clearTimeout(playbackTimeoutId);
      scheduleNextPlayFn();
    } else if (isPlaybackLoopStarted) {
      // Log warning if playback loop is started but scheduling function is unavailable
      console.warn('Playback loop is started but scheduling function is not available');
    }
    
    // Update status display
    updateStatusDisplay(bpm, beat);
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

  // Initialize full waveform display
  const fullWaveformCanvas = document.getElementById('fullWaveformCanvas') as HTMLCanvasElement | null;
  if (fullWaveformCanvas) {
    try {
      initFullWaveformDisplay(fullWaveformCanvas);
    } catch (error) {
      console.error('Failed to initialize full waveform display:', error);
    }
  } else {
    console.warn('Full waveform canvas element not found. Full waveform display will not be available.');
  }

  // マウス位置を追跡 + 入力変更ハンドラを設定
  setupMouseAndInputHandlers(
    (x, y) => {
      mousePosition = { x, y };
      updateMousePositionDisplay(mousePosition, cutoffMax, qMax);
    },
    () => {
      readParameters();
      updateUIFields(getCurrentSettings()); // 検証された値でUIを更新し、無効な入力との不一致を防ぐ
      updateStatusDisplay(bpm, beat);

      // パラメータ変更時に既存の再生スケジュールをキャンセルして再スケジュール
      if (isPlaybackLoopStarted && playbackTimeoutId !== null) {
        clearTimeout(playbackTimeoutId);
        const duration = calculateDuration(bpm, beat);
        playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
      }
    },
  );

  // UIフィールドを保存済み設定で初期化
  updateUIFields(getCurrentSettings());
  
  // パラメータの初期読み込み
  readParameters();
  updateStatusDisplay(bpm, beat);
  
  // Export settings button handler
  setupExportSettingsButton(getCurrentSettings);
  
  // Import settings button handler
  setupImportSettingsButton(
    (importedSettings) => {
      bpm = importedSettings.bpm;
      beat = importedSettings.beat;
      qMax = importedSettings.qMax;
      cutoffMax = importedSettings.cutoffMax;
      decayUnit = importedSettings.decayUnit;
      decayRate = importedSettings.decayRate;
      waveformType = importedSettings.waveformType;
      dutyRatio = importedSettings.dutyRatio;
      filterType = importedSettings.filterType;
      updateUIFields(importedSettings);
      updateStatusDisplay(bpm, beat);
      saveSettings(importedSettings);
    },
    () => {
      if (isPlaybackLoopStarted && playbackTimeoutId !== null) {
        clearTimeout(playbackTimeoutId);
        const duration = calculateDuration(bpm, beat);
        playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
      }
    },
  );
  
  // Tab switching handlers
  setupTabHandlers(handleModeSwitch);
  
  // 計算された再生周期に基づいてオーディオを再生(再帰的setTimeoutでエラーハンドリング)
  function scheduleNextPlay() {
    if (isAudioContextRunning()) {
      playAudio().catch((error: unknown) => {
        console.error('Error while playing audio:', error);
      });
    }
    // Use 1 second interval for seq mode, otherwise use calculated duration
    const mode = getCurrentMode();
    const interval = mode === 'seq' ? 1000 : calculateDuration(bpm, beat) * 1000;
    playbackTimeoutId = setTimeout(scheduleNextPlay, interval);
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

    // Initialize real-time analysis after Tone.js is loaded and AudioContext is started
    if (!isRealtimeAnalysisInitialized()) {
      const Tone = getTone();
      if (Tone) {
        const fftCanvas = document.getElementById('fftCanvas') as HTMLCanvasElement | null;
        const realtimeWaveformCanvas = document.getElementById('realtimeWaveformCanvas') as HTMLCanvasElement | null;

        if (fftCanvas && realtimeWaveformCanvas) {
          try {
            initRealtimeAnalysis(Tone, fftCanvas, realtimeWaveformCanvas);
            startRealtimeVisualization();
          } catch (error) {
            console.error('Failed to initialize real-time analysis:', error);
          }
        } else {
          console.warn('Real-time analysis canvas elements not found');
        }
      }
    } else {
      // If already initialized, just start visualization
      startRealtimeVisualization();
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

  // Clean up real-time analysis
  stopRealtimeVisualization();
  disposeRealtimeAnalysis();

  // Clear full waveform display
  clearFullWaveform();

  // Clean up stored WAV URL
  if (lastGeneratedWavUrl) {
    URL.revokeObjectURL(lastGeneratedWavUrl);
    lastGeneratedWavUrl = null;
  }
}
