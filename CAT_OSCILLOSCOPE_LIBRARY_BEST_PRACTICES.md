# cat-oscilloscope ライブラリ化・ベストプラクティス分析

## はじめに

このドキュメントは、cat-oscilloscopeをモジュラーライブラリとして最適化し、wavlpfを含む様々なプロジェクトで再利用可能にするための包括的な分析です。

**重要**: このアプローチは、最小限の変更ではなく、**ベストプラクティスとモジュラー設計**を最優先します。

## エグゼクティブサマリー

### 推奨アプローチ: npm パッケージとしての完全なライブラリ化

cat-oscilloscopeを本格的なnpmパッケージとして公開し、TypeScriptのベストプラクティスに従った完全なモジュラー設計に作り直します。

### 主要な変更内容

1. **モノレポ構造への移行**
2. **完全なTypeScript型定義** とエクスポート
3. **プラグインアーキテクチャ** によるソース拡張
4. **Tree-shakable** なビルド構成
5. **npmパッケージとして公開**

### 期待される成果

- ✅ 業界標準のベストプラクティスに準拠
- ✅ 高度なモジュラー設計
- ✅ どのプロジェクトでも簡単に統合可能
- ✅ オープンソースコミュニティへの貢献
- ✅ 長期的なメンテナンス性

## 現状分析

### cat-oscilloscope の現在の構造

```
cat-oscilloscope/
├── src/
│   ├── Oscilloscope.ts          # メインコーディネータ
│   ├── AudioManager.ts          # Web Audio API統合
│   ├── GainController.ts        # ゲイン制御
│   ├── FrequencyEstimator.ts    # 周波数推定
│   ├── WaveformRenderer.ts      # 描画
│   ├── ZeroCrossDetector.ts     # ゼロクロス検出
│   ├── utils.ts                 # ユーティリティ
│   └── main.ts                  # アプリケーションエントリーポイント
├── index.html
├── package.json
└── vite.config.ts
```

**問題点**:
- アプリケーションとライブラリが混在
- 明確なpublicAPI境界がない
- Web Audio APIへの強い依存
- ライブラリとして使用するための設計がされていない

### wavlpf の現在の構造

```
wavlpf/
├── src/
│   ├── index.ts        # エントリーポイント
│   ├── synth.ts        # シンセサイザーロジック
│   ├── oscillator.ts   # 波形生成
│   ├── filter.ts       # フィルタ
│   └── wav.ts          # WAV生成
├── index.html
└── package.json
```

**統合の課題**:
- wavlpfはFloat32Array形式で音声を生成
- cat-oscilloscopeはマイク入力（Web Audio API）に特化
- 直接的な統合パスがない

## ベストプラクティスに基づく推奨アーキテクチャ

### モノレポ構造

プロジェクト全体を統合された開発環境として再構成します。

```
oscilloscope-monorepo/
├── packages/
│   ├── oscilloscope-core/          # コアライブラリ
│   │   ├── src/
│   │   │   ├── index.ts            # Public API
│   │   │   ├── core/               # コア機能
│   │   │   │   ├── WaveformRenderer.ts
│   │   │   │   ├── ZeroCrossDetector.ts
│   │   │   │   ├── FrequencyEstimator.ts
│   │   │   │   └── GainController.ts
│   │   │   ├── sources/            # データソース
│   │   │   │   ├── AudioSource.ts  # 抽象インターフェース
│   │   │   │   ├── MicrophoneSource.ts
│   │   │   │   ├── BufferSource.ts
│   │   │   │   └── FileSource.ts
│   │   │   ├── renderers/          # レンダラー
│   │   │   │   ├── Renderer.ts     # 抽象インターフェース
│   │   │   │   ├── Canvas2DRenderer.ts
│   │   │   │   └── WebGLRenderer.ts (将来)
│   │   │   ├── types/              # TypeScript型定義
│   │   │   │   └── index.ts
│   │   │   └── Oscilloscope.ts     # メインクラス
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── oscilloscope-plugins/       # プラグイン集
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── GridPlugin.ts
│   │   │   ├── FFTPlugin.ts
│   │   │   └── MeasurementPlugin.ts
│   │   └── package.json
│   │
│   ├── oscilloscope-demo/          # デモアプリ（旧cat-oscilloscope）
│   │   ├── src/
│   │   │   └── main.ts
│   │   ├── index.html
│   │   └── package.json
│   │
│   └── wavlpf/                     # wavlpfプロジェクト
│       ├── src/
│       ├── index.html
│       └── package.json
│
├── package.json                     # ルートpackage.json (workspace)
├── turbo.json                       # Turboビルド設定
└── pnpm-workspace.yaml              # pnpmワークスペース設定
```

