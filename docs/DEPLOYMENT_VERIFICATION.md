# GitHub Pagesデプロイ検証ガイド

## 概要

このドキュメントは、wavlpfアプリケーションがGitHub Pagesに正しくデプロイされ、動作していることを確認する方法を説明します。

## 背景

Issue #76とIssue #78では、ローカル環境やCI環境での動作確認は行われたものの、実際のGitHub Pages環境での動作確認が不足していたため、問題が完全に解決されていないことが後から判明しました。

このような問題を防ぐため、GitHub Pagesへのデプロイ後は必ずヘッドレスブラウザを使用した自動テストを実行することが必須となりました。

## GitHub Copilot Coding Agent での使用

GitHub Copilot Coding Agent が GitHub Pages にアクセスするには、allowlist への設定が必要です。

詳細は **[COPILOT_GITHUB_PAGES_ACCESS.md](COPILOT_GITHUB_PAGES_ACCESS.md)** を参照してください。

**設定URL**: `https://github.com/cat2151/wavlpf/settings/copilot/coding_agent/allowlist`

**追加するドメイン**: `cat2151.github.io`

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
# デフォルトではポート4173で起動します
npm run preview

# 検証を実行
npm run verify-deployment:local
```

**注意**: `verify-deployment:local`スクリプトは`http://localhost:4173`を使用します（Viteのデフォルトpreviewポート）。
異なるポートを使用する場合は、カスタムURLで検証してください：

```bash
# カスタムポートでpreviewを起動した場合
npm run preview -- --port 5000
node scripts/verify-deployment.js http://localhost:5000
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
- **アプリケーション開始のためのクリック**: wavlpfは自動再生ポリシーに準拠するため、初回起動時に画面をクリックする必要があります。検証スクリプトは自動的にこの操作を実行します。

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

**重要**: スクリーンショットはアプリケーション起動後（クリック後）の状態で撮影されます。これにより、オシロスコープパネルが実際に動作している状態を確認できます。

### 波形表示のスクリーンショットテスト

オシロスコープの波形表示を含む詳細なスクリーンショットを撮影する場合：

```bash
npm run test:waveform-screenshot
```

このコマンドは以下を実行します：
1. ページをロード
2. 画面をクリックしてアプリケーションを開始
3. 3秒待機（波形が表示されるまで）
4. スクリーンショットを撮影（`waveform-test.png`として保存）
5. キャンバスの内容を検証

### GitHub Pagesの簡易スクリーンショット撮影

シンプルにスクリーンショットだけを撮影したい場合：

```bash
npm run screenshot:github-pages
```

カスタムURLや出力先を指定する場合：

```bash
node scripts/screenshot-github-pages.js <URL> <OUTPUT_PATH>
```

例：
```bash
node scripts/screenshot-github-pages.js https://cat2151.github.io/wavlpf/ my-screenshot.png
WAIT_TIME=5000 node scripts/screenshot-github-pages.js  # 5秒待機
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
