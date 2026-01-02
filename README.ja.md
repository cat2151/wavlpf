# wavlpf

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
