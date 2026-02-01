Last updated: 2026-02-02

# Development Status

## 現在のIssues
- 複数の主要なIssueが外部ライブラリやシーケンサの対応待ち ([Issue #104](../issue-notes/104.md), [Issue #57](../issue-notes/57.md)) となっており、これらは直接的な開発の進行をブロックしています。
- [Issue #52](../issue-notes/52.md) では、Tone.jsや自前実装を含む多様な演奏・レンダリング方法をシーケンサタブで選択可能にする機能が計画されています。
- これらのIssueは、今後の音源処理とUIの方向性を示すものであり、外部依存が解消されるまでの間に内部で進められる準備作業が重要です。

## 次の一手候補
1.  [Issue #52](../issue-notes/52.md): WebAudio非依存レンダラのプロトタイプ実装
    -   最初の小さな一歩: `wasm-audio` クレート内で、特定の周波数と期間でサイン波を生成し、WAVバイト列として返す最小限のRustコードを実装する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `wasm-audio/src/lib.rs`, `wasm-audio/src/audio_renderer.rs`, `wasm-audio/src/oscillator.rs`

        実行内容: `wasm-audio` クレートに、指定された周波数と期間でサイン波を生成し、WAV形式のバイト列として返す関数を追加してください。既存の `oscillator.rs` と `audio_renderer.rs` を参考に、単純なサイン波生成ロジックを実装します。最終的には、そのWAVデータをJavaScript側で利用できるようにwasmバインディングを提供してください。

        確認事項: 既存の `wasm-audio` モジュールの構造と、`src/wav.ts` でのWAVデータ処理方法との整合性を確認してください。Rust側でのメモリ管理とJavaScriptとのデータ受け渡しに問題がないか注意してください。

        期待する出力:
        1. `wasm-audio/src/lib.rs` に、新しいサイン波WAV生成関数へのエントリポイントを追加。
        2. `wasm-audio/src/oscillator.rs` に、サイン波生成ロジックを実装。
        3. `wasm-audio/src/audio_renderer.rs` を更新し、生成されたサイン波をWAVバイト列に変換するロジックを追加。
        4. これらの機能の利用方法を示す簡単なRustテストコード。
        ```

2.  [Issue #4](../issue-notes/4.md): `daily-project-summary` ワークフローのスクリプト改善
    -   最初の小さな一歩: `DevelopmentStatusGenerator.cjs` がIssueノートの内容を正確に抽出し、指定形式（3行要約）で処理できるかを検証するユニットテストの計画を立て、テストファイルを追加する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `.github/actions-tmp/.github_automation/project_summary/scripts/development/DevelopmentStatusGenerator.cjs`, `.github/actions-tmp/.github_automation/project_summary/prompts/development-status-prompt.md`

        実行内容: `DevelopmentStatusGenerator.cjs` が、提供されたIssue情報（特に`issue-notes/X.md`の内容）を適切に読み込み、指定された形式（例：3行要約）で処理できることを検証するユニットテストを記述してください。具体的には、テスト用のIssueノートファイルを作成し、ジェネレータがそれらをどのように要約するかをテストします。

        確認事項: `IssueTracker.cjs` (`.github/actions-tmp/.github_automation/project_summary/scripts/development/IssueTracker.cjs`) からのデータ受け渡し方法、および `development-status-prompt.md` のプロンプト構造との整合性を確認してください。ハルシネーション抑制の観点から、入力データからの正確な情報抽出に重点を置いてください。

        期待する出力:
        1. `DevelopmentStatusGenerator.cjs` のテストファイル（例: `DevelopmentStatusGenerator.test.cjs`）。
        2. テスト内で使用するモックのIssueノートデータ。
        3. テストは、Issueのタイトル、本文から指定された形式（3行要約）で情報を正確に抽出できることを検証する。
        ```

3.  [Issue #2](../issue-notes/2.md): `callgraph` ワークフローのテスト強化とドキュメント整備
    -   最初の小さな一歩: `callgraph` ワークフローが空のグラフを生成しないこと、および期待される関数コールグラフの要素が含まれていることを検証するテストケースを定義する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `.github/actions-tmp/.github_automation/callgraph/scripts/` ディレクトリ内のスクリプト、および `issue-notes/2.md`

        実行内容: `callgraph` ワークフローが生成するHTMLグラフの内容が空でないこと、および期待される関数コールグラフの要素が含まれていることを検証する仕組みを検討し、そのためのテスト用ダミーソースコードと期待出力の定義を行ってください。具体的には、`issue-notes/2.md` で言及されている「html内容が0件NG」のケースを検知するためのテストプランを提案します。

        確認事項: `analyze-codeql.cjs`, `extract-sarif-info.cjs`, `generate-html-graph.cjs` などの各スクリプトの連携と、CodeQLのSARIF出力形式の理解が必要です。ワークフロー全体での結果検証方法を検討してください。

        期待する出力:
        1. `callgraph` ワークフローのテスト強化に関する計画をMarkdown形式で記述。
        2. その計画に基づいた、テスト用の簡単なダミーソースコード（例: `src/main.js`）。
        3. ダミーソースコードを実行した際に期待されるグラフの要素（例: 特定の関数が呼び出されていること）の記述。
        4. 必要であれば、既存の `copy-commit-results.cjs` に結果検証のステップを追加する提案。

---
Generated at: 2026-02-02 07:03:41 JST
