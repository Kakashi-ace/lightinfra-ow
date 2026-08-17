<template>
  <div class="news-page">
    <!-- Hero 区域背景 -->
    <div class="hero-bg">
      <!-- 2. 新闻子导航 -->
      <div class="sub-nav">
        <div class="sub-nav-container">
          <div class="sub-nav-tabs">
            <button
              class="sub-nav-tab"
              :class="{ 'sub-nav-tab-active': activeTab === 'news' }"
              @click="activeTab = 'news'"
            >
              {{ t('news.newsTab') }}
            </button>
            <button
              class="sub-nav-tab"
              :class="{ 'sub-nav-tab-active': activeTab === 'research' }"
              @click="activeTab = 'research'"
            >
              {{ t('news.researchTab') }}
            </button>          </div>
          <div class="search-box">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              class="search-input"
              :placeholder="t('news.searchPlaceholder')"
              v-model="searchKeyword"
              @keyup.enter="handleSearch"
            />
          </div>
        </div>
      </div>

      <!-- 3. 头条新闻区 -->
      <div class="hero-content">
        <div class="hero-container">
          <div class="hero-left">
            <div class="hero-image-placeholder">
              <svg width="100%" height="100%" viewBox="0 0 690 441" fill="none">
                <rect width="690" height="441" fill="#D9D9D9" />
              </svg>
            </div>
          </div>
          <div class="hero-right">
            <span class="hero-tag">{{ activeTab === 'news' ? newsData.featured.tag : researchData.featured.tag }}</span>
            <h1 class="hero-title">{{ activeTab === 'news' ? newsData.featured.title : researchData.featured.title }}</h1>
            <p class="hero-date">{{ activeTab === 'news' ? newsData.featured.date : researchData.featured.date }}</p>
            <a href="#" class="hero-btn" @click.prevent="handleHeroBtn">{{ t('common.readArticle') }}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. 新闻动态区块 -->
    <section v-show="activeTab === 'news'" class="news-section">
      <div class="news-container">
        <div class="news-header">
          <h2 class="news-title">{{ t('news.sectionTitle') }}</h2>
          <p class="news-subtitle">{{ t('news.sectionSubtitle') }}</p>
        </div>
        <div class="news-grid">
          <div
            v-for="news in newsList"
            :key="news.id"
            class="news-card"
          >
            <div class="news-card-image">
              <svg width="100%" height="100%" viewBox="0 0 384 216" fill="none">
                <rect width="384" height="216" fill="#D9D9D9" />
              </svg>
            </div>
            <div class="news-card-body">
              <div class="news-card-meta">
                <span class="news-card-tag">{{ news.tag }}</span>
                <span class="news-card-date">{{ news.date }}</span>
              </div>
              <h3 class="news-card-title">{{ news.title }}</h3>
              <p class="news-card-excerpt">{{ news.excerpt }}</p>
              <button class="news-card-btn" @click="handleReadMore(news.id)">{{ t('common.readMore') }}</button>
            </div>
          </div>
        </div>
        <div class="news-footer">
          <button class="load-more-btn" @click="handleLoadMore">{{ t('common.readArticle') }}</button>
        </div>
      </div>
    </section>

    <!-- 4. 前沿研究区块 -->
    <section v-show="activeTab === 'research'" class="news-section">
      <div class="news-container">
        <div class="news-header">
          <h2 class="news-title">{{ t('news.sectionTitle') }}</h2>
          <p class="news-subtitle">{{ t('news.researchSectionSubtitle') }}</p>
        </div>
        <div class="news-grid">
          <div
            v-for="paper in researchList"
            :key="paper.id"
            class="news-card"
            @click="handleReadMore(paper.id)"
          >
            <div class="news-card-image">
              <svg width="100%" height="100%" viewBox="0 0 384 216" fill="none">
                <rect width="384" height="216" fill="#D9D9D9" />
              </svg>
            </div>
            <div class="news-card-body">
              <div class="news-card-meta">
                <span class="news-card-tag">{{ paper.tag }}</span>
                <span class="news-card-date">{{ paper.date }}</span>
              </div>
              <h3 class="news-card-title">{{ paper.title }}</h3>
              <p class="news-card-excerpt">{{ paper.excerpt }}</p>
              <button class="news-card-btn" @click.stop="handleReadMore(paper.id)">{{ t('common.readMore') }}</button>
            </div>
          </div>
        </div>
        <div class="news-footer">
          <button class="load-more-btn" @click="handleLoadMore">{{ t('common.readArticle') }}</button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

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
      tabs: ['新闻动态', '前沿研究'],
      searchPlaceholder: '想要查找什么？',
      featured: {
        id: 'featured-1',
        tag: '会议',
        title: '全自研国产！ 交大发布这一AI大模型',
        date: '2026-01-01'
      },
      sectionTitle: '新闻动态',
      sectionSubtitle: '产品发布 · 企业资讯 · 行业合作',
      newsList: [
        {
          id: 'news-1',
          tag: '文章',
          date: '2026-01-01',
          title: '全自研国产！交大发布这一AI大模型',
          excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
        },
        {
          id: 'news-2',
          tag: '文章',
          date: '2026-01-01',
          title: '全自研国产！交大发布这一AI大模型',
          excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
        },
        {
          id: 'news-3',
          tag: '文章',
          date: '2026-01-01',
          title: '全自研国产！交大发布这一AI大模型',
          excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
        },
        {
          id: 'news-4',
          tag: '文章',
          date: '2026-01-01',
          title: '全自研国产！交大发布这一AI大模型',
          excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
        },
        {
          id: 'news-5',
          tag: '文章',
          date: '2026-01-01',
          title: '全自研国产！交大发布这一AI大模型',
          excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
        },
        {
          id: 'news-6',
          tag: '文章',
          date: '2026-01-01',
          title: '全自研国产！交大发布这一AI大模型',
          excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
        },
        {
          id: 'news-7',
          tag: '文章',
          date: '2026-01-01',
          title: '全自研国产！交大发布这一AI大模型',
          excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
        },
        {
          id: 'news-8',
          tag: '文章',
          date: '2026-01-01',
          title: '全自研国产！交大发布这一AI大模型',
          excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
        },
        {
          id: 'news-9',
          tag: '文章',
          date: '2026-01-01',
          title: '全自研国产！交大发布这一AI大模型',
          excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
        }
      ]
    })
  }
})

