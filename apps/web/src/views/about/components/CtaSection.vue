<template>
  <section class="cta-section">
    <div class="section-container">
      <h2 class="cta-title">{{ t('about.ctaTitle') }}</h2>
      <router-link to="/contact" class="cta-btn">{{ t('footer.contact') }}</router-link>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.section-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-section {
  padding: 120px 0;
}

.cta-title {
  font-size: 64px;
  font-weight: 500;
  line-height: 75px;
  color: #121212;
  text-align: center;
  margin: 0 0 60px 0;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid #121212;
  border-radius: 30px;
  font-size: 24px;
  font-weight: 500;
  color: #121212;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.cta-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}
</style>
