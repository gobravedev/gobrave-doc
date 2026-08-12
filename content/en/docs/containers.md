+++
title = 'Container Management'
date = '2026-08-12T00:00:00+08:00'
draft = false
type = 'page'
layout = 'single'
weight = 20
+++

## Overview

gobrave uses a unified container management model for interactive apps and workflow runtime tasks.

## Runtime Backends

Configured by `container.runtime`:

- `docker`
- `k8s`
- `k3s`

Runtime resolution is centralized in the container runtime registry.

## Main Entities

- Container image: image metadata and pull policy
- Container template: reusable launch definition
- App session: user-facing running environment based on template
- Container instance: runtime lifecycle state record
- Outbox event: durable async lifecycle request

## Core API Groups

### Image And Template

- `/container/image/*`
- `/container/template/*`

### App Session Lifecycle

- `/container/app-session/create`
- `/container/app-session/start`
- `/container/app-session/stop`
- `/container/app-session/delete`

### Runtime Monitoring

- `/container/runtime/monitoring/list`
- `/container/queue/status`
- `/container/outbox/list-by-page`

## Lifecycle Model

Typical flow:

1. Create session from template.
2. Resolve runtime backend and create runtime workload.
3. Persist runtime ID and mark container instance state.
4. Monitor runtime events (`started`, `failed`, `exited`, `deleted`).
5. Transition state and apply cleanup policy.

## Queue And Concurrency Controls

Container creation is bounded by:

- `container.create_queue_max_concurrency`
- `container.create_queue_max_pending`

These limits protect runtime resources during burst load.

## Cleanup Policies

For DAG-owned containers, cleanup behavior can be tuned with:

- `container.delete_container_on_node_success`
- `container.dag_node_cleanup_on_failed`
- `container.dag_node_cleanup_on_dag_finished`

## Operational Recommendations

1. Keep runtime monitoring enabled and observable.
2. Use conservative queue concurrency in shared clusters.
3. Align cleanup policy with debugging needs and storage cost.
4. For Kubernetes mode, combine this doc with `/docs/k8s-runtime-architecture`.
