<template>
  <section class="about-section">
    <div class="section-container">
      <h2 class="section-title">{{ t('about.title') }}</h2>
      <p class="section-subtitle">{{ t('about.subtitle') }}</p>
      <div class="about-text">
        <p v-for="(para, index) in aboutParagraphs" :key="index" class="text-paragraph">
          {{ para }}
        </p>
      </div>
      <div class="about-image-placeholder">
        <svg width="100%" height="100%" viewBox="0 0 1200 542" fill="none">
          <rect width="1200" height="542" fill="#D9D9D9" />
          <rect x="500" y="221" width="200" height="100" rx="20" fill="#AFAFAF" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  aboutParagraphs: {
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

.about-section {
  padding: 100px 0 240px 0;
}

.about-text {
  margin-bottom: 60px;
}

.text-paragraph {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #535C6E;
  margin: 0 0 16px 0;
}

.text-paragraph:last-child {
  margin-bottom: 0;
}

.about-image-placeholder {
  width: 1200px;
  height: 542px;
  border-radius: 20px;
  overflow: hidden;
}
</style>
