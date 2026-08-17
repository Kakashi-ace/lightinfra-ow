<template>
  <div class="channel-para-wss-para-doc-page">
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
          <span class="current">__wss_para__</span>
        </div>

        <!-- 5.2 页面标题（函数名） -->
        <h1 class="page-title">__wss_para__</h1>

        <!-- 5.3 函数签名框 -->
        <div class="function-signature">
          <span class="signature-text">__wss_para__(self)</span>
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
          {{ docData?.description || '检查WDM仿真功能模块所需参数是否全部配置完成，传入参数创建WSS类对象 wdm_obj。' }}
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
  { id: 'func-desc', title: '函数说明' }
]

const scrollToNav = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  emit('pageNavSelect', { id })
}

const handleCopy = () => {
  const code = '__wss_para__(self)'
  navigator.clipboard.writeText(code).then(() => {
    emit('copy', code)
  })
}
</script>

<style scoped>
.channel-para-wss-para-doc-page {
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
