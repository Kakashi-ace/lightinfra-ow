import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { fetchResearchList } from '@/api/research'
import { RESEARCH_FALLBACK } from '@/data/researchFallback'
import { ApiError } from '@/utils/request'
import type { FeaturedResearch, ResearchSummary } from '@/types/research'

export interface UseResearchListReturn {
  featured: Ref<FeaturedResearch>
  list: Ref<ResearchSummary[]>
  /** 是否还有下一页，用于控制"加载更多"按钮的展示 */
  hasMore: Ref<boolean>
  /** 是否正在加载下一页 */
  loadingMore: Ref<boolean>
  loadMore: () => Promise<void>
}

/** 优先取 CMS 标记的 featured 篇目，没有则退回列表第一条（已按 order/publishedAt 排序）*/
function pickFeatured(items: ResearchSummary[]): FeaturedResearch | null {
  const source = items.find((item) => item.featured) ?? items[0]
  if (!source) return null
  return {
    id: source.id,
    tag: source.tag,
    title: source.title,
    date: source.date,
    cover: source.cover,
    coverAlt: source.coverAlt,
  }
}

export function useResearchList(): UseResearchListReturn {
  const featured = ref<FeaturedResearch>(RESEARCH_FALLBACK.featured)
  const list = ref<ResearchSummary[]>(RESEARCH_FALLBACK.list)
  const hasMore = ref(false)
  const loadingMore = ref(false)
  const controller = new AbortController()
  let page = 1

  onMounted(async () => {
    try {
      const result = await fetchResearchList({ signal: controller.signal, page })
      list.value = result.items
      hasMore.value = result.hasMore
      featured.value = pickFeatured(result.items) ?? featured.value
    } catch (e) {
      if (e instanceof ApiError && e.isCanceled) return
      console.warn(`[research] 列表拉取失败，沿用保底数据：${e instanceof Error ? e.message : String(e)}`)
    }
  })

  const loadMore = async () => {
    if (loadingMore.value || !hasMore.value) return
    loadingMore.value = true
    try {
      const nextPage = page + 1
      const result = await fetchResearchList({ signal: controller.signal, page: nextPage })
      list.value = [...list.value, ...result.items]
      hasMore.value = result.hasMore
      page = nextPage
    } catch (e) {
      if (!(e instanceof ApiError && e.isCanceled)) {
        console.warn(`[research] 加载更多失败：${e instanceof Error ? e.message : String(e)}`)
      }
    } finally {
      loadingMore.value = false
    }
  }

  onUnmounted(() => controller.abort())

  return { featured, list, hasMore, loadingMore, loadMore }
}
