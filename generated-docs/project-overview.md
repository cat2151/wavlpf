Last updated: 2026-01-07

# Project Overview

## プロジェクト概要
- RustとWebAssembly (WASM) を活用し、高性能な信号処理を実現したシンプルソフトウェアシンセサイザーです。
- ノコギリ波やパルス波の生成、およびマウスクリックでインタラクティブに操作できるBiquadローパスフィルターを搭載しています。
- WebAudio APIに依存しない非リアルタイムレンダリング、生成されたオーディオのWAVファイル出力、設定の永続化などの機能を備えています。

## 技術スタック
- フロントエンド:
    - **Vite**: 高速な開発サーバーとバンドラーを提供し、モダンなWebアプリケーション開発を加速します。
    - **TypeScript**: JavaScriptに静的型付けを追加し、大規模なアプリケーション開発におけるコードの品質と保守性を向上させます。
    - **happy-dom**: Vitestテスト環境でDOMをエミュレートするために使用され、ブラウザ環境に依存しないテストを可能にします。
- 音楽・オーディオ:
    - **Rust & WebAssembly (WASM)**: パフォーマンスが重要な信号処理ロジックを実装するために使用され、ブラウザでネイティブに近い速度での実行を可能にします。
    - **Tone.js**: Webブラウザでプログラマブルなオーディオエンジンを提供し、オーディオの再生と操作を容易にします。
    - **Biquad LPF (Low-Pass Filter)**: RBJ Audio EQ Cookbookの公式に基づいたデジタル信号処理アルゴリズムで、サウンドの周波数特性を調整します。
- 開発ツール:
    - **Node.js**: JavaScriptのランタイム環境。アプリケーションのビルドツールや開発サーバーを実行するために必要です。
    - **npm**: Node.jsのパッケージマネージャー。プロジェクトの依存関係の管理とインストールに使用されます。
    - **Rust**: WASMモジュールの開発に使用されるシステムプログラミング言語。
    - **wasm-pack**: RustコードをWebAssemblyにコンパイルし、JavaScriptから利用可能なモジュールとしてパッケージ化するためのツールです。
- テスト:
    - **Vitest**: 高速で機能豊富な単体テストフレームワーク。開発プロセスにおけるコードの品質と信頼性を保証します。
    - **@vitest/ui**: Vitestのテストをブラウザで視覚的に実行し、結果を分かりやすく表示するUIを提供します。
- ビルドツール:
    - **Vite**: フロントエンドアプリケーションのビルドプロセスを管理し、本番環境向けの最適化されたバンドルを生成します。
    - **wasm-opt (binaryen)**: WebAssemblyモジュールをさらに最適化し、ファイルサイズを削減し、実行速度を向上させるために使用されます。
- 言語機能:
    - **Rust**: 高いパフォーマンスとメモリ安全性を保証するシステムプログラミング言語。特にDSP処理に適しています。
    - **TypeScript**: 静的型付けにより、大規模なJavaScriptアプリケーションの保守性と開発効率を高めます。
- 自動化・CI/CD:
    - **GitHub Pages**: Gitリポジトリから直接ウェブサイトをホスティングするサービス。`main`ブランチへの変更がプッシュされると、自動的にアプリケーションがデプロイされます。

## ファイル階層ツリー
```
📄 .gitignore
📖 ARCHITECTURE_DIAGRAMS.md
📖 CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md
📖 CAT_OSCILLOSCOPE_INTEGRATION.md
📖 CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md
📖 DEVELOPMENT.md
📖 IMPLEMENTATION_EXAMPLES.md
📖 INTEGRATION_BLOCKERS_SUMMARY.md
📖 ISSUE_39_SUMMARY.md
📄 LICENSE
📖 PERFORMANCE_DISPLAY_DEMO.md
📖 PERFORMANCE_TIMING_ANALYSIS.md
📖 README.ja.md
📖 README.md
📖 README_ANALYSIS.md
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
📊 package-lock.json
📊 package.json
📁 src/
  📘 index.ts
  📘 performance-stats.test.ts
  📘 performance-stats.ts
  📘 settings.test.ts
  📘 settings.ts
  📘 synth.ts
  📘 wasmAudio.ts
  📘 wav.test.ts
  📘 wav.ts
📊 tsconfig.json
📘 vite.config.ts
📁 wasm-audio/
  📄 Cargo.toml
  📁 src/
    📄 lib.rs
```

