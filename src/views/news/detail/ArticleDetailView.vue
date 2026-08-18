<template>
  <div class="article-detail">
    <DetailHeroSection :tag="articleData.tag" :title="articleData.title" :date="articleData.date" />
    <DetailBodySection :paragraphs="articleData.paragraphs" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DetailHeroSection from './components/DetailHeroSection.vue'
import DetailBodySection from './components/DetailBodySection.vue'
import { fetchArticle } from '../../../api/articles'

const route = useRoute()

// 渲染数据：默认展示占位，onMounted 从 Strapi 拉取后覆盖
const articleData = ref({
  tag: '论文',
  title: '文章加载中…',
  date: '',
  paragraphs: [],
})

onMounted(async () => {
  const detail = await fetchArticle(route.params.id)
  // 后端不可用时保持占位默认值
  if (detail) articleData.value = detail
})
</script>

<style scoped>
.article-detail {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}
</style>