**メリット**:
- ✅ コードの共有が容易
- ✅ 一貫したビルド・テスト環境
- ✅ 依存関係の管理が明確
- ✅ バージョン管理が統一的
- ✅ モダンなJavaScript開発のベストプラクティス

**ツール選択**:
- **pnpm** + **Turborepo** (推奨): 最新のモノレポツール
- または **Lerna** + **Yarn Workspaces**: 実績のある選択肢

## 詳細設計: プラグインアーキテクチャ

### コアインターフェース設計

#### 1. AudioSource インターフェース

```typescript
// src/sources/AudioSource.ts

/**
 * AudioSource - 音声データソースの抽象インターフェース
 * すべてのデータソース実装が準拠すべき契約を定義
 */
export interface AudioSource {
  /**
   * データソースを初期化して使用可能にする
   */
  initialize(): Promise<void>;
  
  /**
   * データソースを停止してリソースを解放
   */
  dispose(): Promise<void>;
  
  /**
   * 時間領域データ（波形）を取得
   */
  getTimeDomainData(): Float32Array | null;
  
  /**
   * 周波数領域データ（スペクトラム）を取得
   */
  getFrequencyData(): Uint8Array | null;
  
  /**
   * サンプリングレートを取得
   */
  getSampleRate(): number;
  
  /**
   * FFTサイズを取得
   */
  getFFTSize(): number;
  
  /**
   * データソースが使用可能な状態かチェック
   */
  isReady(): boolean;
  
  /**
   * データソースのタイプを識別
   */
  readonly type: 'microphone' | 'buffer' | 'file' | 'stream';
  
  /**
   * イベントリスナーの登録
   */
  on(event: 'ready' | 'error' | 'data', handler: Function): void;
  off(event: 'ready' | 'error' | 'data', handler: Function): void;
}
```

#### 2. BufferSource 実装

```typescript
// src/sources/BufferSource.ts

import { AudioSource } from './AudioSource';
import { EventEmitter } from '../utils/EventEmitter';

/**
 * BufferSource - Float32Array形式の音声バッファを扱うソース
 * wavlpfのような音声合成アプリケーションで使用
 */
export class BufferSource extends EventEmitter implements AudioSource {
  readonly type = 'buffer' as const;
  
  private buffer: Float32Array | null = null;
  private frequencyData: Uint8Array | null = null;
  private ready = false;
  
  constructor(
    private readonly bufferSize: number,
    private readonly sampleRate: number,
    private readonly options: BufferSourceOptions = {}
  ) {
    super();
  }
  
  async initialize(): Promise<void> {
    this.ready = true;
    this.emit('ready');
  }
  
  async dispose(): Promise<void> {
    this.buffer = null;
    this.frequencyData = null;
    this.ready = false;
  }
  
  /**
   * バッファデータを設定
   * @param buffer - Float32Array形式の音声データ（-1.0 ~ 1.0）
   */
  setBuffer(buffer: Float32Array): void {
    this.buffer = buffer;
    
    if (this.options.enableFFT) {
      this.calculateFFT();
    }
    
    this.emit('data', buffer);
  }
  
  getTimeDomainData(): Float32Array | null {
    return this.buffer;
  }
  
  getFrequencyData(): Uint8Array | null {
    return this.frequencyData;
  }
  
  getSampleRate(): number {
    return this.sampleRate;
  }
  
  getFFTSize(): number {
    return this.bufferSize;
  }
  
  isReady(): boolean {
    return this.ready && this.buffer !== null;
  }
  
  /**
   * FFT計算（オプション）
   */
  private calculateFFT(): void {
    if (!this.buffer) return;
    
    // FFT実装（例: fft.jsライブラリを使用）
    // または、Web Audio API のオフラインコンテキストを使用
    // 詳細は実装時に決定
    
    this.frequencyData = new Uint8Array(this.bufferSize / 2);
    // ... FFT計算ロジック ...
  }
}

export interface BufferSourceOptions {
  enableFFT?: boolean;
  fftWindowFunction?: 'hann' | 'hamming' | 'blackman';
}
```

