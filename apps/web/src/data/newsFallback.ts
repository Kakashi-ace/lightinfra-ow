import type { NewsFallback, NewsSummary } from '@/types/news'

// 后端不可用时的保底展示数据。
// id 用数字字符串，保证从卡片点进详情页时能拼出一个真实请求。
// externalUrl 暂用占位值，需要在 CMS 里补真实外链。
const NEWS_EXCERPT = '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
const NEWS_TITLE = '全自研国产！交大发布这一AI大模型'
const PLACEHOLDER_URL = '#'

export const NEWS_FALLBACK: NewsFallback = {
  featured: {
    id: '1',
    tag: '会议',
    title: '全自研国产！ 交大发布这一AI大模型',
    date: '2026-01-01',
    externalUrl: PLACEHOLDER_URL,
    cover: null,
    coverAlt: '',
  },
  list: Array.from({ length: 9 }, (_, i): NewsSummary => ({
    id: String(i + 1),
    tag: '文章',
    date: '2026-01-01',
    title: NEWS_TITLE,
    excerpt: NEWS_EXCERPT,
    cover: null,
    coverAlt: '',
    externalUrl: PLACEHOLDER_URL,
    featured: i === 0,
  })),
}
