Last updated: 2026-01-18

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
- .github/workflows/ci.yml
- .github/workflows/create-issue-on-ci-failure.yml
- .github/workflows/deploy.yml
- .gitignore
- DEVELOPMENT.md
- ISSUE_39_SUMMARY.md
- LICENSE
- MODULE_DEPENDENCIES.md
- NETWORK_RESTRICTIONS_INVESTIGATION.md
- PERFORMANCE_DISPLAY_DEMO.md
- PERFORMANCE_TIMING_ANALYSIS.md
- README.ja.md
- README.md
- REFACTORING_SUMMARY.md
- SUMMARY.md
- _config.yml
- copilot-instructions.md
- docs/CAT_OSCILLOSCOPE_WASM_SETUP.md
- docs/COPILOT_GITHUB_PAGES_ACCESS.md
- docs/DEPLOYMENT_VERIFICATION.md
- docs/GITHUB_PAGES_ACCESS_PROPOSAL.md
- docs/ISSUE_76_RESOLUTION.md
- docs/ISSUE_78_RESOLUTION.md
- docs/OSCILLOSCOPE_LAYOUT.md
- docs/OSCILLOSCOPE_USAGE.md
- generated-docs/project-overview-generated-prompt.md
- index.html
- issue-notes/100.md
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
- issue-notes/44.md
- issue-notes/46.md
- issue-notes/48.md
- issue-notes/50.md
- issue-notes/52.md
- issue-notes/53.md
- issue-notes/55.md
- issue-notes/57.md
- issue-notes/58.md
- issue-notes/59.md
- issue-notes/61.md
- issue-notes/63.md
- issue-notes/66.md
- issue-notes/68.md
- issue-notes/70.md
- issue-notes/74.md
- issue-notes/76.md
- issue-notes/78.md
- issue-notes/80.md
- issue-notes/82.md
- issue-notes/84.md
- issue-notes/86.md
- issue-notes/88.md
- issue-notes/90.md
- issue-notes/92.md
- issue-notes/94.md
- issue-notes/96.md
- issue-notes/98.md
- package-lock.json
- package.json
- scripts/README.md
- scripts/install-wasm-pack.sh
- scripts/investigate-404.js
- scripts/investigate-cat-oscilloscope.js
- scripts/setup-cat-oscilloscope-wasm.js
- scripts/test-console-logs.js
- scripts/test-waveform-screenshot.js
- scripts/verify-deployment.js
- src/audio-player.ts
- src/index.ts
- src/oscilloscope.test.ts
- src/oscilloscope.ts
- src/performance-stats.test.ts
- src/performance-stats.ts
- src/playback-mode.ts
- src/settings.test.ts
- src/settings.ts
- src/synth.ts
- src/timing.test.ts
- src/timing.ts
- src/ui-params.test.ts
- src/ui-params.ts
- src/wasmAudio.ts
- src/wav.test.ts
- src/wav.ts
- tsconfig.json
- vite.config.ts
- wasm-audio/Cargo.toml
- wasm-audio/README.md
- wasm-audio/src/audio_renderer.rs
- wasm-audio/src/filter.rs
- wasm-audio/src/lib.rs
- wasm-audio/src/oscillator.rs
- waveform-test.png

## 現在のオープンIssues
## [Issue #101](../issue-notes/101.md): Fix oscilloscope panels layout and overlay positioning, improve screenshot verification tooling
- [x] スクリーンショットの取得に成功
- [x] 破綻内容を可視化
- [x] 改善レイアウトの実装
- [x] 修正の検証
- [x] 一時ファイルの削除
- [x] ドキュメントの修正
- [x] クリック後のスクリーンショット取得
- [x] スクリプトとドキュメントの更新
- [x] npm scriptの追加とドキュメント改善
- [x] オーバーレイレイアウト設定の追加
- [x] ローカルPR検証オーケストレーションスクリプトの追加

## 実装した修正

### 1. コード修正
**index.html**の`.oscilloscope-panels`のCSSを修正：
...
ラベル: 
--- issue-notes/101.md の内容 ---

```markdown

```

