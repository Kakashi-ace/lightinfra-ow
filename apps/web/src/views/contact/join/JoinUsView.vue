<template>
  <div class="contact-view">
    <HeroSection />
    <PositionsSection :positions="pageData.positions" @apply="handleApply" />
    <ExpectationsSection :cards="pageData.expectationCards" />
    <ContactSection />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HeroSection from './components/HeroSection.vue'
import PositionsSection from './components/PositionsSection.vue'
import ExpectationsSection from './components/ExpectationsSection.vue'
import ContactSection from './components/ContactSection.vue'

const { tm } = useI18n()

// 无外部调用方会传入 pageData，文案全部来自 i18n，随语言切换响应式更新
const pageData = computed(() => ({
  positions: tm('recruit.positions'),
  expectationCards: tm('recruit.expectationCards')
}))

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
