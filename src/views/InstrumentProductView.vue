<template>
  <div class="instrument-product-view">
    <ProductPageInstrument @start="handleStart" />
  </div>
</template>

<script setup>
import ProductPageInstrument from '../components/ProductPageInstrument.vue'

const handleStart = (product) => {
  // 跳转到资源页面开始使用
  window.location.href = '/resources'
}
</script>

<style scoped>
.instrument-product-view {
  width: 100%;
  min-height: 100vh;
  background: #121212;
}
</style>
