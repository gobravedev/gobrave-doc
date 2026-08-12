+++
title = 'Documentation'
date = '2026-08-02T00:00:00+08:00'
draft = false
type = 'page'
layout = 'single'
+++

## Documentation

Welcome to the gobrave documentation. Here you'll find guides and references for using the platform.

### Getting Started

- [Quick Start](/docs/quick-start) — Set up and run gobrave locally
- [Configuration](/docs/configuration) — All configuration options explained
- [Architecture](/docs/architecture) — System architecture overview

### Core Concepts

- [Container Management](/docs/containers) — Docker container lifecycle
- [Container Monitoring](/docs/container-monitoring) — Real-time runtime monitoring and recovery
- [Runtime Monitor Recovery](/docs/runtime-monitor-recovery) — Restart-safe goroutine monitor recovery with reconciler and registry
- [Kubernetes Runtime Architecture](/docs/k8s-runtime-architecture) — Informer-driven Monitor model, event mapping, and restart-safe recovery workflow
- [Container Worker](/docs/container-worker) — Outbox-based asynchronous container worker queue
- [Event Bus Subscribers](/docs/event-bus-subscribers) — event_handlers subscribers and their responsibilities
- [Outbox Dispatcher and Worker Concurrency](/docs/outbox-dispatcher-worker-concurrency) — maxPending/maxConcurrency architecture for create/start queueing and retries
- [Node Completion Bootstrap](/docs/node-completion-bootstrap) — Startup wiring and reconciliation for DAG node terminal state consistency
- [Data Management](/docs/data) — Managing samples, files, and datasets

### Advanced Topics
- [DAG Workflows](/docs/dag) — Understanding DAG-based pipeline orchestration
- [Dynamic Orchestration V2](/docs/orchestration-v2) — Runtime node materialization
- [Dataflow Engine V3](/docs/dataflow-v3) — Reactive streaming pipelines
- [LLM Integration](/docs/llm) — AI-assisted analysis setup

### API Reference

- [Swagger Docs](/docs/api) — Interactive API documentation
