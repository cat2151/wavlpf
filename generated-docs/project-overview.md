Last updated: 2026-02-02

# Project Overview

## プロジェクト概要
- RustとWebAssemblyで実装された、ローパスフィルター（LPF）を搭載したシンプルなソフトウェアシンセサイザーです。
- 高速な信号処理とリアルタイムの波形ビジュアライゼーションを提供し、インタラクティブなフィルター制御が可能です。
- 生成したオーディオのWAVエクスポート、設定の永続化、およびWebブラウザでのデモ利用をサポートしています。

## 技術スタック
- フロントエンド: Vite (高速な開発サーバーとビルドツール), TypeScript (型安全なJavaScript開発), HTML (Webインターフェース構造)
- 音楽・オーディオ: Rust WASM (高速なDSP処理、オシレーター・Biquadフィルター実装), Tone.js (Web Audio APIの抽象化とクリーンなオーディオ再生), cat-oscilloscope (リアルタイム波形ビジュアライゼーション), WAVフォーマット (オーディオ出力形式)
- 開発ツール: Node.js (JavaScriptランタイム), npm (パッケージマネージャー), wasm-pack (RustからWebAssemblyへのビルドツール), Playwright (E2Eテスト、スクリプトで使用), happy-dom (テスト環境のDOMシミュレーション)
- テスト: Vitest (高速なユニットテストフレームワーク)
- ビルドツール: Vite (本番用バンドル生成), wasm-pack (Rust WASMコンパイラ), TypeScriptコンパイラ (TSからJSへの変換)
- 言語機能: Rust (高性能な信号処理ロジック), TypeScript (アプリケーションロジックと型安全性), JavaScript (ブラウザ実行コード)
- 自動化・CI/CD: GitHub Actions (継続的インテグレーション/デプロイ), GitHub Pages (自動デプロイ先)
- 開発標準: `.gitignore`, `LICENSE`, `README.md` (標準ドキュメント), `DEVELOPMENT.md` (開発ガイドライン)

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
- **index.html**: WebアプリケーションのエントリーポイントとなるHTMLファイル。ユーザーインターフェースの骨格を定義します。
- **src/index.ts**: TypeScriptアプリケーションの主要なエントリーポイント。アプリケーションを初期化し、`synth.ts`モジュールを読み込みます。
- **src/synth.ts**: シンセサイザーのメインロジックを含むファイル。UI操作（マウス、入力変更）、オーディオのレンダリングと再生、設定の読み込みと保存、オシロスコープの表示更新などを管理します。
- **src/wasmAudio.ts**: Rustで実装されたWebAssemblyオーディオモジュールとTypeScriptアプリケーション間のブリッジ。WASMモジュールの動的ロード、およびRustで定義された信号処理関数の呼び出しを担当します。
- **wasm-audio/src/lib.rs**: Rustで実装されたWebAssemblyオーディオモジュールのコアライブラリ。オシレーター生成（ノコギリ波、パルス波）、Biquadローパスフィルターを含む、信号処理パイプラインを提供します。
- **wasm-audio/src/oscillator.rs**: Rustでノコギリ波やパルス波などの基本的な波形を生成するロジックを定義します。
- **wasm-audio/src/filter.rs**: RustでBiquadフィルター（LPF、HPF、BPFなど）の計算ロジックを定義し、オーディオ信号に適用します。
- **src/oscilloscope.ts**: `cat-oscilloscope`ライブラリを統合し、生成されるオーディオ波形をリアルタイムで視覚的に表示する機能を提供します。
- **src/audio-player.ts**: Tone.jsライブラリをラップし、Web Audio APIのオーディオコンテキストの管理、WAV URLの再生、オーディオの開始・停止など、オーディオ再生に関する機能を提供します。
- **src/wav.ts**: 処理済みのオーディオデータ（Float32Array）をWAVファイルフォーマットに変換し、ブラウザで再生またはダウンロード可能なBlob URLを生成するユーティリティ機能を提供します。
- **src/settings.ts**: アプリケーションの設定（波形タイプ、フィルターパラメータ、BPMなど）を管理します。localStorageへの設定の永続化、JSONファイルとしてのインポート/エクスポート機能が含まれます。
- **src/ui-params.ts**: ユーザーインターフェース要素（スライダー、テキスト入力）からのパラメータ読み取り、マウス位置からフィルターパラメータへのマッピング、UI表示の更新などを処理します。
- **src/performance-stats.ts**: オーディオ生成にかかる時間を計測し、ミリ秒単位でのパフォーマンス統計を計算・表示する機能を提供し、処理速度の監視を可能にします。
- **src/timing.ts**: BPM（Beats Per Minute）とビート数に基づいてオーディオ生成の総デュレーション（ミリ秒）を計算するなど、オーディオ生成タイミングに関するユーティリティ関数を提供します。
- **scripts/**: プロジェクトの開発・デプロイ・テストを支援するための各種シェルスクリプトやJavaScriptスクリプトが格納されています。
- **docs/**: プロジェクトに関する詳細なドキュメント群。オシロスコープの使用方法、WASMセットアップ、デプロイ検証などが含まれます。
- **DEVELOPMENT.md**: 開発フレームワークとテスト戦略に関する詳細な情報を提供するドキュメントです。
- **package.json**: プロジェクトのメタデータ、スクリプト、および依存関係（開発・本番両方）を定義するファイルです。
- **vite.config.ts**: Viteビルドツールの設定ファイルで、プロジェクトのビルドプロセスを構成します。

## 関数詳細説明
- **initWasm(wasmUrl: string)** (src/wasmAudio.ts): WebAssemblyモジュールを初期化し、Rustで実装された信号処理機能を使えるようにします。引数`wasmUrl`はWASMファイルのパス。戻り値はPromise<void>。
- **renderAudioWasm(buffer: Float32Array, current_sample_idx: number, params: object)** (src/wasmAudio.ts): WASMモジュールを介して指定されたパラメータに基づきオーディオデータを生成し、提供された`Float32Array`バッファに書き込みます。`buffer`は出力バッファ、`current_sample_idx`は現在のサンプル位置、`params`は波形やフィルターの設定を含むオブジェクト。
- **generateWav(audioBuffer: Float32Array, sampleRate: number, numChannels: number)** (src/wav.ts): オーディオデータ（`Float32Array`）、サンプリングレート、チャンネル数を受け取り、WAVフォーマットの`ArrayBuffer`を生成します。戻り値は`ArrayBuffer`。
- **createWavBlobUrl(wavBuffer: ArrayBuffer)** (src/wav.ts): `generateWav`で生成されたWAV `ArrayBuffer`から、ブラウザで再生またはダウンロード可能なBlob URLを作成します。戻り値は`string`（Blob URL）。
- **loadTone()** (src/audio-player.ts): Tone.jsライブラリを非同期でロードし、Web Audio APIのオーディオコンテキストを準備します。戻り値はPromise<void>。
- **startAudioContext()** (src/audio-player.ts): Web Audio APIのオーディオコンテキストを開始または再開します。ユーザーインタラクション後に呼び出されることが多いです。
- **playWavUrl(url: string)** (src/audio-player.ts): 指定されたWAVファイルのURLをTone.jsで再生します。引数`url`はWAVファイルのURL。
- **init(parentEl: HTMLElement)** (src/synth.ts): シンセサイザーアプリケーションを初期化します。UI要素の設定、イベントリスナーの登録、WASMモジュールの初期化などを行います。引数`parentEl`はアプリケーションをマウントするHTML要素。
- **renderAudio(params: object)** (src/synth.ts): 現在の設定に基づいてオーディオデータをレンダリングし、そのデータを再生またはWAVにエクスポートします。内部で`renderAudioWasm`を呼び出します。引数`params`はレンダリングに必要な設定オブジェクト。
- **playAudio(audioBuffer: Float32Array)** (src/synth.ts): 生成されたオーディオバッファ（`Float32Array`）を再生します。引数`audioBuffer`は再生するオーディオデータ。
- **handleInputChange(event: Event)** (src/synth.ts): UI上の入力要素（スライダー、テキストボックスなど）の変更イベントを処理し、シンセサイザーのパラメータを更新します。引数`event`は変更イベントオブジェクト。
- **handleClick(event: MouseEvent)** (src/synth.ts): UI上のクリックイベントを処理し、特にオーディオコンテキストの開始や、特定のアクションをトリガーします。引数`event`はマウスイベントオブジェクト。
- **initOscilloscope(canvas: HTMLCanvasElement)** (src/oscilloscope.ts): `cat-oscilloscope`を初期化し、波形表示用のキャンバスを設定します。引数`canvas`はオシロスコープ表示用のHTMLCanvasElement。
- **updateOscilloscope(data: Float32Array)** (src/oscilloscope.ts): 提供されたオーディオデータ`data`を使用してオシロスコープの表示をリアルタイムで更新します。引数`data`はオーディオデータ。
- **loadSettings()** (src/settings.ts): localStorageからアプリケーションの設定を読み込み、適用します。戻り値は設定オブジェクト。
- **saveSettings()** (src/settings.ts): 現在のアプリケーション設定をlocalStorageに保存します。
- **exportSettingsToFile()** (src/settings.ts): 現在の設定をJSONファイルとして生成し、ユーザーにダウンロードを促します。
- **importSettingsFromFile(file: File)** (src/settings.ts): ユーザーが選択したJSONファイルから設定を読み込み、アプリケーションに適用します。引数`file`はインポートするファイルオブジェクト。
- **readParametersFromUI()** (src/ui-params.ts): UI要素から現在の設定パラメータを読み取り、オブジェクトとして返します。戻り値は設定オブジェクト。
- **mapMouseToFilterParams(x: number, y: number)** (src/ui-params.ts): マウスのX/Y座標をフィルターのカットオフ周波数とQ値にマッピングします。引数`x`,`y`はマウスの座標。戻り値はフィルターパラメータのオブジェクト。
- **createPerformanceStats()** (src/performance-stats.ts): パフォーマンス測定用の統計オブジェクトを初期化します。
- **addPerformanceSample(timeMs: number)** (src/performance-stats.ts): 処理時間`timeMs`をパフォーマンス統計に追加します。引数`timeMs`は測定された処理時間。
- **calculateDuration(bpm: number, beats: number)** (src/timing.ts): BPMとビート数に基づいてオーディオ生成の総デュレーション（ミリ秒）を計算します。引数`bpm`はBPM値、`beats`はビート数。戻り値はデュレーション（ミリ秒）。

## 関数呼び出し階層ツリー
```
- src/index.ts (アプリケーションのエントリーポイント)
  - src/synth.ts::init() (シンセサイザーの初期化)
    - src/wasmAudio.ts::initWasm() (WebAssemblyモジュールの初期化)
    - src/audio-player.ts::loadTone() (Tone.jsのロードとオーディオコンテキスト準備)
    - src/oscilloscope.ts::initOscilloscope() (オシロスコープの初期化)
    - src/settings.ts::loadSettings() (アプリケーション設定のロード)
    - src/performance-stats.ts::createPerformanceStats() (パフォーマンス統計の初期化)
    - src/playback-mode.ts::getCurrentMode() (現在の再生モードの取得)
    - src/ui-params.ts::readParametersFromUI() (UIからの初期パラメータ読み込み)
    - src/synth.ts::scheduleNextPlay() (次のオーディオ再生のスケジュール設定)

- src/synth.ts::renderAudio() (オーディオデータのレンダリングと処理)
  - src/wasmAudio.ts::renderAudioWasm() (Rust WASMによるオーディオデータ生成)
    - wasm-audio/src/lib.rs::render_audio() (Rust側のコア信号処理関数)
  - src/performance-stats.ts::addPerformanceSample() (パフォーマンスサンプルの追加)
  - src/performance-stats.ts::calculatePerformanceStats() (パフォーマンス統計の計算)
  - src/wav.ts::generateWav() (WAVデータ生成)
  - src/wav.ts::createWavBlobUrl() (WAV Blob URL生成)
  - src/oscilloscope.ts::updateOscilloscope() (オシロスコープの波形更新)
  - src/timing.ts::calculateDuration() (オーディオデュレーション計算)

- src/synth.ts::playAudio(audioBuffer: Float32Array) (生成されたオーディオの再生)
  - src/audio-player.ts::playWavUrl() (WAV URLをTone.jsで再生)

- src/synth.ts::handleInputChange(event: Event) (UI入力変更時の処理)
  - src/ui-params.ts::readParametersFromUI() (UIからのパラメータ読み込み)
  - src/settings.ts::saveSettings() (設定の保存)
  - src/synth.ts::renderAudio() (オーディオの再レンダリング)

- src/synth.ts::handleClick(event: MouseEvent) (UIクリック時の処理)
  - src/audio-player.ts::startAudioContext() (Web Audioコンテキストの開始)
  - src/synth.ts::scheduleNextPlay() (次のオーディオ再生のスケジュール設定)
  - src/synth.ts::renderAudio() (オーディオのレンダリング)

- src/ui-params.ts::mapMouseToFilterParams(x: number, y: number) (マウス座標からフィルターパラメータへのマッピング)
  - src/ui-params.ts::readNumericParameter() (UIから数値パラメータを読み込むヘルパー)

- src/settings.ts::exportSettingsToFile() (設定のエクスポート)
  - (内部で設定オブジェクトをJSONとして生成しダウンロード)

- src/settings.ts::importSettingsFromFile(file: File) (設定のインポート)
  - src/settings.ts::validateSettings() (インポートした設定の検証)

- src/playback-mode.ts::switchMode() (再生モードの切り替え)
  - src/playback-mode.ts::updateModeUI() (UIの再生モード表示更新)

---
Generated at: 2026-02-02 07:04:02 JST
