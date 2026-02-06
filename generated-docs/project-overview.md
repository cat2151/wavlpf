Last updated: 2026-02-07

# Project Overview

## プロジェクト概要
- Rust WASMで実装された高性能なソフトウェアシンセサイザーです。
- リアルタイムでのローパスフィルター適用、多様な波形生成、インタラクティブなサウンド操作が可能です。
- Webブラウザ上で動作し、パフォーマンス測定、WAV出力、設定の永続化などの機能を提供します。

## 技術スタック
- フロントエンド: **Vite** (開発サーバー、本番バンドル), **TypeScript** (アプリケーションロジック), **HTML** (Webインターフェース), **cat-oscilloscope** (リアルタイムオシロスコープ表示、WASMベース), **Tone.js** (クリーンなオーディオ再生)
- 音楽・オーディオ: **Rust WASM** (高速なDSP処理を担う信号プロセッサ), **Biquadフィルター** (複数のフィルタータイプの実装), **Web Audio API** (ブラウザでのオーディオ処理基盤)
- 開発ツール: **Node.js** (JavaScript実行環境), **npm** (パッケージマネージャー), **wasm-pack** (Rust WASMモジュールビルドツール), **Rustup** (Rustツールチェイン管理)
- テスト: **Vitest** (ユニット/コンポーネントテストフレームワーク), **Playwright** (エンドツーエンドテスト、ブラウザ自動化), **Happy DOM** (VitestでのDOMシミュレーション)
- ビルドツール: **Vite** (高速な開発と本番ビルド), **wasm-pack** (RustコードをWASMにコンパイル), **TypeScript** (JavaScriptへのトランスパイル), **wasm-opt** (WASMバイナリの最適化)
- 言語機能: **Rust** (高性能な信号処理ロジック), **TypeScript** (型安全なWebアプリケーション開発), **JavaScript** (Web標準、TypeScriptのコンパイルターゲット)
- 自動化・CI/CD: **GitHub Actions** (継続的インテグレーション/デプロイ、GitHub Pagesへの自動デプロイ)
- 開発標準: (特定のツールは明記されていませんが、TypeScriptやテストツールの使用によりコード品質を重視しています)

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
-   `.gitignore`: Gitバージョン管理システムが無視するファイルやディレクトリを指定します。
-   `DEVELOPMENT.md`: プロジェクトの開発フレームワーク、テスト戦略、および一般的な開発ガイドラインに関する詳細なドキュメントです。
-   `LICENSE`: プロジェクトのライセンス情報（MITライセンス）を記載しています。
-   `README.ja.md`: プロジェクトの日本語での概要と使用方法を説明するファイルです。
-   `README.md`: プロジェクトの英語での概要と使用方法を説明するファイルです。
-   `_config.yml`: GitHub PagesのJekyll設定ファイルで、サイトのビルド方法やテーマに関する設定が含まれています。
-   `copilot-instructions.md`: GitHub Copilotの使用に関する指示や推奨事項をまとめたドキュメントです。
-   `docs/`: プロジェクトに関する追加のドキュメントを格納するディレクトリです。
    -   `CAT_OSCILLOSCOPE_WASM_SETUP.md`: `cat-oscilloscope`のWASMセットアップに関する技術的な詳細を説明します。
    -   `COPILOT_GITHUB_PAGES_ACCESS.md`: GitHub CopilotがGitHub Pagesにアクセスする際の権限や設定に関する情報です。
    -   `DEPLOYMENT_VERIFICATION.md`: プロジェクトのデプロイが正しく行われたかを確認するための検証手順に関するドキュメントです。
    -   `OSCILLOSCOPE_LAYOUT.md`: オシロスコープのレイアウトや表示方法に関する情報です。
    -   `OSCILLOSCOPE_USAGE.md`: オシロスコープ機能の現在の実装と使用方法に関するガイドです。
