# 博客后端设计：md 在线编辑 + 分类 + 前端技术栈

> 结论先行：**PostgreSQL 存元数据（Prisma ORM）+ Cloudflare R2 存 md 正文**。
> 原计划的「磁盘存正文」在 Openship Cloud 上不可行，原因见第1 节。

---

## 0. ORM 选型：Prisma（已定）

用户 2026-10-08 明确指定使用 **Prisma** 作为 ORM。

⚠️ **本节 DDL 是「逻辑模型」而非可直接执行的最终迁移**。Prisma Migrate 不管理触发器、
函数、表达式索引，第 5.2 节末尾的 PL/pgSQL 触发器与 `tsvector` 索引必须以手写 SQL
补充进迁移文件。落地时的两种路径见文末「第 10 节」。

### Prisma 7.x 配置要点（与网上 5.x/6.x 教程完全不同）

```ts
// backend/prisma.config.ts —— datasource url 在这里，不在 schema.prisma
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "tsx ./prisma/seed.ts" },
  datasource: { url: env("DATABASE_URL") },
});
```

```prisma
// backend/prisma/schema.prisma
generator client {
  provider = "prisma-client"       // 注意：不是 prisma-client-js
  output   = "../src/generated/prisma"   // output 必填
}

datasource db {
  provider = "postgresql"           // url 由 prisma.config.ts 提供
}
```

```ts
// client 从生成路径 import，不是 @prisma/client
import { PrismaClient } from "../generated/prisma/client.js";
```

要点：
- Prisma CLI **不自动加载 `.env`**，需 `import "dotenv/config"`
- 版本锚点：`@prisma/client@7.10.0`（最新稳定）。`prisma` 有 8.0.0-rc，**RC 不用于生产**
- `prisma` 与 `@prisma/client` 版本需对齐
- 开发用 `prisma migrate dev`，生产用 `prisma migrate deploy`，**不用 `db push` 上生产**
- `posts.frontmatter` 的 JSONB 在 Prisma 侧对应 `Json` 类型
- 生成的client 建议产出到 `src/generated/`，配合 pnpm monorepo 更好管理

---

## 1. 为什么不能把 md 放磁盘（重要约束）

你最初选择「数据库存元数据 + 磁盘存正文」，但部署目标是 **Openship Cloud**，
而官方文档明确写着：

> **Openship Cloud has no volumes.** A declared path is reported and skipped there;
> use object storage.
> —— openship.io/docs/guides/persistent-storage

每次部署都会用全新容器替换旧容器，昨天写入磁盘的文件今天就没了。
所以在 Cloud 上，正文只有三个可行去处：

| 方案 | 可行性 |
|---|---|
| 容器本地磁盘 | ❌ 每次部署丢失 |
| Openship volumes（持久卷） | ❌ Cloud 不支持（自托管 VPS 才行） |
| **S3 兼容对象存储** | ✅ Cloud 原生支持，官方推荐 |

**Cloudflare R2 就是 S3 兼容的**，官方文档明确列为可选 provider，且**零出网流量费**——
对博客这种「文件只读、流量大」的场景是最优选。免费额度 10GB-月存储 + 100万次 Class A + 1000万次 Class B 操作。

---

## 2. 整体架构

```
┌─────────────────────────────────────────────────────────┐
│  前端 web（Next.js 16）                │
│  · 列表页/详情页（Server Component 直读 PG）              │
│  · 管理页 /admin/posts（编辑器写库+写 R2）│
└───────────────┬─────────────────────────────────────────┘
                │ HTTP  /api/*
┌───────────────▼─────────────────────────────────────────┐
│  后端 backend（Express 4）                             │
│  · 文章 CRUD：frontmatter ↔ PG，正文 ↔ R2               │
│  · 分类管理· 封面图上传 presigned URL                    │
└────┬──────────────────────────────┬────────────────────┘
     │ Prisma                        │ @aws-sdk/client-s3
┌────▼─────────────┐        ┌───────▼──────────────────────┐
│   PostgreSQL     │        │    Cloudflare R2              │
│   posts/categories│       │   posts/2026/10/slug.md        │
│   /tags/users     │        │   covers/2026/10/xxx.webp     │
└──────────────────┘        └───────────────────────────────┘
```

