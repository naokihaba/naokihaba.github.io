# Astroブログ セットアップガイド

このドキュメントでは、AstroでNaoki Habaの個人ブログサイトを作成した手順を詳しく説明します。

## 📋 前提条件

- Node.js 18.x以上
- pnpm（パッケージマネージャー）
- Git

## 🚀 セットアップ手順

### 1. プロジェクトの初期化

```bash
# Astroプロジェクトをblogテンプレートで作成
npm create astro@latest . -- --template blog --typescript strict --git --no-install

# pnpmで依存関係をインストール
pnpm install
```

### 2. サイト基本情報の設定

`src/consts.ts` を編集してサイト情報を更新：

```typescript
export const SITE_TITLE = 'Naoki Haba';
export const SITE_DESCRIPTION = 'Naoki Habaの個人ブログ - 登壇・執筆・技術記事';
```

### 3. Content Collectionsの設定

`src/content.config.ts` を編集して、登壇と執筆記事用のコレクションを追加：

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const talks = defineCollection({
  loader: glob({ base: './src/content/talks', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      event: z.string(),
      slideUrl: z.string().url().optional(),
      videoUrl: z.string().url().optional(),
      heroImage: image().optional(),
    }),
});

const writings = defineCollection({
  loader: glob({ base: './src/content/writings', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      publication: z.string(),
      articleUrl: z.string().url(),
      heroImage: image().optional(),
    }),
});

export const collections = { talks, writings };
```

### 4. コンテンツディレクトリの作成

```bash
mkdir -p src/content/talks src/content/writings
```

### 5. ページ構造の構築

#### 登壇一覧ページ (`src/pages/talks/index.astro`)

```astro
---
import BaseHead from '../../components/BaseHead.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import FormattedDate from '../../components/FormattedDate.astro';
import { SITE_TITLE } from '../../consts';
import { getCollection } from 'astro:content';

