<template>
  <div class="instrument-product-view">
    <HeroSection @start="handleStart" />
    <DescSection />
    <ScenesSection :scenes="pageData.scenes" />
    <AdvantagesSection :advantages="pageData.advantages" @start="handleStart" />
    <CtaSection @start="handleStart" />
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import DescSection from './components/DescSection.vue'
import ScenesSection from './components/ScenesSection.vue'
import AdvantagesSection from './components/AdvantagesSection.vue'
import CtaSection from './components/CtaSection.vue'

defineProps({
  pageData: {
    type: Object,
    default: () => ({
      scenes: [
        { tag: '面向研发', title: '更快搭建测试，更专注问题本身' },
        { tag: '面向产线', title: '统一测试标准，稳定每一次执行' },
        { tag: '面向管理者', title: '开源通信工具包，助力光通信智能化研究' },
        { tag: '面向整体愿景', title: '连接研发与生产，构建统一智能测试体系' }
      ],
      advantages: [
        { title: '存量仪器智能化升级', desc: '跨品牌、跨品类统一接入', theme: 'blue' },
        { title: '垂域大模型 智能拆解任务', desc: '只需要提供任务描述，垂域大模型自动拆解任务，并给出控制仪器指令，完成实验、测试全流程。', theme: 'dark' },
        { title: '自动发现、即插即用', desc: '仪器连接后自动识别品牌、型号、状态与可用能力，快速完成设备接入和控制界面配置，缩短研发环境搭建与产线工位部署时间。', theme: 'light' },
        { title: '测试结果统一管理', desc: '统一记录设备状态、执行步骤、参数配置、测试数据和判定结果，为问题复现、质量分析和过程追溯提供完整依据。', theme: 'dark' },
        { title: '能力持续沉淀', desc: '将个人经验沉淀为企业可复用的测试流程、仪器配置和案例资产，未来还可通过案例平台实现测试方案的分享与复用。', theme: 'blue' }
      ]
    })
  }
})

const emit = defineEmits(['navigate', 'start', 'tabChange'])

const handleStart = () => {
  emit('start', 'instrument')
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
