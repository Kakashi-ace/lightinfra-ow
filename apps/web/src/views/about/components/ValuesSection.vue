<template>
  <section class="values-section">
    <div class="section-container">
      <div class="section-header-row">
        <h2 class="section-title">{{ t('about.valuesTitle') }}</h2>
        <p class="section-subtitle">{{ t('about.valuesSubtitle') }}</p>
      </div>
      <div class="values-grid">
        <div
          v-for="(value, index) in values"
          :key="index"
          class="value-card"
        >
          <div class="value-image">
            <img v-if="value.image" :src="value.image" alt="" />
            <svg v-else width="100%" height="100%" viewBox="0 0 200 150" fill="none">
              <rect width="200" height="150" fill="rgba(0,115,255,0.1)" />
              <circle cx="100" cy="75" r="40" fill="rgba(0,115,255,0.2)" />
              <circle cx="100" cy="75" r="20" fill="#0073FF" />
            </svg>
          </div>
          <div class="value-text">
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-subtitle">{{ value.subtitle }}</p>
            <p class="value-content">{{ value.content }}</p>
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
  values: {
    type: Array,
    default: () => ([
      { title: '', subtitle: '', content: '', image: '' },
      { title: '', subtitle: '', content: '', image: '' },
      { title: '', subtitle: '', content: '', image: '' },
      { title: '', subtitle: '', content: '', image: '' }
    ])
  }
})
</script>

<style scoped>
.section-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 60px;
}

.section-title {
  font-size: 48px;
  font-weight: 600;
  line-height: 58px;
  color: #121212;
  margin: 0;
  white-space: pre-line;
}

.section-subtitle {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #555555;
  margin: 0;
}

.values-section {
  padding: 120px 0;
}

.values-grid {
  display: flex;
  gap: 0;
}

.value-card {
  width: 300px;
  min-height: 349px;
  box-sizing: border-box;
  padding: 32px;
  background: #FFFFFF;
  border: 1px solid #D1EAFF;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.value-card:not(:first-child) {
  border-left: none;
}

.value-card:hover {
  background: #EEF5FF;
  border-color: transparent;
}

.value-image {
  width: 236px;
  height: 106px;
  flex-shrink: 0;
  overflow: hidden;
}

.value-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.value-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.value-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  color: #121212;
  margin: 0;
}

.value-subtitle {
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: #7C7C7C;
  margin: 0 0 12px 0;
}

.value-content {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #535C6E;
  margin: 0;
  white-space: pre-line;
}
</style>
