Last updated: 2026-04-07

# Project Overview

## プロジェクト概要
- RustとWebAssembly (WASM) を活用した、高性能なソフトウェアシンセサイザーです。
- リアルタイムでローパスフィルター (LPF) を操作し、音色の変化をインタラクティブに体験できます。
- Webブラウザ上で波形生成、フィルター制御、視覚化を行うデモが提供されており、WAVファイルの生成も可能です。

## 技術スタック
- フロントエンド:
    - **TypeScript / JavaScript**: アプリケーションのロジック、UI操作、オーディオ処理の連携に利用されています。
    - **Vite**: 高速な開発サーバーと本番ビルドを提供し、モダンなフロントエンド開発を支援します。
    - **HTML / CSS**: ユーザーインターフェースの構造とスタイリングに使用されています。
    - **cat-oscilloscope**: リアルタイムでオーディオ波形を視覚化するためのオシロスコープライブラリが統合されています。
- 音楽・オーディオ:
    - **Rust WASM**: オーディオ信号処理（オシレーター、フィルターなど）のコアロジックを実装し、Webブラウザでの高速実行を実現します。
    - **Biquadフィルター**: LPF（ローパスフィルター）だけでなく、HPF、BPF、Notchなど多様なフィルタータイプをサポートし、インタラクティブな音色変化を提供します。
    - **Tone.js**: クリーンなオーディオ再生とWeb Audio APIの複雑な管理を簡素化するために統合されています。
    - **WAV生成**: 処理済みのオーディオデータを標準的なWAVファイル形式で出力する機能を提供します。
- 開発ツール:
    - **Node.js**: JavaScript実行環境として、ビルドスクリプトや開発サーバーの実行に利用されます。
    - **npm**: パッケージ管理ツールとして、依存関係のインストールやスクリプトの実行に使用されます。
    - **playwright**: ブラウザ自動化ライブラリとして、デプロイ検証やスクリーンショット、E2Eテストなどの開発支援スクリプトに活用されています。
- テスト:
    - **Vitest**: 高速なユニットテストフレームワークとして、JavaScript/TypeScriptコードのテストに使用されます。
    - **@vitest/ui**: Vitestのテストを視覚的に実行・管理するためのUIを提供します。
    - **happy-dom**: DOM環境をエミュレートし、Node.js環境でのブラウザDOM操作のテストを可能にします。
- ビルドツール:
    - **Rust**: 高性能なオーディオ処理部分を記述するためのプログラミング言語です。
    - **wasm-pack**: Rustで書かれたコードをWebAssemblyモジュールにコンパイルし、JavaScriptから利用できるようにするためのツールです。
    - **TypeScript**: 静的型付けされたJavaScriptをコンパイルし、開発時のエラー検出とコード品質向上に貢献します。
- 言語機能:
    - **Rust**: 信号処理のパフォーマンスと安全性を提供します。
    - **WebAssembly (WASM)**: ブラウザ上でネイティブに近い速度でコードを実行可能にし、複雑なDSP処理を高速化します。
    - **TypeScript**: フロントエンドアプリケーションの堅牢性と保守性を高めます。
- 自動化・CI/CD:
    - **GitHub Actions**: リポジトリへの変更がプッシュされると、自動的にテストの実行（CI）とGitHub Pagesへのデプロイ（CD）を行います。
    - **GitHub Pages**: 完成したウェブアプリケーションをホスティングし、公開デモを提供します。