## [Issue #100](../issue-notes/100.md): 波形表示の表示レイアウトが破綻している
[issue-notes/100.md](https://github.com/cat2151/wavlpf/blob/main/issue-notes/100.md)

...
ラベル: 
--- issue-notes/100.md の内容 ---

```markdown
# issue 波形表示の表示レイアウトが破綻している #100
[issues #100](https://github.com/cat2151/wavlpf/issues/100)



```

## [Issue #57](../issue-notes/57.md): tonejs-json-sequencer がCDN importできるようになるまで待つ
[issue-notes/57.md](https://github.com/cat2151/wavlpf/blob/main/issue-notes/57.md)

...
ラベル: 
--- issue-notes/57.md の内容 ---

```markdown
# issue tonejs-json-sequencer がCDN importできるようになるまで待つ #57
[issues #57](https://github.com/cat2151/wavlpf/issues/57)



```

## [Issue #52](../issue-notes/52.md): （複数の音符のseqの実装後）seqタブにおいて、Tone.js instrument sampler による演奏 / それを一度wavにprerenderしてから演奏（分析用） / 自前実装seq & rendererでWebAudio非依存renderした演奏（分析用）とを、プルダウンで選べるようにする。Tone.jsを経由したrenderと自前renderどちらもデータミスによる品質低下が別々に発生しそうなので相補的に運用して検証する用
[issue-notes/52.md](https://github.com/cat2151/wavlpf/blob/main/issue-notes/52.md)

...
ラベル: 
--- issue-notes/52.md の内容 ---

```markdown
# issue seqタブにおいて、Tone.js instrument sampler による演奏 / それを一度wavにprerenderしてから演奏（分析用） / 自前実装seq & rendererでWebAudio非依存renderした演奏（分析用）とを、プルダウンで選べるようにする。Tone.jsを経由したrenderと自前renderどちらもデータミスによる品質低下が別々に発生しそうなので相補的に運用して検証する用 #52
[issues #52](https://github.com/cat2151/wavlpf/issues/52)



```

## ドキュメントで言及されているファイルの内容
### .github/actions-tmp/issue-notes/2.md
```md
{% raw %}
# issue GitHub Actions「関数コールグラフhtmlビジュアライズ生成」を共通ワークフロー化する #2
[issues #2](https://github.com/cat2151/github-actions/issues/2)


# prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
このymlファイルを、以下の2つのファイルに分割してください。
1. 共通ワークフロー       cat2151/github-actions/.github/workflows/callgraph_enhanced.yml
2. 呼び出し元ワークフロー cat2151/github-actions/.github/workflows/call-callgraph_enhanced.yml
まずplanしてください
```

# 結果
- indent
    - linter？がindentのエラーを出しているがyml内容は見た感じOK
    - テキストエディタとagentの相性問題と判断する
    - 別のテキストエディタでsaveしなおし、テキストエディタをreload
    - indentのエラーは解消した
- LLMレビュー
    - agent以外の複数のLLMにレビューさせる
    - prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
以下の2つのファイルをレビューしてください。最優先で、エラーが発生するかどうかだけレビューしてください。エラー以外の改善事項のチェックをするかわりに、エラー発生有無チェックに最大限注力してください。

--- 共通ワークフロー

# GitHub Actions Reusable Workflow for Call Graph Generation
name: Generate Call Graph

# TODO Windowsネイティブでのtestをしていた名残が残っているので、今後整理していく。今はWSL act でtestしており、Windowsネイティブ環境依存問題が解決した
#  ChatGPTにレビューさせるとそこそこ有用そうな提案が得られたので、今後それをやる予定
#  agentに自己チェックさせる手も、セカンドオピニオンとして選択肢に入れておく

on:
  workflow_call:

jobs:
  check-commits:
    runs-on: ubuntu-latest
    outputs:
      should-run: ${{ steps.check.outputs.should-run }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 50 # 過去のコミットを取得

      - name: Check for user commits in last 24 hours
        id: check
        run: |
          node .github/scripts/callgraph_enhanced/check-commits.cjs

  generate-callgraph:
    needs: check-commits
    if: needs.check-commits.outputs.should-run == 'true'
    runs-on: ubuntu-latest
    permissions:
      contents: write
      security-events: write
      actions: read

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set Git identity
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

      - name: Remove old CodeQL packages cache
        run: rm -rf ~/.codeql/packages

      - name: Check Node.js version
        run: |
          node .github/scripts/callgraph_enhanced/check-node-version.cjs

      - name: Install CodeQL CLI
        run: |
          wget https://github.com/github/codeql-cli-binaries/releases/download/v2.22.1/codeql-linux64.zip
          unzip codeql-linux64.zip
          sudo mv codeql /opt/codeql
          echo "/opt/codeql" >> $GITHUB_PATH

      - name: Install CodeQL query packs
        run: |
          /opt/codeql/codeql pack install .github/codeql-queries

      - name: Check CodeQL exists
        run: |
          node .github/scripts/callgraph_enhanced/check-codeql-exists.cjs

      - name: Verify CodeQL Configuration
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs verify-config

      - name: Remove existing CodeQL DB (if any)
        run: |
          rm -rf codeql-db

      - name: Perform CodeQL Analysis
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs analyze

      - name: Check CodeQL Analysis Results
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs check-results

      - name: Debug CodeQL execution
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs debug

      - name: Wait for CodeQL results
        run: |
          node -e "setTimeout(()=>{}, 10000)"

      - name: Find and process CodeQL results
        run: |
          node .github/scripts/callgraph_enhanced/find-process-results.cjs

      - name: Generate HTML graph
        run: |
          node .github/scripts/callgraph_enhanced/generate-html-graph.cjs

      - name: Copy files to generated-docs and commit results
        run: |
          node .github/scripts/callgraph_enhanced/copy-commit-results.cjs

--- 呼び出し元
# 呼び出し元ワークフロー: call-callgraph_enhanced.yml
name: Call Call Graph Enhanced

on:
  schedule:
    # 毎日午前5時(JST) = UTC 20:00前日
    - cron: '0 20 * * *'
  workflow_dispatch:

jobs:
  call-callgraph-enhanced:
    # uses: cat2151/github-actions/.github/workflows/callgraph_enhanced.yml
    uses: ./.github/workflows/callgraph_enhanced.yml # ローカルでのテスト用
```

# レビュー結果OKと判断する
- レビュー結果を人力でレビューした形になった

# test
- #4 同様にローカル WSL + act でtestする
- エラー。userのtest設計ミス。
  - scriptの挙動 : src/ がある前提
  - 今回の共通ワークフローのリポジトリ : src/ がない
  - 今回testで実現したいこと
    - 仮のソースでよいので、関数コールグラフを生成させる
  - 対策
    - src/ にダミーを配置する
- test green
  - ただしcommit pushはしてないので、html内容が0件NG、といったケースの検知はできない
  - もしそうなったら別issueとしよう

# test green

# commit用に、yml 呼び出し元 uses をlocal用から本番用に書き換える

# closeとする
- もしhtml内容が0件NG、などになったら、別issueとするつもり

{% endraw %}
```

### .github/actions-tmp/issue-notes/7.md
```md
{% raw %}
# issue issue note生成できるかのtest用 #7
[issues #7](https://github.com/cat2151/github-actions/issues/7)

- 生成できた
- closeとする

{% endraw %}
```

### index.html
```html
{% raw %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WAVLPF Synthesizer</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Courier New', monospace;
      background: #000;
      color: white;
      min-height: 100vh;
      cursor: default;
      overflow-x: hidden;
      position: relative;
    }
    
    /* Oscilloscope background canvas */
    #oscilloscope {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1800px;
      height: 1000px;
      max-width: 100vw;
      max-height: 100vh;
      background: rgba(0,0,0,0.8);
      z-index: 0;
      display: block;
    }
    
    .container {
      position: relative;
      z-index: 1;
      text-align: center;
      user-select: none;
      max-width: 800px;
      width: 100%;
      margin: 0 auto;
      padding: 15px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    h1 {
      font-size: 2.5em;
      margin-bottom: 0.3em;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 1em;
      justify-content: center;
    }
    
    .tab {
      font-family: 'Courier New', monospace;
      font-size: 1em;
      padding: 0.7em 1.5em;
      background: rgba(0,0,0,0.6);
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    .tab:hover {
      background: rgba(0,0,0,0.8);
    }
    
    .tab.active {
      background: rgba(255,255,255,0.3);
      border-color: rgba(255,255,255,0.6);
      font-weight: bold;
    }
    
    .instructions {
      font-size: 1em;
      margin-bottom: 1em;
      opacity: 0.9;
    }
    
    #params {
      font-size: 1.3em;
      font-weight: bold;
      padding: 0.7em 1.5em;
      background: rgba(0,0,0,0.7);
      border-radius: 10px;
      min-width: 400px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.4);
    }
    
    .controls {
      margin-top: 1em;
      padding: 1em;
      background: rgba(0,0,0,0.7);
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.4);
      text-align: left;
    }
    
    .control-group {
      margin-bottom: 0.6em;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .control-group:last-child {
      margin-bottom: 0;
    }
    
    .control-label {
      flex: 0 0 200px;
      font-size: 0.9em;
      opacity: 0.9;
    }
    
    .control-input {
      flex: 1;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      padding: 0.3em 0.5em;
      background: rgba(255,255,255,0.9);
      color: #333;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 5px;
      resize: vertical;
      min-height: 30px;
    }
    
    select.control-input {
      cursor: pointer;
    }
    
    textarea.control-input {
      min-height: 30px;
      max-height: 80px;
    }
    
    .buttons {
      margin-top: 1em;
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    
    .button {
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      padding: 0.5em 1.5em;
      background: rgba(0,0,0,0.6);
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    .button:hover {
      background: rgba(0,0,0,0.8);
    }
    
    .info {
      margin-top: 1em;
      font-size: 0.85em;
      opacity: 0.7;
    }
    
    .status {
      margin-top: 0.5em;
      font-size: 0.75em;
      opacity: 0.5;
    }
    
    /* Oscilloscope panels container */
    .oscilloscope-panels {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      gap: 10px;
    }
    
    .oscilloscope-panel {
      background: rgba(0, 0, 0, 0.8);
      border: 2px solid rgba(0, 136, 255, 0.5);
      border-radius: 4px;
      padding: 8px;
      box-shadow: 0 0 10px rgba(0, 136, 255, 0.3);
    }
    
    .frame-buffer-panel {
      margin-top: 10px;
    }
    
    .comparison-panels {
      display: flex;
      gap: 8px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .panel-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }
    
    .piano-panel {
      margin-bottom: 10px;
    }
    
    .panel-label {
      font-size: 12px;
      color: #aaaaaa;
      text-align: center;
      font-family: 'Courier New', monospace;
      margin-bottom: 5px;
    }
    
    .oscilloscope-panels canvas {
      background-color: #000000;
      border-radius: 2px;
    }
    
    /* Debug overlay in top-right corner */
    .oscilloscope-debug-overlay {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 100;
      background: rgba(0, 0, 0, 0.8);
      border: 2px solid rgba(0, 255, 0, 0.5);
      border-radius: 4px;
      padding: 10px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
      pointer-events: none;
    }
    
    .debug-item {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 5px;
    }
    
    .debug-item:last-child {
      margin-bottom: 0;
    }
    
    .debug-label {
      color: #aaaaaa;
      font-weight: bold;
    }
    
    .debug-value {
      color: #00ff00;
      min-width: 100px;
      text-align: right;
    }
    
    /* Container for oscilloscope-related error messages.
       This matches the selector used by displayOscilloscopeError in src/synth.ts. */
    .oscilloscope-container {
      position: fixed;
      top: 150px;
      right: 10px;
      max-width: 320px;
      z-index: 1000;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    /* Individual oscilloscope error message blocks. */
    .oscilloscope-error {
      pointer-events: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.8em;
      color: #ffdddd;
      background: rgba(139, 0, 0, 0.9);
      border: 1px solid rgba(255, 200, 200, 0.8);
      border-radius: 4px;
      padding: 0.5em 0.75em;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    }
    
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      white-space: nowrap;
      border-width: 0;
    }
  </style>
</head>
<body>
  <!-- Oscilloscope background canvas -->
  <canvas id="oscilloscope" role="img" aria-label="Waveform oscilloscope visualization showing the filtered audio signal"></canvas>
  
  <!-- Oscilloscope additional canvases -->
  <div class="oscilloscope-panels">
    <!-- Frame Buffer Display -->
    <div class="oscilloscope-panel frame-buffer-panel">
      <div class="panel-label">フレームバッファ全体</div>
      <canvas id="frameBufferCanvas" width="800" height="120" role="img" aria-label="フレームバッファ全体に蓄積された波形のプレビュー"></canvas>
    </div>
    
    <!-- Comparison Panels -->
    <div class="oscilloscope-panel comparison-panels">
      <div class="panel-item">
        <div class="panel-label">前回の波形</div>
        <canvas id="previousWaveformCanvas" width="250" height="120" role="img" aria-label="前回の入力から取得した波形のプレビュー"></canvas>
      </div>
      <div class="panel-item">
        <div class="panel-label">今回の波形</div>
        <canvas id="currentWaveformCanvas" width="250" height="120" role="img" aria-label="今回の入力波形のプレビュー"></canvas>
      </div>
      <div class="panel-item">
        <div class="panel-label">類似度推移</div>
        <canvas id="similarityPlotCanvas" width="250" height="120" role="img" aria-label="前回の波形と今回の波形の類似度推移グラフ"></canvas>
      </div>
    </div>
    
    <!-- Piano Keyboard -->
    <div class="oscilloscope-panel piano-panel">
      <div class="panel-label">ピアノ鍵盤 (Piano Keyboard) - 50Hz～2000Hz</div>
      <canvas id="pianoKeyboardCanvas" width="800" height="60" role="img" aria-label="Piano keyboard visualization showing highlighted key for detected fundamental frequency"></canvas>
    </div>
    
    <!-- Debug Overlay -->
    <div class="oscilloscope-debug-overlay">
      <div class="debug-item">
        <span class="debug-label">Frequency:</span>
        <span id="frequencyValue" class="debug-value">--- Hz</span>
      </div>
      <div class="debug-item">
        <span class="debug-label">Note:</span>
        <span id="noteValue" class="debug-value">---</span>
      </div>
      <div class="debug-item">
        <span class="debug-label">Gain:</span>
        <span id="gainValue" class="debug-value">---x</span>
      </div>
      <div class="debug-item">
        <span class="debug-label">Similarity:</span>
        <span id="similarityValue" class="debug-value">---</span>
      </div>
    </div>
  </div>
  
  <!-- Container for oscilloscope error messages (populated by displayOscilloscopeError in synth.ts) -->
  <div class="oscilloscope-container"></div>
  
  <div class="container">
    <h1>WAVLPF Synthesizer</h1>
    <div class="tabs">
      <button id="tabWav" class="tab active" type="button" aria-pressed="true">WAV Generation Mode</button>
      <button id="tabSeq" class="tab" type="button" aria-pressed="false">Seq Mode</button>
    </div>
    <div class="instructions">
      Click anywhere to start<br>
      Move your mouse to control the filter
    </div>
    <div id="params">Cutoff: 510Hz | Q: 1.25</div>
    
    <div class="controls">
      <div class="control-group">
        <label class="control-label" for="waveformType">Waveform Type:</label>
        <select id="waveformType" class="control-input">
          <option value="sawtooth">Sawtooth</option>
          <option value="pulse">Pulse</option>
        </select>
      </div>
      <div class="control-group">
        <label class="control-label" for="filterType">Filter Type:</label>
        <select id="filterType" class="control-input">
          <option value="lpf">LPF (Low-pass)</option>
          <option value="hpf">HPF (High-pass)</option>
          <option value="bpf">BPF (Band-pass)</option>
          <option value="notch">Notch (Band-reject)</option>
          <option value="apf">APF (All-pass)</option>
          <option value="lowshelf">Low Shelf</option>
          <option value="highshelf">High Shelf</option>
        </select>
      </div>
      <div class="control-group">
        <label class="control-label" for="dutyRatio">Duty Ratio (%):</label>
        <textarea id="dutyRatio" class="control-input">50</textarea>
      </div>
      <div class="control-group">
        <label class="control-label" for="bpm">BPM:</label>
        <textarea id="bpm" class="control-input">120</textarea>
      </div>
      <div class="control-group">
        <label class="control-label" for="beat">Beat:</label>
        <textarea id="beat" class="control-input">8</textarea>
      </div>
      <div class="control-group">
        <label class="control-label" for="qMax">Q Max Value:</label>
        <textarea id="qMax" class="control-input">16</textarea>
      </div>
      <div class="control-group">
        <label class="control-label" for="cutoffMax">Cutoff Freq Max (Hz):</label>
        <textarea id="cutoffMax" class="control-input">4000</textarea>
      </div>
      <div class="control-group">
        <label class="control-label" for="decayUnit">Decay Unit:</label>
        <select id="decayUnit" class="control-input">
          <option value="Hz">Hz</option>
          <option value="Cent">Cent</option>
        </select>
      </div>
      <div class="control-group">
        <label class="control-label" for="decayRate">Decay Rate per ms:</label>
        <textarea id="decayRate" class="control-input">1</textarea>
      </div>
    </div>
    
    <div class="buttons">
      <button id="exportSettings" class="button" aria-label="Export current settings to JSON file">Export Settings</button>
      <button id="importSettings" class="button" aria-label="Import settings from JSON file">Import Settings</button>
    </div>
    
    <div class="info">
      X-axis: Cutoff Frequency (20Hz - Max)<br>
      Y-axis: Resonance Q (0.5 - Max)<br>
      <br>
      220Hz wave with biquad filter (Sawtooth or Pulse)<br>
      Cutoff decays based on settings
    </div>
    <div class="status" id="status">
      New audio generated based on BPM and beat
    </div>
    <div class="status" id="generationTime">
      Generation time: --
    </div>
    
    <div class="sr-only" id="oscilloscope-status">Oscilloscope displaying filtered audio waveform in real-time</div>
  </div>
  
  <script type="module" src="/src/index.ts"></script>
</body>
</html>

{% endraw %}
```

### issue-notes/100.md
```md
{% raw %}
# issue 波形表示の表示レイアウトが破綻している #100
[issues #100](https://github.com/cat2151/wavlpf/issues/100)



{% endraw %}
```

### issue-notes/52.md
```md
{% raw %}
# issue seqタブにおいて、Tone.js instrument sampler による演奏 / それを一度wavにprerenderしてから演奏（分析用） / 自前実装seq & rendererでWebAudio非依存renderした演奏（分析用）とを、プルダウンで選べるようにする。Tone.jsを経由したrenderと自前renderどちらもデータミスによる品質低下が別々に発生しそうなので相補的に運用して検証する用 #52
[issues #52](https://github.com/cat2151/wavlpf/issues/52)



{% endraw %}
```

### issue-notes/57.md
```md
{% raw %}
# issue tonejs-json-sequencer がCDN importできるようになるまで待つ #57
[issues #57](https://github.com/cat2151/wavlpf/issues/57)



{% endraw %}
```

## 最近の変更（過去7日間）
### コミット履歴:
fc892cf Add issue note for #100 [auto]
3ab5de4 Merge pull request #99 from cat2151/copilot/adjust-oscilloscope-display-layout
f8d93bb Address PR review feedback: add canvas validation, role attributes, fix note calculation
9ad5c31 Add detailed oscilloscope layout documentation
f2b2fad Add 9 oscilloscope display elements with layout
3ee2084 Initial plan
88d4df7 Add issue note for #98 [auto]
ad3c857 Add issue note for #96 [auto]
ed50b31 Merge pull request #95 from cat2151/copilot/fix-wave-visualization-layout
40571ee デフォルトURLをGitHub Pagesに変更し、レイアウト破綻のスクリーンショット取得に成功

### 変更されたファイル:
docs/OSCILLOSCOPE_LAYOUT.md
index.html
issue-notes/100.md
issue-notes/94.md
issue-notes/96.md
issue-notes/98.md
package.json
scripts/README.md
scripts/test-waveform-screenshot.js
src/oscilloscope.test.ts
src/oscilloscope.ts
waveform-test.png


---
Generated at: 2026-01-18 07:03:01 JST