-   `generated-docs/`: プロジェクトのビルドプロセスで自動生成されるドキュメントを格納するためのディレクトリです。
-   `index.html`: WebアプリケーションのメインエントリポイントとなるHTMLファイルで、ユーザーインターフェースの骨格を定義します。
-   `package-lock.json`: `package.json`にリストされている依存関係の正確なバージョンと依存ツリーをロックし、ビルドの一貫性を保証します。
-   `package.json`: プロジェクトのメタデータ、スクリプト、および開発・実行時の依存関係を定義するファイルです。
-   `scripts/`: プロジェクトの開発、テスト、ビルド、デプロイメントを支援する様々な補助スクリプトを格納するディレクトリです。
    -   `README.md`: `scripts`ディレクトリ内の各スクリプトの目的と使用方法を説明します。
    -   `install-wasm-pack.sh`: `wasm-pack`ツールを自動的にインストールするためのシェルスクリプトです。
    -   `investigate-404.js`: デプロイ後のGitHub Pagesで404エラーが発生していないかをPlaywrightを使用して検証します。
    -   `investigate-cat-oscilloscope.js`: `cat-oscilloscope`ライブラリのGitHubリポジトリの状態を調査するスクリプトです。
    -   `screenshot-github-pages.js`: デプロイされたGitHub PagesのWebサイトのスクリーンショットを撮影するスクリプトです。
    -   `setup-cat-oscilloscope-wasm.js`: `cat-oscilloscope`のWASM関連のセットアップを行うスクリプトです。
    -   `test-console-logs.js`: アプリケーションのコンソールログ出力をテストし、エラーや警告がないかを確認します。
    -   `test-pr-changes-locally.sh`: GitHubのプルリクエストで行われた変更をローカル環境でテストするためのシェルスクリプトです。
    -   `test-waveform-screenshot.js`: 波形ビジュアライゼーションの表示が正しいことをスクリーンショット比較でテストします。
    -   `verify-deployment.js`: GitHub Pagesへのデプロイが成功し、アプリケーションが期待通りに動作しているかをエンドツーエンドで検証します。
-   `src/`: WebアプリケーションのTypeScriptソースコードが格納されている主要なディレクトリです。
    -   `audio-player.ts`: Tone.jsライブラリを使用してオーディオコンテキストの管理、オーディオのロード、再生、停止を行うロジックを実装します。
    -   `index.ts`: Webアプリケーションのメインエントリーポイントで、`synth.ts`の初期化などを行います。
    -   `oscilloscope.test.ts`: オシロスコープ表示機能に関する単体テストコードです。
    -   `oscilloscope.ts`: `cat-oscilloscope`ライブラリと連携し、オーディオ波形のリアルタイム表示を制御するロジックです。
    -   `performance-stats.test.ts`: オーディオ処理のパフォーマンス統計機能に関する単体テストコードです。
    -   `performance-stats.ts`: オーディオ生成にかかる時間のパフォーマンスを測定し、統計情報を計算・管理するロジックです。
    -   `playback-mode.ts`: アプリケーションのオーディオ再生モード（例: リアルタイム、非リアルタイムレンダリング）を管理するロジックです。
    -   `settings.test.ts`: アプリケーションの設定管理機能に関する単体テストコードです。
    -   `settings.ts`: アプリケーションの設定のロード、保存、エクスポート、インポートを処理するロジックを実装します。
    -   `synth.ts`: シンセサイザーの主要なロジックを担うファイルです。UIとの連携、オーディオのレンダリング、再生の制御、イベントハンドリングなどが含まれます。
    -   `timing.test.ts`: BPMとビートに基づいたタイミング計算機能に関する単体テストコードです。
    -   `timing.ts`: BPMとビート数からオーディオの再生期間などを計算するユーティリティ関数を提供します。
    -   `ui-params.test.ts`: ユーザーインターフェースからのパラメータ読み取りとマッピング機能に関する単体テストコードです。
    -   `ui-params.ts`: ユーザーインターフェース（UI）の入力フィールドからパラメータを読み取り、マウス座標をフィルター設定にマッピングするロジックを実装します。
    -   `wasmAudio.ts`: Rustで実装されたWASMオーディオ処理モジュールをWebアプリケーションにロードし、連携するためのTypeScriptラッパーです。
    -   `wav.test.ts`: WAVファイル生成機能に関する単体テストコードです。
    -   `wav.ts`: 生のオーディオデータからWAVファイル形式のバイナリデータを生成し、それをBlob URLとして提供するロジックです。
