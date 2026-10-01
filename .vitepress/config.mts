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
  ],

  // ----------------------------------------------------------
  //  自动生成 sitemap.xml（供搜索引擎收录）
  //  hostname 必须与最终访问地址一致，否则 sitemap 里的链接是错的
  // ----------------------------------------------------------
  sitemap: {
    hostname: 'https://darcikes.github.io',
  },

  // ----------------------------------------------------------
  //  排除仓库级文件，不渲染成站点页面
  //  （它们面向 GitHub 仓库和 AI Agent，不是站点内容）
  // ----------------------------------------------------------
  srcExclude: ['README.md', 'AGENTS.md', 'CLAUDE.md', 'templates/**'],

  // 暂时忽略指向未迁移文档的链接，避免构建中断
  ignoreDeadLinks: true,

  themeConfig: {
    // --------------------------------------------------------
    //  顶部导航
    //  新增分类：加一行 + 在下面 sidebar 里加一段
    // --------------------------------------------------------
    nav: [
      { text: '技术', link: '/tech/virtualization/ubuntu-kvm', activeMatch: '/tech/' },
      { text: '精选', link: '/picks/', activeMatch: '/picks/' },
      { text: '初识', link: '/first-look/', activeMatch: '/first-look/' },
      // { text: '心理', link: '/mind/', activeMatch: '/mind/' },  // ← 以后启用
      // { text: '中医', link: '/tcm/',  activeMatch: '/tcm/'  },  // ← 以后启用
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
      '/tech/': [
        {
          text: '虚拟化',
          items: [
            { text: 'Ubuntu 上安装虚拟机（KVM/QEMU）', link: '/tech/virtualization/ubuntu-kvm' },
            { text: 'Omarchy 虚拟机安装记录', link: '/tech/virtualization/omarchy-vm' },
          ],
        },
        {
          text: '部署与托管',
          items: [
            { text: '用 GitHub Pages 搭建静态知识库', link: '/tech/deploy/github-pages' },
            { text: 'Ubuntu 24.04 远程访问配置（Mac 客户端）', link: '/tech/deploy/ubuntu-remote-access' },
            { text: 'MCP Gateway 部署指南', link: '/tech/deploy/mcp-gateway' },
          ],
        },
        {
          text: '工具与选型',
          items: [
            { text: 'macOS Git 可视化工具调研', link: '/tech/tools/macos-git-gui-clients' },
            { text: 'Orca 运行机制与基础使用技巧', link: '/tech/tools/orca-worktree-mechanics' },
            { text: 'opencli 与 Orca：浏览器自动化链路选型', link: '/tech/tools/opencli-vs-orca-browser-automation' },
            { text: 'Vim 操作手册', link: '/tech/tools/vim' },
            { text: 'lazygit 操作手册', link: '/tech/tools/lazygit' },
          ],
        },
        {
          text: 'iOS 与 App Store',
          items: [
            { text: 'Apple IAP 沙盒支付错误排查', link: '/tech/ios/apple-iap-sandbox-error-fix' },
          ],
        },
      ],
      '/picks/': [
        {
          text: '精选集',
          items: [
            { text: '收录清单', link: '/picks/' },
          ],
        },
        {
          text: 'AI 智能体',
          items: [
            { text: 'Agency Agents（英文上游）', link: '/picks/agency-agents' },
            { text: 'Agency Agents 中文版', link: '/picks/agency-agents-zh' },
            { text: 'baoyu-skills 提效技能集', link: '/picks/baoyu-skills' },
          ],
        },
        {
          text: '开发工具',
          items: [
            { text: 'Ghostty 终端', link: '/picks/ghostty' },
            { text: 'Codex++ 桌面增强', link: '/picks/codex-plus-plus' },
            { text: 'codebase-memory-mcp 代码知识图谱', link: '/picks/codebase-memory-mcp' },
            { text: 'Claude CLI 状态栏与用量统计', link: '/picks/claude-cli-statusline' },
          ],
        },
        {
          text: '阅读与搜索',
          items: [
            { text: 'RSS 工具链', link: '/picks/rss-ecosystem' },
            { text: 'GitHub 搜索', link: '/picks/github-search' },
          ],
        },
        {
          text: '写作规范',
          items: [
            { text: 'Markdown + Mermaid 写作标准', link: '/picks/markdown-mermaid-writing' },
          ],
        },
      ],
      '/first-look/': [
        {
          text: '初识',
          items: [
            { text: '用 Agent 操作浏览器（CDP）', link: '/first-look/agent-browser-cdp' },
            { text: 'GitHub Bug 修复全流程', link: '/first-look/github-bug-fix-workflow' },
          ],
        },
      ],
      // '/mind/': [ ... ],   // ← 以后启用
      // '/tcm/':  [ ... ],   // ← 以后启用
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