- 開発標準:
    - **DEVELOPMENT.md**: 開発フレームワークとテスト戦略に関するドキュメントが提供され、プロジェクト開発の指針となっています。

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
- **`.gitignore`**: Gitによるバージョン管理から除外するファイルやディレクトリを指定します。
- **`DEVELOPMENT.md`**: 開発フレームワーク、テスト戦略、コーディング規約など、プロジェクトの開発者向け情報が記述されています。
- **`LICENSE`**: プロジェクトのライセンス情報（MITライセンス）が記載されています。
- **`README.ja.md`, `README.md`**: プロジェクトの概要、機能、使い方、開発ガイドなどを説明するドキュメント（日本語版と英語版）です。
- **`_config.yml`**: GitHub Pagesのビルド設定を定義するファイルです。
- **`copilot-instructions.md`**: AIアシスタント（GitHub Copilot）に関する指示やメモが含まれています。
- **`docs/`**: プロジェクトの様々な技術詳細や使用方法に関するドキュメントを格納するディレクトリです。
    - **`CAT_OSCILLOSCOPE_WASM_SETUP.md`**: `cat-oscilloscope`ライブラリのWASMセットアップに関する技術詳細が記述されています。
    - **`COPILOT_GITHUB_PAGES_ACCESS.md`**: GitHub CopilotがGitHub Pagesにアクセスする方法に関する情報です。
    - **`DEPLOYMENT_VERIFICATION.md`**: デプロイが正しく行われたかを確認するための検証手順に関するドキュメントです。
    - **`OSCILLOSCOPE_LAYOUT.md`**: オシロスコープのUIレイアウトに関する情報です。
    - **`OSCILLOSCOPE_USAGE.md`**: オシロスコープの使用方法に関するガイドです。
- **`generated-docs/`**: 自動生成されたドキュメントを格納するプレースホルダーディレクトリです。
- **`index.html`**: ウェブアプリケーションのエントリーポイントとなるHTMLファイルで、ユーザーインターフェースの骨格を定義します。
- **`issue-notes/`**: 過去のイシュー（課題）に関するメモを格納するディレクトリです。
- **`package-lock.json`, `package.json`**: Node.jsプロジェクトの依存関係、スクリプト、メタデータを定義するファイルです。
- **`scripts/`**: プロジェクトの開発、テスト、デプロイを支援するためのシェルスクリプトやJavaScriptスクリプトを格納するディレクトリです。
    - **`README.md`**: `scripts`ディレクトリの内容を説明するファイルです。
    - **`install-wasm-pack.sh`**: Rustのwasm-packツールをインストールするためのシェルスクリプトです。
    - **`investigate-404.js`**: デプロイされたページで発生する404エラーを調査するためのJavaScriptスクリプトです。
    - **`investigate-cat-oscilloscope.js`**: 依存関係にある`cat-oscilloscope`リポジトリの状態を調査するスクリプトです。
    - **`screenshot-github-pages.js`**: GitHub Pagesのウェブページのスクリーンショットを自動で取得するスクリプトです。
    - **`setup-cat-oscilloscope-wasm.js`**: `cat-oscilloscope`のWASM関連のセットアップを行うスクリプトです。
    - **`test-console-logs.js`**: ウェブページのコンソールログを監視し、エラーなどをテストするスクリプトです。
    - **`test-pr-changes-locally.sh`**: プルリクエストの変更をローカル環境でテストするためのシェルスクリプトです。
    - **`test-waveform-screenshot.js`**: 波形表示が正しく機能しているか、スクリーンショットを撮って検証するスクリプトです。
    - **`verify-deployment.js`**: アプリケーションのデプロイが成功し、正しく動作しているかを検証するスクリプトです。
