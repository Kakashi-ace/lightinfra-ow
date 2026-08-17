<template>
  <div class="opticsgpt-product-page">
    <!-- 2. Hero 区 -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
        <div class="hero-decoration"></div>
      </div>
      <div class="hero-content">
        <div class="hero-left">
          <h1 class="hero-title">{{ t('product.opticsgpt.heroTitle') }}</h1>
          <p class="hero-desc">{{ t('product.opticsgpt.heroDesc') }}</p>
          <button class="hero-btn" @click="handleStart">{{ t('common.startUsing') }}</button>
        </div>
        <div class="hero-right">
          <div class="hero-image-placeholder">
            <img v-if="pageData.heroImage" :src="pageData.heroImage" alt="OpticsGPT" class="hero-image" />
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 为什么选择 OpticsGPT -->
    <section class="features-section">
      <h2 class="section-title">{{ t('product.opticsgpt.featuresTitle') }}</h2>
      <div class="features-grid">
        <div
          v-for="(feature, index) in pageData.features"
          :key="index"
          class="feature-card"
        >
          <div class="feature-icon">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="80" fill="rgba(0,115,255,0.1)" />
              <circle cx="100" cy="100" r="50" fill="rgba(0,115,255,0.2)" />
              <circle cx="100" cy="100" r="25" fill="#0073FF" />
            </svg>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 评测对比表格 -->
    <section class="benchmark-section">
      <h2 class="section-title">{{ t('product.opticsgpt.benchmarkTitle') }}</h2>
      <div class="benchmark-table">
        <div class="table-header">
          <div class="table-cell cell-model">Model</div>
          <div class="table-cell">{{ t('product.opticsgpt.benchmark.opticalPhysics') }}</div>
          <div class="table-cell">{{ t('product.opticsgpt.benchmark.quantumOptics') }}</div>
          <div class="table-cell">{{ t('product.opticsgpt.benchmark.opticalDesign') }}</div>
          <div class="table-cell">{{ t('product.opticsgpt.benchmark.nonlinearOptics') }}</div>
          <div class="table-cell">{{ t('product.opticsgpt.benchmark.opticalComputing') }}</div>
          <div class="table-cell">{{ t('product.opticsgpt.benchmark.opticalComm') }}</div>
        </div>
        <div
          v-for="(row, rowIndex) in pageData.benchmarkData"
          :key="rowIndex"
          class="table-row"
          :class="{ 'row-highlight': row.highlight }"
        >
          <div class="table-cell cell-model">{{ row.model }}</div>
          <div class="table-cell">{{ row.scores[0] }}</div>
          <div class="table-cell">{{ row.scores[1] }}</div>
          <div class="table-cell">{{ row.scores[2] }}</div>
          <div class="table-cell">{{ row.scores[3] }}</div>
          <div class="table-cell">{{ row.scores[4] }}</div>
          <div class="table-cell">{{ row.scores[5] }}</div>
        </div>
      </div>
    </section>

    <!-- 5. 核心功能 -->
    <section class="core-functions-section">
      <h2 class="section-title section-title-left">{{ t('product.opticsgpt.coreFunctionsTitle') }}</h2>
      <div class="functions-grid">
        <div
          v-for="(func, index) in pageData.coreFunctions"
          :key="index"
          class="function-card"
        >
          <h3 class="function-title">{{ func.title }}</h3>
          <p class="function-desc">{{ func.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 6. 提示条 -->
    <section class="notice-section">
      <div class="notice-bar">
        <span class="notice-text">{{ t('product.opticsgpt.noticeText') }}</span>
      </div>
    </section>

    <!-- 7. CTA 区 -->
    <section class="cta-section">
      <h2 class="cta-title">{{ t('product.opticsgpt.ctaTitle') }}</h2>
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
      heroTitle: 'OpticsGPT',
      heroDesc: '面向光学领域的专业大语言模型，旨在满足光学科研人员、光通信工程师及产业技术专家对于专业 AI 工具的需求。',
      heroImage: '',
      featuresTitle: '为什么选择 OpticsGPT',
      features: [
        { title: '轻部署', desc: '8B参数量级，支持端侧及边缘高效部署，降低应用门槛' },
        { title: '高认知', desc: '经海量专业数据训练，具备深厚的"光学素养"与精准逻辑直觉' },
        { title: '强应用', desc: '在算法生成、系统诊断、仿真设计等核心应用场景性能全面领先' },
        { title: '全可控', desc: '从数据、训练到部署，全流程自主可控，保障产业安全' }
      ],
      benchmarkTitle: '实现对通用模型在光领域测评的领先',
      benchmarkData: [
        { model: 'GPT-4o', scores: ['78.92', '74.52', '80.89', '77.13', '80.73', '83.49'], highlight: false },
        { model: 'DeepSeek R1（671B）', scores: ['79.19', '75.93', '82.28', '76.31', '83.03', '83.50'], highlight: false },
        { model: 'OpticsGPT（8B）', scores: ['84.46', '77.22', '77.22', '83.75', '86.70', '84.40'], highlight: true }
      ],
      coreFunctionsTitle: '核心功能',
      coreFunctions: [
        { title: '光学知识理解', desc: '融合专业知识体系与工程数据，实现光学领域深度理解与智能推理。' },
        { title: '专业任务生成', desc: '支持光学设计、算法生成与系统优化，辅助工程师完成复杂任务。' },
        { title: '智能系统诊断', desc: '结合领域知识分析系统状态，提供故障定位与优化建议。' }
      ],
      noticeText: 'OpticsGPT 在光物理、光计算、光通信等多项指标上领先通用模型',
      ctaTitle: '立即试用 OpticsGPT'
    })
  }
})

