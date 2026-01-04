Last updated: 2026-01-05

# Project Overview

## プロジェクト概要
- wavlpfはTypeScriptで開発された、ローパスフィルター機能を備えたシンプルなソフトウェアシンセサイザーです。
- 純粋な信号処理実装によりノコギリ波を生成し、マウス操作でカットオフ周波数とQ値を調整できるBiquad LPFを提供します。
- 非リアルタイムでのオーディオレンダリング、WAVファイル出力、そしてTone.jsによるクリーンな再生を特徴としています。

## 技術スタック
- フロントエンド:
  - Vite: 高速な開発サーバーとビルドツールを提供し、モダンなフロントエンド開発を支援します。
  - `index.html`: プロジェクトのWebインターフェースのエントリーポイントです。
- 音楽・オーディオ:
  - Tone.js: 高度なWebオーディオ処理と音楽シーケンス機能を提供するJavaScriptフレームワークです。
  - Biquad LPF (カスタム実装): ローパスフィルターのアルゴリズム（RBJ Audio EQ Cookbook公式に基づく）を純粋な信号処理として実装しています。
  - 220Hzノコギリ波ジェネレーター (カスタム実装): 基本的な波形であるノコギリ波を生成する信号処理モジュールです。
- 開発ツール:
  - Node.js: JavaScript実行環境（前提条件として挙げられています）。
  - npm: Node.jsのパッケージマネージャーであり、プロジェクトの依存関係を管理します。
  - TypeScript: 静的型付けを導入し、大規模なアプリケーション開発の堅牢性と保守性を高めます。
  - @types/node: Node.js環境における型定義を提供し、TypeScript開発を支援します。
  - happy-dom: テスト環境でDOMをエミュレートし、ブラウザAPIに依存するコンポーネントのテストを可能にします。
- テスト:
  - Vitest: Viteとの連携に優れた高速なユニットテストフレームワークです。
  - @vitest/ui: Vitestのテスト結果を視覚的に表示するユーザーインターフェースを提供します。
- ビルドツール:
  - Vite: 高速なビルドと開発サーバーを提供し、開発効率を向上させます。
- 言語機能:
  - TypeScript: JavaScriptに静的型付けを追加し、開発時のエラー検出とコードの可読性を向上させます。
- 自動化・CI/CD:
  - GitHub Pages: GitHubリポジトリからウェブサイトをホストするための静的サイトホスティングサービス。`main`ブランチへのプッシュで自動デプロイがトリガーされます。
- 開発標準:
  - TypeScript: コードの品質を保証し、一貫性のある開発を促進する基盤として利用されています。

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
  📘 wav.test.ts
  📘 wav.ts
