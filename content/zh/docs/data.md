+++
title = '数据管理'
date = '2026-08-12T00:00:00+08:00'
draft = false
type = 'page'
layout = 'single'
weight = 21
+++

## 概述

gobrave 采用项目中心化数据模型，目标是让工作流输入组装可追溯、可复现。

## 核心数据对象

- Dataset：生物数据资产的逻辑集合
- Sample：样本元数据记录
- File：文件元数据记录
- 关系：
- project <-> dataset
- dataset <-> sample
- dataset <-> file
- sample <-> file

## API 范围

数据接口位于 `/api/v1`，按资源分组：

- `/data/dataset/*`
- `/data/project-dataset/*`
- `/data/file/*`
- `/data/sample/*`
- `/data/dataset-file/*`
- `/data/sample-file/*`
- `/data/dataset-sample/*`

## 典型数据流程

1. 创建项目。
2. 创建数据集。
3. 注册样本与文件。
4. 绑定样本/文件角色（例如 FASTQ_R1、FASTQ_R2）。
5. 建立 dataset 关联关系。
6. 在工作流中按关系解析输入。

## 与工作流的集成

工作流引擎可从托管数据中解析结构化输入：

- 样本集合
- 按样本聚合的角色分组文件
- 独立参考文件

因此可实现模板化工作流，同时保留项目级数据追踪能力。

## 数据一致性说明

- 关系对象依赖后端生成 ID 进行关联。
- 删除与更新会经过 repository/service 层校验。
- 大型项目建议优先使用分页列表接口。

## 最佳实践

1. 批量导入前先定义统一的文件角色体系。
2. 用明确分析目标划分 dataset 边界。
3. 优先使用 project 作用域接口避免跨项目泄漏。
4. 保持工作流输入契约与数据角色命名一致。
