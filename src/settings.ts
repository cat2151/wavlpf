/**
 * Settings management module for local storage and JSON import/export
 */

const STORAGE_KEY = 'wavlpf-settings';

/**
 * アプリケーション設定の型定義
 */
export interface Settings {
  bpm: number;
  beat: number;
  qMax: number;
  cutoffMax: number;
  decayUnit: 'Hz' | 'Cent';
  decayRate: number;
  waveformType: 'sawtooth' | 'pulse';
  dutyRatio: number;
  processorType: 'typescript' | 'wasm';
}

/**
 * デフォルト設定値
 */
export const defaultSettings: Settings = {
  bpm: 120,
  beat: 8,
  qMax: 16,
  cutoffMax: 4000,
  decayUnit: 'Hz',
  decayRate: 1,
  waveformType: 'sawtooth',
  dutyRatio: 50,
  processorType: 'typescript',
};

/**
 * 設定値のバリデーション
 */
export function validateSettings(settings: Partial<Settings>): Settings {
  return {
    bpm: typeof settings.bpm === 'number' && settings.bpm >= 30 && settings.bpm <= 300
      ? settings.bpm
      : defaultSettings.bpm,
    beat: typeof settings.beat === 'number' && settings.beat >= 1 && settings.beat <= 32
      ? settings.beat
      : defaultSettings.beat,
    qMax: typeof settings.qMax === 'number' && settings.qMax >= 0.5 && settings.qMax <= 50
      ? settings.qMax
      : defaultSettings.qMax,
    cutoffMax: typeof settings.cutoffMax === 'number' && settings.cutoffMax >= 20 && settings.cutoffMax <= 20000
      ? settings.cutoffMax
      : defaultSettings.cutoffMax,
    decayUnit: settings.decayUnit === 'Hz' || settings.decayUnit === 'Cent'
      ? settings.decayUnit
      : defaultSettings.decayUnit,
    decayRate: typeof settings.decayRate === 'number' && settings.decayRate >= 0.01 && settings.decayRate <= 1000
      ? settings.decayRate
      : defaultSettings.decayRate,
    waveformType: settings.waveformType === 'sawtooth' || settings.waveformType === 'pulse'
      ? settings.waveformType
      : defaultSettings.waveformType,
    dutyRatio: typeof settings.dutyRatio === 'number' && settings.dutyRatio >= 0 && settings.dutyRatio <= 100
      ? settings.dutyRatio
      : defaultSettings.dutyRatio,
    processorType: settings.processorType === 'typescript' || settings.processorType === 'wasm'
      ? settings.processorType
      : defaultSettings.processorType,
  };
}

/**
 * Local Storageから設定を読み込む
 */
export function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return validateSettings(parsed);
    }
  } catch (error) {
    console.warn('Failed to load settings from localStorage:', error);
  }
  return defaultSettings;
}

/**
 * Local Storageに設定を保存
 */
export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings to localStorage:', error);
  }
}

/**
 * 設定をJSONファイルとしてエクスポート
 */
export function exportSettingsToFile(settings: Settings): void {
  const json = JSON.stringify(settings, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `wavlpf-settings-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * JSONファイルから設定をインポート
 */
export function importSettingsFromFile(): Promise<Settings | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null); // User cancelled
        // Clean up input element
        if (input.parentNode) {
          input.parentNode.removeChild(input);
        }
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          const parsed = JSON.parse(text);
          const validated = validateSettings(parsed);
          resolve(validated);
        } catch (error) {
          resolve(null); // Parse error
        } finally {
          // Remove input from DOM after reading
          if (input.parentNode) {
            input.parentNode.removeChild(input);
          }
        }
      };
      reader.onerror = () => {
        resolve(null); // Read error
        // Clean up input element on error
        if (input.parentNode) {
          input.parentNode.removeChild(input);
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  });
}