- **`src/`**: アプリケーションの主要なTypeScript/JavaScriptソースコードを格納するディレクトリです。
    - **`audio-player.ts`**: Tone.jsライブラリを使用してオーディオコンテキストの管理、WAVの再生など、オーディオ再生機能を提供します。
    - **`full-waveform-display.test.ts`**: 全体波形表示機能に関するテストコードです。
    - **`full-waveform-display.ts`**: 生成されたオーディオの全体的な波形をキャンバスに描画するUIコンポーネントを管理します。
    - **`index.ts`**: アプリケーションのエントリーポイントであり、メインのシンセサイザーロジックを初期化します。
    - **`oscilloscope.test.ts`**: オシロスコープ表示機能に関するテストコードです。
    - **`oscilloscope.ts`**: `cat-oscilloscope`ライブラリを統合し、リアルタイムでオーディオ波形を可視化する機能を提供します。
    - **`performance-stats.test.ts`**: パフォーマンス統計機能に関するテストコードです。
    - **`performance-stats.ts`**: オーディオ生成にかかる時間などのパフォーマンスデータを収集し、計算・表示するユーティリティです。
    - **`playback-mode.ts`**: アプリケーションの再生モード（リアルタイム/シーケンス）を管理し、それに応じてUIを更新するロジックが含まれています。
    - **`realtime-analysis.test.ts`**: リアルタイム分析・視覚化機能に関するテストコードです。
    - **`realtime-analysis.ts`**: リアルタイムでFFT（周波数スペクトラム）や波形をキャンバスに描画する視覚化機能を提供します。
    - **`settings.test.ts`**: アプリケーション設定の管理機能に関するテストコードです。
    - **`settings.ts`**: ユーザー設定の検証、ローカルストレージへの保存・ロード、JSONファイルとしてのインポート/エクスポートを処理します。
    - **`styles.css`**: アプリケーション全体のスタイルを定義するCSSファイルです。
    - **`synth-display.ts`**: シンセサイザーのUI要素（ステータス表示、生成時間、エラーメッセージなど）を更新する機能を提供します。
    - **`synth-ui-setup.ts`**: UI要素のイベントハンドラー（ボタンクリック、入力変更など）を設定し、設定のエクスポート/インポート機能もセットアップします。
    - **`synth.ts`**: アプリケーションのメインとなるシンセサイザーロジックを実装しています。オーディオのレンダリング、再生制御、マウストラッキングによるフィルターパラメータの制御、初期化などを担当します。
    - **`timing.test.ts`**: オーディオのタイミング計算機能に関するテストコードです。
    - **`timing.ts`**: BPMとビート数に基づいてオーディオの長さを計算するユーティリティ関数を提供します。
    - **`ui-params.test.ts`**: UIからパラメータを読み取る機能に関するテストコードです。
    - **`ui-params.ts`**: UI要素からシンセサイザーのパラメータを読み取り、マウス座標をフィルターのカットオフ周波数やQ値にマッピングする機能を提供します。
    - **`wasmAudio.ts`**: Rustで実装されたWASMモジュールのTypeScriptラッパーです。WASMモジュールのロード、オーディオレンダリング関数の呼び出し、パフォーマンス測定を行います。
    - **`wav.test.ts`**: WAVファイル生成機能に関するテストコードです。
    - **`wav.ts`**: 生のオーディオデータをWAVファイル形式に変換し、ブラウザでダウンロード可能なBlob URLを生成する機能を提供します。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイルです。
- **`vite.config.ts`**: Viteビルドツールの設定ファイルです。
- **`wasm-audio/`**: Rustで実装されたWebAssemblyオーディオモジュールのソースコードを格納するディレクトリです。
    - **`Cargo.toml`**: Rustプロジェクトの依存関係、メタデータ、ビルド設定を定義します。
    - **`README.md`**: `wasm-audio`モジュールに関する説明ドキュメントです。
    - **`src/`**: Rustのソースコードを格納します。
        - **`audio_renderer.rs`**: オーディオ信号をレンダリングするロジックを実装しています。
        - **`filter.rs`**: Biquadフィルターのアルゴリズムを実装しています。
        - **`lib.rs`**: Rustクレートのエントリーポイントであり、WebAssemblyとして公開される主要なオーディオ処理関数を定義します。
        - **`oscillator.rs`**: ノコギリ波やパルス波などの波形を生成するオシレーターのロジックを実装しています。
- **`waveform-gh.png`**: GitHubのREADMEなどに表示するための波形イメージファイルです。

