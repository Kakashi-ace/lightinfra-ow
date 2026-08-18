import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { fetchArticles } from '@/api/articles'
import { NEWS_FALLBACK, RESEARCH_FALLBACK } from '@/data/newsFallback'
import { ApiError } from '@/utils/request'
import type {
  ArticleCategory,
  ArticleFallback,
  ArticleSummary,
  FeaturedArticle,
} from '@/types/article'

const FALLBACKS: Record<ArticleCategory, ArticleFallback> = {
  news: NEWS_FALLBACK,
  research: RESEARCH_FALLBACK,
}

export interface UseArticleListReturn {
  featured: Ref<FeaturedArticle>
  list: Ref<ArticleSummary[]>
}

/**
 * 新闻动态 / 前沿研究列表页共用的数据源。
 * 先用保底数据填充，挂载后尝试拉取真实数据并覆盖列表；
 * 请求失败时沿用保底数据。头条（featured）目前只来自保底数据，
 * 后端暂无置顶字段。
 */
export function useArticleList(category: ArticleCategory): UseArticleListReturn {
  const fallback = FALLBACKS[category]

  const featured = ref<FeaturedArticle>(fallback.featured)
  const list = ref<ArticleSummary[]>(fallback.list)

  // 路由切走时中断在途请求，避免旧响应回来覆盖新页面的状态
  const controller = new AbortController()

  onMounted(async () => {
    try {
      list.value = await fetchArticles(category, { signal: controller.signal })
    } catch (e) {
      if (e instanceof ApiError && e.isCanceled) return
      const message = e instanceof Error ? e.message : String(e)
      console.warn(`[articles] ${category} 列表拉取失败，沿用保底数据：${message}`)
    }
  })

  onUnmounted(() => controller.abort())

  return { featured, list }
}
