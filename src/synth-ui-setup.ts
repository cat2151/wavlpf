import { importSettingsFromFile, exportSettingsToFile, type Settings } from './settings';
import { type PlaybackMode } from './playback-mode';

/**
 * Export settings ボタンのイベントハンドラを設定
 */
export function setupExportSettingsButton(getCurrentSettings: () => Settings): void {
  const exportBtn = document.getElementById('exportSettings');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      exportSettingsToFile(getCurrentSettings());
    });
  }
}

/**
 * Import settings ボタンのイベントハンドラを設定
 * @param onImport - 設定が正常にインポートされた後に呼ばれるコールバック
 * @param onReschedule - インポート後に再生スケジュールを更新するコールバック
 */
export function setupImportSettingsButton(
  onImport: (settings: Settings) => void,
  onReschedule: () => void,
): void {
  const importBtn = document.getElementById('importSettings');
  if (!importBtn) return;

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

    onImport(importedSettings);

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

    onReschedule();
  });
}

/**
 * WAV/Seq モード切り替えタブのイベントハンドラを設定
 */
export function setupTabHandlers(
  handleModeSwitch: (mode: PlaybackMode) => Promise<void>,
): void {
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
}

/**
 * マウス位置トラッキングと入力変更ハンドラを設定
 * @param onMouseMove - マウス移動時に正規化(0-1)されたx/y座標を受け取るコールバック
 * @param onInputChange - 入力変更時(デバウンス後)に呼ばれるコールバック
 */
export function setupMouseAndInputHandlers(
  onMouseMove: (x: number, y: number) => void,
  onInputChange: () => void,
): void {
  document.addEventListener('mousemove', (e) => {
    onMouseMove(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  });

  let inputDebounceTimer: number | null = null;
  const handleInputChange = () => {
    if (inputDebounceTimer !== null) {
      clearTimeout(inputDebounceTimer);
    }
    inputDebounceTimer = window.setTimeout(() => {
      onInputChange();
    }, 150);
  };

  const inputs = ['bpm', 'beat', 'qMax', 'cutoffMax', 'decayUnit', 'decayRate', 'waveformType', 'dutyRatio', 'filterType'];
  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', handleInputChange);
    }
  });
}