## 関数詳細説明
- **`scripts/investigate-404.js`**
    - `investigate404()`: デプロイされたウェブページで発生する404エラー（ページが見つからないエラー）を自動的に調査し、その状況をレポートします。
- **`scripts/investigate-cat-oscilloscope.js`**
    - `checkGitHubRepo(owner, repo)`: 指定されたGitHubリポジトリ（例: `cat-oscilloscope`）が存在するかどうかを確認します。
    - `investigate(repoUrl)`: 特定のGitHubリポジトリ（URLで指定）に関する詳細な情報を収集し、その健全性を調査します。
- **`scripts/screenshot-github-pages.js`**
    - `takeScreenshot(url, filename)`: 指定されたURLのGitHub Pagesサイトのスクリーンショットを自動的に取得し、指定したファイル名で保存します。
- **`scripts/test-console-logs.js`**
    - `testConsoleLogs(url)`: 指定されたURLのウェブページにアクセスし、そのページがブラウザのコンソールに出力するログ（エラーや警告を含む）を監視・テストします。
- **`scripts/test-waveform-screenshot.js`**
    - `testWaveformVisualization(url)`: 指定されたURLのアプリケーションで表示される波形ビジュアライゼーションが正しく機能しているかを、スクリーンショットを撮ることで検証します。
- **`scripts/verify-deployment.js`**
    - `verifyDeployment(url)`: 指定されたURLへのアプリケーションのデプロイが成功し、主要な機能が期待通りに動作しているかをエンドツーエンドで検証します。
- **`src/audio-player.ts`**
    - `loadTone()`: Tone.jsオーディオライブラリをロードし、Web Audio APIのオーディオコンテキストを初期設定します。
    - `isToneLoaded()`: Tone.jsライブラリがアプリケーションにロード済みであるかどうかの状態を返します。
    - `getTone()`: ロード済みのTone.jsインスタンスを返却し、他のモジュールからの利用を可能にします。
    - `startAudioContext()`: Web Audio APIのオーディオコンテキストを開始し、ブラウザでのオーディオ再生を有効にします。
    - `isAudioContextRunning()`: オーディオコンテキストが現在実行中であるかどうかの状態を返します。
    - `playWavUrl(url)`: 提供されたWAVファイルのURLを読み込み、Tone.jsを使用してオーディオとして再生します。
    - `stopAndCleanup()`: 現在再生中のオーディオを停止し、関連するWeb Audio APIのリソースを解放してクリーンアップします。
- **`src/full-waveform-display.ts`**
    - `initFullWaveformDisplay(canvasId)`: アプリケーション全体で生成されたオーディオの完全な波形を表示するためのキャンバス要素を初期化します。
    - `drawFullWaveform(audioBuffer, canvasId)`: 提供されたオーディオバッファ（生のオーディオデータ）から、指定されたキャンバスに全波形を描画します。
    - `clearFullWaveform(canvasId)`: 指定された全波形表示キャンバスの内容を消去し、クリアな状態に戻します。
    - `disposeFullWaveformDisplay()`: 全波形表示機能に関連するリソース（イベントリスナーなど）を解放し、クリーンアップします。
    - `isFullWaveformDisplayInitialized()`: 全波形表示機能がすでに初期化されているかどうかの状態を返します。
- **`src/oscilloscope.ts`**
    - `initOscilloscope(canvasElement, config)`: 指定されたキャンバス要素と設定に基づき、リアルタイムオシロスコープを初期化し、オーディオ波形の視覚化を開始します。
    - `startDebugOverlayUpdates()`: オシロスコープ上にデバッグ情報（例: 周波数など）のオーバーレイ表示を更新する処理を開始します。
    - `stopDebugOverlayUpdates()`: デバッグオーバーレイの更新を停止します。
    - `frequencyToNote(frequency)`: 数値で与えられた周波数を、音楽のノート（例: C4、A3など）に変換して返します。
    - `validateInputs(config)`: オシロスコープの初期化または更新時に渡される設定オブジェクトの有効性を検証します。
    - `updateOscilloscope(data, config)`: 新しいオーディオデータと設定に基づいて、オシロスコープの表示内容をリアルタイムで更新します。
    - `stopOscilloscope()`: オシロスコープの波形表示および関連する処理を停止します。
    - `isOscilloscopeInitialized()`: オシロスコープがすでに初期化されているかどうかの状態を返します。
