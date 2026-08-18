import { ref, onMounted, onUnmounted } from 'vue'
import { fetchArticles } from '@/api/articles'
import { NEWS_FALLBACK, RESEARCH_FALLBACK } from '@/data/newsFallback'

const FALLBACKS = {
  news: NEWS_FALLBACK,
  research: RESEARCH_FALLBACK,
}

/**
 * 新闻动态 / 前沿研究列表页共用的数据源。
 * 先用保底数据填充，挂载后尝试拉取真实数据并覆盖列表；
 * 请求失败时沿用保底数据。头条（featured）目前只来自保底数据，
 * 后端暂无置顶字段。
 *
 * @param {'news'|'research'} category
 */
export function useArticleList(category) {
  const fallback = FALLBACKS[category] || FALLBACKS.news

  const featured = ref(fallback.featured)
  const list = ref(fallback.list)

  // 路由切走时中断在途请求，避免旧响应回来覆盖新页面的状态
  const controller = new AbortController()

  onMounted(async () => {
    try {
      const items = await fetchArticles(category, { signal: controller.signal })
      list.value = items
    } catch (e) {
      if (!e?.isCanceled) {
        console.warn(`[articles] ${category} 列表拉取失败，沿用保底数据：${e?.message}`)
      }
    }
  })

  onUnmounted(() => controller.abort())

  return { featured, list }
}
