import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// 开发期 Strapi 地址。支持环境变量覆盖，默认指向 13370 端口。只用于 vite proxy 转发，不会进入构建产物。
const STRAPI_ORIGIN = process.env.VITE_STRAPI_ORIGIN || 'http://localhost:13370'

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
      // 读图用。/uploads 不是上传接口（那个是 POST /api/upload），
      // 而是 Strapi local provider 的静态媒体目录：文章 cover 返回
      // /uploads/xxx.jpg 这类站内相对路径，不代理会 404 在前端 origin 上。
      '/uploads': { target: STRAPI_ORIGIN, changeOrigin: true }
    }
  }
})
