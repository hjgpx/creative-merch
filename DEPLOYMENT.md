# 部署指南 / Deployment Guide

## 推送到 GitHub / Push to GitHub

### 1. 在 GitHub 上创建新仓库
1. 登录 GitHub 账户
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库名称：`creative-shop` 或你喜欢的名称
4. 选择 Public 或 Private
5. 不要初始化 README、.gitignore 或 license（项目中已有这些文件）
6. 点击 "Create repository"

### 2. 在本地推送代码

首先下载项目文件到本地，然后在项目根目录执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: Creative products e-commerce website"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/yourusername/creative-shop.git

# 推送到 GitHub
git push -u origin main
```

### 3. 环境变量设置

如果部署到生产环境，需要设置以下环境变量：

```bash
NODE_ENV=production
PORT=5000
```

## 部署选项 / Deployment Options

### 1. Vercel 部署（推荐）

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账户登录
3. 点击 "New Project"
4. 选择你的 creative-shop 仓库
5. 配置设置：
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. 点击 "Deploy"

### 2. Netlify 部署

1. 访问 [netlify.com](https://netlify.com)
2. 使用 GitHub 账户登录
3. 点击 "New site from Git"
4. 选择 GitHub 并授权
5. 选择你的 creative-shop 仓库
6. 配置设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
7. 点击 "Deploy site"

### 3. Railway 部署

1. 访问 [railway.app](https://railway.app)
2. 使用 GitHub 账户登录
3. 点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 选择你的 creative-shop 仓库
6. Railway 会自动检测 Node.js 项目并部署

### 4. Render 部署

1. 访问 [render.com](https://render.com)
2. 使用 GitHub 账户登录
3. 点击 "New +"，选择 "Web Service"
4. 连接你的 GitHub 仓库
5. 配置设置：
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. 点击 "Create Web Service"

## 本地开发 / Local Development

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问应用
# 打开浏览器访问 http://localhost:5000
```

## 生产构建 / Production Build

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目特性 / Features

- 响应式设计，支持移动端和桌面端
- 完整的购物车功能
- 产品搜索和筛选
- 订单管理系统
- 现代化的 UI/UX 设计
- TypeScript 类型安全
- 快速的 Vite 构建工具

## 技术栈 / Tech Stack

- **前端**: React 18 + TypeScript + Vite
- **后端**: Express.js + Node.js
- **样式**: Tailwind CSS + Radix UI
- **状态管理**: Zustand
- **数据获取**: TanStack Query
- **表单**: React Hook Form + Zod