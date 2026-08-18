<template>
  <section class="expectations-section">
    <div class="expectations-container">
      <h2 class="section-title">{{ t('recruit.expectationsTitle') }}</h2>
      <div class="expectations-content">
        <div class="expectations-image">
          <svg width="691" height="542" viewBox="0 0 691 542" fill="none">
            <rect width="691" height="542" rx="20" fill="#D9D9D9" />
          </svg>
        </div>
        <div class="expectations-cards">
          <div
            v-for="card in cards"
            :key="card.id"
            class="expectation-card"
          >
            <h3 class="expectation-card-title">{{ card.title }}</h3>
            <p class="expectation-card-desc">{{ card.description }}</p>
          </div>
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
  padding: 60px 0;
}

.expectations-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #121212;
  margin: 0 0 40px 0;
}

.expectations-content {
  display: flex;
  gap: 24px;
}

.expectations-image {
  width: 691px;
  height: 542px;
  flex-shrink: 0;
}

.expectations-image svg {
  display: block;
  border-radius: 20px;
}

.expectations-cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.expectation-card {
  width: 486px;
  height: 260px;
  background: #FBFCFF;
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.expectation-card-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: #121212;
  margin: 0;
}

.expectation-card-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #555555;
  margin: 0;
}
</style>
