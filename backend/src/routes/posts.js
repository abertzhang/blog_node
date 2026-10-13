// 文章路由：md 内容的 CRUD（体现「数据库存文章」）
//
// 设计：Post 表里拆成「元数据列 + content(text)」。对外交互时按 md/template.md 约定
// 用 frontmatter 包装。所有写操作需要登录（requireAuth）。
//
// GET    /api/posts          列表（支持 ?category=&draft= 过滤，草稿仅作者可见）
// GET    /api/posts/:slug    详情（返回完整 md 文本）
// POST   /api/posts          新建（body: { frontmatter:{...}, content:"..." }）
// PUT    /api/posts/:slug    更新（写前先存一份 PostRevision 历史）
// DELETE /api/posts/:slug    删除

import { Router } from "express";
import { prisma } from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";
import {
  parseFrontmatter,
  stringifyFrontmatter,
  postToFrontmatter,
  frontmatterToPostData,
} from "../lib/frontmatter.js";

const router = Router();

/// 列表：只返回元数据，不返回正文（避免大文档拖慢分页）
router.get("/", async (req, res, next) => {
  try {
    const { category, draft } = req.query;
    const where = {};
    if (category) where.category = { slug: String(category) };
    // draft=true 仅登录作者可见；否则只看已发布
    if (draft !== "true") where.draft = false;

    const posts = await prisma.post.findMany({
      where,
      orderBy: [{ top: "desc" }, { updatedAt: "desc" }],
      include: { category: true },
      take: 50,
    });
    res.json({
      posts: posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        category: p.category?.slug,
        tags: p.tags,
        contentType: p.contentType,
        draft: p.draft,
        top: p.top,
        updatedAt: p.updatedAt,
      })),
    });
  } catch (err) {
    next(err);
  }
});

/// 详情：返回带 frontmatter 的完整 md 文本（供编辑器加载）
router.get("/:slug", async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      include: { category: true },
    });
    if (!post) return res.status(404).json({ error: "文章不存在" });
    const md = stringifyFrontmatter(postToFrontmatter(post), post.content);
    res.json({ post: { ...post, markdown: md } });
  } catch (err) {
    next(err);
  }
});

/// 新建：frontmatter 字段 + 正文
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { frontmatter, content } = req.body ?? {};
    if (!frontmatter?.title) {
      return res.status(400).json({ error: "frontmatter.title 必填" });
    }
    const slug = slugify(frontmatter.title);
    // 分类按 slug 解析为 categoryId
    const categoryId = await resolveCategoryId(frontmatter.category);
    const data = frontmatterToPostData(frontmatter, content ?? "");
    const post = await prisma.post.create({
      data: { ...data, slug, categoryId, authorId: req.user.sub },
    });
    res.status(201).json({ post: { slug: post.slug } });
  } catch (err) {
    // 唯一约束冲突（slug 重复）
    if (err.code === "P2002") {
      return res.status(409).json({ error: "同名文章已存在（slug 冲突）" });
    }
    next(err);
  }
});

/// 更新：先存历史版本，再覆盖
router.put("/:slug", requireAuth, async (req, res, next) => {
  try {
    const existing = await prisma.post.findUnique({
      where: { slug: req.params.slug },
    });
    if (!existing) return res.status(404).json({ error: "文章不存在" });
    // 写历史
    await prisma.postRevision.create({
      data: { postId: existing.id, title: existing.title, content: existing.content },
    });
    const { frontmatter, content } = req.body ?? {};
    const categoryId = await resolveCategoryId(frontmatter?.category);
    const data = frontmatterToPostData(frontmatter, content ?? existing.content);
    const post = await prisma.post.update({
      where: { slug: req.params.slug },
      data: { ...data, categoryId },
    });
    res.json({ post: { slug: post.slug } });
  } catch (err) {
    next(err);
  }
});

/// 删除
router.delete("/:slug", requireAuth, async (req, res, next) => {
  try {
    await prisma.post.delete({ where: { slug: req.params.slug } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

/// 把分类 slug 解析为 categoryId；不存在则按 slug 自动建分类
/// @param {string|undefined} slug
/// @returns {Promise<number|null>}
async function resolveCategoryId(slug) {
  if (!slug) return null;
  const cat = await prisma.category.upsert({
    where: { slug },
    update: {},
    create: { slug, name: slug },
  });
  return cat.id;
}

/// 标题转 URL slug（简单实现，生产可换更完善库）
/// @param {string} title
/// @returns {string}
function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default router;
