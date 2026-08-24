<template>
  <section class="contact-section">
    <div class="contact-container">
      <h2 class="contact-title">{{ t('contactPage.contactTitle') }}</h2>
      <p class="contact-subtitle">{{ t('contactPage.contactSubtitle') }}</p>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.contact-section {
  width: 100%;
  height: 492px;
  background: #FBFCFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-container {
  width: 840px;
  text-align: center;
}

.contact-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #121212;
  margin: 0 0 24px 0;
}

.contact-subtitle {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #555555;
  margin: 0;
}
</style>
