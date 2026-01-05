# 波形生成処理時間の計測精度向上に関する分析と実装

## 問題の分析

### 現象
元の実装では、波形生成処理の処理時間表示が0ms、10ms、20ms、30msの4種類しか表示されないという問題が報告されました。

### 根本原因
この問題は、ブラウザのセキュリティ機能による`performance.now()`の精度制限が原因です：

1. **タイミング攻撃対策**: 現代のブラウザは、タイミング攻撃（Spectre攻撃など）を防ぐため、`performance.now()`の精度を意図的に低下させています。

2. **精度の制限**:
   - 理想的には: マイクロ秒単位（0.001ms）の精度
   - 実際には: 多くのブラウザで1ms〜10ms単位に丸められる
   - セキュリティ設定により変動（特にクロスオリジンの状況下）

3. **ブラウザごとの差異**:
   - Chrome/Edge: 通常100μs（0.1ms）または1ms
   - Firefox: デフォルトで1ms〜2ms、設定により10ms以上
   - Safari: セキュリティ設定により異なる

## 解決アプローチ

単一の計測値の精度を向上させることはブラウザの制限により困難ですが、統計的手法を用いることで**より意味のある情報**を提供できます。

### 実装した解決策

#### 1. 統計トラッキングの追加
複数回の計測値を保持し、統計情報を計算します：

```typescript
interface PerformanceStats {
  samples: number[];  // Recent generation times
  maxSamples: number; // Maximum number of samples to keep
}
```

最新の10回の計測値を保持し、以下の統計値を計算：
- **current**: 現在の計測値
- **min**: 最小値
- **max**: 最大値
- **avg**: 平均値
- **count**: サンプル数

#### 2. 表示の拡張
統計情報を含む詳細な表示を提供：

```
Generation time (TypeScript): 12.50ms [n=10, min=10.00ms, max=20.00ms, avg=13.20ms]
```

この表示により：
- 個別の計測値は粗くても、平均値により実際の処理時間を推定可能
- 最小値・最大値により処理時間の変動範囲を把握
- サンプル数により統計の信頼性を判断可能

#### 3. プロセッサ切替時の統計リセット
TypeScriptとWASMでは処理性能が大きく異なるため、プロセッサタイプを変更した際に統計をリセットします：

```typescript
if (processorType !== value) {
  resetPerformanceStats();
}
```

## 実装の詳細

### 変更されたファイル

#### src/synth.ts

1. **統計トラッキング構造の追加** (70-80行目付近):
```typescript
interface PerformanceStats {
  samples: number[];
  maxSamples: number;
}

const performanceStats: PerformanceStats = {
  samples: [],
  maxSamples: 10,
};
```

2. **統計計算関数の追加** (82-119行目付近):
```typescript
function addPerformanceSample(timeMs: number): void
function calculatePerformanceStats(): {...} | null
function resetPerformanceStats(): void
```

3. **表示関数の拡張** (updateGenerationTimeDisplay):
```typescript
function updateGenerationTimeDisplay(generationTimeMs: number): void {
  addPerformanceSample(generationTimeMs);
  const stats = calculatePerformanceStats();
  
  if (stats && stats.count > 1) {
    // 詳細な統計情報を表示
    genTimeEl.textContent = 
      `Generation time (${processorName}): ${stats.current.toFixed(2)}ms ` +
      `[n=${stats.count}, min=${stats.min.toFixed(2)}ms, ` +
      `max=${stats.max.toFixed(2)}ms, avg=${stats.avg.toFixed(2)}ms]`;
  } else {
    // 初回は単純表示
    genTimeEl.textContent = `...`;
  }
}
```

4. **プロセッサ変更時の統計リセット** (readParameters関数内):
```typescript
if (processorType !== value) {
  resetPerformanceStats();
}
```

## 利点と制約

### 利点

1. **統計的な精度向上**: 複数回の計測により、平均値は実際の処理時間により近い値を示します
2. **変動の可視化**: 最小値・最大値により処理時間の安定性を判断できます
3. **信頼性の表示**: サンプル数により統計の信頼性を判断できます
4. **ブラウザ非依存**: どのブラウザでも動作し、利用可能な精度で最善の情報を提供します

### 制約

1. **個別計測の精度**: 個々の計測値の精度はブラウザの制限により変わりません
2. **初回表示**: 初回計測では統計情報がないため、単純表示になります
3. **メモリ使用**: 10回分の計測値を保持（影響は微小）

## より高精度な計測が必要な場合の代替案

もし本当にマイクロ秒レベルの精度が必要な場合は、以下の方法が考えられます：

1. **Worker Threads**: 専用のWeb Workerで計測（セキュリティ制限は同様）
2. **Server-Side Timing**: サーバーサイドでの計測
3. **Native Performance Monitoring**: ブラウザの開発者ツールのプロファイラを使用
4. **Cross-Origin Isolation**: HTTPヘッダーを設定して精度向上（`Cross-Origin-Opener-Policy`と`Cross-Origin-Embedder-Policy`）

ただし、このアプリケーションの目的（ユーザーへの処理時間の表示）には、統計的アプローチで十分な情報が提供できます。

## 結論

`performance.now()`の精度制限は、セキュリティ上重要な機能であり、回避すべきではありません。代わりに、統計的手法を用いることで、制限された精度の中でも**有用な情報**をユーザーに提供できます。

実装された解決策は：
- ブラウザのセキュリティポリシーに準拠
- より意味のある統計情報を提供
- 実装がシンプルで保守しやすい
- パフォーマンスへの影響が最小限

この実装により、ユーザーは処理時間の傾向を把握し、TypeScriptとWASMの性能比較を適切に行えるようになります。
