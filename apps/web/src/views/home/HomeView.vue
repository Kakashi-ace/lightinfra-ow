<template>
  <div class="home">
    <HeroSection />
    <PlatformSection />
    <ProductCarouselSection />
    <ResearchSection />
    <NewsSection />
    <CtaSection
      :title="t('home.ctaTitle')"
      :button-text="t('nav.contact')"
      :image="false"
      @start="router.push('/contact')"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import HeroSection from './components/HeroSection.vue'
import PlatformSection from './components/PlatformSection.vue'
import ProductCarouselSection from './components/ProductCarouselSection.vue'
import ResearchSection from './components/ResearchSection.vue'
import NewsSection from './components/NewsSection.vue'
import CtaSection from '@/components/CtaSection.vue'

const router = useRouter()
const { t } = useI18n()
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #121212;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 1600px) {
  .home {
    width: 100%;
  }
}
</style>
