# Oracle Cloud Always Free 部署资料（blog_node 简历项目）

> 收集时间：2026-10-08
> 用途：把 blog_node（Next.js 16 + Express 4 + PostgreSQL + Prisma + Docker）部署到 Oracle Cloud 永久免费实例，面向**海外 remote 简历展示**，国内仅要求"能看到"。

---

## 0. 决策结论

- **选定方案**：Oracle Cloud Always Free（ARM 实例，永久 $0）
- **优于 RackNerd 美国档**：配置更强（12GB 内存起）、永久免费、可完整 `docker compose` 起 PostgreSQL + web + backend
- **代价**：需绑实体双币信用卡做验证、注册偶有风控、自己当运维（Docker/防火墙/SSL/更新/备份全自己来）
- **前提**：接受"自己运维" + "愿绑卡"，否则退回 Render 免费档（见文档末尾备选）

---

## 1. 免费资源清单（2026 现状，⚠️ 重要）

| 资源 | 规格 | 数量 | 备注 |
|---|---|---|---|
| **ARM 计算（Ampere A1）** | **最多 2 OCPU + 12GB RAM**（2026 已缩减） | 1 台 | ⚠️ 原 4核24G 已砍半，现稳开的是 2c12g |
| AMD 计算（x86） | 1/8 OCPU + 1GB | 最多 2 台 | 太弱，本项目不用 |
| 块存储 | 总计 200GB | 共享池 | 单实例引导卷最多 200G；5 个免费快照 |
| 对象存储 | 10GB | — | 可放 PG 备份 |
| 出站流量 | **10TB/月** | 全实例共享 | 超了断网，本项目够用 |
| 负载均衡 | 10Mbps | 1 个 | 可选 |

⚠️ **ARM 配额缩减是 2026 年最大变化**：早期教程（含部分 2026-04 旧文）仍写"4核24G"，但 duozhedian、CldEnv 等 2026 年实测均确认已降为 **2 OCPU + 12GB**。实际能稳开的就是 2c12g——对 blog_node 依然极宽裕（PG 给 1–2GB、Next+Express 各数百 MB，剩余大量余量）。**别预期 4c24g**，避免抢不到时失望。

---

## 2. 注册前准备（中国用户）

- **实体 Visa / Mastercard 双币卡**：中行 / 招行 / 建行实体卡成功率最高；**虚拟卡、预付卡（prepaid）基本 100% 被拒**；需支持 **3D Secure** 与外币在线支付
- **邮箱**：Gmail / Outlook（临时邮箱已被 Oracle 拉黑）
- **手机号**：+86 真实号，收短信验证码
- **网络**：**关掉 VPN / 代理**，用手机 4G/5G 热点；注册 IP 的国家必须与信用卡发卡国一致（中国卡 → 中国 IP）
- **地址**：填与信用卡账单一致（拼音 / 英文，如 `123 Renmin Road, Beijing, 100000, China`）

绑卡时会发起 **$1 预授权，1–3 天自动释放**，并非真实扣款。

---

## 3. 注册流程要点

1. 访问 `oracle.com/cloud/free` → Start for Free（建议无痕模式）
2. 国家选 China、姓名拼音、邮箱验证
3. 设置密码（12–40 字符，含大小写+数字+特殊字符）
4. 绑卡（$1 预授权）
5. **选择 Home Region（⚠️ 注册后不可更改，见第 4 节）**
6. 等待 1–5 分钟跳转控制台，开启 MFA

**失败排查（按顺序）**：关代理换手机热点 → 地址与卡账单一致 → 换实体 Visa/Mastercard → 等 24h 再试（同一张卡短时间重复提交会被风控）。

---

## 4. Region 选择（结合本项目需求）

需求特征：**主要给海外 remote 雇主看，国内只要求"能看到"**。延迟优先级低于"能不能开到机器"。

