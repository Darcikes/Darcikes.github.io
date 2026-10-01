// ============================================================
//  自定义主题
//  在 VitePress 默认主题基础上：
//    · 挂载 Mermaid 图表渲染器
//    · 首页 hero 前插入像素尘埃动效（仅首页，见 PixelDust.vue）
// ============================================================

import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import { createMermaidRenderer } from 'vitepress-mermaid-renderer'
import 'vitepress-mermaid-renderer/css'
import PixelDust from './PixelDust.vue'

export default {
  extends: DefaultTheme,

  // home-hero-before 插槽只在首页存在，其它页面不会渲染
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => h(PixelDust),
    })
  },

  enhanceApp() {
    // 只在浏览器端初始化（SSR 阶段没有 DOM）
    // 渲染器内部会监听 DOM 变化与路由切换，因此只需初始化一次
    if (typeof window !== 'undefined') {
      createMermaidRenderer()
    }
  },
} satisfies Theme
