<template>
  <div class="ifts-product-view">
    <HeroSection @start="handleStart" />
    <DescSection />
    <ReasonSection @start="handleStart" />
    <CodeSection @start="handleStart" />
    <CtaSection :title="t('product.ifts.ctaTitle')" :button-text="t('footer.contact')" @start="handleStart" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import HeroSection from './components/HeroSection.vue'
import DescSection from './components/DescSection.vue'
import ReasonSection from './components/ReasonSection.vue'
import CodeSection from './components/CodeSection.vue'
import CtaSection from '@/components/CtaSection.vue'

const { t } = useI18n()
const router = useRouter()

const emit = defineEmits(['navigate', 'tabChange'])

const handleStart = () => {
  router.push('/contact')
}
</script>

<style scoped>
.ifts-product-view {
  width: 100%;
  min-height: 100vh;
  background: #121212;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}
</style>
