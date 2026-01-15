Last updated: 2026-01-16

# Project Overview

## プロジェクト概要
- RustとWebAssemblyで実装された、高性能なローパスフィルター（LPF）を搭載したシンプルソフトウェアシンセサイザーです。
- 波形生成、Biquad LPFによる音響処理、WAV形式での出力までを一貫して提供します。
- Webブラウザ上でリアルタイムでのフィルター操作、パフォーマンス監視、設定の永続化が可能です。

## 技術スタック
- フロントエンド:
    - **WebAssembly (WASM)**: Rustで実装された信号処理ロジックを高速にブラウザで実行するためのバイナリフォーマット。
    - **Vite**: 高速な開発サーバーと本番ビルドを提供するフロントエンドビルドツール。
    - **TypeScript**: 型安全なJavaScript開発を可能にし、大規模アプリケーション開発の堅牢性を向上させます。
    - **HTML**: アプリケーションのユーザーインターフェースを構築するためのマークアップ言語。
- 音楽・オーディオ:
    - **Rust WASM信号プロセッサ**: オシレーター生成、Biquad LPFフィルター、オーディオレンダリングなど、高性能なデジタル信号処理（DSP）をRustで実装しています。
    - **Biquad LPFフィルター**: RBJ Audio EQ Cookbookの公式に基づいたローパスフィルターで、インタラクティブな音響調整を可能にします。
    - **Tone.js**: ウェブ上でクリーンなオーディオ再生を管理するための高機能なJavaScriptライブラリ。
    - **WAV生成**: 処理されたオーディオデータを標準的なWAVファイルフォーマットに変換する機能を提供します。
    - **cat-oscilloscope**: 波形可視化のために統合されたオシロスコープライブラリ。
- 開発ツール:
    - **Node.js (v14以上)**: JavaScriptの実行環境であり、npmパッケージ管理の基盤となります。
    - **npm**: JavaScriptプロジェクトの依存関係管理とスクリプト実行に使用されるパッケージマネージャー。
    - **Rustup**: Rustプログラミング言語のバージョン管理とコンポーネントインストールを容易にするツール。
    - **wasm-pack**: RustコードをWebAssemblyにコンパイルし、Webアプリケーションで利用可能な形にパッケージ化するツール。
- テスト:
    - **Vitest**: 高速な単体テストフレームワークで、テストスイートの実行、UIテストランナー、カバレッジレポート生成に利用されます。
    - **happy-dom**: Vitestなどのテスト環境で、ブラウザDOMをエミュレートし、UIコンポーネントのテストを可能にします。
- ビルドツール:
    - **Vite**: フロントエンドアプリケーション全体のビルドを担当し、TypeScriptの型チェックと本番バンドル作成を行います。
    - **wasm-pack**: Rust WASMモジュール専用のビルドプロセスを実行します。
    - **wasm-opt (binaryen)**: WASMモジュールを最適化し、ファイルサイズと実行速度を向上させます。
- 言語機能:
    - **Rust**: 信号処理のコアロジックを実装し、パフォーマンスと安全性を重視しています。
    - **TypeScript**: アプリケーションのフロントエンドロジックを記述し、コードの保守性とスケーラビリティを高めます。
- 自動化・CI/CD:
    - **GitHub Pages**: `main`ブランチへの変更がプッシュされると自動的にアプリケーションをデプロイする静的サイトホスティングサービス。
    - **GitHub Actions**: リポジトリ内のワークフロー定義（`.github/workflows/deploy.yml`）に基づき、ビルド、テスト、デプロイなどのプロセスを自動化します。
- 開発標準:
    - **wasm-optの強制**: WASMの最適化ツール`wasm-opt`の利用が厳格に推奨されており、無効化が禁止されています。これはパフォーマンスと安定性を保証するための重要な開発標準です。

