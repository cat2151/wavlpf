Last updated: 2026-03-03


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

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://deepwiki.com/cat2151/wavlpf"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
  <a href="https://cat2151.github.io/wavlpf/"><img src="https://img.shields.io/badge/🌐-Live_Demo-green.svg" alt="Live Demo"></a>
  <a href="https://github.com/cat2151/wavlpf/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/cat2151/wavlpf/ci.yml?branch=main&label=CI" alt="CI Status"></a>
</p>

Rust WASMで実装されたローパスフィルター（LPF）付きシンプルソフトウェアシンセサイザー

## デモ

https://cat2151.github.io/wavlpf/

※このドキュメントは仮で、取り急ぎLLMで生成しました。今後修正します

## 機能

- **Rust WASM信号プロセッサ**: 高速なDSP処理をRustで実装
  - ミリ秒精度でのパフォーマンス測定
  - ネイティブからも利用可能なRustクレートとして実装
- **220Hz波形ジェネレーター**: ノコギリ波またはパルス波、デューティー比設定可能
- **Biquadフィルター**: マウス制御によるインタラクティブなフィルター
  - 複数のフィルタータイプ: LPF、HPF、BPF、Notch、APF、Low Shelf、High Shelf
  - X軸: カットオフ周波数（20Hz - 設定可能な最大値）
  - Y軸: レゾナンスQ値（0.5 - 設定可能な最大値、反転: 上 = 高、下 = 低）
  - 設定可能なカットオフ減衰（HzまたはCent/ミリ秒）
- **波形ビジュアライゼーション**: [cat-oscilloscope](https://github.com/cat2151/cat-oscilloscope)を使用したリアルタイムオシロスコープ表示
  - Rust/WASMによる高性能ビジュアライゼーション
  - Float32Arrayバッファの可視化
  - ループ再生対応
- **非リアルタイムレンダリング**: WebAudio非依存の信号処理
- **設定可能なオーディオバッファ**: BPMとビート基準のオーディオ生成タイミング
- **WAV生成**: 処理済みオーディオをWAVフォーマットに変換
- **Tone.js統合**: クリーンなオーディオ再生
- **設定の永続化**: 設定をJSONファイルでインポート/エクスポート

## 関連ドキュメント

### オシロスコープ統合

**📘 使用ガイド** - [docs/OSCILLOSCOPE_USAGE.md](docs/OSCILLOSCOPE_USAGE.md) - **現在の実装と使用方法**（日本語）

**技術詳細**:
- [docs/CAT_OSCILLOSCOPE_WASM_SETUP.md](docs/CAT_OSCILLOSCOPE_WASM_SETUP.md) - WASMセットアップの詳細

### 開発ガイド

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - 開発フレームワークとテスト戦略

## はじめに

開発フレームワークとテスト戦略の詳細については、[DEVELOPMENT.md](DEVELOPMENT.md)を参照してください。

波形可視化については、[docs/OSCILLOSCOPE_USAGE.md](docs/OSCILLOSCOPE_USAGE.md)を参照してください。

### 前提条件

- Node.js（v14以上）
- npm
- Rustとwasm-pack（WASMモジュールのビルド用）

#### Rustとwasm-packのインストール

**方法1: 自動インストールスクリプト（推奨）**

プロジェクトに用意されているスクリプトを使用してwasm-packをインストール:

```bash
# wasm-packをインストール
bash scripts/install-wasm-pack.sh
```

このスクリプトは:
- Rustとcargoがインストールされているか確認
- wasm-packが既にインストールされているか確認
- cargo経由でwasm-packをインストール（ネットワーク制限がある環境でも動作）
- インストールの成功を確認

**方法2: 手動インストール**

Rustとwasm-packを手動でインストール:

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

**⚠️ wasm-optに関する厳重な注意 ⚠️**: 
- ビルドはデフォルトで`wasm-opt`（binaryenから）を使用してWASMの最適化を行います
- **これはCI環境を含むすべての環境で正常に動作することが検証済みです**
- **`wasm-audio/Cargo.toml`で`wasm-opt = false`を設定することは厳重に禁止されています**
- 過去にAI agentが2回、根拠のない憶測で`wasm-opt = false`を追加する誤りを犯しました
- ownerが検証した結果、wasm-optは有効で問題ないことが確認されています
- デフォルト設定（wasm-opt有効）を変更しないでください
- デバッグ目的でローカルで一時的に無効化する場合も、その変更をコミットしないでください

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
    "cat-oscilloscope": "git+https://github.com/cat2151/cat-oscilloscope.git",
    "tone": "^14.7.77"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@vitest/ui": "^4.0.16",
    "happy-dom": "^20.0.11",
    "playwright": "^1.57.0",
    "typescript": "^5.3.3",
    "vite": "^7.3.0",
    "vitest": "^4.0.16"
  }
}

