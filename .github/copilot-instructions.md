# wavlpf - AI コーディングアシスタントガイド

## ⚠️ 厳重警告 - wasm-opt設定について ⚠️

### 絶対に守るべきルール

**`wasm-audio/Cargo.toml`の`wasm-opt`設定を変更することは厳重に禁止されています。**

#### 禁止事項
- ❌ `wasm-opt = false` を追加すること
- ❌ wasm-opt関連の設定を変更すること
- ❌ 「CIで落ちないように」という憶測に基づく変更
- ❌ ユーザーの指示や既存のコメントを無視した変更

#### 事実
- ✅ wasm-optはデフォルトで有効であり、これが正しい状態です
- ✅ ownerのすべての環境で動作確認済み
- ✅ CI環境でも正常に動作しています
- ✅ 設定ファイルに`wasm-opt`の行を書かないことで、デフォルトで有効になります

#### 過去の重大なミス
AI agentが2回にわたり、以下の誤った判断で`wasm-opt = false`を追加しました：
1. **Issue #44関連**: 「CIで落ちないように」という根拠のない憶測で`wasm-opt = false`を追加
2. **Issue #46後**: 適切なコメントが書かれていたにも関わらず、それを無視して再び`wasm-opt = false`を追加

これらはすべて誤りでした。この誤りにより、ユーザーに多大な負荷をかけました。

#### この設定を変更してはいけない理由
1. ownerが実際に検証した結果、wasm-optは有効で問題ないことが確認されています
2. wasm-optはWASMバイナリの重要な最適化を提供します
3. 無効化すると、最適化されていない大きなバイナリが生成されます
4. 「CI環境での問題」は存在しません - これは誤った憶測でした

#### もしwasm-opt関連の変更を依頼された場合
1. この警告を読み直してください
2. 変更前にユーザーに確認してください
3. ユーザーが明示的に変更を要求した場合のみ、変更してください

---

## ⚠️ 厳重警告 - cat-oscilloscope統合について ⚠️

### 絶対に守るべきルール

**フォールバックによるスタブ実装は厳重に禁止されています。**

#### 禁止事項
- ❌ **cat-oscilloscopeのスタブ実装を作成すること**
- ❌ **フォールバックで勝手に波形表示を実装すること**
- ❌ cat-oscilloscopeのコードをwavlpfにコピーすること
- ❌ 他のnpmパッケージで代替すること
- ❌ wavlpf内で独自の波形表示を実装すること

#### 必須事項
- ✅ **必ずcat-oscilloscopeライブラリを利用して実装すること**
- ✅ **実装が不可能な場合は、その原因を詳細に分析して報告すること**
- ✅ 実装不可能な理由を技術的に明確に説明すること
- ✅ 解決方法を具体的に提案すること

#### 背景
cat-oscilloscopeはwavlpfの波形可視化のために設計された専用ライブラリです：
- Issue #58で実装が完了
- BufferSourceを使用してFloat32Array対応
- ただし、npmに未公開のため配布方法に課題あり

#### 統合が不可能な場合の対応手順
1. **原因分析**: なぜ統合できないのかを技術的に分析
2. **ドキュメント確認**: `INTEGRATION_BLOCKERS_SUMMARY.md`、`ISSUE_58_COMPLETION_REPORT.md`を参照
3. **報告**: 原因と解決方法を明確に報告
4. **スタブ実装禁止**: 決してフォールバックのスタブ実装を作成しない

#### 参考資料
- `INTEGRATION_BLOCKERS_SUMMARY.md` - 統合ブロッカーの詳細
- `ISSUE_58_COMPLETION_REPORT.md` - Issue #58完了報告
- `CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md` - ライブラリ化のベストプラクティス

---

## プロジェクト概要
リアルタイムローパスフィルター(LPF)制御を備えたTypeScriptソフトウェアシンセサイザー。220Hzのノコギリ波を生成し、マウス制御のカットオフ(20-4000Hz)とレゾナンス(Q: 0.5-16)を持つbiquad LPFで処理し、Tone.jsで再生します。250msのオーディオバッファを使用した非リアルタイムレンダリング方式です。

## アーキテクチャと信号フロー

### オーディオパイプライン ([src/synth.ts](src/synth.ts) 参照)
1. **生成**: `oscillator.ts` がノコギリ波形を生成 → Float32Array
2. **フィルタ**: `filter.ts` がカットオフ減衰(1Hz/ms)を持つbiquad LPFを適用
3. **変換**: `wav.ts` が16ビットPCM WAVフォーマットに変換
4. **再生**: Tone.js Playerが再生を処理(最初のユーザーインタラクション時に遅延ロード)

