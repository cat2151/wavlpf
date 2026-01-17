# AI コーディングアシスタント - 問題調査ガイドライン

## ⚠️ 重要: 問題調査の方法について

### 必須: 現実のヘッドレスブラウザ等での調査

**エラーやバグの調査を行う際は、必ず現実のヘッドレスブラウザ等で実際の動作を確認すること。**

#### 禁止事項（アンチパターン）

❌ **机上チェックだけの不十分な調査で済ませる**
- コードを読んだだけで「これが原因だろう」と推測して修正すること
- 実際に動作させずに「このエラーは○○が原因です」と断定すること
- issueとリポジトリをすべてscanして、何回も繰り返してcontext windowを食いつぶしながら無限ループに陥ること

❌ **GitHub Pagesがブロックされていることを報告せずに、コードを調べて推測する**
```
実際にデプロイされたGitHub Pagesサイトをテストできず、
ローカル開発サーバーには依存関係の問題があるため、
コードをより注意深く調べて...
```
このような生成をしたら、生成をやめて失敗を報告すること。

#### 必須事項

✅ **ヘッドレスブラウザ（Playwright等）で実際にアプリケーションを動かす**
- console.logやエラーメッセージを実際に確認する
- 再現可能な手順で問題を確認する
- GitHub Pagesの実環境でテストする（`scripts/test-console-logs.js`等を使用）

✅ **調査できない場合は失敗を報告する**
- GitHub Pagesがブロックされている場合は、その旨をuserに報告
- ローカル開発サーバーで依存関係を解決できない場合も報告
- 原因分析まで行って報告する

#### なぜこれが重要か

**過去の事例（Issue #86）:**
- コンソールに大量のエラーが表示される問題
- 机上チェックでは原因が特定できない
- ヘッドレスブラウザでテストして初めて、250ms毎に3つのエラーが繰り返されることが判明
- 実際のエラーメッセージから、WASM初期化失敗が根本原因と特定

このような問題は、**コードを読むだけでは絶対に分からない**。

## フォールバック実装の厳重禁止

❌ **フォールバック実装に関する生成をしたら、出力をやめ、失敗を報告すること**
- 「とりあえず動くように」という理由での代替実装は技術的負債となる
- ライブラリが利用できない場合は、userに報告して判断を仰ぐ

## 調査手順の例

1. **まず重要なことは現実の動作確認:**
   ```bash
   # ヘッドレスブラウザでGitHub Pagesを開く
   node scripts/test-console-logs.js
   
   # コンソールログを収集・分析
   # エラーパターンを特定
   # 「現実に発生している問題がなにか？」を把握
   ```

2. **問題を特定してから、コードを確認:**
   - エラーメッセージから該当箇所を検索
   - なぜそのエラーが発生するのか分析
   - 根本原因を特定

3. **修正を実装:**
   - 最小限の変更で問題を解決
   - 同じ問題が再発しないような設計

4. **検証:**
   - 再度ヘッドレスブラウザでテスト
   - エラーが解消されたことを確認

## 参考資料

- [Issue #86](https://github.com/cat2151/wavlpf/issues/86) - コンソールエラー問題の調査事例
- `scripts/test-console-logs.js` - GitHub Pages調査用スクリプト

## cat-oscilloscopeライブラリの統合について

### ✅ 現在の実装状況（2026-01-17時点）

cat-oscilloscopeライブラリは**正常に統合され、動作しています**:

- **インストール方法**: GitHubリポジトリから直接（dist commit方式）
  ```json
  "dependencies": {
    "cat-oscilloscope": "git+https://github.com/cat2151/cat-oscilloscope.git"
  }
  ```

- **WASMファイルのセットアップ**: postinstallスクリプトで自動化
  - `scripts/setup-cat-oscilloscope-wasm.js`が`npm install`後に自動実行
  - `node_modules/cat-oscilloscope/dist/wasm/`から`public/wasm/`にコピー

- **コード統合**:
  - `src/oscilloscope.ts`: cat-oscilloscopeのラッパーモジュール
  - `src/synth.ts`: シンセサイザーとの統合
  - `index.html`: canvas要素とUI
  - `BufferSource`を使用したFloat32Array直接可視化

### 📘 ドキュメント

詳細な利用方法は以下を参照:
- **[docs/OSCILLOSCOPE_USAGE.md](docs/OSCILLOSCOPE_USAGE.md)** - 使用ガイド（日本語）
- **[docs/CAT_OSCILLOSCOPE_WASM_SETUP.md](docs/CAT_OSCILLOSCOPE_WASM_SETUP.md)** - WASMセットアップの技術詳細

### ⚠️ 重要な注意事項

#### 禁止事項

❌ **以下のドキュメントは古い調査段階の資料です。参照しないでください:**
- `CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md` - 実現可能性分析（既に実装済み）
- `CAT_OSCILLOSCOPE_INSTALLATION.md` - 古いインストール手順
- `CAT_OSCILLOSCOPE_INTEGRATION.md` - 調査段階の最小変更アプローチ
- `CAT_OSCILLOSCOPE_INTEGRATION_REPORT.md` - 古い統合レポート
- `CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md` - 調査段階のベストプラクティス分析

これらは歴史的な資料として残されていますが、**現在の実装を正とします**。

#### 正しいアプローチ

✅ **現在の実装に基づいて作業する:**
1. `docs/OSCILLOSCOPE_USAGE.md`を参照して、現在の統合方法を理解
2. `src/oscilloscope.ts`、`src/synth.ts`の実装を確認
3. 変更が必要な場合は、既存の実装に最小限の修正を加える

✅ **問題が発生した場合:**
1. ヘッドレスブラウザで実際の動作を確認（上記の調査ガイドラインに従う）
2. `scripts/verify-deployment.js`でデプロイ後の動作を検証
3. 問題を特定してからコードを修正
