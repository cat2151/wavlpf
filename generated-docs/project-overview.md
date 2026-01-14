Last updated: 2026-01-15

# Project Overview

## プロジェクト概要
- `wavlpf`は、Rust WASMで実装された高性能なローパスフィルター（LPF）付きソフトウェアシンセサイザーです。
- ノコギリ波やパルス波の生成、マウス操作によるインタラクティブなLPF制御、WAVファイル出力などの機能を提供します。
- Webブラウザ上で動作し、音響信号処理のデモとして、またはシンプルなシンセサイザーとして利用可能です。デモはこちら: https://cat2151.github.io/wavlpf/

## 技術スタック
使用している技術をカテゴリ別に整理して説明
- フロントエンド: 
  - **Vite**: 高速な開発サーバーと本番用バンドルビルドに使用されます。
  - **TypeScript**: コードの型安全性を高め、大規模なアプリケーション開発を支援します。
  - **HTML (index.html)**: アプリケーションのユーザーインターフェース構造を定義します。
- 音楽・オーディオ: 
  - **Rust WASM**: 高速なDSP（デジタル信号処理）処理、オシレーター、Biquad LPFの実装に利用され、ネイティブからも利用可能なクレートとして設計されています。
  - **Tone.js**: Web Audio APIをラップし、クリーンで効率的なオーディオ再生を実現します。
  - **cat-oscilloscope**: 生成されたオーディオ波形を視覚的に表示するためのライブラリです。
- 開発ツール: 
  - **Node.js**: JavaScript実行環境であり、npmパッケージ管理やスクリプト実行に使用されます (v14以上)。
  - **npm**: JavaScriptプロジェクトの依存関係管理とスクリプト実行に使用されるパッケージマネージャーです。
  - **Rust**: 高性能な信号処理ロジックを実装するためのプログラミング言語です。
  - **wasm-pack**: RustコードからWebAssembly（WASM）モジュールをビルドするためのツールです。
- テスト: 
  - **Vitest**: 高速なユニットテストフレームワークで、ウォッチモード、UIテストランナー、カバレッジレポート生成などに対応しています。
  - **happy-dom**: Vitestテスト環境でDOMをエミュレートし、ブラウザAPIを利用するコンポーネントのテストを可能にします。
- ビルドツール: 
  - **Vite**: TypeScriptのトランスパイル、Rust WASMモジュールのインポートを含む本番用バンドルを作成します。
  - **wasm-pack**: RustソースコードをWebAssemblyモジュールにコンパイルします。
  - **typescript**: TypeScriptコードを標準のJavaScriptに変換します。
- 言語機能: 
  - **Rust**: 信号処理の中核ロジック（オシレーター、フィルター、レンダリング）の実装に利用され、高いパフォーマンスと安全性を提供します。
  - **TypeScript**: アプリケーションのビジネスロジック、UI連携、WASMモジュールとのインターフェースの実装に利用され、型安全な開発を促進します。
- 自動化・CI/CD: 
  - **GitHub Pages**: `main`ブランチへの変更がプッシュされると、アプリケーションが自動的にデプロイされます。
  - **`.github/workflows/deploy.yml`**: GitHub Actionsによるデプロイワークフローを定義し、ビルド、ファイルコピー、デプロイのプロセスを自動化します。