## ファイル階層ツリー
```
📄 .gitignore
📖 ARCHITECTURE_DIAGRAMS.md
📖 CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md
📖 CAT_OSCILLOSCOPE_INSTALLATION.md
📖 CAT_OSCILLOSCOPE_INTEGRATION.md
📖 CAT_OSCILLOSCOPE_INTEGRATION_REPORT.md
📖 CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md
📖 DEVELOPMENT.md
📖 IMPLEMENTATION_EXAMPLES.md
📖 INTEGRATION_BLOCKERS_SUMMARY.md
📖 ISSUE_39_SUMMARY.md
📖 ISSUE_58_COMPLETION_REPORT.md
📄 LICENSE
📖 MODULE_DEPENDENCIES.md
📖 PERFORMANCE_DISPLAY_DEMO.md
📖 PERFORMANCE_TIMING_ANALYSIS.md
📖 README.ja.md
📖 README.md
📖 README_ANALYSIS.md
📖 REFACTORING_SUMMARY.md
📖 SUMMARY.md
📄 _config.yml
📁 generated-docs/
🌐 index.html
📁 issue-notes/
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
📊 package-lock.json
📊 package.json
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
```

## ファイル詳細説明
- **`.gitignore`**: Gitがバージョン管理システムで追跡すべきではないファイルやディレクトリ（例: ビルド成果物、一時ファイル）を指定します。
- **`ARCHITECTURE_DIAGRAMS.md`**: プロジェクトのアーキテクチャに関する図や説明をまとめたドキュメントです。
- **`CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md`**: `cat-oscilloscope`ライブラリの統合の実現可能性に関する分析ドキュメントです。
- **`CAT_OSCILLOSCOPE_INSTALLATION.md`**: `cat-oscilloscope`ライブラリのインストール手順に関するドキュメントです。
- **`CAT_OSCILLOSCOPE_INTEGRATION.md`**: `cat-oscilloscope`ライブラリの統合方法に関するドキュメントです。
- **`CAT_OSCILLOSCOPE_INTEGRATION_REPORT.md`**: `cat-oscilloscope`ライブラリの統合に関するレポートです。
- **`CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md`**: `cat-oscilloscope`ライブラリを統合する際のベストプラクティスを詳細に分析した推奨ドキュメントです。
- **`DEVELOPMENT.md`**: プロジェクトの開発フレームワーク、テスト戦略、および一般的な開発ガイドラインについて説明するドキュメントです。
- **`IMPLEMENTATION_EXAMPLES.md`**: プロジェクトの特定の機能の実装例を示したドキュメントです。
- **`INTEGRATION_BLOCKERS_SUMMARY.md`**: 統合を妨げる要因の概要をまとめたドキュメントです。
- **`ISSUE_39_SUMMARY.md`**: 課題 #39 に関するサマリーです。
- **`ISSUE_58_COMPLETION_REPORT.md`**: 課題 #58 の完了報告書です。
- **`LICENSE`**: プロジェクトのライセンス情報（MITライセンス）を記載したファイルです。
- **`MODULE_DEPENDENCIES.md`**: モジュール間の依存関係について説明するドキュメントです。
- **`PERFORMANCE_DISPLAY_DEMO.md`**: パフォーマンス表示のデモに関するドキュメントです。
- **`PERFORMANCE_TIMING_ANALYSIS.md`**: パフォーマンスのタイミング分析に関するドキュメントです。
- **`README.ja.md`**: プロジェクトの日本語版概要ドキュメントです。
- **`README.md`**: プロジェクトの主要な概要とガイドラインを説明するトップレベルのドキュメントです。
- **`README_ANALYSIS.md`**: READMEファイルの分析に関するドキュメントです。
- **`REFACTORING_SUMMARY.md`**: リファクタリングの概要をまとめたドキュメントです。
- **`SUMMARY.md`**: プロジェクトの全体的な概要をまとめたドキュメントです。
- **`_config.yml`**: Jekyllなどの静的サイトジェネレーターの設定ファイルで、主にGitHub Pagesの動作を制御します。
- **`generated-docs/`**: 自動生成されたドキュメントやレポートが格納されるディレクトリです。
- **`index.html`**: アプリケーションのメインとなるウェブページ。HTML構造、UI要素、およびJavaScriptのエントリーポイントを含みます。
- **`issue-notes/`**: 開発中の様々な課題（issue）に関する詳細なメモや調査結果が個別のMarkdownファイルとして格納されているディレクトリです。
- **`package-lock.json`**: `npm`が管理する依存関係の正確なツリー構造とバージョンを記録し、ビルドの再現性を保証します。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、説明など）、スクリプト、および開発時・実行時の依存関係を定義します。
- **`src/audio-player.ts`**: Tone.jsライブラリをラップし、オーディオコンテキストの管理、WAV URLの再生、オーディオ再生の停止とクリーンアップを行います。
- **`src/index.ts`**: アプリケーションのメインエントリーポイント。`synth.ts`モジュールをインポートし、アプリケーションを初期化します。
- **`src/oscilloscope.test.ts`**: オシロスコープ機能の単体テストコード。波形表示の正確性や挙動を検証します。
- **`src/oscilloscope.ts`**: `cat-oscilloscope`ライブラリを統合し、ウェブUIでオーディオ波形をリアルタイムで視覚化する機能を提供します。
- **`src/performance-stats.test.ts`**: パフォーマンス統計収集機能の単体テストコード。統計計算の正確性を検証します。
- **`src/performance-stats.ts`**: オーディオ生成にかかる時間などのパフォーマンスデータを収集し、平均、最大、最小といった統計情報を計算・管理します。
- **`src/playback-mode.ts`**: オーディオの再生モード（例: WAV再生、シーケンス再生）を管理し、それに関連するUIの更新を行います。
- **`src/settings.test.ts`**: アプリケーション設定の永続化と管理機能の単体テストコード。設定の読み書き、インポート/エクスポートの正確性を検証します。
- **`src/settings.ts`**: アプリケーションの設定（フィルターパラメータ、波形タイプなど）を`localStorage`に保存・読み込み、JSONファイルとしてインポート・エクスポートする機能を提供します。
- **`src/synth.ts`**: シンセサイザーアプリケーションの主要なロジックを実装。UIからの入力処理、オーディオレンダリングのトリガー、再生のスケジューリング、オシロスコープとパフォーマンス表示の連携などを担当します。
- **`src/timing.test.ts`**: オーディオの期間計算機能の単体テストコード。BPMとビートに基づく時間計算の正確性を検証します。
- **`src/timing.ts`**: 指定されたBPMとビート数に基づいてオーディオの総再生期間を計算するユーティリティ関数を提供します。
- **`src/ui-params.test.ts`**: UIパラメータの読み取り機能の単体テストコード。UI要素からの値の取得とマッピングの正確性を検証します。
- **`src/ui-params.ts`**: UI要素（入力フィールド、マウス位置）からシンセサイザーのパラメータを読み取り、それらをフィルタリングパラメータ（カットオフ周波数、Q値）にマッピングするロジックを含みます。
- **`src/wasmAudio.ts`**: RustでコンパイルされたWebAssembly (WASM) モジュールを動的にロードし、TypeScriptアプリケーションからWASMのオーディオレンダリング機能にアクセスするためのインターフェースを提供します。
- **`src/wav.test.ts`**: WAVファイル生成機能の単体テストコード。生のオーディオデータからWAVファイルを正確に生成できるかを検証します。
- **`src/wav.ts`**: 生のオーディオデータ（Float32Array）を受け取り、標準的なRIFF/WAVファイルフォーマットのBlobに変換し、再生可能なURLを生成する機能を提供します。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイル。コンパイルオプション、対象ファイル、出力ディレクトリなどを定義します。
- **`vite.config.ts`**: Viteビルドツールの設定ファイル。プロジェクトのビルドプロセス、プラグイン、開発サーバーの動作などを構成します。
- **`wasm-audio/Cargo.toml`**: RustのパッケージマネージャーであるCargoの設定ファイル。Rust WASMモジュールの依存関係、メタデータ、およびビルド設定を定義します。
- **`wasm-audio/README.md`**: Rust WASMモジュールに関する概要と説明を記載したドキュメントです。
- **`wasm-audio/src/audio_renderer.rs`**: Rust WASMモジュール内で、設定とパラメータに基づいてオーディオ信号をレンダリングする主要なロジックを実装しています。
- **`wasm-audio/src/filter.rs`**: Rust WASMモジュール内で、Biquadローパスフィルターのアルゴリズムと関連ロジックを実装しています。
- **`wasm-audio/src/lib.rs`**: Rust WASMクレートのエントリーポイント。オシレーター生成、フィルター処理、オーディオレンダリングの各モジューを統合し、JavaScriptから呼び出される公開関数を提供します。
- **`wasm-audio/src/oscillator.rs`**: Rust WASMモジュール内で、ノコギリ波やパルス波などの基本的な波形を生成するオシレーターロジックを実装しています。

