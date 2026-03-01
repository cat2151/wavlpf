Last updated: 2026-03-02

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
- .github/actions-tmp/.github/workflows/call-check-large-files.yml
- .github/actions-tmp/.github/workflows/call-daily-project-summary.yml
- .github/actions-tmp/.github/workflows/call-issue-note.yml
- .github/actions-tmp/.github/workflows/call-rust-windows-check.yml
- .github/actions-tmp/.github/workflows/call-translate-readme.yml
- .github/actions-tmp/.github/workflows/callgraph.yml
- .github/actions-tmp/.github/workflows/check-large-files.yml
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
- .github/actions-tmp/.github_automation/check-large-files/README.md
- .github/actions-tmp/.github_automation/check-large-files/check-large-files.toml.default
- .github/actions-tmp/.github_automation/check-large-files/scripts/check_large_files.py
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
- .github/actions-tmp/issue-notes/35.md
- .github/actions-tmp/issue-notes/38.md
- .github/actions-tmp/issue-notes/4.md
- .github/actions-tmp/issue-notes/40.md
- .github/actions-tmp/issue-notes/44.md
- .github/actions-tmp/issue-notes/46.md
- .github/actions-tmp/issue-notes/7.md
- .github/actions-tmp/issue-notes/8.md
- .github/actions-tmp/issue-notes/9.md
- .github/actions-tmp/package-lock.json
- .github/actions-tmp/package.json
- .github/actions-tmp/src/main.js
- .github/copilot-instructions.md
- .github/workflows/call-check-large-files.yml
- .github/workflows/call-daily-project-summary.yml
- .github/workflows/call-issue-note.yml
- .github/workflows/call-translate-readme.yml
- .github/workflows/ci.yml
- .github/workflows/create-issue-on-ci-failure.yml
- .github/workflows/deploy.yml
- .gitignore
- DEVELOPMENT.md
- LICENSE
- README.ja.md
- README.md
- _config.yml
- copilot-instructions.md
- docs/CAT_OSCILLOSCOPE_WASM_SETUP.md
- docs/COPILOT_GITHUB_PAGES_ACCESS.md
- docs/DEPLOYMENT_VERIFICATION.md
- docs/OSCILLOSCOPE_LAYOUT.md
- docs/OSCILLOSCOPE_USAGE.md
- generated-docs/project-overview-generated-prompt.md
- index.html
- issue-notes/112.md
- issue-notes/113.md
- issue-notes/122.md
- issue-notes/39.md
- issue-notes/52.md
- issue-notes/76.md
- issue-notes/78.md
- issue-notes/80.md
- package-lock.json
- package.json
- scripts/README.md
- scripts/install-wasm-pack.sh
- scripts/investigate-404.js
- scripts/investigate-cat-oscilloscope.js
- scripts/screenshot-github-pages.js
- scripts/setup-cat-oscilloscope-wasm.js
- scripts/test-console-logs.js
- scripts/test-pr-changes-locally.sh
- scripts/test-waveform-screenshot.js
- scripts/verify-deployment.js
- src/audio-player.ts
- src/full-waveform-display.test.ts
- src/full-waveform-display.ts
- src/index.ts
- src/oscilloscope.test.ts
- src/oscilloscope.ts
- src/performance-stats.test.ts
- src/performance-stats.ts
- src/playback-mode.ts
- src/realtime-analysis.test.ts
- src/realtime-analysis.ts
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
- waveform-gh.png

## 現在のオープンIssues
## [Issue #124](../issue-notes/124.md): 大きなファイルの検出: 2個のファイルが500行を超えています
以下のファイルが500行を超えています。リファクタリングを検討してください。

## 検出されたファイル

| ファイル | 行数 | 超過行数 |
|---------|------|----------|
| `src/synth.ts` | 625 | +125 |
| `index.html` | 575 | +75 |

## テスト実施のお願い

- リファクタリング前後にテストを実行し、それぞれのテスト失敗件数を報告してください
- リファクタリング前後のどちらかでテストがredの場合、まず別issueでtest greenにしてからリファクタリングしてください

## 推奨事項...
ラベル: refactoring, code-quality, automated
--- issue-notes/124.md の内容 ---

```markdown

```

