# GitHub Pagesデプロイ検証ガイド

## 概要

このドキュメントは、wavlpfアプリケーションがGitHub Pagesに正しくデプロイされ、動作していることを確認する方法を説明します。

## 背景

Issue #76とIssue #78では、ローカル環境やCI環境での動作確認は行われたものの、実際のGitHub Pages環境での動作確認が不足していたため、問題が完全に解決されていないことが後から判明しました。

このような問題を防ぐため、GitHub Pagesへのデプロイ後は必ずヘッドレスブラウザを使用した自動テストを実行することが必須となりました。

## 検証スクリプトの使用方法

### 前提条件

Playwrightをインストールする必要があります：

```bash
npm install --save-dev playwright
npx playwright install chromium
```

### GitHub Pagesの検証（本番環境）

デプロイワークフローが完了した後、以下のコマンドで検証を実行します：

```bash
npm run verify-deployment
```

このコマンドは `https://cat2151.github.io/wavlpf/` にアクセスし、以下の項目を確認します：

1. ページが正常にロードされること
2. 主要な要素（アプリケーションルート、オシロスコープキャンバス、コントロールUI）が存在すること
3. WASM初期化が成功すること
4. コンソールエラーがないこと

### ローカルビルドの検証

ローカルでビルドしたアプリケーションを検証する場合：

```bash
# まずビルドを実行
npm run build

# プレビューサーバーを起動（別のターミナルで）
npm run preview

# 検証を実行
npm run verify-deployment:local
```

### カスタムURLの検証

任意のURLを検証したい場合：

```bash
node scripts/verify-deployment.js <URL>
```

例：
```bash
node scripts/verify-deployment.js http://localhost:8080
node scripts/verify-deployment.js https://example.com/wavlpf/
```

## 検証項目の詳細

### 1. ページのロード

- HTTPステータスコードが200であること
- ページが30秒以内にロードされること
- ネットワークアイドル状態になること

### 2. 主要な要素の存在確認

以下の要素が存在することを確認します：

- `#app`: アプリケーションのルート要素
- `canvas`: オシロスコープの描画キャンバス
- `.controls`: コントロールUI

### 3. WASM初期化の確認

- コンソールログからWASM初期化メッセージを確認
- WASMエラーがないことを確認
- "Failed to update oscilloscope"などのエラーがないこと

### 4. コンソールエラーのチェック

- JavaScriptエラーがないこと
- ページエラーがないこと

## デバッグ機能

### 詳細ログの有効化

すべてのコンソールメッセージを表示する場合：

```bash
VERBOSE=1 npm run verify-deployment
```

### スクリーンショットの保存

検証時のページのスクリーンショットを保存する場合：

```bash
SAVE_SCREENSHOT=screenshot.png npm run verify-deployment
```

## CI/CD統合

### GitHub Actionsでの使用

デプロイワークフローの最後に検証ステップを追加することを推奨します：

```yaml
- name: Verify deployment
  run: |
    npm install --save-dev playwright
    npx playwright install chromium
    npm run verify-deployment
```

注意：デプロイが完了してからGitHub Pagesに反映されるまで数分かかる場合があるため、適切な待機時間を設けてください。

## トラブルシューティング

### Playwrightのインストールに失敗する

```bash
# キャッシュをクリアして再インストール
npm cache clean --force
npm install --save-dev playwright
npx playwright install chromium
```

### "Failed to update oscilloscope"エラーが出る

これはIssue #76で報告された問題です。以下を確認してください：

1. WASMファイルが正しく配置されているか（`public/wasm/`ディレクトリ）
2. postinstallスクリプトが正常に実行されたか
3. ビルド時にWASMファイルがdistディレクトリにコピーされているか

### タイムアウトエラーが出る

ネットワークが遅い場合やサーバーの応答が遅い場合に発生します：

```bash
# タイムアウトを延長（スクリプトを編集）
# page.goto()のtimeoutオプションを60000に変更
```

## 関連ドキュメント

- [Issue #76解決レポート](../issue-notes/76.md)
- [Issue #78解決レポート](../issue-notes/78.md)
- [copilot-instructions.md](../.github/copilot-instructions.md) - AI agentへのガイドライン

## まとめ

GitHub Pagesへのデプロイ後は、必ず以下の手順を実行してください：

1. ✅ デプロイワークフローが成功したことを確認
2. ✅ `npm run verify-deployment`を実行
3. ✅ すべてのテストが成功することを確認
4. ✅ 問題がある場合は、issue-notesに詳細を記録

この検証プロセスにより、ローカル環境やCI環境では動作するが本番環境では動作しないという問題を防ぐことができます。