| 候选 Region | 对国内延迟 | ARM 库存 | 对欧美 remote | 建议 |
|---|---|---|---|---|
| **美西 凤凰城 Phoenix** | 200ms+ | **充裕，易开到** | 低延迟 | ✅ **首选** |
| 孟买 Mumbai | 高 | 较松 | 中 | 备选 |
| 雅加达 Jakarta | 高 | 较松 | 中 | 备选 |
| 首尔 Seoul | 50–80ms | **紧张，需抢** | 中 | 仅当你坚持国内也快 |
| 东京 Tokyo | 45–80ms | **紧张，需抢** | 中 | 仅当你坚持国内也快 |
| 新加坡 Singapore | 100ms+ | 一般 | 中 | 不优先 |

➡️ **结论：选 Phoenix（美西）**。理由：ARM 库存最充裕（一次就能开到机器）、对欧美雇主访问快；国内 200ms+ 但"仅可见"可接受。首尔/东京虽国内快，但 ARM 常 `Resource unavailable`，开不到机器等于没有——不要因"低延迟"优先选它们。

> 国内访问优化提示：若日后想让国内也快，可在 Oracle 前套 **Cloudflare**（免费），把域名 CNAME 到 CF，由 CF 边缘缓存静态资源。但 CF 国内节点质量参差，属可选增强。

---

## 5. 创建 ARM 实例

路径：控制台 → Compute → Instances → Create Instance

- **Image**：Ubuntu 22.04 或 24.04（ARM64），**必须带 "Always Free Eligible" 标签**
- **Shape**：`VM.Standard.A1.Flex`，分配 **2 OCPU / 12GB**（安全值，避免抢 4c 失败）
- **Boot volume**：自定义 200GB（home region 共享池，单实例最多）
- **SSH key**：上传本地 `.pub` 公钥（没有就 `ssh-keygen -t rsa -b 4096`）
- **Security List**：添加入站规则 TCP 22/80/443，来源 `0.0.0.0/0`

实例创建后记录**公网 IP**，SSH 登录：`ssh -i ~/.ssh/xxx ubuntu@<公网IP>`。

---

## 6. 服务器初始化（⚠️ 含最常见坑）

