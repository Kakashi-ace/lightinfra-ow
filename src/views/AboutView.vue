<template>
  <div class="about-view">
    <AboutPage @start="handleStart" />
  </div>
</template>

<script setup>
import AboutPage from '../components/AboutPage.vue'

const handleStart = (product) => {
  // 资源说明页已移除，开始使用跳转目标待定
}
</script>

<style scoped>
.about-view {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
}
</style>