- **`src/performance-stats.ts`**
    - `createPerformanceStats()`: パフォーマンス統計を記録するための新しいオブジェクトを初期化します。
    - `addPerformanceSample(time)`: 処理にかかった時間（ミリ秒など）をパフォーマンス統計データに追加します。
    - `calculatePerformanceStats()`: 収集されたパフォーマンスサンプルから、平均、最小、最大などの統計情報を計算して返します。
    - `resetPerformanceStats()`: 記録されたすべてのパフォーマンス統計データをクリアし、初期状態に戻します。
- **`src/playback-mode.ts`**
    - `getCurrentMode()`: 現在のオーディオ再生モード（例: リアルタイム、シーケンス）を返します。
    - `updateModeUI(mode)`: 指定された再生モードに基づいて、ユーザーインターフェース（ボタンの状態など）を更新します。
    - `switchMode(newMode)`: オーディオ再生モードを新しいモードに切り替えます。
- **`src/realtime-analysis.ts`**
    - `initRealtimeAnalysis(analyserNode, waveformCanvas, fftCanvas)`: リアルタイムでのオーディオ分析と視覚化（波形、FFTスペクトラム）を行うためのキャンバス要素とオーディオアナライザーノードを初期化します。
    - `startRealtimeVisualization()`: リアルタイムでの波形とFFTスペクトラムの視覚化処理を開始します。
    - `stopRealtimeVisualization()`: リアルタイム視覚化処理を停止します。
    - `animate()`: 視覚化を連続的に描画するためのアニメーションループを実行します。
    - `drawFFT(analyser, canvas, canvasCtx)`: Web Audio APIのアナライザーノードからFFT（高速フーリエ変換）データを取得し、指定されたキャンバスに周波数スペクトラムとして描画します。
    - `drawWaveform(analyser, canvas, canvasCtx)`: アナライザーノードから生のオーディオ波形データを取得し、指定されたキャンバスにリアルタイム波形として描画します。
    - `isRealtimeAnalysisInitialized()`: リアルタイム分析機能が初期化されているかどうかの状態を返します。
    - `disposeRealtimeAnalysis()`: リアルタイム分析機能に関連するリソース（イベントリスナーなど）を解放し、クリーンアップします。
- **`src/settings.ts`**
    - `validateSettings(settings)`: 提供された設定オブジェクトが有効な値を保持しているかを検証し、不整合があれば修正またはエラーを報告します。
    - `loadSettings()`: ブラウザのローカルストレージからアプリケーションの設定をロードします。
    - `saveSettings(settings)`: 現在のアプリケーション設定をブラウザのローカルストレージに保存し、永続化します。
    - `exportSettingsToFile(settings)`: 現在の設定をJSON形式のファイルとして生成し、ユーザーがダウンロードできるようにします。
    - `importSettingsFromFile(file)`: ユーザーがアップロードしたJSONファイルから設定を読み込み、アプリケーションに適用します。
- **`src/synth-display.ts`**
    - `displayOscilloscopeError(message)`: オシロスコープ関連のエラーメッセージをユーザーインターフェース上の特定の表示領域に表示します。
    - `updateStatusDisplay(message, isError)`: アプリケーションの現在のステータスや情報メッセージ（エラーを含む）をUIに表示します。
    - `updateGenerationTimeDisplay(time)`: オーディオ生成にかかった時間（ミリ秒など）をUI上の専用の表示領域に更新して表示します。
