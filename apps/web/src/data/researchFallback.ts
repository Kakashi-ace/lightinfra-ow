import type { ResearchFallback, ResearchSummary } from '@/types/research'

// 后端不可用时的保底展示数据。
// id 用数字字符串，保证从卡片点进详情页时能拼出一个真实请求。
const NEWS_EXCERPT = '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
const NEWS_TITLE = '全自研国产！交大发布这一AI大模型'

export const RESEARCH_FALLBACK: ResearchFallback = {
  featured: {
    id: '10',
    tag: '论文',
    title: '指数剪枝可学习数字反向传播实现低复杂度光纤非线性补偿',
    date: '2026-01-01',
    cover: null,
    coverAlt: '',
  },
  list: [
    {
      id: '10',
      tag: '论文',
      date: '2026-01-01',
      title: '指数剪枝可学习数字反向传播实现低复杂度光纤非线性补偿',
      excerpt: '上海交通大学电子信息与电气工程学院义理林教授课题组提出了一种低复杂度指数剪枝可学习数字反向传播方法...',
      cover: null,
      coverAlt: '',
      featured: true,
    },
    {
      id: '11',
      tag: '论文',
      date: '2026-01-01',
      title: 'Agent赋能光网络运维智能化',
      excerpt: '光之宇智能科技有限公司长期开展智能光传输及光网络运维管理研究...',
      cover: null,
      coverAlt: '',
      featured: false,
    },
    ...Array.from({ length: 7 }, (_, i): ResearchSummary => ({
      id: String(i + 12),
      tag: '文章',
      date: '2026-01-01',
      title: NEWS_TITLE,
      excerpt: NEWS_EXCERPT,
      cover: null,
      coverAlt: '',
      featured: false,
    })),
  ],
}
