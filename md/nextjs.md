# Next.js 16 学习文档（基于官方中文文档整理）

> **文档来源**：本文档整理自 [Next.js 中文网官方文档](https://next.nodejs.cn/docs/)（对应官方版本 **16.4.0**），共覆盖 422 个官方文档页面、2681 个代码示例。
>
> **适用版本**：Next.js 16.x（App Router 为主线，附 Pages Router 对照）
>
> **前置知识**：HTML、CSS、JavaScript、React 基础
>
> **环境要求**：Node.js **20.9+**、TypeScript **5.1+**

---

## 目录

- [第一部分 · 入门与基础](#第一部分--入门与基础)
  - [1. Next.js 是什么](#1-nextjs-是什么)
  - [2. 安装与项目初始化](#2-安装与项目初始化)
  - [3. 项目结构与文件约定](#3-项目结构与文件约定)
  - [4. 布局与页面](#4-布局与页面)
  - [5. 链接与导航](#5-链接与导航)
  - [6. 路由组与私有文件夹](#6-路由组与私有文件夹)
  - [7. 动态路由段](#7-动态路由段)
  - [8. 并行路由与拦截路由](#8-并行路由与拦截路由)
- [第二部分 · 渲染与组件模型](#第二部分--渲染与组件模型)
  - [9. 服务器组件与客户端组件](#9-服务器组件与客户端组件)
  - [10. RSC Payload 与渲染流程](#10-rsc-payload-与渲染流程)
  - [11. 流式渲染与 Suspense](#11-流式渲染与-suspense)
  - [12. 错误处理与约定文件](#12-错误处理与约定文件)
- [第三部分 · 数据](#第三部分--数据)
  - [13. 获取数据](#13-获取数据)
  - [14. 更新数据与 Server Actions](#14-更新数据与-server-actions)
  - [15. 表单与校验](#15-表单与校验)
  - [16. 路由处理器 Route Handlers](#16-路由处理器-route-handlers)
  - [17. 后端for前端 BFF](#17-后端for前端-bff)
  - [18. 数据安全](#18-数据安全)
- [第四部分 · 缓存](#第四部分--缓存)
  - [19. 四层缓存机制](#19-四层缓存机制)
  - [20. fetch 缓存选项](#20-fetch-缓存选项)
  - [21. 路由段配置](#21-路由段配置)
  - [22. Cache Components 与 use cache](#22-cache-components-与-use-cache)
  - [23. 重新验证 API](#23-重新验证-api)
  - [24. 缓存失效速查矩阵](#24-缓存失效速查矩阵)
  - [25. ISR 增量静态再生](#25-isr-增量静态再生)
- [第五部分 · 导航与请求 API](#第五部分--导航与请求-api)
  - [26. 客户端导航 Hooks](#26-客户端导航-hooks)
  - [27. 重定向与错误中断](#27-重定向与错误中断)
  - [28. 请求 API：cookies / headers](#28-请求-apicookies--headers)
  - [29. NextRequest / NextResponse](#29-nextrequest--nextresponse)
- [第六部分 · 配置](#第六部分--配置)
  - [30. next.config.js 核心配置](#30-nextconfigjs-核心配置)
  - [31. Turbopack 打包器](#31-turbopack-打包器)
  - [32. 内置组件](#32-内置组件)
  - [33. CSS 与样式](#33-css-与样式)
  - [34. 元数据与 SEO](#34-元数据与-seo)
  - [35. 代理 Proxy（原 Middleware）](#35-代理-proxy原-middleware)
- [第七部分 · 实战](#第七部分--实战)
  - [36. 认证](#36-认证)
  - [37. 环境变量](#37-环境变量)
  - [38. 内容安全策略 CSP](#38-内容安全策略-csp)
  - [39. MDX 与国际化](#39-mdx-与国际化)
  - [40. 部署](#40-部署)
  - [41. 自托管](#41-自托管)
  - [42. 测试](#42-测试)
  - [43. 生产检查清单](#43-生产检查清单)
- [第八部分 · 迁移与升级](#第八部分--迁移与升级)
  - [44. 破坏性变更总表](#44-破坏性变更总表)
  - [45. App Router 迁移](#45-app-router-迁移)
  - [46. 从 Vite / CRA 迁移](#46-从-vite--cra-迁移)
  - [47. Codemod 命令清单](#47-codemod-命令清单)
- [第九部分 · 附录](#第九部分--附录)
  - [48. 陷阱速查清单](#48-陷阱速查清单)
  - [49. API 速查表](#49-api-速查表)
  - [50. 学习路径建议](#50-学习路径建议)

---

# 第一部分 · 入门与基础

## 1. Next.js 是什么

Next.js 是一个用于构建**全栈 Web 应用**的 React 框架。你用 React 组件构建界面，Next.js 负责其余的优化工作（打包、编译、路由、缓存、数据获取、代码分割）。

**核心价值：**

| 能力 | 说明 |
|---|---|
| 零配置打包编译 | 自动配置底层工具（默认 Turbopack），无需自己配 webpack/Babel |
| 文件系统路由 | 目录结构即路由表 |
| 服务器组件 | 组件默认在服务端渲染，减少下发给浏览器的 JS |
| 数据获取 | 服务端直接 `fetch`，与数据库同域，无 CORS 问题 |
| 内置优化 | 图片、字体、脚本、SEO 元数据开箱即用 |
| 混合渲染 | 同一应用里静态、动态、流式渲染自由组合 |

### 两套路由：App Router vs Pages Router

| | App Router | Pages Router |
|---|---|---|
| 地位 | **当前推荐** | 原始路由，仍受支持 |
| 组件模型 | React Server Components | 传统 React 组件 |
| 路由方式 | 文件夹 + `page.tsx` | 文件 + `_app.tsx` / `_document.tsx` |
| 数据获取 | 服务端 `fetch` + Server Actions | `getServerSideProps` / `getStaticProps` |
| 缓存 | 四层缓存 + 精细控制 | ISR / 页面级 |
| React 版本 | 内置 React Canary（含全部 React 19 特性） | 使用 `package.json` 安装的版本 |

> ⚠️ **新项目一律用 App Router。** 本文档以 App Router 为主线，Pages Router 仅在迁移章节涉及。

---

## 2. 安装与项目初始化

### 快速开始

```bash
npx create-next-app@latest my-app --yes
cd my-app
npm run dev
```

打开 `http://localhost:3000`。

`--yes` 表示使用已保存的偏好或默认值，默认为：**TypeScript + Tailwind + ESLint + App Router + Turbopack + 导入别名 `@/*`**。

### 四种包管理器等价命令

```bash
# pnpm
pnpm create next-app@latest my-app --yes
cd my-app
pnpm dev

# npm
npx create-next-app@latest my-app --yes
cd my-app
npm run dev

# yarn
yarn create next-app@latest my-app --yes
cd my-app
yarn dev

# bun
bun create next-app@latest my-app --yes
cd my-app
bun dev
```

### 交互式提示

```txt
What is your project named? my-app
Would you like to use the recommended Next.js defaults?
    Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, Turbopack
    No, reuse previous settings
    No, customize settings - Choose your own preferences
```

选择 `customize settings` 后的完整提示：

```txt
Would you like to use TypeScript? No / Yes
Which linter would you like to use? ESLint / Biome / None
Would you like to use React Compiler? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

### 手动安装

```bash
npm i next@latest react@latest react-dom@latest
```

然后在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

> ⚠️ **Turbopack 现在是默认打包工具。** 要用 webpack 需显式传参：`next dev --webpack` 或 `next build --webpack`。
>
> ⚠️ **从 Next.js 16 开始，`next build` 不再自动运行代码检查器。** 需要在 CI 里单独跑 lint，否则代码检查会静默消失。

### 浏览器支持

| 浏览器 | 最低版本 |
|---|---|
| Chrome | 111+ |
| Edge | 111+ |
| Firefox | 111+ |
| Safari | 16.4+ |

### 绝对导入与路径别名

Next.js 内置支持 `tsconfig.json` / `jsconfig.json` 的 `baseUrl` 与 `paths`：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

之后可以这样导入：

```tsx
import Button from '@/components/button'
```

> ⚠️ 每个 `paths` 都相对于 `baseUrl` 位置。

### 代码检查

支持 ESLint 或 Biome，二选一，通过 npm 脚本直接运行。

```bash
# 安装 ESLint
npm i -D eslint eslint-config-next
```

创建 `eslint.config.mjs`（推荐扁平配置）：

```js
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({ baseDirectory: __dirname })

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
]
```

> ⚠️ 从 Next.js 16 起 `next lint` 命令已移除。若之前用过，用codemod 迁移：
>
> ```bash
> npx @next/codemod@canary next-lint-to-eslint-cli .
> ```

### 根布局与首页

根布局是**必需**的，且必须包含 `<html>` 与 `<body>`：

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```tsx
// app/page.tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

> ⚠️ 如果忘记创建根布局，`next dev` 会自动帮你创建。
>
> ⚠️ **不要手动写 `<head>` 标签**（`<title>`、`<meta>` 等），应使用 Metadata API（见第 34 节）。

---

## 3. 项目结构与文件约定

### 顶层文件夹

| 文件夹 | 用途 |
|---|---|
| `app` | 应用路由（App Router） |
| `pages` | 页面路由（Pages Router） |
| `public` | 要提供的静态资源 |
| `src` | 可选应用源文件夹 |

### 顶层文件

| 文件 | 用途 |
|---|---|
| `next.config.js` | Next.js 配置文件 |
| `package.json` | 项目依赖和脚本 |
| `instrumentation.ts` | OpenTelemetry 与 Instrumentation |
| `proxy.ts` | 请求代理（原 `middleware.ts`） |
| `.env` / `.env.local` / `.env.production` / `.env.development` | 环境变量（**不应纳入版本控制**） |
| `eslint.config.mjs` | ESLint 配置 |
| `tsconfig.json` / `jsconfig.json` | TypeScript / JavaScript 配置 |
| `next-env.d.ts` | Next.js 的 TS 声明（**自动生成，不应提交**） |

### 路由文件（文件约定）

| 文件 | 扩展名 | 作用 |
|---|---|---|
| `layout` | `.js` `.jsx` `.tsx` | 布局 |
| `page` | `.js` `.jsx` `.tsx` | 页面 |
| `loading` | `.js` `.jsx` `.tsx` | 加载 UI |
| `not-found` | `.js` `.jsx` `.tsx` | 404 UI |
| `error` | `.js` `.jsx` `.tsx` | 错误边界 |
| `global-error` | `.js` `.jsx` `.tsx` | 全局错误 UI |
| `route` | `.js` `.ts` | API 端点 |
| `template` | `.js` `.jsx` `.tsx` | 重新渲染布局 |
| `default` | `.js` `.jsx` `.tsx` | 并行路由回退页面 |

### 组件层次结构

特殊文件按固定层次渲染：

```text
layout.js
  └─ template.js
      └─ error.js        （错误边界）
          └─ loading.js  （Suspense 边界）
              └─ not-found.js
                  └─ page.js  或嵌套 layout.js
```

组件在嵌套路由中**递归渲染**——路由段的组件嵌套在其父段的组件内。

### 嵌套路由

文件夹定义 URL 段，嵌套文件夹嵌套段。

| 路径 | URL 模式 | 说明 |
|---|---|---|
| `app/layout.tsx` | — | 根布局包含所有路由 |
| `app/blog/layout.tsx` | — | 封装 `/blog` 及其子类 |
| `app/page.tsx` | `/` | 公共路由 |
| `app/blog/page.tsx` | `/blog` | 公共路由 |
| `app/blog/authors/page.tsx` | `/blog/authors` | 公共路由 |

### 元数据文件约定

| 文件 | 扩展名 | 含义 |
|---|---|---|
| `favicon` | `.ico` | Favicon |
| `icon` | `.ico` `.jpg` `.jpeg` `.png` `.svg` | App Icon |
| `apple-icon` | `.jpg` `.jpeg` `.png` | Apple App Icon |
| `opengraph-image` | `.jpg` `.jpeg` `.png` `.gif` | Open Graph 图片 |
| `twitter-image` | `.jpg` `.jpeg` `.png` `.gif` | Twitter 图片 |
| `sitemap` | `.xml` | 站点地图 |
| `robots` | `.txt` | Robots 文件 |

> ⚠️ 在文件夹结构中，**更具体的图片优先于上方的图片**。例如在 `blog` 文件夹放`opengraph-image.jpg` 只影响 `/blog` 路由。

### 组织项目的四种策略

官方给出几种常见组织方式，**选一种并保持一致**即可：

1. **项目文件放在 `app` 之外** — `app/` 纯粹用于路由，代码放根目录的 `components/`、`lib/`
2. **项目文件放在 `app` 内的顶层文件夹** — `app/components/`、`app/lib/`
3. **按功能或路由拆分** — 全局共享代码放根 `app/`，具体代码放各路由段内
4. **`src` 文件夹** — 把 `app` 移到 `src/app`，与配置文件分离

> ⚠️ 官方文档中的 `components` 和 `lib` 是**通用占位符**，没有框架特殊含义，你的项目可以用 `ui/`、`utils/`、`hooks/` 等。

### `src` 文件夹注意事项

把 `app` 移到 `src/app` 即可启用。⚠️ 以下文件**必须留在项目根目录**：

- `public/`
- `package.json`、`next.config.js`、`tsconfig.json` 等配置文件
- `.env.*` 环境变量文件
- **`proxy.ts`（要放在 `src` 内）**

其他易漏点：

- ⚠️ 如果根目录已存在 `app` 或 `pages`，`src/app` / `src/pages` 会被**忽略**
- ⚠️ Tailwind CSS 需在 content 中添加 `/src` 前缀
- ⚠️ `tsconfig.json` 的 `paths` 要包含 `src/`

### `public` 目录

存放静态资源，从基础 URL `/` 开始引用：

```text
public/avatars/me.png   →   /avatars/me.png
```

> ⚠️ Next.js **无法安全缓存** `public` 中的资源（它们可能变化）。
>
> ⚠️ `robots.txt`、`favicon.ico` 等元数据文件应放在 `app` 文件夹用特殊元数据文件约定，而不是 `public`。

---

## 4. 布局与页面

### 布局（`layout.tsx`）

布局在导航间**共享并保留状态**——不会重新渲染。

```tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* 布局 UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

#### Props

| Prop |必需 | 类型 | 说明 |
|---|---|---|---|
| `children` | **是** | `React.ReactNode` | 填充布局所环绕的路由段 |
| `params` | 否 | `Promise<{...}>` | 从根段到该布局的动态路由参数 |

```tsx
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ team: string }>
}) {
  const { team } = await params
}
```

| 路由 | URL | `params` |
|---|---|---|
| `app/dashboard/[team]/layout.js` | `/dashboard/1` | `Promise<{ team: '1' }>` |
| `app/shop/[tag]/[item]/layout.js` | `/shop/1/2` | `Promise<{ tag: '1', item: '2' }>` |
| `app/blog/[...slug]/layout.js` | `/blog/1/2` | `Promise<{ slug: ['1', '2'] }>` |

#### ⚠️ 布局的四个致命限制

> **布局在导航期间会缓存在客户端，且不会重新渲染。** 这带来四个直接后果：

| 想做的事 | ❌ 不能 | ✅ 应该 |
|---|---|---|
| 读请求对象 | 布局拿不到请求 | 在**服务器组件**里用 `headers()` / `cookies()` |
| 读查询参数 | 读不到（会过时） | 用 Page 的 `searchParams` 或 `useSearchParams()` |
| 读当前路径名 | 读不到（会过时） | 客户端组件里用 `usePathname()` |
| 给 children 传数据 | **无法**传递 | 在路由中多次获取同一数据，用 React `cache()` |
| 访问下方路由段 | 无法访问 | 客户端组件里用 `useSelectedLayoutSegment(s)` |

客户端组件中读 `params`（客户端组件不能是 `async`）：

```tsx
'use client'

import { use } from 'react'

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
}
```

#### 多个根布局

任何上方没有 `layout.js` 的布局即为根布局。**必须**删除顶层 `layout.js`，并为每个根布局添加 `<html>` 和 `<body>`。

```tsx
// app/(marketing)/layout.tsx
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#eee' }}>{children}</body>
    </html>
  )
}
```

> ⚠️ **跨多个根布局导航会导致完整页面加载**（不是客户端导航）。
>
> ⚠️ 根布局可以位于动态段下，如 `app/[lang]/layout.js`（i18n 常用）。

### 页面（`page.tsx`）

```tsx
export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <h1>My Page</h1>
}
```

#### Props

| Prop | 类型 | 说明 |
|---|---|---|
| `params` | `Promise<{...}>` | 动态路由段参数 |
| `searchParams` | `Promise<{ [key: string]: string \| string[] \| undefined }>` | URL 查询参数 |

| 示例路由 | URL | `params` |
|---|---|---|
| `app/shop/[slug]/page.js` | `/shop/1` | `Promise<{ slug: '1' }>` |
| `app/shop/[category]/[item]/page.js` | `/shop/1/2` | `Promise<{ category: '1', item: '2' }>` |
| `app/shop/[...slug]/page.js` | `/shop/1/2` | `Promise<{ slug: ['1', '2'] }>` |

| URL | `searchParams` |
|---|---|
| `/shop?a=1` | `Promise<{ a: '1' }>` |
| `/shop?a=1&b=2` | `Promise<{ a: '1', b: '2' }>` |
| `/shop?a=1&a=2` | `Promise<{ a: ['1', '2'] }>` |

> ⚠️ **`params` 与 `searchParams` 都是 Promise**，必须 `await` 或 `use()`。
>
> ⚠️ **`searchParams` 是动态 API**——使用它会让页面在**请求时动态渲染**。
>
> ⚠️ **`searchParams` 是普通 JavaScript 对象，不是 `URLSearchParams` 实例**。

#### `params` 还是 `useSearchParams`？

| 场景 | 用什么 |
|---|---|
| 需要搜索参数**来加载页面数据**（分页、数据库过滤） | Page 的 `searchParams` prop |
| 搜索参数**仅在客户端使用**（过滤已通过 props 加载的列表） | `useSearchParams()` |

#### 类型助手

Next.js 16 新增了自动生成的类型助手，**无需 import**：

```tsx
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const query = await props.searchParams
  return <h1>Blog Post: {slug}</h1>
}
```

```tsx
export default function Layout(props: LayoutProps<'/dashboard'>) {
  return (
    <section>
      {props.children}
      {/* 若有 app/dashboard/@analytics，会作为类型化插槽出现：{props.analytics} */}
    </section>
  )
}
```

> 泛型参数是**字面量路由路径**。类型在 `next dev`、`next build` 或 `next typegen` 期间生成。
>
> ⚠️ 静态路由的 `params` 解析为 `{}`。

### 模板（`template.tsx`）

在布局**之内**渲染，导航时**重新挂载**——与布局的关键区别。

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

| 布局 `layout.tsx` | 模板 `template.tsx` |
|---|---|
| 导航时**保持状态** | 导航时**重新挂载** |
| 是服务端组件 | 默认服务端组件 |
| 不重新渲染 | 重新渲染 |

**适用场景**：导航时重新同步 `useEffect`；重置子客户端组件状态（如表单输入）；改变默认框架行为（布局内的 Suspense 边界只在首次加载显示 fallback，**模板会在每次导航时显示 fallback**）。

⚠️ 在更深段内导航**不会**重新挂载更高级别的模板；⚠️ **搜索参数变化不会触发重新挂载**。

---

## 5. 链接与导航

### 四个导航支柱

1. **服务器渲染** — 分静态（构建时/重新验证时，缓存复用）与动态（请求时）
2. **预取** — 路由进入视口时自动预取
3. **流式** — 边渲染边传输，用户不必等全部完成
4. **客户端转换** — 共享布局保留浏览器状态与 React 状态

### `<Link>` 组件

```tsx
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

#### Props

| Prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| `href` | 字符串或对象 | **必需** | 目标路径或 `{ pathname, query }` |
| `replace` | 布尔 | `false` | `true` 时替换当前历史记录 |
| `scroll` | 布尔 | `true` | 导航到新页面时的滚动行为 |
| `prefetch` | 布尔或 `null` | `"auto"` | 预取策略，见下 |
| `onNavigate` | 函数 | — | 仅在客户端导航期间触发 |

> ⚠️ `<a>` 标签的属性（`className`、`target="_blank"` 等）可直接传给 `<Link>`，会透传到底层 `<a>`。

#### `prefetch` 三个取值

| 值 | 行为 |
|---|---|
| `"auto"` / `null`（**默认**） | 静态路由 → 预取完整路由（含所有数据）；动态路由 → 只预取到最近的 `loading.js` 边界 |
| `true` | 静态与动态路由都预取完整路由 |
| `false` | 进入视口与悬停都不预取 |

预取在组件**进入视口**时发生；⚠️ **预取仅在生产中启用**。

#### `onNavigate` vs `onClick`

| 场景 | `onClick` | `onNavigate` |
|---|---|---|
| Ctrl/Cmd + 点击 | ✅ 执行 | ❌ 不执行 |
| 外部 URL | ✅ | ❌ 仅同源客户端导航 |
| 带 `download` 的链接 | ✅ | ❌ |

#### 滚动行为

`scroll` 默认为 `true`，行为是"保持滚动位置"。Next.js 在管理滚动前会检查每个顶层元素——不可滚动元素、未渲染 HTML 的元素（含 sticky/fixed 定位、不可见元素）会被绕过。

#### 预取期副作用陷阱

非 pure 的 layout/page（副作用如 `trackPageView()`）**会在预取时触发**而非用户访问时：

```tsx
// ❌ 之前—— 预取期间就会运行
import { trackPageView } from '@/lib/analytics'

export default function Layout({ children }: { children: React.ReactNode }) {
  trackPageView()
  return <div>{children}</div>
}
```

```tsx
// ✅ 之后
'use client'

import { useEffect } from 'react'
import { trackPageView } from '@/lib/analytics'

export function AnalyticsTracker() {
  useEffect(() => {
    trackPageView()
  }, [])

  return null
}
```

### 动态段链接

```tsx
import Link from 'next/link'

export default async function Post({ post }) {
  const posts = await getPosts()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

### 预取与缓存对照表

|  |静态页面 | 动态页面 |
|---|---|---|
| 已预取 | 是，完整路由 | 否，除非有 `loading.js` |
| 客户端缓存 TTL | 5 分钟（默认） | 关闭，除非启用 `staleTimes` |
| 点击时服务器往返 | 否 | 是，在 shell 之后流式传输 |

### `useLinkStatus` —— loading 提示的 debounce

慢网络下 `loading.js` 的回退可能来不及显示（因为还没预加载）。用 `useLinkStatus` 做"延迟显示"提示：

```tsx
'use client'

import { useLinkStatus } from 'next/link'

export default function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return (
    <span aria-hidden className={`link-hint ${pending ? 'is-pending' : ''}`} />
  )
}
```

配合 CSS：初始 `opacity: 0`，延迟 100 毫秒后再动画进入。

### 悬停时预取

```tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

function HoverPrefetchLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const [active, setActive] = useState(false)

  return (
    <Link
      href={href}
      prefetch={active ? null : false}
      onMouseEnter={() => setActive(true)}
    >
      {children}
    </Link>
  )
}
```

### 用原生 History API 更新搜索参数

`pushState` / `replaceState` 已集成到 Next.js 路由，与 `usePathname`、`useSearchParams` 同步：

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SortProducts() {
  const searchParams = useSearchParams()

  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortOrder)
    window.history.pushState(null, '', `?${params.toString()}`)
  }

  return (
    <>
      <button onClick={() => updateSorting('asc')}>Sort Ascending</button>
      <button onClick={() => updateSorting('desc')}>Sort Descending</button>
    </>
  )
}
```

### 禁用滚动到顶部

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard', { scroll: false })}>
      Dashboard
    </button>
  )
}
```

### 代理重写下的正确预取

⚠️ 若用 `proxy` 做鉴权重写，需要同时告诉 Next.js"要展示的 URL"和"要预取的 URL"：

```ts
// proxy.ts
import { NextResponse } from 'next/server'

export function proxy(request: Request) {
  const nextUrl = request.nextUrl
  if (nextUrl.pathname === '/dashboard') {
    if (request.cookies.authToken) {
      return NextResponse.rewrite(new URL('/auth/dashboard', request.url))
    } else {
      return NextResponse.rewrite(new URL('/public/dashboard', request.url))
    }
  }
}
```

```tsx
'use client'

import Link from 'next/link'
import useIsAuthed from './hooks/useIsAuthed'

export default function Page() {
  const isAuthed = useIsAuthed()
  const path = isAuthed ? '/auth/dashboard' : '/public/dashboard'
  return (
    <Link as="/dashboard" href={path}>
      Dashboard
    </Link>
  )
}
```

---

## 6. 路由组与私有文件夹

### 路由组 `(folderName)`

用括号包裹文件夹名，表示**仅用于组织，不出现在 URL 路径中**。

| 路径 | URL 模式 | 说明 |
|---|---|---|
| `app/(marketing)/page.tsx` | `/` | URL 中省略的组 |
| `app/(shop)/cart/page.tsx` | `/cart` | 在 `(shop)` 内共享布局 |
| `app/blog/_components/Post.tsx` | — | 不可路由；UI 工具安全位置 |
| `app/blog/_lib/data.ts` | — | 不可路由；工具的安全位置 |

**用例**：

- 按网站版块、意图或团队组织路由（营销页、管理页）
- 在同一路由段级别启用**嵌套布局**（含多个根布局）
- 把特定路由选择到共享布局中

⚠️ **注意事项**：

1. **不同组中的路由不能解析为相同 URL**。`(marketing)/about/page.js` 与 `(shop)/about/page.js` 都解析为 `/about` → **报错**。
2. 用多个根布局但**没有**顶层 `layout.js` 时，必须确保主路由 `/` 在某个路由组中定义。
3. 在**不同根布局**之间导航会触发整页加载。

### 私有文件夹 `_folderName`

前缀下划线表示该文件夹是实现细节，路由系统**完全忽略**。

**四个用途**：

- 分离 UI 逻辑与路由逻辑
- 跨项目一致地组织内部文件
- 编辑器中排序分组
- 避免与未来 Next.js 文件约定命名冲突

> ⚠️ 你可以在文件夹名前加 `%5F`（下划线的 URL 编码）创建以下划线开头的 URL 段：`%5FfolderName`。
>
> ⚠️ 因为 `app` 目录中的文件默认不会被路由，**私有文件夹不是必需的**，但推荐用来避免命名冲突。

---

## 7. 动态路由段

### 三种约定

| 语法 | 含义 | 匹配示例 |
|---|---|---|
| `[folder]` | 单个参数 | `/blog/my-first-post` |
| `[...folder]` | 捕获所有（必需） | `/shop/clothing`、`/shop/clothing/shirts` |
| `[[...folder]]` | 可选捕获所有 | `/docs`、`/docs/layouts-and-pages` |

| 路由 | 示例 URL | `params` |
|---|---|---|
| `app/blog/[slug]/page.js` | `/blog/a` | `{ slug: 'a' }` |
| `app/shop/[...slug]/page.js` | `/shop/a` | `{ slug: ['a'] }` |
| `app/shop/[...slug]/page.js` | `/shop/a/b` | `{ slug: ['a', 'b'] }` |
| `app/shop/[[...slug]]/page.js` | `/shop` | `{ slug: undefined }` |
| `app/shop/[[...slug]]/page.js` | `/shop/a/b` | `{ slug: ['a', 'b'] }` |

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>My Post: {slug}</div>
}
```

### TypeScript 类型

| 路由 | `params` 类型 |
|---|---|
| `app/blog/[slug]/page.js` | `{ slug: string }` |
| `app/shop/[...slug]/page.js` | `{ slug: string[] }` |
| `app/shop/[[...slug]]/page.js` | `{ slug?: string[] }` |
| `app/[categoryId]/[itemId]/page.js` | `{ categoryId: string, itemId: string }` |

需要收窄类型时用**运行时验证**（断言函数）：

```tsx
import { notFound } from 'next/navigation'
import type { Locale } from '@i18n/types'
import { isValidLocale } from '@i18n/utils'

function assertValidLocale(value: string): asserts value is Locale {
  if (!isValidLocale(value)) notFound()
}

export default async function Page(props: PageProps<'/[locale]'>) {
  const { locale } = await props.params // 类型是 string
  assertValidLocale(locale)
  // 现在 locale 的类型收窄为 Locale
}
```

### `generateStaticParams`

```tsx
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // ...
}
```

| 示例路由 | 返回类型 |
|---|---|
| `/product/[id]` | `{ id: string }[]` |
| `/products/[category]/[product]` | `{ category: string, product: string }[]` |
| `/products/[...slug]` | `{ slug: string[] }[]` |

单个动态段：

```tsx
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}
```

**构建时只渲染子集**：

```tsx
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  // 只在构建时渲染前 10 篇
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }))
}

export const dynamicParams = false // 其余全部 404
```

⚠️ **注意事项**：

- **必须返回数组**（即使为空），否则路由会被**动态渲染**
- 要让所有路径在首次访问时静态渲染，返回**空数组**或用 `export const dynamic = 'force-static'`
- 在**重新验证（ISR）期间不会**再次调用 `generateStaticParams`
- 取代了 Pages Router 的 `getStaticPaths`
- ⚠️ **启用 Cache Components 时，`generateStaticParams` 必须至少返回一个参数**，空数组会导致构建错误（`empty-generate-static-params`）

**多层动态段自上而下生成**：

```tsx
// app/products/[category]/[product]/page.js —— 同时生成两段
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then((res) => res.json())

  return products.map((product) => ({
    category: product.category.slug,
    product: product.id,
  }))
}
```

```tsx
// app/products/[category]/layout.js —— 只能生成 [category]
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then((res) => res.json())

  return products.map((product) => ({
    category: product.category.slug,
  }))
}
```

```tsx
// app/products/[category]/[product]/page.js —— 接收父段 params 生成 [product]
export async function generateStaticParams({
  params: { category },
}: {
  params: { category: string }
}) {
  const products = await fetch(
    `https://.../products?category=${category}`
  ).then((res) => res.json())

  return products.map((product) => ({
    product: product.id,
  }))
}
```

> `params` 参数可**同步访问**，且**仅包含父段参数**。

---

## 8. 并行路由与拦截路由

### 并行路由

在同一布局中**同时或有条件**渲染一个或多个页面（仪表盘、社交提要等）。

#### 插槽（Slot）约定

| 约定 | 含义 |
|---|---|
| `@folder` | 命名插槽，作为 prop 传给父布局，**不进 URL** |
| `children` | 隐式插槽，等价于 `app/@children/page.js` |
| `default.js` | 初始加载或整页重载期间**不匹配插槽**的后备 |
| 槽内 `layout` | 让用户**独立导航该插槽**（适合做选项卡组） |

```tsx
export default function Layout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  )
}
```

#### 行为

| 导航类型 | 行为 |
|---|---|
| **软导航**（客户端导航） | 执行**部分渲染**：改变匹配槽内子页面，**保留**其他槽的活动子页面 |
| **硬导航**（刷新/整页加载） | 无法确定不匹配槽的活动状态 → 渲染该槽的 `default.js`；**不存在则渲染 404** |

⚠️ **注意**：

- **插槽不是路由段**，不影响 URL——`/@analytics/views` 的 URL 是 `/views`
- ⚠️ **不能在同一个路由段级别同时拥有独立的 static 槽与 dynamic 槽**——如果一个槽是动态的，**该级别所有槽都必须是动态的**
- ⚠️ **从 Next.js 16 起，并行路由的所有插槽必须显式提供 `default.js`**，否则**构建失败**

#### 条件路由

```tsx
import { checkUserRole } from '@/lib/auth'

export default function Layout({
  user,
  admin,
}: {
  user: React.ReactNode
  admin: React.ReactNode
}) {
  const role = checkUserRole()
  return role === 'admin' ? admin : user
}
```

### 拦截路由

用于**从当前布局内应用的其他部分加载路由**——不切换上下文就展示路由内容。

| 约定 | 匹配 |
|---|---|
| `(.)` | **同一级**的段 |
| `(..)` | **上一级**的段 |
| `(..)(..)` | **上面两级**的段 |
| `(...)` | **根 `app` 目录**中的段 |

> ⚠️ **`(..)` 基于「路由段」而非文件系统**——并行路由中的 `@slot` 文件夹**不计入**。所以在 `@modal` 场景下用 `(..)` 匹配 `photo` 段时，尽管文件系统层级相差两层，`photo` 路由只高出一个段级别。

### 用并行 + 拦截实现模态框

七个步骤：

**1. 建主页面** `app/login/page.tsx`

**2. 在 `@auth` 槽内加返回 `null` 的 `default.js`** — 确保模态不活动时不渲染：

```tsx
// app/@auth/default.tsx
export default function Default() {
  return null
}
```

**3. 拦截 `/login`** — 文件名改为 `/@auth/(.)login/page.tsx`：

```tsx
// app/@auth/(.)login/page.tsx
import { Modal } from '@/app/ui/modal'
import { Login } from '@/app/ui/login'

export default function Page() {
  return (
    <Modal>
      <Login />
    </Modal>
  )
}
```

> 把 `<Modal>` 与模态内容（`<Login>`）分离，可确保模态内的任何内容（例如 forms）是**服务器组件**。

**4. 打开模态** — 把 `@auth` 作为 prop 传给父布局并渲染：

```tsx
// app/layout.tsx
import Link from 'next/link'

export default function Layout({
  auth,
  children,
}: {
  auth: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      <nav>
        <Link href="/login">Open modal</Link>
      </nav>
      <div>{auth}</div>
      <div>{children}</div>
    </>
  )
}
```

用户点击 `<Link>` 会打开模态而非导航；但**刷新或初始加载时访问 `/login` 会看到主登录页**。

**5. 关闭模态** — 用 `router.back()`：

```tsx
'use client'

import { useRouter } from 'next/navigation'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <>
      <button onClick={() => router.back()}>Close modal</button>
      <div>{children}</div>
    </>
  )
}
```

**6. ⚠️ 关闭模态必须让并行槽匹配返回 `null` 的组件**

因为**客户端导航到不再匹配该槽的路由时，槽会保持可见**。所以要建 catch-all：

```tsx
// app/@auth/[...catchAll]/page.tsx
export default function CatchAll() {
  return null
}
```

**7. 并行路由可以独立流式传输**，可分别定义 error 与 loading 状态。

---

# 第二部分 · 渲染与组件模型

## 9. 服务器组件与客户端组件

### 默认模型

**布局和页面默认是服务器组件**（Server Component）。这允许你在服务器上取数据并渲染部分 UI，可选择缓存结果并流式传输到客户端。需要交互性或浏览器 API 时，用**客户端组件**分层。

| 用客户端组件 | 用服务器组件 |
|---|---|
| 状态和事件处理器（`onClick`、`onChange`） | 从靠近源的数据库或 API 获取数据 |
| 生命周期逻辑（`useEffect`） | 使用 API 密钥、令牌等机密信息而不暴露给客户端 |
| 仅限浏览器的 API（`localStorage`、`window`、`Navigator.geolocation`） | 减少发送到浏览器的 JavaScript 数量 |
| 自定义 hooks | 改进 FCP，内容渐进流式传输 |

### `'use client'` 指令

```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

**关键语义**：

- `'use client'` 声明**服务器与客户端模块图之间的边界**
- 一旦文件被标记，**其所有导入和子组件**都视为客户端包的一部分
- ⚠️ **不需要**在每个包含客户端组件的文件中都加 `'use client'`——只需加在"你希望在服务器组件中直接渲染其组件"的文件里

> ⚠️ **传给客户端组件的 props 必须可序列化。** 函数不可序列化：
>
> ```tsx
> 'use client'
>
> export default function Counter({
>   onClick /* ❌ 函数不可序列化 */,
> }) {
>   return <button onClick={onClick}>Increment</button>
> }
> ```

### 交错模式（服务器组件作为 props）

这是 App Router 最关键的模式：**把服务器组件当作 `children` 传给客户端组件**。

```tsx
// ui/modal.tsx —— 客户端组件
'use client'

export default function Modal({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

```tsx
// page.tsx —— 服务器组件，可以直接 import 客户端组件
import Modal from './ui/modal'
import Cart from './ui/cart'

export default function Page() {
  return (
    <Modal>
      <Cart />
    </Modal>
  )
}
```

> ⚠️ **服务器组件的所有内容都会提前在服务器上渲染**，包括作为 props 传入的组件。

### Context Provider 的边界

⚠️ **服务器组件不支持 React 上下文。** 必须在客户端组件中创建接受 `children` 的 Provider：

```tsx
'use client'

import { createContext } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

⚠️ 应该在树中**尽可能深地渲染 Provider** —— 只包裹 `{children}` 而非整个 `<html>`，这让 Next.js 更容易优化服务器组件的静态部分。

### 封装第三方客户端组件（库作者模式）

```tsx
'use client'

import { Carousel } from 'acme-carousel'

export default Carousel
```

### 环境隔离

```tsx
// lib/data.ts
import 'server-only'   // 或 'client-only'
```

⚠️ 在 Next.js 中安装 `server-only` / `client-only` 是**可选的**；Next.js 内部处理这两个包的导入并提供自己的类型声明。使用它们可获得构建时错误提示。

> ⚠️ **环境中毒防护**：只有 `NEXT_PUBLIC_` 前缀的环境变量才会包含在客户端包中；没有前缀的变量 Next.js 会**替换为空字符串**（因此 `getData()` 可在客户端导入执行但不会按预期工作）。

### ⚠️ 打包器可能删除 `"use client"` 指令

某些第三方打包器会剥离指令。给这类库配置：

```ts
// tsup.config.ts
export default {
  esbuildPlugins: [
    {
      name: 'client-directive',
      setup(build) {
        build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
          const contents = await fs.readFile(args.path, 'utf8')
          // 在每个文件顶部插入 'use client'
          return { contents: `'use client';\n${contents}` }
        })
      },
    },
  ],
}
```

---

## 10. RSC Payload 与渲染流程

### 什么是 RSC Payload？

**RSC Payload（React Server Component Payload）** 是渲染的 React Server 组件树的**紧凑二进制表示**。客户端的 React 用它来更新 DOM。

**包含三部分**：

1. Server Components 的渲染结果
2. 客户端组件应渲染位置的占位符 +对其 JavaScript 文件的引用
3. 从服务器组件传递到客户端组件的任何属性

### 五个渲染阶段

**1. 在服务器上进行 React 渲染**

渲染工作被拆分成块：由单独的**路由段**和**Suspense 边界**划分。每块两步：

- React 将服务器组件渲染为 RSC Payload（针对流优化）
- Next.js 使用 RSC Payload + 客户端组件 JS 指令在服务器上渲染 HTML

> 这意味着不必等所有内容渲染完才缓存工作或发送响应——可以边完成边流式传输。

**2. Next.js 在服务器上缓存（全路由缓存）**

默认缓存路由的渲染结果（RSC Payload 和 HTML）。

**3. 在客户端进行水合与协调**

1. **HTML** → 立即显示快速非交互式预览
2. **RSC Payload** → 协调客户端与渲染的服务器组件树，更新 DOM
3. **JavaScript 指令** → hydrate 客户端组件，使应用可交互

**4. Next.js 客户端缓存（路由缓存）**

RSC Payload 存储在客户端路由缓存中——一个**单独的内存缓存，按路由段分割**。

**5. 后续导航**

检查 RSC Payload 是否已在路由缓存中：是则跳过后续服务器请求；否则从服务器获取并填充。

### 首次加载 vs 后续导航

| | 首次加载 | 后续导航 |
|---|---|---|
| HTML | 生成 | 不重新生成（部分渲染） |
| RSC Payload | 生成 | 预取并缓存 |
| 客户端组件 | 渲染 | **完全在客户端渲染**，不包含服务器渲染的 HTML |

### `generateMetadata` 与页面共享请求记忆

```ts
import { cache } from 'react'
import { db } from '@/app/lib/db'

// getPost 会被用两次，但只执行一次
export const getPost = cache(async (slug: string) => {
  const res = await db.query.posts.findFirst({ where: eq(posts.slug, slug) })
  return res
})
```

---

## 11. 流式渲染与 Suspense

### Suspense 是什么？

React 特性，允许在**不阻塞整体渲染**的前提下先展示 fallback。Next.js 在三个层面用到它：

1. **页面加载**：`<Loading />` 是立即可用的预置组件
2. **布局加载**：`loading.tsx` 包裹children
3. **慢网络**：浏览器在下载 JS 时先显示预置的 loading UI

### `loading.tsx` 的自动包裹

同目录的 `loading.js` 会嵌套在 `layout.js` 内，**自动把 `page.js` 及其下所有子文件包进 `<Suspense>` 边界**。

```tsx
export default function Loading() {
  // 加载时显示的 fallback UI
  return <LoadingSkeleton />
}
```

⚠️ **加载 UI 组件不接受任何参数。**

### 手动 Suspense 边界

```tsx
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'

export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
```

**两个好处**：

1. **流式服务器渲染** — HTML 渐进传输
2. **选择性水合** — React 依据用户交互决定优先水合哪些组件

### `use` 解包 Promise

不`await` 数据获取函数，直接把 Promise 传给客户端组件用 `use()` 解封：

```tsx
// page.tsx
import Posts from '@/app/ui/posts'
import { Suspense } from 'react'

export default function Page() {
  // 不要 await 数据获取函数
  const posts = getPosts()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}
```

```tsx
// ui/posts.tsx
'use client'
import { use } from 'react'

export default function Posts({
  posts,
}: {
  posts: Promise<{ id: string; title: string }[]>
}) {
  const allPosts = use(posts)

  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### ⚠️ 状态码陷阱

- 流式传输时返回 **`200`** 表示请求成功
- 服务器仍可在流内容内部传达错误（如 `redirect` 或 `notFound`），但 ⚠️ **响应头已发送后无法再改状态码**
- 404 页面流式传输时，Next.js 会在流式 HTML 中包含 `<meta name="robots" content="noindex">`
- 若确需返回 404 状态码：必须在 `proxy` 中提前判断并重写到 not-found 路由，**保持 proxy 检查快速**
- ⚠️ 把 `notFound()` 放在 Suspense 边界**之前**，以及任何可能 suspend 的 `await` **之前**

### 流式元数据

动态渲染页面的元数据单独传输，在 `generateMetadata` 解析完成后注入 HTML，**不阻塞 UI 渲染**。

⚠️ 对期望元数据在 `<head>` 中的爬虫（`Twitterbot`、`Slackbot`、`Bingbot`）**已禁用流式元数据**。通过 User-Agent 检测，可用 `htmlLimitedBots` 自定义。

### ⚠️ 平台支持

| 部署选项 | `loading.js` / 流式支持 |
|---|---|
| Node.js 服务器 | 是 |
| Docker 容器 | 是 |
| **静态导出** | **否** |
| 适配器 | 平台相关 |

---

## 12. 错误处理与约定文件

### 两类错误

| 类型 | 定义 | 处理方式 |
|---|---|---|
| **预期错误** | 应用正常运行时可能发生（表单验证失败、请求失败） | 明确处理并**返回给客户端** |
| **未捕获异常** | 意外错误 | 抛出，由**错误边界**捕获 |

### 处理预期错误

⚠️ **对预期错误，避免使用 `try`/`catch`，否则会引发错误。将预期错误建模为返回值。**

```ts
// app/actions.ts
'use server'

export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')

  const res = await fetch('https://api.vercel.app/posts', {
    method: 'POST',
    body: { title, content },
  })
  const json = await res.json()

  if (!res.ok) {
    return { message: 'Failed to create post' }  // 返回值，不是异常
  }
}
```

```tsx
// ui/form.tsx
'use client'

import { useActionState } from 'react'
import { createPost } from '@/app/actions'

const initialState = { message: '' }

export function Form() {
  const [state, formAction, pending] = useActionState(createPost, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" required />
      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>Create Post</button>
    </form>
  )
}
```

### `notFound()`

```tsx
import { getPostBySlug } from '@/lib/posts'

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <div>{post.title}</div>
}
```

⚠️ 调用 `notFound()` 会引发 `NEXT_HTTP_ERROR_FALLBACK;404` 错误并**终止**该路由段的渲染。**不要求**写 `return notFound()`（TypeScript `never` 类型）。

### `error.tsx`

⚠️ **错误边界必须是客户端组件。**

```tsx
'use client' // 错误边界必须是客户端组件

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 上报到错误监控服务
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

#### Props

| Prop | 类型 | 说明 |
|---|---|---|
| `error` | `Error & { digest?: string }` | 转发到客户端组件的 Error 实例 |
| `reset` | `() => void` | 重新渲染错误边界内容 |

#### ⚠️ `error.message` 的关键差异

| 错误来源 | `error.message` 内容 |
|---|---|
| **客户端组件** | 原始 `Error` 消息 |
| **服务器组件** | ⚠️ **带标识符的通用消息**（防泄露敏感细节）——需用 `error.digest` 匹配服务端日志 |

> 开发过程中转发的 Error 对象会包含原始 `message` 便于调试，但**生产环境不同**。

#### 冒泡与重试

- **想让错误冒泡到父错误边界**：在渲染 `error` 组件时 `throw`
- **重试**：`reset()` 尝试重新渲染错误边界内容

⚠️ **错误边界不会捕获事件处理器内部的错误**——它们只捕获渲染期间错误。事件处理器或异步代码中的错误需手动 `try`/`catch`。

⚠️ 但 `startTransition` **内部**未处理的错误**会**冒泡到最近的错误边界。

### `global-error.tsx`

处理**根布局或模板**中的错误（即使用了 i18n）。

```tsx
'use client' // 错误边界必须是客户端组件

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error 必须包含 html 和 body 标签
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

⚠️ **必须定义自己的 `<html>` 和 `<body>` 标签**，因为它会**替换**根布局或模板。

⚠️ 因为错误边界必须是客户端组件，**`global-error.jsx` 不支持 `metadata` / `generateMetadata` 导出**——可改用 React 的 `<title>` 组件。

### `not-found.tsx`

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
```

⚠️ **组件不接受任何 props。**

⚠️ 状态码：除了自定义 UI，Next.js 对**流式响应返回 `200`**，对**非流式响应返回 `404`**。

⚠️ 根 `app/not-found.js` 和 `app/global-not-found.js` 还会处理**整个应用的任何不匹配 URL**。

`not-found.tsx` 中可以做数据获取：

```tsx
import Link from 'next/link'
import { headers } from 'next/headers'

export default async function NotFound() {
  const headersList = await headers()
  const domain = headersList.get('host')
  const data = await getSiteData(domain)
  return (
    <div>
      <h2>Not Found: {data.name}</h2>
      <Link href="/blog">View all posts</Link>
    </div>
  )
}
```

### `global-not-found.tsx`（实验性，v15.4.0）

为整个应用定义**全局 404**，在**路由级别**处理，**不依赖布局或页面渲染**。

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
}

export default nextConfig
```

```tsx
// app/global-not-found.tsx
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>This page does not exist.</p>
      </body>
    </html>
  )
}
```

⚠️ **关键差异**：

- **绕过应用正常渲染** → **必须自己导入所需的全部全局样式、字体**
- **必须返回完整 HTML 文档**，包括 `<html>` 和 `<body>`
- Next.js 会**自动为返回 404 的页面注入 `<meta name="robots" content="noindex" />`**
- 官方建议：用更小版本的全局样式和更简单的字体系列可提升此页面性能

**适用场景**：`layout.js` + `not-found.js` 组合无法构建 404 页时——① 应用有**多个根布局**；② 根布局用**顶层动态段**定义。

### `forbidden.tsx` / `unauthorized.tsx`（v15.1.0）

需启用实验性 `authInterrupts`：

```ts
// next.config.ts
export default {
  experimental: { authInterrupts: true },
}
```

⚠️ 可在服务器组件、服务器操作和路由处理程序中调用。**无法在根布局中调用。**

---

## 延迟加载与代码分割

两种方式：`next/dynamic`（`React.lazy` + Suspense 的复合体）与 `React.lazy()` + Suspense。

### ⚠️ 三条硬约束

1. Server Component 动态导入 **Client Component** 时，**目前不支持自动代码分割**
2. `ssr: false` **仅适用于 Client Component**，必须放在 Client Component 里
3. Server Component **不支持 `ssr: false`**，用了会报错

### 加载客户端组件

```tsx
'use client'

import dynamic from 'next/dynamic'

const ssrEnabledDynamic = dynamic(() => import('./WrappedComponent'))

export default function ClientComponent() {
  return <ssrEnabledDynamic />
}
```

### 跳过 SSR

```tsx
'use client'

import dynamic from 'next/dynamic'

const ssrDisabledDynamic = dynamic(() => import('./ClientOnlyComponent'), {
  ssr: false,
})
```

### 加载服务端组件

```tsx
import dynamic from 'next/dynamic'

const ServerComponent = dynamic(() => import('./ServerComponent'))
```

⚠️ 动态导入 Server Component 时，只有作为其子级的 Client Component 会被延迟加载（Server Component 本身不会）；且在 Server Component 中使用有助于**预加载静态资源**（如 CSS）。

### 加载外部库

```tsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('components/hello'))
```

### 添加自定义加载组件

```tsx
const DynamicComponent = dynamic(() => import('../components/hello'), {
  loading: () => <p>Loading...</p>,
})
```

### 导入命名导出

命名导出需从 `import()` 返回的 Promise 中解构：

```tsx
const { ComponentA, ComponentB } = await dynamic(() => import('./components'))
```

> ⚠️ **动态导入的模块中，React Server Components 的导入方式与普通客户端组件相同**，但不要在动态导入的模块中使用 `server-only` 特性。

---

# 第三部分 · 数据

## 13. 获取数据

### 两种环境

**服务器组件**可用任何异步 I/O：`fetch` API、ORM/数据库、Node.js `fs`。

**客户端组件**两种方式：React `use` 钩、社区库（SWR / React Query）。

### 在服务器组件中获取

```tsx
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### 三种去重机制

| 机制 | 作用域 | 用途 |
|---|---|---|
| **Request Memoization** | 单次服务器请求内 | 同一 `fetch` 只执行一次 |
| **Data Cache** | 跨请求 + 跨部署 | 持久化数据（可重新验证） |
| **React `cache()`** | 单次渲染内 | 手动记忆任意函数的返回值 |

### 用 React `cache()` 记忆 ORM / 数据库查询

⚠️ `fetch` 之外的数据源（数据库客户端、CMS 客户端、GraphQL 客户端）需要用 `cache()`：

```tsx
import { cache } from 'react'
import { db, posts, eq } from '@/lib/db'

export const getPost = cache(async (id: string) => {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(id)),
  })
})
```

### ⚠️ 并行获取数据

**布局和页面默认并行渲染**（每个段尽快开始获取数据）；但**同一组件中多个 `async`/`await` 依次放置仍是串行的**。

```tsx
import { getArtist, getAlbums } from '@/app/lib/data'

export default async function Page({ params }) {
  // ❌ 这两个请求是串行的
  const { username } = await params
  const artist = await getArtist(username)
  const albums = await getAlbums(username)
  return <div>{artist.name}</div>
}
```

**解法一：先发起不 await，再用 `Promise.all` 等待**

```tsx
export default async function Page({ params }) {
  const { username } = await params

  // 先启动，不 await
  const artistPromise = getArtist(username)
  const albumsPromise = getAlbums(username)

  // 一起等待
  const [artist, albums] = await Promise.all([artistPromise, albumsPromise])

  return <div>{artist.name}</div>
}
```

> ⚠️ 使用 `Promise.all` 时一个请求失败则整体失败——需要容错时改用 `Promise.allSettled`。

**解法二：`preload` 预加载**

```tsx
import { getItem, checkIsAvailable } from '@/lib/data'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // 启动 item 数据加载
  preload(id)
  // 执行另一个异步任务
  const isAvailable = await checkIsAvailable()

  return isAvailable ? <Item id={id} /> : null
}

const preload = (id: string) => {
  // void 求值并返回 undefined
  void getItem(id)
}

export async function Item({ id }: { id: string }) {
  const result = await getItem(id)
  // ...
}
```

配合 `cache()` 更可靠：

```ts
import { cache } from 'react'
import 'server-only'
import { getItem } from '@/lib/data'

export const preload = (id: string) => {
  void getItem(id)
}

export const getItem = cache(async (id: string) => {
  // ...
})
```

### 在客户端组件中获取

**方式一：React `use` 钩**

```tsx
'use client'
import { use } from 'react'

export default function Posts({
  posts,
}: {
  posts: Promise<{ id: string; title: string }[]>
}) {
  const allPosts = use(posts)
  return <ul>{allPosts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
}
```

**方式二：SWR / React Query**（见第 44 节 SPA 章节）

### ⚠️ 关键约束

- **确保数据源能快速解析第一个请求**，因为它会阻塞后续所有请求
- **`loading.js` 在幕后嵌套在 `layout.js` 内**，自动包裹 `page.js` 及其下方子文件
- 开发过程中可记录 `fetch` 调用以便调试（`logging` 配置项）

---

## 14. 更新数据与 Server Actions

### 什么是服务器函数

在服务器运行的异步函数，可通过客户端网络请求调用。⚠️ 因此**必须是异步的**。在 action/mutation 上下文中也称为**服务器操作（Server Actions）**。

⚠️ **底层使用 `POST`，且只有此 HTTP 方法可以调用它们。**

### 定义

**方式一：文件顶部标记（函数体内也可）**

```ts
// app/actions.ts
export async function createPost(formData: FormData) {
  'use server'
  const title = formData.get('title')
  const content = formData.get('content')

  // 更新数据
  // 重新验证缓存
}

export async function deletePost(formData: FormData) {
  'use server'
  const id = formData.get('id')

  // 更新数据
  // 重新验证缓存
}
```

**方式二：内联在服务器组件内**

```tsx
export default function Page() {
  // Server Action
  async function createPost(formData: FormData) {
    'use server'
    // ...
  }

  return <form action={createPost}>{/* ... */}</form>
}
```

**⚠️ 无法在客户端组件中定义服务器函数**——只能从带 `"use server"` 的文件中导入后调用。

### 调用

| 方式 | 写法 |
|---|---|
| 表单 | `<form action={createPost}>`，函数自动收到 `FormData` |
| 按钮 | `<button formAction={createPost}>` |
| 作为 prop | `updateItemAction: (formData: FormData) => void` |
| 事件处理器 | `onClick={() => useOptimistic(...)}` |

### 渐进式增强

服务器组件**默认支持渐进式增强**：即使 JavaScript 尚未加载或被禁用，调用服务器操作的表单也会被提交。

⚠️ 在客户端组件中，如果 JavaScript 尚未加载，表单提交会**被排队**，并优先进行数据同步；水合后浏览器在提交表单时**不会刷新**。

### 重新验证与刷新

```ts
'use server'

import { refresh } from 'next/cache'

export async function updatePost(formData: FormData) {
  // 更新数据
  // ...

  refresh()
}
```

```ts
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  'use server'
  // 更新数据
  // ...
  revalidatePath('/posts')
}
```

```ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  // 更新数据
  // ...
  revalidatePath('/posts')
  redirect('/posts')
}
```

⚠️ **调用 `redirect` 会抛出异常**，框架处理控制流异常，**其后的任何代码都不会执行**。需要新数据时**事先**调用 `revalidatePath` 或 `revalidateTag`。

### Cookie 操作

```ts
'use server'

import { cookies } from 'next/headers'

export async function exampleAction() {
  const cookieStore = await cookies()

  // 读取
  cookieStore.get('name')?.value

  // 设置
  cookieStore.set('name', 'Delba')

  // 删除
  cookieStore.delete('name')
}
```

⚠️ 在服务器操作中 set/delete cookie 时，Next.js 会在服务器端**重新渲染**当前页面及其布局。重新渲染的组件**会保留客户端状态**，且如果依赖发生更改，**效果会重新运行**。

### `useActionState` 处理 pending 状态

```tsx
'use client'

import { useActionState, startTransition } from 'react'
import { createPost } from '@/app/actions'
import { LoadingSpinner } from '@/app/ui/loading-spinner'

export function Button() {
  const [state, action, pending] = useActionState(createPost, false)

  return (
    <button onClick={() => startTransition(action)}>
      {pending ? <LoadingSpinner /> : 'Create Post'}
    </button>
  )
}
```

### `useTransition` 更新浏览计数

```tsx
'use client'

import { useState, useEffect, useTransition } from 'react'

export default function ViewCount({ initialViews }: { initialViews: number }) {
  const [views, setViews] = useState(initialViews)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const updatedViews = await incrementViews()
      setViews(updatedViews)
    })
  }, [])

  // 可以用 isPending 给用户反馈
  return <p>Total Views: {views}</p>
}
```

### ⚠️ 并发限制

> **服务器函数专为服务器端突变而设计。客户端当前一次调度并等待一个功能。这是一个实现细节，可能会有所变更。** 并行数据获取请在服务器组件中完成，或在单个服务器函数或路由处理程序中执行。

---

## 15. 表单与校验

### Server Actions 表单基础

```tsx
export default function Page() {
  async function createInvoice(formData: FormData) {
    'use server'

    const rawFormData = {
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    }

    // mutate data
    // revalidate the cache
  }

  return <form action={createInvoice}>{/* ... */}</form>
}
```

> ⚠️ 处理多字段表单时用 `Object.fromEntries(formData)`，但**该对象会包含以 `$ACTION_` 为前缀的额外属性**。

### 渐进式增强：`bind` 传参

```tsx
'use client'

import { updateUser } from './actions'

export function UserProfile({ userId }: { userId: string }) {
  const updateUserWithId = updateUser.bind(null, userId)

  return (
    <form action={updateUserWithId}>
      <input type="text" name="name" />
      <button type="submit">Update User Name</button>
    </form>
  )
}
```

```ts
'use server'

export async function updateUser(userId: string, formData: FormData) {}
```

⚠️ 替代方案（隐藏 input）`<input type="hidden" name="userId" value={userId} />` 的值会成为渲染 HTML 的一部分且**不会被编码**。

### 服务端校验（zod）

```tsx
'use server'

import { z } from 'zod'

const schema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
})

export default async function createUser(formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })

  // 字段无效时提前返回
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 修改数据
}
```

### ⚠️ `useActionState` 改变函数签名

使用 `useActionState` 时，服务器函数会**接收 `prevState` 作为第一个参数**：

```tsx
'use server'

export async function createUser(initialState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })
  // ...
}
```

客户端（三元解构顺序：`[state, formAction, pending]`）：

```tsx
'use client'

import { useActionState } from 'react'
import { createUser } from '@/app/actions'

const initialState = { message: '' }

export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />
      <p aria-live="polite">{state?.message}</p>
      <button disabled={pending}>Sign up</button>
    </form>
  )
}
```

### 两种 pending 状态方案

**方案一：`useActionState` 的第三个返回值**

```tsx
const [state, formAction, pending] = useActionState(createUser, initialState)

<button disabled={pending}>Sign up</button>
```

**方案二：`useFormStatus`**（⚠️ 需要**单独组件**，因为它读取的是"最近的 `<form>` 上下文"）

```tsx
'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending} type="submit">Sign Up</button>
  )
}
```

```tsx
import { SubmitButton } from './button'
import { createUser } from '@/app/actions'

export function Signup() {
  return (
    <form action={createUser}>
      <SubmitButton />
    </form>
  )
}
```

> ⚠️ React 19 中 `useFormStatus` 返回对象包含 `data`、`method`、`action` 等额外键；**未用 React 19 时只有 `pending` 键可用**。

### 乐观更新 `useOptimistic`

```tsx
'use client'

import { useOptimistic } from 'react'
import { send } from './actions'

type Message = { message: string }

export function Thread({ messages }: { messages: Message[] }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(messages, (state, newMessage) => [...state, { message: newMessage }])

  const formAction = async (formData: FormData) => {
    const message = formData.get('message') as string
    addOptimisticMessage(message)
    await send(message)
  }

  return (
    <div>
      {optimisticMessages.map((m, i) => (
        <div key={i}>{m.message}</div>
      ))}
      <form action={formAction}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
```

### 其他表单能力

**嵌套提交元素**——同一表单里"保存草稿"和"发布"两个按钮：

```tsx
<button formAction={saveDraft}>Save Draft</button>
<button formAction={publish}>Publish</button>
```

**程序化提交** `requestSubmit()`：

```tsx
'use client'

export function Entry() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === 'Enter' || e.key === 'NumpadEnter')
    ) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <div>
      <textarea name="entry" rows={20} required onKeyDown={handleKeyDown} />
    </div>
  )
}
```

### `<Form>` 组件（`next/form`）

扩展 HTML `<form>`，提供预取、提交时客户端导航、渐进式增强。

```tsx
import Form from 'next/form'

export default function Page() {
  return (
    <Form action="/search">
      {/* 提交时输入值会附加到 URL，如 /search?query=abc */}
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

**`action` 为字符串**时额外提供：**预取**路径（预加载共享 UI）+ 客户端导航（保留共享 UI 与客户端状态）。

| Prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| `action` | `string` | **必需** | 提交后导航的 URL |
| `replace` | `boolean` | `false` | 替换历史记录 |
| `scroll` | `boolean` | `true` | 滚到新路由顶部 |
| `prefetch` | `boolean` | `true` | 进入视口时预取 |

⚠️ **`action` 为函数**时 `replace` 和 `scroll` 会被**忽略**，且**无法自动预取共享 UI**。

⚠️ 其他限制：**不支持** `method`、`encType`、`target`（用了会退回原生行为）；**不支持**把 `key` 传给字符串 `action`；`onSubmit` 里调 `event.preventDefault()` 会**覆盖** `<Form>` 行为。

⚠️ `<input type="file">` 配合字符串 `action` 时，提交的是**文件名**而非文件对象。

⚠️ 使用 `basePath` 时，`formAction` 路径**必须**包含它：`formAction="/base-path/search"`。

---

## 16. 路由处理器 Route Handlers

### 基础

使用 Web 标准 `Request` / `Response` API。`route` 是最底层的路由原语，**不参与布局或客户端导航**。

```ts
// app/api/hello/route.ts
export async function GET(request: Request) {
  return Response.json({ message: 'Hello World' })
}
```

⚠️ **路由处理程序仅在 `app` 目录中可用**（相当于 `pages/api`）。

⚠️ **不需要 `bodyParser` 或任何其他配置**（与 Pages Router 的 API 路由不同）。

### 支持的 HTTP 方法

| 方法 | 支持 | 可缓存 |
|---|---|---|
| `GET` | ✅ | ✅ 可选缓存 |
| `POST` | ✅ | ❌ |
| `PUT` | ✅ | ❌ |
| `PATCH` | ✅ | ❌ |
| `DELETE` | ✅ | ❌ |
| `HEAD` | ✅ | ❌ |
| `OPTIONS` | ✅ | ❌ |

不受支持的方法 → Next.js 返回 **`405 Method Not Allowed`**。

> 未定义 `OPTIONS` 时，Next.js 会自动实现并设置相应的 `Allow` 头。

### 参数

```ts
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl
}
```

```ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ team: string }> }
) {
  const { team } = await params
}
```

类型助手 `RouteContext`：

```ts
import type { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, ctx: RouteContext<'/users/[id]'>) {
  const { id } = await ctx.params
  return Response.json({ id })
}
```

### 缓存

⚠️ **路由处理程序默认不缓存**（v15 起 `GET` 从静态改为动态）。可选择缓存 `GET`：

```ts
export const dynamic = 'force-static'

export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()

  return Response.json({ data })
}
```

启用 Cache Components 后的四种模式：

```tsx
// 静态 —— 不访问动态或运行时数据，构建时预渲染
export async function GET() {
  return Response.json({ projectName: 'Next.js' })
}
```

```tsx
// 动态 —— 构建时调Math.random() 会停止预渲染，延迟到请求时
export async function GET() {
  return Response.json({ randomNumber: Math.random() })
}
```

```tsx
import { headers } from 'next/headers'

// 运行时数据 —— 调运行时 API 时预渲染终止
export async function GET() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  return Response.json({ userAgent })
}
```

```tsx
import { cacheLife } from 'next/cache'

// 缓存 —— 访问动态数据但用 use cache 缓存
export async function GET() {
  const products = await getProducts()
  return Response.json(products)
}

async function getProducts() {
  'use cache'
  cacheLife('hours')

  return await db.query('SELECT * FROM products')
}
```

⚠️ **`use cache` 不能直接在路由处理程序主体中使用**；必须提取到辅助函数中。

⚠️ 如果 `GET` 处理程序访问以下任一项，**预渲染会停止**：网络请求、数据库查询、异步文件系统操作、请求对象属性（`req.url`、`request.headers`、`request.cookies`、`request.body`）、运行时 API、非确定性操作。

⚠️ **其他 HTTP 方法即使与缓存的 `GET` 在同一文件也不会被缓存。**

### 路由解析冲突

| 页面 | 路由 | 结果 |
|---|---|---|
| `app/page.js` | `app/route.js` | ❌ **冲突** |
| `app/page.js` | `app/api/route.js` | ✅ 有效 |
| `app/[user]/page.js` | `app/api/route.js` | ✅ 有效 |

⚠️ 每个 `route.js` 或 `page.js` 文件都会**接管该路由的所有 HTTP 动词**。

### Cookies 与 Headers

```ts
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()

  const a = cookieStore.get('a')
  const b = cookieStore.set('b', '1')
  const c = cookieStore.delete('c')
}
```

⚠️ `headers()` 实例是**只读**的；要设置标头需返回新的 `Response` 和新的 `headers`。

### CORS

```ts
export async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

⚠️ 要给**多个**路由处理程序加 CORS，用 `proxy` 或 `next.config.js` 的 `headers`。

⚠️ CORS 原生支持：`sitemap.xml`、`robots.txt`、app icons、opengraph image。

---

## 17. 后端for前端 BFF

Next.js 支持创建**公共端点**处理 HTTP 请求并返回**任何内容类型**（不只是 HTML），可访问数据源、执行副作用。

```bash
npx create-next-app@latest --api
```

### 三种方案对比

| 维度 | Server Component 直取数据源 | Route Handler (BFF) | Client Component 取数 |
|---|---|---|---|
| **构建时预渲染** | ✅ 正常 | ❌ **构建失败**（构建时无服务器监听） | ✅ 正常 |
| **按需渲染性能** | 最快（无额外往返） | ❌ 慢（多一次 HTTP 往返） | 视网络 |
| **数据暴露面** | 由 DTO/taint 控制 | 公开 HTTP 端点，需手动过滤 | 全部下发给浏览器 |
| **适用** | 绝大多数数据获取 | 第三方 webhook、非 RSC 消费者、代理转发 | 地理位置、Storage、音频、文件 API、频繁轮询 |
| **推荐库** | DAL | — | `swr` / `react-query` |

⚠️ **不要从 Server Component 调 Route Handler** —— 会引入额外的服务器请求往返。

### 错误处理

```ts
import { submit } from '@/lib/submit'

export async function POST(request: Request) {
  try {
    await submit(request)
    return new Response(null, { status: 204 })
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : 'Unexpected error'
    return new Response(message, { status: 500 })
  }
}
```

⚠️ **避免在发给客户端的错误消息中暴露敏感信息。**

### 请求体

```ts
export async function POST(request: Request) {
  const res = await request.json()
  return Response.json({ res })
}
```

⚠️ **`GET`/`HEAD` 无 body。**

⚠️ **body 只能读一次**，需重读则 `clone()`：

```ts
export async function POST(request: Request) {
  try {
    const clonedRequest = request.clone()

    await request.body()
    await clonedRequest.body()
    await request.body() // 抛错

    return new Response(null, { status: 204 })
  } catch {
    return new Response(null, { status: 500 })
  }
}
```

### 生成 RSS

```ts
// app/rss.xml/route.ts
export async function GET(request: Request) {
  const rssResponse = await fetch(/* rss endpoint */)
  const rssData = await rssResponse.json()

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
 <title>${rssData.title}</title>
 <description>${rssData.description}</description>
 <link>${rssData.link}</link>
 <copyright>${rssData.copyright}</copyright>
 ${rssData.items.map((item) => {
   return `<item>
    <title>${item.title}</title>
    <description>${item.description}</description>
    <link>${item.link}</link>
    <pubDate>${item.publishDate}</pubDate>
    <guid isPermaLink="false">${item.guid}</guid>
 </item>`
 })}
</channel>
</rss>`

  const headers = new Headers({ 'content-type': 'application/xml' })

  return new Response(rssFeed, { headers })
}
```

⚠️ **必须过滤用于生成标记的任何输入**（上例为简化示意，实际必须转义）。

### 用 POST 避免敏感数据进 URL

```ts
import { parseWeatherData } from '@/lib/weather'

export async function POST(request: Request) {
  const body = await request.json()
  const searchParams = new URLSearchParams({ lat: body.lat, lng: body.lng })

  try {
    const weatherResponse = await fetch(`${weatherEndpoint}?${searchParams}`)

    if (!weatherResponse.ok) {
      /* handle error */
    }

    const weatherData = await weatherResponse.text()
    const payload = parseWeatherData.asJSON(weatherData)

    return new Response(payload, { status: 200 })
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : 'Unexpected exception'
    return new Response(message, { status: 500 })
  }
}
```

⚠️ 用 `POST` 而非 `GET` 是**为了避免把地理位置数据放进 URL**——`GET` 可能被缓存或日志记录。

### Webhook 触发重新验证

```ts
import { type NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (token !== process.env.REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const tag = request.nextUrl.searchParams.get('tag')

  if (!tag) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  revalidateTag(tag, 'max')

  return NextResponse.json({ success: true })
}
```

### 速率限制

```ts
import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: Request) {
  const { rateLimited } = await checkRateLimit(request)

  if (rateLimited) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  return new Response(null, { status: 204 })
}
```

> 除代码级检查外，**还要启用主机提供的速率限制**。

### 库模式（工厂）

```ts
import { createHandler } from 'third-party-library'

const handler = createHandler({
  /* 库特有的选项 */
})

export const GET = handler
// 或者
export { handler as POST }
```

⚠️ 第三方库可能仍把 `proxy` 称作 `middleware`。

### ⚠️ 部署环境限制

Lambda 化路由处理程序时：无法跨请求共享数据；环境可能不支持写文件系统；长任务可能超时被终止；**WebSockets 无法工作**。

⚠️ **`output: 'export'` 模式**：只支持 `GET` 路由处理程序，需配合 `export const dynamic = 'force-static'`。

---

## 18. 数据安全

### 三种数据获取方法（选一种，别混用）

| 方法 | 适用场景 | 要点 |
|---|---|---|
| **外部 HTTP API** | 现有大型应用、后端团队独立 | 遵循零信任模型，服务器组件里继续 `fetch` |
| **数据访问层 DAL** | **新项目推荐** | 仅服务器运行、做授权、返回最小化 DTO |
| **组件级数据访问** | 原型设计与学习 | ⚠️ 最易意外泄露私有数据 |

### 模式一：HTTP API

```tsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const token = cookieStore.get('AUTH_TOKEN')?.value

  const res = await fetch('https://api.example.com/profile', {
    headers: {
      Cookie: `AUTH_TOKEN=${token}`,
    },
  })

  // ....
}
```

### 模式二：DAL（推荐）

DAL 应该：① 仅在服务器上运行；② 执行授权检查；③ 返回安全、最小化的 DTO。

```ts
import { cache } from 'react'
import { cookies } from 'next/headers'

// 用 cache 包裹的辅助方法让多处能拿到同一值，
// 无需手动传递 —— 这也降低了从 Server Component 传值给 Client Component 的风险
export const getCurrentUser = cache(async () => {
  const token = cookies().get('AUTH_TOKEN')
  const decodedToken = await decryptAndValidate(token)
  // 不要把密钥或私密信息作为公开字段
  // 用类避免意外把整个对象传给客户端
  return new User(decodedToken.id)
})
```

**DTO 的核心设计模式**：

```tsx
import 'server-only'
import { getCurrentUser } from './auth'

function canSeeUsername(viewer: User) {
  return true
}

function canSeePhoneNumber(viewer: User, team: string) {
  return viewer.isAdmin || team === viewer.team
}

export async function getProfileDTO(slug: string) {
  // 不传值，而是读回缓存值 —— 解决 context 问题且更易做成懒加载
  const [rows] = await sql`SELECT * FROM user WHERE slug = ${slug}`
  const userData = rows[0]

  const currentUser = await getCurrentUser()

  // 只返回本次查询相关的数据
  return {
    username: canSeeUsername(currentUser) ? userData.username : null,
    phonenumber: canSeePhoneNumber(currentUser, userData.team)
      ? userData.phonenumber
      : null,
  }
}
```

> ⚠️ **关键设计**：`getCurrentUser()` 用 `cache()` 包裹后各处"重新读取"而非"层层传值"，从设计上杜绝了把敏感值从 Server Component 传到 Client Component。返回 `new User(id)` 用**类**而非对象字面量，正是为了防止误传整个对象。

页面侧就安全了：

```tsx
import { getProfile } from '../../data/user'

export async function Page({ params: { slug } }) {
  // 现在可以安全地传递这个 profile，因为知道它不含敏感信息
  const profile = await getProfile(slug)
  // ...
}
```

### ⚠️ 模式三的反面教材

```tsx
// ❌ 危险：把所有字段暴露给客户端
import Profile from './components/profile.tsx'

export async function Page({ params: { slug } }) {
  const [rows] = await sql`SELECT * FROM user WHERE slug = ${slug}`
  const userData = rows[0]
  return <Profile user={userData} />
}
```

```tsx
'use client'

// ❌ 坏的 props 接口：接受远超需要的数据，
// 鼓励 Server Component 把所有数据往下传
export default async function Profile({ user }: { user: User }) {
  return <h1>{user.name}</h1>
}
```

**修正——传递前清洗**：

```ts
export async function getUser(slug: string) {
  const [rows] = await sql`SELECT * FROM user WHERE slug = ${slug}`
  const user = rows[0]

  // 只返回公开字段
  return { name: user.name }
}
```

### 各执行位置的 DTO 要求

| 位置 | 暴露面 | DTO 要求 |
|---|---|---|
| **Server Components** | 传给 Client Component 的 props 成为序列化负载 | 必须字段白名单；用 DTO 函数/类 |
| **Server Functions** | 独立公开 HTTP 端点，任何人可 POST | 视为公开 API；入参需校验；内部再授权 |
| **Route Handlers** | 公开 HTTP 端点 | 返回前过滤；错误信息不得含敏感信息 |
| **Proxy** | 运行在每条路由 | **只读 cookie，绝不查库** |

### Taint API

```ts
// next.config.js
export default {
  experimental: {
    taint: true,
  },
}
```

| API | 用途 |
|---|---|
| `experimental_taintObjectReference` | 数据对象 |
| `experimental_taintUniqueValue` | 特定值（如 session id、token） |

⚠️ 这是**额外的保护层**。在将 DAL 数据传给 React 渲染上下文之前，**仍然应该**过滤和清理。

### `server-only` 包

```bash
npm install server-only
```

```ts
import 'server-only'
```

效果：客户端环境导入时**引发构建错误**。

### Server Actions 内置安全特性

Server Action 创建时即生成**公开 HTTP 端点**，即使没在代码其它地方导入也可被访问。内置两项：

| 特性 | 说明 |
|---|---|
| **安全 Action ID** | 加密的非确定性 ID；⚠️ **在构建之间定期重新计算**（最多缓存 14 天） |
| **死代码消除 (DCE)** | 未使用的 Server Action 从客户端包中移除 |

⚠️ 这降低了缺认证层的风险，**但你仍应把 Server Action 当作公开 HTTP 端点**。

### 闭包加密

组件内定义的 Server Action 会创建闭包，**被捕获的变量会被发送到客户端**。Next.js **自动对封闭变量加密**，**每次构建生成新的私钥**。

⚠️ 官方明确"**不建议仅依靠加密**来防止敏感值暴露在客户端上"。

**覆盖加密密钥**（多实例自托管）：`process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`（必须 AES-GCM 加密）。

**CSRF 防护**：Server Action 只能通过 `POST` 调用；Next.js 会比对 **Origin 头与 Host 头**，不匹配则中止。

反向代理场景需配置：

```ts
// next.config.js
export default {
  serverActions: {
    allowedOrigins: ['https://example.com'],
  },
}
```

### ⚠️ 渲染副作用禁令

```tsx
// ❌ 渲染期间触发 mutation
export default async function Page({ searchParams }) {
  if (searchParams.get('logout')) {
    cookies().delete('AUTH_TOKEN')
  }
  return <UserProfile />
}
```

```tsx
// ✅ 用 Server Actions 处理 mutation
import { logout } from './actions'

export default function Page() {
  return (
    <>
      <UserProfile />
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </>
  )
}
```

### ⚠️ 客户端输入验证

需验证的输入：**表单数据、URL 参数、标头、搜索参数**。

```tsx
// ❌ 直接信任 searchParams
export default async function Page({ searchParams }) {
  const isAdmin = searchParams.get('isAdmin')
  if (isAdmin === 'true') {
    return <AdminPanel />   // 依赖不受信任的客户端数据
  }
}
```

```tsx
// ✅ 每次都重新验证
import { cookies } from 'next/headers'
import { verifyAdmin } from './auth'

export default async function Page() {
  const token = cookies().get('AUTH_TOKEN')
  const isAdmin = await verifyAdmin(token)

  if (isAdmin) {
    return <AdminPanel />
  }
}
```

### 审计清单

- **数据访问层**：验证数据库包和环境变量**未在 DAL 之外导入**
- **`"use client"` 文件**：props 是否需要私有数据？类型签名是否过于宽泛？
- **`"use server"` 文件**：Action 参数是否在操作或 DAL 内校验？用户是否**重新授权**？
- **`/[param]/` 带括号的文件夹是用户输入**：参数是否经过验证？
- **`proxy.ts` 和 `route.ts`**：功能强大，审核成本高 → 定期做渗透测试

---

# 第四部分 · 缓存

> 官方说明：本章帮助你了解 Next.js 的**底层工作原理**，但并不是高效使用的必备知识。大多数缓存启发式方法由你的 API 使用情况决定，具有默认值，可通过零或最少配置获得最佳性能。

## 19. 四层缓存机制

### 总览表

| 机制 | 缓存什么 | 在哪里 | 目的 | 持续时间 |
|---|---|---|---|---|
| **Request Memoization**（请求记忆） | 函数的返回值 | 服务器 | 重用 React 组件树中的数据 | 单个请求的生命周期 |
| **Data Cache**（数据缓存） | 数据 | 服务器 | 跨用户请求和部署存储数据 | 持久（可重新验证） |
| **Full Route Cache**（全路由缓存） | HTML 和 RSC Payload | 服务器 | 降低渲染成本、提升性能 | 持久（可重新验证） |
| **Router Cache**（路由缓存） | RSC Payload | 客户端 | 减少导航上的服务器请求 | 用户会话或基于时间 |

**默认策略**：Next.js 会**尽可能多地缓存**以提升性能并降低成本——除非主动退出，否则路由被静态渲染、数据请求被缓存。

> ⚠️ **`proxy` 不支持获取缓存**——在 `proxy` 内部执行的任何获取操作都将被**取消缓存**。

### 渲染策略

**静态渲染**：路由在构建时或重新验证后于后台渲染，结果被缓存，跨请求重用。**完全缓存在全路由缓存中**。

**动态渲染**：路由在请求时渲染。当路由使用请求特定信息时发生。

⚠️ **以下任一 API 会使路由变为动态路由**：

- `cookies`
- `headers`
- `connection`
- `draftMode`
- `searchParams` 属性
- `unstable_noStore`
- `fetch` 且 `{ cache: 'no-store' }`

> 动态路由**不会**被缓存到全路由缓存，但**仍可使用数据缓存**。

### 1) 请求记忆（Request Memoization）

Next.js 扩展了 `fetch` API，自动记忆相同 URL 和选项的请求。

```tsx
async function getItem() {
  // fetch 被自动记忆，结果被缓存
  const res = await fetch('https://.../item/1')
  return res.json()
}

// 被调用两次，但只执行第一次
const item = await getItem() // 缓存 MISS

// 第二次调用可以在路由的任何位置
const item = await getItem() // 缓存 HIT
```

**工作原理**：

1. 渲染路由时第一次调用特定请求 → 结果不在内存中，缓存 `MISS`
2. 函数被执行，从外部源获取数据，结果存入内存
3. 同一渲染通道中后续调用 → 缓存 `HIT`，从内存返回，**不执行函数**
4. 路由渲染完成、渲染通道结束后，内存"重置"，**所有条目被清除**

⚠️ **限制与注意**：

- 请求记忆是 **React 功能**，不是 Next.js 功能
- **仅适用于 `fetch` 的 `GET` 方法**（`POST`/`DELETE` 不记忆）
- 仅适用于 **React 组件树**——适用于 `generateMetadata`、`generateStaticParams`、布局、页面和其他服务器组件；⚠️ **不适用于路由处理程序**（不是组件树一部分）
- `fetch` 不适用时（数据库、CMS、GraphQL 客户端）用 React `cache`

| 属性 | 说明 |
|---|---|
| **期间** | 持续到 React 组件树完成渲染 |
| **重新验证** | **无需**——记忆不跨服务器请求共享 |
| **选择退出** | 不建议（React 优化）。管理单个请求用 `AbortController` 的 `signal` |

### 2) 数据缓存（Data Cache）

跨传入的服务器请求和部署保留数据获取结果。

> 在浏览器中 `cache` 选项指示与 HTTP 缓存的交互；在 Next.js 中，它指示**服务器端请求如何与数据缓存交互**。

**工作原理**：

1. 渲染期间第一次调用带 `'force-cache'` 的 `fetch` → 检查数据缓存
2. 找到 → 立即返回并 memoize
3. 未找到 → 向数据源发请求，存入数据缓存，并记忆
4. 未缓存的数据（未定义 `cache` 或 `{ cache: 'no-store' }`）→ 始终从数据源获取
5. **无论缓存与否，请求始终会被记忆**

#### 基于时间的重新验证（`next.revalidate`）

**工作原理**：

1. 第一次调用 → 从外部源获取并存入数据缓存
2. 指定时间范围（如 60 秒）内的请求 → 返回缓存数据
3. 超过时间范围后，下一个请求**仍返回缓存的（已过时的）数据**，同时：
   - Next.js 在**后台**触发重新验证
   - 成功获取后更新数据缓存
   - ⚠️ **后台重新验证失败则之前数据保持不变**

行为类似 **stale-while-revalidate**。

#### 按需重新验证

**工作原理**：

1. 第一次调用 → 从外部源获取并存储
2. 触发按需重新验证 → **从缓存中清除**相应条目
   - ⚠️ 与基于时间的重新验证不同：后者将旧数据保留直到获取新数据
3. 下次请求 → 又是缓存 `MISS`，从外部源取出并存入

### 3) 全路由缓存（Full Route Cache）

> 相关术语：「自动静态优化」「静态站点生成」「静态渲染」可互换使用。

**渲染流程**（详见第 10 节）：React 渲染 → 服务器缓存 → 客户端水合 → 客户端缓存 → 后续导航。

| 属性 | 说明 |
|---|---|
| **期间** | 默认**持久**——渲染输出跨用户请求缓存 |
| **失效方式一** | **重新验证数据** → 数据缓存失效会**依次**使路由缓存失效 |
| **失效方式二** | **重新部署** → ⚠️ 与数据缓存不同，**全路由缓存在新部署中被清除** |

**三种选择退出方式**：

| 方式 | 效果 |
|---|---|
| 使用**动态 API** | 从全路由缓存中选出该路由，请求时动态渲染。**数据缓存仍可用** |
| `dynamic = 'force-dynamic'` 或 `revalidate = 0` | 跳过全路由缓存**和数据缓存**。路由缓存仍适用（客户端） |
| **选择退出数据缓存** | 路由有未缓存 `fetch` 时从全路由缓存中选出。**允许缓存与未缓存数据混合** |

### 4) 客户端路由缓存（Router Cache）

内存中的客户端缓存，按**布局、加载状态和页面**拆分。

**作用**：

- 布局被缓存并在导航（部分渲染）上**重用**
- 加载状态被缓存，在**即时导航**中重复使用
- ⚠️ **默认情况下页面不缓存**，但在浏览器后退/前进导航期间会重复使用

#### 期间

| 因素 | 说明 |
|---|---|
| **会话** | 整个导航过程中持续，**页面刷新时被清除** |
| **自动失效期** | 布局和加载状态在特定时间后自动失效 |

| 预取类型 | 动态页面 | 静态页面 |
|---|---|---|
| 默认预取（`prefetch={null}` 或未指定） | **不缓存** | **5 分钟** |
| 完全预取（`prefetch={true}` 或 `router.prefetch`） | **5 分钟** | **5 分钟** |

> ⚠️ 页面刷新清除所有段，但**自动失效期仅影响预取后的各个段**。

**两种失效方式**：

1. **在服务器操作中**：
   - 通过 `revalidatePath` / `revalidateTag` 按需重新验证
   - `cookies.set` / `cookies.delete` **会使路由缓存失效**（防认证变更后过时）
2. **`router.refresh()`** → 使 Router Cache 失效并向服务器发出当前路由的新请求

> ⚠️ **从 Next.js 15 开始，页面段默认选择退出。**

---

## 20. fetch 缓存选项

### `options.cache`

```ts
fetch(`https://...`, { cache: 'force-cache' | 'no-store' })
```

| 值 | 语义 |
|---|---|
| `auto no cache`（**默认**） | 开发中**每个请求**都从远程获取；`next build` 期间**只获取一次**（路由被静态预渲染）。若在路由上检测到动态 API，则**每次请求**都获取 |
| `no-store` | **每个请求**都从远程获取，**即使未检测到动态 API** |
| `force-cache` | 在数据缓存中查找匹配请求。匹配且新鲜 → 从缓存返回；否则从远程获取并更新缓存 |

### `options.next.revalidate`

```ts
fetch(`https://...`, { next: { revalidate: false | 0 | number } })
```

| 值 | 语义 |
|---|---|
| `false` | 无限期缓存（等同于 `revalidate: Infinity`） |
| `0` | **防止**被缓存 |
| `number` | 缓存生存期最多 `n` 秒 |

⚠️ **冲突规则**：

- 单个 `fetch` 的 `revalidate` **低于**路由默认值 → **整个路由**的重新生效间隔会**缩短**
- 同一路由中**相同 URL** 的两个 `fetch` 用**不同的 `revalidate`** → 使用**较低的值**
- ⚠️ **不允许** `{ revalidate: 3600, cache: 'no-store' }` 这类**冲突选项**——两者被**忽略**，开发模式下打印**警告**

### `options.next.tags`

```ts
fetch(`https://...`, { next: { tags: ['collection'] } })
```

⚠️ **限制**：自定义标签**最大 256 字符**，**最多 128 项**。

### ⚠️ 开发环境故障排除

| 症状 | 原因 |
|---|---|
| `no-store` 请求在 HMR 刷新间看不到新数据 | HMR 缓存**适用于所有 fetch 请求**（含 `no-store`）。导航或整页刷新时清除 |
| 硬刷新时缓存选项被忽略 | 请求含 `cache-control: no-cache` 标头（浏览器禁用缓存时通常会加）→ `cache`/`next.revalidate`/`next.tags` 全部被忽略 |

---

## 21. 路由段配置

⚠️ **如果 `cacheComponents` 标志打开，以下选项将被禁用，并最终弃用。**
⚠️ 路由段选项**仅在服务器组件页面、布局或路由处理程序中生效**。
⚠️ `generateStaticParams` 不能在 `'use client'` 文件中使用。

### 完整列表

| 选项 | 类型 | 默认 |
|---|---|---|
| `dynamic` | `'auto' \| 'force-dynamic' \| 'error' \| 'force-static'` | `'auto'` |
| `dynamicParams` | `boolean` | `true` |
| `revalidate` | `false \| 0 \| number` | `false` |
| `fetchCache` | `'auto' \| 'default-cache' \| 'only-cache' \| 'force-cache' \| 'force-no-store' \| 'default-no-store' \| 'only-no-store'` | `'auto'` |
| `runtime` | `'nodejs' \| 'edge'` | `'nodejs'` |
| `preferredRegion` | `'auto' \| 'global' \| 'home' \| string \| string[]` | `'auto'` |
| `maxDuration` | `number` | 由部署平台设置 |

### `dynamic`

```tsx
export const dynamic = 'auto'
```

| 值 | 行为 |
|---|---|
| `'auto'` | 尽可能多地缓存，不阻止任何组件选择动态行为 |
| `'force-dynamic'` | 强制动态渲染。等效于：每个 `fetch` 设为 `{ cache: 'no-store', next: { revalidate: 0 } }` + `fetchCache = 'force-no-store'` |
| `'error'` | 任何组件使用动态 API 或未缓存数据时**引发错误**，强制静态渲染并缓存数据 |
| `'force-static'` | 强制静态渲染并缓存数据，**强制 `cookies`、`headers()`、`useSearchParams()` 返回空值** |

> `dynamic` 是一种**选择返回旧模型**（`getStaticProps` 二元全有或全无）的方法。

### `dynamicParams`

```tsx
export const dynamicParams = true
```

| 值 | 行为 |
|---|---|
| `true` | `generateStaticParams` 未包含的动态段**按需生成** |
| `false` | 未包含的动态段**返回 404** |

⚠️ 替换了 `getStaticPaths` 的 `fallback: true | false | blocking`。
⚠️ `dynamicParams = true` 时该段使用**流式服务器渲染**。

### `revalidate`

```tsx
export const revalidate = false
```

| 值 | 行为 |
|---|---|
| `false` | 默认启发式缓存任何 `force-cache` 的或在**使用动态 API 之前**发现的 `fetch` |
| `0` | 确保**始终**动态渲染。⚠️ **更改未设 `cache: 'no-store'` 的 `fetch` 默认值**，但保留显式设置的 |
| `number` | 默认重新验证频率设为 `n` 秒 |

⚠️ **陷阱**：

- 重新验证值需**可静态分析**：`revalidate = 600` ✅，`revalidate = 60 * 10` ❌
- 使用 `runtime = 'edge'` 时，重新验证值**不可用**
- 开发中页面始终按需渲染，从不缓存

**重新验证频率规则**：

- 单个路由的每个布局和页面的**最低** `revalidate` 决定**整个路由**的频率
- 各个 `fetch` 可设置比路由默认更低的值以**增加**整个路由的频率

### `fetchCache`

⚠️ 高级选项，仅在明确需要覆盖默认行为时使用。

| 值 | 语义 |
|---|---|
| `'auto'` | 动态 API 之前用其 `cache` 选项缓存，之后不缓存 |
| `'default-cache'` | 允许任何 `cache` 选项；未提供则 `'force-cache'`。**即使动态 API 之后也视为静态** |
| `'only-cache'` | 确保所有 `fetch` 缓存；⚠️ **任何 `fetch` 用 `no-store` 会导致错误** |
| `'force-cache'` | 所有 `fetch` 设为 `'force-cache'` |
| `'default-no-store'` | 允许任何 `cache` 选项；未提供则 `'no-store'`。**即使动态 API 之前也视为动态** |
| `'only-no-store'` | 确保所有 `fetch` 退出缓存；⚠️ **任何 `fetch` 用 `force-cache` 会导致错误** |
| `'force-no-store'` | 所有 `fetch` 强制每次请求重新获取 |

**跨路由段行为**：

- `'only-cache'` + `'force-cache'` → **`'force-cache'` 获胜**（强制选项改变整个路由行为）
- ⚠️ **不允许**组合 `'only-cache'` + `'only-no-store'`，或 `'force-cache'` + `'force-no-store'`
- ⚠️ 子级提供 `'auto'` 或 `'*-cache'` 时，**父级不能提供 `'default-no-store'`**

> 通常建议共享父布局保留 `'auto'`，在子段自定义分歧选项。

### `runtime`

```tsx
export const runtime = 'nodejs'
```

建议使用 Node.js 运行时。⚠️ **该选项不能在 `proxy` 中使用**。⚠️ **Cache Components 不支持 `runtime: 'edge'`**（会抛错）。

### `maxDuration`

```tsx
export const maxDuration = 5
```

默认 Next.js **不限制**服务器端逻辑执行时间。⚠️ 用服务器操作时，请在**页面级别**设置以更改页面上所有操作的默认超时。

---

## 22. Cache Components 与 use cache

### 启用

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
}

export default nextConfig
```

`cacheComponents` 导致**应用路由中的数据获取操作在预渲染中被排除，除非它们被显式缓存**。

⚠️ 虽然它能优化性能，但与提供预渲染内容相比，**也可能引入额外的延迟**。
⚠️ 启用后，**`GET` 路由处理程序将遵循与页面相同的预渲染模型**。
⚠️ 版本：`16.0.0` 引入，**统一了 `ppr`、`useCache` 和 `dynamicIO` 三个标志**。

### PPR 渲染模型

构建时 Next.js 渲染组件树。只要组件**不访问网络资源、某些系统 API 或不需要传入请求**，其输出就**自动添加到静态 shell**。否则必须显式选择：`<Suspense>` 延迟到请求时，或用 `use cache` 缓存结果。

⚠️ 如果数据没有被 `<Suspense>` 封装或标记为 `use cache`，会看到 **`Uncached data was accessed outside of <Suspense>`** 错误。

**自动预渲染内容**：同步 I/O、模块导入、纯计算。

```tsx
import fs from 'node:fs'

export default async function Page() {
  // 同步文件系统读取
  const content = fs.readFileSync('./config.json', 'utf-8')

  // 模块导入
  const constants = await import('./constants.json')

  // 纯计算
  const processed = JSON.parse(content).items.map((item) => item.value * 2)

  return (
    <div>
      <h1>{constants.appName}</h1>
      <ul>
        {processed.map((value, i) => (
          <li key={i}>{value}</li>
        ))}
      </ul>
    </div>
  )
}
```

**动态内容**（外部系统异步提供）：

```tsx
import { Suspense } from 'react'
import fs from 'node:fs/promises'

async function DynamicContent() {
  // 网络请求
  const data = await fetch('https://api.example.com/data')

  // 数据库查询
  const users = await db.query('SELECT * FROM users')

  // 异步文件系统操作
  const file = await fs.readFile('..', 'utf-8')

  // 模拟外部系统延迟
  await new Promise((resolve) => setTimeout(resolve, 100))

  return <div>Not in the static shell</div>
}
```

```tsx
export default async function Page(props) {
  return (
    <>
      <h1>Part of the static shell</h1>
      {/* <p>Loading..</p> 是静态 shell 的一部分 */}
      <Suspense fallback={<p>Loading..</p>}>
        <DynamicContent />
        <div>Sibling excluded from static shell</div>
      </Suspense>
    </>
  )
}
```

⚠️ **关键行为**：预渲染会在 `fetch` 处**停止**——请求本身不会启动，其后代码也不执行。fallback 进入静态 shell，内容在请求时流式传输。

⚠️ 由于所有操作在同一组件内**按顺序执行**，内容只有在**所有操作完成后**才显示。

⚠️ 将 Suspense 边界**尽可能靠近**需要它们的组件，以**最大化静态 shell 中的内容量**。

**运行时数据**：`cookies()`、`headers()`、`searchParams`、`params`（除非通过 `generateStaticParams` 提供了示例）。

```tsx
import { cookies, headers } from 'next/headers'
import { Suspense } from 'react'

async function RuntimeData({ searchParams }) {
  const cookieStore = await cookies()
  const headerStore = await headers()
  const search = await searchParams

  return <div>Not in the static shell</div>
}
```

⚠️ **运行时数据不能与 `use cache` 一起缓存**——访问运行时 API 的组件必须**始终**封装在 `<Suspense>` 中。但**可以从运行时数据中提取值，作为参数传递给缓存函数**。

**非确定性操作**（`Math.random()`、`Date.now()` 等）必须先 `await connection()`：

```tsx
import { connection } from 'next/server'
import { Suspense } from 'react'

async function UniqueContent() {
  // 显式延迟到请求时
  await connection()

  const random = Math.random()
  const now = Date.now()
  const uuid = crypto.randomUUID()

  return <div><p>{random}</p><p>{now}</p><p>{uuid}</p></div>
}
```

### `'use cache'` 指令

#### 三个使用层级

```tsx
// 文件级 —— ⚠️ 所有函数导出都必须是异步函数
'use cache'

export default async function Page() {
  // ...
}
```

```tsx
// 组件级
export async function MyComponent() {
  'use cache'
  return <></>
}
```

```tsx
// 函数级
export async function getData() {
  'use cache'
  const data = await fetch('/api/data')
  return data
}
```

也可独立于 `cacheComponents` 使用：

```ts
export default {
  experimental: { useCache: true },
}
```

#### 缓存键

缓存键由以下输入的序列化版本生成：

1. **构建 ID** —— 每次构建唯一，更改会使**所有**条目失效
2. **函数 ID** —— 代码库中位置和签名的哈希
3. **可序列化参数** —— 组件的 props 或函数参数
4. **HMR 刷新哈希**（仅开发）

⚠️ 引用外部作用域变量时，这些变量被**自动捕获并绑定为参数**，成为缓存键的一部分。

#### 序列化约束

⚠️ 参数与返回值使用**不同的序列化系统**。服务器组件的序列化（针对参数）比客户端组件的序列化**更严格**。

| | 支持 |
|---|---|
| **参数** | 基本类型、普通对象、数组、Date/Map/Set/类型化数组/ArrayBuffer、React 元素（仅传递模式） |
| **返回值** | 同参数，**外加 JSX 元素** |
| **不支持** | 类实例、函数（传递除外）、Symbol/WeakMap/WeakSet、URL 实例 |

**传递模式**（不可序列化参数的例外）：

```tsx
async function CachedWrapper({ children }: { children: ReactNode }) {
  'use cache'
  // 不要读取或修改 children —— 只是传递
  return (
    <div className="wrapper">
      <header>Cached Header</header>
      {children}
    </div>
  )
}

// children 可以是动态的
export default function Page() {
  return (
    <CachedWrapper>
      <DynamicComponent /> {/* 未缓存，被传递 */}
    </CachedWrapper>
  )
}
```

#### ⚠️ 关键约束

| 约束 | 说明 |
|---|---|
| **不能访问运行时 API** | 缓存的函数/组件**不能直接访问** `cookies()`/`headers()`/`searchParams`。**在 `use cache` 中直接调用会立即失败**（`next-request-in-use-cache` 错误），不是超时 |
| **构建挂起（50 秒超时）** | 在 `use cache` 边界**之外**创建、解析为动态数据的 Promise。**把 Promise 作为 props 传入会挂起**——应传值而非 Promise |
| **文件级需全异步** | 所有函数导出必须是异步函数 |
| **缓存插槽规则** | 只要**不在可缓存函数主体中直接引用** JSX 插槽，它们出现在返回输出中就**不影响缓存条目** |

**正确的运行时数据传递**：

```tsx
import { cookies } from 'next/headers'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dynamic />
    </Suspense>
  )
}

async function Dynamic() {
  const cookieStore = await cookies()   // ✅ 在这里 await
  return <Cached value={cookieStore.get('theme')?.value} />  // ✅ 传值
}

async function Cached({ value }: { value: string }) {
  'use cache'
  return <p>{value}</p>
}
```

#### 运行时缓存行为

| 环境 | 行为 |
|---|---|
| **无服务器架构** | 缓存条目通常**不会**在请求之间保持（每个请求可能是不同实例）。构建时缓存正常工作 |
| **自托管** | 缓存在请求之间保持。用 `cacheMaxMemorySize` 控制大小 |

⚠️ 默认内存缓存不足时→ 用 `'use cache: remote'`（允许平台提供 Redis / KV 等专用处理器）。
⚠️ 极少数情况（合规要求或无法重构）→ `'use cache: private'`。

#### 重新验证

⚠️ 默认使用 `default` 配置文件：**stale 5 分钟 / revalidate 15 分钟 / expire 永不过期**。

```tsx
import { cacheLife } from 'next/cache'

async function getData() {
  'use cache'
  cacheLife('hours')   // 使用内置 'hours' 档案
  return fetch('/api/data')
}
```

```tsx
import { cacheTag } from 'next/cache'

async function getProducts() {
  'use cache'
  cacheTag('products')
  return fetch('/api/products')
}
```

```tsx
'use server'

import { updateTag } from 'next/cache'

export async function updateProduct() {
  await db.products.update(...)
  updateTag('products')   // 使所有 'products' 缓存失效
}
```

#### 缓存示例

**缓存整个路由**——在 `layout` 和 `page` 顶部都添加；每段被视为**独立入口点**并**独立缓存**。

```tsx
'use cache'

export default async function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
```

⚠️ 如果**仅**添加到 `layout` 或 `page`，则只有该路由段及其导入的组件被缓存。

**缓存组件输出**：

```tsx
export async function Bookings({ type = 'haircut' }: BookingsProps) {
  'use cache'
  async function getBookingsData() {
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    return data
  }
  return // ...
}
```

**通过缓存的组件传递服务器操作给客户端组件**：

```tsx
import ClientComponent from './ClientComponent'

export default async function Page() {
  const performUpdate = async () => {
    'use server'
    await db.update(...)
  }

  return <CachedComponent performUpdate={performUpdate} />
}

async function CachedComponent({
  performUpdate,
}: {
  performUpdate: () => Promise<void>
}) {
  'use cache'
  // ⚠️ 不要在这里调用 performUpdate
  return <ClientComponent action={performUpdate} />
}
```

#### ⚠️ 故障排除

**详细日志**：

```bash
NEXT_PRIVATE_DEBUG_CACHE=1 npm run dev
```

**构建挂起的两个原因**：

1. 把运行时数据 Promise 作为 props 传入
2. 共享去重存储（`Map` 中存动态 Promise，缓存代码访问它）→ 用 Next.js 内置 `fetch` 去重，或用**单独的 Map**

### `cacheLife`

⚠️ 需要 `cacheComponents` 标志。
⚠️ 即使 `use cache` 在文件级别，也应把 `cacheLife` 放在**输出被缓存的函数内部**。
⚠️ **每次函数调用只能执行一次 `cacheLife` 调用**（可以在不同分支，但要确保每次运行只执行一次）。

#### 三个时间属性

| 属性 | 定义 | 示例 |
|---|---|---|
| `stale` | 客户端无需检查服务器即可使用缓存数据的时长 | `cacheLife({ stale: 300 })` |
| `revalidate` | 经过此时间段后，下次请求触发**后台刷新** | `cacheLife({ revalidate: 900 })` |
| `expire` | 经过此时间段无请求后，下次请求将**等待**新内容 | `cacheLife({ expire: 3600 })` |

⚠️ 同时设置 `revalidate` 和 `expire` 时，**`expire` 必须大于 `revalidate`**，否则报错。

#### 预设缓存档案（完整表）

| 档案 | 用例 | `stale` | `revalidate` | `expire` |
|---|---|---|---|---|
| `default` | 标准内容 | 5 分钟 | 15 分钟 | 1 年 |
| `seconds` | 实时数据 | 30 秒 | 1 秒 | 1 分钟 |
| `minutes` | 频繁更新的内容 | 5 分钟 | 1 分钟 | 1 小时 |
| `hours` | 内容每天更新多次 | 5 分钟 | 1 小时 | 1 天 |
| `days` | 内容每日更新 | 5 分钟 | 1 天 | 1 周 |
| `weeks` | 内容每周更新 | 5 分钟 | 1 周 | 30 天 |
| `max` | 稳定且很少更改 | 5 分钟 | 30 天 | 1 年 |

**选择依据**：`seconds`（股票价格、实时比分）→ `minutes`（社交动态、新闻）→ `hours`（产品库存、天气）→ `days`（博客文章）→ `weeks`（播客、新闻简报）→ `max`（法律页面、存档内容）。

⚠️ 不指定则用 `default`；⚠️ 空对象 `cacheLife({})` 会应用 `default` 的值。**建议显式设置**。

#### 自定义档案

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    biweekly: {
      stale: 60 * 60 * 24 * 14, // 14 天
      revalidate: 60 * 60 * 24, // 1 天
      expire: 60 * 60 * 24 * 14,  // 14 天
    },
  },
}

export default nextConfig
```

```tsx
'use cache'
import { cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife('biweekly')
  return <div>Page</div>
}
```

也可**内联**（仅适用于特定函数/组件）：

```tsx
'use cache'
import { cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife({ stale: 3600, revalidate: 900, expire: 86400 })
  return <div>Page</div>
}
```

#### ⚠️ 客户端路由缓存行为

- `stale` 控制**客户端路由缓存**，而不是 `Cache-Control` 标头
- 服务器通过 `x-nextjs-stale-time` 响应标头发送过期时间
- **为确保预取链接始终可用，强制执行至少 30 秒的等待时间**（仅适用于基于时间的过期）
- 在服务器操作中调用 `revalidateTag`/`revalidatePath`/`updateTag`/`refresh` 时，**整个客户端缓存会被立即清除，绕过过期时间**

⚠️ **`cacheLife` 的 `stale` 与 `staleTimes` 的 `stale` 不同**：`staleTimes` 是影响所有路由的**全局设置**；`cacheLife` 允许按函数/路由配置。更新 `staleTimes.static` 也会更新 `default` 档案的 `stale`。

#### ⚠️ 嵌套缓存行为

| 场景 | 行为 |
|---|---|
| **外层显式 `cacheLife`** | 外层用自身生命周期，**不受内层影响**。显式指定**始终优先** |
| **外层未调用 `cacheLife`** | 用 `default`（15 分钟 revalidate）。**较短的内层会缩短外层；较长的内层无法延长外层** |

> 建议显式指定 `cacheLife`，否则行为依赖内层而难以推断。

#### 条件缓存生命周期

```tsx
import { cacheLife, cacheTag } from 'next/cache'

async function getPostContent(slug: string) {
  'use cache'

  const post = await fetchPost(slug)
  cacheTag(`post-${slug}`)

  if (!post) {
    // 内容可能尚未发布或是草稿
    cacheLife('minutes')
    return null
  }

  // 已发布内容可缓存更久
  cacheLife('days')

  return post.data
}
```

### `cacheTag`

```tsx
import { cacheTag } from 'next/cache'

export async function getData() {
  'use cache'
  cacheTag('my-data')
  const data = await fetch('/api/data')
  return data
}
```

**从外部数据创建标签**：

```tsx
export async function Bookings({ type = 'haircut' }: BookingsProps) {
  async function getBookingsData() {
    'use cache'
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    cacheTag('bookings-data', data.id)
    return data
  }
  return // ...
}
```

- **幂等标签**：多次应用相同标签无额外效果
- 多个标签：`cacheTag('tag-one', 'tag-two')`
- ⚠️ **限制**：最大 256 字符 / 最多 128 项

### `cacheHandlers` —— 自定义缓存存储

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheHandlers: {
    default: require.resolve('./cache-handlers/default-handler.js'),
    remote: require.resolve('./cache-handlers/remote-handler.js'),
  },
}

export default nextConfig
```

**何时使用**：

- **跨实例共享缓存**——默认内存缓存**隔离于每个 Next.js 进程**，多服务器/容器场景下各实例有自己的缓存，不共享且**重启后丢失**
- **更改存储类型**——磁盘、数据库或外部缓存服务

⚠️ `'use cache: private'` **不使用**缓存处理器，也无法自定义。

**必须实现的 `CacheHandler` 接口**：

```ts
get(cacheKey: string, softTags: string[]): Promise<CacheEntry | undefined>
set(cacheKey: string, pendingEntry: Promise<CacheEntry>): Promise<void>
refreshTags(): Promise<void>
getExpiration(tags: string[]): Promise<number>
updateTags(tags: string[], durations?: { expire?: number }): Promise<void>
```

⚠️ `set` 时条目可能仍在等待——**必须在存储前等待其返回**。

**`CacheEntry` 结构**：

```ts
interface CacheEntry {
  value: ReadableStream<Uint8Array>   // ⚠️ 用 .tee() 读取和存储
  tags: string[]
  stale: number
  timestamp: number
  expire: number
  revalidate: number
}
```

### `staleTimes`（实验性）

在**客户端路由缓存**中启用页面段的缓存。

| 属性 | 何时用 | 默认 |
|---|---|---|
| `static` | 静态生成的页面 / `prefetch={true}` / `router.prefetch` | 5 分钟 |
| `dynamic` | 页面既非静态生成也非完全预取 | **0 秒（未缓存）** |

⚠️ **不会**影响部分渲染——共享布局不会在每次导航时自动重新获取。
⚠️ **不会**改变后退/前进缓存行为（防布局偏移和丢失滚动位置）。

### 迁移路由段配置

| 旧配置 | 迁移方式 |
|---|---|
| `dynamic = "force-dynamic"` | **不需要**——所有页面默认动态，直接删除 |
| `dynamic = "force-static"` | **首先移除**。检测到未处理的动态/运行时数据会抛错；否则自动提取静态 HTML 外壳 |
| `revalidate` | 替换为 `cacheLife` |
| `fetchCache` | **不需要**——用 `use cache` |
| `runtime = 'edge'` | **不支持**——Cache Components 需要 Node.js 运行时 |

```tsx
// 之前
export const revalidate = 3600 // 1 小时

export default async function Page() {
  return <div>...</div>
}
```

```tsx
// 之后 —— 用 cacheLife
import { cacheLife } from 'next/cache'

export default async function Page() {
  'use cache'
  cacheLife('hours')
  return <div>...</div>
}
```

### 完整整合示例

```tsx
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { cacheLife } from 'next/cache'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <>
      {/* 静态内容 —— 自动预渲染 */}
      <header>
        <h1>Our Blog</h1>
        <nav>
          <Link href="/">Home</Link> | <Link href="/about">About</Link>
        </nav>
      </header>

      {/* 缓存的动态内容 —— 包含在静态 shell 中 */}
      <BlogPosts />

      {/* 运行时动态内容 —— 请求时流式传输 */}
      <Suspense fallback={<p>Loading your preferences...</p>}>
        <UserPreferences />
      </Suspense>
    </>
  )
}

// 所有人看到相同的文章（每小时重新验证）
async function BlogPosts() {
  'use cache'
  cacheLife('hours')

  const res = await fetch('https://api.vercel.app/blog')
  const posts = await res.json()

  return (
    <section>
      <h2>Latest Posts</h2>
      <ul>
        {posts.slice(0, 5).map((post: any) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>By {post.author} on {post.date}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

// 基于 cookie 的个性化
async function UserPreferences() {
  const theme = (await cookies()).get('theme')?.value || 'light'
  const favoriteCategory = (await cookies()).get('category')?.value

  return (
    <aside>
      <p>Your theme: {theme}</p>
      {favoriteCategory && <p>Favorite category: {favoriteCategory}</p>}
    </aside>
  )
}
```

### 官方建议：缓存什么？

- 数据**不依赖运行时数据**、且可接受一段时间内为多个请求提供缓存值 → 用 `use cache` + `cacheLife`
- **有更新机制的内容管理系统** → 用**更长的**标签，依赖 `revalidateTag` 标记为已准备好重新验证

---

## 23. 重新验证 API

### `revalidateTag`

⚠️ 只能在**服务器函数和路由处理程序**中调用。⚠️ **不能在客户端组件或 `proxy` 中调用**。

```ts
revalidateTag(tag: string, profile: string | { expire?: number }): void
```

| 参数 | 描述 |
|---|---|
| `tag` | 缓存标记字符串。⚠️ **不超过 256 字符，区分大小写** |
| `profile` | 指定重新验证行为。推荐 `"max"`，或 `cacheLife` 中定义的任何档案 |

**三种行为**：

| 用法 | 行为 |
|---|---|
| `profile="max"`（**推荐**） | 条目**被标记为过期**，下次访问时用"过期但重新验证"语义——后台获取新内容的同时先提供过时内容 |
| 自定义档案 | 指定应用定义的任何档案 |
| ⚠️ **不使用第二参数（已弃用）** | 条目**立即过期**，下一个请求**阻塞式**重新验证 |

⚠️ 使用 `profile="max"` 时，**只是标记为过期**，只有**下次访问**才获取新数据 → **不会立即触发多次重新验证**。
⚠️ 单参数形式**已弃用**，请用双参数签名。
⚠️ 需要立即过期（Webhook 场景）：`revalidateTag(tag, { expire: 0 })`。

```tsx
// 打标签
fetch(url, { next: { tags: ['posts'] } })
```

```tsx
import { cacheTag } from 'next/cache'

async function getData() {
  'use cache'
  cacheTag('posts')
  // ...
}
```

**两个使用位置**：

| 位置 | 目的 | 是否立即失效路由缓存 |
|---|---|---|
| **路由处理程序** | 响应第三方事件（webhook） | ❌ **否** |
| **服务器操作** | 用户操作后重新验证 | ✅ **是** |

### `updateTag`

⚠️ **只能在服务器操作中调用。** 不能用于路由处理程序、客户端组件。

```tsx
updateTag(tag: string): void
```

**立即**使指定标签的缓存数据过期。**下一个请求将等待**获取最新数据，确保用户立即看到更改。

| | `updateTag` | `revalidateTag` |
|---|---|---|
| 可用上下文 | **仅**服务器操作 | 服务器操作**和**路由处理程序 |
| 行为 | 下一个请求**等待**新数据 | `profile="max"`：后台获取时提供缓存数据 |
| 专为 | **读写场景**设计 | 常规重新验证 |

```ts
'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')

  const post = await db.post.create({ data: { title, content } })

  // 使新文章立即可见
  updateTag('posts')                    // 影响文章列表页
  updateTag(`post-${post.id}`)          // 影响文章详情页

  // 重定向 —— 用户会看到新数据，不是缓存
  redirect(`/posts/${post.id}`)
}
```

### `revalidatePath`

⚠️ 只能在**服务器函数和路由处理程序**中调用。

```tsx
revalidatePath(path: string, type?: 'page' | 'layout'): void
```

| 参数 | 描述 |
|---|---|
| `path` | 路由模式（如 `/product/[slug]`）或特定 URL（如 `/product/123`）。⚠️ **不要附加 `/page` 或 `/layout`**，用 `type` 参数。⚠️ **不超过 1024 字符，区分大小写** |
| `type` | `'page'` 或 `'layout'`。⚠️ **`path` 含动态段时必填**；特定 URL 时省略 |

**失效范围**：

| 类型 | 失效内容 |
|---|---|
| `'page'` | 特定页面 |
| `'layout'` | 该段的 `layout.tsx` + 其下**所有**嵌套布局和页面 |
| 路由处理程序 | 使路由处理程序中访问的数据缓存条目失效 |

```ts
import { revalidatePath } from 'next/cache'

// 特定 URL
revalidatePath('/blog/post-1')

// 页面路径
revalidatePath('/blog/[slug]', 'page')
// 或带路由组
revalidatePath('/(main)/blog/[slug]', 'page')

// 布局路径 —— 使 /blog/[slug]/[another] 也会失效
revalidatePath('/blog/[slug]', 'layout')

// 所有数据
revalidatePath('/', 'layout')
```

⚠️ `revalidatePath('/blog/[slug]', 'page')` **不会**使 `/blog/[slug]/[author]` 失效。

**构建重新验证实用程序**：

```ts
'use server'

import { revalidatePath, updateTag } from 'next/cache'

export async function updatePost() {
  await updatePostInDatabase()

  revalidatePath('/blog')   // 刷新博客页
  updateTag('posts')        // 刷新所有使用 'posts' 标签的页面
}
```

⚠️ **标签 vs 路径的差异**：

```tsx
// 页面 A: /blog
const posts = await fetch('https://api.vercel.app/blog', {
  next: { tags: ['posts'] },
})

// 页面 B: /dashboard
const recentPosts = await fetch('https://api.vercel.app/blog?limit=5', {
  next: { tags: ['posts'] },
})
```

调用 `revalidatePath('/blog')` 后：

- 页面 A（`/blog`）：**显示最新数据**
- 页面 B（`/dashboard`）：⚠️ **仍然显示过时数据**（标签 `'posts'` 未失效）

### `refresh`

⚠️ **只能在服务器操作中调用。**

```ts
refresh(): void
```

```ts
'use server'

import { refresh } from 'next/cache'

export async function createPost(formData: FormData) {
  const post = await db.post.create({ ... })
  refresh()
}
```

⚠️ `refresh()` 只刷新客户端路由，**不会重新验证已标记的数据**。要重新验证标记数据，用 `updateTag` 或 `revalidateTag`。

### `unstable_cache`

⚠️ **警告：当此 API 达到稳定状态时，它将被 `use cache` 取代。**

```tsx
import { unstable_cache } from 'next/cache'

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const getCachedUser = unstable_cache(
    async () => {
      return { id: userId }
    },
    [userId],           // 把 user ID 加入缓存键
    {
      tags: ['users'],
      revalidate: 60,
    }
  )

  // ...
}
```

⚠️ **不支持**访问缓存范围内的动态数据源（`headers`、`cookies`）。如需使用，请在**外部**读取并作为参数传入。
⚠️ `tags` **不会**用于唯一标识该函数。

### ⚠️ `revalidatePath` vs `router.refresh()`

| | `revalidatePath` | `router.refresh()` |
|---|---|---|
| 清除数据缓存 | ✅ | ❌ |
| 清除全路由缓存 | ✅ | ❌ |
| 清除客户端路由缓存 | ✅ | ✅ |
| 运行位置 | 服务器 | 客户端 |

---

## 24. 缓存失效速查矩阵

### 「API 对缓存的影响」完整表

| API | 路由缓存 | 全路由缓存 | 数据缓存 | React 缓存 |
|---|---|---|---|---|
| `<Link prefetch>` | 缓存 | | | |
| `router.prefetch` | 缓存 | | | |
| `router.refresh` | 重新验证 | | | |
| `fetch` | | | 缓存 | 缓存（GET/HEAD） |
| `fetch` `options.cache` | | | 缓存或退出 | |
| `fetch` `options.next.revalidate` | | 重新验证 | 重新验证 | |
| `fetch` `options.next.tags` | | 缓存 | 缓存 | |
| `revalidateTag` | 重新验证（服务器操作） | 重新验证 | 重新验证 | |
| `revalidatePath` | 重新验证（服务器操作） | 重新验证 | 重新验证 | |
| `const revalidate` | | 重新验证或退出 | 重新验证或退出 | |
| `const dynamic` | | 缓存或退出 | 缓存或退出 | |
| `cookies` | 重新验证（服务器操作） | 选择退出 | | |
| `headers`, `searchParams` | | 选择退出 | | |
| `generateStaticParams` | | 缓存 | | |
| `React.cache` | | | | 缓存 |
| `unstable_cache` | | | 缓存 | |

### 缓存交互规则

**数据缓存 ↔ 全路由缓存**：

- 重新验证或退出数据缓存 → **会使全路由缓存失效**（渲染输出依赖数据）
- 使全路由缓存失效或退出 → **不会影响数据缓存**

> 这允许**动态渲染具有缓存和未缓存数据的路由**——大部分页面用缓存数据、少量组件依赖请求时数据，不必担心重新获取所有数据。

**数据缓存 ↔ 客户端路由缓存**：

| 场景 | 规则 |
|---|---|
| **服务器操作**中 `revalidatePath`/`revalidateTag` | **立即**同时失效两层 |
| **路由处理程序**中重新验证 | ⚠️ **不会立即**失效路由缓存——路由处理程序未绑定到特定路由 |

### 失效手段总表

| 手段 | 数据缓存 | 全路由缓存 | 客户端路由缓存 |
|---|---|---|---|
| 时间到期 | 后台重新验证，旧数据保留 | 随数据缓存重新验证 | 由 `stale`/`prefetch` 控制 |
| `revalidateTag`（服务器操作） | 标记过期 → SWR | 重新验证 | 重新验证 |
| `revalidateTag`（路由处理程序） | 标记过期 | 重新验证 | ⚠️ **不立即失效** |
| `revalidatePath`（服务器操作） | 失效 | 失效 | 失效 |
| `revalidatePath`（路由处理程序） | 失效 | 失效 | ⚠️ **不立即失效** |
| `updateTag`（仅服务器操作） | **立即过期** | 立即 | 立即 |
| `refresh`（仅服务器操作） | 不变 | 不变 | **立即清除整个客户端缓存** |
| `cookies.set`/`delete` | — | — | **失效** |
| `router.refresh()` | **不变** | **不变** | **完全清除** |
| 重新部署 | **持久保留** | **被清除** | 刷新即清除 |

---

## 25. ISR 增量静态再生

ISR 让你**无需重建整个站点**即可更新静态内容。

### 最小示例

```tsx
interface Post {
  id: string
  title: string
  content: string
}

// Next.js 最多每 60 秒使缓存失效一次
export const revalidate = 60

export async function generateStaticParams() {
  const posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json()
  )
  return posts.map((post) => ({
    id: String(post.id),
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post: Post = await fetch(`https://api.vercel.app/blog/${id}`).then(
    (res) => res.json()
  )
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
```

**六个工作步骤**：

1. `next build` 期间生成所有已知文章
2. 对这些页面的所有请求都已缓存并即时执行
3. 60 秒后，下一个请求**仍将返回缓存的（已过时的）页面**
4. 缓存失效，新版本页面**在后台**生成
5. 成功生成后，下一个请求返回更新后的页面并缓存
6. 请求 `/blog/26` 若存在则**按需生成**；若不存在返回 404

### 基于时间的重新验证

```tsx
export const revalidate = 3600 // 每小时失效

export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts: Post[] = await data.json()
  return (
    <main>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  )
}
```

⚠️ 建议设置**较长**的重新验证时间。需要更高精度→ 按需重新验证；需要实时数据 → 切换到动态渲染。

### 按需重新验证

```ts
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost() {
  revalidatePath('/posts')
}
```

```tsx
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog', {
    next: { tags: ['posts'] },
  })
  const posts = await data.json()
  // ...
}
```

```ts
'use server'

import { revalidateTag } from 'next/cache'

export async function createPost() {
  revalidateTag('posts', 'max')
}
```

⚠️ **处理未捕获的异常**：如果重新验证时抛出错误，将**继续从缓存中提供最后成功的数据**。下个请求会**重试**。

⚠️ **注意事项**：

- 仅在使用 **Node.js 运行时**时支持；**静态导出不支持**
- 多个 `fetch` 有**不同** `revalidate` 频率 → 用**最短的**，但**数据缓存仍尊重各自频率**
- 任何 `fetch` 的 `revalidate` 为 `0` 或显式 `no-store` → 路由**动态渲染**
- ⚠️ **Proxy 不会针对按需 ISR 请求执行**——确保重新验证**确切的路径**（如 `/post/1` 而非重写后的 `/post-1`）

**验证生产行为**：

```bash
NEXT_PRIVATE_DEBUG_CACHE=1
```

这会让服务器控制台记录 ISR 缓存命中和未命中。

### ⚠️ 静态导出不支持的功能

- 动态路由 + `dynamicParams: true`
- 无 `generateStaticParams()` 的动态路由
- 依赖 Request 的 Route Handlers
- Cookies
- `rewrites` / `redirects` / `headers`
- **`proxy`**
- **ISR**
- 默认 loader 的图片优化
- **草稿模式**
- **Server Actions**
- 拦截路由

---

# 第五部分 · 导航与请求 API

## 26. 客户端导航 Hooks

> ⚠️ 除非有特定要求，导航优先用 `<Link>` 组件而非 `useRouter`。

### `useRouter`

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

#### 方法表

| 方法 | 说明 |
|---|---|
| `router.push(href, { scroll })` | 客户端导航，**添加**新历史条目 |
| `router.replace(href, { scroll })` | 客户端导航，**不**添加历史条目 |
| `router.refresh()` | 刷新当前路由：向服务器发新请求，重新取数据，重新渲染服务器组件。客户端**合并**更新的 RSC Payload，**不丢失**未受影响的 `useState` 或滚动位置 |
| `router.prefetch(href, { onInvalidate })` | 预请求路由。可选 `onInvalidate` 在预取数据过期时调用 |
| `router.back()` | 返回历史堆栈上一条 |
| `router.forward()` | 前进到下一页 |

⚠️ **不得**将不受信任或未经清理的 URL 发送到 `router.push` / `router.replace`，否则可能引入 **XSS 漏洞**——发送到这两个方法的 `javascript:` URL 会在页面上下文执行。

⚠️ **如果提取请求被缓存，`refresh()` 可能重新产生相同的结果。** 其他动态 API（`cookies`、`headers`）也可能改变响应。

⚠️ 每个预取请求**最多调用一次** `onInvalidate` 回调。

**循环预取**：

```tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function ManualPrefetchLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    let cancelled = false
    const poll = () => {
      if (!cancelled) router.prefetch(href, { onInvalidate: poll })
    }
    poll()
    return () => {
      cancelled = true
    }
  }, [href, router])

  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault()
        router.push(href)
      }}
    >
      {children}
    </a>
  )
}
```

#### 从 `next/router` 迁移

| 变化 | 替代 |
|---|---|
| 导入源不同 | 从 `next/navigation` 而非 `next/router` |
| `pathname` 字符串已删除 | `usePathname()` |
| `query` 对象已删除 | `useSearchParams()` + `useParams()` |
| `router.events` 被替换 | 自己写客户端组件钩子监听 |
| `isReady` 删除 | `useSearchParams()` 的组件在静态渲染期会跳过预渲染 |

> ⚠️ 使用 `useSearchParams()` 的组件需包含在 `Suspense` 边界中。

### `usePathname`

```tsx
'use client'

import { usePathname } from 'next/navigation'

export default function ExampleClientComponent() {
  const pathname = usePathname()
  return <p>Current pathname: {pathname}</p>
}
```

**签名**：`const pathname = usePathname()` —— **不带任何参数**。

| URL | 返回值 |
|---|---|
| `/` | `'/'` |
| `/dashboard` | `'/dashboard'` |
| `/dashboard?v=2` | `'/dashboard'` |
| `/blog/hello-world` | `'/blog/hello-world'` |

⚠️ **需要注意**：

- **不支持从服务器组件读取当前 URL**（此设计旨在支持跨页面导航保留布局状态）
- 启用 `cacheComponents` 后，含**动态参数**的路由可能需要 `Suspense` 边界（若用了 `generateStaticParams` 则**可选**）
- 客户端组件**不是**去优化——它们是服务器组件架构不可或缺的组成部分
- ⚠️ **水合不匹配**：静态预渲染页面 + `rewrites` 组合时，用 `usePathname()` 可能导致水合不匹配

**避免 rewrites 导致的 hydration 不匹配**：

```tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PathnameBadge() {
  const pathname = usePathname()
  const [clientPathname, setClientPathname] = useState('')

  useEffect(() => {
    setClientPathname(pathname)
  }, [pathname])

  return (
    <p>
      Current pathname: <span>{clientPathname}</span>
    </p>
  )
}
```

**响应路由变化**：

```tsx
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function ExampleClientComponent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    // Do something here...
  }, [pathname, searchParams])
}
```

### `useSearchParams`

⚠️ 这是**客户端组件**钩子，在**服务器组件中不受支持**（防止部分渲染期间的值过时）。

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>
}
```

**签名**：`const searchParams = useSearchParams()` —— **不带任何参数**。

**返回**：`URLSearchParams` 接口的**只读**版本。

| URL | `searchParams.get("a")` |
|---|---|
| `/dashboard?a=1` | `'1'` |
| `/dashboard?a=` | `''` |
| `/dashboard?b=3` | `null` |
| `/dashboard?a=1&a=2` | `'1'`（用 `getAll()` 获取所有） |

其他只读方法：`getAll()`、`has()`、`keys()`、`values()`、`entries()`、`forEach()`、`toString()`。

#### ⚠️ 静态渲染下的 Suspense 要求

如果路由是静态渲染，调用 `useSearchParams` 将导致客户端组件树（**直到最近的 `Suspense` 边界**）被客户端渲染。

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  // 静态渲染时这行不会在服务器上记录
  console.log(search)
  return <>Search: {search}</>
}
```

```tsx
import { Suspense } from 'react'
import SearchBar from './search-bar'

// 作为 Suspense 边界的 fallback 组件
// 会在初始 HTML 中替代搜索栏渲染
function SearchBarFallback() {
  return <>placeholder</>
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

⚠️ **陷阱**：

- **在开发环境中**，路由按需渲染，`useSearchParams` **不会暂停**——即使没有 `Suspense` 也可能看起来正常
- ⚠️ **在生产构建期间**，客户端组件中调用 `useSearchParams` 的**静态页面必须封装在 `Suspense` 边界内**，否则**构建失败**

#### 动态渲染下的行为

如果路由是动态渲染，`useSearchParams` 在客户端组件的初始服务器渲染期间**在服务器上可用**。

```tsx
import { connection } from 'next/server'
import SearchBar from './search-bar'

export default async function Page() {
  await connection()
  return (
    <>
      <nav>
        <SearchBar />
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

⚠️ 以前通过 `export const dynamic = 'force-dynamic'` 强制动态渲染。**建议使用 `connection()`**——它在语义上将动态渲染与传入请求关联。

⚠️ **布局不接收 `searchParams` 属性**（共享布局在导航期间不重新渲染，可能导致过时）。请在客户端组件中使用 Page 的 `searchParams` 或 `useSearchParams`。

**更新 `searchParams`**：

```tsx
'use client'

export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  return (
    <>
      <p>Sort By</p>

      {/* 用 useRouter */}
      <button
        onClick={() => {
          router.push(pathname + '?' + createQueryString('sort', 'asc'))
        }}
      >
        ASC
      </button>

      {/* 用 <Link> */}
      <Link
        href={pathname + '?' + createQueryString('sort', 'desc')}
      >
        DESC
      </Link>
    </>
  )
}
```

### `useParams`

```tsx
'use client'

import { useParams } from 'next/navigation'

export default function ExampleClientComponent() {
  const params = useParams<{ tag: string; item: string }>()

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  return '...'
}
```

**签名**：`const params = useParams()` —— **不带任何参数**（泛型可选）。

| 路由 | URL | `useParams()` |
|---|---|---|
| `app/shop/page.js` | `/shop` | `{}` |
| `app/shop/[slug]/page.js` | `/shop/1` | `{ slug: '1' }` |
| `app/shop/[tag]/[item]/page.js` | `/shop/1/2` | `{ tag: '1', item: '2' }` |
| `app/shop/[...slug]/page.js` | `/shop/1/2` | `{ slug: ['1', '2'] }` |

⚠️ 在 **Pages Router** 中使用，`useParams` 会在**初始渲染时返回 `null`**。

### `useSelectedLayoutSegment(s)`

```tsx
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function ExampleClientComponent() {
  const segment = useSelectedLayoutSegment()
  return <p>Active segment: {segment}</p>
}
```

**签名**：`const segment = useSelectedLayoutSegment(parallelRoutesKey?: string)`

| 布局 | 访问过的 URL | 返回的段 |
|---|---|---|
| `app/layout.js` | `/` | `null` |
| `app/layout.js` | `/dashboard` | `'dashboard'` |
| `app/dashboard/layout.js` | `/dashboard` | `null` |
| `app/dashboard/layout.js` | `/dashboard/settings` | `'settings'` |
| `app/dashboard/layout.js` | `/dashboard/analytics/monthly` | `'analytics'` |

⚠️ **仅返回向下 一级**的段。要返回所有活动段，用 `useSelectedLayoutSegments`。

**创建活动链接组件**：

```tsx
'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

// 这个 *客户端* 组件会被导入到博客布局中
export default function BlogNavLink({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  // 导航到 `/blog/hello-world` 会返回 'hello-world'
  const segment = useSelectedLayoutSegment()
  const isActive = slug === segment

  return (
    <Link
      href={`/blog/${slug}`}
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
    >
      {children}
    </Link>
  )
}
```

```tsx
// 把客户端组件导入到父布局（服务器组件）
import { BlogNavLink } from './blog-nav-link'
import getFeaturedPosts from './get-featured-posts'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const featuredPosts = await getFeaturedPosts()
  return (
    <div>
      {featuredPosts.map((post) => (
        <div key={post.id}>
          <BlogNavLink slug={post.slug}>{post.title}</BlogNavLink>
        </div>
      ))}
      <div>{children}</div>
    </div>
  )
}
```

---

## 27. 重定向与错误中断

### `redirect`

可用于**服务器和客户端组件**、**路由处理程序**和**服务器操作**。

⚠️ **行为差异**：

| 上下文 | 行为 |
|---|---|
| **流上下文** | 插入**元标记**，在客户端发出重定向 |
| **服务器操作** | 向调用者提供 **303** HTTP 重定向响应 |
| **其他** | 向调用者提供 **307** HTTP 重定向响应 |

**参数**：

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `string` | 目标 URL。相对或绝对路径 |
| `type` | `'replace'`（默认）或 `'push'`（**服务器操作中的默认值**） | 重定向类型 |

⚠️ 在**服务器组件**中使用时，`type` 参数**无效**。

```ts
import { redirect, RedirectType } from 'next/navigation'

redirect('/redirect-to', RedirectType.replace)
```

⚠️ **关键**：`redirect` **会抛出错误**，因此：

- 在 `try`/`catch` 中使用时，应在 **`try` 块之外**调用
- **不要求**写 `return redirect()`（TypeScript `never` 类型）
- 它会**终止**引发错误的路由段的渲染

**服务器组件**：

```tsx
import { redirect } from 'next/navigation'

async function fetchTeam(id: string) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const team = await fetchTeam(id)

  if (!team) {
    redirect('/login')
  }

  // ...
}
```

**客户端组件**（可在渲染过程中调用，⚠️ 但**不能在事件处理器中调用**）：

```tsx
'use client'

import { redirect, usePathname } from 'next/navigation'

export function ClientRedirect() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    redirect('/admin/login')
  }

  return <div>Login Page</div>
}
```

#### 为什么是 307 和 308？

传统上 `302` 用于临时重定向、`301` 用于永久重定向，但许多浏览器在使用 `302` 时会**将 `POST` 改为 `GET`**。

以 `/users` → `/people` 为例：若向 `/users` 发出 `POST` 创建新用户，302 会让后续请求变成 `GET /people`——这没有意义。307 保留请求方法。

| 状态码 | 临时/永久 | 请求方法 |
|---|---|---|
| `302` | 临时 | `POST` → **`GET`** |
| `307` | 临时 | **保留** `POST` |
| `301` | 永久 | `POST` → **`GET`** |
| `308` | 永久 | **保留** `POST` |

### `permanentRedirect`

用法与 `redirect` 相同，但返回 **308（永久）**。

⚠️ 流上下文 → 元标记；服务器操作 → **303**；其他 → **308**。

### `forbidden` / `unauthorized`（实验性）

抛出错误并渲染 **403** / **401** 页面。需启用 `experimental.authInterrupts`。

```tsx
import { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'

export default async function AdminPage() {
  const session = await verifySession()

  if (session.role !== 'admin') {
    forbidden()
  }

  return <main><h1>Admin Dashboard</h1></main>
}
```

```tsx
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'

export default async function DashboardPage() {
  const session = await verifySession()

  if (!session) {
    unauthorized()
  }

  return <main><h1>Welcome to the Dashboard</h1></main>
}
```

⚠️ 可在**服务器组件、服务器操作和路由处理程序**中调用。**无法在根布局中调用。**

### 各重定向方式对比

| API | 目的 | 位置 | 状态码 |
|---|---|---|---|
| `redirect` | 突变/事件后重定向 | Server Component / Action / Route Handler | 307（默认）/ **303**（Action 中） |
| `permanentRedirect` | 永久重定向 | 同上 | 308 |
| `useRouter` | 客户端导航 | Client Component 事件处理器 | N/A |
| `redirects` in next.config.js | 按路径重定向传入请求 | 配置文件 | 307 / 308 |
| `NextResponse.redirect` | 按条件重定向 | Proxy | 任意 |

⚠️ **执行顺序**：`next.config.js` 的 `redirects` → **Proxy** → 渲染。
⚠️ **平台限制**：Vercel 上 redirects 上限 **1,024 条**；1000+ 需用 Proxy 自建方案。

**大规模重定向 + 布隆过滤器**（避免把大文件加载进 Proxy）：

```ts
import { NextResponse, NextRequest } from 'next/server'
import { ScalableBloomFilter } from 'bloom-filters'
import GeneratedBloomFilter from './redirects/bloom-filter.json'

type RedirectEntry = {
  destination: string
  permanent: boolean
}

const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter as any)

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (bloomFilter.has(pathname)) {
    const api = new URL(
      `/api/redirects?pathname=${encodeURIComponent(request.nextUrl.pathname)}`,
      request.nextUrl.origin
    )

    try {
      const redirectData = await fetch(api)

      if (redirectData.ok) {
        const redirectEntry: RedirectEntry | undefined =
          await redirectData.json()

        if (redirectEntry) {
          const statusCode = redirectEntry.permanent ? 308 : 307
          return NextResponse.redirect(redirectEntry.destination, statusCode)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return NextResponse.next()
}
```

⚠️ 布隆过滤器有**假阳性** → Route Handler 需处理"未找到"；且**必须校验对 Route Handler 的请求**防恶意请求。

### `draftMode`

⚠️ **异步函数**，必须 `await` 或 `use()`。

```tsx
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
}
```

| 方法 | 描述 |
|---|---|
| `isEnabled` | 是否启用草稿模式 |
| `enable()` | 通过设置 cookie（`__prerender_bypass`）启用 |
| `disable()` | 通过删除 cookie 禁用 |

**启用**：

```ts
import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft.enable()
  return new Response('Draft mode is enabled')
}
```

⚠️ **每次运行 `next build` 都会生成新的旁路 cookie 值**，确保其无法被猜测。
⚠️ 用 `<Link>` 调用禁用路由时，**必须传 `prefetch={false}`**，防止预取时意外删除 cookie。

**安全启用**（官方示例）：

```ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== 'MY_SECRET_TOKEN' || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  const post = await getPostBySlug(slug)

  if (!post) {
    return new Response('Invalid slug', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  // ⚠️ 不要重定向到 searchParams.slug —— 可能导致开放重定向漏洞
  redirect(post.slug)
}
```

**消费草稿**：

```tsx
import { draftMode } from 'next/headers'

async function getData() {
  const { isEnabled } = await draftMode()

  const url = isEnabled
    ? 'https://draft.example.com'
    : 'https://production.example.com'

  const res = await fetch(url)
  return res.json()
}
```

### `after`

安排在响应（或预渲染）**完成后**执行的工作——日志记录、分析等。

```tsx
import { after } from 'next/server'
import { log } from '@/app/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  after(() => {
    // 布局渲染并发送给用户后执行
    log()
  })
  return <>{children}</>
}
```

可用于：**服务器组件**（含 `generateMetadata`）、**服务器操作**、**路由处理程序**和 **`proxy`**。

⚠️ **`after` 不是动态 API**，调用它**不会**导致路由变为动态。如果它在静态页面中使用，回调将在**构建时**执行。

⚠️ **即使响应未成功完成，`after` 也会执行**——包括抛出错误或调用 `notFound` / `redirect` 时。

⚠️ **不能在服务器组件中的 `after` 中使用请求 API**——Next.js 需要知道树的哪一部分访问请求 API 以支持缓存组件，但 `after` 在 React 渲染生命周期**之后**运行。

### `connection`

指示渲染应**等待传入的用户请求**后再继续。

```ts
import { connection } from 'next/server'

export default async function Page() {
  await connection()
  // 以下所有内容都从预渲染中排除
  const rand = Math.random()
  return <span>{rand}</span>
}
```

当组件**未使用动态 API** 但你希望它在**运行时动态渲染**而不是构建时静态渲染时非常有用。

⚠️ `connection` **取代** `unstable_noStore`。**不返回可消费的值**。

---

## 28. 请求 API：cookies / headers

### `headers`

⚠️ **异步函数**，必须 `await` 或 `use()`。
⚠️ **只读**——无法 `set`/`delete` 传出请求标头。
⚠️ 是**动态 API**，在布局或页面中使用会使路由**选择进入动态渲染**。

```tsx
import { headers } from 'next/headers'

export default async function Page() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  return '...'
}
```

**返回**：只读 `Headers` 对象，方法：`entries()`、`forEach()`、`get()`、`has()`、`keys()`、`values()`。

### `cookies`

⚠️ **异步函数**。⚠️ 是**动态 API**。

```tsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

**方法**：

| 方法 | 返回 | 描述 |
|---|---|---|
| `get(name)` | 对象 | 接受名称，返回 `{ name, value }` |
| `getAll()` | 对象数组 | 所有匹配项 |
| `has(name)` | 布尔 | 是否存在 |
| `set(name, value, options)` | — | 设置传出 cookie |
| `delete(name)` | — | 删除 cookie |
| `toString()` | 字符串 | 字符串表示 |

**`set` 的 `options`**：

| 选项 | 类型 | 描述 |
|---|---|---|
| `name` / `value` | 字符串 | — |
| `expires` | 日期 | 确切过期日期 |
| `maxAge` | 数字 | 生命周期（秒） |
| `domain` | 字符串 | 可用域 |
| `path` | 字符串，**默认 `'/'`** | 限定路径 |
| `secure` | 布尔 | 仅 HTTPS |
| `httpOnly` | 布尔 | 阻止客户端访问 |
| `sameSite` | `'lax'` \| `'strict'` \| `'none'` | 跨站行为 |
| `priority` | `"low"` \| `"medium"` \| `"high"` | 优先级 |
| `partitioned` | 布尔 | 是否 partitioned |

⚠️ **唯一具有默认值的选项是 `path`。**

⚠️ `.delete` 只能在：**服务器操作或路由处理程序**中，且**属于调用 `.set` 的同一域**（通配符域需**完全匹配**），并且代码必须在**相同协议**上执行。

⚠️ **HTTP 不允许在流开始后设置 cookie** → 必须在**服务器操作或路由处理程序**中用 `.set`。

**设置 cookie**：

```tsx
'use server'

import { cookies } from 'next/headers'

export async function create(data) {
  const cookieStore = await cookies()

  cookieStore.set('name', 'lee')
  // 或
  cookieStore.set('name', 'lee', { secure: true })
  // 或
  cookieStore.set({
    name: 'name',
    value: 'lee',
    httpOnly: true,
    path: '/',
  })
}
```

**删除 cookie（三种方法）**：

```tsx
'use server'

import { cookies } from 'next/headers'

export async function deleteCookie(data) {
  const cookieStore = await cookies()
  cookieStore.delete('name')
  // 或
  cookieStore.set('name', '')
  // 或
  cookieStore.set('name', 'value', { maxAge: 0 })
}
```

⚠️ 即使使用路由处理程序或服务器操作，**也无法直接在服务器组件中设置 cookie**——cookie 实际由浏览器存储，服务器只能通过 `Set-Cookie` 标头发送指令。

⚠️ 在服务器操作中设置或删除 cookie 后，Next.js 会在服务器端**重新渲染**当前页面及其布局。UI 不会被卸载，但依赖服务器数据的副作用会重新运行。

---

## 29. NextRequest / NextResponse

### `NextRequest`

⚠️ **从 v15.0.0 起移除了 `ip` 和 `geo`。**

**Cookies**：

```ts
// 请求 /home，设置 cookie 隐藏 banner
request.cookies.set('show-banner', 'false')
// 请求会有 Set-Cookie:show-banner=false;path=/home 标头

request.cookies.get('show-banner')
// { name: 'show-banner', value: 'false', Path: '/home' }

request.cookies.getAll('experiments')
request.cookies.getAll()

request.cookies.delete('experiments')  // 返回 true/false
request.cookies.has('experiments')
request.cookies.clear()   // ⚠️ 从请求中移除所有 cookie
```

**`nextUrl`**：

| 属性 | 类型 | 描述 |
|---|---|---|
| `basePath` | `string` | URL 的基本路径 |
| `buildId` | `string` \| `undefined` | 构建标识符 |
| `pathname` | `string` | 路径名 |
| `searchParams` | `Object` | 搜索参数 |

⚠️ **Pages Router 中的国际化属性不可在 App Router 中使用。**

### `NextResponse`

**Cookies**：

```ts
let response = NextResponse.next()
response.cookies.set('show-banner', 'false')
response.cookies.get('show-banner')
response.cookies.getAll('experiments')
response.cookies.has('experiments')
response.cookies.delete('experiments')
```

⚠️ `NextResponse` 的 cookies **没有 `clear()`**（`NextRequest` 有）。

**`json()`**：

```ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
```

**`redirect()` / `rewrite()` / `next()`**：

```ts
return NextResponse.redirect(new URL('/new', request.url))
return NextResponse.rewrite(new URL('/proxy', request.url))
return NextResponse.next()
```

**转发请求标头**：

```ts
const newHeaders = new Headers(request.headers)
newHeaders.set('x-version', '123')

return NextResponse.next({
  request: {
    headers: newHeaders,
  },
})
```

⚠️ 此操作将标头转发到目标页面/路由/服务器操作，**而不会暴露给客户端**。

⚠️ **反模式**：`NextResponse.next({ headers })` 是**代理向客户端发送标头**的简写形式。**这不是最佳实践，应该避免**——可能覆盖框架预期的 `Content-Type`，导致提交失败或**流式响应损坏**。

**用允许列表创建子集**（推荐）：

```ts
import { type NextRequest, NextResponse } from 'next/server'

function proxy(request: NextRequest) {
  const incoming = new Headers(request.headers)
  const forwarded = new Headers()

  for (const [name, value] of incoming) {
    const headerName = name.toLowerCase()
    // 只保留已知安全的标头，丢弃自定义 x-* 和其他敏感项
    if (
      !headerName.startsWith('x-') &&
      headerName !== 'authorization' &&
      headerName !== 'cookie'
    ) {
      forwarded.set(name, value)
    }
  }

  return NextResponse.next({ request: { headers: forwarded } })
}
```

### `userAgent`

```ts
import { NextRequest, NextResponse, userAgent } from 'next/server'

export function proxy(request: NextRequest) {
  const url = request.nextUrl
  const { device } = userAgent(request)

  // device.type: 'mobile' | 'tablet' | 'console' | 'smarttv'
  // | 'wearable' | 'embedded' | undefined（桌面浏览器）
  const viewport = device.type || 'desktop'

  url.searchParams.set('viewport', viewport)
  return NextResponse.rewrite(url)
}
```

**返回对象的属性**：

| 属性 | 内容 |
|---|---|
| `isBot` | 布尔，是否来自已知机器人 |
| `browser` | `name`、`version` |
| `device` | `model`、`type`、`vendor` |
| `engine` | `name`（`Blink`、`Gecko`、`WebKit`、`Trident` 等）、`version` |
| `os` | `name`、`version` |
| `cpu` | `architecture`（`amd64`、`arm64`、`x86` 等） |

---

# 第六部分 · 配置

## 30. next.config.js 核心配置

### 基本形态

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* 配置项 */
}

export default nextConfig
```

⚠️ **模块解析注意事项**：

- `next.config.ts` 的模块解析**目前仅限于 CommonJS**；仅当 Node ≥ v22.10.0 启用原生 TS 解析器时才支持 ESM
- CommonJS 项目想用原生 ESM 语法，应把文件名写成 **`next.config.mts`**
- 用 `"type": "module"` 时，项目内所有 `.js`/`.ts` 默认被视为 ESM，需 CommonJS 的文件要改成 `.cjs`/`.cts`

### 核心配置速查表

| 配置项 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `basePath` | `string` | `''` | 路径前缀 |
| `assetPrefix` | `string` | — | 静态资源 CDN 前缀 |
| `trailingSlash` | `boolean` | `false` | 是否强制尾斜杠 |
| `output` | `'standalone' \| 'export'` | — | 构建产物形态 |
| `distDir` | `string` | `'.next'` | 构建目录 |
| `pageExtensions` | `string[]` | `['tsx','ts','jsx','js']` | 页面扩展名 |
| `compress` | `boolean` | `true` | gzip 压缩 |
| `env` | `object` | — | ⚠️ 内联到 bundle |
| `images` | `object` | — | 图片优化配置 |
| `redirects` | `function` | — | 重定向规则 |
| `rewrites` | `function` | — | URL 重写 |
| `headers` | `function` | — | 自定义标头 |
| `serverExternalPackages` | `string[]` | — | 不打包的依赖 |
| `typedRoutes` | `boolean` | `false` | 路由类型检查 |
| `reactCompiler` | `boolean \| object` | `false` | React Compiler |
| `serverActions` | `object` | — | Server Action 限制 |
| `turbopack` | `object` | — | Turbopack 配置 |
| `cacheComponents` | `boolean` | `false` | 缓存组件（PPR） |
| `cacheLife` | `object` | — | 自定义缓存档案 |
| `cacheHandlers` | `object` | — | 自定义缓存存储 |
| `logging` | `object` | — | 日志配置 |
| `poweredByHeader` | `boolean` | `true` | `X-Powered-By` 标头 |
| `generateEtags` | `boolean` | `true` | 生成 ETags |
| `reactStrictMode` | `boolean` | `true` | React 严格模式 |
| `productionBrowserSourceMaps` | `boolean` | `false` | 生产 source map |
| `eslint` | — | — | ⚠️ **v16 已移除** |

### `basePath`

```js
module.exports = {
  basePath: '/docs',
}
```

⚠️ **必须在构建时设置**——它被**内联进客户端包**，不重新构建无法更改。

⚠️ **图片例外**：`next/image` **不会**自动加 `basePath`，需在 `src` 前自己写。

⚠️ `headers`/`redirects`/`rewrites` 的 `source`/`destination` 会自动加前缀，除非设 `basePath: false`。

### `assetPrefix`

```js
module.exports = {
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
}
```

⚠️ **不影响** `public/` 里的文件。
⚠️ 官方**不推荐**用它做子路径托管——那个场景应该用 `basePath`。

### `trailingSlash`

```js
module.exports = {
  trailingSlash: true,
}
```

⚠️ 设为 `true` 时**不会**追加尾斜杠的例外：静态文件 URL（带扩展名的）、`.well-known/` 下的路径。

⚠️ 与 `output: 'export'` 一起时：`/about` 会输出为 `/about/index.html`（默认是 `/about.html`）。

### `output`

| 取值 | 说明 |
|---|---|
| `'standalone'` | 自动创建 `.next/standalone`，仅复制生产必需文件，输出最小 `server.js` |
| `'export'` | 静态导出，生成 `out/` |

```bash
# standalone 需要手动复制这两个目录
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
```

```bash
node .next/standalone/server.js
PORT=8080 HOSTNAME=0.0.0.0 node server.js
```

⚠️ **monorepo 跟踪根**：默认以**项目目录**（含 `next.config.js` 的目录）为跟踪根。需要包含外部文件时设置 `outputFileTracingRoot`。

⚠️ `outputFileTracingExcludes` / `outputFileTracingIncludes` 接受 `{ [路由 glob]: [文件 glob] }`；值相对**项目根**解析。这两个选项**只作用于服务器跟踪**。

### `images`

```ts
import { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: '',
      },
    ],
  },
}

