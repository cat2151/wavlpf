Last updated: 2026-02-13

# Development Status

## 現在のIssues
- [Issue #112](../issue-notes/112.md) は、Tone.js JSONシーケンサーを利用し、複数音符のプログラム的再生機能の導入を待っています。
- [Issue #113](../issue-notes/113.md) は、MMLテキストをJSONに変換し、上記シーケンサーで再生する機能の実装を[Issue #112](../issue-notes/112.md)の完了を前提としています。
- [Issue #52](../issue-notes/52.md) は、複数音符再生の実装後に、Tone.jsと自前レンダラーの切り替え検証メカニズムの追加を計画しています。

## 次の一手候補
1. [Issue #112](../issue-notes/112.md): tonejs-json-sequencer を利用して複数音符を演奏できるようにする
   - 最初の小さな一歩: `tonejs-json-sequencer` npmパッケージをインストールし、`src/synth.ts`に最小限の`Sequencer`インスタンスを作成。簡単なノートイベント配列をハードコードし、再生機能を実装する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `package.json`, `src/synth.ts`, `src/index.ts`

     実行内容:
     1. `package.json`に`tonejs-json-sequencer`パッケージを追加。
     2. `src/synth.ts`に`tonejs-json-sequencer`をインポートし、`Tone.Sampler`または`Tone.Synth`と連携する`Sequencer`インスタンスを初期化するコードを追加。
     3. `[{ time: 0, note: "C4", duration: "8n" }, { time: 0.5, note: "E4", duration: "8n" }]`のような簡単なJSON配列をシーケンサーに渡し、再生を開始・停止できる関数を`src/synth.ts`に実装。
     4. `src/index.ts`からこれらの関数を呼び出し、ボタンクリックなどでデモ再生ができるようにする。

     確認事項:
     * `tonejs-json-sequencer`の正確なnpmパッケージ名とバージョンを確認。
     * `Tone.js`のインスタンス（`Tone.Synth`や`Tone.Sampler`など）が正しく初期化され、`Sequencer`に接続されていることを確認。
     * シーケンサーが期待通りに音符を再生することを確認（再生時間、音程、音長など）。
     * 既存のコードベース（特に`src/synth.ts`と`src/index.ts`）との統合がスムーズに行われるように、既存の`Tone.js`関連コードに影響がないことを確認。

     期待する出力:
     * `package.json`の`dependencies`に`tonejs-json-sequencer`が追加された状態。
     * `src/synth.ts`に`Sequencer`の初期化、ノートイベントのロード、再生/停止機能が実装された状態。
     * `src/index.ts`に`src/synth.ts`のシーケンサー再生/停止関数を呼び出すためのデモUI（ボタンなど）が追加され、手動で複数音符の再生が確認できる状態。
     ```

2. [Issue #113](../issue-notes/113.md): tonejs-mml-to-jsonをライブラリとして利用し、MMLをtextareaに書いたら演奏できるようにする
   - 最初の小さな一歩: `tonejs-mml-to-json`をインストールし、MML文字列をJSON配列に変換するユーティリティを作成する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `package.json`, `src/synth.ts`, `src/index.ts`

     実行内容:
     1. `package.json`に`tonejs-mml-to-json`パッケージを追加。
     2. `src/synth.ts`に`tonejs-mml-to-json`をインポートし、MML文字列を受け取って、[Issue #112](../issue-notes/112.md)で導入される`tonejs-json-sequencer`が解釈できる形式のJSON配列に変換する関数を実装。
     3. `src/index.ts`にMML入力用のtextareaと、変換ボタン、および変換されたJSONを表示する領域（またはシーケンサーに渡して再生するデモ）を追加。

     確認事項:
     * `tonejs-mml-to-json`の正確なnpmパッケージ名とバージョンを確認。
     * 基本的なMML文字列（例: `C4 D4 E4`）が正しくJSON配列に変換されるか、特に時間情報（`time`プロパティ）が`tonejs-json-sequencer`と互換性のある形式であることを確認。
     * 変換後のJSONが期待通りのノートイベント（`note`, `duration`など）を含んでいることを確認。
     * 既存のコードベースに影響を与えず、MML入力UIが適切に統合されることを確認。

     期待する出力:
     * `package.json`の`dependencies`に`tonejs-mml-to-json`が追加された状態。
     * `src/synth.ts`にMMLからJSONへの変換関数が実装された状態。
     * `src/index.ts`にMML入力用のtextareaと、MMLをJSONに変換し、[Issue #112](../issue-notes/112.md)で導入されたシーケンサーで再生できるデモUIが追加された状態。
     ```

3. [Issue #52](../issue-notes/52.md): seqタブにおいて、Tone.js instrument sampler による演奏 / それを一度wavにprerenderしてから演奏（分析用） / 自前実装seq & rendererでWebAudio非依存renderした演奏（分析用）とを、プルダウンで選べるようにする。
   - 最初の小さな一歩: Tone.jsが提供する異なる音源（例: `Tone.Sampler`や`Tone.PolySynth`）の基本的なインスタンス化と再生を試す。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/synth.ts`, `src/index.ts`

     実行内容:
     1. `src/synth.ts`に、現在の`Tone.Synth`だけでなく、`Tone.Sampler`や`Tone.PolySynth`など、複数の種類の音源を初期化する例を追加。
     2. これらの異なる音源を切り替えて（例: トグルボタンで切り替え）、簡単な音符（例: `C4`）を再生できるデモ関数を`src/synth.ts`に実装。
     3. `src/index.ts`に、これらの音源切り替え機能を呼び出すUI（例: ラジオボタンまたはプルダウン）を追加し、各音源で単一の音符が再生できることを確認。

     確認事項:
     * 各`Tone.js`音源（`Synth`, `Sampler`, `PolySynth`など）の初期化に必要なパラメータと、音符再生のためのAPIを正確に把握する。
     * 特に`Tone.Sampler`の場合、サンプルファイルのパス解決方法（`baseUrl`など）が適切に設定されていることを確認。必要であれば、ダミーのサンプル音源を一時的に使用。
     * 複数の音源が同時に、または切り替え時に適切に動作し、オーディオコンテキストに問題がないことを確認。
     * 既存の`src/synth.ts`の構造を極力維持しつつ、新しい音源を追加する拡張性を考慮する。

     期待する出力:
     * `src/synth.ts`に複数のTone.js音源（`Synth`, `Sampler`, `PolySynth`など）の初期化と、それらを切り替えて音を鳴らすための関数が実装された状態。
     * `src/index.ts`に音源を切り替えるためのUI要素と、選択された音源で音符を再生するデモコードが追加された状態。
     ```

---
Generated at: 2026-02-13 07:07:36 JST
