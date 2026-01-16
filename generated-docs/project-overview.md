Last updated: 2026-01-17

# Project Overview

## プロジェクト概要
- Rust WASMで実装された、高性能なローパスフィルター付きシンプルソフトウェアシンセサイザーです。
- 220Hzの波形ジェネレーターとマウスで制御可能なBiquad LPFフィルターを搭載しています。
- WebAudio非依存の信号処理、WAV生成、設定の永続化機能を備え、Webブラウザ上で動作します。

## 技術スタック
- フロントエンド: 
  - **HTML**: ウェブインターフェースのエントリーポイントを構築します。
  - **TypeScript**: アプリケーションの主要なロジックを静的型付けで記述し、コードの品質と保守性を高めます。
  - **Tone.js**: クリーンなオーディオ再生機能を提供し、WebAudio APIを抽象化して扱いやすくします。
  - **cat-oscilloscope**: 信号処理された波形をリアルタイムで可視化するためのオシロスコープライブラリです。
- 音楽・オーディオ: 
  - **Rust WASM**: 高速なデジタル信号処理（DSP）をWebブラウザ上で実現するための基盤技術です。オシレーター生成（ノコギリ波、パルス波）とBiquad LPFフィルターの実装に使用されます。
  - **Tone.js**: オーディオの再生とWebAudio APIの管理を担い、シンセサイザーの出力をブラウザで聴くことを可能にします。
- 開発ツール: 
  - **Node.js**: JavaScriptランタイム環境で、開発スクリプトやパッケージ管理に使用されます。
  - **npm**: JavaScript/TypeScriptプロジェクトの依存関係管理とスクリプト実行を担うパッケージマネージャーです。
  - **Rust**: WASMモジュールを開発するためのシステムプログラミング言語です。
  - **wasm-pack**: Rustで書かれたコードをWebAssemblyにコンパイルし、JavaScriptから利用可能なバインディングを生成するツールです。
  - **Vite**: 高速な開発サーバーとホットモジュールリプレースメント（HMR）を提供し、開発体験を向上させます。
  - **TypeScript**: JavaScriptに静的型チェック機能を追加し、大規模なアプリケーション開発を支援します。
  - **@types/node**: Node.jsの型定義ファイルで、TypeScriptプロジェクト内でNode.js APIを使用する際に型安全性を提供します。
- テスト: 
  - **Vitest**: 高速なユニットテストフレームワークで、コードの品質と信頼性を確保するために使用されます。ウォッチモード、UIランナー、カバレッジレポート生成機能を提供します。
  - **happy-dom**: テスト環境で軽量なDOMエミュレーションを提供し、ブラウザ環境に依存しないテスト実行を可能にします。
  - **@vitest/ui**: Vitestのテスト結果を視覚的に確認できるユーザーインターフェースです。
- ビルドツール: 
  - **Vite**: 本番環境向けのアプリケーションバンドルを生成し、最適化されたデプロイ可能な成果物を作成します。
  - **wasm-pack**: Rust WASMモジュールをビルドし、Web環境で実行可能な形式に変換します。
  - **wasm-opt**: Binaryenツールチェーンの一部として、WASMバイナリをさらに最適化し、ファイルサイズと実行速度を改善します。
- 言語機能: 
  - **Rust**: 高性能なDSP処理とメモリ安全性を実現するためにWASMモジュールで採用されています。
  - **TypeScript**: アプリケーションのフロントエンドロジックとWASMバインディングの型安全なラッパーに利用されています。
- 自動化・CI/CD: 
  - **GitHub Pages**: `main`ブランチへのプッシュ時にアプリケーションを自動的にビルドし、ウェブサイトとしてデプロイする継続的デプロイメント環境です。
