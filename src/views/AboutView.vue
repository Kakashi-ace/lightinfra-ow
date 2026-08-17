<template>
  <div class="about-view">
    <AboutPage @start="handleStart" />
  </div>
</template>

<script setup>
import AboutPage from '../components/AboutPage.vue'

const handleStart = (product) => {
  // 跳转到资源页面开始使用
  window.location.href = '/resources'
}
</script>

<style scoped>
.about-view {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
}
</style>
