Last updated: 2026-03-03

# Project Overview

## プロジェクト概要
- `wavlpf`は、RustとWebAssembly（WASM）で実装された高性能なソフトウェアシンセサイザーです。
- 直感的なマウス操作で、ローパスフィルターやノコギリ波/パルス波形をリアルタイムで制御できます。
- リアルタイムオシロスコープ表示、WAVファイル出力、設定の保存・読み込み機能も備えています。

## 技術スタック
- フロントエンド:
    - **Vite**: 高速な開発サーバーとモダンなビルドツールを提供し、フロントエンド開発を効率化します。
    - **TypeScript**: JavaScriptに静的型付けを導入し、大規模なアプリケーション開発におけるコードの品質と保守性を向上させます。
    - **HTML/CSS**: アプリケーションのユーザーインターフェースを構築するための標準的なマークアップ言語とスタイルシート言語です。
    - **cat-oscilloscope**: リアルタイムで波形を表示するための高性能なWASMベースのオシロスコープライブラリです。
    - **Tone.js**: Web Audio APIを抽象化し、オーディオ再生や音楽的なロジックを容易にするJavaScriptフレームワークです。
- 音楽・オーディオ:
    - **Rust WASM (WebAssembly)**: 信号処理の中核を担い、高性能なオーディオ波形生成とフィルター処理をブラウザ上で実現します。
    - **Biquadフィルター**: ローパス、ハイパス、バンドパスなど、さまざまなタイプのオーディオフィルターを実装するためのアルゴリズムです。
    - **Tone.js**: Web Audio API を活用し、クリーンなオーディオ再生とシーケンス制御を提供します。
- 開発ツール:
    - **Node.js & npm**: JavaScriptの実行環境およびパッケージマネージャーで、プロジェクトの依存関係管理とスクリプト実行に使用されます。
    - **wasm-pack**: RustコードをWebAssemblyにコンパイルし、Webアプリケーションで利用可能なJavaScriptバインディングを生成するためのツールです。
- テスト:
    - **Vitest**: 高速なユニットテストおよびコンポーネントテストフレームワークで、開発中のコードの品質を保証します。
    - **Playwright**: ブラウザの自動化ライブラリで、エンドツーエンドテストやデプロイ後の動作検証に使用されます。
- ビルドツール:
    - **wasm-pack**: Rustで書かれたDSPコードをWebAssemblyモジュールに変換します。
    - **Vite**: フロントエンドのTypeScript/JavaScriptコードをバンドルし、プロダクションビルドを生成します。
- 言語機能:
    - **Rust**: 高いパフォーマンスとメモリ安全性を特徴とし、オーディオ信号処理などの計算負荷の高い部分に採用されています。
    - **TypeScript**: JavaScriptに型安全性をもたらし、大規模なフロントエンドアプリケーションの開発を堅牢にします。
    - **JavaScript**: ブラウザ上で動作する主要なプログラミング言語で、Webアプリケーションのロジックを実装します。
- 自動化・CI/CD:
    - **GitHub Actions**: コードの変更がリポジトリにプッシュされるたびに、テストの実行、ビルド、GitHub Pagesへの自動デプロイを行うための継続的インテグレーション/デプロイメント（CI/CD）プラットフォームです。
