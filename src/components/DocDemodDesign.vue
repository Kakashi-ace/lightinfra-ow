<template>
  <div class="demod-design-doc-page">
    <!-- 主内容区域 -->
    <main class="doc-main-content">
      <!-- 主文档内容区 -->
      <div class="doc-content">
        <!-- 5.1 面包屑 -->
        <div class="breadcrumb">
          <span>资源</span>
          <span class="separator">/</span>
          <span>文档</span>
          <span class="separator">/</span>
          <span>IFTS</span>
          <span class="separator">/</span>
          <span>代码说明文档</span>
          <span class="separator">/</span>
          <span>Signal</span>
          <span class="separator">/</span>
          <span class="current">demod_design</span>
        </div>

        <!-- 5.2 页面标题 -->
        <h1 class="page-title">demod_design 类说明</h1>

        <!-- 5.3 页面副标题 -->
        <p class="page-subtitle">
          {{ docData?.subtitle || 'demod_design 类提供了信号解调、硬判决、LLR 计算及比特映射等功能。' }}
        </p>

        <!-- 5.4 分隔线 -->
        <hr class="divider" />

        <!-- 5.5 章节标题：类说明 -->
        <section :id="pageNavItems[0].id" class="doc-section">
          <h2 class="section-title">{{ pageNavItems[0].title }}</h2>

          <!-- 5.6 类说明正文 -->
          <p class="section-text">
            {{ docData?.classDesc || '该类封装了多种解调算法，支持硬判决和软判决，并提供对数似然比计算和比特序列提取。' }}
          </p>
        </section>

        <!-- 5.7 主要属性表格 -->
        <section :id="pageNavItems[1].id" class="doc-section">
          <h2 class="section-title">{{ pageNavItems[1].title }}</h2>
          <div class="table-container">
            <div class="table-header">
              <span class="table-col col1">Attributes</span>
              <span class="table-col col2">Format</span>
              <span class="table-col col3">Description</span>
            </div>
            <div class="table-divider"></div>
            <div v-for="(attr, index) in attributes" :key="attr.name" class="table-row">
              <span class="table-col col1">{{ attr.name }}</span>
              <span class="table-col col2">{{ attr.format }}</span>
              <span class="table-col col3">{{ attr.desc }}</span>
            </div>
          </div>
        </section>

        <!-- 5.8 内部函数表格 -->
        <section :id="pageNavItems[2].id" class="doc-section">
          <h2 class="section-title">{{ pageNavItems[2].title }}</h2>
          <div class="table-container">
            <div class="table-header">
              <span class="table-col-methods col1">Functions</span>
              <span class="table-col-desc col2">Description</span>
            </div>
            <div class="table-divider"></div>
            <div v-for="(method, index) in methods" :key="method.name" class="table-row">
              <span class="table-col-methods col1">{{ method.name }}</span>
              <span class="table-col-desc col2">{{ method.desc }}</span>
            </div>
          </div>
        </section>

        <!-- 5.9 背景信息卡片 -->
        <section :id="pageNavItems[3].id" class="doc-section">
          <div class="info-card">
            <div class="info-card-title">{{ pageNavItems[3].title }}</div>
            <p class="info-card-text">
              {{ docData?.backgroundInfo || '解调设计模块参考了经典相干光通信接收算法，适用于多种调制格式。' }}
            </p>
          </div>
        </section>
      </div>

      <!-- 右侧页内导航 -->
      <aside class="page-nav">
        <div class="nav-track">
          <div class="nav-indicator" :style="{ top: indicatorTop }"></div>
        </div>
        <div class="nav-list">
          <div class="nav-header">页面目录</div>
          <div
            v-for="item in pageNavItems"
            :key="item.id"
            class="nav-item"
            :class="{ 'nav-item-active': activeNavItem === item.id }"
            @click="scrollToNav(item.id)"
          >
            {{ item.title }}
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  docData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'navigate', 'tabChange', 'search', 'menuSelect', 'pageNavSelect'
])

const pageNavItems = [
  { id: 'class-desc', title: '类说明' },
  { id: 'main-attrs', title: '主要属性' },
  { id: 'internal-methods', title: '内部函数' },
  { id: 'background-info', title: '背景信息' }
]

