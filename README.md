# Cane 甘蔗 - 综合信息门户系统

> 基于 Vue.js 的前端集成门户系统，旨在提供统一的信息展示、资源管理与用户交互功能。

## 项目简介

Cane（甘蔗）是一个综合信息门户系统，提供统一的后台管理界面，实现内容资源（新闻、图片、问答等）的分类展示与管理，支持用户权限控制与登录状态管理，并集成了富文本编辑器和文件上传功能。

### 项目特性

- **统一管理界面**：提供用户友好的后台管理面板
- **内容管理**：支持新闻、资源、联系信息等内容的发布与维护
- **权限控制**：基于 RBAC 的用户角色权限分配系统
- **敏感词检测**：支持敏感内容识别与过滤
- **文件上传**：支持图片等资源上传至 MinIO 存储
- **前台展示**：首页、新闻详情、资源中心、联系我们等页面
- **富文本编辑**：集成 wangeditor 实现内容编辑功能

## 技术栈

- **前端框架**: Vue 2.6.14
- **UI 框架**: Element UI 2.15.14
- **构建工具**: Vue CLI 5.0.0
- **路由管理**: vue-router 3.6.5
- **状态管理**: vuex 3.6.2
- **HTTP 客户端**: axios 1.6.8
- **富文本编辑器**: wangeditor v5
- **CSS 预处理器**: Sass
- **代码校验**: ESLint + @babel/eslint-parser

## 快速开始

### 环境要求

- Node.js (>=14.x)
- npm 或 yarn

### 安装依赖

```bash
# 进入项目目录
cd cane

# 使用 npm 安装依赖
npm install

# 或使用 yarn 安装依赖
yarn install
```

### 开发环境运行

```bash
# 启动开发服务器，运行在 http://localhost:8234
npm serve

# 或使用 yarn
yarn serve
```

### 构建生产版本

```bash
# 构建用于生产的静态文件
npm run build

# 或使用 yarn
yarn build
```

### 代码校验与修复

```bash
# 检查并修复代码问题
npm run lint

# 或使用 yarn
yarn lint
```

## 项目结构

```
cane/
├── public/                 # 静态资源文件
├── src/
│   ├── api/               # API 接口定义
│   ├── components/        # 公共组件
│   ├── router/            # 路由配置
│   ├── store/             # Vuex 状态管理
│   ├── utils/             # 工具函数
│   ├── views/             # 页面组件
│   ├── App.vue            # 根组件
│   └── main.js            # 应用入口
├── package.json           # 项目配置
└── vue.config.js          # Vue CLI 配置
```

## 功能模块

### 后台管理功能

- **用户管理**: 用户增删改查、角色权限分配
- **菜单与角色管理**: 基于 RBAC 的权限控制系统
- **内容管理**: 
  - 新闻发布与管理
  - 资源分类管理
  - 图片资源管理
  - 无敏资源管理
- **联系信息管理**: 联系中心、问题反馈
- **登录记录管理**: 用户访问记录追踪

### 前台展示功能

- **首页**: 系统概览展示
- **新闻中心**: 新闻列表与详情展示
- **资源中心**: 分类资源展示（图片、文档、无敏资源等）
- **智能问答**: 问答系统
- **联系我们**: 联系方式与反馈
- **用户中心**: 用户个人信息管理

## 配置说明

### 开发服务器配置

开发服务器运行在端口 8234 上，可在 [vue.config.js](./vue.config.js) 中修改配置。

### API 接口

项目通过 [api](./src/api) 目录下的模块与后端进行通信，包含：
- [userAndPer](./src/api/userAndPer): 用户与权限相关接口
- [caneApi](./src/api/caneApi.js): 甘蔗系统核心接口
- [caneQa](./src/api/caneQa.js): 问答系统接口
- [minIOApi](./src/api/minIOApi.js): 文件上传接口
- 等等

## 部署说明

1. 运行 `npm run build` 或 `yarn build` 生成生产环境静态文件
2. 将 `dist` 目录下的文件部署到 Web 服务器（如 Nginx、Apache）
3. 配置服务器以支持单页应用的路由

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助我们改进这个项目！

## 许可证

[MIT](./LICENSE)

## 已知问题

- 项目基于 Vue 2.x，长期演进建议升级至 Vue 3
- Element UI 已停止更新，建议考虑迁移到 Element Plus
- 项目缺少单元测试和端到端测试配置