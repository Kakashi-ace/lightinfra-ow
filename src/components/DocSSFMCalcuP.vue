<template>
  <div class="doc-content-wrapper">
    <main class="doc-content" id="doc-content">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        {{ docData.breadcrumb }}
      </div>

      <!-- 页面标题 -->
      <h1 class="page-title">{{ docData.functionName }}</h1>

      <!-- 函数签名框 -->
      <div class="signature-box">
        <span class="signature-text">{{ docData.signature }}</span>
        <button class="copy-btn" @click="handleCopy" title="复制函数签名">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
      </div>

      <!-- 函数说明 -->
      <p class="func-desc">{{ docData.functionDesc }}</p>

      <!-- 函数参数 -->
      <section class="doc-section">
        <h2 class="section-title">{{ docData.paramsTitle }}</h2>
        <div class="params-table">
          <div class="table-header">
            <span class="col-param">Parameter</span>
            <span class="col-format">Format</span>
            <span class="col-desc">Description</span>
          </div>
          <div
            v-for="(param, index) in docData.params"
            :key="index"
            class="table-row"
          >
            <span class="col-param">{{ param.name }}</span>
            <span class="col-format">{{ param.format }}</span>
            <span class="col-desc">{{ param.description }}</span>
          </div>
        </div>
      </section>

      <!-- 返回 -->
      <section class="doc-section">
        <h2 class="section-title">{{ docData.returnTitle }}</h2>
        <div class="params-table">
          <div class="table-header">
            <span class="col-param">Parameter</span>
            <span class="col-format">Format</span>
            <span class="col-desc">Description</span>
          </div>
          <div class="table-row">
            <span class="col-param">{{ docData.returnParam.name }}</span>
            <span class="col-format">{{ docData.returnParam.format }}</span>
            <span class="col-desc">{{ docData.returnParam.description }}</span>
          </div>
        </div>
      </section>
    </main>

    <!-- 复制提示 -->
    <Transition name="fade">
      <div v-if="showCopyTip" class="copy-tip">已复制到剪贴板</div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  docData: {
    type: Object,
    default: () => ({
      breadcrumb: '资源 / 文档 / IFTS / 代码说明文档 / Channel / SSFM Module / SSFM / __calcu_p__',
      functionName: '__calcu_p__',
      signature: '__calcu_p__(self, x)',
      functionDesc: '计算当前信号平均功率。',
      paramsTitle: '函数参数',
      params: [
        { name: 'x', format: 'list', description: '当前传输信号' }
      ],
      returnTitle: '返回',
      returnParam: {
        name: 'p',
        format: 'float',
        description: '信号平均功率，单位dBm'
      }
    })
  }
})

const emit = defineEmits(['copy', 'navigate'])

const showCopyTip = ref(false)

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.docData.signature)
    showCopyTip.value = true
    setTimeout(() => {
      showCopyTip.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
  emit('copy', props.docData.signature)
}
</script>

<style scoped>
.doc-content-wrapper {
  display: flex;
  gap: 24px;
  width: 100%;
}

.doc-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 690px;
  background: #FFFFFF;
}

.breadcrumb {
  font-size: 12px;
  color: #8A94A6;
  line-height: 20px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  color: #121212;
  line-height: 42px;
  margin: 0;
}

.signature-box {
  width: 690px;
  height: 54px;
  background: #FAFBFD;
  border: 1px solid #E2E7EF;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  box-sizing: border-box;
}

.signature-text {
  font-size: 13px;
  color: #535C6E;
  line-height: 22px;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

.copy-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #535C6E;
  transition: color 0.2s ease;
  flex-shrink: 0;
  margin-left: 12px;
}

.copy-btn:hover {
  color: #0073FF;
}

.func-desc {
  font-size: 14px;
  color: #535C6E;
  line-height: 24px;
  margin: 0;
}

.doc-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #121212;
  line-height: 30px;
  margin: 0;
}

.params-table {
  width: 690px;
  border: 1px solid #E2E7EF;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.table-header {
  display: flex;
  background: #FAFBFD;
  padding: 14px 12px 14px 20px;
  border-bottom: 1px solid #E2E7EF;
}

.table-header .col-param {
  width: 145px;
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 22px;
}

.table-header .col-format {
  width: 128px;
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 22px;
}

.table-header .col-desc {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 22px;
}

.table-row {
  display: flex;
  padding: 14px 12px 14px 20px;
  background: #FFFFFF;
  border-bottom: 1px solid #E2E7EF;
  min-height: 50px;
  box-sizing: border-box;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row .col-param {
  width: 145px;
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  line-height: 22px;
}

.table-row .col-format {
  width: 128px;
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  line-height: 22px;
}

.table-row .col-desc {
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  line-height: 22px;
}

/* 复制提示 */
.copy-tip {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #020952;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
