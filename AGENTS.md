# AGENTS.md

_面向 AI Agent 的仓库交接文档 · 最后更新 2026-09-30_

---

## 📋 仓库定位

个人知识库站点。Markdown 源文件存放在本仓库，经 VitePress 构建为静态站点，由 GitHub Actions 自动发布到 GitHub Pages。

- **在线地址**：<https://darcikes.github.io/>
- **部署方式**：推送到 `main` 分支 → Actions 自动构建 → 发布到 Pages
- **读者**：公开可访问的只读站点，无评论、无交互、无需登录

> ⚠️ **本仓库是公开的。** 任何提交都会进入永久公开的 commit 历史，事后再删除也无法从历史中抹除。写入前务必检查是否含敏感信息。

---

## 🧱 技术栈与依赖

| 依赖 | 版本 | 用途 |
| ------------------------------- | ------- | -------------------------------------- |
| Node.js | ≥ 20 | 构建与本地预览（构建在 CI 侧执行） |
| `vitepress` | ^1.6.4 | 静态站点生成器 |
| `mermaid` | ^12.0.0 | 图表渲染引擎 |
| `vitepress-mermaid-renderer` | ^1.2.2 | 把 `mermaid` 代码块转成交互式图表 |
| `@mermaid-js/mermaid-zenuml` | ^1.0.1 | ZenUML 语法支持（插件 peer 依赖） |

全部为 `devDependencies` —— 站点是纯静态产物，运行时不需要任何依赖。

**添加新依赖前请慎重**：每多一个包就多一处供应链风险和维护成本。优先用 VitePress 原生能力。

---

## 🗂️ 目录结构与职责

```text
.
├── index.md                    首页（layout: home，hero + features）
├── about.md                    关于页
├── README.md                   仓库说明（不进站点）
├── AGENTS.md                   本文件（不进站点）
├── CLAUDE.md                   指向本文件（不进站点）
├── templates/                  新文章模板（不进站点）
│   └── article.md
├── tech/                       【分类】技术
│   ├── deploy/                 【子分类】部署与托管
│   │   └── github-pages.md
│   └── virtualization/         【子分类】虚拟化
│       ├── ubuntu-kvm.md
│       └── omarchy-vm.md
├── public/                     静态资源，原样复制到产物根目录
└── .vitepress/
    ├── config.mts              ★ 唯一配置入口
    └── theme/index.ts          自定义主题：挂载 Mermaid 渲染器
```

### `.vitepress/config.mts` 是核心

改标题、加导航、加分类，全在这一个文件。关键字段：

| 字段 | 作用 |
| --------------- | ------------------------------------------------------------ |
| `title` | 站点标题，显示在浏览器标签与页面右上 |
| `nav` | 顶部导航。新增分类时加一行 |
| `sidebar` | 侧边栏，按 `/分类/` 键分组。**新增文章必须在此登记，否则侧边栏里看不到** |
| `srcExclude` | 排除不进站点的文件（README / AGENTS / CLAUDE / templates） |
| `search` | 本地全文搜索，自带无需第三方服务 |

---

## ⚙️ 常用命令

```bash
npm install              # 安装依赖
npm run docs:dev         # 开发服务器 → http://localhost:5173/
npm run docs:build       # 构建 → .vitepress/dist/
npm run docs:preview     # 预览构建产物 → http://localhost:4173/
```

**验证构建产物**（比"构建成功"更可靠）：

```bash
# 检查是否有中文路径残留（应为空）
grep -oE 'href="[^"]*"' .vitepress/dist/**/*.html | grep -P '[\x{4e00}-\x{9fff}]'

# 用无头浏览器验证 Mermaid 真的渲染了（构建产物里看不到，因为是客户端渲染）
google-chrome --headless --disable-gpu --no-sandbox \
  --window-size=1440,3000 --virtual-time-budget=45000 \
  --dump-dom "http://localhost:4173/技术/页面路径.html" | grep -c '<svg'
```

