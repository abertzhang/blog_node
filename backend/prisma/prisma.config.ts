// Prisma 7 配置文件（替代旧版 schema.prisma 里的 datasource url）
//
// 关键点：
//   - import "dotenv/config" 让 Prisma CLI 自动加载 .env（Prisma 7 不会自动加载）
//   - defineConfig 来自 "prisma/config"
//   - datasource.url 从环境变量 DATABASE_URL 读取
//
// 本地开发：DATABASE_URL=postgresql://root:Zhang1234!@localhost:5432/blog
// Docker 内：DATABASE_URL=postgresql://root:Zhang1234!@postgres:5432/blog

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // schema 位置（相对本文件）
  schema: "prisma/schema.prisma",
  // 迁移配置：开发用 migrate dev，生产用 migrate deploy
  migrations: {
    path: "prisma/migrations",
  },
  // 数据源连接串（必填，来自环境变量）
  datasource: {
    url: env("DATABASE_URL"),
  },
});
