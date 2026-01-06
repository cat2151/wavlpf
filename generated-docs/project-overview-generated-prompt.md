Last updated: 2026-01-07


# プロジェクト概要生成プロンプト（来訪者向け）

## 生成するもの：
- projectを3行で要約する
- プロジェクトで使用されている技術スタックをカテゴリ別に整理して説明する
- プロジェクト全体のファイル階層ツリー（ディレクトリ構造を図解）
- プロジェクト全体のファイルそれぞれの説明
- プロジェクト全体の関数それぞれの説明
- プロジェクト全体の関数の呼び出し階層ツリー

## 生成しないもの：
- Issues情報（開発者向け情報のため）
- 次の一手候補（開発者向け情報のため）
- ハルシネーションしそうなもの（例、存在しない機能や計画を勝手に妄想する等）

## 出力フォーマット：
以下のMarkdown形式で出力してください：

```markdown
# Project Overview

## プロジェクト概要
[以下の形式で3行でプロジェクトを要約]
- [1行目の説明]
- [2行目の説明]
- [3行目の説明]

## 技術スタック
[使用している技術をカテゴリ別に整理して説明]
- フロントエンド: [フロントエンド技術とその説明]
- 音楽・オーディオ: [音楽・オーディオ関連技術とその説明]
- 開発ツール: [開発支援ツールとその説明]
- テスト: [テスト関連技術とその説明]
- ビルドツール: [ビルド・パース関連技術とその説明]
- 言語機能: [言語仕様・機能とその説明]
- 自動化・CI/CD: [自動化・継続的統合関連技術とその説明]
- 開発標準: [コード品質・統一ルール関連技術とその説明]

## ファイル階層ツリー
```
[プロジェクトのディレクトリ構造をツリー形式で表現]
```

## ファイル詳細説明
[各ファイルの役割と機能を詳細に説明]

## 関数詳細説明
[各関数の役割、引数、戻り値、機能を詳細に説明]

## 関数呼び出し階層ツリー
```
[関数間の呼び出し関係をツリー形式で表現]
```
```


以下のプロジェクト情報を参考にして要約を生成してください：

## プロジェクト情報
名前: wavlpf
説明: # wavlpf

Rust WASMで実装されたローパスフィルター（LPF）付きシンプルソフトウェアシンセサイザー

## デモ

https://cat2151.github.io/wavlpf/

※このドキュメントは仮で、取り急ぎLLMで生成しました。今後修正します

## 機能

- **Rust WASM信号プロセッサ**: 高速なDSP処理をRustで実装
  - ミリ秒精度でのパフォーマンス測定
  - ネイティブからも利用可能なRustクレートとして実装
- **220Hz波形ジェネレーター**: ノコギリ波またはパルス波、デューティー比設定可能
- **Biquad LPFフィルター**: マウス制御によるインタラクティブなフィルター
  - X軸: カットオフ周波数（20Hz - 設定可能な最大値）
  - Y軸: レゾナンスQ値（0.5 - 設定可能な最大値、反転: 上 = 高、下 = 低）
  - 設定可能なカットオフ減衰（HzまたはCent/ミリ秒）
- **非リアルタイムレンダリング**: WebAudio非依存の信号処理
- **設定可能なオーディオバッファ**: BPMとビート基準のオーディオ生成タイミング
- **WAV生成**: 処理済みオーディオをWAVフォーマットに変換
- **Tone.js統合**: クリーンなオーディオ再生
- **設定の永続化**: 設定をJSONファイルでインポート/エクスポート

## 関連ドキュメント

### cat-oscilloscope統合調査

**🌟 推奨** - [CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md](CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md) - **ベストプラクティス重視の包括的な分析**（日本語）

**参考資料**:
- [CAT_OSCILLOSCOPE_INTEGRATION.md](CAT_OSCILLOSCOPE_INTEGRATION.md) - 最小変更アプローチ（参考用）
- [ARCHITECTURE_DIAGRAMS.md](ARCHITECTURE_DIAGRAMS.md) - アーキテクチャ図
- [IMPLEMENTATION_EXAMPLES.md](IMPLEMENTATION_EXAMPLES.md) - 実装例

### 開発ガイド

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - 開発フレームワークとテスト戦略

## はじめに

開発フレームワークとテスト戦略の詳細については、[DEVELOPMENT.md](DEVELOPMENT.md)を参照してください。

波形可視化の統合については、[CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md](CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md)を参照してください。

### 前提条件

- Node.js（v14以上）
- npm
- Rustとwasm-pack（WASMモジュールのビルド用）

Rustとwasm-packのインストール:
```bash
# Rustのインストール
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# wasm-packのインストール
cargo install wasm-pack
```

### インストール

```bash
npm install
```

### 開発

ホットモジュールリプレースメント付きの開発サーバーを起動:

```bash
npm run dev
```

