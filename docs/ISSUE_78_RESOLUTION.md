# Issue #78: Issue #76の問題がまったく改善されておらず、エラー内容も同じである

## 問題の概要

Issue #76では「cat-oscilloscopeのWASMファイルがブラウザから読み込めない」と診断され、postinstallスクリプトによる対策が実施されました。しかし、Issue #78で「問題がまったく改善されていない」と報告されました。

## 根本原因の発見

ヘッドレスブラウザ（Playwright）を使用した実際の動作確認により、以下の事実が判明しました：

### Issue #76の診断は部分的に正しかった

1. **Issue #76が主張した問題**: cat-oscilloscopeのWASMファイルがブラウザから読み込めない
2. **Issue #76の対策**: postinstallスクリプトでcat-oscilloscope WASMファイルをpublic/wasm/にコピー
3. **この対策の評価**: ✅ **正しく実装され、正常に動作している**

### しかし、真の問題は別にあった

**真の根本原因**: `wasm-pack`が`binaryen`の`wasm-opt`ツールをGitHubからダウンロードできない

```
Error: failed to download from https://github.com/WebAssembly/binaryen/releases/download/version_117/binaryen-version_117-x86_64-linux.tar.gz
To disable `wasm-opt`, add `wasm-opt = false` to your package metadata in your `Cargo.toml`.
```

この問題により：
- wavlpfの本体である`wasm-audio`モジュール（Rust/WASM）がビルドできない
- プロジェクト全体のビルドが失敗する
- cat-oscilloscopeのWASM配置が正しくても、そもそもアプリケーションが起動しない

## Issue #76の対策の評価

### 前進はあったが不十分

- ✅ **cat-oscilloscopeのWASM配置は正しく実装された**
  - postinstallスクリプトは正常に動作
  - public/wasm/とdist/wasm/に正しくファイルが配置される
  
- ✅ **Viteのビルド設定も正しい**
  - publicディレクトリの内容がdistに正しくコピーされる
  - GitHub Pagesでも正しくアクセス可能

- ❌ **しかし、wasm-audioモジュールがビルドできないという根本問題は未解決**
  - ビルドが失敗するため、オシロスコープの動作確認以前の問題
  - エラーメッセージは「WASMファイルが読み込めない」ではなく「ビルドが失敗する」

## 実際の動作確認結果（ヘッドレスブラウザテスト）

binaryen/wasm-optを手動でインストールしてビルドした結果：

### ✅ すべて正常に動作

1. **WASM初期化**: 成功
   ```
   [LOG] WASM module initialized successfully
   ```

2. **オシロスコープ表示**: 正常
   - 緑色の波形が正しく表示される
   - "□□□□□ (12frame)" の表示が更新される
   - リアルタイムで波形が描画される

3. **コンソールエラー**: なし
   - "Failed to update oscilloscope" エラーは発生しない
   - すべての機能が正常に動作

4. **オーディオ再生**: 正常
   ```
   Generation time (Rust WASM): 0.20ms [n=4, min=0.20ms, max=10.00ms, avg=2.65ms]
   ```

## 解決方法

### 実装した修正

#### 1. CI/CDワークフローの改善（ci.yml, deploy.yml）

binaryen（wasm-opt）を確実にインストールする手順を追加：

```yaml
- name: Cache binaryen
  id: cache-binaryen
  uses: actions/cache@v4
  with:
    path: ~/.cache/.wasm-pack/binaryen-version_117
    key: ${{ runner.os }}-binaryen-v117

- name: Install binaryen (wasm-opt) if not cached
  if: steps.cache-binaryen.outputs.cache-hit != 'true'
  run: |
    mkdir -p ~/.cache/.wasm-pack
    cd ~/.cache/.wasm-pack
    wget -q https://github.com/WebAssembly/binaryen/releases/download/version_117/binaryen-version_117-x86_64-linux.tar.gz
    tar xzf binaryen-version_117-x86_64-linux.tar.gz
    rm binaryen-version_117-x86_64-linux.tar.gz
    echo "Binaryen installed successfully"

- name: Add binaryen to PATH
  run: echo "$HOME/.cache/.wasm-pack/binaryen-version_117/bin" >> $GITHUB_PATH
```

#### 2. キャッシュの活用

- binaryen-version_117をキャッシュすることで、2回目以降のビルドを高速化
- wasm-packの自動ダウンロードに依存せず、確実にwasm-optが利用可能

### なぜこの方法が正しいか

1. **wasm-optは必要な最適化ツール**
   - WASMバイナリサイズの削減
   - パフォーマンスの向上
   - `.github/copilot-instructions.md`でも「`wasm-opt = false`を追加することは厳重に禁止」と明記

2. **ネットワーク問題への対処**
   - wasm-packの自動ダウンロードが失敗する可能性がある
   - 手動でダウンロードし、キャッシュすることで確実性を向上

3. **Issue #76の対策も有効**
   - cat-oscilloscopeのWASM配置は引き続き必要
   - 今回の修正と組み合わせることで、完全な解決となる

## 教訓：問題調査の重要性

### Issue #76で不足していたこと

1. **実際の動作確認が不十分**
   - ヘッドレスブラウザでのテストを行っていなかった
   - エラーメッセージの表面的な解釈にとどまっていた

2. **ビルドプロセス全体の理解が不足**
   - wasm-audioモジュールのビルド失敗を見逃していた
   - cat-oscilloscopeのWASM配置だけに焦点が当たっていた

### 今回の調査で実施したこと

1. **✅ ヘッドレスブラウザ（Playwright）での実際の動作確認**
   - スクリーンショットで視覚的に確認
   - コンソールログの詳細な確認

2. **✅ ビルドプロセスの段階的な検証**
   - wasm-audioモジュールのビルドを個別にテスト
   - エラーメッセージの根本原因を追跡

3. **✅ 手動での問題再現と解決の検証**
   - binaryen手動インストールでの動作確認
   - 解決策の有効性を実証

## まとめ

### Issue #76の対策について

- **見当違いではなかった**: cat-oscilloscopeのWASM配置は必要で正しかった
- **しかし不十分だった**: wasm-audioモジュールのビルド問題を見逃していた

### 完全な解決に必要だったこと

1. Issue #76の対策（cat-oscilloscope WASM配置）
2. 今回の対策（binaryen/wasm-optのインストール）

両方が揃って初めて、完全な解決となります。

## 関連ファイル

- `.github/workflows/ci.yml` - binaryen インストール手順追加
- `.github/workflows/deploy.yml` - binaryen インストール手順追加
- `docs/ISSUE_78_RESOLUTION.md` - 本ドキュメント
- `docs/ISSUE_76_RESOLUTION.md` - Issue #76の解決記録（依然として有効）

## 参考情報

- [Issue #76](https://github.com/cat2151/wavlpf/issues/76) - オシロスコープ表示の問題
- [Issue #78](https://github.com/cat2151/wavlpf/issues/78) - 本Issue
- [wasm-pack documentation](https://rustwasm.github.io/wasm-pack/) - wasm-packの公式ドキュメント
- [binaryen releases](https://github.com/WebAssembly/binaryen/releases) - binaryenのリリース情報