## ファイル階層ツリー
📄 .gitignore
📖 DEVELOPMENT.md
📄 LICENSE
📖 README.ja.md
📖 README.md
📄 _config.yml
📖 copilot-instructions.md
📁 docs/
  📖 CAT_OSCILLOSCOPE_WASM_SETUP.md
  📖 COPILOT_GITHUB_PAGES_ACCESS.md
  📖 DEPLOYMENT_VERIFICATION.md
  📖 OSCILLOSCOPE_LAYOUT.md
  📖 OSCILLOSCOPE_USAGE.md
📁 generated-docs/
🌐 index.html
📁 issue-notes/
  📖 112.md
  📖 113.md
  📖 122.md
  📖 39.md
  📖 52.md
  📖 76.md
  📖 78.md
  📖 80.md
📊 package-lock.json
📊 package.json
📁 scripts/
  📖 README.md
  📄 install-wasm-pack.sh
  📜 investigate-404.js
  📜 investigate-cat-oscilloscope.js
  📜 screenshot-github-pages.js
  📜 setup-cat-oscilloscope-wasm.js
  📜 test-console-logs.js
  📄 test-pr-changes-locally.sh
  📜 test-waveform-screenshot.js
  📜 verify-deployment.js
📁 src/
  📘 audio-player.ts
  📘 full-waveform-display.test.ts
  📘 full-waveform-display.ts
  📘 index.ts
  📘 oscilloscope.test.ts
  📘 oscilloscope.ts
  📘 performance-stats.test.ts
  📘 performance-stats.ts
  📘 playback-mode.ts
  📘 realtime-analysis.test.ts
  📘 realtime-analysis.ts
  📘 settings.test.ts
  📘 settings.ts
  🎨 styles.css
  📘 synth-display.ts
  📘 synth-ui-setup.ts
  📘 synth.ts
  📘 timing.test.ts
  📘 timing.ts
  📘 ui-params.test.ts
  📘 ui-params.ts
  📘 wasmAudio.ts
  📘 wav.test.ts
  📘 wav.ts
📊 tsconfig.json
📘 vite.config.ts
📁 wasm-audio/
  📄 Cargo.toml
  📖 README.md
  📁 src/
    📄 audio_renderer.rs
    📄 filter.rs
    📄 lib.rs
    📄 oscillator.rs
📄 waveform-gh.png

## ファイル詳細分析
**index.html** (180行, 7170バイト)
  - 関数: なし
  - インポート: なし

**scripts/investigate-404.js** (112行, 2983バイト)
  - 関数: investigate404, if, catch
  - インポート: playwright

**scripts/investigate-cat-oscilloscope.js** (165行, 5745バイト)
  - 関数: checkGitHubRepo, investigate, if, catch
  - インポート: https

**scripts/screenshot-github-pages.js** (137行, 3733バイト)
  - 関数: takeScreenshot, catch, if
  - インポート: playwright, playwright

**scripts/setup-cat-oscilloscope-wasm.js** (77行, 2569バイト)
  - 関数: for, if, catch
  - インポート: fs, path

**scripts/test-console-logs.js** (194行, 5539バイト)
  - 関数: testConsoleLogs, if, catch
  - インポート: playwright

**scripts/test-waveform-screenshot.js** (199行, 5450バイト)
  - 関数: testWaveformVisualization, catch, if, for
  - インポート: playwright, playwright

**scripts/verify-deployment.js** (284行, 7719バイト)
  - 関数: verifyDeployment, catch, if, for
  - インポート: playwright, playwright

**src/audio-player.ts** (133行, 2892バイト)
  - 関数: loadTone, isToneLoaded, getTone, startAudioContext, isAudioContextRunning, playWavUrl, stopAndCleanup, if, catch
  - インポート: tone

**src/full-waveform-display.test.ts** (87行, 2782バイト)
  - 関数: なし
  - インポート: vitest

