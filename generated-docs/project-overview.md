Last updated: 2026-03-02

# Project Overview

## プロジェクト概要
- Rust WASM技術を核とした、ブラウザで動作するシンプルなソフトウェアシンセサイザーです。
- インタラクティブなBiquadローパスフィルターとリアルタイム波形ビジュアライゼーションを提供します。
- 非リアルタイムレンダリングによるWAVファイル生成や設定の永続化機能を備えています。

## 技術スタック
使用している技術をカテゴリ別に整理して説明します。
- フロントエンド: 
  - **Vite**: 高速な開発サーバーとモダンなフロントエンドのビルドを可能にするツールです。
  - **TypeScript**: JavaScriptに静的型付けを追加した言語で、大規模なアプリケーション開発の堅牢性を高めます。
  - **HTML**: Webインターフェースの構造を定義するために使用されます。
  - **cat-oscilloscope**: リアルタイムでオーディオ波形を表示するための高性能なビジュアライゼーションライブラリです。
- 音楽・オーディオ: 
  - **Rust WASM**: 高速なデジタル信号処理（DSP）をブラウザで実行するためにRustで実装され、WebAssemblyにコンパイルされています。オシレーターやフィルター処理の中核を担います。
  - **Tone.js**: WebAudio APIを抽象化し、オーディオ再生、シーケンシング、エフェクト処理を容易にするJavaScriptフレームワークです。
- 開発ツール: 
  - **Node.js**: JavaScriptの実行環境で、ビルドツールやスクリプトの実行に使用されます。
  - **npm**: Node.jsのパッケージマネージャーで、プロジェクトの依存関係の管理に使用されます。
  - **wasm-pack**: RustコードをWebAssemblyにコンパイルし、JavaScriptから利用可能なパッケージを生成するためのツールです。
  - **Rust**: 高性能なシステムプログラミング言語で、オーディオ信号処理ロジックの実装に使用されています。
- テスト: 
  - **Vitest**: 高速で機能豊富なJavaScript/TypeScriptのテストフレームワークです。
  - **happy-dom**: Vitestで使用されるJSDOMの代替となるテスト環境で、ブラウザのようなDOM環境をシミュレートします。
  - **Playwright**: 各種ブラウザを自動操作し、エンドツーエンドテストやスクリーンショット取得などに利用されるフレームワークです。
- ビルドツール: 
  - **Vite**: フロントエンドのJavaScript/TypeScriptコードのバンドルと最適化を行います。
  - **wasm-pack**: RustからWASMモジュールをビルドします。
  - **cargo**: Rustのビルドシステムおよびパッケージマネージャーで、`wasm-audio`クレートのビルドに使用されます。
  - **wasm-opt**: WebAssemblyバイナリのサイズと実行速度を最適化するためのツールです。
- 言語機能: 
  - **Rust**: WASMモジュールによる高性能なオーディオ信号処理ロジックを実装するために使用されています。
  - **TypeScript**: アプリケーションのフロントエンドロジック全般を記述するために使用されています。
- 自動化・CI/CD: 
  - **GitHub Actions**: リポジトリへの変更（`main`ブランチへのプッシュなど）をトリガーとして、自動的にテスト実行やGitHub Pagesへのデプロイを行うためのCI/CDワークフローです。
  - **Bashスクリプト**: `wasm-pack`のインストールやデプロイ検証など、各種開発・運用タスクを自動化するために使用されます。
- 開発標準: 
  - **TypeScript**: 型定義により、コードの品質と保守性を向上させます。
  - **copilot-instructions.md**: AIアシスタント（GitHub Copilotなど）に対する指示を記述し、開発効率とコードの一貫性を保つためのガイドラインです。

## ファイル階層ツリー
```
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
  📜 test-pr-changes-locally.sh
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
```

