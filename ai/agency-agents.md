# Agency Agents — AI 智能体专家团队（英文上游）

_200+ 个即插即用的 AI 专家角色，支持 18 种 AI 编程工具，138k ⭐ 的英文上游仓库 · 最后验证：2026-08-03_

---

## 📋 这个仓库是什么

[agency-agents](https://github.com/msitarzewski/agency-agents) 是所有 AI 智能体角色集的**英文源头**，[中文版](./agency-agents-zh.md)基于此翻译并新增中国原创角色。每个 agent：

- **🎯 专职**——深度的领域专家，不是通用提示词模板
- **🧠 人格驱动**——独立人设、沟通风格、专业方法
- **📋 交付导向**——真实的代码、流程和可量化成果

## 🎯 核心作用

| 作用 | 说明 |
| ---- | ---- |
| 即装即用 | 原生支持 Claude Code 的 `.md` + YAML frontmatter 格式 |
| 多工具兼容 | 同套角色可装入 Claude Code / Cursor / Codex / Gemini CLI 等 18 种工具 |
| 桌面客户端 | 官方 App（macOS/Linux/Windows）一键浏览、安装、自动更新 |
| 团队协作 | 搭配编排器，多专家按 DAG 自动协作 |

## ⚙️ 安装与使用

### 方法一：桌面客户端（推荐）

```bash
# macOS 一行安装
brew install --cask msitarzewski/agency-agents/agency-agents
```

App 内浏览全部角色，点击安装到 Claude Code / Cursor / Codex 等，自动更新。也可直接访问 [agencyagents.app](https://agencyagents.app)。

### 方法二：命令行脚本

```bash
git clone --depth 1 https://github.com/msitarzewski/agency-agents /tmp/agency-agents

# 全部角色装入 Claude Code
/tmp/agency-agents/scripts/install.sh --tool claude-code

# 或只装一个部门
cp /tmp/agency-agents/engineering/*.md ~/.claude/agents/
```

### 激活方式

在 Claude Code 会话中直接点名：

```text
激活 Frontend Developer，帮我写一个 React 组件
```

> ⚠️ 角色名与描述会注入每次对话的上下文，**按需装几个即可，不建议全量安装**。

## 🔗 参考链接

- [英文上游仓库](https://github.com/msitarzewski/agency-agents)
- [桌面客户端发布页](https://github.com/msitarzewski/agency-agents-app/releases/latest)
- [中文版（268 个角色，含 53 个中国原创）](./agency-agents-zh.md)

---

_最后验证：2026-08-03 · 角色数量与星标以仓库当前页面为准_
