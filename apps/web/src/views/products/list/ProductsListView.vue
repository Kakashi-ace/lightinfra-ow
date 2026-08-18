<template>
  <div class="products-page">
    <ProductList :products="products" @start="handleStart" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ProductList from './components/ProductList.vue'

const router = useRouter()

const products = [
  { id: 'opticsgpt', titleKey: 'productIntro.opticsgptTitle', descKey: 'productIntro.opticsgptDesc', activeIndex: 0 },
  { id: 'ifts', titleKey: 'productIntro.iftsTitle', descKey: 'productIntro.iftsDesc', activeIndex: 1 },
  { id: 'instruments', titleKey: 'productIntro.instrumentsTitle', descKey: 'productIntro.instrumentsDesc', activeIndex: 2 }
]

const handleStart = (index) => {
  if (index === 0) {
    router.push('/products/opticsgpt')
  } else if (index === 1) {
    router.push('/products/ifts')
  } else if (index === 2) {
    router.push('/products/instruments')
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
