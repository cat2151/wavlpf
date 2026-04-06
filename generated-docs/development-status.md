Last updated: 2026-04-07

# Development Status

## 現在のIssues
- [Issue #113](../issue-notes/113.md) と [Issue #112](../issue-notes/112.md) は、MML演奏と複数音符シーケンス演奏の機能追加を目指していますが、それぞれ外部ライブラリの進捗を待機中です。
- 特に [Issue #112](../issue-notes/112.md) は `tonejs-json-sequencer` のライブラリ利用版待ち、[Issue #113](../issue-notes/113.md) は [Issue #112](../issue-notes/112.md) の完了待ちという依存関係があります。
- [Issue #52](../issue-notes/52.md) は、上記のシーケンス実装が完了した後、Tone.js sampler、WAV prerender、自前実装の3種類の演奏方法を選択できるUIの追加を計画しています。

## 次の一手候補
1. [Issue #112](../issue-notes/112.md) のためのTone.js関連ライブラリの統合方法の事前検討
   - 最初の小さな一歩: `package.json` と `tsconfig.json` を分析し、`tonejs-json-sequencer` および `tonejs-mml-to-json` をnpmで追加する際の依存関係の構造と、`src/index.ts` でインポートするためのTypeScript設定の確認。
   - Agent実行プロンプト:
     ```
     対象ファイル: `package.json`, `tsconfig.json`, `src/index.ts`

     実行内容: `tonejs-json-sequencer` と `tonejs-mml-to-json` という2つのnpmパッケージを本プロジェクトに導入することを想定し、以下の観点から分析してください：
     1) `package.json` にこれらのパッケージを追加する際の推奨される記述形式。
     2) `tsconfig.json` において、これらのパッケージをTypeScriptファイル（例: `src/index.ts`）からインポートする際に特別な設定（例: `paths`, `typeRoots`）が必要か。
     3) `src/index.ts` などのエントリーポイントファイルでこれらのパッケージをインポートする際の一般的なTypeScriptの構文。

     確認事項: 既存の依存関係やTypeScriptの設定に影響を与えないことを確認してください。また、新しいパッケージの導入がビルドプロセスに与える潜在的な影響についても考慮してください。

     期待する出力: 提案される `package.json` の変更点、`tsconfig.json` の確認点、および `src/index.ts` でのインポート例をmarkdown形式で出力してください。
     ```

2. [Issue #113](../issue-notes/113.md) のMML入力用UIコンポーネントのプロトタイプ検討
   - 最初の小さな一歩: `src/index.ts` と `src/styles.css` を分析し、MML入力用の `textarea` 要素をWebページに追加するためのHTML構造、および基本的な見た目を定義するCSSルールを考案する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/index.ts`, `src/styles.css`

     実行内容: MML（Music Macro Language）を入力するための `textarea` コンポーネントをWebアプリケーションに追加することを想定し、以下の観点からプロトタイプを検討してください：
     1) `src/index.ts` 内でこの `textarea` 要素をDOMに組み込む際の推奨されるJavaScriptによるDOM操作。
     2) `src/styles.css` にて、この `textarea` のサイズ、フォント、背景色などの基本的なスタイリングを定義するためのCSSルール。

     確認事項: 既存のUIコンポーネント（例: オシロスコープ表示、シンセサイザーUI）とのレイアウトの整合性、および既存CSSとの衝突がないことを確認してください。

     期待する出力: `src/index.ts` に追加するJavaScriptコードの抜粋（DOM要素の生成と追加）、および `src/styles.css` に追加するCSSルールの例をmarkdown形式で出力してください。
     ```

3. [Issue #52](../issue-notes/52.md) の演奏モード選択UIの基礎設計検討
   - 最初の小さな一歩: `src/index.ts` と `src/ui-params.ts` を分析し、プルダウンメニュー要素を追加するためのHTML構造と、選択されたモードをJavaScriptで管理するための最小限のデータ構造を考案する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/index.ts`, `src/ui-params.ts`

     実行内容: 複数の演奏モード（例: "Tone.js Sampler", "WAV Prerender", "Custom Renderer"）を選択するためのプルダウンメニュー（`<select>`要素）をUIに追加することを想定し、以下の観点から基礎設計を検討してください：
     1) `src/index.ts` 内でこのプルダウンメニューをDOMに組み込む際の推奨されるJavaScriptによるDOM操作。
     2) `src/ui-params.ts` にて、選択された演奏モードの状態を管理するためのデータ構造（例: enum, string union type）と、その初期値。
     3) プルダウンの選択変更イベントを捕捉し、選択されたモードを更新するイベントハンドラの基本的な骨子。

     確認事項: 既存のUIパラメータ管理ロジック（`src/ui-params.ts`）との整合性を確認してください。UI要素の追加が既存の機能に干渉しないように注意してください。

     期待する出力: `src/index.ts` に追加するHTML構造（JavaScriptで生成される部分）、`src/ui-params.ts` に追加するデータ構造と状態管理の骨子、およびイベントハンドラの例をmarkdown形式で出力してください。
     ```

---
Generated at: 2026-04-07 07:08:48 JST