## ファイル詳細説明
- **`.gitignore`**: Gitがバージョン管理の対象外とするファイルやディレクトリを指定します。
- **`ARCHITECTURE_DIAGRAMS.md`**: プロジェクトのアーキテクチャに関する図や説明が含まれるドキュメントです。
- **`CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md`**: オシロスコープ機能統合の実現可能性に関する分析ドキュメントです。
- **`CAT_OSCILLOSCOPE_INTEGRATION.md`**: オシロスコープ機能の統合に関する詳細なドキュメントです。
- **`CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md`**: オシロスコープライブラリ統合のベストプラクティスに関する包括的な分析ドキュメントです。
- **`DEVELOPMENT.md`**: 開発フレームワークとテスト戦略に関する詳細なガイドです。
- **`IMPLEMENTATION_EXAMPLES.md`**: 実装例やコードスニペットが含まれるドキュメントです。
- **`INTEGRATION_BLOCKERS_SUMMARY.md`**: 統合を妨げる要因の要約に関するドキュメントです。
- **`ISSUE_39_SUMMARY.md`**: 特定のイシュー（問題）に関する要約ドキュメントです。
- **`LICENSE`**: プロジェクトのライセンス情報（MITライセンス）が記述されています。
- **`PERFORMANCE_DISPLAY_DEMO.md`**: パフォーマンス表示機能のデモに関するドキュメントです。
- **`PERFORMANCE_TIMING_ANALYSIS.md`**: パフォーマンスタイミングの分析に関するドキュメントです。
- **`README.ja.md`**: プロジェクトの日本語版READMEファイルです。
- **`README.md`**: プロジェクトの概要、機能、セットアップ方法などが記載されたメインのREADMEファイルです。
- **`README_ANALYSIS.md`**: READMEファイルの分析に関するドキュメントです。
- **`SUMMARY.md`**: プロジェクトの簡潔な要約が含まれるドキュメントです。
- **`_config.yml`**: GitHub PagesのJekyll設定ファイルです。
- **`generated-docs/`**: 生成されたドキュメントが格納されるディレクトリです。
- **`index.html`**: アプリケーションのウェブインターフェース（HTML構造）を定義するエントリポイントファイルです。
- **`issue-notes/`**: 開発中の特定の問題や検討事項に関するメモが格納されるディレクトリです。
    - **`issue-notes/21.md`** から **`issue-notes/48.md`**: 各数値は特定のイシューに対応するメモファイルです。
- **`package-lock.json`**: `npm`が管理する依存関係の正確なツリー構造を記録し、ビルドの再現性を保証します。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。
- **`src/index.ts`**: アプリケーションのメインエントリポイント。DOMがロードされた後にシンセサイザーの初期化処理をトリガーします。
- **`src/performance-stats.test.ts`**: `src/performance-stats.ts` モジュールに関する単体テストを定義するファイルです。
- **`src/performance-stats.ts`**: パフォーマンス測定のためのユーティリティ関数を提供し、オーディオ生成時間などの統計情報を追跡・計算します。
- **`src/settings.test.ts`**: `src/settings.ts` モジュールに関する単体テストを定義するファイルです。
- **`src/settings.ts`**: アプリケーションの設定の検証、ロード、保存、インポート、エクスポートを管理します。`localStorage`を利用して設定を永続化します。
- **`src/synth.ts`**: メインのシンセサイザーロジックを含む。マウストラッキングによるフィルター制御、オーディオレンダリングの調整、UI更新、再生スケジューリングなどを担当します。WASMオーディオモジュールとWAV生成モジュールと連携します。
- **`src/wasmAudio.ts`**: Rustで実装されたWASMオーディオモジュールのTypeScriptラッパー。WASMモジュールの動的ロード、初期化、Rust側でのオーディオレンダリング機能へのインターフェースを提供します。
- **`src/wav.test.ts`**: `src/wav.ts` モジュールに関する単体テストを定義するファイルです。
- **`src/wav.ts`**: 生のオーディオデータからWAVファイルを生成し、ダウンロード可能なBlob URLを作成する機能を提供します。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイル。コンパイルオプションなどを定義します。
- **`vite.config.ts`**: Viteビルドツールの設定ファイル。TypeScriptやWASMモジュールのビルド方法などを定義します。
- **`wasm-audio/`**: Rustで実装されたWASMオーディオモジュールのプロジェクトディレクトリです。
    - **`wasm-audio/Cargo.toml`**: Rustプロジェクト（WASMモジュール）の設定ファイル。依存関係やビルド設定を定義します。
    - **`wasm-audio/src/lib.rs`**: プロジェクトのコアとなるRust WASM信号処理パイプラインの実装。オシレーター生成（ノコギリ波、パルス波）、Biquad LPFフィルター、およびオーディオレンダリングロジックを含むライブラリのエントリポイントです。