**关键设计**：列表页/详情页的数据来自 PG，**正文除外**。
列表查询永远不碰 284KB 的正文，这是长文档场景的核心要求。

---

## 3. 数据库选型：PostgreSQL

| 维度 | 评价 |
|---|---|
| 与 Express 契合 | ✅Node.js 生态最成熟的 PG 驱动（`pg` + Prisma） |
| JSONB | ✅ frontmatter 里塞任何自定义字段，无需改表结构 |
| 全文检索 | ✅ `tsvector` + GIN 索引，中文可用 `pg_jieba` 或分词表|
| Openship 支持 | ✅ catalog 里 `postgres` 一键安装，走私网连接 |
| 分类查询 | ✅ 外键 + 索引，比 SQLite 的字符串匹配快一个量级 |

SQLite 的致命问题：并发写锁 + **Openship Cloud 无持久卷**，重启即丢库。

---

## 4. md 正文存储方案

### 4.1 R2 对象 key 规范

```
posts/<YYYY>/<MM>/<slug>.md          正文（含frontmatter）
covers/<YYYY>/<MM>/<uuid>.webp       封面图
```

- **按年月分目录**：单目录对象数过多会拖慢 S3 列举性能
- **用 slug 而非自增 id**：文件名可读，导出备份时人眼能认
- **扩展名固定 `.md`**：即使 S3 上没有 Content-Type，也知道怎么渲染

### 4.2 正文是否含 frontmatter？

**含**。R2 里的对象是**完整可用的 markdown 文件**，可直接下载、可用任意编辑器打开。

frontmatter 同时也冗余存一份在 PG 里（`frontmatter` JSONB 列）。
这是**有意为之的冗余**，用于：
- 列表页/搜索只用 PG，不回源R2（性能）
- 改分类、改标题这类「只动元数据」的操作不用重写对象
- 以 PG 为准，避免两边不一致

**冲突处理**：以 PG 为唯一事实源。每次编辑都是「写 PG → 同步生成新的完整 md 上传 R2」，R2 永远是被覆盖的派生物。这样不会出现「改了数据库但文件没改」的漂移。

---

## 5. 数据库表设计

### 5.1 ER 概览

```
categories ──1:N──► posts ──N:M──► tags
   │                    │
   │1:N                 │ 1:1
   ▼                    ▼
 nav_items          revisions（历史版本，可选）
```

### 5.2 完整 DDL

