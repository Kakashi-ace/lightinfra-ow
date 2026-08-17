<template>
  <div class="products-page">
    <ProductIntro @start="handleStart" />
  </div>
</template>

<script setup>
import ProductIntro from '../components/ProductIntro.vue'

const handleStart = (index) => {
  // 根据索引跳转到对应的产品页面
  if (index === 0) {
    // OpticsGPT - 跳转到产品详情页
    window.location.href = '/products/opticsgpt'
  } else if (index === 1) {
    // IFTS - 跳转到 IFTS 产品详情页
    window.location.href = '/products/ifts'
  } else if (index === 2) {
    // 智能仪器仪表 - 跳转到仪器产品详情页
    window.location.href = '/products/instruments'
  }
}
</script>

<style scoped>
.products-page {
  width: 100%;
  min-height: 100vh;
  background: #121212;
}
</style>
