<template>
  <div class="ifts-product-view">
    <ProductPageIFTS @start="handleStart" />
  </div>
</template>

<script setup>
import ProductPageIFTS from '../components/ProductPageIFTS.vue'

const handleStart = (product) => {
  // 资源说明页已移除，开始使用跳转目标待定
}
</script>

<style scoped>
.ifts-product-view {
  width: 100%;
  min-height: 100vh;
  background: #121212;
}
</style>
