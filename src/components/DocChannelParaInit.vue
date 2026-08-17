<template>
  <div class="channel-para-init-doc-page">
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
          <span>channel_para</span>
          <span class="separator">/</span>
          <span class="current">__init__</span>
        </div>

        <!-- 5.2 页面标题（函数名） -->
        <h1 class="page-title">__init__</h1>

        <!-- 5.3 函数签名框 -->
        <div class="function-signature">
          <span class="signature-text">__init__(self, rand_seed, simu_configs)</span>
          <button class="copy-btn" @click="handleCopy" title="复制函数签名">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
          </button>
        </div>

        <!-- 5.4 函数说明标题 -->
        <div :id="pageNavItems[0].id" class="section-header">
          {{ pageNavItems[0].title }}
        </div>

        <!-- 5.5 函数说明正文 -->
        <p class="section-text">
          {{ docData?.description || '初始化函数，传入配置文件。' }}
        </p>

        <!-- 5.6 函数参数标题 -->
        <div :id="pageNavItems[1].id" class="section-header">
          {{ pageNavItems[1].title }}
        </div>

        <!-- 5.7 函数参数表格 -->
        <div class="table-container">
          <div class="table-header">
            <span class="table-col col1">Parameter</span>
            <span class="table-col col2">Format</span>
            <span class="table-col col3">Description</span>
          </div>
          <div class="table-divider"></div>
          <div v-for="(param, index) in parameters" :key="param.name" class="table-row" :class="{ 'row-tall': param.tall }">
            <span class="table-col col1">{{ param.name }}</span>
            <span class="table-col col2">{{ param.format }}</span>
            <span class="table-col col3">{{ param.desc }}</span>
          </div>
        </div>

        <!-- 5.8 返回标题 -->
        <div :id="pageNavItems[2].id" class="section-header">
          {{ pageNavItems[2].title }}
        </div>

        <!-- 5.9 返回表格 -->
        <div class="table-container">
          <div class="table-header">
            <span class="table-col col1">Parameter</span>
            <span class="table-col col2">Format</span>
            <span class="table-col col3">Description</span>
          </div>
          <div class="table-divider"></div>
          <div class="table-row">
            <span class="table-col col1">—</span>
            <span class="table-col col2">—</span>
            <span class="table-col col3">本函数无返回值</span>
          </div>
        </div>

        <!-- 5.10 声明标题 -->
        <div :id="pageNavItems[3].id" class="section-header">
          {{ pageNavItems[3].title }}
        </div>

        <!-- 5.11 声明正文 -->
        <p class="section-text">
          {{ docData?.declaration || 'RuntimeError：当信道类型参数 channel_type 取值非 0、1 或 2 时触发：\'channel_type is not supported\'。' }}
        </p>

        <!-- 5.12 警告标题 -->
        <div :id="pageNavItems[4].id" class="section-header">
          {{ pageNavItems[4].title }}
        </div>

        <!-- 5.13 警告正文 -->
        <p class="section-text">
          {{ docData?.warning || '\'ch_para: you are using a simulation xxx channel\'' }}
        </p>

        <!-- 5.14 注意标题 -->
        <div :id="pageNavItems[5].id" class="section-header">
          {{ pageNavItems[5].title }}
        </div>

        <!-- 5.15 注意正文 -->
        <p class="section-text">
          {{ docData?.note || '提醒使用者目前仿真的信道类型。' }}
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
  'navigate', 'tabChange', 'search', 'menuSelect', 'pageNavSelect', 'copy'
])

const pageNavItems = [
  { id: 'func-desc', title: '函数说明' },
  { id: 'func-params', title: '函数参数' },
  { id: 'func-return', title: '返回' },
  { id: 'func-declaration', title: '声明' },
  { id: 'func-warning', title: '警告' },
  { id: 'func-note', title: '注意' }
]

const parameters = [
  {
    name: 'rand_seed',
    format: 'int',
    desc: '仿真随机效应的随机数生成器的初始种子，后续控制不同生成器的种子在此初始值基础上变化',
    tall: true
  },
  {
    name: 'simu_configs',
    format: 'yaml配置文件',
    desc: '包含所有仿真配置信息的文件，从中读取配置信息成为自身属性'
  }
]

const scrollToNav = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  emit('pageNavSelect', { id })
}

const handleCopy = () => {
  const code = '__init__(self, rand_seed, simu_configs)'
  navigator.clipboard.writeText(code).then(() => {
    emit('copy', code)
  })
}
</script>

<style scoped>
.channel-para-init-doc-page {
  width: 100%;
  min-height: 2304px;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
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

/* ========== 函数签名框 ========== */
.function-signature {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 660px;
  height: 48px;
  padding: 14px 16px;
  background: #FAFBFD;
  border: 1px solid #E2E7EF;
  border-radius: 6px;
}

.signature-text {
  font-size: 14px;
  color: #535C6E;
  font-family: 'Consolas', 'Monaco', monospace;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: transparent;
  border: 1px solid #535C6E;
  border-radius: 4px;
  cursor: pointer;
  color: #535C6E;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

/* ========== 参数/返回表格 ========== */
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
