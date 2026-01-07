# wavlpf

Rust WASMで実装されたローパスフィルター（LPF）付きシンプルソフトウェアシンセサイザー

## デモ

https://cat2151.github.io/wavlpf/

※このドキュメントは仮で、取り急ぎLLMで生成しました。今後修正します

## 機能

- **Rust WASM信号プロセッサ**: 高速なDSP処理をRustで実装
  - ミリ秒精度でのパフォーマンス測定
  - ネイティブからも利用可能なRustクレートとして実装
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
