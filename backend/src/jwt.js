// JWT 工具：签发与校验
//
// 使用 jsonwebtoken。密钥来自环境变量 JWT_SECRET，生产环境务必替换为强随机值。
// token 载荷只放非敏感字段（id/email/role），密码绝不进 token。

import jwt from "jsonwebtoken";

// 开发期兜底密钥，仅本地方便；生产必须由环境变量提供
const SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/// 为用户签发 JWT（登录/注册成功后调用）
/// @param {{id:number, email:string, role:string}} user
/// @returns {string} token
export function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: EXPIRES_IN }
  );
}

/// 校验 token，失败抛错由调用方处理
/// @param {string} token
/// @returns {{sub:number, email:string, role:string}}
export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
