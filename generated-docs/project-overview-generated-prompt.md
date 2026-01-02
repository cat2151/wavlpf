Last updated: 2026-01-03


# プロジェクト概要生成プロンプト（来訪者向け）

## 生成するもの：
- projectを3行で要約する
- プロジェクトで使用されている技術スタックをカテゴリ別に整理して説明する
- プロジェクト全体のファイル階層ツリー（ディレクトリ構造を図解）
- プロジェクト全体のファイルそれぞれの説明
- プロジェクト全体の関数それぞれの説明
- プロジェクト全体の関数の呼び出し階層ツリー

## 生成しないもの：
- Issues情報（開発者向け情報のため）
- 次の一手候補（開発者向け情報のため）
- ハルシネーションしそうなもの（例、存在しない機能や計画を勝手に妄想する等）

## 出力フォーマット：
以下のMarkdown形式で出力してください：

```markdown
# Project Overview

## プロジェクト概要
[以下の形式で3行でプロジェクトを要約]
- [1行目の説明]
- [2行目の説明]
- [3行目の説明]

## 技術スタック
[使用している技術をカテゴリ別に整理して説明]
- フロントエンド: [フロントエンド技術とその説明]
- 音楽・オーディオ: [音楽・オーディオ関連技術とその説明]
- 開発ツール: [開発支援ツールとその説明]
- テスト: [テスト関連技術とその説明]
- ビルドツール: [ビルド・パース関連技術とその説明]
- 言語機能: [言語仕様・機能とその説明]
- 自動化・CI/CD: [自動化・継続的統合関連技術とその説明]
- 開発標準: [コード品質・統一ルール関連技術とその説明]

## ファイル階層ツリー
```
[プロジェクトのディレクトリ構造をツリー形式で表現]
```

## ファイル詳細説明
[各ファイルの役割と機能を詳細に説明]

## 関数詳細説明
[各関数の役割、引数、戻り値、機能を詳細に説明]

## 関数呼び出し階層ツリー
```
[関数間の呼び出し関係をツリー形式で表現]
```
```


以下のプロジェクト情報を参考にして要約を生成してください：

## プロジェクト情報
名前: wavlpf
説明: # wavlpf

TypeScriptで実装されたローパスフィルター（LPF）付きシンプルソフトウェアシンセサイザー

## デモ

https://cat2151.github.io/wavlpf/

※このドキュメントは仮で、取り急ぎLLMで生成しました。今後修正します

## 機能

- **220Hzノコギリ波ジェネレーター**: 純粋な信号処理実装
- **Biquad LPFフィルター**: マウス制御によるインタラクティブなフィルター
  - X軸: カットオフ周波数（20Hz - 4000Hz）
  - Y軸: レゾナンスQ値（0.5 - 16.0、反転: 上 = 高、下 = 低）
  - 1ミリ秒あたり1Hzの自動カットオフ減衰
- **非リアルタイムレンダリング**: WebAudio非依存の信号処理
- **250msオーディオバッファ**: 250msごとに新しいオーディオを生成
- **WAV生成**: 処理済みオーディオをWAVフォーマットに変換
- **Tone.js統合**: クリーンなオーディオ再生

## 関連ドキュメント

### cat-oscilloscope統合調査

**🌟 推奨** - [CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md](CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md) - **ベストプラクティス重視の包括的な分析**（日本語）

**参考資料**:
- [CAT_OSCILLOSCOPE_INTEGRATION.md](CAT_OSCILLOSCOPE_INTEGRATION.md) - 最小変更アプローチ（参考用）
- [ARCHITECTURE_DIAGRAMS.md](ARCHITECTURE_DIAGRAMS.md) - アーキテクチャ図
- [IMPLEMENTATION_EXAMPLES.md](IMPLEMENTATION_EXAMPLES.md) - 実装例

### 開発ガイド

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - 開発フレームワークとテスト戦略

## はじめに

開発フレームワークとテスト戦略の詳細については、[DEVELOPMENT.md](DEVELOPMENT.md)を参照してください。

波形可視化の統合については、[CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md](CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md)を参照してください。

### 前提条件

- Node.js（v14以上）
- npm

### インストール

```bash
npm install
```

### 開発

ホットモジュールリプレースメント付きの開発サーバーを起動:

```bash
npm run dev
```

これにより、即時HMR対応のVite開発サーバーが起動します。ブラウザはhttp://localhost:8080で自動的に開きます。

### ビルド

```bash
npm run build
```

TypeScriptの型チェックを実行し、Viteで本番用バンドルをビルドします。

### 本番ビルドのプレビュー

```bash
npm run preview
```

デプロイ前に本番ビルドをローカルで確認します。

### テスト

テストスイートを実行:

```bash
npm test         # ウォッチモード
npm run test:run # 一度だけ実行
npm run test:ui  # ビジュアルテストランナー
npm run coverage # カバレッジレポート生成
```

### 実行（レガシー）

注意: `serve`コマンドは現在Viteのプレビューサーバーを使用しています:

```bash
npm run serve
```

