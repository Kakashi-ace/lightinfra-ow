<template>
  <div class="modulation-doc-page">
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
          <span class="current">modulation</span>
        </div>

        <!-- 5.2 页面标题 -->
        <h1 class="page-title">modulation 功能说明</h1>

        <!-- 5.3 页面副标题 -->
        <p class="page-subtitle">
          {{ docData?.subtitle || 'modulation 模块提供多种调制格式的实现，包括神经网络调制、PAM 和 QAM。' }}
        </p>

        <!-- 5.4 分隔线 -->
        <hr class="divider" />

        <!-- 5.5 章节标题：说明 -->
        <section :id="pageNavItems[0].id" class="doc-section">
          <h2 class="section-title">{{ pageNavItems[0].title }}</h2>

          <!-- 5.6 说明正文 -->
          <p class="section-text">
            {{ docData?.description || '该模块封装了多种调制函数，用于生成不同格式的调制信号。' }}
          </p>
        </section>

        <!-- 5.7 函数入口表格 -->
        <section :id="pageNavItems[1].id" class="doc-section">
          <h2 class="section-title">{{ pageNavItems[1].title }}</h2>
          <div class="table-container">
            <div class="table-header">
              <span class="table-col col1">Functions</span>
              <span class="table-col col2">Description</span>
            </div>
            <div class="table-divider"></div>
            <div v-for="(func, index) in functions" :key="func.name" class="table-row">
              <span class="table-col col1">{{ func.name }}</span>
              <span class="table-col col2">{{ func.desc }}</span>
            </div>
          </div>
        </section>

        <!-- 5.8 原始函数链接 -->
        <div class="function-links">
          <div
            v-for="func in functions"
            :key="func.name"
            class="function-link-tag"
            @click="handleFunctionClick(func.name)"
          >
            {{ func.name }} ↗
          </div>
        </div>
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
  'navigate', 'tabChange', 'search', 'menuSelect', 'pageNavSelect', 'functionClick'
])

const pageNavItems = [
  { id: 'func-desc', title: '功能说明' },
  { id: 'func-entry', title: '函数入口' }
]

const functions = [
  { name: 'nn', desc: '神经网络调制' },
  { name: 'pam', desc: 'PAM 信号调制' },
  { name: 'qam', desc: 'QAM 信号调制' }
]

const activeNavItem = ref('func-desc')
const indicatorTop = ref('38px')

const indicatorPositions = {
  'func-desc': '38px',
  'func-entry': '152px'
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

const handleFunctionClick = (functionName) => {
  emit('functionClick', functionName)
}
</script>

<style scoped>
.modulation-doc-page {
  width: 100%;
  min-height: 1631px;
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

/* ========== 函数入口表格 ========== */
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
  width: 240px;
  flex-shrink: 0;
}

.table-col.col2 {
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

.table-row .table-col {
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
}

/* ========== 原始函数链接 ========== */
.function-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.function-link-tag {
  padding: 6px 10px;
  background: #F0F7FF;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 400;
  color: #0073FF;
  cursor: pointer;
  transition: all 0.2s ease;
}

.function-link-tag:hover {
  background: #E0F0FF;
  color: #0055CC;
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