export default config
```

⚠️ **`remotePatterns` 务必写得尽量具体**，防恶意滥用。

⚠️ **默认 loader 的图片优化 API 不转发请求头** → 需要认证的图片请用 `unoptimized`。

⚠️ **Next.js 16 的图片默认值变更**：

| 配置 | 旧默认 | **新默认** | 改法 |
|---|---|---|---|
| `minimumCacheTTL` | 60s | **4h（14400s）** | `images: { minimumCacheTTL: 60 }` |
| `imageSizes` | 含 `16` | **`[32,48,64,96,128,256,384]`** | 恢复需手动加回 `16` |
| `qualities` | 允许所有 | **仅 `[75]`** | 配置 `qualities: [50, 75, 100]` |
| 本地 IP | 允许 | **阻止** | 仅私有网络设 `dangerouslyAllowLocalIP: true` |
| `maximumRedirects` | 无限 | **最多 3 次** | `maximumRedirects: 0`（禁用） |

⚠️ `qualities` 不在数组中的 `quality` 值会被**强制转成最接近的值**（如 80 → 75）。
⚠️ 带查询字符串的本地图片需配置 `localPatterns.search`（阻止枚举攻击）：

```ts
export default {
  images: {
    localPatterns: [
      { pathname: '/assets/**', search: '?v=1' },
    ],
  },
}
```

⚠️ **弃用**：`next/legacy/image`、`images.domains`（改用 `remotePatterns`）。

### `redirects`

```js
module.exports = {
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: false },
      {
        source: '/blog/:slug',
        destination: '/news/:slug',
        permanent: false,
        has: [{ type: 'header', key: 'x-custom-header', value: '.*' }],
        missing: [{ type: 'cookie', key: 'session', value: '.*' }],
      },
    ]
  },
}
```

| 字段 | 类型 | 说明 |
|---|---|---|
| `source` | `string` | 路径模式（path-to-regexp 语法） |
| `destination` | `string` | 目标路径 |
| `permanent` | `boolean` | `true` → **308**；`false` → **307** |
| `basePath` | `false` | 匹配**不含** basePath |
| `has` / `missing` | `Array` | 附加条件 |
| `statusCode` | `number` | **替代** `permanent` |

`has`/`missing` 字段：

| 字段 | 类型 | 说明 |
|---|---|---|
| `type` | `'header' \| 'cookie' \| 'host' \| 'query'` | 必填 |
| `key` | `string` | 要匹配的键 |
| `value` | `string` | `undefined` 表示任意值都匹配；支持正则捕获组 `first-(?<paramName>.*)` |

⚠️ **路径匹配规则**：

- `/old-blog/:slug` 匹配 `/old-blog/first-post`，**不匹配** `/old-blog/a/b`（不支持嵌套）
- **锚定在开头**：`/old-blog/:slug` **不匹配** `/archive/old-blog/first-post`
- 修饰符：`*`（0+）、`+`（1+）、`?`（0 或 1）
- 正则：`/post/:slug(\\d{1,})` 匹配 `/post/123` 不匹配 `/post/abc`
- ⚠️ **冒号 `:` 前必须包含正斜杠 `/`**，否则整段被当字面量 → **无限重定向风险**

⚠️ **重定向不作用于客户端路由**（`Link`、`router.push`）——除非有匹配的 `proxy`。

### `rewrites`

重写 = URL 代理，**屏蔽**目标路径（用户看起来没换位置）。

```js
module.exports = {
  async rewrites() {
    return {
      beforeFiles: [{ source: '/before', destination: '/rewrite-before' }],
      afterFiles:  [{ source: '/after',  destination: '/rewrite-after'  }],
      fallback:    [{ source: '/:path*', destination: '/' }],
    }
  },
}
```

返回数组时（简写形式），重写在**文件系统之后、动态路由之前**应用。

#### ⚠️ Next.js 路由检查顺序（7 步）

1. `headers`（`next.config.js`）
2. `redirects`（`next.config.js`）
3. **`proxy`**
4. `beforeFiles` 重写
5. 检查/提供 公共目录、`_next/static`、非动态页面的静态文件
6. `afterFiles` 重写；每次匹配后检查动态路由/静态文件
7. `fallback` 重写 —— 在渲染 404 页面**之前**应用

⚠️ **`beforeFiles` 的陷阱**：匹配源后**不会立即检查文件系统/动态路由**，会继续直到检查完所有 `beforeFiles`。
⚠️ 若在 `getStaticPaths` 中用 `fallback: true | 'blocking'`，`fallback` rewrites **不会运行**。

**重写参数规则**：

| 情况 | 结果 |
|---|---|
| `destination` 中**未使用**参数 | 参数默认在**查询字符串**中透传 |
| `destination` 中**使用了**参数 | **不**自动透传任何查询参数 |

⚠️ 重写到外部 URL 时，若 `trailingSlash: true`，**还需在 `source` 里插入尾斜杠**。

### `headers`

```js
module.exports = {
  async headers() {
    return [
      { source: '/about', headers: [{ key: 'x-hello', value: 'world' }] },
      {
        source: '/:path*',
        headers: [
          { key: 'x-custom-header', value: 'my-custom-header-value' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'none';" },
        ],
        has: [{ type: 'header', key: 'x-nextjs-data', value: '.*' }],
      },
    ]
  },
}
```

⚠️ **同路径 + 同 header key 的两条规则，最后一条胜出。**
⚠️ **不可覆盖的缓存头**：真正不可变的资源会设 `Cache-Control: public, max-age=31536000, immutable`，**无法覆盖**。

**常用安全头清单**：

| 标头 | 用途 |
|---|---|
| `Strict-Transport-Security` | 强制 HTTPS |
| `X-Frame-Options` | ⚠️ 已被 CSP 的 `frame-ancestors` 取代 |
| `X-Content-Type-Options` | ⚠️ **唯一有效值 `nosniff`** |
| `Referrer-Policy` | Referrer 策略 |
| `Permissions-Policy` | 特性策略（原 `Feature-Policy`） |
| `Content-Security-Policy` | CSP |

### `env`

```js
module.exports = {
  env: {
    customKey: 'my-value',
  },
}
```

⚠️ 这里指定的环境变量**始终**被打进 JS bundle。`next build` 时会把 `process.env.customKey` 替换成字面量。

⚠️ **不能解构 `process.env`**（webpack `DefinePlugin` 限制）：

```js
// ❌ 行不通
const { customKey } = process.env
```

### `serverExternalPackages`

```js
module.exports = {
  serverExternalPackages: ['@prisma/client', 'sharp'],
}
```

依赖用了 Node.js 特有能力时，退出打包改用原生 `require`。v15.0.0 从 experimental 转正。

**已内置自动 opt-out 的包**（部分）：

`@prisma/client`、`@sentry/profiling-node`、`bcrypt`、`better-sqlite3`、`canvas`、`chromadb-default-embed`、`cypress`、`express`、`firebase-admin`、`htmlrewriter`、`isolated-vm`、`jest`、`jsdom`、`keyv`、`libsql`、`mongodb`、`mongoose`、`onnxruntime-node`、`pg`、`pino`、`playwright`、`postcss`、`prettier`、`prisma`、`puppeteer`、`sharp`、`shiki`、`sqlite3`、`typescript`、`vscode-oniguruma`、`webpack`、`websocket` 等。

### `optimizePackageImports`

⚠️ 仍在 `experimental` 下。

```js
module.exports = {
  experimental: {
    optimizePackageImports: ['@my/ui-lib'],
  },
}
```

**默认已优化**：`lucide-react`、`date-fns`、`lodash-es`、`antd`、`@mui/material`、`@headlessui/react`、`react-icons/*`、`date-fns`、`recharts` 等。

### `typedRoutes`

⚠️ **已标记为稳定**——用 `typedRoutes` 而非 `experimental.typedRoutes`。

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
}

export default nextConfig
```

```tsx
'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Example() {
  const router = useRouter()
  const slug = 'nextjs'

  return (
    <>
      {/* 字面量和动态字符串都校验 */}
      <Link href="/about" />
      <Link href={`/blog/${slug}`} />
      {/* 非字面量需 as Route */}
      <Link href={('/blog/' + slug) as Route} />
      {/* ⚠️ 无效路由会报 TypeScript 错误 */}
      <Link href="/aboot" />

      <button onClick={() => router.push('/about')}>Push About</button>
      {/* 非字面量需 as Route */}
      <button onClick={() => router.push(('/blog/' + slug) as Route)}>
        Push Non-literal Blog
      </button>
    </>
  )
}
```

⚠️ 非 `create-next-app` 项目需**手动把 `.next/types/**/*.ts` 加进 `tsconfig.json` 的 `include`**。
⚠️ Pages Router 的 `next/router` 方法**不做类型检查**。

**封装 `<Link>` 的自定义组件要用泛型**：

```tsx
import type { Route } from 'next'
import Link from 'next/link'

