<template>
  <div class="article-detail">
    <DetailHeroSection :tag="articleData.tag" :title="articleData.title" :date="articleData.date" />
    <DetailBodySection :paragraphs="articleData.paragraphs" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import DetailHeroSection from './components/DetailHeroSection.vue'
import DetailBodySection from './components/DetailBodySection.vue'
import { fetchArticle } from '@/api/articles'

const route = useRoute()

// 渲染数据：默认占位，拉取成功后覆盖
const articleData = ref({
  tag: '论文',
  title: '文章加载中…',
  date: '',
  paragraphs: [],
})

// 路由切走时中断在途请求
const controller = new AbortController()

onMounted(async () => {
  try {
    const detail = await fetchArticle(route.params.id, { signal: controller.signal })
    if (detail) articleData.value = detail
  } catch (e) {
    if (!e?.isCanceled) {
      console.warn(`[articles] 详情拉取失败：${e?.message}`)
    }
  }
})

onUnmounted(() => controller.abort())
</script>

<style scoped>
.article-detail {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}
</style>
