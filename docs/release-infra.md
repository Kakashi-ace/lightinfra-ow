# 前后端一体化发布基建方案

前端 `apps/web`（Vue 3 + Vite）与后端 `apps/cms`（Strapi 5）部署到同一台云服务器，并通过 Gitea 网页触发打包、上传、部署。两者同处一个仓库（monorepo），各有独立的发布工作流。

配套文档：[部署方案](./deployment.md)（单机手工部署）、[运维方案](./operations.md)（日常运维）。本文档描述**自动化发布基建**，落地后取代 `deployment.md` 里的手工发布步骤。

## 一、调研结论

### 结论：用 Gitea Actions，不引入新平台

你们已有 Gitea 自托管实例（`192.168.3.69:60022`），且 `docs/基于Gitea的多人协作研发流程规范.md` 第 8.2 节已经把 Gitea Actions 定为 CI/CD 方案、第 7.3.4 节已列出 act_runner 部署清单。发布基建应当延续这个决定，不另起一套。

对比过的其他方案，以及为什么不选：

| 方案 | 为什么不选 |
| --- | --- |
| Jenkins | 功能足够，但要额外维护一个服务 + 插件生态；你们只有一个仓库、一个环境，投入产出不划算 |
| GitLab CE | 要迁移代码托管，成本远大于收益 |
| Woodpecker / Drone | 比 Gitea Actions 轻，但仍是独立服务；Gitea Actions 已内置，无需额外部署控制面 |
| GitHub Actions + 自托管 runner | 需要把代码放到 GitHub，与「代码严禁出境」冲突 |
| 纯脚本 + Webhook | 没有网页界面、没有执行历史、没有并发控制，不满足「网页上操作」的诉求 |

Gitea Actions 的 `workflow_dispatch` 触发器正好对应你要的「在网页上对 main 分支打包部署」：仓库页面 → Actions → 选择工作流 → Run workflow，可填参数、可看实时日志、有完整历史记录。

### 网络拓扑决定了数据流向

Gitea 在 `192.168.3.69`，这是私有网段，云服务器无法访问。所以**不能让云服务器 `git pull`**，只能反过来：

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

这个方向有三个好处：Gitea 不需要暴露到公网；云服务器不需要持有 git 凭据；构建负载不落在生产机上。

代价是 runner 需要一台常开的内网机器。若已有内网服务器（跑 Gitea 那台即可）就没有额外成本。

## 二、三个必须先解决的前置问题

这三项不解决，发布基建搭好了也发不出正确的站点。按优先级排列。

### 阻塞项 1：`public/media/` 有 103 MB 不在版本控制里

`apps/web/.gitignore` 把 `public/media/` 整个排除了。实测：

| 内容 | 体积 |
| --- | --- |
| `dist/assets`（JS + CSS） | 0.6 MB |
| `dist/media` | **103 MB** |
| 其中 `720P.mp4` 单文件 | **92.2 MB** |

CI 从 git clone 出来的工作区**没有 `public/media/`**，`vite build` 产出的 `dist/` 里 `media/` 是空的。直接部署的结果是：首页 hero 视频不播、所有产品页配图全部破图。而构建本身不会报错，日志全绿 —— 这是最容易上线后才发现的一类问题。

**处理方式**：媒体文件不进版本控制这个决定是对的（92 MB 二进制文件进 git 会让仓库永久臃肿，且每次 clone 都要拉全量）。所以不改 `.gitignore`，而是把媒体作为**独立于发布流程的持久资源**：

```
/srv/lightinfra/web/shared/media/     ← 持久存放，不随发布覆盖
/srv/lightinfra/web/current/media     ← 符号链接指向上面
```

