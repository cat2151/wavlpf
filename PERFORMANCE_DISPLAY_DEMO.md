# 処理時間表示の改善 - ビジュアルデモ

## 変更前と変更後の比較

### 変更前（元の表示）
ブラウザの精度制限により、限られた値しか表示されない：

```
Generation time (TypeScript): 0.00ms
Generation time (TypeScript): 10.00ms
Generation time (TypeScript): 10.00ms
Generation time (TypeScript): 20.00ms
Generation time (TypeScript): 10.00ms
...
```

**問題点:**
- 個々の値が粗い（0ms、10ms、20ms、30msなど）
- 実際の処理時間の傾向がわかりにくい
- 計測ごとの変動が激しく見える

### 変更後（統計情報付き表示）

#### 初回クリック時
```
Generation time (TypeScript): 10.00ms
```

#### 2回目のクリック以降
```
Generation time (TypeScript): 10.00ms [n=2, min=10.00ms, max=10.00ms, avg=10.00ms]
Generation time (TypeScript): 20.00ms [n=3, min=10.00ms, max=20.00ms, avg=13.33ms]
Generation time (TypeScript): 10.00ms [n=4, min=10.00ms, max=20.00ms, avg=12.50ms]
Generation time (TypeScript): 20.00ms [n=5, min=10.00ms, max=20.00ms, avg=14.00ms]
...（最大10回分の統計）
```

#### 10回以上クリック後（統計が安定）
```
Generation time (TypeScript): 10.00ms [n=10, min=10.00ms, max=20.00ms, avg=13.50ms]
Generation time (TypeScript): 20.00ms [n=10, min=10.00ms, max=20.00ms, avg=14.00ms]
Generation time (TypeScript): 10.00ms [n=10, min=10.00ms, max=20.00ms, avg=13.50ms]
```

#### プロセッサをWASMに変更後（統計がリセットされる）
```
Generation time (Rust WASM): 0.00ms
Generation time (Rust WASM): 0.00ms [n=2, min=0.00ms, max=0.00ms, avg=0.00ms]
Generation time (Rust WASM): 10.00ms [n=3, min=0.00ms, max=10.00ms, avg=3.33ms]
Generation time (Rust WASM): 0.00ms [n=4, min=0.00ms, max=10.00ms, avg=2.50ms]
...
```

**改善点:**
1. **統計による信頼性向上**: 複数回の計測により、実際の処理時間をより正確に推定
2. **変動範囲の把握**: min/maxにより処理時間の安定性を確認可能
3. **サンプル数の表示**: 統計の信頼性を判断可能（n=1は信頼性低、n=10は信頼性高）
4. **プロセッサ比較**: TypeScriptとWASMの性能差を明確に比較可能

## 表示項目の説明

各フィールドの意味：

- **current値** (例: `10.00ms`): 今回の計測値
- **n**: サンプル数（1〜10）
- **min**: 最小値（最も速かった時の処理時間）
- **max**: 最大値（最も遅かった時の処理時間）
- **avg**: 平均値（実際の処理時間に最も近い推定値）

## 実際の使用例

### シナリオ1: TypeScriptプロセッサでの連続再生

```
[ユーザーがページをクリック]
Generation time (TypeScript): 10.00ms

[1秒後、自動的に次の音が生成・再生]
Generation time (TypeScript): 10.00ms [n=2, min=10.00ms, max=10.00ms, avg=10.00ms]

[さらに1秒後]
Generation time (TypeScript): 20.00ms [n=3, min=10.00ms, max=20.00ms, avg=13.33ms]

[さらに1秒後]
Generation time (TypeScript): 10.00ms [n=4, min=10.00ms, max=20.00ms, avg=12.50ms]

→ 平均約12-14msで処理されていることが分かる
```

### シナリオ2: WASMプロセッサに切り替え

```
[ユーザーがプロセッサをWASMに変更]
[統計がリセットされる]

[クリック]
Generation time (Rust WASM): 0.00ms

[1秒後]
Generation time (Rust WASM): 0.00ms [n=2, min=0.00ms, max=0.00ms, avg=0.00ms]

[さらに1秒後]
Generation time (Rust WASM): 10.00ms [n=3, min=0.00ms, max=10.00ms, avg=3.33ms]

→ WASMはTypeScriptより約3-4倍高速（平均3.33ms vs 13.33ms）
```

### シナリオ3: 設定変更による処理時間の影響確認

```
[BPM=120, Beat=8（250ms周期）での測定]
Generation time (TypeScript): 10.00ms [n=10, min=10.00ms, max=20.00ms, avg=13.50ms]

[BPM=60, Beat=4（1000ms周期）に変更]
Generation time (TypeScript): 30.00ms [n=1, min=30.00ms, max=30.00ms, avg=30.00ms]
Generation time (TypeScript): 40.00ms [n=2, min=30.00ms, max=40.00ms, avg=35.00ms]
Generation time (TypeScript): 30.00ms [n=3, min=30.00ms, max=40.00ms, avg=33.33ms]

→ 再生時間が長いほど処理時間も増加することが確認できる
```

## UI配置（変更なし）

HTMLの`<div class="status">`要素内に表示されます：

```html
<div class="status" id="generationTime">
  Generation time (TypeScript): 10.00ms [n=5, min=10.00ms, max=20.00ms, avg=14.00ms]
</div>
```

## ユーザーへの価値

1. **パフォーマンスの可視化**: 処理が実際にどれくらい速いのかが明確に
2. **プロセッサ比較**: TypeScriptとWASMの性能差を定量的に比較可能
3. **設定の影響確認**: パラメータ変更が処理時間に与える影響を確認可能
4. **安定性の確認**: min/maxの差により処理の安定性を判断可能

## 技術的詳細

- **サンプル保持数**: 最新10回分
- **計測方法**: `performance.now()`（ブラウザネイティブAPI）
- **精度**: ブラウザのセキュリティポリシーに依存（通常0.1ms〜10ms単位）
- **統計リセット**: プロセッサ切替時のみ
- **パフォーマンス影響**: 無視できるレベル（配列操作のみ）
