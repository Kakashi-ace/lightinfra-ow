import request from '@/utils/request'
import type {
  ArticleCategory,
  ArticleDetail,
  ArticleSummary,
  StrapiArticle,
  StrapiResponse,
  StrapiRichTextBlock,
} from '@/types/article'

/**
 * 文章接口（Strapi v5）。
 * v5 的实体字段是拉平的（无 v4 的 attributes 包装），
 * 且单条查询用 documentId 而非自增 id。
 */

interface RequestOptions {
  signal?: AbortSignal
}

// category 到展示标签的映射
function resolveTag(category: string | undefined): string {
  return category === 'research' ? '论文' : '文章'
}

function resolveCategory(category: string | undefined): ArticleCategory {
  return category === 'research' ? 'research' : 'news'
}

/** 映射成列表卡片字段。id 取 documentId，供详情页路由与查询使用 */
function mapArticle(item: StrapiArticle): ArticleSummary {
  return {
    id: item.documentId ?? String(item.id ?? ''),
    category: resolveCategory(item.category),
    tag: resolveTag(item.category),
    date: (item.publishedAt || item.createdAt || '').slice(0, 10),
    title: item.title || '未命名文章',
    excerpt: item.excerpt || (item.subtitle ? item.subtitle.slice(0, 80) : ''),
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
function normalizeParagraphs(body: StrapiArticle['body']): string[] {
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

/** 映射成详情页结构。body 缺失时回退 subtitle / excerpt */
function mapArticleDetail(item: StrapiArticle): ArticleDetail {
  let paragraphs = normalizeParagraphs(item.body)
  if (!paragraphs.length && item.subtitle) paragraphs = [item.subtitle]
  if (!paragraphs.length && item.excerpt) paragraphs = [item.excerpt]

  return {
    tag: resolveTag(item.category),
    title: item.title || '未命名文章',
    date: (item.publishedAt || item.createdAt || '').slice(0, 10),
    paragraphs,
  }
}

/** 按分类拉取文章列表 */
export async function fetchArticles(
  category: ArticleCategory,
  { signal }: RequestOptions = {},
): Promise<ArticleSummary[]> {
  const payload = await request.get<StrapiResponse<StrapiArticle[]>>('/articles', {
    signal,
    params: {
      'filters[category][$eq]': category,
      'sort[0]': 'publishedAt:desc',
      populate: 'cover',
    },
  })
  return (payload?.data ?? []).map(mapArticle)
}

/** 拉取单篇文章详情 */
export async function fetchArticle(
  documentId: string,
  { signal }: RequestOptions = {},
): Promise<ArticleDetail | null> {
  const payload = await request.get<StrapiResponse<StrapiArticle | null>>(
    `/articles/${documentId}`,
    { signal, params: { populate: 'cover' } },
  )
  return payload?.data ? mapArticleDetail(payload.data) : null
}
