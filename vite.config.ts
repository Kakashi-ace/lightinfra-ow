import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// 开发期 Strapi 地址。只用于 vite proxy 转发，不会进入构建产物。
const STRAPI_ORIGIN = 'http://localhost:1337'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 前端始终同源请求，由代理转发，免去 Strapi 配置 CORS
    proxy: {
      '/api': { target: STRAPI_ORIGIN, changeOrigin: true },
      // Strapi 上传的媒体文件返回相对路径，一并代理
      '/uploads': { target: STRAPI_ORIGIN, changeOrigin: true }
    }
  }
})
