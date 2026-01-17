# cat-oscilloscope LIBRARY_USAGE.md 分析結果

## インストール方法（LIBRARY_USAGE.mdより）

LIBRARY_USAGE.mdには**3つのインストール方法**が記載されています：

### 方法1: CDN経由（推奨）
```html
<script type="module">
  import { Oscilloscope } from 'https://cdn.jsdelivr.net/gh/cat2151/cat-oscilloscope@v0.0.1/dist/cat-oscilloscope.mjs';
</script>
```

### 方法2: GitHubリポジトリから直接インストール
```bash
npm install git+https://github.com/cat2151/cat-oscilloscope.git
```

### 方法3: ローカルでのリンク（開発時）
```bash
npm run build:lib
npm link
```

## 重要な発見

### 1. dist commit方式が実装されている証拠

LIBRARY_USAGE.mdのCDN例：
```
https://cdn.jsdelivr.net/gh/cat2151/cat-oscilloscope@v0.0.1/dist/cat-oscilloscope.mjs
```

これは**dist/ディレクトリがGitHubリポジトリにコミットされている**ことを示しています。
jsDelivrは`@v0.0.1`タグの`dist/`フォルダから直接配信しています。

### 2. 推奨インストール方法の特定

LIBRARY_USAGE.mdは**CDNを推奨**していますが、npmプロジェクトでは：

```bash
npm install git+https://github.com/cat2151/cat-oscilloscope.git
```

が正しい方法です。

### 3. WASMファイルのセットアップが必須

LIBRARY_USAGE.mdの重要なセクション：

```markdown
## ⚠️ 重要: WASMファイルのセットアップ

cat-oscilloscopeは高速な波形処理のため、Rust/WASMを使用しています。
**npmやGitHubからインストールする場合、WASMファイルを手動でセットアップする必要があります。**
```

これが**現在の404エラーの根本原因**です。

### 4. postinstallスクリプトの実装例

LIBRARY_USAGE.mdには、wavlpfに既に実装されている`scripts/setup-cat-oscilloscope-wasm.js`と**同じアプローチ**が記載されています。

## ドキュメント不備の原因判明

### .github/copilot-instructions.mdの問題

copilot-instructions.mdは「dist commit方式が前提」と書いているが：

❌ **誤り**: GitHubタグ参照を推奨していた
```json
"cat-oscilloscope": "github:cat2151/cat-oscilloscope#v1.0.0"
```

✅ **正解**: LIBRARY_USAGE.mdではGit URL形式を推奨
```bash
npm install git+https://github.com/cat2151/cat-oscilloscope.git
```

### CAT_OSCILLOSCOPE_INSTALLATION.mdの問題

INSTALLATION.mdは古い情報で、LIBRARY_USAGE.mdと矛盾：
- INSTALLATION: "GitHubから直接インストールは動作しない"
- LIBRARY_USAGE: "GitHubから直接インストール可能"

これはライブラリのバージョンアップで解決されたが、ドキュメントが更新されていない。

## 正しいインストール手順

### wavlpfで使用すべき方法

1. **package.jsonを更新**:
```json
{
  "dependencies": {
    "cat-oscilloscope": "git+https://github.com/cat2151/cat-oscilloscope.git"
  }
}
```

または特定のバージョン:
```json
{
  "dependencies": {
    "cat-oscilloscope": "git+https://github.com/cat2151/cat-oscilloscope.git#v0.0.1"
  }
}
```

2. **postinstallスクリプトは既に実装済み**:
- `scripts/setup-cat-oscilloscope-wasm.js` ✅
- `package.json`の`postinstall`スクリプト ✅

3. **インストール実行**:
```bash
npm install
```

4. **WASMファイルの確認**:
```bash
ls -la public/wasm/
# 以下が存在するはず:
# - wasm_processor.js
# - wasm_processor_bg.wasm
# - wasm_processor.d.ts
# - wasm_processor_bg.wasm.d.ts
# - package.json
```

## 現在のpackage.jsonの問題

```json
"cat-oscilloscope": "file:../../../../../tmp/cat-oscilloscope"
```

これは**LIBRARY_USAGE.mdに記載されていない一時的な方法**で、以下の問題があります：
- `/tmp/cat-oscilloscope`が存在しない
- CI/デプロイ環境で動作しない
- ドキュメントに記載されていない

## 結論

### ドキュメント不備の詳細

1. **SSOT (.github/copilot-instructions.md) の不備**:
   - ✅ dist commit方式の存在は正しい
   - ❌ インストールコマンドが誤っている（GitHub shorthand形式を推奨、実際はGit URL形式が必要）
   - ❌ LIBRARY_USAGE.mdを参照していない

2. **CAT_OSCILLOSCOPE_INSTALLATION.md の不備**:
   - ❌ 古い情報（"GitHubから直接は動作しない"）
   - ❌ LIBRARY_USAGE.mdと矛盾
   - ❌ 更新されていない

3. **ドキュメント階層の問題**:
   - LIBRARY_USAGE.md（cat-oscilloscopeリポジトリ）がSSOT
   - wavlpfのドキュメントがそれを正しく参照・転記していない

### 修正方法

**即座に実行可能な修正**:
```bash
# package.jsonを修正
npm install git+https://github.com/cat2151/cat-oscilloscope.git

# または特定バージョン
npm install git+https://github.com/cat2151/cat-oscilloscope.git#v0.0.1
```

postinstallスクリプトが自動実行され、WASMファイルが`public/wasm/`にコピーされます。

### ドキュメント修正の優先順位

1. **package.jsonを修正**（最優先）
2. **.github/copilot-instructions.mdを更新**（正しいインストールコマンドを記載）
3. **CAT_OSCILLOSCOPE_INSTALLATION.mdを削除または更新**
4. **LIBRARY_USAGE.mdへの明示的な参照を追加**
