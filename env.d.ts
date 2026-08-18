/// <reference types="vite/client" />

/**
 * 本项目使用的环境变量。
 * 注意：VITE_ 前缀的变量会被内联进构建产物，等同公开，
 * VITE_API_TOKEN 只能放只读 token。
 */
interface ImportMetaEnv {
  /** 请求基地址，默认 /api（同源，由 vite proxy / nginx 转发） */
  readonly VITE_API_BASE?: string
  /** Strapi 只读 token，可选 */
  readonly VITE_API_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 让 TS 认识 .vue 单文件组件的导入
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