const emit = defineEmits(['search', 'readMore', 'loadMore', 'start'])

// ===== 数据源：优先从 Strapi 后端拉取，失败时为保底用硬编码默认值 =====
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:1337'

// 文章列表（news / research）：初始用硬编码默认值（props 默认 / 下方 researchData），
// onMounted 拉取成功后用后端数据覆盖
const newsList = ref(props.newsData?.newsList || [])
const researchList = ref([])

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

const activeTab = ref(props.initialTab)
const searchKeyword = ref('')

const researchData = {
  featured: {
    id: 'featured-paper-1',
    tag: '论文',
    title: '指数剪枝可学习数字反向传播实现低复杂度光纤非线性补偿',
    date: '2026-01-01'
  },
  sectionTitle: '前沿研究',
  sectionSubtitle: '前言技术解读·学术研究·工程实践',
  researchList: [
    {
      id: 'paper-1',
      tag: '论文',
      date: '2026-01-01',
      title: '指数剪枝可学习数字反向传播实现低复杂度光纤非线性补偿',
      excerpt: '上海交通大学电子信息与电气工程学院义理林教授课题组提出了一种低复杂度指数剪枝可学习数字反向传播方法...'
    },
    {
      id: 'paper-2',
      tag: '论文',
      date: '2026-01-01',
      title: 'Agent赋能光网络运维智能化',
      excerpt: '光之宇智能科技有限公司长期开展智能光传输及光网络运维管理研究...'
    },
    {
      id: 'paper-3',
      tag: '文章',
      date: '2026-01-01',
      title: '全自研国产！交大发布这一AI大模型',
      excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
    },
    {
      id: 'paper-4',
      tag: '文章',
      date: '2026-01-01',
      title: '全自研国产！交大发布这一AI大模型',
      excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
    },
    {
      id: 'paper-5',
      tag: '文章',
      date: '2026-01-01',
      title: '全自研国产！交大发布这一AI大模型',
      excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
    },
    {
      id: 'paper-6',
      tag: '文章',
      date: '2026-01-01',
      title: '全自研国产！交大发布这一AI大模型',
      excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
    },
    {
      id: 'paper-7',
      tag: '文章',
      date: '2026-01-01',
      title: '全自研国产！交大发布这一AI大模型',
      excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
    },
    {
      id: 'paper-8',
      tag: '文章',
      date: '2026-01-01',
      title: '全自研国产！交大发布这一AI大模型',
      excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
    },
    {
      id: 'paper-9',
      tag: '文章',
      date: '2026-01-01',
      title: '全自研国产！交大发布这一AI大模型',
      excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
    }
  ]
}

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

