<template>
  <div class="ifts-product-page">
    <!-- 1. Hero 区 -->
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
          <h1 class="hero-title">{{ t('product.ifts.heroTitle') }}</h1>
          <p class="hero-desc">{{ t('product.ifts.heroDesc') }}</p>
          <button class="hero-btn" @click="handleStart">{{ t('common.startUsing') }}</button>
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
      <h2 class="desc-title">{{ t('product.ifts.descTitle') }}</h2>
      <p class="desc-text">{{ t('product.ifts.descText') }}</p>
    </section>

    <!-- 4. 为什么选择 IFTS -->
    <section class="features-section">
      <h2 class="section-title">{{ t('product.ifts.featuresTitle') }}</h2>
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
        <h2 class="section-title-left">{{ t('product.ifts.codeTitle') }}</h2>
        <button class="code-btn" @click="handleStart">{{ t('common.startUsing') }}</button>
      </div>
      <div class="code-placeholder">
        <div class="code-mock">
          <div class="code-line"><span class="code-keyword">import</span> ifts</div>
          <div class="code-line"><span class="code-keyword">from</span> IFTS.example <span class="code-keyword">import</span> signal</div>
          <div class="code-line"></div>
          <div class="code-line comment">{{ t('product.ifts.codeComment1') }}</div>
          <div class="code-line">ch_para = ifts.channel_para(</div>
          <div class="code-line">    rand_seed=<span class="code-number">42</span>,</div>
          <div class="code-line">    simu_configs=<span class="code-string">'./config.yaml'</span></div>
          <div class="code-line">)</div>
          <div class="code-line"></div>
          <div class="code-line comment">{{ t('product.ifts.codeComment2') }}</div>
          <div class="code-line">output = ch_para.forward(signal)</div>
        </div>
      </div>
    </section>

    <!-- 6. CTA 区 -->
    <section class="cta-section">
      <div class="cta-bg"></div>
      <h2 class="cta-title">{{ t('product.ifts.ctaTitle') }}</h2>
      <button class="cta-btn" @click="handleStart">{{ t('common.startUsing') }}</button>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

/* ========== 1. Hero 区 ========== */
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


</style>
