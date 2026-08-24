<template>
  <section class="code-section">
    <div class="code-header">
      <h2 class="section-title-left">{{ t('product.ifts.codeTitle') }}</h2>
      <button class="code-btn" @click="emit('start')">{{ t('footer.contact') }}</button>
    </div>
    <div class="code-placeholder">
      <img class="code-structure-image" src="/media/IFTS-structure.png" alt="IFTS" />
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits(['start'])
</script>

<style scoped>
.code-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title-left {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0;
}

.code-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.code-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.code-placeholder {
  width: 100%;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.code-structure-image {
  display: block;
  width: 100%;
  height: auto;
}
</style>
