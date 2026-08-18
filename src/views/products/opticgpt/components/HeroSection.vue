<template>
  <section class="hero-section">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-decoration"></div>
    </div>
    <div class="hero-content">
      <div class="hero-left">
        <h1 class="hero-title">{{ t('product.opticsgpt.heroTitle') }}</h1>
        <p class="hero-desc">{{ t('product.opticsgpt.heroDesc') }}</p>
        <button class="hero-btn" @click="emit('start')">{{ t('common.startUsing') }}</button>
      </div>
      <div class="hero-right">
        <div class="hero-image-placeholder">
          <img v-if="heroImage" :src="heroImage" alt="OpticsGPT" class="hero-image" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  heroImage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['start'])
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 643px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #0073FF 0%, #121212 100%);
}

.hero-decoration {
  position: absolute;
  top: 50%;
  right: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0,115,255,0.3) 0%, transparent 70%);
  transform: translateY(-50%);
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 55px;
}

.hero-left {
  width: 539px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.hero-title {
  font-size: 64px;
  font-weight: 600;
  line-height: 75px;
  color: #FFFFFF;
  margin: 0;
}

.hero-desc {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #FFFFFF;
  margin: 0;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid #FFFFFF;
  border-radius: 73px;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.hero-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.hero-right {
  width: 646px;
  height: 542px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
}

.hero-image-placeholder {
  width: 100%;
  height: 100%;
  background: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
