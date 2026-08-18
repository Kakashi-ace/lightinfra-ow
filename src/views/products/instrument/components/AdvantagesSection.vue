<template>
  <section class="advantages-section">
    <div class="advantages-header">
      <h2 class="section-title-left">{{ t('product.instrument.advantagesTitle') }}</h2>
      <button class="advantage-btn" @click="emit('start')">{{ t('common.startUsing') }}</button>
    </div>
    <div class="advantages-grid">
      <div
        v-for="(adv, index) in advantages"
        :key="index"
        class="advantage-card"
        :class="[
          `advantage-card-${index + 1}`,
          { 'card-dark': adv.theme === 'dark', 'card-light': adv.theme === 'light' }
        ]"
      >
        <h3 class="advantage-title">{{ adv.title }}</h3>
        <p class="advantage-desc">{{ adv.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  advantages: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['start'])
</script>

<style scoped>
.advantages-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.advantages-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title-left {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0;
}

.advantage-btn {
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

.advantage-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px;
}

.advantage-card {
  padding: 28px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s ease;
}

.advantage-card:hover {
  transform: translateY(-4px);
}

/* 卡片1: 蓝色背景，宽584px */
.advantage-card-1 {
  grid-column: span 2;
  background: #0073FF;
  color: #FFFFFF;
  width: 100%;
}

/* 卡片2: 深色背景，宽562px */
.advantage-card-2 {
  grid-column: span 2;
  background: linear-gradient(180deg, #202020 0%, rgba(54,63,74,0.5) 100%);
  color: #D3D3D3;
  width: 100%;
}

/* 卡片3: 白色背景，浅色文字 */
.advantage-card-3 {
  background: #FFFFFF;
  color: #323232;
}

.advantage-card-3 .advantage-title,
.advantage-card-3 .advantage-desc {
  color: #323232;
}

/* 卡片4: 深色背景 */
.advantage-card-4 {
  background: linear-gradient(180deg, #202020 0%, rgba(54,63,74,0.5) 100%);
  color: #D3D3D3;
}

/* 卡片5: 蓝色背景 */
.advantage-card-5 {
  background: #0073FF;
  color: #FFFFFF;
}

.advantage-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  margin: 0;
}

.advantage-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  margin: 0;
}
</style>
