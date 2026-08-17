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
        <p class="params-text">{{ docData.paramsDesc }}</p>
      </section>

      <!-- 返回 -->
      <section class="doc-section">
        <h2 class="section-title">{{ docData.returnTitle }}</h2>
        <p class="return-text">{{ docData.returnDesc }}</p>
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
      breadcrumb: '资源 / 文档 / IFTS / 代码说明文档 / Channel / SSFM Module / SSFM / __func_para_init__',
      functionName: '__func_para_init__',
      signature: '__func_para_init__(self)',
      functionDesc: '随算法执行过程的进行，更新色散效应及非线性效应计算函数所需的参数。',
      paramsTitle: '函数参数',
      paramsDesc: '本函数无传入参数。',
      returnTitle: '返回',
      returnDesc: '本函数无返回值。'
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

.params-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin: 0;
}

.return-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin: 0;
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
