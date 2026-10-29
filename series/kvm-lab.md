# 专题：KVM 实验室

_从装宿主机到纯远程开发 · 3 篇_

---

把一台闲置机器变成可远程使用的虚拟化实验环境，顺序不能反：先有虚拟机能力，再选客户机系统，最后解决远程访问。

| 顺序 | 文章 | 解决什么 |
|---|---|---|
| 1 | [Ubuntu 上安装虚拟机（KVM/QEMU）](../infra/ubuntu-kvm.md) | 宿主机侧：qemu/libvirt 安装与第一台 VM |
| 2 | [Omarchy 虚拟机安装记录](../infra/omarchy-vm.md) | 客户机侧：装一个非主流的桌面发行版会踩哪些坑 |
| 3 | [Ubuntu 24.04 远程访问配置](../infra/ubuntu-remote-access.md) | 拔掉显示器：RDP/VNC 与 Mac 客户端配置 |

> 第 2 篇是可选支线，想用别的桌面发行版可以跳过。

## 相关领域

- [基础设施](../infra/index.md)
