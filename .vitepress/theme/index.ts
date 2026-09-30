// ============================================================
//  自定义主题
//  在 VitePress 默认主题基础上，挂载 Mermaid 图表渲染器
// ============================================================

import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { createMermaidRenderer } from 'vitepress-mermaid-renderer'
import 'vitepress-mermaid-renderer/css'

export default {
  extends: DefaultTheme,

  enhanceApp() {
    // 只在浏览器端初始化（SSR 阶段没有 DOM）
    // 渲染器内部会监听 DOM 变化与路由切换，因此只需初始化一次
    if (typeof window !== 'undefined') {
      createMermaidRenderer()
    }
  },
} satisfies Theme