/* ========== 按钮样式 ========== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 30px;
  transition: all 0.2s ease;
  cursor: pointer;
  box-sizing: border-box;
}

.btn-outline {
  background: transparent;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
}

.btn-outline:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.btn-filled {
  background: #FFFFFF;
  color: #121212;
  border: 1px solid #FFFFFF;
}

.btn-filled:hover {
  background: #0073FF;
  border-color: #0073FF;
  color: #FFFFFF;
}

/* ========== Hero 背景 ========== */
.hero-bg {
  width: 100%;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(102,102,102,0) 100%),
              linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
  padding-top: 80px;
}

/* ========== 2. 新闻子导航 ========== */
.sub-nav {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
}

.sub-nav-container {
  width: 1200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.sub-nav-tabs {
  display: flex;
  gap: 32px;
}

.sub-nav-tab {
  font-size: 14px;
  font-weight: 500;
  color: #BBBBBB;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.sub-nav-tab:hover {
  color: #0073FF;
}

.sub-nav-tab-active {
  color: #FFFFFF;
  font-weight: 600;
}

.sub-nav-tab-link {
  font-size: 14px;
  font-weight: 500;
  color: #BBBBBB;
  text-decoration: none;
  transition: color 0.2s ease;
}

.sub-nav-tab-link:hover {
  color: #0073FF;
}

.search-box {
  position: relative;
  width: 230px;
  height: 40px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #BBBBBB;
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 100%;
  padding: 0 12px 0 40px;
  background: transparent;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  font-size: 14px;
  color: #FFFFFF;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input::placeholder {
  color: #BBBBBB;
}

.search-input:focus {
  border-color: #0073FF;
}

/* ========== 3. 头条新闻区 ========== */
.hero-content {
  width: 100%;
  padding: 60px 0;
}

.hero-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 24px;
}

.hero-left {
  width: 690px;
  height: 441px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
}

.hero-image-placeholder {
  width: 100%;
  height: 100%;
}

.hero-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0;
  gap: 24px;
}

.hero-tag {
  display: inline-block;
  padding: 5px 12px;
  background: #4754E1;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  color: #FFFFFF;
}

.hero-title {
  font-size: 48px;
  font-weight: 600;
  line-height: 58px;
  color: #FFFFFF;
  margin: 0;
}

.hero-date {
  font-size: 24px;
  font-weight: 400;
  color: #FFFFFF;
  margin: 0;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.hero-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

/* ========== 4. 新闻动态区块 ========== */
.news-section {
  width: 100%;
  padding: 60px 0;
}

.news-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.news-header {
  margin-bottom: 60px;
}

.news-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #121212;
  margin: 0 0 16px 0;
}

.news-subtitle {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #555555;
  margin: 0;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px 29px;
  margin-bottom: 60px;
}

.news-card {
  width: 100%;
  height: 433px;
  background: #FFFFFF;
  border: 1px solid #D3D3D3;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s ease;
}

.news-card:hover {
  border-color: #0073FF;
}

.news-card-image {
  width: 100%;
  height: 216px;
  flex-shrink: 0;
}

.news-card-body {
  flex: 1;
  padding: 21px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.news-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-card-tag {
  display: inline-block;
  padding: 5px 10px;
  background: #D1EAFF;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #121212;
}

.news-card-date {
  font-size: 12px;
  font-weight: 400;
  color: #121212;
}

.news-card-title {
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  color: #121212;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card-excerpt {
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  color: #121212;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 36px;
  background: #FFFFFF;
  border: 1px solid #121212;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  color: #121212;
  cursor: pointer;
  transition: all 0.2s ease;
}

.news-card-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.news-footer {
  display: flex;
  justify-content: center;
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 48px;
  background: #FFFFFF;
  border: 1px solid #121212;
  border-radius: 30px;
  font-size: 24px;
  font-weight: 500;
  color: #121212;
  cursor: pointer;
  transition: all 0.2s ease;
}

.load-more-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}


</style>
