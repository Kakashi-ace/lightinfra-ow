<template>
  <div class="opticsgpt-product-view">
    <HeroSection @start="handleStart" />
    <FeaturesSection />
    <ReasonSection @start="handleStart" />
    <BenchmarkSection :rows="pageData.benchmarkData" />
    <CoreFunctionsSection :core-functions="pageData.coreFunctions" />
    <CtaSection :title="t('product.opticsgpt.ctaTitle')" :button-text="t('footer.contact')" @start="handleStart" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import HeroSection from './components/HeroSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import ReasonSection from './components/ReasonSection.vue'
import BenchmarkSection from './components/BenchmarkSection.vue'
import CoreFunctionsSection from './components/CoreFunctionsSection.vue'
import CtaSection from '@/components/CtaSection.vue'

const { t, tm } = useI18n()
const router = useRouter()

// 无外部调用方会传入 pageData，文案全部来自 i18n，随语言切换响应式更新
// benchmarkData 的 model 是型号名称（专有名词），不做翻译
const pageData = computed(() => ({
  benchmarkData: [
    { model: 'GPT-4o', scores: ['78.92', '74.52', '80.89', '77.13', '80.73', '83.49'], highlight: false },
    { model: 'DeepSeek R1（671B）', scores: ['79.19', '75.93', '82.28', '76.31', '83.03', '83.50'], highlight: false },
    { model: 'OpticsGPT（8B）', scores: ['84.46', '77.22', '77.22', '83.75', '86.70', '84.40'], highlight: true }
  ],
  coreFunctions: tm('product.opticsgpt.coreFunctions')
}))

const emit = defineEmits(['navigate', 'tabChange'])

const handleStart = () => {
  router.push('/contact')
}
</script>

<style scoped>
.opticsgpt-product-view {
  width: 100%;
  min-height: 100vh;
  background: #121212;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}
</style>
