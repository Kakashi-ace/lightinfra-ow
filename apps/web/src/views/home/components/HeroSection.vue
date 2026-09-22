<template>
  <section class="hero-section">
    <div class="hero-bg">
      <video class="bg-video" autoplay muted loop playsinline>
        <source src="https://pub-15bcedb25bd747a8ae4057ca8120bf26.r2.dev/media/hero-video.mp4" type="video/mp4">
      </video>
      <div class="bg-overlay"></div>
    </div>
    <div class="hero-content">
      <h1 class="hero-title">{{ t('home.heroTitle') }}</h1>
      <p class="hero-desc">{{ t('home.heroDesc') }}</p>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(61, 61, 61, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 96px;
  font-weight: 500;
  line-height: 113px;
  color: #FFFFFF;
  margin: 0 0 20px 0;
}

.hero-desc {
  width: 637px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #FFFFFF;
  margin: 0 0 40px 0;
}

@media (max-width: 1200px) {
  .hero-title {
    font-size: 64px;
    line-height: 80px;
  }

  .hero-desc {
    width: 100%;
    padding: 0 20px;
    font-size: 18px;
  }
}
</style>
