# codebase-memory-mcp — 代码知识图谱 MCP 服务器

_将整个代码库索引为持久化知识图谱，AI 编程代理（Claude Code / Codex 等）按结构查询替代逐文件 grep，省 token、快定位 · 最后验证：2026-08-20_

---

## 📋 这个仓库是什么

[DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) 是一个高性能代码智能 MCP 服务器（单静态二进制，MIT 协议）。核心思路：**先解析、再查询**——用内置的 tree-sitter AST 把源码解析成函数/类/方法等节点与调用/导入/继承等边，构建本地知识图谱（SQLite 存储），通过 14 个 MCP 工具暴露给 AI 代理，替代昂贵的逐文件探索。2026-02 登上 GitHub Trending，45.6k ⭐。

- **159 种语言**，其中 Java/Python/TS/Go/C#/C++/Kotlin/Rust 等走 Hybrid LSP 引擎（受 Eclipse JDT、tsserver、pyright、rust-analyzer 等启发，跨文件类型感知解析）
- **单静态二进制**，零依赖、零运行时、无 API key，支持 macOS/Linux/Windows
- **本地优先**：全部处理在本机，索引存 `~/.cache/codebase-memory-mcp/`

## 🎯 核心能力

### 14 个 MCP 工具

| 分类 | 工具 | 用途 |
| ---- | ---- | ---- |
| 索引 | `index_repository` / `index_status` / `list_projects` / `delete_project` | 建索引、查状态、管理项目 |
| 结构查询 | `search_graph` | 按名称模式/度数过滤找符号 |
| 调用链 | `trace_path` | 追调用链（inbound/outbound/both + 风险分级） |
| 源码 | `get_code_snippet` / `search_code` | 按限定名取源码 / 全文搜索 |
| 影响分析 | `detect_changes` | git diff → 受影响符号映射 |
| 深度查询 | `query_graph` | Cypher 式查询（如 `MATCH (a)-[r:HTTP_CALLS]->(b) ...`） |
| 架构 | `get_graph_schema` / `get_architecture` | 图谱 schema / 架构概览 |
| 知识沉淀 | `manage_adr` / `ingest_traces` | 架构决策记录 / 运行时调用链摄入 |

### 边类型（关系模型）

`CALLS`、`HTTP_CALLS`（Feign/REST）、`ASYNC_CALLS`、`EMITS/LISTENS_ON`（MQ 发布订阅）、`IMPORTS`、`DEFINES`、`IMPLEMENTS`、`OVERRIDE`、`USAGE`、`FILE_CHANGES_WITH`、`CONTAINS_*`、`SIMILAR_TO`（克隆检测）、`CROSS_*`（跨仓库）——其中 **HTTP_CALLS / LISTENS_ON / CROSS_\*** 专为微服务与消息架构设计。

### 其他亮点

- **性能**：Linux 内核 28M 行约 3 分钟全量索引，查询 <1ms；5 个结构查询约 3,400 token，对比逐文件探索约 41 万 token（约 120 倍差）
- **语义搜索**：内置 Nomic `nomic-embed-code` 嵌入模型（768d int8），无 API key
- **一键配置**：`install` 命令自动为 Claude Code / Codex / Gemini CLI 等 11 个代理装好 MCP 条目 + skill + hooks（Grep/Glob 增强、会话提醒）
- **团队共享**：导出压缩图谱 artifact 供队友增量导入
- **3D 可视化 UI**：`--ui=true` 后访问 `localhost:9749`

## 🔧 实现原理

```mermaid
flowchart LR
    accTitle: codebase-memory-mcp 架构
    accDescr: tree-sitter 解析源码成节点和边，存 SQLite 图谱，MCP 工具查询，hooks 在 Grep/Glob 时附加图谱上下文

    src["📁 源码目录"] -->|tree-sitter 解析<br/>Hybrid LSP 类型感知| idx["🧠 知识图谱<br/>SQLite ~/.cache/codebase-memory-mcp/"]
    idx -->|MCP stdio| mcp["🔌 MCP Server 二进制"]
    mcp -->|14 工具| agent["🤖 Claude Code / Codex"]
    agent -->|Grep/Glob| hook["⚡ PreToolUse hook<br/>code-discovery-gate"]
    hook -.附加图谱上下文.-> agent

    classDef data fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#14532d
    classDef mcp_style fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    classDef agent_style fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    class src,idx data
    class mcp,hook mcp_style
    class agent agent_style
```