#### 3. Renderer インターフェース

```typescript
// src/renderers/Renderer.ts

/**
 * Renderer - 描画エンジンの抽象インターフェース
 */
export interface Renderer {
  /**
   * レンダラーを初期化
   */
  initialize(canvas: HTMLCanvasElement): void;
  
  /**
   * キャンバスをクリアして背景を描画
   */
  clear(): void;
  
  /**
   * グリッドを描画
   */
  drawGrid(options: GridOptions): void;
  
  /**
   * 波形を描画
   */
  drawWaveform(data: Float32Array, options: WaveformOptions): void;
  
  /**
   * マーカーを描画（例: ゼロクロス、カーソル）
   */
  drawMarker(position: number, options: MarkerOptions): void;
  
  /**
   * FFTスペクトラムを描画
   */
  drawSpectrum(data: Uint8Array, options: SpectrumOptions): void;
  
  /**
   * リサイズ処理
   */
  resize(width: number, height: number): void;
  
  /**
   * リソースを解放
   */
  dispose(): void;
}

export interface GridOptions {
  color?: string;
  lineWidth?: number;
  horizontalDivisions?: number;
  verticalDivisions?: number;
  showCenterLine?: boolean;
}

export interface WaveformOptions {
  color?: string;
  lineWidth?: number;
  startIndex?: number;
  endIndex?: number;
  gain?: number;
  smooth?: boolean;
}

export interface MarkerOptions {
  color?: string;
  lineWidth?: number;
  label?: string;
  style?: 'line' | 'dot' | 'cross';
}

export interface SpectrumOptions {
  color?: string;
  position?: 'overlay' | 'split';
  overlaySize?: { width: number; height: number };
  maxFrequency?: number;
}
```

#### 4. Plugin インターフェース

```typescript
// src/plugins/Plugin.ts

/**
 * Plugin - オシロスコープの機能を拡張するプラグインインターフェース
 */
export interface Plugin {
  /**
   * プラグイン名（一意の識別子）
   */
  readonly name: string;
  
  /**
   * プラグインバージョン
   */
  readonly version: string;
  
  /**
   * プラグインを初期化
   */
  initialize(context: PluginContext): void;
  
  /**
   * レンダリング前のフック
   */
  beforeRender?(data: RenderData): void;
  
  /**
   * レンダリング後のフック
   */
  afterRender?(data: RenderData): void;
  
  /**
   * データ処理フック
   */
  processData?(data: Float32Array): Float32Array;
  
  /**
   * プラグインを破棄
   */
  dispose(): void;
}

export interface PluginContext {
  oscilloscope: any; // Oscilloscopeクラスへの参照
  renderer: Renderer;
  canvas: HTMLCanvasElement;
}

export interface RenderData {
  timeDomainData: Float32Array | null;
  frequencyData: Uint8Array | null;
  sampleRate: number;
  timestamp: number;
}
```

### メインOscilloscopeクラス設計

