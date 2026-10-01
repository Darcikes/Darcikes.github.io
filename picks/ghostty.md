# Ghostty — 现代终端模拟器

_GPU 加速、跨平台（macOS/Linux/Windows）、使用平台原生 UI 与 GPU 渲染的快速终端，59k ⭐ · 最后验证：2026-08-03_

---

## 📋 这个仓库是什么

Ghostty 是由 Mitchell Hashimoto（前 HashiCorp 创始人，作品含 Vagrant、Terraform、Consul）开发的**开源终端模拟器**。核心卖点：

- **GPU 加速渲染**——基于 Metal（Apple）/ OpenGL，滚动、分屏、动画流畅
- **平台原生 UI**——macOS 上原生标题栏、菜单栏，不吃 Electron
- **零运行时依赖**——单一二进制，不需要 Electron/Node 等运行时
- **配置即文本**——`config` 文件纯文本，支持热重载（`Cmd+Shift+,`），可进 git 管理
- **快速下拉终端**（Quick Terminal）——全局热键呼出的 Quake 风格终端
- **分屏 + 标签页**——原生支持，无需 tmux

## 🎯 核心作用

| 能力 | 说明 |
| ---- | ---- |
| 日常终端 | 替代 iTerm2/WezTerm 的现代选择，启动快、渲染流畅 |
| 主题切换 | 内置 100+ 主题，支持 `light:X,dark:Y` 按系统深浅色自动切换 |
| 快捷键体系 | 标签页/分屏/字号/全局热键均可自定义 |
| 配置管理 | 文本配置 + 热重载，适合放进 dotfiles 用 git 管理 |

## ⚙️ 安装与使用

### macOS 安装

```bash
# Homebrew（推荐）
brew install --cask ghostty

# 或官网下载安装包
# https://ghostty.org/download
```

### 配置文件位置

| 平台 | 路径 |
| ---- | ---- |
| macOS | `~/Library/Application Support/com.mitchellh.ghostty/config.ghostty` |
| Linux | `~/.config/ghostty/config` |

### 常用配置速查

```ini
# 字体与字号
font-family = "0xProto Nerd Font Mono"
font-size = 14

# 明暗主题自动切换（跟随系统深浅色）
theme = light:Catppuccin Latte,dark:Catppuccin Mocha

# 毛玻璃效果（macOS）
background-opacity = 0.85
background-blur-radius = 30

# 快速下拉终端（Quake 风格）
keybind = global:opt+grave_accent=toggle_quick_terminal
```

### 常用操作

| 操作 | 快捷键 |
| ---- | ------ |
| 热重载配置 | `Cmd+Shift+,` |
| 新标签页 | `Cmd+T` |
| 右/下分屏 | `Cmd+D` / `Cmd+Shift+D` |
| 查看全部配置项 | `ghostty +show-config` |

<details>
<summary><strong>📁 精选 dotfiles（参考配置）</strong></summary>

GitHub 上高质量的 Ghostty 配置集，可直接参考或摘抄：

| 仓库 | 亮点 |
| ---- | ---- |
| [alexanderop/dotfiles](https://github.com/alexanderop/dotfiles) | JetBrains Mono + Catppuccin Mocha，快速下拉终端 |
| [ashwch/dotfiles](https://github.com/ashwch/dotfiles) | 原生分屏快捷键，Gruvbox + Starship，shell 启动 ~50ms |
| [grantmcdermott/dotfiles](https://github.com/grantmcdermott/dotfiles) | GNU Stow 管理，Vim 风格 `Alt+h/j/k/l` 切换分屏 |
| [wcygan/dotfiles](https://github.com/wcygan/dotfiles) | 透明度/毛玻璃/内边距调优，附完整配置指南 |

</details>

## 🔗 参考链接

- [Ghostty 官方仓库](https://github.com/ghostty-org/ghostty)
- [官方配置文档](https://ghostty.org/docs/config)
- [主题文档（含 light:dark 语法）](https://ghostty.org/docs/features/theme)

---

_最后验证：2026-08-03 · 版本与星标以仓库当前页面为准_