## 関数詳細説明
- **`loadTone()`** (src/audio-player.ts): Tone.jsオーディオライブラリを非同期でロードし、必要な初期設定を行います。
- **`isToneLoaded()`** (src/audio-player.ts): Tone.jsライブラリがアプリケーションによってロード済みであるかを確認します。
  - 戻り値: ロード済みであれば`true`、そうでなければ`false` (boolean)。
- **`startAudioContext()`** (src/audio-player.ts): Web Audio APIのオーディオコンテキストを開始または再開します。これはユーザーのインタラクション後に呼び出す必要があります。
- **`isAudioContextRunning()`** (src/audio-player.ts): Web Audio APIのオーディオコンテキストが現在実行中であるかを確認します。
  - 戻り値: 実行中であれば`true`、そうでなければ`false` (boolean)。
- **`playWavUrl(url: string)`** (src/audio-player.ts): 指定されたWAVファイルのURLをTone.jsライブラリを使用して再生します。
  - 引数: `url` (string) - 再生するWAVファイルのURL。
- **`stopAndCleanup()`** (src/audio-player.ts): 現在再生中のオーディオを停止し、Tone.js関連のすべてのリソース（例: オーディオノード）を解放してクリーンアップします。
- **`initOscilloscope()`** (src/oscilloscope.ts): 波形表示用のオシロスコープを初期化し、DOM要素との連携を設定します。
- **`cleanupDummyCanvases()`** (src/oscilloscope.ts): テストや開発中に作成された可能性のあるダミーのcanvas要素をDOMから削除してクリーンアップします。
- **`validateInputs()`** (src/oscilloscope.ts): オシロスコープ機能が適切に動作するための入力（DOM要素の存在など）を検証します。
  - 戻り値: 入力が有効であれば`true`、そうでなければ`false` (boolean)。