**src/full-waveform-display.ts** (147行, 4566バイト)
  - 関数: initFullWaveformDisplay, drawFullWaveform, clearFullWaveform, disposeFullWaveformDisplay, isFullWaveformDisplayInitialized, if, for
  - インポート: なし

**src/index.ts** (21行, 450バイト)
  - 関数: if
  - インポート: ./synth

**src/oscilloscope.test.ts** (333行, 11960バイト)
  - 関数: canvasSupported, forEach, if, for
  - インポート: vitest

**src/oscilloscope.ts** (269行, 9574バイト)
  - 関数: initOscilloscope, startDebugOverlayUpdates, stopDebugOverlayUpdates, frequencyToNote, validateInputs, updateOscilloscope, stopOscilloscope, isOscilloscopeInitialized, if, catch
  - インポート: cat-oscilloscope

**src/performance-stats.test.ts** (208行, 6502バイト)
  - 関数: なし
  - インポート: vitest

**src/performance-stats.ts** (75行, 1556バイト)
  - 関数: createPerformanceStats, addPerformanceSample, calculatePerformanceStats, resetPerformanceStats, if
  - インポート: なし

**src/playback-mode.ts** (75行, 1449バイト)
  - 関数: getCurrentMode, updateModeUI, switchMode, if
  - インポート: なし

**src/realtime-analysis.test.ts** (20行, 586バイト)
  - 関数: なし
  - インポート: vitest

**src/realtime-analysis.ts** (259行, 6829バイト)
  - 関数: initRealtimeAnalysis, startRealtimeVisualization, stopRealtimeVisualization, animate, drawFFT, drawWaveform, isRealtimeAnalysisInitialized, disposeRealtimeAnalysis, if, for
  - インポート: tone

**src/settings.test.ts** (126行, 4869バイト)
  - 関数: なし
  - インポート: vitest

**src/settings.ts** (168行, 4804バイト)
  - 関数: validateSettings, loadSettings, saveSettings, exportSettingsToFile, importSettingsFromFile, if, catch
  - インポート: なし

**src/styles.css** (396行, 7123バイト)
  - 関数: なし
  - インポート: なし

**src/synth-display.ts** (76行, 2401バイト)
  - 関数: displayOscilloscopeError, updateStatusDisplay, updateGenerationTimeDisplay, if
  - インポート: ./playback-mode, ./timing

**src/synth-ui-setup.ts** (117行, 3278バイト)
  - 関数: setupExportSettingsButton, setupImportSettingsButton, setupTabHandlers, setupMouseAndInputHandlers, handleInputChange, if
  - インポート: ./settings, ./playback-mode

**src/synth.ts** (494行, 14395バイト)
  - 関数: getCurrentSettings, readParameters, renderAudio, playAudioWav, playAudioSeq, playAudio, handleModeSwitch, init, scheduleNextPlay, dispose, handleClick, if, catch
  - インポート: ./wav, ./wasmAudio, ./timing

**src/timing.test.ts** (43行, 1500バイト)
  - 関数: なし
  - インポート: vitest, ./timing

**src/timing.ts** (28行, 733バイト)
  - 関数: calculateDuration, if
  - インポート: なし

**src/ui-params.test.ts** (76行, 2460バイト)
  - 関数: なし
  - インポート: vitest

**src/ui-params.ts** (185行, 5478バイト)
  - 関数: readNumericParameter, readParametersFromUI, updateUIFields, mapMouseToFilterParams, updateMousePositionDisplay, if
  - インポート: ./settings

**src/wasmAudio.ts** (96行, 2245バイト)
  - 関数: initWasm, isWasmInitialized, renderAudioWasm, if, catch
  - インポート: なし

**src/wav.test.ts** (172行, 5428バイト)
  - 関数: なし
  - インポート: vitest, ./wav

**src/wav.ts** (76行, 2362バイト)
  - 関数: generateWav, writeString, createWavBlobUrl, if, for
  - インポート: なし

**vite.config.ts** (54行, 1214バイト)
  - 関数: なし
  - インポート: vite

