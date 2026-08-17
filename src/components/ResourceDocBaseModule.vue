<template>
  <div class="base-module-page">
    <!-- 主内容区域 - 去掉顶部导航栏、左侧导航栏和内部TOC，只保留文档内容 -->
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
          <span class="current">Base Module</span>
        </div>

        <!-- 5.2 页面标题 -->
        <h1 class="page-title">Base Module 模块说明</h1>

        <!-- 5.3 页面副标题 -->
        <p class="page-subtitle">Base Module 是 IFTS 仿真工具的基础模块，提供了信号处理，光学仿真及参数配置等核心功能。</p>

        <!-- 5.4 分隔线 -->
        <hr class="divider" />

        <!-- 5.5 章节标题 -->
        <section id="module-intro" class="doc-section">
          <h2 class="section-title">模块构成</h2>

          <!-- 5.6 子模块入口列表 -->
          <div class="submodule-list">
            <div
              v-for="mod in subModules"
              :key="mod.name"
              class="submodule-card"
              @click="$emit('subModuleClick', mod.name)"
            >
              <span class="submodule-name">{{ mod.name }}</span>
              <span class="submodule-desc">{{ mod.desc }}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  docData: { type: Object, default: () => ({}) },
  activeTab: { type: String, default: '文档' }
})

const emit = defineEmits([
  'navigate', 'tabChange', 'search', 'menuSelect', 'subModuleClick', 'pageNavSelect'
])

const isSearchFocused = ref(false)
const searchKeyword = ref('')
const activeChapter = ref('module-intro')
const indicatorTop = ref('38px')

const tocChapters = [
  { id: 'module-intro', title: '模块简介' },
  { id: 'module-intro', title: '模块构成' }
]

const subModules = [
  { name: 'base_dsp', desc: '数字信号处理相关函数，包括滤波、重采样、FFT 等。' },
  { name: 'base_optics', desc: '光学基础函数，包括光源生成、调制器建模等。' },
  { name: 'base_para', desc: '全局参数配置与初始化设置。' }
]

const handleSearch = () => { emit('search', searchKeyword.value) }

const scrollToSection = (id) => {
  activeChapter.value = id
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.base-module-page {
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
  margin-top: 14px;
}

.page-subtitle {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin-top: 14px;
}

.divider {
  width: 100%;
  height: 1px;
  background: #E2E7EF;
  border: none;
  margin-top: 14px;
}

.doc-section {
  margin-top: 14px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  line-height: 32px;
}

/* 子模块卡片 */
.submodule-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
}

.submodule-card {
  width: 100%;
  min-height: 58px;
  background: #FFFFFF;
  border: 1px solid #E2E7EF;
  border-radius: 8px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submodule-card:hover {
  border-color: #0073FF;
}

.submodule-name {
  font-size: 14px;
  font-weight: 600;
  color: #0073FF;
  white-space: nowrap;
}

.submodule-desc {
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
}
</style>
