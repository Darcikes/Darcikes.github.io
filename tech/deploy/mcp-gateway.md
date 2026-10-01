# MCP Gateway 部署指南

_预计耗时 30 分钟 · 难度：中等 · 最后验证：2026-07-25_

---

## 📋 概述

### 目标

在 Linux 主机上部署 MCP 服务中心，通过统一路由供 Mac 及同事的 Claude Code 客户端远程调用。

### 架构概览

各 MCP 服务由 supergateway 从 stdio 转成 HTTP/SSE，监听本机端口；pm2 负责守护与开机自启；Caddy 作为唯一对外入口做路径路由。

```mermaid
flowchart TB
    accTitle: MCP Gateway Deployment Architecture
    accDescr: Claude Code 客户端通过 Caddy 统一入口访问 Linux 主机上的多个 MCP 服务，各服务由 supergateway 转换协议并由 pm2 守护

    clients["👤 客户端<br/>Mac · 同事A · 同事B"]

    subgraph host ["🖥️ Linux 主机"]
        direction TB
        caddy["🚪 Caddy :8000<br/>统一入口 · 路径路由 · 可选认证"]
        mcp1["🧩 :8001 defuddle MCP<br/>网页内容提取"]
        mcp2["🧩 :8002 github MCP<br/>GitHub API"]
        mcp3["🧩 :8003 db MCP<br/>…"]
        pm2["⚙️ pm2 进程守护<br/>自动重启 · 开机自启"]

        caddy --> mcp1
        caddy --> mcp2
        caddy --> mcp3
        pm2 -.->|守护| mcp1
        pm2 -.->|守护| mcp2
        pm2 -.->|守护| mcp3
    end

    clients -->|HTTP/SSE 局域网 :8000| caddy

    classDef client fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    classDef entry fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    classDef service fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#14532d
    classDef daemon fill:#fef9c3,stroke:#ca8a04,stroke-width:2px,color:#713f12

    class clients client
    class caddy entry
    class mcp1,mcp2,mcp3 service
    class pm2 daemon
```

### 组件说明

| 组件 | 作用 | 替代方案 |
|------|------|---------|
| **supergateway** | 将 stdio 模式 MCP Server 转为 HTTP/SSE | mcp-remote、自封装 |
| **pm2** | 进程守护、日志、开机自启 | systemd、docker compose |
| **Caddy** | 统一入口、路由、TLS（可选） | Nginx、Traefik |
| **defuddle-fetch-mcp-server** | 首个 MCP 服务：网页内容提取 | 可替换/扩展 |

---

## 🔧 阶段一：部署第一个服务（defuddle-fetch）

### 1.1 环境准备

```bash
# Node.js >= 18
node -v

# 全局安装依赖
npm install -g pm2 supergateway defuddle-fetch-mcp-server
```

### 1.2 启动服务

```bash
# 启动 defuddle-fetch 并暴露 HTTP 接口
pm2 start supergateway \
  --name "mcp-defuddle" \
  -- --stdio "defuddle-fetch-mcp-server" --port 8001

# 持久化 pm2 进程列表（重启后恢复）
pm2 save

# 设置开机自启
pm2 startup
# 执行上面命令输出的那行 sudo 命令
```

### 1.3 验证

```bash
# 本地测试
curl -s http://localhost:8001/sse | head -5

# 从 Mac 测试（替换为实际 IP）
curl -s http://192.168.x.x:8001/sse | head -5
```

### 1.4 Mac 端配置

`~/.claude/settings.json` 中添加：

```json
{
  "mcpServers": {
    "defuddle-remote": {
      "url": "http://主机IP:8001/sse"
    }
  }
}
```

然后执行 `/reload-plugins`。

---

## 🚀 阶段二：添加更多 MCP 服务

每新增一个服务，分配独立端口，用 pm2 管理：

```bash
# GitHub MCP
pm2 start supergateway \
  --name "mcp-github" \
  -- --stdio "npx -y @modelcontextprotocol/server-github" --port 8002

# 文件系统 MCP（注意：将工作目录限定在安全路径）
pm2 start supergateway \
  --name "mcp-filesystem" \
  -- --stdio "npx -y @modelcontextprotocol/server-filesystem /srv/data" --port 8003

# 自定义服务（按需扩展）
# pm2 start supergateway --name "mcp-xxx" -- --stdio "xxx" --port 8004
```