### 重要な設計判断
- **非リアルタイム処理**: オーディオはバッファに事前レンダリングされ、Web Audio APIでリアルタイム処理されない
- **係数更新の最適化**: 1Hz/msの減衰は遅いため、フィルタ係数は約1ms毎に更新(サンプル毎ではない)
- **Tone.jsの遅延ロード**: `synth.ts`はブラウザの自動再生ポリシーに準拠するため、ユーザークリックまでTone.jsのインポートを遅延
- **カットオフ減衰**: マウスX位置から開始し、250msバッファの間に1Hz/msで最小1Hzまで減衰

## 開発ワークフロー

### 必須コマンド
```bash
npm run dev       # Vite開発サーバー(localhost:8080) HMR付き - 開発時はこれを使用
npm test          # Vitest watchモード(TDD用)
npm run test:ui   # ビジュアルテストランナー(テストデバッグに推奨)
npm run build     # TypeScriptチェック + Vite本番ビルド
npm run preview   # 本番ビルドをローカルでプレビュー
```

### テスト哲学 ([DEVELOPMENT.md](DEVELOPMENT.md) 参照)
- **焦点**: 純粋関数の単体テスト(信号処理、WAV生成、フィルタ安定性)
- **高速フィードバック**: テストスイートは1秒未満で実行; 開発中はwatchモードを使用
- **カバレッジ**: UIインタラクションテストよりもコアオーディオ処理の正確性を優先
- 例: [src/filter.test.ts](src/filter.test.ts) は高周波数の出力パワーが入力の10%未満であることを確認してフィルタ安定性を検証

## コード規約

### モジュール構成
- **単一責任**: 各モジュールは1つの目的を持つ(oscillator、filter、wav、synthコーディネーター)
- **純粋関数を優先**: `oscillator.ts`、`wav.ts`はステートレス関数; `filter.ts`はIIRフィルタの内部状態を保持
- **型安全性**: `any`型は使用しない; オーディオサンプルには明示的なFloat32Arrayを使用

### フィルタ実装 ([src/filter.ts](src/filter.ts))
- biquad係数に**RBJ Audio EQ Cookbook**の式を使用
- 係数の命名: `a0, a1, a2` (フィードフォワード)、`b1, b2` (フィードバック) - 一部のDSP文献とは異なる
- **安定性保護**: カットオフを`[1Hz, sampleRate/2.5]`にクランプして不安定性を防止
- 状態変数: `x1, x2` (入力履歴)、`y1, y2` (出力履歴)

### WAV生成 ([src/wav.ts](src/wav.ts))
- 入力検証: 空配列を拒否、最大10分に制限
- モノラル16ビットPCMフォーマット、適切なRIFFヘッダー構造
- int16変換前にfloatサンプルを[-1, 1]にクランプ

## 統合コンテキスト

### 将来のcat-oscilloscope統合
このプロジェクトは、cat-oscilloscopeライブラリを使用した将来的な波形可視化のために広範にドキュメント化されています:
- [CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md](CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md): モジュラーオシロスコープ統合の包括的分析(日本語)
- [ARCHITECTURE_DIAGRAMS.md](ARCHITECTURE_DIAGRAMS.md): 現在のアーキテクチャと提案アーキテクチャの視覚的比較
- **主な課題**: wavlpfはFloat32Arrayバッファを使用; cat-oscilloscopeは現在Web Audio APIマイク入力を想定

### ビルド設定
- **Vite base path**: GitHub Pagesデプロイ用に`/wavlpf/`
- **TypeScript**: ES2020ターゲット、strictモード有効、DOM型を含む
- **Vitest**: ブラウザなしの軽量DOMテスト用に`happy-dom`環境を使用

## 一般的なパターン

### 新しい波形の追加
1. [src/oscillator.ts](src/oscillator.ts) に`generateSawtooth`パターンに従って生成関数を追加
2. [-1, 1]範囲の値を持つFloat32Arrayを返す
3. [src/oscillator.test.ts](src/oscillator.test.ts) に対応するテストを追加

### フィルタ動作の変更
- `BiquadLPF.setCoefficients()`で係数計算を更新
- cutoff/Qに基づいて`a0, a1, a2, b1, b2`係数を再計算
- filter.test.tsで極端なパラメータ値での安定性をテスト

### オーディオバッファ長の調整
- [src/synth.ts](src/synth.ts) の`DURATION`定数を変更
- カットオフ減衰範囲への影響を考慮(現在: 250ms × 1Hz/ms = 250Hz減衰)

# プルリクエストとレビュー
- プルリクエストは日本語で記述してください
- レビューは日本語で記述してください