```sql
-- ============ 分类 ============
CREATE TABLE categories (
  id          SERIAL PRIMARY KEY,
  slug        VARCHAR(64)  NOT NULL UNIQUE,      -- URL 标识，如 flutter
  name        VARCHAR(64)  NOT NULL,             -- 显示名，如 "Flutter"
  description VARCHAR(255),                      -- 分类简介
  color       VARCHAR(16),                      -- 主题色 #RRGGBB，用于前端标签
  icon        VARCHAR(64),                      -- 图标名（lucide-react）
  sort_order  INTEGER      NOT NULL DEFAULT 0,   -- 侧边栏排序，越小越前
  post_count  INTEGER      NOT NULL DEFAULT 0,   -- 冗余计数，避免 COUNT 查询
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_categories_sort ON categories(sort_order, slug);
CREATE INDEX idx_categories_slug ON categories(slug);

-- ============ 标签（可选，比分类更细粒度）============
CREATE TABLE tags (
  id         SERIAL PRIMARY KEY,
  slug       VARCHAR(64)  NOT NULL UNIQUE,
  name       VARCHAR(64)  NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE post_tags (
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id  INTEGER NOT NULL REFERENCES tags(id)  ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_post_tags_tag ON post_tags(tag_id);

-- ============ 文章 ============
CREATE TABLE posts (
  id            SERIAL PRIMARY KEY,
  slug          VARCHAR(160) NOT NULL UNIQUE,   -- URL 标识，如 "nextjs-16-guide"

  -- frontmatter 冗余字段（用于列表/筛选，避免回源 R2）
  title         VARCHAR(255) NOT NULL,
  summary       VARCHAR(500),                   -- 摘要，列表页展示
  category_id   INTEGER      REFERENCES categories(id) ON DELETE SET NULL,

  -- 文档形态区分（用户明确要求长文+短文混合）
  content_type  VARCHAR(16)  NOT NULL DEFAULT 'post'
                CHECK (content_type IN ('post','doc','note')),
                                     -- post=常规博客  doc=长文档(>50KB)  note=片段

  status        VARCHAR(16)  NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft','published','archived')),
  is_top        BOOLEAN      NOT NULL DEFAULT false,  -- 置顶

  -- 封面
  cover_key     VARCHAR(512),                   -- R2 对象 key，如 covers/2026/10/xxx.webp
  cover_url     TEXT,                           -- 冗余完整 URL（CDN 域名拼好）

  -- 正文位置：只存 key，不存内容
  content_key   VARCHAR(512)  NOT NULL,         -- posts/2026/10/nextjs-16-guide.md
  content_size  INTEGER,                        -- 字节数，用于列表页显示体积
  content_hash  VARCHAR(64),                    -- SHA256，检测 R2 与 PG 是否漂移

  -- 完整 frontmatter（JSONB，容纳任意自定义字段）
  frontmatter   JSONB        NOT NULL DEFAULT '{}'::jsonb,

  -- 冗余的正文纯文本（去 markdown 语法），用于全文搜索与摘要生成
  search_text   TEXT,
  search_tsv    TSVECTOR,

  -- 统计
  view_count    INTEGER      NOT NULL DEFAULT 0,
  word_count    INTEGER      NOT NULL DEFAULT 0,

  published_at  TIMESTAMPTZ,                    -- 首次发布时间
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),

  CONSTRAINT posts_published_at_check
    CHECK (status <> 'published' OR published_at IS NOT NULL)
);

-- slug 索引（唯一查询）
CREATE INDEX idx_posts_slug ON posts(slug);

-- 核心查询：按分类 + 状态 + 发布时间倒序（列表页）
CREATE INDEX idx_posts_listing ON posts(status, category_id, published_at DESC);

-- 置顶文章优先
CREATE INDEX idx_posts_top ON posts(is_top DESC, published_at DESC)
  WHERE status = 'published';

-- 全文检索
CREATE INDEX idx_posts_tsv ON posts USING GIN(search_tsv);

-- JSONB GIN：frontmatter 里任意字段可查（如 drafts、series）
CREATE INDEX idx_posts_frontmatter ON posts USING GIN(frontmatter jsonb_path_ops);

-- 内容形态 + 更新时间（后台管理列表）
CREATE INDEX idx_posts_updated ON posts(updated_at DESC);

-- ============ 历史版本（强烈建议）============
-- 284KB 的长文档被误覆盖/误删时，没有版本历史等于数据丢失
CREATE TABLE post_revisions (
  id           BIGSERIAL PRIMARY KEY,
  post_id      INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  revision_no  INTEGER NOT NULL,
  title        VARCHAR(255) NOT NULL,
  frontmatter  JSONB       NOT NULL,
  content_key  VARCHAR(512) NOT NULL,           -- 该版本的 md 快照对象 key
  content_hash VARCHAR(64),
  note         VARCHAR(255),                   -- 这次改了什么
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (post_id, revision_no)
);

CREATE INDEX idx_revisions_post ON post_revisions(post_id, revision_no DESC);

-- ============ 用户（管理端登录）============
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,          -- bcrypt/argon2，禁止明文
  display_name  VARCHAR(64),
  role          VARCHAR(16) NOT NULL DEFAULT 'admin'
                CHECK (role IN ('admin','editor')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login_at TIMESTAMPTZ
);

-- ============ 触发器：自动维护 updated_at 与 post_count ============
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_posts_updated
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- 发布/取消发布时同步分类计数
CREATE OR REPLACE FUNCTION sync_post_count() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'DELETE' THEN
    UPDATE categories SET post_count = (
      SELECT count(*) FROM posts
      WHERE category_id = COALESCE(NEW.category_id, OLD.category_id)
        AND status = 'published'
    ) WHERE id = COALESCE(NEW.category_id, OLD.category_id);
  ELSIF NEW.status = 'published' AND OLD.status IS DISTINCT FROM 'published' THEN
    -- 从草稿变发布，或换分类，两边都要重算
    UPDATE categories SET post_count = (
      SELECT count(*) FROM posts WHERE category_id = NEW.category_id
        AND status = 'published'
    ) WHERE id = NEW.category_id;
    IF OLD.category_id IS DISTINCT FROM NEW.category_id THEN
      UPDATE categories SET post_count = (
        SELECT count(*) FROM posts WHERE category_id = OLD.category_id
          AND status = 'published'
      ) WHERE id = OLD.category_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_post_count
  AFTER INSERT OR UPDATE OR DELETE ON posts
  FOR EACH ROW EXECUTE FUNCTION sync_post_count();
```