## 関数詳細説明
- **`if (src/index.ts)`**
    - 役割と機能: DOMが完全にロードされた後に、シンセサイザーの初期化関数 `init()` を呼び出す条件分岐を処理します。
    - 引数: なし
    - 戻り値: なし
- **`createPerformanceStats (src/performance-stats.ts)`**
    - 役割と機能: パフォーマンス統計を管理するための初期状態を生成し、関連する操作関数（サンプル追加、統計計算、リセット）を含むオブジェクトを返します。
    - 引数: なし
    - 戻り値: パフォーマンス統計管理オブジェクト
- **`addPerformanceSample (src/performance-stats.ts)`**
    - 役割と機能: 新しいパフォーマンスサンプル（オーディオ生成にかかった時間など）を記録します。
    - 引数: `time` (number) - 記録する時間（ミリ秒など）
    - 戻り値: なし
- **`calculatePerformanceStats (src/performance-stats.ts)`**
    - 役割と機能: 記録されたパフォーマンスサンプルから、最小値、最大値、平均値、標準偏差などの統計情報を計算します。
    - 引数: なし
    - 戻り値: パフォーマンス統計オブジェクト
- **`resetPerformanceStats (src/performance-stats.ts)`**
    - 役割と機能: 記録されたパフォーマンスサンプルと統計情報をリセットし、初期状態に戻します。
    - 引数: なし
    - 戻り値: なし
- **`validateSettings (src/settings.ts)`**
    - 役割と機能: ロードされた設定オブジェクトが期待される形式と値の範囲に適合しているか検証し、不正な値があれば修正またはデフォルト値を適用します。
    - 引数: `settings` (object) - 検証する設定オブジェクト
    - 戻り値: `boolean` - 検証結果（true: 有効、false: 無効または修正済み）
- **`loadSettings (src/settings.ts)`**
    - 役割と機能: `localStorage` から設定をロードし、必要に応じてデフォルト値で補完し、`validateSettings` を使用して検証します。
    - 引数: なし
    - 戻り値: `settings` (object) - ロードされた設定オブジェクト
- **`saveSettings (src/settings.ts)`**
    - 役割と機能: 現在の設定オブジェクトをJSON文字列として `localStorage` に保存します。
    - 引数: `settings` (object) - 保存する設定オブジェクト
    - 戻り値: なし
- **`exportSettingsToFile (src/settings.ts)`**
    - 役割と機能: 現在の設定をJSONファイルとしてエクスポートし、ユーザーがダウンロードできるようにします。
    - 引数: `settings` (object) - エクスポートする設定オブジェクト
    - 戻り値: なし
- **`importSettingsFromFile (src/settings.ts)`**
    - 役割と機能: ユーザーが選択したJSONファイルから設定をインポートし、検証後にアプリケーションに適用します。非同期処理を行います。
    - 引数: `file` (File) - インポートするJSONファイル
    - 戻り値: `Promise<object>` - インポートされた設定オブジェクト
- **`if (src/settings.ts)`**
    - 役割と機能: 設定のロード処理において、`localStorage` に設定が存在するか、または設定が正しくパースできるかといった条件分岐を処理します。
    - 引数: なし
    - 戻り値: なし
- **`catch (src/settings.ts)`**
    - 役割と機能: `try-catch` ブロック内で発生したエラーを処理します。特に設定のロードやJSONパースのエラーを捕捉し、適切な処理を行います。
    - 引数: `error` (Error) - 発生したエラーオブジェクト
    - 戻り値: なし
- **`getCurrentSettings (src/synth.ts)`**
    - 役割と機能: 現在UIに表示されているシンセサイザーの各種設定値（波形タイプ、デューティー比、フィルター最大値など）を読み取り、オブジェクトとして返します。
    - 引数: なし
    - 戻り値: `settings` (object) - 現在の設定オブジェクト
- **`getDuration (src/synth.ts)`**
    - 役割と機能: BPM（Beats Per Minute）とビート（生成する小節数）の設定に基づいて、オーディオの総生成時間（秒）を計算します。
    - 引数: `bpm` (number), `beats` (number)
    - 戻り値: `duration` (number) - 生成時間（秒）
