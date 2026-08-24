<template>
  <div class="research-list-view">
    <NewsPageHeader :featured="featured" @start="goDetail(featured.id)" />

    <ArticleListSection
      :subtitle="t('news.researchSectionSubtitle')"
      :items="list"
      :has-more="hasMore"
      :loading="loadingMore"
      @read-more="goDetail"
      @load-more="loadMore"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NewsPageHeader from '../components/NewsPageHeader.vue'
import ArticleListSection from '../components/ArticleListSection.vue'
import { useResearchList } from '@/composables/useResearchList'

const router = useRouter()
const { t } = useI18n()

const { featured, list, hasMore, loadingMore, loadMore } = useResearchList()

const goDetail = (itemOrId) => {
  const id = typeof itemOrId === 'object' && itemOrId !== null ? itemOrId.id : itemOrId
  if (!id) return
  router.push({ name: 'research-detail', params: { id } })
}
</script>

<style scoped>
.research-list-view {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}
</style>
