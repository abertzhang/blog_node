"use strict";
// packages/shared/src/index.ts
// 博客前后端共享的领域类型与工具函数
// monorepo 的核心价值：类型/常量只定义一次，web（Next.js）与 backend（Express）同时复用，
// 避免前后端各写一份导致字段错位、联调时反复返工。
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
/** 把 ISO 时间格式化为 YYYY-MM-DD
 *  前后端共用同一实现，规避服务器/浏览器时区差异导致的日期错位 */
function formatDate(iso) {
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
