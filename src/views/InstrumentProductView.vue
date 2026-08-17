<template>
  <div class="instrument-product-view">
    <ProductPageInstrument @start="handleStart" />
  </div>
</template>

<script setup>
import ProductPageInstrument from '../components/ProductPageInstrument.vue'

const handleStart = (product) => {
  // 资源说明页已移除，开始使用跳转目标待定
}
</script>

<style scoped>
.instrument-product-view {
  width: 100%;
  min-height: 100vh;
  background: #121212;
}
</style>