```typescript
// src/Oscilloscope.ts

import { AudioSource } from './sources/AudioSource';
import { Renderer } from './renderers/Renderer';
import { Plugin } from './plugins/Plugin';
import { GainController } from './core/GainController';
import { FrequencyEstimator } from './core/FrequencyEstimator';
import { ZeroCrossDetector } from './core/ZeroCrossDetector';

/**
 * Oscilloscope - メインオシロスコープクラス
 * プラグイン可能なアーキテクチャで拡張性を提供
 */
export class Oscilloscope {
  private source: AudioSource;
  private renderer: Renderer;
  private plugins: Map<string, Plugin> = new Map();
  private gainController: GainController;
  private frequencyEstimator: FrequencyEstimator;
  private zeroCrossDetector: ZeroCrossDetector;
  private animationId: number | null = null;
  private running = false;
  
  constructor(config: OscilloscopeConfig) {
    this.source = config.source;
    this.renderer = config.renderer;
    this.gainController = new GainController(config.gainOptions);
    this.frequencyEstimator = new FrequencyEstimator(config.frequencyOptions);
    this.zeroCrossDetector = new ZeroCrossDetector(config.zeroCrossOptions);
    
    // レンダラーを初期化
    this.renderer.initialize(config.canvas);
    
    // プラグインを登録
    if (config.plugins) {
      config.plugins.forEach(plugin => this.use(plugin));
    }
  }
  
  /**
   * プラグインを登録
   */
  use(plugin: Plugin): this {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin "${plugin.name}" is already registered`);
      return this;
    }
    
    plugin.initialize({
      oscilloscope: this,
      renderer: this.renderer,
      canvas: this.renderer['canvas'] // 内部参照
    });
    
    this.plugins.set(plugin.name, plugin);
    return this;
  }
  
  /**
   * オシロスコープを開始
   */
  async start(): Promise<void> {
    await this.source.initialize();
    this.running = true;
    this.renderLoop();
  }
  
  /**
   * オシロスコープを停止
   */
  async stop(): Promise<void> {
    this.running = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    await this.source.dispose();
  }
  
  /**
   * 単一フレームをレンダリング（手動モード）
   */
  render(): void {
    this.renderFrame();
  }
  
  /**
   * 内部レンダリングループ
   */
  private renderLoop(): void {
    if (!this.running) return;
    
    this.renderFrame();
    this.animationId = requestAnimationFrame(() => this.renderLoop());
  }
  
  /**
   * フレームをレンダリング
   */
  private renderFrame(): void {
    if (!this.source.isReady()) return;
    
    const timeDomainData = this.source.getTimeDomainData();
    const frequencyData = this.source.getFrequencyData();
    
    if (!timeDomainData) return;
    
    const renderData: RenderData = {
      timeDomainData,
      frequencyData,
      sampleRate: this.source.getSampleRate(),
      timestamp: performance.now()
    };
    
    // プラグイン: beforeRenderフック
    this.plugins.forEach(plugin => {
      plugin.beforeRender?.(renderData);
    });
    
    // データ処理パイプライン
    let processedData = timeDomainData;
    this.plugins.forEach(plugin => {
      if (plugin.processData) {
        processedData = plugin.processData(processedData);
      }
    });
    
    // ノイズゲート適用
    this.gainController.applyNoiseGate(processedData);
    
    // ゼロクロス検出
    const displayRange = this.zeroCrossDetector.calculateDisplayRange(
      processedData,
      this.frequencyEstimator.estimateFrequency(
        processedData,
        frequencyData,
        this.source.getSampleRate(),
        this.source.getFFTSize()
      ),
      this.source.getSampleRate()
    );
    
    // オートゲイン計算
    if (displayRange) {
      this.gainController.calculateAutoGain(
        processedData,
        displayRange.startIndex,
        displayRange.endIndex
      );
    }
    
    // 描画
    this.renderer.clear();
    this.renderer.drawGrid({}); // デフォルトオプション
    
    if (displayRange) {
      this.renderer.drawWaveform(processedData, {
        startIndex: displayRange.startIndex,
        endIndex: displayRange.endIndex,
        gain: this.gainController.getCurrentGain()
      });
      
      // ゼロクロスマーカー
      this.renderer.drawMarker(displayRange.firstZeroCross, {
        color: '#ff0000',
        style: 'line'
      });
    } else {
      this.renderer.drawWaveform(processedData, {
        gain: this.gainController.getCurrentGain()
      });
    }
    
    // FFTスペクトラム
    if (frequencyData) {
      this.renderer.drawSpectrum(frequencyData, {
        position: 'overlay'
      });
    }
    
    // プラグイン: afterRenderフック
    this.plugins.forEach(plugin => {
      plugin.afterRender?.(renderData);
    });
  }
  
  /**
   * リソースを解放
   */
  dispose(): void {
    this.stop();
    this.plugins.forEach(plugin => plugin.dispose());
    this.plugins.clear();
    this.renderer.dispose();
  }
  
  // Getters
  getSource(): AudioSource {
    return this.source;
  }
  
  getRenderer(): Renderer {
    return this.renderer;
  }
  
  getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }
}

export interface OscilloscopeConfig {
  source: AudioSource;
  renderer: Renderer;
  canvas: HTMLCanvasElement;
  plugins?: Plugin[];
  gainOptions?: any;
  frequencyOptions?: any;
  zeroCrossOptions?: any;
}
```

## Public API 設計

### メインエクスポート（src/index.ts）

```typescript
// src/index.ts - Public API

// メインクラス
export { Oscilloscope } from './Oscilloscope';
export type { OscilloscopeConfig } from './Oscilloscope';

