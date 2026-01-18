Last updated: 2026-01-19

# Project Overview

## プロジェクト概要
- RustとWebAssemblyで実装された、インタラクティブなローパスフィルター付きソフトウェアシンセサイザーです。
- リアルタイムで波形を生成・処理し、オシロスコープで視覚化しながら、Webブラウザ上で直感的に音色をデザインできます。
- 高速な信号処理とWAVファイル出力、設定の永続化機能を備え、高品質なオーディオ体験を提供します。

## 技術スタック
- フロントエンド: **TypeScript** (型安全なアプリケーションロジック), **HTML** (ユーザーインターフェース), **WebAssembly (WASM)** (Rustで記述されたDSP処理をブラウザで高速実行)
- 音楽・オーディオ: **Rust WASM信号プロセッサ** (低レベルで高性能なDSP処理), **Biquadフィルター** (複数のフィルタータイプに対応したインタラクティブなフィルター), **220Hz波形ジェネレーター** (ノコギリ波、パルス波), **Tone.js** (クリーンなオーディオ再生とWeb Audio APIの抽象化), **cat-oscilloscope** (リアルタイム波形ビジュアライゼーション), **WAV生成** (処理済みオーディオをWAVフォーマットで出力)
- 開発ツール: **Node.js** (実行環境), **npm** (パッケージ管理), **Rust** (信号処理ロジックの記述言語), **wasm-pack** (RustコードをWASMにビルドするツール), **Vite** (高速な開発サーバーと本番ビルドツール), **Playwright** (E2Eテストおよび自動化スクリプトでの利用)
- テスト: **Vitest** (高速な単体・統合テストフレームワーク), **@vitest/ui** (ビジュアルテストランナー), **Playwright** (End-to-Endテストの自動化)
- ビルドツール: **Vite** (アプリケーション全体のバンドルと最適化), **wasm-pack** (Rust WASMモジュールのビルド), **wasm-opt** (WASMバイナリの最適化)
- 言語機能: **Rust** (高性能な数値計算と並行処理), **TypeScript** (大規模アプリケーション開発のための型安全なJavaScript)
- 自動化・CI/CD: **GitHub Pages** (`main`ブランチへのプッシュで自動デプロイされる継続的デプロイメント環境)
- 開発標準: **TypeScript** (厳格な型チェックによるコード品質向上), **Vitest/Playwright** (自動テストによる品質保証), **GitHub Pages** (一貫したデプロイプロセスの確立)

