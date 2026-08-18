<template>
  <section class="timeline-section">
    <div class="section-container">
      <h2 class="section-title">{{ t('about.timelineTitle') }}</h2>
      <p class="section-subtitle">{{ t('about.subtitle') }}</p>
      <div class="timeline-placeholder">
        <svg width="995" height="714" viewBox="0 0 995 714" fill="none">
          <rect width="995" height="714" fill="#D9D9D9" />
          <circle cx="497" cy="357" r="150" fill="#AFAFAF" opacity="0.5" />
          <circle cx="497" cy="357" r="80" fill="#AFAFAF" opacity="0.7" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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

.timeline-section {
  padding: 120px 0;
}

.timeline-placeholder {
  width: 995px;
  height: 714px;
  margin-left: 205px;
}
</style>
