Last updated: 2026-01-08

# Project Overview

## プロジェクト概要
- Rust WASMで実装された、ローパスフィルターを搭載したシンプルなソフトウェアシンセサイザーです。
- 高速なDSP処理とインタラクティブなフィルター制御、WAV生成機能をウェブ上で提供します。
- マウス操作でリアルタイムにサウンドを変化させ、設定の永続化や外部連携も可能です。

## 技術スタック
- フロントエンド: 
  - HTML: アプリケーションのユーザーインターフェース構造を定義します。
  - TypeScript: JavaScriptに静的型付けを導入し、大規模なアプリケーションの堅牢性と保守性を向上させます。
  - Vite: 高速な開発サーバーとモダンなビルドプロセスを提供し、開発体験を最適化します。
- 音楽・オーディオ: 
  - Rust WASM: 低レイテンシで高性能なDSP（デジタル信号処理）を実現するために、波形生成やフィルター処理に利用されています。
  - Tone.js: ウェブオーディオAPIを抽象化し、クリーンで高機能なオーディオ再生を実現するJavaScriptフレームワークです。
  - Biquad LPFフィルター: RBJ Audio EQ Cookbookの公式に基づいて実装されたローパスフィルターで、高品質なサウンドフィルタリングを提供します。
- 開発ツール: 
  - Node.js: JavaScriptのランタイム環境であり、プロジェクトのビルドや開発サーバーの実行に使用されます。
  - npm: Node.jsのパッケージマネージャーで、依存関係のインストールと管理に使用されます。
  - wasm-pack: RustコードをWebAssemblyにコンパイルし、JavaScriptと連携するためのツールです。
- テスト: 
  - Vitest: 高速な単体テストフレームワークで、アプリケーションのロジックが正しく機能することを確認します。
  - happy-dom: Vitest環境でDOM操作をシミュレートするために使用され、ブラウザ環境に依存しないテストを可能にします。
- ビルドツール: 
  - Vite: TypeScriptのトランスパイルと本番用バンドルの生成を担当します。
  - wasm-pack: RustからWebAssemblyモジュールをビルドし、JavaScriptから利用可能なバインディングを生成します。
  - wasm-opt (binaryen): 生成されたWebAssemblyモジュールの最適化を行い、パフォーマンスとファイルサイズを改善します。
- 言語機能: 
  - Rust: 低レイテンシかつ高性能な信号処理を実現するために採用されたシステムプログラミング言語です。メモリ安全性と並行処理に優れています。
  - TypeScript: JavaScriptに静的型付けをもたらし、大規模なアプリケーション開発におけるコードの信頼性、保守性、可読性を向上させる言語です。
- 自動化・CI/CD: 
  - GitHub Actions: `main`ブランチへの変更がプッシュされると自動的にアプリケーションをビルドし、GitHub Pagesにデプロイするワークフローを定義します。
