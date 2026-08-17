<template>
  <div class="channel-doc-page">
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
          <span class="current">Channel</span>
        </div>

        <!-- 5.2 页面标题 -->
        <h1 class="page-title">Channel 模块简介</h1>

        <!-- 5.3 页面副标题 -->
        <p class="section-text">
          {{ docData?.subtitle1 || 'Channel 模块负责光纤信道的建模与仿真，包括信道参数配置、相干接收、EDFA 放大及非线性传输等功能。' }}
        </p>

        <!-- 5.4 正文说明2 -->
        <p class="section-text">
          {{ docData?.subtitle2 || '该模块提供了多种信道仿真模型，支持线性与非线性传输场景，可满足不同链路设计需求。' }}
        </p>

        <!-- 5.5 分隔线 -->
        <div class="divider"></div>

        <!-- 5.6 章节标题 -->
        <div :id="pageNavItems[1].id" class="section-header">
          {{ pageNavItems[1].title }}
        </div>

        <!-- 5.7 子模块入口卡片 -->
        <div class="module-cards">
          <div
            v-for="(module, index) in subModules"
            :key="module.name"
            class="module-card"
            @click="handleSubModuleClick(module.name)"
          >
            <span class="module-name">{{ module.name }}</span>
            <span class="module-desc">{{ module.desc }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧页内导航 -->
      <aside class="page-nav">
        <div class="nav-list">
          <div class="nav-header">本页内容</div>
          <div class="nav-toc">
            <div
              v-for="item in pageNavItems"
              :key="item.id"
              class="nav-item"
              @click="scrollToNav(item.id)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup>
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
  { id: 'module-desc', title: '模块说明' },
  { id: 'module-struct', title: '模块构成' }
]

const subModules = [
  { name: 'channel_para', desc: '信道参数配置与初始化。' },
  { name: 'coherent_receiver', desc: '相干接收机建模与仿真。' },
  { name: 'EDFA', desc: '掺铒光纤放大器模型。' },
  { name: 'SSFM Module', desc: '分步傅里叶法非线性传输仿真。' },
  { name: 'WSS', desc: '波长选择开关模型。' },
  { name: 'NN Module', desc: '基于神经网络的信道建模。' }
]

const scrollToNav = (id) => {
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
.channel-doc-page {
  width: 100%;
  min-height: 2215px;
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
  display: flex;
  flex-direction: column;
  gap: 14px;
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
  margin: 0;
}

.section-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin: 0;
}

.divider {
  width: 690px;
  height: 1px;
  background: #E2E7EF;
}

.section-header {
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  line-height: 32px;
}

/* ========== 子模块卡片 ========== */
.module-cards {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.module-card {
  display: flex;
  align-items: center;
  width: 690px;
  height: 58px;
  padding: 18px;
  border: 1px solid #E2E7EF;
  border-radius: 8px;
  gap: 16px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.module-card:hover {
  border-color: #0073FF;
}

.module-name {
  width: 190px;
  font-size: 14px;
  font-weight: 600;
  color: #0073FF;
  flex-shrink: 0;
}

.module-desc {
  width: 448px;
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
}

/* ========== 右侧页内导航 ========== */
.page-nav {
  width: 180px;
  flex-shrink: 0;
  padding-top: 0;
}

.nav-list {
  padding-left: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-header {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 4px;
}

.nav-toc {
  border-left: 1px solid #E2E7EF;
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  font-size: 12px;
  font-weight: 600;
  color: #535C6E;
  cursor: pointer;
  transition: color 0.2s ease;
}

.nav-item:hover {
  color: #0073FF;
}
</style>