// データソース
export { AudioSource } from './sources/AudioSource';
export { MicrophoneSource } from './sources/MicrophoneSource';
export { BufferSource } from './sources/BufferSource';
export { FileSource } from './sources/FileSource';
export type { BufferSourceOptions } from './sources/BufferSource';

// レンダラー
export { Renderer } from './renderers/Renderer';
export { Canvas2DRenderer } from './renderers/Canvas2DRenderer';
export type {
  GridOptions,
  WaveformOptions,
  MarkerOptions,
  SpectrumOptions
} from './renderers/Renderer';

// プラグイン
export { Plugin } from './plugins/Plugin';
export type { PluginContext, RenderData } from './plugins/Plugin';
export { GridPlugin } from './plugins/GridPlugin';
export { FFTPlugin } from './plugins/FFTPlugin';
export { MeasurementPlugin } from './plugins/MeasurementPlugin';

// コア機能（オプション: 高度な使用例向け）
export { GainController } from './core/GainController';
export { FrequencyEstimator } from './core/FrequencyEstimator';
export { ZeroCrossDetector } from './core/ZeroCrossDetector';
export { WaveformRenderer } from './core/WaveformRenderer';

// 型定義
export * from './types';

// ユーティリティ
export * from './utils';

// バージョン情報
export const VERSION = '1.0.0';
```

## wavlpf への統合実装例

### 完全な統合例

```typescript
// wavlpf/src/synth.ts

import { generateSawtooth } from './oscillator';
import { BiquadLPF } from './filter';
import { generateWav, createWavBlobUrl } from './wav';
import {
  Oscilloscope,
  BufferSource,
  Canvas2DRenderer,
  GridPlugin,
  FFTPlugin
} from '@cat2151/oscilloscope';

// ... Tone.js型定義 ...

const SAMPLE_RATE = 44100;
const DURATION = 0.25;
const FREQUENCY = 220;
const BUFFER_SIZE = Math.floor(SAMPLE_RATE * DURATION);

let mouseX = 0.5;
let mouseY = 0.5;
let currentPlayer: TonePlayer | null = null;
let playbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

// オシロスコープの初期化
let oscilloscope: Oscilloscope | null = null;
let bufferSource: BufferSource | null = null;

function getFilterParams(): { cutoff: number; q: number } {
  const cutoff = 20 + mouseX * (4000 - 20);
  const q = 0.5 + (1 - mouseY) * (16 - 0.5);
  return { cutoff, q };
}

function renderAudio(): Float32Array {
  // ノコギリ波生成
  const samples = generateSawtooth(FREQUENCY, SAMPLE_RATE, DURATION);
  
  // フィルタ処理前の波形を表示（オプション）
  if (bufferSource && oscilloscope) {
    bufferSource.setBuffer(samples);
    oscilloscope.render();
  }
  
  // フィルタ作成と適用
  const filter = new BiquadLPF(SAMPLE_RATE);
  const { cutoff: initialCutoff, q } = getFilterParams();
  
  const numSamples = samples.length;
  const output = new Float32Array(numSamples);
  
  const updateIntervalMs = 1;
  const samplesPerUpdate = Math.max(1, Math.floor(SAMPLE_RATE * (updateIntervalMs / 1000)));
  
  let currentCutoff = initialCutoff;
  
  for (let i = 0; i < numSamples; i++) {
    if (i % samplesPerUpdate === 0) {
      const timeMs = (i / SAMPLE_RATE) * 1000;
      currentCutoff = Math.max(1, initialCutoff - timeMs);
      filter.setCoefficients(currentCutoff, q);
    }
    
    output[i] = filter.processSample(samples[i]);
  }
  
  // フィルタ処理後の波形を表示
  if (bufferSource && oscilloscope) {
    bufferSource.setBuffer(output);
    oscilloscope.render();
  }
  
  return output;
}

async function playAudio(): Promise<void> {
  const samples = renderAudio();
  
  const wavData = generateWav(samples, SAMPLE_RATE);
  const wavUrl = createWavBlobUrl(wavData);
  
  if (currentPlayer) {
    try {
      currentPlayer.stop();
      currentPlayer.dispose();
    } catch (error) {
      console.warn('Failed to stop or dispose previous player:', error);
    }
  }
  
  currentPlayer = new Tone.Player(wavUrl).toDestination();
  await Tone.loaded();
  currentPlayer.start();
  
  setTimeout(() => {
    URL.revokeObjectURL(wavUrl);
  }, 250);
}

