# ダークモード適用ドキュメント

## 概要
Naoki Habaの個人ブログサイトにダークモードを適用しました。

## 変更内容

### 1. CSS変数の更新 (`src/styles/global.css`)

#### Before (ライトモード)
```css
:root {
    --accent: #2337ff;
    --accent-dark: #000d8a;
    --black: 15, 18, 25;
    --gray: 96, 115, 159;
    --gray-light: 229, 233, 240;
    --gray-dark: 34, 41, 57;
    --gray-gradient: rgba(var(--gray-light), 50%), #fff;
    --box-shadow:
        0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%), 0 16px 32px
        rgba(var(--gray), 33%);
}
```

#### After (ダークモード)
```css
:root {
    --accent: #60a5fa;
    --accent-dark: #3b82f6;
    --black: 241, 245, 249;
    --gray: 148, 163, 184;
    --gray-light: 30, 41, 59;
    --gray-dark: 226, 232, 240;
    --gray-gradient: rgba(30, 41, 59, 50%), #0f172a;
    --box-shadow:
        0 2px 6px rgba(0, 0, 0, 25%), 0 8px 24px rgba(0, 0, 0, 33%), 0 16px 32px
        rgba(0, 0, 0, 33%);
    --bg-color: #0f172a;
    --header-bg: #1e293b;
}
```

### 2. 色変更の詳細

#### アクセントカラー
- **Before**: `#2337ff` (濃い青)
- **After**: `#60a5fa` (明るい青)

#### 背景色
- **Before**: 白ベースのグラデーション
- **After**: `#0f172a` (濃紺)

#### テキスト色
- **Before**: 暗いグレー `rgb(34, 41, 57)`
- **After**: 明るいグレー `rgb(226, 232, 240)`

#### ヘッダー背景
- **Before**: 白 `white`
- **After**: `#1e293b` (ダークグレー)

### 3. bodyスタイルの更新

#### Before
```css
body {
    background: linear-gradient(var(--gray-gradient)) no-repeat;
    background-size: 100% 600px;
}
```

#### After
```css
body {
    background: var(--bg-color);
}
```

### 4. ヘッダースタイルの更新 (`src/components/Header.astro`)

#### Before
```css
header {
    background: white;
    box-shadow: 0 2px 8px rgba(var(--black), 5%);
}
```

#### After
```css
header {
    background: var(--header-bg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 30%);
}
```

## カラーパレット

### 主要色
- **背景色**: `#0f172a` (Slate 900)
- **ヘッダー背景**: `#1e293b` (Slate 800)
- **アクセント**: `#60a5fa` (Blue 400)
- **テキスト**: `rgb(226, 232, 240)` (Slate 200)

### グレー系
- **ライトグレー**: `rgb(30, 41, 59)` (Slate 700)
- **ミディアムグレー**: `rgb(148, 163, 184)` (Slate 400)
- **ダークグレー**: `rgb(226, 232, 240)` (Slate 200)

## デザインコンセプト
- **視認性**: ダークモードで目に優しい配色
- **コントラスト**: 十分なコントラスト比を確保
- **統一感**: Tailwind CSSのSlateカラーパレットを基調
- **モダン**: 現代的なダークテーマの標準に準拠

## 今後の拡張
- システム設定に応じた自動切り替え機能
- ユーザーによる手動切り替え機能
- アニメーション効果の追加