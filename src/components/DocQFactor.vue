<template>
  <div class="q-factor-doc-page">
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
          <span class="current">q_factor</span>
        </div>

        <!-- 5.2 页面标题 -->
        <h1 class="page-title">q_factor</h1>

        <!-- ========== 子函数一：ber2q ========== -->

        <!-- 5.3 子函数一标题 -->
        <h2 class="sub-function-title">ber2q</h2>

        <!-- 5.4 函数签名块（ber2q） -->
        <div class="function-signature">
          <code class="signature-code">{{ ber2qSignature }}</code>
          <button class="copy-btn" @click="handleCopyBer2q">
            <svg v-if="!copiedBer2q" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0073FF" stroke-width="1.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </div>

        <!-- 5.5 函数说明标题（ber2q） -->
        <div :id="ber2qNavItems[0].id" class="section-header">
          {{ ber2qNavItems[0].title }}
        </div>

        <!-- 5.6 函数说明正文（ber2q） -->
        <p class="section-text">
          {{ docData?.ber2q?.description || '将误码率转换为Q因子（品质因数）' }}
        </p>

        <!-- 5.7 函数参数标题（ber2q） -->
        <div :id="ber2qNavItems[1].id" class="section-header">
          {{ ber2qNavItems[1].title }}
        </div>

        <!-- 5.8 函数参数表格（ber2q） -->
        <div class="table-container">
          <div class="table-header">
            <span class="table-col col1">Parameter</span>
            <span class="table-col col2">Format</span>
            <span class="table-col col3">Description</span>
          </div>
          <div class="table-divider"></div>
          <div v-for="(param, index) in ber2qParameters" :key="param.name" class="table-row">
            <span class="table-col col1">{{ param.name }}</span>
            <span class="table-col col2">{{ param.format }}</span>
            <span class="table-col col3">{{ param.desc }}</span>
          </div>
        </div>

        <!-- 5.9 返回标题（ber2q） -->
        <div :id="ber2qNavItems[2].id" class="section-header">
          {{ ber2qNavItems[2].title }}
        </div>

        <!-- 5.10 返回表格（ber2q） -->
        <div class="table-container">
          <div class="table-header">
            <span class="table-col col1">Parameter</span>
            <span class="table-col col2">Format</span>
            <span class="table-col col3">Description</span>
          </div>
          <div class="table-divider"></div>
          <div class="table-row">
            <span class="table-col col1">{{ ber2qReturnValue.name }}</span>
            <span class="table-col col2">{{ ber2qReturnValue.format }}</span>
            <span class="table-col col3">{{ ber2qReturnValue.desc }}</span>
          </div>
        </div>

        <!-- ========== 子函数二：constellation2q ========== -->

        <!-- 5.11 子函数二标题 -->
        <h2 class="sub-function-title">constellation2q</h2>

        <!-- 5.12 函数签名块（constellation2q） -->
        <div class="function-signature">
          <code class="signature-code">{{ constellation2qSignature }}</code>
          <button class="copy-btn" @click="handleCopyConstellation2q">
            <svg v-if="!copiedConstellation2q" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0073FF" stroke-width="1.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </div>

        <!-- 5.13 函数说明标题（constellation2q） -->
        <div :id="constellation2qNavItems[0].id" class="section-header">
          {{ constellation2qNavItems[0].title }}
        </div>

        <!-- 5.14 函数说明正文（constellation2q） -->
        <p class="section-text">
          {{ docData?.constellation2q?.description || '根据发端数据和收端数据计算传输过程的Q因子（品质因数）' }}
        </p>

        <!-- 5.15 函数参数标题（constellation2q） -->
        <div :id="constellation2qNavItems[1].id" class="section-header">
          {{ constellation2qNavItems[1].title }}
        </div>

        <!-- 5.16 函数参数表格（constellation2q） -->
        <div class="table-container">
          <div class="table-header">
            <span class="table-col col1">Parameter</span>
            <span class="table-col col2">Format</span>
            <span class="table-col col3">Description</span>
          </div>
          <div class="table-divider"></div>
          <div v-for="(param, index) in constellation2qParameters" :key="param.name" class="table-row">
            <span class="table-col col1">{{ param.name }}</span>
            <span class="table-col col2">{{ param.format }}</span>
            <span class="table-col col3">{{ param.desc }}</span>
          </div>
        </div>

        <!-- 5.17 返回标题（constellation2q） -->
        <div :id="constellation2qNavItems[2].id" class="section-header">
          {{ constellation2qNavItems[2].title }}
        </div>

        <!-- 5.18 返回表格（constellation2q） -->
        <div class="table-container">
          <div class="table-header">
            <span class="table-col col1">Parameter</span>
            <span class="table-col col2">Format</span>
            <span class="table-col col3">Description</span>
          </div>
          <div class="table-divider"></div>
          <div class="table-row">
            <span class="table-col col1">{{ constellation2qReturnValue.name }}</span>
            <span class="table-col col2">{{ constellation2qReturnValue.format }}</span>
            <span class="table-col col3">{{ constellation2qReturnValue.desc }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧页内导航（本页内容） -->
      <aside class="page-nav">
        <div class="nav-list">
          <div class="nav-header">本页内容</div>

          <!-- ber2q 子导航 -->
          <div
            class="nav-item nav-item-active"
            @click="scrollToNav(ber2qNavItems[0].id)"
          >
            ber2q
          </div>
          <div
            v-for="item in ber2qNavItems"
            :key="item.id"
            class="nav-item"
            @click="scrollToNav(item.id)"
          >
            {{ item.title }}
          </div>

          <!-- constellation2q 子导航 -->
          <div
            class="nav-item nav-item-active"
            @click="scrollToNav(constellation2qNavItems[0].id)"
          >
            constellation2q
          </div>
          <div
            v-for="item in constellation2qNavItems"
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

// ber2q 子函数导航
const ber2qNavItems = [
  { id: 'ber2q-desc', title: '函数说明' },
  { id: 'ber2q-params', title: '函数参数' },
  { id: 'ber2q-return', title: '返回' }
]

// constellation2q 子函数导航
const constellation2qNavItems = [
  { id: 'constellation2q-desc', title: '函数说明' },
  { id: 'constellation2q-params', title: '函数参数' },
  { id: 'constellation2q-return', title: '返回' }
]

// 函数签名
const ber2qSignature = "ber2q(ber)"
const constellation2qSignature = "constellation2q(tx_sig, rx_sig, mode = 'calcu')"

// ber2q 参数和返回值
const ber2qParameters = [
  { name: 'ber', format: 'float', desc: '误码率' }
]

const ber2qReturnValue = {
  name: 'q',
  format: 'float',
  desc: '基于转换公式计算得到的Q因子'
}

// constellation2q 参数和返回值
const constellation2qParameters = [
  { name: 'tx_sig', format: 'array_like', desc: '发端数据序列' },
  { name: 'rx_sig', format: 'array_like', desc: '收端数据序列' },
  { name: 'mode', format: 'str, optional', desc: '计算模式' }
]

const constellation2qReturnValue = {
  name: 'q',
  format: 'float',
  desc: '基于信号功率和方差，利用公式计算得到的Q因子'
}

const copiedBer2q = ref(false)
const copiedConstellation2q = ref(false)

const scrollToNav = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  emit('pageNavSelect', { id })
}

const handleCopyBer2q = () => {
  navigator.clipboard.writeText(ber2qSignature).then(() => {
    copiedBer2q.value = true
    emit('copyCode', ber2qSignature)
    setTimeout(() => {
      copiedBer2q.value = false
    }, 2000)
  })
}

const handleCopyConstellation2q = () => {
  navigator.clipboard.writeText(constellation2qSignature).then(() => {
    copiedConstellation2q.value = true
    emit('copyCode', constellation2qSignature)
    setTimeout(() => {
      copiedConstellation2q.value = false
    }, 2000)
  })
}
</script>

<style scoped>
.q-factor-doc-page {
  width: 100%;
  min-height: 2307px;
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

/* ========== 子函数标题 ========== */
.sub-function-title {
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  line-height: 32px;
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
  gap: 8px;
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

.nav-item-active {
  color: #0073FF;
  font-weight: 600;
}
</style>