/**
 * オシロスコープを初期化
 */
async function initOscilloscope(): Promise<void> {
  const canvas = document.getElementById('waveform-canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.warn('Waveform canvas not found');
    return;
  }
  
  try {
    // データソースを作成
    bufferSource = new BufferSource(BUFFER_SIZE, SAMPLE_RATE, {
      enableFFT: true
    });
    
    // レンダラーを作成
    const renderer = new Canvas2DRenderer();
    
    // オシロスコープを作成（プラグイン付き）
    oscilloscope = new Oscilloscope({
      source: bufferSource,
      renderer: renderer,
      canvas: canvas,
      plugins: [
        new GridPlugin({
          horizontalDivisions: 5,
          verticalDivisions: 10,
          showCenterLine: true
        }),
        new FFTPlugin({
          position: 'overlay',
          overlaySize: { width: 0.35, height: 0.35 }
        })
      ]
    });
    
    // データソースを初期化
    await bufferSource.initialize();
    
    console.log('Oscilloscope initialized successfully');
  } catch (error) {
    console.error('Failed to initialize oscilloscope:', error);
  }
}

export async function init(): Promise<void> {
  // オシロスコープを初期化
  await initOscilloscope();
  
  // マウス位置トラッキング
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    const cutoff = Math.round(20 + mouseX * (4000 - 20));
    const q = (0.5 + (1 - mouseY) * (16 - 0.5)).toFixed(2);
    
    const display = document.getElementById('params');
    if (display) {
      display.textContent = `Cutoff: ${cutoff}Hz | Q: ${q}`;
    }
  });
  
  // 再生ループ
  function scheduleNextPlay() {
    if (Tone.context.state === 'running') {
      playAudio().catch((error: unknown) => {
        console.error('Error while playing audio:', error);
      });
    }
    playbackTimeoutId = setTimeout(scheduleNextPlay, 250);
  }
  
  // ユーザーインタラクションで開始
  document.addEventListener('click', async () => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
      console.log('Audio context started');
      scheduleNextPlay();
    }
  }, { once: true });
  
  console.log('WAVLPF Synthesizer initialized');
}

export function dispose(): void {
  if (playbackTimeoutId !== null) {
    clearTimeout(playbackTimeoutId);
    playbackTimeoutId = null;
  }
  
  if (currentPlayer) {
    try {
      currentPlayer.stop();
      currentPlayer.dispose();
    } catch (error) {
      console.warn('Failed to dispose player:', error);
    }
    currentPlayer = null;
  }
  
  if (oscilloscope) {
    oscilloscope.dispose();
    oscilloscope = null;
  }
  
  bufferSource = null;
}
```

### HTML修正

```html
<!-- wavlpf/index.html -->
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WAVLPF Synthesizer</title>
  <style>
    /* 既存のスタイル... */
    
    #waveform-container {
      margin-top: 2em;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;
    }
    
    #waveform-canvas {
      background-color: #000000;
      border: 2px solid #00ff00;
      border-radius: 8px;
      box-shadow: 0 0 30px rgba(0, 255, 0, 0.4);
    }
    
    .waveform-label {
      font-size: 1.1em;
      opacity: 0.9;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>WAVLPF Synthesizer</h1>
    <div class="instructions">
      Click anywhere to start<br>
      Move your mouse to control the filter
    </div>
    <div id="params">Cutoff: 510Hz | Q: 1.25</div>
    
    <!-- オシロスコープ波形表示 -->
    <div id="waveform-container">
      <div class="waveform-label">🎵 Waveform Display</div>
      <canvas
        id="waveform-canvas"
        width="800"
        height="300"
        aria-label="Real-time waveform visualization"
      ></canvas>
    </div>
    
    <div class="info">
      X-axis: Cutoff Frequency (20Hz - 4000Hz)<br>
      Y-axis: Resonance Q (0.5 - 16.0)<br>
      <br>
      220Hz Sawtooth wave with LPF<br>
      Cutoff decays at 1Hz/ms
    </div>
    <div class="status">
      New audio generated every 250ms
    </div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/tone@14.9.17/build/Tone.js"></script>
  <script type="module" src="/src/index.ts"></script>
</body>
</html>
```

### package.json 更新

```json
{
  "name": "wavlpf",
  "version": "1.0.0",
  "description": "Simple software synthesizer with LPF filter and waveform visualization",
  "main": "dist/index.js",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "coverage": "vitest run --coverage",
    "serve": "vite preview"
  },
  "keywords": [
    "synthesizer",
    "audio",
    "lpf",
    "tone.js",
    "oscilloscope",
    "waveform"
  ],
  "author": "cat2151",
  "license": "MIT",
  "dependencies": {
    "tone": "^14.7.77",
    "@cat2151/oscilloscope": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@vitest/ui": "^4.0.16",
    "happy-dom": "^20.0.11",
    "typescript": "^5.3.3",
    "vite": "^7.3.0",
    "vitest": "^4.0.16"
  }
}
```

## 実装ロードマップ

### フェーズ 1: リポジトリ構造の再編成（1-2日）

#### ステップ 1.1: モノレポ構造のセットアップ

```bash
# ルートディレクトリ作成
mkdir oscilloscope-monorepo
cd oscilloscope-monorepo

