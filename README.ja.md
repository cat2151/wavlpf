# wavlpf

TypeScriptとRust WASMで実装されたローパスフィルター（LPF）付きシンプルソフトウェアシンセサイザー

## デモ

https://cat2151.github.io/wavlpf/

※このドキュメントは仮で、取り急ぎLLMで生成しました。今後修正します

## 機能

- **デュアル信号プロセッサ**: TypeScriptまたはRust WASM実装を選択可能
  - ミリ秒精度でのリアルタイムパフォーマンス比較
  - 正確なベンチマークのための同一オーディオ処理アルゴリズム
- **220Hz波形ジェネレーター**: ノコギリ波またはパルス波、デューティー比設定可能
- **Biquad LPFフィルター**: マウス制御によるインタラクティブなフィルター
  - X軸: カットオフ周波数（20Hz - 設定可能な最大値）
  - Y軸: レゾナンスQ値（0.5 - 設定可能な最大値、反転: 上 = 高、下 = 低）
  - 設定可能なカットオフ減衰（HzまたはCent/ミリ秒）
- **非リアルタイムレンダリング**: WebAudio非依存の信号処理
- **設定可能なオーディオバッファ**: BPMとビート基準のオーディオ生成タイミング
- **WAV生成**: 処理済みオーディオをWAVフォーマットに変換
- **Tone.js統合**: クリーンなオーディオ再生
- **設定の永続化**: 設定をJSONファイルでインポート/エクスポート

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
- Rustとwasm-pack（WASMモジュールのビルド用）

Rustとwasm-packのインストール:
```bash
# Rustのインストール
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# wasm-packのインストール
cargo install wasm-pack
```

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

WASMモジュールとアプリケーション全体をビルド:

```bash
# WASMモジュールのみビルド
npm run build:wasm

# すべてをビルド（WASM + TypeScript + Vite本番バンドル）
npm run build
```

TypeScriptの型チェック、Rust WASMモジュールのビルド、Viteで本番用バンドルを作成します。

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
3. **信号プロセッサを選択**: ドロップダウンからTypeScriptまたはRust WASMを選択
4. **パラメータを設定**:
   - 波形タイプ: ノコギリ波またはパルス波
   - デューティー比: パルス波用（0-100%）
   - BPMとビート: オーディオ生成タイミングを制御
   - Q最大値: 最大レゾナンス値
   - カットオフ周波数最大値: 最大カットオフ周波数
   - 減衰単位: HzまたはCent
   - 減衰レート: ミリ秒あたりの減衰率
5. マウスを動かしてリアルタイムでフィルターパラメータを制御:
   - **水平位置（X）**: カットオフ周波数を制御（20Hz - 最大値）
   - **垂直位置（Y）**: レゾナンス/Q値を制御（0.5 - 最大値、反転: 上 = 高、下 = 低）
6. **生成時間**表示を確認してプロセッサのパフォーマンスを比較
7. BPMとビート設定に基づいて生成される新しいオーディオを聴く

## アーキテクチャ

### 信号処理（WebAudio非依存）

#### TypeScript実装
- `src/oscillator.ts`: ノコギリ波とパルス波ジェネレーター
- `src/filter.ts`: RBJ Audio EQ Cookbook公式を使用したBiquad LPF実装
- `src/wav.ts`: WAVファイルフォーマット生成

#### Rust WASM実装
- `wasm-audio/src/lib.rs`: Rustによる完全な信号処理パイプライン
  - オシレーター生成（ノコギリ波、パルス波）
  - TypeScriptと同じアルゴリズムのBiquad LPFフィルター
  - カットオフ減衰を含むオーディオレンダリング
- `wasm-audio/pkg/`: 生成されたWASMバインディング

#### 統合
- `src/wasmAudio.ts`: WASMモジュールのTypeScriptラッパー
  - 動的WASMロード
  - エラー時のTypeScript実装へのフォールバック

### アプリケーション

- `src/synth.ts`: マウストラッキング、プロセッサ選択、オーディオ再生を含むメインシンセサイザーロジック
- `src/settings.ts`: 設定の永続化（localStorageとJSONインポート/エクスポート）
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
