Last updated: 2026-01-06

# Project Overview

## プロジェクト概要
- TypeScriptとRust WASMで実装された、ローパスフィルター（LPF）搭載のシンプルなソフトウェアシンセサイザーです。
- デュアル信号プロセッサにより、TypeScriptとWASMの実装で波形生成とBiquad LPF処理のパフォーマンスを比較できます。
- マウスによるインタラクティブなフィルター制御、WAVファイル出力、設定保存・読み込みなどの機能を備えています。

## 技術スタック
- フロントエンド: Tone.js (クリーンなオーディオ再生), Vite (開発サーバーおよび本番ビルド), HTML/CSS (Webインターフェース)
- 音楽・オーディオ: TypeScript (信号処理アルゴリズム実装), Rust WASM (高性能な信号処理アルゴリズム実装), WebAudio API (Tone.js経由でのオーディオ再生)
- 開発ツール: Node.js (実行環境), npm (パッケージ管理), Rust (WASMモジュール開発), wasm-pack (RustからWASMをビルド)
- テスト: Vitest (テストフレームワーク), happy-dom (DOM環境シミュレーション)
- ビルドツール: Vite (本番用バンドル生成), TypeScript (JavaScriptへのトランスパイル), wasm-pack (RustコードからWASMモジュールへのビルド)
- 言語機能: TypeScript (型安全なJavaScript開発), Rust (高性能なシステムプログラミング言語、WASM向け)
- 自動化・CI/CD: GitHub Pages (アプリケーションの自動デプロイ), GitHub Actions (`.github/workflows/deploy.yml`で定義されたデプロイワークフロー)
- 開発標準: TypeScript (型定義によるコード品質向上)

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
📄 LICENSE
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
📊 package-lock.json
📊 package.json
📁 src/
  📘 filter.test.ts
  📘 filter.ts
  📘 index.ts
  📘 oscillator.test.ts
  📘 oscillator.ts
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
- **.gitignore**: Gitがバージョン管理の対象としないファイルやディレクトリを指定します。
- **ARCHITECTURE_DIAGRAMS.md**: プロジェクトのアーキテクチャ図に関する説明ドキュメントです。
- **CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md**: オシロスコープ機能統合の実現可能性を分析したドキュメントです。
- **CAT_OSCILLOSCOPE_INTEGRATION.md**: オシロスコープ機能統合のための最小変更アプローチに関する参考資料です。
- **CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md**: オシロスコープライブラリ統合におけるベストプラクティスを包括的に分析したドキュメントです。
- **DEVELOPMENT.md**: 開発フレームワークとテスト戦略に関する詳細なガイドドキュメントです。
- **IMPLEMENTATION_EXAMPLES.md**: 実装例に関するドキュメントです。
- **INTEGRATION_BLOCKERS_SUMMARY.md**: 統合における阻害要因の要約をまとめたドキュメントです。
- **LICENSE**: プロジェクトのライセンス情報（MITライセンス）です。
- **README.ja.md**: プロジェクトの日本語版READMEファイルです。
- **README.md**: プロジェクトの英語版READMEファイルです。
- **README_ANALYSIS.md**: READMEファイルの分析に関するドキュメントです。
- **SUMMARY.md**: プロジェクト全体の概要をまとめたドキュメントです。
- **_config.yml**: GitHub Pages（Jekyll）の設定ファイルです。
- **generated-docs/**: ドキュメント生成ツールによって自動生成されたドキュメントが格納されます。
- **index.html**: アプリケーションのWebインターフェースを提供するエントリーポイントとなるHTMLファイルです。
- **issue-notes/**: 開発中の特定のIssueに関するメモを格納するディレクトリです。
- **package-lock.json**: `package.json`に記述された依存関係の正確なバージョンと依存ツリーを記録します。
- **package.json**: プロジェクトのメタデータ、依存関係、および実行スクリプトを定義します。
- **src/filter.test.ts**: `src/filter.ts`で実装されたBiquad LPFフィルターの動作を検証するためのテストスイートです。
- **src/filter.ts**: RBJ Audio EQ Cookbookの公式に基づき、BiquadローパスフィルターをTypeScriptで実装しています。シンセサイザーの信号処理コアの一部です。
- **src/index.ts**: アプリケーションのメインエントリーポイントとなるTypeScriptファイルです。`src/synth.ts`をインポートし、Webアプリケーションを初期化します。
- **src/oscillator.test.ts**: `src/oscillator.ts`で実装された波形ジェネレーターの動作を検証するためのテストスイートです。
- **src/oscillator.ts**: ノコギリ波とパルス波を生成するオシレーターをTypeScriptで実装しています。シンセサイザーの波形生成コアの一部です。
- **src/settings.test.ts**: `src/settings.ts`で実装された設定管理機能の動作を検証するためのテストスイートです。
- **src/settings.ts**: アプリケーションの設定（パラメータなど）を管理し、localStorageへの保存/読み込み、JSONファイルとしてのインポート/エクスポート機能を提供します。
- **src/synth.ts**: メインのシンセサイザーロジックを実装しています。マウストラッキングによるフィルター制御、信号プロセッサの選択（TS/WASM）、Tone.jsを用いたオーディオ再生、UIの更新などを担当します。
- **src/wasmAudio.ts**: Rust WASMモジュールとの橋渡しをするTypeScriptラッパーです。WASMモジュールの動的なロード、初期化、およびエラー発生時のTypeScript実装へのフォールバックを処理します。
- **src/wav.test.ts**: `src/wav.ts`で実装されたWAVファイル生成機能の動作を検証するためのテストスイートです。
- **src/wav.ts**: 処理されたオーディオデータを標準的なWAVファイルフォーマットに変換する機能を提供します。
- **tsconfig.json**: TypeScriptコンパイラの設定を定義するファイルです。
- **vite.config.ts**: Viteビルドツールと開発サーバーに関する設定を定義するファイルです。
- **wasm-audio/Cargo.toml**: Rust WASMモジュールプロジェクトの依存関係、メタデータ、およびビルド設定を定義します。
- **wasm-audio/src/lib.rs**: Rustで実装された完全な信号処理パイプラインのソースファイルです。オシレーター生成とBiquad LPFフィルター処理を含みます。

## 関数詳細説明
- **filter.ts**
    - `constructor`: `BiquadFilter`クラスのインスタンスを初期化し、フィルターの係数などを設定します。
- **oscillator.ts**
    - `generateSawtooth()`: ノコギリ波のオーディオサンプルを生成します。
    - `generatePulse()`: パルス波のオーディオサンプルを、指定されたデューティー比に基づいて生成します。
- **settings.ts**
    - `validateSettings(settings)`: 渡された設定オブジェクトの各プロパティが有効な値であるかを検証します。
    - `loadSettings()`: ブラウザのlocalStorageからアプリケーション設定を読み込み、検証して返します。
    - `saveSettings(settings)`: 現在のアプリケーション設定をJSON形式でlocalStorageに保存します。
    - `exportSettingsToFile(settings, filename)`: 指定された設定オブジェクトをJSONファイルとしてダウンロードします。
    - `importSettingsFromFile(file)`: ユーザーが選択したJSONファイルから設定を読み込み、アプリケーションに適用します。
- **synth.ts**
    - `getCurrentSettings()`: UI上の入力フィールドから現在の設定値を読み取り、オブジェクトとして返します。
    - `getDuration(bpm, beat)`: BPMとビートに基づいてオーディオ生成の総再生時間（秒）を計算します。
    - `readNumericParameter(id, defaultValue)`: 指定されたIDのHTML入力要素から数値を読み取り、パースして返します。
    - `readParameters()`: UIから主要なシンセサイザーパラメータ（波形タイプ、デューティー比、BPMなど）を読み取ります。
    - `centsToRatio(cents)`: セント値（音程の単位）を周波数比に変換します。
    - `getFilterParams(mouseX, mouseY, qMax, cutoffMax)`: マウスのX, Y座標と最大Q値、最大カットオフ周波数に基づいてフィルターパラメータ（カットオフ周波数、Q値）を計算します。
    - `renderAudioTypeScript(settings)`: TypeScriptで実装された信号処理パイプラインを使用してオーディオサンプルをレンダリングします。
    - `renderAudio(settings)`: 現在選択されている信号プロセッサ（TypeScriptまたはRust WASM）に応じてオーディオをレンダリングします。
    - `playAudio(audioBuffer, sampleRate)`: レンダリングされたオーディオバッファをTone.jsを利用してブラウザで再生します。
    - `updateUIFields(settings)`: アプリケーションのUI上の入力フィールドを、現在の設定値で更新します。
    - `init()`: アプリケーション全体の初期化処理を実行します。イベントリスナーの設定やUIの初期状態の構成を含みます。
    - `scheduleNextPlay()`: 次のオーディオ生成と再生のサイクルをスケジュールし、UIのステータス表示を更新します。
    - `updateStatusDisplay(message)`: アプリケーションのステータス表示領域にメッセージを表示します。
    - `updateGenerationTimeDisplay(timeMs)`: オーディオ生成にかかった時間をUIに表示します。
    - `dispose()`: アプリケーションが使用しているリソース（Tone.jsコンテキストなど）を解放します。
    - `handleInputChange(event)`: UIの入力要素の値が変更された際のイベントを処理し、設定の保存とオーディオの再生成を行います。
    - `handleClick(event)`: UI上のクリックイベントを処理し、オーディオコンテキストの開始やファイル操作などを行います。
- **wasmAudio.ts**
    - `initWasm()`: Rust WASMモジュールを動的にロードし、初期化します。ロードに失敗した場合はエラーをスローします。
    - `isWasmInitialized()`: WASMモジュールが正常にロードされ、初期化されているかどうかを返します。
    - `renderAudioWasm(settings)`: Rust WASM実装を通じてオーディオサンプルをレンダリングします。
- **wav.ts**
    - `generateWav(audioBuffer, sampleRate)`: 生のオーディオデータとサンプルレートから、WAVファイルフォーマットの`ArrayBuffer`を生成します。
    - `writeString(view, offset, string)`: `DataView`オブジェクトの指定されたオフセットに文字列を書き込みます。WAVヘッダーの生成に使用されます。
    - `createWavBlobUrl(wavBuffer)`: 生成されたWAVデータ（ArrayBuffer）からダウンロード可能なBlob URLを作成します。

## 関数呼び出し階層ツリー
```
- アプリケーション起動・初期化 (src/index.ts)
  - init (src/synth.ts)
    - getCurrentSettings (src/synth.ts)
    - updateUIFields (src/synth.ts)
    - scheduleNextPlay (src/synth.ts)
- ユーザー操作によるイベントハンドリング (src/synth.ts)
  - handleClick (src/synth.ts)
    - init (src/synth.ts) (オーディオコンテキストが未開始の場合など)
    - scheduleNextPlay (src/synth.ts)
  - handleInputChange (src/synth.ts)
    - getCurrentSettings (src/synth.ts)
    - saveSettings (src/settings.ts)
      - validateSettings (src/settings.ts)
    - scheduleNextPlay (src/synth.ts)
- オーディオ生成・再生のコアロジック (src/synth.ts)
  - scheduleNextPlay (src/synth.ts)
    - renderAudio (src/synth.ts)
      - getFilterParams (src/synth.ts)
        - centsToRatio (src/synth.ts)
      - renderAudioTypeScript (src/synth.ts) (TypeScriptによる信号処理)
        - generateSawtooth (src/oscillator.ts)
        - generatePulse (src/oscillator.ts)
        - BiquadFilter (src/filter.ts) (インスタンスのメソッド呼び出し)
      - renderAudioWasm (src/wasmAudio.ts) (Rust WASMによる信号処理)
        - initWasm (src/wasmAudio.ts) (初回または必要に応じてWASMモジュールをロード)
        - isWasmInitialized (src/wasmAudio.ts)
    - playAudio (src/synth.ts)
      - generateWav (src/wav.ts)
        - writeString (src/wav.ts)
        - createWavBlobUrl (src/wav.ts)
    - updateGenerationTimeDisplay (src/synth.ts)
    - updateStatusDisplay (src/synth.ts)
- 設定管理機能 (src/settings.ts)
  - loadSettings (src/settings.ts)
    - validateSettings (src/settings.ts)
  - exportSettingsToFile (src/settings.ts)
  - importSettingsFromFile (src/settings.ts)
    - validateSettings (src/settings.ts)
```

---
Generated at: 2026-01-06 07:03:55 JST
