<template>
  <div class="doc-content-wrapper">
    <main class="doc-content" id="doc-content">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        {{ docData.breadcrumb }}
      </div>

      <!-- 页面标题 -->
      <h1 class="page-title">{{ docData.pageTitle }}</h1>

      <!-- 模块说明 -->
      <p class="module-desc">{{ docData.moduleDesc }}</p>

      <!-- 内部函数标题 -->
      <h2 class="section-title">{{ docData.internalFuncTitle }}</h2>

      <!-- 内部函数表格 -->
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
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  docData: {
    type: Object,
    default: () => ({
      breadcrumb: '资源 / 文档 / IFTS / 代码说明文档 / Channel / SSFM Module / SSFM calculation functions',
      pageTitle: 'SSFM calculation functions',
      moduleDesc: '该模块包含用于计算 SSFM 每一步线性及非线性效应的函数。单偏振与双偏振信号分别使用带有 "_scalar" 和 "_matrix" 后缀的函数完成运算。',
      internalFuncTitle: '内部函数',
      funcs: [
        { name: 'linearity_scalar', description: '计算单偏振信号传输过程中的线性效应' },
        { name: 'nonlinearity_scalar', description: '计算单偏振信号传输过程中的非线性效应' },
        { name: 'linearity_matrix', description: '计算双偏振信号传输过程中的线性效应' },
        { name: 'nonlinearity_matrix', description: '计算双偏振信号传输过程中的非线性效应' }
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

.module-desc {
  font-size: 14px;
  color: #535C6E;
  line-height: 24px;
  margin: 0;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #121212;
  line-height: 30px;
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

.table-header {
  display: flex;
  background: #FAFBFD;
  padding: 14px 0 14px 20px;
}

.table-header .col-func {
  width: 240px;
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 22px;
}

.table-header .col-desc {
  width: 450px;
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
</style>
