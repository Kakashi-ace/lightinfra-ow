<template>
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">{{ t('recruit.heroTitle') }}</h1>
      <p class="hero-subtitle">{{ t('recruit.heroSubtitle') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.hero-section {
  width: 100%;
  height: 400px;
  background: url('/media/contact-hero-background.png') center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
}

.hero-content {
  text-align: center;
  z-index: 1;
}

.hero-title {
  font-size: 96px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 24px 0;
  background: linear-gradient(90deg, #020952 14.49%, #000000 59.15%, #002B81 85.39%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: #555555;
  margin: 0;
}
</style>
