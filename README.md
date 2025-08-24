# 2048 Game - 经典数字合成游戏

一个基于React和Vite构建的2048游戏，支持键盘操作和手机触摸操作。

## 🎮 游戏玩法

使用方向键（电脑）或滑动屏幕（手机）移动方块。当两个相同数字的方块接触时，它们会合并成一个！目标是达到2048！

## 🚀 一键部署

### 使用一键部署脚本（推荐）

根据您的操作系统选择相应的命令：

**Windows (PowerShell):**
```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/fantasylincen/Game2048/main/deploy-windows.ps1" -OutFile "deploy.ps1"; .\deploy.ps1
```

**macOS/Linux:**
```bash
curl -O https://raw.githubusercontent.com/fantasylincen/Game2048/main/deploy.sh && chmod +x deploy.sh && ./deploy.sh
```

一键部署脚本将自动：
- 克隆项目到本地
- 检查并安装必要的依赖环境
- 安装项目依赖
- 启动开发服务器
- 自动打开浏览器访问游戏
- 提供停止和重新启动项目的说明

### 手动部署步骤

1. 克隆项目代码：
   ```bash
   git clone https://github.com/fantasylincen/Game2048.git
   cd Game2048
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

### 停止和重新启动项目

- **停止服务器**: 在运行服务器的终端窗口中按 `Ctrl+C`
- **重新启动项目**: 在项目目录中运行 `npm run dev`

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