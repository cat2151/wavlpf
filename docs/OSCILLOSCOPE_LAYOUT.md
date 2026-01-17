# オシロスコープの10個の表示要素のレイアウト詳細

## 概要

wavlpfアプリでは、cat-oscilloscopeライブラリを使用して、10個の表示要素を配置しています。このドキュメントでは、各要素の座標、サイズ、配置方法を詳細に説明します。

**表示要素の内訳**:
- 6個のcanvas要素（波形・比較・ピアノ鍵盤）
- 4個のデバッグオーバーレイ（周波数・音名・ゲイン・類似度）

## レイアウトスクリーンショット

![Oscilloscope Layout](https://github.com/user-attachments/assets/a67f16a6-3749-46ae-ad8f-0edae265f690)

## 座標系と配置戦略

### Z-Index階層構造

```
Z-Index: 1000 - エラーメッセージ (.oscilloscope-container)
Z-Index: 100  - デバッグオーバーレイ (.oscilloscope-debug-overlay)
Z-Index: 1    - UIコントロール (.container)
Z-Index: 0    - オシロスコープパネル群 (.oscilloscope-panels)
Z-Index: 0    - メインオシロスコープ (#oscilloscope)
```

## 10個の表示要素の詳細

### 1. メインオシロスコープキャンバス

**Canvas Element ID**: `oscilloscope`

**配置方法**:
```css
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

**サイズ**:
- 幅: 1800px
- 高さ: 1000px
- 最大幅: 100vw
- 最大高さ: 100vh

**座標**:
- 画面中央に配置（センタリング）
- ビューポート全体をカバー

**説明**:
- メインの波形表示キャンバス
- 背景全体を占める最大の表示領域
- 緑色のグリッド線付き
- 緑色のボーダー（2px solid #00ff00）

---

### 2. フレームバッファキャンバス

**Canvas Element ID**: `frameBufferCanvas`

**配置方法**:
```css
/* 親コンテナ: .oscilloscope-panels */
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
padding: 20px;

/* パネル: .frame-buffer-panel */
margin-top: 10px;
```

**サイズ**:
- 幅: 800px
- 高さ: 120px

**座標**:
- 画面上部中央
- 上から約30px（padding 20px + margin-top 10px）

**説明**:
- フレームバッファ全体に蓄積された波形のプレビュー
- 青いボーダー（2px solid rgba(0, 136, 255, 0.5)）
- 半透明の黒背景（rgba(0, 0, 0, 0.8)）
- ラベル: "フレームバッファ全体"

---

### 3-5. 比較パネル（3つのキャンバス）

**配置方法**:
```css
/* 親コンテナ: .comparison-panels */
display: flex;
gap: 8px;
justify-content: center;
flex-wrap: wrap;
```

#### 3. 前回の波形キャンバス

**Canvas Element ID**: `previousWaveformCanvas`

**サイズ**: 250x120px

**座標**: 比較パネルの左側

**説明**:
- 前回の入力から取得した波形
- ラベル: "前回の波形"

#### 4. 今回の波形キャンバス

**Canvas Element ID**: `currentWaveformCanvas`

**サイズ**: 250x120px

**座標**: 比較パネルの中央

**説明**:
- 今回の入力波形
- ラベル: "今回の波形"

#### 5. 類似度推移キャンバス

**Canvas Element ID**: `similarityPlotCanvas`

**サイズ**: 250x120px

**座標**: 比較パネルの右側

**説明**:
- 前回と今回の波形の類似度推移グラフ
- ラベル: "類似度推移"

**3つのパネルの共通仕様**:
- 各パネル間の間隔: 8px
- 青いボーダー（2px solid rgba(0, 136, 255, 0.5)）
- 半透明の黒背景（rgba(0, 0, 0, 0.8)）
- 画面中央に水平配置
- 小画面では縦に折り返し（flex-wrap: wrap）

---

### 6. ピアノ鍵盤キャンバス

**Canvas Element ID**: `pianoKeyboardCanvas`

**配置方法**:
```css
/* 親コンテナ: .piano-panel */
margin-bottom: 10px;
```

**サイズ**:
- 幅: 800px
- 高さ: 60px

**座標**:
- 画面下部中央
- 下から約30px（padding 20px + margin-bottom 10px）

**説明**:
- 検出周波数を視覚的に表示
- 対応周波数範囲: 50Hz～2000Hz
- オレンジ色のボーダー（実装により変更可能）
- ラベル: "ピアノ鍵盤 (Piano Keyboard) - 50Hz～2000Hz"

---

### 7-10. デバッグオーバーレイ（4つの表示要素）

**配置方法**:
```css
position: fixed;
top: 10px;
right: 10px;
```

**座標**:
- 画面右上コーナー
- 上から10px
- 右から10px

**サイズ**:
- 可変幅（コンテンツに応じて自動調整）
- 各行の高さ: 約20px（フォントサイズ14px + margin）

#### 7. 周波数表示

**Element ID**: `frequencyValue`

**表示形式**: "440.0 Hz"

**説明**: 検出された周波数（小数点第1位まで）

#### 8. 音名表示

**Element ID**: `noteValue`

**表示形式**: "A4"

**説明**: 周波数から算出された音名（C0～B8の範囲）

#### 9. ゲイン値表示

**Element ID**: `gainValue`

**表示形式**: "2.50x"

**説明**: 自動ゲイン補正の倍率（小数点第2位まで）

#### 10. 類似度表示

**Element ID**: `similarityValue`

**表示形式**: "85.2%"

**説明**: 前回と今回の波形の類似度（百分率、小数点第1位まで）

**デバッグオーバーレイの共通仕様**:
- 背景色: rgba(0, 0, 0, 0.8)（半透明の黒）
- ボーダー: 2px solid rgba(0, 255, 0, 0.5)（緑色）
- パディング: 10px
- フォント: 'Courier New', monospace
- フォントサイズ: 14px
- 発光効果: box-shadow: 0 0 10px rgba(0, 255, 0, 0.3)
- 各項目間の間隔: 5px
- ラベル色: #aaaaaa（グレー）
- 値の色: #00ff00（緑色）
- 値の最小幅: 100px（右揃え）
- pointer-events: none（クリック無効）

---

## レイアウト計算の詳細

### 比較パネルの横幅計算

```
総幅 = (250px × 3) + (8px × 2) + (パディング8px × 2 × 3パネル) + (ボーダー2px × 2 × 3パネル)
     = 750px + 16px + 48px + 12px
     = 826px
```

### フレームバッファとピアノ鍵盤の横幅

```
パネル総幅 = 800px + (パディング8px × 2) + (ボーダー2px × 2)
           = 800px + 16px + 4px
           = 820px
```

### 縦方向の配置計算（概算）

```
上部余白: 20px (padding)
フレームバッファパネル: 10px (margin-top) + 8px (padding) + 2px (border) + 5px (label) + 120px (canvas) + 8px (padding) + 2px (border) = 155px
中段余白: 約10px (justify-content: space-between による自動調整)
比較パネル: 8px (padding) + 2px (border) + 5px (label) + 120px (canvas) + 8px (padding) + 2px (border) = 153px
中段～下段余白: 約10px
ピアノ鍵盤パネル: 8px (padding) + 2px (border) + 5px (label) + 60px (canvas) + 8px (padding) + 2px (border) = 93px
下部余白: 10px (margin-bottom) + 20px (padding) = 30px

合計: 約451px（パネル群の合計高さ）
```

## 更新頻度とパフォーマンス

### リアルタイム更新

- **メインオシロスコープ**: 約60 FPS（requestAnimationFrame）
- **フレームバッファ**: 約60 FPS
- **比較パネル**: 波形変化検出時
- **類似度推移**: 波形比較実行時
- **ピアノ鍵盤**: 100ms（10 FPS）
- **デバッグオーバーレイ**: 100ms（10 FPS）

### 最適化

- デバッグオーバーレイとピアノ鍵盤は意図的に低頻度更新（CPU負荷軽減）
- pointer-events: none により、背景パネルへのイベント処理を無効化
- flexboxによる効率的なレイアウト計算

## cat-oscilloscopeデモアプリとの対応

### 類似点

1. **5つのcanvas要素**: 同じcanvas構成
2. **推奨サイズ**: ライブラリの推奨値を使用
3. **パネルラベル**: 同様の日本語ラベル
4. **デバッグ情報**: 周波数、音名、ゲイン、類似度を表示

### 相違点

1. **メインキャンバスサイズ**: 
   - デモ: 800x350px
   - wavlpf: 1800x1000px（背景全体をカバー）
2. **レイアウト方向**:
   - デモ: 縦スクロール可能な中央配置
   - wavlpf: 固定配置（スクロールなし）
3. **UIコントロール**:
   - デモ: canvas下部に配置
   - wavlpf: 中央のコンテナ内（UIコントロールは別実装）

## 実装ファイル

- **HTML**: `index.html`（canvas要素とコンテナ構造）
- **CSS**: `index.html`内の`<style>`タグ
- **TypeScript**: `src/oscilloscope.ts`（初期化とデバッグ更新ロジック）
- **テスト**: `src/oscilloscope.test.ts`

## レイアウト変更方法

### canvas要素のサイズ変更

`index.html`の各canvas要素の`width`と`height`属性を変更：

```html
<canvas id="frameBufferCanvas" width="800" height="120"></canvas>
```

### パネル間の間隔調整

`.oscilloscope-panels`の`gap`プロパティを変更：

```css
.oscilloscope-panels {
  gap: 10px; /* デフォルト: 10px */
}
```

### 比較パネルの間隔調整

`.comparison-panels`の`gap`プロパティを変更：

```css
.comparison-panels {
  gap: 8px; /* デフォルト: 8px */
}
```

### デバッグオーバーレイの位置変更

`.oscilloscope-debug-overlay`の`top`と`right`を調整：

```css
.oscilloscope-debug-overlay {
  top: 10px;  /* 上からの距離 */
  right: 10px; /* 右からの距離 */
}
```

### デバッグ更新頻度の変更

`src/oscilloscope.ts`の`startDebugOverlayUpdates()`内の間隔を変更：

```typescript
debugUpdateInterval = window.setInterval(() => {
  // 更新処理
}, 100); // ミリ秒単位（100ms = 10 FPS）
```

---

**最終更新**: 2026-01-17  
**ステータス**: ✅ 実装完了・レイアウト確認済み