### 服务端口规划建议

| 端口 | 服务 | 备注 |
|------|------|------|
| 8000 | Caddy 统一入口 | 不直接暴露内部端口 |
| 8001 | defuddle-fetch | 网页抓取 |
| 8002 | github | GitHub API |
| 8003 | filesystem | 文件操作 |
| 8004+ | 预留 | 按需分配 |

---

## 🚪 阶段三：Caddy 统一入口

### 3.1 安装 Caddy

```bash
# Debian/Ubuntu
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# CentOS/RHEL
# dnf install 'dnf-command(copr)'
# dnf copr enable @caddy/caddy
# dnf install caddy
```

### 3.2 配置 Caddyfile

`/etc/caddy/Caddyfile`：

```caddyfile
# 监听局域网所有接口
:8000 {
    # 每个 MCP 服务一个路由
    handle /defuddle/* {
        reverse_proxy localhost:8001
    }

    # 后续添加更多服务：
    # handle /github/* {
    #     reverse_proxy localhost:8002
    # }
    #
    # handle /filesystem/* {
    #     reverse_proxy localhost:8003
    # }

    # 404 兜底
    respond "unknown MCP service" 404
}
```

### 3.3 启动

```bash
sudo systemctl reload caddy
sudo systemctl status caddy
```

### 3.4 客户端统一配置

```json
{
  "mcpServers": {
    "defuddle": { "url": "http://主机IP:8000/defuddle/sse" }
  }
}
```

---

## 🔐 阶段四：添加认证（当需要时）

### 方式一：共享 Token（小团队）

修改 Caddyfile：

```caddyfile
:8000 {
    @noauth {
        not header Authorization "Bearer your-shared-secret-token"
    }
    respond @noauth 403

    handle /defuddle/* {
        reverse_proxy localhost:8001
    }
}
```

### 方式二：按服务级别 Token（中等团队）

```caddyfile
:8000 {
    handle /defuddle/* {
        @noauth {
            not header Authorization "Bearer defuddle-token-xxx"
        }
        respond @noauth 403
        reverse_proxy localhost:8001
    }

    handle /github/* {
        @noauth {
            not header Authorization "Bearer github-token-yyy"
        }
        respond @noauth 403
        reverse_proxy localhost:8002
    }
}
```

> ⚠️ **客户端如何携带认证待确认**：Claude Code 的 `url` 字段目前不直接支持自定义 header，需通过环境变量 `HEADER_Authorization` 或 `headers` 参数传递，具体随版本更新确认。上面 `your-shared-secret-token` 等均为占位符，**不要**把真实 token 写进仓库。

---

## 🛠️ 运维命令速查

```bash
# 查看所有服务状态
pm2 status

# 查看某个服务日志
pm2 logs mcp-defuddle
pm2 logs mcp-defuddle --lines 50

# 重启某个服务
pm2 restart mcp-defuddle

# 停止/删除
pm2 stop mcp-defuddle
pm2 delete mcp-defuddle

# 持久化当前进程列表
pm2 save

# Caddy 相关
sudo systemctl status caddy       # 状态
sudo systemctl reload caddy       # 重载配置
sudo journalctl -u caddy -f       # 实时日志

# 端口占用检查
ss -tlnp | grep -E '800[0-9]'
```

---

## ⚠️ 注意事项

### 1. 安全边界

- MCP 服务执行的能力就是主机的能力。`filesystem` 类服务必须限定目录范围，不要给根目录权限。
- 所有服务监听 `127.0.0.1`（supergateway 默认行为），由 Caddy 做外部暴露，不直接暴露内部端口。
- 目前无部署 SSL，仅限局域网使用。若要公网访问，加 Tailscale 或 WireGuard，**不要直接把端口暴露到公网**。

### 2. 端口与防火墙

确保 Linux 防火墙开放 8000 端口（Caddy 入口）：

