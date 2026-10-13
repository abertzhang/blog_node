// 认证路由：注册 / 登录 / 获取当前用户
//
// POST /api/auth/register  邮箱+密码注册，返回 JWT
// POST /api/auth/login     邮箱+密码登录，返回 JWT
// GET  /api/auth/me        需登录，返回当前用户信息
//
// 密码用 bcrypt 哈希存储，绝不落库明文；token 用 jsonwebtoken 签发。

import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma.js";
import { signToken } from "../jwt.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

/// 注册
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, name } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ error: "email 与 password 必填" });
    }
    const existed = await prisma.user.findUnique({ where: { email } });
    if (existed) {
      return res.status(409).json({ error: "邮箱已注册" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash, name },
    });
    return res.status(201).json({
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    next(err);
  }
});

/// 登录
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "邮箱或密码错误" });
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "邮箱或密码错误" });
    }
    return res.json({
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    next(err);
  }
});

/// 当前登录用户
router.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.sub } });
  if (!user) return res.status(404).json({ error: "用户不存在" });
  res.json({ user: publicUser(user) });
});

/// 去掉敏感字段，只返回安全信息
/// @param {import("@prisma/client").User} u
function publicUser(u) {
  return { id: u.id, email: u.email, name: u.name, role: u.role };
}

export default router;