# pnpmのインストール（推奨）
npm install -g pnpm

# ワークスペース設定
cat > pnpm-workspace.yaml << EOF
packages:
  - 'packages/*'
EOF

# ルートpackage.json作成
cat > package.json << EOF
{
  "name": "oscilloscope-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^1.11.0",
    "typescript": "^5.3.3"
  }
}
EOF

# Turbo設定
cat > turbo.json << EOF
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {}
  }
}
EOF
```

#### ステップ 1.2: パッケージディレクトリの作成

```bash
# パッケージディレクトリ構造
mkdir -p packages/oscilloscope-core/src/{core,sources,renderers,plugins,types,utils}
mkdir -p packages/oscilloscope-plugins/src
mkdir -p packages/oscilloscope-demo/src
mkdir -p packages/wavlpf/src

# 既存プロジェクトからコードを移行
# cat-oscilloscope -> packages/oscilloscope-core & packages/oscilloscope-demo
# wavlpf -> packages/wavlpf
```

### フェーズ 2: コアライブラリの実装（3-5日）

#### ステップ 2.1: インターフェース定義（1日）
- AudioSource インターフェース
- Renderer インターフェース
- Plugin インターフェース
- 型定義ファイル

#### ステップ 2.2: データソース実装（1-2日）
- BufferSource（優先）
- MicrophoneSource（既存コードから移行）
- FileSource（オプション）

#### ステップ 2.3: レンダラー実装（1日）
- Canvas2DRenderer（既存コードから移行・リファクタリング）

#### ステップ 2.4: プラグイン実装（1日）
- GridPlugin
- FFTPlugin
- MeasurementPlugin（オプション）

#### ステップ 2.5: コア機能のリファクタリング（1日）
- GainController
- FrequencyEstimator
- ZeroCrossDetector
- WaveformRenderer（既存コードを統合）

### フェーズ 3: テストの実装（2-3日）

```typescript
// packages/oscilloscope-core/src/sources/__tests__/BufferSource.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { BufferSource } from '../BufferSource';

describe('BufferSource', () => {
  let bufferSource: BufferSource;
  const SAMPLE_RATE = 44100;
  const BUFFER_SIZE = 4096;
  
  beforeEach(() => {
    bufferSource = new BufferSource(BUFFER_SIZE, SAMPLE_RATE);
  });
  
  it('should initialize successfully', async () => {
    await bufferSource.initialize();
    expect(bufferSource.isReady()).toBe(false); // バッファ未設定
  });
  
  it('should accept Float32Array buffers', () => {
    const buffer = new Float32Array(BUFFER_SIZE);
    for (let i = 0; i < BUFFER_SIZE; i++) {
      buffer[i] = Math.sin(2 * Math.PI * 440 * i / SAMPLE_RATE);
    }
    
    bufferSource.setBuffer(buffer);
    expect(bufferSource.getTimeDomainData()).toBe(buffer);
  });
  
  it('should return correct sample rate', () => {
    expect(bufferSource.getSampleRate()).toBe(SAMPLE_RATE);
  });
  
  it('should emit data event when buffer is set', (done) => {
    const buffer = new Float32Array(BUFFER_SIZE);
    
    bufferSource.on('data', (data) => {
      expect(data).toBe(buffer);
      done();
    });
    
    bufferSource.setBuffer(buffer);
  });
  
  // ... 追加のテスト ...
});
```

### フェーズ 4: ドキュメント整備（1-2日）

#### API ドキュメント（docs/API.md）
```markdown
# @cat2151/oscilloscope API リファレンス

