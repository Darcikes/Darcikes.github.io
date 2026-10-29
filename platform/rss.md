# RSS 生态系统 — 开源 RSS 工具链

_从源转换到阅读的完整 RSS 工具链：RSSHub(45.6k⭐) + FreshRSS(15.7k⭐) + NetNewsWire(10.3k⭐) + Fluent Reader(9.6k⭐) · 最后验证：2026-08-04_

---

## 📋 这个生态是什么

一套开源工具组合，解决「想订阅的内容没有 RSS」和「有了 RSS 怎么优雅地读」两个问题：

- **RSSHub** — 把不提供 RSS 的平台（微博/B站/知乎/小红书/Twitter 等）的内容抓下来，转成标准 RSS 源
- **FreshRSS** — 自建聚合后端，统一管理订阅源，多设备同步已读/星标状态
- **NetNewsWire** — macOS/iOS 原生 RSS 客户端，极简干净
- **Fluent Reader** — Windows/macOS/Linux 跨平台桌面客户端

```text
不提供 RSS 的平台 → RSSHub（抓取+转换） → FreshRSS（聚合+同步） → NetNewsWire / Fluent Reader（阅读）
```

---

## 🎯 各组件速览

| 组件 | 定位 | Stars | 许可证 | 平台 |
| ---- | ---- | ----- | ------ | ---- |
| [RSSHub](https://github.com/DIYgod/RSSHub) | 万物转 RSS 的中间层 | 45,561 | AGPLv3 | 服务端（Node.js/Docker） |
| [FreshRSS](https://github.com/FreshRSS/FreshRSS) | 自建聚合+同步后端 | 15,687 | AGPLv3 | 服务端（PHP/Docker） |
| [NetNewsWire](https://github.com/Ranchero-Software/NetNewsWire) | Apple 原生 RSS 客户端 | 10,256 | MIT | macOS / iOS |
| [Fluent Reader](https://github.com/yang991178/fluent-reader) | 跨平台桌面客户端 | 9,568 | BSD-3 | Windows / macOS / Linux |

---

## 1. RSSHub — 万物转 RSS

### 是什么

Node.js 写的 RSS 生成器，为 300+ 个不提供 RSS 的平台生成标准订阅源。全球最大 RSS 网络，社区维护路由。

### 核心能力

| 能力 | 说明 |
| ---- | ---- |
| 平台覆盖 | 微博、B站、知乎、小红书、豆瓣、微信公众号、Twitter、YouTube 等 |
| 输出格式 | 标准 RSS 2.0 / Atom，任何 RSS 客户端都能认 |
| 公共实例 | `rsshub.app` 免部署直接用，重度用建议自建 |
| 路由扩展 | 社区贡献路由，覆盖 300+ 平台 |

### 部署

```bash
# 最简 Docker（单机直接用）
docker run -d --name rsshub -p 1200:1200 diygod/rsshub

# 需要抓动态页面（小红书等）用带 Chromium 的镜像
docker run -d --name rsshub -p 1200:1200 diygod/rsshub:chromium-bundled

# 官方推荐 docker-compose（含 Redis 缓存 + Browserless）
wget https://raw.githubusercontent.com/DIYgod/RSSHub/master/docker-compose.yml
docker-compose up -d
```

### 常用路由速查

| 平台 | 路由 | 完整 URL |
| ---- | ---- | -------- |
| B站全站榜 | `/bilibili/ranking/0` | `https://rsshub.app/bilibili/ranking/0` |
| 知乎热榜 | `/zhihu/pin/hotlist` | `https://rsshub.app/zhihu/pin/hotlist` |
| 微博热搜 | `/weibo/search/hot` | `https://rsshub.app/weibo/search/hot` |
| 小红书关键词 | `/xiaohongshu/keyword/咖啡` | `https://rsshub.app/xiaohongshu/keyword/咖啡` |
| 豆瓣新书 | `/douban/book/new_release` | `https://rsshub.app/douban/book/new_release` |

> 完整路由文档：<https://docs.rsshub.app/zh/>

---

## 2. FreshRSS — 自建聚合后端

### 是什么

PHP 写的自托管 RSS 聚合器，相当于自建的 Google Reader。支持多用户、标签分类、规则过滤、API 同步。

### 核心能力

| 能力 | 说明 |
| ---- | ---- |
| 自托管 | 数据完全自主，NAS/树莓派/VPS 都能跑 |
| 多用户 | 支持多账户，适合家庭/小团队共用 |
| Fever API | 兼容 Reeder、NetNewsWire、Fluent Reader 等客户端同步 |
| 扩展系统 | 插件丰富，可自定义抓取规则 |
| 低资源 | PHP + SQLite 即可，树莓派无压力 |

### 部署

```bash
# Docker（推荐）
docker run -d \
  --name freshrss \
  -p 8080:80 \
  -v freshrss_data:/var/www/FreshRSS/data \
  freshrss/freshrss
```

### 客户端接入

FreshRSS 启用 Fever API 后，NetNewsWire / Reeder / Fluent Reader 添加账户时选 Fever 或 Google Reader API，填入 FreshRSS 地址和 API 密码即可同步。

---

## 3. NetNewsWire — Apple 原生阅读器

### 是什么

Swift 写的 macOS/iOS 原生 RSS 客户端。零广告零追踪，极简干净，Apple 生态首选。

### 核心能力

| 能力 | 说明 |
| ---- | ---- |
| 原生渲染 | AppKit/UIKit，不吃 Electron，启动快 |
| 同步方式 | iCloud / Feedbin / Inoreader / FreshRSS（Fever API） |
| 离线阅读 | 自动缓存，无网也能看 |
| Apple 生态 | macOS + iOS，体验一致 |

### 安装

```bash
# Homebrew
brew install --cask netnewswire

# App Store（iOS）
# 搜索 "NetNewsWire"
```

### 订阅方式

- **直接订阅**：`File → New Feed` → 粘贴 RSSHub 路由 URL
- **FreshRSS 同步**：`Add Account → FreshRSS` → 填入服务器地址 + API 密码

---

## 4. Fluent Reader — 跨平台桌面客户端

### 是什么

Electron + React + Fluent UI 的跨平台 RSS 客户端。Windows 用户体验最好，也支持 macOS/Linux。

### 核心能力

| 能力 | 说明 |
| ---- | ---- |
| 跨平台 | Windows / macOS / Linux |
| 同步源 | Fever API / Google Reader API（可接 FreshRSS） |
| 阅读体验 | 暗色模式、键盘快捷键、离线阅读 |
| 本地模式 | 不接任何服务也能单机用 |

### 安装

```bash
# macOS Homebrew
brew install --cask fluent-reader

# 或从 GitHub Releases 下载
# https://github.com/yang991178/fluent-reader/releases
```

---

## 🔗 推荐组合

| 场景 | 组合 | 说明 |
| ---- | ---- | ---- |
| 最简 | RSSHub 公共实例 + NetNewsWire | 0 部署，5 分钟上手 |
| 自建全栈 | RSSHub + FreshRSS + NetNewsWire | 数据自主，多端同步 |
| Windows 用户 | RSSHub + FreshRSS + Fluent Reader | Windows 体验最佳 |
| 移动端 | RSSHub + FreshRSS + Reeder（iOS） | iOS 最优雅客户端 |

---

## 🔗 参考链接

- [RSSHub 官方仓库](https://github.com/DIYgod/RSSHub)
- [RSSHub 路由文档（中文）](https://docs.rsshub.app/zh/)
- [FreshRSS 官方仓库](https://github.com/FreshRSS/FreshRSS)
- [NetNewsWire 官方仓库](https://github.com/Ranchero-Software/NetNewsWire)
- [Fluent Reader 官方仓库](https://github.com/yang991178/fluent-reader)

---

_最后验证：2026-08-04 · Stars 与许可证以各仓库当前页面为准_
