<template>
  <div class="ifts-product-page">
    <!-- 1. 顶部导航栏 -->
    <header class="page-header">
      <div class="header-container">
        <div class="header-left">
          <a href="/" class="header-logo" aria-label="LightInfra 首页">
            <svg width="112" height="37" viewBox="0 0 112 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="6,0 28,0 28,26" fill="#020952" />
              <polygon points="0,17 22,17 22,37" fill="#020952" />
              <rect x="42" y="4" width="4" height="30" fill="#020952"/>
              <rect x="52" y="12" width="4" height="22" fill="#020952"/>
              <rect x="62" y="8" width="4" height="26" fill="#020952"/>
              <rect x="72" y="15" width="4" height="18" fill="#020952"/>
              <rect x="82" y="6" width="4" height="28" fill="#020952"/>
              <rect x="92" y="11" width="4" height="23" fill="#020952"/>
            </svg>
          </a>
          <nav class="header-nav" role="navigation">
            <a
              v-for="link in navLinks"
              :key="link.path"
              :href="link.path"
              class="nav-link"
              :class="{ 'nav-link-active': link.active }"
            >
              {{ link.name }}
            </a>
          </nav>
        </div>
        <div class="header-right">
          <a href="/demo" class="btn btn-outline">申请演示</a>
          <a href="/start" class="btn btn-filled">开始使用</a>
        </div>
      </div>
    </header>

    <!-- 2. Hero 区 -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
        <div class="hero-decoration">
          <div class="deco-card deco-card-1"></div>
          <div class="deco-card deco-card-2"></div>
          <div class="deco-card deco-card-3"></div>
        </div>
      </div>
      <div class="hero-content">
        <div class="hero-left">
          <h1 class="hero-title">{{ pageData.heroTitle }}</h1>
          <p class="hero-desc">{{ pageData.heroDesc }}</p>
          <button class="hero-btn" @click="handleStart">开始使用</button>
        </div>
        <div class="hero-right">
          <div class="deco-cards">
            <div class="deco-card-large"></div>
            <div class="deco-card-medium"></div>
            <div class="deco-card-small"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 描述区块 -->
    <section class="desc-section">
      <h2 class="desc-title">{{ pageData.descTitle }}</h2>
      <p class="desc-text">{{ pageData.descText }}</p>
    </section>

    <!-- 4. 为什么选择 IFTS -->
    <section class="features-section">
      <h2 class="section-title">{{ pageData.featuresTitle }}</h2>
      <div class="features-grid">
        <div
          v-for="(feature, index) in pageData.features"
          :key="index"
          class="feature-card"
        >
          <div class="feature-icon">
            <svg width="222" height="222" viewBox="0 0 222 222" fill="none">
              <circle cx="111" cy="111" r="90" fill="rgba(0,115,255,0.1)" />
              <circle cx="111" cy="111" r="60" fill="rgba(0,115,255,0.2)" />
              <circle cx="111" cy="111" r="30" fill="#0073FF" />
            </svg>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 5. 代码框架 -->
    <section class="code-section">
      <div class="code-header">
        <h2 class="section-title-left">{{ pageData.codeTitle }}</h2>
        <button class="code-btn" @click="handleStart">开始使用</button>
      </div>
      <div class="code-placeholder">
        <div class="code-mock">
          <div class="code-line"><span class="code-keyword">import</span> ifts</div>
          <div class="code-line"><span class="code-keyword">from</span> IFTS.example <span class="code-keyword">import</span> signal</div>
          <div class="code-line"></div>
          <div class="code-line comment"># 创建信道参数</div>
          <div class="code-line">ch_para = ifts.channel_para(</div>
          <div class="code-line">    rand_seed=<span class="code-number">42</span>,</div>
          <div class="code-line">    simu_configs=<span class="code-string">'./config.yaml'</span></div>
          <div class="code-line">)</div>
          <div class="code-line"></div>
          <div class="code-line comment"># 信号传输</div>
          <div class="code-line">output = ch_para.forward(signal)</div>
        </div>
      </div>
    </section>

    <!-- 6. CTA 区 -->
    <section class="cta-section">
      <div class="cta-bg"></div>
      <h2 class="cta-title">{{ pageData.ctaTitle }}</h2>
      <button class="cta-btn" @click="handleStart">开始使用</button>
    </section>

    <!-- 7. 页脚 -->
    <footer class="page-footer">
      <div class="footer-container">
        <div class="footer-left">
          <svg class="footer-logo" width="205" height="68" viewBox="0 0 112 37" fill="none">
            <polygon points="6,0 28,0 28,26" fill="#FFFFFF" />
            <polygon points="0,17 22,17 22,37" fill="#FFFFFF" />
            <rect x="42" y="4" width="4" height="30" fill="#FFFFFF"/>
            <rect x="52" y="12" width="4" height="22" fill="#FFFFFF"/>
            <rect x="62" y="8" width="4" height="26" fill="#FFFFFF"/>
            <rect x="72" y="15" width="4" height="18" fill="#FFFFFF"/>
            <rect x="82" y="6" width="4" height="28" fill="#FFFFFF"/>
            <rect x="92" y="11" width="4" height="23" fill="#FFFFFF"/>
          </svg>
          <div class="contact-info">
            <div class="contact-item">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6L12 13L2 6"/>
              </svg>
              <span>商务合作请联系：business@infra.com</span>
            </div>
            <div class="contact-item">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5">
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
defineProps({
  pageData: {
    type: Object,
    default: () => ({
      heroTitle: '智能仿真工具 IFTS',
      heroDesc: '基于Python开发的智能光通信开源仿真工具，旨在满足科学家，光通信工程师及相关领域研究人员对于光通信仿真工具包的需求。',
      descTitle: '致力于降低光通信研究门槛 打通信息壁垒',
      descText: 'IFTS基于 PyTorch 构建智能仿真平台，通过 GPU 加速与神经网络算法融合，实现光通信系统的高效仿真与智能算法设计',
      featuresTitle: '为什么选择 IFTS',
      features: [
        { title: 'PYTHON开发', desc: '易于上手，可根据自身需求扩展其功能' },
        { title: '开源免费', desc: '开源通信工具包，助力光通信智能化研究' },
        { title: '高效仿真', desc: 'GPU并行计算与AI信道模型，加速智能仿真平台' },
        { title: '智能算法', desc: '聚焦光通信领域前沿，融合AI框架' }
      ],
      codeTitle: '代码框架',
      ctaTitle: '立即试用 IFTS'
    })
  }
})

