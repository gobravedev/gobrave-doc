+++
title = 'Container User Selection'
date = '2026-08-17T00:00:00+08:00'
draft = false
type = 'page'
layout = 'single'
weight = 28
+++

## Overview

This document explains when gobrave explicitly sets a container user and how that behavior differs between Docker and Kubernetes runtimes.

## Where The User Value Comes From

The user value is populated while preparing a DAG node runtime spec.

Input variables:

- `USERID`
- `GROUPID`

If `USERID` is empty, gobrave does not set a runtime user.

## When User Is Specified

### Case 1: Docker Runtime

Condition:

- runtime name is `docker`
- `USERID` is present

Behavior:

- if `GROUPID` is present, gobrave sets `spec.User = "<uid>:<gid>"`
- otherwise, gobrave sets `spec.User = "<uid>"`

This maps to Docker behavior similar to `docker run --user`.

### Case 2: Kubernetes Runtime

Condition:

- runtime name is `k8s`, `k3s`, or `kubernetes`
- `USERID` is present

Behavior:

- gobrave sets `spec.User = "<uid>"`
- Kubernetes runtime maps that value to `securityContext.runAsUser` when parsable

Current behavior does not map `GROUPID` to `runAsGroup`.

### Case 3: Other Runtime Names

If runtime name does not match the supported branches above, gobrave does not apply user mapping in this path.

## Kubernetes Details

In Kubernetes runtime implementation:

- `spec.User` is parsed as numeric user id
- `uid:gid` format is accepted as input text, but only the `uid` part is used
- if parsing fails, no explicit `RunAsUser` is applied

## Practical Notes

1. For DAG workloads, set `USERID` when you need non-root execution.
2. For Docker, set both `USERID` and `GROUPID` when filesystem group ownership matters.
3. For Kubernetes, setting `GROUPID` alone currently has no effect on `runAsGroup`.

## Related Files

- `internal/manager/container_manager.go` (runtime-dependent `spec.User` assignment)
- `internal/container_runtime/docker/runtime.go` (Docker `User` mapping)
- `internal/container_runtime/kubernetes/runtime.go` (Kubernetes `RunAsUser` mapping)