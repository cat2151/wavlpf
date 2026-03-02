Last updated: 2026-03-03

# Development Status

## 現在のIssues
- `tonejs-json-sequencer` のライブラリ利用版を待ちつつ、MMLから複数音符を演奏する機能（[Issue #112](../issue-notes/112.md), [Issue #113](../issue-notes/113.md)）の実装が保留されています。
- シーケンサー機能実装後、Tone.jsによる演奏と自前実装レンダリングを比較するUI（[Issue #52](../issue-notes/52.md)）の開発が予定されています。
- これらはいずれもMMLベースの音楽シーケンスとレンダリングに関する機能拡張であり、相互に依存しています。

## 次の一手候補
1.  [Issue #112](../issue-notes/112.md) 依存ライブラリ `tonejs-json-sequencer` の進捗調査
    -   最初の小さな一歩: `tonejs-json-sequencer` のGitHubリポジトリを確認し、`stream demoのライブラリ利用版` の現状と利用可能性に関する情報を収集する。
    -   Agent実行プロンプ:
        ```
        対象ファイル: `package.json` (プロジェクトの依存関係確認のため)

        実行内容: `tonejs-json-sequencer` およびそれが依存する `stream demoのライブラリ利用版` の最新のステータス、特にライブラリとして利用可能になっているか、または今後のロードマップについて調査してください。関連するGitHubリポジトリのREADME、issue、commit history、および公開されているドキュメントを分析してください。

        確認事項: 該当ライブラリが公開されているGitHubリポジトリのURL、ドキュメントの場所、現在のバージョン。

        期待する出力: 調査結果をMarkdown形式で出力してください。具体的には、ライブラリの利用可能性、進捗状況、関連するコード例やドキュメントへのリンク、及び `wavlpf` プロジェクトで利用する上での障壁や次のアクションの提案を含めてください。
        ```

2.  [Issue #113](../issue-notes/113.md) `tonejs-mml-to-json` の出力JSON形式と互換性の事前検討
    -   最初の小さな一歩: `tonejs-mml-to-json` のGitHubリポジトリやドキュメントを調査し、MML入力から生成されるJSON構造の例を確認する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `tonejs-mml-to-json` のGitHubリポジトリ上のドキュメントやコード例

        実行内容: `tonejs-mml-to-json` がMMLをどのようなJSON形式に変換するかを分析し、そのJSON形式が `tonejs-json-sequencer` で利用可能な形式であるかを評価してください。互換性がない場合は、どのような変換ブリッジが必要になるかを検討してください。

        確認事項: `tonejs-mml-to-json` が想定するMML入力と出力されるJSONの仕様、`tonejs-json-sequencer` が期待する入力JSON形式の仕様。

        期待する出力: `tonejs-mml-to-json` の出力JSON形式の例、`tonejs-json-sequencer` が期待する入力JSON形式の仕様、そして両者の互換性に関する分析結果をMarkdown形式で出力してください。必要であれば、互換性を持たせるための変換ロジックの概要も提案してください。
        ```

3.  [Issue #52](../issue-notes/52.md) シーケンサー機能選択UIの仮設計
    -   最初の小さな一歩: `index.html` と `src/synth-ui-setup.ts` を参照し、新しいシーケンサー機能選択用のタブまたはプルダウンメニューをどこに追加すべきか、および必要なDOM要素の構成を検討する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `index.html`, `src/styles.css`, `src/synth-ui-setup.ts`

        実行内容: [Issue #52](../issue-notes/52.md)で求められている「Tone.js instrument sampler による演奏」「wavにprerenderしてから演奏」「自前実装seq & rendererでWebAudio非依存renderした演奏」の3つの選択肢を切り替えるためのUI要素（例えばプルダウンメニューや新しいタブ）の仮設計を行ってください。既存のUIコンポーネントとの統合方法やデザイン面での考慮事項を分析してください。

        確認事項: 既存のUIコンポーネントの構造、`src/synth-ui-setup.ts` におけるUI要素の操作方法、`src/styles.css` でのスタイリング規則、ユーザーが切り替えやすいUX。

        期待する出力: Markdown形式でUIの仮設計案を記述してください。具体的には、`index.html` に追加するHTML要素の構造の概要、`src/styles.css` に追加するCSSの概要、`src/synth-ui-setup.ts` でのイベントハンドリングやDOM操作の骨子を含めてください。

---
Generated at: 2026-03-03 07:06:41 JST
