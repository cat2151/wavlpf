Last updated: 2026-01-06

# 開発状況生成プロンプト（開発者向け）

## 生成するもの：
- 現在openされているissuesを3行で要約する
- 次の一手の候補を3つlistする
- 次の一手の候補3つそれぞれについて、極力小さく分解して、その最初の小さな一歩を書く

## 生成しないもの：
- 「今日のissue目標」などuserに提案するもの
  - ハルシネーションの温床なので生成しない
- ハルシネーションしそうなものは生成しない（例、無価値なtaskや新issueを勝手に妄想してそれをuserに提案する等）
- プロジェクト構造情報（来訪者向け情報のため、別ファイルで管理）

## 「Agent実行プロンプト」生成ガイドライン：
「Agent実行プロンプト」作成時は以下の要素を必ず含めてください：

### 必須要素
1. **対象ファイル**: 分析/編集する具体的なファイルパス
2. **実行内容**: 具体的な分析や変更内容（「分析してください」ではなく「XXXファイルのYYY機能を分析し、ZZZの観点でmarkdown形式で出力してください」）
3. **確認事項**: 変更前に確認すべき依存関係や制約
4. **期待する出力**: markdown形式での結果や、具体的なファイル変更

### Agent実行プロンプト例

**良い例（上記「必須要素」4項目を含む具体的なプロンプト形式）**:
```
対象ファイル: `.github/workflows/translate-readme.yml`と`.github/workflows/call-translate-readme.yml`

実行内容: 対象ファイルについて、外部プロジェクトから利用する際に必要な設定項目を洗い出し、以下の観点から分析してください：
1) 必須入力パラメータ（target-branch等）
2) 必須シークレット（GEMINI_API_KEY）
3) ファイル配置の前提条件（README.ja.mdの存在）
4) 外部プロジェクトでの利用時に必要な追加設定

確認事項: 作業前に既存のworkflowファイルとの依存関係、および他のREADME関連ファイルとの整合性を確認してください。

期待する出力: 外部プロジェクトがこの`call-translate-readme.yml`を導入する際の手順書をmarkdown形式で生成してください。具体的には：必須パラメータの設定方法、シークレットの登録手順、前提条件の確認項目を含めてください。
```

**避けるべき例**:
- callgraphについて調べてください
- ワークフローを分析してください
- issue-noteの処理フローを確認してください

## 出力フォーマット：
以下のMarkdown形式で出力してください：

```markdown
# Development Status

## 現在のIssues
[以下の形式で3行でオープン中のissuesを要約。issue番号を必ず書く]
- [1行目の説明]
- [2行目の説明]
- [3行目の説明]

## 次の一手候補
1. [候補1のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```

