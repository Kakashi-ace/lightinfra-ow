<template>
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">{{ t('contactPage.heroTitle') }}</h1>
      <p class="hero-subtitle">{{ t('contactPage.heroSubtitle') }}</p>
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
  margin: 0;
  background: linear-gradient(90deg, #020952 14.49%, #000000 59.15%, #002B81 85.39%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  margin: 16px 0 0;
  font-size: 20px;
  font-weight: 400;
  color: #333333;
}
</style>
