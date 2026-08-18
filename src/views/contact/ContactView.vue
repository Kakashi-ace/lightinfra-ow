<template>
  <div class="contact-view">
    <HeroSection />
    <PositionsSection :positions="pageData.positions" @apply="handleApply" />
    <ExpectationsSection :cards="pageData.expectationCards" />
    <ContactSection />
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import PositionsSection from './components/PositionsSection.vue'
import ExpectationsSection from './components/ExpectationsSection.vue'
import ContactSection from './components/ContactSection.vue'

defineProps({
  pageData: {
    type: Object,
    default: () => ({
      positions: [
        { id: 'pos-1', name: '光学工程师' },
        { id: 'pos-2', name: '算法工程师' },
        { id: 'pos-3', name: '算法工程师' },
        { id: 'pos-4', name: '算法工程师' }
      ],
      expectationCards: [
        { id: 'exp-1', title: '专业能力', description: '具备扎实的专业基础知识，能够独立完成工作任务' },
        { id: 'exp-2', title: '创新精神', description: '善于思考，勇于创新，能够提出建设性的解决方案' }
      ]
    })
  }
})

const emit = defineEmits(['apply'])

const handleApply = (position) => {
  emit('apply', position)
}
</script>

<style scoped>
.contact-view {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}
</style>
