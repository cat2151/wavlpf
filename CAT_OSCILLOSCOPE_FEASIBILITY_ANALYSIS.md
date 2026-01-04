# cat-oscilloscope ライブラリ統合の実現可能性分析

## エグゼクティブサマリー

**結論**: ❌ **現時点では cat-oscilloscope を wavlpf に統合することはできない**

**理由**: cat-oscilloscope はライブラリ化の実装は完了しているが、**npm パッケージとして公開されていない**ため、標準的な方法でインストールできない。

## 調査内容

### 1. PR 9 の分析成果の確認 ✅

PR 9 では、cat-oscilloscope をライブラリ化するための包括的な分析が完了:
- 独立リポジトリとして npm パッケージ化する推奨アプローチが提示
- プラグインアーキテクチャ（AudioSource、Renderer、Plugin インターフェース）の設計
- 実装工数: 2-3週間（9-14日）と見積もり
- 詳細なドキュメント: `CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md`（約1200行、日本語）

### 2. cat-oscilloscope リポジトリの現状調査 ✅

#### リポジトリの存在確認
- ✅ リポジトリURL: https://github.com/cat2151/cat-oscilloscope
- ✅ リポジトリはアクセス可能
- ✅ MITライセンス

#### ライブラリ化の実装状況

**良いニュース**: ライブラリとしての実装は完了している！

```json
// package.json からの抜粋
{
  "name": "cat-oscilloscope",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/cat-oscilloscope.cjs",
  "module": "./dist/cat-oscilloscope.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/cat-oscilloscope.mjs",
      "require": "./dist/cat-oscilloscope.cjs"
    }
  }
}
```

**実装済みの機能**:
- ✅ TypeScript完全型定義
- ✅ ESM/CommonJS デュアルフォーマット対応
- ✅ Vite ライブラリビルド設定完備
- ✅ 公開APIエクスポート（`src/index.ts`）
- ✅ 使用方法ドキュメント（`LIBRARY_USAGE.md`）
- ✅ 実装例（`example-library-usage.html`）

**公開API**:
```typescript
// src/index.ts
export { Oscilloscope } from './Oscilloscope';
export { AudioManager } from './AudioManager';
export { GainController } from './GainController';
export { FrequencyEstimator } from './FrequencyEstimator';
export { WaveformRenderer } from './WaveformRenderer';
export { ZeroCrossDetector } from './ZeroCrossDetector';
export { dbToAmplitude, trimSilence } from './utils';
```

### 3. npm パッケージ公開状況の確認 ❌

**重大な問題**: npm パッケージとして未公開

```bash
# npm registry での検索結果
$ npm search @cat2151/oscilloscope
# → 結果なし

$ npm search cat-oscilloscope
# → 結果なし（mathiasvr/oscilloscope など無関係なパッケージのみ）
```

**確認内容**:
- ❌ `@cat2151/oscilloscope` パッケージは npm registry に存在しない
- ❌ `cat-oscilloscope` パッケージも npm registry に存在しない
- ❌ GitHub Packages registry にも未公開

## 統合が不可能な理由の詳細分析

### 問題1: npm パッケージ未公開 🚫

**現状**:
```bash
# これは動作しない
npm install cat-oscilloscope
# Error: 404 Not Found
```

**なぜ問題なのか**:
- 標準的な npm パッケージマネージャーでインストールできない
- CI/CD環境で自動インストールできない
- バージョン管理ができない
- 依存関係の解決ができない

### 問題2: GitHub リポジトリからの直接インストールの課題 ⚠️

**技術的には可能だが、推奨されない**:

```bash
# これは技術的には可能
npm install git+https://github.com/cat2151/cat-oscilloscope.git
```

**しかし、以下の重大な問題がある**:

#### 問題2-1: ビルド成果物が含まれていない
```bash
# リポジトリ構造
cat-oscilloscope/
├── src/           # ソースコード（TypeScript）
├── dist/          # ← これが .gitignore されている！
├── package.json
└── ...
```