function Card<T extends string>({ href }: { href: Route<T> | URL }) {
  return (
    <Link href={href}>
      <div>My Card</div>
    </Link>
  )
}
```

### `reactCompiler`

```bash
npm install -D babel-plugin-react-compiler
```

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
}

export default nextConfig
```

⚠️ **默认关闭**（正在收集构建性能数据）。⚠️ **依赖 Babel → 编译时间预计变长**。

**opt-in（annotation）模式**：

```ts
export default {
  reactCompiler: { compilationMode: 'annotation' },
}
```

```ts
export default function Page() {
  'use memo'
  // ...
}
```

⚠️ 可用 `'use no memo'` 指令对组件/钩子 **opt-out**。

### `serverActions`

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverActions: {
    // 允许调用 Server Action 的额外来源域名（防 CSRF）
    allowedOrigins: [],
    // 请求体上限
    bodySizeLimit: '3mb',
  },
}

export default nextConfig
```

| 字段 | 默认 | 说明 |
|---|---|---|
| `allowedOrigins` | `undefined` | 额外安全源域列表（未提供则只允许同源） |
| `bodySizeLimit` | `1mb` | 请求体最大值。默认限制防 DDoS |

### `logging`

```js
module.exports = {
  logging: {
    fetches: {
      logging: { fetches: { fullUrl: true } },
      hmrRefreshes: true,
    },
    incomingRequests: true,
  },
}
```

⚠️ **目前只作用于用 `fetch` API 获取数据**。
⚠️ `incomingRequests` 仅开发日志，**不影响生产**。
⚠️ 设 `logging: false` 禁用开发日志。

### TypeScript 配置

⚠️ `next-env.d.ts` 由 `next dev`/`next build`/`next typegen` **自动重新生成**，不要手改。要自定义类型就另建 `new-types.d.ts` 并在 `tsconfig.json` 引用。建议加入 `.gitignore`，但**必须**在 `include` 里。

⚠️ 已有 `jsconfig.json` 时：把 `paths` 复制到新 `tsconfig.json`，然后删掉 `jsconfig.json`。

### ESLint

⚠️ **`next lint` 已在 v16 移除**，`next.config.js` 的 `eslint` 选项**也不再需要**。

```bash
npx @next/codemod@canary next-lint-to-eslint-cli .
```

**主要规则**：

| 规则 | 描述 |
|---|---|
| `@next/next/no-img-element` | 禁止 `<img>`（LCP 慢、带宽高） |
| `@next/next/no-html-link-for-pages` | 禁止用 `<a>` 导航到内部页面 |
| `@next/next/no-sync-scripts` | 禁止同步脚本 |
| `@next/next/no-async-client-component` | 防止客户端组件为 async 函数 |
| `@next/next/google-font-display` | 强制字体显示行为 |
| `@next/next/no-css-tags` | 禁止手写样式表标签 |
| `@next/next/no-unwanted-polyfillio` | 防止重复 polyfill |

---

## 31. Turbopack 打包器

Turbopack 是 Rust 编写的、针对 JS/TS 优化的**增量打包器**，**Next.js 16 起是默认打包器，零配置**。

需要 webpack 时用 `--webpack` 标志。

### 语言特性支持

| 功能 | 状态 | 注意 |
|---|---|---|
| JS / TS | 支持 | 后台用 SWC。**不做类型检查** |
| CommonJS | 支持 | `require()` 开箱即用 |
| ESM | 支持 | 静态与动态 `import` 完全支持 |
| Babel | 支持 | ⚠️ **从 v16 起**检测到配置文件即自动用 Babel；但 SWC **始终**用于内部转换 |
| RSC | 支持 | — |
| Fast Refresh | 支持 | — |
| **根布局创建** | ❌ **不支持** | Turbopack 会提示你手动创建 |

### CSS / 样式

| 功能 | 状态 | 注意 |
|---|---|---|
| 全局 CSS / CSS Modules / 嵌套 / `@import` / PostCSS | 支持 | CSS Modules 由 **Lightning CSS** 原生支持 |
| Sass / SCSS | 支持 | ⚠️ **自定义 Sass 函数 `sassOptions.functions` 不支持** |
| ⚠️ `:local` / `:global` 独立伪类 | ❌ | 只支持函数变体 `:global(...)` |
| ⚠️ `.css` 文件 | **永远是全局的** | 不同于 webpack，需用 `.module.css` |

### ⚠️ 五个 Webpack 迁移陷阱

**1. `next.config.js` 中的 `webpack()` 配置被 Turbopack 取代，直接不识别**

```ts
// ❌ 不再生效
export default {
  webpack: (config) => { /* ... */ return config },
}

