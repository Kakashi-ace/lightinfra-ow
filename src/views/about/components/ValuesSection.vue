<template>
  <section class="values-section">
    <div class="section-container">
      <h2 class="section-title">{{ t('about.valuesTitle') }}</h2>
      <p class="section-subtitle">{{ t('about.subtitle') }}</p>
      <div class="values-grid">
        <div
          v-for="(value, index) in values"
          :key="index"
          class="value-card"
        >
          <div class="value-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="35" fill="rgba(0,115,255,0.2)" />
              <circle cx="40" cy="40" r="20" fill="#0073FF" />
            </svg>
          </div>
          <h3 class="value-title">{{ value.title }}</h3>
          <p class="value-desc">{{ value.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  values: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.section-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 48px;
  font-weight: 600;
  line-height: 58px;
  color: #121212;
  margin: 0 0 16px 0;
}

.section-subtitle {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #555555;
  margin: 0 0 60px 0;
}

.values-section {
  padding: 120px 0;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 41px;
}

.value-card {
  width: 384px;
  height: 387px;
  background: linear-gradient(180deg, rgba(164,205,255,0.59) 0%, rgba(0,115,255,0.59) 100%);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  transition: all 0.2s ease;
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 115, 255, 0.2);
}

.value-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #FFFFFF;
  margin: 0;
  text-align: center;
}

.value-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-align: center;
}
</style>
