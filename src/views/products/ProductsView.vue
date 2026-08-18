<template>
  <div class="products-view">
    <!-- 产品板块：负责渲染四个子页面（list / opticsgpt / ifts / instruments） -->
    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
.products-view {
  width: 100%;
  min-height: 100vh;
  background: #121212;
}
</style>
