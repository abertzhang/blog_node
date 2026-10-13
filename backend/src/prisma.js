// Prisma 客户端单例
//
// 统一从这里导出 PrismaClient，避免每个模块各自 new 导致连接数膨胀。
// 生成的 client 路径由 prisma.config.ts 的 generator.output 决定（../src/generated/prisma）。

import { PrismaClient } from "./generated/prisma/client.js";

// 全局缓存，开发环境热重载时复用同一连接
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
