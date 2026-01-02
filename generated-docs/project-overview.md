Last updated: 2026-01-03

# Project Overview

## プロジェクト概要
- TypeScriptで実装された、ローパスフィルター（LPF）を搭載したシンプルなソフトウェアシンセサイザーです。
- 純粋な信号処理により220Hzのノコギリ波を生成し、マウス操作でカットオフ周波数とQ値を調整できるLPFを提供します。
- 生成されたオーディオは250msごとにバッファリングされ、WAV形式での出力やTone.jsによる再生が可能です。

## 技術スタック
使用している技術をカテゴリ別に整理して説明
- フロントエンド:
    - Vite: 高速な開発サーバーとモダンなビルドプロセスを提供し、HMR (Hot Module Replacement) をサポートします。
    - HTML/CSS/JavaScript: 標準的なWeb技術でユーザーインターフェースを構築しています。
- 音楽・オーディオ:
    - Tone.js: ウェブ上で音楽アプリケーションを構築するためのフレームワークで、クリーンなオーディオ再生を統合しています。
    - Biquad LPFフィルター: RBJ Audio EQ Cookbook公式に基づき、信号処理でローパスフィルターを実装しています。
    - ノコギリ波ジェネレーター: 純粋な信号処理として220Hzのノコギリ波を生成します。
    - WAVファイルフォーマット: 処理されたオーディオデータをWAV形式で生成・出力します。
- 開発ツール:
    - Node.js: JavaScriptランタイム環境で、開発環境の基盤として利用されます (v14以上が前提)。
    - npm: Node.jsのパッケージマネージャーで、プロジェクトの依存関係の管理に使用されます。
    - TypeScript: JavaScriptに静的型付けを追加するプログラミング言語で、大規模なアプリケーション開発を支援します。
- テスト:
    - Vitest: モダンなJavaScript/TypeScriptプロジェクト向けのテストフレームワークで、高速なテスト実行、ウォッチモード、UIランナーなどを提供します。
    - @vitest/ui: Vitestのテストをブラウザで視覚的に実行・確認するためのユーザーインターフェースです。
    - happy-dom: テスト環境でDOM操作をシミュレートするための軽量な実装です。
- ビルドツール:
    - Vite: 高速なビルドプロセスとバンドル機能を提供し、TypeScriptのコンパイルを含め本番用アプリケーションを効率的に構築します。
- 言語機能:
    - TypeScript: 静的型付け、クラス、インターフェースなどの高度な言語機能を提供し、堅牢なコードベースを構築します。
- 自動化・CI/CD:
    - GitHub Pages: `main`ブランチへのプッシュをトリガーに、ビルドされたアプリケーションを自動的にウェブホスティングするCI/CDパイプラインを提供します。
- 開発標準:
    - (特になし)

## ファイル階層ツリー
```
📄 .gitignore
📖 ARCHITECTURE_DIAGRAMS.md
📖 CAT_OSCILLOSCOPE_INTEGRATION.md
📖 CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md
📖 DEVELOPMENT.md
📖 IMPLEMENTATION_EXAMPLES.md
📄 LICENSE
📖 README.ja.md
📖 README.md
📖 SUMMARY.md
📄 _config.yml
📁 generated-docs/
🌐 index.html
📁 issue-notes/
  📖 21.md
📊 package-lock.json
📊 package.json
📁 src/
  📘 filter.test.ts
  📘 filter.ts
  📘 index.ts
  📘 oscillator.test.ts
  📘 oscillator.ts
  📘 synth.ts
  📘 wav.test.ts
  📘 wav.ts
📊 tsconfig.json
📘 vite.config.ts
```

## ファイル詳細説明
- **`.gitignore`**: Gitによるバージョン管理から除外するファイルやディレクトリを指定します。
- **`ARCHITECTURE_DIAGRAMS.md`**: プロジェクトのアーキテクチャ図に関するドキュメントです。
- **`CAT_OSCILLOSCOPE_INTEGRATION.md`**: オシロスコープライブラリ統合に関する参考資料です。
- **`CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md`**: オシロスコープライブラリ統合のベストプラクティスを解説した推奨ドキュメントです。
- **`DEVELOPMENT.md`**: 開発フレームワークとテスト戦略に関する詳細なガイドです。
- **`IMPLEMENTATION_EXAMPLES.md`**: 実装例に関するドキュメントです。
- **`LICENSE`**: プロジェクトのライセンス情報（MITライセンス）を記載しています。
- **`README.ja.md`**: プロジェクトの日本語版概要ドキュメントです。
- **`README.md`**: プロジェクトの概要、機能、使い方などを説明する主要なドキュメントです。
- **`SUMMARY.md`**: プロジェクトの簡単な要約を提供します。
- **`_config.yml`**: GitHub PagesのJekyll設定ファイルです。
- **`generated-docs/`**: 自動生成されたドキュメントを格納するディレクトリです。
- **`index.html`**: アプリケーションのウェブインターフェースのエントリーポイントとなるHTMLファイルです。ユーザー操作やオーディオ再生のためのDOM要素を定義します。
- **`issue-notes/`**: 開発中の課題やメモを格納するディレクトリです。
    - **`issue-notes/21.md`**: 特定の課題（Issue #21）に関するメモドキュメントです。
