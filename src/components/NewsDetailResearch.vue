<template>
  <div class="news-detail-research">
    <!-- 2. Hero 标题区 -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-header">
          <span class="hero-tag">{{ articleData.tag }}</span>
          <h1 class="hero-title">{{ articleData.title }}</h1>
        </div>
        <p class="hero-date">{{ articleData.date }}</p>
      </div>
    </div>

    <!-- 3. 正文内容区 -->
    <main class="main-content">
      <div class="section-body">
        <p
          v-for="(para, index) in articleData.paragraphs"
          :key="'p-' + index"
          class="paragraph"
        >
          {{ para }}
        </p>
      </div>
    </main>

    <!-- 4. 页脚 -->
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
// 详情组件只负责渲染：接收 articleData（{tag, title, date, paragraphs}）。
// 数据由父级（NewsDetailResearchView）从 Strapi 拉取后传入，不做本地硬编码兜底。
const props = defineProps({
  articleData: {
    type: Object,
    default: () => ({
      tag: '论文',
      title: '',
      date: '',
      paragraphs: [],
    }),
  },
})

defineEmits(['copyDoi'])
</script>

<style scoped>
.news-detail-research {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

/* ========== Hero 标题区 ========== */
.hero-section {
  width: 100%;
  height: 400px;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(102,102,102,0) 100%),
              linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
  display: flex;
  align-items: flex-end;
  padding-top: 80px;
}

.hero-content {
  width: 1200px;
  margin: 0 auto;
  padding: 0 120px 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  background: #4754E1;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  height: 32px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.hero-title {
  font-size: 36px;
  font-weight: 600;
  line-height: 44px;
  color: rgba(0,0,0,0.9);
  margin: 0;
}

.hero-date {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(0,0,0,0.9);
  margin: 0;
}

/* ========== 3. 正文内容区 ========== */
.main-content {
  width: 1200px;
  margin: 0 auto;
  padding: 0 120px 80px;
}

.section-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 60px;
}

.paragraph {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(0,0,0,0.9);
  margin: 0;
  text-align: justify;
}

/* ========== 4. 页脚 ========== */
.page-footer {
  width: 100%;
  background: #FFFFFF;
  border-top: 1px solid #E5E5E5;
}

.footer-container {
  width: 1200px;
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
