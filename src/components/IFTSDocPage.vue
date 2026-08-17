<template>
  <div class="ifts-doc-page">
    <!-- 主内容区域 - 去掉顶部导航栏、左侧导航栏和内部TOC，只保留文档内容 -->
    <main class="doc-main-content">
      <!-- 主文档内容区 -->
      <div class="doc-content">
        <!-- 5.1 面包屑 -->
        <div class="breadcrumb">
          <span>首页</span><span class="separator">/</span><span>资源</span><span class="separator">/</span><span>IFTS</span><span class="separator">/</span><span class="current">代码说明文档</span>
        </div>

        <!-- 5.2 页面标题 -->
        <h1 class="page-title">IFTS 代码说明文档</h1>

        <!-- 5.3 页面引言 -->
        <p class="intro-text">本文档提供 IFTS 各模块的代码结构说明与使用指引。</p>

        <!-- 5.4 标签行 -->
        <div class="tag-row">
          <span class="tag">v2.1.0</span>
          <span class="tag">代码说明文档</span>
        </div>

        <!-- 5.5 分隔线 -->
        <hr class="divider" />

        <!-- 5.6 章节一：简介 -->
        <section id="intro" class="doc-section">
          <h2 class="section-title">简介</h2>
          <p class="section-text">IFTS（Intelligent Fiber Transmission Simulation）是一个面向光纤通信系统的智能仿真工具。该平台基于先进的物理模型和数值算法，能够准确模拟光信号在光纤中的传输特性，为科研人员和工程师提供高效的仿真验证环境。</p>
          <p class="section-text">该平台支持从信号生成、调制、信道传输到接收端信号处理的全链路仿真。用户可以根据实际需求灵活配置系统参数，快速验证算法有效性，大幅缩短研发周期。</p>

          <!-- 5.7 平台特点卡片 -->
          <div class="feature-card">
            <div class="feature-title">平台特点</div>
            <div class="feature-list">
              <div v-for="feat in features" :key="feat.num" class="feature-item">
                <span class="feature-num">{{ feat.num }}</span>
                <span class="feature-name">{{ feat.name }}</span>
                <div class="feature-desc">{{ feat.desc }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 5.8 分隔线 -->
        <hr class="divider" />

        <!-- 5.9 章节二：文档结构 -->
        <section id="structure" class="doc-section">
          <h2 class="section-title">文档结构</h2>
          <p class="section-text">IFTS 代码库包含以下六个核心模块，点击模块名称或子模块标签可跳转至对应代码文档。</p>

          <!-- 5.10 文档结构模块列表 -->
          <div class="module-list">
            <div v-for="mod in modules" :key="mod.num" class="module-card" :style="{ height: mod.height + 'px' }">
              <div class="module-header">
                <span class="module-num">{{ mod.num }}</span>
                <span class="module-name" @click="$emit('moduleClick', mod.name)">{{ mod.name }}</span>
                <span class="module-desc">{{ mod.desc }}</span>
              </div>
              <div class="module-sub-list">
                <span v-for="sub in mod.subs" :key="sub" class="module-sub-tag" :class="{ 'module-sub-tag-underline': sub === 'filter_func' }">{{ sub }}</span>
              </div>
            </div>
          </div>

          <!-- 5.11 阅读建议卡片 -->
          <div class="suggestion-card">
            <div class="suggestion-title">阅读建议</div>
            <div class="suggestion-text">建议按照模块编号顺序依次阅读，代码模块相互依赖层级递进。</div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  activeProduct: { type: String, default: 'IFTS' },
  activeTab: { type: String, default: '文档' }
})

const emit = defineEmits([
  'update:activeProduct', 'update:activeTab', 'update:activeSection', 'navigate', 'search', 'moduleClick', 'menuSelect'
])

const isSearchFocused = ref(false)
const searchKeyword = ref('')
const indicatorTop = ref('38px')
const activeChapter = ref('intro')

const features = [
  { num: '01', name: '全链路仿真', desc: '覆盖从发射端到接收端的完整仿真流程' },
  { num: '02', name: '模块化设计', desc: '各功能模块独立封装，可灵活组合' },
  { num: '03', name: '高性能计算', desc: '支持 GPU 加速，大幅提升仿真效率' }
]