// ✅ 改用 Turbopack 配置
export default {
  turbopack: {
    rules: { /* ... */ },
    resolveAlias: { /* ... */ },
    resolveExtensions: [/* ... */],
    root: '/absolute/path',
    debugIds: true,
  },
}
```

⚠️ **有自定义 `webpack` 配置时 `next build` 会失败**（防配置错误）→ 三选一：`next build --turbopack`（忽略 webpack 配置）/ 迁移到 Turbopack / `--webpack` 退出。

**2. 文件系统根目录**——根外文件不解析

Turbopack 自动检测根目录，靠查找：`pnpm-lock.yaml`、`package-lock.json`、`yarn.lock`、`bun.lock`、`bun.lockb`

```ts
export default {
  turbopack: {
    // 必须是「项目 + 被链接依赖」的父目录
    root: '/absolute/path/to/parent',
  },
}
```

**3. Sass `~` 波浪号语法不支持**

```scss
/* ❌ Webpack 风格 */
@import '~bootstrap/dist/css/bootstrap.min.css';

/* ✅ Turbopack */
@import 'bootstrap/dist/css/bootstrap.min.css';
```

兜底：

```ts
export default {
  turbopack: {
    resolveAlias: { '~*': '*' },
  },
}
```

**4. CSS Modules 顺序**

Turbopack **遵循 JS import 顺序**。若样式依赖特定顺序 → 用 `@import utils.module.css` 强制顺序。

**5. Webpack 插件不支持**

⚠️ 支持 webpack **loader**，但**不支持插件**。依赖 webpack 插件系统的第三方工具会受影响。

### Turbopack loader 条件

| 条件 | 含义 |
|---|---|
| `browser` | 匹配将在客户端执行的代码（用 `{not: 'browser'}` 匹配服务器代码） |
| `foreign` | 匹配 `node_modules` + 部分 Next.js 内部代码。**通常要把 loader 限制在 `{not: 'foreign'}` 中以提升性能** |
| `development` / `production` | 按命令 |
| `node` / `edge-light` | 按运行时 |

**已测试兼容的 loader**：`babel-loader`、`@svgr/webpack`、`svg-inline-loader`、`yaml-loader`、`string-replace-loader`、`raw-loader`、`sass-loader`、`graphql-tag/loader`

⚠️ **缺失的 webpack loader API**：`importModule` ❌、`loadModule` ❌、`emitFile` ❌、`utils` ❌、`resolve` ❌（改用 `getResolve`）、`fs` ⚠️ **仅实现 `readFile`**。

⚠️ **只支持返回 JavaScript 代码的 loader**——不支持转换样式表或图片的 loader。

### 性能对比

⚠️ **比较 webpack 与 Turbopack 性能时，请先删 `.next` 做冷构建对比**，或启用 FS 缓存做热构建对比。

```bash
# Turbopack tracing
NEXT_TURBOPACK_TRACING=1 next dev
# 生成 .next/dev/trace-turbopack
npx next internal trace .next/dev/trace-turbopack
```

### ⚠️ 其他不支持项

- Yarn PnP（暂无计划）
- `experimental.urlImports`（暂无计划）
- `experimental.esmExternals`（不再支持旧配置）

---

## 32. 内置组件

### `<Image>`

```tsx
import Image from 'next/image'
import profilePic from './me.png'

