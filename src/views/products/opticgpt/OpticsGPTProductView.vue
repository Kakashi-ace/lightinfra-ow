<template>
  <div class="opticsgpt-product-view">
    <HeroSection :hero-image="pageData.heroImage" @start="handleStart" />
    <FeaturesSection :features="pageData.features" />
    <BenchmarkSection :rows="pageData.benchmarkData" />
    <CoreFunctionsSection :core-functions="pageData.coreFunctions" />
    <NoticeBar />
    <CtaSection @start="handleStart" />
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import BenchmarkSection from './components/BenchmarkSection.vue'
import CoreFunctionsSection from './components/CoreFunctionsSection.vue'
import NoticeBar from './components/NoticeBar.vue'
import CtaSection from './components/CtaSection.vue'

defineProps({
  pageData: {
    type: Object,
    default: () => ({
      heroImage: '',
      features: [
        { title: '轻部署', desc: '8B参数量级，支持端侧及边缘高效部署，降低应用门槛' },
        { title: '高认知', desc: '经海量专业数据训练，具备深厚的"光学素养"与精准逻辑直觉' },
        { title: '强应用', desc: '在算法生成、系统诊断、仿真设计等核心应用场景性能全面领先' },
        { title: '全可控', desc: '从数据、训练到部署，全流程自主可控，保障产业安全' }
      ],
      benchmarkData: [
        { model: 'GPT-4o', scores: ['78.92', '74.52', '80.89', '77.13', '80.73', '83.49'], highlight: false },
        { model: 'DeepSeek R1（671B）', scores: ['79.19', '75.93', '82.28', '76.31', '83.03', '83.50'], highlight: false },
        { model: 'OpticsGPT（8B）', scores: ['84.46', '77.22', '77.22', '83.75', '86.70', '84.40'], highlight: true }
      ],
      coreFunctions: [
        { title: '光学知识理解', desc: '融合专业知识体系与工程数据，实现光学领域深度理解与智能推理。' },
        { title: '专业任务生成', desc: '支持光学设计、算法生成与系统优化，辅助工程师完成复杂任务。' },
        { title: '智能系统诊断', desc: '结合领域知识分析系统状态，提供故障定位与优化建议。' }
      ]
    })
  }
})

const emit = defineEmits(['navigate', 'start', 'tabChange'])

const handleStart = () => {
  emit('start', 'opticsgpt')
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
