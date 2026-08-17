<template>
  <div class="nn-module-doc-page">
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
          <span class="current">NN Module</span>
        </div>

        <!-- 5.2 页面标题（类名） -->
        <h1 class="page-title">NN Module</h1>

        <!-- 5.3 模块说明段落 -->
        <p class="section-text">
          {{ docData?.moduleDescription || 'NN模块包含了利用神经网络仿真光纤传输所需的类和函数，其中类 NN 实现一个跨段传输的整体算法执行过程。' }}
        </p>

        <!-- 5.4 子类说明标题 -->
        <div :id="pageNavItems[1].id" class="section-header">
          {{ pageNavItems[1].title }}
        </div>

        <!-- 5.5 子类说明正文 -->
        <p class="section-text">
          {{ docData?.nnDescription || 'NN类用于利用神经网络(NN)实现光纤信道的仿真传输。通过神经网络代替传统的分布傅里叶方法(SSFM)，可以实现光纤信道仿真的加速。类方法的功能对应于利用NN进行信道仿真的各个具体步骤，用于对输入NN的数据进行预处理、利用NN进行光纤信道传输建模，NN建模的详细流程见NN类背景介绍。每调用一次NN类对象，将完成整个链路长度的信号传输。' }}
        </p>

        <!-- 5.6 主要属性标题 -->
        <div :id="pageNavItems[2].id" class="section-header">
          {{ pageNavItems[2].title }}
        </div>

        <!-- 5.7 主要属性分组说明 -->
        <div class="attr-groups">
          <!-- 第一组：基本参数 -->
          <div class="attr-group">
            <div class="attr-group-title">(1) 基本参数</div>
            <div class="attr-group-desc">
              基本信道效应参数及仿真设置，见其本初始化函数<span
                class="func-link"
                @click="handleFunctionClick('__init__')"
              >__init__</span>。
            </div>
          </div>

          <!-- 第二组：双偏振信号传输仿真参数 -->
          <div class="attr-group">
            <div class="attr-group-title">(2) 双偏振信号传输仿真参数</div>
            <div class="attr-group-desc">
              仿真双偏振信号传输过程的随机双折射效应及 PMD 效应的相关参数，仿真方式设置参数见<span
                class="func-link"
                @click="handleFunctionClick('init')"
              >init</span>。
            </div>
          </div>

          <!-- 第三组：神经网络参数 -->
          <div class="attr-group">
            <div class="attr-group-title">(3) 神经网络参数</div>
            <div class="attr-group-desc">
              加载神经网络模型及所需的一些网络参数，具体见<span
                class="func-link"
                @click="handleFunctionClick('__nn_model_init__')"
              >__nn_model_init__</span>。
            </div>
          </div>
        </div>

        <!-- 5.8 内部函数标题 -->
        <div :id="pageNavItems[3].id" class="section-header">
          {{ pageNavItems[3].title }}
        </div>

        <!-- 5.9 内部函数表格 -->
        <div class="table-container">
          <div class="table-header">
            <span class="table-col func-col1">Functions</span>
            <span class="table-col func-col2">Description</span>
          </div>
          <div class="table-divider"></div>
          <div v-for="(func, index) in functions" :key="func.name" class="table-row">
            <span class="table-col func-col1">{{ func.name }}</span>
            <span class="table-col func-col2">{{ func.desc }}</span>
          </div>
        </div>

        <!-- 5.10 背景信息标题 -->
        <div :id="pageNavItems[4].id" class="section-header">
          {{ pageNavItems[4].title }}
        </div>

        <!-- 5.11 背景信息正文 -->
        <p class="section-text">
          {{ docData?.background || 'NN 模块以神经网络方法描述跨段光纤传输过程，为模型初始化、数据预处理、矩阵变换和前向推理提供统一接口。' }}
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
  'navigate', 'tabChange', 'search', 'menuSelect', 'pageNavSelect', 'functionClick'
])

const pageNavItems = [
  { id: 'module-desc', title: '模块说明' },
  { id: 'nn-class', title: 'NN' },
  { id: 'main-attrs', title: '主要属性' },
  { id: 'internal-funcs', title: '内部函数' },
  { id: 'background', title: '背景信息' }
]

const functions = [
  { name: '__init__', desc: '初始化 NN 类的基础参数' },
  { name: 'init', desc: '初始化具体运行参数' },
  { name: '__nn_model_init__', desc: '初始化神经网络模型' },
  { name: 'forward_pass', desc: '执行神经网络前向计算' },
  { name: '__nn_matrix__', desc: '构建神经网络计算矩阵' },
  { name: '__trans_nn_matrix__', desc: '转换神经网络矩阵' },
  { name: '__data_process__', desc: '处理模型输入与输出数据' },
  { name: '__sliding_window__', desc: '执行滑动窗口数据处理' },
  { name: '__real_to_com__', desc: '将实数形式数据转换为复数形式' },
  { name: '__com_to_real__', desc: '将复数形式数据转换为实数形式' }
]

const scrollToNav = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  emit('pageNavSelect', { id })
}

const handleFunctionClick = (functionName) => {
  emit('functionClick', functionName)
}
</script>

<style scoped>
.nn-module-doc-page {
  width: 100%;
  min-height: 2367px;
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
  line-height: 24px;
  margin: 0;
}

.section-header {
  font-size: 16px;
  font-weight: 600;
  color: #121212;
  line-height: 24px;
}

/* ========== 属性分组说明 ========== */
.attr-groups {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.attr-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attr-group-title {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 24px;
}

.attr-group-desc {
  font-size: 14px;
  color: #535C6E;
  line-height: 24px;
}

.func-link {
  color: #0073FF;
  cursor: pointer;
  transition: color 0.2s ease;
}

.func-link:hover {
  color: #0055CC;
  text-decoration: underline;
}

/* ========== 内部函数表格 ========== */
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

.table-col.func-col1 {
  width: 240px;
  flex-shrink: 0;
  color: #0073FF;
}

.table-col.func-col2 {
  width: 410px;
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
