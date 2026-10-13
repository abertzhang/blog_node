// 分类路由：博客文章的栏目（Flutter / Node / Golang / Rust ...）
//
// GET /api/categories        列表（含文章计数）
// POST /api/categories       新建分类（需登录）

import { Router } from "express";
import { prisma } from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    // 读时聚合计数，避免触发器（Prisma Migrate 不管理触发器）
    const groups = await prisma.post.groupBy({
      by: ["categoryId"],
      _count: { _all: true },
    });
    const countMap = new Map(
      groups.map((g) => [g.categoryId, g._count._all])
    );
    const cats = await prisma.category.findMany({ orderBy: { name: "asc" } });
    res.json({
      categories: cats.map((c) => ({
        slug: c.slug,
        name: c.name,
        postCount: countMap.get(c.id) ?? 0,
      })),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { slug, name } = req.body ?? {};
    if (!slug || !name) {
      return res.status(400).json({ error: "slug 与 name 必填" });
    }
    const cat = await prisma.category.create({ data: { slug, name } });
    res.status(201).json({ category: { slug: cat.slug, name: cat.name } });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "分类 slug 已存在" });
    }
    next(err);
  }
});

export default router;
