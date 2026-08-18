<template>
  <section class="core-functions-section">
    <h2 class="section-title section-title-left">{{ t('product.opticsgpt.coreFunctionsTitle') }}</h2>
    <div class="functions-grid">
      <div
        v-for="(func, index) in coreFunctions"
        :key="index"
        class="function-card"
      >
        <h3 class="function-title">{{ func.title }}</h3>
        <p class="function-desc">{{ func.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  coreFunctions: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.core-functions-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.section-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0;
}

.section-title-left {
  text-align: left;
}

.functions-grid {
  display: flex;
  gap: 41px;
  justify-content: center;
}

.function-card {
  width: 384px;
  height: 229px;
  padding: 28px;
  background: linear-gradient(180deg, #202020 0%, rgba(54, 63, 74, 0.5) 100%);
  border: 1px solid #323232;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.2s ease;
}

.function-card:hover {
  border-color: #0073FF;
  transform: translateY(-4px);
}

.function-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #D3D3D3;
  margin: 0;
}

.function-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #D3D3D3;
  margin: 0;
}
</style>
