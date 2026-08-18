# CMS 运维方案（`apps/cms`）

日常运维、备份恢复、发布、排障。部署与自动化发布见 [部署与发布方案](./release.md)。

## 一、速查表

| 场景 | 命令 |
| --- | --- |
| 查看状态 | `sudo systemctl status strapi --no-pager` |
| 重启 | `sudo systemctl restart strapi` |
| 停止 / 启动 | `sudo systemctl stop strapi` / `start` |
| 实时日志 | `sudo journalctl -u strapi -f` |
| 今日错误 | `sudo journalctl -u strapi --since today \| grep -iE 'error\|fatal'` |
| 最近 100 行 | `sudo journalctl -u strapi -n 100 --no-pager` |
| 立即备份 | `sudo /usr/local/bin/strapi-backup.sh` |
| Nginx 测试并重载 | `sudo nginx -t && sudo systemctl reload nginx` |
| 证书剩余天数 | `sudo certbot certificates` |

关键路径：

| 内容 | 路径 |
| --- | --- |
| 代码（当前版本） | `/srv/lightinfra/cms/current` |
| 数据库 | `/var/lib/strapi/data.db` |
| 上传文件 | `/srv/lightinfra/cms/shared/uploads` |
| 密钥 | `/etc/strapi/.env` (640 root:strapi) |
| 备份 | `/var/backups/strapi/` |
| systemd unit | `/etc/systemd/system/strapi.service` |
| Nginx 站点 | `/etc/nginx/sites-available/lightinfra` |
| Nginx 日志 | `/var/log/nginx/lightinfra-{access,error}.log` |

## 二、日志

Strapi 日志走 journald，不产生需要手工轮转的文件。

```bash
sudo journalctl -u strapi -f                          # 跟随
sudo journalctl -u strapi --since "1 hour ago"        # 时间范围
sudo journalctl -u strapi -p err                      # 仅 error 级别
sudo journalctl -u strapi --since today | grep -i 429 # 被限速的请求
```

限制 journald 总占用，避免磁盘被日志吃满：

```bash
sudo sed -i 's/^#*SystemMaxUse=.*/SystemMaxUse=500M/' /etc/systemd/journald.conf
sudo systemctl restart systemd-journald
```

Nginx 日志由 `logrotate` 默认接管（`/etc/logrotate.d/nginx`），无需额外配置。查访问情况：

```bash
sudo tail -f /var/log/nginx/lightinfra-access.log
sudo awk '{print $1}' /var/log/nginx/lightinfra-access.log | sort | uniq -c | sort -rn | head -20
sudo grep -c ' 429 ' /var/log/nginx/lightinfra-access.log     # 触发限速的次数
```

## 三、备份

备份三样东西，缺一不可：

| 对象 | 为什么必须备 |
| --- | --- |
| `data.db` | 所有文章、用户、权限配置 |
| `public/uploads` | 媒体文件。数据库只存路径引用，丢了文件后台会显示破图 |
| `/etc/strapi/.env` | `ENCRYPTION_KEY` 丢失后，数据库里加密字段永久无法解密 |

`.env` 只在变更时备份一次即可，但**必须**备，且要与数据库备份分开存放（同一份泄露就同时拿到密文和密钥）。

### 备份脚本

```bash
sudo tee /usr/local/bin/strapi-backup.sh > /dev/null <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR=/var/backups/strapi
DB=/var/lib/strapi/data.db
UPLOADS=/srv/lightinfra/cms/shared/uploads
STAMP=$(date +%F_%H%M)
RETAIN_DAYS=30

mkdir -p "$BACKUP_DIR"

# .backup 是 SQLite 的在线备份命令，运行中执行也能得到一致快照
sqlite3 "$DB" ".backup '$BACKUP_DIR/data-$STAMP.db'"
gzip -f "$BACKUP_DIR/data-$STAMP.db"

tar -czf "$BACKUP_DIR/uploads-$STAMP.tar.gz" -C "$(dirname "$UPLOADS")" "$(basename "$UPLOADS")"

find "$BACKUP_DIR" -name 'data-*.db.gz'      -mtime +$RETAIN_DAYS -delete
find "$BACKUP_DIR" -name 'uploads-*.tar.gz'  -mtime +$RETAIN_DAYS -delete

echo "[$(date -Is)] backup ok: data-$STAMP.db.gz, uploads-$STAMP.tar.gz"
EOF

sudo chmod 750 /usr/local/bin/strapi-backup.sh
```

