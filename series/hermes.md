# 专题：Hermes 上手

_从 Claude Code 的凭据坑，到迁移决策、外观定制，再到技能库 · 4 篇_

---

一条完整的换客户端路径。四篇分开写是因为各自能独立成立，但按顺序读才知道每一步为什么存在。

| 顺序 | 文章 | 解决什么 |
|---|---|---|
| 1 | [Claude Code 后台会话与密钥串号](../ai/claude-code-daemon-auth.md) | 多套 API 凭据并行时，daemon 会继承谁的环境变量 |
| 2 | [从 Claude Code 迁移到 Hermes Agent](../ai/claude-to-hermes-migration.md) | 哪些职责迁走、哪些留在 Claude Code，边界怎么划 |
| 3 | [Hermes Agent 皮肤配置详解](../ai/hermes-skin-theme.md) | 迁完之后把外观调成自己的：字段、示例、Agent 清单 |
| 4 | [Hermes Skill 的加载与写入机制](../ai/hermes-skill-loading.md) | 技能从哪加载、哪些只读、新建落哪、加了路径为什么不生效 |

## 这条线解决的核心矛盾

Claude Code 擅长仓库内改代码，Hermes 负责常驻、调度、跨系统。两者同时存在时，**凭据与配置文件会互相污染**（第 1 篇），所以要先划清职责（第 2 篇），再谈个性化（第 3 篇）。

第 4 篇是同一条线的延伸：职责划清之后，**能力供给**也要划清 —— 哪些技能两边共用、共用时谁能改、改完为什么这边看得到那边不生效。软链、`external_dirs`、`create_dir` 这三个词背后的取舍，就是这一步的全部内容。

## 相关领域

- [AI Agent](../ai/index.md)
