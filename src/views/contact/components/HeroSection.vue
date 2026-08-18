<template>
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">{{ t('recruit.heroTitle') }}</h1>
      <p class="hero-subtitle">{{ t('recruit.heroSubtitle') }}</p>
    </div>
    <div class="hero-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
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
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(102,102,102,0) 100%),
              linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
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
  line-height: 113px;
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

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: 10%;
}

.circle-2 {
  width: 200px;
  height: 200px;
  top: 20%;
  right: 5%;
}

.circle-3 {
  width: 150px;
  height: 150px;
  bottom: 10%;
  left: 5%;
}
</style>
