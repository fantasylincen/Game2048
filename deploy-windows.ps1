# 2048 Game - Windows一键部署脚本
# 作者: fantasylincen
# 项目: Game2048

Write-Host "================================" -ForegroundColor Green
Write-Host "2048 Game - Windows一键部署脚本" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# 检查是否以管理员权限运行
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "警告: 建议以管理员权限运行此脚本以确保所有功能正常工作。" -ForegroundColor Yellow
}

# 检查Node.js是否已安装
Write-Host "检查Node.js是否已安装..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "Node.js已安装: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "错误: 未找到Node.js。请先访问 https://nodejs.org/ 下载并安装Node.js。" -ForegroundColor Red
    Write-Host "按任意键退出..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# 检查npm是否可用
Write-Host "检查npm是否可用..." -ForegroundColor Cyan
try {
    $npmVersion = npm --version
    Write-Host "npm已安装: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "错误: npm不可用。" -ForegroundColor Red
    Write-Host "按任意键退出..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# 克隆项目
Write-Host "正在克隆项目..." -ForegroundColor Cyan
$projectDir = "Game2048"
if (Test-Path $projectDir) {
    Write-Host "项目目录已存在，正在删除..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $projectDir
}
git clone https://github.com/fantasylincen/Game2048.git
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 项目克隆失败。" -ForegroundColor Red
    Write-Host "按任意键退出..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# 进入项目目录
Set-Location $projectDir

# 安装项目依赖
Write-Host "正在安装项目依赖..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 依赖安装失败。" -ForegroundColor Red
    Write-Host "按任意键退出..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host "依赖安装完成!" -ForegroundColor Green

# 启动开发服务器
Write-Host "正在启动开发服务器..." -ForegroundColor Cyan
Write-Host "请在浏览器中访问 http://localhost:5173" -ForegroundColor Yellow
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Yellow

npm run dev

Write-Host "脚本执行完成!" -ForegroundColor Green
Write-Host "按任意键退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")