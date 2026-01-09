Last updated: 2026-01-10

# Development Status

## 現在のIssues
- [Issue #58](../issue-notes/58.md) は `cat-oscilloscope` 導入後の波形ビジュアライズ実装を待機しています。
- [Issue #57](../issue-notes/57.md) は `tonejs-json-sequencer` のCDNインポート対応を待つ状態です。
- [Issue #52](../issue-notes/52.md) は複数音符シーケンス実装後にTone.jsと自前実装の再生・分析オプション提供を目指しています。

## 次の一手候補
1. [Issue #52](../issue-notes/52.md) 複数音符シーケンスのためのデータ構造と再生ロジックの設計
   - 最初の小さな一歩: 複数の音符とタイミング情報を持つシンプルなシーケンスデータ構造（例: `{ time: number, duration: number, frequency: number, velocity: number }[]`）を定義し、それを扱うためのスケルトンクラスまたは関数を `src/synth.ts` または `src/audio-player.ts` に追加する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/timing.ts`, `src/synth.ts`, `src/audio-player.ts`

     実行内容:
     - `src/timing.ts` に `NoteEvent` インターフェース（`{ time: number, duration: number, frequency: number, velocity: number }` など）を定義してください。
     - `src/synth.ts` または `src/audio-player.ts` に、この `NoteEvent` の配列を受け取り、シーケンスを再生するための新しいメソッド (`playSequence(sequence: NoteEvent[]): void`) のシグネチャと、最低限の内部構造（例えば、配列をループして各音符をスケジュールするロジックのプレースホルダー）を追加してください。
     - 既存の再生ロジック (`playOscillator`) との整合性を考慮してください。

     確認事項:
     - 新しいデータ構造とメソッドが既存の`AudioPlayer`や`Synth`の設計思想と矛盾しないか。
     - 将来的な拡張性（例: 異なるインストゥルメント、エフェクトチェーン）を阻害しないか。
     - 依存関係の変更が最小限に抑えられているか。

     期待する出力:
     - `src/timing.ts` に `NoteEvent` インターフェースが追加されていること。
     - `src/synth.ts` または `src/audio-player.ts` に `playSequence` メソッドのスケルトンが追加されており、現在の `playOscillator` メソッドと共存できる状態になっていること。
     - 変更内容を説明するMarkdown形式のレポート。
     ```

2. [Issue #57](../issue-notes/57.md) `tonejs-json-sequencer` のCDN対応状況の調査と代替シーケンサーの実現可能性分析
   - 最初の小さな一歩: `tonejs-json-sequencer` のGitHubリポジトリやnpmパッケージ、関連フォーラムを調査し、CDNでの利用状況や今後の見込み、およびWebブラウザ環境で利用可能な他の軽量なJSONベースのシーケンサーライブラリの有無について情報を収集する。
   - Agent実行プロンプト:
     ```
     対象ファイル: なし（Web調査結果をMarkdownにまとめる）

     実行内容:
     - `tonejs-json-sequencer` の最新のリリース情報、Issueトラッカー、関連ドキュメントを確認し、CDNでの利用可否またはそのロードマップに関する情報を収集してください。
     - CDN利用が難しい場合、npmパッケージとしてプロジェクトにバンドルする方法の実現可能性を短時間で分析してください。
     - もしくは、プロジェクトの要件（JSONベースのシーケンス定義、Tone.jsとの連携可能性）を満たす、他の軽量なJavaScriptシーケンサーライブラリを2-3候補ピックアップし、それぞれの特徴、導入の容易さ、ライセンスについて比較分析してください。

     確認事項:
     - 収集された情報が最新かつ信頼できるソースからのものであること。
     - 代替案の検討が、将来的な`Tone.js`エコシステムとの統合を完全に排除しないか（可能であれば共存が望ましい）。

     期待する出力:
     - `tonejs-json-sequencer` のCDN対応状況と、もし非対応の場合の代替導入方法に関する分析結果。
     - 2-3の代替シーケンサーライブラリの比較（特徴、導入難易度、ライセンス）。
     - 上記をまとめたMarkdown形式のレポート。
     ```

3. [Issue #58](../issue-notes/58.md) 既存のWAVデータまたは再生中の音声から簡易波形をCanvasに描画するプロトタイプの作成
   - 最初の小さな一歩: HTMLの`<canvas>`要素に、ダミーデータまたはWeb Audio APIの`AnalyserNode`から取得したデータを基に、基本的な矩形波またはサイン波の視覚化ロジックを実装する。これにより、将来的な`cat-oscilloscope`統合の足がかりとする。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/index.ts` (または新規ファイル `src/waveform-display.ts`)、`index.html`

     実行内容:
     - `src/waveform-display.ts` のような新しいファイルを作成し、`WaveformDisplay` クラスまたは関数を定義してください。
     - このクラス/関数は、`<canvas>` 要素を受け取り、ダミーの波形データ（例: 0-1の範囲のランダムな値の配列や、サイン波のサンプルデータ）をそのCanvasに描画するシンプルなロジックを実装してください。
     - 波形の描画は、基本的な線グラフ形式で構いません。
     - `src/index.ts` からこの `WaveformDisplay` を初期化し、`index.html` にCanvas要素を追加して、ブラウザで動作確認できるようにしてください。

     確認事項:
     - Canvasの描画処理がブラウザのメインスレッドを過度にブロックしないか（ただし、この段階では簡潔さを優先）。
     - 将来的に`AnalyserNode`からのリアルタイムデータやWAVファイルのデコードデータを受け取れるようなインターフェースを意識しているか。
     - UIコンポーネントとして独立して動作する設計になっているか。

     期待する出力:
     - `src/waveform-display.ts` (または同様のファイル) が作成され、Canvasに簡易波形を描画する機能が実装されていること。
     - `src/index.ts` および `index.html` にそのコンポーネントが組み込まれ、ブラウザで視覚的に確認できること。
     - 実装の詳細と動作確認結果を記載したMarkdown形式のレポート。

---
Generated at: 2026-01-10 07:03:54 JST