**`.gitignore` の内容**:
```
dist
node_modules
```

**影響**:
- `npm install git+https://...` でインストールしても `dist/` ディレクトリが存在しない
- `package.json` の `main` フィールドが `./dist/cat-oscilloscope.cjs` を指しているが、このファイルが存在しない
- `import { Oscilloscope } from 'cat-oscilloscope'` が失敗する

#### 問題2-2: postinstall スクリプトが未設定

通常、GitHubから直接インストールする場合、`postinstall` スクリプトでビルドを実行:

```json
// これが必要だが、未設定
{
  "scripts": {
    "postinstall": "npm run build:lib"
  }
}
```

**なぜ設定されていないのか**:
- ライブラリは npm publish を前提に設計されている
- npm publish 時は事前ビルド済みの dist/ を含める想定
- GitHub 直接インストールは想定外

#### 問題2-3: 依存関係の開発環境汚染

GitHub から直接インストールすると:
```json
// devDependencies まで本番環境にインストールされる
{
  "devDependencies": {
    "@vitest/ui": "^4.0.16",
    "cross-env": "^10.1.0",
    "vite": "^6.0.0",
    "vite-plugin-dts": "^4.5.4",
    "vitest": "^4.0.16"
  }
}
```

**影響**:
- 不要なパッケージが大量にインストールされる
- ビルド時間の増加
- `node_modules` サイズの肥大化

### 問題3: wavlpf の技術スタックとの不整合 🔧

#### 3-1: データソースの違い

**cat-oscilloscope の設計**:
```typescript
// マイク入力を前提とした設計
class Oscilloscope {
  async start(): Promise<void> {
    await this.audioManager.start(); // マイクアクセス
    this.render();
  }
}

class AudioManager {
  async start(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Web Audio API でリアルタイム処理
  }
}
```

**wavlpf の要件**:
```typescript
// Float32Array バッファを事前レンダリング
function renderAudio(): Float32Array {
  const samples = generateSawtooth(FREQUENCY, SAMPLE_RATE, DURATION);
  const filter = new BiquadLPF(SAMPLE_RATE);
  const output = new Float32Array(samples.length);
  // ... フィルタ処理 ...
  return output; // ← これを可視化したい
}
```

**問題点**:
- cat-oscilloscope はリアルタイムマイク入力を想定
- wavlpf は事前レンダリングしたバッファを可視化したい
- 現在の API では直接的なバッファ入力に対応していない

#### 3-2: PR 9 で設計された BufferSource が未実装

PR 9 の分析で提案された `BufferSource` アダプター:

```typescript
// PR 9 で提案されたが、未実装
export class BufferSource implements AudioSource {
  setBuffer(buffer: Float32Array): void {
    this.buffer = buffer;
    this.emit('data', buffer);
  }
  
  getTimeDomainData(): Float32Array | null {
    return this.buffer;
  }
}
```

**現状**:
- この `BufferSource` クラスは実装されていない
- `AudioSource` インターフェース自体が存在しない
- 現在の `Oscilloscope` クラスは `AudioManager`（マイク専用）にハードコードされている

### 問題4: ドキュメントと実装の乖離 📚

#### LIBRARY_USAGE.md の例
```typescript
// ドキュメントに記載されている使用例
import { Oscilloscope } from 'cat-oscilloscope';

const canvas = document.getElementById('oscilloscope');
const oscilloscope = new Oscilloscope(canvas);
await oscilloscope.start();
```

**問題**:
- `npm install cat-oscilloscope` が動作しない
- GitHubから直接インストールしてもビルド成果物がない
- 上記のコードは実行できない

## 統合するために必要な作業

### 最小限の統合（短期的解決策） - 推定工数: 1-2日

#### オプションA: npm パッケージとして公開 ⭐ 推奨