- 開発標準: 
  - （情報が提供されていないため、特定の開発標準ツールや技術は記載しません。）

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
  📖 74.md
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
- **index.html**: このWebアプリケーションのユーザーインターフェースを定義するメインのHTMLファイルです。
- **src/audio-player.ts**: Tone.jsライブラリを利用し、オーディオコンテキストの管理、WAVファイルURLの再生、オーディオ再生のリソース解放など、オーディオ再生関連の機能を提供します。
- **src/index.ts**: アプリケーションのエントリーポイントであり、主にシンセサイザーのメインロジックを初期化する役割を担います。
- **src/oscilloscope.test.ts**: `src/oscilloscope.ts`モジュールに実装されたオシロスコープ機能の単体テストコードです。
- **src/oscilloscope.ts**: `cat-oscilloscope`ライブラリを統合し、生成されるオーディオ波形を視覚的に表示するためのロジックを管理します。
- **src/performance-stats.test.ts**: `src/performance-stats.ts`モジュールに実装されたパフォーマンス統計機能の単体テストコードです。
- **src/performance-stats.ts**: オーディオ生成にかかる時間などのパフォーマンスデータを収集し、計算して表示するユーティリティ機能を提供します。
- **src/playback-mode.ts**: アプリケーションの現在の再生モード（例: リアルタイム、非リアルタイム）を管理し、それに応じてUIを更新するロジックを実装します。
- **src/settings.test.ts**: `src/settings.ts`モジュールに実装された設定の永続化機能の単体テストコードです。
- **src/settings.ts**: アプリケーションの設定をlocalStorageに保存したり、JSONファイルとしてインポート/エクスポートしたりする機能、および設定値の検証機能を提供します。
- **src/synth.ts**: シンセサイザーアプリケーションの中核をなすモジュールです。マウス操作によるフィルター制御、オーディオレンダリング、再生モードのハンドリング、UIの更新など、主要な機能が集約されています。
- **src/timing.test.ts**: `src/timing.ts`モジュールに実装された時間計算機能の単体テストコードです。
- **src/timing.ts**: BPMやビート数に基づいてオーディオの持続時間などのタイミング関連の計算を行うユーティリティ関数を提供します。
- **src/ui-params.test.ts**: `src/ui-params.ts`モジュールに実装されたUIパラメータ処理機能の単体テストコードです。
- **src/ui-params.ts**: ユーザーインターフェース（UI）要素からの入力パラメータの読み取り、UIフィールドの更新、マウス座標をフィルターパラメータにマッピングするロジックを管理します。
- **src/wasmAudio.ts**: Rustで実装されたWebAssemblyオーディオモジュールとJavaScriptアプリケーション間のインターフェースを提供するTypeScriptラッパーです。WASMモジュールの動的ロード、初期化、オーディオレンダリング呼び出しを扱います。
- **src/wav.test.ts**: `src/wav.ts`モジュールに実装されたWAVファイル生成機能の単体テストコードです。
- **src/wav.ts**: 生成されたオーディオデータを標準的なWAVファイルフォーマットに変換し、ブラウザで再生可能なBlob URLを作成する機能を提供します。
- **vite.config.ts**: Viteビルドツール用の設定ファイルです。開発サーバーの挙動、本番ビルドの構成、TypeScriptのコンパイルオプションなどが定義されています。
- **wasm-audio/Cargo.toml**: Rustプロジェクトのビルド設定ファイルで、依存クレート、メタデータ、WASMビルドに関するオプションが記述されています。
- **wasm-audio/README.md**: Rust WASMオーディオモジュールに関するドキュメントです。
- **wasm-audio/src/audio_renderer.rs**: Rust WASMモジュール内でオーディオフレームを効率的にレンダリングするためのロジックを実装します。
- **wasm-audio/src/filter.rs**: Rust WASMモジュール内でBiquadローパスフィルターのアルゴリズムを実装し、オーディオ信号に適用します。
- **wasm-audio/src/lib.rs**: Rust WASMモジュールのエントリーポイントであり、JavaScriptから呼び出される公開関数（オシレーター生成、フィルター処理、オーディオレンダリングなど）を定義します。
- **wasm-audio/src/oscillator.rs**: Rust WASMモジュール内でノコギリ波やパルス波などの波形を生成するオシレーターのロジックを実装します。

