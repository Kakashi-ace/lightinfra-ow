<template>
  <section class="features-section">
    <h2 class="section-title">{{ t('product.opticsgpt.featuresTitle') }}</h2>
    <div class="features-grid">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="feature-card"
      >
        <div class="feature-icon">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" fill="rgba(0,115,255,0.1)" />
            <circle cx="100" cy="100" r="50" fill="rgba(0,115,255,0.2)" />
            <circle cx="100" cy="100" r="25" fill="#0073FF" />
          </svg>
        </div>
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-desc">{{ feature.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  features: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.features-section {
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

.features-grid {
  display: flex;
  gap: 77px;
  justify-content: center;
}

.feature-card {
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.feature-icon {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #0073FF;
  margin: 0;
  text-align: center;
}

.feature-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #AFAFAF;
  margin: 0;
  text-align: center;
}
</style>
