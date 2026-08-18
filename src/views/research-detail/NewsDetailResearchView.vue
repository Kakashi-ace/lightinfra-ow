<template>
  <div class="news-detail-research">
    <DetailHeroSection :tag="articleData.tag" :title="articleData.title" :date="articleData.date" />
    <DetailBodySection :paragraphs="articleData.paragraphs" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DetailHeroSection from './components/DetailHeroSection.vue'
import DetailBodySection from './components/DetailBodySection.vue'

const route = useRoute()
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:1337'

// 渲染数据：默认展示占位，onMounted 从 Strapi 拉取后覆盖
const articleData = ref({
  tag: '论文',
  title: '文章加载中…',
  date: '',
  paragraphs: [],
})

// 把 Strapi article {id, attributes} 映射成详情页渲染结构。
// 正文统一归一为字符串段落数组：
//  - body 为字符串数组（每段一个字符串）时直接使用
//  - body 为富文本 blocks（常见 {type, children:[{text}]}）时提取各段文本
//  - body 缺失时回退使用 subtitle/excerpt
function mapArticle(item) {
  const attrs = item?.attributes || {}
  let paragraphs = []
  if (Array.isArray(attrs.body)) {
    if (typeof attrs.body[0] === 'string') {
      paragraphs = attrs.body
    } else {
      paragraphs = attrs.body
        .map((block) => {
          if (block?.type === 'paragraph') {
            return (block.children || []).map((c) => c.text || '').join('')
          }
          return null
        })
        .filter(Boolean)
    }
  }
  if (!paragraphs.length && attrs.subtitle) paragraphs = [attrs.subtitle]
  if (!paragraphs.length && attrs.excerpt) paragraphs = [attrs.excerpt]

  return {
    tag: attrs.category === 'research' ? '论文' : '文章',
    title: attrs.title || '未命名文章',
    date: (attrs.publishedAt || attrs.createdAt || '').slice(0, 10),
    paragraphs,
  }
}

async function fetchDetail() {
  try {
    const res = await fetch(`${API_BASE}/api/articles/${route.params.id}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return
    const json = await res.json()
    if (json?.data) {
      articleData.value = mapArticle(json.data)
    }
  } catch (e) {
    // 后端不可用时保持占位默认值
  }
}

onMounted(fetchDetail)
</script>

<style scoped>
.news-detail-research {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}
</style>
