<template>
  <div class="about-view">
    <HeroSection />
    <main class="main-content">
      <AboutSection :about-paragraphs="pageData.aboutParagraphs" :cards="pageData.cards" />
      <ValuesSection :values="pageData.values" />
      <CtaSection :title="t('about.ctaTitle')" :button-text="t('footer.contact')" :image="false" theme="light" @start="router.push('/contact')" />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ValuesSection from './components/ValuesSection.vue'
import CtaSection from '@/components/CtaSection.vue'

const { t, tm } = useI18n()
const router = useRouter()

// 无外部调用方会传入 pageData，文案全部来自 i18n，随语言切换响应式更新
const VALUE_IMAGES = ['/media/geek.png', '/media/pragmatic.png', '/media/open.png', '/media/altruistic.png']

const pageData = computed(() => ({
  aboutParagraphs: tm('about.paragraphs'),
  values: tm('about.values').map((value, i) => ({ ...value, image: VALUE_IMAGES[i] })),
  cards: tm('about.cards')
}))
</script>

<style scoped>
.about-view {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

.main-content {
  width: 100%;
}
</style>
