<template>
  <div class="ifts-product-view">
    <ProductPageIFTS @start="handleStart" />
  </div>
</template>

<script setup>
import ProductPageIFTS from '../components/ProductPageIFTS.vue'

const handleStart = (product) => {
  // 跳转到资源页面开始使用
  window.location.href = '/resources'
}
</script>

<style scoped>
.ifts-product-view {
  width: 100%;
  min-height: 100vh;
  background: #121212;
}
</style>
