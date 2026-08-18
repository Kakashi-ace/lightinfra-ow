/** 文章分类。与 Strapi 中 article.category 字段取值一致 */
export type ArticleCategory = 'news' | 'research'

/** 列表卡片渲染所需的文章字段 */
export interface ArticleSummary {
  /** Strapi v5 的 documentId，用于详情页路由与查询 */
  id: string
  category: ArticleCategory
  /** 展示用标签，由 category 推导（文章 / 论文） */
  tag: string
  /** YYYY-MM-DD */
  date: string
  title: string
  excerpt: string
  /** 封面图 URL。CMS 未配图时为 null，由组件回退到占位图 */
  cover: string | null
  /** 封面图 alt。取 Strapi 的 alternativeText，缺省时为空串 */
  coverAlt: string
}

/** 详情页渲染所需的文章字段 */
export interface ArticleDetail {
  tag: string
  title: string
  /** YYYY-MM-DD */
  date: string
  /** 归一化后的正文段落 */
  paragraphs: string[]
}

/** 列表页头条 */
export interface FeaturedArticle {
  id: string
  tag: string
  title: string
  date: string
}

/** 单个分类的保底数据 */
export interface ArticleFallback {
  featured: FeaturedArticle
  list: ArticleSummary[]
}

/**
 * Strapi v5 返回的文章实体（字段已拉平，无 v4 的 attributes 包装）。
 * 只声明本项目实际读取的字段，其余用索引签名兜住。
 */
export interface StrapiArticle {
  id?: number
  documentId?: string
  title?: string
  subtitle?: string
  excerpt?: string
  /** Text/Markdown 为字符串，rich text (blocks) 为块数组 */
  body?: string | string[] | StrapiRichTextBlock[]
  category?: string
  publishedAt?: string
  createdAt?: string
  /** 需 populate=cover 才会返回；未配图时为 null */
  cover?: StrapiMedia | null
  [key: string]: unknown
}

/** Strapi rich text (blocks) 的段落块 */
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
