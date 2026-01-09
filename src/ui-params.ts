/**
 * UIパラメータの読み書きとマウストラッキングを管理するモジュール
 */

import type { Settings } from './settings';

/**
 * マウス位置の状態
 */
export interface MousePosition {
  x: number;
  y: number;
}

/**
 * フィルタパラメータ
 */
export interface FilterParams {
  cutoff: number;
  q: number;
}

/**
 * textareaから数値パラメータを読み込んで検証
 * @param id - 要素のID
 * @param validator - 検証関数
 * @returns 検証済みの値、または検証失敗時はnull
 */
export function readNumericParameter(
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
 * @param currentSettings - 現在の設定（検証失敗時のフォールバック用）
 * @returns 読み込んだ設定
 */
export function readParametersFromUI(currentSettings: Settings): Settings {
  const decayUnitEl = document.getElementById('decayUnit') as HTMLSelectElement | null;
  const waveformTypeEl = document.getElementById('waveformType') as HTMLSelectElement | null;
  const filterTypeEl = document.getElementById('filterType') as HTMLSelectElement | null;
  
  const result = { ...currentSettings };
  
  // BPM: 30-300の範囲で検証
  const bpmValue = readNumericParameter('bpm', (value) => value >= 30 && value <= 300);
  if (bpmValue !== null) {
    result.bpm = bpmValue;
  }
  
  // Beat: 1-32の範囲で検証
  const beatValue = readNumericParameter('beat', (value) => value >= 1 && value <= 32);
  if (beatValue !== null) {
    result.beat = beatValue;
  }
  
  // Q Max: 0.5-50の範囲で検証
  const qMaxValue = readNumericParameter('qMax', (value) => value >= 0.5 && value <= 50);
  if (qMaxValue !== null) {
    result.qMax = qMaxValue;
  }
  
  // Cutoff Max: 20-20000Hzの範囲で検証
  const cutoffMaxValue = readNumericParameter('cutoffMax', (value) => value >= 20 && value <= 20000);
  if (cutoffMaxValue !== null) {
    result.cutoffMax = cutoffMaxValue;
  }
  
  // Decay Unit
  if (decayUnitEl) {
    const value = decayUnitEl.value;
    if (value === 'Hz' || value === 'Cent') {
      result.decayUnit = value;
    }
  }
  
  // Decay Rate: 0.01以上で検証
  // Note: UI上では0入力は無効として扱われ、0.01が最小値となります
  const decayRateValue = readNumericParameter('decayRate', (value) => value >= 0.01);
  if (decayRateValue !== null) {
    result.decayRate = decayRateValue;
  }
  
  // Waveform Type
  if (waveformTypeEl) {
    const value = waveformTypeEl.value;
    if (value === 'sawtooth' || value === 'pulse') {
      result.waveformType = value;
    }
  }
  
  // Duty Ratio: 0-100の範囲で検証
  const dutyRatioValue = readNumericParameter('dutyRatio', (value) => value >= 0 && value <= 100);
  if (dutyRatioValue !== null) {
    result.dutyRatio = dutyRatioValue;
  }
  
  // Filter Type
  if (filterTypeEl) {
    const value = filterTypeEl.value;
    const validFilterTypes = ['lpf', 'hpf', 'bpf', 'notch', 'apf', 'lowshelf', 'highshelf'];
    if (validFilterTypes.includes(value)) {
      result.filterType = value as typeof result.filterType;
    }
  }
  
  return result;
}

/**
 * UIフィールドを設定値で更新
 * @param settings - 設定値
 */
export function updateUIFields(settings: Settings): void {
  const bpmEl = document.getElementById('bpm') as HTMLTextAreaElement | null;
  const beatEl = document.getElementById('beat') as HTMLTextAreaElement | null;
  const qMaxEl = document.getElementById('qMax') as HTMLTextAreaElement | null;
  const cutoffMaxEl = document.getElementById('cutoffMax') as HTMLTextAreaElement | null;
  const decayUnitEl = document.getElementById('decayUnit') as HTMLSelectElement | null;
  const decayRateEl = document.getElementById('decayRate') as HTMLTextAreaElement | null;
  const waveformTypeEl = document.getElementById('waveformType') as HTMLSelectElement | null;
  const dutyRatioEl = document.getElementById('dutyRatio') as HTMLTextAreaElement | null;
  const filterTypeEl = document.getElementById('filterType') as HTMLSelectElement | null;
  
  if (bpmEl) bpmEl.value = String(settings.bpm);
  if (beatEl) beatEl.value = String(settings.beat);
  if (qMaxEl) qMaxEl.value = String(settings.qMax);
  if (cutoffMaxEl) cutoffMaxEl.value = String(settings.cutoffMax);
  if (decayUnitEl) decayUnitEl.value = settings.decayUnit;
  if (decayRateEl) decayRateEl.value = String(settings.decayRate);
  if (waveformTypeEl) waveformTypeEl.value = settings.waveformType;
  if (dutyRatioEl) dutyRatioEl.value = String(settings.dutyRatio);
  if (filterTypeEl) filterTypeEl.value = settings.filterType;
}

/**
 * マウス位置をフィルタパラメータにマッピング
 * @param mousePos - マウス位置 (0-1の範囲)
 * @param cutoffMax - 最大カットオフ周波数
 * @param qMax - 最大Q値
 * @returns フィルタパラメータ
 */
export function mapMouseToFilterParams(
  mousePos: MousePosition,
  cutoffMax: number,
  qMax: number
): FilterParams {
  // X軸: カットオフ周波数 20Hz - cutoffMax
  const cutoff = 20 + mousePos.x * (cutoffMax - 20);
  // Y軸: Q値 0.5 - qMax (反転: 上端=高Q, 下端=低Q)
  const q = 0.5 + (1 - mousePos.y) * (qMax - 0.5);
  return { cutoff, q };
}

/**
 * マウス位置表示を更新
 * @param mousePos - マウス位置
 * @param cutoffMax - 最大カットオフ周波数
 * @param qMax - 最大Q値
 */
export function updateMousePositionDisplay(
  mousePos: MousePosition,
  cutoffMax: number,
  qMax: number
): void {
  const { cutoff, q } = mapMouseToFilterParams(mousePos, cutoffMax, qMax);
  const cutoffRounded = Math.round(cutoff);
  const qFormatted = q.toFixed(2);
  
  const display = document.getElementById('params');
  if (display) {
    display.textContent = `Cutoff: ${cutoffRounded}Hz | Q: ${qFormatted}`;
  }
}
