import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 5173,
    strictPort: true,
    // 明确允许的主机名
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '192.168.0.102',
      '240.0.0.2',
      'lincendemacbook-pro.local',
      'LinCendeMacBook-Pro.local'
    ]
  }
})
