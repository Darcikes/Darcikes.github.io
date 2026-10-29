# AI Agent

_agent 本体：客户端迁移、皮肤定制、排错与生态 · 9 篇_

---

## 这个领域收什么

模型客户端本身（Claude Code / Hermes / Codex）的安装、迁移、主题、凭据排错，以及围绕它们的技能包与角色库。
**agent 怎么去操作外部世界**归 [自动化](../automation/)；**模型调用产生的账单与状态栏**归这里。

## 文章

| 文章 | 一句话 |
|---|---|
| [从 Claude Code 迁移到 Hermes Agent](./claude-to-hermes-migration.md) | 一次「不复制配置、只迁移职责」的迁移复盘：边界、步骤与踩坑 |
| [Hermes Agent 皮肤（skin）配置详解](./hermes-skin-theme.md) | 逐字段说明 skin YAML 与完整示例配置，含 Agent 执行清单与图片转字标脚本 |
| [Hermes Skill 的加载与写入机制](./hermes-skill-loading.md) | 四个加载层、只读边界、新建落盘位置与排错，附可复制给 agent 的执行卡 |
| [Claude Code 后台会话与密钥串号](./claude-code-daemon-auth.md) | 多套 API 凭据并行时 daemon 继承环境变量导致的串号与排查 |
| [Claude CLI 状态栏与用量统计](./claude-cli-statusline.md) | ccusage + ccstatusline：状态栏渲染与真实费用统计，三方 API 也能算 |
| [Codex++ 桌面增强](./codex-plus-plus.md) | Codex 桌面版的外部启动器：供应商切换、协议转换、会话管理 |
| [Agency Agents（英文上游）](./agency-agents.md) | 200+ 即插即用的 AI 专家角色，支持 18 种编程工具 |
| [Agency Agents 中文版](./agency-agents-zh.md) | 268 个角色，含 53 个中国市场原创智能体 |
| [baoyu-skills 提效技能集](./baoyu-skills.md) | 宝玉开源的 21 个 agent 技能：内容发布、AI 图片、翻译抓取 |

## 阅读顺序

换客户端先看 **claude-to-hermes-migration**，再按需定制外观 **hermes-skin-theme**；技能库怎么加载、怎么写先读 **hermes-skill-loading**；多凭据环境先解决 **claude-code-daemon-auth**。

## 相关专题

- [Hermes 上手](../series/hermes.md)
