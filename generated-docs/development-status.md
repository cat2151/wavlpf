Last updated: 2026-02-07

# Development Status

## 現在のIssues
-   [Issue #113](../issue-notes/113.md) は、MMLからJSONへの変換を扱うライブラリの利用を提案していますが、これは[Issue #112](../issue-notes/112.md)でシーケンサー機能が実装されるまで保留されています。
-   [Issue #112](../issue-notes/112.md) は、複数音符を演奏するための`tonejs-json-sequencer`の導入を目指しており、外部のストリームデモのライブラリ利用版が利用可能になるまで待機中です。
-   [Issue #52](../issue-notes/52.md) は、複数のシーケンサー実装後に、Tone.jsや自前レンダラーなど複数の演奏・レンダリング方式をプルダウンで選択できるUIの追加を計画しています。

## 次の一手候補
1.  [Issue #112](../issue-notes/112.md) - `tonejs-json-sequencer` の導入と最小動作確認
    -   最初の小さな一歩: `tonejs-json-sequencer` を `package.json` に追加し、簡単なJSONシーケンスを再生する最小限のコードを `src/synth.ts` に実装する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: package.json, src/index.ts, src/synth.ts

        実行内容:
        1. `tonejs-json-sequencer` を `package.json` の依存関係に追加してください。
        2. `src/synth.ts` に `tonejs-json-sequencer` をインポートし、最小限のJSONデータ（例: `[{ time: 0, note: 'C4' }, { time: 0.5, note: 'D4' }]`）を使って単一の音を再生するSequencerインスタンスを生成する関数を実装してください。
        3. この関数を `src/index.ts` から呼び出し、ページのロード時に一度だけ実行されるように設定してください。既存の音生成ロジックに影響を与えないよう、一時的なデバッグ目的のコードとして追加し、後で簡単に削除できるようにコメントを加えてください。

        確認事項:
        - `tonejs-json-sequencer` がnpmレジストリで利用可能か確認してください。
        - 既存のオーディオコンテキストやシンセサイザーの初期化ロジックと競合しないか確認してください。
        - Minimalな実装とし、エラーが発生しないことを確認してください。

        期待する出力: `package.json` と `src/synth.ts`, `src/index.ts` の変更内容を記載したMarkdown。変更箇所は差分形式で表示し、追加されたコードの簡単な説明を含めてください。
        ```

2.  [Issue #113](../issue-notes/113.md) - `tonejs-mml-to-json` のAPI調査と簡単なMML変換
    -   最初の小さな一歩: `tonejs-mml-to-json` のドキュメントを読み込み、簡単なMML文字列（例: `CDEFGAB`）をJSONに変換するコードスニペットを生成し、その結果を確認する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: package.json, src/mml-test.ts (新規作成), tsconfig.json

        実行内容:
        1. `tonejs-mml-to-json` を `package.json` の依存関係に追加してください。
        2. `src/mml-test.ts` (新規作成) に `tonejs-mml-to-json` をインポートし、簡単なMML文字列（例: `"C4 D4 E4"`）をJSON形式に変換する関数を実装してください。
        3. この関数を実行し、変換されたJSONオブジェクトをコンソールに出力するコードを追加してください。
        4. この `src/mml-test.ts` がビルドプロセスに含まれるように `tsconfig.json` を更新してください (もし必要であれば)。

        確認事項:
        - `tonejs-mml-to-json` がnpmレジストリで利用可能か確認してください。
        - 変換後のJSON形式が `tonejs-json-sequencer` で利用可能な形式と互換性があるか、ドキュメントベースで予備的に確認してください。
        - 既存のプロジェクト設定（特に`tsconfig.json`）に変更が必要ないか確認してください。

        期待する出力: `package.json` と `src/mml-test.ts` (および必要であれば `tsconfig.json`) の変更内容を記載したMarkdown。追加されたコードの簡単な説明と、MML変換のサンプル出力を含めてください。
        ```

3.  [Issue #52](../issue-notes/52.md) - 演奏モード選択プルダウンのUI骨格作成
    -   最初の小さな一歩: `index.html` に「演奏モード」を選択するプルダウンメニューのHTML要素を追加し、`src/ui-params.ts` でそのプルダウンの値を読み込むダミーロジックを追加する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: index.html, src/ui-params.ts, src/index.ts

        実行内容:
        1. `index.html` の適切な箇所に、IDが `playback-mode-select` となる `<select>` 要素を追加してください。このプルダウンには、現時点ではダミーのオプションとして「Tone.js Sampler」「Pre-render WAV」「Custom Renderer」の3つを含めてください。
        2. `src/ui-params.ts` に、新しいgetter `getPlaybackMode()` を追加してください。このgetterは `playback-mode-select` の現在の選択値を取得するダミーロジック（例: `document.getElementById('playback-mode-select').value`）を実装してください。
        3. `src/index.ts` から `uiParams.getPlaybackMode()` を呼び出し、コンソールに選択されたモードを出力するデバッグコードを、UI初期化後に追加してください。

        確認事項:
        - `index.html` の変更が既存のレイアウトを壊さないことを確認してください。
        - `src/ui-params.ts` に新しいUIパラメータを追加する既存のパターンと整合性があることを確認してください。
        - JavaScriptがDOM要素を正しく取得できることを確認してください。

        期待する出力: `index.html`, `src/ui-params.ts`, `src/index.ts` の変更内容を記載したMarkdown。HTML要素の追加場所と、JavaScriptの新しい関数、およびデバッグ出力の例を含めてください。

---
Generated at: 2026-02-07 07:03:32 JST