これにより、即時HMR対応のVite開発サーバーが起動します。ブラウザはhttp://localhost:8080で自動的に開きます。

### ビルド

WASMモジュールとアプリケーション全体をビルド:

```bash
# WASMモジュールのみビルド
npm run build:wasm

# すべてをビルド（WASM + TypeScript + Vite本番バンドル）
npm run build
```

TypeScriptの型チェック、Rust WASMモジュールのビルド、Viteで本番用バンドルを作成します。

**wasm-optに関する注意**: ビルドはデフォルトで`wasm-opt`（binaryenから）を使用して追加のWASM最適化を行います。これはCI環境で正常に動作することが検証されています。`wasm-opt`を無効にする必要がある場合（デバッグやネットワーク制限のため）、`wasm-audio/Cargo.toml`の設定をコメント解除できます。

### 本番ビルドのプレビュー

```bash
npm run preview
```

デプロイ前に本番ビルドをローカルで確認します。

### テスト

テストスイートを実行:

```bash
npm test         # ウォッチモード
npm run test:run # 一度だけ実行
npm run test:ui  # ビジュアルテストランナー
npm run coverage # カバレッジレポート生成
```

### 実行（レガシー）

注意: `serve`コマンドは現在Viteのプレビューサーバーを使用しています:

```bash
npm run serve
```

その後、ブラウザでhttp://localhost:8080を開きます（開発には`npm run dev`を使用してください）。

## 使い方

1. ブラウザでアプリケーションを開く
2. ページ上の任意の場所をクリックしてオーディオコンテキストを開始
3. **パラメータを設定**:
   - 波形タイプ: ノコギリ波またはパルス波
   - デューティー比: パルス波用（0-100%）
   - BPMとビート: オーディオ生成タイミングを制御
   - Q最大値: 最大レゾナンス値
   - カットオフ周波数最大値: 最大カットオフ周波数
   - 減衰単位: HzまたはCent
   - 減衰レート: ミリ秒あたりの減衰率
4. マウスを動かしてリアルタイムでフィルターパラメータを制御:
   - **水平位置（X）**: カットオフ周波数を制御（20Hz - 最大値）
   - **垂直位置（Y）**: レゾナンス/Q値を制御（0.5 - 最大値、反転: 上 = 高、下 = 低）
5. **生成時間**表示を確認してパフォーマンスを監視
6. BPMとビート設定に基づいて生成される新しいオーディオを聴く

## アーキテクチャ

### 信号処理（WebAudio非依存）

#### Rust WASM実装
- `wasm-audio/src/lib.rs`: Rustによる完全な信号処理パイプライン
  - オシレーター生成（ノコギリ波、パルス波）
  - RBJ Audio EQ Cookbook公式を使用したBiquad LPFフィルター
  - カットオフ減衰を含むオーディオレンダリング
- `wasm-audio/pkg/`: 生成されたWASMバインディング

#### 統合
- `src/wasmAudio.ts`: WASMモジュールのTypeScriptラッパー
  - 動的WASMロード
  - パフォーマンス測定

### アプリケーション

- `src/synth.ts`: マウストラッキング、オーディオ再生を含むメインシンセサイザーロジック
- `src/wav.ts`: WAVファイルフォーマット生成
- `src/settings.ts`: 設定の永続化（localStorageとJSONインポート/エクスポート）
- `src/index.ts`: エントリーポイント
- `index.html`: Webインターフェース

## デプロイ

アプリケーションは`main`ブランチに変更がプッシュされると自動的にGitHub Pagesにデプロイされます。デプロイワークフロー:

1. Node.js依存関係をインストール
2. TypeScriptをJavaScriptにビルド
3. `index.html`、`dist/`、および`node_modules/`から必要なファイルをデプロイディレクトリにコピー
4. GitHub Pagesにデプロイ

ワークフローは`.github/workflows/deploy.yml`で定義されています。

## ライセンス

MIT


