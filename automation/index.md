# 自动化与编排

_让 agent 去操作外部世界：编排、浏览器、代码索引、工程流程 · 5 篇_

---

## 这个领域收什么

把 agent 接进真实环境的那一层：worktree 编排、浏览器自动化、代码库索引、从问题到 PR 的工程流程。
判断标准是「**产出物在 agent 之外**」。agent 自己的安装与配置归 [AI](../ai/)。

## 文章

| 文章 | 一句话 |
|---|---|
| [Orca 运行机制与基础使用技巧](./orca-worktree-mechanics.md) | 以 worktree 为中心的多 Agent 编排工具：机制与基础用法 |
| [opencli 与 Orca：三条浏览器自动化链路怎么选](./opencli-vs-orca.md) | 双栈实测：扩展桥 / 内嵌浏览器 / CDP，三条独立链路的分工与选型 |
| [用 Agent 操作浏览器（CDP）](./agent-browser-cdp.md) | 前置授权、跨浏览器差异、安全边界与实操用例 |
| [codebase-memory-mcp](./codebase-memory-mcp.md) | 把代码库索引成知识图谱的 MCP 服务器，按结构查询替代 grep |
| [GitHub Bug 修复全流程](./github-bug-fix-workflow.md) | 一次真实开源 bug 修复复盘：复现 → 定位 → 改代码 → 提 Issue/PR |

## 阅读顺序

先选链路（**opencli-vs-orca**），再动手（**agent-browser-cdp**）；多任务并行上 **orca-worktree-mechanics**。

## 相关专题

- [浏览器自动化](../series/browser-automation.md)