その後、ブラウザでhttp://localhost:8080を開きます（開発には`npm run dev`を使用してください）。

## 使い方

1. ブラウザでアプリケーションを開く
2. ページ上の任意の場所をクリックしてオーディオコンテキストを開始
3. マウスを動かしてフィルターパラメータを制御:
   - **水平位置（X）**: カットオフ周波数を制御（20Hz - 4000Hz）
   - **垂直位置（Y）**: レゾナンス/Q値を制御（0.5 - 16.0、反転: 上 = 高、下 = 低）
4. 現在のフィルター設定で250msごとに生成される新しいオーディオを聴く

## アーキテクチャ

### 信号処理（WebAudio非依存）

- `src/oscillator.ts`: ノコギリ波ジェネレーター
- `src/filter.ts`: RBJ Audio EQ Cookbook公式を使用したBiquad LPF実装
- `src/wav.ts`: WAVファイルフォーマット生成

### アプリケーション

- `src/synth.ts`: マウストラッキングとオーディオ再生を含むメインシンセサイザーロジック
- `src/index.ts`: エントリーポイント
- `index.html`: Webインターフェース

## デプロイ

アプリケーションは`main`ブランチに変更がプッシュされると自動的にGitHub Pagesにデプロイされます。デプロイワークフロー:

1. Node.js依存関係をインストール
2. TypeScriptをJavaScriptにビルド
3. `index.html`、`dist/`、および`node_modules/`から必要なファイルをデプロイディレクトリにコピー
4. GitHub Pagesにデプロイ

ワークフローは`.github/workflows/deploy.yml`で定義されています。

## ライセンス

MIT


依存関係:
{
  "dependencies": {
    "tone": "^14.7.77"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@vitest/ui": "^4.0.16",
    "happy-dom": "^20.0.11",
    "typescript": "^5.3.3",
    "vite": "^7.3.0",
    "vitest": "^4.0.16"
  }
}

## ファイル階層ツリー
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

## ファイル詳細分析
**index.html** (171行, 4205バイト)
  - 関数: なし
  - インポート: なし

**src/filter.test.ts** (137行, 4050バイト)
  - 関数: for
  - インポート: vitest, ./filter

**src/filter.ts** (87行, 2249バイト)
  - 関数: constructor
  - インポート: なし

**src/index.ts** (21行, 450バイト)
  - 関数: if
  - インポート: ./synth

**src/oscillator.test.ts** (69行, 2262バイト)
  - 関数: for
  - インポート: vitest, ./oscillator

**src/oscillator.ts** (21行, 605バイト)
  - 関数: generateSawtooth, for
  - インポート: なし

**src/synth.ts** (388行, 10821バイト)
  - 関数: getDuration, readNumericParameter, readParameters, centsToRatio, getFilterParams, renderAudio, playAudio, init, scheduleNextPlay, updateStatusDisplay, dispose, handleInputChange, handleClick, if, for, catch
  - インポート: ./oscillator, ./filter, ./wav

**src/wav.test.ts** (172行, 5428バイト)
  - 関数: なし
  - インポート: vitest, ./wav

**src/wav.ts** (76行, 2362バイト)
  - 関数: generateWav, writeString, createWavBlobUrl, if, for
  - インポート: なし

**vite.config.ts** (42行, 790バイト)
  - 関数: なし
  - インポート: vite

## 関数呼び出し階層
- for (src/filter.test.ts)
  - generateSawtooth ()
  - getDuration (src/synth.ts)
    - readNumericParameter ()
      - readParameters ()
      - centsToRatio ()
      - getFilterParams ()
      - renderAudio ()
      - playAudio ()
      - init ()
      - scheduleNextPlay ()
      - updateStatusDisplay ()
      - dispose ()
      - catch ()
      - generateWav ()
      - createWavBlobUrl ()
  - writeString ()
- if (src/index.ts)
- handleInputChange (src/synth.ts)
- handleClick (src/synth.ts)


## プロジェクト構造（ファイル一覧）
ARCHITECTURE_DIAGRAMS.md
CAT_OSCILLOSCOPE_INTEGRATION.md
CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md
DEVELOPMENT.md
IMPLEMENTATION_EXAMPLES.md
README.ja.md
README.md
SUMMARY.md
index.html
issue-notes/21.md
package-lock.json
package.json
src/filter.test.ts
src/filter.ts
src/index.ts
src/oscillator.test.ts
src/oscillator.ts
src/synth.ts
src/wav.test.ts
src/wav.ts
tsconfig.json
vite.config.ts

上記の情報を基に、プロンプトで指定された形式でプロジェクト概要を生成してください。
特に以下の点を重視してください：
- 技術スタックは各カテゴリごとに整理して説明
- ファイル階層ツリーは提供された構造をそのまま使用
- ファイルの説明は各ファイルの実際の内容と機能に基づく
- 関数の説明は実際に検出された関数の役割に基づく
- 関数呼び出し階層は実際の呼び出し関係に基づく


---
Generated at: 2026-01-03 07:03:12 JST
