# CMS 部署方案（`apps/cms`）

自有云服务器部署 Strapi CMS 的完整步骤。配套文档见 [运维方案](./operations.md) 与 [发布基建方案](./release-infra.md)。

> **若与前端 `apps/web` 同机部署，本文档有四处路径与配置被 [发布基建方案 §九](./release-infra.md#九对-deploymentmd-的修正) 取代**，其中上传目录的位置是硬性问题 —— 按本文档放在代码目录内，引入原子发布后每次发布都会丢失上传的媒体。先读那一节再动手。
>
> 本文档写于前后端分仓时期，命令里的本地路径需按 `apps/cms/` 理解。服务器端路径（`/var/www/li-web-cms` 等）不受合仓影响。

> ### ⚠️ 先读这一条：`ENCRYPTION_KEY`
>
> 整个部署流程里**只有这一个决定不可逆**。
>
> 如果你要保留本地 `.tmp/data.db` 里已录入的文章（[步骤 7](#步骤-7迁移现有数据可选)），那么 `/etc/strapi/.env` 中的 `ENCRYPTION_KEY` **必须逐字沿用本地 `.env` 的原值**。该键用于加密数据库中的敏感字段；换掉之后，旧数据的加密列永久无法解密，且没有任何补救手段。
>
> 其余五个密钥（`APP_KEYS`、`JWT_SECRET`、`ADMIN_JWT_SECRET`、`API_TOKEN_SALT`、`TRANSFER_TOKEN_SALT`）都可以自由重新生成，代价仅是会话和已签发 token 失效。
>
> 若不迁移数据、在服务器上重新录入内容，则六个密钥全部用新值即可。
>
> **动手前先把本地 `.env` 的 `ENCRYPTION_KEY` 复制到安全的地方。**

## 一、方案概要

| 项 | 选定方案 | 理由 |
| --- | --- | --- |
| 进程管理 | systemd | 零额外依赖，支持进程沙箱，日志/重启/自启走系统标准行为 |
| 反向代理 | Nginx | 终结 TLS、限速、可选 IP 白名单 |
| 数据库 | SQLite | 现有数据量小、单人编辑；备份即单文件复制 |
| TLS | Let's Encrypt (certbot) | 免费且自动续期 |
| Node | 22 LTS (NodeSource apt) | 落在 `package.json` 的 `>=20 <=26` 区间内，且有确定的绝对路径供 systemd 使用 |

不选 Docker 的原因：本项目独占服务器、不做迁移，Docker 的可移植/可复现优势用不上，却会引入 `public/uploads` 卷的 UID 不匹配问题（容器内用户与宿主机目录 owner 不一致导致上传 permission denied）。

不选 Postgres 的原因：当前数据约 1 MB、单一内容类型、单人编辑。SQLite 的限制是单写入者并发，尚未触及。后续如需多人同时编辑再迁移，数据量小、成本低。

### 架构

```
公网
  │
  ├── 443/80  Nginx
  │             ├── /admin      → 127.0.0.1:1337   (可选 IP 白名单 + 限速)
  │             ├── /api        → 127.0.0.1:1337   (限速)
  │             ├── /uploads    → 127.0.0.1:1337   (长缓存)
  │             └── /           → 127.0.0.1:1337
  │
  └── 22      SSH (仅密钥登录 + fail2ban)

Strapi (systemd unit `strapi`)
  ├── 运行用户   strapi (非 root，无登录 shell)
  ├── 监听       127.0.0.1:1337  ← 不对公网暴露
  ├── 代码       /var/www/li-web-cms        (对进程只读)
  ├── 数据库     /var/lib/strapi/data.db    (可写)
  ├── 上传       /var/www/li-web-cms/public/uploads (可写)
  └── 密钥       /etc/strapi/.env           (chmod 600, root:strapi)
```

关键点：Strapi 只监听回环地址，1337 端口不开放防火墙。所有外部流量必须经过 Nginx。

## 二、部署前需要确定的信息

开始前把下面的值填好，后续命令直接替换。

| 变量 | 示例 | 说明 |
| --- | --- | --- |
| `SERVER_IP` | `203.0.113.10` | 服务器公网 IP |
| `DOMAIN` | `cms.example.com` | CMS 域名，需提前解析到 `SERVER_IP` |
| `FRONTEND_ORIGIN` | `https://www.example.com` | 前端站点地址，用于 CORS 白名单 |
| `SSH_USER` | `ubuntu` | 有 sudo 权限的登录用户 |
| `ADMIN_ALLOW_IP` | `198.51.100.7` | 允许访问 `/admin` 的出口 IP，可留空 |

本文档命令以 **Ubuntu 22.04 / 24.04 LTS** 为准。若为 CentOS / Rocky / Alibaba Cloud Linux，差异见文末[附录 A](#附录-a其他发行版差异)。

### 前置检查

```bash
cat /etc/os-release          # 确认发行版
free -h                      # 确认内存，构建 admin 峰值约 1.5 GB
df -h /                      # 确认磁盘，预留 3 GB 以上
dig +short cms.example.com   # 确认域名已解析到本机 IP
```

## 三、需要先改的代码

以下四处是当前代码放到反向代理后面必须调整的，**在部署前于本地改好并验证构建通过**。

### 1. `config/server.ts` — 补 `url` 与 `proxy`

Strapi 在反代后面拿不到外部地址，会导致 admin 登录后反复掉线、媒体库 URL 拼错。

```ts
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', undefined),   // 例：https://cms.example.com
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

第 58 行当前用 `path.join`，传入绝对路径时会被错误拼接：

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

### 3. `config/middlewares.ts` — 收紧 CORS

现在用的是 `strapi::cors` 默认值，放通所有来源。改为显式白名单：

```ts
const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: (process.env.CORS_ORIGINS ?? 'http://localhost:5173').split(','),
      methods: ['GET', 'HEAD', 'OPTIONS'],
      credentials: false,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

前端只读取文章，`methods` 限制为 `GET/HEAD/OPTIONS` 即可。若后续前端需要提交表单（评论、订阅），再按需放开对应方法。

### 4. `.env.example` — 补齐生产用到的键

```
HOST=127.0.0.1
PORT=1337
PUBLIC_URL=https://cms.example.com
CORS_ORIGINS=https://www.example.com

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

## 四、部署步骤

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

sudo mkdir -p /var/www/li-web-cms
sudo mkdir -p /var/lib/strapi          # 数据库
sudo mkdir -p /etc/strapi              # 密钥
sudo mkdir -p /var/backups/strapi      # 备份

sudo chown -R strapi:strapi /var/lib/strapi /var/backups/strapi
sudo chmod 750 /var/lib/strapi
sudo chown root:strapi /etc/strapi
sudo chmod 750 /etc/strapi
```

### 步骤 3：上传代码

**不要上传 `node_modules`。** `better-sqlite3` 是原生模块，Windows 上编译的二进制在 Linux 上无法加载，必须在服务器重新安装。

本地打包（PowerShell，在项目根目录执行）：

```powershell
$exclude = @('node_modules', '.tmp', 'dist', '.strapi', '.git')
$items = Get-ChildItem -Force | Where-Object { $_.Name -notin $exclude -and $_.Name -ne '.env' }
Compress-Archive -Path $items -DestinationPath ..\li-web-cms.zip -Force
scp ..\li-web-cms.zip $SSH_USER@${SERVER_IP}:/tmp/
```

`.env` 单独排除，生产密钥在服务器上重新生成，不从本地带过去。

服务器解压：

```bash
cd /var/www/li-web-cms
sudo unzip -o /tmp/li-web-cms.zip -d /var/www/li-web-cms
sudo rm /tmp/li-web-cms.zip
```

> 建议改用 Git：CMS 已随前端合入同一仓库（`apps/cms/`），推到 Gitea 后部署与回滚都比压缩包可靠得多。见[附录 B](#附录-b改用-git-部署)。更进一步的自动化见 [发布基建方案](./release-infra.md)。

### 步骤 4：生成生产密钥

```bash
sudo tee /etc/strapi/.env > /dev/null <<EOF
HOST=127.0.0.1
PORT=1337
NODE_ENV=production
PUBLIC_URL=https://cms.example.com
CORS_ORIGINS=https://www.example.com

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

> **迁移现有数据库时必须注意**：如果你要把本地 `.tmp/data.db` 搬到服务器（步骤 7），`ENCRYPTION_KEY` **必须沿用本地 `.env` 里的原值**，不能重新生成。该键用于加密数据库中的敏感字段，换掉之后旧数据解不出来。其余五个密钥可以自由重新生成。
>
> 若选择在服务器上重新录入内容（不迁移数据库），则六个密钥全部用新生成的值。

Strapi 默认从工作目录读 `.env`。做一个符号链接，让应用和手动执行的 CLI 命令都能读到同一份：

```bash
sudo ln -sfn /etc/strapi/.env /var/www/li-web-cms/.env
```

链接本身权限不影响目标文件，实际读取仍受 `/etc/strapi/.env` 的 `640 root:strapi` 约束。

### 步骤 5：安装依赖并构建

```bash
cd /var/www/li-web-cms
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

设置代码目录归属。代码对运行进程只读，是沙箱策略的一部分：

```bash
sudo chown -R root:strapi /var/www/li-web-cms
sudo chmod -R g+rX,g-w /var/www/li-web-cms

# 仅上传目录对 strapi 可写
sudo chown -R strapi:strapi /var/www/li-web-cms/public/uploads
sudo chmod 755 /var/www/li-web-cms/public/uploads
```

### 步骤 6：systemd 服务

```bash
sudo tee /etc/systemd/system/strapi.service > /dev/null <<'EOF'
[Unit]
Description=Strapi CMS (li-web-cms)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=strapi
Group=strapi
WorkingDirectory=/var/www/li-web-cms
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
ReadWritePaths=/var/lib/strapi /var/www/li-web-cms/public/uploads /var/www/li-web-cms/.strapi /var/www/li-web-cms/.tmp

[Install]
WantedBy=multi-user.target
EOF
```

设计说明：

- `ExecStart` 直接调 `node` 而非 `npm start`。npm 会多包一层进程，可能吞掉 systemd 发的停止信号，导致关停变成超时后强杀。
- `ProtectSystem=strict` 让整个文件系统对进程只读，只有 `ReadWritePaths` 列出的目录可写。万一 Strapi 出现 RCE 级漏洞，攻击者无法改代码或写系统目录。
- `.strapi` 与 `.tmp` 需要可写：Strapi 运行时会在其中放缓存和中间产物。

启用：

```bash
sudo -u strapi mkdir -p /var/www/li-web-cms/.strapi /var/www/li-web-cms/.tmp
sudo chown strapi:strapi /var/www/li-web-cms/.strapi /var/www/li-web-cms/.tmp

sudo systemctl daemon-reload
sudo systemctl enable --now strapi
sudo systemctl status strapi --no-pager
```

首次启动确认监听在回环地址：

```bash
sudo ss -tlnp | grep 1337     # 期望 127.0.0.1:1337，不是 0.0.0.0:1337
curl -I http://127.0.0.1:1337/admin
```

若启动失败，`sudo journalctl -u strapi -n 80 --no-pager` 看具体报错。常见原因是沙箱漏了某个需要写的路径，报 `EACCES` / `EROFS`，把该路径加进 `ReadWritePaths` 后 `daemon-reload` 重启。

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

sudo unzip -o /tmp/uploads.zip -d /var/www/li-web-cms/public/uploads
sudo chown -R strapi:strapi /var/www/li-web-cms/public/uploads
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
sudo tee /etc/nginx/conf.d/strapi-limits.conf > /dev/null <<'EOF'
limit_req_zone $binary_remote_addr zone=strapi_login:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=strapi_api:10m rate=30r/s;
EOF
```

站点配置：

```bash
sudo tee /etc/nginx/sites-available/li-web-cms > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name cms.example.com;

    # certbot 验证路径保持可达，其余跳 HTTPS
    location /.well-known/acme-challenge/ { root /var/www/html; }
    location / { return 301 https://$host$request_uri; }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name cms.example.com;

    ssl_certificate     /etc/letsencrypt/live/cms.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cms.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    client_max_body_size 50M;   # 需大于计划上传的最大文件

    access_log /var/log/nginx/cms-access.log;
    error_log  /var/log/nginx/cms-error.log;

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

    # ---- 上传文件：长缓存 ----
    location /uploads/ {
        proxy_cache_valid 200 30d;
        expires 30d;
        add_header Cache-Control "public, immutable";
        include /etc/nginx/snippets/strapi-proxy.conf;
    }

    # ---- 内容 API ----
    location /api/ {
        limit_req zone=strapi_api burst=60 nodelay;
        include /etc/nginx/snippets/strapi-proxy.conf;
    }

    location / {
        include /etc/nginx/snippets/strapi-proxy.conf;
    }
}
EOF
```

共用的代理头片段：

```bash
sudo mkdir -p /etc/nginx/snippets
sudo tee /etc/nginx/snippets/strapi-proxy.conf > /dev/null <<'EOF'
proxy_pass http://127.0.0.1:1337;
proxy_http_version 1.1;
proxy_set_header Host              $host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host  $host;
proxy_set_header Upgrade           $http_upgrade;
proxy_set_header Connection        "upgrade";
proxy_read_timeout 300s;
EOF
```

`X-Forwarded-Proto` 是关键：配合 `config/server.ts` 里的 `proxy: { koa: true }`，Strapi 才知道外部是 HTTPS，session cookie 的 `secure` 标记才会正确置位。

启用站点：

```bash
sudo ln -sfn /etc/nginx/sites-available/li-web-cms /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
```

**此时 `nginx -t` 会失败**，因为 443 块引用的证书文件还不存在。先执行步骤 10 取证，certbot 会补全证书路径；或先临时注释掉整个 443 server 块，取证后再放开。

### 步骤 10：TLS 证书

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d cms.example.com --agree-tos -m you@example.com --redirect

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

浏览器打开 `https://cms.example.com/admin`，首个访问者会看到注册表单，创建超级管理员。

**该注册入口仅在系统无管理员时开放**，创建完即自动关闭，不会留下公开注册口。

用强口令（16 位以上随机），存进密码管理器。这个账号能改所有内容和权限。

### 步骤 13：验证

```bash
# 服务状态
sudo systemctl status strapi --no-pager
sudo systemctl is-enabled strapi          # 期望 enabled

# 监听地址：必须是 127.0.0.1，不能是 0.0.0.0
sudo ss -tlnp | grep 1337

# 1337 不可从外部访问（在本地机器执行，期望超时或拒绝）
# curl -m 5 http://203.0.113.10:1337/admin

# 公开 API 可读
curl -s https://cms.example.com/api/articles | head -c 300

# HTTP 跳转到 HTTPS
curl -sI http://cms.example.com | grep -i location

# 安全响应头
curl -sI https://cms.example.com/admin | grep -iE 'strict-transport|x-content-type'

# 限速生效（连发 10 次登录请求，应出现 429）
for i in $(seq 1 10); do curl -s -o /dev/null -w "%{http_code} " \
  -X POST https://cms.example.com/api/auth/local; done; echo
```

逐项对照：服务 enabled、监听回环、外部 1337 不通、API 有响应、HTTP 跳转、HSTS 头存在、限速返回 429。

### 步骤 14：接入前端

前端 `apps/web`（Vue 3 + Vite）接入 CMS 时：

```
# apps/web/.env.production
VITE_CMS_BASE=https://cms.example.com
```

> 若按 [发布基建方案 §6.6](./release-infra.md) 走单域名部署，这一步和下面的 CORS 都不需要 —— 前端与 API 同源，直接用相对路径 `/api/...`。

```js
const res = await fetch(`${import.meta.env.VITE_CMS_BASE}/api/articles?populate=cover`)
```

前端域名必须在 `/etc/strapi/.env` 的 `CORS_ORIGINS` 里，否则浏览器会拦掉响应。改完重启 Strapi。

`config/api.ts` 已设 `defaultLimit: 25`、`maxLimit: 100`，前端分页请求不要超过 100。

## 五、回滚

代码回滚（压缩包方式需自行留存上一版）：

```bash
sudo systemctl stop strapi
sudo rm -rf /var/www/li-web-cms
sudo mv /var/www/li-web-cms.bak /var/www/li-web-cms
sudo systemctl start strapi
```

所以每次发布前先备份当前版本：

```bash
sudo rm -rf /var/www/li-web-cms.bak
sudo cp -a /var/www/li-web-cms /var/www/li-web-cms.bak
```

数据库回滚见[运维方案的恢复流程](./operations.md#四恢复流程)。改用 Git 后回滚变成 `git checkout <上一个 tag>` 再重新构建，可靠得多。

## 附录 A：其他发行版差异

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

## 附录 B：改用 Git 部署

CMS 已随前端合入同一仓库（`apps/cms/`），远端为 Gitea 上的 `chenban/Lightinfra-web`。提交推送后即可用 Git 部署，比压缩包可靠得多。

确认 `apps/cms/.gitignore` 覆盖 `.env`、`node_modules`、`.tmp`、`dist`、`.strapi`、`public/uploads`。**`.env` 绝不能进仓库。**

服务器首次部署 —— 注意 Gitea 在内网 `192.168.3.69`，公网服务器**访问不到**，所以这条只适用于内网服务器：

```bash
sudo -u strapi git clone <仓库地址> /tmp/lightinfra-src
sudo -u strapi cp -a /tmp/lightinfra-src/apps/cms/. /var/www/li-web-cms/
```

多了一次 clone 到临时目录再拷贝，是因为仓库根还有 `apps/web/` 和 `docs/`，不该出现在 CMS 的运行目录里。

部署到公网服务器时不能用这个方式（服务器连不到内网 Gitea），改走 [发布基建方案](./release-infra.md) 的「内网构建 + 出站推送」模型。

后续发布见[运维方案的发布流程](./operations.md#五发布流程)。

## 六、待你确认的事项

1. **发行版与版本** — 本文档按 Ubuntu 22/24 写，其他系统按附录 A 调整
2. **域名** — 是否已解析到服务器 IP，证书邮箱用哪个
3. **`/admin` 是否加 IP 白名单** — 出口 IP 固定则强烈建议加；动态 IP 不要加，会把自己锁在外面
4. **是否迁移现有数据** — 决定 `ENCRYPTION_KEY` 是沿用还是重新生成
5. **前端部署位置** — 同机同域名（走路径前缀）还是独立域名，影响 CORS 与 Nginx 配置
6. **是否改用 Git** — 影响发布与回滚流程

