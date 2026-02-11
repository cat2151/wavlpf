Last updated: 2026-02-12

# Project Overview

## プロジェクト概要
- Rust WASMで実装された、シンプルなソフトウェアシンセサイザーのWebアプリケーションです。
- 高速な信号処理により、ノコギリ波やパルス波を生成し、マウス操作でインタラクティブに多機能なBiquadフィルターを適用します。
- リアルタイム波形ビジュアライゼーション、WAVファイル生成、設定のインポート/エクスポート機能を提供します。

## 技術スタック
- フロントエンド: `Vite`（高速開発サーバー、ビルドツール）、`Tone.js`（オーディオ再生）、`cat-oscilloscope`（リアルタイムオシロスコープ表示）、HTML/CSS/TypeScript。
- 音楽・オーディオ: `Rust WASM`（高性能DSP処理、オシレーター、Biquadフィルター実装）、`WebAudio API`（間接的にTone.js経由）、`WAVフォーマット`（オーディオ出力）。
- 開発ツール: `Node.js`（実行環境）、`npm`（パッケージ管理）、`Rust`/`cargo`（Rust開発環境）、`wasm-pack`（Rust to WASMコンパイラ）、`playwright`（E2Eテスト、ブラウザ自動化）、`happy-dom`（VitestのDOM環境）。
- テスト: `Vitest`（高速ユニットテスト）、`@vitest/ui`（ビジュアルテストランナー）。
- ビルドツール: `Vite`（本番バンドル）、`wasm-pack`（WASMモジュールビルド）、`typescript`（TypeScriptコンパイル）、`wasm-opt`（WASM最適化）。
- 言語機能: `Rust`（高性能な信号処理ロジック）、`TypeScript`（堅牢なWebアプリケーション開発）。
- 自動化・CI/CD: `GitHub Actions`（CI/CDワークフロー）、`GitHub Pages`（自動デプロイプラットフォーム）。
- 開発標準: `Cargo.toml`（Rustプロジェクト設定）、`tsconfig.json`（TypeScript設定）。

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
  📖 118.md
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
```

## ファイル詳細説明
-   `.gitignore`: Gitによるバージョン管理から除外するファイルやディレクトリを指定します。
-   `DEVELOPMENT.md`: 開発フレームワーク、テスト戦略、前提条件、インストール、開発、ビルド、テストに関する詳細な開発者向けガイドです。
-   `LICENSE`: プロジェクトのライセンス情報（MITライセンス）を記載しています。
-   `README.ja.md`, `README.md`: プロジェクトの概要、機能、デモ、使い方、アーキテクチャなどを説明する主要なドキュメントで、日本語版と英語版があります。
-   `_config.yml`: GitHub PagesのJekyll設定ファイルです。
-   `copilot-instructions.md`: GitHub Copilotに関する指示やメモが記録されています。
-   `docs/`: プロジェクトに関する追加のドキュメントを格納するディレクトリです。
    -   `docs/CAT_OSCILLOSCOPE_WASM_SETUP.md`: `cat-oscilloscope`のWASMセットアップに関する技術詳細が記述されています。
    -   `docs/COPILOT_GITHUB_PAGES_ACCESS.md`: GitHub CopilotがGitHub Pagesにアクセスするための詳細情報です。
    -   `docs/DEPLOYMENT_VERIFICATION.md`: デプロイ検証に関するドキュメントです。
    -   `docs/OSCILLOSCOPE_LAYOUT.md`: オシロスコープのレイアウトに関するドキュメントです。
    -   `docs/OSCILLOSCOPE_USAGE.md`: オシロスコープの使用方法に関するガイドです。
-   `generated-docs/`: 自動生成されたドキュメントを格納するディレクトリです。
-   `index.html`: WebアプリケーションのエントリーポイントとなるHTMLファイルで、ユーザーインターフェースの骨格を定義しています。
-   `issue-notes/`: 過去のIssueに関するメモや詳細な情報を格納する開発者向けディレクトリです。
-   `package-lock.json`: `npm`の依存関係の正確なバージョンを記録し、ビルドの一貫性を保証します。
-   `package.json`: プロジェクトのメタデータ、依存関係、スクリプト（`dev`, `build`, `test`など）を定義するファイルです。
-   `scripts/`: 開発・ビルド・テスト・デプロイに関する補助スクリプトを格納するディレクトリです。
    -   `scripts/README.md`: スクリプトディレクトリの説明です。
    -   `scripts/install-wasm-pack.sh`: `wasm-pack`を自動インストールするシェルスクリプトです。
    -   `scripts/investigate-404.js`: GitHub Pagesの404エラーを調査するためのPlaywrightスクリプトです。
    -   `scripts/investigate-cat-oscilloscope.js`: `cat-oscilloscope`のリポジトリを調査するためのNode.jsスクリプトです。
    -   `scripts/screenshot-github-pages.js`: GitHub PagesのWebページのスクリーンショットを撮るためのPlaywrightスクリプトです。
    -   `scripts/setup-cat-oscilloscope-wasm.js`: `cat-oscilloscope`のWASMセットアップを行うJavaScriptスクリプトです。
    -   `scripts/test-console-logs.js`: コンソールログ出力をテストするためのPlaywrightスクリプトです。
    -   `scripts/test-pr-changes-locally.sh`: プルリクエストの変更をローカルでテストするためのシェルスクリプトです。
    -   `scripts/test-waveform-screenshot.js`: 波形ビジュアライゼーションのスクリーンショットをテストするためのPlaywrightスクリプトです。
    -   `scripts/verify-deployment.js`: GitHub Pagesへのデプロイが成功したことを検証するためのPlaywrightスクリプトです。
-   `src/`: アプリケーションの主要なTypeScriptソースコードを格納するディレクトリです。
    -   `src/audio-player.ts`: Tone.jsライブラリを利用して、オーディオコンテキストの管理、再生、停止などを行う機能を提供します。
    -   `src/full-waveform-display.test.ts`: 全波形表示機能に関するユニットテストコードです。
    -   `src/full-waveform-display.ts`: 生成されたオーディオデータ全体をキャンバスに描画するUIコンポーネントです。
    -   `src/index.ts`: アプリケーションのエントリーポイントとなるTypeScriptファイルで、シンセサイザーの初期化を行います。
    -   `src/oscilloscope.test.ts`: リアルタイムオシロスコープ表示機能に関するユニットテストコードです。
    -   `src/oscilloscope.ts`: `cat-oscilloscope`ライブラリを使用してリアルタイムで波形を表示するUIコンポーネントです。
    -   `src/performance-stats.test.ts`: パフォーマンス統計機能に関するユニットテストコードです。
    -   `src/performance-stats.ts`: オーディオ生成時間などのパフォーマンス統計を収集し、計算する機能を提供します。
    -   `src/playback-mode.ts`: アプリケーションの再生モード（リアルタイム、非リアルタイムなど）を管理し、UIを更新する機能です。
    -   `src/realtime-analysis.test.ts`: リアルタイム分析・ビジュアライゼーション機能に関するユニットテストコードです。
    -   `src/realtime-analysis.ts`: Tone.jsとWebAudio APIを利用してFFTや波形をリアルタイムで分析・描画する機能です。
    -   `src/settings.test.ts`: アプリケーション設定の保存、読み込み、インポート、エクスポート機能に関するユニットテストコードです。
    -   `src/settings.ts`: アプリケーションの設定（波形タイプ、フィルターパラメータなど）を管理し、localStorageやJSONファイルでの永続化を処理します。
    -   `src/synth.ts`: シンセサイザーアプリケーションの主要なロジックを格納するファイルです。UIからの入力処理、オーディオレンダリング、再生、状態更新、フィルターパラメータのマッピングなどを担当します。
    -   `src/timing.test.ts`: オーディオ生成のタイミング計算機能に関するユニットテストコードです。
    -   `src/timing.ts`: BPMとビート数に基づいてオーディオの持続時間などを計算するユーティリティ機能です。
    -   `src/ui-params.test.ts`: UIパラメータの読み取り・更新機能に関するユニットテストコードです。
    -   `src/ui-params.ts`: UI要素からのパラメータ読み取り、UIフィールドの更新、マウス座標からフィルターパラメータへのマッピングを行う機能です。
    -   `src/wasmAudio.ts`: Rust WASMモジュールをロードし、オーディオレンダリングを呼び出すためのTypeScriptラッパーです。
    -   `src/wav.test.ts`: WAVファイル生成機能に関するユニットテストコードです。
    -   `src/wav.ts`: 処理済みオーディオデータをWAVファイルフォーマットに変換し、ブラウザで再生可能なBlob URLを生成する機能です。
-   `tsconfig.json`: TypeScriptコンパイラのオプション設定を定義するファイルです。
-   `vite.config.ts`: Viteビルドツールの設定ファイルです。
-   `wasm-audio/`: Rustで実装されたWASMモジュールを格納するディレクトリです。
    -   `wasm-audio/Cargo.toml`: Rustクレートのメタデータと依存関係を定義するファイルです。
    -   `wasm-audio/README.md`: WASMモジュールの説明です。
    -   `wasm-audio/src/`: Rustソースコードを格納するディレクトリです。
        -   `wasm-audio/src/audio_renderer.rs`: オーディオレンダリングのロジックを実装しています。
        -   `wasm-audio/src/filter.rs`: Biquadフィルターの計算ロジックを実装しています。
        -   `wasm-audio/src/lib.rs`: Rust WASMモジュールのエントリポイントで、オシレーター生成、フィルター処理、オーディオレンダリングの全体的なパイプラインを統合します。
        -   `wasm-audio/src/oscillator.rs`: ノコギリ波やパルス波などのオシレーター生成ロジックを実装しています。

## 関数詳細説明
-   `investigate404()` (scripts/investigate-404.js): GitHub Pagesの404エラーを調査するため、Playwrightを使用して特定のURLへのアクセスと検証を行います。
-   `checkGitHubRepo()` (scripts/investigate-cat-oscilloscope.js): GitHubリポジトリの存在と内容をHTTPSリクエストで確認します。
-   `investigate()` (scripts/investigate-cat-oscilloscope.js): `cat-oscilloscope`関連の調査を行います。
-   `takeScreenshot()` (scripts/screenshot-github-pages.js): Playwrightを使用してGitHub PagesのWebページのスクリーンショットを撮影します。
-   `testConsoleLogs()` (scripts/test-console-logs.js): Playwrightを使用してWebアプリケーションのコンソールログ出力を監視し、期待されるログやエラーがないかをテストします。
-   `testWaveformVisualization()` (scripts/test-waveform-screenshot.js): Playwrightを使用して波形ビジュアライゼーションが正しく表示されているか、スクリーンショットを撮って検証します。
-   `verifyDeployment()` (scripts/verify-deployment.js): Playwrightを使用してGitHub Pagesへのデプロイが成功し、アプリケーションが期待通りに動作しているかを検証します。
-   `loadTone()` (src/audio-player.ts): Tone.jsライブラリのインスタンスをロードし、初期化します。
-   `isToneLoaded()` (src/audio-player.ts): Tone.jsがロード済みであるかを確認します。戻り値: `boolean`。
-   `getTone()` (src/audio-player.ts): ロード済みのTone.jsインスタンスを返します。戻り値: `Tone.js`インスタンス。
-   `startAudioContext()` (src/audio-player.ts): Web Audio APIのオーディオコンテキストを開始します。
-   `isAudioContextRunning()` (src/audio-player.ts): オーディオコンテキストが実行中であるかを確認します。戻り値: `boolean`。
-   `playWavUrl(url: string)` (src/audio-player.ts): 指定されたWAVファイルのURLをTone.jsで再生します。引数: `url` (WAVファイルのURL)。
-   `stopAndCleanup()` (src/audio-player.ts): 現在再生中のオーディオを停止し、関連するリソースをクリーンアップします。
-   `initFullWaveformDisplay(canvasId: string)` (src/full-waveform-display.ts): 全波形表示用のキャンバスを初期化します。引数: `canvasId` (キャンバスのDOM ID)。
-   `drawFullWaveform(data: Float32Array, sampleRate: number)` (src/full-waveform-display.ts): オーディオデータ全体をキャンバスに描画します。引数: `data` (オーディオデータ), `sampleRate` (サンプルレート)。
-   `clearFullWaveform()` (src/full-waveform-display.ts): 全波形表示キャンバスをクリアします。
-   `disposeFullWaveformDisplay()` (src/full-waveform-display.ts): 全波形表示に関連するリソースを解放します。
-   `isFullWaveformDisplayInitialized()` (src/full-waveform-display.ts): 全波形表示が初期化されているかを確認します。戻り値: `boolean`。
-   `initOscilloscope(canvasId: string, audioContext: AudioContext)` (src/oscilloscope.ts): `cat-oscilloscope`を使用してオシロスコープを初期化します。引数: `canvasId` (キャンバスID), `audioContext` (Web Audio APIのコンテキスト)。
-   `startDebugOverlayUpdates()` (src/oscilloscope.ts): デバッグオーバーレイの更新を開始します。
-   `stopDebugOverlayUpdates()` (src/oscilloscope.ts): デバッグオーバーレイの更新を停止します。
-   `frequencyToNote(frequency: number)` (src/oscilloscope.ts): 周波数を音名とオクターブに変換します。引数: `frequency` (周波数)。戻り値: `string` (例: "A4")。
-   `validateInputs()` (src/oscilloscope.ts): 入力値の検証を行います。
-   `updateOscilloscope(data: Float32Array)` (src/oscilloscope.ts): オシロスコープに表示する波形データを更新します。引数: `data` (波形データ)。
-   `stopOscilloscope()` (src/oscilloscope.ts): オシロスコープの表示を停止し、関連リソースを解放します。
-   `isOscilloscopeInitialized()` (src/oscilloscope.ts): オシロスコープが初期化されているかを確認します。戻り値: `boolean`。
-   `createPerformanceStats()` (src/performance-stats.ts): パフォーマンス統計オブジェクトを初期化します。
-   `addPerformanceSample(sample: number)` (src/performance-stats.ts): 新しいパフォーマンス測定値を追加します。引数: `sample` (測定値)。
-   `calculatePerformanceStats()` (src/performance-stats.ts): 収集されたパフォーマンス統計を計算します。戻り値: 統計オブジェクト。
-   `resetPerformanceStats()` (src/performance-stats.ts): パフォーマンス統計をリセットします。
-   `getCurrentMode()` (src/playback-mode.ts): 現在の再生モードを取得します。戻り値: `string` (モード名)。
-   `updateModeUI(mode: string)` (src/playback-mode.ts): UI上の再生モード表示を更新します。引数: `mode` (モード名)。
-   `switchMode(newMode: string)` (src/playback-mode.ts): 再生モードを切り替えます。引数: `newMode` (新しいモード名)。
-   `initRealtimeAnalysis(analyser: AnalyserNode, bufferLength: number, canvasId: string)` (src/realtime-analysis.ts): リアルタイム分析・ビジュアライゼーション用のキャンバスとアナライザーを初期化します。引数: `analyser` (Web Audio APIのアナライザーノード), `bufferLength` (バッファサイズ), `canvasId` (キャンバスID)。
-   `startRealtimeVisualization()` (src/realtime-analysis.ts): リアルタイムのFFTおよび波形ビジュアライゼーションを開始します。
-   `stopRealtimeVisualization()` (src/realtime-analysis.ts): リアルタイムビジュアライゼーションを停止します。
-   `animate()` (src/realtime-analysis.ts): ビジュアライゼーションの描画ループ（アニメーションフレーム）を処理します。
-   `drawFFT(data: Uint8Array)` (src/realtime-analysis.ts): 周波数スペクトル（FFT）をキャンバスに描画します。引数: `data` (FFTデータ)。
-   `drawWaveform(data: Uint8Array)` (src/realtime-analysis.ts): リアルタイムの波形をキャンバスに描画します。引数: `data` (波形データ)。
-   `isRealtimeAnalysisInitialized()` (src/realtime-analysis.ts): リアルタイム分析が初期化されているかを確認します。戻り値: `boolean`。
-   `disposeRealtimeAnalysis()` (src/realtime-analysis.ts): リアルタイム分析に関連するリソースを解放します。
-   `validateSettings(settings: object)` (src/settings.ts): 与えられた設定オブジェクトを検証し、不正な値がないかチェックします。引数: `settings` (設定オブジェクト)。戻り値: `object` (検証済みの設定オブジェクト)。
-   `loadSettings()` (src/settings.ts): localStorageから設定をロードします。戻り値: `object` (ロードされた設定)。
-   `saveSettings(settings: object)` (src/settings.ts): 現在の設定をlocalStorageに保存します。引数: `settings` (保存する設定オブジェクト)。
-   `exportSettingsToFile(settings: object)` (src/settings.ts): 現在の設定をJSONファイルとしてエクスポートします。引数: `settings` (エクスポートする設定オブジェクト)。
-   `importSettingsFromFile()` (src/settings.ts): JSONファイルから設定をインポートします。戻り値: `Promise<object>` (インポートされた設定)。
-   `getCurrentSettings()` (src/synth.ts): 現在のシンセサイザー設定を取得します。
-   `displayOscilloscopeError(message: string)` (src/synth.ts): オシロスコープ関連のエラーメッセージをUIに表示します。引数: `message` (エラーメッセージ)。
-   `readParameters()` (src/synth.ts): UIからシンセサイザーの各種パラメータを読み取ります。
-   `renderAudio(settings: object, audioLengthSeconds: number)` (src/synth.ts): 指定された設定と時間に基づいてオーディオ信号をレンダリングします。引数: `settings` (シンセサイザー設定), `audioLengthSeconds` (オーディオの長さ)。戻り値: `Promise<Float32Array>` (レンダリングされたオーディオデータ)。
-   `playAudioWav(audioData: Float32Array, sampleRate: number)` (src/synth.ts): レンダリングされたオーディオデータをWAV形式で再生します。引数: `audioData` (オーディオデータ), `sampleRate` (サンプルレート)。
-   `playAudioSeq(audioData: Float32Array, sampleRate: number)` (src/synth.ts): レンダリングされたオーディオデータをシーケンシャルに再生します。引数: `audioData` (オーディオデータ), `sampleRate` (サンプルレート)。
-   `playAudio(settings: object, audioData: Float32Array, sampleRate: number)` (src/synth.ts): レンダリングされたオーディオデータを再生します。引数: `settings` (シンセサイザー設定), `audioData` (オーディオデータ), `sampleRate` (サンプルレート)。
-   `handleModeSwitch()` (src/synth.ts): 再生モードが切り替えられた際の処理を行います。
-   `init()` (src/synth.ts): シンセサイザーアプリケーション全体を初期化します。
-   `scheduleNextPlay()` (src/synth.ts): 次のオーディオ再生をスケジュールします。
-   `updateStatusDisplay(message: string)` (src/synth.ts): アプリケーションのステータス表示を更新します。引数: `message` (表示メッセージ)。
-   `updateGenerationTimeDisplay(timeMs: number)` (src/synth.ts): オーディオ生成にかかった時間をUIに表示します。引数: `timeMs` (生成時間[ミリ秒])。
-   `dispose()` (src/synth.ts): シンセサイザーに関連するリソースを解放します。
-   `handleInputChange()` (src/synth.ts): UI上の入力要素が変更されたときのイベントを処理します。
-   `handleClick()` (src/synth.ts): UI上の要素がクリックされたときのイベントを処理します。
-   `calculateDuration(bpm: number, beats: number)` (src/timing.ts): BPMとビート数に基づいてオーディオの持続時間（秒）を計算します。引数: `bpm` (1分あたりの拍数), `beats` (ビート数)。戻り値: `number` (持続時間[秒])。
-   `readNumericParameter(id: string, defaultValue: number)` (src/ui-params.ts): 指定されたIDのUI入力要素から数値パラメータを読み取ります。引数: `id` (DOM ID), `defaultValue` (デフォルト値)。戻り値: `number`。
-   `readParametersFromUI()` (src/ui-params.ts): UI上のすべてのパラメータを読み取ってオブジェクトとして返します。戻り値: `object` (パラメータオブジェクト)。
-   `updateUIFields(settings: object)` (src/ui-params.ts): 指定された設定オブジェクトに基づいてUIの入力フィールドを更新します。引数: `settings` (設定オブジェクト)。
-   `mapMouseToFilterParams(x: number, y: number, settings: object)` (src/ui-params.ts): マウスのX/Y座標をフィルターのカットオフ周波数とQ値にマッピングします。引数: `x` (マウスX座標), `y` (マウスY座標), `settings` (シンセサイザー設定)。戻り値: `object` (フィルターパラメータ)。
-   `updateMousePositionDisplay(x: number, y: number, cutoffHz: number, qValue: number)` (src/ui-params.ts): マウス位置と対応するフィルターパラメータをUIに表示します。引数: `x`, `y`, `cutoffHz`, `qValue`。
-   `initWasm()` (src/wasmAudio.ts): Rust WASMモジュールをロードし、初期化します。
-   `isWasmInitialized()` (src/wasmAudio.ts): WASMモジュールが初期化されているかを確認します。戻り値: `boolean`。
-   `renderAudioWasm(sampleRate: number, settings: object, audioLengthSeconds: number)` (src/wasmAudio.ts): WASMモジュールを呼び出し、オーディオをレンダリングします。引数: `sampleRate` (サンプルレート), `settings` (シンセサイザー設定), `audioLengthSeconds` (オーディオの長さ)。戻り値: `Promise<Float32Array>` (レンダリングされたオーディオデータ)。
-   `generateWav(audioData: Float32Array, sampleRate: number)` (src/wav.ts): 生のオーディオデータとサンプルレートからWAVファイルフォーマットの`ArrayBuffer`を生成します。引数: `audioData` (オーディオデータ), `sampleRate` (サンプルレート)。戻り値: `ArrayBuffer`。
-   `writeString(view: DataView, offset: number, string: string)` (src/wav.ts): `DataView`に文字列を書き込みます。引数: `view` (データビュー), `offset` (書き込み開始オフセット), `string` (書き込む文字列)。
-   `createWavBlobUrl(audioData: Float32Array, sampleRate: number)` (src/wav.ts): オーディオデータからWAV形式のBlob URLを生成します。引数: `audioData` (オーディオデータ), `sampleRate` (サンプルレート)。戻り値: `string` (Blob URL)。

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
Generated at: 2026-02-12 07:08:04 JST
