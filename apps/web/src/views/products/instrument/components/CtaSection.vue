<template>
  <section class="cta-section">
    <div class="cta-bg"></div>
    <h2 class="cta-title">{{ t('product.instrument.ctaTitle') }}</h2>
    <button class="cta-btn" @click="emit('start')">{{ t('common.startUsing') }}</button>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits(['start'])
</script>

<style scoped>
.cta-section {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(0, 115, 255, 0.3) 0%, transparent 70%);
  z-index: 0;
}

.cta-title {
  position: relative;
  z-index: 1;
  font-size: 64px;
  font-weight: 500;
  line-height: 75px;
  color: #FFFFFF;
  text-align: center;
  margin: 0;
}

.cta-btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.cta-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}
</style>