- 開発標準: 
  - **wasm-opt (binaryen)**: WASMモジュールを最適化し、ファイルサイズと実行速度を向上させるためのツールです。ビルド時にデフォルトで有効化されています。

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
-   **index.html**: WebアプリケーションのエントリーポイントとなるHTMLファイルで、ユーザーインターフェースの骨格を定義し、JavaScriptバンドルを読み込みます。
-   **src/audio-player.ts**: Tone.jsライブラリをラップし、Web Audio APIコンテキストの管理、オーディオ再生の開始/停止、WAV形式のURL再生などの機能を提供します。
-   **src/index.ts**: アプリケーションのメインエントリーポイントであり、`synth.ts`モジュールを初期化して、アプリケーション全体を起動する役割を担います。
-   **src/oscilloscope.test.ts**: `src/oscilloscope.ts`で実装された波形表示機能に関する単体テストを定義し、その正確な動作を検証します。
-   **src/oscilloscope.ts**: `cat-oscilloscope`ライブラリを統合し、生成されたオーディオ波形を視覚的に表示するためのロジック（初期化、更新、停止）を管理します。
-   **src/performance-stats.test.ts**: `src/performance-stats.ts`のパフォーマンス測定ロジックに関する単体テストを定義します。
-   **src/performance-stats.ts**: オーディオ生成にかかる時間などのパフォーマンスデータを収集し、統計情報（平均、最大、最小）を計算および表示するためのユーティリティを提供します。
-   **src/playback-mode.ts**: アプリケーションの再生モードを管理し、それに応じてユーザーインターフェースを更新するロジックを含みます。
-   **src/settings.test.ts**: `src/settings.ts`の設定管理機能に関する単体テストを定義します。
-   **src/settings.ts**: アプリケーションの設定（波形タイプ、LPFパラメータなど）を管理し、localStorageへの保存、JSONファイルからのインポート/エクスポート機能を提供します。
-   **src/synth.ts**: アプリケーションのメインとなるシンセサイザーロジックを格納するファイルです。WASMオーディオモジュールの統合、マウストラッキングによるフィルター制御、オーディオ再生のスケジューリング、UIイベントハンドリングなどを行います。
-   **src/timing.test.ts**: `src/timing.ts`の時間計算ロジックに関する単体テストを定義します。
-   **src/timing.ts**: 指定されたBPMとビート数に基づいてオーディオの持続時間などの音楽的なタイミング計算を行うユーティリティ関数を提供します。
-   **src/ui-params.test.ts**: `src/ui-params.ts`のUIパラメータ読み込みおよびマッピング機能に関する単体テストを定義します。
-   **src/ui-params.ts**: UI要素からシンセサイザーのパラメータ（デューティー比、BPM、Q値、カットオフ周波数など）を読み取り、UIフィールドを更新し、マウス位置をフィルターパラメータにマッピングする役割を担います。
-   **src/wasmAudio.ts**: Rust WASMモジュールとのインターフェース層です。WASMモジュールの動的ロード、初期化、およびRustで実装されたオーディオレンダリング関数を呼び出すためのラッパー機能を提供します。
-   **src/wav.test.ts**: `src/wav.ts`のWAVファイル生成ロジックに関する単体テストを定義します。
-   **src/wav.ts**: 生のオーディオデータを標準的なWAVファイルフォーマットに変換し、ブラウザで再生可能なWAV Blob URLを生成する機能を提供します。
-   **vite.config.ts**: Viteのビルド設定ファイルであり、開発サーバー、本番用バンドル生成、プラグインなどの設定を定義します。
-   **wasm-audio/Cargo.toml**: Rust WASMクレートのプロジェクト設定ファイルで、依存関係、メタデータ、ビルドターゲットを定義します。
-   **wasm-audio/README.md**: `wasm-audio`クレート固有のドキュメントです。
-   **wasm-audio/src/audio_renderer.rs**: Rustで実装されたオーディオ信号のレンダリングロジックを含み、オシレーターとフィルターからの出力を合成して最終的なオーディオバッファを生成します。
-   **wasm-audio/src/filter.rs**: RBJ Audio EQ Cookbookに基づいたBiquadローパスフィルターの実装です。カットオフ周波数とQ値の制御ロジックが含まれます。
-   **wasm-audio/src/lib.rs**: Rust WASMクレートのエントリーポイントであり、JavaScriptから呼び出される主要な関数（オーディオレンダリングなど）をエクスポートし、他のRustモジュールを統合します。
-   **wasm-audio/src/oscillator.rs**: ノコギリ波およびパルス波を生成するためのオシレーターの実装です。デューティー比などのパラメータを制御できます。
-   **各種Markdownファイル (例: ARCHITECTURE_DIAGRAMS.md, DEVELOPMENT.md)**: プロジェクトのアーキテクチャ、開発ガイド、波形可視化の統合分析、実装例など、様々な開発者向け情報や参考資料をまとめたドキュメントファイル群です。
-   **_config.yml**: GitHub Pagesの静的サイトジェネレーターであるJekyllの設定ファイルです。
-   **.gitignore**: Gitがバージョン管理の対象から除外するファイルやディレクトリを指定します。
-   **package-lock.json**: `npm install`によってインストールされた依存関係の正確なバージョンを記録し、ビルドの一貫性を保証します。
-   **package.json**: プロジェクトのメタデータ（名前、バージョンなど）、スクリプト、および開発・実行時の依存関係を定義します。
-   **tsconfig.json**: TypeScriptコンパイラの設定ファイルで、コンパイルオプション（ターゲットECMAScriptバージョン、モジュール解決戦略など）を定義します。
-   **generated-docs/**: 自動生成されたドキュメントが格納される可能性のあるディレクトリです。
-   **issue-notes/**: 開発中に発生した特定の課題や検討事項に関するメモが整理されて格納されているディレクトリです。

## 関数詳細説明
-   **loadTone(src/audio-player.ts)**: Tone.jsライブラリをロードし、オーディオコンテキストを準備します。
    -   役割: Tone.jsを初期化し、再生準備を整える。
    -   引数: なし
    -   戻り値: `Promise<void>`
-   **isToneLoaded(src/audio-player.ts)**: Tone.jsがロード済みかどうかを判定します。
    -   役割: Tone.jsのロード状態を確認する。
    -   引数: なし
    -   戻り値: `boolean`
-   **startAudioContext(src/audio-player.ts)**: Web Audio APIのオーディオコンテキストを開始します。ユーザーインタラクション後に呼び出されることが多いです。
    -   役割: オーディオ再生のためのコンテキストを開始する。
    -   引数: なし
    -   戻り値: `Promise<void>`
-   **isAudioContextRunning(src/audio-player.ts)**: オーディオコンテキストが現在実行中であるかを判定します。
    -   役割: オーディオコンテキストの実行状態を確認する。
    -   引数: なし
    -   戻り値: `boolean`
-   **playWavUrl(src/audio-player.ts)**: 指定されたWAVファイルのURLを再生します。
    -   役割: WAVファイルをロードして再生する。
    -   引数: `url: string` (WAVファイルのURL)
    -   戻り値: `Promise<void>`
-   **stopAndCleanup(src/audio-player.ts)**: 現在再生中のオーディオを停止し、関連リソースをクリーンアップします。
    -   役割: オーディオ再生を終了し、リソースを解放する。
    -   引数: なし
    -   戻り値: `void`
-   **initOscilloscope(src/oscilloscope.ts)**: 波形表示（オシロスコープ）を初期化します。キャンバス要素への接続などを行います。
    -   役割: 波形表示コンポーネントをセットアップする。
    -   引数: `canvasElement: HTMLCanvasElement` (波形描画用キャンバス)
    -   戻り値: `void`
-   **cleanupDummyCanvases(src/oscilloscope.ts)**: ダミーのキャンバス要素をクリーンアップします。テストなどの後処理に利用される可能性があります。
    -   役割: 一時的なキャンバスリソースを解放する。
    -   引数: なし
    -   戻り値: `void`
-   **validateInputs(src/oscilloscope.ts)**: オシロスコープの入力パラメータを検証します。
    -   役割: 波形表示のための入力値が有効かを確認する。
    -   引数: `inputs: any` (検証対象の入力データ)
    -   戻り値: `boolean` (有効ならtrue)
-   **updateOscilloscope(src/oscilloscope.ts)**: オシロスコープの表示を更新します。新しいオーディオデータに基づいて波形を描画し直します。
    -   役割: 提供されたオーディオデータで波形表示を更新する。
    -   引数: `audioData: Float32Array` (オーディオデータ)
    -   戻り値: `void`
-   **stopOscilloscope(src/oscilloscope.ts)**: オシロスコープの表示を停止し、関連するプロセスを終了します。
    -   役割: 波形表示を停止する。
    -   引数: なし
    -   戻り値: `void`
-   **isOscilloscopeInitialized(src/oscilloscope.ts)**: オシロスコープが初期化されているかを確認します。
    -   役割: 波形表示コンポーネントの初期化状態を確認する。
    -   引数: なし
    -   戻り値: `boolean`
-   **createPerformanceStats(src/performance-stats.ts)**: パフォーマンス統計オブジェクトを生成し、初期化します。
    -   役割: パフォーマンス計測のためのデータ構造を準備する。
    -   引数: なし
    -   戻り値: `PerformanceStats` (統計オブジェクト)
-   **addPerformanceSample(src/performance-stats.ts)**: 新しいパフォーマンスサンプル（測定値）を追加します。
    -   役割: 測定されたパフォーマンスデータを記録する。
    -   引数: `sample: number` (測定値、例: ミリ秒)
    -   戻り値: `void`
-   **calculatePerformanceStats(src/performance-stats.ts)**: 収集されたパフォーマンスサンプルから統計情報（平均、最大、最小など）を計算します。
    -   役割: 記録されたパフォーマンスデータから統計値を導出する。
    -   引数: なし
    -   戻り値: `{ average: number, max: number, min: number }`
-   **resetPerformanceStats(src/performance-stats.ts)**: パフォーマンス統計データをリセットし、初期状態に戻します。
    -   役割: パフォーマンス統計を初期化する。
    -   引数: なし
    -   戻り値: `void`
-   **getCurrentMode(src/playback-mode.ts)**: 現在の再生モードを取得します。
    -   役割: アプリケーションの現在の再生モードを返す。
    -   引数: なし
    -   戻り値: `string` (再生モードを示す文字列)
-   **updateModeUI(src/playback-mode.ts)**: 再生モードに基づいてユーザーインターフェースを更新します。
    -   役割: 再生モードに応じてUI要素の状態を変更する。
    -   引数: `mode: string` (新しい再生モード)
    -   戻り値: `void`
-   **switchMode(src/playback-mode.ts)**: 再生モードを切り替えます。
    -   役割: アプリケーションの再生モードを変更する。
    -   引数: `newMode: string` (切り替えたいモード)
    -   戻り値: `void`
-   **validateSettings(src/settings.ts)**: 現在の設定値が有効であるかを検証します。
    -   役割: 保存またはロードされた設定の整合性を確認する。
    -   引数: `settings: Settings` (検証対象の設定オブジェクト)
    -   戻り値: `boolean` (有効ならtrue)
-   **loadSettings(src/settings.ts)**: localStorageから設定をロードします。
    -   役割: アプリケーションの設定を永続化ストレージから読み込む。
    -   引数: なし
    -   戻り値: `Settings` (ロードされた設定オブジェクト)
-   **saveSettings(src/settings.ts)**: 現在の設定をlocalStorageに保存します。
    -   役割: アプリケーションの現在の設定を永続化ストレージに保存する。
    -   引数: `settings: Settings` (保存する設定オブジェクト)
    -   戻り値: `void`
-   **exportSettingsToFile(src/settings.ts)**: 現在の設定をJSONファイルとしてエクスポートし、ダウンロード可能にします。
    -   役割: 設定データをJSON形式でファイルに保存させる。
    -   引数: `settings: Settings` (エクスポートする設定オブジェクト)
    -   戻り値: `void`
-   **importSettingsFromFile(src/settings.ts)**: JSONファイルから設定をインポートします。
    -   役割: JSONファイルから設定データを読み込み、アプリケーションに適用する。
    -   引数: `file: File` (インポートするJSONファイル)
    -   戻り値: `Promise<Settings>` (インポートされた設定オブジェクト)
-   **getCurrentSettings(src/synth.ts)**: シンセサイザーの現在の設定を取得します。
    -   役割: シンセサイザーの動作パラメータを取得する。
    -   引数: なし
    -   戻り値: `Settings` (現在の設定オブジェクト)
-   **displayOscilloscopeError(src/synth.ts)**: オシロスコープ関連のエラーをUIに表示します。
    -   役割: 波形表示モジュールからのエラーメッセージをユーザーに通知する。
    -   引数: `error: Error | string` (エラー情報)
    -   戻り値: `void`
-   **readParameters(src/synth.ts)**: UIからシンセサイザーのパラメータを読み取ります。
    -   役割: ユーザーインターフェースからの入力値を取得し、シンセサイザーのパラメータとして利用する。
    -   引数: なし
    -   戻り値: `SynthParameters` (読み取られたパラメータオブジェクト)
-   **renderAudio(src/synth.ts)**: WASMモジュールを使用してオーディオをレンダリング（生成）します。
    -   役割: Rust WASMを通じて、指定されたパラメータでオーディオデータを生成する。
    -   引数: `params: RenderParams` (レンダリングパラメータ)
    -   戻り値: `Float32Array` (生成されたオーディオデータ)
-   **playAudioWav(src/synth.ts)**: 生成されたオーディオデータをWAV形式で再生します。
    -   役割: WAV形式のオーディオデータを再生する。
    -   引数: `audioBuffer: Float32Array` (オーディオデータ)
    -   戻り値: `Promise<void>`
-   **playAudioSeq(src/synth.ts)**: シーケンスに基づいてオーディオを再生します（おそらくTone.jsを使用）。
    -   役割: 定義されたシーケンスに従ってオーディオイベントをトリガーする。
    -   引数: なし
    -   戻り値: `void`
-   **playAudio(src/synth.ts)**: 現在の再生モードに応じてオーディオ再生を開始します。
    -   役割: 現在の設定に基づいてオーディオ再生ロジックを呼び出す。
    -   引数: なし
    -   戻り値: `void`
-   **handleModeSwitch(src/synth.ts)**: 再生モードが切り替わった際の処理を行います。
    -   役割: 再生モード変更時のUI更新や内部状態調整を行う。
    -   引数: `newMode: string` (新しいモード)
    -   戻り値: `void`
-   **init(src/synth.ts)**: シンセサイザーアプリケーション全体を初期化します。UI要素の設定、イベントリスナーの登録などを行います。
    -   役割: アプリケーションの起動時に必要な全ての初期化処理を実行する。
    -   引数: なし
    -   戻り値: `void`
-   **scheduleNextPlay(src/synth.ts)**: 次のオーディオ再生イベントをスケジューリングします。
    -   役割: BPMとビートに基づいて次のオーディオ再生タイミングを計画する。
    -   引数: なし
    -   戻り値: `void`
-   **updateStatusDisplay(src/synth.ts)**: アプリケーションの状態（例：オーディオコンテキストの状態）をUIに表示します。
    -   役割: ユーザーにアプリケーションの現在の状態を視覚的に伝える。
    -   引数: `message: string` (表示するメッセージ)
    -   戻り値: `void`
-   **updateGenerationTimeDisplay(src/synth.ts)**: オーディオ生成にかかった時間をUIに表示します。
    -   役割: パフォーマンス統計情報をUIに表示する。
    -   引数: `time: number` (生成時間)
    -   戻り値: `void`
-   **dispose(src/synth.ts)**: シンセサイザーが使用するリソースを解放し、クリーンアップします。
    -   役割: アプリケーション終了時やリセット時にリソースを解放する。
    -   引数: なし
    -   戻り値: `void`
-   **handleInputChange(src/synth.ts)**: UIの入力要素が変更された際のイベントハンドラです。
    -   役割: ユーザーによるUI操作（入力値の変更）を処理する。
    -   引数: `event: Event` (変更イベント)
    -   戻り値: `void`
-   **handleClick(src/synth.ts)**: UIのクリックイベントハンドラです。オーディオコンテキストの開始などに利用されます。
    -   役割: ユーザーによるUIクリック操作を処理する。
    -   引数: `event: MouseEvent` (クリックイベント)
    -   戻り値: `void`
-   **calculateDuration(src/timing.ts)**: 指定されたBPMとビート数に基づいてオーディオの持続時間を計算します。
    -   役割: 音楽的なタイミング情報から時間長を算出する。
    -   引数: `bpm: number, beats: number` (BPMとビート数)
    -   戻り値: `number` (持続時間、ミリ秒など)
-   **readNumericParameter(src/ui-params.ts)**: UI要素から数値パラメータを読み取ります。
    -   役割: HTMLの入力フィールドから数値を取得し、必要に応じて検証する。
    -   引数: `elementId: string` (UI要素のID)
    -   戻り値: `number` (読み取られた数値)
-   **readParametersFromUI(src/ui-params.ts)**: 複数のUI要素からすべてのシンセサイザーパラメータを読み取ります。
    -   役割: アプリケーションに必要なすべてのUIパラメータを一度に取得する。
    -   引数: なし
    -   戻り値: `SynthParameters` (読み取られたパラメータオブジェクト)
-   **updateUIFields(src/ui-params.ts)**: 指定された設定値に基づいてUIのフィールドを更新します。
    -   役割: 内部設定値をUIに反映させる。
    -   引数: `settings: Settings` (更新する設定)
    -   戻り値: `void`
-   **mapMouseToFilterParams(src/ui-params.ts)**: マウスのX/Y座標をLPFのカットオフ周波数とQ値にマッピングします。
    -   役割: マウスの動きをシンセサイザーのフィルターパラメータに変換する。
    -   引数: `mouseX: number, mouseY: number` (マウス座標)
    -   戻り値: `{ cutoff: number, q: number }` (フィルターパラメータ)
-   **updateMousePositionDisplay(src/ui-params.ts)**: マウスの位置に対応するフィルターパラメータをUIに表示します。
    -   役割: マウス座標から計算されたフィルター値をUIにリアルタイムで表示する。
    -   引数: `cutoff: number, q: number` (フィルターパラメータ)
    -   戻り値: `void`
-   **initWasm(src/wasmAudio.ts)**: Rust WASMモジュールを初期化し、ロードします。
    -   役割: WASMモジュールをWebアプリケーションにロードし、使用可能にする。
    -   引数: なし
    -   戻り値: `Promise<void>`
-   **isWasmInitialized(src/wasmAudio.ts)**: WASMモジュールが初期化されているかを確認します。
    -   役割: WASMモジュールのロード状態を確認する。
    -   引数: なし
    -   戻り値: `boolean`
-   **renderAudioWasm(src/wasmAudio.ts)**: WASMモジュールにオーディオレンダリングを要求します。
    -   役割: Rust WASMで実装されたオーディオレンダリング関数を呼び出す。
    -   引数: `params: RenderParams` (レンダリングパラメータ)
    -   戻り値: `Float32Array` (WASMから返されるオーディオデータ)
-   **generateWav(src/wav.ts)**: 生のオーディオデータからWAVファイル形式のバイナリデータを生成します。
    -   役割: PCMオーディオデータをWAVヘッダーと結合し、完全なWAVバイナリを作成する。
    -   引数: `audioBuffer: Float32Array, sampleRate: number` (オーディオデータとサンプルレート)
    -   戻り値: `ArrayBuffer` (WAVファイルデータ)
-   **writeString(src/wav.ts)**: 特定のバイト長で文字列をDataViewに書き込むユーティリティ関数です。WAVヘッダー作成に利用されます。
    -   役割: データビューに文字列データを書き込むためのヘルパー関数。
    -   引数: `view: DataView, offset: number, string: string` (書き込むDataView、オフセット、文字列)
    -   戻り値: `void`
-   **createWavBlobUrl(src/wav.ts)**: 生成されたWAVバイナリデータからBlob URLを作成します。
    -   役割: 生成されたWAVデータから、ブラウザで再生可能なURLを生成する。
    -   引数: `wavBuffer: ArrayBuffer` (WAVバイナリデータ)
    -   戻り値: `string` (Blob URL)

## 関数呼び出し階層ツリー
```
- if (src/audio-player.ts)
  - loadTone (src/audio-player.ts)
    - isToneLoaded ()
      - startAudioContext ()
      - isAudioContextRunning ()
      - playWavUrl ()
      - stopAndCleanup ()
      - dispose ()
  - init ()
    - catch (src/audio-player.ts)
      - validateSettings (src/settings.ts)
      - loadSettings ()
      - saveSettings ()
      - exportSettingsToFile ()
      - importSettingsFromFile ()
      - initOscilloscope ()
      - updateOscilloscope ()
      - isOscilloscopeInitialized ()
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
  - stopOscilloscope ()
    - cleanupDummyCanvases ()
      - validateInputs ()
  - resetPerformanceStats ()
  - updateModeUI ()
  - readNumericParameter (src/ui-params.ts)
  - writeString ()
- for (src/oscilloscope.test.ts)
- handleInputChange (src/synth.ts)
- handleClick (src/synth.ts)

---
Generated at: 2026-01-15 07:04:10 JST
