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

        <!-- 属性分组一 -->
        <div class="attr-group">
          <h3 class="attr-group-title">{{ docData.attrGroup1.title }}</h3>
          <p class="attr-group-desc">
            {{ docData.attrGroup1.descBefore }}
            <span class="func-link" @click="handleFuncClick('__init__')">__init__</span>
            {{ docData.attrGroup1.descAfter }}
          </p>
        </div>

        <!-- 属性分组二 -->
        <div class="attr-group">
          <h3 class="attr-group-title">{{ docData.attrGroup2.title }}</h3>
          <p class="attr-group-desc">
            {{ docData.attrGroup2.descBefore }}
            <span class="func-link" @click="handleFuncClick('init')">init</span>
            {{ docData.attrGroup2.descMiddle }}
            <span class="func-link" @click="handleFuncClick('__pmd_init__')">__pmd_init__</span>
            {{ docData.attrGroup2.descAfter }}
          </p>
        </div>
      </section>

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
          <div class="formula">{{ docData.section1.formula1 }}</div>
          <p class="desc-text">{{ docData.section1.para2 }}</p>
          <div class="formula">{{ docData.section1.formula2 }}</div>
          <p class="desc-text multi-line">{{ docData.section1.para3 }}</p>
          <div class="formula multi-line">{{ docData.section1.formula3 }}</div>
        </div>

        <!-- 子章节二 -->
        <div class="sub-section">
          <h3 class="sub-section-title">{{ docData.section2.title }}</h3>
          <p class="desc-text multi-line">{{ docData.section2.para1 }}</p>
          <div class="formula multi-line">{{ docData.section2.formula4 }}</div>
          <p class="desc-text multi-line">{{ docData.section2.para2 }}</p>
          <p class="desc-text">{{ docData.section2.para3 }}</p>
          <div class="formula">{{ docData.section2.formula5 }}</div>
          <p class="desc-text">{{ docData.section2.para4 }}</p>
          <div class="formula">{{ docData.section2.formula6 }}</div>
          <p class="desc-text">{{ docData.section2.para5 }}</p>
          <div class="formula">{{ docData.section2.formula7 }}</div>
          <p class="desc-text">{{ docData.section2.para6 }}</p>
          <div class="formula">{{ docData.section2.formula8 }}</div>
        </div>

        <!-- 子章节三 -->
        <div class="sub-section">
          <h3 class="sub-section-title">{{ docData.section3.title }}</h3>
          <p class="desc-text multi-line">{{ docData.section3.para1 }}</p>
          <div class="formula multi-line">{{ docData.section3.formula9 }}</div>
          <p class="desc-text multi-line">{{ docData.section3.para2 }}</p>
        </div>

        <!-- 子章节四 -->
        <div class="sub-section">
          <h3 class="sub-section-title">{{ docData.section4.title }}</h3>
          <p class="desc-text multi-line-3">{{ docData.section4.para1 }}</p>
          <div class="formula">{{ docData.section4.formula10 }}</div>
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
      breadcrumb: '资源 / 文档 / IFTS / 代码说明文档 / Channel / SSFM Module / SSFM',
      className: 'SSFM',
      classDesc: 'SSFM 类属于 SSFM 模块，继承自基类 Optics_Base_Module，用于实现分布式傅里叶算法（split-step Fourier method, SSFM），通过求解非线性薛定谔方程（NLSE）仿真光纤信道中的信号传输。每调用一次 SSFM 类对象，将完成一个跨段长度的信号传输。',
      attributesTitle: '主要属性',
      attrGroup1: {
        title: '基本参数',
        descBefore: '包含信道效应参数与仿真设置，具体参数见基本初始化函数 ',
        descAfter: '。'
      },
      attrGroup2: {
        title: '双偏振信号传输仿真参数',
        descBefore: '包含随机双折射效应及 PMD 效应相关参数。参数设置由 ',
        descMiddle: ' 完成，计算参数由 ',
        descAfter: ' 配置。'
      },
      internalFuncTitle: '内部函数',
      funcs: [
        { name: '__init__', description: '基本初始化方法，传入光纤信道仿真所需的基本参数与仿真模式配置' },
        { name: 'init', description: '创建算法各模块，并根据基础参数计算、配置所需参数' },
        { name: '__step_init__', description: '配置算法执行过程中的步长计算参数' },
        { name: '__func_para_init__', description: '随算法执行更新色散及非线性效应的计算参数' },
        { name: '__pmd_init__', description: '配置 PMD 效应仿真参数' },
        { name: 'forward_pass', description: '包装函数；调用对象时自动执行算法' },
        { name: '__ssfm_scalar__', description: '使用 SSFM 仿真单偏振信号传输' },
        { name: '__ssfm_matrix__', description: '使用 SSFM 仿真双偏振信号传输' },
        { name: '__calcu_p__', description: '计算算法执行至当前步时信号的平均功率' }
      ],
      backgroundTitle: '背景信息',
      backgroundIntro: 'SSFM算法的原理及实现流程简介如下。',
      section1: {
        title: '（1）NLSE方程及其近似求解',
        para1: '光纤信道的信号传输可由非线性薛定谔方程（nonlinear Schrödinger equation，NLSE）进行描述，表达式如下式所示。',
        formula1: '∂A(z,t)/∂z = -α/2·A - i/2·β₂·∂²A/∂t² + iγ|A|²A',
        para2: '该式可以进一步简化为',
        formula2: '∂A(z,t)/∂z = [D̂ + N̂(A(z,t))]A(z,t)',
        para3: '其中 D̂、N̂(A) 分别为方程中的线性及非线性算子。当传输距离 z 很小时，线性与非线性运算可以分开进行，可以得到方程具有下列的近似解：',
        formula3: 'A(z+h,t) ≈ exp(h/2·D̂)·exp(h·N̂[A(z+h/2,t)])·exp(h/2·D̂)·A(z,t)'
      },
      section2: {
        title: '（2）SSFM模拟光纤传输算法原理',
        para1: '将光纤链路划分为小段，并根据近似解进行逐段求解即可模拟信号在光纤的传输过程，整体计算过程可由下式表示。',
        formula4: 'A(z+Σh_k,t) = exp(h_n/2·D̂)·exp(∫h_n N̂(z\')dz\')·exp((h_n+h_{n-1})/2·D̂)...exp((h_2+h_1)/2·D̂)·exp(∫h_1 N̂(z\')dz\')·exp(h_1/2·D̂)·A(z,t)',
        para2: '根据上式可以得到，实际算法执行过程中两段半个步长的色散效应计算可以合并为一次进行，色散与非线性效应的计算交替进行。',
        para3: 'SSFM采用时域求解非线性及链路损耗，在频域求解色散效应的计算方法。非线性及损耗对应求解的方程部分为',
        formula5: 'dA/dz = (iγ|A|² - α/2)A',
        para4: '该部分的解为',
        formula6: 'A(z+h,t) = exp(-α/2·h)·exp(iγ|A(z,t)|²·h_eff)·A(z,t)',
        para5: '其中 hₑff 为存在链路损耗情况下的等效传播距离，计算表达式如下式所示。',
        formula7: 'h\' = (-1/α)·ln(1 - αh)',
        para6: '色散的计算经傅里叶变换到频域进行，频域解如下式所示，再进行反变换即可得到计算该段色散后的时域信号。',
        formula8: 'A(z+Δz,ω) = exp(jβ₂ω²/2·Δz)·A(z,ω)'
      },
      section3: {
        title: '（3）Manakov-PMD方程',
        para1: '在双偏振信号传输过程中，考虑随机双折射效应导致光的偏振态发生快速随机变化，对基本的NLSE方程进行修正可以得到描述双偏振信号传输的Manakov-PMD方程，如下式所示。',
        formula9: 'i·∂A/∂z - α/2·A - 1/2·β₂·∂²A/∂t² + iγ·(8/9)|A|²A = -i·Δβ₁/2·σ·∂A/∂t',
        para2: '此时 A 由两个正交的光场组成，即 A = [Aₓ, Aᵧ]，式中 Δβ₁ 代表由PMD导致的差分群延迟，σ 代表了两个偏振态之间的耦合。'
      },
      section4: {
        title: '（4）非线性相位限制与对数分布结合方式',
        para1: '该方法综合了两种方法。首先利用最大非线性相移计算当前步长，链路无损耗时，步长即非线性相位法所得步长；链路存在损耗情况下对步长进行进一步调整。公式如下所示，其中 α 为衰减系数，单位 Np/km，h 为利用非线性相移计算所得步长。',
        formula10: 'h\' = (-1/α)·ln(1 - αh)'
      }
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
  gap: 16px;
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
  margin-top: 10px;
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
  gap: 8px;
}

.attr-group-title {
  font-size: 16px;
  font-weight: 600;
  color: #121212;
  line-height: 24px;
  margin: 0;
}

.attr-group-desc {
  font-size: 14px;
  color: #535C6E;
  line-height: 24px;
  margin: 0;
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

.func-table {
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

.table-header .col-func {
  width: 240px;
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

.table-row .col-func {
  width: 240px;
  font-size: 14px;
  font-weight: 400;
  color: #0073FF;
  line-height: 22px;
}

.table-row .col-desc {
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  line-height: 22px;
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
  margin-top: 16px;
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

.desc-text.multi-line-3 {
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

.formula.multi-line {
  white-space: normal;
  word-break: break-all;
  text-align: left;
}
</style>
