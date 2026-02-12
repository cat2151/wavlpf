Last updated: 2026-02-13

# Project Overview

## プロジェクト概要
- Rust WASMで実装された、ローパスフィルター（LPF）を搭載したシンプルなソフトウェアシンセサイザーです。
- ノコギリ波またはパルス波ジェネレーターとインタラクティブなBiquadフィルターにより、動的なサウンドを生成します。
- リアルタイムオシロスコープ表示、WAVファイル生成、設定の永続化機能を備えたWebアプリケーションです。

## 技術スタック
- フロントエンド:
    -   **HTML**: アプリケーションのユーザーインターフェース構造を定義します。
    -   **TypeScript**: 型安全なJavaScript開発を可能にし、アプリケーションのロジックを構築します。
    -   **Vite**: 高速な開発サーバーとモダンなビルドプロセスを提供し、開発体験を向上させます。
- 音楽・オーディオ:
    -   **Rust WASM**: 高性能なデジタル信号処理（DSP）ロジック（オシレーター、Biquadフィルター）を実装し、Webブラウザで実行します。
    -   **Tone.js**: Web Audio APIを抽象化し、クリーンなオーディオ再生とオーディオコンテキスト管理を可能にします。
    -   **cat-oscilloscope**: Rust/WASMベースで実装された、リアルタイムな波形ビジュアライゼーションを提供します。
- 開発ツール:
    -   **Node.js/npm**: プロジェクトの依存関係管理、スクリプト実行環境として機能します。
    -   **Rustup/cargo**: Rust開発環境の管理と、Rustクレートのビルドをサポートします。
    -   **wasm-pack**: RustコードをWebAssemblyモジュールにコンパイルし、JavaScriptから利用可能なバインディングを生成します。
    -   **Playwright**: E2E（エンドツーエンド）テスト、スクリーンショット取得、デプロイ検証のための自動化ツールとして使用されます。
- テスト:
    -   **Vitest**: TypeScriptベースのコードに対する高速な単体・統合テストフレームワークです。
    -   **happy-dom**: Vitestテスト内でDOM環境をシミュレートし、ブラウザAPIに依存するコンポーネントのテストを可能にします。
    -   **Playwright**: アプリケーションの全体的な動作とUIインタラクションを検証するためのE2Eテストを実行します。
- ビルドツール:
    -   **Vite**: フロントエンドアセット（HTML, CSS, JS）のバンドルと最適化を行います。
    -   **wasm-pack**: Rustで記述されたオーディオ信号処理モジュールをWebAssembly形式にビルドします。
    -   **TypeScriptコンパイラ**: TypeScriptコードをJavaScriptに変換します。
- 言語機能:
    -   **Rust**: パフォーマンスが要求されるオーディオ信号処理のコアロジックを実装するために使用されます。
    -   **WebAssembly (WASM)**: Rustで書かれた高性能コードをWebブラウザ上でネイティブに近い速度で実行可能にします。
    -   **TypeScript**: 大規模なJavaScriptアプリケーション開発において、型安全性とコードの可読性、保守性を向上させます。
- 自動化・CI/CD:
    -   **GitHub Actions**: コードのプッシュ時に自動テスト（CI）とGitHub Pagesへのデプロイ（CD）を実行するワークフローを定義します。
