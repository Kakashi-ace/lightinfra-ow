<template>
  <div class="doc-content-wrapper">
    <main class="doc-content" id="doc-content">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        {{ docData.breadcrumb }}
      </div>

      <!-- 页面标题 -->
      <h1 class="page-title">{{ docData.functionName }}</h1>

      <!-- 代码签名块 -->
      <div class="code-block">
        <span class="code-text">{{ docData.signature }}</span>
        <button class="copy-btn" @click="handleCopy" title="复制函数签名">
          <span class="copy-icon">⧉</span>
        </button>
      </div>

      <!-- 函数说明 -->
      <section class="doc-section">
        <h2 class="section-title">{{ docData.descTitle }}</h2>
        <p class="func-desc">{{ docData.functionDesc }}</p>
      </section>

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

    <!-- 右侧页内导航 -->
    <aside class="right-nav">
      <div class="nav-header">{{ docData.navTitle }}</div>
      <div class="nav-list">
        <div
          v-for="(nav, index) in docData.navItems"
          :key="index"
          class="nav-item"
          :class="{ 'nav-item-active': nav.active }"
        >
          {{ nav.name }}
        </div>
      </div>
    </aside>

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
      breadcrumb: '资源 / 文档 / IFTS / 代码说明文档 / Transmitter / shaping',
      functionName: 'shaping',
      signature: 'shaping(x, sam_per_sym, filter_freq)',
      descTitle: '函数说明',
      functionDesc: '根据输入信号、采样率和滤波频率获得经过滤波整形后的信号。',
      paramsTitle: '函数参数',
      params: [
        {
          name: 'x',
          format: 'array_like',
          description: '输入信号数组，一般为输入信号'
        },
        {
          name: 'sam_per_sym',
          format: 'int',
          description: '设置的采样率；采样率为 1 时直接返回输入信号，否则进行滤波整形'
        },
        {
          name: 'filter_freq',
          format: 'class object',
          description: '设置的滤波频率，用于对输入信号进行滤波和整形'
        }
      ],
      returnTitle: '返回',
      returnParam: {
        name: 'shaped',
        format: 'array_like',
        description: '经过滤波整形后的信号'
      },
      navTitle: '本页内容',
      navItems: [
        { name: '函数说明', active: true },
        { name: '函数参数', active: false },
        { name: '返回', active: false }
      ]
    })
  }
})

const emit = defineEmits(['copy', 'pageNavSelect'])

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
  gap: 16px;
  width: 690px;
  background: #FFFFFF;
}

.breadcrumb {
  font-size: 13px;
  font-weight: 400;
  color: #8E96A6;
  line-height: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  line-height: 36px;
  margin: 0;
}

.code-block {
  width: 690px;
  min-height: 54px;
  background: #F7F8FA;
  padding: 16px 14px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.code-text {
  font-size: 14px;
  font-weight: 400;
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

.doc-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #121212;
  line-height: 28px;
  margin: 0;
}

.func-desc {
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  line-height: 22px;
  margin: 0;
}

.params-table {
  width: 690px;
  border: 1px solid #DDE2EB;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.table-header {
  display: flex;
  background: #F5F7FA;
  height: 50px;
  padding: 14px 12px 14px 20px;
  border-bottom: 1px solid #DDE2EB;
  align-items: center;
  box-sizing: border-box;
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
  min-height: 56px;
  padding: 14px 12px 14px 20px;
  background: #FFFFFF;
  border-bottom: 1px solid #DDE2EB;
  align-items: flex-start;
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

/* 右侧页内导航 */
.right-nav {
  width: 180px;
  flex-shrink: 0;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-header {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 22px;
}

.nav-list {
  display: flex;
  flex-direction: column;
}

.nav-item {
  height: 30px;
  padding: 5px 8px;
  font-size: 13px;
  font-weight: 400;
  color: #535C6E;
  line-height: 20px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: #0073FF;
}

.nav-item-active {
  font-weight: 600;
  color: #0073FF;
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