-   `tsconfig.json`: TypeScriptコンパイラの設定ファイルで、プロジェクトのコンパイルオプションを指定します。
-   `vite.config.ts`: Viteビルドツールの設定ファイルで、開発サーバーや本番ビルドに関する挙動を定義します。
-   `wasm-audio/`: 高性能な信号処理ロジックをRustで実装し、WebAssemblyとしてコンパイルするためのRustクレートです。
    -   `Cargo.toml`: Rustクレートの依存関係、メタデータ、ビルド設定を定義するファイルです。
    -   `README.md`: `wasm-audio`クレートの目的と使用方法に関するドキュメントです。
    -   `src/audio_renderer.rs`: オーディオ信号を実際に生成・レンダリングするロジック（フィルター適用、波形生成など）を実装しています。
    -   `src/filter.rs`: Biquadフィルター（LPF, HPFなど）のアルゴリズムをRustで実装しています。
    -   `src/lib.rs`: `wasm-audio`クレートのメインライブラリファイルで、WASMへのエクスポート関数と主要なオーディオ処理パイプラインを定義します。
    -   `src/oscillator.rs`: ノコギリ波やパルス波などの基本的な波形を生成するオシレーターロジックを実装しています。
-   `waveform-test.png`: 波形表示のテストや参照目的で使用される可能性のある画像ファイルです。