export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      // width={500} 自动提供
      // height={500} 自动提供
      // blurDataURL="data:..." 自动提供
      // placeholder="blur" // 可选的加载中模糊占位
    />
  )
}
```

#### Props 完整表

| Prop | 类型 | 说明 |
|---|---|---|
| `src` | 字符串 | **必需**。内部路径 / 绝对外部 URL（需 `remotePatterns`）/ 静态导入 |
| `alt` | 字符串 | **必需**。⚠️ 纯装饰性图片应写 `alt=""` |
| `width` / `height` | 整数(px) | ⚠️ **intrinsic 尺寸**，用于推断宽高比、**避免 CLS**；**不决定渲染尺寸** |
| `fill` | 布尔 | 扩展到父元素大小。⚠️ **父元素必须 `position: relative/fixed/absolute`** |
| `loader` | 函数 | ⚠️ 接受函数的 prop **需要客户端组件** |
| `sizes` | 字符串 | 断点处的图片尺寸。⚠️ 缺省时浏览器假定 `100vw`，可能下载不必要的大图 |
| `quality` | 整数(1–100) | ⚠️ 不在 `qualities` 配置中的值会被强制转成最接近的 |
| `preload` | 布尔 | 在 `<head>` 插入 `<link>` 预加载 |
| `placeholder` | 字符串 | `empty`（默认）/ `blur` / `data:image/...` |
| `style` | 对象 | ⚠️ **用 `style` 自定义宽度时必须同时设 `height: 'auto'`** |
| `onLoad` / `onError` | 函数 | ⚠️ 需要客户端组件 |
| `loading` | 字符串 | `lazy`（默认）/ `eager` |
| `blurDataURL` | 字符串 | ⚠️ **建议用 ≤10px 的极小图片**，大的会伤性能 |
| `unoptimized` | 布尔 | 原样提供，不优化 |
| `overrideSrc` | 字符串 | 覆盖生成的 `src`（`srcset` 仍生成） |
| `decoding` | 字符串 | `async` / `sync` / `auto` |
| `onLoadingComplete` | 函数 | ⚠️ **已弃用**，改用 `onLoad` |

⚠️ **Next.js 16：`priority` 属性已弃用**，由 `preload` 取代。

⚠️ **`preload` 的判断标准**：

- ✅ 该用：图片是 **LCP** 元素；首屏上方；希望在 `<head>` 就开始加载
- ❌ 不该用：视口中可能有多个图片都可能被判为 LCP；已用 `loading`；已用 `fetchPriority`
- **原文结论：大多数情况下应该用 `loading="eager"` 或 `fetchPriority="high"` 而不是 `preload`**

**主题检测（明/暗模式）**：

```tsx
import styles from './theme-image.module.css'
import Image, { ImageProps } from 'next/image'