📊 tsconfig.json
📘 vite.config.ts
```

## ファイル詳細説明
-   **`.gitignore`**: Gitのバージョン管理から除外するファイルやディレクトリを指定します。
-   **`ARCHITECTURE_DIAGRAMS.md`**: プロジェクトのアーキテクチャに関する図解や詳細な説明が記述されたドキュメントです。
-   **`CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md`**: CAT Oscilloscopeライブラリを統合する際の実現可能性について分析したドキュメントです。
-   **`CAT_OSCILLOSCOPE_INTEGRATION.md`**: CAT Oscilloscopeライブラリの統合に関する具体的な情報、特に最小変更アプローチに関する参考資料です。
-   **`CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md`**: CAT Oscilloscopeライブラリを統合する際のベストプラクティスをまとめた、推奨される包括的な分析ドキュメントです。
-   **`DEVELOPMENT.md`**: プロジェクトの開発フレームワーク、テスト戦略、および具体的な開発手順に関する詳細なガイドを提供します。
-   **`IMPLEMENTATION_EXAMPLES.md`**: 実装の具体的な例やコードスニペットを含む、開発者向けの参考資料です。
-   **`INTEGRATION_BLOCKERS_SUMMARY.md`**: 統合作業における課題や阻害要因の要約をまとめたドキュメントです。
-   **`LICENSE`**: プロジェクトのライセンス情報が記載されています（MITライセンス）。
-   **`README.ja.md`**: プロジェクトの概要、機能、使い方、開発方法などを日本語で説明するメインのドキュメントです。
-   **`README.md`**: プロジェクトの概要、機能、使い方、開発方法などを英語で説明するメインのドキュメントです。
-   **`README_ANALYSIS.md`**: READMEファイルの分析または関連情報を提供します。
-   **`SUMMARY.md`**: プロジェクトに関する概要または要約情報です。
-   **`_config.yml`**: GitHub PagesのJekyll設定ファイルです。
-   **`generated-docs/`**: 自動生成されたドキュメントを格納するためのディレクトリです。
-   **`index.html`**: アプリケーションのユーザーインターフェースを提供するHTMLファイルです。ブラウザ上でシンセサイザーの操作画面を表示します。
-   **`issue-notes/`**: 開発中の課題や検討事項に関するメモを格納するディレクトリです。
-   **`package-lock.json`**: プロジェクトの依存関係の正確なバージョンと依存ツリーを記録し、ビルドの一貫性を保証するファイルです。
-   **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。
-   **`src/filter.test.ts`**: `src/filter.ts`で実装されたローパスフィルター機能のユニットテストを記述するファイルです。
-   **`src/filter.ts`**: RBJ Audio EQ Cookbookの公式に基づいたBiquadローパスフィルター（LPF）の信号処理ロジックを実装します。
-   **`src/index.ts`**: アプリケーションのエントリーポイントであり、主要な初期化処理を行い、`src/synth.ts`の機能を利用してシンセサイザーを起動します。
-   **`src/oscillator.test.ts`**: `src/oscillator.ts`で実装されたオシレーター機能のユニットテストを記述するファイルです。
-   **`src/oscillator.ts`**: ノコギリ波を生成するための信号処理ロジックを実装します。
-   **`src/settings.test.ts`**: `src/settings.ts`で定義された設定管理機能のユニットテストを記述するファイルです。
-   **`src/settings.ts`**: アプリケーションの設定の検証、ロード、保存、エクスポート、インポートに関するロジックを管理します。
-   **`src/synth.ts`**: メインのシンセサイザーロジックを実装するファイルです。マウストラッキング、オーディオのレンダリングと再生、UIの更新、フィルターパラメータの制御など、アプリケーションの中核機能を担います。
-   **`src/wav.test.ts`**: `src/wav.ts`で実装されたWAVファイル生成機能のユニットテストを記述するファイルです。
-   **`src/wav.ts`**: 生成されたオーディオデータを標準的なWAVファイルフォーマットに変換する機能を提供します。
-   **`tsconfig.json`**: TypeScriptコンパイラのオプションを設定するファイルです。
-   **`vite.config.ts`**: Viteビルドツールと開発サーバーの設定ファイルです。

## 関数詳細説明
-   **`constructor` (src/filter.ts)**:
    -   役割: `Filter`クラスのインスタンスを初期化し、Biquadローパスフィルターの係数を設定します。
    -   引数: LPFのカットオフ周波数やQ値などの初期フィルターパラメータ。
    -   戻り値: なし。
-   **`for` (src/filter.test.ts, src/oscillator.test.ts, src/oscillator.ts, src/synth.ts, src/wav.ts)**:
    -   役割: ループ処理を実行し、配列の反復処理や一定回数の処理の繰り返しに使用されます。例えば、オーディオバッファの各サンプルを処理したり、テストケースを複数実行したりします。
    -   引数: なし (一般的なループ構文のため)。
    -   戻り値: なし。
-   **`generateSawtooth` (src/oscillator.ts)**:
    -   役割: 指定された周波数と期間に基づいてノコギリ波のオーディオサンプルを生成します。
    -   引数: `frequency`: 生成するノコギリ波の周波数、`sampleRate`: サンプルレート、`durationSeconds`: 生成する期間（秒）。
    -   戻り値: 生成されたノコギリ波のオーディオデータ（数値配列）。
-   **`validateSettings` (src/settings.ts)**:
    -   役割: アプリケーションの設定オブジェクトが有効な形式と値を持っているかを検証します。
    -   引数: `settings`: 検証する設定オブジェクト。
    -   戻り値: 検証結果（ブーリアンまたはエラーオブジェクト）。
-   **`loadSettings` (src/settings.ts)**:
    -   役割: ストレージ（例: ローカルストレージ）からアプリケーション設定を読み込みます。
    -   引数: なし。
    -   戻り値: 読み込まれた設定オブジェクト。
-   **`saveSettings` (src/settings.ts)**:
    -   役割: 現在のアプリケーション設定をストレージに保存します。
    -   引数: `settings`: 保存する設定オブジェクト。
    -   戻り値: なし。
-   **`exportSettingsToFile` (src/settings.ts)**:
    -   役割: 現在のアプリケーション設定をファイルとしてエクスポートします。
    -   引数: `settings`: エクスポートする設定オブジェクト。
    -   戻り値: なし（ファイルをダウンロードとして提供）。
-   **`importSettingsFromFile` (src/src/settings.ts)**:
    -   役割: ファイルからアプリケーション設定をインポートし、適用します。
    -   引数: `file`: インポートする設定ファイル。
    -   戻り値: なし。
-   **`if` (src/index.ts, src/settings.ts, src/synth.ts, src/wav.ts)**:
    -   役割: 条件に基づいてコードの特定のブロックを実行します。条件分岐に使用されます。
    -   引数: なし (一般的な条件構文のため)。
    -   戻り値: なし。
-   **`catch` (src/settings.ts, src/synth.ts)**:
    -   役割: try-catchブロックの一部として、tryブロック内で発生したエラーを捕捉し、処理します。エラーハンドリングに使用されます。
    -   引数: `error`: 捕捉されたエラーオブジェクト。
    -   戻り値: なし。
-   **`getCurrentSettings` (src/synth.ts)**:
    -   役割: アプリケーションの現在の設定状態を取得します。
    -   引数: なし。
    -   戻り値: 現在の設定オブジェクト。
-   **`getDuration` (src/synth.ts)**:
    -   役割: オーディオバッファの再生時間など、特定の期間を計算します。
    -   引数: なし。
    -   戻り値: 時間（ミリ秒、秒など）。
-   **`readNumericParameter` (src/synth.ts)**:
    -   役割: ユーザーインターフェースからの入力など、数値パラメータを読み取り、適切な形式に変換します。
    -   引数: `elementId`: UI要素のID、`defaultValue`: デフォルト値。
    -   戻り値: 読み取られた数値。
-   **`readParameters` (src/synth.ts)**:
    -   役割: アプリケーションの複数のパラメータ（特にUIからの入力）をまとめて読み込みます。
    -   引数: なし。
    -   戻り値: 読み取られたパラメータのオブジェクト。
-   **`centsToRatio` (src/synth.ts)**:
    -   役割: セント値（音程の単位）を周波数比に変換します。
    -   引数: `cents`: 変換するセント値。
    -   戻り値: 周波数比。
-   **`getFilterParams` (src/synth.ts)**:
    -   役割: マウスの入力位置などに基づいて、ローパスフィルターのカットオフ周波数とQ値のパラメータを計算します。
    -   引数: `event`: マウスイベントオブジェクト（X, Y座標を含む）。
    -   戻り値: フィルターパラメータのオブジェクト（カットオフ周波数とQ値）。
-   **`renderAudio` (src/synth.ts)**:
    -   役割: 現在のシンセサイザーとフィルター設定に基づいて、オーディオデータを非リアルタイムで生成します。
    -   引数: `durationSeconds`: レンダリングする期間（秒）、`filterParams`: 使用するフィルターパラメータ。
    -   戻り値: 生成されたオーディオデータ（数値配列）。
-   **`playAudio` (src/synth.ts)**:
    -   役割: `Tone.js`ライブラリを使用して、生成されたオーディオデータを再生します。
    -   引数: `audioBuffer`: 再生するオーディオデータ。
    -   戻り値: なし。
-   **`updateUIFields` (src/synth.ts)**:
    -   役割: アプリケーションの状態変更に応じて、ユーザーインターフェース上のフィールド（テキストボックス、スライダーなど）を更新します。
    -   引数: `filterParams`: 現在のフィルターパラメータ。
    -   戻り値: なし。
-   **`init` (src/synth.ts)**:
    -   役割: シンセサイザーアプリケーションの初期化処理を実行します。イベントリスナーの設定や初期オーディオのレンダリングなどを含みます。
    -   引数: なし。
    -   戻り値: なし。
-   **`scheduleNextPlay` (src/synth.ts)**:
    -   役割: 次のオーディオバッファの再生をスケジュールします。一定間隔でのオーディオ生成と再生を維持するために使用されます。
    -   引数: なし。
    -   戻り値: なし。
-   **`updateStatusDisplay` (src/synth.ts)**:
    -   役割: アプリケーションのステータス情報（例: エラーメッセージ、処理状況）をUIに表示します。
    -   引数: `message`: 表示するステータスメッセージ、`isError`: エラーメッセージかどうかを示すブーリアン。
    -   戻り値: なし。
-   **`dispose` (src/synth.ts)**:
    -   役割: アプリケーションが終了する際やリソースが不要になった際に、割り当てられたリソース（イベントリスナー、オーディオコンテキストなど）を解放します。
    -   引数: なし。
    -   戻り値: なし。
-   **`generateWav` (src/wav.ts)**:
    -   役割: 生のオーディオデータを受け取り、それをWAVファイルフォーマットのバイナリデータに変換します。
    -   引数: `audioData`: オーディオデータ、`sampleRate`: サンプルレート、`numChannels`: チャンネル数。
    -   戻り値: WAVフォーマットの`Blob`または`ArrayBuffer`。
-   **`writeString` (src/wav.ts)**:
    -   役割: WAVファイルのヘッダ部に文字列データを書き込みます（例: "RIFF", "WAVE"など）。
    -   引数: `view`: `DataView`オブジェクト、`offset`: 書き込み開始オフセット、`s`: 書き込む文字列。
    -   戻り値: なし。
-   **`createWavBlobUrl` (src/wav.ts)**:
    -   役割: 生成されたWAVバイナリデータから、ダウンロード可能なBlob URLを作成します。
    -   引数: `wavBlob`: WAVバイナリデータを含む`Blob`オブジェクト。
    -   戻り値: Blob URL (文字列)。
-   **`handleInputChange` (src/synth.ts)**:
    -   役割: ユーザーがUIの入力フィールドを変更した際のイベントを処理し、アプリケーションの状態を更新します。
    -   引数: `event`: 変更イベントオブジェクト。
    -   戻り値: なし。
-   **`handleClick` (src/synth.ts)**:
    -   役割: ユーザーがUI要素をクリックした際のイベントを処理し、オーディオコンテキストの開始やその他のアクションをトリガーします。
    -   引数: `event`: クリックイベントオブジェクト。
    -   戻り値: なし。

## 関数呼び出し階層ツリー
```
- for (src/filter.test.ts)
  - generateSawtooth ()
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
      - centsToRatio ()
      - getFilterParams ()
      - renderAudio ()
      - playAudio ()
      - updateUIFields ()
      - init ()
      - scheduleNextPlay ()
      - updateStatusDisplay ()
      - dispose ()
      - generateWav ()
      - createWavBlobUrl ()
  - writeString ()
- if (src/index.ts)
- handleInputChange (src/synth.ts)
- handleClick (src/synth.ts)

---
Generated at: 2026-01-05 07:03:52 JST
