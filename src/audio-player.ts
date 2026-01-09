/**
 * Tone.jsを使用したオーディオ再生管理モジュール
 */

import type * as ToneTypes from 'tone';

// Tone.js is kept as null until the first user interaction. We dynamically import
// the module on a user click so that the underlying AudioContext is not created
// before a user gesture, which would violate browser autoplay policies.
let Tone: typeof ToneTypes | null = null;

// Track whether Tone.js is currently being loaded to prevent race conditions
let isToneLoading = false;

// Promise to track the loading state for concurrent clicks
let toneLoadingPromise: Promise<void> | null = null;

// Track currently playing player
let currentPlayer: ToneTypes.Player | null = null;

/**
 * Tone.jsを動的にロード
 * @returns Promise<void>
 */
export async function loadTone(): Promise<void> {
  if (Tone) {
    return; // Already loaded
  }

  if (isToneLoading) {
    // Wait for existing load to complete
    if (toneLoadingPromise) {
      await toneLoadingPromise;
    }
    return;
  }

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

  await toneLoadingPromise;
}

/**
 * Tone.jsがロード済みかチェック
 * @returns ロード済みの場合true
 */
export function isToneLoaded(): boolean {
  return Tone !== null;
}

/**
 * AudioContextを開始
 * @returns Promise<void>
 */
export async function startAudioContext(): Promise<void> {
  if (!Tone) {
    throw new Error('Tone.js not loaded');
  }

  if (Tone.context.state !== 'running') {
    await Tone.start();
  }
}

/**
 * AudioContextが実行中かチェック
 * @returns 実行中の場合true
 */
export function isAudioContextRunning(): boolean {
  return Tone !== null && Tone.context.state === 'running';
}

/**
 * WAV URLからオーディオを再生
 * @param wavUrl - WAV Blob URL
 * @returns Promise<void>
 */
export async function playWavUrl(wavUrl: string): Promise<void> {
  if (!Tone) {
    console.warn('Tone.js not loaded yet');
    return;
  }

  // Stop previous player if exists
  if (currentPlayer) {
    try {
      currentPlayer.stop();
      currentPlayer.dispose();
    } catch (error) {
      console.warn('Failed to stop or dispose previous player:', error);
    }
  }

  // Create and play new player
  currentPlayer = new Tone.Player(wavUrl).toDestination();
  await Tone.loaded();
  currentPlayer.start();
}

/**
 * 現在再生中のプレイヤーを停止してクリーンアップ
 */
export function stopAndCleanup(): void {
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
