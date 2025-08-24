#!/bin/bash

# 2048 Game - macOS/Linux一键部署脚本
# 作者: fantasylincen
# 项目: Game2048

echo "================================"
echo "2048 Game - macOS/Linux一键部署脚本"
echo "================================"

# 检查Node.js是否已安装
echo "检查Node.js是否已安装..."
if ! command -v node &> /dev/null
then
    echo "错误: 未找到Node.js。"
    echo "请先安装Node.js："
    echo "macOS (使用Homebrew):"
    echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    echo "  brew install node"
    echo ""
    echo "Ubuntu/Debian:"
    echo "  sudo apt update"
    echo "  sudo apt install nodejs npm"
    echo ""
    echo "CentOS/RHEL/Fedora:"
    echo "  sudo dnf install nodejs npm"
    exit 1
else
    echo "Node.js已安装: $(node --version)"
fi

# 检查npm是否可用
echo ""
echo "检查npm是否可用..."
if ! command -v npm &> /dev/null
then
    echo "错误: npm不可用。"
    exit 1
else
    echo "npm已安装: $(npm --version)"
fi

# 检查git是否可用
echo ""
echo "检查git是否可用..."
if ! command -v git &> /dev/null
then
    echo "错误: git不可用。请先安装git。"
    exit 1
else
    echo "git已安装: $(git --version)"
fi

# 克隆项目
echo ""
echo "正在克隆项目..."
project_dir="Game2048"
if [ -d "$project_dir" ]; then
    echo "项目目录已存在，正在删除..."
    rm -rf "$project_dir"
fi

git clone https://github.com/fantasylincen/Game2048.git
if [ $? -ne 0 ]; then
    echo "错误: 项目克隆失败。"
    exit 1
fi

# 进入项目目录
cd "$project_dir"

# 安装项目依赖
echo ""
echo "正在安装项目依赖..."
npm install
if [ $? -ne 0 ]; then
    echo "错误: 依赖安装失败。"
    exit 1
fi

echo ""
echo "依赖安装完成!"

# 启动开发服务器
echo ""
echo "正在启动开发服务器..."
echo "请在浏览器中访问 http://localhost:5173"
echo "按 Ctrl+C 停止服务器"

npm run dev

echo ""
echo "脚本执行完成!"