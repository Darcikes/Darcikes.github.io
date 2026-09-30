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
      // { text: '心理', link: '/mind/', activeMatch: '/mind/' },  // ← 以后启用
      // { text: '中医', link: '/tcm/',  activeMatch: '/tcm/'  },  // ← 以后启用
      { text: '关于', link: '/about' },
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
