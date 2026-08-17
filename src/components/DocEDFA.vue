<template>
  <div class="edfa-doc-page">
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
          <span class="current">EDFA</span>
        </div>

        <!-- 5.2 页面标题（类名） -->
        <h1 class="page-title">EDFA</h1>

        <!-- 5.3 类说明正文 -->
        <p class="section-text">
          {{ docData?.description || 'EDFA类是Optics_Base_Module子类，用于仿真光纤信道中的掺铒光纤放大器（erbium-doped fiber amplifier, EDFA）。类的属性包含EDFA的各种参数配置，类的方法进行放大信号和添加噪声运算。与真实传输过程一致，信号每传输一个跨段调用一次该对象，可设定是否向信号添加放大器自发辐射（ASE）噪声。' }}
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

        <!-- 5.8 背景信息标题 -->
        <div :id="pageNavItems[3].id" class="section-header">
          {{ pageNavItems[3].title }}
        </div>

        <!-- 5.9 背景信息正文（第一段） -->
        <p class="section-text">
          {{ docData?.background1 || 'EDFA类对应于实际系统中的掺铒光纤放大器，放大器会在每个跨段结束处对衰减的信号进行放大，在放大信号的同时还会向信号加入放大器自发辐射(ASE)噪声。仿真过程中默认放大器增益等于该跨段产生的衰减。ASE噪声近似为高斯白噪声，具有常数功率谱密度S(f)，计算公式如下:' }}
        </p>

        <!-- 5.10 公式1（ASE 功率谱密度） -->
        <div class="formula-container">
          <code class="formula">S<sub>ASE</sub>(f) = h<sub>p</sub>ν n<sub>sp</sub>(G-1)</code>
        </div>

        <!-- 5.11 背景信息正文（第二段） -->
        <p class="section-text">
          {{ docData?.background2 || '式中nsp为自发辐射因子，G为线性倍数的放大器增益，v为信号载波频率，h为普朗克常数。ASE噪声功率即谱密度乘以信号带宽。可以利用噪声系数计算ASE系数。当满足增益G>>1时，二者满足下列近似关系:' }}
        </p>

        <!-- 5.12 公式2（噪声系数近似关系） -->
        <div class="formula-container">
          <code class="formula">F<sub>n</sub> = 2n<sub>sp</sub>(1 - 1/G) + 1/G ≈ 2n<sub>sp</sub></code>
        </div>

        <!-- 5.13 参考文献标题 -->
        <div :id="pageNavItems[4].id" class="section-header">
          {{ pageNavItems[4].title }}
        </div>

        <!-- 5.14 参考文献内容 -->
        <p class="reference-text">
          {{ docData?.reference || '[1] Govind P. Agrawal. Fiber-Optic Communication Systems. New Jersey: John Wiley & Sons, 2010: 305–307.' }}
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
  { id: 'background', title: '背景信息' },
  { id: 'reference', title: '参考文献' }
]

const attributes = [
  { name: 'mode', format: 'str', desc: 'EDFA模式，是否添加噪声，可取值{"naive_pass", "no_noise_pass"}', tall: true },
  { name: 'nf_db', format: 'float', desc: 'EDFA噪声系数' },
  { name: 'f_cut', format: 'float', desc: '信号载波频率，单位GHz' },
  { name: 'gain', format: 'float', desc: 'EDFA增益，线性倍数，无单位' },
  { name: 'noise_bw', format: 'float', desc: 'ASE噪声带宽，单位GHz' }
]

const functions = [
  { name: '__init__', desc: '初始化EDFA参数' },
  { name: 'forward_pass', desc: '信号通过EDFA进行放大' },
  { name: '__naive_pass__', desc: '信号通过有噪声EDFA' },
  { name: '__no_noise_pass__', desc: '信号通过无噪声EDFA' },
  { name: '__calcu_noise_power__', desc: '计算ASE噪声功率' },
  { name: '__amplifier__', desc: '放大输入信号' },
  { name: '__add_noise__', desc: '向信号添加ASE噪声' }
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
.edfa-doc-page {
  width: 100%;
  min-height: 2375px;
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

.reference-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin: 0;
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

/* ========== 公式容器 ========== */
.formula-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: #FAFBFD;
  border: 1px solid #E2E7EF;
  border-radius: 6px;
}

.formula {
  font-family: 'Times New Roman', serif;
  font-size: 14px;
  color: #121212;
  font-style: italic;
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
