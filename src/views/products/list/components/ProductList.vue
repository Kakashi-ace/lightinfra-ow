<template>
  <div class="product-blocks">
    <ProductCard
      v-for="(product, index) in products"
      :key="product.id"
      :product="product"
      :index="index"
      @start="emit('start', index)"
    />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['start'])
</script>

<style scoped>
.product-blocks {
  width: 1200px;
  margin: 0 auto;
  padding-top: 135px;
  display: flex;
  flex-direction: column;
  gap: 77px;
}
</style>