## ファイル詳細説明
-   **index.html**: アプリケーションのエントリーポイントとなるHTMLファイルです。Webインターフェースの基本構造を定義し、JavaScriptバンドルをロードしてアプリケーションを起動します。
-   **src/index.ts**: TypeScriptアプリケーションのメインエントリーポイントです。`src/synth.ts`モジュールをインポートし、シンセサイザーの初期化処理を呼び出します。
-   **src/synth.ts**: シンセサイザーの主要なロジックを管理します。UIからの入力（マウス操作、設定変更）を処理し、WASMオーディオ処理のトリガー、オーディオ再生（Tone.js経由）、およびパフォーマンス統計の更新を行います。
-   **src/wasmAudio.ts**: RustでビルドされたWebAssembly (WASM) モジュールを動的にロードし、TypeScriptアプリケーションからその機能（オーディオレンダリングなど）を呼び出すためのラッパーを提供します。WASM処理のパフォーマンス測定も担当します。
-   **wasm-audio/src/lib.rs**: Rustで実装されたWASMオーディオプロセッサのコアライブラリです。オシレーター（ノコギリ波、パルス波）生成、Biquadローパスフィルター処理、カットオフ減衰を含むオーディオレンダリングの全体的なパイプラインが含まれています。
-   **wasm-audio/src/oscillator.rs**: さまざまな波形（ノコギリ波、パルス波など）を生成するオシレーターの実装が含まれており、WASMオーディオプロセッサの音源部を構成します。
-   **wasm-audio/src/filter.rs**: RBJ Audio EQ Cookbookの公式に基づいたBiquadローパスフィルターの実装と、他のフィルタータイプ（HPF、BPFなど）のロジックが含まれています。
-   **src/wav.ts**: 処理済みのオーディオデータをWAVファイル形式に変換し、ブラウザでダウンロード可能なBLOB URLを生成する機能を提供します。
-   **src/settings.ts**: アプリケーションの設定（波形タイプ、BPM、Q最大値、カットオフ周波数最大値など）を管理します。これらの設定をLocalStorageに保存して永続化し、JSONファイルとしてインポート/エクスポートする機能も提供します。
-   **src/oscilloscope.ts**: `cat-oscilloscope`ライブラリを利用して、リアルタイムでオーディオ波形を表示するオシロスコープ機能を提供します。デバッグオーバーレイの更新なども行います。
-   **src/audio-player.ts**: `Tone.js`ライブラリをラップし、WebAudioコンテキストの開始/停止、WAV URLの再生、およびオーディオ再生後のリソースクリーンアップを管理します。
-   **src/ui-params.ts**: ユーザーインターフェースからの数値パラメータを読み取り、マウスのX/Y座標をフィルターのカットオフ周波数とQ値にマッピングするロジックを提供します。UI要素の更新も行います。
-   **scripts/install-wasm-pack.sh**: Rustの`wasm-pack`ツールを自動的にインストールするためのシェルスクリプトです。前提条件の確認やインストールの検証も行います。
-   **DEVELOPMENT.md**: プロジェクトの開発フレームワーク、テスト戦略、および開発プロセスの詳細に関する情報が記載されたドキュメントです。

## 関数詳細説明
-   **`initWasm()`** (src/wasmAudio.ts)
    -   **役割**: WebAssembly (WASM) モジュールをロードし、初期化します。
    -   **引数**: なし
    -   **戻り値**: `Promise<void>` (非同期処理の完了を待機するためのプロミス)
    -   **機能**: WASMモジュールがまだロードされていない場合に、動的にロード処理を実行し、その準備が完了するまで待機します。
-   **`renderAudioWasm(settings: SynthSettings)`** (src/wasmAudio.ts)
    -   **役割**: 指定されたシンセサイザー設定に基づいて、WASMモジュール経由でオーディオデータをレンダリングします。
    -   **引数**: `settings` (オブジェクト): 波形タイプ、デューティー比、フィルター設定、周波数などのシンセサイザーの現在のパラメータを含むオブジェクト。
    -   **戻り値**: `Float32Array` (生成されたオーディオデータの配列)
    -   **機能**: Rust WASM側の信号処理パイプラインを呼び出し、オシレーター生成、フィルター適用などを行い、結果として得られるオーディオバッファ（Float32Array形式）をJavaScript側に返します。
-   **`init(settings: SynthSettings)`** (src/synth.ts)
    -   **役割**: シンセサイザーアプリケーション全体の初期化処理を実行します。
    -   **引数**: `settings` (オブジェクト): アプリケーションの初期設定。
    -   **戻り値**: `Promise<void>`
    -   **機能**: WASMオーディオモジュールの初期化、UI要素へのイベントリスナー設定、オシロスコープやパフォーマンス統計表示の初期化、現在の設定の適用など、アプリケーションを起動可能な状態にするためのすべての準備を行います。