```bash
# 1. 更新系统
sudo apt update && sudo apt upgrade -y

# 2. 安装 Docker + compose 插件
sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker          # 立即生效，或重登录

# 3. ⚠️ 关键坑：Oracle Ubuntu 默认 iptables 只放行 SSH！
#    云安全列表开了 80/443 仍打不开，是 OS 层防火墙挡的。必须手动开：
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80  -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save    # 持久化，否则重启失效

# 4. 可选：加 swap 防内存尖峰（12GB 通常不必，但廉价保险）
sudo fallocate -l 16G /swapfile && sudo chmod 600 /swapfile \
  && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

保活防回收：免费实例长期空置可能被判定 abandoned 回收，**定期登录控制台**或让机器跑实际服务即可。

---

## 7. 部署架构（docker compose + Caddy + PG 持久卷）

```
                ┌──────────── 公网 80/443 ────────────┐
  浏览器 ───────►│  Caddy 反向代理（自动 Let's Encrypt）│
                └─────── localhost 仅内网 ────────────┘
                         │              │
              reverse_proxy        reverse_proxy /api/*
                  :3000               :4000
                     │                  │
              ┌──────┴─────┐     ┌──────┴─────┐
              │ web (Next  │     │ backend    │
              │ standalone)│     │ (Express)  │
              └────────────┘     └──────┬─────┘
                                        │ DATABASE_URL
                                   ┌──────┴─────┐
                                   │ postgres   │
                                   │ :5432      │
                                   │ 命名卷持久化│
                                   └────────────┘
```

- **web**：Next.js `productionMode: standalone`，容器内 3000；host 映射 `127.0.0.1:3000`
- **backend**：Express，容器内 4000；host 映射 `127.0.0.1:4000`（避免与 web 同端口冲突）
- **postgres**：官方镜像，数据挂命名卷 `pgdata`（Oracle 有持久块存储，重启不丢）
- **容器端口只绑 localhost**，Caddy 是唯一对外入口 → 统一管理 HTTPS

**Caddyfile 示例（单域名分流）**：
```
blog.example.com {
    reverse_proxy /api/* localhost:4000
    reverse_proxy localhost:3000
}
```

**Caddyfile 示例（backend 用子域）**：
```
blog.example.com {
    reverse_proxy localhost:3000
}
api.blog.example.com {
    reverse_proxy localhost:4000
}
```

Caddy 自动申请/续期 Let's Encrypt 证书，**无需手动管理证书**。改完 `sudo systemctl reload caddy`。

---

## 8. 域名与 SSL

- **自有域名**：注册商处加 DNS **A 记录**指向实例公网 IP（裸域 + www + api）
- **免费子域**：DuckDNS（`yourname.duckdns.org`），Web 界面填 IP 即可
- Caddy 自动 HTTPS（90 天周期自动续）
- ⚠️ **本项目 NEXT_PUBLIC_API_URL 是构建时注入**（见项目 MEMORY）：部署前必须填真实后端地址
  （如 `https://api.blog.example.com` 或 `https://blog.example.com/api`），改完要**重新 build** 才能生效

---

## 9. 常见坑速查

| 现象 | 根因 | 解决 |
|---|---|---|
| 注册被拒 / 红感叹号 | IP 与卡国不符 / 虚拟卡 / 地址不一致 | 关代理换热点、换实体双币卡、地址对齐账单 |
| 创建实例 `Resource unavailable` | ARM 库存紧张 | 非高峰（美西工作时间）重试；或先开 1c6g 再扩；Phoenix 最易 |
| 配对了却是打不开网站 | OS 层 iptables 挡 80/443 | 第 6 节第 3 步开端口 + `netfilter-persistent save` |
| 产生账单 | 没选 Always Free Eligible 标签 | 创建时确认标签；非免费规格立即删 |
| 实例被回收 | 长期闲置 | 定期登录 / 跑实际服务 |
| Let's Encrypt 失败 | DNS 未指向 / 80 被挡 / 频率限制 | 检查 A 记录、开 80、等 1h 重试 |
| PG 数据丢失 | 没挂卷 / 卷被删 | 用命名卷 + 定时 `pg_dump` 备份 |

---

## 10. 本项目（blog_node monorepo）适配要点

- 结构：`web`(Next standalone) + `backend`(Express) + `packages/shared`(pnpm workspace)
- 构建：`pnpm -r build` → web 产出 standalone 镜像、backend 产出运行镜像
- **环境变量**：
  - `DATABASE_URL=postgresql://<user>:<pw>@postgres:5432/blog`（容器内用服务名 `postgres`）
  - `NEXT_PUBLIC_API_URL`：构建时注入真实后端域名（见第 8 节）
- **Prisma**：生产用 `prisma migrate deploy`（不是 `migrate dev`）
- **内存分配（12GB 充裕）**：PG 1–2GB、Next + Express 各数百 MB，余量巨大
- **frontmatter / R2**：原设计因 Openship 无卷才用 R2 存 md 正文；现 Oracle 有持久卷，
  可改为本地磁盘存正文（PG 存元数据），R2 是否保留待定

---

## 11. 验证清单

- [ ] 注册成功、开启 MFA、确认 Limits 显示 Always Free
- [ ] ARM 实例 Running 且带 Always Free Eligible 标签（2c12g）
- [ ] 安全列表 + OS iptables 均开放 80/443（外网 `curl http://<IP>` 可达）
- [ ] `docker compose up -d` 后 web/backend/postgres 三服务 healthy
- [ ] Caddy 证书签发成功，`https://域名` 可访问
- [ ] PG 数据持久（重启 postgres 容器不丢）
- [ ] `pg_dump` 定时备份脚本就位
- [ ] `NEXT_PUBLIC_API_URL` 已填真实地址并重新 build

---

## 附：备选（不想绑卡 / 不想运维）

若不想过 Oracle 注册门槛，可退回**容器 PaaS 免费档**：
- **Render**：连 GitHub 指定 Dockerfile 直接部署，免费自定义域名；缺点：免费 PG 90 天删除、服务 15 分钟休眠冷启动 30–50s
- **Koyeb / SnapDeploy**：更轻量（256–512MB），跑全套偏紧
- ⚠️ **Fly.io 2024 已取消免费档**、**Vercel/Netlify 只跑前端不能跑你的 Docker/PG**——旧教程已失效
