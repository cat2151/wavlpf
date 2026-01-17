Last updated: 2026-01-18

# Development Status

## 現在のIssues
- オシロスコープの波形表示レイアウトが破綻 ([Issue #100](../issue-notes/100.md)) しており、パネル配置やオーバーレイ表示の修正とスクリーンショット検証ツールの改善 ([Issue #101](../issue-notes/101.md)) が進行中です。
- シーケンサー機能については、`tonejs-json-sequencer` のCDNインポート待ち ([Issue #57](../issue-notes/57.md)) となっており、その状況確認が必要です。
- また、複数の音符シーケンス実装後に、Tone.js、WAVプリレンダリング、自前レンダリングの3種類の演奏/レンダリング方法をプルダウンで選択できる機能の追加 ([Issue #52](../issue-notes/52.md)) が構想されています。

## 次の一手候補
1. オシロスコープの表示レイアウトとオーバーレイの最終検証と調整 ([Issue #101](../issue-notes/101.md), [Issue #100](../issue-notes/100.md))
   - 最初の小さな一歩: `index.html`と`src/oscilloscope.ts`の現在の実装をレビューし、`waveform-test.png`と比較して、[Issue #100](../issue-notes/100.md)で指摘されたレイアウト破綻が解消されているか、および[Issue #101](../issue-notes/101.md)で追加されたパネルが適切に配置されているかを確認する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `index.html`, `src/oscilloscope.ts`, `docs/OSCILLOSCOPE_LAYOUT.md`, `waveform-test.png`

     実行内容:
     1. `index.html` の `.oscilloscope-panels` およびその子要素 (`.oscilloscope-panel`, `.oscilloscope-debug-overlay` など) のCSSとHTML構造が、[Issue #100](../issue-notes/100.md) で指摘されたレイアウト破綻を解決し、[Issue #101](../issue-notes/101.md) で意図された表示を実現しているかを分析してください。
     2. `src/oscilloscope.ts` における各Canvas要素の描画ロジックが、HTMLで定義されたパネルと正しく連携し、意図した情報を表示しているかを確認してください。
     3. `waveform-test.png` と `docs/OSCILLOSCOPE_LAYOUT.md` を参照し、現在の実装が設計通りであるか、または追加の調整が必要かを判断してください。

     確認事項:
     - ブラウザでの表示が意図通りか。
     - 各パネル（フレームバッファ、比較パネル、ピアノ鍵盤、デバッグオーバーレイ）が重なったり、画面外にはみ出したりしていないか。
     - `waveform-test.png` が現在の実装状態を正確に反映しているか。

     期待する出力: markdown形式で、現在のレイアウト実装の状態（問題点、改善点）と、[Issue #101](../issue-notes/101.md) および [Issue #100](../issue-notes/100.md) の完了に向けた具体的な次のアクションプランを記述してください。特に、どのファイルにどのような修正が必要か、もしあればその具体的なコード差分を提案してください。
     ```

2. `tonejs-json-sequencer` のCDNインポート状況の確認と代替案検討 ([Issue #57](../issue-notes/57.md))
   - 最初の小さな一歩: `tonejs-json-sequencer` の公式リポジトリや関連コミュニティを調査し、CDNでの利用可能性に関する最新の進捗状況やロードマップを確認する。
   - Agent実行プロンプト:
     ```
     対象ファイル: なし（主に外部情報の調査）

     実行内容:
     1. `tonejs-json-sequencer` のGitHubリポジトリ、ドキュメント、Issueトラッカー、および関連するTone.jsコミュニティフォーラムを調査し、CDNでの利用に関する最新情報を収集してください。
     2. CDNで利用可能になる見込みがない場合、または長期化しそうな場合、本プロジェクトにおける `tonejs-json-sequencer` の必要性を再評価し、代替ライブラリの利用、または一時的なローカルバンドルなどの代替案を検討してください。

     確認事項:
     - `tonejs-json-sequencer` がCDN経由で利用可能になる具体的なロードマップやタイムラインが存在するか。
     - 現在のプロジェクトで `tonejs-json-sequencer` が具体的にどのような機能のために必要とされているか。
     - 代替ライブラリや回避策を導入した場合の技術的な影響（工数、互換性など）。

     期待する出力: markdown形式で、`tonejs-json-sequencer` のCDN利用に関する調査結果、およびその結果に基づいたプロジェクトへの影響と、[Issue #57](../issue-notes/57.md) に対する具体的な次のアクションプラン（例：継続して待つ、代替案を検討する、Issueをクローズするなど）を記述してください。
     ```

3. シーケンサー演奏/レンダリング選択機能の設計初期検討 ([Issue #52](../issue-notes/52.md))
   - 最初の小さな一歩: `src/index.ts` および `src/synth.ts` を中心に、現在のシーケンス処理とオーディオレンダリングの構造を分析し、[Issue #52](../issue-notes/52.md) で提案されている3つの演奏/レンダリング方法を組み込むためのアーキテクチャ案を検討する。特にUIとバックエンドの連携方法に焦点を当てる。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/index.ts`, `src/synth.ts`, `index.html` (UI部分)

     実行内容:
     1. `src/index.ts`と`src/synth.ts`を分析し、現在のオーディオ生成、シーケンス、レンダリングの主要なロジックを特定してください。
     2. [Issue #52](../issue-notes/52.md) で提案されている「Tone.js instrument sampler による演奏」「一度wavにprerenderしてから演奏」「自前実装seq & rendererでWebAudio非依存renderした演奏」の3つのモードを切り替えるためのUI (プルダウン) を `index.html` にどのように追加し、各モードの選択がバックエンドのロジック (`src/synth.ts` など) にどのように影響するか、その連携メカニズムについて設計案を考案してください。
     3. 各モードの切り替えが、既存のパフォーマンスやリソース利用にどのような影響を与えるかを概説してください。

     確認事項:
     - 現在のコードベースで、新しいレンダリングパスを追加する際の拡張性。
     - [Issue #57](../issue-notes/57.md) との依存関係（`tonejs-json-sequencer`が利用できない場合、Tone.js samplerの代替をどうするか）。
     - UIの追加が既存のユーザー体験を損なわないか。

     期待する出力: markdown形式で、シーケンサー機能の演奏/レンダリング選択機能の初期設計案を記述してください。具体的には、UIの変更案（HTML構造）、バックエンドのモジュール分割案、各レンダリングモードの実装に必要な主要な関数やクラス、および[Issue #57](../issue-notes/57.md)との依存関係についての考察を含めてください。
     ```

---
Generated at: 2026-01-18 07:03:25 JST