## 関数詳細説明
- **src/audio-player.ts**
  - `loadTone()`: Tone.jsライブラリをロードし、オーディオエンジンを初期化します。
  - `isToneLoaded()`: Tone.jsがロードされ、利用可能かどうかをブール値で返します。
  - `startAudioContext()`: WebAudio APIのオーディオコンテキストを開始または再開します。
  - `isAudioContextRunning()`: オーディオコンテキストが現在実行中かどうかをブール値で返します。
  - `playWavUrl(url: string)`: 指定されたWAVファイルのURLをTone.jsを使用して再生します。
  - `stopAndCleanup()`: 現在再生中のオーディオを停止し、関連するオーディオリソースを解放します。
  - `if`: 条件分岐を処理します。
  - `catch`: エラーを捕捉し、処理します。
- **src/index.ts**
  - `if`: 条件分岐を処理します。
- **src/oscilloscope.test.ts**
  - `canvasSupported()`: 実行環境がHTML Canvas要素をサポートしているかを検証します。
  - `if`: 条件分岐を処理します。
  - `for`: ループ処理を実行します。
- **src/oscilloscope.ts**
  - `initOscilloscope(canvas: HTMLCanvasElement)`: 指定されたCanvas要素を使用してオシロスコープを初期化します。
  - `cleanupDummyCanvases()`: テストやデバッグで使用される一時的なCanvas要素をクリーンアップします。
  - `validateInputs()`: オシロスコープ機能への入力パラメータが有効であるかを検証します。
  - `updateOscilloscope(audioBuffer: Float32Array)`: 提供されたオーディオデータに基づいてオシロスコープの表示を更新します。
  - `stopOscilloscope()`: オシロスコープの描画を停止し、関連するリソースを解放します。
  - `isOscilloscopeInitialized()`: オシロスコープが初期化済みかどうかをブール値で返します。
  - `if`: 条件分岐を処理します。
- **src/performance-stats.ts**
  - `createPerformanceStats()`: パフォーマンス統計を記録するための初期状態を生成します。
  - `addPerformanceSample(timeMs: number)`: 新しいパフォーマンス測定値（ミリ秒単位）を記録に追加します。
  - `calculatePerformanceStats()`: 記録された測定値から平均、最大、最小などのパフォーマンス統計を計算します。
  - `resetPerformanceStats()`: 記録されたすべてのパフォーマンス統計をクリアし、初期状態に戻します。
  - `if`: 条件分岐を処理します。
- **src/playback-mode.ts**
  - `getCurrentMode()`: 現在アクティブな再生モード（例: シーケンシャル、リアルタイム）を文字列で返します。
  - `updateModeUI(mode: string)`: 指定された再生モードに合わせてユーザーインターフェースの表示を更新します。
  - `switchMode(newMode: string)`: アプリケーションの再生モードを指定されたモードに切り替えます。
  - `if`: 条件分岐を処理します。
- **src/settings.ts**
  - `validateSettings(settings: object)`: 提供された設定オブジェクトが有効な構造と値を持っているかを検証します。
  - `loadSettings()`: ブラウザのlocalStorageからアプリケーション設定を読み込みます。
  - `saveSettings(settings: object)`: 現在のアプリケーション設定をブラウザのlocalStorageに保存します。
  - `exportSettingsToFile(settings: object)`: 現在の設定をJSONファイルとしてユーザーにダウンロードさせます。
  - `importSettingsFromFile(file: File)`: ユーザーが選択したJSONファイルから設定を読み込み、適用します。
  - `if`: 条件分岐を処理します。
  - `catch`: エラーを捕捉し、処理します。
