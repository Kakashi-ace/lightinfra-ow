<template>
  <div class="news-view">
    <!-- 新闻中心板块：负责渲染三个子页面（新闻动态 / 前沿研究 / 研究详情） -->
    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
.news-view {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
}
</style>
