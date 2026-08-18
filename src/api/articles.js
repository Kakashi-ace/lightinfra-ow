// Strapi 文章接口：列表页与详情页共用的请求与字段映射
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:1337'

// category 到列表展示标签的映射
function resolveTag(category) {
  return category === 'research' ? '论文' : '文章'
}

// 把一条 Strapi article {id, attributes} 映射成列表卡片字段
export function mapArticle(item) {
  const attrs = item?.attributes || {}
  return {
    id: String(item?.id ?? ''),
    category: attrs.category === 'research' ? 'research' : 'news',
    tag: resolveTag(attrs.category),
    date: (attrs.publishedAt || attrs.createdAt || '').slice(0, 10),
    title: attrs.title || '未命名文章',
    excerpt: attrs.excerpt || (attrs.subtitle ? attrs.subtitle.slice(0, 80) : ''),
  }
}

// 把一条 Strapi article 映射成详情页渲染结构。
// 正文统一归一为字符串段落数组：
//  - body 为字符串数组（每段一个字符串）时直接使用
//  - body 为富文本 blocks（常见 {type, children:[{text}]}）时提取各段文本
//  - body 缺失时回退使用 subtitle/excerpt
export function mapArticleDetail(item) {
  const attrs = item?.attributes || {}
  let paragraphs = []
  if (Array.isArray(attrs.body)) {
    if (typeof attrs.body[0] === 'string') {
      paragraphs = attrs.body
    } else {
      paragraphs = attrs.body
        .map((block) => {
          if (block?.type === 'paragraph') {
            return (block.children || []).map((c) => c.text || '').join('')
          }
          return null
        })
        .filter(Boolean)
    }
  }
  if (!paragraphs.length && attrs.subtitle) paragraphs = [attrs.subtitle]
  if (!paragraphs.length && attrs.excerpt) paragraphs = [attrs.excerpt]

  return {
    tag: resolveTag(attrs.category),
    title: attrs.title || '未命名文章',
    date: (attrs.publishedAt || attrs.createdAt || '').slice(0, 10),
    paragraphs,
  }
}

// 拉取全部文章。失败返回 null，让调用方能区分「请求失败」和「后端返回空列表」
export async function fetchArticles() {
  try {
    const res = await fetch(`${API_BASE}/api/articles?populate=cover`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const json = await res.json()
    return (json.data || []).map(mapArticle)
  } catch (e) {
    return null
  }
}

// 拉取单篇文章详情。失败返回 null
export async function fetchArticle(id) {
  try {
    const res = await fetch(`${API_BASE}/api/articles/${id}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json?.data ? mapArticleDetail(json.data) : null
  } catch (e) {
    return null
  }
}
