+++
title = '快速开始'
date = '2026-08-12T00:00:00+08:00'
draft = false
type = 'page'
layout = 'single'
weight = 10
+++

## 概述

本文帮助你在几分钟内本地启动 gobrave，使用默认 Go 服务入口。

## 前置条件

- Go 1.25 或更高版本
- 可访问数据库：SQLite（默认）、MySQL 或 PostgreSQL
- 若需要容器化分析运行时，请准备 Docker、k8s 或 k3s

## 1. 克隆并进入项目

```bash
git clone https://github.com/gobravedev/gobrave.git
cd gobrave
```

## 2. 创建运行配置

```bash
cp config.example.yml config.yml
```

至少请确认：

- `database.*`
- `container.runtime`
- `storage.base_dir`（可选但建议设置）

## 3. 启动服务

```bash
go run ./cmd/server
```

默认监听：

- Host: `0.0.0.0`
- Port: `8082`

## 4. 验证服务

启动后可访问：

- 前端集成使用的首页/API 入口
- Swagger（非 release 模式）：`/swagger/index.html`

若本地默认端口运行：

- `http://127.0.0.1:8082/swagger/index.html`

## 5. 构建二进制（可选）

```bash
go build -o gobrave ./cmd/server
./gobrave
```

如需临时切换环境，可用 CLI 参数覆盖配置。

示例：

```bash
./gobrave --port=8082 --db-driver=sqlite --db-path=/tmp/gobrave.db --runtime=docker
```

## 常见首启问题

1. 数据库连接失败：
- 检查 `database.driver`、host/port、user/password、name/path 是否正确。

2. Swagger 无法访问：
- 当 `GIN_MODE=release` 时 Swagger 会被禁用。

3. 容器会话无法启动：
- 检查 Docker/k8s 可用性，以及 `container.runtime` 选择是否匹配。

## 下一步

- 阅读 `/zh/docs/configuration` 获取完整配置说明。
- 阅读 `/zh/docs/architecture` 理解模块边界与运行流程。
- 阅读 `/zh/docs/containers` 了解容器生命周期操作。
