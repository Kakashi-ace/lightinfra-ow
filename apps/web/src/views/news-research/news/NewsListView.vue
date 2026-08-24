<template>
  <div class="news-list-view">
    <NewsPageHeader :featured="featured" @start="openExternal(featured.externalUrl)" />

    <ArticleListSection
      :subtitle="t('news.sectionSubtitle')"
      :items="list"
      :has-more="hasMore"
      :loading="loadingMore"
      @read-more="openExternal($event.externalUrl)"
      @load-more="loadMore"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import NewsPageHeader from '../components/NewsPageHeader.vue'
import ArticleListSection from '../components/ArticleListSection.vue'
import { useNewsList } from '@/composables/useNewsList'

const { t } = useI18n()

const { featured, list, hasMore, loadingMore, loadMore } = useNewsList()

const openExternal = (url) => {
  if (!url) return
  window.open(url, '_blank', 'noopener')
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