- **`readNumericParameter (src/synth.ts)`**
    - 役割と機能: HTML要素から数値パラメータを読み取り、指定された最小値と最大値の範囲内でクランプ（範囲制限）します。
    - 引数: `elementId` (string), `min` (number), `max` (number), `defaultValue` (number)
    - 戻り値: `value` (number) - 読み取られ、クランプされた数値
- **`readParameters (src/synth.ts)`**
    - 役割と機能: UIの入力フィールドからシンセサイザーの各種パラメータ（波形タイプ、デューティー比、減衰レートなど）を読み取り、オブジェクトとしてまとめます。
    - 引数: なし
    - 戻り値: `parameters` (object) - シンセサイザーパラメータオブジェクト
- **`getFilterParams (src/synth.ts)`**
    - 役割と機能: マウスのX軸（水平位置）とY軸（垂直位置）の座標に基づいて、フィルターのカットオフ周波数とQ値（レゾナンス）を計算します。
    - 引数: `mouseX` (number), `mouseY` (number), `currentSettings` (object) - 現在のシンセサイザー設定
    - 戻り値: `filterParams` (object) - `cutoffHz` (number) と `qValue` (number) を含むオブジェクト
- **`renderAudio (src/synth.ts)`**
    - 役割と機能: Rust WASMモジュール (`wasmAudio.ts` 経由) を使用してオーディオをレンダリングし、そのパフォーマンスを測定します。
    - 引数: `duration` (number), `sampleRate` (number), `parameters` (object), `filterParams` (object)
    - 戻り値: `audioBuffer` (Float32Array) - レンダリングされたオーディオデータ
- **`playAudio (src/synth.ts)`**
    - 役割と機能: Tone.jsライブラリを使用して、レンダリングされたオーディオバッファを再生します。
    - 引数: `audioBuffer` (Float32Array), `sampleRate` (number)
    - 戻り値: なし
- **`updateUIFields (src/synth.ts)`**
    - 役割と機能: 指定された設定値に基づいて、UI上の入力フィールド（波形タイプ、BPMなど）の表示を更新します。
    - 引数: `settings` (object)
    - 戻り値: なし
- **`init (src/synth.ts)`**
    - 役割と機能: シンセサイザーアプリケーション全体を初期化します。WASMモジュールのロード、設定のロード、UIイベントリスナーの設定、および最初のオーディオ生成と再生を行います。
    - 引数: なし
    - 戻り値: なし
- **`scheduleNextPlay (src/synth.ts)`**
    - 役割と機能: 現在のBPMとビート設定に基づいて、次のオーディオ生成と再生のタイミングをスケジュールします。
    - 引数: なし
    - 戻り値: なし
- **`updateStatusDisplay (src/synth.ts)`**
    - 役割と機能: アプリケーションのステータスメッセージ（例: "Audio context started"）をUIに表示し、エラーメッセージの場合は色を変えることができます。
    - 引数: `message` (string), `isError` (boolean, optional)
    - 戻り値: なし
- **`updateGenerationTimeDisplay (src/synth.ts)`**
    - 役割と機能: 最新のオーディオ生成時間とその統計情報（最小、最大、平均など）をUIに表示します。
    - 引数: `stats` (object) - パフォーマンス統計オブジェクト
    - 戻り値: なし
- **`dispose (src/synth.ts)`**
    - 役割と機能: アプリケーションが終了またはリセットされる際に、使用中のリソース（オーディオコンテキスト、イベントリスナーなど）を解放します。
    - 引数: なし
    - 戻り値: なし
- **`handleInputChange (src/synth.ts)`**
    - 役割と機能: UIの入力フィールド（設定項目）が変更されたときに呼び出されます。変更された設定を保存し、オーディオの再生成と再生をトリガーします。
    - 引数: `event` (Event) - 変更イベント
    - 戻り値: なし
- **`handleClick (src/synth.ts)`**
    - 役割と機能: ページ上のクリックイベントを処理します。オーディオコンテキストの開始、またはWAVファイルの生成とダウンロードなどのアクションをハンドリングします。
    - 引数: `event` (Event) - クリックイベント
    - 戻り値: なし
- **`if (src/synth.ts)`**
    - 役割と機能: `synth.ts`内で様々な条件分岐を処理します。例えば、オーディオコンテキストの開始状態、波形タイプの選択、ファイルダウンロードのトリガーなどが考えられます。
    - 引数: なし
    - 戻り値: なし
