<template>
  <div class="instrument-product-page">
    <!-- 1. 顶部导航栏 -->
    <header class="page-header">
      <div class="header-container">
        <div class="header-left">
          <a href="/" class="header-logo" aria-label="LightInfra 首页">
            <svg width="112" height="37" viewBox="0 0 112 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="6,0 28,0 28,26" fill="#FFFFFF" />
              <polygon points="0,17 22,17 22,37" fill="#FFFFFF" />
              <rect x="42" y="4" width="4" height="30" fill="#FFFFFF"/>
              <rect x="52" y="12" width="4" height="22" fill="#FFFFFF"/>
              <rect x="62" y="8" width="4" height="26" fill="#FFFFFF"/>
              <rect x="72" y="15" width="4" height="18" fill="#FFFFFF"/>
              <rect x="82" y="6" width="4" height="28" fill="#FFFFFF"/>
              <rect x="92" y="11" width="4" height="23" fill="#FFFFFF"/>
            </svg>
          </a>
          <nav class="header-nav" role="navigation">
            <a
              v-for="link in navLinks"
              :key="link.path"
              :href="link.path"
              class="nav-link"
              :class="{ 'nav-link-active': link.active }"
              @click.prevent="handleNavClick(link.path)"
            >
              {{ link.name }}
            </a>
          </nav>
        </div>
        <div class="header-right">
          <a href="/demo" class="btn btn-outline">申请演示</a>
          <a href="/start" class="btn btn-filled" @click.prevent="handleStart">开始使用</a>
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
          <div class="deco-card deco-card-4"></div>
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

    <!-- 4. 场景特性区 -->
    <section class="scenes-section">
      <h2 class="section-title">{{ pageData.scenesTitle }}</h2>
      <div class="scenes-grid">
        <div
          v-for="(scene, index) in pageData.scenes"
          :key="index"
          class="scene-card"
        >
          <div class="scene-content">
            <span class="scene-tag">{{ scene.tag }}</span>
            <h3 class="scene-title">{{ scene.title }}</h3>
          </div>
          <div class="scene-image-placeholder">
            <svg width="100%" height="100%" viewBox="0 0 200 150" fill="none">
              <rect width="200" height="150" fill="rgba(0,115,255,0.1)" />
              <circle cx="100" cy="75" r="40" fill="rgba(0,115,255,0.2)" />
              <circle cx="100" cy="75" r="20" fill="#0073FF" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 优势特点区 -->
    <section class="advantages-section">
      <div class="advantages-header">
        <h2 class="section-title-left">{{ pageData.advantagesTitle }}</h2>
        <button class="advantage-btn" @click="handleStart">开始使用</button>
      </div>
      <div class="advantages-grid">
        <div
          v-for="(adv, index) in pageData.advantages"
          :key="index"
          class="advantage-card"
          :class="[`advantage-card-${index + 1}`, { 'card-blue': adv.theme === 'blue', 'card-dark': adv.theme === 'dark', 'card-light': adv.theme === 'light' }]"
        >
          <h3 class="advantage-title">{{ adv.title }}</h3>
          <p class="advantage-desc">{{ adv.desc }}</p>
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
      heroTitle: '智能仪器仪表',
      heroDesc: '面向光学研发与产业测试场景，打造连接存量设备的智能测试平台，帮助企业实现仪器智能化升级与测试流程自动化。',
      descTitle: '让仪器统一接入，让测试智能执行',
      descText: '支持跨品牌、跨品类设备智能接入，通过 AI Agent 自动完成测试任务解析与仪器控制，实现测试流程自动化、数据统一管理与企业测试能力沉淀',
      scenesTitle: '智能仪器仪表能带来什么',
      scenes: [
        { tag: '面向研发', title: '更快搭建测试，更专注问题本身' },
        { tag: '面向产线', title: '统一测试标准，稳定每一次执行' },
        { tag: '面向管理者', title: '开源通信工具包，助力光通信智能化研究' },
        { tag: '面向整体愿景', title: '连接研发与生产，构建统一智能测试体系' }
      ],
      advantagesTitle: '优势特点',
      advantages: [
        {
          title: '存量仪器智能化升级',
          desc: '跨品牌、跨品类统一接入',
          theme: 'blue'
        },
        {
          title: '垂域大模型 智能拆解任务',
          desc: '只需要提供任务描述，垂域大模型自动拆解任务，并给出控制仪器指令，完成实验、测试全流程。',
          theme: 'dark'
        },
        {
          title: '自动发现、即插即用',
          desc: '仪器连接后自动识别品牌、型号、状态与可用能力，快速完成设备接入和控制界面配置，缩短研发环境搭建与产线工位部署时间。',
          theme: 'light'
        },
        {
          title: '测试结果统一管理',
          desc: '统一记录设备状态、执行步骤、参数配置、测试数据和判定结果，为问题复现、质量分析和过程追溯提供完整依据。',
          theme: 'dark'
        },
        {
          title: '能力持续沉淀',
          desc: '将个人经验沉淀为企业可复用的测试流程、仪器配置和案例资产，未来还可通过案例平台实现测试方案的分享与复用。',
          theme: 'blue'
        }
      ],
      ctaTitle: '立即试用智能仪器仪表'
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

