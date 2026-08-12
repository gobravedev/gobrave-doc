+++
title = 'Configuration'
date = '2026-08-12T00:00:00+08:00'
draft = false
type = 'page'
layout = 'single'
weight = 11
+++

## Overview

gobrave loads configuration from defaults, then merges values from `config.yml`, and finally applies CLI overrides.

## Resolution Order

Configuration priority is:

1. Built-in defaults
2. `config.yml`
3. CLI flags (`--port`, `--db-driver`, `--runtime`, etc.)

## Config File Location

At startup, config path is resolved in this order:

1. `--config` CLI flag
2. external path resolution for `config.yml`

## Core Sections

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
  path: "" # used by sqlite
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

`route.registry` controls route registration strategy:

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

You can use either:

- `github_token`
- or `provider` (`type`, `base_url`, `api_key`, `bearer_token`)

## Storage Base Directory

Default base directory is:

- `GOBRAVE_BASE_DIR` if set
- otherwise `$HOME/.gobrave`

This base directory is used by runtime data, generated artifacts, and external path resolution.

## Useful CLI Overrides

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

## Best Practices

1. Keep secrets outside Git and inject by environment or deployment platform.
2. Use one config template per environment (dev/staging/prod).
3. Prefer CLI overrides only for temporary experiments.
4. Validate runtime mode (`docker`/`k8s`/`k3s`) together with route registry setup.
