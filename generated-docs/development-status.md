Last updated: 2026-02-12

# Development Status

## 現在のIssues
- [Issue #113](../issue-notes/113.md) は、MMLをテキストエリアに入力してTone.jsで演奏する機能に関するもので、`tonejs-mml-to-json`ライブラリのシーケンス実装が完了するまで待機中です。
- [Issue #112](../issue-notes/112.md) は、`tonejs-json-sequencer`を使用して複数音符を演奏する機能の実装を目指していますが、ライブラリのストリームデモと利用可能なビルドデモの公開まで待機状態です。
- [Issue #52](../issue-notes/52.md) は、複数の音符シーケンス実装後に、シーケンスタブでTone.js、WAVプリレンダリング、自前レンダリングの3つの演奏モードを切り替える機能の追加を計画しています。

## 次の一手候補
1.  [Issue #112](../issue-notes/112.md) と [Issue #113](../issue-notes/113.md) の外部依存ライブラリの進捗調査
    -   最初の小さな一歩: `tonejs-json-sequencer` と `tonejs-mml-to-json` と思われるGitHubリポジトリを特定し、IssueやREADMEを確認する。
    -   Agent実行プロンプ:
        ```
        対象ファイル: なし (主にインターネット検索とGitHubリポジトリの調査)

        実行内容: `tonejs-json-sequencer` および `tonejs-mml-to-json` と思われるGitHubリポジトリを特定し、そのリポジトリのIssue、README、最新のコミットログを調査してください。特に「stream demo」「sequence実装」といったキーワードに関連する進捗があるかを確認してください。

        確認事項: 調査結果がGitHubや公式ドキュメントに基づいていることを確認し、憶測ではない事実のみを報告してください。

        期待する出力: markdown形式で、各ライブラリの特定されたリポジトリURL、現在のバージョン（もしあれば）、そして「stream demo」や「sequence実装」に関する最新の進捗状況、またはその言及が見つからない場合の報告をまとめてください。
        ```

2.  MML入力/シーケンサーUIの設計・プロトタイピング
    -   最初の小さな一歩: `index.html` にMML入力用のtextareaと、再生/停止ボタンの仮配置、およびシーケンスの基本的な表示エリアのHTML構造を追加する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `index.html`

        実行内容: `index.html`の既存のUI構造に影響を与えないように、MML入力用の`<textarea>`要素、および「再生」「停止」ボタンのプレースホルダー、そしてシーケンスの情報を表示するエリア（例: `<div id="sequence-display"></div>`）をHTMLとして追加してください。追加する要素にはそれぞれ適切なIDを付与してください（例: `mml-input`, `play-mml-button`, `stop-mml-button`）。

        確認事項: 既存のHTML要素とのID重複がないか、またページのレイアウトを大きく崩さないことを確認してください。追加する要素は、将来的にCSSでスタイリングしやすいように、意味的なタグと適切なクラス名/IDを使用してください。

        期待する出力: `index.html` の変更を反映したdiff形式のファイル変更内容、または更新された `index.html` の全文をmarkdownのコードブロックで出力してください。
        ```

3.  [Issue #52](../issue-notes/52.md) 演奏モード切り替え機能の要件詳細化
    -   最初の小さな一歩: `docs/` ディレクトリに新しいドキュメントファイル `docs/seq-mode-switching-requirements.md` を作成し、演奏モード切り替え機能に関する初期の要件とUI案を記述する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `docs/seq-mode-switching-requirements.md` (新規作成)

        実行内容: [Issue #52](../issue-notes/52.md) で言及されている「Tone.js instrument sampler による演奏」「wavにprerenderしてから演奏」「自前実装seq & rendererでWebAudio非依存renderした演奏」の3つの演奏モードについて、以下の観点から要件を詳細化し、`docs/seq-mode-switching-requirements.md` ファイルを新規作成してください。
        1.  各モードの選択方法（例：プルダウンメニュー、タブUI）
        2.  各モード選択時にユーザーに表示すべき情報（例：現在のモード、レンダリング状況、音質設定など）
        3.  モード切り替え時の挙動（例：再生中の停止、設定のリセット）
        4.  各モードの分析用途における主要な差分点（データミスによる品質低下の検証視点）

        確認事項: ドキュメントの内容が、[Issue #52](../issue-notes/52.md) の意図を正確に反映していることを確認してください。ハルシネーションを避け、現時点での情報に基づいて具体的な要件を記述してください。

        期待する出力: 新規作成される `docs/seq-mode-switching-requirements.md` の内容をmarkdown形式で出力してください。

---
Generated at: 2026-02-12 07:07:10 JST
