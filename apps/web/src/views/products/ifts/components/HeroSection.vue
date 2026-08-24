<template>
  <section class="hero-section">
    <div class="hero-bg">
      <img class="hero-bg-image" src="/media/IFTS-hero-background.png" alt="" />
    </div>
    <div class="hero-content">
      <div class="hero-left">
        <h1 class="hero-title">{{ t('product.ifts.heroTitle') }}</h1>
        <p class="hero-desc">{{ t('product.ifts.heroDesc') }}</p>
        <button class="hero-btn" @click="emit('start')">{{ t('footer.contact') }}</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits(['start'])
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 900px;
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

.hero-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 1200px;
  display: flex;
  align-items: center;
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
  margin: 0;
  background: linear-gradient(90deg, #020952 0%, #000000 62.98%, #002B81 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #121212;
  margin: 0;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid #121212;
  border-radius: 73px;
  font-size: 24px;
  font-weight: 500;
  color: #121212;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.hero-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

</style>