用 `sqlite3 .backup` 而不是 `cp`：直接复制运行中的 SQLite 文件可能拿到写入中途的状态，加上 WAL 未合并，恢复时可能损坏。`.backup` 走官方在线备份 API，保证快照一致。

### 定时任务

```bash
sudo tee /etc/systemd/system/strapi-backup.service > /dev/null <<'EOF'
[Unit]
Description=Backup Strapi database and uploads

[Service]
Type=oneshot
ExecStart=/usr/local/bin/strapi-backup.sh
EOF

sudo tee /etc/systemd/system/strapi-backup.timer > /dev/null <<'EOF'
[Unit]
Description=Daily Strapi backup

[Timer]
OnCalendar=*-*-* 03:30:00
Persistent=true

[Install]
WantedBy=timers.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now strapi-backup.timer
sudo systemctl list-timers strapi-backup --no-pager
```

`Persistent=true` 让错过的执行（如服务器当时关机）在下次启动后补跑。

立即跑一次验证：

```bash
sudo /usr/local/bin/strapi-backup.sh
ls -lh /var/backups/strapi/
```

### 异地副本

本机备份挡不住磁盘损坏、误删整机、勒索软件。至少每周同步一份到别处：

```bash
# 方式一：rsync 到另一台机器
rsync -az --delete /var/backups/strapi/ backup@other-host:/backups/lightinfra-cms/

# 方式二：对象存储（阿里云 OSS / 腾讯云 COS / S3）
# 用各家 CLI，例如 ossutil：
ossutil cp -r /var/backups/strapi/ oss://your-bucket/lightinfra-cms/ --update
```

对象存储建议开版本控制或 WORM（一次写入不可改），防止凭据泄露后备份被一并删除。

`/etc/strapi/.env` 单独手工备份到密码管理器或加密存储，不要放进上面的自动流程。

### 备份有效性验证

**没验证过的备份等于没有备份。** 每季度做一次恢复演练：

```bash
# 取最新备份解压到临时位置
LATEST=$(ls -t /var/backups/strapi/data-*.db.gz | head -1)
gunzip -c "$LATEST" > /tmp/verify.db

# 完整性检查，期望输出 ok
sqlite3 /tmp/verify.db "PRAGMA integrity_check;"

# 数据抽查
sqlite3 /tmp/verify.db "SELECT COUNT(*) FROM articles;"
sqlite3 /tmp/verify.db "SELECT id, title, published_at FROM articles ORDER BY id DESC LIMIT 5;"

rm /tmp/verify.db
```

## 四、恢复流程

### 数据库恢复

```bash
sudo systemctl stop strapi

# 先保住当前文件，恢复错了还能退回
sudo cp /var/lib/strapi/data.db /var/lib/strapi/data.db.before-restore

gunzip -c /var/backups/strapi/data-2026-08-18_0330.db.gz | \
  sudo tee /var/lib/strapi/data.db > /dev/null

sudo chown strapi:strapi /var/lib/strapi/data.db
sudo chmod 640 /var/lib/strapi/data.db
sudo sqlite3 /var/lib/strapi/data.db "PRAGMA integrity_check;"   # 期望 ok

sudo systemctl start strapi
sudo journalctl -u strapi -n 50 --no-pager
```

### 上传文件恢复

```bash
sudo systemctl stop strapi
sudo tar -xzf /var/backups/strapi/uploads-2026-08-18_0330.tar.gz \
  -C /srv/lightinfra/cms/shared/
sudo chown -R strapi:strapi /srv/lightinfra/cms/shared/uploads
sudo systemctl start strapi
```

