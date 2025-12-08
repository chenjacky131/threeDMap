import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@Components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
  // 本地开发代理配置
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
  "/api/tiles": {
    // 海图
    target: "https://img.cniship.com",
    changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
  },
    }
  }
})
