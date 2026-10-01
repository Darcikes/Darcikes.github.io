// ============================================================
//  自定义主题
//  在 VitePress 默认主题基础上：
//    · 挂载 Mermaid 图表渲染器（含浅色/深色主题适配）
//    · 首页 hero 前插入像素尘埃动效（仅首页，见 PixelDust.vue）
// ============================================================

import { h, watch } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { createMermaidRenderer } from 'vitepress-mermaid-renderer'
import 'vitepress-mermaid-renderer/css'
import PixelDust from './PixelDust.vue'
import './custom.css'

// ------------------------------------------------------------
//  Mermaid 主题配置
//
//  背景：插件 vitepress-mermaid-renderer 初始化时会硬塞 theme:"default"，
//  把 Mermaid 12 的新外观整个盖掉，而且默认字体 "trebuchet ms" 不含中文字形。
//  这里通过传入 MermaidConfig 覆盖，并让深浅色各用一套色板。
// ------------------------------------------------------------

// 与站点正文一致的中文字体栈（抄自 VitePress 的 :lang(zh)）
const FONT =
  '"Punctuation SC", Inter, ui-sans-serif, system-ui, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif'

// 两套色板共用的设计变量。
// ⚠️ 深浅两套必须保持完全相同的 key 集合 —— 切换时是深合并，缺 key 会残留旧值
const shared = {
  fontFamily: FONT,
  fontSize: '15px',
  useGradient: false, // 默认 true，渐变是"廉价感"主因之一
  dropShadow: 'none', // 默认有层灰投影 drop-shadow(1px 2px 2px rgba(185,185,185,1))
  radius: 6, // 节点圆角（另由 custom.css 用 CSS rx 补上实际渲染）
  strokeWidth: 1.2, // 线宽，默认 1
}

const flowchart = {
  nodeSpacing: 55, // 横向间距（默认偏紧）
  rankSpacing: 65, // 纵向间距
  padding: 15, // 节点内边距（Mermaid 默认值，不再覆盖）
  curve: 'basis', // 连线形态
  wrappingWidth: 190, // 标签换行宽度，默认 120 —— 中文比英文宽，需调大
}

// 浅色（对齐 VitePress 浅色调色板）
const lightConfig = {
  theme: 'base',
  themeVariables: {
    ...shared,
    darkMode: false,
    background: '#ffffff',
    primaryColor: '#f2f4f7',
    primaryTextColor: '#2c2f36',
    primaryBorderColor: '#d8dde4',
    mainBkg: '#f2f4f7',
    nodeBorder: '#d8dde4',
    nodeTextColor: '#2c2f36',
    lineColor: '#8a9099',
    textColor: '#3c3c43',
    titleColor: '#2c2f36',
    edgeLabelBackground: '#ffffff',
    clusterBkg: '#f8f9fb',
    clusterBorder: '#e2e2e3',
    secondaryColor: '#e9edf3',
    tertiaryColor: '#f6f7f9',
  },
  flowchart,
}

// 深色（对齐 VitePress 深色调色板，key 集合与浅色完全一致）
const darkConfig = {
  theme: 'base',
  themeVariables: {
    ...shared,
    darkMode: true,
    background: '#1b1b1f',
    primaryColor: '#242429',
    primaryTextColor: '#dfdfd6',
    primaryBorderColor: '#3c3f44',
    mainBkg: '#242429',
    nodeBorder: '#3c3f44',
    nodeTextColor: '#dfdfd6',
    lineColor: '#6b7280',
    textColor: '#dfdfd6',
    titleColor: '#dfdfd6',
    edgeLabelBackground: '#1b1b1f',
    clusterBkg: '#202127',
    clusterBorder: '#3c3f44',
    secondaryColor: '#2e2e32',
    tertiaryColor: '#202127',
  },
  flowchart,
}

// 防止每页渲染都重复注册 watch
let mermaidInstalled = false

export default {
  extends: DefaultTheme,

  // home-hero-before 插槽只在首页存在，其它页面不会渲染
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => h(PixelDust),
    })
  },

  setup() {
    const { isDark } = useData()

    // SSR 阶段没有 DOM；已注册过就不再重复
    if (typeof window === 'undefined' || mermaidInstalled) return
    mermaidInstalled = true

    // 渲染器是单例：再次调用会深合并配置并重新渲染所有已挂载图表
    watch(
      isDark,
      (dark) => {
        createMermaidRenderer(dark ? darkConfig : lightConfig)
      },
      { immediate: true },
    )
  },
} satisfies Theme
