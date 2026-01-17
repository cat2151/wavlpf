# Issue #76: ビジュアライズ表示の枠が出るようになったが、console.logにエラーが表示され、波形表示がされない

## 問題の概要

オシロスコープの表示枠は表示されるが、console.logに「Failed to update oscilloscope」というエラーが表示され、実際の波形が描画されない問題。

## 根本原因

**cat-oscilloscopeライブラリのWASMファイルがブラウザから読み込めない状態だった。**

### 技術的詳細

1. **cat-oscilloscopeの動作原理**
   - cat-oscilloscopeは高速な波形処理のためにRust/WASMを使用
   - WASMモジュールは`{basePath}/wasm/wasm_processor.js`から動的に読み込まれる
   - `oscilloscope.startFromBuffer()`を呼び出すと、内部で`dataProcessor.initialize()`が実行され、WASMの初期化を試みる

2. **問題の発生箇所**
   ```typescript
   // src/oscilloscope.ts (line 126)
   await oscilloscope.startFromBuffer(currentBufferSource);
   // ↓ 内部で実行される
   // await this.dataProcessor.initialize()
   // ↓ さらに内部で実行される
   // await this.loadWasmModule()
   // → WASMファイルが見つからずエラー
   ```

3. **なぜWASMファイルが見つからなかったか**
   - node_modules/cat-oscilloscope/dist/wasm/にはWASMファイルが存在
   - しかし、Viteのビルド時に`dist/wasm/`にコピーされていなかった
   - ブラウザが`/wavlpf/wasm/wasm_processor.js`にアクセスしても404エラー
   - 結果：WASM初期化失敗 → "Failed to update oscilloscope"エラー

## 解決方法

### 実装した修正

1. **postinstallスクリプトの追加**
   - ファイル：`scripts/setup-cat-oscilloscope-wasm.js`
   - 動作：npm install後に自動実行され、WASMファイルを`public/wasm/`にコピー
   - node_modules/cat-oscilloscope/dist/wasm/ → public/wasm/

2. **Viteのpublicディレクトリ機能を活用**
   - Viteは`public/`ディレクトリのファイルを自動的に処理：
     - 開発時：`public/wasm/` → `http://localhost:8080/wasm/`として提供
     - ビルド時：`public/wasm/` → `dist/wasm/`にコピー

3. **.gitignoreの更新**
   - `public/wasm/`を追加（自動生成されるディレクトリのため）

### ファイル構成

```
wavlpf/
├── scripts/
│   └── setup-cat-oscilloscope-wasm.js  # postinstallスクリプト
├── public/                              # Viteのpublicディレクトリ
│   └── wasm/                            # postinstallで生成
│       ├── wasm_processor.js
│       ├── wasm_processor_bg.wasm
│       └── ...
├── dist/                                # ビルド出力
│   └── wasm/                            # Viteが自動コピー
│       └── (public/wasm/と同じ内容)
└── package.json                         # postinstallスクリプト設定
```

### 動作フロー

#### 開発時
1. `npm install` → postinstallスクリプト実行 → `public/wasm/`にWASMファイル配置
2. `npm run dev` → Viteが`public/wasm/`を`/wasm/`として提供
3. cat-oscilloscopeが`http://localhost:8080/wasm/wasm_processor.js`にアクセス ✓

#### 本番ビルド時
1. `npm install` → postinstallスクリプト実行 → `public/wasm/`にWASMファイル配置
2. `npm run build` → Viteが`public/wasm/`を`dist/wasm/`にコピー
3. GitHub Pagesで`https://cat2151.github.io/wavlpf/wasm/wasm_processor.js`としてアクセス可能 ✓

#### CI/CD (GitHub Actions)
1. `npm ci --legacy-peer-deps` → postinstallスクリプト自動実行
2. `npm install --no-save git+https://github.com/cat2151/cat-oscilloscope.git` → cat-oscilloscope再インストール
3. postinstallスクリプト再実行 → `public/wasm/`更新
4. `npm run build` → 正常にビルド完了

## 検証結果

### TypeScriptコンパイル
```bash
$ npx tsc --noEmit
# エラーなし ✓
```

### テスト実行
```bash
$ npm run test:run
# Test Files  5 passed | 1 skipped (6)
# Tests  50 passed | 22 skipped (72)
# ✓ すべてのテストが通過
```

### postinstallスクリプト
```bash
$ node scripts/setup-cat-oscilloscope-wasm.js
# ✓ cat-oscilloscope WASM files copied to public/wasm/
```

## 今後の対応

### CI環境での動作確認
- GitHub ActionsのCIでビルドが成功することを確認
- デプロイ後、実際のGitHub Pagesで波形表示が動作することを確認

### ドキュメント
- `docs/CAT_OSCILLOSCOPE_WASM_SETUP.md`にセットアップ方法とトラブルシューティングを記載
- `.github/copilot-instructions.md`に問題調査の方法論を追記

## 関連ファイル

- `scripts/setup-cat-oscilloscope-wasm.js` - WASMファイルコピースクリプト
- `package.json` - postinstall設定
- `.gitignore` - public/wasm/除外設定
- `docs/CAT_OSCILLOSCOPE_WASM_SETUP.md` - セットアップドキュメント
- `.github/copilot-instructions.md` - 調査方法のガイドライン追加

## 注意事項

### フォールバック実装は禁止
- この問題は「WASMが読み込めない」という現実の問題
- 「WASMなしで動く」フォールバック実装は技術的負債となる
- 正しいアプローチ：根本原因（WASMファイルの配置）を修正する

### 調査方法の重要性
- 「机上チェックだけ」では原因の特定が困難
- 実際にビルドして動作確認することが重要
- ヘッドレスブラウザでの検証が理想的
