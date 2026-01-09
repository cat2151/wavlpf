Last updated: 2026-01-10

# Project Overview

## プロジェクト概要
- Rust WASMを活用し、ウェブブラウザ上で動作する高性能なローパスフィルター（LPF）付きソフトウェアシンセサイザー。
- ノコギリ波やパルス波の波形生成、Biquad LPFによるインタラクティブな音色変化、およびWAVファイル出力機能を提供。
- WebAudio APIに依存しない信号処理コアとTone.jsによるクリーンなオーディオ再生を特徴とし、設定の永続化も可能。

## 技術スタック
- フロントエンド: Vite (高速な開発サーバーと本番ビルドツール), TypeScript (型安全なアプリケーションロジック), HTML (ユーザーインターフェースの骨格)
- 音楽・オーディオ: Tone.js (Web Audio API上に構築された高レベルなオーディオ再生ライブラリ), Rust WASM (CPU負荷の高い信号処理を高速に実行するコア)
- 開発ツール: Node.js (JavaScriptランタイム), npm (パッケージ管理), wasm-pack (RustコードをWASMにビルドするツール), happy-dom (VitestでのDOMテスト環境)
- テスト: Vitest (高速なユニットテストフレームワーク), @vitest/ui (ビジュアルテストランナー)
- ビルドツール: Vite (TypeScriptおよびその他のアセットのバンドル), wasm-pack (RustソースコードからWASMモジュールへのコンパイル)
- 言語機能: Rust (高性能なオーディオ信号処理ロジック), TypeScript (フロントエンドのアプリケーションロジック)
- 自動化・CI/CD: GitHub Actions (継続的インテグレーション/デリバリーのワークフロー), GitHub Pages (ビルドされたアプリケーションのホスティング)
- 開発標準: TypeScriptの型システムによるコード品質の向上、RustのCargoによる依存関係管理とプロジェクト構造の標準化。

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
📊 package-lock.json
📊 package.json
📁 src/
  📘 audio-player.ts
  📘 index.ts
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
- **.gitignore**: Gitが追跡しないファイルやディレクトリを指定します。
- **ARCHITECTURE_DIAGRAMS.md**: プロジェクトのアーキテクチャに関する図と説明が記述されています。
- **CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md**: CATオシロスコープ機能の統合に関する実現可能性分析のドキュメントです。
- **CAT_OSCILLOSCOPE_INTEGRATION.md**: CATオシロスコープ機能の統合における最小限の変更アプローチを説明する参考資料です。
- **CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md**: CATオシロスコープライブラリ統合のベストプラクティスを包括的に分析したドキュメントです。
- **DEVELOPMENT.md**: 開発フレームワークとテスト戦略の詳細について記述されています。
- **IMPLEMENTATION_EXAMPLES.md**: 具体的な実装例が示されているドキュメントです。
- **INTEGRATION_BLOCKERS_SUMMARY.md**: 統合における障壁に関する要約が記述されています。
- **ISSUE_39_SUMMARY.md**: 特定の課題（Issue #39）に関する要約が記述されています。
- **LICENSE**: プロジェクトのライセンス情報（MITライセンス）を定義します。
- **MODULE_DEPENDENCIES.md**: プロジェクト内のモジュール間の依存関係について説明されています。
- **PERFORMANCE_DISPLAY_DEMO.md**: パフォーマンス表示機能のデモに関するドキュメントです。
- **PERFORMANCE_TIMING_ANALYSIS.md**: パフォーマンスのタイミング分析に関する詳細が記述されています。
- **README.ja.md**: プロジェクトの日本語版の概要説明です。
- **README.md**: プロジェクトの主要な概要説明（英語版）です。
- **README_ANALYSIS.md**: READMEファイルの分析に関するドキュメントです。
- **REFACTORING_SUMMARY.md**: リファクタリングに関する要約が記述されています。
- **SUMMARY.md**: プロジェクト全体の簡潔な要約です。
- **_config.yml**: GitHub Pages（Jekyll）の設定ファイルです。
- **generated-docs/**: 自動生成されたドキュメントが格納されるディレクトリです。
- **index.html**: ウェブアプリケーションのメインエントリーポイントとなるHTMLファイルで、ユーザーインターフェースを定義します。
- **issue-notes/**: 開発中の特定の課題に関するメモや調査結果が、Issue番号ごとに格納されているディレクトリです。
- **package-lock.json**: npmパッケージの正確な依存関係ツリーとバージョンを記録し、再現可能なビルドを保証します。
- **package.json**: プロジェクトのメタデータ（名前、バージョンなど）と、開発・実行に必要なnpmパッケージの依存関係を定義します。
- **src/audio-player.ts**: Tone.jsライブラリを統合し、オーディオコンテキストの管理、WAV URLの再生、オーディオ再生の停止とクリーンアップを行います。
- **src/index.ts**: アプリケーションのメインエントリーポイントであり、シンセサイザーの初期化処理を呼び出します。
- **src/performance-stats.test.ts**: `src/performance-stats.ts`モジュールの機能が正しく動作するかを検証するためのテストファイルです。
- **src/performance-stats.ts**: オーディオ生成などのパフォーマンスデータを収集、記録し、統計情報を計算して表示するロジックを提供します。
- **src/playback-mode.ts**: アプリケーションのオーディオ再生モード（例：リアルタイム、シーケンス）を管理し、それに応じてUIを更新する機能を提供します。
- **src/settings.test.ts**: `src/settings.ts`モジュールのテストファイルです。
- **src/settings.ts**: アプリケーションの各種設定（波形タイプ、BPMなど）の検証、ローカルストレージへの保存・読み込み、JSONファイルへのインポート・エクスポートを処理します。
- **src/synth.ts**: シンセサイザーの主要なロジックを担い、UIからのパラメータ読み込み、オーディオレンダリングのトリガー、再生のスケジューリング、ステータス表示の更新、イベントハンドリングを行います。
- **src/timing.test.ts**: `src/timing.ts`モジュールのテストファイルです。
- **src/timing.ts**: BPMとビート数に基づいてオーディオの持続時間を計算するなどのタイミング関連のユーティリティを提供します。
- **src/ui-params.test.ts**: `src/ui-params.ts`モジュールのテストファイルです。
- **src/ui-params.ts**: ユーザーインターフェース要素からシンセサイザーのパラメータを読み取り、マウスの動きをフィルターのカットオフ周波数とQ値にマッピングし、UI表示を更新するロジックを扱います。
- **src/wasmAudio.ts**: Rustで実装されたWASMオーディオモジュールをTypeScriptアプリケーションにロードし、オーディオレンダリングのためのインターフェースを提供します。
- **src/wav.test.ts**: `src/wav.ts`モジュールのテストファイルです。
- **src/wav.ts**: 生のオーディオデータ（Float32Array）を受け取り、WAVファイルフォーマットに変換してBlob URLを生成する機能を提供します。
- **tsconfig.json**: TypeScriptコンパイラの設定を定義し、プロジェクトの型チェックルールやコンパイルオプションを指定します。
- **vite.config.ts**: Viteビルドツールの設定ファイルで、開発サーバーの構成やビルド時の挙動をカスタマイズします。
- **wasm-audio/Cargo.toml**: Rust WASMモジュールの依存関係、メタデータ、ビルド設定を管理するCargo設定ファイルです。
- **wasm-audio/README.md**: Rust WASMモジュールに関する独立した説明ドキュメントです。
- **wasm-audio/src/audio_renderer.rs**: Rustでオーディオ信号のレンダリングプロセスを実装するモジュールです。
- **wasm-audio/src/filter.rs**: RustでBiquadローパスフィルター（LPF）のアルゴリズムと関連ロジックを実装するモジュールです。
- **wasm-audio/src/lib.rs**: Rust WASMモジュールのルートファイルであり、オーディオ信号処理パイプライン全体を定義し、JavaScriptから呼び出される主要な関数を公開します。
- **wasm-audio/src/oscillator.rs**: Rustでノコギリ波やパルス波などの波形を生成するオシレーターのロジックを実装するモジュールです。

## 関数詳細説明
- **loadTone()** (src/audio-player.ts): Tone.jsライブラリを非同期でロードし、初期化します。オーディオ再生の準備を行います。
    - 引数: なし
    - 戻り値: Promise<void>
- **isToneLoaded()** (src/audio-player.ts): Tone.jsがロード済みであるかを確認します。
    - 引数: なし
    - 戻り値: boolean
- **startAudioContext()** (src/audio-player.ts): Web Audio Contextを開始します。ユーザーのインタラクション後に呼び出すことで、オーディオ再生を可能にします。
    - 引数: なし
    - 戻り値: void
- **isAudioContextRunning()** (src/audio-player.ts): Web Audio Contextが現在実行中であるかを確認します。
    - 引数: なし
    - 戻り値: boolean
- **playWavUrl(url: string)** (src/audio-player.ts): 指定されたWAVファイルのURLをTone.jsを使用して再生します。
    - 引数: `url` (string) - 再生するWAVファイルのURL。
    - 戻り値: Promise<void>
- **stopAndCleanup()** (src/audio-player.ts): 現在再生中のオーディオを停止し、関連するオーディオリソースをクリーンアップします。
    - 引数: なし
    - 戻り値: Promise<void>
- **if(...)** (複数ファイル): 条件分岐を評価し、その結果に基づいてコードブロックを実行します。具体的な機能はコード内のコンテキストに依存します。
    - 引数: 条件式
    - 戻り値: なし (ブロック内の処理実行)
- **catch(error)** (src/audio-player.ts, src/settings.ts, src/wasmAudio.ts): Promiseチェーンで発生したエラーを捕捉し、エラーハンドリングロジックを実行します。
    - 引数: `error` (any) - 捕捉されたエラーオブジェクト。
    - 戻り値: void
- **createPerformanceStats()** (src/performance-stats.ts): パフォーマンス統計を記録するための新しいオブジェクトを初期化して返します。
    - 引数: なし
    - 戻り値: `PerformanceStats`オブジェクト
- **addPerformanceSample(stats, sample)** (src/performance-stats.ts): 指定されたパフォーマンス統計オブジェクトに新しいサンプル値を追加します。
    - 引数: `stats` (`PerformanceStats`), `sample` (number)
    - 戻り値: void
- **calculatePerformanceStats(stats)** (src/performance-stats.ts): 記録されたサンプルに基づいて、平均、最大、最小などのパフォーマンス統計を計算します。
    - 引数: `stats` (`PerformanceStats`)
    - 戻り値: `CalculatedStats`オブジェクト
- **resetPerformanceStats(stats)** (src/performance-stats.ts): 指定されたパフォーマンス統計オブジェクトの記録をリセットします。
    - 引数: `stats` (`PerformanceStats`)
    - 戻り値: void
- **getCurrentMode()** (src/playback-mode.ts): 現在のオーディオ再生モード（例：シーケンス、リアルタイム）を取得します。
    - 引数: なし
    - 戻り値: `PlaybackMode` (enumなど)
- **updateModeUI(mode)** (src/playback-mode.ts): 現在の再生モードに合わせてユーザーインターフェースを更新します。
    - 引数: `mode` (`PlaybackMode`)
    - 戻り値: void
- **switchMode(newMode)** (src/playback-mode.ts): オーディオ再生モードを新しいモードに切り替えます。
    - 引数: `newMode` (`PlaybackMode`)
    - 戻り値: void
- **validateSettings(settings)** (src/settings.ts): 渡された設定オブジェクトが有効であるかを検証し、必要に応じてデフォルト値を適用します。
    - 引数: `settings` (any)
    - 戻り値: `ValidatedSettings`オブジェクト
- **loadSettings()** (src/settings.ts): ローカルストレージからアプリケーション設定をロードします。
    - 引数: なし
    - 戻り値: `Settings`オブジェクト
- **saveSettings(settings)** (src/settings.ts): 現在のアプリケーション設定をローカルストレージに保存します。
    - 引数: `settings` (`Settings`)
    - 戻り値: void
- **exportSettingsToFile(settings)** (src/settings.ts): 現在の設定をJSONファイルとしてエクスポートし、ユーザーにダウンロードを促します。
    - 引数: `settings` (`Settings`)
    - 戻り値: void
- **importSettingsFromFile()** (src/settings.ts): ユーザーが選択したJSONファイルから設定をインポートし、適用します。
    - 引数: なし (ファイル選択ダイアログを使用)
    - 戻り値: Promise<`Settings`オブジェクト>
- **getCurrentSettings()** (src/synth.ts): シンセサイザーの現在のパラメータ設定をUIから読み取り、返します。
    - 引数: なし
    - 戻り値: `Settings`オブジェクト
- **readParameters()** (src/synth.ts): ユーザーインターフェースからシンセサイザーの全ての操作パラメータを読み込みます。
    - 引数: なし
    - 戻り値: `SynthParameters`オブジェクト
- **renderAudio(params)** (src/synth.ts): 指定されたパラメータに基づいてオーディオ信号をRust WASMモジュールを介してレンダリングします。
    - 引数: `params` (`SynthParameters`)
    - 戻り値: `AudioBuffer` (WASMから返されるデータ形式)
- **playAudioWav(audioData)** (src/synth.ts): 生成されたオーディオデータをWAV形式に変換し、再生します。
    - 引数: `audioData` (`AudioBuffer`)
    - 戻り値: Promise<void>
- **playAudioSeq()** (src/synth.ts): BPMとビートに基づいてオーディオシーケンスの再生をスケジュールし、連続的な再生を実現します。
    - 引数: なし
    - 戻り値: void
- **playAudio()** (src/synth.ts): 現在の再生モード（単発またはシーケンス）に応じてオーディオ再生を開始します。
    - 引数: なし
    - 戻り値: void
- **handleModeSwitch()** (src/synth.ts): 再生モードが切り替わった際のUI更新や内部状態の調整を行います。
    - 引数: なし
    - 戻り値: void
- **init()** (src/synth.ts): シンセサイザーアプリケーション全体の初期化処理を行い、イベントリスナーの設定や初期UIの描画などを実行します。
    - 引数: なし
    - 戻り値: void
- **scheduleNextPlay(delay)** (src/synth.ts): 指定された遅延時間後に次のオーディオ再生サイクルをスケジュールします。
    - 引数: `delay` (number) - ミリ秒単位の遅延時間。
    - 戻り値: void
- **updateStatusDisplay(message)** (src/synth.ts): アプリケーションのステータス情報（例：ロード中、再生中）をUIに表示します。
    - 引数: `message` (string)
    - 戻り値: void
- **updateGenerationTimeDisplay(time)** (src/synth.ts): オーディオ生成にかかった時間（ミリ秒）をUIに表示します。
    - 引数: `time` (number)
    - 戻り値: void
- **dispose()** (src/synth.ts): シンセサイザーのインスタンスが破棄される際に、イベントリスナーの解除などのクリーンアップを行います。
    - 引数: なし
    - 戻り値: void
- **handleInputChange(event)** (src/synth.ts): UIの入力フィールドが変更されたときに発生するイベントを処理し、シンセサイザーのパラメータを更新します。
    - 引数: `event` (Event)
    - 戻り値: void
- **handleClick(event)** (src/synth.ts): UI上のクリックイベントを処理し、オーディオコンテキストの開始やその他のインタラクションに応答します。
    - 引数: `event` (MouseEvent)
    - 戻り値: void
- **calculateDuration(bpm, beats)** (src/timing.ts): BPM（Beats Per Minute）とビート数に基づいて、オーディオの総持続時間（ミリ秒）を計算します。
    - 引数: `bpm` (number), `beats` (number)
    - 戻り値: number
- **readNumericParameter(id, defaultValue)** (src/ui-params.ts): 指定されたHTML要素IDを持つUI入力から数値パラメータを読み取り、無効な場合はデフォルト値を返します。
    - 引数: `id` (string), `defaultValue` (number)
    - 戻り値: number
- **readParametersFromUI()** (src/ui-params.ts): 複数のUI入力要素からシンセサイザーの全てのパラメータを読み込み、オブジェクトとして返します。
    - 引数: なし
    - 戻り値: `SynthParameters`オブジェクト
- **updateUIFields(settings)** (src/ui-params.ts): 指定された設定オブジェクトに基づいて、UI上の入力フィールドの値を更新します。
    - 引数: `settings` (`Settings`)
    - 戻り値: void
- **mapMouseToFilterParams(mouseX, mouseY, element)** (src/ui-params.ts): マウスのX座標とY座標を、フィルターのカットオフ周波数とQ値にマッピングします。
    - 引数: `mouseX` (number), `mouseY` (number), `element` (HTMLElement)
    - 戻り値: `{ cutoff: number, q: number }`
- **updateMousePositionDisplay(x, y, cutoff, q)** (src/ui-params.ts): マウスの位置と現在のフィルターパラメータ（カットオフ周波数、Q値）をUI上に表示してフィードバックを提供します。
    - 引数: `x` (number), `y` (number), `cutoff` (number), `q` (number)
    - 戻り値: void
- **initWasm()** (src/wasmAudio.ts): RustでコンパイルされたWASMモジュールを非同期でロードし、初期化します。
    - 引数: なし
    - 戻り値: Promise<void>
- **isWasmInitialized()** (src/wasmAudio.ts): WASMモジュールが既に初期化されているかを確認します。
    - 引数: なし
    - 戻り値: boolean
- **renderAudioWasm(sampleRate, ...params)** (src/wasmAudio.ts): Rust WASMモジュール内のオーディオレンダリング関数を呼び出し、指定されたパラメータに基づいてオーディオデータを生成します。
    - 引数: `sampleRate` (number), その他複数のシンセサイザーパラメータ
    - 戻り値: Float32Array (生成された生のオーディオデータ)
- **generateWav(audioData, sampleRate)** (src/wav.ts): 生のオーディオデータ（Float32Array）とサンプルレートから、WAVファイルフォーマットのBlobデータを生成します。
    - 引数: `audioData` (Float32Array), `sampleRate` (number)
    - 戻り値: Blob (WAV形式のデータ)
- **writeString(view, offset, s)** (src/wav.ts): DataViewオブジェクトの指定されたオフセット位置に文字列を書き込む補助関数です。主にWAVヘッダーの構築に使用されます。
    - 引数: `view` (DataView), `offset` (number), `s` (string)
    - 戻り値: void
- **createWavBlobUrl(audioData, sampleRate)** (src/wav.ts): 生成されたWAV Blobから、ブラウザで再生可能なオブジェクトURLを作成します。
    - 引数: `audioData` (Float32Array), `sampleRate` (number)
    - 戻り値: string (Blob URL)
- **for(...)** (src/wav.ts): ループ処理を実行し、特定のコードブロックを繰り返し実行します。具体的な機能はコード内のコンテキストに依存します。
    - 引数: ループ条件、カウンタなど
    - 戻り値: なし (ブロック内の処理実行)

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
      - initWasm ()
      - isWasmInitialized ()
      - renderAudioWasm ()
    - createPerformanceStats (src/performance-stats.ts)
      - addPerformanceSample ()
      - calculatePerformanceStats ()
      - resetPerformanceStats ()
    - getCurrentMode (src/playback-mode.ts)
      - updateModeUI ()
      - switchMode ()
    - getCurrentSettings (src/synth.ts)
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
      - generateWav ()
      - createWavBlobUrl ()
  - readNumericParameter (src/ui-params.ts)
  - writeString ()
- handleInputChange (src/synth.ts)
- handleClick (src/synth.ts)
- for (src/wav.ts)

---
Generated at: 2026-01-10 07:04:14 JST
