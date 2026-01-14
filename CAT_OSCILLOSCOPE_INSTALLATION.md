# cat-oscilloscope インストール手順

## 現状

wavlpfは波形可視化に`cat-oscilloscope`ライブラリを使用していますが、このライブラリはまだnpmに公開されていません。

## インストール方法

### 方法1: ローカルビルド（開発用）

```bash
# cat-oscilloscopeをクローン・ビルド
git clone https://github.com/cat2151/cat-oscilloscope.git /tmp/cat-oscilloscope
cd /tmp/cat-oscilloscope
npm install
npm run build:lib

# wavlpfディレクトリで依存関係をインストール
cd /path/to/wavlpf
npm install /tmp/cat-oscilloscope
```

### 方法2: npm link（開発用）

```bash
# cat-oscilloscopeディレクトリで
cd /path/to/cat-oscilloscope
npm install
npm run build:lib
npm link

# wavlpfディレクトリで
cd /path/to/wavlpf
npm link cat-oscilloscope
```

### 方法3: GitHubから直接（※現在動作しません）

```bash
# GitHubからインストールを試みても、ビルド済みファイルが含まれていないため動作しません
npm install github:cat2151/cat-oscilloscope
```

## cat-oscilloscopeに必要な改善

wavlpfで`cat-oscilloscope`をシームレスに利用するには、以下のいずれかが必要です：

### オプション1: npmパッケージとして公開（推奨）

```bash
# cat-oscilloscopeリポジトリで
npm run build:lib
npm publish
```

その後、wavlpfで：
```bash
npm install cat-oscilloscope
```

### オプション2: prepareスクリプトの追加

`cat-oscilloscope/package.json`に以下を追加：

```json
{
  "scripts": {
    "prepare": "npm run build:lib || echo 'Build skipped'"
  }
}
```

これにより、GitHubから直接インストール時に自動ビルドされます。

### オプション3: ビルド済みファイルをコミット

dist/フォルダをGitにコミットする（非推奨ですが即座に動作します）。

## 現在のpackage.json設定

```json
{
  "dependencies": {
    "cat-oscilloscope": "file:../../../../../tmp/cat-oscilloscope"
  }
}
```

この設定は一時的なもので、以下の制約があります：
- 他の開発者の環境では動作しません
- CI環境では動作しません
- `/tmp`は再起動時にクリアされる可能性があります

## 推奨される次のステップ

1. **cat-oscilloscope作者**: ライブラリをnpmに公開する
2. **wavlpf開発**: 公開後、package.jsonを更新する
   ```json
   {
     "dependencies": {
       "cat-oscilloscope": "^1.0.0"
     }
   }
   ```

## 技術詳細

### なぜGitHubから直接インストールできないか

1. `npm install github:cat2151/cat-oscilloscope`を実行
2. npmがリポジトリをクローン
3. **問題**: dist/フォルダが存在しない（ビルド前）
4. package.jsonは`"main": "./dist/cat-oscilloscope.cjs"`を指定
5. **結果**: モジュールが見つからないエラー

### 必要な対策

- prepareスクリプトでビルドを自動化
- または、npmに公開してビルド済みファイルを配布