type Props = Omit<ImageProps, 'src' | 'preload' | 'loading'> & {
  srcLight: string
  srcDark: string
}

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props

  return (
    <>
      <Image {...rest} src={srcLight} className={styles.imgLight} />
      <Image {...rest} src={srcDark} className={styles.imgDark} />
    </>
  )
}
```

⚠️ `loading="lazy"` 的默认行为确保只加载正确的图片；**不能**用 `preload` 或 `loading="eager"`（会两个都加载），改用 `fetchPriority="high"`。

### `next/font`

自动优化字体并**移除外部网络请求**。Google 字体的 CSS 与字体文件在**构建时**下载并自托管——**浏览器不向 Google 发任何请求**。

```tsx
import { Inter } from 'next/font/google'

// 加载可变字体时不需要指定 weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

#### 选项表

| 键 | `font/google` | `font/local` | 默认 |
|---|---|---|---|
| `src` | | ✅ | **必需**（local） |
| `weight` | ✅ | ✅ | 可变字体可选 / 非可变必填 |
| `style` | ✅ | ✅ | `'normal'` |
| `subsets` | ✅ | | — |
| `axes` | ✅ | | 仅含字体粗细 |
| `display` | ✅ | ✅ | **`'swap'`** |
| `preload` | ✅ | ✅ | **`true`** |
| `fallback` | ✅ | ✅ | 无默认 |
| `adjustFontFallback` | ✅ | ✅ | google: `true`；local: `'Arial'` |
| `variable` | ✅ | ✅ | — |
| `declarations` | | ✅ | — |

**本地字体**：

```js
const roboto = localFont({
  src: [
    { path: './Roboto-Regular.woff2', weight: '400', style: 'normal' },
    { path: './Roboto-Italic.woff2', weight: '400', style: 'italic' },
    { path: './Roboto-Bold.woff2', weight: '700', style: 'normal' },
    { path: './Roboto-BoldItalic.woff2', weight: '700', style: 'italic' },
  ],
})
```

⚠️ **多词字体名用下划线**：`Roboto Mono` → 导入为 `Roboto_Mono`。
⚠️ `preload: true`（默认）但**未指定 `subsets` 会产生警告**。
⚠️ **谨慎使用多字体**——每种新字体都是客户端必须下载的额外资源。
⚠️ **每次调用字体函数都是独立实例**——需要共享时集中定义在 `fonts.ts`：

```ts
// fonts.ts
import { Inter, Lora, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter()
const lora = Lora()
const sourceCodePro400 = Source_Sans_3({ weight: '400' })
const sourceCodePro700 = Source_Sans_3({ weight: '700' })
const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })

export { inter, lora, sourceCodePro400, sourceCodePro700, greatVibes }
```

**预加载规则**（重要）：

| 调用位置 | 预加载范围 |
|---|---|
| 独特的 `page` | 该页面的**唯一路由** |
| `layout` | 该布局包含的**所有路由** |
| **根布局** | **所有路由** |

**Tailwind 集成**：

```tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto_mono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  )
}
```

```css
@import 'tailwindcss';

@theme inline {
  --font-sans: var(--font-inter);
  --font-mono: var(--font-roboto-mono);
}
```

### `<Script>`

```tsx
import Script from 'next/script'

export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

#### 四种 `strategy`

| 策略 | 加载时机 | 放置约束 | 典型用途 |
|---|---|---|---|
| `beforeInteractive` | 在任何 Next.js 代码之前、任何页面水合之前 | **必须放在根布局** | 机器人检测器、Cookie 同意管理器 |
| `afterInteractive`（**默认**） | 尽早加载，但在页面部分/全部水合之后 | 任意页面或布局 | 标签管理器、分析 |
| `lazyOnload` | 浏览器空闲时，且在所有资源获取之后 | 任意页面或布局 | 聊天支持、社交小部件 |
| `worker` | 卸载到 Web Worker | ⚠️ **只能在 `pages/` 目录用** | 释放主线程 |

⚠️ **三个回调只能在客户端组件中使用**（需要 `'use client'`）：`onLoad`、`onReady`、`onError`。
⚠️ `onLoad` / `onError` **不能与 `beforeInteractive` 一起用**。
⚠️ `beforeInteractive` **无论放在组件什么位置，都会被注入到 `<head>`**。
⚠️ `worker` 策略**尚不稳定、尚不适用于 App Router**。
⚠️ **内联脚本必须分配 `id`**。

```tsx
'use client'

import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js"
        onLoad={() => {
          console.log(_.sample([1, 2, 3, 4]))
        }}
      />
    </>
  )
}
```

### `<Form>`

见第 15 节。

---

## 33. CSS 与样式

### 五种方式

| 方式 | 用法 |
|---|---|
| **Tailwind CSS** | `import 'tailwindcss'` |
| **CSS Modules** | `*.module.css` |
| **全局 CSS** | 导入到根布局 |
| **外部样式表** | `import 'bootstrap/dist/css/bootstrap.css'` |
| **Sass** | `.scss` / `.sass` |

**Tailwind 安装**：

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

```css
/* app/globals.css */
@import 'tailwindcss';
```

**CSS Modules**：

```css
/* app/blog.module.css */
.blog {
  padding: 24px;
}
```

```tsx
import styles from './blog.module.css'

export default function Page() {
  return <main className={styles.blog}></main>
}
```

**全局 CSS**：

```css
/* app/global.css —— 应用到每个路由 */
body {
  padding: 20px 20px 60px;
  max-width: 680px;
  margin: 0 auto;
}
```

```tsx
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### ⚠️ 样式顺序

**CSS 顺序取决于代码中导入样式的顺序。**

```tsx
// app/page.tsx
import { BaseButton } from './base-button'
import styles from './page.module.css'

export default function Page() {
  return <BaseButton className={styles.primary} />
}
```

```tsx
// app/base-button.tsx
import styles from './base-button.module.css'

export function BaseButton() {
  return <button className={styles.primary} />
}
```

⚠️ **CSS 排序在开发过程中可能有所不同，请务必检查构建（`next build`）以验证最终的 CSS 顺序。**

⚠️ 全局样式可导入到 `app` 目录内的任何布局、页面或组件。但**导航时不会删除样式表**，可能冲突。

⚠️ 建议关闭自动排序导入的 linters/格式化程序（如 ESLint 的 `sort-imports`）。

### 开发 vs 生产

| | 开发（`next dev`） | 生产（`next build`） |
|---|---|---|
| CSS 更新 | 立即应用到快速刷新 | 合并成压缩、代码拆分的 `.css` 文件 |
| JS 禁用后 | — | CSS 仍会加载 |
| 快速刷新 | ⚠️ **需要 JavaScript** | — |

### Sass

```bash
npm install --save-dev sass
```

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
  },
}

export default nextConfig
```

`:export` 导出变量：

```scss
$primary-color: #64ff00;

:export {
  primaryColor: $primary-color;
}
```

⚠️ `.scss`（SCSS 语法）与 `.sass`（缩进语法）各需对应扩展名；不确定就用 `.scss`（CSS 超集）。

### CSS-in-JS

⚠️ **警告**：CSS-in-JS 与 Server Components / 流式渲染配合**需要库作者支持最新 React**。

**已支持**：`ant-design`、`chakra-ui`、`@fluentui/react-components`、`@mui/material`、`styled-jsx`、`styled-components`、`stylex`、`tamagui`、`vanilla-extract` 等。

**三步配置法**：① 收集 CSS 规则的样式注册表 ② `useServerInsertedHTML` 钩子在使用前注入规则 ③ 一个 Client Component 在 SSR 期间用注册表包裹应用。

`styled-jsx`（需 v5.1.0+）：

```tsx
'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleRegistry, createStyleRegistry } from 'styled-jsx'

export default function StyledJsxRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [jsxStyleRegistry] = useState(() => createStyleRegistry())

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles()
    jsxStyleRegistry.flush()
    return <>{styles}</>
  })

  return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>
}
```

`styled-components@6+`：

```tsx
'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}
```

⚠️ 样式注册表组件**故意放在树顶层用 Client Component**——提取 CSS 更高效、避免后续 SSR 重新生成、防止样式进入 Server Component 载荷。

---

## 34. 元数据与 SEO

### 三个来源

1. 静态 `metadata` 对象
2. 动态 `generateMetadata` 函数
3. 特殊文件约定（favicons / OG 图片）

⚠️ **仅服务器组件支持 `metadata` 和 `generateMetadata` 导出。**
⚠️ **不能从同一路由段同时导出** `metadata` 对象和 `generateMetadata`。

**始终添加的两个默认 meta**：

```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### 静态 metadata

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Blog',
  description: '...',
}
```

### 动态 generateMetadata

```tsx
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params

  const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // 可选：访问并扩展（而非替换）父级元数据
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}
```

⚠️ `searchParams` **仅适用于 `page.js` 段**。
⚠️ `redirect()` 和 `notFound()` 可以在 `generateMetadata` 内部使用。

### `title` 的三种形式

```tsx
export const metadata: Metadata = {
  title: {
    default: 'Acme',              // 后备标题
    template: '%s | Acme',        // 模板
    absolute: 'About',            // 忽略父级 template
  },
}
```

⚠️ **`title.template` 陷阱**：

- 添加 `title.template` 时**需要** `title.default`
- ⚠️ **`layout.js` 中定义的 `title.template` 不适用于同一段的 `page.js` 中定义的 `title`**
- ⚠️ **`page.js` 中定义的 `title.template` 无效**（页面始终是终止段）
- 如果路由未定义 `title` 或 `title.default`，`title.template` 无效

**`layout.js` 中的语义**：

| 字段 | 语义 |
|---|---|
| `title`（字符串）/ `title.default` | 子段的默认标题，**从最近的父段增加 `title.template`** |
| `title.absolute` | 子段的默认标题，**忽略**父段的 `title.template` |
| `title.template` | 为子段定义**新的**模板 |

**`page.js` 中的语义**：

| 字段 | 语义 |
|---|---|
| 无标题 | 使用最接近父级解析的标题 |
| `title`（字符串） | 定义路由标题，会**增加** `title.template` |
| `title.absolute` | 定义路由标题，**忽略**父段的 `title.template` |
| `title.template` | **无任何作用** |

### `metadataBase`

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://acme.com'),
}
```

| `metadata` 字段 | 解析的 URL |
|---|---|
| `/` | `https://acme.com` |
| `payments` | `https://acme.com/payments` |
| `../payments` | `https://acme.com/payments` |
| `https://beta.acme.com/payments` | `https://beta.acme.com/payments` |

⚠️ 通常在**根 `app/layout.js`** 中设置。
⚠️ 如果 `metadata` 字段提供绝对 URL，则 `metadataBase` 将被**忽略**。
⚠️ 在基于 URL 的字段中使用**相对路径而不配置 `metadataBase` 将导致构建错误**。
⚠️ Next.js 会将 `metadataBase`（如 `https://acme.com/`）和相对字段（如 `/path`）之间的**重复斜杠标准化为单斜杠**。

### 排序与合并

**排序**：从根段直到最接近最终 `page.js` 的段依次评估。

**合并**：从同一路由中多个段导出的元数据对象被**浅层合并**；重复的键按顺序被替换 → 较早段中定义的嵌套字段（如 `openGraph`）将被最后一个段**整体覆盖**。

| 情况 | 行为 |
|---|---|
| **覆盖字段** | 某段设置了 `openGraph` → 所有 `openGraph` 字段在该段替换 |
| **继承字段** | 某段**未设置** `openGraph` → 从父段**继承**全部 |

### `viewport` / `generateViewport`

⚠️ `metadata` 中的 `themeColor`、`colorScheme`、`viewport` 已弃用，改用 viewport 配置。

```tsx
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: 'black',
}
```

```tsx
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}
```

```tsx
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark',
  interactiveWidget: 'resizes-visual',
}
```

⚠️ 使用 Cache Components 时，**与元数据不同，视口数据不能流式传输**——如果延迟到请求时，**页面需要阻塞直到解析完成**。

### 流式元数据

⚠️ 当 `generateMetadata` 解析时，标签会附加到 `<body>`（执行 JS 的机器人能正确解析）。对于**无法执行 JS 的 HTML 限制型机器人**（如 `facebookexternalhit`），元数据**仍会阻止页面渲染**，生成的元数据存储在 `<head>` 中。

```ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  htmlLimitedBots: /.*/,
}

export default config
```

⚠️ 覆盖 `htmlLimitedBots` 可能导致更长的响应时间。

### 动态 OG 图片

```tsx
import { ImageResponse } from 'next/og'
import { getPost } from '@/app/lib/data'

export const alt = 'My site'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {post.title}
      </div>
    ),
    { ...size }
  )
}
```

⚠️ **限制**：

- **仅支持 flexbox 和 CSS 属性的子集**——`display: grid` **不起作用**
- ⚠️ **最大打包尺寸 `500KB`**（含 JSX、CSS、字体、图片）
- 仅支持 `ttf`、`otf`、`woff` 字体。为最大化解析速度，**`ttf` 或 `otf` 优于 `woff`**
- 底层使用 `@vercel/og`、Satori 和 Resvg

⚠️ **v16：`params` 变 Promise** —— `await params`。

**自定义字体**：

```tsx
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default async function Image() {
  const interSemiBold = await readFile(
    join(process.cwd(), 'assets/Inter-SemiBold.ttf')
  )

  return new ImageResponse(<div>...</div>, {
    ...size,
    fonts: [
      { name: 'Inter', data: interSemiBold, style: 'normal', weight: 400 },
    ],
  })
}
```

### `generateSitemaps`

```ts
import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/app/lib/constants'

export async function generateSitemaps() {
  // Google 的限制是每个 sitemap 50,000 个 URL
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap(props: {
  id: Promise<string>   // ⚠️ v16 起是 Promise
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id
  const start = id * 50000
  const end = start + 50000
  const products = await getProducts(
    `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`
  )
  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: product.date,
  }))
}
```

生成的 sitemap 在 `/product/sitemap/1.xml` 可用。

### JSON-LD

⚠️ **核心安全要求**：`JSON.stringify` **不会**过滤 XSS 注入中的恶意字符串 → 必须把 `<` 替换为 `\u003c`：

```tsx
export default async function Page({ params }) {
  const { id } = await params
  const product = await getProduct(id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
  }

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </section>
  )
}
```

类型化用 `schema-dts` 的 `WithContext<Product>`。

### ⚠️ 不支持的元数据

| 元数据 | 建议 |
|---|---|
| `<meta http-equiv="...">` | 用适当的 HTTP 标头（`redirect()`、proxy、安全标头） |
| `<base>`、`<noscript>` | 在布局或页面本身中渲染标签 |
| `<style>`、`<script>` | 见样式 / 脚本文档 |
| `<link rel="stylesheet" />` | `import` 样式表 |
| `<link rel="preload" />` | 用 ReactDOM 预加载方法 |
| `<link rel="preconnect" />` | 用 ReactDOM 预连接方法 |
| `<link rel="dns-prefetch" />` | 用 ReactDOM 预取 DNS 方法 |

**ReactDOM 资源提示**（⚠️ 目前**仅在客户端组件中支持**）：

```tsx
'use client'

import ReactDOM from 'react-dom'

export function PreloadResources() {
  ReactDOM.preload('...', { as: '...' })
  ReactDOM.preconnect('...', { crossOrigin: '...' })
  ReactDOM.prefetchDNS('...')

  return '...'
}
```

### `instrumentation.ts`

```ts
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel({ serviceName: 'next-app' })
}
```

```ts
import { type Instrumentation } from 'next'

export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context
) => {
  await fetch('https://.../report-error', {
    method: 'POST',
    body: JSON.stringify({ message: err.message, request, context }),
    headers: { 'Content-Type': 'application/json' },
  })
}
```

**精确签名**：

```ts
export function onRequestError(
  error: { digest: string } & Error,
  request: {
    path: string
    method: string
    headers: { [key: string]: string | string[] }
  },
  context: {
    routerKind: 'Pages Router' | 'App Router'
    routePath: string
    routeType: 'render' | 'route' | 'action' | 'proxy'
    renderSource:
      | 'react-server-components'
      | 'react-server-components-payload'
      | 'server-rendering'
    revalidateReason: 'on-demand' | 'stale' | undefined
    renderType: 'dynamic' | 'dynamic-resume'
  }
): void | Promise<void>
```

⚠️ 在 `onRequestError` 中运行任何异步任务，**必须确保被 await**。
⚠️ **`error` 实例可能不是抛出的原始错误实例**——React 可能已处理它。此时用 `digest` 识别实际错误类型。
⚠️ 文件放在**项目根目录**（不是 `app`/`pages` 里）；用 `src` 时放在 `src` 内。

**按运行时区分**：

```ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-node')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./instrumentation-edge')
  }
}
```

⚠️ **官方建议在 `register` 函数内部导入**（而非文件顶部），以集中副作用、避免顶层全局导入的意外后果。

### 性能分析

```tsx
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP': {
        // handle FCP
      }
      case 'LCP': {
        // handle LCP
      }
    }
  })
}
```

> ⚠️ **最佳实践**：做成根布局导入的独立组件，把客户端边界限制在 `WebVitals` 组件内。

指标：`TTFB`、`FCP`、`LCP`、`INP`（原 FID）、`CLS`。

---

## 35. 代理 Proxy（原 Middleware）

### ⚠️ Next.js 16 核心变化

**`middleware` 命名约定已弃用并重命名为 `proxy`（v16.0.0）。**

**为什么改名**：

- "中间件"常与 Express.js 中间件混淆导致误用；官方**建议尽量避免依赖它**
- `proxy` 明确它在应用前方有一个**网络边界**；且中间件默认在边缘运行时运行、可更靠近客户端

**迁移命令**：

```bash
npx @next/codemod@canary middleware-to-proxy .
```

```diff
- export function middleware() {
+ export function proxy() {
```

#### ⚠️ 运行时差异（关键变化）

| | `middleware` | `proxy` |
|---|---|---|
| 默认运行时 | **Edge**（v15.5 起支持 Node.js） | **Node.js** |
| `runtime` 配置 | 可设 `{ runtime: 'nodejs' }` | ⚠️ **不提供；在 proxy 中设置会引发错误** |

⚠️ **需要 edge 的认证库需继续用 `middleware`。**

### 基本用法

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 内部用 await 时可标为 async
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

// 也可以用默认导出：
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: '/about/:path*',
}
```

**命名**：项目根目录 `proxy.ts`（或 `.js`），或在 `src` 中（与 `pages`/`app` 同级）。
⚠️ 若自定义了 `pageExtensions`，要命名为 `proxy.page.ts` / `proxy.page.js`。
⚠️ **每个项目只支持一个 `proxy.ts` 文件**——但可以把逻辑组织成模块后导入。

### `matcher` 完整约定

| 形式 | 示例 |
|---|---|
| 单路径字符串 | `'/about'` |
| 多路径数组 | `['/about', '/contact']` |
| 正则 | `['/((?!api\|_next/static\|_next/image\|.*\\.png$).*)']` |
| **对象数组** | 见下 |

**对象数组的键**：

| 键 | 必需 | 说明 |
|---|---|---|
| `source` | 是 | 路径或模式 |
| `locale` | 否 | `false` 时忽略基于 locale 的路由匹配 |
| `has` | 否 | 按特定请求元素（header / query / cookie）的**存在**加条件 |
| `missing` | 否 | 关注**缺少**某些请求元素的情况 |

**五条匹配规则**：

1. ⚠️ **必须以 `/` 开头**
2. 可含命名参数：`/about/:path` 匹配 `/about/a`、`/about/b`，**不匹配** `/about/a/c`
3. 修饰符：`/about/:path*` 匹配 `/about/a/b/c`（`*` = 0 或更多）；`?` = 0 或 1；`+` = 1 或更多
4. 括号正则：`/about/(.*)` 与 `/about/:path*` 等价
5. ⚠️ **锚定到路径开头**：`/about` 匹配 `/about` 和 `/about/team`，**不匹配** `/blog/about`

⚠️ **`matcher` 值必须是常量**以便构建时静态分析——变量等动态值会被**忽略**。
⚠️ 出于向后兼容，`/public` 始终被视为 `/public/index`。

### 三个用例

**1. 条件语句**：

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}
```

**2. Cookie 操作**：

```ts
export function proxy(request: NextRequest) {
  let cookie = request.cookies.get('nextjs')
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }

  request.cookies.has('nextjs') // => true
  request.cookies.delete('nextjs')
  request.cookies.has('nextjs') // => false

  const response = NextResponse.next()
  response.cookies.set('vercel', 'fast')
  return response
}
```

**3. 设置标头**（⚠️ 原文特别澄清）：

```ts
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-proxy1', 'hello')

  // ⚠️ 必须是 next({ request: { headers } })，不是 next({ headers })
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.headers.set('x-hello-from-proxy2', 'hello')
  return response
}
```

⚠️ **避免设置大标头**，可能触发 `431 Request Header Fields Too Large`。

### CORS

```tsx
import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = ['https://acme.com', 'https://my-app.org']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function proxy(request: NextRequest) {
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/:path*',
}
```

### 后台任务 `waitUntil`

```ts
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export function proxy(req: NextRequest, event: NextFetchEvent) {
  event.waitUntil(
    fetch('https://my-analytics-platform.com', {
      method: 'POST',
      body: JSON.stringify({ pathname: req.nextUrl.pathname }),
    })
  )

  return NextResponse.next()
}
```

### ⚠️ Proxy 独有的关键陷阱

- ⚠️ **代理应独立于渲染代码调用**——优化场景下代理会部署到 CDN 以快速处理重定向/重写 → **不要依赖共享模块或全局变量**
- **传递信息到应用只能通过**：headers、cookies、`rewrites`、`redirects` 或 URL
- ⚠️ **即使在否定匹配模式中排除了 `_next/data`，代理仍会针对该路由被调用**——这是**有意为之**，防止"保护了页面却忘了保护对应路由"
- ⚠️ **不适用于缓慢的数据获取**——不应被用作完整的会话管理或授权方案
- ⚠️ **在 proxy 中使用 `options.cache`、`options.next.revalidate` 或 `options.next.tags` 无效**
- ⚠️ 因为代理会针对**每个**路由被调用，用 `matcher` 精确排除至关重要

### 高级标志（v13.1）

| 标志 | 作用 |
|---|---|
| `skipTrailingSlashRedirect` | 禁用尾斜杠重定向（便于增量迁移） |
| `skipProxyUrlNormalize` | 禁用 URL 规范化（⚠️ 原名 `skipMiddlewareUrlNormalize`） |

### 单元测试（实验性，v15.1+）

`next/experimental/testing/server` 包提供 `unstable_doesProxyMatch`，可断言代理是否会对给定 URL/headers/cookies 运行。

### ⚠️ 平台支持

| 部署选项 | 支持 |
|---|---|
| Node.js 服务器 | 是 |
| Docker 容器 | 是 |
| **静态导出** | **否** |
| 适配器 | 平台相关 |

---

# 第七部分 · 实战

## 36. 认证

### 官方心智模型：三个概念

| 概念 | 含义 |
|---|---|
| **验证 (Authentication)** | 验证用户是否是其所声称的人 |
| **会话管理 (Session)** | 跨请求跟踪用户的认证状态 |
| **授权 (Authorization)** | 决定用户可以访问哪些路由和数据 |

> ⚠️ **官方明确表态**：示例中的用户名密码实现仅为教学目的，**生产环境强烈建议使用认证库**（Auth0 / Clerk / NextAuth.js / Supabase / WorkOS 等）。会话管理推荐 `iron-session` 或 `jose`。

### ⚠️ 四层职责边界（核心）

```text
┌─────────────────────────────────────────────────────────┐
│ Proxy (proxy.ts)  — 仅乐观检查 (Optimistic)              │
│  · 只读 cookie，绝不查数据库                                │
│  · 因为它在每个路由上运行（含 prefetch 路由）                │
│  · 保护跨用户共享的静态路由                                  │
└─────────────────────────────────────────────────────────┘
                        ↓ 真正授权在此
┌─────────────────────────────────────────────────────────┐
│ DAL (lib/dal.ts)  — 安全检查 (Secure)，唯一授权真源         │
│  · verifySession() 用 React cache() 记忆                   │
│  · 被数据请求 / Server Actions / Route Handlers 共同调用    │
│  · 只返回 DTO                                            │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│ Server Components — 基于角色的 UI 渲染                     │
│  · 用 DAL 的 verifySession()，不要在 layout 里做检查        │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│ Context Provider — 仅客户端组件可用                          │
│  · Server Component 不支持 React context                  │
└─────────────────────────────────────────────────────────┘
```

**授权检查分两类**：

| 类型 | 数据来源 | 用途 | 位置 |
|---|---|---|---|
| **乐观 (Optimistic)** | cookie 中的会话数据 | 快速：显示/隐藏 UI、按角色重定向 | Proxy |
| **安全 (Secure)** | 数据库中的会话数据 | 敏感数据/操作 | DAL（尽可能靠近数据源） |

### 完整实现

**1. 生成密钥**：

```bash
openssl rand -base64 32
```

```text
SESSION_SECRET=your_secret_key
```

**2. jose 签发/验签会话**：

```tsx
// lib/session.ts
import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/app/lib/definitions'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}
```

⚠️ **payload 内容**：只放"后续请求会用到的最少、唯一用户数据"（如 `userId`、`role`）。**不得**包含电话、邮箱、信用卡等 PII，**尤其不得包含密码**。

**3. 设置 cookie**：

```ts
import 'server-only'
import { cookies } from 'next/headers'

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}
```

**4. DAL —— 授权的唯一真源**：

```tsx
// lib/dal.ts
import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { decrypt } from '@/app/lib/session'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/login')
  }

  return { isAuth: true, userId: session.userId }
})
```

配合数据查询（**显式列白名单**，不返回整个 user 对象）：

```tsx
export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null

  try {
    const data = await db.query.users.findMany({
      where: eq(users.id, session.userId),
      // 显式返回需要的列，而不是整个 user 对象
      columns: {
        id: true,
        name: true,
        email: true,
      },
    })

    return data[0]
  } catch (error) {
    console.log('Failed to fetch user')
    return null
  }
})
```

**5. DTO —— 字段级授权**：

```tsx
import 'server-only'
import { getUser } from '@/app/lib/dal'

function canSeeUsername(viewer: User) {
  return true
}

function canSeePhoneNumber(viewer: User, team: string) {
  return viewer.isAdmin || team === viewer.team
}

export async function getProfileDTO(slug: string) {
  const data = await db.query.users.findMany({
    where: eq(users.slug, slug),
  })
  const user = data[0]
  const currentUser = await getUser(user.id)

  return {
    username: canSeeUsername(currentUser) ? user.username : null,
    phonenumber: canSeePhoneNumber(currentUser, user.team)
      ? user.phonenumber
      : null,
  }
}
```

**6. Proxy 路由守卫**：

```tsx
// proxy.ts
import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

// 1. 指定受保护和公开路由
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // 2. 从 cookie 解密会话（⚠️ 绝不查数据库）
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  // 3. 未认证访问受保护路由 → 重定向
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 4. 已认证访问公开路由 → 重定向到 dashboard
  if (isPublicRoute && session?.userId && !path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

// Proxy 不应运行的路由
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
```

⚠️ **官方建议认证场景下在所有路由上运行 Proxy，不要用 `matcher` 缩小范围**（示例中的 matcher 只是演示）。

**7. Server Actions 授权**（视为公开 HTTP 端点）：

```ts
'use server'
import { verifySession } from '@/app/lib/dal'

export async function serverAction(formData: FormData) {
  const session = await verifySession()
  const userRole = session?.user?.role

  if (userRole !== 'admin') {
    return null
  }

  // 执行授权后的操作
}
```

**8. Route Handler 授权（401 vs 403）**：

```ts
import { verifySession } from '@/app/lib/dal'

export async function GET() {
  const session = await verifySession()

  if (!session) {
    return new Response(null, { status: 401 })   // 未认证
  }

  if (session.user.role !== 'admin') {
    return new Response(null, { status: 403 })   // 已认证但无权限
  }

  // 继续
}
```

### ⚠️ 认证四大反模式

| # | 反模式 | 正确做法 |
|---|---|---|
| 1 | **在 layout 里做认证检查** | ⚠️ 因部分渲染，layout 中的检查**不会在导航时重新渲染**。改为「在 layout 里取数据 `getUser()`，把认证检查放进 DAL」 |
| 2 | **未授权时 `return null`** | ⚠️ Next.js 应用有多个入口点，这**不会阻止访问嵌套路由段和 Server Actions** |
| 3 | **只靠客户端 UI 限制** | 从这些组件调用的 Server Action **必须自己再做授权检查** |
| 4 | **数据变更前忘记授权** | 「在更改数据之前，**始终**确保用户也有权执行该操作」 |

⚠️ **Server Component 不支持 React context**——任何子 Server Component 会先在服务器渲染，**无法访问 context provider 的 session 数据**。

⚠️ **Proxy 运行时**：v16 起 `proxy.ts` 使用 Node.js 运行时且**不可配置**。如果认证库仅支持 Edge，需继续用 `middleware`。

### 注册/表单校验完整示例

**zod schema**：

```ts
import * as z from 'zod'

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, { error: 'Contain at least one special character.' })
    .trim(),
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
```

**Server Action**（提前 return 避免无谓的 DB 调用）：

```ts
import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { createSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import bcrypt from 'bcrypt'
import { db } from '@/app/lib/db'
import { users } from '@/app/lib/schema'

export async function signup(state: FormState, formData: FormData) {
  // 1. 校验字段
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  // 2. 准备插入数据
  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3. 插入数据库
  const data = await db
    .insert(users)
    .values({ name, email, password: hashedPassword })
    .returning({ id: users.id })

  const user = data[0]

  if (!user) {
    return { message: 'An error occurred while creating your account.' }
  }

  // 4. 创建会话
  await createSession(user.id)

  // 5. 重定向
  redirect('/profile')
}
```

**客户端表单**：

```tsx
'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}

      <button disabled={pending} type="submit">Sign Up</button>
    </form>
  )
}
```

> ⚠️ **UX 建议**：在注册流程**早期**检查重复邮箱/用户名（如失焦时），并用 `use-debounce` 之类库限制检查频率。

---

## 37. 环境变量

### 加载顺序（找到即停）

1. `process.env`
2. `.env.$(NODE_ENV).local`
3. `.env.local`（⚠️ `NODE_ENV=test` 时**不检查**）
4. `.env.$(NODE_ENV)`
5. `.env`

> ⚠️ **`.env` 文件只从父目录加载，不从 `/src` 加载。** 有 `src` 目录时 `.env.*` 应留在项目根目录。
>
> ⚠️ **测试环境**：`test` 下**不加载 `.env.local`**（保证所有人测试结果一致）；`.env.test` 应提交，`.env.test.local` 不应提交。
>
> ⚠️ `NODE_ENV` 允许值仅 `production` / `development` / `test`。

### 多行值与变量引用

```txt
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
-----END DSA PRIVATE KEY-----"

TWITTER_USER=nextjs
TWITTER_URL=https://x.com/$TWITTER_USER
```

⚠️ 实际值中需要 `$` 时必须转义为 `\$`。

### ⚠️ `NEXT_PUBLIC_` 的冻结问题

这类变量在 `next build` 期间**内联**到 JS 包，构建后**不再响应变化**。

> Heroku 流水线提升构建产物、或单个 Docker 镜像部署到多环境时，所有 `NEXT_PUBLIC_*` 会被**冻结为构建时的值**。

**运行时读取（避免冻结）**：

```tsx
import { connection } from 'next/server'

export default async function Component() {
  await connection()
  // 运行时 API 也会触发动态渲染
  const value = process.env.MY_VALUE
  // ...
}
```