-   **`renderAudio(settings: SynthSettings)`** (src/synth.ts)
    -   **役割**: アプリケーションの設定に基づいてオーディオデータをレンダリングし、その処理にかかった時間を測定します。
    -   **引数**: `settings` (オブジェクト): 現在のシンセサイザー設定。
    -   **戻り値**: `Float32Array` (レンダリングされたオーディオデータ)
    -   **機能**: `renderAudioWasm`を呼び出して実際のオーディオデータを生成させ、その実行にかかるミリ秒単位の時間を計測し、パフォーマンス統計に記録・表示します。
-   **`playAudioWav(audioBuffer: Float32Array, sampleRate: number)`** (src/synth.ts)
    -   **役割**: 生成されたオーディオバッファをWAV形式に変換し、ブラウザで再生します。
    -   **引数**: `audioBuffer` (Float32Array): 再生するオーディオデータ。`sampleRate` (number): オーディオのサンプルレート。
    -   **戻り値**: `Promise<void>`
    -   **機能**: 提供されたオーディオバッファから一時的なWAV形式のURLを生成し、`Tone.js`の機能を利用してそのURLからオーディオを再生します。
-   **`generateWav(audioBuffer: Float32Array, sampleRate: number)`** (src/wav.ts)
    -   **役割**: 生のオーディオデータ（Float32Array）をWAVファイル形式のバイナリデータに変換します。
    -   **引数**: `audioBuffer` (Float32Array): WAVに変換するオーディオデータ。`sampleRate` (number): オーディオのサンプルレート。
    -   **戻り値**: `Blob` (MIMEタイプ `audio/wav` のバイナリデータ)
    -   **機能**: WAVファイルのヘッダー情報と実際のオーディオデータを組み合わせ、ブラウザでダウンロード可能なWAVファイルのBlobオブジェクトを生成します。
-   **`loadSettings()`** (src/settings.ts)
    -   **役割**: ブラウザのLocalStorageからアプリケーションの設定をロードします。
    -   **引数**: なし
    -   **戻り値**: `SynthSettings` (ロードされた設定オブジェクト)
    -   **機能**: LocalStorageに保存されている設定があればそれをパースし、存在しない場合や無効な場合はデフォルト設定とマージして、一貫性のある設定オブジェクトを返します。
-   **`mapMouseToFilterParams(mouseX: number, mouseY: number)`** (src/ui-params.ts)
    -   **役割**: ユーザーインターフェース上のマウスのXおよびY座標を、フィルターのカットオフ周波数とQ値にマッピングします。
    -   **引数**: `mouseX` (number): マウスの水平位置。`mouseY` (number): マウスの垂直位置。
    -   **戻り値**: `object` (`cutoffHz`: カットオフ周波数[Hz], `qValue`: Q値[レゾナンス])
    -   **機能**: UIで設定された最大カットオフ周波数と最大Q値に基づき、マウスの座標をリニアまたは対数的に変換して、リアルタイムでフィルターパラメータを制御するための数値を計算します。

## 関数呼び出し階層ツリー
```
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
      - addPerformanceSample ()
      - calculatePerformanceStats ()
      - getCurrentMode (src/playback-mode.ts)
      - switchMode ()
      - initRealtimeAnalysis (src/realtime-analysis.ts)
      - startRealtimeVisualization ()
      - stopRealtimeVisualization ()
      - isRealtimeAnalysisInitialized ()
      - disposeRealtimeAnalysis ()
      - getCurrentSettings (src/synth.ts)
      - displayOscilloscopeError ()
      - readParameters ()
      - renderAudio ()
      - playAudioWav ()
      - playAudioSeq ()
      - playAudio ()
      - handleModeSwitch ()
      - init ()
      - scheduleNextPlay ()
      - updateStatusDisplay ()
      - updateGenerationTimeDisplay ()
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
  - resetPerformanceStats ()
  - updateModeUI ()
  - animate ()
    - drawFFT ()
      - drawWaveform ()
  - readNumericParameter (src/ui-params.ts)
  - writeString ()
- for (scripts/setup-cat-oscilloscope-wasm.js)
- handleInputChange (src/synth.ts)
- handleClick (src/synth.ts)

---
Generated at: 2026-03-02 07:03:33 JST
