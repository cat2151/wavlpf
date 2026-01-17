# cat-oscilloscope ライブラリの利用方法

## 概要

wavlpfは、波形ビジュアライゼーションに[cat-oscilloscope](https://github.com/cat2151/cat-oscilloscope)ライブラリを使用しています。このドキュメントは、現在の統合実装を説明します。

## ✅ 現在の実装状況

cat-oscilloscopeライブラリは正常に統合され、動作しています：

- ✅ GitHubリポジトリから直接インストール（dist commit方式）
- ✅ Rust/WASMによる高性能オーディオ処理
- ✅ `BufferSource`を使用したFloat32Arrayの直接可視化
- ✅ 自動WASMファイルセットアップ（postinstallスクリプト）

## インストール

### 依存関係

cat-oscilloscopeは`package.json`で依存関係として定義されています：

```json
{
  "dependencies": {
    "cat-oscilloscope": "git+https://github.com/cat2151/cat-oscilloscope.git"
  }
}
```

### セットアップ

```bash
# 依存関係のインストール
npm install

# postinstallスクリプトが自動的に実行され、WASMファイルをpublic/wasm/にコピーします
```

## アーキテクチャ

### WASMファイルのセットアップ

cat-oscilloscopeはRust/WASMを使用しており、実行時にWASMモジュールを動的にロードします。

#### 自動セットアップ（postinstall）

`scripts/setup-cat-oscilloscope-wasm.js`がnpm installの後に自動実行され、以下のファイルをコピーします：

**コピー元**: `node_modules/cat-oscilloscope/dist/wasm/`  
**コピー先**: `public/wasm/`

**ファイル**:
- `wasm_processor.js` - WASMローダー
- `wasm_processor_bg.wasm` - コンパイル済みWASMバイナリ
- `wasm_processor.d.ts` - TypeScript型定義
- `wasm_processor_bg.wasm.d.ts`
- `package.json`

#### Viteによる配信

開発時とビルド時の両方で、WASMファイルは適切に配信されます：

- **開発時**: Viteが`public/`ディレクトリのファイルを`http://localhost:8080/wasm/`で配信
- **本番ビルド**: Viteが`public/`から`dist/`にファイルをコピー
- **GitHub Pages**: `https://cat2151.github.io/wavlpf/wasm/`で配信

`.gitignore`に`public/wasm/`が追加されているため、生成されたWASMファイルはGitにコミットされません。

## コード統合

### 1. oscilloscope.tsモジュール

`src/oscilloscope.ts`は、cat-oscilloscopeライブラリのラッパーモジュールです。

#### 主要なAPI

```typescript
/**
 * オシロスコープを初期化
 * @param mainCanvas - メイン表示用のcanvas要素
 */
export function initOscilloscope(mainCanvas: HTMLCanvasElement): void

/**
 * オシロスコープの表示を更新
 * @param samples - オーディオサンプル（Float32Array）
 * @param sampleRate - サンプルレート（Hz）
 */
export async function updateOscilloscope(samples: Float32Array, sampleRate: number): Promise<void>

/**
 * オシロスコープを停止してリソースをクリーンアップ
 */
export async function stopOscilloscope(): Promise<void>

/**
 * オシロスコープが初期化されているか確認
 */
export function isOscilloscopeInitialized(): boolean
```

#### ダミーCanvas要素

cat-oscilloscopeは5つのcanvas要素を必要としますが、wavlpfでは基本的な波形表示のみを使用します：

- メインcanvas: 実際の波形表示
- ダミーcanvas×4: 比較機能用（wavlpfでは未使用）

`initOscilloscope()`が自動的にダミーcanvasを作成し、メモリリークを防ぐためクリーンアップも管理します。

### 2. synth.ts統合

`src/synth.ts`で、オシロスコープの初期化と更新を行います。

#### 初期化

```typescript
// init()関数内
const canvas = document.getElementById('oscilloscope') as HTMLCanvasElement | null;
if (canvas) {
  try {
    initOscilloscope(canvas);
  } catch (error) {
    console.error('Failed to initialize oscilloscope:', error);
    displayOscilloscopeError('...');
  }
}
```

#### 波形データの更新

```typescript
// playAudioWav()関数内
const { samples, generationTimeMs } = renderAudio();

// オシロスコープの更新（ノンブロッキング）
if (isOscilloscopeInitialized()) {
  updateOscilloscope(samples, SAMPLE_RATE).catch((error) => {
    if (!hasShownOscilloscopeError) {
      hasShownOscilloscopeError = true;
      console.error('Failed to update oscilloscope:', error);
      displayOscilloscopeError('Visualization update failed...');
    }
  });
}
```

### 3. HTMLインターフェース

`index.html`にcanvas要素が追加されています：

```html
<div class="oscilloscope-container">
  <div class="oscilloscope-title">Waveform Visualization</div>
  <canvas id="oscilloscope" 
          role="img" 
          aria-label="Waveform oscilloscope visualization showing the filtered audio signal">
  </canvas>
  <div class="sr-only" id="oscilloscope-status">
    Oscilloscope displaying filtered audio waveform in real-time
  </div>
</div>
```

Canvas要素は300px高さ、100%幅で表示され、半透明の黒い背景を持つコンテナ内に配置されています。

## エラーハンドリング

### WASMロードエラー

WASMモジュールのロードに失敗した場合、`oscilloscope.ts`は：

1. エラーメッセージをコンソールに一度だけ記録
2. 永続的な失敗フラグを設定して、以降の更新をスキップ
3. ユーザーにエラーメッセージを表示

```typescript
// エラーメッセージ例
"Failed to load WASM module script"
```

### リカバリー

オシロスコープの初期化に失敗しても、シンセサイザーの主要機能は影響を受けません。波形可視化なしで音声生成と再生は継続できます。

## トラブルシューティング

### エラー: "Failed to update oscilloscope"

WASMモジュールがロードできない場合に発生します。確認事項：

1. **WASMファイルの存在**
   ```bash
   ls public/wasm/wasm_processor.js
   ```

2. **ファイルが正しく配信されているか**
   - 開発時: `http://localhost:8080/wasm/wasm_processor.js`にアクセスできるか
   - 本番: `https://cat2151.github.io/wavlpf/wasm/wasm_processor.js`が存在するか

3. **postinstallスクリプトの実行**
   ```bash
   npm run postinstall
   ```

### CI/CD環境

GitHub ActionsなどのCI環境では、`npm ci`または`npm install`の実行時にpostinstallスクリプトが自動的に実行されます。追加の設定は不要です。

## 開発ワークフロー

### 開発サーバー

```bash
npm run dev
# http://localhost:8080 でアプリケーションが起動
# WASMファイルは /wasm/ パスで配信される
```

### 本番ビルド

```bash
npm run build
# dist/ ディレクトリに出力
# public/wasm/ の内容が dist/wasm/ にコピーされる
```

### デプロイ検証

GitHub Pagesへのデプロイ後、以下のスクリプトで動作確認できます：

```bash
npm run verify-deployment
```

詳細は[DEPLOYMENT_VERIFICATION.md](DEPLOYMENT_VERIFICATION.md)を参照してください。

## 技術詳細

### BufferSourceの使用

cat-oscilloscopeの`BufferSource`クラスを使用して、Float32Array形式のオーディオデータを直接可視化します：

```typescript
// BufferSourceの作成（ループ再生有効）
currentBufferSource = new BufferSource(samples, sampleRate, { loop: true });

// 可視化の開始
await oscilloscope.startFromBuffer(currentBufferSource);
```

### パフォーマンス最適化

- **ノンブロッキング更新**: `updateOscilloscope()`は非同期で、音声再生を遅延させません
- **エラー抑制**: 初回エラー後は、以降の更新をスキップしてコンソールスパムを防ぎます
- **リソース管理**: ダミーcanvasは適切にクリーンアップされます

## 関連ファイル

- `src/oscilloscope.ts` - オシロスコープラッパーモジュール
- `src/synth.ts` - シンセサイザーとの統合
- `index.html` - UI要素
- `scripts/setup-cat-oscilloscope-wasm.js` - WASMセットアップスクリプト
- `package.json` - 依存関係とpostinstallスクリプト

## 参考資料

- [cat-oscilloscopeリポジトリ](https://github.com/cat2151/cat-oscilloscope)
- [DEPLOYMENT_VERIFICATION.md](DEPLOYMENT_VERIFICATION.md) - デプロイ検証ガイド
- [CAT_OSCILLOSCOPE_WASM_SETUP.md](CAT_OSCILLOSCOPE_WASM_SETUP.md) - WASMセットアップの詳細

---

**最終更新**: 2026-01-17  
**ステータス**: ✅ 実装完了・動作確認済み
