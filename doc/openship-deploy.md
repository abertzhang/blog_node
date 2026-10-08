# Openship 部署手册

本项目采用 **Openship Cloud+ 两个独立项目** 的部署结构。

| 项目 | 目录 | 框架 | 端口 | 配置文件 |
|---|---|---|---|---|
| web | `web/` | Next.js 16（standalone） | 3000 | `web/openship.json` |
| backend | `backend/` | Express 4 | 3000 | `backend/openship.json` |

两个配置均已通过 `openship config validate` 官方校验。

---

## 一、前置：注册并登录 Openship Cloud

1. 打开 https://openship.io/ 注册账号
2. 本地登录（CLI 会把token 存到 `~/.openship`）：
   ```bash
   openship login
   ```
   或用 Personal Access Token：
   ```bash
   openship token create
   openship login --token <PAT>
   ```
3. 确认连接状态：
   ```bash
   openship context list   # 应显示远程 apiUrl，且 auth 列非"-"
   ```

> 未登录时 `openship status` 会显示 `API http://localhost:4000 … not reachable`，
> 说明 CLI 仍指向本地默认上下文，此时执行 deploy 会失败。

---

## 二、推到 GitHub

当前仓库已有一次提交（`8b0f9aa`），但**还没有 remote**。

### 1. 在 GitHub 建空仓库

新建一个仓库（**不要**勾选 README/.gitignore/LICENSE，否则会产生冲突提交）。

### 2. 关联并推送

```bash
cd /Users/zhangchunhua/project/node/blog_node
git remote add origin https://github.com/<你的用户名>/blog_node.git
git push -u origin main
```

### 3. 建议：设为私有仓库

Openship 通过 GitHub App 授权读取源码。公开仓库会直接暴露代码。

---

## 三、创建两个项目

因为 web 和 backend 在**同一个仓库的不同目录**，需要在 Openship 项目设置里分别指定 `rootDirectory`。

### 项目 A — blog-web

```bash
openship project create --name blog-web --git-owner <你的用户名> --git-repo blog_node
```

然后在 **Dashboard → blog-web → Settings → Build settings** 里：

- **Root directory**填 `web`

或在仓库根目录的 `openship.json` 用 `rootDirectory` 字段声明（当前已放在 `web/openship.json`，
需要 Dashboard 里把 root directory 指向 `web` 才会被读取）。

### 项目 B — blog-api

```bash
openship project create --name blog-api --git-owner <你的用户名> --git-repo blog_node
```

**Root directory** 填 `backend`。

### 绑定仓库

```bash
openship init --project <blog-web 的 project id>    # 在 web/ 目录下执行
openship init --project <blog-api 的 project id>    # 在 backend/ 目录下执行
```

`init` 会写入 `.openship/project.json`（已在 `.gitignore` 中，不会进仓库）。

---

## 四、配置跨服务环境变量

后端域名拿到后，需要写回 web 的 `NEXT_PUBLIC_API_URL`（这是**构建时注入**，改完必须重新部署 web）。

```bash
# 1. 给后端加域名
openship domain add <后端子域> --project <blog-api 的 id>

# 2. 把真实后端地址写进 web 配置（编辑 web/openship.json 的 env.NEXT_PUBLIC_API_URL）
#    然后提交并重新部署 web
git commit -am "chore: 更新后端 API 地址"
git push
```

### 免费子域名 vs 自定义域名

- **免费子域名**：写裸标签即可，如 `"domains": ["blog-web"]` → `*.opsh.io` 风格子域名
- **自定义域名**：写完整域名，如 `"domains": ["blog.example.com"]`，需先配置 DNS A 记录指向服务器

---

## 五、首次部署

```bash
# 部署 web
cd web && openship deploy --watch

# 部署 backend
cd ../backend && openship deploy --watch
```

`--watch` 会实时打印构建日志，最长等待 10 分钟（可用 `--timeout` 毫秒数调整）。

---

## 六、部署后验证清单

- [ ] `curl -I https://<web域名>` 返回 200
- [ ] `curl https://<api域名>/` 返回后端响应
- [ ] Dashboard → 该项目 → **Logs** 无启动错误
- [ ] web 页面上`NEXT_PUBLIC_API_URL` 指向的地址正确
- [ ] Rollback 可用：Console → Releases → 选旧版本回滚

---

## 常见问题

### `npm ci --omit=dev` 失败

backend 用的是 `installCommand: npm ci --omit=dev`，要求 `package-lock.json` 与 `package.json`
严格一致。当前锁文件里含 devDependency `nodemon`（开发时用），生产不装它是对的。
若报锁不同步，在本地跑 `cd backend && npm install` 更新锁文件后提交。

### Next.js 构建报数据库连接错误

后端目前无数据库连接，不涉及。若后续加了数据库，注意 **不要**在 `next build` 阶段连库
（build 时数据库可能不可达），改成运行时连接或用 `releaseCommands` 跑迁移。

### 端口冲突

两个项目各跑在自己的容器里，都用 3000 **不冲突** —— Openship 通过 edge 层按域名分流，
不需要暴露端口到公网。

---

## 附：常用命令速查

```bash
openship project list                      # 项目列表
openship deployment list --project <id>    # 部署历史
openship deployment getdep_xxx# 部署详情
openship logs dep_xxx --follow             # 跟随日志
openship service logs <svc> --project <id> --follow
openship deployment rollback dep_prev# 回滚
openship deployment redeploy dep_xxx       # 重新部署
openship config validate# 校验配置
```