数据库与上传文件要恢复**同一时间点**的两份，否则会出现文章引用了不存在的图片。

### 恢复后检查

```bash
curl -s https://cms.example.com/api/articles | head -c 300
```

再登录后台确认文章列表、媒体库缩略图正常显示。缩略图破图说明 uploads 与数据库时间点不一致。

## 五、发布流程

改了代码、内容类型或依赖后的上线步骤。常规发布走 Gitea Actions 网页触发，完整流程与设计见[部署与发布方案 §六](./release.md#六自动化发布基建)：仓库页 → Actions → `release-cms`（或 `release-web`）→ Run workflow。发布前自动备份数据库、构建在独立 release 目录完成（旧版本零停机继续服务）、健康检查失败自动回滚。

### 手动触发发布（应急/排障用）

服务器上已装好的 `lightinfra-release` 脚本本身不依赖 Gitea，出现 CI/runner 故障时可以手工调用。前提是制品已经在 `/srv/lightinfra/incoming/` 就位（例如手工 `scp` 上传的 tar.gz）：

```bash
sudo /usr/local/bin/lightinfra-release cms 20260818-142301-a3f0
```

参数含义、内部步骤（解包 → 备份 → 构建 → 切换 → 健康检查 → 失败自动回滚）见[部署与发布方案 §6.2](./release.md#62-服务器端发布脚本)。

发布前先备份，是因为内容类型的 schema 变更会自动改数据库结构，且不可逆——这也是脚本默认执行备份、不建议跳过的原因。

### 回滚

见[部署与发布方案 §八](./release.md#八回滚)。日常发布失败时脚本已自动回滚；需要手动回退到更早版本，或代码回滚无法覆盖数据库结构变更时，同一节有对应流程，数据库部分再配合本文档[恢复流程](#四恢复流程)。

### 只改了内容、没改代码

不需要发布。后台直接编辑即可，Strapi 写数据库，不涉及重启。

## 六、监控

### 轻量健康检查

不引入监控系统的前提下，用 timer 做基础存活检测：

```bash
sudo tee /usr/local/bin/strapi-healthcheck.sh > /dev/null <<'EOF'
#!/usr/bin/env bash
set -uo pipefail

if ! curl -sf -m 10 -o /dev/null http://127.0.0.1:1337/admin; then
  logger -t strapi-health "健康检查失败，尝试重启"
  systemctl restart strapi
  sleep 15
  if curl -sf -m 10 -o /dev/null http://127.0.0.1:1337/admin; then
    logger -t strapi-health "重启后恢复"
  else
    logger -t strapi-health "重启后仍不可用，需人工介入"
  fi
fi

DISK=$(df --output=pcent / | tail -1 | tr -dc '0-9')
[ "$DISK" -ge 85 ] && logger -t strapi-health "磁盘使用率 ${DISK}%"

CERT_DAYS=$(( ($(date -d "$(openssl x509 -enddate -noout \
  -in /etc/letsencrypt/live/cms.example.com/fullchain.pem | cut -d= -f2)" +%s) \
  - $(date +%s)) / 86400 ))
[ "$CERT_DAYS" -le 14 ] && logger -t strapi-health "证书 ${CERT_DAYS} 天后过期"
exit 0
EOF

sudo chmod 750 /usr/local/bin/strapi-healthcheck.sh
```

```bash
sudo tee /etc/systemd/system/strapi-healthcheck.service > /dev/null <<'EOF'
[Unit]
Description=Strapi health check

[Service]
Type=oneshot
ExecStart=/usr/local/bin/strapi-healthcheck.sh
EOF

sudo tee /etc/systemd/system/strapi-healthcheck.timer > /dev/null <<'EOF'
[Unit]
Description=Strapi health check every 5 minutes

[Timer]
OnBootSec=3min
OnUnitActiveSec=5min

[Install]
WantedBy=timers.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now strapi-healthcheck.timer
```

结果写 syslog，查看：

```bash
sudo journalctl -t strapi-health --since "7 days ago"
```

`systemd` 的 `Restart=always` 已经覆盖进程崩溃的情况。这个脚本补的是「进程活着但不响应请求」（事件循环卡死、依赖挂起）以及磁盘、证书两个到期类风险。

需要告警到手机时，把 `logger` 那几行换成 webhook 调用（飞书 / 钉钉 / Server 酱）。

### 人工巡检节奏

| 周期 | 事项 |
| --- | --- |
| 每周 | 看一眼 `journalctl -u strapi -p err --since "7 days ago"`；确认最新备份文件存在且大小正常 |
| 每月 | `sudo apt list --upgradable`；检查 `journalctl -t strapi-health`；看 fail2ban 封禁记录 `sudo fail2ban-client status sshd` |
| 每季度 | 备份恢复演练（见[备份有效性验证](#备份有效性验证)）；复查 admin 账号列表，清理离职人员；`sudo certbot certificates` 确认续期正常 |
| 每半年 | 评估 Strapi 小版本升级；复查 `/admin` IP 白名单是否仍匹配你的出口 IP |

## 七、安全维护

### 补丁

`unattended-upgrades` 自动处理系统安全补丁。需要重启的内核更新要人工介入：

```bash
ls /var/run/reboot-required 2>/dev/null && echo "需要重启"
sudo journalctl -u unattended-upgrades --since "30 days ago" | tail -30
```

### Strapi 版本升级

当前锁定 `5.52.0`。升级前必须备份，且先在本地验证：

```bash
# 本地
npm run upgrade:dry     # 预演，不改文件
npm run upgrade         # 实际升级
npm run build           # 确认构建通过
```

本地跑通、后台功能验证过，再走[发布流程](#五发布流程)。跨大版本升级（5.x → 6.x）要读官方迁移指南，不要直接跑脚本。

关注安全公告：<https://github.com/strapi/strapi/security/advisories>

### 凭据轮换

管理员口令建议每年换一次，或有人员变动时立即换。

`/etc/strapi/.env` 里的密钥轮换要区别对待：

| 键 | 可否轮换 | 影响 |
| --- | --- | --- |
| `APP_KEYS` | 可 | 所有会话失效，需重新登录 |
| `ADMIN_JWT_SECRET` | 可 | 后台会话失效 |
| `JWT_SECRET` | 可 | 前台用户 token 失效 |
| `API_TOKEN_SALT` | 可 | 已签发的 API token 全部失效，需重新生成并更新调用方 |
| `TRANSFER_TOKEN_SALT` | 可 | transfer token 失效 |
| `ENCRYPTION_KEY` | **不可** | 数据库中加密字段永久无法解密 |

`ENCRYPTION_KEY` 一旦确定就不要改。确有泄露需换时，必须先用旧密钥导出全部数据，换新密钥后重新导入。

### API token 管理

后台 `Settings → API Tokens` 里的 token 遵循：给最小权限（只读内容就选 Read-only）、设过期时间、一个用途一个 token、不用的立即撤销。

前端读文章不需要 token —— `src/index.ts:15` 的 bootstrap 已给 public 角色开了 `find` / `findOne`。前端代码里出现 API token 是配置错误，token 会暴露在浏览器里。

### 权限复查

`src/index.ts` 的 bootstrap 每次启动都会确保 public 角色有 article 的读权限。它只做增量添加、不删除权限，所以在后台手工授予的额外权限不会被它清掉。定期到 `Settings → Roles → Public` 确认权限范围没有被意外放大，尤其是 `create` / `update` / `delete` 必须为未勾选。

## 八、排障

### 服务起不来

```bash
sudo journalctl -u strapi -n 100 --no-pager
```

| 报错特征 | 原因 | 处理 |
| --- | --- | --- |
| `EACCES` / `EROFS` 写入失败 | systemd 沙箱缺少可写路径 | 把路径加进 unit 的 `ReadWritePaths`，`daemon-reload` 后重启 |
| `Missing apiToken.salt` 之类 | `.env` 未被读到 | 确认 `EnvironmentFile=/etc/strapi/.env` 存在、组权限含 strapi |
| `SQLITE_CANTOPEN` | 数据库路径不对或权限不足 | 检查 `DATABASE_FILENAME` 是绝对路径，且 `config/database.ts` 已改用 `path.resolve` |
| `Cannot find module ... better_sqlite3.node` | 原生模块缺失或平台不匹配 | `cd /srv/lightinfra/cms/current && sudo -u strapi npm rebuild better-sqlite3` |
| `EADDRINUSE` | 1337 被占用 | `sudo ss -tlnp \| grep 1337` 找到并处理 |
| 进程被 killed 无报错 | 构建/启动时 OOM | `dmesg \| grep -i oom`，加 swap |

### 502 Bad Gateway

```bash
sudo systemctl is-active strapi                    # 后端是否在跑
sudo ss -tlnp | grep 1337                          # 是否监听 127.0.0.1:1337
curl -I http://127.0.0.1:1337/admin                # 本机能否直连
sudo tail -30 /var/log/nginx/lightinfra-error.log
```

Nginx 配置正确但持续 502，且系统是 CentOS 系，检查 SELinux：

```bash
getenforce
sudo setsebool -P httpd_can_network_connect 1
```

### 后台登录后立刻掉线 / 反复跳登录页

典型的反代配置问题，按顺序查：

1. `/etc/strapi/.env` 的 `PUBLIC_URL` 是否等于实际访问地址（含 `https://`）
2. `config/server.ts` 是否有 `proxy: { koa: true }`
3. Nginx 是否传了 `X-Forwarded-Proto $scheme`
4. 是否走了 HTTPS —— session cookie 带 `secure` 标记时，HTTP 下浏览器不会回传

`config/plugins.ts:29` 设了 `sessions.httpOnly: true`，配合 HTTPS 才完整；HTTP 下登录态会不稳定。

### 前端拿不到数据

```bash
# 后端本身是否正常
curl -s https://cms.example.com/api/articles | head -c 300

# CORS 白名单是否含前端域名
sudo grep CORS_ORIGINS /etc/strapi/.env
```

| 现象 | 原因 |
| --- | --- |
| 浏览器控制台 CORS 错误 | 前端域名不在 `CORS_ORIGINS`，改后重启 Strapi |
| 403 Forbidden | public 角色权限被改动，到 `Settings → Roles → Public` 重新勾选 article 的 find/findOne |
| 404 | 路径写错，注意是 `/api/articles`（复数） |
| 200 但 `data` 为空数组 | 文章处于草稿态。`draftAndPublish` 已开启，未点发布的文章不会出现在公开 API |
| 图片 URL 是相对路径 | `PUBLIC_URL` 未设置 |
| 429 Too Many Requests | 触发 Nginx 限速，正常防护。前端有轮询逻辑的话调整频率，或放宽 `strapi_api` 的 rate |

### 上传文件失败

```bash
ls -ld /srv/lightinfra/cms/shared/uploads          # 期望 strapi:strapi
sudo grep client_max_body_size /etc/nginx/sites-available/lightinfra
df -h /
```

| 现象 | 原因 |
| --- | --- |
| 413 Request Entity Too Large | 超过 Nginx `client_max_body_size`，调大后 reload |
| permission denied | uploads 目录 owner 不对，或 unit 的 `ReadWritePaths` 未含该路径 |
| 提示文件类型不允许 | `config/plugins.ts` 的 `allowedTypes` 限制。当前允许图片、视频、音频、PDF、Office 文档、txt、csv，并显式拒绝可执行文件 |

那份可执行文件黑名单是有意加的，不要为了方便去掉。

### 磁盘满

```bash
df -h /
sudo du -sh /var/backups/strapi /srv/lightinfra/cms/shared/uploads \
            /var/log/nginx /var/log/journal /srv/lightinfra/cms/current/node_modules
```

按量级排查顺序：备份文件（缩短保留天数或推异地后删本地）、journal（设 `SystemMaxUse`）、Nginx 日志（logrotate 应已处理，检查配置是否生效）、uploads（清理媒体库中未被引用的文件）。

### 后台变慢

SQLite 长期使用后碎片化：

```bash
sudo systemctl stop strapi
sudo -u strapi sqlite3 /var/lib/strapi/data.db "VACUUM;"
sudo systemctl start strapi
```

若出现多人同时编辑时的 `SQLITE_BUSY` 错误，说明触到了 SQLite 单写入者的限制，该考虑迁 Postgres 了。

### 忘记管理员密码

```bash
cd /srv/lightinfra/cms/current
sudo -u strapi npx strapi admin:reset-user-password
```

**不带任何参数执行。** 命令会依次交互式询问邮箱、新密码（输入时不回显）、确认。

注意它的参数判断逻辑：只有在 `--email` 和 `--password` **都不提供**时才进入交互模式；只给 `--email` 会直接报 `Missing required options` 退出。所以不要图省事加参数 —— 那样必须把密码明文写在命令行里，会留在 shell 历史和进程列表中。

忘记管理员邮箱时先列出账号：

```bash
sudo -u strapi npx strapi admin:list-users
```

## 九、迁移到 Postgres 的时机

当前 SQLite 够用。出现下列任一情况就该迁：

- 多人同时编辑，日志出现 `SQLITE_BUSY`
- 需要外部工具直连数据库做报表或分析
- 计划跑多个 Strapi 实例（SQLite 不支持多进程写同一文件）
- 数据量增长到备份/恢复耗时不可接受

迁移路径：

```bash
# 1. 当前实例导出（含媒体文件）
cd /srv/lightinfra/cms/current
sudo -u strapi npx strapi export --no-encrypt --file /tmp/pre-pg

# 2. 装 Postgres，建库建用户
sudo apt install -y postgresql
sudo -u postgres psql -c "CREATE USER strapi WITH PASSWORD '<强口令>';"
sudo -u postgres psql -c "CREATE DATABASE strapi OWNER strapi;"

# 3. 改 /etc/strapi/.env
#    DATABASE_CLIENT=postgres
#    DATABASE_HOST=127.0.0.1
#    DATABASE_PORT=5432
#    DATABASE_NAME=strapi
#    DATABASE_USERNAME=strapi
#    DATABASE_PASSWORD=<强口令>
#    ENCRYPTION_KEY 保持不变

# 4. 装驱动、重启建表、导入
sudo -u strapi npm install pg
sudo systemctl restart strapi
sudo -u strapi npx strapi import --file /tmp/pre-pg.tar.gz
```

`config/database.ts` 已经写好了 postgres 分支，只改环境变量即可，不用改代码。

迁移前完整备份，并预留回滚窗口：`.env` 改回 `DATABASE_CLIENT=sqlite` 就能退回，旧的 `data.db` 不要立即删。

## 十、职责与约定

| 事项 | 频率 | 说明 |
| --- | --- | --- |
| 内容发布 | 按需 | 后台操作，无需运维介入 |
| 代码发布 | 按需 | 走 Gitea Actions（`release-cms`/`release-web`），发布前自动备份，见[部署与发布方案 §五](./release.md) |
| 数据备份 | 每日 03:30 | timer 自动，人工每周确认一次产物 |
| 异地同步 | 每周 | 见[异地副本](#异地副本) |
| 恢复演练 | 每季度 | 未验证的备份不算备份 |
| 系统补丁 | 自动 | 内核更新需人工安排重启窗口 |
| Strapi 升级 | 每半年评估 | 先本地 `upgrade:dry` 验证 |
| 证书续期 | 自动 | certbot timer，健康检查脚本兜底告警 |

两条硬性约定：

1. **任何改动数据库结构的操作前先备份。** 内容类型的 schema 变更会自动改表结构，且不可逆。
2. **`ENCRYPTION_KEY` 不可更改。** 见[凭据轮换](#凭据轮换)。

