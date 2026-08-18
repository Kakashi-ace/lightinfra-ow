<template>
  <div class="home">
    <HeroSection />
    <PlatformSection />
    <OpticsGPTSection />
    <ResearchSection />
    <NewsSection />
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import PlatformSection from './components/PlatformSection.vue'
import OpticsGPTSection from './components/OpticsGPTSection.vue'
import ResearchSection from './components/ResearchSection.vue'
import NewsSection from './components/NewsSection.vue'
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
