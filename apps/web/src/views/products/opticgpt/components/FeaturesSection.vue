<template>
  <section class="features-section">
    <div class="features-header">
      <h2 class="section-title">{{ t('product.opticsgpt.featuresTitle') }}</h2>
      <p class="section-subtitle">{{ t('product.opticsgpt.featuresSubtitle') }}</p>
    </div>
    <div class="features-video">
      <VideoPlayer
        class="feature-video-player vjs-big-play-centered"
        :sources="[{ src: 'https://pub-15bcedb25bd747a8ae4057ca8120bf26.r2.dev/media/optics-gpt-promo.mp4', type: 'video/mp4' }]"
        :loop="true"
        :muted="true"
        autoplay="muted"
        :controls="true"
        :playsinline="true"
        :fluid="true"
      />
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

const { t } = useI18n()
</script>

<style scoped>
.features-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.features-header {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  text-align: right;
}

.section-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0;
  white-space: pre-line;
}

.section-subtitle {
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  color: #AFAFAF;
  margin: 0;
  white-space: pre-line;
}

.features-video {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
}

.feature-video-player {
  display: block;
  width: 100%;
}

.feature-video-player :deep(.video-js) {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
}
</style>
