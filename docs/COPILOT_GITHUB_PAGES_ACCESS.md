# GitHub Copilot Coding Agent - GitHub Pages アクセス設定ガイド

## 概要

GitHub Copilot Coding Agent が GitHub Pages にデプロイされたアプリケーションをテストするために、ドメインへのアクセスを許可する必要があります。

## 正しい設定方法

### GitHub Copilot Allowlist の使用

GitHub Copilot Coding Agent には、外部サイトへのアクセスを制御する **allowlist（許可リスト）** 機能があります。これを使用することで、安全にGitHub Pagesへのアクセスを許可できます。

#### 設定手順

1. **リポジトリの設定ページにアクセス**
   
   以下のURLにアクセスします（リポジトリオーナーのみがアクセス可能）：
   ```
   https://github.com/<username>/<repository>/settings/copilot/coding_agent/allowlist
   ```
   
   このリポジトリの場合：
   ```
   https://github.com/cat2151/wavlpf/settings/copilot/coding_agent/allowlist
   ```

2. **ドメインを追加**
   
   allowlistに以下のドメインを追加します：
   ```
   cat2151.github.io
   ```

3. **保存**
   
   設定を保存すると、GitHub Copilot Coding Agent がこのドメインにアクセスできるようになります。

#### 設定の効果

- ✅ GitHub Copilot Coding Agent が `cat2151.github.io` にアクセス可能になる
- ✅ `npm run verify-deployment` が正常に実行できる
- ✅ デプロイ後の自動検証が可能になる
- ✅ Issue #80 の完全な解決が可能になる

## なぜこの方法が推奨されるか

### セキュリティと管理性

1. **リポジトリレベルの制御**
   - リポジトリオーナーが明示的に許可したドメインのみアクセス可能
   - 設定変更はGitHubのUIから簡単に実施可能

2. **DNS/システム設定の変更不要**
   - サーバーのDNS設定やhostsファイルを変更する必要がない
   - システム全体に影響を与えない

3. **監査可能**
   - どのドメインが許可されているか、GitHubのUIで一目で確認できる
   - 設定変更の履歴が残る

4. **GitHubが推奨する方法**
   - GitHub Copilot Coding Agent の公式機能
   - セキュリティベストプラクティスに準拠

## アンチパターン（非推奨）

以下の方法は **推奨されません**：

### ❌ DNS ポリシーの変更

```bash
# /etc/systemd/resolved.conf を変更
[Resolve]
Domains=github.io
```

**問題点：**
- システム全体に影響
- セキュリティリスクが高い
- 管理が複雑

### ❌ /etc/hosts による静的エントリ

```bash
# /etc/hosts に追加
185.199.108.153 cat2151.github.io
```

**問題点：**
- IPアドレスが変更された場合に対応できない
- CDNの利点を活かせない
- 手動管理が必要

### ❌ 代替 DNS リゾルバの使用

```bash
# /etc/systemd/resolved.conf
[Resolve]
DNS=8.8.8.8 8.8.4.4
```

**問題点：**
- システム全体のDNS解決に影響
- 組織のDNSポリシーを迂回する可能性
- セキュリティポリシー違反のリスク

## CI/CD での使用

### GitHub Actions での検証

allowlist設定後、CIワークフローにデプロイ検証ステップを追加できます：

```yaml
- name: Install Playwright
  run: |
    npm install --save-dev playwright
    npx playwright install chromium

- name: Verify deployment
  run: npm run verify-deployment
  env:
    TIMEOUT: 30000
```

**注意：** デプロイが完了してからGitHub Pagesに反映されるまで数分かかる場合があるため、適切な待機時間を設けてください。

## トラブルシューティング

### allowlist設定後もアクセスできない場合

1. **設定が保存されているか確認**
   - allowlist設定ページで、ドメインが正しく登録されているか確認

2. **ドメイン名が正確か確認**
   - スペルミスがないか確認
   - プロトコル（https://）は含めない
   - パス（/wavlpf/）は含めない

3. **GitHub Copilot Coding Agent の再起動**
   - 設定変更が反映されるまで、数分かかる場合があります

4. **GitHubのステータスを確認**
   - [GitHub Status](https://www.githubstatus.com/) でサービスの状態を確認

## 関連ドキュメント

- [docs/DEPLOYMENT_VERIFICATION.md](DEPLOYMENT_VERIFICATION.md) - デプロイ検証の使用方法
- [scripts/verify-deployment.js](../scripts/verify-deployment.js) - 検証スクリプト
- [issue-notes/80.md](../issue-notes/80.md) - Issue #80 対応レポート

## まとめ

GitHub Copilot Coding Agent が GitHub Pages にアクセスするためには：

1. ✅ **推奨**: GitHub Copilot Allowlist にドメインを追加
   - `https://github.com/cat2151/wavlpf/settings/copilot/coding_agent/allowlist`
   - ドメイン: `cat2151.github.io`

2. ❌ **非推奨**: DNS設定、hosts設定、代替DNSリゾルバ
   - セキュリティリスク
   - 管理の複雑さ
   - システム全体への影響

この正しい設定方法により、安全かつ簡単に GitHub Pages の自動検証が実現できます。
