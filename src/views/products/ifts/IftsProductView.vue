<template>
  <div class="ifts-product-view">
    <HeroSection @start="handleStart" />
    <DescSection />
    <FeaturesSection :features="pageData.features" />
    <CodeSection @start="handleStart" />
    <CtaSection @start="handleStart" />
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import DescSection from './components/DescSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import CodeSection from './components/CodeSection.vue'
import CtaSection from './components/CtaSection.vue'

defineProps({
  pageData: {
    type: Object,
    default: () => ({
      features: [
        { title: 'PYTHON开发', desc: '易于上手，可根据自身需求扩展其功能' },
        { title: '开源免费', desc: '开源通信工具包，助力光通信智能化研究' },
        { title: '高效仿真', desc: 'GPU并行计算与AI信道模型，加速智能仿真平台' },
        { title: '智能算法', desc: '聚焦光通信领域前沿，融合AI框架' }
      ]
    })
  }
})

const emit = defineEmits(['navigate', 'start', 'tabChange'])

const handleStart = () => {
  emit('start', 'ifts')
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
