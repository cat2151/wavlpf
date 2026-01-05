Last updated: 2026-01-06

# Development Status

## 現在のIssues
- 現在、Rust WASMへのDSPコア一本化（[Issue #41](../issue-notes/41.md)）と、波形生成処理の生成時間表示の精度向上（[Issue #39](../issue-notes/39.md), [Issue #40](../issue-notes/40.md)）が主要な課題としてオープンしています。
- また、フィルタ機能をLPF以外のBPF, HPF, notchなど多様なタイプに拡充する要望（[Issue #30](../issue-notes/30.md)）があります。
- ブラウザの`performance.now()`の量子化により、生成時間表示が粗い（0ms, 10msなど）という具体的な問題が特定されています。

## 次の一手候補
1. Rust WASMへのDSPコア一本化に向けた波形生成関数の移植 ([Issue #41](../issue-notes/41.md))
   - 最初の小さな一歩: `src/oscillator.ts`の`generateSawtooth`および`generatePulse`関数をRust WASM (`wasm-audio/src/lib.rs`) に移植するためのRust側の関数シグネチャとTypeScript側からの呼び出し方法を検討する。
   - Agent実行プロンプ:
     ```
     対象ファイル: src/oscillator.ts, wasm-audio/src/lib.rs, src/wasmAudio.ts

     実行内容: `src/oscillator.ts` にある`generateSawtooth`と`generatePulse`関数を、Rust WASM (`wasm-audio/src/lib.rs`) に移植するための最初のステップとして、Rust側の公開関数 (`#[wasm_bindgen]`) の定義と、`src/wasmAudio.ts` からそれらを呼び出すためのTypeScriptインターフェースの検討を行い、具体的なコードスニペットの提案と実装計画をmarkdown形式で出力してください。

     確認事項: 既存の`src/wasmAudio.ts`での`renderAudioWasm`関数の呼び出し方法との整合性、およびRust側のデータ型（`Float32Array`相当）の取り扱いを確認してください。

     期待する出力:
     - `wasm-audio/src/lib.rs`に追加すべき`generate_sawtooth`と`generate_pulse`関数のRustコードスニペット（`#[wasm_bindgen]`属性を含む）
     - `src/wasmAudio.ts`でこれらのRust関数をインポートし、呼び出すためのTypeScriptコードスニペット
     - 移行計画における考慮事項（例: パフォーマンス、エラーハンドリング）
     ```

2. 波形生成処理時間の統計的計測に向けた分析 ([Issue #39](../issue-notes/39.md), [Issue #40](../issue-notes/40.md))
   - 最初の小さな一歩: `src/synth.ts`内で`renderAudio`関数が返す`generationTimeMs`の統計情報を収集し、平均値や移動平均を表示するための既存の`updateGenerationTimeDisplay`関数の修正案を検討する。
   - Agent実行プロンプト:
     ```
     対象ファイル: src/synth.ts

     実行内容: `src/synth.ts` の `renderAudio` 関数で取得される `generationTimeMs` の値を複数回分保持し、統計的な平均値を計算して `updateGenerationTimeDisplay` 関数で表示する方法を分析してください。具体的には、過去N回の計測値を保持する配列の管理方法、平均値の計算ロジック、およびUI表示の変更点をmarkdown形式で記述してください。

     確認事項: `performance.now()`の量子化の影響を緩和するための統計的手法の有効性、および既存のUIへの影響と表示フォーマットの調整を確認してください。

     期待する出力:
     - `src/synth.ts`に新しい状態変数を追加するコードスニペット（例: `generationTimes: number[]`）
     - `renderAudio`または`playAudio`内でこの配列を更新し、平均値を計算するロジック
     - `updateGenerationTimeDisplay`関数を修正し、平均値を表示するコードスニペット
     - 統計情報表示の具体的なユーザーインターフェースの提案
     ```

3. フィルタ機能の拡充に向けた設計調査 ([Issue #30](../issue-notes/30.md))
   - 最初の小さな一歩: `src/filter.ts`の`BiquadLPF`クラスを参考に、Biquadフィルタの異なるタイプ（BPF, HPFなど）を共通のインターフェースで扱えるようにするための抽象化または継承の可能性を調査し、クラス構造の設計案を検討する。
   - Agent実行プロンプト:
     ```
     対象ファイル: src/filter.ts, src/synth.ts

     実行内容: `src/filter.ts` に存在する`BiquadLPF`クラスを拡張し、LPF以外のBPF、HPFなどのBiquadフィルタをサポートするための設計変更案を分析してください。具体的には、共通のインターフェース（例: `BiquadFilter`）の導入、各フィルタタイプの実装方法（継承、ファクトリパターンなど）、および`src/synth.ts`からの利用方法についてmarkdown形式で提案してください。

     確認事項: 既存の`BiquadLPF`のロジックとの互換性、新しいフィルタタイプの係数計算ロジック、およびパフォーマンスへの影響を確認してください。

     期待する出力:
     - 新しいフィルタインターフェースまたは抽象クラスの定義案
     - `BiquadBPF`や`BiquadHPF`などの具体的なクラス構造の例
     - `src/synth.ts`で新しいフィルタタイプを選択し、インスタンス化するための修正案
     - 設計上のトレードオフと推奨される実装パターン

---
Generated at: 2026-01-06 07:03:33 JST