```bash
# cat-oscilloscope リポジトリで
cd cat-oscilloscope
npm run build:lib        # ライブラリビルド
npm publish              # npm registry に公開
```

**その後、wavlpf で**:
```bash
cd wavlpf
npm install cat-oscilloscope@latest
```

**メリット**:
- ✅ 標準的な方法
- ✅ バージョン管理が可能
- ✅ CI/CD で自動インストール可能
- ✅ ビルド済みファイルが含まれる

**デメリット**:
- ❌ BufferSource が未実装のため、マイク入力のみ対応
- ❌ wavlpf のバッファ可視化に直接は使えない

#### オプションB: BufferSource を実装してから公開

```typescript
// cat-oscilloscope/src/sources/BufferSource.ts （新規作成）
export class BufferSource {
  private buffer: Float32Array | null = null;
  
  constructor(
    private readonly sampleRate: number = 44100,
    private readonly bufferSize: number = 2048
  ) {}
  
  setBuffer(buffer: Float32Array): void {
    this.buffer = buffer;
  }
  
  getTimeDomainData(): Float32Array | null {
    return this.buffer;
  }
  
  getFrequencyData(): Uint8Array | null {
    // FFT 計算（オプション）
    return null;
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
}
```

```typescript
// cat-oscilloscope/src/Oscilloscope.ts を修正
export class Oscilloscope {
  constructor(
    canvas: HTMLCanvasElement,
    private dataSource?: AudioManager | BufferSource
  ) {
    this.dataSource = dataSource || new AudioManager();
    // ...
  }
  
  // BufferSource 用の新しいメソッド
  setBuffer(buffer: Float32Array): void {
    if (this.dataSource instanceof BufferSource) {
      this.dataSource.setBuffer(buffer);
      this.renderOnce(); // 1フレームだけレンダリング
    }
  }
}
```

**工数見積もり**:
- BufferSource 実装: 2-4時間
- Oscilloscope 修正: 1-2時間
- テスト: 2-3時間
- ドキュメント更新: 1-2時間
- **合計: 1日程度**

### 完全な統合（長期的解決策） - 推定工数: 2-3週間

PR 9 で分析された完全なアーキテクチャの実装:

1. **AudioSource インターフェース** の導入
2. **プラグインアーキテクチャ** の実装
3. **Renderer インターフェース** の抽象化
4. **複数のデータソース** 対応（マイク、バッファ、ファイル、ストリーム）
5. **包括的なテスト** とドキュメント

詳細は `CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md` を参照。

## wavlpf での使用例（BufferSource 実装後）

### インストール

```bash
cd wavlpf
npm install cat-oscilloscope@latest
```

### 実装例

```typescript
// wavlpf/src/synth.ts
import { Oscilloscope, BufferSource } from 'cat-oscilloscope';

const SAMPLE_RATE = 44100;
const DURATION = 0.25;
const BUFFER_SIZE = Math.floor(SAMPLE_RATE * DURATION);

// オシロスコープの初期化
let oscilloscope: Oscilloscope | null = null;
let bufferSource: BufferSource | null = null;

async function initOscilloscope(): Promise<void> {
  const canvas = document.getElementById('waveform-canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.warn('Waveform canvas not found');
    return;
  }
  
  try {
    // BufferSource を作成
    bufferSource = new BufferSource(SAMPLE_RATE, BUFFER_SIZE);
    
    // Oscilloscope を作成
    oscilloscope = new Oscilloscope(canvas, bufferSource);
    
    // 設定
    oscilloscope.setAutoGain(true);
    oscilloscope.setFFTDisplay(true);
    
    console.log('Oscilloscope initialized successfully');
  } catch (error) {
    console.error('Failed to initialize oscilloscope:', error);
  }
}

function renderAudio(): Float32Array {
  const samples = generateSawtooth(FREQUENCY, SAMPLE_RATE, DURATION);
  const filter = new BiquadLPF(SAMPLE_RATE);
  const { cutoff: initialCutoff, q } = getFilterParams();
  
  // フィルタ処理
  const output = new Float32Array(samples.length);
  // ... フィルタ処理コード ...
  
  // 波形を表示
  if (oscilloscope && bufferSource) {
    bufferSource.setBuffer(output);
    oscilloscope.setBuffer(output); // または oscilloscope.renderOnce()
  }
  
  return output;
}

export async function init(): Promise<void> {
  await initOscilloscope();
  
  // ... 残りの初期化コード ...
}
```