关键设计点：

| 设计 | 说明 |
| ---- | ---- |
| 静态快照 | 图谱是解析时快照，反射/AOP/动态注入等运行时行为不在图内，最终以源码为准 |
| 索引新鲜度 | 需手动 `detect_changes`（git diff 增量）或 `index_repository` 重索引；CLI 单进程模式重索引有局限，优先在会话里走 MCP 工具 |
| 排除规则 | 默认跳过 `.git`、`node_modules`、`target`、`.claude`、`docs` 等 |

## ⚙️ 安装与使用

### 安装

```bash
# 一键脚本（官方推荐）
curl -LsSf https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash

# 或 Homebrew / npm / pip
brew install codebase-memory-mcp
npm i -g codebase-memory-mcp
```

### 一键配置 Claude Code（关键步骤）

```bash
codebase-memory-mcp install    # 自动装：MCP 条目 + skill + 3 类 hooks（Grep/Glob 增强、会话提醒、子代理提醒）
codebase-memory-mcp install --dry-run   # 先预览将要改动的文件
```

装完新开会话生效。`claude mcp list` 应看到 `codebase-memory-mcp ✔ Connected`。

### 常用 CLI

```bash
codebase-memory-mcp                          # 以 MCP server 运行（stdio）
codebase-memory-mcp cli <tool> '<json>'      # 单次调用某工具（如 index_status）
codebase-memory-mcp install / uninstall / update / config
codebase-memory-mcp --ui=true                # 开启 3D 图谱可视化（localhost:9749）
```

## 💡 怎么用（Claude Code 内）

**核心原则：结构类问题走图谱，字面量/配置文件走 grep。**

| 问题 | 调用 |
| ---- | ---- |
| 「X 被谁调用 / X 调用谁」 | `search_graph(name_pattern=...)` → `trace_path(direction="both")` → `get_code_snippet` |
| 「改了 A 会影响哪些地方」 | `detect_changes()` 或 `trace_path(risk_labels=true)` |
| 「哪些 Feign 接口调了 /soc/dynamic/*」 | `query_graph`（Cypher，如 `MATCH (a)-[r:HTTP_CALLS]->(b) ...`） |
| 「找不认识的符号名」 | `search_graph(name_pattern=...模糊匹配)` |
| 死代码 / 高扇出 | `search_graph(max_degree=0, exclude_entry_points=true)` / `min_degree=10` |

**Gotchas**：

- `trace_path` 要精确名，先 `search_graph` 确认
- `query_graph` 有 200 行上限
- `direction="outbound"` 会漏跨服务调用者，用 `both`
- 结果默认 10 条/页，注意 `has_more` + `offset`

## ⚠️ 注意事项

- **索引会过期**：代码改动后图谱滞后，改代码前先 `detect_changes`
- **排除目录**：被排除的目录（如 `docs/`、`scripts/`）查内容用 grep，不要硬用图谱
- **hooks 依赖 install 生成的脚本**：卸载走 `codebase-memory-mcp uninstall`，不要手删
- **MCP server 重启**：install/update 会停掉运行中的 server 实例，当前会话图谱工具暂时不可用，新会话恢复
- **静态盲区**：反射、AOP、动态分发不在图内

## 🔗 参考链接

- [DeusData/codebase-memory-mcp 官方仓库](https://github.com/DeusData/codebase-memory-mcp)

---

_最后验证：2026-08-20（仓库归属与星标于 2026-10-01 复核） · 工具集与性能数字以仓库 README 与 Releases 为准_
