<template>
  <div class="doc-content-wrapper">
    <main class="doc-content" id="doc-content">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        {{ docData.breadcrumb }}
      </div>

      <!-- 页面标题 -->
      <h1 class="page-title">{{ docData.className }}</h1>

      <!-- 类说明 -->
      <p class="class-desc">{{ docData.classDesc }}</p>

      <!-- 主要属性 -->
      <section class="section">
        <h2 class="section-title">{{ docData.attributesTitle }}</h2>

        <!-- 基本参数 -->
        <div class="attr-group">
          <h3 class="attr-group-title">{{ docData.basicParamsTitle }}</h3>
          <div class="params-table">
            <div class="table-header">
              <span class="col-attr">Attributes</span>
              <span class="col-format">Format</span>
              <span class="col-desc">Description</span>
            </div>
            <div
              v-for="(param, index) in docData.basicParams"
              :key="index"
              class="table-row"
            >
              <span class="col-attr">{{ param.name }}</span>
              <span class="col-format">{{ param.format }}</span>
              <span class="col-desc">{{ param.description }}</span>
            </div>
          </div>
        </div>

        <!-- 迭代更新参数 -->
        <div class="attr-group">
          <h3 class="attr-group-title">{{ docData.iterParamsTitle }}</h3>
          <div class="params-table">
            <div class="table-header">
              <span class="col-attr">Attributes</span>
              <span class="col-format">Format</span>
              <span class="col-desc">Description</span>
            </div>
            <div
              v-for="(param, index) in docData.iterParams"
              :key="index"
              class="table-row"
            >
              <span class="col-attr">{{ param.name }}</span>
              <span class="col-format">{{ param.format }}</span>
              <span class="col-desc">{{ param.description }}</span>
            </div>
          </div>
        </div>

        <!-- 双偏振参数 -->
        <div class="attr-group">
          <h3 class="attr-group-title">{{ docData.dualPolParamsTitle }}</h3>
          <div class="params-table">
            <div class="table-header">
              <span class="col-attr">Attributes</span>
              <span class="col-format">Format</span>
              <span class="col-desc">Description</span>
            </div>
            <div
              v-for="(param, index) in docData.dualPolParams"
              :key="index"
              class="table-row"
            >
              <span class="col-attr">{{ param.name }}</span>
              <span class="col-format">{{ param.format }}</span>
              <span class="col-desc">{{ param.description }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 注释 -->
      <p class="note-text">{{ docData.note }}</p>

      <!-- 内部函数 -->
      <section class="section">
        <h2 class="section-title">{{ docData.internalFuncTitle }}</h2>

        <div class="func-table">
          <div class="table-header">
            <span class="col-func">Functions</span>
            <span class="col-desc">Description</span>
          </div>
          <div
            v-for="(func, index) in docData.funcs"
            :key="index"
            class="table-row"
          >
            <span class="col-func">
              <span class="func-link" @click="handleFuncClick(func.name)">{{ func.name }}</span>
            </span>
            <span class="col-desc">{{ func.description }}</span>
          </div>
        </div>
      </section>

      <!-- 背景信息 -->
      <section class="section">
        <h2 class="section-title">{{ docData.backgroundTitle }}</h2>
        <p class="intro-text">{{ docData.backgroundIntro }}</p>

        <!-- 子章节一 -->
        <div class="sub-section">
          <h3 class="sub-section-title">{{ docData.section1.title }}</h3>
          <p class="desc-text">{{ docData.section1.para1 }}</p>
        </div>

        <!-- 子章节二 -->
        <div class="sub-section">
          <h3 class="sub-section-title">{{ docData.section2.title }}</h3>
          <p class="desc-text multi-line">{{ docData.section2.para1 }}</p>
          <div class="formula">{{ docData.section2.formula }}</div>
        </div>

        <!-- 子章节三 -->
        <div class="sub-section">
          <h3 class="sub-section-title">{{ docData.section3.title }}</h3>
          <p class="desc-text multi-line">{{ docData.section3.para1 }}</p>
          <div class="formula">{{ docData.section3.formula }}</div>
        </div>

        <!-- 子章节四 -->
        <div class="sub-section">
          <h3 class="sub-section-title">{{ docData.section4.title }}</h3>
          <p class="desc-text multi-line">{{ docData.section4.para1 }}</p>
          <div class="formula">{{ docData.section4.formula }}</div>
        </div>
      </section>

      <!-- 参考文献 -->
      <section class="section">
        <h2 class="section-title">{{ docData.refTitle }}</h2>
        <div class="ref-list">
          <p
            v-for="(ref, index) in docData.references"
            :key="index"
            class="ref-item"
          >{{ ref }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  docData: {
    type: Object,
    default: () => ({
      breadcrumb: '资源 / 文档 / IFTS / 代码说明文档 / Channel / SSFM Module / Step_Size',
      className: 'Step_Size',
      classDesc: 'Step_Size 类属于仿真系统的 SSFM 模块，是 Optics_Base_Module 的子类。该类实例在 SSFM 类的方法中自动创建和使用，用于计算算法执行过程中的步长，并支持多种步长计算方法。',
      attributesTitle: '主要属性',
      basicParamsTitle: '基本参数',
      basicParams: [
        { name: 'dz_mode', format: 'str', description: "设定步长计算方法，可取值 {'np', 'log', 'np_log', 'c'}" },
        { name: 'nl_gamma', format: 'float', description: '非线性系数' },
        { name: 'nPol', format: 'int', description: '偏振数目' },
        { name: 'pmd', format: 'int', description: '取值 0 或 1，设定是否仿真 PMD 效应' },
        { name: 'alpha_loss', format: 'float', description: '链路损耗系数，单位 Np/km' },
        { name: 'span_len', format: 'float', description: '当前跨段长度' },
        { name: 'phi_max', format: 'float', description: '最大非线性相移，默认 0.005 rad' },
        { name: 'total_step_num', format: 'int', description: '常数步长法完成一个跨段传输的参考步数，默认 1000' }
      ],
      iterParamsTitle: '迭代更新参数',
      iterParams: [
        { name: 'step_num', format: 'int', description: '当前跨段已经过的步长数，初始值 0' },
        { name: 'dz_now', format: 'float', description: '当前步长，单位 km' },
        { name: 'dz_previous', format: 'float', description: '上一步步长' },
        { name: 'prop_dz', format: 'float', description: '累积传输距离，初始值 0' },
        { name: 'dz_max', format: 'float', description: '最大步长' },
        { name: 'last_prop', format: 'bool', description: '标记当前步是否为跨段最后一步，初始值 False' }
      ],
      dualPolParamsTitle: '双偏振参数',
      dualPolParams: [
        { name: 'pmd_prop_dz', format: 'float', description: '已完成 PMD 仿真传输的累积距离，初始值 0' },
        { name: 'pmd_dz_arr', format: 'ndarray', description: '跨段分割后各小段长度数组，各段之和为跨段长度' },
        { name: 'prop_dz_in_trunck', format: 'float', description: '当前小段已完成传输的距离' },
        { name: 'lates_idx', format: 'int', description: '当前所在小段的索引编号' }
      ],
      note: '注：以上距离相关参数的单位均为 km。',
      internalFuncTitle: '内部函数',
      funcs: [
        { name: '__init__', description: '初始化 Step_Size 参数及步长状态' },
        { name: 'step', description: '计算单步步长，调用对象时自动执行' },
        { name: '__nonlinear_phase_step__', description: '使用非线性相位限制方法计算当前步长' },
        { name: '__log_step__', description: '使用对数分布方法得到当前步长' },
        { name: '__np_log_step__', description: '结合非线性相位限制与对数分布方法计算步长' },
        { name: '__check_step_size__', description: '根据当前步长及 PMD 仿真记录更新 PMD 效应计算参数' }
      ],
      backgroundTitle: '背景信息',
      backgroundIntro: 'SSFM模拟光纤信号传输时，步长的选取对算法效果有重要影响。本仿真代码支持的几种常见步长计算方法及其原理简介如下。',
      section1: {
        title: '（1）恒定步长法',
        para1: '恒定步长方法是最基本和简单的方法，即每步设定相同的步长。'
      },
      section2: {
        title: '（2）对数分布方法',
        para1: '对数分布步长法可以看成在常数步长基础上的改进，可以减少SSFM仿真过程中伪四波混频效应的出现，使相应分量低于一定水平。相应步长计算公式如下式所示，其中 K 为步长恒定时当前跨段所需步数，Γ 为链路损耗，L 为当前跨段长度 [3]。',
        formula: 'hₙ = -1/(2Γ) · ln[(1-nσ)/(1-(n-1)σ)],  σ = [1-exp(-2ΓL)]/K'
      },
      section3: {
        title: '（3）非线性相位旋转方法',
        para1: '该方法适用于非线性效应表现显著的系统。通过设定每步允许的最大非线性相移 φᴹᴬˣₙₗ，使得步长大小满足传输方程近似解的条件，步长由下式计算得到。',
        formula: 'h = φᴺᴸᴹᴬˣ / (γ |A|²)'
      },
      section4: {
        title: '（4）非线性相位限制与对数分布结合方式',
        para1: '该方法综合了两种方法。首先利用最大非线性相移计算当前步长，链路无损耗时，步长即非线性相位法所得步长；链路存在损耗情况下对步长进行进一步调整。公式如下所示，其中 α 为衰减系数，单位 Np/km，h 为利用非线性相移计算所得步长。',
        formula: 'h\' = (-1/α) · ln(1 - αh)'
      },
      refTitle: '参考文献',
      references: [
        '[1] SHAO J, LIANG X, KUMAR S. Comparison of Split-Step Fourier Schemes for Simulating Fiber Optic Communication Systems [J]. IEEE Photonics Journal, 2014, 6(4): 1–15.',
        '[2] SINKIN O V, HOLZLOHNER R, ZWECK J, et al. Optimization of the split-step Fourier method in modeling optical-fiber communications systems [J]. Journal of Lightwave Technology, 2003, 21(1): 61–8.',
        '[3] BOSCO G, CARENA A, CURRI V, et al. Suppression of spurious tones induced by the split-step method in fiber systems simulation [J]. IEEE Photonics Technology Letters, 2000, 12(5): 489–91.'
      ]
    })
  }
})