```bash
# ufw
sudo ufw allow from 192.168.0.0/16 to any port 8000 proto tcp

# firewalld
sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="192.168.0.0/16" port port="8000" protocol="tcp" accept' --permanent
sudo firewall-cmd --reload
```

内部服务端口（8001-80xx）只监听 localhost，不对外开放。

### 3. supergateway 稳定性

- supergateway 本质是个轻量桥接，遇到子进程崩溃会自动重连。
- 建议在 crontab 中加一个健康检查：

```bash
# 每 5 分钟检查 defuddle 服务是否存活
*/5 * * * * curl -sf http://localhost:8001/sse > /dev/null || pm2 restart mcp-defuddle
```

### 4. 主机 IP 固定

- 建议在路由器上给 Linux 主机做 DHCP 静态绑定，确保 IP 不变。否则换网络后，所有客户端配置需要改 IP。
- 或使用 mDNS（`.local` 主机名），macOS 原生支持。

### 5. pm2 日志轮转

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### 6. supergateway 的 SSE 路径

- supergateway 默认暴露 `/sse` 端点用于 SSE 连接。
- 客户端 URL 必须带上 `/sse`：`http://IP:8000/defuddle/sse`
- Caddy 的 `handle /defuddle/*` 会将完整路径透传给后端，所以 `/defuddle/sse` → `localhost:8001/sse`。

---

## 📜 快速部署脚本（一键初始化）

以下脚本在 Linux 主机上执行，完成阶段一部署。保存为 `deploy-mcp-gateway.sh`：

```bash
#!/bin/bash
set -e

echo "=== MCP Gateway 快速部署 ==="

# 1. 环境检查
command -v node >/dev/null 2>&1 || { echo "请先安装 Node.js >= 18"; exit 1; }
echo "Node.js $(node -v) ✓"

# 2. 安装依赖
echo "安装依赖..."
npm install -g pm2 supergateway defuddle-fetch-mcp-server

# 3. 启动第一个 MCP 服务
echo "启动 defuddle-fetch MCP 服务..."
pm2 start supergateway \
  --name "mcp-defuddle" \
  -- --stdio "defuddle-fetch-mcp-server" --port 8001

# 4. 持久化
pm2 save
pm2 startup | tail -1  # 按提示执行输出的 sudo 命令

# 5. 验证
sleep 2
if curl -sf http://localhost:8001/sse > /dev/null; then
    echo "部署成功！服务运行在 http://$(hostname -I | awk '{print $1}'):8001/sse"
else
    echo "部署失败，请检查日志：pm2 logs mcp-defuddle"
    exit 1
fi
```

执行：

```bash
chmod +x deploy-mcp-gateway.sh
./deploy-mcp-gateway.sh
```

---

## ✅ 验证清单

| 序号 | 验证项 | 命令/操作 | 预期结果 |
|------|--------|-----------|----------|
| 1 | pm2 进程 | `pm2 status` | 各 mcp-* 服务为 online |
| 2 | MCP 端口监听 | `ss -tlnp \| grep -E '800[0-9]'` | 8000 与各内部端口在监听 |
| 3 | 直连测试 | `curl -s http://localhost:8001/sse \| head -5` | 返回 SSE 事件流 |
| 4 | 经 Caddy 访问 | `curl -s http://localhost:8000/defuddle/sse \| head -5` | 返回 SSE 事件流 |
| 5 | 客户端接入 | Claude Code 中 `/reload-plugins` 后调用工具 | 工具可正常调用 |
| 6 | 开机自启 | 重启主机后 `pm2 status` | 服务自动恢复 |

---

## 🧭 后续扩展建议

1. **容器化**：当服务超过 5 个时，考虑用 Docker Compose 替换 pm2，方便版本管理和环境隔离。
2. **监控**：接入 Prometheus + Grafana，或者在 Caddy 层加访问日志分析。
3. **服务发现**：如果团队超过 10 人，可考虑 Consul 或 etcd 做动态服务注册，客户端自动发现可用服务。

---

_最后验证：2026-07-25 · 基于 Node.js ≥ 18 · supergateway · pm2 · Caddy 2_
