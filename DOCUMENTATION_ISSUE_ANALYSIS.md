# ドキュメント不備調査結果

## 調査日時
2026-01-17

## 調査対象
cat-oscilloscopeのインストール方法に関するドキュメント

## SSOT（Single Source of Truth）の特定

`.github/copilot-instructions.md` (line 219) が明確にSSOTとして記載：

```markdown
**cat-oscilloscopeライブラリとtonejs-json-sequencerライブラリは、dist commit方式でリリースされている前提とします。**

- ✅ dist commit方式（ビルド済みファイルをリポジトリにコミット）
- ❌ npm登録方式は使用しない
- ❌ prepareスクリプト方式は使用しない
```

## ドキュメント不備の発見

### 不備1: インストール方法のドキュメントが複数存在し、矛盾している

#### CAT_OSCILLOSCOPE_INSTALLATION.md の内容
- **方法1**: ローカルビルド（`/tmp/cat-oscilloscope`にクローン）
- **方法2**: npm link
- **方法3**: GitHubから直接（※動作しないと明記）
- **推奨**: npmパッケージとして公開（まだ実装されていない）

→ **問題**: dist commit方式について一切言及されていない

#### .github/copilot-instructions.md の内容
- **前提**: dist commit方式でリリースされている
- **インストール方法**: GitHub参照を使用すべき
  ```json
  "cat-oscilloscope": "github:cat2151/cat-oscilloscope#v1.0.0"
  ```

→ **問題**: 実際のインストール手順が書かれていない

#### 実際のpackage.json
```json
"cat-oscilloscope": "file:../../../../../tmp/cat-oscilloscope"
```

→ **問題**: どのドキュメントとも一致しない一時的な設定

### 不備2: SSOTが実装方法を説明していない

`.github/copilot-instructions.md`は「dist commit方式が前提」と書いているが：
- ✅ 「何を前提としているか」は明確
- ❌ 「どうインストールするか」は書かれていない
- ❌ 「cat-oscilloscopeリポジトリにdist/が実際にコミットされているか」の確認方法が書かれていない

### 不備3: cat-oscilloscopeのLIBRARY_USAGE.mdへの参照が不完全

複数のドキュメントで`LIBRARY_USAGE.md`に言及：
```markdown
- ライブラリ使用方法: [LIBRARY_USAGE.md](https://github.com/cat2151/cat-oscilloscope/blob/main/LIBRARY_USAGE.md)
```

しかし：
- ❌ wavlpfプロジェクト内にその内容が転記されていない
- ❌ LIBRARY_USAGE.mdに書かれているはずのインストール方法が不明
- ❌ 外部リンクに依存しているため、SSOTとして機能していない

## ドキュメント不備の影響

### 現実の問題
1. **package.jsonが誤った設定を使用**
   - `/tmp/cat-oscilloscope`は存在しない
   - CI/デプロイ環境で動作しない
   - WASM files 404エラーの根本原因

2. **開発者が正しいインストール方法を特定できない**
   - CAT_OSCILLOSCOPE_INSTALLATION.md → 3つの方法を提示、どれも動かない
   - .github/copilot-instructions.md → 「dist commit前提」だけで手順なし
   - package.json → 実装されていない一時的な設定

3. **ドキュメント間の矛盾**
   - INSTALLATION.md: "npmパッケージ公開を推奨"
   - copilot-instructions.md: "dist commit方式が前提"
   - これらは相互に排他的

## 修正が必要な箇所

### 優先度1: SSOT を実装可能な形に更新

`.github/copilot-instructions.md`に以下を追加すべき：

```markdown
#### cat-oscilloscopeのインストール方法

**前提**: cat-oscilloscopeはdist commit方式でリリースされています。

**インストール手順**:

1. cat-oscilloscopeリポジトリを確認:
   ```bash
   # dist/フォルダがコミットされているか確認
   git ls-remote https://github.com/cat2151/cat-oscilloscope refs/heads/main
   # または特定のリリースタグ
   git ls-remote https://github.com/cat2151/cat-oscilloscope refs/tags/v*
   ```

2. package.jsonを更新:
   ```json
   {
     "dependencies": {
       "cat-oscilloscope": "github:cat2151/cat-oscilloscope#<tag-or-commit>"
     }
   }
   ```

3. インストール:
   ```bash
   npm install
   ```

4. WASM filesの確認:
   ```bash
   ls -la node_modules/cat-oscilloscope/dist/wasm/
   # 必要なファイル:
   # - wasm_processor.js
   # - wasm_processor_bg.wasm
   # - wasm_processor.d.ts
   # - wasm_processor_bg.wasm.d.ts
   # - package.json
   ```

**トラブルシューティング**:

もしcat-oscilloscopeのdist/フォルダが存在しない場合:
- cat-oscilloscopeリポジトリでdist commit方式が実装されていません
- この場合、userに報告してください
- 勝手にフォールバック実装を作成しないでください
```

### 優先度2: CAT_OSCILLOSCOPE_INSTALLATION.md を更新または削除

**オプションA**: SSOTと一致させる
```markdown
# cat-oscilloscope インストール手順

## インストール方法

cat-oscilloscopeは dist commit方式 でリリースされています。

### インストール

```bash
npm install github:cat2151/cat-oscilloscope#<version>
```

詳細は `.github/copilot-instructions.md` を参照してください。
```

**オプションB**: 削除して.github/copilot-instructions.mdに一本化

### 優先度3: 実際の実装状態を確認

以下を確認する必要があります：
1. cat-oscilloscopeリポジトリにdist/フォルダがコミットされているか？
2. リリースタグが存在するか？
3. dist/wasm/フォルダにWASMファイルが含まれているか？

→ これらが「NO」の場合、ドキュメントの前提が誤りです

## 結論

**ドキュメント不備が存在します:**

1. **SSOTが不完全**: copilot-instructions.mdは「何を前提としているか」は明確だが、「どうインストールするか」が書かれていない

2. **ドキュメント間の矛盾**: INSTALLATION.mdとcopilot-instructions.mdが異なる方式を推奨

3. **外部依存**: LIBRARY_USAGE.mdへの参照だけで、内容が転記されていない

4. **実装との乖離**: package.jsonがどのドキュメントとも一致しない

**次のステップ**:

1. cat-oscilloscopeリポジトリの実際の状態を確認
2. dist commit方式が実装されているか検証
3. 実装状態に基づいてドキュメントを統一・修正
4. package.jsonを正しい方法で更新
