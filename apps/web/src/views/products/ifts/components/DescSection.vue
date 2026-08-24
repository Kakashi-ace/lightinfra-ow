<template>
  <section class="desc-section">
    <div class="desc-header">
      <h2 class="desc-title">{{ t('product.ifts.descTitle') }}</h2>
      <p class="desc-text">{{ t('product.ifts.descText') }}</p>
    </div>
    <div class="desc-video">
      <VideoPlayer
        class="desc-video-player vjs-big-play-centered"
        :sources="[{ src: '/media/product-feature.mp4', type: 'video/mp4' }]"
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
.desc-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.desc-header {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;
  text-align: right;
}

.desc-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0;
}

.desc-text {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #AFAFAF;
  margin: 0;
}

.desc-video {
  width: 100%;
}

.desc-video-player {
  display: block;
  width: 100%;
}

.desc-video-player :deep(.video-js) {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
}
</style>
