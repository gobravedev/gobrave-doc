+++
title = '容器管理'
date = '2026-08-12T00:00:00+08:00'
draft = false
type = 'page'
layout = 'single'
weight = 20
+++

## 概述

gobrave 通过统一的容器管理模型，支撑交互式应用会话与工作流运行任务。

## 运行时后端

通过 `container.runtime` 配置：

- `docker`
- `k8s`
- `k3s`

运行时选择由容器运行时注册表统一解析。

## 主要实体

- 容器镜像：镜像元数据与拉取策略
- 容器模板：可复用启动定义
- App Session：基于模板创建的用户会话环境
- 容器实例：运行时生命周期状态记录
- Outbox 事件：可恢复的异步生命周期请求

## 核心 API 分组

### 镜像与模板

- `/container/image/*`
- `/container/template/*`

### App Session 生命周期

- `/container/app-session/create`
- `/container/app-session/start`
- `/container/app-session/stop`
- `/container/app-session/delete`

### 运行时监控

- `/container/runtime/monitoring/list`
- `/container/queue/status`
- `/container/outbox/list-by-page`

## 生命周期模型

典型流程：

1. 从模板创建会话。
2. 解析运行时并创建工作负载。
3. 持久化 runtime ID 与实例状态。
4. 监听运行时事件（`started`、`failed`、`exited`、`deleted`）。
5. 触发状态迁移并执行清理策略。

## 队列与并发控制

容器创建受以下配置约束：

- `container.create_queue_max_concurrency`
- `container.create_queue_max_pending`

用于在突发负载下保护运行时资源。

## 清理策略

DAG 节点所属容器可通过以下配置调整清理行为：

- `container.delete_container_on_node_success`
- `container.dag_node_cleanup_on_failed`
- `container.dag_node_cleanup_on_dag_finished`

## 运行建议

1. 保持运行时监控开启并纳入可观测体系。
2. 在共享集群中使用保守的创建并发配置。
3. 根据调试需求与存储成本选择清理策略。
4. 使用 Kubernetes 模式时，结合 `/zh/docs/k8s-runtime-architecture` 阅读。
