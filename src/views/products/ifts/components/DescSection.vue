<template>
  <section class="desc-section">
    <h2 class="desc-title">{{ t('product.ifts.descTitle') }}</h2>
    <p class="desc-text">{{ t('product.ifts.descText') }}</p>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.desc-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.desc-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0;
}

.desc-text {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #AFAFAF;
  margin: 0;
}
</style>
