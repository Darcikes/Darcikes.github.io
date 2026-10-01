# GitHub 搜索 — 语法、技巧与项目质量判断

_从零学会 GitHub 搜索：限定符、实战模板、怎么判断一个项目值不值得用 · 最后验证：2026-08-05_

---

## 📋 核心一句话

**GitHub 搜索 = 关键词 + 限定符（qualifier）**。限定符告诉 GitHub「去哪儿找、按什么条件筛」，是精准搜索的关键。

---

## 🔍 搜索入口

| 入口 | 怎么用 | 适用场景 |
| ---- | ------ | -------- |
| 顶部搜索框 | 页面顶端输入框，回车即搜 | 日常最常用 |
| 快捷键 `/` | 任意页面按 `/` 光标直达搜索框 | 快 |
| [Advanced Search](https://github.com/search/advanced) | 表单式，点点选选拼条件 | 复杂组合条件 |

---

## 🔧 常用限定符（核心）

| 语法 | 作用 | 示例 |
| ---- | ---- | ---- |
| `in:name` | 只搜仓库**名字** | `skill in:name` |
| `in:description` | 只搜仓库**描述** | `claude in:description` |
| `in:readme` | 只搜 **README** 内容 | `vision in:readme` |
| `stars:>N` | 星数大于 N（质量过滤） | `claude skill stars:>100` |
| `stars:N..M` | 星数区间 | `skill stars:50..200` |
| `language:xx` | 限定编程语言 | `vision language:python` |
| `pushed:>日期` | 最近更新过（防死项目） | `pushed:>2026-01-01` |
| `created:>日期` | 创建时间之后 | `created:>2025-01-01` |
| `user:xxx` / `org:xxx` | 限定作者/组织 | `user:anthropics skill` |
| `topic:xxx` | 限定主题标签 | `topic:claude-code` |
| `NOT xxx` 或 `-xxx` | 排除关键词 | `claude skill NOT javascript` |
| `"精确短语"` | 引号内整体匹配 | `"claude code" skill` |

> 限定符可**无限组合**，一个搜索框全写：
>
> ```text
> claude vision skill stars:>50 pushed:>2026-03-01
> ```

---

## 📊 结果排序

搜索结果页右上角可切 4 种排序：

| 排序 | 用途 |
| ---- | ---- |
| **Best match** | 默认，相关性最高 |
| **Most stars** | 找公认高质量项目 |
| **Recently updated** | 找仍在维护的项目 |
| Fewest stars | 少用（找冷门小项目时） |

**套路**：找「能用」的项目选 `Most stars`；找「还活着」的项目切 `Recently updated`。

---

## 🎯 场景化搜索（实战模板）

### 1. 找高质量开源项目

```text
xxx stars:>1000 pushed:>2026-01-01
```

星数过滤烂项目，更新时间过滤死项目。

### 2. 找某语言的工具

```text
xxx language:python
xxx language:go
```

### 3. 找 skill / 插件 / 扩展（Claude Code 等 AI 工具）

```text
claude code skill stars:>100
claude skill vision
topic:claude-code
```

AI 工具类项目常打 `topic:claude-code`、`topic:claude` 标签，搜 topic 比搜关键词更全。

### 4. 找某个工具的替代品

```text
xxx alternative
xxx 替代
```

### 5. 找教程 / 资源合集

```text
awesome xxx
```

`awesome` 前缀 = 精选资源清单，是找生态入口最快的方式。

### 6. 排除干扰项

```text
vision skill -game -browser
```

---

## 💻 代码搜索（找实现参考）

顶部切 **Code** 标签（或 [github.com/search?type=code](https://github.com/search?type=code)）：

```text
"deeplink" "session_id" language:javascript
```

场景：想知道某功能怎么实现，直接搜代码片段，看成熟项目的写法。

---

## 🐛 Issue / PR 搜索（找问题与需求）

| 场景 | 语法 |
| ---- | ---- |
| 该项目的未解决 bug | `is:issue is:open label:bug` |
| 有人提过同样需求吗 | `is:issue 关键词` |
| 项目活跃度（PR 处理速度） | `is:pr is:open` / `is:pr is:closed` |

进仓库后顶部切 **Issues / Pull requests** 标签，搜索框里直接用这些语法。

---

## ⌨️ 仓库内搜索（进入仓库后）

| 快捷键 | 作用 |
| ------ | ---- |
| `T` | 快速跳转文件（Go to file） |
| `/` | 仓库内代码搜索 |
| `?` | 显示仓库内所有快捷键 |

---

## ✅ 判断项目好坏（搜到之后怎么挑）

星数只是参考，结合以下看：

| 检查项 | 怎么看 |
| ------ | ------ |
| **最近更新** | 仓库页看 `commits on xxx` 时间，几个月没动 = 可能弃坑 |
| **README 质量** | 有图、有快速开始、有示例 = 认真维护；只有一行字 = 慎用 |
| **Issues 活跃度** | 有人提 issue 且有人回 = 活着 |
| **Release 频率** | 有 release 且定期发版 = 稳定迭代 |
| **License** | 有 license 文件 = 可放心商用/自用 |
| **Used by** | 右侧栏显示有多少项目依赖它，>1000 = 经过验证 |
| **Fork 数** | fork 多说明有人二次开发/在改 |

> ⚠️ 星数可以刷/买，别只看星。**commit 活跃度 + 真实使用者**更可信。

---

## 🚀 进阶技巧

### 1. 搜自己收藏过的项目

```text
is:starred 关键词
```

只在你自己的 star 列表里搜，回忆用。

### 2. 跟随项目版本更新

仓库页 `Watch` 按钮 → 选 **Releases only**，只收发布通知，不收日常噪音。

### 3. 用星数区间找「小而美」

```text
skill stars:20..100
```

\>100 可能已商业化/变大，<20 太多垃圾，20-100 常是精品冷门。

### 4. 组合「活跃 + 质量」双过滤

```text
xxx stars:>500 pushed:>2026-06-01
```

这是最常用的可靠组合：高星 = 质量，近半年更新 = 活着。

### 5. 找技能/工具生态时先找 awesome

```text
awesome claude
awesome vision
```

一份 awesome 列表顶 100 次搜索，先看清单再逐个深入。

### 6. 保存常用搜索

搜索结果页右上角 **Save search**，下次左侧栏一键复用。

### 7. 判断仓库真实热度

右侧栏 **Releases** + **Contributors** 数：长期多人贡献 = 社区项目；单人独角戏 = 依赖个人维护。

---

## 📝 快速上手总结

1. 想找项目：`关键词 stars:>100 pushed:>2026-01-01`
2. 想找资源清单：`awesome 关键词`
3. 想找某生态工具：`关键词 + topic:xxx`
4. 找到后：看 README → commit 时间 → issues 活跃度 → license
5. 复杂条件拼不出：去 [Advanced Search](https://github.com/search/advanced) 表单点点

---

_最后验证：2026-08-05 · 示例日期需按当前时间替换_