const emit = defineEmits(['navigate', 'start', 'tabChange'])

const navLinks = [
  { name: '产品', path: '/products', active: true },
  { name: '新闻中心', path: '/news', active: false },
  { name: '资源', path: '/resources', active: false },
  { name: '关于 LightInfra', path: '/about', active: false },
  { name: '联系我们', path: '/contact', active: false }
]

const handleStart = () => {
  emit('start', 'ifts')
}
</script>

<style scoped>
.ifts-product-page {
  width: 100%;
  min-height: 100vh;
  background: #121212;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

/* ========== 1. 顶部导航栏 ========== */
.page-header {
  width: 100%;
  height: 80px;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  width: 1200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 77px;
}

.header-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: #020952;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #0073FF;
}

.nav-link-active {
  color: #0073FF;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

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
}

.btn-outline {
  background: transparent;
  color: #020952;
  border: 1px solid #020952;
}

.btn-outline:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.btn-filled {
  background: #020952;
  color: #FFFFFF;
  border: 1px solid #020952;
}

.btn-filled:hover {
  background: #0073FF;
  border-color: #0073FF;
}

/* ========== 2. Hero 区 ========== */
.hero-section {
  position: relative;
  width: 100%;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
}

.hero-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deco-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 20px;
  transform: matrix(0.87, 0.5, -0.87, 0.5, 0, 0);
}

.deco-card-1 {
  width: 300px;
  height: 400px;
  top: 20%;
  right: 10%;
}

.deco-card-2 {
  width: 250px;
  height: 350px;
  top: 35%;
  right: 30%;
}

.deco-card-3 {
  width: 200px;
  height: 300px;
  top: 50%;
  right: 50%;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 55px;
}

.hero-left {
  width: 539px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.hero-title {
  font-size: 64px;
  font-weight: 600;
  line-height: 75px;
  margin: 0;
  background: linear-gradient(90deg, #020952 0%, #000000 62.98%, #002B81 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #121212;
  margin: 0;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid #121212;
  border-radius: 73px;
  font-size: 24px;
  font-weight: 500;
  color: #121212;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.hero-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.hero-right {
  width: 539px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deco-cards {
  position: relative;
  width: 400px;
  height: 500px;
}

.deco-card-large,
.deco-card-medium,
.deco-card-small {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
}

.deco-card-large {
  width: 300px;
  height: 400px;
  top: 50px;
  right: 0;
  transform: rotate(15deg);
}

.deco-card-medium {
  width: 250px;
  height: 300px;
  top: 100px;
  right: 80px;
  transform: rotate(10deg);
}

.deco-card-small {
  width: 200px;
  height: 250px;
  top: 150px;
  right: 150px;
  transform: rotate(5deg);
}

/* ========== 3. 描述区块 ========== */
.desc-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.desc-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0;
}

.desc-text {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #AFAFAF;
  margin: 0;
}

/* ========== 4. 特性区 ========== */
.features-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
}

.section-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  text-align: center;
  margin: 0;
}

.section-title-left {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px 77px;
  width: 100%;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
}

.feature-icon {
  width: 222px;
  height: 222px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #FFFFFF;
  margin: 0;
}

.feature-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #AFAFAF;
  margin: 0;
}

/* ========== 5. 代码框架 ========== */
.code-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.code-btn {
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
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.code-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.code-placeholder {
  width: 100%;
  height: 676px;
  background: #1E1E1E;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
}

.code-mock {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 18px;
  line-height: 1.8;
  color: #D4D4D4;
}

.code-line {
  margin-bottom: 8px;
}

.code-keyword {
  color: #C586C0;
}

.code-number {
  color: #B5CEA8;
}

.code-string {
  color: #CE9178;
}

.comment {
  color: #6A9955;
}

/* ========== 6. CTA 区 ========== */
.cta-section {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(0, 115, 255, 0.3) 0%, transparent 70%);
  z-index: 0;
}

.cta-title {
  position: relative;
  z-index: 1;
  font-size: 64px;
  font-weight: 500;
  line-height: 75px;
  color: #FFFFFF;
  text-align: center;
  margin: 0;
}

.cta-btn {
  position: relative;
  z-index: 1;
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
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.cta-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

/* ========== 7. 页脚 ========== */
.page-footer {
  width: 100%;
  background: #121212;
  border-top: 1px solid #323232;
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
  color: #FFFFFF;
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
  color: #FFFFFF;
  margin: 0;
}

.column-link {
  font-size: 14px;
  font-weight: 400;
  color: #FFFFFF;
  text-decoration: none;
  transition: color 0.2s ease;
}

.column-link:hover {
  color: #0073FF;
}
</style>
