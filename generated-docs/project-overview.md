Last updated: 2026-02-09

# Project Overview

## プロジェクト概要
- RustとWebAssembly (WASM) を使用して実装された、Webブラウザ上で動作するシンプルなソフトウェアシンセサイザーです。
- ローパスフィルター（LPF）や波形ジェネレーター、リアルタイムオシロスコープ表示などの機能を持ちます。
- ユーザーはマウス操作でフィルターパラメータをインタラクティブに制御し、オーディオ生成と視覚化を体験できます。

## 技術スタック
- フロントエンド: Vite (高速な開発サーバーとビルドツール)、TypeScript (アプリケーションの主要言語)、Tone.js (Web Audio APIを抽象化し、オーディオ再生を容易にするライブラリ)、cat-oscilloscope (Rust/WASMで実装された高性能な波形ビジュアライゼーションライブラリ)。
- 音楽・オーディオ: Rust WASM (高速なデジタル信号処理(DSP)を担い、オーディオレンダリング、オシレーター、Biquadフィルターの計算を実行)、Biquadフィルター (ローパス、ハイパスなど多様なフィルタータイプを実装)、WAV生成 (処理済みオーディオデータをWAVフォーマットでエクスポートする機能)。
- 開発ツール: Node.js (JavaScriptランタイム環境)、npm (パッケージ管理)、wasm-pack (RustコードをWebAssemblyにコンパイルするためのツール)、Git (バージョン管理システム)、GitHub Pages (静的サイトのホスティングとデプロイ)、Playwright (エンドツーエンドテストフレームワーク)、happy-dom (VitestでのDOMエミュレーション)。
- テスト: Vitest (高速な単体・統合テストフレームワーク)、Playwright (ブラウザ環境でのエンドツーエンドテスト)。
- ビルドツール: Vite (フロントエンドのバンドルと最適化)、wasm-pack (Rust WASMモジュールのコンパイルとJavaScriptバインディング生成)、TypeScript (型安全なJavaScriptへのトランスパイル)。
- 言語機能: Rust (高性能な信号処理ロジックの実装)、TypeScript (堅牢なWebアプリケーションロジックの実装)、JavaScript (WebブラウザでのインタラクションとWeb標準APIの利用)。
- 自動化・CI/CD: GitHub Actions (継続的インテグレーションとGitHub Pagesへの自動デプロイメントパイプライン)。
- 開発標準: TypeScriptによる型安全なコード記述、Rustのクレートシステムによるモジュール化、PrettierやESLint (コード品質とスタイル統一のため、開発依存関係から推測)。

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
  📖 100.md
  📖 102.md
  📖 104.md
  📖 105.md
  📖 106.md
  📖 109.md
  📖 111.md
  📖 112.md
  📖 113.md
  📖 114.md
  📖 116.md
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
  📖 50.md
  📖 52.md
  📖 53.md
  📖 55.md
  📖 57.md
  📖 58.md
  📖 59.md
  📖 61.md
  📖 63.md
  📖 66.md
  📖 68.md
  📖 70.md
  📖 74.md
  📖 76.md
  📖 78.md
  📖 80.md
  📖 82.md
  📖 84.md
  📖 86.md
  📖 88.md
  📖 90.md
  📖 92.md
  📖 94.md
  📖 96.md
  📖 98.md
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
📄 waveform-test.png
```

## ファイル詳細説明
- `index.html`: Webアプリケーションの入り口となるHTMLファイル。ユーザーインターフェースの構造を定義し、JavaScriptエントリポイントを読み込みます。
- `src/index.ts`: アプリケーション全体のメインエントリポイントとなるTypeScriptファイル。主に`synth.ts`の初期化を呼び出します。
- `src/synth.ts`: シンセサイザーの主要なビジネスロジックを格納するファイル。UIインタラクションの処理、オーディオレンダリングの調整、再生管理、および各モジュールの連携を担います。
- `src/wasmAudio.ts`: Rustで実装されたWASMオーディオ処理モジュールをWebアプリケーションに統合するためのTypeScriptラッパー。WASMモジュールの動的なロードと、その中のオーディオ処理関数へのアクセスを提供します。
- `src/wav.ts`: 処理されたオーディオデータをWAVファイル形式に変換し、ブラウザでダウンロード可能なURLとして提供する機能を持つファイルです。
- `src/settings.ts`: ユーザーが設定した各種パラメータ（波形タイプ、デューティー比、フィルター設定など）をブラウザのLocalStorageに保存・読み込み、JSON形式でのインポート/エクスポート機能を提供します。
- `src/oscilloscope.ts`: `cat-oscilloscope`ライブラリを利用して、生成されるオーディオ波形をリアルタイムでビジュアル表示するコンポーネントです。
- `src/audio-player.ts`: Tone.jsライブラリを使用して、Web Audio APIのオーディオコンテキストを管理し、オーディオ再生機能（WAVファイルの再生など）を提供します。
- `src/timing.ts`: BPM (Beats Per Minute) とビート数に基づいて、オーディオ生成や再生のタイミング、 duration（時間）を計算するユーティリティ関数を提供します。
- `src/ui-params.ts`: ユーザーインターフェース（UI）要素から各種パラメータ（例: テキスト入力やスライダーの値）を読み取り、またマウスの位置情報をフィルターのカットオフ周波数やレゾナンス（Q値）にマッピングするロジックを扱います。
- `src/performance-stats.ts`: オーディオ生成にかかる時間を計測し、平均値などの統計情報を計算・表示することで、アプリケーションのパフォーマンスを監視します。
- `src/full-waveform-display.ts`: リアルタイムの波形表示とは別に、生成されたオーディオデータの完全な波形全体を一度に表示する機能を提供します。
- `src/realtime-analysis.ts`: リアルタイムでオーディオのFFT（高速フーリエ変換）分析と波形表示を行い、周波数スペクトルや波形データを視覚化します。
- `wasm-audio/src/lib.rs`: Rust WASMモジュールのエントリポイント。他のRustファイルで定義されたオーディオ処理機能をJavaScriptに公開するためのインターフェースを定義します。
- `wasm-audio/src/oscillator.rs`: ノコギリ波やパルス波などの基本的なオーディオ波形を生成するためのアルゴリズムをRustで実装しています。
- `wasm-audio/src/filter.rs`: Biquadフィルター（ローパス、ハイパス、バンドパスなど）の計算ロジックをRustで実装しています。
- `wasm-audio/src/audio_renderer.rs`: オーディオの各フレームを、オシレーターとフィルター処理を適用してレンダリングする主要な処理をRustで実装しています。
- `DEVELOPMENT.md`: プロジェクトの開発フレームワークやテスト戦略に関する詳細なガイドラインを提供するドキュメントです。
- `docs/`: オシロスコープの使用方法、WASMセットアップの詳細、デプロイ検証など、様々な側面に関する追加のドキュメント群が格納されています。
- `scripts/install-wasm-pack.sh`: wasm-packツールのインストールを自動化するためのシェルスクリプトです。
- `scripts/*.js`: Playwrightを使用したエンドツーエンドテスト、デプロイ検証、GitHub Pagesのスクリーンショット取得など、開発やCI/CDプロセスで使用される各種ユーティリティスクリプトです。

## 関数詳細説明
- `init(src/synth.ts)`: シンセサイザーアプリケーションの起動時に呼び出され、UI要素の初期化、イベントリスナーの登録、WASMモジュールの初期化、およびオーディオコンテキストの開始を行います。
- `renderAudio(src/synth.ts)`: 現在のユーザー設定（波形タイプ、フィルターパラメータなど）に基づき、Rust WASMモジュールを呼び出して指定された長さのオーディオデータを生成します。
- `playAudio(src/synth.ts)`: `renderAudio`によって生成されたオーディオデータを、Tone.jsまたはWAV再生機能を通じてブラウザで再生します。
- `handleModeSwitch(src/synth.ts)`: 再生モード（例：リアルタイムシーケンス再生、非リアルタイムレンダリング後にWAV再生）を切り替え、UIの状態を更新します。
- `initWasm(src/wasmAudio.ts)`: RustでコンパイルされたWASMモジュールを非同期でロードし、JavaScriptからその機能が利用できるように初期化します。
- `renderAudioWasm(src/wasmAudio.ts)`: 初期化されたWASMモジュール内のオーディオレンダリング関数を呼び出し、Rust側で処理されたオーディオデータの配列（Float32Array）をJavaScript側に返します。
- `generateWav(src/wav.ts)`: 生のオーディオデータ配列（Float32Array）と必要なオーディオパラメータ（サンプルレート、チャンネル数など）を受け取り、標準的なWAVファイル形式のバイナリデータ（Blob）を生成します。
- `createWavBlobUrl(src/wav.ts)`: `generateWav`で生成されたWAV Blobから、ブラウザで直接再生したりダウンロードしたりできる一時的なURLを作成します。
- `loadSettings(src/settings.ts)`: ブラウザのLocalStorageに保存されている設定を読み込み、アプリケーションの初期状態に適用します。保存された設定がない場合は、デフォルト値をロードします。
- `saveSettings(src/settings.ts)`: アプリケーションの現在の設定状態をJSON形式でLocalStorageに保存し、次回起動時にその状態を復元できるようにします。
- `exportSettingsToFile(src/settings.ts)`: 現在の設定をJSON文字列としてファイルに変換し、ユーザーがローカルにダウンロードできるようにします。
- `importSettingsFromFile(src/settings.ts)`: ユーザーが選択したJSONファイルの内容を読み込み、アプリケーションの設定として適用します。
- `initOscilloscope(src/oscilloscope.ts)`: `cat-oscilloscope`ライブラリのインスタンスを初期化し、HTMLのCanvas要素にバインドして、波形表示の準備をします。
- `updateOscilloscope(src/oscilloscope.ts)`: 新しいオーディオデータを受け取り、それをオシロスコープに描画することで、波形をリアルタイムで更新します。
- `loadTone(src/audio-player.ts)`: Tone.jsライブラリを非同期でロードし、そのオーディオエンジンがWeb Audio APIを利用して機能できるように準備します。
- `startAudioContext(src/audio-player.ts)`: ユーザーの操作（クリックなど）をトリガーとして、Web Audio APIのオーディオコンテキストを開始し、音声出力が可能な状態にします。
- `mapMouseToFilterParams(src/ui-params.ts)`: マウスカーソルのX座標をフィルターのカットオフ周波数に、Y座標をレゾナンス（Q値）にマッピングし、インタラクティブなフィルター制御を実現します。
- `calculateDuration(src/timing.ts)`: 指定されたBPM (Beats Per Minute) とビート数に基づき、対応するオーディオの総再生時間（ミリ秒単位）を計算します。
- Rustモジュール内の主要な関数（`wasm-audio/src/`内のファイル群）:
    - `wasm-audio/src/oscillator.rs`内の関数: 指定された周波数、波形タイプ（ノコギリ波、パルス波）、デューティー比に基づいて、一連のオーディオサンプル（波形）を生成します。
    - `wasm-audio/src/filter.rs`内の関数: 入力されたオーディオサンプルにBiquadフィルターの計算を適用し、指定されたフィルタータイプ（LPF, HPFなど）、カットオフ周波数、Q値に応じたフィルタリングされた出力を生成します。
    - `wasm-audio/src/audio_renderer.rs`内の関数: オシレーターとフィルター処理を組み合わせて、一連のオーディオフレーム（またはバッファ）を効率的にレンダリングします。
    - `wasm-audio/src/lib.rs`内で公開される関数: 上記のRust DSP機能をJavaScriptから呼び出せるようにするためのエントリポイント（例: `render_audio_buffer`のような関数名がTypeScriptラッパーから呼ばれる）。

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
Generated at: 2026-02-09 07:05:25 JST