- **`updateOscilloscope(audioBuffer: Float32Array)`** (src/oscilloscope.ts): 提供されたオーディオバッファのデータを基に、オシロスコープの波形表示をリアルタイムで更新します。
  - 引数: `audioBuffer` (Float32Array) - 表示するオーディオデータを含む配列。
- **`stopOscilloscope()`** (src/oscilloscope.ts): オシロスコープの波形描画処理を停止し、関連するリソースを一時停止します。
- **`isOscilloscopeInitialized()`** (src/oscilloscope.ts): オシロスコープが既に初期化され、使用可能な状態であるかを確認します。
  - 戻り値: 初期化済みであれば`true`、そうでなければ`false` (boolean)。
- **`createPerformanceStats()`** (src/performance-stats.ts): パフォーマンス統計を記録するための新しいオブジェクトを初期化し、返します。
  - 戻り値: 新しいパフォーマンス統計オブジェクト (object)。
- **`addPerformanceSample(stats: object, sample: number)`** (src/performance-stats.ts): 指定されたパフォーマンス統計オブジェクトに、新しい測定値（サンプル）を追加します。
  - 引数: `stats` (object) - パフォーマンス統計を記録するオブジェクト。 `sample` (number) - 追加する新しいパフォーマンス測定値（例: ミリ秒）。
- **`calculatePerformanceStats(stats: object)`** (src/performance-stats.ts): 収集されたサンプルデータに基づいて、パフォーマンスの平均、最小、最大などの統計値を計算し、統計オブジェクトを更新します。
  - 引数: `stats` (object) - 計算対象のパフォーマンス統計オブジェクト。
- **`resetPerformanceStats(stats: object)`** (src/performance-stats.ts): 指定されたパフォーマンス統計オブジェクトの記録をすべてクリアし、初期状態に戻します。
  - 引数: `stats` (object) - リセット対象のパフォーマンス統計オブジェクト。
- **`getCurrentMode()`** (src/playback-mode.ts): 現在選択されているオーディオ再生モード（例: WAV、シーケンス）を取得します。
  - 戻り値: 現在の再生モードを示す文字列 (string)。
- **`updateModeUI(mode: string)`** (src/playback-mode.ts): アプリケーションのUI要素を更新し、現在のアクティブな再生モードを視覚的に反映させます。
  - 引数: `mode` (string) - 新しい再生モードを示す文字列。
- **`switchMode(newMode: string)`** (src/playback-mode.ts): オーディオ再生モードを指定された新しいモードに切り替えます。
  - 引数: `newMode` (string) - 切り替える新しい再生モードを示す文字列。
