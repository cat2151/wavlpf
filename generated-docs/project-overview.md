Last updated: 2026-01-18

# Project Overview

## プロジェクト概要
- RustとWebAssemblyで実装された、ローパスフィルター付きのシンプルなソフトウェアシンセサイザーです。
- 高速なDSP処理、多様な波形生成、リアルタイムフィルター制御、波形視覚化機能をWeb上で提供します。
- WAVエクスポートや設定の永続化にも対応し、インタラクティブな音楽生成体験を実現します。

## 技術スタック
- フロントエンド: 
    - Vite: 高速な開発サーバーと本番ビルドを提供するツール。
    - TypeScript: JavaScriptに静的型付けを追加し、大規模なアプリケーション開発を支援する言語。
    - HTML: アプリケーションのユーザーインターフェース構造を定義するマークアップ言語。
- 音楽・オーディオ: 
    - Rust: WASMと連携し、高性能でメモリ安全なデジタル信号処理（DSP）ロジックを実装するために使用されます。
    - WebAssembly (WASM): Rustで書かれた信号処理コードをWebブラウザ上でネイティブに近い速度で実行するためのバイナリフォーマット。
    - Tone.js: Web Audio APIを抽象化し、高品質なオーディオ再生と合成を容易にするJavaScriptライブラリ。
    - cat-oscilloscope: リアルタイムで生成される波形を視覚化するためのオシロスコープライブラリ。
- 開発ツール: 
    - Node.js: JavaScriptのランタイム環境で、開発スクリプトやパッケージ管理に使用されます。
    - npm: Node.jsのパッケージマネージャーで、プロジェクトの依存関係のインストールと管理に使用されます。
    - wasm-pack: RustプロジェクトをWebAssemblyにビルドするためのツール。
    - Playwright: ブラウザの自動化とエンドツーエンドテストに使用されるツール（スクリプトでの利用）。
- テスト: 
    - Vitest: 高速なユニットテストおよび統合テストフレームワーク。
    - Happy DOM: Vitest環境内でDOM APIをシミュレートし、ブラウザ環境に依存しないテストを可能にするライブラリ。
- ビルドツール: 
    - Vite: TypeScriptのトランスパイル、WASMモジュールの統合、最終的な本番用バンドルの作成を行います。
    - wasm-pack: RustコードをWebAssemblyモジュールにコンパイルし、JavaScriptから利用可能なバインディングを生成します。
- 言語機能: 
    - Rust: システムプログラミング言語で、パフォーマンスと安全性に優れ、DSPのような計算集約的なタスクに適しています。
    - TypeScript: JavaScriptのスーパーセットであり、静的型付けによってコードの品質と保守性を向上させます。
- 自動化・CI/CD: 
    - GitHub Actions: `main`ブランチへのプッシュ時にアプリケーションを自動的にビルドし、GitHub PagesにデプロイするためのCI/CDプラットフォーム。
    - Shell Script: `install-wasm-pack.sh`など、開発環境のセットアップや特定のタスクを自動化するためのスクリプト。