- **`package-lock.json`**: `npm install`時に生成され、プロジェクトの依存関係ツリーの正確なバージョンとハッシュを記録します。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、説明など）と、依存関係、開発スクリプトなどを定義するファイルです。
- **`src/`**: ソースコードを格納するディレクトリです。
    - **`src/filter.test.ts`**: `src/filter.ts`で定義されたBiquad LPFの機能を検証するためのテストファイルです。
    - **`src/filter.ts`**: Biquadローパスフィルター（LPF）の実装を提供します。RBJ Audio EQ Cookbookの公式に基づいており、カットオフ周波数とQ値でフィルター処理を行います。
    - **`src/index.ts`**: アプリケーションのメインエントリーポイントです。`src/synth.ts`をインポートし、ウェブページの読み込みと初期化を処理します。
    - **`src/oscillator.test.ts`**: `src/oscillator.ts`で定義されたノコギリ波ジェネレーターの機能を検証するためのテストファイルです。
    - **`src/oscillator.ts`**: 220Hzのノコギリ波を生成する純粋な信号処理ロジックを実装しています。
    - **`src/synth.ts`**: メインのシンセサイザーロジックを管理します。マウストラッキングによるフィルターパラメータ制御、オーディオレンダリング、Tone.jsによる再生スケジューリング、ステータス表示の更新、イベントハンドリングなど、アプリケーションの中核機能を担当します。
    - **`src/wav.test.ts`**: `src/wav.ts`で定義されたWAVファイル生成ロジックの機能を検証するためのテストファイルです。
    - **`src/wav.ts`**: 処理されたオーディオデータを標準的なWAVファイルフォーマットに変換し、ダウンロード可能なBlob URLを生成する機能を提供します。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイルです。コンパイルオプションや対象となるファイルなどを定義します。
- **`vite.config.ts`**: Viteの設定ファイルです。開発サーバーの挙動やビルドオプションなどをカスタマイズするために使用されます。

## 関数詳細説明
- **`constructor (src/filter.ts)`**:
    - 役割: `BiquadFilter`クラスのインスタンスを初期化します。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: フィルターの内部状態（係数など）を初期設定します。
- **`generateSawtooth (src/oscillator.ts)`**:
    - 役割: 指定された周波数でノコギリ波のオーディオサンプルを生成します。
    - 引数: `frequency`: 生成するノコギリ波の周波数（Hz）。`sampleRate`: サンプリングレート（Hz）。`duration`: 生成するオーディオの長さ（秒）。
    - 戻り値: `Float32Array`: 生成されたノコギリ波のオーディオサンプル配列。
    - 機能: 純粋な信号処理により、指定された期間とサンプリングレートに基づいた220Hzのノコギリ波を計算し、配列として返します。
- **`getDuration (src/synth.ts)`**:
    - 役割: オーディオバッファのデュレーション（長さ）を取得します。
    - 引数: なし。
    - 戻り値: `number`: オーディオバッファの長さ（ミリ秒）。
    - 機能: 定義済みのオーディオバッファ長（250ms）を返します。
- **`readNumericParameter (src/synth.ts)`**:
    - 役割: 特定のHTML要素から数値パラメータを読み取ります。
    - 引数: `elementId`: パラメータを読み取るHTML要素のID。`defaultValue`: 読み取りに失敗した場合のデフォルト値。
    - 戻り値: `number`: 読み取られた数値。
    - 機能: 指定されたIDのHTML要素から数値データをパースして返します。
- **`readParameters (src/synth.ts)`**:
    - 役割: ユーザーインターフェースから複数のパラメータを読み取ります。
    - 引数: なし。
    - 戻り値: `object`: 読み取られたパラメータを含むオブジェクト。
    - 機能: カットオフ周波数、Q値、その他のシンセサイザー関連パラメータをHTML要素から抽出し、構造化されたオブジェクトとして返します。
- **`centsToRatio (src/synth.ts)`**:
    - 役割: セント値から周波数比に変換します。
    - 引数: `cents`: 変換するセント値。
    - 戻り値: `number`: 周波数比。
    - 機能: 音程のセント単位の差を、周波数の比率に変換する音楽理論に基づいた計算を行います。
- **`getFilterParams (src/synth.ts)`**:
    - 役割: マウス座標に基づいてフィルターのカットオフ周波数とレゾナンスQ値を計算します。
    - 引数: `mouseX`: マウスのX座標。`mouseY`: マウスのY座標。
    - 戻り値: `object`: カットオフ周波数とQ値を含むオブジェクト。
    - 機能: マウスの水平位置からカットオフ周波数（20Hz〜4000Hz）、垂直位置からレゾナンスQ値（0.5〜16.0）をマッピングし、フィルターパラメータを動的に決定します。
- **`renderAudio (src/synth.ts)`**:
    - 役割: 現在のフィルター設定に基づいてオーディオバッファをレンダリングします。
    - 引数: `filterCutoff`: フィルターのカットオフ周波数。`filterQ`: フィルターのQ値。
    - 戻り値: `Float32Array`: レンダリングされたオーディオサンプル配列。
    - 機能: `oscillator.ts`で生成されたノコギリ波を`filter.ts`のLPFで処理し、指定されたフィルターパラメータに基づいてオーディオバッファを非リアルタイムで生成します。