> 💡 **验证图表渲染时注意 `IntersectionObserver`。** 渲染器只处理**进入视口**的图表（滚动到哪渲染到哪），所以：
>
> - 必须指定 `--window-size`，否则默认视口太小会误判为"渲染失败"
> - **长文档中靠后的图表无法用这种方式验证** —— 加大视口高度也没用（Chrome 有上限），且 URL 锚点不会触发滚动
> - 正确做法：**建一个临时页面，把所有待验证的图表放在顶部**，验证完删除。示例：
>
> ```bash
> # 1) 提取所有图表到临时页面 tech/_verify.md（放在最前）
> # 2) 用开发服务器验证
> google-chrome --headless --disable-gpu --no-sandbox --window-size=1440,4000 \
>   --virtual-time-budget=60000 --dump-dom "http://localhost:5173/tech/_verify.html" \
>   | grep -c 'class="mermaid-wrapper"'      # 应等于图表总数
> # 3) rm tech/_verify.md
> ```
>
> ⚠️ 判定时**不要**用 `grep 'error'` —— 注入的 CSS 里有大量 `--mermaid-error-bg`、`.error-message` 之类的**样式规则文本**，会造成假阳性。用 `class="mermaid-wrapper"` 计数更可靠。

---

## ✍️ 内容约定

### 命名标准

| 对象 | 规则 | 示例 |
| ---------- | -------------------------------------- | ---------------------------------- |
| **目录** | 英文、小写、kebab-case | `tech/virtualization/` |
| **文章文件** | 英文、小写、kebab-case | `ubuntu-kvm.md` |
| **静态资源** | 英文、小写、下划线分隔 | `public/kvm_arch.png` |

**文件名就是 URL**（VitePress 直接映射，无中间层）。所以文件名一旦发布就**不要改** —— 改了等于旧链接全部失效。

> 为什么不建议中文文件名：中文名做 URL 需要额外的 `rewrites` 映射，而该机制**不作用于文内相对链接**，会引入一整类 404 问题。英文文件名让「文件名 = URL」，消除这层间接。

### 写作规范

- **一个文件一个 H1**，作为页面标题。VitePress 自动提取
- **无需 frontmatter**，`title` 自动取第一个 H1
- **不要写手写目录**（`## 目录`）—— VitePress 自动生成右侧大纲，手写的那份是重复的，且锚点规则不兼容（见下方陷阱）
- **引用其他文章用相对 `.md` 链接**（`[另一篇](./other.md)`）—— GitHub 和站点两边都能跳
- 界面文字已中文化，深色模式自动适配

### 新增文章的标准流程

1. **复制模板**：`cp templates/article.md tech/分类/my-article.md`
2. 替换模板中的 `<尖括号>` 占位内容，定稿后删掉顶部注释块
3. **在 `config.mts` 的 `sidebar` 登记**该文章，否则侧边栏找不到入口：
   ```ts
   { text: '文章标题', link: '/tech/分类/my-article' }
   ```
4. 本地 `npm run docs:dev` 确认排版，`npm run docs:build` 确认无误后推送

模板 `templates/article.md` 里已包含文档头、TL;DR、踩坑记录、Mermaid 图表等的标准写法。

### 新增分类

目录即分类。两步：

1. 建目录：`mkdir -p tech/新分类`
2. 在 `config.mts` 的 `nav` 加一行、`sidebar` 加一段（文件里已留注释位置）

一级分类保持在 3–5 个且足够宽泛，细节下沉到二级子目录 —— 这样内容增长时不必重排结构。

### 图表

用 ```` ```mermaid ```` 代码块。渲染器会自动识别并生成带工具栏（缩放 / 拖动 / 下载 / 全屏 / 复制源码）的交互式图表。

```mermaid
flowchart LR
    accTitle: Example Diagram
    accDescr: A minimal example showing how mermaid blocks render in this repository

    source[📝 Markdown 代码块] --> render[⚙️ 渲染器处理] --> output[✅ 交互式图表]
