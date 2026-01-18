Last updated: 2026-01-19

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
- issue-notes/102.md
- issue-notes/104.md
- issue-notes/105.md
- issue-notes/106.md
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
- scripts/screenshot-github-pages.js
- scripts/setup-cat-oscilloscope-wasm.js
- scripts/test-console-logs.js
- scripts/test-pr-changes-locally.sh
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
## [Issue #106](../issue-notes/106.md): 陳腐化したドキュメントを削除する
[issue-notes/106.md](https://github.com/cat2151/wavlpf/blob/main/issue-notes/106.md)

...
ラベル: 
--- issue-notes/106.md の内容 ---

```markdown
# issue 陳腐化したドキュメントを削除する #106
[issues #106](https://github.com/cat2151/wavlpf/issues/106)



```

## [Issue #105](../issue-notes/105.md): README.ja.mdに、cat2151の直近project同様に、バッジをつける
[issue-notes/105.md](https://github.com/cat2151/wavlpf/blob/main/issue-notes/105.md)

...
ラベル: 
--- issue-notes/105.md の内容 ---

```markdown
# issue README.ja.mdに、cat2151の直近project同様に、バッジをつける #105
[issues #105](https://github.com/cat2151/wavlpf/issues/105)



```

## [Issue #104](../issue-notes/104.md): 周波数推定に失敗している。シーケンサのライブラリ側で対処するので、それまで待つ
[issue-notes/104.md](https://github.com/cat2151/wavlpf/blob/main/issue-notes/104.md)

...
ラベル: 
--- issue-notes/104.md の内容 ---

```markdown
# issue 周波数推定に失敗している。シーケンサのライブラリ側の対応を待つ #104
[issues #104](https://github.com/cat2151/wavlpf/issues/104)



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
### .github/actions-tmp/README.ja.md
```md
{% raw %}
# GitHub Actions 共通ワークフロー集

このリポジトリは、**複数プロジェクトで使い回せるGitHub Actions共通ワークフロー集**です

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
</p>

# 3行で説明
- 🚀 プロジェクトごとのGitHub Actions管理をもっと楽に
- 🔗 共通化されたワークフローで、どのプロジェクトからも呼ぶだけでOK
- ✅ メンテは一括、プロジェクト開発に集中できます

## Quick Links
| 項目 | リンク |
|------|--------|
| 📖 プロジェクト概要 | [generated-docs/project-overview.md](generated-docs/project-overview.md) |
| 📖 コールグラフ | [generated-docs/callgraph.html](https://cat2151.github.io/github-actions/generated-docs/callgraph.html) |
| 📊 開発状況 | [generated-docs/development-status.md](generated-docs/development-status.md) |

# notes
- まだ共通化の作業中です
- まだワークフロー内容を改善中です

※README.md は README.ja.md を元にGeminiの翻訳でGitHub Actionsで自動生成しています

{% endraw %}
```

### README.ja.md
```md
{% raw %}
# wavlpf

Rust WASMで実装されたローパスフィルター（LPF）付きシンプルソフトウェアシンセサイザー

## デモ

https://cat2151.github.io/wavlpf/

※このドキュメントは仮で、取り急ぎLLMで生成しました。今後修正します

## 機能

- **Rust WASM信号プロセッサ**: 高速なDSP処理をRustで実装
  - ミリ秒精度でのパフォーマンス測定
  - ネイティブからも利用可能なRustクレートとして実装
- **220Hz波形ジェネレーター**: ノコギリ波またはパルス波、デューティー比設定可能
- **Biquadフィルター**: マウス制御によるインタラクティブなフィルター
  - 複数のフィルタータイプ: LPF、HPF、BPF、Notch、APF、Low Shelf、High Shelf
  - X軸: カットオフ周波数（20Hz - 設定可能な最大値）
  - Y軸: レゾナンスQ値（0.5 - 設定可能な最大値、反転: 上 = 高、下 = 低）
  - 設定可能なカットオフ減衰（HzまたはCent/ミリ秒）
- **波形ビジュアライゼーション**: [cat-oscilloscope](https://github.com/cat2151/cat-oscilloscope)を使用したリアルタイムオシロスコープ表示
  - Rust/WASMによる高性能ビジュアライゼーション
  - Float32Arrayバッファの可視化
  - ループ再生対応
- **非リアルタイムレンダリング**: WebAudio非依存の信号処理
- **設定可能なオーディオバッファ**: BPMとビート基準のオーディオ生成タイミング
- **WAV生成**: 処理済みオーディオをWAVフォーマットに変換
- **Tone.js統合**: クリーンなオーディオ再生
- **設定の永続化**: 設定をJSONファイルでインポート/エクスポート

## 関連ドキュメント

### オシロスコープ統合

**📘 使用ガイド** - [docs/OSCILLOSCOPE_USAGE.md](docs/OSCILLOSCOPE_USAGE.md) - **現在の実装と使用方法**（日本語）

**技術詳細**:
- [docs/CAT_OSCILLOSCOPE_WASM_SETUP.md](docs/CAT_OSCILLOSCOPE_WASM_SETUP.md) - WASMセットアップの詳細

### 開発ガイド

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - 開発フレームワークとテスト戦略

## はじめに

開発フレームワークとテスト戦略の詳細については、[DEVELOPMENT.md](DEVELOPMENT.md)を参照してください。

波形可視化については、[docs/OSCILLOSCOPE_USAGE.md](docs/OSCILLOSCOPE_USAGE.md)を参照してください。

### 前提条件

- Node.js（v14以上）
- npm
- Rustとwasm-pack（WASMモジュールのビルド用）

#### Rustとwasm-packのインストール

**方法1: 自動インストールスクリプト（推奨）**

プロジェクトに用意されているスクリプトを使用してwasm-packをインストール:

```bash
# wasm-packをインストール
bash scripts/install-wasm-pack.sh
```

このスクリプトは:
- Rustとcargoがインストールされているか確認
- wasm-packが既にインストールされているか確認
- cargo経由でwasm-packをインストール（ネットワーク制限がある環境でも動作）
- インストールの成功を確認

**方法2: 手動インストール**

Rustとwasm-packを手動でインストール:

```bash
# Rustのインストール
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# wasm-packのインストール
cargo install wasm-pack
```

### インストール

```bash
npm install
```

### 開発

ホットモジュールリプレースメント付きの開発サーバーを起動:

```bash
npm run dev
```

これにより、即時HMR対応のVite開発サーバーが起動します。ブラウザはhttp://localhost:8080で自動的に開きます。

### ビルド

WASMモジュールとアプリケーション全体をビルド:

```bash
# WASMモジュールのみビルド
npm run build:wasm

# すべてをビルド（WASM + TypeScript + Vite本番バンドル）
npm run build
```

TypeScriptの型チェック、Rust WASMモジュールのビルド、Viteで本番用バンドルを作成します。

**⚠️ wasm-optに関する厳重な注意 ⚠️**: 
- ビルドはデフォルトで`wasm-opt`（binaryenから）を使用してWASMの最適化を行います
- **これはCI環境を含むすべての環境で正常に動作することが検証済みです**
- **`wasm-audio/Cargo.toml`で`wasm-opt = false`を設定することは厳重に禁止されています**
- 過去にAI agentが2回、根拠のない憶測で`wasm-opt = false`を追加する誤りを犯しました
- ownerが検証した結果、wasm-optは有効で問題ないことが確認されています
- デフォルト設定（wasm-opt有効）を変更しないでください
- デバッグ目的でローカルで一時的に無効化する場合も、その変更をコミットしないでください

### 本番ビルドのプレビュー

```bash
npm run preview
```

デプロイ前に本番ビルドをローカルで確認します。

### テスト

テストスイートを実行:

```bash
npm test         # ウォッチモード
npm run test:run # 一度だけ実行
npm run test:ui  # ビジュアルテストランナー
npm run coverage # カバレッジレポート生成
```

### 実行（レガシー）

注意: `serve`コマンドは現在Viteのプレビューサーバーを使用しています:

```bash
npm run serve
```

その後、ブラウザでhttp://localhost:8080を開きます（開発には`npm run dev`を使用してください）。

## 使い方

1. ブラウザでアプリケーションを開く
2. ページ上の任意の場所をクリックしてオーディオコンテキストを開始
3. **パラメータを設定**:
   - 波形タイプ: ノコギリ波またはパルス波
   - デューティー比: パルス波用（0-100%）
   - BPMとビート: オーディオ生成タイミングを制御
   - Q最大値: 最大レゾナンス値
   - カットオフ周波数最大値: 最大カットオフ周波数
   - 減衰単位: HzまたはCent
   - 減衰レート: ミリ秒あたりの減衰率
4. マウスを動かしてリアルタイムでフィルターパラメータを制御:
   - **水平位置（X）**: カットオフ周波数を制御（20Hz - 最大値）
   - **垂直位置（Y）**: レゾナンス/Q値を制御（0.5 - 最大値、反転: 上 = 高、下 = 低）
5. **生成時間**表示を確認してパフォーマンスを監視
6. BPMとビート設定に基づいて生成される新しいオーディオを聴く

## アーキテクチャ

### 信号処理（WebAudio非依存）

#### Rust WASM実装
- `wasm-audio/src/lib.rs`: Rustによる完全な信号処理パイプライン
  - オシレーター生成（ノコギリ波、パルス波）
  - RBJ Audio EQ Cookbook公式を使用したBiquad LPFフィルター
  - カットオフ減衰を含むオーディオレンダリング
- `wasm-audio/pkg/`: 生成されたWASMバインディング

#### 統合
- `src/wasmAudio.ts`: WASMモジュールのTypeScriptラッパー
  - 動的WASMロード
  - パフォーマンス測定

### アプリケーション

- `src/synth.ts`: マウストラッキング、オーディオ再生を含むメインシンセサイザーロジック
- `src/wav.ts`: WAVファイルフォーマット生成
- `src/settings.ts`: 設定の永続化（localStorageとJSONインポート/エクスポート）
- `src/index.ts`: エントリーポイント
- `index.html`: Webインターフェース

## デプロイ

アプリケーションは`main`ブランチに変更がプッシュされると自動的にGitHub Pagesにデプロイされます。デプロイワークフロー:

1. Node.js依存関係をインストール
2. TypeScriptをJavaScriptにビルド
3. `index.html`、`dist/`、および`node_modules/`から必要なファイルをデプロイディレクトリにコピー
4. GitHub Pagesにデプロイ

ワークフローは`.github/workflows/deploy.yml`で定義されています。

## ライセンス

MIT

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

### .github/actions-tmp/issue-notes/7.md
```md
{% raw %}
# issue issue note生成できるかのtest用 #7
[issues #7](https://github.com/cat2151/github-actions/issues/7)

- 生成できた
- closeとする

{% endraw %}
```

### issue-notes/104.md
```md
{% raw %}
# issue 周波数推定に失敗している。シーケンサのライブラリ側の対応を待つ #104
[issues #104](https://github.com/cat2151/wavlpf/issues/104)



{% endraw %}
```

### issue-notes/105.md
```md
{% raw %}
# issue README.ja.mdに、cat2151の直近project同様に、バッジをつける #105
[issues #105](https://github.com/cat2151/wavlpf/issues/105)



{% endraw %}
```

### issue-notes/106.md
```md
{% raw %}
# issue 陳腐化したドキュメントを削除する #106
[issues #106](https://github.com/cat2151/wavlpf/issues/106)



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
c484ac6 Add issue note for #106 [auto]
cd3b230 Add issue note for #105 [auto]
93ec9d8 Add issue note for #104 [auto]
c15ac17 Merge pull request #103 from cat2151/copilot/fix-orange-border-issue
a99b840 Update OSCILLOSCOPE_LAYOUT.md to document canvas width/height requirement
ccc7c44 Fix orange border overlay by adding canvas width/height attributes
37fb681 Initial plan
900d956 Add issue note for #102 [auto]
a7bf7ec Merge pull request #101 from cat2151/copilot/fix-waveform-display-layout
ee773b2 Enable screenshot capture bypassing wasm-opt download errors

### 変更されたファイル:
docs/DEPLOYMENT_VERIFICATION.md
docs/OSCILLOSCOPE_LAYOUT.md
generated-docs/development-status-generated-prompt.md
generated-docs/development-status.md
generated-docs/project-overview-generated-prompt.md
generated-docs/project-overview.md
index.html
issue-notes/102.md
issue-notes/104.md
issue-notes/105.md
issue-notes/106.md
package.json
scripts/screenshot-github-pages.js
scripts/test-pr-changes-locally.sh
scripts/verify-deployment.js


---
Generated at: 2026-01-19 07:02:56 JST
