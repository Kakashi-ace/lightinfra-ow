<template>
  <div class="opticsgpt-product-view">
    <ProductPageOpticsGPT @start="handleStart" />
  </div>
</template>

<script setup>
import ProductPageOpticsGPT from '../components/ProductPageOpticsGPT.vue'

const handleStart = (product) => {
  // 跳转到资源页面开始使用
  window.location.href = '/resources'
}
</script>

<style scoped>
.opticsgpt-product-view {
  width: 100%;
  min-height: 100vh;
  background: #121212;
}
</style>