- **src/synth.ts**
  - `getCurrentSettings()`: 現在適用されているアプリケーション設定オブジェクトを返します。
  - `displayOscilloscopeError(error: Error)`: オシロスコープ関連のエラーが発生した場合に、そのメッセージを表示します。
  - `readParameters()`: UI要素から現在のユーザー入力パラメータ（波形タイプ、デューティー比など）を読み取ります。
  - `renderAudio(duration: number, settings: object)`: 指定された時間と設定に基づいてオーディオデータをWASMモジュールでレンダリングします。
  - `playAudioWav(audioBuffer: Float32Array)`: 生のオーディオバッファからWAVファイルを生成し、Tone.jsを使用して再生します。
  - `playAudioSeq(audioBuffer: Float32Array)`: オーディオバッファをシーケンシャルに（非リアルタイムモードで）再生します。
  - `playAudio()`: 現在のモード（WAVまたはシーケンシャル）に応じてオーディオ再生を開始します。
  - `handleModeSwitch()`: 再生モードが切り替えられたときに必要な処理（例: UI更新、再生停止）を実行します。
  - `init()`: シンセサイザーアプリケーション全体を初期化し、イベントリスナーを設定します。
  - `scheduleNextPlay()`: 次のオーディオ再生イベントをBPMとビートに基づいてスケジュールします。
  - `updateStatusDisplay(message: string)`: アプリケーションの画面下部などにステータスメッセージを表示します。
  - `updateGenerationTimeDisplay(timeMs: number)`: オーディオ生成にかかった時間をUIに表示します。
  - `dispose()`: シンセサイザーが使用するリソース（イベントリスナー、オーディオコンテキストなど）を解放します。
  - `handleInputChange(event: Event)`: UIの入力要素（スライダー、テキストボックスなど）が変更されたときのイベントを処理します。
  - `handleClick(event: MouseEvent)`: UI上のクリックイベント（特にフィルター制御のためのマウス移動）を処理します。
  - `if`: 条件分岐を処理します。
  - `catch`: エラーを捕捉し、処理します。
- **src/timing.ts**
  - `calculateDuration(bpm: number, beats: number)`: BPMとビート数に基づいてオーディオの全体的な持続時間（ミリ秒）を計算します。
  - `if`: 条件分岐を処理します。
- **src/ui-params.ts**
  - `readNumericParameter(elementId: string)`: 指定されたHTML要素IDから数値パラメータを読み取り、検証します。
  - `readParametersFromUI()`: UI上のすべての入力要素から現在のパラメータ設定を読み取り、オブジェクトとして返します。
  - `updateUIFields(settings: object)`: 提供された設定オブジェクトに基づいて、UI上の入力フィールドの値を更新します。
  - `mapMouseToFilterParams(mouseX: number, mouseY: number)`: マウスのX, Y座標をフィルターのカットオフ周波数とQ値にマッピングします。
  - `updateMousePositionDisplay(x: number, y: number)`: マウスの現在位置をUI上に表示する情報を更新します。
  - `if`: 条件分岐を処理します。
- **src/wasmAudio.ts**
  - `initWasm()`: WebAssemblyモジュールをロードし、JavaScriptから利用できるように初期化します。
  - `isWasmInitialized()`: WASMモジュールが正常に初期化されているかをブール値で返します。
  - `renderAudioWasm(sampleRate: number, bufferSize: number, oscillatorType: string, ...)`: Rust WASMモジュールを呼び出し、指定されたパラメータでオーディオデータをレンダリングさせます。
  - `if`: 条件分岐を処理します。
  - `catch`: エラーを捕捉し、処理します。
- **src/wav.ts**
  - `generateWav(audioBuffer: Float32Array, sampleRate: number)`: 生のオーディオデータとサンプルレートから、WAV形式のバイナリBlobを生成します。
  - `writeString(view: DataView, offset: number, string: string)`: DataViewオブジェクトの指定されたオフセットに文字列を書き込むヘルパー関数です。
  - `createWavBlobUrl(wavBlob: Blob)`: 生成されたWAV Blobから、ブラウザで再生可能な一時的なURLを作成します。
  - `if`: 条件分岐を処理します。
  - `for`: ループ処理を実行します。

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
  - canvasSupported (src/oscilloscope.test.ts)
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
Generated at: 2026-01-17 07:03:43 JST