2. [候補2のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```

3. [候補3のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```
```


# 開発状況情報
- 以下の開発状況情報を参考にしてください。
- Issue番号を記載する際は、必ず [Issue #番号](../issue-notes/番号.md) の形式でMarkdownリンクとして記載してください。

## プロジェクトのファイル一覧
- .github/actions-tmp/.github/workflows/call-callgraph.yml
- .github/actions-tmp/.github/workflows/call-daily-project-summary.yml
- .github/actions-tmp/.github/workflows/call-issue-note.yml
- .github/actions-tmp/.github/workflows/call-rust-windows-check.yml
- .github/actions-tmp/.github/workflows/call-translate-readme.yml
- .github/actions-tmp/.github/workflows/callgraph.yml
- .github/actions-tmp/.github/workflows/check-recent-human-commit.yml
- .github/actions-tmp/.github/workflows/daily-project-summary.yml
- .github/actions-tmp/.github/workflows/issue-note.yml
- .github/actions-tmp/.github/workflows/rust-windows-check.yml
- .github/actions-tmp/.github/workflows/translate-readme.yml
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/callgraph.ql
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/codeql-pack.lock.yml
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/qlpack.yml
- .github/actions-tmp/.github_automation/callgraph/config/example.json
- .github/actions-tmp/.github_automation/callgraph/docs/callgraph.md
- .github/actions-tmp/.github_automation/callgraph/presets/callgraph.js
- .github/actions-tmp/.github_automation/callgraph/presets/style.css
- .github/actions-tmp/.github_automation/callgraph/scripts/analyze-codeql.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/callgraph-utils.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/check-codeql-exists.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/check-node-version.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/common-utils.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/copy-commit-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/extract-sarif-info.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/find-process-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generate-html-graph.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generateHTML.cjs
- .github/actions-tmp/.github_automation/check_recent_human_commit/scripts/check-recent-human-commit.cjs
- .github/actions-tmp/.github_automation/project_summary/docs/daily-summary-setup.md
- .github/actions-tmp/.github_automation/project_summary/prompts/development-status-prompt.md
- .github/actions-tmp/.github_automation/project_summary/prompts/project-overview-prompt.md
- .github/actions-tmp/.github_automation/project_summary/scripts/ProjectSummaryCoordinator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/DevelopmentStatusGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/GitUtils.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/IssueTracker.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/generate-project-summary.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/CodeAnalyzer.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectAnalysisOrchestrator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectDataCollector.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectDataFormatter.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectOverviewGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/BaseGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/FileSystemUtils.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/ProjectFileUtils.cjs
- .github/actions-tmp/.github_automation/translate/docs/TRANSLATION_SETUP.md
- .github/actions-tmp/.github_automation/translate/scripts/translate-readme.cjs
- .github/actions-tmp/.gitignore
- .github/actions-tmp/.vscode/settings.json
- .github/actions-tmp/LICENSE
- .github/actions-tmp/README.ja.md
- .github/actions-tmp/README.md
- .github/actions-tmp/_config.yml
- .github/actions-tmp/generated-docs/callgraph.html
- .github/actions-tmp/generated-docs/callgraph.js
- .github/actions-tmp/generated-docs/development-status-generated-prompt.md
- .github/actions-tmp/generated-docs/development-status.md
- .github/actions-tmp/generated-docs/project-overview-generated-prompt.md
- .github/actions-tmp/generated-docs/project-overview.md
- .github/actions-tmp/generated-docs/style.css
- .github/actions-tmp/googled947dc864c270e07.html
- .github/actions-tmp/issue-notes/10.md
- .github/actions-tmp/issue-notes/11.md
- .github/actions-tmp/issue-notes/12.md
- .github/actions-tmp/issue-notes/13.md
- .github/actions-tmp/issue-notes/14.md
- .github/actions-tmp/issue-notes/15.md
- .github/actions-tmp/issue-notes/16.md
- .github/actions-tmp/issue-notes/17.md
- .github/actions-tmp/issue-notes/18.md
- .github/actions-tmp/issue-notes/19.md
- .github/actions-tmp/issue-notes/2.md
- .github/actions-tmp/issue-notes/20.md
- .github/actions-tmp/issue-notes/21.md
- .github/actions-tmp/issue-notes/22.md
- .github/actions-tmp/issue-notes/23.md
- .github/actions-tmp/issue-notes/24.md
- .github/actions-tmp/issue-notes/25.md
- .github/actions-tmp/issue-notes/26.md
- .github/actions-tmp/issue-notes/27.md
- .github/actions-tmp/issue-notes/28.md
- .github/actions-tmp/issue-notes/29.md
- .github/actions-tmp/issue-notes/3.md
- .github/actions-tmp/issue-notes/30.md
- .github/actions-tmp/issue-notes/4.md
- .github/actions-tmp/issue-notes/7.md
- .github/actions-tmp/issue-notes/8.md
- .github/actions-tmp/issue-notes/9.md
- .github/actions-tmp/package-lock.json
- .github/actions-tmp/package.json
- .github/actions-tmp/src/main.js
- .github/copilot-instructions.md
- .github/workflows/call-daily-project-summary.yml
- .github/workflows/call-issue-note.yml
- .github/workflows/call-translate-readme.yml
- .github/workflows/deploy.yml
- .gitignore
- ARCHITECTURE_DIAGRAMS.md
- CAT_OSCILLOSCOPE_FEASIBILITY_ANALYSIS.md
- CAT_OSCILLOSCOPE_INTEGRATION.md
- CAT_OSCILLOSCOPE_LIBRARY_BEST_PRACTICES.md
- DEVELOPMENT.md
- IMPLEMENTATION_EXAMPLES.md
- INTEGRATION_BLOCKERS_SUMMARY.md
- LICENSE
- README.ja.md
- README.md
- README_ANALYSIS.md
- SUMMARY.md
- _config.yml
- generated-docs/project-overview-generated-prompt.md
- index.html
- issue-notes/21.md
- issue-notes/24.md
- issue-notes/25.md
- issue-notes/28.md
- issue-notes/30.md
- issue-notes/31.md
- issue-notes/33.md
- issue-notes/35.md
- issue-notes/37.md
- issue-notes/39.md
- issue-notes/41.md
- package-lock.json
- package.json
- src/filter.test.ts
- src/filter.ts
- src/index.ts
- src/oscillator.test.ts
- src/oscillator.ts
- src/settings.test.ts
- src/settings.ts
- src/synth.ts
- src/wasmAudio.ts
- src/wav.test.ts
- src/wav.ts
- tsconfig.json
- vite.config.ts
- wasm-audio/Cargo.toml
- wasm-audio/src/lib.rs

## 現在のオープンIssues
## [Issue #41](../issue-notes/41.md): 今後のDSPコアをRustでクレートでネイティブからも利用する用途を優先し、Rust処理がある部分は、Rustに一本化し、同じ機能のTypeScript部を削除する
[issue-notes/41.md](https://github.com/cat2151/wavlpf/blob/main/issue-notes/41.md)

...
ラベル: 
--- issue-notes/41.md の内容 ---

```markdown
# issue 今後の音声コアをRustでクレートでネイティブからも利用する用途を優先し、Rust処理がある部分は、Rustに一本化し、同じ機能のTypeScript部を削除する #41
[issues #41](https://github.com/cat2151/wavlpf/issues/41)



```

## [Issue #40](../issue-notes/40.md): Add statistical performance tracking to improve generation time display precision
Browser security features (timing attack mitigation) quantize `performance.now()` to 1-10ms increments, causing generation time to display only as 0ms, 10ms, 20ms, 30ms. Single measurements cannot be made more precise due to browser limitations.

## Changes

**Statistical tracking** (`src/synth.ts`)...
ラベル: 
--- issue-notes/40.md の内容 ---

```markdown

```

## [Issue #39](../issue-notes/39.md): 波形生成処理の処理時間表示が、0ms、10ms、20ms、30msの4種類しか表示されない。より正確に処理時間を計測表示する方法があるか分析する
[issue-notes/39.md](https://github.com/cat2151/wavlpf/blob/main/issue-notes/39.md)

...
ラベル: 
--- issue-notes/39.md の内容 ---

```markdown
# issue 波形生成処理の処理時間表示が、0ms、10ms、20ms、30msの4種類しか表示されない。より正確に処理時間を計測表示する方法があるか分析する #39
[issues #39](https://github.com/cat2151/wavlpf/issues/39)



```

## [Issue #30](../issue-notes/30.md): フィルタにLPF以外の、BPF, HPF, notch, APF, lowShelf, highShelf もプルダウンで選べるようにする
[issue-notes/30.md](https://github.com/cat2151/wavlpf/blob/main/issue-notes/30.md)

...
ラベル: 
--- issue-notes/30.md の内容 ---

```markdown
# issue フィルタにLPF以外の、BPF, HPF, notch, APF, lowShelf, highShelf もプルダウンで選べるようにする #30
[issues #30](https://github.com/cat2151/wavlpf/issues/30)



```

## ドキュメントで言及されているファイルの内容
### .github/actions-tmp/issue-notes/30.md
```md
{% raw %}
# issue 進捗状況生成時、issueに紐付くissue-notesがないときエラー終了してしまう #30
[issues #30](https://github.com/cat2151/github-actions/issues/30)

# 何が困るの？
- 生成されない

# 分析
- issue紐付くissue-notesが存在しないことは普通にある
- 今回も、そうなっていることを確認済み
    - issue 1～8はissue-notesがあった
    - 当該のissue 9は、issue本体のコメントに書いて進行していた
        - issue-notesの仕組みを使う前に書いたissueなので、そうなっていた
- こうするのがよい
    - エラーにならず、空文字として扱う

# close条件
- 当該部分で落ちなくなること
    - 当該部分とは：
    - https://github.com/cat2151/fighting-game-button-challenge
        - issue 9



{% endraw %}
```

### issue-notes/30.md
```md
{% raw %}
# issue フィルタにLPF以外の、BPF, HPF, notch, APF, lowShelf, highShelf もプルダウンで選べるようにする #30
[issues #30](https://github.com/cat2151/wavlpf/issues/30)



{% endraw %}
```

### .github/actions-tmp/issue-notes/9.md
```md
{% raw %}
# issue 関数コールグラフhtmlビジュアライズが0件なので、原因を可視化する #9
[issues #9](https://github.com/cat2151/github-actions/issues/9)

# agentに修正させたり、人力で修正したりした
- agentがハルシネーションし、いろいろ根の深いバグにつながる、エラー隠蔽などを仕込んでいたため、検知が遅れた
- 詳しくはcommit logを参照のこと
- WSL + actの環境を少し変更、act起動時のコマンドライン引数を変更し、generated-docsをmountする（ほかはデフォルト挙動であるcpだけにする）ことで、デバッグ情報をコンテナ外に出力できるようにし、デバッグを効率化した

# test green

# closeとする

{% endraw %}
```

### issue-notes/39.md
```md
{% raw %}
# issue 波形生成処理の処理時間表示が、0ms、10ms、20ms、30msの4種類しか表示されない。より正確に処理時間を計測表示する方法があるか分析する #39
[issues #39](https://github.com/cat2151/wavlpf/issues/39)



{% endraw %}
```

### issue-notes/41.md
```md
{% raw %}
# issue 今後の音声コアをRustでクレートでネイティブからも利用する用途を優先し、Rust処理がある部分は、Rustに一本化し、同じ機能のTypeScript部を削除する #41
[issues #41](https://github.com/cat2151/wavlpf/issues/41)



{% endraw %}
```

### src/synth.ts
```ts
{% raw %}
import { generateSawtooth, generatePulse } from './oscillator';
import { BiquadLPF } from './filter';
import { generateWav, createWavBlobUrl } from './wav';
import type * as ToneTypes from 'tone';
import {
  Settings,
  loadSettings,
  saveSettings,
  exportSettingsToFile,
  importSettingsFromFile,
} from './settings';
import { initWasm, isWasmInitialized, renderAudioWasm } from './wasmAudio';

// Tone.js is kept as null until the first user interaction. We dynamically import
// the module on a user click so that the underlying AudioContext is not created
// before a user gesture, which would violate browser autoplay policies.
let Tone: typeof ToneTypes | null = null;

// Track whether Tone.js is currently being loaded to prevent race conditions
let isToneLoading = false;

// Promise to track the loading state for concurrent clicks
let toneLoadingPromise: Promise<void> | null = null;

const SAMPLE_RATE = 44100;
const FREQUENCY = 220; // 220Hz (A3)

// Mouse position state
let mouseX = 0.5;
let mouseY = 0.5;

// Parameter state - loaded from settings
const initialSettings: Settings = loadSettings();
let bpm = initialSettings.bpm;
let beat = initialSettings.beat;
let qMax = initialSettings.qMax;
let cutoffMax = initialSettings.cutoffMax;
let decayUnit: 'Hz' | 'Cent' = initialSettings.decayUnit;
let decayRate = initialSettings.decayRate;
let waveformType: 'sawtooth' | 'pulse' = initialSettings.waveformType;
let dutyRatio = initialSettings.dutyRatio;

// Processor type: TypeScript or WASM - loaded from settings
let processorType: 'typescript' | 'wasm' = initialSettings.processorType;

/**
 * 現在の設定を取得
 */
function getCurrentSettings(): Settings {
  return {
    bpm,
    beat,
    qMax,
    cutoffMax,
    decayUnit,
    decayRate,
    waveformType,
    dutyRatio,
    processorType,
  };
}

// Track currently playing player
let currentPlayer: ToneTypes.Player | null = null;

// Track playback timeout for cleanup
let playbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

// Track whether playback loop has started
let isPlaybackLoopStarted = false;

/**
 * BPMとビート値から再生周期(秒)を計算
 * 
 * 4分音符の長さ = 60 / BPM [秒]
 * ビート値はノートの長さとして解釈: 1/beat
 *   - beat = 4 -> 4分音符
 *   - beat = 8 -> 8分音符
 * 
 * 再生周期 = (60秒 / BPM) × (4 / beat)
 * 例: BPM=120, beat=8の場合: (60/120) × (4/8) = 0.5 × 0.5 = 0.25秒 = 250ms
 * 例: BPM=120, beat=4の場合: (60/120) × (4/4) = 0.5 × 1   = 0.5秒  = 500ms
 */
function getDuration(): number {
  return (60 / bpm) * (4 / beat);
}

/**
 * textareaから数値パラメータを読み込んで検証
 * @param id - 要素のID
 * @param validator - 検証関数
 * @returns 検証済みの値、または検証失敗時はnull
 */
function readNumericParameter(
  id: string,
  validator: (value: number) => boolean
): number | null {
  const el = document.getElementById(id) as HTMLTextAreaElement | null;
  if (el) {
    const value = parseFloat(el.value);
    if (!isNaN(value) && validator(value)) {
      return value;
    }
  }
  return null;
}

/**
 * UIからパラメータを読み込む
 */
function readParameters(): void {
  const decayUnitEl = document.getElementById('decayUnit') as HTMLSelectElement | null;
  const waveformTypeEl = document.getElementById('waveformType') as HTMLSelectElement | null;
  const processorEl = document.getElementById('processor') as HTMLSelectElement | null;
  
  // Processor Type
  if (processorEl) {
    const value = processorEl.value;
    if (value === 'typescript' || value === 'wasm') {
      processorType = value;
    }
  }
  
  // BPM: 30-300の範囲で検証
  const bpmValue = readNumericParameter('bpm', (value) => value >= 30 && value <= 300);
  if (bpmValue !== null) {
    bpm = bpmValue;
  }
  
  // Beat: 1-32の範囲で検証
  const beatValue = readNumericParameter('beat', (value) => value >= 1 && value <= 32);
  if (beatValue !== null) {
    beat = beatValue;
  }
  
  // Q Max: 0.5-50の範囲で検証
  const qMaxValue = readNumericParameter('qMax', (value) => value >= 0.5 && value <= 50);
  if (qMaxValue !== null) {
    qMax = qMaxValue;
  }
  
  // Cutoff Max: 20-20000Hzの範囲で検証
  const cutoffMaxValue = readNumericParameter('cutoffMax', (value) => value >= 20 && value <= 20000);
  if (cutoffMaxValue !== null) {
    cutoffMax = cutoffMaxValue;
  }
  
  // Decay Unit
  if (decayUnitEl) {
    const value = decayUnitEl.value;
    if (value === 'Hz' || value === 'Cent') {
      decayUnit = value;
    }
  }
  
  // Decay Rate: 0.01以上で検証(0は減衰なしなので最小値を0.01に設定)
  const decayRateValue = readNumericParameter('decayRate', (value) => value >= 0.01);
  if (decayRateValue !== null) {
    decayRate = decayRateValue;
  }
  
  // Waveform Type
  if (waveformTypeEl) {
    const value = waveformTypeEl.value;
    if (value === 'sawtooth' || value === 'pulse') {
      waveformType = value;
    }
  }
  
  // Duty Ratio: 0-100の範囲で検証
  const dutyRatioValue = readNumericParameter('dutyRatio', (value) => value >= 0 && value <= 100);
  if (dutyRatioValue !== null) {
    dutyRatio = dutyRatioValue;
  }
  
  // Save settings to localStorage
  saveSettings(getCurrentSettings());
}

/**
 * セント値を周波数比に変換
 * @param cents - セント値
 * @returns 周波数比
 */
function centsToRatio(cents: number): number {
  return Math.pow(2, cents / 1200);
}

/**
 * マウス位置をフィルタパラメータにマッピング
 */
function getFilterParams(): { cutoff: number; q: number } {
  // X軸: カットオフ周波数 20Hz - cutoffMax
  const cutoff = 20 + mouseX * (cutoffMax - 20);
  // Y軸: Q値 0.5 - qMax (反転: 上端=高Q, 下端=低Q)
  const q = 0.5 + (1 - mouseY) * (qMax - 0.5);
  return { cutoff, q };
}

/**
 * LPFとカットオフ減衰を適用してオーディオをレンダリング (TypeScript実装)
 * @returns 生成されたオーディオサンプルと生成時間(ms)
 */
function renderAudioTypeScript(): { samples: Float32Array; generationTimeMs: number } {
  const startTime = performance.now();
  
  const duration = getDuration();
  
  // 選択された波形を生成
  const samples = waveformType === 'pulse'
    ? generatePulse(FREQUENCY, SAMPLE_RATE, duration, dutyRatio)
    : generateSawtooth(FREQUENCY, SAMPLE_RATE, duration);
  
  // フィルタを作成
  const filter = new BiquadLPF(SAMPLE_RATE);
  const { cutoff: initialCutoff, q } = getFilterParams();
  
  // カットオフ減衰を適用して各サンプルを処理
  const numSamples = samples.length;
  const output = new Float32Array(numSamples);
  
  // フィルタ係数を低頻度で更新(約1ms間隔)
  // 減衰が比較的緩やかなため、サンプル毎の更新より効率的
  const updateIntervalMs = 1;
  const samplesPerUpdate = Math.max(1, Math.floor(SAMPLE_RATE * (updateIntervalMs / 1000)));
  
  let currentCutoff = initialCutoff;
  
  for (let i = 0; i < numSamples; i++) {
    // samplesPerUpdateサンプル毎に係数を再計算
    if (i % samplesPerUpdate === 0) {
      // このサンプル位置での時間(ms)を計算
      const timeMs = (i / SAMPLE_RATE) * 1000;
      
      // 減衰単位とレートに基づいてカットオフを減衰
      if (decayUnit === 'Hz') {
        // Hz減衰: 1msあたりdecayRate Hz、最小1Hz
        currentCutoff = Math.max(1, initialCutoff - timeMs * decayRate);
      } else {
        // Cent減衰: 1msあたりdecayRate cent
        // 減衰の上限を設定して、理論的なカットオフが1Hz未満にならないようにする
        const maxCentsDecay = 1200 * Math.log2(initialCutoff);
        const totalCentsDecay = Math.min(timeMs * decayRate, maxCentsDecay);
        const ratio = centsToRatio(-totalCentsDecay); // 減衰なので負の値
        currentCutoff = Math.max(1, initialCutoff * ratio);
      }
      
      // この制御レートでフィルタ係数を更新
      filter.setCoefficients(currentCutoff, q);
    }
    
    // 現在のフィルタ係数でサンプルを処理
    output[i] = filter.processSample(samples[i]);
  }
  
  const endTime = performance.now();
  const generationTimeMs = endTime - startTime;
  
  return { samples: output, generationTimeMs };
}

/**
 * LPFとカットオフ減衰を適用してオーディオをレンダリング
 * @returns 生成されたオーディオサンプルと生成時間(ms)
 */
function renderAudio(): { samples: Float32Array; generationTimeMs: number } {
  if (processorType === 'wasm') {
    // WASM実装を使用
    if (!isWasmInitialized()) {
      console.warn('WASM not initialized, falling back to TypeScript');
      return renderAudioTypeScript();
    }
    
    const duration = getDuration();
    const { cutoff: initialCutoff, q } = getFilterParams();
    
    try {
      return renderAudioWasm(
        waveformType,
        FREQUENCY,
        SAMPLE_RATE,
        duration,
        dutyRatio,
        initialCutoff,
        q,
        decayUnit,
        decayRate,
      );
    } catch (error) {
      console.error('WASM rendering failed, falling back to TypeScript:', error);
      return renderAudioTypeScript();
    }
  } else {
    // TypeScript実装を使用
    return renderAudioTypeScript();
  }
}

/**
 * Generate and play audio
 */
async function playAudio(): Promise<void> {
  // Ensure Tone is loaded
  if (!Tone) {
    console.warn('Tone.js not loaded yet');
    return;
  }
  
  // Render audio
  const { samples, generationTimeMs } = renderAudio();
  
  // Generate WAV
  const wavData = generateWav(samples, SAMPLE_RATE);
  const wavUrl = createWavBlobUrl(wavData);
  
  // Stop previous player if exists
  if (currentPlayer) {
    try {
      currentPlayer.stop();
      currentPlayer.dispose();
    } catch (error) {
      // Log errors instead of silently ignoring them
      console.warn('Failed to stop or dispose previous player:', error);
    }
  }
  
  // Create and play new player
  currentPlayer = new Tone.Player(wavUrl).toDestination();
  await Tone.loaded();
  currentPlayer.start();
  
  // Update generation time display
  updateGenerationTimeDisplay(generationTimeMs);
  
  // Clean up URL after playback (match duration)
  setTimeout(() => {
    URL.revokeObjectURL(wavUrl);
  }, getDuration() * 1000);
}

/**
 * UIフィールドを現在の設定値で更新
 */
function updateUIFields(): void {
  const bpmEl = document.getElementById('bpm') as HTMLTextAreaElement | null;
  const beatEl = document.getElementById('beat') as HTMLTextAreaElement | null;
  const qMaxEl = document.getElementById('qMax') as HTMLTextAreaElement | null;
  const cutoffMaxEl = document.getElementById('cutoffMax') as HTMLTextAreaElement | null;
  const decayUnitEl = document.getElementById('decayUnit') as HTMLSelectElement | null;
  const decayRateEl = document.getElementById('decayRate') as HTMLTextAreaElement | null;
  const waveformTypeEl = document.getElementById('waveformType') as HTMLSelectElement | null;
  const dutyRatioEl = document.getElementById('dutyRatio') as HTMLTextAreaElement | null;
  const processorEl = document.getElementById('processor') as HTMLSelectElement | null;
  
  if (bpmEl) bpmEl.value = String(bpm);
  if (beatEl) beatEl.value = String(beat);
  if (qMaxEl) qMaxEl.value = String(qMax);
  if (cutoffMaxEl) cutoffMaxEl.value = String(cutoffMax);
  if (decayUnitEl) decayUnitEl.value = decayUnit;
  if (decayRateEl) decayRateEl.value = String(decayRate);
  if (waveformTypeEl) waveformTypeEl.value = waveformType;
  if (dutyRatioEl) dutyRatioEl.value = String(dutyRatio);
  if (processorEl) processorEl.value = processorType;
}

/**
 * シンセサイザーを初期化
 */
export async function init(): Promise<void> {
  // Initialize WASM module early (but don't block on it)
  initWasm().catch((error) => {
    console.error('Failed to initialize WASM module:', error);
    
    // Provide UI feedback when WASM initialization fails
    const processorSelect = document.getElementById('processor') as HTMLSelectElement | null;
    if (processorSelect) {
      // Disable WASM option
      const wasmOption = Array.from(processorSelect.options).find(
        (option) => option.value === 'wasm',
      );
      if (wasmOption) {
        wasmOption.disabled = true;
        wasmOption.text = 'Rust WASM (unavailable)';
      }
      // If WASM is currently selected, fall back to TypeScript
      if (processorSelect.value === 'wasm') {
        processorSelect.value = 'typescript';
        processorType = 'typescript';
      }
    }
  });
  
  // マウス位置を追跡
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    // 表示を更新
    const cutoff = Math.round(20 + mouseX * (cutoffMax - 20));
    const q = (0.5 + (1 - mouseY) * (qMax - 0.5)).toFixed(2);
    
    const display = document.getElementById('params');
    if (display) {
      display.textContent = `Cutoff: ${cutoff}Hz | Q: ${q}`;
    }
  });
  
  // パラメータ変更のための入力イベントリスナーを追加(デバウンス処理)
  let inputDebounceTimer: number | null = null;
  const handleInputChange = () => {
    if (inputDebounceTimer !== null) {
      clearTimeout(inputDebounceTimer);
    }
    inputDebounceTimer = window.setTimeout(() => {
      readParameters();
      updateUIFields(); // 検証された値でUIを更新し、無効な入力との不一致を防ぐ
      updateStatusDisplay();
      
      // パラメータ変更時に既存の再生スケジュールをキャンセルして再スケジュール
      if (isPlaybackLoopStarted && playbackTimeoutId !== null) {
        clearTimeout(playbackTimeoutId);
        const duration = getDuration();
        playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
      }
    }, 150);
  };
  
  const inputs = ['bpm', 'beat', 'qMax', 'cutoffMax', 'decayUnit', 'decayRate', 'waveformType', 'dutyRatio', 'processor'];
  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', handleInputChange);
    }
  });
  
  // UIフィールドを保存済み設定で初期化
  updateUIFields();
  
  // パラメータの初期読み込み
  readParameters();
  updateStatusDisplay();
  
  // Export settings button handler
  const exportBtn = document.getElementById('exportSettings');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      exportSettingsToFile(getCurrentSettings());
    });
  }
  
  // Import settings button handler
  const importBtn = document.getElementById('importSettings');
  if (importBtn) {
    importBtn.addEventListener('click', async () => {
      const importedSettings = await importSettingsFromFile();
      
      if (!importedSettings) {
        // User cancelled or error occurred
        const statusEl = document.getElementById('status');
        if (statusEl) {
          const originalText = statusEl.textContent;
          statusEl.textContent = '設定のインポートに失敗しました。ファイル形式を確認してください。';
          setTimeout(() => {
            if (statusEl.textContent?.includes('インポートに失敗')) {
              statusEl.textContent = originalText;
            }
          }, 3000);
        }
        return;
      }
      
      // Update state
      bpm = importedSettings.bpm;
      beat = importedSettings.beat;
      qMax = importedSettings.qMax;
      cutoffMax = importedSettings.cutoffMax;
      decayUnit = importedSettings.decayUnit;
      decayRate = importedSettings.decayRate;
      waveformType = importedSettings.waveformType;
      dutyRatio = importedSettings.dutyRatio;
      processorType = importedSettings.processorType;
      
      // Update UI
      updateUIFields();
      updateStatusDisplay();
      
      // Save to localStorage
      saveSettings(importedSettings);
      
      // Show success feedback
      const statusEl = document.getElementById('status');
      if (statusEl) {
        const originalText = statusEl.textContent;
        statusEl.textContent = '設定をインポートしました。';
        setTimeout(() => {
          if (statusEl.textContent?.includes('インポートしました')) {
            statusEl.textContent = originalText;
          }
        }, 3000);
      }
      
      // Reschedule playback if already playing
      if (isPlaybackLoopStarted && playbackTimeoutId !== null) {
        clearTimeout(playbackTimeoutId);
        const duration = getDuration();
        playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
      }
    });
  }
  
  // 計算された再生周期に基づいてオーディオを再生(再帰的setTimeoutでエラーハンドリング)
  function scheduleNextPlay() {
    if (Tone && Tone.context.state === 'running') {
      playAudio().catch((error: unknown) => {
        console.error('Error while playing audio:', error);
      });
    }
    const duration = getDuration();
    playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
  }
  
  // Click handler for starting audio
  const handleClick = async (event: Event) => {
    // For touch events, prevent the subsequent click event from firing.
    // This ensures handleClick is only called once per tap on touch devices.
    // Note: This may interfere with touch scrolling, but is necessary to prevent
    // duplicate audio context initialization on touch-enabled devices.
    if (event.type === 'touchstart') {
      event.preventDefault();
    }
    
    // Load Tone.js dynamically on first user interaction to comply with browser autoplay policies.
    // Dynamic import ensures AudioContext is only created after a user gesture.
    if (!Tone && !isToneLoading) {
      isToneLoading = true;
      toneLoadingPromise = (async () => {
        try {
          Tone = await import('tone') as typeof ToneTypes;
        } catch (error) {
          console.error('Failed to load Tone.js:', error);
          throw error;
        } finally {
          isToneLoading = false;
          toneLoadingPromise = null;
        }
      })();
    }
    
    // Wait for Tone.js to finish loading if another click initiated the load
    if (toneLoadingPromise) {
      try {
        await toneLoadingPromise;
      } catch (error) {
        return; // Loading failed
      }
    }
    
    if (!Tone) {
      return; // Failed to load
    }
    
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }
    
    // Start playback loop only once
    if (!isPlaybackLoopStarted) {
      isPlaybackLoopStarted = true;
      scheduleNextPlay();
    }
  };
  
  // Attach click listener only to document to avoid duplicate execution from event bubbling
  // Touch events use { passive: false } since preventDefault() is called in the handler
  document.addEventListener('click', handleClick);
  document.addEventListener('touchstart', handleClick, { passive: false });
}