- **`catch (src/synth.ts)`**
    - 役割と機能: シンセサイザーのロジック内で発生したエラー（WASMのロード失敗、オーディオ生成エラーなど）を捕捉し、ユーザーに通知するなどのエラーハンドリングを行います。
    - 引数: `error` (Error) - 発生したエラーオブジェクト
    - 戻り値: なし
- **`initWasm (src/wasmAudio.ts)`**
    - 役割と機能: WebAssemblyモジュールを動的にロードし、JavaScriptから利用できるように初期化します。
    - 引数: なし
    - 戻り値: `Promise<void>`
- **`isWasmInitialized (src/wasmAudio.ts)`**
    - 役割と機能: WASMモジュールが既にロードされ、初期化されているかどうかの状態を確認します。
    - 引数: なし
    - 戻り値: `boolean`
- **`renderAudioWasm (src/wasmAudio.ts)`**
    - 役割と機能: Rust WASMモジュール内のオーディオレンダリング関数を呼び出し、指定されたパラメータに基づいて処理されたオーディオデータを取得します。
    - 引数: `duration` (number), `sampleRate` (number), `parameters` (object), `filterParams` (object)
    - 戻り値: `Float32Array` - レンダリングされたオーディオデータ
- **`if (src/wasmAudio.ts)`**
    - 役割と機能: WASMモジュールが初期化されているかどうかの確認や、WASMモジュールのロード状態に応じた処理の分岐をハンドリングします。
    - 引数: なし
    - 戻り値: なし
- **`catch (src/wasmAudio.ts)`**
    - 役割と機能: WASMモジュールのロードや実行中に発生したエラー（ネットワークエラー、WASMのパースエラーなど）を捕捉し、エラー処理を行います。
    - 引数: `error` (Error) - 発生したエラーオブジェクト
    - 戻り値: なし
- **`generateWav (src/wav.ts)`**
    - 役割と機能: 指定されたオーディオデータ（`Float32Array`）とサンプリングレートから、WAVファイル形式の`ArrayBuffer`を生成します。
    - 引数: `audioBuffer` (Float32Array), `sampleRate` (number)
    - 戻り値: `ArrayBuffer` - WAVファイルデータ
- **`writeString (src/wav.ts)`**
    - 役割と機能: `DataView`オブジェクトの指定されたオフセットに文字列を書き込むヘルパー関数です。WAVヘッダーのチャンク識別子などに使用されます。
    - 引数: `view` (DataView), `offset` (number), `s` (string)
    - 戻り値: なし
- **`createWavBlobUrl (src/wav.ts)`**
    - 役割と機能: 生成されたWAVファイルの `ArrayBuffer` から、ブラウザでダウンロード可能なBlob URLを作成します。
    - 引数: `wavBuffer` (ArrayBuffer)
    - 戻り値: `string` - Blob URL
- **`if (src/wav.ts)`**
    - 役割と機能: `generateWav` 関数内で、オーディオデータのチャネル数（モノラル/ステレオ）やデータ形式に基づいて処理を分岐させます。
    - 引数: なし
    - 戻り値: なし
- **`for (src/wav.ts)`**
    - 役割と機能: `generateWav` 関数内で、オーディオデータをWAVフォーマットのバイト列に変換するために、各サンプルを反復処理します。
    - 引数: なし
    - 戻り値: なし

## 関数呼び出し階層ツリー
```
- if (src/index.ts)
  - init ()
    - createPerformanceStats (src/performance-stats.ts)
      - addPerformanceSample ()
      - calculatePerformanceStats ()
      - resetPerformanceStats ()
    - loadSettings ()
      - validateSettings (src/settings.ts)
      - saveSettings ()
      - exportSettingsToFile ()
      - importSettingsFromFile ()
    - catch (src/settings.ts)
      - getCurrentSettings (src/synth.ts)
      - getDuration ()
      - readNumericParameter ()
      - readParameters ()
      - getFilterParams ()
      - renderAudio ()
      - playAudio ()
      - updateUIFields ()
      - scheduleNextPlay ()
      - updateStatusDisplay ()
      - updateGenerationTimeDisplay ()
      - dispose ()
      - initWasm ()
      - isWasmInitialized ()
      - renderAudioWasm ()
      - generateWav ()
      - createWavBlobUrl ()
  - writeString ()
- handleInputChange (src/synth.ts)
- handleClick (src/synth.ts)
- for (src/wav.ts)

---
Generated at: 2026-01-07 07:04:14 JST
