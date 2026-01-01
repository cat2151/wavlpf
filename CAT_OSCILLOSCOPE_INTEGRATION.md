# cat-oscilloscope 組み込み調査・分析レポート

## 概要

このドキュメントは、cat-oscilloscopeをwavlpfに組み込む際の最適なライブラリ構成について調査・分析した結果をまとめたものです。

## cat-oscilloscopeの現在の構造

### プロジェクト概要

cat-oscilloscopeは、ブラウザベースのオシロスコープ風波形ビジュアライザーで、以下の特徴を持ちます：

- **マイク入力**: リアルタイムで音声をキャプチャ
- **ゼロクロス検出**: 安定した波形表示のための自動検出
- **オートゲイン**: 振幅の自動調整
- **FFTスペクトラム表示**: 周波数領域の可視化
- **複数の周波数推定アルゴリズム**: Zero-Crossing、Autocorrelation、FFT

### アーキテクチャ分析

cat-oscilloscopeは、以下のような優れたモジュール設計になっています：

```
src/
├── Oscilloscope.ts          # メインコーディネータ
├── AudioManager.ts          # Web Audio API統合
├── GainController.ts        # オートゲイン・ノイズゲート
├── FrequencyEstimator.ts    # 周波数検出アルゴリズム
├── WaveformRenderer.ts      # Canvasレンダリング
├── ZeroCrossDetector.ts     # ゼロクロス検出
└── utils.ts                 # ユーティリティ関数
```

#### 設計原則

1. **単一責任の原則**: 各モジュールが明確な責任を持つ
2. **依存性の分離**: モジュール間の依存関係が明確
3. **再利用性**: 各コンポーネントが独立して機能

## wavlpfの現在の構造

### プロジェクト概要

wavlpfは、LPFフィルタ付きのシンプルなソフトウェアシンセサイザーです：

- **220Hz ノコギリ波生成**: 純粋な信号処理実装
- **Biquad LPFフィルタ**: マウス操作による対話的なフィルタ
- **非リアルタイムレンダリング**: WebAudioに依存しない信号処理
- **WAV生成**: 処理済み音声のWAVフォーマット変換
- **Tone.js統合**: クリーンな音声再生

### 現在の構造

```
src/
├── index.ts        # エントリーポイント
├── synth.ts        # メインシンセサイザーロジック
├── oscillator.ts   # ノコギリ波生成
├── filter.ts       # Biquad LPF実装
└── wav.ts          # WAVファイル生成
```

## 統合の課題と要件

### 統合の目的

wavlpfで生成される音声波形をリアルタイムで可視化し、以下を実現する：

1. **フィルタ処理前後の波形表示**: LPF適用前後の波形を視覚的に比較
2. **リアルタイム波形監視**: 250msごとに生成される音声の波形を表示
3. **周波数分析**: FFTによる周波数領域の可視化
4. **既存UIとの統合**: wavlpfの既存UIに自然に統合

### 統合の技術的課題

1. **音声ソースの違い**: 
   - cat-oscilloscope: マイク入力（Web Audio API）
   - wavlpf: プログラム生成音声（Float32Array）

2. **表示タイミング**:
   - cat-oscilloscope: リアルタイム連続表示
   - wavlpf: 250ms単位のバッファ表示

3. **依存関係**:
   - cat-oscilloscope: Web Audio API必須
   - wavlpf: Tone.jsのみ依存（Web Audioは間接的）

## 推奨されるライブラリ構成

### オプション1: モジュラーライブラリ化（推奨）

cat-oscilloscopeを以下のように再構成することで、wavlpfへの統合が最もスムーズになります：

#### 提案構造

```
@cat2151/oscilloscope-core/
├── src/
│   ├── core/                    # コア機能（音声入力不要）
│   │   ├── WaveformRenderer.ts  # Canvas描画（独立）
│   │   ├── ZeroCrossDetector.ts # ゼロクロス検出（独立）
│   │   ├── FrequencyEstimator.ts # 周波数推定（独立）
│   │   ├── GainController.ts    # ゲイン制御（独立）
│   │   └── utils.ts             # ユーティリティ
│   │
│   ├── adapters/                # アダプター層
│   │   ├── AudioManager.ts      # Web Audio API統合
│   │   └── BufferAdapter.ts     # Float32Array入力用（新規）
│   │
│   └── Oscilloscope.ts          # 統合クラス
│
└── package.json                 # 設定
```

#### 主要な変更点

1. **コア機能の分離**:
   ```typescript
   // WaveformRenderer - 音声入力に依存しない純粋な描画機能
   export class WaveformRenderer {
     drawWaveform(data: Float32Array, startIndex: number, endIndex: number, gain: number): void
     drawFFTOverlay(frequencyData: Uint8Array, ...): void
     // Web Audio API不要
   }
   ```

2. **バッファアダプターの追加**:
   ```typescript
   // BufferAdapter - Float32Array直接入力用
   export class BufferAdapter {
     constructor(private bufferSize: number, private sampleRate: number) {}
     
     setBuffer(buffer: Float32Array): void
     getTimeDomainData(): Float32Array
     getFrequencyData(): Uint8Array | null
     getSampleRate(): number
   }
   ```