这支持"单个 Docker 镜像在不同环境提升"。

### 运行时加载（ORM / 测试 runner）

```bash
npm install @next/env
```

```tsx
import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)
```

```tsx
import './envConfig.ts'

export default defineConfig({
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
})
```

⚠️ **动态查找不会被内联**（`process.env[key]` 形式）。

### ⚠️ 建议 `.gitignore` 内容

```bash
# 环境变量
.env
.env*.local

# Next.js
/.next/
/out/
next-env.d.ts
*.tsbuildinfo
```

---

## 38. 内容安全策略 CSP

### 用 Proxy 生成 nonce

```ts
// proxy.ts
import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
  // 替换换行符和空格
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  return response
}
```

**Matcher**（忽略预取与静态资源）：

```ts
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
```

### nonce 工作机制

Proxy 生成 nonce → 写入 CSP 头与自定义 `x-nonce` 头 → Next.js 渲染时解析 CSP 头提取 → **自动附加**到框架脚本、页面 JS 包、内联样式/脚本、带 `nonce` 属性的 `<Script>`。

**无需手动给每个标签加 nonce。**

**强制动态渲染**：

```tsx
import { connection } from 'next/server'

export default async function Page() {
  // 等待传入请求以渲染此页
  await connection()
  return <p>...</p>
}
```

**读取 nonce**：

```tsx
import { headers } from 'next/headers'
import Script from 'next/script'

export default async function Page() {
  const nonce = (await headers()).get('x-nonce')

  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  )
}
```

### ⚠️ nonce 的代价（关键权衡）

- **所有页面必须动态渲染**（构建成功但可能**运行时**报错）
- **静态优化与 ISR 被禁用**
- CDN 无法缓存（`Cache-Control: private`）
- ⚠️ **PPR 与基于 nonce 的 CSP 不兼容**（静态 shell 脚本拿不到 nonce）
- 初始加载更慢、服务器负载更高、托管成本更高

**开发/生产差异**：

```ts
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV === 'development'

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ''};
    style-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`};
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
  // ...
}
```

### SRI（实验性，v14.0.0）

作为 nonce 的替代，保持严格 CSP 的同时**保留静态生成**。

⚠️ **限制**：实验性；⚠️ **仅 webpack**（Turbopack 不可用）；⚠️ **仅 App Router**；⚠️ **仅构建时**（无法处理动态生成的脚本）。

**常见违规**：内联样式（用支持 nonce 的 CSS-in-JS 或移到外部文件）、动态导入（`script-src` 需允许）、WebAssembly（加 `'wasm-unsafe-eval'`）、Service Worker 脚本策略。

---

## 39. MDX 与国际化

### MDX

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

`mdx-components.tsx`（**App Router 必需**，与 `app`/`pages` 同级）：

```tsx
import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {}

export function useMDXComponents(): MDXComponents {
  return components
}
```

**全局自定义组件**：

```tsx
import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

const components = {
  // 自定义内置组件，如加样式
  h1: ({ children }) => (
    <h1 style={{ color: 'red', fontSize: '48px' }}>{children}</h1>
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      {...(props as ImageProps)}
    />
  ),
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
```

**本地覆盖**：

```tsx
import Welcome from '@/markdown/welcome.mdx'

function CustomH1({ children }) {
  return <h1 style={{ color: 'blue', fontSize: '100px' }}>{children}</h1>
}

const overrideComponents = { h1: CustomH1 }

export default function Page() {
  return <Welcome components={overrideComponents} />
}
```

⚠️ **陷阱**：

- 默认**只编译 `.mdx`**，`.md` 需在配置中加 `extension` 选项
- remark/rehype 生态**仅 ESM** → 必须用 `next.config.mjs` 或 `.ts`
- ⚠️ **Turbopack 限制**：没有可序列化选项的 remark/rehype 插件**无法配合**（JS 函数不能传给 Rust）；需用**字符串**指定插件名
- ⚠️ **远程 MDX = RCE 风险**：MDX 编译为 JS 在服务器执行。**仅从受信任的来源获取 MDX 内容**
- `fs`/`globby` 只能服务端使用

### 国际化

术语：**Locale** 是语言 + 格式偏好的标识符（`en-US` / `nl-NL` / `nl`）。

**推荐做法**：读 `Accept-Language` → Proxy 重定向 → **所有特殊文件嵌套在 `app/[lang]` 下**。

```tsx
export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  return ...
}
```

**字典模式**：

```ts
// app/lib/dictionaries.ts
import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
```

```tsx
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from './dictionaries'

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  return <button>{dict.products.cart}</button> // Add to Cart
}
```

**静态渲染所有 locale**：

```tsx
export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'de' }]
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  return (
    <html lang={(await params).lang}>
      <body>{children}</body>
    </html>
  )
}
```

⚠️ App Router **不再内置 i18n 路由功能**（`locale`/`locales`/`defaultLocales`/`domainLocales` 已从 `useRouter` 移除），需自行实现 + 用 Proxy。

**生态**：`next-intl`、`next-international`、`paraglide-next`、`lingui`、`tolgee`。

### SPA 渐进采用

**`use` + Context Provider 消除瀑布**：

```tsx
// app/layout.tsx
import { UserProvider } from './user-provider'
import { getUser } from './user' // 某个服务器函数

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let userPromise = getUser() // ⚠️ 不要 await

  return (
    <html lang="en">
      <body>
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </body>
    </html>
  )
}
```

```ts
// user-provider.tsx
'use client'

import { createContext, useContext, ReactNode } from 'react'

type User = any
type UserContextType = { userPromise: Promise<User | null> }

const UserContext = createContext<UserContextType | null>(null)

export function useUser(): UserContextType {
  let context = useContext(UserContext)
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export function UserProvider({
  children,
  userPromise,
}: {
  children: ReactNode
  userPromise: Promise<User | null>
}) {
  return (
    <UserContext.Provider value={{ userPromise }}>
      {children}
    </UserContext.Provider>
  )
}
```

```tsx
'use client'

import { use } from 'react'
import { useUser } from './user-provider'

export function Profile() {
  const { userPromise } = useUser()
  const user = use(userPromise)
  return '...'
}
```

**SWR 2.3.0+（+ React 19）渐进采用**——客户端代码**零改动**：

```tsx
import { SWRConfig } from 'swr'
import { getUser } from './user'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fallback: {
          // ⚠️ 这里不要 await getUser()
          '/api/user': getUser(),
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
```

```tsx
'use client'

import useSWR from 'swr'

export function Profile() {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('/api/user', fetcher)
  return '...'
}
```

⚠️ 三种组合：仅客户端 `useSWR(key, fetcher)` / 仅服务器 `useSWR(key)` + RSC 数据 / 混合两者。

### 多区域（Multi-Zones）

微前端方法：把大应用拆成多个 Next.js 应用，每个服务一组路径。

- 同区域导航 = **软导航**；跨区域 = **硬导航**。⚠️ 常一起访问的页面应放同一区域
- 区域需配置 **`assetPrefix`** 避免资源冲突；默认应用**不需要**
- 路由用 `rewrites`（`destination` 指向区域的生产域）
- ⚠️ **URL 路径必须唯一** —— 两个区域同时服务 `/blog` 会路由冲突
- ⚠️ **跨区域链接必须用 `<a>` 而非 `<Link>`**
- ⚠️ **Server Actions 必须显式配置 `serverActions.allowedOrigins`**

### PWA

八步流程：`app/manifest.ts` → Web Push 前端组件 → Server Actions → VAPID 密钥 → `public/sw.js` → Add to Home Screen → 本地 HTTPS 测试 → 安全标头。

**Manifest**：

```tsx
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
```

⚠️ **安装提示**：`beforeinstallprompt` **不跨浏览器/平台**（Safari iOS 上不起作用）→ 官方**不建议**用它做自定义安装按钮。安装只需：有效 manifest + HTTPS served。

⚠️ 本地测试推送需 HTTPS：`next dev --experimental-https`。

**安全标头**：

| 范围 | 标头 |
|---|---|
| 全局 | `X-Content-Type-Options: nosniff`、`X-Frame-Options: DENY`、`Referrer-Policy: strict-origin-when-cross-origin` |
| SW 专用 | `Content-Type: application/javascript; charset=utf-8`、`Cache-Control: no-cache, no-store, must-revalidate`、`Content-Security-Policy: default-src 'self'; script-src 'self'` |

⚠️ 离线支持用 **Serwist** —— ⚠️ 该插件**当前需要 webpack 配置**。

### 第三方库（`@next/third-parties`）

⚠️ **实验库**。

```bash
npm install @next/third-parties@latest next@latest
```

| 组件 | 关键 props |
|---|---|
| `GoogleTagManager` | `gtmId`、`gtmScriptUrl`、`dataLayer`、`dataLayerName` |
| `GoogleAnalytics` | `gaId`（必需）、`dataLayerName`、`nonce` |
| `GoogleMapsEmbed` | `apiKey`（必需）、`mode`（必需）、`height`、`width`、`q`、`center`、`zoom` |
| `YouTubeEmbed` | `videoid`（必需）、`width`、`height`、`playlabel`、`params` |

⚠️ SPA 客户端导航的 pageview 自动跟踪**依赖 GA 面板开启"增强测量"+"基于浏览器历史记录事件的页面更改"**。若手动发送则**必须禁用默认 pageview 测量**避免重复数据。

⚠️ 官方建议：已有 GTM 时直接用 GTM 配置 GA，不要单独引入 `<GoogleAnalytics />`。

### 视频

- 自托管/直连文件 → `<video>`（完全控制）；外部平台 → `<iframe>`
- ⚠️ `autoPlay` **必须同时**加 `muted`（多数浏览器要求）和 `playsInline`（iOS 兼容）
- 最佳实践：后备内容、`<track>` 字幕、标准 HTML5 控件
- 生态：`next-video`、Cloudinary（`<CldVideoPlayer>`）、Mux、ImageKit（`<IKVideo>`）

---

## 40. 部署

### 四种部署方式

| 部署选项 | 功能支持 |
|---|---|
| **Node.js 服务器** | 全部 |
| **Docker 容器** | 全部 |
| **静态导出** | **受限** |
| **适配器** | 平台相关（Cloudflare、Deno、Netlify、Vercel 等） |

**Node.js 服务器**：`package.json` 必须有 `"build"` 和 `"start"` 脚本。

**Docker**：

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app

# 依赖
COPY package.json package-lock.json ./
RUN npm ci

# 源码
COPY . .

# 构建
RUN npm run build

# 运行
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
```

⚠️ **开发注意事项**：虽然 Docker 非常适合生产部署，但在 Mac 和 Windows 上开发时，**请考虑使用本地开发（`npm run dev`）而不是 Docker**，以获得更好的性能。

**适配器**：Appwrite Sites、AWS Amplify、Cloudflare、Deno、Firebase App Hosting、Netlify、Vercel。

### 静态导出

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
}

export default nextConfig
```

`next build` 生成 `out/`。

**图片优化需自定义 loader**：

```ts
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/demo/image/upload/${params.join(
    ','
  )}${src}`
}
```

**Nginx 重写**（`trailingSlash: false` 时必须配）：

```nginx
server {
    listen 80;
    server_name acme.com;

    root /var/www/out;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # trailingSlash: false 时必需
    # trailingSlash: true 时可省略
    location /blog/ {
        rewrite ^/blog/(.*)$ /blog/$1.html break;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}
```

⚠️ **不支持的完整清单**见第 25 节末。

---

## 41. 自托管

### 七个关键点

**1. 反向代理**：建议用 nginx 前置，处理畸形请求、慢连接攻击、载荷大小限制、速率限制。

⚠️ **流式需禁用 nginx 缓冲**：`X-Accel-Buffering: no`。

**2. 图片优化**：`next start` 零配置自托管。glibc Linux 上可能需额外配置防内存过度使用（sharp allocator）。

**3. 缓存/ISR**：默认存**本地文件系统**。

⚠️ **K8s 多 Pod 场景需配置 `cacheHandler` + 禁用内存缓存**（内存默认 50mb），保证 Pod 间一致性（Redis / S3）。

**4. 自动缓存标头**：

| 资源类型 | `Cache-Control` |
|---|---|
| 真不可变资源 | `public, max-age=31536000, immutable`（**不可覆盖**） |
| ISR 页面 | `s-maxage: <revalidate>, stale-while-revalidate`（`revalidate: false` → 一年） |
| **动态渲染页面** | `private, no-cache, no-store, max-age=0, must-revalidate` |

**5. 构建缓存**：`next build` 生成 build ID → **应使用相同构建启动多个容器**；每阶段重建需 `generateBuildId` 保证 ID 一致。

**6. 版本偏差**：`deploymentId` 不匹配 → 页面间转换执行**硬导航**。⚠️ `useState` 等组件状态会丢失（URL 状态/localStorage 会保留）。

**7. `after`**：停止服务器时发 **`SIGINT`/`SIGTERM` 并等待**，让 `after` 中的回调完成。

**CDN 注意事项**：访问动态 API 的页面带 `Cache-Control: private`（不可缓存）；完全预渲染为静态则 `public`。

### CI 构建缓存

缓存存 `.next/cache`。⚠️ 未配置保留会报 "No cache" 错误。

**GitHub Actions**：

```yaml
uses: actions/cache@v4
with:
  path: |
    ~/.npm
    ${{ github.workspace }}/.next/cache
  key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx') }}
  restore-keys: |
    ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-
```

其他平台：Vercel 零配置；CircleCI `save_cache.paths`；Travis `cache.directories`；GitLab `cache.paths`；Netlify 用 `@netlify/plugin-nextjs`；Heroku `"cacheDirectories": [".next/cache"]`；Jenkins `arbitraryFileCache`。

### 自定义服务器

```ts
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res)
  }).listen(port)

  console.log(`> Server listening at http://localhost:${port}`)
})
```

⚠️ **三条警告**：

1. 会**移除重要性能优化**（如自动静态优化）→ 仅在集成路由无法满足需求时使用
2. **独立输出模式（standalone）不会跟踪此文件**，两者不能一起用
3. `server.js` **不经过 Next.js 编译器/打包**，语法必须兼容当前 Node.js 版本

---

## 42. 测试

### Jest

```bash
npm install -D jest jest-environment-jsdom @testing-library/react \
  @testing-library/dom @testing-library/jest-dom ts-node @types/jest
npm init jest@latest
```

```ts
// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // 提供 Next.js 应用路径，以在测试环境加载 next.config.js 和 .env
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
}

export default createJestConfig(config)
```

`next/jest` 自动配置：SWC transform；mock 样式表/图片/`next/font`；加载 `.env` 及变体；忽略 `node_modules` 与 `.next`；加载 `next.config.js`。

⚠️ `@testing-library/jest-dom` **v6.0 移除了 `extend-expect`**，v6 前需 `import '@testing-library/jest-dom/extend-expect'`。
⚠️ 模块别名需在 `moduleNameMapper` 中匹配 `jsconfig.json` 的 `paths`。

### Vitest

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react \
  @testing-library/dom vite-tsconfig-paths
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: { environment: 'jsdom' },
})
```

### Playwright

```bash
npm init playwright
```

⚠️ 建议**针对生产代码**测试（`npm run build && npm run start` 后再 `npx playwright test`），或用 `webServer` 让 Playwright 启动 dev server。CI 需 `npx playwright install-deps`。

### Cypress

```ts
// cypress.config.ts —— E2E
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: { setupNodeEvents(on, config) {} },
})
```

⚠️ **版本要求**：Cypress **13.6.3 以下不支持 TypeScript 5 与 `moduleResolution: "bundler"`**。
⚠️ 组件测试的 `devServer.bundler` 固定为 `webpack`。
⚠️ CI 中用 `cypress run` 无头运行。

### ⚠️ 三家共同限制

> **Jest / Vitest / Cypress 组件测试都不支持 `async` 服务器组件** → 官方建议对 async 组件用 E2E 测试。
>
> ⚠️ Cypress 组件测试不需要服务器，因此依赖服务器的功能（如 `<Image />`）可能无法开箱即用。

### 本地开发性能排查

`next dev` 与 `next build`/`next start` 流程不同：dev 按需编译路由，生产构建才应用最小化、内容哈希等优化。

**排查清单**：

1. **杀毒软件**（Windows Defender 排除项 / `sudo spctl developer-mode enable-terminal`）
2. 升级 Next.js 用 Turbopack（`npm run dev --webpack` 回退）
3. **检查导入**（barrel 文件、多套图标集混用、`optimizePackageImports`）
4. Tailwind `content` 别扫 `node_modules`
5. 自定义 webpack
6. 优化内存
7. Server Components 的 `serverComponentsHmrCache`
8. ⚠️ **Docker**（Mac/Windows 上 HMR 可能从秒级到分钟级 → **开发用本地 `npm run dev`**）

### 内存优化（按性价比排序）

1. 减少依赖（用打包分析器找出大依赖）
2. `experimental.webpackMemoryOptimizations: true`
3. `next build --experimental-debug-memory-usage`
4. 堆 profile：`node --heap-prof node_modules/next/dist/bin/next build`
5. 堆快照：`NODE_OPTIONS=--inspect`，调试模式下随时发 **SIGUSR2**
6. Webpack 构建 worker
7. 禁用 webpack 缓存（自定义配置时）
8. 禁用静态分析（TS 内存溢出时）
9. 禁用 source maps

⚠️ `--experimental-debug-memory-usage` 与自动启用的 webpack build worker **不兼容**（除非有自定义 webpack 配置）。

### 包分析

**Turbopack 内置分析器**（实验性，v16.1+）：

```bash
npx next experimental-analyze
npx next experimental-analyze --output   # 写入 .next/diagnostics/analyze
```

**webpack `@next/bundle-analyzer`**：

```bash
npm i @next/bundle-analyzer
ANALYZE=true npm run build
```

**优化大包三条路**：

1. 大量导出的包 → `optimizePackageImports`
2. **高负载客户端 → 移到 Server Component**（典型：语法高亮、图表、Markdown 解析）
3. 选择不打包特定包 → `serverExternalPackages`

---

## 43. 生产检查清单

### 自动优化（零配置）

Server Components / 代码分割 / 预请求 / 静态渲染 / 缓存。

### 路由和渲染

- [ ] 用布局共享 UI + 启用部分渲染
- [ ] 用 `<Link>` 而非 `<a>`
- [ ] 自定义错误页 + 404
- [ ] 审查 `"use client"` 边界位置
- [ ] ⚠️ **动态 API 会把整个路由 opt-in 到动态渲染**（在**根布局**用 → 整个应用），要有意为之并用 `<Suspense>` 包裹

### 数据获取

- [ ] Server Components 取数
- [ ] ⚠️ **不要从 Server Component 调 Route Handler**
- [ ] 用 Loading UI + Suspense 防阻塞
- [ ] 并行取数 + 预加载
- [ ] 验证数据请求真的被缓存，非 `fetch` 请求要用 `unstable_cache`
- [ ] 静态资源放 `public`

### UI / 可访问性

- [ ] Server Actions 处理表单 + 服务端校验 + 错误
- [ ] `app/global-error.tsx`
- [ ] `app/global-not-found.tsx`
- [ ] 字体模块
- [ ] `<Image>`
- [ ] `<Script>`
- [ ] ESLint 的 `eslint-plugin-jsx-a11y`

### 安全

- [ ] taint
- [ ] Server Actions 授权
- [ ] `.env.*` 进 `.gitignore` 且只有公共变量带 `NEXT_PUBLIC_`
- [ ] 考虑 CSP

### 元数据 / SEO

- [ ] metadata API
- [ ] OG 图片
- [ ] sitemap + robots

### 投入生产前

- [ ] `next build` + `next start`
- [ ] 隐身模式跑 Lighthouse
- [ ] `useReportWebVitals`
- [ ] `@next/bundle-analyzer`
- [ ] Import Cost、packagephobia、bundlephobia

### 无障碍

**路由播报**：客户端转换默认带路由播报器，查找顺序：`document.title` → `<h1>` → URL 路径名。

⚠️ 因此**每个页面都要有唯一且描述性的标题**。

**代码检查**：内置 `eslint-plugin-jsx-a11y`，规则包括 `aria-props`、`aria-proptypes`、`role-has-required-aria-props` 等。

⚠️ **v16 交叉影响**：`next lint` 已移除 → 需用 ESLint CLI 跑 `jsx-a11y`。

### 快速刷新（Fast Refresh）

**三种行为**：

1. 只导出 React 组件的文件 → 只更新该文件并重渲染
2. 含非组件导出的文件 → 重跑该文件**及导入它的其他文件**
3. 被 React 树外文件导入的文件 → **回退到完全重载**

**状态重置原因**：类组件不保留（仅函数组件与 Hook）；文件有组件外的其他导出；导出 HOC 调用结果且返回类组件；`export default () => <div />` 这类**匿名箭头函数**（→ codemod `name-default-component`）。

**技巧**：`// @refresh reset` 强制重置该文件中的组件状态。

⚠️ **导入大小写敏感**：`'./header'` vs `'./Header'` 会让快刷和完全刷新都失败。

⚠️ `useState`/`useRef` 在不改参数与调用顺序时保留值；`useEffect`/`useMemo`/`useCallback` **始终更新，依赖列表被忽略**。

### 浏览器 polyfill

**自动注入**（⚠️ 若依赖自带同款会从生产包移除以去重；**只对需要的浏览器加载**）：`fetch()`（`whatwg-fetch`）、`URL`（Node 的 `url` 包）、`Object.assign()`。

**自定义 polyfill**（App Router）→ 导入到 `instrumentation-client.js`：

```ts
import './polyfills'
```

**条件加载**（最佳实践）：

```ts
import { useCallback } from 'react'

export const useAnalytics = () => {
  const tracker = useCallback(async (data: unknown) => {
    if (!('structuredClone' in globalThis)) {
      import('polyfills/structured-clone').then((mod) => {
        globalThis.structuredClone = mod.default
      })
    }
    /* 使用 structured clone 的工作 */
  }, [])

  return tracker
}
```

### Next.js 编译器（SWC）

Rust 编写，**比 Babel 快 17 倍**，v12 起默认启用。⚠️ **有 `.babelrc` 时自动回退到 Babel**。

⚠️ **压缩**：v13 起 SWC 默认压缩（比 Terser 快 7 倍）；**v15 起无法用 `next.config.js` 自定义压缩**。

⚠️ **Relay 陷阱**：`pages` 目录中所有 JS 文件都被视为路由 → `relay-compiler` **必须在 `pages` 之外**指定 `artifactDirectory`，否则生成的 `__generated__` 文件会被当成路由，**破坏生产构建**。

⚠️ `modularizeImports` 已被取代 → 用 `optimizePackageImports`。

---

# 第八部分 · 迁移与升级

## 44. 破坏性变更总表

### v16 环境要求

| 要求 | 值 |
|---|---|
| **Node.js** | **20.9+**（不再支持 18） |
| **TypeScript** | **5.1+** |
| **浏览器** | Chrome 111+、Edge 111+、Firefox 111+、Safari 16.4+ |

### v15 → v16 破坏性变更

#### A. 运行时 / 构建

| # | 变更 | 改法 |
|---|---|---|
| A1 | **Turbopack 成为 `next dev` + `next build` 默认** | 移除 `--turbopack`；⚠️ **有自定义 `webpack` 配置时 `next build` 会失败** → 三选一：`--turbopack` / 迁移到 Turbopack / `--webpack` |
| A2 | `experimental.turbopack` → 顶层 `turbopack` | 见下方对照 |
| A3 | Turbopack 文件系统缓存（测试版） | `experimental.turbopackFileSystemCacheForDev: true` |
| A4 | ⚠️ **发现 `webpack` 配置就构建失败**（即使不是你自己定义的） | 排查插件是否注入了 `webpack` 选项 |
| A5 | **异步请求 API 同步兼容彻底移除** | 全部 `await`；codemod `next-async-request-api` |
| A6 | Node.js 18 不再支持 / TS 最低 5.1.0 | 升级 |
| A7 | **`next dev` 与 `next build` 输出目录分离** | `next dev` 输出到 **`.next/dev`**；tracing 路径改为 `.next/dev/trace-turbopack` |
| A8 | 并发 `dev`/`build` 锁文件 | 防止同项目多实例 |
| A9 | **`next build` 移除 `size` / `First Load JS` 指标** | 改用 Lighthouse / Vercel Analytics |
| A10 | ⚠️ **`next dev` 时配置文件的 `process.argv` 不含 `'dev'`** | 改判断 `NODE_ENV === 'development'` |
| A11 | `sass-loader` 升级至 v16 | 支持现代 Sass 语法 |
| A12 | ESLint 扁平配置 | `@next/eslint-plugin-next` 默认 Flat Config；`.eslintrc` 需迁移 |

**Turbopack 配置位置迁移**：

```ts
import type { NextConfig } from 'next'

// Next.js 15 —— experimental.turbopack
const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      // options
    },
  },
}

export default nextConfig
```

```ts
import type { NextConfig } from 'next'

// Next.js 16 —— 顶层 turbopack
const nextConfig: NextConfig = {
  turbopack: {
    // options
  },
}

export default nextConfig
```

**解析别名回退**（对标 webpack `resolve.fallback`）：

```ts
export default {
  turbopack: {
    resolveAlias: {
      fs: {
        browser: './empty.ts',
      },
    },
  },
}
```

#### B. 生成函数的 params 异步化

| # | 变更 | 改法 |
|---|---|---|
| B1 | **图标/OG 图片生成函数的 `params` 变 Promise** | `await params`；`generateImageMetadata` **仍接收同步 `params`**，但它返回的 `id` 现在以 Promise 传给图片生成函数 |
| B2 | **`sitemap` 生成函数的 `id` 变 Promise** | `const id = await props.id` |

#### C. 缓存 API 变更

| # | 变更 | 改法 |
|---|---|---|
| C1 | **`revalidateTag` 新签名** | 新增第二参数：`revalidateTag('article-1', 'max')` |
| C2 | **新增 `updateTag`（仅 Server Action）** | 读写语义：过期 + 立即刷新（`revalidateTag` 是 SWR，**会先看到旧数据**） |
| C3 | **新增 `refresh`** | 从 Server Action 刷新客户端路由 |
| C4 | `unstable_cacheLife` / `unstable_cacheTag` 去前缀 | `import { cacheLife, cacheTag } from 'next/cache'` |

```ts
'use server'

import { revalidateTag } from 'next/cache'

export async function updateArticle(articleId: string) {
  // 标记为过期 —— 读者在重新验证期间看到旧数据
  revalidateTag(`article-${articleId}`, 'max')
}
```

```ts
'use server'

import { updateTag } from 'next/cache'

export async function updateUserProfile(userId: string, profile: Profile) {
  await db.users.update(userId, profile)

  // 过期并立即刷新 —— 用户立刻看到自己的改动
  updateTag(`user-${userId}`)
}
```

```ts
'use server'

import { refresh } from 'next/cache'

export async function markNotificationAsRead(notificationId: string) {
  await db.notifications.markAsRead(notificationId)

  // 刷新头部显示的通知数
  refresh()
}
```

#### D. `middleware` → `proxy`（重点）

| # | 变更 | 改法 |
|---|---|---|
| D1 | 文件名弃用并重命名 | `mv middleware.ts proxy.ts` |
| D2 | 命名导出 `middleware` 弃用 | 重命名为 `proxy`（官方建议**即使默认导出也改名**） |
| D3 | ⚠️ **`proxy` 不支持 `edge` 运行时** | 运行时即 `nodejs` 且**不可配置**。⚠️ **需要 edge 就继续用 `middleware`** |
| D4 | 配置标志重命名 | `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize` |
| D5 | 其他标志（codemod 处理） | `experimental.middlewarePrefetch` → `proxyPrefetch`；`middlewareClientMaxBodySize` → `proxyClientMaxBodySize`；`externalMiddlewareRewritesResolve` → `externalProxyRewritesResolve` |

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  skipProxyUrlNormalize: true,
}

export default nextConfig
```

#### E. `next/image` 破坏性变更

| # | 变更 | 新默认 | 改法 |
|---|---|---|---|
| E1 | **带查询字符串的本地图片需 `localPatterns.search`** | 阻止枚举攻击 | 加配置 |
| E2 | **`minimumCacheTTL`** | 60s → **4h** | `images: { minimumCacheTTL: 60 }` |
| E3 | **`imageSizes` 移除 `16`** | `[32,48,64,96,128,256,384]` | 恢复需手动加回 |
| E4 | **`qualities`** | 允许所有 → **仅 `[75]`** | 配置 `qualities: [50, 75, 100]` |
| E5 | 本地 IP | 新安全限制阻止 | 仅私有网络设 `dangerouslyAllowLocalIP: true` |
| E6 | **`maximumRedirects`** | 无限 → **最多 3 次** | `maximumRedirects: 0` |
| E7 | ⚠️ 弃用 `next/legacy/image` | — | 改 `import Image from 'next/image'` |
| E8 | ⚠️ 弃用 `images.domains` | — | 改用 `remotePatterns` |

> **E3 移除 16 的理由**：分析显示极少项目提供 16px 宽图片；且 `devicePixelRatio: 2` 实际会取 32px 宽图片（避免 retina 模糊），移除可减小 `srcset` 体积。
>
> **E2 改为 4h 的理由**：很多上游源图缺 `cache-control` 标头，导致每 60s 重新验证 → CPU 与成本上升。

#### F. 路由 / 渲染行为

| # | 变更 | 改法 |
|---|---|---|
| F1 | **并行路由所有插槽必须显式 `default.js`** | 否则**构建失败** |
| F2 | **滚动行为重写** | ⚠️ 默认**不再覆盖** CSS 的 `scroll-behavior`。要恢复 → `<html data-scroll-behavior="smooth">` |
| F3 | **增强的路由与导航**（免改代码） | 布局去重 + 增量预取。⚠️ **预取请求数变多但总传输变小** |
| F4 | **PPR 实验标志与配置移除** | `experimental_ppr` 移除，改用 `cacheComponents`。⚠️ **v16 的 PPR 与 v15 canary 工作方式不同** → 正在用 PPR 的**先留在 v15 canary** |

```tsx
import { notFound } from 'next/navigation'

export default function Default() {
  notFound()
}
```

```tsx
export default function Default() {
  return null
}
```

#### G. 移除项

| # | 移除 | 替代 |
|---|---|---|
| G1 | **AMP 全部支持** | 无（用内置优化 + 现代 Web 标准） |
| G2 | **`next lint` 命令** | 用 ESLint CLI；⚠️ **`next build` 不再运行代码检查** |
| G3 | **`serverRuntimeConfig` / `publicRuntimeConfig`** | 用环境变量 |
| G4 | `devIndicators` 的 `appIsrStatus` / `buildActivity` / `buildActivityPosition` | 指示器本身仍可用 |
| G5 | **`experimental.dynamicIO`** | 重命名为 **`cacheComponents`** |
| G6 | **`unstable_rootParams`** | 替代 API 将在后续小版本推出 |

**运行时配置移除的改法**：

```tsx
// 之前（Next.js 15）
import getConfig from 'next/config'

export default function Page() {
  const { publicRuntimeConfig } = getConfig()
  return <p>API URL: {publicRuntimeConfig.apiUrl}</p>
}
```

```tsx
// 之后（Next.js 16）—— 仅服务器值
async function fetchData() {
  const dbUrl = process.env.DATABASE_URL
  return await db.query(dbUrl, 'SELECT * FROM users')
}

export default async function Page() {
  const data = await fetchData()
  return <div>{/* 渲染数据 */}</div>
}
```

⚠️ **G2 的连带影响（易漏）**：`next build` 不再跑 lint → CI 必须**显式**加入独立的 lint 步骤，否则代码检查静默消失。

#### H. 新增/稳定项

| 项 | 说明 |
|---|---|
| **React 19.2（Canary）** | ViewTransition、`useEffectEvent`、Activity |
| **React Compiler 稳定** | `reactCompiler: true`（⚠️ **默认关闭**） |
| **MCP 支持** | 内置 `/_next/mcp` 端点，需 16+ |
| **构建适配器 API（alpha）** | 自定义适配器接入构建过程 |

### v14 → v15 破坏性变更

| # | 变更 | 影响 | 改法 |
|---|---|---|---|
| 1 | **React 19 最低版本** | `react`/`react-dom` 最低 19 | `npm i next@latest react@latest react-dom@latest` |
| 2 | **`useFormState` → `useActionState`** | 旧钩子弃用 | 改用 `useActionState`（额外提供 `pending`） |
| 3 | **`useFormStatus` 返回值扩大** | React 19 下含 `data`/`method`/`action` | 仅依赖 `pending` 的代码在非 React 19 下只有该键 |
| 4 | **异步请求 API（重大）** | `cookies`/`headers`/`draftMode`/`params`/`searchParams` 变异步 | 见下方对照 |
| 5 | **`runtime` 段配置** | ⚠️ 用 `experimental-edge` **会直接报错** | 改为 `edge`；codemod |
| 6 | **`fetch` 不再默认缓存** | 所有 `fetch` 行为改变 | 传 `cache: 'force-cache'` 开启 |
| 7 | **Route Handler `GET` 不再默认缓存** | GET 变动态 | 用 `export const dynamic = 'force-static'` |
| 8 | **客户端路由缓存** | `page` 段不再跨页复用 | 用 `staleTimes` 配置开启 |
| 9 | **`@next/font` 移除** | 包被删除 | 改用内置 `next/font`；codemod `built-in-next-font` |
| 10 | **`experimental.bundlePagesExternals` 稳定化** | 标志变更 | → `bundlePagesRouterDependencies` |
| 11 | **`experimental.serverComponentsExternalPackages` 稳定化** | 标志变更 | → `serverExternalPackages` |
| 12 | **Speed Insights 自动检测移除** | 不再自动检测 | 手动配置 |
| 13 | **`NextRequest.geo` / `.ip` 移除** | 属性不存在了 | 用 `@vercel/functions` 的 `geolocation()` / `ipAddress()` |

**异步 API 代码对照**：

```tsx
// cookies
import { cookies } from 'next/headers'

