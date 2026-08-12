+++
title = 'Quick Start'
date = '2026-08-12T00:00:00+08:00'
draft = false
type = 'page'
layout = 'single'
weight = 10
+++

## Overview

This guide helps you boot gobrave locally in minutes, using the default Go server entrypoint.

## Prerequisites

- Go 1.25 or newer
- A reachable database: SQLite (default), MySQL, or PostgreSQL
- Docker, k8s, or k3s if you want containerized analysis runtime

## 1. Clone And Enter Project

```bash
git clone https://github.com/gobravedev/gobrave.git
cd gobrave
```

## 2. Create Runtime Config

```bash
cp config.example.yml config.yml
```

Edit at least:

- `database.*`
- `container.runtime`
- `storage.base_dir` (optional but recommended)

## 3. Start Server

```bash
go run ./cmd/server
```

Default server bind is:

- Host: `0.0.0.0`
- Port: `8082`

## 4. Verify Service

Open the following URLs after startup:

- Home/API entry from your frontend integration
- Swagger (non-release mode): `/swagger/index.html`

If you run on localhost with default port:

- `http://127.0.0.1:8082/swagger/index.html`

## 5. Build Binary (Optional)

```bash
go build -o gobrave ./cmd/server
./gobrave
```

To switch environment quickly, you can pass CLI flags to override config values at runtime.

Example:

```bash
./gobrave --port=8082 --db-driver=sqlite --db-path=/tmp/gobrave.db --runtime=docker
```

## Common First-Run Issues

1. Database connection fails:
- Re-check `database.driver`, host/port, user/password, and database name/path.

2. Swagger not found:
- Swagger is disabled when `GIN_MODE=release`.

3. Container session cannot start:
- Verify Docker/k8s availability and `container.runtime` selection.

## Next Steps

- Read `/docs/configuration` for full config reference.
- Read `/docs/architecture` for module boundaries and runtime flow.
- Read `/docs/containers` for container lifecycle operations.