const handleNavClick = (path) => {
  emit('navigate', path)
}

const handleStart = () => {
  emit('start', 'instrument')
}
</script>

<style scoped>
.instrument-product-page {
  width: 100%;
  min-height: 100vh;
  background: #121212;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

/* ========== 1. 顶部导航栏 ========== */
.page-header {
  width: 100%;
  height: 80px;
  background: transparent;
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
  color: #BBBBBB;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #FFFFFF;
}

.nav-link-active {
  color: #FFFFFF;
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
  cursor: pointer;
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
  background: radial-gradient(50% 50% at 50% 50%, #0073FF 0%, #131313 100%);
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
  overflow: hidden;
}

.hero-decoration .deco-card {
  position: absolute;
  background: linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 100%);
  border-radius: 30px;
  transform: matrix(0.87, 0.5, -0.87, 0.5, 0, 0);
}

.deco-card-1 {
  width: 300px;
  height: 400px;
  top: 15%;
  right: 5%;
}

.deco-card-2 {
  width: 250px;
  height: 350px;
  top: 30%;
  right: 20%;
}

.deco-card-3 {
  width: 200px;
  height: 280px;
  top: 45%;
  right: 35%;
}

.deco-card-4 {
  width: 180px;
  height: 250px;
  top: 60%;
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
  color: #FFFFFF;
  margin: 0;
}

.hero-desc {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
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
  border-radius: 73px;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
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
  background: linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 100%);
  border-radius: 30px;
  transform: matrix(0.87, 0.5, -0.87, 0.5, 0, 0);
}

.deco-card-large {
  width: 300px;
  height: 400px;
  top: 50px;
  right: 0;
}

.deco-card-medium {
  width: 250px;
  height: 350px;
  top: 100px;
  right: 80px;
}

.deco-card-small {
  width: 200px;
  height: 280px;
  top: 150px;
  right: 150px;
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

/* ========== 4. 场景特性区 ========== */
.scenes-section {
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

.scenes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 41px;
  width: 100%;
}

.scene-card {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 28px;
  background: linear-gradient(180deg, #202020 0%, rgba(54,63,74,0.5) 100%);
  border: 1px solid #323232;
  border-radius: 20px;
  min-height: 180px;
  transition: all 0.2s ease;
}

.scene-card:hover {
  border-color: #0073FF;
  transform: translateY(-4px);
}

.scene-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.scene-tag {
  font-size: 24px;
  font-weight: 500;
  color: #AFAFAF;
}

.scene-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #FFFFFF;
  margin: 0;
}

.scene-image-placeholder {
  width: 200px;
  height: 150px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
}

/* ========== 5. 优势特点区 ========== */
.advantages-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.advantages-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.advantage-btn {
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

.advantage-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px;
}

.advantage-card {
  padding: 28px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s ease;
}

.advantage-card:hover {
  transform: translateY(-4px);
}

/* 卡片1: 蓝色背景，宽584px */
.advantage-card-1 {
  grid-column: span 2;
  background: #0073FF;
  color: #FFFFFF;
  width: 100%;
}

/* 卡片2: 深色背景，宽562px */
.advantage-card-2 {
  grid-column: span 2;
  background: linear-gradient(180deg, #202020 0%, rgba(54,63,74,0.5) 100%);
  color: #D3D3D3;
  width: 100%;
}

/* 卡片3: 白色背景，浅色文字 */
.advantage-card-3 {
  background: #FFFFFF;
  color: #323232;
}

.advantage-card-3 .advantage-title,
.advantage-card-3 .advantage-desc {
  color: #323232;
}

/* 卡片4: 深色背景 */
.advantage-card-4 {
  background: linear-gradient(180deg, #202020 0%, rgba(54,63,74,0.5) 100%);
  color: #D3D3D3;
}

/* 卡片5: 蓝色背景 */
.advantage-card-5 {
  background: #0073FF;
  color: #FFFFFF;
}

.advantage-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  margin: 0;
}

.advantage-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  margin: 0;
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
