<template>
  <div class="mi-doc-page">
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
          <span>perf_calculation</span>
          <span class="separator">/</span>
          <span class="current">mi</span>
        </div>

        <!-- 5.2 页面标题（函数名） -->
        <h1 class="page-title">mi</h1>

        <!-- 5.3 函数签名块 -->
        <div class="function-signature">
          <code class="signature-code">{{ functionSignature }}</code>
          <button class="copy-btn" @click="handleCopyCode">
            <svg v-if="!copied" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0073FF" stroke-width="1.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </div>

        <!-- 5.4 函数说明标题 -->
        <div :id="pageNavItems[0].id" class="section-header">
          {{ pageNavItems[0].title }}
        </div>

        <!-- 5.5 函数说明正文 -->
        <p class="section-text">
          {{ docData?.description || '使用蒙特卡洛方法计算基于符号的无记忆互信息（MI）。如果信道不是圆对称高斯信道，则获得MI的下限，即可达信息速率。为了得到可靠的估计，使用时应该首先从样本中获得噪声方差n0。其次，使用先前得到的噪声方差估计不同符号序列上的MI。' }}
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
          <div v-for="(param, index) in parameters" :key="param.name" class="table-row">
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
            <span class="table-col col1">{{ returnValue.name }}</span>
            <span class="table-col col2">{{ returnValue.format }}</span>
            <span class="table-col col3">{{ returnValue.desc }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧页内导航（本页内容） -->
      <aside class="page-nav">
        <div class="nav-list">
          <div class="nav-header">本页内容</div>
          <div
            v-for="item in pageNavItems"
            :key="item.id"
            class="nav-item"
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
  'navigate', 'tabChange', 'search', 'menuSelect', 'pageNavSelect', 'copyCode'
])

const pageNavItems = [
  { id: 'func-desc', title: '函数说明' },
  { id: 'func-params', title: '函数参数' },
  { id: 'func-return', title: '返回' }
]

const functionSignature = "mutual_information_mc(x, y, x_int, constellations, n0, probability, **kwargs)"

const parameters = [
  { name: 'x', format: 'array_like', desc: '长度为N的发送数据序列，复数形式' },
  { name: 'y', format: 'array_like', desc: '长度为N的接收数据序列，复数形式' },
  { name: 'x_int', format: 'array_like', desc: '长度为N的发送符号对应的整数符号序列' },
  { name: 'constellations', format: 'array_like', desc: '信号星座图' },
  { name: 'n0', format: 'float', desc: '噪声方差' },
  { name: 'probability', format: 'array_like', desc: '发送数据对应的概率分布' }
]

const returnValue = {
  name: 'mi',
  format: 'float',
  desc: '基于高斯分布假设，使用蒙特卡洛方法计算得到的互信息'
}

const copied = ref(false)

const scrollToNav = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  emit('pageNavSelect', { id })
}

const handleCopyCode = () => {
  navigator.clipboard.writeText(functionSignature).then(() => {
    copied.value = true
    emit('copyCode', functionSignature)
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}
</script>

<style scoped>
.mi-doc-page {
  width: 100%;
  min-height: 1916px;
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

/* ========== 函数签名块 ========== */
.function-signature {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 660px;
  height: 48px;
  background: #FAFBFD;
  border: 1px solid #E2E7EF;
  border-radius: 6px;
  padding: 14px 16px;
}

.signature-code {
  font-family: monospace;
  font-size: 14px;
  color: #535C6E;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.copy-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #535C6E;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.copy-btn:hover {
  color: #0073FF;
}

/* ========== 章节标题 ========== */
.section-header {
  font-size: 16px;
  font-weight: 600;
  color: #121212;
  line-height: 24px;
}

.section-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin: 0;
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
  gap: 12px;
}

.nav-header {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 4px;
}

.nav-item {
  font-size: 12px;
  font-weight: 400;
  color: #535C6E;
  cursor: pointer;
  transition: color 0.2s ease;
}

.nav-item:hover {
  color: #0073FF;
}
</style>
