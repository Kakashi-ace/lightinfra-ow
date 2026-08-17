<template>
  <div class="base-module-doc-page">
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
          <span class="current">Base Module</span>
        </div>

        <!-- 5.2 页面标题 -->
        <h1 class="page-title">Base Module 模块简介</h1>

        <!-- 5.3 页面副标题 -->
        <p class="page-subtitle">
          {{ docData?.subtitle || 'Base Module 是 IFTS 仿真工具的基础模块，提供了信号处理、光学仿真以及参数配置等核心功能。' }}
        </p>

        <!-- 5.4 分隔线 -->
        <hr class="divider" />

        <!-- 5.5 章节标题：模块构成 -->
        <section :id="pageNavItems[0].id" class="doc-section">
          <h2 class="section-title">{{ pageNavItems[0].title }}</h2>

          <!-- 5.6 子模块入口卡片 -->
          <div class="submodule-list">
            <div
              v-for="mod in subModules"
              :key="mod.name"
              class="submodule-card"
              @click="handleSubModuleClick(mod.name)"
            >
              <span class="submodule-name">{{ mod.name }}</span>
              <span class="submodule-desc">{{ mod.desc }}</span>
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
  'navigate', 'tabChange', 'search', 'menuSelect', 'pageNavSelect', 'subModuleClick'
])

const pageNavItems = [
  { id: 'module-intro', title: '模块简介' },
  { id: 'module-structure', title: '模块构成' }
]

const subModules = [
  { name: 'base_dsp', desc: '数字信号处理相关函数，包括滤波、重采样、FFT 等。' },
  { name: 'base_optics', desc: '光学基础函数，包括光源生成、调制器建模等。' },
  { name: 'base_para', desc: '全局参数配置与初始化设置。' }
]

const activeNavItem = ref('module-intro')
const indicatorTop = ref('38px')

const indicatorPositions = {
  'module-intro': '38px',
  'module-structure': '152px'
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

const handleSubModuleClick = (moduleName) => {
  emit('subModuleClick', moduleName)
}
</script>

<style scoped>
.base-module-doc-page {
  width: 100%;
  min-height: 1510px;
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

/* ========== 子模块入口卡片 ========== */
.submodule-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 14px;
}

.submodule-card {
  display: flex;
  align-items: center;
  width: 690px;
  height: 58px;
  background: #FFFFFF;
  border: 1px solid #E2E7EF;
  border-radius: 8px;
  padding: 18px;
  gap: 16px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.submodule-card:hover {
  border-color: #0073FF;
}

.submodule-name {
  width: 180px;
  font-size: 14px;
  font-weight: 600;
  color: #0073FF;
  flex-shrink: 0;
}

.submodule-desc {
  width: 458px;
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
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
