Last updated: 2026-02-10

# Project Overview

## プロジェクト概要
- Rust WASMで実装された、ローパスフィルター（LPF）機能を備えたシンプルなソフトウェアシンセサイザーです。
- リアルタイムでの波形ビジュアライゼーションとマウス操作によるインタラクティブなフィルター制御が可能です。
- 生成したオーディオはWAVファイルとしてエクスポートでき、Webブラウザ上で動作するデモを通じて体験できます。

## 技術スタック
- フロントエンド:
    - **HTML/CSS/TypeScript**: アプリケーションの構造、スタイル、ロジックを構成します。
    - **Vite**: 高速な開発サーバーと本番ビルドツールを提供し、ホットモジュールリプレースメント (HMR) をサポートします。
    - **Tone.js**: クリーンなオーディオ再生とWeb Audio APIとの連携を容易にするJavaScriptオーディオフレームワークです。
    - **cat-oscilloscope**: Rust/WASMベースの高性能なオシロスコープライブラリで、リアルタイムの波形とFFTスペクトル表示に使用されます。
- 音楽・オーディオ:
    - **Rust WASM**: 高速なデジタル信号処理（DSP）のために使用され、オシレーター生成、Biquadフィルターの実装、オーディオレンダリングを担います。
    - **Web Audio API**: ブラウザ上でのオーディオ処理と再生の中核となります（Tone.jsを介して利用）。
    - **WAV生成**: 処理されたオーディオデータを標準的なWAVファイル形式で出力する機能が組み込まれています。
- 開発ツール:
    - **Node.js/npm**: JavaScriptエコシステムのパッケージ管理とスクリプト実行環境です。
    - **Rust/Cargo**: Rustプログラミング言語とそのビルドシステムです。
    - **wasm-pack**: RustコードをWebAssembly (WASM) にコンパイルし、JavaScriptから利用するためのツールです。
    - **typescript**: JavaScriptに型安全性をもたらす言語です。
- テスト:
    - **Vitest**: 高速な単体テストフレームワークです。
    - **@vitest/ui**: Vitestのテストを視覚的に実行・管理するためのUIを提供します。
    - **Playwright**: エンドツーエンド (E2E) テストフレームワークで、ブラウザ操作の自動化に使用されます。
    - **happy-dom**: Vitestテスト環境でDOM操作をシミュレートするためのJavaScript実装です。
- ビルドツール:
    - **Vite**: アプリケーションのバンドルと最適化を行います。
    - **wasm-pack**: Rust WASMモジュールをビルドします。
    - **wasm-opt (binaryen)**: WASMバイナリのサイズと実行速度を最適化するために使用されます。
- 言語機能:
    - **Rust**: 高パフォーマンスが求められる信号処理のコアロジックを記述するために使用されます。
    - **TypeScript**: アプリケーションのフロントエンドロジックの記述に使用され、開発時の型安全性を確保します。
- 自動化・CI/CD:
    - **GitHub Actions**: リポジトリへの変更があった際に、自動的にテストの実行 (`ci.yml`) やデプロイ (`deploy.yml`) を行います。
    - **GitHub Pages**: ビルドされたアプリケーションをホスティングし、公開デモを提供します。