- **`validateSettings(settings: object)`** (src/settings.ts): 渡された設定オブジェクトが有効な値を含んでいるか、プロジェクトの要件を満たしているかを検証します。
  - 引数: `settings` (object) - 検証する設定オブジェクト。
  - 戻り値: 設定が有効であれば`true`、そうでなければ`false` (boolean)。
- **`loadSettings()`** (src/settings.ts): ブラウザの`localStorage`から以前に保存されたアプリケーション設定を読み込み、オブジェクトとして返します。
  - 戻り値: ロードされた設定オブジェクト、またはデフォルト設定 (object)。
- **`saveSettings(settings: object)`** (src/settings.ts): 現在のアプリケーション設定を指定されたオブジェクトからブラウザの`localStorage`に保存します。
  - 引数: `settings` (object) - 保存する設定オブジェクト。
- **`exportSettingsToFile(settings: object)`** (src/settings.ts): 現在のアプリケーション設定をJSONファイルとして生成し、ユーザーがダウンロードできるようにします。
  - 引数: `settings` (object) - エクスポートする設定オブジェクト。
- **`importSettingsFromFile(file: File)`** (src/settings.ts): ユーザーが選択したJSONファイルから設定を読み込み、アプリケーションに適用します。
  - 引数: `file` (File) - インポートする設定データを含むファイルオブジェクト。
  - 戻り値: インポートされた設定オブジェクト (Promise<object>)。
- **`getCurrentSettings()`** (src/synth.ts): UI要素から現在のシンセサイザー設定を読み取り、内部状態と合わせて完全な設定オブジェクトを生成し、返します。
  - 戻り値: 現在のシンセサイザー設定オブジェクト (object)。
- **`displayOscilloscopeError(message: string)`** (src/synth.ts): オシロスコープ関連のエラーメッセージをUIに表示し、ユーザーに状況を伝えます。
  - 引数: `message` (string) - 表示するエラーメッセージ。
- **`readParameters()`** (src/synth.ts): UI上の入力フィールドから現在のシンセサイザーの主要なパラメータ（波形タイプ、デューティー比、フィルター設定など）を読み取ります。
  - 戻り値: 読み取られたパラメータを含むオブジェクト (object)。
- **`renderAudio(settings: object, params: object)`** (src/synth.ts): 提供されたシンセサイザー設定とパラメータに基づいて、オーディオデータを非リアルタイムでレンダリング（生成）します。
  - 引数: `settings` (object) - シンセサイザーの全体設定。 `params` (object) - オーディオ生成に使用する詳細パラメータ。
  - 戻り値: 生成されたオーディオデータを含む`Float32Array` (Promise<Float32Array>)。
- **`playAudioWav(audioBuffer: Float32Array)`** (src/synth.ts): 生成されたオーディオバッファ（Float32Array）をWAVファイルとして処理し、`audio-player.ts`を介して再生します。
  - 引数: `audioBuffer` (Float32Array) - 再生するオーディオデータ。
- **`playAudioSeq(audioBuffer: Float32Array)`** (src/synth.ts): 生成されたオーディオバッファ（Float32Array）をシーケンスとして直接再生します（Web Audio APIに依存しない、より直接的な再生処理を想定）。
  - 引数: `audioBuffer` (Float32Array) - 再生するオーディオデータ。
- **`playAudio()`** (src/synth.ts): 現在のUI設定と選択されている再生モードに基づいてオーディオを生成し、再生を開始するメインの制御関数です。
- **`handleModeSwitch()`** (src/synth.ts): UIで再生モードが切り替えられたときに呼び出されるイベントハンドラー。UIの更新と、新しいモードに基づくオーディオ再生の再スケジュールを行います。
- **`init()`** (src/synth.ts): シンセサイザーアプリケーション全体の初期化処理を実行します。イベントリスナーの設定、WASMモジュールのロード、初期UIの表示などを行います。
- **`scheduleNextPlay()`** (src/synth.ts): 現在のBPMとビート設定に基づいて、次のオーディオ生成および再生イベントを非同期にスケジュールします。
- **`updateStatusDisplay(message: string)`** (src/synth.ts): アプリケーションのUI上のステータス表示領域に指定されたメッセージを表示し、ユーザーに情報を提供します。
  - 引数: `message` (string) - 表示するステータスメッセージ。
