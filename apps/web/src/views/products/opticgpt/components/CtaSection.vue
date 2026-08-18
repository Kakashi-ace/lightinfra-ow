<template>
  <section class="cta-section">
    <h2 class="cta-title">{{ t('product.opticsgpt.ctaTitle') }}</h2>
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.cta-title {
  font-size: 64px;
  font-weight: 500;
  line-height: 75px;
  color: #FFFFFF;
  text-align: center;
  margin: 0;
}

.cta-btn {
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

.cta-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}
</style>
