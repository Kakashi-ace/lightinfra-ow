<template>
  <div class="contact-view">
    <HeroSection />
    <ExpectationsSection />
    <ContactSection />
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import ExpectationsSection from './components/ExpectationsSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<style scoped>
.contact-view {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}
</style>
