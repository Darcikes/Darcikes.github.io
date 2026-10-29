# 知行录

_技术 · 实践 · 记录 · 在线地址 <https://darcikes.github.io/>_

---

## 📋 这是什么

一个用 Markdown 写成的个人知识库，通过 VitePress 构建为静态站点，托管在 GitHub Pages 上。

所有内容以 `.md` 文件形式存放在仓库里，改一个文件、推一次提交，站点就会自动更新。

---

## 🗂️ 目录结构

```text
.
├── index.md              首页（VitePress home 布局）
├── about.md              关于页
├── map.md                内容地图：全站文章按领域 + 专题索引
├── 404.md                未命中路径 → 回到首页
├── infra/                基础设施：虚拟机、远程访问、部署与托管
├── dev/                  本地开发：编辑器、版本控制、终端
├── ai/                   AI Agent：迁移、皮肤、排错与生态
├── automation/           自动化与编排：worktree、浏览器、代码索引
├── platform/             应用与平台：iOS、GitHub、RSS
├── writing/              写作与知识管理
├── series/               跨领域专题页
├── templates/
│   └── article.md        新文章模板（不进站点）
├── public/               静态资源（图片等），原样复制到产物根目录
└── .vitepress/
    ├── config.mts        唯一配置入口：标题、导航、侧边栏
    └── theme/index.ts    自定义主题：挂载 Mermaid 渲染器
```

**一级目录只按领域切**：六个领域固定（`infra` `dev` `ai` `automation` `platform` `writing`），不再按「推荐」「复盘」这类形态/体裁分目录。跨领域的一条线索写进 `series/`。

**命名规则**：目录与文件名都用**英文 kebab-case**（小写、连字符分隔）。路径直接就是 URL，**发布后不要移动或改名**；未命中路径统一重定向到首页，旧链接无法恢复。

---

## 🚀 本地预览

```bash
npm install          # 首次运行
npm run docs:dev     # 启动预览服务器 → http://localhost:5173/
```

其他命令：

| 命令 | 作用 |
| ------------------- | ------------------------------ |
| `npm run docs:dev` | 开发服务器，热更新 |
| `npm run docs:build` | 构建到 `.vitepress/dist/` |
| `npm run docs:preview` | 预览构建产物 → 端口 4173 |

---

## ✍️ 新增文章

1. **从模板开始**：`cp templates/article.md <领域>/my-article.md`（六个领域见上）
2. 文件名用**英文 kebab-case**（它就是 URL）
3. 文件**只需一个 H1 作为标题**，无需 frontmatter
4. 在该域 `index.md` 的文章表加一行，并在 `config.mts` 的 `sidebar` 登记，否则入口页与侧边栏都看不到
5. `git push` 后自动部署

模板里已经包含文档头、TL;DR、踩坑记录、Mermaid 图表的标准写法，照填即可。

> 💡 引用其他文章用**相对链接**（`[另一篇](./other.md)`）—— GitHub 网页和站点上都能正常跳转。

---

## 📦 部署

推送到 `main` 分支即自动触发 GitHub Actions 构建并发布到 GitHub Pages，无需手动操作。

完整流程、排错与多机同步方案见 **[用 GitHub Pages 搭建静态知识库](./infra/github-pages.md)**。

---

## 🔗 相关文档

- [用 GitHub Pages 搭建静态知识库](./infra/github-pages.md) —— 完整搭建流程与踩坑记录
- [AGENTS.md](AGENTS.md) —— 仓库结构、依赖与约定（面向 AI Agent）
- [VitePress 官方文档](https://vitepress.dev/) —— 配置项与主题定制
- [Mermaid 官方文档](https://mermaid.js.org/) —— 图表语法

---

_由 [VitePress](https://vitepress.dev/) 构建 · 托管于 GitHub Pages_