## 関数詳細説明
-   `investigate404`: (scripts/investigate-404.js) デプロイされたGitHub Pagesで404エラーが発生しないかを確認するためのエンドツーエンドテストを実行します。
-   `if`: (scripts/investigate-404.js, src/index.ts, src/oscilloscope.test.ts, src/oscilloscope.ts, src/performance-stats.ts, src/playback-mode.ts, src/settings.ts, src/synth.ts, src/timing.ts, src/ui-params.ts, src/wasmAudio.ts, src/wav.ts) プログラムの特定の条件が真である場合にコードブロックを実行する条件分岐の制御構造です。
-   `catch`: (scripts/investigate-404.js, scripts/investigate-cat-oscilloscope.js, scripts/screenshot-github-pages.js, scripts/test-console-logs.js, scripts/test-waveform-screenshot.js, scripts/verify-deployment.js, src/audio-player.ts, src/oscilloscope.ts, src/settings.ts, src/synth.ts, src/wasmAudio.ts) エラーが発生した際にそのエラーを捕捉し、対応する処理を実行するためのエラーハンドリングの制御構造です。
-   `checkGitHubRepo`: (scripts/investigate-cat-oscilloscope.js) 指定されたGitHubリポジトリ（特に`cat-oscilloscope`）の可用性や内容を確認します。
-   `investigate`: (scripts/investigate-cat-oscilloscope.js) `cat-oscilloscope`のインストールや設定に関する問題を調査するためのロジックを実行します。
-   `takeScreenshot`: (scripts/screenshot-github-pages.js) GitHub PagesにデプロイされたWebサイトのスクリーンショットをPlaywrightを使用して撮影します。
-   `for`: (scripts/setup-cat-oscilloscope-wasm.js, scripts/test-waveform-screenshot.js, scripts/verify-deployment.js, src/oscilloscope.test.ts, src/wav.ts) 指定された回数またはコレクションの各要素に対してコードブロックを繰り返し実行するループの制御構造です。
-   `testConsoleLogs`: (scripts/test-console-logs.js) アプリケーション実行中のコンソールログ出力を監視し、期待されるログが出力されているか、エラーがないかなどをテストします。
-   `testWaveformVisualization`: (scripts/test-waveform-screenshot.js) 波形ビジュアライゼーションが正しく表示されているか、スクリーンショットを比較してテストします。
-   `verifyDeployment`: (scripts/verify-deployment.js) アプリケーションがGitHub Pagesに正しくデプロイされ、期待通りに動作するかをエンドツーエンドで検証します。
-   `loadTone`: (src/audio-player.ts) Tone.jsライブラリをロードし、オーディオ再生に必要な初期化を行います。
-   `isToneLoaded`: (src/audio-player.ts) Tone.jsがロード済みであるかを確認します。
-   `startAudioContext`: (src/audio-player.ts) Web Audio APIのオーディオコンテキストを開始します。通常、ユーザー操作をトリガーとします。
-   `isAudioContextRunning`: (src/audio-player.ts) オーディオコンテキストが現在実行中であるかを確認します。
-   `playWavUrl`: (src/audio-player.ts) 指定されたWAVファイルのURLをTone.jsで再生します。
-   `stopAndCleanup`: (src/audio-player.ts) 現在再生中のオーディオを停止し、関連するリソースをクリーンアップします。
-   `canvasSupported`: (src/oscilloscope.test.ts) テスト環境でHTML Canvas要素がサポートされているかを確認します。
-   `forEach`: (src/oscilloscope.test.ts) 配列の各要素に対して提供された関数を一度ずつ実行する高階関数です。
-   `initOscilloscope`: (src/oscilloscope.ts) `cat-oscilloscope`を初期化し、波形表示キャンバスを設定します。
-   `startDebugOverlayUpdates`: (src/oscilloscope.ts) オシロスコープのデバッグオーバーレイ（パフォーマンス情報など）の更新を開始します。
-   `stopDebugOverlayUpdates`: (src/oscilloscope.ts) オシロスコープのデバッグオーバーレイの更新を停止します。
-   `frequencyToNote`: (src/oscilloscope.ts) 周波数値を音楽的なノート名に変換します。
-   `validateInputs`: (src/oscilloscope.ts) オシロスコープ関連の入力パラメータが有効であるかを検証します。
-   `updateOscilloscope`: (src/oscilloscope.ts) 新しいオーディオバッファデータに基づいてオシロスコープ表示を更新します。
-   `stopOscilloscope`: (src/oscilloscope.ts) オシロスコープの表示を停止し、関連リソースを解放します。
-   `isOscilloscopeInitialized`: (src/oscilloscope.ts) オシロスコープが初期化済みであるかを確認します。
-   `createPerformanceStats`: (src/performance-stats.ts) パフォーマンス統計オブジェクトを初期化します。
-   `addPerformanceSample`: (src/performance-stats.ts) 新しいパフォーマンス測定値（例：処理時間）を統計データに追加します。
-   `calculatePerformanceStats`: (src/performance-stats.ts) 収集されたパフォーマンスサンプルから平均値、最大値などの統計情報を計算します。
-   `resetPerformanceStats`: (src/performance-stats.ts) 収集されたパフォーマンス統計データをリセットし、初期状態に戻します。
-   `getCurrentMode`: (src/playback-mode.ts) 現在のオーディオ再生モード（リアルタイムまたは非リアルタイムレンダリング）を取得します。
-   `updateModeUI`: (src/playback-mode.ts) 現在の再生モードに応じてユーザーインターフェース（UI）を更新します。
-   `switchMode`: (src/playback-mode.ts) オーディオ再生モードを切り替えます。
-   `validateSettings`: (src/settings.ts) ロードまたはインポートされた設定値が有効であるかを検証します。
-   `loadSettings`: (src/settings.ts) ブラウザのlocalStorageからアプリケーション設定をロードします。
-   `saveSettings`: (src/settings.ts) 現在のアプリケーション設定をブラウザのlocalStorageに保存します。
-   `exportSettingsToFile`: (src/settings.ts) 現在の設定をJSONファイルとしてエクスポートし、ユーザーがダウンロードできるようにします。
-   `importSettingsFromFile`: (src/settings.ts) JSONファイルから設定をインポートし、アプリケーションに適用します。
-   `getCurrentSettings`: (src/synth.ts) シンセサイザーの現在の設定オブジェクトを取得します。
-   `displayOscilloscopeError`: (src/synth.ts) オシロスコープに関するエラーメッセージをUIに表示します。
-   `readParameters`: (src/synth.ts) UIからシンセサイザーの様々なパラメータ（波形タイプ、デューティー比など）を読み取ります。
-   `renderAudio`: (src/synth.ts) 指定された設定とタイミングに基づいてオーディオ信号を生成・レンダリングします。
-   `playAudioWav`: (src/synth.ts) 生成されたWAVデータ（Blob URL）をTone.jsを使用して再生します。
-   `playAudioSeq`: (src/synth.ts) シーケンシャル（非リアルタイム）に生成されたオーディオデータを再生します。
-   `playAudio`: (src/synth.ts) オーディオ再生を開始または制御するメインの関数です。
-   `handleModeSwitch`: (src/synth.ts) 再生モードが切り替わった際の処理を行います。
-   `init`: (src/synth.ts) シンセサイザーアプリケーション全体の初期化を行います。イベントリスナーの設定やWASMモジュールのロードなどが含まれます。
-   `scheduleNextPlay`: (src/synth.ts) 次のオーディオ再生イベントをスケジュールします。
-   `updateStatusDisplay`: (src/synth.ts) シンセサイザーの現在の状態やメッセージをUIに表示します。
-   `updateGenerationTimeDisplay`: (src/synth.ts) オーディオ生成にかかった時間をUIに表示します。
-   `dispose`: (src/synth.ts) アプリケーションが終了する際に、すべてのリソースを解放し、クリーンアップします。
-   `handleInputChange`: (src/synth.ts) UIの入力要素（スライダー、テキストボックスなど）が変更された際のイベントを処理します。
-   `handleClick`: (src/synth.ts) ユーザーがUI要素をクリックした際のイベントを処理します。
-   `calculateDuration`: (src/timing.ts) BPMとビート数に基づいて、オーディオの再生時間を計算します。
-   `readNumericParameter`: (src/ui-params.ts) UIの入力フィールドから数値パラメータを安全に読み取ります。
-   `readParametersFromUI`: (src/ui-params.ts) UI上のすべての関連パラメータを読み取り、設定オブジェクトとして返します。
-   `updateUIFields`: (src/ui-params.ts) 設定オブジェクトに基づいてUIの入力フィールドを更新し、表示に反映させます。
-   `mapMouseToFilterParams`: (src/ui-params.ts) マウスのX/Y座標をフィルターのカットオフ周波数とQ値にマッピングします。
-   `updateMousePositionDisplay`: (src/ui-params.ts) マウスの位置に対応するフィルターパラメータ（周波数、Q値）をUIに表示します。
-   `initWasm`: (src/wasmAudio.ts) Rustで実装されたWASMオーディオモジュールをロードし、初期化します。
-   `isWasmInitialized`: (src/wasmAudio.ts) WASMモジュールが初期化済みであるかを確認します。
-   `renderAudioWasm`: (src/wasmAudio.ts) WASMモジュール内のRust関数を呼び出してオーディオデータをレンダリングします。
-   `generateWav`: (src/wav.ts) 生のオーディオデータバッファからWAVファイル形式の`ArrayBuffer`を生成します。
-   `writeString`: (src/wav.ts) `DataView`オブジェクトを使用して、指定されたオフセットに文字列を書き込みます（主にWAVヘッダのチャンクID用）。
-   `createWavBlobUrl`: (src/wav.ts) 生成されたWAVデータの`ArrayBuffer`から`Blob URL`を作成し、ブラウザでの再生やダウンロードを可能にします。

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
Generated at: 2026-02-07 07:04:01 JST