- 開発標準:
    - **tsconfig.json**: TypeScriptのコンパイル設定を定義します。
    - **vite.config.ts**: Viteのビルド設定を定義します。
    - **.gitignore, LICENSE, README.md**: プロジェクトの基本的な設定ファイル、ライセンス情報、ドキュメントです。

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
- **index.html**: プロジェクトのエントリーポイントとなるHTMLファイルで、シンセサイザーのユーザーインターフェースとJavaScriptアプリケーションのロードを行います。
- **DEVELOPMENT.md**: 開発フレームワーク、テスト戦略、および開発プロセスに関する詳細な情報を提供するドキュメントです。
- **LICENSE**: プロジェクトのライセンス情報（MITライセンス）が記述されています。
- **README.ja.md / README.md**: プロジェクトの概要、機能、デモ、使用方法、開発ガイドなど、多言語で提供される主要なドキュメントファイルです。
- **_config.yml**: GitHub Pagesのビルド設定ファイルで、Jekyllを使用する際に利用されます。
- **copilot-instructions.md**: GitHub Copilotの使用に関する指示やガイドラインが記載されたドキュメントです。
- **docs/**: プロジェクトに関する補助的なドキュメントを格納するディレクトリです。
    - **CAT_OSCILLOSCOPE_WASM_SETUP.md**: `cat-oscilloscope`ライブラリのWASMセットアップに関する技術的な詳細を説明します。
    - **COPILOT_GITHUB_PAGES_ACCESS.md**: GitHub CopilotからGitHub Pagesへのアクセスに関する情報を提供します。
    - **DEPLOYMENT_VERIFICATION.md**: デプロイが成功したことを検証するための手順が記述されています。
    - **OSCILLOSCOPE_LAYOUT.md**: オシロスコープの表示レイアウトに関する詳細を説明します。
    - **OSCILLOSCOPE_USAGE.md**: オシロスコープの使用方法に関するガイドです。
- **generated-docs/**: おそらく、何らかのツールによって自動生成されたドキュメントを格納する場所です。
- **issue-notes/**: GitHub Issuesに関連する開発者向けのメモや詳細情報が、issue番号ごとにファイルとして整理されています。
- **package.json**: Node.jsプロジェクトのメタデータ、依存関係、およびビルド/テスト/開発スクリプトを定義するファイルです。
- **package-lock.json**: `package.json`で指定された依存関係の正確なバージョンと解決済みツリーを記録し、ビルドの再現性を保証します。
- **scripts/**: プロジェクトのビルド、テスト、デプロイ、ユーティリティ操作などを支援するシェルスクリプトやJavaScriptスクリプトを格納します。
    - **install-wasm-pack.sh**: Rustの`wasm-pack`ツールをシステムにインストールするためのシェルスクリプトです。
    - **investigate-404.js**: Playwrightを使用してGitHub Pages上の404エラーを調査するスクリプトです。
    - **investigate-cat-oscilloscope.js**: `cat-oscilloscope` GitHubリポジトリの状態を調査するためのスクリプトです。
    - **screenshot-github-pages.js**: Playwrightを使用してデプロイされたGitHub Pagesのスクリーンショットをキャプチャするスクリプトです。
    - **setup-cat-oscilloscope-wasm.js**: `cat-oscilloscope`のWASMモジュールを設定・準備するためのスクリプトです。
    - **test-console-logs.js**: Playwrightを使用してアプリケーションのコンソール出力をテストするスクリプトです。
    - **test-pr-changes-locally.sh**: GitHubのプルリクエストで行われた変更をローカル環境でテストするためのシェルスクリプトです。
    - **test-waveform-screenshot.js**: Playwrightを使用して波形ビジュアライゼーションの正確性をスクリーンショットで検証するスクリプトです。
    - **verify-deployment.js**: Playwrightを使用してGitHub Pagesへのデプロイが正常に完了したことを検証するスクリプトです。
- **src/**: アプリケーションの主要なTypeScriptソースコードを格納するディレクトリです。
    - **audio-player.ts**: Tone.jsを介したWeb Audio Contextの管理、オーディオ再生、および再生状態の制御を担当します。
    - **full-waveform-display.test.ts**: `full-waveform-display.ts`の実装に対する単体テストファイルです。
    - **full-waveform-display.ts**: レンダリングされたオーディオ全体の波形をキャンバスに表示する機能を提供します。
    - **index.ts**: アプリケーションのメインエントリーポイントで、シンセサイザーの初期化を行います。
    - **oscilloscope.test.ts**: `oscilloscope.ts`の実装に対する単体テストファイルです。
    - **oscilloscope.ts**: `cat-oscilloscope`ライブラリを統合し、リアルタイムでオーディオ信号の波形とFFTスペクトルを表示します。
    - **performance-stats.test.ts**: `performance-stats.ts`の実装に対する単体テストファイルです。
    - **performance-stats.ts**: オーディオ生成などのパフォーマンス測定結果を収集し、統計を計算・管理します。
    - **playback-mode.ts**: アプリケーションの再生モード（例：リアルタイム生成、WAV再生）を管理し、それに応じてUIを更新します。
    - **realtime-analysis.test.ts**: `realtime-analysis.ts`の実装に対する単体テストファイルです。
    - **realtime-analysis.ts**: Tone.jsの分析ノードを利用して、リアルタイムで波形とFFTスペクトルをキャンバスに描画します。
    - **settings.test.ts**: `settings.ts`の実装に対する単体テストファイルです。
    - **settings.ts**: アプリケーションの設定の読み込み、保存、検証、およびJSONファイルとしてのエクスポート/インポート機能を提供します。
    - **synth.ts**: シンセサイザーの中核ロジックを実装し、UIとのインタラクション、オーディオレンダリング、再生、状態管理を行います。
    - **timing.test.ts**: `timing.ts`の実装に対する単体テストファイルです。
    - **timing.ts**: BPMとビートに基づいてオーディオ再生のタイミングと持続時間を計算するユーティリティ関数を提供します。
    - **ui-params.test.ts**: `ui-params.ts`の実装に対する単体テストファイルです。
    - **ui-params.ts**: UI要素からシンセサイザーパラメータを読み取り、マウス座標をフィルター設定にマッピングし、UI表示を更新します。
    - **wasmAudio.ts**: Rust WASMオーディオモジュールとの橋渡しをするTypeScriptラッパーで、WASMの初期化とオーディオレンダリング関数の呼び出しを担当します。
    - **wav.test.ts**: `wav.ts`の実装に対する単体テストファイルです。
    - **wav.ts**: 生のオーディオデータからWAVファイルフォーマットのBlobを生成し、そのBlobから再生可能なURLを作成する機能を提供します。
- **tsconfig.json**: TypeScriptコンパイラのための設定ファイルで、コンパイルオプションや対象ファイルなどを定義します。
- **vite.config.ts**: Viteビルドツール用の設定ファイルで、プロジェクトのビルドプロセスに関する詳細を定義します。
- **wasm-audio/**: Rustで記述されたオーディオ信号処理モジュールのソースコードを格納するディレクトリです。
    - **Cargo.toml**: Rustクレートのビルド設定、依存関係、メタデータを定義するファイルです。
    - **README.md**: `wasm-audio`クレートに関する説明ドキュメントです。
    - **src/**: Rust WASMモジュールのソースコードが配置されるディレクトリです。
        - **audio_renderer.rs**: オーディオ信号のレンダリングロジックを実装します。
        - **filter.rs**: Biquadフィルター（ローパス、ハイパスなど）のアルゴリズムを実装します。
        - **lib.rs**: `wasm-audio`クレートのライブラリエントリーポイントで、JavaScript/WASMインターフェースを公開します。
        - **oscillator.rs**: ノコギリ波やパルス波などの波形を生成するオシレーターロジックを実装します。

## 関数詳細説明
- **investigate404** (scripts/investigate-404.js): GitHub Pages上のデプロイにおいて404エラーが発生していないか、Playwrightを用いて検証します。
    - 引数: なし
    - 戻り値: Promise<void>
- **checkGitHubRepo** (scripts/investigate-cat-oscilloscope.js): 指定されたGitHubリポジトリの存在とアクセス可能性を確認します。
    - 引数: `owner: string`, `repo: string`
    - 戻り値: Promise<boolean>
- **investigate** (scripts/investigate-cat-oscilloscope.js): `cat-oscilloscope`ライブラリの最新情報を取得し、関連する問題を調査します。
    - 引数: なし
    - 戻り値: Promise<void>
- **takeScreenshot** (scripts/screenshot-github-pages.js): デプロイされたGitHub PagesのウェブページをPlaywrightで開いてスクリーンショットを撮影します。
    - 引数: なし
    - 戻り値: Promise<void>
- **testConsoleLogs** (scripts/test-console-logs.js): Playwrightを用いて、ウェブアプリケーションのコンソール出力に予期せぬエラーや警告がないかをテストします。
    - 引数: なし
    - 戻り値: Promise<void>
- **testWaveformVisualization** (scripts/test-waveform-screenshot.js): Playwrightを使用して、アプリケーションの波形ビジュアライゼーションが正しく機能しているかをスクリーンショットで確認します。
    - 引数: なし
    - 戻り値: Promise<void>
- **verifyDeployment** (scripts/verify-deployment.js): Playwrightを用いて、GitHub Pagesへのアプリケーションのデプロイが成功し、正しく動作していることをエンドツーエンドで検証します。
    - 引数: なし
    - 戻り値: Promise<void>
- **loadTone** (src/audio-player.ts): Tone.jsオーディオライブラリを非同期にロードし、初期化します。
    - 引数: なし
    - 戻り値: Promise<void>
- **isToneLoaded** (src/audio-player.ts): Tone.jsがすでにロードされているかどうかを示す真偽値を返します。
    - 引数: なし
    - 戻り値: boolean
- **getTone** (src/audio-player.ts): ロード済みのTone.jsインスタンスを返します。
    - 引数: なし
    - 戻り値: `typeof Tone`
- **startAudioContext** (src/audio-player.ts): Web Audio Contextを開始し、オーディオ再生を可能にします。ユーザーインタラクションによってトリガーされることが多いです。
    - 引数: なし
    - 戻り値: Promise<void>
- **isAudioContextRunning** (src/audio-player.ts): Web Audio Contextが現在実行中であるか（`running`状態か）を判定します。
    - 引数: なし
    - 戻り値: boolean
- **playWavUrl** (src/audio-player.ts): 指定されたWAVファイルのURLをTone.js経由でロードし、再生します。
    - 引数: `url: string`
    - 戻り値: Promise<void>
- **stopAndCleanup** (src/audio-player.ts): 現在再生中のオーディオを停止し、関連するTone.jsのリソースをクリーンアップします。
    - 引数: なし
    - 戻り値: Promise<void>
- **initFullWaveformDisplay** (src/full-waveform-display.ts): 全波形表示用のキャンバス要素を初期化し、描画コンテキストを準備します。
    - 引数: `canvasId: string`
    - 戻り値: void
- **drawFullWaveform** (src/full-waveform-display.ts): 提供されたオーディオデータに基づいて、指定されたキャンバスに波形全体を描画します。
    - 引数: `audioBuffer: Float32Array[]`, `canvasId: string`, `canvasWidth: number`, `canvasHeight: number`
    - 戻り値: void
- **clearFullWaveform** (src/full-waveform-display.ts): 全波形表示用のキャンバスをクリアし、描画をリセットします。
    - 引数: `canvasId: string`
    - 戻り値: void
- **disposeFullWaveformDisplay** (src/full-waveform-display.ts): 全波形表示に関連するすべてのリソース（イベントリスナーなど）を解放します。
    - 引数: `canvasId: string`
    - 戻り値: void
- **isFullWaveformDisplayInitialized** (src/full-waveform-display.ts): 全波形表示が初期化されているかどうかを判定します。
    - 引数: `canvasId: string`
    - 戻り値: boolean
- **initOscilloscope** (src/oscilloscope.ts): `cat-oscilloscope`ライブラリを初期化し、オシロスコープ表示を設定します。
    - 引数: `canvasId: string`
    - 戻り値: Promise<void>
- **startDebugOverlayUpdates** (src/oscilloscope.ts): オシロスコープ上のデバッグオーバーレイの更新を開始します。
    - 引数: なし
    - 戻り値: void
- **stopDebugOverlayUpdates** (src/oscilloscope.ts): オシロスコープ上のデバッグオーバーレイの更新を停止します。
    - 引数: なし
    - 戻り値: void
- **frequencyToNote** (src/oscilloscope.ts): 指定された周波数を対応する音名（例: "A4"）に変換します。
    - 引数: `frequency: number`
    - 戻り値: string
- **validateInputs** (src/oscilloscope.ts): オシロスコープの入力パラメータ（例: 周波数範囲、表示モード）を検証します。
    - 引数: `options: OscilloscopeOptions`
    - 戻り値: boolean
- **updateOscilloscope** (src/oscilloscope.ts): オシロスコープの表示を、現在のオーディオデータと設定に基づいて更新します。
    - 引数: `data: Float32Array`, `config: OscilloscopeConfig`
    - 戻り値: void
- **stopOscilloscope** (src/oscilloscope.ts): オシロスコープの表示を停止し、リソースを一時停止します。
    - 引数: なし
    - 戻り値: void
- **isOscilloscopeInitialized** (src/oscilloscope.ts): オシロスコープが初期化されているかどうかを判定します。
    - 引数: なし
    - 戻り値: boolean
- **createPerformanceStats** (src/performance-stats.ts): 新しいパフォーマンス統計トラッカーを初期化し、返します。
    - 引数: なし
    - 戻り値: `PerformanceStats`オブジェクト
- **addPerformanceSample** (src/performance-stats.ts): 生成時間などのパフォーマンス測定値をサンプルとして統計トラッカーに追加します。
    - 引数: `stats: PerformanceStats`, `sample: number`
    - 戻り値: void
- **calculatePerformanceStats** (src/performance-stats.ts): 収集されたサンプルデータから平均、最大、最小などのパフォーマンス統計を計算して返します。
    - 引数: `stats: PerformanceStats`
    - 戻り値: `CalculatedStats`オブジェクト
- **resetPerformanceStats** (src/performance-stats.ts): パフォーマンス統計トラッカーのすべてのサンプルデータをリセットします。
    - 引数: `stats: PerformanceStats`
    - 戻り値: void
- **getCurrentMode** (src/playback-mode.ts): 現在のオーディオ再生モード（例: シーケンス再生、WAV再生）を返します。
    - 引数: なし
    - 戻り値: `PlaybackMode`
- **updateModeUI** (src/playback-mode.ts): 現在の再生モードに基づいて、関連するユーザーインターフェース要素を更新します。
    - 引数: `mode: PlaybackMode`
    - 戻り値: void
- **switchMode** (src/playback-mode.ts): アプリケーションの再生モードを指定されたモードに切り替えます。
    - 引数: `newMode: PlaybackMode`
    - 戻り値: void
- **initRealtimeAnalysis** (src/realtime-analysis.ts): リアルタイム分析用のキャンバスとTone.jsの分析ノード（FFT、波形）を初期化します。
    - 引数: `canvasId: string`
    - 戻り値: void
- **startRealtimeVisualization** (src/realtime-analysis.ts): リアルタイムの波形とFFTスペクトルの描画アニメーションを開始します。
    - 引数: `sourceNode: AudioNode`
    - 戻り値: void
- **stopRealtimeVisualization** (src/realtime-analysis.ts): リアルタイムの波形とFFTスペクトルの描画アニメーションを停止します。
    - 引数: なし
    - 戻り値: void
- **animate** (src/realtime-analysis.ts): リアルタイム分析の描画ループを実行し、波形とFFTスペクトルをフレームごとに更新します。
    - 引数: なし
    - 戻り値: void
- **drawFFT** (src/realtime-analysis.ts): リアルタイムのFFTスペクトルデータをキャンバスに描画します。
    - 引数: なし
    - 戻り値: void
- **drawWaveform** (src/realtime-analysis.ts): リアルタイムの波形データをキャンバスに描画します。
    - 引数: なし
    - 戻り値: void
- **isRealtimeAnalysisInitialized** (src/realtime-analysis.ts): リアルタイム分析機能が初期化済みかどうかを判定します。
    - 引数: なし
    - 戻り値: boolean
- **disposeRealtimeAnalysis** (src/realtime-analysis.ts): リアルタイム分析に関連するすべてのリソース（アニメーションフレーム、分析ノードなど）を解放します。
    - 引数: なし
    - 戻り値: void
- **validateSettings** (src/settings.ts): アプリケーションの設定オブジェクトの各プロパティが有効な範囲内にあるかを検証し、必要に応じて修正します。
    - 引数: `settings: AppSettings`
    - 戻り値: `AppSettings` (検証・修正後の設定)
- **loadSettings** (src/settings.ts): ローカルストレージからアプリケーション設定を読み込み、存在しない場合はデフォルト設定を返します。
    - 引数: なし
    - 戻り値: `AppSettings`
- **saveSettings** (src/settings.ts): 現在のアプリケーション設定をローカルストレージに保存します。
    - 引数: `settings: AppSettings`
    - 戻り値: void
- **exportSettingsToFile** (src/settings.ts): 現在のアプリケーション設定をJSONファイルとしてダウンロードします。
    - 引数: `settings: AppSettings`
    - 戻り値: void
- **importSettingsFromFile** (src/settings.ts): ユーザーが選択したJSONファイルから設定を読み込み、アプリケーションに適用します。
    - 引数: `file: File`
    - 戻り値: Promise<`AppSettings`>
- **getCurrentSettings** (src/synth.ts): シンセサイザーの現在の設定オブジェクトを返します。
    - 引数: なし
    - 戻り値: `AppSettings`
- **displayOscilloscopeError** (src/synth.ts): オシロスコープ関連のエラーメッセージをユーザーインターフェースに表示します。
    - 引数: `message: string`
    - 戻り値: void
- **readParameters** (src/synth.ts): UIから現在のシンセサイザーパラメータ（波形タイプ、デューティー比など）を読み取ります。
    - 引数: なし
    - 戻り値: `SynthParameters`
- **renderAudio** (src/synth.ts): 指定されたシンセサイザーパラメータに基づいて、オーディオ信号を生成・レンダリングします。WASMモジュールを利用します。
    - 引数: `params: SynthParameters`
    - 戻り値: `Float32Array[]` (レンダリングされたオーディオデータ)
- **playAudioWav** (src/synth.ts): レンダリングされたオーディオデータをWAVファイルとして生成し、それを再生します。
    - 引数: `audioBuffers: Float32Array[]`
    - 戻り値: Promise<void>
- **playAudioSeq** (src/synth.ts): オーディオシーケンス（現在のBPMとビート設定に基づく）を生成し、再生します。
    - 引数: なし
    - 戻り値: Promise<void>
- **playAudio** (src/synth.ts): 現在の再生モードに応じて、オーディオレンダリングと再生プロセスを開始するメイン関数です。
    - 引数: なし
    - 戻り値: Promise<void>
- **handleModeSwitch** (src/synth.ts): ユーザーが再生モードを切り替えた際の処理（UI更新、関連リソースの初期化/破棄など）を行います。
    - 引数: `newMode: PlaybackMode`
    - 戻り値: void
- **init** (src/synth.ts): シンセサイザーアプリケーション全体を初期化し、UI、オーディオモジュール、イベントリスナーを設定します。
    - 引数: なし
    - 戻り値: Promise<void>
- **scheduleNextPlay** (src/synth.ts): BPMとビートに基づいて、次のオーディオ再生をスケジュールします。
    - 引数: なし
    - 戻り値: void
- **updateStatusDisplay** (src/synth.ts): アプリケーションの現在の状態（例: "Playing...", "Rendering..."）をUIに表示します。
    - 引数: `status: string`
    - 戻り値: void
- **updateGenerationTimeDisplay** (src/synth.ts): オーディオ生成にかかった時間やパフォーマンス統計をUIに表示します。
    - 引数: `timeMs: number`
    - 戻り値: void
- **dispose** (src/synth.ts): シンセサイザーアプリケーションが終了する際に、すべてのリソース（オーディオコンテキスト、イベントリスナーなど）を解放します。
    - 引数: なし
    - 戻り値: void
- **handleInputChange** (src/synth.ts): UI上の入力フィールド（スライダー、テキストボックスなど）が変更された際のイベントを処理し、設定を更新します。
    - 引数: `event: Event`
    - 戻り値: void
- **handleClick** (src/synth.ts): UI上の要素がクリックされた際のイベントを処理し、オーディオコンテキストの開始やモード切り替えなどを行います。
    - 引数: `event: MouseEvent`
    - 戻り値: void
- **calculateDuration** (src/timing.ts): 指定されたBPMとビート数に基づいて、オーディオの総再生時間（秒単位）を計算します。
    - 引数: `bpm: number`, `beats: number`
    - 戻り値: number (秒)
- **readNumericParameter** (src/ui-params.ts): UIから指定されたIDの入力要素から数値を読み取り、検証して返します。
    - 引数: `id: string`, `defaultValue: number`, `min: number`, `max: number`
    - 戻り値: number
- **readParametersFromUI** (src/ui-params.ts): アプリケーションのユーザーインターフェースから、すべてのシンセサイザー設定パラメータを読み取ってオブジェクトとして返します。
    - 引数: なし
    - 戻り値: `AppSettings`
- **updateUIFields** (src/ui-params.ts): アプリケーションの現在の設定に基づいて、UI上の入力フィールドや表示要素を更新します。
    - 引数: `settings: AppSettings`
    - 戻り値: void
- **mapMouseToFilterParams** (src/ui-params.ts): マウスのX/Y座標を、フィルターのカットオフ周波数とレゾナンス（Q値）にマッピングします。
    - 引数: `mouseX: number`, `mouseY: number`, `elementWidth: number`, `elementHeight: number`, `settings: AppSettings`
    - 戻り値: `{ cutoffHz: number, qValue: number }`
- **updateMousePositionDisplay** (src/ui-params.ts): 現在のマウス位置に対応するフィルターパラメータ（カットオフ周波数、Q値）をUI上に表示します。
    - 引数: `cutoffHz: number`, `qValue: number`
    - 戻り値: void
- **initWasm** (src/wasmAudio.ts): RustでコンパイルされたWASMオーディオモジュールを非同期にロードし、初期化します。
    - 引数: なし
    - 戻り値: Promise<void>
- **isWasmInitialized** (src/wasmAudio.ts): WASMオーディオモジュールがロードされ、初期化済みかどうかを判定します。
    - 引数: なし
    - 戻り値: boolean
- **renderAudioWasm** (src/wasmAudio.ts): Rust WASMモジュールの`render`関数を呼び出し、指定されたパラメータでオーディオ信号を生成します。
    - 引数: `params: WasmAudioParams`
    - 戻り値: `Float32Array[]`
- **generateWav** (src/wav.ts): 生のオーディオデータ（Float32Arrayの配列）をRIFF/WAV形式のArrayBufferに変換します。
    - 引数: `audioBuffers: Float32Array[]`, `sampleRate: number`
    - 戻り値: `ArrayBuffer`
- **writeString** (src/wav.ts): DataViewオブジェクトの指定されたオフセットに文字列を書き込むヘルパー関数です。
    - 引数: `view: DataView`, `offset: number`, `str: string`
    - 戻り値: void
- **createWavBlobUrl** (src/wav.ts): 生成されたWAV ArrayBufferから、ブラウザで再生可能なBlob URLを作成します。
    - 引数: `wavBuffer: ArrayBuffer`
    - 戻り値: `string` (Blob URL)

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
Generated at: 2026-02-10 07:11:12 JST