const emit = defineEmits(['navigate', 'start', 'tabChange'])

const handleStart = () => {
  emit('start', 'opticsgpt')
}
</script>

<style scoped>
.opticsgpt-product-page {
  width: 100%;
  min-height: 100vh;
  background: #121212;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

/* ========== 2. Hero 区 ========== */
.hero-section {
  position: relative;
  width: 100%;
  height: 643px;
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
  background: linear-gradient(180deg, #0073FF 0%, #121212 100%);
}

.hero-decoration {
  position: absolute;
  top: 50%;
  right: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0,115,255,0.3) 0%, transparent 70%);
  transform: translateY(-50%);
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
  width: 646px;
  height: 542px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
}

.hero-image-placeholder {
  width: 100%;
  height: 100%;
  background: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ========== 3. 特性区 ========== */
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
  text-align: left;
}

.features-grid {
  display: flex;
  gap: 77px;
  justify-content: center;
}

.feature-card {
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.feature-icon {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #0073FF;
  margin: 0;
  text-align: center;
}

.feature-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #AFAFAF;
  margin: 0;
  text-align: center;
}

/* ========== 4. 评测对比表格 ========== */
.benchmark-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
}

.benchmark-table {
  width: 100%;
  border: 1px solid #D1D1D1;
  border-radius: 20px;
  overflow: hidden;
  background: transparent;
}

.table-header {
  display: flex;
  background: rgba(242, 242, 242, 0.2);
  border-bottom: 1px solid #D1D1D1;
}

.table-row {
  display: flex;
  border-bottom: 1px solid rgba(209, 209, 209, 0.23);
}

.table-row:last-child {
  border-bottom: none;
}

.table-row.row-highlight {
  color: #0073FF;
}

.table-header .table-cell {
  font-weight: 500;
  color: #FFFFFF;
}

.table-cell {
  flex: 1;
  padding: 20px;
  font-size: 24px;
  font-weight: 400;
  color: #FFFFFF;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell-model {
  text-align: left;
  justify-content: flex-start;
}

.table-row.row-highlight .table-cell {
  font-weight: 500;
  color: #0073FF;
}

/* ========== 5. 核心功能 ========== */
.core-functions-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.functions-grid {
  display: flex;
  gap: 41px;
  justify-content: center;
}

.function-card {
  width: 384px;
  height: 229px;
  padding: 28px;
  background: linear-gradient(180deg, #202020 0%, rgba(54, 63, 74, 0.5) 100%);
  border: 1px solid #323232;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.2s ease;
}

.function-card:hover {
  border-color: #0073FF;
  transform: translateY(-4px);
}

.function-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #D3D3D3;
  margin: 0;
}

.function-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #D3D3D3;
  margin: 0;
}

/* ========== 6. 提示条 ========== */
.notice-section {
  width: 100%;
  max-width: 1225px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.notice-bar {
  width: 100%;
  height: 49px;
  padding: 0 20px;
  background: rgba(164, 205, 255, 0.22);
  border: 1px solid #0073FF;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notice-text {
  font-size: 14px;
  color: #FFFFFF;
}

/* ========== 7. CTA 区 ========== */
.cta-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.cta-title {
  font-size: 64px;
  font-weight: 500;
  line-height: 75px;
  color: #FFFFFF;
  text-align: center;
  margin: 0;
}

.cta-btn {
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

.cta-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}


</style>