依存関係:
{
  "dependencies": {
    "tone": "^14.7.77"
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

## ファイル階層ツリー
📄 .gitignore
📖 ARCHITECTURE_DIAGRAMS.md
📖 CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md
📖 CAT_OSCILLOSCOPE_INTEGRATION.md
📖 CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md
📖 DEVELOPMENT.md
📖 IMPLEMENTATION_EXAMPLES.md
📖 INTEGRATION_BLOCKERS_SUMMARY.md
📖 ISSUE_39_SUMMARY.md
📄 LICENSE
📖 PERFORMANCE_DISPLAY_DEMO.md
📖 PERFORMANCE_TIMING_ANALYSIS.md
📖 README.ja.md
📖 README.md
📖 README_ANALYSIS.md
📖 SUMMARY.md
📄 _config.yml
📁 generated-docs/
🌐 index.html
📁 issue-notes/
  📖 21.md
  📖 24.md
  📖 25.md
  📖 28.md
  📖 30.md
  📖 31.md
  📖 33.md
  📖 35.md
  📖 37.md
  📖 39.md
  📖 41.md
  📖 44.md
  📖 46.md
  📖 48.md
📊 package-lock.json
📊 package.json
📁 src/
  📘 index.ts
  📘 performance-stats.test.ts
  📘 performance-stats.ts
  📘 settings.test.ts
  📘 settings.ts
  📘 synth.ts
  📘 wasmAudio.ts
  📘 wav.test.ts
  📘 wav.ts
📊 tsconfig.json
📘 vite.config.ts
📁 wasm-audio/
  📄 Cargo.toml
  📁 src/
    📄 lib.rs

## ファイル詳細分析
**index.html** (225行, 6176バイト)
  - 関数: なし
  - インポート: なし

**src/index.ts** (21行, 450バイト)
  - 関数: if
  - インポート: ./synth

**src/performance-stats.test.ts** (208行, 6502バイト)
  - 関数: なし
  - インポート: vitest

**src/performance-stats.ts** (75行, 1556バイト)
  - 関数: createPerformanceStats, addPerformanceSample, calculatePerformanceStats, resetPerformanceStats, if
  - インポート: なし

**src/settings.test.ts** (126行, 4869バイト)
  - 関数: なし
  - インポート: vitest

**src/settings.ts** (168行, 4804バイト)
  - 関数: validateSettings, loadSettings, saveSettings, exportSettingsToFile, importSettingsFromFile, if, catch
  - インポート: なし

**src/synth.ts** (554行, 16683バイト)
  - 関数: getCurrentSettings, getDuration, readNumericParameter, readParameters, getFilterParams, renderAudio, playAudio, updateUIFields, init, scheduleNextPlay, updateStatusDisplay, updateGenerationTimeDisplay, dispose, handleInputChange, handleClick, if, catch
  - インポート: ./wav, tone, ./wasmAudio

**src/wasmAudio.ts** (96行, 2245バイト)
  - 関数: initWasm, isWasmInitialized, renderAudioWasm, if, catch
  - インポート: なし

**src/wav.test.ts** (172行, 5428バイト)
  - 関数: なし
  - インポート: vitest, ./wav

**src/wav.ts** (76行, 2362バイト)
  - 関数: generateWav, writeString, createWavBlobUrl, if, for
  - インポート: なし

**vite.config.ts** (52行, 1081バイト)
  - 関数: なし
  - インポート: vite

## 関数呼び出し階層
- if (src/index.ts)
  - init ()
    - createPerformanceStats (src/performance-stats.ts)
      - addPerformanceSample ()
      - calculatePerformanceStats ()
      - resetPerformanceStats ()
    - loadSettings ()
      - validateSettings (src/settings.ts)
      - saveSettings ()
      - exportSettingsToFile ()
      - importSettingsFromFile ()
    - catch (src/settings.ts)
      - getCurrentSettings (src/synth.ts)
      - getDuration ()
      - readNumericParameter ()
      - readParameters ()
      - getFilterParams ()
      - renderAudio ()
      - playAudio ()
      - updateUIFields ()
      - scheduleNextPlay ()
      - updateStatusDisplay ()
      - updateGenerationTimeDisplay ()
      - dispose ()
      - initWasm ()
      - isWasmInitialized ()
      - renderAudioWasm ()
      - generateWav ()
      - createWavBlobUrl ()
  - writeString ()
- handleInputChange (src/synth.ts)
- handleClick (src/synth.ts)
- for (src/wav.ts)


## プロジェクト構造（ファイル一覧）
ARCHITECTURE_DIAGRAMS.md
CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md
CAT_OSCILLOSCOPE_INTEGRATION.md
CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md
DEVELOPMENT.md
IMPLEMENTATION_EXAMPLES.md
INTEGRATION_BLOCKERS_SUMMARY.md
ISSUE_39_SUMMARY.md
PERFORMANCE_DISPLAY_DEMO.md
PERFORMANCE_TIMING_ANALYSIS.md
README.ja.md
README.md
README_ANALYSIS.md
SUMMARY.md
index.html
issue-notes/21.md
issue-notes/24.md
issue-notes/25.md
issue-notes/28.md
issue-notes/30.md
issue-notes/31.md
issue-notes/33.md
issue-notes/35.md
issue-notes/37.md
issue-notes/39.md
issue-notes/41.md
issue-notes/44.md
issue-notes/46.md
issue-notes/48.md
package-lock.json

上記の情報を基に、プロンプトで指定された形式でプロジェクト概要を生成してください。
特に以下の点を重視してください：
- 技術スタックは各カテゴリごとに整理して説明
- ファイル階層ツリーは提供された構造をそのまま使用
- ファイルの説明は各ファイルの実際の内容と機能に基づく
- 関数の説明は実際に検出された関数の役割に基づく
- 関数呼び出し階層は実際の呼び出し関係に基づく


---
Generated at: 2026-01-07 07:03:27 JST
