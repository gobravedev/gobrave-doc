+++
title = '配置说明'
date = '2026-08-12T00:00:00+08:00'
draft = false
type = 'page'
layout = 'single'
weight = 11
+++

## 概述

gobrave 配置加载遵循“默认值 -> config.yml -> CLI 覆盖”的合并顺序。

## 解析优先级

配置优先级如下：

1. 程序内置默认值
2. `config.yml`
3. CLI 参数（如 `--port`、`--db-driver`、`--runtime`）

## 配置文件位置

启动时配置路径解析顺序：

1. `--config` CLI 参数
2. 对 `config.yml` 的外部路径解析

## 核心配置段

### `server`

```yaml
server:
  host: 0.0.0.0
  port: 8082
  log_path: logs/server.log
```

### `database`

```yaml
database:
  driver: sqlite # sqlite | mysql | postgres
  host: 127.0.0.1
  port: "5432"
  user: postgres
  password: ""
  name: postgres
  ssl_mode: disable
  path: "" # sqlite 使用
```

### `container`

```yaml
container:
  runtime: docker # docker | k8s | k3s
  kubernetes:
    namespace: default
    kubeconfig: ""
    in_cluster: false
  refresh_image_status_on_start: true
  recover_running_dag_on_start: true
  cleanup_dag_node_containers_before_start: true
  delete_container_on_node_success: true
  dag_node_cleanup_on_failed: stop
  dag_node_cleanup_on_dag_finished: delete
  create_queue_max_concurrency: 3
  create_queue_max_pending: 50
```

### `route`

`route.registry` 用于控制路由注册策略：

- `gateway`
- `traefik`
- `k8s-ingress`

### `realtime`

```yaml
realtime:
  transport: ws # ws | sse
  max_connections_per_user: 2
  ack_timeout_seconds: 10
  ack_max_retries: 3
```

### `llm`

二选一方式配置：

- `github_token`
- 或 `provider`（`type`、`base_url`、`api_key`、`bearer_token`）

## 存储基础目录

默认基础目录为：

- 若设置 `GOBRAVE_BASE_DIR`，则使用该值
- 否则使用 `$HOME/.gobrave`

该目录用于运行时数据、生成物及外部路径解析。

## 常用 CLI 覆盖示例

```bash
./gobrave \
  --config=./config.yml \
  --host=0.0.0.0 \
  --port=8082 \
  --db-driver=postgres \
  --db-host=127.0.0.1 \
  --db-port=5432 \
  --db-user=postgres \
  --db-password=secret \
  --db-name=gobrave \
  --db-ssl-mode=disable \
  --runtime=docker
```

## 最佳实践

1. 敏感信息不要提交到 Git，建议由环境变量或部署平台注入。
2. 为 dev/staging/prod 分别维护配置模板。
3. CLI 覆盖更适合临时实验，不建议长期替代配置文件。
4. 调整运行时（`docker`/`k8s`/`k3s`）时同步检查 route registry 设置。
