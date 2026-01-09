# モジュール依存関係図

## 概要
リファクタリング後のモジュール構造と依存関係を示します。

## アーキテクチャ図

```
┌─────────────────────────────────────────────────────────────┐
│                         index.ts                            │
│                      (エントリーポイント)                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                        synth.ts                             │
│                  (コーディネーター層)                         │
│                                                             │
│  - イベントハンドラーの配線                                   │
│  - モジュール間の統合                                        │
│  - アプリケーションライフサイクル管理                          │
└─┬──────────┬───────────┬──────────┬────────────────────────┘
  │          │           │          │
  ▼          ▼           ▼          ▼
┌──────┐  ┌─────────┐ ┌──────────┐ ┌──────────────┐
│timing│  │ui-params│ │audio-    │ │playback-mode │
│      │  │         │ │player    │ │              │
└──┬───┘  └────┬────┘ └─────┬────┘ └──────┬───────┘
   │           │            │              │
   │           │            │              │
   │           ▼            ▼              │
   │      ┌─────────────────────┐          │
   │      │      settings       │          │
   │      └─────────────────────┘          │
   │                                       │
   │           ▼            ▼              │
   └──────► ┌───────────────────┐ ◄────────┘
            │   外部依存層       │
            │                   │
            │ - Tone.js         │
            │ - DOM API         │
            │ - localStorage    │
            └───────────────────┘
```

## モジュール別詳細

### 1. timing.ts
**依存**: なし（純粋関数）
**責任**: BPM/beat計算
```typescript
export function calculateDuration(bpm: number, beat: number): number
```

### 2. ui-params.ts
**依存**: settings.ts
**責任**: UIパラメータ管理
```typescript
export function readParametersFromUI(currentSettings: Settings): Settings
export function updateUIFields(settings: Settings): void
export function mapMouseToFilterParams(...): FilterParams
export function updateMousePositionDisplay(...): void
```

### 3. audio-player.ts
**依存**: Tone.js（動的インポート）
**責任**: オーディオ再生管理
```typescript
export async function loadTone(): Promise<void>
export function isToneLoaded(): boolean
export async function startAudioContext(): Promise<void>
export function isAudioContextRunning(): boolean
export async function playWavUrl(wavUrl: string): Promise<void>
export function stopAndCleanup(): void
```

### 4. playback-mode.ts
**依存**: なし（DOM APIのみ）
**責任**: 再生モード管理
```typescript
export type PlaybackMode = 'wav' | 'seq'
export function getCurrentMode(): PlaybackMode
export function updateModeUI(mode: PlaybackMode): void
export async function switchMode(mode: PlaybackMode, callback?: ModeChangeCallback): Promise<void>
```

### 5. synth.ts (リファクタリング後)
**依存**: すべてのドメインモジュール
**責任**: アプリケーション統合
- 各モジュールの初期化
- イベントハンドラーの配線
- 再生ループの管理
- クリーンアップ

## 依存関係の特徴

### 単方向依存
- 依存関係は単方向（循環依存なし）
- 上位層が下位層に依存
- 下位層は上位層を知らない

### 疎結合
- 各モジュールが独立して動作可能
- インターフェースを通じた通信
- 単体テストが容易

### 凝集度が高い
- 各モジュールが単一の責任を持つ
- 関連する機能がまとまっている
- 変更の影響範囲が限定的

## テスト可能性

```
timing.ts          → 純粋関数、モック不要
ui-params.ts       → DOM操作あり、happy-domで検証
audio-player.ts    → Tone.js依存、統合テストで検証
playback-mode.ts   → DOM操作あり、happy-domで検証
synth.ts          → 統合層、E2Eテストで検証
```

## リファクタリング前との比較

### 変更前
```
┌──────────────────────┐
│     synth.ts         │
│   (699行、単一責任   │
│    原則違反)         │
│                      │
│ - タイミング計算     │
│ - UI管理            │
│ - オーディオ再生     │
│ - モード管理         │
│ - 統合処理           │
└──────────────────────┘
```

### 変更後
```
┌──────────────────────┐
│     synth.ts         │
│   (497行、統合のみ)  │
└───────┬──────────────┘
        │
    ┌───┴───┬───┬───┬───┐
    ▼       ▼   ▼   ▼   ▼
  timing ui audio play...
  (23行) (183) (124) (74)
```

## メリット

1. **保守性の向上**: 変更の影響範囲が明確
2. **テスト容易性**: 各モジュールを独立してテスト可能
3. **可読性の向上**: ファイルサイズが小さく理解しやすい
4. **再利用性**: モジュールが独立しており他のプロジェクトでも使用可能
5. **並行開発**: 複数の開発者が異なるモジュールを同時に編集可能
