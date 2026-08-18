<template>
  <section class="notice-section">
    <div class="notice-bar">
      <span class="notice-text">{{ t('product.opticsgpt.noticeText') }}</span>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.notice-section {
  width: 100%;
  max-width: 1225px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.notice-bar {
  width: 100%;
  height: 49px;
  padding: 0 20px;
  background: rgba(164, 205, 255, 0.22);
  border: 1px solid #0073FF;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notice-text {
  font-size: 14px;
  color: #FFFFFF;
}
</style>
