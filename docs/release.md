# 部署与发布方案（`apps/web` + `apps/cms`）

前端 `apps/web`（Vue 3 + Vite）与后端 `apps/cms`（Strapi 5）部署到同一台云服务器，通过 Gitea Actions 网页触发自动打包、上传、发布。两者同处一个仓库（monorepo），各有独立的发布工作流，但共享同一套服务器基建与目录结构。

配套文档：[运维方案](./operations.md)（日常运维、备份恢复、监控、排障）。本文档覆盖从零到有的服务器部署、代码改动、以及落地后的自动化发布链路。

> ### ⚠️ 先读这一条：`ENCRYPTION_KEY`
>
> 整个部署流程里**只有这一个决定不可逆**。
>
> 如果你要保留本地 `.tmp/data.db` 里已录入的文章（[五、步骤 7](#步骤-7迁移现有数据可选)），那么服务器 `/etc/strapi/.env` 中的 `ENCRYPTION_KEY` **必须逐字沿用本地 `.env` 的原值**。该键用于加密数据库中的敏感字段；换掉之后，旧数据的加密列永久无法解密，且没有任何补救手段。
>
> 其余五个密钥（`APP_KEYS`、`JWT_SECRET`、`ADMIN_JWT_SECRET`、`API_TOKEN_SALT`、`TRANSFER_TOKEN_SALT`）都可以自由重新生成，代价仅是会话和已签发 token 失效。
>
> 若不迁移数据、在服务器上重新录入内容，则六个密钥全部用新值即可。
>
> **动手前先把本地 `.env` 的 `ENCRYPTION_KEY` 复制到安全的地方。**

## 一、方案概要

### 单机技术选型

| 项 | 选定方案 | 理由 |
| --- | --- | --- |
| 进程管理 | systemd | 零额外依赖，支持进程沙箱，日志/重启/自启走系统标准行为 |
| 反向代理 | Nginx | 终结 TLS、限速、可选 IP 白名单、静态文件服务 |
| 数据库 | SQLite | 现有数据量小、单人编辑；备份即单文件复制 |
| TLS | Let's Encrypt (certbot) | 免费且自动续期 |
| Node | 22 LTS (NodeSource apt) | 落在 `package.json` 的 `>=20 <=26` 区间内，且有确定的绝对路径供 systemd 使用 |

不选 Docker 的原因：本项目独占服务器、不做迁移，Docker 的可移植/可复现优势用不上，却会引入 `public/uploads` 卷的 UID 不匹配问题（容器内用户与宿主机目录 owner 不一致导致上传 permission denied）。

不选 Postgres 的原因：当前数据约 1 MB、单一内容类型、单人编辑。SQLite 的限制是单写入者并发，尚未触及。后续如需多人同时编辑再迁移，见[运维方案 §九](./operations.md#九迁移到-postgres-的时机)。

### 发布平台选型：Gitea Actions，不引入新平台

已有 Gitea 自托管实例（`192.168.3.69:60022`），团队研发流程规范已把 Gitea Actions 定为 CI/CD 方案、并列出 act_runner 部署清单。发布基建延续这个决定，不另起一套。

对比过的其他方案，以及为什么不选：

| 方案 | 为什么不选 |
| --- | --- |
| Jenkins | 功能足够，但要额外维护一个服务 + 插件生态；只有一个仓库、一个环境，投入产出不划算 |
| GitLab CE | 要迁移代码托管，成本远大于收益 |
| Woodpecker / Drone | 比 Gitea Actions 轻，但仍是独立服务；Gitea Actions 已内置，无需额外部署控制面 |
| GitHub Actions + 自托管 runner | 需要把代码放到 GitHub，与「代码严禁出境」冲突 |
| 纯脚本 + Webhook | 没有网页界面、没有执行历史、没有并发控制，不满足「网页上操作」的诉求 |

Gitea Actions 的 `workflow_dispatch` 触发器正好对应「在网页上对 main 分支打包部署」的诉求：仓库页面 → Actions → 选择工作流 → Run workflow，可填参数、可看实时日志、有完整历史记录。

### 网络拓扑决定了数据流向

Gitea 在 `192.168.3.69`，是私有网段，云服务器无法访问。所以**不能让云服务器 `git pull`**，只能反过来：

```
内网                                          公网
┌───────────────────────────┐
│  Gitea 192.168.3.69:60022 │
│         ▲                 │
│         │ ① 网页点击触发    │
│         ▼                 │
│  act_runner（内网主机）    │  ──② SSH/rsync 推送制品──▶  云服务器
│  · git clone（内网直连）    │      （仅出站连接）          · 解包到新版本目录
│  · npm ci && build        │                            · 切换 current 符号链接
│  · 打包 tar.gz            │                            · 重载/重启服务
└───────────────────────────┘                            · 健康检查失败自动回滚
```

这个方向有三个好处：Gitea 不需要暴露到公网；云服务器不需要持有 git 凭据；构建负载不落在生产机上。代价是 runner 需要一台常开的内网机器（跑 Gitea 那台即可，没有额外成本）。

## 二、前置决策

### 代码出境范围

团队规范写明「代码严禁出境」，并据此排除了 SaaS 与公网 LLM。**云服务器在物理上就是内网之外**，而 Strapi 是 Node 应用，运行时必须在服务器上持有完整源码与配置。所以：

| 部署物 | 出境内容 | 性质 |
| --- | --- | --- |
| 前端 `dist/` | 压缩混淆后的 JS/CSS | 本来就要发给浏览器，等同公开，无风险 |
| 前端 `media/` | 官网图片与视频 | 对外宣传素材，本来就要公开 |
| 后端 Strapi 源码 | **完整 TS 源码 + 配置** | 真正意义上的出境 |

需要先明确：那条红线是针对「代码交给第三方服务/公网模型」，还是「代码离开内网机房」？

- 若是前者：部署到自有云服务器不违反，本方案可直接落地。
- 若是后者：Strapi 就不能放公网云，方案要改成后端留在内网、只把前端静态站发到云上，两者之间靠反向代理或 API 网关打通（需要内网有一条可控的入站通道）。这个判断决定后端放哪，**本文档剩余部分按「前者」假设撰写**（前后端同机）。

顺带说明，Strapi 源码里目前不含商业敏感逻辑 —— 一个 Article 内容类型、标准配置、一段权限初始化脚本。风险等级客观上不高，但这不改变决策权归属。

### 媒体文件不进版本控制

`apps/web/.gitignore` 把 `public/media/` 整个排除了。实测：

| 内容 | 体积 |
| --- | --- |
| `dist/assets`（JS + CSS） | 0.6 MB |
| `dist/media` | **103 MB** |
| 其中 `720P.mp4` 单文件 | **92.2 MB** |

CI 从 git clone 出来的工作区**没有 `public/media/`**，`vite build` 产出的 `dist/` 里 `media/` 是空的。直接部署的结果是：首页 hero 视频不播、所有产品页配图全部破图。而构建本身不会报错，日志全绿 —— 这是最容易上线后才发现的一类问题。

媒体文件不进版本控制这个决定是对的（92 MB 二进制文件进 git 会让仓库永久臃肿，且每次 clone 都要拉全量）。所以不改 `.gitignore`，而是把媒体作为**独立于发布流程的持久资源**，见[三、目标架构](#三目标架构)与[七、媒体资源同步](#七媒体资源同步)。

顺带一个性能建议：92 MB 的视频直接由源站发，首屏体验取决于服务器出口带宽。后续可以考虑转对象存储 + CDN，或至少压一版更低码率的做移动端回退。这不影响本方案落地，先记着。

### 待确认事项

前四条阻塞实施，后五条可以边做边定。

1. **代码出境范围的判断** —— 见上一小节，决定后端能否放公网云
2. **域名** —— 是否已解析到服务器 IP，证书邮箱用哪个；前端和后台是否共用一个域名（本方案假设共用，见三）
3. **服务器发行版与版本** —— 方案按 Ubuntu 22/24 写，其他发行版差异见[十二、附录 A](#十二附录a其他发行版差异)
4. **现有 `.tmp/data.db` 是否迁移** —— 决定 `ENCRYPTION_KEY` 是沿用还是重新生成
5. **`/admin` 是否加 IP 白名单** —— 出口 IP 固定则强烈建议加；动态 IP 不要加，会把自己锁在外面
6. **媒体是否走对象存储** —— 92 MB 视频从服务器直出会吃满出口带宽，现在不上 CDN 也能跑，但是首个可预见的瓶颈
7. **Gitea act_runner 装在哪** —— 内网另一台机器，还是 Gitea 服务器本机。本机最省事，但构建（`npm ci` + Vite build）会和 Gitea 抢 CPU
8. **是否按 tag 触发发布** —— 当前只支持网页手动 `workflow_dispatch`，需要时可加 `on: push: tags: ['v*']`
9. **预发布环境** —— 当前方案只有生产一套，见[十一、方案边界](#十一这套方案的边界)

## 三、目标架构

### 单域名，路径分流

前端已经是同源设计：`src/utils/request.ts` 里 `baseURL: import.meta.env.VITE_API_BASE ?? '/api'`，`vite.config.ts` 的 dev proxy 把 `/api` 和 `/uploads` 转给 Strapi。生产延续同源即可。

前端全部路由：`/`、`products`、`opticsgpt`、`ifts`、`instruments`、`about`、`contact`、`news`、`research`、`detail/:id`，**与 `/api`、`/admin`、`/uploads`、`/media` 均无冲突**。

```
                    https://www.example.com
                              │
                          Nginx (443)
                              │
   ┌──────────────┬───────────┴────────┬──────────────┬─────────────┐
   │              │                    │              │             │
   /              /media/              /api/          /admin        /uploads/
   │              │                    │              │             │
 web/current   web/shared/media   ┌────┴──────────────┴─────────────┴────┐
 (静态, SPA     (alias, 长缓存)     │  127.0.0.1:1337  Strapi (systemd)   │
  fallback)                        └──────────────────────────────────────┘
```

这样做的直接收益：**CORS 完全不需要**。同源请求，无预检，无白名单维护。`config/middlewares.ts` 保持默认的 `strapi::cors` 即可（保留 `CORS_ORIGINS` 变量作为将来分域名的余地，值留空即可）。

如果将来要把后台拆到 `cms.example.com`，再启用 CORS 即可，前端只需设 `VITE_API_BASE`。

### 目录结构：原子发布

发布的核心机制是**符号链接切换**：新版本解包到独立目录，就绪后原子地切 `current` 指向新目录。切换是单个 `rename` 系统调用，不存在「部分文件已更新、部分还是旧的」的中间态。

```
/srv/lightinfra/
├── web/
│   ├── releases/
│   │   ├── 20260818-142301-a3f0/     ← 每次发布一个新目录（0.6 MB）
│   │   └── 20260818-101502-9c21/
│   ├── shared/
│   │   └── media/                    ← 103 MB，持久，不随发布变动
│   └── current -> releases/20260818-142301-a3f0
│
├── cms/
│   ├── releases/
│   │   ├── 20260818-142301-a3f0/     ← 含 node_modules 与构建产物
│   │   └── 20260818-101502-9c21/
│   ├── shared/
│   │   ├── uploads/                  ← Strapi 上传的媒体，持久
│   │   └── .env -> /etc/strapi/.env
│   └── current -> releases/20260818-142301-a3f0
│
└── backups/                          ← 发布前自动备份数据库
```

每个 release 目录里，持久资源以符号链接指回 `shared/`：

```
cms/current/public/uploads -> /srv/lightinfra/cms/shared/uploads
cms/current/.env           -> /etc/strapi/.env
web/current/media          -> /srv/lightinfra/web/shared/media
```

数据库不放在代码目录里，始终在 `/var/lib/strapi/data.db`，不受发布目录切换影响。

保留最近 5 个 release，回滚就是把 `current` 指回上一个目录（见[八、回滚](#八回滚)）。

### 两个应用的构建位置不同

| | 前端 | 后端 |
| --- | --- | --- |
| 构建在哪 | **runner 上** | **服务器上** |
| 传输内容 | `dist/`（0.6 MB） | 源码（约 1 MB） |
| 理由 | 纯 JS 产物，与平台无关 | `better-sqlite3` 是原生模块，须在目标平台安装 |

后端在服务器上构建的额外好处：不要求 runner 与生产环境的 Node 版本、glibc 版本一致。代价是生产机要有构建工具链，以及构建期约 1.5 GB 内存峰值。

关键是**构建发生在新的 release 目录里，旧版本仍在服务**，所以构建过程零停机。只有最后的符号链接切换 + `systemctl restart` 有短暂中断（约 5–10 秒，Strapi 启动时间）。

若要连这几秒都消掉，需要跑两个 Strapi 实例做蓝绿切换。对内容站点没必要，本方案不做。

## 四、需要先改的代码

以下四处是当前代码在这套架构下必须调整的，**在部署前于本地改好并验证构建通过**。

### 1. `config/server.ts` — 补 `url` 与 `proxy`

Strapi 在反代后面拿不到外部地址，会导致 admin 登录后反复掉线、媒体库 URL 拼错。

```ts
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', undefined),   // 例：https://www.example.com
  proxy: { koa: true },                // 信任 Nginx 的 X-Forwarded-* 头
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
```

`proxy: { koa: true }` 让 Koa 读取 `X-Forwarded-Proto`，session cookie 的 `secure` 标记才会正确置位。

### 2. `config/database.ts` — 修正绝对路径处理

当前用 `path.join`，传入绝对路径时会被错误拼接：

```
path.join('/app/dist/config', '..', '..', '/var/lib/strapi/data.db')
  → /app/var/lib/strapi/data.db      ← 错误
path.resolve('/app/dist/config', '..', '..', '/var/lib/strapi/data.db')
  → /var/lib/strapi/data.db          ← 正确
```

生产要把数据库放在 `/var/lib/strapi/` 这类持久目录，必须改为 `path.resolve`：

```ts
sqlite: {
  client: 'sqlite',
  connection: {
    filename: path.resolve(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
  },
  useNullAsDefault: true,
},
```

`path.resolve` 对相对路径的行为与 `path.join` 一致，所以本地开发的 `.tmp/data.db` 不受影响，改动向后兼容。

顺带说明：数据库不能留在 `.tmp/`。该目录名意味着可丢弃，清理脚本和部署流程有删除它的惯例。

### 3. `config/middlewares.ts` — CORS 保持默认

单域名方案下前端与 API 同源，浏览器不发 preflight，`strapi::cors` 用默认配置即可，不需要收紧白名单。`CORS_ORIGINS` 环境变量留空占位，将来拆分域名时再启用：

```ts
const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

若将来分域名部署，改为显式白名单：

```ts
{
  name: 'strapi::cors',
  config: {
    origin: (process.env.CORS_ORIGINS ?? 'http://localhost:5173').split(','),
    methods: ['GET', 'HEAD', 'OPTIONS'],
    credentials: false,
  },
},
```

### 4. `.env.example` — 补齐生产用到的键

```
HOST=127.0.0.1
PORT=1337
PUBLIC_URL=https://www.example.com
CORS_ORIGINS=

APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
ENCRYPTION_KEY=tobemodified

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=/var/lib/strapi/data.db
```

注意 `HOST` 生产为 `127.0.0.1`，不是 `0.0.0.0`。

### 本地验证

改完在本地确认构建通过，再上服务器：

```powershell
npm run build
```

## 五、首次手工部署

在自动化发布链路接上之前，先手工走一遍完整部署，把「跑起来」这件事和「发布自动化」这两个变量分开验证。

### 部署前需要确定的信息

| 变量 | 示例 | 说明 |
| --- | --- | --- |
| `SERVER_IP` | `203.0.113.10` | 服务器公网 IP |
| `DOMAIN` | `www.example.com` | 站点域名，需提前解析到 `SERVER_IP` |
| `SSH_USER` | `ubuntu` | 有 sudo 权限的登录用户 |
| `ADMIN_ALLOW_IP` | `198.51.100.7` | 允许访问 `/admin` 的出口 IP，可留空 |
| `GITEA_REPO` | `ssh://git@192.168.3.69:60022/chenban/Lightinfra-web.git` | 仓库地址（仅内网可访问） |

本文档命令以 **Ubuntu 22.04 / 24.04 LTS** 为准。若为 CentOS / Rocky / Alibaba Cloud Linux，差异见[十二、附录 A](#十二附录a其他发行版差异)。

前置检查：

```bash
cat /etc/os-release          # 确认发行版
free -h                      # 确认内存，构建 admin 峰值约 1.5 GB
df -h /                      # 确认磁盘，预留 3 GB 以上
dig +short www.example.com   # 确认域名已解析到本机 IP
```

### 步骤 1：系统准备

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential python3 nginx sqlite3 ufw fail2ban

# Node 22 LTS，安装到 /usr/bin/node，systemd 可用绝对路径引用
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v    # 期望 v22.x
```

`build-essential` 和 `python3` 是 `better-sqlite3` 的编译备用依赖。该包通常提供预编译二进制，`npm ci` 会直接下载；但若预编译包不匹配当前平台，会回退到现场编译，缺少工具链时会失败。装上成本很低。

> 国内服务器若 npm 下载慢，配镜像源：
> ```bash
> npm config set registry https://registry.npmmirror.com
> npm config set better_sqlite3_binary_host_mirror https://registry.npmmirror.com/-/binary/better-sqlite3
> ```

### 步骤 2：创建运行用户与目录

```bash
# 专用系统用户，无登录 shell、无家目录
sudo useradd --system --no-create-home --shell /usr/sbin/nologin strapi

sudo mkdir -p /srv/lightinfra/{web,cms}/{releases,shared} \
              /srv/lightinfra/incoming /srv/lightinfra/backups
sudo mkdir -p /srv/lightinfra/web/shared/media
sudo mkdir -p /srv/lightinfra/cms/shared/uploads
sudo mkdir -p /var/lib/strapi          # 数据库
sudo mkdir -p /etc/strapi              # 密钥
sudo mkdir -p /var/backups/strapi      # 应用层备份（数据库+uploads，见运维方案）

sudo chown -R strapi:strapi /var/lib/strapi /var/backups/strapi
sudo chmod 750 /var/lib/strapi
sudo chown root:strapi /etc/strapi
sudo chmod 750 /etc/strapi
sudo chown -R strapi:strapi /srv/lightinfra/cms/shared/uploads
sudo chmod 755 /srv/lightinfra/cms/shared/uploads
```

`/srv/lightinfra` 的 owner 先留给后续创建的 `deployer` 用户（[六、自动化发布基建](#六自动化发布基建)），首次手工部署这一步先用当前登录用户操作，最后统一交接。

### 步骤 3：获取代码

CMS 已随前端合入同一仓库（monorepo），远端为 Gitea 上的 `chenban/Lightinfra-web`，位于内网 `192.168.3.69`。

若服务器在内网、能直连 Gitea：

```bash
git clone ssh://git@192.168.3.69:60022/chenban/Lightinfra-web.git /tmp/lightinfra-src
```

若服务器是公网机器（访问不到内网 Gitea），首次部署改用本地打包上传：

```powershell
# 本地 PowerShell，在仓库根目录执行
$exclude = @('node_modules', '.tmp', 'dist', '.strapi', '.git')
$items = Get-ChildItem apps/cms -Force | Where-Object { $_.Name -notin $exclude -and $_.Name -ne '.env' }
Compress-Archive -Path $items -DestinationPath ..\lightinfra-cms.zip -Force
scp ..\lightinfra-cms.zip $SSH_USER@${SERVER_IP}:/tmp/
```

```bash
# 服务器
mkdir -p /tmp/lightinfra-src/apps/cms
unzip -o /tmp/lightinfra-cms.zip -d /tmp/lightinfra-src/apps/cms
```

后续所有发布都会走[六、自动化发布基建](#六自动化发布基建)的 SSH/rsync 推送模型，公网服务器不需要持有 git 凭据；首次手工部署只是权宜之计。

拷贝出运行目录（多一次 clone 到临时目录再拷贝，是因为仓库根还有 `apps/web/` 和 `docs/`，不该出现在 CMS 的运行目录里）：

```bash
sudo -u strapi mkdir -p /srv/lightinfra/cms/releases/initial
sudo -u strapi cp -a /tmp/lightinfra-src/apps/cms/. /srv/lightinfra/cms/releases/initial/
sudo ln -sfn /srv/lightinfra/cms/releases/initial /srv/lightinfra/cms/current
rm -rf /tmp/lightinfra-src
```

### 步骤 4：生成生产密钥

```bash
sudo tee /etc/strapi/.env > /dev/null <<EOF
HOST=127.0.0.1
PORT=1337
NODE_ENV=production
PUBLIC_URL=https://www.example.com
CORS_ORIGINS=

APP_KEYS=$(openssl rand -base64 32),$(openssl rand -base64 32)
API_TOKEN_SALT=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -base64 32)

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=/var/lib/strapi/data.db
EOF

sudo chown root:strapi /etc/strapi/.env
sudo chmod 640 /etc/strapi/.env
```

> **迁移现有数据库时必须注意**：如果你要把本地 `.tmp/data.db` 搬到服务器（步骤 7），`ENCRYPTION_KEY` **必须沿用本地 `.env` 里的原值**，不能重新生成。其余五个密钥可以自由重新生成。
>
> 若选择在服务器上重新录入内容（不迁移数据库），则六个密钥全部用新生成的值。

Strapi 默认从工作目录读 `.env`。做一个符号链接，让应用和手动执行的 CLI 命令都能读到同一份，这也是[三、目标架构](#三目标架构)里 `shared/.env` 的落地：

```bash
sudo ln -sfn /etc/strapi/.env /srv/lightinfra/cms/current/.env
```

链接本身权限不影响目标文件，实际读取仍受 `/etc/strapi/.env` 的 `640 root:strapi` 约束。

### 步骤 5：安装依赖并构建

```bash
cd /srv/lightinfra/cms/current
sudo -u strapi npm ci
sudo -u strapi NODE_ENV=production npm run build
```

关于 `npm ci` 不加 `--omit=dev`：本项目是 TypeScript Strapi，`typescript` 与 `@types/*` 在 `devDependencies` 里，构建阶段必需。构建后理论上可以 `npm prune --production`，但 Strapi 5 的 TS 项目在启动时仍会触及部分类型相关模块，剪裁容易踩坑而收益仅是磁盘空间。既然硬件资源充足，保留完整 `node_modules`。

构建 admin 面板内存峰值约 1.5 GB。若出现 OOM（进程被 killed 且无明确报错），加 swap：

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

设置代码目录归属。代码对运行进程只读，是沙箱策略的一部分；上传目录换成 `shared/uploads` 的符号链接：

```bash
sudo chown -R root:strapi /srv/lightinfra/cms/releases/initial
sudo chmod -R g+rX,g-w /srv/lightinfra/cms/releases/initial

rm -rf /srv/lightinfra/cms/releases/initial/public/uploads
sudo -u strapi mkdir -p /srv/lightinfra/cms/releases/initial/public
sudo ln -sfn /srv/lightinfra/cms/shared/uploads /srv/lightinfra/cms/releases/initial/public/uploads
```

### 步骤 6：systemd 服务

```bash
sudo tee /etc/systemd/system/strapi.service > /dev/null <<'EOF'
[Unit]
Description=Strapi CMS (lightinfra)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=strapi
Group=strapi
WorkingDirectory=/srv/lightinfra/cms/current
EnvironmentFile=/etc/strapi/.env
Environment=NODE_ENV=production
ExecStart=/usr/bin/node node_modules/@strapi/strapi/bin/strapi.js start
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal
SyslogIdentifier=strapi

# ---- 进程沙箱 ----
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
RestrictSUIDSGID=true
RestrictNamespaces=true
LockPersonality=true
ReadWritePaths=/var/lib/strapi /srv/lightinfra/cms/shared/uploads /srv/lightinfra/cms/releases

[Install]
WantedBy=multi-user.target
EOF
```

设计说明：

- `ExecStart` 直接调 `node` 而非 `npm start`。npm 会多包一层进程，可能吞掉 systemd 发的停止信号，导致关停变成超时后强杀。
- `ProtectSystem=strict` 让整个文件系统对进程只读，只有 `ReadWritePaths` 列出的目录可写。万一 Strapi 出现 RCE 级漏洞，攻击者无法改代码或写系统目录。
- `ReadWritePaths` 给整个 `releases/` 目录写权限，是因为 Strapi 运行时会往自己的代码目录写 `.strapi/` 和 `.tmp/`，而每次发布的目录名都不同，没法逐个列举。这是原子发布带来的必要让步，比逐个列举更宽松，但范围仍限定在 `cms/` 应用自己的目录树内。
- `WorkingDirectory` 指向符号链接 `current`。**systemd 解析 `WorkingDirectory` 时会跟随符号链接，但只在服务启动时解析一次**。发布脚本换完链接后必须 `systemctl restart`（不是 `reload`），否则进程还在老目录里跑。[六、自动化发布基建](#六自动化发布基建)的脚本已经是 restart。

启用：

```bash
sudo -u strapi mkdir -p /srv/lightinfra/cms/current/.strapi /srv/lightinfra/cms/current/.tmp

sudo systemctl daemon-reload
sudo systemctl enable --now strapi
sudo systemctl status strapi --no-pager
```

首次启动确认监听在回环地址：

```bash
sudo ss -tlnp | grep 1337     # 期望 127.0.0.1:1337，不是 0.0.0.0:1337
curl -I http://127.0.0.1:1337/admin
```

若启动失败，`sudo journalctl -u strapi -n 80 --no-pager` 看具体报错，常见原因见[运维方案 §八 排障](./operations.md#八排障)。常见的是沙箱漏了某个需要写的路径，报 `EACCES` / `EROFS`，把该路径加进 `ReadWritePaths` 后 `daemon-reload` 重启。

### 步骤 7：迁移现有数据（可选）

只在需要保留本地已录入的文章时执行。**前提是 `/etc/strapi/.env` 里的 `ENCRYPTION_KEY` 已沿用本地原值。**

本地先停掉 dev server，确保 SQLite 无未落盘的 WAL：

```powershell
scp .tmp\data.db $SSH_USER@${SERVER_IP}:/tmp/data.db
Compress-Archive -Path public\uploads\* -DestinationPath ..\uploads.zip -Force
scp ..\uploads.zip $SSH_USER@${SERVER_IP}:/tmp/
```

服务器：

```bash
sudo systemctl stop strapi

sudo mv /tmp/data.db /var/lib/strapi/data.db
sudo chown strapi:strapi /var/lib/strapi/data.db
sudo chmod 640 /var/lib/strapi/data.db

sudo unzip -o /tmp/uploads.zip -d /srv/lightinfra/cms/shared/uploads
sudo chown -R strapi:strapi /srv/lightinfra/cms/shared/uploads
sudo rm /tmp/uploads.zip

sudo systemctl start strapi
```

另一种方式是用 Strapi 官方的 `strapi export` / `strapi import`，能一并处理数据与媒体文件，且不依赖数据库引擎一致。数据量大或后续要迁 Postgres 时更合适：

```bash
# 本地
npx strapi export --no-encrypt --file ../cms-export
# 服务器（上传 cms-export.tar.gz 后）
sudo -u strapi npx strapi import --file /tmp/cms-export.tar.gz
```

### 步骤 8：防火墙

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status verbose
```

**不要开放 1337。** Strapi 已只监听回环地址，防火墙是第二层保障。

### 步骤 9：Nginx 反向代理

限速区在 `http` 上下文声明，写入独立文件：

```bash
sudo tee /etc/nginx/conf.d/limits.conf > /dev/null <<'EOF'
limit_req_zone $binary_remote_addr zone=strapi_login:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=strapi_api:10m rate=30r/s;
EOF
```

共用的代理头片段：

```bash
sudo mkdir -p /etc/nginx/snippets
sudo tee /etc/nginx/snippets/strapi-proxy.conf > /dev/null <<'EOF'
proxy_pass http://127.0.0.1:1337;
proxy_http_version 1.1;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
proxy_read_timeout 60s;
EOF
```

站点配置（单域名，前端静态站 + Strapi 路径分流）：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name www.example.com example.com;
    location /.well-known/acme-challenge/ { root /var/www/html; }
    location / { return 301 https://www.example.com$request_uri; }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name www.example.com;

    ssl_certificate     /etc/letsencrypt/live/www.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    client_max_body_size 50M;   # 需大于计划上传的最大文件
    access_log /var/log/nginx/lightinfra-access.log;
    error_log  /var/log/nginx/lightinfra-error.log;

    # ---- 前端静态站 ----
    root /srv/lightinfra/web/current;
    index index.html;

    # 构建产物带哈希文件名，可永久缓存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # 媒体：走 shared 目录，不随发布变动
    location /media/ {
        alias /srv/lightinfra/web/shared/media/;
        expires 30d;
        add_header Cache-Control "public";
        add_header Accept-Ranges bytes;   # 视频需要支持拖动进度条
        try_files $uri =404;
    }

    # ---- 登录端点：强限速，防口令爆破 ----
    location = /admin/auth/login {
        limit_req zone=strapi_login burst=3 nodelay;
        include /etc/nginx/snippets/strapi-proxy.conf;
    }
    location = /api/auth/local {
        limit_req zone=strapi_login burst=3 nodelay;
        include /etc/nginx/snippets/strapi-proxy.conf;
    }

    # ---- 管理后台：可选 IP 白名单 ----
    location /admin {
        # allow 198.51.100.7;   # 你的固定出口 IP
        # deny all;             # 启用白名单时取消这两行注释
        include /etc/nginx/snippets/strapi-proxy.conf;
    }

    # Strapi 后台还需要这几个前缀，管理面板的 XHR 会打到这些路径
    location /content-manager { include /etc/nginx/snippets/strapi-proxy.conf; }
    location /content-type-builder { include /etc/nginx/snippets/strapi-proxy.conf; }
    location /upload { include /etc/nginx/snippets/strapi-proxy.conf; }
    location /i18n { include /etc/nginx/snippets/strapi-proxy.conf; }
    location /users-permissions { include /etc/nginx/snippets/strapi-proxy.conf; }

    # ---- 内容 API ----
    location /api/ {
        limit_req zone=strapi_api burst=60 nodelay;
        include /etc/nginx/snippets/strapi-proxy.conf;
    }

    # ---- 上传文件：长缓存 ----
    location /uploads/ {
        expires 30d;
        add_header Cache-Control "public";
        include /etc/nginx/snippets/strapi-proxy.conf;
    }

    # ---- SPA fallback，必须放最后 ----
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

三点必须注意：

**`dist/_redirects` 在 nginx 下无效。** 那是 Netlify / Cloudflare Pages 的语法。nginx 靠 `try_files $uri $uri/ /index.html` 实现 SPA fallback，作用等价。该文件留在产物里无害，但别指望它生效。

**Strapi 后台的路径不止 `/admin`。** 漏了 `/content-manager` 等前缀的话，后台能打开但内容管理页全是报错。上面列的是当前插件集（`users-permissions` + `upload` + `cloud`）所需；将来装新插件要对应补。这是单域名方案相比独立子域名唯一的额外维护成本 —— 子域名方案下 `location /` 全转给 Strapi 就不用逐个列。

**`location /` 必须在最后。** nginx 的前缀匹配取最长者，顺序不影响匹配结果，但把 SPA fallback 写在最后更符合阅读直觉，也避免维护时误把它放到 `/api/` 之前引发困惑。

启用站点：

```bash
sudo ln -sfn /etc/nginx/sites-available/lightinfra /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
```

**此时 `nginx -t` 会失败**，因为 443 块引用的证书文件还不存在。先执行步骤 10 取证，certbot 会补全证书路径；或先临时注释掉整个 443 server 块，取证后再放开。

把上面的 server 块写入 `/etc/nginx/sites-available/lightinfra` 后再执行这一步。

### 步骤 10：TLS 证书

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d www.example.com --agree-tos -m you@example.com --redirect

sudo nginx -t && sudo systemctl reload nginx
sudo systemctl list-timers | grep certbot     # 确认自动续期定时器已就位
```

续期由 apt 包附带的 systemd timer 处理，无需手写 cron。验证续期链路（不实际续期）：

```bash
sudo certbot renew --dry-run
```

### 步骤 11：SSH 加固

```bash
sudo sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/'      /etc/ssh/sshd_config
sudo sed -i 's/^#*PermitRootLogin.*/PermitRootLogin no/'                     /etc/ssh/sshd_config
sudo sed -i 's/^#*ChallengeResponseAuthentication.*/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config
sudo sshd -t && sudo systemctl reload ssh
```

> **执行前确认你的公钥已在 `~/.ssh/authorized_keys` 中且密钥登录可用**，否则会把自己锁在外面。建议另开一个 SSH 会话保持连接，验证新会话能登录后再关闭旧会话。

fail2ban 护 SSH：

```bash
sudo tee /etc/fail2ban/jail.local > /dev/null <<'EOF'
[sshd]
enabled = true
maxretry = 5
bantime = 1h
findtime = 10m
EOF
sudo systemctl enable --now fail2ban
```

自动安全更新：

```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 步骤 12：创建管理员账号

浏览器打开 `https://www.example.com/admin`，首个访问者会看到注册表单，创建超级管理员。

**该注册入口仅在系统无管理员时开放**，创建完即自动关闭，不会留下公开注册口。

用强口令（16 位以上随机），存进密码管理器。这个账号能改所有内容和权限。

### 步骤 13：前端首次部署

前端首次部署没有自动化链路可用，本地构建后手工传一次：

```powershell
cd apps/web
npm ci
npm run build
```

```bash
# 服务器
sudo -u strapi mkdir -p /srv/lightinfra/web/releases/initial
```

```powershell
# 本地：打包 dist 并上传
tar -czf web-initial.tar.gz -C dist .
scp web-initial.tar.gz $SSH_USER@${SERVER_IP}:/tmp/
```

```bash
# 服务器
tar -xzf /tmp/web-initial.tar.gz -C /srv/lightinfra/web/releases/initial
rm -rf /srv/lightinfra/web/releases/initial/media
ln -sfn /srv/lightinfra/web/shared/media /srv/lightinfra/web/releases/initial/media
ln -sfn /srv/lightinfra/web/releases/initial /srv/lightinfra/web/current
rm /tmp/web-initial.tar.gz
sudo systemctl reload nginx
```

媒体资源同步（首次全量）见[七、媒体资源同步](#七媒体资源同步)。

前端不需要任何构建期环境变量：`src/utils/request.ts` 的 `baseURL: import.meta.env.VITE_API_BASE ?? '/api'` 在未设置时回落到 `/api`，正是单域名下要的同源相对路径。**不要**在构建环境设 `VITE_API_BASE`，也**不要**设任何 `VITE_API_TOKEN` —— 所有 `VITE_` 前缀变量会被 Vite 内联进产物，等同于把 token 明文发布到公网。前台读取公开文章靠的是 `src/index.ts` bootstrap 授予 public role 的 `find`/`findOne` 权限，不需要 token。

媒体引用要用 `/media/...` 这样的绝对路径，不要用 `import` 打包 —— 103 MB 的素材过构建管线会让构建时间和产物体积失控，也失去了把媒体放 `shared/` 的意义。

`config/api.ts` 已设 `defaultLimit: 25`、`maxLimit: 100`，前端分页请求不要超过 100。

### 部署验证

跑一遍[九、验证清单](#九验证清单)。逐项对照：服务 enabled、监听回环、外部 1337 不通、API 有响应、HTTP 跳转、HSTS 头存在、限速返回 429、SPA 深链接不 404。

## 六、自动化发布基建

手工部署验证通过后，接上 Gitea Actions，之后的每次发布都是网页点击。

### 网页操作路径

Gitea 仓库页 → **Actions** → 左侧选工作流（`release-web` 或 `release-cms`）→ 右上 **Run workflow** → 选分支 `main`、填参数 → 执行。实时日志与历史记录都在同一页面。

**两个应用各自持有自己的工作流文件**，`.gitea/workflows/release-web.yml` 与 `.gitea/workflows/release-cms.yml`，互不依赖。前端发前端，后端发后端。之所以不合并成一个工作流，是因为两侧发布本来就不必强耦合 —— 改一段文案不需要重启 Strapi，加一个内容字段不需要重发前端。合并后每次发布都要么多做一半无用功，要么就得加一堆条件判断。需要协同发布时，依次点两次即可。

合仓真正省掉的是**配置面**：`DEPLOY_SSH_KEY` 等 4 个 secret 只配一份而不是两份，保护分支、评审规则、runner 标签也只维护一处。

`workflow_dispatch` 支持输入参数，Gitea 界面上呈现为下拉框和勾选框：

前端 `release-web`：

| 参数 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `sync_media` | 勾选 | `false` | 是否同步 `shared/media`。媒体有变更时才勾，勾了这次发布会慢很多（103 MB） |

后端 `release-cms`：

| 参数 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `skip_backup` | 勾选 | `false` | 跳过发布前数据库备份。**不建议勾**，内容类型变更会自动改表结构且不可逆 |

### 完整时序

两侧流程同构，差异只在第 ④ 与第 ⑦ 步。

```
① 网页触发（选 main 分支 + 参数）
      │
② runner: git clone --depth 1 --branch main
      │
③ runner: 版本号 = <UTC时间戳>-<commit短哈希>
      │
④ runner: 打包
   ├─ 前端：npm ci && npm run build → 打包 dist/
   └─ 后端：直接打包源码（排除 node_modules/.git/.env）
      │
⑤ runner: rsync 制品 → 服务器 /srv/lightinfra/incoming/
      │
⑥ runner: ssh 调用服务器上的 lightinfra-release 脚本
      │
   ── 以下在服务器执行 ──
      │
⑦ 解包到 releases/<版本>/，然后：
   ├─ 前端：无构建步骤（产物已就绪）
   └─ 后端：备份数据库 → 在新目录内 npm ci && npm run build
      │        （旧版本仍在服务，此步零停机）
      │
⑧ 建立 shared/ 符号链接（uploads / .env / media）
      │
⑨ 原子切换 current 符号链接
      │
⑩ 前端：nginx reload ／ 后端：systemctl restart strapi
      │
⑪ 健康检查（HTTP 探测）
      │
      ├── 通过 → 清理旧 release（保留 5 个）→ 成功
      └── 失败 → current 切回上一版本 → 重启 → 非零退出
```

最后一步的自动回滚是这个流程里最值得投入的部分。没有它，一次失败的发布会让站点持续不可用直到人工介入；有了它，最坏情况是站点回到上一个可用版本，Gitea 页面上看到红色失败标记。

### 版本号

用 `<UTC时间戳>-<commit短哈希>`，例如 `20260818-142301-a3f0`。理由：单调递增便于排序、直接对应 git commit 便于追溯、不需要人工维护。

这与团队规范 SemVer tag 不冲突 —— SemVer 是**对外的版本标识**（打在 main 上、写进 CHANGELOG），发布版本号是**部署实例的标识**。一个 SemVer tag 可能对应多次部署（比如修了部署脚本重发一次）。

需要按 tag 发布时，工作流加一个 `on: push: tags: ['v*']` 触发器即可，与手动触发并存。

### 6.1 一次性准备

**服务器：创建发布用户与目录**

发布用户与运行用户分离。`deployer` 能写发布目录、能重启服务；`strapi` 只负责运行。

```bash
sudo useradd -m -s /bin/bash deployer

sudo chown -R deployer:deployer /srv/lightinfra
sudo chown -R strapi:strapi /srv/lightinfra/cms/shared/uploads
sudo chmod 755 /srv/lightinfra/cms/shared/uploads
```

`deployer` 需要且仅需要重启两个服务的权限：

```bash
sudo tee /etc/sudoers.d/deployer > /dev/null <<'EOF'
deployer ALL=(root) NOPASSWD: /bin/systemctl restart strapi
deployer ALL=(root) NOPASSWD: /bin/systemctl reload nginx
deployer ALL=(root) NOPASSWD: /bin/systemctl is-active strapi
deployer ALL=(root) NOPASSWD: /usr/bin/install -o strapi -g strapi -d *
EOF
sudo chmod 440 /etc/sudoers.d/deployer
sudo visudo -c        # 校验语法，出错会导致 sudo 整体不可用
```

只给这四条，不给通用 `systemctl` 或 shell。`visudo -c` 那步别省 —— sudoers 语法错误会让所有 sudo 失效。

**runner → 服务器的 SSH 密钥**

在内网 runner 主机上生成专用密钥，公钥装到服务器 `deployer`：

```bash
# runner 主机
ssh-keygen -t ed25519 -f ~/.ssh/lightinfra_deploy -N '' -C 'gitea-runner-deploy'
ssh-copy-id -i ~/.ssh/lightinfra_deploy.pub deployer@<服务器IP>
```

私钥内容存进 Gitea 仓库的 **Settings → Secrets**，命名 `DEPLOY_SSH_KEY`。合仓后只需配一份，两个工作流共用。

同时存这几个：

| Secret | 内容 |
| --- | --- |
| `DEPLOY_SSH_KEY` | 上面的私钥全文 |
| `DEPLOY_HOST` | 服务器 IP 或域名 |
| `DEPLOY_USER` | `deployer` |
| `DEPLOY_KNOWN_HOSTS` | `ssh-keyscan -p 22 <服务器IP>` 的输出 |

`DEPLOY_KNOWN_HOSTS` 不是可选项。没有它就只能用 `StrictHostKeyChecking=no`，那等于放弃对服务器身份的校验，中间人可以冒充部署目标接收你的制品。

**部署 act_runner**

按团队规范里 Gitea Actions 的清单，在内网主机上装 runner 并注册到 Gitea。要点：

```bash
# 在 Gitea: 站点管理 → Actions → Runners → 创建 Runner，拿到注册令牌
./act_runner register --no-interactive \
  --instance http://192.168.3.69:3000 \
  --token <注册令牌> \
  --name lan-runner-01 \
  --labels ubuntu-latest:docker://node:22-bookworm
```

`--labels` 决定 workflow 里 `runs-on` 能写什么。上面这条把 `ubuntu-latest` 映射到 `node:22-bookworm` 容器，Node 22 与生产一致，省掉 `setup-node` 步骤。

Gitea 实例需要在 `app.ini` 里启用 Actions（较新版本默认开启）：

```ini
[actions]
ENABLED = true
```

### 6.2 服务器端发布脚本

这个脚本常驻服务器，被两个工作流共用，靠参数区分。它先安装一次，不随发布更新 —— 避免「部署逻辑本身要靠部署来更新」的循环依赖。

```bash
sudo tee /usr/local/bin/lightinfra-release > /dev/null <<'SCRIPT'
#!/usr/bin/env bash
set -euo pipefail

APP="${1:?usage: lightinfra-release <web|cms> <version>}"
VERSION="${2:?missing version}"

ROOT=/srv/lightinfra
APP_DIR="$ROOT/$APP"
RELEASES="$APP_DIR/releases"
SHARED="$APP_DIR/shared"
CURRENT="$APP_DIR/current"
NEW="$RELEASES/$VERSION"
TARBALL="$ROOT/incoming/$APP-$VERSION.tar.gz"
KEEP=5

log() { echo "[$(date -Is)] $*"; }

[[ "$APP" =~ ^(web|cms)$ ]] || { log "非法应用名: $APP"; exit 2; }
[[ -f "$TARBALL" ]]         || { log "制品不存在: $TARBALL"; exit 2; }

PREVIOUS=""
[[ -L "$CURRENT" ]] && PREVIOUS="$(readlink -f "$CURRENT")"

rollback() {
  if [[ -n "$PREVIOUS" && -d "$PREVIOUS" ]]; then
    log "!! 回滚到 $(basename "$PREVIOUS")"
    ln -sfn "$PREVIOUS" "$CURRENT.tmp" && mv -Tf "$CURRENT.tmp" "$CURRENT"
    restart_service || true
  else
    log "!! 无上一版本可回滚，需人工介入"
  fi
}

restart_service() {
  if [[ "$APP" == "cms" ]]; then
    sudo /bin/systemctl restart strapi
  else
    sudo /bin/systemctl reload nginx
  fi
}

health_check() {
  local url="$1" name="$2" tries=12
  for ((i=1; i<=tries; i++)); do
    if curl -sf -m 5 -o /dev/null "$url"; then
      log "健康检查通过: $name"
      return 0
    fi
    sleep 3
  done
  log "健康检查失败: $name ($url)"
  return 1
}

# ---- ① 解包 ----
log "解包 $APP-$VERSION"
rm -rf "$NEW"
mkdir -p "$NEW"
tar -xzf "$TARBALL" -C "$NEW"

# ---- ② 后端专属：备份 + 构建 ----
if [[ "$APP" == "cms" ]]; then
  if [[ "${SKIP_BACKUP:-false}" != "true" ]]; then
    log "备份数据库"
    /usr/local/bin/strapi-backup.sh
  else
    log "已跳过数据库备份（SKIP_BACKUP=true）"
  fi

  log "安装依赖并构建（旧版本仍在服务）"
  ln -sfn /etc/strapi/.env "$NEW/.env"
  cd "$NEW"
  npm ci --no-audit --no-fund
  NODE_ENV=production npm run build
fi

# ---- ③ 持久资源符号链接 ----
log "链接 shared 资源"
if [[ "$APP" == "cms" ]]; then
  rm -rf "$NEW/public/uploads"
  mkdir -p "$NEW/public"
  ln -sfn "$SHARED/uploads" "$NEW/public/uploads"
else
  rm -rf "$NEW/media"
  ln -sfn "$SHARED/media" "$NEW/media"
fi

# ---- ④ 原子切换 ----
log "切换 current → $VERSION"
ln -sfn "$NEW" "$CURRENT.tmp"
mv -Tf "$CURRENT.tmp" "$CURRENT"

# ---- ⑤ 重启 ----
restart_service

# ---- ⑥ 健康检查，失败即回滚 ----
if [[ "$APP" == "cms" ]]; then
  health_check "http://127.0.0.1:1337/api/articles" "Strapi API" || { rollback; exit 1; }
else
  health_check "http://127.0.0.1/" "前端首页" || { rollback; exit 1; }
fi

# ---- ⑦ 清理 ----
log "清理旧版本，保留 $KEEP 个"
cd "$RELEASES"
ls -1dt */ 2>/dev/null | tail -n "+$((KEEP+1))" | xargs -r rm -rf
rm -f "$TARBALL"

log "发布成功: $APP $VERSION"
SCRIPT

sudo chmod 755 /usr/local/bin/lightinfra-release
```

几处设计说明：

- `mv -Tf` 是原子替换符号链接的正确写法。`ln -sfn` 直接作用于已存在的链接时，在某些实现上会把新链接创建到目标目录**内部**而非替换它；先建 `.tmp` 再 `mv -T` 规避了这个坑。
- 健康检查重试 12 次、间隔 3 秒，给 Strapi 约 36 秒启动窗口。冷启动加载 admin 面板通常 10–20 秒，留了余量。
- 后端的 `npm ci` 和 `build` 在切换 `current` **之前**执行，所以构建失败时线上完全没受影响，连回滚都不需要。
- `set -euo pipefail` 让任何一步失败立即中止；但 `rollback` 是在显式判断后调用的，不依赖 ERR trap，逻辑更好追。

数据库备份调用的 `strapi-backup.sh` 见[运维方案 §三](./operations.md#三备份)。

### 6.4 前端工作流

`.gitea/workflows/release-web.yml`：

```yaml
name: release-web
run-name: 发布前端 ${{ github.ref_name }}

on:
  workflow_dispatch:
    inputs:
      sync_media:
        description: '同步媒体资源（103MB，仅媒体有变更时勾选）'
        type: boolean
        default: false

concurrency:
  group: release-web
  cancel-in-progress: false

# 所有命令都在 apps/web 下执行；仓库根没有构建用的 package.json
defaults:
  run:
    working-directory: apps/web

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: 计算版本号
        id: ver
        run: echo "version=$(date -u +%Y%m%d-%H%M%S)-$(git rev-parse --short HEAD)" >> "$GITHUB_OUTPUT"

      - run: npm ci --no-audit --no-fund

      # npm run build 已经串了 type-check，不需要单独一步
      - run: npm run build

      - name: 校验产物
        run: |
          test -f dist/index.html || { echo "dist/index.html 缺失"; exit 1; }
          echo "产物大小: $(du -sh dist | cut -f1)"

      - name: 打包
        run: tar -czf web-${{ steps.ver.outputs.version }}.tar.gz -C dist .

      - name: 配置 SSH
        run: |
          mkdir -p ~/.ssh && chmod 700 ~/.ssh
          echo "${{ secrets.DEPLOY_SSH_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          echo "${{ secrets.DEPLOY_KNOWN_HOSTS }}" > ~/.ssh/known_hosts
          chmod 644 ~/.ssh/known_hosts

      - name: 上传制品
        run: |
          scp web-${{ steps.ver.outputs.version }}.tar.gz \
            ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }}:/srv/lightinfra/incoming/

      - name: 同步媒体
        if: ${{ inputs.sync_media }}
        run: |
          echo "媒体不在版本控制内，runner 无法提供。"
          echo "请按文档 §七 从本地手工 rsync。"
          exit 1

      - name: 执行发布
        run: |
          ssh ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} \
            "lightinfra-release web ${{ steps.ver.outputs.version }}"

      - name: 清理密钥
        if: always()
        run: rm -f ~/.ssh/id_ed25519
```

两点说明：

**`sync_media` 那一步是故意让它失败的。** 媒体不在 git 里，runner 从 clone 出来的工作区拿不到它 —— 这个参数在 runner 侧无法真正实现。保留它并给出明确提示，比让人误以为勾了就同步了要好。真正的同步只能从有媒体的机器（本地）发起。

如果希望这个参数真正可用，需要把媒体放到 runner 能访问的内网位置（NAS 或内网对象存储），然后这一步改为从那里拉取。这是一个独立的小项目，不在本方案首期范围内。

**类型检查已经是构建的一部分，不能设成「只报告不阻塞」。** 前端的 `build` 脚本是 `npm run type-check && vite build`，而 `type-check` 是 `vue-tsc -p tsconfig.json && tsc -p tsconfig.node.json`。类型错误会直接让 `npm run build` 失败，进而让整个发布中断 —— 这是既有设计。类型门禁是发布前唯一的自动化质量检查，不建议摘掉。

### 6.5 后端工作流

`.gitea/workflows/release-cms.yml`：

```yaml
name: release-cms
run-name: 发布后端 ${{ github.ref_name }}

on:
  workflow_dispatch:
    inputs:
      skip_backup:
        description: '跳过数据库备份（不建议）'
        type: boolean
        default: false

concurrency:
  group: release-cms
  cancel-in-progress: false

defaults:
  run:
    working-directory: apps/cms

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: 计算版本号
        id: ver
        run: echo "version=$(date -u +%Y%m%d-%H%M%S)-$(git rev-parse --short HEAD)" >> "$GITHUB_OUTPUT"

      - name: 构建自检
        run: |
          npm ci --no-audit --no-fund
          cp .env.example .env      # 构建期需要密钥占位，不用于运行
          NODE_ENV=production npm run build

      - name: 打包源码
        run: |
          # 打包 apps/cms 的内容，制品内不带 apps/cms/ 前缀，
          # 服务器端解包逻辑与仓库结构无关
          tar -czf cms-${{ steps.ver.outputs.version }}.tar.gz \
            --exclude=node_modules --exclude=dist \
            --exclude=.env --exclude=.tmp --exclude=.strapi \
            --exclude=public/uploads \
            .

      - name: 配置 SSH
        run: |
          mkdir -p ~/.ssh && chmod 700 ~/.ssh
          echo "${{ secrets.DEPLOY_SSH_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          echo "${{ secrets.DEPLOY_KNOWN_HOSTS }}" > ~/.ssh/known_hosts
          chmod 644 ~/.ssh/known_hosts

      - name: 上传制品
        run: |
          scp cms-${{ steps.ver.outputs.version }}.tar.gz \
            ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }}:/srv/lightinfra/incoming/

      - name: 执行发布
        run: |
          ssh ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} \
            "SKIP_BACKUP=${{ inputs.skip_backup }} lightinfra-release cms ${{ steps.ver.outputs.version }}"

      - name: 清理密钥
        if: always()
        run: rm -f ~/.ssh/id_ed25519
```

「构建自检」这一步值得解释：制品里不含 `node_modules`，真正的构建在服务器上做。但如果代码有编译错误，等到服务器上才发现就晚了（虽然有零停机保护，但白等一轮）。所以在 runner 上先完整跑一遍 `npm ci && build`，把编译错误挡在上传之前。

用 `.env.example` 作为构建期占位：Strapi 的 `config/admin.ts` 在构建时会读 `ADMIN_JWT_SECRET` 等键，缺失会报错。这份占位密钥只在 runner 容器内存在，不进制品（打包已 `--exclude=.env`），也不会到服务器。

**两个工作流都靠 `defaults.run.working-directory` 定位应用目录。** `npm ci`、`npm run build`、`tar` 都在 `apps/web` 或 `apps/cms` 里执行，制品结构和服务器端脚本一致。注意 `defaults` 只作用于 `run` 步骤，`actions/checkout@v4` 仍然 checkout 整个仓库，这是需要的（版本号要靠 `git rev-parse`）。

## 七、媒体资源同步

`shared/media` 独立于发布流程。首次全量推一次：

```powershell
scp -r apps\web\public\media\* deployer@<服务器IP>:/srv/lightinfra/web/shared/media/
```

后续增量同步用 rsync（Windows 下走 WSL 或 Git Bash）：

```bash
rsync -avz --dry-run \
  /mnt/d/WORKBENCH/lightinfra-ow/apps/web/public/media/ \
  deployer@<服务器IP>:/srv/lightinfra/web/shared/media/
# 确认清单无误后去掉 --dry-run，需要清理已删文件时再加 --delete
```

`--delete` 会删掉服务器上本地已不存在的文件。**首次务必先 `--dry-run`** —— 源路径写错加上 `--delete` 会清空目标目录。

媒体通常几个月才变一次，日常发布不必勾 `sync_media`。

> 长期建议：把媒体（尤其 92 MB 视频）挪到对象存储 + CDN。届时前端改引用 CDN 地址，`shared/media` 和这一步都可以撤掉，服务器出口带宽压力一并解决。

## 八、回滚

三种回滚，按代价从低到高。

### 8.1 自动回滚（无需人工）

`lightinfra-release` 的健康检查失败时自动执行：`current` 符号链接指回上一版本、重启服务、再次检查。工作流会以非零退出码结束，Gitea 界面上显示红色失败。这一步已经在[§6.2](#62-服务器端发布脚本)的脚本里，不用额外操作。

自动回滚只覆盖「新版本起不来」。它不覆盖「新版本起来了但页面是错的」—— 健康检查只看 HTTP 状态码。

### 8.2 手动回滚到任意历史版本

```bash
ssh deployer@<server>
ls -lt /srv/lightinfra/cms/releases/     # 找目标版本目录名

cd /srv/lightinfra/cms
sudo -u deployer ln -sfn releases/<目标版本> current.new && sudo -u deployer mv -Tf current.new current
sudo systemctl restart strapi
```

前端回滚更简单，只有静态文件，不用重启任何服务：

```bash
cd /srv/lightinfra/web
sudo -u deployer ln -sfn releases/<目标版本> current.new && sudo -u deployer mv -Tf current.new current
```

**保留 5 个版本意味着只能回退 5 次发布。** 更早的版本必须从 Gitea 重新构建，那时用 `workflow_dispatch` 指定旧 tag 而不是 `main`。

### 8.3 回滚不能解决的情况

代码回滚不会回滚数据。以下都需要走[运维方案 §四 恢复流程](./operations.md#四恢复流程)：

| 情况 | 为什么代码回滚无效 |
| --- | --- |
| Content-Type 结构变更后回滚 | Strapi 已改过数据库表结构，旧代码读不了新表 |
| 误删文章 | 数据在 `/var/lib/strapi/data.db`，不随发布目录变动 |
| 上传文件被覆盖 | 同理，在 `/srv/lightinfra/cms/shared/uploads` |

**因此：涉及 Content-Type 变更的发布，必须在发布前手工做一次数据库备份，且不要用 `skip_backup=true`。** 这条比自动备份重要 —— 自动备份是每日 03:30 的定时任务，最坏情况下会丢近 24 小时的内容编辑。

## 九、验证清单

每次改动 nginx 或首次上线后跑一遍。在服务器上执行，`<域名>` 换成实际域名。

```bash
# 1. 前端首页
curl -sI https://<域名>/ | head -3
# 期望 200，Content-Type: text/html

# 2. SPA 深链接（关键：验证 try_files 生效）
curl -sI https://<域名>/news | head -3
# 期望 200 且 Content-Type: text/html —— 若返回 404，try_files 没生效

# 3. 带哈希的静态资源
curl -sI https://<域名>/assets/$(ls /srv/lightinfra/web/current/assets/ | grep -m1 '\.js$') | head -5
# 期望 200 + Cache-Control: immutable

# 4. 媒体别名
curl -sI https://<域名>/media/<某个已知文件> | head -3
# 期望 200。404 说明 alias 尾斜杠写错或文件没同步

# 5. Strapi API
curl -s https://<域名>/api/articles | head -c 200
# 期望 JSON，含 data 数组

# 6. Strapi 后台
curl -sI https://<域名>/admin | head -3
# 期望 200

# 7. 上传文件
curl -sI https://<域名>/uploads/<已知文件名> | head -3

# 8. Strapi 未对外暴露
curl -sI --max-time 3 http://<公网IP>:1337/ ; echo "exit=$?"
# 期望连接失败（exit≠0）

# 9. HTTP 跳 HTTPS
curl -sI http://<域名>/ | head -2
# 期望 301

# 10. Strapi 认得自己在 HTTPS 后面
curl -s https://<域名>/api/articles | grep -o 'http://[^"]*' | head -3
# 期望无输出。若出现 http:// 开头的绝对 URL，说明 server.ts 的 url/proxy 没配对
```

第 2 条和第 10 条最容易出问题，也最容易被忽略：深链接 404 只有直接访问或刷新页面时才暴露，站内点击跳转不会触发；混合内容问题只在浏览器控制台可见。

浏览器侧还要确认：打开 `https://<域名>/news` 后按 F5 刷新页面正常、DevTools 的 Console 无 mixed-content 报错、Network 里 `/api/` 请求返回 200。

## 十、分阶段落地

不要一次性全上。每阶段结束后系统都处于可用状态，出问题就停在那一阶段。

**阶段一：Git 仓库就位 —— 已完成**

monorepo 结构合并、前后端合入同一仓库、根 `.gitignore` 与各应用 `.gitignore` 就位、`main` 分支已是完整代码而非空基线。这一阶段不再需要额外动作。

**阶段二：手工部署一次（1 天，服务器）**

完全按[五、首次手工部署](#五首次手工部署)走一遍。手工 `scp`/`git clone`、手工 `npm ci && npm run build`、手工启服务。目标是让「跑起来」这件事先成立，把发布自动化的变量排除掉。

这一阶段要拿到的确认：Strapi 起来了、后台能登录、`/api/articles` 有数据、前端首页和深链接都正常、[九、验证清单](#九验证清单)全过。

**阶段三：发布脚本（半天，服务器）**

装 `lightinfra-release`、建 `deployer` 用户和 sudoers、配 SSH 密钥。**先在服务器本地手工调用一次**：把阶段二的产物打成 tar 放到 `/srv/lightinfra/incoming/`，然后 `sudo lightinfra-release cms <版本>`。验证原子切换和自动回滚都工作 —— 回滚可以故意用一个坏的 tar 触发。

**阶段四：接上 Gitea Actions（1 天）**

注册 act_runner、配 4 个 secret、加两个 workflow 文件。前端先跑，因为前端发布不涉及数据库和服务重启，出错代价最低。跑通后再接后端。

**阶段五：备份与监控（半天）**

按[运维方案 §三、§六](./operations.md)装备份脚本和健康检查的 systemd timer。**这一阶段不能省，也不建议延后** —— 一旦开始通过 CMS 录入真实内容，没有备份的每一天都是在积累风险。

总计约 3 个工作日，其中服务器上的工作约 2 天。

## 十一、这套方案的边界

写清楚它不做什么，避免将来误用。

**不做多环境。** 只有生产一套。要预发布环境的话，最省事的做法是同一台机器上再起一套 `/srv/lightinfra-staging/`、另一个 systemd 服务监听 1338、nginx 加一个子域名，workflow 加 `environment` 参数选目标。但那意味着两倍的运维面，现阶段（单人维护、内容站）不值得。

**不做蓝绿或滚动。** 单实例架构，发布时 Strapi 有 5–15 秒不可用（重启 + 健康检查）。前端发布是真正零中断的（只换静态文件符号链接）。对内容站可接受；将来若有不能中断的接口，需要上双实例 + nginx upstream。

**不做数据库迁移自动化。** Strapi 的 schema 变更在启动时自动同步，这在 SQLite 上是隐式的、不可逆的、没有版本记录的。这也是[八、回滚 §8.3](#83-回滚不能解决的情况)强调 Content-Type 变更前必须手工备份的根本原因。迁到 Postgres 后可以引入迁移脚本管理，见[运维方案 §九](./operations.md#九迁移到-postgres-的时机)。

**不做审批流。** `workflow_dispatch` 谁有仓库 write 权限谁就能点发布。Gitea 的 Environment 保护规则可以加人工审批，但当前团队规模下，保护 `main` 分支（发布必须经 PR 合入）已经是足够的门槛。

**不覆盖出境合规。** 见[二、代码出境范围](#代码出境范围)。方案假设了「前后端同机部署在公网云服务器」这一前提成立。

## 十二、附录：其他发行版差异

| 项 | Ubuntu / Debian | CentOS / Rocky / Alibaba Cloud Linux |
| --- | --- | --- |
| 包管理 | `apt install` | `dnf install` |
| 编译工具 | `build-essential` | `gcc gcc-c++ make` |
| Node 源 | `deb.nodesource.com/setup_22.x` | `rpm.nodesource.com/setup_22.x` |
| Nginx 站点目录 | `sites-available` + `sites-enabled` | 统一放 `/etc/nginx/conf.d/*.conf`，无 sites-* 约定 |
| 防火墙 | `ufw allow 443/tcp` | `firewall-cmd --permanent --add-service=https` 后 `--reload` |
| SSH 服务名 | `ssh` | `sshd` |
| certbot | `python3-certbot-nginx` | 建议用 `snap install certbot` |
| SELinux | 无 | 默认 enforcing，需 `setsebool -P httpd_can_network_connect 1`，否则 Nginx 反代被拒 |

SELinux 那一条是 CentOS 系最容易踩的坑：Nginx 配置完全正确但一直 502，日志显示 permission denied。
