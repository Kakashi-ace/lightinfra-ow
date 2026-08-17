<template>
  <div class="channel-para-doc-page">
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
          <span class="current">channel_para</span>
        </div>

        <!-- 5.2 页面标题（类名） -->
        <h1 class="page-title">channel_para</h1>

        <!-- 5.3 类说明正文 -->
        <p class="section-text">
          {{ docData?.description || 'Ch_Para类继承自Sig_Para，用于创建仿真信道环境。该类的属性包括基本的信号参数以及创建仿真信道各个模块所需参数。类的各种"para"方法用于创建各信道子模块对象，在创建对象前会首先检查相应传入的参数配置是否正确完整。' }}
        </p>

        <!-- 5.4 主要属性标题 -->
        <div :id="pageNavItems[1].id" class="section-header">
          {{ pageNavItems[1].title }}
        </div>

        <!-- 5.5 主要属性表格 -->
        <div class="table-container">
          <div class="table-header">
            <span class="table-col col1">Attributes</span>
            <span class="table-col col2">Format</span>
            <span class="table-col col3">Description</span>
          </div>
          <div class="table-divider"></div>
          <div v-for="(attr, index) in attributes" :key="attr.name" class="table-row" :class="{ 'row-tall': attr.tall }">
            <span class="table-col col1">{{ attr.name }}</span>
            <span class="table-col col2">{{ attr.format }}</span>
            <span class="table-col col3">{{ attr.desc }}</span>
          </div>
        </div>

        <!-- 5.6 内部函数标题 -->
        <div :id="pageNavItems[2].id" class="section-header">
          {{ pageNavItems[2].title }}
        </div>

        <!-- 5.7 内部函数表格 -->
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

        <!-- 5.8 说明标题 -->
        <div :id="pageNavItems[3].id" class="section-header">
          {{ pageNavItems[3].title }}
        </div>

        <!-- 5.9 说明正文 -->
        <p class="section-text">
          {{ docData?.note || '上表所示属性为信道仿真基本配置，其余属性即信道所需的各子模块类的属性，根据信道类型及仿真配置不同会发生变化。' }}
        </p>

        <!-- 5.10 注意标题 -->
        <div :id="pageNavItems[4].id" class="section-header">
          {{ pageNavItems[4].title }}
        </div>

        <!-- 5.11 注意正文 -->
        <p class="section-text">
          {{ docData?.warning || '信道仿真的所有参数配置信息均保存在配置文件"Channel_Para.yaml"中。' }}
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
  'navigate', 'tabChange', 'search', 'menuSelect', 'pageNavSelect'
])

const pageNavItems = [
  { id: 'module-desc', title: '模块说明' },
  { id: 'main-attrs', title: '主要属性' },
  { id: 'internal-funcs', title: '内部函数' },
  { id: 'description', title: '说明' },
  { id: 'attention', title: '注意' }
]

const attributes = [
  { name: 'channel_type', format: 'int', desc: '仿真信道类型，可取值{0,1,2}，分别对应背靠背信道，光纤信道、AWGN信道', tall: true },
  { name: 'sam_rate', format: 'float', desc: '信道采样率，等于符号速率×通道数×上采样倍数（倍数默认为4），单位Gsam/s', tall: true },
  { name: 'upsam', format: 'float', desc: '采样倍数，等于信道采样率/发端采样率' },
  { name: 'fft_num', format: 'int', desc: '信号运算FFT点数，等于AWG最大存储深度×采样倍数' },
  { name: 'infor_print', format: 'int', desc: '取值0或1，表示是否显示运行进度，未指定默认为1' },
  { name: 'fig_plot', format: 'int', desc: '取值0或1，表示是否保存输出信号星座图、频谱图等' },
  { name: 'save_data', format: 'int', desc: '取值0或1，表示是否保存仿真信道输出信号，未指定默认为1' }
]

const functions = [
  { name: '__init__', desc: '初始化函数' },
  { name: '__transmitter_para__', desc: '当前版本不支持' },
  { name: '__wss_para__', desc: '配置WDM相关参数，创建WSS类对象' },
  { name: '__edfa_para__', desc: '配置EDFA参数，创建EDFA类对象' },
  { name: '__receiver_para__', desc: '配置接收机模块参数，创建ICR类对象' },
  { name: '__fiber_para__', desc: '配置光纤信道仿真参数，创建用于信道传输的SSFM或NN类对象' }
]

const scrollToNav = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  emit('pageNavSelect', { id })
}
</script>

<style scoped>
.channel-para-doc-page {
  width: 100%;
  min-height: 2304px;
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
  line-height: 22px;
  margin: 0;
}

.section-header {
  font-size: 16px;
  font-weight: 600;
  color: #121212;
  line-height: 24px;
}

/* ========== 属性/函数表格 ========== */
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

.table-col.func-col1 {
  width: 240px;
  flex-shrink: 0;
  color: #0073FF;
}

.table-col.func-col2 {
  width: 430px;
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
