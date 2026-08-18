<template>
  <div class="app-layout">
    <!-- 顶部悬浮导航栏 -->
    <AppNavbar :current-route="currentRoute" />
    <!-- 内容区：各页面自身渲染 hero/内容 -->
    <main class="layout-main">
      <router-view />
    </main>
    <!-- 全局页脚 -->
    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()

// 将当前路由路径传给导航栏，用于高亮「产品」等导航项
const currentRoute = computed(() => route.path)
</script>

<style scoped>
.app-layout {
  width: 100%;
  min-height: 100vh;
  background: #121212;
}

.layout-main {
  width: 100%;
}
</style>
