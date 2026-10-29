# 基础设施

_机器、网络、部署与托管：让一台机器可用、可访问、可发布 · 5 篇_

---

## 这个领域收什么

虚拟机与宿主机、远程访问、静态站点与网关部署 —— 判断标准是「**问题出在机器、网络或发布链路上**」。
不在这里的：编辑器和终端归 [开发](../dev/)，写代码用的 agent 工具归 [AI](../ai/)。

## 文章

| 文章 | 一句话 |
|---|---|
| [Ubuntu 上安装虚拟机（KVM/QEMU）](./ubuntu-kvm.md) | 在 Ubuntu 上用 KVM/QEMU 起一台可远程使用的虚拟机，完整命令流程 |
| [Omarchy 虚拟机安装记录](./omarchy-vm.md) | 在 KVM 里装 Omarchy 桌面，记录 virt-manager 不认镜像等一连串坑 |
| [Ubuntu 24.04 远程访问配置](./ubuntu-remote-access.md) | 把 Ubuntu 桌面机配成可远程访问的开发服务器，最终拔掉显示器纯远程运行 |
| [用 GitHub Pages 搭建静态知识库](./github-pages.md) | 把散落在多台机器上的 Markdown 笔记聚合成静态站点（本仓库的搭建全流程） |
| [MCP Gateway 部署指南](./mcp-gateway.md) | 在 Linux 主机上部署 MCP 服务中心，统一路由供 Mac 与同事的 Claude Code 远程调用 |

## 阅读顺序

新机器从零到可远程使用：**ubuntu-kvm → ubuntu-remote-access**；想试新桌面环境再加 **omarchy-vm**。

## 相关专题

- [KVM 实验室](../series/kvm-lab.md)