### 5.3 关键设计说明

**为什么 `frontmatter` 用 JSONB 而不是拆成几十个列？**
博客 frontmatter 字段会不断演进（加 `series`、`draft`、`canonical_url`…）。
JSONB 让新增字段零迁移，同时 `jsonb_path_ops` GIN 索引保证仍可查询。

**为什么 `published_at` 与 `created_at` 分离？**
草稿期 `created_at` 记录建档时间，`published_at` 记录首次上线时间。
列表页排序用 `published_at`，否则同一批草稿会挤占时间线。

**`content_hash` 干什么？**
存 R2 对象的 SHA256。每次读取时可选比对，检测「PG 说已更新但 R2 还是旧文件」的不一致。
配合定时任务可以自动修复。

**为什么 `search_text` 冗余存正文纯文本？**
PG 的 `tsvector` 中文分词需要预处理，去掉 markdown 语法后的纯文本才能正确切词。
代价是磁盘翻倍（284KB 文档 →约 250KB 纯文本），但换来原生全文检索能力。

---

## 6. md 与数据库的双向同步

### 6.1 frontmatter schema

```yaml
---
title: Next.js 16 学习文档
slug: nextjs-16-guide
category: nextjs# 对应 categories.slug
tags: [nextjs, react, typescript]
summary: 基于官方中文文档整理的 Next.js 16 完整学习资料
cover: covers/2026/10/nextjs-16.webp
date: 2026-10-08T12:00:00Z
updated: 2026-10-08T12:00:00Z
contentType: doc                     # post | doc | note
draft: false
top: false
series: Next.js 16 专题               # 可选：系列归属
seriesOrder: 1# 可选：系列内顺序
canonicalUrl: https://nextjs.org/docs# 可选：转载来源
---
```

> `category` 用 **slug 字符串**而非数字 ID —— 让人手写 frontmatter 时可读、可迁移，
> 后端写入时负责把 slug 解析成 `posts.category_id`。

### 6.2 编辑保存流程

```
POST/PUT /api/posts/:id
  ↓
① 校验 frontmatter（Zod）→ 缺失字段给默认值
② category slug → 查 category_id（不存在则自动创建分类）
③ 计算 content_hash + word_count + search_tsv
④ 事务内：写 posts（PG）
   └─ 同时写 post_revisions（历史快照）★
⑤ 生成完整 markdown（frontmatter + 正文）→ 上传/覆盖 R2
   └─失败则回滚 PG（⑤失败必须删掉 ④ 的记录）
⑥ 返回新版本号
```

