<template>
  <div class="app">
    <AppNavbar />
    <router-view />
  </div>
</template>

<script setup>
import AppNavbar from './components/AppNavbar.vue'
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

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #121212;
  min-width: 320px;
}

.app {
  min-height: 100vh;
  background: #121212;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 页面容器，最大宽度1600px，居中显示 */
.page-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  background: #121212;
}
</style>