3. **柔軟な初期化**:
   ```typescript
   // Oscilloscope - アダプター注入方式
   export class Oscilloscope {
     constructor(
       canvas: HTMLCanvasElement,
       audioSource?: AudioManager | BufferAdapter
     )
     
     // wavlpfでの使用例
     setBuffer(buffer: Float32Array): void
     render(): void // 手動レンダリング
   }
   ```

#### wavlpfでの使用例

```typescript
// synth.ts内
import { Oscilloscope, BufferAdapter } from '@cat2151/oscilloscope-core';

const canvas = document.getElementById('waveform-canvas') as HTMLCanvasElement;
const bufferAdapter = new BufferAdapter(4096, SAMPLE_RATE);
const oscilloscope = new Oscilloscope(canvas, bufferAdapter);

// 音声生成後
function renderAudio(): Float32Array {
  const samples = generateSawtooth(FREQUENCY, SAMPLE_RATE, DURATION);
  const filtered = applyFilter(samples);
  
  // 波形表示
  oscilloscope.setBuffer(filtered);
  oscilloscope.render();
  
  return filtered;
}
```

### オプション2: プラグインアーキテクチャ

より柔軟な拡張性が必要な場合：

```
@cat2151/oscilloscope/
├── core/                    # コアライブラリ
├── plugins/
│   ├── mic-input/          # マイク入力プラグイン
│   ├── buffer-input/       # バッファ入力プラグイン
│   └── file-input/         # ファイル入力プラグイン
└── renderers/
    ├── canvas-2d/          # 2D Canvasレンダラー
    └── webgl/              # WebGLレンダラー（将来）
```

### オプション3: 現状のまま使用（非推奨）

現在のcat-oscilloscopeを変更せず、wavlpf側でラッパーを作成：

**問題点**:
- Web Audio API依存のため、複雑なハックが必要
- パフォーマンス低下
- メンテナンス性の低下

## 推奨アプローチの詳細

### ステップ1: コア機能の抽出

以下のクラスは既に独立しており、そのまま使用可能：

- `WaveformRenderer.ts`: Canvas描画のみ
- `ZeroCrossDetector.ts`: 配列処理のみ
- `FrequencyEstimator.ts`: 配列処理とFFT
- `GainController.ts`: 数値計算のみ
- `utils.ts`: ユーティリティ関数

### ステップ2: BufferAdapterの実装

```typescript
// src/adapters/BufferAdapter.ts
export class BufferAdapter {
  private buffer: Float32Array | null = null;
  private frequencyData: Uint8Array | null = null;
  
  constructor(
    private bufferSize: number,
    private sampleRate: number
  ) {}
  
  setBuffer(buffer: Float32Array): void {
    this.buffer = buffer;
    // FFT計算（必要な場合）
    this.calculateFFT();
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
    return this.buffer !== null;
  }
  
  private calculateFFT(): void {
    // FFT実装（必要な場合）
    // オプション: 外部ライブラリ使用（fft.js等）
  }
}
```

### ステップ3: Oscilloscopeの改修

```typescript
// src/Oscilloscope.ts
export interface AudioSource {
  getTimeDomainData(): Float32Array | null;
  getFrequencyData(): Uint8Array | null;
  getSampleRate(): number;
  getFFTSize(): number;
  isReady(): boolean;
}

export class Oscilloscope {
  private audioSource: AudioSource;
  private gainController: GainController;
  private frequencyEstimator: FrequencyEstimator;
  private renderer: WaveformRenderer;
  private zeroCrossDetector: ZeroCrossDetector;
  
  constructor(canvas: HTMLCanvasElement, audioSource: AudioSource) {
    this.audioSource = audioSource;
    this.gainController = new GainController();
    this.frequencyEstimator = new FrequencyEstimator();
    this.renderer = new WaveformRenderer(canvas);
    this.zeroCrossDetector = new ZeroCrossDetector();
  }
  
  render(): void {
    if (!this.audioSource.isReady()) return;
    
    const dataArray = this.audioSource.getTimeDomainData();
    if (!dataArray) return;
    
    // 既存のレンダリングロジック
    this.gainController.applyNoiseGate(dataArray);
    // ... 以下既存コード
  }
}
```

### ステップ4: パッケージ構成

```json
// package.json
{
  "name": "@cat2151/oscilloscope-core",
  "version": "1.0.0",
  "description": "Modular oscilloscope library for browser-based waveform visualization",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./core": "./dist/core/index.js",
    "./adapters": "./dist/adapters/index.js"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "peerDependencies": {},
  "devDependencies": {
    "typescript": "^5.3.3",
    "vite": "^6.0.0"
  }
}
```

## wavlpfでの統合実装例

### HTML修正

```html
<!-- index.html -->
<canvas id="waveform-canvas" width="800" height="400"></canvas>
<div id="params">Cutoff: 510Hz | Q: 1.25</div>
```

### synth.ts修正

