Last updated: 2026-01-17

# Development Status

## 現在のIssues
- [Issue #57](../issue-notes/57.md) は、外部ライブラリ `tonejs-json-sequencer` がCDNで利用可能になるまで、その機能の実装を待機している状態です。
- [Issue #52](../issue-notes/52.md) では、複数の音符シーケンス実装後、シーケンサータブで複数の演奏方法（Tone.js、プリレンダWAV、自前レンダラー）を切り替える機能の実装が課題です。
- これらの機能は、Tone.jsと自前実装の品質を相補的に検証するための基盤となります。

## 次の一手候補
1. 複数の音符シーケンス再生機能の実装（[Issue #52](../issue-notes/52.md) の前段階）
   - 最初の小さな一歩: `src/synth.ts` に単一のノートを連続して再生する基本的なシーケンスロジックを追加する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/synth.ts`, `src/index.ts`

     実行内容: `src/synth.ts` に、定義された複数のノート（MIDIノート番号とデュレーション）を順次再生する基本的なシーケンス再生ロジックを追加してください。また、`src/index.ts` からそのシーケンスを呼び出すための簡単なUIトリガー（例: ボタンクリック）を追加してください。

     確認事項: 既存のオーディオ再生機能（`src/audio-player.ts` や `src/synth.ts` 内の既存メソッド）との連携方法、およびUI（`src/index.ts`）からの呼び出し方法に整合性があるか確認してください。追加するシーケンスロジックが既存のWeb Audio APIのコンテキストと適切に統合されることを確認してください。

     期待する出力: シーケンス再生ロジックが追加された `src/synth.ts` および `src/index.ts` の変更内容を提示してください。また、実装後のテスト方法（例: 複数ノートが順次再生されることの確認）をmarkdown形式で説明してください。
     ```

2. Tone.js `Sampler` を用いた演奏機能の基本統合（[Issue #52](../issue-notes/52.md) の一部）
   - 最初の小さな一歩: `src/audio-player.ts` または `src/synth.ts` にTone.js `Sampler` を初期化し、単一の音符を再生する基本機能を実装する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/audio-player.ts`, `src/synth.ts`, `src/index.ts`, `package.json`

     実行内容: `src/audio-player.ts` または `src/synth.ts` にTone.jsの`Sampler`を組み込み、指定されたサンプル音源（例: ドラムキットやピアノ）をロードして、`src/index.ts` から呼び出せるようにする基本機能を実装してください。まずは単一のノートを再生できることを目標とします。必要であれば`package.json`にTone.jsの依存関係を追加してください。

     確認事項: Tone.jsライブラリが適切にロードされ、Web Audio APIのコンテキストと衝突しないことを確認してください。また、既存のオーディオ再生パスに影響を与えないように注意してください。`package.json` に`Tone`の依存関係が適切に追加されているか確認してください。

     期待する出力: Tone.js `Sampler` を用いた再生機能が実装された `src/audio-player.ts` または `src/synth.ts` および、それを呼び出す `src/index.ts` の変更内容を提示してください。加えて、必要な `package.json` の変更と、実装後の動作確認手順をmarkdown形式で説明してください。
     ```

3. `tonejs-json-sequencer` のCDN対応状況の再調査（[Issue #57](../issue-notes/57.md) 関連）
   - 最初の小さな一歩: `tonejs-json-sequencer` のGitHubリポジトリやnpmパッケージのドキュメント、関連するIssueやプルリクエストを確認し、CDNでの利用可能性や進捗状況を調査する。
   - Agent実行プロンプト:
     ```
     対象ファイル: なし (外部リソースの調査)

     実行内容: `tonejs-json-sequencer` ライブラリのCDN対応状況を調査してください。具体的には、公式GitHubリポジトリ（例: `https://github.com/Tonejs/tonejs-json-sequencer`）、npmパッケージページ、関連するIssueやプルリクエストを検索し、CDN経由での利用方法や今後の対応予定に関する情報を収集してください。

     確認事項: 調査対象のライブラリが `tonejs-json-sequencer` であることを確認し、最新の情報に基づいて分析を行ってください。

     期待する出力: 調査結果をmarkdown形式で報告してください。報告には、CDN利用の可否、利用可能なCDNサービス（あれば）、将来的な対応計画、関連するIssueやプルリクエストのリンク、およびその内容の要約を含めてください。
     ```

---
Generated at: 2026-01-17 07:03:14 JST
