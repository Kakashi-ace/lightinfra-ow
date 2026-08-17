<template>
  <div class="base-para-doc-page">
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
          <span>Base Module</span>
          <span class="separator">/</span>
          <span class="current">base_para</span>
        </div>

        <!-- 5.2 页面标题 -->
        <h1 class="page-title">base_para 类说明</h1>

        <!-- 5.3 页面副标题 -->
        <p class="page-subtitle">
          {{ docData?.subtitle || 'base_para 是 IFTS 仿真工具中负责参数配置与初始化的基础类。' }}
        </p>

        <!-- 5.4 分隔线 -->
        <hr class="divider" />

        <!-- 5.5 章节标题：类说明 -->
        <section :id="pageNavItems[0].id" class="doc-section">
          <h2 class="section-title">{{ pageNavItems[0].title }}</h2>

          <!-- 5.6 类说明正文 -->
          <p class="section-text">
            {{ docData?.classDesc || '该类提供了全局参数配置的读取、保存及对象初始化功能，是仿真环境搭建的核心组件。' }}
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
              <span class="table-col-methods col1">Methods</span>
              <span class="table-col-desc col2">Description</span>
            </div>
            <div class="table-divider"></div>
            <div v-for="(method, index) in methods" :key="method.name" class="table-row">
              <span class="table-col-methods col1">{{ method.name }}</span>
              <span class="table-col-desc col2">{{ method.desc }}</span>
            </div>
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
  { id: 'internal-methods', title: '内部函数' }
]

const attributes = [
  { name: 'name', format: 'str', desc: '对象名称' },
  { name: 'configs', format: '配置文件', desc: '参数配置对象' }
]

const methods = [
  { name: 'read_configs', desc: '从配置文件读取参数' },
  { name: 'save_configs', desc: '保存更新后的配置文件' },
  { name: 'init_ftn', desc: '从配置中查找并返回函数句柄' },
  { name: 'init_obj', desc: '根据配置参数初始化对象实例' },
  { name: '_check', desc: '检查对象属性' },
  { name: '_config_check', desc: '检查参数配置' }
]

const activeNavItem = ref('class-desc')
const indicatorTop = ref('38px')

const indicatorPositions = {
  'class-desc': '38px',
  'main-attrs': '152px',
  'internal-methods': '266px'
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
.base-para-doc-page {
  width: 100%;
  min-height: 1978px;
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
  margin-top: 0;
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
  padding: 14px 0;
}

.table-col {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  padding-left: 20px;
}

.table-col.col1 { width: 170px; }
.table-col.col2 { width: 120px; }
.table-col.col3 { width: 400px; }

.table-col-methods.col1 { width: 220px; }
.table-col-desc.col2 { width: 470px; }

.table-divider {
  width: 100%;
  height: 1px;
  background: #E2E7EF;
}

.table-row {
  display: flex;
  padding: 14px 0;
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
  padding-left: 20px;
}

.table-row .col1 { width: 170px; }
.table-row .col2 { width: 120px; }
.table-row .col3 { width: 400px; }

.table-row .table-col-methods.col1 { width: 220px; }
.table-row .table-col-desc.col2 { width: 470px; }

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