// Before
const cookieStore = cookies()
const token = cookieStore.get('token')

// After
const cookieStore = await cookies()
const token = cookieStore.get('token')
```

```tsx
// headers
import { headers } from 'next/headers'

// Before
const headersList = headers()

// After
const headersList = await headers()
```

```tsx
// draftMode
import { draftMode } from 'next/headers'

// Before
const { isEnabled } = draftMode()

// After
const { isEnabled } = await draftMode()
```

```tsx
// 页面
type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}
```

```tsx
// 客户端组件 —— React.use()
'use client'
import { use } from 'react'

type Params = Promise<{ slug: string }>

export default function Page(props: { params: Params }) {
  const params = use(props.params)
  const slug = params.slug
}
```

```tsx
// 路由处理程序
export async function GET(request: Request, segmentData: {
  params: Promise<{ slug: string }>
}) {
  const params = await segmentData.params
  const slug = params.slug
}
```

**Vercel 替代 geo/ip**：

```ts
import { geolocation, ipAddress } from '@vercel/functions'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { city } = geolocation(request)
  const ip = ipAddress(request)
  // ...
}
```

### v13 → v14 破坏性变更

| # | 变更 |
|---|---|
| 1 | Node.js 最低版本 **16.14 → 18.17** |
| 2 | **`next export` 命令删除** → 用 `output: 'export'` |
| 3 | `ImageResponse` 从 `next/server` → **`next/og`**（codemod `next-og-import`） |
| 4 | **`@next/font` 完全删除** → 内置 `next/font`（codemod `built-in-next-font`） |
| 5 | **`next-swc` 的 WASM 目标删除** |

---

## 45. App Router 迁移

### 准备

Node.js 最低 **v18.17**：

```bash
npm install next@latest react@latest react-dom@latest
npm install -D eslint-config-next@latest
```

> ⚠️ **重要**：升级到 13 **不需要**使用 App Router。`pages` 可继续用。

### 新特性升级点

| 项 | 变化 |
|---|---|
| **`<Image>`** | 两个 codemod：`next-image-to-legacy-image`（安全）、`next-image-experimental`（⚠️ **危险**，须先跑前一个） |
| **`<Link>`** | 不再需要手动 `<a>` 子标签。codemod：`new-link` |
| **`<Script>`** | ① `_document.js` 里的 `beforeInteractive` 移到根布局；② ⚠️ `worker` 策略**在 `app` 中不工作**；③ ⚠️ `onLoad`/`onReady`/`onError` 在 Server Component 中**不工作** |
| **字体** | ⚠️ 内联 CSS 在 `pages` 仍有效但**在 `app` 中不起作用** |

### 七步迁移

**步骤 1**：创建 `app` 目录（需 13.4+）

**步骤 2**：创建根布局 `app/layout.tsx`

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

⚠️ 迁移 `_document`/`_app` 时：把内容（如全局样式）复制到 `app/layout.tsx`；⚠️ `app/layout.tsx` 中的样式**不作用于 `pages/*`** → 迁移期间**保留** `_app`/`_document`，完全迁移后再删。

⚠️ React Context Provider 需移到 Client Component。

⚠️ `getLayout()` 模式 → 嵌套布局：先移到 Client Component（保留 pages 行为），再导入到 `app` 内新 `layout.js`，之后可逐步把非交互部分移入 Server Component。

**步骤 3**：迁移 `next/head` → metadata

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Page Title',
}
```

**步骤 4**：迁移页面

| `pages` | `app` | 路由 |
|---|---|---|
| `index.js` | `page.js` | `/` |
| `about.js` | `about/page.js` | `/about` |
| `blog/[slug].js` | `blog/[slug]/page.js` | `/blog/post-1` |

**推荐两步法**（行为最接近 pages）：

```tsx
'use client'

// 这是一个客户端组件（与 `pages` 目录中的组件相同）
// 接收 props 作为数据，能访问 state 和 effects，
// 并在初始页面加载时在服务器上预渲染
export default function HomePage({ recentPosts }) {
  return (
    <div>
      {recentPosts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

```tsx
  // 导入你的客户端组件
  import HomePage from './home-page'

  async function getPosts() {
    const res = await fetch('https://...')
    const posts = await res.json()
    return posts
  }

  export default async function Page() {
    // 直接在服务器组件中获取数据
    const recentPosts = await getPosts()
    // 转发给客户端组件
    return <HomePage recentPosts={recentPosts} />
  }
```

⚠️ `app` 中的页面**默认是 Server Component**（与 pages 相反）。

**步骤 5**：迁移路由钩子

⚠️ `useRouter` 从 `next/router` → `next/navigation`（`pages` 中继续可用；跨目录共享组件可用 `next/compat/router`）。

⚠️ **行为差异表**：

| 变化 | 说明 |
|---|---|
| `useRouter` 来源不同 | `next/router` 版本在 `app` 中**不支持** |
| 不返回 `pathname` | 改用 `usePathname()` |
| 不返回 `query` | 改用 `useSearchParams()` + `useParams()` |
| `isFallback` 删除 | `fallback` 已被 `dynamicParams` 取代 |
| `locale`/`locales`/`defaultLocales`/`domainLocales` 删除 | `app` 不再内置 i18n |
| `basePath` 删除 | 替代方案尚未实现 |
| `asPath` 删除 | 新路由已移除 `as` 概念 |
| `isReady` 删除 | `useSearchParams()` 的组件在静态渲染期会**跳过预渲染** |
| `route` 删除 | 用 `usePathname()` 或 `useSelectedLayoutSegments()` |

⚠️ 这些新钩子**仅在 Client Component 中支持**。

**步骤 6**：数据获取 API 替换

| pages | App Router 等价 |
|---|---|
| `getServerSideProps` | Server Component + `fetch(url, { cache: 'no-store' })` |
| `getStaticProps` | `fetch` 默认 `cache: 'force-cache'` |
| `getStaticProps` + `revalidate: n` | `fetch(url, { next: { revalidate: 10 } })` |
| `getStaticPaths` | `generateStaticParams`（返回**段数组**；可在 layout 内使用） |
| `fallback: true` | `dynamicParams = true`（默认，按需生成） |
| `fallback: false` | `dynamicParams = false` → 404 |
| `fallback: 'blocking'` | ⚠️ **无对应项** |
| `req`（cookies/headers） | `headers()` / `cookies()` |
| `pages/api/*` | `route.js` 路由处理程序 |

**步骤 7**：样式

⚠️ `pages` 中全局样式表**仅限 `pages/_app.js`**；`app` 解除了该限制。Tailwind 需把 `app` 加入 `content` 并在 `app/layout.js` 导入全局样式。

### ⚠️ pages 与 app 混用

在由不同路由器提供的路由间导航 = **硬导航**，且 `next/link` 的自动预取**不跨路由**。

---

## 46. 从 Vite / CRA 迁移

### 为什么切换到 Next.js

| 问题 | Next.js 的解决 |
|---|---|
| 初始加载慢（等整个 bundle 下载运行后才发数据请求） | 自动代码分割 + RSC |
| 无自动代码分割（手动分割易引入瀑布） | 内置 |
| 网络瀑布（占位符 → 挂载后取数） | 服务端直接取数 + 流式 |
| 无有意义加载状态 | Suspense 流式 |
| 无法按需选择数据获取策略 | 混合渲染 |
| 缺少 Proxy | 内置 |
| 无图片/字体/脚本优化 | 内置 |

### 从 Vite 迁移（9 步）

**策略**：先保持纯客户端 SPA、不迁移现有路由 → 最大化减少问题与合并冲突。

| 步骤 | 内容 |
|---|---|
| 1 | `npm install next@latest` |
| 2 | 创建 `next.config.mjs` |
| 3 | 更新 `tsconfig.json`（9 项，见下） |
| 4 | `index.html` → `app/layout.tsx` 根布局 |
| 5 | `main.tsx` → `app/[[...slug]]/page.tsx` 入口 |
| 6 | 静态图片导入改为对象 `.src` |
| 7 | `VITE_` → `NEXT_PUBLIC_` |
| 8 | 更新 `package.json` scripts + `.gitignore` |
| 9 | 清理 Vite 工件 |

**`tsconfig.json` 9 项改动**：

1. 删除到 `tsconfig.node.json` 的 project references
2. `include` 加 `./dist/types/**/*.ts` 和 `./next-env.d.ts`
3. `exclude` 加 `./node_modules`
4. `plugins` 加 `{ "name": "next" }`
5. `esModuleInterop: true`
6. `"jsx": "react-jsx"`
7. `allowJs: true`
8. `forceConsistentCasingInFileNames: true`
9. `incremental: true`

**步骤 5 细节**：

```tsx
// app/[[...slug]]/page.tsx
import '../../index.css'
import { ClientOnly } from './client'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return <ClientOnly />
}
```

```tsx
// app/[[...slug]]/client.tsx
'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../App'), { ssr: false })

export function ClientOnly() {
  return <App />
}
```

⚠️ **步骤 6 图片陷阱**：Vite 中导入图片返回**字符串**，Next.js 返回**对象**。

```tsx
// Before (Vite)
import image from './img.png'
export default function App() {
  return <img src={image} />
}
```

```tsx
// After —— 传 .src 而不是整个对象
import logo from '../public/logo.png'

export default function App() {
  return <img src={logo.src} />
}
```

> ⚠️ 保留 `<img>` 可减少改动并防止图片扭曲（`<Image>` 会按图片尺寸自动设 `width`/`height`，若一个维度有样式另一个没有、且未设 `auto`，会默认取 `<img>` 的属性值导致变形）。

**步骤 7 环境变量映射表**：

| Vite | Next.js |
|---|---|
| `VITE_` 前缀 | `NEXT_PUBLIC_` 前缀 |
| `import.meta.env.MODE` | `process.env.NODE_ENV` |
| `import.meta.env.PROD` | `process.env.NODE_ENV === 'production'` |
| `import.meta.env.DEV` | `process.env.NODE_ENV !== 'production'` |
| `import.meta.env.SSR` | `typeof window !== 'undefined'` |
| `import.meta.env.BASE_URL` | 需自建：`NEXT_PUBLIC_BASE_PATH` + `basePath` |

**步骤 9 清理清单**：`main.tsx`、`index.html`、`vite-env.d.ts`、`tsconfig.node.json`、`vite.config.ts`、卸载 Vite 依赖。

### 从 CRA 迁移（11 步）

与 Vite 高度重叠，差异点：

| 步骤 | 与 Vite 的差异 |
|---|---|
| 2 | 配置文件用 **`next.config.ts`** |
| 4 | 源文件是 `public/index.html`；⚠️ `%PUBLIC_URL%` 需替换为真实路径；⚠️ Next.js **默认忽略** CRA 的 `public/manifest.json`、附加图标和测试配置 |
| 6 | 入口是 `src/index.tsx` |
| 7 | `client.tsx` 放 `app/[[...slug]]/` 内 |
| 8 | TS 访问 `.src` 报错 → 把 `next-env.d.ts` 加到 `tsconfig.json` 的 `include` |
| 9 | 环境变量前缀 `REACT_APP_` → `NEXT_PUBLIC_` |
| 11 | 清理：`public/index.html`、`src/index.tsx`、`src/react-app-env.d.ts`、`reportWebVitals`、卸载 `react-scripts` |

**CRA 专属映射表**：

| CRA 特性 | Next.js 替代 |
|---|---|
| `package.json` 的 `homepage` | `basePath: '/my-subpath'` |
| 自定义 Service Worker | PWA 指南（Serwist，⚠️ 需 webpack） |
| `package.json` 的 `proxy` | `rewrites: { source: '/api/:path*', destination: '...' }` |
| 自定义 webpack/Babel | `next.config.ts` 的 `webpack(config, { isServer })` —— ⚠️ **需 `--webpack`** |

```ts
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'https://your-backend.com/:path*' },
    ]
  },
  webpack: (config, { isServer }) => {
    // 修改 webpack 配置
    return config
  },
}

export default nextConfig
```

⚠️ **打包器兼容性**：CRA 用 webpack；Next.js 现默认 Turbopack —— `next dev --webpack` 用 Webpack。
⚠️ **静态导出限制**：`output: 'export'` **目前不支持 `useParams`** → 要用完整功能须删除该行。

---

## 47. Codemod 命令清单

### 基本用法

```bash
npx @next/codemod <transform> <path>

# --dry  试运行，不编辑任何代码
# --print 打印更改后的输出以对比
```

### 升级命令

```bash
npx @next/codemod upgrade [revision]
```

`revision`（可选）：`patch` / `minor` / `major` / NPM tag（`latest`、`canary`、`rc`）/ 确切版本。**稳定版默认 `minor`**。

```bash
npx @next/codemod upgrade patch    # 16.0.7 -> 16.0.8
npx @next/codemod upgrade minor    # 15.3.7 -> 15.4.8（默认行为）
npx @next/codemod upgrade major    # 15.5.7 -> 16.0.7
npx @next/codemod upgrade 16       # 升级到特定版本
npx @next/codemod upgrade canary   # 升级到 canary
```

⚠️ 目标版本 ≤ 当前版本时**直接退出不做改动**；升级 React 时需单独跑 React 19 codemod。

### v16.0

| Codemod | 命令 | 作用 |
|---|---|---|
| `remove-experimental-ppr` | `npx @next/codemod@latest remove-experimental-ppr .` | 移除 `experimental_ppr` 段配置 |
| `remove-unstable-prefix` | `npx @next/codemod@latest remove-unstable-prefix .` | 稳定 API 去 `unstable_` 前缀 |
| `middleware-to-proxy` | `npx @next/codemod@latest middleware-to-proxy .` | 六项重命名 |
| `next-lint-to-eslint-cli` | `npx @next/codemod@canary next-lint-to-eslint-cli .` | `next lint` → ESLint CLI |
| `next-experimental-turbo-to-turbopack` | `npx @next/codemod@latest next-experimental-turbo-to-turbopack .` | `experimental.turbo` → `turbopack` |

**`remove-unstable-prefix` 示例**：

```ts
// 前
import { unstable_cacheTag as cacheTag } from 'next/cache'
cacheTag()
```

```ts
// 后
import { cacheTag } from 'next/cache'
cacheTag()
```

**`middleware-to-proxy` 的六项重命名**：

1. `middleware.<ext>` → `proxy.<ext>`
2. 命名导出 `middleware` → `proxy`
3. `experimental.middlewarePrefetch` → `experimental.proxyPrefetch`
4. `experimental.middlewareClientMaxBodySize` → `experimental.proxyClientMaxBodySize`
5. `experimental.externalMiddlewareRewritesResolve` → `experimental.externalProxyRewritesResolve`
6. `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`

### v15.0

| Codemod | 命令 |
|---|---|
| `app-dir-runtime-config-experimental-edge` | `npx @next/codemod@latest app-dir-runtime-config-experimental-edge .` |
| `next-async-request-api` | `npx @next/codemod@latest next-async-request-api .` |
| `next-request-geo-ip` | `npx @next/codemod@latest next-request-geo-ip .` |

⚠️ **codemod 行为解析规则**：

| 场景 | 处理方式 |
|---|---|
| 顶层/普通函数 | 加类型断言（`UnsafeUnwrapped*`）**并在 dev 打印警告** |
| 自定义 Hook | 用 `React.use()` 解包 |
| 页面/路由条目 + `generateMetadata`/`generateViewport` | 转为 async 并 `await` |
| 客户端组件（无法 async） | 用 `React.use()` |

⚠️ **关键机制**：无法自动迁移时，codemod 会加**注释（`@next/codemod` 前缀）或类型转换**通知用户手动处理 —— **这些标记不删掉构建就会报错**。

### 更早版本

| 版本 | Codemod | 命令 |
|---|---|---|
| 14.0 | `next-og-import` | `npx @next/codemod@latest next-og-import .` |
| 14.0 | `metadata-to-viewport-export` | `npx @next/codemod@latest metadata-to-viewport-export .` |
| 13.2 | `built-in-next-font` | `npx @next/codemod@latest built-in-next-font .` |
| 13.0 | `next-image-to-legacy-image` | `npx @next/codemod@latest next-image-to-legacy-image .` |
| 13.0 | `next-image-experimental` | `npx @next/codemod@latest next-image-experimental .` |
| 11 | `new-link` | `npx @next/codemod@latest new-link .` |
| 11 | `cra-to-next` | `npx @next/codemod cra-to-next` |
| 10 | `add-missing-react-import` | `npx @next/codemod add-missing-react-import` |
| 9 | `name-default-component` | `npx @next/codemod name-default-component` |

### 升级到最新版

```bash
# Next.js 16+
next upgrade

# Next.js 15 及更早版本
npx @next/codemod@canary upgrade latest

# 手动升级
pnpm i next@latest react@latest react-dom@latest eslint-config-next@latest

# 升级到 Canary
npm i next@canary
```

---

# 第九部分 · 附录

## 48. 陷阱速查清单

### 缓存层

1. ⚠️ `proxy` **不支持获取缓存** —— 内部所有 fetch 被取消缓存
2. ⚠️ `fetch` 默认**不缓存**（`auto no cache`），但路由仍会被 pre-render 并缓存 HTML
3. ⚠️ 全路由缓存**在新部署中被清除**；数据缓存跨部署持久
4. ⚠️ 请求记忆仅适用 `GET`，**不适用路由处理程序**；渲染通道结束即清空
5. ⚠️ `fetch` 的 HMR 缓存在开发中让 `no-store` 请求看不到新数据
6. ⚠️ 开发中含 `cache-control: no-cache` 标头时，`cache`/`next.revalidate`/`next.tags` **全部被忽略**
7. ⚠️ `revalidatePath`/`revalidateTag` 在**路由处理程序**中**不会立即**失效路由缓存
8. ⚠️ `fetch` 的冲突选项（`{ revalidate: 3600, cache: 'no-store' }`）被忽略并打印警告
9. ⚠️ 同一路由内相同 URL 的多个 `fetch` 用**较低**的 `revalidate`
10. ⚠️ 标签限制：**最大 256 字符、最多 128 项**
11. ⚠️ 路由处理程序中**不能直接在主体用 `use cache`** —— 必须提取到辅助函数
12. ⚠️ **Proxy 不会针对按需 ISR 请求执行** —— 重新验证**确切的路径**

### 路由段配置

13. ⚠️ `cacheComponents` 打开时，所有路由段配置**被禁用并最终弃用**
14. ⚠️ `revalidate = 60 * 10` **无效**（必须可静态分析）；`runtime='edge'` 时 `revalidate` 不可用
15. ⚠️ `fetchCache` 跨段组合有严格限制
16. ⚠️ 缓存组件**不支持** `runtime: 'edge'`
17. ⚠️ 开发中页面始终按需渲染，从不缓存

### `use cache`

18. ⚠️ `use cache` 中直接调 `cookies()`/`headers()` **立即失败**（`next-request-in-use-cache`）
19. ⚠️ 把 Promise 传入则**构建挂起 50 秒超时**
20. ⚠️ 文件级 `use cache` 要求**所有导出都是异步函数**
21. ⚠️ 参数序列化比返回值**更严格** —— 可返回 JSX，但 JSX **不能作为参数**
22. ⚠️ 缓存函数体内**直接引用 JSX 插槽**会影响缓存条目
23. ⚠️ 无服务器架构下运行时缓存**不跨请求保持**
24. ⚠️ 客户端路由强制**至少 30 秒**过期时间
25. ⚠️ 缓存组件下 `generateStaticParams` **必须至少返回一个参数**
26. ⚠️ 共享去重存储（`Map` 存动态 Promise）会**构建挂起**

### API 使用

27. ⚠️ 不得将不受信任 URL 传给 `router.push`/`replace`（**XSS**）
28. ⚠️ `redirect` **抛异常** —— 必须放在 `try` 块**外部**；不需要 `return`
29. ⚠️ `redirect` 不能在客户端组件的**事件处理器**中调用 → 用 `useRouter`
30. ⚠️ `cookies.set`/`delete` 只能在服务器操作或路由处理程序中；`.delete` 还要求同域同协议
31. ⚠️ `updateTag` / `refresh` **只能在服务器操作中调用**
32. ⚠️ `revalidateTag(tag)` 单参数形式**已弃用**
33. ⚠️ `after` **不是**动态 API；即使响应失败也会执行；**不能在服务器组件内用请求 API**
34. ⚠️ `forbidden`/`unauthorized` **无法在根布局中调用**
35. ⚠️ 静态渲染路由中 `useSearchParams` **必须**包在 `Suspense` 中，否则**生产构建失败**（开发中不报错）
36. ⚠️ 布局**不接收** `searchParams`
37. ⚠️ 静态预渲染 + `rewrites` 组合下 `usePathname()` 会**水合不匹配**
38. ⚠️ `draftMode` 需 `await`；每次 `next build` 生成新旁路 cookie
39. ⚠️ `generateStaticParams` **必须返回数组**（即使为空）
40. ⚠️ `generateSitemaps` 的 `id` 自 **v16** 起是 `Promise<string>`
41. ⚠️ `ImageResponse`：**≤500KB** 打包、仅 flexbox 子集（`display: grid` 无效）、仅 ttf/otf/woff
42. ⚠️ `NextRequest` 自 v15 起**无 `ip`/`geo`**
43. ⚠️ `NextResponse.next({ headers })` 是**反模式**，可能破坏流式响应
44. ⚠️ `cookies`/`headers`/`draftMode` 在 v15 仍可同步访问，但**将来会弃用**

### 组件与配置

45. ⚠️ `<Image>`：v16 **弃用 `priority`**，改用 `preload`；多数场景应用 `loading="eager"`/`fetchPriority="high"`
46. ⚠️ `<Image>`：`width`/`height` 是 **intrinsic 尺寸**（防 CLS），**不决定渲染尺寸**
47. ⚠️ `<Image>`：用 `style` 设宽度时**必须**同时 `height: 'auto'`
48. ⚠️ `<Image>`：默认 loader **不转发请求头**，认证图片用 `unoptimized`
49. ⚠️ `<Image>`：主题检测时**不能**用 `preload`/`loading="eager"`
50. ⚠️ 任何接受函数的 prop（`loader`/`onLoad`/`onError`）**需要客户端组件**
51. ⚠️ `<Script>`：三个回调**只能在客户端组件**用；`onLoad`/`onError` **不能与 `beforeInteractive` 同用**
52. ⚠️ `<Form>`：`action` 为函数时 `replace`/`scroll` **被忽略**；`key` 不支持传给字符串 `action`
53. ⚠️ `next/font`：`preload: true`（默认）但**未指定 `subsets` 会警告**
54. ⚠️ `basePath` **必须构建时设置**；但 `next/image` 的 `src` **不自动加**
55. ⚠️ `next.config.js` 的 `env` 无条件打进 bundle；⚠️ **不能解构 `process.env`**
56. ⚠️ `distDir` **不能离开项目目录**
57. ⚠️ `redirects`/`rewrites` 路径参数中**冒号前必须有 `/`**，否则**无限重定向**
58. ⚠️ `beforeFiles` 重写**匹配源后不立即检查文件系统**
59. ⚠️ 不可变资源的 `Cache-Control: immutable` **无法覆盖**
60. ⚠️ Turbopack **不识别** `next.config.js` 的 `webpack()` 配置
61. ⚠️ Turbopack 中 `.css` **永远是全局的**
62. ⚠️ Turbopack 不支持 `sassOptions.functions`、Sass `~` 语法、webpack 插件
63. ⚠️ 性能对比 Turbopack vs webpack 前**务必删 `.next`**

### 路由与文件

64. ⚠️ `params`/`searchParams`/route 的 `context.params` **都是 Promise**
65. ⚠️ **`searchParams` 是动态 API** —— 使用它会使页面动态渲染；且是**普通对象**
66. ⚠️ **布局不会重新渲染** —— 读不到 pathname/searchParams/下方路由段，也不能向 children 传数据
67. ⚠️ 根布局**必须**有 `<html>`/`<body>`；**不要**手动写 `<head>`
68. ⚠️ `error.js`/`global-error.jsx` **必须是客户端组件** → `global-error.jsx` **不支持** metadata
69. ⚠️ **服务器组件抛出的错误，`error.message` 是通用消息 + digest**
70. ⚠️ 流式响应返回 **200**；`notFound()` 要放在 Suspense 边界**之前**
71. ⚠️ 路由组内**不同组不能解析到同一 URL**
72. ⚠️ 并行路由：**同级别不能混 static 与 dynamic 槽**；**v16 起缺 `default.js` 会构建失败**
73. ⚠️ **拦截路由 `(..)` 基于路由段而非文件系统**
74. ⚠️ 模态关闭：槽会**保持可见**，必须配返回 `null` 的 `page.tsx`/catch-all
75. ⚠️ `generateStaticParams` 的构建期验证**只覆盖示例参数走过的代码路径**
76. ⚠️ **`src/` 存在时根目录的 `app`/`pages` 会被忽略**；**proxy 必须在 `src` 内**
77. ⚠️ **Proxy 会被部署到 CDN** → 不要依赖共享模块或全局变量
78. ⚠️ **Proxy 中设置 `runtime` 会报错**
79. ⚠️ `matcher` **必须是常量**
80. ⚠️ 远程 MDX = **RCE 风险**
81. ⚠️ **JSON-LD 必须把 `<` 替换为 `\u003c`**
82. ⚠️ **CSP nonce 会禁用静态优化与 ISR，且与 PPR 不兼容**
83. ⚠️ 认证**不能只在 layout 里检查**；**不要在未授权时 `return null`**
84. ⚠️ Server Action **是公开 HTTP 端点** —— 必须自己做授权

---

## 49. API 速查表

### 导入来源速查

| 来源 | 导出 |
|---|---|
| `next/link` | `Link`（默认）、`useLinkStatus` |
| `next/navigation` | `useRouter`、`usePathname`、`useSearchParams`、`useParams`、`useSelectedLayoutSegment(s)`、`redirect`、`permanentRedirect`、`notFound`、`forbidden`、`unauthorized`、`RedirectType`、`unstable_rethrow` |
| `next/headers` | `cookies`、`headers`、`draftMode` |
| `next/cache` | `revalidateTag`、`revalidatePath`、`updateTag`、`refresh`、`unstable_cache`、`cacheTag`、`cacheLife` |
| `next/server` | `NextRequest`、`NextResponse`、`userAgent`、`after`、`connection`、`unstable_noStore` |
| `next/image` | `Image`（默认）、`getImageProps` |
| `next/script` | `Script`（默认） |
| `next/form` | `Form`（默认） |
| `next/og` | `ImageResponse` |
| `next/font/google` | 所有 Google 字体 |
| `next/font/local` | `localFont`（默认） |
| `next/dynamic` | `dynamic`（默认） |
| `next` | `Metadata`、`Viewport`、`ResolvingMetadata`、`NextConfig`、`NextRequest`、`NextResponse` |
| `next/web-vitals` | `useReportWebVitals` |
| `next/typescript` | `NextConfig` 等类型 |

### 常用配置速查

| 需求 | 配置 |
|---|---|
| 强制静态 | `export const dynamic = 'force-static'` |
| 强制动态 | `export const dynamic = 'force-dynamic'` |
| ISR | `export const revalidate = 3600` |
| 动态段 404 | `export const dynamicParams = false` |
| 运行时评估环境变量 | `await connection()` |
| 缓存组件 | `next.config.js` → `cacheComponents: true` |
| 缓存一个函数 | `'use cache'` + `cacheLife('hours')` |
| 立即失效（写场景） | `updateTag('tag')`（仅 Server Action） |
| 标记过期（读场景） | `revalidateTag('tag', 'max')` |
| 刷新客户端路由 | `refresh()`（仅 Server Action） |
| 部署到子路径 | `basePath: '/docs'` |
| 静态导出 | `output: 'export'` |
| 最小 Docker 镜像 | `output: 'standalone'` |
| 远程图片 | `images.remotePatterns` |
| 自定义缓存存储 | `cacheHandlers` |
| 路由类型检查 | `typedRoutes: true` |

### 环境变量速查

| 前缀 | 可见范围 |
|---|---|
| 无前缀 | **仅服务器**。客户端引用会被替换为空字符串 |
| `NEXT_PUBLIC_` | **客户端 + 服务器**，⚠️ 构建时**冻结** |

### 状态码速查

| 场景 | 状态码 |
|---|---|
| `redirect()`（服务器组件/路由处理程序） | **307** |
| `redirect()`（服务器操作） | **303** |
| `permanentRedirect()` | **308** |
| `redirects` `permanent: true` | **308** |
| `redirects` `permanent: false` | **307** |
| `notFound()` | **404**（⚠️ 流式时是 200） |
| `forbidden()` | **403** |
| `unauthorized()` | **401** |
| 不支持的 HTTP 方法 | **405** |

### 动态 API 清单（会 opt-in 到动态渲染）

| API | 来源 |
|---|---|
| `cookies()` | `next/headers` |
| `headers()` | `next/headers` |
| `draftMode()` | `next/headers` |
| `connection()` | `next/server` |
| `searchParams` prop | Page |
| `unstable_noStore()` | `next/server` |
| `fetch` + `{ cache: 'no-store' }` | — |
| `useSearchParams()` | 客户端组件 |
| `router.push` / `replace` | 客户端 |

---

## 50. 学习路径建议

### 阶段一：入门（1–2 天）

1. 跑通 `create-next-app`，理解**文件约定即路由**
2. 理解**布局 vs 模板**的区别（状态保留 vs 重挂载）
3. 掌握 `<Link>` 导航与预取
4. 写一个带动态路由的博客列表 + 详情页

**产出**：静态博客（列表 + 详情 + 404）

### 阶段二：数据与渲染（3–5 天）

1. 理解**服务器组件 vs 客户端组件**的边界划分
2. 掌握 `fetch` + `cache()` 去重
3. 理解 **Suspense + `loading.tsx`** 的流式渲染
4. 写 Server Actions 处理表单（`useActionState` + zod）
5. 理解**布局的四个限制**（不重渲染、读不到路径等）

**产出**：带评论功能的博客（Server Actions + 表单校验）

### 阶段三：缓存（3–5 天）⚠️ 最难

1. 背下**四层缓存对照表**
2. 理解**哪些 API 会让路由变动态**
3. 掌握 `revalidateTag` / `revalidatePath` / `updateTag` / `refresh` 的区别
4. 理解 **Cache Components + `'use cache'` + `cacheLife`**
5. 用 `NEXT_PRIVATE_DEBUG_CACHE=1` 调试

**产出**：带 ISR 的内容站（`revalidate` + 按需重新验证）

### 阶段四：实战（5–7 天）

1. **认证**（DAL + `verifySession` + Proxy 乐观检查）
2. **数据安全**（DTO + `server-only` + taint）
3. 部署（Docker / Vercel）+ 环境变量配置
4. 测试（Jest / Playwright）

**产出**：带登录的完整应用

### 阶段五：进阶（按需）

| 方向 | 章节 |
|---|---|
| 性能优化 | Turbopack、缓存、包分析、内存优化 |
| SEO | Metadata API、OG 图片、JSON-LD、sitemap |
| 复杂 UI | 并行路由、拦截路由、模态框 |
| 国际化 | `app/[lang]` + Proxy + 字典 |
| 安全 | CSP、SRI、Taint |
| 微前端 | 多区域、多租户 |

### 推荐配套资源

| 资源 | 用途 |
|---|---|
| [React 基础课程](https://react.nodejs.cn/learn/react-foundations) | React 基础 |
| [Next.js 基础课程](https://next.nodejs.cn/learn/dashboard-app) | 边学边做应用 |
| `NEXT_PRIVATE_DEBUG_CACHE=1` | 调试缓存 |
| `NEXT_TURBOPACK_TRACING=1` | 调试打包性能 |
| `npx next experimental-analyze` | 包体积分析 |
| DevTools（React DevTools） | 切换错误边界测试错误状态 |
| Lighthouse（隐身模式） | 生产前性能验证 |

### ⚠️ 十条最重要的纪律

1. **默认一切都是服务器组件**，`'use client'` 尽量少加、尽量深加
2. **`params` / `searchParams` 永远是 Promise**
3. **不要在 `layout` 里做认证检查**——放 DAL
4. **Server Action 是公开 HTTP 端点**——必须自己授权
5. **不要从 Server Component 调 Route Handler**——直接取数
6. **数据传给客户端组件前先过 DTO**
7. **记住四层缓存**和它们的失效规则
8. **流式响应返回 200**——需要真 404 状态码要在 proxy 里提前判断
9. **生产环境用认证库**，不要自研
10. **部署前跑 `next build` + `next start`** 验证真实行为（dev 模式掩盖了很多问题）

---

## 结语

本文档整理自 [Next.js 中文网官方文档](https://next.nodejs.cn/docs/)，覆盖 **422 个官方页面、2681 个代码示例**。

**Next.js 16 的三个核心变化值得重点关注**：

1. **Turbopack 成为默认** —— 更快，但也移除了 webpack 的一些能力
2. **Cache Components 统一了 PPR / useCache / dynamicIO** —— 缓存模型更清晰，但也需要重新理解
3. **`middleware` 更名为 `proxy`** —— 语义更准确，但注意运行时变为 Node.js

**官方资源**：

- 文档：https://next.nodejs.cn/docs/
- 示例：https://github.com/vercel/next.js/tree/canary/examples
- 错误码：https://nextjs.org/docs/messages/nextjs-errors
- Codemod：https://nextjs.org/docs/app/building-your-application/upgrading/codemods

---

*文档生成时间：2026-10-08 | 对应官方版本：Next.js 16.4.0*
