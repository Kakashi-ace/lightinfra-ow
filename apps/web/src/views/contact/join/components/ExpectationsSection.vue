<template>
  <section class="expectations-section">
    <div class="expectations-container">
      <div class="expectations-header">
        <h2 class="section-title">{{ t('recruit.expectationsTitle') }}</h2>
        <p class="section-subtitle">{{ t('recruit.expectationsSubtitle') }}</p>
      </div>
      <div class="expectations-rows">
        <div
          v-for="card in cards"
          :key="card.id"
          class="expectation-row"
        >
          <h3 class="expectation-row-title">{{ card.title }}</h3>
          <p class="expectation-row-desc">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  cards: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.expectations-section {
  width: 100%;
  padding: 60px 0 120px 0;
}

.expectations-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.expectations-header {
  width: 474px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-title {
  font-size: 40px;
  font-weight: 600;
  line-height: 52px;
  color: #121212;
  margin: 0;
  white-space: pre-line;
}

.section-subtitle {
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: #555555;
  margin: 0;
}

.expectations-rows {
  width: 562px;
  display: flex;
  flex-direction: column;
}

.expectation-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 32px 0;
  border-top: 1px solid #D1EAFF;
}

.expectation-row:last-child {
  border-bottom: 1px solid #D1EAFF;
}

.expectation-row-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #121212;
  margin: 0;
}

.expectation-row-desc {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #555555;
  margin: 0;
  text-align: right;
}
</style>