## [Issue #113](../issue-notes/113.md): （待ち）tonejs-mml-to-jsonをライブラリとして利用し、MMLをtextareaに書いたら演奏できるようにする（issue 112完了待ち）
[issue-notes/113.md](https://github.com/cat2151/wavlpf/blob/main/issue-notes/113.md)

...
ラベル: 
--- issue-notes/113.md の内容 ---

```markdown
# issue （待ち）tonejs-mml-to-jsonをライブラリとして利用し、MMLをtextareaに書いたら演奏できるようにする（sequence実装されるまで待ち） #113
[issues #113](https://github.com/cat2151/wavlpf/issues/113)



```

## [Issue #112](../issue-notes/112.md): （待ち）tonejs-json-sequencer を利用して複数音符を演奏できるようにする（stream demoのライブラリ利用版ができるまで待つ）
[issue-notes/112.md](https://github.com/cat2151/wavlpf/blob/main/issue-notes/112.md)

...
ラベル: 
--- issue-notes/112.md の内容 ---

```markdown
# issue （待ち）tonejs-json-sequencer を利用して複数音符を演奏できるようにする（stream demoかつライブラリ利用build demoになるまで待つ） #112
[issues #112](https://github.com/cat2151/wavlpf/issues/112)



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
### .github/actions-tmp/issue-notes/12.md
```md
{% raw %}
# issue project-summary を他projectから使いやすくする #12
[issues #12](https://github.com/cat2151/github-actions/issues/12)

# 保留、別projectでの検証待ちのもの
- promptsをcall側ymlで指定可能にする
  - 保留の理由
    - YAGNI原則
      - 現状の共通workflow側のpromptsで問題ないうちは、保留とする
        - そのままで使える可能性が高い見込み
      - 検証が必要
      - 別promptsを実際に書く必要が出たときに、追加実装をする
# 課題、 docs/ をメンテする
- 対象は、 daily-summary-setup.md
- call-daily-project-summary.yml の導入手順を書く
- どうする？
  - 次の日次バッチでagent用promptを生成させる
- 結果
  - 生成させた
  - 導入手順をメンテさせた
  - 人力でさらにメンテした
  - これでOKと判断する。
  - あとは必要に応じてissue起票すればよい、今すぐのissue起票は不要（YAGNI原則）、と判断する

# closeとする

{% endraw %}
```

### .github/actions-tmp/issue-notes/13.md
```md
{% raw %}
# issue issue-note を他projectから使いやすくする #13
[issues #13](https://github.com/cat2151/github-actions/issues/13)

- docs
    - call導入手順を書く

{% endraw %}
```

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

### .github/actions-tmp/issue-notes/24.md
```md
{% raw %}
# issue Geminiが503で落ちたのでretryを実装する #24
[issues #24](https://github.com/cat2151/github-actions/issues/24)

# 何が困るの？
- 朝起きて、development statusがgenerateされてないのは困る
    - それをタスク実施のヒントにしているので
    - 毎朝generatedな状態を維持したい

# 方法
- retryを実装する
    - 現在は `this.model.generateContent(developmentPrompt);`
    - 実装後は `this.generateContent(developmentPrompt);`
    - BaseGenerator 側に、
        - generateContent関数を実装する
            - そこで、
                - `this.model.generateContent(developmentPrompt);` する
                - 503のとき、
                    - retryあり
                    - Exponential Backoff

# 結果
- 直近の実行結果をlog確認した
    - 本番で503が発生しなかったことをlog確認した
- 本番の503 testは、今回発生しなかったので、できず
- ここ1週間で2回発生しているので、次の1週間で1回発生する想定
- ソース机上確認した

# どうする？
- このissueはcloseしたほうがわかりやすい、と判断する
- 1週間503を毎日チェック、は省略とする
- もし今後503が発生したら別issueとする
- 2日チェックして503なし

# closeとする

{% endraw %}
```

### .github/actions-tmp/issue-notes/3.md
```md
{% raw %}
# issue GitHub Actions「issue note生成」を共通ワークフロー化する #3
[issues #3](https://github.com/cat2151/github-actions/issues/3)

- 前提
  - userは、translateのworkflowを共通ワークフロー化し、動くようにしたので、共通ワークフロー化の知識がある
  - よって、今回は、promptでplanさせ、そのplanをuserがレビューし、planの改善を指示できるので、ハルシネーションのリスクを下げることができる

- prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
このymlはまだ共通ワークフロー化されず、
呼び出し元からコピーされたままの状態です。
このymlファイル名のまま、
中身を共通ワークフロー化してください。
呼び出し元ymlは別途書きますので気にしないでください。
まずplanしてください
```

- plan 生成結果
```
共通ワークフロー化のためのplanは以下の通りです。

1. 目的
現在の issue-note.yml を「共通ワークフロー」として再設計し、他リポジトリや他ワークフローから workflow_call で呼び出せるようにする。
2. 主な変更点
on: トリガーを workflow_call に変更（直接イベントで起動しない）。
必要な入力（inputs）やシークレット（secrets）を workflow_call セクションで定義。
github.event.issue などのイベント依存部分を、inputs経由で受け取る形に修正。
既存の処理（issueノート生成、コミット、issue body更新）はそのまま活かすが、パラメータ化する。
3. 具体的な修正内容
on: issues: → on: workflow_call: に変更。
inputs で必要な値（例: issue_title, issue_number, issue_body, issue_url など）を受け取る。
スクリプト内の ${{ github.event.issue.xxx }} を ${{ inputs.xxx }} に置換。
github-script ステップも同様にinputsを参照。
必要に応じて secrets も workflow_call で受け取れるようにする。
4. ファイル名・配置
ファイル名はそのまま issue-note.yml。
配置場所は workflows でOK（共通ワークフローとしてもこの場所で良い）。
5. 呼び出し元への影響
呼び出し元ワークフローで uses: <repo>/.github/workflows/issue-note.yml@main のように参照し、inputsを渡す形になる。
このplanで進めます。次に、実際の共通ワークフロー化のためのyml修正案を作成しますか？
```

- userがplanレビューし、OKを出した
- agentに生成結果ymlをレビューさせた、OKとなった
  - userはこのレビューは認知負荷が高いのでskipとする（単純な細かい間違い探し作業になるので、それはagentに任せた）
-  エラー。呼び出し元ymlのエラーがあり修正。共通ワークフローのエラー指摘があり、共通ワークフロー側の修正が必要となった
```
原因の分析：

呼び出し元（tonejs-mml-to-jsonのissue-note.yml）は、reusable workflow（cat2151/github-actions/.github/workflows/issue-note.yml@main）をusesで呼び出し、inputsをwithで渡しています。
共通ワークフロー（reusable workflow）は inputs を workflow_call で受け取り、各ステップで ${{ inputs.xxx }} で参照しています。
しかし、エラーが発生したのは actions/github-script@v7 の script 内です。
エラーの本質的な原因：

actions/github-script の script: で ${{ inputs.issue_number }} のような式を直接 JavaScript テンプレートリテラル内で使っていますが、これはサポートされていません。
script: の中は JavaScript であり、YAMLの ${{ ... }} は展開されません（または意図通りに展開されません）。
そのため、inputs 変数は script 内の JavaScript で未定義となり、ReferenceError になります。
正しい書き方：

actions/github-script の script: でワークフローの inputs を使いたい場合は、with: で input を environment 変数や script の引数として渡し、JavaScript で process.env から取得するか、github-script の input 機能を使う必要があります。
例（修正版）：

このように、inputs の値を env で渡し、script 内では process.env で参照してください。

まとめ：

actions/github-script の script 内で ${{ inputs.xxx }} を直接使うと ReferenceError になる
env: で値を渡し、process.env で参照するのが正しい
修正が必要です。修正版のワークフローが必要な場合はお知らせください。
```

- test green
- closeとする

{% endraw %}
```

### .github/actions-tmp/issue-notes/4.md
```md
{% raw %}
# issue GitHub Actions「project概要生成」を共通ワークフロー化する #4
[issues #4](https://github.com/cat2151/github-actions/issues/4)

# prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
このymlファイルを、以下の2つのファイルに分割してください。
1. 共通ワークフロー       cat2151/github-actions/.github/workflows/daily-project-summary.yml
2. 呼び出し元ワークフロー cat2151/github-actions/.github/workflows/call-daily-project-summary.yml
まずplanしてください
```

# 結果、あちこちハルシネーションのあるymlが生成された
- agentの挙動があからさまにハルシネーション
    - インデントが修正できない、「失敗した」という
    - 構文誤りを認識できない
- 人力で修正した

# このagentによるセルフレビューが信頼できないため、別のLLMによるセカンドオピニオンを試す
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
以下の2つのファイルをレビューしてください。最優先で、エラーが発生するかどうかだけレビューてください。エラー以外の改善事項のチェックをするかわりに、エラー発生有無チェックに最大限注力してください。

--- 呼び出し元

name: Call Daily Project Summary

on:
  schedule:
    # 日本時間 07:00 (UTC 22:00 前日)
    - cron: '0 22 * * *'
  workflow_dispatch:

jobs:
  call-daily-project-summary:
    uses: cat2151/github-actions/.github/workflows/daily-project-summary.yml
    secrets:
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

--- 共通ワークフロー
name: Daily Project Summary
on:
  workflow_call:

jobs:
  generate-summary:
    runs-on: ubuntu-latest

    permissions:
      contents: write
      issues: read
      pull-requests: read

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          fetch-depth: 0  # 履歴を取得するため

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          # 一時的なディレクトリで依存関係をインストール
          mkdir -p /tmp/summary-deps
          cd /tmp/summary-deps
          npm init -y
          npm install @google/generative-ai @octokit/rest
          # generated-docsディレクトリを作成
          mkdir -p $GITHUB_WORKSPACE/generated-docs

      - name: Generate project summary
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_REPOSITORY: ${{ github.repository }}
          NODE_PATH: /tmp/summary-deps/node_modules
        run: |
          node .github/scripts/generate-project-summary.cjs

      - name: Check for generated summaries
        id: check_summaries
        run: |
          if [ -f "generated-docs/project-overview.md" ] && [ -f "generated-docs/development-status.md" ]; then
            echo "summaries_generated=true" >> $GITHUB_OUTPUT
          else
            echo "summaries_generated=false" >> $GITHUB_OUTPUT
          fi

      - name: Commit and push summaries
        if: steps.check_summaries.outputs.summaries_generated == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          # package.jsonの変更のみリセット（generated-docsは保持）
          git restore package.json 2>/dev/null || true
          # サマリーファイルのみを追加
          git add generated-docs/project-overview.md
          git add generated-docs/development-status.md
          git commit -m "Update project summaries (overview & development status)"
          git push

      - name: Summary generation result
        run: |
          if [ "${{ steps.check_summaries.outputs.summaries_generated }}" == "true" ]; then
            echo "✅ Project summaries updated successfully"
            echo "📊 Generated: project-overview.md & development-status.md"
          else
            echo "ℹ️ No summaries generated (likely no user commits in the last 24 hours)"
          fi
```

# 上記promptで、2つのLLMにレビューさせ、合格した

# 細部を、先行する2つのymlを参照に手直しした

# ローカルtestをしてからcommitできるとよい。方法を検討する
- ローカルtestのメリット
    - 素早く修正のサイクルをまわせる
    - ムダにgit historyを汚さない
        - これまでの事例：「実装したつもり」「エラー。修正したつもり」「エラー。修正したつもり」...（以降エラー多数）
- 方法
    - ※検討、WSL + act を環境構築済みである。test可能であると判断する
    - 呼び出し元のURLをコメントアウトし、相対パス記述にする
    - ※備考、テスト成功すると結果がcommit pushされる。それでよしとする
- 結果
    - OK
    - secretsを簡略化できるか試した、できなかった、現状のsecrets記述が今わかっている範囲でベストと判断する
    - OK

# test green

# commit用に、yml 呼び出し元 uses をlocal用から本番用に書き換える

# closeとする

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
      justify-content: flex-start;
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

    /* Real-time analysis panels (FFT and Waveform) */
    .realtime-analysis-container {
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 50;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }

    .analysis-panel {
      background: rgba(0, 0, 0, 0.9);
      border: 2px solid rgba(0, 255, 0, 0.5);
      border-radius: 4px;
      padding: 8px;
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    }

    .analysis-panel canvas {
      display: block;
    }

    /* Full waveform display panel */
    .full-waveform-container {
      position: fixed;
      bottom: 10px;
      left: 10px;
      right: 10px;
      z-index: 50;
      pointer-events: none;
    }

    .full-waveform-panel {
      background: rgba(0, 0, 0, 0.9);
      border: 2px solid rgba(255, 136, 0, 0.5);
      border-radius: 4px;
      padding: 8px;
      box-shadow: 0 0 10px rgba(255, 136, 0, 0.3);
    }

    .full-waveform-panel canvas {
      display: block;
      width: 100%;
    }

    .repo-link {
      position: fixed;
      bottom: 16px;
      left: 16px;
      z-index: 120;
      padding: 8px 12px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      color: rgba(255, 255, 255, 0.85);
      background: rgba(0, 0, 0, 0.55);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 6px;
      text-decoration: none;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
      transition: background 0.2s, border-color 0.2s, color 0.2s;
    }

    .repo-link:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.45);
      color: #fff;
    }

    .repo-link:focus-visible {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.45);
      color: #fff;
      outline: 2px solid rgba(255, 255, 255, 0.9);
      outline-offset: 2px;
    }
  </style>
</head>
<body>
  <!-- Oscilloscope background canvas -->
  <canvas id="oscilloscope" width="1800" height="1000" role="img" aria-label="Waveform oscilloscope visualization showing the filtered audio signal"></canvas>

  <!-- Real-time analysis panels (FFT and Waveform) at top left -->
  <div class="realtime-analysis-container">
    <div class="analysis-panel">
      <canvas id="fftCanvas" width="400" height="150" role="img" aria-label="FFT spectrum display showing frequency content in real-time"></canvas>
    </div>
    <div class="analysis-panel">
      <canvas id="realtimeWaveformCanvas" width="400" height="150" role="img" aria-label="Real-time waveform display at 60 FPS"></canvas>
    </div>
  </div>

  <!-- Full waveform display at bottom -->
  <div class="full-waveform-container">
    <div class="full-waveform-panel">
      <canvas id="fullWaveformCanvas" width="1400" height="120" role="img" aria-label="Full rendered waveform showing complete audio buffer"></canvas>
    </div>
  </div>

  <!-- Oscilloscope additional UI elements (following demo-simple pattern) -->
  <div class="oscilloscope-panels">
    <!-- 
      Note: Following the cat-oscilloscope demo-simple pattern,
      comparison panel canvases (frameBuffer, previousWaveform, currentWaveform, similarityPlot)
      are now created programmatically as hidden elements in oscilloscope.ts.
      This simplifies the DOM and follows the recommended library usage pattern.
    -->
    
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

  <a
    class="repo-link"
    href="https://github.com/cat2151/wavlpf"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open the wavlpf repository on GitHub"
  >
    GitHub: cat2151/wavlpf
  </a>
  <script>
    (function () {
      var repoLink = document.querySelector('.repo-link');
      if (!repoLink) return;
      function stopPropagationOnly(event) {
        event.stopPropagation();
      }
      repoLink.addEventListener('click', stopPropagationOnly);
      repoLink.addEventListener('touchstart', stopPropagationOnly);
    })();
  </script>
</body>
</html>

{% endraw %}
```

### issue-notes/112.md
```md
{% raw %}
# issue （待ち）tonejs-json-sequencer を利用して複数音符を演奏できるようにする（stream demoかつライブラリ利用build demoになるまで待つ） #112
[issues #112](https://github.com/cat2151/wavlpf/issues/112)



{% endraw %}
```

### issue-notes/113.md
```md
{% raw %}
# issue （待ち）tonejs-mml-to-jsonをライブラリとして利用し、MMLをtextareaに書いたら演奏できるようにする（sequence実装されるまで待ち） #113
[issues #113](https://github.com/cat2151/wavlpf/issues/113)



{% endraw %}
```

### issue-notes/52.md
```md
{% raw %}
# issue seqタブにおいて、Tone.js instrument sampler による演奏 / それを一度wavにprerenderしてから演奏（分析用） / 自前実装seq & rendererでWebAudio非依存renderした演奏（分析用）とを、プルダウンで選べるようにする。Tone.jsを経由したrenderと自前renderどちらもデータミスによる品質低下が別々に発生しそうなので相補的に運用して検証する用 #52
[issues #52](https://github.com/cat2151/wavlpf/issues/52)



{% endraw %}
```

### src/synth.ts
```ts
{% raw %}
import { generateWav, createWavBlobUrl } from './wav';
import {
  Settings,
  loadSettings,
  saveSettings,
  exportSettingsToFile,
  importSettingsFromFile,
} from './settings';
import { initWasm, isWasmInitialized, renderAudioWasm } from './wasmAudio';
import {
  createPerformanceStats,
  addPerformanceSample,
  calculatePerformanceStats,
  type PerformanceStats,
} from './performance-stats';
import { calculateDuration } from './timing';
import {
  readParametersFromUI,
  updateUIFields,
  mapMouseToFilterParams,
  updateMousePositionDisplay,
  type MousePosition,
} from './ui-params';
import {
  loadTone,
  isToneLoaded,
  startAudioContext,
  isAudioContextRunning,
  playWavUrl,
  stopAndCleanup,
  getTone,
} from './audio-player';
import {
  type PlaybackMode,
  getCurrentMode,
  switchMode,
} from './playback-mode';
import {
  initOscilloscope,
  updateOscilloscope,
  isOscilloscopeInitialized,
} from './oscilloscope';
import {
  initRealtimeAnalysis,
  startRealtimeVisualization,
  stopRealtimeVisualization,
  isRealtimeAnalysisInitialized,
  disposeRealtimeAnalysis,
} from './realtime-analysis';
import {
  initFullWaveformDisplay,
  drawFullWaveform,
  clearFullWaveform,
  isFullWaveformDisplayInitialized,
} from './full-waveform-display';

// Global storage for the most recently generated WAV
let lastGeneratedWavUrl: string | null = null;

const SAMPLE_RATE = 44100;
const FREQUENCY = 220; // 220Hz (A3)

// Mouse position state
let mousePosition: MousePosition = { x: 0.5, y: 0.5 };

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
let filterType: 'lpf' | 'hpf' | 'bpf' | 'notch' | 'apf' | 'lowshelf' | 'highshelf' = initialSettings.filterType;

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
    filterType,
  };
}

// Track playback timeout for cleanup
let playbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

// Track whether playback loop has started
let isPlaybackLoopStarted = false;

// Track if oscilloscope error has been displayed to avoid repeated UI notifications
let hasShownOscilloscopeError = false;

// Store reference to scheduleNextPlay function for mode switching
let scheduleNextPlayFn: (() => void) | null = null;

// パフォーマンス統計トラッキング
const performanceStats: PerformanceStats = createPerformanceStats(10);

/**
 * Display oscilloscope error message to the user
 * @param message - Error message to display
 */
function displayOscilloscopeError(message: string): void {
  const container = document.querySelector('.oscilloscope-container');
  if (!container) return;

  // Remove any existing error message
  const existingError = container.querySelector('.oscilloscope-error');
  if (existingError) {
    existingError.remove();
  }

  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'oscilloscope-error';
  errorDiv.textContent = message;

  container.appendChild(errorDiv);

  // Auto-remove error after 5 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

/**
 * UIからパラメータを読み込む
 */
function readParameters(): void {
  const newSettings = readParametersFromUI(getCurrentSettings());
  
  // Update state
  bpm = newSettings.bpm;
  beat = newSettings.beat;
  qMax = newSettings.qMax;
  cutoffMax = newSettings.cutoffMax;
  decayUnit = newSettings.decayUnit;
  decayRate = newSettings.decayRate;
  waveformType = newSettings.waveformType;
  dutyRatio = newSettings.dutyRatio;
  filterType = newSettings.filterType;
  
  // Save settings to localStorage
  saveSettings(newSettings);
}

/**
 * LPFとカットオフ減衰を適用してオーディオをレンダリング (Rust WASM使用)
 * @returns 生成されたオーディオサンプルと生成時間(ms)
 */
function renderAudio(): { samples: Float32Array; generationTimeMs: number } {
  if (!isWasmInitialized()) {
    throw new Error('WASM module not initialized. Please wait for initialization to complete.');
  }
  
  const duration = calculateDuration(bpm, beat);
  const { cutoff: initialCutoff, q } = mapMouseToFilterParams(mousePosition, cutoffMax, qMax);
  
  return renderAudioWasm(
    waveformType,
    FREQUENCY,
    SAMPLE_RATE,
    duration,
    dutyRatio,
    filterType,
    initialCutoff,
    q,
    decayUnit,
    decayRate,
  );
}

/**
 * Generate and play audio (WAV mode)
 */
async function playAudioWav(): Promise<void> {
  // Ensure Tone is loaded
  if (!isToneLoaded()) {
    console.warn('Tone.js not loaded yet');
    return;
  }

  // Render audio
  const { samples, generationTimeMs } = renderAudio();

  // Update oscilloscope visualization with generated samples (non-blocking)
  // We don't await this to prevent delaying audio playback
  if (isOscilloscopeInitialized()) {
    updateOscilloscope(samples, SAMPLE_RATE).catch((error) => {
      // Only log and display error once to prevent console spam
      if (!hasShownOscilloscopeError) {
        hasShownOscilloscopeError = true;
        console.error('Failed to update oscilloscope:', error);
        // Display error to user
        displayOscilloscopeError('Visualization update failed. The oscilloscope may not be functioning correctly.');
      }
    });
  }

  // Update full waveform display with rendered samples
  if (isFullWaveformDisplayInitialized()) {
    drawFullWaveform(samples, SAMPLE_RATE);
  }

  // Generate WAV
  const wavData = generateWav(samples, SAMPLE_RATE);
  const wavUrl = createWavBlobUrl(wavData);

  // Store the generated WAV URL for seq mode
  // Revoke the previous URL to prevent memory leaks
  if (lastGeneratedWavUrl) {
    URL.revokeObjectURL(lastGeneratedWavUrl);
  }
  lastGeneratedWavUrl = wavUrl;

  // Play audio
  await playWavUrl(wavUrl);

  // Update generation time display
  updateGenerationTimeDisplay(generationTimeMs);
}

/**
 * Play audio using stored WAV (Seq mode)
 */
async function playAudioSeq(): Promise<void> {
  // Ensure Tone is loaded
  if (!isToneLoaded()) {
    console.warn('Tone.js not loaded yet');
    return;
  }
  
  // Check if we have a stored WAV
  if (!lastGeneratedWavUrl) {
    console.warn('No WAV stored yet. Generate audio first.');
    
    // Provide user-visible feedback so it's clear why Seq mode did not play audio
    const genTimeEl = document.getElementById('generationTime');
    if (genTimeEl) {
      genTimeEl.textContent =
        'WAVが生成されていません。まずWAV Generation Modeでオーディオを生成してください。';
    }
    return;
  }
  
  // Play stored WAV
  await playWavUrl(lastGeneratedWavUrl);
  
  // Clear generation time display for seq mode
  const genTimeEl = document.getElementById('generationTime');
  if (genTimeEl) {
    genTimeEl.textContent = 'Generation time: N/A (Seq mode - playing stored WAV)';
  }
}

/**
 * Play audio based on current mode
 */
async function playAudio(): Promise<void> {
  const mode = getCurrentMode();
  if (mode === 'wav') {
    await playAudioWav();
  } else {
    await playAudioSeq();
  }
}

/**
 * WAVモードとSeqモード間を切り替える
 * @param mode - 切り替え先のモード ('wav' または 'seq')
 * @returns Promise<void>
 * 
 * 動作:
 * - タブのUI状態（active class、ARIA属性）を更新
 * - 再生中の場合は適切な間隔で再生スケジュールを再設定
 * - ステータス表示を更新
 */
async function handleModeSwitch(mode: PlaybackMode): Promise<void> {
  await switchMode(mode, () => {
    // Reschedule playback with appropriate interval
    if (isPlaybackLoopStarted && playbackTimeoutId !== null && scheduleNextPlayFn) {
      clearTimeout(playbackTimeoutId);
      scheduleNextPlayFn();
    } else if (isPlaybackLoopStarted) {
      // Log warning if playback loop is started but scheduling function is unavailable
      console.warn('Playback loop is started but scheduling function is not available');
    }
    
    // Update status display
    updateStatusDisplay();
  });
}

/**
 * シンセサイザーを初期化
 */
export async function init(): Promise<void> {
  // Initialize WASM module - required for all audio processing
  await initWasm().catch((error) => {
    console.error('Failed to initialize WASM module:', error);

    // WASM初期化エラーをユーザーに分かりやすく通知
    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent =
        'シンセサイザーの初期化に失敗しました。ページを再読み込みしてください。';
    }

    throw new Error('WASM initialization failed. The synthesizer cannot run without Rust WASM module.');
  });

  // Initialize oscilloscope
  const canvas = document.getElementById('oscilloscope') as HTMLCanvasElement | null;
  if (canvas) {
    try {
      initOscilloscope(canvas);
    } catch (error) {
      console.error('Failed to initialize oscilloscope:', error);
      displayOscilloscopeError(
        'Failed to initialize waveform visualization. The oscilloscope feature will not be available.'
      );
    }
  } else {
    console.error(
      'Oscilloscope canvas element not found. Expected element with id="oscilloscope". ' +
      'Waveform visualization will not be available.'
    );
  }

  // Initialize full waveform display
  const fullWaveformCanvas = document.getElementById('fullWaveformCanvas') as HTMLCanvasElement | null;
  if (fullWaveformCanvas) {
    try {
      initFullWaveformDisplay(fullWaveformCanvas);
    } catch (error) {
      console.error('Failed to initialize full waveform display:', error);
    }
  } else {
    console.warn('Full waveform canvas element not found. Full waveform display will not be available.');
  }

  // マウス位置を追跡
  document.addEventListener('mousemove', (e) => {
    mousePosition = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
    
    // 表示を更新
    updateMousePositionDisplay(mousePosition, cutoffMax, qMax);
  });
  
  // パラメータ変更のための入力イベントリスナーを追加(デバウンス処理)
  let inputDebounceTimer: number | null = null;
  const handleInputChange = () => {
    if (inputDebounceTimer !== null) {
      clearTimeout(inputDebounceTimer);
    }
    inputDebounceTimer = window.setTimeout(() => {
      readParameters();
      updateUIFields(getCurrentSettings()); // 検証された値でUIを更新し、無効な入力との不一致を防ぐ
      updateStatusDisplay();
      
      // パラメータ変更時に既存の再生スケジュールをキャンセルして再スケジュール
      if (isPlaybackLoopStarted && playbackTimeoutId !== null) {
        clearTimeout(playbackTimeoutId);
        const duration = calculateDuration(bpm, beat);
        playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
      }
    }, 150);
  };
  
  const inputs = ['bpm', 'beat', 'qMax', 'cutoffMax', 'decayUnit', 'decayRate', 'waveformType', 'dutyRatio', 'filterType'];
  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', handleInputChange);
    }
  });
  
  // UIフィールドを保存済み設定で初期化
  updateUIFields(getCurrentSettings());
  
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
      filterType = importedSettings.filterType;
      
      // Update UI
      updateUIFields(importedSettings);
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
        const duration = calculateDuration(bpm, beat);
        playbackTimeoutId = setTimeout(scheduleNextPlay, duration * 1000);
      }
    });
  }
  
  // Tab switching handlers
  const tabWav = document.getElementById('tabWav');
  const tabSeq = document.getElementById('tabSeq');
  
  if (tabWav) {
    tabWav.addEventListener('click', async () => {
      await handleModeSwitch('wav');
    });
  }
  
  if (tabSeq) {
    tabSeq.addEventListener('click', async () => {
      await handleModeSwitch('seq');
    });
  }
  
  // 計算された再生周期に基づいてオーディオを再生(再帰的setTimeoutでエラーハンドリング)
  function scheduleNextPlay() {
    if (isAudioContextRunning()) {
      playAudio().catch((error: unknown) => {
        console.error('Error while playing audio:', error);
      });
    }
    // Use 1 second interval for seq mode, otherwise use calculated duration
    const mode = getCurrentMode();
    const interval = mode === 'seq' ? 1000 : calculateDuration(bpm, beat) * 1000;
    playbackTimeoutId = setTimeout(scheduleNextPlay, interval);
  }
  
  // Store reference for mode switching
  scheduleNextPlayFn = scheduleNextPlay;
  
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
    if (!isToneLoaded()) {
      await loadTone();
    }

    if (!isToneLoaded()) {
      return; // Failed to load
    }

    await startAudioContext();

    // Initialize real-time analysis after Tone.js is loaded and AudioContext is started
    if (!isRealtimeAnalysisInitialized()) {
      const Tone = getTone();
      if (Tone) {
        const fftCanvas = document.getElementById('fftCanvas') as HTMLCanvasElement | null;
        const realtimeWaveformCanvas = document.getElementById('realtimeWaveformCanvas') as HTMLCanvasElement | null;

        if (fftCanvas && realtimeWaveformCanvas) {
          try {
            initRealtimeAnalysis(Tone, fftCanvas, realtimeWaveformCanvas);
            startRealtimeVisualization();
          } catch (error) {
            console.error('Failed to initialize real-time analysis:', error);
          }
        } else {
          console.warn('Real-time analysis canvas elements not found');
        }
      }
    } else {
      // If already initialized, just start visualization
      startRealtimeVisualization();
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
    const mode = getCurrentMode();
    if (mode === 'wav') {
      const duration = calculateDuration(bpm, beat);
      statusEl.textContent = `New audio generated every ${(duration * 1000).toFixed(0)}ms (BPM: ${bpm}, Beat: ${beat})`;
    } else {
      statusEl.textContent = 'Seq Mode: Playing stored WAV every 1 second';
    }
  }
}

/**
 * 波形生成時間を表示
 * @param generationTimeMs - 生成時間(ミリ秒)
 */
function updateGenerationTimeDisplay(generationTimeMs: number): void {
  // この計測値を統計に追加
  addPerformanceSample(performanceStats, generationTimeMs);
  
  const genTimeEl = document.getElementById('generationTime');
  if (genTimeEl) {
    const stats = calculatePerformanceStats(performanceStats);
    
    if (stats && stats.count > 1) {
      // 複数のサンプルがある場合は詳細な統計情報を表示
      const currentText = `Generation time (Rust WASM): ${stats.current.toFixed(2)}ms`;
      const statsText = `[n=${stats.count}, min=${stats.min.toFixed(2)}ms, max=${stats.max.toFixed(2)}ms, avg=${stats.avg.toFixed(2)}ms]`;
      genTimeEl.textContent = `${currentText} ${statsText}`;
    } else {
      // 初回計測では単純表示
      genTimeEl.textContent = `Generation time (Rust WASM): ${generationTimeMs.toFixed(2)}ms`;
    }
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
  stopAndCleanup();

  // Clean up real-time analysis
  stopRealtimeVisualization();
  disposeRealtimeAnalysis();

  // Clear full waveform display
  clearFullWaveform();

  // Clean up stored WAV URL
  if (lastGeneratedWavUrl) {
    URL.revokeObjectURL(lastGeneratedWavUrl);
    lastGeneratedWavUrl = null;
  }
}

{% endraw %}
```

## 最近の変更（過去7日間）
### コミット履歴:
78d6ee4 check large files

### 変更されたファイル:
.github/workflows/call-check-large-files.yml
generated-docs/development-status-generated-prompt.md
generated-docs/development-status.md
generated-docs/project-overview-generated-prompt.md
generated-docs/project-overview.md
index.html
issue-notes/100.md
issue-notes/102.md
issue-notes/104.md
issue-notes/105.md
issue-notes/106.md
issue-notes/109.md
issue-notes/111.md
issue-notes/114.md
issue-notes/116.md
issue-notes/118.md
issue-notes/122.md
issue-notes/21.md
issue-notes/24.md
issue-notes/25.md
issue-notes/28.md
issue-notes/30.md
issue-notes/31.md
issue-notes/33.md
issue-notes/35.md
issue-notes/37.md
issue-notes/41.md
issue-notes/44.md
issue-notes/46.md
issue-notes/48.md
issue-notes/50.md
issue-notes/53.md
issue-notes/55.md
issue-notes/57.md
issue-notes/58.md
issue-notes/59.md
issue-notes/61.md
issue-notes/63.md
issue-notes/66.md
issue-notes/68.md
issue-notes/70.md
issue-notes/74.md
issue-notes/82.md
issue-notes/84.md
issue-notes/86.md
issue-notes/88.md
issue-notes/90.md
issue-notes/92.md
issue-notes/94.md
issue-notes/96.md
issue-notes/98.md
src/full-waveform-display.test.ts
src/full-waveform-display.ts
waveform-gh.png


---
Generated at: 2026-03-02 07:03:04 JST