媒体变更时单独 rsync 一次（见[第六节](#63-媒体资源同步)），日常发布完全不碰它。发布制品从 103 MB 降到 0.6 MB，上传几秒完成。

顺带一个性能建议：92 MB 的视频直接由源站发，首屏体验取决于服务器出口带宽。后续可以考虑转对象存储 + CDN，或至少压一版更低码率的做移动端回退。这不影响本方案落地，先记着。

### 阻塞项 2：`main` 分支是空基线

```
main:                    41e47cf chore: 初始化 main 基线（初始项目，标题静态）
refactor/doc-and-infra:  3bd197e chore: 站点标题改为「LightInfra - 光之宇」
                         ...
main..HEAD:              190 files changed, 6475 insertions(+), 40242 deletions(-)
```

现在对 `main` 打包，部署出去的是初始化时的静态占位站点。而且工作区还有未提交的改动（`src/api/articles.ts`、`src/utils/request.ts`、`src/composables/useArticleList.ts`、`tsconfig.json` 等），Strapi 对接层就在这批文件里。

**处理方式**：按你们规范第 5 节，先把 `refactor/doc-and-infra` 提交完整、推送、建 PR 合入 `main`。发布基建的搭建可以与此并行 —— 工作流文件本身也是通过 PR 合入的。

顺带提醒：`vite.config.js` 已 staged 重命名为 `vite.config.ts`，同批还新增了 `tsconfig.json` / `tsconfig.node.json`，前端在做 TS 化。合入前确认 `npm run build` 在干净 clone 上能通过（本地 `node_modules` 可能掩盖缺失的类型依赖）。

### 阻塞项 3：CMS 纳入版本控制 —— 已完成

后端原先只是本地目录、没有 git。现已与前端合并为单一仓库（monorepo）：

```
apps/web/     原 LI_web
apps/cms/     原 li-web-cms
docs/         本文档所在位置（原 li-web-cms/src/docs/）
```

沿用前端已有的 Gitea 远端 `chenban/Lightinfra-web`，不需要新建仓库。合并的取舍分析见本节末尾的说明。

`.gitignore` 分三份，各自作用于所在目录，避免在根文件里维护 `apps/` 前缀：

- 根 `.gitignore`：跨应用的杂项（编辑器、`.reasonix/`、`.claude/settings.local.json`）
- `apps/web/.gitignore`：沿用原有内容不变（含 `public/media/`）
- `apps/cms/.gitignore`：新建，覆盖 `node_modules/`、`dist/`、`.strapi/`、`.tmp/`、`*.db`、`public/uploads/*`、`.env`

`.env` 与 `public/uploads/` 绝不能进仓库：前者含 `ENCRYPTION_KEY` 等六个密钥，后者是运行时用户数据。已实测 `git add -A --dry-run` 只会纳入 `apps/web/.env`（内容全是注释，无密钥）与 `apps/cms/.env.example`。

> **为什么合仓而不是两个仓库。** 前端 `apps/web/src/types/article.ts` 手写了 `StrapiArticle`、`StrapiMedia`、`StrapiResponse<T>`，镜像的正是 CMS 的 Article schema。分仓时改一个字段要动两个仓库、开两个 PR，没有机制保证一致性，漏改前端就是运行时 `undefined` 且 TS 编译器发现不了。合仓后是一个 PR、一次评审。
>
> **但没有使用 npm workspaces。** Strapi 官方不支持（[strapi#9079](https://github.com/strapi/strapi/issues/9079)），依赖提升还会破坏原生模块 —— `better-sqlite3` 正是原生模块。两应用间只有 `typescript` 与 `@types/node` 重叠且版本不同，提升拿不到收益。两个应用各自 `npm install`、各自 `node_modules` 和 lockfile，仓库根**没有** `package.json`。
>
> 代价是版本 tag 需要命名空间（`web/v1.2.0`、`cms/v1.0.0`），偏离团队规范 §9.1 的 `v1.4.0` 格式。

## 三、需要你决策的一件事：代码出境

你们规范第 7.3.1 节写明「代码严禁出境」，并据此排除了 SaaS 与公网 LLM。**云服务器在物理上就是内网之外**，而 Strapi 是 Node 应用，运行时必须在服务器上持有完整源码与配置。所以：

| 部署物 | 出境内容 | 性质 |
| --- | --- | --- |
| 前端 `dist/` | 压缩混淆后的 JS/CSS | 本来就要发给浏览器，等同公开，无风险 |
| 前端 `media/` | 官网图片与视频 | 对外宣传素材，本来就要公开 |
| 后端 Strapi 源码 | **完整 TS 源码 + 配置** | 真正意义上的出境 |

需要你明确一件事：那条红线是针对「代码交给第三方服务/公网模型」，还是「代码离开内网机房」？

- 若是前者：部署到自有云服务器不违反，本方案可直接落地。
- 若是后者：Strapi 就不能放公网云，方案要改成后端留在内网、只把前端静态站发到云上，两者之间靠反向代理或 API 网关打通（需要内网有一条可控的入站通道）。

这个判断我不能替你做，它决定后端放哪。**本文档剩余部分按「前者」假设撰写**（前后端同机）。若结论是后者，告诉我，第四节起的架构要重做。

顺带说明，Strapi 源码里目前不含商业敏感逻辑 —— 一个 Article 内容类型、标准配置、一段权限初始化脚本。风险等级客观上不高，但这不改变决策权在你。

## 四、目标架构

### 单域名，路径分流

你们前端已经是同源设计：`src/utils/request.ts:98` 是 `baseURL: import.meta.env.VITE_API_BASE ?? '/api'`，`vite.config.ts` 的 dev proxy 把 `/api` 和 `/uploads` 转给 Strapi。生产延续同源即可。

已核对前端全部路由：`/`、`products`、`opticsgpt`、`ifts`、`instruments`、`about`、`contact`、`news`、`research`、`detail/:id`，**与 `/api`、`/admin`、`/uploads`、`/media` 均无冲突**。

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

这样做的直接收益：**CORS 完全不需要**。同源请求，无预检，无白名单维护。`deployment.md` 第三节第 3 条要求收紧 CORS 的改动，在单域名方案下可以不做（保留 `CORS_ORIGINS` 变量作为将来分域名的余地，值留空即可）。

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

> **这里修正了 `deployment.md` 的一处设计缺陷。** 那份文档把上传目录放在 `/var/www/li-web-cms/public/uploads`，即代码目录内部。引入原子发布后，代码目录每次发布都会被换掉，上传的媒体会随之丢失。必须像上面这样移到 `shared/` 并符号链接回去。数据库同理，已经在 `/var/lib/strapi/`，不受影响。

保留最近 5 个 release，回滚就是把 `current` 指回上一个目录。

### 两个应用的构建位置不同

| | 前端 | 后端 |
| --- | --- | --- |
| 构建在哪 | **runner 上** | **服务器上** |
| 传输内容 | `dist/`（0.6 MB） | 源码（约 1 MB） |
| 理由 | 纯 JS 产物，与平台无关 | `better-sqlite3` 是原生模块，须在目标平台安装 |

后端在服务器上构建的额外好处：不要求 runner 与生产环境的 Node 版本、glibc 版本一致。代价是生产机要有构建工具链，以及构建期约 1.5 GB 内存峰值 —— 你说过硬件充足，可以接受。

关键是**构建发生在新的 release 目录里，旧版本仍在服务**，所以构建过程零停机。只有最后的符号链接切换 + `systemctl restart` 有短暂中断（约 5–10 秒，Strapi 启动时间）。

若要连这几秒都消掉，需要跑两个 Strapi 实例做蓝绿切换。对内容站点没必要，本方案不做。

## 五、发布流程

### 网页操作路径

Gitea 仓库页 → **Actions** → 左侧选工作流（`release-web` 或 `release-cms`）→ 右上 **Run workflow** → 选分支 `main`、填参数 → 执行。实时日志与历史记录都在同一页面。

**两个应用各自持有自己的工作流文件**，`.gitea/workflows/release-web.yml` 与 `.gitea/workflows/release-cms.yml`，互不依赖。前端发前端，后端发后端。

合仓后这一点没有变化：`workflow_dispatch` 是按工作流文件触发的，界面上仍是两个条目、点两次。之所以不合并成一个工作流，是因为两侧发布本来就不必强耦合 —— 改一段文案不需要重启 Strapi，加一个内容字段不需要重发前端。合并后每次发布都要么多做一半无用功，要么就得加一堆条件判断。需要协同发布时，依次点两次即可。

> 合仓真正省掉的是**配置面**：`DEPLOY_SSH_KEY` 等 4 个 secret 只配一份而不是两份，保护分支、评审规则、runner 标签也只维护一处。

`workflow_dispatch` 支持输入参数，Gitea 界面上呈现为下拉框和勾选框。

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
   ├─ 前端：npm ci && npm run build → 打包 dist/ + deploy/
   └─ 后端：直接打包源码 + deploy/（排除 node_modules/.git/.env）
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

第 ⑫ 步的自动回滚是这个流程里最值得投入的部分。没有它，一次失败的发布会让站点持续不可用直到人工介入；有了它，最坏情况是站点回到上一个可用版本，你在 Gitea 页面看到红色失败标记。

### 版本号

用 `<UTC时间戳>-<commit短哈希>`，例如 `20260818-142301-a3f0`。理由：单调递增便于排序、直接对应 git commit 便于追溯、不需要人工维护。

这与你们规范第 9.1 节的 SemVer tag 不冲突 —— SemVer 是**对外的版本标识**（打在 main 上、写进 CHANGELOG），发布版本号是**部署实例的标识**。一个 SemVer tag 可能对应多次部署（比如修了部署脚本重发一次）。

需要按 tag 发布时，工作流加一个 `on: push: tags: ['v*']` 触发器即可，与手动触发并存。

## 六、实现

### 6.1 一次性准备

**服务器：创建发布用户与目录**

发布用户与运行用户分离。`deployer` 能写发布目录、能重启服务；`strapi` 只负责运行。

```bash
sudo useradd -m -s /bin/bash deployer
sudo mkdir -p /srv/lightinfra/{web,cms}/{releases,shared} \
              /srv/lightinfra/incoming /srv/lightinfra/backups
sudo mkdir -p /srv/lightinfra/web/shared/media
sudo mkdir -p /srv/lightinfra/cms/shared/uploads

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

按你们规范第 7.3.4 节的清单，在内网主机上装 runner 并注册到 Gitea。要点：

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

### 6.3 媒体资源同步

`shared/media` 独立于发布流程。首次全量推一次：

```powershell
scp -r D:\WORKBENCH\LI_web\apps\web\public\media\* deployer@<服务器IP>:/srv/lightinfra/web/shared/media/
```

后续增量同步用 rsync（Windows 下走 WSL 或 Git Bash）：

```bash
rsync -avz --dry-run \
  /mnt/d/WORKBENCH/LI_web/apps/web/public/media/ \
  deployer@<服务器IP>:/srv/lightinfra/web/shared/media/
# 确认清单无误后去掉 --dry-run，需要清理已删文件时再加 --delete
```

`--delete` 会删掉服务器上本地已不存在的文件。**首次务必先 `--dry-run`** —— 源路径写错加上 `--delete` 会清空目标目录。

媒体通常几个月才变一次，日常发布不必勾 `sync_media`。

> 长期建议：把媒体（尤其 92 MB 视频）挪到对象存储 + CDN。届时前端改引用 CDN 地址，`shared/media` 和这一步都可以撤掉，服务器出口带宽压力一并解决。

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

# 所有命令都在 apps/web 下执行；仓库根没有 package.json
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
          echo "请按文档 6.3 节从本地手工 rsync。"
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

**`sync_media` 那一步是故意让它失败的。** 媒体不在 git 里，runner 从 clone 出来的工作区拿不到它 —— 这个参数在 runner 侧无法真正实现。保留它并给出明确提示，比让人误以为勾了就同步了要好。真正的同步只能从有媒体的机器（你的本地）发起。

如果希望这个参数真正可用，需要把媒体放到 runner 能访问的内网位置（NAS 或内网对象存储），然后这一步改为从那里拉取。这是一个独立的小项目，不在本方案首期范围内。

**类型检查已经是构建的一部分，不能设成「只报告不阻塞」。** 前端的 `build` 脚本是 `npm run type-check && vite build`，而 `type-check` 是 `vue-tsc -p tsconfig.json && tsc -p tsconfig.node.json`。也就是说类型错误会直接让 `npm run build` 失败，进而让整个发布中断 —— 这是既有设计，不是本方案引入的。

前端正在做 TS 化（`typescript: 5.9.3`、`vue-tsc: 3.3.10`），迁移期出类型错误属正常。如果希望迁移期内类型错误不阻塞发布，得改 `package.json` 把 `type-check` 从 `build` 里摘出来、在 CI 里单独跑并加 `continue-on-error` —— 但我不建议这么做：类型门禁是发布前唯一的自动化质量检查，摘掉它等于裸奔。正确做法是把类型错误清零，然后保持现状。

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
          # 服务器端解包逻辑与分仓时完全一致
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

**两个工作流都靠 `defaults.run.working-directory` 定位应用目录。** 这是合仓后唯一需要改的工作流内容 —— `npm ci`、`npm run build`、`tar` 都在 `apps/web` 或 `apps/cms` 里执行，制品结构和服务器端脚本与分仓时完全相同。注意 `defaults` 只作用于 `run` 步骤，`actions/checkout@v4` 仍然 checkout 整个仓库，这是需要的（版本号要靠 `git rev-parse`）。

### 6.6 Nginx 配置

替换 `deployment.md` 第九步的站点配置。核心差异：多了前端静态服务与 `/media/` 别名，去掉了独立 CMS 域名。

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
    ssl_session_cache shared:SSL:10m;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    client_max_body_size 50M;
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
        # 视频需要支持拖动进度条
        add_header Accept-Ranges bytes;
        try_files $uri =404;
    }

    # ---- Strapi ----
    location = /admin/auth/login {
        limit_req zone=strapi_login burst=3 nodelay;
        include /etc/nginx/snippets/strapi-proxy.conf;
    }
    location = /api/auth/local {
        limit_req zone=strapi_login burst=3 nodelay;
        include /etc/nginx/snippets/strapi-proxy.conf;
    }
    location /admin {
        # allow 198.51.100.7;
        # deny all;
        include /etc/nginx/snippets/strapi-proxy.conf;
    }
    location /api/ {
        limit_req zone=strapi_api burst=60 nodelay;
        include /etc/nginx/snippets/strapi-proxy.conf;
    }
    location /uploads/ {
        expires 30d;
        add_header Cache-Control "public";
        include /etc/nginx/snippets/strapi-proxy.conf;
    }

    # Strapi 后台还需要这几个前缀
    location /content-manager { include /etc/nginx/snippets/strapi-proxy.conf; }
    location /content-type-builder { include /etc/nginx/snippets/strapi-proxy.conf; }
    location /upload { include /etc/nginx/snippets/strapi-proxy.conf; }
    location /i18n { include /etc/nginx/snippets/strapi-proxy.conf; }
    location /users-permissions { include /etc/nginx/snippets/strapi-proxy.conf; }

    # ---- SPA fallback，必须放最后 ----
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

三点必须注意：

**`dist/_redirects` 在 nginx 下无效。** 那是 Netlify / Cloudflare Pages 的语法（内容是 `/* /index.html 200`）。nginx 靠 `try_files $uri $uri/ /index.html` 实现 SPA fallback，作用等价。该文件留在产物里无害，但别指望它生效。

**Strapi 后台的路径不止 `/admin`。** 管理面板的 XHR 会打到 `/content-manager`、`/content-type-builder`、`/upload`、`/i18n`、`/users-permissions` 等前缀。漏了它们的话，后台能打开但内容管理页全是报错。上面列的是当前插件集（`users-permissions` + `upload` + `cloud`）所需；将来装新插件要对应补。这是单域名方案相比独立子域名唯一的额外维护成本 —— 子域名方案下 `location /` 全转给 Strapi 就不用逐个列。

**`location /` 必须在最后。** nginx 的前缀匹配取最长者，顺序不影响匹配结果，但把 SPA fallback 写在最后更符合阅读直觉，也避免维护时误把它放到 `/api/` 之前引发困惑。

复用的 proxy 片段，写入 `/etc/nginx/snippets/strapi-proxy.conf`：

```nginx
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
```

限流 zone 定义在 `http` 段（`/etc/nginx/conf.d/limits.conf`），不能放进 `server` 段：

```nginx
limit_req_zone $binary_remote_addr zone=strapi_login:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=strapi_api:10m rate=30r/s;
```

改完执行 `sudo nginx -t && sudo systemctl reload nginx`。`nginx -t` 通过不代表路由正确，仍需按 §8 的清单逐条验证。

### 6.7 前端环境变量

单域名下前端不需要任何构建期环境变量：`src/utils/request.ts:98` 的 `baseURL: import.meta.env.VITE_API_BASE ?? '/api'` 在 `VITE_API_BASE` 未设置时回落到 `/api`，正是我们要的同源相对路径。

所以：**不要**在 CI 里设 `VITE_API_BASE`。也**不要**设 `VITE_API_TOKEN` —— 所有 `VITE_` 前缀变量会被 Vite 内联进产物，等同于把 token 明文发布到公网（`request.ts` 里已有这条注释）。前台读取公开文章靠的是 `src/index.ts:15` bootstrap 授予 public role 的 `find`/`findOne` 权限，不需要 token。

媒体引用要用 `/media/...` 这样的绝对路径，不要用 `import` 打包 —— 103 MB 的素材过构建管线会让构建时间和产物体积失控，也失去了 §6.3 把媒体放 `shared/` 的意义。

## 七、回滚

三种回滚，按代价从低到高。

**7.1 自动回滚（无需人工）**

`lightinfra-release` 的健康检查失败时自动执行：`current` 符号链接指回上一版本、重启服务、再次检查。工作流会以非零退出码结束，Gitea 界面上显示红色失败。这一步已经在 §6.2 的脚本里，不用额外操作。

自动回滚只覆盖「新版本起不来」。它不覆盖「新版本起来了但页面是错的」—— 健康检查只看 HTTP 状态码。

**7.2 手动回滚到任意历史版本**

```bash
ssh deployer@<server>
ls -lt /srv/lightinfra/cms/releases/     # 找目标版本目录名
sudo /usr/local/bin/lightinfra-release cms 20260315T081200-a1b2c3d --rollback-to
```

若脚本未实现 `--rollback-to`（§6.2 的版本没有），直接手工两步：

```bash
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

**7.3 回滚不能解决的情况**

代码回滚不会回滚数据。以下都需要走 `operations.md` §4 的数据恢复流程：

| 情况 | 为什么代码回滚无效 |
| --- | --- |
| Content-Type 结构变更后回滚 | Strapi 已改过数据库表结构，旧代码读不了新表 |
| 误删文章 | 数据在 `/var/lib/strapi/data.db`，不随发布目录变动 |
| 上传文件被覆盖 | 同理，在 `/srv/lightinfra/cms/shared/uploads` |

**因此：涉及 Content-Type 变更的发布，必须在发布前手工做一次数据库备份，且不要用 `skip_backup=true`。** 这条比自动备份重要 —— 自动备份是每日 03:30 的定时任务，最坏情况下会丢近 24 小时的内容编辑。

## 八、验证清单

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

## 九、对 `deployment.md` 的修正

引入原子发布和单域名后，那份文档有四处需要改。按重要性排序。

| # | 位置 | 原方案 | 改为 | 不改的后果 |
| --- | --- | --- | --- | --- |
| 1 | 上传目录 | `/var/www/li-web-cms/public/uploads` | `/srv/lightinfra/cms/shared/uploads` + 符号链接 | **每次发布丢失全部上传媒体** |
| 2 | 代码目录 | `/var/www/li-web-cms` | `/srv/lightinfra/cms/current`（符号链接） | 无法原子切换，也无法回滚 |
| 3 | CORS | 收紧 `strapi::cors` 到指定 origin | 不需要改，保持默认 | 无 —— 单域名下前端与 API 同源，浏览器不发 preflight |
| 4 | Nginx 站点 | CMS 独立域名 / server 块 | 合并进单域名，见 §6.6 | 需要两张证书、两个 DNS 记录，且前端要配 `VITE_API_BASE` |

systemd unit 也要跟着改。`WorkingDirectory` 指向符号链接、`ReadWritePaths` 换成新路径：

```ini
WorkingDirectory=/srv/lightinfra/cms/current
ReadWritePaths=/var/lib/strapi /srv/lightinfra/cms/shared/uploads /srv/lightinfra/cms/releases
```

`ReadWritePaths` 里给整个 `releases/` 目录写权限，是因为 Strapi 运行时会往自己的代码目录写 `.strapi/` 和 `.tmp/`，而每次发布的目录名都不同，没法逐个列举。这比 `deployment.md` 里逐个列举 `.strapi`、`.tmp` 的写法宽松一些，是原子发布带来的必要让步。

> `systemd` 解析 `WorkingDirectory` 时会跟随符号链接，但**服务启动时解析一次**。发布脚本换完链接后必须 `systemctl restart`（不是 `reload`），否则进程还在老目录里跑。§6.2 的脚本已经是 restart。

## 十、分阶段落地

不要一次性全上。每阶段结束后系统都处于可用状态，出问题就停在那一阶段。

**阶段一：Git 仓库就位（半天，本地）**

目录合并已完成（§2.3），剩下的是提交与推送：

1. 提交 monorepo 结构变更（77 个文件重命名 + 新增 `apps/cms/`、`docs/`、根 `.gitignore`、根 `README.md`）。
2. 确认 `.tmp/`、`.env`、`public/uploads/`、`node_modules/` 都没进版本库 —— `git ls-files | grep -E 'apps/cms/(\.env$|\.tmp|public/uploads|node_modules)'` 应无输出。
3. 前端把 refactor 分支合进 `main`（§2.2 的 190 文件变更）。

这一步不涉及服务器，先做完。合并动作与 refactor 分支的改动混在同一批工作区变更里，建议分两次提交（一次纯移动、一次功能改动），rename 检测的可读性会好很多。

**阶段二：手工部署一次（1 天，服务器）**

完全按 `deployment.md` 走一遍，但用 §9 修正后的路径。手工 `scp` 上传、手工 `npm ci && npm run build`、手工启服务。目标是让「跑起来」这件事先成立，把发布自动化的变量排除掉。

这一阶段要拿到的确认：Strapi 起来了、后台能登录、`/api/articles` 有数据、前端首页和深链接都正常、§8 十条全过。

**阶段三：发布脚本（半天，服务器）**

装 `lightinfra-release`、建 `deployer` 用户和 sudoers、配 SSH 密钥。**先在服务器本地手工调用一次**：把阶段二的产物打成 tar 放到 `/tmp/uploads/`，然后 `sudo lightinfra-release cms <版本>`。验证原子切换和自动回滚都工作 —— 回滚可以故意用一个坏的 tar 触发。

**阶段四：接上 Gitea Actions（1 天）**

注册 act_runner、配 4 个 secret、加两个 workflow 文件。前端先跑，因为前端发布不涉及数据库和服务重启，出错代价最低。跑通后再接后端。

**阶段五：备份与监控（半天）**

按 `operations.md` §3、§6 装备份脚本和健康检查的 systemd timer。**这一阶段不能省，也不建议延后** —— 一旦开始通过 CMS 录入真实内容，没有备份的每一天都是在积累风险。

总计约 3.5 个工作日，其中服务器上的工作约 2 天。

## 十一、这套方案的边界

写清楚它不做什么，避免将来误用。

**不做多环境。** 只有生产一套。要预发布环境的话，最省事的做法是同一台机器上再起一套 `/srv/lightinfra-staging/`、另一个 systemd 服务监听 1338、nginx 加一个子域名，workflow 加 `environment` 参数选目标。但那意味着两倍的运维面，现阶段（单人维护、内容站）不值得。

**不做蓝绿或滚动。** 单实例架构，发布时 Strapi 有 5–15 秒不可用（重启 + 健康检查）。前端发布是真正零中断的（只换静态文件符号链接）。对内容站可接受；将来若有不能中断的接口，需要上双实例 + nginx upstream。

**不做数据库迁移自动化。** Strapi 的 schema 变更在启动时自动同步，这在 SQLite 上是隐式的、不可逆的、没有版本记录的。这也是 §7.3 强调 Content-Type 变更前必须手工备份的根本原因。迁到 Postgres 后可以引入迁移脚本管理，见 `operations.md` §9。

**不做审批流。** `workflow_dispatch` 谁有仓库 write 权限谁就能点发布。Gitea 的 Environment 保护规则可以加人工审批，但当前团队规模下，保护 `main` 分支（团队规范 §3.4，发布必须经 PR 合入）已经是足够的门槛。

**不覆盖出境合规。** 见 §3。方案假设了「前后端同机部署在公网云服务器」这一前提成立。

## 十二、需要你确认的事项

前四条阻塞实施，后三条可以边做边定。

1. **§3 的代码出境范围。** 团队规范 §7.3.1 写的是「代码严禁出境」。本文档按「限第三方服务与公共 LLM」这一读法撰写。若实际含义是「任何内网之外的机器」，那 Strapi 源码不能放公网云服务器，第 4 节起的架构要重做（前端产物仍可发布，因为它本身就是要给公众的）。**这条必须先定。**

2. **域名。** 是否已有域名、是否已解析到该服务器。前端和后台是否共用一个域名（本方案假设共用 `www.example.com`）。

3. **服务器发行版与版本。** `lsb_release -a` 或 `cat /etc/os-release` 的输出。方案按 Ubuntu 22/24 写，RHEL 系需要额外处理 SELinux（`setsebool -P httpd_can_network_connect 1`，否则 nginx 反代必定 502）。

4. **现有 `.tmp/data.db` 是否迁移。** 那 1 MB 库里有真实数据（含一个已上传的产品页图片）。迁移就按 `deployment.md` 第七步；不迁移就从空库开始，内容重新录入。

5. **`/admin` 是否加 IP 白名单。** 需要一个固定出口 IP。办公网络是动态 IP 的话，这条会把你自己锁在外面，届时只能用 §6.6 里注释掉的写法（即不启用）。

6. **媒体是否走对象存储。** 92 MB 视频从服务器直出会吃满出口带宽。现在不上 CDN 也能跑，但这是首个可预见的瓶颈。

7. **Gitea act_runner 装在哪。** 内网另一台机器，还是 Gitea 服务器本机。本机最省事，但构建（`npm ci` + Vite build）会和 Gitea 抢 CPU。