## 関数呼び出し階層
- if (scripts/investigate-404.js)
  - investigate404 (scripts/investigate-404.js)
    - catch ()
      - forEach ()
      - checkGitHubRepo (scripts/investigate-cat-oscilloscope.js)
      - investigate ()
      - takeScreenshot (scripts/screenshot-github-pages.js)
      - testConsoleLogs (scripts/test-console-logs.js)
      - testWaveformVisualization (scripts/test-waveform-screenshot.js)
      - verifyDeployment (scripts/verify-deployment.js)
      - loadTone (src/audio-player.ts)
      - isToneLoaded ()
      - getTone ()
      - startAudioContext ()
      - isAudioContextRunning ()
      - playWavUrl ()
      - stopAndCleanup ()
      - dispose ()
      - initOscilloscope ()
      - startDebugOverlayUpdates ()
      - stopDebugOverlayUpdates ()
      - frequencyToNote ()
      - validateInputs ()
      - updateOscilloscope ()
      - stopOscilloscope ()
      - isOscilloscopeInitialized ()
      - validateSettings (src/settings.ts)
      - loadSettings ()
      - saveSettings ()
      - exportSettingsToFile ()
      - importSettingsFromFile ()
      - initFullWaveformDisplay (src/full-waveform-display.ts)
      - drawFullWaveform ()
      - clearFullWaveform ()
      - isFullWaveformDisplayInitialized ()
      - createPerformanceStats (src/performance-stats.ts)
      - getCurrentMode (src/playback-mode.ts)
      - switchMode ()
      - initRealtimeAnalysis (src/realtime-analysis.ts)
      - startRealtimeVisualization ()
      - stopRealtimeVisualization ()
      - isRealtimeAnalysisInitialized ()
      - disposeRealtimeAnalysis ()
      - displayOscilloscopeError (src/synth-display.ts)
      - updateStatusDisplay ()
      - updateGenerationTimeDisplay ()
      - setupExportSettingsButton (src/synth-ui-setup.ts)
      - setupImportSettingsButton ()
      - setupTabHandlers ()
      - setupMouseAndInputHandlers ()
      - getCurrentSettings ()
      - readParameters ()
      - renderAudio ()
      - playAudioWav ()
      - playAudioSeq ()
      - playAudio ()
      - handleModeSwitch ()
      - init ()
      - scheduleNextPlay ()
      - calculateDuration ()
      - readParametersFromUI ()
      - updateUIFields ()
      - mapMouseToFilterParams ()
      - updateMousePositionDisplay ()
      - initWasm ()
      - isWasmInitialized ()
      - renderAudioWasm ()
      - generateWav ()
      - createWavBlobUrl ()
  - disposeFullWaveformDisplay ()
  - canvasSupported (src/oscilloscope.test.ts)
  - addPerformanceSample ()
    - calculatePerformanceStats ()
      - resetPerformanceStats ()
  - updateModeUI ()
  - animate ()
    - drawFFT ()
      - drawWaveform ()
  - readNumericParameter (src/ui-params.ts)
  - writeString ()
- for (scripts/setup-cat-oscilloscope-wasm.js)
- handleInputChange (src/synth-ui-setup.ts)
- handleClick (src/synth.ts)


## プロジェクト構造（ファイル一覧）
DEVELOPMENT.md
README.ja.md
README.md
copilot-instructions.md
docs/CAT_OSCILLOSCOPE_WASM_SETUP.md
docs/COPILOT_GITHUB_PAGES_ACCESS.md
docs/DEPLOYMENT_VERIFICATION.md
docs/OSCILLOSCOPE_LAYOUT.md
docs/OSCILLOSCOPE_USAGE.md
index.html
issue-notes/112.md
issue-notes/113.md
issue-notes/122.md
issue-notes/39.md
issue-notes/52.md
issue-notes/76.md
issue-notes/78.md
issue-notes/80.md
package-lock.json
package.json
scripts/README.md
scripts/investigate-404.js
scripts/investigate-cat-oscilloscope.js
scripts/screenshot-github-pages.js
scripts/setup-cat-oscilloscope-wasm.js
scripts/test-console-logs.js
scripts/test-waveform-screenshot.js
scripts/verify-deployment.js
src/audio-player.ts
src/full-waveform-display.test.ts
tsconfig.json

上記の情報を基に、プロンプトで指定された形式でプロジェクト概要を生成してください。
特に以下の点を重視してください：
- 技術スタックは各カテゴリごとに整理して説明
- ファイル階層ツリーは提供された構造をそのまま使用
- ファイルの説明は各ファイルの実際の内容と機能に基づく
- 関数の説明は実際に検出された関数の役割に基づく
- 関数呼び出し階層は実際の呼び出し関係に基づく


---
Generated at: 2026-03-03 07:06:24 JST
