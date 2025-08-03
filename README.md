# Naoki Haba - 個人ブログサイト

Astroで構築されたNaoki Habaの個人ブログサイトです。登壇情報と執筆記事を中心とした構成になっています。

## 🚀 プロジェクト構成

```text
/
├── public/
│   ├── icon.png           # サイトアイコン
│   └── fonts/             # Webフォント
├── src/
│   ├── assets/
│   │   └── icon.png       # プロフィールアイコン
│   ├── components/
│   │   ├── BaseHead.astro # メタデータコンポーネント
│   │   ├── Header.astro   # ヘッダーナビゲーション
│   │   ├── Footer.astro   # フッター
│   │   └── ...
│   ├── content/
│   │   ├── talks/         # 登壇情報（Markdown）
│   │   └── writings/      # 執筆記事（Markdown）
│   ├── layouts/
│   │   └── BlogPost.astro # 記事レイアウト
│   ├── pages/
│   │   ├── index.astro    # ホームページ
│   │   ├── about.astro    # プロフィールページ
│   │   ├── talks/         # 登壇一覧・詳細ページ
│   │   └── writings/      # 執筆一覧ページ
│   └── styles/
│       └── global.css     # グローバルスタイル
└── package.json
```

## 🎨 機能

### コンテンツ管理
- **登壇情報**: スライド・動画リンク付きの発表記録
- **執筆記事**: 外部メディアへの寄稿記事リンク
- **プロフィール**: 自己紹介とスキル情報

### デザイン
- **ダークモード**: 目に優しいダークテーマ
- **レスポンシブ**: モバイル・デスクトップ対応
- **アクセシビリティ**: セマンティックHTML、適切なコントラスト

### コンテンツコレクション
Astro Content Collectionsを使用したタイプセーフなコンテンツ管理

#### Talks Collection
```typescript
{
  title: string;
  description: string;
  date: Date;
  event: string;
  slideUrl?: string;
  videoUrl?: string;
  heroImage?: ImageMetadata;
}
```

#### Writings Collection
```typescript
{
  title: string;
  description: string;
  pubDate: Date;
  publication: string;
  articleUrl: string;
  heroImage?: ImageMetadata;
}
```

## 🛠️ 技術スタック

- **フレームワーク**: [Astro](https://astro.build/)
- **パッケージマネージャー**: pnpm
- **スタイリング**: CSS Custom Properties
- **フォント**: Atkinson (カスタムWebフォント)
- **デプロイ**: GitHub Pages対応

## 🧞 コマンド

| コマンド                   | アクション                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | 依存関係をインストール                                |
| `pnpm run dev`             | 開発サーバーを `localhost:4321` で起動              |
| `pnpm run build`           | 本番用サイトを `./dist/` にビルド          |
| `pnpm run preview`         | ビルド済みサイトをローカルでプレビュー                 |
| `pnpm run astro ...`       | `astro add`, `astro check` などのCLIコマンドを実行 |

## 📝 コンテンツの追加

### 登壇情報の追加
`src/content/talks/` に新しいMarkdownファイルを作成:

```markdown
---
title: '発表タイトル'
description: '発表の概要'
date: 2024-12-01
event: 'イベント名'
slideUrl: 'https://example.com/slides'
videoUrl: 'https://youtube.com/watch?v=xxx'
---

発表内容の詳細...
```

### 執筆記事の追加
`src/content/writings/` に新しいMarkdownファイルを作成:

```markdown
---
title: '記事タイトル'
description: '記事の概要'
pubDate: 2024-12-01
publication: '掲載メディア'
articleUrl: 'https://example.com/article'
---

記事の概要や補足情報...
```

## 🎯 カスタマイズ

### サイト情報の変更
`src/consts.ts` でサイトのタイトルと説明を編集:

```typescript
export const SITE_TITLE = 'あなたの名前';
export const SITE_DESCRIPTION = 'サイトの説明';
```

### ソーシャルリンクの変更
`src/components/Header.astro` でGitHubリンクを編集

### カラーテーマの調整
`src/styles/global.css` のCSS変数を編集:

```css
:root {
  --accent: #60a5fa;      /* アクセントカラー */
  --bg-color: #0f172a;    /* 背景色 */
  --header-bg: #1e293b;   /* ヘッダー背景色 */
}
```

## 📄 ドキュメント

- [DARK_MODE.md](./DARK_MODE.md) - ダークモード適用の詳細

## 🚀 デプロイ

### GitHub Pages
1. リポジトリの Settings > Pages
2. Source を GitHub Actions に設定
3. `.github/workflows/deploy.yml` を作成（Astroの公式テンプレート使用）

### 手動ビルド
```bash
pnpm run build
# ./dist/ の内容を任意のホスティングサービスにアップロード
```

## 📋 開発履歴

### 2024年8月
- [x] Astroプロジェクト初期化
- [x] Content Collections設定（talks, writings）
- [x] ページ構造作成（Home, About, Talks, Writings）
- [x] ダークモード適用
- [x] ブログ機能削除・不要画像削除
- [x] アイコン設定（favicon, プロフィール）

## 🤝 コントリビューション

このプロジェクトは個人サイト用ですが、改善提案やバグ報告は歓迎します。

## 📞 連絡先

- GitHub: [@naokihaba](https://github.com/naokihaba)

---

Built with ❤️ using [Astro](https://astro.build/)