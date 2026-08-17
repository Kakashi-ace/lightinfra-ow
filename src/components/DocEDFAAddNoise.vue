<template>
  <div class="doc-content-wrapper">
    <!-- 主文档内容区 -->
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
      <section class="doc-section" id="section-func-desc">
        <h2 class="section-title">{{ docData.functionDescTitle }}</h2>
        <p class="section-text">{{ docData.functionDesc }}</p>
      </section>

      <!-- 函数参数 -->
      <section class="doc-section" id="section-func-params">
        <h2 class="section-title">{{ docData.paramsTitle }}</h2>
        <div class="params-table">
          <div class="table-header">
            <span class="col-1">Parameter</span>
            <span class="col-2">Format</span>
            <span class="col-3">Description</span>
          </div>
          <div
            v-for="(param, index) in docData.params"
            :key="index"
            class="table-row"
          >
            <span class="col-1">{{ param.name }}</span>
            <span class="col-2">{{ param.format }}</span>
            <span class="col-3">{{ param.description }}</span>
          </div>
        </div>
      </section>

      <!-- 返回 -->
      <section class="doc-section" id="section-return">
        <h2 class="section-title">{{ docData.returnTitle }}</h2>
        <div class="params-table">
          <div class="table-header">
            <span class="col-1">Parameter</span>
            <span class="col-2">Format</span>
            <span class="col-3">Description</span>
          </div>
          <div class="table-row">
            <span class="col-1">{{ docData.returnParam.name }}</span>
            <span class="col-2">{{ docData.returnParam.format }}</span>
            <span class="col-3">{{ docData.returnParam.description }}</span>
          </div>
        </div>
      </section>

      <!-- 声明 -->
      <section class="doc-section" id="section-declaration">
        <h2 class="section-title">{{ docData.declarationTitle }}</h2>
        <p class="section-text">{{ docData.declaration }}</p>
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
      breadcrumb: '资源 / 文档 / IFTS / 代码说明文档 / Channel / EDFA / __add_noise__',
      functionName: '__add_noise__',
      signature: '__add_noise__(self, sigin, rand_seed)',
      functionDescTitle: '函数说明',
      functionDesc: '向已放大的信号添加放大器自发辐射（ASE）噪声。',
      paramsTitle: '函数参数',
      params: [
        { name: 'sigin', format: 'list', description: '输入 EDFA 的信号' },
        { name: 'rand_seed', format: 'int', description: '控制随机数生成器的种子' }
      ],
      returnTitle: '返回',
      returnParam: {
        name: 'sigout',
        format: 'list',
        description: '添加 ASE 噪声后的信号'
      },
      declarationTitle: '声明',
      declaration: "AttributeError 当运算数据类型 data_mode 设置值不在 'tensor' 或 'numpy' 范围内时触发。"
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

/* ========== 主文档内容区 ========== */
.doc-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.breadcrumb {
  font-size: 13px;
  color: #535C6E;
  line-height: 15px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #121212;
  line-height: 33px;
  margin: 0;
}

.signature-box {
  width: 690px;
  height: 48px;
  background: #F4F7FB;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  box-sizing: border-box;
}

.signature-text {
  font-size: 13px;
  color: #535C6E;
  line-height: 15px;
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
}

.copy-btn:hover {
  color: #0073FF;
}

.doc-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #121212;
  line-height: 21px;
  margin: 0;
}

.section-text {
  font-size: 14px;
  color: #121212;
  line-height: 16px;
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
  padding: 14px 0 14px 20px;
  border-bottom: 1px solid #E2E7EF;
}

.table-header .col-1 { width: 145px; }
.table-header .col-2 { width: 128px; }
.table-header .col-3 { flex: 1; }

.table-header span {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 22px;
}

.table-row {
  display: flex;
  padding: 14px 0 14px 20px;
  border-bottom: 1px solid #E2E7EF;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row .col-1 { width: 145px; }
.table-row .col-2 { width: 128px; }
.table-row .col-3 { flex: 1; }

.table-row span {
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
}

/* ========== 复制提示 ========== */
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
