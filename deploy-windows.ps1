# 2048 Game - Windows一键部署脚本
# 作者: fantasylincen
# 项目: Game2048

# 检测系统语言
$systemLanguage = (Get-Culture).Name
if ($systemLanguage -like "zh*") {
    $isChinese = $true
} else {
    $isChinese = $false
}

# 根据语言设置显示文本
if ($isChinese) {
    $messages = @{
        welcome = "================================`n2048 Game - Windows一键部署脚本`n================================"
        checkNode = "检查Node.js是否已安装..."
        nodeInstalled = "Node.js已安装: "
        nodeNotFound = "错误: 未找到Node.js。请先访问 https://nodejs.org/ 下载并安装Node.js。"
        checkNpm = "检查npm是否可用..."
        npmInstalled = "npm已安装: "
        npmNotFound = "错误: npm不可用。"
        cloning = "正在克隆项目..."
        dirExists = "项目目录已存在，正在删除..."
        cloneFailed = "错误: 项目克隆失败。"
        installingDeps = "正在安装项目依赖..."
        installFailed = "错误: 依赖安装失败。"
        installSuccess = "依赖安装完成!"
        startingServer = "正在启动开发服务器..."
        accessInfo = "请在浏览器中访问 http://localhost:5173"
        stopInfo = "按 Ctrl+C 停止服务器"
        restartInfo = "停止服务器后，运行 'npm run dev' 命令重新启动项目"
        complete = "脚本执行完成!"
        exitPrompt = "按任意键退出..."
        adminWarning = "警告: 建议以管理员权限运行此脚本以确保所有功能正常工作。"
    }
} else {
    $messages = @{
        welcome = "================================`n2048 Game - Windows One-Click Deployment Script`n================================"
        checkNode = "Checking if Node.js is installed..."
        nodeInstalled = "Node.js is installed: "
        nodeNotFound = "Error: Node.js not found. Please visit https://nodejs.org/ to download and install Node.js first."
        checkNpm = "Checking if npm is available..."
        npmInstalled = "npm is installed: "
        npmNotFound = "Error: npm is not available."
        cloning = "Cloning the project..."
        dirExists = "Project directory already exists, deleting..."
        cloneFailed = "Error: Failed to clone the project."
        installingDeps = "Installing project dependencies..."
        installFailed = "Error: Failed to install dependencies."
        installSuccess = "Dependencies installed successfully!"
        startingServer = "Starting the development server..."
        accessInfo = "Please access http://localhost:5173 in your browser"
        stopInfo = "Press Ctrl+C to stop the server"
        restartInfo = "After stopping the server, run 'npm run dev' command to restart the project"
        complete = "Script execution completed!"
        exitPrompt = "Press any key to exit..."
        adminWarning = "Warning: It is recommended to run this script with administrator privileges to ensure all functions work properly."
    }
}

Write-Host $messages.welcome -ForegroundColor Green

# 检查是否以管理员权限运行
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host $messages.adminWarning -ForegroundColor Yellow
}

# 检查Node.js是否已安装
Write-Host $messages.checkNode -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host ($messages.nodeInstalled + $nodeVersion) -ForegroundColor Green
} catch {
    Write-Host $messages.nodeNotFound -ForegroundColor Red
    Write-Host $messages.exitPrompt
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# 检查npm是否可用
Write-Host $messages.checkNpm -ForegroundColor Cyan
try {
    $npmVersion = npm --version
    Write-Host ($messages.npmInstalled + $npmVersion) -ForegroundColor Green
} catch {
    Write-Host $messages.npmNotFound -ForegroundColor Red
    Write-Host $messages.exitPrompt
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# 克隆项目
Write-Host $messages.cloning -ForegroundColor Cyan
$projectDir = "Game2048"
if (Test-Path $projectDir) {
    Write-Host $messages.dirExists -ForegroundColor Yellow
    Remove-Item -Recurse -Force $projectDir
}
git clone https://github.com/fantasylincen/Game2048.git
if ($LASTEXITCODE -ne 0) {
    Write-Host $messages.cloneFailed -ForegroundColor Red
    Write-Host $messages.exitPrompt
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# 进入项目目录
Set-Location $projectDir

# 安装项目依赖
Write-Host $messages.installingDeps -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host $messages.installFailed -ForegroundColor Red
    Write-Host $messages.exitPrompt
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host $messages.installSuccess -ForegroundColor Green

# 启动开发服务器（在后台）
Write-Host $messages.startingServer -ForegroundColor Cyan
Write-Host $messages.accessInfo -ForegroundColor Yellow
Write-Host $messages.stopInfo -ForegroundColor Yellow
Write-Host $messages.restartInfo -ForegroundColor Yellow

# 自动打开浏览器
Start-Process "http://localhost:5173"

# 启动服务器
npm run dev

Write-Host $messages.complete -ForegroundColor Green
Write-Host $messages.exitPrompt
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")