## ファイル階層ツリー
```
📄 .gitignore
📖 DEVELOPMENT.md
📖 ISSUE_39_SUMMARY.md
📄 LICENSE
📖 MODULE_DEPENDENCIES.md
📖 NETWORK_RESTRICTIONS_INVESTIGATION.md
📖 PERFORMANCE_DISPLAY_DEMO.md
📖 PERFORMANCE_TIMING_ANALYSIS.md
📖 README.ja.md
📖 README.md
📖 REFACTORING_SUMMARY.md
📖 SUMMARY.md
📄 _config.yml
📖 copilot-instructions.md
📁 docs/
  📖 CAT_OSCILLOSCOPE_WASM_SETUP.md
  📖 COPILOT_GITHUB_PAGES_ACCESS.md
  📖 DEPLOYMENT_VERIFICATION.md
  📖 GITHUB_PAGES_ACCESS_PROPOSAL.md
  📖 ISSUE_76_RESOLUTION.md
  📖 ISSUE_78_RESOLUTION.md
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
  📘 index.ts
  📘 oscilloscope.test.ts
  📘 oscilloscope.ts
  📘 performance-stats.test.ts
  📘 performance-stats.ts
  📘 playback-mode.ts
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
- **index.html**: Webアプリケーションの主要なエントリーポイントとなるHTMLファイル。ユーザーインターフェースの骨格を定義します。
- **DEVELOPMENT.md**: プロジェクトの開発フレームワーク、テスト戦略、および開発プロセスに関する詳細なガイドを提供します。
- **LICENSE**: プロジェクトのライセンス情報（MITライセンス）を記述しています。
- **README.md (および README.ja.md)**: プロジェクトの概要、機能、デモ、セットアップ方法、使い方などを説明する主要なドキュメントです。
- **_config.yml**: GitHub Pagesのビルド設定に使用されるファイルです。
- **docs/**: プロジェクトに関する詳細なドキュメント群を格納するディレクトリです。
    - **docs/CAT_OSCILLOSCOPE_WASM_SETUP.md**: `cat-oscilloscope`のWASMセットアップに関する技術詳細を説明します。
    - **docs/OSCILLOSCOPE_USAGE.md**: オシロスコープの現在の実装と使用方法に関するガイドを提供します。
- **package.json**: Node.jsプロジェクトのメタデータ、依存関係、およびスクリプト定義が含まれています。
- **package-lock.json**: `package.json`で定義された依存関係の正確なツリー構造とバージョンを記録し、ビルドの再現性を保証します。
- **scripts/**: プロジェクトのビルド、テスト、デプロイ、デバッグなどの様々な自動化タスクを実行するためのシェルスクリプトやJavaScriptスクリプトが含まれています。
    - **scripts/install-wasm-pack.sh**: Rustの`wasm-pack`ツールをインストールするためのシェルスクリプトです。
    - **scripts/verify-deployment.js**: デプロイが正しく行われたかを検証するためのPlaywrightスクリプトです。
- **src/**: アプリケーションの主要なTypeScript/JavaScriptソースコードが配置されているディレクトリです。
    - **src/index.ts**: アプリケーションの初期化と起動を行うメインのエントリーポイントです。
    - **src/synth.ts**: シンセサイザーの主要なロジックを実装しています。UIからの入力処理、オーディオレンダリングのトリガー、モード切り替えなどを担当します。
    - **src/wasmAudio.ts**: Rust WASMモジュールをロードし、TypeScriptからWASM関数を呼び出すためのラッパーを提供します。
    - **src/wav.ts**: 生成されたオーディオデータをWAVファイル形式に変換し、ダウンロード可能なURLを作成する機能を提供します。
    - **src/settings.ts**: アプリケーションの設定の読み込み、保存、エクスポート、インポートを管理し、設定の永続化を処理します。
    - **src/oscilloscope.ts**: `cat-oscilloscope`ライブラリを統合し、リアルタイムで波形を視覚化するためのロジックを実装しています。
    - **src/audio-player.ts**: Tone.jsライブラリを使用して、Web Audio Contextの開始、オーディオの再生、停止を制御します。
    - **src/performance-stats.ts**: 信号処理のパフォーマンス（生成時間など）を測定し、統計を計算するための機能を提供します。
    - **src/playback-mode.ts**: アプリケーションの再生モード（例：リアルタイム、非リアルタイムレンダリング）を管理し、UIを更新します。
    - **src/timing.ts**: BPMとビートに基づいてオーディオ生成のタイミングと期間を計算します。
    - **src/ui-params.ts**: ユーザーインターフェースからパラメータ（波形タイプ、デューティー比、フィルター設定など）を読み取り、マウスの動きをフィルターパラメータにマッピングするロジックを含みます。
- **tsconfig.json**: TypeScriptコンパイラの設定ファイルで、プロジェクトのTypeScriptコードがどのようにコンパイルされるかを定義します。
- **vite.config.ts**: Viteビルドツールの設定ファイルで、開発サーバーと本番ビルドの挙動をカスタマイズします。
- **wasm-audio/**: Rustで記述された高性能な信号処理ロジックを含むクレート（ライブラリ）のディレクトリです。
    - **wasm-audio/Cargo.toml**: Rustクレートの依存関係、ビルド設定、メタデータを定義します。
    - **wasm-audio/src/lib.rs**: Rust WASMクレートのメインファイルで、外部に公開される関数を定義し、オシレーターやフィルターなどの信号処理パイプライン全体を統合します。
    - **wasm-audio/src/oscillator.rs**: ノコギリ波やパルス波などの基本的な波形を生成するロジックを実装しています。
    - **wasm-audio/src/filter.rs**: Biquadフィルターの計算ロジック（LPF, HPFなど）を実装しています。
    - **wasm-audio/src/audio_renderer.rs**: 信号処理パイプラインを通じてオーディオデータをレンダリングする最終的な処理を担当します。

## 関数詳細説明
- **investigate404 (scripts/investigate-404.js)**: GitHub Pagesデプロイで発生する可能性のある404エラーを調査するための自動テスト関数です。特定のURLにアクセスし、エラーがないか確認します。
- **checkGitHubRepo (scripts/investigate-cat-oscilloscope.js)**: `cat-oscilloscope`リポジトリのステータスを確認し、必要な情報（例: gitハッシュ）を取得するための関数です。
- **investigate (scripts/investigate-cat-oscilloscope.js)**: `cat-oscilloscope`ライブラリに関する問題を調査するためのメインのスクリプト関数です。
- **takeScreenshot (scripts/screenshot-github-pages.js)**: 指定されたURLのGitHub Pagesからスクリーンショットを取得し、デプロイの状態を視覚的に確認するための関数です。
- **testConsoleLogs (scripts/test-console-logs.js)**: デプロイされたアプリケーションのコンソールログを監視し、予期しないエラーや警告がないかテストするための関数です。
- **testWaveformVisualization (scripts/test-waveform-screenshot.js)**: 波形ビジュアライゼーションが正しく機能しているかをテストし、スクリーンショットを撮って検証する関数です。
- **verifyDeployment (scripts/verify-deployment.js)**: GitHub Pagesへのデプロイが成功し、アプリケーションが期待通りに動作しているかを総合的に検証する関数です。
- **loadTone (src/audio-player.ts)**: Tone.jsライブラリを非同期でロードし、オーディオ再生の準備を行う関数です。
- **isToneLoaded (src/audio-player.ts)**: Tone.jsがロード済みであるかを確認するブール値を返します。
- **startAudioContext (src/audio-player.ts)**: Web Audio Contextを開始し、オーディオ再生を有効にする関数です。ユーザーのインタラクション後に呼び出されます。
- **isAudioContextRunning (src/audio-player.ts)**: Web Audio Contextが現在実行中であるかを確認するブール値を返します。
- **playWavUrl (src/audio-player.ts)**: 与えられたWAVファイルのURLをTone.jsのプレイヤーで再生する関数です。
- **stopAndCleanup (src/audio-player.ts)**: 現在再生中のオーディオを停止し、Tone.jsの関連リソースをクリーンアップする関数です。
- **initOscilloscope (src/oscilloscope.ts)**: `cat-oscilloscope`を初期化し、指定されたCanvas要素に波形表示を設定する関数です。
- **startDebugOverlayUpdates (src/oscilloscope.ts)**: オシロスコープのデバッグオーバーレイの更新を開始する関数です。
- **stopDebugOverlayUpdates (src/oscilloscope.ts)**: オシロスコープのデバッグオーバーレイの更新を停止する関数です。
- **frequencyToNote (src/oscilloscope.ts)**: 周波数を音楽の音名（ノート）に変換する関数です。
- **validateInputs (src/oscilloscope.ts)**: オシロスコープの入力パラメータを検証する関数です。
- **updateOscilloscope (src/oscilloscope.ts)**: 新しいオーディオバッファデータでオシロスコープの表示を更新する関数です。
- **stopOscilloscope (src/oscilloscope.ts)**: オシロスコープの表示を停止し、関連するリソースを解放する関数です。
- **isOscilloscopeInitialized (src/oscilloscope.ts)**: オシロスコープが初期化されているかを確認するブール値を返します。
- **createPerformanceStats (src/performance-stats.ts)**: パフォーマンス統計を記録するための新しいインスタンスを初期化する関数です。
- **addPerformanceSample (src/performance-stats.ts)**: 測定されたパフォーマンスサンプル（例: 処理時間）を追加する関数です。
- **calculatePerformanceStats (src/performance-stats.ts)**: 記録されたサンプルに基づいて平均、最大、最小などのパフォーマンス統計を計算する関数です。
- **resetPerformanceStats (src/performance-stats.ts)**: 記録されたパフォーマンス統計データをリセットする関数です。
- **getCurrentMode (src/playback-mode.ts)**: 現在のオーディオ再生モード（リアルタイム、レンダリングなど）を取得する関数です。
- **updateModeUI (src/playback-mode.ts)**: 現在のモードに基づいてユーザーインターフェースの表示を更新する関数です。
- **switchMode (src/playback-mode.ts)**: オーディオ再生モードを切り替える関数です。
- **validateSettings (src/settings.ts)**: ロードまたはインポートされた設定オブジェクトが有効であるかを検証する関数です。
- **loadSettings (src/settings.ts)**: ブラウザのローカルストレージからアプリケーション設定をロードする関数です。
- **saveSettings (src/settings.ts)**: 現在のアプリケーション設定をブラウザのローカルストレージに保存する関数です。
- **exportSettingsToFile (src/settings.ts)**: 現在の設定をJSONファイルとしてエクスポートし、ユーザーがダウンロードできるようにする関数です。
- **importSettingsFromFile (src/settings.ts)**: ユーザーが選択したJSONファイルから設定をインポートする関数です。
- **getCurrentSettings (src/synth.ts)**: シンセサイザーの現在の設定オブジェクトを取得する関数です。
- **displayOscilloscopeError (src/synth.ts)**: オシロスコープに関連するエラーメッセージをUIに表示する関数です。
- **readParameters (src/synth.ts)**: UIから現在のシンセサイザーパラメータ（波形タイプ、フィルター設定など）を読み取る関数です。
- **renderAudio (src/synth.ts)**: WASMモジュールを使用してオーディオをレンダリングし、結果をバッファとして返すメインのオーディオ処理関数です。
- **playAudioWav (src/synth.ts)**: レンダリングされたオーディオデータをWAV形式で生成し、再生する関数です。
- **playAudioSeq (src/synth.ts)**: オーディオをシーケンスとして（BPMとビートに基づいて）再生する関数です。
- **playAudio (src/synth.ts)**: オーディオ再生を開始または制御する高レベルの関数です。
- **handleModeSwitch (src/synth.ts)**: 再生モードが切り替えられたときに実行されるハンドラー関数です。
- **init (src/synth.ts)**: シンセサイザーアプリケーションの主要な初期化プロセスを実行する関数です。イベントリスナーの設定やWASMモジュールのロードなどを行います。
- **scheduleNextPlay (src/synth.ts)**: BPMとビートに基づいて次のオーディオ再生イベントをスケジュールする関数です。
- **updateStatusDisplay (src/synth.ts)**: アプリケーションのステータス情報（例: エラーメッセージ）をUIに表示する関数です。
- **updateGenerationTimeDisplay (src/synth.ts)**: オーディオ生成にかかった時間をUIに表示する関数です。
- **dispose (src/synth.ts)**: シンセサイザーが使用していたリソースを解放し、クリーンアップする関数です。
- **handleInputChange (src/synth.ts)**: UIの入力要素が変更されたときにトリガーされるイベントハンドラー関数です。
- **handleClick (src/synth.ts)**: ユーザーがページ上の任意の場所をクリックしたときにトリガーされるイベントハンドラー関数です。オーディオコンテキストの開始などに利用されます。
- **calculateDuration (src/timing.ts)**: BPMとビート数に基づいてオーディオの総再生時間をミリ秒単位で計算する関数です。
- **readNumericParameter (src/ui-params.ts)**: UI上の数値入力フィールドから値を読み取り、数値型に変換するヘルパー関数です。
- **readParametersFromUI (src/ui-params.ts)**: UI上のすべての入力要素からシンセサイザーのパラメータを一度に読み取る関数です。
- **updateUIFields (src/ui-params.ts)**: 指定された設定に基づいてUI上の入力フィールドの値を更新する関数です。
- **mapMouseToFilterParams (src/ui-params.ts)**: マウスのX/Y座標をフィルターのカットオフ周波数とQ値にマッピングする関数です。
- **updateMousePositionDisplay (src/ui-params.ts)**: マウスの位置に対応するフィルターパラメータをUIに表示する関数です。
- **initWasm (src/wasmAudio.ts)**: RustでコンパイルされたWASMモジュールを非同期でロードし、初期化する関数です。
- **isWasmInitialized (src/wasmAudio.ts)**: WASMモジュールがロードされ、初期化済みであるかを確認するブール値を返します。
- **renderAudioWasm (src/wasmAudio.ts)**: ロードされたWASMモジュール内のオーディオ処理関数を呼び出し、指定されたパラメータでオーディオデータを生成させる関数です。
- **generateWav (src/wav.ts)**: 生のオーディオデータ（Float32Array）からWAVフォーマットのBlobを生成する関数です。
- **writeString (src/wav.ts)**: WAVヘッダーに文字列（例: "RIFF", "WAVE"）を書き込むヘルパー関数です。
- **createWavBlobUrl (src/wav.ts)**: 生成されたWAV Blobからダウンロード可能なURLを作成する関数です。

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
  - startAudioContext (src/audio-player.ts)
  - isAudioContextRunning (src/audio-player.ts)
  - playWavUrl (src/audio-player.ts)
  - stopAndCleanup (src/audio-player.ts)
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
  - createPerformanceStats (src/performance-stats.ts)
  - addPerformanceSample (src/performance-stats.ts)
  - calculatePerformanceStats (src/performance-stats.ts)
  - getCurrentMode (src/playback-mode.ts)
  - switchMode (src/playback-mode.ts)
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
- canvasSupported (src/oscilloscope.test.ts)
- resetPerformanceStats (src/performance-stats.ts)
- updateModeUI (src/playback-mode.ts)
- readNumericParameter (src/ui-params.ts)
- writeString (src/wav.ts)
- handleInputChange (src/synth.ts)
- handleClick (src/synth.ts)

---
Generated at: 2026-01-19 07:03:37 JST