### HTML 修正

```html
<!-- index.html に追加 -->
<div id="waveform-container">
  <div class="waveform-label">🎵 Waveform Display</div>
  <canvas
    id="waveform-canvas"
    width="800"
    height="300"
    aria-label="Real-time waveform visualization"
  ></canvas>
</div>
```

### スタイリング

```css
#waveform-container {
  margin-top: 2em;
  text-align: center;
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
  margin-bottom: 1em;
}
```

## 結論と推奨事項

### 現状まとめ

| 項目 | 状態 | 詳細 |
|------|------|------|
| ライブラリ実装 | ✅ 完了 | TypeScript、ESM/CJS、型定義あり |
| ビルド設定 | ✅ 完了 | Vite ライブラリモード対応 |
| ドキュメント | ✅ 完了 | LIBRARY_USAGE.md、実装例あり |
| npm 公開 | ❌ 未実施 | **critical blocker** |
| BufferSource | ❌ 未実装 | wavlpf 統合に必須 |
| AudioSource IF | ❌ 未実装 | プラグインアーキテクチャに必要 |

### 統合可能にするために必要な最小限のステップ

#### ステップ1: BufferSource の実装（1日）
1. `src/sources/BufferSource.ts` を作成
2. `Oscilloscope.ts` を修正して BufferSource 対応
3. テストコード作成
4. ドキュメント更新

#### ステップ2: npm パッケージ公開（1時間）
```bash
cd cat-oscilloscope
npm run build:lib
npm publish
```

#### ステップ3: wavlpf での統合（半日）
1. `npm install cat-oscilloscope`
2. `synth.ts` に統合コード追加
3. `index.html` に canvas 追加
4. テスト

**合計工数: 1.5-2日**

### 長期的な推奨アプローチ

PR 9 で提案された完全なプラグインアーキテクチャの実装:
- AudioSource インターフェース
- Renderer インターフェース
- Plugin インターフェース
- 複数のデータソース対応
- 包括的なテストとドキュメント

**工数: 2-3週間**

詳細は `CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md` を参照。

## 参考資料

### cat-oscilloscope リポジトリ
- URL: https://github.com/cat2151/cat-oscilloscope
- ライセンス: MIT
- ライブラリ使用方法: [LIBRARY_USAGE.md](https://github.com/cat2151/cat-oscilloscope/blob/main/LIBRARY_USAGE.md)

### 関連ドキュメント（wavlpf リポジトリ内）
- `CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md` - PR 9の包括的分析（日本語、約1200行）
- `CAT_OSCILLOSCOPE_INTEGRATION.md` - 最小変更アプローチ
- `ARCHITECTURE_DIAGRAMS.md` - アーキテクチャ図

### npm 代替パッケージ
もし cat-oscilloscope の統合が困難な場合:
- `oscilloscope` (by mathiasvr) - HTML5 Canvas ベース
- `webaudio-oscilloscope` (by theanam) - Web Audio API 特化
- `@teropa/oscilloscope` - Web Audio Node ベース

**注意**: これらは cat-oscilloscope とは無関係の別プロジェクト。

---

**作成日**: 2026-01-04  
**バージョン**: 1.0  
**ステータス**: 統合不可能（npm未公開のため） - BufferSource実装 + npm公開で統合可能
