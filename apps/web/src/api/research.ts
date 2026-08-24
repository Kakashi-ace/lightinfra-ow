import request from '@/utils/request'
import { resolveCoverUrl } from './strapiMedia'
import type { ResearchDetail, ResearchSummary, StrapiResearchArticle } from '@/types/research'
import type { StrapiResponse, StrapiRichTextBlock } from '@/types/strapi'

/**
 * 研究文章接口（Strapi v5）。
 * v5 的实体字段是拉平的（无 v4 的 attributes 包装），
 * 且单条查询用 documentId 而非自增 id。
 */

interface RequestOptions {
  signal?: AbortSignal
  /** 页码，从 1 开始 */
  page?: number
}

/** 每页条数，对应列表页 3 列网格的 3 行 */
const PAGE_SIZE = 9

export interface ResearchListPage {
  items: ResearchSummary[]
  /** 是否还有下一页 */
  hasMore: boolean
}

/** 映射成列表卡片字段。id 取 documentId，供详情页路由与查询使用 */
function mapResearch(item: StrapiResearchArticle): ResearchSummary {
  return {
    id: item.documentId ?? String(item.id ?? ''),
    tag: '论文',
    date: (item.publishedAt || item.createdAt || '').slice(0, 10),
    title: item.title || '未命名文章',
    excerpt: item.excerpt || '',
    cover: resolveCoverUrl(item.cover),
    coverAlt: item.cover?.alternativeText || '',
    featured: Boolean(item.featured),
  }
}

/** 从 rich text (blocks) 中提取各段纯文本 */
function extractBlockParagraphs(blocks: StrapiRichTextBlock[]): string[] {
  return blocks
    .map((block) =>
      block?.type === 'paragraph'
        ? (block.children ?? []).map((c) => c.text ?? '').join('')
        : null,
    )
    .filter((text): text is string => Boolean(text))
}

/**
 * 把 body 归一为字符串段落数组，兼容 Strapi 里的几种存法：
 *  - Text / Markdown 字段：单个字符串，按空行切段
 *  - 字符串数组：每项一段
 *  - Rich text (blocks)：{type, children:[{text}]}
 */
function normalizeParagraphs(body: StrapiResearchArticle['body']): string[] {
  if (typeof body === 'string') {
    return body
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .filter(Boolean)
  }

  if (Array.isArray(body)) {
    if (body.every((item): item is string => typeof item === 'string')) {
      return body
    }
    return extractBlockParagraphs(body as StrapiRichTextBlock[])
  }

  return []
}

/** 映射成详情页结构。body 缺失时回退 excerpt */
function mapResearchDetail(item: StrapiResearchArticle): ResearchDetail {
  let paragraphs = normalizeParagraphs(item.body)
  if (!paragraphs.length && item.excerpt) paragraphs = [item.excerpt]

  return {
    tag: '论文',
    title: item.title || '未命名文章',
    date: (item.publishedAt || item.createdAt || '').slice(0, 10),
    paragraphs,
  }
}

/** 拉取研究列表，按页返回 */
export async function fetchResearchList({ signal, page = 1 }: RequestOptions = {}): Promise<ResearchListPage> {
  const payload = await request.get<StrapiResponse<StrapiResearchArticle[]>>('/research-articles', {
    signal,
    params: {
      'sort[0]': 'order:asc',
      'sort[1]': 'publishedAt:desc',
      populate: 'cover',
      'pagination[page]': page,
      'pagination[pageSize]': PAGE_SIZE,
    },
  })
  const items = (payload?.data ?? []).map(mapResearch)
  const pageCount = payload?.meta?.pagination?.pageCount ?? 1
  return { items, hasMore: page < pageCount }
}

/** 拉取单篇研究详情 */
export async function fetchResearchDetail(
  documentId: string,
  { signal }: RequestOptions = {},
): Promise<ResearchDetail | null> {
  // 详情页头部是渐变背景，不渲染封面，所以不 populate
  const payload = await request.get<StrapiResponse<StrapiResearchArticle | null>>(
    `/research-articles/${documentId}`,
    { signal },
  )
  return payload?.data ? mapResearchDetail(payload.data) : null
}
