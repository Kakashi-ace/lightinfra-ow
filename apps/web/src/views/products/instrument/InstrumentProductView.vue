<template>
  <div class="instrument-product-view">
    <HeroSection @start="handleStart" />
    <DescSection />
    <ReasonSection @start="handleStart" />
    <AdvantagesSection :advantages="pageData.advantages" @start="handleStart" />
    <CtaSection :title="t('product.instrument.ctaTitle')" :button-text="t('footer.contact')" @start="handleStart" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import HeroSection from './components/HeroSection.vue'
import DescSection from './components/DescSection.vue'
import ReasonSection from './components/ReasonSection.vue'
import AdvantagesSection from './components/AdvantagesSection.vue'
import CtaSection from '@/components/CtaSection.vue'

const { t, tm } = useI18n()
const router = useRouter()

// 无外部调用方会传入 pageData，文案全部来自 i18n，随语言切换响应式更新
// theme 是样式主题标记（非文案），保留在代码里，不放进 i18n
const ADVANTAGE_THEMES = ['blue', 'dark', 'light', 'dark', 'blue']

const pageData = computed(() => ({
  advantages: tm('product.instrument.advantages').map((advantage, i) => ({
    ...advantage,
    theme: ADVANTAGE_THEMES[i]
  }))
}))

const emit = defineEmits(['navigate', 'tabChange'])

const handleStart = () => {
  router.push('/contact')
}
</script>

<style scoped>
.instrument-product-view {
  width: 100%;
  min-height: 100vh;
  background: #121212;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}
</style>