- 開発標準:
    - **wasm-opt**: WebAssemblyバイナリを最適化し、ファイルサイズを削減し実行速度を向上させるためのツールです。

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
```

## ファイル詳細説明
- **index.html**: アプリケーションのエントリーポイントとなるHTMLファイルで、シンセサイザーのユーザーインターフェースとJavaScriptアプリケーションをロードします。
- **scripts/investigate-404.js**: GitHub Pagesでの404エラーを調査するためのPlaywrightスクリプトです。
- **scripts/investigate-cat-oscilloscope.js**: `cat-oscilloscope`リポジトリの状態を調査するためのスクリプトです。
- **scripts/screenshot-github-pages.js**: GitHub Pagesのデプロイ後にウェブサイトのスクリーンショットを自動で撮影するためのPlaywrightスクリプトです。
- **scripts/setup-cat-oscilloscope-wasm.js**: `cat-oscilloscope` WASMモジュールのセットアップを自動化するためのスクリプトです。
- **scripts/test-console-logs.js**: デプロイされたアプリケーションのコンソールログをテストするためのPlaywrightスクリプトです。
- **scripts/test-waveform-screenshot.js**: 波形ビジュアライゼーションが正しく表示されていることを確認するためのPlaywrightスクリプトです。
- **scripts/verify-deployment.js**: GitHub Pagesへのデプロイが成功したことを検証するためのPlaywrightスクリプトです。
- **src/audio-player.ts**: `Tone.js`ライブラリをラップし、オーディオコンテキストの管理やWAVファイルの再生機能を提供します。
- **src/full-waveform-display.test.ts**: 生成されたオーディオの全波形表示コンポーネントのテストコードです。
- **src/full-waveform-display.ts**: 生成されたオーディオの全波形を視覚化するためのロジックと描画機能を提供します。
- **src/index.ts**: アプリケーションのメインエントリーポイントで、シンセサイザーの初期化処理を呼び出します。
- **src/oscilloscope.test.ts**: リアルタイムオシロスコープ表示のテストコードです。
- **src/oscilloscope.ts**: `cat-oscilloscope`ライブラリを統合し、リアルタイムでの波形表示とデバッグオーバーレイの更新を管理します。
- **src/performance-stats.test.ts**: パフォーマンス統計収集機能のテストコードです。
- **src/performance-stats.ts**: オーディオ生成時間のパフォーマンスサンプルを収集し、統計情報を計算する機能を提供します。
- **src/playback-mode.ts**: アプリケーションの再生モード（リアルタイム/非リアルタイム）を管理し、UIを更新します。
- **src/realtime-analysis.test.ts**: リアルタイムオーディオ分析機能のテストコードです。
- **src/realtime-analysis.ts**: Tone.jsの分析ツールを利用して、リアルタイムでオーディオのFFT（高速フーリエ変換）と波形を視覚化します。
- **src/settings.test.ts**: 設定の保存・読み込み機能のテストコードです。
- **src/settings.ts**: アプリケーションの設定の検証、保存（localStorage）、読み込み、そしてJSONファイルとしてのインポート/エクスポート機能を提供します。
- **src/styles.css**: アプリケーションのユーザーインターフェースにスタイルを適用するためのCSSファイルです。
- **src/synth-display.ts**: シンセサイザーのステータス、生成時間、オシロスコープのエラーメッセージなどをUIに表示する役割を担います。
- **src/synth-ui-setup.ts**: 設定のエクスポート/インポートボタン、タブ切り替え、マウスと入力ハンドラの初期化など、シンセサイザーのユーザーインターフェース関連のセットアップを行います。
- **src/synth.ts**: シンセサイザーの主要なロジックを含み、オーディオのレンダリング、再生、モード管理、UIイベントハンドリングなどを行います。
- **src/timing.test.ts**: オーディオのタイミング計算機能のテストコードです。
- **src/timing.ts**: BPMとビート数に基づいてオーディオの持続時間などを計算するユーティリティ機能を提供します。
- **src/ui-params.test.ts**: UIパラメータの読み込みとマッピング機能のテストコードです。
- **src/ui-params.ts**: UI要素からシンセサイザーのパラメータを読み込み、マウス座標をフィルターパラメータにマッピングする機能を提供します。
- **src/wasmAudio.ts**: Rustで実装されたWASMオーディオモジュールのTypeScriptラッパーで、動的なWASMロードとオーディオレンダリングのインターフェースを提供します。
- **src/wav.test.ts**: WAVファイル生成機能のテストコードです。
- **src/wav.ts**: 生のオーディオデータをWAVファイルフォーマットに変換し、ダウンロード可能なURLを生成する機能を提供します。
- **tsconfig.json**: TypeScriptコンパイラの設定ファイルで、プロジェクトのTypeScriptファイルのコンパイル方法を定義します。
- **vite.config.ts**: Viteビルドツールの設定ファイルで、開発サーバーの挙動やビルドプロセスを構成します。
- **wasm-audio/Cargo.toml**: RustのWASMオーディオクレートの設定ファイルで、依存関係やビルド設定を定義します。
- **wasm-audio/README.md**: WASMオーディオクレートに関する説明ドキュメントです。
- **wasm-audio/src/audio_renderer.rs**: Rust WASMモジュール内でオーディオサンプルをレンダリングするロジックを実装しています。
- **wasm-audio/src/filter.rs**: Rust WASMモジュール内でBiquadフィルターの実装を提供し、オーディオ信号にフィルター処理を適用します。
- **wasm-audio/src/lib.rs**: Rust WASMオーディオクレートのメインライブラリファイルで、シンセサイザーの主要な信号処理パイプライン（オシレーター生成、フィルター処理、レンダリング）をJavaScriptから呼び出せるように公開します。
- **wasm-audio/src/oscillator.rs**: Rust WASMモジュール内でノコギリ波やパルス波などの波形を生成するオシレーターロジックを実装しています。

## 関数詳細説明
- **`scripts/investigate-404.js`内の関数**:
    - `investigate404()`: GitHub Pagesで発生する404エラーの原因を調査するための処理を実行します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
- **`scripts/investigate-cat-oscilloscope.js`内の関数**:
    - `checkGitHubRepo()`: 特定のGitHubリポジトリの状態を確認する処理を実行します。
    - `investigate()`: 何らかの事象を調査するメインの処理を実行します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
- **`scripts/screenshot-github-pages.js`内の関数**:
    - `takeScreenshot()`: GitHub Pagesのウェブサイトのスクリーンショットを撮影する処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
- **`scripts/setup-cat-oscilloscope-wasm.js`内の関数**:
    - `for()`: ループ処理を実行します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
- **`scripts/test-console-logs.js`内の関数**:
    - `testConsoleLogs()`: デプロイされたアプリケーションのコンソールログをテストする処理を実行します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
- **`scripts/test-waveform-screenshot.js`内の関数**:
    - `testWaveformVisualization()`: 波形ビジュアライゼーションが正しく動作しているかをテストする処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `for()`: ループ処理を実行します。
- **`scripts/verify-deployment.js`内の関数**:
    - `verifyDeployment()`: GitHub Pagesへのデプロイが正常に行われたかを検証する処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `for()`: ループ処理を実行します。
- **`src/audio-player.ts`内の関数**:
    - `loadTone()`: `Tone.js`ライブラリをロードし、オーディオエンジンを準備します。
    - `isToneLoaded()`: `Tone.js`がロード済みかどうかを判定します。
    - `getTone()`: ロード済みの`Tone.js`インスタンスを返します。
    - `startAudioContext()`: Web Audio APIのオーディオコンテキストを開始します。
    - `isAudioContextRunning()`: オーディオコンテキストが動作中かどうかを判定します。
    - `playWavUrl(url: string)`: 指定されたURLのWAVファイルを再生します。
    - `stopAndCleanup()`: 現在再生中のオーディオを停止し、関連リソースをクリーンアップします。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
- **`src/full-waveform-display.ts`内の関数**:
    - `initFullWaveformDisplay()`: 全波形表示のキャンバスを初期化し、描画準備を行います。
    - `drawFullWaveform(audioBuffer: Float32Array)`: 与えられたオーディオバッファ全体を描画します。
    - `clearFullWaveform()`: 全波形表示のキャンバスをクリアします。
    - `disposeFullWaveformDisplay()`: 全波形表示に関連するリソースを解放します。
    - `isFullWaveformDisplayInitialized()`: 全波形表示が初期化済みかどうかを判定します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `for()`: ループ処理を実行します。
- **`src/index.ts`内の関数**:
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
- **`src/oscilloscope.ts`内の関数**:
    - `initOscilloscope()`: `cat-oscilloscope`を初期化し、リアルタイム波形表示をセットアップします。
    - `startDebugOverlayUpdates()`: デバッグ情報のオーバーレイ表示の更新を開始します。
    - `stopDebugOverlayUpdates()`: デバッグ情報のオーバーレイ表示の更新を停止します。
    - `frequencyToNote(frequency: number)`: 周波数を音名に変換します。
    - `validateInputs()`: オシロスコープの入力パラメータを検証します。
    - `updateOscilloscope(data: Float32Array)`: オシロスコープに新しいオーディオデータを渡し、表示を更新します。
    - `stopOscilloscope()`: オシロスコープの表示を停止し、関連リソースをクリーンアップします。
    - `isOscilloscopeInitialized()`: オシロスコープが初期化済みかどうかを判定します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
- **`src/performance-stats.ts`内の関数**:
    - `createPerformanceStats()`: パフォーマンス統計を格納するためのオブジェクトを初期化します。
    - `addPerformanceSample(sample: number)`: 新しいパフォーマンス測定値を統計に追加します。
    - `calculatePerformanceStats()`: 収集されたパフォーマンスデータに基づいて平均、最大、最小などの統計を計算します。
    - `resetPerformanceStats()`: 収集されたパフォーマンス統計をリセットします。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
- **`src/playback-mode.ts`内の関数**:
    - `getCurrentMode()`: 現在の再生モードを返します。
    - `updateModeUI()`: 現在の再生モードに合わせてユーザーインターフェースを更新します。
    - `switchMode(mode: string)`: 再生モードを切り替えます。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
- **`src/realtime-analysis.ts`内の関数**:
    - `initRealtimeAnalysis()`: リアルタイムオーディオ分析のためのキャンバスとTone.jsアナライザーを初期化します。
    - `startRealtimeVisualization()`: リアルタイムのFFTおよび波形ビジュアライゼーションを開始します。
    - `stopRealtimeVisualization()`: リアルタイムのビジュアライゼーションを停止します。
    - `animate()`: アニメーションフレームごとにFFTと波形を描画するループを管理します。
    - `drawFFT(analyser: AnalyserNode, canvasCtx: CanvasRenderingContext2D, width: number, height: number)`: 周波数スペクトル（FFT）をキャンバスに描画します。
    - `drawWaveform(analyser: AnalyserNode, canvasCtx: CanvasRenderingContext2D, width: number, height: number)`: オーディオの波形をキャンバスに描画します。
    - `isRealtimeAnalysisInitialized()`: リアルタイム分析機能が初期化済みかどうかを判定します。
    - `disposeRealtimeAnalysis()`: リアルタイム分析に関連するリソースを解放します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `for()`: ループ処理を実行します。
- **`src/settings.ts`内の関数**:
    - `validateSettings(settings: object)`: 提供された設定オブジェクトの内容を検証します。
    - `loadSettings()`: ローカルストレージから設定を読み込みます。
    - `saveSettings(settings: object)`: 現在の設定をローカルストレージに保存します。
    - `exportSettingsToFile(settings: object)`: 現在の設定をJSONファイルとしてエクスポートします。
    - `importSettingsFromFile(file: File)`: JSONファイルから設定をインポートします。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
- **`src/synth-display.ts`内の関数**:
    - `displayOscilloscopeError(errorMessage: string)`: オシロスコープ関連のエラーメッセージをUIに表示します。
    - `updateStatusDisplay(message: string)`: アプリケーションのステータス情報をUIに表示します。
    - `updateGenerationTimeDisplay(time: number)`: オーディオ生成にかかった時間をUIに表示します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
- **`src/synth-ui-setup.ts`内の関数**:
    - `setupExportSettingsButton()`: 設定エクスポートボタンのイベントリスナーを設定します。
    - `setupImportSettingsButton()`: 設定インポートボタンのイベントリスナーを設定します。
    - `setupTabHandlers()`: UIのタブ切り替え機能を設定します。
    - `setupMouseAndInputHandlers()`: マウスの動きやUI入力要素のイベントハンドラを設定し、シンセサイザーのパラメータ制御を可能にします。
    - `handleInputChange()`: UIの入力要素が変更された際の処理を実行します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
- **`src/synth.ts`内の関数**:
    - `getCurrentSettings()`: 現在のシンセサイザー設定を取得します。
    - `readParameters()`: UIからシンセサイザーのパラメータを読み取ります。
    - `renderAudio(settings: object, duration: number)`: 指定された設定と期間に基づいてオーディオをレンダリングします。
    - `playAudioWav(audioBuffer: Float32Array, duration: number)`: 生成されたオーディオバッファをWAV形式で再生します。
    - `playAudioSeq(audioBuffer: Float32Array, duration: number)`: 生成されたオーディオバッファをシーケンスとして再生します。
    - `playAudio(audioBuffer: Float32Array, duration: number)`: オーディオバッファを再生します。現在の再生モードによってWAVまたはシーケンス再生を呼び出します。
    - `handleModeSwitch()`: 再生モードが切り替わった際の処理を実行します。
    - `init()`: シンセサイザーアプリケーション全体を初期化します。
    - `scheduleNextPlay(interval: number)`: 指定された間隔で次のオーディオ再生をスケジュールします。
    - `dispose()`: シンセサイザーと関連リソースを解放します。
    - `handleClick(event: MouseEvent)`: ユーザーがページをクリックした際のオーディオコンテキスト開始などの処理を実行します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
- **`src/timing.ts`内の関数**:
    - `calculateDuration(bpm: number, beats: number)`: BPMとビート数に基づいてオーディオの持続時間（秒）を計算します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
- **`src/ui-params.ts`内の関数**:
    - `readNumericParameter(elementId: string)`: 指定されたIDのUI要素から数値パラメータを読み取ります。
    - `readParametersFromUI()`: UI上のすべてのシンセサイザーパラメータを読み取り、オブジェクトとして返します。
    - `updateUIFields(settings: object)`: 提供された設定オブジェクトに基づいてUIの入力フィールドを更新します。
    - `mapMouseToFilterParams(mouseX: number, mouseY: number, element: HTMLElement)`: マウスのX/Y座標をフィルターのカットオフ周波数とQ値にマッピングします。
    - `updateMousePositionDisplay(mouseX: number, mouseY: number)`: UI上にマウスの現在位置とそれに対応するフィルターパラメータを表示します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
- **`src/wasmAudio.ts`内の関数**:
    - `initWasm()`: WebAssemblyモジュールを初期化し、Rustで実装されたDSP機能へのアクセスを確立します。
    - `isWasmInitialized()`: WASMモジュールが初期化済みかどうかを判定します。
    - `renderAudioWasm(settings: object, bufferSize: number)`: WASMモジュールを呼び出してオーディオデータをレンダリングします。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `catch()`: エラーが発生した場合に、そのエラーを捕捉し処理します。
- **`src/wav.ts`内の関数**:
    - `generateWav(audioBuffer: Float32Array, sampleRate: number)`: 生のオーディオバッファからWAVファイルフォーマットの`ArrayBuffer`を生成します。
    - `writeString(view: DataView, offset: number, string: string)`: DataViewに文字列を書き込みます。
    - `createWavBlobUrl(wavBlob: Blob)`: WAV Blobからダウンロード可能なURLを生成します。
    - `if()`: 条件分岐により、特定の状況下で処理を実行します。
    - `for()`: ループ処理を実行します。

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

---
Generated at: 2026-03-03 07:07:15 JST