/**
 * 現在の設定でステータス表示を更新
 */
function updateStatusDisplay(): void {
  const statusEl = document.getElementById('status');
  if (statusEl) {
    const duration = getDuration();
    statusEl.textContent = `New audio generated every ${(duration * 1000).toFixed(0)}ms (BPM: ${bpm}, Beat: ${beat})`;
  }
}

/**
 * 波形生成時間を表示
 * @param generationTimeMs - 生成時間(ミリ秒)
 */
function updateGenerationTimeDisplay(generationTimeMs: number): void {
  const genTimeEl = document.getElementById('generationTime');
  if (genTimeEl) {
    const processorName = processorType === 'wasm' ? 'Rust WASM' : 'TypeScript';
    genTimeEl.textContent = `Generation time (${processorName}): ${generationTimeMs.toFixed(2)}ms`;
  }
}

/**
 * Stop the synthesizer and clean up resources
 */
export function dispose(): void {
  // Clear playback timeout
  if (playbackTimeoutId !== null) {
    clearTimeout(playbackTimeoutId);
    playbackTimeoutId = null;
  }
  
  // Reset playback loop flag
  isPlaybackLoopStarted = false;
  
  // Stop and dispose current player
  if (currentPlayer) {
    try {
      currentPlayer.stop();
      currentPlayer.dispose();
    } catch (error) {
      console.warn('Failed to dispose player during cleanup:', error);
    }
    currentPlayer = null;
  }
}

{% endraw %}
```

## 最近の変更（過去7日間）
### コミット履歴:
6672d9f Add issue note for #41 [auto]
b16dbb7 Merge pull request #38 from cat2151/copilot/optimize-rust-build-for-speed
c4f6755 Enable wasm-opt for optimized Rust WASM builds
85752da Add issue note for #39 [auto]
28dc17a Add issue note for #37 [auto]
3246c2a Initial plan
402e17c Merge pull request #36 from cat2151/copilot/fix-ci-failure
9c2ded9 PRレビューコメントに対応
062e724 wasm-packバージョンを固定
712cb3f wasm-pack-actionを使用して高速化

### 変更されたファイル:
.github/workflows/deploy.yml
.gitignore
README.md
issue-notes/35.md
issue-notes/37.md
issue-notes/39.md
issue-notes/41.md
wasm-audio/Cargo.toml


---
Generated at: 2026-01-06 07:03:16 JST
