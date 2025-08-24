# 2048 Game - 经典数字合成游戏

一个基于React和Vite构建的2048游戏，支持键盘操作和手机触摸操作。

## 🎮 游戏玩法

使用方向键（电脑）或滑动屏幕（手机）移动方块。当两个相同数字的方块接触时，它们会合并成一个！目标是达到2048！

## 🚀 部署和运行说明

### 系统要求

- Node.js (版本 16 或更高)
- npm 或 yarn 包管理器

### 一键部署脚本

#### Windows系统

1. 下载并安装Node.js：
   - 访问 [Node.js官网](https://nodejs.org/zh-cn/)
   - 下载Windows版本并安装

2. 运行一键部署脚本：
   ```batch
   @echo off
   echo 正在安装依赖...
   npm install
   echo 正在启动开发服务器...
   npm run dev
   ```

#### macOS系统

1. 安装Node.js（推荐使用Homebrew）：
   ```bash
   # 如果没有安装Homebrew，先安装Homebrew
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # 安装Node.js
   brew install node
   ```

2. 运行一键部署脚本：
   ```bash
   #!/bin/bash
   echo "正在安装依赖..."
   npm install
   echo "正在启动开发服务器..."
   npm run dev
   ```

#### Linux系统 (Ubuntu/Debian)

1. 安装Node.js：
   ```bash
   # 更新包管理器
   sudo apt update
   
   # 安装Node.js
   sudo apt install nodejs npm
   ```

2. 运行一键部署脚本：
   ```bash
   #!/bin/bash
   echo "正在安装依赖..."
   npm install
   echo "正在启动开发服务器..."
   npm run dev
   ```

### 手动部署步骤

1. 克隆或下载项目代码：
   ```bash
   git clone <项目地址>
   cd 2048-game
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 构建生产版本：
   ```bash
   npm run build
   ```

5. 预览生产版本：
   ```bash
   npm run preview
   ```

### 访问游戏

开发服务器启动后，默认访问地址为：http://localhost:5173

## 🌐 GitHub Pages 自动部署

本项目支持自动部署到GitHub Pages。配置步骤如下：

### 1. 设置GitHub Actions工作流

在项目根目录创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 2. GitHub Pages设置

1. 在GitHub仓库中，进入 Settings > Pages
2. 在 "Source" 部分，选择 "GitHub Actions"
3. 保存设置

### 3. 触发部署

推送代码到主分支后，GitHub Actions会自动运行部署工作流。您可以在仓库的 "Actions" 选项卡中查看部署进度。

### 4. 访问部署的网站

部署成功后，可以通过 `https://<username>.github.io/<repository-name>/` 访问您的游戏。

## 🔧 自动部署后续操作

1. **首次部署后的操作**：
   - 部署完成后，GitHub会自动创建一个gh-pages分支
   - 在仓库的Settings > Pages中，确保选择了正确的分支和路径
   - 首次部署可能需要几分钟时间生效

2. **更新部署**：
   - 每次推送到主分支（main/master）都会自动触发新的部署
   - 可以在Actions选项卡中查看部署状态
   - 部署成功后，更改将在几分钟内在线上生效

3. **自定义域名**（可选）：
   - 如果要使用自定义域名，请在仓库的Settings > Pages中设置
   - 同时需要在项目的public目录中创建CNAME文件，包含您的域名

4. **查看部署状态**：
   - 在仓库的Actions选项卡中查看部署工作流的运行状态
   - 在Settings > Pages中查看部署的URL和状态

5. **故障排除**：
   - 如果部署失败，请检查Actions中的日志
   - 确保所有依赖项都能正确安装
   - 检查是否有构建错误

## 📁 项目结构

```
src/
├── components/     # React组件
├── hooks/          # 自定义React hooks
├── utils/          # 工具函数
├── App.jsx         # 应用入口
├── main.jsx        # 项目入口
```

## 🛠 技术栈

- React 18
- Vite
- JavaScript (ES6+)
- CSS3

## 📱 特性

- 响应式设计，支持桌面和移动设备
- 键盘控制（方向键）
- 触摸控制（滑动操作）
- 音效支持
- 本地存储最高分
- 游戏状态管理（胜利/失败检测）

## 🎵 音效

游戏包含音效功能，默认开启。可以通过游戏界面上的音效按钮切换音效开关。

## 📊 数据存储

游戏使用localStorage存储：
- 最高分记录
- 音效设置状态

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。