★ 对 284KB 的长文档，**历史版本不是可选项而是必需品**——
一次误操作整篇就没了，且 md 不在 git 里无法 `git checkout` 找回。

### 6.3 导入现有 md

你现在有 `md/nextjs.md`（284KB，**无 frontmatter**）。导入脚本需要：
1. 检测缺失的 frontmatter 并补上（标题从 `# Next.js 16 学习文档` 提取）
2. 按 284KB 体积判定 `contentType: 'doc'`
3. 推断分类为 `nextjs`
4. 上传 R2 + 写 PG

---

## 7. API 设计

```
#公开读（无需鉴权）
GET    /api/posts?category=flutter&page=1&pageSize=20&type=post
       → 只返回元数据，不含正文（列表页）
GET    /api/posts/:slug              → 含正文（R2 回源）
GET    /api/categories                → 分类列表 + 计数

# 管理端（需 JWT 鉴权）
POST   /api/posts                创建
PUT    /api/posts/:id                  更新（含 frontmatter + 正文）
DELETE /api/posts/:id                  删除（软删除 status='archived'）
POST   /api/posts/:id/publish发布
GET    /api/posts/:id/revisions       版本历史
POST   /api/posts/:id/restore/:rev    回滚到指定版本
POST   /api/uploads/presign           获取封面图 presigned URL
POST   /api/categories                新增分类
PUT    /api/categories/:id            改名/改色/改排序
POST   /api/auth/login                登录
```

**列表接口绝不带正文** —— 20 篇文章 × 284KB = 5.7MB，分页就没意义了。

---

## 8. Cloudflare R2 配置步骤

```bash
# 1. 建桶（Cloudflare Dashboard → R2 Object Storage → Create bucket）
#    名称如 blog-content，Public Access 保持关闭

# 2. 生成密钥（R2 → Manage R2 API Tokens → Create Account API token）
#    Permissions: Object Read & Write
#    Scope: Apply to specific buckets only → 只选 blog-content

# 3. 在 Openship Dashboard 配置（Configuration → Object storage → Connect）
#    Choose: external provider
#    Endpoint:      https://<你的account-id>.r2.cloudflarestorage.com
#    Region:        auto                ← R2 固定用 auto
#    Bucket:        blog-content
#    Access Key:    （上一步复制的）
#    Secret Key:    （上一步复制的）
#    点Test & connect —— Openship 会写一个临时对象验证再保存

# 4. 记下自动注入的变量名，backend 读取：
#    S3_ENDPOINT / S3_REGION / S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY / S3_BUCKET
```

**R2 特定注意点**：
- Region 必须写 `auto`，不是 `us-east-1`
- Endpoint **不要**带 bucket 名，也不要用自定义域名
- `forcePathStyle: true`（R2 的 path-style 用`endpoint/bucket/key`）
- 免费额度：10 GB-月存储、出网零费用

---

## 9. 实施顺序建议

| 阶段 | 内容 | 产出 |
|---|---|---|
| 1 | 建PG（Openship catalog）+ 装 Prisma 7 | `schema.prisma`、`prisma.config.ts` |
| 2 | 写 `schema.prisma` 模型，`prisma migrate dev` 生成迁移，再补手写 SQL | 迁移文件 + 触发器 |
| 3 | 接R2，写 Storage 抽象层 | `storage/` 模块，两实现（local / R2）|
| 4 | 文章 CRUD API + frontmatter 解析 | `/api/posts/*` |
| 5 | 导入脚本，把 `md/nextjs.md` 灌进去 | 带frontmatter 的 md |
| 6 | 前端管理页编辑器（CodeMirror/Milkdown） | `/admin/posts` |
| 7 | 分类管理页 | `/admin/categories` |

**Storage 抽象层建议**：本地开发用 `./storage/md/` 目录（免配R2），
生产用 R2，通过环境变量 `STORAGE_DRIVER=local\|s3` 切换。
同一份代码两处都能跑，CI 里也不用mock。

---