- **`src/synth-ui-setup.ts`**
    - `setupExportSettingsButton()`: 設定エクスポートボタンのクリックイベントリスナーを設定し、`exportSettingsToFile`関数を呼び出すようにします。
    - `setupImportSettingsButton()`: 設定インポートボタンのイベントリスナーを設定し、ファイル選択と`importSettingsFromFile`関数を連携させます。
    - `setupTabHandlers()`: UI上のタブ切り替え機能を設定し、クリック時に表示内容が切り替わるようにします。
    - `setupMouseAndInputHandlers()`: マウスの動き（フィルター制御など）や入力フィールド（パラメータ設定）に関連するイベントハンドラーをまとめて設定します。
    - `handleInputChange(event)`: UIの入力フィールドで値が変更されたときにトリガーされるイベントを処理し、アプリケーションの状態を更新します。
- **`src/synth.ts`**
    - `getCurrentSettings()`: アプリケーションの現在の設定オブジェクト全体を取得します。
    - `readParameters()`: ユーザーインターフェースの各要素からシンセサイザーの各種パラメータ（波形タイプ、デューティー比、フィルター設定など）を読み取ります。
    - `renderAudio(settings, mouseX, mouseY)`: 指定された設定とマウスのX/Y座標（フィルター制御用）に基づいて、オーディオ信号を生成・処理します。
    - `playAudioWav(wavBlobUrl)`: 提供されたWAV形式のオーディオBlob URLをTone.js経由で再生します。
    - `playAudioSeq(audioBuffer)`: 生成されたオーディオバッファをシーケンスとして繰り返し再生します。
    - `playAudio(audioBuffer)`: アプリケーションの現在の再生モード（WAVまたはシーケンス）に応じて、オーディオバッファを再生します。
    - `handleModeSwitch()`: ユーザーが再生モードを切り替えたときに呼び出され、関連するロジックやUIの更新を行います。
    - `init()`: シンセサイザーアプリケーション全体の初期化処理（WASMモジュールのロード、UI設定、イベントリスナー登録など）を実行します。
    - `scheduleNextPlay(intervalMs)`: 指定された時間間隔（ミリ秒）で次のオーディオ再生サイクルをスケジュールします。
    - `dispose()`: シンセサイザーが使用するすべてのリソース（オーディオコンテキスト、イベントリスナーなど）を解放し、クリーンアップします。
    - `handleClick()`: ユーザーがページ上の任意の場所をクリックしたときに発生するイベントを処理し、オーディオコンテキストの開始などを行います。
- **`src/timing.ts`**
    - `calculateDuration(bpm, beats)`: 音楽のテンポ（BPM）とビート数に基づいて、オーディオの合計持続時間をミリ秒単位で計算します。
- **`src/ui-params.ts`**
    - `readNumericParameter(elementId, defaultValue)`: 指定されたHTML要素IDから数値パラメータを読み取り、値が無効な場合はデフォルト値を返します。
    - `readParametersFromUI()`: ユーザーインターフェース上のすべての入力フィールドからシンセサイザーのパラメータ値を読み取り、オブジェクトとして返します。
    - `updateUIFields(settings)`: 提供された設定オブジェクトに基づいて、ユーザーインターフェースの各入力フィールドの値を更新します。
    - `mapMouseToFilterParams(mouseX, mouseY)`: マウスのX座標とY座標を、フィルターのカットオフ周波数とレゾナンス（Q値）のパラメータにマッピングします。
    - `updateMousePositionDisplay(mouseX, mouseY)`: マウスの現在位置（フィルターパラメータに変換された値）をUI上に表示してフィードバックを提供します。
