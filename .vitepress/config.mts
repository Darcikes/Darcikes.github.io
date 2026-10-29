import { defineConfig } from 'vitepress'

// ============================================================
//  站点配置
//  改标题、改导航、加分类，都在这个文件里
// ============================================================

export default defineConfig({
  lang: 'zh-CN',

  // ↓↓↓ 站点标题
  title: '知行录',
  description: '技术 · 实践 · 记录',

  // ----------------------------------------------------------
  //  注入到每个页面 <head> 的标签
  //  图标文件放在 public/ 下，会原样复制到产物根目录
  // ----------------------------------------------------------
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    // 社交分享卡片（标题 / 描述 / 网址按页注入，见下方 transformHead）
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '知行录' }],
    ['meta', { property: 'og:image', content: 'https://darcikes.github.io/og-cover.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://darcikes.github.io/og-cover.png' }],
  ],

  // 每页注入 og:title / og:description / og:url；缺省回落到站点级
  transformHead({ page, title, description, siteData }) {
    const origin = 'https://darcikes.github.io'
    const clean = page.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const url = clean ? `${origin}/${clean}` : `${origin}/`
    const fallbackTitle = siteData.title
    const fallbackDesc = siteData.description || ''
    return [
      ['meta', { property: 'og:title', content: title || fallbackTitle }],
      ['meta', { property: 'og:description', content: description || fallbackDesc }],
      ['meta', { property: 'og:url', content: url }],
    ]
  },

  // ----------------------------------------------------------
  //  自动生成 sitemap.xml（供搜索引擎收录）
  //  hostname 必须与最终访问地址一致，否则 sitemap 里的链接是错的
  // ----------------------------------------------------------
  sitemap: {
    hostname: 'https://darcikes.github.io',
    // 404 只是重定向页，不进 sitemap
    transformItems: (items) => items.filter((item) => !item.url.startsWith('404')),
  },

  // ----------------------------------------------------------
  //  排除仓库级文件，不渲染成站点页面
  //  （它们面向 GitHub 仓库和 AI Agent，不是站点内容）
  // ----------------------------------------------------------
  srcExclude: ['README.md', 'AGENTS.md', 'CLAUDE.md', 'templates/**'],

  // 页面底部显示「最后更新」，取自 git 提交时间（CI 需 fetch-depth: 0）
  lastUpdated: true,

  // 迁移完成后开启死链检查：站内相对链接必须有效
  ignoreDeadLinks: false,

  themeConfig: {
    // --------------------------------------------------------
    //  顶部导航
    //  新增分类：加一行 + 在下面 sidebar 里加一段
    // --------------------------------------------------------
    nav: [
      { text: '内容地图', link: '/map' },
      { text: 'AI', link: '/ai/', activeMatch: '/ai/' },
      { text: '基础设施', link: '/infra/', activeMatch: '/infra/' },
      { text: '自动化', link: '/automation/', activeMatch: '/automation/' },
      {
        text: '更多',
        items: [
          { text: '本地开发', link: '/dev/' },
          { text: '应用与平台', link: '/platform/' },
          { text: '写作', link: '/writing/' },
          { text: '专题', link: '/series/hermes' },
        ],
      },
      { text: '关于', link: '/about' },
    ],

    // --------------------------------------------------------
    //  右上角社交图标（点击跳到对应地址）
    //  可用图标名见 VitePress 文档；这里只放了 GitHub 仓库
    // --------------------------------------------------------
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Darcikes/Darcikes.github.io' },
    ],

    // --------------------------------------------------------
    //  侧边栏（按分类目录分组）
    //  新增分类：在这里加一个 '/新分类/' 段落
    // --------------------------------------------------------
    sidebar: {
      '/map': [
        {
          text: '内容地图',
          items: [{ text: '全站索引', link: '/map' }],
        },
      ],
      '/infra/': [
        {
          text: '基础设施',
          items: [
            { text: '概览', link: '/infra/' },
            { text: 'Ubuntu 上安装虚拟机（KVM/QEMU）', link: '/infra/ubuntu-kvm' },
            { text: 'Omarchy 虚拟机安装记录', link: '/infra/omarchy-vm' },
            { text: 'Ubuntu 24.04 远程访问配置', link: '/infra/ubuntu-remote-access' },
            { text: '用 GitHub Pages 搭建静态知识库', link: '/infra/github-pages' },
            { text: 'MCP Gateway 部署指南', link: '/infra/mcp-gateway' },
          ],
        },
        {
          text: '相关专题',
          items: [{ text: 'KVM 实验室', link: '/series/kvm-lab' }],
        },
      ],
      '/dev/': [
        {
          text: '本地开发',
          items: [
            { text: '概览', link: '/dev/' },
            { text: 'Vim 操作手册', link: '/dev/vim' },
            { text: 'lazygit 操作手册', link: '/dev/lazygit' },
            { text: 'macOS Git 可视化工具调研', link: '/dev/macos-git-gui-clients' },
            { text: 'Ghostty 终端', link: '/dev/ghostty' },
          ],
        },
      ],
      '/ai/': [
        {
          text: 'AI Agent',
          items: [
            { text: '概览', link: '/ai/' },
            { text: '从 Claude Code 迁移到 Hermes Agent', link: '/ai/claude-to-hermes-migration' },
            { text: 'Hermes Agent 皮肤（skin）配置详解', link: '/ai/hermes-skin-theme' },
            { text: 'Claude Code 后台会话与密钥串号', link: '/ai/claude-code-daemon-auth' },
            { text: 'Claude CLI 状态栏与用量统计', link: '/ai/claude-cli-statusline' },
            { text: 'Codex++ 桌面增强', link: '/ai/codex-plus-plus' },
            { text: 'Agency Agents（英文上游）', link: '/ai/agency-agents' },
            { text: 'Agency Agents 中文版', link: '/ai/agency-agents-zh' },
            { text: 'baoyu-skills 提效技能集', link: '/ai/baoyu-skills' },
          ],
        },
        {
          text: '相关专题',
          items: [{ text: 'Hermes 上手', link: '/series/hermes' }],
        },
      ],
      '/automation/': [
        {
          text: '自动化与编排',
          items: [
            { text: '概览', link: '/automation/' },
            { text: 'Orca 运行机制与基础使用技巧', link: '/automation/orca-worktree-mechanics' },
            { text: 'opencli 与 Orca：三条链路怎么选', link: '/automation/opencli-vs-orca' },
            { text: '用 Agent 操作浏览器（CDP）', link: '/automation/agent-browser-cdp' },
            { text: 'codebase-memory-mcp 代码知识图谱', link: '/automation/codebase-memory-mcp' },
            { text: 'GitHub Bug 修复全流程', link: '/automation/github-bug-fix-workflow' },
          ],
        },
        {
          text: '相关专题',
          items: [{ text: '浏览器自动化', link: '/series/browser-automation' }],
        },
      ],
      '/platform/': [
        {
          text: '应用与平台',
          items: [
            { text: '概览', link: '/platform/' },
            { text: 'Apple IAP 沙盒支付错误排查', link: '/platform/apple-iap' },
            { text: 'GitHub 搜索', link: '/platform/github-search' },
            { text: 'RSS 工具链', link: '/platform/rss' },
          ],
        },
      ],
      '/writing/': [
        {
          text: '写作与知识管理',
          items: [
            { text: '概览', link: '/writing/' },
            { text: 'Markdown + Mermaid 写作标准', link: '/writing/markdown-mermaid-writing' },
          ],
        },
      ],
      '/series/': [
        {
          text: '专题',
          items: [
            { text: 'Hermes 上手', link: '/series/hermes' },
            { text: 'KVM 实验室', link: '/series/kvm-lab' },
            { text: '浏览器自动化', link: '/series/browser-automation' },
          ],
        },
      ],
    },

    // 本地全文搜索（VitePress 自带，不依赖第三方服务）
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    // --------------------------------------------------------
    //  界面文字中文化
    // --------------------------------------------------------
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    notFound: {
      title: '页面不存在',
      quote: '这里还没有内容。',
      linkText: '回到首页',
    },
  },
})
