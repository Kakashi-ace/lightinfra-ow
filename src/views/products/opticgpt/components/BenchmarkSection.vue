<template>
  <section class="benchmark-section">
    <h2 class="section-title">{{ t('product.opticsgpt.benchmarkTitle') }}</h2>
    <div class="benchmark-table">
      <div class="table-header">
        <div class="table-cell cell-model">Model</div>
        <div class="table-cell">{{ t('product.opticsgpt.benchmark.opticalPhysics') }}</div>
        <div class="table-cell">{{ t('product.opticsgpt.benchmark.quantumOptics') }}</div>
        <div class="table-cell">{{ t('product.opticsgpt.benchmark.opticalDesign') }}</div>
        <div class="table-cell">{{ t('product.opticsgpt.benchmark.nonlinearOptics') }}</div>
        <div class="table-cell">{{ t('product.opticsgpt.benchmark.opticalComputing') }}</div>
        <div class="table-cell">{{ t('product.opticsgpt.benchmark.opticalComm') }}</div>
      </div>
      <div
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="table-row"
        :class="{ 'row-highlight': row.highlight }"
      >
        <div class="table-cell cell-model">{{ row.model }}</div>
        <div class="table-cell" v-for="(score, i) in row.scores" :key="i">{{ score }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  rows: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.benchmark-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
}

.section-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  text-align: center;
  margin: 0;
}

.benchmark-table {
  width: 100%;
  border: 1px solid #D1D1D1;
  border-radius: 20px;
  overflow: hidden;
  background: transparent;
}

.table-header {
  display: flex;
  background: rgba(242, 242, 242, 0.2);
  border-bottom: 1px solid #D1D1D1;
}

.table-row {
  display: flex;
  border-bottom: 1px solid rgba(209, 209, 209, 0.23);
}

.table-row:last-child {
  border-bottom: none;
}

.table-header .table-cell {
  font-weight: 500;
  color: #FFFFFF;
}

.table-cell {
  flex: 1;
  padding: 20px;
  font-size: 24px;
  font-weight: 400;
  color: #FFFFFF;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell-model {
  text-align: left;
  justify-content: flex-start;
}

.table-row.row-highlight .table-cell {
  font-weight: 500;
  color: #0073FF;
}
</style>