- 開発標準: 
  - `wasm-audio/Cargo.toml`内の`wasm-opt = false`の禁止: WASMの最適化はパフォーマンスに不可欠であり、意図しない無効化を防ぐための厳格な開発ルールです。

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
  📖 50.md
  📖 52.md
  📖 53.md
  📖 55.md
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
-   **.gitignore**: Gitのバージョン管理システムが追跡しないファイルやディレクトリを指定します。
-   **ARCHITECTURE_DIAGRAMS.md**: プロジェクトの全体構造やコンポーネント間の関係を示すアーキテクチャ図に関する説明ドキュメントです。
-   **CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md**: CATオシロスコープライブラリの統合が技術的に可能であるかどうかの分析結果をまとめたドキュメントです。
-   **CAT_OSCILLOSCOPE_INTEGRATION.md**: CATオシロスコープをプロジェクトに統合するための具体的な手順や参考情報を記載したドキュメントです。
-   **CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md**: CATオシロスコープライブラリを統合する際のベストプラクティスと推奨されるアプローチについて詳細に解説したドキュメントです。
-   **DEVELOPMENT.md**: プロジェクトの開発フレームワーク、環境設定、テスト戦略など、開発者がプロジェクトを進める上で必要な情報を提供するガイドです。
-   **IMPLEMENTATION_EXAMPLES.md**: プロジェクト内の特定の機能やコンポーネントの実装例を示し、コードの理解を助けるドキュメントです。
-   **INTEGRATION_BLOCKERS_SUMMARY.md**: プロジェクト統合における潜在的な障害や課題を要約したドキュメントです。
-   **ISSUE_39_SUMMARY.md**: 特定の課題（Issue #39）に関する詳細な情報や解決策の要約を記載したドキュメントです。
-   **LICENSE**: プロジェクトのライセンス情報（MIT License）を記載したファイルで、ソフトウェアの使用、変更、配布に関する条件を示します。
-   **PERFORMANCE_DISPLAY_DEMO.md**: パフォーマンス表示機能のデモンストレーションに関するドキュメントです。
-   **PERFORMANCE_TIMING_ANALYSIS.md**: オーディオ処理などのパフォーマンス測定とタイミング分析の結果をまとめたドキュメントです。
-   **README.ja.md / README.md**: プロジェクトの概要、目的、機能、使い方、ビルド方法など、プロジェクトに関する基本的な情報を提供する主要なドキュメント（日本語版と英語版）。
-   **README_ANALYSIS.md**: `README.md`の内容や構成について分析したドキュメントです。
-   **SUMMARY.md**: プロジェクト全体の主要なポイントを簡潔にまとめた要約ドキュメントです。
-   **_config.yml**: GitHub Pagesの設定ファイルで、通常はJekyllサイトの構成に使用されます。
-   **generated-docs/**: 自動生成されたドキュメントやリソースが格納されるディレクトリです。
-   **index.html**: WebアプリケーションのメインエントリポイントとなるHTMLファイルで、ユーザーインターフェースの骨格とJavaScriptの読み込みを担います。
-   **issue-notes/**: 開発中に議論されたり、解決されたりした特定の課題に関するメモや詳細情報が格納されるディレクトリです。
-   **package-lock.json**: `package.json`に記述された依存関係の正確なバージョンとツリー構造を記録し、ビルドの再現性を保証します。
-   **package.json**: Node.jsプロジェクトのメタデータ、スクリプト、依存関係を定義する設定ファイルです。
-   **src/**: アプリケーションの主要なTypeScriptソースコードが格納されるディレクトリです。
    -   **src/index.ts**: アプリケーションのエントリーポイント。初期設定のロードや主要なUIイベントリスナーの設定を行います。
    -   **src/performance-stats.test.ts**: `src/performance-stats.ts`モジュールの機能性を検証するためのテストコードです。
    -   **src/performance-stats.ts**: オーディオ生成などの処理時間パフォーマンスを計測し、統計情報を管理するロジックを提供します。
    -   **src/settings.test.ts**: `src/settings.ts`モジュールの機能性を検証するためのテストコードです。
    -   **src/settings.ts**: ユーザー設定の読み込み、保存、ファイルへのエクスポート、ファイルからのインポートを管理するロジックを実装しています。
    -   **src/synth.ts**: シンセサイザーのメインロジックを担います。UIからの入力を処理し、オーディオのレンダリング、再生、フィルターのリアルタイム制御などを実行します。
    -   **src/wasmAudio.ts**: Rustで実装されたWASMモジュールとJavaScript間のブリッジとして機能します。WASMモジュールの初期化、ロード、オーディオ処理関数の呼び出しを行います。
    -   **src/wav.test.ts**: `src/wav.ts`モジュールのWAVファイル生成機能の検証を行うテストコードです。
    -   **src/wav.ts**: 生成された生のオーディオデータを標準のWAVファイルフォーマットに変換し、ダウンロード可能なBlob URLを生成する機能を提供します。
-   **tsconfig.json**: TypeScriptコンパイラの設定ファイルで、プロジェクトのコンパイルオプションを定義します。
-   **vite.config.ts**: Viteビルドツールの設定ファイルで、開発サーバーの挙動やビルドプロセスをカスタマイズします。
-   **wasm-audio/**: Rustで実装されたWebAssemblyオーディオモジュールのソースコードと設定が格納されるディレクトリです。
    -   **wasm-audio/Cargo.toml**: Rustプロジェクトのビルド設定ファイルで、依存関係、パッケージ情報、WASMビルドオプションなどを定義します。
    -   **wasm-audio/src/lib.rs**: Rust言語で書かれたWebAssemblyモジュールの主要な信号処理ロジックです。オシレーター（ノコギリ波、パルス波）生成、Biquad LPFフィルター、オーディオレンダリングなどのコア機能が含まれています。

## 関数詳細説明
-   **createPerformanceStats()** (src/performance-stats.ts): オーディオ生成時間などのパフォーマンス統計を管理するためのオブジェクトを初期化し、返します。
-   **addPerformanceSample()** (src/performance-stats.ts): 測定されたオーディオ生成時間（ミリ秒）をパフォーマンス統計に追加します。
-   **calculatePerformanceStats()** (src/performance-stats.ts): 記録されたすべてのパフォーマンスサンプルから、平均、最小、最大などの統計値を計算し、更新します。
-   **resetPerformanceStats()** (src/performance-stats.ts): 記録されたすべてのパフォーマンスサンプルをクリアし、統計を初期状態に戻します。
-   **validateSettings(settings: any)** (src/settings.ts): 渡された設定オブジェクトが期待されるデータ型と値の範囲に適合しているかを確認します。
    -   引数: `settings` - 検証対象となる設定オブジェクト。
    -   戻り値: `boolean` - 設定が有効であれば`true`、無効であれば`false`。
-   **loadSettings()** (src/settings.ts): ローカルストレージからユーザー設定を読み込むか、利用できない場合はデフォルト設定を適用します。
-   **saveSettings()** (src/settings.ts): 現在のアプリケーション設定をローカルストレージに保存し、永続化します。
-   **exportSettingsToFile()** (src/settings.ts): 現在の設定をJSON形式のファイルとして生成し、ユーザーがダウンロードできるように促します。
-   **importSettingsFromFile(event: Event)** (src/settings.ts): ファイル入力イベントからJSONファイルを読み込み、その内容をアプリケーション設定として適用します。
    -   引数: `event` - ファイルが選択された際に発生するイベントオブジェクト。
    -   戻り値: なし
-   **getCurrentSettings()** (src/synth.ts): UI上の入力フィールドから現在のシンセサイザーパラメータ（波形タイプ、デューティー比など）を収集し、設定オブジェクトとして返します。
-   **getDuration(bpm: number, beats: number)** (src/synth.ts): 指定されたBPM（1分あたりの拍数）とビート数に基づき、オーディオ生成の総時間（秒単位）を計算します。
    -   引数: `bpm` - 1分あたりの拍数, `beats` - 生成する拍数。
    -   戻り値: `number` - 計算されたオーディオの総時間（秒）。
-   **readNumericParameter(id: string, defaultValue: number)** (src/synth.ts): 指定されたHTML要素IDを持つUI入力から数値パラメータを読み取り、パースエラーの場合はデフォルト値を返します。
    -   引数: `id` - 読み取るHTML要素のID, `defaultValue` - パース失敗時に使用するデフォルト値。
    -   戻り値: `number` - 読み取られた数値パラメータ。
-   **readParameters()** (src/synth.ts): UI全体からシンセサイザーの全ての操作可能なパラメータを読み込み、現在の設定を更新します。
-   **getFilterParams(mouseX: number, mouseY: number, maxCutoff: number, maxQ: number)** (src/synth.ts): マウスのX座標とY座標、および最大値に基づいて、Biquad LPFのカットオフ周波数とQ値を計算します。
    -   引数: `mouseX`, `mouseY` - マウスの画面上のX, Y座標, `maxCutoff` - カットオフ周波数の最大値, `maxQ` - Q値の最大値。
    -   戻り値: `{ cutoff: number, Q: number }` - 計算されたフィルターパラメータを含むオブジェクト。
-   **renderAudio(settings: any, cutoff: number, q: number)** (src/synth.ts): 現在の設定、指定されたカットオフ周波数、Q値を使用して、WebAssemblyモジュールを介してオーディオデータを生成（レンダリング）します。
    -   引数: `settings` - 現在のシンセサイザー設定, `cutoff` - フィルターのカットオフ周波数, `q` - フィルターのQ値。
    -   戻り値: `Float32Array` - 生成された生オーディオデータ。
-   **playAudioWav(audioBuffer: Float32Array, sampleRate: number)** (src/synth.ts): 生成されたオーディオバッファをWAVファイルとしてダウンロード可能な形式で提供します。
    -   引数: `audioBuffer` - 再生するオーディオデータ, `sampleRate` - オーディオのサンプリングレート。
    -   戻り値: なし
-   **playAudioSeq(audioBuffer: Float32Array, sampleRate: number)** (src/synth.ts): Tone.jsライブラリを利用して、生成されたオーディオバッファをウェブ上でシーケンシャルに再生します。
    -   引数: `audioBuffer` - 再生するオーディオデータ, `sampleRate` - オーディオのサンプリングレート。
    -   戻り値: なし
-   **playAudio(audioBuffer: Float32Array, sampleRate: number)** (src/synth.ts): アプリケーションの現在の設定（WAVダウンロードかTone.js再生か）に基づき、生成されたオーディオバッファを処理します。
    -   引数: `audioBuffer` - 再生するオーディオデータ, `sampleRate` - オーディオのサンプリングレート。
    -   戻り値: なし
-   **switchMode(mode: 'wav' | 'tone')** (src/synth.ts): オーディオの出力モードをWAVファイル生成またはTone.jsによるウェブ再生に切り替えます。
    -   引数: `mode` - 切り替えるモード（'wav'または'tone'）。
    -   戻り値: なし
-   **updateUIFields()** (src/synth.ts): 現在の設定値に基づいて、アプリケーションのUIにある入力フィールドや表示要素を更新します。
-   **init()** (src/synth.ts): アプリケーションの起動時に一度だけ呼び出され、初期設定のロード、イベントリスナーの登録、WASMモジュールの初期化などを行います。
-   **scheduleNextPlay()** (src/synth.ts): BPMとビート設定に基づいて、次回のオーディオ生成および再生処理を適切なタイミングでスケジュールします。
-   **updateStatusDisplay(message: string)** (src/synth.ts): アプリケーションのステータス表示領域に指定されたメッセージを表示し、ユーザーに情報を提供します。
    -   引数: `message` - 表示するステータス文字列。
    -   戻り値: なし
-   **updateGenerationTimeDisplay(timeMs: number)** (src/synth.ts): オーディオ生成にかかった時間（ミリ秒）をUI上に表示し、パフォーマンスのフィードバックを提供します。
    -   引数: `timeMs` - オーディオ生成にかかった時間（ミリ秒）。
    -   戻り値: なし
-   **dispose()** (src/synth.ts): Tone.jsオーディオコンテキストなど、アプリケーションが使用するリソースを解放し、クリーンアップします。
-   **handleInputChange()** (src/synth.ts): UIの入力フィールドが変更されたときにトリガーされるイベントハンドラで、関連する設定の更新やオーディオ処理の再実行を促します。
-   **handleClick(event: MouseEvent)** (src/synth.ts): ページ上のクリックイベントを処理するハンドラで、オーディオコンテキストの初期化やマウス位置に基づいたフィルターパラメータの制御を行います。
    -   引数: `event` - マウスクリックに関する情報を含むイベントオブジェクト。
    -   戻り値: なし
-   **initWasm()** (src/wasmAudio.ts): WebAssemblyモジュールを非同期でロードし、初期化処理を実行します。
-   **isWasmInitialized()** (src/wasmAudio.ts): WebAssemblyモジュールが正常にロードされ、初期化が完了しているかどうかを示す真偽値を返します。
-   **renderAudioWasm(sampleRate: number, sampleCount: number, waveType: number, duty: number, frequency: number, cutoff: number, q: number, decayUnit: number, decayRate: number)** (src/wasmAudio.ts): WebAssemblyモジュールに直接オーディオ生成パラメータを渡し、高速な信号処理を実行してオーディオデータをレンダリングします。
    -   引数: `sampleRate` - サンプリングレート, `sampleCount` - 生成するサンプル数, `waveType` - 波形の種類, `duty` - デューティー比, `frequency` - 基本周波数, `cutoff` - カットオフ周波数, `q` - レゾナンスQ値, `decayUnit` - 減衰の単位, `decayRate` - 減衰率。
    -   戻り値: `Float32Array` - 生成された生のオーディオデータ。
-   **generateWav(audioBuffer: Float32Array, sampleRate: number)** (src/wav.ts): 生のオーディオデータとサンプリングレートを受け取り、WAV形式のバイナリBlobデータを生成します。
    -   引数: `audioBuffer` - 生成するオーディオデータ, `sampleRate` - オーディオのサンプリングレート。
    -   戻り値: `Blob` - 生成されたWAVデータを含むBlobオブジェクト。
-   **writeString(view: DataView, offset: number, s: string)** (src/wav.ts): `DataView`オブジェクトの指定されたオフセット位置に文字列を書き込むためのヘルパー関数です。
    -   引数: `view` - 書き込み対象の`DataView`オブジェクト, `offset` - 書き込みを開始するオフセットバイト位置, `s` - 書き込む文字列。
    -   戻り値: なし
-   **createWavBlobUrl(audioBlob: Blob)** (src/wav.ts): 生成されたWAV Blobオブジェクトから、ブラウザでダウンロード可能なURLを作成します。
    -   引数: `audioBlob` - WAV形式のBlobデータ。
    -   戻り値: `string` - ダウンロード用のURL文字列。

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
      - playAudioWav ()
      - playAudioSeq ()
      - playAudio ()
      - switchMode ()
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
Generated at: 2026-01-08 07:03:51 JST
