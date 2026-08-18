# lightinfra-ow

公司官网前端与内容管理后端的单一仓库（monorepo）。两个应用各自独立依赖，**不使用 npm workspaces**。

## 结构

```
apps/web/     Vue 3 + Vite 前端官网
apps/cms/     Strapi 5 内容管理后端
docs/         部署与运维文档
```

## 为什么不用 workspaces

Strapi 官方不支持 workspaces（[strapi#9079](https://github.com/strapi/strapi/issues/9079)），且依赖提升会破坏原生模块 —— 本项目的 `better-sqlite3` 正是原生模块。两个应用之间没有共享运行时依赖（仅 `typescript` 与 `@types/node` 重叠，且版本不同），提升带不来收益。

因此：**每个应用目录内单独 `npm install`，各自有 `node_modules` 和 lockfile，不提升依赖。** 仓库根的 `package.json` 只是启动便利脚本（`concurrently` 转发），不是 workspaces 根。

## 本地开发

```bash
# 根目录只需装一次 concurrently
npm install

# 一条命令同时启动前端（5173）+ 后端（1337）
npm run dev
```

也可以分别启动：

```bash
cd apps/web && npm install && npm run dev

cd apps/cms && npm install && npm run develop
```

两个都要跑起来才能看到文章内容：前端 `vite.config.ts` 把 `/api` 与 `/uploads` 代理到 `localhost:1337`。

后端首次启动前需要 `.env`：

```bash
cd apps/cms && cp .env.example .env
```

然后按 `docs/release.md` 的说明生成密钥填入。

## 文档

| 文档 | 内容 |
| --- | --- |
| [docs/release.md](docs/release.md) | 部署与发布（首次手工部署 + Gitea Actions 自动化发布） |
| [docs/operations.md](docs/operations.md) | 备份、监控、故障排查 |

## 版本号

两个应用独立发版，tag 带命名空间前缀：

```
web/v1.2.0
cms/v1.0.0
```

这偏离了团队规范 §9.1 的 `v1.4.0` 格式，是 monorepo 的必要调整。CHANGELOG 按应用分节维护。
