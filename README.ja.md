# wavlpf

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://deepwiki.com/cat2151/wavlpf"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
  <a href="https://cat2151.github.io/wavlpf/"><img src="https://img.shields.io/badge/🌐-Live_Demo-green.svg" alt="Live Demo"></a>
  <a href="https://github.com/cat2151/wavlpf/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/cat2151/wavlpf/ci.yml?branch=main&label=CI" alt="CI Status"></a>
</p>

Rust WASMで実装されたローパスフィルター（LPF）付きシンプルソフトウェアシンセサイザー

## デモ

https://cat2151.github.io/wavlpf/

※このドキュメントは仮で、取り急ぎLLMで生成しました。今後修正します

## 機能

- **Rust WASM信号プロセッサ**: 高速なDSP処理をRustで実装
  - ミリ秒精度でのパフォーマンス測定
  - ネイティブからも利用可能なRustクレートとして実装
- **220Hz波形ジェネレーター**: ノコギリ波またはパルス波、デューティー比設定可能
- **Biquadフィルター**: マウス制御によるインタラクティブなフィルター
  - 複数のフィルタータイプ: LPF、HPF、BPF、Notch、APF、Low Shelf、High Shelf
  - X軸: カットオフ周波数（20Hz - 設定可能な最大値）
  - Y軸: レゾナンスQ値（0.5 - 設定可能な最大値、反転: 上 = 高、下 = 低）
  - 設定可能なカットオフ減衰（HzまたはCent/ミリ秒）
- **波形ビジュアライゼーション**: [cat-oscilloscope](https://github.com/cat2151/cat-oscilloscope)を使用したリアルタイムオシロスコープ表示
  - Rust/WASMによる高性能ビジュアライゼーション
  - Float32Arrayバッファの可視化
  - ループ再生対応
- **非リアルタイムレンダリング**: WebAudio非依存の信号処理
- **設定可能なオーディオバッファ**: BPMとビート基準のオーディオ生成タイミング
- **WAV生成**: 処理済みオーディオをWAVフォーマットに変換
- **Tone.js統合**: クリーンなオーディオ再生
- **設定の永続化**: 設定をJSONファイルでインポート/エクスポート

## 関連ドキュメント

### オシロスコープ統合

**📘 使用ガイド** - [docs/OSCILLOSCOPE_USAGE.md](docs/OSCILLOSCOPE_USAGE.md) - **現在の実装と使用方法**（日本語）

**技術詳細**:
- [docs/CAT_OSCILLOSCOPE_WASM_SETUP.md](docs/CAT_OSCILLOSCOPE_WASM_SETUP.md) - WASMセットアップの詳細

### 開発ガイド

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - 開発フレームワークとテスト戦略

## はじめに

開発フレームワークとテスト戦略の詳細については、[DEVELOPMENT.md](DEVELOPMENT.md)を参照してください。

波形可視化については、[docs/OSCILLOSCOPE_USAGE.md](docs/OSCILLOSCOPE_USAGE.md)を参照してください。

### 前提条件

- Node.js（v14以上）
- npm
- Rustとwasm-pack（WASMモジュールのビルド用）

#### Rustとwasm-packのインストール

**方法1: 自動インストールスクリプト（推奨）**

プロジェクトに用意されているスクリプトを使用してwasm-packをインストール:

```bash
# wasm-packをインストール
bash scripts/install-wasm-pack.sh
```

このスクリプトは:
- Rustとcargoがインストールされているか確認
- wasm-packが既にインストールされているか確認
- cargo経由でwasm-packをインストール（ネットワーク制限がある環境でも動作）
- インストールの成功を確認

**方法2: 手動インストール**

Rustとwasm-packを手動でインストール:

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

**⚠️ wasm-optに関する厳重な注意 ⚠️**: 
- ビルドはデフォルトで`wasm-opt`（binaryenから）を使用してWASMの最適化を行います
- **これはCI環境を含むすべての環境で正常に動作することが検証済みです**
- **`wasm-audio/Cargo.toml`で`wasm-opt = false`を設定することは厳重に禁止されています**
- 過去にAI agentが2回、根拠のない憶測で`wasm-opt = false`を追加する誤りを犯しました
- ownerが検証した結果、wasm-optは有効で問題ないことが確認されています
- デフォルト設定（wasm-opt有効）を変更しないでください
- デバッグ目的でローカルで一時的に無効化する場合も、その変更をコミットしないでください

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
3. **パラメータを設定**:
   - 波形タイプ: ノコギリ波またはパルス波
   - デューティー比: パルス波用（0-100%）
   - BPMとビート: オーディオ生成タイミングを制御
   - Q最大値: 最大レゾナンス値
   - カットオフ周波数最大値: 最大カットオフ周波数
   - 減衰単位: HzまたはCent
   - 減衰レート: ミリ秒あたりの減衰率
4. マウスを動かしてリアルタイムでフィルターパラメータを制御:
   - **水平位置（X）**: カットオフ周波数を制御（20Hz - 最大値）
   - **垂直位置（Y）**: レゾナンス/Q値を制御（0.5 - 最大値、反転: 上 = 高、下 = 低）
5. **生成時間**表示を確認してパフォーマンスを監視
6. BPMとビート設定に基づいて生成される新しいオーディオを聴く

## アーキテクチャ

### 信号処理（WebAudio非依存）

#### Rust WASM実装
- `wasm-audio/src/lib.rs`: Rustによる完全な信号処理パイプライン
  - オシレーター生成（ノコギリ波、パルス波）
  - RBJ Audio EQ Cookbook公式を使用したBiquad LPFフィルター
  - カットオフ減衰を含むオーディオレンダリング
- `wasm-audio/pkg/`: 生成されたWASMバインディング

#### 統合
- `src/wasmAudio.ts`: WASMモジュールのTypeScriptラッパー
  - 動的WASMロード
  - パフォーマンス測定

### アプリケーション

- `src/synth.ts`: マウストラッキング、オーディオ再生を含むメインシンセサイザーロジック
- `src/wav.ts`: WAVファイルフォーマット生成
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
