# Scripts Directory

このディレクトリには、wavlpfプロジェクトのビルドとデプロイに関連するスクリプトが含まれています。

## スクリプト一覧

### setup-cat-oscilloscope-wasm.js

**目的**: cat-oscilloscopeのWASMファイルをpublicディレクトリにコピーする

**実行タイミング**: `npm install`後に自動実行（postinstallスクリプト）

**処理内容**:
- `node_modules/cat-oscilloscope/dist/wasm/` から `public/wasm/` にWASMファイルをコピー
- Viteが開発時およびビルド時にWASMファイルを正しく配信できるようにする

**詳細**: [Issue #76解決レポート](../issue-notes/76.md)を参照

### verify-deployment.js

**目的**: GitHub Pagesにデプロイされたアプリケーションの動作を検証する

**実行方法**:
```bash
# GitHub Pages（本番環境）の検証
npm run verify-deployment

# ローカルビルドの検証
npm run verify-deployment:local

# カスタムURLの検証
node scripts/verify-deployment.js <URL>
```

**検証項目**:
1. ページが正常にロードされること
2. 主要な要素（#app、canvas、.controls）が存在すること
3. WASM初期化が成功すること
4. コンソールエラーがないこと

**前提条件**:
```bash
npm install --save-dev playwright
npx playwright install chromium
```

**詳細**: [デプロイ検証ガイド](../docs/DEPLOYMENT_VERIFICATION.md)を参照

### test-waveform-screenshot.js

**目的**: 波形ビジュアライズ機能をヘッドレスブラウザでテストし、スクリーンショットを撮影する

**実行方法**:
```bash
# GitHub Pages（本番環境）でテスト（デフォルト）
npm run test:waveform-screenshot

# ローカル開発サーバーでテスト
npm run test:waveform-screenshot:local

# カスタムURLでテスト
node scripts/test-waveform-screenshot.js <URL>

# スクリーンショットの保存先を指定
SCREENSHOT_PATH=my-screenshot.png npm run test:waveform-screenshot
```

**検証項目**:
1. ページが正常にロードされること
2. オシロスコープキャンバスが存在すること
3. 画面クリックで音声再生が開始されること
4. 波形が正しくキャンバスに描画されること
5. スクリーンショットを自動撮影

**前提条件**:
```bash
npm install --save-dev playwright
npx playwright install chromium
```

**注意**: デフォルトではGitHub Pagesの本番環境をテストします。ローカル開発サーバーをテストする場合は`test:waveform-screenshot:local`を使用してください。

**詳細**: [Issue #94](../issue-notes/94.md) - 波形ビジュアライズのレイアウト問題の調査

## 使用方法

### 開発時

通常の開発では、これらのスクリプトを直接実行する必要はありません：

- `setup-cat-oscilloscope-wasm.js` は `npm install` 時に自動実行されます
- `verify-deployment.js` はデプロイ後の検証時にのみ使用します
- `test-waveform-screenshot.js` は波形ビジュアライズのデバッグやレイアウト問題の調査時に使用します

### デプロイ後の検証

GitHub Pagesへのデプロイが完了したら、必ず検証スクリプトを実行してください：

```bash
npm run verify-deployment
```

これにより、実際の本番環境でアプリケーションが正常に動作していることを確認できます。

### デバッグ

問題が発生した場合のデバッグオプション：

```bash
# 詳細ログを有効化
VERBOSE=1 npm run verify-deployment

# スクリーンショットを保存
SAVE_SCREENSHOT=screenshot.png npm run verify-deployment
```

## トラブルシューティング

### setup-cat-oscilloscope-wasm.js が失敗する

**症状**: `npm install`時にエラーが発生

**原因**: cat-oscilloscopeが正しくインストールされていない、またはWASMファイルが存在しない

**解決方法**:
```bash
# cat-oscilloscopeを再インストール
npm install --no-save git+https://github.com/cat2151/cat-oscilloscope.git
npm install
```

### verify-deployment.js が失敗する

**症状**: 検証スクリプトがエラーで終了する

**原因**: Playwrightがインストールされていない、またはブラウザがインストールされていない

**解決方法**:
```bash
# Playwrightをインストール
npm install --save-dev playwright
npx playwright install chromium
```

## 関連ドキュメント

- [Issue #76解決レポート](../issue-notes/76.md) - WASM設定の問題
- [Issue #78解決レポート](../issue-notes/78.md) - binaryen/wasm-optの問題
- [Issue #80解決レポート](../issue-notes/80.md) - デプロイ検証の問題
- [デプロイ検証ガイド](../docs/DEPLOYMENT_VERIFICATION.md) - 包括的なガイド
- [copilot-instructions.md](../.github/copilot-instructions.md) - AI agentへのガイドライン
