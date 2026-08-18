import { ref, onMounted } from 'vue'
import { fetchArticles } from '../../../api/articles'
import { NEWS_FALLBACK, RESEARCH_FALLBACK } from '../data/fallback'

const FALLBACKS = {
  news: NEWS_FALLBACK,
  research: RESEARCH_FALLBACK,
}

/**
 * 新闻动态 / 前沿研究列表页共用的数据源。
 * 先用保底数据填充，挂载后尝试从 Strapi 拉取并按 category 覆盖列表；
 * 请求失败时保留保底数据。头条（featured）目前只来自保底数据，后端暂无置顶字段。
 *
 * @param {'news'|'research'} category
 */
export function useArticleList(category) {
  const fallback = FALLBACKS[category] || FALLBACKS.news

  const featured = ref(fallback.featured)
  const list = ref(fallback.list)

  onMounted(async () => {
    const all = await fetchArticles()
    if (!all) return
    list.value = all.filter((it) => it.category === category)
  })

  return { featured, list }
}