## 10. Prisma 落地：DDL 冲突如何处理

第 5.2 节给的是**手写原生 DDL**，但 ORM 已定为 Prisma，两者有一处必须处理的冲突。

### 冲突点：Prisma Migrate 不支持的东西

Prisma Migrate 只做**模型 → 表结构**的同步，无法表达以下三类 PostgreSQL 专有特性：

| DDL 里的内容 | Prisma Migrate 能否管理 |
|---|---|
| 表、列、外键、唯一约束 | ✅ 能 |
| `post_count` / `updated_at` 的 PL/pgSQL **触发器** | ❌ 不能 |
| `search_tsv` **TSVECTOR 列 + GIN 索引** | ❌ 不能（表达式索引不支持）|
| `jsonb_path_ops` GIN 索引 | ❌ 不能（索引方法不支持）|

### 方案 A（推荐）：Prisma 主导 + 手写 SQL 补差

1. 在 `schema.prisma` 写全部模型，标注数据库专有特性（用 `///` 注释说明）：
   ```prisma
   model Post {
     idInt      Int      @id @default(autoincrement())
     /// JSONB 存储完整 frontmatter，GIN 索引需手写 SQL 补充
     frontmatter Json    @default("{}")
     /// 纯文本，供全文检索；tsvector 由手写 SQL 维护
     searchText  String?
   }
   ```
2. `npx prisma migrate dev --name init` 生成基础迁移
3. **手工编辑生成的迁移文件**，追加：
   - `CREATE FUNCTION` + `CREATE TRIGGER`（自动维护 `post_count`、`updated_at`）
   - `ALTER TABLE posts ADD COLUMN search_tsv TSVECTOR` + `GIN` 索引
   - `jsonb_path_ops` GIN 索引
4. 触发器里维护 `search_tsv` 时，用 `to_tsvector('simple', NEW.search_text)`
   （中文分词需另配 `pg_jieba`，见第 5.3 节说明）

**优点**：表结构有单一事实源，后续改模型继续走 `migrate dev`，触发器作为补丁稳定存在。
**代价**：迁移文件是「生成 + 人工编辑」的混合产物，改模型时要留意别覆盖掉手写部分。

### 方案 B：SQL 为准，Prisma 只做类型安全查询层

1. 手工执行第 5.2 节 DDL 建表
2. `npx prisma db pull` 反向生成 `schema.prisma`
3. 之后用 Prisma Client 查询，但**不用** `migrate dev`（避免它把手写特性冲掉）

**优点**：完全保留原生 SQL 的表达力，不做混合文件。
**代价**：schema.prisma 是生成物不是手写的，改表得先写 SQL 再 pull，容易漂移。

### `post_count` 的替代实现（可选）

如果不想要触发器，也可以改成 Prisma 层的读时聚合：

```ts
// 不建 post_count 列，列表页用 groupBy 实时算
const counts = await prisma.post.groupBy({
  by: ['categoryId'],
  where: { status: 'published' },
  _count: { _all: true },
});
```

代价是每次分类栏渲染都多一次查询。**博客数据量小，这个代价完全可以接受**，
而且省掉了触发器这个「Prisma 管不了」的部分。同理，`updated_at` 可以用
`@updatedAt` 注解让 Prisma 在应用层自动维护，不需要数据库触发器。

> **建议**：先走上面这条「无触发器」路线（`@updatedAt` + `groupBy`），
> 把 `tsvector` 全文检索作为唯一必须手写 SQL 的部分。等文章量上千再考虑优化。

---

---

## 12. 待你确认的点

1. **R2 bucket 名称**与是否已在 Cloudflare 建好
2. **分类初始清单**：Flutter / Node / Golang / Rust / Next.js / 其他？要不要中文显示名？
3. **是否需要多标签**（tags 表已设计，若只靠分类可砍掉）
4. **要不要评论功能**（当前设计未含）
5. `contentType` 的三个取值命名是否符合你的习惯（post / doc / note）