- **`playAudio (src/synth.ts)`**:
    - 役割: レンダリングされたオーディオをTone.jsを使用して再生します。
    - 引数: `audioBuffer`: 再生するオーディオサンプル配列。
    - 戻り値: `void`.
    - 機能: `renderAudio`で生成されたオーディオデータをTone.jsのAPIを通じてウェブ上で再生します。
- **`init (src/synth.ts)`**:
    - 役割: シンセサイザーアプリケーションを初期化し、イベントリスナーを設定します。
    - 引数: なし。
    - 戻り値: `void`.
    - 機能: マウスイベントリスナーの設定、Tone.jsの初期化、最初のオーディオバッファのスケジュールなど、アプリケーション起動時の主要な設定と処理を行います。
- **`scheduleNextPlay (src/synth.ts)`**:
    - 役割: 次のオーディオバッファの再生をスケジュールします。
    - 引数: なし。
    - 戻り値: `void`.
    - 機能: 250msごとに新しいオーディオを生成し再生するために、タイマーを設定し、`renderAudio`と`playAudio`を呼び出すプロセスを管理します。
- **`updateStatusDisplay (src/synth.ts)`**:
    - 役割: フィルターのカットオフ周波数とQ値をUIに表示します。
    - 引数: `filterCutoff`: 現在のカットオフ周波数。`filterQ`: 現在のQ値。
    - 戻り値: `void`.
    - 機能: 現在のフィルターパラメータ（カットオフ、Q値）をウェブページ上の指定された要素に更新して表示します。
- **`dispose (src/synth.ts)`**:
    - 役割: アプリケーションのリソースをクリーンアップします。
    - 引数: なし。
    - 戻り値: `void`.
    - 機能: イベントリスナーの削除やTone.jsコンテキストの停止など、アプリケーション終了時やリフレッシュ時にリソースを解放します。
- **`handleInputChange (src/synth.ts)`**:
    - 役割: UI入力要素の変更を処理します。
    - 引数: `event`: 変更イベント。
    - 戻り値: `void`.
    - 機能: ユーザーが入力フィールドを変更した際のイベントを捕捉し、必要に応じてアプリケーションの状態を更新します。
- **`handleClick (src/synth.ts)`**:
    - 役割: クリックイベントを処理します。
    - 引数: `event`: クリックイベント。
    - 戻り値: `void`.
    - 機能: ユーザーがページをクリックした際のイベント（オーディオコンテキストの開始など）を処理します。
- **`generateWav (src/wav.ts)`**:
    - 役割: オーディオサンプル配列からWAVファイルデータを生成します。
    - 引数: `samples`: オーディオサンプル配列。`sampleRate`: サンプリングレート。
    - 戻り値: `ArrayBuffer`: 生成されたWAVファイルのバイナリデータ。
    - 機能: 生のオーディオサンプルデータを受け取り、WAVファイルフォーマットのヘッダー情報を含めてバイナリデータを構築します。
- **`writeString (src/wav.ts)`**:
    - 役割: DataViewに文字列を書き込みます。
    - 引数: `view`: DataViewオブジェクト。`offset`: 書き込み開始オフセット。`str`: 書き込む文字列。
    - 戻り値: `void`.
    - 機能: WAVファイルのヘッダーなどで使用される文字列（例: "RIFF", "WAVE"）を、指定されたオフセットからバイナリデータとして書き込みます。
- **`createWavBlobUrl (src/wav.ts)`**:
    - 役割: 生成されたWAVファイルのArrayBufferからダウンロード可能なBlob URLを作成します。
    - 引数: `wavBuffer`: WAVファイルのArrayBufferデータ。
    - 戻り値: `string`: WAVファイルを指すBlob URL。
    - 機能: `generateWav`で作成されたバイナリデータから、ブラウザでダウンロード可能なURLを生成します。

## 関数呼び出し階層ツリー
```
- src/index.ts (アプリケーションエントリーポイント)
  - init (src/synth.ts)
    - scheduleNextPlay (src/synth.ts)
      - getFilterParams (src/synth.ts)
        - readParameters (src/synth.ts)
          - readNumericParameter (src/synth.ts)
        - centsToRatio (src/synth.ts)
      - renderAudio (src/synth.ts)
        - generateSawtooth (src/oscillator.ts)
        - (BiquadFilterのインスタンスメソッド呼び出し, src/filter.ts)
      - playAudio (src/synth.ts)
        - (Tone.jsライブラリ関数呼び出し)
      - updateStatusDisplay (src/synth.ts)
    - handleClick (src/synth.ts)
    - handleInputChange (src/synth.ts)
    - dispose (src/synth.ts)
- generateWav (src/wav.ts)
  - writeString (src/wav.ts)
- createWavBlobUrl (src/wav.ts)
  - generateWav (src/wav.ts)

---
Generated at: 2026-01-03 07:04:02 JST
