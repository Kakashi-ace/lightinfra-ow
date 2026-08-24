/**
 * Strapi rich text (blocks) 的段落块
 */
export interface StrapiRichTextBlock {
  type?: string
  children?: Array<{ text?: string }>
}

/**
 * Strapi 媒体字段。
 * local provider 返回站内相对路径（/uploads/xxx.jpg），
 * 换成 S3/OSS 等 provider 后会变成绝对 URL，两种都要能用。
 */
export interface StrapiMedia {
  url?: string
  alternativeText?: string | null
  /** 上传图片时自动生成的尺寸变体，小图不一定齐全 */
  formats?: Partial<Record<StrapiMediaFormat, { url?: string }>> | null
}

/** Strapi 默认生成的图片尺寸变体，由小到大 */
export type StrapiMediaFormat = 'thumbnail' | 'small' | 'medium' | 'large'

/** Strapi v5 的响应包装 */
export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