```typescript
import { Oscilloscope, BufferAdapter } from '@cat2151/oscilloscope-core';

// オシロスコープ初期化
const canvas = document.getElementById('waveform-canvas') as HTMLCanvasElement;
const bufferAdapter = new BufferAdapter(4096, SAMPLE_RATE);
const oscilloscope = new Oscilloscope(canvas, bufferAdapter);

// オシロスコープ設定
oscilloscope.setAutoGain(true);
oscilloscope.setFFTDisplay(true);

function renderAudio(): Float32Array {
  const samples = generateSawtooth(FREQUENCY, SAMPLE_RATE, DURATION);
  const filter = new BiquadLPF(SAMPLE_RATE);
  const { cutoff: initialCutoff, q } = getFilterParams();
  
  // フィルタ処理前の波形表示
  bufferAdapter.setBuffer(samples);
  oscilloscope.render();
  
  // フィルタ処理
  const output = new Float32Array(samples.length);
  // ... フィルタ処理コード ...
  
  // フィルタ処理後の波形表示（オプション）
  bufferAdapter.setBuffer(output);
  oscilloscope.render();
  
  return output;
}
```

## メリット・デメリット分析

### オプション1（推奨）のメリット

1. **完全な独立性**: Web Audio API不要でバッファを直接可視化
2. **高い再利用性**: 他のプロジェクトでも使用可能
3. **明確な責任分離**: 音声入力と描画の完全分離
4. **テスト容易性**: モック不要で単体テスト可能
5. **パフォーマンス**: 不要な機能がない
6. **柔軟性**: 複数の入力ソース対応

### オプション1のデメリット

1. **初期開発コスト**: リファクタリングが必要
2. **既存コードの改修**: AudioManagerの分離
3. **ドキュメント更新**: 使用方法の説明が必要

### 実装工数見積もり

| タスク | 工数 | 説明 |
|--------|------|------|
| BufferAdapter実装 | 2-3時間 | 新規アダプター作成 |
| Oscilloscope改修 | 1-2時間 | インターフェース導入 |
| AudioManager分離 | 1-2時間 | アダプター化 |
| テストコード | 2-3時間 | 単体テスト追加 |
| ドキュメント | 1-2時間 | README更新 |
| **合計** | **7-12時間** | 1-2日程度 |

### wavlpf側の統合工数

| タスク | 工数 | 説明 |
|--------|------|------|
| UI統合 | 2-3時間 | Canvas追加、レイアウト調整 |
| ライブラリ組み込み | 1-2時間 | パッケージインストール、初期化 |
| 表示実装 | 2-3時間 | renderAudio内での呼び出し |
| スタイリング | 1-2時間 | デザイン統合 |
| **合計** | **6-10時間** | 1日程度 |

## 代替案: 軽量実装

もし完全なオシロスコープ機能が不要な場合、wavlpf内で最小限の波形描画を実装：

```typescript
// src/waveform-display.ts (新規)
export class SimpleWaveformDisplay {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }
  
  draw(samples: Float32Array): void {
    // 簡易的な波形描画
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.strokeStyle = '#0f0';
    this.ctx.beginPath();
    
    const step = samples.length / this.canvas.width;
    for (let i = 0; i < this.canvas.width; i++) {
      const sample = samples[Math.floor(i * step)];
      const y = (1 - sample) * this.canvas.height / 2;
      if (i === 0) {
        this.ctx.moveTo(i, y);
      } else {
        this.ctx.lineTo(i, y);
      }
    }
    
    this.ctx.stroke();
  }
}
```

**メリット**: 最小限の実装、依存なし  
**デメリット**: 機能制限、ゼロクロス検出なし、FFTなし

## 結論と推奨事項

### 最終推奨: オプション1（モジュラーライブラリ化）

cat-oscilloscopeをモジュラーライブラリ化することで：

1. **wavlpfへのスムーズな統合**: BufferAdapterで直接バッファを渡せる
2. **将来の拡張性**: 他のプロジェクトでも再利用可能
3. **メンテナンス性**: 明確な責任分離で保守が容易
4. **適度な工数**: 1-2日の開発で実現可能

### 実装順序

1. **Phase 1**: cat-oscilloscopeのリファクタリング（1-2日）
   - AudioSource インターフェース導入
   - BufferAdapter 実装
   - 既存機能の動作確認

2. **Phase 2**: wavlpfへの統合（1日）
   - パッケージ依存追加
   - UI統合
   - 表示実装

3. **Phase 3**: 最適化と調整（オプション）
   - パフォーマンスチューニング
   - UI/UXの調整
   - ドキュメント整備

### 次のステップ

1. cat-oscilloscopeリポジトリで新ブランチ作成
2. BufferAdapter実装
3. Oscilloscopeのリファクタリング
4. npmパッケージとして公開（または、直接統合）
5. wavlpfでの統合実装

## 参考資料

- cat-oscilloscope: https://github.com/cat2151/cat-oscilloscope
- wavlpf: https://github.com/cat2151/wavlpf
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

---

**作成日**: 2026-01-01  
**バージョン**: 1.0  
**ステータス**: 調査完了 - 実装準備完了
