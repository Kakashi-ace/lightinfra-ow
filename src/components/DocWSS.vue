<template>
  <div class="wss-doc-page">
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
          <span>Channel</span>
          <span class="separator">/</span>
          <span class="current">WSS</span>
        </div>

        <!-- 5.2 页面标题（类名） -->
        <h1 class="page-title">WSS</h1>

        <!-- 5.3 类说明正文 -->
        <p class="section-text">
          {{ docData?.description || 'WSS类是Optics_Base_Module子类，用于实现光纤通信的波分复用（WDM）及解复用过程，对应于实际系统中的波长选择开关（WSS）器件。类方法实现的功能包括配置滤波器、复用解复用过程的信号运算。' }}
        </p>

        <!-- 5.4 主要属性标题 -->
        <div :id="pageNavItems[1].id" class="section-header">
          {{ pageNavItems[1].title }}
        </div>

        <!-- 5.5 主要属性表格 -->
        <div class="table-container">
          <div class="table-header">
            <span class="table-col col1">Attributes</span>
            <span class="table-col col2">Format</span>
            <span class="table-col col3">Description</span>
          </div>
          <div class="table-divider"></div>
          <div v-for="(attr, index) in attributes" :key="attr.name" class="table-row" :class="{ 'row-tall': attr.tall }">
            <span class="table-col col1">{{ attr.name }}</span>
            <span class="table-col col2">{{ attr.format }}</span>
            <span class="table-col col3">{{ attr.desc }}</span>
          </div>
        </div>

        <!-- 5.6 内部函数标题 -->
        <div :id="pageNavItems[2].id" class="section-header">
          {{ pageNavItems[2].title }}
        </div>

        <!-- 5.7 内部函数表格 -->
        <div class="table-container">
          <div class="table-header">
            <span class="table-col func-col1">Functions</span>
            <span class="table-col func-col2">Description</span>
          </div>
          <div class="table-divider"></div>
          <div v-for="(func, index) in functions" :key="func.name" class="table-row">
            <span class="table-col func-col1">{{ func.name }}</span>
            <span class="table-col func-col2">{{ func.desc }}</span>
          </div>
        </div>

        <!-- 5.8 背景信息标题 -->
        <div :id="pageNavItems[3].id" class="section-header">
          {{ pageNavItems[3].title }}
        </div>

        <!-- 5.9 背景信息正文 -->
        <p class="section-text">
          {{ docData?.background || '该类用于仿真实现波分复用功能，对应于实际系统的波长选择开关（WSS）。该器件可选择输入波分复用信号中任意波长组合输出，也可以选择任意波长信号与其他信号合并输出，从而实现灵活上下波。波分复用过程包括对原始信号进行滤波和将信号搬移至指定通道。' }}
        </p>

        <!-- 5.10 参考文献标题 -->
        <div :id="pageNavItems[4].id" class="section-header">
          {{ pageNavItems[4].title }}
        </div>

        <!-- 5.11 参考文献内容 -->
        <p class="reference-text">
          {{ docData?.reference || '[1] ZHAI Z, JIANG H, FU M, et al. An Interpretable Mapping From a Communication System to a Neural Network for Optimal Transceiver-Joint Equalization. Journal of Lightwave Technology, 2021, 39(17): 5449–5458.' }}
        </p>
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
  'navigate', 'tabChange', 'search', 'menuSelect', 'pageNavSelect'
])

const pageNavItems = [
  { id: 'module-desc', title: '模块说明' },
  { id: 'main-attrs', title: '主要属性' },
  { id: 'internal-funcs', title: '内部函数' },
  { id: 'background', title: '背景信息' },
  { id: 'reference', title: '参考文献' }
]

const attributes = [
  { name: 'filter_type', format: 'str', desc: '复用或解复用过程使用的滤波器类型' },
  { name: 'filter_config', format: 'dict', desc: '滤波器配置信息，键值："type""args"' },
  { name: 'wdm_data_mode', format: 'str', desc: '波分复用运算过程使用的数据类型' },
  { name: 'dwdm_data_mode', format: 'str', desc: '解复用运算使用的数据类型' }
]

const functions = [
  { name: '__init__', desc: '初始化WSS参数' },
  { name: 'init', desc: '初始化各种具体参数，类的基本初始化方法中调用' },
  { name: 'get_transfer_func', desc: '获得滤波器频域响应' },
  { name: 'filter_in_freq', desc: '在频域对信号进行滤波' },
  { name: 'wdm_multiplexing', desc: '波分复用' },
  { name: 'wdm_demultiplexing', desc: '解复用' }
]

const scrollToNav = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  emit('pageNavSelect', { id })
}
</script>

<style scoped>
.wss-doc-page {
  width: 100%;
  min-height: 2122px;
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
  gap: 20px;
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

.section-header {
  font-size: 16px;
  font-weight: 600;
  color: #121212;
  line-height: 24px;
}

.reference-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin: 0;
}

/* ========== 属性/函数表格 ========== */
.table-container {
  width: 690px;
  border: 1px solid #E2E7EF;
  border-radius: 6px;
  overflow: hidden;
}

.table-header {
  display: flex;
  background: #FAFBFD;
  padding: 14px 0 14px 20px;
}

.table-col {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
}

.table-col.col1 {
  width: 145px;
  flex-shrink: 0;
}

.table-col.col2 {
  width: 128px;
  flex-shrink: 0;
}

.table-col.col3 {
  width: 397px;
  flex-shrink: 0;
}

.table-col.func-col1 {
  width: 240px;
  flex-shrink: 0;
  color: #0073FF;
}

.table-col.func-col2 {
  width: 430px;
  flex-shrink: 0;
}

.table-divider {
  width: 100%;
  height: 1px;
  background: #E2E7EF;
}

.table-row {
  display: flex;
  padding: 14px 0 14px 20px;
  border-bottom: 1px solid #E2E7EF;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row.row-tall {
  height: 72px;
  align-items: flex-start;
}

.table-row .table-col {
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
  gap: 14px;
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
