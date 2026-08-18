<template>
  <section class="scenes-section">
    <h2 class="section-title">{{ t('product.instrument.scenesTitle') }}</h2>
    <div class="scenes-grid">
      <div
        v-for="(scene, index) in scenes"
        :key="index"
        class="scene-card"
      >
        <div class="scene-content">
          <span class="scene-tag">{{ scene.tag }}</span>
          <h3 class="scene-title">{{ scene.title }}</h3>
        </div>
        <div class="scene-image-placeholder">
          <svg width="100%" height="100%" viewBox="0 0 200 150" fill="none">
            <rect width="200" height="150" fill="rgba(0,115,255,0.1)" />
            <circle cx="100" cy="75" r="40" fill="rgba(0,115,255,0.2)" />
            <circle cx="100" cy="75" r="20" fill="#0073FF" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  scenes: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.scenes-section {
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

.scenes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 41px;
  width: 100%;
}

.scene-card {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 28px;
  background: linear-gradient(180deg, #202020 0%, rgba(54,63,74,0.5) 100%);
  border: 1px solid #323232;
  border-radius: 20px;
  min-height: 180px;
  transition: all 0.2s ease;
}

.scene-card:hover {
  border-color: #0073FF;
  transform: translateY(-4px);
}

.scene-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.scene-tag {
  font-size: 24px;
  font-weight: 500;
  color: #AFAFAF;
}

.scene-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #FFFFFF;
  margin: 0;
}

.scene-image-placeholder {
  width: 200px;
  height: 150px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
}
</style>
