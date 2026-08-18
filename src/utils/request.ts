import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

/** 归一化后的错误类别。canceled 不是真正的失败，调用方应静默忽略 */
export type ApiErrorKind = 'network' | 'timeout' | 'http' | 'canceled' | 'unknown'

interface ApiErrorInit {
  kind: ApiErrorKind
  status?: number | null
  message: string
  raw?: unknown
}

/**
 * 归一化后的请求错误。
 * kind 让调用方区分处置方式，其中 canceled 由路由切换主动 abort 触发。
 */
export class ApiError extends Error {
  readonly kind: ApiErrorKind
  readonly status: number | null
  readonly raw: unknown

  constructor({ kind, status = null, message, raw = null }: ApiErrorInit) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
    this.raw = raw
  }

  get isCanceled(): boolean {
    return this.kind === 'canceled'
  }
}

// Strapi 的错误体形如 { error: { message } }，取不到就退回 HTTP 状态描述
function resolveHttpMessage(response: { status?: number; data?: unknown }): string {
  const data = response?.data as
    | { error?: { message?: unknown }; message?: unknown }
    | undefined
  const detail = data?.error?.message ?? data?.message
  if (typeof detail === 'string' && detail) return detail
  return `请求失败（HTTP ${response?.status ?? '未知'}）`
}

/** 把 axios 抛出的各类错误统一成 ApiError */
export function toApiError(err: unknown): ApiError {
  if (axios.isCancel(err)) {
    return new ApiError({ kind: 'canceled', message: '请求已取消', raw: err })
  }

  if (axios.isAxiosError(err)) {
    if (err.code === 'ERR_CANCELED') {
      return new ApiError({ kind: 'canceled', message: '请求已取消', raw: err })
    }
    if (err.code === 'ECONNABORTED') {
      return new ApiError({ kind: 'timeout', message: '请求超时', raw: err })
    }
    if (err.response) {
      return new ApiError({
        kind: 'http',
        status: err.response.status,
        message: resolveHttpMessage(err.response),
        raw: err,
      })
    }
    // 有 request 无 response：断网、DNS 失败、被 CORS 拦截等
    if (err.request) {
      return new ApiError({ kind: 'network', message: '网络不可用或服务无响应', raw: err })
    }
  }

  const message = err instanceof Error ? err.message : '未知错误'
  return new ApiError({ kind: 'unknown', message, raw: err })
}

/**
 * 请求方法的类型门面。
 * 响应拦截器里已经剥掉了 axios 的 AxiosResponse 外层直接返回 res.data，
 * 所以运行时返回的是 T 本身，而非 axios 声明的 AxiosResponse<T>。
 * 这里显式声明真实形状，避免调用方拿到错误的类型提示。
 */
export interface HttpClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}

/**
 * 全局 axios 实例。
 * 只负责传输层：baseURL、超时、鉴权头、错误归一。
 * 不含任何后端响应形状的知识，那部分在 src/api/ 各资源模块里处理。
 */
const instance: AxiosInstance = axios.create({
  // 默认同源：开发期由 vite proxy 转发到 Strapi，线上由 nginx 反代
  baseURL: import.meta.env.VITE_API_BASE ?? '/api',
  timeout: 10000,
  headers: { Accept: 'application/json' },
})

instance.interceptors.request.use((config) => {
  // 注意：VITE_ 前缀的变量会被内联进构建产物，等同公开。
  // 这里只允许放只读 token；需要写权限的接口必须走后端代理。
  const token = import.meta.env.VITE_API_TOKEN
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

instance.interceptors.response.use(
  // 只剥 axios 自身的一层 data，保留 Strapi 的 { data, meta } 供上层取分页
  (res) => res.data,
  (err: unknown) => Promise.reject(toApiError(err)),
)

// 拦截器改变了返回形状，据实声明为 HttpClient
const request = instance as unknown as HttpClient

export default request
