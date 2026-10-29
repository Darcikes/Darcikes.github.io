# baoyu-skills — 宝玉的 AI Agent 日常提效技能合集

_宝玉（JimLiu）开源的 21 个 Claude Code / Codex 等 agent 技能：内容创作发布、AI 图片生成、网页抓取与格式转换，24.7k ⭐ · 最后验证：2026-08-07_

---

## 📋 这个仓库是什么

[JimLiu/baoyu-skills](https://github.com/JimLiu/baoyu-skills) 是 AI 圈知名博主宝玉分享的 agent 技能集，用于提升日常工作效率。定位：

- **即装即用**——每个 `skills/baoyu-*` 目录是一个独立 skill，安装后可直接以 `/baoyu-xxx` 方式调用
- **面向创作者**——小红书图文、公众号发布、微博 / X 分发、文章配图、翻译是主打场景
- **多 agent 兼容**——Claude Code、Codex、Cursor 等均可用；支持 `npx skills` CLI、插件市场、ClawHub 三种安装渠道
- **开源协议**——MIT，仓库 2026-01 创建，24.7k ⭐

## 🎯 核心功能：21 个技能分三类

### 📝 内容创作与发布（10 个）

| 技能 | 作用 |
| ---- | ---- |
| `baoyu-xhs-images` | 小红书图文卡片：12 种风格 × 6 种版式，可调色板，支持非交互批量模式 |
| `baoyu-cover-image` | 文章封面图 |
| `baoyu-article-illustrator` | 文章配图 |
| `baoyu-infographic` | 信息图 |
| `baoyu-diagram` | 图表 / 流程图 |
| `baoyu-slide-deck` | 幻灯片 |
| `baoyu-comic` | 漫画 |
| `baoyu-post-to-wechat` | 公众号一键发布（Markdown → 微信 HTML 流程已内置） |
| `baoyu-post-to-weibo` | 微博发布 |
| `baoyu-post-to-x` | X / Twitter 发布 |

### 🎨 AI 生成（2 个）

| 技能 | 作用 |
| ---- | ---- |
| `baoyu-image-gen` | AI 图片生成：GPT Image 2、通义万相、即梦、豆包 Seedream、MiniMax、Replicate 等多家后端；文生图 / 参考图 / 批量 / 质量预设 |
| `baoyu-danger-gemini-web` | Gemini 网页能力（Gemini 专属危险模式） |

### 🧰 工具类（9 个）

| 技能 | 作用 |
| ---- | ---- |
| `baoyu-url-to-markdown` | Chrome CDP 抓任意 URL 转 markdown，存渲染 HTML 快照，Defuddle 失败自动降级 |
| `baoyu-danger-x-to-markdown` | X 帖子 / X Articles → markdown |
| `baoyu-youtube-transcript` | 油管字幕下载：多语言、翻译、章节、说话人识别，缓存原始数据 |
| `baoyu-wechat-summary` | 微信群聊总结：主题 / 引用 / 统计，毒舌版，支持 `@bot` 问答（wx-cli 驱动） |
| `baoyu-translate` | 三模式翻译：快速 / 分析后翻译 / 出版级精修（审查 + 打磨） |
| `baoyu-format-markdown` | 草稿 / 纯文本 → 结构化 Markdown（补 frontmatter、标题、摘要） |
| `baoyu-markdown-to-html` | Markdown → 微信兼容风格的排版 HTML |
| `baoyu-compress-image` | 图片压缩，保持质量减体积 |
| `baoyu-electron-extract` | 解任意 Electron 应用的 `app.asar`：内嵌 `.js.map` 可还原 TS/JSX 源码树，否则 Prettier 格式化；跳过 node_modules |

## ⚙️ 安装与使用

```bash
# 方式一：npx skills CLI（推荐，按需装）
npx skills add jimliu/baoyu-skills
npx skills add jimliu/baoyu-skills --list              # 先看清单
npx skills add jimliu/baoyu-skills --skill baoyu-translate --skill baoyu-slide-deck
```

```text
方式二：插件市场（交互式）
/plugin marketplace add JimLiu/baoyu-skills
/plugin install baoyu-skills@baoyu-skills

方式三：ClawHub 单个安装
clawhub install baoyu-image-gen
```

## ⚠️ 注意事项

- **别全装**——README 明确警告：20+ 技能全装会给 agent 每次运行背额外上下文开销。公众号工作流最小集 3 个：`cover-image` + `article-illustrator` + `post-to-wechat`（markdown-to-html 已被 post-to-wechat 内置，无需另装）
- **凭证位置**——公众号等 API 密钥放 `~/.baoyu-skills/.env`（用户级）或 `<project>/.baoyu-skills/.env`（项目级），**不要提交进 git**
- **关联项目**——[JimLiu/baoyu-design](https://github.com/JimLiu/baoyu-design) 是独立的 UI 设计 skill（本地跑 Claude Design 出 HTML 原型），不在本仓库内

## 🔗 参考链接

- [baoyu-skills 官方仓库](https://github.com/JimLiu/baoyu-skills)
- [JimLiu/baoyu-design（关联项目）](https://github.com/JimLiu/baoyu-design)
- wx-cli（`baoyu-wechat-summary` 的依赖）——原仓库 2026-07 因 DMCA 被 GitHub 屏蔽，链接已不可访问

---

_最后验证：2026-08-07 · 技能清单以仓库 `skills/` 目录为准_
