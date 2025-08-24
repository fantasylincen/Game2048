#!/bin/bash

echo "================================"
echo "2048 Game - Linux部署脚本"
echo "================================"

echo "检查Node.js是否已安装..."
if ! command -v node &> /dev/null
then
    echo "错误: 未找到Node.js。请先安装Node.js："
    echo "Ubuntu/Debian系统:"
    echo "  sudo apt update"
    echo "  sudo apt install nodejs npm"
    echo ""
    echo "CentOS/RHEL/Fedora系统:"
    echo "  sudo dnf install nodejs npm"
    exit 1
else
    echo "Node.js已安装: $(node --version)"
fi

echo ""
echo "检查npm是否可用..."
if ! command -v npm &> /dev/null
then
    echo "错误: npm不可用。"
    exit 1
else
    echo "npm已安装: $(npm --version)"
fi

echo ""
echo "正在安装项目依赖..."
npm install
if [ $? -ne 0 ]; then
    echo "错误: 依赖安装失败。"
    exit 1
fi

echo ""
echo "依赖安装完成!"

echo ""
echo "正在启动开发服务器..."
echo "请在浏览器中访问 http://localhost:5173"
npm run dev