- **`updateGenerationTimeDisplay(time: number)`** (src/synth.ts): UI上のオーディオ生成時間表示を更新し、直前のオーディオ生成にかかった時間をユーザーにフィードバックします。
  - 引数: `time` (number) - 生成にかかった時間（ミリ秒など）。
- **`dispose()`** (src/synth.ts): アプリケーションが終了またはアンロードされる際に、すべてのリソース（オーディオコンテキスト、イベントリスナーなど）を解放し、クリーンアップします。
- **`handleInputChange()`** (src/synth.ts): UI上の入力要素（スライダー、テキストボックスなど）が変更されたときにトリガーされるイベントハンドラー。設定の保存とUIの更新を行います。
- **`handleClick()`** (src/synth.ts): UI上のクリックイベントが発生したときにトリガーされるイベントハンドラー。オーディオコンテキストの開始、フィルターパラメータの操作、再生のトリガーなどを行います。
- **`calculateDuration(bpm: number, beats: number)`** (src/timing.ts): 指定されたBPM (Beats Per Minute) とビート数に基づいて、オーディオの総期間（秒単位）を計算します。
  - 引数: `bpm` (number) - 1分間あたりの拍数。 `beats` (number) - 生成するビート数。
  - 戻り値: 計算された期間 (number, 秒)。
- **`readNumericParameter(elementId: string, defaultValue: number)`** (src/ui-params.ts): 指定されたDOM要素IDから数値パラメータを読み取り、無効な場合はデフォルト値を返します。
  - 引数: `elementId` (string) - 読み取るUI要素のID。 `defaultValue` (number) - 無効な場合に返すデフォルト値。
  - 戻り値: 読み取られた数値 (number)。
- **`readParametersFromUI()`** (src/ui-params.ts): アプリケーションのUIの様々な入力要素から、シンセサイザーのすべての設定パラメータを読み取り、単一のオブジェクトとして集約します。
  - 戻り値: UIから読み取られたパラメータオブジェクト (object)。
- **`updateUIFields(settings: object)`** (src/ui-params.ts): 指定された設定オブジェクトの値に基づいて、アプリケーションのUI上の入力フィールドや表示要素を更新します。
  - 引数: `settings` (object) - UIを更新するために使用する設定オブジェクト。
- **`mapMouseToFilterParams(mouseX: number, mouseY: number)`** (src/ui-params.ts): マウスのX座標とY座標を、LPFフィルターのカットオフ周波数とレゾナンス（Q値）にマッピングします。
  - 引数: `mouseX` (number) - マウスの水平位置。 `mouseY` (number) - マウスの垂直位置。
  - 戻り値: マッピングされたフィルターパラメータ（カットオフ周波数、Q値）を含むオブジェクト (object)。
- **`updateMousePositionDisplay(x: number, y: number)`** (src/ui-params.ts): UI上の要素にマウスの現在位置（X, Y座標）を表示し、ユーザーに視覚的なフィードバックを提供します。
  - 引数: `x` (number) - マウスのX座標。 `y` (number) - マウスのY座標。
- **`initWasm()`** (src/wasmAudio.ts): RustでコンパイルされたWebAssemblyモジュールをロードし、JavaScriptから利用できるように初期化します。
  - 戻り値: WASMモジュールのロードと初期化が完了したPromise (Promise<void>)。
- **`isWasmInitialized()`** (src/wasmAudio.ts): WebAssemblyモジュールがアプリケーション内でロードされ、初期化済みであるかを確認します。
  - 戻り値: 初期化済みであれば`true`、そうでなければ`false` (boolean)。
- **`renderAudioWasm(duration: number, sampleRate: number, params: object)`** (src/wasmAudio.ts): WebAssemblyモジュール内のRustロジックを呼び出し、指定された期間とサンプルレートでオーディオデータをレンダリングします。
  - 引数: `duration` (number) - レンダリングするオーディオの期間（秒）。 `sampleRate` (number) - オーディオのサンプルレート。 `params` (object) - WASMモジュールに渡すオーディオ生成パラメータ。
  - 戻り値: 生成されたオーディオデータを含む`Float32Array` (Promise<Float32Array>)。