const emit = defineEmits(['functionClick', 'navigate'])

const handleFuncClick = (funcName) => {
  emit('functionClick', funcName)
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

.class-desc {
  font-size: 14px;
  color: #535C6E;
  line-height: 24px;
  margin: 0;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #121212;
  line-height: 30px;
  margin: 0;
}

.attr-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.attr-group-title {
  font-size: 16px;
  font-weight: 600;
  color: #121212;
  line-height: 24px;
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
}

.table-header .col-attr {
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
  min-height: 50px;
  box-sizing: border-box;
}

.table-row .col-attr {
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

.note-text {
  font-size: 13px;
  color: #8A94A6;
  line-height: 22px;
  margin: 0;
}

.func-table {
  width: 690px;
  border: 1px solid #E2E7EF;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.func-table .table-header {
  display: flex;
  background: #FAFBFD;
  padding: 14px 12px 14px 20px;
}

.func-table .table-header .col-func {
  width: 240px;
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 22px;
}

.func-table .table-header .col-desc {
  width: 450px;
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 22px;
}

.func-table .table-row {
  display: flex;
  padding: 14px 12px 14px 20px;
  background: #FFFFFF;
  min-height: 50px;
  box-sizing: border-box;
}

.func-table .table-row .col-func {
  width: 240px;
  font-size: 14px;
  font-weight: 400;
  color: #0073FF;
  line-height: 22px;
}

.func-table .table-row .col-desc {
  width: 450px;
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  line-height: 22px;
}

.func-link {
  color: #0073FF;
  cursor: pointer;
  transition: color 0.2s ease;
}

.func-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.intro-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 24px;
  margin: 0;
}

.sub-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sub-section-title {
  font-size: 16px;
  font-weight: 600;
  color: #121212;
  line-height: 24px;
  margin: 0;
}

.desc-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 24px;
  margin: 0;
}

.desc-text.multi-line {
  line-height: 24px;
}

.formula {
  font-size: 14px;
  color: #121212;
  text-align: center;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 4px;
  font-family: 'Times New Roman', serif;
  line-height: 1.6;
  overflow-x: auto;
  white-space: nowrap;
}

.ref-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ref-item {
  font-size: 13px;
  color: #535C6E;
  line-height: 22px;
  margin: 0;
}
</style>
