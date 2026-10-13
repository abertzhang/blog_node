// frontmatter 解析/序列化工具
//
// 文章在数据库里拆成「元数据列 + 正文 text」。对外（编辑/导出）时按用户约定的模板
// 拼回 `--- yaml ---` 形式。解析用 js-yaml，比手写正则稳健。
//
// 类型约定（与 md/template.md 对齐）：
//   top:   1/0  数字  →  Boolean（1/'1'/true 都算置顶）
//   create/update: 纯日期 YYYY-MM-DD → createdAt/updatedAt（补零点避免时区歧义）

import yaml from "js-yaml";

/// 从完整 md 文本拆出 frontmatter 对象与正文
/// @param {string} raw
/// @returns {{data:Record<string,any>, body:string}}
export function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const data = yaml.load(m[1]) || {};
  return { data, body: raw.slice(m[0].length) };
}

/// 把 frontmatter 对象与正文拼回完整 md 文本
/// @param {Record<string,any>} data
/// @param {string} body
/// @returns {string}
export function stringifyFrontmatter(data, body) {
  return `---\n${yaml.dump(data, { lineWidth: -1 })}---\n\n${body}`;
}

/// 将数据库 Post 行映射为对外 frontmatter 对象（用于导出/编辑回显）
/// @param {import("@prisma/client").Post} post
/// @returns {Record<string,any>}
export function postToFrontmatter(post) {
  return {
    title: post.title,
    create: formatDate(post.createdAt),
    update: formatDate(post.updatedAt),
    category: post.category ? post.category.slug : undefined,
    tags: post.tags ?? [],
    summary: post.summary ?? "",
    top: post.top ? 1 : 0,
    copyright: post.copyright,
    draft: post.draft,
    contentType: post.contentType,
  };
}

/// 将请求体（含 frontmatter 字段）规整为 Post 写入数据
/// @param {Record<string,any>} fm 前端提交的 frontmatter 字段
/// @param {string} body 正文
/// @returns {object} 可直接用于 prisma.post.create/update 的 data
export function frontmatterToPostData(fm, body) {
  return {
    title: fm.title,
    summary: fm.summary || null,
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    content: body,
    contentType: fm.contentType || "post",
    draft: Boolean(fm.draft),
    // top 兼容数字 1/字符串 '1'/布尔
    top: fm.top === 1 || fm.top === "1" || fm.top === true,
    copyright: fm.copyright !== false,
    // 纯日期补零点，避免 new Date('2026-10-04') 被当成本地时区解析
    createdAt: fm.create ? new Date(`${fm.create}T00:00:00Z`) : undefined,
    updatedAt: fm.update ? new Date(`${fm.update}T00:00:00Z`) : undefined,
  };
}

/// 把 Date 格式化为纯日期 YYYY-MM-DD（用于 frontmatter.create/update）
/// @param {Date} d
/// @returns {string}
function formatDate(d) {
  if (!d) return undefined;
  return d.toISOString().slice(0, 10);
}