const attributes = [
  { name: 'mode', format: 'str', desc: '信号解调模式' },
  { name: 'order', format: 'int', desc: 'QAM 信号的调制阶数' },
  { name: 'probability', format: 'array_like', desc: '可选、信号概率分布，默认不输入' },
  { name: 'data_mode', format: 'str', desc: '可选、数据格式，默认 numpy' }
]

const methods = [
  { name: '__init__', desc: '初始化解调相关参数' },
  { name: 'init', desc: '初始化其他键入参数' },
  { name: 'forward_pass', desc: '执行解调功能' },
  { name: 'get_bit', desc: '获取信号比特序列' },
  { name: '__get_llr__', desc: '获取对数似然比' },
  { name: '__get_bit_mapping__', desc: '获取星座图对应的比特序列' },
  { name: '__hard_decision__', desc: '以硬判决方式解调' },
  { name: '__decode_llr__', desc: '执行 LLR 解码' }
]

const activeNavItem = ref('class-desc')
const indicatorTop = ref('38px')

const indicatorPositions = {
  'class-desc': '38px',
  'main-attrs': '152px',
  'internal-methods': '266px',
  'background-info': '380px'
}

const scrollToNav = (id) => {
  activeNavItem.value = id
  indicatorTop.value = indicatorPositions[id] || '38px'
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  emit('pageNavSelect', { id })
}
</script>

<style scoped>
.demod-design-doc-page {
  width: 100%;
  min-height: 2240px;
  background: #FFFFFF;
  font-family: system-ui, -apple-system, sans-serif;
}

.doc-main-content {
  display: flex;
  gap: 40px;
}

/* ========== 主文档内容区 ========== */
.doc-content {
  flex: 1;
  max-width: 690px;
  padding-bottom: 80px;
}

.breadcrumb {
  font-size: 12px;
  font-weight: 400;
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
  margin-top: 14px;
  margin-bottom: 0;
}

.page-subtitle {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin-top: 12px;
}

.divider {
  width: 100%;
  height: 1px;
  background: #E2E7EF;
  border: none;
  margin-top: 14px;
}

.doc-section {
  margin-top: 36px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  line-height: 32px;
  margin: 0 0 14px 0;
}

.section-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin: 0;
}

/* ========== 表格样式 ========== */
.table-container {
  width: 100%;
  border: 1px solid #E2E7EF;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 14px;
}

.table-header {
  display: flex;
  background: #FAFBFD;
  padding: 14px 20px;
}

.table-col {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
}

.table-col.col1 {
  width: 170px;
  flex-shrink: 0;
}

.table-col.col2 {
  width: 120px;
  flex-shrink: 0;
}

.table-col.col3 {
  width: 400px;
  flex-shrink: 0;
}

.table-col-methods.col1 {
  width: 240px;
  flex-shrink: 0;
}

.table-col-desc.col2 {
  width: 450px;
  flex-shrink: 0;
}

.table-divider {
  width: 100%;
  height: 1px;
  background: #E2E7EF;
}

.table-row {
  display: flex;
  padding: 14px 20px;
  border-bottom: 1px solid #E2E7EF;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row .table-col,
.table-row .table-col-methods,
.table-row .table-col-desc {
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
}

/* ========== 背景信息卡片 ========== */
.info-card {
  width: 690px;
  background: #F0F7FF;
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-card-title {
  font-size: 14px;
  font-weight: 600;
  color: #0073FF;
}

.info-card-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin: 0;
}

/* ========== 右侧页内导航 ========== */
.page-nav {
  width: 180px;
  flex-shrink: 0;
  display: flex;
  gap: 0;
  padding-top: 0;
}

.nav-track {
  position: relative;
  width: 1px;
  background: #E2E7EF;
}

.nav-indicator {
  position: absolute;
  left: -1px;
  width: 2px;
  height: 28px;
  background: #0073FF;
  border-radius: 1px;
  transition: top 0.2s ease;
}

.nav-list {
  padding-left: 12px;
  flex: 1;
}

.nav-header {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 14px;
}

.nav-item {
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  cursor: pointer;
  transition: color 0.2s ease;
  line-height: 28px;
}

.nav-item:hover {
  color: #0073FF;
}

.nav-item-active {
  color: #0073FF;
  font-weight: 600;
}
</style>
