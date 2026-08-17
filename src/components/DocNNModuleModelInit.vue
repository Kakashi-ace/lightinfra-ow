<template>
  <div class="doc-content-wrapper">
    <main class="doc-content" id="doc-content">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        {{ docData.breadcrumb }}
      </div>

      <!-- 页面标题 -->
      <h1 class="page-title">{{ docData.functionName }}</h1>

      <!-- 描述 -->
      <p class="func-desc">{{ docData.functionDesc }}</p>

      <!-- 调用方式 -->
      <section class="doc-section">
        <h2 class="section-title">{{ docData.callTitle }}</h2>
        <div class="code-block">
          <span class="code-text">{{ docData.signature }}</span>
          <button class="copy-btn" @click="handleCopy" title="复制函数签名">
            <span class="copy-icon">⧉</span>
          </button>
        </div>
      </section>

      <!-- 参数 -->
      <section class="doc-section">
        <h2 class="section-title">{{ docData.paramsTitle }}</h2>
        <div class="params-table">
          <div class="table-header">
            <span class="col-param">Attributes</span>
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

      <!-- 返回值 -->
      <section class="doc-section">
        <h2 class="section-title">{{ docData.returnTitle }}</h2>
        <div class="params-table">
          <div class="table-header">
            <span class="col-param">Attributes</span>
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
      breadcrumb: '资源 / 文档 / IFTS / 代码说明文档 / Channel / NN Module / __nn_model_init__',
      functionName: '__nn_model_init__',
      functionDesc: '根据模型配置创建并初始化神经网络模型。',
      callTitle: '调用方式',
      signature: '__nn_model_init__(self, model_config)',
      paramsTitle: '参数',
      params: [
        { name: 'model_config', format: 'dict', description: '神经网络结构、权重及运行配置' }
      ],
      returnTitle: '返回值',
      returnParam: {
        name: 'model',
        format: 'torch.nn.Module',
        description: '初始化后的神经网络模型'
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
  gap: 20px;
  width: 690px;
  background: #FFFFFF;
}

.breadcrumb {
  font-size: 12px;
  color: #7B8496;
  line-height: 20px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #121212;
  line-height: 36px;
  margin: 0;
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
  font-size: 16px;
  font-weight: 600;
  color: #121212;
  line-height: 24px;
  margin: 0;
}

.code-block {
  width: 666px;
  height: 52px;
  background: #F6F8FB;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
}

.code-text {
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
  color: #7B8496;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.copy-btn:hover {
  color: #535C6E;
}

.copy-icon {
  font-size: 16px;
  line-height: 1;
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
  padding: 14px 0px 14px 20px;
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
  padding: 14px 0px 14px 20px;
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
