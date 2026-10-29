# 专题：Hermes 上手

_从 Claude Code 的凭据坑，到迁移决策，再到外观定制 · 3 篇_

---

一条完整的换客户端路径。三篇分开写是因为各自能独立成立，但按顺序读才知道每一步为什么存在。

| 顺序 | 文章 | 解决什么 |
|---|---|---|
| 1 | [Claude Code 后台会话与密钥串号](../ai/claude-code-daemon-auth.md) | 多套 API 凭据并行时，daemon 会继承谁的环境变量 |
| 2 | [从 Claude Code 迁移到 Hermes Agent](../ai/claude-to-hermes-migration.md) | 哪些职责迁走、哪些留在 Claude Code，边界怎么划 |
| 3 | [Hermes Agent 皮肤配置详解](../ai/hermes-skin-theme.md) | 迁完之后把外观调成自己的：字段、示例、Agent 清单 |

## 这条线解决的核心矛盾

Claude Code 擅长仓库内改代码，Hermes 负责常驻、调度、跨系统。两者同时存在时，**凭据与配置文件会互相污染**（第 1 篇），所以要先划清职责（第 2 篇），再谈个性化（第 3 篇）。

## 相关领域

- [AI Agent](../ai/index.md)
