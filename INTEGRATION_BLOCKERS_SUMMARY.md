# cat-oscilloscope 統合ブロッカー要約

## 🚫 統合不可能 - 現状サマリー

**日付**: 2026-01-04  
**ステータス**: ❌ **統合不可能（npm未公開のため）**

## 一言で言うと

> cat-oscilloscope はライブラリとして完璧に実装されているが、**npm パッケージとして公開されていない**ため、wavlpf に統合できない。

## 技術的な状況

### ✅ 実装済みの内容

cat-oscilloscope リポジトリ: [https://github.com/cat2151/cat-oscilloscope](https://github.com/cat2151/cat-oscilloscope)

| 項目 | 状態 | 詳細 |
|------|------|------|
| TypeScript実装 | ✅ | 完全な型定義あり |
| ビルド設定 | ✅ | Vite library mode 完備 |
| ESM/CJS対応 | ✅ | デュアルフォーマット対応 |
| 型定義生成 | ✅ | .d.ts ファイル自動生成 |
| ドキュメント | ✅ | LIBRARY_USAGE.md 完備 |
| 実装例 | ✅ | example-library-usage.html |
| ビルド動作 | ✅ | `npm run build:lib` 正常動作 |

**ビルド成果物**:
```
dist/
├── cat-oscilloscope.mjs      # ESM (33KB)
├── cat-oscilloscope.cjs      # CommonJS (20KB)
├── index.d.ts                # TypeScript型定義
└── *.d.ts.map                # ソースマップ
```

### ❌ 致命的な問題

#### 問題1: npm パッケージ未公開 🚫

```bash
# これは動作しない
$ npm install cat-oscilloscope
npm ERR! 404 Not Found

$ npm search cat-oscilloscope
# → 無関係なパッケージのみ（mathiasvr/oscilloscope等）

$ npm search @cat2151/oscilloscope
# → 結果なし
```

**影響**:
- wavlpf の package.json に依存関係として追加できない
- `npm install` で自動インストール不可能
- CI/CD パイプラインで利用不可能
- バージョン管理不可能

#### 問題2: GitHub直接インストールも動作しない ⚠️

```bash
# 技術的には可能だが...
$ npm install git+https://github.com/cat2151/cat-oscilloscope.git
```

**しかし以下の問題で動作しない**:

1. **ビルド成果物が含まれていない**
   ```
   # .gitignore の内容
   dist        ← ビルド成果物が Git 管理外
   node_modules
   ```
   
   **結果**: 
   - インストール後に `dist/` ディレクトリが存在しない
   - `package.json` の `main: "./dist/cat-oscilloscope.cjs"` が参照できない
   - `import { Oscilloscope } from 'cat-oscilloscope'` が失敗する

2. **postinstall スクリプト未設定**
   ```json
   // これが必要だが、設定されていない
   {
     "scripts": {
       "postinstall": "npm run build:lib"
     }
   }
   ```

3. **開発依存関係の汚染**
   - `devDependencies` が本番環境にインストールされる
   - 不要な Vite, TypeScript, Vitest 等がインストールされる
   - `node_modules` サイズ肥大化

#### 問題3: BufferSource 未実装 🔧

**wavlpf の要件**:
```typescript
// wavlpf は Float32Array バッファを事前生成
const samples = generateSawtooth(FREQUENCY, SAMPLE_RATE, DURATION);
const filtered = applyFilter(samples);
// ↑ これを可視化したい
```

**cat-oscilloscope の現状**:
```typescript
// マイク入力専用の実装
const oscilloscope = new Oscilloscope(canvas);
await oscilloscope.start(); // マイクアクセスのみ
```

**PR 9 で設計された BufferSource は未実装**:
```typescript
// 以下のクラスは存在しない
export class BufferSource implements AudioSource {
  setBuffer(buffer: Float32Array): void { ... }
  getTimeDomainData(): Float32Array | null { ... }
}
```

## 統合を可能にする最短経路

### ステップ1: BufferSource 実装（4-6時間）

```typescript
// cat-oscilloscope/src/sources/BufferSource.ts（新規作成）
export class BufferSource {
  private buffer: Float32Array | null = null;
  
  constructor(
    private readonly sampleRate: number = 44100,
    private readonly bufferSize: number = 2048
  ) {}
  
  setBuffer(buffer: Float32Array): void {
    this.buffer = buffer;
  }
  
  getTimeDomainData(): Float32Array | null {
    return this.buffer;
  }
  
  // ... 他の必須メソッド
}
```

```typescript
// cat-oscilloscope/src/Oscilloscope.ts（修正）
export class Oscilloscope {
  constructor(
    canvas: HTMLCanvasElement,
    private dataSource?: AudioManager | BufferSource
  ) {
    this.dataSource = dataSource || new AudioManager();
    // ...
  }
  
  setBuffer(buffer: Float32Array): void {
    if (this.dataSource instanceof BufferSource) {
      this.dataSource.setBuffer(buffer);
      this.renderOnce();
    }
  }
}
```

### ステップ2: npm パッケージ公開（15分）

```bash
cd cat-oscilloscope

# ビルド
npm run build:lib

# パッケージ内容確認
npm pack --dry-run

# npm レジストリにログイン（npm 公開権限が必要）
npm login

# パッケージ公開
npm publish
```

**package.json の確認**:
```json
{
  "name": "cat-oscilloscope",
  "version": "1.0.0",
  "main": "./dist/cat-oscilloscope.cjs",
  "module": "./dist/cat-oscilloscope.mjs",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ]
}
```

### ステップ3: wavlpf での統合（2-3時間）

```bash
cd wavlpf
npm install cat-oscilloscope@latest
```

```typescript
// src/synth.ts
import { Oscilloscope, BufferSource } from 'cat-oscilloscope';

const bufferSource = new BufferSource(44100, 11025);
const oscilloscope = new Oscilloscope(canvas, bufferSource);

function renderAudio(): Float32Array {
  const output = /* ... フィルタ処理 ... */;
  
  // 波形表示
  oscilloscope.setBuffer(output);
  
  return output;
}
```

**合計工数**: 1-1.5日

## なぜ今すぐできないのか？

### 理由1: cat-oscilloscope の管理者権限がない

- cat-oscilloscope は別リポジトリ（https://github.com/cat2151/cat-oscilloscope）
- npm パッケージを公開するには npm アカウントと公開権限が必要
- wavlpf リポジトリからは cat-oscilloscope を変更できない

### 理由2: BufferSource は存在しない

現在の cat-oscilloscope リポジトリには BufferSource クラスが実装されていない:

```bash
$ ls /tmp/cat-oscilloscope/src/
AudioManager.ts          # ← マイク入力専用
FrequencyEstimator.ts
GainController.ts
Oscilloscope.ts
WaveformRenderer.ts
ZeroCrossDetector.ts
index.ts
main.ts
utils.ts

# BufferSource.ts は存在しない
```

### 理由3: 指示に「勝手に実装してはいけない」とある

**agent_instructions からの引用**:
> 絶対に禁止：
> 　フォールバックで勝手に波形表示を実装すること

したがって、以下は禁止:
- ❌ wavlpf 内で独自の波形表示を実装する
- ❌ cat-oscilloscope のコードを wavlpf にコピーする
- ❌ 他の npm パッケージで代替する

## 代替案の検討

### 代替案1: 他の npm パッケージを使用

以下のパッケージがnpm registryに存在:
- `oscilloscope` (by mathiasvr) - 6年前更新
- `webaudio-oscilloscope` (by theanam) - 5年前更新
- `@teropa/oscilloscope` (by teropa) - 7年前更新

**判断**: ❌ 不採用
- 指示は「cat-oscilloscopeをライブラリとして活用すること」
- 他のパッケージは指示に反する

### 代替案2: cat-oscilloscope のコードを wavlpf にコピー

**判断**: ❌ 不採用
- ライブラリとして活用するという方針に反する
- コード重複とメンテナンス性の問題
- ライセンス表記の複雑化

### 代替案3: wavlpf 内で独自実装

**判断**: ❌ 絶対禁止
- `agent_instructions` で明示的に禁止されている
- 「勝手に波形表示を実装すること」に該当

## 結論

### 現状

cat-oscilloscope は技術的に優れたライブラリ実装を持つが:
- ❌ npm パッケージとして未公開
- ❌ BufferSource が未実装
- ❌ wavlpf に統合不可能

### 統合を可能にするために必要なアクション

**cat-oscilloscope リポジトリで**（cat2151が実施）:
1. BufferSource の実装とテスト（4-6時間）
2. npm パッケージとして公開（15分）

**wavlpf リポジトリで**（統合作業）:
1. `npm install cat-oscilloscope` を実行
2. 統合コードの実装（2-3時間）

**合計工数**: 1-1.5日

### 推奨事項

#### 短期的（最小限の統合）
1. cat-oscilloscope に BufferSource を実装
2. npm パッケージとして公開
3. wavlpf に統合

#### 長期的（完全なアーキテクチャ）
PR 9 で提案された完全なプラグインアーキテクチャを実装:
- AudioSource インターフェース
- Renderer インターフェース
- Plugin インターフェース
- 複数のデータソース対応

詳細は `CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md` 参照。

## 参考資料

- **詳細分析**: [CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md](./CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md)
- **PR 9 の分析**: [CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md](./CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md)
- **cat-oscilloscope リポジトリ**: https://github.com/cat2151/cat-oscilloscope
- **wavlpf リポジトリ**: https://github.com/cat2151/wavlpf

---

**作成日**: 2026-01-04  
**バージョン**: 1.0  
**ステータス**: **統合不可能（npm未公開のため）**
