<template>
  <div class="news-page">
    <div class="hero-bg">
      <NewsSubNav
        :active-tab="activeTab"
        @update:active-tab="activeTab = $event"
        @search="handleSearch"
      />
      <NewsHero :featured="featured" @start="handleHeroBtn" />
    </div>

    <ArticleListSection
      v-show="activeTab === 'news'"
      :subtitle="t('news.sectionSubtitle')"
      :items="newsList"
      @read-more="handleReadMore"
      @load-more="handleLoadMore"
    />

    <ArticleListSection
      v-show="activeTab === 'research'"
      :subtitle="t('news.researchSectionSubtitle')"
      :items="researchList"
      @read-more="handleReadMore"
      @load-more="handleLoadMore"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NewsSubNav from './components/NewsSubNav.vue'
import NewsHero from './components/NewsHero.vue'
import ArticleListSection from './components/ArticleListSection.vue'

const router = useRouter()
const { t } = useI18n()

const props = defineProps({
  initialTab: {
    type: String,
    default: 'news'
  },
  newsData: {
    type: Object,
    default: () => ({
      featured: { id: 'featured-1', tag: '会议', title: '全自研国产！ 交大发布这一AI大模型', date: '2026-01-01' },
      newsList: [
        { id: 'news-1', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
        { id: 'news-2', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
        { id: 'news-3', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
        { id: 'news-4', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
        { id: 'news-5', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
        { id: 'news-6', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
        { id: 'news-7', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
        { id: 'news-8', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
        { id: 'news-9', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' }
      ]
    })
  }
})

const emit = defineEmits(['search', 'readMore', 'loadMore', 'start'])

// ===== 数据源：优先从 Strapi 后端拉取，失败时为保底用硬编码默认值 =====
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:1337'

const activeTab = ref(props.initialTab)
const searchKeyword = ref('')
const newsList = ref(props.newsData?.newsList || [])
const researchList = ref([])

const researchData = {
  featured: { id: 'featured-paper-1', tag: '论文', title: '指数剪枝可学习数字反向传播实现低复杂度光纤非线性补偿', date: '2026-01-01' },
  researchList: [
    { id: 'paper-1', tag: '论文', date: '2026-01-01', title: '指数剪枝可学习数字反向传播实现低复杂度光纤非线性补偿', excerpt: '上海交通大学电子信息与电气工程学院义理林教授课题组提出了一种低复杂度指数剪枝可学习数字反向传播方法...' },
    { id: 'paper-2', tag: '论文', date: '2026-01-01', title: 'Agent赋能光网络运维智能化', excerpt: '光之宇智能科技有限公司长期开展智能光传输及光网络运维管理研究...' },
    { id: 'paper-3', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
    { id: 'paper-4', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
    { id: 'paper-5', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
    { id: 'paper-6', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
    { id: 'paper-7', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
    { id: 'paper-8', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' },
    { id: 'paper-9', tag: '文章', date: '2026-01-01', title: '全自研国产！交大发布这一AI大模型', excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...' }
  ]
}

// 头条：根据当前 tab 取对应 featured
const featured = computed(() =>
  activeTab.value === 'research' ? researchData.featured : props.newsData.featured
)

// 把一条 Strapi article {id, attributes} 映射成前端展示字段
function mapArticle(item) {
  const attrs = item?.attributes || {}
  return {
    id: String(item?.id ?? Math.random()),
    tag: attrs.category === 'research' ? '论文' : '文章',
    date: (attrs.publishedAt || attrs.createdAt || '').slice(0, 10),
    title: attrs.title || '未命名文章',
    excerpt: attrs.excerpt || (attrs.subtitle ? attrs.subtitle.slice(0, 80) : ''),
  }
}

async function fetchArticles() {
  try {
    const res = await fetch(`${API_BASE}/api/articles?populate=cover`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return
    const json = await res.json()
    const all = (json.data || []).map(mapArticle)
    newsList.value = all.filter((it) => it.tag === '文章')
    researchList.value = all.filter((it) => it.tag === '论文')
  } catch (e) {
    // 后端不可用时保持硬编码默认值
  }
}

onMounted(() => {
  // 把 researchList 初值设为硬编码 research 数据，保证后端不可用时也有内容
  researchList.value = researchData.researchList || []
  fetchArticles()
})

const handleSearch = () => {
  emit('search', searchKeyword.value)
}

const handleHeroBtn = () => {
  if (activeTab.value === 'research') {
    router.push({ name: 'research-detail', params: { id: '1' } })
  }
}

const handleReadMore = (id) => {
  if (id === 'paper-1' || id === 'paper-2') {
    const page = id === 'paper-1' ? '1' : '2'
    router.push({ name: 'research-detail', params: { id: page } })
  } else {
    emit('readMore', id)
  }
}

const handleLoadMore = () => {
  emit('loadMore')
}
</script>

<style scoped>
.news-page {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

.hero-bg {
  width: 100%;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(102,102,102,0) 100%),
              linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
  padding-top: 80px;
}
</style>