- **`src/wasmAudio.ts`**
    - `initWasm()`: RustでコンパイルされたWebAssemblyモジュールを非同期でロードし、初期化します。
    - `isWasmInitialized()`: WebAssemblyモジュールがロードされ、初期化済みであるかどうかの状態を返します。
    - `renderAudioWasm(settings, mouseX, mouseY)`: Rust WASMモジュール内の関数を呼び出し、指定された設定とマウス座標に基づいてオーディオ信号をレンダリング（生成・処理）します。
- **`src/wav.ts`**
    - `generateWav(audioBuffer, sampleRate)`: 生のオーディオデータ（`audioBuffer`）とサンプリングレートから、標準的なWAVファイル形式のバイナリデータを生成します。
    - `writeString(view, offset, s)`: 指定された`DataView`オブジェクトの特定の位置に文字列を書き込みます（主にWAVヘッダーの構築に使用）。
    - `createWavBlobUrl(buffer, sampleRate)`: 生成されたWAVバイナリデータから、ブラウザでダウンロード可能なBlob URLを作成します。

## 関数呼び出し階層ツリー
```
アプリケーションの起動と初期化
└── src/index.ts (エントリーポイント)
    └── src/synth.ts: init()
        ├── src/wasmAudio.ts: initWasm() (WASMモジュールの初期化)
        ├── src/audio-player.ts: loadTone() (Tone.jsとオーディオコンテキストのロード)
        ├── src/oscilloscope.ts: initOscilloscope() (オシロスコープの初期化)
        ├── src/realtime-analysis.ts: initRealtimeAnalysis() (リアルタイム分析機能の初期化)
        ├── src/full-waveform-display.ts: initFullWaveformDisplay() (全体波形表示の初期化)
        └── src/synth-ui-setup.ts: setupMouseAndInputHandlers() など (UIイベントハンドラーの設定)

ユーザーのインタラクションとオーディオ再生
├── src/synth.ts: handleClick() (最初のクリックでオーディオ開始)
│   └── src/audio-player.ts: startAudioContext()
├── (メインループまたはイベント駆動)
│   └── src/synth.ts: renderAudio() (オーディオ信号の生成と処理)
│       ├── src/wasmAudio.ts: renderAudioWasm() (WASM経由でコアDSP処理を実行)
│       ├── src/oscilloscope.ts: updateOscilloscope() (リアルタイム波形を更新)
│       ├── src/realtime-analysis.ts: startRealtimeVisualization()
│       │   └── src/realtime-analysis.ts: animate() (アニメーションループ)
│       │       ├── src/realtime-analysis.ts: drawFFT() (FFTスペクトラム描画)
│       │       └── src/realtime-analysis.ts: drawWaveform() (リアルタイム波形描画)
│       ├── src/performance-stats.ts: addPerformanceSample() (処理時間を記録)
│       └── src/synth.ts: playAudio() (生成されたオーディオの再生制御)
│           ├── src/synth.ts: playAudioWav()
│           │   └── src/audio-player.ts: playWavUrl() (WAV形式で再生)
│           └── src/synth.ts: playAudioSeq() (シーケンス再生)
└── src/synth.ts: scheduleNextPlay() (次の再生をスケジュール)

設定の管理と永続化
├── src/synth-ui-setup.ts: setupExportSettingsButton()
│   └── src/settings.ts: exportSettingsToFile() (設定をJSONファイルでエクスポート)
├── src/synth-ui-setup.ts: setupImportSettingsButton()
│   └── src/settings.ts: importSettingsFromFile() (JSONファイルから設定をインポート)
└── (アプリケーション内部で)
    ├── src/settings.ts: saveSettings() (設定をローカルストレージに保存)
    └── src/settings.ts: loadSettings() (ローカルストレージから設定をロード)

WAVファイルの生成
└── src/wav.ts: createWavBlobUrl()
    └── src/wav.ts: generateWav() (オーディオバッファからWAVデータを生成)
        └── src/wav.ts: writeString() (WAVヘッダーを書き込む補助関数)
```

---
Generated at: 2026-04-07 07:09:20 JST
