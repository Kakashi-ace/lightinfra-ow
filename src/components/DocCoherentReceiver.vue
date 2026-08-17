<template>
  <div class="coherent-receiver-doc-page">
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
          <span class="current">coherent_receiver</span>
        </div>

        <!-- 5.2 页面标题（类名） -->
        <h1 class="page-title">coherent_receiver</h1>

        <!-- 5.3 类说明正文 -->
        <p class="section-text">
          {{ docData?.description || '该类用于仿真实际系统中的集成相干接收机（integral coherent receiver, ICR）。在仿真过程中，ICR对象将向接收信号中添加接收机噪声。' }}
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
            <span class="table-col method-col1">Methods</span>
            <span class="table-col method-col2">Description</span>
          </div>
          <div class="table-divider"></div>
          <div v-for="(method, index) in methods" :key="method.name" class="table-row">
            <span class="table-col method-col1">{{ method.name }}</span>
            <span class="table-col method-col2">{{ method.desc }}</span>
          </div>
        </div>

        <!-- 5.8 背景信息标题 -->
        <div :id="pageNavItems[3].id" class="section-header">
          {{ pageNavItems[3].title }}
        </div>

        <!-- 5.9 背景信息正文 -->
        <p class="section-text">
          {{ docData?.background || '实际相干光纤通信系统中的ICR对信号进行相干接收和光电转换，再进行后续收端数字信号处理；仿真的ICR模块效果为添加接收机噪声。' }}
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
  { id: 'internal-methods', title: '内部函数' },
  { id: 'background', title: '背景信息' }
]

const attributes = [
  { name: 'mode', format: 'str', desc: 'ICR模式，目前仅支持"naive"' },
  { name: 'data_mode', format: 'str, optional', desc: '进行运算的数据类型，可设定值"numpy"或"tensor"，默认"numpy"', tall: true },
  { name: 'rand_seed', format: 'int, optional', desc: '控制产生随机数生成器的种子，默认-1' },
  { name: 'upsam', format: 'int', desc: '上采样倍数，等于信道采样率除以发射机采样率' },
  { name: 'n_power_dBm', format: 'float', desc: 'ICR噪声功率，单位dBm' }
]

const methods = [
  { name: '__init__', desc: '初始化参数' },
  { name: 'init', desc: '初始化参数' },
  { name: 'forward_pass', desc: '信号通过ICR模块，调用对象时自动调用该方法' },
  { name: '__naive_pass__', desc: '信号经有噪声ICR' },
  { name: '__add_noise__', desc: '向信号添加噪声' }
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
.coherent-receiver-doc-page {
  width: 100%;
  min-height: 2043px;
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

/* ========== 属性/方法表格 ========== */
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

.table-col.method-col1 {
  width: 240px;
  flex-shrink: 0;
  color: #0073FF;
}

.table-col.method-col2 {
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
