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
    decayRate: typeof settings.decayRate === 'number' && settings.decayRate >= 0.01
      ? settings.decayRate
      : defaultSettings.decayRate,
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
export function importSettingsFromFile(): Promise<Settings> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
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
          reject(new Error('Failed to parse settings file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    };
    
    input.click();
  });
}