```

**约定**：每张图都写 `accTitle` + `accDescr`（无障碍与屏幕阅读器需要），节点 ID 用 `snake_case`，不要用内联 `style`（会破坏深色模式），配色用 `classDef`。

---

## ⚠️ 已知陷阱

这些都是实际踩过并解决的，改动内容时容易再次触发。

### 1. 新增的仓库级文件会被当成文章渲染

VitePress 把源目录下**所有 `.md` 都当成页面**。所以新增 `CONTRIBUTING.md`、`CHANGELOG.md`、`.github/` 文档这类**面向仓库而非站点**的文件时，必须同步加进 `config.mts` 的 `srcExclude`：

```ts
srcExclude: ['README.md', 'AGENTS.md', 'CLAUDE.md', 'templates/**', 'CONTRIBUTING.md'],
```

否则站点上会凭空多出一个页面 —— 而且它往往还是空的或不完整的。

### 2. 手写锚点与 VitePress 生成规则不兼容

Markdown 里手写的 GitHub 风格锚点（`#坑-1virt-manager-不认识-omarchy`）在 VitePress 上跳不过去。典型差异：

| 手写（GitHub 规则） | VitePress 实际生成 |
| ---------------------------------- | -------------------------------------- |
| `#0-快速开始tldr` | `#_0-快速开始-tl-dr` |
| `#坑-1virt-manager-不认识-omarchy` | `#坑-1-virt-manager-不认识-omarchy` |

主要差别：**以数字开头的标题会加 `_` 前缀**，空格转连字符的时机也不同。

**需要内页锚点时**，先构建再查真实值：

```bash
grep -oE 'id="[^"]+"' .vitepress/dist/路径/页面.html | sed 's/id="//;s/"$//' | sort -u
```

### 3. VitePress 的 `code` 标签不带语言 class

VitePress 输出的代码块是 `<div class="language-mermaid"><pre class="shiki"><code>`，内层 `code` **没有任何 class**。Mermaid 渲染器靠外层 `div.language-mermaid` 的兜底路径识别，这是正常工作的。不要"顺手修复"这个结构。

### 4. `esbuild` 的 postinstall 可能被 npm 安全策略拦截

出现 `install scripts blocked` 警告时**先验证是否真的有问题**：

```bash
./node_modules/.bin/esbuild --version
```

能正常输出版本号就说明 npm 已直接安装平台包（`@esbuild/linux-x64`），**无需放行脚本** —— 强行放行反而降低安全性。

### 5. 不要用同步盘同步本仓库目录

Syncthing / iCloud / OneDrive / 坚果云等工具会把 `.git/refs`、`.git/index`、`HEAD` 当普通文件双向同步，导致**假提交记录、丢提交、索引损坏**。跨设备同步请用 `git pull --rebase` + `git push`。

`.gitattributes` 里的 `*.md merge=union` 是为了让多设备并发编辑不同段落时不产生冲突。

---

## 📚 文档索引

| 需要查什么 | 去哪里 |
| -------------------- | --------------------------------------------------------------------------------- |
| **本仓库搭建全流程** | [`tech/deploy/github-pages.md`](tech/deploy/github-pages.md) —— 含排错与多机同步 |
| VitePress 配置项 | <https://vitepress.dev/reference/site-config> |
| VitePress 默认主题 | <https://vitepress.dev/reference/default-theme-config> |
| Markdown 扩展语法 | <https://vitepress.dev/guide/markdown> |
| Mermaid 图表语法 | <https://mermaid.js.org/intro/syntax-reference.html> |
| Mermaid 渲染器插件 | <https://vitepress-mermaid-renderer.vercel.app/> |
| GitHub Pages 限制 | <https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits> |

---

## 🚫 禁止事项

| 禁止 | 原因 |
| -------------------------- | -------------------------------------------------------- |
| 提交 `node_modules/`、`.vitepress/dist/` | 已在 `.gitignore` 中排除，体积巨大且可重建 |
| 写入密钥、token、密码 | 仓库公开，且 commit 历史无法清理 |
| 写入主机名、内网 IP、连接手册 | 等于公开基础设施地图，属侦察材料 |
| 删除 `.gitattributes` 的合并规则 | 多机同步会开始产生冲突 |
| 直接改动 `~/code/config/` 等原稿目录 | 本站内容是副本；原稿归原处，避免双向不同步 |
