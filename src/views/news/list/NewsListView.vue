<template>
  <div class="news-list-view">
    <NewsPageHeader :featured="featured" @start="goDetail(featured.id)" />

    <ArticleListSection
      :subtitle="t('news.sectionSubtitle')"
      :items="list"
      @read-more="goDetail"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NewsPageHeader from '../components/NewsPageHeader.vue'
import ArticleListSection from '../components/ArticleListSection.vue'
import { useArticleList } from '@/composables/useArticleList'

const router = useRouter()
const { t } = useI18n()

const { featured, list } = useArticleList('news')

const goDetail = (id) => {
  if (!id) return
  router.push({ name: 'news-detail', params: { id } })
}
</script>

<style scoped>
.news-list-view {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}
</style>
