<template>
  <router-view />
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

:root {
  /* 品牌强调色：链接 hover / 选中态，深浅主题通用，供各组件 scoped 样式引用 */
  --brand-accent: #0073FF;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #121212;
  min-width: 320px;
}

/* 页面容器，最大宽度1600px，居中显示 */
.page-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  background: #121212;
}
</style>
