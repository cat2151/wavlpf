Last updated: 2026-01-07

# Development Status

## 現在のIssues
- [Issue #49](../issue-notes/49.md) と [Issue #48](../issue-notes/48.md) は、既存のWASMベースの波形生成に加え、Tone.jsによる直接合成モードを導入することを目的としています。
- この機能により、ユーザーは画面上部のタブを通じて異なるオーディオ生成モードを切り替え、UXを比較検証できるようになります。
- 具体的には、新しい`src/tonejs-synth.ts`モジュールでTone.jsのMonoSynthとFilterを統合し、リアルタイムでのフィルターパラメータ更新に対応する予定です。

## 次の一手候補
1. Tone.jsによる直接合成モードの実装と`src/tonejs-synth.ts`の初期化 [Issue #49](../issue-notes/49.md)
   - 最初の小さな一歩: `src/tonejs-synth.ts` を新規作成し、Tone.jsをインポート、モノシンセとフィルターの基本設定を記述する関数を実装する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/tonejs-synth.ts` (新規作成), `src/synth.ts`

     実行内容: `src/tonejs-synth.ts`を新規作成し、Tone.jsのMonoSynthとFilterを初期化し、220Hzで基本波形を生成する機能を実装してください。また、`src/synth.ts`からこの新しいモジュールが呼び出せるように、既存のWASMベースの`renderAudio`関数と並行して機能するための呼び出し側の調整も考慮し、必要な変更を加えてください。

     確認事項: `src/synth.ts`の既存のオーディオ再生ロジック（WASMベース）に影響を与えないことを確認してください。Tone.jsのAudioContextがユーザーのインタラクション後にのみ初期化されるように、遅延ロードのパターンを維持してください。`src/tonejs-synth.ts`が、`src/synth.ts`で定義されている`FREQUENCY`や`SAMPLE_RATE`などの共通定数をどのように扱うかを検討してください。

     期待する出力: `src/tonejs-synth.ts`ファイルの内容（Tone.jsの初期化と音源生成の基本ロジック）。`src/synth.ts`の変更点（新しいTone.jsモジュールのインポートと、再生モード切り替えのための準備ロジック）。
     ```

2. 波形生成モード切り替え用UI（タブ）の実装 [Issue #48](../issue-notes/48.md)
   - 最初の小さな一歩: `index.html`にWASMモードとTone.jsモードを切り替えるためのタブUI要素を追加し、JavaScriptでタブ切り替え時に表示内容を切り替えるダミーのロジックを作成する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `index.html`, `src/synth.ts`

     実行内容: `index.html`に「WASMモード」と「Tone.jsモード」を切り替えるためのタブUIを追加してください。タブ切り替え時に、それぞれのモードに対応する設定パネルや再生ボタンが表示/非表示になるように、基本的なJavaScriptロジックを`src/synth.ts`内に実装してください。

     確認事項: 既存のUI要素（BPM, QMaxなど）が両モードで適切に表示されるか、またはモード固有の要素が正しく表示/非表示になるかを確認してください。タブの状態がlocalStorageに保存され、ページ再読み込み後も維持されるように考慮してください。タブ切り替え時に不要なオーディオプロセスが実行されないようにしてください。

     期待する出力: `index.html`の変更内容（タブHTML構造とCSSクラス）。`src/synth.ts`の変更内容（タブの状態管理とDOM操作のロジック）。
     ```

3. Tone.jsモードでのリアルタイムフィルタパラメータ更新の実装 [Issue #49](../issue-notes/49.md)
   - 最初の小さな一歩: `src/tonejs-synth.ts`内で、マウス位置に基づいてTone.jsのフィルターパラメータ（カットオフ、Q）を50msでスロットリングしながらリアルタイムに更新するロジックを実装する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/tonejs-synth.ts`, `src/synth.ts`

     実行内容: `src/tonejs-synth.ts`に、`src/synth.ts`の`getFilterParams`関数と同様のロジックを統合し、`mouseX`と`mouseY`の値に基づいてTone.jsのフィルターノードのカットオフ周波数とQ値をリアルタイムで更新する機能を実装してください。更新頻度は50msにスロットリングしてください。

     確認事項: `src/synth.ts`の`getFilterParams`ロジックと一貫性があることを確認してください。パフォーマンスへの影響を最小限に抑えるため、スロットリングが正しく機能していることを確認してください。フィルターパラメータがUI上の`cutoffMax`や`qMax`設定を適切に反映することを確認してください。

     期待する出力: `src/tonejs-synth.ts`の変更内容（フィルターパラメータ更新ロジックとスロットリング）。リアルタイム更新が機能することを示す簡潔なテストまたは説明。

---
Generated at: 2026-01-07 07:03:43 JST