- 開発標準: 
    - (TypeScriptの利用やテストフレームワークの導入により、コード品質と保守性が向上しています。)

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
  📜 setup-cat-oscilloscope-wasm.js
  📜 test-console-logs.js
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
- **.gitignore**: Gitでバージョン管理しないファイルやディレクトリを指定します。
- **DEVELOPMENT.md**: 開発フレームワークとテスト戦略に関する詳細なガイドです。
- **ISSUE_39_SUMMARY.md**: 特定のイシュー（No.39）に関する要約ドキュメントです。
- **LICENSE**: プロジェクトのライセンス情報（MITライセンス）が記載されています。
- **MODULE_DEPENDENCIES.md**: モジュール間の依存関係に関するドキュメントです。
- **NETWORK_RESTRICTIONS_INVESTIGATION.md**: ネットワーク制限に関する調査結果をまとめたドキュメントです。
- **PERFORMANCE_DISPLAY_DEMO.md**: パフォーマンス表示のデモに関するドキュメントです。
- **PERFORMANCE_TIMING_ANALYSIS.md**: パフォーマンスのタイミング分析に関するドキュメントです。
- **README.ja.md**: プロジェクトの日本語版概要説明です。
- **README.md**: プロジェクトの概要説明です。
- **REFACTORING_SUMMARY.md**: リファクタリングの要約に関するドキュメントです。
- **SUMMARY.md**: プロジェクト全体の要約ドキュメントです。
- **_config.yml**: GitHub PagesのJekyll設定ファイルです。
- **copilot-instructions.md**: Copilotの使用指示に関するドキュメントです。
- **docs/**: プロジェクトに関する追加のドキュメントを格納するディレクトリです。
    - **CAT_OSCILLOSCOPE_WASM_SETUP.md**: `cat-oscilloscope`のWASMセットアップに関する詳細な技術ドキュメントです。
    - **COPILOT_GITHUB_PAGES_ACCESS.md**: CopilotのGitHub Pagesアクセスに関するドキュメントです。
    - **DEPLOYMENT_VERIFICATION.md**: デプロイの検証に関するドキュメントです。
    - **GITHUB_PAGES_ACCESS_PROPOSAL.md**: GitHub Pagesアクセスに関する提案ドキュメントです。
    - **ISSUE_76_RESOLUTION.md**: イシュー76の解決に関するドキュメントです。
    - **ISSUE_78_RESOLUTION.md**: イシュー78の解決に関するドキュメントです。
    - **OSCILLOSCOPE_LAYOUT.md**: オシロスコープのレイアウトに関するドキュメントです。
    - **OSCILLOSCOPE_USAGE.md**: オシロスコープの使用方法に関するガイドです。
- **generated-docs/**: 自動生成されたドキュメントを格納するディレクトリです。
- **index.html**: アプリケーションのエントリーポイントとなるHTMLファイルで、ユーザーインターフェースを構成します。
- **issue-notes/**: 各イシューに関するノートや詳細を格納するディレクトリです。多数のファイルが存在します。
- **package-lock.json**: npmがインストールした依存関係の正確なバージョンを記録し、ビルドの再現性を保証します。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、依存関係、スクリプトなど）を定義します。
- **scripts/**: ビルド、テスト、デプロイなどの様々な自動化スクリプトを格納するディレクトリです。
    - **README.md**: スクリプトディレクトリの説明です。
    - **install-wasm-pack.sh**: `wasm-pack`を自動インストールするためのシェルスクリプトです。
    - **investigate-404.js**: 404エラーを調査するためのPlaywrightスクリプトです。
    - **investigate-cat-oscilloscope.js**: `cat-oscilloscope`のGitHubリポジトリを調査するためのスクリプトです。
    - **setup-cat-oscilloscope-wasm.js**: `cat-oscilloscope`のWASMセットアップを実行するためのスクリプトです。
    - **test-console-logs.js**: コンソールログをテストするためのPlaywrightスクリプトです。
    - **test-waveform-screenshot.js**: 波形可視化のスクリーンショットをテストするためのPlaywrightスクリプトです。
    - **verify-deployment.js**: デプロイが正しく行われたかを検証するためのPlaywrightスクリプトです。
- **src/**: アプリケーションの主要なTypeScriptソースコードを格納するディレクトリです。
    - **audio-player.ts**: Tone.jsを使用してオーディオコンテキストの管理、WAV再生などのオーディオ処理を担当します。
    - **index.ts**: アプリケーションのメインエントリーポイントで、シンセサイザーの初期化を行います。
    - **oscilloscope.test.ts**: オシロスコープ機能の単体テストを定義します。
    - **oscilloscope.ts**: `cat-oscilloscope`ライブラリを統合し、波形データの視覚化を管理します。
    - **performance-stats.test.ts**: パフォーマンス統計機能の単体テストを定義します。
    - **performance-stats.ts**: オーディオ生成などのパフォーマンスデータを測定、計算、リセットする機能を提供します。
    - **playback-mode.ts**: アプリケーションの再生モード（リアルタイム/非リアルタイム）の管理とUI更新を担当します。
    - **settings.test.ts**: アプリケーション設定の永続化機能の単体テストを定義します。
    - **settings.ts**: アプリケーションの設定（波形タイプ、Q値、カットオフなど）の読み込み、保存、エクスポート、インポートを管理します。
    - **synth.ts**: メインシンセサイザーロジックを実装し、UI入力の処理、オーディオレンダリング、再生、状態管理を行います。
    - **timing.test.ts**: タイミング計算機能の単体テストを定義します。
    - **timing.ts**: オーディオ生成のデュレーション（期間）を計算するユーティリティ機能を提供します。
    - **ui-params.test.ts**: UIパラメータ読み込み機能の単体テストを定義します。
    - **ui-params.ts**: UI要素からパラメータを読み取り、マウス位置をフィルターパラメータにマッピングする機能を提供します。
    - **wasmAudio.ts**: Rust WASMモジュールをロードし、オーディオ処理関数を呼び出すためのTypeScriptラッパーを提供します。
    - **wav.test.ts**: WAVファイル生成機能の単体テストを定義します。
    - **wav.ts**: 生成されたオーディオデータをWAVファイルフォーマットに変換し、URLを生成する機能を提供します。
- **tsconfig.json**: TypeScriptコンパイラの設定ファイルです。
- **vite.config.ts**: Viteビルドツールの設定ファイルです。
- **wasm-audio/**: Rustで実装されたオーディオ処理WASMモジュールを格納するディレクトリです。
    - **Cargo.toml**: Rustプロジェクトの依存関係とメタデータを定義するファイルです。
    - **README.md**: `wasm-audio`クレートのReadmeファイルです。
    - **src/**: Rustソースコードを格納するディレクトリです。
        - **audio_renderer.rs**: オーディオ信号をレンダリングするロジックが含まれます。
        - **filter.rs**: Biquadフィルターのロジック（LPF, HPFなど）が実装されています。
        - **lib.rs**: `wasm-audio`クレートのメインライブラリファイルで、WASMバインディングと主要なDSP処理パイプラインを定義します。
        - **oscillator.rs**: ノコギリ波やパルス波などのオシレーター（波形発生器）のロジックが実装されています。
- **waveform-test.png**: 波形テスト用の画像ファイルです。

## 関数詳細説明
- **investigate404** (scripts/investigate-404.js):
    - 役割: 指定されたURLに対して404エラーが発生しないか、Playwrightを使って確認します。
    - 引数: なし (ただし内部でURLを扱うと推測されます)
    - 戻り値: 不明 (成功/失敗のブール値、またはレポート)
- **checkGitHubRepo** (scripts/investigate-cat-oscilloscope.js):
    - 役割: GitHubリポジトリの存在や内容をチェックします。
    - 引数: 不明 (リポジトリURLや名前と推測されます)
    - 戻り値: 不明 (リポジトリの状態に関する情報)
- **investigate** (scripts/investigate-cat-oscilloscope.js):
    - 役割: `cat-oscilloscope`に関する調査を実行します。
    - 引数: なし
    - 戻り値: 不明
- **testConsoleLogs** (scripts/test-console-logs.js):
    - 役割: アプリケーション実行中のコンソールログ出力をPlaywrightでテストし、予期せぬログがないか確認します。
    - 引数: なし
    - 戻り値: 不明 (テスト結果)
- **testWaveformVisualization** (scripts/test-waveform-screenshot.js):
    - 役割: 波形可視化が正しく動作しているか、スクリーンショットを撮って視覚的にテストします。
    - 引数: なし
    - 戻り値: 不明 (テスト結果)
- **verifyDeployment** (scripts/verify-deployment.js):
    - 役割: デプロイされたアプリケーションがGitHub Pages上で正しく動作しているか、Playwrightで検証します。
    - 引数: なし
    - 戻り値: 不明 (デプロイの検証結果)
- **loadTone** (src/audio-player.ts):
    - 役割: Tone.jsライブラリをロードし、オーディオコンテキストを準備します。
    - 引数: なし
    - 戻り値: `Promise<void>` (ロードが完了したことを示すPromise)
- **isToneLoaded** (src/audio-player.ts):
    - 役割: Tone.jsがロードされているかどうかをチェックします。
    - 引数: なし
    - 戻り値: `boolean` (ロード済みならtrue、そうでなければfalse)
- **startAudioContext** (src/audio-player.ts):
    - 役割: Web Audio APIのオーディオコンテキストを開始または再開します。
    - 引数: なし
    - 戻り値: `Promise<void>` (コンテキストが開始したことを示すPromise)
- **isAudioContextRunning** (src/audio-player.ts):
    - 役割: オーディオコンテキストが現在実行中かどうかをチェックします。
    - 引数: なし
    - 戻り値: `boolean` (実行中ならtrue、そうでなければfalse)
- **playWavUrl** (src/audio-player.ts):
    - 役割: 指定されたWAVファイルのURLからオーディオを再生します。
    - 引数: `wavUrl: string` (再生するWAVファイルのURL)
    - 戻り値: `Promise<void>` (再生が完了したことを示すPromise)
- **stopAndCleanup** (src/audio-player.ts):
    - 役割: 現在再生中のオーディオを停止し、関連するリソースをクリーンアップします。
    - 引数: なし
    - 戻り値: `void`
- **canvasSupported** (src/oscilloscope.test.ts):
    - 役割: 現在の実行環境がHTML Canvas APIをサポートしているかをチェックします。
    - 引数: なし
    - 戻り値: `boolean` (サポートしていればtrue)
- **initOscilloscope** (src/oscilloscope.ts):
    - 役割: `cat-oscilloscope`を初期化し、波形表示を準備します。
    - 引数: `canvas: HTMLCanvasElement` (オシロスコープを描画するキャンバス要素)
    - 戻り値: `void`
- **startDebugOverlayUpdates** (src/oscilloscope.ts):
    - 役割: デバッグオーバーレイ（例: FPS表示）の更新を開始します。
    - 引数: なし
    - 戻り値: `void`
- **stopDebugOverlayUpdates** (src/oscilloscope.ts):
    - 役割: デバッグオーバーレイの更新を停止します。
    - 引数: なし
    - 戻り値: `void`
- **frequencyToNote** (src/oscilloscope.ts):
    - 役割: 周波数値を音楽的な音符表記に変換します。
    - 引数: `frequency: number` (周波数値)
    - 戻り値: `string` (音符表記の文字列)
- **validateInputs** (src/oscilloscope.ts):
    - 役割: オシロスコープへの入力データが有効であるかを検証します。
    - 引数: `audioBuffer: Float32Array` (オーディオデータバッファ)
    - 戻り値: `boolean` (有効ならtrue、そうでなければfalse)
- **updateOscilloscope** (src/oscilloscope.ts):
    - 役割: 指定されたオーディオバッファでオシロスコープの表示を更新します。
    - 引数: `audioBuffer: Float32Array`, `sampleRate: number` (オーディオデータとサンプルレート)
    - 戻り値: `void`
- **stopOscilloscope** (src/oscilloscope.ts):
    - 役割: オシロスコープの表示を停止します。
    - 引数: なし
    - 戻り値: `void`
- **isOscilloscopeInitialized** (src/oscilloscope.ts):
    - 役割: オシロスコープが初期化されているかどうかをチェックします。
    - 引数: なし
    - 戻り値: `boolean` (初期化済みならtrue、そうでなければfalse)
- **createPerformanceStats** (src/performance-stats.ts):
    - 役割: パフォーマンス統計を記録するための初期状態を作成します。
    - 引数: なし
    - 戻り値: `object` (パフォーマンス統計オブジェクト)
- **addPerformanceSample** (src/performance-stats.ts):
    - 役割: 新しいパフォーマンス測定値を統計に追加します。
    - 引数: `stats: object`, `sample: number` (統計オブジェクトと測定値)
    - 戻り値: `void`
- **calculatePerformanceStats** (src/performance-stats.ts):
    - 役割: 記録されたパフォーマンス測定値から平均、最小、最大などの統計を計算します。
    - 引数: `stats: object` (パフォーマンス統計オブジェクト)
    - 戻り値: `object` (計算された統計データ)
- **resetPerformanceStats** (src/performance-stats.ts):
    - 役割: パフォーマンス統計をリセットし、新しい測定を開始できるようにします。
    - 引数: `stats: object` (パフォーマンス統計オブジェクト)
    - 戻り値: `void`
- **getCurrentMode** (src/playback-mode.ts):
    - 役割: 現在の再生モード（例: リアルタイム、非リアルタイム）を取得します。
    - 引数: なし
    - 戻り値: `string` (現在のモードを示す文字列)
- **updateModeUI** (src/playback-mode.ts):
    - 役割: UI上の再生モード表示を更新します。
    - 引数: なし
    - 戻り値: `void`
- **switchMode** (src/playback-mode.ts):
    - 役割: 再生モードを切り替えます。
    - 引数: `newMode: string` (新しいモード)
    - 戻り値: `void`
- **validateSettings** (src/settings.ts):
    - 役割: 読み込まれた設定が有効であるかを検証します。
    - 引数: `settings: object` (設定オブジェクト)
    - 戻り値: `boolean` (有効ならtrue、そうでなければfalse)
- **loadSettings** (src/settings.ts):
    - 役割: localStorageからアプリケーション設定を読み込みます。
    - 引数: なし
    - 戻り値: `object` (読み込まれた設定オブジェクト)
- **saveSettings** (src/settings.ts):
    - 役割: 現在のアプリケーション設定をlocalStorageに保存します。
    - 引数: `settings: object` (保存する設定オブジェクト)
    - 戻り値: `void`
- **exportSettingsToFile** (src/settings.ts):
    - 役割: 現在の設定をJSONファイルとしてエクスポートします。
    - 引数: なし
    - 戻り値: `void`
- **importSettingsFromFile** (src/settings.ts):
    - 役割: JSONファイルから設定をインポートします。
    - 引数: `file: File` (インポートするJSONファイル)
    - 戻り値: `Promise<object>` (インポートされた設定オブジェクトを含むPromise)
- **getCurrentSettings** (src/synth.ts):
    - 役割: 現在のシンセサイザー設定を取得します。
    - 引数: なし
    - 戻り値: `object` (現在の設定オブジェクト)
- **displayOscilloscopeError** (src/synth.ts):
    - 役割: オシロスコープに関するエラーメッセージをUIに表示します。
    - 引数: `error: Error` (エラーオブジェクト)
    - 戻り値: `void`
- **readParameters** (src/synth.ts):
    - 役割: UIからシンセサイザーのパラメータを読み取ります。
    - 引数: なし
    - 戻り値: `object` (読み取られたパラメータオブジェクト)
- **renderAudio** (src/synth.ts):
    - 役割: 指定された設定に基づいてオーディオ信号をレンダリングします。
    - 引数: `settings: object` (レンダリング設定)
    - 戻り値: `Promise<Float32Array>` (生成されたオーディオデータを含むPromise)
- **playAudioWav** (src/synth.ts):
    - 役割: WAV形式のオーディオデータを再生します。
    - 引数: `audioBuffer: Float32Array` (再生するオーディオデータ)
    - 戻り値: `Promise<void>`
- **playAudioSeq** (src/synth.ts):
    - 役割: シーケンスに基づいたオーディオ再生を実行します。
    - 引数: `audioBuffer: Float32Array` (再生するオーディオデータ)
    - 戻り値: `void`
- **playAudio** (src/synth.ts):
    - 役割: 現在の設定とモードに基づいてオーディオを再生します。
    - 引数: なし
    - 戻り値: `void`
- **handleModeSwitch** (src/synth.ts):
    - 役割: 再生モードが切り替わった際の処理を行います。
    - 引数: なし
    - 戻り値: `void`
- **init** (src/synth.ts):
    - 役割: シンセサイザーアプリケーション全体の初期化を行います。イベントリスナーの設定や初期UI状態の構築が含まれます。
    - 引数: なし
    - 戻り値: `void`
- **scheduleNextPlay** (src/synth.ts):
    - 役割: 次のオーディオ再生をスケジュールします（特にループ再生用）。
    - 引数: `delayMs: number` (次の再生までの遅延ミリ秒)
    - 戻り値: `void`
- **updateStatusDisplay** (src/synth.ts):
    - 役割: アプリケーションのステータス情報（例: エラーメッセージ、再生状態）をUIに表示します。
    - 引数: `message: string`, `isError: boolean` (表示するメッセージとエラーフラグ)
    - 戻り値: `void`
- **updateGenerationTimeDisplay** (src/synth.ts):
    - 役割: オーディオ生成にかかった時間をUIに表示します。
    - 引数: `timeMs: number` (生成時間ミリ秒)
    - 戻り値: `void`
- **dispose** (src/synth.ts):
    - 役割: シンセサイザーのリソースを解放し、クリーンアップします。
    - 引数: なし
    - 戻り値: `void`
- **handleInputChange** (src/synth.ts):
    - 役割: UI入力要素の値が変更された際のイベントを処理します。
    - 引数: `event: Event` (変更イベント)
    - 戻り値: `void`
- **handleClick** (src/synth.ts):
    - 役割: UI上のクリックイベントを処理します。オーディオコンテキストの開始などに使用されます。
    - 引数: `event: MouseEvent` (マウスクリックイベント)
    - 戻り値: `void`
- **calculateDuration** (src/timing.ts):
    - 役割: BPMとビートに基づいてオーディオの持続時間（デュレーション）を計算します。
    - 引数: `bpm: number`, `beats: number` (テンポと拍数)
    - 戻り値: `number` (持続時間ミリ秒)
- **readNumericParameter** (src/ui-params.ts):
    - 役割: 指定されたIDのUI入力要素から数値パラメータを読み取ります。
    - 引数: `elementId: string`, `defaultValue: number`, `min: number`, `max: number` (要素ID、デフォルト値、最小値、最大値)
    - 戻り値: `number` (読み取られた数値)
- **readParametersFromUI** (src/ui-params.ts):
    - 役割: UIの各要素からすべてのシンセサイザーパラメータを読み取ります。
    - 引数: なし
    - 戻り値: `object` (読み取られたパラメータをまとめたオブジェクト)
- **updateUIFields** (src/ui-params.ts):
    - 役割: 指定された設定値に基づいてUI上の入力フィールドを更新します。
    - 引数: `settings: object` (更新する設定オブジェクト)
    - 戻り値: `void`
- **mapMouseToFilterParams** (src/ui-params.ts):
    - 役割: マウスのX/Y座標をフィルターのカットオフ周波数とQ値にマッピングします。
    - 引数: `x: number`, `y: number`, `width: number`, `height: number`, `settings: object` (マウス座標、UIサイズ、シンセサイザー設定)
    - 戻り値: `object` (計算されたカットオフ周波数とQ値)
- **updateMousePositionDisplay** (src/ui-params.ts):
    - 役割: マウスの現在位置に対応するフィルターパラメータ（カットオフ、Q値）をUIに表示します。
    - 引数: `cutoff: number`, `q: number` (カットオフ周波数とQ値)
    - 戻り値: `void`
- **initWasm** (src/wasmAudio.ts):
    - 役割: RustでビルドされたWASMオーディオモジュールを初期化し、ロードします。
    - 引数: `url: string` (WASMモジュールのURL)
    - 戻り値: `Promise<void>` (初期化が完了したことを示すPromise)
- **isWasmInitialized** (src/wasmAudio.ts):
    - 役割: WASMオーディオモジュールが初期化されているかどうかをチェックします。
    - 引数: なし
    - 戻り値: `boolean` (初期化済みならtrue、そうでなければfalse)
- **renderAudioWasm** (src/wasmAudio.ts):
    - 役割: WASMモジュールを使用してオーディオ信号をレンダリングします。
    - 引数: `settings: object`, `durationMs: number`, `sampleRate: number` (シンセサイザー設定、持続時間、サンプルレート)
    - 戻り値: `Float32Array` (生成されたオーディオデータ)
- **generateWav** (src/wav.ts):
    - 役割: 生のオーディオデータ（Float32Array）からWAVフォーマットのBlobを生成します。
    - 引数: `audioBuffer: Float32Array`, `sampleRate: number` (オーディオデータ、サンプルレート)
    - 戻り値: `Blob` (WAVデータを含むBlobオブジェクト)
- **writeString** (src/wav.ts):
    - 役割: DataViewに文字列を書き込むユーティリティ関数です。WAVヘッダーの構築に利用されます。
    - 引数: `view: DataView`, `offset: number`, `string: string` (データビュー、オフセット、書き込む文字列)
    - 戻り値: `void`
- **createWavBlobUrl** (src/wav.ts):
    - 役割: 生成されたWAV Blobから一時的なURLを作成します。
    - 引数: `wavBlob: Blob` (WAVデータを含むBlobオブジェクト)
    - 戻り値: `string` (WAV BlobのURL)

## 関数呼び出し階層ツリー
```
- if (scripts/investigate-404.js)
  - investigate404 (scripts/investigate-404.js)
    - catch ()
      - forEach ()
      - checkGitHubRepo (scripts/investigate-cat-oscilloscope.js)
      - investigate ()
      - testConsoleLogs (scripts/test-console-logs.js)
      - testWaveformVisualization (scripts/test-waveform-screenshot.js)
      - verifyDeployment (scripts/verify-deployment.js)
      - loadTone (src/audio-player.ts)
      - isToneLoaded ()
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
      - createPerformanceStats (src/performance-stats.ts)
      - addPerformanceSample ()
      - calculatePerformanceStats ()
      - getCurrentMode (src/playback-mode.ts)
      - switchMode ()
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
  - readNumericParameter (src/ui-params.ts)
  - writeString ()
- for (scripts/setup-cat-oscilloscope-wasm.js)
- handleInputChange (src/synth.ts)
- handleClick (src/synth.ts)

---
Generated at: 2026-01-18 07:04:00 JST
