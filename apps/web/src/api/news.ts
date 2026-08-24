import request from '@/utils/request'
import { resolveCoverUrl } from './strapiMedia'
import type { NewsSummary, StrapiNewsArticle } from '@/types/news'
import type { StrapiResponse } from '@/types/strapi'

/**
 * 新闻文章接口（Strapi v5）。
 * 新闻只有列表，没有站内详情页——点击后直接跳外部链接。
 */

interface RequestOptions {
  signal?: AbortSignal
  /** 页码，从 1 开始 */
  page?: number
}

/** 每页条数，对应列表页 3 列网格的 3 行 */
const PAGE_SIZE = 9

export interface NewsListPage {
  items: NewsSummary[]
  /** 是否还有下一页 */
  hasMore: boolean
}

/** 映射成列表卡片字段。id 取 documentId */
function mapNews(item: StrapiNewsArticle): NewsSummary {
  return {
    id: item.documentId ?? String(item.id ?? ''),
    tag: '资讯',
    date: (item.publishedAt || item.createdAt || '').slice(0, 10),
    title: item.title || '未命名新闻',
    excerpt: item.excerpt || '',
    cover: resolveCoverUrl(item.cover),
    coverAlt: item.cover?.alternativeText || '',
    externalUrl: item.externalUrl || '#',
    featured: Boolean(item.featured),
  }
}

/** 拉取新闻列表，按页返回 */
export async function fetchNewsList({ signal, page = 1 }: RequestOptions = {}): Promise<NewsListPage> {
  const payload = await request.get<StrapiResponse<StrapiNewsArticle[]>>('/news-articles', {
    signal,
    params: {
      'sort[0]': 'order:asc',
      'sort[1]': 'publishedAt:desc',
      populate: 'cover',
      'pagination[page]': page,
      'pagination[pageSize]': PAGE_SIZE,
    },
  })
  const items = (payload?.data ?? []).map(mapNews)
  const pageCount = payload?.meta?.pagination?.pageCount ?? 1
  return { items, hasMore: page < pageCount }
}
