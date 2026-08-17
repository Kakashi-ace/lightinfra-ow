<template>
  <div class="news-research-page">
    <!-- Hero 区域背景 -->
    <div class="hero-bg">
      <!-- 2. 新闻子导航 -->
      <div class="sub-nav">
        <div class="sub-nav-container">
          <div class="sub-nav-tabs">
            <button
              v-for="tab in newsData.tabs"
              :key="tab"
              class="sub-nav-tab"
              :class="{ 'sub-nav-tab-active': activeTab === tab }"
              @click="handleTabChange(tab)"
            >
              {{ tab }}
            </button>
          </div>
          <div class="search-box">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              class="search-input"
              :placeholder="newsData.searchPlaceholder"
              v-model="searchKeyword"
              @keyup.enter="handleSearch"
            />
          </div>
        </div>
      </div>

      <!-- 3. 头条论文区 -->
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
            <span class="hero-tag">{{ newsData.featured.tag }}</span>
            <h1 class="hero-title">{{ newsData.featured.title }}</h1>
            <p class="hero-date">{{ newsData.featured.date }}</p>
            <a href="/research/detail" class="hero-btn" @click.prevent="handleReadMore(newsData.featured.id)">阅读文章</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. 前沿研究区块 -->
    <section class="research-section">
      <div class="research-container">
        <div class="research-header">
          <h2 class="research-title">{{ newsData.sectionTitle }}</h2>
          <p class="research-subtitle">{{ newsData.sectionSubtitle }}</p>
        </div>
        <div class="research-grid">
          <div
            v-for="paper in newsData.researchList"
            :key="paper.id"
            class="research-card"
            @click="handleReadMore(paper.id)"
          >
            <div class="research-card-image">
              <svg width="100%" height="100%" viewBox="0 0 384 216" fill="none">
                <rect width="384" height="216" fill="#D9D9D9" />
              </svg>
            </div>
            <div class="research-card-body">
              <div class="research-card-meta">
                <span class="research-card-tag">{{ paper.tag }}</span>
                <span class="research-card-date">{{ paper.date }}</span>
              </div>
              <h3 class="research-card-title">{{ paper.title }}</h3>
              <p class="research-card-excerpt">{{ paper.excerpt }}</p>
              <button class="research-card-btn" @click="handleReadMore(paper.id)">阅读更多</button>
            </div>
          </div>
        </div>
        <div class="research-footer">
          <button class="load-more-btn" @click="handleLoadMore">阅读文章</button>
        </div>
      </div>
    </section>

    <!-- 5. 页脚 -->
    <footer class="page-footer">
      <div class="footer-container">
        <div class="footer-left">
          <svg class="footer-logo" width="205" height="68" viewBox="0 0 112 37" fill="none">
            <polygon points="6,0 28,0 28,26" fill="#0073FF" />
            <polygon points="0,17 22,17 22,37" fill="#0073FF" />
            <rect x="42" y="4" width="4" height="30" fill="#0073FF"/>
            <rect x="52" y="12" width="4" height="22" fill="#0073FF"/>
            <rect x="62" y="8" width="4" height="26" fill="#0073FF"/>
            <rect x="72" y="15" width="4" height="18" fill="#0073FF"/>
            <rect x="82" y="6" width="4" height="28" fill="#0073FF"/>
            <rect x="92" y="11" width="4" height="23" fill="#0073FF"/>
          </svg>
          <div class="contact-info">
            <div class="contact-item">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0073FF" stroke-width="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6L12 13L2 6"/>
              </svg>
              <span>商务合作请联系：business@infra.com</span>
            </div>
            <div class="contact-item">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0073FF" stroke-width="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6L12 13L2 6"/>
              </svg>
              <span>招聘咨询请联系：hr@infra.com</span>
            </div>
          </div>
          <div class="qr-code"></div>
        </div>
        <div class="footer-right">
          <div class="footer-column">
            <h4 class="column-title">产品</h4>
            <a href="/products/opticsgpt" class="column-link">OpticsGPT</a>
            <a href="/products/ifts" class="column-link">智能仿真工具</a>
            <a href="/products/instruments" class="column-link">智能仪器仪表</a>
          </div>
          <div class="footer-column">
            <h4 class="column-title">新闻中心</h4>
            <a href="/news" class="column-link">新闻动态</a>
            <a href="/research" class="column-link">前沿研究</a>
          </div>
          <div class="footer-column">
            <h4 class="column-title">关于LightInfra</h4>
          </div>
          <div class="footer-column">
            <h4 class="column-title">联系我们</h4>
            <a href="/contact" class="column-link">联系方式</a>
            <a href="/join" class="column-link">加入我们</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  newsData: {
    type: Object,
    default: () => ({
      tabs: ['新闻动态', '前沿研究'],
      searchPlaceholder: '想要查找什么？',
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
          tag: '文章',
          date: '2026-01-01',
          title: '全自研国产！交大发布这一AI大模型',
          excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
        },
        {
          id: 'paper-2',
          tag: '文章',
          date: '2026-01-01',
          title: '全自研国产！交大发布这一AI大模型',
          excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...'
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
    })
  }
})

const emit = defineEmits(['tabChange', 'search', 'readMore', 'loadMore', 'start', 'navigate'])

const activeTab = ref(props.newsData.tabs[1])
const searchKeyword = ref('')

const handleTabChange = (tab) => {
  activeTab.value = tab
  emit('tabChange', tab)
}

const handleSearch = () => {
  emit('search', searchKeyword.value)
}

const handleReadMore = (paperId) => {
  if (paperId === 'paper-1' || paperId === 'featured-paper-1') {
    router.push('/research/detail')
  } else if (paperId === 'paper-2') {
    router.push('/research/detail2')
  } else {
    emit('readMore', paperId)
  }
}

const handleLoadMore = () => {
  emit('loadMore')
}
</script>

<style scoped>
.news-research-page {
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

/* ========== 3. 头条论文区 ========== */
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

/* ========== 4. 前沿研究区块 ========== */
.research-section {
  width: 100%;
  padding: 60px 0;
}

.research-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.research-header {
  margin-bottom: 60px;
}

.research-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #121212;
  margin: 0 0 16px 0;
}

.research-subtitle {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #555555;
  margin: 0;
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px 29px;
  margin-bottom: 60px;
}

.research-card {
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

.research-card:hover {
  border-color: #0073FF;
}

.research-card-image {
  width: 100%;
  height: 216px;
  flex-shrink: 0;
}

.research-card-body {
  flex: 1;
  padding: 21px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.research-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.research-card-tag {
  display: inline-block;
  padding: 5px 10px;
  background: #D1EAFF;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #121212;
}

.research-card-date {
  font-size: 12px;
  font-weight: 400;
  color: #121212;
}

.research-card-title {
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

.research-card-excerpt {
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

.research-card-btn {
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

.research-card-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.research-footer {
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

/* ========== 5. 页脚 ========== */
.page-footer {
  width: 100%;
  background: #FFFFFF;
  border-top: 1px solid #E5E5E5;
}

.footer-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  display: flex;
  gap: 77px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-logo {
  display: block;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #020952;
}

.qr-code {
  width: 128px;
  height: 128px;
  background: #D9D9D9;
  border-radius: 20px;
}

.footer-right {
  flex: 1;
  display: flex;
  gap: 77px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.column-title {
  font-size: 20px;
  font-weight: 600;
  color: #121212;
  margin: 0;
}

.column-link {
  font-size: 14px;
  font-weight: 400;
  color: #515151;
  text-decoration: none;
  transition: color 0.2s ease;
}

.column-link:hover {
  color: #0073FF;
}
</style>
