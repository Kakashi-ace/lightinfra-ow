import type { StrapiMedia, StrapiRichTextBlock } from './strapi'

/** 研究列表卡片渲染所需的字段 */
export interface ResearchSummary {
  /** Strapi v5 的 documentId，用于详情页路由与查询 */
  id: string
  /** 展示用标签，固定为"论文" */
  tag: string
  /** YYYY-MM-DD */
  date: string
  title: string
  excerpt: string
  /** 封面图 URL。CMS 未配图时为 null，由组件回退到占位图 */
  cover: string | null
  /** 封面图 alt。取 Strapi 的 alternativeText，缺省时为空串 */
  coverAlt: string
  /** 是否为编辑标记的头条；同一时间 CMS 只保证最多一条为 true */
  featured: boolean
}

/** 研究详情页渲染所需的字段 */
export interface ResearchDetail {
  tag: string
  title: string
  /** YYYY-MM-DD */
  date: string
  /** 归一化后的正文段落 */
  paragraphs: string[]
}

/** 研究列表页头条 */
export interface FeaturedResearch {
  id: string
  tag: string
  title: string
  date: string
  /** 封面图 URL。CMS 未配图时为 null，由组件回退到占位图 */
  cover: string | null
  /** 封面图 alt。取 Strapi 的 alternativeText，缺省时为空串 */
  coverAlt: string
}

/** 研究保底数据 */
export interface ResearchFallback {
  featured: FeaturedResearch
  list: ResearchSummary[]
}

/**
 * Strapi v5 返回的 research-article 实体（字段已拉平，无 v4 的 attributes 包装）。
 * 只声明本项目实际读取的字段，其余用索引签名兜住。
 */
export interface StrapiResearchArticle {
  id?: number
  documentId?: string
  title?: string
  excerpt?: string
  /** Text/Markdown 为字符串，rich text (blocks) 为块数组 */
  body?: string | string[] | StrapiRichTextBlock[]
  publishedAt?: string
  createdAt?: string
  /** 需 populate=cover 才会返回；未配图时为 null */
  cover?: StrapiMedia | null
  /** 编辑标记的头条，用于列表页/首页选 hero；同一时间最多一条为 true */
  featured?: boolean
  /** 人工排序，越小越靠前；未设置时按 publishedAt 倒序兜底 */
  order?: number | null
  [key: string]: unknown
}