- **`generateWav(audioBuffer: Float32Array, sampleRate: number)`** (src/wav.ts): 生のオーディオデータ（Float32Array）とサンプルレートから、RIFF/WAVフォーマットのBlobオブジェクトを生成します。
  - 引数: `audioBuffer` (Float32Array) - WAVに変換する生のオーディオデータ。 `sampleRate` (number) - オーディオのサンプルレート。
  - 戻り値: 生成されたWAVフォーマットのBlob (Blob)。
- **`writeString(view: DataView, offset: number, string: string)`** (src/wav.ts): `DataView`オブジェクトの指定されたオフセット位置に文字列をバイトとして書き込みます。WAVヘッダーの構築に利用されます。
  - 引数: `view` (DataView) - 書き込み対象の`DataView`。 `offset` (number) - 書き込み開始オフセット。 `string` (string) - 書き込む文字列。
- **`createWavBlobUrl(wavBlob: Blob)`** (src/wav.ts): 生成されたWAV Blobから、ブラウザで再生可能なオブジェクトURLを作成します。
  - 引数: `wavBlob` (Blob) - WAVフォーマットのBlob。
  - 戻り値: 生成されたオブジェクトURL (string)。

## 関数呼び出し階層ツリー
```
- `src/index.ts` (アプリケーションのエントリーポイント)
  - `synth.init()` (アプリケーションの初期化とイベント設定)
    - `settings.loadSettings()`
      - `settings.validateSettings()`
    - `wasmAudio.initWasm()`
    - `audio-player.loadTone()`
    - `oscilloscope.initOscilloscope()`
    - `performance-stats.createPerformanceStats()`
    - `playback-mode.getCurrentMode()`
    - `ui-params.readParametersFromUI()`
      - `ui-params.readNumericParameter()`
    - `ui-params.updateUIFields()`
    - `synth.scheduleNextPlay()` (初回オーディオ再生のスケジュール)
      - `synth.playAudio()` (オーディオ生成と再生のメインロジック)
        - `synth.getCurrentSettings()`
        - `synth.readParameters()`
        - `timing.calculateDuration()`
        - `synth.renderAudio()`
          - `wasmAudio.renderAudioWasm()` (Rust WASMによるオーディオレンダリング)
        - `performance-stats.addPerformanceSample()`
        - `performance-stats.calculatePerformanceStats()`
        - `synth.updateGenerationTimeDisplay()`
        - `playback-mode.getCurrentMode()`
        - `synth.playAudioWav()` (WAVとして再生)
          - `wav.generateWav()`
            - `wav.writeString()`
          - `wav.createWavBlobUrl()`
          - `audio-player.playWavUrl()`
            - `audio-player.startAudioContext()`
            - `audio-player.isAudioContextRunning()`
        - `synth.playAudioSeq()` (シーケンスとして再生)
        - `oscilloscope.updateOscilloscope()`
        - `synth.displayOscilloscopeError()`
        - `synth.scheduleNextPlay()` (再帰的に次の再生をスケジュール)

- イベントハンドラ
  - `synth.handleInputChange()` (UI入力変更時の処理)
    - `synth.getCurrentSettings()`
    - `settings.saveSettings()`
    - `ui-params.updateUIFields()`
    - `playback-mode.updateModeUI()`
  - `synth.handleClick()` (UIクリック時の処理)
    - `audio-player.startAudioContext()`
    - `ui-params.mapMouseToFilterParams()`
    - `ui-params.updateMousePositionDisplay()`
    - `synth.getCurrentSettings()`
    - `settings.saveSettings()`
    - `synth.playAudio()` (クリックによって即時再生される場合)
  - `synth.handleModeSwitch()` (再生モード切り替え時の処理)
    - `playback-mode.switchMode()`
    - `playback-mode.updateModeUI()`
    - `synth.scheduleNextPlay()`

- クリーンアップ
  - `synth.dispose()` (アプリケーション終了時のリソース解放)
    - `audio-player.stopAndCleanup()`
    - `oscilloscope.stopOscilloscope()`
      - `oscilloscope.cleanupDummyCanvases()`
        - `oscilloscope.validateInputs()`
    - `performance-stats.resetPerformanceStats()`

- その他ユーティリティ関数
  - `settings.exportSettingsToFile()`
  - `settings.importSettingsFromFile()`

---
Generated at: 2026-01-16 07:04:14 JST