const talks = (await getCollection('talks')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
---

<!doctype html>
<html lang="ja">
  <head>
    <BaseHead title={`登壇 - ${SITE_TITLE}`} description="登壇情報" />
  </head>
  <body>
    <Header />
    <main>
      <section>
        <h1>登壇</h1>
        <ul>
          {talks.map((talk) => (
            <li>
              <a href={`/talks/${talk.id}/`}>
                <h4 class="title">{talk.data.title}</h4>
                <p class="date">
                  <FormattedDate date={talk.data.date} />
                  {' - '}
                  {talk.data.event}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
    <Footer />
  </body>
</html>
```

#### 登壇詳細ページ (`src/pages/talks/[...slug].astro`)

動的ルーティングを使用して個別の登壇詳細ページを生成。

#### 執筆一覧ページ (`src/pages/writings/index.astro`)

外部記事へのリンク集として構築。

### 6. ナビゲーションの更新

`src/components/Header.astro` を編集：

```astro
<div class="internal-links">
  <HeaderLink href="/">Home</HeaderLink>
  <HeaderLink href="/talks">Talks</HeaderLink>
  <HeaderLink href="/writings">Writings</HeaderLink>
  <HeaderLink href="/about">About</HeaderLink>
</div>
```

### 7. ホームページの作成

`src/pages/index.astro` を個人サイト向けに改造：

```astro
<main>
  <h1>Welcome</h1>
  <p>
    こんにちは、Naoki Habaです。<br />
    ソフトウェアエンジニアとして活動しており、技術カンファレンスでの登壇や技術記事の執筆を行っています。
  </p>
  
  <section class="recent-posts">
    <h2>最近の活動</h2>
    <div class="cards">
      <div class="card">
        <h3><a href="/talks">登壇</a></h3>
        <p>カンファレンスや勉強会での発表資料</p>
      </div>
      <div class="card">
        <h3><a href="/writings">執筆</a></h3>
        <p>各種メディアに寄稿した記事</p>
      </div>
    </div>
  </section>
</main>
```

### 8. Aboutページの更新

`src/pages/about.astro` にプロフィール情報を追加：

```astro
<div class="profile-section">
  <img src={IconImage.src} alt="Naoki Haba" class="profile-icon" />
  <h2>About Me</h2>
</div>
<p>
  こんにちは、Naoki Habaです。ソフトウェアエンジニアとして活動しています。
</p>

<h3>活動</h3>
<ul>
  <li>技術カンファレンスでの登壇</li>
  <li>技術記事の執筆</li>
  <li>オープンソースプロジェクトへの貢献</li>
</ul>
```

### 9. アイコンの設定

#### ファビコンの更新

`src/components/BaseHead.astro` でアイコンを設定：

```astro
import IconImage from '../assets/icon.png';

<link rel="icon" type="image/png" href={IconImage.src} />
```

### 10. ダークモードの適用

`src/styles/global.css` でダークテーマに変更：

```css
:root {
  --accent: #60a5fa;
  --accent-dark: #3b82f6;
  --black: 241, 245, 249;
  --gray: 148, 163, 184;
  --gray-light: 30, 41, 59;
  --gray-dark: 226, 232, 240;
  --gray-gradient: rgba(30, 41, 59, 50%), #0f172a;
  --bg-color: #0f172a;
  --header-bg: #1e293b;
}

body {
  background: var(--bg-color);
  color: rgb(var(--gray-dark));
}
```

### 11. 不要な機能の削除

#### ブログ機能の削除

```bash
# ブログ関連ファイルの削除
rm -rf src/pages/blog src/content/blog
rm src/assets/blog-placeholder-*.jpg

# content.config.tsからblogコレクションを削除
# BaseHead.astroから削除された画像の参照を削除
```

### 12. サンプルコンテンツの作成

#### 登壇サンプル (`src/content/talks/sample-talk.md`)

```markdown
---
title: 'Astroで作る高速なWebサイト'
description: 'Astroを使った静的サイト生成について発表しました'
date: 2024-10-15
event: 'Tech Conference 2024'
slideUrl: 'https://speakerdeck.com/example/astro-fast-websites'
videoUrl: 'https://www.youtube.com/watch?v=example'
---

## 発表内容
Tech Conference 2024で、Astroを使った高速なWebサイトの構築について発表しました。
```

#### 執筆サンプル (`src/content/writings/sample-article.md`)

```markdown
---
title: 'モダンなフロントエンド開発のベストプラクティス'
description: 'フロントエンド開発における最新のベストプラクティスについて執筆しました'
pubDate: 2024-09-20
publication: 'Tech Blog Magazine'
articleUrl: 'https://techblog.example.com/modern-frontend-best-practices'
---

Tech Blog Magazineに、モダンなフロントエンド開発のベストプラクティスについて寄稿しました。
```

## 🧞 開発・ビルド

```bash
# 開発サーバー起動
pnpm dev

# 本番ビルド
pnpm build

# プレビュー
pnpm preview
```

## 📋 完成した機能

### ✅ 実装済み機能
- [x] 登壇情報の管理・表示
- [x] 執筆記事の管理・表示
- [x] プロフィールページ
- [x] ダークモードデザイン
- [x] レスポンシブレイアウト
- [x] タイプセーフなContent Collections
- [x] SEO最適化
- [x] アイコン設定

### 🎯 カスタマイズポイント
- サイト情報の変更 (`src/consts.ts`)
- カラーテーマの調整 (`src/styles/global.css`)
- ソーシャルリンクの変更 (`src/components/Header.astro`)
- コンテンツの追加 (`src/content/talks/`, `src/content/writings/`)

## 🚀 デプロイ

GitHub Pagesやその他のホスティングサービスにデプロイ可能。
詳細は [README.md](./README.md) を参照。

## 📚 参考資料

- [Astro公式ドキュメント](https://docs.astro.build/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [ダークモード詳細](./DARK_MODE.md)

---

このガイドに従って、登壇・執筆活動を中心とした個人ブログサイトが完成します。