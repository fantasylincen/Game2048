#!/bin/bash

# 2048 Game - macOS/Linux一键部署脚本
# 作者: fantasylincen
# 项目: Game2048

# 检测系统语言
if [[ $LANG == zh* ]]; then
    isChinese=true
else
    isChinese=false
fi

# 根据语言设置显示文本
if [ "$isChinese" = true ]; then
    welcome="================================
2048 Game - macOS/Linux一键部署脚本
================================"
    checkNode="检查Node.js是否已安装..."
    nodeInstalled="Node.js已安装: "
    nodeNotFound="错误: 未找到Node.js。
请先安装Node.js：
macOS (使用Homebrew):
  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"
  brew install node

Ubuntu/Debian:
  sudo apt update
  sudo apt install nodejs npm

CentOS/RHEL/Fedora:
  sudo dnf install nodejs npm"
    checkNpm="检查npm是否可用..."
    npmInstalled="npm已安装: "
    npmNotFound="错误: npm不可用。"
    checkGit="检查git是否可用..."
    gitInstalled="git已安装: "
    gitNotFound="错误: git不可用。请先安装git。"
    cloning="正在克隆项目..."
    dirExists="项目目录已存在，正在删除..."
    cloneFailed="错误: 项目克隆失败。"
    installingDeps="正在安装项目依赖..."
    installFailed="错误: 依赖安装失败。"
    installSuccess="依赖安装完成!"
    startingServer="正在启动开发服务器..."
    accessInfo="请在浏览器中访问 http://localhost:5173"
    stopInfo="按 Ctrl+C 停止服务器"
    restartInfo="停止服务器后，运行 'npm run dev' 命令重新启动项目"
    complete="脚本执行完成!"
    openingBrowser="正在打开浏览器..."
else
    welcome="================================
2048 Game - macOS/Linux One-Click Deployment Script
================================"
    checkNode="Checking if Node.js is installed..."
    nodeInstalled="Node.js is installed: "
    nodeNotFound="Error: Node.js not found.
Please install Node.js first:
macOS (using Homebrew):
  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"
  brew install node

Ubuntu/Debian:
  sudo apt update
  sudo apt install nodejs npm

CentOS/RHEL/Fedora:
  sudo dnf install nodejs npm"
    checkNpm="Checking if npm is available..."
    npmInstalled="npm is installed: "
    npmNotFound="Error: npm is not available."
    checkGit="Checking if git is available..."
    gitInstalled="git is installed: "
    gitNotFound="Error: git is not available. Please install git first."
    cloning="Cloning the project..."
    dirExists="Project directory already exists, deleting..."
    cloneFailed="Error: Failed to clone the project."
    installingDeps="Installing project dependencies..."
    installFailed="Error: Failed to install dependencies."
    installSuccess="Dependencies installed successfully!"
    startingServer="Starting the development server..."
    accessInfo="Please access http://localhost:5173 in your browser"
    stopInfo="Press Ctrl+C to stop the server"
    restartInfo="After stopping the server, run 'npm run dev' command to restart the project"
    complete="Script execution completed!"
    openingBrowser="Opening browser..."
fi

echo "$welcome"

# 检查Node.js是否已安装
echo ""
echo "$checkNode"
if ! command -v node &> /dev/null
then
    echo "$nodeNotFound"
    exit 1
else
    echo "$nodeInstalled$(node --version)"
fi

# 检查npm是否可用
echo ""
echo "$checkNpm"
if ! command -v npm &> /dev/null
then
    echo "$npmNotFound"
    exit 1
else
    echo "$npmInstalled$(npm --version)"
fi

# 检查git是否可用
echo ""
echo "$checkGit"
if ! command -v git &> /dev/null
then
    echo "$gitNotFound"
    exit 1
else
    echo "$gitInstalled$(git --version)"
fi

# 克隆项目
echo ""
echo "$cloning"
project_dir="Game2048"
if [ -d "$project_dir" ]; then
    echo "$dirExists"
    rm -rf "$project_dir"
fi

git clone https://github.com/fantasylincen/Game2048.git
if [ $? -ne 0 ]; then
    echo "$cloneFailed"
    exit 1
fi

# 进入项目目录
cd "$project_dir"

# 安装项目依赖
echo ""
echo "$installingDeps"
npm install
if [ $? -ne 0 ]; then
    echo "$installFailed"
    exit 1
fi

echo ""
echo "$installSuccess"

# 启动开发服务器
echo ""
echo "$startingServer"
echo "$accessInfo"
echo "$stopInfo"
echo "$restartInfo"

# 自动打开浏览器
echo ""
echo "$openingBrowser"

# 根据不同操作系统打开浏览器
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open http://localhost:5173
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:5173
    elif command -v gnome-open &> /dev/null; then
        gnome-open http://localhost:5173
    elif command -v kde-open &> /dev/null; then
        kde-open http://localhost:5173
    else
        echo "无法自动打开浏览器，请手动访问 http://localhost:5173"
    fi
fi

npm run dev

echo ""
echo "$complete"