- 開発標準:
    -   **tsconfig.json**: TypeScriptのコンパイルオプションとプロジェクト設定を定義し、コードの品質と一貫性を保ちます。
    -   **DEVELOPMENT.md**: 開発フレームワーク、テスト戦略、コーディング規約など、プロジェクト開発に関するガイドラインを提供します。

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
📄 waveform-gh.png
```

## ファイル詳細説明
-   `.gitignore`: Gitのバージョン管理から除外するファイルやディレクトリを指定する設定ファイルです。
-   `DEVELOPMENT.md`: プロジェクトの開発フレームワークやテスト戦略に関する詳細な開発者向けガイドです。
-   `LICENSE`: プロジェクトの配布条件を定めるMITライセンスファイルです。
-   `README.ja.md`: プロジェクトの概要、機能、使い方などを日本語で説明するメインドキュメントです。
-   `README.md`: プロジェクトの概要、機能、使い方などを英語で説明するメインドキュメントです。
-   `_config.yml`: GitHub Pagesで使用されるJekyllサイトジェネレータの設定ファイルです。
-   `copilot-instructions.md`: GitHub Copilotの使用に関する指示やガイドラインが記述されたドキュメントです。
-   `docs/CAT_OSCILLOSCOPE_WASM_SETUP.md`: `cat-oscilloscope`ライブラリのWASMセットアップに関する技術詳細を説明するドキュメントです。
-   `docs/COPILOT_GITHUB_PAGES_ACCESS.md`: CopilotのGitHub Pagesアクセスに関する情報を記述したドキュメントです。
-   `docs/DEPLOYMENT_VERIFICATION.md`: デプロイ後のアプリケーションの検証手順に関するドキュメントです。
-   `docs/OSCILLOSCOPE_LAYOUT.md`: オシロスコープのレイアウト設計に関するドキュメントです。
-   `docs/OSCILLOSCOPE_USAGE.md`: `cat-oscilloscope`の現在の実装と使用方法に関する日本語の使用ガイドです。
-   `generated-docs/`: （現在空）自動生成されたドキュメントを格納するためのディレクトリです。
-   `index.html`: Webアプリケーションのエントリーポイントであり、ユーザーインターフェースの骨格を定義します。
-   `issue-notes/`: 過去の特定の課題や機能に関するメモが格納されているディレクトリです。
-   `package-lock.json`: `npm install`時に生成され、依存関係の正確なバージョンとそのツリーを記録するファイルです。
-   `package.json`: プロジェクトのメタデータ、スクリプト、開発および本番環境の依存関係を定義するファイルです。
-   `scripts/README.md`: `scripts`ディレクトリ内の各種ユーティリティスクリプトに関する説明です。
-   `scripts/install-wasm-pack.sh`: `wasm-pack`ツールを自動でインストールするためのシェルスクリプトです。
-   `scripts/investigate-404.js`: GitHub Pagesで発生する可能性のある404エラーを調査するためのPlaywrightスクリプトです。
-   `scripts/investigate-cat-oscilloscope.js`: `cat-oscilloscope`リポジトリの状況を調査するためのスクリプトです。
-   `scripts/screenshot-github-pages.js`: GitHub Pagesで公開されているWebサイトのスクリーンショットを自動で取得するためのPlaywrightスクリプトです。
-   `scripts/setup-cat-oscilloscope-wasm.js`: `cat-oscilloscope`のWASMモジュールをセットアップするためのスクリプトです。
-   `scripts/test-console-logs.js`: デプロイされたアプリケーションのコンソールログをテストするためのPlaywrightスクリプトです。
-   `scripts/test-pr-changes-locally.sh`: プルリクエストの変更をローカル環境でテストするためのシェルスクリプトです。
-   `scripts/test-waveform-screenshot.js`: 波形ビジュアライゼーションが正しく表示されるかをスクリーンショットでテストするPlaywrightスクリプトです。
-   `scripts/verify-deployment.js`: GitHub Pagesへのデプロイが成功し、アプリケーションが正常に動作しているかを検証するためのPlaywrightスクリプトです。
-   `src/audio-player.ts`: Tone.jsライブラリをラップし、オーディオコンテキストの管理とWAVファイルの再生機能を担当します。
-   `src/full-waveform-display.test.ts`: 全波形表示機能に関連するユニットテストを記述したファイルです。
-   `src/full-waveform-display.ts`: 生成されたオーディオの全波形を描画・管理するTypeScriptモジュールです。
-   `src/index.ts`: アプリケーションのメインエントリーポイントであり、`synth.ts`モジュールの初期化を行います。
-   `src/oscilloscope.test.ts`: オシロスコープ表示機能に関連するユニットテストを記述したファイルです。
-   `src/oscilloscope.ts`: `cat-oscilloscope`ライブラリを統合し、リアルタイム波形表示とデバッグオーバーレイの更新を管理します。
-   `src/performance-stats.test.ts`: オーディオ生成パフォーマンス統計に関連するユニットテストを記述したファイルです。
-   `src/performance-stats.ts`: オーディオ生成にかかる時間を計測し、統計情報（平均、最小、最大）を提供するモジュールです。
-   `src/playback-mode.ts`: アプリケーションの再生モード（例: リアルタイム、非リアルタイム）を制御し、UIの状態を更新するモジュールです。
-   `src/realtime-analysis.test.ts`: リアルタイム分析機能に関連するユニットテストを記述したファイルです。
-   `src/realtime-analysis.ts`: リアルタイムでFFT（スペクトル）と波形データを可視化する機能を提供します。
-   `src/settings.test.ts`: アプリケーションの設定のロード、保存、インポート、エクスポート機能に関連するユニットテストを記述したファイルです。
-   `src/settings.ts`: アプリケーションの設定（フィルターパラメータ、波形タイプなど）を管理し、ローカルストレージやJSONファイルでの永続化を処理します。
-   `src/synth.ts`: シンセサイザーの中核ロジックを実装しており、UI操作、オーディオレンダリング、再生のフローを制御します。
-   `src/timing.test.ts`: オーディオ生成のタイミング計算機能に関連するユニットテストを記述したファイルです。
-   `src/timing.ts`: BPMとビートに基づいてオーディオの正確なデュレーション（再生時間）を計算するユーティリティ関数を提供します。
-   `src/ui-params.test.ts`: UIパラメータの読み取りとマウス位置からフィルターパラメータへのマッピング機能に関連するユニットテストを記述したファイルです。
-   `src/ui-params.ts`: UI要素からユーザー入力を読み取り、マウスの座標をシンセサイザーのフィルターパラメータにマッピングし、UI表示を更新します。
-   `src/wasmAudio.ts`: Rustで実装されたWASMオーディオモジュールをTypeScriptから利用するためのラッパーを提供し、動的なロードとパフォーマンス測定を行います。
-   `src/wav.test.ts`: WAVファイル生成機能に関連するユニットテストを記述したファイルです。
-   `src/wav.ts`: 生のオーディオデータを標準のWAVファイルフォーマットに変換し、再生可能なBlob URLを生成するモジュールです。
-   `tsconfig.json`: TypeScriptコンパイラのオプション、コンパイル対象ファイル、および出力設定を定義する設定ファイルです。
-   `vite.config.ts`: Viteビルドツールの設定ファイルで、プラグイン、エイリアス、ビルドオプションなどを構成します。
-   `wasm-audio/Cargo.toml`: Rust WASMモジュールの依存関係、メタデータ、およびビルド設定を定義するCargo設定ファイルです。
-   `wasm-audio/README.md`: Rustで実装されたオーディオ処理WASMモジュールに関する説明ドキュメントです。
-   `wasm-audio/src/audio_renderer.rs`: WASMモジュール内でオーディオサンプルを生成し、処理されたオーディオバッファを生成するロジックを実装します。
-   `wasm-audio/src/filter.rs`: Biquadフィルター（LPF, HPFなど）の計算ロジックをRustで実装します。
-   `wasm-audio/src/lib.rs`: Rust WASMモジュールのエントリーポイントであり、オシレーター、フィルター、オーディオレンダリングを含む主要な信号処理パイプラインをエクスポートします。
-   `wasm-audio/src/oscillator.rs`: ノコギリ波やパルス波などの波形を生成するオシレーターロジックをRustで実装します。
-   `waveform-gh.png`: GitHubのREADMEなどに表示するための波形イメージファイルです。

## 関数詳細説明
-   `addPerformanceSample(sample: number)` (src/performance-stats.ts): オーディオ生成にかかった時間（ミリ秒）をパフォーマンス計測リストに追加します。
-   `animate()` (src/realtime-analysis.ts): リアルタイムのFFTおよび波形ビジュアライゼーションのアニメーションフレームを更新します。
-   `calculateDuration(bpm: number, beats: number)` (src/timing.ts): 指定されたBPMとビート数に基づいて、オーディオの合計再生時間（秒単位）を計算します。
-   `calculatePerformanceStats()` (src/performance-stats.ts): 収集されたパフォーマンスサンプルから、平均、最小、最大、合計の生成時間統計を計算し返します。
-   `canvasSupported()` (src/oscilloscope.test.ts): テスト環境でHTML Canvas要素がサポートされているかを確認します（テスト用途）。
-   `checkGitHubRepo(repoUrl: string)` (scripts/investigate-cat-oscilloscope.js): 指定されたGitHubリポジトリのURLがアクセス可能であるか、または存在するかを確認します。
-   `clearFullWaveform()` (src/full-waveform-display.ts): 全波形表示用のCanvasをクリアし、現在の描画を消去します。
-   `createPerformanceStats()` (src/performance-stats.ts): 新しいパフォーマンス統計トラッカーオブジェクトを初期化して返します。
-   `createWavBlobUrl(audioBuffer: Float32Array, sampleRate: number)` (src/wav.ts): 生のオーディオデータ（Float32Array）とサンプルレートから、WAV形式のBlob URLを生成し返します。
-   `displayOscilloscopeError(message: string)` (src/synth.ts): オシロスコープに関連するエラーメッセージをユーザーインターフェースに表示します。
-   `dispose()` (src/synth.ts): シンセサイザーアプリケーション全体のリソースを解放し、イベントリスナーを解除してクリーンアップします。
-   `disposeFullWaveformDisplay()` (src/full-waveform-display.ts): 全波形表示に関連するリソース（Canvasコンテキストなど）を解放します。
-   `disposeRealtimeAnalysis()` (src/realtime-analysis.ts): リアルタイム分析モジュールに関連するリソース（AnalyserNode, Canvasなど）を解放します。
-   `drawFFT(analyser: AnalyserNode, canvasCtx: CanvasRenderingContext2D, canvas: HTMLCanvasElement)` (src/realtime-analysis.ts): Web Audio APIのAnalyserNodeからFFTデータを取得し、Canvasにスペクトルアナライザとして描画します。
-   `drawFullWaveform(data: Float32Array)` (src/full-waveform-display.ts): 与えられたオーディオデータ（Float32Array）全体をCanvasに波形として描画します。
-   `drawWaveform(analyser: AnalyserNode, canvasCtx: CanvasRenderingContext2D, canvas: HTMLCanvasElement)` (src/realtime-analysis.ts): Web Audio APIのAnalyserNodeから時系列の波形データを取得し、Canvasに描画します。
-   `exportSettingsToFile()` (src/settings.ts): 現在のアプリケーション設定をJSON形式でファイルとしてダウンロードできるようにエクスポートします。
-   `frequencyToNote(frequency: number)` (src/oscilloscope.ts): 指定された周波数（Hz）を音楽のノート名（例: "A4"）に変換して返します。
-   `generateWav(audioBuffer: Float32Array, sampleRate: number)` (src/wav.ts): 生のオーディオデータ（Float32Array）とサンプルレートから、RIFF/WAV形式のArrayBufferを生成し返します。
-   `getCurrentMode()` (src/playback-mode.ts): 現在アクティブなアプリケーションの再生モード（例: 'REALTIME', 'NON_REALTIME'）を文字列で返します。
-   `getCurrentSettings()` (src/synth.ts): アプリケーションのUIから現在のシンセサイザーパラメータ設定を読み取り、オブジェクトとして返します。
-   `getTone()` (src/audio-player.ts): Tone.jsライブラリのインスタンス（またはそのメインオブジェクト）を返します。
-   `handleClick(event: MouseEvent)` (src/synth.ts): ユーザーインターフェース上のクリックイベントを処理し、オーディオコンテキストの開始やモード切り替えなどを行います。
-   `handleInputChange(event: Event)` (src/synth.ts): UIの入力フィールド（スライダー、テキストボックスなど）の変更イベントを処理し、シンセサイザーのパラメータを更新します。
-   `handleModeSwitch()` (src/synth.ts): 再生モードの切り替えを管理し、関連するUIやオーディオ処理の状態を更新します。
-   `importSettingsFromFile()` (src/settings.ts): ユーザーが選択したJSONファイルから設定を読み込み、現在のアプリケーション設定を更新します。
-   `init()` (src/synth.ts): シンセサイザーアプリケーション全体を初期化し、UI要素、イベントリスナー、オーディオコンポーネントを設定します。
-   `initFullWaveformDisplay()` (src/full-waveform-display.ts): 全波形表示用のCanvas要素と2D描画コンテキストを初期化します。
-   `initOscilloscope(canvas: HTMLCanvasElement)` (src/oscilloscope.ts): `cat-oscilloscope`ライブラリを初期化し、指定されたCanvas要素に波形表示を設定します。
-   `initRealtimeAnalysis()` (src/realtime-analysis.ts): リアルタイム分析とビジュアライゼーションに必要なWeb Audio APIノード（AnalyserNode）とCanvasを設定します。
-   `initWasm()` (src/wasmAudio.ts): RustでコンパイルされたWASMオーディオモジュールを非同期でロードし、初期化します。
-   `investigate()` (scripts/investigate-cat-oscilloscope.js): `cat-oscilloscope`リポジトリの状態に関する詳細な調査を実行します。
-   `investigate404()` (scripts/investigate-404.js): GitHub Pagesの404エラーに関連する様々な側面を調査するメイン関数です。
-   `isAudioContextRunning()` (src/audio-player.ts): Web Audio APIのオーディオコンテキストが現在実行中（'running'）の状態であるかを確認します。
-   `isFullWaveformDisplayInitialized()` (src/full-waveform-display.ts): 全波形表示機能が初期化済みであるかを確認します。
-   `isOscilloscopeInitialized()` (src/oscilloscope.ts): オシロスコープ表示機能が初期化済みであるかを確認します。
-   `isRealtimeAnalysisInitialized()` (src/realtime-analysis.ts): リアルタイム分析モジュールが初期化済みであるかを確認します。
-   `isToneLoaded()` (src/audio-player.ts): Tone.jsライブラリが完全にロードされ、利用可能であるかを確認します。
-   `isWasmInitialized()` (src/wasmAudio.ts): Rust WASMオーディオモジュールが正常にロードされ、初期化済みであるかを確認します。
-   `loadSettings()` (src/settings.ts): ブラウザのローカルストレージからアプリケーション設定を読み込み、バリデーションして返します。
-   `loadTone()` (src/audio-player.ts): Tone.jsライブラリのインスタンスを非同期でロードし、利用可能にします。
-   `mapMouseToFilterParams(mouseX: number, mouseY: number, element: HTMLElement)` (src/ui-params.ts): UI要素内でのマウスのX/Y座標を、フィルターのカットオフ周波数とQ値にマッピングします。
-   `playAudio()` (src/synth.ts): 現在の設定に基づいてオーディオの生成と再生を開始するためのラッパー関数です。
-   `playAudioSeq()` (src/synth.ts): シーケンシャルなオーディオ再生ロジックを処理します。
-   `playAudioWav()` (src/synth.ts): 生成されたWAVデータ（Blob URL）を使用してオーディオを再生します。
-   `playWavUrl(url: string)` (src/audio-player.ts): 指定されたWAV形式のURLからオーディオを読み込み、Tone.jsを使用して再生を開始します。
-   `readNumericParameter(id: string, min: number, max: number, defaultValue: number)` (src/ui-params.ts): UIの数値入力フィールドから値を取得し、指定された範囲内で検証し、必要に応じてデフォルト値を適用します。
-   `readParameters()` (src/synth.ts): UIからすべてのシンセサイザーパラメータ（波形タイプ、デューティー比、フィルター設定など）を読み込みます。
-   `readParametersFromUI()` (src/ui-params.ts): UIのすべての入力フィールドから現在のパラメータ設定を読み取り、単一のオブジェクトとして返します。
-   `renderAudio()` (src/synth.ts): 現在のシンセサイザーパラメータに基づいて、オーディオ信号をレンダリング（生成）するプロセスを開始します。
-   `renderAudioWasm(sampleRate: number, waveformType: number, dutyCycle: number, lpfCutoff: number, lpfQ: number, cutoffHzMax: number, qMax: number, decayUnit: number, decayRate: number, duration: number)` (src/wasmAudio.ts): Rust WASMモジュールを呼び出し、指定されたDSPパラメータでオーディオサンプルバッファを生成します。
-   `resetPerformanceStats()` (src/performance-stats.ts): 収集されたすべてのパフォーマンス統計データをクリアし、リセットします。
-   `saveSettings()` (src/settings.ts): 現在のアプリケーション設定をブラウザのローカルストレージに保存します。
-   `scheduleNextPlay()` (src/synth.ts): BPMとビートに基づいて、次のオーディオ再生またはループイベントをスケジュールします。
-   `startAudioContext()` (src/audio-player.ts): Web Audio APIのAudioContextを開始（resume）し、オーディオ再生を可能にします。
-   `startDebugOverlayUpdates()` (src/oscilloscope.ts): オシロスコープのデバッグオーバーレイ（例: CPU使用率表示）の定期的な更新を開始します。
-   `startRealtimeVisualization()` (src/realtime-analysis.ts): リアルタイムのFFTおよび波形ビジュアライゼーションの描画ループを開始します。
-   `stopAndCleanup()` (src/audio-player.ts): Tone.jsでのオーディオ再生を停止し、関連するリソースを解放してクリーンアップします。
-   `stopDebugOverlayUpdates()` (src/oscilloscope.ts): オシロスコープのデバッグオーバーレイの更新を停止します。
-   `stopOscilloscope()` (src/oscilloscope.ts): オシロスコープの波形表示を停止し、関連する描画ループを終了します。
-   `stopRealtimeVisualization()` (src/realtime-analysis.ts): リアルタイムのFFTおよび波形ビジュアライゼーションの描画ループを停止します。
-   `switchMode(mode: string)` (src/playback-mode.ts): アプリケーションの再生モードを切り替え、UIの表示を新しいモードに合わせて更新します。
-   `takeScreenshot(url: string, path: string)` (scripts/screenshot-github-pages.js): 指定されたURLのWebページからスクリーンショットを撮影し、指定されたパスに保存します。
-   `testConsoleLogs(url: string)` (scripts/test-console-logs.js): 指定されたURLのWebページにアクセスし、ブラウザのコンソールログをキャプチャして検証します。
-   `testWaveformVisualization(url: string)` (scripts/test-waveform-screenshot.js): 指定されたURLのWebページで波形ビジュアライゼーションが正しく機能しているかをテストし、スクリーンショットを撮ります。
-   `updateGenerationTimeDisplay(time: number)` (src/synth.ts): オーディオ生成にかかった時間（ミリ秒）をユーザーインターフェースに表示します。
-   `updateModeUI(mode: string)` (src/playback-mode.ts): 現在の再生モード（リアルタイム/非リアルタイム）に基づいて、UI要素（ボタン、ステータス表示など）を更新します。
-   `updateMousePositionDisplay(x: number, y: number)` (src/ui-params.ts): マウスのX/Y座標をユーザーインターフェースに表示します。
-   `updateOscilloscope(data: Float32Array, sampleRate: number)` (src/oscilloscope.ts): `cat-oscilloscope`ライブラリに新しいオーディオデータを提供し、オシロスコープ表示を更新します。
-   `updateStatusDisplay(message: string)` (src/synth.ts): アプリケーションの現在の状態を示すメッセージをUIのステータス表示領域に更新します。
-   `updateUIFields(settings: object)` (src/ui-params.ts): 指定された設定オブジェクトの値に基づいて、UIの入力フィールド（スライダー、テキストボックスなど）を更新します。
-   `validateInputs()` (src/oscilloscope.ts): オシロスコープの動作に必要な入力パラメータが有効であるかを内部的に検証します。
-   `validateSettings(settings: object)` (src/settings.ts): 与えられた設定オブジェクトの各プロパティが有効な値であるかを検証します。
-   `verifyDeployment(url: string)` (scripts/verify-deployment.js): デプロイされたアプリケーションが指定されたURLで正しく機能しているかを包括的に検証します。
-   `writeString(view: DataView, offset: number, s: string)` (src/wav.ts): DataViewオブジェクトの指定されたオフセット位置に文字列を書き込みます（WAVファイルフォーマット生成のヘルパー）。

## 関数呼び出し階層ツリー
```
- investigate404 (scripts/investigate-404.js)
  - checkGitHubRepo (scripts/investigate-cat-oscilloscope.js)
  - investigate (scripts/investigate-cat-oscilloscope.js)
  - takeScreenshot (scripts/screenshot-github-pages.js)
  - testConsoleLogs (scripts/test-console-logs.js)
  - testWaveformVisualization (scripts/test-waveform-screenshot.js)
  - verifyDeployment (scripts/verify-deployment.js)
  - loadTone (src/audio-player.ts)
  - isToneLoaded (src/audio-player.ts)
  - getTone (src/audio-player.ts)
  - startAudioContext (src/audio-player.ts)
  - isAudioContextRunning (src/audio-player.ts)
  - playWavUrl (src/audio-player.ts)
  - stopAndCleanup (src/audio-player.ts)
  - dispose (src/synth.ts)
  - initOscilloscope (src/oscilloscope.ts)
  - startDebugOverlayUpdates (src/oscilloscope.ts)
  - stopDebugOverlayUpdates (src/oscilloscope.ts)
  - frequencyToNote (src/oscilloscope.ts)
  - validateInputs (src/oscilloscope.ts)
  - updateOscilloscope (src/oscilloscope.ts)
  - stopOscilloscope (src/oscilloscope.ts)
  - isOscilloscopeInitialized (src/oscilloscope.ts)
  - validateSettings (src/settings.ts)
  - loadSettings (src/settings.ts)
  - saveSettings (src/settings.ts)
  - exportSettingsToFile (src/settings.ts)
  - importSettingsFromFile (src/settings.ts)
  - initFullWaveformDisplay (src/full-waveform-display.ts)
  - drawFullWaveform (src/full-waveform-display.ts)
  - clearFullWaveform (src/full-waveform-display.ts)
  - isFullWaveformDisplayInitialized (src/full-waveform-display.ts)
  - createPerformanceStats (src/performance-stats.ts)
  - addPerformanceSample (src/performance-stats.ts)
  - calculatePerformanceStats (src/performance-stats.ts)
  - getCurrentMode (src/playback-mode.ts)
  - switchMode (src/playback-mode.ts)
  - initRealtimeAnalysis (src/realtime-analysis.ts)
  - startRealtimeVisualization (src/realtime-analysis.ts)
  - stopRealtimeVisualization (src/realtime-analysis.ts)
  - isRealtimeAnalysisInitialized (src/realtime-analysis.ts)
  - disposeRealtimeAnalysis (src/realtime-analysis.ts)
  - getCurrentSettings (src/synth.ts)
  - displayOscilloscopeError (src/synth.ts)
  - readParameters (src/synth.ts)
  - renderAudio (src/synth.ts)
  - playAudioWav (src/synth.ts)
  - playAudioSeq (src/synth.ts)
  - playAudio (src/synth.ts)
  - handleModeSwitch (src/synth.ts)
  - init (src/synth.ts)
  - scheduleNextPlay (src/synth.ts)
  - updateStatusDisplay (src/synth.ts)
  - updateGenerationTimeDisplay (src/synth.ts)
  - calculateDuration (src/timing.ts)
  - readParametersFromUI (src/ui-params.ts)
  - updateUIFields (src/ui-params.ts)
  - mapMouseToFilterParams (src/ui-params.ts)
  - updateMousePositionDisplay (src/ui-params.ts)
  - initWasm (src/wasmAudio.ts)
  - isWasmInitialized (src/wasmAudio.ts)
  - renderAudioWasm (src/wasmAudio.ts)
  - generateWav (src/wav.ts)
  - createWavBlobUrl (src/wav.ts)
- disposeFullWaveformDisplay (src/full-waveform-display.ts)
- canvasSupported (src/oscilloscope.test.ts)
- resetPerformanceStats (src/performance-stats.ts)
- updateModeUI (src/playback-mode.ts)
- animate (src/realtime-analysis.ts)
  - drawFFT (src/realtime-analysis.ts)
    - drawWaveform (src/realtime-analysis.ts)
- readNumericParameter (src/ui-params.ts)
- writeString (src/wav.ts)
- handleInputChange (src/synth.ts)
- handleClick (src/synth.ts)

---
Generated at: 2026-02-13 07:08:13 JST
