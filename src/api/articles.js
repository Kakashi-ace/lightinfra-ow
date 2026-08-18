import request from '@/utils/request'

/**
 * 文章接口（Strapi v5）。
 * v5 的实体字段是拉平的（无 v4 的 attributes 包装），
 * 且单条查询用 documentId 而非自增 id。
 */

// category 到列表展示标签的映射
function resolveTag(category) {
  return category === 'research' ? '论文' : '文章'
}

// 映射成列表卡片字段。id 取 documentId，供详情页路由与查询使用
function mapArticle(item) {
  return {
    id: item?.documentId ?? String(item?.id ?? ''),
    category: item?.category === 'research' ? 'research' : 'news',
    tag: resolveTag(item?.category),
    date: (item?.publishedAt || item?.createdAt || '').slice(0, 10),
    title: item?.title || '未命名文章',
    excerpt: item?.excerpt || (item?.subtitle ? item.subtitle.slice(0, 80) : ''),
  }
}

/**
 * 映射成详情页结构。正文统一归一为字符串段落数组，兼容 Strapi 里 body 的几种存法：
 *  - Text / Markdown 字段：单个字符串，按空行切段
 *  - 字符串数组：每项一段
 *  - Rich text (blocks)：{type, children:[{text}]}，提取各段文本
 *  - body 缺失时回退 subtitle / excerpt
 */
function mapArticleDetail(item) {
  let paragraphs = []
  const body = item?.body

  if (typeof body === 'string') {
    paragraphs = body
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .filter(Boolean)
  } else if (Array.isArray(body)) {
    if (typeof body[0] === 'string') {
      paragraphs = body
    } else {
      paragraphs = body
        .map((block) =>
          block?.type === 'paragraph'
            ? (block.children || []).map((c) => c.text || '').join('')
            : null,
        )
        .filter(Boolean)
    }
  }

  if (!paragraphs.length && item?.subtitle) paragraphs = [item.subtitle]
  if (!paragraphs.length && item?.excerpt) paragraphs = [item.excerpt]

  return {
    tag: resolveTag(item?.category),
    title: item?.title || '未命名文章',
    date: (item?.publishedAt || item?.createdAt || '').slice(0, 10),
    paragraphs,
  }
}

/**
 * 按分类拉取文章列表。
 * @param {'news'|'research'} category
 * @param {{ signal?: AbortSignal }} options
 */
export async function fetchArticles(category, { signal } = {}) {
  const payload = await request.get('/articles', {
    signal,
    params: {
      'filters[category][$eq]': category,
      'sort[0]': 'publishedAt:desc',
      'populate': 'cover',
    },
  })
  return (payload?.data || []).map(mapArticle)
}

/**
 * 拉取单篇文章详情。
 * @param {string} documentId
 * @param {{ signal?: AbortSignal }} options
 */
export async function fetchArticle(documentId, { signal } = {}) {
  const payload = await request.get(`/articles/${documentId}`, {
    signal,
    params: { populate: 'cover' },
  })
  return payload?.data ? mapArticleDetail(payload.data) : null
}