## Oscilloscope

メインクラス

### コンストラクタ

\`\`\`typescript
new Oscilloscope(config: OscilloscopeConfig)
\`\`\`

### メソッド

#### start()
...

## BufferSource

Float32Array形式のバッファを扱うデータソース

...
```

#### 使用ガイド（docs/GUIDE.md）
- 基本的な使い方
- プラグインの作成方法
- カスタムレンダラーの実装
- パフォーマンスチューニング

### フェーズ 5: wavlpf統合（1日）

- oscilloscope-coreをwavlpfに統合
- UIの調整
- テストと検証

### フェーズ 6: npm公開準備（1日）

```bash
# ビルド
cd packages/oscilloscope-core
pnpm build

# npmパッケージとして公開
npm login
npm publish --access public

# または、プライベートレジストリ
npm publish --registry=https://your-registry.com
```

## 工数見積もり

| フェーズ | 工数 | 説明 |
|---------|------|------|
| 1. リポジトリ構造再編成 | 1-2日 | モノレポセットアップ、既存コード移行 |
| 2. コアライブラリ実装 | 3-5日 | インターフェース、データソース、レンダラー |
| 3. テスト実装 | 2-3日 | 単体テスト、統合テスト |
| 4. ドキュメント整備 | 1-2日 | API、ガイド、使用例 |
| 5. wavlpf統合 | 1日 | 統合実装、UI調整 |
| 6. npm公開準備 | 1日 | ビルド設定、公開 |
| **合計** | **9-14日** | **約 2-3週間** |

## 比較: ベストプラクティス vs 最小変更

| 観点 | 最小変更アプローチ | ベストプラクティスアプローチ |
|------|------------------|--------------------------|
| **工数** | 2-3日 | 2-3週間 |
| **モジュラー性** | 中 | 非常に高い |
| **再利用性** | 限定的 | 完全に再利用可能 |
| **拡張性** | 限定的 | プラグインで無限に拡張可能 |
| **テスタビリティ** | 中 | 非常に高い |
| **ドキュメント** | 最小限 | 包括的 |
| **npm公開** | 難しい | 容易 |
| **コミュニティ貢献** | なし | 可能 |
| **長期メンテナンス** | 難しい | 容易 |
| **TypeScript活用** | 部分的 | 完全 |
| **業界標準準拠** | 部分的 | 完全 |

## 結論と推奨事項

### 最終推奨: モノレポ構造 + npm パッケージ公開

**理由**:
1. ✅ **業界標準のベストプラクティス**: モダンなJavaScript開発の主流
2. ✅ **完全なモジュラー設計**: プラグインアーキテクチャで最大の柔軟性
3. ✅ **長期的な価値**: オープンソースコミュニティへの貢献可能
4. ✅ **スキル向上**: 最新の開発手法を学習・実践
5. ✅ **ポートフォリオ**: 高品質なライブラリとして公開可能

### 次のステップ

1. **モノレポ構造の確認と準備**: Turborepo + pnpm のセットアップ
2. **パッケージ名の決定**: `@cat2151/oscilloscope` または別名
3. **ライセンスの確認**: MIT（推奨）
4. **実装計画の承認**: 2-3週間の開発スケジュール
5. **フェーズ1の開始**: リポジトリ構造の再編成

## 補足資料

### 参考リンク

- [Turbo - Monorepo Tool](https://turbo.build/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [TypeScript Library Starter](https://github.com/alexjoverm/typescript-library-starter)
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [Publishing TypeScript NPM Packages](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)

### 追加の検討事項

1. **WebGLレンダラー**: 将来的なパフォーマンス向上
2. **WebWorker対応**: バックグラウンドでの処理
3. **WebAssembly**: FFT計算の高速化
4. **React/Vue/Svelteコンポーネント**: フレームワーク統合

---

**作成日**: 2026-01-01  
**バージョン**: 2.0  
**ステータス**: ベストプラクティス重視版 - レビュー待ち
