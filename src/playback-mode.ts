/**
 * 再生モード（WAV/Seq）管理モジュール
 */

/**
 * 再生モード
 */
export type PlaybackMode = 'wav' | 'seq';

/**
 * モード切り替えのコールバック型
 */
export type ModeChangeCallback = (mode: PlaybackMode) => void;

/**
 * 現在のモードを保持
 */
let currentMode: PlaybackMode = 'wav';

/**
 * 現在の再生モードを取得
 * @returns 現在のモード
 */
export function getCurrentMode(): PlaybackMode {
  return currentMode;
}

/**
 * タブUIを更新
 * @param mode - 新しいモード
 */
export function updateModeUI(mode: PlaybackMode): void {
  const tabWav = document.getElementById('tabWav');
  const tabSeq = document.getElementById('tabSeq');
  
  if (tabWav && tabSeq) {
    if (mode === 'wav') {
      tabWav.classList.add('active');
      tabSeq.classList.remove('active');
      tabWav.setAttribute('aria-pressed', 'true');
      tabSeq.setAttribute('aria-pressed', 'false');
    } else {
      tabWav.classList.remove('active');
      tabSeq.classList.add('active');
      tabWav.setAttribute('aria-pressed', 'false');
      tabSeq.setAttribute('aria-pressed', 'true');
    }
  }
}

/**
 * 再生モードを切り替え
 * @param mode - 新しいモード
 * @param callback - モード変更時のコールバック（オプション）
 * @returns Promise<void>
 */
export async function switchMode(
  mode: PlaybackMode,
  callback?: ModeChangeCallback
): Promise<void> {
  if (mode === currentMode) {
    return; // Already in this mode
  }
  
  currentMode = mode;
  
  // Update tab UI
  updateModeUI(mode);
  
  // Call callback if provided
  if (callback) {
    callback(mode);
  }
}
