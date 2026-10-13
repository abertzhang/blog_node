// JWT 鉴权中间件
//
// requireAuth：校验 Authorization: Bearer <token>，通过则把解析出的用户信息挂到 req.user
// requireAdmin：在 requireAuth 之后，进一步校验角色为 admin

import { verifyToken } from "../jwt.js";

/// 要求已登录；未携带/无效 token 返回 401
/// @param {import("express").Request} req
/// @param {import("express").Response} res
/// @param {import("express").NextFunction} next
export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "未登录：缺少 Bearer token" });
  }
  const token = header.slice(7).trim();
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ error: "token 无效或已过期" });
  }
}

/// 要求管理员权限（需配合 requireAuth 使用）
/// @param {import("express").Request} req
/// @param {import("express").Response} res
/// @param {import("express").NextFunction} next
export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "需要管理员权限" });
  }
  next();
}
