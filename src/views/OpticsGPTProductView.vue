<template>
  <div class="opticsgpt-product-view">
    <ProductPageOpticsGPT @start="handleStart" />
  </div>
</template>

<script setup>
import ProductPageOpticsGPT from '../components/ProductPageOpticsGPT.vue'

const handleStart = (product) => {
  // 资源说明页已移除，开始使用跳转目标待定
}
</script>

<style scoped>
.opticsgpt-product-view {
  width: 100%;
  min-height: 100vh;
  background: #121212;
}
</style>
