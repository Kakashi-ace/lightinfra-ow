<template>
  <div class="contact-page-recruit">
    <!-- 2. Hero 区 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">{{ pageData.heroTitle }}</h1>
        <p class="hero-subtitle">{{ pageData.heroSubtitle }}</p>
      </div>
      <div class="hero-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
    </div>

    <!-- 3. 职位卡片区 -->
    <section class="positions-section">
      <div class="positions-container">
        <div class="positions-grid">
          <div
            v-for="position in pageData.positions"
            :key="position.id"
            class="position-card"
            @click="handleApply(position)"
          >
            <h3 class="position-name">{{ position.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. "我们期待这样的你"区块 -->
    <section class="expectations-section">
      <div class="expectations-container">
        <h2 class="section-title">{{ pageData.expectationsTitle }}</h2>
        <div class="expectations-content">
          <div class="expectations-image">
            <svg width="691" height="542" viewBox="0 0 691 542" fill="none">
              <rect width="691" height="542" rx="20" fill="#D9D9D9" />
            </svg>
          </div>
          <div class="expectations-cards">
            <div
              v-for="card in pageData.expectationCards"
              :key="card.id"
              class="expectation-card"
            >
              <h3 class="expectation-card-title">{{ card.title }}</h3>
              <p class="expectation-card-desc">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 联系邮箱区 -->
    <section class="contact-section">
      <div class="contact-container">
        <h2 class="contact-title">{{ pageData.contactTitle }}</h2>
        <p class="contact-subtitle">{{ pageData.contactSubtitle }}</p>
      </div>
    </section>

    <!-- 6. 页脚 -->
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
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({
      heroTitle: '加入 LightInfra',
      heroSubtitle: '在 LightInfra，我们长期招募伙伴',
      positions: [
        { id: 'pos-1', name: '光学工程师' },
        { id: 'pos-2', name: '算法工程师' },
        { id: 'pos-3', name: '算法工程师' },
        { id: 'pos-4', name: '算法工程师' }
      ],
      expectationsTitle: '我们期待这样的你',
      expectationCards: [
        {
          id: 'exp-1',
          title: '专业能力',
          description: '具备扎实的专业基础知识，能够独立完成工作任务'
        },
        {
          id: 'exp-2',
          title: '创新精神',
          description: '善于思考，勇于创新，能够提出建设性的解决方案'
        }
      ],
      contactTitle: '如有任何疑问，请联系我们',
      contactSubtitle: '请将您的简历发送至以下邮箱： hr@infra.com'
    })
  }
})

const emit = defineEmits(['apply'])

const handleApply = (position) => {
  emit('apply', position)
}
</script>

<style scoped>
.contact-page-recruit {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

/* ========== 2. Hero 区 ========== */
.hero-section {
  width: 100%;
  height: 400px;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(102,102,102,0) 100%),
              linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
}

.hero-content {
  text-align: center;
  z-index: 1;
}

.hero-title {
  font-size: 96px;
  font-weight: 600;
  line-height: 113px;
  margin: 0 0 24px 0;
  background: linear-gradient(90deg, #020952 14.49%, #000000 59.15%, #002B81 85.39%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: #555555;
  margin: 0;
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: 10%;
}

.circle-2 {
  width: 200px;
  height: 200px;
  top: 20%;
  right: 5%;
}

.circle-3 {
  width: 150px;
  height: 150px;
  bottom: 10%;
  left: 5%;
}

/* ========== 3. 职位卡片区 ========== */
.positions-section {
  width: 100%;
  padding: 60px 0;
}

.positions-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.positions-grid {
  display: flex;
  gap: 25px;
  justify-content: center;
}

.position-card {
  width: 282px;
  height: 120px;
  background: #FBFCFF;
  border: 1px solid #D1EAFF;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.position-card:hover {
  border-color: #0073FF;
}

.position-name {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: #121212;
  margin: 0;
  text-align: center;
}

/* ========== 4. "我们期待这样的你"区块 ========== */
.expectations-section {
  width: 100%;
  padding: 60px 0;
}

.expectations-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #121212;
  margin: 0 0 40px 0;
}

.expectations-content {
  display: flex;
  gap: 24px;
}

.expectations-image {
  width: 691px;
  height: 542px;
  flex-shrink: 0;
}

.expectations-image svg {
  display: block;
  border-radius: 20px;
}

.expectations-cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.expectation-card {
  width: 486px;
  height: 260px;
  background: #FBFCFF;
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.expectation-card-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: #121212;
  margin: 0;
}

.expectation-card-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #555555;
  margin: 0;
}

/* ========== 5. 联系邮箱区 ========== */
.contact-section {
  width: 100%;
  height: 492px;
  background: #FBFCFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-container {
  width: 840px;
  text-align: center;
}

.contact-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #121212;
  margin: 0 0 24px 0;
}

.contact-subtitle {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #555555;
  margin: 0;
}

/* ========== 6. 页脚 ========== */
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
  color: #0F0F0F;
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