const modules = [
  { num: '01', name: 'Base Module', desc: '基础模块，包含信号生成，光学参数配置等基础功能', subs: ['base_dsp', 'base_optics', 'base_para'], height: 100 },
  { num: '02', name: 'Signal', desc: '信号处理模块，负责信号生成与调制解调', subs: ['data_gen', 'modulation', 'demod_design', 'constellations', 'perf_calculation'], height: 100 },
  { num: '03', name: 'Channel', desc: '信道仿真模块，模拟光纤传输特性', subs: ['channel_para', 'coherent_receiver', 'EDFA', 'SSFM', 'WSS', 'NN'], height: 100 },
  { num: '04', name: 'Transmitter', desc: '发射端模块，实现信号发送端处理', subs: ['shaping'], height: 100 },
  { num: '05', name: 'Receiver', desc: '接收端模块，实现信号接收与恢复', subs: ['rxsignal_para', 'rx_main', 'lpf_design', 'imbalance_eq', 'cdc_design', 'adaptive_filter', 'cma', 'synchron_design', 'correlation', 'cpe_design', 'cpe_algorithms'], height: 140 },
  { num: '06', name: 'ToolBox', desc: '工具集模块，提供辅助计算与转换函数', subs: ['base_conversion', 'calculation', 'fftconv', 'filter_design', 'filter_func', 'movemean', 'normalization', 'unwrap', 'resample'], height: 140 }
]

const tocChapters = [
  { id: 'intro', title: '简介' },
  { id: 'structure', title: '平台特点' },
  { id: 'structure', title: '文档结构' },
  { id: 'structure', title: '阅读建议' }
]

const handleSearch = () => { emit('search', searchKeyword.value) }

const scrollToSection = (id) => {
  activeChapter.value = id
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.ifts-doc-page {
  width: 100%;
  min-height: 600px;
  background: #FFFFFF;
  font-family: system-ui, -apple-system, sans-serif;
}

.doc-main-content {
  display: flex;
  position: relative;
}

/* ========== 右侧页内导航 ========== */
.toc-sidebar {
  position: sticky;
  top: 20px;
  width: 180px;
  flex-shrink: 0;
  padding-left: 12px;
  border-left: 1px solid #E2E7EF;
  align-self: flex-start;
}

.toc-header {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 14px;
}

.toc-indicator {
  position: absolute;
  left: -1px;
  width: 2px;
  height: 28px;
  background: #0073FF;
  border-radius: 1px;
  top: 38px;
  transition: top 0.2s ease;
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.toc-item {
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  cursor: pointer;
  transition: color 0.2s ease;
}

.toc-item:hover {
  color: #0073FF;
}

.toc-item-active {
  color: #0073FF;
  font-weight: 600;
}

/* ========== 主文档内容区 ========== */
.doc-content {
  flex: 1;
  max-width: 690px;
  padding-bottom: 80px;
}

.breadcrumb {
  font-size: 12px;
  color: #8E96A6;
  line-height: 20px;
}

.breadcrumb .separator {
  margin: 0 8px;
}

.breadcrumb .current {
  color: #121212;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #121212;
  line-height: 36px;
  margin-top: 16px;
}

.intro-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin-top: 12px;
}

.tag-row {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.tag {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  background: #F0F7FF;
  border-radius: 16px;
  font-size: 12px;
  color: #0073FF;
}

.divider {
  width: 100%;
  height: 1px;
  background: #E2E7EF;
  border: none;
  margin-top: 24px;
}

.doc-section {
  margin-top: 36px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  line-height: 32px;
}

.section-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin-top: 14px;
}

/* 平台特点卡片 */
.feature-card {
  width: 100%;
  min-height: 120px;
  background: #F8FAFD;
  border: 1px solid #E2E7EF;
  border-radius: 12px;
  padding: 16px 20px;
  margin-top: 30px;
}

.feature-title {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 22px;
}

.feature-list {
  display: flex;
  gap: 36px;
  margin-top: 10px;
}

.feature-item {
  flex: 1;
}

.feature-num {
  font-size: 12px;
  color: #0073FF;
}

.feature-name {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-left: 6px;
}

.feature-desc {
  font-size: 12px;
  color: #535C6E;
  margin-top: 4px;
}

/* 模块列表 */
.module-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 24px;
}

.module-card {
  background: #FFFFFF;
  border: 1px solid #E2E7EF;
  border-radius: 10px;
  padding: 16px 18px;
}

.module-header {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 22px;
}

.module-num {
  font-size: 12px;
  color: #0073FF;
}

.module-name {
  font-size: 14px;
  font-weight: 600;
  color: #0073FF;
  cursor: pointer;
}

.module-name:hover {
  text-decoration: underline;
}

.module-desc {
  font-size: 14px;
  color: #535C6E;
}

.module-sub-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.module-sub-tag {
  padding: 6px 10px;
  background: #F0F7FF;
  border-radius: 14px;
  font-size: 12px;
  color: #0073FF;
  cursor: pointer;
  transition: background 0.2s ease;
}

.module-sub-tag:hover {
  background: #E0EDFF;
}

.module-sub-tag-underline {
  text-decoration: underline;
}

/* 阅读建议卡片 */
.suggestion-card {
  width: 100%;
  min-height: 80px;
  background: #F0F7FF;
  border-radius: 10px;
  padding: 14px 18px;
  margin-top: 20px;
}

.suggestion-title {
  font-size: 14px;
  font-weight: 600;
  color: #0073FF;
}

.suggestion-text {
  font-size: 14px;
  color: #535C6E;
  margin-top: 8px;
}
</style>
